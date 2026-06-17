'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollState } from './scrollProgress';

// ---- パラメトリックなチューブ形状を生成するユーティリティ ----
// 同じ (U×V) グリッドで複数の形を作る → 頂点数が一致しモーフできる
const U = 680; // パスに沿った分割（=糸の滑らかさ・長さ方向の解像度）
const V = 230; // チューブ断面の分割（=縦糸の本数。多いほど密集して絹のように見える）

// 連続的な擬似ノイズ（ライブラリ不要・正弦波の重ね合わせ）→ 有機的な不規則さに使う
function snoise(x, y, z) {
  return (
    (Math.sin(x * 1.3 + y * 2.1 + z * 1.7) +
      Math.sin(x * 2.7 - y * 1.1 + z * 3.3) * 0.5 +
      Math.sin(x * 0.6 + y * 3.7 - z * 1.9) * 0.35) /
    1.85
  );
}

function buildTubePositions(pathFn, tubeR, seed = 0) {
  const pos = new Float32Array(U * V * 3);
  const c = new THREE.Vector3();
  const cn = new THREE.Vector3();
  const cp = new THREE.Vector3();
  const T = new THREE.Vector3();
  const N = new THREE.Vector3();
  const B = new THREE.Vector3();
  const up = new THREE.Vector3();
  const altUp = new THREE.Vector3(1, 0, 0);
  const off = new THREE.Vector3();

  // 不規則さの強さ
  const BEND = 0.22; // 経路をうねらせる量
  const WOBBLE = 0.5; // チューブの太さの揺らぎ量

  for (let i = 0; i < U; i++) {
    const u = i / (U - 1);
    pathFn(u, c);
    pathFn(Math.min(u + 1e-3, 1), cn);
    pathFn(Math.max(u - 1e-3, 0), cp);
    T.subVectors(cn, cp).normalize();
    up.set(0, 1, 0);
    if (Math.abs(T.dot(up)) > 0.9) up.copy(altUp);
    N.crossVectors(up, T).normalize();
    B.crossVectors(T, N).normalize();

    // 経路を低周波ノイズでうねらせる（有機的に蛇行）
    c.x += snoise(c.x * 0.9 + seed, c.y * 0.9, c.z * 0.9) * BEND;
    c.y += snoise(c.y * 0.9 + seed + 11, c.z * 0.9, c.x * 0.9) * BEND;
    c.z += snoise(c.z * 0.9 + seed + 23, c.x * 0.9, c.y * 0.9) * BEND;

    for (let j = 0; j < V; j++) {
      const phi = (j / V) * Math.PI * 2;
      // チューブの太さを中〜高周波ノイズで揺らす（凸凹に）
      const rr =
        tubeR *
        (1 +
          WOBBLE *
            snoise(c.x * 2.3 + seed, c.y * 2.3 + phi, c.z * 2.3 + phi * 0.5));
      off
        .copy(N)
        .multiplyScalar(Math.cos(phi) * rr)
        .addScaledVector(B, Math.sin(phi) * rr);
      const idx = (i * V + j) * 3;
      pos[idx] = c.x + off.x;
      pos[idx + 1] = c.y + off.y;
      pos[idx + 2] = c.z + off.z;
    }
  }
  return pos;
}

// 経路方向（U）に走る「縦糸」をラインとして繋ぐインデックス。
// 断面方向の糸(V本)それぞれが、形に沿って流れる細い曲線になる → 密集して絹のような質感に。
function buildLineIndex() {
  const idx = [];
  for (let j = 0; j < V; j++) {
    for (let i = 0; i < U - 1; i++) {
      idx.push(i * V + j, (i + 1) * V + j);
    }
  }
  return idx;
}

// 同系色のグラデーション（パスに沿って 明るいピーチ→深いテラコッタ）を頂点カラーで作る
function buildColors() {
  const colors = new Float32Array(U * V * 3);
  const cA = new THREE.Color('#ECB78C'); // 明るいピーチ
  const cB = new THREE.Color('#9A3F1C'); // 深いテラコッタ
  const tmp = new THREE.Color();
  for (let i = 0; i < U; i++) {
    // 端だけ偏らないよう緩やかなS字で混ぜる
    const u = i / (U - 1);
    const mix = u * u * (3 - 2 * u); // smoothstep
    tmp.copy(cA).lerp(cB, mix);
    for (let j = 0; j < V; j++) {
      const idx = (i * V + j) * 3;
      colors[idx] = tmp.r;
      colors[idx + 1] = tmp.g;
      colors[idx + 2] = tmp.b;
    }
  }
  return colors;
}

// ---- 4つの大きく異なる形（コイル → リング → ねじれ → 結び目） ----
const SHAPES = [
  // コイル（横たわるバネ）
  {
    tube: 0.2,
    path: (u, o) => {
      const t = Math.PI * 2 * 3 * u;
      o.set((u - 0.5) * 2.0, 0.85 * Math.sin(t), 0.85 * Math.cos(t));
    },
  },
  // トーラス（ドーナツ環・正面向き）
  {
    tube: 0.42,
    path: (u, o) => {
      const t = Math.PI * 2 * u;
      o.set(1.15 * Math.cos(t), 1.15 * Math.sin(t), 0);
    },
  },
  // ねじれたループ（リサージュ風）
  {
    tube: 0.26,
    path: (u, o) => {
      const t = Math.PI * 2 * u;
      o.set(1.3 * Math.sin(t), 0.7 * Math.sin(2 * t), 0.9 * Math.cos(t));
    },
  },
  // 三葉結び目（トレフォイル）
  {
    tube: 0.2,
    path: (u, o) => {
      const t = Math.PI * 2 * u;
      o.set(
        0.5 * (Math.sin(t) + 2 * Math.sin(2 * t)),
        0.5 * (Math.cos(t) - 2 * Math.cos(2 * t)),
        0.5 * -Math.sin(3 * t)
      );
    },
  },
];

function MorphObject() {
  const mesh = useRef();
  const pRot = useRef({ x: 0, y: 0 }); // カーソル追従の回転オフセット
  const ptr = useRef({ x: 0, y: 0 }); // 正規化マウス座標(-1..1)。canvasはpointer-events:noneなのでwindowで取得
  const { size, viewport } = useThree();

  // window全体でマウスを追跡（canvasがpointer-events:noneでも効く）
  useEffect(() => {
    const onMove = (e) => {
      ptr.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      ptr.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // 画面幅が広いほどオブジェクトを大きく（レスポンシブ）
  const responsiveScale = THREE.MathUtils.clamp(size.width / 1300, 0.85, 1.6);
  // フル幅キャンバス内で右側に配置するためのワールドオフセット
  const xOffset = viewport.width * 0.2;

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    // 形ごとに異なるノイズseedを与え、それぞれ別の不規則さにする
    const base = buildTubePositions(SHAPES[0].path, SHAPES[0].tube, 0);
    geo.setAttribute('position', new THREE.BufferAttribute(base, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(buildColors(), 3));
    geo.setIndex(buildLineIndex());
    geo.morphAttributes.position = SHAPES.slice(1).map(
      (s, i) =>
        new THREE.BufferAttribute(
          buildTubePositions(s.path, s.tube, (i + 1) * 7.3),
          3
        )
    );
    geo.morphTargetsRelative = false;
    return geo;
  }, []);

  // R3Fはgeometryを後付けするため、morphTargetInfluencesを明示的に初期化する
  useEffect(() => {
    if (mesh.current) mesh.current.updateMorphTargets();
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime();
    const sBase = scrollState.hero; // スクロール由来 0..1

    // --- 常時わずかにモーフィング（静止中も“生きている”ように形が揺らぐ） ---
    const breathe = Math.sin(t * 0.26) * 0.05 + Math.sin(t * 0.11) * 0.03;
    const s = THREE.MathUtils.clamp(sBase + breathe, 0, 1);

    const inf = mesh.current.morphTargetInfluences;
    if (inf) {
      const seg = s * 3; // 0..3
      const i = Math.min(Math.floor(seg), 2);
      const f = seg - i;
      inf[0] = inf[1] = inf[2] = 0;
      if (i === 0) inf[0] = f;
      else if (i === 1) {
        inf[0] = 1 - f;
        inf[1] = f;
      } else {
        inf[1] = 1 - f;
        inf[2] = f;
      }
    }

    // --- カーソル追従（視差・控えめ）。windowで取得したマウス座標を補間 ---
    pRot.current.x = THREE.MathUtils.lerp(pRot.current.x, -ptr.current.y * 0.14, 0.05);
    pRot.current.y = THREE.MathUtils.lerp(pRot.current.y, ptr.current.x * 0.2, 0.05);

    // --- 多軸のゆっくりした揺らぎ（一様な回転ではなく漂うような動き）＋スクロール＋カーソル ---
    mesh.current.rotation.y =
      sBase * Math.PI * 0.5 + t * 0.04 + Math.sin(t * 0.17) * 0.2 + pRot.current.y;
    mesh.current.rotation.x = 0.3 + Math.sin(t * 0.23) * 0.14 + pRot.current.x;
    mesh.current.rotation.z = Math.sin(t * 0.13) * 0.12;

    // 画面幅に応じたサイズ（レスポンシブ）＋微かな呼吸
    // スクロール終盤(0.82→0.98)で縮小して消えていく
    const shrink = 1 - THREE.MathUtils.smoothstep(sBase, 0.82, 0.98);
    mesh.current.scale.setScalar(
      responsiveScale * (1 + Math.sin(t * 0.4) * 0.015) * shrink
    );

    // 右側に配置 ＋ ゆるい浮遊 ＋ マウス追従
    mesh.current.position.x = THREE.MathUtils.lerp(
      mesh.current.position.x,
      xOffset + ptr.current.x * 0.22,
      0.05
    );
    mesh.current.position.y = THREE.MathUtils.lerp(
      mesh.current.position.y,
      Math.sin(t * 0.5) * 0.08 + ptr.current.y * 0.18,
      0.05
    );
  });

  return (
    <lineSegments
      ref={mesh}
      geometry={geometry}
      morphTargetInfluences={[0, 0, 0]}
    >
      <lineBasicMaterial
        transparent
        opacity={0.24}
        vertexColors
        depthWrite={false}
      />
    </lineSegments>
  );
}

// WebGLが使えない環境ではページ全体を落とさず、柔らかいグラデーションで代替する
class WebGLBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {}
  render() {
    if (this.state.failed) return this.props.fallback ?? null;
    return this.props.children;
  }
}

function SoftFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        style={{
          width: '44vmin',
          height: '44vmin',
          borderRadius: '50%',
          background:
            'radial-gradient(circle at 35% 30%, rgb(var(--color-accent-soft)), rgb(var(--color-accent)))',
          filter: 'blur(10px)',
          opacity: 0.75,
        }}
      />
    </div>
  );
}

export default function BlobCanvas() {
  return (
    <WebGLBoundary fallback={<SoftFallback />}>
      <Canvas
        camera={{ position: [0, 0, 5.0], fov: 45 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        style={{ pointerEvents: 'none' }}
      >
        <MorphObject />
      </Canvas>
    </WebGLBoundary>
  );
}

'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollState } from './scrollProgress';

// ===== ネットワーク（ノード＋エッジ）球体 =====
// 「点（ノード）が線でつながる」＝インターネット／ネットワークを想起させる形。
// 球面上に分布したノードを近傍同士で結び、ゆっくり波打たせながら回転させる。
const N = 1400; // ノード数（密度）
const R = 1.35; // 球の半径
const K = 6; // 各ノードがつながる近傍数（線の多さ）

// 連続的な擬似ノイズ（ライブラリ不要・正弦波の重ね合わせ）→ 有機的な揺らぎに使う
function snoise(x, y, z) {
  return (
    (Math.sin(x * 1.3 + y * 2.1 + z * 1.7) +
      Math.sin(x * 2.7 - y * 1.1 + z * 3.3) * 0.5 +
      Math.sin(x * 0.6 + y * 3.7 - z * 1.9) * 0.35) /
    1.85
  );
}

// フィボナッチ球：球面にムラなくノードを配置
function fibSphere(n, r) {
  const arr = new Float32Array(n * 3);
  const ga = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const rad = Math.sqrt(Math.max(0, 1 - y * y));
    const th = ga * i;
    arr[i * 3] = Math.cos(th) * rad * r;
    arr[i * 3 + 1] = y * r;
    arr[i * 3 + 2] = Math.sin(th) * rad * r;
  }
  return arr;
}

// 各ノードを近傍k個と結ぶ（重複は除く）→ ネットワークのエッジ。
// 全ソートせず「上位k件」だけを挿入ソートで保持して高速化（読み込み時の計算を軽く）。
function buildEdgeIndex(base, n, k) {
  const idx = [];
  const seen = new Set();
  const nbIdx = new Int32Array(k);
  const nbDist = new Float64Array(k);
  for (let i = 0; i < n; i++) {
    for (let m = 0; m < k; m++) {
      nbDist[m] = Infinity;
      nbIdx[m] = -1;
    }
    const ix = base[i * 3];
    const iy = base[i * 3 + 1];
    const iz = base[i * 3 + 2];
    for (let j = 0; j < n; j++) {
      if (j === i) continue;
      const dx = ix - base[j * 3];
      const dy = iy - base[j * 3 + 1];
      const dz = iz - base[j * 3 + 2];
      const d = dx * dx + dy * dy + dz * dz;
      if (d < nbDist[k - 1]) {
        let p = k - 1;
        while (p > 0 && nbDist[p - 1] > d) {
          nbDist[p] = nbDist[p - 1];
          nbIdx[p] = nbIdx[p - 1];
          p--;
        }
        nbDist[p] = d;
        nbIdx[p] = j;
      }
    }
    for (let m = 0; m < k; m++) {
      const j = nbIdx[m];
      if (j < 0) continue;
      const key = i < j ? i * n + j : j * n + i;
      if (seen.has(key)) continue;
      seen.add(key);
      idx.push(i, j);
    }
  }
  return idx;
}

// どれかの形態で長くなりすぎる（＝穴を横切る等の）エッジを除外する。
// 通常の近接エッジはどの形でも短いままなので残る。
function filterEdgesByMorphLength(edges, layouts, maxLen) {
  const max2 = maxLen * maxLen;
  const out = [];
  for (let e = 0; e < edges.length; e += 2) {
    const a = edges[e];
    const b = edges[e + 1];
    let bad = false;
    for (let l = 0; l < layouts.length; l++) {
      const L = layouts[l];
      const dx = L[a * 3] - L[b * 3];
      const dy = L[a * 3 + 1] - L[b * 3 + 1];
      const dz = L[a * 3 + 2] - L[b * 3 + 2];
      if (dx * dx + dy * dy + dz * dz > max2) {
        bad = true;
        break;
      }
    }
    if (!bad) out.push(a, b);
  }
  return out;
}

// ノード色：上＝温かいアンバー、下＝深いテラコッタ（濃いめでミステリアスに）
function buildColors(base, n) {
  const c = new Float32Array(n * 3);
  const top = new THREE.Color('#D98A4E');
  const bot = new THREE.Color('#5A2410');
  const tmp = new THREE.Color();
  for (let i = 0; i < n; i++) {
    const y = base[i * 3 + 1] / R; // -1..1
    const m = y * 0.5 + 0.5;
    tmp.copy(bot).lerp(top, m * m * (3 - 2 * m));
    c[i * 3] = tmp.r;
    c[i * 3 + 1] = tmp.g;
    c[i * 3 + 2] = tmp.b;
  }
  return c;
}

// スクロールでモーフする3形態（球体 → ドーナツ → 四角）。
// 球体ノードの方向ベクトルを各形状へ写像し、近傍の位置関係をできるだけ保つ。
function buildLayouts(base, n) {
  const sphere = base.slice();
  const torus = new Float32Array(n * 3);
  const cube = new Float32Array(n * 3);

  for (let i = 0; i < n; i++) {
    const x = base[i * 3] / R;
    const y = base[i * 3 + 1] / R;
    const z = base[i * 3 + 2] / R;
    const theta = Math.atan2(z, x); // 経度 -PI..PI
    const lat = Math.asin(THREE.MathUtils.clamp(y, -1, 1)); // 緯度 -PI/2..PI/2

    // --- ドーナツ型（トーラス）。チューブ細め＋穴大きめでドーナツらしく ---
    {
      const major = 1.05; // 環の半径（穴の大きさ）
      const minor = 0.34; // チューブの太さ
      const phi = lat * 2; // 緯度→チューブ断面角
      const ring = major + minor * Math.cos(phi);
      torus[i * 3] = ring * Math.cos(theta);
      torus[i * 3 + 1] = minor * Math.sin(phi);
      torus[i * 3 + 2] = ring * Math.sin(theta);
    }

    // --- 四角（キューブ表面へ射影：方向ベクトルを最大成分で割る） ---
    {
      const ax = Math.abs(x);
      const ay = Math.abs(y);
      const az = Math.abs(z);
      const m = Math.max(ax, ay, az) || 1e-6;
      const hs = 1.05; // 立方体の半辺
      cube[i * 3] = (x / m) * hs;
      cube[i * 3 + 1] = (y / m) * hs;
      cube[i * 3 + 2] = (z / m) * hs;
    }
  }
  return [sphere, torus, cube];
}

function NetworkObject() {
  const group = useRef();
  const pRot = useRef({ x: 0, y: 0 }); // カーソル追従の回転オフセット
  const ptr = useRef({ x: 0, y: 0 }); // 正規化マウス座標(-1..1)
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

  // 画面幅が広いほど大きく（レスポンシブ）／右側に配置
  const responsiveScale = THREE.MathUtils.clamp(size.width / 1300, 0.85, 1.55);
  const xOffset = viewport.width * 0.2;

  // ノード位置・色・エッジを生成（線と点で同じバッファを共有）
  const { base, layouts, posAttr, colorAttr, edgeIndex } = useMemo(() => {
    const base = fibSphere(N, R);
    const layouts = buildLayouts(base, N);
    // 球の近接でエッジを作り、どれかの形態で長すぎるもの（穴を横切る線）を除外
    const edgeIndex = filterEdgesByMorphLength(
      buildEdgeIndex(base, N, K),
      layouts,
      0.55
    );
    const positions = base.slice();
    const posAttr = new THREE.BufferAttribute(positions, 3);
    const colorAttr = new THREE.BufferAttribute(buildColors(base, N), 3);
    posAttr.setUsage(THREE.DynamicDrawUsage);
    return { base, layouts, posAttr, colorAttr, edgeIndex };
  }, []);

  // エッジ（線）用ジオメトリ
  const lineGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', posAttr);
    g.setAttribute('color', colorAttr);
    g.setIndex(edgeIndex);
    return g;
  }, [posAttr, colorAttr, edgeIndex]);

  // ノード（点）用ジオメトリ（位置・色は線と共有）
  const pointGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', posAttr);
    g.setAttribute('color', colorAttr);
    return g;
  }, [posAttr, colorAttr]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    const sBase = scrollState.hero; // スクロール由来 0..1

    // --- スクロール（＋静止中の微かな揺らぎ）で形態をモーフ：球体→ドーナツ→四角 ---
    // 0.85 で四角が完成し、hero終盤(0.85→1.0)は四角を保持してしっかり見せる
    const breathe = Math.sin(t * 0.26) * 0.04 + Math.sin(t * 0.11) * 0.025;
    const s = THREE.MathUtils.clamp(sBase + breathe, 0, 1);
    const L = layouts.length;
    const morphS = THREE.MathUtils.clamp(s / 0.85, 0, 1);
    const seg = morphS * (L - 1); // 0..(L-1)
    const gi = Math.min(Math.floor(seg), L - 2);
    const gf = seg - gi;
    const blend = gf * gf * (3 - 2 * gf); // smoothstep
    const a = layouts[gi];
    const b = layouts[gi + 1];

    // --- 形態をブレンド＋ゆらぎ（“生きている”ネットワーク感） ---
    const arr = posAttr.array;
    const amp = 0.05 * (0.6 + sBase * 0.8);
    for (let i = 0; i < N; i++) {
      const k = i * 3;
      const mx = a[k] + (b[k] - a[k]) * blend;
      const my = a[k + 1] + (b[k + 1] - a[k + 1]) * blend;
      const mz = a[k + 2] + (b[k + 2] - a[k + 2]) * blend;
      const bx = base[k];
      const by = base[k + 1];
      const bz = base[k + 2];
      arr[k] = mx + snoise(bx * 1.4 + t * 0.25, by * 1.4, bz * 1.4) * amp;
      arr[k + 1] = my + snoise(by * 1.4 + t * 0.21, bz * 1.4, bx * 1.4) * amp;
      arr[k + 2] = mz + snoise(bz * 1.4 + t * 0.18, bx * 1.4, by * 1.4) * amp;
    }
    posAttr.needsUpdate = true;

    // --- カーソル追従（視差・控えめ） ---
    pRot.current.x = THREE.MathUtils.lerp(pRot.current.x, -ptr.current.y * 0.14, 0.05);
    pRot.current.y = THREE.MathUtils.lerp(pRot.current.y, ptr.current.x * 0.2, 0.05);

    // --- 多軸のゆっくりした回転＋スクロール＋カーソル ---
    group.current.rotation.y =
      sBase * Math.PI * 0.6 + t * 0.05 + Math.sin(t * 0.17) * 0.18 + pRot.current.y;
    group.current.rotation.x =
      0.25 + t * 0.035 + Math.sin(t * 0.21) * 0.1 + pRot.current.x;
    group.current.rotation.z = Math.sin(t * 0.12) * 0.1;

    // works開始（カードのスライドイン）と同時に縮小して消える＋微かな呼吸
    const works = scrollState.works || 0;
    const shrink = 1 - THREE.MathUtils.smoothstep(works, 0, 0.18);
    group.current.scale.setScalar(
      responsiveScale * (1 + Math.sin(t * 0.4) * 0.015) * shrink
    );

    // 右側に配置＋ゆるい浮遊＋マウス追従
    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      xOffset + ptr.current.x * 0.22,
      0.05
    );
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      Math.sin(t * 0.5) * 0.08 + ptr.current.y * 0.18,
      0.05
    );
  });

  return (
    <group ref={group}>
      {/* エッジ（ノード同士をつなぐ線） */}
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial
          transparent
          opacity={0.5}
          vertexColors
          depthWrite={false}
        />
      </lineSegments>
      {/* ノード（点） */}
      <points geometry={pointGeo}>
        <pointsMaterial
          size={0.016}
          sizeAttenuation
          transparent
          opacity={0.9}
          vertexColors
          depthWrite={false}
        />
      </points>
    </group>
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
        camera={{ position: [0, 0, 5.4], fov: 45 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        style={{ pointerEvents: 'none' }}
      >
        <NetworkObject />
      </Canvas>
    </WebGLBoundary>
  );
}

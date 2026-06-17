'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0); // フルスクリーン（カメラ無視）
  }
`;

const frag = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uMouse;   // 0..1
  uniform float uAspect;
  varying vec2 vUv;

  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    float a = hash(i), b = hash(i + vec2(1.,0.));
    float c = hash(i + vec2(0.,1.)), d = hash(i + vec2(1.,1.));
    vec2 u = f*f*(3.-2.*f);
    return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
  }
  float fbm(vec2 p){
    float v = 0.0, a = 0.5;
    for(int i = 0; i < 5; i++){ v += a*noise(p); p *= 2.0; a *= 0.5; }
    return v;
  }

  void main(){
    vec2 uv = vUv;
    // アスペクト補正してマウスからの距離を計算
    vec2 auv = vec2(uv.x * uAspect, uv.y);
    vec2 am = vec2(uMouse.x * uAspect, uMouse.y);
    vec2 toM = auv - am;
    float d = length(toM);
    float infl = exp(-d * d * 22.0); // カーソル周辺の影響（ガウシアン）。係数が大きいほど狭く＝カーソル付近のみ波打つ

    // ゆっくり流れるドメインワープ
    vec2 q = vec2(
      fbm(uv * 3.0 + uTime * 0.05),
      fbm(uv * 3.0 + vec2(5.2, 1.3) - uTime * 0.04)
    );
    // カーソルが場を押して“グニュッ”と歪ませる
    vec2 warp = uv * 3.0 + q * 0.7 - toM * infl * 2.0;
    float n = fbm(warp + uTime * 0.03);

    vec3 cream = vec3(0.925, 0.894, 0.839); // ベース(生成り)
    vec3 peach = vec3(0.93, 0.79, 0.63);    // 温かいピーチ
    vec3 col = mix(cream, peach, smoothstep(0.30, 0.80, n));
    col += infl * 0.04; // カーソル付近をほんのり明るく
    gl_FragColor = vec4(col, 1.0);
  }
`;

function Plane() {
  const target = useRef(new THREE.Vector2(0.5, 0.5));
  const cur = useRef(new THREE.Vector2(0.5, 0.5));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uAspect: { value: 1 },
    }),
    []
  );

  useEffect(() => {
    const onMove = (e) => {
      target.current.set(
        e.clientX / window.innerWidth,
        1 - e.clientY / window.innerHeight
      );
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame((state) => {
    cur.current.lerp(target.current, 0.05);
    uniforms.uTime.value = state.clock.getElapsedTime();
    uniforms.uMouse.value.copy(cur.current);
    uniforms.uAspect.value = state.size.width / state.size.height;
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial vertexShader={vert} fragmentShader={frag} uniforms={uniforms} />
    </mesh>
  );
}

// WebGL不可でもページを壊さない
class Boundary extends React.Component {
  constructor(p) {
    super(p);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {}
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function WaveBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Boundary>
        <Canvas dpr={1} gl={{ antialias: false }} frameloop="always">
          <Plane />
        </Canvas>
      </Boundary>
    </div>
  );
}

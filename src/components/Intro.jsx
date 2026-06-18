'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WaveBackground from './WaveBackground';

// CMS未接続などで画像が無いときのフォールバック
const FALLBACK_IMAGES = [
  '/pf-cs-top.jpg',
  '/pf-pf.png',
  '/azaleeiida.jpg',
  '/pf-takamori.jpg',
  '/onomichi-lp1.jpg',
  '/studio1.jpg',
];

const MAX_IMAGES = 12; // 多すぎる場合の上限
const FIRST_GAP = 1900; // 1枚目はさらに長く「たーーん」
const GAP_START = 520; // 2枚目の表示時間（ここから加速スタート）
const GAP_MIN = 120; // 終盤の表示時間（たたたた）
const GAP_EXP = 2.8; // 加速の強さ（大きいほど後半で一気に速くなる）

// i番目の画像の表示時間。1枚目を長く、2枚目以降は加速度的に短くする。
function gapAt(i, n) {
  if (i === 0) return FIRST_GAP; // 1枚目だけ特別に長く
  if (n <= 2) return GAP_START;
  const t = (i - 1) / (n - 2); // 2枚目(0) 〜 最後(1)
  return GAP_MIN + (GAP_START - GAP_MIN) * Math.pow(1 - t, GAP_EXP);
}

export default function Intro({ onFinish, projects }) {
  const [phase, setPhase] = useState('montage'); // 'montage' -> 'title'
  const [idx, setIdx] = useState(0);

  // ポートフォリオ（works）の画像を使う。無ければフォールバック。
  const images = useMemo(() => {
    const fromCms = (projects ?? []).map((p) => p?.image).filter(Boolean);
    const unique = Array.from(new Set(fromCms));
    const list = unique.length ? unique : FALLBACK_IMAGES;
    return list.slice(0, MAX_IMAGES);
  }, [projects]);

  // モンタージュ全体の再生時間（スケールを連続的に縮小させるため）
  const totalMs = useMemo(() => {
    let s = 0;
    for (let i = 0; i < images.length; i++) s += gapAt(i, images.length);
    return s;
  }, [images.length]);

  // 画像を先読みしてチラつきを防ぐ
  useEffect(() => {
    images.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, [images]);

  // 1枚ずつ、加速しながら切り替える
  useEffect(() => {
    if (phase !== 'montage') return;
    if (idx >= images.length) {
      setPhase('title');
      return;
    }
    const t = setTimeout(() => setIdx((i) => i + 1), gapAt(idx, images.length));
    return () => clearTimeout(t);
  }, [idx, phase, images.length]);

  // タイトル提示後に終了
  useEffect(() => {
    if (phase !== 'title') return;
    const t = setTimeout(() => onFinish(), 1700);
    return () => clearTimeout(t);
  }, [phase, onFinish]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-hidden flex items-center justify-center transform-gpu"
      style={{ backgroundColor: 'rgb(var(--color-bg))' }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
    >
      {/* 他ページと同じ背景（波グラデ）を敷く。単色は読み込み前のフォールバック */}
      <WaveBackground />

      {/* 1つのフレームが連続して縮みながら、中身（src）だけ切り替わる */}
      <AnimatePresence>
        {phase === 'montage' && (
          <motion.div
            key="montage"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 0.8 }}
            transition={{
              opacity: { duration: 0.6, ease: 'easeOut' },
              // モンタージュ時間の約2倍かけて縮小＝途中までしか縮まず、ゆっくり縮み続ける
              scale: { duration: (totalMs / 1000) * 2, ease: 'linear' },
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[Math.min(idx, images.length - 1)]}
              alt=""
              className="max-h-[80vh] max-w-[74vw] w-auto h-auto object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* モンタージュ中の下部キャプション */}
      <AnimatePresence>
        {phase === 'montage' && (
          <motion.div
            key="caption"
            className="absolute bottom-10 md:bottom-14 left-0 right-0 flex flex-col items-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
            transition={{ delay: 0.4, duration: 0.9 }}
          >
            <p className="font-serif text-black tracking-[0.4em] text-xs md:text-sm">
              DAICHI OKAMOTO
            </p>
            <p className="mt-2 text-black/45 tracking-[0.45em] text-[9px] md:text-[10px]">
              PORTFOLIO SITE
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* タイトルリビール */}
      <AnimatePresence>
        {phase === 'title' && (
          <motion.div
            key="title"
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            {/* 下から上へすっとスライドして出現（マスクリビール） */}
            <div className="overflow-hidden py-[0.12em]">
              <motion.h1
                initial={{ y: '115%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif font-extrabold text-black tracking-[0.35em] text-2xl md:text-4xl"
              >
                DAICHI OKAMOTO
              </motion.h1>
            </div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-6 h-px w-44 md:w-64 bg-accent origin-center"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-6 text-black/60 tracking-[0.3em] text-[10px] md:text-xs"
            >
              Engineer / Web Creator
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

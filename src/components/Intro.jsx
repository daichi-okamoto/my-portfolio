'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
const GAP_MAX = 1300; // 最初の1枚の表示時間（かなりゆっくり）
const GAP_MIN = 150; // 終盤の表示時間（ぽんぽん）
const GAP_EXP = 2.2; // 加速の効き具合（大きいほど後半で一気に速くなる）

// i番目の画像の表示時間。後半ほど短くなる＝加速。
function gapAt(i, n) {
  const t = n > 1 ? i / (n - 1) : 1;
  return GAP_MIN + (GAP_MAX - GAP_MIN) * Math.pow(1 - t, GAP_EXP);
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
      className="fixed inset-0 z-[100] overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: 'rgb(var(--color-bg))' }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
    >
      {/* 実績画像を中央に1枚ずつ表示 */}
      <AnimatePresence>
        {phase === 'montage' && idx < images.length && (
          <motion.div
            key={idx}
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            <motion.img
              src={images[idx]}
              alt=""
              className="max-h-[80vh] max-w-[74vw] w-auto h-auto object-contain"
              // ゆっくりズームアウトでKen Burns風のドリフトを付ける
              initial={{ scale: 1.07 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2.6, ease: 'easeOut' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* タイトルリビール */}
      <AnimatePresence>
        {phase === 'title' && (
          <motion.div
            key="title"
            className="absolute inset-0 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1 }}
              className="font-serif font-extrabold text-black tracking-[0.35em] text-2xl md:text-4xl"
            >
              DAICHI OKAMOTO
            </motion.h1>
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

'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 導入で見せる実績画像のモンタージュ
const IMAGES = [
  '/pf-cs-top.jpg',
  '/pf-pf.png',
  '/azaleeiida.jpg',
  '/pf-takamori.jpg',
  '/onomichi-lp1.jpg',
  '/studio1.jpg',
];

const PER_MS = 460; // 1枚あたりの表示時間

export default function Intro({ onFinish }) {
  const [phase, setPhase] = useState('montage'); // 'montage' -> 'title'
  const [idx, setIdx] = useState(0);

  // 画像を先読みしてチラつきを防ぐ
  useEffect(() => {
    IMAGES.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  // モンタージュを順送り
  useEffect(() => {
    if (phase !== 'montage') return;
    if (idx >= IMAGES.length) {
      setPhase('title');
      return;
    }
    const t = setTimeout(() => setIdx((i) => i + 1), PER_MS);
    return () => clearTimeout(t);
  }, [idx, phase]);

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
      {/* 実績画像モンタージュ */}
      <AnimatePresence mode="sync">
        {phase === 'montage' && idx < IMAGES.length && (
          <motion.div
            key={idx}
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={IMAGES[idx]}
              alt=""
              className="w-[78%] max-w-3xl h-[58%] object-cover rounded-sm shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* カウンター */}
      {phase === 'montage' && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-black/50 tracking-[0.3em] text-[10px]">
          {String(Math.min(idx + 1, IMAGES.length)).padStart(2, '0')} /{' '}
          {String(IMAGES.length).padStart(2, '0')}
        </div>
      )}

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

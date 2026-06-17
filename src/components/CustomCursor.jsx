'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { scrollState } from './three/scrollProgress';

// リングの状態ごとの見た目
const RING = {
  default: { width: 38, height: 38, opacity: 0.9 },
  hover: { width: 58, height: 58, opacity: 1 },
  view: { width: 84, height: 84, opacity: 1 },
  scroll: { width: 82, height: 82, opacity: 1 },
};

export default function CustomCursor() {
  const pathname = usePathname();
  const isHome = pathname === '/'; // SCROLLリングはトップのヒーローのみ
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState('default');
  const variantRef = useRef('default');

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  // リングは遅れて、ドットはほぼ即追従
  const ringX = useSpring(x, { stiffness: 220, damping: 26, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 220, damping: 26, mass: 0.6 });
  const dotX = useSpring(x, { stiffness: 900, damping: 40 });
  const dotY = useSpring(y, { stiffness: 900, damping: 40 });
  // SCROLL円のスクロール進捗（0..1）
  const progress = useMotionValue(0);
  const progressSpring = useSpring(progress, { stiffness: 120, damping: 24 });

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      !window.matchMedia('(pointer: fine)').matches
    ) {
      return; // タッチ端末などでは無効
    }
    setEnabled(true);
    document.body.classList.add('cursor-none');

    const setV = (v) => {
      if (variantRef.current !== v) {
        variantRef.current = v;
        setVariant(v);
      }
    };

    const resolveNonHover = () =>
      isHome && scrollState.hero < 0.95 ? 'scroll' : 'default';

    const updateProgress = () =>
      progress.set(Math.min(Math.max(scrollState.hero, 0), 1));

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      updateProgress();
      const el = e.target;
      const close = el && el.closest;
      if (close && el.closest('[data-cursor="view"]')) setV('view');
      else if (close && el.closest('a, button, [data-cursor="hover"]'))
        setV('hover');
      else setV(resolveNonHover());
    };

    const onScroll = () => {
      updateProgress();
      if (variantRef.current === 'scroll' || variantRef.current === 'default') {
        setV(resolveNonHover());
      }
    };

    const leave = () => {
      x.set(-200);
      y.set(-200);
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('mouseleave', leave);
      document.body.classList.remove('cursor-none');
    };
  }, [x, y, progress, isHome]);

  if (!enabled) return null;

  const label =
    variant === 'scroll' ? 'SCROLL' : variant === 'view' ? 'VIEW' : '';
  const filled = variant === 'view';

  return (
    <>
      {/* リング */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{ x: ringX, y: ringY }}
      >
        <div className="-translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="relative flex items-center justify-center rounded-full border"
            animate={RING[variant]}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            style={{
              borderColor: filled
                ? 'transparent'
                : variant === 'scroll'
                ? 'rgb(var(--color-ink) / 0.15)' // SCROLL時はうっすら下地、進捗をSVGで描く
                : 'rgb(var(--color-accent) / 0.7)',
              backgroundColor: filled
                ? 'rgb(var(--color-accent))'
                : 'transparent',
            }}
          >
            {/* SCROLL時：スクロール進捗で円ボーダーが満ちていく */}
            {variant === 'scroll' && (
              <svg
                className="absolute inset-0 h-full w-full -rotate-90"
                viewBox="0 0 84 84"
                fill="none"
              >
                <motion.circle
                  cx="42"
                  cy="42"
                  r="41"
                  stroke="rgb(var(--color-accent))"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  style={{ pathLength: progressSpring }}
                />
              </svg>
            )}
            {label && (
              <span
                className="font-serif tracking-[0.25em] text-[9px] select-none"
                style={{
                  color: filled ? 'rgb(var(--color-bg))' : 'rgb(var(--color-ink) / 0.7)',
                }}
              >
                {label}
              </span>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* ドット（ホバー/SCROLL/VIEW時は消す） */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{ x: dotX, y: dotY }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full"
          animate={{ opacity: variant === 'default' ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{
            width: 6,
            height: 6,
            backgroundColor: 'rgb(var(--color-accent))',
          }}
        />
      </motion.div>
    </>
  );
}

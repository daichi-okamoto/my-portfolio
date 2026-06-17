'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const LINKS = [
  { label: 'PORTFOLIO', href: '/works' },
  { label: 'ABOUT', href: '/about' },
  { label: 'CONTACT', href: '/contact' },
];

const Header = () => {
  const [open, setOpen] = useState(false);

  // メニュー表示中は背景スクロールを止める
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      {/* 透明ヘッダー */}
      <header className="fixed top-0 inset-x-0 z-[60]">
        <div className="flex items-center justify-between w-[88%] max-w-6xl mx-auto py-6">
          {/* ロゴ（ワードマーク）。画像ロゴができたら img に差し替え可 */}
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="font-serif font-bold text-black tracking-[0.3em] text-sm md:text-base hover:text-accent transition-colors duration-300"
          >
            DAICHI&nbsp;OKAMOTO
          </Link>

          {/* 2本線ハンバーガー（PCでも常時表示） */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'メニューを閉じる' : 'メニューを開く'}
            aria-expanded={open}
            className="relative z-[70] flex h-9 w-9 flex-col items-center justify-center gap-[6px]"
          >
            <motion.span
              className="block h-px w-8 bg-black origin-center"
              animate={open ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            />
            <motion.span
              className="block h-px w-8 bg-black origin-center"
              animate={open ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            />
          </button>
        </div>
      </header>

      {/* 全画面メニュー */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[55] flex flex-col items-center justify-center"
            style={{ backgroundColor: 'rgb(var(--color-bg))' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <nav className="flex flex-col items-center gap-7 md:gap-9">
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.5, delay: 0.12 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-serif text-4xl md:text-6xl text-black tracking-[0.12em] hover:text-accent transition-colors duration-300"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="absolute bottom-10 text-side text-[10px] tracking-[0.4em]"
            >
              © DAICHI OKAMOTO
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;

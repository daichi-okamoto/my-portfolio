'use client';

import React, { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Element } from 'react-scroll';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion';
import { scrollState } from '../three/scrollProgress';
import ProjectCardH from '../sections/Portfolio/ProjectCardH';

const BlobCanvas = dynamic(() => import('../three/BlobCanvas'), { ssr: false });

// Heroのスクロール段階ごとのメッセージ
const STAGES = [
  {
    label: 'PORTFOLIO',
    title: 'DAICHI OKAMOTO',
    sub: '効率化で、時間に余白をつくる。',
    serifTitle: true,
  },
  {
    label: 'PHILOSOPHY',
    title: '面倒を、仕組みに変える。',
    sub: 'つくって、ためして、もっとよくする。',
    serifTitle: false,
  },
  {
    label: 'WHAT I DO',
    title: 'Web・自動化・AIで、\n現場の課題を解く。',
    sub: 'アプリ開発・Web制作・業務効率化／DX。',
    serifTitle: false,
  },
];

export default function HeroWorks({ projects }) {
  const ref = useRef(null);
  const trackRef = useRef(null);
  const [m, setM] = useState({ vw: 0, vh: 0, trackW: 0 });

  useEffect(() => {
    const calc = () => {
      setM({
        vw: window.innerWidth,
        vh: window.innerHeight,
        trackW: trackRef.current ? trackRef.current.scrollWidth : 0,
      });
    };
    calc();
    window.addEventListener('resize', calc);
    const t = setTimeout(calc, 600); // 画像読み込み後に再計測
    return () => {
      window.removeEventListener('resize', calc);
      clearTimeout(t);
    };
  }, [projects]);

  const { vw, vh, trackW } = m;

  // フェーズ配分： 前半=Heroの3Dモーフ、後半=実績の横流れ
  const heroScroll = vh * 1.8; // Hero側のスクロール量
  const worksScroll = Math.max(trackW, 1); // 実績側のスクロール量(≒トラック幅)
  const active = heroScroll + worksScroll;
  const sectionHeight = active + vh;
  const P1 = active > 0 ? heroScroll / active : 0.5; // Hero→実績の境界(進捗)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // Hero区間の進捗(0..1)を3Dへ共有
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    scrollState.hero = P1 > 0 ? Math.min(v / P1, 1) : 0;
  });

  // Hero終盤で3Dとヒントをフェードアウト
  const objectOpacity = useTransform(
    scrollYProgress,
    [P1 * 0.78, P1 * 0.96],
    [1, 0]
  );
  const hintOpacity = useTransform(scrollYProgress, [0, P1 * 0.12], [1, 0]);

  // 実績トラック：画面外(右)から左へスライドイン → そのまま右→左に流れる。
  // 開始は完全に画面外右、works開始直後に素早く右端から入ってくる。
  const x = useTransform(
    scrollYProgress,
    [P1, P1 + (1 - P1) * 0.13, 1],
    [vw * 0.95, vw * 0.02, -(trackW - vw)]
  );
  // カードはヒーロー中は非表示（見切れ防止）→ works開始でゲート的に表示。フェードではなくスライドで魅せる
  const cardsOpacity = useTransform(scrollYProgress, [P1 * 0.99, P1], [0, 1]);
  // タイトルのみフェードイン
  const worksOpacity = useTransform(
    scrollYProgress,
    [P1 * 0.96, P1 + (1 - P1) * 0.05],
    [0, 1]
  );

  return (
    <section
      ref={ref}
      className="relative"
      style={{ height: sectionHeight > vh ? `${sectionHeight}px` : '100vh' }}
    >
      {/* ナビ "PORTFOLIO" のスクロール先（実績が始まる位置） */}
      <Element
        name="portfolio"
        style={{ position: 'absolute', top: `${heroScroll}px`, left: 0 }}
      />

      {/* 画面に固定 */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* 3Dオブジェクト（前半で表示→終盤フェードアウト） */}
        <motion.div
          style={{ opacity: objectOpacity }}
          className="absolute inset-0 z-0"
        >
          <BlobCanvas />
        </motion.div>

        {/* Heroテキスト（段階クロスフェード） */}
        <div className="relative z-10 w-full h-full pointer-events-none">
          {STAGES.map((stage, i) => (
            <StageText
              key={i}
              stage={stage}
              index={i}
              progress={scrollYProgress}
              p1={P1}
            />
          ))}
        </div>

        {/* 実績フェーズ：カードは画面外右からスライドイン（フェードなし）／タイトルは左上にフェードイン */}
        {/* カードトラック（ヒーロー中は非表示→works開始で右からスライドイン） */}
        <motion.div
          style={{ opacity: cardsOpacity }}
          className="absolute inset-0 z-20 flex items-end pb-[3vh] md:pb-[5vh] pointer-events-none"
        >
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex items-end gap-8 lg:gap-12 pl-8 md:pl-16 lg:pl-24 pr-[8vw] pointer-events-auto"
          >
            {projects.map((project, i) => (
              <ProjectCardH key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </motion.div>

        {/* 左上に固定された見出し（フェードイン） */}
        <motion.div
          style={{ opacity: worksOpacity }}
          className="absolute top-20 md:top-24 left-8 md:left-16 lg:left-24 z-30 w-[80vw] sm:w-[22rem] lg:w-[26rem]"
        >
            <div className="flex items-center gap-4 mb-4">
              <span className="block w-12 h-px bg-accent" />
              <p className="font-serif text-accent text-[10px] md:text-xs tracking-[0.5em]">
                WORKS
              </p>
            </div>

            <h2 className="font-serif font-bold text-black leading-[0.9] tracking-tight whitespace-nowrap text-4xl md:text-5xl lg:text-6xl">
              PORTFOLIO
            </h2>

            <p className="hidden sm:block mt-5 text-black/55 text-xs leading-loose tracking-[0.15em] max-w-[18rem]">
              これまでに手がけた制作・開発の実績です。
            </p>

            <Link
              href="/works"
              className="pointer-events-auto group mt-7 inline-flex items-center gap-3 text-black text-xs tracking-[0.25em] font-bold"
            >
              <span className="border-b border-black/40 pb-1 transition-colors duration-300 group-hover:border-accent group-hover:text-accent">
                VIEW ALL
              </span>
              <span className="text-accent transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
        </motion.div>

        {/* スクロールヒント */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-8 left-8 md:left-16 lg:left-20 z-30 flex flex-col items-center"
        >
          <span className="text-black/50 text-[9px] tracking-[0.3em] mb-2">
            SCROLL
          </span>
          <span className="block w-px h-10 bg-black/30 animate-scroll-hint" />
        </motion.div>
      </div>
    </section>
  );
}

// Heroテキスト：Hero区間[0, p1]内の自分の出番でフェード表示
function StageText({ stage, index, progress, p1 }) {
  const n = STAGES.length;
  const seg = p1 / n;
  const start = index * seg;
  const fadeIn = index === 0 ? 0 : start - seg * 0.25;
  const inDone = start + seg * 0.15;
  const outStart = index === n - 1 ? p1 * 0.82 : start + seg * 0.85;
  const outDone = index === n - 1 ? p1 * 0.96 : start + seg + seg * 0.1;

  const inRange =
    index === 0 ? [0, outStart, outDone] : [fadeIn, inDone, outStart, outDone];
  const outVals = index === 0 ? [1, 1, 0] : [0, 1, 1, 0];

  const opacity = useTransform(progress, inRange, outVals);
  const y = useTransform(
    progress,
    index === 0 ? [0, 0.0001] : [fadeIn, inDone],
    [index === 0 ? 0 : 24, 0]
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col items-start justify-center text-left px-8 md:px-16 lg:pl-20 lg:pr-[52%]"
    >
      <p className="font-serif text-accent tracking-[0.5em] text-[10px] md:text-xs mb-5">
        {stage.label}
      </p>
      <h1
        className={`${
          stage.serifTitle ? 'font-serif' : 'font-sans'
        } font-extrabold text-black whitespace-pre-line leading-tight ${
          stage.serifTitle
            ? 'tracking-[0.18em] text-3xl md:text-4xl lg:text-5xl'
            : 'tracking-[0.08em] text-2xl md:text-3xl lg:text-4xl'
        }`}
      >
        {stage.title}
      </h1>
      <p className="mt-6 text-black/70 tracking-[0.2em] text-[11px] md:text-sm leading-loose">
        {stage.sub}
      </p>
    </motion.div>
  );
}

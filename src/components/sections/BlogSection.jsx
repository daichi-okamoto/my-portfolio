'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FadeInSection } from '../common/FadeInSection';

function fmtDate(d) {
  if (!d) return '';
  const dt = new Date(d);
  if (isNaN(dt)) return '';
  return `${dt.getFullYear()}.${String(dt.getMonth() + 1).padStart(2, '0')}.${String(
    dt.getDate()
  ).padStart(2, '0')}`;
}

const EASE = [0.22, 1, 0.36, 1];
const CURTAIN_EASE = [0.76, 0, 0.24, 1];

function BlogCard({ post, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.25 });
  const d = index * 0.16; // カードごとにずらす（スタッガー）

  return (
    <div ref={ref}>
      <Link
        href={`/blog/${post.id}`}
        data-cursor="view"
        className="group block"
      >
      {/* 画像：幕が上がるように出現 */}
      <div className="relative overflow-hidden rounded-sm shadow-sm bg-surface">
        {post.thumbnail ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <motion.img
            src={post.thumbnail}
            alt={post.title}
            className="w-full h-52 object-cover"
            initial={{ scale: 1.18 }}
            animate={inView ? { scale: 1 } : { scale: 1.18 }}
            transition={{ duration: 1.2, delay: d, ease: EASE }}
          />
        ) : (
          <motion.div
            className="w-full h-52 bg-gradient-to-br from-accent-soft/40 to-accent/30"
            initial={{ scale: 1.18 }}
            animate={inView ? { scale: 1 } : { scale: 1.18 }}
            transition={{ duration: 1.2, delay: d, ease: EASE }}
          />
        )}
        {/* カーテン（上に向かって消える） */}
        <motion.div
          className="absolute inset-0 origin-top"
          style={{ backgroundColor: 'rgb(var(--color-bg))' }}
          initial={{ scaleY: 1 }}
          animate={inView ? { scaleY: 0 } : { scaleY: 1 }}
          transition={{ duration: 0.85, delay: d, ease: CURTAIN_EASE }}
        />
      </div>

      {/* テキスト：リビール後に下から */}
      <motion.p
        className="mt-4 text-accent text-xs tracking-[0.25em]"
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
        transition={{ duration: 0.6, delay: d + 0.5, ease: EASE }}
      >
        {fmtDate(post.date)}
      </motion.p>
      <motion.h3
        className="mt-2 font-serif text-base lg:text-lg font-bold text-black tracking-wide leading-snug group-hover:text-accent transition-colors duration-300"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.6, delay: d + 0.56, ease: EASE }}
      >
        {post.title}
      </motion.h3>
      <motion.p
        className="mt-2 text-black/60 text-sm leading-relaxed line-clamp-2"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.6, delay: d + 0.62, ease: EASE }}
      >
        {post.excerpt}
      </motion.p>
      </Link>
    </div>
  );
}

const BlogSection = ({ posts = [] }) => {
  if (!posts.length) return null;

  return (
    <section className="relative py-28 md:py-40">
      <div className="w-[88%] max-w-6xl mx-auto">
        {/* 見出し */}
        <FadeInSection>
          <div className="flex justify-between items-end mb-14 border-b border-line pb-6">
            <div>
              <p className="font-serif text-accent text-xs tracking-[0.5em] mb-3">
                JOURNAL
              </p>
              <h2 className="font-serif text-4xl md:text-6xl font-bold text-black tracking-tight">
                BLOG
              </h2>
            </div>
            <Link
              href="/blog"
              data-cursor="hover"
              className="group inline-flex items-center gap-3 text-black text-xs tracking-[0.25em] font-bold pb-1"
            >
              <span className="border-b border-black/40 pb-1 group-hover:border-accent group-hover:text-accent transition-colors duration-300">
                VIEW ALL
              </span>
              <span className="text-accent group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </Link>
          </div>
        </FadeInSection>

        {/* 最新記事（マスクリビール＋スタッガー） */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {posts.map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;

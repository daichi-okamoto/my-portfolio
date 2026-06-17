'use client';

import React from 'react';
import Link from 'next/link';
import { FadeInSection } from '../common/FadeInSection';

function fmtDate(d) {
  if (!d) return '';
  const dt = new Date(d);
  if (isNaN(dt)) return '';
  return `${dt.getFullYear()}.${String(dt.getMonth() + 1).padStart(2, '0')}.${String(
    dt.getDate()
  ).padStart(2, '0')}`;
}

const BlogSection = ({ posts = [] }) => {
  if (!posts.length) return null;

  return (
    <section className="relative py-28 md:py-40">
      <FadeInSection>
        <div className="w-[88%] max-w-6xl mx-auto">
          {/* 見出し */}
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

          {/* 最新記事 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                data-cursor="view"
                className="group block"
              >
                <div className="overflow-hidden rounded-sm shadow-sm group-hover:shadow-xl transition-shadow duration-500 bg-surface">
                  {post.thumbnail ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="w-full h-52 object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    />
                  ) : (
                    <div className="w-full h-52 bg-gradient-to-br from-accent-soft/40 to-accent/30" />
                  )}
                </div>
                <p className="mt-4 text-accent text-xs tracking-[0.25em]">
                  {fmtDate(post.date)}
                </p>
                <h3 className="mt-2 font-serif text-base lg:text-lg font-bold text-black tracking-wide leading-snug group-hover:text-accent transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="mt-2 text-black/60 text-sm leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </FadeInSection>
    </section>
  );
};

export default BlogSection;

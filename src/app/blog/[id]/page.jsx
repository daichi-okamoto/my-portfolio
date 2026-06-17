import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { getPost } from '@/lib/microcms';
import PageHeader from '@/components/layout/PageHeader';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/CustomCursor';
import WaveBackground from '@/components/WaveBackground';

export const revalidate = 60;

function fmtDate(d) {
  if (!d) return '';
  const dt = new Date(d);
  if (isNaN(dt)) return '';
  return `${dt.getFullYear()}.${String(dt.getMonth() + 1).padStart(2, '0')}.${String(
    dt.getDate()
  ).padStart(2, '0')}`;
}

export async function generateMetadata({ params }) {
  const post = await getPost(params.id);
  return {
    title: post ? `${post.title} | BLOG` : 'BLOG',
    description: post?.excerpt,
  };
}

export default async function PostDetailPage({ params }) {
  const post = await getPost(params.id);
  if (!post) notFound();

  return (
    <>
      <WaveBackground />
      <CustomCursor />
      <PageHeader />

      <main className="min-h-screen pt-16 pb-32">
        <article className="w-[88%] max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 mt-10 mb-10 text-side text-xs tracking-[0.2em] hover:text-accent transition-colors"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            BLOG 一覧へ
          </Link>

          <p className="text-accent text-xs tracking-[0.3em] mb-4">
            {fmtDate(post.date)}
          </p>
          <h1 className="font-serif text-2xl md:text-4xl font-bold text-black tracking-wide leading-snug mb-10">
            {post.title}
          </h1>

          {post.thumbnail && (
            <div className="overflow-hidden rounded-sm shadow-sm mb-12">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.thumbnail} alt={post.title} className="w-full h-auto" />
            </div>
          )}

          {/* 本文（HTML） */}
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-20 pt-10 border-t border-line">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-side text-xs tracking-[0.2em] hover:text-accent transition-colors"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              BLOG 一覧へ戻る
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}

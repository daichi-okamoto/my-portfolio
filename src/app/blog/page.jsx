import React from 'react';
import Link from 'next/link';
import { getPosts } from '@/lib/microcms';
import PageHeader from '@/components/layout/PageHeader';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/CustomCursor';
import WaveBackground from '@/components/WaveBackground';

export const revalidate = 60;

export const metadata = {
  title: 'BLOG | DAICHI OKAMOTO',
  description: '開発・制作・日々の学びの記録です。',
};

function fmtDate(d) {
  if (!d) return '';
  const dt = new Date(d);
  if (isNaN(dt)) return '';
  return `${dt.getFullYear()}.${String(dt.getMonth() + 1).padStart(2, '0')}.${String(
    dt.getDate()
  ).padStart(2, '0')}`;
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <WaveBackground />
      <CustomCursor />
      <PageHeader />

      <main className="min-h-screen pt-16 pb-32">
        <div className="w-[88%] max-w-5xl mx-auto mt-12 mb-16 lg:mb-24">
          <div className="flex items-center gap-4 mb-5">
            <span className="block w-14 h-px bg-accent" />
            <p className="font-serif text-accent text-xs tracking-[0.5em]">JOURNAL</p>
          </div>
          <div className="flex justify-between items-end border-b border-line pb-6">
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-black tracking-tight">
              BLOG
            </h1>
            <p className="text-side text-xs md:text-sm tracking-[0.2em] pb-1">
              全 {posts.length} 記事
            </p>
          </div>
        </div>

        <div className="w-[88%] max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14">
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
                    className="w-full h-[clamp(180px,24vw,260px)] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                ) : (
                  <div className="w-full h-[clamp(180px,24vw,260px)] bg-gradient-to-br from-accent-soft/40 to-accent/30" />
                )}
              </div>
              <p className="mt-5 text-accent text-xs tracking-[0.25em]">
                {fmtDate(post.date)}
              </p>
              <h2 className="mt-2 font-serif text-lg lg:text-xl font-bold text-black tracking-wide leading-snug group-hover:text-accent transition-colors duration-300">
                {post.title}
              </h2>
              <p className="mt-3 text-black/60 text-sm leading-relaxed line-clamp-2">
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}

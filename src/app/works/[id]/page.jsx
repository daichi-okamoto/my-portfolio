import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { getProject } from '@/lib/microcms';
import PageHeader from '@/components/layout/PageHeader';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/CustomCursor';

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const project = await getProject(params.id);
  return {
    title: project ? `${project.title} | WORKS` : 'WORKS',
    description: project?.details?.text?.slice(0, 80),
  };
}

export default async function WorkDetailPage({ params }) {
  const project = await getProject(params.id);
  if (!project) notFound();

  const tags = (project.details?.languages || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const gallery = (project.images || []).filter(Boolean);
  const { websiteLink, siteTitle, githubLink } = project.details || {};

  return (
    <>
      <CustomCursor />
      <PageHeader />

      <main className="min-h-screen pt-16 pb-32">
        <article className="w-[88%] max-w-4xl mx-auto">
          {/* 戻る */}
          <Link
            href="/works"
            className="inline-flex items-center gap-2 mt-10 mb-10 text-side text-xs tracking-[0.2em] hover:text-accent transition-colors"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            WORKS 一覧へ
          </Link>

          {/* 見出し */}
          <p className="font-serif text-accent text-xs tracking-[0.4em] mb-4">
            PROJECT
          </p>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-black tracking-wider leading-tight mb-7">
            {project.title}
          </h1>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10">
              {tags.map((t, i) => (
                <span
                  key={i}
                  className="text-[11px] tracking-wider text-side border border-line rounded-full px-3 py-1"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* メイン画像 */}
          {project.image && (
            <div className="overflow-hidden rounded-sm shadow-sm mb-12">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.image} alt={project.title} className="w-full h-auto" />
            </div>
          )}

          {/* 本文 */}
          {project.details?.text && (
            <p className="text-black/75 text-sm md:text-base leading-loose tracking-wide whitespace-pre-line mb-14">
              {project.details.text}
            </p>
          )}

          {/* リンク */}
          {(websiteLink || githubLink) && (
            <div className="flex flex-wrap gap-4 mb-16">
              {websiteLink && (
                <a
                  href={websiteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-accent text-background text-xs tracking-[0.2em] font-bold px-6 py-3 rounded-sm hover:opacity-85 transition-opacity"
                >
                  {siteTitle || 'サイトを見る'}
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-[10px]" />
                </a>
              )}
              {githubLink && (
                <a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-line text-black text-xs tracking-[0.2em] font-bold px-6 py-3 rounded-sm hover:border-accent hover:text-accent transition-colors"
                >
                  <FontAwesomeIcon icon={faGithub} />
                  GitHub
                </a>
              )}
            </div>
          )}

          {/* ギャラリー */}
          {gallery.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {gallery.map((src, i) => (
                <div key={i} className="overflow-hidden rounded-sm shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={`${project.title} ${i + 1}`} className="w-full h-auto" />
                </div>
              ))}
            </div>
          )}

          {/* 末尾の戻る */}
          <div className="mt-20 pt-10 border-t border-line">
            <Link
              href="/works"
              className="inline-flex items-center gap-2 text-side text-xs tracking-[0.2em] hover:text-accent transition-colors"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              WORKS 一覧へ戻る
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}

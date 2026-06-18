import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { getProjects } from '@/lib/microcms';
import PageHeader from '@/components/layout/PageHeader';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/CustomCursor';
import WaveBackground from '@/components/WaveBackground';

export const revalidate = 60;

export const metadata = {
  title: 'WORKS | DAICHI OKAMOTO',
  description: '制作・開発の実績一覧です。',
};

export default async function WorksPage() {
  const projects = await getProjects();

  return (
    <>
      <WaveBackground />
      <CustomCursor />
      <PageHeader />

      <main className="min-h-screen pt-16 pb-32">
        {/* 見出し */}
        <div className="w-[88%] max-w-6xl mx-auto mt-12 mb-16 lg:mb-24">
          <div className="flex items-center gap-4 mb-5">
            <span className="block w-14 h-px bg-accent" />
            <p className="font-serif text-accent text-xs tracking-[0.5em]">WORKS</p>
          </div>
          <div className="flex justify-between items-end border-b border-line pb-6">
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-black tracking-tight">
              PORTFOLIO
            </h1>
            <p className="text-side text-xs md:text-sm tracking-[0.2em] pb-1">
              全 {projects.length} 件
            </p>
          </div>
        </div>

        {/* 一覧（縦並びカードの2カラムグリッド） */}
        <div className="w-[88%] max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-16 lg:gap-y-24">
          {projects.map((project, i) => {
            return (
              <Link
                key={project.id}
                href={`/works/${project.id}`}
                data-cursor="view"
                className="group block"
              >
                <div className="overflow-hidden rounded-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-serif text-accent text-sm tracking-[0.3em]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="block w-8 h-px bg-line" />
                  </div>
                  <h2 className="font-serif text-xl lg:text-2xl font-bold text-black tracking-wider mb-3 group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h2>
                  {project.description && (
                    <p className="text-side text-xs md:text-sm leading-relaxed mb-5 line-clamp-3">
                      {project.description}
                    </p>
                  )}
                  <span className="inline-flex items-center gap-3 text-black text-xs tracking-[0.25em] font-bold">
                    <span className="border-b border-black/40 pb-1 group-hover:border-accent group-hover:text-accent transition-colors duration-300">
                      VIEW MORE
                    </span>
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="text-accent group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      <Footer />
    </>
  );
}

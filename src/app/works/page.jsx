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

        {/* グリッド */}
        <div className="w-[88%] max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
          {projects.map((project, i) => {
            const tags = (project.details?.languages || '')
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean)
              .slice(0, 4);
            return (
              <Link
                key={project.id}
                href={`/works/${project.id}`}
                data-cursor="view"
                className="group block"
              >
                <div className="overflow-hidden rounded-sm shadow-sm group-hover:shadow-xl transition-shadow duration-500">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-[clamp(220px,30vw,360px)] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                </div>
                <div className="mt-5 flex items-start gap-4">
                  <span className="font-serif text-accent text-sm tracking-[0.3em] mt-1 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h2 className="font-serif text-xl lg:text-2xl font-bold text-black tracking-wider mb-3 group-hover:text-accent transition-colors duration-300">
                      {project.title}
                    </h2>
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {tags.map((t, k) => (
                          <span
                            key={k}
                            className="text-[10px] tracking-wider text-side border border-line rounded-full px-3 py-1"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                    <span className="inline-flex items-center gap-3 text-black text-xs tracking-[0.25em] font-bold">
                      <span className="border-b border-black/40 pb-1 group-hover:border-accent group-hover:text-accent transition-colors duration-300">
                        VIEW PROJECT
                      </span>
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="text-accent group-hover:translate-x-1 transition-transform duration-300"
                      />
                    </span>
                  </div>
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

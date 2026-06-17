import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import PageHeader from '@/components/layout/PageHeader';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/CustomCursor';
import WaveBackground from '@/components/WaveBackground';
import { FadeInSection } from '@/components/common/FadeInSection';
import { getAbout } from '@/lib/microcms';

export const revalidate = 60;

export const metadata = {
  title: 'ABOUT | DAICHI OKAMOTO',
  description: 'WEBエンジニア 岡本能知（ダイチ）のプロフィール。',
};

// "DAICHI OKAMOTO" → "Daichi Okamoto"
const toTitleCase = (s) =>
  (s || '')
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());

export default async function AboutPage() {
  const about = await getAbout();

  const META = [
    { k: 'NAME', v: `${about.nameJa} / ${toTitleCase(about.nameEn)}` },
    { k: 'ROLE', v: about.role },
    { k: 'BASED', v: about.based },
    { k: 'BORN', v: about.born },
  ];

  return (
    <>
      <WaveBackground />
      <CustomCursor />
      <PageHeader />

      <main className="min-h-screen pt-16 pb-32">
        {/* 見出し */}
        <FadeInSection>
          <div className="w-[88%] max-w-4xl mx-auto mt-12 mb-16 lg:mb-24">
            <div className="flex items-center gap-4 mb-5">
              <span className="block w-14 h-px bg-accent" />
              <p className="font-serif text-accent text-xs tracking-[0.5em]">ABOUT</p>
            </div>
            <p className="font-serif text-accent text-sm tracking-[0.3em] mb-3">{about.nameJa}</p>
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-black tracking-tight leading-none">
              {about.nameEn}
            </h1>
            <p className="mt-5 text-side text-xs md:text-sm tracking-[0.3em]">
              {about.role.toUpperCase()}
            </p>
          </div>
        </FadeInSection>

        {/* メタ ＋ 本文 */}
        <div className="w-[88%] max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-[200px_1fr] gap-10 md:gap-16">
          {/* メタ */}
          <FadeInSection>
            <aside className="md:border-r md:border-line md:pr-8 flex flex-col gap-6">
              {META.map((m) => (
                <div key={m.k}>
                  <p className="text-accent text-[10px] tracking-[0.3em] mb-1">{m.k}</p>
                  <p className="text-black text-sm tracking-wide">{m.v}</p>
                </div>
              ))}
            </aside>
          </FadeInSection>

          {/* 本文 */}
          <FadeInSection>
            <div className="space-y-7">
              {/* 本文（microCMSリッチエディタHTML：テキスト内リンク対応） */}
              <div
                className="about-bio"
                dangerouslySetInnerHTML={{ __html: about.bio }}
              />

              {/* SNS */}
              <div className="pt-10 mt-4 border-t border-line flex items-center gap-6">
                <span className="text-side text-[10px] tracking-[0.3em]">FOLLOW</span>
                <a
                  href={about.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black text-2xl hover:text-accent transition-colors duration-300"
                  aria-label="GitHub"
                >
                  <FontAwesomeIcon icon={faGithub} />
                </a>
                <a
                  href={about.xUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-70 transition-opacity duration-300"
                  aria-label="X"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 fill-current text-black">
                    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                  </svg>
                </a>
              </div>

              {/* CONTACTへ */}
              <div className="pt-6">
                <a
                  href="/contact"
                  className="group inline-flex items-center gap-3 text-black text-xs tracking-[0.25em] font-bold"
                >
                  <span className="border-b border-black/40 pb-1 group-hover:border-accent group-hover:text-accent transition-colors duration-300">
                    お問い合わせはこちら
                  </span>
                  <span className="text-accent group-hover:translate-x-1 transition-transform duration-300">→</span>
                </a>
              </div>
            </div>
          </FadeInSection>
        </div>
      </main>

      <Footer />
    </>
  );
}

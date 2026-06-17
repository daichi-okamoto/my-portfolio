import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import PageHeader from '@/components/layout/PageHeader';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/CustomCursor';
import WaveBackground from '@/components/WaveBackground';
import { FadeInSection } from '@/components/common/FadeInSection';

export const metadata = {
  title: 'ABOUT | DAICHI OKAMOTO',
  description: 'WEBエンジニア 岡本能知（ダイチ）のプロフィール。',
};

const BIO = [
  '1997年生まれ、長野県出身です。',
  '2020年に新卒で地元の介護施設に入社し、介護老人保健施設で4年間勤務しました。介護現場での経験を通じて、「効率化」の重要性を強く感じるようになり、限られた時間とリソースの中で、いかにして質の高いケアを提供できるかを常に考え、業務の改善に取り組んできました。この気づきがきっかけで、プログラミングに興味を持ち、学び始めました。',
  '2023年11月にプログラミングスクールRUNTEQに入学し、プログラミングを本格的に学び始めました。個人開発として前職の介護施設向けにシフト自動作成アプリを開発しました。このアプリは、従来手作業で行っていたシフト作成を自動化することで、シフト作成にかかる時間を半分以下に短縮し、業務負担の大幅な軽減に貢献しています。現在も現場でサービスが継続して利用され、介護職員の皆様から高い評価をいただいております。',
  '2024年8月RUNTEQ卒業後は、新たに個人サービスの開発を行いながら、父の会社のWEBサイト制作やDX支援を担当しています。クライアントの要望に応じるだけでなく、課題の本質に向き合い、効率的で効果的なソリューションを提供することを心掛けています。',
  '今後はWEBエンジニアとして、システム開発を通じて効率化や自動化の推進にさらに貢献していきたいと考えています。WEB開発やWEBサイト制作、業務効率化やDXに関するご相談がございましたら、どうぞお気軽にお問い合わせください。',
];

const META = [
  { k: 'NAME', v: '岡本 能知 / Daichi Okamoto' },
  { k: 'ROLE', v: 'Web Engineer / Creator' },
  { k: 'BASED', v: '長野県出身' },
  { k: 'BORN', v: '1997' },
];

export default function AboutPage() {
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
            <p className="font-serif text-accent text-sm tracking-[0.3em] mb-3">岡本 能知</p>
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-black tracking-tight leading-none">
              DAICHI OKAMOTO
            </h1>
            <p className="mt-5 text-side text-xs md:text-sm tracking-[0.3em]">
              WEB ENGINEER / CREATOR
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
              {BIO.map((p, i) => (
                <p
                  key={i}
                  className="text-black/75 text-sm md:text-[15px] leading-loose tracking-wide"
                >
                  {p}
                </p>
              ))}

              {/* SNS */}
              <div className="pt-10 mt-4 border-t border-line flex items-center gap-6">
                <span className="text-side text-[10px] tracking-[0.3em]">FOLLOW</span>
                <a
                  href="https://github.com/daichi-okamoto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black text-2xl hover:text-accent transition-colors duration-300"
                  aria-label="GitHub"
                >
                  <FontAwesomeIcon icon={faGithub} />
                </a>
                <a
                  href="https://x.com/rq_rb_engineer"
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

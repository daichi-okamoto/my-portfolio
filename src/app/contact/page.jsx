import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import PageHeader from '@/components/layout/PageHeader';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/CustomCursor';
import WaveBackground from '@/components/WaveBackground';
import ContactForm from '@/components/sections/Contact/ContactForm';
import { FadeInSection } from '@/components/common/FadeInSection';

export const metadata = {
  title: 'CONTACT | DAICHI OKAMOTO',
  description: 'お仕事のご相談・お問い合わせはこちらから。',
};

export default function ContactPage() {
  return (
    <>
      <WaveBackground />
      <CustomCursor />
      <PageHeader />

      <main className="min-h-screen pt-16 pb-32">
        <div className="w-[88%] max-w-5xl mx-auto mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* 左：見出し・メッセージ・SNS */}
            <FadeInSection>
              <div className="lg:sticky lg:top-28">
                <div className="flex items-center gap-4 mb-5">
                  <span className="block w-14 h-px bg-accent" />
                  <p className="font-serif text-accent text-xs tracking-[0.5em]">CONTACT</p>
                </div>
                <p className="font-serif text-accent text-sm tracking-[0.3em] mb-3">声をかける</p>
                <h1 className="font-serif text-4xl md:text-6xl font-bold text-black tracking-tight leading-none mb-8">
                  CONTACT
                </h1>
                <p className="text-black/70 text-sm md:text-[15px] leading-loose tracking-wide max-w-sm">
                  お仕事のご相談はもちろん、励ましのお言葉や雑談でも大歓迎です。
                  どんなことでも、お気軽にお声がけください。
                </p>

                <div className="mt-10 flex items-center gap-6">
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
              </div>
            </FadeInSection>

            {/* 右：フォーム */}
            <FadeInSection>
              <ContactForm />
            </FadeInSection>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

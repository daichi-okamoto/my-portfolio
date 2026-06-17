'use client';

import React from 'react';
import Link from 'next/link';
import { FadeInSection } from '../common/FadeInSection';

const CTA = () => {
  return (
    <section className="relative py-32 md:py-48">
      <FadeInSection>
        <div className="w-[88%] max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-10">
            <span className="block w-12 h-px bg-accent" />
            <p className="font-serif text-accent text-[10px] md:text-xs tracking-[0.5em]">
              LET&apos;S WORK TOGETHER
            </p>
            <span className="block w-12 h-px bg-accent" />
          </div>

          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-black leading-snug tracking-wide mb-8">
            ものづくりのご相談、
            <br className="hidden sm:block" />
            お待ちしています。
          </h2>

          <p className="text-black/60 text-sm md:text-[15px] tracking-wide leading-loose mb-14 max-w-md mx-auto">
            Web開発・サイト制作・業務効率化／DXなど、
            <br className="hidden md:block" />
            どんなことでもお気軽にお声がけください。
          </p>

          <Link
            href="/contact"
            data-cursor="hover"
            className="group inline-flex items-center gap-4 bg-accent text-background tracking-[0.3em] text-sm font-bold px-12 py-5 rounded-sm hover:opacity-90 transition-opacity duration-300"
          >
            CONTACT
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </FadeInSection>
    </section>
  );
};

export default CTA;

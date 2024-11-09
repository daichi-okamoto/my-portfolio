import React from 'react';
import { Element } from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FadeInSection } from '../../common/FadeInSection';

const About = () => {
  return (
    <Element name="about">
      <section>
        <FadeInSection>
          <div className='w-3/4 mx-auto tracking-widest my-20 xl:my-28'>
            <p className='text-xs md:text-base lg:text-lg xl:text-xl font-bold text-black'>岡本 能知</p>
            <div className='flex justify-between items-center'>
              <h2 className='text-xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-wider text-black'>DAICHI OKAMOTO</h2>
              <p className='text-xs md:text-base lg:text-base xl:text-base border-l pl-2 lg:pl-4 xl:pl-10 py-2 xl:py-6 border-side text-side font-bold tracking-wide xl:tracking-wider'>ENGINEER</p>
            </div>
          </div>
        </FadeInSection>
        <FadeInSection>
          <div className='w-3/4 mx-auto tracking-widest my-20 xl:my-28 text-xs lg:text-base'>
            <p className='mb-8'>1997年生まれ、長野県出身です。</p>
            <p className='leading-7 lg:leading-9'>2020年に新卒で地元の介護施設に入社し、介護老人保健施設で4年間勤務しました。介護現場での経験を通じて、「効率化」の重要性を強く感じるようになり、限られた時間とリソースの中で、いかにして質の高いケアを提供できるかを常に考え、業務の改善に取り組んできました。この気づきがきっかけで、プログラミングに興味を持ち、学び始めました。</p>
            <p className='leading-7 lg:leading-9'>2023年11月にプログラミングスクールRUNTEQに入学し、プログラミングを本格的に学び始めました。個人開発として前職の介護施設向けにシフト自動作成アプリを開発しました。このアプリは、従来手作業で行っていたシフト作成を自動化することで、シフト作成にかかる時間を半分以下に短縮し、業務負担の大幅な軽減に貢献しています。現在も現場でサービスが継続して利用され、介護職員の皆様から高い評価をいただいております。</p>
            <p className='leading-7 lg:leading-9 mb-8'>2024年8月RUNTEQ卒業後は、新たに個人サービスの開発を行いながら、父の会社のWEBサイト制作やDX支援を担当しています。クライアントの要望に応じるだけでなく、課題の本質に向き合い、効率的で効果的なソリューションを提供することを心掛けています。</p>
            <p className='leading-7 lg:leading-9'>今後はWEBエンジニアとして、システム開発を通じて効率化や自動化の推進にさらに貢献していきたいと考えています。WEB開発やWEBサイト制作、業務効率化やDXに関するご相談がございましたら、どうぞお気軽にお問い合わせください。</p>
            
            <div className='border-b border-black my-12 md:my-14 lg:my-16 xl:my-20'></div>
            
            <div className='flex justify-center items-center space-x-6'>
              <a 
                href="https://github.com/daichi-okamoto" 
                className='text-header text-2xl lg:text-3xl xl:text-3xl hover:opacity-70 duration-300'
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a 
                href="https://x.com/rq_rb_engineer" 
                className="hover:opacity-70 duration-300"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 512 512" 
                  className='w-6 md:w-6 lg:w-7 xl:w-8 fill-current text-header'
                >
                  <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/>
                </svg>
              </a>
            </div>
          </div>
        </FadeInSection>
      </section>
    </Element>
  );
};

export default About;
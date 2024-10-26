// src/components/MainContent.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { Link, Element } from 'react-scroll';
import { useInView } from 'react-intersection-observer';
import { useForm, ValidationError } from '@formspree/react';

const sliderSettings = {
  dots: true, // 下部にドットナビゲーションを表示
  infinite: true, // 無限ループ
  speed: 1000, // スライドの切り替わり速度（ミリ秒）
  slidesToShow: 1, // 一度に表示するスライドの数
  slidesToScroll: 1, // 一度にスクロールするスライドの数
  autoplay: true, // 自動再生
  autoplaySpeed: 3000, // 自動再生の速度（ミリ秒）
};

// フェードインアニメーションの設定
const fadeInVariants = {
  hidden: { opacity: 0, y: 40 }, // 初期状態：透明度0、下に40px移動
  visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.1 } }, // 表示状態：透明度1、位置を元に戻す
};

// アニメーション付きセクションコンポーネント
const FadeInSection = ({ children }) => {
  const [ref, inView] = useInView({
    triggerOnce: true, // 一度表示されたらトリガーを1回だけ実行する
    threshold: 0.1, // 10%見えたらトリガーを実行
  });

  return (
    <motion.div
      ref={ref}
      variants={fadeInVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  );
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 1, // 子要素が0.5秒間隔で順番にアニメーション
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0 }, // 初期状態は透明で見えない
  visible: { opacity: 1, transition: { duration: 2.5 } }, // 1秒かけて透明度が1になり見えるように
};

// サンプルプロジェクトデータ
const projects = [
  {
    id: 1,
    title: 'Care Shift',
    description: 'シフト自動作成アプリの詳細説明です...',
    image: '/portfolio2.png',
    images: ['/pf-cs-top.jpg', '/pf-cs-staff1.png', '/pf-cs-shift.png'],
    details: {
      text: '前職の介護施設のシフト自動作成アプリを作成しました。従業員を登録し、勤務希望を入力します。その後シフト作成ボタンを押すと、1ヶ月分のシフトが一瞬で作成されます。作成したシフトの編集もできるようにしました。シフト計算にはPythonのPuLPを使用して自動計算を行なっています。',
      languages: 'Ruby on Rails, Ruby, Python, Tailwindcss, HTML/CSS, Postgresql, Git, GitHub, Docker, Heroku',
      githubLink: 'https://github.com/daichi-okamoto/my-app',
      websiteLink: 'https://care-shift.com/',
      siteTitle: 'Care Shift',
      githubTitle: 'Github',
      githubIcon: <FontAwesomeIcon icon={faGithub} />,
    }
  },
  {
    id: 2,
    title: 'ポートフォリオサイト',
    description: 'ポートフォリオサイトの詳細説明です...',
    image: '/pf1.png',
    images: ['/pf-pf.png', '/pf-pf1.png', '/pf-pf2.png'],
    details: {
      text: '個人のポートフォリオサイトを作成しました。フロントエンドの技術にも興味があり、Reactを使用してポートフォリオサイトを実装しました。TailwindCSSでデザインを行い、GitHubでソースコードを管理しています。Reactを使用することによって、ユーザーがスムーズにページを遷移できるため、ポートフォリオサイトのユーザー体験を向上させることができました。',
      languages: 'React, Framer Motion, React Slick, Tailwind CSS, Vercel, Git, GitHub',
      githubLink: 'https://github.com/daichi-okamoto/my-portfolio',
      githubTitle: 'Github',
      githubIcon: <FontAwesomeIcon icon={faGithub} />,
    }
  },
  {
    id: 3,
    title: 'ブログ',
    description: 'ブログの詳細説明です...',
    image: '/pf-blog1.png',
    images: ['/pf-blog.jpg', '/pf-blog-1.png', '/pf-blog-2.png'],
    details: {
      text: '個人ブログを作成しました。WordPressを使用してブログを作成し、HTML/CSSでデザインを行いました。ブログの記事は、日々の学習や開発の記録を残しています。サイトの見た目を整えることが好きだと思い始めました。WEBサイト制作にも挑戦してみたいです。',
      languages: 'WordPress, HTML/CSS, JavaScript, PHP',
      websiteLink: 'https://okapoohblog.com/',
      siteTitle: 'DAICHIBLOG'
    }
  },
  {
    id: 4,
    title: 'グラウンド予約システム',
    description: 'グラウンド予約システムの詳細説明です...',
    image: '/pf-ground.png',
    images: ['/pf-ground-reserve.png', '/pf-ground-reserve2.png', '/pf-ground-reserve3.png'],
    details: {
      text: '新しくできる人工芝のサッカーグランドの予約システムを開発しました。Ruby on Railsを使用して、予約システムを作成しました。ユーザーは、予約したい日時を選択し、予約を確定することができます。管理者は、予約の管理を行うことができます。将来的にはクレカ決済機能を追加する予定です。',
      languages: 'Ruby on Rails, Ruby, Tailwindcss, HTML/CSS, Postgresql, Git, GitHub, Docker',
      githubLink: 'https://github.com/daichi-okamoto/ground-reserve',
      githubTitle: 'Github',
      githubIcon: <FontAwesomeIcon icon={faGithub} />,
    }
  },
  {
    id: 5,
    title: 'ホームページ制作',
    description: '高森サッカークラブのホームページ制作の詳細説明です...',
    image: '/pf-takamori-sc.jpg',
    images: ['/pf-takamori.jpg', '/pf-takamori2.jpg', '/pf-takamori3.jpg'],
    details: {
      text: '高森サッカークラブのホームページを制作しました。作成期間も短く、とにかく費用がかからないように且つプロっぽいホームページにしたいとご要望があったためWordPressの無料テーマLightningを使用して、サイトの制作を行いました。チームエンブレムのデザインも行いました。無料テーマでも工夫と追加CSSで見た目よく仕上げることができたと思います。',
      languages: 'WordPress, Lightning, HTML/CSS, PHP',
      websiteLink: 'https://takamori-sc.site/',
      siteTitle: '高森サッカークラブ'
    }
  },
];

function MainContent() {
  const [selectedProject, setSelectedProject] = useState(null); // クリックされたプロジェクトを管理
  const [state, handleSubmit] = useForm("mzzpngqz"); // Replace with your Formspree ID

  // プロジェクトがクリックされたときの処理
  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  // モーダルを閉じるときの処理
  const handleClose = () => {
    setSelectedProject(null);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative bg-background" // relative を設定して擬似要素を正しく表示
    >
      <div
        className="absolute inset-0"
        style={{
          position: 'fixed', // 背景画像をスクロールしても固定する
          top: '50%', // 画面中央に位置する
          left: '50%',
          transform: 'translate(-50%, -50%)', // 中央に配置
          width: '100vw', // 背景画像の幅を調整可能
          height: '100vh', // 背景画像の高さを調整可能
          backgroundImage: `url("/icon2-removebg.png")`, // 背景画像のパスを指定
          backgroundSize: 'contain', // 画像全体を表示する
          backgroundPosition: 'center', // 背景画像の位置を中央に設定
          backgroundRepeat: 'no-repeat', // 背景画像を繰り返さない
          opacity: 0.05, // 透明度を設定
          zIndex: 1, // 背景がコンテンツの背後に表示されるように
        }}
      ></div>
      <motion.div
        variants={itemVariants}
        className="relative z-10"
      >
        <header className='sticky top-0 z-50'>
          <nav className="flex items-center justify-between container mx-auto pt-4">
            <a href="" className='hover:opacity-80 duration-300'>
              <img src="/icon5-removebg.png" alt="" className=' w-14 h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20' />
            </a>
            <ul className="flex space-x-2 md:space-x-4 lg:space-x-8 text-xs sm:text-sm lg:text-xl font-bold tracking-widest">
              <li>
                <Link to="portfolio" smooth={true} duration={500} className="text-header hover:opacity-80 duration-300 cursor-pointer">PORTFOLIO</Link>
              </li>
              <li>
                <Link to="about" smooth={true} duration={500} className="text-header hover:opacity-80 duration-300 cursor-pointer">ABOUT</Link>
              </li>
              <li>
                <Link to="contact" smooth={true} duration={500} className="text-header mr-4 hover:opacity-80 duration-300 cursor-pointer">CONTACT</Link>
              </li>
            </ul>
          </nav>
        </header>
        <div className='flex flex-col justify-center items-center h-[calc(100vh-80px)] tracking-[0.4em] text-black -mt-14'>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-center">
            DAICHI OKAMOTO
          </h1>
          <p className="mt-4 text-xs md:text-base lg:text-xl text-center font-medium leading-relaxed">
            IT IS AN ENGINEER'S PORTFOLIO SITE.
          </p>
        </div>
        <Element name="portfolio">
        <section className='relative'>
          <FadeInSection>
            <div className='w-3/4 mx-auto tracking-widest my-20 xl:my-28'>
              <p className='text-xs md:text-base lg:text-lg xl:text-xl font-bold text-black'>ポートフォリオ</p>
              <div className='flex justify-between items-center'>
                <h2 className='text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-widest text-black'>PORTFOLIO</h2>
                <p className='text-xs md:text-base lg:text-base xl:text-base border-l pl-2 lg:pl-4 xl:pl-10 py-2 xl:py-6 border-side text-side font-bold tracking-wide xl:tracking-wider'>ENGINEERING</p>
              </div>
            </div>
          </FadeInSection>

          <div className='grid md:grid-cols-2 gap-10 object-cover w-3/4 mx-auto'>
            {projects.map((project) => (
              <FadeInSection key={project.id}>
                <div>
                  <a
                    href="#"
                    className='hover:opacity-70 duration-300'
                    onClick={(e) => {
                      e.preventDefault(); // リンクのデフォルトの動作を無効化
                      handleProjectClick(project); // プロジェクトをクリックしたときの処理を実行
                    }}
                  >
                    <img src={project.image} alt={project.title} className="w-full h-auto" />
                    <p className='text-sm lg:text-lg text-header font-bold p-2 lg:p-4'>{project.title}</p>
                  </a>
                </div>
              </FadeInSection>
            ))}
          </div>
        </section>
        </Element>
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
              <a href="https://github.com/daichi-okamoto" className='text-header text-2xl lg:text-3xl xl:text-3xl hover:opacity-70 duration-300'><FontAwesomeIcon icon={faGithub} /></a>
              <a href="https://x.com/rq_rb_engineer" className="hover:opacity-70 duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='w-6 md:w-6 lg:w-7 xl:w-8 fill-current text-header' >
                <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/>
              </svg>
              </a>
            </div>
            </div>
        </FadeInSection>
        </section>
        </Element>
        <Element name="contact">
        <section>
        <FadeInSection>
        <div className='w-3/4 mx-auto tracking-widest mt-20 mb-14 xl:my-28'>
          <p className='text-xs md:text-base lg:text-lg xl:text-xl font-bold text-black'>声をかける</p>
          <div className='flex justify-between items-center'>
            <h2 className='text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-widest text-black'>CONTACT</h2>
          </div>
        </div>
        <div className='w-3/4 mx-auto tracking-widest mb-20 xl:mb-28'>
          <p className='font-medium text-xs md:text-sm lg:text-sm xl:text-base leading-loose'>お仕事のご相談はもちろん、励ましのお言葉や雑談でも大歓迎です。どんなことでも、お気軽にお声がけください。</p>
        </div>
        <div className='w-3/4 mx-auto'>
        <form onSubmit={handleSubmit} className='flex flex-col space-y-10'>
          <div>
            <label htmlFor="name" className='block tracking-widest text-xs md:text-sm lg:text-base xl:text-lg font-bold text-black'>NAME</label>
            <input type="text" id="name" name="name" required className='mt-2 block w-full px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-8 xl:px-10 xl:py-10 focus:outline-none focus:ring-none text-xs lg:text-base'/>
            <ValidationError 
              prefix="Name" 
              field="name"
              errors={state.errors}
            />
          </div>
          
          <div>
          <label htmlFor="email" className='block tracking-widest text-xs md:text-sm lg:text-base xl:text-lg font-bold text-black'>MAIL ADDRESS</label>
          <input type="email" id="email" name="email" required className='mt-2 block w-full px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-8 xl:px-10 xl:py-10 focus:outline-none focus:ring-none text-xs lg:text-base'/>
          <ValidationError 
            prefix="Email" 
            field="email"
            errors={state.errors}
          />
          </div>
          
          <div>
          <label htmlFor="message" className='block tracking-widest text-xs md:text-sm lg:text-base xl:text-lg font-bold text-black'>MESSAGE</label>
          <textarea id="message" name="message" required className='mt-2 block w-full px-4 pt-4 pb-16 xl:px-10 xl:pt-10 xl:pb-40 focus:outline-none focus:ring-none text-xs lg:text-base'/>
          <ValidationError 
            prefix="Message" 
            field="message"
            errors={state.errors}
          />
          </div>
          
          <div className='flex justify-center items-center '>
          <button 
            type="submit" 
            disabled={state.submitting || state.succeeded} // 送信中または送信が完了した後はボタンを無効化
            className='w-full md:w-64 mt-10 text-sm md:text-base  tracking-widest font-semibold bg-header text-white py-6  md:py-4 xl:py-6 px-4 hover:opacity-80 focus:outline-none duration-300'>
            {state.submitting 
              ? "送信中..." 
              : state.succeeded 
              ? "送信しました" 
              : "送信する"}
          </button>
          </div>
        </form>
      </div>
      </FadeInSection>
        </section>
        </Element>
        <footer className='w-full py-24 lg:py-28 xl:py-32 mt-28 bg-black'>
          <div className='flex justify-center'>
            <p className='text-white text-xs md:text-sm lg:text-base xl:text-lg lg:font-semibold tracking-[0.4em]'>© DAICHI OKAMOTO 2024</p>
          </div>
        </footer>
      </motion.div>

      {/* 詳細モーダル */}
<AnimatePresence>
  {selectedProject && (
    <motion.div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleClose} // 背景をクリックしたときに閉じる
    >
      <motion.div
        className="bg-neutral-200 p-8 w-5/6 h-5/6 overflow-y-auto flex flex-col lg:flex-row relative"
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 0, opacity: 0 }}
        onClick={(e) => e.stopPropagation()} // モーダル内部のクリックで閉じないようにする
      >
        <button className="absolute top-2 right-4 lg:text-xl xl:text-2xl text-black" onClick={handleClose}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <div className="w-full lg:w-1/3 lg:p-2 xl:p-4 text-black">
          <div className='flex justify-center items-center mb-2'>
            {/* テキストの表示領域 */}
            <h2 className="text-sm md:text-base lg:text-xl font-bold">{selectedProject.title}</h2>
          </div>
          <div className='text-left text-xs lg:text-sm 2xl:text-base'>
            {/* 動的な詳細テキストを表示 */}
            <p className='tracking-wider leading-relaxed lg:leading-relaxed xl:leading-loose'>
              {selectedProject.details.text}
            </p>
          </div>
          <div className='my-8'>
            <div className='mb-2'>
              <h2 className='flex justify-center items-center font-bold text-black text-sm md:text-base lg:text-lg'>使用言語など</h2>
            </div>
            <div className='text-left text-xs lg:text-sm 2xl:text-base'>
              {/* 動的な使用言語を表示 */}
              <p className='tracking-wider leading-relaxed lg:leading-relaxed xl:leading-loose'>
                {selectedProject.details.languages}
              </p>
            </div>
          </div>
          <div>
            {/* 動的なGitHubリンクを表示 */}
            <a href={selectedProject.details.githubLink} className='flex items-center space-x-1 text-header text-xs lg:text-sm font-medium underline w-1/5 hover:opacity-70' target="_blank" rel="noopener noreferrer">
              {selectedProject.details.githubIcon}
              <p>
                {selectedProject.details.githubTitle}
              </p>
            </a>
          </div>
          <div className='mt-2'>
            {/* 動的なウェブサイトリンクを表示 */}
            <a href={selectedProject.details.websiteLink} className='text-header font-medium underline text-xs lg:text-sm hover:opacity-70' target="_blank" rel="noopener noreferrer">
              {selectedProject.details.siteTitle}
            </a>
          </div>
        </div>
        <div className="w-full lg:w-2/3 p-4 lg:mt-32 xl:mt-16">
          {/* スライダーの表示領域 */}
          <Slider {...sliderSettings}>
            {selectedProject.images && selectedProject.images.map((image, index) => (
              <div key={index}>
                <img src={image} alt={`${selectedProject.title} Slide ${index + 1}`} className="w-full h-auto" />
              </div>
            ))}
          </Slider>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </motion.div>
  );
}

export default MainContent;

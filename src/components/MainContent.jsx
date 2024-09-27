// src/components/MainContent.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const sliderSettings = {
  dots: true, // 下部にドットナビゲーションを表示
  infinite: true, // 無限ループ
  speed: 1000, // スライドの切り替わり速度（ミリ秒）
  slidesToShow: 1, // 一度に表示するスライドの数
  slidesToScroll: 1, // 一度にスクロールするスライドの数
  autoplay: true, // 自動再生
  autoplaySpeed: 3000, // 自動再生の速度（ミリ秒）
};


const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.5, // 子要素が0.5秒間隔で順番にアニメーション
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0 }, // 初期状態は透明で見えない
  visible: { opacity: 1, transition: { duration: 1 } }, // 1秒かけて透明度が1になり見えるように
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
    }
  },
  {
    id: 2,
    title: 'ポートフォリオサイト',
    description: 'ポートフォリオサイトの詳細説明です...',
    image: '/pf1.png',
    // images: ['/pf-top.png', '/pf-about.png', '/pf-portfolio.png'],
    details: {
      text: '個人のポートフォリオサイトを作成しました。フロントエンドの技術にも興味があり、Reactを使用してポートフォリオサイトを実装しました。TailwindCSSでデザインを行い、GitHubでソースコードを管理しています。',
      languages: 'React, Framer Motion, React Slick, Tailwind CSS, Vercel, Git, GitHub',
      githubLink: 'https://github.com/daichi-okamoto/my-portfolio',
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
    }
  },
];

function MainContent() {
  const [selectedProject, setSelectedProject] = useState(null); // クリックされたプロジェクトを管理

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
          backgroundImage: `url("/icon2-removebg.PNG")`, // 背景画像のパスを指定
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
        <header className='sticky top-0'>
          <nav className="flex items-center justify-between container mx-auto pt-4">
            <a href="" className='hover:opacity-80 duration-300'>
              <img src="./icon5-removebg.png" alt="" className=' w-14 h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20' />
            </a>
            <ul className="flex space-x-2 md:space-x-4 lg:space-x-8 text-xs sm:text-sm lg:text-xl font-bold tracking-widest">
              <li>
                <a href="#about" className="text-header hover:opacity-80 duration-300">ABOUT</a>
              </li>
              <li>
                <a href="#portfolio" className="text-header hover:opacity-80 duration-300">PORTFOLIO</a>
              </li>
              <li>
                <a href="#contact" className="text-header mr-4 hover:opacity-80 duration-300">CONTACT</a>
              </li>
            </ul>
          </nav>
        </header>
        <div className='flex flex-col justify-center items-center h-[calc(100vh-80px)] tracking-[0.4em] text-black'>
          <h1 className="text-xl lg:text-3xl font-bold text-center -mt-20">
            DAICHI OKAMOTO
          </h1>
          <p className="mt-4 lg:text-xl text-center font-medium">
            IT IS AN ENGINEER'S PORTFOLIO SITE.
          </p>
        </div>
        <section className='relative'>
          <div className='w-3/4 mx-auto tracking-widest my-20 xl:my-28'>
            <p className='text-sm md:text-base lg:text-lg xl:text-xl font-bold text-black'>ポートフォリオ</p>
            <div className='flex justify-between items-center'>
              <h2 className='text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-widest text-black'>PORTFOLIO</h2>
              <p className='text-xs md:text-base lg:text-base xl:text-base border-l pl-2 lg:pl-4 xl:pl-10 py-2 xl:py-6 border-side text-side font-bold tracking-wide xl:tracking-wider'>ENGINEERING</p>
            </div>
          </div>
          <div className='grid lg:grid-cols-2 gap-10 object-cover w-3/4 mx-auto'>
            {projects.map((project) => (
              <div key={project.id}>
                <a
                  href="#"
                  className='hover:opacity-70 duration-300'
                  onClick={(e) => {
                    e.preventDefault(); // リンクのデフォルトの動作を無効化
                    handleProjectClick(project); // プロジェクトをクリックしたときの処理を実行
                  }}
                >
                  <img src={project.image} alt={project.title} className="w-full h-auto" />
                  <p className='text-header font-bold p-4'>{project.title}</p>
                </a>
              </div>
            ))}
          </div>
        </section>
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
            <h2 className=" text-xl font-bold">{selectedProject.title}</h2>
          </div>
          <div className='text-left text-sm'>
            {/* 動的な詳細テキストを表示 */}
            <p className='tracking-wider leading-relaxed lg:leading-relaxed xl:leading-loose'>
              {selectedProject.details.text}
            </p>
          </div>
          <div className='my-8'>
            <div className='mb-2'>
              <h2 className='flex justify-center items-center font-bold text-black'>使用言語など</h2>
            </div>
            <div>
              {/* 動的な使用言語を表示 */}
              <p className='tracking-wider leading-relaxed lg:leading-relaxed xl:leading-loose'>
                {selectedProject.details.languages}
              </p>
            </div>
          </div>
          <div>
            {/* 動的なGitHubリンクを表示 */}
            <a href={selectedProject.details.githubLink} className='flex items-center space-x-1 text-header text-xs font-medium underline w-1/5 hover:opacity-70' target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGithub} />
              <p>GITHUB</p>
            </a>
          </div>
          <div className='mt-2'>
            {/* 動的なウェブサイトリンクを表示 */}
            <a href={selectedProject.details.websiteLink} className='text-header font-medium underline text-xs hover:opacity-70' target="_blank" rel="noopener noreferrer">
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

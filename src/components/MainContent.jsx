// src/components/MainContent.jsx
import React from 'react';
import { motion } from 'framer-motion';

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
  visible: { opacity: 1, transition: { duration: 1 } }, // 2秒かけて透明度が1になり見えるように
};

function MainContent() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className='bg-background' // クラス名は常に適用されるように設定
    >
      <motion.div
        variants={itemVariants}
        className='bg-background'
      >
        <header className='sticky top-0'>
          <nav className="flex items-center justify-between container mx-auto pt-4">
            <h1 className="text-xl font-bold">⚪︎</h1>
            <ul className="flex space-x-2 md:space-x-4 lg:space-x-8 text-xs sm:text-sm lg:text-xl font-bold tracking-widest">
              <li>
                <a href="#about" className="text-header">ABOUT</a>
              </li>
              <li>
                <a href="#portfolio" className="text-header">PORTFOLIO</a>
              </li>
              <li>
                <a href="#contact" className="text-header">CONTACT</a>
              </li>
            </ul>
          </nav>
        </header>
        <div className='flex flex-col items-center justify-center min-h-[calc(100vh-44px)] tracking-[0.4em] text-black'>
          <h1 className="text-xl lg:text-3xl font-bold text-center">
            DAICHI OKAMOTO
          </h1>
          <p className="mt-4 lg:text-xl text-center">
            IT IS AN ENGINEER'S PORTFOLIO SITE
          </p>
        </div>
        <section className='h-screen'>
          <div className='flex items-center justify-center'>
            <h2 className='text-black '>PORTFOLIO</h2>
          </div>
          <div className='flex flex-col'></div>
        </section>
      </motion.div>
      {/* 他のコンテンツ */}
    </motion.div>
  );
}

export default MainContent;

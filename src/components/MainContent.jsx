import React from 'react';
import { motion } from 'framer-motion';
import Header from './layout/Header';
import Hero from './layout/Hero';
import Portfolio from './sections/Portfolio/Portfolio';
import About from './sections/About/About';
import Contact from './sections/Contact/Contact';
import Footer from './layout/Footer';
import { projects } from '../data/projects';  // プロジェクトデータをインポート

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 2.5 } },
};

const MainContent = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative bg-background"
    >
      <div 
        className="absolute inset-0"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100vw',
          height: '100vh',
          backgroundImage: `url("/icon2-removebg.png")`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.05,
          zIndex: 1,
        }}
      ></div>
      
      <motion.div variants={itemVariants} className="relative z-10">
        <Header />
        <Hero />
        <Portfolio projects={projects} />
        <About />
        <Contact />
        <Footer />
      </motion.div>
    </motion.div>
  );
};

export default MainContent;
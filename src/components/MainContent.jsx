'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Header from './layout/Header';
import HeroWorks from './layout/HeroWorks';
import About from './sections/About/About';
import Contact from './sections/Contact/Contact';
import Footer from './layout/Footer';

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
  visible: { opacity: 1, transition: { duration: 1.4 } },
};

const MainContent = ({ projects }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative bg-background"
    >
      <motion.div variants={itemVariants} className="relative z-10">
        <Header />
        <HeroWorks projects={projects} />
        <About />
        <Contact />
        <Footer />
      </motion.div>
    </motion.div>
  );
};

export default MainContent;
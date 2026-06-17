'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Header from './layout/Header';
import HeroWorks from './layout/HeroWorks';
import CTA from './sections/CTA';
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
      className="relative"
    >
      <motion.div variants={itemVariants} className="relative z-10">
        <Header />
        <HeroWorks projects={projects} />
        <CTA />
        <Footer />
      </motion.div>
    </motion.div>
  );
};

export default MainContent;
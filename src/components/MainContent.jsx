'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Header from './layout/Header';
import HeroWorks from './layout/HeroWorks';
import BlogSection from './sections/BlogSection';
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

const MainContent = ({ projects, posts }) => {
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
        <BlogSection posts={(posts || []).slice(0, 3)} />
        <CTA />
        <Footer />
      </motion.div>
    </motion.div>
  );
};

export default MainContent;
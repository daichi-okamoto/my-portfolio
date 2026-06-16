'use client';

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Intro from './Intro';
import MainContent from './MainContent';
import CustomCursor from './CustomCursor';

function SiteShell({ projects }) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <CustomCursor />
      <MainContent projects={projects} />
      <AnimatePresence>
        {loading && <Intro key="intro" onFinish={() => setLoading(false)} />}
      </AnimatePresence>
    </>
  );
}

export default SiteShell;

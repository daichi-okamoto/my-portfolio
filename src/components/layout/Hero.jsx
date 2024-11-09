import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className='flex flex-col justify-center items-center h-[calc(100vh-80px)] tracking-[0.4em] text-black -mt-14'>
      <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-center">
        DAICHI OKAMOTO
      </h1>
      <p className="mt-4 text-xs md:text-base lg:text-xl text-center font-medium leading-relaxed">
        IT IS AN ENGINEER'S PORTFOLIO SITE.
      </p>
    </div>
  );
};

export default Hero;
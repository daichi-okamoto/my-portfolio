import React from 'react';
import { Link } from 'react-scroll';

const Header = () => {
  return (
    <header className='sticky top-0 z-50'>
      <nav className="flex items-center justify-between container mx-auto pt-4">
        <a href="" className='hover:opacity-80 duration-300'>
          <img src="/icon5-removebg.png" alt="" className='w-14 h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20' />
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
  );
};

export default Header;
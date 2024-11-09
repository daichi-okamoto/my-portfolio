import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Slider from 'react-slick';
import { sliderSettings } from '../../../data/projects';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-neutral-200 p-8 w-5/6 h-5/6 overflow-y-auto flex flex-col lg:flex-row relative"
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 0, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="absolute top-2 right-4 lg:text-xl xl:text-2xl text-black" 
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>

        <div className="w-full lg:w-1/3 lg:p-2 xl:p-4 text-black">
          <div className='flex justify-center items-center mb-2'>
            <h2 className="text-sm md:text-base lg:text-xl font-bold">
              {project.title}
            </h2>
          </div>
          <div className='text-left text-xs lg:text-sm 2xl:text-base'>
            <p className='tracking-wider leading-relaxed lg:leading-relaxed xl:leading-loose'>
              {project.details.text}
            </p>
          </div>
          <div className='my-8'>
            <div className='mb-2'>
              <h2 className='flex justify-center items-center font-bold text-black text-sm md:text-base lg:text-lg'>
                使用言語など
              </h2>
            </div>
            <div className='text-left text-xs lg:text-sm 2xl:text-base'>
              <p className='tracking-wider leading-relaxed lg:leading-relaxed xl:leading-loose'>
                {project.details.languages}
              </p>
            </div>
          </div>
          {project.details.githubLink && (
            <div>
              <a 
                href={project.details.githubLink} 
                className='flex items-center space-x-1 text-header text-xs lg:text-sm font-medium underline w-1/5 hover:opacity-70' 
                target="_blank" 
                rel="noopener noreferrer"
              >
                {project.details.githubIcon}
                <p>{project.details.githubTitle}</p>
              </a>
            </div>
          )}
          {project.details.websiteLink && (
            <div className='mt-2'>
              <a 
                href={project.details.websiteLink} 
                className='text-header font-medium underline text-xs lg:text-sm hover:opacity-70' 
                target="_blank" 
                rel="noopener noreferrer"
              >
                {project.details.siteTitle}
              </a>
            </div>
          )}
        </div>

        <div className="w-full lg:w-2/3 p-4 lg:mt-32 xl:mt-16">
          <Slider {...sliderSettings}>
            {project.images && project.images.map((image, index) => (
              <div key={index}>
                <img 
                  src={image} 
                  alt={`${project.title} Slide ${index + 1}`} 
                  className="w-full h-auto"
                />
              </div>
            ))}
          </Slider>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;
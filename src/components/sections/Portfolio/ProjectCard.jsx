import React from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ project, onClick }) => {
  return (
    <div>
      <a
        href="#"
        className='hover:opacity-70 duration-300'
        onClick={(e) => {
          e.preventDefault();
          onClick(project);
        }}
      >
        <img src={project.image} alt={project.title} className="w-full h-auto" />
        <p className='text-sm lg:text-lg text-header font-bold p-2 lg:p-4'>{project.title}</p>
      </a>
    </div>
  );
};

export default ProjectCard;
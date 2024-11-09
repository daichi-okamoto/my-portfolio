import React, { useState } from 'react';
import { Element } from 'react-scroll';
import { AnimatePresence } from 'framer-motion';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { FadeInSection } from '../../common/FadeInSection';

const Portfolio = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleClose = () => {
    setSelectedProject(null);
  };

  return (
    <Element name="portfolio">
      <section className='relative'>
        <FadeInSection>
          <div className='w-3/4 mx-auto tracking-widest my-20 xl:my-28'>
            <p className='text-xs md:text-base lg:text-lg xl:text-xl font-bold text-black'>
              ポートフォリオ
            </p>
            <div className='flex justify-between items-center'>
              <h2 className='text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-widest text-black'>
                PORTFOLIO
              </h2>
              <p className='text-xs md:text-base lg:text-base xl:text-base border-l pl-2 lg:pl-4 xl:pl-10 py-2 xl:py-6 border-side text-side font-bold tracking-wide xl:tracking-wider'>
                ENGINEERING
              </p>
            </div>
          </div>
        </FadeInSection>

        <div className='grid md:grid-cols-2 gap-10 object-cover w-3/4 mx-auto'>
          {projects.map((project) => (
            <FadeInSection key={project.id}>
              <ProjectCard project={project} onClick={handleProjectClick} />
            </FadeInSection>
          ))}
        </div>

        <AnimatePresence>
          {selectedProject && (
            <ProjectModal project={selectedProject} onClose={handleClose} />
          )}
        </AnimatePresence>
      </section>
    </Element>
  );
};

export default Portfolio;
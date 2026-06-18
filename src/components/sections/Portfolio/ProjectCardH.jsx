'use client';

import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const ProjectCardH = ({ project, index }) => {
  return (
    <Link
      href={`/works/${project.id}`}
      data-cursor="view"
      className="group shrink-0 w-[62vw] sm:w-[34rem] lg:w-[44rem] flex flex-col sm:flex-row sm:items-center sm:gap-6 lg:gap-10"
    >
      <div className="w-full sm:w-1/2 shrink-0 overflow-hidden rounded-sm">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-auto sm:h-[24vh] md:h-[32vh] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>

      <div className="w-full sm:w-1/2">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-serif text-accent text-xs tracking-[0.3em]">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="block w-8 h-px bg-line" />
        </div>
        <h3 className="font-serif text-lg lg:text-xl font-bold text-black tracking-wider mb-3 group-hover:text-accent transition-colors duration-300">
          {project.title}
        </h3>
        {project.description && (
          <div className="hidden sm:block mb-5">
            <p className="text-side text-xs leading-relaxed line-clamp-3">
              {project.description}
            </p>
          </div>
        )}
        <span className="inline-flex items-center gap-3 text-black text-xs tracking-[0.25em] font-bold">
          <span className="border-b border-black/40 pb-1 transition-colors duration-300 group-hover:border-accent group-hover:text-accent">
            VIEW MORE
          </span>
          <FontAwesomeIcon
            icon={faArrowRight}
            className="text-accent transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
};

export default ProjectCardH;

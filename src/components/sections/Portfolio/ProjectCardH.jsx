'use client';

import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const ProjectCardH = ({ project, index }) => {
  const tags = (project.details?.languages || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 4);

  return (
    <Link
      href={`/works/${project.id}`}
      data-cursor="view"
      className="group shrink-0 w-[72vw] sm:w-[22rem] lg:w-[26rem] block"
    >
      <div className="w-full overflow-hidden rounded-sm shadow-sm group-hover:shadow-xl transition-shadow duration-500">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-[26vh] md:h-[36vh] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
      </div>

      <div className="mt-5 flex items-start gap-3">
        <span className="font-serif text-accent text-xs tracking-[0.3em] mt-1 shrink-0">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div>
          <h3 className="font-serif text-lg lg:text-xl font-bold text-black tracking-wider mb-3 group-hover:text-accent transition-colors duration-300">
            {project.title}
          </h3>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((t, i) => (
                <span
                  key={i}
                  className="text-[10px] tracking-wider text-side border border-line rounded-full px-3 py-1"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
          <span className="inline-flex items-center gap-3 text-black text-xs tracking-[0.25em] font-bold">
            <span className="border-b border-black/40 pb-1 transition-colors duration-300 group-hover:border-accent group-hover:text-accent">
              VIEW PROJECT
            </span>
            <FontAwesomeIcon
              icon={faArrowRight}
              className="text-accent transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCardH;

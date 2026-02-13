
import React from 'react';
import { ProjectIdea } from '../types';

interface Props {
  projects: ProjectIdea[];
  onSelect: (project: ProjectIdea) => void;
}

const ProjectList: React.FC<Props> = ({ projects, onSelect }) => {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Curated For You
        </h2>
        <p className="mt-4 text-lg text-slate-600">
          Pick a project to see a complete implementation roadmap.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer group"
            onClick={() => onSelect(project)}
          >
            {/* Image Section */}
            <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
              {project.imageUrl ? (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-slate-100 animate-pulse">
                  <div className="flex flex-col items-center gap-2">
                    <svg className="h-8 w-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-xs text-slate-400 font-medium tracking-tight">Generating visual...</span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 flex flex-col h-full">
              <div className="flex items-center gap-x-2 mb-4">
                <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                  project.difficulty === 'Beginner' ? 'bg-green-50 text-green-700 ring-green-600/20' :
                  project.difficulty === 'Intermediate' ? 'bg-blue-50 text-blue-700 ring-blue-600/20' :
                  'bg-purple-50 text-purple-700 ring-purple-600/20'
                }`}>
                  {project.difficulty}
                </span>
                <span className="text-xs text-slate-500">• {project.duration}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {project.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600 flex-grow line-clamp-3">
                {project.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                    {tech}
                  </span>
                ))}
              </div>
              <button className="mt-6 w-full rounded-md border border-indigo-600 py-2.5 text-sm font-semibold text-indigo-600 transition-all hover:bg-indigo-600 hover:text-white">
                View Implementation Guide
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;

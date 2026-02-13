
import React from 'react';
import { ProjectGuide } from '../types';

interface Props {
  guide: ProjectGuide;
  onBack: () => void;
}

const ProjectGuideDetail: React.FC<Props> = ({ guide, onBack }) => {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-semibold text-indigo-600 mb-8 hover:text-indigo-500 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Back to Ideas
      </button>

      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header Section */}
        <div className="bg-indigo-600 px-8 py-10 sm:px-12 text-white">
          <h1 className="text-3xl sm:text-4xl font-extrabold">{guide.title}</h1>
          <p className="mt-4 text-indigo-100 text-lg leading-relaxed max-w-2xl italic">
            "{guide.objective}"
          </p>
        </div>

        <div className="px-8 py-10 sm:px-12">
          {/* Tech Stack */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-indigo-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
              </svg>
              Target Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {guide.techStackDetailed.map((tech) => (
                <span key={tech} className="bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-semibold border border-indigo-100">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Implementation Steps */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-indigo-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Implementation Roadmap
            </h2>
            <div className="space-y-12 relative before:absolute before:left-4 sm:before:left-6 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
              {guide.steps.map((step) => (
                <div key={step.stepNumber} className="relative pl-12 sm:pl-16">
                  {/* Step Number Badge */}
                  <div className="absolute left-0 top-0 w-8 h-8 sm:w-12 sm:h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md ring-4 ring-white z-10">
                    {step.stepNumber}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-slate-600 leading-relaxed mb-4">{step.description}</p>
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Pro Tips</h4>
                      <ul className="space-y-1">
                        {step.tips.map((tip, idx) => (
                          <li key={idx} className="text-sm text-slate-700 flex gap-2">
                            <span className="text-indigo-500">•</span> {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 p-6 bg-indigo-50 rounded-2xl border border-indigo-100 text-center">
            <h3 className="text-lg font-bold text-indigo-900 mb-2">Ready to start?</h3>
            <p className="text-indigo-700 mb-6">Open your favorite code editor and follow these steps to turn your concept into reality.</p>
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-indigo-700 transition-all shadow-lg">
              Let's Build It
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectGuideDetail;


import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
            Build My <span className="text-indigo-600">Project</span>
          </h1>
          <p className="mt-6 text-xl leading-8 text-slate-600 font-medium">
            Turning Concepts into Code
          </p>
          <p className="mt-4 text-lg text-slate-500 max-w-lg mx-auto">
            Input your courses and interests, and we'll generate the perfect project ideas with complete implementation roadmaps just for you.
          </p>
        </div>
      </div>
      {/* Decorative background element */}
      <div className="absolute top-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#6366f1_100%)]"></div>
    </div>
  );
};

export default Hero;


import React, { useState } from 'react';
import { UserPreferences } from '../types';

interface Props {
  onSubmit: (prefs: UserPreferences) => void;
  isLoading: boolean;
}

const CourseForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [courses, setCourses] = useState('');
  const [interests, setInterests] = useState('');
  const [skillLevel, setSkillLevel] = useState('Intermediate');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courses || !interests) return;
    onSubmit({ courses, interests, skillLevel });
  };

  return (
    <section className="mx-auto max-w-2xl px-6 py-12 bg-white rounded-2xl shadow-xl border border-slate-100">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="courses" className="block text-sm font-semibold leading-6 text-slate-900">
            What courses have you taken?
          </label>
          <div className="mt-2.5">
            <input
              type="text"
              id="courses"
              placeholder="e.g. Data Structures, Web Development, AI Basics"
              className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={courses}
              onChange={(e) => setCourses(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="interests" className="block text-sm font-semibold leading-6 text-slate-900">
            What are you interested in building?
          </label>
          <div className="mt-2.5">
            <input
              type="text"
              id="interests"
              placeholder="e.g. Finance tools, Game dev, E-commerce, Social apps"
              className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="skill" className="block text-sm font-semibold leading-6 text-slate-900">
            Your Current Skill Level
          </label>
          <div className="mt-2.5 grid grid-cols-3 gap-3">
            {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setSkillLevel(level)}
                className={`px-4 py-2 text-sm font-semibold rounded-md border transition-all ${
                  skillLevel === level
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-400'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center gap-2 rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-slate-400 transition-colors"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Thinking of Ideas...
            </>
          ) : (
            'Generate Project Ideas'
          )}
        </button>
      </form>
    </section>
  );
};

export default CourseForm;


import React, { useState, useCallback } from 'react';
import Hero from './components/Hero';
import CourseForm from './components/CourseForm';
import ProjectList from './components/ProjectList';
import ProjectGuideDetail from './components/ProjectGuideDetail';
import { ProjectIdea, ProjectGuide, UserPreferences } from './types';
import { generateProjectIdeas, generateProjectGuide, generateProjectImage } from './services/geminiService';

const App: React.FC = () => {
  const [loadingIdeas, setLoadingIdeas] = useState(false);
  const [loadingGuide, setLoadingGuide] = useState(false);
  const [projects, setProjects] = useState<ProjectIdea[]>([]);
  const [selectedGuide, setSelectedGuide] = useState<ProjectGuide | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (prefs: UserPreferences) => {
    setError(null);
    setLoadingIdeas(true);
    setProjects([]);
    try {
      const ideas = await generateProjectIdeas(prefs);
      setProjects(ideas);
      
      // Smooth scroll to projects
      setTimeout(() => {
        document.getElementById('project-results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

      // Trigger background image generation for each project
      ideas.forEach(async (idea, index) => {
        const imageUrl = await generateProjectImage(idea.imagePrompt);
        if (imageUrl) {
          setProjects(prev => prev.map(p => p.id === idea.id ? { ...p, imageUrl } : p));
        }
      });

    } catch (err) {
      setError("Failed to fetch ideas. Please check your connection and try again.");
    } finally {
      setLoadingIdeas(false);
    }
  };

  const handleSelectProject = async (project: ProjectIdea) => {
    setError(null);
    setLoadingGuide(true);
    try {
      const guide = await generateProjectGuide(project);
      if (guide) {
        setSelectedGuide(guide);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setError("Could not generate a guide for this project.");
      }
    } catch (err) {
      setError("Failed to generate implementation roadmap.");
    } finally {
      setLoadingGuide(false);
    }
  };

  const handleBackToProjects = () => {
    setSelectedGuide(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setSelectedGuide(null); setProjects([]); }}>
              <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-xl">B</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">BuildMyProject</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-sm font-medium text-slate-500">Turning Concepts into Code</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow pb-24">
        {error && (
          <div className="max-w-4xl mx-auto mt-8 px-6">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          </div>
        )}

        {selectedGuide ? (
          <ProjectGuideDetail guide={selectedGuide} onBack={handleBackToProjects} />
        ) : (
          <>
            <Hero />
            <CourseForm onSubmit={handleFormSubmit} isLoading={loadingIdeas} />
            
            {loadingGuide && (
              <div className="fixed inset-0 z-50 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent mb-4"></div>
                  <h3 className="text-xl font-bold text-slate-900">Engineering your roadmap...</h3>
                  <p className="text-slate-500">Gemini is architecting your implementation steps.</p>
                </div>
              </div>
            )}

            {projects.length > 0 && (
              <div id="project-results" className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <ProjectList projects={projects} onSelect={handleSelectProject} />
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 justify-between items-center gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-6 w-6 bg-indigo-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-sm">B</span>
                </div>
                <span className="text-lg font-bold tracking-tight text-slate-900">BuildMyProject</span>
              </div>
              <p className="text-sm text-slate-500 max-w-xs">
                Helping students bridge the gap between academic concepts and real-world code.
              </p>
            </div>
            <div className="text-sm text-slate-400 md:text-right">
              &copy; {new Date().getFullYear()} BuildMyProject. Powered by Gemini AI.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

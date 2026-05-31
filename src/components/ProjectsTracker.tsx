import { useState } from 'react';
import { ProjectItem } from '../types';
import { STATIC_PROJECTS } from '../data/staticCurriculum';
import { Award, Code, CheckCircle, Circle, Github, ExternalLink, Clock, TrendingUp, Cpu } from 'lucide-react';

interface ProjectsTrackerProps {
  completedProjects: string[];
  onToggleCompleteProject: (projectId: string) => void;
  onSelectModule: (moduleId: string) => void;
}

export default function ProjectsTracker({ completedProjects, onToggleCompleteProject, onSelectModule }: ProjectsTrackerProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');

  const filteredProjects = STATIC_PROJECTS.filter(p => {
    return activeTab === 'all' || p.difficulty === activeTab;
  });

  const getDifficultyStyles = (diff: string) => {
    switch (diff) {
      case 'beginner': return 'text-sky-700 bg-sky-50 dark:bg-sky-950/40 dark:text-sky-300 border-sky-100 dark:border-sky-850';
      case 'intermediate': return 'text-indigo-700 bg-indigo-50 dark:bg-indigo-950/40 dark:text-indigo-300 border-indigo-100 dark:border-indigo-850';
      case 'advanced': return 'text-purple-700 bg-purple-50 dark:bg-purple-950/40 dark:text-purple-300 border-purple-100 dark:border-purple-850';
      default: return 'text-gray-700 bg-gray-50';
    }
  };

  return (
    <div id="projects-tracker-container" className="space-y-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-150 dark:border-slate-800 pb-6">
        <div>
          <h2 className="text-3xl font-bold font-display text-indigo-950 dark:text-white flex items-center gap-2">
            <Code className="w-8 h-8 text-indigo-650" />
            Academy Projects Sandbox
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
            Tackle 6 practical notebooks pulled from beginner, intermediate, and advanced repository sections.
          </p>
        </div>

        {/* Level toggle pills */}
        <div className="flex gap-1.5 self-start text-xs font-mono font-medium">
          {['all', 'beginner', 'intermediate', 'advanced'].map(lvl => (
            <button
              id={`btn-proj-tab-${lvl}`}
              key={lvl}
              onClick={() => setActiveTab(lvl as any)}
              className={`px-4 py-2.5 rounded-xl border uppercase tracking-wider transition-colors cursor-pointer ${
                activeTab === lvl
                  ? 'bg-indigo-650 text-white border-indigo-650 font-bold'
                  : 'bg-white dark:bg-slate-950 text-gray-600 dark:text-gray-300 border-gray-150 dark:border-slate-900 hover:bg-gray-50'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Projects list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map(proj => {
          const isCompleted = completedProjects.includes(proj.id);

          return (
            <div 
              id={`proj-card-${proj.id}`}
              key={proj.id}
              className={`bg-white dark:bg-slate-900 rounded-3xl border transition-all duration-350 p-6 flex flex-col justify-between space-y-6 ${
                isCompleted 
                  ? 'border-emerald-150 bg-emerald-50/10 dark:border-emerald-950/20' 
                  : 'border-gray-150 dark:border-slate-850 hover:shadow-md'
              }`}
            >
              <div className="space-y-3.5 text-left">
                {/* Upper tags */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[9px] font-bold font-mono uppercase px-2.5 py-1 rounded-full border ${getDifficultyStyles(proj.difficulty)}`}>
                    {proj.difficulty} Level
                  </span>
                  
                  <button
                    id={`btn-complete-proj-${proj.id}`}
                    onClick={() => onToggleCompleteProject(proj.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold font-mono uppercase transition-all border cursor-pointer ${
                      isCompleted
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-250 dark:bg-emerald-950/30 dark:text-emerald-300'
                        : 'bg-white text-gray-500 border-gray-150 dark:bg-slate-950 hover:bg-gray-50'
                    }`}
                  >
                    {isCompleted ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 fill-current" /> Completed
                      </>
                    ) : (
                      <>
                        <Circle className="w-3.5 h-3.5 text-gray-350" /> Track Done
                      </>
                    )}
                  </button>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold font-display text-gray-950 dark:text-white leading-tight">
                  {proj.title}
                </h3>
                
                <p className="text-xs text-gray-500 dark:text-gray-450 leading-relaxed font-sans">
                  {proj.description}
                </p>

                {/* Requirements and parameters */}
                <div className="flex items-center gap-4 py-2 border-y border-gray-100/50 dark:border-slate-850/40 text-xs text-gray-400 font-mono">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Est: {proj.estimatedTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Cpu className="w-3.5 h-3.5" /> Pipeline ready
                  </span>
                </div>

                {/* Tech specifications */}
                <div className="space-y-1 text-xs">
                  <span className="font-bold text-gray-400 font-mono uppercase tracking-wider text-[10px]">Stack used:</span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.technologies.map(tech => (
                      <span key={tech} className="bg-gray-100 dark:bg-slate-800 text-gray-650 dark:text-gray-300 px-2 py-0.5 rounded text-[10px] font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Skills indicators */}
                <div className="space-y-1 text-xs">
                  <span className="font-bold text-gray-400 font-mono uppercase tracking-wider text-[10px]">Skills gained:</span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.skillsLearned.map(skill => (
                      <span key={skill} className="bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 px-2 py-0.5 rounded text-[10px] font-bold">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Outcomes list */}
                <div className="space-y-1.5 text-xs">
                  <span className="font-bold text-gray-400 font-mono uppercase tracking-wider text-[10px]">Real-world Outcomes:</span>
                  <ul className="list-disc pl-4 space-y-1 text-gray-650 dark:text-gray-305 leading-relaxed font-sans mt-1">
                    {proj.outcomes.map((out, idx) => (
                      <li key={idx}>{out}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* GitHub Link redirects */}
              <div className="flex items-center justify-between gap-4 pt-4 border-t border-gray-100 dark:border-slate-850/60 text-xs">
                {proj.modulePath && (
                  <button 
                    onClick={() => onSelectModule(proj.modulePath!)}
                    className="text-[11px] font-bold font-mono text-indigo-650 dark:text-indigo-400 hover:underline flex items-center gap-1"
                  >
                    View theory notes
                    <TrendingUp className="w-3.5 h-3.5" />
                  </button>
                )}
                <a
                  href={proj.githubLink}
                  target="_blank"
                  rel="noreferrer referrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 dark:bg-slate-950 dark:hover:bg-slate-800 transition-colors font-semibold border border-gray-150 dark:border-slate-800 text-gray-700 dark:text-gray-300"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Src</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

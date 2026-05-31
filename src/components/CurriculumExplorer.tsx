import { useState } from 'react';
import { ModuleNode } from '../types';
import { Search, ChevronDown, ChevronUp, Clock, AlertCircle, BookOpen, CheckCircle, Circle, Play } from 'lucide-react';

interface CurriculumExplorerProps {
  modules: ModuleNode[];
  completedModules: string[];
  onSelectModule: (moduleId: string) => void;
}

export default function CurriculumExplorer({ modules, completedModules, onSelectModule }: CurriculumExplorerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeDifficulty, setActiveDifficulty] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(null);

  // Toggle expanded detailed lessons card of modules
  const toggleExpandedModule = (id: string) => {
    if (expandedModuleId === id) {
      setExpandedModuleId(null);
    } else {
      setExpandedModuleId(id);
    }
  };

  // Filter modules based on search terms and selected difficulty layers
  const filteredModules = modules.filter(m => {
    const matchesSearch = 
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.learningObjectives.some(obj => obj.toLowerCase().includes(searchTerm.toLowerCase())) ||
      m.keyTakeaways.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesDifficulty = activeDifficulty === 'all' || m.difficulty === activeDifficulty;

    return matchesSearch && matchesDifficulty;
  });

  const getDifficultyBadgeClass = (diff: string) => {
    switch (diff) {
      case 'beginner': return 'text-sky-700 bg-sky-50 border-sky-200 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800';
      case 'intermediate': return 'text-indigo-700 bg-indigo-50 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800';
      case 'advanced': return 'text-purple-700 bg-purple-50 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div id="curriculum-explorer-container" className="space-y-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-150 dark:border-slate-800 pb-6">
        <div>
          <h2 className="text-3xl font-bold font-display text-indigo-950 dark:text-white">Curriculum Syllabus Explorer</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
            Discover all 26 catalog folders, sequence requirements, topic dimensions, and prerequisites.
          </p>
        </div>
      </div>

      {/* Advanced Fast-Search & Filters */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-gray-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-gray-150 dark:border-slate-850">
        
        {/* Instant Search input */}
        <div className="md:col-span-6 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            id="input-curriculum-search"
            type="text"
            placeholder="Search linear regression, SMOTE over-sampling, BERT transformers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white dark:bg-slate-950 text-gray-950 dark:text-white pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-800 text-sm focus:outline-indigo-600 focus:ring-1 focus:ring-indigo-600"
          />
        </div>

        {/* Filter Selection Pills */}
        <div className="md:col-span-6 flex flex-wrap items-center justify-end gap-2 text-xs">
          <button
            id="btn-diff-all"
            onClick={() => setActiveDifficulty('all')}
            className={`px-4 py-2.5 rounded-xl border font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              activeDifficulty === 'all'
                ? 'bg-indigo-650 hover:bg-indigo-600 text-white border-indigo-650'
                : 'bg-white dark:bg-slate-950 border-gray-150 dark:border-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-900'
            }`}
          >
            All Levels
          </button>
          <button
            id="btn-diff-beginner"
            onClick={() => setActiveDifficulty('beginner')}
            className={`px-4 py-2.5 rounded-xl border font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              activeDifficulty === 'beginner'
                ? 'bg-indigo-650 hover:bg-indigo-600 text-white border-indigo-650'
                : 'bg-white dark:bg-slate-950 border-gray-150 dark:border-slate-800 text-sky-600 dark:text-sky-400 hover:bg-gray-50 dark:hover:bg-slate-900'
            }`}
          >
            Beginner
          </button>
          <button
            id="btn-diff-intermediate"
            onClick={() => setActiveDifficulty('intermediate')}
            className={`px-4 py-2.5 rounded-xl border font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              activeDifficulty === 'intermediate'
                ? 'bg-indigo-650 hover:bg-indigo-600 text-white border-indigo-650'
                : 'bg-white dark:bg-slate-950 border-gray-150 dark:border-slate-800 text-indigo-600 dark:text-indigo-400 hover:bg-gray-50 dark:hover:bg-slate-900'
            }`}
          >
            Intermediate
          </button>
          <button
            id="btn-diff-advanced"
            onClick={() => setActiveDifficulty('advanced')}
            className={`px-4 py-2.5 rounded-xl border font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              activeDifficulty === 'advanced'
                ? 'bg-indigo-650 hover:bg-indigo-600 text-white border-indigo-650'
                : 'bg-white dark:bg-slate-950 border-gray-150 dark:border-slate-800 text-purple-600 dark:text-purple-400 hover:bg-gray-50 dark:hover:bg-slate-900'
            }`}
          >
            Advanced
          </button>
        </div>

      </div>

      {/* Grid of Course Cards */}
      <div className="space-y-4">
        {filteredModules.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-gray-150 dark:border-slate-850 p-6">
            <AlertCircle className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
            <h4 className="font-bold text-gray-900 dark:text-white">No modules match your search</h4>
            <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
              Ensure search terms are free of spelling issues or switch off specific group filters.
            </p>
          </div>
        ) : (
          filteredModules.map(m => {
            const isCompleted = completedModules.includes(m.id);
            const isExpanded = expandedModuleId === m.id;
            const isUnlocked = m.prerequisites.every(p => completedModules.includes(p));

            return (
              <div 
                id={`module-card-${m.id}`}
                key={m.id}
                className={`bg-white dark:bg-slate-900 rounded-2xl border transition-all duration-300 hover:shadow-xs overflow-hidden ${
                  isCompleted 
                    ? 'border-emerald-100 dark:border-emerald-950/40 bg-emerald-50/10' 
                    : isExpanded
                      ? 'border-indigo-200 dark:border-indigo-950' 
                      : 'border-gray-150 dark:border-slate-850'
                }`}
              >
                {/* Active card row */}
                <div 
                  onClick={() => toggleExpandedModule(m.id)}
                  className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 cursor-pointer select-none"
                >
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono font-bold tracking-wider text-gray-400 uppercase">
                        Module {(m.sequence).toString().padStart(2, '0')}
                      </span>
                      <span className={`text-[9px] font-bold font-mono px-2 py-0.5 rounded-full uppercase border ${getDifficultyBadgeClass(m.difficulty)}`}>
                        {m.difficulty}
                      </span>
                      {isCompleted && (
                        <span className="text-[9px] bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-emerald-500" /> Finished
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold font-display text-gray-950 dark:text-white line-clamp-1">
                      {m.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 max-w-2xl">
                      {m.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 self-stretch sm:self-auto justify-between border-t border-gray-100 sm:border-t-0 pt-3 sm:pt-0">
                    <div className="flex items-center gap-1.5 font-mono text-xs text-gray-500 dark:text-gray-450 mr-4">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>{m.durationHours}h Study</span>
                    </div>

                    <div className="flex items-center gap-1.5 p-1 rounded-full bg-gray-50 dark:bg-slate-950">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Extended description panel */}
                {isExpanded && (
                  <div className="border-t border-gray-100 dark:border-slate-850 bg-gray-50/50 dark:bg-slate-950/20 p-6 space-y-6">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                      
                      {/* Objectives on left */}
                      <div className="space-y-3">
                        <h4 className="font-bold text-indigo-950 dark:text-indigo-400 uppercase tracking-wider text-[11px] font-mono flex items-center gap-1.5">
                          <BookOpen className="w-4 h-4" /> Target Learning Objectives
                        </h4>
                        <ul className="space-y-1.5 text-xs text-gray-650 dark:text-gray-300 list-disc pl-4 leading-relaxed">
                          {m.learningObjectives.map((obj, oIdx) => (
                            <li key={oIdx}>{obj}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Takeaways on right */}
                      <div className="space-y-3">
                        <h4 className="font-bold text-pink-950 dark:text-pink-400 uppercase tracking-wider text-[11px] font-mono flex items-center gap-1.5">
                          <AlertCircle className="w-4 h-4" /> Key Concept Takeaways
                        </h4>
                        <ul className="space-y-1.5 text-xs text-gray-655 dark:text-gray-305 list-disc pl-4 leading-relaxed">
                          {m.keyTakeaways.map((take, tIdx) => (
                            <li key={tIdx}>{take}</li>
                          ))}
                        </ul>
                      </div>

                    </div>

                    {/* Pre-requisite tags */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-gray-150/40 dark:border-slate-800/40">
                      <div className="text-xs">
                        <span className="font-bold text-gray-500 font-mono uppercase tracking-wider text-[10px] mr-2">Prerequisites:</span>
                        {m.prerequisites.length === 0 ? (
                          <span className="text-gray-405 font-medium">None. Entry level block</span>
                        ) : (
                          <span className="space-x-2">
                            {m.prerequisites.map(prereqId => {
                              const pm = modules.find(x => x.id === prereqId);
                              return (
                                <span key={prereqId} className="inline-block bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded font-mono text-[10px]">
                                  {pm ? pm.name : prereqId}
                                </span>
                              );
                            })}
                          </span>
                        )}
                      </div>

                      {/* Direct start launcher button */}
                      <button
                        id={`btn-curriculum-start-${m.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectModule(m.id);
                        }}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-xs cursor-pointer text-white ${
                          isCompleted
                            ? 'bg-emerald-600 hover:bg-emerald-550'
                            : isUnlocked
                              ? 'bg-indigo-650 hover:bg-indigo-600'
                              : 'bg-gray-400 cursor-not-allowed'
                        }`}
                        disabled={!isUnlocked && !isCompleted}
                      >
                        {isCompleted ? 'Review Material' : 'Launch Notebook'}
                        <Play className="w-4 h-4 fill-current" />
                      </button>
                    </div>

                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

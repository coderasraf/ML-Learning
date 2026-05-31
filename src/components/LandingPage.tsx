import { BookOpen, Award, Target, Flame, Play, Sparkles, Code, Cpu, ChevronRight } from 'lucide-react';
import { ModuleNode } from '../types';

interface LandingPageProps {
  modules: ModuleNode[];
  onStartLearning: () => void;
  onSelectTab: (tab: string) => void;
}

export default function LandingPage({ modules, onStartLearning, onSelectTab }: LandingPageProps) {
  const totalHours = modules.reduce((acc, m) => acc + m.durationHours, 0);
  const beginnerCount = modules.filter(m => m.difficulty === 'beginner').length;
  const intermediateCount = modules.filter(m => m.difficulty === 'intermediate').length;
  const advancedCount = modules.filter(m => m.difficulty === 'advanced').length;

  return (
    <div id="landing-page-container" className="space-y-16 py-4">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-radial from-indigo-900 via-indigo-950 to-slate-950 px-6 py-16 md:px-12 md:py-24 text-white shadow-xl">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        <div className="relative max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-xs font-semibold tracking-wider text-indigo-300 uppercase font-mono">
            <Sparkles className="w-3.5 h-3.5" /> 100% Complete Verified GitHub Curriculum
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold font-display leading-tight tracking-tight">
            Road to <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Machine Learning</span>
          </h1>
          
          <p className="text-base md:text-xl text-indigo-200 font-sans max-w-2xl mx-auto font-light leading-relaxed">
            Transition from absolute mathematical foundations to production deep-learning deployers. Track progress, take AI-coached sessions, study, and generate customized quizzes dynamically.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button
              id="btn-landing-start"
              onClick={onStartLearning}
              className="flex items-center gap-2 px-8 py-4 rounded-xl bg-indigo-650 hover:bg-indigo-600 font-bold tracking-wide transition-all shadow-lg shadow-indigo-950/40 hover:scale-105 cursor-pointer text-white"
            >
              <Play className="w-5 h-5 fill-current" />
              Launch Learning Dashboard
            </button>
            <button
              id="btn-landing-roadmap"
              onClick={() => onSelectTab('roadmap')}
              className="px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 font-bold tracking-wide transition-all hover:scale-105 cursor-pointer text-gray-200"
            >
              View Interactive Roadmap
            </button>
          </div>
        </div>
      </section>

      {/* Curriculum Numbers / Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        <div className="bento-card bg-white dark:bg-slate-900/40 p-6 border border-gray-150 dark:border-slate-800 backdrop-blur-md flex items-center gap-4">
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold font-mono text-gray-950 dark:text-white">{modules.length}</div>
            <div className="text-xs text-gray-500 font-mono uppercase tracking-wider dark:text-gray-400">Full Modules</div>
          </div>
        </div>

        <div className="bento-card bg-white dark:bg-slate-900/40 p-6 border border-gray-150 dark:border-slate-800 backdrop-blur-md flex items-center gap-4">
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
            <Code className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold font-mono text-gray-950 dark:text-white">6</div>
            <div className="text-xs text-gray-500 font-mono uppercase tracking-wider dark:text-gray-400">Academy Projects</div>
          </div>
        </div>

        <div className="bento-card bg-white dark:bg-slate-900/40 p-6 border border-gray-150 dark:border-slate-800 backdrop-blur-md flex items-center gap-4">
          <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold font-mono text-gray-950 dark:text-white">{totalHours}h</div>
            <div className="text-xs text-gray-500 font-mono uppercase tracking-wider dark:text-gray-400">Total Study Time</div>
          </div>
        </div>

        <div className="bento-card bg-white dark:bg-slate-900/40 p-6 border border-gray-150 dark:border-slate-800 backdrop-blur-md flex items-center gap-4">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold font-mono text-gray-950 dark:text-white">6</div>
            <div className="text-xs text-gray-500 font-mono uppercase tracking-wider dark:text-gray-400">Achievement Badges</div>
          </div>
        </div>
      </section>

      {/* Curriculum Levels Pathway cards */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-3xl font-bold font-display text-gray-950 dark:text-white">Continuous Curriculum Tracks</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Select a track matching your existing background, following the original chronological folder path structure.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Beginner Grid */}
          <div className="bento-card bento-glow-indigo bg-white dark:bg-slate-900/40 p-6 border border-gray-150 dark:border-slate-800 backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono px-2.5 py-1 rounded bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 uppercase">
                  Beginner Path
                </span>
                <span className="text-xs text-gray-500 font-mono font-medium">{beginnerCount} modules</span>
              </div>
              <h3 className="text-xl font-bold font-display mt-4 text-gray-950 dark:text-white">Scientific Python & Mathematical Foundations</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
                Study environments like Conda and VSCode, vectors, calculus partial derivatives, scientific NumPy, Pandic relational aggregates, visual rendering plots, and supervised baselines.
              </p>
            </div>
            <button
              onClick={() => { onSelectTab('curriculum'); }}
              className="flex items-center gap-2 mt-6 font-semibold text-indigo-600 dark:text-indigo-400 text-sm group cursor-pointer"
            >
              Explore beginner courses
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Intermediate Grid */}
          <div className="bento-card bento-glow-indigo bg-white dark:bg-slate-900/40 p-6 border border-gray-150 dark:border-slate-800 backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono px-2.5 py-1 rounded bg-indigo-100 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400 uppercase">
                  Intermediate Space
                </span>
                <span className="text-xs text-gray-500 font-mono font-medium">{intermediateCount} modules</span>
              </div>
              <h3 className="text-xl font-bold font-display mt-4 text-gray-950 dark:text-white">Structured Descents & Classical Ensembles</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
                Tackle cross-validated parameter optimizations, grid tuning grids, bagging Random Forest trees, gradient boosted matrices, unsupervised DBSCAN grids, PCA projections, and baseline neural nets.
              </p>
            </div>
            <button
              onClick={() => { onSelectTab('curriculum'); }}
              className="flex items-center gap-2 mt-6 font-semibold text-indigo-600 dark:text-indigo-400 text-sm group cursor-pointer"
            >
              Explore intermediate courses
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Advanced Grid */}
          <div className="bento-card bento-glow-indigo bg-white dark:bg-slate-900/40 p-6 border border-gray-150 dark:border-slate-800 backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono px-2.5 py-1 rounded bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 uppercase">
                  Advanced Domain
                </span>
                <span className="text-xs text-gray-500 font-mono font-medium">{advancedCount} modules</span>
              </div>
              <h3 className="text-xl font-bold font-display mt-4 text-gray-950 dark:text-white">Deployments, Transformers & Generative AI</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
                Deploy FastAPI containerized servers, monitor drift trends with CD pipelines, write PyTorch CNN image models, build dot-attention Transformers, graph datasets, and fine-tune LLM adapters (LoRA).
              </p>
            </div>
            <button
              onClick={() => { onSelectTab('curriculum'); }}
              className="flex items-center gap-2 mt-6 font-semibold text-indigo-600 dark:text-indigo-400 text-sm group cursor-pointer"
            >
              Explore advanced courses
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* Structured study layout guide */}
      <section className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-900/60 dark:to-slate-900/30 p-8 md:p-12 rounded-3xl border border-indigo-100/40 dark:border-slate-800/80 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-xl">
          <div className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-bold font-mono uppercase tracking-wider">
            <Target className="w-4 h-4" /> Comprehensive ML Methodology
          </div>
          <h2 className="text-3xl font-bold font-display text-indigo-950 dark:text-white">Proven active study methodology</h2>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-350 leading-relaxed">
            Learning machine learning requires writing actual code and solving problems rather than clicking videos. The platform guides you through detailed written material, interactive code sandboxes, comprehensive structured projects, and AI-driven conversational coaching to challenge your logic at every turn.
          </p>
        </div>

        <div className="w-full lg:w-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bento-card bg-white dark:bg-slate-900/40 p-5 border border-gray-150 dark:border-slate-800 backdrop-blur-md space-y-1">
            <div className="text-indigo-600 dark:text-indigo-400 font-bold text-lg">1. Explore Notes</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Read the exact lesson textbooks compiled from the Git catalog.</p>
          </div>
          <div className="bento-card bg-white dark:bg-slate-900/40 p-5 border border-gray-150 dark:border-slate-800 backdrop-blur-md space-y-1">
            <div className="text-indigo-600 dark:text-indigo-400 font-bold text-lg">2. Write Code</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Run verified python kernels and try localized exercises.</p>
          </div>
          <div className="bento-card bg-white dark:bg-slate-900/40 p-5 border border-gray-150 dark:border-slate-800 backdrop-blur-md space-y-1">
            <div className="text-indigo-600 dark:text-indigo-400 font-bold text-lg">3. Generate Quizzes</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Take machine learning questions generated in real-time by AI.</p>
          </div>
          <div className="bento-card bg-white dark:bg-slate-900/40 p-5 border border-gray-150 dark:border-slate-800 backdrop-blur-md space-y-1">
            <div className="text-indigo-600 dark:text-indigo-400 font-bold text-lg">4. Solve Projects</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Design notebooks from house pricing regressions to BERT adapters.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

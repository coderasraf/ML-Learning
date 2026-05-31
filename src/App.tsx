import { useState, useEffect } from 'react';
import { UserProgress, ModuleNode, PlannerTask } from './types';
import { STATIC_MODULES } from './data/staticCurriculum';

// Component Imports
import ThemeToggle from './components/ThemeToggle';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import CurriculumExplorer from './components/CurriculumExplorer';
import ModuleDetailPage from './components/ModuleDetailPage';
import RoadmapView from './components/RoadmapView';
import ProjectsTracker from './components/ProjectsTracker';
import ResourcesLibrary from './components/ResourcesLibrary';

// Icons Import
import { 
  Network, BookOpen, Cpu, Sparkles, Award, Github, 
  ArrowRight, Search, Activity, RefreshCw, Layers, Terminal, AlertCircle, HelpCircle
} from 'lucide-react';

const LOCAL_STORAGE_KEY = 'road_to_ml_progress_v2';

const INITIAL_PROGRESS: UserProgress = {
  completedModules: [],
  completedProjects: [],
  plannerTasks: [
    { id: 't1', title: 'Start Phase 0 Mathematics prerequisites', dueDate: new Date().toISOString().split('T')[0], completed: false, modulePath: '00-prerequisites' },
    { id: 't2', title: 'Complete Python for Data Science and scikit tools', dueDate: new Date().toISOString().split('T')[0], completed: false, modulePath: '01-python-for-data-science' }
  ],
  studyGoalHours: 10,
  streak: {
    currentStreak: 1,
    longestStreak: 1,
    lastActiveDate: new Date().toISOString().split('T')[0],
    history: []
  },
  notes: [],
  achievements: []
};

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('theme') === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  const [activeTab, setActiveTab] = useState<string>('landing');
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);

  // Sync variables
  const [syncState, setSyncState] = useState<{ repoUrl: string; branch: string; lastSyncedAt: string; status: string } | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showSyncHeader, setShowSyncHeader] = useState(false);

  // User learning state
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing progress, resetting state');
      }
    }
    return INITIAL_PROGRESS;
  });

  // Dark Mode Sync
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Save Progress State Changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  // Fetch Sync Config from Back-End on boot
  useEffect(() => {
    const fetchSyncStatus = async () => {
      try {
        const res = await fetch('/api/sync-status');
        if (res.ok) {
          const data = await res.json();
          setSyncState(data);
        }
      } catch (err) {
        console.warn('Backend not responding to boot status routes, running standard client preview');
      }
    };
    fetchSyncStatus();
    checkAndUpdateStreaks();
  }, []);

  // Update study streaks consecutively
  const checkAndUpdateStreaks = () => {
    const today = new Date().toISOString().split('T')[0];
    setProgress(prev => {
      const streak = { ...prev.streak };
      if (streak.lastActiveDate === today) {
        return prev; // Already recorded today
      }

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      if (streak.lastActiveDate === yesterdayStr) {
        streak.currentStreak += 1;
        if (streak.currentStreak > streak.longestStreak) {
          streak.longestStreak = streak.currentStreak;
        }
      } else {
        streak.currentStreak = 1; // broken sequence trigger reset
      }

      streak.lastActiveDate = today;
      return { ...prev, streak };
    });
  };

  // Perform backend Sync
  const handleTriggerSync = async () => {
    setIsSyncing(true);
    try {
      const res = await fetch('/api/sync-github', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          repoUrl: syncState?.repoUrl || 'https://github.com/NabidAlam/road-to-machine-learning',
          branch: syncState?.branch || 'main'
        })
      });
      if (res.ok) {
        const data = await res.json();
        setSyncState(data.syncState);
        alert('Curriculum synchronized cleanly with repository RAW files!');
      }
    } catch (e) {
      console.error(e);
      alert('Local workspace updated.');
    } finally {
      setIsSyncing(false);
      setShowSyncHeader(false);
    }
  };

  // State Action: Toggle complete module
  const handleToggleCompleteModule = (moduleId: string) => {
    setProgress(prev => {
      let updatedModules = [...prev.completedModules];
      if (updatedModules.includes(moduleId)) {
        updatedModules = updatedModules.filter(id => id !== moduleId);
      } else {
        updatedModules.push(moduleId);
      }

      const updatedProgress = { ...prev, completedModules: updatedModules };
      return evaluateAchievements(updatedProgress);
    });
  };

  // State Action: Toggle complete project
  const handleToggleCompleteProject = (projectId: string) => {
    setProgress(prev => {
      let updatedProjects = [...prev.completedProjects];
      if (updatedProjects.includes(projectId)) {
        updatedProjects = updatedProjects.filter(id => id !== projectId);
      } else {
        updatedProjects.push(projectId);
      }

      const updatedProgress = { ...prev, completedProjects: updatedProjects };
      return evaluateAchievements(updatedProgress);
    });
  };

  // State Action: Add note
  const handleSaveNoteState = (lessonPath: string, title: string, content: string) => {
    setProgress(prev => {
      let updatedNotes = [...prev.notes];
      const existingIdx = updatedNotes.findIndex(n => n.lessonPath === lessonPath);

      if (existingIdx >= 0) {
        updatedNotes[existingIdx] = {
          ...updatedNotes[existingIdx],
          content,
          updatedAt: new Date().toISOString()
        };
      } else {
        updatedNotes.push({
          id: `note-${Date.now()}`,
          lessonPath,
          lessonTitle: title,
          content,
          updatedAt: new Date().toISOString()
        });
      }

      const updatedProgress = { ...prev, notes: updatedNotes };
      return evaluateAchievements(updatedProgress);
    });
  };

  // State Action: Delete note
  const handleDeleteNote = (noteId: string) => {
    setProgress(prev => ({
      ...prev,
      notes: prev.notes.filter(n => n.id !== noteId)
    }));
  };

  // State Action: Planner tasks
  const handleAddTask = (title: string, dueDate: string, modulePath?: string) => {
    setProgress(prev => ({
      ...prev,
      plannerTasks: [
        ...prev.plannerTasks,
        {
          id: `task-${Date.now()}`,
          title,
          dueDate,
          completed: false,
          modulePath
        }
      ]
    }));
  };

  const handleToggleTask = (taskId: string) => {
    setProgress(prev => ({
      ...prev,
      plannerTasks: prev.plannerTasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t)
    }));
  };

  const handleDeleteTask = (taskId: string) => {
    setProgress(prev => ({
      ...prev,
      plannerTasks: prev.plannerTasks.filter(t => t.id !== taskId)
    }));
  };

  const handleUpdateGoal = (hours: number) => {
    setProgress(prev => ({
      ...prev,
      studyGoalHours: hours
    }));
  };

  // Real-time achievement evaluator
  const evaluateAchievements = (currentProgress: UserProgress): UserProgress => {
    const earned = [...currentProgress.achievements];

    // badge-first-step
    if (currentProgress.completedModules.length >= 1 && !earned.includes('badge-first-step')) {
      earned.push('badge-first-step');
    }
    // badge-cadet
    if (currentProgress.completedModules.length >= 5 && !earned.includes('badge-cadet')) {
      earned.push('badge-cadet');
    }
    // badge-math
    const mathCompleted = currentProgress.completedModules.includes('00-prerequisites');
    if (mathCompleted && !earned.includes('badge-math')) {
      earned.push('badge-math');
    }
    // badge-deep-science
    const isDeepUnlocked = currentProgress.completedModules.includes('09-neural-networks-basics') && currentProgress.completedModules.includes('10-deep-learning-frameworks');
    if (isDeepUnlocked && !earned.includes('badge-deep-science')) {
      earned.push('badge-deep-science');
    }
    // badge-craftsman
    if (currentProgress.completedProjects.length >= 3 && !earned.includes('badge-craftsman')) {
      earned.push('badge-craftsman');
    }
    // badge-scribe
    if (currentProgress.notes.length >= 1 && !earned.includes('badge-scribe')) {
      earned.push('badge-scribe');
    }

    return { ...currentProgress, achievements: earned };
  };

  // Drill directly to selected module from any card
  const handleSelectModuleId = (id: string) => {
    setSelectedModuleId(id);
    setActiveTab('curriculum-detail');
  };

  const selectedModule = STATIC_MODULES.find(m => m.id === selectedModuleId);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] font-sans transition-colors duration-300">
      
      {/* Dynamic Repo Sync Header Toggle bar */}
      {showSyncHeader && (
        <div id="sync-header-pnl" className="bg-gradient-to-r from-indigo-900 to-indigo-950 text-white px-6 py-4 border-b border-indigo-950 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs font-sans">
          <div className="space-y-1">
            <h4 className="font-bold flex items-center gap-1.5 text-indigo-300">
              <Github className="w-4 h-4 text-white" />
              Dynamic Git Curriculum Mapping Panel
            </h4>
            <p className="text-gray-300">
              Keep the syllabus inline with NabidAlam/road-to-machine-learning references on the main branches.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex gap-2 w-full md:w-auto">
              <input
                id="input-sync-repo-url"
                type="text"
                placeholder="Repository link"
                value={syncState?.repoUrl || ''}
                onChange={(e) => setSyncState(prev => prev ? { ...prev, repoUrl: e.target.value } : null)}
                className="bg-slate-950 border border-slate-800 px-3 py-2 rounded-lg text-xs leading-normal w-full md:w-64 text-white focus:outline-none"
              />
              <input
                id="input-sync-branch"
                type="text"
                placeholder="branch (e.g. main)"
                value={syncState?.branch || ''}
                onChange={(e) => setSyncState(prev => prev ? { ...prev, branch: e.target.value } : null)}
                className="bg-slate-950 border border-slate-800 px-3 py-2 rounded-lg text-xs leading-normal w-24 text-white focus:outline-none"
              />
            </div>

            <button
              id="btn-sync-submit"
              onClick={handleTriggerSync}
              disabled={isSyncing}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-bold transition-all shrink-0 cursor-pointer text-white flex items-center gap-1"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              {isSyncing ? 'Syncing...' : 'Sync Now'}
            </button>
          </div>
        </div>
      )}

      {/* Main navigation Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-gray-150 dark:border-slate-850 px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => { setActiveTab('landing'); setSelectedModuleId(null); }}
          className="flex items-center gap-2 text-left cursor-pointer select-none"
        >
          <div className="p-2 bg-indigo-650 rounded-xl text-white">
            <Terminal className="w-5 h-5 shrink-0" />
          </div>
          <div>
            <h1 className="text-base font-extrabold font-display text-indigo-950 dark:text-white uppercase tracking-tight">
              ML Academy
            </h1>
            <span className="text-[10px] text-gray-400 font-mono block">Road to Machine Learning</span>
          </div>
        </button>

        {/* Categories toggler tabs desktp */}
        <nav className="hidden lg:flex items-center gap-1 bg-gray-50 dark:bg-slate-900/60 p-1 rounded-xl border border-gray-150 dark:border-slate-850 text-xs font-semibold">
          {[
            { id: 'landing', label: 'Explore Space' },
            { id: 'dashboard', label: 'My Dashboard' },
            { id: 'roadmap', label: 'ML Roadmap' },
            { id: 'curriculum', label: 'All Courses' },
            { id: 'projects', label: 'Projects sandbox' },
            { id: 'resources', label: 'Reference library' }
          ].map(tab => (
            <button
              id={`nav-link-${tab.id}`}
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSelectedModuleId(null); }}
              className={`px-4 py-2 rounded-lg cursor-pointer transition-all ${
                activeTab === tab.id || (tab.id === 'curriculum' && activeTab === 'curriculum-detail')
                  ? 'bg-indigo-650 text-white font-bold'
                  : 'text-gray-550 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Global configurations right side */}
        <div className="flex items-center gap-1">
          {/* Sync Trigger button */}
          <button
            id="btn-sync-header-toggle"
            onClick={() => setShowSyncHeader(!showSyncHeader)}
            title="Syllabus synchronization settings"
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-600 dark:text-gray-300 transition-colors mr-1 cursor-pointer"
          >
            <Github className="w-5 h-5" />
          </button>

          {/* Theme toggler */}
          <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>
      </header>

      {/* Primary Display viewport container */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        
        {activeTab === 'landing' && (
          <LandingPage 
            modules={STATIC_MODULES} 
            onStartLearning={() => setActiveTab('dashboard')} 
            onSelectTab={(tabId) => { setActiveTab(tabId); setSelectedModuleId(null); }}
          />
        )}

        {activeTab === 'dashboard' && (
          <Dashboard 
            progress={progress} 
            modules={STATIC_MODULES}
            onSelectModule={handleSelectModuleId}
            onAddTask={handleAddTask}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
            onUpdateGoal={handleUpdateGoal}
            onDeleteNote={handleDeleteNote}
          />
        )}

        {activeTab === 'curriculum' && (
          <CurriculumExplorer 
            modules={STATIC_MODULES}
            completedModules={progress.completedModules}
            onSelectModule={handleSelectModuleId}
          />
        )}

        {activeTab === 'curriculum-detail' && selectedModule && (
          <ModuleDetailPage 
            module={selectedModule}
            modules={STATIC_MODULES}
            progress={progress}
            onGoBack={() => setActiveTab('curriculum')}
            onSelectModule={handleSelectModuleId}
            onToggleCompleteModule={handleToggleCompleteModule}
            onSaveNote={handleSaveNoteState}
          />
        )}

        {activeTab === 'roadmap' && (
          <RoadmapView 
            modules={STATIC_MODULES}
            completedModules={progress.completedModules}
            onSelectModule={handleSelectModuleId}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectsTracker 
            completedProjects={progress.completedProjects}
            onToggleCompleteProject={handleToggleCompleteProject}
            onSelectModule={handleSelectModuleId}
          />
        )}

        {activeTab === 'resources' && (
          <ResourcesLibrary />
        )}

      </main>

      {/* Tab bar navigation helper for mobile viewports */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white dark:bg-slate-900 border-t border-gray-150 dark:border-slate-850 px-2 py-2.5 flex justify-around z-40 shadow-lg text-[10px] font-medium font-sans">
        <button
          onClick={() => { setActiveTab('landing'); setSelectedModuleId(null); }}
          className={`flex flex-col items-center gap-1 ${activeTab === 'landing' ? 'text-indigo-650' : 'text-gray-400'}`}
        >
          <Activity className="w-5 h-5" />
          <span>Explore</span>
        </button>
        <button
          onClick={() => { setActiveTab('dashboard'); setSelectedModuleId(null); }}
          className={`flex flex-col items-center gap-1 ${activeTab === 'dashboard' ? 'text-indigo-655' : 'text-gray-400'}`}
        >
          <Award className="w-5 h-5" />
          <span>Dashboard</span>
        </button>
        <button
          onClick={() => { setActiveTab('roadmap'); setSelectedModuleId(null); }}
          className={`flex flex-col items-center gap-1 ${activeTab === 'roadmap' ? 'text-indigo-655' : 'text-gray-400'}`}
        >
          <Network className="w-5 h-5" />
          <span>Roadmap</span>
        </button>
        <button
          onClick={() => { setActiveTab('curriculum'); setSelectedModuleId(null); }}
          className={`flex flex-col items-center gap-1 ${activeTab === 'curriculum' || activeTab === 'curriculum-detail' ? 'text-indigo-655' : 'text-gray-400'}`}
        >
          <BookOpen className="w-5 h-5" />
          <span>Syllabus</span>
        </button>
        <button
          onClick={() => { setActiveTab('projects'); setSelectedModuleId(null); }}
          className={`flex flex-col items-center gap-1 ${activeTab === 'projects' ? 'text-indigo-655' : 'text-gray-400'}`}
        >
          <Cpu className="w-5 h-5" />
          <span>Projects</span>
        </button>
      </div>

    </div>
  );
}

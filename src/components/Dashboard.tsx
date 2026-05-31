import { useState } from 'react';
import { UserProgress, ModuleNode, PlannerTask } from '../types';
import { STATIC_ACHIEVEMENTS } from '../data/staticCurriculum';
import { Flame, Award, BookOpen, Clock, Calendar, CheckSquare, Plus, Trash2, Edit2, Play, CheckCircle2 } from 'lucide-react';

interface DashboardProps {
  progress: UserProgress;
  modules: ModuleNode[];
  onSelectModule: (moduleId: string) => void;
  onAddTask: (title: string, dueDate: string, modulePath?: string) => void;
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onUpdateGoal: (hours: number) => void;
  onDeleteNote: (noteId: string) => void;
}

export default function Dashboard({
  progress,
  modules,
  onSelectModule,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onUpdateGoal,
  onDeleteNote
}: DashboardProps) {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskModule, setNewTaskModule] = useState('');
  const [newTaskDate, setNewTaskDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });

  const [editingGoal, setEditingGoal] = useState(false);
  const [goalInput, setGoalInput] = useState(progress.studyGoalHours.toString());

  // Calculate stats
  const totalLessonsCount = modules.length; // 1 lesson/module primary index
  const completedCount = progress.completedModules.length;
  const completionPercentage = Math.round((completedCount / totalLessonsCount) * 100) || 0;

  const totalStudyTimeCompleted = progress.completedModules.reduce((acc, mId) => {
    const mod = modules.find(m => m.id === mId);
    return acc + (mod ? mod.durationHours : 0);
  }, 0);

  // Recommendations: Find first incomplete module by sequence
  const nextRecommended = modules
    .slice()
    .sort((a, b) => a.sequence - b.sequence)
    .find(m => !progress.completedModules.includes(m.id));

  // Handle study goal update
  const handleSaveGoal = () => {
    const hours = parseInt(goalInput) || 5;
    onUpdateGoal(hours);
    setEditingGoal(false);
  };

  // Handle task insert
  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    onAddTask(newTaskTitle, newTaskDate, newTaskModule || undefined);
    setNewTaskTitle('');
    setNewTaskModule('');
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'beginner': return 'text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-300';
      case 'intermediate': return 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 dark:text-indigo-300';
      case 'advanced': return 'text-purple-600 bg-purple-50 dark:bg-purple-900/30 dark:text-purple-300';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div id="dashboard-container" className="space-y-12">
      {/* Overview stats header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-150 dark:border-slate-800">
        <div>
          <h2 className="text-3xl font-bold font-display text-indigo-950 dark:text-white">Your Learning Dashboard</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1 max-w-xl text-sm">
            Monitor study metrics, map goal progress, study streaks, achievement tokens, and maintain custom schedules.
          </p>
        </div>

        {/* Streak indicator */}
        <div className="flex items-center gap-4 bg-amber-500/10 border border-amber-500/20 px-5 py-3 rounded-2xl">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-600">
            <Flame className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="text-lg font-bold font-mono text-amber-700 dark:text-amber-400">
              {progress.streak.currentStreak} Day Streak
            </div>
            <p className="text-[11px] text-gray-500 dark:text-amber-500/60 font-mono">
              Longest: {progress.streak.longestStreak} days
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Left statistics & schedule | Right badges & notes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Core learning statistics & Recommendations */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Detailed Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Completion Gauge Card */}
            <div className="bento-card bg-white dark:bg-slate-900/40 p-6 border border-gray-150 dark:border-slate-800 backdrop-blur-md flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-gray-750 dark:text-gray-300">Course Completion</span>
                <BookOpen className="w-5 h-5 text-indigo-650" />
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-extrabold font-mono text-indigo-900 dark:text-white">{completionPercentage}%</span>
                <span className="text-xs text-gray-400">({completedCount}/{totalLessonsCount})</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-indigo-600 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>

            {/* Total Hours Completed */}
            <div className="bento-card bg-white dark:bg-slate-900/40 p-6 border border-gray-150 dark:border-slate-800 backdrop-blur-md flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-gray-750 dark:text-gray-300">Class Hours Finished</span>
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-extrabold font-mono text-purple-900 dark:text-white">{totalStudyTimeCompleted}h</span>
                <span className="text-xs text-gray-400">logged</span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                Out of total {modules.reduce((a, b) => a + b.durationHours, 0)} hours
              </div>
            </div>

            {/* Weekly Study Goal setting */}
            <div className="bento-card bg-white dark:bg-slate-900/40 p-6 border border-gray-150 dark:border-slate-800 backdrop-blur-md flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-gray-750 dark:text-gray-300">Weekly Goal</span>
                <button
                  id="btn-edit-goal"
                  onClick={() => setEditingGoal(!editingGoal)} 
                  className="p-1 hover:bg-gray-150 dark:hover:bg-slate-800 rounded text-gray-500"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>

              {editingGoal ? (
                <div className="space-y-2 mb-2">
                  <div className="flex gap-2">
                    <input
                      id="input-goal-hours"
                      type="number"
                      value={goalInput}
                      onChange={(e) => setGoalInput(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-slate-950 px-2 py-1 rounded text-sm text-gray-950 dark:text-white border border-gray-150 dark:border-slate-800 focus:outline-indigo-600"
                    />
                    <button
                      id="btn-save-goal"
                      onClick={handleSaveGoal}
                      className="bg-indigo-600 px-3 py-1 rounded text-xs font-bold text-white cursor-pointer"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-extrabold font-mono text-teal-900 dark:text-teal-400">{progress.studyGoalHours}h</span>
                  <span className="text-xs text-gray-400">per week</span>
                </div>
              )}

              <div className="text-[11px] text-gray-500 dark:text-gray-400 leading-normal">
                Structured target. Finish approximately 1 complete module per week containing interactive exercises.
              </div>
            </div>

          </div>

          {/* Recommended Next Lesson Banner */}
          {nextRecommended && (
            <div className="bento-card bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 text-white border border-gray-200 dark:border-slate-800 p-6 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden bento-glow-indigo">
              <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 blur-[60px] rounded-full -mr-16 -mt-16 pointer-events-none"></div>
              <div className="space-y-1 relative z-10">
                <div className="inline-flex items-center gap-1.5 text-xs text-indigo-400 font-bold tracking-widest uppercase font-mono bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full">
                  Recommended Next Module
                </div>
                <h3 className="text-xl font-bold font-display leading-tight">{nextRecommended.name}</h3>
                <p className="text-sm text-indigo-200 leading-normal line-clamp-2 max-w-xl">
                  {nextRecommended.description}
                </p>
              </div>

              <button
                id={`btn-recommended-${nextRecommended.id}`}
                onClick={() => onSelectModule(nextRecommended.id)}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-sm font-semibold transition-all shrink-0 cursor-pointer text-white shadow-lg shadow-indigo-950/50 hover:scale-102 font-sans relative z-10"
              >
                Start Lesson
                <Play className="w-4 h-4 fill-current" />
              </button>
            </div>
          )}

          {/* Study Planner Tracker */}
          <div className="bento-card bg-white dark:bg-slate-900/40 p-6 border border-gray-150 dark:border-slate-800 backdrop-blur-md space-y-6">
            <h3 className="text-lg font-bold font-display text-gray-950 dark:text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-655" />
              Dynamic Study Planner
            </h3>

            {/* Insertion Form */}
            <form onSubmit={handleCreateTask} className="grid grid-cols-1 md:grid-cols-12 gap-3">
              <input
                id="input-task-title"
                type="text"
                placeholder="Study linear derivatives, solve house price lasso, fine-tune models..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="md:col-span-6 bg-gray-50 dark:bg-slate-950 px-3 py-2.5 rounded-xl text-sm border border-gray-150 dark:border-slate-800 text-gray-950 dark:text-white focus:outline-indigo-600"
              />
              <select
                id="select-task-module"
                value={newTaskModule}
                onChange={(e) => setNewTaskModule(e.target.value)}
                className="md:col-span-3 bg-gray-50 dark:bg-slate-950 px-3 py-2.5 rounded-xl text-xs border border-gray-150 dark:border-slate-800 text-gray-900 dark:text-gray-300 focus:outline-indigo-600"
              >
                <option value="">Unlinked Task</option>
                {modules.map(m => (
                  <option key={m.id} value={m.path}>{m.name}</option>
                ))}
              </select>
              <input
                id="input-task-date"
                type="date"
                value={newTaskDate}
                onChange={(e) => setNewTaskDate(e.target.value)}
                className="md:col-span-2 bg-gray-50 dark:bg-slate-950 px-2 py-2 rounded-xl text-xs border border-gray-150 dark:border-slate-800 text-gray-950 dark:text-white focus:outline-indigo-600"
              />
              <button
                id="btn-add-task"
                type="submit"
                className="md:col-span-1 bg-indigo-650 hover:bg-indigo-600 text-white rounded-xl p-2.5 flex items-center justify-center cursor-pointer transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </form>

            {/* List entries */}
            <div className="space-y-3 pt-2">
              {progress.plannerTasks.length === 0 ? (
                <div className="text-center py-6 text-gray-400 dark:text-gray-500 text-xs">
                  No active learning schedules mapped. Plan your milestones above!
                </div>
              ) : (
                progress.plannerTasks.map(task => {
                  const correlatedModule = modules.find(m => m.path === task.modulePath);

                  return (
                    <div 
                      key={task.id} 
                      className={`flex items-center justify-between p-3.5 rounded-xl border transition-colors ${
                        task.completed 
                          ? 'bg-gray-50/50 dark:bg-slate-900/40 border-gray-100 dark:border-slate-850 opacity-70' 
                          : 'bg-white dark:bg-slate-900 border-gray-100 dark:border-slate-800'
                      }`}
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <button
                          id={`btn-toggle-task-${task.id}`}
                          onClick={() => onToggleTask(task.id)}
                          className={`mt-0.5 p-0.5 rounded cursor-pointer ${
                            task.completed ? 'text-emerald-500' : 'text-gray-300 hover:text-indigo-600'
                          }`}
                        >
                          {task.completed ? (
                            <CheckCircle2 className="w-5 h-5 fill-current" />
                          ) : (
                            <CheckSquare className="w-5 h-5" />
                          )}
                        </button>
                        <div className="min-w-0">
                          <p className={`text-sm font-medium text-gray-950 dark:text-white leading-snug ${task.completed ? 'line-through text-gray-400' : ''}`}>
                            {task.title}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-gray-400 font-mono">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" /> Due: {task.dueDate}
                            </span>
                            {correlatedModule && (
                              <button
                                onClick={() => onSelectModule(correlatedModule.id)}
                                className="text-indigo-600 hover:underline inline-block truncate max-w-[200px]"
                              >
                                Link: {correlatedModule.name}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <button
                        id={`btn-delete-task-${task.id}`}
                        onClick={() => onDeleteTask(task.id)}
                        className="text-gray-300 hover:text-red-500 p-1.5 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Badges & Saved Lesson Notes */}
        <div className="space-y-8">
          
          {/* Achievements badge showcase */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-150 dark:border-slate-850 shadow-xs space-y-6">
            <h3 className="text-lg font-bold font-display text-gray-950 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              Academy Badges
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {STATIC_ACHIEVEMENTS.map(badge => {
                const isUnlocked = progress.achievements.includes(badge.id);

                return (
                  <div 
                    id={`badge-card-${badge.id}`}
                    key={badge.id}
                    className={`p-4 rounded-xl border text-center relative overflow-hidden flex flex-col items-center justify-center transition-all ${
                      isUnlocked 
                        ? 'border-amber-100 bg-amber-50/20 dark:border-amber-950/20 dark:bg-amber-950/10' 
                        : 'border-gray-100 bg-gray-50/30 dark:border-slate-850/20 opacity-40'
                    }`}
                    title={badge.condition}
                  >
                    <div className={`p-3 rounded-full mb-3 shadow-xs ${
                      isUnlocked 
                        ? 'bg-amber-100 text-amber-600 dark:bg-amber-950/50' 
                        : 'bg-gray-100 text-gray-300 dark:bg-slate-800'
                    }`}>
                      <Award className="w-6 h-6" />
                    </div>
                    <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200 uppercase font-mono leading-tight tracking-wider line-clamp-1">
                      {badge.title}
                    </h4>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 leading-normal">
                      {badge.description}
                    </p>
                    {isUnlocked && (
                      <span className="absolute top-1 right-2 bg-emerald-500 text-[9px] text-white px-1.5 py-0.5 rounded-full font-bold font-mono">
                        Earned
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* User Notebook Notes tracker */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-150 dark:border-slate-850 shadow-xs space-y-6">
            <h3 className="text-lg font-bold font-display text-gray-950 dark:text-white flex items-center gap-2 font-sans">
              <BookOpen className="w-5 h-5 text-indigo-600 animate-pulse" />
              Lesson Notebook
            </h3>

            <div className="space-y-4">
              {progress.notes.length === 0 ? (
                <div className="text-center py-6 text-gray-400 dark:text-gray-500 text-xs">
                  No notes saved yet. Take customized notes inside study lesson interfaces!
                </div>
              ) : (
                progress.notes.map(note => {
                  const corrModule = modules.find(m => m.files.some(f => f.path === note.lessonPath) || m.path === note.lessonPath);

                  return (
                    <div 
                      key={note.id}
                      className="p-4 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-100 dark:border-slate-800 space-y-2 text-left"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          {corrModule && (
                            <button
                              onClick={() => onSelectModule(corrModule.id)}
                              className="text-[10px] font-bold font-mono text-indigo-600 dark:text-indigo-400 hover:underline uppercase block tracking-wider"
                            >
                              {corrModule.name}
                            </button>
                          )}
                          <h4 className="text-xs font-bold text-gray-900 dark:text-white mt-0.5 line-clamp-1 leading-snug">
                            {note.lessonTitle}
                          </h4>
                        </div>
                        <button
                          id={`btn-delete-note-${note.id}`}
                          onClick={() => onDeleteNote(note.id)}
                          className="text-gray-300 hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-xs text-gray-650 dark:text-gray-300 whitespace-pre-wrap line-clamp-4 leading-relaxed font-sans">
                        {note.content}
                      </p>
                      
                      <div className="text-[9px] text-gray-400 dark:text-gray-500 font-mono text-right">
                        Last saved: {new Date(note.updatedAt).toLocaleDateString()}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

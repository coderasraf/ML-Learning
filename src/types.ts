export interface ModuleNode {
  id: string; // e.g., '01-python-for-data-science'
  name: string; // e.g., 'Python for Data Science'
  path: string; // folder name on github
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationWeeks?: number;
  durationHours: number;
  sequence: number;
  description: string;
  prerequisites: string[];
  learningObjectives: string[];
  keyTakeaways: string[];
  files: LessonFile[];
}

export interface LessonFile {
  name: string; // e.g., 'README.md'
  path: string; // e.g., '01-python-for-data-science/README.md'
  type: 'file' | 'dir';
  sha?: string;
  downloadUrl?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  modulePath?: string;
  description: string;
  skillsLearned: string[];
  technologies: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  githubLink: string;
  outcomes: string[];
}

export interface ResourceItem {
  id: string;
  title: string;
  category: 'Books' | 'Courses' | 'Articles' | 'Papers' | 'Videos' | 'Tools' | 'Frameworks';
  description: string;
  link: string;
  tags: string[];
  author?: string;
}

export interface StreakState {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string | null; // YYYY-MM-DD
  history: string[]; // dates active YYYY-MM-DD
}

export interface UserNote {
  id: string;
  lessonPath: string; // path key
  lessonTitle: string;
  content: string;
  updatedAt: string;
}

export interface UserProgress {
  completedLessons?: string[]; // file paths
  completedModules: string[]; // module ids
  completedProjects: string[]; // projects completed ids
  bookmarkedLessons?: string[]; // file paths
  notes: UserNote[];
  streak: StreakState;
  studyGoalHours: number; // e.g. 5 hours per week
  plannerTasks: PlannerTask[];
  achievements: string[]; // achievement keys
  lastViewedLesson?: string | null; // path key
}

export interface PlannerTask {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
  modulePath?: string;
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  condition: string;
  unlockedAt?: string;
}

export interface SyncConfig {
  repoUrl: string;
  branch: string;
  githubToken?: string;
  lastSyncedAt?: string;
  isCustomRepo: boolean;
  status: 'idle' | 'syncing' | 'success' | 'error';
  errorMsg?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

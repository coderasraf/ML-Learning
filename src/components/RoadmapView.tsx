import { ModuleNode } from '../types';
import { Network, CheckCircle2, Circle, Lock, BrainCircuit, ArrowRight, ArrowDown } from 'lucide-react';

interface RoadmapViewProps {
  modules: ModuleNode[];
  completedModules: string[];
  onSelectModule: (moduleId: string) => void;
}

interface RoadmapNode {
  id: string;
  name: string;
  category: string;
  moduleId: string; // mapped module
  description: string;
  x: number; // grid row placement
  y: number; // grid col placement
}

export default function RoadmapView({ modules, completedModules, onSelectModule }: RoadmapViewProps) {
  // Map standard roadmap nodes to their actual curriculum moduleIds we loaded
  const roadmapNodes: RoadmapNode[] = [
    { id: 'math', name: 'Mathematics & Prerequisites', category: 'Foundation', moduleId: '00-prerequisites', description: 'Vectors, derivatives, matrix calculations', x: 1, y: 1 },
    { id: 'python', name: 'Python for Data Science', category: 'Foundation', moduleId: '01-python-for-data-science', description: 'Conda, NumPy, Pandas, visualization', x: 2, y: 1 },
    { id: 'sql', name: 'SQL & Database Fundamentals', category: 'Foundation', moduleId: '19-sql-database-fundamentals', description: 'Table aggregates, joins, extraction', x: 3, y: 1 },
    { id: 'ml-basics', name: 'Machine Learning Fundamentals', category: 'ML Core', moduleId: '02-introduction-to-ml', description: 'Features, targets, train-test baselines', x: 1, y: 2 },
    { id: 'regression', name: 'Supervised: Regression', category: 'ML Core', moduleId: '03-supervised-learning-regression', description: 'Linear, OLS, Ridge and Lasso weights', x: 2, y: 2 },
    { id: 'classification', name: 'Supervised: Classification', category: 'ML Core', moduleId: '04-supervised-learning-classification', description: 'Logistic, Sigmoid, SVMs, Decision Trees', x: 3, y: 2 },
    { id: 'eval', name: 'Evaluation & Optimization', category: 'ML Core', moduleId: '05-model-evaluation-optimization', description: 'Cross validation, grids, bias-variance', x: 4, y: 2 },
    { id: 'ensembles', name: 'Ensembles & Boosting', category: 'Advanced ML', moduleId: '06-ensemble-methods', description: 'Random Forests, XGBoost, LightGBM', x: 1, y: 3 },
    { id: 'features', name: 'Feature Engineering', category: 'Advanced ML', moduleId: '07-feature-engineering', description: 'Scaling, encoders, robust outliers, PCA', x: 2, y: 3 },
    { id: 'unsupervised', name: 'Unsupervised Learning', category: 'Advanced ML', moduleId: '08-unsupervised-learning', description: 'K-Means, DBSCAN, t-SNE, UMAP profiles', x: 3, y: 3 },
    { id: 'imbalanced', name: 'Handling Imbalanced Data', category: 'Advanced ML', moduleId: '20-handling-imbalanced-data', description: 'SMOTE over-sampling, cost-sensitive fits', x: 4, y: 3 },
    { id: 'explainability', name: 'Model Explainability (XAI)', category: 'Advanced ML', moduleId: '21-model-explainability', description: 'SHAP indices, LIME models, PDP curves', x: 5, y: 3 },
    { id: 'deep-basics', name: 'Neural Networks Basics', category: 'Deep Learning', moduleId: '09-neural-networks-basics', description: 'MLP, backpropagation passes, activation limits', x: 1, y: 4 },
    { id: 'pytorch', name: 'PyTorch deep frameworks', category: 'Deep Learning', moduleId: '10-deep-learning-frameworks', description: 'Dynamic tracers, data loaders, CUDA weights', x: 2, y: 4 },
    { id: 'cv', name: 'Computer Vision & CNNs', category: 'Deep Learning', moduleId: '11-computer-vision', description: 'Convolutions, ResNet, Transfer Learning', x: 3, y: 4 },
    { id: 'nlp', name: 'NLP & Self-Attention', category: 'Deep Learning', moduleId: '12-natural-language-processing', description: 'Recurrent nets, LSTM, BERT, Transformers', x: 4, y: 4 },
    { id: 'time-series', name: 'Time Series Forecasting', category: 'Deep Learning', moduleId: '15-time-series-analysis', description: 'Trends, stationarity, ARIMA, Prophet', x: 5, y: 4 },
    { id: 'gnn', name: 'Graph Neural Networks (GNN)', category: 'Deep Learning', moduleId: '23-graph-neural-networks', description: 'Adjacency graphs, message aggregation, GCN', x: 6, y: 4 },
    { id: 'audio', name: 'Speech & Audio Processing', category: 'Deep Learning', moduleId: '24-audio-speech-processing', description: 'Mel-spectrograms, MFCC, voice recognition', x: 7, y: 4 },
    { id: 'llm', name: 'Generative AI & LLMs', category: 'Modern GenAI', moduleId: '25-generative-ai-llms', description: 'PEFT tuning, LoRA, RAG databases, Agents', x: 1, y: 5 },
    { id: 'deploy', name: 'Model Deployment', category: 'Production', moduleId: '13-model-deployment', description: 'FastAPI, Docker containers, Streamlit maps', x: 2, y: 5 },
    { id: 'mlops', name: 'MLOps Basics & Monitoring', category: 'Production', moduleId: '14-mlops-basics', description: 'MLflow registry, drift monitors, CD loops', x: 3, y: 5 },
    { id: 'reinforcement', name: 'Reinforcement Learning', category: 'Production', moduleId: '22-reinforcement-learning', description: 'MDP grids, tabular Q-tables, DQN buffers', x: 4, y: 5 }
  ];

  const getStatusColor = (moduleId: string) => {
    if (completedModules.includes(moduleId)) {
      return 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400';
    }
    // Basic heuristics: if the previous sequence item is completed, it's unlocked
    const currentModule = modules.find(m => m.id === moduleId);
    if (!currentModule) return 'border-indigo-100 bg-white text-gray-400';
    
    const isUnlocked = currentModule.prerequisites.every(prereqId => completedModules.includes(prereqId));
    if (isUnlocked) {
      return 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-900 dark:text-indigo-300';
    }
    return 'border-gray-200 bg-gray-50/50 dark:bg-slate-900/40 text-gray-400 dark:text-gray-500';
  };

  const getCategoryClass = (category: string) => {
    switch (category) {
      case 'Foundation': return 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300';
      case 'ML Core': return 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300';
      case 'Advanced ML': return 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300';
      case 'Deep Learning': return 'bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300';
      case 'Modern GenAI': return 'bg-pink-100 dark:bg-pink-950 text-pink-700 dark:text-pink-300';
      case 'Production': return 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const phases = [
    { title: 'Phase 0 & 1: Foundations', category: 'Foundation', color: 'border-blue-500 text-blue-600' },
    { title: 'Phase 2 & 3: Supervised Core', category: 'ML Core', color: 'border-indigo-500 text-indigo-600' },
    { title: 'Phase 4: Advanced & Feature Space', category: 'Advanced ML', color: 'border-purple-500 text-purple-600' },
    { title: 'Phase 5 & 6: Neural Nets & Deep Fields', category: 'Deep Learning', color: 'border-violet-500 text-violet-600' },
    { title: 'Phase 7 & 8: GenAI, Reinforcement & Ops', category: 'Modern GenAI', color: 'border-pink-500 text-pink-600' }
  ];

  return (
    <div id="roadmap-container" className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 dark:border-slate-800 pb-6">
        <div>
          <h2 className="text-3xl font-bold font-display text-indigo-950 dark:text-white flex items-center gap-3">
            <Network className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            Machine Learning Visual Roadmap
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-2xl">
            A step-by-step master plan tracing your educational curriculum from fundamental calculations up to deployed deep transformers. Click any node to drill directly into lessons!
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 bg-gray-50 dark:bg-slate-900/60 p-3 rounded-lg border border-gray-100 dark:border-slate-800 text-xs">
          <div className="flex items-center gap-1.5 font-medium text-emerald-600">
            <CheckCircle2 className="w-4 h-4" /> Completed
          </div>
          <div className="flex items-center gap-1.5 font-medium text-indigo-600">
            <Circle className="w-4 h-4" /> Ready to Study
          </div>
          <div className="flex items-center gap-1.5 font-medium text-gray-400">
            <Lock className="w-4 h-4" /> Locked Prerequisites
          </div>
        </div>
      </div>

      {/* Render beautiful roadmap blocks split by Phase Groups */}
      <div className="space-y-10">
        {phases.map((phase, idx) => {
          const matchingNodes = roadmapNodes.filter(n => n.category === phase.category || 
            (phase.category === 'Foundation' && n.category === 'Foundation') ||
            (phase.category === 'Modern GenAI' && (n.category === 'Modern GenAI' || n.category === 'Production'))
          );

          return (
            <div key={idx} className="relative bg-white dark:bg-slate-900/40 p-6 rounded-2xl border border-gray-100 dark:border-slate-800/80 shadow-xs">
              <div className="absolute top-0 left-6 -translate-y-1/2 bg-gray-50 dark:bg-slate-950 py-1 px-4 rounded-full border border-gray-100 dark:border-slate-800 text-xs font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase font-mono">
                {phase.title}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {matchingNodes.map(node => {
                  const m = modules.find(mod => mod.id === node.moduleId);
                  const isCompleted = completedModules.includes(node.moduleId);
                  const isUnlocked = m ? m.prerequisites.every(p => completedModules.includes(p)) : true;
                  const statusClass = getStatusColor(node.moduleId);

                  return (
                    <button
                      id={`node-item-${node.id}`}
                      key={node.id}
                      onClick={() => onSelectModule(node.moduleId)}
                      className={`text-left p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02] hover:shadow-md cursor-pointer ${statusClass}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className={`text-[10px] uppercase font-bold font-mono px-2 py-0.5 rounded-full ${getCategoryClass(node.category)}`}>
                          {node.category}
                        </span>
                        <span>
                          {isCompleted ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          ) : isUnlocked ? (
                            <Circle className="w-4 h-4 text-indigo-500 shrink-0" />
                          ) : (
                            <Lock className="w-4 h-4 text-gray-300 dark:text-gray-600 shrink-0" />
                          )}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold font-display mt-2 text-gray-900 dark:text-white line-clamp-1">
                        {node.name}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                        {node.description}
                      </p>

                      <div className="flex items-center gap-2 mt-3 pt-2 border-t border-gray-100/50 dark:border-slate-800/40 text-[11px] font-medium text-indigo-600 dark:text-indigo-400 font-mono">
                        <span>Go to lesson</span>
                        <ArrowRight className="w-3. h-3" />
                      </div>
                    </button>
                  );
                })}
              </div>

              {idx < phases.length - 1 && (
                <div className="hidden lg:flex justify-center items-center mt-6 -mb-4">
                  <div className="bg-indigo-50 dark:bg-slate-900 p-1.5 rounded-full border border-indigo-100 dark:border-slate-800">
                    <ArrowDown className="w-5 h-5 text-indigo-500 animate-bounce" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

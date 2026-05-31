import { useState, useEffect, useRef } from 'react';
import { ModuleNode, UserProgress, QuizQuestion } from '../types';
import Markdown from 'react-markdown';
import { 
  ArrowLeft, ChevronLeft, ChevronRight, Save, BrainCircuit, Sparkles, Send,
  CheckCircle, HelpCircle, FileText, CheckCircle2, Circle, Edit3, MessageSquare, BookOpen, AlertCircle
} from 'lucide-react';

interface ModuleDetailPageProps {
  module: ModuleNode;
  modules: ModuleNode[];
  progress: UserProgress;
  onGoBack: () => void;
  onSelectModule: (moduleId: string) => void;
  onToggleCompleteModule: (moduleId: string) => void;
  onSaveNote: (lessonPath: string, title: string, content: string) => void;
}

export default function ModuleDetailPage({
  module,
  modules,
  progress,
  onGoBack,
  onSelectModule,
  onToggleCompleteModule,
  onSaveNote,
}: ModuleDetailPageProps) {
  const [selectedFile, setSelectedFile] = useState(module.files[0] || { name: 'README.md', path: `${module.path}/README.md` });
  const [markdownContent, setMarkdownContent] = useState('');
  const [isLoadingContent, setIsLoadingContent] = useState(false);
  const [contentSource, setContentSource] = useState('cache');

  // Interactive Notes State
  const [localNote, setLocalNote] = useState('');
  const [noteSavedFeedback, setNoteSavedFeedback] = useState(false);

  // AI Assistant Chatbot State
  const [aiChatQuery, setAiChatQuery] = useState('');
  const [aiMessages, setAiMessages] = useState<{ sender: 'user' | 'coach'; text: string }[]>([
    { sender: 'coach', text: `Hi! I am your AI Study Coach for **${module.name}**. Feel free to ask me to explain any equation, code snippet, or theoretical concept in detail!` }
  ]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Quiz Panel State
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [isQuizLoading, setIsQuizLoading] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Fetch file content whenever the selected file changes
  useEffect(() => {
    const fetchContent = async () => {
      setIsLoadingContent(true);
      try {
        const res = await fetch(`/api/lesson-content?path=${encodeURIComponent(selectedFile.path)}`);
        if (!res.ok) throw new Error('API server failed');
        const data = await res.json();
        setMarkdownContent(data.content);
        setContentSource(data.source);
      } catch (err) {
        console.warn('Could not fetch lesson content, loading default template structure');
        // Simple client-side direct fallback if express not fully booted during transitional cycles
        setMarkdownContent(`# Default Syllabus Notebook \nThis module comprises notebooks for **${module.name}**.`);
        setContentSource('client-local');
      } finally {
        setIsLoadingContent(false);
      }
    };
    fetchContent();

    // Reset local notes and quiz when moving between modules
    const existingNote = progress.notes.find(n => n.lessonPath === selectedFile.path);
    setLocalNote(existingNote ? existingNote.content : '');
    setQuizStarted(false);
    setShowQuizResults(false);
    setQuizQuestions([]);
    setUserAnswers({});
  }, [selectedFile, module.id]);

  // Handle Note Save
  const handleSaveNote = () => {
    onSaveNote(selectedFile.path, selectedFile.name, localNote);
    setNoteSavedFeedback(true);
    setTimeout(() => setNoteSavedFeedback(false), 2000);
  };

  // Scroll to bottom of AI chat window
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [aiMessages]);

  // Handle AI Chat submissions
  const handleSendAiInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiChatQuery.trim() || isAiLoading) return;

    const userPrompt = aiChatQuery;
    setAiMessages(prev => [...prev, { sender: 'user', text: userPrompt }]);
    setAiChatQuery('');
    setIsAiLoading(true);

    try {
      const res = await fetch('/api/ask-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userPrompt,
          contextLessonName: selectedFile.name,
          contextContent: markdownContent
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Server inquiry failed');
      }

      const data = await res.json();
      setAiMessages(prev => [...prev, { sender: 'coach', text: data.answer }]);
    } catch (err: any) {
      setAiMessages(prev => [...prev, { sender: 'coach', text: `Failed to contact AI Coach. ${err.message}` }]);
    } finally {
      setIsAiLoading(false);
    }
  };

  // Handle Quiz Initiations
  const handleStartQuiz = async () => {
    setIsQuizLoading(true);
    setQuizStarted(true);
    setShowQuizResults(false);
    setUserAnswers({});
    try {
      const res = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          moduleName: module.name,
          moduleDescription: module.description
        })
      });
      const data = await res.json();
      setQuizQuestions(data.questions);
    } catch (err) {
      console.error('Quiz generation failed', err);
    } finally {
      setIsQuizLoading(false);
    }
  };

  // Evaluate quiz submissions
  const handleAnswerSelect = (qIdx: number, oIdx: number) => {
    setUserAnswers(prev => ({ ...prev, [qIdx]: oIdx }));
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    quizQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctAnswer) {
        score += 1;
      }
    });
    setQuizScore(score);
    setShowQuizResults(true);

    // If perfectly completed, automatically prompt a note/completeness flag if user agrees
    if (score === quizQuestions.length) {
      onToggleCompleteModule(module.id);
    }
  };

  // Sequence selectors
  const previousModule = modules.find(m => m.sequence === module.sequence - 1);
  const nextModule = modules.find(m => m.sequence === module.sequence + 1);

  const isModuleCompleted = progress.completedModules.includes(module.id);

  return (
    <div id="module-detail-container" className="space-y-6">
      
      {/* Return & completed header buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-2 border-b border-gray-100 dark:border-slate-800 pb-4">
        <button
          id="btn-detail-back"
          onClick={onGoBack}
          className="flex items-center gap-2 text-sm font-semibold text-gray-650 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Curriculum
        </button>

        <div className="flex items-center gap-3">
          {/* Status completion toggler */}
          <button
            id="btn-toggle-module-completeness"
            onClick={() => onToggleCompleteModule(module.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              isModuleCompleted
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-800'
                : 'bg-white text-gray-700 border-gray-200 dark:bg-slate-900 dark:text-gray-250 dark:border-slate-800 hover:bg-gray-50'
            }`}
          >
            {isModuleCompleted ? (
              <>
                <CheckCircle className="w-4 h-4 text-emerald-500 fill-current" /> Completed Milestone
              </>
            ) : (
              <>
                <Circle className="w-4 h-4 text-gray-300" /> Mark Module Complete
              </>
            )}
          </button>
        </div>
      </div>

      {/* Primary Grid Layout: Left is lesson files & Markdown doc, Right is AI chatbot & Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Lesson materials reader (8 columns) */}
        <div className="lg:col-span-8 space-y-6 min-w-0">
          
          {/* Files select list inside directory */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-150 dark:border-slate-850 p-4 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold font-mono text-gray-400 uppercase tracking-wider mr-2 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5" /> Module Files:
            </span>
            {module.files.map((file, idx) => (
              <button
                id={`btn-file-select-${idx}`}
                key={idx}
                onClick={() => setSelectedFile(file)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                  selectedFile.path === file.path
                    ? 'bg-indigo-600 text-white shadow-xs font-bold'
                    : 'bg-gray-50 text-gray-600 dark:bg-slate-950 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'
                }`}
              >
                {file.name}
              </button>
            ))}
          </div>

          {/* Core Markdown Book Reader wrapper */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-150 dark:border-slate-850 p-6 md:p-8 min-h-[500px] shadow-xs relative">
            {isLoadingContent ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 dark:bg-slate-950/60 p-4 rounded-3xl backdrop-blur-xs">
                <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                  Compiling Markdown & downloading from NabidAlam/road-to-machine-learning...
                </p>
              </div>
            ) : null}

            {/* Source Tag Badge */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-[10px] font-mono font-bold tracking-wider uppercase text-gray-400">
                Source: <span className={contentSource === 'github-live' ? 'text-indigo-650' : 'text-amber-600'}>{contentSource}</span>
              </div>
              <div className="text-[11px] font-mono font-medium text-gray-450">
                {module.durationHours} hours study allocation
              </div>
            </div>

            {/* Content Display */}
            <div className="markdown-body">
              <Markdown>{markdownContent}</Markdown>
            </div>
          </div>

          {/* Module sequential navigator */}
          <div className="flex justify-between items-center p-4 bg-white dark:bg-slate-900 rounded-2xl border border-gray-150 dark:border-slate-850">
            {previousModule ? (
              <button
                id={`btn-module-prev-${previousModule.id}`}
                onClick={() => onSelectModule(previousModule.id)}
                className="flex items-center gap-1.5 px-4 py-2 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-xl text-left cursor-pointer min-w-0"
              >
                <ChevronLeft className="w-5 h-5 text-indigo-600" />
                <div className="min-w-0">
                  <span className="text-[10px] text-gray-400 font-bold font-mono tracking-wider block uppercase">Previous Module</span>
                  <span className="text-xs text-gray-800 dark:text-gray-200 font-bold truncate block">{previousModule.name}</span>
                </div>
              </button>
            ) : <div className="w-1" />}

            {nextModule ? (
              <button
                id={`btn-module-next-${nextModule.id}`}
                onClick={() => onSelectModule(nextModule.id)}
                className="flex items-center gap-1.5 px-4 py-2 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-xl text-right cursor-pointer min-w-0"
              >
                <div className="min-w-0">
                  <span className="text-[10px] text-gray-400 font-bold font-mono tracking-wider block uppercase">Next Module</span>
                  <span className="text-xs text-gray-800 dark:text-gray-200 font-bold truncate block">{nextModule.name}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-indigo-600" />
              </button>
            ) : <div className="w-1" />}
          </div>

        </div>

        {/* RIGHT COLUMN: AI Study Coach & Written Notepad notes (4 columns) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* AI Interactive Chat Coach */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-150 dark:border-slate-850 p-5 shadow-xs flex flex-col h-[450px]">
            <div className="flex items-center gap-2 border-b border-gray-100 dark:border-slate-850 pb-3">
              <div className="p-1.5 rounded-lg bg-indigo-500/15 text-indigo-650">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold font-display text-indigo-950 dark:text-white flex items-center gap-1">
                  AI study Coach
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                </h3>
                <p className="text-[10px] text-gray-400 font-sans">Adaptive tutor powered by Gemini</p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3 scrollbar-thin text-xs">
              {aiMessages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`p-3 rounded-xl max-w-[85%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white ml-auto text-right'
                      : 'bg-gray-55 bg-indigo-50/50 text-gray-800 dark:bg-slate-950/60 dark:text-gray-200'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
              ))}
              {isAiLoading && (
                <div className="bg-indigo-50/40 text-gray-500 p-3 rounded-xl max-w-[85%] flex items-center gap-2">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[10px] font-mono">Coach thinking...</span>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Inquire Entry Form */}
            <form onSubmit={handleSendAiInquiry} className="flex gap-2">
              <input
                id="input-ai-query"
                type="text"
                placeholder="Ask coordinates, cross-val, logic..."
                value={aiChatQuery}
                onChange={(e) => setAiChatQuery(e.target.value)}
                className="w-full bg-gray-50 dark:bg-slate-950 px-3 py-2 text-xs rounded-lg text-gray-950 dark:text-white border border-gray-150 dark:border-slate-800 focus:outline-indigo-650"
              />
              <button
                id="btn-send-ai-query"
                type="submit"
                className="bg-indigo-650 hover:bg-indigo-600 text-white rounded-lg p-2 flex items-center justify-center cursor-pointer"
                disabled={isAiLoading}
              >
                <Send className="w-4 h-4 fill-current" />
              </button>
            </form>
          </div>

          {/* Module interactive quiz challenge */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-150 dark:border-slate-850 p-5 shadow-xs space-y-4">
            <h3 className="text-sm font-bold font-display text-gray-950 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-4.5 h-4.5 text-indigo-600" />
              Interactive Quiz Challenge
            </h3>

            {!quizStarted ? (
              <div className="space-y-3">
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-normal">
                  Challenge yourself to unlock achievement badges and automatically stamp your completeness tags!
                </p>
                <button
                  id="btn-trigger-quiz"
                  onClick={handleStartQuiz}
                  className="w-full bg-indigo-650 hover:bg-indigo-600 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-all cursor-pointer shadow-xs"
                >
                  Start Dynamic AI Quiz
                </button>
              </div>
            ) : isQuizLoading ? (
              <div className="py-8 flex flex-col items-center justify-center text-center space-y-2">
                <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-[11px] text-gray-400 font-mono">Generating academic MCQs...</span>
              </div>
            ) : (
              <div className="space-y-5 text-xs">
                {quizQuestions.map((q, qIdx) => (
                  <div key={q.id} className="space-y-2">
                    <p className="font-bold text-gray-900 dark:text-white font-sans leading-relaxed">
                      Q{qIdx + 1}. {q.question}
                    </p>
                    <div className="space-y-1.5 pl-2">
                      {q.options.map((opt, oIdx) => {
                        const isSelected = userAnswers[qIdx] === oIdx;
                        return (
                          <button
                            id={`btn-quiz-option-${qIdx}-${oIdx}`}
                            key={oIdx}
                            onClick={() => !showQuizResults && handleAnswerSelect(qIdx, oIdx)}
                            className={`w-full text-left p-2 rounded-lg border transition-all text-xs cursor-pointer ${
                              showQuizResults
                                ? oIdx === q.correctAnswer
                                  ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-450 text-emerald-700 dark:text-emerald-300 font-semibold'
                                  : isSelected
                                    ? 'bg-red-50 dark:bg-red-950/20 border-red-350 text-red-700 dark:text-red-350'
                                    : 'bg-white dark:bg-slate-900 border-gray-100 opacity-60'
                                : isSelected
                                  ? 'bg-indigo-50 dark:bg-indigo-950/20 border-indigo-500 text-indigo-700 dark:text-indigo-300 font-semibold'
                                  : 'bg-white dark:bg-slate-900 border-gray-150 text-gray-700 dark:text-gray-300 hover:bg-gray-50'
                            }`}
                            disabled={showQuizResults}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {showQuizResults && (
                      <div className="mt-2 text-[10px] text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-slate-950 p-2.5 rounded-lg border border-gray-100/50 block font-mono">
                        <span className="font-bold">Explanation:</span> {q.explanation}
                      </div>
                    )}
                  </div>
                ))}

                {showQuizResults ? (
                  <div className="bg-indigo-50/50 dark:bg-slate-950 text-center p-4 rounded-xl space-y-2.5">
                    <div className="font-bold font-display text-indigo-950 dark:text-white">
                      Your Score: {quizScore} / {quizQuestions.length}
                    </div>
                    {quizScore === quizQuestions.length ? (
                      <p className="text-[11px] text-emerald-600 font-medium">
                        🎉 Perfect score! This module has been marked complete on your dashboard.
                      </p>
                    ) : (
                      <p className="text-[11px] text-indigo-600 font-medium">
                        Keep reading and try again to unlock your completeness badges.
                      </p>
                    )}
                    <button
                      id="btn-quiz-retry"
                      onClick={handleStartQuiz}
                      className="text-xs bg-indigo-650 text-white font-bold px-4 py-2 rounded-lg cursor-pointer inline-block"
                    >
                      Try Another Quiz
                    </button>
                  </div>
                ) : (
                  <button
                    id="btn-quiz-submit"
                    onClick={handleSubmitQuiz}
                    disabled={Object.keys(userAnswers).length < quizQuestions.length}
                    className={`w-full text-xs font-bold py-2 px-4 rounded-lg cursor-pointer ${
                      Object.keys(userAnswers).length < quizQuestions.length
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-emerald-600 hover:bg-emerald-550 text-white'
                    }`}
                  >
                    Submit Answers
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Local Written Notes Section */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-150 dark:border-slate-850 p-5 shadow-xs space-y-3.5">
            <h3 className="text-sm font-bold font-display text-gray-950 dark:text-white flex items-center gap-2">
              <Edit3 className="w-4.5 h-4.5 text-indigo-600" />
              Your Notepad notes
            </h3>
            
            <textarea
              id="txt-note-content"
              rows={5}
              placeholder="Jot down formulas (e.g. OLS loss vectors, SMOTE neighbor metrics, derivative rules) and click save to persist inside your learning dashboard."
              value={localNote}
              onChange={(e) => setLocalNote(e.target.value)}
              className="w-full bg-gray-50 dark:bg-slate-950 px-3.5 py-2.5 rounded-xl text-xs text-gray-950 dark:text-white border border-gray-150 dark:border-slate-800 focus:outline-indigo-600 leading-relaxed font-mono"
            />

            <button
              id="btn-save-note"
              onClick={handleSaveNote}
              className={`w-full flex items-center justify-center gap-2 text-xs font-bold py-2 px-4 rounded-xl cursor-pointer ${
                noteSavedFeedback
                  ? 'bg-emerald-650 text-white'
                  : 'bg-indigo-650 hover:bg-indigo-600 text-white'
              }`}
            >
              <Save className="w-4 h-4" />
              {noteSavedFeedback ? 'Saved Successfully!' : 'Save Note to Dashboard'}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

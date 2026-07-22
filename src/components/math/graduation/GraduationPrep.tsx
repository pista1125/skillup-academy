import React, { useState, useEffect, useMemo, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import confetti from 'canvas-confetti';
import {
  GraduationCap,
  BookOpen,
  Video,
  Award,
  HelpCircle,
  Menu,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  RotateCcw,
  Check,
  X,
  Clock,
  Calendar,
  Play,
  Volume2,
  CheckCircle2,
  XCircle,
  Info,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Download
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { exportElementToPDF } from '@/utils/pdfExport';
import { gondolkodasiModszerekLessons } from './gondolkodasi-modszerek/gondolkodasiModszerekLessons';
import {
  VennTwoSets,
  VennClassProblem,
  Graph5NodesDiagram
} from './gondolkodasi-modszerek/GondolkodasiModszerekDiagrams';
import { szamelmeletAlgebraLessons } from './szamelmelet-algebra/szamelmeletAlgebraLessons';
import {
  PrimesVennDiagram,
  MeansInequalityDiagram,
  QuadraticParabolaDiagram
} from './szamelmelet-algebra/SzamelmeletAlgebraDiagrams';
import { geometriaLessons } from './geometria-trigonometria/geometriaLessons';
import {
  TrianglePythagorasDiagram,
  TriangleSpecialLinesDiagram,
  CircleTangentThalesDiagram,
  CircleEquationDiagram,
  CoordinateLineVectorDiagram,
  QuadrilateralsDiagram,
  TrigUnitCircleDiagram
} from './geometria-trigonometria/GeometriaDiagrams';

import {
  graduationTopics,
  graduationExamPapers,
  GraduationSubtopicContent,
  GraduationTopic,
  GraduationQuizQuestion
} from '@/data/graduationContent';

const MD_PLUGINS = {
  remarkPlugins: [remarkGfm, remarkMath],
  rehypePlugins: [rehypeKatex]
};

import { MathAiChatbot } from '../ai/MathAiChatbot';
import { Bot, Sparkles } from 'lucide-react';

interface GraduationPrepProps {
  onBack: () => void;
}

type TabType = 'lesson' | 'ai-assistant' | 'videos' | 'quiz' | 'papers';

export default function GraduationPrep({ onBack }: GraduationPrepProps) {
  // Sidebar states
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedTopicId, setSelectedTopicId] = useState<string>('g-methods-sets');
  const [selectedSubtopicId, setSelectedSubtopicId] = useState<string>('g-sets');

  // Exam prep level: intermediate (középszint) or advanced (emelt szint)
  const [level, setLevel] = useState<'intermediate' | 'advanced'>('intermediate');

  // Active view tab inside the subtopic
  const [activeTab, setActiveTab] = useState<TabType>('lesson');

  // Quiz states
  const [quizQuestions, setQuizQuestions] = useState<GraduationQuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [scorePercentage, setScorePercentage] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);

  // User Stats (simulated local storage progress)
  const [userXp, setUserXp] = useState<number>(() => {
    return Number(localStorage.getItem('diakzona_graduation_xp') || '0');
  });
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem('diakzona_graduation_completed_quizzes') || '[]');
  });

  // Find active topic & subtopic objects
  const activeTopic = useMemo(() => {
    return graduationTopics.find((t) => t.id === selectedTopicId) || graduationTopics[0];
  }, [selectedTopicId]);

  const activeSubtopic = useMemo(() => {
    return activeTopic.subtopics.find((s) => s.id === selectedSubtopicId) || activeTopic.subtopics[0];
  }, [activeTopic, selectedSubtopicId]);

  const currentLessonText = useMemo(() => {
    const customGondolkodasi = gondolkodasiModszerekLessons[activeSubtopic.id];
    if (customGondolkodasi) {
      return level === 'intermediate' ? customGondolkodasi.intermediate : customGondolkodasi.advanced;
    }
    const customAlgebra = szamelmeletAlgebraLessons[activeSubtopic.id];
    if (customAlgebra) {
      return level === 'intermediate' ? customAlgebra.intermediate : customAlgebra.advanced;
    }
    const customGeometria = geometriaLessons[activeSubtopic.id];
    if (customGeometria) {
      return level === 'intermediate' ? customGeometria.intermediate : customGeometria.advanced;
    }
    return level === 'intermediate' ? activeSubtopic.lessonIntermediate : activeSubtopic.lessonAdvanced;
  }, [activeSubtopic, level]);

  // Load questions when subtopic or level changes
  useEffect(() => {
    const questions = level === 'intermediate'
      ? activeSubtopic.quizIntermediate
      : activeSubtopic.quizAdvanced;
    setQuizQuestions(questions);
    resetQuizState();
  }, [activeSubtopic, level]);

  // Reset quiz state when active subtopic or level changes
  const resetQuizState = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setCorrectAnswersCount(0);
    setIsQuizFinished(false);
  };

  // Handle quiz answer check
  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerChecked(true);

    const isCorrect = selectedOption === quizQuestions[currentQuestionIndex].correctAnswer;
    if (isCorrect) {
      setCorrectAnswersCount((prev) => prev + 1);
      toast.success('Helyes válasz! Szép munka! 🎉');
    } else {
      toast.error('Sajnos helytelen válasz. Nézd meg a magyarázatot! 💡');
    }
  };

  // Handle next question
  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswerChecked(false);

    if (currentQuestionIndex + 1 < quizQuestions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Quiz complete!
      const correct = correctAnswersCount + (selectedOption === quizQuestions[currentQuestionIndex].correctAnswer ? 1 : 0);
      const pct = Math.round((correct / quizQuestions.length) * 100);
      const earned = correct * 15; // 15 XP per correct answer

      setScorePercentage(pct);
      setXpEarned(earned);
      setIsQuizFinished(true);

      // Save stats
      const newXp = userXp + earned;
      setUserXp(newXp);
      localStorage.setItem('diakzona_graduation_xp', newXp.toString());

      const quizKey = `${selectedSubtopicId}_${level}`;
      if (!completedQuizzes.includes(quizKey)) {
        const nextCompleted = [...completedQuizzes, quizKey];
        setCompletedQuizzes(nextCompleted);
        localStorage.setItem('diakzona_graduation_completed_quizzes', JSON.stringify(nextCompleted));
      }

      // Celebrate!
      if (pct === 100) {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
    }
  };

  // Video simulated play state
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const handlePlayVideo = () => {
    setIsPlayingVideo(true);
    toast.info('Videó betöltése... DiákZóna Stúdió elindítva! 🎬');
  };

  // Shared sidebar nav content (used in both desktop sidebar and mobile drawer)
  const SidebarContent = ({ showFull }: { showFull: boolean }) => (
    <>
      {/* Sidebar Topics and Subtopics */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-4">
        {graduationTopics.map((topic) => {
          const isTopicActive = selectedTopicId === topic.id;
          return (
            <div key={topic.id} className="space-y-1">
              {/* Topic Title Button */}
              <button
                onClick={() => {
                  setSelectedTopicId(topic.id);
                  if (topic.subtopics.length > 0) {
                    setSelectedSubtopicId(topic.subtopics[0].id);
                  }
                  if (isSidebarCollapsed) {
                    setIsSidebarCollapsed(false);
                  }
                  setIsMobileMenuOpen(false);
                }}
                className={cn(
                  "w-full text-left p-2.5 rounded-xl transition-all font-semibold text-xs flex items-center gap-2.5",
                  isTopicActive
                    ? "bg-purple-600 text-white font-bold shadow-md"
                    : "hover:bg-slate-800 text-slate-300"
                )}
              >
                <span className="text-base">{topic.icon}</span>
                {showFull && <span className="line-clamp-2">{topic.title}</span>}
              </button>

              {/* Subtopics List */}
              {isTopicActive && showFull && (
                <div className="pl-2 pr-1 py-1 border-l-2 border-purple-500/30 space-y-1 ml-3 mt-1">
                  {topic.subtopics.map((subtopic) => {
                    const isSubtopicActive = selectedSubtopicId === subtopic.id;
                    const quizKey = `${subtopic.id}_${level}`;
                    const isQuizDone = completedQuizzes.includes(quizKey);

                    return (
                      <button
                        key={subtopic.id}
                        onClick={() => {
                          setSelectedSubtopicId(subtopic.id);
                          setIsPlayingVideo(false);
                          setIsMobileMenuOpen(false);
                        }}
                        className={cn(
                          "w-full text-left py-2 pr-3 rounded-lg text-[11px] font-medium transition-all flex items-center justify-between",
                          isSubtopicActive
                            ? "bg-purple-950/60 text-purple-300 font-bold border-l-2 border-purple-400"
                            : "hover:bg-slate-800/50 text-slate-400 hover:text-slate-200",
                          subtopic.level === 1
                            ? (isSubtopicActive ? "pl-5" : "pl-6")
                            : subtopic.level === 2
                              ? (isSubtopicActive ? "pl-8" : "pl-9")
                              : (isSubtopicActive ? "pl-2" : "pl-3")
                        )}
                      >
                        <span className="truncate mr-2">{subtopic.title}</span>
                        {isQuizDone && (
                          <span className="text-emerald-500 text-xs flex-shrink-0" title="Kvíz sikeresen teljesítve">
                            ✓
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Sidebar Footer - Stats */}
      {showFull && (
        <div className="p-4 border-t border-slate-800 bg-slate-950">
          <div className="flex items-center gap-3 justify-between text-xs text-slate-400">
            <span className="font-semibold text-slate-300 flex items-center gap-1">
              <Award className="w-4 h-4 text-amber-500" />
              Összes Pontszám:
            </span>
            <span className="font-black text-amber-400 text-sm">{userXp} XP</span>
          </div>
          <div className="mt-2 text-[10px] text-slate-500 flex items-center justify-between">
            <span>Befejezett kvízek:</span>
            <span className="font-bold text-slate-300">{completedQuizzes.length} db</span>
          </div>
        </div>
      )}
    </>
  );

  return (
    <div className="flex flex-col lg:flex-row h-full w-full bg-slate-50 text-slate-900 overflow-hidden relative">

      {/* ── DESKTOP SIDEBAR (lg+) ─────────────────────────────────── */}
      <aside
        className={cn(
          "hidden lg:flex bg-slate-900 text-slate-100 flex-col border-r border-slate-800 transition-all duration-300 relative z-30",
          isSidebarCollapsed ? "lg:w-16" : "lg:w-80"
        )}
      >
        {/* Sidebar Header */}
        <div className="p-4 flex items-center justify-between border-b border-slate-800 bg-slate-950">
          {!isSidebarCollapsed && (
            <div className="flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-purple-400" />
              <span className="font-display font-black text-sm uppercase tracking-wider text-purple-200">
                Témakörök
              </span>
            </div>
          )}
          {isSidebarCollapsed && (
            <GraduationCap className="w-6 h-6 text-purple-400 mx-auto" />
          )}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-100"
          >
            {isSidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>
        <SidebarContent showFull={!isSidebarCollapsed} />
      </aside>

      {/* ── MOBILE BOTTOM DRAWER (< lg) ──────────────────────────── */}
      {/* Backdrop overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Bottom drawer panel */}
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-slate-900 text-slate-100 rounded-t-2xl shadow-2xl border-t border-slate-700 transition-transform duration-300 ease-in-out",
          isMobileMenuOpen ? "translate-y-0" : "translate-y-[calc(100%-3rem)]"
        )}
        style={{ maxHeight: '75vh' }}
      >
        {/* Drawer handle / toggle strip */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-full h-12 flex items-center justify-between px-5 bg-slate-950 rounded-t-2xl border-b border-slate-800 flex-shrink-0"
        >
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-purple-400" />
            <span className="font-black text-xs uppercase tracking-wider text-purple-200">
              Témakörök
            </span>
            <span className="bg-purple-700/50 text-purple-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
              {activeSubtopic.title.substring(0, 18)}{activeSubtopic.title.length > 18 ? '…' : ''}
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <span className="text-[10px] font-semibold">{isMobileMenuOpen ? 'Bezárás' : 'Témakörök'}</span>
            {isMobileMenuOpen
              ? <ChevronDown className="w-5 h-5" />
              : <ChevronUp className="w-5 h-5" />
            }
          </div>
        </button>

        {/* Scrollable content inside drawer */}
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(75vh - 3rem)' }}>
          <SidebarContent showFull={true} />
        </div>
      </div>

      {/* 2. Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-white pb-12 lg:pb-0 overflow-y-auto">
        {/* Main Header / Hero Section */}
        <header className="py-3 px-6 shrink-0 bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-800 text-white shadow-md relative overflow-hidden">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full transform translate-x-20 -translate-y-20 pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white/5 rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all border border-white/10"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="bg-purple-500/35 border border-purple-400/40 text-purple-200 text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full">
                    Érettségi Felkészítő
                  </span>
                </div>
                <h1 className="text-xl md:text-2xl font-black font-display tracking-tight text-white leading-tight">
                  {activeSubtopic.title}
                </h1>
              </div>
            </div>

            {/* Level selector: Intermediate / Advanced */}
            <div className="flex items-center bg-black/35 p-1 rounded-2xl border border-white/10 self-start md:self-auto shadow-inner">
              <button
                onClick={() => {
                  setLevel('intermediate');
                  setIsPlayingVideo(false);
                }}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-black transition-all",
                  level === 'intermediate'
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                    : "text-slate-300 hover:text-white"
                )}
              >
                Középszint
              </button>
              <button
                onClick={() => {
                  setLevel('advanced');
                  setIsPlayingVideo(false);
                }}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-black transition-all",
                  level === 'advanced'
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg"
                    : "text-slate-300 hover:text-white"
                )}
              >
                Emelt szint
              </button>
            </div>
          </div>
        </header>

        {/* Horizontal Navigation Menu */}
        <div className="border-b border-slate-200 bg-slate-50 px-6 py-2 shrink-0 flex overflow-x-auto gap-1 md:gap-2 no-scrollbar">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab('lesson')}
            className={cn(
              "rounded-xl text-xs font-bold gap-2 px-4 flex-shrink-0 transition-all",
              activeTab === 'lesson'
                ? "bg-purple-50 text-purple-700 hover:bg-purple-100 border-b-2 border-purple-600 rounded-b-none"
                : "text-slate-600 hover:bg-slate-100"
            )}
          >
            <BookOpen className="w-4 h-4" />
            Kidolgozott Tananyag
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab('ai-assistant')}
            className={cn(
              "rounded-xl text-xs font-bold gap-2 px-4 flex-shrink-0 transition-all",
              activeTab === 'ai-assistant'
                ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-b-2 border-emerald-600 rounded-b-none"
                : "text-slate-600 hover:bg-slate-100"
            )}
          >
            <Bot className="w-4 h-4 text-emerald-600" />
            AI Korrepetitor
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab('videos')}
            className={cn(
              "rounded-xl text-xs font-bold gap-2 px-4 flex-shrink-0 transition-all",
              activeTab === 'videos'
                ? "bg-purple-50 text-purple-700 hover:bg-purple-100 border-b-2 border-purple-600 rounded-b-none"
                : "text-slate-600 hover:bg-slate-100"
            )}
          >
            <Video className="w-4 h-4" />
            Videótár
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab('quiz')}
            className={cn(
              "rounded-xl text-xs font-bold gap-2 px-4 flex-shrink-0 transition-all",
              activeTab === 'quiz'
                ? "bg-purple-50 text-purple-700 hover:bg-purple-100 border-b-2 border-purple-600 rounded-b-none"
                : "text-slate-600 hover:bg-slate-100"
            )}
          >
            <HelpCircle className="w-4 h-4" />
            Gyakorló Kvíz
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab('papers')}
            className={cn(
              "rounded-xl text-xs font-bold gap-2 px-4 flex-shrink-0 transition-all",
              activeTab === 'papers'
                ? "bg-purple-50 text-purple-700 hover:bg-purple-100 border-b-2 border-purple-600 rounded-b-none"
                : "text-slate-600 hover:bg-slate-100"
            )}
          >
            <Calendar className="w-4 h-4" />
            Érettségi Feladatsorok
          </Button>
        </div>

        {/* Tab Contents */}
        <div className={cn("p-6 max-w-5xl mx-auto w-full", activeTab === 'ai-assistant' && "p-3 sm:p-4")}>
          {/* Written Lesson Tab */}
          {activeTab === 'lesson' && (
            <div id="graduation-lesson-printable" className="animate-slide-up text-left bg-white border border-slate-100 shadow-sm rounded-2xl p-6 md:p-10 prose max-w-none relative">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b pb-4 no-pdf">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                  <h2 className="text-lg font-black text-slate-800 m-0">
                    {activeSubtopic.title} – Kidolgozott Tananyag
                  </h2>
                </div>
                <Button
                  onClick={() => exportElementToPDF('graduation-lesson-printable', activeSubtopic.title)}
                  variant="outline"
                  size="sm"
                  className="gap-2 border-purple-200 text-purple-700 hover:bg-purple-50 font-bold rounded-xl shadow-xs"
                >
                  <Download className="w-4 h-4 text-purple-600" />
                  Mentés PDF-ben
                </Button>
              </div>

              <ReactMarkdown
                {...MD_PLUGINS}
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-2xl md:text-3xl font-black text-center text-purple-950 my-6 pb-4 border-b border-purple-100">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-xl font-black text-slate-800 mt-8 mb-4 border-b border-slate-100 pb-2">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-base md:text-lg font-bold text-purple-900 mt-6 mb-3">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-justify text-slate-700 leading-relaxed md:leading-loose my-4">
                      {children}
                    </p>
                  ),
                  li: ({ children }) => (
                    <li className="text-justify text-slate-700 leading-relaxed md:leading-loose my-2">
                      {children}
                    </li>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-purple-500 bg-purple-50/60 p-4 rounded-r-xl my-4 text-justify leading-relaxed">
                      {children}
                    </blockquote>
                  )
                }}
              >
                {currentLessonText}
              </ReactMarkdown>

              {/* Interactive Visual Diagrams */}
              {activeSubtopic.id === 'g-sets' && (
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <h3 className="text-base font-extrabold text-purple-950 mb-2 flex items-center gap-2">
                    <span className="p-1 bg-purple-100 text-purple-700 rounded-lg">📊</span>
                    Vizuális Ábrák a Tananyaghoz
                  </h3>
                  <VennTwoSets highlight="none" title="Két Halmaz Szemléltetése (Venn-diagram)" />
                  <VennClassProblem />
                </div>
              )}

              {activeSubtopic.id === 'g-set-operations' && (
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <h3 className="text-base font-extrabold text-purple-950 mb-2 flex items-center gap-2">
                    <span className="p-1 bg-purple-100 text-purple-700 rounded-lg">📊</span>
                    Vizuális Ábra: Metszet (A ∩ B)
                  </h3>
                  <VennTwoSets highlight="intersection" title="A és B halmazok metszete" />
                </div>
              )}

              {activeSubtopic.id === 'g-graphs' && (
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <h3 className="text-base font-extrabold text-emerald-950 mb-2 flex items-center gap-2">
                    <span className="p-1 bg-emerald-100 text-emerald-700 rounded-lg">🕸️</span>
                    Gráf Ábrázolása
                  </h3>
                  <Graph5NodesDiagram />
                </div>
              )}

              {activeSubtopic.id === 'g-natural-numbers' && (
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <PrimesVennDiagram />
                </div>
              )}

              {activeSubtopic.id === 'g-quadratic-equations' && (
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <QuadraticParabolaDiagram />
                </div>
              )}

              {activeSubtopic.id === 'g-means-inequalities' && (
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <MeansInequalityDiagram />
                </div>
              )}

              {(activeSubtopic.id === 'g-elem-geom' || activeSubtopic.id === 'g-triangles') && (
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <TrianglePythagorasDiagram />
                  <TriangleSpecialLinesDiagram />
                </div>
              )}

              {activeSubtopic.id === 'g-quadrilaterals' && (
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <QuadrilateralsDiagram />
                </div>
              )}

              {activeSubtopic.id === 'g-circle-equation' && (
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <CircleEquationDiagram />
                </div>
              )}

              {activeSubtopic.id === 'g-circle' && (
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <CircleTangentThalesDiagram />
                </div>
              )}

              {(activeSubtopic.id === 'g-coordinate-geometry' || activeSubtopic.id === 'g-line-equation') && (
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <CoordinateLineVectorDiagram />
                </div>
              )}

              {activeSubtopic.id === 'g-trigonometry' && (
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <TrigUnitCircleDiagram />
                </div>
              )}
            </div>
          )}

          {/* 2. AI Assistant Tab */}
          {activeTab === 'ai-assistant' && (
            <div className="animate-slide-up">
              <MathAiChatbot
                examType="graduation"
                topicTitle={activeTopic.title}
                subtopicTitle={activeSubtopic.title}
                levelOrGrade={level === 'intermediate' ? 'Középszint' : 'Emelt szint'}
              />
            </div>
          )}

          {/* 3. Videos Tab */}
          {activeTab === 'videos' && (
            <div className="animate-slide-up space-y-6 text-left">
              <div className="flex items-center justify-between border-b pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <Video className="w-6 h-6 text-red-500" />
                  <h2 className="text-lg font-black text-slate-800">
                    Oktatóvideók és Magyarázatok
                  </h2>
                </div>
                <span className="text-xs font-bold bg-red-100 text-red-700 px-3 py-1 rounded-full">
                  1 Videó elérhető
                </span>
              </div>

              {/* Video Player Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  {isPlayingVideo ? (
                    <div className="aspect-video bg-black rounded-2xl overflow-hidden flex flex-col justify-center items-center shadow-lg relative border-4 border-slate-900 group">
                      {/* Embed a generic educational loop / simulated stream */}
                      <iframe
                        src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
                        title="Oktató Videó"
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                      <button
                        onClick={() => setIsPlayingVideo(false)}
                        className="absolute top-4 right-4 p-2 bg-black/60 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={handlePlayVideo}
                      className="aspect-video bg-slate-900 rounded-2xl overflow-hidden relative shadow-lg group cursor-pointer flex flex-col justify-center items-center text-white transition-all hover:scale-[1.01]"
                    >
                      {/* Thumbnail Placeholder */}
                      <div className="absolute inset-0 bg-cover bg-center opacity-60 filter blur-xs" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800')" }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />

                      <div className="relative z-10 flex flex-col items-center text-center p-6 space-y-4">
                        <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-lg text-white group-hover:scale-115 group-hover:bg-red-500 transition-all duration-300">
                          <Play className="w-8 h-8 fill-current ml-1" />
                        </div>
                        <div>
                          <h3 className="text-base font-black">{activeSubtopic.title} – {level === 'intermediate' ? 'Középszint' : 'Emelt szint'} Összefoglaló</h3>
                          <p className="text-xs text-slate-300 mt-1">Elméleti magyarázat + tipikus érettségi feladatok levezetése lépésről lépésre.</p>
                        </div>
                      </div>
                      <div className="absolute bottom-4 right-4 bg-black/70 px-2 py-1 rounded text-[10px] font-bold">
                        12:45
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <h3 className="text-base font-black text-slate-800">
                      {activeSubtopic.title} – Részletes Útmutató
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Ebben a videós tananyagban átvesszük a témakör legfontosabb képleteit, az elméleti hátteret, és bemutatjuk a legutóbbi évek érettségi feladatainak megoldását. Ha elakadsz, bármikor megállíthatod a videót, és magad is megpróbálhatod megoldani a feladatokat.
                    </p>
                  </div>
                </div>

                {/* Playlist / Playlist details */}
                <div className="space-y-4">
                  <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">Tananyag lejátszási lista</h3>
                  <div className="space-y-2">
                    <div className="p-3 bg-purple-50 border border-purple-100 rounded-xl flex items-start gap-3 cursor-pointer">
                      <div className="p-2 bg-purple-600 text-white rounded-lg flex-shrink-0 mt-0.5">
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-slate-800 line-clamp-1">1. rész: Elméleti összefoglaló</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">Hossz: 12 perc • Készítette: Szabó István</p>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 border border-slate-100 hover:bg-slate-100 rounded-xl flex items-start gap-3 opacity-60 cursor-not-allowed">
                      <div className="p-2 bg-slate-400 text-white rounded-lg flex-shrink-0 mt-0.5">
                        <Video className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-slate-800 line-clamp-1">2. rész: Kidolgozott típusfeladatok</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">Hamarosan feltöltésre kerül • 15 perc</p>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 border border-slate-100 hover:bg-slate-100 rounded-xl flex items-start gap-3 opacity-60 cursor-not-allowed">
                      <div className="p-2 bg-slate-400 text-white rounded-lg flex-shrink-0 mt-0.5">
                        <Video className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-slate-800 line-clamp-1">3. rész: Trükkök és gyakori hibák</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">Hamarosan feltöltésre kerül • 10 perc</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. Quiz Tab */}
          {activeTab === 'quiz' && (
            <div className="animate-slide-up text-left max-w-xl mx-auto">
              {quizQuestions.length === 0 ? (
                <div className="text-center py-12 p-8 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                  <Info className="w-8 h-8 text-slate-400 mx-auto mb-3" />
                  <p className="text-slate-500 text-sm">Ehhez a témakörhöz és szinthez jelenleg még nincsenek feltöltve tesztkérdések.</p>
                </div>
              ) : isQuizFinished ? (
                /* Quiz Complete Card */
                <Card className="rounded-3xl border-slate-100 shadow-lg text-center overflow-hidden">
                  <div className="h-32 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 flex items-center justify-center text-white relative">
                    <Award className="w-16 h-16 text-yellow-300 drop-shadow-md animate-bounce" />
                    <div className="absolute bottom-2 text-xs font-bold text-purple-100">Kvíz befejezve!</div>
                  </div>
                  <CardContent className="p-6 space-y-6">
                    <div>
                      <h3 className="text-lg font-black text-slate-800">Szép munka!</h3>
                      <p className="text-xs text-slate-400 mt-1">Sikeresen megválaszoltad az összes kérdést.</p>
                    </div>

                    <div className="flex items-center justify-center gap-6 py-2">
                      <div className="text-center">
                        <div className="text-2xl font-black text-slate-800">{correctAnswersCount} / {quizQuestions.length}</div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Helyes válasz</div>
                      </div>
                      <div className="w-px h-10 bg-slate-200" />
                      <div className="text-center">
                        <div className="text-2xl font-black text-amber-500">+{xpEarned} XP</div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">XP jutalom</div>
                      </div>
                      <div className="w-px h-10 bg-slate-200" />
                      <div className="text-center">
                        <div className="text-2xl font-black text-purple-600">{scorePercentage}%</div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Eredmény</div>
                      </div>
                    </div>

                    {/* Progress feedback */}
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-xs text-slate-600">
                      {scorePercentage === 100 ? (
                        <p className="font-bold text-emerald-600">Hibátlan teljesítmény! Gratulálunk a 100%-hoz! 🌟</p>
                      ) : scorePercentage >= 60 ? (
                        <p className="font-semibold text-indigo-600">Sikeres teszt! Már jó úton jársz a felkészülésben. 👍</p>
                      ) : (
                        <p className="text-amber-600 font-semibold">Gyakorolj még egy kicsit a kidolgozott tananyag segítségével, majd próbáld újra! 💪</p>
                      )}
                    </div>

                    <div className="flex gap-3">
                      <Button
                        onClick={resetQuizState}
                        variant="outline"
                        className="flex-1 rounded-xl h-11 text-xs font-bold gap-2"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Újraindítás
                      </Button>
                      <Button
                        onClick={() => {
                          setActiveTab('lesson');
                        }}
                        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white rounded-xl h-11 text-xs font-bold"
                      >
                        Vissza a Tananyaghoz
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                /* Question Card */
                <Card className="rounded-3xl border-slate-100 shadow-md">
                  <CardHeader className="p-6 pb-2">
                    <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-2">
                      <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-bold">
                        {currentIndex + 1}. Kérdés / {quizQuestions.length}
                      </span>
                      <span>Középszintű gyakorló</span>
                    </div>
                    <Progress value={((currentIndex) / quizQuestions.length) * 100} className="h-1.5 bg-slate-100" />
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    {/* Question Markdown */}
                    <div className="text-sm font-bold text-slate-800 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-150">
                      <ReactMarkdown {...MD_PLUGINS}>
                        {quizQuestions[currentIndex].question}
                      </ReactMarkdown>
                    </div>

                    {/* Options List */}
                    <div className="space-y-2.5">
                      {quizQuestions[currentIndex].options.map((option, idx) => {
                        const isSelected = selectedOption === idx;
                        const isCorrectAnswer = idx === quizQuestions[currentIndex].correctAnswer;
                        const showCorrect = isAnswerChecked && isCorrectAnswer;
                        const showIncorrect = isAnswerChecked && isSelected && !isCorrectAnswer;

                        return (
                          <button
                            key={idx}
                            disabled={isAnswerChecked}
                            onClick={() => setSelectedOption(idx)}
                            className={cn(
                              "w-full text-left p-3.5 rounded-2xl border-2 transition-all flex items-start gap-3 text-xs font-semibold select-none",
                              isSelected && !isAnswerChecked && "border-purple-600 bg-purple-50/40 text-purple-900",
                              !isSelected && !isAnswerChecked && "border-slate-200 hover:border-slate-350 bg-white hover:bg-slate-50/30 text-slate-700",
                              showCorrect && "border-emerald-500 bg-emerald-50/40 text-emerald-900",
                              showIncorrect && "border-red-500 bg-red-50/40 text-red-900"
                            )}
                          >
                            <span className={cn(
                              "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5 border",
                              isSelected && !isAnswerChecked && "bg-purple-600 text-white border-transparent",
                              !isSelected && !isAnswerChecked && "bg-slate-100 text-slate-500 border-slate-200",
                              showCorrect && "bg-emerald-500 text-white border-transparent",
                              showIncorrect && "bg-red-500 text-white border-transparent"
                            )}>
                              {idx === 0 ? 'A' : idx === 1 ? 'B' : idx === 2 ? 'C' : 'D'}
                            </span>
                            <span className="flex-1">
                              <ReactMarkdown {...MD_PLUGINS}>
                                {option}
                              </ReactMarkdown>
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Action buttons and explanation */}
                    <div className="space-y-4">
                      {isAnswerChecked && (
                        <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl text-xs text-slate-600 animate-slide-up flex gap-3">
                          <Info className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-slate-800 block mb-1">Részletes Magyarázat:</span>
                            <ReactMarkdown {...MD_PLUGINS}>
                              {quizQuestions[currentIndex].explanation}
                            </ReactMarkdown>
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2">
                        {!isAnswerChecked ? (
                          <Button
                            disabled={selectedOption === null}
                            onClick={handleCheckAnswer}
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold h-11 rounded-xl text-xs"
                          >
                            Ellenőrzés
                          </Button>
                        ) : (
                          <Button
                            onClick={handleNextQuestion}
                            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold h-11 rounded-xl text-xs gap-2"
                          >
                            {currentIndex + 1 < quizQuestions.length ? 'Következő Kérdés' : 'Kvíz Befejezése'}
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* 5. Exam Papers Tab */}
          {activeTab === 'papers' && (
            <div className="animate-slide-up space-y-6 text-left">
              <div className="flex items-center justify-between border-b pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-purple-600" />
                  <h2 className="text-lg font-black text-slate-800">
                    Összegző feladatsorok és korábbi érettségik
                  </h2>
                </div>
                <span className="text-xs text-slate-400">Archívum</span>
              </div>

              <div className="bg-slate-50 border border-slate-150 rounded-2xl p-4 text-xs text-slate-600 leading-relaxed mb-6">
                <p>
                  <strong>💡 Információ:</strong> Ebben a részben összegyűjtöttük az elmúlt évek hivatalos érettségi feladatsorait. Vizsgáld meg a felépítésüket, a témakörök eloszlását és az ajánlott időkeretet, hogy rutint szerezz a valós vizsgaszituációra!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {graduationExamPapers.map((paper, idx) => (
                  <Card key={idx} className="rounded-3xl border-slate-150 hover:border-purple-300 hover:shadow-md transition-all">
                    <CardHeader className="p-5 bg-slate-50 border-b rounded-t-3xl">
                      <div className="flex justify-between items-center mb-1">
                        <span className="bg-purple-100 text-purple-800 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">
                          {paper.level.toUpperCase()}
                        </span>
                        <span className="text-slate-400 text-xs font-semibold flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {paper.duration} perc
                        </span>
                      </div>
                      <CardTitle className="text-base font-black text-slate-800">
                        {paper.year}. {paper.session === 'május' ? 'Május-Június' : 'Október-November'}
                      </CardTitle>
                      <CardDescription className="text-xs text-slate-400">
                        Összpontszám: {paper.totalPoints} pont
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-5 space-y-4">
                      <div className="space-y-2">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Feladatsor felépítése:</span>
                        <ul className="space-y-1.5 pl-4 list-disc text-xs text-slate-600">
                          {paper.structure.map((item, itemIdx) => (
                            <li key={itemIdx}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex gap-2 pt-2 border-t">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 rounded-xl text-xs h-9 gap-1"
                          onClick={() => toast.success('Letöltés elindítva... 📥')}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Feladatsor (PDF)
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 rounded-xl text-xs h-9 gap-1"
                          onClick={() => toast.success('Megoldókulcs megnyitása... 🗝️')}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Megoldókulcs
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

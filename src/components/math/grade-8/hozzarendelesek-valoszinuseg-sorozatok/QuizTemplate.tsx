import React, { useState, useEffect, useRef, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/ProgressBar';
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Trophy,
  Sparkles,
  CheckCircle2,
  XCircle,
  BookOpen,
  Zap,
  ChevronRight,
  Layers,
  LayoutGrid,
  FileQuestion,
  Flame,
  Maximize2,
  Minimize2,
  ArrowRightLeft,
  Compass,
  Shapes,
  Target
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { saveQuizProgress } from '@/services/quizProgressService';
import { useQuizProgress } from '@/hooks/useQuizProgress';
import { MathText } from '@/components/math/shared/MathText';

export type DifficultyLevel = 1 | 2 | 3;
export type GameMode = 'quiz' | string;

export interface CheatSheetCard {
  id: string;
  title: string;
  description?: string;
  formula?: string;
  note?: string;
  color?: string;
  badge?: string;
  figure?: React.ReactNode;
  icon?: React.ReactNode;
  content?: React.ReactNode;
}

export interface Question {
  id: string | number;
  level?: DifficultyLevel;
  prompt?: string;
  question?: string;
  title?: string;
  text?: string;
  figure?: React.ReactNode;
  highlightValue?: string;
  questionTypeBadge?: string;
  options: (string | React.ReactNode)[];
  correctAnswer: string | number;
  explanation: string;
  breakdown?: { label?: string; value?: string | React.ReactNode }[] | string[];
  steps?: { label?: string; value?: string | React.ReactNode }[] | string[];
  hint?: string;
  formula?: string;
  [key: string]: any;
}

export type QuizQuestion = Question;

export interface LevelConfig {
  level: DifficultyLevel;
  title: string;
  subtitle: string;
  range: string;
  focus: string;
  color?: string;
  badgeBg?: string;
  badgeBorder?: string;
  badgeText?: string;
  accentGradient?: string;
  iconBg?: string;
  questions: QuizQuestion[];
}

export type QuizLevelConfig = LevelConfig;

export interface CheatSheetItem {
  topic: string;
  formula: string;
  note: string;
}

export interface CustomGameModeLevelConfig {
  title?: string;
  subtitle?: string;
  rangeLabel?: string;
  range?: string;
  focus?: string;
  badgeText?: string;
}

export interface CustomGameMode {
  id: string;
  title?: string;
  label?: string;
  subtitle?: string;
  description?: string;
  icon?: React.ReactNode;
  badgeText?: string;
  levels?: Partial<Record<DifficultyLevel, CustomGameModeLevelConfig>>;
  component?: React.ComponentType<any>;
  onClick?: () => void;
  render?: (props: {
    level: DifficultyLevel;
    onNextLevel?: () => void;
    onOpenRules?: () => void;
    onBack?: () => void;
    onSwitchToQuiz?: () => void;
    onSwitchToMatcher?: () => void;
    onSwitchToSorter?: () => void;
    onSwitchToTheory?: () => void;
  }) => React.ReactNode;
}

export interface LevelHubItemConfig {
  title?: string;
  subtitle?: string;
  focus?: string;
  range?: string;
}

export interface LevelHubProps {
  level1?: LevelHubItemConfig;
  level2?: LevelHubItemConfig;
  level3?: LevelHubItemConfig;
  [key: string]: LevelHubItemConfig | undefined;
}

export interface QuizTemplateProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  grade?: number;
  chapterId?: string;
  topicId?: string;
  topicTitle?: string;
  documentId?: string;
  pdfFilename?: string;
  emoji?: string;
  badge?: string;
  topicBadge?: string;
  badgeText?: string;
  badgeColor?: string;
  title: string;
  subtitle?: string;
  description?: string;
  cheatSheetTitle?: string;
  cheatSheet?: CheatSheetItem[];
  cheatSheetCards?: CheatSheetCard[];
  cheatSheets?: { title: string; items: string[] }[];
  cheatSheetContent?: React.ReactNode;
  levelHubProps?: LevelHubProps;
  questions?: QuizQuestion[] | Record<DifficultyLevel, Question[]>;
  levels?: LevelConfig[] | Record<DifficultyLevel, LevelConfig>;
  levelsConfig?: LevelConfig[] | Record<DifficultyLevel, LevelConfig>;
  levelConfigs?: LevelConfig[] | Record<DifficultyLevel, LevelConfig>;
  easyQuestions?: QuizQuestion[];
  mediumQuestions?: QuizQuestion[];
  hardQuestions?: QuizQuestion[];
  customGameModes?: CustomGameMode[];
  customModes?: CustomGameMode[];
  matcherComponent?: React.ReactNode;
  sorterComponent?: React.ReactNode;
  renderMatcher?: (props: any) => React.ReactNode;
  renderSorter?: (props: any) => React.ReactNode;
  hintText?: string;
  themeColor?: 'cyan' | 'blue' | 'indigo' | 'purple' | 'emerald' | 'amber' | 'rose' | 'teal';
  category?: string;
  [key: string]: any;
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function QuizTemplate({
  onBack = () => {},
  onSwitchToTheory,
  grade = 8,
  chapterId = 'hozzarendelesek-valoszinuseg-sorozatok',
  topicId,
  topicTitle,
  documentId,
  pdfFilename,
  emoji = '📈',
  badge,
  topicBadge,
  badgeText,
  badgeColor,
  title,
  subtitle,
  description,
  cheatSheetTitle = 'Hozzárendelések és Sorozatok Képtár és Képlettár',
  cheatSheet,
  cheatSheetCards,
  cheatSheets,
  cheatSheetContent,
  levelHubProps,
  questions: rawQuestions,
  levels: propLevels,
  levelsConfig,
  levelConfigs,
  easyQuestions,
  mediumQuestions,
  hardQuestions,
  customGameModes: propCustomGameModes,
  customModes,
  matcherComponent,
  sorterComponent,
  renderMatcher,
  renderSorter,
  hintText,
  themeColor = 'cyan'
}: QuizTemplateProps) {
  const customGameModes = propCustomGameModes || customModes;
  const levels = propLevels || levelsConfig || levelConfigs;
  const { user, profile } = useAuth();
  const { getTopicProgress } = useQuizProgress();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const computedTopicId = useMemo(() => {
    if (topicId) return topicId;
    if (documentId) return documentId;
    const t = (title || '').toLowerCase();
    if (t.includes('fogalmak')) return 'g7-geom-concepts-quiz';
    if (t.includes('nevezetes')) return 'g7-triangle-lines-quiz';
    if (t.includes('háromszög') || t.includes('haromszog')) return 'g7-triangles-quads-quiz';
    if (t.includes('transzformáció') || t.includes('transzformacio')) return 'g7-geom-transformations-quiz';
    if (t.includes('középpontos') || t.includes('kozeppontos')) return 'g7-point-reflection-quiz';
    return t.replace(/[^a-z0-9]+/g, '-');
  }, [topicId, documentId, title]);

  const currentTopicProgress = getTopicProgress(computedTopicId);

  // 1. Normalize Levels & Questions
  const normalizedLevels: Record<DifficultyLevel, LevelConfig> | null = useMemo(() => {
    const normalizeQ = (q: any): QuizQuestion => {
      const rawOpts = q.options || q.answers || [];
      const corr = q.correctAnswer !== undefined ? q.correctAnswer : q.correctIndex;
      let answerStr = '';
      if (typeof corr === 'number') {
        answerStr = rawOpts[corr] !== undefined ? String(rawOpts[corr]) : String(corr);
      } else {
        answerStr = String(corr ?? '');
      }

      let normalizedBreakdown: { label?: string; value?: string | React.ReactNode }[] | undefined = undefined;
      if (q.breakdown) {
        if (Array.isArray(q.breakdown) && typeof q.breakdown[0] === 'string') {
          normalizedBreakdown = (q.breakdown as string[]).map((str: string, idx: number) => ({
            label: `${idx + 1}. lépés`,
            value: str
          }));
        } else {
          normalizedBreakdown = q.breakdown as { label?: string; value?: string | React.ReactNode }[];
        }
      }

      return {
        ...q,
        id: String(q.id),
        prompt: q.prompt || q.question || q.title || q.text || '',
        question: q.question || q.prompt || q.title || q.text || '',
        options: rawOpts,
        correctAnswer: answerStr,
        breakdown: normalizedBreakdown
      };
    };

    if (levels) {
      if (Array.isArray(levels)) {
        const map: Partial<Record<DifficultyLevel, LevelConfig>> = {};
        levels.forEach((cfg, idx) => {
          const lvl = (cfg.level || (idx + 1)) as DifficultyLevel;
          map[lvl] = {
            ...cfg,
            level: lvl,
            title: cfg.title || (cfg as any).name || (lvl === 1 ? '1. Szint: Alapok' : lvl === 2 ? '2. Szint: Közepes' : '3. Szint: Haladó'),
            subtitle: cfg.subtitle || (cfg as any).description || (lvl === 1 ? 'Alapfogalmak és egyszerűbb feladatok' : lvl === 2 ? 'Összefüggések és gyakorlati feladványok' : 'Összetett feladatok és kihívások'),
            range: cfg.range || (lvl === 1 ? '1 - 10. feladat' : lvl === 2 ? '11 - 20. feladat' : '21 - 30. feladat'),
            focus: cfg.focus || (lvl === 1 ? 'Alapfogalmak' : lvl === 2 ? 'Gyakorlat & Alkalmazás' : 'Mesterfok & Logika'),
            questions: (cfg.questions || []).map(normalizeQ)
          };
        });
        return map as Record<DifficultyLevel, LevelConfig>;
      }
      const recordMap: Partial<Record<DifficultyLevel, LevelConfig>> = {};
      Object.keys(levels).forEach((k) => {
        const lvl = Number(k) as DifficultyLevel;
        const cfg = levels[lvl];
        if (cfg) {
          recordMap[lvl] = {
            ...cfg,
            level: lvl,
            title: cfg.title || (cfg as any).name || (lvl === 1 ? '1. Szint: Alapok' : lvl === 2 ? '2. Szint: Közepes' : '3. Szint: Haladó'),
            subtitle: cfg.subtitle || (cfg as any).description || (lvl === 1 ? 'Alapfogalmak és egyszerűbb feladatok' : lvl === 2 ? 'Összefüggések és gyakorlati feladványok' : 'Összetett feladatok és kihívások'),
            range: cfg.range || (lvl === 1 ? '1–10. kérdés' : lvl === 2 ? '11–20. kérdés' : '21–30. kérdés'),
            focus: cfg.focus || (lvl === 1 ? 'Alapfogalmak' : lvl === 2 ? 'Gyakorlat & Alkalmazás' : 'Mesterfok & Logika'),
            questions: (cfg.questions || []).map(normalizeQ)
          };
        }
      });
      return recordMap as Record<DifficultyLevel, LevelConfig>;
    }

    if (rawQuestions) {
      if (!Array.isArray(rawQuestions) && typeof rawQuestions === 'object') {
        const recordQ = rawQuestions as unknown as Record<DifficultyLevel, Question[]>;
        return {
          1: {
            level: 1,
            title: levelHubProps?.level1?.title || '1. Szint: Alapok',
            subtitle: levelHubProps?.level1?.subtitle || 'Alapfogalmak és egyszerűbb feladatok',
            range: levelHubProps?.level1?.range || '1 - 10. feladat',
            focus: levelHubProps?.level1?.focus || 'Alapfogalmak',
            questions: (recordQ[1] || []).map(normalizeQ)
          },
          2: {
            level: 2,
            title: levelHubProps?.level2?.title || '2. Szint: Közepes',
            subtitle: levelHubProps?.level2?.subtitle || 'Összefüggések és gyakorlati feladványok',
            range: levelHubProps?.level2?.range || '11 - 20. feladat',
            focus: levelHubProps?.level2?.focus || 'Gyakorlat & Alkalmazás',
            questions: (recordQ[2] || []).map(normalizeQ)
          },
          3: {
            level: 3,
            title: levelHubProps?.level3?.title || '3. Szint: Haladó',
            subtitle: levelHubProps?.level3?.subtitle || 'Összetett feladatok és logikai kihívások',
            range: levelHubProps?.level3?.range || '21 - 30. feladat',
            focus: levelHubProps?.level3?.focus || 'Mesterfok & Logika',
            questions: (recordQ[3] || []).map(normalizeQ)
          }
        };
      }

      if (Array.isArray(rawQuestions) && rawQuestions.length > 0) {
        const l1 = rawQuestions.filter(q => q.level === 1).map(normalizeQ);
        const l2 = rawQuestions.filter(q => q.level === 2).map(normalizeQ);
        const l3 = rawQuestions.filter(q => q.level === 3).map(normalizeQ);

        const q1List = l1.length > 0 ? l1 : rawQuestions.slice(0, 10).map(normalizeQ);
        const q2List = l2.length > 0 ? l2 : rawQuestions.slice(10, 20).map(normalizeQ);
        const q3List = l3.length > 0 ? l3 : rawQuestions.slice(20, 30).map(normalizeQ);

        const r1 = q1List.length === 10 ? '1 - 10. feladat' : `1 - ${q1List.length}. feladat`;
        const r2 = (q1List.length === 10 && q2List.length === 10) ? '11 - 20. feladat' : `${q1List.length + 1} - ${q1List.length + q2List.length}. feladat`;
        const r3 = (q1List.length === 10 && q2List.length === 10 && q3List.length === 10) ? '21 - 30. feladat' : `${q1List.length + q2List.length + 1} - ${q1List.length + q2List.length + q3List.length}. feladat`;

        return {
          1: {
            level: 1,
            title: levelHubProps?.level1?.title || '1. Szint: Alapok',
            subtitle: levelHubProps?.level1?.subtitle || 'Alapfogalmak és egyszerűbb feladatok',
            range: levelHubProps?.level1?.range || r1,
            focus: levelHubProps?.level1?.focus || 'Alapfogalmak',
            questions: q1List
          },
          2: {
            level: 2,
            title: levelHubProps?.level2?.title || '2. Szint: Közepes',
            subtitle: levelHubProps?.level2?.subtitle || 'Összefüggések és gyakorlati feladványok',
            range: levelHubProps?.level2?.range || r2,
            focus: levelHubProps?.level2?.focus || 'Gyakorlat & Alkalmazás',
            questions: q2List
          },
          3: {
            level: 3,
            title: levelHubProps?.level3?.title || '3. Szint: Haladó',
            subtitle: levelHubProps?.level3?.subtitle || 'Összetett feladatok és logikai kihívások',
            range: levelHubProps?.level3?.range || r3,
            focus: levelHubProps?.level3?.focus || 'Mesterfok & Logika',
            questions: q3List
          }
        };
      }
    }

    return null;
  }, [levels, rawQuestions, levelHubProps]);

  const effectiveLevels: Record<DifficultyLevel, LevelConfig> = normalizedLevels || {
    1: {
      level: 1,
      title: levelHubProps?.level1?.title || '1. Szint: Alapok',
      subtitle: levelHubProps?.level1?.subtitle || 'Alapfogalmak és egyszerűbb számítások',
      range: levelHubProps?.level1?.range || '1 - 10. feladat',
      focus: levelHubProps?.level1?.focus || 'Alapfogalmak',
      questions: (easyQuestions || []).map((q) => ({
        ...q,
        id: String(q.id),
        correctAnswer: typeof q.correctAnswer === 'number' ? String(q.options[q.correctAnswer]) : String(q.correctAnswer)
      }))
    },
    2: {
      level: 2,
      title: levelHubProps?.level2?.title || '2. Szint: Közepes',
      subtitle: levelHubProps?.level2?.subtitle || 'Összefüggések és gyakorlati feladatok',
      range: levelHubProps?.level2?.range || '11 - 20. feladat',
      focus: levelHubProps?.level2?.focus || 'Gyakorlat & Alkalmazás',
      questions: (mediumQuestions || []).map((q) => ({
        ...q,
        id: String(q.id),
        correctAnswer: typeof q.correctAnswer === 'number' ? String(q.options[q.correctAnswer]) : String(q.correctAnswer)
      }))
    },
    3: {
      level: 3,
      title: levelHubProps?.level3?.title || '3. Szint: Haladó',
      subtitle: levelHubProps?.level3?.subtitle || 'Összetett feladatok és logikai kihívások',
      range: levelHubProps?.level3?.range || '21 - 30. feladat',
      focus: levelHubProps?.level3?.focus || 'Mesterfok & Logika',
      questions: (hardQuestions || []).map((q) => ({
        ...q,
        id: String(q.id),
        correctAnswer: typeof q.correctAnswer === 'number' ? String(q.options[q.correctAnswer]) : String(q.correctAnswer)
      }))
    }
  };

  // Normalize Cheat Sheet Cards
  const normalizedCheatCards: CheatSheetCard[] = useMemo(() => {
    const cards = [...(cheatSheetCards || [])];
    if (cheatSheets && cheatSheets.length > 0) {
      cheatSheets.forEach((cs: any, idx) => {
        if (cs.content) {
          cards.push({
            id: cs.id || `cs-${idx}`,
            title: cs.title,
            description: cs.description,
            formula: cs.formula,
            color: cs.color,
            badge: cs.badge,
            content: cs.content
          });
        } else if (cs.items && Array.isArray(cs.items)) {
          cards.push({
            id: cs.id || `cs-${idx}`,
            title: cs.title,
            description: cs.description,
            formula: cs.formula,
            color: cs.color,
            badge: cs.badge,
            content: (
              <ul className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
                {cs.items.map((it: string, itIdx: number) => (
                  <li key={itIdx} className="flex items-start gap-1.5">
                    <span className="text-teal-500 font-bold">•</span>
                    <span><MathText>{it}</MathText></span>
                  </li>
                ))}
              </ul>
            )
          });
        } else {
          cards.push({
            id: cs.id || `cs-${idx}`,
            title: cs.title,
            description: cs.description,
            formula: cs.formula,
            color: cs.color,
            badge: cs.badge,
            content: cs.content || null
          });
        }
      });
    }
    return cards;
  }, [cheatSheetCards, cheatSheets]);

  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel | null>(null);
  const [gameMode, setGameMode] = useState<GameMode>('quiz');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showCheatSheet, setShowCheatSheet] = useState(false);

  // Auto-save quiz progress when completed
  useEffect(() => {
    if (isCompleted && user) {
      const activeLvlConfig = (selectedLevel ? effectiveLevels?.[selectedLevel] : null) || effectiveLevels?.[1];
      const totalQ = questions.length || activeLvlConfig?.questions?.length || 10;
      const percentage = Math.round((score / totalQ) * 100);

      saveQuizProgress({
        userId: user.uid,
        studentName: profile?.full_name || user.displayName || 'Diák',
        studentEmail: profile?.email || user.email || '',
        userCode: profile?.user_code || '',
        grade: grade || 7,
        chapterId: chapterId || 'g7-geom-trans',
        topicId: computedTopicId,
        topicTitle: topicTitle || title,
        gameType: 'quiz',
        level: selectedLevel || 1,
        percentage,
        scorePoints: score,
        totalQuestions: totalQ,
        bestStreak
      });
    }
  }, [isCompleted, user, profile, score, bestStreak, selectedLevel, questions, effectiveLevels, grade, chapterId, computedTopicId, topicTitle, title]);

  // Combine Game Modes
  const allGameModes: CustomGameMode[] = useMemo(() => {
    const rawModes = (customGameModes || []).map((m: any) => {
      let renderFn = m.render;
      if (!renderFn && m.component) {
        const Comp = m.component;
        renderFn = (props: any) => (
          <Comp
            key={`${m.id}-${props?.level ?? selectedLevel ?? 1}`}
            level={props?.level ?? selectedLevel ?? 1}
            onNextLevel={props?.onNextLevel}
            onOpenRules={props?.onOpenRules}
            onBack={onBack}
            onSwitchToQuiz={() => setGameMode('quiz')}
            onSwitchToMatcher={() => setGameMode('matcher')}
            onSwitchToSorter={() => setGameMode('sorter')}
            onSwitchToTheory={onSwitchToTheory}
          />
        );
      }
      return {
        ...m,
        title: m.title || m.label || (m.id === 'matcher' ? 'Párosító játék' : m.id === 'sorter' ? 'Csoportosító játék' : 'Játékmód'),
        render: renderFn
      };
    });

    const modes = [...rawModes];
    if ((matcherComponent || renderMatcher) && !modes.some(m => m.id === 'matcher')) {
      modes.push({
        id: 'matcher',
        title: 'Párosító játék',
        subtitle: 'Keresd meg az összetartozó párokat!',
        icon: <ArrowRightLeft className="w-4 h-4 text-indigo-500" />,
        badgeText: 'Párosítás',
        render: (props) => {
          const rawLvl = props?.level ?? selectedLevel ?? 1;
          const lvl: DifficultyLevel = (typeof rawLvl === 'number' ? rawLvl : 1) as DifficultyLevel;
          if (renderMatcher) {
            const params = {
              level: lvl,
              onNextLevel: props?.onNextLevel,
              onOpenRules: props?.onOpenRules,
              onBack: onBack,
              onSwitchToQuiz: () => setGameMode('quiz'),
              onSwitchToSorter: () => setGameMode('sorter'),
              onSwitchToTheory: onSwitchToTheory
            };
            return (renderMatcher as any)(params);
          }
          if (React.isValidElement(matcherComponent)) {
            return React.cloneElement(matcherComponent, {
              key: `matcher-lvl-${lvl}`,
              level: lvl,
              currentLevel: lvl,
              onNextLevel: props?.onNextLevel,
              onOpenRules: props?.onOpenRules,
              onBack: onBack,
              onSwitchToQuiz: () => setGameMode('quiz'),
              onSwitchToSorter: () => setGameMode('sorter'),
              onSwitchToTheory: onSwitchToTheory
            } as any);
          }
          return matcherComponent;
        }
      });
    }
    if ((sorterComponent || renderSorter) && !modes.some(m => m.id === 'sorter')) {
      modes.push({
        id: 'sorter',
        title: 'Csoportosító játék',
        subtitle: 'Válogasd szét a kategóriákba!',
        icon: <Layers className="w-4 h-4 text-emerald-500" />,
        badgeText: 'Kategorizálás',
        render: (props) => {
          const rawLvl = props?.level ?? selectedLevel ?? 1;
          const lvl: DifficultyLevel = (typeof rawLvl === 'number' ? rawLvl : 1) as DifficultyLevel;
          if (renderSorter) {
            const params = {
              level: lvl,
              currentLevel: lvl,
              onNextLevel: props?.onNextLevel,
              onOpenRules: props?.onOpenRules,
              onBack: onBack,
              onSwitchToQuiz: () => setGameMode('quiz'),
              onSwitchToMatcher: () => setGameMode('matcher'),
              onSwitchToTheory: onSwitchToTheory
            };
            return (renderSorter as any)(params);
          }
          if (React.isValidElement(sorterComponent)) {
            return React.cloneElement(sorterComponent, {
              key: `sorter-lvl-${lvl}`,
              level: lvl,
              currentLevel: lvl,
              onNextLevel: props?.onNextLevel,
              onOpenRules: props?.onOpenRules,
              onBack: onBack,
              onSwitchToQuiz: () => setGameMode('quiz'),
              onSwitchToMatcher: () => setGameMode('matcher'),
              onSwitchToTheory: onSwitchToTheory
            } as any);
          }
          return sorterComponent;
        }
      });
    }
    return modes;
  }, [customGameModes, matcherComponent, sorterComponent, renderMatcher, renderSorter, selectedLevel, onBack, onSwitchToTheory]);

  // Fullscreen toggler
  const toggleFullscreen = async () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      try {
        if (containerRef.current.requestFullscreen) {
          await containerRef.current.requestFullscreen();
        }
      } catch (err) {
        console.error('Fullscreen request failed:', err);
      }
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Confetti on completion
  useEffect(() => {
    if (isCompleted) {
      const duration = 2.5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
          return clearInterval(interval);
        }
        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: 0.2, y: 0.6 } });
        confetti({ ...defaults, particleCount, origin: { x: 0.8, y: 0.6 } });
      }, 350);

      return () => clearInterval(interval);
    }
  }, [isCompleted]);

  const handleStartLevel = (level: DifficultyLevel, mode: GameMode = gameMode) => {
    setSelectedLevel(level);
    setGameMode(mode);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setIsCompleted(false);

    const levelQuestions = effectiveLevels[level]?.questions || [];
    const prepared = levelQuestions.map((q) => {
      const rawOpts = q.options || (q as any).answers || [];
      const correctVal = typeof q.correctAnswer === 'number'
        ? rawOpts[q.correctAnswer]
        : (q.correctAnswer ?? (q as any).correct_answer);
      return {
        ...q,
        correctAnswer: correctVal,
        options: shuffleArray(rawOpts)
      };
    });
    setQuestions(prepared);
  };

  const handleOptionClick = (option: string | React.ReactNode) => {
    if (isAnswerChecked) return;
    setSelectedOption(String(option));
    setIsAnswerChecked(true);

    const currentQ = questions[currentIndex] || (selectedLevel ? effectiveLevels[selectedLevel]?.questions[currentIndex] : null);
    if (!currentQ) return;

    const isCorrect = String(option).trim() === String(currentQ.correctAnswer).trim();

    if (isCorrect) {
      const nextScore = score + 1;
      const nextStreak = streak + 1;
      setScore(nextScore);
      setStreak(nextStreak);
      if (nextStreak > bestStreak) {
        setBestStreak(nextStreak);
      }
    } else {
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    const total = questions.length || (selectedLevel ? effectiveLevels[selectedLevel]?.questions.length : 0);

    if (currentIndex < total - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    } else {
      setIsCompleted(true);
    }
  };

  // Keyboard shortcut listener (1, 2, 3, 4, Enter, Space)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameMode !== 'quiz' || isCompleted || !selectedLevel) return;

      if (!isAnswerChecked) {
        const keyMap: { [key: string]: number } = {
          '1': 0,
          '2': 1,
          '3': 2,
          '4': 3
        };
        if (e.key in keyMap) {
          const optionIdx = keyMap[e.key];
          const currentQ = questions[currentIndex] || (selectedLevel ? effectiveLevels[selectedLevel]?.questions[currentIndex] : null);
          if (currentQ && currentQ.options[optionIdx]) {
            handleOptionClick(currentQ.options[optionIdx]);
          }
        }
      } else {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleNextQuestion();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameMode, isAnswerChecked, isCompleted, selectedLevel, currentIndex, questions]);

  const hasCheatSheet = Boolean(
    (cheatSheet && cheatSheet.length > 0) ||
    (normalizedCheatCards && normalizedCheatCards.length > 0) ||
    cheatSheetContent
  );

  // =========================================================================
  // 1. Initial Level Selection Screen (Established Hero & 3 Difficulty Cards)
  // =========================================================================
  if (selectedLevel === null) {
    return (
      <div
        ref={containerRef}
        className={cn(
          "w-full max-w-5xl mx-auto px-2 sm:px-4 py-1 sm:py-2 animate-in fade-in duration-300 text-left",
          isFullscreen && "fixed inset-0 z-50 max-w-none w-screen h-screen bg-slate-100 dark:bg-slate-950 p-3 sm:p-4 overflow-y-auto"
        )}
      >
        {/* Top bar with back button, theory button, fullscreen and cheat sheet */}
        <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1.5">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              className="rounded-xl h-8 px-2.5 text-xs font-bold border-2 border-indigo-200/90 dark:border-indigo-800/80 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:bg-slate-850 text-indigo-900 dark:text-indigo-200 hover:bg-indigo-100 hover:border-indigo-400 shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1 text-indigo-600 dark:text-indigo-400" />
              Vissza a témakörökhöz
            </Button>

            {onSwitchToTheory && (
              <Button
                variant="outline"
                size="sm"
                onClick={onSwitchToTheory}
                className="rounded-xl h-8 px-2.5 text-xs font-bold text-violet-900 bg-gradient-to-r from-violet-50/80 to-purple-50/80 border-2 border-violet-200 dark:bg-slate-850 dark:text-violet-300 dark:border-violet-800 hover:bg-violet-100 shadow-2xs"
              >
                <BookOpen className="w-3.5 h-3.5 mr-1 text-violet-600" />
                Tananyag
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFullscreen}
              className={cn(
                "rounded-xl h-8 px-2.5 text-xs font-bold border-2 transition-all shadow-2xs",
                isFullscreen
                  ? "border-teal-500 bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-xs"
                  : "border-teal-200/90 dark:border-teal-800/80 bg-gradient-to-r from-teal-50/80 to-cyan-50/80 dark:bg-slate-850 text-teal-900 dark:text-teal-200 hover:bg-teal-100"
              )}
              title={isFullscreen ? "Kilépés a teljes képernyőből" : "Teljes képernyő"}
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5 mr-1 text-white" />
                  Ablak
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5 mr-1 text-teal-600 dark:text-teal-400" />
                  Teljes képernyő
                </>
              )}
            </Button>

            {hasCheatSheet && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCheatSheet(!showCheatSheet)}
                className="rounded-xl h-7 px-2.5 text-xs font-bold border-teal-300 bg-teal-50/50 text-teal-800 dark:bg-teal-950/40 dark:text-teal-300 dark:border-teal-800 hover:bg-teal-100"
              >
                <Compass className="w-3 h-3 mr-1 text-teal-600" />
                {cheatSheetTitle || "Képtár & Segédlet"}
              </Button>
            )}
          </div>
        </div>

        {/* Hero Header */}
        <div className="text-center max-w-2xl mx-auto mb-2 sm:mb-2.5">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider mb-1 border border-teal-200 dark:border-teal-800 bg-teal-100/80 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300">
            <span>{topicBadge || badgeText || '📐 8. Osztály • IV. A Pitagorasz-tétel és alkalmazásai'}</span>
            <span className="opacity-40">•</span>
            <span className="font-extrabold flex items-center gap-1 text-teal-700 dark:text-teal-300">
              <Sparkles className="w-3 h-3 text-teal-500" /> Gyakorló Kvíz
            </span>
          </div>
          <h1 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center justify-center gap-1.5 mb-1">
            <span className="text-xl sm:text-2xl">{emoji}</span>
            <span>{title}</span>
          </h1>

            <div className="inline-flex flex-wrap items-center justify-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl mt-1 border-2 border-slate-200/80 dark:border-slate-700 shadow-xs">
              <button
                onClick={() => setGameMode('quiz')}
                className={cn(
                  "flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border-2",
                  gameMode === 'quiz'
                    ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-500 text-blue-950 dark:from-blue-950 dark:to-indigo-950 dark:text-blue-100 shadow-xs"
                    : "border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-700"
                )}
              >
                <div className={cn(
                  "w-5 h-5 rounded-md flex items-center justify-center text-white shrink-0",
                  gameMode === 'quiz' ? "bg-gradient-to-br from-blue-500 to-indigo-600" : "bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400"
                )}>
                  <FileQuestion className="w-3.5 h-3.5" />
                </div>
                <span>Kvíz</span>
              </button>
              {allGameModes.map((mode) => {
                const isMatcher = mode.id === 'matcher';
                const isSorter = mode.id === 'sorter';
                const isActive = gameMode === mode.id;

                return (
                  <button
                    key={mode.id}
                    onClick={() => {
                      if (mode.onClick) {
                        mode.onClick();
                      } else {
                        setGameMode(mode.id);
                      }
                    }}
                    className={cn(
                      "flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border-2",
                      isActive
                        ? isSorter
                          ? "bg-gradient-to-r from-purple-50 to-fuchsia-50 border-purple-500 text-purple-950 dark:from-purple-950 dark:to-fuchsia-950 dark:text-purple-100 shadow-xs"
                          : "bg-gradient-to-r from-teal-50 to-emerald-50 border-teal-500 text-teal-950 dark:from-teal-950 dark:to-emerald-950 dark:text-teal-100 shadow-xs"
                        : "border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-700"
                    )}
                  >
                    <div className={cn(
                      "w-5 h-5 rounded-md flex items-center justify-center shrink-0",
                      isActive
                        ? isSorter
                          ? "bg-gradient-to-br from-purple-500 to-fuchsia-600 text-white"
                          : "bg-gradient-to-br from-teal-500 to-emerald-600 text-white"
                        : isSorter
                          ? "bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400"
                          : "bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400"
                    )}>
                      {isMatcher ? (
                        <ArrowRightLeft className="w-3.5 h-3.5" />
                      ) : isSorter ? (
                        <LayoutGrid className="w-3.5 h-3.5" />
                      ) : (
                        mode.icon || <LayoutGrid className="w-3.5 h-3.5" />
                      )}
                    </div>
                    <span>{mode.id === 'matcher' ? 'Párosító játék' : mode.id === 'sorter' ? 'Csoportosító játék' : mode.title}</span>
                  </button>
                );
              })}
            </div>
        </div>

        {/* Cheat sheet popover/card */}
        {showCheatSheet && hasCheatSheet && (
          <div className="mb-3 p-3 sm:p-4 bg-gradient-to-br from-teal-50 to-blue-50 dark:from-slate-900 dark:to-slate-850 rounded-xl border-2 border-teal-200 dark:border-teal-900/60 shadow-md animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs sm:text-sm font-black text-teal-900 dark:text-teal-200 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-teal-600" />
                {cheatSheetTitle || "Geometriai Képtár & Képlettár"}
              </h3>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowCheatSheet(false)}
                className="text-teal-800 dark:text-teal-300 hover:bg-teal-200/50 rounded-lg h-6 px-2 text-xs"
              >
                Bezárás
              </Button>
            </div>
            {cheatSheetContent && (
              <div className="mb-2">
                {cheatSheetContent}
              </div>
            )}
            {cheatSheet && cheatSheet.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mb-2">
                {cheatSheet.map((item, idx) => (
                  <div key={idx} className="bg-white/95 dark:bg-slate-800/95 p-2 rounded-lg border border-teal-100 dark:border-slate-700 shadow-xs text-left">
                    <div className="text-[11px] font-black text-teal-600 dark:text-teal-400">{item.topic}</div>
                    <div className="text-[11px] font-mono font-bold text-slate-800 dark:text-slate-100 mt-0.5"><MathText>{item.formula}</MathText></div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5"><MathText>{item.note}</MathText></div>
                  </div>
                ))}
              </div>
            )}
            {normalizedCheatCards && normalizedCheatCards.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {normalizedCheatCards.map((card, idx) => (
                  <div key={card.id || idx} className="bg-white/95 dark:bg-slate-800/95 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-xs text-left space-y-1.5">
                    <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900 dark:text-slate-100">
                      {card.icon || <Compass className="w-3.5 h-3.5 text-teal-600" />}
                      <span>{card.title}</span>
                    </div>
                    {card.figure && (
                      <div className="flex items-center justify-center p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                        {card.figure}
                      </div>
                    )}
                    {card.content ? (
                      <div>{card.content}</div>
                    ) : (
                      <>
                        {card.formula && <div className="text-[11px] font-mono font-bold text-slate-800 dark:text-slate-100 mt-0.5"><MathText>{card.formula}</MathText></div>}
                        {card.note && <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5"><MathText>{card.note}</MathText></div>}
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Difficulty Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-4xl mx-auto">
          {([1, 2, 3] as DifficultyLevel[]).map((level) => {
            const cfg = effectiveLevels[level];
            if (!cfg) return null;

            const activeCustomMode = allGameModes?.find(m => m.id === gameMode);
            const customLvl = activeCustomMode?.levels?.[level];

            const badgeBg = cfg.badgeBg || (level === 1 ? 'bg-emerald-50 dark:bg-emerald-950/40' : level === 2 ? 'bg-teal-50 dark:bg-teal-950/40' : 'bg-purple-50 dark:bg-purple-950/40');
            const badgeBorder = cfg.badgeBorder || (level === 1 ? 'border-emerald-200 dark:border-emerald-800' : level === 2 ? 'border-teal-200 dark:border-teal-800' : 'border-purple-200 dark:border-purple-800');
            const badgeText = cfg.badgeText || (level === 1 ? 'text-emerald-700 dark:text-emerald-300' : level === 2 ? 'text-teal-700 dark:text-teal-300' : 'text-purple-700 dark:text-purple-300');
            const iconBg = cfg.iconBg || (level === 1 ? 'bg-emerald-600 text-white' : level === 2 ? 'bg-teal-600 text-white' : 'bg-purple-600 text-white');

            const cardTitle = customLvl?.title || (gameMode === 'matcher'
              ? (level === 1 ? '1. Szint: Alapfogalmak és Invariánsok' : level === 2 ? '2. Szint: Koordinátageometria és Szabályok' : '3. Szint: Összetett és Felvételi Feladatok')
              : gameMode === 'sorter'
              ? (level === 1 ? '1. Szint: A 4 Alapvető Egybevágóság' : level === 2 ? '2. Szint: Koordinátageometria és Tükrözések' : '3. Szint: Háromszögek Egybevágósági Esetei')
              : (cfg.title || (cfg as any).name || (level === 1 ? '1. Szint: Alapok' : level === 2 ? '2. Szint: Közepes' : '3. Szint: Haladó')));

            const cardSubtitle = customLvl?.subtitle || (gameMode === 'matcher'
              ? (level === 1 ? 'Párosítsd a transzformációk fogalmait és alapvető tulajdonságait!' : level === 2 ? 'Párosítsd a pontok koordinátáit és az algebrai szabályokat!' : 'Párosítsd az összetett összefüggéseket és geometriai tételeket!')
              : gameMode === 'sorter'
              ? (level === 1 ? 'Sorold be a tulajdonságokat és ábrákat a 4 transzformációhoz!' : level === 2 ? 'Kategorizáld a koordináta-változásokat és a tengelyes tükrözéseket!' : 'Sorold be a feltételeket a megfelelő egybevágósági alapesethez!')
              : (cfg.subtitle || (cfg as any).description || (level === 1 ? 'Alapfogalmak és egyszerűbb számítások' : level === 2 ? 'Összefüggések és gyakorlati feladványok' : 'Összetett feladatok és geometriai kihívások')));

            let rangeLabel = 'Tartomány:';
            let rangeValue = cfg.range || (level === 1 ? '1–10. feladat' : level === 2 ? '11–20. feladat' : '21–30. feladat');
            let focusValue = cfg.focus || (level === 1 ? 'Alapfogalmak' : level === 2 ? 'Alkalmazás' : 'Mesterfok');

            if (gameMode === 'matcher') {
              rangeLabel = 'Kártyapárok:';
              const matcherLevelsData = (matcherComponent as any)?.props?.levels
                || (matcherComponent as any)?.type?.matcherLevels
                || (matcherComponent as any)?.type?.levelsConfig
                || (matcherComponent as any)?.type?.levels
                || (matcherComponent as any)?.type?.MATCHER_LEVELS;
              const realPairCount = matcherLevelsData?.[level]?.pairs?.length;
              rangeValue = realPairCount ? `${realPairCount} pár (${realPairCount * 2} kártya)` : '10 pár (20 kártya)';
              focusValue = level === 1 ? 'Alaptulajdonságok' : level === 2 ? 'Koordináta-szabályok' : 'Összetett alakzatok';
            } else if (gameMode === 'sorter') {
              rangeLabel = 'Besorolás:';
              const sorterLevelsData = (sorterComponent as any)?.props?.levels
                || (sorterComponent as any)?.type?.sorterLevels
                || (sorterComponent as any)?.type?.levelsConfig
                || (sorterComponent as any)?.type?.levels
                || (sorterComponent as any)?.type?.SORTER_LEVELS;
              const realCats = sorterLevelsData?.[level]?.categories?.length;
              const realItems = sorterLevelsData?.[level]?.items?.length;
              rangeValue = realCats ? `${realItems ? `${realItems} elem • ` : ''}${realCats} csoport` : (level === 1 ? '12 elem • 4 csoport' : '12 elem • 3 csoport');
              focusValue = level === 1 ? '4 Transzformáció' : level === 2 ? 'Tükrözések koordinátái' : 'Egybevágósági esetek';
            } else if (gameMode !== 'quiz') {
              rangeLabel = 'Feladat:';
              rangeValue = activeCustomMode?.badgeText || 'Interaktív feladat';
            }

            if (customLvl?.rangeLabel) rangeLabel = customLvl.rangeLabel;
            if (customLvl?.range) rangeValue = customLvl.range;
            if (customLvl?.focus) focusValue = customLvl.focus;

            const badgeContent = customLvl?.badgeText || (gameMode === 'quiz' ? `${cfg.questions.length || 10} Kérdés` : (activeCustomMode?.badgeText || `${cfg.questions.length || 10} Feladat`));

            return (
              <div
                key={level}
                onClick={() => handleStartLevel(level, gameMode)}
                className="group relative bg-white dark:bg-slate-900 rounded-xl p-3.5 sm:p-4 border-2 border-slate-200/80 dark:border-slate-800 hover:border-teal-500 dark:hover:border-teal-500 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-teal-500/10 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform shadow-inner font-black text-sm", iconBg)}>
                      {level}
                    </div>

                    <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border", badgeBg, badgeBorder, badgeText)}>
                      {badgeContent}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white mb-0.5 leading-snug group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {cardTitle}
                  </h3>

                  <p className="text-[11px] leading-tight font-medium text-slate-500 dark:text-slate-400 mb-2 line-clamp-2 min-h-[26px]">
                    {cardSubtitle}
                  </p>

                  <div className="space-y-1 pt-1.5 border-t border-slate-100 dark:border-slate-800 mb-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 dark:text-slate-400">{rangeLabel}</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        {rangeValue}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 dark:text-slate-400">Fókusz:</span>
                      <span className="font-bold text-teal-600 dark:text-teal-400 text-right truncate max-w-[140px]" title={focusValue}>
                        <MathText size="sm">{focusValue}</MathText>
                      </span>
                    </div>
                  </div>

                  {/* Level Personal Best Score */}
                  <div className="mb-2.5">
                    {(() => {
                      const lvlScore = currentTopicProgress?.levelScores?.[level];
                      const hasLvlScore = lvlScore !== undefined;
                      const hasStartedTopic = currentTopicProgress?.hasStarted;

                      if (hasLvlScore) {
                        return (
                          <div className={cn(
                            "flex items-center justify-between px-2.5 py-1 rounded-lg border text-[11px] font-mono font-black",
                            lvlScore === 100
                              ? "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300"
                              : lvlScore >= 70
                              ? "bg-teal-50 dark:bg-teal-950/60 border-teal-300 dark:border-teal-800 text-teal-700 dark:text-teal-300"
                              : "bg-rose-50 dark:bg-rose-950/60 border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300"
                          )}>
                            <span className="font-sans text-[10px] font-bold text-slate-500 dark:text-slate-400">Eredményed:</span>
                            <span className="flex items-center gap-1">
                              {lvlScore === 100 && <span>⭐</span>}
                              <span>{lvlScore}%</span>
                            </span>
                          </div>
                        );
                      }

                      if (hasStartedTopic) {
                        return (
                          <div className="flex items-center justify-between px-2.5 py-1 rounded-lg bg-rose-50/60 dark:bg-rose-950/30 border border-dashed border-rose-200 dark:border-rose-900/60 text-[11px] text-rose-600 dark:text-rose-400 font-bold">
                            <span className="text-[10px]">Státusz:</span>
                            <span className="flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                              Még hiányzik
                            </span>
                          </div>
                        );
                      }

                      return (
                        <div className="flex items-center justify-between px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                          <span className="text-[10px]">Státusz:</span>
                          <span>Még nincs kitöltve</span>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                <Button
                  className={cn(
                    "w-full h-8 sm:h-8.5 rounded-lg font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1 cursor-pointer",
                    level === 1
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                      : level === 2
                      ? "bg-teal-600 hover:bg-teal-700 text-white"
                      : "bg-purple-600 hover:bg-purple-700 text-white"
                  )}
                >
                  {gameMode === 'quiz' ? 'Kvíz Indítása' : gameMode === 'matcher' ? 'Párosító Indítása' : gameMode === 'sorter' ? 'Csoportosító Indítása' : `${activeCustomMode?.title || 'Játék'} Indítása`}
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. Completion Screen (Result & Stats)
  // =========================================================================
  const levelConfig = (selectedLevel ? effectiveLevels[selectedLevel] : null) || effectiveLevels[1];
  const totalQuestions = questions.length || levelConfig?.questions?.length || 10;

  if (isCompleted) {
    const percentage = Math.round((score / totalQuestions) * 100);
    const isPerfect = score === totalQuestions;
    const isGood = percentage >= 70;

    return (
      <div
        ref={containerRef}
        className={cn(
          "w-full max-w-xl mx-auto px-2 sm:px-4 py-1 sm:py-2 animate-in zoom-in-95 duration-300 text-center flex items-center justify-center min-h-[calc(100vh-180px)] sm:min-h-0",
          isFullscreen && "fixed inset-0 z-50 max-w-none w-screen h-screen bg-slate-100 dark:bg-slate-950 p-4 sm:p-6 overflow-y-auto flex items-center justify-center"
        )}
      >
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-6 border-2 border-slate-200/80 dark:border-slate-800 shadow-xl max-w-lg w-full mx-auto">
          {/* Trophy Badge */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-2 rounded-2xl bg-gradient-to-br from-teal-400 to-blue-600 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
            <Trophy className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-0.5">
            {isPerfect ? 'Tökéletes Eredmény! 🏆' : isGood ? 'Szép Munka! 🌟' : 'Gyakorolj még egy kicsit! 💪'}
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-2.5">
            Sikeresen befejezted a <span className="font-bold text-slate-800 dark:text-slate-200">{levelConfig.title}</span> feladatait!
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-2 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 mb-2.5">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Pontszám</div>
              <div className="text-lg sm:text-xl font-black text-teal-600 dark:text-teal-400 font-mono">{score} / {totalQuestions}</div>
            </div>
            <div className="border-x border-slate-200 dark:border-slate-700">
              <div className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Eredmény</div>
              <div className="text-lg sm:text-xl font-black text-slate-800 dark:text-slate-100 font-mono">{percentage}%</div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Legjobb széria</div>
              <div className="text-lg sm:text-xl font-black text-amber-500 flex items-center justify-center gap-1 font-mono">
                <Zap className="w-3.5 h-3.5 fill-current" /> {bestStreak}
              </div>
            </div>
          </div>

          {/* Profile Save Confirmation */}
          <div className="flex items-center justify-center gap-1.5 mb-2.5 py-1.5 px-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 text-emerald-700 dark:text-emerald-300 text-[11px] sm:text-xs font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>
              {user ? 'Az eredményed sikeresen elmentve a profilodba! 🎉' : 'Jelentkezz be az eredményeid tárolásához!'}
            </span>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 mb-2">
            {selectedLevel < 3 && (
              <Button
                onClick={() => handleStartLevel((selectedLevel + 1) as DifficultyLevel, 'quiz')}
                className="flex-1 h-9 sm:h-10 rounded-xl text-xs sm:text-sm font-bold bg-teal-600 hover:bg-teal-700 text-white shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Következő szint: {selectedLevel + 1}. szint
                <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
              </Button>
            )}

            <Button
              variant="outline"
              onClick={() => handleStartLevel(selectedLevel, 'quiz')}
              className="flex-1 h-9 sm:h-10 rounded-xl text-xs sm:text-sm font-bold border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1 text-slate-500" />
              Újrapróbálom
            </Button>
          </div>

          {/* Secondary Navigation Row: Szintek, Tananyag, Vissza a témakörökhöz */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedLevel(null)}
              className="h-7 sm:h-8 px-2.5 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1 cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-slate-400" />
              <span>Szintek</span>
            </Button>

            {onSwitchToTheory && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onSwitchToTheory}
                className="h-7 sm:h-8 px-2.5 rounded-lg text-xs font-bold text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-950/40 flex items-center gap-1 cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Vissza a tananyaghoz</span>
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="h-7 sm:h-8 px-2.5 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Vissza a témakörökhöz</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 3. Active View with Right-side Wordwall Sidebar
  // =========================================================================
  const currentQuestion = questions[currentIndex] || levelConfig?.questions[currentIndex];
  const activeCustomMode = allGameModes.find(m => m.id === gameMode);

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full max-w-6xl mx-auto px-2 sm:px-4 py-1 animate-in fade-in duration-200 text-left",
        isFullscreen && "fixed inset-0 z-50 max-w-none w-screen h-screen bg-slate-100 dark:bg-slate-950 p-4 sm:p-6 overflow-y-auto"
      )}
    >
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 mb-2.5">
        <div className="flex items-center gap-2">
          {/* Szint választás button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedLevel(null)}
            className="group h-8.5 rounded-xl px-3 border-2 border-indigo-200/90 dark:border-indigo-800/80 bg-gradient-to-r from-blue-50/90 via-indigo-50/80 to-blue-50/90 dark:from-slate-850 dark:to-indigo-950/40 hover:from-indigo-100 hover:to-blue-100 dark:hover:bg-indigo-950/60 hover:border-indigo-400 text-indigo-900 dark:text-indigo-200 font-black text-xs shadow-2xs transition-all cursor-pointer hover:shadow-xs hover:-translate-y-0.5 active:translate-y-0"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5 text-indigo-600 dark:text-indigo-400 group-hover:-translate-x-0.5 transition-transform" />
            <span>Szint választás</span>
          </Button>

          {/* Fullscreen button */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleFullscreen}
            className={cn(
              "group h-8.5 rounded-xl px-3 border-2 font-black text-xs transition-all shadow-2xs cursor-pointer hover:shadow-xs hover:-translate-y-0.5 active:translate-y-0",
              isFullscreen
                ? "border-teal-500 bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-xs"
                : "border-teal-200/90 dark:border-teal-800/80 bg-gradient-to-r from-teal-50/90 via-cyan-50/80 to-teal-50/90 dark:from-slate-850 dark:to-teal-950/40 hover:from-teal-100 hover:to-cyan-100 dark:hover:bg-teal-950/60 hover:border-teal-400 text-teal-900 dark:text-teal-200"
            )}
            title={isFullscreen ? 'Kilépés a teljes képernyőből' : 'Teljes képernyős mód'}
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-3.5 h-3.5 mr-1.5 text-white group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">Kilépés</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5 mr-1.5 text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">Teljes képernyő</span>
              </>
            )}
          </Button>
        </div>

        {/* Level pills in header */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700/80 shadow-2xs">
          {([1, 2, 3] as DifficultyLevel[]).map((lvl) => {
            const isSelected = selectedLevel === lvl;
            let activeClass = "";
            if (lvl === 1) activeClass = "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-xs font-black";
            else if (lvl === 2) activeClass = "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-xs font-black";
            else activeClass = "bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-xs font-black";

            return (
              <button
                key={lvl}
                onClick={() => handleStartLevel(lvl, gameMode)}
                className={cn(
                  "px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer",
                  isSelected
                    ? activeClass
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/60"
                )}
              >
                {lvl === 1 ? '1. Könnyű' : lvl === 2 ? '2. Közepes' : '3. Nehéz'}
              </button>
            );
          })}
        </div>

        {/* Quick Mode Switcher in Active Game Header */}
        {allGameModes && allGameModes.length > 0 && (
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700/80 shadow-2xs">
            <button
              onClick={() => setGameMode('quiz')}
              className={cn(
                "flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-black transition-all cursor-pointer",
                gameMode === 'quiz'
                  ? "bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-xs"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              )}
            >
              <FileQuestion className="w-3.5 h-3.5 text-teal-500" />
              <span>Kvíz</span>
            </button>
            {allGameModes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => {
                  if (mode.onClick) mode.onClick();
                  else setGameMode(mode.id as GameMode);
                }}
                className={cn(
                  "flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-black transition-all cursor-pointer",
                  gameMode === mode.id
                    ? "bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-xs"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                )}
              >
                {mode.icon || (mode.id === 'matcher' ? <ArrowRightLeft className="w-3.5 h-3.5 text-indigo-500" /> : <Layers className="w-3.5 h-3.5 text-emerald-500" />)}
                <span>{mode.id === 'matcher' ? 'Párosító' : mode.id === 'sorter' ? 'Csoportosító' : mode.title}</span>
              </button>
            ))}
          </div>
        )}

        {/* Mode / Score indicator */}
        <div className="flex items-center gap-2">
          {gameMode === 'quiz' ? (
            <div className="flex items-center gap-2 bg-gradient-to-r from-amber-50 to-yellow-50 dark:bg-amber-950/40 px-3 py-1 rounded-xl border-2 border-amber-300 dark:border-amber-800 shadow-xs text-xs font-black text-amber-900 dark:text-amber-200">
              <div className="flex items-center gap-1 text-amber-700 dark:text-amber-300">
                <Trophy className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                <span>{score} pont</span>
              </div>
              {streak > 1 && (
                <>
                  <div className="w-px h-3 bg-amber-300 dark:bg-amber-700" />
                  <div className="flex items-center gap-1 text-orange-600 dark:text-orange-400 animate-pulse">
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    <span>{streak}x</span>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className={cn(
              "flex items-center gap-1.5 px-3 py-1 rounded-xl border-2 text-xs font-black shadow-xs",
              gameMode === 'matcher'
                ? "bg-gradient-to-r from-teal-50 to-emerald-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-200 border-teal-300 dark:border-teal-800"
                : "bg-gradient-to-r from-purple-50 to-fuchsia-50 dark:bg-purple-950/60 text-purple-800 dark:text-purple-200 border-purple-300 dark:border-purple-800"
            )}>
              {activeCustomMode?.icon || <LayoutGrid className="w-3.5 h-3.5" />}
              <span>{activeCustomMode?.title || 'Játékmód'}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Container with Wordwall Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* LEFT / CENTER: Main Game Area (9 cols on large screen) */}
        <div className="lg:col-span-9 flex flex-col gap-3">
          {gameMode === 'quiz' && currentQuestion ? (
            /* QUIZ MODE WORKSPACE */
            <div className="space-y-3">
              {/* Slim Progress Bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400 px-1">
                  <span>{levelConfig.title} feladványai</span>
                  <span className="font-mono text-teal-700 dark:text-teal-300 font-black">{currentIndex + 1} / {levelConfig.questions.length}</span>
                </div>
                <ProgressBar
                  current={currentIndex + 1}
                  total={levelConfig.questions.length}
                  color={selectedLevel === 1 ? 'emerald' : selectedLevel === 2 ? 'teal' : 'purple'}
                />
              </div>

              {/* 2-Column Responsive Workspace Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 items-start">
                {/* Left: Question Card + Visual Figure + Explanation */}
                <div className="flex flex-col gap-2.5">
                  <Card className="border-2 border-indigo-200 dark:border-indigo-900/70 rounded-2xl shadow-sm overflow-hidden bg-gradient-to-b from-white via-indigo-50/15 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
                    <div className="px-3.5 py-2.5 bg-gradient-to-r from-indigo-50 via-blue-50 to-white dark:from-slate-800 dark:to-slate-850 border-b border-indigo-100 dark:border-indigo-900/60 flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-black uppercase tracking-wider shadow-2xs">
                        {currentIndex + 1}. Kérdés • {currentQuestion.questionTypeBadge || 'Geometria'}
                      </span>
                      <span className={cn(
                        "text-[10px] font-bold px-2 py-0.5 rounded-md border",
                        selectedLevel === 1 ? "bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300" :
                        selectedLevel === 2 ? "bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300" :
                        "bg-rose-50 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-300"
                      )}>
                        {levelConfig.title}
                      </span>
                    </div>

                    <CardContent className="p-4 sm:p-5 text-center space-y-3.5">
                      <div className="p-3 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100/80 dark:border-indigo-900/50">
                        <p className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 leading-relaxed">
                          <MathText size="lg">{currentQuestion.prompt || currentQuestion.question || currentQuestion.title || currentQuestion.text}</MathText>
                        </p>
                      </div>

                      {/* Visual Figure for Geometry */}
                      {currentQuestion.figure && (
                        <div className="flex items-center justify-center p-3 rounded-2xl bg-gradient-to-b from-white to-indigo-50/40 dark:from-slate-900 dark:to-slate-850 border-2 border-indigo-100 dark:border-indigo-900/40 max-h-[220px] overflow-hidden shadow-inner">
                          {currentQuestion.figure}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Explanation Feedback Card (stays on the left) */}
                  {isAnswerChecked && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-200">
                      <div className={cn(
                        "p-3.5 rounded-2xl border-2 shadow-xs text-left",
                        String(selectedOption).trim() === String(currentQuestion.correctAnswer).trim()
                          ? "bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800/80"
                          : "bg-rose-50/90 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800/80"
                      )}>
                        <div className="flex items-start gap-2.5">
                          <div className={cn(
                            "w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 shadow-xs",
                            String(selectedOption).trim() === String(currentQuestion.correctAnswer).trim()
                              ? "bg-emerald-500 text-white"
                              : "bg-rose-500 text-white"
                          )}>
                            {String(selectedOption).trim() === String(currentQuestion.correctAnswer).trim() ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : (
                              <XCircle className="w-4 h-4" />
                            )}
                          </div>

                          <div className="flex-1">
                            <h4 className={cn(
                              "text-xs sm:text-sm font-black mb-0.5",
                              String(selectedOption).trim() === String(currentQuestion.correctAnswer).trim()
                                ? "text-emerald-900 dark:text-emerald-200"
                                : "text-rose-900 dark:text-rose-200"
                            )}>
                              {String(selectedOption).trim() === String(currentQuestion.correctAnswer).trim() ? 'Helyes Válasz! 🎉' : 'Nem jó válasz! 🤔'}
                            </h4>
                            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium mb-1.5">
                              <MathText>{currentQuestion.explanation}</MathText>
                            </p>

                            {((currentQuestion.breakdown && currentQuestion.breakdown.length > 0) || (currentQuestion.steps && currentQuestion.steps.length > 0)) && (
                              <div className="flex flex-wrap items-center gap-1.5 pt-1.5 border-t border-slate-200/60 dark:border-slate-700/60">
                                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Levezetés:</span>
                                {(currentQuestion.breakdown || currentQuestion.steps || []).map((item, bIdx) => (
                                  <span
                                    key={bIdx}
                                    className="px-1.5 py-0.5 rounded-md bg-white/90 dark:bg-slate-800/90 text-[10px] font-bold font-mono text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                                  >
                                    {(item as { label?: string; value?: string }).label || `${bIdx + 1}. lépés`}: <span className="text-teal-600 dark:text-teal-400"><MathText size="sm">{(item as { label?: string; value?: string }).value || String(item)}</MathText></span>
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right: 4 Answer Options + Next Button directly below */}
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-[11px] font-black text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">
                      Válaszd ki a helyes eredményt:
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                      Billentyűk: [1, 2, 3, 4]
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    {(currentQuestion?.options || (currentQuestion as any)?.answers || []).map((option: any, idx: number) => {
                      const optStr = String(option);
                      const isSelected = selectedOption === optStr;
                      const isCorrect = optStr.trim() === String(currentQuestion.correctAnswer).trim();

                      // Distinct vibrant badge colors for cards 1, 2, 3, 4
                      const badgeColors = [
                        "bg-gradient-to-br from-blue-500 to-indigo-600 text-white",
                        "bg-gradient-to-br from-purple-500 to-violet-600 text-white",
                        "bg-gradient-to-br from-amber-500 to-orange-600 text-white",
                        "bg-gradient-to-br from-emerald-500 to-teal-600 text-white",
                      ];

                      let buttonStyle = "bg-white/95 dark:bg-slate-900/90 border-2 border-indigo-200/90 dark:border-indigo-900/70 text-slate-800 dark:text-slate-100 hover:border-indigo-500 hover:bg-indigo-50/40 dark:hover:border-indigo-400 dark:hover:bg-indigo-950/30 hover:shadow-md hover:-translate-y-0.5";
                      let badgeClass = badgeColors[idx % badgeColors.length];

                      if (isAnswerChecked) {
                        if (isCorrect) {
                          buttonStyle = "bg-gradient-to-r from-emerald-50 via-teal-50/80 to-emerald-50/60 dark:bg-emerald-950/70 border-2 border-emerald-500 text-emerald-950 dark:text-emerald-100 shadow-md ring-2 ring-emerald-400/40";
                          badgeClass = "bg-emerald-600 text-white";
                        } else if (isSelected && !isCorrect) {
                          buttonStyle = "bg-gradient-to-r from-rose-50 via-pink-50/80 to-rose-50/60 dark:bg-rose-950/70 border-2 border-rose-500 text-rose-950 dark:text-rose-100 shadow-md ring-2 ring-rose-400/40";
                          badgeClass = "bg-rose-600 text-white";
                        } else {
                          buttonStyle = "bg-slate-50/60 dark:bg-slate-900/40 border-2 border-slate-200/50 dark:border-slate-800/50 text-slate-400 dark:text-slate-600 opacity-50";
                          badgeClass = "bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleOptionClick(option)}
                          disabled={isAnswerChecked}
                          className={cn(
                            "relative min-h-13 sm:min-h-14 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-150 flex items-center justify-between px-4 text-left cursor-pointer shadow-xs",
                            buttonStyle
                          )}
                        >
                          <span className="flex items-center gap-3">
                            <span className={cn(
                              "w-7 h-7 rounded-lg text-xs font-sans font-black flex items-center justify-center shrink-0 shadow-xs",
                              badgeClass
                            )}>
                              {idx + 1}
                            </span>
                            <span className="font-bold leading-snug"><MathText size="md">{optStr}</MathText></span>
                          </span>

                          {isAnswerChecked && isCorrect && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 animate-in zoom-in shrink-0 ml-2" />
                          )}
                          {isAnswerChecked && isSelected && !isCorrect && (
                            <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 animate-in zoom-in shrink-0 ml-2" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Next Question / Finish Button below Options on the Right */}
                  {isAnswerChecked && (
                    <div className="pt-1 animate-in fade-in slide-in-from-bottom-2 duration-200">
                      <Button
                        onClick={handleNextQuestion}
                        className="w-full h-11 sm:h-12 rounded-xl text-sm font-black bg-gradient-to-r from-indigo-600 via-blue-600 to-teal-600 hover:from-indigo-500 hover:to-teal-500 text-white shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                      >
                        {currentIndex < levelConfig.questions.length - 1 ? (
                          <>
                            Következő Feladat
                            <ArrowRight className="w-4 h-4 ml-1" />
                            <span className="text-[10px] font-normal text-indigo-100 ml-1.5 opacity-80">(Enter ↵)</span>
                          </>
                        ) : (
                          <>
                            Eredmények Megtekintése
                            <Trophy className="w-4 h-4 ml-1 text-yellow-300" />
                            <span className="text-[10px] font-normal text-indigo-100 ml-1.5 opacity-80">(Enter ↵)</span>
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : activeCustomMode ? (
            activeCustomMode.render ? (
              activeCustomMode.render({
                level: selectedLevel || 1,
                onNextLevel:
                  (selectedLevel || 1) < 3
                    ? () => handleStartLevel(((selectedLevel || 1) + 1) as DifficultyLevel, gameMode)
                    : undefined,
                onOpenRules: () => setShowCheatSheet(true),
                onBack: onBack,
                onSwitchToQuiz: () => setGameMode('quiz'),
                onSwitchToMatcher: () => setGameMode('matcher'),
                onSwitchToSorter: () => setGameMode('sorter'),
                onSwitchToTheory: onSwitchToTheory
              })
            ) : (activeCustomMode as any).component ? (
              React.createElement((activeCustomMode as any).component, {
                key: `${activeCustomMode.id}-${selectedLevel || 1}`,
                level: selectedLevel || 1,
                onNextLevel:
                  (selectedLevel || 1) < 3
                    ? () => handleStartLevel(((selectedLevel || 1) + 1) as DifficultyLevel, gameMode)
                    : undefined,
                onOpenRules: () => setShowCheatSheet(true),
                onBack: onBack,
                onSwitchToQuiz: () => setGameMode('quiz'),
                onSwitchToMatcher: () => setGameMode('matcher'),
                onSwitchToSorter: () => setGameMode('sorter'),
                onSwitchToTheory: onSwitchToTheory
              })
            ) : null
          ) : null}
        </div>

        {/* RIGHT: Wordwall-style Activity & Controls Sidebar (3 cols on large screen) */}
        <div className="lg:col-span-3 flex flex-col gap-3">
          {/* Wordwall Mode Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border-2 border-indigo-100 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5 px-1">
              <div className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-500" />
                <span className="text-slate-700 dark:text-slate-300 font-extrabold">Játékmódok</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                Wordwall
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {/* Quiz Mode Button */}
              <button
                onClick={() => setGameMode('quiz')}
                className={cn(
                  "w-full p-2.5 rounded-xl text-left font-bold text-xs transition-all flex items-center gap-2.5 border-2 cursor-pointer",
                  gameMode === 'quiz'
                    ? "bg-gradient-to-r from-blue-50 via-indigo-50/60 to-blue-50/40 dark:from-blue-950/60 dark:to-indigo-950/40 border-blue-500 dark:border-blue-400 text-blue-950 dark:text-blue-100 shadow-sm ring-2 ring-blue-400/20"
                    : "bg-blue-50/30 dark:bg-slate-800/60 border-blue-100/80 dark:border-slate-750 hover:border-blue-300 hover:bg-blue-50/60 text-slate-700 dark:text-slate-300"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-xs",
                  gameMode === 'quiz' ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white" : "bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-300"
                )}>
                  <FileQuestion className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-black text-xs flex items-center justify-between">
                    <span>Kvíz</span>
                    {gameMode === 'quiz' && (
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-blue-500 text-white">Aktív</span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">{levelConfig.questions.length} feladat, 4 opció</div>
                </div>
              </button>

              {/* Custom Game Modes */}
              {allGameModes?.map((mode) => {
                const isMatcher = mode.id === 'matcher';
                const isSorter = mode.id === 'sorter';
                const isActive = gameMode === mode.id;

                let activeClass = "bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-500 text-emerald-950 dark:from-emerald-950/60 dark:to-teal-950/40 dark:border-emerald-400 dark:text-emerald-100 shadow-sm ring-2 ring-emerald-400/20";
                let inactiveClass = "bg-teal-50/30 dark:bg-slate-800/60 border-teal-100/80 dark:border-slate-750 hover:border-teal-300 hover:bg-teal-50/60 text-slate-700 dark:text-slate-300";
                let iconActive = "bg-gradient-to-br from-teal-500 to-emerald-600 text-white";
                let iconInactive = "bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-300";

                if (isSorter) {
                  activeClass = "bg-gradient-to-r from-purple-50 to-fuchsia-50 border-purple-500 text-purple-950 dark:from-purple-950/60 dark:to-fuchsia-950/40 dark:border-purple-400 dark:text-purple-100 shadow-sm ring-2 ring-purple-400/20";
                  inactiveClass = "bg-purple-50/30 dark:bg-slate-800/60 border-purple-100/80 dark:border-slate-750 hover:border-purple-300 hover:bg-purple-50/60 text-slate-700 dark:text-slate-300";
                  iconActive = "bg-gradient-to-br from-purple-500 to-fuchsia-600 text-white";
                  iconInactive = "bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-300";
                }

                return (
                  <button
                    key={mode.id}
                    onClick={() => setGameMode(mode.id)}
                    className={cn(
                      "w-full p-2.5 rounded-xl text-left font-bold text-xs transition-all flex items-center gap-2.5 border-2 cursor-pointer",
                      isActive ? activeClass : inactiveClass
                    )}
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-xs",
                      isActive ? iconActive : iconInactive
                    )}>
                      {mode.id === 'matcher' ? (
                        <ArrowRightLeft className="w-4 h-4" />
                      ) : mode.id === 'sorter' ? (
                        <LayoutGrid className="w-4 h-4" />
                      ) : (
                        mode.icon || <LayoutGrid className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-black text-xs flex items-center justify-between">
                        <span>{mode.id === 'matcher' ? 'Párosító játék' : mode.id === 'sorter' ? 'Csoportosító játék' : mode.title}</span>
                        {isActive && (
                          <span className={cn(
                            "text-[9px] font-bold px-1.5 py-0.2 rounded-full text-white",
                            isSorter ? "bg-purple-500" : "bg-teal-500"
                          )}>
                            Aktív
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">{mode.subtitle || 'Interaktív feladat'}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Level Switcher in Sidebar */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border-2 border-amber-100 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5 px-1">
              <div className="flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-slate-700 dark:text-slate-300 font-extrabold">Nehézségi szint</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                {selectedLevel ? `${selectedLevel}. szint` : 'Válassz'}
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              {([1, 2, 3] as DifficultyLevel[]).map((lvl) => {
                const isSelected = selectedLevel === lvl;
                let activeStyle = "";
                let inactiveStyle = "";
                let dotColor = "";
                let label = "";

                if (lvl === 1) {
                  activeStyle = "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/25 border-emerald-400";
                  inactiveStyle = "bg-emerald-50/60 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-900 hover:bg-emerald-100/70 hover:border-emerald-300";
                  dotColor = "bg-emerald-500";
                  label = "1. Könnyű szint";
                } else if (lvl === 2) {
                  activeStyle = "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/25 border-amber-400";
                  inactiveStyle = "bg-amber-50/60 dark:bg-amber-950/20 text-amber-900 dark:text-amber-300 border-amber-200/80 dark:border-amber-900 hover:bg-amber-100/70 hover:border-amber-300";
                  dotColor = "bg-amber-500";
                  label = "2. Közepes szint";
                } else {
                  activeStyle = "bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-md shadow-rose-500/25 border-rose-400";
                  inactiveStyle = "bg-rose-50/60 dark:bg-rose-950/20 text-rose-900 dark:text-rose-300 border-rose-200/80 dark:border-rose-900 hover:bg-rose-100/70 hover:border-rose-300";
                  dotColor = "bg-rose-500";
                  label = "3. Nehéz szint";
                }

                return (
                  <button
                    key={lvl}
                    onClick={() => handleStartLevel(lvl, gameMode)}
                    className={cn(
                      "w-full px-3 py-2 rounded-xl text-xs font-bold transition-all text-left flex items-center justify-between border-2 cursor-pointer",
                      isSelected ? activeStyle : inactiveStyle
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "w-5 h-5 rounded-md flex items-center justify-center font-black text-[10px] shrink-0",
                        isSelected ? "bg-white/25 text-white" : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/70"
                      )}>
                        {lvl}
                      </span>
                      <span>{label}</span>
                    </div>
                    {isSelected ? (
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    ) : (
                      <span className={cn("w-2 h-2 rounded-full", dotColor)} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tools & Rules Actions */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border-2 border-indigo-100 dark:border-slate-800 shadow-xs flex flex-col gap-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFullscreen}
              className="w-full h-9.5 rounded-xl border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/40 dark:bg-indigo-950/20 hover:bg-indigo-100/70 text-indigo-900 dark:text-indigo-200 text-xs font-bold justify-start"
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5 mr-2 text-indigo-600" />
                  Kilépés a teljes képernyőből
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5 mr-2 text-indigo-600" />
                  Teljes képernyős mód
                </>
              )}
            </Button>

            {hasCheatSheet && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCheatSheet(!showCheatSheet)}
                className="w-full h-9.5 rounded-xl border-teal-300 bg-teal-50/70 text-teal-900 dark:bg-teal-950/40 dark:text-teal-200 dark:border-teal-800 hover:bg-teal-100 text-xs font-bold justify-start"
              >
                <Compass className="w-3.5 h-3.5 mr-2 text-teal-600" />
                {cheatSheetTitle || "Segédlet & Szabályok"}
              </Button>
            )}

            {onSwitchToTheory && (
              <Button
                variant="outline"
                size="sm"
                onClick={onSwitchToTheory}
                className="w-full h-9.5 rounded-xl border-violet-200 dark:border-violet-900/60 bg-violet-50/40 dark:bg-violet-950/20 text-violet-900 dark:text-violet-200 hover:bg-violet-100/70 text-xs font-bold justify-start"
              >
                <BookOpen className="w-3.5 h-3.5 mr-2 text-violet-600" />
                Tananyag áttekintése
              </Button>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={() => handleStartLevel(selectedLevel || 1, gameMode)}
              className="w-full h-9.5 rounded-xl border-rose-200 dark:border-rose-900/60 bg-rose-50/30 dark:bg-rose-950/20 text-rose-800 dark:text-rose-300 hover:bg-rose-100/70 text-xs font-bold justify-start"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-2 text-rose-600" />
              Játék újraindítása
            </Button>
          </div>
        </div>
      </div>

      {/* Rules Modal Overlay */}
      {showCheatSheet && hasCheatSheet && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-teal-300 dark:border-teal-900 shadow-2xl max-w-2xl w-full text-left max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-teal-600" />
                {cheatSheetTitle || "Szabályok és összefoglaló"}
              </h3>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowCheatSheet(false)}
                className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 rounded-lg h-7 px-2 text-xs"
              >
                Bezárás
              </Button>
            </div>

            {cheatSheetContent && (
              <div className="mb-4">
                {cheatSheetContent}
              </div>
            )}

            {cheatSheet && cheatSheet.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                {cheatSheet.map((item, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                    <div className="text-xs font-bold text-teal-600 dark:text-teal-400">{item.topic}</div>
                    <div className="text-xs font-mono font-bold text-slate-900 dark:text-white"><MathText>{item.formula}</MathText></div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-300"><MathText>{item.note}</MathText></div>
                  </div>
                ))}
              </div>
            )}

            {normalizedCheatCards && normalizedCheatCards.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                {normalizedCheatCards.map((card, idx) => (
                  <div key={card.id || idx} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-xs text-teal-600 dark:text-teal-400">
                      {card.icon || <Compass className="w-4 h-4" />}
                      <span>{card.title}</span>
                    </div>
                    {card.figure && (
                      <div className="flex items-center justify-center p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                        {card.figure}
                      </div>
                    )}
                    {card.content ? (
                      <div>{card.content}</div>
                    ) : (
                      <>
                        {card.formula && <div className="text-xs font-mono font-bold text-slate-900 dark:text-white"><MathText>{card.formula}</MathText></div>}
                        {card.note && <div className="text-[11px] text-slate-600 dark:text-slate-300"><MathText>{card.note}</MathText></div>}
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}

            <Button
              onClick={() => setShowCheatSheet(false)}
              className="w-full h-10 rounded-xl font-bold bg-teal-600 hover:bg-teal-700 text-white cursor-pointer"
            >
              Értem, bezárás
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizTemplate;

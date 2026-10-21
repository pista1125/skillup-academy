import React, { useState, useEffect, useMemo } from 'react';
import { TeacherClass, ClassStudent } from '@/services/teacherClassService';
import { subscribeClassProgress, QuizProgressRecord } from '@/services/quizProgressService';
import { 
  Trophy, 
  CheckCircle2, 
  Clock, 
  RotateCcw, 
  Search, 
  Filter, 
  Sparkles, 
  User, 
  X, 
  ExternalLink,
  ChevronRight,
  GraduationCap,
  Layers,
  BookOpen,
  Award,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { 
  GradeLevel, 
  MatrixChapterDef, 
  MatrixTopicDef, 
  MATRIX_CURRICULUM 
} from './matrixCurriculumConfig';

export interface ClassQuizProgressMatrixProps {
  currentClass: TeacherClass;
  onClose?: () => void;
}

export type LevelFilterMode = 'all' | 1 | 2 | 3;

export interface TopicLevelProgressData {
  hasStarted: boolean;
  isAllCompleted: boolean;
  completedLevelsCount: number;
  avgScore: number;
  totalAttempts: number;
  levelScores: {
    1?: number;
    2?: number;
    3?: number;
  };
  records: QuizProgressRecord[];
}

export function renderStudentAvatar(avatarUrl?: string, name?: string, size: 'sm' | 'md' = 'sm') {
  if (avatarUrl && (avatarUrl.startsWith('http') || avatarUrl.startsWith('data:') || avatarUrl.startsWith('/'))) {
    return (
      <img
        src={avatarUrl}
        alt={name || 'Avatar'}
        className="w-full h-full object-cover"
      />
    );
  }
  if (avatarUrl && avatarUrl.length <= 4) {
    return <span className={size === 'md' ? 'text-2xl select-none' : 'text-sm select-none'}>{avatarUrl}</span>;
  }
  const initial = (name || 'D').trim().charAt(0).toUpperCase() || '👤';
  return <span className="select-none font-black">{initial}</span>;
}

export function getTopicLevelData(
  recordsForStudent: QuizProgressRecord[] | undefined,
  topicId: string
): TopicLevelProgressData {
  if (!recordsForStudent || recordsForStudent.length === 0) {
    return {
      hasStarted: false,
      isAllCompleted: false,
      completedLevelsCount: 0,
      avgScore: 0,
      totalAttempts: 0,
      levelScores: {},
      records: []
    };
  }

  const cleanTarget = topicId
    .toLowerCase()
    .replace(/^(g[0-9]+|grade-[0-9]+)-/, '')
    .replace(/^rat-/, '')
    .replace(/^int-sec-[0-9]+-?/, '')
    .replace(/^sec-/, '')
    .replace(/-(quiz|matcher|sorter|theory)$/, '');

  const matching: QuizProgressRecord[] = [];
  recordsForStudent.forEach((rec) => {
    const recTopicClean = (rec.topicId || '')
      .toLowerCase()
      .replace(/^(g[0-9]+|grade-[0-9]+)-/, '')
      .replace(/^rat-/, '')
      .replace(/^int-sec-[0-9]+-?/, '')
      .replace(/^sec-/, '')
      .replace(/-(quiz|matcher|sorter|theory)$/, '');

    const recQuizId = (rec.quizId || '').toLowerCase();
    const recTitle = (rec.title || rec.topicTitle || '').toLowerCase();

    const titleMatches = (
      // Grade 8
      (cleanTarget === 'logic' && (recTitle.includes('logik') || recTopicClean.includes('logik'))) ||
      (cleanTarget === 'set-basics' && (recTitle.includes('halmazokr') || recTitle.includes('halmazok alap') || recTopicClean.includes('halmaz-alap') || recTopicClean.includes('halmazok-alap') || recTopicClean.includes('halmazokról'))) ||
      (cleanTarget === 'set-operations' && (recTitle.includes('halmazművelet') || recTitle.includes('műveletek halmaz') || recTopicClean.includes('halmaz-muvelet') || recTopicClean.includes('set-op'))) ||
      (cleanTarget === 'rational-set' && (recTitle.includes('racionális számok halmaza') || recTopicClean.includes('racionalis-halmaz'))) ||
      (cleanTarget === 'rational-operations' && (recTitle.includes('mit tudunk a racionális') || recTopicClean.includes('racionalis-muvelet'))) ||
      (cleanTarget === 'powers' && (recTitle.includes('hatvány') || recTopicClean.includes('hatvany'))) ||
      (cleanTarget === 'sqrt-concept' && (recTitle.includes('négyzetgyök fogalm') || recTopicClean.includes('negyzetgyok-fogalom') || recTopicClean.includes('gyokfogalom') || recTitle.includes('négyzetgyök fogalma'))) ||
      (cleanTarget === 'square-roots' && (recTitle.includes('számok négyzetgyöke') || recTopicClean.includes('szamok-negyzetgyoke') || (recTitle.includes('négyzetgyök') && !recTitle.includes('fogalm')))) ||
      (cleanTarget === 'algebra-intro' && (recTitle.includes('betűs kifejezések') || recTopicClean.includes('betus-ismetles') || recTopicClean.includes('betus-kif'))) ||
      (cleanTarget === 'factoring' && (recTitle.includes('kiemelés') || recTitle.includes('szorzása és a kiemelés') || recTopicClean.includes('betus-szorzas') || recTopicClean.includes('factoring'))) ||
      (cleanTarget === 'polynomial-mult' && (recTitle.includes('többtagú') || recTopicClean.includes('tobbtagu') || recTopicClean.includes('polynomial'))) ||
      (cleanTarget === 'chapter1-summary' && (recTitle.includes('összefoglaló') || recTitle.includes('nagyteszt') || recTopicClean.includes('chapter-summary') || recTopicClean.includes('summary') || recTopicClean.includes('fejezet-osszefoglalo'))) ||
      // Grade 7
      (cleanTarget === 'integer-properties' && (recTitle.includes('egész számok tulajdonság') || recTopicClean.includes('integer-properties'))) ||
      (cleanTarget === 'fractions-decimals' && (recTitle.includes('törtek és tizedestörtek') || recTopicClean.includes('fractions-decimals'))) ||
      (cleanTarget === 'operations' && (recTitle.includes('műveletek racionális') || recTopicClean.includes('operations'))) ||
      (cleanTarget === 'word-problems' && (recTitle.includes('szöveges feladatok') || recTopicClean.includes('word-problems'))) ||
      (cleanTarget === 'complex-operations' && (recTitle.includes('összetett műveletsor') || recTopicClean.includes('complex-operations'))) ||
      (cleanTarget === 'numbers-letters' && (recTitle.includes('számok és betűk') || recTopicClean.includes('numbers-letters'))) ||
      (cleanTarget === 'combining-substitution' && (recTitle.includes('egynemű tagok') || recTitle.includes('helyettesítés') || recTopicClean.includes('combining-substitution'))) ||
      (cleanTarget === 'expansion-factoring' && (recTitle.includes('zárójelfelbontás') || recTitle.includes('kiemelés') || recTopicClean.includes('expansion-factoring'))) ||
      (cleanTarget === 'summary' && (recTitle.includes('fejezeti összefoglaló') || recTopicClean.includes('summary'))) ||
      // Grade 6
      (cleanTarget === 'integers-operations' && (recTitle.includes('műveletek az egész') || recTitle.includes('műveletek kvíz') || recTopicClean.includes('operations'))) ||
      (cleanTarget === 'integers-mult' && (recTitle.includes('szorzása') || recTitle.includes('szorzás kvíz') || recTopicClean.includes('mult'))) ||
      (cleanTarget === 'integers-div' && (recTitle.includes('osztása') || recTitle.includes('osztás kvíz') || recTopicClean.includes('div'))) ||
      (cleanTarget === 'integers-cases' && (recTitle.includes('hány eset') || recTitle.includes('összeszámolás') || recTopicClean.includes('cases'))) ||
      (cleanTarget === 'integers-divisors' && (recTitle.includes('osztó, többszörös') || recTitle.includes('osztópárok') || recTopicClean.includes('divisors'))) ||
      (cleanTarget === 'integers-remainders' && (recTitle.includes('maradék') || recTopicClean.includes('remainder'))) ||
      (cleanTarget === 'integers-factorization' && (recTitle.includes('prímtényez') || recTitle.includes('hány osztója van') || recTopicClean.includes('factorization'))) ||
      (cleanTarget === 'integers-divisibility-2-5-10' && (recTitle.includes('2-vel, 5-tel') || recTitle.includes('2, 5, 10') || recTopicClean.includes('2-5-10'))) ||
      (cleanTarget === 'integers-divisibility-3-9' && (recTitle.includes('3-mal és 9') || recTitle.includes('3, 9') || recTopicClean.includes('3-9'))) ||
      (cleanTarget === 'integers-divisibility-4-100' && (recTitle.includes('4-gyel és 100') || recTitle.includes('4, 100') || recTopicClean.includes('4-100'))) ||
      (cleanTarget === 'integers-composite-divisibility' && (recTitle.includes('összetett oszthatóság') || recTopicClean.includes('composite'))) ||
      (cleanTarget === 'integers-lcm' && (recTitle.includes('lkkt') || recTitle.includes('többszörös, közös') || recTopicClean.includes('lcm'))) ||
      (cleanTarget === 'integers-gcd' && (recTitle.includes('lnko') || recTitle.includes('osztó, közös osztó') || recTopicClean.includes('gcd'))) ||
      (cleanTarget === 'integers-summary' && (recTitle.includes('fejezeti összefoglalás') || (recTitle.includes('összefoglal') && recTopicClean.includes('6')) || recTopicClean.includes('summary'))) ||
      // Grade 5
      (cleanTarget === 'roman-numerals' && (recTitle.includes('római') || recTitle.includes('romai') || recTopicClean.includes('roman'))) ||
      (cleanTarget === 'place-value' && (recTitle.includes('helyiérték') || recTitle.includes('helyiertek') || recTopicClean.includes('place-value'))) ||
      (cleanTarget === 'number-reading' && (recTitle.includes('kiolvasás') || recTitle.includes('kiolvasas') || recTitle.includes('csoportosítás') || recTopicClean.includes('reading'))) ||
      (cleanTarget === 'number-spelling' && (recTitle.includes('helyesírás') || recTitle.includes('helyesiras') || recTopicClean.includes('spelling'))) ||
      (cleanTarget === 'number-systems' && (recTitle.includes('számrendszer') || recTitle.includes('szamrendszer') || recTopicClean.includes('systems'))) ||
      (cleanTarget === 'number-line' && (recTitle.includes('számegyenes') || recTitle.includes('szamegyenes') || recTopicClean.includes('line'))) ||
      (cleanTarget === 'rounding' && (recTitle.includes('kerekítés') || recTitle.includes('becslés') || recTopicClean.includes('rounding'))) ||
      (cleanTarget === 'addition' && ((recTitle.includes('összeadás') || recTitle.includes('osszeadas')) && !recTitle.includes('egész számok') && !recTitle.includes('kivonás') || recTopicClean.includes('addition') && !recTopicClean.includes('integer'))) ||
      (cleanTarget === 'subtraction' && ((recTitle.includes('kivonás') || recTitle.includes('kivonas')) && !recTitle.includes('összeadás') && !recTitle.includes('egész számok') || recTopicClean.includes('subtraction') && !recTopicClean.includes('integer'))) ||
      (cleanTarget === 'multiplication' && ((recTitle.includes('szorzás') || recTitle.includes('szorzas')) && !recTitle.includes('egész számok') && !recTitle.includes('tizedes') || recTopicClean.includes('multiplication') && !recTopicClean.includes('decimal'))) ||
      (cleanTarget === 'division' && ((recTitle.includes('osztás') || recTitle.includes('osztas')) && !recTitle.includes('egész számok') && !recTitle.includes('tizedes') || recTopicClean.includes('division') && !recTopicClean.includes('decimal'))) ||
      (cleanTarget === 'order-of-operations' && (recTitle.includes('műveleti sorrend') || recTitle.includes('sorrend') || recTitle.includes('zárójelek') || recTopicClean.includes('order'))) ||
      (cleanTarget === 'negative-numbers' && (recTitle.includes('negatív szám') || recTitle.includes('negativ') || recTopicClean.includes('negative'))) ||
      (cleanTarget === 'opposite-absolute' && (recTitle.includes('ellentett') || recTitle.includes('abszolút') || recTitle.includes('abszolut') || recTopicClean.includes('opposite') || recTopicClean.includes('absolute'))) ||
      (cleanTarget === 'integer-addition-subtraction' && (recTitle.includes('egész számok összeadása') || recTitle.includes('egész számok műveletei') || recTopicClean.includes('integer-addition-subtraction'))) ||
      (cleanTarget === 'chapter1-summary' && ((recTitle.includes('összefoglal') || recTitle.includes('témazáró')) && (recTopicClean.includes('g5') || recTopicClean.includes('grade-5') || recTitle.includes('5'))))
    );

    const isMatch =
      rec.topicId === topicId ||
      recTopicClean === cleanTarget ||
      (cleanTarget.length > 3 && recTopicClean.includes(cleanTarget)) ||
      (cleanTarget.length > 3 && recQuizId.includes(cleanTarget)) ||
      titleMatches;

    if (isMatch) {
      matching.push(rec);
    }
  });

  const levelScores: { 1?: number; 2?: number; 3?: number } = {};
  let totalAttempts = 0;
  let scoreSum = 0;
  let count = 0;

  matching.forEach((rec) => {
    let lvl: 1 | 2 | 3 = 1;
    if (rec.level === 1 || rec.level === 2 || rec.level === 3) {
      lvl = rec.level;
    } else if (rec.quizId?.includes('lvl1') || rec.quizId?.includes('level1')) {
      lvl = 1;
    } else if (rec.quizId?.includes('lvl2') || rec.quizId?.includes('level2')) {
      lvl = 2;
    } else if (rec.quizId?.includes('lvl3') || rec.quizId?.includes('level3')) {
      lvl = 3;
    }

    const s = rec.bestScore !== undefined ? rec.bestScore : (rec.lastScore ?? 100);
    if (levelScores[lvl] === undefined || s > (levelScores[lvl] || 0)) {
      levelScores[lvl] = s;
    }
    totalAttempts += rec.attemptsCount || 1;
  });

  const completedLevels = Object.keys(levelScores).map(Number) as (1 | 2 | 3)[];
  const completedLevelsCount = completedLevels.length;
  const hasStarted = completedLevelsCount > 0;
  const isAllCompleted = completedLevelsCount >= 3;

  completedLevels.forEach((l) => {
    scoreSum += levelScores[l] || 0;
    count++;
  });

  const avgScore = count > 0 ? Math.round(scoreSum / count) : 0;

  return {
    hasStarted,
    isAllCompleted,
    completedLevelsCount,
    avgScore,
    totalAttempts,
    levelScores,
    records: matching
  };
}

export function ClassQuizProgressMatrix({ currentClass, onClose }: ClassQuizProgressMatrixProps) {
  const [records, setRecords] = useState<QuizProgressRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<ClassStudent | null>(null);

  // Derive initial grade from class name (e.g. "5. osztály", "7.A", "1.B")
  const initialGrade: GradeLevel = useMemo(() => {
    const match = currentClass.name?.match(/([1-8])/);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num >= 1 && num <= 8) return num as GradeLevel;
    }
    return 5;
  }, [currentClass.name]);

  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(initialGrade);

  // When class changes, synchronize grade with class
  useEffect(() => {
    setSelectedGrade(initialGrade);
  }, [initialGrade, currentClass.id]);

  const activeGradeDef = MATRIX_CURRICULUM[selectedGrade] || MATRIX_CURRICULUM[5];
  const availableChapters = activeGradeDef.chapters;

  // Initial chapter: For Grade 7 default to Chapter 2 (Racionális számok), for other grades Chapter 0
  const [selectedChapterId, setSelectedChapterId] = useState<string>(() => {
    if (initialGrade === 7) {
      const ch2 = availableChapters.find((c) => c.id === 'g7-rational-algebra');
      if (ch2) return ch2.id;
    }
    return availableChapters[0]?.id || '';
  });

  // When grade changes, ensure valid selected chapter
  useEffect(() => {
    if (!availableChapters.some((c) => c.id === selectedChapterId)) {
      if (selectedGrade === 7) {
        const ch2 = availableChapters.find((c) => c.id === 'g7-rational-algebra');
        setSelectedChapterId(ch2?.id || availableChapters[0]?.id || '');
      } else {
        setSelectedChapterId(availableChapters[0]?.id || '');
      }
    }
  }, [selectedGrade, availableChapters, selectedChapterId]);

  const activeChapter = availableChapters.find((c) => c.id === selectedChapterId) || availableChapters[0];
  const activeTopics = activeChapter?.topics || [];

  // Level filter mode
  const [levelFilter, setLevelFilter] = useState<LevelFilterMode>('all');

  const studentIds = useMemo(() => {
    return (currentClass.students || []).map((s) => s.userId).filter(Boolean);
  }, [currentClass.students]);

  // Subscribe to real-time progress for all enrolled students
  useEffect(() => {
    if (studentIds.length === 0) {
      setRecords([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsub = subscribeClassProgress(
      studentIds,
      (data) => {
        setRecords(data);
        setLoading(false);
      },
      (err) => {
        console.error('Class progress matrix error:', err);
        setLoading(false);
      }
    );

    return () => unsub();
  }, [studentIds]);

  // Group records by studentId -> QuizProgressRecord[]
  const studentRecordsMap = useMemo(() => {
    const map: Record<string, QuizProgressRecord[]> = {};
    records.forEach((rec) => {
      if (!map[rec.userId]) {
        map[rec.userId] = [];
      }
      map[rec.userId].push(rec);
    });
    return map;
  }, [records]);

  // Filtered students by search query
  const filteredStudents = useMemo(() => {
    return (currentClass.students || []).filter((s) => {
      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;
      return (
        s.name.toLowerCase().includes(q) ||
        (s.userCode && s.userCode.toLowerCase().includes(q)) ||
        (s.email && s.email.toLowerCase().includes(q))
      );
    });
  }, [currentClass.students, searchQuery]);

  // Overall class completion rate for active chapter, adaptive to level filter
  const classStats = useMemo(() => {
    if (!currentClass.students?.length || !activeTopics.length) {
      return { avgScore: 0, completedCount: 0, completionPercent: 0, levelAvg: 0 };
    }
    const totalPossible = currentClass.students.length * activeTopics.length;
    let completedCount = 0;
    let scoreSum = 0;

    currentClass.students.forEach((s) => {
      const sRecs = studentRecordsMap[s.userId] || [];
      activeTopics.forEach((top) => {
        const item = getTopicLevelData(sRecs, top.id);
        if (levelFilter === 'all') {
          if (item.hasStarted) {
            completedCount++;
            scoreSum += item.avgScore || 100;
          }
        } else {
          const sLevelScore = item.levelScores[levelFilter];
          if (sLevelScore !== undefined) {
            completedCount++;
            scoreSum += sLevelScore;
          }
        }
      });
    });

    const avgScore = completedCount > 0 ? Math.round(scoreSum / completedCount) : 0;
    const completionPercent = totalPossible > 0 ? Math.round((completedCount / totalPossible) * 100) : 0;

    return { avgScore, completedCount, completionPercent };
  }, [currentClass.students, studentRecordsMap, activeTopics, levelFilter]);

  // Topic column statistics (for footer summary)
  const topicColumnStats = useMemo(() => {
    const stats: Record<
      string,
      {
        level1Avg: number | null;
        level1Count: number;
        level2Avg: number | null;
        level2Count: number;
        level3Avg: number | null;
        level3Count: number;
        topicAllAvg: number | null;
        topicAllCompletedStudentsCount: number;
      }
    > = {};

    activeTopics.forEach((top) => {
      const l1Scores: number[] = [];
      const l2Scores: number[] = [];
      const l3Scores: number[] = [];
      let startedCount = 0;

      filteredStudents.forEach((student) => {
        const sRecs = studentRecordsMap[student.userId] || [];
        const levelData = getTopicLevelData(sRecs, top.id);

        if (levelData.hasStarted) {
          startedCount++;
        }
        if (levelData.levelScores[1] !== undefined) {
          l1Scores.push(levelData.levelScores[1]!);
        }
        if (levelData.levelScores[2] !== undefined) {
          l2Scores.push(levelData.levelScores[2]!);
        }
        if (levelData.levelScores[3] !== undefined) {
          l3Scores.push(levelData.levelScores[3]!);
        }
      });

      const l1Avg = l1Scores.length > 0 ? Math.round(l1Scores.reduce((a, b) => a + b, 0) / l1Scores.length) : null;
      const l2Avg = l2Scores.length > 0 ? Math.round(l2Scores.reduce((a, b) => a + b, 0) / l2Scores.length) : null;
      const l3Avg = l3Scores.length > 0 ? Math.round(l3Scores.reduce((a, b) => a + b, 0) / l3Scores.length) : null;

      const allScores = [...l1Scores, ...l2Scores, ...l3Scores];
      const topicAllAvg = allScores.length > 0 ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length) : null;

      stats[top.id] = {
        level1Avg: l1Avg,
        level1Count: l1Scores.length,
        level2Avg: l2Avg,
        level2Count: l2Scores.length,
        level3Avg: l3Avg,
        level3Count: l3Scores.length,
        topicAllAvg,
        topicAllCompletedStudentsCount: startedCount,
      };
    });

    return stats;
  }, [activeTopics, filteredStudents, studentRecordsMap]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header & Class Stats Banner */}
      <div className="bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-indigo-500/10 dark:from-rose-950/30 dark:to-indigo-950/30 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-xs uppercase tracking-wider">
              <GraduationCap className="w-4 h-4" />
              <span>{currentClass.name} • Osztály Haladási Mátrix</span>
            </div>

            <div className="flex flex-wrap items-baseline gap-2">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {activeGradeDef.gradeLabel} – {activeChapter?.title}
              </h3>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-2xl">
              {activeChapter?.subtitle}
            </p>
          </div>

          {/* Top Quick Stats */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-white dark:bg-slate-900 px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs text-center min-w-[95px]">
              <div className="text-[10px] uppercase font-bold text-slate-400">
                {levelFilter === 'all' ? 'Osztályátlag' : `${levelFilter}. szint átlag`}
              </div>
              <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono">
                {classStats.avgScore}%
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs text-center min-w-[95px]">
              <div className="text-[10px] uppercase font-bold text-slate-400">
                {levelFilter === 'all' ? 'Össz. Haladás' : `${levelFilter}. sz. Haladás`}
              </div>
              <div className="text-lg font-black text-amber-600 dark:text-amber-400 font-mono">
                {classStats.completionPercent}%
              </div>
            </div>
          </div>
        </div>

        {/* Grade & Chapter Filter Toolbar */}
        <div className="mt-5 pt-4 border-t border-slate-200/70 dark:border-slate-800 flex flex-col gap-4">
          {/* Row 1: Grade Level Selector (1-8. Osztály) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
              <BookOpen className="w-4 h-4 text-indigo-500" />
              <span>Évfolyam:</span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {([1, 2, 3, 4, 5, 6, 7, 8] as GradeLevel[]).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setSelectedGrade(g)}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs flex items-center gap-1",
                    selectedGrade === g
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm font-black scale-105 ring-2 ring-primary/20"
                      : "bg-white/90 dark:bg-slate-800/90 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700"
                  )}
                >
                  <span>{g}. o.</span>
                </button>
              ))}
            </div>
          </div>

          {/* Row 2: Chapter / Témakör Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 shrink-0">
              <Layers className="w-4 h-4 text-amber-500" />
              <span>Fő témakör:</span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 flex-1 justify-start sm:justify-end">
              {availableChapters.map((ch) => (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => setSelectedChapterId(ch.id)}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs text-left",
                    selectedChapterId === ch.id
                      ? "bg-rose-600 text-white font-black shadow-sm"
                      : "bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700"
                  )}
                  title={ch.title}
                >
                  <span>{ch.chapterNumber} {ch.title.replace(/^[IVXLCDM]+\.\s*/, '')}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Row 3: Search bar & Difficulty Level Filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-3 border-t border-slate-200/60 dark:border-slate-800">
            <div className="relative w-full max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <Input
                placeholder="Keresés diák neve vagy kódja alapján..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 rounded-xl text-xs bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-2xs"
              />
            </div>

            {/* Level Filter Selector */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-500" />
                Szint szűrő:
              </span>

              <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setLevelFilter('all')}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer",
                    levelFilter === 'all'
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-black shadow-2xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  Mindhárom szint
                </button>

                <button
                  type="button"
                  onClick={() => setLevelFilter(1)}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1",
                    levelFilter === 1
                      ? "bg-emerald-600 text-white font-black shadow-2xs"
                      : "text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
                  )}
                >
                  <span>1. szint</span>
                </button>

                <button
                  type="button"
                  onClick={() => setLevelFilter(2)}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1",
                    levelFilter === 2
                      ? "bg-amber-500 text-white font-black shadow-2xs"
                      : "text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40"
                  )}
                >
                  <span>2. szint</span>
                </button>

                <button
                  type="button"
                  onClick={() => setLevelFilter(3)}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1",
                    levelFilter === 3
                      ? "bg-rose-600 text-white font-black shadow-2xs"
                      : "text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                  )}
                >
                  <span>3. szint</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Matrix Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {filteredStudents.length === 0 ? (
          <div className="py-16 text-center text-slate-400 text-sm">
            {currentClass.students?.length === 0
              ? 'Ebben az osztályban még nincsenek felvéve diákok.'
              : 'Nincs a keresési feltételnek megfelelő diák.'}
          </div>
        ) : (
          <div className="overflow-x-auto max-w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-[11px] font-black uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  <th className="p-4 sticky left-0 z-20 bg-slate-50 dark:bg-slate-800/95 min-w-[200px] shadow-xs">
                    Tanuló Neve & Kódja
                  </th>
                  {activeTopics.map((top) => (
                    <th key={top.id} className="p-2.5 text-center min-w-[125px] border-l border-slate-200/60 dark:border-slate-800" title={top.title}>
                      <span className="truncate block font-bold text-slate-800 dark:text-slate-200 text-xs">{top.short}</span>
                      {levelFilter === 'all' ? (
                        <div className="grid grid-cols-3 gap-0.5 text-[8px] font-black text-slate-400 dark:text-slate-500 mt-1 uppercase tracking-tighter">
                          <span>1. sz.</span>
                          <span>2. sz.</span>
                          <span>3. sz.</span>
                        </div>
                      ) : (
                        <div className="text-[8.5px] font-black text-primary mt-1 uppercase tracking-wider">
                          {levelFilter}. szint
                        </div>
                      )}
                    </th>
                  ))}
                  <th className="p-3 text-center min-w-[90px] border-l border-slate-200/60 dark:border-slate-800 text-rose-600 dark:text-rose-400">
                    Összesen
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-xs">
                {filteredStudents.map((student) => {
                  const studentRecs = studentRecordsMap[student.userId] || [];
                  let studentCompletedCount = 0;

                  activeTopics.forEach((top) => {
                    const levelData = getTopicLevelData(studentRecs, top.id);
                    if (levelFilter === 'all') {
                      if (levelData.hasStarted) {
                        studentCompletedCount++;
                      }
                    } else {
                      if (levelData.levelScores[levelFilter] !== undefined) {
                        studentCompletedCount++;
                      }
                    }
                  });

                  return (
                    <tr
                      key={student.userId}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      {/* Sticky Student Name Column */}
                      <td
                        className="p-3.5 sticky left-0 z-10 bg-white dark:bg-slate-900 border-r border-slate-200/60 dark:border-slate-800 cursor-pointer group"
                        onClick={() => setSelectedStudent(student)}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-xs shrink-0 overflow-hidden">
                            {renderStudentAvatar(student.avatarUrl, student.name, 'sm')}
                          </div>
                          <div className="truncate">
                            <div className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                              {student.name}
                            </div>
                            <div className="text-[10px] text-slate-400 font-mono">
                              Kód: {student.userCode || '—'}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Topic Cells */}
                      {activeTopics.map((top) => {
                        const levelData = getTopicLevelData(studentRecs, top.id);
                        const l1 = levelData.levelScores[1];
                        const l2 = levelData.levelScores[2];
                        const l3 = levelData.levelScores[3];

                        return (
                          <td
                            key={top.id}
                            className="p-2 text-center border-l border-slate-100 dark:border-slate-800/60 cursor-pointer hover:bg-slate-100/60 dark:hover:bg-slate-800/60 transition-colors"
                            onClick={() => setSelectedStudent(student)}
                          >
                            {levelFilter === 'all' ? (
                              /* 3-Level Detailed Breakdown */
                              levelData.hasStarted ? (
                                <div className="flex items-center justify-center gap-1">
                                  {/* Level 1 */}
                                  <span
                                    className={cn(
                                      "min-w-[34px] px-1 py-0.5 rounded-md text-[10px] font-mono font-black border transition-all text-center",
                                      l1 !== undefined
                                        ? l1 === 100
                                          ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 shadow-2xs"
                                          : l1 >= 70
                                          ? "bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800 shadow-2xs"
                                          : "bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800 shadow-2xs"
                                        : "bg-rose-50/70 dark:bg-rose-950/30 text-rose-500 dark:text-rose-400 border-dashed border-rose-200 dark:border-rose-900/60 text-[8.5px] font-bold"
                                    )}
                                    title={l1 !== undefined ? `1. szint: ${l1}%` : "1. szint: Még hiányzik"}
                                  >
                                    {l1 !== undefined ? `${l1}%` : "—"}
                                  </span>

                                  {/* Level 2 */}
                                  <span
                                    className={cn(
                                      "min-w-[34px] px-1 py-0.5 rounded-md text-[10px] font-mono font-black border transition-all text-center",
                                      l2 !== undefined
                                        ? l2 === 100
                                          ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 shadow-2xs"
                                          : l2 >= 70
                                          ? "bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800 shadow-2xs"
                                          : "bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800 shadow-2xs"
                                        : "bg-rose-50/70 dark:bg-rose-950/30 text-rose-500 dark:text-rose-400 border-dashed border-rose-200 dark:border-rose-900/60 text-[8.5px] font-bold"
                                    )}
                                    title={l2 !== undefined ? `2. szint: ${l2}%` : "2. szint: Még hiányzik"}
                                  >
                                    {l2 !== undefined ? `${l2}%` : "—"}
                                  </span>

                                  {/* Level 3 */}
                                  <span
                                    className={cn(
                                      "min-w-[34px] px-1 py-0.5 rounded-md text-[10px] font-mono font-black border transition-all text-center",
                                      l3 !== undefined
                                        ? l3 === 100
                                          ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 shadow-2xs"
                                          : l3 >= 70
                                          ? "bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800 shadow-2xs"
                                          : "bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800 shadow-2xs"
                                        : "bg-rose-50/70 dark:bg-rose-950/30 text-rose-500 dark:text-rose-400 border-dashed border-rose-200 dark:border-rose-900/60 text-[8.5px] font-bold"
                                    )}
                                    title={l3 !== undefined ? `3. szint: ${l3}%` : "3. szint: Még hiányzik"}
                                  >
                                    {l3 !== undefined ? `${l3}%` : "—"}
                                  </span>
                                </div>
                              ) : (
                                <span className="text-slate-300 dark:text-slate-600 text-xs font-bold select-none">
                                  —
                                </span>
                              )
                            ) : (
                              /* Single Filtered Level Display */
                              (() => {
                                const sVal = levelData.levelScores[levelFilter];
                                const hasVal = sVal !== undefined;
                                return hasVal ? (
                                  <span
                                    className={cn(
                                      "inline-block min-w-[50px] px-2 py-1 rounded-lg text-xs font-mono font-black border transition-all shadow-2xs",
                                      sVal === 100
                                        ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800"
                                        : sVal >= 70
                                        ? "bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800"
                                        : "bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800"
                                    )}
                                  >
                                    {sVal}%
                                  </span>
                                ) : levelData.hasStarted ? (
                                  <span className="inline-block px-2 py-0.5 rounded-md text-[9px] font-bold bg-rose-50/70 dark:bg-rose-950/30 text-rose-500 border border-dashed border-rose-200 dark:border-rose-900/60">
                                    Hiányzik
                                  </span>
                                ) : (
                                  <span className="text-slate-300 dark:text-slate-600 text-xs font-bold select-none">
                                    —
                                  </span>
                                );
                              })()
                            )}
                          </td>
                        );
                      })}

                      {/* Total completed count for student */}
                      <td className="p-3 text-center border-l border-slate-200/60 dark:border-slate-800 font-mono font-bold">
                        <span className={cn(
                          "px-2.5 py-1 rounded-xl text-[11px]",
                          studentCompletedCount === activeTopics.length
                            ? "bg-emerald-600 text-white font-black"
                            : studentCompletedCount > 0
                            ? "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                            : "text-slate-400"
                        )}>
                          {studentCompletedCount} / {activeTopics.length}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>

              {/* Summary / Class Average Footer */}
              <tfoot>
                <tr className="border-t-2 border-slate-300 dark:border-slate-700 bg-slate-50/95 dark:bg-slate-800/95 font-bold">
                  {/* Sticky Column: Title & Overall Average */}
                  <td className="p-3.5 sticky left-0 z-20 bg-slate-100 dark:bg-slate-800/95 border-r border-slate-200 dark:border-slate-700 shadow-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-xs">
                        📊
                      </div>
                      <div className="truncate">
                        <div className="font-black text-xs text-slate-900 dark:text-white uppercase tracking-wider">
                          Osztályátlag
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium truncate">
                          {classStats.completedCount > 0
                            ? `Összesített átlag: ${classStats.avgScore}%`
                            : 'Még nincs kitöltés'}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Topic Columns */}
                  {activeTopics.map((top) => {
                    const topStat = topicColumnStats[top.id] || {
                      level1Avg: null,
                      level1Count: 0,
                      level2Avg: null,
                      level2Count: 0,
                      level3Avg: null,
                      level3Count: 0,
                      topicAllAvg: null,
                      topicAllCompletedStudentsCount: 0,
                    };

                    if (levelFilter === 'all') {
                      return (
                        <td
                          key={top.id}
                          className="p-2.5 text-center border-l border-slate-200/80 dark:border-slate-700/80 align-middle"
                        >
                          <div className="space-y-1">
                            {/* 3 mini level badges */}
                            <div className="grid grid-cols-3 gap-1">
                              {/* Level 1 */}
                              <div
                                className={cn(
                                  "px-1 py-0.5 rounded text-[10px] font-mono font-black border text-center transition-all shadow-2xs",
                                  topStat.level1Avg !== null
                                    ? topStat.level1Avg >= 80
                                      ? "bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800"
                                      : topStat.level1Avg >= 60
                                      ? "bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800"
                                      : "bg-rose-100 dark:bg-rose-950/70 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800"
                                    : "bg-slate-100 dark:bg-slate-800/60 text-slate-400 dark:text-slate-500 border-dashed border-slate-200 dark:border-slate-700"
                                )}
                                title={`1. szint átlag: ${topStat.level1Avg !== null ? topStat.level1Avg + '%' : 'Nincs adat'} (${topStat.level1Count} diák)`}
                              >
                                {topStat.level1Avg !== null ? `${topStat.level1Avg}%` : '—'}
                              </div>

                              {/* Level 2 */}
                              <div
                                className={cn(
                                  "px-1 py-0.5 rounded text-[10px] font-mono font-black border text-center transition-all shadow-2xs",
                                  topStat.level2Avg !== null
                                    ? topStat.level2Avg >= 80
                                      ? "bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800"
                                      : topStat.level2Avg >= 60
                                      ? "bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800"
                                      : "bg-rose-100 dark:bg-rose-950/70 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800"
                                    : "bg-slate-100 dark:bg-slate-800/60 text-slate-400 dark:text-slate-500 border-dashed border-slate-200 dark:border-slate-700"
                                )}
                                title={`2. szint átlag: ${topStat.level2Avg !== null ? topStat.level2Avg + '%' : 'Nincs adat'} (${topStat.level2Count} diák)`}
                              >
                                {topStat.level2Avg !== null ? `${topStat.level2Avg}%` : '—'}
                              </div>

                              {/* Level 3 */}
                              <div
                                className={cn(
                                  "px-1 py-0.5 rounded text-[10px] font-mono font-black border text-center transition-all shadow-2xs",
                                  topStat.level3Avg !== null
                                    ? topStat.level3Avg >= 80
                                      ? "bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800"
                                      : topStat.level3Avg >= 60
                                      ? "bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800"
                                      : "bg-rose-100 dark:bg-rose-950/70 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800"
                                    : "bg-slate-100 dark:bg-slate-800/60 text-slate-400 dark:text-slate-500 border-dashed border-slate-200 dark:border-slate-700"
                                )}
                                title={`3. szint átlag: ${topStat.level3Avg !== null ? topStat.level3Avg + '%' : 'Nincs adat'} (${topStat.level3Count} diák)`}
                              >
                                {topStat.level3Avg !== null ? `${topStat.level3Avg}%` : '—'}
                              </div>
                            </div>

                            {/* Count info */}
                            <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                              {topStat.topicAllCompletedStudentsCount > 0 ? (
                                <span>{topStat.topicAllCompletedStudentsCount} / {filteredStudents.length} diák</span>
                              ) : (
                                <span className="text-slate-400 dark:text-slate-500 italic">0 kitöltés</span>
                              )}
                            </div>
                          </div>
                        </td>
                      );
                    }

                    // Single level filtered mode
                    const currentLvlAvg = levelFilter === 1 ? topStat.level1Avg : levelFilter === 2 ? topStat.level2Avg : topStat.level3Avg;
                    const currentLvlCount = levelFilter === 1 ? topStat.level1Count : levelFilter === 2 ? topStat.level2Count : topStat.level3Count;

                    return (
                      <td
                        key={top.id}
                        className="p-2.5 text-center border-l border-slate-200/80 dark:border-slate-700/80 align-middle"
                      >
                        <div className="space-y-1">
                          {currentLvlAvg !== null ? (
                            <span
                              className={cn(
                                "inline-block min-w-[54px] px-2.5 py-1 rounded-lg text-xs font-mono font-black border transition-all shadow-2xs",
                                currentLvlAvg >= 80
                                  ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800"
                                  : currentLvlAvg >= 60
                                  ? "bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800"
                                  : "bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800"
                              )}
                            >
                              {currentLvlAvg}%
                            </span>
                          ) : (
                            <span className="text-slate-400 dark:text-slate-500 text-xs font-bold select-none">
                              —
                            </span>
                          )}
                          <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                            {currentLvlCount} / {filteredStudents.length} diák
                          </div>
                        </div>
                      </td>
                    );
                  })}

                  {/* Summary / Total Column */}
                  <td className="p-3 text-center border-l border-slate-200 dark:border-slate-700 font-mono font-bold">
                    <div className="space-y-0.5">
                      <span className="px-2.5 py-1 rounded-xl text-xs font-black bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 inline-block">
                        {classStats.avgScore > 0 ? `${classStats.avgScore}%` : '—'}
                      </span>
                      <div className="text-[9.5px] font-bold text-slate-400">
                        {classStats.completionPercent}% kész
                      </div>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>

      {/* Student Detailed Progress Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-xl w-full p-6 space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center font-black text-lg shadow-md shadow-amber-500/20 overflow-hidden shrink-0">
                  {renderStudentAvatar(selectedStudent.avatarUrl, selectedStudent.name, 'md')}
                </div>
                <div>
                  <h4 className="font-black text-lg text-slate-900 dark:text-white">
                    {selectedStudent.name}
                  </h4>
                  <p className="text-xs text-slate-400 font-mono">
                    Azonosító kód: <strong>{selectedStudent.userCode || '—'}</strong> • {selectedStudent.email || 'Nincs megadva e-mail'}
                  </p>
                </div>
              </div>

              <Button
                size="icon"
                variant="ghost"
                onClick={() => setSelectedStudent(null)}
                className="rounded-xl text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Modal Grade Switcher */}
            <div className="flex items-center justify-between gap-2">
              <div className="text-xs font-black text-slate-400 uppercase tracking-wider">
                {activeGradeDef.gradeLabel} • {activeChapter?.title}
              </div>
              <div className="flex items-center gap-1">
                {([1, 2, 3, 4, 5, 6, 7, 8] as GradeLevel[]).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setSelectedGrade(g)}
                    className={cn(
                      "px-2 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer",
                      selectedGrade === g
                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-black"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                    )}
                  >
                    {g}. o.
                  </button>
                ))}
              </div>
            </div>

            {/* Student topic list with 3-Level Details */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-black text-slate-400 uppercase tracking-wider">
                <span>Témakörök ({activeTopics.length})</span>
                <span>Szintek eredményei</span>
              </div>

              <div className="space-y-2">
                {activeTopics.map((top) => {
                  const studentRecs = studentRecordsMap[selectedStudent.userId] || [];
                  const levelData = getTopicLevelData(studentRecs, top.id);
                  const isDone = levelData.hasStarted;

                  return (
                    <div
                      key={top.id}
                      className={cn(
                        "p-3.5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs transition-colors",
                        levelData.isAllCompleted
                          ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60"
                          : isDone
                          ? "bg-amber-50/30 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/60"
                          : "bg-slate-50 dark:bg-slate-850 border-slate-200/60 dark:border-slate-800 text-slate-400"
                      )}
                    >
                      <div className="font-bold text-slate-800 dark:text-slate-200 truncate">
                        {top.title}
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {([1, 2, 3] as const).map((lvl) => {
                          const s = levelData.levelScores[lvl];
                          const hasScore = s !== undefined;
                          return (
                            <div
                              key={lvl}
                              className={cn(
                                "flex items-center gap-1 px-2.5 py-1 rounded-xl font-mono text-xs font-bold border shadow-2xs",
                                hasScore
                                  ? s === 100
                                    ? "bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800"
                                    : s >= 70
                                    ? "bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800"
                                    : "bg-rose-100 dark:bg-rose-950/70 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800"
                                  : isDone
                                  ? "bg-rose-50/60 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 border border-dashed border-rose-200 dark:border-rose-900"
                                  : "bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700"
                              )}
                            >
                              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-sans">{lvl}. sz:</span>
                              <span className="font-black">{hasScore ? `${s}%` : (isDone ? 'Hiányzik' : '—')}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                onClick={() => setSelectedStudent(null)}
                className="rounded-xl font-bold bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 text-white text-xs h-9 px-5 cursor-pointer"
              >
                Bezárás
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClassQuizProgressMatrix;

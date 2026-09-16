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
  Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export interface ClassQuizProgressMatrixProps {
  currentClass: TeacherClass;
  onClose?: () => void;
}

export type GradeLevel = 5 | 6 | 7 | 8;

export interface TopicDef {
  id: string;
  title: string;
  short: string;
}

export interface GradeChapterConfig {
  grade: GradeLevel;
  gradeLabel: string;
  chapterTitle: string;
  subtitle: string;
  topics: TopicDef[];
}

// 5. Osztály - I. Fejezet témakörei
const GRADE_5_TOPICS: TopicDef[] = [
  { id: 'roman-numerals', title: '1. Római számok', short: 'Római' },
  { id: 'place-value', title: '2. Helyiértékes írás', short: 'Helyiérték' },
  { id: 'number-reading', title: '3. Számok kiolvasása', short: 'Kiolvasás' },
  { id: 'number-spelling', title: '4. Számok helyesírása', short: 'Helyesírás' },
  { id: 'number-systems', title: '5. Számrendszerek', short: 'Számrendsz.' },
  { id: 'number-line', title: '6. Számegyenes', short: 'Számegyenes' },
  { id: 'rounding', title: '7. Becslés, kerekítés', short: 'Kerekítés' },
  { id: 'addition', title: '8. Összeadás', short: 'Összeadás' },
  { id: 'subtraction', title: '9. Kivonás', short: 'Kivonás' },
  { id: 'multiplication', title: '10. Szorzás', short: 'Szorzás' },
  { id: 'division', title: '11. Osztás', short: 'Osztás' },
  { id: 'order-of-operations', title: '12. Műveleti sorrend', short: 'Műv. sorrend' },
  { id: 'negative-numbers', title: '13. Negatív számok', short: 'Negatív' },
  { id: 'opposite-absolute', title: '14. Ellentett & Abszolút', short: 'Ellentett' },
  { id: 'integer-addition-subtraction', title: '15. Egész számok műveletei', short: 'Egész műv.' },
  { id: 'chapter1-summary', title: '16. Témazáró Összefoglalás', short: 'Témazáró' }
];

// 6. Osztály - I. Fejezet témakörei
const GRADE_6_TOPICS: TopicDef[] = [
  { id: 'integers-operations', title: '1. Műveletek egész számokkal', short: 'Műveletek' },
  { id: 'integers-mult', title: '2. Egész számok szorzása', short: 'Szorzás' },
  { id: 'integers-div', title: '3. Egész számok osztása', short: 'Osztás' },
  { id: 'integers-cases', title: '4. Előjelszabályok & Esetek', short: 'Előjelek' },
  { id: 'integers-divisors', title: '5. Osztók & Többszörösök', short: 'Osztók' },
  { id: 'integers-remainders', title: '6. Osztási maradékok', short: 'Maradék' },
  { id: 'integers-factorization', title: '7. Prímtényezős felbontás', short: 'Prímtényező' },
  { id: 'integers-divisibility-2-5-10', title: '8. Oszthatóság: 2, 5, 10', short: '2, 5, 10' },
  { id: 'integers-divisibility-3-9', title: '9. Oszthatóság: 3, 9', short: '3, 9' },
  { id: 'integers-divisibility-4-100', title: '10. Oszthatóság: 4, 100', short: '4, 100' },
  { id: 'integers-composite-divisibility', title: '11. Összetett oszthatóság', short: 'Összetett' },
  { id: 'integers-lcm', title: '12. Legkisebb közös többszörös (LKKT)', short: 'LKKT' },
  { id: 'integers-gcd', title: '13. Legnagyobb közös osztó (LNKO)', short: 'LNKO' },
  { id: 'integers-summary', title: '14. Témazáró Összefoglalás', short: 'Témazáró' }
];

// 7. Osztály - I. Fejezet témakörei
const GRADE_7_TOPICS: TopicDef[] = [
  { id: 'rat-integer-properties', title: '1. Egész számok tulajdonságai', short: 'Tulajdonságok' },
  { id: 'rat-fractions-decimals', title: '2. Törtek és tizedestörtek', short: 'Törtek' },
  { id: 'rat-operations', title: '3. Műveletek racionális számokkal', short: 'Műveletek' },
  { id: 'rat-word-problems', title: '4. Szöveges feladatok', short: 'Szöveges' },
  { id: 'rat-complex-operations', title: '5. Összetett műveletsorok', short: 'Műveletsor' },
  { id: 'rat-numbers-letters', title: '6. Számok és betűk, kifejezések', short: 'Kifejezések' },
  { id: 'rat-combining-substitution', title: '7. Egynemű tagok & Helyettesítés', short: 'Helyettesítés' },
  { id: 'rat-expansion-factoring', title: '8. Zárójelfelbontás & Kiemelés', short: 'Zárójelbontás' },
  { id: 'rat-summary', title: '9. Fejezeti összefoglaló', short: 'Témazáró' }
];

// 8. Osztály - I. Fejezet témakörei
const GRADE_8_TOPICS: TopicDef[] = [
  { id: 'logic', title: '1. Logika feladatok', short: 'Logika' },
  { id: 'set-basics', title: '2. Mit tudunk a halmazokról?', short: 'Halmaz alap' },
  { id: 'set-operations', title: '3. Műveletek halmazokkal', short: 'Halmazműv.' },
  { id: 'rational-set', title: '4. A racionális számok halmaza', short: 'Racionális' },
  { id: 'rational-operations', title: '5. Mit tudunk a racionális számokról?', short: 'Rac. művelet' },
  { id: 'powers', title: '6. Hatványozás', short: 'Hatvány' },
  { id: 'sqrt-concept', title: '7. A négyzetgyök fogalma', short: 'Gyökfogalom' },
  { id: 'square-roots', title: '8. Számok négyzetgyöke', short: 'Négyzetgyök' },
  { id: 'algebra-intro', title: '9. Betűs kifejezések', short: 'Betűs kif.' },
  { id: 'factoring', title: '10. Szorzás és kiemelés', short: 'Kiemelés' },
  { id: 'polynomial-mult', title: '11. Többtagú kifejezések szorzata', short: 'Többtagú' },
  { id: 'chapter1-summary', title: '12. Témazáró Összefoglalás', short: 'Témazáró' }
];

const GRADE_CONFIGS: Record<GradeLevel, GradeChapterConfig> = {
  5: {
    grade: 5,
    gradeLabel: '5. Osztály',
    chapterTitle: 'I. Az egész számok',
    subtitle: 'Valós idejű áttekintés az 5. osztályos kvízek, csoportosítók és párosítók teljesítéséről.',
    topics: GRADE_5_TOPICS
  },
  6: {
    grade: 6,
    gradeLabel: '6. Osztály',
    chapterTitle: 'I. Egész számok és oszthatóság',
    subtitle: 'Valós idejű áttekintés a 6. osztályos műveletek, oszthatóság, LKKT és LNKO témákról.',
    topics: GRADE_6_TOPICS
  },
  7: {
    grade: 7,
    gradeLabel: '7. Osztály',
    chapterTitle: 'I. Racionális számok, algebra',
    subtitle: 'Valós idejű áttekintés a 7. osztályos racionális számok, algebrai kifejezések és kiemelés témákról.',
    topics: GRADE_7_TOPICS
  },
  8: {
    grade: 8,
    gradeLabel: '8. Osztály',
    chapterTitle: 'I. Számok és betűk',
    subtitle: 'Valós idejű áttekintés a 8. osztályos logika, halmazok, hatványozás, gyökvonás és kifejezések témákról.',
    topics: GRADE_8_TOPICS
  }
};

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

  // Derive initial grade from class name (e.g. "6.A" -> 6)
  const initialGrade: GradeLevel = useMemo(() => {
    const match = currentClass.name?.match(/([5-8])/);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num >= 5 && num <= 8) return num as GradeLevel;
    }
    return 5;
  }, [currentClass.name]);

  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(initialGrade);

  const activeConfig = GRADE_CONFIGS[selectedGrade];
  const activeTopics = activeConfig.topics;

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

  // Filtered students
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

  // Overall class completion rate for the active grade
  const classStats = useMemo(() => {
    if (!currentClass.students?.length) return { avgScore: 0, completedCount: 0, completionPercent: 0 };
    const totalPossible = currentClass.students.length * activeTopics.length;
    let completedCount = 0;
    let scoreSum = 0;

    currentClass.students.forEach((s) => {
      const sRecs = studentRecordsMap[s.userId] || [];
      activeTopics.forEach((top) => {
        const item = getTopicLevelData(sRecs, top.id);
        if (item.hasStarted) {
          completedCount++;
          scoreSum += item.avgScore || 100;
        }
      });
    });

    const avgScore = completedCount > 0 ? Math.round(scoreSum / completedCount) : 0;
    const completionPercent = totalPossible > 0 ? Math.round((completedCount / totalPossible) * 100) : 0;

    return { avgScore, completedCount, completionPercent };
  }, [currentClass.students, studentRecordsMap, activeTopics]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header & Class Stats Banner */}
      <div className="bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-indigo-500/10 dark:from-rose-950/30 dark:to-indigo-950/30 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-xs uppercase tracking-wider">
              <GraduationCap className="w-4 h-4" />
              <span>{currentClass.name} • Osztály Haladási Mátrix (3 Nehézségi Szint)</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {activeConfig.gradeLabel} – {activeConfig.chapterTitle}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {activeConfig.subtitle}
            </p>
          </div>

          {/* Grade Selector Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {([5, 6, 7, 8] as GradeLevel[]).map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setSelectedGrade(g)}
                className={cn(
                  "px-3.5 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer shadow-xs flex items-center gap-1.5",
                  selectedGrade === g
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md scale-105"
                    : "bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700"
                )}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{g}. Osztály</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white dark:bg-slate-900 px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs text-center min-w-[90px]">
              <div className="text-[10px] uppercase font-bold text-slate-400">Osztályátlag</div>
              <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono">
                {classStats.avgScore}%
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs text-center min-w-[90px]">
              <div className="text-[10px] uppercase font-bold text-slate-400">Haladás</div>
              <div className="text-lg font-black text-amber-600 dark:text-amber-400 font-mono">
                {classStats.completionPercent}%
              </div>
            </div>
          </div>
        </div>

        {/* Search bar & 3-Level Matrix Legend */}
        <div className="mt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-slate-200/60 dark:border-slate-800">
          <div className="relative w-full max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <Input
              placeholder="Keresés diák neve vagy kódja alapján..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-10 rounded-xl text-xs bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs"
            />
          </div>

          {/* Matrix Legend */}
          <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600 dark:text-slate-400 font-medium">
            <span className="font-bold text-slate-700 dark:text-slate-300">Jelmagyarázat cellánként:</span>
            <div className="flex items-center gap-1.5 font-mono font-bold text-[10px]">
              <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">1. sz. %</span>
              <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300">2. sz. %</span>
              <span className="px-1.5 py-0.5 rounded bg-rose-50 text-rose-500 border border-dashed border-rose-300">3. sz. (— = hiányzik)</span>
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
                    <th key={top.id} className="p-2.5 text-center min-w-[130px] border-l border-slate-200/60 dark:border-slate-800" title={top.title}>
                      <span className="truncate block font-bold text-slate-800 dark:text-slate-200 text-xs">{top.short}</span>
                      <div className="grid grid-cols-3 gap-0.5 text-[8px] font-black text-slate-400 dark:text-slate-500 mt-1 uppercase tracking-tighter">
                        <span>1. sz.</span>
                        <span>2. sz.</span>
                        <span>3. sz.</span>
                      </div>
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
                  let studentScoreSum = 0;

                  activeTopics.forEach((top) => {
                    const levelData = getTopicLevelData(studentRecs, top.id);
                    if (levelData.hasStarted) {
                      studentCompletedCount++;
                      studentScoreSum += levelData.avgScore;
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
                          <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-xs shrink-0">
                            {student.avatarUrl || student.name.charAt(0)}
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

                      {/* Topic Cells with 3-Level Breakdown */}
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
                            {levelData.hasStarted ? (
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
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center font-black text-lg shadow-md shadow-amber-500/20">
                  {selectedStudent.avatarUrl || selectedStudent.name.charAt(0)}
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
                className="rounded-xl text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Modal Grade Switcher */}
            <div className="flex items-center justify-between gap-2">
              <div className="text-xs font-black text-slate-400 uppercase tracking-wider">
                {activeConfig.gradeLabel} • {activeConfig.chapterTitle}
              </div>
              <div className="flex items-center gap-1">
                {([5, 6, 7, 8] as GradeLevel[]).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setSelectedGrade(g)}
                    className={cn(
                      "px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer",
                      selectedGrade === g
                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
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
                <span>Témakörök és nehézségi szintek</span>
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
                className="rounded-xl font-bold bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 text-white text-xs h-9 px-5"
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

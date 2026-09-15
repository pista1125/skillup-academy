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

/**
 * Fuzzy record lookup for a given topic ID across student records
 */
function getRecordForTopic(
  sMap: Record<string, QuizProgressRecord> | undefined,
  topId: string
): QuizProgressRecord | undefined {
  if (!sMap) return undefined;
  if (sMap[topId]) return sMap[topId];

  const clean = topId.replace(/^g[0-9]+-/, '').replace(/-(quiz|matcher|sorter|theory)$/, '');
  if (sMap[clean]) return sMap[clean];

  const matchKey = Object.keys(sMap).find((k) => {
    return k.includes(clean) || (clean.length > 3 && k.toLowerCase().includes(clean));
  });

  return matchKey ? sMap[matchKey] : undefined;
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

  // Index records by studentId -> topicKey
  const studentTopicMap = useMemo(() => {
    const map: Record<string, Record<string, QuizProgressRecord>> = {};

    records.forEach((rec) => {
      if (!map[rec.userId]) {
        map[rec.userId] = {};
      }

      // Key by topicId or quizId
      if (rec.topicId) {
        const clean = rec.topicId.replace(/^g[0-9]+-/, '').replace(/-(quiz|matcher|sorter|theory)$/, '');
        map[rec.userId][clean] = rec;
        map[rec.userId][rec.topicId] = rec;
      }
      if (rec.quizId) {
        map[rec.userId][rec.quizId] = rec;
        const parts = rec.quizId.split('__');
        if (parts.length >= 3) {
          const tId = parts[2];
          const cleanT = tId.replace(/^g[0-9]+-/, '').replace(/-(quiz|matcher|sorter|theory)$/, '');
          map[rec.userId][cleanT] = rec;
          map[rec.userId][tId] = rec;
        }
      }
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
    if (!currentClass.students?.length) return { avgScore: 0, completedTasks: 0, completionPercent: 0 };
    const totalPossible = currentClass.students.length * activeTopics.length;
    let completedCount = 0;
    let scoreSum = 0;

    currentClass.students.forEach((s) => {
      const sMap = studentTopicMap[s.userId] || {};
      activeTopics.forEach((top) => {
        const item = getRecordForTopic(sMap, top.id);
        if (item && item.completed) {
          completedCount++;
          scoreSum += item.bestScore || 100;
        }
      });
    });

    const avgScore = completedCount > 0 ? Math.round(scoreSum / completedCount) : 0;
    const completionPercent = totalPossible > 0 ? Math.round((completedCount / totalPossible) * 100) : 0;

    return { avgScore, completedCount, completionPercent };
  }, [currentClass.students, studentTopicMap, activeTopics]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header & Class Stats Banner */}
      <div className="bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-indigo-500/10 dark:from-rose-950/30 dark:to-indigo-950/30 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-xs uppercase tracking-wider">
              <GraduationCap className="w-4 h-4" />
              <span>{currentClass.name} • Osztály Haladási Mátrix</span>
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

        {/* Search bar */}
        <div className="mt-5 flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <Input
              placeholder="Keresés diák neve vagy kódja alapján..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-10 rounded-xl text-xs bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs"
            />
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
                    <th key={top.id} className="p-3 text-center min-w-[100px] border-l border-slate-200/60 dark:border-slate-800" title={top.title}>
                      <span className="truncate block max-w-[100px]">{top.short}</span>
                    </th>
                  ))}
                  <th className="p-3 text-center min-w-[90px] border-l border-slate-200/60 dark:border-slate-800 text-rose-600 dark:text-rose-400">
                    Összesen
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-xs">
                {filteredStudents.map((student) => {
                  const sMap = studentTopicMap[student.userId] || {};
                  let studentCompletedCount = 0;
                  let studentScoreSum = 0;

                  activeTopics.forEach((top) => {
                    const rec = getRecordForTopic(sMap, top.id);
                    if (rec && rec.completed) {
                      studentCompletedCount++;
                      studentScoreSum += rec.bestScore || 100;
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

                      {/* Topic Cells */}
                      {activeTopics.map((top) => {
                        const rec = getRecordForTopic(sMap, top.id);
                        const isDone = Boolean(rec && rec.completed);
                        const score = rec?.bestScore ?? 0;
                        const attempts = rec?.attemptsCount ?? 0;

                        return (
                          <td
                            key={top.id}
                            className="p-2 text-center border-l border-slate-100 dark:border-slate-800/60"
                            onClick={() => setSelectedStudent(student)}
                          >
                            {isDone ? (
                              <button
                                type="button"
                                className={cn(
                                  "inline-flex items-center gap-1 px-2 py-1 rounded-lg font-mono font-bold text-[11px] shadow-2xs transition-transform hover:scale-105 cursor-pointer",
                                  score === 100
                                    ? "bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800"
                                    : score >= 70
                                    ? "bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800"
                                    : "bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800"
                                )}
                                title={`Legjobb eredmény: ${score}% (${attempts}x próbálkozás)`}
                              >
                                <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                                <span>{score}%</span>
                              </button>
                            ) : (
                              <span className="text-slate-300 dark:text-slate-600 text-sm font-bold select-none">
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

            {/* Student topic list */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-black text-slate-400 uppercase tracking-wider">
                <span>Témakörök és eredmények</span>
                <span>Állapot</span>
              </div>

              <div className="space-y-2">
                {activeTopics.map((top) => {
                  const sMap = studentTopicMap[selectedStudent.userId] || {};
                  const rec = getRecordForTopic(sMap, top.id);
                  const isDone = Boolean(rec && rec.completed);

                  return (
                    <div
                      key={top.id}
                      className={cn(
                        "p-3 rounded-2xl border flex items-center justify-between gap-3 text-xs transition-colors",
                        isDone
                          ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60"
                          : "bg-slate-50 dark:bg-slate-850 border-slate-200/60 dark:border-slate-800 text-slate-400"
                      )}
                    >
                      <div className="font-bold text-slate-800 dark:text-slate-200 truncate">
                        {top.title}
                      </div>

                      {isDone ? (
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-[11px] text-slate-400">
                            {rec.attemptsCount}x kitöltve
                          </span>
                          <span className="px-2.5 py-1 rounded-xl font-mono font-black text-xs bg-emerald-600 text-white shadow-2xs">
                            {rec.bestScore}%
                          </span>
                        </div>
                      ) : (
                        <span className="text-slate-400 text-[11px] italic">
                          Még nem kezdte el
                        </span>
                      )}
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

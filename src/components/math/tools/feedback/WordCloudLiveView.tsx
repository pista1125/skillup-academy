import { useState, useEffect, useMemo, useRef } from 'react';
import { db } from '@/lib/firebase';
import {
  collection,
  doc,
  query,
  where,
  onSnapshot,
  updateDoc
} from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import {
  Cloud,
  Lock,
  Unlock,
  Maximize2,
  Minimize2,
  ChevronLeft,
  Users,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  BarChart3,
  Award,
  Layers
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';
import { WordCloudDisplay } from './WordCloudDisplay';
import { aggregateWords, WordItem, WordCloudShape } from './wordCloudUtils';

interface WordCloudLiveViewProps {
  session: any;
  onComplete: () => void;
}

interface StudentSubmission {
  id: string;
  student_id: string;
  student_name: string;
  student_avatar?: string;
  words: string[];
  submitted_at: string;
}

export function WordCloudLiveView({ session, onComplete }: WordCloudLiveViewProps) {
  const [submissions, setSubmissions] = useState<StudentSubmission[]>([]);
  const [isClosed, setIsClosed] = useState<boolean>(session?.is_closed || false);
  const [hiddenWords, setHiddenWords] = useState<string[]>(session?.hidden_words || []);
  const [currentShape, setCurrentShape] = useState<WordCloudShape>(session?.shape || 'cloud');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const studentsList: any[] = session?.students || [];
  const totalStudents = studentsList.length || 0;

  // 1. Listen for responses in real time
  useEffect(() => {
    if (!session?.id) return;

    const q = query(
      collection(db, 'feedback_word_cloud_responses'),
      where('session_id', '==', session.id)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list: StudentSubmission[] = [];
      snapshot.forEach((docSnap) => {
        list.push({ id: docSnap.id, ...(docSnap.data() as any) });
      });
      setSubmissions(list);
    });

    return () => unsubscribe();
  }, [session?.id]);

  // 2. Listen to session doc updates (is_closed, hidden_words)
  useEffect(() => {
    if (!session?.id) return;

    const unsubscribe = onSnapshot(doc(db, 'feedback_sessions', session.id), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (typeof data.is_closed === 'boolean') {
          setIsClosed(data.is_closed);
        }
        if (Array.isArray(data.hidden_words)) {
          setHiddenWords(data.hidden_words);
        }
        if (data.shape) {
          setCurrentShape(data.shape);
        }
      }
    });

    return () => unsubscribe();
  }, [session?.id]);

  const handleShapeChange = async (newShape: WordCloudShape) => {
    setCurrentShape(newShape);
    if (!session?.id) return;
    try {
      await updateDoc(doc(db, 'feedback_sessions', session.id), {
        shape: newShape
      });
    } catch (err) {
      console.error('Error updating word cloud shape:', err);
    }
  };

  // Aggregate all raw words from submissions
  const allRawWords = useMemo(() => {
    const words: string[] = [];
    submissions.forEach(sub => {
      if (Array.isArray(sub.words)) {
        words.push(...sub.words);
      }
    });
    return words;
  }, [submissions]);

  // Process word frequency list
  const aggregatedWords: WordItem[] = useMemo(() => {
    return aggregateWords(allRawWords, hiddenWords);
  }, [allRawWords, hiddenWords]);

  // Set of students who have submitted
  const submittedStudentIds = useMemo(() => {
    return new Set(submissions.map(s => s.student_id));
  }, [submissions]);

  const submittedCount = submittedStudentIds.size;
  const progressPercent = totalStudents > 0 ? Math.round((submittedCount / totalStudents) * 100) : 0;

  // Trigger celebration confetti
  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // Ignore if confetti not supported
    }
  };

  // Close voting and reveal word cloud
  const handleCloseVoting = async () => {
    try {
      await updateDoc(doc(db, 'feedback_sessions', session.id), {
        is_closed: true,
        closed_at: new Date().toISOString()
      });
      setIsClosed(true);
      triggerCelebration();
      toast.success('Szavazás sikeresen lezárva! A szófelhő elkészült.');
    } catch (error) {
      console.error(error);
      toast.error('Hiba történt a szavazás lezárásakor');
    }
  };

  // Re-open voting if needed
  const handleReopenVoting = async () => {
    try {
      await updateDoc(doc(db, 'feedback_sessions', session.id), {
        is_closed: false
      });
      setIsClosed(false);
      toast.info('Szavazás újranyitva');
    } catch (error) {
      console.error(error);
      toast.error('Hiba a szavazás újranyitásakor');
    }
  };

  // Hide a word for moderation
  const handleHideWord = async (normalizedWord: string) => {
    const updated = [...hiddenWords, normalizedWord];
    setHiddenWords(updated);
    try {
      await updateDoc(doc(db, 'feedback_sessions', session.id), {
        hidden_words: updated
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Fullscreen toggle for projection
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full space-y-3.5 transition-all",
        isFullscreen ? "p-6 bg-slate-900 text-white min-h-screen overflow-y-auto" : ""
      )}
    >
      {/* Top Navigation & Status Bar */}
      <div className={cn(
        "flex items-center justify-between gap-3 flex-wrap p-3 rounded-2xl border",
        isFullscreen
          ? "bg-slate-800/90 border-slate-700"
          : "bg-white/95 border-slate-200/90 shadow-2xs"
      )}>
        <div className="flex items-center gap-2.5">
          <Button
            size="sm"
            variant="outline"
            onClick={onComplete}
            className={cn(
              "h-8 px-2.5 text-xs font-semibold rounded-xl flex items-center gap-1",
              isFullscreen ? "bg-slate-700 border-slate-600 text-white hover:bg-slate-600" : "bg-white border-slate-200 text-slate-700"
            )}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Vissza a lobbiba</span>
          </Button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-xs">
              <Cloud className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className={cn("text-sm sm:text-base font-extrabold leading-tight", isFullscreen ? "text-white" : "text-slate-800")}>
                  {session.lesson_info || session.title || 'Szófelhő Visszajelzés'}
                </h2>
                <span className={cn(
                  "text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border flex items-center gap-1",
                  isClosed
                    ? "bg-purple-50 text-purple-700 border-purple-200"
                    : "bg-emerald-50 text-emerald-700 border-emerald-200 animate-pulse"
                )}>
                  {isClosed ? <Lock className="w-2.5 h-2.5" /> : <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                  <span>{isClosed ? 'Lezárva' : 'Élő szavazás'}</span>
                </span>
              </div>
              <p className={cn("text-[11px]", isFullscreen ? "text-slate-400" : "text-slate-500")}>
                🏫 {session.class_name} • Max. {session.max_words_per_student || 1} szó/fő
              </p>
            </div>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2">
          {/* Quick Counter Pill */}
          <div className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border",
            isFullscreen
              ? "bg-slate-700/80 border-slate-600 text-slate-200"
              : "bg-sky-50/80 border-sky-200 text-sky-800"
          )}>
            <Users className="w-3.5 h-3.5" />
            <span>{submittedCount} / {totalStudents} diák</span>
            <span className="opacity-60 font-normal">({progressPercent}%)</span>
          </div>

          {/* Fullscreen Button */}
          <Button
            size="sm"
            variant="outline"
            onClick={toggleFullscreen}
            className={cn(
              "h-8 px-2.5 rounded-xl text-xs font-semibold flex items-center gap-1",
              isFullscreen ? "bg-slate-700 border-slate-600 text-white" : "bg-white border-slate-200 text-slate-700"
            )}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isFullscreen ? 'Kicsinyítés' : 'Kivetítő (Teljes képernyő)'}</span>
          </Button>
        </div>
      </div>

      {/* Big Question Banner */}
      <div className={cn(
        "p-4 sm:p-5 rounded-2xl border text-center transition-all shadow-xs",
        isFullscreen
          ? "bg-gradient-to-r from-slate-800 via-indigo-950 to-slate-800 border-slate-700 text-white"
          : "bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 border-blue-400 text-white shadow-md"
      )}>
        <p className="text-[11px] uppercase tracking-wider font-bold opacity-80 mb-1">
          Kérdés a diákoknak
        </p>
        <h1 className="text-lg sm:text-2xl font-black tracking-tight max-w-3xl mx-auto leading-snug">
          „{session.question || 'Mi volt a legjobb vagy legérdekesebb a mai órán?'}”
        </h1>
      </div>

      {/* Main Content Area: depends on whether voting is active and revealMode */}
      {!isClosed && session.reveal_mode === 'closed_only' ? (
        /* Hidden until closed: Show live voting progress & waiting cards */
        <div className={cn(
          "p-6 sm:p-8 rounded-2xl border text-center space-y-6",
          isFullscreen ? "bg-slate-800/80 border-slate-700" : "bg-white/95 border-slate-200/90 shadow-sm"
        )}>
          {/* Animated pulsing cloud */}
          <div className="relative inline-flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-sky-100/80 text-sky-600 flex items-center justify-center animate-pulse">
              <Cloud className="w-12 h-12" />
            </div>
            <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 text-white flex items-center justify-center text-xs font-black shadow-sm">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>

          <div className="space-y-1.5 max-w-md mx-auto">
            <h3 className={cn("text-lg font-black", isFullscreen ? "text-white" : "text-slate-800")}>
              A diákok válaszai érkeznek...
            </h3>
            <p className={cn("text-xs leading-relaxed", isFullscreen ? "text-slate-400" : "text-slate-500")}>
              A szavak rejtve maradnak a képernyőn, hogy a diákok saját gondolataikat írják le. A szavazás lezárásakor egyszerre jelenik meg a kész szófelhő!
            </p>
          </div>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className={isFullscreen ? "text-slate-300" : "text-slate-600"}>Részvételi arány</span>
              <span className="text-sky-500 font-extrabold">{submittedCount} / {totalStudents} diák ({progressPercent}%)</span>
            </div>
            <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600 transition-all duration-500 shadow-2xs"
                style={{ width: `${Math.max(5, progressPercent)}%` }}
              />
            </div>
          </div>

          {/* Action button: Close & Generate Word Cloud */}
          <div className="pt-2">
            <Button
              size="lg"
              onClick={handleCloseVoting}
              className="h-12 px-6 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700 text-white font-black text-sm shadow-lg hover:shadow-xl transition-all active:scale-[0.98] flex items-center gap-2.5 mx-auto"
            >
              <Lock className="w-4 h-4" />
              <span>Szavazás Lezárása & Szófelhő Generálása</span>
              <Sparkles className="w-4 h-4 text-amber-300" />
            </Button>
          </div>

          {/* Students Grid Checklist */}
          {studentsList.length > 0 && (
            <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
              <p className={cn("text-xs font-bold uppercase tracking-wider mb-3 text-left", isFullscreen ? "text-slate-400" : "text-slate-500")}>
                Osztálynévsor & Beküldési állapot ({submittedCount} kész)
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 text-left">
                {studentsList.map((st) => {
                  const hasDone = submittedStudentIds.has(st.id);
                  const subData = submissions.find(s => s.student_id === st.id);
                  const wordCount = subData?.words?.length || 0;

                  return (
                    <div
                      key={st.id}
                      className={cn(
                        "p-2 rounded-xl border text-xs flex items-center gap-2 transition-all",
                        hasDone
                          ? isFullscreen
                            ? "bg-emerald-950/40 border-emerald-600/60 text-emerald-200"
                            : "bg-emerald-50/80 border-emerald-300 text-emerald-900 shadow-2xs"
                          : isFullscreen
                          ? "bg-slate-800 border-slate-700 text-slate-500 opacity-60"
                          : "bg-slate-50 border-slate-200 text-slate-400 opacity-70"
                      )}
                    >
                      <span className="text-base shrink-0">{st.avatar_id || '🎒'}</span>
                      <div className="min-w-0 flex-1">
                        <p className="font-bold truncate text-[11px] leading-tight">{st.name}</p>
                        <p className="text-[10px] opacity-75">
                          {hasDone ? `${wordCount} szó rögzítve` : 'Még nem írt'}
                        </p>
                      </div>
                      {hasDone && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Real-time active OR Closed: Render the interactive Word Cloud! */
        <div className={cn(
          "p-4 sm:p-5 rounded-2xl border space-y-4",
          isFullscreen ? "bg-slate-800/80 border-slate-700" : "bg-white/95 border-slate-200/90 shadow-sm"
        )}>
          {/* Action bar above the cloud if still open in realtime mode */}
          {!isClosed && (
            <div className="flex items-center justify-between gap-3 p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 flex-wrap">
              <div className="flex items-center gap-2 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span>Valós idejű élő szófelhő nézet ({submittedCount} diák válaszolt eddig)</span>
              </div>
              <Button
                size="sm"
                onClick={handleCloseVoting}
                className="h-8 text-xs font-black bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl shadow-xs"
              >
                <Lock className="w-3.5 h-3.5 mr-1" />
                <span>Szavazás Lezárása</span>
              </Button>
            </div>
          )}

          {/* Interactive Word Cloud Display */}
          <WordCloudDisplay
            words={aggregatedWords}
            title={session.lesson_info || session.title}
            question={session.question}
            shape={currentShape}
            onShapeChange={handleShapeChange}
            isTeacher={true}
            onHideWord={handleHideWord}
          />

          {/* Post-closing Controls & Student summary */}
          {isClosed && (
            <div className="pt-2 flex items-center justify-between gap-2 flex-wrap border-t border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleReopenVoting}
                  className="h-8 text-xs font-semibold rounded-xl border-slate-200 text-slate-700 flex items-center gap-1"
                >
                  <Unlock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Szavazás újranyitása</span>
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={onComplete}
                  className="h-8 text-xs font-bold rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                  <span>Mentés & Vissza az Eredményekhez</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}


import React, { useEffect, useMemo, useState, useRef } from 'react';
import TaskCard from './TaskCard';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from '@/components/auth/AuthModal';
import { 
  saveCompetencySubmission, 
  createOrStartCompetencySubmission, 
  updateCompetencySubmissionProgress, 
  completeCompetencySubmission, 
  CompetencyTestSubmission 
} from '@/services/competencySubmissionService';
import { exportCompetencySubmissionToPDF, formatAnswer } from '@/utils/competencyPdfExport';
import { Download, CheckCircle, UserCheck, Lock, RotateCcw, Play, AlertTriangle } from 'lucide-react';

import { ALL_PRACTICE_TESTS } from './loader';

interface Task {
  id: string;
  contentArea: string;
  thinkingLevel: string;
  title: string;
  difficulty: number;
  scenario?: string;
  question: string;
  visual?: any;
  options?: string[];
  answer: any;
  keywords?: string[];
  solution: string;
}

interface ContentArea {
  id: string;
  name: string;
  color: string;
}

interface ThinkingLevel {
  id: string;
  name: string;
  short: string;
  color: string;
}

interface PracticeTestsProps {
  contentAreas: ContentArea[];
  thinkingLevels: ThinkingLevel[];
  isFullscreen?: boolean;
  toggleFullscreen?: () => void;
}

export default function PracticeTests({ contentAreas, thinkingLevels, isFullscreen = false, toggleFullscreen }: PracticeTestsProps) {
  const { user, profile } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const [tests] = useState(ALL_PRACTICE_TESTS);
  const [list] = useState(ALL_PRACTICE_TESTS.map(t => ({
    id: t.id,
    title: t.title,
    taskCount: t.tasks.length,
    breakdown: t.tasks.reduce((acc: any, task: any) => {
      acc[task.contentArea] = (acc[task.contentArea] || 0) + 1;
      return acc;
    }, {})
  })));
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [test, setTest] = useState<any>(null);
  const [cursor, setCursor] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: any }>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentSubmission, setCurrentSubmission] = useState<CompetencyTestSubmission | null>(null);
  const [savedDraft, setSavedDraft] = useState<any>(null);

  // Timer state
  const [timeLimit, setTimeLimit] = useState(45); // in minutes
  const [timeLeft, setTimeLeft] = useState(45 * 60); // in seconds
  const [timerRunning, setTimerRunning] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const startTimeRef = useRef<string>('');
  const submissionDocIdRef = useRef<string>('');

  const getDraftKey = (testId: string) => `competency_draft_${user?.uid || 'guest'}_${testId}`;

  // Helper for answer correctness
  const isAnswerCorrect = (userAns: any, correctAns: any): boolean => {
    if (userAns === undefined || userAns === null || userAns === '') return false;
    if (typeof correctAns === 'object' && correctAns !== null) {
      if (typeof userAns === 'object' && userAns !== null) {
        return JSON.stringify(userAns) === JSON.stringify(correctAns);
      }
      return String(userAns).trim() === JSON.stringify(correctAns).trim() ||
             formatAnswer(userAns).trim() === formatAnswer(correctAns).trim();
    }
    return String(userAns).trim().toLowerCase() === String(correctAns).trim().toLowerCase();
  };

  // Check draft when selecting test or user changes
  useEffect(() => {
    if (!selectedId) { 
      setTest(null); 
      setSavedDraft(null);
      return; 
    }
    setCursor(0);
    setAnswers({});
    setSubmitted(false);
    setIsStarted(false);
    setTimerRunning(false);
    setCurrentSubmission(null);
    submissionDocIdRef.current = '';

    const found = tests.find(t => t.id === selectedId);
    setTest(found || null);

    // Check localStorage draft
    try {
      const raw = localStorage.getItem(getDraftKey(selectedId));
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && !parsed.submitted && Object.keys(parsed.answers || {}).length > 0) {
          setSavedDraft(parsed);
        } else {
          setSavedDraft(null);
        }
      } else {
        setSavedDraft(null);
      }
    } catch {
      setSavedDraft(null);
    }
  }, [selectedId, tests, user]);

  // Handle BeforeUnload when test is running
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isStarted && !submitted && test) {
        // Save to localStorage immediately
        const draftData = {
          answers,
          timeLeft,
          timeLimit,
          cursor,
          startedAt: startTimeRef.current,
          submissionDocId: submissionDocIdRef.current,
          lastSavedAt: new Date().toISOString()
        };
        localStorage.setItem(getDraftKey(test.id), JSON.stringify(draftData));
        e.preventDefault();
        e.returnValue = 'A próbamérés még folyamatban van! Biztosan elhagyod az oldalt?';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isStarted, submitted, test, answers, timeLeft, timeLimit, cursor]);

  const handleStartTest = async () => {
    if (!user) {
      toast.info("A mérés elindításához kérlek jelentkezz be, hogy elmentsük az eredményeidet!");
      setIsAuthModalOpen(true);
      return;
    }
    const now = new Date().toISOString();
    startTimeRef.current = now;
    setAnswers({});
    setCursor(0);
    setTimeLeft(timeLimit * 60);
    setSubmitted(false);
    setIsStarted(true);
    setTimerRunning(true);
    setSavedDraft(null);

    // Pre-create in-progress Firestore record
    const studentName = profile?.full_name || user?.displayName || (user?.email ? user.email.split('@')[0] : 'Diák');
    const initialPayload: any = {
      userId: user.uid,
      studentName,
      studentEmail: user.email || '',
      testId: test.id,
      testTitle: test.title,
      startedAt: now,
      status: 'in_progress',
      durationSeconds: 0,
      timeLimitMinutes: timeLimit,
      score: 0,
      answeredCount: 0,
      totalTasks: test.tasks.length,
      percentage: 0,
      breakdownByArea: {
        M: { total: 0, correct: 0 },
        H: { total: 0, correct: 0 },
        A: { total: 0, correct: 0 },
        S: { total: 0, correct: 0 }
      },
      breakdownByLevel: {
        T: { total: 0, correct: 0 },
        A: { total: 0, correct: 0 },
        K: { total: 0, correct: 0 }
      },
      answers: {}
    };

    try {
      const docId = await createOrStartCompetencySubmission(initialPayload);
      submissionDocIdRef.current = docId;

      // Save initial draft
      localStorage.setItem(getDraftKey(test.id), JSON.stringify({
        answers: {},
        timeLeft: timeLimit * 60,
        timeLimit,
        cursor: 0,
        startedAt: now,
        submissionDocId: docId,
        lastSavedAt: now
      }));
    } catch (err) {
      console.error("Error creating initial in-progress submission:", err);
    }
  };

  const handleResumeDraft = () => {
    if (!savedDraft) return;
    setAnswers(savedDraft.answers || {});
    setTimeLeft(savedDraft.timeLeft || timeLimit * 60);
    setTimeLimit(savedDraft.timeLimit || 45);
    setCursor(savedDraft.cursor || 0);
    startTimeRef.current = savedDraft.startedAt || new Date().toISOString();
    submissionDocIdRef.current = savedDraft.submissionDocId || '';
    setIsStarted(true);
    setTimerRunning(true);
    toast.success("Munkamenet sikeresen visszaállítva! Folytathatod a kitöltést. 🚀");
  };

  const handleDiscardDraft = () => {
    if (test) {
      localStorage.removeItem(getDraftKey(test.id));
    }
    setSavedDraft(null);
    setAnswers({});
    submissionDocIdRef.current = '';
    toast.info("Piszkozat törölve. Új mérést indíthatsz.");
  };

  // Real-time answer handler
  const onAnswer = (taskId: string, val: any) => {
    const nextAnswers = { ...answers, [taskId]: val };
    setAnswers(nextAnswers);

    if (!test) return;

    // Calculate current stats
    const totalTasks = test.tasks.length;
    let correctCount = 0;
    const areaStats: any = {
      M: { total: 0, correct: 0 },
      H: { total: 0, correct: 0 },
      A: { total: 0, correct: 0 },
      S: { total: 0, correct: 0 }
    };
    const levelStats: any = {
      T: { total: 0, correct: 0 },
      A: { total: 0, correct: 0 },
      K: { total: 0, correct: 0 }
    };
    const answersMap: any = {};

    test.tasks.forEach((t: any) => {
      const userAns = nextAnswers[t.id];
      const answered = userAns !== undefined && userAns !== null && userAns !== '';
      const isCorrect = isAnswerCorrect(userAns, t.answer);

      if (areaStats[t.contentArea]) {
        areaStats[t.contentArea].total++;
        if (isCorrect) areaStats[t.contentArea].correct++;
      }
      if (levelStats[t.thinkingLevel]) {
        levelStats[t.thinkingLevel].total++;
        if (isCorrect) levelStats[t.thinkingLevel].correct++;
      }

      if (answered) {
        if (isCorrect) correctCount++;
        answersMap[t.id] = {
          taskId: t.id,
          title: t.title,
          contentArea: t.contentArea,
          thinkingLevel: t.thinkingLevel,
          question: t.question,
          selectedAnswer: formatAnswer(userAns),
          correctAnswer: formatAnswer(t.answer),
          isCorrect,
          solution: t.solution || '',
          difficulty: t.difficulty,
          options: t.options || []
        };
      }
    });

    const answeredCount = Object.keys(answersMap).length;
    const percentage = Math.round((correctCount / totalTasks) * 100);
    const durationSeconds = (timeLimit * 60) - timeLeft;

    // Save to localStorage
    const draftData = {
      answers: nextAnswers,
      timeLeft,
      timeLimit,
      cursor,
      startedAt: startTimeRef.current,
      submissionDocId: submissionDocIdRef.current,
      lastSavedAt: new Date().toISOString()
    };
    localStorage.setItem(getDraftKey(test.id), JSON.stringify(draftData));

    // Update Firestore in-progress record
    const updatePayload = {
      answers: answersMap,
      score: correctCount,
      answeredCount,
      percentage,
      durationSeconds: Math.max(1, durationSeconds),
      breakdownByArea: areaStats,
      breakdownByLevel: levelStats
    };

    if (submissionDocIdRef.current) {
      updateCompetencySubmissionProgress(submissionDocIdRef.current, updatePayload);
    } else {
      const studentName = profile?.full_name || user?.displayName || (user?.email ? user.email.split('@')[0] : 'Diák');
      createOrStartCompetencySubmission({
        userId: user?.uid || '',
        studentName,
        studentEmail: user?.email || '',
        testId: test.id,
        testTitle: test.title,
        startedAt: startTimeRef.current || new Date().toISOString(),
        status: 'in_progress',
        durationSeconds: Math.max(1, durationSeconds),
        timeLimitMinutes: timeLimit,
        score: correctCount,
        answeredCount,
        totalTasks,
        percentage,
        breakdownByArea: areaStats,
        breakdownByLevel: levelStats,
        answers: answersMap
      }).then(id => {
        submissionDocIdRef.current = id;
      }).catch(err => console.error("Error auto-creating in-progress submission onAnswer:", err));
    }
  };

  const handleSubmitTest = async () => {
    if (!test || submitted) return;
    setSubmitted(true);
    setTimerRunning(false);

    const totalTasks = test.tasks.length;
    let correctCount = 0;
    const durationSeconds = (timeLimit * 60) - timeLeft;

    const areaStats: any = {
      M: { total: 0, correct: 0 },
      H: { total: 0, correct: 0 },
      A: { total: 0, correct: 0 },
      S: { total: 0, correct: 0 }
    };
    const levelStats: any = {
      T: { total: 0, correct: 0 },
      A: { total: 0, correct: 0 },
      K: { total: 0, correct: 0 }
    };
    const answersMap: any = {};

    test.tasks.forEach((t: any) => {
      const userAns = answers[t.id];
      const isCorrect = isAnswerCorrect(userAns, t.answer);
      if (isCorrect) correctCount++;

      if (areaStats[t.contentArea]) {
        areaStats[t.contentArea].total++;
        if (isCorrect) areaStats[t.contentArea].correct++;
      }
      if (levelStats[t.thinkingLevel]) {
        levelStats[t.thinkingLevel].total++;
        if (isCorrect) levelStats[t.thinkingLevel].correct++;
      }

      answersMap[t.id] = {
        taskId: t.id,
        title: t.title,
        contentArea: t.contentArea,
        thinkingLevel: t.thinkingLevel,
        question: t.question,
        selectedAnswer: formatAnswer(userAns),
        correctAnswer: formatAnswer(t.answer),
        isCorrect,
        solution: t.solution || '',
        difficulty: t.difficulty,
        options: t.options || []
      };
    });

    const studentName = profile?.full_name || user?.displayName || (user?.email ? user.email.split('@')[0] : 'Diák');
    const percentage = Math.round((correctCount / totalTasks) * 100);

    const submissionPayload: CompetencyTestSubmission = {
      userId: user?.uid || 'anonymous',
      studentName,
      studentEmail: user?.email || '',
      testId: test.id,
      testTitle: test.title,
      startedAt: startTimeRef.current || new Date().toISOString(),
      completedAt: new Date().toISOString(),
      status: 'completed',
      durationSeconds: Math.max(1, durationSeconds),
      timeLimitMinutes: timeLimit,
      score: correctCount,
      answeredCount: Object.keys(answers).length,
      totalTasks,
      percentage,
      breakdownByArea: areaStats,
      breakdownByLevel: levelStats,
      answers: answersMap
    };

    setCurrentSubmission(submissionPayload);

    // Clear local draft upon completion
    localStorage.removeItem(getDraftKey(test.id));
    setSavedDraft(null);

    if (user) {
      setIsSaving(true);
      try {
        if (submissionDocIdRef.current) {
          await completeCompetencySubmission(submissionDocIdRef.current, submissionPayload);
        } else {
          await saveCompetencySubmission(submissionPayload);
        }
        toast.success("Az eredményed sikeresen rögzítve lett a tanárod számára! 🎉");
      } catch (err) {
        console.error("Error saving submission:", err);
        toast.error("Nem sikerült elmenteni az eredményt a felhőbe.");
      } finally {
        setIsSaving(false);
      }
    }
  };

  // Countdown timer effect
  useEffect(() => {
    if (!timerRunning || timeLeft <= 0 || submitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setTimerRunning(false);
          toast.warning("Lejárt az időd! A teszt automatikusan kiértékelésre került. ⏱️");
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timerRunning, timeLeft, submitted, test, answers]);


  // Test list view
  if (!selectedId) {
    return (
      <div>
        <div className="main-header">
          <div>
            <h2>Próbamérések</h2>
            <div className="meta">
              Válassz egy próbamérést a felkészülésed teszteléséhez. Minden teszt a mátrix celláin alapuló egyenletes feladatválogatás.
            </div>
          </div>
        </div>
        <div className="probameres-grid">
          {list.map((t) => (
            <button key={t.id} className="probameres-card" onClick={() => setSelectedId(t.id)}>
              <div className="pm-num">{t.id}</div>
              <div className="pm-title">{t.title}</div>
              <div className="pm-count">{t.taskCount} feladat</div>
              <div className="pm-breakdown">
                {Object.entries(t.breakdown || {}).sort().map(([k, v]) => (
                  <span key={k} className={`pm-tag tag-${k.split('-')[0]}`}>{k}: {v}</span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (test === null) return <div className="empty-state">Feladatok betöltése…</div>;

  // Start Screen for the selected test
  if (!isStarted) {
    return (
      <div style={{ maxWidth: 620, margin: '40px auto' }}>
        <div style={{ background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 32, boxShadow: 'var(--shadow)', textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⏱️</div>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, color: 'var(--text)' }}>{test.title} indítása</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 20 }}>
            Ez a próbamérés <strong>{test.tasks.length} feladatot</strong> tartalmaz, amelyek a kompetenciamátrix összes témaköréből egyenletesen lettek kiválasztva.
          </p>

          {/* User Auth Status Box */}
          <div style={{
            background: user ? '#f0fdf4' : '#fef2f2',
            border: `1px solid ${user ? '#bbf7d0' : '#fecaca'}`,
            borderRadius: 10,
            padding: '12px 16px',
            marginBottom: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            textAlign: 'left'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {user ? (
                <UserCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              ) : (
                <Lock className="w-5 h-5 text-red-500 flex-shrink-0" />
              )}
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: user ? '#15803d' : '#991b1b' }}>
                  {user ? `Bejelentkezve: ${profile?.full_name || user.displayName || user.email}` : 'Bejelentkezés szükséges a mentéshez'}
                </div>
                <div style={{ fontSize: 11, color: user ? '#166534' : '#b91c1c' }}>
                  {user ? 'A kitöltött mérésed és válaszaid automatikusan el lesznek küldve a tanárodnak.' : 'A teszt elindítása előtt kérlek jelentkezz be, hogy tanárod megkapja az eredményedet!'}
                </div>
              </div>
            </div>

            {!user && (
              <button 
                className="btn btn-primary"
                onClick={() => setIsAuthModalOpen(true)}
                style={{ padding: '6px 14px', fontSize: 12, flexShrink: 0 }}
              >
                Belépés
              </button>
            )}
          </div>

          {/* Saved Draft Recovery Card */}
          {savedDraft && (
            <div style={{
              background: '#fffbeb',
              border: '1.5px solid #fde68a',
              borderRadius: 12,
              padding: '16px 20px',
              marginBottom: 24,
              textAlign: 'left',
              boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#b45309', fontWeight: 800, fontSize: 14, marginBottom: 6 }}>
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <span>Megkezdett mérés található ebből a tesztből!</span>
              </div>
              <div style={{ fontSize: 12, color: '#92400e', marginBottom: 14, lineHeight: 1.5 }}>
                Korábban elindítottad ezt a mérést. Megválaszoltál <strong>{Object.keys(savedDraft.answers || {}).length} / {test.tasks.length} feladatot</strong>, és a hátralévő időd <strong>{Math.floor(savedDraft.timeLeft / 60)} perc {savedDraft.timeLeft % 60} mp</strong> volt.
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button
                  className="btn btn-primary"
                  onClick={handleResumeDraft}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', fontSize: 13, background: '#d97706' }}
                >
                  <Play className="w-4 h-4" />
                  <span>Folytatás onnan, ahol abbahagytad →</span>
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={handleDiscardDraft}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', fontSize: 13 }}
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Újrakezdés</span>
                </button>
              </div>
            </div>
          )}
          
          <div style={{ marginBottom: 32 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Válassz időkorlátot:
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
              {[30, 45, 60, 90, 120].map((mins) => (
                <button
                  key={mins}
                  onClick={() => {
                    setTimeLimit(mins);
                    setTimeLeft(mins * 60);
                  }}
                  className={`btn ${timeLimit === mins ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '10px 16px', fontSize: 13 }}
                >
                  {mins === 30 ? 'Fél óra (30p)' : mins === 60 ? '1 óra (60p)' : mins === 120 ? '2 óra (120p)' : `${mins} perc`}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button className="btn btn-secondary" onClick={() => setSelectedId(null)} style={{ padding: '12px 24px' }}>
              Mégse
            </button>
            <button 
              className="btn btn-primary" 
              onClick={handleStartTest}
              style={{ padding: '12px 32px', fontSize: 15, fontWeight: 600 }}
            >
              Mérés indítása →
            </button>
          </div>
        </div>

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />
      </div>
    );
  }

  const total = test.tasks.length;
  const task = test.tasks[cursor];
  const done = Object.keys(answers).length;
  const score = test.tasks.reduce((sum: number, t: any) => {
    const a = answers[t.id];
    if (a === undefined) return sum;
    return sum + (a === t.answer ? 1 : 0);
  }, 0);

  return (
    <div className="single-task-container">
      <div className="main-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h2>{test.title}</h2>
          <div className="meta" style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <span>{cursor + 1}. / {total} feladat — megválaszolt: {done} / {total}</span>
            {submitted && (
              <>
                &nbsp;·&nbsp; 
                <strong style={{ color: '#16a34a', fontSize: 15 }}>
                  Eredmény: {score} / {total} pont ({Math.round((score / total) * 100)}%)
                </strong>
              </>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          {/* PDF export button when submitted */}
          {submitted && currentSubmission && (
            <button
              className="btn btn-primary"
              onClick={() => exportCompetencySubmissionToPDF(currentSubmission)}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: '#16a34a' }}
              title="Kiértékelt feladatlap letöltése PDF-ben"
            >
              <Download className="w-4 h-4" />
              <span>Feladatlapom PDF</span>
            </button>
          )}

          {/* Timer Display */}
          {!submitted && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 16px',
              background: timeLeft < 300 ? '#fee2e2' : 'var(--bg-elev)',
              border: '1px solid',
              borderColor: timeLeft < 300 ? '#fca5a5' : 'var(--border)',
              borderRadius: '8px',
              color: timeLeft < 300 ? '#991b1b' : 'var(--text)',
              fontWeight: '700',
              fontSize: '15px',
              boxShadow: 'var(--shadow)',
              fontFamily: 'monospace'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: timeLeft < 300 ? 'pulse 1s infinite' : 'none' }}><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              <span>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
            </div>
          )}

          <button className="btn btn-secondary" onClick={() => { setSelectedId(null); setIsStarted(false); setTimerRunning(false); }}>
            ← Kilépés
          </button>
        </div>
      </div>

      {submitted && (
        <div style={{
          background: '#f0fdf4',
          border: '1px solid #86efac',
          borderRadius: 10,
          padding: '12px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <span style={{ fontSize: 13, fontWeight: 700, color: '#166534' }}>
              A próbamérés kiértékelve és az eredményeid rögzítve lettek a tanárod számára!
            </span>
          </div>

          {currentSubmission && (
            <button
              className="btn btn-secondary"
              onClick={() => exportCompetencySubmissionToPDF(currentSubmission)}
              style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, padding: '6px 12px', background: '#fff' }}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Letöltés PDF-ben</span>
            </button>
          )}
        </div>
      )}

      <div className="probameres-progress">
        {test.tasks.map((t: any, i: number) => {
          const answered = answers[t.id] !== undefined;
          const correct = submitted && answered && answers[t.id] === t.answer;
          const wrong = submitted && answered && answers[t.id] !== t.answer;
          const cls = ['dot', i === cursor ? 'current' : '', answered && !submitted ? 'answered' : '', correct ? 'correct' : '', wrong ? 'wrong' : ''].filter(Boolean).join(' ');
          return (
            <button key={t.id} className={cls} onClick={() => setCursor(i)} title={`${i + 1}. feladat`}>
              {i + 1}
            </button>
          );
        })}
      </div>

      <TestTaskCard
        task={task}
        contentAreas={contentAreas}
        thinkingLevels={thinkingLevels}
        selectedAnswer={answers[task.id]}
        onAnswer={(val) => onAnswer(task.id, val)}
        submitted={submitted}
      />

      <div className="action-row" style={{ marginTop: 20, justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <button 
          className="btn btn-secondary" 
          onClick={() => { setSelectedId(null); setIsStarted(false); setTimerRunning(false); }}
          style={{ padding: '10px 20px' }}
        >
          ← Kilépés a tesztből
        </button>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {toggleFullscreen && (
            <button
              className="btn btn-secondary"
              onClick={toggleFullscreen}
              style={{ display: 'flex', alignItems: 'center', gap: 6 }}
              title="Teljes képernyős mód"
            >
              {isFullscreen ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14h6v6m10-6h-6v6M4 10h6V4m10 6h-6V4"/></svg>
                  <span>Kilépés</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
                  <span>Teljes képernyő</span>
                </>
              )}
            </button>
          )}

          <button className="btn btn-secondary" disabled={cursor === 0} onClick={() => setCursor((c) => c - 1)}>
            ← Előző
          </button>
          
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-muted)', padding: '0 8px' }}>
            {cursor + 1} / {total}
          </span>

          {!submitted && cursor < total - 1 && (
            <button className="btn btn-primary" onClick={() => setCursor((c) => c + 1)}>
              Következő →
            </button>
          )}
          {!submitted && cursor === total - 1 && (
            <button className="btn btn-primary" disabled={isSaving} onClick={handleSubmitTest}>
              {isSaving ? 'Mentés...' : 'Beadom a tesztet'}
            </button>
          )}
          {submitted && cursor < total - 1 && (
            <button className="btn btn-primary" onClick={() => setCursor((c) => c + 1)}>
              Következő →
            </button>
          )}
          {submitted && cursor === total - 1 && (
            <button className="btn btn-secondary" onClick={() => { setSelectedId(null); setIsStarted(false); setTimerRunning(false); }}>
              Befejezés
            </button>
          )}
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}

// Test-mode task card: answer selection stored externally, feedback only after submit
function TestTaskCard({ task, contentAreas, thinkingLevels, selectedAnswer, onAnswer, submitted }: {
  task: Task;
  contentAreas: ContentArea[];
  thinkingLevels: ThinkingLevel[];
  selectedAnswer: any;
  onAnswer: (val: any) => void;
  submitted: boolean;
}) {
  // Reuse TaskCard visually, but we need a controlled version. For simplicity,
  // we embed only the parts relevant to test mode: question, visual, options.
  // After submit, show correct/wrong + solution.
  if (!task) return null;
  return (
    <TaskCardControlled
      task={task}
      contentAreas={contentAreas}
      thinkingLevels={thinkingLevels}
      selectedAnswer={selectedAnswer}
      onAnswer={onAnswer}
      submitted={submitted}
    />
  );
}

// Controlled variant of TaskCard for test mode.
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import Visual from './visuals/Visual';
import ErrorBoundary from './ErrorBoundary';

const MD_PLUGINS = { remarkPlugins: [remarkGfm, remarkMath], rehypePlugins: [rehypeKatex] };

function TaskCardControlled({ task, contentAreas, thinkingLevels, selectedAnswer, onAnswer, submitted }: {
  task: Task;
  contentAreas: ContentArea[];
  thinkingLevels: ThinkingLevel[];
  selectedAnswer: any;
  onAnswer: (val: any) => void;
  submitted: boolean;
}) {
  const contentInfo = contentAreas.find((c) => c.id === task.contentArea);
  const thinkingInfo = thinkingLevels.find((l) => l.id === task.thinkingLevel);
  const hasOptions = Array.isArray(task.options) && task.options.length > 0;
  const isCorrect = hasOptions 
    ? selectedAnswer === task.answer 
    : typeof task.answer === 'string'
      ? (typeof selectedAnswer === 'string' && selectedAnswer.trim().toLowerCase() === task.answer.toLowerCase())
      : formatAnswer(selectedAnswer).trim() === formatAnswer(task.answer).trim();
  const hasLeftContent = !!task.scenario || !!task.visual;

  return (
    <article className="task-card">
      <header className="head">
        <span className="id">{task.id}</span>
        <span className="title">{task.title}</span>
        <span className={`pill ${task.contentArea}`}>{contentInfo?.name}</span>
        <span className={`pill level-${task.thinkingLevel}`}>{thinkingInfo?.short}</span>
        <span className="difficulty" title={`Nehézség: ${task.difficulty}/7`}>
          {Array.from({ length: 7 }).map((_, i) => (
            <span key={i} className={`star ${i < task.difficulty ? 'on' : ''}`} />
          ))}
        </span>
      </header>

      <div className={`body ${hasLeftContent ? 'task-body-grid' : 'task-body-single'}`}>
        {hasLeftContent && (
          <div className="task-left-column">
            {task.scenario && (
              <div className="scenario">
                <ReactMarkdown {...MD_PLUGINS}>{task.scenario}</ReactMarkdown>
              </div>
            )}

            {task.visual && (
              <div className="visual-wrap">
                <ErrorBoundary>
                  <Visual spec={task.visual} />
                </ErrorBoundary>
              </div>
            )}
          </div>
        )}

        <div className="task-right-column">
          <div className="question">
            <ReactMarkdown {...MD_PLUGINS}>{task.question}</ReactMarkdown>
          </div>

          {hasOptions ? (
            <div className="options">
              {task.options.map((opt, idx) => {
                let cls = 'option-btn';
                if (submitted) {
                  if (opt === task.answer) cls += ' correct';
                  else if (opt === selectedAnswer) cls += ' incorrect';
                } else if (opt === selectedAnswer) {
                  cls += ' selected';
                }
                return (
                  <button key={`${idx}-${opt}`} className={cls} disabled={submitted} onClick={() => onAnswer(opt)}>
                    {opt}
                  </button>
                );
              })}
            </div>
          ) : (
            <input
              className="answer-input"
              value={selectedAnswer || ''}
              onChange={(e) => onAnswer(e.target.value)}
              placeholder="Írd be a válaszod..."
              disabled={submitted}
            />
          )}

          {submitted && (
            <div className={`feedback ${isCorrect ? 'ok' : 'bad'}`}>
              {isCorrect ? '✓ Helyes válasz' : `✗ Helyes válasz: ${formatAnswer(task.answer)}`}
            </div>
          )}

          {submitted && task.solution && (
            <div className="solution">
              <h3>Megoldás</h3>
              <div className="solution-body">
                <ReactMarkdown {...MD_PLUGINS}>{task.solution}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

import React, { useEffect, useMemo, useState } from 'react';
import TaskCard from './TaskCard';
import { toast } from 'sonner';

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
  answer: string;
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
  const [tests] = useState(ALL_PRACTICE_TESTS);
  const [list] = useState(ALL_PRACTICE_TESTS.map(t => ({
    id: t.id,
    title: t.title,
    taskCount: t.tasks.length,
    breakdown: t.tasks.reduce((acc, task) => {
      acc[task.contentArea] = (acc[task.contentArea] || 0) + 1;
      return acc;
    }, {})
  })));
  const [selectedId, setSelectedId] = useState(null);
  const [test, setTest] = useState(null);
  const [cursor, setCursor] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // New state variables for the timer
  const [timeLimit, setTimeLimit] = useState(45); // in minutes
  const [timeLeft, setTimeLeft] = useState(45 * 60); // in seconds
  const [timerRunning, setTimerRunning] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    if (!selectedId) { setTest(null); return; }
    setCursor(0);
    setAnswers({});
    setSubmitted(false);
    setIsStarted(false);
    setTimerRunning(false);
    const found = tests.find(t => t.id === selectedId);
    setTest(found || null);
  }, [selectedId, tests]);

  // Countdown timer effect
  useEffect(() => {
    if (!timerRunning || timeLeft <= 0 || submitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setTimerRunning(false);
          setSubmitted(true);
          toast.warning("Lejárt az időd! A teszt automatikusan kiértékelésre került. ⏱️");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timerRunning, timeLeft, submitted]);


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
      <div style={{ maxWidth: 600, margin: '40px auto' }}>
        <div style={{ background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 32, boxShadow: 'var(--shadow)', textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⏱️</div>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, color: 'var(--text)' }}>{test.title} indítása</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 24 }}>
            Ez a próbamérés <strong>{test.tasks.length} feladatot</strong> tartalmaz, amelyek a kompetenciamátrix összes témaköréből egyenletesen lettek kiválasztva.
          </p>
          
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
              onClick={() => {
                setIsStarted(true);
                setTimerRunning(true);
              }}
              style={{ padding: '12px 32px', fontSize: 15, fontWeight: 600 }}
            >
              Mérés indítása →
            </button>
          </div>
        </div>
      </div>
    );
  }

  const total = test.tasks.length;
  const task = test.tasks[cursor];
  const done = Object.keys(answers).length;
  const score = test.tasks.reduce((sum, t) => {
    const a = answers[t.id];
    if (a === undefined) return sum;
    return sum + (a === t.answer ? 1 : 0);
  }, 0);

  const onAnswer = (taskId, val) => {
    setAnswers((prev) => ({ ...prev, [taskId]: val }));
  };

  return (
    <div className="single-task-container">
      <div className="main-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h2>{test.title}</h2>
          <div className="meta" style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <span>{cursor + 1}. / {total} feladat — megválaszolt: {done} / {total}</span>
            {submitted && <> &nbsp;·&nbsp; <strong style={{ color: '#16a34a' }}>Eredmény: {score} / {total}</strong></>}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
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

      <div className="probameres-progress">
        {test.tasks.map((t, i) => {
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
            <button className="btn btn-primary" onClick={() => { setSubmitted(true); setTimerRunning(false); }}>
              Beadom a tesztet
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
  const isCorrect = hasOptions && selectedAnswer === task.answer;
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
              {isCorrect ? '✓ Helyes válasz' : `✗ Helyes válasz: ${task.answer}`}
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

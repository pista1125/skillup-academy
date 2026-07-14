import React, { useEffect, useMemo, useState } from 'react';
import TaskCard from './TaskCard';

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
}

export default function PracticeTests({ contentAreas, thinkingLevels }: PracticeTestsProps) {
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

  useEffect(() => {
    if (!selectedId) { setTest(null); return; }
    setCursor(0);
    setAnswers({});
    setSubmitted(false);
    const found = PRACTICE_TESTS.find(t => t.id === selectedId);
    setTest(found || null);
  }, [selectedId]);


  // Test list view
  if (!selectedId) {
    return (
      <div>
        <div className="main-header">
          <div>
            <h2>Próbamérések</h2>
            <div className="meta">
              Válassz egy 20-feladatos próbamérést. Minden teszt a mátrix 12 cellájának vegyes válogatása.
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
    <div>
      <div className="main-header">
        <div>
          <h2>{test.title}</h2>
          <div className="meta">
            {cursor + 1}. / {total} feladat — megválaszolt: {done} / {total}
            {submitted && <> &nbsp;·&nbsp; <strong style={{ color: '#16a34a' }}>Eredmény: {score} / {total}</strong></>}
          </div>
        </div>
        <button className="btn btn-secondary" onClick={() => setSelectedId(null)}>
          ← Vissza a próbamérésekhez
        </button>
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

      <div className="action-row" style={{ marginTop: 20, justifyContent: 'space-between' }}>
        <button className="btn btn-secondary" disabled={cursor === 0} onClick={() => setCursor((c) => c - 1)}>
          ← Előző
        </button>
        {!submitted && cursor < total - 1 && (
          <button className="btn btn-primary" onClick={() => setCursor((c) => c + 1)}>
            Következő →
          </button>
        )}
        {!submitted && cursor === total - 1 && (
          <button className="btn btn-primary" onClick={() => setSubmitted(true)}>
            Beadom a tesztet
          </button>
        )}
        {submitted && cursor < total - 1 && (
          <button className="btn btn-primary" onClick={() => setCursor((c) => c + 1)}>
            Következő →
          </button>
        )}
        {submitted && cursor === total - 1 && (
          <button className="btn btn-secondary" onClick={() => { setSelectedId(null); }}>
            Befejezés
          </button>
        )}
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

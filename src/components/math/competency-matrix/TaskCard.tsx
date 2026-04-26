import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import Visual from './visuals/Visual';
import ErrorBoundary from './ErrorBoundary';

const MD_PLUGINS = { remarkPlugins: [remarkGfm, remarkMath], rehypePlugins: [rehypeKatex] };

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

interface TaskCardProps {
  task: Task;
  contentAreas: ContentArea[];
  thinkingLevels: ThinkingLevel[];
}

export default function TaskCard({ task, contentAreas, thinkingLevels }: TaskCardProps) {
  const [selected, setSelected] = useState(null);
  const [checked, setChecked] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [showSolution, setShowSolution] = useState(false);

  const contentInfo = contentAreas.find((c) => c.id === task.contentArea);
  const thinkingInfo = thinkingLevels.find((l) => l.id === task.thinkingLevel);

  const hasOptions = Array.isArray(task.options) && task.options.length > 0;
  const isCorrect = hasOptions
    ? selected === task.answer
    : typeof task.answer === 'string'
      ? inputVal.trim().toLowerCase() === task.answer.toLowerCase()
      : false;

  const handleCheck = () => {
    setChecked(true);
    if (isCorrect) setShowSolution(true);
  };
  const handleReveal = () => {
    setShowSolution(true);
    if (hasOptions) setSelected(task.answer);
    setChecked(true);
  };
  const handleReset = () => {
    setSelected(null);
    setInputVal('');
    setChecked(false);
    setShowSolution(false);
  };

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

      <div className="body">
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

        <div className="question">
          <ReactMarkdown {...MD_PLUGINS}>{task.question}</ReactMarkdown>
        </div>

        {hasOptions ? (
          <div className="options">
            {task.options.map((opt, idx) => {
              let cls = 'option-btn';
              if (checked && selected === opt) cls += isCorrect ? ' correct' : ' incorrect';
              else if (showSolution && opt === task.answer) cls += ' reveal';
              else if (selected === opt) cls += ' selected';
              return (
                <button key={`${idx}-${opt}`} className={cls} disabled={checked && isCorrect} onClick={() => !checked && setSelected(opt)}>
                  {opt}
                </button>
              );
            })}
          </div>
        ) : typeof task.answer === 'string' ? (
          <input
            className="answer-input"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Írd be a válaszod..."
            disabled={checked && isCorrect}
          />
        ) : (
          <div style={{ fontSize: 13, color: '#64748b' }}>
            Nyitott feladat — nézd meg a megoldást.
          </div>
        )}

        <div className="action-row">
          {(hasOptions || typeof task.answer === 'string') && (
            <button className="btn btn-primary" onClick={handleCheck} disabled={hasOptions ? !selected : !inputVal.trim()}>
              Ellenőrzés
            </button>
          )}
          <button className="btn btn-secondary" onClick={handleReveal}>
            {showSolution ? 'Megoldás látható' : 'Megoldás mutatása'}
          </button>
          <button className="btn btn-ghost" onClick={handleReset}>Újra</button>

          {checked && !isCorrect && (
            <span className="feedback bad">✗ Nem ez a jó megoldás — próbáld újra, vagy nézd meg!</span>
          )}
          {checked && isCorrect && (
            <span className="feedback ok">✓ Szuper, helyes válasz!</span>
          )}
        </div>

        {task.keywords && task.keywords.length > 0 && (
          <div className="keywords">
            {task.keywords.map((k) => <span key={k} className="keyword">#{k}</span>)}
          </div>
        )}
      </div>

      {showSolution && (
        <div className="solution">
          <h3>Megoldás lépésről lépésre</h3>
          <div className="solution-body">
            <ReactMarkdown {...MD_PLUGINS}>{task.solution}</ReactMarkdown>
          </div>
        </div>
      )}
    </article>
  );
}

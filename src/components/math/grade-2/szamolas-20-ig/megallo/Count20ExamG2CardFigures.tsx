import React from 'react';
import { FONT, INK, UNK } from './Count20ExamG2Parts';

// ---------------------------------------------------------------------------
// Kis kártyaképek a Párosító (150 × 80) és a Csoportosító (80 × 80) játékhoz.
// Vastag vonalak (>= 3), nagy számok (>= 22), sosem árulja el a választ.
// ---------------------------------------------------------------------------

/** Tízesrudak és egyeskockák 0–20 között (Matcher 150×80 vagy Sorter 80×80). */
export const Blocks20Card: React.FC<{ t: number; e: number; small?: boolean }> = ({ t, e, small }) => {
  const W = small ? 80 : 150;
  const cell = small ? 5.8 : 6.4;
  const rodW = small ? 9 : 11;
  const rodGap = small ? 13 : 16;
  const oneCols = Math.ceil(e / 5);
  const width = t * rodGap + (e > 0 ? (t > 0 ? 7 : 0) + oneCols * (cell + 3) : 0);
  const x0 = (W - width) / 2;
  const y0 = (80 - cell * 10) / 2;
  const onesX = x0 + t * rodGap + (t > 0 ? 7 : 0);
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: t }, (_, i) => (
        <g key={`r${i}`}>
          <rect x={x0 + i * rodGap} y={y0} width={rodW} height={cell * 10} rx="2" fill="#f59e0b" stroke="#92400e" strokeWidth="2.4" />
          {Array.from({ length: 9 }, (__, k) => (
            <line
              key={k}
              x1={x0 + i * rodGap}
              y1={y0 + (k + 1) * cell}
              x2={x0 + i * rodGap + rodW}
              y2={y0 + (k + 1) * cell}
              stroke="#92400e"
              strokeWidth="0.9"
            />
          ))}
        </g>
      ))}
      {Array.from({ length: e }, (_, i) => (
        <rect
          key={`o${i}`}
          x={onesX + Math.floor(i / 5) * (cell + 3)}
          y={y0 + cell * 10 - cell - (i % 5) * (cell + 3)}
          width={cell}
          height={cell}
          rx="1.2"
          fill="#38bdf8"
          stroke="#075985"
          strokeWidth="1.6"
        />
      ))}
    </svg>
  );
};

/** 2×10-es húszas keret kártyán: a piros, b kék, cross áthúzott korong. */
export const Frame20Card: React.FC<{
  a: number;
  b?: number;
  cross?: number;
  small?: boolean;
}> = ({ a, b = 0, cross = 0, small }) => {
  if (small) {
    // 80 × 80: 4 × 5 rács vagy 2 × 10 függőlegesen? Inkább 4 oszlop × 5 sor = 20 hely, vastag pöttyök!
    // Vagy 5 oszlop × 4 sor: 72 × 58 dobozban szuper jól olvasható 80×80-on!
    const cols = 5;
    const step = 13;
    const x0 = (80 - cols * step) / 2;
    const y0 = (80 - 4 * step) / 2;
    const total = a + b;
    const kept = Math.max(0, total - cross);
    return (
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <rect x={x0 - 3} y={y0 - 3} width={cols * step + 6} height={4 * step + 6} rx="6" fill="#ffffff" stroke="#334155" strokeWidth="3" />
        <line x1={x0 - 3} y1={y0 + 2 * step} x2={x0 + cols * step + 3} y2={y0 + 2 * step} stroke="#94a3b8" strokeWidth="2" />
        {Array.from({ length: 20 }, (_, i) => {
          const cx = x0 + (i % cols) * step + step / 2;
          const cy = y0 + Math.floor(i / cols) * step + step / 2;
          const isFirst = i < a;
          const isSecond = i >= a && i < total;
          const isCrossed = cross > 0 && i >= kept && i < total;
          return (
            <g key={i}>
              {(isFirst || isSecond) && (
                <circle
                  cx={cx}
                  cy={cy}
                  r="4.5"
                  fill={isCrossed ? '#e2e8f0' : isFirst ? '#ef4444' : '#2563eb'}
                  stroke={isCrossed ? '#64748b' : '#0f172a'}
                  strokeWidth="1.2"
                />
              )}
              {isCrossed && (
                <line x1={cx - 4.5} y1={cy + 4.5} x2={cx + 4.5} y2={cy - 4.5} stroke="#dc2626" strokeWidth="2.4" strokeLinecap="round" />
              )}
            </g>
          );
        })}
      </svg>
    );
  }

  const cell = 13;
  const gap = 1.2;
  const x0 = (150 - (10 * cell + 9 * gap)) / 2;
  const y0 = (80 - (2 * cell + gap)) / 2;
  const total = a + b;
  const kept = Math.max(0, total - cross);
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg">
      <rect x={x0 - 4} y={y0 - 4} width={10 * cell + 9 * gap + 8} height={2 * cell + gap + 8} rx="6" fill="#ffffff" stroke="#334155" strokeWidth="3" />
      <line x1={75} y1={y0 - 4} x2={75} y2={y0 + 2 * cell + gap + 4} stroke="#94a3b8" strokeWidth="2.2" />
      {Array.from({ length: 20 }, (_, i) => {
        const col = i % 10;
        const row = Math.floor(i / 10);
        const rx = x0 + col * (cell + gap);
        const ry = y0 + row * (cell + gap);
        const cx = rx + cell / 2;
        const cy = ry + cell / 2;
        const isFirst = i < a;
        const isSecond = i >= a && i < total;
        const isCrossed = cross > 0 && i >= kept && i < total;
        return (
          <g key={i}>
            <rect x={rx} y={ry} width={cell} height={cell} rx="2" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
            {(isFirst || isSecond) && (
              <circle
                cx={cx}
                cy={cy}
                r="4.6"
                fill={isCrossed ? '#e2e8f0' : isFirst ? '#ef4444' : '#2563eb'}
                stroke={isCrossed ? '#64748b' : '#0f172a'}
                strokeWidth="1.2"
              />
            )}
            {isCrossed && (
              <line x1={cx - 4.5} y1={cy + 4.5} x2={cx + 4.5} y2={cy - 4.5} stroke="#dc2626" strokeWidth="2.4" strokeLinecap="round" />
            )}
          </g>
        );
      })}
    </svg>
  );
};

/** Számegyenes-részlet 150×80 kártyán; egy ismert szám + piros kérdőjel. */
export const NumLine20Card: React.FC<{ from: number; to: number; mark: number; ask: number }> = ({
  from,
  to,
  mark,
  ask,
}) => {
  const x = (v: number) => 14 + ((v - from) / (to - from)) * 122;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <line x1="6" y1="42" x2="144" y2="42" stroke={INK} strokeWidth="3.2" />
      {Array.from({ length: to - from + 1 }, (_, i) => {
        const v = from + i;
        const big = v % 5 === 0;
        const h = big ? 11 : 6;
        return <line key={v} x1={x(v)} y1={42 - h} x2={x(v)} y2={42 + h} stroke={INK} strokeWidth={big ? 3 : 2} />;
      })}
      <circle cx={x(mark)} cy="42" r="5" fill="#16a34a" />
      <text x={x(mark)} y="74" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#15803d">
        {mark}
      </text>
      <rect x={x(ask) - 13} y="3" width="26" height="25" rx="6" fill="#fee2e2" stroke={UNK} strokeWidth="3" />
      <text x={x(ask)} y="23" textAnchor="middle" fontSize="22" fontWeight="bold" fill={UNK}>
        ?
      </text>
      <circle cx={x(ask)} cy="42" r="5" fill={UNK} />
    </svg>
  );
};

/** 3 téglás mini számpiramis (150×80 vagy 80×80). */
export const Pyramid3Card: React.FC<{
  top: number | '?';
  left: number | '?';
  right: number | '?';
  small?: boolean;
}> = ({ top, left, right, small }) => {
  if (small) {
    return (
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
        <rect x="22" y="6" width="36" height="30" rx="5" fill={top === '?' ? '#fee2e2' : '#fef3c7'} stroke={top === '?' ? UNK : '#d97706'} strokeWidth="3" />
        <text x="40" y="29" textAnchor="middle" fontSize="22" fontWeight="bold" fill={top === '?' ? UNK : INK}>
          {top}
        </text>
        <rect x="4" y="42" width="34" height="30" rx="5" fill={left === '?' ? '#fee2e2' : '#e0f2fe'} stroke={left === '?' ? UNK : '#0284c7'} strokeWidth="3" />
        <text x="21" y="65" textAnchor="middle" fontSize="22" fontWeight="bold" fill={left === '?' ? UNK : INK}>
          {left}
        </text>
        <rect x="42" y="42" width="34" height="30" rx="5" fill={right === '?' ? '#fee2e2' : '#e0f2fe'} stroke={right === '?' ? UNK : '#0284c7'} strokeWidth="3" />
        <text x="59" y="65" textAnchor="middle" fontSize="22" fontWeight="bold" fill={right === '?' ? UNK : INK}>
          {right}
        </text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="47" y="5" width="56" height="32" rx="6" fill={top === '?' ? '#fee2e2' : '#fef3c7'} stroke={top === '?' ? UNK : '#d97706'} strokeWidth="3" />
      <text x="75" y="29" textAnchor="middle" fontSize="23" fontWeight="bold" fill={top === '?' ? UNK : INK}>
        {top}
      </text>
      <rect x="16" y="43" width="56" height="32" rx="6" fill={left === '?' ? '#fee2e2' : '#e0f2fe'} stroke={left === '?' ? UNK : '#0284c7'} strokeWidth="3" />
      <text x="44" y="67" textAnchor="middle" fontSize="23" fontWeight="bold" fill={left === '?' ? UNK : INK}>
        {left}
      </text>
      <rect x="78" y="43" width="56" height="32" rx="6" fill={right === '?' ? '#fee2e2' : '#e0f2fe'} stroke={right === '?' ? UNK : '#0284c7'} strokeWidth="3" />
      <text x="106" y="67" textAnchor="middle" fontSize="23" fontWeight="bold" fill={right === '?' ? UNK : INK}>
        {right}
      </text>
    </svg>
  );
};

const PIP_MINI: Record<number, [number, number][]> = {
  1: [[0.5, 0.5]],
  2: [[0.28, 0.28], [0.72, 0.72]],
  3: [[0.28, 0.28], [0.5, 0.5], [0.72, 0.72]],
  4: [[0.28, 0.28], [0.72, 0.28], [0.28, 0.72], [0.72, 0.72]],
  5: [[0.28, 0.28], [0.72, 0.28], [0.5, 0.5], [0.28, 0.72], [0.72, 0.72]],
  6: [[0.28, 0.24], [0.72, 0.24], [0.28, 0.5], [0.72, 0.5], [0.28, 0.76], [0.72, 0.76]],
};

/** Három dobókocka (150×80). */
export const DiceTrioCard: React.FC<{ values: [number, number, number] }> = ({ values }) => {
  const s = 38;
  const gap = 8;
  const x0 = (150 - (3 * s + 2 * gap)) / 2;
  const fills = ['#fef9c3', '#e0f2fe', '#fce7f3'];
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg">
      {values.map((v, i) => {
        const x = x0 + i * (s + gap);
        return (
          <g key={i}>
            <rect x={x} y="21" width={s} height={s} rx="7" fill={fills[i]} stroke="#334155" strokeWidth="3" />
            {(PIP_MINI[v] ?? []).map(([px, py], k) => (
              <circle key={k} cx={x + px * s} cy={21 + py * s} r="3.4" fill={INK} />
            ))}
          </g>
        );
      })}
    </svg>
  );
};

/** Párosított korongok 80×80 kártyán (páros/páratlan felismeréséhez, válasz nélkül). */
export const ParityDotsCard: React.FC<{ count: number }> = ({ count }) => {
  const cols = Math.ceil(count / 2);
  const stepX = Math.min(14, 72 / Math.max(cols, 1));
  const r = Math.min(5.2, stepX * 0.42);
  const x0 = (80 - (cols - 1) * stepX) / 2;
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: count }, (_, i) => {
        const col = Math.floor(i / 2);
        const row = i % 2;
        return (
          <circle
            key={i}
            cx={x0 + col * stepX}
            cy={row === 0 ? 29 : 51}
            r={r}
            fill={i === count - 1 && count % 2 === 1 ? '#f59e0b' : '#0284c7'}
            stroke="#0f172a"
            strokeWidth="1.5"
          />
        );
      })}
    </svg>
  );
};

/** Rövid műveleti nyíl-kártya 150×80: pl. 9 -> (+6) -> ? */
export const ChainMiniCard: React.FC<{ start: number; op: string }> = ({ start, op }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <circle cx="28" cy="46" r="21" fill="#e0f2fe" stroke="#0284c7" strokeWidth="3" />
    <text x="28" y="54" textAnchor="middle" fontSize="22" fontWeight="bold" fill={INK}>
      {start}
    </text>
    <line x1="51" y1="46" x2="95" y2="46" stroke="#334155" strokeWidth="3.2" />
    <path d="M 100 46 l -8 -5 v 10 Z" fill="#334155" />
    <text x="75" y="29" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#7c3aed">
      {op}
    </text>
    <circle cx="122" cy="46" r="21" fill="#fee2e2" stroke={UNK} strokeWidth="3" />
    <text x="122" y="54" textAnchor="middle" fontSize="22" fontWeight="bold" fill={UNK}>
      ?
    </text>
  </svg>
);

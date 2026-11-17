import React from 'react';
import { FONT } from './Count100ExamG3Parts';

// ---------------------------------------------------------------------------
// Kis kártyaképek a Párosító (150 × 80) és a Csoportosító (80 × 80) játékhoz.
// Ugyanazok a színek, mint a fejezetben: narancs tízesrúd, kék egyeskocka,
// csokitábla a szorzáshoz, narancs keret az első lépés körül. A válasz sosincs a képen.
// ---------------------------------------------------------------------------

const ROD = '#f59e0b';
const ONE = '#0ea5e9';

/** Tízesrudak és egyeskockák (az egyesek 5-ös oszlopokban). */
export const BlocksCard: React.FC<{ t: number; e: number; small?: boolean }> = ({ t, e, small }) => {
  const W = small ? 80 : 150;
  const cell = small ? 6 : 6.4;
  const rodW = small ? 7 : 9;
  const rodGap = small ? 10 : 14;
  const oneCols = Math.ceil(e / 5);
  const width = t * rodGap + (e ? 6 + oneCols * (cell + 2.5) : 0);
  const x0 = (W - width) / 2;
  const y0 = (80 - cell * 10) / 2;
  const onesX = x0 + t * rodGap + 6;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: t }, (_, i) => (
        <g key={`r${i}`}>
          <rect x={x0 + i * rodGap} y={y0} width={rodW} height={cell * 10} rx="1.5" fill={ROD} stroke="#92400e" strokeWidth="1.8" />
          {Array.from({ length: 9 }, (__, k) => (
            <line key={k} x1={x0 + i * rodGap} y1={y0 + (k + 1) * cell} x2={x0 + i * rodGap + rodW} y2={y0 + (k + 1) * cell} stroke="#92400e" strokeWidth="0.8" />
          ))}
        </g>
      ))}
      {Array.from({ length: e }, (_, i) => (
        <rect
          key={`o${i}`}
          x={onesX + Math.floor(i / 5) * (cell + 2.5)}
          y={y0 + cell * 10 - cell - (i % 5) * (cell + 2.5)}
          width={cell}
          height={cell}
          rx="1"
          fill={ONE}
          stroke="#075985"
          strokeWidth="1.2"
        />
      ))}
    </svg>
  );
};

/** Számegyenes-részlet egyes beosztással; csak a `mark` szám van kiírva, a keresett hely "?". */
export const NumberLineCard: React.FC<{ from: number; to: number; mark: number; ask: number }> = ({ from, to, mark, ask }) => {
  const x = (v: number) => 10 + ((v - from) / (to - from)) * 130;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <line x1="4" y1="40" x2="146" y2="40" stroke="#1e293b" strokeWidth="3" />
      {Array.from({ length: to - from + 1 }, (_, i) => {
        const v = from + i;
        const big = v % 10 === 0;
        const mid = v % 5 === 0;
        const h = big ? 13 : mid ? 9 : 6;
        return <line key={v} x1={x(v)} y1={40 - h} x2={x(v)} y2={40 + h} stroke="#1e293b" strokeWidth={big ? 3 : 2} />;
      })}
      <circle cx={x(mark)} cy="40" r="5" fill="#16a34a" />
      <text x={x(mark)} y="72" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#15803d">
        {mark}
      </text>
      <rect x={x(ask) - 12} y="2" width="24" height="22" rx="5" fill="#ffe4e6" stroke="#e11d48" strokeWidth="2.5" />
      <text x={x(ask)} y="20" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#e11d48">
        ?
      </text>
      <circle cx={x(ask)} cy="40" r="5" fill="#e11d48" />
    </svg>
  );
};

/** Csokitábla rows × cols kockával (szorzás). */
export const ChocoCard: React.FC<{ rows: number; cols: number }> = ({ rows, cols }) => {
  const c = Math.min(140 / cols, 72 / rows, 16);
  const x0 = (150 - cols * c) / 2;
  const y0 = (80 - rows * c) / 2;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg">
      <rect x={x0 - 3} y={y0 - 3} width={cols * c + 6} height={rows * c + 6} rx="4" fill="#78350f" />
      {Array.from({ length: rows * cols }, (_, i) => (
        <rect key={i} x={x0 + (i % cols) * c + 0.8} y={y0 + Math.floor(i / cols) * c + 0.8} width={c - 1.6} height={c - 1.6} rx="1.5" fill="#b45309" stroke="#451a03" strokeWidth="0.8" />
      ))}
    </svg>
  );
};

/** A műveletsor nagy számokkal; az elsőként elvégzendő rész narancs keretben, "1." jellel. */
export const FirstStepCard: React.FC<{ tokens: string[]; from: number; to: number }> = ({ tokens, from, to }) => {
  const width = (t: string) => (t === '(' || t === ')' ? 9 : /^[0-9]+$/.test(t) ? t.length * 13 + 3 : 21);
  const widths = tokens.map(width);
  const total = widths.reduce((a, b) => a + b, 0);
  let x = (150 - total) / 2;
  const xs = widths.map((w) => {
    const cx = x + w / 2;
    x += w;
    return cx;
  });
  const bx0 = xs[from] - widths[from] / 2 - 2;
  const bx1 = xs[to] + widths[to] / 2 + 2;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x={bx0} y="22" width={bx1 - bx0} height="40" rx="9" fill="#ffedd5" stroke="#ea580c" strokeWidth="3" />
      <circle cx={(bx0 + bx1) / 2} cy="12" r="10" fill="#ea580c" />
      <text x={(bx0 + bx1) / 2} y="17" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#fff">
        1.
      </text>
      {tokens.map((t, i) => (
        <text key={i} x={xs[i]} y="51" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#0f172a">
          {t}
        </text>
      ))}
    </svg>
  );
};

/** n pötty d-s oszlopokban (az utolsó oszlop lehet csonka) – maradékos osztáshoz (80 × 80). */
export const DivDotsCard: React.FC<{ n: number; d: number }> = ({ n, d }) => {
  const colsN = Math.ceil(n / d);
  const step = Math.min(72 / colsN, 72 / d, 14);
  const r = step * 0.42;
  const x0 = (80 - colsN * step) / 2 + step / 2;
  const y0 = (80 - d * step) / 2 + step / 2;
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: n }, (_, i) => (
        <circle key={i} cx={x0 + Math.floor(i / d) * step} cy={y0 + (i % d) * step} r={r} fill="#a855f7" stroke="#581c87" strokeWidth="1.4" />
      ))}
    </svg>
  );
};

/**
 * Pöttysorok (80 × 80): rows × cols pötty.
 * split: soronként az első `split` pötty piros, a többi kék; crossEach: soronként az utolsó k áthúzva;
 * crossLast: az utolsó k pötty áthúzva; extra: külön zöld pöttyök alul.
 */
export const DotRowsCard: React.FC<{ rows: number; cols: number; split?: number; crossEach?: number; crossLast?: number; extra?: number }> = ({
  rows,
  cols,
  split,
  crossEach = 0,
  crossLast = 0,
  extra = 0
}) => {
  const allRows = rows + (extra ? 1 : 0);
  const step = Math.min(74 / cols, 74 / allRows, 14);
  const r = step * 0.42;
  const x0 = (80 - cols * step) / 2 + step / 2;
  const y0 = (80 - allRows * step) / 2 + step / 2;
  const total = rows * cols;
  const dots: React.ReactNode[] = [];
  for (let i = 0; i < total; i++) {
    const row = Math.floor(i / cols);
    const col = i % cols;
    const cx = x0 + col * step;
    const cy = y0 + row * step;
    const crossed = col >= cols - crossEach || i >= total - crossLast;
    const fill = split !== undefined ? (col < split ? '#f87171' : '#60a5fa') : '#f87171';
    dots.push(
      <g key={i}>
        <circle cx={cx} cy={cy} r={r} fill={crossed ? '#e2e8f0' : fill} stroke={crossed ? '#64748b' : '#1e293b'} strokeWidth="1.2" />
        {crossed && <line x1={cx - r - 1} y1={cy + r + 1} x2={cx + r + 1} y2={cy - r - 1} stroke="#dc2626" strokeWidth="1.8" />}
      </g>
    );
  }
  for (let k = 0; k < extra; k++) {
    dots.push(<circle key={`x${k}`} cx={x0 + k * step} cy={y0 + rows * step} r={r} fill="#4ade80" stroke="#14532d" strokeWidth="1.2" />);
  }
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      {dots}
    </svg>
  );
};

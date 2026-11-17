import React from 'react';
import { PAL, PalName, UNK } from '../a-terulet-merese/AreaG3Parts';

// ---------------------------------------------------------------------------
// Rajzoló elemek a 8. A téglalap és a négyzet területe leckéhez.
// A 7. lecke (A terület mérése) rajzelemeire épül.
// ---------------------------------------------------------------------------

export { FONT, INK, UNK, QFig, Pieces, GridBg, shapePolys, rectCells, S, splitHalves, cellPts } from '../a-terulet-merese/AreaG3Parts';

/**
 * Téglalap kis négyzetekből: rows sor, egy sorban cols négyzet.
 * mode = 'full': minden négyzet színes; 'partial': csak az első sor és az első oszlop
 * színes, a többi helyén halvány rács; 'empty': csak halvány rács és a körvonal.
 */
export const RectGrid: React.FC<{
  rows: number;
  cols: number;
  x: number;
  y: number;
  s: number;
  pal?: PalName;
  mode?: 'full' | 'partial' | 'empty';
  outline?: number;
  inner?: number;
  cellFill?: (r: number, c: number) => string | undefined;
}> = ({ rows, cols, x, y, s, pal = 'green', mode = 'full', outline, inner, cellFill }) => {
  const [f, d] = PAL[pal];
  const ow = outline ?? Math.max(2, s / 7);
  const cells: React.ReactNode[] = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      const own = cellFill?.(r, c);
      const on = own !== undefined ? true : mode === 'full' || (mode === 'partial' && (r === 0 || c === 0));
      cells.push(
        <rect
          key={`${r}-${c}`}
          x={x + c * s}
          y={y + r * s}
          width={s}
          height={s}
          fill={own ?? (on ? f : '#fff')}
          stroke={on ? d : '#cbd5e1'}
          strokeWidth={on ? (inner ?? Math.max(0.8, s / 16)) : 0.8}
          strokeDasharray={on ? undefined : '2 2'}
        />
      );
    }
  return (
    <g>
      {cells}
      <rect x={x} y={y} width={cols * s} height={rows * s} fill="none" stroke={d} strokeWidth={ow} strokeLinejoin="round" />
    </g>
  );
};

/** Felirat nyíllal a téglalap fölé (vízszintes) vagy mellé (függőleges). */
export const SideLabel: React.FC<{ x1: number; y1: number; x2: number; y2: number; text: string; color?: string; side?: 'top' | 'left' }> = ({
  x1,
  y1,
  x2,
  y2,
  text,
  color = '#334155',
  side = 'top'
}) => {
  const unk = text.includes('?');
  const col = unk ? UNK : color;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={col} strokeWidth="1.4" />
      {side === 'top' ? (
        <>
          <path d={`M ${x1} ${y1} l 5 -3 v 6 Z M ${x2} ${y2} l -5 -3 v 6 Z`} fill={col} />
          <text x={(x1 + x2) / 2} y={y1 - 5} textAnchor="middle" fontSize="11" fontWeight="bold" fill={col}>
            {text}
          </text>
        </>
      ) : (
        <>
          <path d={`M ${x1} ${y1} l -3 5 h 6 Z M ${x2} ${y2} l -3 -5 h 6 Z`} fill={col} />
          <text x={x1 - 5} y={(y1 + y2) / 2 + 4} textAnchor="end" fontSize="11" fontWeight="bold" fill={col}>
            {text}
          </text>
        </>
      )}
    </g>
  );
};

// ---------------------------------------------------------------------------
// Labor II generátor: hány lap kell? (csak az első sor és oszlop látszik)
// ---------------------------------------------------------------------------
const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export type RectAreaOption = { v: number; msg: string };
export type RectAreaTask = { rows: number; cols: number; ans: number; options: RectAreaOption[] };

export const makeRectAreaTask = (): RectAreaTask => {
  const rows = rnd(2, 7);
  const cols = rnd(3, 9);
  const ans = rows * cols;
  const wrong: RectAreaOption[] = [
    { v: rows + cols, msg: `Összeadtad a két számot: ${rows} + ${cols}. De ${rows} sor van, és mindegyikben ${cols} lap. Szorozz!` },
    { v: rows + cols - 1, msg: 'Csak a már kirakott lapokat számoltad meg. Képzeld el a többit is: minden sor tele lesz!' },
    { v: 2 * (rows + cols), msg: 'Ez a körben lévő kis oldalak száma, vagyis a kerület. Mi a belsejét fedjük le!' },
    { v: ans - cols, msg: `Eggyel kevesebb sort számoltál. ${rows} sor van, mindegyikben ${cols} lap.` },
    { v: ans + cols, msg: `Eggyel több sort számoltál. Csak ${rows} sor van.` }
  ];
  const uniq = wrong.filter((w, i, arr) => w.v !== ans && w.v > 0 && arr.findIndex((x) => x.v === w.v) === i);
  return { rows, cols, ans, options: shuffle([{ v: ans, msg: '' }, ...shuffle(uniq).slice(0, 3)]) };
};

/** Labor I: a célterületek (mindegyik többféle téglalappal kirakható). */
export const RECT_TARGETS = [8, 10, 12, 16, 18, 20, 24, 30, 36];

/** Az összes téglalap (sor, egy sorban), amelynek a területe n, a labor határain belül. */
export const rectsWithArea = (n: number, maxRows = 8, maxCols = 10): [number, number][] => {
  const out: [number, number][] = [];
  for (let r = 1; r <= maxRows; r++) if (n % r === 0 && n / r <= maxCols) out.push([r, n / r]);
  return out;
};


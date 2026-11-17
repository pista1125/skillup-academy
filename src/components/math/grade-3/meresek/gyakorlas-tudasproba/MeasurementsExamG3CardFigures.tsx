import React from 'react';
import { FONT, INK, Dial, Jug, GridShape, rectCells, Cell, RectRight } from './MeasurementsExamG3Parts';

export { MiniClock, MiniTwoClocks } from '../az-ido-merese/TimeG3CardFigures';

// Kis, vastag vonalas ikonok a Párosító (150 × 80) és a Csoportosító (80 × 80) kártyáira.

const Box150: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    {children}
  </svg>
);
const Box80: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    {children}
  </svg>
);

/** Mérőkancsó (dl). small: 80 × 80 kártya. */
export const MiniJug: React.FC<{ level: number; max?: number; small?: boolean }> = ({ level, max = 10, small }) =>
  small ? (
    <Box80>
      <Jug x={30} y={4} h={72} w={30} level={level} max={max} labels={[10]} />
    </Box80>
  ) : (
    <Box150>
      <Jug x={70} y={3} h={74} w={34} level={level} max={max} />
    </Box150>
  );

/** Konyhai mérleg számlapja (0–100 dkg). */
export const MiniDial: React.FC<{ v: number }> = ({ v }) => (
  <Box150>
    <Dial cx={75} cy={42} r={37} value={v} max={100} step={10} labelEvery={50} fs={13} sweep={270} unit={false} />
  </Box150>
);

/** Vonalzó 0–7 cm, kék szakasz 0-tól mm-ig. */
export const MiniRuler: React.FC<{ toMm: number }> = ({ toMm }) => {
  const X = (mm: number) => 10 + mm * 1.85;
  return (
    <Box150>
      <line x1={X(0)} y1="22" x2={X(toMm)} y2="22" stroke="#2563eb" strokeWidth="6" strokeLinecap="round" />
      <rect x="4" y="32" width="142" height="40" rx="4" fill="#fef9c3" stroke="#a16207" strokeWidth="2.5" />
      {Array.from({ length: 8 }, (_, c) => (
        <g key={c}>
          <line x1={X(c * 10)} y1="32" x2={X(c * 10)} y2="48" stroke={INK} strokeWidth="3" />
          <text x={X(c * 10)} y="68" textAnchor="middle" fontSize="15" fontWeight="bold" fill={INK}>{c}</text>
        </g>
      ))}
    </Box150>
  );
};

/** Négyzetrácsos alakzat (Párosító). */
export const MiniGrid: React.FC<{ cells: Cell[]; cols: number; rows: number }> = ({ cells, cols, rows }) => {
  const s = Math.min(130 / cols, 66 / rows);
  return (
    <Box150>
      <GridShape x={(150 - cols * s) / 2} y={(80 - rows * s) / 2} cols={cols} rows={rows} s={s} cells={cells} />
    </Box150>
  );
};

/** Négyzetrácsos téglalap (Csoportosító, 80 × 80). */
export const SortGridRect: React.FC<{ w: number; h: number }> = ({ w, h }) => {
  const s = Math.min(70 / w, 70 / h, 16);
  return (
    <Box80>
      <GridShape x={(80 - w * s) / 2} y={(80 - h * s) / 2} cols={w} rows={h} s={s} cells={rectCells(w, h)} fill="#93c5fd" stroke="#1d4ed8" />
    </Box80>
  );
};

/** Téglalap oldalhosszakkal (Párosító). */
export const MiniRect: React.FC<{ w: number; h: number; top: string; side?: string; square?: boolean }> = ({ w, h, top, side, square }) => {
  const x = side ? 54 : (150 - w) / 2;
  const y = 22;
  return (
    <Box150>
      <rect x={x} y={y} width={w} height={h} fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="3" />
      <RectRight x={x} y={y} w={w} h={h} r={7} />
      {square && [
        [x + w / 2, y - 4, x + w / 2, y + 4],
        [x + w / 2, y + h - 4, x + w / 2, y + h + 4],
        [x - 4, y + h / 2, x + 4, y + h / 2],
        [x + w - 4, y + h / 2, x + w + 4, y + h / 2]
      ].map(([a, b, c, d], i) => <line key={i} x1={a} y1={b} x2={c} y2={d} stroke={INK} strokeWidth="2.5" />)}
      <text x={x + w / 2} y={y - 6} textAnchor="middle" fontSize="16" fontWeight="bold" fill={INK}>{top}</text>
      {side && (
        <text x={x - 6} y={y + h / 2 + 6} textAnchor="end" fontSize="16" fontWeight="bold" fill={INK}>{side}</text>
      )}
    </Box150>
  );
};

// ---------------------------------------------------------------------------
// Mérőeszközök (80 × 80)
// ---------------------------------------------------------------------------
export const RulerIcon: React.FC = () => (
  <Box80>
    <rect x="6" y="28" width="68" height="24" rx="3" fill="#fef08a" stroke="#a16207" strokeWidth="3.5" />
    {[14, 24, 34, 44, 54, 64].map((x, i) => (
      <line key={x} x1={x} y1="28" x2={x} y2={i % 2 ? 36 : 42} stroke={INK} strokeWidth="3" />
    ))}
  </Box80>
);

export const TapeIcon: React.FC = () => (
  <Box80>
    <circle cx="30" cy="40" r="22" fill="#facc15" stroke="#854d0e" strokeWidth="4" />
    <circle cx="30" cy="40" r="7" fill="#854d0e" />
    <rect x="44" y="54" width="32" height="10" fill="#fef9c3" stroke="#854d0e" strokeWidth="3" />
    {[52, 60, 68].map((x) => (
      <line key={x} x1={x} y1="54" x2={x} y2="59" stroke={INK} strokeWidth="2.5" />
    ))}
  </Box80>
);

export const BalanceIcon: React.FC = () => (
  <Box80>
    <path d="M 40 16 L 40 66 M 26 70 L 54 70" stroke="#334155" strokeWidth="5" strokeLinecap="round" />
    <line x1="10" y1="20" x2="70" y2="20" stroke="#334155" strokeWidth="5" strokeLinecap="round" />
    <path d="M 10 20 L 2 42 L 18 42 Z M 70 20 L 62 42 L 78 42 Z" fill="none" stroke="#64748b" strokeWidth="2" />
    <path d="M 0 42 Q 10 52 20 42 Z M 60 42 Q 70 52 80 42 Z" fill="#cbd5e1" stroke="#334155" strokeWidth="3" />
  </Box80>
);

export const KitchenScaleIcon: React.FC = () => (
  <Box80>
    <path d="M 14 22 Q 40 34 66 22 Z" fill="#e2e8f0" stroke="#334155" strokeWidth="3.5" />
    <rect x="16" y="30" width="48" height="44" rx="8" fill="#fca5a5" stroke="#7f1d1d" strokeWidth="3.5" />
    <circle cx="40" cy="52" r="15" fill="#ffffff" stroke="#7f1d1d" strokeWidth="3" />
    <line x1="40" y1="52" x2="49" y2="44" stroke="#dc2626" strokeWidth="3.5" strokeLinecap="round" />
  </Box80>
);

export const CupIcon: React.FC = () => (
  <Box80>
    <path d="M 18 12 L 62 12 L 56 72 L 24 72 Z" fill="#e0f2fe" stroke="#334155" strokeWidth="3.5" />
    <path d="M 21 38 L 59 38 L 56 72 L 24 72 Z" fill="#7dd3fc" />
    {[24, 38, 52].map((y) => (
      <line key={y} x1="22" y1={y} x2="34" y2={y} stroke="#1e3a8a" strokeWidth="3" />
    ))}
  </Box80>
);

export const BottleIcon: React.FC = () => (
  <Box80>
    <rect x="32" y="4" width="16" height="10" rx="2" fill="#2563eb" />
    <path d="M 33 14 L 47 14 L 47 22 Q 60 28 60 40 L 60 74 L 20 74 L 20 40 Q 20 28 33 22 Z" fill="#bae6fd" stroke="#0369a1" strokeWidth="3.5" />
    <rect x="22" y="44" width="36" height="16" fill="#ffffff" stroke="#0369a1" strokeWidth="2" />
  </Box80>
);

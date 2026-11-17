import React from 'react';

// ---------------------------------------------------------------------------
// 3. Sorba rendezés és lehetőségek – közös rajzelemek
// A logikai lapokat az 1. lecke rajzolja (ugyanaz a készlet, ugyanaz a kép).
// ---------------------------------------------------------------------------
export { FONT, B, LogicBlock, blockName, COLOR_NAME, SHAPE_NAME, FILL, STROKE } from '../valogatas-tulajdonsagok-szerint/SortingByPropertyG3Parts';
export type { Block, LbColor, LbShape } from '../valogatas-tulajdonsagok-szerint/SortingByPropertyG3Parts';
import { FONT } from '../valogatas-tulajdonsagok-szerint/SortingByPropertyG3Parts';

export const UNK = '#dc2626';

/** Színek a golyókhoz, pólókhoz, gyerekekhez. */
export const PAL: Record<string, [string, string]> = {
  piros: ['#ef4444', '#7f1d1d'],
  kek: ['#3b82f6', '#1e3a8a'],
  zold: ['#22c55e', '#14532d'],
  sarga: ['#facc15', '#854d0e'],
  lila: ['#a855f7', '#581c87'],
  narancs: ['#fb923c', '#7c2d12'],
  rozsa: ['#f472b6', '#831843'],
  barna: ['#b45309', '#451a03']
};
export type PalName = keyof typeof PAL;
export const PAL_NAME: Record<string, string> = {
  piros: 'piros',
  kek: 'kék',
  zold: 'zöld',
  sarga: 'sárga',
  lila: 'lila',
  narancs: 'narancs',
  rozsa: 'rózsaszín',
  barna: 'barna'
};

export const T: React.FC<{ x: number; y: number; s?: number; c?: string; a?: 'start' | 'middle' | 'end'; w?: 'bold' | 'normal'; children: React.ReactNode }> = ({
  x,
  y,
  s = 13,
  c = '#0f172a',
  a = 'middle',
  w = 'bold',
  children
}) => (
  <text x={x} y={y} fontSize={s} fill={c} textAnchor={a} fontWeight={w} fontFamily={FONT}>
    {children}
  </text>
);

/** Színes golyó (középpont, sugár). */
export const Ball: React.FC<{ x: number; y: number; r?: number; c: PalName; sw?: number }> = ({ x, y, r = 12, c, sw = 2.5 }) => (
  <g>
    <circle cx={x} cy={y} r={r} fill={PAL[c][0]} stroke={PAL[c][1]} strokeWidth={sw} />
    <circle cx={x - r * 0.35} cy={y - r * 0.35} r={r * 0.25} fill="#ffffff" opacity="0.6" />
  </g>
);

/** Számkártya egy számjeggyel (bal felső sarok: x, y). */
export const DigitCard: React.FC<{ x: number; y: number; d: string | number; w?: number; h?: number; fs?: number; fill?: string; stroke?: string; color?: string }> = ({
  x,
  y,
  d,
  w = 30,
  h = 40,
  fs = 24,
  fill = '#ffffff',
  stroke = '#334155',
  color = '#0f172a'
}) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx="6" fill={fill} stroke={stroke} strokeWidth="3" />
    <text x={x + w / 2} y={y + h / 2 + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight="bold" fill={color} fontFamily={FONT}>
      {d}
    </text>
  </g>
);

/** Kis gyerekfigura (középpont alul: x, talp y). Fej + test, a testen betű. */
export const Kid: React.FC<{ x: number; y: number; c: PalName; letter?: string; h?: number }> = ({ x, y, c, letter, h = 56 }) => {
  const k = h / 56;
  return (
    <g>
      <rect x={x - 13 * k} y={y - 34 * k} width={26 * k} height={30 * k} rx={8 * k} fill={PAL[c][0]} stroke={PAL[c][1]} strokeWidth="2.5" />
      <circle cx={x} cy={y - 44 * k} r={10 * k} fill="#fde2c8" stroke="#7c4a2d" strokeWidth="2" />
      <line x1={x - 6 * k} y1={y - 4 * k} x2={x - 6 * k} y2={y} stroke="#334155" strokeWidth="3" />
      <line x1={x + 6 * k} y1={y - 4 * k} x2={x + 6 * k} y2={y} stroke="#334155" strokeWidth="3" />
      {letter && (
        <text x={x} y={y - 13 * k} textAnchor="middle" fontSize={15 * k} fontWeight="bold" fill="#ffffff" fontFamily={FONT}>
          {letter}
        </text>
      )}
    </g>
  );
};

/** Torony egymásra rakott kockákból (talp középen: x, y), n kocka, egy kocka mérete s. */
export const Tower: React.FC<{ x: number; y: number; n: number; s?: number; c: PalName; label?: string; ls?: number }> = ({ x, y, n, s = 12, c, label, ls = 13 }) => (
  <g>
    {Array.from({ length: n }, (_, i) => (
      <rect key={i} x={x - s / 2} y={y - (i + 1) * s} width={s} height={s} fill={PAL[c][0]} stroke={PAL[c][1]} strokeWidth="2" />
    ))}
    {label && <T x={x} y={y + ls + 3} s={ls}>{label}</T>}
  </g>
);

/** Póló (középpont: x, y; szélesség kb. 2·r). */
export const Shirt: React.FC<{ x: number; y: number; c: PalName; r?: number; sw?: number }> = ({ x, y, c, r = 16, sw = 2.5 }) => {
  const k = r / 16;
  const p = (dx: number, dy: number) => `${(x + dx * k).toFixed(1)} ${(y + dy * k).toFixed(1)}`;
  return (
    <path
      d={`M${p(-6, -14)} L${p(-16, -9)} L${p(-20, 0)} L${p(-12, 3)} L${p(-12, 15)} L${p(12, 15)} L${p(12, 3)} L${p(20, 0)} L${p(16, -9)} L${p(6, -14)} Q${p(0, -8)} ${p(-6, -14)} Z`}
      fill={PAL[c][0]}
      stroke={PAL[c][1]}
      strokeWidth={sw}
      strokeLinejoin="round"
    />
  );
};

/** Nadrág (középpont: x, y). */
export const Pants: React.FC<{ x: number; y: number; c: PalName; r?: number; sw?: number }> = ({ x, y, c, r = 16, sw = 2.5 }) => {
  const k = r / 16;
  const p = (dx: number, dy: number) => `${(x + dx * k).toFixed(1)} ${(y + dy * k).toFixed(1)}`;
  return (
    <path
      d={`M${p(-12, -15)} L${p(12, -15)} L${p(14, 16)} L${p(3, 16)} L${p(0, -2)} L${p(-3, 16)} L${p(-14, 16)} Z`}
      fill={PAL[c][0]}
      stroke={PAL[c][1]}
      strokeWidth={sw}
      strokeLinejoin="round"
    />
  );
};

/** Sapka (középpont: x, y). */
export const Cap: React.FC<{ x: number; y: number; c: PalName; r?: number; sw?: number }> = ({ x, y, c, r = 16, sw = 2.5 }) => {
  const k = r / 16;
  return (
    <g>
      <path
        d={`M${x - 15 * k} ${y + 6 * k} Q${x - 15 * k} ${y - 14 * k} ${x} ${y - 14 * k} Q${x + 15 * k} ${y - 14 * k} ${x + 15 * k} ${y + 6 * k} Z`}
        fill={PAL[c][0]}
        stroke={PAL[c][1]}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      <rect x={x - 17 * k} y={y + 4 * k} width={34 * k} height={7 * k} rx={3 * k} fill={PAL[c][0]} stroke={PAL[c][1]} strokeWidth={sw} />
      <circle cx={x} cy={y - 16 * k} r={4 * k} fill="#ffffff" stroke={PAL[c][1]} strokeWidth="2" />
    </g>
  );
};

/** Fagylaltgombóc tölcsérben (középpont: x, y). */
export const Scoop: React.FC<{ x: number; y: number; c: PalName; r?: number }> = ({ x, y, c, r = 12 }) => (
  <g>
    <path d={`M${x - r * 0.9} ${y + r * 0.4} L${x} ${y + r * 2.4} L${x + r * 0.9} ${y + r * 0.4} Z`} fill="#fcd34d" stroke="#92400e" strokeWidth="2.5" strokeLinejoin="round" />
    <circle cx={x} cy={y} r={r} fill={PAL[c][0]} stroke={PAL[c][1]} strokeWidth="2.5" />
  </g>
);

/** Kis zászló (rúd talppontja: x, y). */
export const Flag: React.FC<{ x: number; y: number; c: PalName; h?: number }> = ({ x, y, c, h = 40 }) => (
  <g>
    <line x1={x} y1={y} x2={x} y2={y - h} stroke="#334155" strokeWidth="3" strokeLinecap="round" />
    <path d={`M${x} ${y - h} L${x + h * 0.6} ${y - h * 0.8} L${x} ${y - h * 0.58} Z`} fill={PAL[c][0]} stroke={PAL[c][1]} strokeWidth="2.5" strokeLinejoin="round" />
  </g>
);

/** Állítás-dobozka: „I” vagy „H” helyett „?”. */
export const QBox: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 22 }) => (
  <g>
    <rect x={x} y={y} width={s} height={s} rx="4" fill="#fee2e2" stroke={UNK} strokeWidth="2.5" />
    <text x={x + s / 2} y={y + s * 0.74} textAnchor="middle" fontSize={s * 0.72} fontWeight="bold" fill={UNK} fontFamily={FONT}>
      ?
    </text>
  </g>
);

// ---------------------------------------------------------------------------
// Számolós segédfüggvények (laborokhoz)
// ---------------------------------------------------------------------------
/** Az összes sorrend (permutáció). */
export const permutations = <X,>(arr: X[]): X[][] => {
  if (arr.length <= 1) return [arr.slice()];
  const out: X[][] = [];
  arr.forEach((a, i) => {
    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
    permutations(rest).forEach((p) => out.push([a, ...p]));
  });
  return out;
};

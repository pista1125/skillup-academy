// „Megálló (9)” – Pötyi, a téli postás: képek a meséhez és a nagy játékhoz.
import React from 'react';
import { Potyi } from '../../shared/Potyi';
import { ICONS } from '../../shared/G1Pics';
import { snow } from '../a-nyolc/ANyolcG1Scenes';
import { XMAS } from '../a-kilenc/AKilencG1Scenes';

const MB_COLORS = ['#16a34a', '#f97316', '#2563eb', '#dc2626'];

/** Egy postaláda számmal (x = bal szél, y = teteje). */
const mailbox = (x: number, y: number, n: number | string, color: string, key?: React.Key, onClick?: () => void, state?: 'ok' | 'bad') => (
  <g key={key} onClick={onClick} style={onClick ? { cursor: 'pointer' } : undefined}>
    <rect x={x + 38} y={y + 74} width="14" height="56" fill="#475569" />
    <path d={`M${x} ${y + 20} L${x + 45} ${y} L${x + 90} ${y + 20} Z`} fill={color} stroke="#111827" strokeWidth="3" strokeLinejoin="round" />
    <rect x={x} y={y + 20} width="90" height="58" rx="6" fill={color} stroke="#111827" strokeWidth="3" />
    <rect x={x + 14} y={y + 26} width="62" height="8" rx="3" fill="#111827" />
    <circle cx={x + 45} cy={y + 56} r="17" fill={state === 'ok' ? '#bbf7d0' : state === 'bad' ? '#fecdd3' : '#fff'} stroke="#111827" strokeWidth="3" />
    <text x={x + 45} y={y + 66} textAnchor="middle" fontSize="26" fontWeight="900" fill="#111827" fontFamily="system-ui, sans-serif">{n}</text>
    {onClick && <rect x={x - 4} y={y - 4} width="98" height="140" fill="transparent" />}
  </g>
);

/** Négy postaláda számokkal. `onBox`: koppintható (Játszótér); `marks`: index → ok / bad. */
export const MailboxesScene: React.FC<{ numbers: (number | string)[]; onBox?: (i: number) => void; marks?: Record<number, 'ok' | 'bad'> }> = ({ numbers, onBox, marks = {} }) => (
  <svg viewBox="0 0 480 230">
    {snow(480, 230)}
    {numbers.map((n, i) => mailbox(18 + i * 116, 60, n, MB_COLORS[i % 4], i, onBox ? () => onBox(i) : undefined, marks[i]))}
  </svg>
);

/** Borító: Pötyi, a postás, levelekkel és a postaládákkal. */
export const PostScene: React.FC<{ dots?: number; mood?: 'happy' | 'cheer' | 'wow' }> = ({ dots = 9, mood = 'cheer' }) => (
  <svg viewBox="0 0 480 240">
    {snow(480, 240)}
    {mailbox(288, 70, '', MB_COLORS[2])}
    {mailbox(382, 86, '', MB_COLORS[3])}
    <Potyi mood={mood} dots={dots} x={20} y={60} size={150} />
    <rect x="150" y="150" width="70" height="50" rx="10" fill="#92400e" stroke="#451a03" strokeWidth="3" />
    <path d="M160 150 Q185 110 210 150" fill="none" stroke="#451a03" strokeWidth="5" />
    {XMAS.boritek({ x: 170, y: 140, s: 0.8 })}
    {XMAS.boritek({ x: 200, y: 134, s: 0.8, color: '#fde68a' })}
    {ICONS.meh({ x: 250, y: 60, s: 1.4 })}
  </svg>
);

const SCARF_POS: [number, number, number][] = [
  [70, 50, -15], [180, 46, 10], [300, 56, -8], [410, 48, 18], [120, 122, 12], [240, 128, -18], [360, 120, 6], [80, 190, -6], [410, 186, 14],
];

/** Szétszórt sálak: `a` sárga és `b` zöld (összekeverve). */
export const ScarfScene: React.FC<{ a: number; b: number }> = ({ a, b }) => {
  const n = Math.min(9, a + b);
  // keverés: felváltva, amíg mindkettőből van
  const colors: string[] = [];
  let ya = a;
  let gb = b;
  for (let i = 0; i < n; i++) {
    if ((i % 2 === 0 && ya > 0) || gb === 0) {
      colors.push('#facc15');
      ya--;
    } else {
      colors.push('#22c55e');
      gb--;
    }
  }
  return (
    <svg viewBox="0 0 480 240">
      <rect x="0" y="0" width="480" height="240" rx="18" fill="#e0f2fe" />
      {colors.map((c, i) => (
        <g key={i} transform={`rotate(${SCARF_POS[i][2]} ${SCARF_POS[i][0]} ${SCARF_POS[i][1]})`}>{XMAS.sal({ x: SCARF_POS[i][0], y: SCARF_POS[i][1], s: 1.8, color: c })}</g>
      ))}
    </svg>
  );
};

/** Egy sál képe (válaszlehetőség). */
export const ScarfPic: React.FC<{ color: string }> = ({ color }) => (
  <svg viewBox="0 0 90 70" className="w-24 h-auto">
    {XMAS.sal({ x: 45, y: 32, s: 1.7, color })}
  </svg>
);

/**
 * Logikai lapokból kirakott fenyő. `big`: 9 kis háromszög (1 + 3 + 5 sor);
 * különben 4 háromszög és egy négyzet csúcsdísz (5 lap).
 */
export const PieceTree: React.FC<{ big?: boolean }> = ({ big = true }) => {
  const tri: string[] = [];
  const rows = big ? 3 : 2;
  const s = big ? 60 : 80;
  const h = big ? 52 : 70;
  const top = big ? 40 : 66;
  for (let r = 0; r < rows; r++) {
    const y0 = top + r * h;
    const y1 = y0 + h;
    for (let k = 0; k <= r; k++) {
      const xl = 240 - (r * s) / 2 + k * s; // felfelé álló háromszög csúcsa
      tri.push(`M${xl} ${y0} L${xl - s / 2} ${y1} L${xl + s / 2} ${y1} Z`);
      if (k < r) tri.push(`M${xl} ${y0} L${xl + s} ${y0} L${xl + s / 2} ${y1} Z`);
    }
  }
  return (
    <svg viewBox="0 0 480 240">
      {snow(480, 240)}
      {tri.map((d, i) => (
        <path key={i} d={d} fill={i % 2 === 0 ? '#16a34a' : '#22c55e'} stroke="#14532d" strokeWidth="3" strokeLinejoin="round" />
      ))}
      {!big && <rect x="220" y="26" width="40" height="40" fill="#facc15" stroke="#a16207" strokeWidth="3" transform="rotate(45 240 46)" />}
    </svg>
  );
};

/** Bögresor minta szerint (B = kék, R = piros); a `shown` után egy „?” bögre. */
export const MugPattern: React.FC<{ pattern: string; shown: number }> = ({ pattern, shown }) => {
  const w = (shown + 1) * 48 + 16;
  return (
    <svg viewBox={`0 0 ${w} 76`} className="w-full max-w-[460px] h-auto mx-auto">
      <rect x="3" y="3" width={w - 6} height="70" rx="14" fill="#fff" stroke="#94a3b8" strokeWidth="3" />
      {Array.from({ length: shown }, (_, i) => XMAS.bogre({ x: 32 + i * 48, y: 40, s: 0.95, color: pattern[i % pattern.length] === 'B' ? '#3b82f6' : '#ef4444', key: i }))}
      {XMAS.bogre({ x: 32 + shown * 48, y: 40, s: 0.95, color: '#ffffff' })}
      <text x={30 + shown * 48} y="47" textAnchor="middle" fontSize="22" fontWeight="900" fill="#7c3aed" fontFamily="system-ui, sans-serif">?</text>
    </svg>
  );
};

/** Bögre kártyakép (válasz). */
export const MugPic: React.FC<{ color: string }> = ({ color }) => (
  <svg viewBox="0 0 70 60" className="w-20 h-auto">
    {XMAS.bogre({ x: 33, y: 30, s: 1.4, color })}
  </svg>
);

type Shape = 'csillag' | 'kor' | 'haromszog' | 'negyzet';
const shape = (k: Shape, x: number, y: number, key?: React.Key) =>
  k === 'csillag' ? (
    <g key={key}>{ICONS.csillag({ x, y, s: 0.8 })}</g>
  ) : k === 'kor' ? (
    <circle key={key} cx={x} cy={y} r="15" fill="#ef4444" stroke="#7f1d1d" strokeWidth="3" />
  ) : k === 'haromszog' ? (
    <path key={key} d={`M${x} ${y - 16} L${x - 17} ${y + 13} L${x + 17} ${y + 13} Z`} fill="#22c55e" stroke="#14532d" strokeWidth="3" strokeLinejoin="round" />
  ) : (
    <rect key={key} x={x - 14} y={y - 14} width="28" height="28" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="3" />
  );

/** Táblázat sor- és oszlopsorszámokkal (sorok fentről, oszlopok balról). */
export const GridScene: React.FC<{ size?: number; items: { r: number; c: number; k: Shape }[] }> = ({ size = 3, items }) => {
  const cell = 56;
  const x0 = 70;
  const y0 = 50;
  const w = x0 + size * cell + 16;
  const h = y0 + size * cell + 12;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-[320px] h-auto mx-auto">
      <rect x="0" y="0" width={w} height={h} rx="14" fill="#fff" />
      {Array.from({ length: size }, (_, i) => (
        <g key={i}>
          <rect x={x0 + i * cell} y={y0 - 40} width={cell} height="36" fill="#fecaca" stroke="#1f2937" strokeWidth="2" />
          <text x={x0 + i * cell + cell / 2} y={y0 - 14} textAnchor="middle" fontSize="20" fontWeight="900" fill="#1e293b" fontFamily="system-ui, sans-serif">{i + 1}.</text>
          <rect x={x0 - 60} y={y0 + i * cell} width="56" height={cell} fill="#fef08a" stroke="#1f2937" strokeWidth="2" />
          <text x={x0 - 32} y={y0 + i * cell + cell / 2 + 7} textAnchor="middle" fontSize="20" fontWeight="900" fill="#1e293b" fontFamily="system-ui, sans-serif">{i + 1}.</text>
        </g>
      ))}
      {Array.from({ length: size * size }, (_, i) => (
        <rect key={`c${i}`} x={x0 + (i % size) * cell} y={y0 + Math.floor(i / size) * cell} width={cell} height={cell} fill="#fff" stroke="#1f2937" strokeWidth="2" />
      ))}
      {items.map((it, i) => shape(it.k, x0 + (it.c - 1) * cell + cell / 2, y0 + (it.r - 1) * cell + cell / 2, i))}
    </svg>
  );
};

/** Alakzat kártyaképe (válasz). */
export const ShapePic: React.FC<{ k: Shape }> = ({ k }) => (
  <svg viewBox="0 0 60 60" className="w-16 h-auto">
    {shape(k, 30, 30)}
  </svg>
);

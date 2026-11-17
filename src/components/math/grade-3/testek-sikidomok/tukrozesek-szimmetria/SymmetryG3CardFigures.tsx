import React from 'react';
import { FONT, AXIS, GRIDLINE, Heart, HalfHeart, House, Tree, BigArrow, Flag, LETTER_PATHS } from './SymmetryG3Parts';

// Kis, vastag vonalas ikonok a Párosító (150 × 80) és a Csoportosító (80 × 80) kártyáira.

const M: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    {children}
  </svg>
);
const S: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    {children}
  </svg>
);
const ax = (x: number) => <line x1={x} y1={3} x2={x} y2={77} stroke={AXIS} strokeWidth="3.5" strokeDasharray="7 4" strokeLinecap="round" />;
const pts = (p: number[][]) => p.map((q) => q.join(',')).join(' ');

/** Fél csillag csúcsai (bal fele, a tengely x = 0-nál). */
const halfStar = (R: number, r: number): number[][] => {
  const out: number[][] = [];
  for (let k = 0; k <= 5; k++) {
    const deg = -90 - 36 * k;
    const rad = (deg * Math.PI) / 180;
    const rr = k % 2 === 0 ? R : r;
    out.push([+(rr * Math.cos(rad)).toFixed(2), +(rr * Math.sin(rad)).toFixed(2)]);
  }
  return out;
};

export type HalfKind = 'heart' | 'tree' | 'house' | 'arrow' | 'circle' | 'butterfly' | 'triangle' | 'star';

/** Párosító: egy ábra bal fele a tengely mellett (x = 75). */
export const MiniHalf: React.FC<{ kind: HalfKind }> = ({ kind }) => {
  const X = 75;
  let art: React.ReactNode = null;
  if (kind === 'heart') art = <HalfHeart cx={X} cy={42} s={1.05} sw={3} />;
  if (kind === 'tree')
    art = (
      <g strokeLinejoin="round" strokeWidth="3">
        <rect x={X - 5} y={62} width={5} height={13} fill="#92400e" stroke="#78350f" />
        <path d={`M ${X} 8 L ${X - 26} 40 L ${X} 40 Z`} fill="#22c55e" stroke="#15803d" />
        <path d={`M ${X} 26 L ${X - 34} 62 L ${X} 62 Z`} fill="#22c55e" stroke="#15803d" />
      </g>
    );
  if (kind === 'house')
    art = (
      <g strokeLinejoin="round" strokeWidth="3">
        <path d={`M ${X} 6 L ${X - 40} 34 L ${X} 34 Z`} fill="#f87171" stroke="#991b1b" />
        <rect x={X - 34} y={34} width={34} height={40} fill="#fde68a" stroke="#a16207" />
        <rect x={X - 8} y={52} width={8} height={22} fill="#92400e" stroke="#78350f" />
      </g>
    );
  if (kind === 'arrow') art = <path d={`M ${X} 4 L ${X - 40} 40 L ${X - 15} 40 L ${X - 15} 76 L ${X} 76 Z`} fill="#a78bfa" stroke="#6d28d9" strokeWidth="3" strokeLinejoin="round" />;
  if (kind === 'circle') art = <path d={`M ${X} 6 A 34 34 0 0 0 ${X} 74 Z`} fill="#bbf7d0" stroke="#15803d" strokeWidth="3" />;
  if (kind === 'butterfly')
    art = (
      <g strokeWidth="3" strokeLinejoin="round">
        <path d={`M ${X - 2} 34 C ${X - 14} 0 ${X - 50} 0 ${X - 46} 28 C ${X - 44} 40 ${X - 20} 42 ${X - 2} 38 Z`} fill="#60a5fa" stroke="#1d4ed8" />
        <path d={`M ${X - 2} 42 C ${X - 22} 44 ${X - 40} 52 ${X - 32} 68 C ${X - 24} 78 ${X - 8} 68 ${X - 2} 50 Z`} fill="#facc15" stroke="#a16207" />
        <path d={`M ${X} 18 L ${X - 5} 22 L ${X - 5} 62 L ${X} 66 Z`} fill="#92400e" stroke="#78350f" />
      </g>
    );
  if (kind === 'triangle') art = <path d={`M ${X} 6 L ${X - 36} 74 L ${X} 74 Z`} fill="#fbcfe8" stroke="#be185d" strokeWidth="3" strokeLinejoin="round" />;
  if (kind === 'star') art = <polygon points={pts(halfStar(38, 15).map(([x, y]) => [X + x, 44 + y]))} fill="#fde047" stroke="#a16207" strokeWidth="3" strokeLinejoin="round" />;
  return (
    <M>
      {art}
      {ax(X)}
    </M>
  );
};

/** Párosító: pont a rácson, d kockányira a tengelytől. dir 'v': álló tengely (pont balra), 'h': fekvő tengely (pont fölötte). */
export const MiniDot: React.FC<{ d: number; dir?: 'v' | 'h' }> = ({ d, dir = 'v' }) => {
  const lines: React.ReactNode[] = [];
  if (dir === 'v') {
    const s = 17;
    const x0 = 7;
    const y0 = 14;
    for (let i = 0; i <= 8; i++) lines.push(<line key={`a${i}`} x1={x0 + i * s} y1={y0} x2={x0 + i * s} y2={y0 + 3 * s} stroke={GRIDLINE} strokeWidth="1.5" />);
    for (let j = 0; j <= 3; j++) lines.push(<line key={`b${j}`} x1={x0} y1={y0 + j * s} x2={x0 + 8 * s} y2={y0 + j * s} stroke={GRIDLINE} strokeWidth="1.5" />);
    return (
      <M>
        {lines}
        <line x1={x0 + 4 * s} y1={4} x2={x0 + 4 * s} y2={76} stroke={AXIS} strokeWidth="3.5" strokeDasharray="7 4" />
        <circle cx={x0 + (4 - d) * s} cy={y0 + 1.5 * s} r="7" fill="#ef4444" stroke="#1e293b" strokeWidth="2" />
      </M>
    );
  }
  const s = 13;
  const x0 = 23;
  const y0 = 9;
  for (let i = 0; i <= 8; i++) lines.push(<line key={`a${i}`} x1={x0 + i * s} y1={y0} x2={x0 + i * s} y2={y0 + 5 * s} stroke={GRIDLINE} strokeWidth="1.5" />);
  for (let j = 0; j <= 5; j++) lines.push(<line key={`b${j}`} x1={x0} y1={y0 + j * s} x2={x0 + 8 * s} y2={y0 + j * s} stroke={GRIDLINE} strokeWidth="1.5" />);
  return (
    <M>
      <rect x={x0} y={y0 + 4 * s} width={8 * s} height={s} fill="#bae6fd" />
      {lines}
      <line x1={x0 - 6} y1={y0 + 4 * s} x2={x0 + 8 * s + 6} y2={y0 + 4 * s} stroke={AXIS} strokeWidth="3.5" strokeDasharray="7 4" />
      <circle cx={x0 + 4 * s} cy={y0 + (4 - d) * s} r="6" fill="#f59e0b" stroke="#1e293b" strokeWidth="2" />
    </M>
  );
};

export type ShapeKind = 'para' | 'iso' | 'rect' | 'eq' | 'square' | 'pent' | 'hex' | 'circle' | 'scalene' | 'kite' | 'trapIso' | 'trapRight';

const regular = (n: number, cx: number, cy: number, R: number, rot = -90) =>
  Array.from({ length: n }, (_, k) => {
    const a = ((rot + (360 / n) * k) * Math.PI) / 180;
    return [+(cx + R * Math.cos(a)).toFixed(2), +(cy + R * Math.sin(a)).toFixed(2)];
  });

/** Síkidom-ikon; a 80 × 80-as dobozba (sorter) vagy a 150 × 80-as dobozba (matcher) rajzolva. */
const shapeArt = (kind: ShapeKind, cx: number, cy: number, k: number): React.ReactNode => {
  const sw = 3;
  const P = (p: number[][], fill: string, stroke: string) => <polygon points={pts(p.map(([x, y]) => [cx + x * k, cy + y * k]))} fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />;
  switch (kind) {
    case 'para':
      return P([[-14, -16], [34, -16], [14, 16], [-34, 16]], '#bfdbfe', '#1d4ed8');
    case 'iso':
      return P([[0, -32], [20, 30], [-20, 30]], '#bbf7d0', '#15803d');
    case 'rect':
      return P([[-34, -20], [34, -20], [34, 20], [-34, 20]], '#fde68a', '#a16207');
    case 'eq':
      return P(regular(3, 0, 6, 34).map(([x, y]) => [x, y]), '#fbcfe8', '#be185d');
    case 'square':
      return P([[-28, -28], [28, -28], [28, 28], [-28, 28]], '#bfdbfe', '#1d4ed8');
    case 'pent':
      return P(regular(5, 0, 3, 33), '#ddd6fe', '#6d28d9');
    case 'hex':
      return P(regular(6, 0, 0, 32, 0), '#fed7aa', '#c2410c');
    case 'circle':
      return <circle cx={cx} cy={cy} r={31 * k} fill="#bbf7d0" stroke="#15803d" strokeWidth={sw} />;
    case 'scalene':
      return P([[-30, 26], [32, 18], [-12, -30]], '#fbcfe8', '#be185d');
    case 'kite':
      return P([[0, -32], [22, -10], [0, 32], [-22, -10]], '#ddd6fe', '#6d28d9');
    case 'trapIso':
      return P([[-15, -20], [15, -20], [33, 20], [-33, 20]], '#fde68a', '#a16207');
    case 'trapRight':
      return P([[-30, -20], [8, -20], [32, 20], [-30, 20]], '#fed7aa', '#c2410c');
  }
};

/** Párosító: síkidom (150 × 80). */
export const MiniShape: React.FC<{ kind: ShapeKind }> = ({ kind }) => <M>{shapeArt(kind, 75, 40, 1.05)}</M>;
/** Csoportosító: síkidom (80 × 80). */
export const SortShape: React.FC<{ kind: ShapeKind }> = ({ kind }) => <S>{shapeArt(kind, 40, 40, 1.05)}</S>;

/** Csoportosító: betű. */
export const SortLetter: React.FC<{ ch: string }> = ({ ch }) => (
  <S>
    <path d={LETTER_PATHS[ch]} transform="translate(17 10) scale(1.07)" fill="none" stroke="#2563eb" strokeWidth={8 / 1.07} strokeLinecap="round" strokeLinejoin="round" />
  </S>
);

export type ObjKind = 'heart' | 'tree' | 'house' | 'arrowUp' | 'arrowRight' | 'triRight' | 'halfDisc' | 'flag' | 'scalene' | 'bolt';

/** Csoportosító: tárgy / ábra (80 × 80). */
export const SortObj: React.FC<{ kind: ObjKind }> = ({ kind }) => {
  let art: React.ReactNode = null;
  if (kind === 'heart') art = <Heart cx={40} cy={42} s={0.9} sw={3} />;
  if (kind === 'tree') art = <Tree cx={40} y={76} h={70} sw={3} />;
  if (kind === 'house') art = <House x={16} y={76} w={48} sw={3} />;
  if (kind === 'arrowUp') art = <BigArrow cx={40} cy={40} len={68} dir="up" sw={3} />;
  if (kind === 'arrowRight') art = <BigArrow cx={40} cy={40} len={68} dir="right" sw={3} />;
  if (kind === 'triRight') art = <polygon points="10,10 72,40 10,70" fill="#bbf7d0" stroke="#15803d" strokeWidth="3" strokeLinejoin="round" />;
  if (kind === 'halfDisc') art = <path d="M 22 8 A 32 32 0 0 1 22 72 Z" fill="#fde68a" stroke="#a16207" strokeWidth="3" />;
  if (kind === 'flag') art = <Flag x={20} y={76} h={70} sw={3} />;
  if (kind === 'scalene') art = <polygon points="8,70 74,58 28,8" fill="#fbcfe8" stroke="#be185d" strokeWidth="3" strokeLinejoin="round" />;
  if (kind === 'bolt') art = <polygon points="46,4 16,44 36,44 28,76 64,30 42,30" fill="#facc15" stroke="#a16207" strokeWidth="3" strokeLinejoin="round" />;
  return <S>{art}</S>;
};

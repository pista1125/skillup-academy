import React from 'react';
import { LogicPiece, LogicPiecePart, ArrowPart, Dir, walk, StarPart } from './GeoIntroG2Parts';

export type LineKind = 'egyenes' | 'gorbe' | 'torott' | 'zartgorbe' | 'zarttorott';

export const LINE_PATHS_150: Record<LineKind, string[]> = {
  egyenes: ['M 20 62 L 130 18', 'M 15 40 L 135 40', 'M 30 15 L 120 65'],
  gorbe: ['M 15 55 C 40 5, 70 75, 95 30 S 130 30, 138 50', 'M 20 60 Q 75 -10 130 60', 'M 15 40 C 35 10, 55 70, 75 40 S 115 10, 135 40'],
  torott: ['M 15 60 L 45 20 L 75 60 L 105 20 L 135 60', 'M 15 25 L 60 60 L 95 20 L 135 55', 'M 20 60 L 20 20 L 75 20 L 75 60 L 130 60'],
  zartgorbe: ['M 40 40 C 40 5, 115 5, 115 40 C 115 75, 40 75, 40 40 Z', 'M 30 45 C 20 10, 80 0, 95 25 C 130 20, 135 70, 90 68 C 60 78, 35 70, 30 45 Z', 'M 75 12 C 110 12, 120 68, 75 68 C 30 68, 40 12, 75 12 Z'],
  zarttorott: ['M 40 65 L 75 12 L 110 65 Z', 'M 30 20 L 120 20 L 120 62 L 30 62 Z', 'M 75 10 L 120 32 L 105 70 L 45 70 L 30 32 Z']
};

const LINE_COLORS: Record<LineKind, string> = {
  egyenes: '#2563eb',
  gorbe: '#db2777',
  torott: '#16a34a',
  zartgorbe: '#7c3aed',
  zarttorott: '#ea580c'
};

/** 150 × 80 vonal-kártya. */
export const LineCard150: React.FC<{ kind: LineKind; v?: number }> = ({ kind, v = 0 }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="144" height="74" rx="10" fill="#f8fafc" stroke="#334155" strokeWidth="2.5" />
    <path
      d={LINE_PATHS_150[kind][v % 3]}
      fill="none"
      stroke={LINE_COLORS[kind]}
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** 80 × 80 vonal-kártya (a 150-es rajz kicsinyítve). */
export const LineCard80: React.FC<{ kind: LineKind; v?: number; color?: string }> = ({ kind, v = 0, color }) => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="74" height="74" rx="10" fill="#f8fafc" stroke="#334155" strokeWidth="2.5" />
    <g transform="translate(4 18) scale(0.48)">
      <path
        d={LINE_PATHS_150[kind][v % 3]}
        fill="none"
        stroke={color ?? LINE_COLORS[kind]}
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

/** 150 × 80 nyíl-kártya. */
export const ArrowCard150: React.FC<{ dir: Dir }> = ({ dir }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="144" height="74" rx="10" fill="#eff6ff" stroke="#1d4ed8" strokeWidth="2.5" />
    <ArrowPart dir={dir} cx={75} cy={40} size={26} color="#1d4ed8" />
  </svg>
);

/** 150 × 80 logikai lap kártya. */
export const PieceCard150: React.FC<{ piece: LogicPiece }> = ({ piece }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="144" height="74" rx="10" fill="#f8fafc" stroke="#334155" strokeWidth="2.5" />
    <LogicPiecePart piece={piece} cx={75} cy={42} unit={26} />
  </svg>
);

/** 80 × 80 logikai lap kártya. */
export const PieceCard80: React.FC<{ piece: LogicPiece }> = ({ piece }) => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="74" height="74" rx="10" fill="#f8fafc" stroke="#334155" strokeWidth="2.5" />
    <LogicPiecePart piece={piece} cx={40} cy={42} unit={24} />
  </svg>
);

/** 150 × 80 útvonal-kártya: robotpont -> csillag a rácson (5 × 3). */
export const PathCard150: React.FC<{ start: [number, number]; dirs: Dir[] }> = ({ start, dirs }) => {
  const cell = 22;
  const x0 = 20;
  const y0 = 7;
  const pts = walk(start, dirs);
  const c = (v: number) => v * cell + cell / 2;
  const end = pts[pts.length - 1];
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="144" height="74" rx="10" fill="#f8fafc" stroke="#334155" strokeWidth="2.5" />
      {Array.from({ length: 3 }, (_, r) =>
        Array.from({ length: 5 }, (_, cc) => (
          <rect key={`${cc}-${r}`} x={x0 + cc * cell} y={y0 + r * cell} width={cell} height={cell} fill="#ffffff" stroke="#93c5fd" strokeWidth="1.2" />
        ))
      )}
      <polyline
        points={pts.map(([cc, r]) => `${x0 + c(cc)},${y0 + c(r)}`).join(' ')}
        fill="none"
        stroke="#f97316"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={x0 + c(start[0])} cy={y0 + c(start[1])} r="6" fill="#dc2626" />
      <StarPart cx={x0 + c(end[0])} cy={y0 + c(end[1])} r={9} />
    </svg>
  );
};

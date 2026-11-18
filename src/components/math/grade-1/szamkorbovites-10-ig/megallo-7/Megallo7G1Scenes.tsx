// „Megálló (7)” – saját képek: dobókocka, sorminta. A többit az `a-het/AHetG1Scenes.tsx` adja.
import React from 'react';
import { Domino } from '../../shared/G1Pics';

const FONT = 'system-ui, sans-serif';

export type ShapeKind = 'kor' | 'haromszog' | 'negyzet';
export type Shape = { k: ShapeKind; c: string } | '?';

export const COLORS = { piros: '#ef4444', kek: '#3b82f6', zold: '#22c55e', sarga: '#facc15' };

const shapeG = (s: Exclude<Shape, '?'>, cx: number, cy: number, key?: React.Key) => {
  const st = { fill: s.c, stroke: '#1f2937', strokeWidth: 3 };
  if (s.k === 'kor') return <circle key={key} cx={cx} cy={cy} r="22" {...st} />;
  if (s.k === 'negyzet') return <rect key={key} x={cx - 21} y={cy - 21} width="42" height="42" {...st} />;
  return <path key={key} d={`M${cx} ${cy - 24} L${cx + 25} ${cy + 20} L${cx - 25} ${cy + 20} Z`} {...st} strokeLinejoin="round" />;
};

/** Forma-sorminta, a „?” helyére kell a következő. */
export const ShapeRow: React.FC<{ items: Shape[] }> = ({ items }) => {
  const w = items.length * 64 + 16;
  return (
    <svg viewBox={`0 0 ${w} 90`} className="w-full max-w-[460px] h-auto mx-auto">
      <rect x="0" y="0" width={w} height="90" rx="16" fill="#f8fafc" />
      {items.map((s, i) =>
        s === '?' ? (
          <g key={i}>
            <rect x={14 + i * 64} y="17" width="56" height="56" rx="12" fill="#ede9fe" stroke="#7c3aed" strokeWidth="3" strokeDasharray="6 4" />
            <text x={42 + i * 64} y="60" textAnchor="middle" fontSize="36" fontWeight="900" fill="#7c3aed" fontFamily={FONT}>?</text>
          </g>
        ) : (
          shapeG(s, 42 + i * 64, 47, i)
        )
      )}
    </svg>
  );
};

/** Egy forma kártyán (válaszlehetőség). */
export const ShapeCard: React.FC<{ s: Exclude<Shape, '?'> }> = ({ s }) => (
  <svg viewBox="0 0 70 70" className="w-16 h-16">
    {shapeG(s, 35, 37)}
  </svg>
);

/** Dobókocka: felül a `top` lap, alatta (szemközt, alul) „?” vagy a `bottom` lap. */
export const DieScene: React.FC<{ top: number; bottom?: number }> = ({ top, bottom }) => (
  <svg viewBox="0 0 360 150" className="w-full max-w-[400px] h-auto mx-auto">
    <rect x="0" y="0" width="360" height="150" rx="18" fill="#fef3c7" />
    <text x="70" y="26" textAnchor="middle" fontSize="18" fontWeight="800" fill="#92400e" fontFamily={FONT}>fent</text>
    <svg x="20" y="34" width="100" height="100" viewBox="0 0 80 80">
      <Domino left={top} single className="" />
    </svg>
    <text x="180" y="96" textAnchor="middle" fontSize="44" fontWeight="900" fill="#1e293b" fontFamily={FONT}>+</text>
    <text x="290" y="26" textAnchor="middle" fontSize="18" fontWeight="800" fill="#92400e" fontFamily={FONT}>lent</text>
    {bottom === undefined ? (
      <g>
        <rect x="240" y="34" width="100" height="100" rx="14" fill="#ede9fe" stroke="#7c3aed" strokeWidth="4" strokeDasharray="8 5" />
        <text x="290" y="100" textAnchor="middle" fontSize="54" fontWeight="900" fill="#7c3aed" fontFamily={FONT}>?</text>
      </g>
    ) : (
      <svg x="240" y="34" width="100" height="100" viewBox="0 0 80 80">
        <Domino left={bottom} single className="" />
      </svg>
    )}
  </svg>
);

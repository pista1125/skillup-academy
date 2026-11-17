import React from 'react';
import { FONT, UNK } from '../mit-mivel-merunk/WhatToMeasureG3Parts';

export { FONT, UNK };

/**
 * Nagy, feliratos mérőkancsó: 1 l, dl-beosztás (1–10 dl), opcionális cl-vonalak.
 * x, y: bal felső sarok; h: belső magasság (10 dl); cl: a folyadék cl-ben (0–100).
 */
export const BigJug: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  cl: number;
  labels?: boolean;
  clTicks?: boolean;
  color?: string;
  qFrom?: number;
}> = ({ x, y, w = 90, h = 150, cl, labels = true, clTicks = false, color = '#7dd3fc', qFrom }) => {
  const bottom = y + h + 8;
  const top = y + 8;
  const lvl = (c: number) => bottom - (Math.min(c, 100) / 100) * h;
  return (
    <g fontFamily={FONT}>
      <path d={`M${x + w} ${top + 24} Q${x + w + 34} ${top + 30} ${x + w + 30} ${top + 70} Q${x + w + 26} ${top + 104} ${x + w} ${top + 110}`} fill="none" stroke="#475569" strokeWidth="5" />
      {cl > 0 && <rect x={x + 2} y={lvl(cl)} width={w - 4} height={bottom - lvl(cl)} fill={color} />}
      <path d={`M${x} ${y - 4} L${x + w} ${y - 4} L${x + w} ${bottom} L${x} ${bottom} Z`} fill="none" stroke="#334155" strokeWidth="3" />
      {clTicks &&
        Array.from({ length: 100 }, (_, i) => i + 1)
          .filter((i) => i % 10 !== 0)
          .map((i) => <line key={`c${i}`} x1={x} y1={lvl(i)} x2={x + (i % 5 === 0 ? 12 : 7)} y2={lvl(i)} stroke="#1e3a8a" strokeWidth="0.7" />)}
      {Array.from({ length: 10 }, (_, i) => {
        const d = i + 1;
        const yy = lvl(d * 10);
        return (
          <g key={d}>
            <line x1={x} y1={yy} x2={x + (d === 10 ? 40 : d === 5 ? 30 : 22)} y2={yy} stroke={d === 10 ? '#dc2626' : '#1e3a8a'} strokeWidth="2" />
            {labels && (
              <text x={x + (d === 10 ? 44 : d === 5 ? 34 : 26)} y={yy + 4} fontSize="10.5" fontWeight="bold" fill={d === 10 ? '#dc2626' : '#1e3a8a'}>
                {d === 10 ? '1 l' : `${d} dl`}
              </text>
            )}
          </g>
        );
      })}
      {qFrom !== undefined && (
        <g>
          <path d={`M${x - 6} ${lvl(100)} L${x - 12} ${lvl(100)} L${x - 12} ${lvl(qFrom)} L${x - 6} ${lvl(qFrom)}`} fill="none" stroke={UNK} strokeWidth="2" />
          <text x={x - 16} y={(lvl(100) + lvl(qFrom)) / 2 + 6} textAnchor="end" fontSize="18" fontWeight="bold" fill={UNK}>?</text>
        </g>
      )}
    </g>
  );
};

/** Álló oszlopdiagram (cl). */
export const ClBarChart: React.FC<{ data: { name: string; v: number; color: string }[]; max?: number; x?: number; y?: number; h?: number; bw?: number; gap?: number; showQ?: number }> = ({
  data,
  max = 60,
  x = 40,
  y = 14,
  h = 120,
  bw = 34,
  gap = 22,
  showQ
}) => {
  const unit = h / max;
  const W = data.length * (bw + gap) + gap;
  return (
    <g fontFamily={FONT}>
      {Array.from({ length: max / 10 + 1 }, (_, i) => (
        <g key={i}>
          <line x1={x} y1={y + h - i * 10 * unit} x2={x + W} y2={y + h - i * 10 * unit} stroke={i === 0 ? '#334155' : '#e2e8f0'} strokeWidth={i === 0 ? 1.5 : 1} />
          <text x={x - 5} y={y + h - i * 10 * unit + 3.5} textAnchor="end" fontSize="9.5" fill="#334155">{i * 10}</text>
        </g>
      ))}
      <line x1={x} y1={y - 4} x2={x} y2={y + h} stroke="#334155" strokeWidth="1.5" />
      <text x={x - 5} y={y - 6} textAnchor="end" fontSize="9.5" fontWeight="bold" fill="#334155">cl</text>
      {data.map((d, i) => {
        const bx = x + gap + i * (bw + gap);
        return (
          <g key={d.name}>
            <rect x={bx} y={y + h - d.v * unit} width={bw} height={d.v * unit} fill={d.color} stroke="#1e293b" strokeWidth="1" />
            <text x={bx + bw / 2} y={y + h + 14} textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#0f172a">{d.name}</text>
            {showQ === i && (
              <text x={bx + bw / 2} y={y + h - d.v * unit - 5} textAnchor="middle" fontSize="13" fontWeight="bold" fill={UNK}>?</text>
            )}
          </g>
        );
      })}
    </g>
  );
};

/** Saját adat: gyümölcsital hozzávalói (cl). Összesen 100 cl = 1 l. */
export const DRINK = [
  { name: 'almalé', v: 40, color: '#bef264' },
  { name: 'narancslé', v: 30, color: '#fdba74' },
  { name: 'víz', v: 20, color: '#bae6fd' },
  { name: 'citromlé', v: 10, color: '#fde047' }
];

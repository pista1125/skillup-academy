import React from 'react';
import { FONT, Region, LogicBlock, Block } from './VennG3Parts';

// Kis, vastag vonalas kártyaábrák a Párosító (150 × 80) és a Csoportosító (80 × 80) játékhoz.

const MA = { cx: 60, cy: 49, r: 27 };
const MB = { cx: 90, cy: 49, r: 27 };
const SPOT: Record<Region, [number, number]> = { a: [46, 49], ab: [75, 49], b: [104, 49], out: [136, 66] };
const lfs = (t: string) => Math.min(13, 68 / (t.length * 0.62));

/**
 * Mini halmazábra két karikával. A címkék a karikák fölött.
 * shade: színezett rész; mark: csillag a részben; counts: számok a részekben.
 */
export const MiniVenn: React.FC<{
  id: string;
  a: string;
  b: string;
  shade?: Region;
  mark?: Region;
  counts?: Partial<Record<Region, number | string>>;
}> = ({ id, a, b, shade, mark, counts }) => {
  const fill = '#c4b5fd';
  const circ = (c: typeof MA, f: string, stroke?: string) => <circle cx={c.cx} cy={c.cy} r={c.r} fill={f} stroke={stroke} strokeWidth={stroke ? 3 : 0} />;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <defs>
        <clipPath id={`${id}-a`}>{circ(MA, '#000')}</clipPath>
      </defs>
      <rect x="2" y="2" width="146" height="76" rx="8" fill={shade === 'out' ? fill : '#ffffff'} stroke="#15803d" strokeWidth="3" />
      {circ(MA, shade === 'a' ? fill : '#ffffff')}
      {circ(MB, shade === 'b' ? fill : '#ffffff')}
      <g clipPath={`url(#${id}-a)`}>{circ(MB, shade === 'ab' ? fill : '#ffffff')}</g>
      {circ(MA, 'none', '#dc2626')}
      {circ(MB, 'none', '#2563eb')}
      <text x="8" y="16" textAnchor="start" fontSize={lfs(a)} fontWeight="bold" fill="#0f172a">{a}</text>
      <text x="142" y="16" textAnchor="end" fontSize={lfs(b)} fontWeight="bold" fill="#0f172a">{b}</text>
      {mark && (
        <path
          d={`M${SPOT[mark][0]} ${SPOT[mark][1] - 9} l2.6 6 6.4 0.5 -4.9 4.2 1.5 6.3 -5.6 -3.4 -5.6 3.4 1.5 -6.3 -4.9 -4.2 6.4 -0.5 Z`}
          fill="#f59e0b"
          stroke="#78350f"
          strokeWidth="1.5"
        />
      )}
      {counts &&
        (Object.keys(counts) as Region[]).map((r) => (
          <text key={r} x={SPOT[r][0]} y={SPOT[r][1] + 7} textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0f172a">
            {counts[r]}
          </text>
        ))}
    </svg>
  );
};

/** Egy logikai lap (párosító vagy csoportosító kártya). */
export const VBlockCard: React.FC<{ b: Block; small?: boolean }> = ({ b, small = false }) => {
  const W = small ? 80 : 150;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg">
      <LogicBlock b={b} x={W / 2} y={40} k={1.5} sw={3.5} />
    </svg>
  );
};

/** Szám nagy számjegyekkel; az egyesek helyén álló számjegy színes (a páros / páratlan döntéshez). */
export const NumHintCard: React.FC<{ n: number }> = ({ n }) => {
  const s = String(n);
  const head = s.slice(0, -1);
  const last = s.slice(-1);
  const fs = s.length > 2 ? 26 : 30;
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="4" y="16" width="72" height="48" rx="10" fill="#fff7ed" stroke="#ea580c" strokeWidth="3" />
      <text x="40" y={40 + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight="bold" fill="#0f172a">
        {head}
        <tspan fill="#ea580c">{last}</tspan>
      </text>
    </svg>
  );
};

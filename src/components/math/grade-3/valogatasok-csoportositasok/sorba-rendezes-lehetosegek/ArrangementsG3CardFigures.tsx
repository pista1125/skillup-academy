import React from 'react';
import { FONT, Block, LogicBlock, Ball, DigitCard, Kid, Tower, Shirt, Pants, Scoop, PalName } from './ArrangementsG3Parts';

// Kis, vastag vonalas kártyaábrák a Párosító (150 × 80) és a Csoportosító (80 × 80) játékhoz.

const W = (small?: boolean) => (small ? 80 : 150);

/** Számkártyák egymás mellett. */
export const CardsCard: React.FC<{ digits: (string | number)[]; small?: boolean }> = ({ digits, small = false }) => {
  const w = W(small);
  const n = digits.length;
  const cw = small ? (n > 2 ? 22 : 28) : 34;
  const gap = small ? 3 : 8;
  const x0 = (w - (n * cw + (n - 1) * gap)) / 2;
  return (
    <svg viewBox={`0 0 ${w} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {digits.map((d, i) => (
        <DigitCard key={i} x={x0 + i * (cw + gap)} y={small ? 18 : 14} d={d} w={cw} h={small ? 44 : 52} fs={small ? 24 : 30} fill={String(d) === '0' ? '#fef3c7' : '#ffffff'} />
      ))}
    </svg>
  );
};

/** Golyók sorban (amiket sorba rakunk). */
export const BallsCard: React.FC<{ balls: PalName[]; small?: boolean }> = ({ balls, small = false }) => {
  const w = W(small);
  const n = balls.length;
  const r = small ? (n > 3 ? 8.5 : n > 2 ? 11 : 14) : n > 3 ? 14 : 17;
  const step = small ? r * 2 + 3 : n > 3 ? 34 : 44;
  const x0 = w / 2 - ((n - 1) * step) / 2;
  return (
    <svg viewBox={`0 0 ${w} 80`} xmlns="http://www.w3.org/2000/svg">
      {balls.map((c, i) => (
        <Ball key={i} x={x0 + i * step} y={40} r={r} c={c} sw={3} />
      ))}
    </svg>
  );
};

/** Gyerekek egymás mellett (sorba állnak). */
export const KidsCard: React.FC<{ kids: PalName[]; small?: boolean }> = ({ kids, small = false }) => {
  const w = W(small);
  const n = kids.length;
  const step = small ? 26 : 40;
  const x0 = w / 2 - ((n - 1) * step) / 2;
  return (
    <svg viewBox={`0 0 ${w} 80`} xmlns="http://www.w3.org/2000/svg">
      {kids.map((c, i) => (
        <Kid key={i} x={x0 + i * step} y={74} c={c} h={small ? 50 : 64} />
      ))}
    </svg>
  );
};

/** Pólók (felső sor) és nadrágok (alsó sor). */
export const OutfitCard: React.FC<{ shirts: PalName[]; pants: PalName[]; small?: boolean }> = ({ shirts, pants, small = false }) => {
  const w = W(small);
  const row = (items: PalName[], y: number, kind: 'shirt' | 'pants') => {
    const n = items.length;
    const r = small ? (n > 3 ? 7.5 : n > 2 ? 9 : 10) : n > 3 ? 11 : 12;
    const step = small ? (n > 3 ? 18 : 24) : n > 3 ? 28 : 32;
    const x0 = w / 2 - ((n - 1) * step) / 2;
    return items.map((c, i) =>
      kind === 'shirt' ? <Shirt key={i} x={x0 + i * step} y={y} c={c} r={r} sw={2.5} /> : <Pants key={i} x={x0 + i * step} y={y} c={c} r={r} sw={2.5} />
    );
  };
  return (
    <svg viewBox={`0 0 ${w} 80`} xmlns="http://www.w3.org/2000/svg">
      {row(shirts, 21, 'shirt')}
      {row(pants, 59, 'pants')}
    </svg>
  );
};

/** Útvonalak: A-ból B-be a utak, B-ből C-be b utak. */
export const PathsCard: React.FC<{ a: number; b: number; small?: boolean }> = ({ a, b, small = false }) => {
  const w = W(small);
  const xA = small ? 8 : 14;
  const xB = w / 2;
  const xC = w - (small ? 8 : 14);
  const arcs = (x1: number, x2: number, n: number, c: string) =>
    Array.from({ length: n }, (_, i) => {
      const amp = small ? 22 : 30;
      const off = n === 1 ? 0 : -amp + (2 * amp * i) / (n - 1);
      return <path key={i} d={`M${x1} 40 Q${(x1 + x2) / 2} ${40 + off * 2} ${x2} 40`} fill="none" stroke={c} strokeWidth="3.5" strokeLinecap="round" />;
    });
  return (
    <svg viewBox={`0 0 ${w} 80`} xmlns="http://www.w3.org/2000/svg">
      {arcs(xA, xB, a, '#0ea5e9')}
      {arcs(xB, xC, b, '#f97316')}
      <circle cx={xA} cy="40" r={small ? 6 : 8} fill="#16a34a" stroke="#14532d" strokeWidth="2.5" />
      <circle cx={xB} cy="40" r={small ? 6 : 8} fill="#facc15" stroke="#854d0e" strokeWidth="2.5" />
      <circle cx={xC} cy="40" r={small ? 6 : 8} fill="#dc2626" stroke="#7f1d1d" strokeWidth="2.5" />
    </svg>
  );
};

/** Kockatornyok (sorba rendezéshez). */
export const TowersCard: React.FC<{ heights: number[]; small?: boolean; letters?: boolean }> = ({ heights, small = false, letters = false }) => {
  const w = W(small);
  const n = heights.length;
  const s = small ? 8 : 9;
  const step = small ? (n > 3 ? 17 : 22) : 32;
  const x0 = w / 2 - ((n - 1) * step) / 2;
  const cols: PalName[] = ['piros', 'kek', 'zold', 'sarga'];
  return (
    <svg viewBox={`0 0 ${w} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <line x1="4" y1={letters ? 60 : 74} x2={w - 4} y2={letters ? 60 : 74} stroke="#334155" strokeWidth="3" />
      {heights.map((h, i) => (
        <g key={i}>
          <Tower x={x0 + i * step} y={letters ? 60 : 74} n={h} s={s} c={cols[i % 4]} />
          {letters && (
            <text x={x0 + i * step} y="78" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0f172a">
              {'ABCD'[i]}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
};

/** Fagylaltgombócok (ízek). */
export const ScoopsCard: React.FC<{ flavours: PalName[]; small?: boolean }> = ({ flavours, small = false }) => {
  const w = W(small);
  const n = flavours.length;
  const step = small ? (n > 3 ? 19 : 22) : 34;
  const x0 = w / 2 - ((n - 1) * step) / 2;
  return (
    <svg viewBox={`0 0 ${w} 80`} xmlns="http://www.w3.org/2000/svg">
      {flavours.map((c, i) => (
        <Scoop key={i} x={x0 + i * step} y={26} c={c} r={small ? (n > 3 ? 8 : 9) : 13} />
      ))}
    </svg>
  );
};

/** Három logikai lap egy keretben. */
export const BlocksCard: React.FC<{ blocks: Block[]; small?: boolean }> = ({ blocks, small = false }) => {
  const w = W(small);
  const n = blocks.length;
  const k = small ? 0.62 : 0.85;
  const step = (w - 12) / n;
  const POS3 = [
    [22, 24],
    [58, 24],
    [40, 57]
  ];
  return (
    <svg viewBox={`0 0 ${w} 80`} xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width={w - 4} height="76" rx="12" fill="#f8fafc" stroke="#94a3b8" strokeWidth="3" />
      {blocks.map((b, i) =>
        small && n === 3 ? (
          <LogicBlock key={i} b={b} x={POS3[i][0]} y={POS3[i][1]} k={0.6} sw={2.5} />
        ) : (
          <LogicBlock key={i} b={b} x={6 + step * (i + 0.5)} y={40} k={k} sw={2.5} />
        )
      )}
    </svg>
  );
};

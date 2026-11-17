import React from 'react';
import { FONT, RectShape, GridRect, LONG, SHORT } from './RectPerimeterG3Parts';

// ---------------------------------------------------------------------------
// 6. A téglalap és a négyzet kerülete – ábrák (3. osztály)
// ---------------------------------------------------------------------------

/** A téglalap szemben lévő oldalai egyenlők; 4 derékszöge van. (6 cm × 3 cm, 1 cm = 30 px) */
export const RectOppositeSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto mx-auto' }) => (
  <svg viewBox="0 0 380 190" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="378" height="188" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    <RectShape x={56} y={40} w={180} h={90} labels={['6 cm', '3 cm', '6 cm', '3 cm']} fontSize={14} />
    <text x="284" y="66" fontSize="13" fontWeight="bold" fill={LONG}>kék = kék</text>
    <text x="284" y="88" fontSize="13" fontWeight="bold" fill={SHORT}>piros = piros</text>
    <text x="284" y="112" fontSize="12" fill="#334155">4 derékszög</text>
    <text x="190" y="176" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f172a">A szemben lévő oldalak egyenlők.</text>
  </svg>
);

/** Kétféleképpen rakjuk egymás után a téglalap oldalait: 6 + 3 + 6 + 3 és 6 + 6 + 3 + 3. */
export const RectUnfoldSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto mx-auto' }) => {
  const k = 17;
  const rows: [number[], number][] = [
    [[6, 3, 6, 3], 34],
    [[6, 6, 3, 3], 96]
  ];
  return (
    <svg viewBox="0 0 380 190" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="378" height="188" rx="14" fill="#f0f9ff" stroke="#bae6fd" />
      {rows.map(([parts, y], ri) => {
        let x = 36;
        return (
          <g key={ri}>
            <text x="14" y={y + 5} fontSize="13" fontWeight="bold" fill="#334155">{ri === 0 ? 'A)' : 'B)'}</text>
            {parts.map((p, i) => {
              const a = x;
              x += p * k;
              return (
                <g key={i}>
                  <line x1={a} y1={y} x2={x} y2={y} stroke={p === 6 ? LONG : SHORT} strokeWidth="7" />
                  <line x1={a} y1={y - 9} x2={a} y2={y + 9} stroke="#1e293b" strokeWidth="1.5" />
                  <text x={(a + x) / 2} y={y + 26} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">{p} cm</text>
                </g>
              );
            })}
            <line x1={x} y1={y - 9} x2={x} y2={y + 9} stroke="#1e293b" strokeWidth="1.5" />
          </g>
        );
      })}
      <text x="100" y="156" textAnchor="middle" fontSize="14" fill="#334155">A) 6 + 3 + 6 + 3 = 18</text>
      <text x="280" y="156" textAnchor="middle" fontSize="14" fill="#334155">B) 6 + 6 + 3 + 3 = 18</text>
      <text x="190" y="178" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">Mindkét úton 18 cm a kerület.</text>
    </svg>
  );
};

/** A négyzet: minden oldala egyenlő. 4 · 4 cm = 16 cm. */
export const SquarePerimeterSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto mx-auto' }) => (
  <svg viewBox="0 0 380 190" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="378" height="188" rx="14" fill="#f0fdf4" stroke="#bbf7d0" />
    <RectShape x={70} y={36} w={116} h={116} labels={['4 cm', '4 cm', '4 cm', '4 cm']} fill="#dcfce7" fontSize={14} same />
    <text x="236" y="70" fontSize="14" fontWeight="bold" fill="#15803d">Négyzet:</text>
    <text x="236" y="92" fontSize="13" fill="#334155">minden oldala</text>
    <text x="236" y="110" fontSize="13" fill="#334155">egyforma hosszú.</text>
    <text x="236" y="140" fontSize="14" fontWeight="bold" fill="#0f172a">4 + 4 + 4 + 4</text>
    <text x="236" y="162" fontSize="14" fontWeight="bold" fill="#0f172a">= 4 · 4 = 16 cm</text>
  </svg>
);

/** Három különböző téglalap, ugyanakkora kerülettel: 14 egység. */
export const SamePerimeterSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto mx-auto' }) => (
  <svg viewBox="0 0 380 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="378" height="168" rx="14" fill="#fefce8" stroke="#fde68a" />
    <GridRect x={14} y={18} s={20} cols={17} rows={5} c0={0} r0={1} w={6} h={1} />
    <GridRect x={14} y={18} s={20} cols={17} rows={5} c0={7} r0={1} w={5} h={2} fill="#bbf7d0" stroke="#15803d" />
    <GridRect x={14} y={18} s={20} cols={17} rows={5} c0={13} r0={1} w={4} h={3} fill="#fbcfe8" stroke="#be185d" />
    <text x="74" y="140" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1d4ed8">6 + 1 + 6 + 1</text>
    <text x="204" y="140" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#15803d">5 + 2 + 5 + 2</text>
    <text x="324" y="140" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#be185d">4 + 3 + 4 + 3</text>
    <text x="190" y="160" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">Mindhárom kerülete 14 egység!</text>
  </svg>
);

/** Medence 25 m × 12 m: körbesétálunk. 25 + 12 + 25 + 12 = 74 m. */
export const PoolSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto mx-auto' }) => (
  <svg viewBox="0 0 380 190" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="378" height="188" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    <RectShape x={60} y={36} w={200} h={96} labels={['25 m', '12 m', null, null]} fill="#bae6fd" fontSize={14} />
    {[0, 1, 2].map((i) => (
      <path key={i} d={`M ${80 + i * 55} ${70 + (i % 2) * 22} q 12 -8 24 0 q 12 8 24 0`} fill="none" stroke="#0284c7" strokeWidth="2" />
    ))}
    <text x="190" y="160" textAnchor="middle" fontSize="13" fill="#334155">A szemben lévő oldalak is 25 m és 12 m.</text>
    <text x="190" y="180" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">25 + 12 + 25 + 12 = 74 m</text>
  </svg>
);

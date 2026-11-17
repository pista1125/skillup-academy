import React from 'react';
import { FONT, INK, UNK, Blocks, PlaceTable, NumLine, CoinSet, Plates } from './Count200ExamG3Parts';

type P = { className?: string };
const Frame: React.FC<{ h: number; className?: string; children?: React.ReactNode }> = ({ h, className = 'w-full h-auto', children }) => (
  <svg viewBox={`0 0 240 ${h}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="238" height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** 176 = 1 százas + 7 tízes + 6 egyes. */
export const Count200BlocksSvg: React.FC<P> = ({ className }) => (
  <Frame h={170} className={className}>
    <Blocks h={1} t={7} e={6} y={14} s={50} />
    <PlaceTable digits={['1', '7', '6']} y={76} />
    <text x="120" y="160" textAnchor="middle" fontSize="12" fontWeight="bold" fill={INK}>
      176 = 100 + 70 + 6
    </text>
  </Frame>
);

/** Számegyenes 100-tól 200-ig. */
export const Count200NumberLineSvg: React.FC<P> = ({ className }) => (
  <Frame h={100} className={className}>
    <text x="120" y="18" textAnchor="middle" fontSize="11" fill="#334155">
      Egy kis osztás 10-et ér.
    </text>
    <NumLine from={100} to={200} step={10} labelEvery={5} y={64} marks={[{ v: 130, label: '130' }, { v: 170, label: '170' }]} />
  </Frame>
);

/** Kerekítés tízesre: 147 ≈ 150, 145 ≈ 150, 143 ≈ 140. */
export const Count200RoundingSvg: React.FC<P> = ({ className }) => (
  <Frame h={120} className={className}>
    <NumLine
      from={140}
      to={150}
      step={1}
      labelEvery={5}
      y={58}
      x={30}
      w={176}
      marks={[
        { v: 143, label: '143', color: '#0891b2' },
        { v: 147, label: '147', color: '#dc2626' }
      ]}
    />
    <g fontSize="12" fontWeight="bold" textAnchor="middle">
      <text x="50" y="96" fill="#0891b2">143 ≈ 140</text>
      <text x="120" y="96" fill="#dc2626">147 ≈ 150</text>
      <text x="190" y="96" fill={INK}>145 ≈ 150</text>
    </g>
    <text x="120" y="112" textAnchor="middle" fontSize="10" fill="#334155">
      Ha az egyesek helyén 5 áll, felfelé kerekítünk.
    </text>
  </Frame>
);

/** 60 + 50 két lépésben: 60 + 40 = 100, 100 + 10 = 110. */
export const Count200AddSubSvg: React.FC<P> = ({ className }) => {
  const sx = (v: number) => 20 + ((v - 50) / 70) * 196;
  return (
    <Frame h={110} className={className}>
      <NumLine from={50} to={120} step={10} y={74} />
      <path d={`M ${sx(60)} 70 Q ${(sx(60) + sx(100)) / 2} 30 ${sx(100)} 70`} fill="none" stroke="#f97316" strokeWidth="2" />
      <path d={`M ${sx(100)} 70 Q ${(sx(100) + sx(110)) / 2} 50 ${sx(110)} 70`} fill="none" stroke="#16a34a" strokeWidth="2" />
      <text x={(sx(60) + sx(100)) / 2} y="40" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#c2410c">
        + 40
      </text>
      <text x={(sx(100) + sx(110)) / 2 + 4} y="54" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#15803d">
        + 10
      </text>
      <text x="120" y="18" textAnchor="middle" fontSize="12" fontWeight="bold" fill={INK}>
        60 + 50 = 60 + 40 + 10 = 110
      </text>
    </Frame>
  );
};

/** 4 · 30 = 120 és 120 : 4 = 30 tányérokkal. */
export const Count200MulDivSvg: React.FC<P> = ({ className }) => (
  <Frame h={120} className={className}>
    <text x="120" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill={INK}>
      4 tányér, mindegyiken 3 tízes
    </text>
    <Plates n={4} rods={3} y={56} r={24} />
    <text x="120" y="100" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#b45309">
      4 · 30 = 120
    </text>
    <text x="120" y="114" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#7c3aed">
      120 : 4 = 30
    </text>
  </Frame>
);

/** Pénz: 100 + 50 + 20 + 5 = 175 Ft. */
export const Count200MoneySvg: React.FC<P> = ({ className }) => (
  <Frame h={90} className={className}>
    <CoinSet values={[100, 50, 20, 5]} y={36} r={17} />
    <text x="120" y="78" textAnchor="middle" fontSize="13" fontWeight="bold" fill={INK}>
      100 + 50 + 20 + 5 = <tspan fill={UNK}>175 Ft</tspan>
    </text>
  </Frame>
);

import React from 'react';
import { FONT, NLine, Hop, Grasshopper, Tape } from './NumberLine200G3Parts';

// ---------------------------------------------------------------------------
// 2. Számok helye a számegyenesen – ábrák (3. osztály)
// ---------------------------------------------------------------------------

/** A számegyenes 0-tól 200-ig, tízesével; néhány szám helye betűvel. */
export const NumberLine0to200Svg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-lg h-auto mx-auto' }) => (
  <svg viewBox="0 0 360 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="148" rx="14" fill="#f0fdf4" stroke="#bbf7d0" />
    <NLine
      x0={22}
      x1={326}
      y={70}
      lo={0}
      step={10}
      n={20}
      big={50}
      labels={[0, 5, 10, 15, 20]}
      marks={[
        { i: 4, text: 'A', color: '#2563eb', kind: 'dot' },
        { i: 9, text: 'B', color: '#2563eb', kind: 'dot' },
        { i: 13, text: 'C', color: '#2563eb', kind: 'dot' },
        { i: 17.5, text: 'D', color: '#2563eb', kind: 'dot' }
      ]}
    />
    <text x="180" y="24" textAnchor="middle" fontSize="12.5" fill="#14532d">Egy osztás 10-et ér.</text>
    <text x="180" y="122" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#1e3a8a">A = 40,  B = 90,  C = 130,  D = 175</text>
    <text x="180" y="140" textAnchor="middle" fontSize="11" fill="#475569">jobbra haladva a számok nőnek</text>
  </svg>
);

/** Ránagyítunk: a 140 és a 150 közötti részt egyesével osztjuk be. */
export const ZoomLineSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-lg h-auto mx-auto' }) => {
  const x0 = 22;
  const x1 = 326;
  const segA = x0 + ((x1 - x0) * 4) / 10;
  const segB = x0 + ((x1 - x0) * 5) / 10;
  return (
    <svg viewBox="0 0 360 190" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="188" rx="14" fill="#eff6ff" stroke="#bfdbfe" />
      <NLine x0={x0} x1={x1} y={34} lo={100} step={10} n={10} big={50} labels={[0, 4, 5, 10]} seg={[4, 5]} segColor="#f59e0b" fs={10} />
      <line x1={segA} y1={60} x2={x0} y2={118} stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="4 3" />
      <line x1={segB} y1={60} x2={x1} y2={118} stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="4 3" />
      <NLine
        x0={x0}
        x1={x1}
        y={134}
        lo={140}
        step={1}
        n={10}
        mid={5}
        labels={[0, 5, 10]}
        marks={[{ i: 6, text: '146', kind: 'dot' }]}
      />
      <text x="180" y="180" textAnchor="middle" fontSize="11.5" fill="#1e3a8a">lent egy osztás csak 1-et ér</text>
    </svg>
  );
};

/** Mennyit ér egy osztás? Három számegyenes más-más beosztással. */
export const ScaleStepsSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-lg h-auto mx-auto' }) => (
  <svg viewBox="0 0 360 220" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="218" rx="14" fill="#faf5ff" stroke="#e9d5ff" />
    <text x="16" y="24" fontSize="12" fontWeight="bold" fill="#6b21a8">1 osztás = 1</text>
    <NLine x0={24} x1={318} y={46} lo={120} step={1} n={10} mid={5} labels={[0, 5, 10]} fs={10} />
    <text x="16" y="94" fontSize="12" fontWeight="bold" fill="#6b21a8">1 osztás = 5</text>
    <NLine x0={24} x1={318} y={116} lo={100} step={5} n={10} big={50} mid={10} labels={[0, 2, 4, 6, 8, 10]} fs={10} />
    <text x="16" y="164" fontSize="12" fontWeight="bold" fill="#6b21a8">1 osztás = 10</text>
    <NLine x0={24} x1={318} y={186} lo={100} step={10} n={10} big={50} labels={[0, 5, 10]} fs={10} />
  </svg>
);

/** Mérőszalag 0–200 cm, a távolugrás helyével (165 cm). */
export const TapeMeasureSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-lg h-auto mx-auto' }) => {
  const x0 = 24;
  const x1 = 324;
  const X = (cm: number) => x0 + ((x1 - x0) * cm) / 200;
  return (
    <svg viewBox="0 0 360 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="148" rx="14" fill="#fffbeb" stroke="#fde68a" />
      <rect x={x0 - 8} y="92" width={x1 - x0 + 16} height="20" fill="#d6a76c" />
      <Tape x0={x0} x1={x1} y={56} h={32} />
      <line x1={X(165)} y1="40" x2={X(165)} y2="112" stroke="#dc2626" strokeWidth="2" />
      <text x={X(165)} y="32" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#dc2626">165 cm</text>
      <path d={`M ${X(165) - 6} 104 q 6 -10 12 0`} fill="none" stroke="#7c2d12" strokeWidth="2" />
      <text x="20" y="22" fontSize="11.5" fill="#78350f">távolugrás: a sarok nyoma</text>
      <text x="180" y="136" textAnchor="middle" fontSize="11.5" fill="#78350f">a hosszú vonások 50 cm-enként, a kicsik 5 cm-enként</text>
    </svg>
  );
};

/** A szöcske 152-ről 5-öt ugrik jobbra: 157. */
export const GrasshopperSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-lg h-auto mx-auto' }) => {
  const x0 = 24;
  const x1 = 324;
  const X = (i: number) => x0 + ((x1 - x0) * i) / 10;
  return (
    <svg viewBox="0 0 360 160" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="158" rx="14" fill="#f0fdf4" stroke="#bbf7d0" />
      <Grasshopper x={X(2) - 26} y={112} s={1} />
      {[2, 3, 4, 5, 6].map((i) => (
        <Hop key={i} xa={X(i)} xb={X(i + 1)} y={104} h={14} text={`${i - 1}`} />
      ))}
      <NLine x0={x0} x1={x1} y={112} lo={150} step={1} n={10} mid={5} labels={[0, 2, 5, 7, 10]} />
      <text x="180" y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#15803d">152-től 5-öt jobbra: 157</text>
      <text x="180" y="40" textAnchor="middle" fontSize="11" fill="#14532d">jobbra = nagyobb szám, balra = kisebb szám</text>
    </svg>
  );
};

/** Pont középen: a 165 ugyanolyan messze van a 160-tól, mint a 170-től. */
export const MiddleSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-lg h-auto mx-auto' }) => {
  const x0 = 24;
  const x1 = 324;
  const X = (i: number) => x0 + ((x1 - x0) * i) / 10;
  return (
    <svg viewBox="0 0 360 140" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="138" rx="14" fill="#fff1f2" stroke="#fecdd3" />
      <Hop xa={X(0)} xb={X(5)} y={78} h={22} text="5" color="#2563eb" />
      <Hop xa={X(10)} xb={X(5)} y={78} h={22} text="5" color="#db2777" />
      <NLine x0={x0} x1={x1} y={84} lo={160} step={1} n={10} mid={5} labels={[0, 5, 10]} marks={[]} />
      <circle cx={X(5)} cy="84" r="4.5" fill="#dc2626" />
      <text x="180" y="22" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#9f1239">160-tól 5 lépés, 170-től is 5 lépés</text>
      <text x="180" y="128" textAnchor="middle" fontSize="11.5" fill="#881337">A 165 pont középen van.</text>
    </svg>
  );
};

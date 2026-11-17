import React from 'react';
import { FONT, Venn, VNum, place, Region, LogicBlock, B, Block, Pill } from './VennG3Parts';

// ---------------------------------------------------------------------------
// 2. Venn-diagramok és halmazok – ábrák (3. osztály)
// ---------------------------------------------------------------------------

const cls = 'w-full max-w-md h-auto mx-auto';

/** Egy karika: belül a páros számok, kívül a többi. */
export const OneLoopSvg: React.FC<{ className?: string }> = ({ className = cls }) => {
  const inside = [24, 136, 250, 308, 72, 490];
  const outside = [15, 247, 333, 101, 9];
  const inPos: [number, number][] = [[90, 80], [150, 80], [70, 110], [120, 110], [170, 110], [120, 140]];
  const outPos: [number, number][] = [[24, 60], [216, 60], [22, 150], [218, 150], [190, 30]];
  return (
    <svg viewBox="0 0 240 184" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="3" y="3" width="234" height="178" rx="8" fill="#ffffff" stroke="#15803d" strokeWidth="2.5" />
      <rect x="3" y="3" width="104" height="21" rx="8" fill="#15803d" />
      <text x="55" y="18" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">Számok 500-ig</text>
      <ellipse cx="120" cy="108" rx="88" ry="54" fill="#fef2f2" stroke="#dc2626" strokeWidth="2.5" />
      <Pill x={120} y={54} label="páros számok" stroke="#dc2626" />
      {inside.map((n, i) => (
        <VNum key={n} x={inPos[i][0]} y={inPos[i][1]} n={n} />
      ))}
      {outside.map((n, i) => (
        <VNum key={n} x={outPos[i][0]} y={outPos[i][1]} n={n} />
      ))}
    </svg>
  );
};

/** Két karika logikai lapokkal: piros – lyukas. */
export const TwoLoopsBlocksSvg: React.FC<{ className?: string }> = ({ className = cls }) => {
  const items: { r: Region; v: Block }[] = [
    { r: 'a', v: B('piros', 'negyzet', true, false) },
    { r: 'a', v: B('piros', 'kor', false, false) },
    { r: 'ab', v: B('piros', 'kor', true, true) },
    { r: 'ab', v: B('piros', 'haromszog', false, true) },
    { r: 'b', v: B('kek', 'negyzet', true, true) },
    { r: 'b', v: B('zold', 'kor', false, true) },
    { r: 'out', v: B('sarga', 'haromszog', false, false) },
    { r: 'out', v: B('kek', 'kor', false, false) }
  ];
  return (
    <svg viewBox="0 0 240 180" className={className} xmlns="http://www.w3.org/2000/svg">
      <Venn id="vf-two" frame="Logikai lapok" a="piros" b="lyukas">
        {place('overlap', items).map((p, i) => (
          <LogicBlock key={i} b={p.v} x={p.x} y={p.y + (p.r === 'out' ? -2 : 0)} k={0.62} sw={2} />
        ))}
      </Venn>
    </svg>
  );
};

/** A négy rész neve. */
export const RegionNamesSvg: React.FC<{ className?: string }> = ({ className = cls }) => (
  <svg viewBox="0 0 240 180" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <Venn id="vf-names" frame="Logikai lapok" a="piros" b="lyukas" shade={['a', 'ab', 'b', 'out']}>
      <text x="50" y="96" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#7f1d1d">csak</text>
      <text x="50" y="110" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#7f1d1d">piros</text>
      <text x="120" y="90" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#4c1d95">közös</text>
      <text x="120" y="104" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#4c1d95">rész:</text>
      <text x="120" y="118" textAnchor="middle" fontSize="10" fill="#4c1d95">piros is,</text>
      <text x="120" y="130" textAnchor="middle" fontSize="10" fill="#4c1d95">lyukas is</text>
      <text x="190" y="96" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e3a8a">csak</text>
      <text x="190" y="110" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e3a8a">lyukas</text>
      <text x="120" y="168" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#78350f">kívül: se nem piros, se nem lyukas</text>
    </Venn>
  </svg>
);

/** Számok két karikában: páros – háromjegyű. */
export const NumbersVennSvg: React.FC<{ className?: string }> = ({ className = cls }) => {
  const items: { r: Region; v: number }[] = [
    { r: 'a', v: 36 },
    { r: 'a', v: 8 },
    { r: 'a', v: 94 },
    { r: 'ab', v: 120 },
    { r: 'ab', v: 346 },
    { r: 'ab', v: 500 },
    { r: 'b', v: 105 },
    { r: 'b', v: 273 },
    { r: 'b', v: 419 },
    { r: 'out', v: 57 },
    { r: 'out', v: 3 }
  ];
  return (
    <svg viewBox="0 0 240 180" className={className} xmlns="http://www.w3.org/2000/svg">
      <Venn id="vf-num" frame="Számok 500-ig" a="páros" b="háromjegyű">
        {place('overlap', items).map((p, i) => (
          <VNum key={i} x={p.x} y={p.y} n={p.v} />
        ))}
      </Venn>
    </svg>
  );
};

/** Két karika, amelyeknek nincs közös része. */
export const ApartLoopsSvg: React.FC<{ className?: string }> = ({ className = cls }) => {
  const items: { r: Region; v: number }[] = [
    { r: 'a', v: 162 },
    { r: 'a', v: 48 },
    { r: 'a', v: 210 },
    { r: 'a', v: 336 },
    { r: 'b', v: 15 },
    { r: 'b', v: 145 },
    { r: 'b', v: 205 },
    { r: 'b', v: 475 },
    { r: 'out', v: 77 },
    { r: 'out', v: 219 },
    { r: 'out', v: 403 }
  ];
  return (
    <svg viewBox="0 0 240 180" className={className} xmlns="http://www.w3.org/2000/svg">
      <Venn id="vf-apart" mode="apart" frame="Számok 500-ig" a="páros" b="5-re végződik" fs={11}>
        {place('apart', items).map((p, i) => (
          <VNum key={i} x={p.x} y={p.y} n={p.v} fs={12} />
        ))}
      </Venn>
    </svg>
  );
};

/** Karika a karikában: minden kerek tízes páros. */
export const NestedLoopsSvg: React.FC<{ className?: string }> = ({ className = cls }) => {
  const items: { r: Region; v: number }[] = [
    { r: 'a', v: 46 },
    { r: 'a', v: 218 },
    { r: 'a', v: 304 },
    { r: 'a', v: 12 },
    { r: 'ab', v: 70 },
    { r: 'ab', v: 150 },
    { r: 'ab', v: 400 },
    { r: 'ab', v: 230 },
    { r: 'out', v: 35 },
    { r: 'out', v: 121 },
    { r: 'out', v: 499 }
  ];
  return (
    <svg viewBox="0 0 240 182" className={className} xmlns="http://www.w3.org/2000/svg">
      <Venn id="vf-nest" mode="nested" frame="Számok 500-ig" a="páros" b="kerek tízesek" fs={11}>
        {place('nested', items).map((p, i) => (
          <VNum key={i} x={p.x} y={p.y} n={p.v} fs={12} />
        ))}
      </Venn>
    </svg>
  );
};

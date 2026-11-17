import React from 'react';
import { FONT, Ruler, Seg, Pencil, GridPath, Ant, Door, BookSide } from './LengthG3Parts';

// ---------------------------------------------------------------------------
// 4. A hosszúság mérése – ábrák (3. osztály)
// ---------------------------------------------------------------------------

/** 1 m = 10 dm = 100 cm – három egyforma hosszú csík. */
export const LengthUnitsSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto mx-auto' }) => {
  const X0 = 20;
  const L = 300;
  return (
    <svg viewBox="0 0 400 200" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="398" height="198" rx="14" fill="#fff7ed" stroke="#fed7aa" />
      <rect x={X0} y={22} width={L} height={20} rx="3" fill="#ffffff" stroke="#334155" strokeWidth="1.6" />
      <text x={X0 + L + 12} y={37} fontSize="15" fontWeight="bold" fill="#0f172a">1 m</text>
      {Array.from({ length: 10 }, (_, i) => (
        <rect key={i} x={X0 + i * 30} y={62} width={30} height={20} fill={i % 2 ? '#ffffff' : '#fb923c'} stroke="#334155" strokeWidth="1.2" />
      ))}
      <text x={X0 + L + 12} y={77} fontSize="15" fontWeight="bold" fill="#c2410c">10 dm</text>
      {Array.from({ length: 100 }, (_, i) => (
        <rect key={i} x={X0 + i * 3} y={102} width={3} height={20} fill={i % 2 ? '#bfdbfe' : '#2563eb'} />
      ))}
      <rect x={X0} y={102} width={L} height={20} fill="none" stroke="#334155" strokeWidth="1.2" />
      <text x={X0 + L + 12} y={117} fontSize="15" fontWeight="bold" fill="#1d4ed8">100 cm</text>
      <text x={X0 + 15} y={96} textAnchor="middle" fontSize="11" fill="#c2410c">1 dm</text>
      <rect x="40" y="140" width="320" height="44" rx="10" fill="#ffffff" stroke="#fdba74" />
      <text x="200" y="168" textAnchor="middle" fontSize="17" fontWeight="bold" fill="#0f172a">1 m = 10 dm = 100 cm = 1000 mm</text>
    </svg>
  );
};

/** Vonalzó mm-beosztással; a ceruza 5 cm 7 mm = 57 mm. */
export const RulerMmSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto mx-auto' }) => {
  const s = 32;
  const X = 22;
  const pad = 8;
  const x0 = X + pad;
  return (
    <svg viewBox="0 0 380 210" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="378" height="208" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      <Pencil x1={x0} x2={x0 + 5.7 * s} y={36} t={16} />
      <line x1={x0} y1={46} x2={x0} y2={70} stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3 2" />
      <line x1={x0 + 5.7 * s} y1={46} x2={x0 + 5.7 * s} y2={70} stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3 2" />
      <Ruler x={X} y={70} cm={10} s={s} h={40} fontSize={13} />
      {/* 1 cm kiemelése */}
      <path d={`M ${x0} 118 v 6 h ${s} v -6`} fill="none" stroke="#7c3aed" strokeWidth="2" />
      <text x={x0 + s / 2} y={140} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#7c3aed">1 cm = 10 mm</text>
      <text x="190" y="170" textAnchor="middle" fontSize="15" fill="#334155">A ceruza: 5 cm és még 7 mm.</text>
      <text x="190" y="194" textAnchor="middle" fontSize="17" fontWeight="bold" fill="#0f172a">5 cm 7 mm = 50 mm + 7 mm = 57 mm</text>
    </svg>
  );
};

/** Hogyan mérj? A 0-tól mérünk. Ha nem a 0-nál kezdődik, kivonunk. */
export const RulerStartSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto mx-auto' }) => {
  const s = 30;
  const X = 26;
  const x0 = X + 8;
  return (
    <svg viewBox="0 0 380 230" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="378" height="228" rx="14" fill="#f0fdf4" stroke="#bbf7d0" />
      <text x="16" y="24" fontSize="13" fontWeight="bold" fill="#15803d">A) A szakasz a 0-nál kezdődik.</text>
      <Seg x1={x0} x2={x0 + 6 * s} y={42} color="#2563eb" />
      <Ruler x={X} y={54} cm={10} s={s} mm={false} h={30} fontSize={12} />
      <text x={x0 + 6 * s + 14} y={47} fontSize="14" fontWeight="bold" fill="#1d4ed8">6 cm</text>
      <text x="16" y="124" fontSize="13" fontWeight="bold" fill="#b45309">B) A szakasz a 2-nél kezdődik.</text>
      <Seg x1={x0 + 2 * s} x2={x0 + 8 * s} y={142} color="#db2777" />
      <Ruler x={X} y={154} cm={10} s={s} mm={false} h={30} fontSize={12} />
      <text x="190" y="212" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">8 − 2 = 6 cm. Ez is 6 cm!</text>
    </svg>
  );
};

/** Melyik egységgel mérjük? mm, cm, dm, m. */
export const WhichUnitSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto mx-auto' }) => (
  <svg viewBox="0 0 400 190" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="398" height="188" rx="14" fill="#fefce8" stroke="#fde68a" />
    {[0, 1, 2, 3].map((i) => (
      <rect key={i} x={10 + i * 97} y={12} width={89} height={166} rx="10" fill="#ffffff" stroke="#e2e8f0" />
    ))}
    {/* hangya */}
    <Ant cx={60} cy={80} k={1.6} />
    <text x="54" y="134" textAnchor="middle" fontSize="13" fill="#334155">hangya</text>
    <text x="54" y="162" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#7c3aed">mm</text>
    {/* ceruza */}
    <Pencil x1={118} x2={186} y={80} t={13} />
    <text x="151" y="134" textAnchor="middle" fontSize="13" fill="#334155">ceruza</text>
    <text x="151" y="162" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#2563eb">cm</text>
    {/* asztal szélessége */}
    <rect x="208" y="66" width="76" height="10" rx="2" fill="#a16207" stroke="#713f12" />
    <rect x="214" y="76" width="7" height="34" fill="#a16207" stroke="#713f12" />
    <rect x="271" y="76" width="7" height="34" fill="#a16207" stroke="#713f12" />
    <text x="248" y="134" textAnchor="middle" fontSize="13" fill="#334155">padlap</text>
    <text x="248" y="162" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#c2410c">dm</text>
    {/* ajtó */}
    <Door x={326} y={28} w={36} h={84} />
    <text x="345" y="134" textAnchor="middle" fontSize="13" fill="#334155">ajtó</text>
    <text x="345" y="162" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#15803d">m</text>
  </svg>
);

/** Átváltás: nagyobb egységről kisebbre ·10, kisebbről nagyobbra :10. */
export const UnitStairsSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto mx-auto' }) => {
  const units = [
    ['m', '#15803d', '#dcfce7'],
    ['dm', '#c2410c', '#ffedd5'],
    ['cm', '#1d4ed8', '#dbeafe'],
    ['mm', '#7c3aed', '#ede9fe']
  ];
  return (
    <svg viewBox="0 0 400 200" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="398" height="198" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      {units.map(([u, c, bg], i) => (
        <g key={u}>
          <rect x={20 + i * 95} y={20 + i * 34} width={70} height={36} rx="8" fill={bg} stroke={c} strokeWidth="2" />
          <text x={55 + i * 95} y={45 + i * 34} textAnchor="middle" fontSize="19" fontWeight="bold" fill={c}>{u}</text>
        </g>
      ))}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <path d={`M ${92 + i * 95} ${36 + i * 34} q 26 0 26 32`} fill="none" stroke="#0f172a" strokeWidth="2" />
          <polygon points={`${113 + i * 95},${64 + i * 34} ${118 + i * 95},${74 + i * 34} ${123 + i * 95},${64 + i * 34}`} fill="#0f172a" />
          <text x={120 + i * 95} y={34 + i * 34} fontSize="14" fontWeight="bold" fill="#0f172a">· 10</text>
        </g>
      ))}
      <text x="20" y="170" fontSize="14" fill="#334155">Lefelé lépsz (kisebb egység): <tspan fontWeight="bold">· 10</tspan>, több lesz a szám.</text>
      <text x="20" y="190" fontSize="14" fill="#334155">Felfelé lépsz (nagyobb egység): <tspan fontWeight="bold">: 10</tspan>, kevesebb lesz.</text>
    </svg>
  );
};

/** Csiga útja a négyzetrácson: egy kis négyzet oldala 10 cm. */
export const GridWalkSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto mx-auto' }) => (
  <svg viewBox="0 0 380 200" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="378" height="198" rx="14" fill="#f0f9ff" stroke="#bae6fd" />
    <GridPath x={20} y={18} cols={7} rows={5} s={28} start={[1, 1]} path={['r', 'r', 'r', 'r', 'd', 'd', 'd', 'l', 'l']} />
    <text x="236" y="40" fontSize="13" fill="#334155">1 kis négyzet oldala:</text>
    <text x="236" y="60" fontSize="15" fontWeight="bold" fill="#0f172a">10 cm</text>
    <text x="236" y="92" fontSize="13" fill="#334155">→ → → → ↓ ↓ ↓ ← ←</text>
    <text x="236" y="116" fontSize="13" fill="#334155">9 kis szakasz</text>
    <text x="236" y="146" fontSize="15" fontWeight="bold" fill="#15803d">9 · 10 cm = 90 cm</text>
    <text x="236" y="170" fontSize="13" fill="#334155">A piros pont a rajt.</text>
  </svg>
);

/** Könyvtorony: 3 egyforma könyv, mindegyik 18 mm vastag. */
export const BookTowerSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto mx-auto' }) => (
  <svg viewBox="0 0 360 180" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="178" rx="14" fill="#fdf4ff" stroke="#f5d0fe" />
    <BookSide x={40} y={110} w={120} t={30} color="#2563eb" />
    <BookSide x={44} y={80} w={120} t={30} color="#16a34a" />
    <BookSide x={38} y={50} w={120} t={30} color="#db2777" />
    <line x1="30" y1="140" x2="180" y2="140" stroke="#334155" strokeWidth="2" />
    <path d="M 172 50 h 8 v 90 h -8" fill="none" stroke="#7c3aed" strokeWidth="2" />
    <text x="196" y="72" fontSize="14" fill="#334155">1 könyv: 18 mm</text>
    <text x="196" y="98" fontSize="14" fill="#334155">3 könyv:</text>
    <text x="196" y="122" fontSize="15" fontWeight="bold" fill="#0f172a">3 · 18 mm = 54 mm</text>
    <text x="196" y="146" fontSize="15" fontWeight="bold" fill="#7c3aed">= 5 cm 4 mm</text>
  </svg>
);

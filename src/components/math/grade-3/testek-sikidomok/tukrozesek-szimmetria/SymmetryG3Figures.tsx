import React from 'react';
import { FONT, INK, AXIS, AxisLine, GridG, CellsG, Heart, HalfHeart, Butterfly, Letter, Tree, BigArrow } from './SymmetryG3Parts';

type Fig = React.FC<{ className?: string }>;
const DEF = 'w-full h-auto max-w-md mx-auto';

/** Félbehajtott papírból kivágott fél szív → kinyitva egész szív. */
export const SymmetryFoldSvg: Fig = ({ className = DEF }) => (
  <svg viewBox="0 0 320 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="318" height="168" rx="12" fill="#fdf2f8" stroke="#f9a8d4" />
    {/* félbehajtott papír: a hajtás a jobb széle */}
    <rect x="30" y="28" width="90" height="110" fill="#fff" stroke="#94a3b8" strokeWidth="2" />
    <path d="M 120 28 L 132 20 L 132 130 L 120 138 Z" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
    <HalfHeart cx={120} cy={84} s={1.2} />
    <line x1="120" y1="24" x2="120" y2="142" stroke={AXIS} strokeWidth="2.6" strokeDasharray="7 4" />
    <text x="75" y="160" textAnchor="middle" fontSize="13" fontWeight="bold" fill={INK}>hajtás + vágás</text>
    {/* nyíl */}
    <path d="M 148 84 L 182 84" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
    <path d="M 174 75 L 184 84 L 174 93" fill="none" stroke="#64748b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    {/* kinyitva */}
    <Heart cx={250} cy={84} s={1.2} />
    <line x1="250" y1="34" x2="250" y2="134" stroke={AXIS} strokeWidth="2.6" strokeDasharray="7 4" />
    <text x="250" y="160" textAnchor="middle" fontSize="13" fontWeight="bold" fill={INK}>kinyitva: szív</text>
  </svg>
);

/** Pillangó a tükörtengelyével. */
export const SymmetryButterflySvg: Fig = ({ className = DEF }) => (
  <svg viewBox="0 0 320 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="318" height="168" rx="12" fill="#eff6ff" stroke="#93c5fd" />
    <Butterfly cx={130} cy={92} s={1.4} />
    <AxisLine x1={130} y1={14} x2={130} y2={158} />
    <path d="M 208 52 L 140 52" stroke={AXIS} strokeWidth="2" />
    <path d="M 146 46 L 138 52 L 146 58" fill="none" stroke={AXIS} strokeWidth="2" strokeLinejoin="round" />
    <text x="214" y="48" fontSize="14" fontWeight="bold" fill={AXIS}>tükörtengely</text>
    <text x="214" y="96" fontSize="13" fill={INK}>A két szárnya</text>
    <text x="214" y="114" fontSize="13" fill={INK}>pontosan</text>
    <text x="214" y="132" fontSize="13" fill={INK}>fedi egymást.</text>
  </svg>
);

/** Tükrözés négyzetrácson: a pont és a tükörképe ugyanannyi kockára van a tengelytől. */
export const SymmetryGridSvg: Fig = ({ className = DEF }) => {
  const s = 24;
  const x0 = 40;
  const y0 = 22;
  return (
    <svg viewBox="0 0 320 196" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="318" height="194" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
      <GridG x={x0} y={y0} cols={10} rows={6} s={s} />
      <CellsG
        x={x0}
        y={y0}
        s={s}
        cells={[
          [1, 1, '#3b82f6'],
          [1, 8, '#3b82f6'],
          [3, 3, '#f97316'],
          [3, 4, '#f97316'],
          [3, 5, '#f97316'],
          [3, 6, '#f97316']
        ]}
      />
      <AxisLine x1={x0 + 5 * s} y1={y0 - 10} x2={x0 + 5 * s} y2={y0 + 6 * s + 10} />
      {/* távolság a kék kockáknál */}
      {[
        [x0 + 2 * s, x0 + 5 * s],
        [x0 + 5 * s, x0 + 8 * s]
      ].map(([a, b], i) => (
        <g key={i}>
          <line x1={a + 3} y1={y0 + 1.5 * s} x2={b - 3} y2={y0 + 1.5 * s} stroke="#1d4ed8" strokeWidth="2.4" />
          <path d={`M ${a + 9} ${y0 + 1.5 * s - 5} L ${a + 3} ${y0 + 1.5 * s} L ${a + 9} ${y0 + 1.5 * s + 5}`} fill="none" stroke="#1d4ed8" strokeWidth="2.4" />
          <path d={`M ${b - 9} ${y0 + 1.5 * s - 5} L ${b - 3} ${y0 + 1.5 * s} L ${b - 9} ${y0 + 1.5 * s + 5}`} fill="none" stroke="#1d4ed8" strokeWidth="2.4" />
          <rect x={(a + b) / 2 - 11} y={y0 + 2 * s + 3} width="22" height="20" rx="5" fill="#dbeafe" stroke="#1d4ed8" />
          <text x={(a + b) / 2} y={y0 + 2 * s + 18} textAnchor="middle" fontSize="15" fontWeight="bold" fill="#1d4ed8">3</text>
        </g>
      ))}
      <text x="160" y="186" textAnchor="middle" fontSize="13" fontWeight="bold" fill={INK}>3 kocka a tengelyig – a túloldalon is 3</text>
    </svg>
  );
};

/** Hány tükörtengelye van? Téglalap, négyzet, sárkány, kör a tengelyeikkel. */
export const SymmetryAxesSvg: Fig = ({ className = DEF }) => (
  <svg viewBox="0 0 340 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="338" height="148" rx="12" fill="#fffbeb" stroke="#fcd34d" />
    {/* téglalap */}
    <rect x="12" y="40" width="70" height="44" fill="#fde68a" stroke="#a16207" strokeWidth="2" />
    <AxisLine x1={47} y1={30} x2={47} y2={94} sw={2.2} />
    <AxisLine x1={4} y1={62} x2={90} y2={62} sw={2.2} />
    <text x="47" y="124" textAnchor="middle" fontSize="13" fontWeight="bold" fill={INK}>téglalap</text>
    <text x="47" y="141" textAnchor="middle" fontSize="13" fontWeight="bold" fill={AXIS}>2</text>
    {/* négyzet */}
    <rect x="112" y="34" width="56" height="56" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="2" />
    <AxisLine x1={140} y1={24} x2={140} y2={100} sw={2.2} />
    <AxisLine x1={102} y1={62} x2={178} y2={62} sw={2.2} />
    <AxisLine x1={106} y1={28} x2={174} y2={96} sw={2.2} />
    <AxisLine x1={174} y1={28} x2={106} y2={96} sw={2.2} />
    <text x="140" y="124" textAnchor="middle" fontSize="13" fontWeight="bold" fill={INK}>négyzet</text>
    <text x="140" y="141" textAnchor="middle" fontSize="13" fontWeight="bold" fill={AXIS}>4</text>
    {/* sárkány */}
    <path d="M 222 22 L 246 50 L 222 102 L 198 50 Z" fill="#ddd6fe" stroke="#6d28d9" strokeWidth="2" strokeLinejoin="round" />
    <AxisLine x1={222} y1={12} x2={222} y2={110} sw={2.2} />
    <text x="222" y="124" textAnchor="middle" fontSize="13" fontWeight="bold" fill={INK}>sárkány alakú</text>
    <text x="222" y="141" textAnchor="middle" fontSize="13" fontWeight="bold" fill={AXIS}>1</text>
    {/* kör */}
    <circle cx="295" cy="62" r="32" fill="#bbf7d0" stroke="#15803d" strokeWidth="2" />
    {[0, 30, 60, 90, 120, 150].map((d) => {
      const r = (d * Math.PI) / 180;
      return <AxisLine key={d} x1={295 - 38 * Math.cos(r)} y1={62 - 38 * Math.sin(r)} x2={295 + 38 * Math.cos(r)} y2={62 + 38 * Math.sin(r)} sw={1.8} />;
    })}
    <text x="295" y="124" textAnchor="middle" fontSize="13" fontWeight="bold" fill={INK}>kör</text>
    <text x="295" y="141" textAnchor="middle" fontSize="13" fontWeight="bold" fill={AXIS}>akárhány</text>
  </svg>
);

/** Betűk tükörtengellyel: A (függőleges), E (vízszintes), H (mindkettő), N (nincs). */
export const SymmetryLettersSvg: Fig = ({ className = DEF }) => (
  <svg viewBox="0 0 320 140" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="318" height="138" rx="12" fill="#f0fdf4" stroke="#86efac" />
    <Letter ch="A" x={20} y={24} size={56} />
    <AxisLine x1={40} y1={14} x2={40} y2={90} sw={2.2} />
    <text x="40" y="112" textAnchor="middle" fontSize="12" fontWeight="bold" fill={INK}>függőleges</text>
    <Letter ch="E" x={100} y={24} size={56} />
    <AxisLine x1={92} y1={52} x2={148} y2={52} sw={2.2} />
    <text x="120" y="112" textAnchor="middle" fontSize="12" fontWeight="bold" fill={INK}>vízszintes</text>
    <Letter ch="H" x={180} y={24} size={56} />
    <AxisLine x1={200} y1={14} x2={200} y2={90} sw={2.2} />
    <AxisLine x1={172} y1={52} x2={228} y2={52} sw={2.2} />
    <text x="200" y="112" textAnchor="middle" fontSize="12" fontWeight="bold" fill={INK}>mindkettő</text>
    <Letter ch="N" x={260} y={24} size={56} color="#64748b" />
    <text x="280" y="112" textAnchor="middle" fontSize="12" fontWeight="bold" fill={INK}>nincs</text>
    <text x="160" y="131" textAnchor="middle" fontSize="11" fill="#475569">piros szaggatott vonal = tükörtengely</text>
  </svg>
);

/** Tükörkép a vízben (vízszintes tengely) és tükörben (függőleges tengely). */
export const SymmetryWaterSvg: Fig = ({ className = DEF }) => (
  <svg viewBox="0 0 320 180" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="318" height="178" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {/* víz */}
    <rect x="12" y="90" width="136" height="78" rx="6" fill="#e0f2fe" />
    <Tree cx={80} y={90} h={70} />
    <g opacity="0.55">
      <Tree cx={80} y={90} h={70} flip />
    </g>
    <AxisLine x1={8} y1={90} x2={152} y2={90} />
    <text x="80" y="16" textAnchor="middle" fontSize="12" fontWeight="bold" fill={INK}>a víz tükre: vízszintes</text>
    {/* tükör */}
    <BigArrow cx={205} cy={96} len={54} dir="right" />
    <BigArrow cx={283} cy={96} len={54} dir="left" fill="#c4b5fd" />
    <AxisLine x1={244} y1={50} x2={244} y2={146} />
    <text x="244" y="36" textAnchor="middle" fontSize="12" fontWeight="bold" fill={INK}>tükör: függőleges</text>
    <text x="244" y="166" textAnchor="middle" fontSize="12" fill={INK}>jobbra → balra</text>
  </svg>
);

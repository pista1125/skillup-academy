import React from 'react';
import { SYM_FONT, AXIS_COLOR, CellGridPart, Cell, mirrorV, GlyphPart, SymShapePart } from './SymmetryG2Parts';

const WRAP = 'w-full max-w-[480px] h-auto mx-auto';

/** Gyerek és a tükörképe. */
export const MirrorKidSvg: React.FC<{ className?: string }> = ({ className = WRAP }) => {
  const kid = (flip: boolean) => (
    <g transform={flip ? 'translate(360 0) scale(-1 1)' : undefined}>
      <circle cx="110" cy="50" r="18" fill="#fcd9b6" stroke="#9a3412" strokeWidth="2" />
      <circle cx="104" cy="48" r="2.2" fill="#1e293b" />
      <circle cx="116" cy="48" r="2.2" fill="#1e293b" />
      <path d="M 102 57 Q 110 63 118 57" fill="none" stroke="#9a3412" strokeWidth="2" />
      <path d="M 92 40 Q 110 20 128 40" fill="#a16207" />
      <rect x="90" y="70" width="40" height="50" rx="9" fill="#34d399" stroke="#065f46" strokeWidth="2" />
      <line x1="92" y1="78" x2="66" y2="40" stroke="#34d399" strokeWidth="9" strokeLinecap="round" />
      <circle cx="64" cy="36" r="7" fill="#fcd9b6" stroke="#9a3412" strokeWidth="1.5" />
      <line x1="128" y1="78" x2="140" y2="115" stroke="#34d399" strokeWidth="9" strokeLinecap="round" />
      <line x1="101" y1="120" x2="101" y2="150" stroke="#1e293b" strokeWidth="6" />
      <line x1="119" y1="120" x2="119" y2="150" stroke="#1e293b" strokeWidth="6" />
    </g>
  );
  return (
    <svg viewBox="0 0 360 180" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={SYM_FONT}>
      <rect x="1" y="1" width="358" height="178" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      <rect x="176" y="14" width="8" height="150" fill="#bae6fd" stroke="#0369a1" />
      {kid(false)}
      <g opacity="0.75">{kid(true)}</g>
      <text x="110" y="172" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">Zoli</text>
      <text x="250" y="172" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0369a1">a tükörképe</text>
      <text x="180" y="12" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0369a1">tükör</text>
    </svg>
  );
};

/** Félbehajtás és kivágás: a hajtásvonal a tükörtengely. */
export const FoldCutSvg: React.FC<{ className?: string }> = ({ className = WRAP }) => (
  <svg viewBox="0 0 360 160" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={SYM_FONT}>
    <rect x="1" y="1" width="358" height="158" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    <rect x="30" y="25" width="70" height="100" fill="#fef3c7" stroke="#b45309" strokeWidth="2" />
    <path d="M 100 55 C 70 35, 52 70, 100 110" fill="#f472b6" stroke="#9d174d" strokeWidth="2" />
    <line x1="100" y1="20" x2="100" y2="130" stroke={AXIS_COLOR} strokeWidth="3" />
    <text x="65" y="145" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">félbehajtva</text>
    <path d="M 130 75 L 160 75" stroke="#64748b" strokeWidth="3" />
    <polygon points="160,69 170,75 160,81" fill="#64748b" />
    <rect x="190" y="25" width="140" height="100" fill="#fef3c7" stroke="#b45309" strokeWidth="2" />
    <path d="M 260 55 C 230 35, 212 70, 260 110 C 308 70, 290 35, 260 55 Z" fill="#f472b6" stroke="#9d174d" strokeWidth="2" />
    <line x1="260" y1="20" x2="260" y2="130" stroke={AXIS_COLOR} strokeWidth="3" strokeDasharray="6 4" />
    <text x="260" y="145" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">kinyitva: tükrös szív</text>
  </svg>
);

/** Tükrözés négyzetrácson: ugyanannyi mező a tengelytől. */
export const GridMirrorSvg: React.FC<{ className?: string }> = ({ className = WRAP }) => {
  const given: Cell[] = [
    [3, 0],
    [2, 1],
    [3, 1],
    [1, 2],
    [2, 2],
    [3, 2],
    [3, 3]
  ];
  const cells = [...given.map((c) => ({ c, fill: '#6366f1' })), ...given.map((c) => ({ c: mirrorV(c, 4), fill: '#a5b4fc' }))];
  const cell = 30;
  const x0 = 60;
  const y0 = 16;
  return (
    <svg viewBox="0 0 360 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={SYM_FONT}>
      <rect x="1" y="1" width="358" height="168" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      <CellGridPart x={x0} y={y0} cols={8} rows={4} cell={cell} cells={cells} axisV={4} />
      <text x={x0 + 1.5 * cell} y={y0 + 2.62 * cell} textAnchor="middle" fontSize="13" fontWeight="900" fill="#ffffff">3</text>
      <text x={x0 + 6.5 * cell} y={y0 + 2.62 * cell} textAnchor="middle" fontSize="13" fontWeight="900" fill="#1e1b4b">3</text>
      <text x="180" y="152" textAnchor="middle" fontSize="12" fill="#0f172a">
        Bal oldalon is, jobb oldalon is a tengelytől a 3. mező.
      </text>
    </svg>
  );
};

/** Tükrös betűk: függőleges és vízszintes tengely, és egy tengely nélküli betű. */
export const SymmetricLettersSvg: React.FC<{ className?: string }> = ({ className = WRAP }) => (
  <svg viewBox="0 0 360 130" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={SYM_FONT}>
    <rect x="1" y="1" width="358" height="128" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    <GlyphPart ch="A" x={25} y={22} s={1.6} axis="v" />
    <GlyphPart ch="T" x={85} y={22} s={1.6} axis="v" />
    <GlyphPart ch="E" x={150} y={22} s={1.6} axis="h" />
    <GlyphPart ch="K" x={210} y={22} s={1.6} axis="h" />
    <GlyphPart ch="F" x={290} y={22} s={1.6} color="#64748b" />
    <text x="85" y="117" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a">függőleges tengely</text>
    <text x="205" y="117" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a">vízszintes tengely</text>
    <text x="305" y="117" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#64748b">nincs tengelye</text>
  </svg>
);

/** Síkidomok tükörtengelyei. */
export const ShapeAxesSvg: React.FC<{ className?: string }> = ({ className = WRAP }) => (
  <svg viewBox="0 0 360 140" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={SYM_FONT}>
    <rect x="1" y="1" width="358" height="138" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    <SymShapePart kind="negyzet" cx={50} cy={60} s={1.1} axes />
    <SymShapePart kind="teglalap" cx={135} cy={60} s={1.05} axes />
    <SymShapePart kind="egyenloszaru" cx={220} cy={60} s={1.1} axes />
    <SymShapePart kind="ferde" cx={305} cy={60} s={1.05} />
    <text x="50" y="118" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">4 tengely</text>
    <text x="135" y="118" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">2 tengely</text>
    <text x="220" y="118" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">1 tengely</text>
    <text x="305" y="118" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#64748b">nincs</text>
  </svg>
);

/** Tükröződés a vízben: vízszintes tengely. */
export const WaterReflectionSvg: React.FC<{ className?: string }> = ({ className = WRAP }) => {
  const scene = (
    <g>
      <rect x="150" y="45" width="10" height="35" fill="#92400e" />
      <polygon points="155,10 185,50 125,50" fill="#22c55e" stroke="#166534" strokeWidth="2" strokeLinejoin="round" />
      <rect x="210" y="50" width="45" height="30" fill="#fde68a" stroke="#92400e" strokeWidth="2" />
      <polygon points="205,50 232,28 260,50" fill="#ef4444" stroke="#7f1d1d" strokeWidth="2" strokeLinejoin="round" />
      <rect x="226" y="62" width="12" height="18" fill="#a16207" />
    </g>
  );
  return (
    <svg viewBox="0 0 360 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={SYM_FONT}>
      <rect x="1" y="1" width="358" height="168" rx="14" fill="#f0f9ff" stroke="#cbd5e1" />
      <rect x="2" y="80" width="356" height="88" fill="#7dd3fc" opacity="0.55" />
      {scene}
      <g transform="translate(0 160) scale(1 -1)" opacity="0.55">
        {scene}
      </g>
      <line x1="10" y1="80" x2="350" y2="80" stroke={AXIS_COLOR} strokeWidth="2.5" strokeDasharray="6 4" />
      <text x="70" y="74" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">a víz széle</text>
      <text x="70" y="100" textAnchor="middle" fontSize="11" fill="#0c4a6e">fejjel lefelé</text>
    </svg>
  );
};

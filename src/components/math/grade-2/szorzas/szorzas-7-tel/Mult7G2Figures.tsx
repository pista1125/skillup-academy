import React from 'react';
import { MULT7_FONT, C5, C2, WeekStripPart, JumpLinePart, DotArrayPart } from './Mult7G2Parts';

type FigProps = { className?: string };
const CLS = 'w-full max-w-[480px] h-auto mx-auto';

/** Hétpettyes katica (felülnézet). */
export const Ladybug: React.FC<{ cx: number; cy: number; s?: number }> = ({ cx, cy, s = 1 }) => (
  <g transform={`translate(${cx} ${cy}) scale(${s})`}>
    <line x1="-6" y1="-26" x2="-12" y2="-36" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="6" y1="-26" x2="12" y2="-36" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="0" cy="-20" r="9" fill="#1e293b" />
    <ellipse cx="0" cy="2" rx="20" ry="22" fill="#ef4444" stroke="#1e293b" strokeWidth="2.5" />
    <line x1="0" y1="-19" x2="0" y2="24" stroke="#1e293b" strokeWidth="2" />
    {[
      [0, -12],
      [-10, -4],
      [10, -4],
      [-11, 9],
      [11, 9],
      [-6, 17],
      [6, 17]
    ].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r="3.6" fill="#1e293b" />
    ))}
  </g>
);

/** 1. Három hét = 7 + 7 + 7 = 3 · 7 = 21 nap */
export const WeekStripsSvg: React.FC<FigProps> = ({ className = CLS }) => (
  <svg viewBox="0 0 480 220" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT7_FONT}>
    <rect x="2" y="2" width="476" height="216" rx="16" fill="#ecfeff" stroke="#67e8f9" strokeWidth="2" />
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <text x="40" y={52 + i * 46} textAnchor="middle" fontSize="16" fontWeight="bold" fill="#155e75">
          {i + 1}. hét
        </text>
        <WeekStripPart x={80} y={28 + i * 46} cell={38} labels />
        <text x="374" y={56 + i * 46} fontSize="22" fontWeight="bold" fill="#0e7490">
          7 nap
        </text>
      </g>
    ))}
    <text x="240" y="200" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#164e63">
      7 + 7 + 7 = 3 · 7 = 21
    </text>
  </svg>
);

/** 2. A 7-es szorzótábla pontráccsal (5 kék + 2 narancs oszlop). */
export const SevenTableArraySvg: React.FC<FigProps> = ({ className = CLS }) => {
  const rows = 10;
  const gap = 19;
  return (
    <svg viewBox="0 0 480 236" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT7_FONT}>
      <rect x="2" y="2" width="476" height="232" rx="16" fill="#ecfeff" stroke="#67e8f9" strokeWidth="2" />
      <DotArrayPart x={48} y={30} rows={rows} cols={7} gap={gap} r={6.6} splitCol={5} />
      {Array.from({ length: rows }, (_, i) => (
        <g key={i}>
          <text x="24" y={30 + i * gap + 5} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#475569">
            {i + 1}.
          </text>
          <text x={i < 5 ? 210 : 350} y={42 + (i % 5) * 38} fontSize="21" fontWeight="bold" fill="#164e63">
            {i + 1} · 7 = {(i + 1) * 7}
          </text>
        </g>
      ))}
    </svg>
  );
};

/** 3. Szöcske a számegyenesen: 7-es ugrások 0-tól 70-ig. */
export const SevenJumpsSvg: React.FC<FigProps> = ({ className = CLS }) => (
  <svg viewBox="0 0 480 140" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT7_FONT}>
    <rect x="2" y="2" width="476" height="136" rx="16" fill="#f0fdf4" stroke="#86efac" strokeWidth="2" />
    <text x="24" y="28" fontSize="15" fontWeight="bold" fill="#15803d">
      A szöcske mindig 7-et ugrik.
    </text>
    <JumpLinePart x={30} y={96} w={410} max={70} jumps={10} step={7} color="#16a34a" landLabels />
  </svg>
);

/** 4. Trükk: 6 · 7 = 6 · 5 + 6 · 2 = 30 + 12 = 42 */
export const FivePlusTwoSvg: React.FC<FigProps> = ({ className = CLS }) => (
  <svg viewBox="0 0 480 210" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT7_FONT}>
    <rect x="2" y="2" width="476" height="206" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
    <DotArrayPart x={50} y={34} rows={6} cols={7} gap={24} r={9} splitCol={5} />
    <text x="98" y="196" textAnchor="middle" fontSize="18" fontWeight="bold" fill={C5}>
      6 · 5 = 30
    </text>
    <text x="196" y="196" textAnchor="middle" fontSize="18" fontWeight="bold" fill={C2}>
      6 · 2 = 12
    </text>
    <text x="360" y="90" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#164e63">
      30 + 12 = 42
    </text>
    <text x="360" y="126" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#164e63">
      6 · 7 = 42
    </text>
  </svg>
);

/** 5. Felcserélés: 3 · 7 = 7 · 3 */
export const CommuteSevenSvg: React.FC<FigProps> = ({ className = CLS }) => (
  <svg viewBox="0 0 480 220" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT7_FONT}>
    <rect x="2" y="2" width="476" height="216" rx="16" fill="#f0f9ff" stroke="#7dd3fc" strokeWidth="2" />
    <DotArrayPart x={40} y={70} rows={3} cols={7} gap={26} r={9} colorA="#0ea5e9" />
    <text x="118" y="176" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#075985">
      3 · 7 = 21
    </text>
    <text x="250" y="110" textAnchor="middle" fontSize="34" fontWeight="bold" fill="#334155">
      =
    </text>
    <DotArrayPart x={330} y={26} rows={7} cols={3} gap={22} r={8} colorA="#f97316" />
    <text x="352" y="200" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#9a3412">
      7 · 3 = 21
    </text>
  </svg>
);

/** 6. Bogarak: 4 hétpettyes katica = 4 · 7 = 28 petty */
export const LadybugsSvg: React.FC<FigProps> = ({ className = CLS }) => (
  <svg viewBox="0 0 480 190" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT7_FONT}>
    <rect x="2" y="2" width="476" height="186" rx="16" fill="#f7fee7" stroke="#bef264" strokeWidth="2" />
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <Ladybug cx={78 + i * 108} cy={82} s={1.5} />
        <text x={78 + i * 108} y={148} textAnchor="middle" fontSize="20" fontWeight="bold" fill="#991b1b">
          7
        </text>
      </g>
    ))}
    <text x="240" y="178" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#3f6212">
      7 + 7 + 7 + 7 = 4 · 7 = 28 petty
    </text>
  </svg>
);

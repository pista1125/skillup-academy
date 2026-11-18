import React from 'react';
import { DIV7_FONT, PLATE_COLORS, PlatePart, DotRowsPart, DayGridPart } from './Div7G2Parts';

type FigProps = { className?: string };
const CLS = 'w-full max-w-[480px] h-auto mx-auto';

/** Egyszerű tulipán. */
export const Tulip: React.FC<{ x: number; y: number; s?: number; color?: string }> = ({ x, y, s = 1, color = '#e11d48' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <line x1="0" y1="0" x2="0" y2="18" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M -7 -10 L -7 0 Q 0 6 7 0 L 7 -10 L 3.5 -5 L 0 -11 L -3.5 -5 Z" fill={color} stroke="#7f1d1d" strokeWidth="1.2" />
  </g>
);

/** 1. 21 tulipán, csokrok 7-esével: 21 : 7 = 3 */
export const GroupingSevensSvg: React.FC<FigProps> = ({ className = CLS }) => {
  const colors = ['#e11d48', '#f59e0b', '#a855f7'];
  return (
    <svg viewBox="0 0 480 220" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV7_FONT}>
      <rect x="2" y="2" width="476" height="216" rx="16" fill="#fdf2f8" stroke="#f9a8d4" strokeWidth="2" />
      {[0, 1, 2].map((g) => (
        <g key={g}>
          <rect x="40" y={22 + g * 56} width="300" height="46" rx="20" fill="#ffffff" stroke="#0e7490" strokeWidth="2.5" strokeDasharray="6 4" />
          {Array.from({ length: 7 }, (_, i) => (
            <Tulip key={i} x={70 + i * 40} y={40 + g * 56} s={1.25} color={colors[g]} />
          ))}
          <text x="392" y={52 + g * 56} textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0e7490">
            {g + 1}. csokor
          </text>
        </g>
      ))}
      <text x="240" y="208" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#164e63">
        21 tulipán → 3 csokor. 21 : 7 = 3
      </text>
    </svg>
  );
};

/** 2. 14 eper 7 tányérra: 14 : 7 = 2 */
export const SharingPlatesSvg: React.FC<FigProps> = ({ className = CLS }) => (
  <svg viewBox="0 0 480 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV7_FONT}>
    <rect x="2" y="2" width="476" height="166" rx="16" fill="#fff1f2" stroke="#fda4af" strokeWidth="2" />
    {Array.from({ length: 7 }, (_, i) => (
      <g key={i}>
        <PlatePart cx={54 + i * 62} cy={72} count={2} w={54} />
        <text x={54 + i * 62} y={118} textAnchor="middle" fontSize="16" fontWeight="bold" fill={PLATE_COLORS[i]}>
          {i + 1}.
        </text>
      </g>
    ))}
    <text x="240" y="154" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#9f1239">
      14 eper, 7 tányér. 14 : 7 = 2
    </text>
  </svg>
);

/** 3. 28 nap = 4 hét: 28 : 7 = 4 */
export const WeeksDaysSvg: React.FC<FigProps> = ({ className = CLS }) => (
  <svg viewBox="0 0 480 200" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV7_FONT}>
    <rect x="2" y="2" width="476" height="196" rx="16" fill="#ecfeff" stroke="#67e8f9" strokeWidth="2" />
    <DayGridPart x={40} y={40} n={28} cell={34} />
    {[0, 1, 2, 3].map((i) => (
      <text key={i} x="300" y={63 + i * 34} fontSize="17" fontWeight="bold" fill="#0e7490">
        {i + 1}. hét
      </text>
    ))}
    <text x="400" y="100" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#164e63">
      28 nap
    </text>
    <text x="400" y="128" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#164e63">
      = 4 hét
    </text>
  </svg>
);

/** 4. Hétszerese és hetede: 6 → 42 → 6 */
export const SeventhArrowsSvg: React.FC<FigProps> = ({ className = CLS }) => (
  <svg viewBox="0 0 480 190" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV7_FONT}>
    <rect x="2" y="2" width="476" height="186" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
    <rect x="60" y="70" width="90" height="56" rx="14" fill="#dcfce7" stroke="#16a34a" strokeWidth="3" />
    <text x="105" y="108" textAnchor="middle" fontSize="30" fontWeight="bold" fill="#14532d">
      6
    </text>
    <rect x="330" y="70" width="90" height="56" rx="14" fill="#cffafe" stroke="#0891b2" strokeWidth="3" />
    <text x="375" y="108" textAnchor="middle" fontSize="30" fontWeight="bold" fill="#164e63">
      42
    </text>
    <path d="M 150 76 Q 240 10 330 76" fill="none" stroke="#16a34a" strokeWidth="3.5" />
    <polygon points="330,76 316,70 324,62" fill="#16a34a" />
    <text x="240" y="34" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#15803d">
      · 7 (hétszerese)
    </text>
    <path d="M 330 120 Q 240 186 150 120" fill="none" stroke="#e11d48" strokeWidth="3.5" />
    <polygon points="150,120 164,126 156,134" fill="#e11d48" />
    <text x="240" y="174" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#be123c">
      : 7 (hetede)
    </text>
  </svg>
);

/** 5. Maradékos osztás: 25 korong, 3 hetes csoport, maradt 4 */
export const RemainderGroupsSvg: React.FC<FigProps> = ({ className = CLS }) => (
  <svg viewBox="0 0 480 200" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV7_FONT}>
    <rect x="2" y="2" width="476" height="196" rx="16" fill="#fff7ed" stroke="#fdba74" strokeWidth="2" />
    <DotRowsPart x={44} y={36} n={25} gap={30} r={10} groups={3} />
    <text x="340" y="60" fontSize="17" fontWeight="bold" fill="#0e7490">
      Ennyi csoport: 3
    </text>
    <text x="340" y="92" fontSize="17" fontWeight="bold" fill="#c2410c">
      Ennyi maradt: 4
    </text>
    <text x="240" y="182" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#334155">
      Ellenőrzés: 3 · 7 + 4 = 25
    </text>
  </svg>
);

/** Csónak (felülnézet), `kids` ülő gyerekkel. */
const Boat: React.FC<{ x: number; y: number; kids: number }> = ({ x, y, kids }) => (
  <g>
    <path d={`M ${x} ${y} L ${x + 76} ${y} L ${x + 66} ${y + 22} L ${x + 10} ${y + 22} Z`} fill="#a16207" stroke="#422006" strokeWidth="2" />
    {Array.from({ length: kids }, (_, i) => (
      <circle key={i} cx={x + 12 + (i % 7) * 8.7} cy={y - 6} r="4" fill={PLATE_COLORS[i % 7]} stroke="#1e293b" strokeWidth="1" />
    ))}
  </g>
);

/** 6. 30 gyerek, csónakba 7 fér: 4 csónak tele, 2 gyerek marad, 5 csónak kell */
export const RoundUpBoatsSvg: React.FC<FigProps> = ({ className = CLS }) => (
  <svg viewBox="0 0 480 160" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV7_FONT}>
    <rect x="2" y="2" width="476" height="156" rx="16" fill="#e0f2fe" stroke="#7dd3fc" strokeWidth="2" />
    <path d="M 10 90 Q 60 80 110 90 T 210 90 T 310 90 T 410 90 T 470 90" fill="none" stroke="#38bdf8" strokeWidth="3" />
    {[0, 1, 2, 3].map((i) => (
      <Boat key={i} x={18 + i * 90} y={60} kids={7} />
    ))}
    <Boat x={378} y={60} kids={2} />
    <text x="416" y="40" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#c2410c">
      ez is kell!
    </text>
    <text x="240" y="132" textAnchor="middle" fontSize="17" fontWeight="bold" fill="#075985">
      4 csónak tele, 2 gyerek marad → 5 csónak kell
    </text>
  </svg>
);

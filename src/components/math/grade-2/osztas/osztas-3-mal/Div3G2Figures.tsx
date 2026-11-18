import React from 'react';
import { DIV3_FONT, PlatePart, RingedDotsPart, JumpBackPart } from './Div3G2Parts';

// ---------------------------------------------------------------------------
// 2. Osztás 3-mal – tananyag-ábrák (2. osztály)
// ---------------------------------------------------------------------------

const DEF = 'w-full max-w-md h-auto mx-auto';

/** Bennfoglalás: 12 gyöngy hármasával 4 karikába. */
export const GroupByThreeSvg: React.FC<{ className?: string }> = ({ className = DEF }) => (
  <svg viewBox="0 0 320 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV3_FONT}>
    <rect x="1" y="1" width="318" height="148" rx="14" fill="#f0fdf4" stroke="#bbf7d0" />
    <text x="160" y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#14532d">
      12 gyöngy, hármasával karikázva
    </text>
    <RingedDotsPart x={95} y={52} n={12} ringed={4} perRow={6} step={26} r={9} />
    <text x="160" y="116" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">
      4 karika lett.
    </text>
    <text x="160" y="138" textAnchor="middle" fontSize="16" fontWeight="900" fill="#1d4ed8">
      12 : 3 = 4, mert 4 · 3 = 12
    </text>
  </svg>
);

/** Részekre osztás: 15 eper 3 tányérra, egyenként körbe. */
export const ShareThreePlatesSvg: React.FC<{ className?: string }> = ({ className = DEF }) => (
  <svg viewBox="0 0 320 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV3_FONT}>
    <rect x="1" y="1" width="318" height="148" rx="14" fill="#fff1f2" stroke="#fecdd3" />
    <text x="160" y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#881337">
      15 eper 3 tányérra – mindig egyet-egyet körbe
    </text>
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <PlatePart cx={62 + i * 98} cy={62} w={88} count={5} color="#e11d48" />
        <text x={62 + i * 98} y={102} textAnchor="middle" fontSize="16" fontWeight="900" fill="#be123c">
          5
        </text>
      </g>
    ))}
    <text x="160" y="124" textAnchor="middle" fontSize="15" fontWeight="900" fill="#1d4ed8">
      15 : 3 = 5
    </text>
    <text x="160" y="142" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">
      A 15 harmada 5.
    </text>
  </svg>
);

/** Háromszorosa és harmada: 6 ⇄ 18. */
export const TripleThirdSvg: React.FC<{ className?: string }> = ({ className = DEF }) => (
  <svg viewBox="0 0 320 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV3_FONT}>
    <rect x="1" y="1" width="318" height="148" rx="14" fill="#ecfeff" stroke="#a5f3fc" />
    <rect x="36" y="52" width="64" height="46" rx="10" fill="#fff" stroke="#0891b2" strokeWidth="3" />
    <text x="68" y="84" textAnchor="middle" fontSize="24" fontWeight="900" fill="#164e63">6</text>
    <rect x="220" y="52" width="64" height="46" rx="10" fill="#fff" stroke="#0891b2" strokeWidth="3" />
    <text x="252" y="84" textAnchor="middle" fontSize="24" fontWeight="900" fill="#164e63">18</text>
    <path d="M 100 56 Q 160 14 220 56" fill="none" stroke="#16a34a" strokeWidth="3.5" />
    <path d="M 210 46 L 221 57 L 206 58 Z" fill="#16a34a" />
    <text x="160" y="28" textAnchor="middle" fontSize="13" fontWeight="900" fill="#15803d">háromszorosa: 6 · 3 = 18</text>
    <path d="M 220 94 Q 160 136 100 94" fill="none" stroke="#e11d48" strokeWidth="3.5" />
    <path d="M 110 104 L 99 93 L 114 92 Z" fill="#e11d48" />
    <text x="160" y="140" textAnchor="middle" fontSize="13" fontWeight="900" fill="#be123c">harmada: 18 : 3 = 6</text>
  </svg>
);

/** Maradékos osztás: 14 korong, 4 karika, 2 kimarad. */
export const RemainderGroupsSvg: React.FC<{ className?: string }> = ({ className = DEF }) => (
  <svg viewBox="0 0 320 160" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV3_FONT}>
    <rect x="1" y="1" width="318" height="158" rx="14" fill="#fffbeb" stroke="#fde68a" />
    <text x="160" y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#78350f">
      14 korong hármasával
    </text>
    <RingedDotsPart x={95} y={46} n={14} ringed={4} perRow={6} step={26} r={9} color="#94a3b8" />
    <text x="140" y="102" fontSize="12" fontWeight="bold" fill="#dc2626">
      ← 2 kimaradt
    </text>
    <text x="160" y="130" textAnchor="middle" fontSize="14" fontWeight="900" fill="#1d4ed8">
      4 csoport lett, maradt 2.
    </text>
    <text x="160" y="150" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">
      Ellenőrzés: 4 · 3 = 12, és 12 + 2 = 14.
    </text>
  </svg>
);

/** Visszafelé ugrálás 14-től: 4 ugrás, 2 marad. */
export const JumpBackRemSvg: React.FC<{ className?: string }> = ({ className = DEF }) => (
  <svg viewBox="0 0 270 120" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV3_FONT}>
    <rect x="1" y="1" width="268" height="118" rx="14" fill="#fff1f2" stroke="#fecdd3" />
    <text x="135" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#881337">
      14-től vissza hármasával: 11, 8, 5, 2
    </text>
    <JumpBackPart x0={14} y={68} unit={7.8} start={14} labels={[0, 2, 5, 8, 11, 14, 20, 30]} />
    <text x="135" y="108" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">
      4 ugrás. A 2-ből már nem tudsz 3-at ugrani: maradt 2.
    </text>
  </svg>
);

/** A maradék csak 0, 1 vagy 2 lehet: 12, 13, 14, 15. */
export const RemainderRuleSvg: React.FC<{ className?: string }> = ({ className = DEF }) => (
  <svg viewBox="0 0 330 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV3_FONT}>
    <rect x="1" y="1" width="328" height="148" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    {[12, 13, 14, 15].map((n, i) => {
      const rest = n % 3;
      return (
        <g key={n}>
          <text x={45 + i * 80} y={22} textAnchor="middle" fontSize="15" fontWeight="900" fill="#0f172a">
            {n}
          </text>
          <RingedDotsPart x={27 + i * 80} y={40} n={n} ringed={Math.floor(n / 3)} perRow={3} step={18} r={5.5} color="#94a3b8" />
          <text x={45 + i * 80} y={142} textAnchor="middle" fontSize="12" fontWeight="900" fill={rest === 0 ? '#15803d' : '#dc2626'}>
            maradt {rest}
          </text>
        </g>
      );
    })}
  </svg>
);

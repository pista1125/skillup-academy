import React from 'react';
import { MULT9_FONT, JumpLinePart, DotArrayPart } from './Mult9G2Parts';

type FigProps = { className?: string };
const CLS = 'w-full max-w-[480px] h-auto mx-auto';

const BEAD_COLORS = ['#f97316', '#8b5cf6', '#0ea5e9'];

/** 1. Három karkötő, mindegyiken 9 gyöngy: 9 + 9 + 9 = 3 · 9 = 27 */
export const BeadStringsSvg: React.FC<FigProps> = ({ className = CLS }) => (
  <svg viewBox="0 0 480 220" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT9_FONT}>
    <rect x="2" y="2" width="476" height="216" rx="16" fill="#fff7ed" stroke="#fdba74" strokeWidth="2" />
    {[0, 1, 2].map((row) => {
      const y = 36 + row * 46;
      return (
        <g key={row}>
          <line x1="60" y1={y} x2="380" y2={y} stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
          {Array.from({ length: 9 }, (_, i) => (
            <circle key={i} cx={80 + i * 35} cy={y} r="14" fill={BEAD_COLORS[row]} stroke="#1e293b" strokeWidth="2" />
          ))}
          <text x="420" y={y + 8} textAnchor="middle" fontSize="24" fontWeight="bold" fill="#9a3412">
            9
          </text>
          {row < 2 && (
            <text x="450" y={y + 32} textAnchor="middle" fontSize="22" fontWeight="bold" fill="#334155">
              +
            </text>
          )}
        </g>
      );
    })}
    <text x="240" y="196" textAnchor="middle" fontSize="26" fontWeight="bold" fill="#9a3412">
      9 + 9 + 9 = 3 · 9 = 27
    </text>
  </svg>
);

/** 2. A 9-es szorzótábla pontráccsal (soronként 9 korong). */
export const NineTableArraySvg: React.FC<FigProps> = ({ className = CLS }) => {
  const rows = 10;
  const gap = 19;
  return (
    <svg viewBox="0 0 480 236" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT9_FONT}>
      <rect x="2" y="2" width="476" height="232" rx="16" fill="#fff7ed" stroke="#fdba74" strokeWidth="2" />
      <DotArrayPart x={50} y={30} rows={rows} cols={9} gap={gap} r={6.8} colorA="#f97316" />
      {Array.from({ length: rows }, (_, i) => (
        <g key={i}>
          <text x="24" y={30 + i * gap + 5} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#475569">
            {i + 1}.
          </text>
          <text x={i < 5 ? 232 : 352} y={42 + (i % 5) * 38} fontSize="21" fontWeight="bold" fill="#7c2d12">
            {i + 1} · 9 = {(i + 1) * 9}
          </text>
        </g>
      ))}
    </svg>
  );
};

/** 3. Tízes trükk: 6 · 10 = 60, minden sorból 1 el: 60 − 6 = 54 = 6 · 9 */
export const TenMinusOneSvg: React.FC<FigProps> = ({ className = CLS }) => (
  <svg viewBox="0 0 480 200" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT9_FONT}>
    <rect x="2" y="2" width="476" height="196" rx="16" fill="#f0f9ff" stroke="#7dd3fc" strokeWidth="2" />
    <DotArrayPart x={40} y={34} rows={6} cols={10} gap={24} r={8.5} colorA="#0ea5e9" crossCol={9} />
    <text x="365" y="62" fontSize="20" fontWeight="bold" fill="#075985">
      6 · 10 = 60
    </text>
    <text x="365" y="100" fontSize="20" fontWeight="bold" fill="#dc2626">
      60 − 6
    </text>
    <text x="365" y="138" fontSize="22" fontWeight="bold" fill="#7c2d12">
      6 · 9 = 54
    </text>
    <text x="150" y="186" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#334155">
      Minden sorból 1 korongot elveszünk.
    </text>
  </svg>
);

/** 4. Ujjtrükk: 4 · 9 — a 4. ujj behajtva, balra 3, jobbra 6 ujj: 36 */
export const FingerTrickSvg: React.FC<FigProps> = ({ className = CLS }) => {
  const bent = 4;
  const fingerX = (i: number) => 40 + (i - 1) * 40 + (i > 5 ? 24 : 0);
  const heights = [62, 86, 96, 88, 70, 70, 88, 96, 86, 62];
  return (
    <svg viewBox="0 0 480 240" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT9_FONT}>
      <rect x="2" y="2" width="476" height="236" rx="16" fill="#fdf4ff" stroke="#f0abfc" strokeWidth="2" />
      <rect x="28" y="142" width="204" height="46" rx="18" fill="#fed7aa" stroke="#9a3412" strokeWidth="2.5" />
      <rect x="252" y="142" width="204" height="46" rx="18" fill="#fed7aa" stroke="#9a3412" strokeWidth="2.5" />
      {Array.from({ length: 10 }, (_, k) => {
        const i = k + 1;
        const isBent = i === bent;
        const h = isBent ? 20 : heights[k];
        const x = fingerX(i);
        return (
          <g key={i}>
            <rect
              x={x}
              y={150 - h}
              width="28"
              height={h + 6}
              rx="13"
              fill={isBent ? '#e2e8f0' : i < bent ? '#c4b5fd' : '#fdba74'}
              stroke={isBent ? '#64748b' : '#7c2d12'}
              strokeWidth="2.5"
            />
            <text x={x + 14} y="208" textAnchor="middle" fontSize="14" fontWeight="bold" fill={isBent ? '#dc2626' : '#475569'}>
              {i}
            </text>
          </g>
        );
      })}
      <text x="94" y="36" textAnchor="middle" fontSize="17" fontWeight="bold" fill="#6d28d9">
        3 ujj: 3 tízes
      </text>
      <text x="340" y="36" textAnchor="middle" fontSize="17" fontWeight="bold" fill="#c2410c">
        6 ujj: 6 egyes
      </text>
      <text x="240" y="230" textAnchor="middle" fontSize="17" fontWeight="bold" fill="#334155">
        A 4. ujjat hajtjuk be: 4 · 9 = 36
      </text>
    </svg>
  );
};

/** 5. A 3-as, 6-os, 9-es tábla: az egyenlő szorzatok ugyanolyan színűek. */
export const ThreeSixNineTableSvg: React.FC<FigProps> = ({ className = CLS }) => {
  const rowsN = [3, 6, 9];
  const colors: Record<number, string> = {
    6: '#bae6fd',
    9: '#fde68a',
    12: '#bbf7d0',
    18: '#fbcfe8',
    24: '#ddd6fe',
    27: '#fed7aa',
    30: '#a5f3fc',
    36: '#fecaca',
    54: '#d9f99d'
  };
  const cw = 40;
  const x0 = 54;
  return (
    <svg viewBox="0 0 480 190" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT9_FONT}>
      <rect x="2" y="2" width="476" height="186" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      <rect x="14" y="16" width="40" height="34" fill="#16a34a" />
      <text x="34" y="40" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#ffffff">
        ·
      </text>
      {Array.from({ length: 10 }, (_, c) => (
        <g key={c}>
          <rect x={x0 + c * cw} y="16" width={cw} height="34" fill="#22c55e" stroke="#ffffff" />
          <text x={x0 + c * cw + cw / 2} y="40" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#ffffff">
            {c + 1}
          </text>
        </g>
      ))}
      {rowsN.map((n, r) => (
        <g key={n}>
          <rect x="14" y={50 + r * 40} width="40" height="40" fill="#0ea5e9" stroke="#ffffff" />
          <text x="34" y={76 + r * 40} textAnchor="middle" fontSize="18" fontWeight="bold" fill="#ffffff">
            {n}
          </text>
          {Array.from({ length: 10 }, (_, c) => {
            const v = n * (c + 1);
            const fill = colors[v] ?? '#ffffff';
            return (
              <g key={c}>
                <rect x={x0 + c * cw} y={50 + r * 40} width={cw} height="40" fill={fill} stroke="#cbd5e1" />
                <text x={x0 + c * cw + cw / 2} y={76 + r * 40} textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1e293b">
                  {v}
                </text>
              </g>
            );
          })}
        </g>
      ))}
      <text x="240" y="180" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#475569">
        Egyforma szín = egyforma szám: 3 · 6 = 9 · 2 = 18
      </text>
    </svg>
  );
};

/** 6. Egy 9-es ugrás = három 3-as ugrás (0–36). */
export const ThreeNineJumpsSvg: React.FC<FigProps> = ({ className = CLS }) => (
  <svg viewBox="0 0 480 236" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT9_FONT}>
    <rect x="2" y="2" width="476" height="232" rx="16" fill="#fff7ed" stroke="#fdba74" strokeWidth="2" />
    <text x="24" y="26" fontSize="15" fontWeight="bold" fill="#ea580c">
      Szöcske: mindig 9-et ugrik
    </text>
    <JumpLinePart x={40} y={84} w={400} max={36} jumps={4} step={9} color="#ea580c" unitTicks labelEvery={9} fontSize={14} />
    <text x="24" y="136" fontSize="15" fontWeight="bold" fill="#16a34a">
      Béka: mindig 3-at ugrik
    </text>
    <JumpLinePart x={40} y={192} w={400} max={36} jumps={12} step={3} color="#16a34a" unitTicks labelEvery={9} fontSize={14} />
  </svg>
);

import React from 'react';
import { ADD20_FONT, TwentyFramePart, TwoRowBeadsPart } from './Add20G2Parts';

// ---------------------------------------------------------------------------
// 4. Összeadás 20-as számkör – ábrák (2. osztály)
// ---------------------------------------------------------------------------

/** 10 + 6 = 16 a kétsoros golyós számolón. */
export const TenPlusOnesBeadsSvg: React.FC<{ className?: string }> = ({
  className = 'w-full max-w-md h-auto mx-auto'
}) => (
  <svg viewBox="0 0 320 155" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={ADD20_FONT}>
    <rect x="1" y="1" width="318" height="153" rx="14" fill="#f0f9ff" stroke="#bae6fd" />
    <text x="160" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">
      Egy teljes sor 10 golyó, alatta 6 golyó
    </text>
    <TwoRowBeadsPart x={28} y={54} w={264} topCount={10} bottomCount={6} />
    <text x="160" y="118" textAnchor="middle" fontSize="13" fill="#334155">
      1 tízes (10) + 6 egyes (6)
    </text>
    <text x="160" y="140" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1d4ed8">
      10 + 6 = 16
    </text>
  </svg>
);

/** Analógia tízesátlépés nélkül: 4 + 3 = 7 és 14 + 3 = 17. */
export const AnalogyNoCrossSvg: React.FC<{ className?: string }> = ({
  className = 'w-full max-w-md h-auto mx-auto'
}) => {
  const r = 7;
  const dx = 16;
  return (
    <svg viewBox="0 0 340 165" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={ADD20_FONT}>
      <rect x="1" y="1" width="338" height="163" rx="14" fill="#f0fdf4" stroke="#bbf7d0" />
      <text x="170" y="23" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#14532d">
        Ha tudod a kicsit, megy a nagy is!
      </text>

      {/* 4 + 3 = 7 */}
      <text x="20" y="54" fontSize="14" fontWeight="bold" fill="#0f172a">4 + 3 = 7</text>
      {Array.from({ length: 4 }, (_, i) => (
        <circle key={`a${i}`} cx={210 + i * dx} cy={49} r={r} fill="#f59e0b" stroke="#92400e" strokeWidth="1.1" />
      ))}
      {Array.from({ length: 3 }, (_, i) => (
        <circle key={`b${i}`} cx={278 + i * dx} cy={49} r={r} fill="#0d9488" stroke="#115e59" strokeWidth="1.1" />
      ))}

      {/* 14 + 3 = 17 */}
      <rect x="14" y="76" width="312" height="44" rx="8" fill="#ffffff" stroke="#86efac" strokeWidth="1.2" />
      <text x="24" y="103" fontSize="14" fontWeight="bold" fill="#0f172a">14 + 3 = 17</text>
      {/* 10 coral discs */}
      {Array.from({ length: 10 }, (_, i) => (
        <circle
          key={`c${i}`}
          cx={128 + (i % 5) * 14}
          cy={89 + Math.floor(i / 5) * 16}
          r={5.5}
          fill="#ef4444"
          stroke="#991b1b"
          strokeWidth="1"
        />
      ))}
      <rect x="200" y="82" width="120" height="32" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeDasharray="3 2" />
      {Array.from({ length: 4 }, (_, i) => (
        <circle key={`d${i}`} cx={210 + i * dx} cy={98} r={r} fill="#f59e0b" stroke="#92400e" strokeWidth="1.1" />
      ))}
      {Array.from({ length: 3 }, (_, i) => (
        <circle key={`e${i}`} cx={278 + i * dx} cy={98} r={r} fill="#0d9488" stroke="#115e59" strokeWidth="1.1" />
      ))}

      <text x="170" y="146" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#15803d">
        A 10-es marad, csak az egyesek (4 + 3 = 7) változnak!
      </text>
    </svg>
  );
};

/** 2 × 10-es keret tízesátlépéssel: 7 + 5 = 7 + 3 + 2 = 12. */
export const BridgingTwentyFrameSvg: React.FC<{ className?: string }> = ({
  className = 'w-full max-w-md h-auto mx-auto'
}) => (
  <svg viewBox="0 0 330 185" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={ADD20_FONT}>
    <rect x="1" y="1" width="328" height="183" rx="14" fill="#fff7ed" stroke="#fed7aa" />
    <text x="165" y="23" textAnchor="middle" fontSize="13.5" fontWeight="bold" fill="#9a3412">
      Tízesátlépés: előbb pótold 10-re!
    </text>
    <TwentyFramePart x={32} y={36} cell={26} firstCount={7} secondCount={5} highlightTenRow />
    <text x="307" y="54" fontSize="12" fontWeight="bold" fill="#15803d">10</text>
    <text x="307" y="80" fontSize="12" fontWeight="bold" fill="#1d4ed8">+ 2</text>

    {/* Decomposition diagram */}
    <text x="165" y="116" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0f172a">
      <tspan fill="#dc2626">7</tspan> + <tspan fill="#2563eb">5</tspan>
    </text>
    <line x1="178" y1="121" x2="155" y2="137" stroke="#2563eb" strokeWidth="1.8" />
    <line x1="184" y1="121" x2="205" y2="137" stroke="#2563eb" strokeWidth="1.8" />
    <text x="165" y="154" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">
      <tspan fill="#dc2626">7</tspan> + <tspan fill="#16a34a">3</tspan> + <tspan fill="#2563eb">2</tspan> = 10 + 2 = 12
    </text>
    <text x="165" y="173" textAnchor="middle" fontSize="11.5" fill="#7c2d12">
      Az 5-öt 3-ra és 2-re bontottuk, mert 7 + 3 = 10.
    </text>
  </svg>
);

/** Kétugrásos számegyenes 0-tól 20-ig: 8 + 5 = 8 + 2 + 3 = 13. */
export const TwoHopNumberLineSvg: React.FC<{ className?: string }> = ({
  className = 'w-full max-w-lg h-auto mx-auto'
}) => {
  const X0 = 20;
  const U = 15;
  const x = (v: number) => X0 + v * U;
  const yLine = 100;
  return (
    <svg viewBox="0 0 350 155" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={ADD20_FONT}>
      <rect x="1" y="1" width="348" height="153" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="175" y="22" textAnchor="middle" fontSize="13.5" fontWeight="bold" fill="#0f172a">
        Ugrás 10-re, majd tovább: 8 + 5 = 13
      </text>

      {/* Axis */}
      <line x1={x(0) - 6} y1={yLine} x2={x(20) + 12} y2={yLine} stroke="#334155" strokeWidth="2" />
      <path d={`M ${x(20) + 12} ${yLine - 4} L ${x(20) + 19} ${yLine} L ${x(20) + 12} ${yLine + 4} Z`} fill="#334155" />
      {Array.from({ length: 21 }, (_, v) => {
        const major = v % 10 === 0;
        const mid = v % 5 === 0;
        return (
          <line
            key={v}
            x1={x(v)}
            y1={major ? yLine - 9 : mid ? yLine - 6 : yLine - 4}
            x2={x(v)}
            y2={major ? yLine + 9 : mid ? yLine + 6 : yLine + 4}
            stroke={v === 10 ? '#16a34a' : '#334155'}
            strokeWidth={major ? 2 : 1}
          />
        );
      })}
      {[0, 5, 8, 10, 13, 15, 20].map((v) => (
        <text
          key={v}
          x={x(v)}
          y={yLine + 23}
          textAnchor="middle"
          fontSize="11.5"
          fontWeight={v === 8 || v === 10 || v === 13 ? 'bold' : 'normal'}
          fill={v === 10 ? '#15803d' : v === 13 ? '#1d4ed8' : v === 8 ? '#dc2626' : '#334155'}
        >
          {v}
        </text>
      ))}

      {/* Points */}
      <circle cx={x(8)} cy={yLine} r="4.5" fill="#dc2626" />
      <circle cx={x(10)} cy={yLine} r="4.5" fill="#16a34a" />
      <circle cx={x(13)} cy={yLine} r="5" fill="#2563eb" />

      {/* Hop 1: 8 -> 10 (+2) */}
      <path d={`M ${x(8)} ${yLine - 6} Q ${x(9)} ${yLine - 42} ${x(10) - 2} ${yLine - 8}`} fill="none" stroke="#16a34a" strokeWidth="2.2" />
      <path d={`M ${x(10) - 6} ${yLine - 13} L ${x(10) - 1} ${yLine - 7} L ${x(10) + 2} ${yLine - 14}`} fill="none" stroke="#16a34a" strokeWidth="2" />
      <text x={x(9)} y={yLine - 34} textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#15803d">+ 2</text>

      {/* Hop 2: 10 -> 13 (+3) */}
      <path d={`M ${x(10) + 2} ${yLine - 6} Q ${x(11.5)} ${yLine - 48} ${x(13) - 2} ${yLine - 8}`} fill="none" stroke="#2563eb" strokeWidth="2.2" />
      <path d={`M ${x(13) - 6} ${yLine - 13} L ${x(13) - 1} ${yLine - 7} L ${x(13) + 2} ${yLine - 14}`} fill="none" stroke="#2563eb" strokeWidth="2" />
      <text x={x(11.5)} y={yLine - 38} textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#1d4ed8">+ 3</text>

      <text x="175" y="142" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e293b">
        8 + 2 = 10, aztán 10 + 3 = 13
      </text>
    </svg>
  );
};

/** Háromszintes számpiramis: 4, 5, 6 -> 9, 11 -> 20. */
export const AdditionPyramidSvg: React.FC<{ className?: string }> = ({
  className = 'w-full max-w-sm h-auto mx-auto'
}) => {
  const bw = 64;
  const bh = 32;
  const drawBrick = (x: number, y: number, val: string, bg: string, stroke: string, color = '#0f172a') => (
    <g>
      <rect x={x} y={y} width={bw} height={bh} rx="6" fill={bg} stroke={stroke} strokeWidth="1.8" />
      <text x={x + bw / 2} y={y + 22} textAnchor="middle" fontSize="16" fontWeight="bold" fill={color}>
        {val}
      </text>
    </g>
  );
  return (
    <svg viewBox="0 0 280 165" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={ADD20_FONT}>
      <rect x="1" y="1" width="278" height="163" rx="14" fill="#fefce8" stroke="#fde68a" />
      <text x="140" y="23" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#854d0e">
        Számpiramis: a két alsó összege áll felül
      </text>
      {drawBrick(108, 34, '20', '#fef08a', '#ca8a04', '#854d0e')}
      {drawBrick(76, 70, '9', '#dbeafe', '#2563eb', '#1e3a8a')}
      {drawBrick(140, 70, '11', '#dbeafe', '#2563eb', '#1e3a8a')}
      {drawBrick(44, 106, '4', '#dcfce7', '#16a34a', '#14532d')}
      {drawBrick(108, 106, '5', '#dcfce7', '#16a34a', '#14532d')}
      {drawBrick(172, 106, '6', '#dcfce7', '#16a34a', '#14532d')}
      <text x="140" y="154" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#713f12">
        4 + 5 = 9,   5 + 6 = 11,   9 + 11 = 20
      </text>
    </svg>
  );
};

/** Egyértelmű 3×3-as bűvös négyzet (összeg: 15). */
export const MagicSquareSvg: React.FC<{ className?: string }> = ({
  className = 'w-full max-w-sm h-auto mx-auto'
}) => {
  const grid = [
    ['8', '1', '?'],
    ['3', '5', '7'],
    ['4', '9', '2']
  ];
  const S = 38;
  const X0 = 60;
  const Y0 = 32;
  return (
    <svg viewBox="0 0 280 180" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={ADD20_FONT}>
      <rect x="1" y="1" width="278" height="178" rx="14" fill="#fdf4ff" stroke="#f5d0fe" />
      <text x="140" y="21" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#6b21a8">
        Bűvös négyzet: minden sor, oszlop, átló = 15
      </text>
      {/* Target badge */}
      <circle cx="222" cy="70" r="22" fill="#f3e8ff" stroke="#9333ea" strokeWidth="2" />
      <text x="222" y="65" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#6b21a8">összeg</text>
      <text x="222" y="81" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#581c87">15</text>

      {grid.map((row, r) =>
        row.map((val, c) => {
          const isQ = val === '?';
          return (
            <g key={`${r}-${c}`}>
              <rect
                x={X0 + c * S}
                y={Y0 + r * S}
                width={S}
                height={S}
                fill={isQ ? '#fee2e2' : '#ffffff'}
                stroke="#9333ea"
                strokeWidth="1.5"
              />
              <text
                x={X0 + c * S + S / 2}
                y={Y0 + r * S + 25}
                textAnchor="middle"
                fontSize="18"
                fontWeight="bold"
                fill={isQ ? '#dc2626' : '#1e293b'}
              >
                {val}
              </text>
            </g>
          );
        })
      )}
      <text x="140" y="166" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#581c87">
        Első sor: 8 + 1 + ? = 15, tehát ? = 6
      </text>
    </svg>
  );
};

import React from 'react';
import { MULT8_FONT, JumpLinePart, DotArrayPart, SpiderPart, RodPart } from './Mult8G2Parts';

type FigProps = { className?: string };
const CLS = 'w-full max-w-[480px] h-auto mx-auto';

/** 1. Három pók = 8 + 8 + 8 = 3 · 8 = 24 láb */
export const SpiderGroupsSvg: React.FC<FigProps> = ({ className = CLS }) => (
  <svg viewBox="0 0 480 200" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT8_FONT}>
    <rect x="2" y="2" width="476" height="196" rx="16" fill="#eef2ff" stroke="#a5b4fc" strokeWidth="2" />
    <path d="M 20 20 L 460 20" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4 4" />
    {[90, 240, 390].map((x, i) => (
      <g key={x}>
        <line x1={x} y1="20" x2={x} y2="44" stroke="#94a3b8" strokeWidth="1.5" />
        <SpiderPart cx={x} cy={70} s={1.5} color={['#4338ca', '#7c3aed', '#0e7490'][i]} />
        <text x={x} y={140} textAnchor="middle" fontSize="22" fontWeight="bold" fill="#3730a3">
          8 láb
        </text>
        {i < 2 && (
          <text x={x + 75} y={140} textAnchor="middle" fontSize="24" fontWeight="bold" fill="#334155">
            +
          </text>
        )}
      </g>
    ))}
    <text x="240" y="182" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#3730a3">
      8 + 8 + 8 = 3 · 8 = 24
    </text>
  </svg>
);

/** 2. A 8-as szorzótábla pontráccsal (soronként 8 korong). */
export const EightTableArraySvg: React.FC<FigProps> = ({ className = CLS }) => {
  const rows = 10;
  const gap = 19;
  return (
    <svg viewBox="0 0 480 236" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT8_FONT}>
      <rect x="2" y="2" width="476" height="232" rx="16" fill="#eef2ff" stroke="#a5b4fc" strokeWidth="2" />
      <DotArrayPart x={50} y={30} rows={rows} cols={8} gap={15} r={5.6} colors={['#6366f1', '#6366f1', '#f97316']} />
      {Array.from({ length: rows }, (_, i) => (
        <g key={i}>
          <text x="26" y={30 + i * gap * 0.79 + 5} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#475569">
            {i + 1}.
          </text>
          <text x={i < 5 ? 210 : 345} y={42 + (i % 5) * 38} fontSize="21" fontWeight="bold" fill="#312e81">
            {i + 1} · 8 = {(i + 1) * 8}
          </text>
        </g>
      ))}
    </svg>
  );
};

/** 3. Nyolcas ugrások a számegyenesen 0-tól 80-ig. */
export const EightJumpsLineSvg: React.FC<FigProps> = ({ className = CLS }) => (
  <svg viewBox="0 0 480 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT8_FONT}>
    <rect x="2" y="2" width="476" height="146" rx="16" fill="#fff7ed" stroke="#fdba74" strokeWidth="2" />
    <text x="24" y="28" fontSize="15" fontWeight="bold" fill="#4f46e5">
      Mindig 8-at ugrunk:
    </text>
    <JumpLinePart x={30} y={90} w={410} max={80} jumps={10} step={8} />
    {[8, 16, 24, 32, 40, 48, 56, 64, 72, 80].map((v) => (
      <text key={v} x={30 + (v - 4) * (410 / 80)} y={64} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#c2410c">
        {v}
      </text>
    ))}
    <text x="240" y="136" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#334155">
      A végük: 8, 6, 4, 2, 0, aztán újra 8, 6, 4, 2, 0
    </text>
  </svg>
);

/** 4. Duplázás háromszor: 3 · 2 = 6 → 3 · 4 = 12 → 3 · 8 = 24 */
export const DoubleChainSvg: React.FC<FigProps> = ({ className = CLS }) => (
  <svg viewBox="0 0 480 190" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT8_FONT}>
    <rect x="2" y="2" width="476" height="186" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
    <DotArrayPart x={36} y={46} rows={3} cols={2} gap={18} r={6.5} colors={['#0ea5e9', '#f97316', '#6366f1']} />
    <text x="45" y="138" textAnchor="middle" fontSize="17" fontWeight="bold" fill="#0369a1">
      3 · 2 = 6
    </text>
    <text x="100" y="72" textAnchor="middle" fontSize="26" fontWeight="bold" fill="#334155">
      →
    </text>
    <DotArrayPart x={136} y={46} rows={3} cols={4} gap={18} r={6.5} colors={['#0ea5e9', '#f97316', '#6366f1']} />
    <text x="168" y="138" textAnchor="middle" fontSize="17" fontWeight="bold" fill="#c2410c">
      3 · 4 = 12
    </text>
    <text x="236" y="72" textAnchor="middle" fontSize="26" fontWeight="bold" fill="#334155">
      →
    </text>
    <DotArrayPart x={272} y={46} rows={3} cols={8} gap={18} r={6.5} colors={['#0ea5e9', '#f97316', '#6366f1']} />
    <text x="347" y="138" textAnchor="middle" fontSize="17" fontWeight="bold" fill="#4338ca">
      3 · 8 = 24
    </text>
    <text x="240" y="174" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#334155">
      6 + 6 = 12, 12 + 12 = 24
    </text>
    <text x="240" y="26" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#475569">
      Duplázd meg, aztán még egyszer duplázd meg!
    </text>
  </svg>
);

/** 5. Színes rudak: 1 bordó (8) = 2 rózsaszín (4) = 4 piros (2) */
export const RodsSvg: React.FC<FigProps> = ({ className = CLS }) => (
  <svg viewBox="0 0 480 180" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT8_FONT}>
    <rect x="2" y="2" width="476" height="176" rx="16" fill="#fdf2f8" stroke="#f9a8d4" strokeWidth="2" />
    <RodPart x={40} y={26} units={8} u={36} h={30} />
    <RodPart x={40} y={72} units={4} u={36} h={30} />
    <RodPart x={184} y={72} units={4} u={36} h={30} />
    {[0, 1, 2, 3].map((i) => (
      <RodPart key={i} x={40 + i * 72} y={118} units={2} u={36} h={30} />
    ))}
    <text x="350" y="47" fontSize="17" fontWeight="bold" fill="#881337">
      1 bordó
    </text>
    <text x="350" y="93" fontSize="17" fontWeight="bold" fill="#be185d">
      2 rózsaszín
    </text>
    <text x="350" y="139" fontSize="17" fontWeight="bold" fill="#b91c1c">
      4 piros
    </text>
    <text x="240" y="170" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#475569">
      Mind a három sor ugyanolyan hosszú.
    </text>
  </svg>
);

/** 6. Felcserélés: 3 · 8 = 8 · 3 */
export const CommuteArraySvg: React.FC<FigProps> = ({ className = CLS }) => (
  <svg viewBox="0 0 480 220" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT8_FONT}>
    <rect x="2" y="2" width="476" height="216" rx="16" fill="#f0f9ff" stroke="#7dd3fc" strokeWidth="2" />
    <DotArrayPart x={36} y={60} rows={3} cols={8} gap={21} r={7.5} colors={['#0ea5e9', '#0ea5e9', '#0ea5e9']} split={false} />
    <text x="110" y="148" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#075985">
      3 · 8 = 24
    </text>
    <text x="240" y="110" textAnchor="middle" fontSize="34" fontWeight="bold" fill="#334155">
      =
    </text>
    <DotArrayPart x={330} y={30} rows={8} cols={3} gap={19} r={7} colors={['#f97316', '#f97316', '#f97316']} split={false} />
    <text x="420" y="110" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#9a3412">
      8 · 3
    </text>
    <text x="420" y="136" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#9a3412">
      = 24
    </text>
  </svg>
);

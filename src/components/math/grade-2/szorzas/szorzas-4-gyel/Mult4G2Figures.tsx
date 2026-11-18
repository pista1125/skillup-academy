import React from 'react';
import { MULT4_FONT, JumpLinePart, DotArrayPart } from './Mult4G2Parts';

type FigProps = { className?: string };
const CLS = 'w-full max-w-[480px] h-auto mx-auto';

/** Négylevelű lóhere. */
const Clover: React.FC<{ cx: number; cy: number; s?: number }> = ({ cx, cy, s = 1 }) => (
  <g transform={`translate(${cx} ${cy}) scale(${s})`}>
    <path d="M 0 8 Q 4 30 -6 44" fill="none" stroke="#15803d" strokeWidth="3.5" strokeLinecap="round" />
    {[0, 90, 180, 270].map((a) => (
      <g key={a} transform={`rotate(${a + 45})`}>
        <path d="M 0 0 C -14 -8 -14 -26 0 -22 C 14 -26 14 -8 0 0 Z" fill="#22c55e" stroke="#166534" strokeWidth="2" />
      </g>
    ))}
    <circle r="3" fill="#166534" />
  </g>
);

/** 1. Három lóhere = 4 + 4 + 4 = 3 · 4 = 12 */
export const CloverGroupsSvg: React.FC<FigProps> = ({ className = CLS }) => (
  <svg viewBox="0 0 480 200" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT4_FONT}>
    <rect x="2" y="2" width="476" height="196" rx="16" fill="#f0fdf4" stroke="#86efac" strokeWidth="2" />
    {[90, 240, 390].map((x, i) => (
      <g key={x}>
        <Clover cx={x} cy={62} s={1.25} />
        <text x={x} y={140} textAnchor="middle" fontSize="22" fontWeight="bold" fill="#166534">
          4
        </text>
        {i < 2 && (
          <text x={x + 75} y={140} textAnchor="middle" fontSize="22" fontWeight="bold" fill="#334155">
            +
          </text>
        )}
      </g>
    ))}
    <text x="240" y="182" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#5b21b6">
      4 + 4 + 4 = 3 · 4 = 12
    </text>
  </svg>
);

/** 2. A 4-es szorzótábla pontráccsal. */
export const FourTableArraySvg: React.FC<FigProps> = ({ className = CLS }) => {
  const rows = 10;
  const gap = 19;
  return (
    <svg viewBox="0 0 480 236" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT4_FONT}>
      <rect x="2" y="2" width="476" height="232" rx="16" fill="#f5f3ff" stroke="#c4b5fd" strokeWidth="2" />
      <DotArrayPart x={64} y={30} rows={rows} cols={4} gap={gap} r={6.8} splitCol={2} />
      {Array.from({ length: rows }, (_, i) => (
        <g key={i}>
          <text x="34" y={30 + i * gap + 5} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#475569">
            {i + 1}.
          </text>
          <text x={i < 5 ? 190 : 340} y={42 + (i % 5) * 38} fontSize="21" fontWeight="bold" fill="#4c1d95">
            {i + 1} · 4 = {(i + 1) * 4}
          </text>
        </g>
      ))}
    </svg>
  );
};

/** 3. Kenguru és béka a számegyenesen: a 4 és a 2 többszörösei. */
export const KangarooFrogLineSvg: React.FC<FigProps> = ({ className = CLS }) => (
  <svg viewBox="0 0 480 200" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT4_FONT}>
    <rect x="2" y="2" width="476" height="196" rx="16" fill="#fff7ed" stroke="#fdba74" strokeWidth="2" />
    <text x="24" y="26" fontSize="15" fontWeight="bold" fill="#7c3aed">
      Kenguru: mindig 4-et ugrik
    </text>
    <JumpLinePart x={40} y={70} w={400} max={40} jumps={10} step={4} color="#7c3aed" />
    <text x="24" y="118" fontSize="15" fontWeight="bold" fill="#16a34a">
      Béka: mindig 2-t ugrik
    </text>
    <JumpLinePart x={40} y={156} w={400} max={40} jumps={20} step={2} color="#16a34a" />
  </svg>
);

/** 4. Duplázás duplája: 6 · 2 = 12, 6 · 4 = 12 + 12 = 24 */
export const DoubleDoubleSvg: React.FC<FigProps> = ({ className = CLS }) => (
  <svg viewBox="0 0 480 200" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT4_FONT}>
    <rect x="2" y="2" width="476" height="196" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
    <DotArrayPart x={50} y={36} rows={6} cols={2} gap={22} r={8} />
    <text x="72" y="182" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#6d28d9">
      6 · 2 = 12
    </text>
    <text x="155" y="100" textAnchor="middle" fontSize="30" fontWeight="bold" fill="#334155">
      →
    </text>
    <DotArrayPart x={210} y={36} rows={6} cols={4} gap={22} r={8} splitCol={2} />
    <text x="252" y="182" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#c2410c">
      12 + 12 = 24
    </text>
    <text x="400" y="92" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#4c1d95">
      6 · 4
    </text>
    <text x="400" y="120" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#4c1d95">
      = 24
    </text>
  </svg>
);

/** 5. Felcserélés: 3 · 4 = 4 · 3 */
export const CommuteArraySvg: React.FC<FigProps> = ({ className = CLS }) => (
  <svg viewBox="0 0 480 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT4_FONT}>
    <rect x="2" y="2" width="476" height="166" rx="16" fill="#f0f9ff" stroke="#7dd3fc" strokeWidth="2" />
    <DotArrayPart x={60} y={40} rows={3} cols={4} gap={26} r={9} colorA="#0ea5e9" />
    <text x="99" y="146" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#075985">
      3 · 4 = 12
    </text>
    <text x="240" y="80" textAnchor="middle" fontSize="34" fontWeight="bold" fill="#334155">
      =
    </text>
    <DotArrayPart x={330} y={30} rows={4} cols={3} gap={26} r={9} colorA="#f97316" />
    <text x="356" y="146" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#9a3412">
      4 · 3 = 12
    </text>
  </svg>
);

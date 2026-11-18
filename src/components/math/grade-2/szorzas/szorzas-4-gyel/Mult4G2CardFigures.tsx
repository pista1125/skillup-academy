import React from 'react';
import { BOX_COLORS, FourBoxPart, MULT4_FONT } from './Mult4G2Parts';

/** n darab négyes doboz. 150 × 80 (párosító) vagy 80 × 80 (small, csoportosító). */
export const GroupsCard: React.FC<{ n: number; small?: boolean }> = ({ n, small = false }) => {
  const W = small ? 80 : 150;
  const perRow = small ? 3 : n > 8 ? 5 : 4;
  const rows = Math.ceil(n / perRow);
  const size = small ? (rows > 2 ? 20 : 22) : perRow === 5 ? 24 : rows > 1 ? 28 : 30;
  const gx = small ? 25 : perRow === 5 ? 28 : size + 6;
  const gy = small ? (rows > 2 ? 24 : 30) : size + 6;
  const usedW = (Math.min(n, perRow) - 1) * gx + size;
  const usedH = (rows - 1) * gy + size;
  const x0 = (W - usedW) / 2;
  const y0 = (80 - usedH) / 2;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width={W - 6} height="74" rx="10" fill="#f5f3ff" stroke="#334155" strokeWidth="3" />
      {Array.from({ length: n }, (_, i) => (
        <FourBoxPart key={i} x={x0 + (i % perRow) * gx} y={y0 + Math.floor(i / perRow) * gy} size={size} color={BOX_COLORS[i % BOX_COLORS.length]} />
      ))}
    </svg>
  );
};

/** n oszlop, oszloponként 4 korong (n · 4). */
export const ColumnsCard: React.FC<{ n: number; small?: boolean }> = ({ n, small = false }) => {
  const W = small ? 80 : 150;
  const gx = small ? Math.min(13, 66 / n) : Math.min(14, 128 / n);
  const r = small ? Math.min(4.6, gx * 0.4) : 5;
  const gy = small ? 15 : 14;
  const usedW = (n - 1) * gx;
  const x0 = (W - usedW) / 2;
  const y0 = 40 - 1.5 * gy;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width={W - 6} height="74" rx="10" fill="#fff7ed" stroke="#334155" strokeWidth="3" />
      {Array.from({ length: n * 4 }, (_, i) => {
        const c = Math.floor(i / 4);
        const rr = i % 4;
        return (
          <circle key={i} cx={x0 + c * gx} cy={y0 + rr * gy} r={r} fill={c % 2 === 0 ? '#8b5cf6' : '#f97316'} stroke="#1e293b" strokeWidth="1.3" />
        );
      })}
    </svg>
  );
};

/** Számegyenes 4-es ugrásokkal. `endLabel`: a cél felirata; `unknownJumps`: csak az első ugrás látszik. */
export const JumpsCard: React.FC<{ jumps: number; small?: boolean; endLabel?: string; unknownJumps?: boolean }> = ({
  jumps,
  small = false,
  endLabel = '?',
  unknownJumps = false
}) => {
  const W = small ? 80 : 150;
  const x0 = small ? 8 : 12;
  const w = small ? 62 : 124;
  const u = w / 40;
  const y = small ? 52 : 54;
  const end = x0 + jumps * 4 * u;
  const drawn = unknownJumps ? 1 : jumps;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT4_FONT}>
      <rect x="3" y="3" width={W - 6} height="74" rx="10" fill="#f8fafc" stroke="#334155" strokeWidth="3" />
      <line x1={x0 - 2} y1={y} x2={x0 + w + 4} y2={y} stroke="#334155" strokeWidth="2.5" />
      {Array.from({ length: 11 }, (_, i) => (
        <line key={i} x1={x0 + i * 4 * u} y1={y - 4} x2={x0 + i * 4 * u} y2={y + 4} stroke="#334155" strokeWidth="1.6" />
      ))}
      <text x={x0} y={y + 20} textAnchor="middle" fontSize={small ? 12 : 14} fontWeight="bold" fill="#334155">
        0
      </text>
      {Array.from({ length: drawn }, (_, i) => {
        const a = x0 + i * 4 * u;
        const b = x0 + (i + 1) * 4 * u;
        return <path key={i} d={`M ${a} ${y - 2} Q ${(a + b) / 2} ${y - 22} ${b} ${y - 2}`} fill="none" stroke="#7c3aed" strokeWidth="2.6" />;
      })}
      {unknownJumps && (
        <>
          <text x={x0 + 2 * u} y={y - 16} textAnchor="middle" fontSize={small ? 10 : 12} fontWeight="bold" fill="#7c3aed">
            4
          </text>
          <line x1={x0 + 4 * u} y1={y - 8} x2={end} y2={y - 8} stroke="#7c3aed" strokeWidth="2" strokeDasharray="3 3" />
        </>
      )}
      <circle cx={end} cy={y} r="4" fill="#dc2626" />
      <text x={Math.min(end, W - 14)} y={y + 20} textAnchor="middle" fontSize={small ? 13 : 16} fontWeight="bold" fill="#dc2626">
        {endLabel}
      </text>
    </svg>
  );
};

/** n · 2 = … → n · 4 = ? (párosítóhoz) */
export const DoubleCard150: React.FC<{ n: number }> = ({ n }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={MULT4_FONT}>
    <rect x="3" y="3" width="144" height="74" rx="10" fill="#ecfdf5" stroke="#334155" strokeWidth="3" />
    <text x="75" y="32" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#047857">
      {n} · 2 = {n * 2}
    </text>
    <text x="75" y="64" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#4c1d95">
      {n} · 4 = <tspan fill="#dc2626">?</tspan>
    </text>
  </svg>
);

/** „? · (doboz) = total” — hány doboz kell? */
export const HowManyBoxesCard150: React.FC<{ total: number }> = ({ total }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={MULT4_FONT}>
    <rect x="3" y="3" width="144" height="74" rx="10" fill="#f5f3ff" stroke="#334155" strokeWidth="3" />
    <text x="24" y="50" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#dc2626">
      ?
    </text>
    <text x="42" y="50" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#334155">
      ·
    </text>
    <FourBoxPart x={52} y={24} size={32} color="#8b5cf6" />
    <text x="116" y="49" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#334155">
      = {total}
    </text>
  </svg>
);

/** n pár korong (2 sorban), opcionálisan +1 magányos korong (80 × 80). */
export const PairsCard80: React.FC<{ pairs: number; extra?: boolean }> = ({ pairs, extra = false }) => {
  const cols = pairs + (extra ? 1 : 0);
  const gx = Math.min(13, 64 / cols);
  const x0 = 40 - ((cols - 1) * gx) / 2;
  const r = Math.min(5, gx * 0.4);
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="74" height="74" rx="10" fill="#f0f9ff" stroke="#334155" strokeWidth="3" />
      {Array.from({ length: pairs }, (_, i) => (
        <g key={i}>
          <circle cx={x0 + i * gx} cy={32} r={r} fill="#0ea5e9" stroke="#0c4a6e" strokeWidth="1.3" />
          <circle cx={x0 + i * gx} cy={48} r={r} fill="#0ea5e9" stroke="#0c4a6e" strokeWidth="1.3" />
        </g>
      ))}
      {extra && <circle cx={x0 + pairs * gx} cy={32} r={r} fill="#f97316" stroke="#7c2d12" strokeWidth="1.3" />}
    </svg>
  );
};

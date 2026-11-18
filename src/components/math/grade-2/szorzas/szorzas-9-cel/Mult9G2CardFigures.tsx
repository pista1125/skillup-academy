import React from 'react';
import { BOX_COLORS, NineBoxPart, MULT9_FONT } from './Mult9G2Parts';

/** n darab kilences doboz (3 × 3 korong). 150 × 80 (párosító) vagy 80 × 80 (small, csoportosító). */
export const GroupsCard: React.FC<{ n: number; small?: boolean }> = ({ n, small = false }) => {
  const W = small ? 80 : 150;
  const perRow = small ? (n > 6 ? 4 : 3) : n > 8 ? 5 : 4;
  const rows = Math.ceil(n / perRow);
  const size = small ? (perRow === 4 ? 16 : rows > 2 ? 19 : 22) : perRow === 5 ? 24 : rows > 1 ? 28 : 30;
  const gx = small ? size + 3 : perRow === 5 ? 27 : size + 5;
  const gy = small ? size + 3 : size + 5;
  const usedW = (Math.min(n, perRow) - 1) * gx + size;
  const usedH = (rows - 1) * gy + size;
  const x0 = (W - usedW) / 2;
  const y0 = (80 - usedH) / 2;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width={W - 6} height="74" rx="10" fill="#fff7ed" stroke="#334155" strokeWidth="3" />
      {Array.from({ length: n }, (_, i) => (
        <NineBoxPart key={i} x={x0 + (i % perRow) * gx} y={y0 + Math.floor(i / perRow) * gy} size={size} color={BOX_COLORS[i % BOX_COLORS.length]} />
      ))}
    </svg>
  );
};

/** n sor, soronként 9 korong (n · 9) — csak párosítóhoz (150 × 80). */
export const RowsCard: React.FC<{ n: number }> = ({ n }) => {
  const gy = Math.min(13, 64 / n);
  const r = Math.min(5, gy * 0.42);
  const gx = 13;
  const x0 = 75 - 4 * gx;
  const y0 = 40 - ((n - 1) * gy) / 2;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="144" height="74" rx="10" fill="#f0f9ff" stroke="#334155" strokeWidth="3" />
      {Array.from({ length: n * 9 }, (_, i) => {
        const rr = Math.floor(i / 9);
        const c = i % 9;
        return <circle key={i} cx={x0 + c * gx} cy={y0 + rr * gy} r={r} fill={rr % 2 === 0 ? '#f97316' : '#0ea5e9'} stroke="#1e293b" strokeWidth="1.1" />;
      })}
    </svg>
  );
};

/** Számegyenes 0–90, 9-es ugrásokkal. `endLabel`: a cél felirata; `unknownJumps`: csak az első ugrás látszik. */
export const JumpsCard: React.FC<{ jumps: number; small?: boolean; endLabel?: string; unknownJumps?: boolean }> = ({
  jumps,
  small = false,
  endLabel = '?',
  unknownJumps = false
}) => {
  const W = small ? 80 : 150;
  const x0 = small ? 8 : 12;
  const w = small ? 62 : 124;
  const u = w / 90;
  const y = small ? 52 : 54;
  const end = x0 + jumps * 9 * u;
  const drawn = unknownJumps ? 1 : jumps;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT9_FONT}>
      <rect x="3" y="3" width={W - 6} height="74" rx="10" fill="#f8fafc" stroke="#334155" strokeWidth="3" />
      <line x1={x0 - 2} y1={y} x2={x0 + w + 4} y2={y} stroke="#334155" strokeWidth="2.5" />
      {Array.from({ length: 11 }, (_, i) => (
        <line key={i} x1={x0 + i * 9 * u} y1={y - 4} x2={x0 + i * 9 * u} y2={y + 4} stroke="#334155" strokeWidth="1.6" />
      ))}
      <text x={x0} y={y + 20} textAnchor="middle" fontSize={small ? 12 : 14} fontWeight="bold" fill="#334155">
        0
      </text>
      {Array.from({ length: drawn }, (_, i) => {
        const a = x0 + i * 9 * u;
        const b = x0 + (i + 1) * 9 * u;
        return <path key={i} d={`M ${a} ${y - 2} Q ${(a + b) / 2} ${y - 22} ${b} ${y - 2}`} fill="none" stroke="#ea580c" strokeWidth="2.6" />;
      })}
      {unknownJumps && (
        <>
          <text x={x0 + 4.5 * u} y={y - 16} textAnchor="middle" fontSize={small ? 10 : 12} fontWeight="bold" fill="#ea580c">
            9
          </text>
          <line x1={x0 + 9 * u} y1={y - 8} x2={end} y2={y - 8} stroke="#ea580c" strokeWidth="2" strokeDasharray="3 3" />
        </>
      )}
      <circle cx={end} cy={y} r="4" fill="#dc2626" />
      <text x={Math.min(end, W - 14)} y={y + 20} textAnchor="middle" fontSize={small ? 13 : 16} fontWeight="bold" fill="#dc2626">
        {endLabel}
      </text>
    </svg>
  );
};

/** n · 10 = … → n · 9 = ? (párosítóhoz) */
export const TenMinusCard150: React.FC<{ n: number }> = ({ n }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={MULT9_FONT}>
    <rect x="3" y="3" width="144" height="74" rx="10" fill="#ecfeff" stroke="#334155" strokeWidth="3" />
    <text x="75" y="32" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0369a1">
      {n} · 10 = {n * 10}
    </text>
    <text x="75" y="64" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#7c2d12">
      {n} · 9 = <tspan fill="#dc2626">?</tspan>
    </text>
  </svg>
);

/** „? · (kilences doboz) = total” — hány doboz kell? */
export const HowManyBoxesCard150: React.FC<{ total: number }> = ({ total }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={MULT9_FONT}>
    <rect x="3" y="3" width="144" height="74" rx="10" fill="#fff7ed" stroke="#334155" strokeWidth="3" />
    <text x="24" y="50" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#dc2626">
      ?
    </text>
    <text x="42" y="50" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#334155">
      ·
    </text>
    <NineBoxPart x={52} y={23} size={34} color="#f97316" />
    <text x="116" y="49" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#334155">
      = {total}
    </text>
  </svg>
);

/** n hármas oszlop (3 korong egymás alatt), opcionálisan +1 magányos korong (80 × 80). */
export const TriplesCard80: React.FC<{ n: number; extra?: boolean }> = ({ n, extra = false }) => {
  const cols = n + (extra ? 1 : 0);
  const gx = Math.min(13, 66 / cols);
  const x0 = 40 - ((cols - 1) * gx) / 2;
  const r = Math.min(5, gx * 0.4);
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="74" height="74" rx="10" fill="#f0fdf4" stroke="#334155" strokeWidth="3" />
      {Array.from({ length: n }, (_, i) => (
        <g key={i}>
          {[26, 40, 54].map((cy) => (
            <circle key={cy} cx={x0 + i * gx} cy={cy} r={r} fill="#16a34a" stroke="#14532d" strokeWidth="1.2" />
          ))}
        </g>
      ))}
      {extra && <circle cx={x0 + n * gx} cy={26} r={r} fill="#f97316" stroke="#7c2d12" strokeWidth="1.2" />}
    </svg>
  );
};

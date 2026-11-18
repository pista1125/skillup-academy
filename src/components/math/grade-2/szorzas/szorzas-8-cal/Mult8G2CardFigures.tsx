import React from 'react';
import { BOX_COLORS, EightBoxPart, MULT8_FONT } from './Mult8G2Parts';

/** n darab nyolcas doboz. 150 × 80 (párosító) vagy 80 × 80 (small, csoportosító). n ≤ 8. */
export const GroupsCard: React.FC<{ n: number; small?: boolean }> = ({ n, small = false }) => {
  const W = small ? 80 : 150;
  let perRow: number;
  let bh: number;
  let gy: number;
  if (small) {
    perRow = 2;
    bh = n > 6 ? 14 : 17;
    gy = n > 6 ? 17 : 21;
  } else if (n <= 3) {
    perRow = n;
    bh = 24;
    gy = 30;
  } else {
    perRow = 4;
    bh = 17;
    gy = 25;
  }
  const bw = bh * 1.8;
  const gx = bw + 4;
  const rows = Math.ceil(n / perRow);
  const usedW = (Math.min(n, perRow) - 1) * gx + bw;
  const usedH = (rows - 1) * gy + bh;
  const x0 = (W - usedW) / 2;
  const y0 = (80 - usedH) / 2;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width={W - 6} height="74" rx="10" fill="#eef2ff" stroke="#334155" strokeWidth="3" />
      {Array.from({ length: n }, (_, i) => (
        <EightBoxPart key={i} x={x0 + (i % perRow) * gx} y={y0 + Math.floor(i / perRow) * gy} h={bh} color={BOX_COLORS[i % BOX_COLORS.length]} />
      ))}
    </svg>
  );
};

/** n sor, soronként 8 korong (4 lila + 4 narancs). */
export const RowsCard: React.FC<{ n: number; small?: boolean }> = ({ n, small = false }) => {
  const W = small ? 80 : 150;
  const gx = small ? 8 : 14;
  const gy = Math.min(small ? 11 : 12, 62 / n);
  const r = Math.min(small ? 3.4 : 5, gy * 0.42);
  const split = small ? 3 : 6;
  const usedW = 7 * gx + split;
  const x0 = (W - usedW) / 2;
  const y0 = 40 - ((n - 1) * gy) / 2;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width={W - 6} height="74" rx="10" fill="#fff7ed" stroke="#334155" strokeWidth="3" />
      {Array.from({ length: n * 8 }, (_, i) => {
        const rr = Math.floor(i / 8);
        const c = i % 8;
        return (
          <circle
            key={i}
            cx={x0 + c * gx + (c >= 4 ? split : 0)}
            cy={y0 + rr * gy}
            r={r}
            fill={c < 4 ? '#6366f1' : '#f97316'}
            stroke="#1e293b"
            strokeWidth="1.1"
          />
        );
      })}
    </svg>
  );
};

/** Számegyenes 0–80, 8-as ugrásokkal. `unknownJumps`: csak az első ugrás látszik, a cél felirata `endLabel`. */
export const JumpsCard: React.FC<{ jumps: number; small?: boolean; endLabel?: string; unknownJumps?: boolean }> = ({
  jumps,
  small = false,
  endLabel = '?',
  unknownJumps = false
}) => {
  const W = small ? 80 : 150;
  const x0 = small ? 8 : 12;
  const w = small ? 62 : 124;
  const u = w / 80;
  const y = small ? 52 : 54;
  const end = x0 + jumps * 8 * u;
  const drawn = unknownJumps ? 1 : jumps;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT8_FONT}>
      <rect x="3" y="3" width={W - 6} height="74" rx="10" fill="#f8fafc" stroke="#334155" strokeWidth="3" />
      <line x1={x0 - 2} y1={y} x2={x0 + w + 4} y2={y} stroke="#334155" strokeWidth="2.5" />
      {Array.from({ length: 11 }, (_, i) => (
        <line key={i} x1={x0 + i * 8 * u} y1={y - 4} x2={x0 + i * 8 * u} y2={y + 4} stroke="#334155" strokeWidth="1.6" />
      ))}
      <text x={x0} y={y + 20} textAnchor="middle" fontSize={small ? 12 : 14} fontWeight="bold" fill="#334155">
        0
      </text>
      {Array.from({ length: drawn }, (_, i) => {
        const a = x0 + i * 8 * u;
        const b = x0 + (i + 1) * 8 * u;
        return <path key={i} d={`M ${a} ${y - 2} Q ${(a + b) / 2} ${y - 22} ${b} ${y - 2}`} fill="none" stroke="#4f46e5" strokeWidth="2.6" />;
      })}
      {unknownJumps && (
        <>
          <text x={x0 + 4 * u} y={y - 16} textAnchor="middle" fontSize={small ? 10 : 12} fontWeight="bold" fill="#4f46e5">
            8
          </text>
          <line x1={x0 + 8 * u} y1={y - 8} x2={end} y2={y - 8} stroke="#4f46e5" strokeWidth="2" strokeDasharray="3 3" />
        </>
      )}
      <circle cx={end} cy={y} r="4" fill="#dc2626" />
      <text x={Math.min(end, W - 14)} y={y + 20} textAnchor="middle" fontSize={small ? 13 : 16} fontWeight="bold" fill="#dc2626">
        {endLabel}
      </text>
    </svg>
  );
};

/** n · 4 = … → n · 8 = ? (párosítóhoz) */
export const DoubleCard150: React.FC<{ n: number }> = ({ n }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={MULT8_FONT}>
    <rect x="3" y="3" width="144" height="74" rx="10" fill="#ecfdf5" stroke="#334155" strokeWidth="3" />
    <text x="75" y="32" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#047857">
      {n} · 4 = {n * 4}
    </text>
    <text x="75" y="64" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#312e81">
      {n} · 8 = <tspan fill="#dc2626">?</tspan>
    </text>
  </svg>
);

/** „? · (nyolcas doboz) = total” — hány doboz kell? */
export const HowManyBoxesCard150: React.FC<{ total: number }> = ({ total }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={MULT8_FONT}>
    <rect x="3" y="3" width="144" height="74" rx="10" fill="#eef2ff" stroke="#334155" strokeWidth="3" />
    <text x="20" y="50" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#dc2626">
      ?
    </text>
    <text x="36" y="50" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#334155">
      ·
    </text>
    <EightBoxPart x={44} y={28} h={24} color="#6366f1" />
    <text x="120" y="49" textAnchor="middle" fontSize="19" fontWeight="bold" fill="#334155">
      = {total}
    </text>
  </svg>
);

/** k darab négyes csoport (2 × 2 korong), opcionálisan +1 magányos korong (80 × 80). */
export const FoursCard80: React.FC<{ groups: number; extra?: boolean }> = ({ groups, extra = false }) => {
  const cells = groups + (extra ? 1 : 0);
  const perRow = cells > 6 ? 4 : 3;
  const rows = Math.ceil(cells / perRow);
  const cw = perRow === 4 ? 16 : 20;
  const ch = rows > 2 ? 20 : 24;
  const r = perRow === 4 ? 3.2 : 3.8;
  const usedW = perRow * cw;
  const x0 = (80 - usedW) / 2;
  const y0 = (80 - rows * ch) / 2;
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="74" height="74" rx="10" fill="#f0f9ff" stroke="#334155" strokeWidth="3" />
      {Array.from({ length: cells }, (_, i) => {
        const cx = x0 + (i % perRow) * cw + cw / 2;
        const cy = y0 + Math.floor(i / perRow) * ch + ch / 2;
        if (i === groups) return <circle key={i} cx={cx} cy={cy} r={r + 0.6} fill="#f97316" stroke="#7c2d12" strokeWidth="1.2" />;
        const d = r * 1.25;
        return (
          <g key={i}>
            {[
              [-d, -d],
              [d, -d],
              [-d, d],
              [d, d]
            ].map(([dx, dy], j) => (
              <circle key={j} cx={cx + dx} cy={cy + dy} r={r} fill="#0ea5e9" stroke="#0c4a6e" strokeWidth="1.1" />
            ))}
          </g>
        );
      })}
    </svg>
  );
};

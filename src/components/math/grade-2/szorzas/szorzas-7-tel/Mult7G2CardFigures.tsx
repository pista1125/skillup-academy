import React from 'react';
import { MULT7_FONT, C5, C2, WeekStripPart } from './Mult7G2Parts';

/**
 * n darab hetes csík (1 csík = 7 kocka), és opcionálisan `extra` darab külön nap (zöld).
 * 150 × 80 (párosító) vagy 80 × 80 (small, csoportosító).
 */
export const WeeksCard: React.FC<{ n: number; extra?: number; small?: boolean }> = ({ n, extra = 0, small = false }) => {
  const W = small ? 80 : 150;
  const rowsTotal = n + (extra > 0 ? 1 : 0);
  const twoCols = !small && rowsTotal > 5;
  const perCol = twoCols ? Math.ceil(rowsTotal / 2) : rowsTotal;
  const cell = small ? 9 : twoCols ? 9 : 16;
  const gy = Math.min(small ? 12 : 16, 64 / perCol);
  const hh = gy - (small ? 2.5 : 3);
  const colW = 7 * cell;
  const usedW = twoCols ? colW * 2 + 10 : colW;
  const x0 = (W - usedW) / 2;
  const y0 = 40 - (perCol * gy - (gy - hh)) / 2;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width={W - 6} height="74" rx="10" fill="#ecfeff" stroke="#334155" strokeWidth="3" />
      {Array.from({ length: rowsTotal }, (_, i) => {
        const col = twoCols ? Math.floor(i / perCol) : 0;
        const row = twoCols ? i % perCol : i;
        const x = x0 + col * (colW + 10);
        const y = y0 + row * gy;
        const isExtra = i === n;
        return isExtra ? (
          <WeekStripPart key={i} x={x} y={y} cell={cell} h={hh} count={extra} colorA="#22c55e" colorB="#22c55e" />
        ) : (
          <WeekStripPart key={i} x={x} y={y} cell={cell} h={hh} />
        );
      })}
    </svg>
  );
};

/** rows sor, soronként 7 korong (5 kék + 2 narancs). */
export const ArrayCard: React.FC<{ rows: number; small?: boolean }> = ({ rows, small = false }) => {
  const W = small ? 80 : 150;
  const gx = small ? 9.4 : 15;
  const gy = Math.min(small ? 13 : 15, 64 / rows);
  const r = Math.min(small ? 3.8 : 5.4, gy * 0.4);
  const usedW = 6 * gx + gx * 0.4;
  const x0 = (W - usedW) / 2;
  const y0 = 40 - ((rows - 1) * gy) / 2;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width={W - 6} height="74" rx="10" fill="#fff7ed" stroke="#334155" strokeWidth="3" />
      {Array.from({ length: rows * 7 }, (_, i) => {
        const rr = Math.floor(i / 7);
        const cc = i % 7;
        return (
          <circle
            key={i}
            cx={x0 + cc * gx + (cc >= 5 ? gx * 0.4 : 0)}
            cy={y0 + rr * gy}
            r={r}
            fill={cc < 5 ? C5 : C2}
            stroke="#1e293b"
            strokeWidth="1.1"
          />
        );
      })}
    </svg>
  );
};

/** Számegyenes 0–70, 7-es ugrásokkal. `unknownJumps`: csak az első ugrás látszik, a cél felirata `endLabel`. */
export const JumpsCard: React.FC<{ jumps: number; small?: boolean; endLabel?: string; unknownJumps?: boolean }> = ({
  jumps,
  small = false,
  endLabel = '?',
  unknownJumps = false
}) => {
  const W = small ? 80 : 150;
  const x0 = small ? 8 : 12;
  const w = small ? 62 : 124;
  const u = w / 70;
  const y = small ? 52 : 54;
  const end = x0 + jumps * 7 * u;
  const drawn = unknownJumps ? 1 : jumps;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT7_FONT}>
      <rect x="3" y="3" width={W - 6} height="74" rx="10" fill="#f0fdf4" stroke="#334155" strokeWidth="3" />
      <line x1={x0 - 2} y1={y} x2={x0 + w + 4} y2={y} stroke="#334155" strokeWidth="2.5" />
      {Array.from({ length: 11 }, (_, i) => (
        <line key={i} x1={x0 + i * 7 * u} y1={y - 4} x2={x0 + i * 7 * u} y2={y + 4} stroke="#334155" strokeWidth="1.6" />
      ))}
      <text x={x0} y={y + 20} textAnchor="middle" fontSize={small ? 12 : 14} fontWeight="bold" fill="#334155">
        0
      </text>
      {Array.from({ length: drawn }, (_, i) => {
        const a = x0 + i * 7 * u;
        const b = x0 + (i + 1) * 7 * u;
        return <path key={i} d={`M ${a} ${y - 2} Q ${(a + b) / 2} ${y - 22} ${b} ${y - 2}`} fill="none" stroke="#16a34a" strokeWidth="2.6" />;
      })}
      {unknownJumps && (
        <>
          <text x={x0 + 3.5 * u} y={y - 16} textAnchor="middle" fontSize={small ? 10 : 12} fontWeight="bold" fill="#16a34a">
            7
          </text>
          <line x1={x0 + 7 * u} y1={y - 8} x2={end} y2={y - 8} stroke="#16a34a" strokeWidth="2" strokeDasharray="3 3" />
        </>
      )}
      <circle cx={end} cy={y} r="4" fill="#dc2626" />
      <text x={Math.min(end, W - 14)} y={y + 20} textAnchor="middle" fontSize={small ? 13 : 16} fontWeight="bold" fill="#dc2626">
        {endLabel}
      </text>
    </svg>
  );
};

/** „? · (hetes csík) = total” — hány hét? */
export const HowManyWeeksCard150: React.FC<{ total: number }> = ({ total }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={MULT7_FONT}>
    <rect x="3" y="3" width="144" height="74" rx="10" fill="#ecfeff" stroke="#334155" strokeWidth="3" />
    <text x="20" y="50" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#dc2626">
      ?
    </text>
    <text x="34" y="50" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#334155">
      ·
    </text>
    <WeekStripPart x={40} y={32} cell={8.5} h={16} />
    <text x="125" y="49" textAnchor="middle" fontSize="17" fontWeight="bold" fill="#334155">
      = {total}
    </text>
  </svg>
);

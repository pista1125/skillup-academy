import React from 'react';
import { DIV7_FONT, GROUP_COLOR, PlatePart } from './Div7G2Parts';

/** n korong hetes sorokban (nincs bekarikázva). 150 × 80 vagy 80 × 80 (small). */
export const DotsCard: React.FC<{ n: number; small?: boolean }> = ({ n, small = false }) => {
  const W = small ? 80 : 150;
  const rows = Math.ceil(n / 7);
  const gx = small ? 9.6 : 15;
  const gy = Math.min(small ? 12 : 15, 64 / rows);
  const r = Math.min(small ? 3.9 : 5.4, gy * 0.4);
  const x0 = (W - 6 * gx) / 2;
  const y0 = 40 - ((rows - 1) * gy) / 2;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width={W - 6} height="74" rx="10" fill="#fff7ed" stroke="#334155" strokeWidth="3" />
      {Array.from({ length: n }, (_, i) => (
        <circle key={i} cx={x0 + (i % 7) * gx} cy={y0 + Math.floor(i / 7) * gy} r={r} fill="#f97316" stroke="#1e293b" strokeWidth="1.1" />
      ))}
    </svg>
  );
};

/** Naptár: n nap, soronként 7 (egy sor = egy hét). */
export const CalendarCard: React.FC<{ n: number; small?: boolean }> = ({ n, small = false }) => {
  const W = small ? 80 : 150;
  const rows = Math.ceil(n / 7);
  const cw = small ? 9.6 : 14;
  const ch = Math.min(small ? 12 : 14, 62 / rows);
  const x0 = (W - 7 * cw) / 2;
  const y0 = 40 - (rows * ch) / 2;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width={W - 6} height="74" rx="10" fill="#ecfeff" stroke="#334155" strokeWidth="3" />
      {Array.from({ length: n }, (_, i) => (
        <rect
          key={i}
          x={x0 + (i % 7) * cw + 0.8}
          y={y0 + Math.floor(i / 7) * ch + 0.8}
          width={cw - 1.6}
          height={ch - 1.6}
          rx="1.5"
          fill={i % 7 >= 5 ? '#67e8f9' : '#e0f2fe'}
          stroke="#0e7490"
          strokeWidth="1.1"
        />
      ))}
    </svg>
  );
};

/** Számegyenes 0–70, piros pont a célnál: hány 7-es ugrás? */
export const JumpsToCard: React.FC<{ target: number; small?: boolean }> = ({ target, small = false }) => {
  const W = small ? 80 : 150;
  const x0 = small ? 8 : 12;
  const w = small ? 62 : 124;
  const u = w / 70;
  const y = small ? 50 : 52;
  const end = x0 + target * u;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV7_FONT}>
      <rect x="3" y="3" width={W - 6} height="74" rx="10" fill="#f0fdf4" stroke="#334155" strokeWidth="3" />
      <line x1={x0 - 2} y1={y} x2={x0 + w + 4} y2={y} stroke="#334155" strokeWidth="2.5" />
      {Array.from({ length: 11 }, (_, i) => (
        <line key={i} x1={x0 + i * 7 * u} y1={y - 4} x2={x0 + i * 7 * u} y2={y + 4} stroke="#334155" strokeWidth="1.6" />
      ))}
      <text x={x0} y={y + 20} textAnchor="middle" fontSize={small ? 12 : 14} fontWeight="bold" fill="#334155">
        0
      </text>
      <path d={`M ${x0} ${y - 2} Q ${x0 + 3.5 * u} ${y - 20} ${x0 + 7 * u} ${y - 2}`} fill="none" stroke="#16a34a" strokeWidth="2.6" />
      <text x={x0 + 3.5 * u} y={y - 16} textAnchor="middle" fontSize={small ? 10 : 12} fontWeight="bold" fill="#16a34a">
        7
      </text>
      <line x1={x0 + 7 * u} y1={y - 8} x2={end} y2={y - 8} stroke="#16a34a" strokeWidth="2" strokeDasharray="3 3" />
      <circle cx={end} cy={y} r="4.5" fill="#dc2626" />
      <text x={Math.min(end, W - 14)} y={y + 20} textAnchor="middle" fontSize={small ? 13 : 16} fontWeight="bold" fill="#dc2626">
        {target}
      </text>
    </svg>
  );
};

/** total eper → 7 tányér, egy tányéron ? */
export const PlatesCard: React.FC<{ total: number; small?: boolean }> = ({ total, small = false }) => {
  const W = small ? 80 : 150;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV7_FONT}>
      <rect x="3" y="3" width={W - 6} height="74" rx="10" fill="#fff1f2" stroke="#334155" strokeWidth="3" />
      <circle cx={small ? 22 : 30} cy="24" r={small ? 7 : 9} fill="#e11d48" stroke="#881337" strokeWidth="1.5" />
      <text x={small ? 48 : 70} y="31" textAnchor="middle" fontSize={small ? 18 : 22} fontWeight="bold" fill="#9f1239">
        {total}
      </text>
      {Array.from({ length: 7 }, (_, i) => (
        <PlatePart key={i} cx={(small ? 10 : 16) + i * (small ? 10 : 19.5)} cy={58} w={small ? 10 : 18} question={false} count={0} />
      ))}
      <text x={small ? 70 : 128} y="31" textAnchor="middle" fontSize={small ? 16 : 20} fontWeight="bold" fill="#dc2626">
        {small ? '' : '?'}
      </text>
    </svg>
  );
};

/** „? · (hét) = total” — hány hét? */
export const HowManyWeeksCard150: React.FC<{ total: number }> = ({ total }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={DIV7_FONT}>
    <rect x="3" y="3" width="144" height="74" rx="10" fill="#ecfeff" stroke="#334155" strokeWidth="3" />
    <text x="20" y="50" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#dc2626">
      ?
    </text>
    <text x="34" y="50" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#334155">
      ·
    </text>
    {Array.from({ length: 7 }, (_, i) => (
      <rect key={i} x={40 + i * 8.5} y={32} width="8" height="16" rx="1.5" fill={i < 5 ? GROUP_COLOR : '#f97316'} stroke="#1e293b" strokeWidth="1" />
    ))}
    <text x="125" y="49" textAnchor="middle" fontSize="17" fontWeight="bold" fill="#334155">
      = {total}
    </text>
  </svg>
);

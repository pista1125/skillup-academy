import React from 'react';
import { DIV4_FONT, FourBoxPart } from './Div4G2Parts';

const BOX_COLORS = ['#8b5cf6', '#f97316', '#0ea5e9', '#10b981', '#ec4899', '#eab308', '#6366f1', '#ef4444', '#14b8a6', '#a855f7'];

/** Kosárnyi süti (total darab) és 4 üres tányér — szétosztás. */
export const PlatesCard: React.FC<{ total: number; small?: boolean }> = ({ total, small = false }) => {
  const W = small ? 80 : 150;
  const cols = small ? 8 : 10;
  const gx = small ? 8 : 11;
  const r = small ? 3 : 4;
  const x0 = (W - (cols - 1) * gx) / 2;
  const plateY = small ? 66 : 64;
  const pw = small ? 15 : 28;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width={W - 6} height="74" rx="10" fill="#fffbeb" stroke="#334155" strokeWidth="3" />
      {Array.from({ length: total }, (_, i) => (
        <circle key={i} cx={x0 + (i % cols) * gx} cy={(small ? 13 : 14) + Math.floor(i / cols) * (small ? 8 : 10)} r={r} fill="#d97706" stroke="#78350f" strokeWidth="0.8" />
      ))}
      {
        [0, 1, 2, 3].map((i) => (
          <ellipse key={i} cx={W / 2 - 1.5 * (pw + (small ? 3 : 6)) + i * (pw + (small ? 3 : 6))} cy={plateY} rx={pw / 2} ry={small ? 5 : 7} fill="#f1f5f9" stroke="#475569" strokeWidth="2" />
        ))}
    </svg>
  );
};

/** n darab négyes doboz — „hány négyes van benne?” */
export const BoxesCard: React.FC<{ n: number; small?: boolean }> = ({ n, small = false }) => {
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

/** Kenguru: első ugrás 4, szaggatott vonal a célig — hány ugrás? */
export const JumpsToCard: React.FC<{ target: number; small?: boolean }> = ({ target, small = false }) => {
  const W = small ? 80 : 150;
  const x0 = small ? 8 : 12;
  const w = small ? 62 : 124;
  const u = w / 40;
  const y = 50;
  const end = x0 + target * u;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV4_FONT}>
      <rect x="3" y="3" width={W - 6} height="74" rx="10" fill="#f8fafc" stroke="#334155" strokeWidth="3" />
      <line x1={x0 - 2} y1={y} x2={x0 + w + 4} y2={y} stroke="#334155" strokeWidth="2.5" />
      {Array.from({ length: 11 }, (_, i) => (
        <line key={i} x1={x0 + i * 4 * u} y1={y - 4} x2={x0 + i * 4 * u} y2={y + 4} stroke="#334155" strokeWidth="1.6" />
      ))}
      <path d={`M ${x0} ${y - 2} Q ${x0 + 2 * u} ${y - 22} ${x0 + 4 * u} ${y - 2}`} fill="none" stroke="#7c3aed" strokeWidth="2.6" />
      <text x={x0 + 2 * u} y={y - 16} textAnchor="middle" fontSize={small ? 10 : 12} fontWeight="bold" fill="#7c3aed">
        4
      </text>
      <line x1={x0 + 4 * u} y1={y - 8} x2={end} y2={y - 8} stroke="#7c3aed" strokeWidth="2" strokeDasharray="3 3" />
      <text x={x0} y={y + 20} textAnchor="middle" fontSize={small ? 12 : 14} fontWeight="bold" fill="#334155">
        0
      </text>
      <circle cx={end} cy={y} r="4" fill="#dc2626" />
      <text x={Math.min(end, W - 14)} y={y + 20} textAnchor="middle" fontSize={small ? 13 : 16} fontWeight="bold" fill="#dc2626">
        {target}
      </text>
    </svg>
  );
};

/** „? · (doboz) = total” */
export const HowManyBoxesCard150: React.FC<{ total: number }> = ({ total }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={DIV4_FONT}>
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

/** n korong tízes sorokban (nincs csoportosítva). */
export const DotsCard: React.FC<{ n: number; small?: boolean }> = ({ n, small = false }) => {
  const W = small ? 80 : 150;
  const cols = 10;
  const gx = small ? 6.6 : 13;
  const gy = small ? 11 : 14;
  const r = small ? 2.8 : 5;
  const rows = Math.ceil(n / cols);
  const x0 = (W - (cols - 1) * gx) / 2;
  const y0 = 40 - ((rows - 1) * gy) / 2;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width={W - 6} height="74" rx="10" fill="#fff7ed" stroke="#334155" strokeWidth="3" />
      {Array.from({ length: n }, (_, i) => (
        <circle key={i} cx={x0 + (i % cols) * gx} cy={y0 + Math.floor(i / cols) * gy} r={r} fill={i % 10 < 5 ? '#f97316' : '#0ea5e9'} stroke="#1e293b" strokeWidth="1" />
      ))}
    </svg>
  );
};

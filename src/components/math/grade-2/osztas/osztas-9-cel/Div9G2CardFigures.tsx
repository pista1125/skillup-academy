import React from 'react';
import { BOX_COLORS, DIV9_FONT, NineBoxPart } from './Div9G2Parts';

/**
 * n darab kilences doboz és `rest` kimaradt korong.
 * 150 × 80 (párosító) vagy 80 × 80 (small, csoportosító).
 */
export const BoxesRestCard: React.FC<{ n: number; rest?: number; small?: boolean }> = ({ n, rest = 0, small = false }) => {
  const W = small ? 80 : 150;
  const perRow = small ? (n > 6 ? 4 : n > 4 ? 3 : Math.max(n, 1)) : n > 8 ? 5 : n > 4 ? 4 : Math.max(n, 1);
  const rows = n === 0 ? 0 : Math.ceil(n / perRow);
  const restH = rest > 0 ? (small ? 12 : 14) : 0;
  const availH = 66 - restH;
  const sizeByH = rows > 0 ? (availH - (rows - 1) * 3) / rows : 0;
  const sizeByW = (W - 14 - (perRow - 1) * 3) / perRow;
  const size = Math.min(small ? 22 : 30, sizeByH, sizeByW);
  const g = size + 3;
  const usedW = (Math.min(n, perRow) - 1) * g + size;
  const usedH = rows > 0 ? (rows - 1) * g + size : 0;
  const totalH = usedH + restH;
  const y0 = (80 - totalH) / 2;
  const x0 = (W - usedW) / 2;
  const rGap = small ? 7.5 : 10;
  const rr = small ? 2.8 : 3.8;
  const rx0 = W / 2 - ((rest - 1) * rGap) / 2;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width={W - 6} height="74" rx="10" fill="#fff7ed" stroke="#334155" strokeWidth="3" />
      {Array.from({ length: n }, (_, i) => (
        <NineBoxPart key={i} x={x0 + (i % perRow) * g} y={y0 + Math.floor(i / perRow) * g} size={size} color={BOX_COLORS[i % BOX_COLORS.length]} />
      ))}
      {Array.from({ length: rest }, (_, i) => (
        <circle key={`r${i}`} cx={rx0 + i * rGap} cy={y0 + usedH + restH / 2 + 2} r={rr} fill="#0ea5e9" stroke="#0c4a6e" strokeWidth="1.2" />
      ))}
    </svg>
  );
};

/** Szöcske: első ugrás 9, szaggatott vonal a célig — hány ugrás? */
export const JumpsToCard: React.FC<{ target: number; small?: boolean }> = ({ target, small = false }) => {
  const W = small ? 80 : 150;
  const x0 = small ? 8 : 12;
  const w = small ? 62 : 124;
  const u = w / 90;
  const y = 50;
  const end = x0 + target * u;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV9_FONT}>
      <rect x="3" y="3" width={W - 6} height="74" rx="10" fill="#f8fafc" stroke="#334155" strokeWidth="3" />
      <line x1={x0 - 2} y1={y} x2={x0 + w + 4} y2={y} stroke="#334155" strokeWidth="2.5" />
      {Array.from({ length: 11 }, (_, i) => (
        <line key={i} x1={x0 + i * 9 * u} y1={y - 4} x2={x0 + i * 9 * u} y2={y + 4} stroke="#334155" strokeWidth="1.6" />
      ))}
      <path d={`M ${x0} ${y - 2} Q ${x0 + 4.5 * u} ${y - 22} ${x0 + 9 * u} ${y - 2}`} fill="none" stroke="#ea580c" strokeWidth="2.6" />
      <text x={x0 + 4.5 * u} y={y - 16} textAnchor="middle" fontSize={small ? 10 : 12} fontWeight="bold" fill="#ea580c">
        9
      </text>
      <line x1={x0 + 9 * u} y1={y - 8} x2={end} y2={y - 8} stroke="#ea580c" strokeWidth="2" strokeDasharray="3 3" />
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

/** „? · (kilences doboz) = total” — hány doboz kell? */
export const HowManyBoxesCard150: React.FC<{ total: number }> = ({ total }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={DIV9_FONT}>
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

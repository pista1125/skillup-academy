import React from 'react';
import { MULT2_COLORS } from './Mult2G2Parts';

// ---------------------------------------------------------------------------
// 1. Szorzás 2-vel – kártyaképek (Párosító 150 × 80, Csoportosító 80 × 80)
// ---------------------------------------------------------------------------

const FONT = 'system-ui, Segoe UI, sans-serif';

const Bag: React.FC<{ x: number; y: number; w: number; color: string; q?: boolean }> = ({ x, y, w, color, q }) => {
  const h = w * 1.1;
  return (
    <g>
      <path
        d={`M ${x + w * 0.28} ${y} L ${x + w * 0.72} ${y} L ${x + w} ${y + h} L ${x} ${y + h} Z`}
        fill="#fef3c7"
        stroke="#92400e"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      {q ? (
        <text x={x + w / 2} y={y + h * 0.88} textAnchor="middle" fontSize={w * 0.62} fontWeight="900" fill="#dc2626" fontFamily={FONT}>
          ?
        </text>
      ) : (
        <>
          <circle cx={x + w * 0.33} cy={y + h * 0.62} r={w * 0.15} fill={color} stroke="#1e293b" strokeWidth="1.6" />
          <circle cx={x + w * 0.67} cy={y + h * 0.62} r={w * 0.15} fill={color} stroke="#1e293b" strokeWidth="1.6" />
        </>
      )}
    </g>
  );
};

/** Zacskók, mindegyikben 2 golyó (vagy „?”). Max. 10 zacskó. */
export const BagsCard: React.FC<{ groups: number; small?: boolean; unknown?: boolean; total?: number }> = ({ groups, small, unknown, total }) => {
  const W = small ? 80 : 150;
  const H = 80;
  const perRow = small ? Math.min(groups, groups > 6 ? 4 : 3) : Math.min(groups, 5);
  const rows = Math.ceil(groups / perRow);
  const reserve = total !== undefined ? 22 : 0;
  const availH = H - 12 - reserve;
  const w = Math.min((W - 12) / perRow - 4, availH / rows / 1.1 - 3);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="2" y="2" width={W - 4} height={H - 4} rx="10" fill="#fffbeb" stroke="#334155" strokeWidth="3" />
      {Array.from({ length: groups }, (_, i) => {
        const r = Math.floor(i / perRow);
        const c = i % perRow;
        const inRow = Math.min(perRow, groups - r * perRow);
        const rowW = inRow * (w + 4) - 4;
        const x = (W - rowW) / 2 + c * (w + 4);
        const y = 7 + r * (w * 1.1 + 3) + (availH - rows * (w * 1.1 + 3) + 3) / 2;
        return <Bag key={i} x={x} y={y} w={w} color={MULT2_COLORS[i % MULT2_COLORS.length]} q={unknown} />;
      })}
      {total !== undefined && (
        <text x={W / 2} y={H - 10} textAnchor="middle" fontSize="18" fontWeight="900" fill="#0f172a">
          = {total}
        </text>
      )}
    </svg>
  );
};

/** Rácspontok: `rows` sor, `cols` oszlop. */
export const ArrayCard: React.FC<{ rows: number; cols: number; small?: boolean }> = ({ rows, cols, small }) => {
  const W = small ? 80 : 150;
  const H = 80;
  const step = Math.min((W - 16) / cols, (H - 16) / rows, 18);
  const r = Math.min(step * 0.38, 6.5);
  const x0 = (W - (cols - 1) * step) / 2;
  const y0 = (H - (rows - 1) * step) / 2;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width={W - 4} height={H - 4} rx="10" fill="#f0fdf4" stroke="#334155" strokeWidth="3" />
      {Array.from({ length: rows * cols }, (_, i) => {
        const rr = Math.floor(i / cols);
        const c = i % cols;
        return (
          <circle
            key={i}
            cx={x0 + c * step}
            cy={y0 + rr * step}
            r={r}
            fill={rr % 2 === 0 ? '#ef4444' : '#3b82f6'}
            stroke="#1e293b"
            strokeWidth="1.6"
          />
        );
      })}
    </svg>
  );
};

/** Kettes ugrások 0-tól. `endLabel` megadásakor a végpont felirata (pl. „18”), különben „?”. */
export const JumpsCard: React.FC<{ jumps: number; small?: boolean; endLabel?: string }> = ({ jumps, small, endLabel = '?' }) => {
  const W = small ? 80 : 150;
  const H = 80;
  const x0 = 10;
  const unit = (W - 20) / (jumps * 2);
  const y = 50;
  const X = (v: number) => x0 + v * unit;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="2" y="2" width={W - 4} height={H - 4} rx="10" fill="#faf5ff" stroke="#334155" strokeWidth="3" />
      <line x1={X(0) - 2} y1={y} x2={X(jumps * 2) + 3} y2={y} stroke="#334155" strokeWidth="2.5" />
      {Array.from({ length: jumps }, (_, j) => {
        const a = X(j * 2);
        const b = X(j * 2 + 2);
        return (
          <path
            key={j}
            d={`M ${a} ${y - 2} Q ${(a + b) / 2} ${y - 26} ${b} ${y - 2}`}
            fill="none"
            stroke={MULT2_COLORS[j % MULT2_COLORS.length]}
            strokeWidth="2.6"
          />
        );
      })}
      <circle cx={X(0)} cy={y} r="3.5" fill="#0f172a" />
      <circle cx={X(jumps * 2)} cy={y} r="4" fill="#dc2626" />
      <text x={X(0) + 2} y={H - 9} textAnchor="middle" fontSize="15" fontWeight="900" fill="#0f172a">
        0
      </text>
      <text x={X(jumps * 2) - 4} y={H - 9} textAnchor="middle" fontSize="15" fontWeight="900" fill="#dc2626">
        {endLabel}
      </text>
      {!small && (
        <text x={W / 2} y="18" textAnchor="middle" fontSize="13" fontWeight="900" fill="#6b21a8">
          ugrás: +2
        </text>
      )}
    </svg>
  );
};

/** Zoknipárok (pár = 2 zokni). */
export const SocksCard: React.FC<{ pairs: number; small?: boolean }> = ({ pairs, small }) => {
  const W = small ? 80 : 150;
  const H = 80;
  const perRow = small ? Math.min(pairs, 3) : Math.min(pairs, 5);
  const rows = Math.ceil(pairs / perRow);
  const cellW = (W - 12) / perRow;
  const cellH = (H - 16) / rows;
  const s = Math.min(cellW / 24, cellH / 26);
  const cols = ['#ec4899', '#3b82f6', '#22c55e', '#f59e0b', '#a855f7', '#ef4444', '#14b8a6', '#f97316', '#6366f1', '#84cc16'];
  const sock = (dx: number, color: string, k: number) => (
    <path
      key={k}
      d={`M ${dx} 0 L ${dx + 8} 0 L ${dx + 8} 14 L ${dx + 13} 18 Q ${dx + 15} 23 ${dx + 9} 23 L ${dx + 2} 21 Q ${dx} 20 ${dx} 16 Z`}
      fill={color}
      stroke="#1e293b"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  );
  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width={W - 4} height={H - 4} rx="10" fill="#fdf2f8" stroke="#334155" strokeWidth="3" />
      <line x1="6" y1="10" x2={W - 6} y2="10" stroke="#64748b" strokeWidth="1.5" />
      {Array.from({ length: pairs }, (_, i) => {
        const r = Math.floor(i / perRow);
        const c = i % perRow;
        const inRow = Math.min(perRow, pairs - r * perRow);
        const offX = (W - inRow * cellW) / 2;
        const tx = offX + c * cellW + (cellW - 23 * s) / 2;
        const ty = 12 + r * cellH + (cellH - 24 * s) / 2;
        return (
          <g key={i} transform={`translate(${tx} ${ty}) scale(${s})`}>
            {sock(0, cols[i % cols.length], 0)}
            {sock(12, cols[i % cols.length], 1)}
          </g>
        );
      })}
    </svg>
  );
};

/** Borsóhüvely: felül a szorzat, alul „? · 2”. */
export const PodCard: React.FC<{ product: number; small?: boolean }> = ({ product, small }) => {
  const W = small ? 80 : 150;
  const H = 80;
  const cx = W / 2;
  const half = small ? 34 : 56;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="2" y="2" width={W - 4} height={H - 4} rx="10" fill="#f7fee7" stroke="#334155" strokeWidth="3" />
      <path d={`M ${cx - half} 30 Q ${cx} 2 ${cx + half} 26 Q ${cx} 44 ${cx - half} 30 Z`} fill="#4ade80" stroke="#166534" strokeWidth="2.5" />
      <text x={cx} y="31" textAnchor="middle" fontSize="18" fontWeight="900" fill="#14532d">
        {product}
      </text>
      <circle cx={cx - 17} cy="58" r="13" fill="#bbf7d0" stroke="#166534" strokeWidth="2.5" />
      <text x={cx - 17} y="65" textAnchor="middle" fontSize="18" fontWeight="900" fill="#dc2626">
        ?
      </text>
      <text x={cx} y="64" textAnchor="middle" fontSize="18" fontWeight="900" fill="#0f172a">
        ·
      </text>
      <circle cx={cx + 17} cy="58" r="13" fill="#bbf7d0" stroke="#166534" strokeWidth="2.5" />
      <text x={cx + 17} y="65" textAnchor="middle" fontSize="18" fontWeight="900" fill="#0f172a">
        2
      </text>
    </svg>
  );
};

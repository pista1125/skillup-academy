import React from 'react';
import { DIV2_COLORS } from './Div2G2Parts';

// ---------------------------------------------------------------------------
// 1. Osztás 2-vel – kártyaképek (Párosító 150 × 80, Csoportosító 80 × 80)
// ---------------------------------------------------------------------------

const FONT = 'system-ui, Segoe UI, sans-serif';

/**
 * `n` korong; ha `grouped`, a teljes párokat színes keret veszi körül
 * (a maradék korong keret nélkül marad).
 */
export const PackCard: React.FC<{ n: number; small?: boolean; grouped?: boolean }> = ({ n, small, grouped = true }) => {
  const W = small ? 80 : 150;
  const H = 80;
  const perRow = small ? (n > 12 ? 6 : 4) : n > 10 ? 10 : Math.max(2, n + (n % 2));
  const rows = Math.ceil(n / perRow);
  const step = Math.min((W - 14) / perRow, (H - 14) / rows - 3, 18);
  const r = Math.min(step * 0.34, 6);
  const x0 = (W - (perRow - 1) * step) / 2;
  const rowGap = step + 3;
  const y0 = (H - (rows - 1) * rowGap) / 2;
  const pos = (i: number) => ({ cx: x0 + (i % perRow) * step, cy: y0 + Math.floor(i / perRow) * rowGap });
  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width={W - 4} height={H - 4} rx="10" fill="#f0fdf4" stroke="#334155" strokeWidth="3" />
      {grouped &&
        Array.from({ length: Math.floor(n / 2) }, (_, p) => {
          const a = pos(2 * p);
          return (
            <rect
              key={`p${p}`}
              x={a.cx - r - 2.5}
              y={a.cy - r - 2.5}
              width={step + 2 * r + 5}
              height={2 * r + 5}
              rx={r + 2.5}
              fill="none"
              stroke={DIV2_COLORS[p % DIV2_COLORS.length]}
              strokeWidth="2.4"
            />
          );
        })}
      {Array.from({ length: n }, (_, i) => {
        const { cx, cy } = pos(i);
        return <circle key={i} cx={cx} cy={cy} r={r} fill="#3b82f6" stroke="#1e293b" strokeWidth="1.5" />;
      })}
    </svg>
  );
};

/** Két tányér, mindkettőn `each` süti (vagy „?”). */
export const ShareCard: React.FC<{ each: number; small?: boolean; q?: boolean; total?: number }> = ({ each, small, q, total }) => {
  const W = small ? 80 : 150;
  const H = 80;
  const pw = small ? 34 : 64;
  const cy = total !== undefined ? 50 : 42;
  const plate = (cx: number, fill: string) => {
    const perRow = small ? 3 : 5;
    const rows = Math.ceil(each / perRow);
    const step = small ? 8.5 : 11;
    return (
      <g>
        <ellipse cx={cx} cy={cy} rx={pw / 2} ry={small ? 20 : 22} fill={fill} stroke="#0369a1" strokeWidth="2.4" />
        {q ? (
          <text x={cx} y={cy + 7} textAnchor="middle" fontSize="20" fontWeight="900" fill="#dc2626" fontFamily={FONT}>
            ?
          </text>
        ) : (
          Array.from({ length: each }, (_, i) => {
            const rr = Math.floor(i / perRow);
            const c = i % perRow;
            const inRow = Math.min(perRow, each - rr * perRow);
            return (
              <circle
                key={i}
                cx={cx - ((inRow - 1) * step) / 2 + c * step}
                cy={cy - ((rows - 1) * step) / 2 + rr * step}
                r={small ? 3.6 : 4.3}
                fill="#f59e0b"
                stroke="#78350f"
                strokeWidth="1.3"
              />
            );
          })
        )}
      </g>
    );
  };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="2" y="2" width={W - 4} height={H - 4} rx="10" fill="#f0f9ff" stroke="#334155" strokeWidth="3" />
      {total !== undefined && (
        <text x={W / 2} y="22" textAnchor="middle" fontSize="16" fontWeight="900" fill="#0f172a">
          {total}
        </text>
      )}
      {plate(W / 2 - pw / 2 - 3, '#e0f2fe')}
      {plate(W / 2 + pw / 2 + 3, '#fce7f3')}
    </svg>
  );
};

/** Fele-nyíl: `big` → fele → `small`. */
export const HalfCard: React.FC<{ big: string; half: string; small?: boolean }> = ({ big, half, small }) => {
  const W = small ? 80 : 150;
  const H = 80;
  const bw = small ? 30 : 46;
  const col = (t: string, c: string) => (t === '?' ? '#dc2626' : c);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="2" y="2" width={W - 4} height={H - 4} rx="10" fill="#fefce8" stroke="#334155" strokeWidth="3" />
      <rect x="7" y="38" width={bw} height="32" rx="7" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2.4" />
      <text x={7 + bw / 2} y="61" textAnchor="middle" fontSize={small ? 16 : 20} fontWeight="900" fill={col(big, '#4c1d95')}>
        {big}
      </text>
      <rect x={W - 7 - bw} y="38" width={bw} height="32" rx="7" fill="#dcfce7" stroke="#16a34a" strokeWidth="2.4" />
      <text x={W - 7 - bw / 2} y="61" textAnchor="middle" fontSize={small ? 16 : 20} fontWeight="900" fill={col(half, '#14532d')}>
        {half}
      </text>
      <path d={`M ${7 + bw / 2} 36 Q ${W / 2} 6 ${W - 7 - bw / 2} 36`} fill="none" stroke="#dc2626" strokeWidth="2.8" />
      <path d={`M ${W - 7 - bw / 2 - 8} 31 L ${W - 7 - bw / 2} 36 L ${W - 7 - bw / 2 + 1} 27`} fill="none" stroke="#dc2626" strokeWidth="2.8" />
      <text x={W / 2} y={small ? 30 : 27} textAnchor="middle" fontSize={small ? 11 : 14} fontWeight="900" fill="#dc2626">
        fele
      </text>
    </svg>
  );
};

import React from 'react';
import { MULT6_COLORS, MULT6_FONT, EggBoxPart, DicePart } from './Mult6G2Parts';

// ---------------------------------------------------------------------------
// 5. Szorzás 6-tal – kártyaképek (Párosító 150 × 80, Csoportosító 80 × 80)
// ---------------------------------------------------------------------------

const BOXC = ['#fde68a', '#fbcfe8', '#bfdbfe', '#bbf7d0', '#ddd6fe', '#fed7aa', '#a5f3fc', '#fecaca', '#e9d5ff', '#d9f99d'];

const Frame: React.FC<{ W: number; fill: string; children: React.ReactNode }> = ({ W, fill, children }) => (
  <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT6_FONT}>
    <rect x="2" y="2" width={W - 4} height="76" rx="10" fill={fill} stroke="#334155" strokeWidth="3" />
    {children}
  </svg>
);

/** Tojásdobozok (6-6 tojás). Max. 10 doboz. */
export const BoxesCard: React.FC<{ groups: number; small?: boolean }> = ({ groups, small }) => {
  const W = small ? 80 : 150;
  const perRow = small ? (groups > 4 ? 3 : 2) : groups > 4 ? 5 : groups;
  const rows = Math.ceil(groups / perRow);
  const gap = 4;
  const w = Math.min((W - 14 - (perRow - 1) * gap) / perRow, (68 - (rows - 1) * gap) / rows / 0.66);
  const h = w * 0.66;
  const totalH = rows * h + (rows - 1) * gap;
  const y0 = (80 - totalH) / 2;
  return (
    <Frame W={W} fill="#fffbeb">
      {Array.from({ length: groups }, (_, i) => {
        const r = Math.floor(i / perRow);
        const c = i % perRow;
        const inRow = Math.min(perRow, groups - r * perRow);
        const rowW = inRow * (w + gap) - gap;
        return <EggBoxPart key={i} x={(W - rowW) / 2 + c * (w + gap)} y={y0 + r * (h + gap)} w={w} color={BOXC[i % BOXC.length]} />;
      })}
    </Frame>
  );
};

/** Dobókockák, mind 6-ost mutat. */
export const DiceCard: React.FC<{ n: number; small?: boolean }> = ({ n, small }) => {
  const W = small ? 80 : 150;
  const perRow = small ? (n > 4 ? 3 : 2) : Math.min(n, 5);
  const rows = Math.ceil(n / perRow);
  const gap = 5;
  const s = Math.min((W - 14 - (perRow - 1) * gap) / perRow, (68 - (rows - 1) * gap) / rows, 34);
  const totalH = rows * s + (rows - 1) * gap;
  const y0 = (80 - totalH) / 2;
  return (
    <Frame W={W} fill="#f8fafc">
      {Array.from({ length: n }, (_, i) => {
        const r = Math.floor(i / perRow);
        const c = i % perRow;
        const inRow = Math.min(perRow, n - r * perRow);
        const rowW = inRow * (s + gap) - gap;
        return <DicePart key={i} x={(W - rowW) / 2 + c * (s + gap)} y={y0 + r * (s + gap)} s={s} color={['#fff', '#fef9c3', '#dbeafe', '#fce7f3', '#dcfce7'][i % 5]} />;
      })}
    </Frame>
  );
};

/** Hatos ugrások egy 0–60 számegyenesen; `endLabel` = a célszám kiírva. */
export const JumpsCard: React.FC<{ jumps: number; small?: boolean; endLabel?: string }> = ({ jumps, small, endLabel }) => {
  const W = small ? 80 : 150;
  const x0 = 8;
  const unit = (W - 18) / 60;
  const y = 52;
  const X = (v: number) => x0 + v * unit;
  return (
    <Frame W={W} fill="#faf5ff">
      <line x1={X(0)} y1={y} x2={X(60) + 4} y2={y} stroke="#334155" strokeWidth="2.5" />
      {Array.from({ length: 11 }, (_, i) => (
        <line key={i} x1={X(i * 6)} y1={y - 4} x2={X(i * 6)} y2={y + 4} stroke="#334155" strokeWidth="1.6" />
      ))}
      {Array.from({ length: jumps }, (_, j) => {
        const a = X(j * 6);
        const b = X(j * 6 + 6);
        return <path key={j} d={`M ${a} ${y - 2} Q ${(a + b) / 2} ${y - (small ? 18 : 24)} ${b} ${y - 2}`} fill="none" stroke={MULT6_COLORS[j % MULT6_COLORS.length]} strokeWidth="3" />;
      })}
      <circle cx={X(0)} cy={y} r="3.5" fill="#0f172a" />
      <circle cx={X(jumps * 6)} cy={y} r="4.5" fill="#dc2626" />
      <text x={X(0)} y={y + 20} textAnchor="middle" fontSize="13" fontWeight="900" fill="#475569">0</text>
      {endLabel && (
        <text x={Math.min(X(jumps * 6), W - 16)} y={y + 20} textAnchor="middle" fontSize="15" fontWeight="900" fill="#dc2626">
          {endLabel}
        </text>
      )}
    </Frame>
  );
};

/** Rácspontok. */
export const ArrayCard: React.FC<{ rows: number; cols: number; small?: boolean }> = ({ rows, cols, small }) => {
  const W = small ? 80 : 150;
  const step = Math.min((W - 16) / cols, 62 / rows);
  const r = step * 0.36;
  const x0 = (W - (cols - 1) * step) / 2;
  const y0 = (80 - (rows - 1) * step) / 2;
  const colors = ['#ef4444', '#3b82f6', '#22c55e', '#f59e0b', '#a855f7', '#ec4899'];
  return (
    <Frame W={W} fill="#f0fdf4">
      {Array.from({ length: rows * cols }, (_, i) => {
        const rr = Math.floor(i / cols);
        const c = i % cols;
        return <circle key={i} cx={x0 + c * step} cy={y0 + rr * step} r={r} fill={colors[rr % colors.length]} stroke="#1e293b" strokeWidth="1.3" />;
      })}
    </Frame>
  );
};

/** Láncnyíl: n —· 3→ □ —· 2→ ? (csak 150 × 80). */
export const ChainCard: React.FC<{ n: number }> = ({ n }) => (
  <Frame W={150} fill="#eff6ff">
    {[
      { x: 8, t: String(n) },
      { x: 58, t: String(n * 3) },
      { x: 108, t: '?' }
    ].map((b, i) => (
      <g key={i}>
        <rect x={b.x} y={30} width="34" height="30" rx="7" fill={b.t === '?' ? '#fee2e2' : '#fff'} stroke={b.t === '?' ? '#dc2626' : '#1e3a8a'} strokeWidth="2.5" />
        <text x={b.x + 17} y={52} textAnchor="middle" fontSize="18" fontWeight="900" fill={b.t === '?' ? '#dc2626' : '#0f172a'}>
          {b.t}
        </text>
      </g>
    ))}
    {[44, 94].map((x, i) => (
      <g key={x}>
        <line x1={x} y1={45} x2={x + 9} y2={45} stroke="#334155" strokeWidth="2.5" />
        <path d={`M ${x + 9} 40 L ${x + 14} 45 L ${x + 9} 50 Z`} fill="#334155" />
        <text x={x + 7} y={24} textAnchor="middle" fontSize="15" fontWeight="900" fill="#1d4ed8">
          {i === 0 ? '·3' : '·2'}
        </text>
      </g>
    ))}
  </Frame>
);

/** Szorzókorong: fent a szorzat, lent „? · 6”. */
export const ProductCard: React.FC<{ product: number; small?: boolean }> = ({ product, small }) => {
  const W = small ? 80 : 150;
  const cx = W / 2;
  return (
    <Frame W={W} fill="#fff1f2">
      <circle cx={cx} cy={27} r="17" fill="#fecdd3" stroke="#9f1239" strokeWidth="2.5" />
      <text x={cx} y={34} textAnchor="middle" fontSize="19" fontWeight="900" fill="#881337">{product}</text>
      <text x={cx - 17} y={68} textAnchor="middle" fontSize="20" fontWeight="900" fill="#dc2626">?</text>
      <text x={cx} y={68} textAnchor="middle" fontSize="20" fontWeight="900" fill="#0f172a">·</text>
      <text x={cx + 17} y={68} textAnchor="middle" fontSize="20" fontWeight="900" fill="#0f172a">6</text>
    </Frame>
  );
};

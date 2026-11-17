import React from 'react';
import { FONT, UNK, INK, QFig, Coin, Flat, Rod } from '../osszeadas-es-kivonas/AddSub500G3Parts';

// ---------------------------------------------------------------------------
// Rajzelemek a 4. Szorzás és osztás (500-ig) leckéhez.
// Az érme, a százas lap és a tízesrúd a 3. leckéből jön (egységes kinézet).
// ---------------------------------------------------------------------------

export { FONT, UNK, INK, QFig, Coin, Flat, Rod };

/** Tízesrúd-csoportok keretben, sorokba tördelve. */
export const RodGroups: React.FC<{
  groups: number;
  per: number;
  x0?: number;
  y?: number;
  width?: number;
  rodH?: number;
  perLine?: number;
}> = ({ groups, per, x0 = 10, y = 12, width = 220, rodH = 34, perLine }) => {
  const rw = 5;
  const gap = 2.5;
  const gw = per * rw + (per - 1) * gap + 10;
  const pl = perLine ?? Math.max(1, Math.min(groups, Math.floor((width + 6) / (gw + 6))));
  return (
    <g>
      {Array.from({ length: groups }).map((_, g) => {
        const line = Math.floor(g / pl);
        const inLine = Math.min(pl, groups - line * pl);
        const lineW = inLine * gw + (inLine - 1) * 6;
        const gx = x0 + (width - lineW) / 2 + (g % pl) * (gw + 6);
        const gy = y + line * (rodH + 14);
        return (
          <g key={g}>
            <rect x={gx} y={gy - 4} width={gw} height={rodH + 8} rx="6" fill="#eff6ff" stroke="#60a5fa" strokeWidth="1.3" />
            {Array.from({ length: per }).map((__, k) => (
              <Rod key={k} x={gx + 5 + k * (rw + gap)} y={gy} w={rw} h={rodH} />
            ))}
          </g>
        );
      })}
    </g>
  );
};

/** Tányér (felülnézet). */
export const Plate: React.FC<{ cx: number; cy: number; rx?: number; ry?: number }> = ({ cx, cy, rx = 30, ry = 13 }) => (
  <g>
    <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#fff" stroke="#94a3b8" strokeWidth="1.6" />
    <ellipse cx={cx} cy={cy} rx={rx * 0.72} ry={ry * 0.65} fill="none" stroke="#e2e8f0" strokeWidth="1.2" />
  </g>
);

/** Ugrások 0-tól egyenlő lépésekkel (bennfoglalás). hideCount: az ugrások nincsenek megszámozva. */
export const HopLine: React.FC<{
  total: number;
  size: number;
  W?: number;
  H?: number;
  className?: string;
  bg?: boolean;
  showSize?: boolean;
  fs?: number;
}> = ({ total, size, W = 240, H = 100, className = 'w-full max-w-[280px] h-auto mx-auto', bg = true, showSize = true, fs = 12 }) => {
  const x0 = 18;
  const x1 = W - 22;
  const y = H - 34;
  const X = (v: number) => x0 + ((x1 - x0) * v) / total;
  const n = total / size;
  const labelEvery = n > 8 ? 2 : 1;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {bg && <rect x="1" y="1" width={W - 2} height={H - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />}
      <line x1={x0 - 8} y1={y} x2={x1 + 8} y2={y} stroke="#334155" strokeWidth="1.8" />
      <path d={`M ${x1 + 8} ${y - 4} L ${x1 + 15} ${y} L ${x1 + 8} ${y + 4} Z`} fill="#334155" />
      {Array.from({ length: n + 1 }).map((_, i) => (
        <g key={i}>
          <line x1={X(i * size)} y1={y - 6} x2={X(i * size)} y2={y + 6} stroke="#334155" strokeWidth="1.4" />
          {(i === 0 || i === n || i % labelEvery === 0) && (
            <text x={X(i * size)} y={y + 20} textAnchor="middle" fontSize={fs - 1} fill={i === n ? '#0f172a' : '#64748b'} fontWeight={i === n ? 'bold' : 'normal'}>
              {i * size}
            </text>
          )}
        </g>
      ))}
      {Array.from({ length: n }).map((_, i) => {
        const xa = X(i * size);
        const xb = X((i + 1) * size);
        const mx = (xa + xb) / 2;
        const h = Math.min(26, 8 + (xb - xa) * 0.35);
        return <path key={i} d={`M ${xa + 1} ${y - 3} Q ${mx} ${y - 3 - h * 2} ${xb - 1} ${y - 3}`} fill="none" stroke="#7c3aed" strokeWidth="2" />;
      })}
      {showSize && (
        <text x={(X(0) + X(size)) / 2} y={Math.max(14, y - 3 - Math.min(26, 8 + (X(size) - X(0)) * 0.35) - 5)} textAnchor="middle" fontSize={fs} fontWeight="bold" fill="#6d28d9">
          {size}
        </text>
      )}
    </svg>
  );
};

/** Érmék rácsban: rows sor × cols oszlop, mind v forintos. */
export const CoinGrid: React.FC<{ rows: number; cols: number; v: number; cx?: number; y0?: number; r?: number; gap?: number }> = ({
  rows,
  cols,
  v,
  cx = 120,
  y0 = 22,
  r = 11,
  gap = 4
}) => {
  const step = 2 * r + gap;
  const x0 = cx - ((cols - 1) * step) / 2;
  return (
    <g>
      {Array.from({ length: rows * cols }).map((_, i) => (
        <Coin key={i} cx={x0 + (i % cols) * step} cy={y0 + Math.floor(i / cols) * step} v={v} r={r} />
      ))}
    </g>
  );
};

/** Doboz egy számmal (pl. 10 db / doboz). */
export const NumBox: React.FC<{ x: number; y: number; w?: number; h?: number; label: string; fill?: string; fs?: number }> = ({
  x,
  y,
  w = 28,
  h = 22,
  label,
  fill = '#fde68a',
  fs = 12
}) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx="3" fill={fill} stroke="#92400e" strokeWidth="1.4" />
    <line x1={x} y1={y + h * 0.3} x2={x + w} y2={y + h * 0.3} stroke="#92400e" strokeWidth="1" />
    <text x={x + w / 2} y={y + h * 0.3 + (h * 0.7) / 2 + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight="bold" fill="#78350f" fontFamily={FONT}>
      {label}
    </text>
  </g>
);

import React from 'react';

// Kis rajzelemek – a Figures, Theory és Quiz fájlok közösen használják.
export const FONT = 'system-ui, Segoe UI, sans-serif';
export const UNK = '#dc2626';

/** Pénzérme. */
export const Coin: React.FC<{ cx: number; cy: number; v: number; r?: number; crossed?: boolean }> = ({ cx, cy, v, r = 15, crossed }) => {
  const gold = v === 5 || v === 20 || v === 200;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={gold ? '#facc15' : '#cbd5e1'} stroke={gold ? '#a16207' : '#475569'} strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r={r - 3} fill="none" stroke={gold ? '#ca8a04' : '#64748b'} strokeWidth="0.8" />
      <text x={cx} y={cy + r * 0.3} textAnchor="middle" fontSize={r * 0.85} fontWeight="bold" fill="#1e293b" fontFamily={FONT}>{v}</text>
      {crossed && <line x1={cx - r} y1={cy + r} x2={cx + r} y2={cy - r} stroke="#dc2626" strokeWidth="2.5" />}
    </g>
  );
};

export interface Jump { to: number; label: string }

/**
 * Számegyenes ugrásokkal. A start pontból ívek mennek a jumps pontjaiba.
 * hideEnd: az utolsó pont helyén piros „?” áll.
 */
export const JumpLine: React.FC<{
  lo: number;
  hi: number;
  start: number;
  jumps: Jump[];
  hideEnd?: boolean;
  W?: number;
  H?: number;
  color?: string;
  className?: string;
}> = ({ lo, hi, start, jumps, hideEnd, W = 320, H = 120, color = '#16a34a', className = 'w-full h-auto' }) => {
  const x0 = 18;
  const x1 = W - 24;
  const y = H - 42;
  const X = (v: number) => x0 + ((x1 - x0) * (v - lo)) / (hi - lo);
  const pts = [start, ...jumps.map((j) => j.to)];
  const end = pts[pts.length - 1];
  const labelled = pts.filter((v) => !(hideEnd && v === end));
  const tens: number[] = [];
  for (let v = Math.ceil(lo / 10) * 10; v <= hi; v += 10) {
    if (labelled.every((p) => Math.abs(X(p) - X(v)) >= 22) && !(hideEnd && Math.abs(X(end) - X(v)) < 26)) tens.push(v);
  }
  const unit = (x1 - x0) / (hi - lo);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width={W - 2} height={H - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
      <line x1={x0 - 8} y1={y} x2={x1 + 10} y2={y} stroke="#334155" strokeWidth="1.8" />
      <path d={`M ${x1 + 10} ${y - 4} L ${x1 + 16} ${y} L ${x1 + 10} ${y + 4} Z`} fill="#334155" />
      {Array.from({ length: hi - lo + 1 }, (_, i) => {
        const v = lo + i;
        const big = v % 10 === 0;
        const mid = v % 5 === 0;
        if (unit < 4 && !mid) return null;
        return <line key={v} x1={X(v)} y1={big ? y - 8 : mid ? y - 6 : y - 4} x2={X(v)} y2={big ? y + 8 : mid ? y + 6 : y + 4} stroke="#334155" strokeWidth={big ? 1.6 : 0.9} />;
      })}
      {tens.map((v) => (
        <text key={`t${v}`} x={X(v)} y={y + 22} textAnchor="middle" fontSize="11" fill="#64748b">{v}</text>
      ))}
      {jumps.map((j, i) => {
        const a = pts[i];
        const b = j.to;
        const xa = X(a);
        const xb = X(b);
        const hgt = Math.min(44, 16 + Math.abs(xb - xa) * 0.35);
        const mx = (xa + xb) / 2;
        const ty = y - 4 - hgt;
        const dir = b > a ? 1 : -1;
        return (
          <g key={i}>
            <path d={`M ${xa} ${y - 4} Q ${mx} ${y - 4 - hgt * 2} ${xb} ${y - 4}`} fill="none" stroke={color} strokeWidth="2" />
            <path d={`M ${xb - dir * 6} ${y - 11} L ${xb} ${y - 4} L ${xb - dir * 1} ${y - 13}`} fill="none" stroke={color} strokeWidth="2" />
            <text x={mx} y={ty - 6} textAnchor="middle" fontSize="12.5" fontWeight="bold" fill={color}>{j.label}</text>
          </g>
        );
      })}
      {pts.map((v, i) => (
        <circle key={`p${i}`} cx={X(v)} cy={y} r={i === 0 ? 4.5 : 3.5} fill={i === 0 ? '#2563eb' : hideEnd && v === end && i === pts.length - 1 ? UNK : color} />
      ))}
      {labelled.map((v, i) => (
        <text key={`l${i}`} x={X(v)} y={y + 22} textAnchor="middle" fontSize="12.5" fontWeight="bold" fill={v === start ? '#1d4ed8' : '#15803d'}>{v}</text>
      ))}
      {hideEnd && (
        <text x={X(end)} y={y + 23} textAnchor="middle" fontSize="15" fontWeight="bold" fill={UNK}>?</text>
      )}
    </svg>
  );
};

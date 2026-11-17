import React from 'react';

// Kis rajzelemek – a Figures, Theory, Quiz és CardFigures fájlok közösen használják.
export const FONT = 'system-ui, Segoe UI, sans-serif';
export const UNK = '#dc2626';

/** Forint érme (10, 20, 50, 100, 200). A 100 Ft-os ezüst gyűrű + arany közép, a 200 Ft-os fordítva. */
export const Coin: React.FC<{ cx: number; cy: number; v: number | string; r?: number }> = ({ cx, cy, v, r }) => {
  const n = typeof v === 'number' ? v : 0;
  const R = r ?? (n === 200 ? 21 : n === 100 ? 20 : n === 50 ? 19 : n === 20 ? 17 : 16);
  const gold = '#facc15';
  const silver = '#cbd5e1';
  if (v === '?') {
    return (
      <g>
        <circle cx={cx} cy={cy} r={R} fill="#fee2e2" stroke={UNK} strokeWidth="2" strokeDasharray="4 3" />
        <text x={cx} y={cy + R * 0.36} textAnchor="middle" fontSize={R * 1.05} fontWeight="bold" fill={UNK} fontFamily={FONT}>?</text>
      </g>
    );
  }
  const ring = n === 200 ? gold : n === 100 ? silver : n === 20 ? gold : silver;
  const core = n === 200 ? silver : n === 100 ? gold : ring;
  const edge = ring === gold ? '#a16207' : '#475569';
  return (
    <g>
      <circle cx={cx} cy={cy} r={R} fill={ring} stroke={edge} strokeWidth="1.6" />
      <circle cx={cx} cy={cy} r={R * 0.7} fill={core} stroke={core === gold ? '#ca8a04' : '#64748b'} strokeWidth="0.9" />
      <text x={cx} y={cy + R * 0.28} textAnchor="middle" fontSize={n >= 100 ? R * 0.7 : R * 0.82} fontWeight="bold" fill="#1e293b" fontFamily={FONT}>{n}</text>
    </g>
  );
};

export interface Jump { to: number; label: string }

/**
 * Számegyenes kerek tízesekkel (osztás 10-esével), ugrásokkal.
 * hideEnd: az utolsó pont helyén piros „?” áll.
 */
export const TensJumpLine: React.FC<{
  lo: number;
  hi: number;
  start: number;
  jumps: Jump[];
  hideEnd?: boolean;
  W?: number;
  H?: number;
  color?: string;
  className?: string;
  bg?: boolean;
}> = ({ lo, hi, start, jumps, hideEnd, W = 340, H = 120, color = '#16a34a', className = 'w-full h-auto', bg = true }) => {
  const x0 = 20;
  const x1 = W - 26;
  const y = H - 40;
  const X = (v: number) => x0 + ((x1 - x0) * (v - lo)) / (hi - lo);
  const pts = [start, ...jumps.map((j) => j.to)];
  const end = pts[pts.length - 1];
  const unit = (X(lo + 10) - X(lo));
  const ticks: number[] = [];
  for (let v = Math.ceil(lo / 10) * 10; v <= hi; v += 10) ticks.push(v);
  const labelled = pts.filter((v) => !(hideEnd && v === end));
  const tickLabels = ticks.filter((v) => {
    if (unit < 22 && v % 20 !== 0 && v !== 100) return false;
    if (labelled.some((p) => p === v)) return false;
    if (labelled.some((p) => Math.abs(X(p) - X(v)) < 24)) return false;
    if (hideEnd && Math.abs(X(end) - X(v)) < 22) return false;
    return true;
  });
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {bg && <rect x="1" y="1" width={W - 2} height={H - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />}
      <line x1={x0 - 10} y1={y} x2={x1 + 10} y2={y} stroke="#334155" strokeWidth="1.8" />
      <path d={`M ${x1 + 10} ${y - 4} L ${x1 + 17} ${y} L ${x1 + 10} ${y + 4} Z`} fill="#334155" />
      {ticks.map((v) => (
        <line key={v} x1={X(v)} y1={v === 100 ? y - 10 : y - 6} x2={X(v)} y2={v === 100 ? y + 10 : y + 6} stroke={v === 100 ? '#7c3aed' : '#334155'} strokeWidth={v === 100 ? 2.6 : 1.4} />
      ))}
      {tickLabels.map((v) => (
        <text key={`t${v}`} x={X(v)} y={y + 22} textAnchor="middle" fontSize="11.5" fill={v === 100 ? '#6d28d9' : '#64748b'} fontWeight={v === 100 ? 'bold' : 'normal'}>{v}</text>
      ))}
      {jumps.map((j, i) => {
        const a = pts[i];
        const b = j.to;
        const xa = X(a);
        const xb = X(b);
        const hgt = Math.min(40, 14 + Math.abs(xb - xa) * 0.3);
        const mx = (xa + xb) / 2;
        const dir = b > a ? 1 : -1;
        return (
          <g key={i}>
            <path d={`M ${xa} ${y - 4} Q ${mx} ${y - 4 - hgt * 2} ${xb} ${y - 4}`} fill="none" stroke={color} strokeWidth="2.2" />
            <path d={`M ${xb - dir * 6} ${y - 11} L ${xb} ${y - 4} L ${xb - dir * 1} ${y - 13}`} fill="none" stroke={color} strokeWidth="2.2" />
            <text x={mx} y={y - 4 - hgt - 6} textAnchor="middle" fontSize="13" fontWeight="bold" fill={color}>{j.label}</text>
          </g>
        );
      })}
      {pts.map((v, i) => (
        <circle key={`p${i}`} cx={X(v)} cy={y} r={i === 0 ? 5 : 4} fill={i === 0 ? '#2563eb' : hideEnd && i === pts.length - 1 ? UNK : color} />
      ))}
      {labelled.map((v, i) => (
        <text key={`l${i}`} x={X(v)} y={y + 22} textAnchor="middle" fontSize="13" fontWeight="bold" fill={v === start ? '#1d4ed8' : v === 100 ? '#6d28d9' : '#15803d'}>{v}</text>
      ))}
      {hideEnd && <text x={X(end)} y={y + 24} textAnchor="middle" fontSize="16" fontWeight="bold" fill={UNK}>?</text>}
    </svg>
  );
};

/** Árcédula. */
export const PriceTag: React.FC<{ x: number; y: number; text: string; w?: number; fs?: number }> = ({ x, y, text, w = 56, fs = 12 }) => (
  <g>
    <path d={`M ${x} ${y} L ${x + w - 10} ${y} L ${x + w} ${y + fs * 0.95} L ${x + w - 10} ${y + fs * 1.9} L ${x} ${y + fs * 1.9} Z`} fill="#fff" stroke="#475569" strokeWidth={fs > 14 ? 2.2 : 1.2} />
    <text x={x + (w - 10) / 2} y={y + fs * 1.33} textAnchor="middle" fontSize={fs} fontWeight="bold" fill="#0f172a" fontFamily={FONT}>{text}</text>
  </g>
);

/** Vízszintes oszlopdiagram (pontgyűjtő verseny). */
export const PointsChart: React.FC<{ className?: string; data?: { name: string; v: number; color: string }[] }> = ({
  className = 'w-full h-auto',
  data = [
    { name: '3.a', v: 90, color: '#60a5fa' },
    { name: '3.b', v: 120, color: '#f472b6' },
    { name: '3.c', v: 70, color: '#34d399' }
  ]
}) => {
  const x0 = 54;
  const X = (v: number) => x0 + v * 2.2;
  return (
    <svg viewBox="0 0 360 160" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="158" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="180" y="20" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">Pontgyűjtő verseny</text>
      {Array.from({ length: 14 }, (_, i) => i * 10).map((v) => (
        <g key={v}>
          <line x1={X(v)} y1="30" x2={X(v)} y2="126" stroke={v % 50 === 0 ? '#94a3b8' : '#e2e8f0'} strokeWidth="1" />
          {v % 20 === 0 && <text x={X(v)} y="140" textAnchor="middle" fontSize="10.5" fill="#475569">{v}</text>}
        </g>
      ))}
      <line x1={x0} y1="126" x2={X(130) + 6} y2="126" stroke="#334155" strokeWidth="1.6" />
      <text x={X(130) + 4} y="152" textAnchor="end" fontSize="10.5" fill="#475569">pont</text>
      {data.map((d, i) => (
        <g key={d.name}>
          <text x={x0 - 8} y={52 + i * 30} textAnchor="end" fontSize="13" fontWeight="bold" fill="#334155">{d.name}</text>
          <rect x={x0} y={38 + i * 30} width={X(d.v) - x0} height="20" rx="3" fill={d.color} stroke="#334155" strokeWidth="1" />
        </g>
      ))}
    </svg>
  );
};

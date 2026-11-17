import React from 'react';

// ---------------------------------------------------------------------------
// Rajzelemek a 3. Összeadás és kivonás (500-ig) leckéhez.
// A Figures, a Theory, a Quiz és a CardFigures is ezeket használja.
// Színek a fejezetben: százas = piros, tízes = kék, egyes = sárga.
// ---------------------------------------------------------------------------

export const FONT = 'system-ui, Segoe UI, sans-serif';
export const UNK = '#dc2626';
export const INK = '#1e293b';

/** Kérdésábra-keret: 240 széles, h magas. */
export const QFig: React.FC<{ h?: number; children?: React.ReactNode }> = ({ h = 130, children }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** Forint érme (10, 20, 50, 100, 200). A 100 Ft-os ezüst gyűrű + arany közép, a 200 Ft-os fordítva. */
export const Coin: React.FC<{ cx: number; cy: number; v: number | string; r?: number; crossed?: boolean }> = ({ cx, cy, v, r, crossed }) => {
  const n = typeof v === 'number' ? v : 0;
  const R = r ?? (n === 200 ? 21 : n === 100 ? 20 : n === 50 ? 19 : n === 20 ? 17 : 16);
  if (v === '?') {
    return (
      <g>
        <circle cx={cx} cy={cy} r={R} fill="#fee2e2" stroke={UNK} strokeWidth="2" strokeDasharray="4 3" />
        <text x={cx} y={cy + R * 0.36} textAnchor="middle" fontSize={R * 1.05} fontWeight="bold" fill={UNK} fontFamily={FONT}>?</text>
      </g>
    );
  }
  const gold = '#facc15';
  const silver = '#cbd5e1';
  const ring = n === 200 ? gold : n === 100 ? silver : n === 20 ? gold : silver;
  const core = n === 200 ? silver : n === 100 ? gold : ring;
  const edge = ring === gold ? '#a16207' : '#475569';
  return (
    <g opacity={crossed ? 0.55 : 1}>
      <circle cx={cx} cy={cy} r={R} fill={ring} stroke={edge} strokeWidth="1.6" />
      <circle cx={cx} cy={cy} r={R * 0.7} fill={core} stroke={core === gold ? '#ca8a04' : '#64748b'} strokeWidth="0.9" />
      <text x={cx} y={cy + R * 0.28} textAnchor="middle" fontSize={n >= 100 ? R * 0.7 : R * 0.82} fontWeight="bold" fill="#1e293b" fontFamily={FONT}>{n}</text>
      {crossed && <line x1={cx - R} y1={cy + R} x2={cx + R} y2={cy - R} stroke={UNK} strokeWidth="3" strokeLinecap="round" />}
    </g>
  );
};

/** 500 forintos bankjegy. */
export const Note500: React.FC<{ x: number; y: number; w?: number; h?: number }> = ({ x, y, w = 70, h = 36 }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx="4" fill="#fbcfe8" stroke="#9d174d" strokeWidth="2" />
    <rect x={x + 4} y={y + 4} width={w - 8} height={h - 8} rx="3" fill="none" stroke="#db2777" strokeWidth="1" />
    <circle cx={x + w * 0.24} cy={y + h / 2} r={h * 0.24} fill="#f9a8d4" stroke="#9d174d" strokeWidth="1" />
    <text x={x + w * 0.64} y={y + h / 2 + h * 0.17} textAnchor="middle" fontSize={h * 0.46} fontWeight="bold" fill="#831843" fontFamily={FONT}>500</text>
  </g>
);

/** Árcédula. */
export const PriceTag: React.FC<{ x: number; y: number; text: string; w?: number; fs?: number }> = ({ x, y, text, w = 64, fs = 13 }) => (
  <g>
    <path d={`M ${x} ${y} L ${x + w - 10} ${y} L ${x + w} ${y + fs * 0.95} L ${x + w - 10} ${y + fs * 1.9} L ${x} ${y + fs * 1.9} Z`} fill="#fff" stroke="#475569" strokeWidth={fs > 16 ? 2.6 : 1.3} />
    <text x={x + (w - 10) / 2} y={y + fs * 1.33} textAnchor="middle" fontSize={fs} fontWeight="bold" fill="#0f172a" fontFamily={FONT}>{text}</text>
  </g>
);

/** Százas lap (piros, 10 × 10). */
export const Flat: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 40 }) => (
  <g>
    <rect x={x} y={y} width={s} height={s} rx="1.5" fill="#ef4444" stroke="#7f1d1d" strokeWidth="1.2" />
    {Array.from({ length: 9 }).map((_, k) => (
      <g key={k}>
        <line x1={x + ((k + 1) * s) / 10} y1={y} x2={x + ((k + 1) * s) / 10} y2={y + s} stroke="#7f1d1d" strokeWidth="0.35" />
        <line x1={x} y1={y + ((k + 1) * s) / 10} x2={x + s} y2={y + ((k + 1) * s) / 10} stroke="#7f1d1d" strokeWidth="0.35" />
      </g>
    ))}
  </g>
);

/** Tízesrúd (kék). */
export const Rod: React.FC<{ x: number; y: number; w?: number; h?: number }> = ({ x, y, w = 6, h = 40 }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx="1" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="0.9" />
    {Array.from({ length: 9 }).map((_, k) => (
      <line key={k} x1={x} y1={y + ((k + 1) * h) / 10} x2={x + w} y2={y + ((k + 1) * h) / 10} stroke="#1e3a8a" strokeWidth="0.4" />
    ))}
  </g>
);

/** Százas lapok és tízesrudak egy sorban, x-től. Visszaadja a szélességet is a blocksWidth-tel. */
export const Blocks: React.FC<{ x: number; y: number; sz: number; t: number; s?: number }> = ({ x, y, sz, t, s = 40 }) => {
  const rw = s * 0.15;
  const items: React.ReactNode[] = [];
  let cx = x;
  for (let i = 0; i < sz; i++) {
    items.push(<Flat key={`f${i}`} x={cx} y={y} s={s} />);
    cx += s + 4;
  }
  for (let i = 0; i < t; i++) {
    items.push(<Rod key={`r${i}`} x={cx} y={y} w={rw} h={s} />);
    cx += rw + 2.5;
  }
  return <g>{items}</g>;
};
export const blocksWidth = (sz: number, t: number, s = 40) => sz * (s + 4) + t * (s * 0.15 + 2.5) - (sz + t > 0 ? (t > 0 ? 2.5 : 4) : 0);

export interface Jump { to: number; label: string }

/**
 * Számegyenes 10-es beosztással, a kerek százasok kiemelve, ugrásokkal.
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
  bg?: boolean;
  fs?: number;
}> = ({ lo, hi, start, jumps, hideEnd, W = 340, H = 120, color = '#16a34a', className = 'w-full h-auto', bg = true, fs = 13 }) => {
  const x0 = 20;
  const x1 = W - 26;
  const y = H - 40;
  const X = (v: number) => x0 + ((x1 - x0) * (v - lo)) / (hi - lo);
  const pts = [start, ...jumps.map((j) => j.to)];
  const end = pts[pts.length - 1];
  const unit = X(lo + 10) - X(lo);
  const ticks: number[] = [];
  for (let v = Math.ceil(lo / 10) * 10; v <= hi; v += 10) ticks.push(v);
  const labelled = pts.filter((v) => !(hideEnd && v === end));
  const minGap = fs * 2.3;
  const tickLabels = ticks.filter((v) => {
    const h = v % 100 === 0;
    if (!h && unit < 26 && v % 50 !== 0) return false;
    if (!h && unit < 12) return false;
    if (labelled.some((p) => p === v)) return false;
    if (labelled.some((p) => Math.abs(X(p) - X(v)) < minGap)) return false;
    if (hideEnd && Math.abs(X(end) - X(v)) < minGap) return false;
    return true;
  });
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {bg && <rect x="1" y="1" width={W - 2} height={H - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />}
      <line x1={x0 - 10} y1={y} x2={x1 + 10} y2={y} stroke="#334155" strokeWidth="1.8" />
      <path d={`M ${x1 + 10} ${y - 4} L ${x1 + 17} ${y} L ${x1 + 10} ${y + 4} Z`} fill="#334155" />
      {ticks.map((v) => {
        const h = v % 100 === 0;
        return <line key={v} x1={X(v)} y1={h ? y - 10 : y - 5} x2={X(v)} y2={h ? y + 10 : y + 5} stroke={h ? '#7c3aed' : '#334155'} strokeWidth={h ? 2.6 : 1.2} />;
      })}
      {tickLabels.map((v) => (
        <text key={`t${v}`} x={X(v)} y={y + 22} textAnchor="middle" fontSize={fs - 1.5} fill={v % 100 === 0 ? '#6d28d9' : '#64748b'} fontWeight={v % 100 === 0 ? 'bold' : 'normal'}>{v}</text>
      ))}
      {jumps.map((j, i) => {
        const a = pts[i];
        const b = j.to;
        const xa = X(a);
        const xb = X(b);
        const hgt = Math.min(H - 70, 12 + Math.abs(xb - xa) * 0.28);
        const mx = (xa + xb) / 2;
        const dir = b > a ? 1 : -1;
        return (
          <g key={i}>
            <path d={`M ${xa} ${y - 4} Q ${mx} ${y - 4 - hgt * 2} ${xb} ${y - 4}`} fill="none" stroke={color} strokeWidth="2.2" />
            <path d={`M ${xb - dir * 6} ${y - 11} L ${xb} ${y - 4} L ${xb - dir * 1} ${y - 13}`} fill="none" stroke={color} strokeWidth="2.2" />
            <text x={mx} y={y - 4 - hgt - 6} textAnchor="middle" fontSize={fs} fontWeight="bold" fill={color}>{j.label}</text>
          </g>
        );
      })}
      {pts.map((v, i) => (
        <circle key={`p${i}`} cx={X(v)} cy={y} r={i === 0 ? 5 : 4} fill={i === 0 ? '#2563eb' : hideEnd && i === pts.length - 1 ? UNK : color} />
      ))}
      {labelled.map((v, i) => (
        <text key={`l${i}`} x={X(v)} y={y + 22} textAnchor="middle" fontSize={fs} fontWeight="bold" fill={v === start ? '#1d4ed8' : v % 100 === 0 ? '#6d28d9' : '#15803d'}>{v}</text>
      ))}
      {hideEnd && <text x={X(end)} y={y + 25} textAnchor="middle" fontSize={fs + 3} fontWeight="bold" fill={UNK}>?</text>}
    </svg>
  );
};

/** Csík az 500-ig: ismert rész + ismeretlen rész, százas osztásokkal. */
export const Bar500: React.FC<{ known: number; total?: number; W?: number; x?: number; y?: number; h?: number; fs?: number; showTicks?: boolean }> = ({
  known,
  total = 500,
  W = 200,
  x = 20,
  y = 34,
  h = 32,
  fs = 15,
  showTicks = true
}) => {
  const kw = (W * known) / total;
  const ticks: number[] = [];
  for (let v = 100; v < total; v += 100) ticks.push(v);
  return (
    <g>
      <text x={x + W / 2} y={y - 12} textAnchor="middle" fontSize={fs} fontWeight="bold" fill="#0c4a6e">{total}</text>
      <path d={`M ${x} ${y - 4} L ${x} ${y - 9} L ${x + W} ${y - 9} L ${x + W} ${y - 4}`} fill="none" stroke="#0c4a6e" strokeWidth="1.5" />
      <rect x={x} y={y} width={kw} height={h} fill="#38bdf8" stroke="#0369a1" strokeWidth="1.5" />
      <rect x={x + kw} y={y} width={W - kw} height={h} fill="#fee2e2" stroke={UNK} strokeWidth="1.5" />
      {showTicks &&
        ticks.map((v) => (
          <line key={v} x1={x + (W * v) / total} y1={y + h} x2={x + (W * v) / total} y2={y + h + 6} stroke="#64748b" strokeWidth="1.2" />
        ))}
      <text x={x + kw / 2} y={y + h / 2 + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight="bold" fill="#0c4a6e">{known}</text>
      <text x={x + kw + (W - kw) / 2} y={y + h / 2 + fs * 0.4} textAnchor="middle" fontSize={fs + 2} fontWeight="bold" fill={UNK}>?</text>
    </g>
  );
};

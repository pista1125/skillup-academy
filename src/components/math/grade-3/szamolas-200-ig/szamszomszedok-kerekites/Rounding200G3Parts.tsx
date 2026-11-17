import React from 'react';

// Kis rajzelemek – a Figures, Theory és Quiz fájlok közösen használják.
export const FONT = 'system-ui, Segoe UI, sans-serif';
export const UNK = '#dc2626';

export interface LineMark {
  v: number;
  /** A pont alá írt felirat; ha nincs megadva, a szám maga. '?' = ismeretlen. */
  label?: string;
  color?: string;
}

export interface LineArrow {
  from: number;
  to: number;
  color?: string;
}

/**
 * Számegyenes-részlet lo-tól hi-ig. Kis osztás: tickEvery, felirat: labelEvery többszörösein.
 * marks: pontok a vonalon (felirat a vonal alatt), arrows: ívek a vonal fölött (kerekítés iránya).
 */
export const NumLine: React.FC<{
  lo: number;
  hi: number;
  marks?: LineMark[];
  arrows?: LineArrow[];
  tickEvery?: number;
  labelEvery?: number;
  W?: number;
  H?: number;
  bg?: boolean;
  className?: string;
  bands?: { from: number; to: number; color: string }[];
  /** Ha megadod, csak ezek a kerek számok kapnak feliratot. */
  labelSet?: number[];
}> = ({ lo, hi, marks = [], arrows = [], tickEvery = 1, labelEvery = 10, W = 320, H = 110, bg = true, className = 'w-full h-auto', bands = [], labelSet }) => {
  const x0 = 20;
  const x1 = W - 26;
  const y = H - 40;
  const X = (v: number) => x0 + ((x1 - x0) * (v - lo)) / (hi - lo);
  const ticks: number[] = [];
  for (let v = Math.ceil(lo / tickEvery) * tickEvery; v <= hi; v += tickEvery) ticks.push(v);
  const labels: number[] = [];
  for (let v = Math.ceil(lo / labelEvery) * labelEvery; v <= hi; v += labelEvery) {
    if (labelSet && !labelSet.includes(v)) continue;
    if (marks.every((m) => Math.abs(X(m.v) - X(v)) >= 20 || m.v === v)) labels.push(v);
  }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {bg && <rect x="1" y="1" width={W - 2} height={H - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />}
      {bands.map((b, i) => (
        <rect key={`b${i}`} x={X(b.from) - 3} y={y - 9} width={X(b.to) - X(b.from) + 6} height="18" rx="6" fill={b.color} opacity="0.35" />
      ))}
      <line x1={x0 - 10} y1={y} x2={x1 + 10} y2={y} stroke="#334155" strokeWidth="1.8" />
      <path d={`M ${x1 + 10} ${y - 4} L ${x1 + 17} ${y} L ${x1 + 10} ${y + 4} Z`} fill="#334155" />
      {ticks.map((v) => {
        const big = v % 10 === 0;
        const mid = v % 5 === 0;
        const h = big ? 8 : mid ? 6 : 4;
        return <line key={v} x1={X(v)} y1={y - h} x2={X(v)} y2={y + h} stroke="#334155" strokeWidth={big ? 1.6 : 0.9} />;
      })}
      {labels.map((v) => {
        const m = marks.find((mm) => mm.v === v);
        if (m) return null;
        return (
          <text key={`t${v}`} x={X(v)} y={y + 22} textAnchor="middle" fontSize="11.5" fill="#475569">{v}</text>
        );
      })}
      {arrows.map((a, i) => {
        const xa = X(a.from);
        const xb = X(a.to);
        const c = a.color ?? '#16a34a';
        const hgt = Math.min(26, 10 + Math.abs(xb - xa) * 0.25);
        const dir = xb > xa ? 1 : -1;
        return (
          <g key={`a${i}`}>
            <path d={`M ${xa} ${y - 6} Q ${(xa + xb) / 2} ${y - 6 - hgt * 2} ${xb} ${y - 6}`} fill="none" stroke={c} strokeWidth="1.8" />
            <path d={`M ${xb - dir * 6} ${y - 12} L ${xb} ${y - 6} L ${xb - dir * 0.5} ${y - 14}`} fill="none" stroke={c} strokeWidth="1.8" />
          </g>
        );
      })}
      {marks.map((m, i) => {
        const c = m.label === '?' ? UNK : m.color ?? '#2563eb';
        return (
          <g key={`m${i}`}>
            <circle cx={X(m.v)} cy={y} r="4.5" fill={c} stroke="#fff" strokeWidth="1" />
            <text x={X(m.v)} y={y + 23} textAnchor="middle" fontSize={m.label === '?' ? 16 : 12.5} fontWeight="bold" fill={c}>{m.label ?? m.v}</text>
          </g>
        );
      })}
    </svg>
  );
};

/** Árcédula. */
export const PriceTag: React.FC<{ x: number; y: number; text: string; w?: number; color?: string }> = ({ x, y, text, w = 56, color = '#fff' }) => (
  <g>
    <path d={`M ${x} ${y} L ${x + w - 10} ${y} L ${x + w} ${y + 11} L ${x + w - 10} ${y + 22} L ${x} ${y + 22} Z`} fill={color} stroke="#475569" strokeWidth="1.2" />
    <circle cx={x + w - 11} cy={y + 11} r="2.2" fill="#94a3b8" />
    <text x={x + (w - 10) / 2} y={y + 16} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a" fontFamily={FONT}>{text}</text>
  </g>
);

/** Számkártya (pl. hiányzó számjeggyel). */
export const DigitCards: React.FC<{ x: number; y: number; digits: string[]; s?: number }> = ({ x, y, digits, s = 30 }) => (
  <g>
    {digits.map((d, i) => (
      <g key={i}>
        <rect x={x + i * (s + 4)} y={y} width={s} height={s * 1.25} rx="6" fill={d === '□' || d === '?' ? '#fee2e2' : '#fff'} stroke={d === '□' || d === '?' ? UNK : '#334155'} strokeWidth="1.6" />
        <text x={x + i * (s + 4) + s / 2} y={y + s * 0.88} textAnchor="middle" fontSize={s * 0.7} fontWeight="bold" fill={d === '□' || d === '?' ? UNK : '#0f172a'} fontFamily={FONT}>{d === '□' ? '?' : d}</text>
      </g>
    ))}
  </g>
);

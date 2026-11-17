import React from 'react';

// Kis rajzelemek a kerekítés leckéhez – a Figures, Theory és Quiz fájlok közösen használják.
export const FONT = 'system-ui, Segoe UI, sans-serif';
export const UNK = '#dc2626';

export const roundTen = (n: number) => Math.floor((n + 5) / 10) * 10;
export const roundHundred = (n: number) => Math.floor((n + 50) / 100) * 100;

export interface LineMark {
  v: number;
  /** A pont fölé írt felirat; ha nincs megadva, a szám maga. '?' = ismeretlen. */
  label?: string;
  color?: string;
}

export interface LineArrow {
  from: number;
  to: number;
  color?: string;
}

/**
 * Számegyenes lo-tól hi-ig. Kis osztás: tickEvery; nagy osztás: bigEvery többszörösein.
 * labels: a vonal alá írt számok. marks: pontok, feliratuk a vonal fölött.
 * arrows: ívek a vonal alatt (a kerekítés iránya). bands: színes sávok.
 */
export const RLine: React.FC<{
  lo: number;
  hi: number;
  tickEvery: number;
  bigEvery: number;
  labels: number[];
  marks?: LineMark[];
  arrows?: LineArrow[];
  bands?: { from: number; to: number; color: string }[];
  W?: number;
  H?: number;
  bg?: boolean;
  className?: string;
}> = ({ lo, hi, tickEvery, bigEvery, labels, marks = [], arrows = [], bands = [], W = 320, H = 110, bg = true, className = 'w-full h-auto' }) => {
  const x0 = 22;
  const x1 = W - 26;
  const y = 48;
  const X = (v: number) => x0 + ((x1 - x0) * (v - lo)) / (hi - lo);
  const ticks: number[] = [];
  for (let v = lo; v <= hi; v += tickEvery) ticks.push(v);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {bg && <rect x="1" y="1" width={W - 2} height={H - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />}
      {bands.map((b, i) => (
        <rect key={`b${i}`} x={X(b.from) - 3} y={y - 9} width={X(b.to) - X(b.from) + 6} height="18" rx="6" fill={b.color} opacity="0.35" />
      ))}
      <line x1={x0 - 10} y1={y} x2={x1 + 10} y2={y} stroke="#334155" strokeWidth="1.8" />
      <path d={`M ${x1 + 10} ${y - 4} L ${x1 + 17} ${y} L ${x1 + 10} ${y + 4} Z`} fill="#334155" />
      {ticks.map((v) => {
        const big = v % bigEvery === 0;
        const h = big ? 8 : 4.5;
        return <line key={v} x1={X(v)} y1={y - h} x2={X(v)} y2={y + h} stroke="#334155" strokeWidth={big ? 1.6 : 0.9} />;
      })}
      {labels.map((v) => (
        <text key={`l${v}`} x={X(v)} y={y + 22} textAnchor="middle" fontSize="11.5" fill="#475569">{v}</text>
      ))}
      {arrows.map((a, i) => {
        const xa = X(a.from);
        const xb = X(a.to);
        const c = a.color ?? '#16a34a';
        const yy = y + 30;
        return (
          <g key={`a${i}`}>
            <path d={`M ${xa} ${y + 10} Q ${xa} ${yy + 6} ${(xa + xb) / 2} ${yy + 6} Q ${xb} ${yy + 6} ${xb} ${y + 26}`} fill="none" stroke={c} strokeWidth="2" />
            <path d={`M ${xb - 4} ${y + 31} L ${xb} ${y + 25} L ${xb + 4} ${y + 31}`} fill="none" stroke={c} strokeWidth="2" />
          </g>
        );
      })}
      {marks.map((m, i) => {
        const c = m.label === '?' ? UNK : m.color ?? '#2563eb';
        return (
          <g key={`m${i}`}>
            <circle cx={X(m.v)} cy={y} r="4.8" fill={c} stroke="#fff" strokeWidth="1" />
            <line x1={X(m.v)} y1={y - 8} x2={X(m.v)} y2={y - 15} stroke={c} strokeWidth="1.6" />
            <text x={X(m.v)} y={y - 19} textAnchor="middle" fontSize={m.label === '?' ? 16 : 12.5} fontWeight="bold" fill={c}>{m.label ?? m.v}</text>
          </g>
        );
      })}
    </svg>
  );
};

/** Árcédula. */
export const PriceTag: React.FC<{ x: number; y: number; text: string; w?: number; color?: string }> = ({ x, y, text, w = 62, color = '#fff' }) => (
  <g>
    <path d={`M ${x} ${y} L ${x + w - 10} ${y} L ${x + w} ${y + 11} L ${x + w - 10} ${y + 22} L ${x} ${y + 22} Z`} fill={color} stroke="#475569" strokeWidth="1.2" />
    <circle cx={x + w - 11} cy={y + 11} r="2.2" fill="#94a3b8" />
    <text x={x + (w - 10) / 2} y={y + 16} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a" fontFamily={FONT}>{text}</text>
  </g>
);

/** Számkártyák egy sorban; '?' = letakart jegy. */
export const DigitCards: React.FC<{ x: number; y: number; digits: string[]; s?: number }> = ({ x, y, digits, s = 30 }) => (
  <g>
    {digits.map((d, i) => {
      const q = d === '?';
      return (
        <g key={i}>
          <rect x={x + i * (s + 4)} y={y} width={s} height={s * 1.25} rx="6" fill={q ? '#dbeafe' : '#fff'} stroke={q ? '#2563eb' : '#334155'} strokeWidth="1.6" />
          <text x={x + i * (s + 4) + s / 2} y={y + s * 0.88} textAnchor="middle" fontSize={s * 0.7} fontWeight="bold" fill={q ? '#1d4ed8' : '#0f172a'} fontFamily={FONT}>{q ? '□' : d}</text>
        </g>
      );
    })}
  </g>
);

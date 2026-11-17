import React from 'react';

// Rajzelemek a számegyeneshez (számegyenes, szöcske, ugrásív, mérőszalag) – a Figures, Theory és Quiz fájlok használják.
export const FONT = 'system-ui, Segoe UI, sans-serif';
export const UNK = '#dc2626';

export interface NLineMark {
  /** beosztás sorszáma (0 = első vonás); lehet tört is */
  i: number;
  text: string;
  color?: string;
  kind?: 'arrow' | 'dot';
}

/**
 * Számegyenes-részlet. A beosztások: lo, lo + step, …, lo + n·step.
 * `labels`: azoknak a vonásoknak a sorszáma, amelyek alá számot írunk.
 * `big`: azok az értékek kapnak hosszabb vonást, amelyek oszthatók vele.
 */
export const NLine: React.FC<{
  x0: number;
  x1: number;
  y: number;
  lo: number;
  step: number;
  n: number;
  labels: number[];
  big?: number;
  mid?: number;
  marks?: NLineMark[];
  seg?: [number, number];
  segColor?: string;
  fs?: number;
  unit?: string;
}> = ({ x0, x1, y, lo, step, n, labels, big = 10, mid, marks = [], seg, segColor = '#f97316', fs = 11, unit = '' }) => {
  const X = (i: number) => x0 + ((x1 - x0) * i) / n;
  return (
    <g fontFamily={FONT}>
      <line x1={x0 - 8} y1={y} x2={x1 + 12} y2={y} stroke="#334155" strokeWidth="1.8" />
      <path d={`M ${x1 + 12} ${y - 4} L ${x1 + 18} ${y} L ${x1 + 12} ${y + 4} Z`} fill="#334155" />
      {seg && <line x1={X(seg[0])} y1={y} x2={X(seg[1])} y2={y} stroke={segColor} strokeWidth="6" />}
      {Array.from({ length: n + 1 }, (_, i) => {
        const v = lo + i * step;
        const isBig = v % big === 0;
        const isMid = mid !== undefined && v % mid === 0;
        const d = isBig ? 9 : isMid ? 7 : 5;
        return <line key={i} x1={X(i)} y1={y - d} x2={X(i)} y2={y + d} stroke="#334155" strokeWidth={isBig ? 1.6 : 1} />;
      })}
      {labels.map((i) => (
        <text key={i} x={X(i)} y={y + fs + 12} textAnchor="middle" fontSize={fs} fontWeight="bold" fill="#334155">
          {lo + i * step}
          {unit}
        </text>
      ))}
      {marks.map((m, k) => {
        const c = m.color || UNK;
        return m.kind === 'dot' ? (
          <g key={k}>
            <circle cx={X(m.i)} cy={y} r="4" fill={c} />
            <text x={X(m.i)} y={y - 13} textAnchor="middle" fontSize="13" fontWeight="bold" fill={c}>{m.text}</text>
          </g>
        ) : (
          <g key={k}>
            <line x1={X(m.i)} y1={y - 30} x2={X(m.i)} y2={y - 11} stroke={c} strokeWidth="1.8" />
            <path d={`M ${X(m.i) - 4} ${y - 16} L ${X(m.i)} ${y - 10} L ${X(m.i) + 4} ${y - 16}`} fill="none" stroke={c} strokeWidth="1.8" />
            <text x={X(m.i)} y={y - 34} textAnchor="middle" fontSize="13" fontWeight="bold" fill={c}>{m.text}</text>
          </g>
        );
      })}
    </g>
  );
};

/** Ugrásív két pont között (xa → xb), nyílheggyel és felirattal. */
export const Hop: React.FC<{ xa: number; xb: number; y: number; h?: number; text?: string; color?: string }> = ({ xa, xb, y, h = 22, text, color = '#16a34a' }) => {
  const mx = (xa + xb) / 2;
  const dir = xb > xa ? 1 : -1;
  return (
    <g fontFamily={FONT}>
      <path d={`M ${xa} ${y} Q ${mx} ${y - h * 2} ${xb} ${y}`} fill="none" stroke={color} strokeWidth="1.8" />
      <path d={`M ${xb - dir * 6} ${y - 6} L ${xb} ${y} L ${xb - dir * 1} ${y - 8}`} fill="none" stroke={color} strokeWidth="1.8" />
      {text && (
        <text x={mx} y={y - h - 6} textAnchor="middle" fontSize="11" fontWeight="bold" fill={color}>{text}</text>
      )}
    </g>
  );
};

/** Kis zöld szöcske (oldalnézet), a talpa (x, y)-nál. */
export const Grasshopper: React.FC<{ x: number; y: number; s?: number; flip?: boolean }> = ({ x, y, s = 1, flip = false }) => (
  <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
    <ellipse cx="0" cy="-10" rx="11" ry="5" fill="#4ade80" stroke="#15803d" strokeWidth="1.2" />
    <circle cx="11" cy="-13" r="4.5" fill="#4ade80" stroke="#15803d" strokeWidth="1.2" />
    <circle cx="12.5" cy="-14" r="1.2" fill="#14532d" />
    <path d="M 13 -17 Q 18 -26 24 -25" fill="none" stroke="#15803d" strokeWidth="1" />
    <path d="M -4 -12 L -12 -20 L -14 0" fill="none" stroke="#15803d" strokeWidth="1.6" />
    <path d="M 3 -7 L 1 0" fill="none" stroke="#15803d" strokeWidth="1.3" />
    <path d="M 7 -7 L 9 0" fill="none" stroke="#15803d" strokeWidth="1.3" />
  </g>
);

/** Sárga mérőszalag 0–200 cm, 5 cm-es beosztással, 50 cm-enként felirattal. */
export const Tape: React.FC<{ x0: number; x1: number; y: number; h?: number }> = ({ x0, x1, y, h = 30 }) => {
  const X = (cm: number) => x0 + ((x1 - x0) * cm) / 200;
  return (
    <g fontFamily={FONT}>
      <rect x={x0 - 8} y={y} width={x1 - x0 + 16} height={h} fill="#fde047" stroke="#a16207" strokeWidth="1.2" />
      {Array.from({ length: 41 }, (_, k) => {
        const cm = k * 5;
        const len = cm % 50 === 0 ? h * 0.55 : cm % 10 === 0 ? h * 0.38 : h * 0.22;
        return <line key={k} x1={X(cm)} y1={y} x2={X(cm)} y2={y + len} stroke="#422006" strokeWidth={cm % 50 === 0 ? 1.4 : 0.8} />;
      })}
      {[0, 50, 100, 150, 200].map((cm) => (
        <text key={cm} x={cm === 0 ? X(cm) - 4 : cm === 200 ? X(cm) + 6 : X(cm)} y={y + h - 3} textAnchor={cm === 0 ? 'start' : cm === 200 ? 'end' : 'middle'} fontSize="9.5" fontWeight="bold" fill="#422006">{cm}</text>
      ))}
    </g>
  );
};

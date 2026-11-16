import React from 'react';

/**
 * Belső rajzsegédek a statisztikai leckék ábráihoz és kvízábráihoz (nem exportáljuk az index.ts-ből).
 * Oszlopdiagram, vonaldiagram, dobozdiagram, Venn-diagram, kördiagram, SVG-táblázat.
 */

export const S_INK = '#0f172a';
export const S_AXIS = '#475569';
export const S_GRID = '#e2e8f0';
export const S_BLUE = '#2563eb';
export const S_RED = '#dc2626';
export const S_GREEN = '#059669';
export const S_AMBER = '#d97706';
export const S_PURPLE = '#7c3aed';
export const S_TEAL = '#0d9488';
export const S_PALETTE = ['#2563eb', '#059669', '#d97706', '#7c3aed', '#dc2626', '#0d9488', '#db2777', '#65a30d'];

export const sr = (n: number) => Math.round(n * 10) / 10;
/** Magyar tizedesvessző. */
export const hu = (x: number, d = 2) => (Number.isFinite(x) ? (Math.round(x * 10 ** d) / 10 ** d).toString().replace('.', ',') : '–');

export const SFig: React.FC<{ children: React.ReactNode; title?: string; w?: number; h?: number; className?: string }> = ({
  children,
  title,
  w = 240,
  h = 160,
  className = 'w-full max-w-[300px] h-auto mx-auto'
}) => (
  <svg viewBox={`0 0 ${w} ${h}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width={w - 2} height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {title && (
      <text x={w / 2} y="15" fontSize="10.5" fontWeight="bold" textAnchor="middle" fill="#334155">
        {title}
      </text>
    )}
    {children}
  </svg>
);

export const SText: React.FC<{
  x: number;
  y: number;
  t: React.ReactNode;
  s?: number;
  c?: string;
  a?: 'start' | 'middle' | 'end';
  b?: boolean;
  rot?: number;
}> = ({ x, y, t, s = 9, c = S_INK, a = 'middle', b, rot }) => (
  <text
    x={sr(x)}
    y={sr(y)}
    fontSize={s}
    fill={c}
    textAnchor={a}
    fontWeight={b ? 'bold' : 'normal'}
    transform={rot ? `rotate(${rot} ${sr(x)} ${sr(y)})` : undefined}
  >
    {t}
  </text>
);

export interface BarDatum {
  label: string;
  value: number;
  color?: string;
  /** a második sorozat (csoportosított oszlopdiagramhoz) */
  value2?: number;
}

/**
 * Oszlopdiagram (vagy hisztogram, ha gap = 0). A függőleges tengely yMin-től indul (félrevezető diagramhoz yMin > 0).
 */
export const SBarChart: React.FC<{
  data: BarDatum[];
  yMin?: number;
  yMax: number;
  ticks: number[];
  x0?: number;
  y0?: number;
  w?: number;
  h?: number;
  gap?: number;
  color?: string;
  color2?: string;
  showValues?: boolean;
  yLabel?: string;
  labelSize?: number;
  tickFmt?: (v: number) => string;
  hideValueOf?: number;
}> = ({
  data,
  yMin = 0,
  yMax,
  ticks,
  x0 = 34,
  y0 = 135,
  w = 196,
  h = 105,
  gap = 0.25,
  color = S_BLUE,
  color2 = S_AMBER,
  showValues,
  yLabel,
  labelSize = 8,
  tickFmt = (v) => hu(v, 2),
  hideValueOf
}) => {
  const Y = (v: number) => y0 - ((Math.max(v, yMin) - yMin) / (yMax - yMin)) * h;
  const slot = w / data.length;
  const two = data.some((d) => d.value2 !== undefined);
  const bw = slot * (1 - gap);
  return (
    <g>
      {ticks.map((t) => (
        <g key={t}>
          <line x1={x0} y1={sr(Y(t))} x2={x0 + w} y2={sr(Y(t))} stroke={S_GRID} strokeWidth={0.8} />
          <SText x={x0 - 3} y={Y(t) + 3} t={tickFmt(t)} s={7.5} a="end" c={S_AXIS} />
        </g>
      ))}
      {data.map((d, i) => {
        const left = x0 + i * slot + (slot - bw) / 2;
        const bws = two ? bw / 2 : bw;
        return (
          <g key={d.label + i}>
            <rect
              x={sr(left)}
              y={sr(Y(d.value))}
              width={sr(bws)}
              height={sr(y0 - Y(d.value))}
              fill={d.color ?? color}
              opacity={0.85}
              stroke={gap === 0 ? '#ffffff' : 'none'}
              strokeWidth={gap === 0 ? 0.8 : 0}
            />
            {two && d.value2 !== undefined && (
              <rect x={sr(left + bws)} y={sr(Y(d.value2))} width={sr(bws)} height={sr(y0 - Y(d.value2))} fill={color2} opacity={0.85} />
            )}
            {showValues && i !== hideValueOf && (
              <SText x={left + bws / 2} y={Y(d.value) - 2.5} t={hu(d.value, 2)} s={7} c={S_INK} />
            )}
            {showValues && i === hideValueOf && <SText x={left + bws / 2} y={Y(d.value) - 2.5} t="?" s={9} c={S_RED} b />}
            <SText x={x0 + i * slot + slot / 2} y={y0 + 10} t={d.label} s={labelSize} c={S_AXIS} />
          </g>
        );
      })}
      <line x1={x0} y1={y0} x2={x0 + w} y2={y0} stroke={S_AXIS} strokeWidth={1.2} />
      <line x1={x0} y1={y0} x2={x0} y2={y0 - h - 4} stroke={S_AXIS} strokeWidth={1.2} />
      {yMin > 0 && (
        <path d={`M ${x0 - 4} ${y0 - 6} l 8 -3 M ${x0 - 4} ${y0 - 2} l 8 -3`} stroke={S_RED} strokeWidth={1.2} fill="none" />
      )}
      {yLabel && <SText x={x0 + 2} y={y0 - h - 7} t={yLabel} s={7.5} a="start" c={S_AXIS} />}
    </g>
  );
};

/** Vonaldiagram. */
export const SLineChart: React.FC<{
  values: number[];
  labels: string[];
  yMin?: number;
  yMax: number;
  ticks: number[];
  x0?: number;
  y0?: number;
  w?: number;
  h?: number;
  color?: string;
  tickFmt?: (v: number) => string;
  labelEvery?: number;
}> = ({ values, labels, yMin = 0, yMax, ticks, x0 = 34, y0 = 135, w = 196, h = 105, color = S_BLUE, tickFmt = (v) => hu(v, 2), labelEvery = 1 }) => {
  const Y = (v: number) => y0 - ((v - yMin) / (yMax - yMin)) * h;
  const X = (i: number) => x0 + 8 + (i * (w - 16)) / Math.max(1, values.length - 1);
  const d = values.map((v, i) => `${i ? 'L' : 'M'} ${sr(X(i))} ${sr(Y(v))}`).join(' ');
  return (
    <g>
      {ticks.map((t) => (
        <g key={t}>
          <line x1={x0} y1={sr(Y(t))} x2={x0 + w} y2={sr(Y(t))} stroke={S_GRID} strokeWidth={0.8} />
          <SText x={x0 - 3} y={Y(t) + 3} t={tickFmt(t)} s={7.5} a="end" c={S_AXIS} />
        </g>
      ))}
      <path d={d} fill="none" stroke={color} strokeWidth={2} />
      {values.map((v, i) => (
        <circle key={i} cx={sr(X(i))} cy={sr(Y(v))} r={2.4} fill={color} />
      ))}
      {labels.map((l, i) => (i % labelEvery === 0 ? <SText key={l + i} x={X(i)} y={y0 + 10} t={l} s={7} c={S_AXIS} /> : null))}
      <line x1={x0} y1={y0} x2={x0 + w} y2={y0} stroke={S_AXIS} strokeWidth={1.2} />
      <line x1={x0} y1={y0} x2={x0} y2={y0 - h - 4} stroke={S_AXIS} strokeWidth={1.2} />
    </g>
  );
};

/**
 * Vízszintes dobozdiagram: q = [Q0, Q1, Q2, Q3, Q4] (Q0/Q4 a bajusz végei), outliers külön pontok.
 * A tengely axMin..axMax, ticks feliratokkal. labels: mutassa-e a Q-értékeket.
 */
export const SBoxPlot: React.FC<{
  q: [number, number, number, number, number];
  outliers?: number[];
  axMin: number;
  axMax: number;
  ticks: number[];
  x0?: number;
  w?: number;
  y?: number;
  bh?: number;
  color?: string;
  tickFmt?: (v: number) => string;
  qLabels?: (string | null)[];
}> = ({ q, outliers = [], axMin, axMax, ticks, x0 = 20, w = 200, y = 70, bh = 30, color = S_PURPLE, tickFmt = (v) => hu(v, 2), qLabels }) => {
  const X = (v: number) => x0 + ((v - axMin) / (axMax - axMin)) * w;
  const top = y - bh / 2;
  const axY = y + bh / 2 + 18;
  return (
    <g>
      <line x1={sr(X(q[0]))} y1={y} x2={sr(X(q[1]))} y2={y} stroke={S_INK} strokeWidth={1.5} />
      <line x1={sr(X(q[3]))} y1={y} x2={sr(X(q[4]))} y2={y} stroke={S_INK} strokeWidth={1.5} />
      <line x1={sr(X(q[0]))} y1={y - 8} x2={sr(X(q[0]))} y2={y + 8} stroke={S_INK} strokeWidth={1.5} />
      <line x1={sr(X(q[4]))} y1={y - 8} x2={sr(X(q[4]))} y2={y + 8} stroke={S_INK} strokeWidth={1.5} />
      <rect x={sr(X(q[1]))} y={top} width={sr(X(q[3]) - X(q[1]))} height={bh} fill={color} fillOpacity={0.18} stroke={color} strokeWidth={1.6} />
      <line x1={sr(X(q[2]))} y1={top} x2={sr(X(q[2]))} y2={top + bh} stroke={color} strokeWidth={2.4} />
      {outliers.map((o, i) => (
        <circle key={i} cx={sr(X(o))} cy={y} r={3} fill="#ffffff" stroke={S_RED} strokeWidth={1.6} />
      ))}
      {qLabels &&
        qLabels.map((l, i) =>
          l ? <SText key={i} x={X(q[i])} y={top - 5 - (i % 2) * 9} t={l} s={7.5} c={S_INK} b /> : null
        )}
      <line x1={x0} y1={axY} x2={x0 + w} y2={axY} stroke={S_AXIS} strokeWidth={1} />
      {ticks.map((t) => (
        <g key={t}>
          <line x1={sr(X(t))} y1={axY - 3} x2={sr(X(t))} y2={axY + 3} stroke={S_AXIS} strokeWidth={1} />
          <SText x={X(t)} y={axY + 12} t={tickFmt(t)} s={7} c={S_AXIS} />
          <line x1={sr(X(t))} y1={top - 2} x2={sr(X(t))} y2={axY - 3} stroke={S_GRID} strokeWidth={0.6} strokeDasharray="2 2" />
        </g>
      ))}
    </g>
  );
};

/** Két halmaz Venn-diagramja: csak A, A·B, csak B, egyik sem feliratokkal. */
export const SVenn: React.FC<{
  onlyA: string;
  both: string;
  onlyB: string;
  none?: string;
  labelA: string;
  labelB: string;
  labelU?: string;
  cx?: number;
  cy?: number;
}> = ({ onlyA, both, onlyB, none, labelA, labelB, labelU = 'U', cx = 120, cy = 86 }) => (
  <g>
    <rect x={cx - 105} y={cy - 62} width={210} height={124} rx={8} fill="#ffffff" stroke={S_AXIS} strokeWidth={1.2} />
    <SText x={cx - 98} y={cy - 50} t={labelU} s={9} a="start" c={S_AXIS} b />
    <circle cx={cx - 26} cy={cy + 4} r={44} fill={S_BLUE} fillOpacity={0.16} stroke={S_BLUE} strokeWidth={1.6} />
    <circle cx={cx + 26} cy={cy + 4} r={44} fill={S_AMBER} fillOpacity={0.16} stroke={S_AMBER} strokeWidth={1.6} />
    <SText x={cx - 56} y={cy - 44} t={labelA} s={8.5} c={S_BLUE} b />
    <SText x={cx + 56} y={cy - 44} t={labelB} s={8.5} c={S_AMBER} b />
    <SText x={cx - 44} y={cy + 8} t={onlyA} s={10} b />
    <SText x={cx} y={cy + 8} t={both} s={10} b />
    <SText x={cx + 44} y={cy + 8} t={onlyB} s={10} b />
    {none && <SText x={cx + 88} y={cy + 54} t={none} s={9.5} b />}
  </g>
);

/** Kördiagram: értékek (arányosan), a szeletek közepére a felirat. */
export const SPie: React.FC<{ values: number[]; labels?: string[]; cx?: number; cy?: number; r?: number; colors?: string[] }> = ({
  values,
  labels,
  cx = 80,
  cy = 85,
  r = 55,
  colors = S_PALETTE
}) => {
  const tot = values.reduce((a, b) => a + b, 0);
  let acc = 0;
  return (
    <g>
      {values.map((v, i) => {
        const a0 = (acc / tot) * 2 * Math.PI - Math.PI / 2;
        acc += v;
        const a1 = (acc / tot) * 2 * Math.PI - Math.PI / 2;
        const large = a1 - a0 > Math.PI ? 1 : 0;
        const p0 = [cx + r * Math.cos(a0), cy + r * Math.sin(a0)];
        const p1 = [cx + r * Math.cos(a1), cy + r * Math.sin(a1)];
        const am = (a0 + a1) / 2;
        return (
          <g key={i}>
            <path
              d={`M ${cx} ${cy} L ${sr(p0[0])} ${sr(p0[1])} A ${r} ${r} 0 ${large} 1 ${sr(p1[0])} ${sr(p1[1])} Z`}
              fill={colors[i % colors.length]}
              fillOpacity={0.8}
              stroke="#ffffff"
              strokeWidth={1.2}
            />
            {labels && labels[i] && <SText x={cx + 0.62 * r * Math.cos(am)} y={cy + 0.62 * r * Math.sin(am) + 3} t={labels[i]} s={8} c="#ffffff" b />}
          </g>
        );
      })}
    </g>
  );
};

/** Egyszerű SVG-táblázat (első sor fejléc). */
export const STable: React.FC<{
  rows: (string | number)[][];
  x?: number;
  y?: number;
  colW?: number[] | number;
  rowH?: number;
  s?: number;
  highlight?: [number, number][];
}> = ({ rows, x = 10, y = 24, colW = 44, rowH = 18, s = 8, highlight = [] }) => {
  const ncol = Math.max(...rows.map((r) => r.length));
  const widths = Array.isArray(colW) ? colW : Array.from({ length: ncol }, () => colW);
  const xs = widths.reduce<number[]>((acc, wv, i) => [...acc, acc[i] + wv], [x]);
  return (
    <g>
      {rows.map((r, i) =>
        r.map((c, j) => {
          const hl = highlight.some(([a, b]) => a === i && b === j);
          return (
            <g key={`${i}-${j}`}>
              <rect
                x={xs[j]}
                y={y + i * rowH}
                width={widths[j]}
                height={rowH}
                fill={hl ? '#fef3c7' : i === 0 || j === 0 ? '#eef2ff' : '#ffffff'}
                stroke="#94a3b8"
                strokeWidth={0.8}
              />
              <SText x={xs[j] + widths[j] / 2} y={y + i * rowH + rowH / 2 + s / 3} t={String(c)} s={s} b={i === 0 || j === 0 || hl} c={hl ? S_RED : S_INK} />
            </g>
          );
        })
      )}
    </g>
  );
};

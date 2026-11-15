import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

const INK = '#0f172a';
const MUTED = '#64748b';
const GRID = '#e2e8f0';
const BAR = '#0284c7';

/** Tizedesvesszős formázás. */
export const hu = (x: number, d = 2): string => {
  const r = Math.round(x * Math.pow(10, d)) / Math.pow(10, d);
  return String(r).replace('.', ',');
};

export interface MiniBarChartProps {
  labels: string[];
  values: number[];
  xTitle?: string;
  yTitle?: string;
  width?: number;
  height?: number;
  className?: string;
  showValues?: boolean;
  highlight?: number[];
  hideIndex?: number;
}

/** Egyszerű oszlopdiagram (gyakoriság): vékony rács, lekerekített oszlopvég, értékcímkék. */
export const MiniBarChart: React.FC<MiniBarChartProps> = ({
  labels,
  values,
  xTitle,
  yTitle,
  width = 240,
  height = 160,
  className = 'w-full max-w-[280px] h-auto mx-auto',
  showValues = true,
  highlight = [],
  hideIndex
}) => {
  const left = 30;
  const right = 10;
  const top = 16;
  const bottom = xTitle ? 38 : 24;
  const plotW = width - left - right;
  const plotH = height - top - bottom;
  const maxV = Math.max(...values, 1);
  const step = maxV <= 6 ? 1 : maxV <= 12 ? 2 : maxV <= 30 ? 5 : maxV <= 60 ? 10 : 20;
  const yMax = Math.ceil(maxV / step) * step;
  const ticks = Array.from({ length: yMax / step + 1 }, (_, i) => i * step);
  const bw = plotW / labels.length;
  const barW = Math.min(28, bw * 0.62);
  const y = (v: number) => top + plotH - (v / yMax) * plotH;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} xmlns="http://www.w3.org/2000/svg">
      {ticks.map((t) => (
        <g key={t}>
          <line x1={left} y1={y(t)} x2={width - right} y2={y(t)} stroke={GRID} strokeWidth="1" />
          <text x={left - 4} y={y(t) + 3} fontSize="8" textAnchor="end" fill={MUTED}>
            {t}
          </text>
        </g>
      ))}
      {values.map((v, i) => {
        const x = left + bw * i + (bw - barW) / 2;
        const h = (v / yMax) * plotH;
        const r = Math.min(4, h / 2);
        const yTop = top + plotH - h;
        const hl = highlight.includes(i);
        return (
          <g key={i}>
            {h > 0 && (
              <path
                d={`M ${x} ${top + plotH} L ${x} ${yTop + r} Q ${x} ${yTop} ${x + r} ${yTop} L ${x + barW - r} ${yTop} Q ${x + barW} ${yTop} ${x + barW} ${yTop + r} L ${x + barW} ${top + plotH} Z`}
                fill={hl ? '#d97706' : BAR}
              />
            )}
            {showValues && (
              <text x={x + barW / 2} y={yTop - 3} fontSize="8.5" fontWeight="bold" textAnchor="middle" fill={INK}>
                {hideIndex === i ? '?' : String(v).replace('.', ',')}
              </text>
            )}
            <text x={x + barW / 2} y={top + plotH + 11} fontSize="8.5" textAnchor="middle" fill={INK}>
              {labels[i]}
            </text>
          </g>
        );
      })}
      <line x1={left} y1={top + plotH} x2={width - right} y2={top + plotH} stroke="#94a3b8" strokeWidth="1" />
      {xTitle && (
        <text x={left + plotW / 2} y={height - 6} fontSize="8.5" textAnchor="middle" fill={MUTED}>
          {xTitle}
        </text>
      )}
      {yTitle && (
        <text x={4} y={10} fontSize="8" fill={MUTED}>
          {yTitle}
        </text>
      )}
    </svg>
  );
};

/** Pontdiagram (számegyenes, az azonos értékek egymás fölé kerülnek). */
export const DotStrip: React.FC<{
  values: number[];
  min: number;
  max: number;
  tick?: number;
  width?: number;
  height?: number;
  className?: string;
  marks?: { value: number; label: string; color: string }[];
}> = ({ values, min, max, tick = 5, width = 240, height = 120, className = 'w-full max-w-[280px] h-auto mx-auto', marks = [] }) => {
  const left = 14;
  const right = 14;
  const base = height - 30;
  const x = (v: number) => left + ((v - min) / (max - min)) * (width - left - right);
  const counts: Record<string, number> = {};
  const ticks: number[] = [];
  for (let t = Math.ceil(min / tick) * tick; t <= max; t += tick) ticks.push(t);
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} xmlns="http://www.w3.org/2000/svg">
      <line x1={left} y1={base} x2={width - right} y2={base} stroke="#94a3b8" strokeWidth="1" />
      {ticks.map((t) => (
        <g key={t}>
          <line x1={x(t)} y1={base} x2={x(t)} y2={base + 4} stroke="#94a3b8" />
          <text x={x(t)} y={base + 14} fontSize="8" textAnchor="middle" fill={MUTED}>
            {t}
          </text>
        </g>
      ))}
      {values.map((v, i) => {
        const k = String(v);
        counts[k] = (counts[k] || 0) + 1;
        return <circle key={i} cx={x(v)} cy={base - 6 - (counts[k] - 1) * 10} r="4.2" fill={BAR} stroke="#ffffff" strokeWidth="1.2" />;
      })}
      {marks.map((m) => (
        <g key={m.label}>
          <line x1={x(m.value)} y1={14} x2={x(m.value)} y2={base} stroke={m.color} strokeWidth="1.5" strokeDasharray="3 2" />
          <text x={x(m.value)} y={11} fontSize="8" fontWeight="bold" textAnchor="middle" fill={INK}>
            {m.label}
          </text>
        </g>
      ))}
    </svg>
  );
};

// 1. ábra: tűzoltók napi riasztásai – gyakorisági oszlopdiagram, átlag, medián, módusz
export const DataStatsFireAlarmSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <div className={className}>
    <MiniBarChart
      labels={['0', '1', '2', '4', '6', '14']}
      values={[1, 11, 6, 8, 4, 1]}
      xTitle="napi riasztások száma (31 nap)"
      yTitle="napok száma"
      width={360}
      height={210}
      className="w-full h-auto"
      highlight={[1]}
    />
    <div className="flex flex-wrap justify-center gap-3 text-xs text-slate-700 mt-1">
      <span>
        <span className="inline-block w-2.5 h-2.5 rounded-sm mr-1 align-middle" style={{ background: '#d97706' }} />
        módusz: 1 (11 nap)
      </span>
      <span>medián: 2 (a 16. adat)</span>
      <span>átlag: 93 : 31 = 3</span>
    </div>
  </div>
);

// 2. ábra: az évfolyamok átlagos osztálylétszáma (1. feladat b)
export const DataStatsClassSizeChartSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <MiniBarChart
    labels={['9.', '10.', '11.', '12.']}
    values={[33, 29.29, 27, 30.25]}
    xTitle="évfolyam"
    yTitle="átlagos létszám (fő)"
    width={360}
    height={210}
    className={className}
  />
);

// 3. ábra: a 3. feladat 10 adata pontdiagramon, minimum, medián, átlag, maximum
export const DataStatsMeasuresSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <div className={className}>
    <DotStrip
      values={[32, 18, 20, 18, 20, 24, 15, 18, 55, 10]}
      min={5}
      max={60}
      width={420}
      height={150}
      className="w-full h-auto"
      marks={[
        { value: 10, label: 'min 10', color: '#64748b' },
        { value: 19, label: 'medián 19', color: '#7c3aed' },
        { value: 23, label: 'átlag 23', color: '#d97706' },
        { value: 55, label: 'max 55', color: '#64748b' }
      ]}
    />
    <p className="text-center text-xs text-slate-600 mt-1">módusz: 18 (háromszor); terjedelem: 55 − 10 = 45</p>
  </div>
);

// 4. ábra: történelemdolgozat – osztályzatok gyakorisága és relatív gyakorisága (Házi feladat 1.)
export const DataStatsGradesSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <div className={className}>
    <div className="grid grid-cols-2 gap-2">
      <MiniBarChart labels={['1', '2', '3', '4', '5']} values={[0, 9, 8, 6, 5]} xTitle="osztályzat" yTitle="gyakoriság (fő)" className="w-full h-auto" />
      <MiniBarChart labels={['1', '2', '3', '4', '5']} values={[0, 32.1, 28.6, 21.4, 17.9]} xTitle="osztályzat" yTitle="relatív gyakoriság (%)" className="w-full h-auto" />
    </div>
    <p className="text-center text-xs text-slate-600 mt-1">28 dolgozat; módusz 2, medián 3, átlag 91 : 28 = 3,25, terjedelem 3</p>
  </div>
);

// 5. ábra: súlyozott átlag – Balaton-átúszás (36% nő, 35 év; 64% férfi, 38 év)
export const DataStatsWeightedMeanSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const x = (age: number) => 40 + ((age - 34) / 5) * 340;
  return (
    <svg viewBox="0 0 420 200" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="410" height="190" rx="14" fill="#ffffff" stroke="#cbd5e1" />
      <text x="210" y="28" fontSize="13" fontWeight="bold" textAnchor="middle" fill={INK}>
        Súlyozott átlag: a nagyobb csoport közelebb húzza
      </text>
      <rect x="40" y="44" width={0.36 * 340} height="26" rx="4" fill="#d97706" />
      <rect x={40 + 0.36 * 340 + 2} y="44" width={0.64 * 340 - 2} height="26" rx="4" fill={BAR} />
      <text x={40 + 0.18 * 340} y="61" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#ffffff">
        nők 36%
      </text>
      <text x={40 + 0.68 * 340} y="61" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#ffffff">
        férfiak 64%
      </text>
      <line x1="40" y1="140" x2="380" y2="140" stroke="#94a3b8" />
      {[34, 35, 36, 37, 38, 39].map((a) => (
        <g key={a}>
          <line x1={x(a)} y1="140" x2={x(a)} y2="145" stroke="#94a3b8" />
          <text x={x(a)} y="157" fontSize="10" textAnchor="middle" fill={MUTED}>
            {a}
          </text>
        </g>
      ))}
      <circle cx={x(35)} cy="130" r="7" fill="#d97706" />
      <text x={x(35)} y="114" fontSize="10" textAnchor="middle" fill={INK}>
        nők: 35 év
      </text>
      <circle cx={x(38)} cy="130" r="9" fill={BAR} />
      <text x={x(38)} y="114" fontSize="10" textAnchor="middle" fill={INK}>
        férfiak: 38 év
      </text>
      <path d={`M ${x(36.92)} 96 L ${x(36.92) - 6} 86 L ${x(36.92) + 6} 86 Z`} fill="#7c3aed" />
      <line x1={x(36.92)} y1="96" x2={x(36.92)} y2="140" stroke="#7c3aed" strokeWidth="2" strokeDasharray="3 2" />
      <text x={x(36.92)} y="82" fontSize="11" fontWeight="bold" textAnchor="middle" fill={INK}>
        36,92 év
      </text>
      <text x="210" y="182" fontSize="11" textAnchor="middle" fill={INK}>
        0,36 · 35 + 0,64 · 38 = 12,6 + 24,32 = 36,92
      </text>
    </svg>
  );
};

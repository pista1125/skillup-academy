import React from 'react';
import { MiniBarChart } from '../adatrendezes-statisztikai-jellemzok/DataStatisticsFigures';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

const INK = '#0f172a';
const MUTED = '#64748b';
const GRID = '#e2e8f0';

/** Kategória-színek rögzített sorrendben (validált: kék, borostyán, ibolya, zöld; 5. „egyéb”: szürke). */
export const CAT_COLORS = ['#0284c7', '#d97706', '#7c3aed', '#059669', '#94a3b8'];

const hu = (x: number, d = 1): string => String(Math.round(x * Math.pow(10, d)) / Math.pow(10, d)).replace('.', ',');

export interface PieChartProps {
  values: number[];
  labels?: string[];
  colors?: string[];
  size?: number;
  className?: string;
  showPercent?: boolean;
  /** a matematikai szokás szerint: 0° jobbra, az óramutató járásával ellentétesen */
  startDeg?: number;
  hideLabelIndex?: number;
  angleTicks?: boolean;
}

/** Kördiagram 2 px-es fehér elválasztóval, szeletenkénti közvetlen címkével. */
export const PieChart: React.FC<PieChartProps> = ({
  values,
  labels = [],
  colors = CAT_COLORS,
  size = 240,
  className = 'w-full max-w-[280px] h-auto mx-auto',
  showPercent = true,
  startDeg = 0,
  hideLabelIndex,
  angleTicks = false
}) => {
  const total = values.reduce((a, b) => a + b, 0) || 1;
  const cx = size / 2;
  const cy = size / 2;
  const R = size * 0.32;
  let acc = startDeg;
  const pt = (deg: number, r: number) => ({ x: cx + r * Math.cos((deg * Math.PI) / 180), y: cy - r * Math.sin((deg * Math.PI) / 180) });
  return (
    <svg viewBox={`-50 0 ${size + 100} ${size}`} className={className} xmlns="http://www.w3.org/2000/svg">
      {values.map((v, i) => {
        const a0 = acc;
        const sweep = (v / total) * 360;
        acc += sweep;
        const a1 = acc;
        const p0 = pt(a0, R);
        const p1 = pt(a1, R);
        const large = sweep > 180 ? 1 : 0;
        const mid = (a0 + a1) / 2;
        const lp = pt(mid, R * 0.62);
        const op = pt(mid, R + 16);
        const d =
          sweep >= 359.99
            ? `M ${cx - R} ${cy} A ${R} ${R} 0 1 0 ${cx + R} ${cy} A ${R} ${R} 0 1 0 ${cx - R} ${cy} Z`
            : `M ${cx} ${cy} L ${p0.x} ${p0.y} A ${R} ${R} 0 ${large} 0 ${p1.x} ${p1.y} Z`;
        return (
          <g key={i}>
            {v > 0 && <path d={d} fill={colors[i % colors.length]} stroke="#ffffff" strokeWidth="2" />}
            {showPercent && v > 0 && sweep > 18 && (
              <text x={lp.x} y={lp.y + 3} fontSize="9" fontWeight="bold" textAnchor="middle" fill="#ffffff">
                {hideLabelIndex === i ? '?' : `${hu((v / total) * 100)}%`}
              </text>
            )}
            {labels[i] && v > 0 && (
              <text x={op.x} y={op.y + 3} fontSize="8.5" textAnchor={op.x < cx - 4 ? 'end' : op.x > cx + 4 ? 'start' : 'middle'} fill={INK}>
                {labels[i]}
              </text>
            )}
          </g>
        );
      })}
      {angleTicks &&
        [0, 90, 180, 270].map((a) => {
          const p = pt(a, R + 4);
          const t = pt(a, R + 30);
          return (
            <g key={a}>
              <circle cx={p.x} cy={p.y} r="1.5" fill={MUTED} />
              <text x={t.x} y={t.y + 3} fontSize="8" textAnchor="middle" fill={MUTED}>
                {a}°
              </text>
            </g>
          );
        })}
    </svg>
  );
};

export interface StackedBarProps {
  rows: { label: string; values: number[] }[];
  legend: string[];
  colors?: string[];
  width?: number;
  className?: string;
  hideCell?: [number, number];
}

/** 100%-os (megoszlási) sávdiagram, sávonként egy-egy sor, közvetlen százalékcímkékkel és jelmagyarázattal. */
export const StackedBar: React.FC<StackedBarProps> = ({ rows, legend, colors = CAT_COLORS, width = 320, className = 'w-full max-w-[320px] h-auto mx-auto', hideCell }) => {
  const left = 78;
  const right = 10;
  const rowH = 26;
  const top = 10;
  const plotW = width - left - right;
  const height = top + rows.length * (rowH + 10) + 18 + Math.ceil(legend.length / 2) * 14;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} xmlns="http://www.w3.org/2000/svg">
      {[0, 25, 50, 75, 100].map((t) => (
        <g key={t}>
          <line x1={left + (t / 100) * plotW} y1={top - 2} x2={left + (t / 100) * plotW} y2={top + rows.length * (rowH + 10) - 6} stroke={GRID} />
          <text x={left + (t / 100) * plotW} y={top + rows.length * (rowH + 10) + 4} fontSize="7.5" textAnchor="middle" fill={MUTED}>
            {t}%
          </text>
        </g>
      ))}
      {rows.map((r, j) => {
        const total = r.values.reduce((a, b) => a + b, 0) || 1;
        let acc = 0;
        const y = top + j * (rowH + 10);
        return (
          <g key={r.label}>
            <text x={left - 6} y={y + rowH / 2 + 3} fontSize="8.5" textAnchor="end" fill={INK}>
              {r.label}
            </text>
            {r.values.map((v, i) => {
              const x = left + (acc / total) * plotW;
              const w = (v / total) * plotW;
              acc += v;
              const hidden = hideCell && hideCell[0] === j && hideCell[1] === i;
              return (
                <g key={i}>
                  <rect x={x + 1} y={y} width={Math.max(0, w - 2)} height={rowH} rx="3" fill={colors[i % colors.length]} />
                  {w > 24 && (
                    <text x={x + w / 2} y={y + rowH / 2 + 3} fontSize="8" fontWeight="bold" textAnchor="middle" fill="#ffffff">
                      {hidden ? '?' : `${hu((v / total) * 100, 2)}%`}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        );
      })}
      {legend.map((l, i) => {
        const lx = 10 + (i % 2) * (width / 2);
        const ly = top + rows.length * (rowH + 10) + 18 + Math.floor(i / 2) * 14;
        return (
          <g key={l}>
            <rect x={lx} y={ly - 7} width="8" height="8" rx="2" fill={colors[i % colors.length]} />
            <text x={lx + 12} y={ly} fontSize="8" fill={INK}>
              {l}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

/** Vonaldiagram 2 px-es vonallal és jelölőpontokkal. */
export const LineChart: React.FC<{ labels: string[]; values: number[]; yMin?: number; yMax?: number; yTitle?: string; className?: string }> = ({
  labels,
  values,
  yMin = 0,
  yMax,
  yTitle,
  className = 'w-full max-w-[280px] h-auto mx-auto'
}) => {
  const width = 240;
  const height = 150;
  const left = 28;
  const right = 10;
  const top = 16;
  const bottom = 24;
  const top2 = yMax ?? Math.ceil(Math.max(...values) / 5) * 5;
  const x = (i: number) => left + (i * (width - left - right)) / Math.max(1, labels.length - 1);
  const y = (v: number) => top + (1 - (v - yMin) / (top2 - yMin)) * (height - top - bottom);
  const ticks: number[] = [];
  const step = (top2 - yMin) / 4;
  for (let i = 0; i <= 4; i++) ticks.push(yMin + i * step);
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} xmlns="http://www.w3.org/2000/svg">
      {ticks.map((t) => (
        <g key={t}>
          <line x1={left} y1={y(t)} x2={width - right} y2={y(t)} stroke={GRID} />
          <text x={left - 4} y={y(t) + 3} fontSize="8" textAnchor="end" fill={MUTED}>
            {hu(t)}
          </text>
        </g>
      ))}
      <polyline points={values.map((v, i) => `${x(i)},${y(v)}`).join(' ')} fill="none" stroke={CAT_COLORS[0]} strokeWidth="2" strokeLinejoin="round" />
      {values.map((v, i) => (
        <circle key={i} cx={x(i)} cy={y(v)} r="4" fill={CAT_COLORS[0]} stroke="#ffffff" strokeWidth="1.5" />
      ))}
      {labels.map((l, i) => (
        <text key={l} x={x(i)} y={height - 8} fontSize="8" textAnchor="middle" fill={INK}>
          {l}
        </text>
      ))}
      {yTitle && (
        <text x="4" y="10" fontSize="8" fill={MUTED}>
          {yTitle}
        </text>
      )}
    </svg>
  );
};

/** Sematikus korfa (férfiak balra, nők jobbra); widths: 0–100 év korcsoportonként, alulról felfelé. */
export const PyramidShape: React.FC<{ widths: number[]; label: string; x0?: number }> = ({ widths, label, x0 = 0 }) => {
  const cx = x0 + 60;
  const h = 6;
  return (
    <g>
      {widths.map((w, i) => {
        const y = 130 - (i + 1) * h;
        return (
          <g key={i}>
            <rect x={cx - w - 1} y={y} width={w} height={h - 1} fill={CAT_COLORS[0]} />
            <rect x={cx + 1} y={y} width={w} height={h - 1} fill={CAT_COLORS[1]} />
          </g>
        );
      })}
      <text x={cx} y="146" fontSize="11" fontWeight="bold" textAnchor="middle" fill={INK}>
        {label}
      </text>
    </g>
  );
};

/** Sematikus korfák szélességprofiljai (20 korcsoport, alulról felfelé). */
export const PYRAMID_1950 = [48, 46, 44, 42, 40, 38, 35, 33, 30, 28, 25, 22, 19, 16, 13, 10, 7, 4, 2, 1];
export const PYRAMID_1990 = [30, 34, 38, 36, 33, 32, 34, 37, 35, 31, 29, 27, 24, 20, 16, 12, 8, 5, 2, 1];
export const PYRAMID_2020 = [24, 25, 25, 26, 28, 31, 33, 36, 40, 38, 32, 30, 31, 30, 26, 20, 14, 9, 4, 1];

// 1. ábra: a szimfonikus zenekar összetétele oszlop- és kördiagramon (1. feladat)
export const StatChartsOrchestraSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <div className={className}>
    <div className="grid grid-cols-2 gap-2 items-center">
      <MiniBarChart labels={['vonós', 'fúvós', 'ütős', 'egyéb']} values={[20, 16, 7, 2]} yTitle="fő" className="w-full h-auto" />
      <PieChart values={[20, 16, 7, 2]} labels={['vonós', 'fúvós', 'ütős', 'egyéb']} className="w-full h-auto" />
    </div>
    <p className="text-center text-xs text-slate-600 mt-1">45 zenész; középponti szögek: 160°, 128°, 56°, 16°</p>
  </div>
);

// 2. ábra: színházba járás két korcsoportban – megoszlási sávdiagram (2. feladat)
export const StatChartsTheaterSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <StackedBar
    rows={[
      { label: '40 év alatt (120)', values: [52.5, 35, 12.5] },
      { label: 'legalább 40 (80)', values: [18.75, 37.5, 43.75] }
    ]}
    legend={['5-nél kevesebbszer', '5–10 alkalommal', '10-nél többször']}
    width={380}
    className={className}
  />
);

// 3. ábra: a négy diagramtípus ugyanarra az adatsorra (Elmélet)
export const StatChartsTypesSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const labels = ['A', 'B', 'C', 'D', 'E'];
  const values = [2, 3, 7, 8, 10];
  return (
    <div className={className}>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <MiniBarChart labels={labels} values={values} className="w-full h-auto" />
          <p className="text-center text-xs font-bold text-slate-700">oszlopdiagram</p>
        </div>
        <div>
          <PieChart values={values} labels={labels} className="w-full h-auto" />
          <p className="text-center text-xs font-bold text-slate-700">kördiagram</p>
        </div>
        <div>
          <StackedBar rows={[{ label: 'összesen 30', values }]} legend={labels} className="w-full h-auto" />
          <p className="text-center text-xs font-bold text-slate-700">sávdiagram</p>
        </div>
        <div>
          <LineChart labels={labels} values={values} yMax={12} className="w-full h-auto" />
          <p className="text-center text-xs font-bold text-slate-700">vonaldiagram</p>
        </div>
      </div>
    </div>
  );
};

// 4. ábra: 320 tanuló matematikajegye – sávdiagram a halmozott százalékokkal (Házi feladat 1.)
export const StatChartsGradesBandSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const freq = [10, 40, 135, 95, 40];
  const cum = [0, 3.1, 15.6, 57.8, 87.5, 100];
  const left = 20;
  const plotW = 380;
  return (
    <svg viewBox="0 0 420 130" className={className} xmlns="http://www.w3.org/2000/svg">
      {freq.map((f, i) => {
        const x = left + (cum[i] / 100) * plotW;
        const w = ((cum[i + 1] - cum[i]) / 100) * plotW;
        return (
          <g key={i}>
            <rect x={x + 1} y="34" width={w - 2} height="38" rx="3" fill={CAT_COLORS[i % CAT_COLORS.length]} />
            <text x={x + w / 2} y="26" fontSize="12" fontWeight="bold" textAnchor="middle" fill={INK}>
              {i + 1}
            </text>
            {w > 30 && (
              <text x={x + w / 2} y="57" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#ffffff">
                {f} fő
              </text>
            )}
          </g>
        );
      })}
      {cum.map((c, i) => (
        <g key={i}>
          <line x1={left + (c / 100) * plotW} y1="72" x2={left + (c / 100) * plotW} y2="82" stroke={MUTED} />
          <text x={left + (c / 100) * plotW} y={i % 2 ? 106 : 94} fontSize="9" textAnchor="middle" fill={MUTED}>
            {hu(c)}%
          </text>
        </g>
      ))}
      <line x1={left + plotW / 2} y1="30" x2={left + plotW / 2} y2="76" stroke="#be123c" strokeWidth="1.5" strokeDasharray="3 2" />
      <text x={left + plotW / 2} y="122" fontSize="9" textAnchor="middle" fill="#be123c">
        50% ⇒ a medián a 3-as sávba esik
      </text>
    </svg>
  );
};

// 5. ábra: napi internetezés kördiagramon, 30 diák (Házi feladat 2.)
export const StatChartsInternetPieSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <div className={className}>
    <PieChart values={[24, 120, 132, 84]} labels={['0–1 óra', '1–2 óra', '2–3 óra', '3 óránál több']} angleTicks className="w-full max-w-[320px] h-auto mx-auto" />
    <p className="text-center text-xs text-slate-600">24° → 2 diák, 120° → 10, 132° → 11, 84° → 7 (360° = 30 diák, 1 diák = 12°)</p>
  </div>
);

// 6. ábra: sematikus korfák – fiatalodó, átmeneti és öregedő népesség (Ráadás 3.)
export const StatChartsPyramidSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 380 172" className={className} xmlns="http://www.w3.org/2000/svg">
    <PyramidShape widths={PYRAMID_1950} label="1950: piramis" x0={0} />
    <PyramidShape widths={PYRAMID_1990} label="1990: harang" x0={128} />
    <PyramidShape widths={PYRAMID_2020} label="2020: urna" x0={256} />
    <rect x="130" y="158" width="8" height="8" fill={CAT_COLORS[0]} />
    <text x="142" y="165" fontSize="9" fill={INK}>
      férfiak
    </text>
    <rect x="200" y="158" width="8" height="8" fill={CAT_COLORS[1]} />
    <text x="212" y="165" fontSize="9" fill={INK}>
      nők
    </text>
  </svg>
);

import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

/** A gimnázium diákjainak életkor szerinti megoszlása (1. feladat, kördiagram). */
export const STATISTICS_PRACTICE_AGE_DATA: { age: number; pct: number; color: string }[] = [
  { age: 14, pct: 14, color: '#0ea5e9' },
  { age: 15, pct: 18, color: '#22c55e' },
  { age: 16, pct: 23, color: '#f59e0b' },
  { age: 17, pct: 21, color: '#ef4444' },
  { age: 18, pct: 10, color: '#8b5cf6' },
  { age: 19, pct: 8, color: '#ec4899' },
  { age: 20, pct: 6, color: '#64748b' }
];

const polar = (cx: number, cy: number, r: number, deg: number) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
};

/** Kördiagram-szelet útvonala (fokban, 0° = fent, óramutató járásával egyezően). */
export const statisticsPracticePieSlice = (cx: number, cy: number, r: number, from: number, to: number): string => {
  const p1 = polar(cx, cy, r, from);
  const p2 = polar(cx, cy, r, to);
  const large = to - from > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${p2.x.toFixed(2)} ${p2.y.toFixed(2)} Z`;
};

/** Kördiagram tetszőleges szeletekkel; a címkék a szeleteken kívül. */
export const StatisticsPracticePieChart: React.FC<{
  data: { label: string; pct: number; color: string }[];
  cx: number;
  cy: number;
  r: number;
  fontSize?: number;
}> = ({ data, cx, cy, r, fontSize = 12 }) => {
  let acc = 0;
  return (
    <g>
      {data.map((d) => {
        const from = (acc / 100) * 360;
        acc += d.pct;
        const to = (acc / 100) * 360;
        const mid = (from + to) / 2;
        const lp = polar(cx, cy, r + 18, mid);
        const ip = polar(cx, cy, r * 0.62, mid);
        return (
          <g key={d.label}>
            <path d={statisticsPracticePieSlice(cx, cy, r, from, to)} fill={d.color} stroke="#fff" strokeWidth="2" />
            <text x={ip.x} y={ip.y + 4} fontSize={fontSize - 1} fontWeight="bold" fill="#fff" textAnchor="middle">
              {d.pct}%
            </text>
            <text x={lp.x} y={lp.y + 4} fontSize={fontSize} fill="#1e293b" textAnchor="middle">
              {d.label}
            </text>
          </g>
        );
      })}
    </g>
  );
};

/** Vízszintes dobozdiagram egy számegyenes fölött. */
export const StatisticsPracticeBoxPlot: React.FC<{
  min: number;
  q1: number;
  med: number;
  q3: number;
  max: number;
  axisFrom: number;
  axisTo: number;
  step?: number;
  x0: number;
  x1: number;
  y: number;
  color?: string;
  showLabels?: boolean;
}> = ({ min, q1, med, q3, max, axisFrom, axisTo, step = 1, x0, x1, y, color = '#0284c7', showLabels = true }) => {
  const sx = (v: number) => x0 + ((v - axisFrom) / (axisTo - axisFrom)) * (x1 - x0);
  const ticks: number[] = [];
  for (let v = axisFrom; v <= axisTo + 1e-9; v += step) ticks.push(Math.round(v * 100) / 100);
  const fmt = (v: number) => String(v).replace('.', ',');
  return (
    <g>
      <line x1={x0} y1={y + 40} x2={x1} y2={y + 40} stroke="#475569" strokeWidth="1.5" />
      {ticks.map((t) => (
        <g key={t}>
          <line x1={sx(t)} y1={y + 36} x2={sx(t)} y2={y + 44} stroke="#475569" />
          <text x={sx(t)} y={y + 58} fontSize="11" textAnchor="middle" fill="#334155">
            {fmt(t)}
          </text>
        </g>
      ))}
      <line x1={sx(min)} y1={y} x2={sx(q1)} y2={y} stroke={color} strokeWidth="2" />
      <line x1={sx(q3)} y1={y} x2={sx(max)} y2={y} stroke={color} strokeWidth="2" />
      <line x1={sx(min)} y1={y - 10} x2={sx(min)} y2={y + 10} stroke={color} strokeWidth="2" />
      <line x1={sx(max)} y1={y - 10} x2={sx(max)} y2={y + 10} stroke={color} strokeWidth="2" />
      <rect x={sx(q1)} y={y - 18} width={Math.max(sx(q3) - sx(q1), 1)} height="36" fill="#e0f2fe" stroke={color} strokeWidth="2" />
      <line x1={sx(med)} y1={y - 18} x2={sx(med)} y2={y + 18} stroke="#be123c" strokeWidth="3" />
      {showLabels && (
        <g fontSize="10" fill="#0c4a6e" textAnchor="middle">
          <text x={sx(min)} y={y - 24}>min</text>
          <text x={sx(q1)} y={y - 24}>Q1</text>
          <text x={sx(med)} y={y - 24} fill="#be123c">Me</text>
          <text x={sx(q3)} y={y - 24}>Q3</text>
          <text x={sx(max)} y={y - 24}>max</text>
        </g>
      )}
    </g>
  );
};

// 1. ábra: kördiagram a diákok életkoráról (1. feladat)
export const StatisticsPracticeAgePieSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 420 300" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="412" height="292" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    <text x="210" y="26" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
      A diákok életkor szerinti megoszlása
    </text>
    <StatisticsPracticePieChart data={STATISTICS_PRACTICE_AGE_DATA.map((d) => ({ label: `${d.age} év`, pct: d.pct, color: d.color }))} cx={210} cy={162} r={100} />
  </svg>
);

// 2. ábra: az 1. feladat dobozdiagramja (min 14, Q1 15, Me 16, Q3 17, max 20)
export const StatisticsPracticeAgeBoxPlotSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 440 150" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="432" height="142" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    <text x="220" y="24" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
      Életkor (év) – dobozdiagram
    </text>
    <StatisticsPracticeBoxPlot min={14} q1={15} med={16} q3={17} max={20} axisFrom={13} axisTo={21} x0={30} x1={410} y={66} />
  </svg>
);

// 3. ábra: a 12 szám rendezve, a kihagyás hatása (2. feladat)
export const StatisticsPracticeTwelveNumbersSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const sorted = [1, 2, 4, 5, 5, 5, 6, 6, 6, 7, 10, 11];
  const after = [1, 2, 4, 5, 5, 6, 6, 6, 7, 10, 11];
  const cell = 32;
  const x0 = 18;
  return (
    <svg viewBox="0 0 420 200" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="412" height="192" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="18" y="26" fontSize="12" fontWeight="bold" fill="#0c4a6e">A 12 szám növekvő sorrendben:</text>
      {sorted.map((v, i) => (
        <g key={`s${i}`}>
          <rect x={x0 + i * cell} y="36" width={cell - 4} height="30" rx="6" fill={i === 5 ? '#fee2e2' : '#e0f2fe'} stroke={i === 5 ? '#e11d48' : '#0284c7'} />
          <text x={x0 + i * cell + (cell - 4) / 2} y="56" fontSize="13" textAnchor="middle" fill="#0f172a">{v}</text>
        </g>
      ))}
      <text x={x0 + 5 * cell + 14} y="82" fontSize="10" textAnchor="middle" fill="#e11d48">elhagyjuk</text>
      <text x="18" y="108" fontSize="12" fontWeight="bold" fill="#0c4a6e">Egy 5-ös elhagyása után (11 adat):</text>
      {after.map((v, i) => {
        const role = i === 2 ? 'Q1' : i === 5 ? 'Me' : i === 8 ? 'Q3' : '';
        return (
          <g key={`a${i}`}>
            <rect x={x0 + i * cell} y="118" width={cell - 4} height="30" rx="6" fill={role ? '#fef3c7' : '#f1f5f9'} stroke={role ? '#d97706' : '#94a3b8'} />
            <text x={x0 + i * cell + (cell - 4) / 2} y="138" fontSize="13" textAnchor="middle" fill="#0f172a">{v}</text>
            {role && (
              <text x={x0 + i * cell + (cell - 4) / 2} y="166" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#b45309">{role}</text>
            )}
          </g>
        );
      })}
      <text x="18" y="188" fontSize="10" fill="#475569">11 adatnál: Q1 = 3., Me = 6., Q3 = 9. elem (a medián kimarad a felekből).</text>
    </svg>
  );
};

// 4. ábra: Milák Kristóf 50 m-es részidői (4. feladat)
export const StatisticsPracticeSplitTimesSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const segs = [24.66, 28.22, 28.69, 29.16];
  const mean = 27.6825;
  const base = 230;
  const sy = (v: number) => base - (v - 20) * 18;
  return (
    <svg viewBox="0 0 420 270" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="412" height="262" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="210" y="24" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
        200 m pillangó – az 50 m-es szakaszok ideje (s)
      </text>
      <line x1="50" y1={base} x2="400" y2={base} stroke="#475569" />
      <line x1="50" y1={base} x2="50" y2="40" stroke="#475569" />
      {[20, 22, 24, 26, 28, 30].map((v) => (
        <g key={v}>
          <line x1="46" y1={sy(v)} x2="400" y2={sy(v)} stroke="#e2e8f0" />
          <text x="40" y={sy(v) + 4} fontSize="10" textAnchor="end" fill="#334155">{v}</text>
        </g>
      ))}
      {segs.map((v, i) => (
        <g key={i}>
          <rect x={75 + i * 82} y={sy(v)} width="50" height={base - sy(v)} fill="#38bdf8" stroke="#0284c7" />
          <text x={100 + i * 82} y={sy(v) - 6} fontSize="11" textAnchor="middle" fill="#0c4a6e" fontWeight="bold">
            {String(v).replace('.', ',')}
          </text>
          <text x={100 + i * 82} y={base + 16} fontSize="10" textAnchor="middle" fill="#334155">
            {i + 1}. szakasz
          </text>
        </g>
      ))}
      <line x1="50" y1={sy(mean)} x2="400" y2={sy(mean)} stroke="#e11d48" strokeDasharray="6 4" strokeWidth="2" />
      <text x="396" y={sy(mean) + 14} fontSize="10" textAnchor="end" fill="#e11d48">átlag ≈ 27,68 s</text>
    </svg>
  );
};

// 5. ábra: a házi feladat 9 adatának dobozdiagramja (a hiányzó adat: 20)
export const StatisticsPracticeMissingDataSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 440 190" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="432" height="182" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    <text x="220" y="24" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
      15, 16, 18, 18, 20, 20, 20, 21, 22
    </text>
    <StatisticsPracticeBoxPlot min={15} q1={17} med={20} q3={20.5} max={22} axisFrom={14} axisTo={23} x0={30} x1={410} y={70} />
    <g fontSize="11" fill="#334155">
      <text x="30" y="160">terjedelem: 22 − 15 = 7</text>
      <text x="30" y="176">félterjedelem: 20,5 − 17 = 3,5</text>
      <text x="410" y="168" textAnchor="end" fill="#be123c">a hiányzó adat: 20</text>
    </g>
  </svg>
);

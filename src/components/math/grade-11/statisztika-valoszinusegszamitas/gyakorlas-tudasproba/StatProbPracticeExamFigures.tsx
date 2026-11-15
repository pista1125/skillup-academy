import React from 'react';
import { PieChart } from '../diagramok/StatChartsFigures';
import { StatisticsPracticeBoxPlot } from '../gyakorlas-statisztika/StatisticsPracticeFigures';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

/** A tudáspróba 1. feladatának osztályzatai (24 tanuló): szögek a kördiagramon. */
export const STAT_PROB_EXAM_GRADES: { grade: number; name: string; deg: number; count: number; color: string }[] = [
  { grade: 5, name: 'jeles', deg: 45, count: 3, color: '#059669' },
  { grade: 4, name: 'jó', deg: 60, count: 4, color: '#0284c7' },
  { grade: 3, name: 'közepes', deg: 135, count: 9, color: '#7c3aed' },
  { grade: 2, name: 'elégséges', deg: 90, count: 6, color: '#d97706' },
  { grade: 1, name: 'elégtelen', deg: 30, count: 2, color: '#e11d48' }
];

/** A gyakorló 4. feladat 19 tömegmérése (g). */
export const STAT_PROB_EXAM_MASSES = [37, 33, 37, 36, 35, 36, 37, 40, 38, 33, 37, 36, 35, 35, 38, 37, 36, 35, 37];

/** Statisztikai jellemzők (a tankönyvi kvartilis-szabállyal: páratlan elemszámnál a mediánt elhagyjuk). */
export const statProbExamStats = (data: number[]) => {
  const a = [...data].sort((x, y) => x - y);
  const n = a.length;
  const med = (v: number[]): number => {
    const m = v.length;
    if (m === 0) return NaN;
    return m % 2 ? v[(m - 1) / 2] : (v[m / 2 - 1] + v[m / 2]) / 2;
  };
  const lower = a.slice(0, Math.floor(n / 2));
  const upper = a.slice(Math.ceil(n / 2));
  const sum = a.reduce((s, x) => s + x, 0);
  const mean = n > 0 ? sum / n : NaN;
  const sd = n > 0 ? Math.sqrt(a.reduce((s, x) => s + (x - mean) ** 2, 0) / n) : NaN;
  const freq = new Map<number, number>();
  a.forEach((x) => freq.set(x, (freq.get(x) ?? 0) + 1));
  const maxF = Math.max(0, ...Array.from(freq.values()));
  const modes = Array.from(freq.entries())
    .filter(([, f]) => f === maxF)
    .map(([v]) => v);
  return {
    sorted: a,
    n,
    sum,
    mean,
    median: med(a),
    q1: n >= 2 ? med(lower) : med(a),
    q3: n >= 2 ? med(upper) : med(a),
    min: a[0],
    max: a[n - 1],
    sd,
    modes,
    freq
  };
};

export const spFmt = (x: number, d = 2): string => (Number.isFinite(x) ? x.toLocaleString('hu-HU', { maximumFractionDigits: d }) : '–');

// 1. ábra: a fejezet áttekintő térképe
export const StatProbExamChapterMapSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const stat = ['1. Adatrendezés, átlag, medián, módusz', '2. Diagramok', '3. A dobozdiagram', '4. Az adatsokaság szórása', '5. Számológéppel', '6. Gyakorlás'];
  const prob = [
    '7–8. Valószínűség – ismétlés, gyakorlás',
    '9. Várható érték',
    '10. Két vagy több elemet egyszerre',
    '11. Visszatevés nélküli mintavétel',
    '12. Ugyanazt többször',
    '13. Visszatevéses mintavétel',
    '14–15. Gyakorlás; Visszatevéssel vagy anélkül?'
  ];
  return (
    <svg viewBox="0 0 600 330" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="592" height="322" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="300" y="28" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
        V. fejezet – Statisztika és valószínűségszámítás
      </text>
      <rect x="18" y="44" width="270" height="270" rx="12" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
      <text x="153" y="66" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
        Statisztika
      </text>
      {stat.map((s, i) => (
        <g key={s}>
          <rect x="30" y={78 + i * 38} width="246" height="30" rx="7" fill="#ffffff" stroke="#7dd3fc" />
          <text x="40" y={97 + i * 38} fontSize="11" fill="#0f172a">
            {s}
          </text>
        </g>
      ))}
      <rect x="306" y="44" width="276" height="270" rx="12" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
      <text x="444" y="66" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#78350f">
        Valószínűségszámítás
      </text>
      {prob.map((s, i) => (
        <g key={s}>
          <rect x="316" y={76 + i * 33} width="256" height="27" rx="7" fill="#ffffff" stroke="#fcd34d" />
          <text x="324" y={93 + i * 33} fontSize="10.5" fill="#0f172a">
            {s}
          </text>
        </g>
      ))}
    </svg>
  );
};

// 2. ábra: a 12. B osztály témazárója – kördiagram (tudáspróba 1.)
export const StatProbExamGradesPieSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <div className={className}>
    <PieChart
      values={STAT_PROB_EXAM_GRADES.map((g) => g.deg)}
      labels={STAT_PROB_EXAM_GRADES.map((g) => `${g.name} ${g.deg}°`)}
      colors={STAT_PROB_EXAM_GRADES.map((g) => g.color)}
      showPercent={false}
      startDeg={90}
      size={260}
      className="w-full max-w-[360px] h-auto mx-auto"
    />
  </div>
);

// 3. ábra: a tömegmérés dobozdiagramja (gyakorló 4. d)
export const StatProbExamMassBoxPlotSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const s = statProbExamStats(STAT_PROB_EXAM_MASSES);
  return (
    <svg viewBox="0 0 560 200" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="552" height="192" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="280" y="26" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
        19 tömegmérés (g): min 33, Q1 = 35, Me = 36, Q3 = 37, max 40
      </text>
      <StatisticsPracticeBoxPlot min={s.min} q1={s.q1} med={s.median} q3={s.q3} max={s.max} axisFrom={32} axisTo={41} x0={40} x1={520} y={90} />
      <text x="280" y="184" fontSize="10.5" textAnchor="middle" fill="#475569">
        átlag ≈ 36,2 g (grammra kerekítve 36 g), módusz 37 g
      </text>
    </svg>
  );
};

// 4. ábra: gyakorisági táblázatból dobozdiagram (tudáspróba 2.)
export const StatProbExamFrequencyBoxPlotSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const values = [14, 15, 16, 17, 18, 19, 20];
  const freq = [1, 2, 3, 3, 2, 1, 1];
  const data = values.flatMap((v, i) => Array.from({ length: freq[i] }, () => v));
  const s = statProbExamStats(data);
  return (
    <svg viewBox="0 0 560 260" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="552" height="252" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      {values.map((v, i) => (
        <g key={v}>
          <rect x={110 + i * 60} y="16" width="60" height="26" fill="#e0f2fe" stroke="#0284c7" />
          <text x={140 + i * 60} y="34" fontSize="12" textAnchor="middle" fill="#0c4a6e" fontWeight="bold">
            {v}
          </text>
          <rect x={110 + i * 60} y="42" width="60" height="26" fill="#ffffff" stroke="#0284c7" />
          <text x={140 + i * 60} y="60" fontSize="12" textAnchor="middle" fill="#0f172a">
            {freq[i]}
          </text>
        </g>
      ))}
      <text x="100" y="34" fontSize="11" textAnchor="end" fill="#334155">
        adat
      </text>
      <text x="100" y="60" fontSize="11" textAnchor="end" fill="#334155">
        gyakoriság
      </text>
      <StatisticsPracticeBoxPlot min={s.min} q1={s.q1} med={s.median} q3={s.q3} max={s.max} axisFrom={13} axisTo={21} x0={40} x1={520} y={130} />
      <text x="280" y="246" fontSize="10.5" textAnchor="middle" fill="#475569">
        13 adat: min 14, Q1 = 15,5, Me = 17, Q3 = 18, max 20
      </text>
    </svg>
  );
};

// 5. ábra: Venn-diagram – A gyűrűk ura és az Alkonyat olvasói (gyakorló 6.)
export const StatProbExamVennSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 520 260" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="512" height="252" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    <rect x="24" y="34" width="472" height="200" rx="10" fill="#ffffff" stroke="#334155" />
    <text x="36" y="54" fontSize="12" fontWeight="bold" fill="#334155">
      osztály: 36 fő
    </text>
    <circle cx="170" cy="140" r="72" fill="#bae6fd" fillOpacity="0.7" stroke="#0284c7" strokeWidth="2" />
    <circle cx="350" cy="140" r="64" fill="#fde68a" fillOpacity="0.7" stroke="#d97706" strokeWidth="2" />
    <text x="170" y="122" fontSize="12" textAnchor="middle" fill="#0c4a6e" fontWeight="bold">
      A gyűrűk ura
    </text>
    <text x="170" y="152" fontSize="22" textAnchor="middle" fill="#0c4a6e" fontWeight="bold">
      12
    </text>
    <text x="350" y="122" fontSize="12" textAnchor="middle" fill="#78350f" fontWeight="bold">
      Alkonyat
    </text>
    <text x="350" y="152" fontSize="22" textAnchor="middle" fill="#78350f" fontWeight="bold">
      10
    </text>
    <text x="460" y="222" fontSize="13" textAnchor="end" fill="#334155">
      egyiket sem: 14
    </text>
    <text x="260" y="26" fontSize="12" textAnchor="middle" fill="#475569">
      nincs olyan diák, aki mindkettőt olvasta
    </text>
  </svg>
);

// 6. ábra: a részvény jövő évi árfolyama (gyakorló 5.)
export const StatProbExamStockSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const rows = [
    { p: '0,2', t: 'nem változik', v: '3200 Ft', y: 60, c: '#64748b' },
    { p: '0,4', t: '+15%', v: '3680 Ft', y: 130, c: '#059669' },
    { p: '0,4', t: '−10%', v: '2880 Ft', y: 200, c: '#e11d48' }
  ];
  return (
    <svg viewBox="0 0 560 260" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="552" height="252" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      <rect x="24" y="108" width="110" height="44" rx="10" fill="#e0f2fe" stroke="#0284c7" />
      <text x="79" y="128" fontSize="11" textAnchor="middle" fill="#0c4a6e">
        ma
      </text>
      <text x="79" y="144" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#0c4a6e">
        3200 Ft
      </text>
      {rows.map((r) => (
        <g key={r.t}>
          <line x1="134" y1="130" x2="300" y2={r.y} stroke={r.c} strokeWidth="2" />
          <text x="210" y={(130 + r.y) / 2 - 6} fontSize="12" fontWeight="bold" textAnchor="middle" fill={r.c}>
            {r.p}
          </text>
          <rect x="300" y={r.y - 22} width="230" height="44" rx="10" fill="#ffffff" stroke={r.c} />
          <text x="415" y={r.y - 4} fontSize="11" textAnchor="middle" fill="#334155">
            {r.t}
          </text>
          <text x="415" y={r.y + 13} fontSize="13" fontWeight="bold" textAnchor="middle" fill={r.c}>
            {r.v}
          </text>
        </g>
      ))}
      <text x="280" y="246" fontSize="11" textAnchor="middle" fill="#0c4a6e" fontWeight="bold">
        E = 0,2 · 3200 + 0,4 · 3680 + 0,4 · 2880 = ?
      </text>
    </svg>
  );
};

/** Kocka-lap pöttyökkel (segéd). */
const DieFace: React.FC<{ x: number; y: number; s: number; v: number }> = ({ x, y, s, v }) => {
  const pos: Record<number, [number, number][]> = {
    1: [[0.5, 0.5]],
    3: [
      [0.25, 0.25],
      [0.5, 0.5],
      [0.75, 0.75]
    ],
    6: [
      [0.27, 0.22],
      [0.27, 0.5],
      [0.27, 0.78],
      [0.73, 0.22],
      [0.73, 0.5],
      [0.73, 0.78]
    ]
  };
  return (
    <g>
      <rect x={x} y={y} width={s} height={s} rx={s * 0.16} fill="#ffffff" stroke="#334155" strokeWidth="1.8" />
      {(pos[v] ?? []).map(([px, py], i) => (
        <circle key={i} cx={x + px * s} cy={y + py * s} r={s * 0.08} fill="#0f172a" />
      ))}
    </g>
  );
};

// 7. ábra: a különleges dobókocka (tudáspróba 3.)
export const StatProbExamSpecialDieSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const faces = [1, 1, 1, 3, 3, 6];
  return (
    <svg viewBox="0 0 560 190" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="552" height="182" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="280" y="28" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
        A kocka hat lapja: 3 lapon 1 pont, 2 lapon 3 pont, 1 lapon 6 pont
      </text>
      {faces.map((v, i) => (
        <DieFace key={i} x={46 + i * 82} y={48} s={64} v={v} />
      ))}
      <text x="280" y="152" fontSize="12" textAnchor="middle" fill="#334155">
        P(1) = 3/6, P(3) = 2/6, P(6) = 1/6
      </text>
      <text x="280" y="172" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#0c4a6e">
        E = 1 · 3/6 + 3 · 2/6 + 6 · 1/6 = ?
      </text>
    </svg>
  );
};

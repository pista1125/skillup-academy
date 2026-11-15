import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

const INK = '#0f172a';
const MUTED = '#475569';

const C = (n: number, k: number): number => {
  let r = 1;
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i;
  return Math.round(r);
};
const hu = (x: number, d = 3): string => (Math.round(x * Math.pow(10, d)) / Math.pow(10, d)).toString().replace('.', ',');

// 1. ábra: legfeljebb 2 és legalább 2 – öt kísérlet lehetséges sikerszámai
export const ProbabilityPracticeAtLeastAtMostSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const xs = [0, 1, 2, 3, 4, 5].map((k) => 130 + k * 70);
  const Row: React.FC<{ y: number; sel: (k: number) => boolean; color: string; fill: string; label: string; formula: string }> = ({ y, sel, color, fill, label, formula }) => (
    <g>
      <text x="20" y={y + 5} fontSize="12" fontWeight="bold" fill={color}>
        {label}
      </text>
      {xs.map((x, k) => (
        <g key={k}>
          <rect x={x - 22} y={y - 18} width="44" height="36" rx="8" fill={sel(k) ? fill : '#ffffff'} stroke={sel(k) ? color : '#cbd5e1'} strokeWidth={sel(k) ? 2 : 1} />
          <text x={x} y={y + 6} fontSize="16" fontWeight="bold" textAnchor="middle" fill={sel(k) ? color : '#94a3b8'}>
            {k}
          </text>
        </g>
      ))}
      <text x="300" y={y + 38} fontSize="12.5" textAnchor="middle" fill={INK} fontFamily="monospace">
        {formula}
      </text>
    </g>
  );
  return (
    <svg viewBox="0 0 600 290" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="590" height="280" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="300" y="30" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
        5 kísérletben az esemény bekövetkezéseinek száma: 0, 1, 2, 3, 4 vagy 5
      </text>
      <Row y={75} sel={(k) => k <= 2} color="#0369a1" fill="#e0f2fe" label="legfeljebb 2" formula="P(legfeljebb 2) = P(0) + P(1) + P(2)" />
      <Row y={170} sel={(k) => k >= 2} color="#047857" fill="#d1fae5" label="legalább 2" formula="P(legalább 2) = 1 − [P(0) + P(1)]" />
      <rect x={xs[2] - 28} y="50" width="56" height="148" rx="10" fill="none" stroke="#d97706" strokeWidth="2" strokeDasharray="6 4" />
      <text x="300" y="262" fontSize="12" textAnchor="middle" fill="#b45309">
        A „pontosan 2” mindkettőben benne van – a két esemény NEM egymás komplementere.
      </text>
    </svg>
  );
};

// 2. ábra: a mérési eredmények dobozdiagramja (2. feladat) – a kvartilisek szerinti valószínűségek
export const ProbabilityPracticeBoxPlotSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const sx = (v: number) => 60 + (v - 12) * 80;
  const q1 = 14.5;
  const q3 = 15.9;
  return (
    <svg viewBox="0 0 600 250" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="590" height="240" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="300" y="30" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
        Egy újabb mérési eredmény valószínűsége a kvartilisek alapján
      </text>
      <rect x={sx(12)} y="55" width={sx(q1) - sx(12)} height="16" fill="#fde68a" opacity="0.7" />
      <rect x={sx(q1)} y="55" width={sx(q3) - sx(q1)} height="16" fill="#bae6fd" opacity="0.9" />
      <rect x={sx(q3)} y="55" width={sx(18) - sx(q3)} height="16" fill="#fecdd3" opacity="0.8" />
      <text x={(sx(12) + sx(q1)) / 2} y="67" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#92400e">
        0,25
      </text>
      <text x={(sx(q1) + sx(q3)) / 2} y="67" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#075985">
        0,5
      </text>
      <text x={(sx(q3) + sx(18)) / 2} y="67" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#9f1239">
        0,25
      </text>
      <line x1={sx(12.6)} y1="120" x2={sx(q1)} y2="120" stroke={INK} strokeWidth="2" strokeDasharray="5 4" />
      <line x1={sx(q3)} y1="120" x2={sx(17.4)} y2="120" stroke={INK} strokeWidth="2" strokeDasharray="5 4" />
      <rect x={sx(q1)} y="95" width={sx(q3) - sx(q1)} height="50" fill="#e0f2fe" stroke="#0369a1" strokeWidth="2" />
      <text x={sx(q1)} y="90" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#0369a1">
        Q₁ = 14,5
      </text>
      <text x={sx(q3)} y="90" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#0369a1">
        Q₃ = 15,9
      </text>
      <line x1="50" y1="180" x2="550" y2="180" stroke={INK} strokeWidth="1.5" />
      {[12, 13, 14, 15, 16, 17, 18].map((v) => (
        <g key={v}>
          <line x1={sx(v)} y1="176" x2={sx(v)} y2="184" stroke={INK} />
          <text x={sx(v)} y="199" fontSize="12" textAnchor="middle" fill={INK}>
            {v}
          </text>
        </g>
      ))}
      <text x="300" y="228" fontSize="11.5" textAnchor="middle" fill={MUTED}>
        P(x ≤ 14,5) = 0,25;  P(14,5 &lt; x ≤ 15,9) = 0,5;  P(x &gt; 15,9) = 0,25 (a bajuszok végei itt nem számítanak)
      </text>
    </svg>
  );
};

const TOAST = Array.from({ length: 11 }, (_, k) => C(10, k) * Math.pow(0.62, k) * Math.pow(0.38, 10 - k));

// 3. ábra: 10 vajas pirítós – hány esik a vajas felére (p = 0,62)?
export const ProbabilityPracticeToastSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const left = 60;
  const right = 570;
  const base = 220;
  const top = 55;
  const yMax = 0.3;
  const bw = (right - left) / 11;
  const y = (v: number) => base - (v / yMax) * (base - top);
  return (
    <svg viewBox="0 0 600 290" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="590" height="280" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="300" y="30" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
        10 leeső vajas pirítós: hány esik a vajas felére? (p = 0,62)
      </text>
      {[0, 0.1, 0.2, 0.3].map((t) => (
        <g key={t}>
          <line x1={left} y1={y(t)} x2={right} y2={y(t)} stroke="#e2e8f0" />
          <text x={left - 6} y={y(t) + 4} fontSize="10" textAnchor="end" fill={MUTED}>
            {hu(t, 1)}
          </text>
        </g>
      ))}
      <line x1={left} y1={base} x2={right} y2={base} stroke="#334155" strokeWidth="1.5" />
      {TOAST.map((v, k) => {
        const x = left + k * bw;
        const fill = k === 7 ? '#d97706' : k > 7 ? '#059669' : '#0284c7';
        return (
          <g key={k}>
            <rect x={x + bw * 0.16} y={y(v)} width={bw * 0.68} height={base - y(v)} rx="3" fill={fill} />
            <text x={x + bw / 2} y={y(v) - 5} fontSize="9" textAnchor="middle" fill={INK}>
              {hu(v, 3)}
            </text>
            <text x={x + bw / 2} y={base + 15} fontSize="11" textAnchor="middle" fill={INK}>
              {k}
            </text>
          </g>
        );
      })}
      <text x="300" y={base + 33} fontSize="11" textAnchor="middle" fill={MUTED}>
        a vajas felére eső szeletek száma
      </text>
      <text x="300" y={base + 52} fontSize="11.5" textAnchor="middle" fill={INK}>
        <tspan fill="#d97706" fontWeight="bold">pontosan 7: ≈ 0,232</tspan>
        <tspan dx="14" fill="#059669" fontWeight="bold">
          7-nél több: ≈ 0,202
        </tspan>
        <tspan dx="14" fill="#0284c7" fontWeight="bold">
          legfeljebb 7: ≈ 0,798
        </tspan>
      </text>
    </svg>
  );
};

// 4. ábra: legalább egy vírushordozó a buszon – 1 − 0,98ⁿ
export const ProbabilityPracticeVirusSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const sx = (n: number) => 70 + n * 8;
  const sy = (p: number) => 230 - p * 180;
  const pts = Array.from({ length: 61 }, (_, n) => `${sx(n)},${sy(1 - Math.pow(0.98, n))}`).join(' ');
  const marks = [10, 20, 30];
  return (
    <svg viewBox="0 0 600 280" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="590" height="270" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="300" y="28" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
        Van-e vírushordozó a buszon? (egy ember: 2%)
      </text>
      {[0, 0.25, 0.5, 0.75, 1].map((t) => (
        <g key={t}>
          <line x1={sx(0)} y1={sy(t)} x2={sx(60)} y2={sy(t)} stroke="#e2e8f0" />
          <text x={sx(0) - 6} y={sy(t) + 4} fontSize="10" textAnchor="end" fill={MUTED}>
            {hu(t, 2)}
          </text>
        </g>
      ))}
      {[0, 10, 20, 30, 40, 50, 60].map((n) => (
        <text key={n} x={sx(n)} y="248" fontSize="10" textAnchor="middle" fill={MUTED}>
          {n}
        </text>
      ))}
      <line x1={sx(0)} y1={sy(0)} x2={sx(60)} y2={sy(0)} stroke="#334155" strokeWidth="1.5" />
      <line x1={sx(0)} y1={sy(0)} x2={sx(0)} y2={sy(1)} stroke="#334155" strokeWidth="1.5" />
      <polyline points={pts} fill="none" stroke="#e11d48" strokeWidth="2.5" />
      {marks.map((n) => {
        const p = 1 - Math.pow(0.98, n);
        return (
          <g key={n}>
            <line x1={sx(n)} y1={sy(0)} x2={sx(n)} y2={sy(p)} stroke="#be123c" strokeDasharray="4 3" />
            <circle cx={sx(n)} cy={sy(p)} r="4.5" fill="#be123c" />
            <text x={sx(n) + 6} y={sy(p) - 8} fontSize="11" fontWeight="bold" fill="#9f1239">
              {n} fő: {hu(p, 3)}
            </text>
          </g>
        );
      })}
      <text x={sx(30)} y="266" fontSize="11" textAnchor="middle" fill={MUTED}>
        utasok száma (n)
      </text>
      <text x={sx(60) - 4} y={sy(0.12)} fontSize="12" textAnchor="end" fill="#be123c" fontFamily="monospace">
        P = 1 − 0,98
        <tspan dy="-6" fontSize="9">
          n
        </tspan>
      </text>
    </svg>
  );
};

// 5. ábra: Judit bolygósorrendje (érettségi, 2020)
export const ProbabilityPracticePlanetsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const slots: { label: string; kind: 'sure' | 'two' | 'four' }[] = [
    { label: 'Merkúr / Vénusz', kind: 'two' },
    { label: 'Vénusz / Merkúr', kind: 'two' },
    { label: 'Föld', kind: 'sure' },
    { label: '?', kind: 'four' },
    { label: '?', kind: 'four' },
    { label: '?', kind: 'four' },
    { label: '?', kind: 'four' },
    { label: 'Neptunusz', kind: 'sure' }
  ];
  const colors = { sure: ['#d1fae5', '#047857'], two: ['#fef3c7', '#b45309'], four: ['#e0f2fe', '#0369a1'] } as const;
  return (
    <svg viewBox="0 0 600 240" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="590" height="230" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="300" y="28" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
        Judit bolygósorrendje (érettségi feladat, 2020)
      </text>
      {slots.map((s, i) => {
        const x = 25 + i * 70;
        const [f, st] = colors[s.kind];
        return (
          <g key={i}>
            <rect x={x} y="55" width="64" height="56" rx="8" fill={f} stroke={st} strokeWidth="1.8" />
            <text x={x + 32} y="50" fontSize="11" textAnchor="middle" fill={MUTED}>
              {i + 1}.
            </text>
            <text x={x + 32} y="88" fontSize={s.label.length > 8 ? 8.5 : 12} fontWeight="bold" textAnchor="middle" fill={st}>
              {s.label}
            </text>
          </g>
        );
      })}
      <text x={25 + 67} y="135" fontSize="12" textAnchor="middle" fill="#b45309" fontWeight="bold">
        tipp: 1/2
      </text>
      <text x={25 + 4 * 70 + 67} y="135" fontSize="12" textAnchor="middle" fill="#0369a1" fontWeight="bold">
        Mars, Jupiter, Szaturnusz, Uránusz: 1/4! = 1/24
      </text>
      <text x={25 + 2 * 70 + 32} y="135" fontSize="12" textAnchor="middle" fill="#047857" fontWeight="bold">
        biztos
      </text>
      <text x={25 + 7 * 70 + 32} y="135" fontSize="12" textAnchor="middle" fill="#047857" fontWeight="bold">
        biztos
      </text>
      <text x="300" y="175" fontSize="15" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
        P(helyes sorrend) = 1/2 · 1/24 = 1/48 ≈ 0,0208
      </text>
      <text x="300" y="205" fontSize="11.5" textAnchor="middle" fill={MUTED}>
        b) 8 cédulából kétszer húzunk: visszatevéssel 1 − (7/8)² = 15/64 ≈ 0,234, visszatevés nélkül 1 − 7/8 · 6/7 = 1/4
      </text>
    </svg>
  );
};

// 6. ábra: melyik modellt használjuk? – összefoglaló döntési térkép
export const ProbabilityPracticeModelMapSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const boxes = [
    { x: 20, title: 'Egyenlően valószínű esetek', lines: ['P = kedvező / összes', 'pl. kocka, érme, sorsolás'], color: '#7c3aed', fill: '#ede9fe' },
    { x: 215, title: 'Visszatevés nélkül / egyszerre', lines: ['P = (K alatt k)(N−K alatt n−k)', '/ (N alatt n)'], color: '#be123c', fill: '#ffe4e6' },
    { x: 410, title: 'Visszatevéssel / ismétlés', lines: ['P = (n alatt k) · pᵏ · (1 − p)ⁿ⁻ᵏ', 'binomiális eloszlás'], color: '#047857', fill: '#d1fae5' }
  ];
  return (
    <svg viewBox="0 0 600 260" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="ppArrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#0369a1" />
        </marker>
      </defs>
      <rect x="5" y="5" width="590" height="250" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <rect x="200" y="20" width="200" height="40" rx="10" fill="#e0f2fe" stroke="#0369a1" strokeWidth="2" />
      <text x="300" y="45" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
        Milyen a kísérlet?
      </text>
      {boxes.map((b) => (
        <g key={b.x}>
          <path d={`M 300 60 L ${b.x + 85} 95`} stroke="#0369a1" strokeWidth="1.6" markerEnd="url(#ppArrow)" />
          <rect x={b.x} y="100" width="170" height="95" rx="12" fill={b.fill} stroke={b.color} strokeWidth="2" />
          <text x={b.x + 85} y="122" fontSize="11.5" fontWeight="bold" textAnchor="middle" fill={b.color}>
            {b.title}
          </text>
          {b.lines.map((l, i) => (
            <text key={i} x={b.x + 85} y={148 + i * 18} fontSize="10.5" textAnchor="middle" fill={INK} fontFamily="monospace">
              {l}
            </text>
          ))}
        </g>
      ))}
      <text x="300" y="222" fontSize="11.5" textAnchor="middle" fill={MUTED}>
        „legalább / legfeljebb”: összeadjuk a pontos esetek valószínűségét, vagy a komplementerrel számolunk.
      </text>
      <text x="300" y="242" fontSize="11.5" textAnchor="middle" fill={MUTED}>
        Várható érték: E = x₁ · p₁ + x₂ · p₂ + … + xₙ · pₙ
      </text>
    </svg>
  );
};

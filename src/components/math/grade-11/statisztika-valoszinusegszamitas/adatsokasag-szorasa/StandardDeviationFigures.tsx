import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

/** Kis oszlopdiagram (0–12 pont, gyakoriság 0–10) egy osztály eredményeihez. */
const MiniHistogram: React.FC<{ x: number; y: number; freq: Record<number, number>; title: string; sigma: string; color: string }> = ({
  x,
  y,
  freq,
  title,
  sigma,
  color
}) => {
  const w = 170;
  const h = 120;
  const bw = w / 13;
  const maxF = 10;
  return (
    <g>
      <text x={x + w / 2} y={y - 8} fontSize="12" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        {title}
      </text>
      {[0, 2, 4, 6, 8, 10].map((f) => (
        <g key={f}>
          <line x1={x} y1={y + h - (f / maxF) * h} x2={x + w} y2={y + h - (f / maxF) * h} stroke="#e2e8f0" />
          <text x={x - 4} y={y + h - (f / maxF) * h + 3} fontSize="8" textAnchor="end" fill="#64748b">
            {f}
          </text>
        </g>
      ))}
      {Array.from({ length: 13 }, (_, k) => k).map((k) => {
        const f = freq[k] ?? 0;
        return (
          <g key={k}>
            {f > 0 && <rect x={x + k * bw + 1} y={y + h - (f / maxF) * h} width={bw - 2} height={(f / maxF) * h} fill={color} rx="1.5" />}
            <text x={x + k * bw + bw / 2} y={y + h + 11} fontSize="8" textAnchor="middle" fill="#334155">
              {k}
            </text>
          </g>
        );
      })}
      <line x1={x} y1={y + h} x2={x + w} y2={y + h} stroke="#475569" />
      <line x1={x + 7 * bw + bw / 2} y1={y - 2} x2={x + 7 * bw + bw / 2} y2={y + h} stroke="#be123c" strokeWidth="2" strokeDasharray="4 3" />
      <text x={x + w / 2} y={y + h + 30} fontSize="12" textAnchor="middle" fontWeight="bold" fill="#0369a1">
        {sigma}
      </text>
    </g>
  );
};

// 1. ábra: három osztály – azonos átlag (7), különböző szóródás
export const StandardDeviationClassesSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 600 230" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="590" height="220" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <MiniHistogram x={30} y={40} freq={{ 6: 5, 7: 10, 8: 5 }} title="1. osztály" sigma="σ ≈ 0,71" color="#38bdf8" />
    <MiniHistogram x={220} y={40} freq={{ 3: 2, 4: 2, 5: 2, 6: 2, 7: 4, 8: 2, 9: 2, 10: 2, 11: 2 }} title="2. osztály" sigma="σ ≈ 2,45" color="#a78bfa" />
    <MiniHistogram x={410} y={40} freq={{ 3: 6, 4: 4, 10: 4, 11: 6 }} title="3. osztály" sigma="σ ≈ 3,63" color="#f59e0b" />
    <text x="300" y="20" fontSize="11" textAnchor="middle" fill="#475569">
      20–20 tanuló, pontszám 0–12; mindhárom osztály átlaga 7 (piros szaggatott vonal)
    </text>
  </svg>
);

// 2. ábra: a szórás kiszámításának lépései
export const StandardDeviationStepsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const steps = [
    ['1. az adatok átlaga', 'x̄ = (x₁ + … + xₙ) / n'],
    ['2. eltérések az átlagtól', 'xᵢ − x̄'],
    ['3. az eltérések négyzete', '(xᵢ − x̄)²'],
    ['4. a négyzetek átlaga', 'σ² = Σ(xᵢ − x̄)² / n'],
    ['5. négyzetgyököt vonunk', 'σ = √σ²']
  ];
  return (
    <svg viewBox="0 0 560 300" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="290" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      {steps.map(([a, b], i) => (
        <g key={a}>
          <rect x={30 + i * 22} y={20 + i * 54} width="380" height="42" rx="10" fill={i === 4 ? '#e0f2fe' : '#ffffff'} stroke="#0284c7" strokeWidth="1.6" />
          <text x={45 + i * 22} y={46 + i * 54} fontSize="13" fontWeight="bold" fill="#075985">
            {a}
          </text>
          <text x={395 + i * 22} y={46 + i * 54} fontSize="13" textAnchor="end" fontFamily="monospace" fill="#0f172a">
            {b}
          </text>
          {i < 4 && (
            <path d={`M ${70 + i * 22} ${62 + i * 54} L ${70 + i * 22} ${74 + i * 54}`} stroke="#475569" strokeWidth="2" />
          )}
        </g>
      ))}
    </svg>
  );
};

// 3. ábra: a kidolgozott feladat táblázata
export const StandardDeviationTableSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const rows: [string, string[]][] = [
    ['adat (xᵢ)', ['33', '45', '46', '48']],
    ['gyakoriság', ['2', '6', '1', '1']],
    ['xᵢ − 43', ['−10', '2', '3', '5']],
    ['(xᵢ − 43)²', ['100', '4', '9', '25']]
  ];
  return (
    <svg viewBox="0 0 560 260" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="250" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="28" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        33, 33, 45, 45, 45, 45, 45, 45, 46, 48  →  átlag: 430 / 10 = 43
      </text>
      {rows.map(([h, cells], r) => (
        <g key={h}>
          <rect x="40" y={44 + r * 34} width="150" height="34" fill={r % 2 ? '#f1f5f9' : '#e0f2fe'} stroke="#94a3b8" />
          <text x="115" y={66 + r * 34} fontSize="13" textAnchor="middle" fontWeight="bold" fill="#075985">
            {h}
          </text>
          {cells.map((c, k) => (
            <g key={k}>
              <rect x={190 + k * 82} y={44 + r * 34} width="82" height="34" fill="#ffffff" stroke="#94a3b8" />
              <text x={231 + k * 82} y={66 + r * 34} fontSize="14" textAnchor="middle" fill={r === 3 ? '#be123c' : '#0f172a'} fontWeight={r === 3 ? 'bold' : 'normal'}>
                {c}
              </text>
            </g>
          ))}
        </g>
      ))}
      <text x="280" y="208" fontSize="14" textAnchor="middle" fontFamily="monospace" fill="#0f172a">
        σ² = (2·100 + 6·4 + 9 + 25) / 10 = 258 / 10 = 25,8
      </text>
      <text x="280" y="236" fontSize="15" textAnchor="middle" fontWeight="bold" fill="#0369a1">
        σ = √25,8 ≈ 5,1
      </text>
    </svg>
  );
};

// 4. ábra: eltérések az átlagtól a számegyenesen (−10; 0; 10; 15; 35)
export const StandardDeviationSpreadSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const data = [-10, 0, 10, 15, 35];
  const mean = 10;
  const sx = (v: number) => 50 + ((v + 15) / 55) * 480;
  return (
    <svg viewBox="0 0 580 250" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="570" height="240" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="290" y="28" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        −10; 0; 10; 15; 35  →  átlag = 50 / 5 = 10, terjedelem = 45
      </text>
      <line x1={sx(mean)} y1="40" x2={sx(mean)} y2="190" stroke="#be123c" strokeWidth="2" strokeDasharray="5 4" />
      <text x={sx(mean)} y="204" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#be123c">
        x̄ = 10
      </text>
      {data.map((d, i) => {
        const y = 52 + i * 26;
        const dev = d - mean;
        return (
          <g key={d}>
            <line x1={sx(mean)} y1={y} x2={sx(d)} y2={y} stroke={dev < 0 ? '#2563eb' : '#059669'} strokeWidth="4" strokeLinecap="round" />
            <circle cx={sx(d)} cy={y} r="6" fill="#0f172a" />
            <text x={dev > 0 ? sx(mean) - 10 : sx(mean) + 10} y={y + 4} fontSize="11" textAnchor={dev > 0 ? 'end' : 'start'} fill="#334155">
              {String(d).replace('-', '−')}: eltérés {dev > 0 ? '+' : ''}
              {String(dev).replace('-', '−')}, négyzete {dev * dev}
            </text>
          </g>
        );
      })}
      <line x1="40" y1="190" x2="540" y2="190" stroke="#475569" strokeWidth="1.5" />
      {[-10, 0, 10, 20, 30, 40].map((v) => (
        <g key={v}>
          <line x1={sx(v)} y1="186" x2={sx(v)} y2="194" stroke="#475569" />
          {v !== 10 && (
            <text x={sx(v)} y="206" fontSize="10" textAnchor="middle" fill="#334155">
              {String(v).replace('-', '−')}
            </text>
          )}
        </g>
      ))}
      <text x="290" y="232" fontSize="13" textAnchor="middle" fontFamily="monospace" fontWeight="bold" fill="#0369a1">
        σ² = (400 + 100 + 0 + 25 + 625) / 5 = 230;  σ = √230 ≈ 15,17
      </text>
    </svg>
  );
};

// 5. ábra: Ráadás – két izzógyár élettartam-eloszlása
export const StandardDeviationBulbsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const L = [800, 820, 850, 880, 910, 980, 990, 1000, 1010, 1030, 1050, 1070, 1100, 1400, 1570];
  const f1 = [5, 10, 8, 12, 24, 75, 130, 190, 333, 120, 70, 14, 8, 0, 1];
  const f2 = [10, 29, 46, 48, 59, 98, 107, 153, 192, 112, 45, 41, 26, 19, 15];
  const sx = (v: number) => 50 + ((v - 780) / 810) * 500;
  const chart = (y0: number, f: number[], color: string, title: string, sigma: string) => (
    <g>
      <text x="60" y={y0 - 92} fontSize="12" fontWeight="bold" fill="#0f172a">
        {title}
      </text>
      <text x="545" y={y0 - 92} fontSize="12" textAnchor="end" fontWeight="bold" fill="#0369a1">
        {sigma}
      </text>
      {L.map((v, i) => (
        <rect key={v} x={sx(v) - 4} y={y0 - (f[i] / 350) * 85} width="8" height={(f[i] / 350) * 85} fill={color} />
      ))}
      <line x1="45" y1={y0} x2="555" y2={y0} stroke="#475569" />
      <line x1={sx(1000)} y1={y0 - 88} x2={sx(1000)} y2={y0} stroke="#be123c" strokeDasharray="4 3" />
    </g>
  );
  return (
    <svg viewBox="0 0 600 290" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="590" height="280" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      {chart(125, f1, '#38bdf8', '1. gyár (1000 izzó)', 'σ ≈ 43,6 óra')}
      {chart(245, f2, '#f59e0b', '2. gyár (1000 izzó)', 'σ ≈ 110,5 óra')}
      {[800, 900, 1000, 1100, 1200, 1300, 1400, 1500].map((v) => (
        <text key={v} x={sx(v)} y="262" fontSize="10" textAnchor="middle" fill="#334155">
          {v}
        </text>
      ))}
      <text x="300" y="278" fontSize="11" textAnchor="middle" fill="#475569">
        élettartam (óra) – átlag mindkét gyárnál ≈ 1000 óra, a szórás nagyon különböző
      </text>
    </svg>
  );
};

// 6. ábra: dobozdiagram és szórás – a két kávékóstoló csoport
export const StandardDeviationCoffeeSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const sx = (v: number) => 60 + ((v - 1) / 9) * 480;
  const box = (y: number, f: [number, number, number, number, number], c: string) => (
    <g>
      <line x1={sx(f[0])} y1={y} x2={sx(f[1])} y2={y} stroke={c} strokeWidth="2" />
      <line x1={sx(f[3])} y1={y} x2={sx(f[4])} y2={y} stroke={c} strokeWidth="2" />
      <line x1={sx(f[0])} y1={y - 10} x2={sx(f[0])} y2={y + 10} stroke={c} strokeWidth="2" />
      <line x1={sx(f[4])} y1={y - 10} x2={sx(f[4])} y2={y + 10} stroke={c} strokeWidth="2" />
      <rect x={sx(f[1])} y={y - 18} width={sx(f[3]) - sx(f[1])} height="36" fill="#e0f2fe" stroke={c} strokeWidth="2" />
      <line x1={sx(f[2])} y1={y - 18} x2={sx(f[2])} y2={y + 18} stroke="#be123c" strokeWidth="3" />
    </g>
  );
  return (
    <svg viewBox="0 0 600 240" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="590" height="230" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="300" y="26" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Kávékóstoló: pontszámok (1–10), mindkét csoport átlaga 6
      </text>
      <text x="20" y="74" fontSize="12" fontWeight="bold" fill="#0369a1">
        1.
      </text>
      {box(70, [3, 5, 6, 6.5, 9], '#0369a1')}
      <text x="560" y="74" fontSize="11" textAnchor="end" fontWeight="bold" fill="#0369a1">
        σ ≈ 1,30
      </text>
      <text x="20" y="144" fontSize="12" fontWeight="bold" fill="#b45309">
        2.
      </text>
      {box(140, [2, 2, 5, 10, 10], '#b45309')}
      <text x="560" y="120" fontSize="11" textAnchor="end" fontWeight="bold" fill="#b45309">
        σ ≈ 3,74
      </text>
      <line x1="50" y1="185" x2="550" y2="185" stroke="#475569" strokeWidth="1.5" />
      {Array.from({ length: 10 }, (_, k) => k + 1).map((v) => (
        <g key={v}>
          <line x1={sx(v)} y1="181" x2={sx(v)} y2="189" stroke="#475569" />
          <text x={sx(v)} y="203" fontSize="11" textAnchor="middle" fill="#334155">
            {v}
          </text>
        </g>
      ))}
      <text x="300" y="226" fontSize="12" textAnchor="middle" fill="#334155">
        Szélesebb doboz, távolabbi adatok → nagyobb szórás.
      </text>
    </svg>
  );
};

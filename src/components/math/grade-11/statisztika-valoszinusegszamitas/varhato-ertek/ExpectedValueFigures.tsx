import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

/** Három kockával dobott összeg eloszlása (216 egyenlően valószínű eset), a várható érték 10,5. */
const THREE_DICE_COUNTS: Record<number, number> = {
  3: 1, 4: 3, 5: 6, 6: 10, 7: 15, 8: 21, 9: 25, 10: 27, 11: 27, 12: 25, 13: 21, 14: 15, 15: 10, 16: 6, 17: 3, 18: 1
};

// 1. ábra: három kocka összegének eloszlása, a várható érték jelölésével
export const ExpectedValueThreeDiceSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const x0 = 50;
  const yBase = 270;
  const bw = 30;
  const scale = 7.4;
  const sx = (s: number) => x0 + (s - 3) * bw + bw / 2;
  const eX = sx(10.5);
  return (
    <svg viewBox="0 0 600 330" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="590" height="320" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="300" y="30" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
        Három kockával dobott összeg – kedvező esetek száma a 216-ból
      </text>
      <line x1={x0 - 6} y1={yBase} x2={x0 + 16 * bw + 6} y2={yBase} stroke="#334155" strokeWidth="1.5" />
      <line x1={x0 - 6} y1={yBase} x2={x0 - 6} y2={60} stroke="#334155" strokeWidth="1.5" />
      {[0, 5, 10, 15, 20, 25].map((v) => (
        <g key={v}>
          <line x1={x0 - 10} y1={yBase - v * scale} x2={x0 - 6} y2={yBase - v * scale} stroke="#334155" />
          <text x={x0 - 13} y={yBase - v * scale + 4} fontSize="10" textAnchor="end" fill="#475569">
            {v}
          </text>
        </g>
      ))}
      {Object.entries(THREE_DICE_COUNTS).map(([s, c]) => {
        const sum = Number(s);
        const h = c * scale;
        const isTop = c === 27;
        return (
          <g key={s}>
            <rect x={sx(sum) - bw / 2 + 3} y={yBase - h} width={bw - 6} height={h} rx="3" fill={isTop ? '#0284c7' : '#7dd3fc'} stroke="#0369a1" strokeWidth="1" />
            <text x={sx(sum)} y={yBase - h - 4} fontSize="9" textAnchor="middle" fill="#0c4a6e">
              {c}
            </text>
            <text x={sx(sum)} y={yBase + 15} fontSize="11" textAnchor="middle" fill="#334155">
              {sum}
            </text>
          </g>
        );
      })}
      <line x1={eX} y1={50} x2={eX} y2={yBase} stroke="#e11d48" strokeWidth="2" strokeDasharray="6 4" />
      <text x={eX + 8} y={62} fontSize="12" fontWeight="bold" fill="#be123c">
        E = 10,5
      </text>
      <text x="300" y="305" fontSize="11" textAnchor="middle" fill="#475569">
        A legvalószínűbb összeg a 10 és a 11 (27/216), a várható érték 10,5 – ezt soha nem dobhatjuk ki.
      </text>
    </svg>
  );
};

// 2. ábra: összetartozó fogalmak a statisztikában és a valószínűségszámításban
export const ExpectedValueConceptsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 600 260" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="evArrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#0369a1" />
      </marker>
      <marker id="evArrowBack" markerWidth="10" markerHeight="10" refX="2" refY="5" orient="auto">
        <path d="M10,0 L0,5 L10,10 z" fill="#0369a1" />
      </marker>
    </defs>
    <rect x="5" y="5" width="590" height="250" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <text x="150" y="40" fontSize="15" fontWeight="bold" textAnchor="middle" fill="#065f46">
      statisztika
    </text>
    <text x="450" y="40" fontSize="15" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
      valószínűségszámítás
    </text>
    <text x="150" y="58" fontSize="10" textAnchor="middle" fill="#475569">
      (elvégzett kísérletek adataiból)
    </text>
    <text x="450" y="58" fontSize="10" textAnchor="middle" fill="#475569">
      (elméleti értékek)
    </text>
    {[
      { l: 'relatív gyakoriság', r: 'valószínűség', y: 80 },
      { l: 'átlag, súlyozott átlag', r: 'várható érték', y: 160 }
    ].map((row) => (
      <g key={row.l}>
        <rect x="40" y={row.y} width="220" height="50" rx="12" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
        <text x="150" y={row.y + 31} fontSize="14" fontWeight="bold" textAnchor="middle" fill="#065f46">
          {row.l}
        </text>
        <rect x="340" y={row.y} width="220" height="50" rx="12" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
        <text x="450" y={row.y + 31} fontSize="14" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
          {row.r}
        </text>
        <line x1="266" y1={row.y + 25} x2="334" y2={row.y + 25} stroke="#0369a1" strokeWidth="2" markerEnd="url(#evArrow)" markerStart="url(#evArrowBack)" />
      </g>
    ))}
    <text x="300" y="242" fontSize="11" textAnchor="middle" fill="#475569">
      Sok kísérlet esetén a bal oldali értékek a jobb oldali értékek közelében ingadoznak.
    </text>
  </svg>
);

// 3. ábra: a várható érték kiszámításának három lépése
export const ExpectedValueStepsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const steps = [
    { n: '1', t1: 'Soroljuk fel', t2: 'táblázatban az összes', t3: 'lehetséges kimenetelt!' },
    { n: '2', t1: 'Minden kimenetelhez', t2: 'határozzuk meg', t3: 'a valószínűségét!' },
    { n: '3', t1: 'Szorozzuk össze', t2: 'a kimenetelt a valószínűséggel,', t3: 'és adjuk össze!' }
  ];
  return (
    <svg viewBox="0 0 600 230" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="evStepArrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#0284c7" />
        </marker>
      </defs>
      <rect x="5" y="5" width="590" height="220" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      {steps.map((s, i) => {
        const x = 20 + i * 195;
        return (
          <g key={s.n}>
            <rect x={x} y="30" width="170" height="120" rx="14" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
            <circle cx={x + 85} cy="30" r="15" fill="#0284c7" />
            <text x={x + 85} y="35" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#ffffff">
              {s.n}
            </text>
            <text x={x + 85} y="80" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
              {s.t1}
            </text>
            <text x={x + 85} y="100" fontSize="11" textAnchor="middle" fill="#0c4a6e">
              {s.t2}
            </text>
            <text x={x + 85} y="120" fontSize="11" textAnchor="middle" fill="#0c4a6e">
              {s.t3}
            </text>
            {i < 2 && <line x1={x + 172} y1="90" x2={x + 192} y2="90" stroke="#0284c7" strokeWidth="2.5" markerEnd="url(#evStepArrow)" />}
          </g>
        );
      })}
      <rect x="60" y="168" width="480" height="40" rx="10" fill="#fff7ed" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="300" y="193" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#92400e">
        E = x₁ · p₁ + x₂ · p₂ + … + xₙ · pₙ,   ellenőrzés: p₁ + p₂ + … + pₙ = 1
      </text>
    </svg>
  );
};

// 4. ábra: a kidolgozott feladat sorsjegyei
export const ExpectedValueLotterySvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const tickets = [
    { prize: '0 Ft', count: '9800 db', p: '0,98', prod: '0', color: '#e2e8f0', stroke: '#64748b' },
    { prize: '500 Ft', count: '180 db', p: '0,018', prod: '9', color: '#e0f2fe', stroke: '#0284c7' },
    { prize: '2000 Ft', count: '19 db', p: '0,0019', prod: '3,8', color: '#dcfce7', stroke: '#16a34a' },
    { prize: '10 000 Ft', count: '1 db', p: '0,0001', prod: '1', color: '#fef3c7', stroke: '#d97706' }
  ];
  return (
    <svg viewBox="0 0 600 280" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="590" height="270" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="300" y="30" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
        10 000 sorsjegy – nyeremény · valószínűség
      </text>
      {tickets.map((t, i) => {
        const x = 25 + i * 142;
        return (
          <g key={t.prize}>
            <rect x={x} y="48" width="125" height="80" rx="10" fill={t.color} stroke={t.stroke} strokeWidth="2" strokeDasharray="5 3" />
            <text x={x + 62} y="80" fontSize="16" fontWeight="bold" textAnchor="middle" fill="#1e293b">
              {t.prize}
            </text>
            <text x={x + 62} y="105" fontSize="12" textAnchor="middle" fill="#475569">
              {t.count}
            </text>
            <text x={x + 62} y="155" fontSize="12" textAnchor="middle" fill="#334155">
              p = {t.p}
            </text>
            <text x={x + 62} y="180" fontSize="12" textAnchor="middle" fill="#0369a1" fontWeight="bold">
              szorzat: {t.prod}
            </text>
          </g>
        );
      })}
      <rect x="70" y="205" width="460" height="50" rx="12" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
      <text x="300" y="236" fontSize="15" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
        E = 0 + 9 + 3,8 + 1 = 13,8 Ft
      </text>
    </svg>
  );
};

/** Kockalap pöttyökkel. */
const Die: React.FC<{ x: number; y: number; n: number; size?: number; fill?: string }> = ({ x, y, n, size = 44, fill = '#ffffff' }) => {
  const s = size;
  const p = (a: number, b: number) => ({ cx: x + a * s, cy: y + b * s });
  const map: Record<number, { cx: number; cy: number }[]> = {
    1: [p(0.5, 0.5)],
    2: [p(0.27, 0.27), p(0.73, 0.73)],
    3: [p(0.27, 0.27), p(0.5, 0.5), p(0.73, 0.73)],
    4: [p(0.27, 0.27), p(0.73, 0.27), p(0.27, 0.73), p(0.73, 0.73)],
    5: [p(0.27, 0.27), p(0.73, 0.27), p(0.5, 0.5), p(0.27, 0.73), p(0.73, 0.73)],
    6: [p(0.27, 0.25), p(0.73, 0.25), p(0.27, 0.5), p(0.73, 0.5), p(0.27, 0.75), p(0.73, 0.75)]
  };
  return (
    <g>
      <rect x={x} y={y} width={s} height={s} rx={s * 0.18} fill={fill} stroke="#334155" strokeWidth="1.5" />
      {map[n].map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r={s * 0.08} fill="#1e293b" />
      ))}
    </g>
  );
};

// 5. ábra: Angéla és Panni játéka – mérleg a két játékos szempontjából
export const ExpectedValueFairGameSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 600 300" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="590" height="290" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <text x="300" y="30" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
      Angéla „nyereménye” egy dobásnál
    </text>
    <Die x={70} y={50} n={5} fill="#ffe4e6" />
    <text x="92" y="118" fontSize="12" textAnchor="middle" fill="#9f1239" fontWeight="bold">
      ötös: −50 Ft
    </text>
    <text x="92" y="136" fontSize="11" textAnchor="middle" fill="#475569">
      p = 1/6
    </text>
    {[1, 2, 3, 4, 6].map((n, i) => (
      <Die key={n} x={250 + i * 54} y={50} n={n} fill="#dcfce7" />
    ))}
    <text x="380" y="118" fontSize="12" textAnchor="middle" fill="#166534" fontWeight="bold">
      nem ötös: +15 Ft
    </text>
    <text x="380" y="136" fontSize="11" textAnchor="middle" fill="#475569">
      p = 5/6
    </text>
    {/* mérleg: a kart enyhén a „nem ötös” oldal felé billentjük */}
    <polygon points="300,250 285,272 315,272" fill="#64748b" />
    <line x1="140" y1="230" x2="460" y2="262" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
    <line x1="300" y1="246" x2="300" y2="250" stroke="#334155" strokeWidth="4" />
    <rect x="95" y="196" width="90" height="30" rx="8" fill="#ffe4e6" stroke="#e11d48" />
    <text x="140" y="216" fontSize="12" textAnchor="middle" fill="#9f1239" fontWeight="bold">
      −50 · 1/6
    </text>
    <rect x="415" y="228" width="90" height="30" rx="8" fill="#dcfce7" stroke="#16a34a" />
    <text x="460" y="248" fontSize="12" textAnchor="middle" fill="#166534" fontWeight="bold">
      15 · 5/6
    </text>
    <text x="300" y="175" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0c4a6e">
      E(Angéla) = −50/6 + 75/6 = 25/6 ≈ 4,17 Ft &gt; 0
    </text>
    <text x="300" y="290" fontSize="11" textAnchor="middle" fill="#475569">
      Méltányos (igazságos) a játék, ha a nyeremény várható értéke 0.
    </text>
  </svg>
);

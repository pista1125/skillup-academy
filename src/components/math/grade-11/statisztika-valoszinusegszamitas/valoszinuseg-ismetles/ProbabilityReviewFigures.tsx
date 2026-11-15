import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

const PIPS: Record<number, [number, number][]> = {
  1: [[0.5, 0.5]],
  2: [[0.27, 0.27], [0.73, 0.73]],
  3: [[0.27, 0.27], [0.5, 0.5], [0.73, 0.73]],
  4: [[0.27, 0.27], [0.73, 0.27], [0.27, 0.73], [0.73, 0.73]],
  5: [[0.27, 0.27], [0.73, 0.27], [0.5, 0.5], [0.27, 0.73], [0.73, 0.73]],
  6: [[0.27, 0.25], [0.73, 0.25], [0.27, 0.5], [0.73, 0.5], [0.27, 0.75], [0.73, 0.75]]
};

/** Dobókocka-lap pöttyökkel (SVG csoport). */
export const ProbabilityReviewDieFace: React.FC<{ x: number; y: number; size: number; value: number; fill?: string; stroke?: string }> = ({
  x,
  y,
  size,
  value,
  fill = '#ffffff',
  stroke = '#0f172a'
}) => (
  <g>
    <rect x={x} y={y} width={size} height={size} rx={size * 0.18} fill={fill} stroke={stroke} strokeWidth="1.5" />
    {(PIPS[value] ?? []).map(([px, py], i) => (
      <circle key={i} cx={x + px * size} cy={y + py * size} r={size * 0.085} fill={stroke} />
    ))}
  </g>
);

const polar = (cx: number, cy: number, r: number, deg: number) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
};

/** Kördiagram darabszámokból (Carlsen játszmái). */
export const ProbabilityReviewCountPie: React.FC<{
  data: { label: string; value: number; color: string }[];
  cx: number;
  cy: number;
  r: number;
  fontSize?: number;
}> = ({ data, cx, cy, r, fontSize = 11 }) => {
  const total = data.reduce((s, d) => s + d.value, 0);
  let acc = 0;
  return (
    <g>
      {data.map((d) => {
        const from = (acc / total) * 360;
        acc += d.value;
        const to = (acc / total) * 360;
        const p1 = polar(cx, cy, r, from);
        const p2 = polar(cx, cy, r, to);
        const large = to - from > 180 ? 1 : 0;
        const ip = polar(cx, cy, r * 0.6, (from + to) / 2);
        return (
          <g key={d.label}>
            <path
              d={`M ${cx} ${cy} L ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${p2.x.toFixed(2)} ${p2.y.toFixed(2)} Z`}
              fill={d.color}
              stroke="#fff"
              strokeWidth="2"
            />
            <text x={ip.x} y={ip.y + 4} fontSize={fontSize} fontWeight="bold" textAnchor="middle" fill="#fff">
              {d.value}
            </text>
          </g>
        );
      })}
    </g>
  );
};

export const PROBABILITY_REVIEW_CARLSEN_WHITE = [
  { label: 'győzelem', value: 384, color: '#16a34a' },
  { label: 'döntetlen', value: 303, color: '#64748b' },
  { label: 'vereség', value: 78, color: '#dc2626' }
];
export const PROBABILITY_REVIEW_CARLSEN_BLACK = [
  { label: 'győzelem', value: 250, color: '#16a34a' },
  { label: 'döntetlen', value: 419, color: '#64748b' },
  { label: 'vereség', value: 65, color: '#dc2626' }
];

// 1. ábra: a bevezető kockás események (szabályos dobókocka)
export const ProbabilityReviewDieEventsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const events: { name: string; fav: number[] }[] = [
    { name: 'osztója 6-nak', fav: [1, 2, 3, 6] },
    { name: 'prímszám', fav: [2, 3, 5] },
    { name: 'négyzetszám', fav: [1, 4] },
    { name: 'faktoriálisa páros', fav: [2, 3, 4, 5, 6] }
  ];
  return (
    <svg viewBox="0 0 440 260" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="432" height="252" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="220" y="26" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
        Kedvező elemi események egy kockadobásnál
      </text>
      {events.map((ev, row) => (
        <g key={ev.name}>
          <text x="16" y={66 + row * 52} fontSize="12" fill="#0f172a">{ev.name}</text>
          {[1, 2, 3, 4, 5, 6].map((v) => (
            <ProbabilityReviewDieFace
              key={v}
              x={150 + (v - 1) * 38}
              y={44 + row * 52}
              size={32}
              value={v}
              fill={ev.fav.includes(v) ? '#bae6fd' : '#ffffff'}
              stroke={ev.fav.includes(v) ? '#0369a1' : '#94a3b8'}
            />
          ))}
          <text x="420" y={66 + row * 52} fontSize="13" fontWeight="bold" textAnchor="end" fill="#0369a1">
            {ev.fav.length}/6
          </text>
        </g>
      ))}
    </svg>
  );
};

// 2. ábra: Carlsen játszmái világossal és sötéttel
export const ProbabilityReviewCarlsenPiesSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 440 260" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="432" height="252" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    <text x="220" y="24" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
      Magnus Carlsen játszmáinak eredménye
    </text>
    <text x="115" y="48" fontSize="12" textAnchor="middle" fill="#334155">világos bábuval (765)</text>
    <text x="325" y="48" fontSize="12" textAnchor="middle" fill="#334155">sötét bábuval (734)</text>
    <ProbabilityReviewCountPie data={PROBABILITY_REVIEW_CARLSEN_WHITE} cx={115} cy={140} r={78} />
    <ProbabilityReviewCountPie data={PROBABILITY_REVIEW_CARLSEN_BLACK} cx={325} cy={140} r={78} />
    <g fontSize="11" fill="#334155">
      <rect x="96" y="232" width="10" height="10" fill="#16a34a" />
      <text x="110" y="241">győzelem</text>
      <rect x="186" y="232" width="10" height="10" fill="#64748b" />
      <text x="200" y="241">döntetlen</text>
      <rect x="276" y="232" width="10" height="10" fill="#dc2626" />
      <text x="290" y="241">vereség</text>
    </g>
  </svg>
);

// 3. ábra: két kocka – a szorzatok 6 × 6-os táblázata
export const ProbabilityReviewProductTableSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const c = 40;
  const x0 = 70;
  const y0 = 50;
  return (
    <svg viewBox="0 0 340 330" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="332" height="322" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="170" y="24" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
        A két dobás szorzata (szürke: nagyobb, mint 10)
      </text>
      <text x="40" y="44" fontSize="16" textAnchor="middle" fill="#0f172a">·</text>
      {[1, 2, 3, 4, 5, 6].map((v) => (
        <g key={`h${v}`}>
          <text x={x0 + (v - 0.5) * c} y={y0 - 6} fontSize="12" fontWeight="bold" textAnchor="middle" fill="#0369a1">{v}</text>
          <text x={x0 - 14} y={y0 + (v - 0.5) * c + 4} fontSize="12" fontWeight="bold" textAnchor="middle" fill="#be123c">{v}</text>
        </g>
      ))}
      {[1, 2, 3, 4, 5, 6].map((a) =>
        [1, 2, 3, 4, 5, 6].map((b) => {
          const p = a * b;
          return (
            <g key={`${a}-${b}`}>
              <rect x={x0 + (b - 1) * c} y={y0 + (a - 1) * c} width={c} height={c} fill={p > 10 ? '#e2e8f0' : '#ffffff'} stroke="#94a3b8" />
              <text x={x0 + (b - 0.5) * c} y={y0 + (a - 0.5) * c + 4} fontSize="12" textAnchor="middle" fill="#0f172a">{p}</text>
            </g>
          );
        })
      )}
      <text x="170" y="316" fontSize="11" textAnchor="middle" fill="#334155">36 egyformán valószínű elemi esemény; 17 szorzat nagyobb 10-nél</text>
    </svg>
  );
};

// 4. ábra: 60 és 56 pozitív osztói Venn-diagramon
export const ProbabilityReviewDivisorsVennSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 440 240" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="432" height="232" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    <circle cx="160" cy="125" r="95" fill="#e0f2fe" fillOpacity="0.75" stroke="#0284c7" strokeWidth="2" />
    <circle cx="285" cy="125" r="85" fill="#fef3c7" fillOpacity="0.6" stroke="#d97706" strokeWidth="2" />
    <text x="90" y="40" fontSize="13" fontWeight="bold" fill="#075985">A = {'{'}60 osztói{'}'}</text>
    <text x="290" y="34" fontSize="13" fontWeight="bold" fill="#92400e">B = {'{'}56 osztói{'}'}</text>
    <g fontSize="13" fill="#0f172a" textAnchor="middle">
      <text x="100" y="90">3</text>
      <text x="135" y="80">5</text>
      <text x="90" y="125">6</text>
      <text x="130" y="120">10</text>
      <text x="100" y="160">12</text>
      <text x="140" y="160">15</text>
      <text x="115" y="195">20</text>
      <text x="160" y="196">30</text>
      <text x="170" y="64">60</text>
      <text x="222" y="100" fontWeight="bold" fill="#be123c">1</text>
      <text x="222" y="130" fontWeight="bold" fill="#be123c">2</text>
      <text x="222" y="160" fontWeight="bold" fill="#be123c">4</text>
      <text x="300" y="85">7</text>
      <text x="335" y="115">8</text>
      <text x="300" y="140">14</text>
      <text x="335" y="165">28</text>
      <text x="295" y="190">56</text>
    </g>
    <text x="220" y="228" fontSize="11" textAnchor="middle" fill="#334155">|A| = 12, |B| = 8, |A ∩ B| = 3, |A ∪ B| = 17</text>
  </svg>
);

// 5. ábra: két fiú és két lány négy széken – a lányok nem ülnek egymás mellett
export const ProbabilityReviewSeatsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const rows = ['LFLF', 'LFFL', 'FLFL', 'LLFF', 'FLLF', 'FFLL'];
  return (
    <svg viewBox="0 0 420 250" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="412" height="242" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="210" y="24" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
        A fiúk (F) és lányok (L) helyének 6 mintázata
      </text>
      {rows.map((r, i) => {
        const ok = !r.includes('LL');
        const y = 40 + i * 33;
        return (
          <g key={r}>
            {r.split('').map((ch, j) => (
              <g key={j}>
                <rect x={60 + j * 50} y={y} width="42" height="26" rx="6" fill={ch === 'L' ? '#fce7f3' : '#dbeafe'} stroke={ch === 'L' ? '#db2777' : '#2563eb'} />
                <text x={81 + j * 50} y={y + 18} fontSize="13" fontWeight="bold" textAnchor="middle" fill="#0f172a">{ch}</text>
              </g>
            ))}
            <text x="280" y={y + 18} fontSize="12" fill={ok ? '#15803d' : '#b91c1c'} fontWeight="bold">
              {ok ? 'jó (nem szomszédok)' : 'a lányok szomszédok'}
            </text>
          </g>
        );
      })}
      <text x="210" y="240" fontSize="11" textAnchor="middle" fill="#334155">mintázatonként 2 · 2 = 4 ültetés ⇒ 12 jó a 24-ből</text>
    </svg>
  );
};

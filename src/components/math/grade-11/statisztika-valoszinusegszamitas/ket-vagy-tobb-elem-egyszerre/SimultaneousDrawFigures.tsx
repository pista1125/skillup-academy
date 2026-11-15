import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

/** Binomiális együttható SVG-ben: a (cx, cy) középpontú, egymás alatti n és k, két ívelt zárójellel. */
export const SvgBinom: React.FC<{ cx: number; cy: number; n: string | number; k: string | number; size?: number; color?: string }> = ({
  cx,
  cy,
  n,
  k,
  size = 14,
  color = '#0c4a6e'
}) => {
  const w = Math.max(String(n).length, String(k).length) * size * 0.32 + size * 0.5;
  const h = size * 1.25;
  return (
    <g>
      <path d={`M ${cx - w} ${cy - h} Q ${cx - w - size * 0.45} ${cy} ${cx - w} ${cy + h}`} fill="none" stroke={color} strokeWidth="1.5" />
      <path d={`M ${cx + w} ${cy - h} Q ${cx + w + size * 0.45} ${cy} ${cx + w} ${cy + h}`} fill="none" stroke={color} strokeWidth="1.5" />
      <text x={cx} y={cy - size * 0.18} fontSize={size} textAnchor="middle" fill={color} fontWeight="bold">
        {n}
      </text>
      <text x={cx} y={cy + size * 0.95} fontSize={size} textAnchor="middle" fill={color} fontWeight="bold">
        {k}
      </text>
    </g>
  );
};

// 1. ábra: ötös lottó – 90 számból 5 nyerő, 85 nem nyerő
export const SimultaneousDrawLottoSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const balls = Array.from({ length: 90 }, (_, i) => i + 1);
  const winning = [7, 23, 41, 58, 86];
  return (
    <svg viewBox="0 0 600 340" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="590" height="330" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="300" y="28" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
        Ötös lottó: 90 szám = 5 nyerő + 85 nem nyerő
      </text>
      {balls.map((b, i) => {
        const col = i % 15;
        const row = Math.floor(i / 15);
        const isWin = winning.includes(b);
        return (
          <g key={b}>
            <circle cx={40 + col * 35} cy={52 + row * 28} r="12" fill={isWin ? '#fde68a' : '#e0f2fe'} stroke={isWin ? '#d97706' : '#0284c7'} strokeWidth="1.3" />
            <text x={40 + col * 35} y={56 + row * 28} fontSize="9" textAnchor="middle" fill="#1e293b">
              {b}
            </text>
          </g>
        );
      })}
      <rect x="25" y="225" width="260" height="95" rx="12" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" />
      <text x="155" y="246" fontSize="12" textAnchor="middle" fill="#0c4a6e" fontWeight="bold">
        összes eset: 90-ből 5
      </text>
      <SvgBinom cx={155} cy={276} n={90} k={5} />
      <rect x="315" y="225" width="260" height="95" rx="12" fill="#ffffff" stroke="#16a34a" strokeWidth="1.5" />
      <text x="445" y="246" fontSize="12" textAnchor="middle" fill="#166534" fontWeight="bold">
        kedvező (0 találat): 85-ből 5
      </text>
      <SvgBinom cx={445} cy={276} n={85} k={5} color="#166534" />
      <text x="300" y="282" fontSize="13" textAnchor="middle" fill="#334155">
        p = ?
      </text>
    </svg>
  );
};

// 2. ábra: az általános modell – n elem két csoportban, k elemet választunk
export const SimultaneousDrawGroupsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 600 300" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="590" height="290" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <rect x="40" y="30" width="520" height="130" rx="18" fill="#ffffff" stroke="#334155" strokeWidth="2" />
    <text x="300" y="52" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#1e293b">
      n elem
    </text>
    <rect x="60" y="65" width="220" height="80" rx="12" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
    <text x="170" y="95" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#92400e">
      egyik csoport
    </text>
    <text x="170" y="120" fontSize="14" textAnchor="middle" fill="#92400e">
      m db
    </text>
    <rect x="320" y="65" width="220" height="80" rx="12" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
    <text x="430" y="95" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
      másik csoport
    </text>
    <text x="430" y="120" fontSize="14" textAnchor="middle" fill="#0c4a6e">
      n − m db
    </text>
    <text x="150" y="190" fontSize="12" textAnchor="middle" fill="#334155">
      összes eset: n-ből k
    </text>
    <SvgBinom cx={150} cy={222} n="n" k="k" />
    <text x="450" y="190" fontSize="12" textAnchor="middle" fill="#92400e">
      kedvező: mind a k az m közül
    </text>
    <SvgBinom cx={450} cy={222} n="m" k="k" color="#92400e" />
    <text x="250" y="266" fontSize="15" fontWeight="bold" textAnchor="end" fill="#0c4a6e">
      p =
    </text>
    <SvgBinom cx={290} cy={250} n="m" k="k" size={11} color="#92400e" />
    <line x1="268" y1="263" x2="312" y2="263" stroke="#0c4a6e" strokeWidth="1.5" />
    <SvgBinom cx={290} cy={276} n="n" k="k" size={11} />
  </svg>
);

// 3. ábra: binomiális együtthatók csoportjai (1. feladat: kösd össze az egyenlőket)
export const SimultaneousDrawBinomialPairsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const groups = [
    { value: '120', color: '#0284c7', fill: '#e0f2fe', items: [{ n: 10, k: 3 }, { n: 10, k: 7 }], extra: '10 · 9 · 8 / 3!' },
    { value: '210', color: '#16a34a', fill: '#dcfce7', items: [{ n: 10, k: 4 }, { n: 10, k: 6 }], extra: '10 · 9 · 8 · 7 / 4!' },
    { value: '45', color: '#d97706', fill: '#fef3c7', items: [{ n: 10, k: 2 }, { n: 10, k: 8 }], extra: '10 · 9 / 2' }
  ];
  return (
    <svg viewBox="0 0 600 300" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="590" height="290" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="300" y="28" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
        Az egyenlő kifejezések csoportjai
      </text>
      {groups.map((g, i) => {
        const x = 20 + i * 190;
        return (
          <g key={g.value}>
            <rect x={x} y="45" width="175" height="175" rx="14" fill={g.fill} stroke={g.color} strokeWidth="2" />
            <SvgBinom cx={x + 50} cy={82} n={g.items[0].n} k={g.items[0].k} color={g.color} />
            <text x={x + 88} y="90" fontSize="16" textAnchor="middle" fill={g.color}>
              =
            </text>
            <SvgBinom cx={x + 126} cy={82} n={g.items[1].n} k={g.items[1].k} color={g.color} />
            <text x={x + 87} y="150" fontSize="13" textAnchor="middle" fill={g.color}>
              = {g.extra}
            </text>
            <text x={x + 87} y="195" fontSize="20" fontWeight="bold" textAnchor="middle" fill={g.color}>
              = {g.value}
            </text>
          </g>
        );
      })}
      <rect x="150" y="235" width="300" height="50" rx="12" fill="#ffe4e6" stroke="#e11d48" strokeWidth="2" />
      <text x="235" y="266" fontSize="13" textAnchor="middle" fill="#9f1239" fontWeight="bold">
        párja nincs:
      </text>
      <SvgBinom cx={310} cy={256} n={10} k={5} color="#9f1239" />
      <text x="385" y="266" fontSize="15" textAnchor="middle" fill="#9f1239" fontWeight="bold">
        = 252
      </text>
    </svg>
  );
};

// 4. ábra: a könyvespolc (3. feladat)
export const SimultaneousDrawBookshelfSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const books = Array.from({ length: 14 }, (_, i) => (i < 2 ? 'dosz' : i < 10 ? 'prose' : 'poem'));
  const colors: Record<string, { fill: string; stroke: string }> = {
    dosz: { fill: '#fca5a5', stroke: '#b91c1c' },
    prose: { fill: '#93c5fd', stroke: '#1d4ed8' },
    poem: { fill: '#fde68a', stroke: '#b45309' }
  };
  return (
    <svg viewBox="0 0 600 260" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="590" height="250" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="300" y="28" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
        14 könyv: 10 prózai (közte 2 Dosztojevszkij) és 4 verseskönyv
      </text>
      {books.map((b, i) => (
        <rect key={i} x={58 + i * 35} y={i % 3 === 0 ? 55 : 65} width="30" height={i % 3 === 0 ? 110 : 100} rx="3" fill={colors[b].fill} stroke={colors[b].stroke} strokeWidth="1.5" />
      ))}
      <rect x="45" y="165" width="510" height="10" fill="#92400e" />
      {[
        { c: 'dosz', t: 'Dosztojevszkij (2)', x: 70 },
        { c: 'prose', t: 'más prózai mű (8)', x: 250 },
        { c: 'poem', t: 'verseskönyv (4)', x: 430 }
      ].map((l) => (
        <g key={l.c}>
          <rect x={l.x} y="195" width="18" height="18" rx="3" fill={colors[l.c].fill} stroke={colors[l.c].stroke} />
          <text x={l.x + 26} y="209" fontSize="12" fill="#334155">
            {l.t}
          </text>
        </g>
      ))}
      <text x="300" y="242" fontSize="12" textAnchor="middle" fill="#475569">
        Két könyvet választunk: az összes eset (14 alatt 2) = 91.
      </text>
    </svg>
  );
};

// 5. ábra: nyári olimpiák kontinensenként a 2021-es tokiói olimpiával bezárólag (6. feladat)
export const OLYMPICS_BY_CONTINENT: { name: string; count: number }[] = [
  { name: 'Afrika', count: 0 },
  { name: 'Amerika', count: 7 },
  { name: 'Ausztrália', count: 2 },
  { name: 'Ázsia', count: 4 },
  { name: 'Európa', count: 16 }
];

export const SimultaneousDrawOlympicsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const x0 = 70;
  const yB = 240;
  const sc = 9;
  return (
    <svg viewBox="0 0 600 290" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="590" height="280" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="300" y="28" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
        Nyári olimpiai játékok kontinensenként (összesen 29)
      </text>
      <line x1={x0} y1={yB} x2="560" y2={yB} stroke="#334155" strokeWidth="1.5" />
      <line x1={x0} y1={yB} x2={x0} y2="45" stroke="#334155" strokeWidth="1.5" />
      {[0, 4, 8, 12, 16, 20].map((v) => (
        <g key={v}>
          <line x1={x0} y1={yB - v * sc} x2="560" y2={yB - v * sc} stroke="#e2e8f0" />
          <text x={x0 - 8} y={yB - v * sc + 4} fontSize="11" textAnchor="end" fill="#475569">
            {v}
          </text>
        </g>
      ))}
      {OLYMPICS_BY_CONTINENT.map((c, i) => (
        <g key={c.name}>
          <rect x={x0 + 20 + i * 96} y={yB - c.count * sc} width="60" height={c.count * sc} fill="#38bdf8" stroke="#0369a1" />
          <text x={x0 + 50 + i * 96} y={yB - c.count * sc - 6} fontSize="12" textAnchor="middle" fontWeight="bold" fill="#0c4a6e">
            {c.count}
          </text>
          <text x={x0 + 50 + i * 96} y={yB + 18} fontSize="12" textAnchor="middle" fill="#334155">
            {c.name}
          </text>
        </g>
      ))}
    </svg>
  );
};

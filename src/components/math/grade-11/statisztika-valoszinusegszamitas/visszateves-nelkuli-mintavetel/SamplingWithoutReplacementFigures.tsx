import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

const RED = { fill: '#fb7185', stroke: '#be123c' };
const YELLOW = { fill: '#fde047', stroke: '#a16207' };

/** Binomiális együttható SVG-ben (egymás alatt n és k, ívelt zárójelek). */
const SvgBinom: React.FC<{ cx: number; cy: number; n: string | number; k: string | number; size?: number; color?: string }> = ({ cx, cy, n, k, size = 13, color = '#0c4a6e' }) => {
  const w = Math.max(String(n).length, String(k).length) * size * 0.32 + size * 0.5;
  const h = size * 1.25;
  return (
    <g>
      <path d={`M ${cx - w} ${cy - h} Q ${cx - w - size * 0.45} ${cy} ${cx - w} ${cy + h}`} fill="none" stroke={color} strokeWidth="1.4" />
      <path d={`M ${cx + w} ${cy - h} Q ${cx + w + size * 0.45} ${cy} ${cx + w} ${cy + h}`} fill="none" stroke={color} strokeWidth="1.4" />
      <text x={cx} y={cy - size * 0.18} fontSize={size} textAnchor="middle" fill={color} fontWeight="bold">
        {n}
      </text>
      <text x={cx} y={cy + size * 0.95} fontSize={size} textAnchor="middle" fill={color} fontWeight="bold">
        {k}
      </text>
    </g>
  );
};

// 1. ábra: a kidolgozott feladat – 4 piros és 6 sárga golyó, 5-öt húzunk; pontosan 3 sárga
export const SamplingWithoutReplacementUrnSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 600 300" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="590" height="290" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <text x="300" y="28" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
      10 golyó: 4 piros + 6 sárga, egyszerre 5-öt húzunk
    </text>
    <rect x="40" y="45" width="230" height="110" rx="16" fill="#fff1f2" stroke="#e11d48" strokeWidth="2" />
    <text x="155" y="66" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#9f1239">
      4 piros
    </text>
    {[0, 1, 2, 3].map((i) => (
      <circle key={i} cx={80 + i * 50} cy={108} r="16" fill={RED.fill} stroke={i < 2 ? '#facc15' : RED.stroke} strokeWidth={i < 2 ? 5 : 1.5} />
    ))}
    <rect x="300" y="45" width="260" height="110" rx="16" fill="#fefce8" stroke="#ca8a04" strokeWidth="2" />
    <text x="430" y="66" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#854d0e">
      6 sárga
    </text>
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <circle key={i} cx={330 + i * 40} cy={108} r="15" fill={YELLOW.fill} stroke={i < 3 ? '#0284c7' : YELLOW.stroke} strokeWidth={i < 3 ? 5 : 1.5} />
    ))}
    <text x="155" y="185" fontSize="12" textAnchor="middle" fill="#9f1239">
      innen 2-t:
    </text>
    <SvgBinom cx={155} cy={212} n={4} k={2} color="#9f1239" />
    <text x="185" y="217" fontSize="13" fill="#9f1239">
      = 6
    </text>
    <text x="430" y="185" fontSize="12" textAnchor="middle" fill="#854d0e">
      innen 3-at:
    </text>
    <SvgBinom cx={430} cy={212} n={6} k={3} color="#854d0e" />
    <text x="460" y="217" fontSize="13" fill="#854d0e">
      = 20
    </text>
    <text x="300" y="217" fontSize="20" textAnchor="middle" fontWeight="bold" fill="#334155">
      ·
    </text>
    <text x="300" y="268" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
      P(pontosan 3 sárga) = 20 · 6 / 252 = 120/252 ≈ 0,476
    </text>
  </svg>
);

// 2. ábra: az általános modell – pontosan j elem az egyik csoportból
export const SamplingWithoutReplacementModelSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 600 290" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="590" height="280" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <rect x="40" y="25" width="520" height="120" rx="18" fill="#ffffff" stroke="#334155" strokeWidth="2" />
    <text x="300" y="47" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#1e293b">
      n elem
    </text>
    <rect x="60" y="58" width="220" height="74" rx="12" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
    <text x="170" y="88" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#92400e">
      egyik: m db
    </text>
    <text x="170" y="112" fontSize="12" textAnchor="middle" fill="#92400e">
      innen 2 db
    </text>
    <rect x="320" y="58" width="220" height="74" rx="12" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
    <text x="430" y="88" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
      másik: n − m db
    </text>
    <text x="430" y="112" fontSize="12" textAnchor="middle" fill="#0c4a6e">
      innen (k − 2) db
    </text>
    <text x="300" y="172" fontSize="12" textAnchor="middle" fill="#334155">
      kedvező esetek (pontosan 2 az egyik csoportból):
    </text>
    <SvgBinom cx={255} cy={205} n="m" k="2" color="#92400e" />
    <text x="300" y="212" fontSize="18" textAnchor="middle" fill="#334155">
      ·
    </text>
    <SvgBinom cx={345} cy={205} n="n − m" k="k − 2" color="#0c4a6e" />
    <text x="300" y="262" fontSize="13" textAnchor="middle" fill="#334155">
      A valószínűség: a kedvező esetek száma osztva az összes eset számával, (n alatt k)-val.
    </text>
  </svg>
);

// 3. ábra: valószínűségi fa – két golyó egymás után, visszatevés nélkül (4 piros, 6 sárga)
export const SamplingWithoutReplacementTreeSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const root = { x: 60, y: 160 };
  const lvl1 = [
    { x: 230, y: 85, c: RED, p: '4/10', label: 'P' },
    { x: 230, y: 235, c: YELLOW, p: '6/10', label: 'S' }
  ];
  const leaves = [
    { from: 0, x: 400, y: 45, c: RED, p: '3/9', res: 'PP: 12/90' },
    { from: 0, x: 400, y: 125, c: YELLOW, p: '6/9', res: 'PS: 24/90' },
    { from: 1, x: 400, y: 195, c: RED, p: '4/9', res: 'SP: 24/90' },
    { from: 1, x: 400, y: 275, c: YELLOW, p: '5/9', res: 'SS: 30/90' }
  ];
  return (
    <svg viewBox="0 0 600 320" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="590" height="310" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="230" y="22" fontSize="11" textAnchor="middle" fill="#475569">
        1. húzás
      </text>
      <text x="400" y="22" fontSize="11" textAnchor="middle" fill="#475569">
        2. húzás
      </text>
      {lvl1.map((n) => (
        <g key={n.label}>
          <line x1={root.x} y1={root.y} x2={n.x} y2={n.y} stroke="#64748b" strokeWidth="2" />
          <text x={(root.x + n.x) / 2 - 8} y={(root.y + n.y) / 2 - 6} fontSize="13" fontWeight="bold" fill="#0c4a6e" textAnchor="middle">
            {n.p}
          </text>
        </g>
      ))}
      {leaves.map((l, i) => {
        const a = lvl1[l.from];
        return (
          <g key={i}>
            <line x1={a.x} y1={a.y} x2={l.x} y2={l.y} stroke="#64748b" strokeWidth="2" />
            <text x={(a.x + l.x) / 2} y={(a.y + l.y) / 2 - 6} fontSize="12" fontWeight="bold" fill="#0c4a6e" textAnchor="middle">
              {l.p}
            </text>
            <circle cx={l.x} cy={l.y} r="13" fill={l.c.fill} stroke={l.c.stroke} strokeWidth="1.5" />
            <text x={l.x + 24} y={l.y + 5} fontSize="13" fill="#1e293b">
              {l.res}
            </text>
          </g>
        );
      })}
      <circle cx={root.x} cy={root.y} r="10" fill="#334155" />
      {lvl1.map((n) => (
        <circle key={n.label} cx={n.x} cy={n.y} r="14" fill={n.c.fill} stroke={n.c.stroke} strokeWidth="1.5" />
      ))}
      <rect x="505" y="135" width="80" height="50" rx="10" fill="#e0f2fe" stroke="#0284c7" />
      <text x="545" y="155" fontSize="11" textAnchor="middle" fill="#0c4a6e">
        összeg:
      </text>
      <text x="545" y="173" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
        90/90 = 1
      </text>
    </svg>
  );
};

// 4. ábra: a vonószenekar (2. feladat)
export const SamplingWithoutReplacementOrchestraSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const groups = [
    { name: 'hegedű', count: 14, fill: '#fde68a', stroke: '#b45309' },
    { name: 'brácsa', count: 4, fill: '#fecaca', stroke: '#b91c1c' },
    { name: 'cselló', count: 4, fill: '#bbf7d0', stroke: '#15803d' },
    { name: 'nagybőgő', count: 2, fill: '#c7d2fe', stroke: '#4338ca' }
  ];
  let idx = 0;
  return (
    <svg viewBox="0 0 600 250" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="590" height="240" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="300" y="28" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
        Vonószenekar: 24 zenész, közülük kettőt választunk – (24 alatt 2) = 276
      </text>
      {groups.map((g) =>
        Array.from({ length: g.count }, (_, j) => {
          const i = idx++;
          const col = i % 12;
          const row = Math.floor(i / 12);
          return (
            <g key={`${g.name}-${j}`}>
              <circle cx={60 + col * 44} cy={68 + row * 50} r="12" fill={g.fill} stroke={g.stroke} strokeWidth="1.5" />
              <rect x={50 + col * 44} y={82 + row * 50} width="20" height="14" rx="4" fill={g.fill} stroke={g.stroke} strokeWidth="1.2" />
            </g>
          );
        })
      )}
      {groups.map((g, i) => (
        <g key={g.name}>
          <rect x={40 + i * 140} y="175" width="18" height="18" rx="4" fill={g.fill} stroke={g.stroke} />
          <text x={66 + i * 140} y="189" fontSize="12" fill="#334155">
            {g.name}: {g.count}
          </text>
        </g>
      ))}
      <text x="300" y="228" fontSize="12" textAnchor="middle" fill="#475569">
        „egyik hegedűs, másik nem”: 14 · 10 kedvező eset
      </text>
    </svg>
  );
};

// 5. ábra: a gólszerzők száma 3 kiválasztott játékos között (3. feladat)
export const SamplingWithoutReplacementGoalsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const counts = [84, 108, 27, 1];
  const x0 = 80;
  const yB = 230;
  const sc = 1.45;
  return (
    <svg viewBox="0 0 600 290" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="590" height="280" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="300" y="28" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
        12 játékos (3 gólszerző), 3-at választunk: hány gólszerző lesz köztük?
      </text>
      <line x1={x0} y1={yB} x2="540" y2={yB} stroke="#334155" strokeWidth="1.5" />
      {counts.map((c, j) => (
        <g key={j}>
          <rect x={x0 + 30 + j * 110} y={yB - c * sc} width="60" height={c * sc} fill="#38bdf8" stroke="#0369a1" />
          <text x={x0 + 60 + j * 110} y={yB - c * sc - 8} fontSize="12" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
            {c}/220
          </text>
          <text x={x0 + 60 + j * 110} y={yB + 18} fontSize="13" textAnchor="middle" fill="#334155">
            {j} gólszerző
          </text>
        </g>
      ))}
      <text x="300" y="272" fontSize="13" textAnchor="middle" fill="#0c4a6e" fontWeight="bold">
        várható érték: (0 · 84 + 1 · 108 + 2 · 27 + 3 · 1) / 220 = 165/220 = 0,75
      </text>
    </svg>
  );
};

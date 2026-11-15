import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

type Pt = { x: number; y: number };

const Vertex: React.FC<{ p: Pt; label: string; color?: string; dx?: number; dy?: number }> = ({
  p,
  label,
  color = '#059669',
  dx = 0,
  dy = -14
}) => (
  <g>
    <circle cx={p.x} cy={p.y} r="8" fill={color} stroke="#ffffff" strokeWidth="2" />
    <text x={p.x + dx} y={p.y + dy} fontSize="13" fontWeight="bold" textAnchor="middle" fill="#0f172a">
      {label}
    </text>
  </g>
);

const DegreeBadge: React.FC<{ p: Pt; d: number; dx?: number; dy?: number }> = ({ p, d, dx = 16, dy = 16 }) => (
  <g>
    <circle cx={p.x + dx} cy={p.y + dy} r="10" fill="#fef3c7" stroke="#d97706" strokeWidth="1.2" />
    <text x={p.x + dx} y={p.y + dy + 4} fontSize="11" fontWeight="bold" textAnchor="middle" fill="#92400e">
      {d}
    </text>
  </g>
);

const Edge: React.FC<{ a: Pt; b: Pt; color?: string; dashed?: boolean; width?: number }> = ({
  a,
  b,
  color = '#334155',
  dashed = false,
  width = 2.5
}) => (
  <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={color} strokeWidth={width} strokeDasharray={dashed ? '7 5' : undefined} />
);

// 1. ábra: Ugyanaz a gráf kétféle rajzzal (térkép kontra séma – Harry Beck ötlete)
export const SameGraphTwoDrawingsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const edges: [string, string][] = [
    ['A', 'B'],
    ['B', 'C'],
    ['C', 'D'],
    ['B', 'E'],
    ['E', 'F'],
    ['C', 'E']
  ];
  const left: Record<string, Pt> = {
    A: { x: 40, y: 90 },
    B: { x: 105, y: 140 },
    C: { x: 200, y: 110 },
    D: { x: 245, y: 60 },
    E: { x: 150, y: 215 },
    F: { x: 60, y: 235 }
  };
  const right: Record<string, Pt> = {
    A: { x: 320, y: 140 },
    B: { x: 380, y: 140 },
    C: { x: 460, y: 140 },
    D: { x: 520, y: 80 },
    E: { x: 420, y: 220 },
    F: { x: 340, y: 220 }
  };
  const curve = (a: Pt, b: Pt, k: number) => {
    const mx = (a.x + b.x) / 2 - (b.y - a.y) * k;
    const my = (a.y + b.y) / 2 + (b.x - a.x) * k;
    return `M ${a.x} ${a.y} Q ${mx.toFixed(1)} ${my.toFixed(1)} ${b.x} ${b.y}`;
  };
  return (
    <svg viewBox="0 0 560 280" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="270" rx="16" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="1.5" />
      <text x="145" y="30" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        „Valós” térkép: görbe vonalak
      </text>
      <text x="420" y="30" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Séma: csak a kapcsolatok
      </text>
      <line x1="280" y1="45" x2="280" y2="260" stroke="#86efac" strokeDasharray="4 4" />
      {edges.map(([u, v], i) => (
        <path key={`l-${u}${v}`} d={curve(left[u], left[v], i % 2 === 0 ? 0.25 : -0.2)} fill="none" stroke="#0f766e" strokeWidth="2.5" />
      ))}
      {edges.map(([u, v]) => (
        <Edge key={`r-${u}${v}`} a={right[u]} b={right[v]} color="#0f766e" width={4} />
      ))}
      {Object.entries(left).map(([k, p]) => (
        <Vertex key={`lv-${k}`} p={p} label={k} />
      ))}
      {Object.entries(right).map(([k, p]) => (
        <Vertex key={`rv-${k}`} p={p} label={k} />
      ))}
      <text x="280" y="268" fontSize="12" textAnchor="middle" fill="#166534">
        Mindkét rajzon ugyanaz a 6 csúcs és ugyanaz a 6 él – tehát ugyanaz a gráf.
      </text>
    </svg>
  );
};

// 2. ábra: Fogalmak – csúcs, él, fokszám, hurokél, izolált csúcs
export const GraphTermsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const A = { x: 110, y: 90 };
  const B = { x: 60, y: 210 };
  const C = { x: 200, y: 210 };
  const D = { x: 260, y: 90 };
  const E = { x: 340, y: 210 };
  return (
    <svg viewBox="0 0 560 290" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="280" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="200" y="30" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Csúcsok, élek, fokszámok
      </text>
      <Edge a={A} b={B} />
      <Edge a={A} b={C} />
      <Edge a={A} b={D} />
      <Edge a={B} b={C} />
      {/* hurokél D-n */}
      <circle cx={D.x + 20} cy={D.y - 20} r="17" fill="none" stroke="#dc2626" strokeWidth="2.5" />
      <Vertex p={A} label="A" />
      <Vertex p={B} label="B" dy={26} />
      <Vertex p={C} label="C" dy={26} />
      <Vertex p={D} label="D" dx={-16} dy={-10} />
      <Vertex p={E} label="E" color="#94a3b8" dy={26} />
      <DegreeBadge p={A} d={3} dx={-22} dy={-6} />
      <DegreeBadge p={B} d={2} dx={-22} dy={-6} />
      <DegreeBadge p={C} d={2} dx={22} dy={-6} />
      <DegreeBadge p={D} d={3} dx={24} dy={16} />
      <DegreeBadge p={E} d={0} dx={22} dy={-6} />
      <text x={D.x + 46} y={D.y - 30} fontSize="11.5" fill="#b91c1c">
        hurokél: +2
      </text>
      <text x={E.x} y={E.y - 22} fontSize="11.5" textAnchor="middle" fill="#475569">
        izolált csúcs
      </text>
      <rect x="390" y="55" width="155" height="170" rx="10" fill="#ffffff" stroke="#a7f3d0" />
      <text x="467" y="78" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#065f46">
        Fokszámok
      </text>
      {['A: 3', 'B: 2', 'C: 2', 'D: 1 + 2 = 3', 'E: 0'].map((t, i) => (
        <text key={t} x="405" y={100 + i * 20} fontSize="12" fill="#334155">
          {t}
        </text>
      ))}
      <text x="467" y="210" fontSize="11.5" textAnchor="middle" fill="#065f46">
        összeg 10 = 2 · 5 él
      </text>
      <text x="200" y="270" fontSize="12" textAnchor="middle" fill="#334155">
        A fokszám a csúcsból kiinduló élek száma (a hurokél kétszer számít).
      </text>
    </svg>
  );
};

// 3. ábra: Feladat 4 – négytagú csoport, mindenkinek pontosan két ismerőse van
export const FourFriendsCycleSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const sq = { A: { x: 70, y: 70 }, B: { x: 200, y: 70 }, C: { x: 200, y: 200 }, D: { x: 70, y: 200 } };
  const bt = { A: { x: 340, y: 70 }, B: { x: 480, y: 70 }, C: { x: 340, y: 200 }, D: { x: 480, y: 200 } };
  return (
    <svg viewBox="0 0 560 270" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="260" rx="16" fill="#f0f9ff" stroke="#bae6fd" strokeWidth="1.5" />
      <text x="135" y="30" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        A–B–C–D–A „kör”
      </text>
      <text x="410" y="30" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Ugyanez másképp rajzolva
      </text>
      <Edge a={sq.A} b={sq.B} color="#0369a1" />
      <Edge a={sq.B} b={sq.C} color="#0369a1" />
      <Edge a={sq.C} b={sq.D} color="#0369a1" />
      <Edge a={sq.D} b={sq.A} color="#0369a1" />
      <Edge a={bt.A} b={bt.B} color="#0369a1" />
      <Edge a={bt.B} b={bt.C} color="#0369a1" />
      <Edge a={bt.C} b={bt.D} color="#0369a1" />
      <Edge a={bt.D} b={bt.A} color="#0369a1" />
      {Object.entries(sq).map(([k, p]) => (
        <g key={`s-${k}`}>
          <Vertex p={p} label={k} color="#0284c7" dy={p.y < 100 ? -14 : 26} />
          <DegreeBadge p={p} d={2} dx={p.x < 100 ? -20 : 20} dy={0} />
        </g>
      ))}
      {Object.entries(bt).map(([k, p]) => (
        <g key={`b-${k}`}>
          <Vertex p={p} label={k} color="#0284c7" dy={p.y < 100 ? -14 : 26} />
          <DegreeBadge p={p} d={2} dx={p.x < 400 ? -20 : 20} dy={0} />
        </g>
      ))}
      <text x="280" y="250" fontSize="12" textAnchor="middle" fill="#075985">
        Minden csúcs fokszáma 2, az élek száma 4 · 2 / 2 = 4. (Az élek metszése nem új csúcs!)
      </text>
    </svg>
  );
};

// 4. ábra: Feladat 2 – öt falu, négy úttal összefüggő úthálózat (egy lehetséges megoldás)
export const VillageRoadsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const A = { x: 90, y: 80 };
  const B = { x: 250, y: 60 };
  const C = { x: 160, y: 190 };
  const D = { x: 330, y: 210 };
  const E = { x: 460, y: 110 };
  return (
    <svg viewBox="0 0 560 280" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="270" rx="16" fill="#fefce8" stroke="#fde68a" strokeWidth="1.5" />
      <text x="280" y="30" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Öt falu, négy út: bármelyik faluból bármelyikbe eljuthatunk
      </text>
      <Edge a={A} b={B} color="#334155" width={4} />
      <Edge a={C} b={D} color="#334155" width={4} />
      <Edge a={A} b={C} color="#16a34a" width={3.5} dashed />
      <Edge a={D} b={E} color="#16a34a" width={3.5} dashed />
      {[
        { p: A, l: 'A' },
        { p: B, l: 'B' },
        { p: C, l: 'C' },
        { p: D, l: 'D' },
        { p: E, l: 'E' }
      ].map((v) => (
        <Vertex key={v.l} p={v.p} label={v.l} color="#ca8a04" dy={v.p.y > 150 ? 26 : -14} />
      ))}
      <line x1="60" y1="240" x2="100" y2="240" stroke="#334155" strokeWidth="4" />
      <text x="108" y="244" fontSize="12" fill="#334155">már elkészült út</text>
      <line x1="250" y1="240" x2="290" y2="240" stroke="#16a34a" strokeWidth="3.5" strokeDasharray="7 5" />
      <text x="298" y="244" fontSize="12" fill="#166534">egy lehetséges új út</text>
      <text x="280" y="264" fontSize="11.5" textAnchor="middle" fill="#713f12">
        5 csúcs összekötéséhez legalább 4 él kell; a 4 él nem zárhat be kört.
      </text>
    </svg>
  );
};

// 5. ábra: HF 1 – sakkdöntő: egy versenyző mindenkit ismer, a többiek 2-2 embert
export const ChessFinalGraphSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const A = { x: 280, y: 150 };
  const B = { x: 170, y: 70 };
  const C = { x: 390, y: 70 };
  const D = { x: 390, y: 230 };
  const E = { x: 170, y: 230 };
  return (
    <svg viewBox="0 0 560 290" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="280" rx="16" fill="#faf5ff" stroke="#e9d5ff" strokeWidth="1.5" />
      <text x="280" y="30" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Sakkdöntő: A mindenkit ismer, a többiek 2-2 embert
      </text>
      {[B, C, D, E].map((p, i) => (
        <Edge key={i} a={A} b={p} color="#7c3aed" />
      ))}
      <Edge a={B} b={C} color="#db2777" />
      <Edge a={D} b={E} color="#db2777" />
      <Vertex p={A} label="A" color="#7c3aed" dx={0} dy={30} />
      <Vertex p={B} label="B" color="#7c3aed" />
      <Vertex p={C} label="C" color="#7c3aed" />
      <Vertex p={D} label="D" color="#7c3aed" dy={26} />
      <Vertex p={E} label="E" color="#7c3aed" dy={26} />
      <DegreeBadge p={A} d={4} dx={22} dy={-14} />
      <DegreeBadge p={B} d={2} dx={-22} dy={0} />
      <DegreeBadge p={C} d={2} dx={22} dy={0} />
      <DegreeBadge p={D} d={2} dx={22} dy={0} />
      <DegreeBadge p={E} d={2} dx={-22} dy={0} />
      <text x="280" y="275" fontSize="12" textAnchor="middle" fill="#581c87">
        fokszámok: 4, 2, 2, 2, 2 ⇒ összeg 12 ⇒ 6 ismeretség
      </text>
    </svg>
  );
};

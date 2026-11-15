import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

type Pt = [number, number];

/** Derékszög jelölése (magyar konvenció): negyedkörív + pont a szögfelezőn. */
export const RightAngleMark: React.FC<{ v: Pt; a: Pt; b: Pt; r?: number; color?: string }> = ({ v, a, b, r = 12, color = '#0f172a' }) => {
  const n1 = Math.hypot(a[0] - v[0], a[1] - v[1]);
  const n2 = Math.hypot(b[0] - v[0], b[1] - v[1]);
  const u1: Pt = [(a[0] - v[0]) / n1, (a[1] - v[1]) / n1];
  const u2: Pt = [(b[0] - v[0]) / n2, (b[1] - v[1]) / n2];
  const p1: Pt = [v[0] + r * u1[0], v[1] + r * u1[1]];
  const p2: Pt = [v[0] + r * u2[0], v[1] + r * u2[1]];
  const sweep = u1[0] * u2[1] - u1[1] * u2[0] > 0 ? 1 : 0;
  const bx = u1[0] + u2[0];
  const by = u1[1] + u2[1];
  const bl = Math.hypot(bx, by);
  const d: Pt = [v[0] + (0.55 * r * bx) / bl, v[1] + (0.55 * r * by) / bl];
  return (
    <g>
      <path d={`M ${p1[0]} ${p1[1]} A ${r} ${r} 0 0 ${sweep} ${p2[0]} ${p2[1]}`} fill="none" stroke={color} strokeWidth="1.2" />
      <circle cx={d[0]} cy={d[1]} r={Math.max(1.2, Math.min(2, r / 7))} fill={color} />
    </g>
  );
};

/** A Theodorus-spirál csúcsai: P₀ = O, P₁ = (1; 0), Pₖ₊₁ = Pₖ + egységnyi merőleges. */
export const theodorusPoints = (n: number): Pt[] => {
  const pts: Pt[] = [[1, 0]];
  for (let k = 1; k < n; k++) {
    const [x, y] = pts[k - 1];
    const len = Math.hypot(x, y);
    pts.push([x - y / len, y + x / len]);
  }
  return pts;
};

// 1. ábra: a számhalmazok Venn-diagramja a kidolgozott feladat számaival
export const NumberSetsVennSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 560 320" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="550" height="310" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <rect x="20" y="30" width="520" height="270" rx="14" fill="#ffffff" stroke="#334155" strokeWidth="2" />
    <text x="34" y="52" fontSize="13" fontWeight="bold" fill="#334155">valós számok (ℝ)</text>
    <rect x="34" y="62" width="330" height="226" rx="12" fill="#ecfdf5" stroke="#047857" strokeWidth="2" />
    <text x="46" y="82" fontSize="12" fontWeight="bold" fill="#047857">racionális számok (ℚ)</text>
    <rect x="52" y="92" width="220" height="182" rx="10" fill="#d1fae5" stroke="#0d9488" strokeWidth="2" />
    <text x="62" y="110" fontSize="11.5" fontWeight="bold" fill="#0f766e">egész számok (ℤ)</text>
    <rect x="70" y="120" width="140" height="140" rx="10" fill="#a7f3d0" stroke="#065f46" strokeWidth="2" />
    <text x="80" y="138" fontSize="11" fontWeight="bold" fill="#065f46">természetes (ℕ)</text>
    {[
      ['1', 100, 170],
      ['30', 160, 170],
      ['12', 100, 225],
      ['13', 160, 225],
      ['−7', 242, 190],
      ['20,5', 318, 150],
      ['−7/15', 318, 230]
    ].map(([t, x, y]) => (
      <text key={t as string} x={x as number} y={y as number} fontSize="15" textAnchor="middle" fontWeight="bold" fill="#0f172a">{t}</text>
    ))}
    <rect x="378" y="62" width="148" height="226" rx="12" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="2" />
    <text x="452" y="82" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#6d28d9">irracionális (ℚ*)</text>
    <text x="452" y="150" fontSize="15" textAnchor="middle" fontWeight="bold" fill="#0f172a">16π</text>
    <text x="452" y="225" fontSize="15" textAnchor="middle" fontWeight="bold" fill="#0f172a">√2</text>
  </svg>
);

// 2. ábra: az egységnégyzet átlója a számegyenesre körzőzve
export const UnitSquareDiagonalSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const u = 120;
  const O: Pt = [80, 220];
  const A: Pt = [O[0] + u, O[1]];
  const C: Pt = [O[0] + u, O[1] - u];
  const D: Pt = [O[0], O[1] - u];
  const s2 = Math.SQRT2 * u;
  return (
    <svg viewBox="0 0 520 280" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="510" height="270" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <line x1="40" y1={O[1]} x2="490" y2={O[1]} stroke="#334155" strokeWidth="2" markerEnd="url(#g11ri-arrow)" />
      <defs>
        <marker id="g11ri-arrow" markerWidth="10" markerHeight="10" refX="6" refY="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#334155" />
        </marker>
      </defs>
      {[0, 1, 2, 3].map((k) => (
        <g key={k}>
          <line x1={O[0] + k * u} y1={O[1] - 6} x2={O[0] + k * u} y2={O[1] + 6} stroke="#334155" strokeWidth="2" />
          <text x={O[0] + k * u} y={O[1] + 24} fontSize="13" textAnchor="middle" fill="#334155">{k}</text>
        </g>
      ))}
      <polygon points={`${O[0]},${O[1]} ${A[0]},${A[1]} ${C[0]},${C[1]} ${D[0]},${D[1]}`} fill="#ecfdf5" stroke="#047857" strokeWidth="2" />
      <RightAngleMark v={O} a={A} b={D} r={14} />
      <line x1={O[0]} y1={O[1]} x2={C[0]} y2={C[1]} stroke="#7c3aed" strokeWidth="3" />
      <path d={`M ${C[0]} ${C[1]} A ${s2} ${s2} 0 0 1 ${O[0] + s2} ${O[1]}`} fill="none" stroke="#7c3aed" strokeWidth="1.8" strokeDasharray="6 4" />
      <circle cx={O[0] + s2} cy={O[1]} r="5" fill="#7c3aed" />
      <text x={O[0] + s2} y={O[1] + 44} fontSize="15" textAnchor="middle" fontWeight="bold" fill="#6d28d9">√2 ≈ 1,41</text>
      <text x={O[0] + u / 2} y={O[1] - u / 2 - 12} fontSize="14" fontWeight="bold" fill="#6d28d9" transform={`rotate(-45 ${O[0] + u / 2} ${O[1] - u / 2 - 12})`}>√2</text>
      <text x={O[0] + u / 2} y={O[1] + 44} fontSize="12" textAnchor="middle" fill="#047857">1</text>
      <text x={O[0] + u + 14} y={O[1] - u / 2} fontSize="12" fill="#047857">1</text>
      <text x="360" y="60" fontSize="12" fill="#334155">1² + 1² = 2</text>
      <text x="360" y="80" fontSize="12" fill="#334155">az átló hossza √2</text>
    </svg>
  );
};

// 3. ábra: √5 szerkesztése (befogók 2 és 1)
export const Sqrt5ConstructionSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const u = 90;
  const O: Pt = [60, 220];
  const A: Pt = [O[0] + 2 * u, O[1]];
  const B: Pt = [A[0], O[1] - u];
  const s5 = Math.sqrt(5) * u;
  return (
    <svg viewBox="0 0 520 280" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="510" height="270" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <line x1="30" y1={O[1]} x2="500" y2={O[1]} stroke="#334155" strokeWidth="2" />
      {[0, 1, 2, 3, 4].map((k) => (
        <g key={k}>
          <line x1={O[0] + k * u} y1={O[1] - 6} x2={O[0] + k * u} y2={O[1] + 6} stroke="#334155" strokeWidth="2" />
          <text x={O[0] + k * u} y={O[1] + 24} fontSize="13" textAnchor="middle" fill="#334155">{k}</text>
        </g>
      ))}
      <polygon points={`${O[0]},${O[1]} ${A[0]},${A[1]} ${B[0]},${B[1]}`} fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
      <RightAngleMark v={A} a={O} b={B} r={14} />
      <line x1={O[0]} y1={O[1]} x2={B[0]} y2={B[1]} stroke="#7c3aed" strokeWidth="3" />
      <path d={`M ${B[0]} ${B[1]} A ${s5} ${s5} 0 0 1 ${O[0] + s5} ${O[1]}`} fill="none" stroke="#7c3aed" strokeWidth="1.8" strokeDasharray="6 4" />
      <circle cx={O[0] + s5} cy={O[1]} r="5" fill="#7c3aed" />
      <text x={O[0] + s5} y={O[1] + 44} fontSize="15" textAnchor="middle" fontWeight="bold" fill="#6d28d9">√5 ≈ 2,24</text>
      <text x={O[0] + u} y={O[1] - u / 2 - 14} fontSize="14" fontWeight="bold" fill="#6d28d9">√5</text>
      <text x={O[0] + u} y={O[1] + 44} fontSize="12" textAnchor="middle" fill="#0284c7">2</text>
      <text x={A[0] + 10} y={O[1] - u / 2} fontSize="12" fill="#0284c7">1</text>
      <text x="350" y="60" fontSize="12" fill="#334155">2² + 1² = 5</text>
      <text x="350" y="80" fontSize="12" fill="#334155">az átfogó hossza √5</text>
    </svg>
  );
};

// 4. ábra: Theodorus-spirál (√2-től √17-ig)
export const TheodorusSpiralSvg: React.FC<FigProps & { n?: number }> = ({ className = DEFAULT_CLASS, n = 17 }) => {
  const s = 32;
  const O: Pt = [260, 160];
  const pts = theodorusPoints(n).map(([x, y]) => [O[0] + x * s, O[1] - y * s] as Pt);
  return (
    <svg viewBox="0 0 520 320" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="510" height="310" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      {pts.slice(0, -1).map((p, k) => {
        const q = pts[k + 1];
        const sq = Number.isInteger(Math.sqrt(k + 2));
        return (
          <g key={k}>
            <polygon points={`${O[0]},${O[1]} ${p[0]},${p[1]} ${q[0]},${q[1]}`} fill={k % 2 ? '#ecfdf5' : '#e0f2fe'} stroke="#64748b" strokeWidth="1" />
            <RightAngleMark v={p} a={O} b={q} r={7} color="#334155" />
            <line x1={O[0]} y1={O[1]} x2={q[0]} y2={q[1]} stroke={sq ? '#047857' : '#7c3aed'} strokeWidth={sq ? 2.4 : 1.4} />
            <text
              x={O[0] + (q[0] - O[0]) * 1.06 + (q[0] > O[0] ? 4 : -4)}
              y={O[1] + (q[1] - O[1]) * 1.06 + 4}
              fontSize="10"
              textAnchor={q[0] > O[0] ? 'start' : 'end'}
              fontWeight={sq ? 'bold' : 'normal'}
              fill={sq ? '#047857' : '#6d28d9'}
            >
              {sq ? String(Math.sqrt(k + 2)) : `√${k + 2}`}
            </text>
          </g>
        );
      })}
      <line x1={O[0]} y1={O[1]} x2={pts[0][0]} y2={pts[0][1]} stroke="#047857" strokeWidth="2.4" />
      <text x="20" y="300" fontSize="11" fill="#334155">Minden külső befogó 1 egység; zöld: racionális (√4 = 2, √9 = 3, √16 = 4)</text>
    </svg>
  );
};

// 5. ábra: tizedes törtek három fajtája
export const DecimalKindsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const cols = [
    { x: 20, t: 'véges', ex: ['7/25 = 0,28', '13/8 = 1,625', '3/10 = 0,3'], c: '#047857', set: 'racionális' },
    { x: 200, t: 'végtelen szakaszos', ex: ['4/9 = 0,444…', '5/6 = 0,8333…', '17/11 = 1,5454…'], c: '#0284c7', set: 'racionális' },
    { x: 380, t: 'végtelen, nem szakaszos', ex: ['√2 = 1,41421356…', 'π = 3,14159265…', '0,121122111222…'], c: '#7c3aed', set: 'irracionális' }
  ];
  return (
    <svg viewBox="0 0 560 230" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="220" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">A valós számok tizedes tört alakja</text>
      {cols.map((c) => (
        <g key={c.t}>
          <rect x={c.x} y="42" width="160" height="150" rx="12" fill="#ffffff" stroke={c.c} strokeWidth="2" />
          <text x={c.x + 80} y="64" fontSize="12" textAnchor="middle" fontWeight="bold" fill={c.c}>{c.t}</text>
          {c.ex.map((e, i) => (
            <text key={e} x={c.x + 80} y={96 + i * 26} fontSize="12" textAnchor="middle" fill="#0f172a">{e}</text>
          ))}
          <text x={c.x + 80} y="214" fontSize="12" textAnchor="middle" fontWeight="bold" fill={c.c}>{c.set}</text>
        </g>
      ))}
    </svg>
  );
};

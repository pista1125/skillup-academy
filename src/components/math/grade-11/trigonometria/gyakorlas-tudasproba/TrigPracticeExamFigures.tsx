import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

const toRad = (deg: number) => (deg * Math.PI) / 180;

type Pt = { x: number; y: number };

const pts = (list: Pt[]) => list.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ');
const sub = (P: Pt, Q: Pt): Pt => ({ x: P.x - Q.x, y: P.y - Q.y });

/** Matematikai koordinátákból (y felfelé) képernyő-koordináta. */
const toScreen = (origin: Pt, k: number) => (p: Pt): Pt => ({ x: origin.x + p.x * k, y: origin.y - p.y * k });

/** Szögív a V csúcsnál az u1 iránytól az u2 irányig (a kisebbik szög). */
const angleArc = (V: Pt, u1: Pt, u2: Pt, r: number) => {
  const n1 = Math.hypot(u1.x, u1.y);
  const n2 = Math.hypot(u2.x, u2.y);
  const a = { x: u1.x / n1, y: u1.y / n1 };
  const b = { x: u2.x / n2, y: u2.y / n2 };
  const sweep = a.x * b.y - a.y * b.x > 0 ? 1 : 0;
  return `M ${(V.x + r * a.x).toFixed(2)} ${(V.y + r * a.y).toFixed(2)} A ${r} ${r} 0 0 ${sweep} ${(V.x + r * b.x).toFixed(2)} ${(V.y + r * b.y).toFixed(2)}`;
};

/** Derékszög jelölése (magyar szokás): negyedkörív, benne egy pont. */
const RightAngleArc: React.FC<{ V: Pt; u1: Pt; u2: Pt; r?: number; color?: string }> = ({ V, u1, u2, r = 13, color = '#475569' }) => {
  const n1 = Math.hypot(u1.x, u1.y);
  const n2 = Math.hypot(u2.x, u2.y);
  const bis = { x: u1.x / n1 + u2.x / n2, y: u1.y / n1 + u2.y / n2 };
  const nb = Math.hypot(bis.x, bis.y) || 1;
  return (
    <g>
      <path d={angleArc(V, u1, u2, r)} fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx={V.x + (0.5 * r * bis.x) / nb} cy={V.y + (0.5 * r * bis.y) / nb} r="1.8" fill={color} />
    </g>
  );
};

const Frame: React.FC<{ title: string; h: number; children: React.ReactNode; className: string }> = ({ title, h, children, className }) => (
  <svg viewBox={`0 0 560 ${h}`} className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="550" height={h - 10} rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <text x="280" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
      {title}
    </text>
    {children}
  </svg>
);

const Label: React.FC<{ p: Pt; t: string; dx?: number; dy?: number; color?: string; size?: number }> = ({ p, t, dx = 0, dy = 0, color = '#0f172a', size = 13 }) => (
  <text x={p.x + dx} y={p.y + dy} fontSize={size} fontWeight="bold" fill={color}>
    {t}
  </text>
);

// 4. feladat: két érintő 56°-os szögben, r = 3,4 cm
export const TangentsCircleSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const S = toScreen({ x: 120, y: 160 }, 28);
  const d = 3.4 / Math.sin(toRad(28));
  const O = S({ x: 0, y: 0 });
  const P = S({ x: d, y: 0 });
  const T1 = S({ x: 3.4 * Math.cos(toRad(62)), y: 3.4 * Math.sin(toRad(62)) });
  const T2 = S({ x: 3.4 * Math.cos(toRad(62)), y: -3.4 * Math.sin(toRad(62)) });
  const R = 3.4 * 28;
  return (
    <Frame title="4. feladat – két érintő és a kör íve" h={300} className={className}>
      <circle cx={O.x} cy={O.y} r={R} fill="#ffffff" stroke="#64748b" strokeWidth="1.5" />
      <path
        d={`M ${P.x} ${P.y} L ${T1.x.toFixed(2)} ${T1.y.toFixed(2)} A ${R} ${R} 0 0 1 ${T2.x.toFixed(2)} ${T2.y.toFixed(2)} Z`}
        fill="rgba(59,130,246,0.3)"
        stroke="#2563eb"
        strokeWidth="2"
      />
      <line x1={O.x} y1={O.y} x2={T1.x} y2={T1.y} stroke="#dc2626" strokeWidth="1.5" />
      <line x1={O.x} y1={O.y} x2={T2.x} y2={T2.y} stroke="#dc2626" strokeWidth="1.5" />
      <line x1={O.x} y1={O.y} x2={P.x} y2={P.y} stroke="#475569" strokeWidth="1.2" strokeDasharray="5 3" />
      <RightAngleArc V={T1} u1={sub(O, T1)} u2={sub(P, T1)} />
      <RightAngleArc V={T2} u1={sub(O, T2)} u2={sub(P, T2)} />
      <path d={angleArc(P, sub(T1, P), sub(T2, P), 34)} fill="none" stroke="#7c3aed" strokeWidth="2" />
      <Label p={P} t="56°" dx={-62} dy={4} color="#6d28d9" size={12} />
      <path d={angleArc(O, sub(T1, O), sub(T2, O), 20)} fill="none" stroke="#d97706" strokeWidth="2" />
      <Label p={O} t="124°" dx={22} dy={-4} color="#b45309" size={11} />
      <circle cx={O.x} cy={O.y} r="3" fill="#0f172a" />
      <Label p={O} t="O" dx={-16} dy={4} />
      <Label p={P} t="P" dx={8} dy={4} />
      <Label p={T1} t="E₁" dx={-4} dy={-8} />
      <Label p={T2} t="E₂" dx={-4} dy={20} />
      <Label p={{ x: (O.x + T1.x) / 2, y: (O.y + T1.y) / 2 }} t="3,4" dx={-26} dy={0} color="#b91c1c" size={11} />
      <g fontSize="11" fill="#334155">
        <text x="360" y="70">OP = 3,4 / sin 28° ≈ 7,24 cm</text>
        <text x="360" y="92">PE₁ = 3,4 / tg 28° ≈ 6,39 cm</text>
        <text x="360" y="120">deltoid: 3,4 · 6,39 ≈ 21,74 cm²</text>
        <text x="360" y="142">körcikk (124°) ≈ 12,51 cm²</text>
        <text x="360" y="170" fontWeight="bold" fill="#1d4ed8">kék rész ≈ 9,23 cm²</text>
      </g>
    </Frame>
  );
};

// 5. feladat: konvex négyszög az AC átlóval két háromszögre bontva
export const QuadDiagonalSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const S = toScreen({ x: 50, y: 172 }, 10);
  const AB = (22 * Math.sin(toRad(40))) / Math.sin(toRad(80));
  const AD = (22 * Math.sin(toRad(55))) / Math.sin(toRad(81));
  const A = S({ x: 0, y: 0 });
  const C = S({ x: 22, y: 0 });
  const B = S({ x: AB * Math.cos(toRad(-60)), y: AB * Math.sin(toRad(-60)) });
  const D = S({ x: AD * Math.cos(toRad(44)), y: AD * Math.sin(toRad(44)) });
  return (
    <Frame title="5. feladat – négyszög az AC átlóval" h={320} className={className}>
      <polygon points={pts([A, B, C])} fill="rgba(59,130,246,0.12)" stroke="#2563eb" strokeWidth="2" />
      <polygon points={pts([A, C, D])} fill="rgba(16,185,129,0.12)" stroke="#059669" strokeWidth="2" />
      <line x1={A.x} y1={A.y} x2={C.x} y2={C.y} stroke="#dc2626" strokeWidth="2.5" />
      <path d={angleArc(A, sub(C, A), sub(B, A), 30)} fill="none" stroke="#2563eb" strokeWidth="1.5" />
      <Label p={A} t="60°" dx={26} dy={24} color="#1d4ed8" size={11} />
      <path d={angleArc(A, sub(C, A), sub(D, A), 36)} fill="none" stroke="#059669" strokeWidth="1.5" />
      <Label p={A} t="44°" dx={38} dy={-10} color="#047857" size={11} />
      <path d={angleArc(C, sub(A, C), sub(B, C), 30)} fill="none" stroke="#2563eb" strokeWidth="1.5" />
      <Label p={C} t="40°" dx={-50} dy={18} color="#1d4ed8" size={11} />
      <path d={angleArc(C, sub(A, C), sub(D, C), 26)} fill="none" stroke="#059669" strokeWidth="1.5" />
      <Label p={C} t="55°" dx={-44} dy={-12} color="#047857" size={11} />
      <Label p={A} t="A" dx={-16} dy={4} />
      <Label p={B} t="B" dx={-4} dy={18} />
      <Label p={C} t="C" dx={8} dy={4} />
      <Label p={D} t="D" dx={-4} dy={-8} />
      <Label p={{ x: (A.x + C.x) / 2, y: A.y }} t="22 cm" dx={-18} dy={-6} color="#b91c1c" size={12} />
      <g fontSize="12" fill="#334155">
        <text x="340" y="60">ABC: B∠ = 80°</text>
        <text x="340" y="80">AB ≈ 14,36 cm, BC ≈ 19,35 cm</text>
        <text x="340" y="108">ACD: D∠ = 81°</text>
        <text x="340" y="128">AD ≈ 18,25 cm, CD ≈ 15,47 cm</text>
        <text x="340" y="160">T(ABC) ≈ 136,79 cm²</text>
        <text x="340" y="180">T(ACD) ≈ 139,42 cm²</text>
        <text x="340" y="206" fontWeight="bold" fill="#1d4ed8">T ≈ 276,2 cm²</text>
      </g>
    </Frame>
  );
};

// 6. feladat: a vödröt ketten cipelik – erők egyensúlya
export const BucketForcesSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const k = 1.5; // px / N
  const O = { x: 200, y: 220 };
  const father = { x: -109 * Math.sin(toRad(35)) * k, y: -109 * Math.cos(toRad(35)) * k };
  const sonAngle = (Math.atan((109 * Math.sin(toRad(35))) / (100 - 109 * Math.cos(toRad(35)))) * 180) / Math.PI;
  const sonLen = Math.hypot(109 * Math.sin(toRad(35)), 100 - 109 * Math.cos(toRad(35)));
  const son = { x: sonLen * Math.sin(toRad(sonAngle)) * k, y: -sonLen * Math.cos(toRad(sonAngle)) * k };
  const F = { x: O.x + father.x, y: O.y + father.y };
  const Sn = { x: O.x + son.x, y: O.y + son.y };
  const up = { x: O.x, y: O.y - 100 * k };
  const down = { x: O.x, y: O.y + 50 };
  const arrow = (from: Pt, to: Pt, color: string, w = 3) => {
    const ang = Math.atan2(to.y - from.y, to.x - from.x);
    const h1 = { x: to.x - 10 * Math.cos(ang - 0.4), y: to.y - 10 * Math.sin(ang - 0.4) };
    const h2 = { x: to.x - 10 * Math.cos(ang + 0.4), y: to.y - 10 * Math.sin(ang + 0.4) };
    return (
      <g>
        <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke={color} strokeWidth={w} />
        <polygon points={pts([to, h1, h2])} fill={color} />
      </g>
    );
  };
  return (
    <Frame title="6. feladat – erők egyensúlya a vödrön" h={320} className={className}>
      <line x1={O.x} y1={O.y + 10} x2={O.x} y2={30 + 15} stroke="#cbd5e1" strokeDasharray="4 4" />
      <line x1={F.x} y1={F.y} x2={up.x} y2={up.y} stroke="#94a3b8" strokeDasharray="5 3" />
      <line x1={Sn.x} y1={Sn.y} x2={up.x} y2={up.y} stroke="#94a3b8" strokeDasharray="5 3" />
      {arrow(O, F, '#2563eb')}
      {arrow(O, Sn, '#059669')}
      {arrow(O, down, '#dc2626')}
      {arrow(O, up, '#7c3aed', 1.5)}
      <path d={`M ${O.x - 14} ${O.y - 4} L ${O.x + 14} ${O.y - 4} L ${O.x + 10} ${O.y + 18} L ${O.x - 10} ${O.y + 18} Z`} fill="#94a3b8" stroke="#475569" />
      <path d={angleArc(O, { x: 0, y: -1 }, father, 40)} fill="none" stroke="#2563eb" strokeWidth="1.5" />
      <text x={O.x - 30} y={O.y - 46} fontSize="11" fontWeight="bold" fill="#1d4ed8">35°</text>
      <path d={angleArc(O, { x: 0, y: -1 }, son, 30)} fill="none" stroke="#059669" strokeWidth="1.5" />
      <text x={O.x + 30} y={O.y - 18} fontSize="11" fontWeight="bold" fill="#047857">β ≈ 80,3°</text>
      <text x={F.x - 50} y={F.y} fontSize="12" fontWeight="bold" fill="#1d4ed8">109 N</text>
      <text x={Sn.x + 6} y={Sn.y + 4} fontSize="12" fontWeight="bold" fill="#047857">F ≈ 63,4 N</text>
      <text x={down.x + 8} y={down.y + 4} fontSize="12" fontWeight="bold" fill="#b91c1c">100 N</text>
      <text x={up.x + 6} y={up.y + 4} fontSize="11" fill="#6d28d9">eredő: 100 N felfelé</text>
      <g fontSize="12" fill="#334155">
        <text x="350" y="56">F² = 100² + 109² −</text>
        <text x="350" y="72">− 2 · 100 · 109 · cos 35°</text>
        <text x="350" y="92" fontWeight="bold" fill="#047857">F ≈ 63,4 N</text>
        <text x="350" y="120">sin β = 109 · sin 35° / F</text>
        <text x="350" y="142" fontWeight="bold" fill="#047857">β ≈ 80,3°</text>
      </g>
    </Frame>
  );
};

// Tudáspróba I. 2. feladat: tetőtér ötszög keresztmetszete
export const AtticCrossSectionSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const k = 50; // px / m
  const t40 = Math.tan(toRad(40));
  const halfBase = 2.1 + 1.6 / t40; // ≈ 4,007 m
  const h = halfBase * t40;
  const S = toScreen({ x: 230, y: 260 }, k);
  const L = S({ x: -halfBase, y: 0 });
  const Rr = S({ x: halfBase, y: 0 });
  const Top = S({ x: 0, y: h });
  const WL0 = S({ x: -2.1, y: 0 });
  const WL1 = S({ x: -2.1, y: 1.6 });
  const WR0 = S({ x: 2.1, y: 0 });
  const WR1 = S({ x: 2.1, y: 1.6 });
  return (
    <Frame title="Tudáspróba I. 2. – a tetőtér keresztmetszete" h={300} className={className}>
      <polygon points={pts([L, Rr, Top])} fill="rgba(148,163,184,0.15)" stroke="#475569" strokeWidth="2" />
      <polygon points={pts([WL0, WR0, WR1, Top, WL1])} fill="rgba(59,130,246,0.25)" stroke="#2563eb" strokeWidth="2" />
      <RightAngleArc V={WL0} u1={{ x: 1, y: 0 }} u2={{ x: 0, y: -1 }} />
      <RightAngleArc V={WR0} u1={{ x: -1, y: 0 }} u2={{ x: 0, y: -1 }} />
      <path d={angleArc(L, sub(Rr, L), sub(Top, L), 40)} fill="none" stroke="#dc2626" strokeWidth="2" />
      <text x={L.x + 44} y={L.y - 8} fontSize="12" fontWeight="bold" fill="#b91c1c">40°</text>
      <path d={angleArc(Rr, sub(L, Rr), sub(Top, Rr), 40)} fill="none" stroke="#dc2626" strokeWidth="2" />
      <text x={Rr.x - 66} y={Rr.y - 8} fontSize="12" fontWeight="bold" fill="#b91c1c">40°</text>
      <line x1={Top.x} y1={Top.y} x2={Top.x} y2={L.y} stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="5 3" />
      <text x={Top.x + 6} y={(Top.y + L.y) / 2 - 20} fontSize="13" fontWeight="bold" fill="#6d28d9">h</text>
      <text x={WR1.x + 6} y={(WR0.y + WR1.y) / 2 + 4} fontSize="12" fill="#0f172a">1,6 m</text>
      <text x={(WL0.x + WR0.x) / 2} y={WL0.y + 18} fontSize="12" textAnchor="middle" fill="#0f172a">4,2 m</text>
      <g fontSize="12" fill="#334155">
        <text x="20" y="60">tető alapja: 4,2 + 2 · 1,6 / tg 40° ≈ 8,01 m</text>
        <text x="20" y="80">h = 4,007 · tg 40° ≈ 3,36 m</text>
        <text x="380" y="60">T ≈ 6,72 + 3,70 ≈ 10,42 m²</text>
        <text x="380" y="80">V ≈ 10,42 · 10 ≈ 104,2 m³</text>
      </g>
    </Frame>
  );
};

// Tudáspróba I. ráadás (érettségi 2013): a CD súlyvonal
export const MedianTriangleSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const S = toScreen({ x: 110, y: 240 }, 5);
  const A = S({ x: 0, y: 0 });
  const B = S({ x: 48, y: 0 });
  const D = S({ x: 24, y: 0 });
  const C = S({ x: 24 + 41 * Math.cos(toRad(133)), y: 41 * Math.sin(toRad(133)) });
  return (
    <Frame title="Érettségi 2013 – a D pont felezi az AB oldalt" h={290} className={className}>
      <polygon points={pts([A, B, C])} fill="rgba(59,130,246,0.1)" stroke="#2563eb" strokeWidth="2" />
      <line x1={C.x} y1={C.y} x2={D.x} y2={D.y} stroke="#dc2626" strokeWidth="2.5" />
      <path d={angleArc(D, sub(A, D), sub(C, D), 24)} fill="none" stroke="#7c3aed" strokeWidth="2" />
      <text x={D.x - 44} y={D.y - 10} fontSize="12" fontWeight="bold" fill="#6d28d9">δ = 47°</text>
      <path d={angleArc(B, sub(A, B), sub(C, B), 40)} fill="none" stroke="#d97706" strokeWidth="2" />
      <text x={B.x - 66} y={B.y - 8} fontSize="11" fontWeight="bold" fill="#b45309">β ≈ 30°</text>
      <Label p={A} t="A" dx={-4} dy={18} />
      <Label p={B} t="B" dx={6} dy={6} />
      <Label p={C} t="C" dx={-6} dy={-8} />
      <Label p={D} t="D" dx={-4} dy={18} />
      <text x={(A.x + D.x) / 2} y={A.y + 18} fontSize="11" textAnchor="middle" fill="#0f172a">24</text>
      <text x={(D.x + B.x) / 2} y={A.y + 18} fontSize="11" textAnchor="middle" fill="#0f172a">24</text>
      <text x={(C.x + D.x) / 2 + 8} y={(C.y + D.y) / 2} fontSize="12" fontWeight="bold" fill="#b91c1c">41</text>
      <text x={(C.x + B.x) / 2 + 6} y={(C.y + B.y) / 2 - 6} fontSize="12" fontWeight="bold" fill="#1d4ed8">≈ 60</text>
      <g fontSize="12" fill="#334155">
        <text x="380" y="70">T = 2 · ½ · 24 · 41 · sin 47°</text>
        <text x="380" y="90" fontWeight="bold" fill="#0f172a">≈ 719,7 mm²</text>
        <text x="380" y="118">BDC∠ = 133°</text>
        <text x="380" y="138">BC² = 24² + 41² −</text>
        <text x="380" y="154">− 2 · 24 · 41 · cos 133°</text>
        <text x="380" y="174" fontWeight="bold" fill="#0f172a">BC ≈ 60 mm</text>
      </g>
    </Frame>
  );
};

// Tudáspróba II. ráadás (érettségi 2020): ötszög alakú díszkő
export const PentagonStoneSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const s3 = Math.sqrt(3);
  const S = toScreen({ x: 190, y: 120 }, 9.5);
  const E = S({ x: -5 * s3, y: 0 });
  const Cc = S({ x: 5 * s3, y: 0 });
  const D = S({ x: 0, y: 5 });
  const A = S({ x: -5 * s3 + 5, y: -5 * s3 });
  const B = S({ x: 5 * s3 - 5, y: -5 * s3 });
  return (
    <Frame title="Érettségi 2020 – ötszög alapú díszkő" h={300} className={className}>
      <polygon points={pts([A, B, Cc, D, E])} fill="rgba(148,163,184,0.2)" stroke="#475569" strokeWidth="2.5" />
      <line x1={A.x} y1={A.y} x2={D.x} y2={D.y} stroke="#2563eb" strokeWidth="1.5" strokeDasharray="5 3" />
      <line x1={B.x} y1={B.y} x2={D.x} y2={D.y} stroke="#2563eb" strokeWidth="1.5" strokeDasharray="5 3" />
      <RightAngleArc V={E} u1={sub(D, E)} u2={sub(A, E)} />
      <RightAngleArc V={Cc} u1={sub(D, Cc)} u2={sub(B, Cc)} />
      <path d={angleArc(D, sub(E, D), sub(Cc, D), 16)} fill="none" stroke="#dc2626" strokeWidth="1.5" />
      <text x={D.x - 12} y={D.y + 30} fontSize="11" fontWeight="bold" fill="#b91c1c">120°</text>
      <path d={angleArc(A, sub(B, A), sub(E, A), 16)} fill="none" stroke="#dc2626" strokeWidth="1.5" />
      <text x={A.x + 10} y={A.y - 18} fontSize="11" fontWeight="bold" fill="#b91c1c">120°</text>
      <path d={angleArc(B, sub(Cc, B), sub(A, B), 16)} fill="none" stroke="#dc2626" strokeWidth="1.5" />
      <text x={B.x - 34} y={B.y - 18} fontSize="11" fontWeight="bold" fill="#b91c1c">120°</text>
      <Label p={A} t="A" dx={-6} dy={18} />
      <Label p={B} t="B" dx={-2} dy={18} />
      <Label p={Cc} t="C" dx={8} dy={4} />
      <Label p={D} t="D" dx={-4} dy={-8} />
      <Label p={E} t="E" dx={-18} dy={4} />
      <text x={(E.x + D.x) / 2 - 14} y={(E.y + D.y) / 2 - 4} fontSize="11" fill="#0f172a">10</text>
      <text x={(Cc.x + D.x) / 2 + 6} y={(Cc.y + D.y) / 2 - 4} fontSize="11" fill="#0f172a">10</text>
      <text x={(E.x + A.x) / 2 - 18} y={(E.y + A.y) / 2 + 4} fontSize="11" fill="#0f172a">10</text>
      <text x={(Cc.x + B.x) / 2 + 8} y={(Cc.y + B.y) / 2 + 4} fontSize="11" fill="#0f172a">10</text>
      <g fontSize="11" fill="#334155">
        <text x="370" y="70">Szögösszeg: 540°</text>
        <text x="370" y="90">E∠ + C∠ = 540° − 3 · 120° = 180°</text>
        <text x="370" y="110">szimmetria ⇒ E∠ = C∠ = 90°</text>
        <text x="370" y="140">T(AED) = T(BCD) = 50</text>
        <text x="370" y="160">AD = BD = 10√2, ADB∠ = 30°</text>
        <text x="370" y="180">T(ABD) = ½ · 200 · sin 30° = 50</text>
        <text x="370" y="208" fontWeight="bold" fill="#1d4ed8">T(ABCDE) = 150</text>
      </g>
    </Frame>
  );
};

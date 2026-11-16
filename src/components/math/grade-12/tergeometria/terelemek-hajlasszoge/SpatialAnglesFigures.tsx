import React from 'react';

type FigProps = { className?: string };
type Pt = [number, number];

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';
const INK = '#0f172a';
const EDGE = '#334155';
const RED = '#dc2626';
const BLUE = '#2563eb';
const GREEN = '#059669';
const ARC = '#d97706';
const AUX = '#64748b';

const r1 = (n: number) => Math.round(n * 10) / 10;
const unit = (p: Pt): Pt => {
  const l = Math.hypot(p[0], p[1]) || 1;
  return [p[0] / l, p[1] / l];
};
const sub = (a: Pt, b: Pt): Pt => [a[0] - b[0], a[1] - b[1]];

/** Magyar derékszög-jelölés: negyedkörív ponttal. */
const RightMark: React.FC<{ v: Pt; p1: Pt; p2: Pt; r?: number }> = ({ v, p1, p2, r = 12 }) => {
  const u1 = unit(sub(p1, v));
  const u2 = unit(sub(p2, v));
  const s: Pt = [v[0] + u1[0] * r, v[1] + u1[1] * r];
  const e: Pt = [v[0] + u2[0] * r, v[1] + u2[1] * r];
  const sweep = u1[0] * u2[1] - u1[1] * u2[0] > 0 ? 1 : 0;
  const b = unit([u1[0] + u2[0], u1[1] + u2[1]]);
  return (
    <g>
      <path d={`M ${r1(s[0])} ${r1(s[1])} A ${r} ${r} 0 0 ${sweep} ${r1(e[0])} ${r1(e[1])}`} fill="none" stroke={INK} strokeWidth="1.3" />
      <circle cx={r1(v[0] + b[0] * r * 0.55)} cy={r1(v[1] + b[1] * r * 0.55)} r="1.8" fill={INK} />
    </g>
  );
};

/** Szögív a v csúcsnál, felirattal. */
const AngleArc: React.FC<{ v: Pt; p1: Pt; p2: Pt; r?: number; t?: string; tr?: number }> = ({ v, p1, p2, r = 22, t, tr }) => {
  const u1 = unit(sub(p1, v));
  const u2 = unit(sub(p2, v));
  const s: Pt = [v[0] + u1[0] * r, v[1] + u1[1] * r];
  const e: Pt = [v[0] + u2[0] * r, v[1] + u2[1] * r];
  const sweep = u1[0] * u2[1] - u1[1] * u2[0] > 0 ? 1 : 0;
  const b = unit([u1[0] + u2[0], u1[1] + u2[1]]);
  const L = tr ?? r + 10;
  return (
    <g>
      <path d={`M ${r1(s[0])} ${r1(s[1])} A ${r} ${r} 0 0 ${sweep} ${r1(e[0])} ${r1(e[1])}`} fill="none" stroke={ARC} strokeWidth="1.8" />
      {t && (
        <text x={r1(v[0] + b[0] * L)} y={r1(v[1] + b[1] * L)} fontSize="13" fontWeight="bold" fill="#b45309" textAnchor="middle" dominantBaseline="middle">
          {t}
        </text>
      )}
    </g>
  );
};

type BoxP = Record<'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H', Pt>;

/** Ferde vetületű téglatest csúcsai: (x, y) = A, w = AB, d = AD (mélység, jobbra fel), h = AE. */
const boxPts = (x: number, y: number, w: number, h: number, d: number): BoxP => {
  const dx = d * 0.55;
  const dy = -d * 0.42;
  const A: Pt = [x, y];
  const B: Pt = [x + w, y];
  const C: Pt = [x + w + dx, y + dy];
  const D: Pt = [x + dx, y + dy];
  return { A, B, C, D, E: [A[0], A[1] - h], F: [B[0], B[1] - h], G: [C[0], C[1] - h], H: [D[0], D[1] - h] };
};

const Box: React.FC<{ P: BoxP; labels?: boolean }> = ({ P, labels = true }) => {
  const vis: [keyof BoxP, keyof BoxP][] = [
    ['A', 'B'],
    ['B', 'C'],
    ['E', 'F'],
    ['F', 'G'],
    ['G', 'H'],
    ['H', 'E'],
    ['A', 'E'],
    ['B', 'F'],
    ['C', 'G']
  ];
  const hid: [keyof BoxP, keyof BoxP][] = [
    ['A', 'D'],
    ['D', 'C'],
    ['D', 'H']
  ];
  const off: Record<keyof BoxP, Pt> = {
    A: [-12, 12],
    B: [8, 14],
    C: [12, 6],
    D: [-12, -4],
    E: [-12, -4],
    F: [-4, -10],
    G: [10, -6],
    H: [-6, -10]
  };
  return (
    <g>
      {hid.map(([a, b]) => (
        <line key={a + b} x1={r1(P[a][0])} y1={r1(P[a][1])} x2={r1(P[b][0])} y2={r1(P[b][1])} stroke={EDGE} strokeWidth="1.2" strokeDasharray="5 4" />
      ))}
      {vis.map(([a, b]) => (
        <line key={a + b} x1={r1(P[a][0])} y1={r1(P[a][1])} x2={r1(P[b][0])} y2={r1(P[b][1])} stroke={EDGE} strokeWidth="2" strokeLinecap="round" />
      ))}
      {labels &&
        (Object.keys(P) as (keyof BoxP)[]).map((k) => (
          <text key={k} x={r1(P[k][0] + off[k][0])} y={r1(P[k][1] + off[k][1])} fontSize="13" fontWeight="bold" fill={INK} textAnchor="middle" dominantBaseline="middle">
            {k}
          </text>
        ))}
    </g>
  );
};

const Frame: React.FC<{ title: string; className: string; children: React.ReactNode }> = ({ title, className, children }) => (
  <svg viewBox="0 0 560 320" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="5" y="5" width="550" height="310" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <text x="280" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill={INK}>
      {title}
    </text>
    {children}
  </svg>
);

// 1. ábra: a tárolóláda két testátlója (30 × 6 × 5 cm)
export const CrateDiagonalsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const P = boxPts(40, 250, 330, 70, 90);
  const K: Pt = [(P.A[0] + P.G[0]) / 2, (P.A[1] + P.G[1]) / 2];
  return (
    <Frame title="Két pálca a ládában: AG és HB testátló" className={className}>
      <polygon points={`${P.A.join(',')} ${P.B.join(',')} ${P.G.join(',')} ${P.H.join(',')}`} fill="rgba(37,99,235,0.08)" stroke="none" />
      <Box P={P} />
      <line x1={P.A[0]} y1={P.A[1]} x2={P.G[0]} y2={P.G[1]} stroke={RED} strokeWidth="2.6" />
      <line x1={P.H[0]} y1={P.H[1]} x2={P.B[0]} y2={P.B[1]} stroke={BLUE} strokeWidth="2.6" />
      <circle cx={K[0]} cy={K[1]} r="3" fill={INK} />
      <text x={K[0]} y={K[1] + 18} fontSize="13" fontWeight="bold" fill={INK} textAnchor="middle">K</text>
      <AngleArc v={K} p1={P.A} p2={P.H} r={26} t="α" tr={40} />
      <text x={(P.A[0] + P.B[0]) / 2} y={P.A[1] + 20} fontSize="12" fontWeight="bold" fill={INK} textAnchor="middle">30 cm</text>
      <text x={P.B[0] + 38} y={P.B[1] - 10} fontSize="12" fontWeight="bold" fill={INK}>6</text>
      <text x={P.A[0] - 22} y={P.A[1] - 35} fontSize="12" fontWeight="bold" fill={INK}>5</text>
      <text x={470} y={70} fontSize="12" fill={INK} textAnchor="middle">e² = 5² + 6² + 30²</text>
      <text x={470} y={90} fontSize="12" fill={INK} textAnchor="middle">e = 31 cm</text>
      <text x={470} y={115} fontSize="12" fill={INK} textAnchor="middle" fontWeight="bold">α ≈ 29,2°</text>
    </Frame>
  );
};

// 2. ábra: a testátló és az alaplap hajlásszöge
export const DiagonalBaseAngleSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const P = boxPts(40, 250, 330, 70, 90);
  return (
    <Frame title="A testátló és az alaplap szöge: GAC∢ = β" className={className}>
      <polygon points={`${P.A.join(',')} ${P.B.join(',')} ${P.C.join(',')} ${P.D.join(',')}`} fill="rgba(16,185,129,0.12)" stroke="none" />
      <Box P={P} />
      <polygon points={`${P.A.join(',')} ${P.C.join(',')} ${P.G.join(',')}`} fill="rgba(220,38,38,0.1)" stroke="none" />
      <line x1={P.A[0]} y1={P.A[1]} x2={P.C[0]} y2={P.C[1]} stroke={GREEN} strokeWidth="2.4" strokeDasharray="7 4" />
      <line x1={P.A[0]} y1={P.A[1]} x2={P.G[0]} y2={P.G[1]} stroke={RED} strokeWidth="2.6" />
      <line x1={P.C[0]} y1={P.C[1]} x2={P.G[0]} y2={P.G[1]} stroke={BLUE} strokeWidth="2.6" />
      <RightMark v={P.C} p1={P.A} p2={P.G} r={13} />
      <AngleArc v={P.A} p1={P.C} p2={P.G} r={60} t="β" tr={74} />
      <text x={P.C[0] + 14} y={(P.C[1] + P.G[1]) / 2} fontSize="12" fontWeight="bold" fill={BLUE}>5</text>
      <text x={(P.A[0] + P.G[0]) / 2 - 10} y={(P.A[1] + P.G[1]) / 2 - 10} fontSize="12" fontWeight="bold" fill={RED}>31</text>
      <text x={470} y={70} fontSize="12" fill={INK} textAnchor="middle">sin β = CG / AG = 5 / 31</text>
      <text x={470} y={92} fontSize="12" fill={INK} textAnchor="middle" fontWeight="bold">β ≈ 9,3°</text>
      <text x={280} y={298} fontSize="11" fill={AUX} textAnchor="middle">AC: az AG merőleges vetülete</text>
    </Frame>
  );
};

// 3. ábra: két egyenes hajlásszöge
export const LineLineAngleSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const M: Pt = [160, 170];
  const a = (35 * Math.PI) / 180;
  const e1: Pt = [M[0] + 130, M[1] - 130 * Math.tan(a) * 0.0];
  return (
    <Frame title="Két egyenes hajlásszöge" className={className}>
      <line x1={M[0] - 130} y1={M[1]} x2={e1[0]} y2={M[1]} stroke={BLUE} strokeWidth="2.4" />
      <line x1={M[0] - 120 * Math.cos(a)} y1={M[1] + 120 * Math.sin(a)} x2={M[0] + 120 * Math.cos(a)} y2={M[1] - 120 * Math.sin(a)} stroke={RED} strokeWidth="2.4" />
      <AngleArc v={M} p1={[M[0] + 100, M[1]]} p2={[M[0] + 100 * Math.cos(a), M[1] - 100 * Math.sin(a)]} r={40} t="35°" tr={58} />
      <path d={`M ${M[0] - 22 * Math.cos(a)} ${r1(M[1] + 22 * Math.sin(a))} A 22 22 0 0 0 ${M[0] - 22} ${M[1]}`} fill="none" stroke={AUX} strokeWidth="1.2" />
      <text x={M[0] - 48} y={M[1] - 14} fontSize="12" fill={AUX} textAnchor="middle">145°</text>
      <text x={M[0] + 120} y={M[1] + 18} fontSize="13" fontWeight="bold" fill={BLUE}>e</text>
      <text x={M[0] + 104} y={M[1] - 82} fontSize="13" fontWeight="bold" fill={RED}>f</text>
      <text x={160} y={262} fontSize="12" fill={INK} textAnchor="middle">hajlásszög: a nem nagyobbik szög, 35°</text>
      {/* párhuzamosok */}
      <line x1={340} y1={130} x2={520} y2={100} stroke={BLUE} strokeWidth="2.4" />
      <line x1={340} y1={180} x2={520} y2={150} stroke={RED} strokeWidth="2.4" />
      <text x={430} y={215} fontSize="12" fill={INK} textAnchor="middle">párhuzamos egyenesek: 0°</text>
      <text x={280} y={298} fontSize="11.5" fill={AUX} textAnchor="middle">Két egyenes hajlásszöge legfeljebb 90°.</text>
    </Frame>
  );
};

// 4. ábra: egyenes és sík hajlásszöge
export const LinePlaneAngleSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const S: Pt[] = [
    [60, 250],
    [380, 250],
    [490, 160],
    [170, 160]
  ];
  const M: Pt = [210, 215];
  const P: Pt = [380, 95];
  const T: Pt = [380, 196];
  return (
    <Frame title="Egyenes és sík hajlásszöge" className={className}>
      <polygon points={S.map((p) => p.join(',')).join(' ')} fill="rgba(16,185,129,0.12)" stroke={GREEN} strokeWidth="1.6" />
      <text x={455} y={240} fontSize="14" fontWeight="bold" fill={GREEN}>S</text>
      <line x1={M[0]} y1={M[1]} x2={T[0] + 40} y2={T[1] - 4.8} stroke={GREEN} strokeWidth="2" strokeDasharray="7 4" />
      <line x1={M[0] - 70} y1={M[1] + 49} x2={M[0]} y2={M[1]} stroke={RED} strokeWidth="2" strokeDasharray="4 4" />
      <line x1={M[0]} y1={M[1]} x2={P[0] + 40} y2={P[1] - 28} stroke={RED} strokeWidth="2.6" />
      <line x1={P[0]} y1={P[1]} x2={T[0]} y2={T[1]} stroke={BLUE} strokeWidth="1.8" strokeDasharray="5 3" />
      <RightMark v={T} p1={P} p2={M} r={12} />
      <circle cx={P[0]} cy={P[1]} r="3" fill={INK} />
      <circle cx={T[0]} cy={T[1]} r="3" fill={INK} />
      <circle cx={M[0]} cy={M[1]} r="3" fill={INK} />
      <AngleArc v={M} p1={T} p2={P} r={50} t="α" tr={64} />
      <text x={P[0] + 50} y={P[1] - 28} fontSize="13" fontWeight="bold" fill={RED}>e</text>
      <text x={T[0] + 48} y={T[1] + 4} fontSize="12" fontWeight="bold" fill={GREEN}>e′ (vetület)</text>
      <text x={P[0] - 12} y={P[1] - 6} fontSize="12" fontWeight="bold" fill={INK}>P</text>
      <text x={T[0] - 4} y={T[1] + 18} fontSize="12" fontWeight="bold" fill={INK}>P′</text>
      <text x={M[0] - 8} y={M[1] + 20} fontSize="12" fontWeight="bold" fill={INK}>M</text>
      <text x={280} y={290} fontSize="11.5" fill={AUX} textAnchor="middle">
        Az egyenes és a sík szöge = az egyenes és merőleges vetületének szöge (0° ≤ α ≤ 90°)
      </text>
    </Frame>
  );
};

// 5. ábra: két sík hajlásszöge
export const PlanePlaneAngleSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  // metszésvonal: m (bal hátul → jobb elöl), az egyik sík vízszintes, a másik felfelé dől
  const L1: Pt = [120, 175];
  const L2: Pt = [400, 235];
  const down: Pt = [60, 50];
  const up: Pt = [-30, -120];
  const Q: Pt = [260, 205];
  return (
    <Frame title="Két sík hajlásszöge" className={className}>
      <polygon
        points={`${L1.join(',')} ${L2.join(',')} ${L2[0] + down[0]},${L2[1] + down[1]} ${L1[0] + down[0]},${L1[1] + down[1]}`}
        fill="rgba(16,185,129,0.12)"
        stroke={GREEN}
        strokeWidth="1.6"
      />
      <polygon
        points={`${L1.join(',')} ${L2.join(',')} ${L2[0] + up[0]},${L2[1] + up[1]} ${L1[0] + up[0]},${L1[1] + up[1]}`}
        fill="rgba(37,99,235,0.1)"
        stroke={BLUE}
        strokeWidth="1.6"
      />
      <line x1={L1[0] - 30} y1={L1[1] - 6.4} x2={L2[0] + 30} y2={L2[1] + 6.4} stroke={INK} strokeWidth="2.2" />
      <text x={L2[0] + 36} y={L2[1] + 14} fontSize="13" fontWeight="bold" fill={INK}>m</text>
      <line x1={Q[0]} y1={Q[1]} x2={Q[0] + down[0] * 0.9} y2={Q[1] + down[1] * 0.9} stroke={GREEN} strokeWidth="2.4" />
      <line x1={Q[0]} y1={Q[1]} x2={Q[0] + up[0] * 0.85} y2={Q[1] + up[1] * 0.85} stroke={BLUE} strokeWidth="2.4" />
      <AngleArc v={Q} p1={[Q[0] + down[0], Q[1] + down[1]]} p2={[Q[0] + up[0], Q[1] + up[1]]} r={30} t="α" tr={44} />
      <circle cx={Q[0]} cy={Q[1]} r="3" fill={INK} />
      <text x={150} y={90} fontSize="13" fontWeight="bold" fill={BLUE}>S₁</text>
      <text x={430} y={290} fontSize="13" fontWeight="bold" fill={GREEN}>S₂</text>
      <text x={470} y={110} fontSize="11.5" fill={AUX} textAnchor="middle">a metszésvonal egy</text>
      <text x={470} y={126} fontSize="11.5" fill={AUX} textAnchor="middle">pontjában mindkét</text>
      <text x={470} y={142} fontSize="11.5" fill={AUX} textAnchor="middle">síkban merőlegest</text>
      <text x={470} y={158} fontSize="11.5" fill={AUX} textAnchor="middle">állítunk m-re</text>
    </Frame>
  );
};

// 6. ábra: négyzetes oszlop (5 × 5 × 9) és az ABGH sík
export const SquarePrismPlaneSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const s = 21;
  const P = boxPts(150, 280, 5 * s, 9 * s, 5 * s);
  return (
    <Frame title="Az ABGH sík és az alaplap szöge" className={className}>
      <polygon points={`${P.A.join(',')} ${P.B.join(',')} ${P.G.join(',')} ${P.H.join(',')}`} fill="rgba(124,58,237,0.18)" stroke="#7c3aed" strokeWidth="1.6" />
      <Box P={P} />
      <line x1={P.B[0]} y1={P.B[1]} x2={P.G[0]} y2={P.G[1]} stroke={RED} strokeWidth="2.4" />
      <RightMark v={P.C} p1={P.B} p2={P.G} r={12} />
      <AngleArc v={P.B} p1={P.C} p2={P.G} r={26} t="φ" tr={38} />
      <text x={(P.A[0] + P.B[0]) / 2} y={P.A[1] + 20} fontSize="12" fontWeight="bold" fill={INK} textAnchor="middle">5</text>
      <text x={P.C[0] + 14} y={(P.C[1] + P.G[1]) / 2} fontSize="12" fontWeight="bold" fill={INK}>9</text>
      <text x={P.B[0] + 38} y={P.B[1] - 4} fontSize="12" fontWeight="bold" fill={INK}>5</text>
      <text x={430} y={120} fontSize="12" fill={INK} textAnchor="middle">AB ⟂ BCGF, ezért</text>
      <text x={430} y={138} fontSize="12" fill={INK} textAnchor="middle">BC ⟂ AB és BG ⟂ AB</text>
      <text x={430} y={170} fontSize="12" fill={INK} textAnchor="middle">tg φ = CG / BC = 9 / 5</text>
      <text x={430} y={192} fontSize="12" fill={INK} textAnchor="middle" fontWeight="bold">φ ≈ 60,9°</text>
    </Frame>
  );
};

import React from 'react';
import {
  P2,
  KLine,
  KText,
  KPoly,
  KRight,
  KSolid,
  makeProj,
  kPrism,
  kMid,
  K_RED,
  K_BLUE,
  K_GREEN,
  K_PURPLE,
  K_EDGE,
  K_FILL
} from './figKit';

type FigProps = { className?: string };
const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

const Frame: React.FC<{ title: string; children: React.ReactNode; className: string; h?: number }> = ({ title, children, className, h = 300 }) => (
  <svg viewBox={`0 0 480 ${h}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="4" y="4" width="472" height={h - 8} rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <text x="240" y="26" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
      {title}
    </text>
    {children}
  </svg>
);

/** A kalapácsfej alaplapja: 8 × 2,5-es téglalap + szimmetrikus trapéz (alapjai 2,5 és 0,5, magassága 5). */
export const HAMMER_BASE: [number, number][] = [[0, 0], [8, 0], [13, 1], [13, 1.5], [8, 2.5], [0, 2.5]];

// 1. ábra: a kalapácsfej
export const HammerHeadSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const pr = makeProj(40, 215, 22, 0.75, 40);
  const { verts, faces } = kPrism(HAMMER_BASE, 3);
  const P = verts.map(pr);
  // alaplap felülnézete jobbra lent nem kell: a fedőlapot színezzük
  return (
    <Frame title="A kalapácsfej: M = 3 cm magas egyenes hasáb" className={className}>
      <KSolid verts={verts} faces={faces} proj={pr} shade={[1]} />
      <KLine a={P[6 + 1]} b={P[6 + 4]} c={K_PURPLE} w={1.4} dash />
      <KText p={[kMid(P[0], P[1])[0], kMid(P[0], P[1])[1] + 13]} t="a = 8 cm" s={11} c={K_BLUE} />
      <KText p={[kMid(P[1], P[2])[0] + 4, kMid(P[1], P[2])[1] + 14]} t="c = 5 cm" s={11} c={K_BLUE} />
      <KText p={[P[0][0] - 8, kMid(P[0], P[6])[1]]} t="M = 3" s={11} c={K_BLUE} a="end" />
      <KText p={[kMid(P[9], P[10])[0] - 30, kMid(P[9], P[10])[1] - 6]} t="d = 0,5" s={10.5} c={K_RED} />
      <KText p={[kMid(P[10], P[11])[0], kMid(P[10], P[11])[1] - 10]} t="a" s={10.5} c={K_BLUE} />
      <KText p={[kMid(P[6], P[11])[0] - 18, kMid(P[6], P[11])[1]]} t="b = 2,5" s={10.5} c={K_BLUE} />
      <text x="250" y="250" fontSize="12" fill="#334155">T = 8 · 2,5 + (2,5 + 0,5)/2 · 5</text>
      <text x="250" y="268" fontSize="12.5" fontWeight="bold" fill="#0f172a">T = 27,5 cm², V = 82,5 cm³</text>
      <text x="250" y="286" fontSize="11.5" fill="#334155">nyél nélkül 77%: ≈ 63,5 cm³ ≈ 500 g</text>
    </Frame>
  );
};

// 2. ábra: az egyenes hasáb hálója
export const PrismNetSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  // derékszögű háromszög alaplap: 3, 4, 5 egység; M = 4,5 egység; 1 egység = 26 px
  const u = 26;
  const x0 = 40;
  const y0 = 90;
  const M = 4.5 * u;
  const sides = [3, 4, 5];
  const xs = [x0, x0 + 3 * u, x0 + 7 * u, x0 + 12 * u];
  const colors = ['#dbeafe', '#dcfce7', '#fef3c7'];
  // felső háromszög a 4 egységes oldal fölött, alsó alatta
  const topTri: P2[] = [[xs[1], y0], [xs[2], y0], [xs[1], y0 - 3 * u * 0.6]];
  const botTri: P2[] = [[xs[1], y0 + M], [xs[2], y0 + M], [xs[1], y0 + M + 3 * u * 0.6]];
  return (
    <Frame title="Az egyenes hasáb hálója: A = 2 · T(alap) + K(alap) · M" className={className}>
      {sides.map((s, i) => (
        <KPoly key={i} p={[[xs[i], y0], [xs[i + 1], y0], [xs[i + 1], y0 + M], [xs[i], y0 + M]]} fill={colors[i]} c={K_EDGE} w={1.6} />
      ))}
      <KPoly p={topTri} fill={K_FILL} c={K_EDGE} w={1.6} />
      <KPoly p={botTri} fill={K_FILL} c={K_EDGE} w={1.6} />
      <KRight v={[xs[1], y0]} p1={[xs[2], y0]} p2={topTri[2]} r={9} />
      <KRight v={[xs[1], y0 + M]} p1={[xs[2], y0 + M]} p2={botTri[2]} r={9} />
      {sides.map((s, i) => (
        <KText key={`s${i}`} p={[(xs[i] + xs[i + 1]) / 2, y0 + M / 2]} t={String(s)} s={12} c={K_BLUE} />
      ))}
      <KLine a={[xs[0], y0 + M + 52]} b={[xs[3], y0 + M + 52]} c={K_RED} w={1.6} />
      <KLine a={[xs[0], y0 + M + 46]} b={[xs[0], y0 + M + 58]} c={K_RED} w={1.6} />
      <KLine a={[xs[3], y0 + M + 46]} b={[xs[3], y0 + M + 58]} c={K_RED} w={1.6} />
      <KText p={[(xs[0] + xs[3]) / 2, y0 + M + 68]} t="K(alap) = 3 + 4 + 5 = 12, T(palást) = 12 · M" s={11.5} c={K_RED} />
      <KLine a={[xs[3] + 14, y0]} b={[xs[3] + 14, y0 + M]} c={K_PURPLE} w={1.6} />
      <KText p={[xs[3] + 30, y0 + M / 2]} t="M" s={13} c={K_PURPLE} />
    </Frame>
  );
};

// 3. ábra: a nyolcszög alapú hasáb alaplapja
export const OctaBaseAreaSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const s = 56;
  const ox = 50;
  const oy = 60;
  const T = (p: [number, number]): P2 => [ox + p[0] * s, oy + p[1] * s];
  const OCTA: [number, number][] = [[1, 0], [2, 0], [3, 1], [3, 2], [2, 3], [1, 3], [0, 2], [0, 1]];
  return (
    <Frame title="A 2. lecke testének alaplapja: 9 − 4 · ½ = 7 területegység" className={className}>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <KLine a={T([i, 0])} b={T([i, 3])} c="#cbd5e1" w={1} />
          <KLine a={T([0, i])} b={T([3, i])} c="#cbd5e1" w={1} />
        </g>
      ))}
      {[[[0, 0], [1, 0], [0, 1]], [[2, 0], [3, 0], [3, 1]], [[3, 2], [3, 3], [2, 3]], [[1, 3], [0, 3], [0, 2]]].map((tri, i) => (
        <KPoly key={i} p={(tri as [number, number][]).map(T)} fill="#fecaca" op={0.7} c="#f87171" w={1} dash />
      ))}
      <KPoly p={OCTA.map(T)} fill="#e0e7ff" op={0.85} c={K_EDGE} w={2} />
      <KText p={[ox + 1.5 * s, oy - 12]} t="1" c={K_BLUE} />
      <KText p={[ox + 2.5 * s + 12, oy + 0.5 * s - 10]} t="√2" c={K_RED} />
      <text x="260" y="80" fontSize="12" fill="#334155">T(alap) = 3² − 4 · ½ = 7</text>
      <text x="260" y="104" fontSize="12" fill="#334155">K(alap) = 4 · 1 + 4 · √2</text>
      <text x="260" y="128" fontSize="12" fill="#334155">M = 3</text>
      <text x="260" y="164" fontSize="12.5" fontWeight="bold" fill="#0f172a">V = 7 · 3 = 21</text>
      <text x="260" y="190" fontSize="12.5" fontWeight="bold" fill="#0f172a">A = 2 · 7 + (4 + 4√2) · 3</text>
      <text x="260" y="210" fontSize="12.5" fontWeight="bold" fill="#0f172a">  = 26 + 12√2 ≈ 42,97</text>
    </Frame>
  );
};

// 4. ábra: az I-tartó keresztmetszete
export const IBeamSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const k = 1.3; // px / mm
  const ox = 70;
  const oy = 55;
  const W = 60 * k;
  const H = 140 * k;
  const tf = 10 * k;
  const tw = 7 * k;
  const cx = ox + W / 2;
  const pts: P2[] = [
    [ox, oy], [ox + W, oy], [ox + W, oy + tf], [cx + tw / 2, oy + tf], [cx + tw / 2, oy + H - tf], [ox + W, oy + H - tf],
    [ox + W, oy + H], [ox, oy + H], [ox, oy + H - tf], [cx - tw / 2, oy + H - tf], [cx - tw / 2, oy + tf], [ox, oy + tf]
  ];
  return (
    <Frame title="6 m hosszú I-tartó keresztmetszete (mm)" className={className}>
      <KPoly p={pts} fill="#cbd5e1" c={K_EDGE} w={2} />
      <KText p={[cx, oy - 10]} t="60" s={11} c={K_BLUE} />
      <KText p={[ox - 22, oy + H / 2]} t="140" s={11} c={K_BLUE} />
      <KText p={[ox + W + 16, oy + tf / 2]} t="10" s={11} c={K_BLUE} />
      <KText p={[cx + 18, oy + H / 2]} t="7" s={11} c={K_BLUE} />
      <text x="230" y="80" fontSize="12" fill="#334155">T = 2 · 60 · 10 + 120 · 7</text>
      <text x="230" y="100" fontSize="12.5" fontWeight="bold" fill="#0f172a">T = 2040 mm² = 20,4 cm²</text>
      <text x="230" y="130" fontSize="12" fill="#334155">V = 20,4 · 600 = 12 240 cm³</text>
      <text x="230" y="150" fontSize="12.5" fontWeight="bold" fill="#0f172a">ρ = 96 000 g : 12 240 cm³ ≈ 7,84 g/cm³</text>
      <text x="230" y="180" fontSize="12" fill="#334155">K = 2 · 60 + 4 · 10 + 4 · 26,5 + 2 · 120</text>
      <text x="230" y="200" fontSize="12" fill="#334155">K = 506 mm = 50,6 cm</text>
      <text x="230" y="230" fontSize="12.5" fontWeight="bold" fill="#0f172a">A = 2 · 20,4 + 50,6 · 600 ≈ 30 401 cm²</text>
    </Frame>
  );
};

// 5. ábra: a vízelvezető árok keresztmetszete
export const DrainSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const k = 110; // px / m
  const ox = 75;
  const oy = 80;
  const A: P2 = [ox, oy];
  const B: P2 = [ox + 3 * k, oy];
  const C: P2 = [ox + 2.5 * k, oy + 0.375 * k];
  const D: P2 = [ox + 0.5 * k, oy + 0.375 * k];
  const F: P2 = [D[0], oy];
  return (
    <Frame title="Vízelvezető árok: egyenlő szárú trapéz keresztmetszet" className={className}>
      <KPoly p={[A, B, C, D]} fill="#bae6fd" c={K_EDGE} w={2} />
      <KLine a={D} b={F} c={K_PURPLE} w={1.8} dash />
      <KRight v={F} p1={D} p2={B} r={10} />
      <KText p={[(A[0] + B[0]) / 2, oy - 12]} t="3 m" s={12} c={K_BLUE} />
      <KText p={[(C[0] + D[0]) / 2, C[1] + 14]} t="2 m" s={12} c={K_BLUE} />
      <KText p={[kMid(A, D)[0] - 28, kMid(A, D)[1] + 6]} t="62,5 cm" s={11} c={K_BLUE} />
      <KText p={[D[0] + 14, kMid(D, F)[1] + 4]} t="m" s={12} c={K_PURPLE} />
      <KText p={[(A[0] + D[0]) / 2 + 4, oy + 14]} t="0,5" s={10} c="#64748b" />
      <text x="240" y="210" fontSize="12" textAnchor="middle" fill="#334155">m = √(0,625² − 0,5²) = 0,375 m = 37,5 cm</text>
      <text x="240" y="234" fontSize="12.5" fontWeight="bold" textAnchor="middle" fill="#0f172a">T = (3 + 2)/2 · 0,375 = 0,9375 m²</text>
      <text x="240" y="256" fontSize="12.5" fontWeight="bold" textAnchor="middle" fill="#0f172a">V = 0,9375 · 120 = 112,5 m³ = 112 500 liter</text>
    </Frame>
  );
};

// 6. ábra: kártyapakli – egyenes és ferde hasáb azonos térfogattal
export const CardDeckSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const n = 12;
  const cardW = 110;
  const cardH = 9;
  const deck = (x0: number, shift: number) =>
    Array.from({ length: n }, (_, i) => {
      const y = 240 - (i + 1) * cardH;
      const x = x0 + shift * i;
      return <rect key={i} x={x} y={y} width={cardW} height={cardH} fill={i % 2 ? '#dbeafe' : '#e0e7ff'} stroke="#4338ca" strokeWidth="1" />;
    });
  return (
    <Frame title="Ugyanaz a kártyapakli: egyenes és ferde hasáb, azonos térfogat" className={className}>
      {deck(50, 0)}
      {deck(250, 8)}
      <KLine a={[30, 240]} b={[30, 240 - n * cardH]} c={K_PURPLE} w={1.6} />
      <KText p={[20, 240 - (n * cardH) / 2]} t="M" s={12} c={K_PURPLE} />
      <KLine a={[245, 240 - n * cardH]} b={[245, 240]} c={K_PURPLE} w={1.6} dash />
      <KRight v={[245, 240]} p1={[245, 200]} p2={[300, 240]} r={9} />
      <KText p={[236, 190]} t="M" s={12} c={K_PURPLE} a="end" />
      <KLine a={[20, 240]} b={[460, 240]} c="#94a3b8" w={1} />
      <text x="240" y="262" fontSize="12" textAnchor="middle" fill="#334155">Minden magasságban egybevágó a metszet, és a magasság is egyenlő:</text>
      <text x="240" y="280" fontSize="12.5" fontWeight="bold" textAnchor="middle" fill="#0f172a">V = T(alap) · M mindkét testnél</text>
    </Frame>
  );
};


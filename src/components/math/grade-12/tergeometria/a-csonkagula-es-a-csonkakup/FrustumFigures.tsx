import React from 'react';
import {
  QFig,
  Txt,
  Seg,
  Poly,
  RightMark,
  AngleArc,
  PolyBody,
  polyhedron,
  frustumSolid,
  pyramidSolid,
  RoundBody,
  roundSolid,
  sectorPath,
  polar,
  SK,
  P2
} from '../a-gula/SolidSketch';

type FigProps = { className?: string };
const CLS = 'w-full h-auto max-w-xl mx-auto';

// 1. ábra: csonkagúla és csonkakúp a kiegészítő testtel
export const FrustumPartsSvg: React.FC<FigProps> = ({ className = CLS }) => {
  const full = pyramidSolid(4, 1, 2);
  const gFull = polyhedron(full.verts, full.faces, { x: 20, y: 34, w: 150, h: 170 });
  const f = frustumSolid(4, 1, 0.45, 1.1);
  const top = [0, 1, 2, 3].map((i) => gFull.P(f.verts[4 + i]));
  const bot = [0, 1, 2, 3].map((i) => gFull.pts[i]);
  const apex = gFull.pts[4];
  const g2 = roundSolid(1, 0.45, 1.1, { x: 200, y: 90, w: 140, h: 114 });
  const cone = roundSolid(1, 0, 2, { x: 200, y: 34, w: 140, h: 170 });
  return (
    <QFig w={360} h={240} title="Csonkagúla és csonkakúp" className={className}>
      <PolyBody g={gFull} fill="rgba(99,102,241,0.08)" />
      <Poly p={top} fill="rgba(245,158,11,0.25)" color={SK.arc} w={1.6} />
      {top.map((p, i) => (
        <Seg key={i} a={p} b={apex} color={SK.aux} dash w={1.1} />
      ))}
      <Txt p={[apex[0] + 8, apex[1] + 6]} t="kiegészítő gúla" anchor="start" size={9.5} color={SK.aux} />
      <Txt p={[(bot[0][0] + bot[1][0]) / 2, bot[0][1] - 9]} t="alaplap" size={10} />
      <Txt p={[top[2][0] + 6, top[2][1] - 6]} t="fedőlap" anchor="start" size={10} color={SK.arc} />
      <Seg a={cone.BL} b={cone.T} color={SK.aux} dash w={1.1} />
      <Seg a={cone.BR} b={cone.T} color={SK.aux} dash w={1.1} />
      <RoundBody g={g2} />
      <Seg a={g2.T} b={g2.B} color={SK.red} dash w={1.4} />
      <RightMark v={g2.B} p1={g2.T} p2={g2.BR} r={8} />
      <Txt p={[g2.B[0] + 5, (g2.T[1] + g2.B[1]) / 2 + 6]} t="M" anchor="start" color={SK.red} />
      <Txt p={[g2.TR[0] + 14, (g2.TR[1] + g2.BR[1]) / 2]} t="alkotó" anchor="start" size={10} color={SK.green} />
      <Txt p={[cone.T[0] + 8, cone.T[1] + 4]} t="kiegészítő kúp" anchor="start" size={9.5} color={SK.aux} />
      <Txt p={[g2.B[0], 222]} t="csonkakúp" size={10.5} />
      <Txt p={[95, 222]} t="csonkagúla" size={10.5} />
    </QFig>
  );
};

// 2. ábra: a gúla elmetszése (1. feladat)
export const PyramidCutSvg: React.FC<FigProps> = ({ className = CLS }) => {
  const full = pyramidSolid(4, 1, 2.2);
  const g = polyhedron(full.verts, full.faces, { x: 90, y: 30, w: 180, h: 180 });
  const apex = g.pts[4];
  const O = g.P([0, 0, 0]);
  const cutY = 2.2 * (6 / 8);
  const Oc = g.P([0, cutY, 0]);
  const top = [0, 1, 2, 3].map((i) => {
    const v = full.verts[i];
    return g.P([v[0] * 0.25, cutY, v[2] * 0.25]);
  });
  return (
    <QFig w={360} h={240} title="Gúla elmetszése a csúcstól 2 dm-re (1. feladat)" className={className}>
      <PolyBody g={g} />
      <Poly p={top} fill="rgba(245,158,11,0.3)" color={SK.arc} w={1.6} />
      <Seg a={apex} b={O} color={SK.red} dash w={1.4} />
      <RightMark v={O} p1={apex} p2={g.pts[1]} r={8} />
      <Txt p={[O[0] + 8, (Oc[1] + O[1]) / 2]} t="6 dm" anchor="start" color={SK.red} size={10.5} />
      <Txt p={[O[0] + 8, (apex[1] + Oc[1]) / 2]} t="2 dm" anchor="start" color={SK.aux} size={10.5} />
      <Txt p={[(g.pts[0][0] + g.pts[1][0]) / 2, g.pts[0][1] + 12]} t="a = 5 cm" size={10.5} />
      <Txt p={[352, 196]} t="λ = 2 / 8 = 1/4" anchor="end" size={10.5} color={SK.ang} />
      <Txt p={[352, 212]} t="fedőél = 5/4 = 1,25 cm" anchor="end" size={10.5} color={SK.arc} />
    </QFig>
  );
};

// 3. ábra: szimmetrikus trapéz forgatása (2. feladat)
export const TrapezoidRotationSvg: React.FC<FigProps> = ({ className = CLS }) => {
  const s = 9;
  const cx = 110;
  const yB = 170;
  const h = Math.sqrt(3) * s;
  const BL: P2 = [cx - 8 * s, yB];
  const BR: P2 = [cx + 8 * s, yB];
  const TR: P2 = [cx + 5 * s, yB - h];
  const TL: P2 = [cx - 5 * s, yB - h];
  const F: P2 = [cx + 5 * s, yB];
  const g = roundSolid(8, 5, Math.sqrt(3), { x: 220, y: 90, w: 130, h: 80 });
  return (
    <QFig w={360} h={240} title="Szimmetrikus trapéz forgatása (2. feladat)" className={className}>
      <Seg a={[cx, 60]} b={[cx, 200]} color={SK.aux} dash w={1.1} />
      <Poly p={[BL, BR, TR, TL]} fill="rgba(99,102,241,0.14)" />
      <Seg a={TR} b={F} color={SK.red} dash w={1.3} />
      <RightMark v={F} p1={TR} p2={BR} r={7} />
      <AngleArc v={BR} p1={BL} p2={TR} t="30°" r={16} tr={30} />
      <AngleArc v={BL} p1={BR} p2={TL} t="30°" r={16} tr={30} />
      <Txt p={[cx, yB + 13]} t="16 cm" size={10.5} />
      <Txt p={[cx, yB - h - 9]} t="10 cm" size={10.5} />
      <path d="M 196 130 L 214 130" stroke={SK.ink} strokeWidth="2" />
      <path d="M 210 125 L 218 130 L 210 135 z" fill={SK.ink} />
      <RoundBody g={g} />
      <Txt p={[285, 205]} t="R = 8, r = 5" size={10.5} />
      <Txt p={[285, 221]} t="m = √3, a = 2√3" size={10.5} color={SK.red} />
    </QFig>
  );
};

// 4. ábra: csonkakúp alakú bonbon (3. feladat)
export const BonbonSvg: React.FC<FigProps> = ({ className = CLS }) => {
  const g = roundSolid(1.65, 0.75, 1.2, { x: 70, y: 50, w: 170, h: 140 });
  const P: P2 = [g.TR[0], g.B[1]];
  return (
    <QFig w={360} h={240} title="Csonkakúp alakú bonbon (3. feladat)" className={className}>
      <RoundBody g={g} fill="rgba(120,53,15,0.18)" color="#78350f" />
      <Seg a={g.T} b={g.B} color={SK.red} dash w={1.4} />
      <Seg a={g.TR} b={P} color={SK.aux} dash w={1.2} />
      <Seg a={g.B} b={g.BR} color={SK.aux} w={1.2} />
      <Seg a={g.T} b={g.TR} color={SK.aux} w={1.2} />
      <RightMark v={P} p1={g.TR} p2={g.BR} r={7} />
      <Seg a={g.TR} b={g.BR} color={SK.green} w={2.4} />
      <Txt p={[(g.T[0] + g.TR[0]) / 2, g.T[1] - 9]} t="0,75" size={10} />
      <Txt p={[(g.B[0] + P[0]) / 2, g.B[1] - 7]} t="0,75" size={10} color={SK.aux} />
      <Txt p={[(P[0] + g.BR[0]) / 2, g.B[1] + 11]} t="0,9" size={10} />
      <Txt p={[(g.TR[0] + g.BR[0]) / 2 + 9, (g.TR[1] + g.BR[1]) / 2 - 2]} t="1,5" anchor="start" size={10.5} color={SK.green} />
      <Txt p={[g.B[0] - 5, (g.T[1] + g.B[1]) / 2]} t="M" anchor="end" color={SK.red} />
      <Txt p={[260, 80]} t="d₁ = 3,3 cm" anchor="start" size={10.5} />
      <Txt p={[260, 96]} t="d₂ = 1,5 cm" anchor="start" size={10.5} />
      <Txt p={[260, 112]} t="alkotó = 1,5 cm" anchor="start" size={10.5} color={SK.green} />
      <Txt p={[260, 140]} t="M = √(1,5² − 0,9²)" anchor="start" size={10.5} color={SK.red} />
      <Txt p={[260, 156]} t="= 1,2 cm" anchor="start" size={10.5} color={SK.red} />
    </QFig>
  );
};

// 5. ábra: derékszögű trapéz forgatása a derékszögű szára körül (HF 1.)
export const RightTrapezoidSvg: React.FC<FigProps> = ({ className = CLS }) => {
  const s = 7;
  const A: P2 = [80, 190];
  const B: P2 = [80 + 16 * s, 190];
  const H = Math.sqrt(119) * s;
  const D: P2 = [80, 190 - H];
  const C: P2 = [80 + 11 * s, 190 - H];
  const P: P2 = [C[0], 190];
  return (
    <QFig w={360} h={240} title="Derékszögű trapéz forgatása (HF 1.)" className={className}>
      <Seg a={[80, 50]} b={[80, 210]} color={SK.aux} dash w={1.1} />
      <Poly p={[A, B, C, D]} fill="rgba(16,185,129,0.15)" color={SK.green} />
      <Seg a={C} b={P} color={SK.aux} dash w={1.2} />
      <RightMark v={A} p1={D} p2={B} r={9} />
      <RightMark v={D} p1={A} p2={C} r={9} />
      <Txt p={[(A[0] + B[0]) / 2, A[1] + 13]} t="16 cm (R)" size={10.5} />
      <Txt p={[(D[0] + C[0]) / 2, D[1] - 9]} t="11 cm (r)" size={10.5} />
      <Txt p={[(C[0] + B[0]) / 2 + 9, (C[1] + B[1]) / 2]} t="12 cm (a)" anchor="start" size={10.5} color={SK.green} />
      <Txt p={[A[0] - 6, (A[1] + D[1]) / 2]} t="M = ?" anchor="end" />
      <Txt p={[(P[0] + B[0]) / 2, P[1] - 7]} t="5" size={10} color={SK.aux} />
      <Txt p={[190, 60]} t="tengely: a derékszögű szár" anchor="start" size={9.5} color={SK.aux} />
      <Txt p={[190, 76]} t="M = √(12² − 5²) = √119" anchor="start" size={9.5} color={SK.red} />
    </QFig>
  );
};

// 6. ábra: az A vonalú szoknya szabásmintája – körgyűrűcikk (HF 3.)
export const SkirtPatternSvg: React.FC<FigProps> = ({ className = CLS }) => {
  const c: P2 = [180, 26];
  const r1 = 77.1 * 1.2;
  const r2 = 97.1 * 1.2;
  const r3 = 157.1 * 1.2;
  const ang = 53.7;
  const start = 270 - ang / 2;
  const ring = (ra: number, rb: number) => {
    const p1 = polar(c, ra, start);
    const p2 = polar(c, rb, start);
    const p3 = polar(c, rb, start + ang);
    const p4 = polar(c, ra, start + ang);
    return `M ${p1[0]} ${p1[1]} L ${p2[0]} ${p2[1]} A ${rb} ${rb} 0 0 0 ${p3[0]} ${p3[1]} L ${p4[0]} ${p4[1]} A ${ra} ${ra} 0 0 1 ${p1[0]} ${p1[1]} Z`;
  };
  const arc = (rr: number) => {
    const p = polar(c, rr, start);
    const q = polar(c, rr, start + ang);
    return `M ${p[0]} ${p[1]} A ${rr} ${rr} 0 0 0 ${q[0]} ${q[1]}`;
  };
  const A = polar(c, r1, start + ang);
  const Bp = polar(c, r2, start + ang);
  const Cp = polar(c, r3, start + ang);
  return (
    <QFig w={360} h={240} title="A szoknya szabásmintája (HF 3.)" className={className}>
      <path d={sectorPath(c, r3, start, ang)} fill="none" stroke={SK.aux} strokeWidth="0.8" strokeDasharray="3 3" />
      <path d={ring(r1, r3)} fill="rgba(236,72,153,0.15)" stroke="#db2777" strokeWidth="1.8" />
      <path d={arc(r2)} fill="none" stroke={SK.blue} strokeWidth="1.4" strokeDasharray="5 3" />
      <Txt p={[A[0] + 8, A[1]]} t="A" anchor="start" size={10.5} />
      <Txt p={[Bp[0] + 8, Bp[1]]} t="B" anchor="start" size={10.5} />
      <Txt p={[Cp[0] + 8, Cp[1]]} t="C" anchor="start" size={10.5} />
      <Txt p={[20, 60]} t="derékvonal: 23π ≈ 72,3 cm" anchor="start" size={9.5} color="#be185d" />
      <Txt p={[20, 76]} t="csípővonal: 91 cm" anchor="start" size={9.5} color={SK.blue} />
      <Txt p={[20, 92]} t="AB = 20 cm, AC = 80 cm" anchor="start" size={9.5} color={SK.aux} />
      <Txt p={[20, 222]} t="2 egyforma körgyűrűcikk = csonkakúp palástja" anchor="start" size={9.5} color={SK.ang} />
    </QFig>
  );
};

import React from 'react';
import {
  QFig,
  Txt,
  Seg,
  Poly,
  Dot,
  RightMark,
  AngleArc,
  PolyBody,
  polyhedron,
  pyramidSolid,
  ringN,
  mid2,
  away2,
  SK,
  P3
} from './SolidSketch';

type FigProps = { className?: string };
const CLS = 'w-full h-auto max-w-xl mx-auto';

// 1. ábra: a gúla részei (ötoldalú gúla)
export const PyramidPartsSvg: React.FC<FigProps> = ({ className = CLS }) => {
  const s = pyramidSolid(5, 1, 1.5, ringN(5, 1, 0, -Math.PI / 2 + Math.PI / 5));
  const g = polyhedron(s.verts, s.faces, { x: 70, y: 40, w: 220, h: 170 });
  const apex = g.pts[5];
  const O = g.P([0, 0, 0]);
  const e01 = mid2(g.pts[0], g.pts[1]);
  return (
    <QFig w={360} h={240} title="A gúla részei (ötoldalú gúla)" className={className}>
      <PolyBody g={g} />
      <Seg a={apex} b={O} color={SK.red} dash w={1.6} />
      <RightMark v={O} p1={apex} p2={g.pts[1]} r={10} />
      <Dot p={apex} />
      <Txt p={[apex[0] + 6, apex[1] - 10]} t="a gúla csúcsa" anchor="start" size={11} />
      <Txt p={[(apex[0] + O[0]) / 2 - 6, (apex[1] + O[1]) / 2]} t="magasság (M)" anchor="end" size={10} color={SK.red} />
      <Txt p={away2(mid2(apex, g.pts[1]), g.center2, 30)} t="oldalél" size={10.5} color={SK.line} />
      <Txt p={mid2(mid2(apex, g.pts[0]), g.pts[1])} t="oldallap" size={10} color={SK.purple} />
      <Txt p={away2(e01, g.center2, 14)} t="alapél" size={10.5} />
      <Txt p={[O[0] + 30, O[1] + 6]} t="alaplap" size={10} color={SK.aux} />
    </QFig>
  );
};

// 2. ábra: háromoldalú gúla, szabályos háromoldalú gúla, szabályos tetraéder
export const PyramidTypesSvg: React.FC<FigProps> = ({ className = CLS }) => {
  const t1 = pyramidSolid(3, 1, 1.4, [[-1, 0, -0.5], [1.1, 0, -0.7], [0.3, 0, 1]], [-0.5, 1.5, -0.1]);
  const t2 = pyramidSolid(3, 1, 1.7);
  const t3 = pyramidSolid(3, 1, Math.sqrt(2));
  const g1 = polyhedron(t1.verts, t1.faces, { x: 18, y: 50, w: 100, h: 110 });
  const g2 = polyhedron(t2.verts, t2.faces, { x: 130, y: 50, w: 100, h: 110 });
  const g3 = polyhedron(t3.verts, t3.faces, { x: 242, y: 60, w: 100, h: 100 });
  const lbl = (g: typeof g2, i: number, j: number, t: string) => <Txt p={away2(mid2(g.pts[i], g.pts[j]), g.center2, 9)} t={t} size={10} />;
  return (
    <QFig w={360} h={200} title="Háromoldalú gúlák" className={className}>
      <PolyBody g={g1} />
      <PolyBody g={g2} fill="rgba(16,185,129,0.12)" color={SK.green} />
      {lbl(g2, 0, 1, 'a')}
      {lbl(g2, 1, 2, 'a')}
      {lbl(g2, 0, 3, 'b')}
      {lbl(g2, 1, 3, 'b')}
      <PolyBody g={g3} fill="rgba(245,158,11,0.14)" color={SK.arc} />
      {lbl(g3, 0, 1, 'a')}
      {lbl(g3, 1, 2, 'a')}
      {lbl(g3, 0, 3, 'a')}
      {lbl(g3, 1, 3, 'a')}
      <Txt p={[68, 182]} t="háromoldalú gúla" size={10} />
      <Txt p={[180, 182]} t="szabályos háromoldalú" size={10} />
      <Txt p={[292, 182]} t="szabályos tetraéder" size={10} />
    </QFig>
  );
};

/** Szabályos négyoldalú gúla közös geometriája (A B C D alap, E csúcs, F talppont). */
const squarePyr = (box: { x: number; y: number; w: number; h: number }, M = 1.26) => {
  const half = 1;
  const base: P3[] = [
    [-half, 0, -half],
    [half, 0, -half],
    [half, 0, half],
    [-half, 0, half]
  ];
  const s = pyramidSolid(4, 1, M, base, [0, M, 0]);
  const g = polyhedron(s.verts, s.faces, box);
  return { g, A: g.pts[0], B: g.pts[1], C: g.pts[2], D: g.pts[3], E: g.pts[4], F: g.P([0, 0, 0]), G: g.P([0, 0, -half]) };
};

// 3. ábra: a Kheopsz-piramis modellje
export const CheopsSvg: React.FC<FigProps> = ({ className = CLS }) => {
  const { g, A, B, C, D, E, F, G } = squarePyr({ x: 70, y: 36, w: 220, h: 170 }, 1.26);
  return (
    <QFig w={360} h={240} title="A Kheopsz-piramis mint szabályos négyoldalú gúla" className={className}>
      <PolyBody g={g} fill="rgba(245,158,11,0.15)" color="#b45309" />
      <Seg a={E} b={F} color={SK.red} dash w={1.6} />
      <Seg a={E} b={G} color={SK.blue} w={1.6} />
      <Seg a={F} b={G} color={SK.aux} dash w={1.2} />
      <RightMark v={F} p1={E} p2={G} r={9} />
      <RightMark v={G} p1={E} p2={B} r={9} />
      <Txt p={away2(A, g.center2, 10)} t="A" />
      <Txt p={away2(B, g.center2, 10)} t="B" />
      <Txt p={away2(C, g.center2, 10)} t="C" />
      <Txt p={away2(D, g.center2, 10)} t="D" />
      <Txt p={[E[0], E[1] - 10]} t="E" />
      <Txt p={[F[0] + 9, F[1] - 4]} t="F" />
      <Txt p={[G[0], G[1] + 11]} t="G" />
      <Txt p={[60, 222]} t="AB = 232,4 m" size={10.5} anchor="start" />
      <Txt p={[300, 222]} t="FE = M = 146,7 m" size={10.5} color={SK.red} anchor="end" />
      <Txt p={[(E[0] + G[0]) / 2 + 8, (E[1] + G[1]) / 2 + 4]} t="mₒ" size={10.5} color={SK.blue} anchor="start" />
    </QFig>
  );
};

// 4. ábra: a szabályos négyoldalú gúla nevezetes derékszögű háromszögei
export const PyramidRightTrianglesSvg: React.FC<FigProps> = ({ className = CLS }) => {
  const { g, B, C, E, F, G } = squarePyr({ x: 60, y: 36, w: 240, h: 170 }, 1.3);
  return (
    <QFig w={360} h={240} title="Derékszögű háromszögek a szabályos gúlában" className={className}>
      <PolyBody g={g} />
      <Poly p={[E, F, G]} fill="rgba(37,99,235,0.18)" color={SK.blue} w={1.4} />
      <Poly p={[E, F, C]} fill="rgba(220,38,38,0.12)" color={SK.red} w={1.4} />
      <RightMark v={F} p1={E} p2={G} r={9} />
      <RightMark v={G} p1={E} p2={B} r={8} />
      <AngleArc v={G} p1={F} p2={E} t="β" r={14} />
      <AngleArc v={C} p1={F} p2={E} t="α" r={16} />
      <Txt p={[F[0] + 6, (E[1] + F[1]) / 2 - 14]} t="M" anchor="start" color={SK.red} />
      <Txt p={[(E[0] + G[0]) / 2 - 7, (E[1] + G[1]) / 2]} t="mₒ" anchor="end" color={SK.blue} />
      <Txt p={[(E[0] + C[0]) / 2 + 8, (E[1] + C[1]) / 2]} t="b" anchor="start" />
      <Txt p={[(F[0] + G[0]) / 2 + 14, (F[1] + G[1]) / 2 + 8]} t="a/2" size={10} color={SK.blue} />
      <Txt p={[(F[0] + C[0]) / 2, (F[1] + C[1]) / 2 - 7]} t="R" size={10} color={SK.red} />
      <Txt p={[300, 196]} t="α: oldalél – alaplap" size={9.5} anchor="end" color={SK.ang} />
      <Txt p={[300, 210]} t="β: oldallap – alaplap" size={9.5} anchor="end" color={SK.ang} />
      <Txt p={[300, 224]} t="R = a·√2/2 (fél átló)" size={9.5} anchor="end" color={SK.aux} />
    </QFig>
  );
};

// 5. ábra: szabályos hatoldalú gúla – 2. feladat
export const HexPyramidSvg: React.FC<FigProps> = ({ className = CLS }) => {
  const s = pyramidSolid(6, 1, 1);
  const g = polyhedron(s.verts, s.faces, { x: 70, y: 40, w: 220, h: 170 });
  const O = g.P([0, 0, 0]);
  const apex = g.pts[6];
  const V = g.pts[2];
  return (
    <QFig w={360} h={240} title="Szabályos hatoldalú gúla (2. feladat)" className={className}>
      <PolyBody g={g} />
      <Seg a={apex} b={O} color={SK.red} dash w={1.6} />
      <Seg a={O} b={V} color={SK.aux} dash w={1.2} />
      <Poly p={[apex, O, V]} fill="rgba(220,38,38,0.12)" color={SK.red} w={1.2} />
      <RightMark v={O} p1={apex} p2={V} r={10} />
      <AngleArc v={V} p1={O} p2={apex} t="45°" r={18} tr={30} />
      <Txt p={[(apex[0] + V[0]) / 2 + 10, (apex[1] + V[1]) / 2 - 4]} t="7√2" anchor="start" />
      <Txt p={[O[0] - 6, (apex[1] + O[1]) / 2]} t="M" anchor="end" color={SK.red} />
      <Txt p={[(O[0] + V[0]) / 2, (O[1] + V[1]) / 2 - 8]} t="R = a" size={10} color={SK.aux} />
    </QFig>
  );
};

// 6. ábra: a szabályos tetraéder lapjainak hajlásszöge
export const TetraDihedralSvg: React.FC<FigProps> = ({ className = CLS }) => {
  const t = pyramidSolid(3, 1, Math.sqrt(2));
  const g = polyhedron(t.verts, t.faces, { x: 80, y: 36, w: 200, h: 170 });
  const [A, B, C, D] = g.pts;
  const F = mid2(A, B);
  const O = g.P([0, 0, 0]);
  return (
    <QFig w={360} h={240} title="Szabályos tetraéder: két lap hajlásszöge" className={className}>
      <PolyBody g={g} />
      <Seg a={D} b={F} color={SK.blue} w={1.6} />
      <Seg a={C} b={F} color={SK.blue} dash w={1.4} />
      <Seg a={D} b={O} color={SK.red} dash w={1.2} />
      <AngleArc v={F} p1={C} p2={D} t="φ" r={16} />
      <Txt p={away2(A, g.center2, 10)} t="A" />
      <Txt p={away2(B, g.center2, 10)} t="B" />
      <Txt p={away2(C, g.center2, 10)} t="C" />
      <Txt p={[D[0], D[1] - 10]} t="D" />
      <Txt p={[F[0], F[1] + 11]} t="F" />
      <Txt p={[(A[0] + F[0]) / 2, A[1] + 12]} t="8 cm" size={10} />
      <Txt p={[14, 40]} t="DF = CF = 4√3 cm" size={10} anchor="start" color={SK.blue} />
      <Txt p={[14, 56]} t="cos φ = 1/3  ⇒  φ ≈ 70,5°" size={10} anchor="start" color={SK.ang} />
    </QFig>
  );
};

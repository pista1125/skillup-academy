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
  pyramidSolid,
  mid2,
  away2,
  SK,
  P2,
  P3
} from '../a-gula/SolidSketch';

type FigProps = { className?: string };
const CLS = 'w-full h-auto max-w-xl mx-auto';

/** „Háromszögletű” tejszínes doboz: három egymásra merőleges, 10 cm-es él egy csúcsból. */
export const MilkTetraSvg: React.FC<FigProps> = ({ className = CLS }) => {
  const O: P3 = [0, 0, 0];
  const X: P3 = [10, 0, 0];
  const Z: P3 = [0, 0, 10];
  const Y: P3 = [0, 10, 0];
  const g = polyhedron([O, X, Z, Y], [[0, 1, 2], [0, 1, 3], [0, 2, 3], [1, 2, 3]], { x: 40, y: 34, w: 180, h: 165 });
  const [pO, pX, pZ, pY] = g.pts;
  return (
    <QFig w={360} h={240} title="A tejszínes doboz: tetraéder" className={className}>
      <Poly p={[pX, pZ, pY]} fill="rgba(245,158,11,0.18)" color="none" w={0} />
      <PolyBody g={g} />
      <RightMark v={pO} p1={pX} p2={pY} r={10} />
      <RightMark v={pO} p1={pZ} p2={pY} r={8} />
      <Txt p={[(pO[0] + pX[0]) / 2, pO[1] + 13]} t="10 cm" size={10.5} />
      <Txt p={[pO[0] - 6, (pO[1] + pY[1]) / 2]} t="10 cm" size={10.5} anchor="end" />
      <Txt p={[(pO[0] + pZ[0]) / 2 - 8, (pO[1] + pZ[1]) / 2 - 6]} t="10 cm" size={10} color={SK.aux} anchor="end" />
      <Txt p={[(pX[0] + pY[0]) / 2 + 10, (pX[1] + pY[1]) / 2 - 4]} t="10√2" size={10.5} anchor="start" color={SK.ang} />
      <Txt p={[346, 70]} t="3 derékszögű lap: 3 · 50 cm²" size={10} anchor="end" color={SK.aux} />
      <Txt p={[346, 86]} t="szabályos lap: (10√2)²·√3/4 ≈ 86,6 cm²" size={10} anchor="end" color={SK.ang} />
    </QFig>
  );
};

/** Négyzet alapú gúla hálója (HF 1.: 30 cm-es négyzet és 4 szabályos háromszög). */
export const PyramidNetSvg: React.FC<FigProps> = ({ className = CLS }) => {
  const s = 60;
  const c: P2 = [180, 125];
  const A: P2 = [c[0] - s / 2, c[1] + s / 2];
  const B: P2 = [c[0] + s / 2, c[1] + s / 2];
  const C: P2 = [c[0] + s / 2, c[1] - s / 2];
  const D: P2 = [c[0] - s / 2, c[1] - s / 2];
  const h = (s * Math.sqrt(3)) / 2;
  return (
    <QFig w={360} h={240} title="Négyzet alapú gúla hálója" className={className}>
      <Poly p={[A, B, C, D]} fill="rgba(16,185,129,0.15)" color={SK.green} />
      <Poly p={[A, B, [c[0], A[1] + h]]} fill="rgba(99,102,241,0.12)" />
      <Poly p={[C, D, [c[0], D[1] - h]]} fill="rgba(99,102,241,0.12)" />
      <Poly p={[B, C, [B[0] + h, c[1]]]} fill="rgba(99,102,241,0.12)" />
      <Poly p={[D, A, [A[0] - h, c[1]]]} fill="rgba(99,102,241,0.12)" />
      <Txt p={[c[0], c[1]]} t="30 cm" size={10} color={SK.green} />
      <Txt p={[c[0] - 26, A[1] + 26]} t="30" size={10} />
      <Txt p={[B[0] + 30, c[1] - 26]} t="30" size={10} />
      <Txt p={[40, 214]} t="alaplap: 30 × 30 cm-es négyzet" size={10} anchor="start" color={SK.green} />
      <Txt p={[40, 228]} t="oldallapok: 30 cm-es szabályos háromszögek" size={10} anchor="start" color={SK.line} />
    </QFig>
  );
};

/** Azonos alapú és magasságú hasáb és gúla: V_gúla = V_hasáb / 3. */
export const PrismVsPyramidSvg: React.FC<FigProps> = ({ className = CLS }) => {
  const base: P3[] = [
    [-1, 0, -1],
    [1, 0, -1],
    [1, 0, 1],
    [-1, 0, 1]
  ];
  const top: P3[] = base.map((p) => [p[0], 2, p[2]] as P3);
  const prism = polyhedron([...base, ...top], [[0, 1, 2, 3], [4, 5, 6, 7], [0, 1, 5, 4], [1, 2, 6, 5], [2, 3, 7, 6], [3, 0, 4, 7]], {
    x: 30,
    y: 40,
    w: 130,
    h: 150
  });
  const pyr = pyramidSolid(4, 1, 2, base, [0, 2, 0]);
  const gp = polyhedron(pyr.verts, pyr.faces, { x: 200, y: 40, w: 130, h: 150 }, top);
  const O1 = prism.P([0, 0, 0]);
  const O2 = gp.P([0, 0, 0]);
  const T2 = gp.pts[4];
  return (
    <QFig w={360} h={240} title="Azonos alapterület és magasság" className={className}>
      <PolyBody g={prism} fill="rgba(16,185,129,0.12)" color={SK.green} />
      <PolyBody g={gp} />
      <Seg a={T2} b={O2} color={SK.red} dash w={1.4} />
      <RightMark v={O2} p1={T2} p2={gp.pts[1]} r={8} />
      <Txt p={[O1[0], 212]} t="hasáb: V = T · M" size={11} color={SK.green} />
      <Txt p={[O2[0], 212]} t="gúla: V = T · M / 3" size={11} color={SK.line} />
      <Txt p={[O2[0] + 6, (T2[1] + O2[1]) / 2]} t="M" anchor="start" color={SK.red} />
      <Txt p={[180, 230]} t="3 gúla térfogata = 1 hasáb térfogata" size={10} color={SK.aux} />
    </QFig>
  );
};

/** Kockába írt tetraéder, amelynek mind a négy lapja derékszögű háromszög (2. feladat). */
export const CubeTetraSvg: React.FC<FigProps> = ({ className = CLS }) => {
  const cube: P3[] = [
    [0, 0, 0],
    [10, 0, 0],
    [10, 0, 10],
    [0, 0, 10],
    [0, 10, 0],
    [10, 10, 0],
    [10, 10, 10],
    [0, 10, 10]
  ];
  const g = polyhedron(cube, [[0, 1, 2, 3], [4, 5, 6, 7], [0, 1, 5, 4], [1, 2, 6, 5], [2, 3, 7, 6], [3, 0, 4, 7]], { x: 90, y: 30, w: 180, h: 150 });
  const A = g.pts[0];
  const B = g.pts[1];
  const C = g.pts[2];
  const D = g.pts[6];
  return (
    <QFig w={360} h={240} title="Tetraéder a 10 cm élű kockában" className={className}>
      <PolyBody g={g} fill="rgba(148,163,184,0.08)" color="#94a3b8" w={1.2} />
      <Poly p={[A, B, D]} fill="rgba(220,38,38,0.12)" color="none" w={0} />
      <Seg a={A} b={B} color={SK.red} w={2.2} />
      <Seg a={B} b={C} color={SK.red} w={2.2} />
      <Seg a={C} b={D} color={SK.red} w={2.2} />
      <Seg a={A} b={C} color={SK.red} w={1.6} dash />
      <Seg a={B} b={D} color={SK.red} w={2} />
      <Seg a={A} b={D} color={SK.red} w={2} />
      <RightMark v={B} p1={A} p2={C} r={9} />
      <Txt p={away2(A, g.center2, 10)} t="A" />
      <Txt p={away2(B, g.center2, 10)} t="B" />
      <Txt p={[C[0] + 10, C[1] + 4]} t="C" />
      <Txt p={away2(D, g.center2, 10)} t="D" />
      <Txt p={[(A[0] + B[0]) / 2, A[1] + 13]} t="10 cm" size={10} />
      <Txt p={[20, 214]} t="élek: 10, 10, 10, 10√2, 10√2, 10√3 cm" size={10} anchor="start" color={SK.aux} />
      <Txt p={[20, 228]} t="mind a 4 lap derékszögű háromszög" size={10} anchor="start" color={SK.red} />
    </QFig>
  );
};

/** Háztető (3. feladat): 10 m × 7 m-es téglalap, 6 m-es gerinc, 3,2 m magas. */
export const RoofSvg: React.FC<FigProps> = ({ className = CLS }) => {
  const v: P3[] = [
    [0, 0, 0],
    [10, 0, 0],
    [10, 0, 7],
    [0, 0, 7],
    [2, 3.2, 3.5],
    [8, 3.2, 3.5]
  ];
  const faces = [
    [0, 1, 2, 3],
    [0, 1, 5, 4],
    [3, 2, 5, 4],
    [0, 3, 4],
    [1, 2, 5]
  ];
  const g = polyhedron(v, faces, { x: 40, y: 40, w: 280, h: 150 });
  const [A, B, C, D, E, G] = g.pts;
  const P = g.P([2, 0, 3.5]);
  const Q = g.P([8, 0, 3.5]);
  const K = g.P([8, 0, 0]);
  const L = g.P([10, 0, 3.5]);
  return (
    <QFig w={360} h={240} title="A háztető mint test (3. feladat)" className={className}>
      <PolyBody g={g} fill="rgba(220,38,38,0.08)" color="#b91c1c" />
      <Seg a={E} b={P} color={SK.aux} dash w={1.3} />
      <Seg a={G} b={Q} color={SK.aux} dash w={1.3} />
      <Seg a={Q} b={K} color={SK.blue} dash w={1.2} />
      <Seg a={G} b={K} color={SK.blue} w={1.4} />
      <Seg a={Q} b={L} color={SK.green} dash w={1.2} />
      <Seg a={G} b={L} color={SK.green} w={1.4} />
      <AngleArc v={K} p1={Q} p2={G} t="α" r={14} />
      <AngleArc v={L} p1={Q} p2={G} t="β" r={12} tr={20} />
      <Txt p={away2(A, g.center2, 10)} t="A" />
      <Txt p={away2(B, g.center2, 10)} t="B" />
      <Txt p={away2(C, g.center2, 10)} t="C" />
      <Txt p={away2(D, g.center2, 10)} t="D" />
      <Txt p={[E[0] - 4, E[1] - 9]} t="E" />
      <Txt p={[G[0] + 4, G[1] - 9]} t="G" />
      <Txt p={[P[0] - 8, P[1] + 2]} t="P" size={10} color={SK.aux} />
      <Txt p={[Q[0] + 2, Q[1] + 11]} t="Q" size={10} color={SK.aux} />
      <Txt p={[(A[0] + B[0]) / 2, A[1] + 13]} t="10 m" size={10.5} />
      <Txt p={[(B[0] + C[0]) / 2 + 14, (B[1] + C[1]) / 2 + 4]} t="7 m" size={10.5} />
      <Txt p={[(E[0] + G[0]) / 2, E[1] - 9]} t="EG = 6 m" size={10.5} />
      <Txt p={[E[0] - 6, (E[1] + P[1]) / 2]} t="3,2" size={10} anchor="end" color={SK.aux} />
      <Txt p={[340, 228]} t="α: trapéz alakú lap, β: háromszög alakú lap" size={9.5} anchor="end" color={SK.ang} />
    </QFig>
  );
};

/** Kocka felbontása három egybevágó gúlára (közös csúcs G). */
export const CubeThreePyramidsSvg: React.FC<FigProps> = ({ className = CLS }) => {
  const cube: P3[] = [
    [0, 0, 0],
    [1, 0, 0],
    [1, 0, 1],
    [0, 0, 1],
    [0, 1, 0],
    [1, 1, 0],
    [1, 1, 1],
    [0, 1, 1]
  ];
  const g = polyhedron(cube, [[0, 1, 2, 3], [4, 5, 6, 7], [0, 1, 5, 4], [1, 2, 6, 5], [2, 3, 7, 6], [3, 0, 4, 7]], { x: 100, y: 34, w: 160, h: 160 });
  const p = g.pts;
  const apex = p[6];
  return (
    <QFig w={360} h={240} title="Kocka = 3 egybevágó gúla" className={className}>
      <Poly p={[p[0], p[1], p[2], p[3]]} fill="rgba(37,99,235,0.18)" color="none" w={0} />
      <Poly p={[p[0], p[1], p[5], p[4]]} fill="rgba(16,185,129,0.18)" color="none" w={0} />
      <Poly p={[p[0], p[3], p[7], p[4]]} fill="rgba(245,158,11,0.2)" color="none" w={0} />
      <PolyBody g={g} noFill />
      {[0, 1, 3, 4].map((i) => (
        <Seg key={i} a={apex} b={p[i]} color={SK.red} w={1.3} dash={i === 0 || i === 3} />
      ))}
      <Txt p={[apex[0] + 6, apex[1] - 8]} t="közös csúcs" size={10} anchor="start" color={SK.red} />
      <Txt p={[20, 214]} t="3 alaplap: a csúccsal nem szomszédos 3 lap" size={10} anchor="start" color={SK.aux} />
      <Txt p={[20, 228]} t="mindegyik gúla: V = a² · a / 3 = a³ / 3" size={10} anchor="start" color={SK.line} />
    </QFig>
  );
};

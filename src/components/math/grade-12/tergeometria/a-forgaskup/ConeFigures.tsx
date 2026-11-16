import React from 'react';
import { QFig, Txt, Seg, Poly, Dot, RightMark, AngleArc, RoundBody, roundSolid, SK, P2 } from '../a-gula/SolidSketch';

type FigProps = { className?: string };
const CLS = 'w-full h-auto max-w-xl mx-auto';

// 1. ábra: a forgáskúp részei
export const ConePartsSvg: React.FC<FigProps> = ({ className = CLS }) => {
  const g = roundSolid(1, 0, 1.6, { x: 90, y: 40, w: 180, h: 170 });
  return (
    <QFig w={360} h={240} title="A forgáskúp részei" className={className}>
      <RoundBody g={g} />
      <Seg a={g.T} b={g.B} color={SK.red} dash w={1.6} />
      <Seg a={g.B} b={g.BR} color={SK.aux} w={1.5} />
      <Seg a={g.T} b={g.BR} color={SK.green} w={2.6} />
      <RightMark v={g.B} p1={g.T} p2={g.BR} r={10} />
      <AngleArc v={g.T} p1={g.BL} p2={g.BR} t="φ" r={18} tr={30} />
      <Dot p={g.T} />
      <Txt p={[g.T[0] + 8, g.T[1] - 6]} t="a kúp csúcsa" anchor="start" size={11} />
      <Txt p={[g.B[0] - 6, (g.T[1] + g.B[1]) / 2 + 14]} t="magasság (M)" anchor="end" color={SK.red} size={10.5} />
      <Txt p={[(g.T[0] + g.BR[0]) / 2 + 10, (g.T[1] + g.BR[1]) / 2]} t="alkotó (a)" anchor="start" color={SK.green} size={10.5} />
      <Txt p={[(g.B[0] + g.BR[0]) / 2, g.B[1] - 8]} t="r" size={11} />
      <Txt p={[g.B[0], g.B[1] + g.ryB + 14]} t="alaplap (alapkör)" size={10.5} color={SK.aux} />
      <Txt p={[g.BL[0] - 4, (g.T[1] + g.B[1]) / 2 + 30]} t="palást" anchor="end" size={10.5} color={SK.line} />
      <Txt p={[346, 40]} t="φ: nyílásszög" anchor="end" size={10} color={SK.ang} />
    </QFig>
  );
};

// 2. ábra: egyenlő szárú háromszög forgatása a szimmetriatengelye körül
export const ConeFromTriangleSvg: React.FC<FigProps> = ({ className = CLS }) => {
  const T: P2 = [90, 52];
  const L: P2 = [40, 180];
  const R: P2 = [140, 180];
  const F: P2 = [90, 180];
  const g = roundSolid(1, 0, 2.56, { x: 210, y: 46, w: 110, h: 150 });
  return (
    <QFig w={360} h={240} title="Forgassunk meg egy egyenlő szárú háromszöget!" className={className}>
      <Seg a={[90, 34]} b={[90, 206]} color={SK.aux} dash w={1.2} />
      <Poly p={[L, R, T]} fill="rgba(99,102,241,0.15)" />
      <RightMark v={F} p1={T} p2={R} r={9} />
      <path d="M 62 200 A 40 9 0 1 0 118 200" fill="none" stroke={SK.arc} strokeWidth="1.6" markerEnd="url(#coneArrow)" />
      <defs>
        <marker id="coneArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill={SK.arc} />
        </marker>
      </defs>
      <Txt p={[60, 110]} t="szár" size={10} color={SK.green} anchor="end" />
      <Txt p={[90, 194]} t="alap" size={10} />
      <Txt p={[98, 120]} t="tengely" size={9.5} anchor="start" color={SK.aux} />
      <path d="M 160 120 L 196 120" stroke={SK.ink} strokeWidth="2" markerEnd="url(#coneArrow)" />
      <RoundBody g={g} />
      <Seg a={g.T} b={g.B} color={SK.aux} dash w={1.2} />
      <Txt p={[265, 222]} t="forgáskúp (egyenes körkúp)" size={10.5} />
      <Txt p={[90, 222]} t="tengelymetszet" size={10.5} />
    </QFig>
  );
};

// 3. ábra: derékszögű háromszög forgatása az egyik befogója körül (1. feladat)
export const RightTriangleConeSvg: React.FC<FigProps> = ({ className = CLS }) => {
  const g = roundSolid(1, 0, 1.4, { x: 150, y: 40, w: 180, h: 160 });
  return (
    <QFig w={360} h={240} title="Derékszögű háromszög forgatása befogó körül" className={className}>
      <RoundBody g={g} fill="rgba(99,102,241,0.06)" />
      <Poly p={[g.T, g.B, g.BR]} fill="rgba(245,158,11,0.18)" color={SK.arc} w={2} />
      <RightMark v={g.B} p1={g.T} p2={g.BR} r={10} />
      <Txt p={[g.B[0] - 6, (g.T[1] + g.B[1]) / 2]} t="b → M" anchor="end" color={SK.red} />
      <Txt p={[(g.B[0] + g.BR[0]) / 2, g.B[1] - 8]} t="a → r" size={10.5} />
      <Txt p={[(g.T[0] + g.BR[0]) / 2 + 10, (g.T[1] + g.BR[1]) / 2 - 4]} t="c → alkotó" anchor="start" color={SK.green} size={10.5} />
      <Txt p={[20, 60]} t="befogó b: forgástengely" anchor="start" size={10} color={SK.aux} />
      <Txt p={[20, 76]} t="M = b, r = a, alkotó = c" anchor="start" size={10} color={SK.ink} />
      <Txt p={[20, 92]} t="φ/2: a b befogó melletti szög" anchor="start" size={10} color={SK.ang} />
    </QFig>
  );
};

// 4. ábra: a triangulum forgatása (2. feladat)
export const TriangulumSvg: React.FC<FigProps> = ({ className = CLS }) => {
  const g = roundSolid(1, 0, Math.sqrt(3), { x: 110, y: 36, w: 160, h: 165 });
  return (
    <QFig w={360} h={240} title="A forgó triangulum (oldal 20 cm)" className={className}>
      <RoundBody g={g} fill="rgba(148,163,184,0.10)" color="#94a3b8" w={1.2} />
      <Poly p={[g.BL, g.BR, g.T]} fill="rgba(99,102,241,0.12)" color={SK.line} w={2.4} />
      <Seg a={g.T} b={g.B} color={SK.red} dash w={1.5} />
      <RightMark v={g.B} p1={g.T} p2={g.BR} r={9} />
      <AngleArc v={g.T} p1={g.BL} p2={g.BR} t="60°" r={18} tr={32} />
      <Txt p={[(g.T[0] + g.BR[0]) / 2 + 10, (g.T[1] + g.BR[1]) / 2]} t="20 cm" anchor="start" size={10.5} />
      <Txt p={[(g.B[0] + g.BR[0]) / 2, g.B[1] - 8]} t="10" size={10.5} />
      <Txt p={[g.B[0] - 6, (g.T[1] + g.B[1]) / 2 + 10]} t="M = 10√3" anchor="end" color={SK.red} size={10.5} />
      <Txt p={[20, 210]} t="K = 20π ≈ 62,8 cm" anchor="start" size={10} color={SK.aux} />
      <Txt p={[20, 226]} t="T = 100π ≈ 314,2 cm²" anchor="start" size={10} color={SK.aux} />
    </QFig>
  );
};

// 5. ábra: kúpszeletek – a palást síkmetszetei
export const ConicSectionsSvg: React.FC<FigProps> = ({ className = CLS }) => {
  const items: { x: number; name: string; line: [P2, P2] }[] = [
    { x: 50, name: 'kör', line: [[18, 120], [82, 120]] },
    { x: 135, name: 'ellipszis', line: [[100, 100], [172, 150]] },
    { x: 220, name: 'parabola', line: [[205, 90], [250, 186]] },
    { x: 305, name: 'hiperbola', line: [[318, 70], [318, 196]] }
  ];
  return (
    <QFig w={360} h={240} title="A forgáskúp palástjának síkmetszetei" className={className}>
      {items.map((it) => {
        const T: P2 = [it.x, 60];
        const L: P2 = [it.x - 36, 180];
        const R: P2 = [it.x + 36, 180];
        return (
          <g key={it.name}>
            <Poly p={[L, R, T]} fill="rgba(99,102,241,0.10)" />
            <Seg a={it.line[0]} b={it.line[1]} color={SK.red} w={2.4} />
            <Txt p={[it.x, 212]} t={it.name} size={11} color={SK.red} />
          </g>
        );
      })}
    </QFig>
  );
};

// 6. ábra: kettős kúp – rombusz forgatása az egyik átlója körül (HF 4.)
export const DoubleConeSvg: React.FC<FigProps> = ({ className = CLS }) => {
  const top = roundSolid(1, 0, 1.07, { x: 120, y: 30, w: 120, h: 92 });
  const T2: P2 = [top.B[0], top.B[1] + (top.B[1] - top.T[1])];
  return (
    <QFig w={360} h={240} title="Kettős kúp: rombusz forgatása átlója körül" className={className}>
      <RoundBody g={top} />
      <path
        d={`M ${top.BL[0]} ${top.BL[1]} A ${top.rxB} ${top.ryB} 0 0 0 ${top.BR[0]} ${top.BR[1]} L ${T2[0]} ${T2[1]} Z`}
        fill="rgba(99,102,241,0.10)"
        stroke="none"
      />
      <Seg a={top.BL} b={T2} />
      <Seg a={top.BR} b={T2} />
      <Seg a={top.T} b={T2} color={SK.aux} dash w={1.2} />
      <Seg a={top.B} b={top.BR} color={SK.aux} w={1.3} />
      <AngleArc v={top.T} p1={top.BL} p2={top.BR} t="50°" r={16} tr={28} />
      <AngleArc v={T2} p1={top.BL} p2={top.BR} t="50°" r={16} tr={28} />
      <Txt p={[(top.T[0] + top.BR[0]) / 2 + 10, (top.T[1] + top.BR[1]) / 2]} t="rombusz oldala = ?" anchor="start" size={10.5} />
      <Txt p={[(top.B[0] + top.BR[0]) / 2, top.B[1] - 7]} t="r" size={10.5} />
      <Txt p={[20, 214]} t="közös alapkör: T = 1964 cm²" anchor="start" size={10} color={SK.aux} />
    </QFig>
  );
};

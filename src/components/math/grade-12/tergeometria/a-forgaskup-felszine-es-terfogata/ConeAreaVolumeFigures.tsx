import React from 'react';
import { QFig, Txt, Seg, RightMark, AngleArc, RoundBody, roundSolid, sectorPath, polar, SK, P2 } from '../a-gula/SolidSketch';

type FigProps = { className?: string };
const CLS = 'w-full h-auto max-w-xl mx-auto';

// 1. ábra: Arkhimédész ábrája – henger, beírt gömb és kúp
export const ArchimedesSvg: React.FC<FigProps> = ({ className = CLS }) => {
  const cx = 240;
  const r = 70;
  const yB = 200;
  const yT = yB - 2 * r;
  const ry = 16;
  return (
    <QFig w={360} h={240} title="Henger, beírt gömb és kúp (Arkhimédész)" className={className}>
      <path d={`M ${cx - r} ${yB} L ${cx - r} ${yT} A ${r} ${ry} 0 0 1 ${cx + r} ${yT} L ${cx + r} ${yB} A ${r} ${ry} 0 0 1 ${cx - r} ${yB} Z`} fill="rgba(16,185,129,0.08)" />
      <path d={`M ${cx - r} ${yB} A ${r} ${ry} 0 0 1 ${cx + r} ${yB}`} fill="none" stroke={SK.aux} strokeDasharray="4 3" strokeWidth="1.2" />
      <path d={`M ${cx - r} ${yB} A ${r} ${ry} 0 0 0 ${cx + r} ${yB}`} fill="none" stroke={SK.green} strokeWidth="1.8" />
      <ellipse cx={cx} cy={yT} rx={r} ry={ry} fill="none" stroke={SK.green} strokeWidth="1.8" />
      <Seg a={[cx - r, yB]} b={[cx - r, yT]} color={SK.green} />
      <Seg a={[cx + r, yB]} b={[cx + r, yT]} color={SK.green} />
      <circle cx={cx} cy={yB - r} r={r} fill="rgba(37,99,235,0.10)" stroke={SK.blue} strokeWidth="1.8" />
      <path d={`M ${cx - r} ${yB - r} A ${r} ${ry} 0 0 0 ${cx + r} ${yB - r}`} fill="none" stroke={SK.blue} strokeWidth="1" strokeDasharray="3 3" />
      <Seg a={[cx - r, yB]} b={[cx, yT]} color={SK.red} w={2} />
      <Seg a={[cx + r, yB]} b={[cx, yT]} color={SK.red} w={2} />
      <Seg a={[cx, yB]} b={[cx + r, yB]} color={SK.ink} w={1.2} />
      <Seg a={[cx, yB - r]} b={[cx - r * 0.707, yB - r - r * 0.707]} color={SK.blue} w={1.2} />
      <Txt p={[cx + r / 2, yB - 7]} t="r" />
      <Txt p={[cx - r * 0.3, yB - r - r * 0.45]} t="r" color={SK.blue} />
      <Txt p={[cx + r + 8, (yB + yT) / 2]} t="M = 2r" anchor="start" color={SK.green} />
      <Txt p={[16, 60]} t="V(kúp) : V(gömb) :" anchor="start" size={10} />
      <Txt p={[16, 76]} t="V(henger) = 1 : 2 : 3" anchor="start" size={10} color={SK.red} />
    </QFig>
  );
};

// 2. ábra: a kúppalást kiterítése körcikké
export const ConeNetSvg: React.FC<FigProps> = ({ className = CLS }) => {
  const g = roundSolid(1, 0, 2, { x: 20, y: 40, w: 110, h: 160 });
  const c: P2 = [258, 62];
  const R = 92;
  const ang = (360 * 1) / Math.sqrt(5);
  const start = 270 - ang / 2;
  return (
    <QFig w={360} h={240} title="A kúppalást kiterítve: körcikk" className={className}>
      <RoundBody g={g} />
      <Seg a={g.T} b={g.BR} color={SK.green} w={2.4} />
      <Seg a={g.B} b={g.BR} color={SK.aux} w={1.3} />
      <Txt p={[(g.T[0] + g.BR[0]) / 2 + 8, (g.T[1] + g.BR[1]) / 2]} t="a" anchor="start" color={SK.green} />
      <Txt p={[(g.B[0] + g.BR[0]) / 2, g.B[1] - 7]} t="r" size={10.5} />
      <path d="M 140 130 L 160 130" stroke={SK.ink} strokeWidth="2" />
      <path d="M 156 125 L 164 130 L 156 135 z" fill={SK.ink} />
      <path d={sectorPath(c, R, start, ang)} fill="rgba(99,102,241,0.14)" stroke={SK.line} strokeWidth="1.8" />
      <Seg a={c} b={polar(c, R, start)} color={SK.green} w={2.2} />
      <Txt p={[polar(c, R * 0.55, start)[0] - 8, polar(c, R * 0.55, start)[1]]} t="a" anchor="end" color={SK.green} />
      <AngleArc v={c} p1={polar(c, R, start)} p2={polar(c, R, start + ang)} t="α" r={18} tr={30} />
      <Txt p={[c[0], c[1] + R + 12]} t="ív = 2rπ" size={10.5} color={SK.line} />
      <Txt p={[20, 222]} t="T(palást) = 2rπ · a / 2 = rπa" anchor="start" size={10.5} color={SK.red} />
    </QFig>
  );
};

// 3. ábra: a körcikk adatai
export const SectorSvg: React.FC<FigProps> = ({ className = CLS }) => {
  const c: P2 = [180, 190];
  const R = 140;
  const start = 40;
  const ang = 100;
  return (
    <QFig w={360} h={240} title="A körcikk: sugár, ív, középponti szög" className={className}>
      <path d={sectorPath(c, R, start, ang)} fill="rgba(245,158,11,0.15)" stroke={SK.arc} strokeWidth="1.8" />
      <AngleArc v={c} p1={polar(c, R, start)} p2={polar(c, R, start + ang)} t="α" r={20} tr={36} />
      <Txt p={[polar(c, R * 0.55, start)[0] + 12, polar(c, R * 0.55, start)[1] + 4]} t="r" anchor="start" />
      <Txt p={polar(c, R + 12, start + ang / 2)} t="i" color={SK.ang} />
      <Txt p={[20, 216]} t="T = i · r / 2" anchor="start" size={11} color={SK.red} />
      <Txt p={[340, 216]} t="i = 2rπ · α / 360°" anchor="end" size={11} color={SK.red} />
    </QFig>
  );
};

// 4. ábra: a sóderkupac (3. feladat)
export const GravelPileSvg: React.FC<FigProps> = ({ className = CLS }) => {
  const g = roundSolid(1.5, 0, 0.8, { x: 40, y: 60, w: 280, h: 130 }, 0.22);
  return (
    <QFig w={360} h={240} title="A sóderkupac (3. feladat)" className={className}>
      <RoundBody g={g} fill="rgba(180,83,9,0.14)" color="#92400e" />
      <Seg a={g.T} b={g.B} color={SK.red} dash w={1.5} />
      <Seg a={g.BL} b={g.BR} color={SK.aux} w={1.2} dash />
      <RightMark v={g.B} p1={g.T} p2={g.BR} r={9} />
      <Txt p={[g.B[0] + 6, (g.T[1] + g.B[1]) / 2]} t="M ≈ 0,8 m" anchor="start" color={SK.red} size={10.5} />
      <Txt p={[g.B[0], g.B[1] + g.ryB + 14]} t="d = 3 m" size={10.5} />
      <Txt p={[180, 222]} t="V = 1,5² · π · 0,8 / 3 ≈ 1,88 m³ < 2 m³" size={11} color={SK.ang} />
    </QFig>
  );
};

// 5. ábra: a születésnapi papírcsákó (4. feladat)
export const PartyHatSvg: React.FC<FigProps> = ({ className = CLS }) => {
  const c: P2 = [100, 150];
  const R = 85;
  const ang = 132;
  const start = 90 - ang / 2;
  const g = roundSolid(7, 0, 17.77, { x: 220, y: 40, w: 110, h: 160 });
  return (
    <QFig w={360} h={240} title="Papírcsákó körcikkből (4. feladat)" className={className}>
      <path d={sectorPath(c, R, start, ang)} fill="rgba(236,72,153,0.14)" stroke="#db2777" strokeWidth="1.8" />
      <AngleArc v={c} p1={polar(c, R, start)} p2={polar(c, R, start + ang)} t="132°" r={16} tr={30} />
      <Txt p={[c[0], c[1] - R - 10]} t="ív = 44 cm" size={10.5} color="#be185d" />
      <path d="M 192 120 L 212 120" stroke={SK.ink} strokeWidth="2" />
      <path d="M 208 115 L 216 120 L 208 125 z" fill={SK.ink} />
      <RoundBody g={g} fill="rgba(236,72,153,0.12)" color="#db2777" />
      <Seg a={g.T} b={g.B} color={SK.red} dash w={1.4} />
      <RightMark v={g.B} p1={g.T} p2={g.BR} r={8} />
      <Txt p={[g.B[0] - 5, (g.T[1] + g.B[1]) / 2]} t="M = ?" anchor="end" />
      <Txt p={[40, 222]} t="a = 44 · 360 / (132 · 2π) ≈ 19,1 cm;  r = 44 / (2π) ≈ 7,0 cm" anchor="start" size={9.5} color={SK.aux} />
    </QFig>
  );
};

// 6. ábra: azonos alapú és magasságú henger és kúp
export const ConeVsCylinderSvg: React.FC<FigProps> = ({ className = CLS }) => {
  const g1 = roundSolid(1, 1, 1.6, { x: 40, y: 40, w: 120, h: 150 });
  const g2 = roundSolid(1, 0, 1.6, { x: 200, y: 40, w: 120, h: 150 });
  return (
    <QFig w={360} h={240} title="Azonos alapterület és magasság" className={className}>
      <RoundBody g={g1} fill="rgba(16,185,129,0.12)" color={SK.green} />
      <RoundBody g={g2} />
      <Seg a={g2.T} b={g2.B} color={SK.red} dash w={1.4} />
      <RightMark v={g2.B} p1={g2.T} p2={g2.BR} r={8} />
      <Txt p={[g2.B[0] + 5, (g2.T[1] + g2.B[1]) / 2]} t="M" anchor="start" color={SK.red} />
      <Txt p={[g1.B[0], 214]} t="henger: V = r²π · M" size={11} color={SK.green} />
      <Txt p={[g2.B[0], 214]} t="kúp: V = r²π · M / 3" size={11} color={SK.line} />
    </QFig>
  );
};

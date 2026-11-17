import React from 'react';
import { Solid } from '../a-testek/SolidsG3Parts';
import { Box, NetGrid, CUBE_NETS_OK } from '../a-teglatest-es-a-kocka/CuboidG3Parts';
import { AxisLine, GridG } from '../tukrozesek-szimmetria/SymmetryG3Parts';
import { FONT, INK, PlaneShape } from './ShapesExamG3Parts';

type Fig = React.FC<{ className?: string }>;
const DEF = 'w-full h-auto max-w-md mx-auto';

const Cap: React.FC<{ x: number; y: number; t: string; s?: number }> = ({ x, y, t, s = 12 }) => (
  <text x={x} y={y} textAnchor="middle" fontSize={s} fontWeight="bold" fill={INK} fontFamily={FONT}>
    {t}
  </text>
);

/** Testek: kocka, téglatest, piramis alakú, konzervdoboz alakú test, gömb. */
export const ExamSolidsSvg: Fig = ({ className = DEF }) => (
  <svg viewBox="0 0 340 130" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="338" height="128" rx="12" fill="#eff6ff" stroke="#93c5fd" />
    <Solid kind="kocka" cx={36} by={92} s={50} />
    <Solid kind="teglatest" cx={104} by={92} s={64} />
    <Solid kind="piramis4" cx={172} by={92} s={52} />
    <Solid kind="henger" cx={238} by={96} s={52} />
    <Solid kind="gomb" cx={302} by={94} s={50} />
    <Cap x={36} y={112} t="kocka" s={11} />
    <Cap x={104} y={112} t="téglatest" s={11} />
    <Cap x={172} y={112} t="piramis" s={11} />
    <Cap x={172} y={124} t="alakú" s={10} />
    <Cap x={238} y={112} t="konzervdoboz" s={10} />
    <Cap x={238} y={124} t="alakú" s={10} />
    <Cap x={302} y={112} t="gömb" s={11} />
  </svg>
);

/** Téglatest, kocka és a kocka hálója. */
export const ExamCuboidSvg: Fig = ({ className = DEF }) => (
  <svg viewBox="0 0 340 140" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="338" height="138" rx="12" fill="#fffbeb" stroke="#fcd34d" />
    <Box l={1.8} h={1} d={0.8} x={12} y={20} w={100} hh={80} color="#f59e0b" />
    <Box l={1} h={1} d={1} x={122} y={20} w={80} hh={80} color="#3b82f6" />
    <NetGrid cells={CUBE_NETS_OK[0]} x={214} y={14} w={116} h={92} maxCell={26} fill="#dbeafe" />
    <Cap x={62} y={116} t="téglatest" />
    <Cap x={62} y={130} t="6 téglalap lap" s={10} />
    <Cap x={162} y={116} t="kocka" />
    <Cap x={162} y={130} t="6 négyzet lap" s={10} />
    <Cap x={272} y={116} t="a kocka hálója" />
  </svg>
);

/** Síkidomok és sokszögek (a sokszögek a síkidomok egy csoportja). */
export const ExamPolygonsSvg: Fig = ({ className = DEF }) => (
  <svg viewBox="0 0 340 160" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="338" height="158" rx="12" fill="#f0fdf4" stroke="#86efac" />
    <text x="14" y="22" fontSize="13" fontWeight="bold" fill="#15803d">síkidomok</text>
    <PlaneShape kind="circle" cx={40} cy={62} r={24} />
    <PlaneShape kind="halfDisc" cx={40} cy={118} r={26} />
    <PlaneShape kind="drop" cx={90} cy={92} r={24} />
    <rect x="124" y="12" width="206" height="138" rx="12" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
    <text x="136" y="30" fontSize="13" fontWeight="bold" fill="#15803d">sokszögek</text>
    <PlaneShape kind="triIso" cx={156} cy={72} r={22} />
    <PlaneShape kind="square" cx={210} cy={72} r={22} />
    <PlaneShape kind="pent" cx={264} cy={72} r={24} />
    <PlaneShape kind="hex" cx={306} cy={72} r={20} />
    <Cap x={156} y={110} t="3 oldal" s={11} />
    <Cap x={210} y={110} t="4 oldal" s={11} />
    <Cap x={264} y={110} t="5 oldal" s={11} />
    <Cap x={306} y={110} t="6 oldal" s={11} />
    <text x="227" y="138" textAnchor="middle" fontSize="11" fill="#334155">csak egyenes szakaszok határolják</text>
  </svg>
);

/** Tükrözés: a téglalap 2 tükörtengelye és tükörkép a rácson. */
export const ExamSymmetrySvg: Fig = ({ className = DEF }) => {
  const s = 20;
  const x0 = 170;
  const y0 = 22;
  return (
    <svg viewBox="0 0 340 140" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="338" height="138" rx="12" fill="#fdf2f8" stroke="#f9a8d4" />
      <rect x="22" y="36" width="110" height="60" fill="#fde68a" stroke="#a16207" strokeWidth="2" />
      <AxisLine x1={77} y1={24} x2={77} y2={108} />
      <AxisLine x1={12} y1={66} x2={142} y2={66} />
      <Cap x={77} y={128} t="téglalap: 2 tükörtengely" />
      <GridG x={x0} y={y0} cols={8} rows={4} s={s} />
      <AxisLine x1={x0 + 4 * s} y1={y0 - 8} x2={x0 + 4 * s} y2={y0 + 4 * s + 8} />
      <circle cx={x0 + 1 * s} cy={y0 + 2 * s} r="6.5" fill="#ef4444" stroke={INK} strokeWidth="1.4" />
      <circle cx={x0 + 7 * s} cy={y0 + 2 * s} r="6.5" fill="#fca5a5" stroke={INK} strokeWidth="1.4" />
      <Cap x={x0 + 4 * s} y={128} t="3 kockányira – 3 kockányira" />
    </svg>
  );
};

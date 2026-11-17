import React from 'react';
import { Pie, Bar, Grid, DiagSquare, Txt, Tick, Cross, PlateSlice, equalAngles, equalCuts, INK, PAPER } from './EqualPartsG3Parts';

// ---------------------------------------------------------------------------
// 1. Egyenlő részekre osztás – ábrák (3. osztály)
// ---------------------------------------------------------------------------

const cls = 'w-full max-w-xl h-auto mx-auto';

/** Hajtogatás: kétszer félbe, kinyitva 4 egyenlő rész. */
export const FoldPaperSvg: React.FC<{ className?: string }> = ({ className = cls }) => (
  <svg viewBox="0 0 520 200" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="516" height="196" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    {/* 1. lépés */}
    <Txt x={70} y={30} s={14}>1. Hajtsd félbe!</Txt>
    <rect x={20} y={50} width={100} height={76} fill={PAPER} stroke={INK} strokeWidth={2.5} />
    <line x1={70} y1={50} x2={70} y2={126} stroke={INK} strokeWidth={2} strokeDasharray="6 4" />
    <path d="M 40 70 Q 70 50 100 70" fill="none" stroke="#2563eb" strokeWidth={3} />
    <path d="M 100 70 l -10 -2 m 10 2 l -4 -9" stroke="#2563eb" strokeWidth={3} strokeLinecap="round" />
    {/* 2. lépés */}
    <Txt x={195} y={30} s={14}>2. Megint félbe!</Txt>
    <rect x={170} y={50} width={50} height={76} fill={PAPER} stroke={INK} strokeWidth={2.5} />
    <line x1={170} y1={88} x2={220} y2={88} stroke={INK} strokeWidth={2} strokeDasharray="6 4" />
    <path d="M 210 116 Q 232 88 210 62" fill="none" stroke="#2563eb" strokeWidth={3} />
    <path d="M 210 62 l 2 10 m -2 -10 l 9 4" stroke="#2563eb" strokeWidth={3} strokeLinecap="round" />
    {/* 3. lépés */}
    <Txt x={300} y={30} s={14}>3. Nyisd ki!</Txt>
    <rect x={275} y={70} width={50} height={38} fill={PAPER} stroke={INK} strokeWidth={2.5} />
    <path d="M 335 89 L 365 89" stroke="#2563eb" strokeWidth={3} strokeLinecap="round" />
    <path d="M 365 89 l -8 -6 m 8 6 l -8 6" stroke="#2563eb" strokeWidth={3} strokeLinecap="round" />
    {/* 4. kinyitva */}
    <Txt x={435} y={30} s={14}>4. Kinyitva</Txt>
    <Grid x={385} y={50} w={100} h={76} rows={2} cols={2} dashed />
    <Txt x={435} y={160} s={16} c="#1d4ed8">4 egyenlő rész</Txt>
    <Txt x={260} y={186} s={13} c="#475569" w="normal">Mindegyik rész ugyanakkora: egymásra hajtva pontosan fedik egymást.</Txt>
  </svg>
);

/** Egyenlő és nem egyenlő részek. */
export const EqualOrNotSvg: React.FC<{ className?: string }> = ({ className = cls }) => (
  <svg viewBox="0 0 480 220" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="476" height="216" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    <Pie cx={120} cy={100} r={66} bounds={equalAngles(4, 45)} base="#fde68a" />
    <Tick x={120} y={192} s={12} />
    <Txt x={120} y={212} s={14} c="#15803d">egyenlő részek</Txt>
    <Pie cx={360} cy={100} r={66} bounds={[20, 80, 200, 250, 380]} base="#fde68a" />
    <Cross x={360} y={190} s={9} />
    <Txt x={360} y={212} s={14} c="#b91c1c">nem egyenlő részek</Txt>
  </svg>
);

/** Ugyanaz a torta 2, 3, 4, 6, 8 egyenlő részre vágva, alatta 1 szelet a tányéron. */
export const CakesCutSvg: React.FC<{ className?: string }> = ({ className = cls }) => {
  const ns = [2, 3, 4, 6, 8];
  return (
    <svg viewBox="0 0 520 250" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="516" height="246" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      {ns.map((n, i) => {
        const cx = 56 + i * 102;
        return (
          <g key={n}>
            <Pie cx={cx} cy={64} r={40} bounds={equalAngles(n)} cake />
            <Txt x={cx} y={128} s={14}>{n} rész</Txt>
            <PlateSlice cx={cx} cy={182} r={34} n={n} />
          </g>
        );
      })}
      <Txt x={260} y={240} s={13} c="#475569" w="normal">Minél több egyenlő részre vágjuk, annál kisebb egy szelet.</Txt>
    </svg>
  );
};

/** Egy négyzet 4 egyenlő részre háromféleképpen. */
export const ManyWaysSvg: React.FC<{ className?: string }> = ({ className = cls }) => (
  <svg viewBox="0 0 480 190" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="476" height="186" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    <Grid x={30} y={30} w={110} h={110} rows={2} cols={2} colored={[true]} color="#38bdf8" />
    <Bar x={185} y={30} w={110} h={110} cuts={equalCuts(4)} colored={[true]} color="#38bdf8" />
    <DiagSquare x={340} y={30} s={110} colored={[true]} color="#38bdf8" />
    <Txt x={240} y={170} s={14}>Mindhárom négyzet 4 egyenlő részre van osztva.</Txt>
  </svg>
);

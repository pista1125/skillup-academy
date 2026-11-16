import React from 'react';
import { SFig, SText, SBarChart, SPie, S_RED, S_AXIS, S_BLUE, S_AMBER, S_GREEN, S_PURPLE, S_INK } from './statKit';

/** Két részre osztott „urna”: kedvező és nem kedvező elemek, alattuk a kiválasztott darabszámok. */
const SplitBox: React.FC<{ title: string; left: string; right: string; leftPick: string; rightPick: string; y?: number; leftW?: number }> = ({
  title,
  left,
  right,
  leftPick,
  rightPick,
  y = 26,
  leftW = 90
}) => (
  <g>
    <rect x={20} y={y} width={280} height={60} rx={10} fill="#ffffff" stroke={S_INK} strokeWidth={1.2} />
    <SText x={160} y={y - 5} t={title} s={8.5} b c={S_AXIS} />
    <rect x={24} y={y + 4} width={leftW} height={52} rx={8} fill={S_GREEN} fillOpacity={0.18} stroke={S_GREEN} />
    <rect x={28 + leftW} y={y + 4} width={268 - leftW} height={52} rx={8} fill={S_BLUE} fillOpacity={0.12} stroke={S_BLUE} />
    <SText x={24 + leftW / 2} y={y + 34} t={left} s={8.5} b c={S_GREEN} />
    <SText x={28 + leftW + (268 - leftW) / 2} y={y + 34} t={right} s={8.5} b c={S_BLUE} />
    <path d={`M ${24 + leftW / 2} ${y + 58} l 0 16`} stroke={S_GREEN} strokeWidth={1.6} />
    <path d={`M ${28 + leftW + (268 - leftW) / 2} ${y + 58} l 0 16`} stroke={S_BLUE} strokeWidth={1.6} />
    <SText x={24 + leftW / 2} y={y + 86} t={leftPick} s={8.5} b c={S_GREEN} />
    <SText x={28 + leftW + (268 - leftW) / 2} y={y + 86} t={rightPick} s={8.5} b c={S_BLUE} />
  </g>
);

/** Bevezető: a kéttalálatos lottószelvény kedvező esetei. */
export const LottoSplitSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-[460px] h-auto mx-auto' }) => (
  <SFig w={320} h={150} className={className}>
    <SplitBox title="90 szám (összes eset: 90-ből 5)" left="5 nyerő szám" right="85 nem nyerő szám" leftPick="innen 2-t választunk" rightPick="innen 3-at választunk" />
    <SText x={160} y={140} t="P(2 találat) = (5 alatt 2) · (85 alatt 3) / (90 alatt 5) ≈ 0,0225" s={9} c={S_RED} b />
  </SFig>
);

/** A visszatevés nélküli mintavétel sémája. */
export const HypergeometricSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-[460px] h-auto mx-auto' }) => (
  <SFig w={320} h={150} className={className}>
    <SplitBox
      title="N elem, visszatevés nélkül n-et választunk"
      left="M db (tulajdonsággal)"
      right="N − M db (tulajdonság nélkül)"
      leftPick="innen k db"
      rightPick="innen n − k db"
      leftW={120}
    />
    <SText x={160} y={140} t="P(k) = (M alatt k) · (N − M alatt n − k) / (N alatt n)" s={9} c={S_RED} b />
  </SFig>
);

/** A két végzős osztály (kidolgozott feladat 1.). */
export const TwoClassesSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-[380px] h-auto mx-auto' }) => {
  const dots = (x0: number, y0: number, girls: number, boys: number) =>
    Array.from({ length: girls + boys }, (_, i) => (
      <circle key={i} cx={x0 + (i % 7) * 13} cy={y0 + Math.floor(i / 7) * 13} r={4.6} fill={i < girls ? S_RED : S_BLUE} fillOpacity={0.75} />
    ));
  return (
    <SFig w={260} h={130} className={className} title="Két végzős osztály">
      <rect x={14} y={24} width={110} height={74} rx={8} fill="#ffffff" stroke={S_AXIS} />
      <rect x={136} y={24} width={110} height={74} rx={8} fill="#ffffff" stroke={S_AXIS} />
      {dots(30, 36, 11, 13)}
      {dots(152, 36, 15, 10)}
      <SText x={69} y={112} t="12. a: 11 lány, 13 fiú" s={8} b />
      <SText x={191} y={112} t="12. b: 15 lány, 10 fiú" s={8} b />
      <circle cx={84} cy={123} r={3.5} fill={S_RED} />
      <SText x={90} y={126} t="lány" s={7.5} a="start" c={S_AXIS} />
      <circle cx={140} cy={123} r={3.5} fill={S_BLUE} />
      <SText x={146} y={126} t="fiú" s={7.5} a="start" c={S_AXIS} />
    </SFig>
  );
};

/** A mellékhatásos esetek számának binomiális eloszlása (n = 100, p = 0,03). */
export const SideEffectBinomialSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-[400px] h-auto mx-auto' }) => {
  const vals = [0.0476, 0.1471, 0.2252, 0.2275, 0.1706, 0.1013, 0.0496, 0.0206, 0.0074];
  return (
    <SFig w={260} h={160} className={className} title="Mellékhatások száma 100 vizsgálatból (p = 0,03)">
      <SBarChart
        x0={34}
        y0={132}
        w={214}
        h={96}
        yMax={0.25}
        ticks={[0, 0.05, 0.1, 0.15, 0.2, 0.25]}
        data={vals.map((v, k) => ({ label: String(k), value: v, color: k < 3 ? S_AMBER : S_BLUE }))}
      />
      <SText x={141} y={152} t="sárga: háromnál kevesebb eset, összesen ≈ 0,420" s={7.5} c={S_AXIS} />
    </SFig>
  );
};

/** A pizzás kördiagram (4. feladat). */
export const PizzaPieSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-[320px] h-auto mx-auto' }) => (
  <SFig w={240} h={150} className={className} title="36 tanuló kedvenc pizzája">
    <SPie cx={78} cy={84} r={54} values={[120, 160, 80]} labels={['120°', '160°', '80°']} colors={[S_BLUE, S_RED, S_PURPLE]} />
    {[
      ['Margherita', S_BLUE],
      ['Carbonara', S_RED],
      ['Pepperónis', S_PURPLE]
    ].map(([t, c], i) => (
      <g key={t}>
        <rect x={150} y={58 + i * 20} width={10} height={10} fill={c} fillOpacity={0.8} />
        <SText x={165} y={67 + i * 20} t={t} s={8.5} a="start" />
      </g>
    ))}
  </SFig>
);

/** Ráadás: 4 házimunka pénzfeldobással – a fejek számának eloszlása. */
export const FairnessBarsSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-[400px] h-auto mx-auto' }) => (
  <SFig w={260} h={160} className={className} title="4 pénzfeldobás: fejek és írások">
    <SBarChart
      x0={34}
      y0={130}
      w={214}
      h={94}
      yMax={0.4}
      ticks={[0, 0.1, 0.2, 0.3, 0.4]}
      showValues
      labelSize={7}
      data={[
        { label: '0F – 4I', value: 0.0625, color: S_BLUE },
        { label: '1F – 3I', value: 0.25, color: S_BLUE },
        { label: '2F – 2I', value: 0.375, color: S_GREEN },
        { label: '3F – 1I', value: 0.25, color: S_BLUE },
        { label: '4F – 0I', value: 0.0625, color: S_BLUE }
      ]}
    />
    <SText x={141} y={152} t="„igazságos” 2–2: 0,375; nem 2–2: 0,625" s={7.5} c={S_RED} b />
  </SFig>
);

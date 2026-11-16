import React from 'react';
import { SFig, SText, SBarChart, SBoxPlot, SPie, S_BLUE, S_RED, S_GREEN, S_AXIS, S_PURPLE, S_AMBER, S_INK, S_PALETTE, hu } from './statKit';

const cls = (c?: string) => c ?? 'w-full max-w-[460px] h-auto mx-auto';

/** A mosópor-eladások: szemléltető közbülső hónapokkal (január 9114 kg, június 9185 kg). */
const DETERGENT_SALES = [9114, 9128, 9141, 9155, 9170, 9185];
const MONTHS6 = ['jan.', 'febr.', 'márc.', 'ápr.', 'máj.', 'jún.'];

/** Félrevezető (9100-tól induló) és arányos (0-tól induló) oszlopdiagram. */
export const DetergentMisleadingSvg: React.FC<{ className?: string }> = ({ className }) => (
  <SFig w={460} h={180} className={cls(className ?? 'w-full max-w-[560px] h-auto mx-auto')}>
    <SText x={120} y={16} t="félrevezető: a tengely 9100 kg-tól indul" s={9} c={S_RED} b />
    <SBarChart
      x0={40}
      y0={150}
      w={175}
      h={115}
      yMin={9100}
      yMax={9190}
      ticks={[9100, 9130, 9160, 9190]}
      data={DETERGENT_SALES.map((v, i) => ({ label: MONTHS6[i], value: v }))}
      color={S_RED}
      labelSize={7}
      tickFmt={(v) => String(v)}
    />
    <SText x={345} y={16} t="arányos: a tengely 0-tól indul" s={9} c={S_GREEN} b />
    <SBarChart
      x0={268}
      y0={150}
      w={175}
      h={115}
      yMax={10000}
      ticks={[0, 2500, 5000, 7500, 10000]}
      data={DETERGENT_SALES.map((v, i) => ({ label: MONTHS6[i], value: v }))}
      color={S_GREEN}
      labelSize={7}
      tickFmt={(v) => String(v)}
    />
    <SText x={230} y={176} t="9114 kg → 9185 kg: a növekedés csak ≈ 0,8%" s={8.5} c={S_INK} b />
  </SFig>
);

/** A dobozdiagram részei. */
export const BoxPlotAnatomySvg: React.FC<{ className?: string }> = ({ className }) => (
  <SFig w={360} h={170} className={cls(className)} title="A dobozdiagram öt adata">
    <SBoxPlot q={[2, 5, 8, 12, 15]} axMin={0} axMax={16} ticks={[0, 2, 4, 6, 8, 10, 12, 14, 16]} x0={30} w={300} y={78} bh={34} tickFmt={(v) => String(v)} />
    {[
      [2, 'minimum Q₀'],
      [5, 'alsó kvartilis Q₁'],
      [8, 'medián Q₂'],
      [12, 'felső kvartilis Q₃'],
      [15, 'maximum Q₄']
    ].map(([v, t], i) => (
      <SText key={i} x={30 + ((v as number) / 16) * 300} y={i % 2 ? 32 : 44} t={t as string} s={8} c={S_PURPLE} b />
    ))}
    <path d={`M ${30 + (5 / 16) * 300} 104 L ${30 + (12 / 16) * 300} 104`} stroke={S_AMBER} strokeWidth={1.4} />
    <SText x={30 + (8.5 / 16) * 300} y={102} t="félterjedelem: Q₃ − Q₁" s={7.5} c={S_AMBER} b />
    <SText x={180} y={164} t="terjedelem: Q₄ − Q₀ · mindegyik részbe az adatok ≈ 25%-a esik" s={8} c={S_AXIS} />
  </SFig>
);

/** Tamás úszó időeredményeinek dobozdiagramja. */
export const SwimmerBoxPlotSvg: React.FC<{ className?: string; labels?: boolean }> = ({ className, labels = true }) => (
  <SFig w={340} h={130} className={cls(className)} title="Tamás edzésidői (s)">
    <SBoxPlot
      q={[50.59, 50.62, 50.7, 50.76, 50.81]}
      axMin={50.55}
      axMax={50.85}
      ticks={[50.55, 50.6, 50.65, 50.7, 50.75, 50.8, 50.85]}
      x0={25}
      w={290}
      y={62}
      bh={30}
      color={S_BLUE}
      qLabels={labels ? ['50,59', '50,62', '50,7', '50,76', '50,81'] : undefined}
    />
  </SFig>
);

/** Kiugró adat: Bob Beamon 8,90 m-es ugrása az 1968-as döntőben. */
export const BeamonOutlierSvg: React.FC<{ className?: string }> = ({ className }) => {
  const X = (v: number) => 25 + ((v - 7.3) / (9.0 - 7.3)) * 300;
  return (
    <SFig w={350} h={150} className={cls(className)} title="1968, távolugrás döntő (m) – kiugró adat">
      <SBoxPlot q={[7.44, 7.8, 7.94, 8.105, 8.19]} outliers={[8.9]} axMin={7.3} axMax={9.0} ticks={[7.4, 7.6, 7.8, 8.0, 8.2, 8.4, 8.6, 8.8, 9.0]} x0={25} w={300} y={70} bh={30} />
      <line x1={X(8.5625)} y1={34} x2={X(8.5625)} y2={100} stroke={S_RED} strokeDasharray="4 3" strokeWidth={1.3} />
      <SText x={X(8.5625)} y={30} t="Q₃ + 1,5 · (Q₃ − Q₁) ≈ 8,56" s={7.5} c={S_RED} b />
      <SText x={X(8.9)} y={58} t="8,90" s={8} c={S_RED} b />
      <SText x={X(7.95)} y={44} t="Q₁ = 7,8 · Q₂ = 7,94 · Q₃ = 8,105" s={7.5} c={S_PURPLE} b />
    </SFig>
  );
};

const mmss = (s: number) => {
  const m = Math.floor(s / 60);
  const r = s - 60 * m;
  return `${m}:${r < 10 ? '0' : ''}${hu(r, 2)}`;
};

/** Milák Kristóf 200 m pillangó, 2022: elődöntő és döntő dobozdiagramja. */
export const MilakBoxPlotsSvg: React.FC<{ className?: string }> = ({ className }) => (
  <SFig w={380} h={200} className={cls(className)} title="200 m pillangó, Budapest 2022 (perc:másodperc)">
    <SText x={20} y={42} t="elődöntő" s={8.5} a="start" c={S_BLUE} b />
    <SBoxPlot
      q={[114.01, 114.105, 114.41, 114.83, 114.91]}
      outliers={[112.39]}
      axMin={110}
      axMax={116}
      ticks={[]}
      x0={30}
      w={330}
      y={62}
      bh={24}
      color={S_BLUE}
    />
    <SText x={20} y={108} t="döntő" s={8.5} a="start" c={S_AMBER} b />
    <SBoxPlot
      q={[113.37, 113.49, 114.605, 115.36, 115.54]}
      outliers={[110.34]}
      axMin={110}
      axMax={116}
      ticks={[110, 111, 112, 113, 114, 115, 116]}
      x0={30}
      w={330}
      y={128}
      bh={24}
      color={S_AMBER}
      tickFmt={(v) => mmss(v)}
    />
    <SText x={30 + ((110.34 - 110) / 6) * 330 + 4} y={146} t="1:50,34 (VB-csúcs)" s={7} c={S_RED} a="start" />
    <SText x={30 + ((112.39 - 110) / 6) * 330} y={80} t="1:52,39" s={7} c={S_RED} />
  </SFig>
);

/** Februári létszámadatok (28 nap) kördiagramja. */
const STAFF_FREQ: [number, number][] = [
  [35, 3],
  [36, 1],
  [37, 6],
  [38, 4],
  [39, 7],
  [40, 5],
  [41, 2]
];
export const StaffPieSvg: React.FC<{ className?: string }> = ({ className }) => (
  <SFig w={300} h={170} className={cls(className ?? 'w-full max-w-[380px] h-auto mx-auto')} title="Napi létszám februárban (28 nap)">
    <SPie values={STAFF_FREQ.map(([, f]) => f)} labels={STAFF_FREQ.map(([, f]) => String(f))} cx={85} cy={92} r={62} />
    {STAFF_FREQ.map(([v, f], i) => (
      <g key={v}>
        <rect x={175} y={34 + i * 17} width={10} height={10} fill={S_PALETTE[i]} fillOpacity={0.8} />
        <SText x={190} y={43 + i * 17} t={`${v} fő: ${f} nap (${hu((f * 360) / 28, 1)}°)`} s={8} a="start" />
      </g>
    ))}
  </SFig>
);

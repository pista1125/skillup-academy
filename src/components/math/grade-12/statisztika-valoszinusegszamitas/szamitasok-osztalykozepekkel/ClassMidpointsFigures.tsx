import React from 'react';
import { SFig, SText, SBarChart, S_BLUE, S_RED, S_GREEN, S_AXIS, S_PURPLE, S_AMBER, S_TEAL } from './statKit';

const cls = (c?: string) => c ?? 'w-full max-w-[460px] h-auto mx-auto';

/** 50 ember által vásárolt szögek darabszáma osztályokban (érettségi 2020). */
export const NailsHistogramSvg: React.FC<{ className?: string }> = ({ className }) => (
  <SFig w={380} h={180} className={cls(className)} title="Vásárolt szögek száma (db) – gyakoriság">
    <SBarChart
      x0={34}
      y0={148}
      w={335}
      h={110}
      yMax={18}
      ticks={[0, 3, 6, 9, 12, 15, 18]}
      showValues
      color={S_BLUE}
      gap={0.15}
      labelSize={7}
      tickFmt={(v) => String(v)}
      data={[
        { label: '120–124', value: 1 },
        { label: '125–129', value: 2 },
        { label: '130–134', value: 6 },
        { label: '135–139', value: 17 },
        { label: '140–144', value: 10 },
        { label: '145–149', value: 7 },
        { label: '150–154', value: 5 },
        { label: '155–159', value: 2 }
      ]}
    />
    <SText x={200} y={174} t="osztályközepek: 122; 127; 132; 137; 142; 147; 152; 157" s={8} c={S_AXIS} />
  </SFig>
);

/** Az osztályközép fogalma: az osztály adatait az osztályközéppel helyettesítjük. */
export const MidpointConceptSvg: React.FC<{ className?: string }> = ({ className }) => {
  const X = (v: number) => 30 + ((v - 124) / 7) * 340;
  const data = [125, 126, 126, 128, 129];
  const ys = [47, 47, 39, 47, 47];
  return (
    <SFig w={400} h={150} className={cls(className)} title="Az osztályközép: a 125–129 osztály">
      <line x1={X(124)} y1={60} x2={X(131)} y2={60} stroke={S_AXIS} />
      {[124, 125, 126, 127, 128, 129, 130, 131].map((t) => (
        <g key={t}>
          <line x1={X(t)} y1={56} x2={X(t)} y2={64} stroke={S_AXIS} />
          <SText x={X(t)} y={76} t={String(t)} s={8} c={S_AXIS} />
        </g>
      ))}
      <rect x={X(125)} y={40} width={X(129) - X(125)} height={14} fill={S_BLUE} fillOpacity={0.15} stroke={S_BLUE} />
      {data.map((d, i) => (
        <circle key={i} cx={X(d)} cy={ys[i] + 2} r={3.5} fill={S_BLUE} />
      ))}
      <SText x={X(127)} y={30} t="valódi adatok: 125; 126; 126; 128; 129" s={8} c={S_BLUE} b />
      <line x1={X(127)} y1={84} x2={X(127)} y2={100} stroke={S_RED} strokeWidth={1.5} />
      {data.map((_, i) => (
        <circle key={i} cx={X(127) + (i - 2) * 9} cy={108} r={3.5} fill={S_RED} fillOpacity={0.6} />
      ))}
      <SText x={X(127)} y={126} t="osztályközép: (125 + 129) / 2 = 127 – mind az 5 adatot 127-nek vesszük" s={8.5} c={S_RED} b />
      <SText x={X(127)} y={142} t="az osztályok nem fedik egymást, és együtt minden adatot lefednek" s={8} c={S_AXIS} />
    </SFig>
  );
};

/** Békéscsaba havi csapadéka (2020–2021), 5 osztályban. */
export const RainfallHistogramSvg: React.FC<{ className?: string }> = ({ className }) => (
  <SFig w={340} h={180} className={cls(className)} title="Havi csapadék, Békéscsaba 2020–2021 (24 hónap)">
    <SBarChart
      x0={34}
      y0={145}
      w={295}
      h={110}
      yMax={10}
      ticks={[0, 2, 4, 6, 8, 10]}
      showValues
      color={S_TEAL}
      gap={0.1}
      labelSize={7.5}
      tickFmt={(v) => String(v)}
      data={[
        { label: '1–25 mm', value: 7 },
        { label: '26–50', value: 9 },
        { label: '51–75', value: 6 },
        { label: '76–100', value: 1 },
        { label: '101–133', value: 1 }
      ]}
    />
    <SText x={180} y={172} t="osztályközepek: 13; 38; 63; 88; 117 mm" s={8} c={S_AXIS} />
  </SFig>
);

/** A levágott huzaldarabok hossza és a ±1,6 mm-es tűrés. */
export const WireToleranceSvg: React.FC<{ className?: string }> = ({ className }) => {
  const X = (v: number) => 30 + ((v - 11.6) / (17.4 - 11.6)) * 340;
  const y0 = 140;
  const k = 7.5;
  const bars: [number, number, number][] = [
    [11.8, 12.8, 2],
    [12.9, 13.9, 4],
    [14.0, 15.0, 13],
    [15.1, 16.1, 5],
    [16.2, 17.2, 1]
  ];
  return (
    <SFig w={400} h={175} className={cls(className)} title="Huzaldarabok hossza (mm) – előírt 14,5 mm, tűrés ±1,6 mm">
      <rect x={X(12.9)} y={26} width={X(16.1) - X(12.9)} height={y0 - 26} fill={S_GREEN} fillOpacity={0.1} />
      {bars.map(([a, b, f], i) => (
        <g key={i}>
          <rect x={X(a)} y={y0 - f * k} width={X(b) - X(a)} height={f * k} fill={a >= 12.9 && b <= 16.1 ? S_GREEN : S_AMBER} fillOpacity={0.75} stroke="#fff" />
          <SText x={(X(a) + X(b)) / 2} y={y0 - f * k - 3} t={String(f)} s={8} b />
          <SText x={(X(a) + X(b)) / 2} y={y0 + 11} t={`${a.toFixed(1).replace('.', ',')}–${b.toFixed(1).replace('.', ',')}`} s={7} c={S_AXIS} />
        </g>
      ))}
      <line x1={X(14.5)} y1={24} x2={X(14.5)} y2={y0} stroke={S_RED} strokeDasharray="4 3" strokeWidth={1.5} />
      <SText x={X(14.5) + 4} y={34} t="14,5 mm" s={8} c={S_RED} a="start" b />
      <SText x={X(12.9)} y={y0 + 24} t="12,9" s={8} c={S_GREEN} b />
      <SText x={X(16.1)} y={y0 + 24} t="16,1" s={8} c={S_GREEN} b />
      <line x1={30} y1={y0} x2={370} y2={y0} stroke={S_AXIS} />
      <SText x={200} y={y0 + 24} t="tűréshatáron belül: 4 + 13 + 5 = 22 darab" s={8} c={S_PURPLE} />
    </SFig>
  );
};

/** Egy dolgozat pontszámai (50 tanuló). */
export const ScoresHistogramSvg: React.FC<{ className?: string }> = ({ className }) => (
  <SFig w={380} h={175} className={cls(className)} title="Dolgozat pontszámai (50 tanuló)">
    <SBarChart
      x0={34}
      y0={145}
      w={335}
      h={105}
      yMax={24}
      ticks={[0, 6, 12, 18, 24]}
      showValues
      color={S_PURPLE}
      gap={0.12}
      labelSize={7}
      tickFmt={(v) => String(v)}
      data={[
        { label: '0–30', value: 0 },
        { label: '31–40', value: 2 },
        { label: '41–50', value: 8 },
        { label: '51–60', value: 21 },
        { label: '61–70', value: 9 },
        { label: '71–80', value: 9 },
        { label: '81–90', value: 1 },
        { label: '91–100', value: 0 }
      ]}
    />
    <SText x={200} y={170} t="osztályközepek: 15; 35,5; 45,5; 55,5; 65,5; 75,5; 85,5; 95,5" s={8} c={S_AXIS} />
  </SFig>
);

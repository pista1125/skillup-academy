import React from 'react';
import { SFig, SText, STable, SWheel, SBarChart, S_RED, S_AXIS, S_BLUE, S_AMBER, S_GREEN, S_PURPLE, S_INK } from './statKit';

/** A kidolgozott feladat szerencsekereke: 6 egyenlő cikk. */
export const LuckyWheelSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-[320px] h-auto mx-auto' }) => (
  <SFig w={240} h={170} className={className} title="A vurstli szerencsekereke (6 egyenlő cikk)">
    <SWheel
      cy={95}
      r={62}
      s={7.5}
      sectors={[
        { label: 'nem nyert', deg: 60, color: '#94a3b8' },
        { label: '200 Ft', deg: 60, color: S_BLUE },
        { label: '900 Ft', deg: 60, color: S_GREEN },
        { label: 'nem nyert', deg: 60, color: '#94a3b8' },
        { label: '100 Ft', deg: 60, color: S_AMBER },
        { label: '1200 Ft', deg: 60, color: S_PURPLE }
      ]}
    />
  </SFig>
);

/** Eloszlás-táblázat és a várható érték kiszámítása a kidolgozott feladathoz. */
export const WheelTableSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-[460px] h-auto mx-auto' }) => (
  <SFig w={320} h={110} className={className}>
    <STable
      x={10}
      y={12}
      colW={[84, 44, 44, 44, 44, 44]}
      rowH={20}
      s={8.5}
      rows={[
        ['Nyeremény (Ft)', 0, 100, 200, 900, 1200],
        ['Valószínűség', '2/6', '1/6', '1/6', '1/6', '1/6']
      ]}
    />
    <SText x={160} y={72} t="E = 2/6 · 0 + 1/6 · 100 + 1/6 · 200 + 1/6 · 900 + 1/6 · 1200" s={8.5} />
    <SText x={160} y={92} t="E = 2400 / 6 = 400 Ft" s={10} c={S_RED} b />
  </SFig>
);

/** Az 1. feladat szerencsekereke, eltérő középponti szögekkel. */
export const AngleWheelSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-[320px] h-auto mx-auto' }) => (
  <SFig w={240} h={170} className={className} title="Különböző középponti szögek">
    <SWheel
      cy={95}
      r={62}
      s={7.5}
      sectors={[
        { label: '300 Ft', deg: 80, color: S_BLUE, showDeg: true },
        { label: '2000 Ft', deg: 60, color: S_GREEN, showDeg: true },
        { label: '400 Ft', deg: 100, color: S_AMBER, showDeg: true },
        { label: '900 Ft', deg: 70, color: S_PURPLE, showDeg: true },
        { label: '3000 Ft', deg: 50, color: S_RED, showDeg: true }
      ]}
    />
  </SFig>
);

/** A két részvény modellezett hozamai a három esetben. */
export const StockScenarioSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-[460px] h-auto mx-auto' }) => (
  <SFig w={320} h={132} className={className} title="Modellezett hozamok a következő évre">
    <STable
      x={14}
      y={24}
      colW={[132, 58, 58, 44]}
      rowH={18}
      s={8.5}
      rows={[
        ['eset', 'A hozama', 'B hozama', '½A + ½B'],
        ['1. eset, p = 0,5', '22%', '−2%', '10%'],
        ['2. eset, p = 0,4', '−12%', '16%', '2%'],
        ['3. eset, p = 0,1', '8%', '10%', '9%'],
        ['várható hozam', '7%', '6,4%', '6,7%']
      ]}
      highlight={[
        [4, 1],
        [4, 2],
        [4, 3]
      ]}
    />
  </SFig>
);

/** A dobott fejek számának eloszlása 3 pénzérme esetén. */
export const CoinHeadsSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-[320px] h-auto mx-auto' }) => (
  <SFig w={240} h={160} className={className} title="Fejek száma 3 pénzérme feldobásakor">
    <SBarChart
      x0={36}
      y0={130}
      w={190}
      h={92}
      yMax={0.4}
      ticks={[0, 0.125, 0.25, 0.375]}
      tickFmt={(v) => ['0', '1/8', '2/8', '3/8'][Math.round(v * 8)]}
      color={S_BLUE}
      data={[
        { label: '0', value: 0.125 },
        { label: '1', value: 0.375 },
        { label: '2', value: 0.375 },
        { label: '3', value: 0.125 }
      ]}
    />
    <line x1={36 + 190 * (2 / 4)} y1={34} x2={36 + 190 * (2 / 4)} y2={130} stroke={S_RED} strokeWidth={1.6} strokeDasharray="4 3" />
    <SText x={36 + 190 * (2 / 4) + 4} y={32} t="E = 1,5" s={9} c={S_RED} b a="start" />
  </SFig>
);

/** A céltábla (40. lecke, 4. házi feladat): két kör, két merőleges átmérő. */
export const TargetBoardSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-[280px] h-auto mx-auto' }) => {
  const cx = 120;
  const cy = 88;
  const R = 64;
  const r = 32;
  return (
    <SFig w={240} h={170} className={className} title="Céltábla: a belső kör átmérője feleakkora">
      <circle cx={cx} cy={cy} r={R} fill={S_BLUE} fillOpacity={0.12} stroke={S_INK} strokeWidth={1.2} />
      <circle cx={cx} cy={cy} r={r} fill={S_AMBER} fillOpacity={0.25} stroke={S_INK} strokeWidth={1.2} />
      <line x1={cx - R} y1={cy} x2={cx + R} y2={cy} stroke={S_INK} />
      <line x1={cx} y1={cy - R} x2={cx} y2={cy + R} stroke={S_INK} />
      <SText x={cx - 44} y={cy - 38} t="10" s={10} b />
      <SText x={cx + 44} y={cy - 38} t="20" s={10} b />
      <SText x={cx - 44} y={cy + 46} t="20" s={10} b />
      <SText x={cx + 44} y={cy + 46} t="10" s={10} b />
      <SText x={cx - 15} y={cy - 10} t="50" s={9} b c={S_RED} />
      <SText x={cx + 15} y={cy - 10} t="40" s={9} b c={S_RED} />
      <SText x={cx - 15} y={cy + 18} t="40" s={9} b c={S_RED} />
      <SText x={cx + 15} y={cy + 18} t="50" s={9} b c={S_RED} />
      <SText x={cx} y={cy + R + 13} t="P(10) = P(20) = 3/8, P(40) = P(50) = 1/8" s={7.5} c={S_AXIS} />
    </SFig>
  );
};

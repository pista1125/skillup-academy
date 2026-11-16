import React from 'react';
import { SFig, SText, SLineChart, SBarChart, STable, S_BLUE, S_AMBER, S_RED, S_GREEN, S_AXIS, S_PURPLE, hu } from './statKit';

const cls = (c?: string) => c ?? 'w-full max-w-[460px] h-auto mx-auto';

/** A és B részvény árfolyama 2018–2022. */
export const StockPricesSvg: React.FC<{ className?: string }> = ({ className }) => (
  <SFig w={320} h={180} className={cls(className)} title="Éves záró árfolyam (Ft): A (kék), B (narancs)">
    <SLineChart
      values={[2600, 2756, 3060, 3000, 3150]}
      labels={['2018', '2019', '2020', '2021', '2022']}
      yMin={2000}
      yMax={6000}
      ticks={[2000, 3000, 4000, 5000, 6000]}
      x0={40}
      y0={150}
      w={265}
      h={120}
      color={S_BLUE}
      tickFmt={(v) => String(v)}
    />
    <SLineChart
      values={[4700, 5170, 4963, 5560, 5670]}
      labels={[]}
      yMin={2000}
      yMax={6000}
      ticks={[]}
      x0={40}
      y0={150}
      w={265}
      h={120}
      color={S_AMBER}
    />
  </SFig>
);

/** A két részvény éves hozamai és az 5%-os átlag. */
export const ReturnsBarSvg: React.FC<{ className?: string }> = ({ className }) => {
  const y0 = 110;
  const k = 4.2; // px / %
  return (
    <SFig w={320} h={180} className={cls(className)} title="Éves hozamok (%): A (kék), B (narancs); átlag mindkettőnél 5%">
      {[-10, -5, 0, 5, 10, 15].map((t) => (
        <g key={t}>
          <line x1={40} y1={y0 - t * k} x2={305} y2={y0 - t * k} stroke="#e2e8f0" />
          <SText x={36} y={y0 - t * k + 3} t={`${t}%`} s={7.5} a="end" c={S_AXIS} />
        </g>
      ))}
      {[
        [6, 10],
        [11, -4],
        [-2, 12],
        [5, 2]
      ].map(([a, b], i) => {
        const x = 55 + i * 64;
        return (
          <g key={i}>
            <rect x={x} y={Math.min(y0, y0 - a * k)} width={20} height={Math.abs(a * k)} fill={S_BLUE} opacity={0.85} />
            <rect x={x + 22} y={Math.min(y0, y0 - b * k)} width={20} height={Math.abs(b * k)} fill={S_AMBER} opacity={0.85} />
            <SText x={x + 10} y={a >= 0 ? y0 - a * k - 3 : y0 - a * k + 9} t={`${a}`} s={7.5} />
            <SText x={x + 32} y={b >= 0 ? y0 - b * k - 3 : y0 - b * k + 9} t={`${b}`} s={7.5} />
            <SText x={x + 21} y={172} t={String(2019 + i)} s={8} c={S_AXIS} />
          </g>
        );
      })}
      <line x1={40} y1={y0} x2={305} y2={y0} stroke={S_AXIS} strokeWidth={1.2} />
      <line x1={40} y1={y0 - 5 * k} x2={305} y2={y0 - 5 * k} stroke={S_RED} strokeWidth={1.5} strokeDasharray="5 3" />
      <SText x={304} y={y0 - 5 * k - 3} t="x̄ = 5%" s={8} c={S_RED} a="end" b />
    </SFig>
  );
};

/** Szóráskiszámító táblázat az A és a B részvényhez. */
export const DeviationTableSvg: React.FC<{ className?: string }> = ({ className }) => (
  <SFig w={440} h={150} className={cls(className)} title="Eltérések az átlagtól és négyzeteik">
    <SText x={110} y={32} t="A részvény (x̄ = 5)" s={9} c={S_BLUE} b />
    <STable
      x={8}
      y={38}
      colW={[60, 36, 36, 36, 36]}
      rowH={18}
      s={8}
      rows={[
        ['', '2019', '2020', '2021', '2022'],
        ['xᵢ', 6, 11, -2, 5],
        ['xᵢ − x̄', 1, 6, -7, 0],
        ['(xᵢ − x̄)²', 1, 36, 49, 0]
      ]}
    />
    <SText x={110} y={126 + 14} t="σ = √(86 / 4) = √21,5 ≈ 4,64" s={8.5} c={S_BLUE} b />
    <SText x={330} y={32} t="B részvény (x̄ = 5)" s={9} c={S_AMBER} b />
    <STable
      x={228}
      y={38}
      colW={[60, 36, 36, 36, 36]}
      rowH={18}
      s={8}
      rows={[
        ['', '2019', '2020', '2021', '2022'],
        ['xᵢ', 10, -4, 12, 2],
        ['xᵢ − x̄', 5, -9, 7, -3],
        ['(xᵢ − x̄)²', 25, 81, 49, 9]
      ]}
    />
    <SText x={330} y={126 + 14} t="σ = √(164 / 4) = √41 ≈ 6,40" s={8.5} c={S_AMBER} b />
  </SFig>
);

/** A szórás kiszámításának 4 lépése. */
export const StdDevStepsSvg: React.FC<{ className?: string }> = ({ className }) => {
  const steps = [
    ['1. átlag', 'x̄ = (x₁ + … + xₙ) / n'],
    ['2. eltérések négyzete', '(x₁ − x̄)², …, (xₙ − x̄)²'],
    ['3. ezek átlaga', 'σ² (szórásnégyzet)'],
    ['4. gyökvonás', 'σ = √σ²']
  ];
  return (
    <SFig w={460} h={92} className={cls(className)}>
      {steps.map(([t, f], i) => {
        const x = 10 + i * 113;
        return (
          <g key={i}>
            <rect x={x} y={18} width={100} height={56} rx={9} fill={['#dbeafe', '#ede9fe', '#fef3c7', '#dcfce7'][i]} stroke={[S_BLUE, S_PURPLE, S_AMBER, S_GREEN][i]} />
            <SText x={x + 50} y={38} t={t} s={9} b c={[S_BLUE, S_PURPLE, S_AMBER, S_GREEN][i]} />
            <SText x={x + 50} y={58} t={f} s={8} />
            {i < 3 && <path d={`M ${x + 102} 46 l 9 0 m -4 -4 l 4 4 l -4 4`} stroke={S_AXIS} fill="none" strokeWidth={1.5} />}
          </g>
        );
      })}
    </SFig>
  );
};

/** A serdülő-röplabdacsapat testmagasságai (gyakorisági oszlopdiagram). */
export const VolleyballHeightsSvg: React.FC<{ className?: string }> = ({ className }) => (
  <SFig w={280} h={170} className={cls(className ?? 'w-full max-w-[360px] h-auto mx-auto')} title="Röplabdacsapat: testmagasság gyakorisága">
    <SBarChart
      x0={34}
      y0={140}
      w={230}
      h={100}
      yMax={5}
      ticks={[0, 1, 2, 3, 4, 5]}
      showValues
      color={S_PURPLE}
      tickFmt={(v) => String(v)}
      data={[
        { label: '168 cm', value: 2 },
        { label: '170 cm', value: 3 },
        { label: '171 cm', value: 4 },
        { label: '172 cm', value: 3 },
        { label: '175 cm', value: 3 }
      ]}
    />
    <SText x={150} y={164} t={`x̄ = ${hu(171.4, 1)} cm, σ ≈ ${hu(2.154, 2)} cm`} s={8.5} c={S_RED} b />
  </SFig>
);

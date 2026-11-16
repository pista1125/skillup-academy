import React from 'react';
import { SFig, SText, STable, SWheel, SPie, SBoxPlot, S_RED, S_AXIS, S_BLUE, S_AMBER, S_GREEN, S_PURPLE, S_TEAL, S_INK } from './statKit';

/** A fejezet áttekintő térképe: statisztika és valószínűségszámítás. */
export const StatProbExam12ChapterMapSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-[560px] h-auto mx-auto' }) => {
  const left = ['1. Adatgyűjtés, minta', '2. Statisztikai jellemzők', '3. Diagramok', '4. Osztályközepek'];
  const right = ['5. Eseménytér', '6. Események összege, szorzata', '7. Esemény valószínűsége', '8. Geometriai valószínűség', '9. Várható érték', '10. Mintavételek'];
  return (
    <SFig w={360} h={200} className={className} title="III. Statisztika és valószínűségszámítás">
      <rect x={12} y={26} width={156} height={164} rx={10} fill={S_BLUE} fillOpacity={0.08} stroke={S_BLUE} />
      <rect x={192} y={26} width={156} height={164} rx={10} fill={S_GREEN} fillOpacity={0.08} stroke={S_GREEN} />
      <SText x={90} y={42} t="STATISZTIKA" s={9} b c={S_BLUE} />
      <SText x={270} y={42} t="VALÓSZÍNŰSÉGSZÁMÍTÁS" s={9} b c={S_GREEN} />
      {left.map((t, i) => (
        <g key={t}>
          <rect x={22} y={52 + i * 33} width={136} height={24} rx={6} fill="#ffffff" stroke={S_BLUE} strokeWidth={0.8} />
          <SText x={90} y={67 + i * 33} t={t} s={8} />
        </g>
      ))}
      {right.map((t, i) => (
        <g key={t}>
          <rect x={202} y={50 + i * 23} width={136} height={19} rx={5} fill="#ffffff" stroke={S_GREEN} strokeWidth={0.8} />
          <SText x={270} y={62.5 + i * 23} t={t} s={7.5} />
        </g>
      ))}
      <path d="M 170 100 L 190 100" stroke={S_INK} strokeWidth={1.2} />
      <SText x={180} y={94} t="↔" s={9} c={S_AXIS} />
      <SText x={180} y={118} t="rel. gyak. ↔ P" s={6} c={S_AXIS} />
      <SText x={180} y={126} t="átlag ↔ E" s={6} c={S_AXIS} />
    </SFig>
  );
};

/** Dobozdiagram a négy osztállyal (44. lecke, 2. feladat). */
export const StatProbExam12BoxQuartersSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-[420px] h-auto mx-auto' }) => (
  <SFig w={280} h={130} className={className} title="Négy osztály, mindegyikbe az adatok negyede esik">
    <SBoxPlot q={[10, 25, 35, 50, 70]} axMin={5} axMax={75} ticks={[]} x0={20} w={240} y={62} bh={30} qLabels={['Q0', 'Q1', 'Q2', 'Q3', 'Q4']} />
    {[
      ['A', 17.5, S_BLUE],
      ['B', 30, S_GREEN],
      ['C', 42.5, S_AMBER],
      ['D', 60, S_PURPLE]
    ].map(([t, v, c]) => (
      <SText key={t as string} x={20 + (((v as number) - 5) / 70) * 240} y={104} t={t as string} s={11} b c={c as string} />
    ))}
    <SText x={140} y={122} t="P(A) = P(B) = P(C) = P(D) = 1/4" s={8} c={S_RED} b />
  </SFig>
);

/** Két részvény jellemzői (44. lecke, 3. feladat). */
export const StatProbExam12StockCompareSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-[420px] h-auto mx-auto' }) => (
  <SFig w={290} h={112} className={className} title="Melyik részvény a kockázatosabb?">
    <STable
      x={14}
      y={24}
      colW={[110, 76, 76]}
      rowH={18}
      s={8.5}
      rows={[
        ['', 'A részvény', 'B részvény'],
        ['átlagos árfolyam', '12 500 Ft', '1840 Ft'],
        ['átlagos hozam', '13%', '24%'],
        ['hozam szórása', '3%', '6%']
      ]}
    />
  </SFig>
);

/** Két kocka 6 × 6-os táblázata: összeg 5 (A) és szorzat 4 (B) (tudáspróba 2.). */
export const StatProbExam12DiceTableSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-[360px] h-auto mx-auto' }) => {
  const cell = 20;
  const x0 = 50;
  const y0 = 34;
  return (
    <SFig w={240} h={176} className={className} title="Két kocka: A = {összeg 5}, B = {szorzat 4}">
      {Array.from({ length: 6 }, (_, i) => (
        <g key={`h${i}`}>
          <SText x={x0 + i * cell + cell / 2} y={y0 - 4} t={String(i + 1)} s={8} b c={S_AXIS} />
          <SText x={x0 - 8} y={y0 + i * cell + cell / 2 + 3} t={String(i + 1)} s={8} b c={S_AXIS} />
        </g>
      ))}
      {Array.from({ length: 36 }, (_, idx) => {
        const r = Math.floor(idx / 6) + 1;
        const c = (idx % 6) + 1;
        const a = r + c === 5;
        const b = r * c === 4;
        const fill = a && b ? '#c4b5fd' : a ? '#bfdbfe' : b ? '#fde68a' : '#ffffff';
        return (
          <g key={idx}>
            <rect x={x0 + (c - 1) * cell} y={y0 + (r - 1) * cell} width={cell} height={cell} fill={fill} stroke="#94a3b8" strokeWidth={0.6} />
            {(a || b) && <SText x={x0 + (c - 1) * cell + cell / 2} y={y0 + (r - 1) * cell + cell / 2 + 3} t={a && b ? 'AB' : a ? 'A' : 'B'} s={7} b />}
          </g>
        );
      })}
      <SText x={x0 + 3 * cell} y={y0 + 6 * cell + 14} t="P(A) = 4/36, P(B) = 3/36, P(A · B) = 2/36" s={7.5} c={S_RED} b />
    </SFig>
  );
};

/** A tudáspróba szerencsekereke. */
export const StatProbExam12WheelSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-[300px] h-auto mx-auto' }) => (
  <SFig w={240} h={170} className={className} title="Tudáspróba 4.: szerencsekerék">
    <SWheel
      cy={95}
      r={62}
      s={7.5}
      sectors={[
        { label: '3000 Ft', deg: 60, color: S_RED, showDeg: true },
        { label: '200 Ft', deg: 150, color: S_BLUE, showDeg: true },
        { label: '5000 Ft', deg: 30, color: S_PURPLE, showDeg: true },
        { label: '500 Ft', deg: 120, color: S_AMBER, showDeg: true }
      ]}
    />
  </SFig>
);

/** Az érettségi eredmények kördiagramja (43. lecke, 2. d) feladat). */
export const StatProbExam12GradesPieSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-[320px] h-auto mx-auto' }) => (
  <SFig w={250} h={150} className={className} title="24 fős osztály matematika-érettségije">
    <SPie cx={78} cy={84} r={54} values={[60, 150, 45, 105]} labels={['60°', '150°', '45°', '?']} colors={[S_GREEN, S_BLUE, S_RED, S_TEAL]} />
    {[
      ['jeles (4 fő)', S_GREEN],
      ['jó', S_BLUE],
      ['elégséges', S_RED],
      ['közepes', S_TEAL]
    ].map(([t, c], i) => (
      <g key={t}>
        <rect x={150} y={50 + i * 20} width={10} height={10} fill={c} fillOpacity={0.8} />
        <SText x={165} y={59 + i * 20} t={t} s={8.5} a="start" />
      </g>
    ))}
  </SFig>
);

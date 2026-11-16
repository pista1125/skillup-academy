import React from 'react';
import { Frame, T, Venn2, C_BLUE, C_RED, C_GREEN, C_PURPLE, C_EDGE, C_AMBER, F_BLUE, F_RED, F_PURPLE, F_GREEN, F_AMBER } from './probKit';

type FigProps = { className?: string };
const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

/** A három érme elemi eseményei a Venn-diagramon (A: a 10 Ft-oson írás, B: pontosan egy fej). */
export const COIN_VENN_ITEMS = (x0: number, y0: number, s = 1) =>
  [
    { x: 92, y: 72, t: 'III' },
    { x: 86, y: 100, t: 'IFF' },
    { x: 120, y: 70, t: 'IIF' },
    { x: 120, y: 98, t: 'IFI' },
    { x: 170, y: 86, t: 'FII' },
    { x: 34, y: 136, t: 'FFF' },
    { x: 214, y: 132, t: 'FFI' },
    { x: 214, y: 34, t: 'FIF' }
  ].map((it) => ({ ...it, x: x0 + it.x * s, y: y0 + it.y * s, s: 10 * s }));

// 1. ábra: a kidolgozott feladat Venn-diagramja
export const CoinEventsVennSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <Frame title="Három érme: A = a 10 Ft-oson írás, B = pontosan egy fej" className={className} h={290}>
    <g transform="translate(20 40) scale(1.2)">
      <Venn2 x={0} y={0} w={240} h={160} r={52} gap={74} shade={{ aOnly: F_BLUE, ab: F_PURPLE, bOnly: F_RED }} items={COIN_VENN_ITEMS(0, 0)} />
    </g>
    <T x={330} y={70} t="A: III, IIF, IFI, IFF (4)" s={11} c={C_BLUE} a="start" />
    <T x={330} y={92} t="B: IIF, IFI, FII (3)" s={11} c={C_RED} a="start" />
    <T x={330} y={130} t="A vagy B (A + B):" s={11} b a="start" />
    <T x={330} y={148} t="5 elemi esemény" s={11} a="start" />
    <T x={330} y={180} t="A és B (A · B):" s={11} b c={C_PURPLE} a="start" />
    <T x={330} y={198} t="IIF, IFI → 2 elemi esemény" s={11} c={C_PURPLE} a="start" />
  </Frame>
);

// 2. ábra: események összege és szorzata
export const SumProductVennSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <Frame title="Események összege (A + B) és szorzata (A · B)" className={className} h={250}>
    <g transform="translate(16 44)">
      <Venn2 w={210} h={150} r={44} gap={56} shade={{ aOnly: F_GREEN, ab: F_GREEN, bOnly: F_GREEN }} />
      <T x={115} y={172} t="A + B: legalább az egyik bekövetkezik" s={10} c={C_GREEN} b />
    </g>
    <g transform="translate(250 44)">
      <Venn2 w={210} h={150} r={44} gap={56} shade={{ ab: F_PURPLE }} />
      <T x={115} y={172} t="A · B: mindkettő bekövetkezik" s={10} c={C_PURPLE} b />
    </g>
  </Frame>
);

// 3. ábra: a hét időjárása (tankönyv 1. feladat)
const DAYS = ['hétfő', 'kedd', 'szerda', 'csüt.', 'péntek', 'szomb.', 'vas.'];
const TEMP = [14, 18, 17, 10, 9, 10, 12];
const RAIN = [0, 4, 12, 8, 0, 0, 6];
const WIND = [5, 8, 2, 26, 18, 3, 0];
export const WEATHER = { DAYS, TEMP, RAIN, WIND };

export const WeatherWeekSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const x0 = 110;
  const cw = 50;
  const rows: { name: string; vals: string[]; ok: boolean[]; f: string }[] = [
    { name: 'hőmérséklet', vals: TEMP.map((t) => `${t} °C`), ok: TEMP.map((t) => t > 10), f: F_BLUE },
    { name: 'csapadék', vals: RAIN.map((r) => `${r} mm`), ok: RAIN.map((r) => r > 5), f: F_RED },
    { name: 'szél (km/h)', vals: WIND.map((w) => (w === 0 ? 'csend' : String(w))), ok: WIND.map((w) => w > 5), f: F_AMBER }
  ];
  return (
    <Frame title="Egy hét időjárása: A (> 10 °C), B (> 5 mm), C (szél > 5)" className={className} h={250}>
      {DAYS.map((d, j) => (
        <T key={d} x={x0 + j * cw + cw / 2} y={52} t={d} s={10} b />
      ))}
      {rows.map((r, i) => (
        <g key={r.name}>
          <T x={x0 - 6} y={80 + i * 34} t={`${['A', 'B', 'C'][i]}: ${r.name}`} s={10} a="end" b c={[C_BLUE, C_RED, C_AMBER][i]} />
          {r.vals.map((v, j) => (
            <g key={j}>
              <rect x={x0 + j * cw} y={64 + i * 34} width={cw} height={32} fill={r.ok[j] ? r.f : '#ffffff'} stroke="#94a3b8" />
              <T x={x0 + j * cw + cw / 2} y={80 + i * 34} t={v} s={10} />
            </g>
          ))}
        </g>
      ))}
      <T x={240} y={186} t="színes mező: az esemény bekövetkezett aznap" s={11} c="#475569" />
      <T x={240} y={208} t="B · C: csak csütörtök · A · B · C: egyetlen nap sem (lehetetlen)" s={11} b c={C_PURPLE} />
    </Frame>
  );
};

/** Kapcsoló rajza: zárt (vízszintes) vagy nyitott (felhajtott) kar. */
export const SwitchGlyph: React.FC<{ x: number; y: number; label: string; closed?: boolean; c?: string }> = ({ x, y, label, closed, c = C_EDGE }) => (
  <g>
    <circle cx={x} cy={y} r={3} fill={c} />
    <circle cx={x + 36} cy={y} r={3} fill={c} />
    {closed === undefined ? (
      <line x1={x} y1={y} x2={x + 33} y2={y - 12} stroke={c} strokeWidth={2.4} />
    ) : closed ? (
      <line x1={x} y1={y} x2={x + 36} y2={y} stroke={C_GREEN} strokeWidth={2.8} />
    ) : (
      <line x1={x} y1={y} x2={x + 31} y2={y - 16} stroke={C_RED} strokeWidth={2.8} />
    )}
    <T x={x + 18} y={y - 22} t={label} s={12} b c={c} />
  </g>
);

/**
 * Áramkör a tankönyvi ábra szerint: áramforrás → lámpa → elágazás; az egyik ágban az A kapcsoló,
 * a másik ágban a sorba kötött B és C kapcsoló. A lámpa pontosan akkor világít, ha A + B · C bekövetkezik.
 */
export const Circuit: React.FC<{ a?: boolean; b?: boolean; c?: boolean; lit?: boolean; x?: number; y?: number }> = ({ a, b, c, lit, x = 0, y = 0 }) => {
  const W = C_EDGE;
  return (
    <g transform={`translate(${x} ${y})`}>
      {/* felső vezeték: forrás → lámpa → elágazás */}
      <polyline points="24,96 24,36 52,36" fill="none" stroke={W} strokeWidth={2} />
      <circle cx={64} cy={36} r={12} fill={lit ? '#fde047' : '#ffffff'} stroke={W} strokeWidth={2} />
      <line x1={55.5} y1={27.5} x2={72.5} y2={44.5} stroke={W} strokeWidth={1.5} />
      <line x1={72.5} y1={27.5} x2={55.5} y2={44.5} stroke={W} strokeWidth={1.5} />
      <T x={64} y={62} t="lámpa" s={10} c="#475569" />
      <polyline points="76,36 140,36" fill="none" stroke={W} strokeWidth={2} />
      <circle cx={104} cy={36} r={2.6} fill={W} />
      {/* 1. ág: az A kapcsoló */}
      <SwitchGlyph x={140} y={36} label="A" closed={a} />
      <polyline points="176,36 222,36 222,140" fill="none" stroke={W} strokeWidth={2} />
      {/* 2. ág: a sorba kötött B és C kapcsoló */}
      <polyline points="104,36 104,98 112,98" fill="none" stroke={W} strokeWidth={2} />
      <SwitchGlyph x={112} y={98} label="B" closed={b} />
      <polyline points="148,98 166,98" fill="none" stroke={W} strokeWidth={2} />
      <SwitchGlyph x={166} y={98} label="C" closed={c} />
      <polyline points="202,98 222,98" fill="none" stroke={W} strokeWidth={2} />
      <circle cx={222} cy={98} r={2.6} fill={W} />
      {/* alsó vezeték vissza az áramforráshoz */}
      <polyline points="222,140 24,140 24,104" fill="none" stroke={W} strokeWidth={2} />
      <line x1={12} y1={104} x2={36} y2={104} stroke={W} strokeWidth={2.4} />
      <line x1={18} y1={96} x2={30} y2={96} stroke={W} strokeWidth={4} />
      <T x={32} y={124} t="forrás" s={10} c="#475569" a="start" />
    </g>
  );
};

// 4. ábra: áramkör kapcsolókkal
export const SwitchCircuitSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <Frame title="Áramkör: a lámpa akkor világít, ha A + B · C bekövetkezik" className={className} h={240}>
    <g transform="translate(20 40)">
      <Circuit />
    </g>
    <T x={290} y={80} t="A: az A kapcsoló zárva" s={11} a="start" />
    <T x={290} y={100} t="B: a B kapcsoló zárva" s={11} a="start" />
    <T x={290} y={120} t="C: a C kapcsoló zárva" s={11} a="start" />
    <T x={290} y={150} t="az A ág és a sorba kötött" s={11} a="start" b c={C_PURPLE} />
    <T x={290} y={168} t="B, C ág párhuzamos" s={11} a="start" b c={C_PURPLE} />
  </Frame>
);

// 5. ábra: legalább / legfeljebb hány elemi esemény? (|A| = 18, |B| = 15)
export const CountBoundsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <Frame title="|A| = 18, |B| = 15: a két szélső helyzet" className={className} h={260}>
    <g transform="translate(16 44)">
      <Venn2 w={210} h={150} r={52} noB shade={{ aOnly: F_BLUE }} labelA="A: 18" />
      <circle cx={115} cy={83} r={34} fill={F_RED} stroke={C_RED} strokeWidth={1.8} />
      <T x={115} y={84} t="B: 15" s={11} b c={C_RED} />
      <T x={115} y={172} t="B ⊂ A: A + B = 18, A · B = 15" s={10} b c={C_EDGE} />
    </g>
    <g transform="translate(250 44)">
      <Venn2 w={210} h={150} r={42} gap={96} shade={{ aOnly: F_BLUE, bOnly: F_RED }} labelA="A: 18" labelB="B: 15" />
      <T x={115} y={172} t="kizárók: A + B = 33, A · B = 0" s={10} b c={C_EDGE} />
    </g>
    <T x={240} y={238} t="Tehát 18 ≤ |A + B| ≤ 33 és 0 ≤ |A · B| ≤ 15 (ha H elég nagy)" s={11} c={C_AMBER} b />
  </Frame>
);

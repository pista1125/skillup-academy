import React from 'react';
import { SFig, SText, SVenn, STable, SBarChart, S_BLUE, S_RED, S_GREEN, S_AMBER, S_AXIS, S_INK, S_PURPLE } from './statKit';

const cls = (c?: string) => c ?? 'w-full max-w-[460px] h-auto mx-auto';

/** Literary Digest vs. Gallup (1936): torzított, nagy minta kontra kis, reprezentatív minta. */
export const LiteraryDigestSvg: React.FC<{ className?: string }> = ({ className }) => {
  // sokaság: 60 pont, 1/3-uk „vagyonos” (kék), a többi (szürke)
  const dots = Array.from({ length: 60 }, (_, i) => ({ x: 22 + (i % 10) * 13, y: 42 + Math.floor(i / 10) * 15, rich: i % 3 === 0 }));
  return (
    <SFig w={420} h={170} className={cls(className)} title="1936: Literary Digest kontra Gallup">
      <SText x={86} y={32} t="a teljes választói sokaság" s={9} c={S_AXIS} b />
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={4.2} fill={d.rich ? S_BLUE : '#94a3b8'} />
      ))}
      <circle cx={200} cy={150} r={4} fill={S_BLUE} />
      <SText x={208} y={153} t="vagyonosabb (olvasó, autó-, telefontulajdonos)" s={8} a="start" c={S_AXIS} />
      <circle cx={18} cy={150} r={4} fill="#94a3b8" />
      <SText x={26} y={153} t="többi választó" s={8} a="start" c={S_AXIS} />
      {/* Literary Digest */}
      <rect x={180} y={28} width={110} height={104} rx={8} fill="#fee2e2" stroke={S_RED} />
      <SText x={235} y={42} t="Literary Digest" s={9} c={S_RED} b />
      <SText x={235} y={54} t="2,4 millió válasz" s={8} />
      {Array.from({ length: 12 }, (_, i) => (
        <circle key={i} cx={198 + (i % 6) * 15} cy={70 + Math.floor(i / 6) * 14} r={4.2} fill={i === 11 ? '#94a3b8' : S_BLUE} />
      ))}
      <SText x={235} y={110} t="torzított minta" s={8.5} c={S_RED} b />
      <SText x={235} y={123} t="tipp: Landon +19% ✗" s={8} />
      {/* Gallup */}
      <rect x={300} y={28} width={110} height={104} rx={8} fill="#dcfce7" stroke={S_GREEN} />
      <SText x={355} y={42} t="Gallup" s={9} c={S_GREEN} b />
      <SText x={355} y={54} t="50 000 fő" s={8} />
      {Array.from({ length: 6 }, (_, i) => (
        <circle key={i} cx={325 + (i % 3) * 25} cy={70 + Math.floor(i / 3) * 14} r={4.2} fill={i === 0 ? S_BLUE : '#94a3b8'} />
      ))}
      <SText x={355} y={110} t="reprezentatív minta" s={8.5} c={S_GREEN} b />
      <SText x={355} y={123} t="Roosevelt győz ✓" s={8} />
    </SFig>
  );
};

/** A város lakossága 8 osztályban és az arányos 2000 fős minta. */
export const StratifiedSampleSvg: React.FC<{ className?: string }> = ({ className }) => (
  <SFig w={440} h={178} className={cls(className)} title="Rétegzett (arányos) minta: 13 000 lakos → 2000 fő">
    <STable
      x={8}
      y={24}
      colW={[92, 84, 62, 62, 62]}
      rowH={17}
      s={8}
      rows={[
        ['Lakosság', 'Legf. alapfokú', 'Szakiskola', 'Érettségi', 'Felsőfokú'],
        ['Nők (6600)', 1927, 1281, 2271, 1121],
        ['Férfiak (6400)', 1610, 1963, 1845, 982]
      ]}
    />
    <SText x={190} y={88} t="× 2000 / 13 000 ≈ × 0,1538" s={9} c={S_PURPLE} b />
    <STable
      x={8}
      y={96}
      colW={[92, 84, 62, 62, 62]}
      rowH={17}
      s={8}
      rows={[
        ['Minta', 'Legf. alapfokú', 'Szakiskola', 'Érettségi', 'Felsőfokú'],
        ['Nők', 297, 197, 349, 172],
        ['Férfiak', 248, 302, 284, 151]
      ]}
      highlight={[[1, 1]]}
    />
    <SText x={405} y={30} t="kerekítés:" s={8} c={S_AXIS} a="middle" b />
    <SText x={405} y={44} t="296,46 → 296" s={7.5} c={S_AXIS} />
    <SText x={405} y={56} t="összeg: 1999" s={7.5} c={S_AXIS} />
    <SText x={405} y={68} t="egy ,46-ot felfelé:" s={7.5} c={S_AXIS} />
    <SText x={405} y={80} t="297 → összeg 2000" s={7.5} c={S_RED} b />
    <SText x={220} y={166} t="Minden osztály aránya a mintában ugyanaz, mint a teljes lakosságban." s={8.5} c={S_INK} />
  </SFig>
);

/** Törzsvásárlói kártya és kuponhasználat Venn-diagramja (%). */
export const CouponVennSvg: React.FC<{ className?: string }> = ({ className }) => (
  <SFig w={240} h={170} className={cls(className ?? 'w-full max-w-[320px] h-auto mx-auto')} title="A vásárlók megoszlása (%)">
    <SVenn onlyA="48%" both="12%" onlyB="13%" none="27%" labelA="kártya (60%)" labelB="kupon (25%)" labelU="vásárlók" cy={92} />
  </SFig>
);

/** A biztosító ügyfelei: fadiagram. */
export const InsuranceTreeSvg: React.FC<{ className?: string }> = ({ className }) => {
  const node = (x: number, y: number, t1: string, t2: string, c: string) => (
    <g>
      <rect x={x - 52} y={y - 15} width={104} height={30} rx={7} fill="#ffffff" stroke={c} strokeWidth={1.5} />
      <SText x={x} y={y - 3} t={t1} s={8} c={c} b />
      <SText x={x} y={y + 9} t={t2} s={8} />
    </g>
  );
  return (
    <SFig w={440} h={190} className={cls(className)} title="5000 ügyfél: rendszeres vezetők és balesetek">
      <line x1={220} y1={48} x2={110} y2={90} stroke={S_AXIS} />
      <line x1={220} y1={48} x2={330} y2={90} stroke={S_AXIS} />
      <line x1={110} y1={105} x2={60} y2={145} stroke={S_AXIS} />
      <line x1={110} y1={105} x2={160} y2={145} stroke={S_AXIS} />
      <line x1={330} y1={105} x2={280} y2={145} stroke={S_AXIS} />
      <line x1={330} y1={105} x2={380} y2={145} stroke={S_AXIS} />
      {node(220, 40, 'összes ügyfél', '5000 fő', S_INK)}
      {node(110, 98, 'rendszeres (72%)', '3600 fő', S_BLUE)}
      {node(330, 98, 'nem rendszeres (28%)', '1400 fő', S_AMBER)}
      {node(60, 158, 'baleset', '300 − 126 = 174', S_RED)}
      {node(160, 158, 'nincs baleset', '3426', S_GREEN)}
      {node(280, 158, 'baleset (9%)', '126', S_RED)}
      {node(380, 158, 'nincs baleset', '1274', S_GREEN)}
      <SText x={220} y={186} t="összes baleset: 6% · 5000 = 300" s={8.5} c={S_RED} b />
    </SFig>
  );
};

/** Külföldi látogatók nemzetek szerinti aránya: sokaság kontra 1000 fős minta. */
export const VisitorSharesSvg: React.FC<{ className?: string }> = ({ className }) => (
  <SFig w={300} h={170} className={cls(className ?? 'w-full max-w-[380px] h-auto mx-auto')} title="Nemzetek aránya (%) – KSH 2021 (kék) és a minta (narancs)">
    <SBarChart
      x0={34}
      y0={138}
      w={250}
      h={100}
      yMax={40}
      ticks={[0, 10, 20, 30, 40]}
      gap={0.3}
      color={S_BLUE}
      color2={S_AMBER}
      labelSize={7.5}
      data={[
        { label: 'Románia', value: 36.7, value2: 36.5 },
        { label: 'Szlovákia', value: 24.9, value2: 25.0 },
        { label: 'Ausztria', value: 22.7, value2: 22.6 },
        { label: 'Lengyelo.', value: 5.9, value2: 6.0 },
        { label: 'Németo.', value: 9.9, value2: 9.9 }
      ]}
    />
  </SFig>
);

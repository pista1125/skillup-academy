import React from 'react';
import { Frame, T, Venn2, DiceGrid, C_BLUE, C_RED, C_GREEN, C_PURPLE, C_EDGE, C_AMBER, F_BLUE, F_RED, F_PURPLE, F_GREEN, F_AMBER } from './probKit';

type FigProps = { className?: string };
const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

/** A három érme elemi eseményei (A: a 10 Ft-oson írás, B: pontosan egy fej). */
export const coinItems = (s = 1) =>
  [
    { x: 92, y: 72, t: 'III' },
    { x: 86, y: 100, t: 'IFF' },
    { x: 120, y: 70, t: 'IIF' },
    { x: 120, y: 98, t: 'IFI' },
    { x: 170, y: 86, t: 'FII' },
    { x: 34, y: 136, t: 'FFF' },
    { x: 214, y: 132, t: 'FFI' },
    { x: 214, y: 34, t: 'FIF' }
  ].map((it) => ({ ...it, x: it.x * s, y: it.y * s, s: 10 * s }));

/** A társasjáték lépésszáma: ha a fehér 1-es, hatosra fordítjuk. */
export const boardStep = (w: number, b: number) => (w === 1 ? 6 : w) + b;

// 1. ábra: a kidolgozott feladat valószínűségei
export const CoinProbabilityVennSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <Frame title="Három érme: kedvező elemi események / 8" className={className} h={290}>
    <g transform="translate(20 40) scale(1.2)">
      <Venn2 x={0} y={0} w={240} h={160} r={52} gap={74} shade={{ aOnly: F_BLUE, ab: F_PURPLE, bOnly: F_RED }} items={coinItems()} />
    </g>
    <T x={330} y={68} t="P(A) = 4/8 = 0,5" s={12} c={C_BLUE} a="start" b />
    <T x={330} y={98} t="P(B) = 3/8 = 0,375" s={12} c={C_RED} a="start" b />
    <T x={330} y={128} t="P(A + B) = 5/8 = 0,625" s={12} c={C_GREEN} a="start" b />
    <T x={330} y={158} t="P(A · B) = 2/8 = 0,25" s={12} c={C_PURPLE} a="start" b />
    <T x={330} y={196} t="A: a 10 Ft-oson írás" s={10} a="start" />
    <T x={330} y={212} t="B: pontosan egy fej" s={10} a="start" />
  </Frame>
);

// 2. ábra: klasszikus valószínűség két kockával (összeg 7)
export const ClassicDiceSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <Frame title="Klasszikus modell: kedvező / összes elemi esemény" className={className} h={290}>
    <DiceGrid x={80} y={70} cell={30} fs={9} text={(w, b) => String(w + b)} hl={(w, b) => (w + b === 7 ? F_GREEN : undefined)} />
    <T x={300} y={100} t="A: a dobások összege 7" s={12} a="start" b />
    <T x={300} y={130} t="kedvező: 6 elemi esemény" s={11} a="start" c={C_GREEN} />
    <T x={300} y={150} t="összes: 6 · 6 = 36" s={11} a="start" />
    <T x={300} y={184} t="P(A) = 6/36 = 1/6" s={14} a="start" b c={C_GREEN} />
    <T x={300} y={216} t="P(Ā) = 1 − 1/6 = 5/6" s={12} a="start" c={C_AMBER} />
  </Frame>
);

// 3. ábra: a társasjáték lépései (tankönyv 2. feladat)
export const BoardGameStepsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <Frame title="Lépésszám: fehér + fekete (a fehér 1-est 6-osra fordítjuk)" className={className} h={290}>
    <DiceGrid
      x={80}
      y={70}
      cell={30}
      fs={10}
      text={(w, b) => String(boardStep(w, b))}
      hl={(w) => (w === 1 ? F_AMBER : undefined)}
    />
    <T x={300} y={86} t="1. sor: 6 + fekete" s={11} a="start" c={C_AMBER} b />
    <T x={300} y={112} t="P(6 lépés) = 4/36 = 1/9" s={11} a="start" />
    <T x={300} y={136} t="P(8 vagy 9) = 11/36" s={11} a="start" />
    <T x={300} y={160} t="P(legfeljebb 4) = 3/36 = 1/12" s={11} a="start" />
    <T x={300} y={184} t="P(legalább 10) = 9/36 = 1/4" s={11} a="start" />
    <T x={300} y={220} t="(3 és 12 közötti lépés)" s={10} a="start" c="#475569" />
  </Frame>
);

// 4. ábra: háromjegyű számok – helyiértékes doboz-modell
export const ThreeDigitSlotsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const box = (x: number, y: number, top: string, n: string, c: string) => (
    <g>
      <rect x={x} y={y} width={60} height={50} rx={8} fill="#ffffff" stroke={c} strokeWidth={2} />
      <T x={x + 30} y={y + 26} t={n} s={18} b c={c} />
      <T x={x + 30} y={y - 10} t={top} s={10} c="#475569" />
    </g>
  );
  return (
    <Frame title="Háromjegyű számok (100–999): összesen 9 · 10 · 10 = 900" className={className} h={260}>
      <T x={40} y={92} t="nincs 5-ös:" s={11} a="start" b />
      {box(140, 70, 'százas (nem 0, nem 5)', '8', C_BLUE)}
      <T x={215} y={95} t="·" s={20} b />
      {box(230, 70, 'tízes (nem 5)', '9', C_BLUE)}
      <T x={305} y={95} t="·" s={20} b />
      {box(320, 70, 'egyes (nem 5)', '9', C_BLUE)}
      <T x={400} y={95} t="= 648" s={13} b c={C_BLUE} a="start" />
      <T x={240} y={150} t="P(nincs 5-ös) = 648/900 = 0,72" s={12} b c={C_BLUE} />
      <T x={240} y={176} t="P(legalább egy 5-ös) = 1 − 0,72 = 0,28" s={12} b c={C_RED} />
      <T x={240} y={202} t="pontosan egy 5-ös: 81 + 72 + 72 = 225 → 0,25" s={12} b c={C_PURPLE} />
      <T x={240} y={232} t="(5 _ _: 1 · 9 · 9;  _ 5 _: 8 · 1 · 9;  _ _ 5: 8 · 9 · 1)" s={10} c="#475569" />
    </Frame>
  );
};

// 5. ábra: független események két kockával
export const IndependentDiceSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <Frame title="Független események: P(A · B) = P(A) · P(B)" className={className} h={290}>
    <DiceGrid
      x={80}
      y={70}
      cell={30}
      fs={9}
      hl={(w, b) => (w === 6 && b === 6 ? F_PURPLE : w === 6 ? F_BLUE : b === 6 ? F_RED : undefined)}
    />
    <T x={300} y={86} t="A: a fehér hatos → 6/36 = 1/6" s={11} a="start" c={C_BLUE} b />
    <T x={300} y={110} t="B: a fekete hatos → 6/36 = 1/6" s={11} a="start" c={C_RED} b />
    <T x={300} y={140} t="A · B: (6;6) → 1/36" s={11} a="start" c={C_PURPLE} b />
    <T x={300} y={170} t="1/6 · 1/6 = 1/36 ✓" s={13} a="start" b c={C_GREEN} />
    <T x={300} y={200} t="Az egyik kocka eredménye" s={10} a="start" c={C_EDGE} />
    <T x={300} y={216} t="nem befolyásolja a másikat." s={10} a="start" c={C_EDGE} />
  </Frame>
);

import React from 'react';
import { Frame, T, Coin, Venn2, DiceGrid, BarT, C_BLUE, C_RED, C_GREEN, C_PURPLE, C_EDGE, F_BLUE, F_RED, F_GREEN, F_AMBER, F_PURPLE } from './probKit';

type FigProps = { className?: string };
const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

const OUTCOMES3 = ['FFF', 'FFI', 'FIF', 'FII', 'IFF', 'IFI', 'IIF', 'III'];

// 1. ábra: a három pénzérme (10, 20, 50 Ft) feldobásának fadiagramja
export const ThreeCoinsTreeSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const x0 = 40;
  const lv = [x0, 140, 240, 340];
  const ys = OUTCOMES3.map((_, i) => 58 + i * 28);
  const mid = (a: number, b: number) => (ys[a] + ys[b]) / 2;
  const l1 = [mid(0, 3), mid(4, 7)];
  const l2 = [mid(0, 1), mid(2, 3), mid(4, 5), mid(6, 7)];
  const root = mid(0, 7);
  return (
    <Frame title="Három különböző pénzérme: 2 · 2 · 2 = 8 kimenetel" className={className} h={300}>
      <Coin x={lv[1]} y={40} r={11} label="" fill="#fef3c7" />
      <T x={lv[1]} y={40.5} t="10" s={8} b c="#78350f" />
      <Coin x={lv[2]} y={40} r={11} fill="#fef3c7" />
      <T x={lv[2]} y={40.5} t="20" s={8} b c="#78350f" />
      <Coin x={lv[3]} y={40} r={11} fill="#fef3c7" />
      <T x={lv[3]} y={40.5} t="50" s={8} b c="#78350f" />
      <circle cx={lv[0]} cy={root} r={4} fill={C_EDGE} />
      {l1.map((y1, i) => (
        <g key={`a${i}`}>
          <line x1={lv[0]} y1={root} x2={lv[1] - 10} y2={y1} stroke="#94a3b8" strokeWidth={1.4} />
          <T x={lv[1]} y={y1} t={i === 0 ? 'F' : 'I'} s={13} b c={i === 0 ? C_BLUE : C_RED} />
        </g>
      ))}
      {l2.map((y2, i) => (
        <g key={`b${i}`}>
          <line x1={lv[1] + 10} y1={l1[Math.floor(i / 2)]} x2={lv[2] - 10} y2={y2} stroke="#94a3b8" strokeWidth={1.4} />
          <T x={lv[2]} y={y2} t={i % 2 === 0 ? 'F' : 'I'} s={13} b c={i % 2 === 0 ? C_BLUE : C_RED} />
        </g>
      ))}
      {ys.map((y3, i) => (
        <g key={`c${i}`}>
          <line x1={lv[2] + 10} y1={l2[Math.floor(i / 2)]} x2={lv[3] - 10} y2={y3} stroke="#94a3b8" strokeWidth={1.4} />
          <T x={lv[3]} y={y3} t={i % 2 === 0 ? 'F' : 'I'} s={13} b c={i % 2 === 0 ? C_BLUE : C_RED} />
          <rect x={372} y={y3 - 10} width={62} height={20} rx={6} fill={i < 3 || i === 4 ? F_GREEN : '#ffffff'} stroke="#94a3b8" />
          <T x={403} y={y3 + 0.5} t={OUTCOMES3[i]} s={11} b c={C_EDGE} />
        </g>
      ))}
      <T x={240} y={284} t="zöld: több fej, mint írás (FFF, FFI, FIF, IFF) – 4 lehetőség" s={11} c={C_GREEN} />
    </Frame>
  );
};

// 2. ábra: eseménytér, elemi esemény, esemény (Venn)
export const SampleSpaceVennSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <Frame title="Eseménytér (H), elemi események, események" className={className} h={280}>
    <g transform="translate(40 40) scale(1.25)">
      <Venn2
        w={240}
        h={160}
        r={50}
        gap={66}
        shade={{ aOnly: F_BLUE, ab: F_PURPLE, bOnly: F_RED }}
        items={[
          { x: 70, y: 70, t: '•' },
          { x: 90, y: 105, t: '•' },
          { x: 130, y: 94, t: '•' },
          { x: 168, y: 72, t: '•' },
          { x: 180, y: 110, t: '•' },
          { x: 30, y: 150, t: '•' },
          { x: 222, y: 40, t: '•' }
        ]}
      />
    </g>
    <T x={370} y={70} t="H: eseménytér" s={12} b c={C_EDGE} a="start" />
    <T x={370} y={88} t="= az elemi események" s={11} a="start" />
    <T x={370} y={102} t="halmaza" s={11} a="start" />
    <T x={370} y={130} t="•  elemi esemény" s={12} a="start" />
    <T x={370} y={150} t="(egy kimenetel)" s={11} a="start" />
    <T x={370} y={180} t="A, B: események" s={12} b c={C_BLUE} a="start" />
    <T x={370} y={198} t="= H részhalmazai" s={11} a="start" />
  </Frame>
);

// 3. ábra: két dobókocka 6 × 6-os táblázata
export const DiceTableSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <Frame title="Két dobókocka: 6 · 6 = 36 elemi esemény" className={className} h={300}>
    <DiceGrid
      x={80}
      y={70}
      cell={30}
      fs={9}
      text={(w, b) => `${w};${b}`}
      hl={(w, b) => (w === 6 && b === 6 ? F_PURPLE : w === 6 ? F_BLUE : b === 6 ? F_RED : undefined)}
    />
    <rect x={290} y={80} width={16} height={12} fill={F_BLUE} stroke="#94a3b8" />
    <T x={312} y={86} t="csak a fehér hatos" s={11} a="start" />
    <rect x={290} y={104} width={16} height={12} fill={F_RED} stroke="#94a3b8" />
    <T x={312} y={110} t="csak a fekete hatos" s={11} a="start" />
    <rect x={290} y={128} width={16} height={12} fill={F_PURPLE} stroke="#94a3b8" />
    <T x={312} y={134} t="mindkettő hatos (6;6)" s={11} a="start" />
    <T x={290} y={170} t="A: a fehér hatos → 6 elemi esemény" s={11} a="start" />
    <T x={290} y={190} t="B: pontosan egy hatos → 10" s={11} a="start" />
    <T x={290} y={210} t="C: van hatos → 11" s={11} a="start" />
    <T x={290} y={230} t="E: egyik sem hatos → 25" s={11} a="start" />
    <T x={290} y={256} t="C és E komplementerek:" s={11} b c={C_PURPLE} a="start" />
    <T x={290} y={274} t="11 + 25 = 36" s={11} b c={C_PURPLE} a="start" />
  </Frame>
);

// 4. ábra: komplementer esemény és egymást kizáró események
export const ComplementExclusiveSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <Frame title="Komplementer esemény és egymást kizáró események" className={className} h={250}>
    <g transform="translate(16 46)">
      <Venn2 w={210} h={150} r={46} noB shade={{ out: F_AMBER, aOnly: F_BLUE }} />
      <BarT x={180} y={130} t="A" s={14} c="#92400e" />
      <T x={105} y={170} t="Ā: pontosan akkor, ha A nem következik be" s={10} c="#92400e" />
    </g>
    <g transform="translate(250 46)">
      <Venn2 w={210} h={150} r={40} gap={100} shade={{ aOnly: F_BLUE, bOnly: F_RED }} />
      <T x={105} y={170} t="A és B nem következhetnek be egyszerre" s={10} c={C_RED} />
    </g>
  </Frame>
);

// 5. ábra: két játék kezdőjátékosa – 4 · 4 = 16 elemi esemény
export const TwoGamesStarterSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const names = ['A', 'B', 'C', 'D'];
  const full = ['Anna', 'Bea', 'Csaba', 'Dénes'];
  const x0 = 150;
  const y0 = 80;
  const s = 36;
  return (
    <Frame title="Ki kezdi az 1. és a 2. játékot? 4 · 4 = 16 elemi esemény" className={className} h={280}>
      <T x={x0 + 2 * s} y={50} t="2. játék kezdője" s={11} c="#475569" />
      <text x={x0 - 52} y={y0 + 2 * s} fontSize={11} fill="#475569" textAnchor="middle" transform={`rotate(-90 ${x0 - 52} ${y0 + 2 * s})`}>
        1. játék kezdője
      </text>
      {names.map((n, i) => (
        <g key={n}>
          <T x={x0 + i * s + s / 2} y={y0 - 12} t={full[i]} s={10} b />
          <T x={x0 - 22} y={y0 + i * s + s / 2} t={full[i]} s={10} b />
          {names.map((m, j) => (
            <g key={m}>
              <rect x={x0 + j * s} y={y0 + i * s} width={s} height={s} fill={i === 0 ? F_GREEN : j === 1 ? F_RED : '#ffffff'} stroke="#94a3b8" />
              <T x={x0 + j * s + s / 2} y={y0 + i * s + s / 2} t={n + m} s={11} c={C_EDGE} />
            </g>
          ))}
        </g>
      ))}
      <rect x={320} y={100} width={16} height={12} fill={F_GREEN} stroke="#94a3b8" />
      <T x={342} y={106} t="Anna kezdi az elsőt" s={11} a="start" />
      <T x={342} y={122} t="(AA, AB, AC, AD)" s={10} a="start" c={C_GREEN} />
      <rect x={320} y={146} width={16} height={12} fill={F_RED} stroke="#94a3b8" />
      <T x={342} y={152} t="K: Bea kezdi a másodikat" s={11} a="start" />
      <T x={320} y={190} t="K és N (Dénes kezdi a" s={11} a="start" />
      <T x={320} y={206} t="másodikat) kizárják egymást" s={11} a="start" />
    </Frame>
  );
};


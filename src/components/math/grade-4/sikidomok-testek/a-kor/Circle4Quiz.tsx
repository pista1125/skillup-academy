import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Circle4Matcher } from './Circle4Matcher';
import { Circle4Sorter } from './Circle4Sorter';

// ---------------------------------------------------------------------------
// Kérdésábrák – belső SVG-segédek (nem exportált)
// ---------------------------------------------------------------------------
const UNK = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 150 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

const Lbl: React.FC<{ x: number; y: number; t: string; c?: string; s?: number }> = ({ x, y, t, c = '#0f172a', s = 13 }) => (
  <text x={x} y={y} textAnchor="middle" fontSize={s} fontWeight="bold" fill={c}>
    {t}
  </text>
);

const Cross: React.FC<{ x: number; y: number; c?: string }> = ({ x, y, c = '#0f172a' }) => (
  <path d={`M ${x - 4} ${y - 4} L ${x + 4} ${y + 4} M ${x - 4} ${y + 4} L ${x + 4} ${y - 4}`} stroke={c} strokeWidth="2" />
);

const CountDiscsFig: React.FC = () => (
  <QFig h={130}>
    <circle cx="35" cy="50" r="22" fill="#93c5fd" stroke="#1e40af" strokeWidth="1.5" />
    <ellipse cx="95" cy="50" rx="30" ry="18" fill="#93c5fd" stroke="#1e40af" strokeWidth="1.5" />
    <polygon points="150,30 172,30 183,50 172,70 150,70 139,50" fill="#93c5fd" stroke="#1e40af" strokeWidth="1.5" />
    <circle cx="210" cy="55" r="16" fill="#93c5fd" stroke="#1e40af" strokeWidth="1.5" />
    <polygon points="60,115 80,80 100,115" fill="#93c5fd" stroke="#1e40af" strokeWidth="1.5" />
    <path d="M 114 115 A 28 28 0 0 1 170 115 Z" fill="#93c5fd" stroke="#1e40af" strokeWidth="1.5" />
    <text x="205" y="110" textAnchor="middle" fontSize="13" fontWeight="bold" fill={UNK}>? körlap</text>
  </QFig>
);

const WhichCenterFig: React.FC = () => (
  <QFig h={150}>
    <circle cx="110" cy="72" r="55" fill="#ffe4e6" stroke="#be123c" strokeWidth="2.5" />
    {(
      [
        [110, 72, 'A'],
        [165, 72, 'B'],
        [90, 50, 'C'],
        [200, 30, 'D']
      ] as [number, number, string][]
    ).map(([x, y, t]) => (
      <g key={t}>
        <circle cx={x} cy={y} r="3.5" fill="#0f172a" />
        <text x={x + 7} y={y + 14} fontSize="12" fontWeight="bold" fill="#0f172a">
          {t}
        </text>
      </g>
    ))}
  </QFig>
);

const RingsFig: React.FC<{ q?: string }> = ({ q = 'Hány kör?' }) => (
  <QFig h={120}>
    {(
      [
        [70, 45, '#3b82f6'],
        [120, 45, '#0f172a'],
        [170, 45, '#ef4444'],
        [95, 72, '#facc15'],
        [145, 72, '#22c55e']
      ] as [number, number, string][]
    ).map(([x, y, c], i) => (
      <circle key={i} cx={x} cy={y} r="22" fill="none" stroke={c} strokeWidth="4" />
    ))}
    <Lbl x={120} y={112} t={q} c={UNK} />
  </QFig>
);

const CompassRulerFig: React.FC = () => (
  <QFig h={130}>
    <rect x="15" y="80" width="210" height="30" rx="3" fill="#fef9c3" stroke="#a16207" />
    {Array.from({ length: 41 }, (_, i) => (
      <line key={i} x1={20 + i * 5} y1="80" x2={20 + i * 5} y2={i % 10 === 0 ? 93 : i % 5 === 0 ? 89 : 86} stroke="#713f12" />
    ))}
    {[0, 1, 2, 3, 4].map((i) => (
      <text key={i} x={20 + i * 50} y="105" textAnchor="middle" fontSize="10" fill="#713f12">
        {i}
      </text>
    ))}
    <line x1="95" y1="20" x2="20" y2="80" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
    <line x1="95" y1="20" x2="170" y2="80" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
    <line x1="170" y1="80" x2="160" y2="72" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" />
    <circle cx="95" cy="20" r="5" fill="#334155" />
    <Lbl x={205} y={50} t="? cm" c={UNK} />
  </QFig>
);

const NestedCirclesFig: React.FC = () => (
  <QFig h={140}>
    {[52, 42, 33, 25, 18, 11].map((r, i) => (
      <circle key={r} cx={60 + r} cy="70" r={r} fill="none" stroke={['#7e22ce', '#2563eb', '#16a34a', '#facc15', '#ea580c', '#db2777'][i]} strokeWidth="2.5" />
    ))}
    <Lbl x={205} y={75} t="Hány kör?" c={UNK} s={11} />
  </QFig>
);

const DiameterFig: React.FC<{ rLabel: string; ask?: boolean }> = ({ rLabel, ask = true }) => (
  <QFig h={140}>
    <circle cx="120" cy="68" r="55" fill="#fff1f2" stroke="#be123c" strokeWidth="2.5" />
    <line x1="120" y1="68" x2="175" y2="68" stroke="#0f172a" strokeWidth="2" />
    {ask && <line x1="65" y1="68" x2="120" y2="68" stroke={UNK} strokeWidth="2" strokeDasharray="5 3" />}
    <circle cx="120" cy="68" r="3" fill="#0f172a" />
    <circle cx="175" cy="68" r="3.5" fill="#0f172a" />
    {ask && <circle cx="65" cy="68" r="3.5" fill="#0f172a" />}
    <text x="122" y="62" fontSize="11" fontWeight="bold" fill="#0f172a">O</text>
    <Lbl x={150} y={88} t={rLabel} s={12} />
    {ask && <Lbl x={120} y={135} t="A két szemközti pont távolsága = ?" c={UNK} s={11} />}
  </QFig>
);

const WhichIsCircleFig: React.FC = () => (
  <QFig h={130}>
    <ellipse cx="38" cy="58" rx="28" ry="18" fill="#bbf7d0" stroke="#166534" strokeWidth="1.5" />
    <circle cx="95" cy="58" r="24" fill="#bbf7d0" stroke="#166534" strokeWidth="1.5" />
    <polygon points="145,36 165,36 178,58 165,80 145,80 132,58" fill="#bbf7d0" stroke="#166534" strokeWidth="1.5" />
    <path d="M 210 32 C 232 32 236 84 210 84 C 186 84 190 32 210 32 Z" fill="#bbf7d0" stroke="#166534" strokeWidth="1.5" />
    <Lbl x={38} y={112} t="A" />
    <Lbl x={95} y={112} t="B" />
    <Lbl x={155} y={112} t="C" />
    <Lbl x={210} y={112} t="D" />
  </QFig>
);

const EqualRadiiFig: React.FC = () => (
  <QFig h={140}>
    <circle cx="110" cy="70" r="55" fill="none" stroke="#be123c" strokeWidth="2.5" />
    <circle cx="110" cy="70" r="3" fill="#0f172a" />
    <text x="104" y="86" fontSize="11" fontWeight="bold" fill="#0f172a">O</text>
    <line x1="110" y1="70" x2="165" y2="70" stroke="#0f172a" strokeWidth="2" />
    <line x1="110" y1="70" x2="71.1" y2="31.1" stroke={UNK} strokeWidth="2" strokeDasharray="5 3" />
    <circle cx="165" cy="70" r="3.5" fill="#0f172a" />
    <circle cx="71.1" cy="31.1" r="3.5" fill="#0f172a" />
    <text x="170" y="66" fontSize="12" fontWeight="bold">A</text>
    <text x="58" y="26" fontSize="12" fontWeight="bold">B</text>
    <Lbl x={140} y={88} t="3 cm" s={12} />
    <Lbl x={102} y={46} t="?" c={UNK} />
  </QFig>
);

const QuarterPatternFig: React.FC = () => {
  // a színes negyed: bal felső, jobb felső, jobb alsó, ?
  const quarter = (cx: number, q: number) => {
    const r = 22;
    const cy = 60;
    const a = [
      [cx - r, cy, cx, cy - r, 1],
      [cx, cy - r, cx + r, cy, 1],
      [cx + r, cy, cx, cy + r, 1],
      [cx, cy + r, cx - r, cy, 1]
    ][q];
    return <path d={`M ${cx} ${cy} L ${a[0]} ${a[1]} A ${r} ${r} 0 0 1 ${a[2]} ${a[3]} Z`} fill="#f97316" />;
  };
  return (
    <QFig h={120}>
      {[0, 1, 2, 3].map((i) => {
        const cx = 35 + i * 57;
        return (
          <g key={i}>
            {i < 3 && quarter(cx, i)}
            <circle cx={cx} cy="60" r="22" fill="none" stroke="#334155" strokeWidth="2" />
            <line x1={cx - 22} y1="60" x2={cx + 22} y2="60" stroke="#334155" />
            <line x1={cx} y1="38" x2={cx} y2="82" stroke="#334155" />
            {i === 3 && <Lbl x={cx} y={66} t="?" c={UNK} s={18} />}
          </g>
        );
      })}
      <Lbl x={120} y={108} t="Melyik negyed lesz színes?" c={UNK} s={11} />
    </QFig>
  );
};

const CoinsRowFig: React.FC = () => (
  <QFig h={120}>
    {[0, 1, 2, 3, 4].map((i) => (
      <circle key={i} cx={40 + i * 40} cy="50" r="20" fill="#e5e7eb" stroke="#6b7280" strokeWidth="2" />
    ))}
    <line x1="20" y1="85" x2="220" y2="85" stroke={UNK} strokeWidth="2" />
    <line x1="20" y1="80" x2="20" y2="90" stroke={UNK} strokeWidth="2" />
    <line x1="220" y1="80" x2="220" y2="90" stroke={UNK} strokeWidth="2" />
    <Lbl x={120} y={105} t="? cm" c={UNK} />
    <text x="40" y="24" textAnchor="middle" fontSize="10" fill="#334155">2 cm</text>
    <line x1="20" y1="28" x2="60" y2="28" stroke="#334155" />
  </QFig>
);

const OverlapGridFig: React.FC = () => (
  <QFig h={150}>
    {[0, 1].map((r) =>
      [0, 1, 2].map((c) => (
        <circle
          key={`${r}${c}`}
          cx={70 + c * 50}
          cy={42 + r * 45}
          r="30"
          fill="none"
          stroke={['#ef4444', '#3b82f6', '#22c55e', '#f59e0b', '#a855f7', '#0ea5e9'][r * 3 + c]}
          strokeWidth="3"
        />
      ))
    )}
    <Lbl x={120} y={140} t="Hány kör?" c={UNK} s={11} />
  </QFig>
);

const BoxCoinsFig: React.FC = () => (
  <QFig h={140}>
    <rect x="70" y="15" width="100" height="100" fill="#fff7ed" stroke="#9a3412" strokeWidth="2.5" />
    <circle cx="95" cy="40" r="25" fill="#d1d5db" stroke="#6b7280" strokeWidth="1.5" />
    <Lbl x={130} y={80} t="?" c={UNK} s={22} />
    <text x="120" y="132" textAnchor="middle" fontSize="11" fill="#334155">doboz: 6 cm · 6 cm, érme: 3 cm széles</text>
  </QFig>
);

const CaterpillarFig: React.FC = () => (
  <QFig h={110}>
    {[
      [30, 'O1', '13 mm'],
      [75, 'O2', '15 mm'],
      [120, 'O3', '1 cm'],
      [165, 'O4', '1 cm'],
      [210, 'O5', '13 mm']
    ].map(([x, n, r]) => (
      <g key={n as string}>
        <Cross x={x as number} y={45} />
        <text x={x as number} y="68" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a">
          {n}
        </text>
        <text x={x as number} y="84" textAnchor="middle" fontSize="10" fill="#475569">
          {r}
        </text>
      </g>
    ))}
    <Lbl x={120} y={102} t="Melyik kör a legnagyobb?" c={UNK} s={11} />
  </QFig>
);

const TargetFig: React.FC = () => (
  <QFig h={140}>
    {[3, 2, 1].map((k) => (
      <circle key={k} cx="85" cy="70" r={k * 20} fill={['#fee2e2', '#fecaca', '#fca5a5'][3 - k]} stroke="#b91c1c" strokeWidth="2" />
    ))}
    <circle cx="85" cy="70" r="2.5" fill="#0f172a" />
    <line x1="105" y1="70" x2="145" y2="70" stroke={UNK} strokeWidth="3" />
    <text x="152" y="50" fontSize="10" fill="#334155">körzőnyílások:</text>
    <text x="152" y="66" fontSize="10" fill="#334155">1 cm, 2 cm, 3 cm</text>
    <Lbl x={125} y={62} t="?" c={UNK} />
  </QFig>
);

const FourInRowFig: React.FC = () => (
  <QFig h={120}>
    <rect x="20" y="25" width="200" height="50" fill="#eff6ff" stroke="#1d4ed8" strokeWidth="2" />
    {[0, 1, 2, 3].map((i) => (
      <circle key={i} cx={45 + i * 50} cy="50" r="25" fill="none" stroke="#db2777" strokeWidth="2" />
    ))}
    <text x="120" y="95" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e3a8a">16 cm</text>
    <Lbl x={120} y={112} t="körzőnyílás = ?" c={UNK} s={11} />
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
const CIRCLE4_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'c4-q1',
    level: 1,
    questionTypeBadge: 'Kör alakú tárgyak',
    question: 'Melyik tárgy NEM kör alakú?',
    options: ['a füzet lapja', 'a pénzérme', 'a gomb', 'a bicikli kereke'],
    correctAnswer: 0,
    explanation: 'A füzet lapja téglalap alakú, 4 sarka van. A pénzérme, a gomb és a kerék kör alakú.'
  },
  {
    id: 'c4-q2',
    level: 1,
    questionTypeBadge: 'Körrajzolás',
    question: 'Melyik tárgy segítségével tudsz kört rajzolni?',
    options: ['a pohár aljával', 'a derékszögű vonalzóval', 'az ollóval', 'a sárgarépával'],
    correctAnswer: 0,
    explanation: 'A pohár alja kör alakú: ha körberajzolod, kört kapsz. A vonalzóval egyenest, az ollóval semmit sem rajzolsz.'
  },
  {
    id: 'c4-q3',
    level: 1,
    questionTypeBadge: 'Körző',
    question: 'Melyik eszközzel rajzolunk pontos kört?',
    options: ['körzővel', 'vonalzóval', 'radírral', 'derékszögű vonalzóval'],
    correctAnswer: 0,
    explanation: 'A körző hegyét a középpontba szúrjuk, és körbeforgatjuk: így pontos kör lesz.'
  },
  {
    id: 'c4-q4',
    level: 1,
    questionTypeBadge: 'Körlap',
    figure: <CountDiscsFig />,
    question: 'Hány körlapot látsz a képen?',
    options: ['2', '3', '4', '1'],
    correctAnswer: 0,
    explanation: 'Csak a bal felső és a jobb felső kerek lap kör. Az ovális és a félkör alakú lap nem kör, a hatszög és a háromszög sokszög.'
  },
  {
    id: 'c4-q5',
    level: 1,
    questionTypeBadge: 'Középpont',
    figure: <WhichCenterFig />,
    question: 'Melyik pont a kör középpontja?',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 0,
    explanation: 'A középpont a kör közepén van: minden körvonalbeli ponttól ugyanolyan messze. Ez az A pont. A B a körvonalon van, a C belül, de nem középen, a D kívül.'
  },
  {
    id: 'c4-q6',
    level: 1,
    questionTypeBadge: 'Körzőhasználat',
    question: 'Mi az első lépés, ha körzővel kört rajzolsz?',
    options: ['Jelölj ki egy pontot a lapon!', 'Forgasd körbe a körzőt!', 'Rajzold meg a kört szabad kézzel!', 'Hajtsd félbe a lapot!'],
    correctAnswer: 0,
    explanation: 'Először kijelölöd a pontot, aztán kinyitod a körzőt, a hegyét a pontba szúrod, és végül körbeforgatod.'
  },
  {
    id: 'c4-q7',
    level: 1,
    questionTypeBadge: 'Hány kör?',
    figure: <RingsFig />,
    question: 'Hány kört látsz az ábrán?',
    options: ['5', '4', '6', '10'],
    correctAnswer: 0,
    explanation: 'Számold meg színenként: kék, fekete, piros, sárga, zöld – 5 kör.'
  },
  {
    id: 'c4-q8',
    level: 1,
    questionTypeBadge: 'Középpont',
    question: 'A kör minden pontja ugyanolyan messze van…',
    options: ['a kör középpontjától', 'a lap szélétől', 'a körző tetejétől', 'a kör legfelső pontjától'],
    correctAnswer: 0,
    explanation: 'Ez a kör legfontosabb tulajdonsága: minden pontja ugyanolyan messze van a középponttól – mint a hulahoppkarika pontjai a középen álló gyerektől.'
  },
  {
    id: 'c4-q9',
    level: 1,
    questionTypeBadge: 'Körzőnyílás',
    figure: <CompassRulerFig />,
    question: 'A körzőt a vonalzóra tettük. Mekkora a körzőnyílás?',
    options: ['3 cm', '2 cm', '4 cm', '6 cm'],
    correctAnswer: 0,
    explanation: 'A körző hegye a 0-n, a ceruza a 3-ason áll: a körzőnyílás 3 cm.'
  },
  {
    id: 'c4-q10',
    level: 1,
    questionTypeBadge: 'Sokszög?',
    question: 'Sokszög-e a kör?',
    options: ['Nem, mert görbe vonal határolja.', 'Igen, mert sok pontja van.', 'Igen, mert 4 oldala van.', 'Nem, mert nincs középpontja.'],
    correctAnswer: 0,
    explanation: 'A sokszöget csak egyenes szakaszok határolják. A kört görbe vonal határolja, ezért síkidom, de nem sokszög.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'c4-q11',
    level: 2,
    questionTypeBadge: 'Hány kör?',
    figure: <NestedCirclesFig />,
    question: 'Hány kört látsz az ábrán?',
    options: ['6', '5', '7', '3'],
    correctAnswer: 0,
    explanation: 'Kívülről befelé haladva számold a köröket színenként: lila, kék, zöld, sárga, narancs, rózsaszín – 6 kör.'
  },
  {
    id: 'c4-q12',
    level: 2,
    questionTypeBadge: 'Mértékváltás',
    question: 'Rajzolj kört 13 mm-es körzőnyílással! Mennyi ez cm-rel és mm-rel?',
    options: ['1 cm 3 mm', '13 cm', '1 cm 30 mm', '3 cm 1 mm'],
    correctAnswer: 0,
    explanation: '1 cm = 10 mm. 13 mm = 10 mm + 3 mm = 1 cm 3 mm.'
  },
  {
    id: 'c4-q13',
    level: 2,
    questionTypeBadge: 'Mértékváltás',
    question: 'Hány mm az 1 cm 5 mm-es körzőnyílás?',
    options: ['15 mm', '105 mm', '6 mm', '150 mm'],
    correctAnswer: 0,
    explanation: '1 cm = 10 mm, és még 5 mm: 10 + 5 = 15 mm.'
  },
  {
    id: 'c4-q14',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik körzőnyílással rajzolsz nagyobb kört: 13 mm-rel vagy 1 cm-rel?',
    options: ['13 mm-rel', '1 cm-rel', 'egyforma nagyok lesznek'],
    correctAnswer: 0,
    explanation: '1 cm = 10 mm. A 13 mm több, mint 10 mm, ezért a 13 mm-es körzőnyílással nagyobb kör lesz.'
  },
  {
    id: 'c4-q15',
    level: 2,
    questionTypeBadge: 'Kör szélessége',
    figure: <DiameterFig rLabel="2 cm" />,
    question: 'A kört 2 cm-es körzőnyílással rajzoltuk. Milyen messze van egymástól a kör két szemközti pontja, ha a középponton át mérjük?',
    options: ['4 cm', '2 cm', '3 cm', '8 cm'],
    correctAnswer: 0,
    explanation: 'Az egyik ponttól a középpontig 2 cm, a középponttól a másik pontig is 2 cm: 2 + 2 = 4 cm.'
  },
  {
    id: 'c4-q16',
    level: 2,
    questionTypeBadge: 'Kör vagy nem kör',
    figure: <WhichIsCircleFig />,
    question: 'Melyik síkidom kör?',
    options: ['B', 'A', 'C', 'D'],
    correctAnswer: 0,
    explanation: 'Csak a B széle van mindenütt ugyanolyan messze a közepétől. Az A ovális, a D tojás alakú, a C hatszög.'
  },
  {
    id: 'c4-q17',
    level: 2,
    questionTypeBadge: 'Egyenlő távolság',
    figure: <EqualRadiiFig />,
    question: 'Az A pont 3 cm-re van a kör O középpontjától. Milyen messze van a B pont az O ponttól?',
    options: ['3 cm', '6 cm', '1 cm', 'Nem lehet tudni.'],
    correctAnswer: 0,
    explanation: 'A és B is a körvonalon van. A kör minden pontja ugyanolyan messze van a középponttól, ezért B is 3 cm-re van.'
  },
  {
    id: 'c4-q18',
    level: 2,
    questionTypeBadge: 'Színezési szabály',
    figure: <QuarterPatternFig />,
    question: 'Figyeld meg a színezés szabályát! Melyik negyedet kell kiszínezni a negyedik körben?',
    options: ['a bal alsó negyedet', 'a bal felső negyedet', 'a jobb felső negyedet', 'a jobb alsó negyedet'],
    correctAnswer: 0,
    explanation: 'A színes negyed mindig egyet lép az óramutató járása szerint: bal felső → jobb felső → jobb alsó → bal alsó.'
  },
  {
    id: 'c4-q19',
    level: 2,
    questionTypeBadge: 'Körzőnyílás',
    question: 'Lili 3 cm-es körzőnyílással kört rajzolt. Ugyanabból a középpontból egy kisebb kört is rajzolt. Mekkora lehetett a második körzőnyílás?',
    options: ['2 cm', '4 cm', '5 cm', '3 cm 5 mm'],
    correctAnswer: 0,
    explanation: 'Kisebb kört kisebb körzőnyílással kapunk. A 2 cm kisebb 3 cm-nél; a 4 cm, az 5 cm és a 3 cm 5 mm nagyobb.'
  },
  {
    id: 'c4-q20',
    level: 2,
    questionTypeBadge: 'Körvonal',
    question: 'Mit rajzol a körző ceruzája, amikor körbeforgatod?',
    options: ['körvonalat', 'körlapot', 'négyzetet', 'egyenes vonalat'],
    correctAnswer: 0,
    explanation: 'A ceruza csak a kör szélét, a körvonalat rajzolja meg. Ha a belsejét is kiszínezed, körlap lesz belőle.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'c4-q21',
    level: 3,
    questionTypeBadge: 'Hulahopp',
    question: 'Peti a hulahoppkarika közepén áll. A karika minden pontja 50 cm-re van tőle. Milyen széles a karika (a középponton át mérve)?',
    options: ['1 m', '50 cm', '25 cm', '2 m'],
    correctAnswer: 0,
    explanation: 'Petitől az egyik oldalig 50 cm, a másik oldalig is 50 cm: 50 + 50 = 100 cm = 1 m.'
  },
  {
    id: 'c4-q22',
    level: 3,
    questionTypeBadge: 'Pénzérmék',
    figure: <CoinsRowFig />,
    question: 'Öt pénzérmét raktunk le egymás mellé, szorosan. Mindegyik érme 2 cm széles. Milyen hosszú a sor?',
    options: ['10 cm', '5 cm', '12 cm', '8 cm'],
    correctAnswer: 0,
    explanation: '5 érme, mindegyik 2 cm: 5 · 2 = 10 cm.'
  },
  {
    id: 'c4-q23',
    level: 3,
    questionTypeBadge: 'Körzőnyílás',
    question: 'Egy kör a középponton át mérve 8 cm széles. Mekkora körzőnyílással rajzolták?',
    options: ['4 cm', '8 cm', '16 cm', '2 cm'],
    correctAnswer: 0,
    explanation: 'A körzőnyílás a középponttól a körvonalig ér, ez a szélesség fele: 8 : 2 = 4 cm.'
  },
  {
    id: 'c4-q24',
    level: 3,
    questionTypeBadge: 'Hány kör?',
    figure: <OverlapGridFig />,
    question: 'Hány kört látsz az egymásba fonódó minta képén?',
    options: ['6', '5', '9', '12'],
    correctAnswer: 0,
    explanation: 'Két sorban 3–3 kör van: 2 · 3 = 6 kör. Ne a kis „levélkéket” számold, hanem a teljes köröket!'
  },
  {
    id: 'c4-q25',
    level: 3,
    questionTypeBadge: 'Doboz',
    figure: <BoxCoinsFig />,
    question: 'Egy 6 cm · 6 cm-es négyzet alakú doboz aljára 3 cm széles érméket teszünk egy rétegben, egymásra nem rakva. Legfeljebb hány érme fér el?',
    options: ['4', '2', '6', '9'],
    correctAnswer: 0,
    explanation: 'Egy sorba 6 : 3 = 2 érme fér, és 2 sor fér el: 2 · 2 = 4 érme.'
  },
  {
    id: 'c4-q26',
    level: 3,
    questionTypeBadge: 'Kör-hernyó',
    figure: <CaterpillarFig />,
    question: 'A hernyó testét körökből rajzoljuk meg. Melyik pontból rajzolt kör lesz a legnagyobb?',
    options: ['az O2 pontból (15 mm)', 'az O1 pontból (13 mm)', 'az O3 pontból (1 cm)', 'az O5 pontból (13 mm)'],
    correctAnswer: 0,
    explanation: 'Írd át mm-be: 13 mm, 15 mm, 10 mm, 10 mm, 13 mm. A legnagyobb körzőnyílás 15 mm, ez az O2 pont.'
  },
  {
    id: 'c4-q27',
    level: 3,
    questionTypeBadge: 'Mértékváltás',
    question: 'Melyik két körzőnyílással rajzolt kör egyforma nagy?',
    options: ['1 cm és 10 mm', '13 mm és 1 cm 30 mm', '2 cm és 2 mm', '15 mm és 5 cm 1 mm'],
    correctAnswer: 0,
    explanation: '1 cm = 10 mm, ezért a két kör egyforma. 1 cm 30 mm = 40 mm, nem 13 mm; 2 cm = 20 mm, nem 2 mm.'
  },
  {
    id: 'c4-q28',
    level: 3,
    questionTypeBadge: 'Céltábla',
    figure: <TargetFig />,
    question: 'Ugyanabból a középpontból 1 cm-es, 2 cm-es és 3 cm-es körzőnyílással rajzoltunk köröket. Milyen messze van a legkisebb kör a legnagyobbtól (a középpontból kifelé haladva)?',
    options: ['2 cm', '4 cm', '3 cm', '1 cm'],
    correctAnswer: 0,
    explanation: 'A legkisebb kör 1 cm-re, a legnagyobb 3 cm-re van a középponttól: 3 − 1 = 2 cm.'
  },
  {
    id: 'c4-q29',
    level: 3,
    questionTypeBadge: 'Körök sorban',
    figure: <FourInRowFig />,
    question: 'Egy 16 cm hosszú téglalapba 4 egyforma kör fér el sorban, egymást érintve. Mekkora körzőnyílással rajzolták a köröket?',
    options: ['2 cm', '4 cm', '16 cm', '8 cm'],
    correctAnswer: 0,
    explanation: 'Egy kör szélessége 16 : 4 = 4 cm. A körzőnyílás ennek a fele: 4 : 2 = 2 cm.'
  },
  {
    id: 'c4-q30',
    level: 3,
    questionTypeBadge: 'Hol van a pont?',
    question: 'Egy kört 2 cm-es körzőnyílással rajzoltunk az O pontból. A P pont 3 cm-re van az O ponttól. Hol van a P pont?',
    options: ['a körön kívül', 'a körvonalon', 'a kör belsejében', 'a középpontban'],
    correctAnswer: 0,
    explanation: 'A körvonal pontjai 2 cm-re vannak a középponttól. A P ennél messzebb, 3 cm-re van, ezért a körön kívül van.'
  }
];

export const Circle4Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={4}
      chapterId="sikidomok-testek"
      topicId="g4-geom-kor-quiz"
      subtopicId="a-kor"
      title="2. A kör – Kvíz"
      subtitle="30 feladat 3 szinten: kör alakú tárgyak, középpont, körvonal és körlap, körzőhasználat, körzőnyílás, szöveges feladatok."
      badge="4. OSZTÁLY • V. SÍKIDOMOK ÉS TESTEK • KVÍZ"
      questions={CIRCLE4_QUESTIONS}
      cheatSheets={[
        {
          title: 'Mi a kör?',
          items: [
            'A kör minden pontja ugyanolyan messze van a középponttól.',
            'A középpont jele: O.',
            'Körvonal: a kör széle. Körlap: a belsejével együtt.',
            'A kör nem sokszög: görbe vonal határolja.'
          ]
        },
        {
          title: 'Körzőhasználat',
          items: ['1. Jelölj ki egy pontot!', '2. Nyisd ki a körzőt (vonalzón mérd le)!', '3. Szúrd a hegyét a pontba!', '4. Forgasd körbe!']
        },
        {
          title: 'Körzőnyílás',
          items: [
            '1 cm = 10 mm, 13 mm = 1 cm 3 mm',
            'Nagyobb körzőnyílás → nagyobb kör.',
            'A kör szélessége a középponton át: 2 · körzőnyílás.',
            'Körzőnyílás = szélesség : 2'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <Circle4Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <Circle4Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default Circle4Quiz;

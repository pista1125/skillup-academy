import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { ShapesG2Matcher } from './ShapesG2Matcher';
import { ShapesG2Sorter } from './ShapesG2Sorter';
import { SHAPES_FONT, SolidPart, SolidKind, FlatPart, FlatKind, SticksPart, CubeBuildingPart } from './ShapesG2Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 120 }) => (
  <svg viewBox={`0 0 260 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={SHAPES_FONT}>
    <rect x="1" y="1" width="258" height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

const SolidFig: React.FC<{ kind: SolidKind }> = ({ kind }) => (
  <QFig h={110}>
    <SolidPart kind={kind} cx={130} cy={56} s={1.5} />
  </QFig>
);

const FlatFig: React.FC<{ kind: FlatKind; sticks?: boolean }> = ({ kind, sticks }) => (
  <QFig h={110}>
    {sticks ? <SticksPart kind={kind} cx={130} cy={56} s={1.6} /> : <FlatPart kind={kind} cx={130} cy={56} s={1.6} />}
  </QFig>
);

const ImprintFig: React.FC<{ kind: FlatKind }> = ({ kind }) => (
  <QFig h={110}>
    <FlatPart kind={kind} cx={130} cy={56} s={1.5} outline />
    <text x="130" y="104" textAnchor="middle" fontSize="11" fill="#475569">körberajzolt lap</text>
  </QFig>
);

const NumberedSolidsFig: React.FC<{ kinds: SolidKind[] }> = ({ kinds }) => (
  <QFig h={110}>
    {kinds.map((k, i) => (
      <g key={i}>
        <SolidPart kind={k} cx={(260 / (kinds.length + 1)) * (i + 1)} cy={48} s={0.95} />
        <text x={(260 / (kinds.length + 1)) * (i + 1)} y={98} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#334155">
          {i + 1}.
        </text>
      </g>
    ))}
  </QFig>
);

/** Vegyes testek és síkidomok sorban (szám nélkül). */
const MixedRowFig: React.FC<{ items: ({ solid: SolidKind } | { flat: FlatKind })[] }> = ({ items }) => (
  <QFig h={100}>
    {items.map((it, i) => {
      const cx = (260 / (items.length + 1)) * (i + 1);
      return 'solid' in it ? (
        <SolidPart key={i} kind={it.solid} cx={cx} cy={50} s={0.95} />
      ) : (
        <FlatPart key={i} kind={it.flat} cx={cx} cy={50} s={0.95} />
      );
    })}
  </QFig>
);

const BallFig: React.FC = () => (
  <QFig h={110}>
    <circle cx="130" cy="55" r="38" fill="#f97316" stroke="#9a3412" strokeWidth="3" />
    <path d="M 92 55 Q 130 35 168 55 M 130 17 Q 110 55 130 93 M 130 17 Q 150 55 130 93" fill="none" stroke="#9a3412" strokeWidth="2.5" />
  </QFig>
);

const CanFig: React.FC = () => (
  <QFig h={120}>
    <path d="M 100 25 L 100 90 A 30 9 0 0 0 160 90 L 160 25 Z" fill="#cbd5e1" stroke="#475569" strokeWidth="2.5" />
    <rect x="100" y="45" width="60" height="28" fill="#dc2626" />
    <text x="130" y="64" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">BAB</text>
    <ellipse cx="130" cy="25" rx="30" ry="9" fill="#e2e8f0" stroke="#475569" strokeWidth="2.5" />
  </QFig>
);

/** Ház síkidomokból: négyzet test, háromszög tető, 2 négyzet ablak, téglalap ajtó. */
const HouseFig: React.FC = () => (
  <QFig h={150}>
    <polygon points="130,14 180,60 80,60" fill="#ef4444" stroke="#7f1d1d" strokeWidth="2.5" strokeLinejoin="round" />
    <rect x="90" y="60" width="80" height="80" fill="#fde68a" stroke="#92400e" strokeWidth="2.5" />
    <rect x="98" y="72" width="22" height="22" fill="#93c5fd" stroke="#1e3a8a" strokeWidth="2" />
    <rect x="140" y="72" width="22" height="22" fill="#93c5fd" stroke="#1e3a8a" strokeWidth="2" />
    <rect x="120" y="102" width="20" height="38" fill="#a16207" stroke="#713f12" strokeWidth="2" />
  </QFig>
);

const BuildFig: React.FC<{ heights: number[]; depth?: number }> = ({ heights, depth = 1 }) => {
  const size = 24;
  const w = heights.length * size + size * 0.45 * depth;
  return (
    <QFig h={130}>
      <rect x="20" y="112" width="220" height="6" rx="3" fill="#a8a29e" />
      <CubeBuildingPart heights={heights} x={130 - w / 2} y={112} size={size} depth={depth} />
    </QFig>
  );
};

const TwoBuildFig: React.FC<{ a: number[]; b: number[] }> = ({ a, b }) => (
  <QFig h={140}>
    <rect x="14" y="110" width="232" height="6" rx="3" fill="#a8a29e" />
    <CubeBuildingPart heights={a} x={30} y={110} size={22} color="#fca5a5" />
    <CubeBuildingPart heights={b} x={150} y={110} size={22} color="#86efac" />
    <text x={30 + (a.length * 22) / 2} y={132} textAnchor="middle" fontSize="15" fontWeight="bold" fill="#991b1b">A</text>
    <text x={150 + (b.length * 22) / 2} y={132} textAnchor="middle" fontSize="15" fontWeight="bold" fill="#166534">B</text>
  </QFig>
);

/** Szétszórt síkidomok leltárhoz. */
const InventoryFig: React.FC = () => {
  const items: { k: FlatKind; x: number; y: number; s: number }[] = [
    { k: 'haromszog', x: 35, y: 35, s: 0.6 },
    { k: 'kor', x: 85, y: 30, s: 0.55 },
    { k: 'negyzet', x: 140, y: 32, s: 0.55 },
    { k: 'haromszog', x: 195, y: 35, s: 0.6 },
    { k: 'teglalap', x: 50, y: 85, s: 0.6 },
    { k: 'haromszog', x: 110, y: 88, s: 0.6 },
    { k: 'kor', x: 165, y: 85, s: 0.55 },
    { k: 'haromszog', x: 222, y: 85, s: 0.6 }
  ];
  return (
    <QFig h={120}>
      {items.map((it, i) => (
        <FlatPart key={i} kind={it.k} cx={it.x} cy={it.y} s={it.s} />
      ))}
    </QFig>
  );
};

/** Robot síkidomokból: négyzet fej, 2 kör szem, téglalap test, 2 téglalap láb, háromszög sapka. */
const ShapeRobotFig: React.FC = () => (
  <QFig h={160}>
    <polygon points="130,8 146,30 114,30" fill="#22c55e" stroke="#166534" strokeWidth="2" strokeLinejoin="round" />
    <rect x="110" y="30" width="40" height="40" fill="#fde68a" stroke="#92400e" strokeWidth="2" />
    <circle cx="122" cy="45" r="5" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="1.5" />
    <circle cx="138" cy="45" r="5" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="1.5" />
    <rect x="100" y="74" width="60" height="44" fill="#f87171" stroke="#7f1d1d" strokeWidth="2" />
    <rect x="108" y="122" width="14" height="30" fill="#a78bfa" stroke="#4c1d95" strokeWidth="2" />
    <rect x="138" y="122" width="14" height="30" fill="#a78bfa" stroke="#4c1d95" strokeWidth="2" />
  </QFig>
);

const SixSquaresFig: React.FC = () => (
  <QFig h={110}>
    {Array.from({ length: 6 }, (_, i) => (
      <rect key={i} x={22 + i * 38} y={36} width="32" height="32" fill="none" stroke="#334155" strokeWidth="2.2" strokeDasharray="5 4" />
    ))}
    <text x="130" y="94" textAnchor="middle" fontSize="11" fill="#475569">egy test összes lapja</text>
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const SHAPES_G2_QUESTIONS: QuizQuestion[] = [
  // ---------- 1. szint ----------
  {
    id: 'shapes-q1',
    level: 1,
    questionTypeBadge: 'Test neve',
    figure: <SolidFig kind="kocka" />,
    question: 'Melyik test ez?',
    options: ['kocka', 'téglatest', 'gúla', 'henger'],
    correctAnswer: 0,
    explanation: 'Minden lapja egyforma négyzet. Ez a kocka, mint a dobókocka.'
  },
  {
    id: 'shapes-q2',
    level: 1,
    questionTypeBadge: 'Test neve',
    figure: <SolidFig kind="henger" />,
    question: 'Melyik test ez?',
    options: ['henger', 'kúp', 'gömb', 'téglatest'],
    correctAnswer: 0,
    explanation: 'Alul és fölül is kör van, az oldala görbe. Ez a henger.'
  },
  {
    id: 'shapes-q3',
    level: 1,
    questionTypeBadge: 'Test neve',
    figure: <SolidFig kind="kup" />,
    question: 'Melyik test ez?',
    options: ['kúp', 'gúla', 'henger', 'gömb'],
    correctAnswer: 0,
    explanation: 'Alul kör, fölül hegyes csúcs. Ez a kúp, mint a tölcsér.'
  },
  {
    id: 'shapes-q4',
    level: 1,
    questionTypeBadge: 'Síkidom neve',
    figure: <FlatFig kind="haromszog" />,
    question: 'Melyik síkidom ez?',
    options: ['háromszög', 'négyzet', 'kör', 'ötszög'],
    correctAnswer: 0,
    explanation: 'Három oldala és három csúcsa van. Ez háromszög.'
  },
  {
    id: 'shapes-q5',
    level: 1,
    questionTypeBadge: 'Kör vagy gömb',
    figure: <FlatFig kind="kor" />,
    question: 'Ezt a lapos alakzatot rajzoltam. Mi a neve?',
    options: ['kör', 'gömb', 'háromszög', 'hatszög'],
    correctAnswer: 0,
    explanation: 'A lapos, kerek alakzat a kör. A gömb test, mint a labda.'
  },
  {
    id: 'shapes-q6',
    level: 1,
    questionTypeBadge: 'Tárgy és test',
    figure: <BallFig />,
    question: 'Melyik testhez hasonlít a labda?',
    options: ['a gömbhöz', 'a hengerhez', 'a kockához', 'a kúphoz'],
    correctAnswer: 0,
    explanation: 'A labda minden irányban kerek, bárhogy gurul. Olyan, mint a gömb.'
  },
  {
    id: 'shapes-q7',
    level: 1,
    questionTypeBadge: 'Tárgy és test',
    figure: <CanFig />,
    question: 'Melyik testhez hasonlít a konzervdoboz?',
    options: ['a hengerhez', 'a gömbhöz', 'a kúphoz', 'a téglatesthez'],
    correctAnswer: 0,
    explanation: 'Alul és fölül kör, az oldala görbe. A konzervdoboz henger alakú.'
  },
  {
    id: 'shapes-q8',
    level: 1,
    questionTypeBadge: 'Gurul?',
    figure: <NumberedSolidsFig kinds={['kocka', 'gomb', 'gula']} />,
    question: 'Melyik test gurul el bármerre?',
    options: ['a 2. (gömb)', 'az 1. (kocka)', 'a 3. (gúla)'],
    correctAnswer: 0,
    explanation: 'A gömbnek nincs lapja, ezért bármerre elgurul. A kocka és a gúla nem gurul.'
  },
  {
    id: 'shapes-q9',
    level: 1,
    questionTypeBadge: 'Oldalak',
    figure: <FlatFig kind="negyzet" />,
    question: 'Hány oldala van a négyzetnek?',
    options: ['4', '3', '5', '6'],
    correctAnswer: 0,
    explanation: 'Számold körbe: 1, 2, 3, 4. A négyzetnek 4 egyforma oldala van.'
  },
  {
    id: 'shapes-q10',
    level: 1,
    questionTypeBadge: 'Test vagy síkidom',
    figure: <SolidFig kind="teglatest" />,
    question: 'Test vagy síkidom ez?',
    options: ['test', 'síkidom'],
    correctAnswer: 0,
    explanation: 'Ez téglatest, mint egy doboz. Meg tudod fogni, ezért test.'
  },

  // ---------- 2. szint ----------
  {
    id: 'shapes-q11',
    level: 2,
    questionTypeBadge: 'Lapok',
    figure: <SolidFig kind="kocka" />,
    question: 'Hány lapja van a kockának?',
    options: ['6', '3', '4', '8'],
    correctAnswer: 0,
    explanation: 'A rajzon csak 3 lapot látsz. Hátul, alul és bal oldalt is van egy-egy. Ez 6 lap.'
  },
  {
    id: 'shapes-q12',
    level: 2,
    questionTypeBadge: 'Körberajzolás',
    figure: <SolidFig kind="henger" />,
    question: 'A hengert az aljával a papírra teszed, és körberajzolod. Mit kapsz?',
    options: ['kört', 'négyzetet', 'háromszöget', 'téglalapot'],
    correctAnswer: 0,
    explanation: 'A henger alja kör alakú lap. Ha körberajzolod, kört kapsz.'
  },
  {
    id: 'shapes-q13',
    level: 2,
    questionTypeBadge: 'Lenyomat',
    figure: <ImprintFig kind="haromszog" />,
    question: 'Melyik test lapját rajzolták körbe?',
    options: ['a gúláét', 'a kockáét', 'a hengerét', 'a gömbét'],
    correctAnswer: 0,
    explanation: 'A gúla oldallapjai háromszögek. A kockának, a hengernek és a gömbnek nincs háromszög lapja.'
  },
  {
    id: 'shapes-q14',
    level: 2,
    questionTypeBadge: 'Leltár',
    figure: <HouseFig />,
    question: 'Hány négyzetet látsz a házon?',
    options: ['3', '2', '1', '4'],
    correctAnswer: 0,
    explanation: 'A ház fala egy nagy négyzet, és a 2 ablak is négyzet. 1 + 2 = 3. Az ajtó téglalap.'
  },
  {
    id: 'shapes-q15',
    level: 2,
    questionTypeBadge: 'Pálcikák',
    figure: <FlatFig kind="hatszog" sticks />,
    question: 'Hány pálcikából rakták ki ezt a síkidomot?',
    options: ['6', '5', '7', '4'],
    correctAnswer: 0,
    explanation: 'Minden oldal egy pálcika. Számold a színeket: 6 pálcika. Ez hatszög.'
  },
  {
    id: 'shapes-q16',
    level: 2,
    questionTypeBadge: 'Kockaépítés',
    figure: <BuildFig heights={[2, 3, 1]} />,
    question: 'Hány kockából épült?',
    options: ['6', '5', '7', '3'],
    correctAnswer: 0,
    explanation: 'Oszloponként: 2, 3 és 1 kocka. 2 + 3 + 1 = 6 kocka.'
  },
  {
    id: 'shapes-q17',
    level: 2,
    questionTypeBadge: 'Csúcsok',
    figure: <MixedRowFig items={[{ flat: 'haromszog' }, { flat: 'kor' }, { flat: 'negyzet' }, { flat: 'otszog' }]} />,
    question: 'Melyik síkidomnak nincs csúcsa?',
    options: ['a körnek', 'a háromszögnek', 'a négyzetnek', 'az ötszögnek'],
    correctAnswer: 0,
    explanation: 'A kört egy görbe vonal határolja. Nincs oldala, ezért csúcsa sincs.'
  },
  {
    id: 'shapes-q18',
    level: 2,
    questionTypeBadge: 'Kakukktojás',
    figure: <MixedRowFig items={[{ solid: 'kocka' }, { solid: 'henger' }, { flat: 'kor' }, { solid: 'kup' }]} />,
    question: 'Melyik nem test?',
    options: ['a kör', 'a kocka', 'a henger', 'a kúp'],
    correctAnswer: 0,
    explanation: 'A kör lapos síkidom. A kocka, a henger és a kúp test.'
  },
  {
    id: 'shapes-q19',
    level: 2,
    questionTypeBadge: 'Lenyomat',
    figure: <ImprintFig kind="teglalap" />,
    question: 'Melyik test lapját rajzolták körbe?',
    options: ['a téglatestét', 'a gömbét', 'a kúpét', 'a hengerét'],
    correctAnswer: 0,
    explanation: 'A téglatest lapjai téglalapok. A gömbnek nincs lapja, a kúpnak és a hengernek kör lapja van.'
  },
  {
    id: 'shapes-q20',
    level: 2,
    questionTypeBadge: 'Leltár',
    figure: <InventoryFig />,
    question: 'Hány háromszög van a képen?',
    options: ['4', '3', '5', '2'],
    correctAnswer: 0,
    explanation: 'Fent 2 és lent 2 háromszög van. Ez összesen 4.'
  },

  // ---------- 3. szint ----------
  {
    id: 'shapes-q21',
    level: 3,
    questionTypeBadge: 'Találós',
    question: 'Gurul, és 2 kör alakú lapja van. Melyik test?',
    options: ['henger', 'kúp', 'gömb', 'kocka'],
    correctAnswer: 0,
    explanation: 'A kúpnak csak 1 kör lapja van, a gömbnek egy sincs. A hengernek 2 kör lapja van.'
  },
  {
    id: 'shapes-q22',
    level: 3,
    questionTypeBadge: 'Találós',
    question: 'Nem gurul. 6 lapja van, és mind egyforma négyzet. Melyik test?',
    options: ['kocka', 'téglatest', 'gúla', 'henger'],
    correctAnswer: 0,
    explanation: 'A téglatest lapjai téglalapok. Ha mind a 6 lap egyforma négyzet, az kocka.'
  },
  {
    id: 'shapes-q23',
    level: 3,
    questionTypeBadge: 'Rejtett kockák',
    figure: <BuildFig heights={[2, 2]} depth={2} />,
    question: 'Elöl 4 kocka van, és mögötte még ugyanennyi. Hány kocka ez összesen?',
    options: ['8', '4', '6', '12'],
    correctAnswer: 0,
    explanation: 'Elöl 4 kocka, hátul is 4 kocka. 4 + 4 = 8 kocka.'
  },
  {
    id: 'shapes-q24',
    level: 3,
    questionTypeBadge: 'Kockaépítés',
    figure: <BuildFig heights={[3, 1, 2, 3]} />,
    question: 'Hány kockából épült?',
    options: ['9', '8', '10', '4'],
    correctAnswer: 0,
    explanation: 'Oszloponként: 3, 1, 2 és 3 kocka. 3 + 1 + 2 + 3 = 9 kocka.'
  },
  {
    id: 'shapes-q25',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    figure: <TwoBuildFig a={[2, 2, 1]} b={[1, 3, 2]} />,
    question: 'Melyik épülethez kellett több kocka?',
    options: ['a B-hez', 'az A-hoz', 'ugyanannyi kellett'],
    correctAnswer: 0,
    explanation: 'Az A: 2 + 2 + 1 = 5 kocka. A B: 1 + 3 + 2 = 6 kocka. A B-hez kellett több.'
  },
  {
    id: 'shapes-q26',
    level: 3,
    questionTypeBadge: 'Pálcikák',
    question: 'Kata kirak pálcikából egy háromszöget és egy négyzetet. Hány pálcika kell?',
    options: ['7', '6', '8', '12'],
    correctAnswer: 0,
    explanation: 'A háromszöghöz 3, a négyzethez 4 pálcika kell. 3 + 4 = 7.'
  },
  {
    id: 'shapes-q27',
    level: 3,
    questionTypeBadge: 'Gúla lapjai',
    figure: <SolidFig kind="gula" />,
    question: 'Ennek a gúlának az alja négyzet. Hány háromszög lapja van?',
    options: ['4', '2', '5', '1'],
    correctAnswer: 0,
    explanation: 'A négyzet minden oldalához tartozik egy háromszög lap. Ez 4 háromszög. Kettő hátul van, azt nem látod.'
  },
  {
    id: 'shapes-q28',
    level: 3,
    questionTypeBadge: 'Kör és csúcs',
    question: 'Melyik testnek van kör alakú lapja és hegyes csúcsa is?',
    options: ['kúp', 'henger', 'gömb', 'gúla'],
    correctAnswer: 0,
    explanation: 'A kúp alja kör, a teteje hegyes csúcs. A hengernek nincs csúcsa, a gúlának nincs kör lapja.'
  },
  {
    id: 'shapes-q29',
    level: 3,
    questionTypeBadge: 'Leltár',
    figure: <ShapeRobotFig />,
    question: 'Hány síkidomból rakták ki a robotot?',
    options: ['7', '6', '8', '5'],
    correctAnswer: 0,
    explanation: '1 háromszög, 1 négyzet, 2 kör, 1 nagy téglalap és 2 kis téglalap. Ez 7 síkidom.'
  },
  {
    id: 'shapes-q30',
    level: 3,
    questionTypeBadge: 'Lapokból a test',
    figure: <SixSquaresFig />,
    question: 'Valaki egy test összes lapját körberajzolta. 6 egyforma négyzet lett. Melyik test volt?',
    options: ['kocka', 'téglatest', 'gúla', 'henger'],
    correctAnswer: 0,
    explanation: 'Csak a kockának van 6 egyforma négyzet lapja.'
  }
];

export const ShapesG2Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => (
  <QuizTemplate
    grade={2}
    chapterId="geometria"
    topicId="g2-geo-testek-quiz"
    subtopicId="testek-sikidomok"
    title="2. Testek, síkidomok – Kvíz"
    subtitle="30 feladat 3 szinten: testek és síkidomok neve, lapok, oldalak, lenyomatok, építés kockákból."
    badge="2. OSZTÁLY • VII. GEOMETRIA • KVÍZ"
    questions={SHAPES_G2_QUESTIONS}
    cheatSheets={[
      {
        title: 'Testek',
        items: ['kocka: 6 négyzet lap', 'téglatest: 6 lap, téglalapok', 'henger: 2 kör lap, gurul', 'kúp: 1 kör lap és csúcs', 'gömb: nincs lapja, bárhogy gurul', 'gúla: alul négyzet, oldalt háromszögek']
      },
      {
        title: 'Síkidomok',
        items: ['háromszög: 3 oldal, 3 csúcs', 'négyzet: 4 egyforma oldal', 'téglalap: 2 hosszú, 2 rövid oldal', 'kör: nincs oldala, nincs csúcsa']
      },
      {
        title: 'Számolás',
        items: ['1 pálcika = 1 oldal', 'Kockák: számold oszloponként', 'A hátsó kockákat is számold!', 'Körberajzolt lap = síkidom']
      }
    ]}
    onBack={onBack}
    onSwitchToTheory={onSwitchToTheory}
    onSwitchToMatcher={onSwitchToMatcher}
    onSwitchToSorter={onSwitchToSorter}
    initialGameMode={initialGameMode}
    matcherComponent={<ShapesG2Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />}
    sorterComponent={<ShapesG2Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />}
  />
);

export default ShapesG2Quiz;

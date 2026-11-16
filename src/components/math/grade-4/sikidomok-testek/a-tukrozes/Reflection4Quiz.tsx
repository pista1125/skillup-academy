import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Reflection4Matcher } from './Reflection4Matcher';
import { Reflection4Sorter } from './Reflection4Sorter';
import { Reflection4Grid, Reflection4Cell } from './Reflection4Figures';

// ---------------------------------------------------------------------------
// Kérdésábrák – belső SVG-segédek (nem exportált)
// ---------------------------------------------------------------------------
const UNK = '#dc2626';
const AX = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 150 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

const Lbl: React.FC<{ x: number; y: number; t: string; c?: string; s?: number }> = ({ x, y, t, c = '#0f172a', s = 12 }) => (
  <text x={x} y={y} textAnchor="middle" fontSize={s} fontWeight="bold" fill={c}>
    {t}
  </text>
);

/** Rács tengellyel; vAxis / hAxis rácsvonal sorszáma */
const AxisGrid: React.FC<{
  cols: number;
  rows: number;
  u?: number;
  cells?: Reflection4Cell[];
  vAxis?: number;
  hAxis?: number;
  marks?: [number, number, string][];
  label?: string;
  extra?: (x0: number, y0: number, u: number) => React.ReactNode;
}> = ({ cols, rows, u = 18, cells = [], vAxis, hAxis, marks = [], label, extra }) => {
  const x0 = (240 - cols * u) / 2;
  const y0 = 10;
  const h = rows * u + (label ? 38 : 22);
  return (
    <QFig h={h}>
      <Reflection4Grid x0={x0} y0={y0} cols={cols} rows={rows} u={u} cells={cells} />
      {marks.map(([x, y, t]) => (
        <g key={t}>
          <rect x={x0 + x * u + 1} y={y0 + y * u + 1} width={u - 2} height={u - 2} fill="#fef3c7" stroke="#b45309" strokeDasharray="3 2" />
          <text x={x0 + x * u + u / 2} y={y0 + y * u + u / 2 + 4} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#92400e">
            {t}
          </text>
        </g>
      ))}
      {extra && extra(x0, y0, u)}
      {vAxis !== undefined && <line x1={x0 + vAxis * u} y1={y0 - 5} x2={x0 + vAxis * u} y2={y0 + rows * u + 5} stroke={AX} strokeWidth="3" />}
      {hAxis !== undefined && <line x1={x0 - 5} y1={y0 + hAxis * u} x2={x0 + cols * u + 5} y2={y0 + hAxis * u} stroke={AX} strokeWidth="3" />}
      {label && <Lbl x={120} y={h - 10} t={label} c={label.includes('?') ? UNK : '#0f172a'} s={11} />}
    </QFig>
  );
};

const Flag: React.FC<{ x: number; y: number; mode: 'orig' | 'mirror' | 'down' }> = ({ x, y, mode }) => {
  if (mode === 'orig')
    return (
      <g>
        <rect x={x} y={y} width="4" height="60" fill="#475569" />
        <polygon points={`${x + 4},${y} ${x + 36},${y + 12} ${x + 4},${y + 24}`} fill="#f97316" stroke="#9a3412" />
      </g>
    );
  if (mode === 'mirror')
    return (
      <g>
        <rect x={x + 32} y={y} width="4" height="60" fill="#475569" />
        <polygon points={`${x + 32},${y} ${x},${y + 12} ${x + 32},${y + 24}`} fill="#f97316" stroke="#9a3412" />
      </g>
    );
  return (
    <g>
      <rect x={x} y={y} width="4" height="60" fill="#475569" />
      <polygon points={`${x + 4},${y + 36} ${x + 36},${y + 48} ${x + 4},${y + 60}`} fill="#f97316" stroke="#9a3412" />
    </g>
  );
};

const FlagChoiceFig: React.FC = () => (
  <QFig h={120}>
    <Flag x={18} y={20} mode="orig" />
    <Lbl x={36} y={104} t="eredeti" s={10} />
    <line x1="68" y1="12" x2="68" y2="108" stroke="#cbd5e1" strokeDasharray="4 3" />
    <Flag x={85} y={20} mode="orig" />
    <Flag x={140} y={20} mode="mirror" />
    <Flag x={195} y={20} mode="down" />
    <Lbl x={101} y={104} t="A" />
    <Lbl x={156} y={104} t="B" />
    <Lbl x={211} y={104} t="C" />
  </QFig>
);

const TreeLakeFig: React.FC = () => (
  <QFig h={150}>
    <rect x="2" y="2" width="236" height="73" fill="#e0f2fe" />
    <rect x="2" y="75" width="236" height="72" fill="#7dd3fc" />
    <rect x="114" y="45" width="10" height="30" fill="#92400e" />
    <polygon points="119,10 92,52 146,52" fill="#16a34a" />
    <text x="119" y="118" textAnchor="middle" fontSize="28" fontWeight="bold" fill={UNK}>?</text>
    <line x1="5" y1="75" x2="235" y2="75" stroke={AX} strokeWidth="2.5" strokeDasharray="8 5" />
  </QFig>
);

const FourShapesFig: React.FC = () => (
  <QFig h={130}>
    <path d="M 40 95 C 5 70 12 42 30 45 C 36 46 40 52 40 56 C 40 52 44 46 50 45 C 68 42 75 70 40 95 Z" fill="#f9a8d4" stroke="#9d174d" strokeWidth="1.5" />
    <polygon points="78,90 120,90 135,45 93,45" fill="#bbf7d0" stroke="#166534" strokeWidth="1.5" />
    <polygon points="150,40 162,40 162,78 185,78 185,90 150,90" fill="#fde68a" stroke="#92400e" strokeWidth="1.5" />
    <polygon points="200,90 232,82 222,40 205,55" fill="#bae6fd" stroke="#075985" strokeWidth="1.5" />
    <Lbl x={40} y={118} t="A" />
    <Lbl x={107} y={118} t="B" />
    <Lbl x={167} y={118} t="C" />
    <Lbl x={216} y={118} t="D" />
  </QFig>
);

const ShapeOnly: React.FC<{ children: React.ReactNode; label?: string }> = ({ children, label = 'Szimmetriatengelyek száma = ?' }) => (
  <QFig h={140}>
    {children}
    <Lbl x={120} y={130} t={label} c={UNK} s={11} />
  </QFig>
);

const TrainFig: React.FC = () => (
  <QFig h={110}>
    <polygon points="20,55 45,38 45,72" fill="#ef4444" stroke="#7f1d1d" />
    <rect x="45" y="38" width="34" height="34" fill="#facc15" stroke="#713f12" />
    <rect x="79" y="38" width="34" height="34" fill="#3b82f6" stroke="#1e3a8a" />
    <rect x="113" y="38" width="34" height="34" fill="#22c55e" stroke="#14532d" />
    <line x1="152" y1="15" x2="152" y2="95" stroke={AX} strokeWidth="3.5" />
    <text x="195" y="62" textAnchor="middle" fontSize="26" fontWeight="bold" fill={UNK}>?</text>
  </QFig>
);

const PlanMirrorFig: React.FC = () => {
  const s = 28;
  const box = (x: number, y: number, k: string) => (
    <g key={k}>
      <rect x={x} y={y} width={s} height={s} fill="#fff" stroke="#0284c7" strokeWidth="1.5" />
      <text x={x + s / 2} y={y + s / 2 + 5} textAnchor="middle" fontSize="13" fill="#0284c7" fontWeight="bold">
        1
      </text>
    </g>
  );
  return (
    <QFig h={120}>
      {box(50, 25, 'a')}
      {box(50, 53, 'b')}
      {box(78, 53, 'c')}
      <line x1="120" y1="15" x2="120" y2="95" stroke={AX} strokeWidth="3" />
      <Lbl x={175} y={66} t="tükörkép: ?" c={UNK} s={12} />
      <text x="85" y="108" textAnchor="middle" fontSize="10" fill="#334155">alaprajz (1 = egy rúd)</text>
    </QFig>
  );
};

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
const REFLECTION4_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'r4-q1',
    level: 1,
    questionTypeBadge: 'Tükörkép',
    figure: <FlagChoiceFig />,
    question: 'Az eredeti zászló mellé függőlegesen tükröt állítunk. Melyik rajz a tükörképe?',
    options: ['B', 'A', 'C'],
    correctAnswer: 0,
    explanation: 'A tükörkép fordított: a jobbra mutató zászló balra mutat, a rúd a másik oldalra kerül. Az A csak átmásolt (eltolt) kép, a C fejjel lefelé fordult.'
  },
  {
    id: 'r4-q2',
    level: 1,
    questionTypeBadge: 'Tükörtengely',
    question: 'A tükrözéses feladatokban mit jelöl a piros vonal?',
    options: ['a tükör helyét, a tükörtengelyt', 'a négyzetrács szélét', 'a kör középpontját', 'az alaprajz számait'],
    correctAnswer: 0,
    explanation: 'A piros vonal a tükör helye, vagyis a tükörtengely. Ehhez képest rajzoljuk meg a tükörképet.'
  },
  {
    id: 'r4-q3',
    level: 1,
    questionTypeBadge: 'Szimmetrikus betű',
    question: 'Melyik betű szimmetrikus egy függőleges tengelyre?',
    options: ['A', 'F', 'G', 'R'],
    correctAnswer: 0,
    explanation: 'Az A bal és jobb fele egymás tükörképe. Az F, a G és az R jobbra „néz”, a tükörképük más lenne.'
  },
  {
    id: 'r4-q4',
    level: 1,
    questionTypeBadge: 'Szimmetriatengely',
    figure: (
      <ShapeOnly>
        <rect x="80" y="15" width="80" height="80" fill="#c4b5fd" stroke="#4c1d95" strokeWidth="2" />
      </ShapeOnly>
    ),
    question: 'Hány szimmetriatengelye van a négyzetnek?',
    options: ['4', '2', '1', '8'],
    correctAnswer: 0,
    explanation: 'A négyzetet félbehajthatod függőlegesen, vízszintesen és a két átlója mentén is: 4 szimmetriatengely.'
  },
  {
    id: 'r4-q5',
    level: 1,
    questionTypeBadge: 'Szimmetriatengely',
    figure: (
      <ShapeOnly>
        <rect x="55" y="25" width="130" height="65" fill="#fca5a5" stroke="#7f1d1d" strokeWidth="2" />
      </ShapeOnly>
    ),
    question: 'Hány szimmetriatengelye van ennek a téglalapnak (amely nem négyzet)?',
    options: ['2', '4', '1', '0'],
    correctAnswer: 0,
    explanation: 'Csak a függőleges és a vízszintes középvonal tengely. Az átló mentén összehajtva a sarkok kilógnak.'
  },
  {
    id: 'r4-q6',
    level: 1,
    questionTypeBadge: 'Tükrözés rácson',
    figure: <AxisGrid cols={10} rows={4} u={20} vAxis={5} cells={[[2, 1, '#ef4444']]} label="Hova kerül a tükörkép?" />,
    question: 'A piros négyzet és a tengely között 2 négyzetnyi hely van. Hol lesz a tükörképe?',
    options: ['a tengely másik oldalán, szintén 2 négyzetnyire', 'ugyanazon az oldalon, 2 négyzetnyire', 'a másik oldalon, 4 négyzetnyire', 'pont a tengelyen'],
    correctAnswer: 0,
    explanation: 'A tükörkép ugyanolyan messze van a tengelytől, mint az eredeti, csak a másik oldalon, és ugyanabban a sorban.'
  },
  {
    id: 'r4-q7',
    level: 1,
    questionTypeBadge: 'Víztükör',
    figure: <TreeLakeFig />,
    question: 'A fa a tó partján áll. Milyennek látod a tükörképét a vízben?',
    options: ['fejjel lefelé fordítottnak', 'ugyanolyannak, mint a fa', 'oldalra dőltnek', 'sokkal kisebbnek'],
    correctAnswer: 0,
    explanation: 'A víz felszíne vízszintes tükörtengely. Ami fent volt (a fa csúcsa), az a tükörképben lent lesz.'
  },
  {
    id: 'r4-q8',
    level: 1,
    questionTypeBadge: 'Hajtogatás',
    question: 'Félbehajtott papírból mintát vágsz ki, majd kinyitod. Milyen lesz az alakzat?',
    options: ['szimmetrikus, a hajtásvonal a tengelye', 'két különböző alakú darab', 'mindig kör', 'mindig háromszög'],
    correctAnswer: 0,
    explanation: 'A két fél egyszerre készült, ezért egymás tükörképei. A hajtásvonal a szimmetriatengely.'
  },
  {
    id: 'r4-q9',
    level: 1,
    questionTypeBadge: 'Kör',
    question: 'Hány szimmetriatengelye van a körnek?',
    options: ['végtelen sok', '1', '2', '4'],
    correctAnswer: 0,
    explanation: 'A kört bármelyik, a középpontján átmenő vonal mentén félbehajthatod. Ilyen vonalból végtelen sok van.'
  },
  {
    id: 'r4-q10',
    level: 1,
    questionTypeBadge: 'Szimmetrikus?',
    figure: <FourShapesFig />,
    question: 'Melyik alakzat szimmetrikus?',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 0,
    explanation: 'A szív bal és jobb fele egymás tükörképe. A ferde négyszögnek, a nem egyforma szárú L betűnek és a szabálytalan négyszögnek nincs tengelye.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'r4-q11',
    level: 2,
    questionTypeBadge: 'Szimmetriatengely',
    figure: (
      <ShapeOnly>
        <polygon points="70,105 170,105 120,18.4" fill="#7dd3fc" stroke="#075985" strokeWidth="2" />
      </ShapeOnly>
    ),
    question: 'Hány szimmetriatengelye van az egyenlő oldalú háromszögnek?',
    options: ['3', '1', '6', '0'],
    correctAnswer: 0,
    explanation: 'Mindhárom csúcsából indul egy tengely a szemközti oldal közepéig: 3 szimmetriatengely.'
  },
  {
    id: 'r4-q12',
    level: 2,
    questionTypeBadge: 'Szimmetriatengely',
    figure: (
      <ShapeOnly>
        <polygon points="50,100 150,100 190,25 90,25" fill="#bbf7d0" stroke="#166534" strokeWidth="2" />
      </ShapeOnly>
    ),
    question: 'Hány szimmetriatengelye van ennek a ferde négyszögnek?',
    options: ['0', '2', '4', '1'],
    correctAnswer: 0,
    explanation: 'Akárhogy hajtod össze, a két fele nem fedi egymást. Ennek a ferde négyszögnek nincs szimmetriatengelye.'
  },
  {
    id: 'r4-q13',
    level: 2,
    questionTypeBadge: 'Szimmetriatengely',
    figure: (
      <ShapeOnly>
        <polygon points="50,100 190,100 155,25 85,25" fill="#fde68a" stroke="#92400e" strokeWidth="2" />
      </ShapeOnly>
    ),
    question: 'Hány szimmetriatengelye van ennek a „vödör” alakú négyszögnek (két ferde oldala egyforma hosszú)?',
    options: ['1', '2', '0', '4'],
    correctAnswer: 0,
    explanation: 'Csak a függőleges középvonala mentén fedi egymást a két fele: 1 szimmetriatengely.'
  },
  {
    id: 'r4-q14',
    level: 2,
    questionTypeBadge: 'Tükrözés rácson',
    figure: (
      <AxisGrid
        cols={10}
        rows={5}
        u={20}
        vAxis={5}
        cells={[[2, 1, '#ef4444']]}
        marks={[
          [6, 1, 'A'],
          [8, 1, 'B'],
          [7, 1, 'C'],
          [7, 3, 'D']
        ]}
        label="Melyik a tükörkép helye?"
      />
    ),
    question: 'Melyik betűs négyzetbe kerül a piros négyzet tükörképe?',
    options: ['C', 'A', 'B', 'D'],
    correctAnswer: 0,
    explanation: 'A piros négyzet és a tengely között 2 üres négyzet van. A tükörkép ugyanabban a sorban, a tengely túloldalán szintén 2 négyzet után van: ez a C.'
  },
  {
    id: 'r4-q15',
    level: 2,
    questionTypeBadge: 'Hol a tengely?',
    figure: (
      <AxisGrid
        cols={10}
        rows={5}
        u={20}
        cells={[
          [1, 1, '#3b82f6'],
          [1, 2, '#3b82f6'],
          [2, 2, '#3b82f6'],
          [8, 1, '#3b82f6'],
          [8, 2, '#3b82f6'],
          [7, 2, '#3b82f6']
        ]}
        label="Melyik vonal a tükörtengely?"
        extra={(x0, y0, u) => (
          <g>
            {[
              [4, 'a'],
              [5, 'b'],
              [6, 'c']
            ].map(([x, t]) => (
              <g key={t as string}>
                <line x1={x0 + (x as number) * u} y1={y0} x2={x0 + (x as number) * u} y2={y0 + 4 * u} stroke="#7c3aed" strokeWidth="2" strokeDasharray="4 3" />
                <text x={x0 + (x as number) * u} y={y0 + 4 * u + 12} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#7c3aed">
                  {t}
                </text>
              </g>
            ))}
          </g>
        )}
      />
    ),
    question: 'A két kék alakzat egymás tükörképe. Melyik szaggatott vonal a tükörtengely?',
    options: ['b', 'a', 'c'],
    correctAnswer: 0,
    explanation: 'A bal alakzat jobb széle és a b vonal között 2 négyzet van, a jobb alakzat bal széle és a b vonal között is 2. A tengely pont középen van: ez a b.'
  },
  {
    id: 'r4-q16',
    level: 2,
    questionTypeBadge: 'Fordított kép',
    question: 'Egy jobbra mutató nyíl mellé függőlegesen tükröt állítunk. Merre mutat a nyíl tükörképe?',
    options: ['balra', 'jobbra', 'felfelé', 'lefelé'],
    correctAnswer: 0,
    explanation: 'A függőleges tükör a jobbot és a balt cseréli fel: a jobbra mutató nyíl tükörképe balra mutat.'
  },
  {
    id: 'r4-q17',
    level: 2,
    questionTypeBadge: 'Tükrözés rácson',
    figure: (
      <AxisGrid
        cols={8}
        rows={8}
        u={15}
        hAxis={4}
        cells={[[3, 1, '#16a34a']]}
        marks={[
          [3, 5, 'A'],
          [3, 6, 'B'],
          [4, 6, 'C'],
          [3, 7, 'D']
        ]}
        label="Melyik a tükörkép helye?"
      />
    ),
    question: 'A tükörtengely most vízszintes. Melyik betűs négyzetbe kerül a zöld négyzet tükörképe?',
    options: ['B', 'A', 'C', 'D'],
    correctAnswer: 0,
    explanation: 'A zöld négyzet és a tengely között 2 sor van. Lefelé, ugyanabban az oszlopban, a tengely alatt 2 sor után van a tükörkép: ez a B.'
  },
  {
    id: 'r4-q18',
    level: 2,
    questionTypeBadge: 'Logikai lapok',
    figure: <TrainFig />,
    question: 'A logikai lapokból rakott vonat mellé tükröt állítottunk. Melyik lap lesz a tükörképben közvetlenül a tükör mellett?',
    options: ['a zöld négyzet', 'a piros háromszög', 'a sárga négyzet', 'a kék négyzet'],
    correctAnswer: 0,
    explanation: 'A zöld négyzet áll a tükör mellett, ezért a tükörképe is a tükör mellett lesz. A háromszög a legmesszebb kerül.'
  },
  {
    id: 'r4-q19',
    level: 2,
    questionTypeBadge: 'Betűk',
    question: 'Hány szimmetriatengelye van a nyomtatott nagy H betűnek?',
    options: ['2', '1', '0', '4'],
    correctAnswer: 0,
    explanation: 'A H betűt függőlegesen és vízszintesen is félbehajthatod úgy, hogy a felei fedik egymást: 2 tengely.'
  },
  {
    id: 'r4-q20',
    level: 2,
    questionTypeBadge: 'Tükörkép',
    question: 'Milyen a tükörkép az eredeti alakzathoz képest?',
    options: ['ugyanakkora és ugyanolyan alakú, csak fordított', 'kisebb, mint az eredeti', 'nagyobb, mint az eredeti', 'más alakú, mint az eredeti'],
    correctAnswer: 0,
    explanation: 'A tükör nem nagyít és nem kicsinyít. A tükörkép ugyanakkora és ugyanolyan alakú, csak „megfordul”.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'r4-q21',
    level: 3,
    questionTypeBadge: 'Tükrözés rácson',
    figure: (
      <AxisGrid
        cols={10}
        rows={5}
        u={18}
        vAxis={5}
        cells={[
          [2, 0],
          [3, 1],
          [4, 1],
          [1, 2],
          [3, 3]
        ]}
        label="Hány négyzet lesz összesen?"
      />
    ),
    question: 'Megrajzolod a kék alakzat tükörképét is. Hány kis négyzetből áll majd az egész ábra?',
    options: ['10', '5', '15', '9'],
    correctAnswer: 0,
    explanation: 'Az eredeti 5 négyzetből áll, a tükörképe is 5-ből (mert ugyanakkora): 5 + 5 = 10.'
  },
  {
    id: 'r4-q22',
    level: 3,
    questionTypeBadge: 'Hiányzó rész',
    figure: (
      <AxisGrid
        cols={10}
        rows={5}
        u={18}
        vAxis={5}
        cells={[
          [4, 0],
          [3, 1],
          [4, 1],
          [2, 2],
          [3, 2],
          [4, 2],
          [5, 0],
          [5, 1],
          [6, 1],
          [5, 2]
        ]}
        label="Hány négyzet hiányzik?"
      />
    ),
    question: 'Az ábrát szimmetrikussá akarjuk tenni a piros tengelyre. Hány kis négyzetet kell még kiszínezni a jobb oldalon?',
    options: ['2', '6', '4', '10'],
    correctAnswer: 0,
    explanation: 'Bal oldalon 6 négyzet van, jobb oldalon már 4 tükörképe megvan. A jobb oldalon hiányzik még 6 − 4 = 2 négyzet.'
  },
  {
    id: 'r4-q23',
    level: 3,
    questionTypeBadge: 'Tengelyek száma',
    question: 'Melyik síkidomnak van pontosan 2 szimmetriatengelye?',
    options: ['a téglalapnak, amely nem négyzet', 'a négyzetnek', 'a körnek', 'az egyenlő oldalú háromszögnek'],
    correctAnswer: 0,
    explanation: 'A téglalapnak 2, a négyzetnek 4, a körnek végtelen sok, az egyenlő oldalú háromszögnek 3 szimmetriatengelye van.'
  },
  {
    id: 'r4-q24',
    level: 3,
    questionTypeBadge: 'Igaz vagy hamis',
    question: 'Melyik állítás IGAZ?',
    options: [
      'A négyzetnek több tükörtengelye van, mint a téglalapnak.',
      'A téglalap átlója mindig tükörtengely.',
      'A ferde négyszögnek 2 tükörtengelye van.',
      'A körnek csak 1 tükörtengelye van.'
    ],
    correctAnswer: 0,
    explanation: 'A négyzetnek 4, a téglalapnak 2 tükörtengelye van, tehát az első igaz. A téglalap átlója nem tengely, a ferde négyszögnek nincs tengelye, a körnek végtelen sok van.'
  },
  {
    id: 'r4-q25',
    level: 3,
    questionTypeBadge: 'Távolság',
    figure: (
      <AxisGrid
        cols={12}
        rows={3}
        u={18}
        vAxis={6}
        extra={(x0, y0, u) => (
          <g>
            <circle cx={x0 + 2 * u} cy={y0 + 1.5 * u} r="5" fill="#2563eb" />
            <text x={x0 + 2 * u} y={y0 + 1.5 * u - 8} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#2563eb">
              P
            </text>
          </g>
        )}
        label="P és tükörképe távolsága = ?"
      />
    ),
    question: 'A P pont 4 négyzetnyire van a tükörtengelytől. Milyen messze van a P pont a saját tükörképétől?',
    options: ['8 négyzetnyire', '4 négyzetnyire', '2 négyzetnyire', '12 négyzetnyire'],
    correctAnswer: 0,
    explanation: 'P a tengelytől 4, a tükörképe a tengely másik oldalán szintén 4 négyzetnyire van: 4 + 4 = 8.'
  },
  {
    id: 'r4-q26',
    level: 3,
    questionTypeBadge: 'Alaprajz tükrözése',
    figure: <PlanMirrorFig />,
    question: 'Rózsaszín rudakból építünk az alaprajz szerint, majd megépítjük a tükörképét is. Hány rúd kell összesen?',
    options: ['6', '3', '4', '9'],
    correctAnswer: 0,
    explanation: 'Az építmény 1 + 1 + 1 = 3 rúdból áll. A tükörképe ugyanakkora, az is 3 rúd: 3 + 3 = 6.'
  },
  {
    id: 'r4-q27',
    level: 3,
    questionTypeBadge: 'Tükörszám',
    question: 'Egy számológép kijelzőjén (pálcikás számjegyekkel) melyik szám látszik pontosan ugyanígy egy mellé állított függőleges tükörben?',
    options: ['808', '123', '275', '649'],
    correctAnswer: 0,
    explanation: 'A pálcikás 8-as és 0-s szimmetrikus a függőleges tengelyre, és a 808 visszafelé olvasva is 808. A többi számjegy a tükörben megfordulna.'
  },
  {
    id: 'r4-q28',
    level: 3,
    questionTypeBadge: 'Új síkidom',
    figure: (
      <AxisGrid cols={10} rows={6} u={18} vAxis={5} cells={[[3, 1], [4, 1], [3, 2], [4, 2], [3, 3], [4, 3], [3, 4], [4, 4]]} label="Mi lesz a két rész együtt?" />
    ),
    question: 'A 2 négyzet széles, 4 négyzet magas téglalap a tükörtengely mellett áll. Megrajzoljuk a tükörképét. Milyen síkidomot alkot a kettő együtt?',
    options: ['négyzetet', 'téglalapot, amely nem négyzet', 'háromszöget', 'hatszöget'],
    correctAnswer: 0,
    explanation: 'A tükörkép is 2 széles és 4 magas, és pont hozzáér. Együtt 2 + 2 = 4 széles és 4 magas: ez négyzet.'
  },
  {
    id: 'r4-q29',
    level: 3,
    questionTypeBadge: 'Fél ház',
    figure: (
      <AxisGrid
        cols={10}
        rows={7}
        u={17}
        vAxis={5}
        label="Hány csúcsa lesz az egész háznak?"
        extra={(x0, y0, u) => (
          <polygon
            points={`${x0 + 5 * u},${y0 + 1 * u} ${x0 + 3 * u},${y0 + 3 * u} ${x0 + 3 * u},${y0 + 6 * u} ${x0 + 5 * u},${y0 + 6 * u}`}
            fill="#fdba74"
            stroke="#9a3412"
            strokeWidth="2"
          />
        )}
      />
    ),
    question: 'Megrajzoltuk egy ház bal felét a tükörtengely mellé. Ha megrajzolod a tükörképét is, hány csúcsa lesz az egész háznak?',
    options: ['5', '6', '3', '8'],
    correctAnswer: 0,
    explanation: 'A ház teteje a tengelyen van (1 csúcs). Bal oldalon 2 csúcs, a tükörképben jobb oldalon is 2: 1 + 2 + 2 = 5. Ötszög lesz.'
  },
  {
    id: 'r4-q30',
    level: 3,
    questionTypeBadge: 'Minta tengelyei',
    figure: <AxisGrid cols={4} rows={4} u={24} cells={[[0, 0, '#ef4444']]} label="Szimmetriatengelyek száma = ?" />,
    question: 'Egy 4 · 4-es négyzet alakú ablaknak csak a bal felső kis négyzete piros. Hány szimmetriatengelye van a színes mintának?',
    options: ['1', '0', '2', '4'],
    correctAnswer: 0,
    explanation: 'A nagy négyzetnek 4 tengelye lenne, de a piros négyzet miatt csak az az átló marad, amely a bal felső saroktól a jobb alsóig megy: 1 tengely.'
  }
];

export const Reflection4Quiz: React.FC<{
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
      topicId="g4-geom-tukrozes-quiz"
      subtopicId="a-tukrozes"
      title="4. A tükrözés – Kvíz"
      subtitle="30 feladat 3 szinten: tükörkép, tükörtengely, tükrözés négyzetrácson, szimmetrikus alakzatok, szimmetriatengelyek száma."
      badge="4. OSZTÁLY • V. SÍKIDOMOK ÉS TESTEK • KVÍZ"
      questions={REFLECTION4_QUESTIONS}
      cheatSheets={[
        {
          title: 'Tükörkép',
          items: [
            'A piros vonal a tükör helye: a tükörtengely.',
            'A tükörkép ugyanakkora, ugyanolyan alakú, de fordított.',
            'Minden pont ugyanannyira van a tengelytől, csak a másik oldalon.',
            'Pont és tükörképe: kétszer olyan messze egymástól, mint a tengelytől.'
          ]
        },
        {
          title: 'Rácson',
          items: [
            'Függőleges tengely: ugyanabban a sorban maradsz.',
            'Vízszintes tengely: ugyanabban az oszlopban maradsz.',
            'Számold a négyzeteket a tengelytől!',
            'Ellenőrizz tükörrel!'
          ]
        },
        {
          title: 'Szimmetriatengelyek',
          items: ['négyzet: 4, téglalap: 2', 'egyenlő oldalú háromszög: 3', '„vödör” négyszög: 1, ferde négyszög: 0', 'kör: végtelen sok']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <Reflection4Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <Reflection4Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default Reflection4Quiz;

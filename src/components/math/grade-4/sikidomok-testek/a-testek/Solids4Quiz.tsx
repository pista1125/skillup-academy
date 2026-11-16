import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Solids4Matcher } from './Solids4Matcher';
import { Solids4Sorter } from './Solids4Sorter';
import { Solids4Building, Solids4Box, Solids4Sphere } from './Solids4Figures';

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

const Lbl: React.FC<{ x: number; y: number; t: string; c?: string; s?: number }> = ({ x, y, t, c = UNK, s = 12 }) => (
  <text x={x} y={y} textAnchor="middle" fontSize={s} fontWeight="bold" fill={c}>
    {t}
  </text>
);

const PlanFig: React.FC<{ plan: (number | null)[][] }> = ({ plan }) => {
  const s = 26;
  const cols = Math.max(...plan.map((r) => r.length));
  const x0 = (240 - cols * s) / 2;
  return (
    <QFig h={plan.length * s + 40}>
      {plan.map((row, r) =>
        row.map((v, c) =>
          v === null ? null : (
            <g key={`${r}-${c}`}>
              <rect x={x0 + c * s} y={10 + r * s} width={s} height={s} fill="#fff7ed" stroke="#9a3412" strokeWidth="1.5" />
              <text x={x0 + c * s + s / 2} y={10 + r * s + s / 2 + 5} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#7c2d12">
                {v}
              </text>
            </g>
          )
        )
      )}
      <Lbl x={120} y={plan.length * s + 30} t="Hány kis kocka kell?" />
    </QFig>
  );
};

const BagFig: React.FC = () => (
  <QFig h={110}>
    <circle cx="25" cy="50" r="13" fill="#a855f7" stroke="#581c87" />
    <ellipse cx="65" cy="50" rx="18" ry="12" fill="#fde047" stroke="#a16207" />
    <circle cx="105" cy="50" r="12" fill="#fb923c" stroke="#9a3412" />
    <g>
      {[0, 1, 2].map((i) =>
        [0, 1, 2].map((j) => <rect key={`${i}${j}`} x={128 + i * 9} y={37 + j * 9} width="9" height="9" fill={['#ef4444', '#facc15', '#22c55e'][(i + j) % 3]} stroke="#111" strokeWidth="0.8" />)
      )}
    </g>
    <circle cx="180" cy="50" r="13" fill="#c084fc" stroke="#6b21a8" />
    <rect x="203" y="37" width="26" height="26" rx="3" fill="#5eead4" stroke="#115e59" />
    {[
      [209, 43],
      [223, 43],
      [216, 50],
      [209, 57],
      [223, 57]
    ].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r="2" fill="#fff" />
    ))}
    <text x="120" y="88" textAnchor="middle" fontSize="8.5" fill="#334155">labda, citrom, labda, Rubik-kocka, üveggolyó, dobókocka</text>
  </QFig>
);

const BallsRowFig: React.FC = () => (
  <QFig h={110}>
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <circle cx={60 + i * 50} cy="50" r="25" fill="#bef264" stroke="#4d7c0f" strokeWidth="2" />
        <path d={`M ${42 + i * 50} 33 Q ${60 + i * 50} 50 ${42 + i * 50} 67`} fill="none" stroke="#fff" strokeWidth="2" />
      </g>
    ))}
    <line x1="35" y1="18" x2="85" y2="18" stroke="#334155" />
    <text x="60" y="14" textAnchor="middle" fontSize="10" fill="#334155">66 mm</text>
    <line x1="35" y1="88" x2="185" y2="88" stroke={UNK} strokeWidth="2" />
    <Lbl x={110} y={104} t="? hosszú doboz kell" />
  </QFig>
);

const CubeNetFig: React.FC = () => {
  const u = 24;
  const cells: [number, number][] = [
    [1, 0],
    [0, 1],
    [1, 1],
    [2, 1],
    [3, 1],
    [1, 2]
  ];
  return (
    <QFig h={110}>
      {cells.map(([x, y], i) => (
        <rect key={i} x={72 + x * u} y={15 + y * u} width={u} height={u} fill="#ddd6fe" stroke="#4c1d95" strokeWidth="1.5" />
      ))}
      <Lbl x={120} y={102} t="Melyik test hálója?" />
    </QFig>
  );
};

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
const SOLIDS4_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 's4-q1',
    level: 1,
    questionTypeBadge: 'Testek neve',
    figure: (
      <QFig h={120}>
        <Solids4Sphere cx={120} cy={55} r={40} />
        <Lbl x={120} y={112} t="Mi a neve?" />
      </QFig>
    ),
    question: 'Mi a neve ennek a testnek?',
    options: ['gömb', 'kör', 'henger', 'kocka'],
    correctAnswer: 0,
    explanation: 'Ez gömb, mint a labda. A kör síkidom – a gömb test, minden irányban kerek.'
  },
  {
    id: 's4-q2',
    level: 1,
    questionTypeBadge: 'Testek neve',
    figure: (
      <QFig h={130}>
        <Solids4Box x={85} y={100} a={60} b={60} c={30} />
        <Lbl x={120} y={122} t="Mi a neve?" />
      </QFig>
    ),
    question: 'Mi a neve ennek a testnek, amelynek minden lapja egyforma négyzet?',
    options: ['kocka', 'négyzet', 'henger', 'gúla'],
    correctAnswer: 0,
    explanation: 'A kockát 6 egyforma négyzet határolja. A négyzet csak síkidom – a kocka egyik lapja.'
  },
  {
    id: 's4-q3',
    level: 1,
    questionTypeBadge: 'Lapok',
    question: 'Hány lapja van a kockának?',
    options: ['6', '4', '8', '12'],
    correctAnswer: 0,
    explanation: 'Elöl, hátul, fent, lent, bal és jobb oldalt: 6 lap, mint a dobókockán a 6 szám.'
  },
  {
    id: 's4-q4',
    level: 1,
    questionTypeBadge: 'Élek',
    question: 'Hány éle van a téglatestnek?',
    options: ['12', '8', '6', '9'],
    correctAnswer: 0,
    explanation: 'Elöl 4 él, hátul 4 él, és 4 él köti össze az elejét a hátuljával: 4 + 4 + 4 = 12.'
  },
  {
    id: 's4-q5',
    level: 1,
    questionTypeBadge: 'Csúcsok',
    figure: (
      <QFig h={140}>
        <Solids4Box x={60} y={110} a={100} b={60} c={35} fill="#fecaca" />
        <Lbl x={120} y={132} t="Csúcsok száma = ?" />
      </QFig>
    ),
    question: 'Hány csúcsa van a téglatestnek? (A szaggatott élek hátul vannak.)',
    options: ['8', '7', '6', '4'],
    correctAnswer: 0,
    explanation: 'Elöl 4 csúcs, hátul is 4 csúcs: 8. A hátsó bal alsó csúcsot nem látjuk, de az is a test csúcsa!'
  },
  {
    id: 's4-q6',
    level: 1,
    questionTypeBadge: 'Görbe felület',
    question: 'Melyik testet határolja csak görbe felület?',
    options: ['a gömböt', 'a kockát', 'a téglatestet', 'a gúlát'],
    correctAnswer: 0,
    explanation: 'A gömbnek nincs sík lapja, csak görbe felülete. A kockát, a téglatestet és a gúlát síklapok határolják.'
  },
  {
    id: 's4-q7',
    level: 1,
    questionTypeBadge: 'Tárgyak',
    question: 'Melyik tárgy hasonlít a hengerre?',
    options: ['a konzervdoboz', 'a dobókocka', 'a focilabda', 'a Rubik-kocka'],
    correctAnswer: 0,
    explanation: 'A konzervdoboz alja és teteje kör, az oldala görbe felület: henger. A dobókocka és a Rubik-kocka kocka, a focilabda gömb.'
  },
  {
    id: 's4-q8',
    level: 1,
    questionTypeBadge: 'Kis kockák',
    figure: (
      <QFig h={130}>
        <Solids4Building
          heights={[
            [2, 1, 0],
            [1, 1, 1]
          ]}
          u={30}
          x0={60}
          y0={110}
        />
        <Lbl x={200} y={60} t="? kocka" />
      </QFig>
    ),
    question: 'Hány kis kockából építettük az építményt?',
    options: ['6', '5', '7', '4'],
    correctAnswer: 0,
    explanation: 'Elöl 3 kocka áll sorban. Hátul bal oldalt 2 kocka van egymáson, mellette 1: 3 + 2 + 1 = 6.'
  },
  {
    id: 's4-q9',
    level: 1,
    questionTypeBadge: 'Test vagy síkidom',
    question: 'Melyik test (nem síkidom)?',
    options: ['a dobókocka', 'a négyzet', 'a kör', 'a háromszög'],
    correctAnswer: 0,
    explanation: 'A dobókocka kézbe vehető, térbeli test: kocka. A négyzet, a kör és a háromszög lapos síkidomok.'
  },
  {
    id: 's4-q10',
    level: 1,
    questionTypeBadge: 'Gurul?',
    question: 'Melyik tárgyat tudod könnyen odébb gurítani az asztalon?',
    options: ['a gömb alakú labdát', 'a kocka alakú dobozt', 'a téglatest alakú téglát', 'a gúla alakú díszt'],
    correctAnswer: 0,
    explanation: 'A gömböt görbe felület határolja, ezért gurul. A síklapokkal határolt testek nyugalomban maradnak.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 's4-q11',
    level: 2,
    questionTypeBadge: 'Testháló',
    figure: <CubeNetFig />,
    question: 'Ez a háló 6 egyforma négyzetből áll. Melyik test hálója?',
    options: ['a kockáé', 'a gúláé', 'a hengeré', 'a gömbé'],
    correctAnswer: 0,
    explanation: 'Ha összehajtod, 6 egyforma négyzetlapú test lesz belőle: kocka.'
  },
  {
    id: 's4-q12',
    level: 2,
    questionTypeBadge: 'Testháló',
    question: 'Hány téglalapból áll a téglatest hálója?',
    options: ['6', '4', '8', '12'],
    correctAnswer: 0,
    explanation: 'A téglatestnek 6 lapja van, ezért a hálója is 6 téglalapból áll. Ezek közül kettő-kettő egyforma.'
  },
  {
    id: 's4-q13',
    level: 2,
    questionTypeBadge: 'Élváz',
    question: 'A kocka élvázát számolópálcikákból építed meg. Hány pálcika kell?',
    options: ['12', '8', '6', '24'],
    correctAnswer: 0,
    explanation: 'Minden él egy pálcika. A kockának 12 éle van, ezért 12 pálcika kell.'
  },
  {
    id: 's4-q14',
    level: 2,
    questionTypeBadge: 'Élváz',
    question: 'A kocka élvázánál a pálcikákat gyurmagolyókkal rögzíted a csúcsokban. Hány gyurmagolyó kell?',
    options: ['8', '12', '6', '4'],
    correctAnswer: 0,
    explanation: 'Minden csúcsba egy gyurmagolyó kell. A kockának 8 csúcsa van.'
  },
  {
    id: 's4-q15',
    level: 2,
    questionTypeBadge: 'Alaprajz',
    figure: (
      <PlanFig
        plan={[
          [3, 3, 3],
          [2, 2, 2],
          [1, null, null],
          [1, null, null]
        ]}
      />
    ),
    question: 'Az alaprajzon a szám azt mutatja, hány kocka áll ott egymáson. Hány kis kocka kell az építményhez?',
    options: ['17', '8', '16', '18'],
    correctAnswer: 0,
    explanation: 'Add össze a számokat: 3 + 3 + 3 = 9, 2 + 2 + 2 = 6, és 1 + 1 = 2. Összesen 9 + 6 + 2 = 17. (A 8 a mezők száma.)'
  },
  {
    id: 's4-q16',
    level: 2,
    questionTypeBadge: 'Kis kockák',
    figure: (
      <QFig h={140}>
        <Solids4Building
          heights={[
            [2, 2],
            [2, 2]
          ]}
          u={34}
          x0={70}
          y0={120}
          color="#60a5fa"
        />
        <Lbl x={205} y={70} t="? kocka" />
      </QFig>
    ),
    question: 'Ez a nagy kocka kis kockákból áll. Hány kis kockából?',
    options: ['8', '7', '6', '4'],
    correctAnswer: 0,
    explanation: 'Egy rétegben 2 · 2 = 4 kocka van, és 2 réteg: 4 · 2 = 8. A hátsó alsó kockát nem látod, de ott van!'
  },
  {
    id: 's4-q17',
    level: 2,
    questionTypeBadge: 'Kiegészítés kockává',
    figure: (
      <QFig h={130}>
        <Solids4Building
          heights={[
            [1, 1],
            [1, 0]
          ]}
          u={34}
          x0={75}
          y0={105}
          color="#34d399"
        />
        <Lbl x={120} y={124} t="Legalább hány kocka hiányzik?" />
      </QFig>
    ),
    question: 'Ezt az építményt 2 · 2 · 2-es kockává akarjuk kiegészíteni. Legalább hány kis kocka kell még?',
    options: ['5', '1', '4', '8'],
    correctAnswer: 0,
    explanation: 'A 2 · 2 · 2-es kocka 8 kis kockából áll. Most 3 van: 8 − 3 = 5 kell még. (Az 1 csak az alsó réteget teszi teljessé.)'
  },
  {
    id: 's4-q18',
    level: 2,
    questionTypeBadge: 'Lépcső',
    question: 'Kis kockákból egyre magasabb lépcsőket építünk: 1, 3, 6, 10 kocka kell. Hány kocka kell a következő lépcsőhöz?',
    options: ['15', '14', '11', '20'],
    correctAnswer: 0,
    explanation: 'A különbségek: +2, +3, +4. A következő +5: 10 + 5 = 15.'
  },
  {
    id: 's4-q19',
    level: 2,
    questionTypeBadge: 'Nézetek',
    figure: (
      <QFig h={150}>
        <Solids4Building
          heights={[
            [1, 1, 1],
            [3, 1, 2]
          ]}
          u={26}
          x0={70}
          y0={130}
          color="#f97316"
        />
        <Lbl x={120} y={145} t="Elölről nézve: hány négyzet?" s={11} />
      </QFig>
    ),
    question: 'Hány négyzetet látsz, ha elölről nézed az építményt?',
    options: ['6', '9', '3', '5'],
    correctAnswer: 0,
    explanation: 'Elölről nézve minden oszlopban a legmagasabb tornyot látod: 3, 1 és 2 négyzet, összesen 6. (Az építmény 9 kockából áll, de a hátsókat eltakarják az elsők.)'
  },
  {
    id: 's4-q20',
    level: 2,
    questionTypeBadge: 'Gúla',
    question: 'Milyen lapok határolják a négyzet alapú gúlát?',
    options: ['1 négyzet és 4 háromszög', '6 négyzet', '2 kör és egy görbe felület', '4 négyzet és 1 háromszög'],
    correctAnswer: 0,
    explanation: 'Az alja négyzet, az oldalai háromszögek, amelyek a csúcsban találkoznak: 1 + 4 = 5 lap.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 's4-q21',
    level: 3,
    questionTypeBadge: 'Teniszlabdák',
    figure: <BallsRowFig />,
    question: 'Egy teniszlabda 66 mm széles. Legalább milyen hosszú legyen a doboz, ha 3 labdát teszünk bele egy sorba?',
    options: ['19 cm 8 mm', '198 cm', '18 cm 8 mm', '69 mm'],
    correctAnswer: 0,
    explanation: '3 · 66 = 198 mm. 198 mm = 190 mm + 8 mm = 19 cm 8 mm.'
  },
  {
    id: 's4-q22',
    level: 3,
    questionTypeBadge: 'Labdaháló',
    question: 'Juli labdatartó hálójába legfeljebb 30 cm széles labda fér. Melyik labda NEM fér bele?',
    options: ['a 380 mm széles', 'a 300 mm széles', 'a 26 cm széles', 'a 14 cm széles'],
    correctAnswer: 0,
    explanation: 'Váltsd át: 380 mm = 38 cm, ez több mint 30 cm. A 300 mm = 30 cm még éppen belefér.'
  },
  {
    id: 's4-q23',
    level: 3,
    questionTypeBadge: 'Kókuszgolyók',
    question: 'Kókuszgolyókból négyzet alapú piramist rakunk. Alul 3 · 3 golyó van, fölötte 2 · 2, a tetején 1. Hány golyó van a piramisban?',
    options: ['14', '9', '10', '27'],
    correctAnswer: 0,
    explanation: 'Rétegenként: 3 · 3 = 9, 2 · 2 = 4, és 1. Összesen 9 + 4 + 1 = 14.'
  },
  {
    id: 's4-q24',
    level: 3,
    questionTypeBadge: 'Kiegészítés kockává',
    question: 'Egy építmény 20 kis kockából áll, és pontosan belefér egy 3 · 3 · 3-as kockába. Hány kis kocka hiányzik a nagy kockából?',
    options: ['7', '27', '9', '5'],
    correctAnswer: 0,
    explanation: 'A 3 · 3 · 3-as kocka: 3 · 3 = 9 egy rétegben, 3 réteg: 27 kis kocka. Hiányzik: 27 − 20 = 7.'
  },
  {
    id: 's4-q25',
    level: 3,
    questionTypeBadge: 'Alaprajz',
    figure: (
      <PlanFig
        plan={[
          [2, 4, 2],
          [4, 2, 4],
          [2, 4, 2]
        ]}
      />
    ),
    question: 'Hány kis kocka kell az alaprajz szerinti építményhez?',
    options: ['26', '9', '24', '28'],
    correctAnswer: 0,
    explanation: 'Négy darab 4-es: 4 · 4 = 16. Öt darab 2-es: 5 · 2 = 10. Összesen 16 + 10 = 26.'
  },
  {
    id: 's4-q26',
    level: 3,
    questionTypeBadge: 'Téglatest',
    figure: (
      <QFig h={140}>
        <Solids4Building
          heights={[
            [2, 2, 2, 2],
            [2, 2, 2, 2],
            [2, 2, 2, 2]
          ]}
          u={24}
          x0={45}
          y0={125}
          color="#facc15"
        />
        <Lbl x={210} y={60} t="?" s={16} />
      </QFig>
    ),
    question: 'A téglatest egy rétegében 4 · 3 kis kocka van, és 2 réteg van egymáson. Hány kis kockából áll?',
    options: ['24', '14', '12', '9'],
    correctAnswer: 0,
    explanation: 'Egy réteg: 4 · 3 = 12 kocka. Két réteg: 12 · 2 = 24 kis kocka.'
  },
  {
    id: 's4-q27',
    level: 3,
    questionTypeBadge: 'Testháló',
    question: 'A téglatest egyik lapja 5 cm × 3 cm-es téglalap. Hány ugyanilyen lapja van összesen a téglatestnek?',
    options: ['2', '1', '4', '6'],
    correctAnswer: 0,
    explanation: 'A téglatest szemben lévő lapjai egyformák: ennek a lapnak a vele szemben lévő a párja. Tehát 2 ilyen lap van.'
  },
  {
    id: 's4-q28',
    level: 3,
    questionTypeBadge: 'Élváz',
    question: 'Egy kocka élvázát drótból hajlítjuk meg. A kocka éle 3 cm. Hány cm drót kell?',
    options: ['36 cm', '24 cm', '18 cm', '9 cm'],
    correctAnswer: 0,
    explanation: 'A kockának 12 éle van, mindegyik 3 cm: 12 · 3 = 36 cm. (A 24 cm csak 8 élre lenne elég.)'
  },
  {
    id: 's4-q29',
    level: 3,
    questionTypeBadge: 'Biztos vagy lehetetlen',
    figure: <BagFig />,
    question: 'A zsákban 6 tárgy van: 2 labda, egy citrom, egy Rubik-kocka, egy üveggolyó és egy dobókocka. Kiveszünk 4 tárgyat. Milyen az az esemény, hogy „lesz köztük gömb alakú”?',
    options: ['biztos', 'lehet, de nem biztos', 'lehetetlen'],
    correctAnswer: 0,
    explanation: 'Gömb alakú a 2 labda és az üveggolyó. Nem gömb a citrom és a 2 kocka: ez csak 3 tárgy. Ha 4-et veszünk ki, legalább egy gömb alakú biztosan lesz köztük.'
  },
  {
    id: 's4-q30',
    level: 3,
    questionTypeBadge: 'Nézetek',
    question: 'Egy henger áll az asztalon. Felülről nézve kört látsz. Milyen alakot látsz, ha elölről nézed?',
    options: ['téglalapot', 'kört', 'háromszöget', 'ötszöget'],
    correctAnswer: 0,
    explanation: 'Elölről a henger egyenes oldalait és a tetejét, alját látod egyenes vonalnak: téglalapot látsz. (A kúpot elölről nézve látnál háromszöget.)'
  }
];

export const Solids4Quiz: React.FC<{
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
      topicId="g4-geom-testek-quiz"
      subtopicId="a-testek"
      title="3. A testek – Kvíz"
      subtitle="30 feladat 3 szinten: testek felismerése, lap, él, csúcs, testháló, építmények kis kockákból, alaprajz, nézetek, szöveges feladatok."
      badge="4. OSZTÁLY • V. SÍKIDOMOK ÉS TESTEK • KVÍZ"
      questions={SOLIDS4_QUESTIONS}
      cheatSheets={[
        {
          title: 'Lap, él, csúcs',
          items: [
            'Él: ahol két lap találkozik. Csúcs: ahol az élek találkoznak.',
            'Kocka és téglatest: 6 lap, 12 él, 8 csúcs.',
            'Négyzet alapú gúla: 5 lap, 8 él, 5 csúcs.',
            'A szaggatott élek hátul vannak – ezeket is számold!'
          ]
        },
        {
          title: 'Testek',
          items: [
            'Síklapok határolják: kocka, téglatest, gúla.',
            'Görbe felület határolja: gömb.',
            'Sík lap és görbe felület is: henger, kúp, félgömb.',
            'Kocka hálója: 6 egyforma négyzet. Téglatesté: 6 téglalap.'
          ]
        },
        {
          title: 'Kis kockák',
          items: [
            'Alaprajz: a számok összege = kockák száma.',
            'Téglatest: egy réteg (sor · oszlop) · rétegek száma.',
            '2 · 2 · 2 = 8, 3 · 3 · 3 = 27 kis kocka.',
            'Elölnézet: oszloponként a legmagasabb torony.'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <Solids4Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <Solids4Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default Solids4Quiz;

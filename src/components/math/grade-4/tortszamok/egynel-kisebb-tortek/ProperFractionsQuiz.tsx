import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { ProperFractionsMatcher } from './ProperFractionsMatcher';
import { ProperFractionsSorter } from './ProperFractionsSorter';
import { PizzaG, BarG, ChocoG, FONT } from '../tortresz-tortek-ertelmezese/FractionIntro4Figures';
import { CountryFlagG, Country, CupG, CarG, BeadsG, TargetG, GridG, ARCHERY_HITS, PARKING } from './ProperFractionsFigures';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const C_UNK = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; h?: number; w?: number }> = ({ children, h = 150, w = 240 }) => (
  <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width={w - 2} height={h - 2} rx="10" fill="#f0f9ff" stroke="#7dd3fc" />
    {children}
  </svg>
);

const Ask: React.FC<{ x: number; y: number; text?: string }> = ({ x, y, text = '?' }) => (
  <text x={x} y={y} textAnchor="middle" fontSize="18" fontWeight="bold" fill={C_UNK}>
    {text}
  </text>
);

const QPizza: React.FC<{ parts: number; filled: number }> = ({ parts, filled }) => (
  <QFig>
    <PizzaG cx={95} cy={75} r={60} parts={parts} filled={filled} color="#f97316" emptyColor="#fde68a" pizza />
    <Ask x={200} y={82} />
  </QFig>
);

const QBar: React.FC<{ parts: number; filled: number; label?: string }> = ({ parts, filled, label }) => (
  <QFig h={110}>
    <BarG x={20} y={25} w={180} h={50} parts={parts} filled={filled} color="#38bdf8" />
    <Ask x={222} y={57} />
    {label && (
      <text x={110} y={97} textAnchor="middle" fontSize="11" fill="#475569">
        {label}
      </text>
    )}
  </QFig>
);

const QBeads: React.FC<{ beads: string }> = ({ beads }) => (
  <QFig h={90}>
    <BeadsG x={120 - ((beads.length - 1) * 34) / 2} y={42} beads={beads} r={13} gap={34} />
    <Ask x={222} y={50} />
  </QFig>
);

const QChoco: React.FC<{ rows: number; cols: number; filled: number }> = ({ rows, cols, filled }) => (
  <QFig h={120}>
    <ChocoG x={30} y={20} rows={rows} cols={cols} cell={30} filled={filled} />
    <Ask x={220} y={66} />
  </QFig>
);

/** Négy pizza A–D; csak a `good` jelűn színes pontosan 2 harmad. */
const QWhich23: React.FC = () => {
  const items: { L: string; parts: number; filled: number }[] = [
    { L: 'A', parts: 3, filled: 1 },
    { L: 'B', parts: 2, filled: 1 },
    { L: 'C', parts: 3, filled: 2 },
    { L: 'D', parts: 4, filled: 2 }
  ];
  return (
    <QFig h={110} w={260}>
      {items.map((it, i) => (
        <g key={it.L}>
          <text x={35 + i * 63} y={20} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">
            {it.L}
          </text>
          <PizzaG cx={35 + i * 63} cy={60} r={26} parts={it.parts} filled={it.filled} color="#38bdf8" emptyColor="#ffffff" />
        </g>
      ))}
      <text x={130} y={102} textAnchor="middle" fontSize="11" fill="#475569">Hol színes a kör 2 harmada?</text>
    </QFig>
  );
};

const QFlag: React.FC<{ country: Country; note?: string }> = ({ country, note }) => (
  <QFig h={120}>
    <CountryFlagG x={40} y={18} w={130} h={80} country={country} />
    <Ask x={205} y={66} />
    {note && (
      <text x={105} y={113} textAnchor="middle" fontSize="11" fill="#475569">
        {note}
      </text>
    )}
  </QFig>
);

const QFlags: React.FC<{ list: Country[] }> = ({ list }) => (
  <QFig h={100} w={260}>
    {list.map((c, i) => (
      <g key={c}>
        <CountryFlagG x={10 + i * 62} y={20} w={54} h={36} country={c} />
        <text x={37 + i * 62} y={74} textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#0f172a">
          {c}
        </text>
      </g>
    ))}
  </QFig>
);

const QGrid: React.FC<{ mode: 'col' | 'row' }> = ({ mode }) => (
  <QFig h={120}>
    <GridG x={40} y={20} rows={3} cols={4} cell={26} blue={(r, c) => (mode === 'col' ? c === 0 : r === 0)} />
    <Ask x={200} y={66} />
  </QFig>
);

const QCups: React.FC = () => (
  <QFig h={90} w={260}>
    {Array.from({ length: 12 }, (_, i) => (
      <CupG key={i} x={12 + i * 20} y={28} color={i < 4 ? '#ef4444' : '#fbbf24'} s={0.75} />
    ))}
    <Ask x={130} y={80} />
  </QFig>
);

const QTarget: React.FC = () => (
  <QFig h={160}>
    <rect x={15} y={8} width={150} height={144} fill="#ffffff" stroke="#cbd5e1" />
    <TargetG cx={90} cy={80} r={52} hits={ARCHERY_HITS.map(([x, y]) => [x * 0.79, y * 0.79] as [number, number])} />
    <text x={205} y={60} textAnchor="middle" fontSize="11" fill="#475569">10 lövés</text>
    <Ask x={205} y={88} />
  </QFig>
);

const QCheese: React.FC = () => (
  <QFig h={110}>
    <BarG x={20} y={20} w={200} h={30} parts={2} filled={[0]} color="#facc15" emptyColor="#e2e8f0" stroke="#a16207" />
    <text x={70} y={68} textAnchor="middle" fontSize="11" fill="#475569">1. nap után</text>
    <text x={120} y={92} textAnchor="middle" fontSize="12" fontWeight="bold" fill={C_UNK}>2. nap után? 3. nap után?</text>
  </QFig>
);

const QParking: React.FC = () => (
  <QFig h={110} w={260}>
    <rect x={8} y={8} width={244} height={94} rx="8" fill="#94a3b8" />
    {PARKING.map((c, i) => (
      <CarG key={i} x={14 + (i % 6) * 40} y={i < 6 ? 20 : 64} color={c} />
    ))}
  </QFig>
);

const QSquare9: React.FC = () => (
  <QFig h={130}>
    <GridG x={60} y={18} rows={3} cols={3} cell={32} blue={() => false} c2="#ffffff" />
    <Ask x={200} y={72} />
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const PROPER_FRACTIONS_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'pf-q1',
    level: 1,
    questionTypeBadge: 'Leolvasás',
    figure: <QBar parts={4} filled={3} />,
    question: 'A szalag 1 egészet ér. Hányad része színes?',
    options: ['3 negyed', '1 negyed', '3 harmad', '4 harmad'],
    correctAnswer: 0,
    explanation: '4 egyenlő rész van, ebből 3 színes. 4 rész közül 3: ez 3 negyed.'
  },
  {
    id: 'pf-q2',
    level: 1,
    questionTypeBadge: 'Pizza',
    figure: <QPizza parts={3} filled={2} />,
    question: 'Hányad részét színeztük ki a pizzának?',
    options: ['2 harmad', '1 harmad', '2 ketted', '3 ketted'],
    correctAnswer: 0,
    explanation: 'A pizzát 3 egyenlő részre vágtuk, ebből 2 színes. Ez 2 harmad.'
  },
  {
    id: 'pf-q3',
    level: 1,
    questionTypeBadge: 'Mit jelent?',
    question: 'Mit jelent a 3 ötöd?',
    options: [
      'Az egészet 5 egyenlő részre osztjuk, és 3 részt veszünk.',
      'Az egészet 3 egyenlő részre osztjuk, és 5 részt veszünk.',
      'Az egészet 8 egyenlő részre osztjuk.',
      '3 egészet és még 5-öt veszünk.'
    ],
    correctAnswer: 0,
    explanation: 'Az „ötöd” mondja meg, hogy 5 egyenlő részre osztottuk. A 3 mondja meg, hány részt veszünk belőle.'
  },
  {
    id: 'pf-q4',
    level: 1,
    questionTypeBadge: 'Fehér rész',
    figure: <QBar parts={4} filled={1} label="Hányad része fehér?" />,
    question: 'A szalag 1 egészet ér. Hányad része fehér?',
    options: ['3 negyed', '1 negyed', '3 harmad', '1 harmad'],
    correctAnswer: 0,
    explanation: '4 egyenlő rész van, ebből 1 színes és 3 fehér. A fehér rész 3 negyed.'
  },
  {
    id: 'pf-q5',
    level: 1,
    questionTypeBadge: 'Gyöngyök',
    figure: <QBeads beads="ryr" />,
    question: 'A gyöngyök hányad része piros?',
    options: ['2 harmad', '1 harmad', '2 ketted', '3 harmad'],
    correctAnswer: 0,
    explanation: '3 gyöngy van, ez az egész. Ebből 2 piros: a gyöngyök 2 harmada piros.'
  },
  {
    id: 'pf-q6',
    level: 1,
    questionTypeBadge: 'Csokoládé',
    figure: <QChoco rows={2} cols={5} filled={7} />,
    question: 'A csokoládé 10 egyforma kockából áll. Hányad része sötét?',
    options: ['7 tized', '3 tized', '7 ötöd', '10 heted'],
    correctAnswer: 0,
    explanation: '10 egyenlő kocka van, ebből 7 sötét. 10 rész közül 7: ez 7 tized.'
  },
  {
    id: 'pf-q7',
    level: 1,
    questionTypeBadge: 'Melyik ábra?',
    figure: <QWhich23 />,
    question: 'Melyik körnek színeztük ki a 2 harmadát?',
    options: ['C', 'A', 'B', 'D'],
    correctAnswer: 0,
    explanation: 'A C kört 3 egyenlő részre osztottuk, és 2 rész színes: ez 2 harmad. Az A-n csak 1 harmad, a B-n a fele, a D-n 2 negyed színes.'
  },
  {
    id: 'pf-q8',
    level: 1,
    questionTypeBadge: 'Pizza',
    figure: <QPizza parts={6} filled={5} />,
    question: 'Hányad részét színeztük ki a pizzának?',
    options: ['5 hatod', '1 hatod', '5 ötöd', '6 ötöd'],
    correctAnswer: 0,
    explanation: '6 egyenlő szelet van, ebből 5 színes. Ez 5 hatod.'
  },
  {
    id: 'pf-q9',
    level: 1,
    questionTypeBadge: 'Zászló',
    figure: <QFlag country="Franciaország" note="kék + fehér = ?" />,
    question: 'A francia zászló kék és fehér része együtt hányad része a zászlónak?',
    options: ['2 harmad', '1 harmad', '2 ketted', '3 harmad'],
    correctAnswer: 0,
    explanation: 'A zászló 3 egyforma csíkból áll. A kék és a fehér 2 csík: ez 2 harmad.'
  },
  {
    id: 'pf-q10',
    level: 1,
    questionTypeBadge: 'Gyöngyök',
    figure: <QBeads beads="rryr" />,
    question: 'A gyöngyök hányad része sárga?',
    options: ['1 negyed', '1 harmad', '3 negyed', '4 egész'],
    correctAnswer: 0,
    explanation: '4 gyöngy van, ebből 1 sárga. 4 rész közül 1: 1 negyed. (Nem 1 harmad, mert az összes gyöngyöt számoljuk!)'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'pf-q11',
    level: 2,
    questionTypeBadge: 'Rács',
    figure: <QGrid mode="col" />,
    question: 'Az ábra 1 egészet ér. Hányad része kék?',
    options: ['1 negyed', '1 harmad', '3 negyed', '1 tized'],
    correctAnswer: 0,
    explanation: 'Nézd az oszlopokat: 4 egyforma oszlop van, ebből 1 kék. A rács 1 negyede kék.'
  },
  {
    id: 'pf-q12',
    level: 2,
    questionTypeBadge: 'Rács',
    figure: <QGrid mode="row" />,
    question: 'Az ábra 1 egészet ér. Hányad része sárga?',
    options: ['2 harmad', '1 harmad', '2 negyed', '3 negyed'],
    correctAnswer: 0,
    explanation: 'Nézd a sorokat: 3 egyforma sor van, ebből 1 kék és 2 sárga. A rács 2 harmada sárga.'
  },
  {
    id: 'pf-q13',
    level: 2,
    questionTypeBadge: 'Poharak',
    figure: <QCups />,
    question: '12 pohárból 4 piros. A poharak hányad része piros?',
    options: ['1 harmad', '1 negyed', '2 harmad', '4 harmad'],
    correctAnswer: 0,
    explanation: 'Rakjuk a 12 poharat 4-esével csoportokba: 3 csoport lesz, ebből 1 piros. A poharak 1 harmada piros.'
  },
  {
    id: 'pf-q14',
    level: 2,
    questionTypeBadge: 'Egynél kisebb',
    question: 'Melyik tört kisebb 1 egésznél?',
    options: ['5 hatod', '6 hatod', '4 negyed', '3 harmad'],
    correctAnswer: 0,
    explanation: 'Az 5 hatodnál 6 részből csak 5-öt veszünk, hiányzik 1 hatod az egészhez. A többi pont 1 egész.'
  },
  {
    id: 'pf-q15',
    level: 2,
    questionTypeBadge: 'Zászló',
    figure: <QFlag country="Ausztria" />,
    question: 'Az osztrák zászló hányad része piros?',
    options: ['2 harmad', '1 harmad', '2 ketted', '3 harmad'],
    correctAnswer: 0,
    explanation: '3 egyforma csík van: piros, fehér, piros. 2 csík piros: a zászló 2 harmada piros.'
  },
  {
    id: 'pf-q16',
    level: 2,
    questionTypeBadge: 'Zászló',
    figure: <QFlags list={['Ausztria', 'Németország', 'Monaco', 'Magyarország']} />,
    question: 'Karesz: „Abba az országba megyünk, amelynek zászlaja 1 harmad részben piros, és nincs benne zöld.” Hová utaznak?',
    options: ['Németország', 'Magyarország', 'Ausztria', 'Monaco'],
    correctAnswer: 0,
    explanation: 'A német zászló fekete, piros, sárga: 1 harmada piros, zöld nincs benne. A magyarban van zöld, az osztrák 2 harmada piros, a monacói fele piros.'
  },
  {
    id: 'pf-q17',
    level: 2,
    questionTypeBadge: 'Zászló',
    figure: <QFlag country="Magyarország" />,
    question: 'A magyar zászló hányad része NEM piros?',
    options: ['2 harmad', '1 harmad', '2 ketted', '1 ketted'],
    correctAnswer: 0,
    explanation: 'Piros, fehér, zöld: 3 egyforma csík. A fehér és a zöld nem piros: ez 2 harmad.'
  },
  {
    id: 'pf-q18',
    level: 2,
    questionTypeBadge: 'Céltábla',
    figure: <QTarget />,
    question: 'Janka 10-szer lőtt, 2 lövés ment a céltáblán kívülre. A lövések hányad részével ért el találatot?',
    options: ['8 tized', '2 tized', '8 ötöd', '10 nyolcad'],
    correctAnswer: 0,
    explanation: '10 lövés az egész. 10 − 2 = 8 lövés talált. Ez 8 tized.'
  },
  {
    id: 'pf-q19',
    level: 2,
    questionTypeBadge: 'Céltábla',
    figure: <QTarget />,
    question: 'Janka 10 lövéséből 3 a kék sávba ért. A lövések hányad része ez?',
    options: ['3 tized', '1 harmad', '7 tized', '3 ötöd'],
    correctAnswer: 0,
    explanation: 'Minden lövés 1 tized, mert 10 lövés van. 3 lövés: 3 tized.'
  },
  {
    id: 'pf-q20',
    level: 2,
    questionTypeBadge: 'Torta',
    question: 'A tortát 8 egyenlő szeletre vágták, és 3 szeletet megettek. Hányad része maradt a tortának?',
    options: ['5 nyolcad', '3 nyolcad', '5 harmad', '8 ötöd'],
    correctAnswer: 0,
    explanation: '8 szeletből 3-at megettek, maradt 8 − 3 = 5 szelet. A torta 5 nyolcada maradt.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'pf-q21',
    level: 3,
    questionTypeBadge: 'Kisegér',
    figure: <QCheese />,
    question: 'A kisegér az első nap megette a sajt felét, második nap a maradék felét, harmadik nap a megmaradt sajt felét. Hányad része maradt meg a sajtnak?',
    options: ['1 nyolcad', '1 hatod', '1 negyed', '1 harmad'],
    correctAnswer: 0,
    explanation: '1. nap után a fele maradt, 2. nap után a fele fele: 1 negyede, 3. nap után az 1 negyed fele: 1 nyolcada.'
  },
  {
    id: 'pf-q22',
    level: 3,
    questionTypeBadge: 'Kisegér',
    question: 'A kisegér két nap alatt megette a sajt felét, majd a maradék felét. Hányad részét ette meg összesen a sajtnak?',
    options: ['3 negyedét', '1 negyedét', '2 ketted részét', '1 harmadát'],
    correctAnswer: 0,
    explanation: 'Megmaradt a sajt 1 negyede. Megevett 4 negyedből 3 negyedet: a sajt 3 negyedét.'
  },
  {
    id: 'pf-q23',
    level: 3,
    questionTypeBadge: 'Parkoló',
    figure: <QParking />,
    question: 'A parkolóban 12 autó áll: 3 kék, 3 piros és 6 zöld. Melyik állítás igaz?',
    options: ['Az autók 1 kettede piros vagy kék.', 'Az autók 1 harmada zöld.', 'Az autók 1 harmada piros.', 'A kék autók száma kétszerese a zöldekének.'],
    correctAnswer: 0,
    explanation: 'Piros vagy kék: 3 + 3 = 6 autó, a 12 fele, vagyis 1 kettede. A zöld 6 autó a fele, a piros 3 autó csak 1 negyed, és a kék fele a zöldnek.'
  },
  {
    id: 'pf-q24',
    level: 3,
    questionTypeBadge: 'Parkoló',
    figure: <QParking />,
    question: 'A 12 autóból 3 kék. A parkolóban lévő autók hányad része kék?',
    options: ['1 negyede', '1 harmada', '3 ketted része', '1 hatoda'],
    correctAnswer: 0,
    explanation: 'A 12 autót 3-asával 4 egyforma csoportba rakhatjuk, ebből 1 csoport kék. Az autók 1 negyede kék.'
  },
  {
    id: 'pf-q25',
    level: 3,
    questionTypeBadge: 'Zászló',
    figure: <QFlags list={['Ausztria', 'Németország', 'Monaco', 'Magyarország']} />,
    question: 'Gergő: „Egy tóhoz utazunk. A zászló 1 harmad része piros, 1 harmad része fehér.” Hová utaznak?',
    options: ['Magyarország', 'Ausztria', 'Németország', 'Monaco'],
    correctAnswer: 0,
    explanation: 'A magyar zászló: piros, fehér, zöld – 1 harmad piros, 1 harmad fehér. A tó a Balaton. Az osztrák zászló 2 harmada piros.'
  },
  {
    id: 'pf-q26',
    level: 3,
    questionTypeBadge: 'Zászló',
    figure: <QFlags list={['Ausztria', 'Németország', 'Görögország', 'Monaco']} />,
    question: 'Melyik ország zászlaja a kakukktojás?',
    options: ['Görögország', 'Ausztria', 'Németország', 'Monaco'],
    correctAnswer: 0,
    explanation: 'A többi zászló 2 vagy 3 egyenlő csíkból áll (feleket vagy harmadokat látunk). A görög zászlón 9 csík és egy kereszt van.'
  },
  {
    id: 'pf-q27',
    level: 3,
    questionTypeBadge: 'Csokoládé',
    question: 'Zsófi a 10 kockás csokoládé 3 tizedét ette meg, az öccse 2 tizedét. Hányad része maradt a csokoládénak?',
    options: ['5 tized', '1 tized', '5 ötöd', '2 tized'],
    correctAnswer: 0,
    explanation: 'Megettek 3 + 2 = 5 kockát. Maradt 10 − 5 = 5 kocka: a csokoládé 5 tizede.'
  },
  {
    id: 'pf-q28',
    level: 3,
    questionTypeBadge: 'Színezés',
    figure: <QSquare9 />,
    question: 'A nagy négyzet 1 egészet ér. Hány kis négyzetet kell kiszínezned, hogy a harmada legyen színes?',
    options: ['3', '1', '9', '6'],
    correctAnswer: 0,
    explanation: '9 kis négyzet van. 3 egyforma csoportba osztva egy csoport 9 : 3 = 3 kis négyzet. Tehát 3-at kell színezni.'
  },
  {
    id: 'pf-q29',
    level: 3,
    questionTypeBadge: 'Színezés',
    question: '12 négyzet 1 negyedét sárgára, 2 negyedét zöldre színezzük. Hány négyzet marad fehér?',
    options: ['3', '6', '9', '0'],
    correctAnswer: 0,
    explanation: '1 negyed: 12 : 4 = 3 sárga. 2 negyed: 3 + 3 = 6 zöld. Fehér marad: 12 − 3 − 6 = 3 négyzet.'
  },
  {
    id: 'pf-q30',
    level: 3,
    questionTypeBadge: 'Gyöngyök',
    question: 'Lili 5 gyöngyöt fűzött fel, ebből 2 piros, a többi sárga. A gyöngyök hányad része sárga?',
    options: ['3 ötöd', '2 ötöd', '3 ketted', '2 harmad'],
    correctAnswer: 0,
    explanation: '5 gyöngy az egész. Sárga: 5 − 2 = 3 gyöngy. A gyöngyök 3 ötöde sárga. (A 3 ketted azért rossz, mert a sárgákat nem a pirosakhoz hasonlítjuk.)'
  }
];

export const ProperFractionsQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={4}
      chapterId="tortszamok"
      topicId="g4-frac-egynel-kisebb-quiz"
      subtopicId="egynel-kisebb-tortek"
      title="2. Egynél kisebb törtek – Kvíz"
      subtitle="30 feladat 3 szinten: 2 harmad, 3 negyed, színes és fehér rész, zászlók, gyöngyök, céltábla, kisegér."
      badge="4. OSZTÁLY • VIII. A TÖRTSZÁMOK • KVÍZ"
      questions={PROPER_FRACTIONS_QUESTIONS}
      cheatSheets={[
        {
          title: 'Leolvasás',
          items: ['1. Hány egyenlő rész van összesen? → negyed', '2. Hány részt színeztünk? → 3', 'Együtt: 3 negyed', 'Az összes részt számold, a fehéreket is!']
        },
        {
          title: 'Színes és fehér',
          items: ['3 negyed színes → 1 negyed fehér', '2 harmad színes → 1 harmad fehér', '7 tized színes → 3 tized fehér', 'Ha kevesebb rész színes, mint ahány van: egynél kisebb.']
        },
        {
          title: 'Csoportokba rakás',
          items: ['12 pohárból 4 piros: 3 csoport, 1 piros → 1 harmad', '12 autóból 3 kék: 4 csoport → 1 negyed', '10 lövés: minden lövés 1 tized', 'Fele fele: 1 negyed; 1 negyed fele: 1 nyolcad']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={<ProperFractionsMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />}
      sorterComponent={<ProperFractionsSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />}
    />
  );
};

export default ProperFractionsQuiz;

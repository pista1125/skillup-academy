import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { ImproperFractionsMatcher } from './ImproperFractionsMatcher';
import { ImproperFractionsSorter } from './ImproperFractionsSorter';
import { PizzaG, BarG, FONT } from '../tortresz-tortek-ertelmezese/FractionIntro4Figures';
import { CountryFlagG } from '../egynel-kisebb-tortek/ProperFractionsFigures';
import { FracLineG } from './ImproperFractionsFigures';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const C_UNK = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; h?: number; w?: number }> = ({ children, h = 150, w = 240 }) => (
  <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width={w - 2} height={h - 2} rx="10" fill="#f5f3ff" stroke="#c4b5fd" />
    {children}
  </svg>
);

const Ask: React.FC<{ x: number; y: number; text?: string }> = ({ x, y, text = '?' }) => (
  <text x={x} y={y} textAnchor="middle" fontSize="18" fontWeight="bold" fill={C_UNK}>
    {text}
  </text>
);

/** Több pizza egymás mellett, összesen k szelet színes. */
const QPizzas: React.FC<{ d: number; k: number; count?: number }> = ({ d, k, count = 2 }) => {
  const w = 30 + count * 100;
  return (
    <QFig w={Math.max(240, w + 30)} h={130}>
      {Array.from({ length: count }, (_, p) => (
        <PizzaG key={p} cx={60 + p * 100} cy={62} r={44} parts={d} filled={Math.max(0, Math.min(d, k - p * d))} color="#f97316" emptyColor="#f1f5f9" pizza />
      ))}
      <Ask x={Math.max(240, w + 30) - 22} y={68} />
    </QFig>
  );
};

const QBar: React.FC<{ parts: number; filled: number }> = ({ parts, filled }) => (
  <QFig h={100}>
    <BarG x={20} y={25} w={180} h={46} parts={parts} filled={filled} color="#a78bfa" />
    <Ask x={222} y={55} />
  </QFig>
);

const QHalves: React.FC = () => (
  <QFig h={110}>
    <BarG x={14} y={28} w={96} h={44} parts={2} filled={2} color="#ef4444" />
    <BarG x={124} y={28} w={96} h={44} parts={2} filled={1} color="#ef4444" />
    <text x={62} y={92} textAnchor="middle" fontSize="11" fill="#475569">1. alma</text>
    <text x={172} y={92} textAnchor="middle" fontSize="11" fill="#475569">2. alma</text>
    <Ask x={120} y={20} text="3 fél alma = ?" />
  </QFig>
);

const QLine: React.FC<{ d: number; ask: number }> = ({ d, ask }) => (
  <QFig h={90} w={260}>
    <FracLineG x={20} y={44} w={210} wholes={2} d={d} ask={ask} />
  </QFig>
);

const QTape: React.FC<{ meters?: number }> = ({ meters = 1 }) => (
  <QFig h={100}>
    <rect x={20} y={30} width={200} height={28} rx="3" fill="#fde047" stroke="#a16207" />
    {[1, 2, 3].map((i) => (
      <line key={i} x1={20 + i * 50} y1={24} x2={20 + i * 50} y2={64} stroke="#7c3aed" strokeWidth="2" strokeDasharray="4 3" />
    ))}
    <text x={20} y={80} textAnchor="middle" fontSize="11" fill="#0f172a">0</text>
    <text x={220} y={80} textAnchor="middle" fontSize="11" fill="#0f172a">{meters} m</text>
    <Ask x={120} y={92} text="4 negyed = ? cm" />
  </QFig>
);

const QTank: React.FC = () => (
  <QFig h={150}>
    <path d="M 50 20 L 58 130 L 132 130 L 140 20 Z" fill="#ffffff" stroke="#78350f" strokeWidth="2.5" />
    <rect x={56} y={130 - 110 * 0.6} width={78} height={110 * 0.6} fill="#38bdf8" opacity="0.8" />
    {Array.from({ length: 11 }, (_, i) => (
      <line key={i} x1={142} y1={130 - i * 11} x2={152} y2={130 - i * 11} stroke="#334155" strokeWidth={i % 5 === 0 ? 2 : 1} />
    ))}
    <text x={195} y={90} textAnchor="middle" fontSize="11" fill="#0369a1" fontWeight="bold">6 tized</text>
    <Ask x={195} y={44} />
  </QFig>
);

const QClock: React.FC<{ quarters: number }> = ({ quarters }) => (
  <QFig h={130}>
    {Array.from({ length: Math.ceil(quarters / 4) }, (_, c) => {
      const cx = 57 + c * 125;
      const k = Math.min(4, quarters - c * 4);
      return (
        <g key={c}>
          <PizzaG cx={cx} cy={62} r={44} parts={4} filled={k} color="#c4b5fd" emptyColor="#ffffff" />
          {[0, 3, 6, 9].map((h) => {
            const a = (h / 12) * 2 * Math.PI - Math.PI / 2;
            return (
              <text key={h} x={cx + 53 * Math.cos(a)} y={62 + 53 * Math.sin(a) + 3} textAnchor="middle" fontSize="9" fontWeight="bold" fill="#334155">
                {h === 0 ? 12 : h}
              </text>
            );
          })}
        </g>
      );
    })}
    <Ask x={120} y={124} text="? perc" />
  </QFig>
);

const QRecipe: React.FC = () => (
  <QFig h={110}>
    <rect x={20} y={30} width={100} height={36} fill="#d97706" stroke="#334155" />
    <rect x={120} y={30} width={50} height={36} fill="#fde68a" stroke="#334155" />
    <rect x={170} y={30} width={50} height={36} fill="#ffffff" stroke="#334155" />
    <text x={70} y={53} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#fff">keksz 50 dkg</text>
    <text x={145} y={46} textAnchor="middle" fontSize="9" fill="#78350f">margarin</text>
    <text x={145} y={59} textAnchor="middle" fontSize="9" fill="#78350f">25 dkg</text>
    <text x={195} y={46} textAnchor="middle" fontSize="9" fill="#334155">cukor</text>
    <text x={195} y={59} textAnchor="middle" fontSize="9" fill="#334155">25 dkg</text>
    <Ask x={120} y={94} />
  </QFig>
);

const QFlag: React.FC = () => (
  <QFig h={120}>
    <CountryFlagG x={45} y={18} w={130} h={80} country="Franciaország" />
    <text x={110} y={113} textAnchor="middle" fontSize="11" fill="#475569">kék + fehér + piros</text>
    <Ask x={205} y={64} />
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const IMPROPER_FRACTIONS_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'if-q1',
    level: 1,
    questionTypeBadge: 'Az 1 egész',
    question: 'Hány negyed van 1 egészben?',
    options: ['4', '1', '2', '10'],
    correctAnswer: 0,
    explanation: 'Ha az egészet 4 egyenlő részre osztjuk, 4 negyedet kapunk. 4 negyed = 1 egész.'
  },
  {
    id: 'if-q2',
    level: 1,
    questionTypeBadge: 'Az 1 egész',
    figure: <QPizzas d={3} k={3} count={1} />,
    question: 'Hányad részét színeztük ki a pizzának?',
    options: ['3 harmadát, vagyis az egészet', '1 harmadát', '2 harmadát', '3 egészét'],
    correctAnswer: 0,
    explanation: '3 egyenlő szelet van, és mind a 3 színes. 3 harmad = 1 egész pizza.'
  },
  {
    id: 'if-q3',
    level: 1,
    questionTypeBadge: 'Zászló',
    figure: <QFlag />,
    question: 'A francia zászló kék, fehér és piros része együtt hányad része a zászlónak?',
    options: ['3 harmad = 1 egész', '2 harmad', '1 harmad', '3 egész'],
    correctAnswer: 0,
    explanation: 'Manó szavaival: minden szín egy-egy harmad, az összesen három harmad, vagyis egy egész.'
  },
  {
    id: 'if-q4',
    level: 1,
    questionTypeBadge: 'Az 1 egész',
    question: 'Hány tized ad ki 1 egészet?',
    options: ['10 tized', '1 tized', '100 tized', '5 tized'],
    correctAnswer: 0,
    explanation: 'A tized azt jelenti, hogy 10 egyenlő részre osztottunk. Mind a 10 rész együtt az egész.'
  },
  {
    id: 'if-q5',
    level: 1,
    questionTypeBadge: 'Hiányzó rész',
    question: 'A pizza 2 harmadát megettük. Hányad része maradt a pizzának?',
    options: ['1 harmada', '2 harmada', '3 harmada', 'a fele'],
    correctAnswer: 0,
    explanation: 'Az egész pizza 3 harmad. 3 harmadból 2 harmadot megettünk, maradt 1 harmad.'
  },
  {
    id: 'if-q6',
    level: 1,
    questionTypeBadge: 'Az 1 egész',
    figure: <QBar parts={5} filled={5} />,
    question: 'A szalag mind az 5 egyenlő részét kiszíneztük. Mennyi ez?',
    options: ['5 ötöd = 1 egész', '5 egész', '1 ötöd', 'fél'],
    correctAnswer: 0,
    explanation: '5 egyenlő részből mind az 5 színes: 5 ötöd. Ez a teljes szalag, vagyis 1 egész.'
  },
  {
    id: 'if-q7',
    level: 1,
    questionTypeBadge: 'Az 1 egész',
    question: 'Melyik egyenlő 1 egésszel?',
    options: ['6 hatod', '5 hatod', '1 hatod', '6 egész'],
    correctAnswer: 0,
    explanation: 'Ha mind a 6 hatodot vesszük, megkapjuk az egészet. Az 5 hatodból még hiányzik 1 hatod.'
  },
  {
    id: 'if-q8',
    level: 1,
    questionTypeBadge: 'Egynél nagyobb',
    figure: <QPizzas d={4} k={5} />,
    question: 'Hány negyed pizza színes összesen?',
    options: ['5 negyed', '4 negyed', '1 negyed', '8 negyed'],
    correctAnswer: 0,
    explanation: 'Az első pizza 4 negyede és a második 1 negyede színes: 4 + 1 = 5 negyed. Ez 1 egész és 1 negyed.'
  },
  {
    id: 'if-q9',
    level: 1,
    questionTypeBadge: 'Mérőszalag',
    figure: <QTape />,
    question: 'Hány centiméter a méter 4 negyede?',
    options: ['100 cm', '25 cm', '4 cm', '40 cm'],
    correctAnswer: 0,
    explanation: 'A méter 4 negyede az egész méter: 1 m = 100 cm. (Egy negyede 25 cm, 4 negyede 4 · 25 = 100 cm.)'
  },
  {
    id: 'if-q10',
    level: 1,
    questionTypeBadge: 'Egynél nagyobb',
    question: 'Melyik tört nagyobb 1 egésznél?',
    options: ['5 negyed', '3 negyed', '4 negyed', '1 negyed'],
    correctAnswer: 0,
    explanation: '4 negyed pont 1 egész. Az 5 negyed ennél 1 negyeddel több, ezért nagyobb 1-nél.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'if-q11',
    level: 2,
    questionTypeBadge: 'Idő',
    figure: <QClock quarters={1} />,
    question: '1 óra = 4 negyed óra. Hány perc 1 negyed óra?',
    options: ['15 perc', '4 perc', '25 perc', '30 perc'],
    correctAnswer: 0,
    explanation: '1 óra 60 perc. 4 egyenlő részre osztva: 60 : 4 = 15 perc.'
  },
  {
    id: 'if-q12',
    level: 2,
    questionTypeBadge: 'Idő',
    figure: <QClock quarters={5} />,
    question: 'A pogácsa 1 és negyed óra alatt készült el. Hány perc ez?',
    options: ['75 perc', '65 perc', '125 perc', '15 perc'],
    correctAnswer: 0,
    explanation: '1 óra = 60 perc, negyed óra = 15 perc. 60 + 15 = 75 perc.'
  },
  {
    id: 'if-q13',
    level: 2,
    questionTypeBadge: 'Egynél nagyobb',
    figure: <QHalves />,
    question: 'Hány alma 3 fél alma?',
    options: ['1 és fél alma', '3 alma', 'fél alma', '2 alma'],
    correctAnswer: 0,
    explanation: '2 fél alma = 1 egész alma. Marad még 1 fél. 3 fél = 1 és fél alma.'
  },
  {
    id: 'if-q14',
    level: 2,
    questionTypeBadge: 'Számegyenes',
    figure: <QLine d={4} ask={5} />,
    question: 'Egy egészet 4 egyenlő részre osztottunk. Melyik tört van a ? helyén?',
    options: ['5 negyed', '4 negyed', '5 ketted', '1 negyed'],
    correctAnswer: 0,
    explanation: 'Számold a lépéseket 0-tól: minden kis lépés 1 negyed. Az 1 után még 1 lépés: 4 + 1 = 5 negyed.'
  },
  {
    id: 'if-q15',
    level: 2,
    questionTypeBadge: 'Számegyenes',
    figure: <QLine d={2} ask={3} />,
    question: 'Egy egészet 2 egyenlő részre osztottunk. Melyik szám van a ? helyén?',
    options: ['3 ketted, vagyis 1 és fél', '3 egész', 'fél', '2 ketted'],
    correctAnswer: 0,
    explanation: '0-tól 3 fél lépés: fél, 1, 1 és fél. Ez 3 ketted = 1 és fél.'
  },
  {
    id: 'if-q16',
    level: 2,
    questionTypeBadge: 'Egészek és részek',
    question: 'A 7 harmad hány egész és hány harmad?',
    options: ['2 egész és 1 harmad', '1 egész és 1 harmad', '7 egész és 3 harmad', '3 egész és 1 harmad'],
    correctAnswer: 0,
    explanation: '3 harmad = 1 egész, 6 harmad = 2 egész. 7 harmadban 2 egész van, és marad 1 harmad.'
  },
  {
    id: 'if-q17',
    level: 2,
    questionTypeBadge: 'Hiányzó rész',
    figure: <QTank />,
    question: 'Fanniék dézsájának már a 6 tized része megtelt vízzel. Hányad részét kell még feltölteni?',
    options: ['4 tized részét', '6 tized részét', '4 hatod részét', '1 tized részét'],
    correctAnswer: 0,
    explanation: 'A tele dézsa 10 tized. 10 tized − 6 tized = 4 tized még hiányzik.'
  },
  {
    id: 'if-q18',
    level: 2,
    questionTypeBadge: 'Pénz',
    question: 'A hegyező 300 Ft-nak az 5 ötödébe kerül. Mennyibe kerül a hegyező?',
    options: ['300 Ft', '60 Ft', '5 Ft', '1500 Ft'],
    correctAnswer: 0,
    explanation: 'Az 5 ötöd az egész. 300 Ft 5 ötöde tehát maga a 300 Ft. (300 : 5 · 5 = 300)'
  },
  {
    id: 'if-q19',
    level: 2,
    questionTypeBadge: 'Egészek és részek',
    question: 'Hány negyed 2 egész?',
    options: ['8 negyed', '2 negyed', '4 negyed', '6 negyed'],
    correctAnswer: 0,
    explanation: '1 egész = 4 negyed, 2 egész = 4 + 4 = 8 negyed.'
  },
  {
    id: 'if-q20',
    level: 2,
    questionTypeBadge: 'Pizza',
    figure: <QPizzas d={6} k={9} />,
    question: 'Anya 2 pizzát sütött, mindkettőt 6 egyenlő szeletre vágta. A gyerekek 9 szeletet ettek meg. Hány hatod pizzát ettek meg?',
    options: ['9 hatod', '3 hatod', '6 kilenced', '1 hatod'],
    correctAnswer: 0,
    explanation: 'Minden szelet 1 hatod pizza. 9 szelet = 9 hatod = 1 egész és 3 hatod pizza.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'if-q21',
    level: 3,
    questionTypeBadge: 'Recept',
    figure: <QRecipe />,
    question: 'Máté anyukája 50 dkg kekszet, 25 dkg margarint és 25 dkg cukrot tett a tálba. Az összetevők hányad része keksz?',
    options: ['a fele', 'az 1 harmada', 'az 1 negyede', 'a 2 harmada'],
    correctAnswer: 0,
    explanation: 'Összesen 50 + 25 + 25 = 100 dkg. A keksz 50 dkg, ez a 100 dkg fele.'
  },
  {
    id: 'if-q22',
    level: 3,
    questionTypeBadge: 'Recept',
    figure: <QRecipe />,
    question: 'Ugyanebben a tálban (100 dkg) az összetevők hányad része margarin?',
    options: ['az 1 negyede', 'az 1 harmada', 'a fele', 'az 1 ötöde'],
    correctAnswer: 0,
    explanation: 'A 100 dkg-ot 25 dkg-os részekre osztva 4 egyforma rész lesz. A margarin 1 ilyen rész: 1 negyed.'
  },
  {
    id: 'if-q23',
    level: 3,
    questionTypeBadge: 'Szörp',
    question: 'A szörp 1 harmada málna, a maradék fele eper, a többi szeder. A szörp hányad része szeder?',
    options: ['1 harmada', 'a fele', '2 harmada', '1 hatoda'],
    correctAnswer: 0,
    explanation: 'Málna 1 harmad, a maradék 2 harmad. Ennek a fele 1 harmad eper, a többi 1 harmad szeder. 3 harmad = 1 egész.'
  },
  {
    id: 'if-q24',
    level: 3,
    questionTypeBadge: 'Az 1 egész',
    question: 'Melyik állítás igaz a 10 tizedre?',
    options: ['Pontosan 1 egész.', 'Egynél kisebb.', 'Egynél nagyobb.', '10 egész.'],
    correctAnswer: 0,
    explanation: 'Az egészet 10 egyenlő részre osztottuk, és mind a 10 részt vettük: ez pontosan 1 egész.'
  },
  {
    id: 'if-q25',
    level: 3,
    questionTypeBadge: 'Pizza',
    question: 'A pizzákat 4 egyenlő szeletre vágták. Manó 1 és fél pizzát evett. Hány szeletet evett?',
    options: ['6', '5', '3', '4'],
    correctAnswer: 0,
    explanation: '1 egész pizza = 4 szelet, fél pizza = 2 szelet. 4 + 2 = 6 szelet, vagyis 6 negyed.'
  },
  {
    id: 'if-q26',
    level: 3,
    questionTypeBadge: 'Számegyenes',
    figure: <QLine d={4} ask={8} />,
    question: 'Egy egészet 4 egyenlő részre osztottunk. Hány negyedet kell lépni 0-tól a ? helyéig?',
    options: ['8', '2', '4', '6'],
    correctAnswer: 0,
    explanation: 'A ? a 2-nél van. 0-tól 1-ig 4 negyed, 1-től 2-ig még 4 negyed: 8 negyed = 2 egész.'
  },
  {
    id: 'if-q27',
    level: 3,
    questionTypeBadge: 'Idő',
    question: 'Az egyik kirándulás 1 és negyed óráig, a másik 3 negyed óráig tartott. Hány perccel tartott tovább az első?',
    options: ['30 perccel', '50 perccel', '1 órával', '15 perccel'],
    correctAnswer: 0,
    explanation: '1 és negyed óra = 75 perc, 3 negyed óra = 45 perc. 75 − 45 = 30 perc.'
  },
  {
    id: 'if-q28',
    level: 3,
    questionTypeBadge: 'Mérőszalag',
    figure: <QTape meters={2} />,
    question: 'Az ugróverseny pályája 2 méter hosszú. Hány centiméter a pálya 4 negyede?',
    options: ['200 cm', '100 cm', '50 cm', '400 cm'],
    correctAnswer: 0,
    explanation: 'A 4 negyed mindig az egész. Itt az egész 2 m = 200 cm, ezért a 4 negyede is 200 cm.'
  },
  {
    id: 'if-q29',
    level: 3,
    questionTypeBadge: 'Kakukktojás',
    question: 'Melyik a kakukktojás?',
    options: ['5 hatod', '4 negyed', '3 harmad', '5 ötöd'],
    correctAnswer: 0,
    explanation: 'A 4 negyed, a 3 harmad és az 5 ötöd mind pontosan 1 egész. Az 5 hatodból hiányzik 1 hatod, ez egynél kisebb.'
  },
  {
    id: 'if-q30',
    level: 3,
    questionTypeBadge: 'Egynél nagyobb',
    question: 'Bence a nap folyamán 7 negyed liter limonádét ivott. Melyik igaz?',
    options: ['1 liter és 3 negyed liter, kevesebb 2 liternél', '2 liter és 3 negyed liter, több 2 liternél', 'Pontosan 7 liter', 'Pontosan 2 liter'],
    correctAnswer: 0,
    explanation: '4 negyed liter = 1 liter, marad 3 negyed liter. 7 negyed = 1 liter és 3 negyed liter. 2 literhez 8 negyed kellene.'
  }
];

export const ImproperFractionsQuiz: React.FC<{
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
      topicId="g4-frac-egynel-nagyobb-quiz"
      subtopicId="egynel-nagyobb-tortek"
      title="3. Az 1 egész és az egynél nagyobb törtek – Kvíz"
      subtitle="30 feladat 3 szinten: 4 negyed = 1 egész, hiányzó rész, 5 negyed, 1 és negyed óra, számegyenes."
      badge="4. OSZTÁLY • VIII. A TÖRTSZÁMOK • KVÍZ"
      questions={IMPROPER_FRACTIONS_QUESTIONS}
      cheatSheets={[
        {
          title: 'Az 1 egész',
          items: ['2 ketted = 3 harmad = 4 negyed = 1 egész', '5 ötöd = 6 hatod = 10 tized = 1 egész', 'Minden részt veszünk: megvan az egész.', 'A méter 4 negyede = 100 cm']
        },
        {
          title: 'Mennyi hiányzik?',
          items: ['2 harmad + 1 harmad = 1 egész', '3 negyed + 1 negyed = 1 egész', '6 tized + 4 tized = 1 egész', 'fele + 1 negyed + 1 negyed = 1 egész']
        },
        {
          title: 'Egynél nagyobb',
          items: ['5 negyed = 1 egész és 1 negyed', '3 ketted = 1 és fél', '7 harmad = 2 egész és 1 harmad', '1 és negyed óra = 60 + 15 = 75 perc']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={<ImproperFractionsMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />}
      sorterComponent={<ImproperFractionsSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />}
    />
  );
};

export default ImproperFractionsQuiz;

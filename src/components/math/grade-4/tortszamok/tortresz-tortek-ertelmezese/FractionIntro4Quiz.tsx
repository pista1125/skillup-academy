import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { FractionIntro4Matcher } from './FractionIntro4Matcher';
import { FractionIntro4Sorter } from './FractionIntro4Sorter';
import { PizzaG, BarG, ChocoG, RodG, BonbonG, ROD_COLORS, FONT } from './FractionIntro4Figures';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const C_UNK = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; h?: number; w?: number }> = ({ children, h = 150, w = 240 }) => (
  <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width={w - 2} height={h - 2} rx="10" fill="#fffbeb" stroke="#fcd34d" />
    {children}
  </svg>
);

const Ask: React.FC<{ x: number; y: number; text?: string }> = ({ x, y, text = '?' }) => (
  <text x={x} y={y} textAnchor="middle" fontSize="18" fontWeight="bold" fill={C_UNK}>
    {text}
  </text>
);

const QPizza: React.FC<{ parts: number; filled?: number; ask?: string }> = ({ parts, filled = 1, ask = '?' }) => (
  <QFig>
    <PizzaG cx={95} cy={75} r={60} parts={parts} filled={filled} color="#f97316" emptyColor="#fde68a" pizza />
    <Ask x={200} y={82} text={ask} />
  </QFig>
);

const QBar: React.FC<{ parts: number; filled: number[]; dir?: 'v' | 'h'; color?: string }> = ({ parts, filled, dir = 'v', color = '#22c55e' }) => (
  <QFig>
    <BarG x={40} y={20} w={120} h={110} parts={parts} filled={filled} dir={dir} color={color} />
    <Ask x={200} y={82} />
  </QFig>
);

const QChoco: React.FC<{ rows: number; cols: number }> = ({ rows, cols }) => (
  <QFig>
    <ChocoG x={30} y={30} rows={rows} cols={cols} cell={26} filled={1} />
    <text x={30} y={22} fontSize="11" fill="#475569">1 kocka színes</text>
    <Ask x={210} y={82} />
  </QFig>
);

/** Négy alakzat A–D betűvel; csak a `good` betűjű egyenlő részekre osztott. */
const QWhichEqual: React.FC<{ parts: 3 | 4; good: 'A' | 'B' | 'C' | 'D' }> = ({ parts, good }) => {
  const letters: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];
  const bad3 = [
    [0, 20, 70, 100],
    [0, 45, 70, 100],
    [0, 15, 40, 100]
  ];
  const bad4 = [
    [0, 15, 45, 80, 100],
    [0, 30, 50, 60, 100],
    [0, 10, 40, 70, 100]
  ];
  let bi = 0;
  return (
    <QFig h={130} w={260}>
      {letters.map((L, i) => {
        const x = 12 + i * 62;
        const cuts = L === good ? Array.from({ length: parts + 1 }, (_, k) => (k * 100) / parts) : (parts === 3 ? bad3 : bad4)[bi++ % 3];
        return (
          <g key={L}>
            <text x={x + 25} y={22} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">
              {L}
            </text>
            {cuts.slice(0, -1).map((c, k) => (
              <rect key={k} x={x} y={30 + (c * 80) / 100} width={50} height={((cuts[k + 1] - c) * 80) / 100} fill={k === 0 ? '#38bdf8' : '#ffffff'} stroke="#334155" strokeWidth="1.4" />
            ))}
          </g>
        );
      })}
      <text x={130} y={124} textAnchor="middle" fontSize="11" fill="#475569">Melyik kék rész igazi {parts === 3 ? '1 harmad' : '1 negyed'}?</text>
    </QFig>
  );
};

const QNapkin: React.FC<{ folds: 1 | 2 }> = ({ folds }) => (
  <QFig>
    <rect x="20" y="30" width="80" height="80" fill="#dc2626" stroke="#7f1d1d" />
    <line x1="20" y1="110" x2="100" y2="30" stroke="#fff" strokeWidth="2" strokeDasharray="5 4" />
    <text x="112" y="76" fontSize="18" fill="#334155">→</text>
    {folds === 1 ? (
      <polygon points="140,110 220,110 220,30" fill="#dc2626" stroke="#7f1d1d" />
    ) : (
      <polygon points="150,110 190,110 190,70" fill="#dc2626" stroke="#7f1d1d" />
    )}
    <text x="120" y="135" textAnchor="middle" fontSize="11" fill="#475569">
      {folds === 1 ? 'egyszer félbehajtva' : 'kétszer félbehajtva'}
    </text>
    <Ask x={205} y={60} />
  </QFig>
);

const QRods: React.FC<{ top: keyof typeof ROD_COLORS; under: keyof typeof ROD_COLORS; count: number }> = ({ top, under, count }) => {
  const unit = 16;
  const t = ROD_COLORS[top];
  const u = ROD_COLORS[under];
  return (
    <QFig w={240} h={110}>
      <RodG x={20} y={20} len={t.len} unit={unit} h={24} fill={t.fill} side={t.side} />
      <text x={20 + (t.len * unit) / 2} y={37} textAnchor="middle" fontSize="11" fontWeight="bold" fill={top === 'bordó' ? '#fff' : '#0f172a'}>
        {top}
      </text>
      {Array.from({ length: count }, (_, i) => (
        <RodG key={i} x={20 + i * u.len * unit} y={52} len={u.len} unit={unit} h={24} fill={u.fill} side={u.side} />
      ))}
      <text x={120} y={100} textAnchor="middle" fontSize="11" fill="#475569">
        alul: {under} rudak
      </text>
    </QFig>
  );
};

const QRodSet: React.FC = () => {
  const unit = 16;
  const g = ROD_COLORS.zöld;
  const rods: (keyof typeof ROD_COLORS)[] = ['lila', 'piros', 'világoskék', 'rózsaszín'];
  return (
    <QFig w={240} h={150}>
      <RodG x={20} y={16} len={12} unit={unit} h={20} fill={g.fill} side={g.side} label="zöld = 1 egész" />
      {rods.map((r, i) => (
        <g key={r}>
          <RodG x={20} y={48 + i * 24} len={ROD_COLORS[r].len} unit={unit} h={18} fill={ROD_COLORS[r].fill} side={ROD_COLORS[r].side} />
          <text x={30 + ROD_COLORS[r].len * unit} y={61 + i * 24} fontSize="11" fill="#0f172a">
            {r}
          </text>
        </g>
      ))}
    </QFig>
  );
};

const QBonbons: React.FC<{ n: number; note: string }> = ({ n, note }) => (
  <QFig h={120}>
    {Array.from({ length: n }, (_, i) => (
      <BonbonG key={i} x={30 + (i % 6) * 36} y={30 + Math.floor(i / 6) * 32} />
    ))}
    <text x={120} y={108} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#92400e">
      {note}
    </text>
  </QFig>
);

const QFlag: React.FC<{ kind: 'pl' | 'fr' }> = ({ kind }) => (
  <QFig h={130}>
    {kind === 'pl' ? (
      <BarG x={40} y={20} w={130} h={86} parts={2} dir="h" filled={[1]} color="#dc2626" />
    ) : (
      <g>
        <rect x="40" y="20" width="43.3" height="86" fill="#1d4ed8" />
        <rect x="83.3" y="20" width="43.3" height="86" fill="#ffffff" />
        <rect x="126.7" y="20" width="43.3" height="86" fill="#dc2626" />
        <rect x="40" y="20" width="130" height="86" fill="none" stroke="#334155" strokeWidth="2" />
      </g>
    )}
    <Ask x={205} y={70} />
    <text x={105} y={122} textAnchor="middle" fontSize="11" fill="#475569">
      {kind === 'pl' ? 'lengyel zászló' : 'francia zászló'}
    </text>
  </QFig>
);

const QCuts: React.FC = () => (
  <QFig>
    <circle cx={95} cy={75} r={60} fill="#fde68a" stroke="#9a3412" strokeWidth="2.2" />
    <line x1={95} y1={15} x2={95} y2={135} stroke="#9a3412" strokeWidth="2" />
    <line x1={35} y1={75} x2={155} y2={75} stroke="#9a3412" strokeWidth="2" />
    <text x={200} y={60} textAnchor="middle" fontSize="11" fill="#475569">2 vágás:</text>
    <text x={200} y={76} textAnchor="middle" fontSize="11" fill="#475569">4 szelet</text>
    <text x={200} y={100} textAnchor="middle" fontSize="12" fontWeight="bold" fill={C_UNK}>8 szelet: ?</text>
  </QFig>
);

const QUneven: React.FC = () => (
  <QFig>
    <circle cx={95} cy={75} r={60} fill="#fde68a" stroke="#9a3412" strokeWidth="2.2" />
    <path d="M 95 75 L 95 15 A 60 60 0 0 1 152 93.5 Z" fill="#f97316" stroke="#9a3412" strokeWidth="1.6" />
    <line x1={95} y1={75} x2={52} y2={117} stroke="#9a3412" strokeWidth="1.6" />
    <line x1={95} y1={75} x2={43} y2={45} stroke="#9a3412" strokeWidth="1.6" />
    <Ask x={200} y={82} />
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const FRACTION_INTRO4_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'fi4-q1',
    level: 1,
    questionTypeBadge: 'Egyenlő részek',
    figure: <QPizza parts={4} />,
    question: 'Hány egyenlő részre vágtuk a pizzát?',
    options: ['4', '3', '1', '5'],
    correctAnswer: 0,
    explanation: 'Számold meg a szeleteket: 4 egyforma szelet van. A pizzát 4 egyenlő részre vágtuk.'
  },
  {
    id: 'fi4-q2',
    level: 1,
    questionTypeBadge: 'Törtrész neve',
    figure: <QPizza parts={3} />,
    question: 'Hányad részét színeztük ki a pizzának?',
    options: ['1 harmad', '1 negyed', '1 ketted', '1 hatod'],
    correctAnswer: 0,
    explanation: 'A pizzát 3 egyenlő részre vágtuk, és 1 szelet színes. 3 egyenlő rész közül 1: ez 1 harmad.'
  },
  {
    id: 'fi4-q3',
    level: 1,
    questionTypeBadge: 'Téglalap',
    figure: <QBar parts={2} filled={[0]} />,
    question: 'A téglalap 1 egészet ér. Hányad része zöld?',
    options: ['fele (1 ketted)', '1 harmad', '1 negyed', '2 egész'],
    correctAnswer: 0,
    explanation: 'A téglalapot 2 egyenlő részre osztottuk, ebből 1 zöld. Ez a téglalap fele, vagyis 1 ketted.'
  },
  {
    id: 'fi4-q4',
    level: 1,
    questionTypeBadge: 'Törtrész neve',
    question: 'Egy almát 2 egyenlő részre vágunk. Hogy hívjuk az egyik részét?',
    options: ['az alma fele', 'az alma harmada', 'az alma negyede', 'az alma kétszerese'],
    correctAnswer: 0,
    explanation: '2 egyenlő rész közül 1 rész: ez a fél, más néven 1 ketted. Ezért az alma felét kapjuk.'
  },
  {
    id: 'fi4-q5',
    level: 1,
    questionTypeBadge: 'Csokoládé',
    figure: <QChoco rows={2} cols={3} />,
    question: 'A csokoládét 6 egyenlő kockára törtük. Hányad része a csokoládénak 1 kocka?',
    options: ['1 hatod', '1 ötöd', '1 heted', '1 negyed'],
    correctAnswer: 0,
    explanation: 'Számold meg a kockákat: 2 sorban 3-3, összesen 6 kocka. 6 egyenlő rész közül 1: ez 1 hatod.'
  },
  {
    id: 'fi4-q6',
    level: 1,
    questionTypeBadge: 'Egyenlő részek',
    figure: <QWhichEqual parts={4} good="C" />,
    question: 'Melyik téglalapot osztottuk 4 egyenlő részre?',
    options: ['C', 'A', 'B', 'D'],
    correctAnswer: 0,
    explanation: 'Csak a C téglalap 4 csíkja egyforma magas. A többinél a csíkok különbözők, ezért azok nem negyedek.'
  },
  {
    id: 'fi4-q7',
    level: 1,
    questionTypeBadge: 'Mit jelent?',
    question: 'Mit jelent az, hogy a torta 1 nyolcadát kaptad?',
    options: [
      'A tortát 8 egyenlő részre vágták, és ebből 1 részt kaptál.',
      'A tortát 1 részre vágták, és 8-at kaptál belőle.',
      'A tortát 8 akármilyen részre vágták, és 1 részt kaptál.',
      'A tortából 8 szeletet kaptál.'
    ],
    correctAnswer: 0,
    explanation: 'Az „1 nyolcad” azt mondja meg: az egészet 8 EGYENLŐ részre osztottuk, és 1 részt vettünk belőle.'
  },
  {
    id: 'fi4-q8',
    level: 1,
    questionTypeBadge: 'Hajtogatás',
    figure: <QNapkin folds={1} />,
    question: 'Manó a négyzet alakú szalvétát egyszer félbehajtotta. Hányad részét látod a szalvétának?',
    options: ['a felét', 'a negyedét', 'a harmadát', 'az egészét'],
    correctAnswer: 0,
    explanation: 'Egy félbehajtással 2 egyenlő rész lesz. Az egyiket látjuk: ez a szalvéta fele.'
  },
  {
    id: 'fi4-q9',
    level: 1,
    questionTypeBadge: 'Téglalap',
    figure: <QBar parts={4} filled={[0]} color="#f97316" />,
    question: 'A téglalap 1 egészet ér. Hányad részét színeztük ki?',
    options: ['1 negyed', '1 harmad', '1 ötöd', '4 egész'],
    correctAnswer: 0,
    explanation: '4 egyenlő csík van, ebből 1 színes. 4 egyenlő rész közül 1: ez 1 negyed.'
  },
  {
    id: 'fi4-q10',
    level: 1,
    questionTypeBadge: 'Zászló',
    figure: <QFlag kind="pl" />,
    question: 'A lengyel zászló hányad része piros?',
    options: ['1 ketted (fele)', '1 harmad', '1 negyed', '2 ketted'],
    correctAnswer: 0,
    explanation: 'A zászló 2 egyenlő csíkból áll: fehérből és pirosból. 2 rész közül 1 piros, ez 1 ketted, vagyis a fele.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'fi4-q11',
    level: 2,
    questionTypeBadge: 'Pizza',
    figure: <QPizza parts={8} />,
    question: 'Hányad részét színeztük ki a pizzának?',
    options: ['1 nyolcad', '1 hatod', '1 heted', '1 negyed'],
    correctAnswer: 0,
    explanation: 'Számold meg pontosan a szeleteket: 8 egyforma szelet van, 1 színes. Ez 1 nyolcad.'
  },
  {
    id: 'fi4-q12',
    level: 2,
    questionTypeBadge: 'Hajtogatás',
    figure: <QNapkin folds={2} />,
    question: 'Manó a szalvétát kétszer hajtotta félbe. Hányad részét látod a szalvétának?',
    options: ['a negyedét', 'a felét', 'a harmadát', 'a hatodát'],
    correctAnswer: 0,
    explanation: 'Az első hajtás 2 egyenlő részt ad, a második mindkettőt újra kettéosztja: 4 egyenlő rész. Egyet látunk: a negyedét.'
  },
  {
    id: 'fi4-q13',
    level: 2,
    questionTypeBadge: 'Színes rudak',
    figure: <QRods top="bordó" under="rózsaszín" count={4} />,
    question: 'Hányad része a bordó rúd hosszúságának 1 rózsaszín rúd hosszúsága?',
    options: ['1 negyed', '1 ketted', '1 harmad', '1 ötöd'],
    correctAnswer: 0,
    explanation: 'A bordó rúd alá pontosan 4 rózsaszín rúd fér. 4 egyenlő rész közül 1: a rózsaszín rúd a bordó 1 negyede.'
  },
  {
    id: 'fi4-q14',
    level: 2,
    questionTypeBadge: 'Színes rudak',
    figure: <QRods top="zöld" under="lila" count={2} />,
    question: 'A zöld rúd 1 egészet ér. Hányad része a zöld rúdnak a lila rúd?',
    options: ['1 ketted (fele)', '1 negyed', '1 harmad', '2 egész'],
    correctAnswer: 0,
    explanation: '2 lila rúd pontosan kiadja a zöld rudat. 2 egyenlő rész közül 1: a lila rúd a zöld fele.'
  },
  {
    id: 'fi4-q15',
    level: 2,
    questionTypeBadge: 'Színes rudak',
    question: 'A rózsaszín rúd a zöld rúd 1 hatoda. Hány rózsaszín rúd adja ki pontosan a zöld rudat?',
    options: ['6', '3', '2', '12'],
    correctAnswer: 0,
    explanation: 'Az 1 hatod azt jelenti, hogy a zöld rudat 6 egyenlő részre osztjuk. Tehát 6 rózsaszín rúd adja ki.'
  },
  {
    id: 'fi4-q16',
    level: 2,
    questionTypeBadge: 'Igazságos osztozkodás',
    figure: <QBonbons n={12} note="12 bonbon, ketten osztoznak" />,
    question: 'Manó 12 bonbonján ketten osztoznak igazságosan. Hány darab jut egy gyereknek?',
    options: ['6', '2', '10', '24'],
    correctAnswer: 0,
    explanation: 'Ketten osztoznak, mindenki a bonbonok felét kapja: 12 : 2 = 6 darab.'
  },
  {
    id: 'fi4-q17',
    level: 2,
    questionTypeBadge: 'Igazságos osztozkodás',
    figure: <QBonbons n={12} note="12 bonbon, négyen osztoznak" />,
    question: 'Négyen osztoznak igazságosan a 12 bonbonon. Hányad része jut egy gyereknek?',
    options: ['1 negyed', '1 harmad', '1 tizenketted', '1 ketted'],
    correctAnswer: 0,
    explanation: 'Négy egyenlő részre osztjuk a bonbonokat (mindenkinek 3 darab jut). 4 egyenlő rész közül 1: ez 1 negyed.'
  },
  {
    id: 'fi4-q18',
    level: 2,
    questionTypeBadge: 'Egyenlő részek',
    figure: <QWhichEqual parts={3} good="B" />,
    question: 'Melyik téglalapon igazi 1 harmad a kék rész?',
    options: ['B', 'A', 'C', 'D'],
    correctAnswer: 0,
    explanation: 'Csak a B téglalap 3 csíkja egyforma. A többinél a kék csík túl kicsi vagy túl nagy, ezért nem harmad.'
  },
  {
    id: 'fi4-q19',
    level: 2,
    questionTypeBadge: 'Törtrész neve',
    question: 'Egy rész neve 1 tized. Hány egyenlő részre osztottuk az egészet?',
    options: ['10', '100', '1', '5'],
    correctAnswer: 0,
    explanation: 'A tized szó a tízből jön: az egészet 10 egyenlő részre osztottuk, és 1 rész az 1 tized.'
  },
  {
    id: 'fi4-q20',
    level: 2,
    questionTypeBadge: 'Zászló',
    figure: <QFlag kind="fr" />,
    question: 'A francia zászló 3 egyforma csíkból áll. Hányad része kék?',
    options: ['1 harmad', '1 ketted', '1 negyed', '3 egész'],
    correctAnswer: 0,
    explanation: 'Kék, fehér, piros: 3 egyenlő rész. Mindegyik szín 1 harmad, így a kék is 1 harmad.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'fi4-q21',
    level: 3,
    questionTypeBadge: 'Pizza',
    question: 'Hány egyenlő részre kell vágni a pizzát, hogy 8 gyerek egyformán ehessen belőle, és mindenki 1 szeletet kapjon?',
    options: ['8', '4', '16', '7'],
    correctAnswer: 0,
    explanation: '8 gyerek, mindenki 1 szeletet kap: 8 egyenlő szeletre kell vágni. Egy szelet a pizza 1 nyolcada.'
  },
  {
    id: 'fi4-q22',
    level: 3,
    questionTypeBadge: 'Vágások',
    figure: <QCuts />,
    question: 'Minden vágás átmegy a pizza közepén. 2 vágással 4 szelet lett. Hány vágás kell 8 egyenlő szelethez?',
    options: ['4', '8', '7', '6'],
    correctAnswer: 0,
    explanation: 'Egy vágás a közepén át 2 szeletet „csinál”. 8 szelethez 8 : 2 = 4 vágás kell.'
  },
  {
    id: 'fi4-q23',
    level: 3,
    questionTypeBadge: 'Igazságos osztozkodás',
    question: 'Hatan osztoznak igazságosan 12 bonbonon. Hány darab jut egy gyereknek, és ez a bonbonok hányad része?',
    options: ['2 darab, 1 hatoda', '6 darab, 1 hatoda', '2 darab, 1 ketted', '3 darab, 1 negyede'],
    correctAnswer: 0,
    explanation: '12 : 6 = 2 darab jut mindenkinek. 6 egyenlő részre osztottuk a bonbonokat, ezért ez 1 hatoda.'
  },
  {
    id: 'fi4-q24',
    level: 3,
    questionTypeBadge: 'Igazságos osztozkodás',
    question: 'Tizenketten osztoznak igazságosan 12 bonbonon. Hány darab jut egy gyereknek?',
    options: ['1', '12', '0', '2'],
    correctAnswer: 0,
    explanation: '12 : 12 = 1. Mindenki 1 bonbont kap, ez a bonbonok 1 tizenkettede.'
  },
  {
    id: 'fi4-q25',
    level: 3,
    questionTypeBadge: 'Színes rudak',
    figure: <QRodSet />,
    question: 'A zöld rúd 1 egészet ér. Melyik rúd hosszúsága a zöld rúd 1 harmada?',
    options: ['a piros rúdé', 'a lila rúdé', 'a világoskék rúdé', 'a rózsaszín rúdé'],
    correctAnswer: 0,
    explanation: '3 piros rúd pontosan kiadja a zöldet, ezért a piros az 1 harmad. A lila a fele, a világoskék 1 negyed, a rózsaszín 1 hatod.'
  },
  {
    id: 'fi4-q26',
    level: 3,
    questionTypeBadge: 'Színes rudak',
    question: 'A zöld rúd hosszát 4 egyforma világoskék rúddal raktuk ki. Hányad része a zöld rúdnak 1 világoskék rúd?',
    options: ['1 negyed', '4 egész', '1 harmad', '1 ötöd'],
    correctAnswer: 0,
    explanation: '4 egyforma rúd adja ki az egészet: 4 egyenlő rész. Egy világoskék rúd ezért 1 negyed.'
  },
  {
    id: 'fi4-q27',
    level: 3,
    questionTypeBadge: 'Hajtogatás',
    question: 'Manó a négyzet alakú szalvétát háromszor hajtotta félbe. Hányad részét látja a szalvétának?',
    options: ['1 nyolcadát', '1 hatodát', '1 harmadát', '1 negyedét'],
    correctAnswer: 0,
    explanation: 'Minden hajtás megduplázza a részek számát: 2, aztán 4, aztán 8 egyenlő rész. Egyet lát: 1 nyolcadát.'
  },
  {
    id: 'fi4-q28',
    level: 3,
    questionTypeBadge: 'Igazságos osztozkodás',
    figure: <QBonbons n={9} note="9 bonbon, hárman osztoznak" />,
    question: 'Kitti 9 bonbonján hárman osztoznak, mindenki a bonbonok 1 harmadát kapja. Hány bonbon jut egy gyereknek?',
    options: ['3', '6', '9', '27'],
    correctAnswer: 0,
    explanation: 'Az 1 harmad azt jelenti, hogy 3 egyenlő részre osztjuk: 9 : 3 = 3 bonbon jut mindenkinek.'
  },
  {
    id: 'fi4-q29',
    level: 3,
    questionTypeBadge: 'Torta',
    question: 'Anna a születésnapi torta 1 hatodát kapta. Hány ugyanekkora szelet van az egész tortában?',
    options: ['6', '1', '5', '12'],
    correctAnswer: 0,
    explanation: 'Az 1 hatod azt jelenti, hogy a tortát 6 egyenlő részre vágták. Az egész tortában 6 ugyanekkora szelet van.'
  },
  {
    id: 'fi4-q30',
    level: 3,
    questionTypeBadge: 'Vigyázz!',
    figure: <QUneven />,
    question: 'Ezt a pizzát 4 szeletre vágták. Melyik állítás igaz a színes szeletről?',
    options: [
      'Nem 1 negyed, mert a szeletek nem egyformák.',
      '1 negyed, mert 4 szelet van.',
      '1 harmad, mert 3 szelet fehér.',
      'Fele, mert ez a legnagyobb szelet.'
    ],
    correctAnswer: 0,
    explanation: 'Törtrészről csak egyenlő részeknél beszélhetünk. Itt a szeletek különbözők, ezért a színes szelet nem 1 negyed.'
  }
];

export const FractionIntro4Quiz: React.FC<{
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
      topicId="g4-frac-ertelmezes-quiz"
      subtopicId="tortresz-tortek-ertelmezese"
      title="1. A törtrész és a törtek értelmezése – Kvíz"
      subtitle="30 feladat 3 szinten: egyenlő részek, fél, harmad, negyed, szalvéta, színes rudak, igazságos osztozkodás."
      badge="4. OSZTÁLY • VIII. A TÖRTSZÁMOK • KVÍZ"
      questions={FRACTION_INTRO4_QUESTIONS}
      cheatSheets={[
        {
          title: 'Egyenlő részek',
          items: [
            'Az egészet EGYENLŐ részekre osztjuk.',
            'Ha a részek nem egyformák, nem törtrészek.',
            'Először számold meg, hány egyenlő rész van!'
          ]
        },
        {
          title: 'A részek nevei',
          items: ['2 rész: fél (1 ketted)', '3 rész: 1 harmad • 4 rész: 1 negyed', '5: ötöd • 6: hatod • 8: nyolcad • 10: tized', 'Minél több részre vágunk, annál kisebb egy rész.']
        },
        {
          title: 'Osztozkodás',
          items: ['12 bonbon fele: 12 : 2 = 6', '12 bonbon 1 harmada: 12 : 3 = 4', '12 bonbon 1 negyede: 12 : 4 = 3', 'Félbehajtás: 2, majd 4, majd 8 rész.']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={<FractionIntro4Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />}
      sorterComponent={<FractionIntro4Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />}
    />
  );
};

export default FractionIntro4Quiz;

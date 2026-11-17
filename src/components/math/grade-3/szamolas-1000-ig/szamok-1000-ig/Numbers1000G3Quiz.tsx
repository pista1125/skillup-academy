import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Numbers1000G3Matcher } from './Numbers1000G3Matcher';
import { Numbers1000G3Sorter } from './Numbers1000G3Sorter';
import { UNK, QCLS, QFig, Blocks, blocksWidth, blocksHeight, Coin, Note, NumLine, Mark, DigitCardRow, CARD_COLORS, RowFig } from './Numbers1000G3Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------

/** Százas lapok, tízesrudak, egyeskockák. */
const BlocksFig: React.FC<{ sz: number; t: number; e: number }> = ({ sz, t, e }) => {
  const s = 3.6;
  const w = blocksWidth(sz, t, e, s);
  const h = blocksHeight(sz, t, e, s);
  return (
    <QFig h={h + 40}>
      <Blocks x={(240 - w) / 2} y={10} sz={sz} t={t} e={e} s={s} />
      <text x="120" y={h + 30} textAnchor="middle" fontSize="10.5" fill="#475569">lap = 100, rúd = 10, kocka = 1</text>
    </QFig>
  );
};

/** Pénz: bankjegyek, aztán érmék egy sorban. */
const MoneyFig: React.FC<{ notes?: (500 | 1000)[]; coins: number[] }> = ({ notes = [], coins }) => {
  const nw = 60;
  const avail = 228 - notes.length * (nw + 6);
  const r = coins.length ? Math.min(17, (avail / coins.length - 4) / 2) : 17;
  const total = notes.length * (nw + 6) + coins.length * (2 * r + 4);
  let x = (240 - total) / 2;
  const parts: React.ReactNode[] = [];
  notes.forEach((v, i) => {
    parts.push(<Note key={`n${i}`} x={x} y={24} v={v} w={nw} />);
    x += nw + 6;
  });
  coins.forEach((v, i) => {
    parts.push(<Coin key={`c${i}`} cx={x + r} cy={39} v={v} r={r} />);
    x += 2 * r + 4;
  });
  return <QFig h={78}>{parts}</QFig>;
};

const LineFig: React.FC<{ lo: number; hi: number; tick: number; big: number; labels: number[]; marks: Mark[] }> = (p) => (
  <NumLine {...p} W={240} H={92} className={QCLS} />
);

/** Szám, egy jegye bekeretezve. */
const BoxedFig: React.FC<{ num: string; idx: number }> = ({ num, idx }) => {
  const W = 40;
  const x0 = 120 - (num.length * W) / 2;
  return (
    <QFig h={78}>
      {num.split('').map((d, i) => (
        <g key={i}>
          {i === idx && <rect x={x0 + i * W + 3} y="10" width={W - 6} height="58" rx="7" fill="#fef3c7" stroke="#d97706" strokeWidth="2.5" />}
          <text x={x0 + i * W + W / 2} y="55" textAnchor="middle" fontSize="40" fontWeight="bold" fill="#1e293b">{d}</text>
        </g>
      ))}
    </QFig>
  );
};

const CardsFig: React.FC<{ digits: string[] }> = ({ digits }) => {
  const s = 34;
  const w = digits.length * (s + 6) - 6;
  return (
    <QFig h={66}>
      <DigitCardRow x={(240 - w) / 2} y={11} digits={digits} s={s} colors={CARD_COLORS} />
    </QFig>
  );
};

/** Kupac: lap × a, rúd × b, kocka × c. */
const PileFig: React.FC<{ h: number; t: number; e: number }> = ({ h, t, e }) => {
  const items: [number, React.ReactNode, string][] = [
    [h, <rect x="0" y="-12" width="24" height="24" fill="#ef4444" stroke="#7f1d1d" strokeWidth="1.6" />, 'lap'],
    [t, <rect x="8" y="-14" width="8" height="28" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="1.6" />, 'rúd'],
    [e, <rect x="5" y="-7" width="14" height="14" fill="#facc15" stroke="#854d0e" strokeWidth="1.6" />, 'kocka']
  ];
  return (
    <QFig h={74}>
      {items.map(([n, icon, name], i) => (
        <g key={name} transform={`translate(${18 + i * 76} 36)`}>
          {icon}
          <text x="30" y="7" fontSize="17" fontWeight="bold" fill="#0f172a">× {n}</text>
          <text x="12" y="30" textAnchor="middle" fontSize="10" fill="#475569">{name}</text>
        </g>
      ))}
    </QFig>
  );
};

/** 1000 Ft = ? darab 100 Ft-os. */
const NoteToCoinsFig: React.FC = () => (
  <QFig h={78}>
    <Note x={22} y={20} v={1000} w={76} />
    <text x="116" y="47" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0f172a">=</text>
    <text x="152" y="49" textAnchor="middle" fontSize="22" fontWeight="bold" fill={UNK}>? ×</text>
    <Coin cx={198} cy={39} v={100} r={20} />
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const NUMBERS_1000_G3_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'n1000g3-q1',
    level: 1,
    questionTypeBadge: 'Kirakás',
    figure: <BlocksFig sz={7} t={3} e={2} />,
    question: 'Melyik szám van kirakva?',
    options: ['732', '723', '237', '327'],
    correctAnswer: 0,
    explanation: '7 lap = 700, 3 rúd = 30, 2 kocka = 2. 700 + 30 + 2 = 732.'
  },
  {
    id: 'n1000g3-q2',
    level: 1,
    questionTypeBadge: 'Számsor',
    figure: <RowFig items={['500', '600', '700', '?']} />,
    question: 'Számolj százasával! Melyik szám jön?',
    options: ['800', '710', '701', '900'],
    correctAnswer: 0,
    explanation: 'Százasával lépünk: 700 + 100 = 800.'
  },
  {
    id: 'n1000g3-q3',
    level: 1,
    questionTypeBadge: 'Számok betűvel',
    question: 'Írd le számjegyekkel: nyolcszáznegyvenhat!',
    options: ['846', '864', '8046', '486'],
    correctAnswer: 0,
    explanation: 'nyolcszáz = 800, negyven = 40, hat = 6. Együtt 846.'
  },
  {
    id: 'n1000g3-q4',
    level: 1,
    questionTypeBadge: 'Valódi érték',
    figure: <BoxedFig num="563" idx={1} />,
    question: 'Mennyit ér a bekeretezett számjegy?',
    options: ['60', '6', '600', '63'],
    correctAnswer: 0,
    explanation: 'A 6-os a tízesek helyén áll. 6 tízes = 60.'
  },
  {
    id: 'n1000g3-q5',
    level: 1,
    questionTypeBadge: 'Számszomszéd',
    figure: <RowFig items={['998', '999', '?']} />,
    question: 'Melyik szám jön a 999 után?',
    options: ['1000', '990', '9910', '900'],
    correctAnswer: 0,
    explanation: '999 + 1 = 1000. Ez az első négyjegyű szám.'
  },
  {
    id: 'n1000g3-q6',
    level: 1,
    questionTypeBadge: 'Ezres',
    question: 'Hány százas van az 1000-ben?',
    options: ['10', '1', '100', '0'],
    correctAnswer: 0,
    explanation: '100, 200, 300, … , 1000: ez 10 százas. 10 százas = 1 ezres.'
  },
  {
    id: 'n1000g3-q7',
    level: 1,
    questionTypeBadge: 'Összehasonlítás',
    figure: <RowFig items={['689', '?', '698']} />,
    question: 'Melyik jel kerül a ? helyére?',
    options: ['<', '>', '=', '+'],
    correctAnswer: 0,
    explanation: 'A százasok egyformák (6). A tízesek: 8 < 9. Ezért 689 < 698.'
  },
  {
    id: 'n1000g3-q8',
    level: 1,
    questionTypeBadge: 'Számegyenes',
    figure: <LineFig lo={0} hi={1000} tick={100} big={500} labels={[0, 500, 1000]} marks={[{ v: 400, label: '?' }]} />,
    question: 'Egy osztás 100-at ér. Melyik számot jelöli a pont?',
    options: ['400', '40', '500', '300'],
    correctAnswer: 0,
    explanation: 'A 0-tól 4 lépés: 100, 200, 300, 400.'
  },
  {
    id: 'n1000g3-q9',
    level: 1,
    questionTypeBadge: 'Pénz',
    figure: <MoneyFig notes={[500]} coins={[200, 100]} />,
    question: 'Mennyi pénz van a képen?',
    options: ['800 Ft', '700 Ft', '600 Ft', '900 Ft'],
    correctAnswer: 0,
    explanation: '500 + 200 = 700, 700 + 100 = 800. Ez 800 Ft.'
  },
  {
    id: 'n1000g3-q10',
    level: 1,
    questionTypeBadge: 'Számok betűvel',
    question: 'Hogyan írjuk betűvel: 1000?',
    options: ['ezer', 'tízszáz', 'százezer', 'egyszáz'],
    correctAnswer: 0,
    explanation: 'Az 1000 neve: ezer. Ez 10 százas.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'n1000g3-q11',
    level: 2,
    questionTypeBadge: 'Kirakás',
    figure: <BlocksFig sz={9} t={0} e={4} />,
    question: 'Melyik szám van kirakva?',
    options: ['904', '94', '940', '409'],
    correctAnswer: 0,
    explanation: '9 lap = 900. Rúd nincs, ezért a tízesek helyére 0 kerül. 4 kocka = 4. Ez 904.'
  },
  {
    id: 'n1000g3-q12',
    level: 2,
    questionTypeBadge: 'Bontás',
    question: '6 százas + 9 egyes = ?',
    options: ['609', '690', '69', '960'],
    correctAnswer: 0,
    explanation: '600 + 9 = 609. A tízesek helyén nincs semmi, oda 0 kerül.'
  },
  {
    id: 'n1000g3-q13',
    level: 2,
    questionTypeBadge: 'Számsor',
    figure: <RowFig items={['850', '900', '950', '?']} />,
    question: 'Ötvenesével lépünk. Melyik szám jön?',
    options: ['1000', '960', '905', '990'],
    correctAnswer: 0,
    explanation: '950 + 50 = 1000.'
  },
  {
    id: 'n1000g3-q14',
    level: 2,
    questionTypeBadge: 'Számsor',
    figure: <RowFig items={['760', '740', '720', '?']} />,
    question: 'Húszasával lépünk visszafelé. Melyik szám jön?',
    options: ['700', '710', '680', '740'],
    correctAnswer: 0,
    explanation: '720 − 20 = 700.'
  },
  {
    id: 'n1000g3-q15',
    level: 2,
    questionTypeBadge: 'Számegyenes',
    figure: <LineFig lo={600} hi={700} tick={10} big={50} labels={[600, 650, 700]} marks={[{ v: 670, label: '?' }]} />,
    question: 'Egy kis osztás 10-et ér. Melyik számot jelöli a pont?',
    options: ['670', '607', '660', '680'],
    correctAnswer: 0,
    explanation: 'A 650-től 2 kis lépés jobbra: 660, 670.'
  },
  {
    id: 'n1000g3-q16',
    level: 2,
    questionTypeBadge: 'Valódi érték',
    figure: <BoxedFig num="1000" idx={0} />,
    question: 'Mennyit ér a bekeretezett 1-es?',
    options: ['1000', '1', '100', '10'],
    correctAnswer: 0,
    explanation: 'Az 1-es az ezresek helyén áll. 1 ezres = 1000.'
  },
  {
    id: 'n1000g3-q17',
    level: 2,
    questionTypeBadge: 'Számszomszéd',
    figure: <RowFig items={['?', '700', '701']} />,
    question: 'Melyik szám áll közvetlenül a 700 előtt?',
    options: ['699', '600', '690', '710'],
    correctAnswer: 0,
    explanation: '700 − 1 = 699.'
  },
  {
    id: 'n1000g3-q18',
    level: 2,
    questionTypeBadge: 'Pénz',
    figure: <NoteToCoinsFig />,
    question: 'Hány darab 100 Ft-os ér annyit, mint egy 1000 Ft-os?',
    options: ['10', '100', '1', '5'],
    correctAnswer: 0,
    explanation: '100, 200, … , 1000: ez 10 darab 100 Ft-os.'
  },
  {
    id: 'n1000g3-q19',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    figure: <RowFig items={['909', '990', '899', '919']} />,
    question: 'Melyik a legnagyobb szám?',
    options: ['990', '909', '919', '899'],
    correctAnswer: 0,
    explanation: 'A 899-ben csak 8 százas van. A többiben 9. Közülük a tízesek döntenek: 9 a legtöbb. Ez a 990.'
  },
  {
    id: 'n1000g3-q20',
    level: 2,
    questionTypeBadge: 'Számok betűvel',
    question: 'Írd le számjegyekkel: kilencszázhét!',
    options: ['907', '970', '9007', '97'],
    correctAnswer: 0,
    explanation: '9 százas, 0 tízes, 7 egyes: 907.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'n1000g3-q21',
    level: 3,
    questionTypeBadge: 'Beváltás',
    figure: <PileFig h={5} t={14} e={3} />,
    question: 'Váltsd be! Melyik szám van az asztalon?',
    options: ['643', '543', '653', '634'],
    correctAnswer: 0,
    explanation: '14 rúd = 10 rúd + 4 rúd. 10 rúd = 1 lap. Így 6 lap, 4 rúd, 3 kocka: 643.'
  },
  {
    id: 'n1000g3-q22',
    level: 3,
    questionTypeBadge: 'Beváltás',
    question: '450 egyes + 15 tízes = ?',
    options: ['600', '465', '550', '615'],
    correctAnswer: 0,
    explanation: '15 tízes = 150. 450 + 150 = 600.'
  },
  {
    id: 'n1000g3-q23',
    level: 3,
    questionTypeBadge: 'Számkártyák',
    figure: <CardsFig digits={['5', '8', '2']} />,
    question: 'Melyik a legnagyobb páratlan szám, amit ezekből a kártyákból kirakhatsz?',
    options: ['825', '852', '285', '582'],
    correctAnswer: 0,
    explanation: 'Páratlan csak akkor lesz, ha az 5 áll a végén: 825 vagy 285. A nagyobb a 825.'
  },
  {
    id: 'n1000g3-q24',
    level: 3,
    questionTypeBadge: 'Számkártyák',
    figure: <CardsFig digits={['7', '0', '4']} />,
    question: 'Melyik a legkisebb háromjegyű szám, amit ezekből kirakhatsz?',
    options: ['407', '047', '470', '704'],
    correctAnswer: 0,
    explanation: '0-val nem kezdődhet háromjegyű szám. Az elejére a 4 kerül, utána a 0, végül a 7: 407.'
  },
  {
    id: 'n1000g3-q25',
    level: 3,
    questionTypeBadge: 'Számegyenes',
    figure: <LineFig lo={0} hi={1000} tick={50} big={100} labels={[0, 500, 1000]} marks={[{ v: 750, label: '?' }]} />,
    question: 'Egy kis osztás 50-et ér. Melyik számot jelöli a pont?',
    options: ['750', '705', '800', '700'],
    correctAnswer: 0,
    explanation: 'Az 500-tól 5 kis lépés jobbra: 550, 600, 650, 700, 750.'
  },
  {
    id: 'n1000g3-q26',
    level: 3,
    questionTypeBadge: 'Két szám között',
    figure: <RowFig items={['896', '?', '899']} sep="<" />,
    question: 'A ? helyére páros szám kerül. Melyik?',
    options: ['898', '897', '899', '896'],
    correctAnswer: 0,
    explanation: 'A 896 és a 899 között a 897 és a 898 van. A páros közülük a 898.'
  },
  {
    id: 'n1000g3-q27',
    level: 3,
    questionTypeBadge: 'Helyiérték',
    question: 'Melyik számban ér a 3-as 300-at, és a 6-os 60-at?',
    options: ['364', '634', '346', '643'],
    correctAnswer: 0,
    explanation: 'A 3-as a százasok helyén, a 6-os a tízesek helyén áll: 364.'
  },
  {
    id: 'n1000g3-q28',
    level: 3,
    questionTypeBadge: 'Pénz',
    figure: <MoneyFig notes={[500]} coins={[200, 200, 50, 20, 20]} />,
    question: 'Mennyi pénz van a képen?',
    options: ['990 Ft', '970 Ft', '900 Ft', '1000 Ft'],
    correctAnswer: 0,
    explanation: '500 + 200 + 200 = 900. 50 + 20 + 20 = 90. 900 + 90 = 990 Ft.'
  },
  {
    id: 'n1000g3-q29',
    level: 3,
    questionTypeBadge: 'Ezres',
    question: 'Hány tízes van az 1000-ben?',
    options: ['100', '10', '1000', '1'],
    correctAnswer: 0,
    explanation: '1 százasban 10 tízes van. 10 százasban 10-szer ennyi: 100 tízes.'
  },
  {
    id: 'n1000g3-q30',
    level: 3,
    questionTypeBadge: 'Kirakás',
    figure: <BlocksFig sz={7} t={4} e={0} />,
    question: 'A 748-at szeretnéd kirakni. Ennyi van már az asztalon. Mi hiányzik még?',
    options: ['8 kocka', '4 rúd', '8 rúd', '48 kocka'],
    correctAnswer: 0,
    explanation: 'Az asztalon 7 lap és 4 rúd van: 740. A 748-hoz még 8 kocka kell.'
  }
];

export const Numbers1000G3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={3}
      chapterId="szamolas-1000-ig"
      topicId="g3-c1000-szamok-quiz"
      subtopicId="szamok-1000-ig"
      title="1. Számok 1000-ig – Kvíz"
      subtitle="30 feladat 3 szinten: kirakás, ezres, helyiérték, betűvel írás, számsorok, számegyenes, számkártyák, pénz."
      badge="3. OSZTÁLY • XI. SZÁMOLÁS 0-TÓL 1000-IG • KVÍZ"
      questions={NUMBERS_1000_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'Százas, tízes, egyes',
          items: ['1 lap = 100, 1 rúd = 10, 1 kocka = 1', '685 = 600 + 80 + 5', 'Ha egy helyen nincs semmi, 0-t írunk: 706']
        },
        {
          title: 'Ezer',
          items: ['10 százas = 1 ezres = 1000', '999 + 1 = 1000', 'Az 1000 négyjegyű, a 999 a legnagyobb háromjegyű szám']
        },
        {
          title: 'Összehasonlítás',
          items: ['Először a százasokat nézd!', 'Ha egyformák, a tízeseket.', 'Ha azok is, az egyeseket: 970 < 973']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <Numbers1000G3Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <Numbers1000G3Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default Numbers1000G3Quiz;

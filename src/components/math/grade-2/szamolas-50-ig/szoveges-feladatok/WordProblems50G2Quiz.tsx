import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { WordProblems50G2Matcher } from './WordProblems50G2Matcher';
import { WordProblems50G2Sorter } from './WordProblems50G2Sorter';
import {
  WPQFig,
  BarModelPart,
  BarSeg,
  CompareBarsPart,
  CompareRow,
  DotsPart,
  DOT_RED,
  DOT_GREEN,
  DOT_YELLOW,
  WP_INK,
  WP_UNK
} from './WordProblems50G2Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const DotsFig: React.FC<{ a: number; b?: number; crossed?: number; yellow?: boolean }> = ({ a, b = 0, crossed = 0, yellow }) => {
  const rows = Math.ceil((a + b) / 10);
  const r = 7;
  const step = 2 * r + 4;
  const w = 9 * step + 3 * r;
  const groups = [{ count: a, ...(yellow ? DOT_YELLOW : DOT_RED) }, ...(b > 0 ? [{ count: b, ...DOT_GREEN }] : [])];
  return (
    <WPQFig h={rows * step + 20}>
      <DotsPart x={(260 - w) / 2} y={12} r={r} groups={groups} crossed={crossed} />
    </WPQFig>
  );
};

const BarFig: React.FC<{ parts: BarSeg[]; total: number | string; caption?: string }> = ({ parts, total, caption }) => (
  <WPQFig h={caption ? 112 : 96}>
    <BarModelPart x={22} y={14} w={216} h={30} parts={parts} total={total} fs={16} />
    {caption && (
      <text x="130" y="104" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">
        {caption}
      </text>
    )}
  </WPQFig>
);

const CompareFig: React.FC<{ rows: CompareRow[]; diff?: string }> = ({ rows, diff }) => (
  <WPQFig h={92}>
    <CompareBarsPart x={10} y={14} w={236} labelW={58} rowH={26} gap={16} rows={rows} diff={diff} fs={14} />
  </WPQFig>
);

const PriceTagsFig: React.FC<{ items: { label: string; price: string; color: string }[] }> = ({ items }) => {
  const step = 110;
  const x0 = 130 - ((items.length - 1) * step) / 2;
  return (
    <WPQFig h={92}>
      {items.map((it, i) => {
        const cx = x0 + i * step;
        const unk = it.price.includes('?');
        return (
          <g key={i}>
            <circle cx={cx} cy={32} r="16" fill={it.color} stroke="#334155" strokeWidth="2" />
            <text x={cx} y={37} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a">
              {it.label}
            </text>
            <rect x={cx - 34} y={54} width="68" height="26" rx="6" fill={unk ? '#fff1f2' : '#fff'} stroke={unk ? WP_UNK : WP_INK} strokeWidth="2" />
            <text x={cx} y={72} textAnchor="middle" fontSize="15" fontWeight="900" fill={unk ? WP_UNK : WP_INK}>
              {it.price}
            </text>
          </g>
        );
      })}
    </WPQFig>
  );
};

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const WORD_PROBLEMS50_G2_QUESTIONS: QuizQuestion[] = [
  // ----- 1. szint -----
  {
    id: 'wp50g2-q1',
    level: 1,
    questionTypeBadge: 'Összesen',
    figure: <DotsFig a={23} b={5} />,
    question: 'A kosárban 23 piros és 5 zöld alma van. Hány alma van összesen?',
    options: ['28', '18', '27', '33'],
    correctAnswer: 0,
    explanation: 'Összesen: összeadunk. 23 + 5 = 28 alma.'
  },
  {
    id: 'wp50g2-q2',
    level: 1,
    questionTypeBadge: 'Mennyi marad?',
    figure: <DotsFig a={36} crossed={4} yellow />,
    question: 'A polcon 36 könyv van. Elviszünk 4-et. Hány könyv marad?',
    options: ['32', '40', '33', '30'],
    correctAnswer: 0,
    explanation: 'Elviszünk – kevesebb lesz. 36 − 4 = 32 könyv marad.'
  },
  {
    id: 'wp50g2-q3',
    level: 1,
    questionTypeBadge: 'Melyik művelet?',
    question: 'Zsófinak 20 gyöngye van. Kap még 15-öt. Hogyan számolod ki, mennyi lesz?',
    options: ['20 + 15', '20 − 15', '15 − 20', '20 + 20'],
    correctAnswer: 0,
    explanation: '„Kap még” – több lesz. Összeadunk: 20 + 15 = 35.'
  },
  {
    id: 'wp50g2-q4',
    level: 1,
    questionTypeBadge: 'Kap még',
    figure: <BarFig parts={[{ v: 31, size: 31 }, { v: 8, size: 8, color: 'green' }]} total="?" />,
    question: 'Dani 31 kavicsot gyűjtött. Talált még 8-at. Hány kavicsa lett?',
    options: ['39', '23', '38', '40'],
    correctAnswer: 0,
    explanation: '31 + 8 = 39. Az egyesek: 1 + 8 = 9, a 3 tízes marad.'
  },
  {
    id: 'wp50g2-q5',
    level: 1,
    questionTypeBadge: 'Elvétel',
    figure: <DotsFig a={45} crossed={5} />,
    question: '45 lufiból 5 kipukkadt. Hány lufi maradt?',
    options: ['40', '50', '41', '35'],
    correctAnswer: 0,
    explanation: '45 − 5 = 40 lufi maradt. Az áthúzott 5 korong a kipukkadt lufi.'
  },
  {
    id: 'wp50g2-q6',
    level: 1,
    questionTypeBadge: 'Hiányzó rész',
    figure: <BarFig parts={[{ v: 20, size: 20, color: 'rose' }, { v: '?', size: 10 }]} total={30} caption="lányok + fiúk = 30 gyerek" />,
    question: 'Az osztályba 30 gyerek jár. 20 lány. Hány fiú jár oda?',
    options: ['10', '50', '20', '11'],
    correctAnswer: 0,
    explanation: 'Az egész 30, az egyik rész 20. A másik rész: 30 − 20 = 10 fiú.'
  },
  {
    id: 'wp50g2-q7',
    level: 1,
    questionTypeBadge: 'Mit tudunk?',
    question: 'A dobozban 40 kréta volt. 10 eltört. Melyik szám mutatja, hány kréta volt összesen?',
    options: ['40', '10', '30', '50'],
    correctAnswer: 0,
    explanation: 'Az összes kréta: 40. A 10 csak az eltört kréták száma.'
  },
  {
    id: 'wp50g2-q8',
    level: 1,
    questionTypeBadge: 'Két doboz',
    figure: <BarFig parts={[{ v: 25, size: 25 }, { v: 20, size: 20, color: 'green' }]} total="?" />,
    question: 'Két dobozban 25 és 20 golyó van. Hány golyó van összesen?',
    options: ['45', '5', '40', '47'],
    correctAnswer: 0,
    explanation: '25 + 20 = 45. A 2 tízes a 2 tízeshez: 4 tízes, az 5 egyes marad.'
  },
  {
    id: 'wp50g2-q9',
    level: 1,
    questionTypeBadge: 'Kinek több?',
    figure: (
      <CompareFig
        rows={[
          { label: 'Mesi', size: 14, text: 14, color: 'blue' },
          { label: 'Laci', size: 10, text: 10, color: 'amber' }
        ]}
      />
    ),
    question: 'Mesinek 14 matricája van, Lacinak 10. Kinek van több?',
    options: ['Mesinek', 'Lacinak', 'Egyformán', 'Nem tudjuk'],
    correctAnswer: 0,
    explanation: 'A 14 több, mint a 10. Mesi szalagja hosszabb.'
  },
  {
    id: 'wp50g2-q10',
    level: 1,
    questionTypeBadge: 'Válaszadás',
    question: 'Kérdés: Hány madár maradt a fán? Számolás: 30 − 6 = 24. Melyik a jó válasz?',
    options: ['24 madár maradt a fán.', '30 madár maradt a fán.', '6 madár maradt a fán.', '36 madár maradt a fán.'],
    correctAnswer: 0,
    explanation: 'A válaszban a számolás eredménye áll: 24 madár maradt a fán.'
  },

  // ----- 2. szint -----
  {
    id: 'wp50g2-q11',
    level: 2,
    questionTypeBadge: 'Tízesátlépés',
    figure: <BarFig parts={[{ v: 26, size: 26 }, { v: 9, size: 9, color: 'green' }]} total="?" />,
    question: 'Az egyik fán 26 körte van, a másikon 9. Hány körte van a két fán?',
    options: ['35', '25', '34', '17'],
    correctAnswer: 0,
    explanation: '26 + 9 = 26 + 4 + 5 = 30 + 5 = 35 körte.'
  },
  {
    id: 'wp50g2-q12',
    level: 2,
    questionTypeBadge: 'Elvétel átlépéssel',
    figure: <DotsFig a={32} crossed={7} yellow />,
    question: 'A standon 32 tök van. Eladnak 7-et. Hány tök marad?',
    options: ['25', '35', '39', '26'],
    correctAnswer: 0,
    explanation: '32 − 7 = 32 − 2 − 5 = 30 − 5 = 25 tök. (A 35 rossz: ott 7 − 2-t számoltál.)'
  },
  {
    id: 'wp50g2-q13',
    level: 2,
    questionTypeBadge: 'Mennyivel több?',
    figure: (
      <CompareFig
        rows={[
          { label: 'Kati', size: 26, text: 26, color: 'rose' },
          { label: 'Feri', size: 19, text: 19, color: 'blue' }
        ]}
        diff="?"
      />
    ),
    question: 'Kati 26 virágot ültetett, Feri 19-et. Mennyivel többet ültetett Kati?',
    options: ['7', '45', '13', '8'],
    correctAnswer: 0,
    explanation: 'A különbséget keressük: 26 − 19 = 7. Ellenőrzés: 19 + 7 = 26.'
  },
  {
    id: 'wp50g2-q14',
    level: 2,
    questionTypeBadge: '…-cel több',
    figure: (
      <CompareFig
        rows={[
          { label: 'Máté', size: 18, text: 18, color: 'blue' },
          { label: 'Réka', size: 27, text: '?', color: 'amber' }
        ]}
        diff="9"
      />
    ),
    question: 'Máténak 18 golyója van. Rékának 9-cel több. Hány golyója van Rékának?',
    options: ['27', '9', '26', '17'],
    correctAnswer: 0,
    explanation: 'Rékának több van: 18 + 9 = 27 golyó.'
  },
  {
    id: 'wp50g2-q15',
    level: 2,
    questionTypeBadge: '…-vel kevesebb',
    figure: (
      <CompareFig
        rows={[
          { label: 'piros', size: 40, text: 40, color: 'rose' },
          { label: 'kék', size: 28, text: '?', color: 'blue' }
        ]}
        diff="12"
      />
    ),
    question: 'A piros busz 40 utast visz. A kék busz 12-vel kevesebbet. Hány utast visz a kék busz?',
    options: ['28', '38', '30', '27'],
    correctAnswer: 0,
    explanation: 'Kevesebbet visz, ezért kivonunk: 40 − 12 = 40 − 10 − 2 = 28.'
  },
  {
    id: 'wp50g2-q16',
    level: 2,
    questionTypeBadge: 'Még mennyi?',
    figure: <BarFig parts={[{ v: 35, size: 35, color: 'green' }, { v: '?', size: 15 }]} total={50} caption="elolvasta + még hátra = 50 oldal" />,
    question: 'A könyv 50 oldalas. Lili 35 oldalt olvasott el. Hány oldal van még hátra?',
    options: ['15', '25', '14', '35'],
    correctAnswer: 0,
    explanation: '35-től 50-ig: 35 + 5 = 40, 40 + 10 = 50. Ez 15 oldal. (50 − 35 = 15.)'
  },
  {
    id: 'wp50g2-q17',
    level: 2,
    questionTypeBadge: 'Melyik művelet?',
    question: 'A buszon 34-en ültek. Leszállt 9 ember. Melyik művelettel számolod ki, hányan maradtak?',
    options: ['34 − 9', '34 + 9', '9 + 34', '43 − 9'],
    correctAnswer: 0,
    explanation: 'Leszálltak – kevesebben lettek. Kivonunk: 34 − 9 = 25.'
  },
  {
    id: 'wp50g2-q18',
    level: 2,
    questionTypeBadge: 'Képről olvasás',
    figure: <DotsFig a={36} crossed={8} />,
    question: '36 korongból 8-at áthúztunk. Hány korong maradt?',
    options: ['28', '36', '44', '27'],
    correctAnswer: 0,
    explanation: '36 − 8 = 36 − 6 − 2 = 30 − 2 = 28 korong.'
  },
  {
    id: 'wp50g2-q19',
    level: 2,
    questionTypeBadge: 'Vásárlás',
    figure: (
      <PriceTagsFig
        items={[
          { label: 'füzet', price: '25 Ft', color: '#93c5fd' },
          { label: 'radír', price: '18 Ft', color: '#f9a8d4' }
        ]}
      />
    ),
    question: 'Egy füzet 25 Ft, egy radír 18 Ft. Mennyibe kerül a kettő együtt?',
    options: ['43 Ft', '33 Ft', '7 Ft', '42 Ft'],
    correctAnswer: 0,
    explanation: '25 + 18 = 25 + 10 + 8 = 35 + 8 = 43 Ft.'
  },
  {
    id: 'wp50g2-q20',
    level: 2,
    questionTypeBadge: 'A többi',
    figure: <BarFig parts={[{ v: 29, size: 29, color: 'rose' }, { v: '?', size: 17 }]} total={46} caption="piros + kék = 46 gyöngy" />,
    question: 'A dobozban 46 gyöngy van. 29 piros, a többi kék. Hány kék gyöngy van?',
    options: ['17', '27', '16', '23'],
    correctAnswer: 0,
    explanation: '46 − 29 = 17. Ellenőrzés: 29 + 17 = 46.'
  },

  // ----- 3. szint -----
  {
    id: 'wp50g2-q21',
    level: 3,
    questionTypeBadge: 'Csavaros szöveg',
    figure: (
      <CompareFig
        rows={[
          { label: 'kacsa', size: 36, text: 36, color: 'blue' },
          { label: 'hattyú', size: 25, text: '?', color: 'amber' }
        ]}
        diff="11"
      />
    ),
    question: 'A tavon 36 kacsa úszik. Ez 11-gyel több, mint a hattyúk száma. Hány hattyú van?',
    options: ['25', '47', '24', '15'],
    correctAnswer: 0,
    explanation: 'A kacsa van több, a hattyú kevesebb! Kivonunk: 36 − 11 = 25 hattyú.'
  },
  {
    id: 'wp50g2-q22',
    level: 3,
    questionTypeBadge: 'Két lépés',
    figure: <BarFig parts={[{ v: 12, size: 12 }, { v: 15, size: 15, color: 'violet' }, { v: '?', size: 23 }]} total={50} />,
    question: 'Egy zacskóban 50 cukor van. Ádám megevett 12-t, Bea 15-öt. Hány cukor maradt?',
    options: ['23', '38', '35', '27'],
    correctAnswer: 0,
    explanation: '1. lépés: 50 − 12 = 38. 2. lépés: 38 − 15 = 23 cukor maradt.'
  },
  {
    id: 'wp50g2-q23',
    level: 3,
    questionTypeBadge: 'Kap, aztán ad',
    question: 'Kata 16 matricát kapott anyától, 13-at apától. Elajándékozott 9-et. Hány matricája maradt?',
    options: ['20', '29', '38', '19'],
    correctAnswer: 0,
    explanation: '1. lépés: 16 + 13 = 29. 2. lépés: 29 − 9 = 20 matrica maradt.'
  },
  {
    id: 'wp50g2-q24',
    level: 3,
    questionTypeBadge: 'Csavaros ár',
    figure: (
      <PriceTagsFig
        items={[
          { label: 'alma', price: '19 Ft', color: '#fca5a5' },
          { label: 'körte', price: '? Ft', color: '#bef264' }
        ]}
      />
    ),
    question: 'Az alma 19 Ft. Ez 7 Ft-tal kevesebb, mint a körte ára. Mennyibe kerül a körte?',
    options: ['26 Ft', '12 Ft', '25 Ft', '36 Ft'],
    correctAnswer: 0,
    explanation: 'Az alma olcsóbb, a körte drágább! Összeadunk: 19 + 7 = 26 Ft.'
  },
  {
    id: 'wp50g2-q25',
    level: 3,
    questionTypeBadge: 'Utolérés',
    figure: (
      <CompareFig
        rows={[
          { label: 'Benő', size: 31, text: 31, color: 'blue' },
          { label: 'Panni', size: 24, text: 24, color: 'rose' }
        ]}
        diff="?"
      />
    ),
    question: 'Panni 24 pontot gyűjtött, Benő 31-et. Hány pont kell még Panninak, hogy annyi legyen, mint Benőnek?',
    options: ['7', '13', '8', '17'],
    correctAnswer: 0,
    explanation: '24-től 31-ig: 24 + 6 = 30, 30 + 1 = 31. Ez 7 pont. (31 − 24 = 7.)'
  },
  {
    id: 'wp50g2-q26',
    level: 3,
    questionTypeBadge: 'Üres helyek',
    figure: <BarFig parts={[{ v: 18, size: 18, color: 'rose' }, { v: 15, size: 15 }, { v: '?', size: 7 }]} total={40} caption="piros + kék + üres = 40 hely" />,
    question: 'A parkolóban 40 hely van. 18 piros és 15 kék autó áll ott. Hány hely üres?',
    options: ['7', '33', '22', '25'],
    correctAnswer: 0,
    explanation: '1. lépés: 18 + 15 = 33 autó. 2. lépés: 40 − 33 = 7 hely üres.'
  },
  {
    id: 'wp50g2-q27',
    level: 3,
    questionTypeBadge: 'Melyik igaz?',
    figure: (
      <CompareFig
        rows={[
          { label: 'Rita', size: 28, text: 28, color: 'rose' },
          { label: 'Zoli', size: 22, text: '?', color: 'green' }
        ]}
        diff="6"
      />
    ),
    question: 'Rita 28 szem cseresznyét evett. Zoli 6-tal kevesebbet. Melyik igaz?',
    options: ['Zoli 22 szemet evett.', 'Zoli 34 szemet evett.', 'Zoli többet evett.', 'Ketten együtt 28 szemet ettek.'],
    correctAnswer: 0,
    explanation: 'Zoli kevesebbet evett: 28 − 6 = 22 szem.'
  },
  {
    id: 'wp50g2-q28',
    level: 3,
    questionTypeBadge: 'Visszafelé',
    question: 'Gábor elköltött 15 Ft-ot. Maradt 27 Ft-ja. Mennyi pénze volt?',
    options: ['42 Ft', '12 Ft', '32 Ft', '41 Ft'],
    correctAnswer: 0,
    explanation: 'Az elköltött és a megmaradt pénz együtt adja az egészet: 15 + 27 = 42 Ft.'
  },
  {
    id: 'wp50g2-q29',
    level: 3,
    questionTypeBadge: 'Két lépés',
    figure: (
      <CompareFig
        rows={[
          { label: 'piros', size: 18, text: 18, color: 'rose' },
          { label: 'kék', size: 25, text: '?', color: 'blue' }
        ]}
        diff="7"
      />
    ),
    question: 'A dobozban 18 piros golyó van. Kék golyóból 7-tel több. Hány golyó van összesen?',
    options: ['43', '25', '11', '36'],
    correctAnswer: 0,
    explanation: '1. lépés: kék golyó 18 + 7 = 25. 2. lépés: összesen 18 + 25 = 43 golyó.'
  },
  {
    id: 'wp50g2-q30',
    level: 3,
    questionTypeBadge: 'Melyik történet?',
    question: 'Melyik történethez illik: 45 − 20 = 25?',
    options: [
      '45 fecskéből 20 elrepült. Hány maradt?',
      '45 fecskéhez jött még 20. Hány lett?',
      '20 fecskéhez jött még 25. Hány lett?',
      'Volt 20 fecske. Elrepült 25. Hány maradt?'
    ],
    correctAnswer: 0,
    explanation: 'Elrepült – kivonás. 45-ből elvesszük a 20-at, 25 marad.'
  }
];

export const WordProblems50G2Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={2}
      chapterId="szamolas-50-ig"
      topicId="g2-c50-szoveges-quiz"
      subtopicId="szoveges-feladatok"
      title="5. Szöveges feladatok – Kvíz"
      subtitle="30 feladat 3 szinten: összesen, marad, mennyivel több, csavaros szöveg és két lépés 50-ig."
      badge="2. OSZTÁLY • II. SZÁMKÖRBŐVÍTÉS ÉS SZÁMOLÁS 50-IG • KVÍZ"
      questions={WORD_PROBLEMS50_G2_QUESTIONS}
      cheatSheets={[
        {
          title: 'A 4 lépés',
          items: ['1. Mit tudunk? (a számok)', '2. Mit kérdez?', '3. Számolok: + vagy −', '4. Válaszolok mondatban']
        },
        {
          title: 'Mikor + és mikor −?',
          items: ['Kap még, összesen → +', 'Elvisz, elfogy, marad → −', 'Mennyivel több? → −', 'Még mennyi kell? → −']
        },
        {
          title: 'Csavaros szöveg',
          items: ['„Ez 12-vel több, mint…” → a másik a kevesebb!', 'Rajzolj szalagot!', 'Két lépés: előbb az egyik, aztán a másik', 'Ellenőrizd visszafelé!']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <WordProblems50G2Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <WordProblems50G2Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default WordProblems50G2Quiz;

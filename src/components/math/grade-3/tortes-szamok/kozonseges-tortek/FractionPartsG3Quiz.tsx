import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { FractionPartsG3Matcher } from './FractionPartsG3Matcher';
import { FractionPartsG3Sorter } from './FractionPartsG3Sorter';
import { FONT, Txt, Pie, Bar, Grid, equalAngles, equalCuts } from '../bevezetes/EqualPartsG3Parts';
import { FracView, FracTask, firstK, PIE, BAR, GRID, Rod, Flag, FlagKind, Cup, MeterStick } from './FractionPartsG3Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 150 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);
type T = Pick<FracTask, 'shape' | 'n' | 'rows' | 'cols'>;
/** Egy alakzat, az első k (vagy a megadott) rész színes. */
const One: React.FC<{ t: T; k?: number; colored?: boolean[]; color?: string }> = ({ t, k = 0, colored, color }) => (
  <QFig h={t.shape === 'bar' ? 100 : 150}>
    {t.shape === 'bar' ? (
      <FracView task={t} x={20} y={20} w={200} h={60} colored={colored ?? firstK(t.n, k)} color={color} />
    ) : (
      <FracView task={t} x={30} y={12} w={180} h={126} colored={colored ?? firstK(t.n, k)} color={color} />
    )}
  </QFig>
);
/** Betűvel jelölt ábrák egy sorban. */
const Lettered: React.FC<{ items: { t: T; k: number }[] }> = ({ items }) => {
  const step = 240 / items.length;
  return (
    <QFig h={120}>
      {items.map((it, i) => {
        const cx = step * (i + 0.5);
        return (
          <g key={i}>
            <FracView task={it.t} x={cx - 26} y={20} w={52} h={58} colored={firstK(it.t.n, it.k)} sw={2} />
            <Txt x={cx} y={106} s={15}>
              {String.fromCharCode(65 + i)}
            </Txt>
          </g>
        );
      })}
    </QFig>
  );
};
const FlagFig: React.FC<{ kind: FlagKind }> = ({ kind }) => (
  <QFig h={130}>
    <Flag kind={kind} x={60} y={20} w={120} h={84} sw={2.5} />
  </QFig>
);
const CupFig: React.FC<{ fill: number }> = ({ fill }) => (
  <QFig h={160}>
    <Cup x={95} y={26} w={50} h={110} fill={fill} />
  </QFig>
);
const RodFig: React.FC<{ whole: number; part?: number; split?: number }> = ({ whole, part, split }) => {
  const u = 200 / whole;
  return (
    <QFig h={part ? 110 : 90}>
      <Rod len={whole} x={20} y={20} unit={u} h={30} />
      {split &&
        Array.from({ length: split - 1 }, (_, i) => (
          <line key={i} x1={20 + ((i + 1) * 200) / split} x2={20 + ((i + 1) * 200) / split} y1={14} y2={56} stroke="#1e293b" strokeWidth={2} strokeDasharray="5 4" />
        ))}
      {split && (
        <Txt x={20 + 100 / split} y={76} s={18} c="#dc2626">
          ?
        </Txt>
      )}
      {part && <Rod len={part} x={20} y={62} unit={u} h={30} />}
    </QFig>
  );
};
const TwoBars: React.FC<{ a: number; b: number }> = ({ a, b }) => (
  <QFig h={120}>
    <Bar x={20} y={18} w={200} h={34} cuts={equalCuts(a)} colored={[true]} color="#a78bfa" base="#ffffff" />
    <Bar x={20} y={66} w={200} h={34} cuts={equalCuts(b)} colored={[true]} color="#a78bfa" base="#ffffff" />
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const FRACTION_PARTS_G3_QUESTIONS: QuizQuestion[] = [
  // ----- 1. szint -----
  {
    id: 'frp-g3-q1',
    level: 1,
    questionTypeBadge: 'A rész neve',
    figure: <One t={PIE(2)} k={1} />,
    question: 'Hányad részét színeztük pirosra?',
    options: ['1 ketted', '1 negyed', '2 ketted', '1 harmad'],
    correctAnswer: 0,
    explanation: 'A kör 2 egyenlő részből áll, 1 piros. Ez 1 ketted, vagyis a fele.'
  },
  {
    id: 'frp-g3-q2',
    level: 1,
    questionTypeBadge: 'A rész neve',
    figure: <One t={BAR(3)} k={1} />,
    question: 'Hányad részét színeztük pirosra?',
    options: ['1 harmad', '1 ketted', '3 harmad', '1 negyed'],
    correctAnswer: 0,
    explanation: 'A csík 3 egyenlő részből áll. A fehér részeket is számold! 3 részből 1 piros: 1 harmad.'
  },
  {
    id: 'frp-g3-q3',
    level: 1,
    questionTypeBadge: 'A rész neve',
    figure: <One t={GRID(2, 2)} colored={[false, false, false, true]} />,
    question: 'Hányad részét színeztük pirosra?',
    options: ['1 negyed', '1 harmad', '4 negyed', '1 ketted'],
    correctAnswer: 0,
    explanation: '4 egyenlő rész van, ebből 1 piros. Ez 1 negyed.'
  },
  {
    id: 'frp-g3-q4',
    level: 1,
    questionTypeBadge: 'A rész neve',
    figure: <One t={PIE(6)} k={1} />,
    question: 'Hányad részét színeztük pirosra?',
    options: ['1 hatod', '1 ötöd', '1 nyolcad', '6 hatod'],
    correctAnswer: 0,
    explanation: 'Számold körbe a részeket: 6 egyenlő rész. 1 piros: 1 hatod.'
  },
  {
    id: 'frp-g3-q5',
    level: 1,
    questionTypeBadge: 'A rész neve',
    figure: <One t={BAR(5)} k={1} />,
    question: 'Hányad részét színeztük pirosra?',
    options: ['1 ötöd', '1 negyed', '1 hatod', '5 ötöd'],
    correctAnswer: 0,
    explanation: '5 egyenlő rész, ebből 1 piros. Ez 1 ötöd.'
  },
  {
    id: 'frp-g3-q6',
    level: 1,
    questionTypeBadge: 'A rész neve',
    figure: <One t={GRID(2, 4)} colored={[false, false, true, false, false, false, false, false]} />,
    question: 'Hányad részét színeztük pirosra?',
    options: ['1 nyolcad', '1 negyed', '1 hatod', '1 tized'],
    correctAnswer: 0,
    explanation: 'Felül 4, alul 4 rész: 8 egyenlő rész. 1 piros: 1 nyolcad.'
  },
  {
    id: 'frp-g3-q7',
    level: 1,
    questionTypeBadge: 'Fele',
    figure: <One t={PIE(2)} k={1} color="#22c55e" />,
    question: 'Mi az 1 ketted másik neve?',
    options: ['a fele', 'a negyede', 'a harmada', 'az egész'],
    correctAnswer: 0,
    explanation: 'Ha 2 egyenlő részre osztjuk, egy rész 1 ketted. Úgy is mondjuk: a fele.'
  },
  {
    id: 'frp-g3-q8',
    level: 1,
    questionTypeBadge: 'Az egész',
    figure: <One t={PIE(4)} k={1} color="#38bdf8" />,
    question: 'A kék rész 1 negyed. Hány negyed adja ki az egész kört?',
    options: ['4 negyed', '1 negyed', '2 negyed', '3 negyed'],
    correctAnswer: 0,
    explanation: 'Az egész 4 egyenlő részből áll. 4 negyed = 1 egész.'
  },
  {
    id: 'frp-g3-q9',
    level: 1,
    questionTypeBadge: 'Zászló',
    figure: <FlagFig kind="hu" />,
    question: 'A magyar zászlónak hányad része piros?',
    options: ['1 harmad', '1 ketted', '2 harmad', '1 negyed'],
    correctAnswer: 0,
    explanation: 'A zászló 3 egyforma csíkból áll: piros, fehér, zöld. A piros 1 harmad.'
  },
  {
    id: 'frp-g3-q10',
    level: 1,
    questionTypeBadge: 'Keresd meg!',
    figure: (
      <Lettered
        items={[
          { t: PIE(3), k: 1 },
          { t: PIE(4), k: 1 },
          { t: PIE(2), k: 1 },
          { t: PIE(6), k: 1 }
        ]}
      />
    ),
    question: 'Melyik körnek színeztük ki az 1 negyedét?',
    options: ['B', 'A', 'C', 'D'],
    correctAnswer: 0,
    explanation: 'Az 1 negyedhez 4 egyenlő rész kell. A B kör 4 részből áll.'
  },
  // ----- 2. szint -----
  {
    id: 'frp-g3-q11',
    level: 2,
    questionTypeBadge: 'Több rész',
    figure: <One t={PIE(4)} k={3} />,
    question: 'Hányad részét színeztük pirosra?',
    options: ['3 negyed', '1 negyed', '4 negyed', '1 harmad'],
    correctAnswer: 0,
    explanation: '4 egyenlő rész, ebből 3 piros. Ez 3 negyed.'
  },
  {
    id: 'frp-g3-q12',
    level: 2,
    questionTypeBadge: 'Több rész',
    figure: <One t={BAR(3)} k={2} />,
    question: 'Hányad részét színeztük pirosra?',
    options: ['2 harmad', '1 harmad', '2 ketted', '3 harmad'],
    correctAnswer: 0,
    explanation: '3 egyenlő rész, ebből 2 piros. Ez 2 harmad.'
  },
  {
    id: 'frp-g3-q13',
    level: 2,
    questionTypeBadge: 'Több rész',
    figure: <One t={GRID(2, 3)} colored={[true, true, false, true, true, true]} />,
    question: 'Hányad részét színeztük pirosra?',
    options: ['5 hatod', '1 hatod', '5 ötöd', '6 hatod'],
    correctAnswer: 0,
    explanation: '6 egyenlő rész van, ebből 5 piros. Ez 5 hatod.'
  },
  {
    id: 'frp-g3-q14',
    level: 2,
    questionTypeBadge: 'Több rész',
    figure: <One t={GRID(2, 4)} colored={[true, false, false, true, false, true, false, false]} />,
    question: 'Hányad részét színeztük pirosra?',
    options: ['3 nyolcad', '5 nyolcad', '3 ötöd', '3 negyed'],
    correctAnswer: 0,
    explanation: '8 egyenlő rész van, ebből 3 piros. Ez 3 nyolcad. Az 5 nyolcad a fehér rész.'
  },
  {
    id: 'frp-g3-q15',
    level: 2,
    questionTypeBadge: 'Melyik nagyobb?',
    figure: <TwoBars a={3} b={4} />,
    question: 'A két csík ugyanakkora. Melyik a nagyobb: 1 harmad vagy 1 negyed?',
    options: ['1 harmad', '1 negyed', 'egyformák', 'nem lehet tudni'],
    correctAnswer: 0,
    explanation: 'A felső csíkot 3, az alsót 4 részre osztottuk. Kevesebb rész → nagyobb rész. 1 harmad a nagyobb.'
  },
  {
    id: 'frp-g3-q16',
    level: 2,
    questionTypeBadge: 'Színes rúd',
    figure: <RodFig whole={10} part={2} />,
    question: 'Hányad része a rózsaszín rúd a narancssárga rúdnak?',
    options: ['1 ötöd', '1 ketted', '1 tized', '1 negyed'],
    correctAnswer: 0,
    explanation: '5 rózsaszín rúd van olyan hosszú, mint a narancssárga. Ezért 1 ötöd.'
  },
  {
    id: 'frp-g3-q17',
    level: 2,
    questionTypeBadge: 'Mérőedény',
    figure: <CupFig fill={5} />,
    question: 'Az edénybe 10 dl fér. Hányad részéig töltöttük meg?',
    options: ['1 ketted', '1 ötöd', '1 tized', '5 ketted'],
    correctAnswer: 0,
    explanation: '5 dl van benne, ez a 10 dl fele. A fele = 1 ketted.'
  },
  {
    id: 'frp-g3-q18',
    level: 2,
    questionTypeBadge: 'Zászló',
    figure: <FlagFig kind="pl" />,
    question: 'Ennek a zászlónak hányad része fehér?',
    options: ['1 ketted', '1 harmad', '2 ketted', '1 negyed'],
    correctAnswer: 0,
    explanation: 'A zászló 2 egyforma csíkból áll: fehér és piros. A fehér 1 ketted, vagyis a fele.'
  },
  {
    id: 'frp-g3-q19',
    level: 2,
    questionTypeBadge: 'Méterrúd',
    figure: (
      <QFig h={100}>
        <Txt x={120} y={26} s={14}>1 m</Txt>
        <MeterStick x={20} y={38} w={200} h={30} k={1} />
      </QFig>
    ),
    question: 'A méterrudat 10 egyenlő részre osztottuk. A narancs rész 1 dm. Hányad része ez a méternek?',
    options: ['1 tized', '1 ötöd', '10 tized', '1 ketted'],
    correctAnswer: 0,
    explanation: '1 m = 10 dm. 10 egyenlő részből 1: 1 tized. 1 tized m = 1 dm.'
  },
  {
    id: 'frp-g3-q20',
    level: 2,
    questionTypeBadge: 'Mennyi hiányzik?',
    figure: <One t={PIE(3)} k={1} color="#22c55e" />,
    question: '1 harmad zöld. Mennyi hiányzik még az egészhez?',
    options: ['2 harmad', '1 harmad', '3 harmad', '2 ketted'],
    correctAnswer: 0,
    explanation: '3 harmad az egész. 1 harmad megvan, még 2 harmad kell.'
  },
  // ----- 3. szint -----
  {
    id: 'frp-g3-q21',
    level: 3,
    questionTypeBadge: 'Melyik kisebb?',
    question: 'Négy ugyanakkora tortát vágtunk fel. Melyik szelet a legkisebb?',
    options: ['1 hatod', '1 ketted', '1 harmad', '1 negyed'],
    correctAnswer: 0,
    explanation: 'A hatodnál vágtuk a legtöbb részre a tortát. Minél több a rész, annál kisebb egy szelet.'
  },
  {
    id: 'frp-g3-q22',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: (
      <QFig h={130}>
        <rect x={36} y={21} width={172} height={92} rx={4} fill="#78350f" />
        <Grid x={40} y={25} w={164} h={84} rows={2} cols={4} colored={[false, false, false, true, true, true, true, true]} color="#92400e" />
      </QFig>
    ),
    question: 'A csoki 8 egyforma kockából áll. 3 kockát megettél. Hányad része maradt meg?',
    options: ['5 nyolcad', '3 nyolcad', '5 ötöd', '8 nyolcad'],
    correctAnswer: 0,
    explanation: '8 kockából 3 elfogyott: 8 − 3 = 5 maradt. 8 egyenlő részből 5: 5 nyolcad.'
  },
  {
    id: 'frp-g3-q23',
    level: 3,
    questionTypeBadge: 'Színes rúd',
    figure: <RodFig whole={8} split={4} />,
    question: 'Melyik rúd a bordó rúd 1 negyede?',
    options: ['a rózsaszín rúd', 'a piros rúd', 'a fehér kocka', 'a sárga rúd'],
    correctAnswer: 0,
    explanation: 'A bordó rúd 8 kocka hosszú. 4 egyenlő része egyenként 2 kocka: ez a rózsaszín rúd. A piros (4) a fele.'
  },
  {
    id: 'frp-g3-q24',
    level: 3,
    questionTypeBadge: 'Színes rúd',
    figure: <RodFig whole={6} />,
    question: 'A lila rúd az 1 egész. Melyik az 1 hatod része?',
    options: ['a fehér kocka', 'a rózsaszín rúd', 'a piros rúd', 'a sárga rúd'],
    correctAnswer: 0,
    explanation: 'A lila rúd 6 kocka hosszú. 6 fehér kocka adja ki: a fehér kocka az 1 hatod.'
  },
  {
    id: 'frp-g3-q25',
    level: 3,
    questionTypeBadge: 'Melyik nagyobb?',
    question: 'Kata egy pizza 1 harmadát kapta. Dani egy ugyanakkora pizza 1 negyedét. Ki kapott többet?',
    options: ['Kata', 'Dani', 'egyformán kaptak', 'nem lehet tudni'],
    correctAnswer: 0,
    explanation: 'Kata pizzáját 3 részre, Daniét 4 részre osztották. 1 harmad nagyobb, mint 1 negyed.'
  },
  {
    id: 'frp-g3-q26',
    level: 3,
    questionTypeBadge: 'Szőnyeg',
    figure: (
      <QFig h={140}>
        <Grid x={50} y={18} w={140} h={94} rows={2} cols={3} />
        <Txt x={120} y={130} s={13} c="#475569">6 egyenlő rész</Txt>
      </QFig>
    ),
    question: 'A szőnyeg fele zöld, 1 harmada piros, a többi sárga. Hányad része sárga?',
    options: ['1 hatod', '1 negyed', '2 hatod', '1 harmad'],
    correctAnswer: 0,
    explanation: 'A fele 3 rész, az 1 harmada 2 rész. 3 + 2 = 5. 6 − 5 = 1 rész sárga: 1 hatod.'
  },
  {
    id: 'frp-g3-q27',
    level: 3,
    questionTypeBadge: 'Az egész',
    figure: (
      <QFig h={130}>
        <Pie cx={70} cy={65} r={48} bounds={equalAngles(4)} cake />
        <Pie cx={170} cy={65} r={48} bounds={equalAngles(4)} cake />
      </QFig>
    ),
    question: 'Két egész tortát negyedekre vágtunk. Hány negyed lett összesen?',
    options: ['8 negyed', '4 negyed', '2 negyed', '6 negyed'],
    correctAnswer: 0,
    explanation: '1 egész torta = 4 negyed. 2 torta: 4 + 4 = 8 negyed.'
  },
  {
    id: 'frp-g3-q28',
    level: 3,
    questionTypeBadge: 'Mérőedény',
    figure: <CupFig fill={2} />,
    question: 'Az edénybe 10 dl fér, 2 dl víz van benne. Hányad részéig van tele?',
    options: ['1 ötöd', '1 ketted', '1 tized', '1 negyed'],
    correctAnswer: 0,
    explanation: '2 dl-ből 5 kell, hogy 10 dl legyen. Ezért a 2 dl a 10 dl 1 ötöde.'
  },
  {
    id: 'frp-g3-q29',
    level: 3,
    questionTypeBadge: 'Az egész',
    figure: <One t={PIE(3)} k={3} color="#f97316" />,
    question: 'Melyik igaz?',
    options: ['3 harmad = 1 egész', '3 harmad = 1 harmad', '2 negyed = 1 egész', '5 ötöd = 1 ötöd'],
    correctAnswer: 0,
    explanation: 'Ha mind a 3 harmad színes, az egész kör színes. 3 harmad = 1 egész.'
  },
  {
    id: 'frp-g3-q30',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: (
      <QFig h={150}>
        <Pie cx={120} cy={75} r={60} bounds={equalAngles(4)} cake />
      </QFig>
    ),
    question: 'A tortát 4 egyenlő szeletre vágtuk. Te 1 szeletet ettél, a testvéred 2 szeletet. Hányad része fogyott el?',
    options: ['3 negyed', '2 negyed', '1 negyed', '3 harmad'],
    correctAnswer: 0,
    explanation: '1 + 2 = 3 szelet fogyott el. 4 egyenlő részből 3: 3 negyed.'
  }
];

export const FractionPartsG3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={3}
      chapterId="tortes-szamok"
      topicId="g3-frac-tortreszek-quiz"
      subtopicId="kozonseges-tortek"
      title="2. Törtrészek: fele, harmada, negyede – Kvíz"
      subtitle="30 feladat 3 szinten: a rész neve, 3 negyed, az egész, melyik nagyobb."
      badge="3. OSZTÁLY • XIV. ISMERKEDÉS A TÖRTEKKEL • KVÍZ"
      questions={FRACTION_PARTS_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'A rész neve',
          items: ['Hány egyenlő rész az egész? → a név.', '2: ketted (fele), 3: harmad, 4: negyed', '5: ötöd, 6: hatod, 8: nyolcad, 10: tized']
        },
        {
          title: 'Több rész',
          items: ['Hány rész színes? → a szám.', '4 részből 3 színes: 3 negyed.', '4 negyed = 1 egész.']
        },
        {
          title: 'Melyik nagyobb?',
          items: ['Ugyanakkora egészeket hasonlíts!', 'Több részre vágva kisebb 1 rész.', '1 ketted > 1 harmad > 1 negyed']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={<FractionPartsG3Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />}
      sorterComponent={<FractionPartsG3Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />}
    />
  );
};

export default FractionPartsG3Quiz;

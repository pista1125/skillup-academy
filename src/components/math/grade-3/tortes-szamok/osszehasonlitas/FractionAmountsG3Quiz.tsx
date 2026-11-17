import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { FractionAmountsG3Matcher } from './FractionAmountsG3Matcher';
import { FractionAmountsG3Sorter } from './FractionAmountsG3Sorter';
import { QFig, ObjRows, Strip, ClockPie, Jug, SegmentRuler, Road, UNK } from './FractionAmountsG3Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const Objs: React.FC<{ n: number; k: number; kind?: 'apple' | 'candy'; faded?: number }> = ({ n, k, kind = 'apple', faded = 0 }) => {
  const m = n / k;
  const gap = Math.min(26, 190 / m);
  const rowGap = Math.min(30, 110 / k);
  const r = Math.min(9, gap / 2 - 2, rowGap / 2 - 3);
  const x = 120 - ((m - 1) * gap) / 2;
  const y = 75 - ((k - 1) * rowGap) / 2;
  return (
    <QFig h={150}>
      <ObjRows x={x} y={y} n={n} k={k} gap={gap} rowGap={rowGap} r={r} kind={kind} fadedRows={faded} />
    </QFig>
  );
};

const OneStrip: React.FC<{ top: string; n: number; fill?: number[]; cross?: number[]; labels?: (string | null)[] }> = ({ top, n, fill = [0], cross, labels }) => (
  <QFig h={100}>
    <Strip x={20} y={46} w={200} h={36} n={n} fill={fill} cross={cross} labels={labels ?? ['?']} top={top} color="#fbbf24" />
  </QFig>
);

const OneClock: React.FC<{ n: number; shade: number }> = ({ n, shade }) => (
  <QFig h={150}>
    <ClockPie cx={120} cy={75} r={62} n={n} shade={shade} />
  </QFig>
);

const QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'fam-g3-q1',
    level: 1,
    questionTypeBadge: 'Fele',
    figure: <Objs n={8} k={2} />,
    question: 'Mennyi a 8 alma fele?',
    options: ['4', '2', '6', '16'],
    correctAnswer: 0,
    explanation: '2 egyenlő sorba tetted a 8 almát. Egy sorban 4 van. 8 : 2 = 4.'
  },
  {
    id: 'fam-g3-q2',
    level: 1,
    questionTypeBadge: 'Harmada',
    figure: <Objs n={12} k={3} kind="candy" />,
    question: 'Mennyi a 12 cukorka harmada?',
    options: ['4', '3', '9', '6'],
    correctAnswer: 0,
    explanation: '3 egyenlő sor van, egy sorban 4 cukorka. 12 : 3 = 4.'
  },
  {
    id: 'fam-g3-q3',
    level: 1,
    questionTypeBadge: 'Negyede',
    figure: <Objs n={12} k={4} />,
    question: 'Mennyi a 12 alma negyede?',
    options: ['3', '4', '8', '6'],
    correctAnswer: 0,
    explanation: '4 egyenlő sor van, egy sorban 3 alma. 12 : 4 = 3.'
  },
  {
    id: 'fam-g3-q4',
    level: 1,
    questionTypeBadge: 'Fele',
    question: 'Mennyi a 20 fele?',
    options: ['10', '18', '40', '5'],
    correctAnswer: 0,
    explanation: 'Fele: osztás 2-vel. 20 : 2 = 10.'
  },
  {
    id: 'fam-g3-q5',
    level: 1,
    questionTypeBadge: 'Ötöde',
    figure: <OneStrip top="15" n={5} />,
    question: 'A csík 15-öt ér. Mennyi a 15 ötöde?',
    options: ['3', '5', '10', '12'],
    correctAnswer: 0,
    explanation: '5 egyenlő rész van. 15 : 5 = 3. Egy rész 3.'
  },
  {
    id: 'fam-g3-q6',
    level: 1,
    questionTypeBadge: 'Harmada',
    question: 'Mennyi a 30 harmada?',
    options: ['10', '27', '3', '15'],
    correctAnswer: 0,
    explanation: 'Harmada: osztás 3-mal. 30 : 3 = 10.'
  },
  {
    id: 'fam-g3-q7',
    level: 1,
    questionTypeBadge: 'Idő',
    figure: <OneClock n={2} shade={30} />,
    question: 'Az 1 órát 2 egyenlő részre osztottuk. Hány perc a fél óra?',
    options: ['30 perc', '50 perc', '20 perc', '15 perc'],
    correctAnswer: 0,
    explanation: '1 óra = 60 perc. 60 : 2 = 30. A fél óra 30 perc.'
  },
  {
    id: 'fam-g3-q8',
    level: 1,
    questionTypeBadge: 'Űrtartalom',
    figure: (
      <QFig h={150}>
        <Jug x={97} y={28} w={46} h={110} level={5} top="1 l" nums />
      </QFig>
    ),
    question: 'Az 1 literes edény félig van vízzel. Hány dl víz van benne?',
    options: ['5 dl', '2 dl', '50 dl', '10 dl'],
    correctAnswer: 0,
    explanation: '1 l = 10 dl. A fele: 10 : 2 = 5. Tehát 5 dl.'
  },
  {
    id: 'fam-g3-q9',
    level: 1,
    questionTypeBadge: 'Tizede',
    question: 'Mennyi a 40 tizede?',
    options: ['4', '30', '10', '400'],
    correctAnswer: 0,
    explanation: 'Tizede: osztás 10-zel. 40 : 10 = 4.'
  },
  {
    id: 'fam-g3-q10',
    level: 1,
    questionTypeBadge: 'Ötöde',
    figure: <Objs n={10} k={5} kind="candy" />,
    question: 'Mennyi a 10 cukorka ötöde?',
    options: ['2', '5', '8', '10'],
    correctAnswer: 0,
    explanation: '5 egyenlő sor van, egy sorban 2 cukorka. 10 : 5 = 2.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'fam-g3-q11',
    level: 2,
    questionTypeBadge: 'Tömeg',
    figure: <OneStrip top="1 kg = 100 dkg" n={4} />,
    question: 'Hány dkg a negyed kg kenyér?',
    options: ['25 dkg', '4 dkg', '40 dkg', '75 dkg'],
    correctAnswer: 0,
    explanation: 'Előbb válts át: 1 kg = 100 dkg. Aztán: 100 : 4 = 25. A negyed kg 25 dkg.'
  },
  {
    id: 'fam-g3-q12',
    level: 2,
    questionTypeBadge: 'Hosszúság',
    figure: <OneStrip top="1 m = 100 cm" n={5} />,
    question: 'Az 1 m-es léc ötödét levágod. Hány cm-t vágsz le?',
    options: ['20 cm', '5 cm', '50 cm', '80 cm'],
    correctAnswer: 0,
    explanation: '1 m = 100 cm. 100 : 5 = 20. Tehát 20 cm-t vágsz le.'
  },
  {
    id: 'fam-g3-q13',
    level: 2,
    questionTypeBadge: 'Idő',
    figure: <OneClock n={4} shade={15} />,
    question: 'Hány perc a negyed óra?',
    options: ['15 perc', '4 perc', '25 perc', '45 perc'],
    correctAnswer: 0,
    explanation: '1 óra = 60 perc. 60 : 4 = 15. A negyed óra 15 perc.'
  },
  {
    id: 'fam-g3-q14',
    level: 2,
    questionTypeBadge: 'Idő',
    figure: <OneClock n={3} shade={20} />,
    question: 'Hány perc az 1 óra harmada?',
    options: ['20 perc', '3 perc', '30 perc', '40 perc'],
    correctAnswer: 0,
    explanation: '60 perc : 3 = 20 perc.'
  },
  {
    id: 'fam-g3-q15',
    level: 2,
    questionTypeBadge: 'Űrtartalom',
    question: 'Hány cl az 1 dl fele?',
    options: ['5 cl', '50 cl', '2 cl', '20 cl'],
    correctAnswer: 0,
    explanation: '1 dl = 10 cl. 10 : 2 = 5. Tehát 5 cl.'
  },
  {
    id: 'fam-g3-q16',
    level: 2,
    questionTypeBadge: 'Tizede',
    figure: <OneStrip top="600" n={10} />,
    question: 'A csík 600-at ér. Mennyi a 600 tizede?',
    options: ['60', '6', '590', '50'],
    correctAnswer: 0,
    explanation: '600 : 10 = 60. Egy rész 60.'
  },
  {
    id: 'fam-g3-q17',
    level: 2,
    questionTypeBadge: 'Fele',
    question: 'Mennyi a 360 fele?',
    options: ['180', '358', '160', '720'],
    correctAnswer: 0,
    explanation: '360 : 2 = 180. Gondolj így: 300 fele 150, 60 fele 30, együtt 180.'
  },
  {
    id: 'fam-g3-q18',
    level: 2,
    questionTypeBadge: 'Szakasz',
    figure: (
      <QFig h={105}>
        <SegmentRuler x={32} y={42} cm={8} u={22} />
        <text x={120} y={22} textAnchor="middle" fontSize="14" fontWeight="bold" fill={UNK}>fele = ?</text>
      </QFig>
    ),
    question: 'Mérd meg a szakaszt! Milyen hosszú a fele?',
    options: ['4 cm', '6 cm', '2 cm', '16 cm'],
    correctAnswer: 0,
    explanation: 'A szakasz 8 cm. A fele: 8 : 2 = 4 cm.'
  },
  {
    id: 'fam-g3-q19',
    level: 2,
    questionTypeBadge: 'Melyik több?',
    figure: (
      <QFig h={150}>
        <Strip x={20} y={30} w={200} h={26} n={2} fill={[0]} color="#fbbf24" />
        <Strip x={20} y={72} w={200} h={26} n={3} fill={[0]} color="#86efac" />
        <Strip x={20} y={114} w={200} h={26} n={4} fill={[0]} color="#93c5fd" />
      </QFig>
    ),
    question: 'Melyik a legtöbb?',
    options: ['a 24 fele', 'a 24 harmada', 'a 24 negyede', 'mind egyenlő'],
    correctAnswer: 0,
    explanation: 'Fele: 24 : 2 = 12. Harmada: 8. Negyede: 6. Minél kevesebb részre osztasz, annál nagyobb egy rész.'
  },
  {
    id: 'fam-g3-q20',
    level: 2,
    questionTypeBadge: 'Negyede',
    question: 'Mennyi a 240 negyede?',
    options: ['60', '236', '80', '120'],
    correctAnswer: 0,
    explanation: '240 : 4 = 60. Vagy: a fele 120, annak a fele 60.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'fam-g3-q21',
    level: 3,
    questionTypeBadge: 'Egymás felé',
    figure: (
      <QFig h={110}>
        <Road x={20} y={58} w={200} n={4} a={2} b={1} total="800 m" />
      </QFig>
    ),
    question: 'Egy 800 m-es út két végéről indultok. Te a felét, a barátod a negyedét tette meg. Milyen messze vagytok egymástól?',
    options: ['200 m', '600 m', '400 m', '100 m'],
    correctAnswer: 0,
    explanation: 'Fele: 400 m. Negyede: 200 m. Együtt 600 m. Ami még hiányzik: 800 − 600 = 200 m.'
  },
  {
    id: 'fam-g3-q22',
    level: 3,
    questionTypeBadge: 'Mennyi maradt?',
    figure: <OneStrip top="1 kg = 100 dkg" n={10} fill={[]} cross={[0]} labels={[]} />,
    question: 'Van 1 kg lisztünk. A tizedét felhasználtuk. Hány dkg maradt?',
    options: ['90 dkg', '10 dkg', '9 dkg', '99 dkg'],
    correctAnswer: 0,
    explanation: '1 kg = 100 dkg. A tizede 100 : 10 = 10 dkg. Maradt: 100 − 10 = 90 dkg.'
  },
  {
    id: 'fam-g3-q23',
    level: 3,
    questionTypeBadge: 'Az egész',
    figure: <OneStrip top="?" n={2} labels={['6 cm', null]} />,
    question: 'Egy szakasz fele 6 cm. Milyen hosszú az egész szakasz?',
    options: ['12 cm', '3 cm', '8 cm', '6 cm'],
    correctAnswer: 0,
    explanation: 'Az egész 2 ilyen részből áll. 2 · 6 = 12 cm.'
  },
  {
    id: 'fam-g3-q24',
    level: 3,
    questionTypeBadge: 'Az egész',
    figure: <OneStrip top="?" n={3} labels={['5 cm', null, null]} fill={[0]} />,
    question: 'Egy szakasz harmada 5 cm. Milyen hosszú az egész szakasz?',
    options: ['15 cm', '8 cm', '10 cm', '20 cm'],
    correctAnswer: 0,
    explanation: 'Az egész 3 ilyen részből áll. 3 · 5 = 15 cm.'
  },
  {
    id: 'fam-g3-q25',
    level: 3,
    questionTypeBadge: 'Idő',
    question: '2 órád van játszani. A hatodát rajzolással töltöd. Hány percig rajzolsz?',
    options: ['20 perc', '12 perc', '30 perc', '10 perc'],
    correctAnswer: 0,
    explanation: '2 óra = 120 perc. 120 : 6 = 20 perc.'
  },
  {
    id: 'fam-g3-q26',
    level: 3,
    questionTypeBadge: 'Két lépés',
    figure: <Objs n={18} k={2} faded={1} />,
    question: '18 mandarin volt. A felét megettétek. A maradék harmadát odaadod. Hány mandarin marad?',
    options: ['6', '3', '9', '12'],
    correctAnswer: 0,
    explanation: 'Fele: 18 : 2 = 9, ennyi maradt. Ennek a harmada 9 : 3 = 3. Marad: 9 − 3 = 6.'
  },
  {
    id: 'fam-g3-q27',
    level: 3,
    questionTypeBadge: 'Mennyivel több?',
    question: 'Egy 1 m-es szalag felét Panni, az ötödét Bálint kapja. Hány cm-rel kap többet Panni?',
    options: ['30 cm', '70 cm', '3 cm', '20 cm'],
    correctAnswer: 0,
    explanation: 'Fele: 100 : 2 = 50 cm. Ötöde: 100 : 5 = 20 cm. 50 − 20 = 30 cm.'
  },
  {
    id: 'fam-g3-q28',
    level: 3,
    questionTypeBadge: 'Mértékváltás',
    question: 'A palacsintába két és fél dl tejet öntesz. Hány cl ez?',
    options: ['25 cl', '250 cl', '20 cl', '52 cl'],
    correctAnswer: 0,
    explanation: '1 dl = 10 cl. 2 dl = 20 cl. Fél dl = 5 cl. Együtt 25 cl.'
  },
  {
    id: 'fam-g3-q29',
    level: 3,
    questionTypeBadge: 'Idő',
    figure: (
      <QFig h={130}>
        <ClockPie cx={70} cy={65} r={48} shade={60} />
        <text x={124} y={72} textAnchor="middle" fontSize="22" fontWeight="bold" fill="#0f172a">+</text>
        <ClockPie cx={176} cy={65} r={48} n={2} shade={30} />
      </QFig>
    ),
    question: 'A süti 1 és fél óra alatt sül meg. Hány perc ez?',
    options: ['90 perc', '150 perc', '65 perc', '30 perc'],
    correctAnswer: 0,
    explanation: '1 óra = 60 perc. Fél óra = 30 perc. 60 + 30 = 90 perc.'
  },
  {
    id: 'fam-g3-q30',
    level: 3,
    questionTypeBadge: 'Egymás felé',
    figure: (
      <QFig h={110}>
        <Road x={20} y={58} w={200} n={10} a={1} b={2} total="1000 m" />
      </QFig>
    ),
    question: 'Az 1000 m-es út két végéről indultok. Te a tizedét, a barátod az ötödét tette meg. Milyen messze vagytok egymástól?',
    options: ['700 m', '300 m', '900 m', '800 m'],
    correctAnswer: 0,
    explanation: 'Tizede: 100 m. Ötöde: 200 m. Együtt 300 m. 1000 − 300 = 700 m.'
  }
];

export const FRACTION_AMOUNTS_G3_QUESTIONS: QuizQuestion[] = QUESTIONS;

export const FractionAmountsG3Quiz: React.FC<{
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
      topicId="g3-frac-mennyisegek-quiz"
      subtopicId="osszehasonlitas"
      title="3. Törtrész mennyiségekből – Kvíz"
      subtitle="30 feladat 3 szinten: fele, harmada, negyede, ötöde, tizede; kg, m, l, óra; szakaszok, egymás felé."
      badge="3. OSZTÁLY • XIV. ISMERKEDÉS A TÖRTEKKEL • KVÍZ"
      questions={FRACTION_AMOUNTS_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'Része = osztás',
          items: ['Fele: : 2. Harmada: : 3. Negyede: : 4.', 'Ötöde: : 5. Hatoda: : 6. Tizede: : 10.', 'a 12 negyede: 12 : 4 = 3']
        },
        {
          title: 'Előbb válts át!',
          items: ['1 kg = 100 dkg, 1 m = 100 cm', '1 l = 10 dl, 1 dl = 10 cl', '1 óra = 60 perc']
        },
        {
          title: 'Visszafelé',
          items: ['Ha a fele 6, az egész 2 · 6 = 12.', 'Ha a harmada 5, az egész 3 · 5 = 15.', 'Mennyi maradt? Az egészből vond ki a részt!']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={<FractionAmountsG3Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />}
      sorterComponent={<FractionAmountsG3Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />}
    />
  );
};

export default FractionAmountsG3Quiz;

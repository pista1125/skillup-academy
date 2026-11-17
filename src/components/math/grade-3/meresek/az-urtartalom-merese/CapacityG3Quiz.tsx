import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { CapacityG3Matcher } from './CapacityG3Matcher';
import { CapacityG3Sorter } from './CapacityG3Sorter';
import { FONT, UNK, BigJug, ClBarChart, DRINK } from './CapacityG3Parts';
import { Ico, JugIcon, GlassIcon, CupIcon, BottleIcon, BucketIcon, MugIcon } from '../mit-mivel-merunk/WhatToMeasureG3Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 150 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

const BigText: React.FC<{ text: string }> = ({ text }) => (
  <QFig h={80}>
    <text x="120" y="48" textAnchor="middle" fontSize="19" fontWeight="bold" fill="#0f172a">{text}</text>
  </QFig>
);

const One: React.FC<{ children: React.ReactNode; s?: number }> = ({ children, s = 1.15 }) => (
  <QFig h={140}>
    <Ico x={120 - 50 * s} y={70 - 50 * s} s={s}>
      {children}
    </Ico>
  </QFig>
);

/** Kis kancsó 10 vonallal (vonal = 1 dl). */
const SmallJug: React.FC<{ dl: number }> = ({ dl }) => (
  <QFig h={160}>
    <Ico x={34} y={12} s={1.36}>
      <JugIcon fill={dl} showTop />
    </Ico>
    <text x="54" y="25" textAnchor="end" fontSize="12" fontWeight="bold" fill={UNK}>1 l</text>
    <text x="200" y="74" textAnchor="middle" fontSize="11" fill="#334155">1 vonal</text>
    <text x="200" y="89" textAnchor="middle" fontSize="11" fill="#334155">= 1 dl</text>
  </QFig>
);

const Jug: React.FC<{ cl: number; q?: number; labels?: boolean }> = ({ cl, q, labels = true }) => (
  <QFig h={190}>
    <BigJug x={62} y={14} cl={cl} qFrom={q} labels={labels} />
  </QFig>
);

const Chart: React.FC<{ q?: number }> = ({ q }) => (
  <QFig h={170}>
    <ClBarChart data={DRINK} max={50} x={36} y={18} h={120} bw={30} gap={15} showQ={q} />
  </QFig>
);

/** Feliratos edények egy sorban. */
const Row: React.FC<{ items: { art: React.ReactNode; label: string }[]; h?: number }> = ({ items, h = 130 }) => {
  const w = 240 / items.length;
  const s = items.length > 3 ? 0.56 : 0.66;
  return (
    <QFig h={h}>
      {items.map((it, i) => (
        <g key={i}>
          <Ico x={i * w + w / 2 - 50 * s} y={12} s={s}>
            {it.art}
          </Ico>
          <text x={i * w + w / 2} y={h - 16} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">{it.label}</text>
        </g>
      ))}
    </QFig>
  );
};

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const CAPACITY_G3_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'cap-g3-q1',
    level: 1,
    questionTypeBadge: 'Mértékváltás',
    figure: (
      <QFig h={120}>
        <Ico x={8} y={16} s={0.84}>
          <BottleIcon label="1 l" fs={20} />
        </Ico>
        <text x="100" y="72" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0f172a">=</text>
        <text x="160" y="58" textAnchor="middle" fontSize="28" fontWeight="bold" fill={UNK}>? dl</text>
      </QFig>
    ),
    question: 'Hány deciliter 1 liter?',
    options: ['10 dl', '100 dl', '1 dl', '5 dl'],
    correctAnswer: 0,
    explanation: '1 l = 10 dl. Tíz 1 dl-es pohár tölt meg egy 1 l-es palackot.'
  },
  {
    id: 'cap-g3-q2',
    level: 1,
    questionTypeBadge: 'Mértékváltás',
    figure: <BigText text="1 dl = ? cl" />,
    question: 'Hány centiliter 1 deciliter?',
    options: ['10 cl', '100 cl', '1 cl', '5 cl'],
    correctAnswer: 0,
    explanation: '1 dl = 10 cl. A cl tízszer kisebb, mint a dl.'
  },
  {
    id: 'cap-g3-q3',
    level: 1,
    questionTypeBadge: 'Mértékváltás',
    figure: <BigText text="1 l = ? cl" />,
    question: 'Hány centiliter 1 liter?',
    options: ['100 cl', '10 cl', '1000 cl', '50 cl'],
    correctAnswer: 0,
    explanation: '1 l = 10 dl, és 1 dl = 10 cl. Így 1 l = 100 cl.'
  },
  {
    id: 'cap-g3-q4',
    level: 1,
    questionTypeBadge: 'Leolvasás',
    figure: <SmallJug dl={6} />,
    question: 'Mennyi víz van a kancsóban?',
    options: ['6 dl', '4 dl', '6 l', '60 dl'],
    correctAnswer: 0,
    explanation: 'Alulról számolj! A víz a 6. vonalig ér. Egy vonal 1 dl, ez 6 dl.'
  },
  {
    id: 'cap-g3-q5',
    level: 1,
    questionTypeBadge: 'Becslés',
    figure: (
      <One>
        <CupIcon />
      </One>
    ),
    question: 'Mennyi kávé fér egy kis kávéscsészébe?',
    options: ['6 cl', '6 l', '60 l', '6 kg'],
    correctAnswer: 0,
    explanation: 'Egy kis kávéscsészébe kevés fér: kb. 6 cl. Ezért kell a kicsi mértékegység, a cl.'
  },
  {
    id: 'cap-g3-q6',
    level: 1,
    questionTypeBadge: 'Mértékegység',
    question: 'Melyik a legkisebb mértékegység?',
    options: ['cl', 'dl', 'l', 'mindhárom egyforma'],
    correctAnswer: 0,
    explanation: 'A cl a legkisebb. 10 cl = 1 dl, és 10 dl = 1 l.'
  },
  {
    id: 'cap-g3-q7',
    level: 1,
    questionTypeBadge: 'Becslés',
    figure: (
      <One>
        <BucketIcon />
      </One>
    ),
    question: 'Mennyi víz fér egy vödörbe?',
    options: ['10 l', '10 cl', '10 dl', '100 l'],
    correctAnswer: 0,
    explanation: 'Egy vödörbe kb. 10 l víz fér. 10 cl csak egy kis pohárka!'
  },
  {
    id: 'cap-g3-q8',
    level: 1,
    questionTypeBadge: 'Összeadás',
    figure: (
      <Row
        items={[
          { art: <GlassIcon color="#7dd3fc" />, label: '1 dl' },
          { art: <GlassIcon color="#7dd3fc" />, label: '1 dl' },
          { art: <GlassIcon color="#7dd3fc" />, label: '1 dl' }
        ]}
      />
    ),
    question: 'Mennyi víz van a 3 pohárban együtt?',
    options: ['3 dl', '30 dl', '3 l', '1 dl'],
    correctAnswer: 0,
    explanation: '1 dl + 1 dl + 1 dl = 3 dl.'
  },
  {
    id: 'cap-g3-q9',
    level: 1,
    questionTypeBadge: 'Mértékváltás',
    question: '2 l = ? dl',
    options: ['20 dl', '2 dl', '200 dl', '12 dl'],
    correctAnswer: 0,
    explanation: '1 l = 10 dl. 2 l = 10 dl + 10 dl = 20 dl.'
  },
  {
    id: 'cap-g3-q10',
    level: 1,
    questionTypeBadge: 'Becslés',
    figure: (
      <Row
        items={[
          { art: <CupIcon />, label: 'csésze' },
          { art: <MugIcon />, label: 'bögre' },
          { art: <BottleIcon />, label: 'palack' }
        ]}
      />
    ),
    question: 'Melyik edénybe fér kb. 1 l?',
    options: ['a palackba', 'a csészébe', 'a bögrébe', 'egyikbe sem'],
    correctAnswer: 0,
    explanation: 'A csészébe néhány cl, a bögrébe néhány dl fér. Az 1 l a palackba fér.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'cap-g3-q11',
    level: 2,
    questionTypeBadge: 'Mértékváltás',
    question: '30 cl = ? dl',
    options: ['3 dl', '30 dl', '300 dl', '13 dl'],
    correctAnswer: 0,
    explanation: '10 cl = 1 dl. A 30 cl-ben háromszor van meg a 10 cl, ez 3 dl.'
  },
  {
    id: 'cap-g3-q12',
    level: 2,
    questionTypeBadge: 'Mértékváltás',
    figure: <BigText text="1 l 4 dl = ? dl" />,
    question: '1 l 4 dl hány dl?',
    options: ['14 dl', '5 dl', '104 dl', '140 dl'],
    correctAnswer: 0,
    explanation: '1 l = 10 dl. 10 dl + 4 dl = 14 dl.'
  },
  {
    id: 'cap-g3-q13',
    level: 2,
    questionTypeBadge: 'Mértékváltás',
    figure: <BigText text="1 l 25 cl = ? cl" />,
    question: '1 l 25 cl hány cl?',
    options: ['125 cl', '26 cl', '1025 cl', '152 cl'],
    correctAnswer: 0,
    explanation: '1 l = 100 cl. 100 cl + 25 cl = 125 cl.'
  },
  {
    id: 'cap-g3-q14',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    figure: <BigText text="8 dl  ○  1 l" />,
    question: 'Melyik jel kerül a körbe?',
    options: ['<', '>', '=', 'nem lehet összehasonlítani'],
    correctAnswer: 0,
    explanation: '1 l = 10 dl. 8 dl < 10 dl. A 8 nagyobb szám, mégis az 1 l a több!'
  },
  {
    id: 'cap-g3-q15',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    figure: (
      <Row
        items={[
          { art: <BottleIcon color="#fecaca" />, label: '60 cl' },
          { art: <BottleIcon />, label: '5 dl' }
        ]}
      />
    ),
    question: 'Melyik palackba fér több?',
    options: ['a 60 cl-esbe', 'az 5 dl-esbe', 'egyformák', 'nem lehet összehasonlítani'],
    correctAnswer: 0,
    explanation: '5 dl = 50 cl. 60 cl > 50 cl, tehát a 60 cl-es palackba fér több.'
  },
  {
    id: 'cap-g3-q16',
    level: 2,
    questionTypeBadge: 'Leolvasás',
    figure: <Jug cl={70} />,
    question: 'Hány cl víz van a kancsóban?',
    options: ['70 cl', '7 cl', '700 cl', '30 cl'],
    correctAnswer: 0,
    explanation: 'A víz a 7 dl-es vonalig ér. 7 dl = 70 cl.'
  },
  {
    id: 'cap-g3-q17',
    level: 2,
    questionTypeBadge: 'Diagram',
    figure: <Chart q={0} />,
    question: 'Hány cl almalé kell a gyümölcsitalhoz?',
    options: ['40 cl', '4 cl', '50 cl', '30 cl'],
    correctAnswer: 0,
    explanation: 'Az almalé oszlopa a 40-es vonalig ér. Ez 40 cl.'
  },
  {
    id: 'cap-g3-q18',
    level: 2,
    questionTypeBadge: 'Diagram',
    figure: <Chart q={1} />,
    question: 'Hány dl narancslé kell?',
    options: ['3 dl', '30 dl', '3 cl', '4 dl'],
    correctAnswer: 0,
    explanation: 'A narancslé 30 cl. 10 cl = 1 dl, ezért 30 cl = 3 dl.'
  },
  {
    id: 'cap-g3-q19',
    level: 2,
    questionTypeBadge: 'Mértékváltás',
    question: 'Melyik egyenlő 1 l-rel?',
    options: ['100 cl', '10 cl', '1 dl', '100 dl'],
    correctAnswer: 0,
    explanation: '1 l = 10 dl = 100 cl. A 100 dl már 10 l lenne.'
  },
  {
    id: 'cap-g3-q20',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    figure: (
      <Row
        items={[
          { art: <BottleIcon color="#99f6e4" />, label: '4 dl tea' },
          { art: <CupIcon />, label: '5 cl' }
        ]}
      />
    ),
    question: 'A termoszban 4 dl tea van. Egy csészébe 5 cl-t töltesz. Hány csésze lesz?',
    options: ['8', '20', '4', '80'],
    correctAnswer: 0,
    explanation: '4 dl = 40 cl. 40 cl-ben az 5 cl nyolcszor van meg: 40 : 5 = 8.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'cap-g3-q21',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <SmallJug dl={10} />,
    question: 'A kancsóban 1 l kakaó van. Kiöntesz 3 dl-t. Hány cl kakaó marad?',
    options: ['70 cl', '7 cl', '97 cl', '30 cl'],
    correctAnswer: 0,
    explanation: '1 l = 10 dl. 10 dl − 3 dl = 7 dl. 7 dl = 70 cl.'
  },
  {
    id: 'cap-g3-q22',
    level: 3,
    questionTypeBadge: 'Mennyi hiányzik?',
    figure: <Jug cl={45} q={45} labels={false} />,
    question: 'A kancsóban 45 cl víz van. Mennyi kell még, hogy 1 l legyen?',
    options: ['55 cl', '65 cl', '45 cl', '5 cl'],
    correctAnswer: 0,
    explanation: '1 l = 100 cl. 45 + 55 = 100. Még 55 cl kell.'
  },
  {
    id: 'cap-g3-q23',
    level: 3,
    questionTypeBadge: 'Fejtörő',
    figure: (
      <Row
        items={[
          { art: <BottleIcon label="1 l" fs={18} />, label: 'benne 70 cl' },
          { art: <GlassIcon color="#7dd3fc" />, label: '+ 50 cl' }
        ]}
      />
    ),
    question: 'Az 1 l-es üvegben 70 cl víz van. Beleöntesz még 50 cl-t. Mennyi víz lesz az üvegben?',
    options: ['1 l, a többi kifolyik', '120 cl', '50 cl', '70 cl'],
    correctAnswer: 0,
    explanation: '70 + 50 = 120 cl lenne. De az üvegbe csak 1 l = 100 cl fér. 20 cl kifolyik.'
  },
  {
    id: 'cap-g3-q24',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: (
      <Row
        items={[
          { art: <BucketIcon />, label: 'vödör' },
          { art: <BottleIcon />, label: '2 l' },
          { art: <BottleIcon color="#bbf7d0" />, label: '15 dl' }
        ]}
      />
    ),
    question: 'A vödörbe öntesz 2 l vizet, aztán még 15 dl-t. Hány dl víz van a vödörben?',
    options: ['35 dl', '17 dl', '215 dl', '30 dl'],
    correctAnswer: 0,
    explanation: '2 l = 20 dl. 20 dl + 15 dl = 35 dl.'
  },
  {
    id: 'cap-g3-q25',
    level: 3,
    questionTypeBadge: 'Diagram',
    figure: <Chart />,
    question: 'Mennyi gyümölcsital lesz összesen?',
    options: ['1 l', '90 cl', '10 l', '1 dl'],
    correctAnswer: 0,
    explanation: '40 + 30 + 20 + 10 = 100 cl. 100 cl = 1 l.'
  },
  {
    id: 'cap-g3-q26',
    level: 3,
    questionTypeBadge: 'Sorba rendezés',
    figure: (
      <Row
        items={[
          { art: <BottleIcon />, label: '2 l' },
          { art: <BottleIcon color="#fecaca" />, label: '150 cl' },
          { art: <BottleIcon color="#bbf7d0" />, label: '18 dl' },
          { art: <BottleIcon color="#fde68a" />, label: '90 cl' }
        ]}
      />
    ),
    question: 'Melyik a jó sorrend a legtöbbtől a legkevesebbig?',
    options: ['2 l, 18 dl, 150 cl, 90 cl', '18 dl, 2 l, 150 cl, 90 cl', '150 cl, 90 cl, 18 dl, 2 l', '2 l, 150 cl, 18 dl, 90 cl'],
    correctAnswer: 0,
    explanation: 'Mind cl-ben: 2 l = 200 cl, 18 dl = 180 cl, 150 cl, 90 cl. Sorban: 200, 180, 150, 90.'
  },
  {
    id: 'cap-g3-q27',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Egy pohárba 2 dl fér. Hány pohár kell 1 l 4 dl limonádéhoz?',
    options: ['7', '5', '14', '6'],
    correctAnswer: 0,
    explanation: '1 l 4 dl = 14 dl. 14 : 2 = 7. Tehát 7 pohár kell.'
  },
  {
    id: 'cap-g3-q28',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'A cica naponta 2 dl vizet iszik. Mennyit iszik egy hét alatt?',
    options: ['1 l 4 dl', '9 dl', '1 l 2 dl', '14 l'],
    correctAnswer: 0,
    explanation: 'Egy hét 7 nap. 7 · 2 dl = 14 dl. 14 dl = 10 dl + 4 dl = 1 l 4 dl.'
  },
  {
    id: 'cap-g3-q29',
    level: 3,
    questionTypeBadge: 'Fejtörő',
    figure: (
      <Row
        items={[
          { art: <GlassIcon color="#f87171" />, label: '38 cl' },
          { art: <GlassIcon color="#7dd3fc" />, label: '47 cl' },
          { art: <JugIcon fill={0} ticks={8} />, label: '8 dl' }
        ]}
      />
    ),
    question: '38 cl szörpöt és 47 cl vizet öntesz egy 8 dl-es kancsóba. Belefér?',
    options: ['Nem, 5 cl kifolyik.', 'Igen, és 5 cl hely marad.', 'Igen, pontosan tele lesz.', 'Nem, 15 cl kifolyik.'],
    correctAnswer: 0,
    explanation: '38 + 47 = 85 cl. 8 dl = 80 cl. 85 − 80 = 5. Nem fér bele, 5 cl kifolyik.'
  },
  {
    id: 'cap-g3-q30',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    figure: <BigText text="1 l 50 cl  ○  15 dl" />,
    question: 'Melyik jel kerül a körbe?',
    options: ['=', '<', '>', 'nem lehet összehasonlítani'],
    correctAnswer: 0,
    explanation: '1 l 50 cl = 150 cl. 15 dl = 150 cl. A kettő egyenlő.'
  }
];

export const CapacityG3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={3}
      chapterId="meresek"
      topicId="g3-meas-urtartalom-quiz"
      subtopicId="az-urtartalom-merese"
      title="3. Az űrtartalom mérése – Kvíz"
      subtitle="30 feladat 3 szinten: l, dl és cl, átváltás, leolvasás, összehasonlítás, szöveges feladatok."
      badge="3. OSZTÁLY • IV. MÉRÉSEK • KVÍZ"
      questions={CAPACITY_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'l, dl, cl',
          items: ['1 l = 10 dl', '1 dl = 10 cl', '1 l = 100 cl']
        },
        {
          title: 'Átváltás',
          items: ['1 l 4 dl = 14 dl', '1 l 25 cl = 125 cl', '60 cl = 6 dl']
        },
        {
          title: 'Mennyi fér bele?',
          items: ['kávéscsésze: néhány cl', 'pohár, bögre: néhány dl', 'palack, vödör: liter']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={<CapacityG3Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />}
      sorterComponent={<CapacityG3Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />}
    />
  );
};

export default CapacityG3Quiz;

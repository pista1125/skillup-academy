import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { WhatToMeasureG3Matcher } from './WhatToMeasureG3Matcher';
import { WhatToMeasureG3Sorter } from './WhatToMeasureG3Sorter';
import {
  FONT,
  UNK,
  Ico,
  RulerIcon,
  BalanceIcon,
  BathScaleIcon,
  JugIcon,
  GlassIcon,
  MugIcon,
  BottleIcon,
  BucketIcon,
  TubIcon,
  PencilIcon,
  DoorIcon,
  MelonIcon,
  AppleIcon,
  ChildIcon,
  SackIcon,
  CanIcon,
  Weight
} from './WhatToMeasureG3Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 150 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** Egy nagy ikon középen. */
const One: React.FC<{ children: React.ReactNode; s?: number }> = ({ children, s = 1.15 }) => (
  <QFig h={140}>
    <Ico x={120 - 50 * s} y={70 - 50 * s} s={s}>
      {children}
    </Ico>
  </QFig>
);

/** Kancsó 10 vonallal, a vonal = 1 dl. */
const JugFig: React.FC<{ fill: number }> = ({ fill }) => (
  <QFig h={160}>
    <Ico x={34} y={12} s={1.36}>
      <JugIcon fill={fill} showTop />
    </Ico>
    <text x="54" y="25" textAnchor="end" fontSize="12" fontWeight="bold" fill={UNK}>1 l</text>
    <text x="200" y="74" textAnchor="middle" fontSize="11" fill="#334155">1 vonal</text>
    <text x="200" y="89" textAnchor="middle" fontSize="11" fill="#334155">= 1 dl</text>
  </QFig>
);

const BalanceFig: React.FC<{ tilt: -1 | 0 | 1; left: React.ReactNode; right: React.ReactNode }> = ({ tilt, left, right }) => (
  <QFig h={150}>
    <Ico x={47} y={6} s={1.45}>
      <BalanceIcon tilt={tilt} left={left} right={right} sw={2.4} />
    </Ico>
  </QFig>
);

/** Feliratos edények egy sorban. */
const Labelled: React.FC<{ items: { art: React.ReactNode; label: string }[]; h?: number }> = ({ items, h = 130 }) => {
  const w = 240 / items.length;
  return (
    <QFig h={h}>
      {items.map((it, i) => (
        <g key={i}>
          <Ico x={i * w + w / 2 - 30} y={12} s={0.6}>
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
export const WHAT_TO_MEASURE_G3_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'wtm-g3-q1',
    level: 1,
    questionTypeBadge: 'Mérőeszköz',
    figure: (
      <One s={1.4}>
        <RulerIcon />
      </One>
    ),
    question: 'Mit mérünk vonalzóval?',
    options: ['hosszúságot', 'tömeget', 'űrtartalmat', 'időt'],
    correctAnswer: 0,
    explanation: 'A vonalzóval azt mérjük, milyen hosszú valami. Ez a hosszúság.'
  },
  {
    id: 'wtm-g3-q2',
    level: 1,
    questionTypeBadge: 'Mérőeszköz',
    figure: (
      <One>
        <BalanceIcon />
      </One>
    ),
    question: 'Mit mérünk a kétkarú mérleggel?',
    options: ['tömeget', 'hosszúságot', 'űrtartalmat', 'időt'],
    correctAnswer: 0,
    explanation: 'A mérleggel azt mérjük, milyen nehéz valami. Ez a tömeg.'
  },
  {
    id: 'wtm-g3-q3',
    level: 1,
    questionTypeBadge: 'Mérőeszköz',
    figure: (
      <One>
        <JugIcon fill={5} />
      </One>
    ),
    question: 'Mit mérünk a mérőkancsóval?',
    options: ['űrtartalmat', 'tömeget', 'hosszúságot', 'időt'],
    correctAnswer: 0,
    explanation: 'A mérőkancsóval azt mérjük, mennyi folyadék fér valamibe. Ez az űrtartalom.'
  },
  {
    id: 'wtm-g3-q4',
    level: 1,
    questionTypeBadge: 'Mivel mérjük?',
    figure: (
      <One>
        <MelonIcon />
      </One>
    ),
    question: 'Milyen nehéz a dinnye? Mivel méred meg?',
    options: ['mérleggel', 'vonalzóval', 'mérőkancsóval', 'mérőszalaggal'],
    correctAnswer: 0,
    explanation: 'Milyen nehéz? Ez tömeg. A tömeget mérleggel mérjük.'
  },
  {
    id: 'wtm-g3-q5',
    level: 1,
    questionTypeBadge: 'Mivel mérjük?',
    figure: (
      <One s={1.1}>
        <DoorIcon />
      </One>
    ),
    question: 'Milyen magas az ajtó? Mivel méred meg?',
    options: ['mérőszalaggal', 'mérleggel', 'mérőpohárral', 'mérőkancsóval'],
    correctAnswer: 0,
    explanation: 'Milyen magas? Ez hosszúság. A mérőszalag elég hosszú az ajtóhoz.'
  },
  {
    id: 'wtm-g3-q6',
    level: 1,
    questionTypeBadge: 'Mivel mérjük?',
    figure: (
      <One>
        <BucketIcon />
      </One>
    ),
    question: 'Mennyi víz fér a vödörbe? Mivel méred meg?',
    options: ['mérőkancsóval', 'vonalzóval', 'személymérleggel', 'mérőszalaggal'],
    correctAnswer: 0,
    explanation: 'Mennyi fér bele? Ez űrtartalom. A mérőkancsóval töltögetjük meg a vödröt.'
  },
  {
    id: 'wtm-g3-q7',
    level: 1,
    questionTypeBadge: 'Mértékegység',
    question: 'Melyik a hosszúság mértékegysége?',
    options: ['cm', 'kg', 'l', 'dl'],
    correctAnswer: 0,
    explanation: 'A cm (centiméter) hosszúság. A kg tömeg, az l és a dl űrtartalom.'
  },
  {
    id: 'wtm-g3-q8',
    level: 1,
    questionTypeBadge: 'Mértékegység',
    question: 'Melyik a tömeg mértékegysége?',
    options: ['kg', 'm', 'l', 'cm'],
    correctAnswer: 0,
    explanation: 'A kg (kilogramm) tömeg. Az m és a cm hosszúság, az l űrtartalom.'
  },
  {
    id: 'wtm-g3-q9',
    level: 1,
    questionTypeBadge: 'Mértékegység',
    question: 'Melyik az űrtartalom mértékegysége?',
    options: ['l', 'kg', 'cm', 'm'],
    correctAnswer: 0,
    explanation: 'Az l (liter) űrtartalom. Ezzel mérjük, mennyi fér egy edénybe.'
  },
  {
    id: 'wtm-g3-q10',
    level: 1,
    questionTypeBadge: 'Mérőeszköz',
    figure: (
      <One>
        <BathScaleIcon />
      </One>
    ),
    question: 'Mi a neve ennek a mérőeszköznek?',
    options: ['személymérleg', 'vonalzó', 'mérőkancsó', 'mérőszalag'],
    correctAnswer: 0,
    explanation: 'Ez személymérleg. Ráállsz, és megmutatja, milyen nehéz vagy.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'wtm-g3-q11',
    level: 2,
    questionTypeBadge: 'Becslés',
    figure: (
      <One s={1.4}>
        <PencilIcon />
      </One>
    ),
    question: 'Milyen hosszú lehet egy ceruza?',
    options: ['15 cm', '15 m', '150 cm', '15 kg'],
    correctAnswer: 0,
    explanation: 'Egy ceruza kb. a tenyered hosszúsága: 15 cm. A 15 m olyan hosszú, mint egy busz!'
  },
  {
    id: 'wtm-g3-q12',
    level: 2,
    questionTypeBadge: 'Becslés',
    figure: (
      <One>
        <GlassIcon color="#7dd3fc" />
      </One>
    ),
    question: 'Mennyi víz fér egy pohárba?',
    options: ['2 dl', '2 l', '20 l', '2 kg'],
    correctAnswer: 0,
    explanation: 'Egy pohárba kb. 2 dl fér. 2 l egy nagy palacknyi víz.'
  },
  {
    id: 'wtm-g3-q13',
    level: 2,
    questionTypeBadge: 'Becslés',
    figure: (
      <One>
        <MelonIcon />
      </One>
    ),
    question: 'Milyen nehéz lehet egy dinnye?',
    options: ['3 kg', '30 kg', '3 l', '3 cm'],
    correctAnswer: 0,
    explanation: 'Egy dinnye kb. 3 kg. 30 kg olyan nehéz lenne, mint egy gyerek!'
  },
  {
    id: 'wtm-g3-q14',
    level: 2,
    questionTypeBadge: 'Becslés',
    figure: (
      <One s={1.1}>
        <DoorIcon />
      </One>
    ),
    question: 'Milyen magas lehet egy ajtó?',
    options: ['2 m', '2 cm', '20 m', '2 kg'],
    correctAnswer: 0,
    explanation: 'Egy ajtó kb. 2 m magas. Egy felnőtt is kényelmesen átfér rajta.'
  },
  {
    id: 'wtm-g3-q15',
    level: 2,
    questionTypeBadge: 'Leolvasás',
    figure: <JugFig fill={4} />,
    question: 'Mennyi víz van a kancsóban?',
    options: ['4 dl', '6 dl', '4 l', '40 dl'],
    correctAnswer: 0,
    explanation: 'Alulról számolj: a víz a 4. vonalig ér. Egy vonal 1 dl, ez 4 dl.'
  },
  {
    id: 'wtm-g3-q16',
    level: 2,
    questionTypeBadge: 'Mérleg',
    figure: (
      <BalanceFig
        tilt={-1}
        left={<Ico x={-15} y={-27} s={0.3}><MelonIcon sw={7} /></Ico>}
        right={<Ico x={-11} y={-21} s={0.22}><AppleIcon sw={9} /></Ico>}
      />
    ),
    question: 'Melyik a nehezebb?',
    options: ['a dinnye', 'az alma', 'egyformák', 'nem lehet tudni'],
    correctAnswer: 0,
    explanation: 'A nehezebb oldal lejjebb száll. A dinnye oldala van lent, tehát a dinnye a nehezebb.'
  },
  {
    id: 'wtm-g3-q17',
    level: 2,
    questionTypeBadge: 'Mérleg',
    figure: (
      <BalanceFig
        tilt={0}
        left={
          <g>
            <Ico x={-14} y={-28} s={0.28}>
              <SackIcon sw={8} />
            </Ico>
            <text x="0" y="-8" textAnchor="middle" fontSize="10" fontWeight="bold" fill={UNK}>?</text>
          </g>
        }
        right={<Weight cx={0} by={0} w={26} label="1 kg" fs={7.5} kg />}
      />
    ),
    question: 'A mérleg egyensúlyban van. Milyen nehéz a cukor?',
    options: ['1 kg', '2 kg', '10 kg', '1 l'],
    correctAnswer: 0,
    explanation: 'Egyensúly: a két oldal ugyanolyan nehéz. A súly 1 kg, tehát a cukor is 1 kg.'
  },
  {
    id: 'wtm-g3-q18',
    level: 2,
    questionTypeBadge: 'Mértékegység',
    figure: (
      <One>
        <MugIcon />
      </One>
    ),
    question: 'Melyik mondat igaz?',
    options: ['A bögrébe 3 dl tea fér.', 'A bögrébe 3 l tea fér.', 'A bögrébe 3 m tea fér.', 'A bögrébe 30 l tea fér.'],
    correctAnswer: 0,
    explanation: 'A tea űrtartalmát l-rel vagy dl-rel mérjük. Egy bögrébe kb. 3 dl fér, nem 3 l.'
  },
  {
    id: 'wtm-g3-q19',
    level: 2,
    questionTypeBadge: 'Becslés',
    figure: (
      <One>
        <ChildIcon />
      </One>
    ),
    question: 'Milyen magas lehet egy harmadikos gyerek?',
    options: ['130 cm', '130 m', '13 cm', '130 kg'],
    correctAnswer: 0,
    explanation: 'Egy harmadikos gyerek kb. 130 cm magas. 13 cm csak egy ceruzányi!'
  },
  {
    id: 'wtm-g3-q20',
    level: 2,
    questionTypeBadge: 'Becslés',
    figure: (
      <One>
        <TubIcon />
      </One>
    ),
    question: 'Mennyi víz fér egy fürdőkádba?',
    options: ['150 l', '15 dl', '150 kg', '1 l'],
    correctAnswer: 0,
    explanation: 'A kádba sok víz fér: kb. 150 l. Ez 15 vödörnyi víz.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'wtm-g3-q21',
    level: 3,
    questionTypeBadge: 'Mértékváltás',
    figure: (
      <QFig h={110}>
        <rect x="20" y="30" width="200" height="22" rx="3" fill="#fde047" stroke="#a16207" strokeWidth="2" />
        <text x="120" y="46" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#713f12">1 m</text>
        {Array.from({ length: 11 }, (_, i) => (
          <line key={i} x1={20 + i * 20} y1="52" x2={20 + i * 20} y2="62" stroke="#713f12" strokeWidth="1.4" />
        ))}
        <text x="120" y="88" textAnchor="middle" fontSize="15" fontWeight="bold" fill={UNK}>1 m = ? cm</text>
      </QFig>
    ),
    question: '1 m hány cm?',
    options: ['100 cm', '10 cm', '1000 cm', '50 cm'],
    correctAnswer: 0,
    explanation: 'A méterrúdon 100 kis centiméter van. 1 m = 100 cm.'
  },
  {
    id: 'wtm-g3-q22',
    level: 3,
    questionTypeBadge: 'Mértékváltás',
    figure: (
      <QFig h={130}>
        <Ico x={10} y={16} s={0.9}>
          <BottleIcon label="1 l" fs={18} />
        </Ico>
        <text x="106" y="70" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0f172a">=</text>
        <text x="170" y="56" textAnchor="middle" fontSize="30" fontWeight="bold" fill={UNK}>?</text>
        <Ico x={150} y={64} s={0.4}>
          <GlassIcon sw={6} fill={0.85} color="#7dd3fc" />
        </Ico>
        <text x="170" y="122" textAnchor="middle" fontSize="11" fill="#334155">pohár, mindegyikben 1 dl</text>
      </QFig>
    ),
    question: 'Hány 1 dl-es pohárral töltöd meg az 1 l-es palackot?',
    options: ['10', '100', '1', '5'],
    correctAnswer: 0,
    explanation: '1 l = 10 dl. Ezért 10 pohár kell.'
  },
  {
    id: 'wtm-g3-q23',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: (
      <Labelled
        items={[
          { art: <JugIcon fill={10} />, label: '1 l' },
          { art: <GlassIcon color="#fdba74" />, label: '2 dl' }
        ]}
      />
    ),
    question: 'A kancsóban 1 l szörp van. Hány 2 dl-es poharat tölthetsz tele belőle?',
    options: ['5', '10', '2', '8'],
    correctAnswer: 0,
    explanation: '1 l = 10 dl. 10 dl-ben a 2 dl ötször van meg: 2 + 2 + 2 + 2 + 2 = 10. Tehát 5 pohár.'
  },
  {
    id: 'wtm-g3-q24',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik a hosszabb: 1 m vagy 90 cm?',
    options: ['1 m', '90 cm', 'egyforma hosszúak', 'nem lehet összehasonlítani'],
    correctAnswer: 0,
    explanation: '1 m = 100 cm. A 100 cm több, mint 90 cm. Tehát az 1 m a hosszabb.'
  },
  {
    id: 'wtm-g3-q25',
    level: 3,
    questionTypeBadge: 'Mértékváltás',
    question: '2 m = ? cm',
    options: ['200 cm', '20 cm', '2 cm', '102 cm'],
    correctAnswer: 0,
    explanation: '1 m = 100 cm. 2 m = 100 cm + 100 cm = 200 cm.'
  },
  {
    id: 'wtm-g3-q26',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    figure: (
      <Labelled
        items={[
          { art: <BottleIcon color="#fecaca" />, label: '9 dl' },
          { art: <BottleIcon />, label: '1 l' }
        ]}
      />
    ),
    question: 'Melyik palackba fér több?',
    options: ['az 1 l-esbe', 'a 9 dl-esbe', 'egyformák', 'nem lehet összehasonlítani'],
    correctAnswer: 0,
    explanation: 'A 9 nagyobb szám, mint az 1, de a mértékegység más! 1 l = 10 dl. A 10 dl több, mint 9 dl.'
  },
  {
    id: 'wtm-g3-q27',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    figure: (
      <Labelled
        items={[
          { art: <CanIcon />, label: '15 dl' },
          { art: <BottleIcon />, label: '1 l' },
          { art: <BottleIcon color="#fecaca" />, label: '8 dl' }
        ]}
      />
    ),
    question: 'Melyik edénybe fér a legtöbb?',
    options: ['a 15 dl-es kannába', 'az 1 l-es palackba', 'a 8 dl-es palackba', 'mindegyikbe ugyanannyi'],
    correctAnswer: 0,
    explanation: '1 l = 10 dl. Most mind dl: 15 dl, 10 dl, 8 dl. A legtöbb a 15 dl.'
  },
  {
    id: 'wtm-g3-q28',
    level: 3,
    questionTypeBadge: 'Mértékváltás',
    figure: (
      <QFig h={110}>
        <rect x="20" y="20" width="160" height="22" rx="3" fill="#fde047" stroke="#a16207" strokeWidth="2" />
        <text x="100" y="36" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#713f12">1 m</text>
        <rect x="180" y="20" width="40" height="22" rx="3" fill="#86efac" stroke="#166534" strokeWidth="2" />
        <text x="200" y="36" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#14532d">25 cm</text>
        <text x="120" y="80" textAnchor="middle" fontSize="16" fontWeight="bold" fill={UNK}>1 m 25 cm = ? cm</text>
      </QFig>
    ),
    question: 'Bence 1 m 25 cm magas. Hány cm ez?',
    options: ['125 cm', '26 cm', '1025 cm', '152 cm'],
    correctAnswer: 0,
    explanation: '1 m = 100 cm. 100 cm + 25 cm = 125 cm.'
  },
  {
    id: 'wtm-g3-q29',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: (
      <QFig h={140}>
        <Ico x={22} y={12} s={1.1}>
          <JugIcon fill={10} />
        </Ico>
        <text x="74" y="135" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">1 l limonádé</text>
        <path d="M134 70 L168 70" stroke="#334155" strokeWidth="2.5" markerEnd="url(#wtmArrow)" />
        <defs>
          <marker id="wtmArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0 0 L8 4 L0 8 Z" fill="#334155" />
          </marker>
        </defs>
        <text x="150" y="60" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">− 4 dl</text>
        <text x="200" y="78" textAnchor="middle" fontSize="28" fontWeight="bold" fill={UNK}>?</text>
      </QFig>
    ),
    question: 'A kancsóban 1 l limonádé van. Kiöntesz belőle 4 dl-t. Mennyi marad?',
    options: ['6 dl', '3 dl', '5 dl', '14 dl'],
    correctAnswer: 0,
    explanation: '1 l = 10 dl. 10 dl − 4 dl = 6 dl.'
  },
  {
    id: 'wtm-g3-q30',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: (
      <Labelled
        items={[
          { art: <GlassIcon color="#7dd3fc" />, label: '2 dl' },
          { art: <MugIcon />, label: '3 dl' },
          { art: <BottleIcon />, label: '1 l' },
          { art: <BucketIcon />, label: '10 l' }
        ]}
      />
    ),
    question: 'Meg kell töltened vízzel egy kádat. Melyik edénnyel kell a legkevesebbszer fordulnod?',
    options: ['a 10 l-es vödörrel', 'az 1 l-es palackkal', 'a 3 dl-es bögrével', 'a 2 dl-es pohárral'],
    correctAnswer: 0,
    explanation: 'Abba fér a legtöbb, amelyik a legnagyobb: a 10 l-es vödör. Így kevesebbszer kell fordulni.'
  }
];

export const WhatToMeasureG3Quiz: React.FC<{
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
      topicId="g3-meas-mit-mivel-quiz"
      subtopicId="mit-mivel-merunk"
      title="1. Mit mivel mérünk? – Kvíz"
      subtitle="30 feladat 3 szinten: mennyiségek, mérőeszközök, mértékegységek, becslés."
      badge="3. OSZTÁLY • IV. MÉRÉSEK • KVÍZ"
      questions={WHAT_TO_MEASURE_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'Mit mivel mérünk?',
          items: ['hosszúság: vonalzó, mérőszalag', 'tömeg: mérleg', 'űrtartalom: mérőpohár, mérőkancsó']
        },
        {
          title: 'Mértékegységek',
          items: ['hosszúság: m, cm', 'tömeg: kg', 'űrtartalom: l, dl']
        },
        {
          title: 'Átváltás',
          items: ['1 m = 100 cm', '1 l = 10 dl', '1 m 25 cm = 125 cm']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <WhatToMeasureG3Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <WhatToMeasureG3Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default WhatToMeasureG3Quiz;

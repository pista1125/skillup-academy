import React from 'react';
import { SorterTemplate, SorterLevelConfig, SorterItem } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { SortObjs, SortClock, SortStrip } from './FractionAmountsG3CardFigures';

interface FractionAmountsG3SorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onComplete?: () => void;
  topicId?: string;
  topicTitle?: string;
  [key: string]: any;
}

let uid = 0;
const fig = (figure: React.ReactNode, cat: string): SorterItem => ({ id: `fams${++uid}`, text: '', figure, categoryId: cat });
const txt = (text: string, cat: string): SorterItem => ({ id: `fams${++uid}`, text, categoryId: cat });

const LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mennyi egy rész?',
    description: 'Számold ki, és tedd a jó dobozba!',
    categories: [
      { id: 'v2', name: 'Egy rész: 2', color: 'sky' },
      { id: 'v3', name: 'Egy rész: 3', color: 'amber' },
      { id: 'v5', name: 'Egy rész: 5', color: 'rose' }
    ],
    items: [
      fig(<SortObjs n={4} k={2} word="fele" />, 'v2'),
      fig(<SortObjs n={6} k={3} word="harmada" />, 'v2'),
      fig(<SortObjs n={8} k={4} word="negyede" />, 'v2'),
      fig(<SortObjs n={10} k={5} word="ötöde" />, 'v2'),
      fig(<SortStrip top={20} n={10} />, 'v2'),
      txt('a 12 hatoda', 'v2'),
      txt('a 16 nyolcada', 'v2'),
      txt('a 20 tizede', 'v2'),
      txt('a 4 fele', 'v2'),
      fig(<SortObjs n={6} k={2} word="fele" />, 'v3'),
      fig(<SortObjs n={9} k={3} word="harmada" />, 'v3'),
      fig(<SortObjs n={12} k={4} word="negyede" />, 'v3'),
      fig(<SortObjs n={15} k={5} word="ötöde" />, 'v3'),
      fig(<SortStrip top={30} n={10} />, 'v3'),
      txt('a 18 hatoda', 'v3'),
      txt('a 24 nyolcada', 'v3'),
      txt('a 30 tizede', 'v3'),
      txt('a 6 fele', 'v3'),
      fig(<SortObjs n={10} k={2} word="fele" />, 'v5'),
      fig(<SortObjs n={15} k={3} word="harmada" />, 'v5'),
      fig(<SortObjs n={20} k={4} word="negyede" />, 'v5'),
      fig(<SortObjs n={25} k={5} word="ötöde" />, 'v5'),
      fig(<SortStrip top={50} n={10} />, 'v5'),
      txt('a 30 hatoda', 'v5'),
      txt('a 40 nyolcada', 'v5'),
      txt('a 50 tizede', 'v5'),
      txt('a 10 fele', 'v5')
    ]
  },
  {
    level: 2,
    title: '2. szint: Hány perc?',
    description: '1 óra = 60 perc. Hány perc a színes rész?',
    categories: [
      { id: 'm15', name: '15 perc', color: 'sky' },
      { id: 'm20', name: '20 perc', color: 'emerald' },
      { id: 'm30', name: '30 perc', color: 'violet' }
    ],
    items: [
      fig(<SortClock n={4} />, 'm15'),
      fig(<SortClock min={15} />, 'm15'),
      fig(<SortStrip top="60 perc" n={4} />, 'm15'),
      fig(<SortStrip top="45 perc" n={3} />, 'm15'),
      txt('negyed óra', 'm15'),
      txt('a fél óra fele', 'm15'),
      txt('a 30 perc fele', 'm15'),
      txt('az 1 óra negyede', 'm15'),
      txt('a 150 perc tizede', 'm15'),
      fig(<SortClock n={3} />, 'm20'),
      fig(<SortClock min={20} />, 'm20'),
      fig(<SortStrip top="60 perc" n={3} />, 'm20'),
      fig(<SortStrip top="40 perc" n={2} />, 'm20'),
      txt('az 1 óra harmada', 'm20'),
      txt('a 2 óra hatoda', 'm20'),
      txt('a 100 perc ötöde', 'm20'),
      txt('a 200 perc tizede', 'm20'),
      txt('a 80 perc negyede', 'm20'),
      fig(<SortClock n={2} />, 'm30'),
      fig(<SortClock min={30} />, 'm30'),
      fig(<SortStrip top="60 perc" n={2} />, 'm30'),
      fig(<SortStrip top="90 perc" n={3} />, 'm30'),
      txt('fél óra', 'm30'),
      txt('az 1 óra fele', 'm30'),
      txt('a 2 óra negyede', 'm30'),
      txt('a 3 óra hatoda', 'm30'),
      txt('a 300 perc tizede', 'm30')
    ]
  },
  {
    level: 3,
    title: '3. szint: Hány centiméter?',
    description: '1 m = 100 cm, 1 dm = 10 cm. Válts át, aztán oszd el!',
    categories: [
      { id: 'c50', name: '50 cm', color: 'amber' },
      { id: 'c25', name: '25 cm', color: 'sky' },
      { id: 'c20', name: '20 cm', color: 'rose' }
    ],
    items: [
      fig(<SortStrip top="1 m" n={2} />, 'c50'),
      fig(<SortStrip top="2 m" n={4} />, 'c50'),
      fig(<SortStrip top="5 m" n={10} />, 'c50'),
      fig(<SortStrip top="100 cm" n={2} />, 'c50'),
      txt('az 1 m fele', 'c50'),
      txt('fél méter', 'c50'),
      txt('5 dm', 'c50'),
      txt('a 2 m negyede', 'c50'),
      txt('a 3 m hatoda', 'c50'),
      fig(<SortStrip top="1 m" n={4} />, 'c25'),
      fig(<SortStrip top="50 cm" n={2} />, 'c25'),
      fig(<SortStrip top="75 cm" n={3} />, 'c25'),
      fig(<SortStrip top="2 m" n={8} />, 'c25'),
      txt('az 1 m negyede', 'c25'),
      txt('a fél méter fele', 'c25'),
      txt('a 100 cm negyede', 'c25'),
      txt('a 125 cm ötöde', 'c25'),
      txt('a 250 cm tizede', 'c25'),
      fig(<SortStrip top="1 m" n={5} />, 'c20'),
      fig(<SortStrip top="2 m" n={10} />, 'c20'),
      fig(<SortStrip top="60 cm" n={3} />, 'c20'),
      fig(<SortStrip top="80 cm" n={4} />, 'c20'),
      txt('az 1 m ötöde', 'c20'),
      txt('a 2 m tizede', 'c20'),
      txt('2 dm', 'c20'),
      txt('a 40 cm fele', 'c20'),
      txt('a 120 cm hatoda', 'c20')
    ]
  }
];

export const FRACTION_AMOUNTS_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: LIST[0],
  2: LIST[1],
  3: LIST[2]
};

export const FractionAmountsG3Sorter: React.FC<FractionAmountsG3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-frac-mennyisegek-sorter',
  topicTitle = '3. Törtrész mennyiségekből – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="tortes-szamok"
      topicId={topicId}
      subtopicId="osszehasonlitas"
      title={topicTitle}
      subtitle="Számold ki a részt, és tedd a jó dobozba!"
      levels={FRACTION_AMOUNTS_G3_SORTER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onComplete={onComplete}
      {...rest}
    />
  );
};

export default FractionAmountsG3Sorter;

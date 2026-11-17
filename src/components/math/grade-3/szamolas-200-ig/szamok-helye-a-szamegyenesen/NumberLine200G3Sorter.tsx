import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { DotLineCard, ScaleCard, HopSmallCard } from './NumberLine200G3CardFigures';

interface NumberLine200G3SorterProps {
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

const NUMBER_LINE_200_G3_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Hol van a helye?',
    description: 'Hol van a szám helye? A piros pont is egy szám helye!',
    categories: [
      { id: 'a', name: '0 és 100 között', color: 'sky' },
      { id: 'b', name: '100 és 150 között', color: 'emerald' },
      { id: 'c', name: '150 és 200 között', color: 'rose' }
    ],
    items: [
      { id: 'nl200s1', text: '45', categoryId: 'a' },
      { id: 'nl200s2', text: '', figure: <DotLineCard v={60} />, categoryId: 'a' },
      { id: 'nl200s3', text: '', figure: <DotLineCard v={25} />, categoryId: 'a' },
      { id: 'nl200s4', text: '104', categoryId: 'b' },
      { id: 'nl200s5', text: '', figure: <DotLineCard v={125} />, categoryId: 'b' },
      { id: 'nl200s6', text: '148', categoryId: 'b' },
      { id: 'nl200s7', text: '152', categoryId: 'c' },
      { id: 'nl200s8', text: '', figure: <DotLineCard v={180} />, categoryId: 'c' },
      { id: 'nl200s9', text: '199', categoryId: 'c' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mennyit ér egy osztás?',
    description: 'Mennyivel nő a szám egy lépésnél? A képen 5 lépés van.',
    categories: [
      { id: 's1', name: '1-gyel lépünk', color: 'amber' },
      { id: 's5', name: '5-tel lépünk', color: 'purple' },
      { id: 's10', name: '10-zel lépünk', color: 'teal' }
    ],
    items: [
      { id: 'nl200s10', text: '120, 121, 122', categoryId: 's1' },
      { id: 'nl200s11', text: '', figure: <ScaleCard a={120} b={125} />, categoryId: 's1' },
      { id: 'nl200s12', text: '149, 150, 151', categoryId: 's1' },
      { id: 'nl200s13', text: '135, 140, 145', categoryId: 's5' },
      { id: 'nl200s14', text: '', figure: <ScaleCard a={100} b={125} />, categoryId: 's5' },
      { id: 'nl200s15', text: '', figure: <ScaleCard a={150} b={175} />, categoryId: 's5' },
      { id: 'nl200s16', text: '150, 160, 170', categoryId: 's10' },
      { id: 'nl200s17', text: '', figure: <ScaleCard a={100} b={150} />, categoryId: 's10' },
      { id: 'nl200s18', text: '65, 75, 85', categoryId: 's10' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hová érkezik a szöcske?',
    description: 'Ugorj fejben! A 150-hez képest hol áll meg?',
    categories: [
      { id: 'k', name: '150-nél kisebb számra', color: 'sky' },
      { id: 'e', name: 'pont a 150-re', color: 'emerald' },
      { id: 'n', name: '150-nél nagyobb számra', color: 'rose' }
    ],
    items: [
      { id: 'nl200s19', text: '', figure: <HopSmallCard from={146} d={3} />, categoryId: 'k' },
      { id: 'nl200s20', text: '158-tól 9-et balra', categoryId: 'k' },
      { id: 'nl200s21', text: '140-től 8-at jobbra', categoryId: 'k' },
      { id: 'nl200s22', text: '143-tól 7-et jobbra', categoryId: 'e' },
      { id: 'nl200s23', text: '', figure: <HopSmallCard from={156} d={-6} />, categoryId: 'e' },
      { id: 'nl200s24', text: '', figure: <HopSmallCard from={153} d={-3} />, categoryId: 'e' },
      { id: 'nl200s25', text: '', figure: <HopSmallCard from={147} d={5} />, categoryId: 'n' },
      { id: 'nl200s26', text: '159-től 4-et balra', categoryId: 'n' },
      { id: 'nl200s27', text: '145-től 9-et jobbra', categoryId: 'n' }
    ]
  }
];

export const NUMBER_LINE_200_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: NUMBER_LINE_200_G3_SORTER_LEVELS_LIST[0],
  2: NUMBER_LINE_200_G3_SORTER_LEVELS_LIST[1],
  3: NUMBER_LINE_200_G3_SORTER_LEVELS_LIST[2]
};

export const NumberLine200G3Sorter: React.FC<NumberLine200G3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-c200-szamegyenes-sorter',
  topicTitle = '2. Számok helye a számegyenesen – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="szamolas-200-ig"
      topicId={topicId}
      subtopicId="szamok-helye-a-szamegyenesen"
      title={topicTitle}
      subtitle="Válogasd szét a számokat a helyük, a lépésköz és a szöcskeugrások szerint!"
      levels={NUMBER_LINE_200_G3_SORTER_LEVELS}
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

export default NumberLine200G3Sorter;

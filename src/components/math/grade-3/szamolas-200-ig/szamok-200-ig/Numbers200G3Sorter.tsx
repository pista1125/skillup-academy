import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { BlocksCard, AbacusCard } from './Numbers200G3CardFigures';

interface Numbers200G3SorterProps {
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

const NUMBERS_200_G3_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Hová tartozik?',
    description: 'Mekkora a szám? Lap = 100, rúd = 10, kocka = 1.',
    categories: [
      { id: 'k100', name: '100-nál kisebb', color: 'sky' },
      { id: 'k150', name: '100 és 150 között', color: 'emerald' },
      { id: 'n150', name: '150-nél nagyobb', color: 'rose' }
    ],
    items: [
      { id: 'n200s1', text: '', figure: <BlocksCard h={0} t={8} e={3} small />, categoryId: 'k100' },
      { id: 'n200s2', text: '99', categoryId: 'k100' },
      { id: 'n200s3', text: '45', categoryId: 'k100' },
      { id: 'n200s4', text: '112', categoryId: 'k150' },
      { id: 'n200s5', text: '', figure: <BlocksCard h={1} t={2} e={0} small />, categoryId: 'k150' },
      { id: 'n200s6', text: '', figure: <BlocksCard h={1} t={4} e={1} small />, categoryId: 'k150' },
      { id: 'n200s7', text: '151', categoryId: 'n150' },
      { id: 'n200s8', text: '', figure: <BlocksCard h={1} t={6} e={0} small />, categoryId: 'n150' },
      { id: 'n200s9', text: '200', categoryId: 'n150' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mi áll a tízesek helyén?',
    description: 'Nézd a középső jegyet! A golyós számolón a kék golyókat.',
    categories: [
      { id: 't3', name: 'A tízesek helyén 3 áll', color: 'amber' },
      { id: 't5', name: 'A tízesek helyén 5 áll', color: 'purple' },
      { id: 't0', name: 'A tízesek helyén 0 áll', color: 'teal' }
    ],
    items: [
      { id: 'n200s10', text: '', figure: <AbacusCard sz={1} t={3} e={4} small />, categoryId: 't3' },
      { id: 'n200s11', text: 'százharminchét', categoryId: 't3' },
      { id: 'n200s12', text: '1 sz + 3 t + 1 e', categoryId: 't3' },
      { id: 'n200s13', text: '', figure: <AbacusCard sz={1} t={5} e={6} small />, categoryId: 't5' },
      { id: 'n200s14', text: 'százötvenkettő', categoryId: 't5' },
      { id: 'n200s15', text: '1 sz + 5 t + 9 e', categoryId: 't5' },
      { id: 'n200s16', text: '', figure: <AbacusCard sz={1} t={0} e={5} small />, categoryId: 't0' },
      { id: 'n200s17', text: 'százhárom', categoryId: 't0' },
      { id: 'n200s18', text: '', figure: <AbacusCard sz={2} t={0} e={0} small />, categoryId: 't0' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mennyit ér a 6-os?',
    description: 'Keresd a 6-ost! A golyós számolón: 6 kék vagy 6 sárga golyó?',
    categories: [
      { id: 'v6', name: 'A 6-os 6-ot ér', color: 'sky' },
      { id: 'v60', name: 'A 6-os 60-at ér', color: 'emerald' },
      { id: 'nincs', name: 'Nincs benne 6-os', color: 'rose' }
    ],
    items: [
      { id: 'n200s19', text: '', figure: <AbacusCard sz={1} t={1} e={6} small />, categoryId: 'v6' },
      { id: 'n200s20', text: 'száznegyvenhat', categoryId: 'v6' },
      { id: 'n200s21', text: '196', categoryId: 'v6' },
      { id: 'n200s22', text: '', figure: <AbacusCard sz={1} t={6} e={0} small />, categoryId: 'v60' },
      { id: 'n200s23', text: 'százhatvankettő', categoryId: 'v60' },
      { id: 'n200s24', text: '', figure: <AbacusCard sz={1} t={6} e={5} small />, categoryId: 'v60' },
      { id: 'n200s25', text: '', figure: <AbacusCard sz={1} t={5} e={0} small />, categoryId: 'nincs' },
      { id: 'n200s26', text: 'százkilencvenkilenc', categoryId: 'nincs' },
      { id: 'n200s27', text: '1 sz + 7 t + 9 e', categoryId: 'nincs' }
    ]
  }
];

export const NUMBERS_200_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: NUMBERS_200_G3_SORTER_LEVELS_LIST[0],
  2: NUMBERS_200_G3_SORTER_LEVELS_LIST[1],
  3: NUMBERS_200_G3_SORTER_LEVELS_LIST[2]
};

export const Numbers200G3Sorter: React.FC<Numbers200G3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-c200-szamok-sorter',
  topicTitle = '1. Számok 200-ig – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="szamolas-200-ig"
      topicId={topicId}
      subtopicId="szamok-200-ig"
      title={topicTitle}
      subtitle="Válogasd szét a számokat nagyság, tízesek és a jegyek értéke szerint!"
      levels={NUMBERS_200_G3_SORTER_LEVELS}
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

export default Numbers200G3Sorter;

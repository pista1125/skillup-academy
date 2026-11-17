import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { BlocksCard, AbacusCard, PileCard } from './Numbers500G3CardFigures';

interface Numbers500G3SorterProps {
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

const NUMBERS_500_G3_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Hány százas?',
    description: 'Nézd meg a százasokat! Tedd a jó dobozba!',
    categories: [
      { id: 'sz2', name: '2 százas (200-tól 299-ig)', color: 'sky' },
      { id: 'sz3', name: '3 százas (300-tól 399-ig)', color: 'amber' },
      { id: 'sz4', name: '4 százas (400-tól 499-ig)', color: 'emerald' }
    ],
    items: [
      { id: 'n500s1', text: '', figure: <BlocksCard h={2} t={5} e={1} small />, categoryId: 'sz2' },
      { id: 'n500s2', text: '', figure: <AbacusCard sz={2} t={1} e={8} small />, categoryId: 'sz2' },
      { id: 'n500s3', text: '290', categoryId: 'sz2' },
      { id: 'n500s4', text: '', figure: <BlocksCard h={3} t={0} e={4} small />, categoryId: 'sz3' },
      { id: 'n500s5', text: '399', categoryId: 'sz3' },
      { id: 'n500s6', text: 'háromszáztíz', categoryId: 'sz3' },
      { id: 'n500s7', text: '', figure: <BlocksCard h={4} t={2} e={2} small />, categoryId: 'sz4' },
      { id: 'n500s8', text: '', figure: <AbacusCard sz={4} t={6} e={0} small />, categoryId: 'sz4' },
      { id: 'n500s9', text: 'négyszázegy', categoryId: 'sz4' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mennyit ér a 4-es?',
    description: 'Keresd meg a 4-est! Hol áll? Mennyit ér?',
    categories: [
      { id: 'v400', name: 'A 4-es 400-at ér', color: 'rose' },
      { id: 'v40', name: 'A 4-es 40-et ér', color: 'sky' },
      { id: 'v4', name: 'A 4-es 4-et ér', color: 'amber' }
    ],
    items: [
      { id: 'n500s10', text: '', figure: <AbacusCard sz={4} t={1} e={3} small />, categoryId: 'v400' },
      { id: 'n500s11', text: '', figure: <BlocksCard h={4} t={0} e={2} small />, categoryId: 'v400' },
      { id: 'n500s12', text: '481', categoryId: 'v400' },
      { id: 'n500s13', text: '', figure: <AbacusCard sz={2} t={4} e={6} small />, categoryId: 'v40' },
      { id: 'n500s14', text: '', figure: <BlocksCard h={1} t={4} e={0} small />, categoryId: 'v40' },
      { id: 'n500s15', text: '345', categoryId: 'v40' },
      { id: 'n500s16', text: '', figure: <AbacusCard sz={3} t={5} e={4} small />, categoryId: 'v4' },
      { id: 'n500s17', text: '274', categoryId: 'v4' },
      { id: 'n500s18', text: '194', categoryId: 'v4' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Váltsd be, aztán válogass!',
    description: 'Előbb váltsd be: 10 rúd = 1 lap, 10 kocka = 1 rúd!',
    categories: [
      { id: 'lt300', name: 'Kisebb, mint 300', color: 'teal' },
      { id: 'mid', name: '300 és 400 között', color: 'purple' },
      { id: 'gt400', name: 'Nagyobb, mint 400', color: 'orange' }
    ],
    items: [
      { id: 'n500s19', text: '', figure: <PileCard h={1} t={12} e={3} />, categoryId: 'lt300' },
      { id: 'n500s20', text: '28 t + 9 e', categoryId: 'lt300' },
      { id: 'n500s21', text: '2 sz + 8 t + 15 e', categoryId: 'lt300' },
      { id: 'n500s22', text: '', figure: <PileCard h={2} t={11} e={0} />, categoryId: 'mid' },
      { id: 'n500s23', text: '', figure: <PileCard h={2} t={10} e={8} />, categoryId: 'mid' },
      { id: 'n500s24', text: '39 t + 4 e', categoryId: 'mid' },
      { id: 'n500s25', text: '', figure: <PileCard h={3} t={11} e={5} />, categoryId: 'gt400' },
      { id: 'n500s26', text: '', figure: <PileCard h={3} t={14} e={0} />, categoryId: 'gt400' },
      { id: 'n500s27', text: '4 sz + 12 e', categoryId: 'gt400' }
    ]
  }
];

export const NUMBERS_500_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: NUMBERS_500_G3_SORTER_LEVELS_LIST[0],
  2: NUMBERS_500_G3_SORTER_LEVELS_LIST[1],
  3: NUMBERS_500_G3_SORTER_LEVELS_LIST[2]
};

export const Numbers500G3Sorter: React.FC<Numbers500G3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-c500-szamok-sorter',
  topicTitle = '1. Számok 500-ig – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="szamolas-500-ig"
      topicId={topicId}
      subtopicId="szamok-500-ig"
      title={topicTitle}
      subtitle="Válogasd szét a számokat a százasok, a helyiérték és a nagyság szerint!"
      levels={NUMBERS_500_G3_SORTER_LEVELS}
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

export default Numbers500G3Sorter;

import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { SortLine, MiniBlocks } from './Rounding200G3CardFigures';

interface Rounding200G3SorterProps {
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

const ROUNDING_200_G3_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Le, fel vagy marad?',
    description: 'Kerekítsd tízesre! Merre kell menni?',
    categories: [
      { id: 'le', name: 'Lefelé kerekítünk', color: 'sky' },
      { id: 'fel', name: 'Felfelé kerekítünk', color: 'rose' },
      { id: 'marad', name: 'Kerek tízes, marad', color: 'emerald' }
    ],
    items: [
      { id: 'r200s1', text: '121', figure: <SortLine lo={120} v={121} />, categoryId: 'le' },
      { id: 'r200s2', text: '143', figure: <SortLine lo={140} v={143} />, categoryId: 'le' },
      { id: 'r200s3', text: '162', categoryId: 'le' },
      { id: 'r200s4', text: '117', figure: <SortLine lo={110} v={117} />, categoryId: 'fel' },
      { id: 'r200s5', text: '155', figure: <SortLine lo={150} v={155} />, categoryId: 'fel' },
      { id: 'r200s6', text: '188', categoryId: 'fel' },
      { id: 'r200s7', text: '130', figure: <SortLine lo={130} v={130} />, categoryId: 'marad' },
      { id: 'r200s8', text: '170', categoryId: 'marad' },
      { id: 'r200s9', text: '100', categoryId: 'marad' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Melyik kerek tízes lesz?',
    description: 'Kerekítsd tízesre, és tedd a jó dobozba!',
    categories: [
      { id: 'k120', name: '≈ 120', color: 'amber' },
      { id: 'k130', name: '≈ 130', color: 'purple' },
      { id: 'k140', name: '≈ 140', color: 'teal' }
    ],
    items: [
      { id: 'r200s10', text: '115', figure: <SortLine lo={110} v={115} />, categoryId: 'k120' },
      { id: 'r200s11', text: '118', categoryId: 'k120' },
      { id: 'r200s12', text: '124', figure: <SortLine lo={120} v={124} />, categoryId: 'k120' },
      { id: 'r200s13', text: '125', figure: <SortLine lo={120} v={125} />, categoryId: 'k130' },
      { id: 'r200s14', text: '129', categoryId: 'k130' },
      { id: 'r200s15', text: '133', figure: <SortLine lo={130} v={133} />, categoryId: 'k130' },
      { id: 'r200s16', text: '135', figure: <SortLine lo={130} v={135} />, categoryId: 'k140' },
      { id: 'r200s17', text: '141', categoryId: 'k140' },
      { id: 'r200s18', text: '144', categoryId: 'k140' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Kirakott számok kerekítése',
    description: 'Melyik szám van kirakva? Kerekítsd tízesre!',
    categories: [
      { id: 'k150', name: '≈ 150', color: 'sky' },
      { id: 'k160', name: '≈ 160', color: 'emerald' },
      { id: 'k170', name: '≈ 170', color: 'rose' }
    ],
    items: [
      { id: 'r200s19', text: '', figure: <MiniBlocks sz={1} t={4} e={7} />, categoryId: 'k150' },
      { id: 'r200s20', text: '15 tízes 3 egyes', categoryId: 'k150' },
      { id: 'r200s21', text: '', figure: <MiniBlocks sz={1} t={5} e={4} />, categoryId: 'k150' },
      { id: 'r200s22', text: '', figure: <MiniBlocks sz={1} t={5} e={5} />, categoryId: 'k160' },
      { id: 'r200s23', text: '16 tízes 2 egyes', categoryId: 'k160' },
      { id: 'r200s24', text: '1 százas 6 tízes', categoryId: 'k160' },
      { id: 'r200s25', text: '', figure: <MiniBlocks sz={1} t={6} e={8} />, categoryId: 'k170' },
      { id: 'r200s26', text: '17 tízes 4 egyes', categoryId: 'k170' },
      { id: 'r200s27', text: '', figure: <MiniBlocks sz={1} t={6} e={5} />, categoryId: 'k170' }
    ]
  }
];

export const ROUNDING_200_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: ROUNDING_200_G3_SORTER_LEVELS_LIST[0],
  2: ROUNDING_200_G3_SORTER_LEVELS_LIST[1],
  3: ROUNDING_200_G3_SORTER_LEVELS_LIST[2]
};

export const Rounding200G3Sorter: React.FC<Rounding200G3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-c200-kerekites-sorter',
  topicTitle = '3. Számszomszédok, kerekítés – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="szamolas-200-ig"
      topicId={topicId}
      subtopicId="szamszomszedok-kerekites"
      title={topicTitle}
      subtitle="Kerekítsd a számokat tízesre, és válogasd szét őket!"
      levels={ROUNDING_200_G3_SORTER_LEVELS}
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

export default Rounding200G3Sorter;

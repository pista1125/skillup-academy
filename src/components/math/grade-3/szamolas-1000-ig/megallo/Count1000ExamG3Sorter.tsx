import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { SortBlocks1000, SortTags, SortJump, SortBags } from './Count1000ExamG3CardFigures';


interface Count1000ExamG3SorterProps {
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

const COUNT1000_EXAM_G3_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Hol a helye?',
    description: 'Lap = 100, rúd = 10. Kisebb vagy nagyobb a szám?',
    categories: [
      { id: 'a300', name: '300-nál kisebb', color: 'sky' },
      { id: 'b300', name: '300 és 600 között', color: 'emerald' },
      { id: 'c600', name: '600-nál nagyobb', color: 'amber' }
    ],
    items: [
      { id: 'c1000s1', text: '', figure: <SortBlocks1000 sz={2} t={4} />, categoryId: 'a300' },
      { id: 'c1000s2', text: '', figure: <SortBlocks1000 sz={1} t={9} />, categoryId: 'a300' },
      { id: 'c1000s3', text: '299', categoryId: 'a300' },
      { id: 'c1000s4', text: '', figure: <SortBlocks1000 sz={4} t={5} />, categoryId: 'b300' },
      { id: 'c1000s5', text: '', figure: <SortBlocks1000 sz={5} t={0} />, categoryId: 'b300' },
      { id: 'c1000s6', text: '301', categoryId: 'b300' },
      { id: 'c1000s7', text: '', figure: <SortBlocks1000 sz={7} t={2} />, categoryId: 'c600' },
      { id: 'c1000s8', text: '', figure: <SortBlocks1000 sz={9} t={0} />, categoryId: 'c600' },
      { id: 'c1000s9', text: '601', categoryId: 'c600' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Százasra kerekítve',
    description: 'Kerekítsd az árakat százasra! Figyeld a tízeseket!',
    categories: [
      { id: 'k300', name: '≈ 300', color: 'sky' },
      { id: 'k600', name: '≈ 600', color: 'emerald' },
      { id: 'k800', name: '≈ 800', color: 'rose' }
    ],
    items: [
      { id: 'c1000s10', text: '', figure: <SortTags prices={[349]} />, categoryId: 'k300' },
      { id: 'c1000s11', text: '', figure: <SortTags prices={[251]} />, categoryId: 'k300' },
      { id: 'c1000s12', text: '284', categoryId: 'k300' },
      { id: 'c1000s13', text: '', figure: <SortTags prices={[550]} />, categoryId: 'k600' },
      { id: 'c1000s14', text: '', figure: <SortTags prices={[649]} />, categoryId: 'k600' },
      { id: 'c1000s15', text: '612', categoryId: 'k600' },
      { id: 'c1000s16', text: '', figure: <SortTags prices={[750]} />, categoryId: 'k800' },
      { id: 'c1000s17', text: '', figure: <SortTags prices={[849]} />, categoryId: 'k800' },
      { id: 'c1000s18', text: '795', categoryId: 'k800' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mennyi az eredmény?',
    description: 'Számold ki, és tedd a jó helyre!',
    categories: [
      { id: 'e400', name: 'Eredmény: 400', color: 'sky' },
      { id: 'e640', name: 'Eredmény: 640', color: 'emerald' },
      { id: 'e900', name: 'Eredmény: 900', color: 'amber' }
    ],
    items: [
      { id: 'c1000s19', text: '', figure: <SortBags k={4} v={100} />, categoryId: 'e400' },
      { id: 'c1000s20', text: '', figure: <SortJump from={280} by={120} />, categoryId: 'e400' },
      { id: 'c1000s21', text: '800 : 2', categoryId: 'e400' },
      { id: 'c1000s22', text: '', figure: <SortJump from={700} by={-60} />, categoryId: 'e640' },
      { id: 'c1000s23', text: '8 · 80', categoryId: 'e640' },
      { id: 'c1000s24', text: '1000 − 360', categoryId: 'e640' },
      { id: 'c1000s25', text: '', figure: <SortBags k={3} v={300} />, categoryId: 'e900' },
      { id: 'c1000s26', text: '', figure: <SortJump from={450} by={450} />, categoryId: 'e900' },
      { id: 'c1000s27', text: '10 · 90', categoryId: 'e900' }
    ]
  }
];


export const COUNT1000_EXAM_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: COUNT1000_EXAM_G3_SORTER_LEVELS_LIST[0],
  2: COUNT1000_EXAM_G3_SORTER_LEVELS_LIST[1],
  3: COUNT1000_EXAM_G3_SORTER_LEVELS_LIST[2]
};

export const Count1000ExamG3Sorter: React.FC<Count1000ExamG3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-c1000-tudasproba-sorter',
  topicTitle = '5. Megálló – tudáspróba – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="szamolas-1000-ig"
      topicId={topicId}
      subtopicId="megallo"
      title={topicTitle}
      subtitle="Számold ki, és válogasd szét!"
      levels={COUNT1000_EXAM_G3_SORTER_LEVELS}
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

export default Count1000ExamG3Sorter;

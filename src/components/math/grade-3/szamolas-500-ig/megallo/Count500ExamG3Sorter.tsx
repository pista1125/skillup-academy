import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { SortBlocks, SortTags, SortBags, SortJump } from './Count500ExamG3CardFigures';

interface Count500ExamG3SorterProps {
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

const COUNT500_EXAM_G3_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Hány százas van benne?',
    description: 'Nézd a százasok helyét! (lap = 100, rúd = 10)',
    categories: [
      { id: 'sz2', name: '2 százas', color: 'sky' },
      { id: 'sz3', name: '3 százas', color: 'emerald' },
      { id: 'sz4', name: '4 százas', color: 'amber' }
    ],
    items: [
      { id: 'c500s1', text: '', figure: <SortBlocks sz={2} t={6} />, categoryId: 'sz2' },
      { id: 'c500s2', text: '287', categoryId: 'sz2' },
      { id: 'c500s3', text: '209', categoryId: 'sz2' },
      { id: 'c500s4', text: '', figure: <SortBlocks sz={3} t={0} />, categoryId: 'sz3' },
      { id: 'c500s5', text: '', figure: <SortBlocks sz={3} t={4} />, categoryId: 'sz3' },
      { id: 'c500s6', text: '345', categoryId: 'sz3' },
      { id: 'c500s7', text: '', figure: <SortBlocks sz={4} t={5} />, categoryId: 'sz4' },
      { id: 'c500s8', text: '490', categoryId: 'sz4' },
      { id: 'c500s9', text: '408', categoryId: 'sz4' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Kerekíts százasra!',
    description: 'Százasra kerekítve mennyi? Nézd a tízesek jegyét!',
    categories: [
      { id: 'k200', name: '≈ 200', color: 'sky' },
      { id: 'k300', name: '≈ 300', color: 'emerald' },
      { id: 'k400', name: '≈ 400', color: 'rose' }
    ],
    items: [
      { id: 'c500s10', text: '', figure: <SortTags prices={[249]} />, categoryId: 'k200' },
      { id: 'c500s11', text: '199', categoryId: 'k200' },
      { id: 'c500s12', text: '150', categoryId: 'k200' },
      { id: 'c500s13', text: '', figure: <SortTags prices={[251]} />, categoryId: 'k300' },
      { id: 'c500s14', text: '349', categoryId: 'k300' },
      { id: 'c500s15', text: '305', categoryId: 'k300' },
      { id: 'c500s16', text: '', figure: <SortTags prices={[350]} />, categoryId: 'k400' },
      { id: 'c500s17', text: '', figure: <SortTags prices={[384]} />, categoryId: 'k400' },
      { id: 'c500s18', text: '412', categoryId: 'k400' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Melyik eredmény?',
    description: 'Számold ki! Minden zsákban ugyanannyi van.',
    categories: [
      { id: 'e240', name: 'Eredmény: 240', color: 'sky' },
      { id: 'e360', name: 'Eredmény: 360', color: 'emerald' },
      { id: 'e480', name: 'Eredmény: 480', color: 'amber' }
    ],
    items: [
      { id: 'c500s19', text: '', figure: <SortBags k={4} v={60} />, categoryId: 'e240' },
      { id: 'c500s20', text: '', figure: <SortJump from={300} by={-60} />, categoryId: 'e240' },
      { id: 'c500s21', text: '6 · 40', categoryId: 'e240' },
      { id: 'c500s22', text: '', figure: <SortBags k={4} v={90} />, categoryId: 'e360' },
      { id: 'c500s23', text: '', figure: <SortJump from={390} by={-30} />, categoryId: 'e360' },
      { id: 'c500s24', text: '420 − 60', categoryId: 'e360' },
      { id: 'c500s25', text: '', figure: <SortJump from={450} by={30} />, categoryId: 'e480' },
      { id: 'c500s26', text: '8 · 60', categoryId: 'e480' },
      { id: 'c500s27', text: '500 − 20', categoryId: 'e480' }
    ]
  }
];

export const COUNT500_EXAM_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: COUNT500_EXAM_G3_SORTER_LEVELS_LIST[0],
  2: COUNT500_EXAM_G3_SORTER_LEVELS_LIST[1],
  3: COUNT500_EXAM_G3_SORTER_LEVELS_LIST[2]
};

export const Count500ExamG3Sorter: React.FC<Count500ExamG3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-c500-tudasproba-sorter',
  topicTitle = '5. Megálló – tudáspróba – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="szamolas-500-ig"
      topicId={topicId}
      subtopicId="megallo"
      title={topicTitle}
      subtitle="Számold ki, és válogasd szét!"
      levels={COUNT500_EXAM_G3_SORTER_LEVELS}
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

export default Count500ExamG3Sorter;

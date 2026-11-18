import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { GroupsCard, ArrayCard, JumpsCard, CoinsCard } from './MultExamG2CardFigures';

interface MultExamG2SorterProps {
  level?: DifficultyLevel | { level?: DifficultyLevel };
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
}

const MULT_EXAM_G2_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mennyi az eredmény?',
    description: 'Számolj! 12, 18 vagy 20 az eredmény?',
    categories: [
      { id: 'r12', name: '= 12', color: 'sky' },
      { id: 'r18', name: '= 18', color: 'emerald' },
      { id: 'r20', name: '= 20', color: 'amber' },
    ],
    items: [
      { id: 'g2mxs1', text: '', categoryId: 'r12', figure: <GroupsCard sizes={[4, 4, 4]} small /> },
      { id: 'g2mxs2', text: '', categoryId: 'r12', figure: <ArrayCard rows={2} cols={6} small /> },
      { id: 'g2mxs3', text: '6 · 2', categoryId: 'r12' },
      { id: 'g2mxs4', text: '', categoryId: 'r18', figure: <GroupsCard sizes={[6, 6, 6]} small /> },
      { id: 'g2mxs5', text: '', categoryId: 'r18', figure: <ArrayCard rows={2} cols={9} small /> },
      { id: 'g2mxs6', text: '9 · 2', categoryId: 'r18' },
      { id: 'g2mxs7', text: '', categoryId: 'r20', figure: <JumpsCard step={5} jumps={4} small /> },
      { id: 'g2mxs8', text: '', categoryId: 'r20', figure: <CoinsCard values={[10, 10]} small /> },
      { id: 'g2mxs9', text: '4 · 5', categoryId: 'r20' },
    ],
  },
  {
    level: 2,
    title: '2. szint: Kevesebb, pont annyi vagy több?',
    description: 'Számold ki! Kevesebb, mint 40, pont 40, vagy több, mint 40?',
    categories: [
      { id: 'lt', name: 'Kevesebb, mint 40', color: 'blue' },
      { id: 'eq', name: 'Pont 40', color: 'emerald' },
      { id: 'gt', name: 'Több, mint 40', color: 'rose' },
    ],
    items: [
      { id: 'g2mxs10', text: '6 · 6', categoryId: 'lt' },
      { id: 'g2mxs11', text: '', categoryId: 'lt', figure: <ArrayCard rows={5} cols={7} small /> },
      { id: 'g2mxs12', text: '', categoryId: 'lt', figure: <JumpsCard step={9} jumps={4} small /> },
      { id: 'g2mxs13', text: '8 · 5', categoryId: 'eq' },
      { id: 'g2mxs14', text: '4 · 10', categoryId: 'eq' },
      { id: 'g2mxs15', text: '', categoryId: 'eq', figure: <GroupsCard sizes={[8, 8, 8, 8, 8]} small /> },
      { id: 'g2mxs16', text: '7 · 6', categoryId: 'gt' },
      { id: 'g2mxs17', text: '', categoryId: 'gt', figure: <ArrayCard rows={5} cols={9} small /> },
      { id: 'g2mxs18', text: '', categoryId: 'gt', figure: <JumpsCard step={7} jumps={7} small /> },
    ],
  },
  {
    level: 3,
    title: '3. szint: Mennyi a hiányzó szám?',
    description: 'Hány ugrás vagy melyik tényező hiányzik? 6, 7 vagy 8?',
    categories: [
      { id: 'h6', name: 'Hiányzó szám: 6', color: 'sky' },
      { id: 'h7', name: 'Hiányzó szám: 7', color: 'purple' },
      { id: 'h8', name: 'Hiányzó szám: 8', color: 'amber' },
    ],
    items: [
      { id: 'g2mxs19', text: '□ · 6 = 36', categoryId: 'h6' },
      { id: 'g2mxs20', text: '4 · □ = 24', categoryId: 'h6' },
      { id: 'g2mxs21', text: '', categoryId: 'h6', figure: <JumpsCard step={7} jumps={6} endLabel="42" askJumps small /> },
      { id: 'g2mxs22', text: '□ · 8 = 56', categoryId: 'h7' },
      { id: 'g2mxs23', text: '9 · □ = 63', categoryId: 'h7' },
      { id: 'g2mxs24', text: '', categoryId: 'h7', figure: <JumpsCard step={5} jumps={7} endLabel="35" askJumps small /> },
      { id: 'g2mxs25', text: '8 · □ = 64', categoryId: 'h8' },
      { id: 'g2mxs26', text: '', categoryId: 'h8', figure: <JumpsCard step={3} jumps={8} endLabel="24" askJumps small /> },
      { id: 'g2mxs27', text: '', categoryId: 'h8', figure: <JumpsCard step={4} jumps={8} endLabel="32" askJumps small /> },
    ],
  },
];

export const MULT_EXAM_G2_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: MULT_EXAM_G2_SORTER_LEVELS_LIST[0],
  2: MULT_EXAM_G2_SORTER_LEVELS_LIST[1],
  3: MULT_EXAM_G2_SORTER_LEVELS_LIST[2],
};

export const MultExamG2Sorter: React.FC<MultExamG2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g2-szorzas-tudasproba-sorter',
  topicTitle = '10. Gyakorlás, tudáspróba – Csoportosító Játék',
}) => {
  const activeLevel: DifficultyLevel = currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <SorterTemplate
      grade={2}
      chapterId="szorzas"
      topicId={topicId}
      subtopicId="gyakorlas-tudasproba"
      title={topicTitle}
      subtitle="A IV. témakör összefoglalása: válogasd szét a szorzásokat és a képeket!"
      levels={MULT_EXAM_G2_SORTER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onComplete={onComplete}
    />
  );
};

export default MultExamG2Sorter;

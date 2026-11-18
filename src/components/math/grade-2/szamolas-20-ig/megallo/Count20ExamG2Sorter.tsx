import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  Blocks20Card,
  Frame20Card,
  ParityDotsCard,
  Pyramid3Card,
} from './Count20ExamG2CardFigures';

interface Count20ExamG2SorterProps {
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
  [key: string]: unknown;
}

const COUNT20_EXAM_G2_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Számcsoportok (0–20)',
    description: 'Számolj, és tedd a kártyát a megfelelő dobozba!',
    categories: [
      { id: 'egy_paros', name: 'Egyjegyű páros', color: 'emerald' },
      { id: 'ket_paros', name: 'Kétjegyű páros', color: 'sky' },
      { id: 'paratlan', name: 'Páratlan szám', color: 'amber' },
    ],
    items: [
      { id: 'g2c20exs1', text: '', categoryId: 'egy_paros', figure: <Blocks20Card t={0} e={6} small /> },
      { id: 'g2c20exs2', text: '', categoryId: 'egy_paros', figure: <ParityDotsCard count={8} /> },
      { id: 'g2c20exs3', text: '12 − 8', categoryId: 'egy_paros' },
      { id: 'g2c20exs4', text: '', categoryId: 'ket_paros', figure: <Blocks20Card t={1} e={4} small /> },
      { id: 'g2c20exs5', text: '', categoryId: 'ket_paros', figure: <Frame20Card a={10} b={2} small /> },
      { id: 'g2c20exs6', text: '11 + 7', categoryId: 'ket_paros' },
      { id: 'g2c20exs7', text: '', categoryId: 'paratlan', figure: <ParityDotsCard count={7} /> },
      { id: 'g2c20exs8', text: '', categoryId: 'paratlan', figure: <Blocks20Card t={1} e={5} small /> },
      { id: 'g2c20exs9', text: '19 − 6', categoryId: 'paratlan' },
    ],
  },
  {
    level: 2,
    title: '2. szint: Mennyi az eredmény?',
    description: 'Számold ki, hogy 8, 12 vagy 15 az eredmény!',
    categories: [
      { id: 'r8', name: '= 8', color: 'sky' },
      { id: 'r12', name: '= 12', color: 'purple' },
      { id: 'r15', name: '= 15', color: 'orange' },
    ],
    items: [
      { id: 'g2c20exs10', text: '', categoryId: 'r8', figure: <Frame20Card a={14} cross={6} small /> },
      { id: 'g2c20exs11', text: '', categoryId: 'r8', figure: <Pyramid3Card top="?" left={3} right={5} small /> },
      { id: 'g2c20exs12', text: '19 − 11', categoryId: 'r8' },
      { id: 'g2c20exs13', text: '', categoryId: 'r12', figure: <Frame20Card a={7} b={5} small /> },
      { id: 'g2c20exs14', text: '', categoryId: 'r12', figure: <Pyramid3Card top="?" left={8} right={4} small /> },
      { id: 'g2c20exs15', text: '18 − 6', categoryId: 'r12' },
      { id: 'g2c20exs16', text: '', categoryId: 'r15', figure: <Blocks20Card t={1} e={5} small /> },
      { id: 'g2c20exs17', text: '9 + 6', categoryId: 'r15' },
      { id: 'g2c20exs18', text: '20 − 5', categoryId: 'r15' },
    ],
  },
  {
    level: 3,
    title: '3. szint: Mennyi hiányzik?',
    description: 'Találd meg a hiányzó számot a piramisban vagy a nyitott mondatban!',
    categories: [
      { id: 'h4', name: '4 hiányzik', color: 'teal' },
      { id: 'h7', name: '7 hiányzik', color: 'rose' },
      { id: 'h9', name: '9 hiányzik', color: 'blue' },
    ],
    items: [
      { id: 'g2c20exs19', text: '', categoryId: 'h4', figure: <Pyramid3Card top={11} left={7} right="?" small /> },
      { id: 'g2c20exs20', text: '6 + □ = 10', categoryId: 'h4', figure: <Frame20Card a={6} small /> },
      { id: 'g2c20exs21', text: '16 − □ = 12', categoryId: 'h4' },
      { id: 'g2c20exs22', text: '', categoryId: 'h7', figure: <Pyramid3Card top={15} left="?" right={8} small /> },
      { id: 'g2c20exs23', text: '13 + □ = 20', categoryId: 'h7', figure: <Frame20Card a={13} small /> },
      { id: 'g2c20exs24', text: '□ + 9 = 16', categoryId: 'h7' },
      { id: 'g2c20exs25', text: '', categoryId: 'h9', figure: <Pyramid3Card top={17} left={8} right="?" small /> },
      { id: 'g2c20exs26', text: '14 − □ = 5', categoryId: 'h9' },
      { id: 'g2c20exs27', text: '□ + 11 = 20', categoryId: 'h9' },
    ],
  },
];

export const COUNT20_EXAM_G2_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: COUNT20_EXAM_G2_SORTER_LEVELS_LIST[0],
  2: COUNT20_EXAM_G2_SORTER_LEVELS_LIST[1],
  3: COUNT20_EXAM_G2_SORTER_LEVELS_LIST[2],
};

function resolveSorterLevel(
  level: DifficultyLevel | { level?: DifficultyLevel } | undefined,
  currentLevel: DifficultyLevel | undefined
): DifficultyLevel {
  if (currentLevel !== undefined) return currentLevel;
  if (typeof level === 'number') return level;
  if (level && typeof level === 'object' && level.level !== undefined) return level.level;
  return 1;
}

export const Count20ExamG2Sorter: React.FC<Count20ExamG2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g2-c20-tudasproba-sorter',
  topicTitle = '7. Megálló – Csoportosító játék',
  ...rest
}) => {
  const activeLevel = resolveSorterLevel(level, currentLevel);
  return (
    <SorterTemplate
      grade={2}
      chapterId="szamolas-20-ig"
      topicId={topicId}
      subtopicId="megallo"
      title={topicTitle}
      subtitle="Az I. témakör összefoglalása: válogasd szét a számokat és a műveleteket!"
      badge="2. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 20-IG"
      levels={COUNT20_EXAM_G2_SORTER_LEVELS}
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

export default Count20ExamG2Sorter;

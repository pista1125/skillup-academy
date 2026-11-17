import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { BlocksCard, DivDotsCard, DotRowsCard } from './Count100ExamG3CardFigures';

interface Count100ExamG3SorterProps {
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

const COUNT100_EXAM_G3_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: "1. szint: Kerek tízes, páros vagy páratlan?",
    description: "Hova tartozik a szám?",
    categories: [
      { id: 'kerek', name: "Kerek tízes", color: 'sky' },
      { id: 'paros', name: "Páros, de nem kerek tízes", color: 'amber' },
      { id: 'paratlan', name: "Páratlan", color: 'purple' }
    ],
    items: [
      { id: 'g3c100exs1', text: "", categoryId: 'kerek', figure: <BlocksCard t={3} e={0} small /> },
      { id: 'g3c100exs2', text: "70", categoryId: 'kerek' },
      { id: 'g3c100exs3', text: "100", categoryId: 'kerek' },
      { id: 'g3c100exs4', text: "", categoryId: 'paros', figure: <BlocksCard t={4} e={8} small /> },
      { id: 'g3c100exs5', text: "62", categoryId: 'paros' },
      { id: 'g3c100exs6', text: "", categoryId: 'paros', figure: <BlocksCard t={1} e={6} small /> },
      { id: 'g3c100exs7', text: "", categoryId: 'paratlan', figure: <BlocksCard t={5} e={7} small /> },
      { id: 'g3c100exs8', text: "91", categoryId: 'paratlan' },
      { id: 'g3c100exs9', text: "", categoryId: 'paratlan', figure: <BlocksCard t={3} e={3} small /> }
    ]
  },
  {
    level: 2,
    title: "2. szint: Mennyi a maradék?",
    description: "Végezd el az osztást, és nézd meg a maradékot!",
    categories: [
      { id: 'm0', name: "marad 0", color: 'emerald' },
      { id: 'm1', name: "marad 1", color: 'rose' },
      { id: 'm2', name: "marad 2", color: 'blue' }
    ],
    items: [
      { id: 'g3c100exs10', text: "24 : 4", categoryId: 'm0', figure: <DivDotsCard n={24} d={4} /> },
      { id: 'g3c100exs11', text: "35 : 5", categoryId: 'm0' },
      { id: 'g3c100exs12', text: "63 : 9", categoryId: 'm0' },
      { id: 'g3c100exs13', text: "13 : 4", categoryId: 'm1', figure: <DivDotsCard n={13} d={4} /> },
      { id: 'g3c100exs14', text: "22 : 3", categoryId: 'm1', figure: <DivDotsCard n={22} d={3} /> },
      { id: 'g3c100exs15', text: "50 : 7", categoryId: 'm1' },
      { id: 'g3c100exs16', text: "17 : 5", categoryId: 'm2', figure: <DivDotsCard n={17} d={5} /> },
      { id: 'g3c100exs17', text: "44 : 6", categoryId: 'm2' },
      { id: 'g3c100exs18', text: "74 : 9", categoryId: 'm2' }
    ]
  },
  {
    level: 3,
    title: "3. szint: Melyik eredmény?",
    description: "Figyelj a műveleti sorrendre és a zárójelre!",
    categories: [
      { id: 'r20', name: "= 20", color: 'teal' },
      { id: 'r30', name: "= 30", color: 'orange' },
      { id: 'r40', name: "= 40", color: 'purple' }
    ],
    items: [
      { id: 'g3c100exs19', text: "4 · 6 − 4", categoryId: 'r20', figure: <DotRowsCard rows={4} cols={6} crossLast={4} /> },
      { id: 'g3c100exs20', text: "(50 − 10) : 2", categoryId: 'r20' },
      { id: 'g3c100exs21', text: "2 + 3 · 6", categoryId: 'r20', figure: <DotRowsCard rows={3} cols={6} extra={2} /> },
      { id: 'g3c100exs22', text: "6 · 6 − 6", categoryId: 'r30', figure: <DotRowsCard rows={6} cols={6} crossLast={6} /> },
      { id: 'g3c100exs23', text: "(8 − 3) · 6", categoryId: 'r30', figure: <DotRowsCard rows={6} cols={8} crossEach={3} /> },
      { id: 'g3c100exs24', text: "45 − 30 : 2", categoryId: 'r30' },
      { id: 'g3c100exs25', text: "5 · (2 + 6)", categoryId: 'r40', figure: <DotRowsCard rows={5} cols={8} split={2} /> },
      { id: 'g3c100exs26', text: "64 − 8 · 3", categoryId: 'r40' },
      { id: 'g3c100exs27', text: "28 + 36 : 3", categoryId: 'r40' }
    ]
  }
];

export const COUNT100_EXAM_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: COUNT100_EXAM_G3_SORTER_LEVELS_LIST[0],
  2: COUNT100_EXAM_G3_SORTER_LEVELS_LIST[1],
  3: COUNT100_EXAM_G3_SORTER_LEVELS_LIST[2]
};

export const Count100ExamG3Sorter: React.FC<Count100ExamG3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-c100-tudasproba-sorter',
  topicTitle = "8. Megálló – tudáspróba – Csoportosító játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="szamolas-100-ig"
      topicId={topicId}
      subtopicId="megallo"
      title={topicTitle}
      subtitle="Az egész I. fejezet: válogasd szét a számokat és a műveleteket!"
      levels={COUNT100_EXAM_G3_SORTER_LEVELS}
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

export default Count100ExamG3Sorter;

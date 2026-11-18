import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { RulerCard, RodCard, DmBarCard } from './LengthG2CardFigures';

interface LengthG2SorterProps {
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

const LENGTH_G2_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Rövidebb vagy hosszabb, mint 1 dm?',
    description: '1 dm = 10 cm. A piros vonás a vonalzón a 10. Tedd a jó dobozba!',
    categories: [
      { id: 'lt', name: 'Rövidebb, mint 1 dm', color: 'sky' },
      { id: 'eq', name: 'Pontosan 1 dm', color: 'emerald' },
      { id: 'gt', name: 'Hosszabb, mint 1 dm', color: 'amber' }
    ],
    items: [
      { id: 'lens1', text: '', categoryId: 'lt', figure: <RulerCard len={6} small /> },
      { id: 'lens2', text: '', categoryId: 'lt', figure: <RulerCard len={3} small color="#22c55e" /> },
      { id: 'lens3', text: '9 cm', categoryId: 'lt' },
      { id: 'lens4', text: '', categoryId: 'eq', figure: <RulerCard len={10} small color="#ef4444" /> },
      { id: 'lens5', text: '', categoryId: 'eq', figure: <RodCard dm={1} cm={0} small /> },
      { id: 'lens6', text: '10 cm', categoryId: 'eq' },
      { id: 'lens7', text: '', categoryId: 'gt', figure: <RulerCard len={13} small color="#a855f7" /> },
      { id: 'lens8', text: '', categoryId: 'gt', figure: <RodCard dm={1} cm={2} small /> },
      { id: 'lens9', text: '2 dm', categoryId: 'gt' }
    ]
  },
  {
    level: 2,
    title: '2. szint: 24, 42 vagy 40 cm?',
    description: 'Vigyázz, ne cseréld fel a decimétert és a centimétert!',
    categories: [
      { id: 'c24', name: '24 cm', color: 'blue' },
      { id: 'c42', name: '42 cm', color: 'rose' },
      { id: 'c40', name: '40 cm', color: 'emerald' }
    ],
    items: [
      { id: 'lens10', text: '', categoryId: 'c24', figure: <RodCard dm={2} cm={4} small /> },
      { id: 'lens11', text: '2 dm 4 cm', categoryId: 'c24' },
      { id: 'lens12', text: '20 cm + 4 cm', categoryId: 'c24' },
      { id: 'lens13', text: '', categoryId: 'c42', figure: <RodCard dm={4} cm={2} small /> },
      { id: 'lens14', text: '4 dm 2 cm', categoryId: 'c42' },
      { id: 'lens15', text: '40 cm + 2 cm', categoryId: 'c42' },
      { id: 'lens16', text: '', categoryId: 'c40', figure: <RodCard dm={4} cm={0} small /> },
      { id: 'lens17', text: '', categoryId: 'c40', figure: <DmBarCard n={4} /> },
      { id: 'lens18', text: '4 dm', categoryId: 'c40' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Kevesebb vagy több, mint 1 m?',
    description: '1 m = 10 dm = 100 cm. Hasonlítsd össze, és tedd a jó dobozba!',
    categories: [
      { id: 'lt', name: 'Kevesebb, mint 1 m', color: 'sky' },
      { id: 'eq', name: 'Pontosan 1 m', color: 'emerald' },
      { id: 'gt', name: 'Több, mint 1 m', color: 'purple' }
    ],
    items: [
      { id: 'lens19', text: '90 cm', categoryId: 'lt' },
      { id: 'lens20', text: '', categoryId: 'lt', figure: <DmBarCard n={7} /> },
      { id: 'lens21', text: '5 dm + 4 dm', categoryId: 'lt' },
      { id: 'lens22', text: '100 cm', categoryId: 'eq' },
      { id: 'lens23', text: '', categoryId: 'eq', figure: <DmBarCard n={10} /> },
      { id: 'lens24', text: '50 cm + 50 cm', categoryId: 'eq' },
      { id: 'lens25', text: '2 m', categoryId: 'gt' },
      { id: 'lens26', text: '', categoryId: 'gt', figure: <DmBarCard n={12} /> },
      { id: 'lens27', text: '', categoryId: 'gt', figure: <DmBarCard n={15} /> }
    ]
  }
];

export const LENGTH_G2_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: LENGTH_G2_SORTER_LEVELS_LIST[0],
  2: LENGTH_G2_SORTER_LEVELS_LIST[1],
  3: LENGTH_G2_SORTER_LEVELS_LIST[2]
};

export const LengthG2Sorter: React.FC<LengthG2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g2-meres-hosszusag-sorter',
  topicTitle = '1. A hosszúság mérése – Csoportosító Játék'
}) => {
  const activeLevel: DifficultyLevel =
    currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <SorterTemplate
      grade={2}
      chapterId="meresek"
      topicId={topicId}
      subtopicId="hosszusag-meres"
      title={topicTitle}
      subtitle="Válogasd szét a hosszakat: rövidebb, egyenlő vagy hosszabb?"
      levels={LENGTH_G2_SORTER_LEVELS}
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

export default LengthG2Sorter;

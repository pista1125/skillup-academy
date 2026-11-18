import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { FrameSubCard, BackwardJumpCard, WheelStep20Card, ChainStepCard } from './Sub20G2CardFigures';

interface Sub20G2SorterProps {
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

const SUB20_G2_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mennyi a különbség?',
    description: 'Számold ki a különbséget a képekről és a műveletekből, majd tedd a jó dobozba!',
    categories: [
      { id: 'diff5', name: 'Különbség: 5', color: 'sky' },
      { id: 'diff10', name: 'Különbség: 10', color: 'emerald' },
      { id: 'diff12', name: 'Különbség: 12', color: 'amber' }
    ],
    items: [
      { id: 's20s1', text: '', categoryId: 'diff5', figure: <FrameSubCard total={15} taken={10} small /> },
      { id: 's20s2', text: '', categoryId: 'diff5', figure: <BackwardJumpCard start={18} sub={13} small /> },
      { id: 's20s3', text: '14 − 9', categoryId: 'diff5' },
      { id: 's20s4', text: '', categoryId: 'diff10', figure: <FrameSubCard total={17} taken={7} small /> },
      { id: 's20s5', text: '', categoryId: 'diff10', figure: <WheelStep20Card center={20} sub={10} small /> },
      { id: 's20s6', text: '13 − 3', categoryId: 'diff10' },
      { id: 's20s7', text: '', categoryId: 'diff12', figure: <BackwardJumpCard start={16} sub={4} small /> },
      { id: 's20s8', text: '19 − 7', categoryId: 'diff12' },
      { id: 's20s9', text: '15 − 3', categoryId: 'diff12' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Hogyan számoljuk ki?',
    description: 'Válogasd szét: 10-re lépünk / 10-et veszünk el, tízesátlépés nélkül, vagy tízesátlépéssel számoljuk?',
    categories: [
      { id: 'to10', name: '10-re lépés / −10', color: 'blue' },
      { id: 'nocross', name: 'Tízesátlépés nélkül', color: 'emerald' },
      { id: 'cross', name: 'Tízesátlépéssel', color: 'rose' }
    ],
    items: [
      { id: 's20s10', text: '', categoryId: 'to10', figure: <FrameSubCard total={16} taken={6} small /> },
      { id: 's20s11', text: '19 − 10', categoryId: 'to10' },
      { id: 's20s12', text: '13 − 3', categoryId: 'to10' },
      { id: 's20s13', text: '', categoryId: 'nocross', figure: <BackwardJumpCard start={17} sub={4} small /> },
      { id: 's20s14', text: '', categoryId: 'nocross', figure: <FrameSubCard total={18} taken={5} small /> },
      { id: 's20s15', text: '16 − 2', categoryId: 'nocross' },
      { id: 's20s16', text: '', categoryId: 'cross', figure: <BackwardJumpCard start={14} sub={6} small /> },
      { id: 's20s17', text: '', categoryId: 'cross', figure: <WheelStep20Card center={20} sub={5} small /> },
      { id: 's20s18', text: '12 − 7', categoryId: 'cross' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mennyi a hiányzó szám vagy végeredmény?',
    description: 'Számold ki, melyik szám (4, 7 vagy 9) hiányzik vagy jön ki a lánc végén!',
    categories: [
      { id: 'val4', name: 'Eredmény / □ = 4', color: 'sky' },
      { id: 'val7', name: 'Eredmény / □ = 7', color: 'purple' },
      { id: 'val9', name: 'Eredmény / □ = 9', color: 'amber' }
    ],
    items: [
      { id: 's20s19', text: '', categoryId: 'val4', figure: <ChainStepCard start={16} step1={6} step2={6} small /> },
      { id: 's20s20', text: '', categoryId: 'val4', figure: <BackwardJumpCard start={17} sub={13} small /> },
      { id: 's20s21', text: '19 − □ = 15', categoryId: 'val4' },
      { id: 's20s22', text: '', categoryId: 'val7', figure: <ChainStepCard start={15} step1={5} step2={3} small /> },
      { id: 's20s23', text: '', categoryId: 'val7', figure: <WheelStep20Card center={20} sub={13} small /> },
      { id: 's20s24', text: '16 − 5 = 18 − □', categoryId: 'val7' },
      { id: 's20s25', text: '', categoryId: 'val9', figure: <ChainStepCard start={18} step1={8} step2={1} small /> },
      { id: 's20s26', text: '□ + 8 = 17', categoryId: 'val9' },
      { id: 's20s27', text: '20 − 11', categoryId: 'val9' }
    ]
  }
];

export const SUB20_G2_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: SUB20_G2_SORTER_LEVELS_LIST[0],
  2: SUB20_G2_SORTER_LEVELS_LIST[1],
  3: SUB20_G2_SORTER_LEVELS_LIST[2]
};

export const Sub20G2Sorter: React.FC<Sub20G2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g2-c20-kivonas20-sorter',
  topicTitle = '5. Kivonás 20-as számkör – Csoportosító Játék'
}) => {
  const activeLevel: DifficultyLevel =
    currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <SorterTemplate
      grade={2}
      chapterId="szamolas-20-ig"
      topicId={topicId}
      subtopicId="kivonas-20-as-szamkor"
      title={topicTitle}
      subtitle="Válogasd szét a kivonásokat különbség, számolási mód és hiányzó szám szerint!"
      levels={SUB20_G2_SORTER_LEVELS}
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

export default Sub20G2Sorter;

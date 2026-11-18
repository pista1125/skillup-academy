import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  FrameSubCard,
  BackwardJumpCard,
  WheelStep20Card,
  BalanceSubCard150,
  ChainStepCard
} from './Sub20G2CardFigures';

interface Sub20G2MatcherProps {
  level?: DifficultyLevel | { level?: DifficultyLevel };
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onComplete?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const SUB20_G2_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: 10-ig visszalépés és kistesó',
    description: 'Számold meg a megmaradt korongokat vagy végezd el a kivonást, és párosítsd az eredménnyel!',
    pairs: [
      { id: 's20m1', left: '', right: '10', promptFigure: <FrameSubCard total={14} taken={4} /> },
      { id: 's20m2', left: '16 − 10', right: '6' },
      { id: 's20m3', left: '', right: '13', promptFigure: <FrameSubCard total={17} taken={4} /> },
      { id: 's20m4', left: '', right: '14', promptFigure: <BackwardJumpCard start={18} sub={4} /> },
      { id: 's20m5', left: '19 − 7', right: '12' },
      { id: 's20m6', left: '', right: '11', promptFigure: <FrameSubCard total={15} taken={4} /> },
      { id: 's20m7', left: '20 − 10', right: '10', promptFigure: undefined },
      { id: 's20m8', left: '', right: '15', promptFigure: <BackwardJumpCard start={19} sub={4} /> }
    ]
  },
  {
    level: 2,
    title: '2. szint: Tízesátlépés és 20-as kerék',
    description: 'Lépj vissza 10-re a keretben vagy a keréken, majd párosítsd a különbséggel!',
    pairs: [
      { id: 's20m9', left: '', right: '8', promptFigure: <FrameSubCard total={14} taken={6} /> },
      { id: 's20m10', left: '13 − 3 − 4', right: '6' },
      { id: 's20m11', left: '', right: '9', promptFigure: <FrameSubCard total={16} taken={7} /> },
      { id: 's20m12', left: '', right: '7', promptFigure: <BackwardJumpCard start={15} sub={8} /> },
      { id: 's20m13', left: '', right: '13', promptFigure: <WheelStep20Card center={20} sub={7} /> },
      { id: 's20m14', left: '11 − 6', right: '5' },
      { id: 's20m15', left: '', right: '12', promptFigure: <WheelStep20Card center={20} sub={8} /> },
      { id: 's20m16', left: '12 − 2 − 6', right: '4' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Kétjegyű kivonása és hiányzó szám',
    description: 'Keresd meg a hiányzó számot a mérlegen, a láncban vagy a kivonásban!',
    pairs: [
      { id: 's20m17', left: '', right: '7', promptFigure: <BalanceSubCard150 leftExpr="16−5" rightExpr="18−?" /> },
      { id: 's20m18', left: '', right: '5', promptFigure: <ChainStepCard start={17} step1={7} step2={5} /> },
      { id: 's20m19', left: '□ − 6 = 9', right: '15' },
      { id: 's20m20', left: '', right: '8', promptFigure: <BalanceSubCard150 leftExpr="14−6" rightExpr="16−?" /> },
      { id: 's20m21', left: '', right: '4', promptFigure: <ChainStepCard start={18} step1={10} step2={4} /> },
      { id: 's20m22', left: '19 − 13', right: '6' },
      { id: 's20m23', left: '', right: '9', promptFigure: <WheelStep20Card center={20} sub={11} /> },
      { id: 's20m24', left: '□ − 8 = 9', right: '17' }
    ]
  }
];

// Check level 1 distinct right values: 10, 6, 13, 14, 12, 11, 10 -> wait! s20m1 and s20m7 both have right '10'! Let's fix s20m7!

export const SUB20_G2_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    ...SUB20_G2_MATCHER_LEVELS_LIST[0],
    pairs: [
      { id: 's20m1', left: '', right: '10', promptFigure: <FrameSubCard total={14} taken={4} /> },
      { id: 's20m2', left: '16 − 10', right: '6' },
      { id: 's20m3', left: '', right: '13', promptFigure: <FrameSubCard total={17} taken={4} /> },
      { id: 's20m4', left: '', right: '14', promptFigure: <BackwardJumpCard start={18} sub={4} /> },
      { id: 's20m5', left: '19 − 7', right: '12' },
      { id: 's20m6', left: '', right: '11', promptFigure: <FrameSubCard total={15} taken={4} /> },
      { id: 's20m7', left: '18 − 10', right: '8' },
      { id: 's20m8', left: '', right: '15', promptFigure: <BackwardJumpCard start={19} sub={4} /> }
    ]
  },
  2: SUB20_G2_MATCHER_LEVELS_LIST[1],
  3: SUB20_G2_MATCHER_LEVELS_LIST[2]
};

export const Sub20G2Matcher: React.FC<Sub20G2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g2-c20-kivonas20-matcher',
  topicTitle = '5. Kivonás 20-as számkör – Párosító Játék'
}) => {
  const activeLevel: DifficultyLevel =
    currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <MatcherTemplate
      grade={2}
      chapterId="szamolas-20-ig"
      topicId={topicId}
      subtopicId="kivonas-20-as-szamkor"
      title={topicTitle}
      subtitle="Párosítsd a kivonásokat, a 20-as kereteket és a hiányzó számokat!"
      levels={SUB20_G2_MATCHER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onComplete={onComplete}
    />
  );
};

export default Sub20G2Matcher;

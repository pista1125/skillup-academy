import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { FrameCard150, JumpCard, PyramidCard, BalanceCard150 } from './Add20G2CardFigures';

interface Add20G2MatcherProps {
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

const ADD20_G2_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: 10 + egyesek és kistesó',
    description: 'Számold meg a korongokat vagy végezd el az összeadást, és párosítsd az összeggel!',
    pairs: [
      { id: 'a20m1', left: '10 + 1', right: '11' },
      { id: 'a20m2', left: '', right: '12', promptFigure: <FrameCard150 first={10} second={2} /> },
      { id: 'a20m3', left: '', right: '14', promptFigure: <FrameCard150 first={10} second={4} /> },
      { id: 'a20m4', left: '', right: '15', promptFigure: <JumpCard start={11} add={4} /> },
      { id: 'a20m5', left: '4 + 12', right: '16' },
      { id: 'a20m6', left: '', right: '17', promptFigure: <FrameCard150 first={10} second={7} /> },
      { id: 'a20m7', left: '15 + 3', right: '18' },
      { id: 'a20m8', left: '', right: '19', promptFigure: <PyramidCard left="13" right="6" /> }
    ]
  },
  {
    level: 2,
    title: '2. szint: Tízesátlépés',
    description: 'Pótold 10-re a képen vagy fejben, majd párosítsd az összeggel!',
    pairs: [
      { id: 'a20m9', left: '', right: '11', promptFigure: <FrameCard150 first={8} second={3} /> },
      { id: 'a20m10', left: '7 + 3 + 2', right: '12' },
      { id: 'a20m11', left: '', right: '13', promptFigure: <FrameCard150 first={9} second={4} /> },
      { id: 'a20m12', left: '', right: '14', promptFigure: <JumpCard start={8} add={6} /> },
      { id: 'a20m13', left: '6 + 9', right: '15' },
      { id: 'a20m14', left: '', right: '16', promptFigure: <FrameCard150 first={7} second={9} /> },
      { id: 'a20m15', left: '8 + 2 + 7', right: '17' },
      { id: 'a20m16', left: '', right: '18', promptFigure: <PyramidCard left="9" right="9" /> }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hiányzó szám és három tag',
    description: 'Keresd meg a ? vagy a □ értékét, vagy add össze a három számot!',
    pairs: [
      { id: 'a20m17', left: '', right: '3', promptFigure: <BalanceCard150 leftExpr="12+5" rightExpr="14+?" /> },
      { id: 'a20m18', left: '', right: '4', promptFigure: <PyramidCard left="9" right="?" top="13" /> },
      { id: 'a20m19', left: '6 + □ + 9 = 20', right: '5' },
      { id: 'a20m20', left: '', right: '6', promptFigure: <BalanceCard150 leftExpr="8+7" rightExpr="9+?" /> },
      { id: 'a20m21', left: '', right: '7', promptFigure: <PyramidCard left="?" right="8" top="15" /> },
      { id: 'a20m22', left: '□ + 7 = 15', right: '8' },
      { id: 'a20m23', left: '', right: '9', promptFigure: <BalanceCard150 leftExpr="11+8" rightExpr="10+?" /> },
      { id: 'a20m24', left: '5 + 7 + 8', right: '20' }
    ]
  }
];

export const ADD20_G2_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: ADD20_G2_MATCHER_LEVELS_LIST[0],
  2: ADD20_G2_MATCHER_LEVELS_LIST[1],
  3: ADD20_G2_MATCHER_LEVELS_LIST[2]
};

export const Add20G2Matcher: React.FC<Add20G2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g2-c20-osszeadas20-matcher',
  topicTitle = '4. Összeadás 20-as számkör – Párosító Játék'
}) => {
  const activeLevel: DifficultyLevel =
    currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <MatcherTemplate
      grade={2}
      chapterId="szamolas-20-ig"
      topicId={topicId}
      subtopicId="osszeadas-20-as-szamkor"
      title={topicTitle}
      subtitle="Párosítsd az összeadásokat, a képeket és a hiányzó számokat!"
      levels={ADD20_G2_MATCHER_LEVELS}
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

export default Add20G2Matcher;

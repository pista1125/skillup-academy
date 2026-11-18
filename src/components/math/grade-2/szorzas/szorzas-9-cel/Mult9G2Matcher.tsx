import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { GroupsCard, RowsCard, JumpsCard, TenMinusCard150, HowManyBoxesCard150 } from './Mult9G2CardFigures';

interface Mult9G2MatcherProps {
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

const MULT9_G2_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mennyi?',
    description: 'Számold ki a szorzatot! Párosítsd a számmal!',
    pairs: [
      { id: 'm9m1', left: '', right: '18', promptFigure: <GroupsCard n={2} /> },
      { id: 'm9m2', left: '3 · 9', right: '27' },
      { id: 'm9m3', left: '', right: '36', promptFigure: <GroupsCard n={4} /> },
      { id: 'm9m4', left: '9 + 9 + 9 + 9 + 9', right: '45' },
      { id: 'm9m5', left: '', right: '54', promptFigure: <RowsCard n={6} /> },
      { id: 'm9m6', left: '7 · 9', right: '63' },
      { id: 'm9m7', left: '', right: '72', promptFigure: <JumpsCard jumps={8} /> },
      { id: 'm9m8', left: '9 · 9', right: '81' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Melyik szorzás?',
    description: 'Melyik szorzás illik a képhez vagy a művelethez?',
    pairs: [
      { id: 'm9m9', left: '9 + 9', right: '2 · 9' },
      { id: 'm9m10', left: '', right: '3 · 9', promptFigure: <GroupsCard n={3} /> },
      { id: 'm9m11', left: '', right: '4 · 9', promptFigure: <RowsCard n={4} /> },
      { id: 'm9m12', left: '', right: '5 · 9', promptFigure: <JumpsCard jumps={5} /> },
      { id: 'm9m13', left: '60 − 6', right: '6 · 9' },
      { id: 'm9m14', left: '', right: '7 · 9', promptFigure: <GroupsCard n={7} /> },
      { id: 'm9m15', left: '80 − 8', right: '8 · 9' },
      { id: 'm9m16', left: '90 − 9', right: '9 · 9' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hiányzó szám',
    description: 'Keresd meg a ? vagy a □ helyére illő számot!',
    pairs: [
      { id: 'm9m17', left: '', right: '5', promptFigure: <JumpsCard jumps={5} endLabel="45" unknownJumps /> },
      { id: 'm9m18', left: '9 · □ = 63', right: '7' },
      { id: 'm9m19', left: '', right: '8', promptFigure: <HowManyBoxesCard150 total={72} /> },
      { id: 'm9m20', left: '□ · 9 = 36', right: '4' },
      { id: 'm9m21', left: '2 · 9 + 9', right: '27' },
      { id: 'm9m22', left: '6 · 9 − 9', right: '45' },
      { id: 'm9m23', left: '', right: '54', promptFigure: <TenMinusCard150 n={6} /> },
      { id: 'm9m24', left: '', right: '81', promptFigure: <TenMinusCard150 n={9} /> }
    ]
  }
];

export const MULT9_G2_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: MULT9_G2_MATCHER_LEVELS_LIST[0],
  2: MULT9_G2_MATCHER_LEVELS_LIST[1],
  3: MULT9_G2_MATCHER_LEVELS_LIST[2]
};

export const Mult9G2Matcher: React.FC<Mult9G2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g2-szorzas-9-matcher',
  topicTitle = '8. Szorzás 9-cel – Párosító Játék'
}) => {
  const activeLevel: DifficultyLevel = currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <MatcherTemplate
      grade={2}
      chapterId="szorzas"
      topicId={topicId}
      subtopicId="szorzas-9-cel"
      title={topicTitle}
      subtitle="Párosítsd a kilences csoportokat, a szorzásokat és a hiányzó számokat!"
      levels={MULT9_G2_MATCHER_LEVELS}
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

export default Mult9G2Matcher;

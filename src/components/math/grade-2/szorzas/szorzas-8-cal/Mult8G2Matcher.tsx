import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { GroupsCard, RowsCard, JumpsCard, DoubleCard150, HowManyBoxesCard150 } from './Mult8G2CardFigures';

interface Mult8G2MatcherProps {
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

const MULT8_G2_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mennyi?',
    description: 'Számold ki a szorzatot! Párosítsd a számmal!',
    pairs: [
      { id: 'm8m1', left: '', right: '16', promptFigure: <GroupsCard n={2} /> },
      { id: 'm8m2', left: '3 · 8', right: '24' },
      { id: 'm8m3', left: '', right: '32', promptFigure: <GroupsCard n={4} /> },
      { id: 'm8m4', left: '8 + 8 + 8 + 8 + 8', right: '40' },
      { id: 'm8m5', left: '', right: '48', promptFigure: <RowsCard n={6} /> },
      { id: 'm8m6', left: '7 · 8', right: '56' },
      { id: 'm8m7', left: '', right: '64', promptFigure: <JumpsCard jumps={8} /> },
      { id: 'm8m8', left: '10 · 8', right: '80' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Melyik szorzás?',
    description: 'Melyik szorzás illik a képhez vagy a művelethez?',
    pairs: [
      { id: 'm8m9', left: '8 + 8', right: '2 · 8' },
      { id: 'm8m10', left: '', right: '3 · 8', promptFigure: <GroupsCard n={3} /> },
      { id: 'm8m11', left: '', right: '4 · 8', promptFigure: <RowsCard n={4} /> },
      { id: 'm8m12', left: '', right: '5 · 8', promptFigure: <JumpsCard jumps={5} /> },
      { id: 'm8m13', left: '6 · 4 + 6 · 4', right: '6 · 8' },
      { id: 'm8m14', left: '', right: '7 · 8', promptFigure: <GroupsCard n={7} /> },
      { id: 'm8m15', left: '8 · 4 + 8 · 4', right: '8 · 8' },
      { id: 'm8m16', left: '10 · 8 − 8', right: '9 · 8' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hiányzó szám',
    description: 'Keresd meg a ? vagy a □ helyére illő számot!',
    pairs: [
      { id: 'm8m17', left: '', right: '5', promptFigure: <JumpsCard jumps={5} endLabel="40" unknownJumps /> },
      { id: 'm8m18', left: '8 · □ = 56', right: '7' },
      { id: 'm8m19', left: '', right: '9', promptFigure: <HowManyBoxesCard150 total={72} /> },
      { id: 'm8m20', left: '□ · 8 = 24', right: '3' },
      { id: 'm8m21', left: '6 · 8 − 8', right: '40' },
      { id: 'm8m22', left: '2 · 8 + 2', right: '18' },
      { id: 'm8m23', left: '', right: '48', promptFigure: <DoubleCard150 n={6} /> },
      { id: 'm8m24', left: '', right: '64', promptFigure: <DoubleCard150 n={8} /> }
    ]
  }
];

export const MULT8_G2_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: MULT8_G2_MATCHER_LEVELS_LIST[0],
  2: MULT8_G2_MATCHER_LEVELS_LIST[1],
  3: MULT8_G2_MATCHER_LEVELS_LIST[2]
};

export const Mult8G2Matcher: React.FC<Mult8G2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g2-szorzas-8-matcher',
  topicTitle = '7. Szorzás 8-cal – Párosító Játék'
}) => {
  const activeLevel: DifficultyLevel = currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <MatcherTemplate
      grade={2}
      chapterId="szorzas"
      topicId={topicId}
      subtopicId="szorzas-8-cal"
      title={topicTitle}
      subtitle="Párosítsd a nyolcas csoportokat, a szorzásokat és a hiányzó számokat!"
      levels={MULT8_G2_MATCHER_LEVELS}
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

export default Mult8G2Matcher;

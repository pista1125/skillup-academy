import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { GroupsCard, ColumnsCard, JumpsCard, DoubleCard150, HowManyBoxesCard150 } from './Mult4G2CardFigures';

interface Mult4G2MatcherProps {
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

const MULT4_G2_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mennyi?',
    description: 'Számold ki a szorzatot! Párosítsd a számmal!',
    pairs: [
      { id: 'm4m1', left: '', right: '8', promptFigure: <GroupsCard n={2} /> },
      { id: 'm4m2', left: '3 · 4', right: '12' },
      { id: 'm4m3', left: '', right: '16', promptFigure: <GroupsCard n={4} /> },
      { id: 'm4m4', left: '4 + 4 + 4 + 4 + 4', right: '20' },
      { id: 'm4m5', left: '', right: '24', promptFigure: <ColumnsCard n={6} /> },
      { id: 'm4m6', left: '7 · 4', right: '28' },
      { id: 'm4m7', left: '', right: '32', promptFigure: <JumpsCard jumps={8} /> },
      { id: 'm4m8', left: '10 · 4', right: '40' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Melyik szorzás?',
    description: 'Melyik szorzás illik a képhez vagy az összeadáshoz?',
    pairs: [
      { id: 'm4m9', left: '4 + 4', right: '2 · 4' },
      { id: 'm4m10', left: '', right: '3 · 4', promptFigure: <GroupsCard n={3} /> },
      { id: 'm4m11', left: '', right: '4 · 4', promptFigure: <ColumnsCard n={4} /> },
      { id: 'm4m12', left: '', right: '5 · 4', promptFigure: <JumpsCard jumps={5} /> },
      { id: 'm4m13', left: '4 + 4 + 4 + 4 + 4 + 4', right: '6 · 4' },
      { id: 'm4m14', left: '', right: '7 · 4', promptFigure: <GroupsCard n={7} /> },
      { id: 'm4m15', left: '8 · 2 + 8 · 2', right: '8 · 4' },
      { id: 'm4m16', left: '9 · 2 + 9 · 2', right: '9 · 4' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hiányzó szám',
    description: 'Keresd meg a ? vagy a □ helyére illő számot!',
    pairs: [
      { id: 'm4m17', left: '', right: '5', promptFigure: <JumpsCard jumps={5} endLabel="20" unknownJumps /> },
      { id: 'm4m18', left: '4 · □ = 28', right: '7' },
      { id: 'm4m19', left: '', right: '8', promptFigure: <HowManyBoxesCard150 total={32} /> },
      { id: 'm4m20', left: '□ · 4 = 36', right: '9' },
      { id: 'm4m21', left: '3 · 4 + 4', right: '16' },
      { id: 'm4m22', left: '6 · 4 − 4', right: '20' },
      { id: 'm4m23', left: '', right: '24', promptFigure: <DoubleCard150 n={6} /> },
      { id: 'm4m24', left: '', right: '40', promptFigure: <DoubleCard150 n={10} /> }
    ]
  }
];

export const MULT4_G2_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: MULT4_G2_MATCHER_LEVELS_LIST[0],
  2: MULT4_G2_MATCHER_LEVELS_LIST[1],
  3: MULT4_G2_MATCHER_LEVELS_LIST[2]
};

export const Mult4G2Matcher: React.FC<Mult4G2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g2-szorzas-4-matcher',
  topicTitle = '3. Szorzás 4-gyel – Párosító Játék'
}) => {
  const activeLevel: DifficultyLevel = currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <MatcherTemplate
      grade={2}
      chapterId="szorzas"
      topicId={topicId}
      subtopicId="szorzas-4-gyel"
      title={topicTitle}
      subtitle="Párosítsd a négyes csoportokat, a szorzásokat és a hiányzó számokat!"
      levels={MULT4_G2_MATCHER_LEVELS}
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

export default Mult4G2Matcher;

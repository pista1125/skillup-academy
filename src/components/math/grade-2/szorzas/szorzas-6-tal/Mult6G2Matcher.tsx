import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { BoxesCard, DiceCard, JumpsCard, ArrayCard, ChainCard } from './Mult6G2CardFigures';

interface Mult6G2MatcherProps {
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

const MULT6_G2_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Összeadásból szorzás',
    description: 'Melyik szorzás illik a képhez vagy az összeadáshoz?',
    pairs: [
      { id: 'm6m1', left: '', right: '3 · 6', promptFigure: <BoxesCard groups={3} /> },
      { id: 'm6m2', left: '6 + 6 + 6 + 6', right: '4 · 6' },
      { id: 'm6m3', left: '', right: '5 · 6', promptFigure: <DiceCard n={5} /> },
      { id: 'm6m4', left: '6 + 6', right: '2 · 6' },
      { id: 'm6m5', left: '', right: '7 · 6', promptFigure: <JumpsCard jumps={7} /> },
      { id: 'm6m6', left: '', right: '6 · 6', promptFigure: <BoxesCard groups={6} /> },
      { id: 'm6m7', left: 'nyolcszor hat', right: '8 · 6' },
      { id: 'm6m8', left: '', right: '10 · 6', promptFigure: <BoxesCard groups={10} /> }
    ]
  },
  {
    level: 2,
    title: '2. szint: A 6-os szorzótábla',
    description: 'Számold ki a szorzatot, és párosítsd az eredménnyel!',
    pairs: [
      { id: 'm6m9', left: '', right: '30', promptFigure: <BoxesCard groups={5} /> },
      { id: 'm6m10', left: '7 · 6', right: '42' },
      { id: 'm6m11', left: '', right: '24', promptFigure: <JumpsCard jumps={4} /> },
      { id: 'm6m12', left: '9 · 6', right: '54' },
      { id: 'm6m13', left: '', right: '36', promptFigure: <DiceCard n={6} /> },
      { id: 'm6m14', left: '8 · 6', right: '48' },
      { id: 'm6m15', left: '', right: '12', promptFigure: <ArrayCard rows={2} cols={6} /> },
      { id: 'm6m16', left: '6 · 3', right: '18' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hiányzó számok',
    description: 'Mi kerül a □ vagy a ? helyére? Párosítsd!',
    pairs: [
      { id: 'm6m17', left: '□ · 6 = 42', right: '7' },
      { id: 'm6m18', left: '', right: '9', promptFigure: <JumpsCard jumps={9} endLabel="54" /> },
      { id: 'm6m19', left: '□ · 6 = 18', right: '3' },
      { id: 'm6m20', left: '', right: '30', promptFigure: <ChainCard n={5} /> },
      { id: 'm6m21', left: 'a 4 hatszorosa', right: '24' },
      { id: 'm6m22', left: '', right: '8', promptFigure: <JumpsCard jumps={8} endLabel="48" /> },
      { id: 'm6m23', left: '6 · 6 = □', right: '36' },
      { id: 'm6m24', left: '', right: '60', promptFigure: <JumpsCard jumps={10} /> }
    ]
  }
];

export const MULT6_G2_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: MULT6_G2_MATCHER_LEVELS_LIST[0],
  2: MULT6_G2_MATCHER_LEVELS_LIST[1],
  3: MULT6_G2_MATCHER_LEVELS_LIST[2]
};

export const Mult6G2Matcher: React.FC<Mult6G2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g2-szorzas-6-matcher',
  topicTitle = '5. Szorzás 6-tal – Párosító Játék'
}) => {
  const activeLevel: DifficultyLevel =
    currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <MatcherTemplate
      grade={2}
      chapterId="szorzas"
      topicId={topicId}
      subtopicId="szorzas-6-tal"
      title={topicTitle}
      subtitle="Párosítsd a képeket, az összeadásokat és a szorzásokat!"
      levels={MULT6_G2_MATCHER_LEVELS}
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

export default Mult6G2Matcher;

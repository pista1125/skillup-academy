import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { WeeksCard, ArrayCard, JumpsCard, HowManyWeeksCard150 } from './Mult7G2CardFigures';

interface Mult7G2MatcherProps {
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

const MULT7_G2_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mennyi?',
    description: 'Számold ki a szorzatot! Párosítsd a számmal!',
    pairs: [
      { id: 'm7m1', left: '', right: '14', promptFigure: <WeeksCard n={2} /> },
      { id: 'm7m2', left: '3 · 7', right: '21' },
      { id: 'm7m3', left: '', right: '28', promptFigure: <ArrayCard rows={4} /> },
      { id: 'm7m4', left: '7 + 7 + 7 + 7 + 7', right: '35' },
      { id: 'm7m5', left: '', right: '42', promptFigure: <JumpsCard jumps={6} /> },
      { id: 'm7m6', left: '7 · 7', right: '49' },
      { id: 'm7m7', left: '', right: '56', promptFigure: <WeeksCard n={8} /> },
      { id: 'm7m8', left: '10 · 7', right: '70' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Melyik szorzás?',
    description: 'Melyik szorzás illik a képhez vagy az összeadáshoz?',
    pairs: [
      { id: 'm7m9', left: '7 + 7', right: '2 · 7' },
      { id: 'm7m10', left: '', right: '3 · 7', promptFigure: <WeeksCard n={3} /> },
      { id: 'm7m11', left: '', right: '4 · 7', promptFigure: <ArrayCard rows={4} /> },
      { id: 'm7m12', left: '', right: '5 · 7', promptFigure: <JumpsCard jumps={5} /> },
      { id: 'm7m13', left: '6 · 5 + 6 · 2', right: '6 · 7' },
      { id: 'm7m14', left: '', right: '7 · 7', promptFigure: <WeeksCard n={7} /> },
      { id: 'm7m15', left: '8 · 5 + 8 · 2', right: '8 · 7' },
      { id: 'm7m16', left: '9 · 5 + 9 · 2', right: '9 · 7' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hiányzó szám',
    description: 'Keresd meg a ? vagy a □ helyére illő számot!',
    pairs: [
      { id: 'm7m17', left: '', right: '5', promptFigure: <JumpsCard jumps={5} endLabel="35" unknownJumps /> },
      { id: 'm7m18', left: '7 · □ = 42', right: '6' },
      { id: 'm7m19', left: '', right: '7', promptFigure: <HowManyWeeksCard150 total={49} /> },
      { id: 'm7m20', left: '□ · 7 = 56', right: '8' },
      { id: 'm7m21', left: '', right: '17', promptFigure: <WeeksCard n={2} extra={3} /> },
      { id: 'm7m22', left: '3 · 7 + 7', right: '28' },
      { id: 'm7m23', left: '', right: '29', promptFigure: <WeeksCard n={4} extra={1} /> },
      { id: 'm7m24', left: '9 · 5 + 9 · 2', right: '63' }
    ]
  }
];

export const MULT7_G2_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: MULT7_G2_MATCHER_LEVELS_LIST[0],
  2: MULT7_G2_MATCHER_LEVELS_LIST[1],
  3: MULT7_G2_MATCHER_LEVELS_LIST[2]
};

export const Mult7G2Matcher: React.FC<Mult7G2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g2-szorzas-7-matcher',
  topicTitle = '6. Szorzás 7-tel – Párosító Játék'
}) => {
  const activeLevel: DifficultyLevel = currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <MatcherTemplate
      grade={2}
      chapterId="szorzas"
      topicId={topicId}
      subtopicId="szorzas-7-tel"
      title={topicTitle}
      subtitle="Párosítsd a hetes csíkokat, a szorzásokat és a hiányzó számokat!"
      levels={MULT7_G2_MATCHER_LEVELS}
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

export default Mult7G2Matcher;

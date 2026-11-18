import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { CrossedDiscsCard, TenFrameSubCard, WheelStepCard } from './Sub10G2CardFigures';

interface Sub10G2MatcherProps {
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
  [key: string]: unknown;
}

const SUB10_G2_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Kép és kivonás',
    description: 'Számold meg, hány korong marad az áthúzás után, és párosítsd az eredménnyel!',
    pairs: [
      { id: 'sub10m1', left: '', right: '5', promptFigure: <CrossedDiscsCard total={8} taken={3} /> },
      { id: 'sub10m2', left: '9 − 2', right: '7' },
      { id: 'sub10m3', left: '', right: '2', promptFigure: <CrossedDiscsCard total={6} taken={4} /> },
      { id: 'sub10m4', left: '10 − 0', right: '10' },
      { id: 'sub10m5', left: '', right: '0', promptFigure: <CrossedDiscsCard total={7} taken={7} /> },
      { id: 'sub10m6', left: '9 − 6', right: '3' },
      { id: 'sub10m7', left: '', right: '6', promptFigure: <CrossedDiscsCard total={10} taken={4} /> },
      { id: 'sub10m8', left: '8 − 4', right: '4' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Tízeskeret és kivonókerék',
    description: 'Olvasd le a tízeskeretet vagy a kivonókereket, és keresd meg a különbséget!',
    pairs: [
      { id: 'sub10m9', left: '', right: '8', promptFigure: <TenFrameSubCard total={10} taken={2} /> },
      { id: 'sub10m10', left: '', right: '4', promptFigure: <WheelStepCard center={10} sub={6} /> },
      { id: 'sub10m11', left: '', right: '5', promptFigure: <TenFrameSubCard total={9} taken={4} /> },
      { id: 'sub10m12', left: '', right: '1', promptFigure: <WheelStepCard center={10} sub={9} /> },
      { id: 'sub10m13', left: '10 − 3', right: '7' },
      { id: 'sub10m14', left: '', right: '3', promptFigure: <TenFrameSubCard total={8} taken={5} /> },
      { id: 'sub10m15', left: '8 − 6', right: '2' },
      { id: 'sub10m16', left: '6 − 0', right: '6' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hiányzó számok és képek',
    description: 'Pótold a hiányzó számot a □ helyére, vagy számold ki a képen látható kivonást!',
    pairs: [
      { id: 'sub10m17', left: '9 − □ = 5', right: '4' },
      { id: 'sub10m18', left: '□ − 3 = 6', right: '9' },
      { id: 'sub10m19', left: '', right: '5', promptFigure: <WheelStepCard center={8} sub={3} /> },
      { id: 'sub10m20', left: '', right: '2', promptFigure: <TenFrameSubCard total={7} taken={5} /> },
      { id: 'sub10m21', left: '', right: '6', promptFigure: <WheelStepCard center={10} sub={4} /> },
      { id: 'sub10m22', left: '□ − 7 = 0', right: '7' },
      { id: 'sub10m23', left: '', right: '8', promptFigure: <CrossedDiscsCard total={9} taken={1} /> },
      { id: 'sub10m24', left: '8 − □ = 8', right: '0' }
    ]
  }
];

export const SUB10_G2_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: SUB10_G2_MATCHER_LEVELS_LIST[0],
  2: SUB10_G2_MATCHER_LEVELS_LIST[1],
  3: SUB10_G2_MATCHER_LEVELS_LIST[2]
};

export const Sub10G2Matcher: React.FC<Sub10G2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g2-c20-kivonas10-matcher',
  topicTitle = '3. Kivonás 10-es számkör – Párosító Játék',
  ...rest
}) => {
  const activeLevel: DifficultyLevel =
    currentLevel ?? (typeof level === 'number' ? level : level?.level ?? 1);
  return (
    <MatcherTemplate
      grade={2}
      chapterId="szamolas-20-ig"
      topicId={topicId}
      subtopicId="kivonas-10-es-szamkor"
      title={topicTitle}
      subtitle="Párosítsd a kivonásokat, ábrákat és hiányzó számokat az eredményükkel!"
      levels={SUB10_G2_MATCHER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onComplete={onComplete}
      {...rest}
    />
  );
};

export default Sub10G2Matcher;

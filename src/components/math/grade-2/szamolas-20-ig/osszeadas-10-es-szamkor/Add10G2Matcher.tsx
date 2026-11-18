import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  DiscAddCard,
  TenFrameCard,
  DicePairCard,
  JumpLineCard,
} from './Add10G2CardFigures';

interface Add10G2MatcherProps {
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

const ADD10_G2_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Képről összeadás',
    description: 'Számold meg a korongokat, a pöttyöket vagy az ugrást, és párosítsd az összeggel!',
    pairs: [
      { id: 'a10m1', left: '', right: '7', promptFigure: <DiscAddCard a={3} b={4} /> },
      { id: 'a10m2', left: '', right: '5', promptFigure: <DicePairCard a={2} b={3} /> },
      { id: 'a10m3', left: '', right: '6', promptFigure: <DiscAddCard a={6} b={0} /> },
      { id: 'a10m4', left: '', right: '8', promptFigure: <JumpLineCard start={4} jump={4} /> },
      { id: 'a10m5', left: '', right: '4', promptFigure: <TenFrameCard a={1} b={3} /> },
      { id: 'a10m6', left: '0 + 9', right: '9' },
      { id: 'a10m7', left: '2 + 8', right: '10' },
      { id: 'a10m8', left: '2 + 0', right: '2' },
    ],
  },
  {
    level: 2,
    title: '2. szint: A 10 bontása és csere',
    description: 'Mennyi hiányzik a 10-hez? Melyik két összeadásban cseréltük fel a tagokat?',
    pairs: [
      { id: 'a10m9', left: '6 + □ = 10', right: '4', promptFigure: <TenFrameCard a={6} askMissing /> },
      { id: 'a10m10', left: '3 + □ = 10', right: '7', promptFigure: <TenFrameCard a={3} askMissing /> },
      { id: 'a10m11', left: '8 + □ = 10', right: '2', promptFigure: <TenFrameCard a={8} askMissing /> },
      { id: 'a10m12', left: '5 + □ = 10', right: '5', promptFigure: <TenFrameCard a={5} askMissing /> },
      { id: 'a10m13', left: '9 + □ = 10', right: '1', promptFigure: <TenFrameCard a={9} askMissing /> },
      { id: 'a10m14', left: '10 + □ = 10', right: '0' },
      { id: 'a10m15', left: '4 + 5', right: '5 + 4' },
      { id: 'a10m16', left: '1 + 7', right: '7 + 1' },
    ],
  },
  {
    level: 3,
    title: '3. szint: Három tag és pótlás',
    description: 'Számolj három taggal vagy keresd meg a hiányzó tagot!',
    pairs: [
      { id: 'a10m17', left: '', right: '9', promptFigure: <JumpLineCard start={2} jump={7} /> },
      { id: 'a10m18', left: '', right: '10', promptFigure: <DicePairCard a={5} b={5} /> },
      { id: 'a10m19', left: '', right: '8', promptFigure: <DiscAddCard a={3} b={5} /> },
      { id: 'a10m20', left: '', right: '7', promptFigure: <TenFrameCard a={4} b={3} /> },
      { id: 'a10m21', left: '2 + 3 + 1', right: '6' },
      { id: 'a10m22', left: '□ + 4 = 9', right: '5' },
      { id: 'a10m23', left: '1 + □ + 3 = 8', right: '4' },
      { id: 'a10m24', left: '0 + □ = 3', right: '3' },
    ],
  },
];

export const ADD10_G2_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: ADD10_G2_MATCHER_LEVELS_LIST[0],
  2: ADD10_G2_MATCHER_LEVELS_LIST[1],
  3: ADD10_G2_MATCHER_LEVELS_LIST[2],
};

function resolveMatcherLevel(
  level: DifficultyLevel | { level?: DifficultyLevel } | undefined,
  currentLevel: DifficultyLevel | undefined
): DifficultyLevel {
  if (currentLevel !== undefined) return currentLevel;
  if (typeof level === 'number') return level;
  if (level && typeof level === 'object' && level.level !== undefined) return level.level;
  return 1;
}

export const Add10G2Matcher: React.FC<Add10G2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g2-c20-osszeadas10-matcher',
  topicTitle = '2. Összeadás 10-es számkör – Párosító Játék',
  ...rest
}) => {
  const activeLevel = resolveMatcherLevel(level, currentLevel);
  return (
    <MatcherTemplate
      grade={2}
      chapterId="szamolas-20-ig"
      topicId={topicId}
      subtopicId="osszeadas-10-es-szamkor"
      title={topicTitle}
      subtitle="Párosítsd a képeket, az összeadásokat és a hiányzó tagokat!"
      themeColor="emerald"
      levels={ADD10_G2_MATCHER_LEVELS}
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

export default Add10G2Matcher;

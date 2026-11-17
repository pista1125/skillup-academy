import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { MiniBlocks, MiniCoins, MiniTags, MiniRods } from './ThreeDigitAddG3CardFigures';

interface ThreeDigitAddG3MatcherProps {
  level?: DifficultyLevel;
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
  [key: string]: any;
}

const LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Kerek százast adunk hozzá',
    description: 'Mennyi lesz? Csak a százasok változnak!',
    pairs: [
      { id: 'tdam1_0', left: '+ 100', promptFigure: <MiniBlocks sz={2} t={3} e={0} />, right: '330' },
      { id: 'tdam1_1', left: '+ 200', promptFigure: <MiniBlocks sz={1} t={4} e={2} />, right: '342' },
      { id: 'tdam1_2', left: '+ 300 Ft', promptFigure: <MiniCoins coins={[100, 50, 10]} />, right: '460 Ft' },
      { id: 'tdam1_3', left: '+ 100 Ft', promptFigure: <MiniCoins coins={[200, 20, 5]} />, right: '325 Ft' },
      { id: 'tdam1_4', left: '236 + 200', right: '436' },
      { id: 'tdam1_5', left: '300 + 117', right: '417' },
      { id: 'tdam1_6', left: '154 + 200', right: '354' },
      { id: 'tdam1_7', left: '400 + 38', right: '438' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Kerek tízesek, beváltás',
    description: '10 tízes = 1 százas. Párosítsd!',
    pairs: [
      { id: 'tdam2_0', left: 'Mennyi ez?', promptFigure: <MiniRods n={13} />, right: '130' },
      { id: 'tdam2_1', left: 'Mennyi ez?', promptFigure: <MiniRods n={11} />, right: '110' },
      { id: 'tdam2_2', left: 'Mennyi ez?', promptFigure: <MiniRods n={16} />, right: '160' },
      { id: 'tdam2_3', left: 'együtt', promptFigure: <MiniTags prices={[180, 250]} />, right: '430' },
      { id: 'tdam2_4', left: 'együtt', promptFigure: <MiniTags prices={[170, 160]} />, right: '330' },
      { id: 'tdam2_5', left: '290 + 150', right: '440' },
      { id: 'tdam2_6', left: '260 + 150', right: '410' },
      { id: 'tdam2_7', left: '370 + 80', right: '450' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Helyi értékenként',
    description: 'Százas a százashoz, tízes a tízeshez, egyes az egyeshez!',
    pairs: [
      { id: 'tdam3_0', left: 'együtt', promptFigure: <MiniTags prices={[125, 250]} />, right: '375' },
      { id: 'tdam3_1', left: 'együtt', promptFigure: <MiniTags prices={[213, 104]} />, right: '317' },
      { id: 'tdam3_2', left: '+ 160 Ft', promptFigure: <MiniCoins coins={[200, 50, 20]} />, right: '430 Ft' },
      { id: 'tdam3_3', left: '+ 130 Ft', promptFigure: <MiniCoins coins={[100, 100, 50, 5]} />, right: '385 Ft' },
      { id: 'tdam3_4', left: '342 + 105', right: '447' },
      { id: 'tdam3_5', left: '231 + 146', right: '377' },
      { id: 'tdam3_6', left: '120 + 200 + 150', right: '470' },
      { id: 'tdam3_7', left: 'a 260 és a 180 összege', right: '440' }
    ]
  }
];

export const THREE_DIGIT_ADD_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = { 1: LIST[0], 2: LIST[1], 3: LIST[2] };

export const ThreeDigitAddG3Matcher: React.FC<ThreeDigitAddG3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-wadd-haromjegyu-matcher',
  topicTitle = '1. Háromjegyű számok összeadása – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="irasbeli-osszeadas"
      topicId={topicId}
      subtopicId="haromjegyu-szamok-osszeadasa"
      title={topicTitle}
      subtitle="Párosítsd az összeadásokat az eredményükkel!"
      levels={THREE_DIGIT_ADD_G3_MATCHER_LEVELS}
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

export default ThreeDigitAddG3Matcher;

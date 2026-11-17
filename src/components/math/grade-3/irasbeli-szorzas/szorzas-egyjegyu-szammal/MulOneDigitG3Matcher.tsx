import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { CardCoins, CardBlocks } from './MulOneDigitG3CardFigures';

interface MulOneDigitG3MatcherProps {
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
    title: '1. szint: Kerek tízesek',
    description: 'Számold ki fejben, és keresd meg a szorzatot!',
    pairs: [
      { id: 'mul1m1_0', left: '', promptFigure: <CardCoins a={230} m={3} />, right: '690' },
      { id: 'mul1m1_1', left: '', promptFigure: <CardCoins a={120} m={4} />, right: '480' },
      { id: 'mul1m1_2', left: '', promptFigure: <CardBlocks n={210} m={4} />, right: '840' },
      { id: 'mul1m1_3', left: '', promptFigure: <CardBlocks n={130} m={3} />, right: '390' },
      { id: 'mul1m1_4', left: '310 · 3', right: '930' },
      { id: 'mul1m1_5', left: '110 · 5', right: '550' },
      { id: 'mul1m1_6', left: '4 · 220', right: '880' },
      { id: 'mul1m1_7', left: '2 · 340', right: '680' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Bontással',
    description: 'Bontsd százasokra és tízesekre!',
    pairs: [
      { id: 'mul1m2_0', left: '', promptFigure: <CardBlocks n={140} m={5} />, right: '700' },
      { id: 'mul1m2_1', left: '', promptFigure: <CardBlocks n={160} m={3} />, right: '480' },
      { id: 'mul1m2_2', left: '', promptFigure: <CardCoins a={250} m={3} />, right: '750' },
      { id: 'mul1m2_3', left: '', promptFigure: <CardCoins a={180} m={4} />, right: '720' },
      { id: 'mul1m2_4', left: '100 · 4 + 70 · 4', right: '680' },
      { id: 'mul1m2_5', left: '290 · 3', right: '870' },
      { id: 'mul1m2_6', left: '130 · 7', right: '910' },
      { id: 'mul1m2_7', left: '6 · 150', right: '900' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Egyesekkel is',
    description: 'Három részre bontás, hiányzó szám, lánc!',
    pairs: [
      { id: 'mul1m3_0', left: '', promptFigure: <CardBlocks n={124} m={3} />, right: '372' },
      { id: 'mul1m3_1', left: '', promptFigure: <CardBlocks n={213} m={4} />, right: '852' },
      { id: 'mul1m3_2', left: '', promptFigure: <CardBlocks n={132} m={3} />, right: '396' },
      { id: 'mul1m3_3', left: '', promptFigure: <CardBlocks n={221} m={4} />, right: '884' },
      { id: 'mul1m3_4', left: '□ · 40 = 320', right: '□ = 8' },
      { id: 'mul1m3_5', left: '2 · 312', right: '624' },
      { id: 'mul1m3_6', left: '3 · 230 + 10', right: '700' },
      { id: 'mul1m3_7', left: '140 · 2 · 2', right: '560' }
    ]
  }
];

export const MUL_ONE_DIGIT_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = { 1: LIST[0], 2: LIST[1], 3: LIST[2] };

export const MulOneDigitG3Matcher: React.FC<MulOneDigitG3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-wmul-egyjegyu-matcher',
  topicTitle = '1. Szorzás egyjegyű számmal – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="irasbeli-szorzas"
      topicId={topicId}
      subtopicId="szorzas-egyjegyu-szammal"
      title={topicTitle}
      subtitle="Számold ki fejben, és párosítsd a szorzattal!"
      levels={MUL_ONE_DIGIT_G3_MATCHER_LEVELS}
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

export default MulOneDigitG3Matcher;

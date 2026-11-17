import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { MiniClock, MiniTwoClocks, MiniStopwatch } from './TimeG3CardFigures';

interface TimeG3MatcherProps {
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

const TIME_G3_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Óra és mértékegység',
    description: 'Mennyi az idő? Mennyi az egyik egység a másikban?',
    pairs: [
      { id: 'tg3m1_0', left: '', promptFigure: <MiniClock h={7} m={30} />, right: 'fél 8' },
      { id: 'tg3m1_1', left: '', promptFigure: <MiniClock h={2} m={15} />, right: 'negyed 3' },
      { id: 'tg3m1_2', left: '', promptFigure: <MiniClock h={9} m={45} />, right: 'háromnegyed 10' },
      { id: 'tg3m1_3', left: '', promptFigure: <MiniClock h={11} m={0} />, right: '11 óra' },
      { id: 'tg3m1_4', left: '1 perc', right: '60 másodperc' },
      { id: 'tg3m1_5', left: '1 óra', right: '60 perc' },
      { id: 'tg3m1_6', left: '1 nap', right: '24 óra' },
      { id: 'tg3m1_7', left: '1 hét', right: '7 nap' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Pontos idő, napszak',
    description: 'Írd a napszaknak megfelelően! Váltsd át!',
    pairs: [
      { id: 'tg3m2_0', left: 'délután', promptFigure: <MiniClock h={3} m={20} part="sun" />, right: '15:20' },
      { id: 'tg3m2_1', left: 'este', promptFigure: <MiniClock h={8} m={40} part="moon" />, right: '20:40' },
      { id: 'tg3m2_2', left: 'reggel', promptFigure: <MiniClock h={6} m={5} part="sun" />, right: '6:05' },
      { id: 'tg3m2_3', left: 'délután', promptFigure: <MiniClock h={4} m={50} part="sun" />, right: '16:50' },
      { id: 'tg3m2_4', left: '2 óra 10 perc', right: '130 perc' },
      { id: 'tg3m2_5', left: '90 perc', right: '1 óra 30 perc' },
      { id: 'tg3m2_6', left: '120 másodperc', right: '2 perc' },
      { id: 'tg3m2_7', left: '1 óra 5 perc', right: '65 perc' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mennyi idő telt el?',
    description: 'Számold ki, mennyi idő telt el!',
    pairs: [
      { id: 'tg3m3_0', left: '', promptFigure: <MiniTwoClocks h1={8} m1={10} h2={8} m2={35} />, right: '25 perc' },
      { id: 'tg3m3_1', left: '', promptFigure: <MiniTwoClocks h1={10} m1={40} h2={11} m2={20} />, right: '40 perc' },
      { id: 'tg3m3_2', left: '', promptFigure: <MiniTwoClocks h1={1} m1={0} h2={3} m2={30} />, right: '2 óra 30 perc' },
      { id: 'tg3m3_3', left: 'Mennyi kell még 1 percig?', promptFigure: <MiniStopwatch s={15} />, right: '45 másodperc' },
      { id: 'tg3m3_4', left: '9:50-től 10:05-ig', right: '15 perc' },
      { id: 'tg3m3_5', left: 'május 4-től május 8-ig (mindkét nap is)', right: '5 nap' },
      { id: 'tg3m3_6', left: '3 hét', right: '21 nap' },
      { id: 'tg3m3_7', left: '4 · 15 perc', right: '1 óra' }
    ]
  }
];

export const TIME_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: TIME_G3_MATCHER_LEVELS_LIST[0],
  2: TIME_G3_MATCHER_LEVELS_LIST[1],
  3: TIME_G3_MATCHER_LEVELS_LIST[2]
};

export const TimeG3Matcher: React.FC<TimeG3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-meas-ido-matcher',
  topicTitle = '9. Az idő mérése – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="meresek"
      topicId={topicId}
      subtopicId="az-ido-merese"
      title={topicTitle}
      subtitle="Párosítsd az órákat az időpontokkal, és az időtartamokat egymással!"
      levels={TIME_G3_MATCHER_LEVELS}
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

export default TimeG3Matcher;

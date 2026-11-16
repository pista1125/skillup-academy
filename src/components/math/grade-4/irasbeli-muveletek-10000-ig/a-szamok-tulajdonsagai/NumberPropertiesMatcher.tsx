import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface NumberPropertiesMatcherProps {
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

const NUMBER_PROPS_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mire végződik?',
    description: 'Párosítsd a tulajdonságot azzal, amit az utolsó számjegyekről tudunk!',
    pairs: [
      { id: 'np1', left: '2 többszöröse (páros)', right: '0, 2, 4, 6 vagy 8 a végén' },
      { id: 'np2', left: 'páratlan szám', right: '1, 3, 5, 7 vagy 9 a végén' },
      { id: 'np3', left: '5 többszöröse', right: '0 vagy 5 a végén' },
      { id: 'np4', left: '10 többszöröse', right: '0 a végén' },
      { id: 'np5', left: '100 többszöröse', right: '00 a végén' },
      { id: 'np6', left: '1000 többszöröse', right: '000 a végén' },
      { id: 'np7', left: '2 és 5 többszöröse is', right: 'ugyanaz, mint a 10 többszöröse' },
      { id: 'np8', left: '4 többszöröse', right: '4-gyel osztva 0 a maradék' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Legkisebb és legnagyobb',
    description: 'Keresd meg a négyjegyű számok közül a leírásnak megfelelőt!',
    pairs: [
      { id: 'np9', left: 'a legnagyobb négyjegyű páros szám', right: '9998' },
      { id: 'np10', left: 'a legnagyobb négyjegyű páratlan szám', right: '9999' },
      { id: 'np11', left: 'a legkisebb négyjegyű páratlan szám', right: '1001' },
      { id: 'np12', left: 'a legnagyobb négyjegyű, 5 többszöröse', right: '9995' },
      { id: 'np13', left: 'a legkisebb négyjegyű, páratlan, 5 többszöröse', right: '1005' },
      { id: 'np14', left: 'a legnagyobb négyjegyű, 10 többszöröse', right: '9990' },
      { id: 'np15', left: 'a legnagyobb négyjegyű, 100 többszöröse', right: '9900' },
      { id: 'np16', left: 'a legkisebb négyjegyű, 100 többszöröse', right: '1000' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Melyik számjegy jöhet?',
    description: 'Mely számjegyek kerülhetnek a betű helyére, hogy igaz legyen az állítás?',
    pairs: [
      { id: 'np17', left: '521A a 2 többszöröse', right: 'A: 0, 2, 4, 6, 8' },
      { id: 'np18', left: '131F az 5 többszöröse', right: 'F: 0 vagy 5' },
      { id: 'np19', left: '131F páratlan', right: 'F: 1, 3, 5, 7, 9' },
      { id: 'np20', left: '131F páratlan, és az 5 többszöröse', right: 'F: csak 5' },
      { id: 'np21', left: '131F a 10 többszöröse', right: 'F: csak 0' },
      { id: 'np22', left: '131F páros, de nem a 10 többszöröse', right: 'F: 2, 4, 6, 8' },
      { id: 'np23', left: '131F páratlan, de nem az 5 többszöröse', right: 'F: 1, 3, 7, 9' },
      { id: 'np24', left: '5B40 az 5 többszöröse', right: 'B: bármelyik számjegy' }
    ]
  }
];

const NUMBER_PROPS_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: NUMBER_PROPS_MATCHER_LEVELS_LIST[0],
  2: NUMBER_PROPS_MATCHER_LEVELS_LIST[1],
  3: NUMBER_PROPS_MATCHER_LEVELS_LIST[2]
};

export const NumberPropertiesMatcher: React.FC<NumberPropertiesMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-wops-szamok-tulajdonsagai-matcher',
  topicTitle = '4. A számok tulajdonságai – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="irasbeli-muveletek-10000-ig"
      topicId={topicId}
      subtopicId="a-szamok-tulajdonsagai"
      title={topicTitle}
      subtitle="Párosítsd a tulajdonságokat a szabályokkal és a számokkal!"
      levels={NUMBER_PROPS_MATCHER_LEVELS}
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

export default NumberPropertiesMatcher;

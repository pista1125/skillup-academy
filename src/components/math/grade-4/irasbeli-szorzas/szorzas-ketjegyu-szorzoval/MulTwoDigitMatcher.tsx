import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface MulTwoDigitMatcherProps {
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

const MUL_TWO_DIGIT_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Szorzás 10-zel és 100-zal',
    description: '10-zel szorzáskor a számjegyek egy hellyel balra lépnek. Párosítsd!',
    pairs: [
      { id: 'm2dm1', left: '71 · 10', right: '710' },
      { id: 'm2dm2', left: '10 · 43', right: '430' },
      { id: 'm2dm3', left: '893 · 10', right: '8930' },
      { id: 'm2dm4', left: '45 · 100', right: '4500' },
      { id: 'm2dm5', left: '25 tízes', right: '250' },
      { id: 'm2dm6', left: '170 tízes', right: '1700' },
      { id: 'm2dm7', left: '284 · 10', right: '2840' },
      { id: 'm2dm8', left: '60 · 100', right: '6000' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Szorzás kerek tízessel',
    description: 'Szorozz a tízesek számával, aztán 10-zel!',
    pairs: [
      { id: 'm2dm9', left: '41 · 20', right: '820' },
      { id: 'm2dm10', left: '23 · 50', right: '1150' },
      { id: 'm2dm11', left: '43 · 40', right: '1720' },
      { id: 'm2dm12', left: '16 · 20', right: '320' },
      { id: 'm2dm13', left: '24 · 30', right: '720' },
      { id: 'm2dm14', left: '56 · 70', right: '3920' },
      { id: 'm2dm15', left: '64 · 50', right: '3200' },
      { id: 'm2dm16', left: '87 · 90', right: '7830' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Kerek tízesek és százasok',
    description: 'Számolj tagonként, vagy szorozz a tízesek, százasok számával!',
    pairs: [
      { id: 'm2dm17', left: '130 · 60', right: '7800' },
      { id: 'm2dm18', left: '140 · 20', right: '2800' },
      { id: 'm2dm19', left: '420 · 20', right: '8400' },
      { id: 'm2dm20', left: '190 · 40', right: '7600' },
      { id: 'm2dm21', left: '110 · 30', right: '3300' },
      { id: 'm2dm22', left: '12 · 800', right: '9600' },
      { id: 'm2dm23', left: '28 · 200', right: '5600' },
      { id: 'm2dm24', left: '15 · 600', right: '9000' }
    ]
  }
];

const MUL_TWO_DIGIT_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: MUL_TWO_DIGIT_MATCHER_LEVELS_LIST[0],
  2: MUL_TWO_DIGIT_MATCHER_LEVELS_LIST[1],
  3: MUL_TWO_DIGIT_MATCHER_LEVELS_LIST[2]
};

export const MulTwoDigitMatcher: React.FC<MulTwoDigitMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-wmult-ketjegyu-matcher',
  topicTitle = '1. Szorzás kétjegyű szorzóval – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="irasbeli-szorzas"
      topicId={topicId}
      subtopicId="szorzas-ketjegyu-szorzoval"
      title={topicTitle}
      subtitle="Párosítsd a szorzásokat a szorzatukkal!"
      levels={MUL_TWO_DIGIT_MATCHER_LEVELS}
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

export default MulTwoDigitMatcher;

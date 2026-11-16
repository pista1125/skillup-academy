import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface WrittenMulOneDigitMatcherProps {
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

const WRITTEN_MUL1_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Maradék nélkül',
    description: 'Ezekben a szorzásokban nincs maradék. Szorozd meg helyi értékenként, és párosítsd!',
    pairs: [
      { id: 'wm1', left: '1213 · 3', right: '3639' },
      { id: 'wm2', left: '2104 · 2', right: '4208' },
      { id: 'wm3', left: '3021 · 3', right: '9063' },
      { id: 'wm4', left: '1111 · 8', right: '8888' },
      { id: 'wm5', left: '4202 · 2', right: '8404' },
      { id: 'wm6', left: '1310 · 3', right: '3930' },
      { id: 'wm7', left: '2011 · 4', right: '8044' },
      { id: 'wm8', left: '3102 · 3', right: '9306' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Becslés',
    description: 'Kerekítsd a szorzandót százasra, és párosítsd a szorzást a becsült értékkel!',
    pairs: [
      { id: 'wm9', left: '1623 · 2', right: 'B: 3200' },
      { id: 'wm10', left: '1124 · 4', right: 'B: 4400' },
      { id: 'wm11', left: '1173 · 3', right: 'B: 3600' },
      { id: 'wm12', left: '804 · 9', right: 'B: 7200' },
      { id: 'wm13', left: '1284 · 7', right: 'B: 9100' },
      { id: 'wm14', left: '1216 · 8', right: 'B: 9600' },
      { id: 'wm15', left: '2324 · 3', right: 'B: 6900' },
      { id: 'wm16', left: '1356 · 6', right: 'B: 8400' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Szorzás maradékkal',
    description: 'Szorozz írásban! Ne felejtsd el hozzáadni a maradékot!',
    pairs: [
      { id: 'wm17', left: '1263 · 3', right: '3789' },
      { id: 'wm18', left: '2152 · 4', right: '8608' },
      { id: 'wm19', left: '2423 · 3', right: '7269' },
      { id: 'wm20', left: '1211 · 7', right: '8477' },
      { id: 'wm21', left: '3943 · 2', right: '7886' },
      { id: 'wm22', left: '1721 · 4', right: '6884' },
      { id: 'wm23', left: '1108 · 6', right: '6648' },
      { id: 'wm24', left: '858 · 3', right: '2574' }
    ]
  }
];

const WRITTEN_MUL1_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: WRITTEN_MUL1_MATCHER_LEVELS_LIST[0],
  2: WRITTEN_MUL1_MATCHER_LEVELS_LIST[1],
  3: WRITTEN_MUL1_MATCHER_LEVELS_LIST[2]
};

export const WrittenMulOneDigitMatcher: React.FC<WrittenMulOneDigitMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-wops-szorzas-egyjegyu-matcher',
  topicTitle = '2. Írásbeli szorzás egyjegyű számmal – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="irasbeli-muveletek-10000-ig"
      topicId={topicId}
      subtopicId="irasbeli-szorzas-egyjegyu-szammal"
      title={topicTitle}
      subtitle="Párosítsd a szorzásokat a szorzatukkal vagy a becsült értékükkel!"
      levels={WRITTEN_MUL1_MATCHER_LEVELS}
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

export default WrittenMulOneDigitMatcher;

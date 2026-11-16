import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface WrittenMulTwoDigitMatcherProps {
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

const WRITTEN_MUL_TWO_DIGIT_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Kétjegyű szorzó, kevés maradék',
    description: 'Szorozz az egyesekkel, aztán a tízesekkel, és add össze a részletszorzatokat!',
    pairs: [
      { id: 'wm2m1', left: '12 · 14', right: '168' },
      { id: 'wm2m2', left: '21 · 14', right: '294' },
      { id: 'wm2m3', left: '13 · 13', right: '169' },
      { id: 'wm2m4', left: '22 · 11', right: '242' },
      { id: 'wm2m5', left: '32 · 13', right: '416' },
      { id: 'wm2m6', left: '24 · 12', right: '288' },
      { id: 'wm2m7', left: '23 · 31', right: '713' },
      { id: 'wm2m8', left: '34 · 12', right: '408' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Becslés',
    description: 'Kerekítsd mindkét tényezőt tízesre, és párosítsd a szorzást a becsült értékkel!',
    pairs: [
      { id: 'wm2m9', left: '86 · 23', right: 'B: 1800' },
      { id: 'wm2m10', left: '24 · 47', right: 'B: 1000' },
      { id: 'wm2m11', left: '39 · 23', right: 'B: 800' },
      { id: 'wm2m12', left: '98 · 67', right: 'B: 7000' },
      { id: 'wm2m13', left: '56 · 17', right: 'B: 1200' },
      { id: 'wm2m14', left: '456 · 14', right: 'B: 4600' },
      { id: 'wm2m15', left: '397 · 19', right: 'B: 8000' },
      { id: 'wm2m16', left: '75 · 27', right: 'B: 2400' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Írásbeli szorzás maradékokkal',
    description: 'Számolj írásban! Figyelj az eltolásra és a maradékokra!',
    pairs: [
      { id: 'wm2m17', left: '75 · 27', right: '2025' },
      { id: 'wm2m18', left: '29 · 48', right: '1392' },
      { id: 'wm2m19', left: '85 · 16', right: '1360' },
      { id: 'wm2m20', left: '85 · 61', right: '5185' },
      { id: 'wm2m21', left: '239 · 36', right: '8604' },
      { id: 'wm2m22', left: '175 · 42', right: '7350' },
      { id: 'wm2m23', left: '384 · 25', right: '9600' },
      { id: 'wm2m24', left: '321 · 23', right: '7383' }
    ]
  }
];

const WRITTEN_MUL_TWO_DIGIT_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: WRITTEN_MUL_TWO_DIGIT_MATCHER_LEVELS_LIST[0],
  2: WRITTEN_MUL_TWO_DIGIT_MATCHER_LEVELS_LIST[1],
  3: WRITTEN_MUL_TWO_DIGIT_MATCHER_LEVELS_LIST[2]
};

export const WrittenMulTwoDigitMatcher: React.FC<WrittenMulTwoDigitMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-wmult-irasbeli-matcher',
  topicTitle = '2. Írásbeli szorzás – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="irasbeli-szorzas"
      topicId={topicId}
      subtopicId="irasbeli-szorzas"
      title={topicTitle}
      subtitle="Párosítsd a szorzásokat a szorzatukkal vagy a becsült értékükkel!"
      levels={WRITTEN_MUL_TWO_DIGIT_MATCHER_LEVELS}
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

export default WrittenMulTwoDigitMatcher;

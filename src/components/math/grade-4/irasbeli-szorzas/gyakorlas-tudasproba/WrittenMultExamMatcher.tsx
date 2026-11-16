import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface WrittenMultExamMatcherProps {
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

const WRITTEN_MULT_EXAM_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Kerek tízesek és százasok',
    description: 'Szorozz a tízesek vagy százasok számával, aztán írd a végére a nullákat!',
    pairs: [
      { id: 'wmem1', left: '28 · 60', right: '1680' },
      { id: 'wmem2', left: '48 · 50', right: '2400' },
      { id: 'wmem3', left: '69 · 20', right: '1380' },
      { id: 'wmem4', left: '74 · 50', right: '3700' },
      { id: 'wmem5', left: '15 · 500', right: '7500' },
      { id: 'wmem6', left: '12 · 800', right: '9600' },
      { id: 'wmem7', left: '27 · 300', right: '8100' },
      { id: 'wmem8', left: '19 · 400', right: '7600' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Írásbeli szorzás',
    description: 'Becsülj, aztán számolj írásban! Párosítsd a szorzatokkal!',
    pairs: [
      { id: 'wmem9', left: '362 · 26', right: '9412' },
      { id: 'wmem10', left: '291 · 32', right: '9312' },
      { id: 'wmem11', left: '407 · 18', right: '7326' },
      { id: 'wmem12', left: '178 · 53', right: '9434' },
      { id: 'wmem13', left: '514 · 16', right: '8224' },
      { id: 'wmem14', left: '85 · 64', right: '5440' },
      { id: 'wmem15', left: '204 · 38', right: '7752' },
      { id: 'wmem16', left: '21 · 42', right: '882' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Műveleti sorrend',
    description: 'Előbb a zárójel, aztán a szorzás, végül az összeadás és a kivonás!',
    pairs: [
      { id: 'wmem17', left: '448 · (28 − 16)', right: '5376' },
      { id: 'wmem18', left: '448 · 16 − 28', right: '7140' },
      { id: 'wmem19', left: '448 − 28 · 16', right: '0' },
      { id: 'wmem20', left: '(168 − 89) · 51', right: '4029' },
      { id: 'wmem21', left: '51 · 168 + 89', right: '8657' },
      { id: 'wmem22', left: '168 + 51 · 89', right: '4707' },
      { id: 'wmem23', left: '2088 + 223 · 34', right: '9670' },
      { id: 'wmem24', left: '36 · (9140 − 8872)', right: '9648' }
    ]
  }
];

const WRITTEN_MULT_EXAM_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: WRITTEN_MULT_EXAM_MATCHER_LEVELS_LIST[0],
  2: WRITTEN_MULT_EXAM_MATCHER_LEVELS_LIST[1],
  3: WRITTEN_MULT_EXAM_MATCHER_LEVELS_LIST[2]
};

export const WrittenMultExamMatcher: React.FC<WrittenMultExamMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-wmult-tudasproba-matcher',
  topicTitle = '4. Gyakorlás, tudáspróba – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="irasbeli-szorzas"
      topicId={topicId}
      subtopicId="gyakorlas-tudasproba"
      title={topicTitle}
      subtitle="Párosítsd a műveleteket az eredményükkel – a teljes fejezetből!"
      levels={WRITTEN_MULT_EXAM_MATCHER_LEVELS}
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

export default WrittenMultExamMatcher;

import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface RationalExponents2MatcherProps {
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

const RATIONAL_EXPONENTS_2_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Törtkitevő ↔ gyökös alak',
    description: 'Párosítsd a törtkitevős hatványt a gyökös alakjával!',
    pairs: [
      { id: 're2m1', left: '32³⁄⁵', right: '(⁵√32)³' },
      { id: 're2m2', left: '27²⁄³', right: '(∛27)²' },
      { id: 're2m3', left: '25³⁄²', right: '(√25)³' },
      { id: 're2m4', left: '81⁻¹⁄²', right: '1 / √81' },
      { id: 're2m5', left: '32⁻³⁄⁵', right: '1 / (⁵√32)³' },
      { id: 're2m6', left: '1,011²⁄³', right: '(∛1,011)²' },
      { id: 're2m7', left: '7²⁄⁵', right: '⁵√49' },
      { id: 're2m8', left: '6¹⁄⁴', right: '⁴√6' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Értékek számológép nélkül',
    description: 'Előbb gyököt vonj, aztán hatványozz! Párosítsd az értékkel!',
    pairs: [
      { id: 're2m9', left: '25³⁄²', right: '125' },
      { id: 're2m10', left: '64³⁄²', right: '512' },
      { id: 're2m11', left: '9³⁄²', right: '27' },
      { id: 're2m12', left: '27²⁄³', right: '9' },
      { id: 're2m13', left: '8⁵⁄³', right: '32' },
      { id: 're2m14', left: '125⁴⁄³', right: '625' },
      { id: 're2m15', left: '81⁻¹⁄²', right: '1/9' },
      { id: 're2m16', left: '32⁻³⁄⁵', right: '1/8' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Azonosságokkal',
    description: 'Használd a hatványozás azonosságait, és párosítsd az eredménnyel!',
    pairs: [
      { id: 're2m17', left: '28²⁄³ · 28⁴⁄³', right: '784' },
      { id: 're2m18', left: '6,25¹⁄³ · 6,25¹⁄⁶', right: '2,5' },
      { id: 're2m19', left: '36^0,4 · 36^0,6', right: '36' },
      { id: 're2m20', left: '5^1,8 · 25^(−0,4)', right: '5' },
      { id: 're2m21', left: '(225 · 196)¹⁄²', right: '210' },
      { id: 're2m22', left: '(81/16)¹⁄⁴', right: '3/2' },
      { id: 're2m23', left: '5⁵⁄⁷ · 5⁻⁵⁄⁷', right: '1' },
      { id: 're2m24', left: '(1/9)⁻³⁄²', right: '27' }
    ]
  }
];

const RATIONAL_EXPONENTS_2_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: RATIONAL_EXPONENTS_2_MATCHER_LEVELS_LIST[0],
  2: RATIONAL_EXPONENTS_2_MATCHER_LEVELS_LIST[1],
  3: RATIONAL_EXPONENTS_2_MATCHER_LEVELS_LIST[2]
};

export const RationalExponents2Matcher: React.FC<RationalExponents2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-exp-tortkitevo-masodik-matcher',
  topicTitle = '4. Racionális számok a kitevőben II. – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="hatvany-gyok-logaritmus"
      topicId={topicId}
      subtopicId="racionalis-szamok-kitevoben-2"
      title={topicTitle}
      subtitle="Párosítsd a törtkitevős hatványokat a gyökös alakjukkal és az értékükkel!"
      levels={RATIONAL_EXPONENTS_2_MATCHER_LEVELS}
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

export default RationalExponents2Matcher;

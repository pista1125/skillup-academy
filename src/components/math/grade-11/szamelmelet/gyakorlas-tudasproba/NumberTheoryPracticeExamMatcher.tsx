import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface NumberTheoryPracticeExamMatcherProps {
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

const NUMBER_THEORY_EXAM_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Szám ↔ prímtényezős felbontás',
    description: 'Párosítsd a számot a prímtényezős alakjával!',
    pairs: [
      { id: 'ntem1', left: '360', right: '2³ · 3² · 5' },
      { id: 'ntem2', left: '240', right: '2⁴ · 3 · 5' },
      { id: 'ntem3', left: '756', right: '2² · 3³ · 7' },
      { id: 'ntem4', left: '2100', right: '2² · 3 · 5² · 7' },
      { id: 'ntem5', left: '450', right: '2 · 3² · 5²' },
      { id: 'ntem6', left: '735', right: '3 · 5 · 7²' },
      { id: 'ntem7', left: '1000', right: '2³ · 5³' },
      { id: 'ntem8', left: '588', right: '2² · 3 · 7²' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: LNKO és LKKT',
    description: 'Párosítsd a kifejezést az értékével! ( ) a legnagyobb közös osztó, [ ] a legkisebb közös többszörös.',
    pairs: [
      { id: 'ntem9', left: '(12; 18)', right: '6' },
      { id: 'ntem10', left: '[12; 18]', right: '36' },
      { id: 'ntem11', left: '(2100; 450; 735)', right: '15' },
      { id: 'ntem12', left: '[45; 18; 30]', right: '90' },
      { id: 'ntem13', left: '[8; 9; 10; 12]', right: '360' },
      { id: 'ntem14', left: '(240; 756)', right: '12' },
      { id: 'ntem15', left: '[240; 756]', right: '15 120' },
      { id: 'ntem16', left: '[2; 3; 4; 5; 6]', right: '60' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Számrendszerek',
    description: 'Párosítsd a más alapú számrendszerben felírt számot a tízes számrendszerbeli értékével!',
    pairs: [
      { id: 'ntem17', left: '1201₃', right: '46' },
      { id: 'ntem18', left: '110101₂', right: '53' },
      { id: 'ntem19', left: '11021₃', right: '115' },
      { id: 'ntem20', left: '943₁₂', right: '1347' },
      { id: 'ntem21', left: '20123₄', right: '539' },
      { id: 'ntem22', left: '725₈', right: '469' },
      { id: 'ntem23', left: 'D6₁₆', right: '214' },
      { id: 'ntem24', left: '106₈', right: '70' }
    ]
  }
};

export const NumberTheoryPracticeExamMatcher: React.FC<NumberTheoryPracticeExamMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-num-tudasproba-matcher',
  topicTitle = '11. Gyakorlás, tudáspróba – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="szamelmelet"
      topicId={topicId}
      subtopicId="gyakorlas-tudasproba"
      title={topicTitle}
      subtitle="Párosítsd a számokat a prímtényezős alakjukkal, az LNKO-t és LKKT-t az értékével, a más alapú számokat a tízes alakjukkal!"
      levels={NUMBER_THEORY_EXAM_MATCHER_LEVELS}
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

export default NumberTheoryPracticeExamMatcher;

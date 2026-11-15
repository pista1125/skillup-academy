import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PowerRootPracticeMatcherProps {
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

const POWER_ROOT_PRACTICE_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Értékek a számegyenesről',
    description: 'Számológép nélkül: párosítsd a kifejezést az értékével!',
    pairs: [
      { id: 'prpm1', left: '4^0,5', right: '2' },
      { id: 'prpm2', left: '3⁻²', right: '1/9' },
      { id: 'prpm3', left: '16⁻³⁄⁴', right: '1/8' },
      { id: 'prpm4', left: '−3⁰', right: '−1' },
      { id: 'prpm5', left: 'π⁰', right: '1' },
      { id: 'prpm6', left: '16 · 10⁻²', right: '0,16' },
      { id: 'prpm7', left: '∛(−125/8)', right: '−5/2' },
      { id: 'prpm8', left: '∛27 · 2⁻⁴', right: '3/16' }
    ]
  },
  {
    level: 2,
    title: '2. szint: A 2 hatványai',
    description: 'Írd fel a számot a 2 hatványaként!',
    pairs: [
      { id: 'prpm9', left: '⁵√16', right: '2^(4/5)' },
      { id: 'prpm10', left: '1/8', right: '2⁻³' },
      { id: 'prpm11', left: '√2', right: '2^(1/2)' },
      { id: 'prpm12', left: '1/√2', right: '2^(−1/2)' },
      { id: 'prpm13', left: '32', right: '2⁵' },
      { id: 'prpm14', left: '∛4', right: '2^(2/3)' },
      { id: 'prpm15', left: '⁵√16 · 2⁻³', right: '2^(−11/5)' },
      { id: 'prpm16', left: '16^(3/4)', right: '2³' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Kitevő-helyettesítés',
    description: 'Használd az adott hatványértéket, és párosítsd az eredménnyel!',
    pairs: [
      { id: 'prpm17', left: '5ᵏ = 3 ⇒ 5⁻ᵏ', right: '1/3' },
      { id: 'prpm18', left: '5ᵏ = 3 ⇒ 5²ᵏ', right: '9' },
      { id: 'prpm19', left: '5ᵏ = 3 ⇒ 5ᵏ⁺¹', right: '15' },
      { id: 'prpm20', left: '5ᵏ = 3 ⇒ 5³ᵏ⁻²', right: '27/25' },
      { id: 'prpm21', left: '7ᵏ = 4, 7ᵐ = 5 ⇒ 7ᵏ⁺ᵐ', right: '20' },
      { id: 'prpm22', left: '7ᵏ = 4, 7ᵐ = 5 ⇒ 7³ᵏ⁻²ᵐ', right: '64/25' },
      { id: 'prpm23', left: '10ᵏ = 7 ⇒ 10ᵏ⁺³', right: '7000' },
      { id: 'prpm24', left: '10ᵏ = 7 ⇒ 10⁻²ᵏ', right: '1/49' }
    ]
  }
];

const POWER_ROOT_PRACTICE_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: POWER_ROOT_PRACTICE_MATCHER_LEVELS_LIST[0],
  2: POWER_ROOT_PRACTICE_MATCHER_LEVELS_LIST[1],
  3: POWER_ROOT_PRACTICE_MATCHER_LEVELS_LIST[2]
};

export const PowerRootPracticeMatcher: React.FC<PowerRootPracticeMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-exp-hatvany-gyok-gyakorlas-matcher',
  topicTitle = '5. Gyakorlás – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="hatvany-gyok-logaritmus"
      topicId={topicId}
      subtopicId="gyakorlas-hatvany-gyok"
      title={topicTitle}
      subtitle="Párosítsd a hatványos és gyökös kifejezéseket az értékükkel, a 2-hatvány alakjukkal és a kitevő-helyettesítés eredményeivel!"
      levels={POWER_ROOT_PRACTICE_MATCHER_LEVELS}
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

export default PowerRootPracticeMatcher;

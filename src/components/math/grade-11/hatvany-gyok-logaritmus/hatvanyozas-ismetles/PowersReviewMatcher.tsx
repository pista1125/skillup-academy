import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PowersReviewMatcherProps {
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

const POWERS_REVIEW_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Értelmezés és azonosságok',
    description: 'Párosítsd a kifejezést a vele egyenlő alakkal!',
    pairs: [
      {
        id: 'prvm1',
        left: 'aᵐ · aⁿ',
        right: 'aᵐ⁺ⁿ'
      },
      {
        id: 'prvm2',
        left: 'aᵐ : aⁿ (a ≠ 0)',
        right: 'aᵐ⁻ⁿ'
      },
      {
        id: 'prvm3',
        left: '(aᵐ)ⁿ',
        right: 'aᵐ·ⁿ'
      },
      {
        id: 'prvm4',
        left: '(a · b)ⁿ',
        right: 'aⁿ · bⁿ'
      },
      {
        id: 'prvm5',
        left: '(a / b)ⁿ (b ≠ 0)',
        right: 'aⁿ / bⁿ'
      },
      {
        id: 'prvm6',
        left: 'a⁰ (a ≠ 0)',
        right: '1'
      },
      {
        id: 'prvm7',
        left: 'a⁻ⁿ (a ≠ 0)',
        right: '1 / aⁿ'
      },
      {
        id: 'prvm8',
        left: 'a¹',
        right: 'a'
      }
    ]
  },
  {
    level: 2,
    title: '2. szint: Hatványértékek',
    description: 'Párosítsd a hatványt az értékével!',
    pairs: [
      {
        id: 'prvm9',
        left: '2⁻³',
        right: '1/8'
      },
      {
        id: 'prvm10',
        left: '3⁻²',
        right: '1/9'
      },
      {
        id: 'prvm11',
        left: '(−3)²',
        right: '9'
      },
      {
        id: 'prvm12',
        left: '−3²',
        right: '−9'
      },
      {
        id: 'prvm13',
        left: '5⁻²',
        right: '1/25'
      },
      {
        id: 'prvm14',
        left: '(2/3)⁻²',
        right: '9/4'
      },
      {
        id: 'prvm15',
        left: '(−2)⁻³',
        right: '−1/8'
      },
      {
        id: 'prvm16',
        left: '10⁻³',
        right: '0,001'
      }
    ]
  },
  {
    level: 3,
    title: '3. szint: Írd fel 2 hatványaként!',
    description: 'Párosítsd a kifejezést a vele egyenlő 2-hatvánnyal!',
    pairs: [
      {
        id: 'prvm17',
        left: '4¹¹',
        right: '2²²'
      },
      {
        id: 'prvm18',
        left: '512²',
        right: '2¹⁸'
      },
      {
        id: 'prvm19',
        left: '32³',
        right: '2¹⁵'
      },
      {
        id: 'prvm20',
        left: '16²',
        right: '2⁸'
      },
      {
        id: 'prvm21',
        left: '2³ · (2⁻²)⁻⁵',
        right: '2¹³'
      },
      {
        id: 'prvm22',
        left: '(2⁻³)⁻¹ : (2⁻⁴)⁻³',
        right: '2⁻⁹'
      },
      {
        id: 'prvm23',
        left: '8⁻²',
        right: '2⁻⁶'
      },
      {
        id: 'prvm24',
        left: '(1/4)⁻³',
        right: '2⁶'
      }
    ]
  }
];

const POWERS_REVIEW_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: POWERS_REVIEW_MATCHER_LEVELS_LIST[0],
  2: POWERS_REVIEW_MATCHER_LEVELS_LIST[1],
  3: POWERS_REVIEW_MATCHER_LEVELS_LIST[2]
};

export const PowersReviewMatcher: React.FC<PowersReviewMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-exp-hatvanyozas-ismetles-matcher',
  topicTitle = '1. Hatványozás – ismétlés – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="hatvany-gyok-logaritmus"
      topicId={topicId}
      subtopicId="hatvanyozas-ismetles"
      title={topicTitle}
      subtitle="Párosítsd a hatványazonosságokat, a hatványértékeket és a 2 hatványaira való átírásokat!"
      levels={POWERS_REVIEW_MATCHER_LEVELS}
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

export default PowersReviewMatcher;

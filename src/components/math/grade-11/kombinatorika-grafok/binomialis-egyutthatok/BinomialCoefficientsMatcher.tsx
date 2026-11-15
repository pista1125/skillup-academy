import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface BinomialCoefficientsMatcherProps {
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

const BINOMIAL_COEFFICIENTS_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Fogalmak és képletek',
    description: 'Párosítsd a fogalmat a jelentésével vagy az értékével!',
    pairs: [
      { id: 'bcm1', left: '(n alatt k)', right: 'n különböző elemből k kiválasztása, ha nem számít a sorrend' },
      { id: 'bcm2', left: '(n alatt 0)', right: '1 (az üres halmaz)' },
      { id: 'bcm3', left: '(n alatt 1)', right: 'n' },
      { id: 'bcm4', left: '(n alatt k) faktoriálisokkal', right: 'n! / (k! · (n − k)!)' },
      { id: 'bcm5', left: 'Szimmetria', right: '(n alatt k) = (n alatt n − k)' },
      { id: 'bcm6', left: 'Számológép-funkció', right: 'nCr' },
      { id: 'bcm7', left: 'Egy n elemű halmaz összes részhalmaza', right: '2ⁿ darab' },
      { id: 'bcm8', left: '(n alatt 2)', right: 'n · (n − 1) / 2' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Binomiális együtthatók értéke',
    description: 'Számold ki fejben vagy papíron, és párosítsd az értékével!',
    pairs: [
      { id: 'bcm9', left: '(5 alatt 2)', right: '10' },
      { id: 'bcm10', left: '(6 alatt 3)', right: '20' },
      { id: 'bcm11', left: '(7 alatt 3)', right: '35' },
      { id: 'bcm12', left: '(8 alatt 5)', right: '56' },
      { id: 'bcm13', left: '(10 alatt 2)', right: '45' },
      { id: 'bcm14', left: '(11 alatt 6)', right: '462' },
      { id: 'bcm15', left: '(15 alatt 4)', right: '1365' },
      { id: 'bcm16', left: '(9 alatt 6)', right: '84' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Tankönyvi feladatok',
    description: 'Párosítsd a feladatot a helyes eredménnyel!',
    pairs: [
      { id: 'bcm17', left: 'Sálminta: 7 szemből 3 sima', right: '35' },
      { id: 'bcm18', left: '7 pont a körvonalon – szakaszok száma', right: '21' },
      { id: 'bcm19', left: '7 ember mindenkinek SMS-t küld', right: '42' },
      { id: 'bcm20', left: '32 lapos kártyából 3 lap', right: '4960' },
      { id: 'bcm21', left: 'A maradék 29 lapból még 2', right: '406' },
      { id: 'bcm22', left: 'Múzeum: 34 bent lévőből 3 riportalany', right: '5984' },
      { id: 'bcm23', left: 'Múzeum: 28 távozóból 4 riportalany', right: '20 475' },
      { id: 'bcm24', left: 'Kamilla hétfői órarendje (11 tárgyból 6 óra)', right: '332 640' }
    ]
  }
];

const BINOMIAL_COEFFICIENTS_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: BINOMIAL_COEFFICIENTS_MATCHER_LEVELS_LIST[0],
  2: BINOMIAL_COEFFICIENTS_MATCHER_LEVELS_LIST[1],
  3: BINOMIAL_COEFFICIENTS_MATCHER_LEVELS_LIST[2]
};

export const BinomialCoefficientsMatcher: React.FC<BinomialCoefficientsMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-comb-binomialis-matcher',
  topicTitle = '4. Binomiális együtthatók – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="kombinatorika-grafok"
      topicId={topicId}
      subtopicId="binomialis-egyutthatok"
      title={topicTitle}
      subtitle="Párosítsd a binomiális együtthatókat a jelentésükkel, értékükkel és a tankönyvi feladatok eredményeivel!"
      levels={BINOMIAL_COEFFICIENTS_MATCHER_LEVELS}
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

export default BinomialCoefficientsMatcher;

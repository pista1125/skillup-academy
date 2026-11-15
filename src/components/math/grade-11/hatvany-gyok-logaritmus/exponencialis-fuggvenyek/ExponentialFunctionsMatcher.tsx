import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ExponentialFunctionsMatcherProps {
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

const pairs = (prefix: string, start: number, list: [string, string][]) =>
  list.map(([left, right], i) => ({ id: `${prefix}${start + i}`, left, right }));

const EXP_FUNCTIONS_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Függvényértékek',
    description: 'Párosítsd a hatványt az értékével!',
    pairs: pairs('exfm', 1, [
      ['3⁻²', '1/9'],
      ['0,25⁻¹', '4'],
      ['2⁰', '1'],
      ['0,5³', '0,125'],
      ['9^{1/2}', '3'],
      ['0,25⁻⁵', '1024'],
      ['(1/3)⁻²', '9'],
      ['1,5²', '2,25']
    ])
  },
  {
    level: 2,
    title: '2. szint: Fogalmak és tulajdonságok',
    description: 'Párosítsd a fogalmat az exponenciális függvényre vonatkozó jelentésével!',
    pairs: pairs('exfm', 9, [
      ['értelmezési tartomány', 'R (minden valós szám)'],
      ['értékkészlet', 'R⁺ (pozitív valós számok)'],
      ['a > 1 esetén', 'szigorúan monoton növekvő'],
      ['0 < a < 1 esetén', 'szigorúan monoton csökkenő'],
      ['zérushelyek száma', 'nincs zérushelye'],
      ['minden grafikon közös pontja', '(0; 1)'],
      ['exponens', 'hatványkitevő'],
      ['x ↦ 1ˣ', 'konstans függvény']
    ])
  },
  {
    level: 3,
    title: '3. szint: Azonos alakok és becslések',
    description: 'Párosítsd a kifejezést a vele egyenlő alakkal vagy közelítő értékével!',
    pairs: pairs('exfm', 17, [
      ['(4/3)⁻ˣ', '(3/4)ˣ'],
      ['(1/5)ˣ', '5⁻ˣ'],
      ['9^{x/2}', '3ˣ'],
      ['3^{7/8}', '≈ 2,615'],
      ['3^{−3/5}', '≈ 0,517'],
      ['0,5^{−5/4}', '≈ 2,378'],
      ['1,5^{3/2}', '≈ 1,837'],
      ['2^{√2}', '≈ 2,665']
    ])
  }
];

const EXP_FUNCTIONS_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: EXP_FUNCTIONS_MATCHER_LEVELS_LIST[0],
  2: EXP_FUNCTIONS_MATCHER_LEVELS_LIST[1],
  3: EXP_FUNCTIONS_MATCHER_LEVELS_LIST[2]
};

export const ExponentialFunctionsMatcher: React.FC<ExponentialFunctionsMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-exp-exponencialis-fuggveny-matcher',
  topicTitle = '7. Exponenciális függvények – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="hatvany-gyok-logaritmus"
      topicId={topicId}
      subtopicId="exponencialis-fuggvenyek"
      title={topicTitle}
      subtitle="Párosítsd a hatványokat az értékükkel, a fogalmakat a jelentésükkel és az azonos alakokat egymással!"
      levels={EXP_FUNCTIONS_MATCHER_LEVELS}
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

export default ExponentialFunctionsMatcher;

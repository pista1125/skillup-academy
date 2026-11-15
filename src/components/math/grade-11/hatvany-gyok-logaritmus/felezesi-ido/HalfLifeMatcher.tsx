import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface HalfLifeMatcherProps {
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

const pairs = (prefix: string, list: [string, string][]) => list.map(([left, right], i) => ({ id: `${prefix}${i + 1}`, left, right }));

const HALF_LIFE_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Hány felezés – mennyi marad?',
    description: 'Párosítsd az eltelt felezési idők számát a megmaradt százalékkal!',
    pairs: pairs('hlfm1-', [
      ['0 felezési idő', '100%'],
      ['1 felezési idő', '50%'],
      ['2 felezési idő', '25%'],
      ['3 felezési idő', '12,5%'],
      ['4 felezési idő', '6,25%'],
      ['5 felezési idő', '3,125%'],
      ['6 felezési idő', '≈ 1,56%'],
      ['7 felezési idő', '≈ 0,78%']
    ])
  },
  {
    level: 2,
    title: '2. szint: Felezési idő a képletből',
    description: 'Párosítsd a hozzárendelési szabályt a felezési idővel (t ugyanabban az egységben)!',
    pairs: pairs('hlfm2-', [
      ['f(t) = 340 · (1/2)ᵗ', 'T = 1'],
      ['g(t) = 2,4 · (1/2)^(t/3)', 'T = 3'],
      ['h(t) = 54 · 2^(−5t)', 'T = 0,2'],
      ['M(t) = 28,9 · 2^(−t/8)', 'T = 8'],
      ['m(t) = 500 · 0,83ᵗ', 'T ≈ 3,72'],
      ['M(t) = 58 · 0,9ᵗ', 'T ≈ 6,58'],
      ['N(t) = N₀ · (1/2)^(t/5730)', 'T = 5730'],
      ['V(t) = V₀ · (1/2)^(2t/9)', 'T = 4,5']
    ])
  },
  {
    level: 3,
    title: '3. szint: Tankönyvi alkalmazások',
    description: 'Párosítsd a feladatot az eredményével!',
    pairs: pairs('hlfm3-', [
      ['¹⁴C: 6 · 10¹² → 3,75 · 10¹¹ atom (T = 5730 év)', '22 920 év'],
      ['Szerszámgép (T = 4,5 év): 12,5% alá', '13,5 év'],
      ['Jód-131 (T = 8 nap): 16 nap után', '25% marad'],
      ['Cézium-137 (T = 30 év): 4 év után', '≈ 91,2% marad'],
      ['Lázcsillapító (0,83ᵗ): déltől este 7-ig', '≈ 27,1% marad'],
      ['Lázcsillapító: 500 mg → 5 mg alá', '≈ 24,7 óra'],
      ['Lázcsillapító: a nyolcadára csökken', '≈ 11,16 óra'],
      ['Jód-131: 0,5% alá csökken', '≈ 61 nap']
    ])
  }
];

const HALF_LIFE_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: HALF_LIFE_MATCHER_LEVELS_LIST[0],
  2: HALF_LIFE_MATCHER_LEVELS_LIST[1],
  3: HALF_LIFE_MATCHER_LEVELS_LIST[2]
};

export const HalfLifeMatcher: React.FC<HalfLifeMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-exp-felezesi-ido-matcher',
  topicTitle = '9. Felezési idő – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="hatvany-gyok-logaritmus"
      topicId={topicId}
      subtopicId="felezesi-ido"
      title={topicTitle}
      subtitle="Párosítsd a felezések számát, a képleteket és a gyakorlati feladatokat az eredményükkel!"
      levels={HALF_LIFE_MATCHER_LEVELS}
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

export default HalfLifeMatcher;

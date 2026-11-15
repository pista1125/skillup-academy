import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CommonLogarithmMatcherProps {
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

const COMMON_LOG_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Tízes alapú logaritmusok',
    description: 'Párosítsd a tízes alapú logaritmust az értékével!',
    pairs: pairs('clgm1-', [
      ['lg 10', '1'],
      ['lg 100', '2'],
      ['lg 1000', '3'],
      ['lg 1', '0'],
      ['lg 0,1', '−1'],
      ['lg 0,01', '−2'],
      ['lg 2', '≈ 0,3010'],
      ['lg 4', '≈ 0,6021']
    ])
  },
  {
    level: 2,
    title: '2. szint: Áttérés tízes alapra',
    description: 'Párosítsd a logaritmust a tízes alapú logaritmusokkal felírt alakjával!',
    pairs: pairs('clgm2-', [
      ['log₂ 5', '(lg 5)/(lg 2)'],
      ['log₃ 20', '(lg 20)/(lg 3)'],
      ['log₁,₁₅ 3', '(lg 3)/(lg 1,15)'],
      ['log₀,₈₃ 0,5', '(lg 0,5)/(lg 0,83)'],
      ['log₆ 703', '(lg 703)/(lg 6)'],
      ['log₁,₀₆ 2', '(lg 2)/(lg 1,06)'],
      ['log₄,₅ 21', '(lg 21)/(lg 4,5)'],
      ['log₀,₂ 15', '(lg 15)/(lg 0,2)']
    ])
  },
  {
    level: 3,
    title: '3. szint: Egyenletek megoldása',
    description: 'Párosítsd az egyenletet a megoldásával (ezredre kerekítve)!',
    pairs: pairs('clgm3-', [
      ['1,15ˣ = 3', 'x ≈ 7,861'],
      ['8,5 · 10ˣ = 212,5', 'x ≈ 1,398'],
      ['4,55 · 1,2ˣ = 3,64', 'x ≈ −1,224'],
      ['4,2^(−2x) = 5,3', 'x ≈ −0,581'],
      ['6^(x+2) = 30', 'x ≈ −0,102'],
      ['1,06ˣ = 2', 'x ≈ 11,896'],
      ['10^(3x) = 8,4', 'x ≈ 0,308'],
      ['2^(−x) = 17', 'x ≈ −4,087']
    ])
  }
];

const COMMON_LOG_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: COMMON_LOG_MATCHER_LEVELS_LIST[0],
  2: COMMON_LOG_MATCHER_LEVELS_LIST[1],
  3: COMMON_LOG_MATCHER_LEVELS_LIST[2]
};

export const CommonLogarithmMatcher: React.FC<CommonLogarithmMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-exp-tizes-logaritmus-matcher',
  topicTitle = '11. A tízes alapú logaritmus használata – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="hatvany-gyok-logaritmus"
      topicId={topicId}
      subtopicId="tizes-alapu-logaritmus"
      title={topicTitle}
      subtitle="Párosítsd a tízes alapú logaritmusokat, az áttérési alakokat és az egyenleteket a megoldásukkal!"
      levels={COMMON_LOG_MATCHER_LEVELS}
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

export default CommonLogarithmMatcher;

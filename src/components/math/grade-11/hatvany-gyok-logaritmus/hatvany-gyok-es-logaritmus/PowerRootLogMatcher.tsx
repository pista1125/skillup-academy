import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PowerRootLogMatcherProps {
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

const POWER_ROOT_LOG_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Egyenlet ↔ megoldás fejben',
    description: 'Írd fel a jobb oldalt az alap hatványaként, és párosítsd a kitevővel!',
    pairs: [
      { id: 'prlm1', left: '2ˣ = 32', right: 'x = 5' },
      { id: 'prlm2', left: '10ˣ = 1000', right: 'x = 3' },
      { id: 'prlm3', left: '3ˣ = 81', right: 'x = 4' },
      { id: 'prlm4', left: '2ˣ = 1/8', right: 'x = −3' },
      { id: 'prlm5', left: '10ˣ = 0,01', right: 'x = −2' },
      { id: 'prlm6', left: '4ˣ = 2', right: 'x = 1/2' },
      { id: 'prlm7', left: '27ˣ = 3', right: 'x = 1/3' },
      { id: 'prlm8', left: '5ˣ = 1', right: 'x = 0' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Egyenlet ↔ megoldás lg-vel',
    description: 'aˣ = b ⇒ x = lg b / lg a. Párosítsd az egyenletet a megoldás képletével!',
    pairs: [
      { id: 'prlm9', left: '1,056ᵗ = 6', right: 'lg 6 / lg 1,056' },
      { id: 'prlm10', left: '3ˣ = 20', right: 'lg 20 / lg 3' },
      { id: 'prlm11', left: '1,05ˣ = 2', right: 'lg 2 / lg 1,05' },
      { id: 'prlm12', left: '0,945ᵗ = 0,5', right: 'lg 0,5 / lg 0,945' },
      { id: 'prlm13', left: '1500 = 500 · 1,056ᵗ', right: 'lg 3 / lg 1,056' },
      { id: 'prlm14', left: '5 · 2ˣ = 35', right: 'lg 7 / lg 2' },
      { id: 'prlm15', left: '1,065ⁿ ≈ 285,7', right: 'lg 285,7 / lg 1,065' },
      { id: 'prlm16', left: '2 · 3ˣ = 10', right: 'lg 5 / lg 3' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Modellkérdés ↔ eredmény',
    description: 'Párosítsd a tankönyvi modellkérdést a helyes eredménnyel!',
    pairs: [
      { id: 'prlm17', left: 'E(25) = 500 · 1,056²⁵', right: '≈ 1950 eset' },
      { id: 'prlm18', left: 'Mikor 3000 eset a BSE-modellben?', right: '1991. szeptember' },
      { id: 'prlm19', left: 'Havi növekedés: E(t) = 500 · 1,056ᵗ', right: '5,6%' },
      { id: 'prlm20', left: 'B(t) = 3800 · 0,945ᵗ felezési ideje', right: '≈ 12,25 hónap' },
      { id: 'prlm21', left: '500 · q³⁷ = 3800', right: 'q ≈ 1,056' },
      { id: 'prlm22', left: '100 millió havi mobilhívás', right: '1998' },
      { id: 'prlm23', left: 'Népesség: 9 millió fő', right: '2056' },
      { id: 'prlm24', left: 'Előfizetők 2002 → 2008 (7 → 12 millió)', right: '+71,4%' }
    ]
  }
];

const POWER_ROOT_LOG_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: POWER_ROOT_LOG_MATCHER_LEVELS_LIST[0],
  2: POWER_ROOT_LOG_MATCHER_LEVELS_LIST[1],
  3: POWER_ROOT_LOG_MATCHER_LEVELS_LIST[2]
};

export const PowerRootLogMatcher: React.FC<PowerRootLogMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-exp-logaritmus-modellek-matcher',
  topicTitle = '12. Hatvány, gyök, logaritmus – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="hatvany-gyok-logaritmus"
      topicId={topicId}
      subtopicId="hatvany-gyok-es-logaritmus"
      title={topicTitle}
      subtitle="Párosítsd az exponenciális egyenleteket a megoldásukkal és a modellkérdéseket az eredményükkel!"
      levels={POWER_ROOT_LOG_MATCHER_LEVELS}
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

export default PowerRootLogMatcher;

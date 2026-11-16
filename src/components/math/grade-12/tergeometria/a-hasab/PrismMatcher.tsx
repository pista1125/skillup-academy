import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PrismMatcherProps {
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

const PRISM_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: A hasáb részei és fajtái',
    description: 'Párosítsd a fogalmat a jelentésével!',
    pairs: [
      { id: 'prm1', left: 'alaplap', right: 'tetszőleges sokszög, a hasáb egyik határoló lapja' },
      { id: 'prm2', left: 'fedőlap', right: 'az alaplapból párhuzamos eltolással kapott egybevágó sokszög' },
      { id: 'prm3', left: 'oldallap', right: 'paralelogramma az alap- és fedőlap megfelelő élei között' },
      { id: 'prm4', left: 'oldalél', right: 'az alaplap és a fedőlap megfelelő csúcsait összekötő él' },
      { id: 'prm5', left: 'egyenes hasáb', right: 'oldallapjai téglalapok' },
      { id: 'prm6', left: 'ferde hasáb', right: 'nem egyenes hasáb: M kisebb az oldalélnél' },
      { id: 'prm7', left: 'négyzetes oszlop', right: 'négyzet alapú egyenes hasáb' },
      { id: 'prm8', left: 'téglatest', right: 'téglalap alapú egyenes hasáb' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Csúcsok, élek, lapok',
    description: 'Párosítsd a hasábot a jellemző darabszámmal!',
    pairs: [
      { id: 'prm9', left: 'háromszög alapú hasáb élei', right: '9' },
      { id: 'prm10', left: 'ötszög alapú hasáb élei', right: '15' },
      { id: 'prm11', left: 'hatszög alapú hasáb lapjai', right: '8' },
      { id: 'prm12', left: 'nyolcszög alapú hasáb csúcsai', right: '16' },
      { id: 'prm13', left: 'nyolcszög alapú hasáb élei', right: '24' },
      { id: 'prm14', left: 'négyzetes oszlop lapjai', right: '6' },
      { id: 'prm15', left: 'tízszög alapú hasáb lapjai', right: '12' },
      { id: 'prm16', left: 'hétszög alapú hasáb csúcsai', right: '14' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Átlók és távolságok',
    description: 'Párosítsd a feladatot a helyes eredménnyel!',
    pairs: [
      { id: 'prm17', left: 'hatszög alapú hasáb testátlói', right: '18' },
      { id: 'prm18', left: 'hétszög alapú hasáb testátlói', right: '28' },
      { id: 'prm19', left: 'nyolcszög alapú hasáb testátlói', right: '40' },
      { id: 'prm20', left: 'háromszög alapú hasáb lapátlói', right: '6' },
      { id: 'prm21', left: 'hatszög alapú hasáb (a = 4 m, M = 5 m) hosszabb testátlója', right: '√89 ≈ 9,43 m' },
      { id: 'prm22', left: 'hatszög alapú hasáb (a = 4 m, M = 5 m) rövidebb testátlója', right: '√73 ≈ 8,54 m' },
      { id: 'prm23', left: '90 cm alapélű háromszög alapú oszlop magassága fekve', right: '≈ 77,9 cm' },
      { id: 'prm24', left: 'négyzetes oszlop (a = 3 cm, M = 4 cm) testátlója', right: '√34 ≈ 5,83 cm' }
    ]
  }
};

export const PrismMatcher: React.FC<PrismMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g12-ter-hasab-matcher',
  topicTitle = '2. A hasáb – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={12}
      chapterId="tergeometria"
      topicId={topicId}
      subtopicId="a-hasab"
      title={topicTitle}
      subtitle="Gyakorold a hasáb részeit, fajtáit, valamint a csúcsok, élek, lapok és átlók számát!"
      levels={PRISM_MATCHER_LEVELS}
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

export default PrismMatcher;

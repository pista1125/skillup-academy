import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface MassMeasureMatcherProps {
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

const MASS_MEASURE_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mértékegységek',
    description: 'Párosítsd az egyenlő tömegeket!',
    pairs: [
      { id: 'msm1', left: '1 kg', right: '100 dkg' },
      { id: 'msm2', left: '1 dkg', right: '10 g' },
      { id: 'msm3', left: '1000 g', right: '1 kg' },
      { id: 'msm4', left: '10 dkg', right: '100 g' },
      { id: 'msm5', left: '5 kg', right: '500 dkg' },
      { id: 'msm6', left: '3 dkg', right: '30 g' },
      { id: 'msm7', left: 'fél kilogramm', right: '50 dkg' },
      { id: 'msm8', left: '2 kg', right: '2000 g' }
    ]
  },
  {
    level: 2,
    title: '2. szint: A fűszerespolc',
    description: 'Add meg a tömeget a másik mértékegységben!',
    pairs: [
      { id: 'msm9', left: 'petrezselyem: 30 g', right: '3 dkg' },
      { id: 'msm10', left: 'rozmaring: 15 g', right: '1 dkg 5 g' },
      { id: 'msm11', left: 'őrölt paprika: 25 dkg', right: '250 g' },
      { id: 'msm12', left: 'fekete bors: 100 g', right: '10 dkg' },
      { id: 'msm13', left: 'mustár: 160 g', right: '16 dkg' },
      { id: 'msm14', left: 'kenyér: 1000 g', right: '100 dkg' },
      { id: 'msm15', left: '27 g', right: '2 dkg 7 g' },
      { id: 'msm16', left: '11 g', right: '1 dkg 1 g' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Becslés és szöveges feladatok',
    description: 'Párosítsd az élelmiszert vagy a feladatot a tömeggel!',
    pairs: [
      { id: 'msm17', left: 'egy darab sajt', right: '25 dkg' },
      { id: 'msm18', left: 'egy cukkini', right: '90 dkg' },
      { id: 'msm19', left: 'egy alma', right: '230 g' },
      { id: 'msm20', left: 'egy szilva', right: '6 dkg' },
      { id: 'msm21', left: 'egy zsák dió', right: '1500 dkg' },
      { id: 'msm22', left: 'rakomány az üres konténerbe (6000 kg − 3800 kg)', right: '2200 kg' },
      { id: 'msm23', left: 'rakomány: 3500 kg − autó 1250 kg − sofőr 90 kg', right: '2160 kg' },
      { id: 'msm24', left: 'keksztekercs: 95 dkg tészta + 35 dkg töltelék', right: '1 kg 30 dkg' }
    ]
  }
];

const MASS_MEASURE_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: MASS_MEASURE_MATCHER_LEVELS_LIST[0],
  2: MASS_MEASURE_MATCHER_LEVELS_LIST[1],
  3: MASS_MEASURE_MATCHER_LEVELS_LIST[2]
};

export const MassMeasureMatcher: React.FC<MassMeasureMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-meas-tomeg-matcher',
  topicTitle = '4. A tömeg mérése – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="meresek"
      topicId={topicId}
      subtopicId="a-tomeg-merese"
      title={topicTitle}
      subtitle="Párosítsd a kg, dkg és g mennyiségeket, a fűszereket és az élelmiszereket!"
      levels={MASS_MEASURE_MATCHER_LEVELS}
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

export default MassMeasureMatcher;

import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { WeightsCard } from './MassG3CardFigures';

interface MassG3MatcherProps {
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

const MASS_G3_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Hány dkg?',
    description: 'Add össze a súlyokat! 1 kg = 100 dkg.',
    pairs: [
      { id: 'massm1', left: '', promptFigure: <WeightsCard ws={[50, 20, 5]} />, right: '75 dkg' },
      { id: 'massm2', left: '', promptFigure: <WeightsCard ws={[20, 20, 10]} />, right: '50 dkg' },
      { id: 'massm3', left: '', promptFigure: <WeightsCard ws={[50, 50, 20]} />, right: '120 dkg' },
      { id: 'massm4', left: '', promptFigure: <WeightsCard ws={['1kg', 10]} />, right: '110 dkg' },
      { id: 'massm5', left: '1 kg', right: '100 dkg' },
      { id: 'massm6', left: '2 kg', right: '200 dkg' },
      { id: 'massm7', left: '1 kg 5 dkg', right: '105 dkg' },
      { id: 'massm8', left: '1 kg 50 dkg', right: '150 dkg' }
    ]
  },
  {
    level: 2,
    title: '2. szint: kg és dkg',
    description: 'Mennyi kg és mennyi dkg? A 100 dkg-ból 1 kg lesz.',
    pairs: [
      { id: 'massm9', left: '', promptFigure: <WeightsCard ws={['1kg', 50, 5]} />, right: '1 kg 55 dkg' },
      { id: 'massm10', left: '', promptFigure: <WeightsCard ws={['1kg', 20, 20]} />, right: '1 kg 40 dkg' },
      { id: 'massm11', left: '', promptFigure: <WeightsCard ws={[50, 20, 20]} />, right: '90 dkg' },
      { id: 'massm12', left: '', promptFigure: <WeightsCard ws={['1kg', '1kg']} />, right: '2 kg' },
      { id: 'massm13', left: '135 dkg', right: '1 kg 35 dkg' },
      { id: 'massm14', left: '153 dkg', right: '1 kg 53 dkg' },
      { id: 'massm15', left: '103 dkg', right: '1 kg 3 dkg' },
      { id: 'massm16', left: '130 dkg', right: '1 kg 30 dkg' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mennyi hiányzik?',
    description: 'Melyik súly kell még? 1 kg = 100 dkg, 2 kg = 200 dkg.',
    pairs: [
      { id: 'massm17', left: '', promptFigure: <WeightsCard ws={[50, 20, 20, '?']} eq="= 1 kg" />, right: '10 dkg' },
      { id: 'massm18', left: '', promptFigure: <WeightsCard ws={[20, 20, '?']} eq="= 1 kg" />, right: '60 dkg' },
      { id: 'massm19', left: '', promptFigure: <WeightsCard ws={[50, '?']} eq="= 1 kg" />, right: '50 dkg' },
      { id: 'massm20', left: '', promptFigure: <WeightsCard ws={[50, 20, 10, '?']} eq="= 1 kg" />, right: '20 dkg' },
      { id: 'massm21', left: '75 dkg + ? = 1 kg', right: '25 dkg' },
      { id: 'massm22', left: '65 dkg + ? = 1 kg', right: '35 dkg' },
      { id: 'massm23', left: '1 kg 70 dkg + ? = 2 kg', right: '30 dkg' },
      { id: 'massm24', left: '1 kg 95 dkg + ? = 2 kg', right: '5 dkg' }
    ]
  }
];

export const MASS_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: MASS_G3_MATCHER_LEVELS_LIST[0],
  2: MASS_G3_MATCHER_LEVELS_LIST[1],
  3: MASS_G3_MATCHER_LEVELS_LIST[2]
};

export const MassG3Matcher: React.FC<MassG3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-meas-tomeg-matcher',
  topicTitle = '2. A tömeg mérése – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="meresek"
      topicId={topicId}
      subtopicId="a-tomeg-merese"
      title={topicTitle}
      subtitle="Párosítsd a súlyokat és a tömegeket: kg és dkg!"
      levels={MASS_G3_MATCHER_LEVELS}
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

export default MassG3Matcher;

import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface StandardDeviationMatcherProps {
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

const STANDARD_DEVIATION_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Fogalom ↔ jelentés',
    description: 'Párosítsd a fogalmat, jelölést a jelentésével!',
    pairs: [
      { id: 'sdm1', left: 'σ', right: 'a szórás jele (görög szigma)' },
      { id: 'sdm2', left: 'x̄', right: 'az adatok átlaga' },
      { id: 'sdm3', left: 'xᵢ − x̄', right: 'eltérés az átlagtól' },
      { id: 'sdm4', left: 'σ²', right: 'szórásnégyzet: az eltérésnégyzetek átlaga' },
      { id: 'sdm5', left: 'Σ(xᵢ − x̄)', right: 'mindig 0' },
      { id: 'sdm6', left: 'σ = 0', right: 'minden adat egyenlő' },
      { id: 'sdm7', left: 'minden adat + 5', right: 'a szórás nem változik' },
      { id: 'sdm8', left: 'minden adat · 3', right: 'a szórás háromszorosára nő' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Adatsokaság ↔ szórás',
    description: 'Számítsd ki az átlagot, az eltéréseket, és párosítsd az adatsokaságot a szórásával!',
    pairs: [
      { id: 'sdm9', left: '5; 5; 5', right: '0' },
      { id: 'sdm10', left: '0; 2', right: '1' },
      { id: 'sdm11', left: '4; 8', right: '2' },
      { id: 'sdm12', left: '0; 6', right: '3' },
      { id: 'sdm13', left: '3; 11', right: '4' },
      { id: 'sdm14', left: '10; 20', right: '5' },
      { id: 'sdm15', left: '1; 3; 5; 7', right: '√5 ≈ 2,24' },
      { id: 'sdm16', left: '2; 4; 6', right: '≈ 1,63' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Tankönyvi adatsokaság ↔ szórás',
    description: 'Párosítsd a (gyakran gyakorisággal megadott) adatsokaságot a szórásával!',
    pairs: [
      { id: 'sdm17', left: '33×2; 45×6; 46; 48', right: 'σ ≈ 5,08' },
      { id: 'sdm18', left: 'kocka: 21, 18, 4, 45, 22, 10 db', right: 'σ ≈ 1,57' },
      { id: 'sdm19', left: '−10; 0; 10; 15; 35', right: 'σ ≈ 15,17' },
      { id: 'sdm20', left: '3; 5×6; 6×8; 7×2; 8×2; 9', right: 'σ ≈ 1,30' },
      { id: 'sdm21', left: '2×8; 4×2; 6; 10×9', right: 'σ ≈ 3,74' },
      { id: 'sdm22', left: '2, 3, 4, 5, 2, 4, 4, 6, 8, 2, 6, 9, 2, 3, 7', right: 'σ ≈ 2,22' },
      { id: 'sdm23', left: '17,60; 18,72; 19,39; 19,38; 19,10; 19,87', right: 'σ ≈ 0,72' },
      { id: 'sdm24', left: '2; 4; 4; 4; 5; 5; 7; 9', right: 'σ = 2' }
    ]
  }
};

export const StandardDeviationMatcher: React.FC<StandardDeviationMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-stat-szoras-matcher',
  topicTitle = '4. Adatsokaság szórása – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="statisztika-valoszinusegszamitas"
      topicId={topicId}
      subtopicId="adatsokasag-szorasa"
      title={topicTitle}
      subtitle="Párosítsd a szórás fogalmait, majd az adatsokaságokat a szórásukkal!"
      levels={STANDARD_DEVIATION_MATCHER_LEVELS}
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

export default StandardDeviationMatcher;

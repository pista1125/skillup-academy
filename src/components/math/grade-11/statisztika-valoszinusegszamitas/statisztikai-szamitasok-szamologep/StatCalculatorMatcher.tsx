import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface StatCalculatorMatcherProps {
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

const STAT_CALCULATOR_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: A kijelző sorai',
    description: 'Párosítsd a számológép kijelzőjén látható jelölést a jelentésével!',
    pairs: [
      { id: 'scm1', left: 'x̄', right: 'átlag' },
      { id: 'scm2', left: 'Σx', right: 'az adatok összege' },
      { id: 'scm3', left: 'Σx²', right: 'az adatok négyzetösszege' },
      { id: 'scm4', left: 'σ²x', right: 'torzított szórásnégyzet (n-nel osztva)' },
      { id: 'scm5', left: 'σx', right: 'a tanult szórás (torzított)' },
      { id: 'scm6', left: 'sx', right: 'torzítatlan szórás (n − 1-gyel osztva)' },
      { id: 'scm7', left: 'n', right: 'elemszám (a gyakoriságok összege)' },
      { id: 'scm8', left: 'Med', right: 'medián' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Adatsor ↔ σx',
    description: 'Párosítsd a tankönyvi adatsort a számológép által kiírt σx értékkel!',
    pairs: [
      { id: 'scm9', left: '20 járat megállói (4…17)', right: 'σx ≈ 3,098' },
      { id: 'scm10', left: 'napi riasztások (31 nap)', right: 'σx ≈ 2,688' },
      { id: 'scm11', left: 'Márton Anita 6 dobása', right: 'σx ≈ 0,719' },
      { id: 'scm12', left: 'cinkelt kocka, 120 dobás', right: 'σx ≈ 1,571' },
      { id: 'scm13', left: '33, 45, 46, 48', right: 'σx ≈ 5,874' },
      { id: 'scm14', left: '33×2, 45×6, 46, 48', right: 'σx ≈ 5,079' },
      { id: 'scm15', left: 'EB-sebességek (18 játékos)', right: 'σx ≈ 3,385' },
      { id: 'scm16', left: 'két kocka különbsége: 3, 6, 5, 3, 2, 1 db', right: 'σx ≈ 1,375' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: σ²x ↔ s²x',
    description: 'Számítsd ki a torzítatlan szórásnégyzetet: s² = σ² · n / (n − 1)!',
    pairs: [
      { id: 'scm17', left: 'n = 20; σ²x = 9,6', right: 's²x ≈ 10,11' },
      { id: 'scm18', left: 'n = 2; σ²x = 4', right: 's²x = 8' },
      { id: 'scm19', left: 'n = 5; σ²x = 230', right: 's²x = 287,5' },
      { id: 'scm20', left: 'n = 4; σ²x = 34,5', right: 's²x = 46' },
      { id: 'scm21', left: 'n = 10; σ²x = 25,8', right: 's²x ≈ 28,67' },
      { id: 'scm22', left: 'n = 6; σ²x ≈ 0,517', right: 's²x ≈ 0,62' },
      { id: 'scm23', left: 'n = 3; σ²x = 2', right: 's²x = 3' },
      { id: 'scm24', left: 'n = 11; σ²x = 5', right: 's²x = 5,5' }
    ]
  }
};

export const StatCalculatorMatcher: React.FC<StatCalculatorMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-stat-szamologep-matcher',
  topicTitle = '5. Ráadás – Statisztikai számítások számológéppel – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="statisztika-valoszinusegszamitas"
      topicId={topicId}
      subtopicId="statisztikai-szamitasok-szamologep"
      title={topicTitle}
      subtitle="Párosítsd a kijelző jelöléseit, a tankönyvi adatsorokat a szórásukkal, és számold át a torzított szórásnégyzetet torzítatlanra!"
      levels={STAT_CALCULATOR_MATCHER_LEVELS}
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

export default StatCalculatorMatcher;

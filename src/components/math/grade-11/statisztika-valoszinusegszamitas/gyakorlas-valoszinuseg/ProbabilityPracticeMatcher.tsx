import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ProbabilityPracticeMatcherProps {
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

const PROBABILITY_PRACTICE_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Képletek és fogalmak',
    description: 'Párosítsd a kérdést a hozzá tartozó képlettel vagy párjával!',
    pairs: [
      { id: 'ppm1', left: 'P(nem A)', right: '1 − P(A)' },
      { id: 'ppm2', left: 'legfeljebb 2 (5 kísérletből)', right: 'P(0) + P(1) + P(2)' },
      { id: 'ppm3', left: 'legalább 2 (5 kísérletből)', right: '1 − [P(0) + P(1)]' },
      { id: 'ppm4', left: 'legalább egy (n kísérletből)', right: '1 − (1 − p)ⁿ' },
      { id: 'ppm5', left: 'a „legalább 2” komplementere', right: 'legfeljebb 1' },
      { id: 'ppm6', left: 'a „7-nél több” komplementere', right: 'legfeljebb 7' },
      { id: 'ppm7', left: 'várható érték', right: 'E = x₁ · p₁ + … + xₙ · pₙ' },
      { id: 'ppm8', left: 'pontosan k siker n kísérletből', right: '(n alatt k) · pᵏ · (1 − p)^{n−k}' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Tankönyvi feladatok',
    description: 'Párosítsd a feladatot az eredményével!',
    pairs: [
      { id: 'ppm9', left: 'Bence (6 óra, 0,05): legalább egyszer felel', right: '≈ 0,2649' },
      { id: 'ppm10', left: 'Bence: legalább két órán felel', right: '≈ 0,0328' },
      { id: 'ppm11', left: '30 utas (2%): van vírushordozó', right: '≈ 0,4545' },
      { id: 'ppm12', left: '10 utas (2%): van vírushordozó', right: '≈ 0,1829' },
      { id: 'ppm13', left: '6 mérés: mind a (14,5; 15,9] sávba esik', right: '1/64' },
      { id: 'ppm14', left: '6 mérés: legalább egy nagyobb 15,9-nél', right: '≈ 0,822' },
      { id: 'ppm15', left: 'Judit helyes bolygósorrendje', right: '1/48' },
      { id: 'ppm16', left: '8 cédula, 2 húzás visszatevés nélkül: legalább egy Föld', right: '1/4' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Binomiális kérdések',
    description: 'Számold ki a valószínűséget, és párosítsd!',
    pairs: [
      { id: 'ppm17', left: '10 pirítós (p = 0,62): pontosan 7 a vajas felére', right: '≈ 0,2319' },
      { id: 'ppm18', left: '10 pirítós: 7-nél több a vajas felére', right: '≈ 0,2017' },
      { id: 'ppm19', left: '10 pirítós: legfeljebb 7 a vajas felére', right: '≈ 0,7983' },
      { id: 'ppm20', left: '10 pirítós: mindegyik a vajas felére', right: '≈ 0,0084' },
      { id: 'ppm21', left: '5 gyöngy visszatevéssel (p = 0,2): nincs selejtes', right: '0,32768' },
      { id: 'ppm22', left: '5 gyöngy visszatevéssel: pontosan 1 selejtes', right: '0,4096' },
      { id: 'ppm23', left: '10 kockadobás: legfeljebb 2 hatos', right: '≈ 0,7752' },
      { id: 'ppm24', left: '50 palack (p = 0,08): van hibás', right: '≈ 0,9845' }
    ]
  }
};

export const ProbabilityPracticeMatcher: React.FC<ProbabilityPracticeMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-stat-valoszinuseg-gyakorlas-matcher',
  topicTitle = '14. Gyakorlás – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="statisztika-valoszinusegszamitas"
      topicId={topicId}
      subtopicId="gyakorlas-valoszinuseg"
      title={topicTitle}
      subtitle="Párosítsd a képleteket, a tankönyvi feladatokat és a binomiális kérdéseket az eredményükkel!"
      levels={PROBABILITY_PRACTICE_MATCHER_LEVELS}
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

export default ProbabilityPracticeMatcher;

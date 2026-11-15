import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface VectorScalarMatcherProps {
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

const VECTOR_SCALAR_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: A szorzó és a számszoros',
    description: 'Párosítsd a λ értékét a λ · →a tulajdonságával (→a ≠ →0)!',
    pairs: [
      { id: 'vcm1', left: 'λ > 1', right: 'Egyirányú →a-val és hosszabb' },
      { id: 'vcm2', left: '0 < λ < 1', right: 'Egyirányú →a-val és rövidebb' },
      { id: 'vcm3', left: 'λ = 1', right: 'Maga az →a vektor' },
      { id: 'vcm4', left: 'λ = 0', right: 'A nullvektor (→0)' },
      { id: 'vcm5', left: '−1 < λ < 0', right: 'Ellentétes irányú és rövidebb' },
      { id: 'vcm6', left: 'λ = −1', right: 'Az ellentett vektor, −→a' },
      { id: 'vcm7', left: 'λ < −1', right: 'Ellentétes irányú és hosszabb' },
      { id: 'vcm8', left: '|λ · →a|', right: '|λ| · |→a|' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Hosszak (|→a| = 6 cm)',
    description: 'Párosítsd a számszorost a hosszával!',
    pairs: [
      { id: 'vcm9', left: '2→a', right: '12 cm' },
      { id: 'vcm10', left: '−→a', right: '6 cm' },
      { id: 'vcm11', left: '0,5→a', right: '3 cm' },
      { id: 'vcm12', left: '−1,5→a', right: '9 cm' },
      { id: 'vcm13', left: '⅓ →a', right: '2 cm' },
      { id: 'vcm14', left: '−4→a', right: '24 cm' },
      { id: 'vcm15', left: '0 · →a', right: '0 cm' },
      { id: 'vcm16', left: '2,5→a', right: '15 cm' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Vektorok kifejezése',
    description: 'Párosítsd a vektort a felírásával! (Rács: →i, →j; hatszög: →b, →c; kocka: →a = →AB, →b = →AD, →c = →AE.)',
    pairs: [
      { id: 'vcm17', left: '→d (3 jobbra, 2 le)', right: '3→i − 2→j' },
      { id: 'vcm18', left: '→e (3 balra, 2 le)', right: '−3→i − 2→j' },
      { id: 'vcm19', left: '→d + →e', right: '−4→j' },
      { id: 'vcm20', left: '→d − →e', right: '6→i' },
      { id: 'vcm21', left: 'Szabályos hatszög: →AD', right: '2(→b + →c)' },
      { id: 'vcm22', left: 'Kocka: →BH', right: '−→a + →b + →c' },
      { id: 'vcm23', left: 'Kocka: →DQ (Q a BF felezőpontja)', right: '→a − →b + ½→c' },
      { id: 'vcm24', left: 'Paralelogramma: közös csúcsból a középpontba', right: '½(→a + →b)' }
    ]
  }
];

const VECTOR_SCALAR_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: VECTOR_SCALAR_MATCHER_LEVELS_LIST[0],
  2: VECTOR_SCALAR_MATCHER_LEVELS_LIST[1],
  3: VECTOR_SCALAR_MATCHER_LEVELS_LIST[2]
};

export const VectorScalarMatcher: React.FC<VectorScalarMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-geo-vektor-szamszoros-matcher',
  topicTitle = '3. Vektorok számszorosa – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="koordinatageometria"
      topicId={topicId}
      subtopicId="vektorok-szamszorosa"
      title={topicTitle}
      subtitle="Gyakorold a számszoros irányát és hosszát, valamint vektorok kifejezését más vektorokkal!"
      levels={VECTOR_SCALAR_MATCHER_LEVELS}
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

export default VectorScalarMatcher;

import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface GeometricSumMatcherProps {
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

const GEOMETRIC_SUM_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Fogalmak és képletek',
    description: 'Párosítsd a fogalmat a képletével vagy jelentésével!',
    pairs: [
      { id: 'gsm1', left: 'Sₙ (q ≠ 1)', right: 'a₁ · (qⁿ − 1)/(q − 1)' },
      { id: 'gsm2', left: 'Sₙ (q = 1)', right: 'n · a₁' },
      { id: 'gsm3', left: 'aₙ (mértani sorozat)', right: 'a₁ · qⁿ⁻¹' },
      { id: 'gsm4', left: 'q · Sₙ − Sₙ', right: 'a₁qⁿ − a₁' },
      { id: 'gsm5', left: 'Sₙ (0 < q < 1, kényelmes alak)', right: 'a₁ · (1 − qⁿ)/(1 − q)' },
      { id: 'gsm6', left: 'aₙ az összegekből (n ≥ 2)', right: 'Sₙ − Sₙ₋₁' },
      { id: 'gsm7', left: 'q egymás utáni tagokból', right: 'aₙ / aₙ₋₁' },
      { id: 'gsm8', left: 'Sₙ (számtani sorozat – nem keverendő!)', right: '(a₁ + aₙ)/2 · n' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Számold ki az összeget!',
    description: 'Párosítsd az összeget az értékével!',
    pairs: [
      { id: 'gsm9', left: '1 + 2 + 4 + … + 128', right: '255' },
      { id: 'gsm10', left: '5 + 10 + 20 + 40', right: '75' },
      { id: 'gsm11', left: '1 + 3 + 9 + 27 + 81', right: '121' },
      { id: 'gsm12', left: '100 + 10 + 1', right: '111' },
      { id: 'gsm13', left: 'a₁ = 2, q = −1, S₉', right: '2' },
      { id: 'gsm14', left: 'a₁ = 4, q = 0,5, S₃', right: '7' },
      { id: 'gsm15', left: 'a₁ = 1, q = 4, S₄', right: '85' },
      { id: 'gsm16', left: 'a₁ = −1, q = 2, S₅', right: '−31' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Szöveges feladatok',
    description: 'Párosítsd a feladatot a helyes eredménnyel!',
    pairs: [
      { id: 'gsm17', left: 'járvány: a₁ = 600, q = 0,9, 20 nap összesen', right: '≈ 5271' },
      { id: 'gsm18', left: 'családfa: ősök 10 generációra', right: '2046' },
      { id: 'gsm19', left: 'sakktábla: szemek az összes mezőn', right: '2⁶⁴ − 1 ≈ 1,84 · 10¹⁹' },
      { id: 'gsm20', left: 'sál: 8 cm, naponta +20%, 2 m', right: '10 nap' },
      { id: 'gsm21', left: 'a₁ = 2, q = 3, Sₙ = 177 146', right: 'n = 11' },
      { id: 'gsm22', left: '120 kg, hetente −1,5%: fogyás 5 hét alatt', right: '≈ 8,73 kg' },
      { id: 'gsm23', left: '42 kg → 65 kg, hetente +1%', right: '44 hét' },
      { id: 'gsm24', left: 'a₁ = 18, a₂ = 27, S₄', right: '146,25' }
    ]
  }
};

export const GeometricSumMatcher: React.FC<GeometricSumMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g12-seq-mertani-osszeg-matcher',
  topicTitle = '6. A mértani sorozat első n tagjának összege – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={12}
      chapterId="sorozatok"
      topicId={topicId}
      subtopicId="a-mertani-sorozat-elso-n-tagjanak-osszege"
      title={topicTitle}
      subtitle="Gyakorold a mértani sorozat összegképletét, a nevezetes összegeket és a szöveges feladatokat!"
      levels={GEOMETRIC_SUM_MATCHER_LEVELS}
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

export default GeometricSumMatcher;

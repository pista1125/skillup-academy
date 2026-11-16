import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface VectorsCoordinatesSummaryMatcherProps {
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

const VECTORS_COORDINATES_SUMMARY_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: "1. szint: Képletek",
    description: "Párosítsd a fogalmat a képletével!",
    pairs: [
      { id: 'vcm101', left: "a vektor hossza", right: "√(a₁² + a₂²)" },
      { id: 'vcm102', left: "AB vektor koordinátái", right: "(b₁ − a₁; b₂ − a₂)" },
      { id: 'vcm103', left: "szakasz felezőpontja", right: "((a₁ + b₁)/2; (a₂ + b₂)/2)" },
      { id: 'vcm104', left: "kör egyenlete", right: "(x − u)² + (y − v)² = r²" },
      { id: 'vcm105', left: "egyenes egyenlete (nem függőleges)", right: "y = mx + b" },
      { id: 'vcm106', left: "y tengellyel párhuzamos egyenes", right: "x = c" },
      { id: 'vcm107', left: "merőleges egyenesek", right: "m₁ · m₂ = −1" },
      { id: 'vcm108', left: "párhuzamos egyenesek", right: "m₁ = m₂" }
    ]
  },
  2: {
    level: 2,
    title: "2. szint: Vektorműveletek",
    description: "a(−3; 8), b(7; −2) – párosítsd a műveletet az eredménnyel!",
    pairs: [
      { id: 'vcm201', left: "2a", right: "(−6; 16)" },
      { id: 'vcm202', left: "a + b", right: "(4; 6)" },
      { id: 'vcm203', left: "b − a", right: "(10; −10)" },
      { id: 'vcm204', left: "a − b", right: "(−10; 10)" },
      { id: 'vcm205', left: "−b", right: "(−7; 2)" },
      { id: 'vcm206', left: "3a − 2b", right: "(−23; 28)" },
      { id: 'vcm207', left: "0,5 · b", right: "(3,5; −1)" },
      { id: 'vcm208', left: "a + 2b", right: "(11; 4)" }
    ]
  },
  3: {
    level: 3,
    title: "3. szint: Feladatok eredményei",
    description: "Párosítsd a feladatot a helyes eredménnyel!",
    pairs: [
      { id: 'vcm301', left: "P(−6; 9), Q(−1; −3) távolsága", right: "13" },
      { id: 'vcm302', left: "y = 4x − 3 és az x tengely metszéspontja", right: "(0,75; 0)" },
      { id: 'vcm303', left: "y = 5x − 7 ⊥ y = kx + 3", right: "k = −1/5" },
      { id: 'vcm304', left: "y = −2x − 4 és y = 3x + 1 metszéspontja", right: "(−1; −2)" },
      { id: 'vcm305', left: "A(−3; 5), B(4; 2) felezőpontja", right: "(0,5; 3,5)" },
      { id: 'vcm306', left: "K(−12; 5), r = 13 kör", right: "(x + 12)² + (y − 5)² = 169" },
      { id: 'vcm307', left: "C(−5; 4) középpontú, origón átmenő kör", right: "(x + 5)² + (y − 4)² = 41" },
      { id: 'vcm308', left: "ABC: A(−5; 3), B(−1; 0), C(4; 12): β", right: "≈ 75,75°" }
    ]
  }
};

export const VectorsCoordinatesSummaryMatcher: React.FC<VectorsCoordinatesSummaryMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g12-sum-vektorok-koordinatageometria-matcher',
  topicTitle = "9. Vektorok, koordinátageometria – Párosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={12}
      chapterId="rendszerezo-osszefoglalas"
      topicId={topicId}
      subtopicId="vektorok-koordinatageometria"
      title={topicTitle}
      subtitle="Párosítsd a fogalmakat a képletükkel, a vektorműveleteket az eredményükkel és az egyenleteket az adataikkal!"
      levels={VECTORS_COORDINATES_SUMMARY_MATCHER_LEVELS}
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

export default VectorsCoordinatesSummaryMatcher;

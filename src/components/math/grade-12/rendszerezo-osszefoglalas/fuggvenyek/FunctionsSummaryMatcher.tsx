import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface FunctionsSummaryMatcherProps {
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

const FUNCTIONS_SUMMARY_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: "1. szint: Alapfüggvények",
    description: "Párosítsd a függvényt a jellemző tulajdonságával!",
    pairs: [
      { id: "fum101", left: "f(x) = ax + b, a ≠ 0", right: "elsőfokú, grafikonja egyenes" },
      { id: "fum102", left: "f(x) = 1/x", right: "nincs zérushelye és szélsőértéke" },
      { id: "fum103", left: "f(x) = |x|", right: "minimuma 0 az x = 0 helyen" },
      { id: "fum104", left: "f(x) = √x", right: "értelmezési tartománya [0; ∞[" },
      { id: "fum105", left: "f(x) = 2ˣ", right: "értékkészlete ]0; ∞[" },
      { id: "fum106", left: "f(x) = 0,5ˣ", right: "szigorúan monoton csökken" },
      { id: "fum107", left: "f(x) = 3", right: "konstans (nulladfokú) függvény" },
      { id: "fum108", left: "f(x) = 0,5x", right: "egyenes arányosság" }
    ]
  },
  2: {
    level: 2,
    title: "2. szint: Transzformációk",
    description: "Párosítsd a függvényt azzal a transzformációval, amellyel az alapfüggvényből kapjuk!",
    pairs: [
      { id: "fum201", left: "(x − 4)²", right: "x² eltolása jobbra 4-gyel" },
      { id: "fum202", left: "x² − 3", right: "x² eltolása lefelé 3-mal" },
      { id: "fum203", left: "2x²", right: "x² nyújtása az y tengely irányában 2-szeresére" },
      { id: "fum204", left: "−x²", right: "x² tükrözése az x tengelyre" },
      { id: "fum205", left: "|x² − 3|", right: "x² − 3 x tengely alatti részének tükrözése" },
      { id: "fum206", left: "(x + 3)² − 4", right: "x² eltolása a v(−3; −4) vektorral" },
      { id: "fum207", left: "1/x + 2", right: "1/x eltolása a v(0; 2) vektorral" },
      { id: "fum208", left: "√(x + 1)", right: "√x eltolása balra 1-gyel" }
    ]
  },
  3: {
    level: 3,
    title: "3. szint: Feladat és eredmény",
    description: "Párosítsd a tankönyvi feladatot az eredményével!",
    pairs: [
      { id: "fum301", left: "A(−5; 6), B(5; −2) lineáris f", right: "f(x) = −0,8x + 2" },
      { id: "fum302", left: "f(x) = −0,8x + 2 zérushelye", right: "x = 2,5" },
      { id: "fum303", left: "g(x) = (x + 3)² − 4 minimuma", right: "−4, az x = −3 helyen" },
      { id: "fum304", left: "h(x) = 1/x + 2 értékkészlete az [1; 4]-en", right: "[2,25; 3]" },
      { id: "fum305", left: "−(x − 2)² + 9: kilövési magasság", right: "5 m" },
      { id: "fum306", left: "12x + 640: egy 45 dkg-os csomag díja", right: "1180 Ft" },
      { id: "fum307", left: "14 · 0,991ᵗ: a hab kezdeti magassága", right: "14 mm" },
      { id: "fum308", left: "{1; 2; 3} → {5; 6; 7} függvények száma", right: "27" }
    ]
  }
};

export const FunctionsSummaryMatcher: React.FC<FunctionsSummaryMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g12-sum-fuggvenyek-matcher',
  topicTitle = "5. Függvények – Párosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={12}
      chapterId="rendszerezo-osszefoglalas"
      topicId={topicId}
      subtopicId="fuggvenyek"
      title={topicTitle}
      subtitle="Párosítsd az alapfüggvényeket a tulajdonságaikkal, a transzformációkat a hatásukkal és a feladatokat az eredményükkel!"
      levels={FUNCTIONS_SUMMARY_MATCHER_LEVELS}
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

export default FunctionsSummaryMatcher;

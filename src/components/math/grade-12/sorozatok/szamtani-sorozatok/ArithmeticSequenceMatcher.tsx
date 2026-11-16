import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ArithmeticSequenceMatcherProps {
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

const ARITHMETIC_SEQUENCE_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: "1. szint: Sorozat és differencia",
    description: "Párosítsd a számtani sorozatot a differenciájával!",
    pairs: [
      { id: "asm101", left: "3; 7; 11; …", right: "d = 4" },
      { id: "asm102", left: "20; 17; 14; …", right: "d = −3" },
      { id: "asm103", left: "34; 36; 38; …", right: "d = 2" },
      { id: "asm104", left: "824; 851; 878; …", right: "d = 27" },
      { id: "asm105", left: "6; 12; 18; …", right: "d = 6" },
      { id: "asm106", left: "5; 5,6; 6,2; …", right: "d = 0,6" },
      { id: "asm107", left: "2300; 2400; 2500; …", right: "d = 100" },
      { id: "asm108", left: "7; 7; 7; …", right: "d = 0" }
    ]
  },
  2: {
    level: 2,
    title: "2. szint: Adatokból a tag",
    description: "Párosítsd az adatokat a kérdezett tag értékével!",
    pairs: [
      { id: "asm201", left: "a₁ = 34, d = 2: a₇₇", right: "186" },
      { id: "asm202", left: "a₁ = 824, d = 27: a₁₁", right: "1094" },
      { id: "asm203", left: "a₁ = 6, d = 6: a₁₂", right: "72" },
      { id: "asm204", left: "a₁₁ = 21, d = 5: a₁", right: "−29" },
      { id: "asm205", left: "b₁ = −10, d = 4: b₄", right: "2" },
      { id: "asm206", left: "a₁ = 44, d = 11: a₃₁", right: "374" },
      { id: "asm207", left: "a₂₈ = 96, d = 4: a₁", right: "−12" },
      { id: "asm208", left: "a₁ = −1, d = 7: a₅", right: "27" }
    ]
  },
  3: {
    level: 3,
    title: "3. szint: Feladatok eredményei",
    description: "Párosítsd a feladatot a helyes eredménnyel!",
    pairs: [
      { id: "asm301", left: "a₁₂ = 40, a₁₅ = 46: d", right: "2" },
      { id: "asm302", left: "a₂₈ = 96, a₃₂ = 112: hányadik tag a 192?", right: "52" },
      { id: "asm303", left: "34; 36; 38; …: hányadik tag az 1948?", right: "958" },
      { id: "asm304", left: "b₇ − b₁ = 24, b₇ + b₁ = 4: b₇", right: "14" },
      { id: "asm305", left: "három szomszédos tag összege 63: a középső", right: "21" },
      { id: "asm306", left: "persely, április–június 8100 Ft: januárban", right: "2300 Ft" },
      { id: "asm307", left: "37k + 3 alakú négyjegyű számok száma", right: "244" },
      { id: "asm308", left: "hatszögkörök: hány színből kell 100-nál kevesebb lap?", right: "16" }
    ]
  }
};

export const ArithmeticSequenceMatcher: React.FC<ArithmeticSequenceMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g12-seq-szamtani-matcher',
  topicTitle = "3. Számtani sorozatok – Párosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={12}
      chapterId="sorozatok"
      topicId={topicId}
      subtopicId="szamtani-sorozatok"
      title={topicTitle}
      subtitle="Párosítsd a sorozatokat a differenciájukkal, az adatokat a keresett taggal és a feladatokat az eredményükkel!"
      levels={ARITHMETIC_SEQUENCE_MATCHER_LEVELS}
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

export default ArithmeticSequenceMatcher;

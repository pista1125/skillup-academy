import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ArithmeticSummaryMatcherProps {
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

const ARITHMETIC_SUMMARY_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: "1. szint: Fogalom és definíció",
    description: "Párosítsd a fogalmat a jelentésével!",
    pairs: [
      { id: "arm101", left: "prímszám", right: "pontosan két pozitív osztója van" },
      { id: "arm102", left: "relatív prímek", right: "legnagyobb közös osztójuk 1" },
      { id: "arm103", left: "irracionális szám", right: "nem írható fel két egész hányadosaként" },
      { id: "arm104", left: "racionális szám tizedes tört alakja", right: "véges vagy végtelen szakaszos" },
      { id: "arm105", left: "[a; b[", right: "a ≤ x < b" },
      { id: "arm106", left: "b | a", right: "van olyan c ∈ ℕ, hogy a = b · c" },
      { id: "arm107", left: "logₐ b", right: "a kitevő, amelyre a-t emelve b-t kapunk" },
      { id: "arm108", left: "egyenes arányosság", right: "az összetartozó értékek hányadosa állandó" }
    ]
  },
  2: {
    level: 2,
    title: "2. szint: Kifejezés és érték",
    description: "Párosítsd a kifejezést az értékével!",
    pairs: [
      { id: "arm201", left: "(90; 75)", right: "15" },
      { id: "arm202", left: "[90; 75]", right: "450" },
      { id: "arm203", left: "log₂ 8", right: "3" },
      { id: "arm204", left: "log₅ (1/5)", right: "−1" },
      { id: "arm205", left: "∛8", right: "2" },
      { id: "arm206", left: "⁴√625", right: "5" },
      { id: "arm207", left: "16^{3/4}", right: "8" },
      { id: "arm208", left: "2⁻³", right: "1/8" }
    ]
  },
  3: {
    level: 3,
    title: "3. szint: Feladat és eredmény",
    description: "Párosítsd a tankönyvi feladatot az eredményével!",
    pairs: [
      { id: "arm301", left: "101111₂ tízes alakja", right: "47" },
      { id: "arm302", left: "2304₆ tízes alakja", right: "544" },
      { id: "arm303", left: "3014₅ hatos alakja", right: "1440₆" },
      { id: "arm304", left: "72-nek a 15%-a", right: "10,8" },
      { id: "arm305", left: "a lakás adója (2,2 millió Ft 15%-a)", right: "330 000 Ft" },
      { id: "arm306", left: "két hajó 18 és 20 naponta indul: együtt", right: "180 naponta" },
      { id: "arm307", left: "1234₆ tízes alakja", right: "310" },
      { id: "arm308", left: "√(47 − 3x) értelmezett: természetes x-ek száma", right: "16" }
    ]
  }
};

export const ArithmeticSummaryMatcher: React.FC<ArithmeticSummaryMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g12-sum-szamtan-matcher',
  topicTitle = "3. Számtan – Párosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={12}
      chapterId="rendszerezo-osszefoglalas"
      topicId={topicId}
      subtopicId="szamtan"
      title={topicTitle}
      subtitle="Párosítsd a fogalmakat a definíciójukkal, a kifejezéseket az értékükkel és a feladatokat az eredményükkel!"
      levels={ARITHMETIC_SUMMARY_MATCHER_LEVELS}
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

export default ArithmeticSummaryMatcher;

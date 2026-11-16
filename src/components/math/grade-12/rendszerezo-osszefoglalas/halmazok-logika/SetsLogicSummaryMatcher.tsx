import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SetsLogicSummaryMatcherProps {
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

const SETS_LOGIC_SUMMARY_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: "1. szint: Jelölések",
    description: "Párosítsd a jelölést a jelentésével!",
    pairs: [
      { id: "slm101", left: "A ∪ B", right: "unió: legalább az egyikben" },
      { id: "slm102", left: "A ∩ B", right: "metszet: mindkettőben" },
      { id: "slm103", left: "A ∖ B", right: "különbség: A-ban, de B-ben nem" },
      { id: "slm104", left: "Ā", right: "komplementer: H ∖ A" },
      { id: "slm105", left: "∅", right: "üres halmaz" },
      { id: "slm106", left: "|A|", right: "számosság (elemszám)" },
      { id: "slm107", left: "A ⊆ B", right: "A részhalmaza B-nek" },
      { id: "slm108", left: "¬A", right: "A tagadása" }
    ]
  },
  2: {
    level: 2,
    title: "2. szint: Műveletek elemekkel",
    description: "H = {1; 2; …; 10}, A = {1; 2; 3; 4; 5; 6}, B = {4; 5; 6; 7; 8}. Párosítsd a műveletet az eredménnyel!",
    pairs: [
      { id: "slm201", left: "A ∩ B", right: "{4; 5; 6}" },
      { id: "slm202", left: "A ∪ B", right: "{1; 2; 3; 4; 5; 6; 7; 8}" },
      { id: "slm203", left: "A ∖ B", right: "{1; 2; 3}" },
      { id: "slm204", left: "B ∖ A", right: "{7; 8}" },
      { id: "slm205", left: "Ā", right: "{7; 8; 9; 10}" },
      { id: "slm206", left: "H ∖ (A ∪ B)", right: "{9; 10}" },
      { id: "slm207", left: "|A ∪ B|", right: "8" },
      { id: "slm208", left: "|A ∩ B|", right: "3" }
    ]
  },
  3: {
    level: 3,
    title: "3. szint: Logikai műveletek",
    description: "Párosítsd az állítást azzal a feltétellel vagy átalakítással, amely rá vonatkozik!",
    pairs: [
      { id: "slm301", left: "A → B hamis", right: "A igaz és B hamis" },
      { id: "slm302", left: "A ∧ B igaz", right: "A és B is igaz" },
      { id: "slm303", left: "A ∨ B hamis", right: "A és B is hamis" },
      { id: "slm304", left: "A ↔ B igaz", right: "A és B logikai értéke azonos" },
      { id: "slm305", left: "„vagy A, vagy B” igaz", right: "pontosan az egyik igaz" },
      { id: "slm306", left: "„Minden zokni fekete.” tagadása", right: "„Van olyan zokni, amely nem fekete.”" },
      { id: "slm307", left: "„Van olyan ország, ahol él kenguru.” tagadása", right: "„Egyik országban sem él kenguru.”" },
      { id: "slm308", left: "A → B megfordítása", right: "B → A" }
    ]
  }
};

export const SetsLogicSummaryMatcher: React.FC<SetsLogicSummaryMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g12-sum-halmazok-logika-matcher',
  topicTitle = "1. Halmazok, logika – Párosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={12}
      chapterId="rendszerezo-osszefoglalas"
      topicId={topicId}
      subtopicId="halmazok-logika"
      title={topicTitle}
      subtitle="Párosítsd a jelöléseket a jelentésükkel, a műveleteket az eredményükkel és a logikai műveleteket a feltételükkel!"
      levels={SETS_LOGIC_SUMMARY_MATCHER_LEVELS}
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

export default SetsLogicSummaryMatcher;

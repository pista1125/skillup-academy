import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface EventAlgebraMatcherProps {
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

const EVENT_ALGEBRA_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: "1. szint: Jelölés és jelentés",
    description: "Párosítsd az eseményt a jelentésével!",
    pairs: [
      { id: 'eam1', left: "A + B", right: "legalább az egyik bekövetkezik" },
      { id: 'eam2', left: "A · B", right: "A és B is bekövetkezik" },
      { id: 'eam3', left: "Ā", right: "A nem következik be" },
      { id: 'eam4', left: "A · B̄", right: "A bekövetkezik, B nem" },
      { id: 'eam5', left: "Ā · B̄", right: "egyik sem következik be" },
      { id: 'eam6', left: "Ā + B̄", right: "legalább az egyik nem következik be" },
      { id: 'eam7', left: "A · Ā", right: "a lehetetlen esemény" },
      { id: 'eam8', left: "A + Ā", right: "a biztos esemény" }
    ]
  },
  2: {
    level: 2,
    title: "2. szint: Kockadobás",
    description: "A: páros számot dobunk, B: legalább 4-et dobunk. Párosítsd az eseményt a halmazával!",
    pairs: [
      { id: 'eam9', left: "A · B", right: "{4; 6}" },
      { id: 'eam10', left: "A + B", right: "{2; 4; 5; 6}" },
      { id: 'eam11', left: "A · B̄", right: "{2}" },
      { id: 'eam12', left: "Ā · B", right: "{5}" },
      { id: 'eam13', left: "Ā · B̄", right: "{1; 3}" },
      { id: 'eam14', left: "Ā", right: "{1; 3; 5}" },
      { id: 'eam15', left: "B̄", right: "{1; 2; 3}" },
      { id: 'eam16', left: "Ā + B̄", right: "{1; 2; 3; 5}" }
    ]
  },
  3: {
    level: 3,
    title: "3. szint: Elemszámok",
    description: "Párosítsd a feladatot az eredménnyel!",
    pairs: [
      { id: 'eam17', left: "|A| = 7, |B| = 5, |A · B| = 2: |A + B|", right: "10" },
      { id: 'eam18', left: "három érme: „10 Ft-os írás” + „pontosan egy fej”", right: "5" },
      { id: 'eam19', left: "két kocka: „van hatos” + „összeg legalább 10”", right: "12" },
      { id: 'eam20', left: "|A| = 18, |B| = 15: |A + B| legalább", right: "18" },
      { id: 'eam21', left: "|A| = 18, |B| = 15: |A + B| legfeljebb", right: "33" },
      { id: 'eam22', left: "|H| = 20, |A| = 12, |B| = 16: |A · B| legalább", right: "8" },
      { id: 'eam23', left: "négyzet- vagy köbszámok 1 és 90 között", right: "11" },
      { id: 'eam24', left: "5-tel vagy 7-tel osztható számok 1 és 90 között", right: "28" }
    ]
  }
};

export const EventAlgebraMatcher: React.FC<EventAlgebraMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g12-stat-esemenyalgebra-matcher',
  topicTitle = "6. Események összege és szorzata – Párosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={12}
      chapterId="statisztika-valoszinusegszamitas"
      topicId={topicId}
      subtopicId="esemenyek-osszege-es-szorzata"
      title={topicTitle}
      subtitle="Gyakorold az események összegét, szorzatát, komplementerét és az elemszámokat!"
      levels={EVENT_ALGEBRA_MATCHER_LEVELS}
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

export default EventAlgebraMatcher;

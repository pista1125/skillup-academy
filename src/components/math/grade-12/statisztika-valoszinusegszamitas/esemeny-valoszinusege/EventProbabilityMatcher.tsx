import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface EventProbabilityMatcherProps {
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

const EVENT_PROBABILITY_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: "1. szint: Szabályok",
    description: "Párosítsd a fogalmat a képletével!",
    pairs: [
      { id: 'epm1', left: "klasszikus valószínűség", right: "P(A) = kedvező / összes" },
      { id: 'epm2', left: "komplementer valószínűsége", right: "P(Ā) = 1 − P(A)" },
      { id: 'epm3', left: "kizáró események összege", right: "P(A + B) = P(A) + P(B)" },
      { id: 'epm4', left: "kizáró események szorzata", right: "P(A · B) = 0" },
      { id: 'epm5', left: "független események", right: "P(A · B) = P(A) · P(B)" },
      { id: 'epm6', left: "lehetetlen esemény", right: "P = 0" },
      { id: 'epm7', left: "biztos esemény", right: "P = 1" },
      { id: 'epm8', left: "kedvező elemi esemény", right: "olyan kimenetel, amikor A bekövetkezik" }
    ]
  },
  2: {
    level: 2,
    title: "2. szint: Érmék és kockák",
    description: "Párosítsd az eseményt a valószínűségével!",
    pairs: [
      { id: 'epm9', left: "kocka: páros számot dobunk", right: "1/2" },
      { id: 'epm10', left: "kocka: legalább 5-öt dobunk", right: "1/3" },
      { id: 'epm11', left: "három érme: pontosan egy fej", right: "3/8" },
      { id: 'epm12', left: "három érme: mindhárom azonos", right: "1/4" },
      { id: 'epm13', left: "két kocka: az összeg 7", right: "1/6" },
      { id: 'epm14', left: "két kocka: van hatos", right: "11/36" },
      { id: 'epm15', left: "két kocka: mindkettő hatos", right: "1/36" },
      { id: 'epm16', left: "három érme: 10 Ft-os írás vagy pontosan egy fej", right: "5/8" }
    ]
  },
  3: {
    level: 3,
    title: "3. szint: Tankönyvi feladatok",
    description: "Párosítsd a feladatot az eredménnyel!",
    pairs: [
      { id: 'epm17', left: "háromjegyű szám: egyik jegye sem 5", right: "0,72" },
      { id: 'epm18', left: "háromjegyű szám: legalább egy 5-ös", right: "0,28" },
      { id: 'epm19', left: "háromjegyű szám: pontosan egy 5-ös", right: "0,25" },
      { id: 'epm20', left: "társasjáték: pontosan 6 lépés", right: "1/9" },
      { id: 'epm21', left: "társasjáték: legfeljebb 4 lépés", right: "1/12" },
      { id: 'epm22', left: "társasjáték: 8 vagy 9 lépés", right: "11/36" },
      { id: 'epm23', left: "Cili és Dóri közvetlenül egymás után", right: "2/5" },
      { id: 'epm24', left: "Anna 3. és Bea 4. érkezik", right: "1/20" }
    ]
  }
};

export const EventProbabilityMatcher: React.FC<EventProbabilityMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g12-stat-valoszinuseg-matcher',
  topicTitle = "7. Esemény valószínűsége – Párosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={12}
      chapterId="statisztika-valoszinusegszamitas"
      topicId={topicId}
      subtopicId="esemeny-valoszinusege"
      title={topicTitle}
      subtitle="Gyakorold a klasszikus valószínűség szabályait és a tankönyvi feladatok eredményeit!"
      levels={EVENT_PROBABILITY_MATCHER_LEVELS}
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

export default EventProbabilityMatcher;

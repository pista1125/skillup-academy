import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface NegativeChangesMatcherProps {
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

const NEG_CHANGES_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Melyik a kisebb, melyik a nagyobb?',
    description: 'Gondolj a számegyenesre: jobbra a nagyobb, balra a kisebb!',
    pairs: [
      { id: 'nc3m1', left: 'a −2 és a −6 közül a kisebb', right: '−6' },
      { id: 'nc3m2', left: 'a −5 és a 8 közül a kisebb', right: '−5' },
      { id: 'nc3m3', left: 'a 0 és a −8 közül a nagyobb', right: '0' },
      { id: 'nc3m4', left: 'a −14 és a −13 közül a kisebb', right: '−14' },
      { id: 'nc3m5', left: 'a −1 és a −2 közül a nagyobb', right: '−1' },
      { id: 'nc3m6', left: 'a −20 és a −10 közül a nagyobb', right: '−10' },
      { id: 'nc3m7', left: 'a −89 és a −45 közül a kisebb', right: '−89' },
      { id: 'nc3m8', left: 'a 3 és a −3 közül a nagyobb', right: '3' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Hány fokkal lett hidegebb?',
    description: 'Figyelj: átlépte-e a hőmérséklet a 0-t?',
    pairs: [
      { id: 'nc3m9', left: '−4 °C → −19 °C', right: '15 °C-kal' },
      { id: 'nc3m10', left: '−8 °C → −36 °C', right: '28 °C-kal' },
      { id: 'nc3m11', left: '−1 °C → −21 °C', right: '20 °C-kal' },
      { id: 'nc3m12', left: '−51 °C → −54 °C', right: '3 °C-kal' },
      { id: 'nc3m13', left: '−36 °C → −45 °C', right: '9 °C-kal' },
      { id: 'nc3m14', left: '−19 °C → −45 °C', right: '26 °C-kal' },
      { id: 'nc3m15', left: '3 °C → −3 °C', right: '6 °C-kal' },
      { id: 'nc3m16', left: '0 °C → −5 °C', right: '5 °C-kal' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hogyan változott a vagyon?',
    description: 'Nőtt vagy csökkent? És mennyivel?',
    pairs: [
      { id: 'nc3m17', left: '1500 Ft → 2000 Ft', right: 'nőtt 500 Ft-tal' },
      { id: 'nc3m18', left: '2500 Ft → 1800 Ft', right: 'csökkent 700 Ft-tal' },
      { id: 'nc3m19', left: '500 Ft → −1000 Ft', right: 'csökkent 1500 Ft-tal' },
      { id: 'nc3m20', left: '5500 Ft → −2000 Ft', right: 'csökkent 7500 Ft-tal' },
      { id: 'nc3m21', left: '−1500 Ft → 2000 Ft', right: 'nőtt 3500 Ft-tal' },
      { id: 'nc3m22', left: '−1500 Ft → −5000 Ft', right: 'csökkent 3500 Ft-tal' },
      { id: 'nc3m23', left: '−300 Ft → 0 Ft', right: 'nőtt 300 Ft-tal' },
      { id: 'nc3m24', left: '1000 Ft → −100 Ft', right: 'csökkent 1100 Ft-tal' }
    ]
  }
];

const NEG_CHANGES_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: NEG_CHANGES_MATCHER_LEVELS_LIST[0],
  2: NEG_CHANGES_MATCHER_LEVELS_LIST[1],
  3: NEG_CHANGES_MATCHER_LEVELS_LIST[2]
};

export const NegativeChangesMatcher: React.FC<NegativeChangesMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-neg-valtozasok-matcher',
  topicTitle = '3. Összehasonlítás és változások – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="negativ-szamok"
      topicId={topicId}
      subtopicId="osszehasonlitas-es-valtozasok"
      title={topicTitle}
      subtitle="Párosítsd az összehasonlításokat, a hőmérséklet- és a vagyonváltozásokat!"
      levels={NEG_CHANGES_MATCHER_LEVELS}
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

export default NegativeChangesMatcher;

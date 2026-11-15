import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface StatisticsPracticeMatcherProps {
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

const STATISTICS_PRACTICE_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Mutató ↔ jelentés',
    description: 'Párosítsd a statisztikai mutatót a jelentésével!',
    pairs: [
      { id: 'stpm1', left: 'átlag', right: 'az adatok összege osztva a darabszámmal' },
      { id: 'stpm2', left: 'medián', right: 'a nagyság szerint rendezett adatsor középső eleme' },
      { id: 'stpm3', left: 'módusz', right: 'a legtöbbször előforduló adat' },
      { id: 'stpm4', left: 'terjedelem', right: 'a legnagyobb és a legkisebb adat különbsége' },
      { id: 'stpm5', left: 'alsó kvartilis (Q1)', right: 'az alsó fél mediánja' },
      { id: 'stpm6', left: 'felső kvartilis (Q3)', right: 'a felső fél mediánja' },
      { id: 'stpm7', left: 'félterjedelem', right: 'Q3 − Q1' },
      { id: 'stpm8', left: 'szórás (σ)', right: 'az átlagtól való eltérések négyzetes átlagának gyöke' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Adatsor ↔ Q1; Me; Q3',
    description: 'Határozd meg a kvartiliseket és a mediánt (páratlan elemszámnál a medián kimarad a felekből)!',
    pairs: [
      { id: 'stpm9', left: '1, 2, 3, 3, 4, 5, 5, 6, 6', right: 'Q1 = 2,5; Me = 4; Q3 = 5,5' },
      { id: 'stpm10', left: '1, 2, 3, 3, 4, 5, 5, 6, 6, 7', right: 'Q1 = 3; Me = 4,5; Q3 = 6' },
      { id: 'stpm11', left: '1, 2, 3, 3, 4, 5, 6, 6', right: 'Q1 = 2,5; Me = 3,5; Q3 = 5,5' },
      { id: 'stpm12', left: '1, 2, 3, 3, 4, 5, 5, 6, 6, 7, 8', right: 'Q1 = 3; Me = 5; Q3 = 6' },
      { id: 'stpm13', left: '15, 16, 18, 18, 20, 20, 20, 21, 22', right: 'Q1 = 17; Me = 20; Q3 = 20,5' },
      { id: 'stpm14', left: '2, 4, 4, 4, 5, 5, 7, 9', right: 'Q1 = 4; Me = 4,5; Q3 = 6' },
      { id: 'stpm15', left: '2, 4, 6, 8, 10', right: 'Q1 = 3; Me = 6; Q3 = 9' },
      { id: 'stpm16', left: '1, 2, 3, 4', right: 'Q1 = 1,5; Me = 2,5; Q3 = 3,5' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Adatsor ↔ szórás',
    description: 'Számítsd ki az adatsokaság szórását (két tizedesjegyre kerekítve)!',
    pairs: [
      { id: 'stpm17', left: '1, 3', right: 'σ = 1' },
      { id: 'stpm18', left: '0, 6', right: 'σ = 3' },
      { id: 'stpm19', left: '10, 20', right: 'σ = 5' },
      { id: 'stpm20', left: '5, 5, 5', right: 'σ = 0' },
      { id: 'stpm21', left: '2, 4, 4, 4, 5, 5, 7, 9', right: 'σ = 2' },
      { id: 'stpm22', left: '0, 0, 8, 8', right: 'σ = 4' },
      { id: 'stpm23', left: '1, 2, 3', right: 'σ ≈ 0,82' },
      { id: 'stpm24', left: '2, 4, 6, 8', right: 'σ ≈ 2,24' }
    ]
  }
};

export const StatisticsPracticeMatcher: React.FC<StatisticsPracticeMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-stat-statisztika-gyakorlas-matcher',
  topicTitle = '6. Gyakorlás – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="statisztika-valoszinusegszamitas"
      topicId={topicId}
      subtopicId="gyakorlas-statisztika"
      title={topicTitle}
      subtitle="Párosítsd a statisztikai mutatókat a jelentésükkel, az adatsorokat a kvartiliseikkel és a szórásukkal!"
      levels={STATISTICS_PRACTICE_MATCHER_LEVELS}
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

export default StatisticsPracticeMatcher;

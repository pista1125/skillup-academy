import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface StatMeasuresMatcherProps {
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

const STAT_MEASURES_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Jellemzők és jelentésük',
    description: 'Párosítsd a statisztikai jellemzőt a meghatározásával!',
    pairs: [
      { id: 'smem1', left: 'átlag (x̄)', right: 'az adatok összege osztva az adatok számával' },
      { id: 'smem2', left: 'medián', right: 'a nagyság szerint rendezett adatsor középső eleme' },
      { id: 'smem3', left: 'módusz', right: 'a leggyakrabban előforduló adat' },
      { id: 'smem4', left: 'terjedelem', right: 'a legnagyobb és a legkisebb adat különbsége' },
      { id: 'smem5', left: 'szórásnégyzet (σ²)', right: 'az átlagtól való eltérések négyzeteinek átlaga' },
      { id: 'smem6', left: 'szórás (σ)', right: 'a szórásnégyzet négyzetgyöke' },
      { id: 'smem7', left: 'relatív szórás', right: 'a szórás osztva az átlaggal' },
      { id: 'smem8', left: 'hozam', right: 'hány %-kal változott az árfolyam az előző évhez képest' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Adatsor és szórás',
    description: 'Párosítsd az adatsort a szórásával!',
    pairs: [
      { id: 'smem9', left: '5; 5; 5; 5', right: '0' },
      { id: 'smem10', left: '2; 4; 6; 8', right: '√5 ≈ 2,24' },
      { id: 'smem11', left: '1; 2; 3; 4; 5', right: '√2 ≈ 1,41' },
      { id: 'smem12', left: '0; 10', right: '5' },
      { id: 'smem13', left: '7; 7; 7; 13; 13; 13', right: '3' },
      { id: 'smem14', left: '15%; 12%; 3%; 8%', right: '4,5%' },
      { id: 'smem15', left: '6%; 11%; −2%; 5%', right: '≈ 4,64%' },
      { id: 'smem16', left: '10%; −4%; 12%; 2%', right: '≈ 6,40%' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Feladatok eredménye',
    description: 'Párosítsd a feladatot az eredményével!',
    pairs: [
      { id: 'smem17', left: 'hozam: 7380 Ft → 7011 Ft', right: '−5%' },
      { id: 'smem18', left: 'hozam: 6150 Ft → 7380 Ft', right: '20%' },
      { id: 'smem19', left: 'átlag: 20%; −5%; 15%; 9%', right: '9,75%' },
      { id: 'smem20', left: 'röplabdacsapat átlagmagassága', right: '171,4 cm' },
      { id: 'smem21', left: 'röplabdacsapat magasságainak szórása', right: '≈ 2,15 cm' },
      { id: 'smem22', left: 'relatív szórás: x̄ = 8%, σ = 2%', right: '0,25' },
      { id: 'smem23', left: 'fiúk átlaga: 30 fő, 4,1; 12 lány, 4,5', right: '≈ 3,83' },
      { id: 'smem24', left: 'négyzetösszeg: 5 adat, x̄ = 10, σ² = 4', right: '520' }
    ]
  }
};

export const StatMeasuresMatcher: React.FC<StatMeasuresMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g12-stat-jellemzok-matcher',
  topicTitle = '2. Statisztikai jellemzők – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={12}
      chapterId="statisztika-valoszinusegszamitas"
      topicId={topicId}
      subtopicId="statisztikai-jellemzok"
      title={topicTitle}
      subtitle="Gyakorold a középértékeket, a szórást, a hozamot és a relatív szórást!"
      levels={STAT_MEASURES_MATCHER_LEVELS}
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

export default StatMeasuresMatcher;

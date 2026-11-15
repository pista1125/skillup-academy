import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface DataStatisticsMatcherProps {
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

const MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Fogalom ↔ jelentés',
    description: 'Párosítsd a statisztikai jellemzőt a meghatározásával!',
    pairs: [
      { id: 'dsm1', left: 'átlag', right: 'az adatok összege osztva az adatok számával' },
      { id: 'dsm2', left: 'módusz', right: 'a legtöbbször előforduló adat' },
      { id: 'dsm3', left: 'medián', right: 'a rendezett sor középső adata' },
      { id: 'dsm4', left: 'minimum', right: 'a legkisebb adat' },
      { id: 'dsm5', left: 'maximum', right: 'a legnagyobb adat' },
      { id: 'dsm6', left: 'terjedelem', right: 'a legnagyobb és a legkisebb adat különbsége' },
      { id: 'dsm7', left: 'gyakoriság', right: 'hányszor fordul elő egy adat' },
      { id: 'dsm8', left: 'relatív gyakoriság', right: 'a gyakoriság és az összes adat számának hányadosa' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Adatsokaság ↔ medián',
    description: 'Rendezd sorba gondolatban az adatokat, és párosítsd a mediánnal!',
    pairs: [
      { id: 'dsm9', left: '3; 7; 1; 9; 5', right: '5' },
      { id: 'dsm10', left: '2; 4; 8; 10', right: '6' },
      { id: 'dsm11', left: '10; 15; 18; 18; 18; 20; 20; 24; 32; 55', right: '19' },
      { id: 'dsm12', left: '1; 1; 2; 2; 2; 3; 9', right: '2' },
      { id: 'dsm13', left: '12; 4; 7', right: '7' },
      { id: 'dsm14', left: '4; 4; 5; 6; 7; 9', right: '5,5' },
      { id: 'dsm15', left: '0; 0; 1; 3', right: '0,5' },
      { id: 'dsm16', left: '100; 3; 4; 2; 1', right: '3' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Adatsokaság ↔ átlag',
    description: 'Számítsd ki fejben az átlagot, és párosítsd!',
    pairs: [
      { id: 'dsm17', left: '2; 4; 9', right: '5' },
      { id: 'dsm18', left: '1; 2; 3; 4; 5; 6', right: '3,5' },
      { id: 'dsm19', left: '10; 20; 60', right: '30' },
      { id: 'dsm20', left: '36; 36; 34; 36; 25; 38; 26', right: '33' },
      { id: 'dsm21', left: '27; 29; 34; 31', right: '30,25' },
      { id: 'dsm22', left: '0; 0; 0; 8', right: '2' },
      { id: 'dsm23', left: '3; 3; 3; 3; 18', right: '6' },
      { id: 'dsm24', left: '−6; 0; 9', right: '1' }
    ]
  }
};

export const DataStatisticsMatcher: React.FC<DataStatisticsMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-stat-adatrendezes-matcher',
  topicTitle = '1. Adatrendezés – statisztikai jellemzők – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="statisztika-valoszinusegszamitas"
      topicId={topicId}
      subtopicId="adatrendezes-statisztikai-jellemzok"
      title={topicTitle}
      subtitle="Párosítsd a fogalmakat a jelentésükkel, az adatsokaságokat a mediánjukkal és az átlagukkal!"
      levels={MATCHER_LEVELS}
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

export default DataStatisticsMatcher;

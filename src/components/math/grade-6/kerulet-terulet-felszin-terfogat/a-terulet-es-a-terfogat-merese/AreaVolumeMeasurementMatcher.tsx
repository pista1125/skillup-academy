import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface AreaVolumeMeasurementMatcherProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onBack?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: '1. Szint: Alapvető mértékegység-átváltások',
    subtitle: 'Párosítsd az egyenlő terület- és térfogatmennyiségeket!',
    pairs: [
      { id: 'p1-1', prompt: '1 dm²', value: '100 cm²' },
      { id: 'p1-2', prompt: '1 m²', value: '100 dm²' },
      { id: 'p1-3', prompt: '1 cm²', value: '100 mm²' },
      { id: 'p1-4', prompt: '1 dm³', value: '1 liter' },
      { id: 'p1-5', prompt: '1 dm³ (cm³-ben)', value: '1000 cm³' },
      { id: 'p1-6', prompt: '1 cm³ (ml-ben)', value: '1 ml' },
      { id: 'p1-7', prompt: '1 liter (dl-ben)', value: '10 dl' },
      { id: 'p1-8', prompt: '1 hektoliter (hl)', value: '100 liter' }
    ]
  },
  2: {
    title: '2. Szint: Közepes és mezőgazdasági mértékek',
    subtitle: 'Keresd meg az azonos nagyságú mennyiségeket!',
    pairs: [
      { id: 'p2-1', prompt: '1 ár (a)', value: '100 m²' },
      { id: 'p2-2', prompt: '1 hektár (ha)', value: '10 000 m²' },
      { id: 'p2-3', prompt: '1 m² (cm²-ben)', value: '10 000 cm²' },
      { id: 'p2-4', prompt: '1 m³ (literben)', value: '1000 liter' },
      { id: 'p2-5', prompt: '1 m³ (hl-ben)', value: '10 hl' },
      { id: 'p2-6', prompt: '500 cm²', value: '5 dm²' },
      { id: 'p2-7', prompt: '3000 dm³', value: '3 m³' },
      { id: 'p2-8', prompt: '1 km² (ha-ban)', value: '100 ha' }
    ]
  },
  3: {
    title: '3. Szint: Tizedestörtes és összetett átváltások',
    subtitle: 'Párosítsd a tizedestörtes és összetett átváltásokat!',
    pairs: [
      { id: 'p3-1', prompt: '2,5 m²', value: '250 dm²' },
      { id: 'p3-2', prompt: '0,4 m³', value: '400 liter' },
      { id: 'p3-3', prompt: '0,5 ha', value: '5000 m²' },
      { id: 'p3-4', prompt: '1,5 liter', value: '1500 cm³' },
      { id: 'p3-5', prompt: '7500 mm²', value: '75 cm²' },
      { id: 'p3-6', prompt: '0,25 m²', value: '2500 cm²' },
      { id: 'p3-7', prompt: '0,05 m³', value: '50 dm³' },
      { id: 'p3-8', prompt: '4,5 hl', value: '450 dm³' }
    ]
  }
};

export const AreaVolumeMeasurementMatcher: React.FC<AreaVolumeMeasurementMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onBack,
  topicId = 'g6-area-volume-measurement-matcher',
  topicTitle = 'A terület és a térfogat mérése'
}) => {
  const activeLevel = currentLevel || level;

  return (
    <MatcherTemplate
      title="Terület és térfogat párosító"
      subtitle="Keresd meg az összetartozó területeket, térfogatokat és űrmértékeket 3 szinten!"
      badge="6. OSZTÁLY • V. KERÜLET, TERÜLET, FELSZÍN, TÉRFOGAT"
      themeColor="indigo"
      level={activeLevel}
      currentLevel={activeLevel}
      levels={matcherLevels}
      levelsConfig={matcherLevels}
      config={matcherLevels[activeLevel]}
      levelConfig={matcherLevels[activeLevel]}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onBack={onBack}
      topicId={topicId}
      topicTitle={topicTitle}
      grade={6}
      chapterId="kerulet-terulet-felszin-terfogat"
    />
  );
};

(AreaVolumeMeasurementMatcher as any).matcherLevels = matcherLevels;
(AreaVolumeMeasurementMatcher as any).levels = matcherLevels;

export default AreaVolumeMeasurementMatcher;

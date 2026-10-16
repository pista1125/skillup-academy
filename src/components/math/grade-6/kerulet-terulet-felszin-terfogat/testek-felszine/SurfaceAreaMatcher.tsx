import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SurfaceAreaMatcherProps {
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
    title: '1. Szint: Alapvető kocka- és téglatest-felszínek',
    subtitle: 'Párosítsd a megadott testeket a kiszámított felszínükkel!',
    pairs: [
      { id: 'p1-1', prompt: 'Kocka élhossza a = 2 cm', value: 'A = 24 cm²' },
      { id: 'p1-2', prompt: 'Kocka élhossza a = 3 cm', value: 'A = 54 cm²' },
      { id: 'p1-3', prompt: 'Kocka élhossza a = 5 cm', value: 'A = 150 cm²' },
      { id: 'p1-4', prompt: 'Kocka élhossza a = 10 cm', value: 'A = 600 cm²' },
      { id: 'p1-5', prompt: 'Téglatest élei: 1 × 2 × 3 cm', value: 'A = 22 cm²' },
      { id: 'p1-6', prompt: 'Téglatest élei: 2 × 3 × 4 cm', value: 'A = 52 cm²' },
      { id: 'p1-7', prompt: 'Téglatest élei: 2 × 5 × 10 cm', value: 'A = 160 cm²' },
      { id: 'p1-8', prompt: 'Kocka felszínének képlete', value: 'A = 6 · a²' }
    ]
  },
  2: {
    title: '2. Szint: Él visszaszámolás és négyzetes hasábok',
    subtitle: 'Keresd meg a felszínből visszaszámolt éleket és a hasábok felszínét!',
    pairs: [
      { id: 'p2-1', prompt: 'Kocka A = 96 cm²', value: 'a = 4 cm (96 : 6 = 16)' },
      { id: 'p2-2', prompt: 'Kocka A = 216 cm²', value: 'a = 6 cm (216 : 6 = 36)' },
      { id: 'p2-3', prompt: 'Kocka A = 294 cm²', value: 'a = 7 cm (294 : 6 = 49)' },
      { id: 'p2-4', prompt: 'Kocka A = 384 cm²', value: 'a = 8 cm (384 : 6 = 64)' },
      { id: 'p2-5', prompt: 'Négyzet alapú hasáb: a = 3 cm, m = 10 cm', value: 'A = 138 cm²' },
      { id: 'p2-6', prompt: 'Négyzet alapú hasáb: a = 5 cm, m = 4 cm', value: 'A = 130 cm²' },
      { id: 'p2-7', prompt: 'Téglatest élei: 3 × 4 × 5 cm', value: 'A = 94 cm²' },
      { id: 'p2-8', prompt: 'Téglatest felszínképlete', value: 'A = 2(ab + ac + bc)' }
    ]
  },
  3: {
    title: '3. Szint: Összetett és nyitott testek',
    subtitle: 'Párosítsd a nyitott dobozokat, ragasztott kockákat és hasábokat!',
    pairs: [
      { id: 'p3-1', prompt: 'Nyitott tetejű kocka a = 4 cm (5 lap)', value: 'A = 80 cm² (5 · 16)' },
      { id: 'p3-2', prompt: '2 db a = 2 cm kocka összeragasztva (10 lap)', value: 'A = 40 cm² (10 · 4)' },
      { id: 'p3-3', prompt: '2 db a = 3 cm kocka összeragasztva (10 lap)', value: 'A = 90 cm² (10 · 9)' },
      { id: 'p3-4', prompt: 'Kocka a = 1 dm élekkel (cm²-ben)', value: 'A = 600 cm² (6 · 100)' },
      { id: 'p3-5', prompt: 'Kocka a = 0,5 m élekkel (m²-ben)', value: 'A = 1,5 m² (6 · 0,25)' },
      { id: 'p3-6', prompt: 'Fedél nélküli doboz: 2 × 3 × 4 cm (5 lap)', value: 'A = 46 cm²' },
      { id: 'p3-7', prompt: 'Hasáb: T_alap = 6 cm², K_alap = 12 cm, m = 10 cm', value: 'A = 132 cm² (12 + 120)' },
      { id: 'p3-8', prompt: 'Kocka 1 lapjának területe T_lap = 9 cm²', value: 'A = 54 cm² (6 · 9)' }
    ]
  }
};

export const SurfaceAreaMatcher: React.FC<SurfaceAreaMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onBack,
  topicId = 'g6-surface-area-matcher',
  topicTitle = 'Testek felszíne'
}) => {
  const activeLevel = (currentLevel || level) as DifficultyLevel;

  return (
    <MatcherTemplate
      title="Testek felszíne párosító"
      subtitle="Keresd meg az összetartozó testeket, éleket és felszínértékeket 3 szinten!"
      badge="6. OSZTÁLY • V. KERÜLET, TERÜLET, FELSZÍN, TÉRFOGAT"
      themeColor="amber"
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

(SurfaceAreaMatcher as any).matcherLevels = matcherLevels;
(SurfaceAreaMatcher as any).levels = matcherLevels;

export default SurfaceAreaMatcher;

import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface VolumeMatcherProps {
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
    title: '1. Szint: Kocka és téglatest alapvető térfogata',
    subtitle: 'Párosítsd a testek méreteit a kiszámított térfogatukkal vagy képletükkel!',
    pairs: [
      { id: 'p1-1', prompt: 'Kocka élhossza a = 2 cm', value: 'V = 8 cm³ (2³)' },
      { id: 'p1-2', prompt: 'Kocka élhossza a = 3 cm', value: 'V = 27 cm³ (3³)' },
      { id: 'p1-3', prompt: 'Kocka élhossza a = 4 cm', value: 'V = 64 cm³ (4³)' },
      { id: 'p1-4', prompt: 'Kocka élhossza a = 5 cm', value: 'V = 125 cm³ (5³)' },
      { id: 'p1-5', prompt: 'Téglatest élei: 2 × 3 × 4 cm', value: 'V = 24 cm³' },
      { id: 'p1-6', prompt: 'Téglatest élei: 2 × 5 × 10 cm', value: 'V = 100 cm³' },
      { id: 'p1-7', prompt: 'Kocka térfogatképlete', value: 'V = a³' },
      { id: 'p1-8', prompt: 'Téglatest térfogatképlete', value: 'V = a · b · c' }
    ]
  },
  2: {
    title: '2. Szint: Űrtartalom, literek és él visszaszámolás',
    subtitle: 'Keresd meg az összetartozó litereket, dm³ átváltásokat és éleket!',
    pairs: [
      { id: 'p2-1', prompt: 'Kocka a = 1 dm élekkel', value: 'V = 1 liter (1 dm³)' },
      { id: 'p2-2', prompt: 'Kocka a = 2 dm élekkel', value: 'V = 8 liter (2³ dm³)' },
      { id: 'p2-3', prompt: 'Téglatest: 40 × 25 × 20 cm', value: 'V = 20 liter (20 dm³)' },
      { id: 'p2-4', prompt: 'Akvárium: 50 × 40 × 30 cm', value: 'V = 60 liter (60 dm³)' },
      { id: 'p2-5', prompt: 'Kocka térfogata V = 216 cm³', value: 'Élhossz: a = 6 cm' },
      { id: 'p2-6', prompt: 'Kocka térfogata V = 343 cm³', value: 'Élhossz: a = 7 cm' },
      { id: 'p2-7', prompt: '1 m³ víz űrtartalma', value: '1000 liter' },
      { id: 'p2-8', prompt: '500 cm³ víz deciliterben', value: '5 dl (0,5 liter)' }
    ]
  },
  3: {
    title: '3. Szint: Hiányzó méretek és összetett feladványok',
    subtitle: 'Párosítsd a hiányzó éleket, skálázási hatásokat és összetett feladatokat!',
    pairs: [
      { id: 'p3-1', prompt: 'Téglatest: V = 60 cm³, a = 3, b = 4 cm', value: 'Magasság: c = 5 cm' },
      { id: 'p3-2', prompt: 'Téglatest: V = 120 cm³, T_alap = 24 cm²', value: 'Magasság: m = 5 cm' },
      { id: 'p3-3', prompt: 'Kocka éle 3-szorosára nő (3×)', value: 'Térfogata 27-szeresre nő (3³)' },
      { id: 'p3-4', prompt: 'Kocka éle 2-szeresére nő (2×)', value: 'Térfogata 8-szorosára nő (2³)' },
      { id: 'p3-5', prompt: 'Medence: 5 × 10 m, mélység 2 m', value: '100 m³ = 100 000 liter' },
      { id: 'p3-6', prompt: '60 literes akvárium félig töltve', value: '30 liter víz' },
      { id: 'p3-7', prompt: 'T_alap = 200 cm², vízszintemelkedés 2 cm', value: 'V_test = 400 cm³' },
      { id: 'p3-8', prompt: '2 db a = 2 cm élű kocka összeragasztva', value: 'V = 16 cm³ (2 · 8)' }
    ]
  }
};

export const VolumeMatcher: React.FC<VolumeMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onBack,
  topicId = 'g6-volume-matcher',
  topicTitle = 'Testek térfogata'
}) => {
  const activeLevel = (currentLevel || level) as DifficultyLevel;

  return (
    <MatcherTemplate
      title="Testek térfogata párosító"
      subtitle="Keresd meg az összetartozó éleket, térfogatokat és litereket 3 szinten!"
      badge="6. OSZTÁLY • V. KERÜLET, TERÜLET, FELSZÍN, TÉRFOGAT"
      themeColor="teal"
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

(VolumeMatcher as any).matcherLevels = matcherLevels;
(VolumeMatcher as any).levels = matcherLevels;

export default VolumeMatcher;

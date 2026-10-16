import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface Chapter5SummaryMatcherProps {
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
    title: '1. Szint: A fejezet 8 alapkészlet-képlete',
    subtitle: 'Párosítsd a geometriai fogalmakat a pontos matematikai képletükkel!',
    pairs: [
      { id: 'p1-1', prompt: 'Téglalap kerülete', value: 'K = 2 · (a + b)' },
      { id: 'p1-2', prompt: 'Téglalap területe', value: 'T = a · b' },
      { id: 'p1-3', prompt: 'Derékszögű háromszög területe', value: 'T = (a · b) / 2' },
      { id: 'p1-4', prompt: 'Kocka teljes felszíne', value: 'A = 6 · a²' },
      { id: 'p1-5', prompt: 'Téglatest teljes felszíne', value: 'A = 2(ab + bc + ac)' },
      { id: 'p1-6', prompt: 'Kocka térfogata', value: 'V = a³' },
      { id: 'p1-7', prompt: 'Téglatest térfogata', value: 'V = a · b · c' },
      { id: 'p1-8', prompt: 'Euler-féle poliédertétel', value: 'C + L = É + 2' }
    ]
  },
  2: {
    title: '2. Szint: Mértékegység átváltások és alapegyenlőségek',
    subtitle: 'Keresd meg az összetartozó mértékegységeket és átváltási értékeket!',
    pairs: [
      { id: 'p2-1', prompt: '1 dm² területe cm²-ben', value: '100 cm²' },
      { id: 'p2-2', prompt: '1 dm³ térfogata literben', value: '1 liter' },
      { id: 'p2-3', prompt: '1 m³ térfogata literben', value: '1000 liter' },
      { id: 'p2-4', prompt: '1 hektár (ha) m²-ben', value: '10 000 m² (100 ár)' },
      { id: 'p2-5', prompt: '1 tonna tömege kg-ban', value: '1000 kg' },
      { id: 'p2-6', prompt: '1 nap időtartama percekben', value: '1440 perc (24 · 60)' },
      { id: 'p2-7', prompt: '1 cm³ űrtartalma milliliterben', value: '1 ml' },
      { id: 'p2-8', prompt: '1 km hossza méterben', value: '1000 m' }
    ]
  },
  3: {
    title: '3. Szint: Témazáró próbaszámítások',
    subtitle: 'Párosítsd a feladatok adatait a helyes számítási végeredménnyel!',
    pairs: [
      { id: 'p3-1', prompt: 'Kocka a = 4 cm (A és V)', value: 'A = 96 cm², V = 64 cm³' },
      { id: 'p3-2', prompt: 'Téglatest: 2 × 3 × 4 cm (A és V)', value: 'A = 52 cm², V = 24 cm³' },
      { id: 'p3-3', prompt: 'Derékszögű háromszög: a = 6, b = 8 cm', value: 'T = 24 cm² (6 · 8 / 2)' },
      { id: 'p3-4', prompt: 'Fedél nélküli kocka a = 3 cm (5 lap)', value: 'A = 45 cm² (5 · 9)' },
      { id: 'p3-5', prompt: 'Szobafalak: 4 × 5 m, belmagasság 3 m', value: '54 m² [2(4+5) · 3]' },
      { id: 'p3-6', prompt: 'Kocka V = 125 cm³ élhossza', value: 'a = 5 cm' },
      { id: 'p3-7', prompt: '60 literes akvárium tele vízzel', value: '60 dm³ = 60 000 cm³' },
      { id: 'p3-8', prompt: 'Kocka éle megduplázódik (2×)', value: 'Felszín: 4×, Térfogat: 8×' }
    ]
  }
};

export const Chapter5SummaryMatcher: React.FC<Chapter5SummaryMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onBack,
  topicId = 'g6-chapter5-summary-matcher',
  topicTitle = 'Összefoglalás'
}) => {
  const activeLevel = (currentLevel || level) as DifficultyLevel;

  return (
    <MatcherTemplate
      title="Összefoglaló párosító"
      subtitle="Keresd meg az V. fejezet összetartozó képleteit, átváltásait és mintafeladatait 3 szinten!"
      badge="6. OSZTÁLY • V. KERÜLET, TERÜLET, FELSZÍN, TÉRFOGAT"
      themeColor="slate"
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

(Chapter5SummaryMatcher as any).matcherLevels = matcherLevels;
(Chapter5SummaryMatcher as any).levels = matcherLevels;

export default Chapter5SummaryMatcher;

import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PracticalSurfaceAreaMatcherProps {
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
    title: '1. Szint: Alapvető gyakorlati testfelületek',
    subtitle: 'Párosítsd a hétköznapi testeket és felületeket a helyes számítással vagy képlettel!',
    pairs: [
      { id: 'p1-1', prompt: 'Felül nyitott kockaláda a = 1 m (5 lap)', value: 'A = 5 m² (5 · 1)' },
      { id: 'p1-2', prompt: 'Zárt kockadoboz a = 1 m (6 lap)', value: 'A = 6 m² (6 · 1)' },
      { id: 'p1-3', prompt: 'Szobafalak: 4 × 5 m, m = 3 m (4 fal)', value: 'A = 54 m² [2(4+5) · 3]' },
      { id: 'p1-4', prompt: 'Szobafalak: 3 × 4 m, m = 2,5 m (4 fal)', value: 'A = 35 m² [2(3+4) · 2,5]' },
      { id: 'p1-5', prompt: 'Üvegakvárium: 50 × 30 × 30 cm (5 lap)', value: 'A = 63 dm² (6300 cm²)' },
      { id: 'p1-6', prompt: 'Nyitott doboz képlete (5 lap)', value: 'A = ab + 2ac + 2bc' },
      { id: 'p1-7', prompt: 'Szobafalak palástképlete (4 fal)', value: 'T_falak = 2(a + b) · m' },
      { id: 'p1-8', prompt: 'Mennyezet területe', value: 'T_mennyezet = a · b' }
    ]
  },
  2: {
    title: '2. Szint: Szobafestés és burkolás számítások',
    subtitle: 'Keresd meg a levonásokkal, mennyezettel és rétegekkel kiszámított értékeket!',
    pairs: [
      { id: 'p2-1', prompt: 'Falak 54 m², nyílászárók 4 m²', value: 'Nettó falak: 50 m²' },
      { id: 'p2-2', prompt: 'Falak 50 m² + mennyezet 20 m²', value: 'Festendő felület: 70 m²' },
      { id: 'p2-3', prompt: 'Falak 35 m², ablak és ajtó 5 m²', value: 'Nettó falak: 30 m²' },
      { id: 'p2-4', prompt: 'Medence: 4 × 6 m, mélység 1,5 m (5 lap)', value: 'Burkolat: 54 m² (24 + 30)' },
      { id: 'p2-5', prompt: '10 m² falburkolás 20 × 20 cm-es csempével', value: '250 db csempe (10 : 0,04)' },
      { id: 'p2-6', prompt: 'Csempevásárlás 50 m²-re 10% ráhagyással', value: 'Vásárolandó: 55 m² (50 · 1,1)' },
      { id: 'p2-7', prompt: '40 m² festés 10 m²/l kiadóssággal (1 réteg)', value: '4 liter festék' },
      { id: 'p2-8', prompt: '60 m² festés 10 m²/l kiadóssággal (2 réteg)', value: '12 liter festék (120 : 10)' }
    ]
  },
  3: {
    title: '3. Szint: Anyagvásárlás és összetett kalkulációk',
    subtitle: 'Párosítsd az anyagszükségletet a megvásárolandó dobozokkal és csomagolási ráhagyásokkal!',
    pairs: [
      { id: 'p3-1', prompt: 'Festékszükséglet 14 liter (5 literes vödrökben)', value: '3 db vödör (15 l)' },
      { id: 'p3-2', prompt: 'Festékszükséglet 7,5 liter (2,5 literes dobozban)', value: '3 db doboz (7,5 l)' },
      { id: 'p3-3', prompt: 'Csomagolópapír 0,5 m² dobozra 20% ráhagyással', value: '0,6 m² papír (0,5 · 1,2)' },
      { id: 'p3-4', prompt: 'Nyitott láda a = 2 m külső-belső festése (10 lap)', value: 'A = 40 m² (10 · 4)' },
      { id: 'p3-5', prompt: '3 × 4 × 2,5 m szoba, 5 m² nyílászáró + mennyezet', value: 'A = 42 m² (30 + 12)' },
      { id: 'p3-6', prompt: 'Kerti tó medre: 2 × 3 m, mélysége 1 m fóliázása', value: '16 m² fólia (6 + 10)' },
      { id: 'p3-7', prompt: '20 m² fal tapétázása (5 m²/tekercs)', value: '4 tekercs tapéta' },
      { id: 'p3-8', prompt: 'Doboz élei: 10 × 15 × 20 cm teljes felszíne', value: 'A = 13 dm² (1300 cm²)' }
    ]
  }
};

export const PracticalSurfaceAreaMatcher: React.FC<PracticalSurfaceAreaMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onBack,
  topicId = 'g6-practical-surface-matcher',
  topicTitle = 'Felszínszámítási gyakorlati feladatok'
}) => {
  const activeLevel = (currentLevel || level) as DifficultyLevel;

  return (
    <MatcherTemplate
      title="Gyakorlati felszínszámítás párosító"
      subtitle="Keresd meg a szobaméretekhez, akváriumokhoz és dobozokhoz tartozó pontos felületeket és anyagszükségleteket 3 szinten!"
      badge="6. OSZTÁLY • V. KERÜLET, TERÜLET, FELSZÍN, TÉRFOGAT"
      themeColor="rose"
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

(PracticalSurfaceAreaMatcher as any).matcherLevels = matcherLevels;
(PracticalSurfaceAreaMatcher as any).levels = matcherLevels;

export default PracticalSurfaceAreaMatcher;

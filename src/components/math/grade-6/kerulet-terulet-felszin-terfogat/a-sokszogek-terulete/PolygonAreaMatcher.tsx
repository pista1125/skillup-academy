import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PolygonAreaMatcherProps {
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
    title: '1. Szint: Alapképletek és Egyszerű Számítások',
    subtitle: 'Párosítsd a síkidomokat és képleteket a kiszámított területeikkel!',
    pairs: [
      { id: 'p1-1', prompt: 'a = 5 cm négyzet területe', value: '25 cm²' },
      { id: 'p1-2', prompt: 'a = 7 cm, b = 4 cm téglalap', value: '28 cm²' },
      { id: 'p1-3', prompt: 'a = 6 cm, b = 8 cm derékszögű △', value: '24 cm²' },
      { id: 'p1-4', prompt: 'Négyzet területképlete', value: 'T = a · a = a²' },
      { id: 'p1-5', prompt: 'Téglalap területképlete', value: 'T = a · b' },
      { id: 'p1-6', prompt: 'Derékszögű △ területképlete', value: 'T = (a · b) : 2' },
      { id: 'p1-7', prompt: 'T = 36 cm² négyzet oldala', value: 'a = 6 cm' },
      { id: 'p1-8', prompt: 'T = 45 cm², a = 9 cm téglalap b oldala', value: 'b = 5 cm' }
    ]
  },
  2: {
    title: '2. Szint: Háromszögek és Paralelogrammák',
    subtitle: 'Keresd meg az alap- és magasságadatokhoz tartozó pontos területeket!',
    pairs: [
      { id: 'p2-1', prompt: 'a = 10 cm, mₐ = 6 cm háromszög', value: '30 cm²' },
      { id: 'p2-2', prompt: 'a = 8 cm, mₐ = 5 cm paralelogramma', value: '40 cm²' },
      { id: 'p2-3', prompt: 'Általános △ területképlete', value: 'T = (a · mₐ) : 2' },
      { id: 'p2-4', prompt: 'Paralelogramma területképlete', value: 'T = a · mₐ' },
      { id: 'p2-5', prompt: 'e = 8 cm, f = 6 cm rombusz', value: '24 cm²' },
      { id: 'p2-6', prompt: 'a = 4 dm, b = 30 cm téglalap', value: '12 dm² (1200 cm²)' },
      { id: 'p2-7', prompt: 'a = 7 cm, mₐ = 4 cm háromszög', value: '14 cm²' },
      { id: 'p2-8', prompt: 'T = 28 cm², a = 7 cm △ magassága', value: 'mₐ = 8 cm' }
    ]
  },
  3: {
    title: '3. Szint: Trapéz, Deltoid és Összetett Területek',
    subtitle: 'Párosítsd a trapézok, deltoidok és összetett alakzatok területeit!',
    pairs: [
      { id: 'p3-1', prompt: 'a = 8 cm, c = 4 cm, m = 5 cm trapéz', value: '30 cm²' },
      { id: 'p3-2', prompt: 'e = 10 cm, f = 7 cm deltoid', value: '35 cm²' },
      { id: 'p3-3', prompt: 'Trapéz területképlete', value: 'T = [(a + c) · m] : 2' },
      { id: 'p3-4', prompt: 'Deltoid területképlete', value: 'T = (e · f) : 2' },
      { id: 'p3-5', prompt: 'a = 12 cm, c = 6 cm, m = 4 cm trapéz', value: '36 cm²' },
      { id: 'p3-6', prompt: '10×10 cm négyzetből kivágott 4×4 sarok', value: '84 cm²' },
      { id: 'p3-7', prompt: 'e = 12 cm, f = 5 cm deltoid', value: '30 cm²' },
      { id: 'p3-8', prompt: 'T = 45 cm², m = 5 cm paralelogramma alapja', value: 'a = 9 cm' }
    ]
  }
};

export const PolygonAreaMatcher: React.FC<PolygonAreaMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onBack,
  topicId = 'g6-polygon-area-matcher',
  topicTitle = 'A sokszögek területe'
}) => {
  const activeLevel = (currentLevel || level) as DifficultyLevel;

  return (
    <MatcherTemplate
      title="Sokszögek területe párosító"
      subtitle="Párosítsd a síkidomokat, területképleteket és számított értékeket 3 szinten!"
      badge="6. OSZTÁLY • V. KERÜLET, TERÜLET, FELSZÍN, TÉRFOGAT"
      themeColor="emerald"
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

(PolygonAreaMatcher as any).matcherLevels = matcherLevels;
(PolygonAreaMatcher as any).levels = matcherLevels;

export default PolygonAreaMatcher;

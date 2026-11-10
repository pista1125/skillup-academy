import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface GeometryProblemsMatcherProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: 'Geometriai szöveges feladatok algebrai modellje',
    subtitle: 'Párosítsd a geometriai feladványokat a hozzájuk tartozó másodfokú egyenlettel!',
    pairs: [
      { id: 'gm1-1', left: 'Téglalap kerülete 40 cm, területe 96 cm²', right: 'x · (20 - x) = 96' },
      { id: 'gm1-2', left: 'Téglalap egyik oldala 3 cm-rel hosszabb a másiknál, területe 70 cm²', right: 'x · (x + 3) = 70' },
      { id: 'gm1-3', left: 'Derékszögű háromszög befogói x és x + 2, átfogója 10 cm', right: 'x² + (x + 2)² = 100' },
      { id: 'gm1-4', left: 'Konvex sokszög összes átlójának száma 20 db', right: 'n · (n - 3) / 2 = 20' },
      { id: 'gm1-5', left: '10×6 m-es medence körül x széles járda, külső terület 140 m²', right: '(10 + 2x)(6 + 2x) = 140' },
      { id: 'gm1-6', left: 'Derékszögű háromszög átfogója 4 cm-rel hosszabb a befogónál (másik befogó 12 cm)', right: 'x² + 12² = (x + 4)²' },
      { id: 'gm1-7', left: 'Téglalap átlója 25 cm, egyik oldala 17 cm-rel hosszabb a másiknál', right: 'x² + (x + 17)² = 625' },
      { id: 'gm1-8', left: 'Konvex sokszög átlóinak száma 54 db', right: 'n² - 3n - 108 = 0' }
    ]
  },
  2: {
    title: 'Geometriai feladványok és a kiszámított méretek',
    subtitle: 'Párosítsd a feladatokat a pontos számszerű geometriai megoldásukkal!',
    pairs: [
      { id: 'gm2-1', left: 'Kerület 28 cm, terület 48 cm² téglalap', right: 'Oldalai: 6 cm és 8 cm' },
      { id: 'gm2-2', left: 'Befogók különbsége 7 cm, átfogója 13 cm háromszög', right: 'Befogók: 5 cm és 12 cm' },
      { id: 'gm2-3', left: '35 átlóval rendelkező konvex sokszög', right: '10 oldalú sokszög (tízszög)' },
      { id: 'gm2-4', left: 'Oldalarány 2:3, terület 54 cm² téglalap', right: 'Oldalai: 6 cm és 9 cm' },
      { id: 'gm2-5', left: 'Befogók összege 17 cm, átfogó 13 cm derékszögű háromszög', right: 'Befogók: 5 cm és 12 cm' },
      { id: 'gm2-6', left: '14 darab átlóval bíró konvex sokszög', right: '7 oldalú sokszög (hétszög)' },
      { id: 'gm2-7', left: 'Oldalkülönbség 4 cm, átlója 20 cm téglalap', right: 'Oldalai: 12 cm és 16 cm' },
      { id: 'gm2-8', left: '9 darab átlóval bíró konvex sokszög', right: '6 oldalú sokszög (hatszög)' }
    ]
  },
  3: {
    title: 'Algebrai gyökök és a geometriai szűrés',
    subtitle: 'Párosítsd az egyenlet matematikai gyökeit a helyes geometriai következtetéssel!',
    pairs: [
      { id: 'gm3-1', left: 'Téglalap oldala egyenletből: x₁ = 7, x₂ = -15', right: 'Csak az x = 7 cm fogadható el, szakasz nem lehet negatív' },
      { id: 'gm3-2', left: 'Sokszög oldalszáma: n₁ = 9, n₂ = -6', right: 'Csak a 9 oldalú sokszög létezik, oldalszám pozitív egész' },
      { id: 'gm3-3', left: 'Félkerület felbontás: x₁ = 6, x₂ = 10', right: 'Mindkét gyök valós méret: a téglalap két oldala 6 cm és 10 cm' },
      { id: 'gm3-4', left: 'Ösvény szélessége: x₁ = 1,5 m, x₂ = -8 m', right: 'Csak az 1,5 m reális járdaszélesség a kert körül' },
      { id: 'gm3-5', left: 'Derékszögű háromszög befogója: x₁ = 8, x₂ = -20', right: 'Csak az x = 8 cm a valós befogóhossz' },
      { id: 'gm3-6', left: 'Kivágandó saroknégyzet (10×10 cm lapból): x₁ = 2, x₂ = 14', right: 'Csak x = 2 cm jó, a 14 cm-es sarok nagyobb a teljes lapnál' },
      { id: 'gm3-7', left: 'Átlószám egyenlet gyökei: n₁ = 8,3, n₂ = -5,3', right: 'Nincs ilyen sokszög, az oldalszámnak egésznek kell lennie' },
      { id: 'gm3-8', left: 'Téglalap oldalhosszúsága: x₁ = 12, x₂ = -5', right: 'Csak a pozitív 12 cm hosszúság fogadható el' }
    ]
  }
};

export const GeometryProblemsMatcher: React.FC<GeometryProblemsMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g10-quad-szoveges-geometria',
  topicTitle = 'Szöveges feladatok geometriából'
}) => {
  const activeLevel = currentLevel || level;

  return (
    <MatcherTemplate
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      topicId={topicId}
      topicTitle={topicTitle}
      levelConfigs={matcherLevels}
    />
  );
};


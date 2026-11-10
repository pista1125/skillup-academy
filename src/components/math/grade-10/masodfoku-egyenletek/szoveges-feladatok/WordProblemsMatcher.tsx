import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface WordProblemsMatcherProps {
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
    title: 'Szöveges feltételek lefordítása algebrai egyenletté',
    subtitle: 'Párosítsd a szöveges állításokat a pontos matematikai modelljükkel!',
    pairs: [
      { id: 'm1-1', left: 'Két szomszédos egész szám szorzata 72', right: 'x · (x + 1) = 72' },
      { id: 'm1-2', left: 'Két szomszédos páros szám szorzata 80', right: 'x · (x + 2) = 80' },
      { id: 'm1-3', left: 'Egy szám és reciprokának összege 2,9', right: 'x + 1/x = 2,9' },
      { id: 'm1-4', left: 'Egy szám négyzete 30-cal nagyobb a számnál', right: 'x² - x = 30' },
      { id: 'm1-5', left: 'Két szomszédos egész szám négyzetösszege 41', right: 'x² + (x + 1)² = 41' },
      { id: 'm1-6', left: 'Két szám különbsége 5, szorzatuk 84', right: 'x · (x + 5) = 84' },
      { id: 'm1-7', left: 'Téglalap területe 60 cm², egyik oldala 4 cm-rel hosszabb', right: 'x · (x + 4) = 60' },
      { id: 'm1-8', left: '120 000 Ft-ot x fő oszt szét, 3 fő kiesésével 2000 Ft-tal nő a díj', right: '120000/(x - 3) - 120000/x = 2000' }
    ]
  },
  2: {
    title: 'Szöveges feladványok és a végső válaszok',
    subtitle: 'Párosítsd a feladványokat a helyesen kiszámított számszerű megoldásukkal!',
    pairs: [
      { id: 'm2-1', left: 'Melyik két pozitív egész szám szorzata 56?', right: 'A 7 és a 8' },
      { id: 'm2-2', left: 'Egy pozitív szám és reciprokának összege 2,5. Mi a szám?', right: 'A 2 (vagy az 1/2)' },
      { id: 'm2-3', left: 'Két szomszédos pozitív páratlan szám szorzata 63. Melyek ezek?', right: 'A 7 és a 9' },
      { id: 'm2-4', left: 'Téglalap területe 40 cm², egyik oldala 3 cm-rel hosszabb. Rövidebb oldal?', right: '5 cm (az x = -8 kiesik)' },
      { id: 'm2-5', left: 'Pozitív szám, melynek négyzete 12-vel nagyobb magánál a számnál?', right: 'A 4 (mivel 4² - 4 = 12)' },
      { id: 'm2-6', left: 'Két szám összege 15, szorzatuk 54. Melyik ez a két szám?', right: 'A 6 és a 9' },
      { id: 'm2-7', left: '60 000 Ft-ot x fő oszt szét, 2 lemondta, +1500 Ft díj. Hányan mentek el végül?', right: '8 fő (eredetileg 10 indult volna)' },
      { id: 'm2-8', left: 'Két szomszédos egész szám négyzetösszege 25. Számpárok?', right: '(3; 4) és (-4; -3)' }
    ]
  },
  3: {
    title: 'Megoldóképlet gyökei és a szöveges szűrés',
    subtitle: 'Párosítsd a képlet által adott gyököket a feladat szövege szerinti helyes értelmezéssel!',
    pairs: [
      { id: 'm3-1', left: 'Életkor feladat: x₁ = 16, x₂ = -12', right: 'Csak a 16 év reális, negatív életkor nem létezik' },
      { id: 'm3-2', left: 'Téglalap oldala: x₁ = 9, x₂ = -4', right: 'Csak a 9 cm fogadható el, hosszúság mindig pozitív' },
      { id: 'm3-3', left: 'Tetszőleges egész számok szorzata: x₁ = 6, x₂ = -7', right: 'Mindkét számpár jó: (6; 7) és (-7; -6)' },
      { id: 'm3-4', left: 'Létszám (fő) feladat: x₁ = 25, x₂ = -20', right: 'Csak a 25 fő reális válasz emberlétszámra' },
      { id: 'm3-5', left: 'Fizetendő díj: x₁ = 4500, x₂ = -3000', right: 'Csak a 4500 Ft a valós fejenkénti költség' },
      { id: 'm3-6', left: 'Pozitív páratlan szám: x₁ = 11, x₂ = -13', right: 'Csak a 11 pozitív páratlan szám felel meg' },
      { id: 'm3-7', left: 'Időtartam (óra): x₁ = 3, x₂ = -5', right: 'Csak a 3 óra értelmezhető fizikailag' },
      { id: 'm3-8', left: 'Valós számok szorzata: x₁ = 2,5, x₂ = -8', right: 'Valós számoknál mindkét gyök érvényes' }
    ]
  }
};

export const WordProblemsMatcher: React.FC<WordProblemsMatcherProps> = ({
  level,
  currentLevel = 1,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'szoveges-feladatok',
  topicTitle = 'Szöveges feladatok'
}) => {
  const activeLevel = level || currentLevel;

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

export default WordProblemsMatcher;


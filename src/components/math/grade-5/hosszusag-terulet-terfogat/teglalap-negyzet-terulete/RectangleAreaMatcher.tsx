import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface RectangleAreaMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const RectangleAreaMatcher: React.FC<RectangleAreaMatcherProps> = ({
  onBack,
  onSwitchToTheory,
  level,
  onNextLevel,
  onOpenRules
}) => {
  const safeLevel: DifficultyLevel = (typeof level === 'number' ? level : ((level as any)?.level ?? 1)) as DifficultyLevel;
  const [currentLevel, setCurrentLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof level === 'number' ? level : ((level as any)?.level ?? 1)) as DifficultyLevel;
    setCurrentLevel(nextLevel);
  }, [level]);

  const levels: Record<DifficultyLevel, MatcherLevelConfig> = {
    // ========================================================
    // 1. SZINT: ALAPVETŐ OLDAL- ÉS TERÜLETSZÁMÍTÁSOK
    // ========================================================
    1: {
      title: '1. Szint: Alapvető oldal- és területszámítások',
      subtitle: 'Párosítsd a megadott oldalakat a helyes területtel!',
      pairs: [
        {
          id: 'p1-1',
          prompt: 'a = 5 cm, b = 3 cm téglalap',
          value: '15 cm²'
        },
        {
          id: 'p1-2',
          prompt: 'a = 6 cm oldalú négyzet',
          value: '36 cm²'
        },
        {
          id: 'p1-3',
          prompt: 'a = 8 dm, b = 2 dm téglalap',
          value: '16 dm²'
        },
        {
          id: 'p1-4',
          prompt: 'a = 9 m oldalú négyzet',
          value: '81 m²'
        },
        {
          id: 'p1-5',
          prompt: 'a = 10 cm, b = 7 cm téglalap',
          value: '70 cm²'
        },
        {
          id: 'p1-6',
          prompt: 'a = 4 dm oldalú négyzet',
          value: '16 dm²'
        },
        {
          id: 'p1-7',
          prompt: 'a = 12 m, b = 5 m téglalap',
          value: '60 m²'
        },
        {
          id: 'p1-8',
          prompt: 'a = 1 m oldalú négyzet',
          value: '1 m² (100 dm²)'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: HIÁNYZÓ OLDAL KERESÉSE ÉS MÉRTÉKEGYSÉG-VÁLTÁS
    // ========================================================
    2: {
      title: '2. Szint: Hiányzó oldal keresése és átváltások',
      subtitle: 'Számold ki a hiányzó oldalhosszt vagy egyeztess mértékegységet!',
      pairs: [
        {
          id: 'p2-1',
          prompt: 'T = 48 cm², b = 6 cm téglalap oldala',
          value: 'a = 8 cm'
        },
        {
          id: 'p2-2',
          prompt: 'T = 64 cm² négyzet oldala',
          value: 'a = 8 cm'
        },
        {
          id: 'p2-3',
          prompt: 'T = 35 m², a = 7 m téglalap oldala',
          value: 'b = 5 m'
        },
        {
          id: 'p2-4',
          prompt: 'T = 100 dm² négyzet oldala',
          value: 'a = 10 dm (1 m)'
        },
        {
          id: 'p2-5',
          prompt: 'a = 2 m, b = 50 cm téglalap területe',
          value: '1 m² (10 000 cm²)'
        },
        {
          id: 'p2-6',
          prompt: 'a = 3 dm, b = 40 cm téglalap területe',
          value: '12 dm² (1200 cm²)'
        },
        {
          id: 'p2-7',
          prompt: 'T = 72 m², b = 8 m téglalap oldala',
          value: 'a = 9 m'
        },
        {
          id: 'p2-8',
          prompt: 'T = 25 m² négyzet kerülete',
          value: 'K = 20 m (oldala 5 m)'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: ÖSSZETETT ÉS MINDENNAPI TERÜLETI FELADATOK
    // ========================================================
    3: {
      title: '3. Szint: Összetett és mindennapi feladatok',
      subtitle: 'Párosítsd a szöveges és burkolási feladatokat az eredményekkel!',
      pairs: [
        {
          id: 'p3-1',
          prompt: 'a = 20 m, b = 15 m telek területe',
          value: '300 m² (3 ár)'
        },
        {
          id: 'p3-2',
          prompt: '5 m × 4 m szoba 1 dm²-es járólapokkal',
          value: '2000 db lap'
        },
        {
          id: 'p3-3',
          prompt: 'K = 24 cm kerületű négyzet területe',
          value: 'T = 36 cm² (oldala 6 cm)'
        },
        {
          id: 'p3-4',
          prompt: 'K = 26 cm, a = 8 cm téglalap területe',
          value: 'T = 40 cm² (b = 5 cm)'
        },
        {
          id: 'p3-5',
          prompt: 'T = 1 ha négyzet alakú szántóföld oldala',
          value: 'a = 100 m'
        },
        {
          id: 'p3-6',
          prompt: 'a = 50 m, b = 20 m telek területe árban',
          value: '10 ár (1000 m²)'
        },
        {
          id: 'p3-7',
          prompt: 'Két 3 cm × 6 cm téglalap összeillesztve',
          value: '36 cm²'
        },
        {
          id: 'p3-8',
          prompt: 'T = 144 cm² négyzet oldala',
          value: 'a = 12 cm'
        }
      ]
    }
  };

  return (
    <MatcherTemplate
      title="Téglalap és Négyzet Terület Párosító"
      subtitle="Keresd meg az oldalakhoz, területekhez és feladatokhoz tartozó helyes párokat!"
      levels={levels}
      currentLevel={currentLevel}
      onLevelChange={setCurrentLevel}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
};

import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface AreaMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const AreaMatcher: React.FC<AreaMatcherProps> = ({
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
    // 1. SZINT: ALAPVETŐ MÉRTÉKEGYSÉGEK ÉS VÁLTÓSZÁMOK
    // ========================================================
    1: {
      title: '1. Szint: Alapvető mértékegységek és szomszédos váltószámok',
      subtitle: 'Párosítsd a területegységeket az egyenlő értékekkel!',
      pairs: [
        {
          id: 'p1-1',
          prompt: '1 cm² milliméterben',
          value: '100 mm²'
        },
        {
          id: 'p1-2',
          prompt: '1 dm² centiméterben',
          value: '100 cm²'
        },
        {
          id: 'p1-3',
          prompt: '1 m² deciméterben',
          value: '100 dm²'
        },
        {
          id: 'p1-4',
          prompt: '1 a (ár) négyzetméterben',
          value: '100 m²'
        },
        {
          id: 'p1-5',
          prompt: '1 ha (hektár) árban',
          value: '100 a'
        },
        {
          id: 'p1-6',
          prompt: '1 km² hektárban',
          value: '100 ha'
        },
        {
          id: 'p1-7',
          prompt: '1 m² centiméterben (2 lépcsőfok)',
          value: '10 000 cm²'
        },
        {
          id: 'p1-8',
          prompt: '1 ha négyzetméterben (2 lépcsőfok)',
          value: '10 000 m²'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: TÖBBLÉPCSŐS ÁTVÁLTÁSOK ÉS SZÁMÍTÁSOK
    // ========================================================
    2: {
      title: '2. Szint: Gyakorlati átváltások és számítások',
      subtitle: 'Alkalmazd a 100-as és 10 000-es váltószámokat a feladatoknál!',
      pairs: [
        {
          id: 'p2-1',
          prompt: '4 m² deciméterben',
          value: '400 dm²'
        },
        {
          id: 'p2-2',
          prompt: '600 cm² deciméterben',
          value: '6 dm²'
        },
        {
          id: 'p2-3',
          prompt: '3 a négyzetméterben',
          value: '300 m²'
        },
        {
          id: 'p2-4',
          prompt: '5 ha négyzetméterben',
          value: '50 000 m²'
        },
        {
          id: 'p2-5',
          prompt: '70 000 m² hektárban',
          value: '7 ha'
        },
        {
          id: 'p2-6',
          prompt: '2 dm² milliméterben',
          value: '20 000 mm²'
        },
        {
          id: 'p2-7',
          prompt: '800 ha négyzetkilométerben',
          value: '8 km²'
        },
        {
          id: 'p2-8',
          prompt: '900 dm² négyzetméterben',
          value: '9 m²'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: VALÓSÁGHŰ PÉLDÁK ÉS ÖSSZETETT ÁTVÁLTÁSOK
    // ========================================================
    3: {
      title: '3. Szint: Összetett és mindennapi terület-párosítások',
      subtitle: 'Párosítsd a vegyes mértékegységeket és valósághű becsléseket!',
      pairs: [
        {
          id: 'p3-1',
          prompt: 'Fél hektár (0,5 ha) négyzetméterben',
          value: '5000 m²'
        },
        {
          id: 'p3-2',
          prompt: '2 ha 30 a',
          value: '230 a'
        },
        {
          id: 'p3-3',
          prompt: '1,5 m² deciméterben',
          value: '150 dm²'
        },
        {
          id: 'p3-4',
          prompt: '1 km² négyzetméterben (3 lépcsőfok)',
          value: '1 000 000 m²'
        },
        {
          id: 'p3-5',
          prompt: 'Egy postabélyeg felülete',
          value: 'kb. 5 cm²'
        },
        {
          id: 'p3-6',
          prompt: 'Egy szabványos iskolai tanterem alapterülete',
          value: 'kb. 50 m²'
        },
        {
          id: 'p3-7',
          prompt: 'Egy családi konyhakert területe',
          value: 'kb. 3 a (300 m²)'
        },
        {
          id: 'p3-8',
          prompt: '250 000 m² hektárban',
          value: '25 ha'
        }
      ]
    }
  };

  return (
    <MatcherTemplate
      title="Terület Mértékegység Párosító"
      subtitle="Keresd meg az egymással egyenlő területeket és mértékegységeket!"
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

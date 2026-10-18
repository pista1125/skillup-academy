import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface SurfaceAreaMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const SurfaceAreaMatcher: React.FC<SurfaceAreaMatcherProps> = ({
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
    // 1. SZINT: ALAPVETŐ KOCKA- ÉS TÉGLATEST-FELSZÍNEK
    // ========================================================
    1: {
      title: '1. Szint: Alapvető kocka- és téglatest-felszínek',
      subtitle: 'Párosítsd a méreteket a helyes felszínértékekkel!',
      pairs: [
        {
          id: 'p1-1',
          prompt: 'a = 1 cm élű kocka felszíne',
          value: '6 cm²'
        },
        {
          id: 'p1-2',
          prompt: 'a = 2 cm élű kocka felszíne',
          value: '24 cm²'
        },
        {
          id: 'p1-3',
          prompt: 'a = 3 cm élű kocka felszíne',
          value: '54 cm²'
        },
        {
          id: 'p1-4',
          prompt: 'a = 5 cm élű kocka felszíne',
          value: '150 cm²'
        },
        {
          id: 'p1-5',
          prompt: 'a = 10 cm élű kocka felszíne',
          value: '600 cm² (6 dm²)'
        },
        {
          id: 'p1-6',
          prompt: 'a = 4 cm, b = 2 cm, c = 1 cm téglatest felszíne',
          value: '28 cm²'
        },
        {
          id: 'p1-7',
          prompt: 'a = 3 cm, b = 2 cm, c = 2 cm téglatest felszíne',
          value: '32 cm²'
        },
        {
          id: 'p1-8',
          prompt: 'a = 5 cm, b = 3 cm, c = 2 cm téglatest felszíne',
          value: '62 cm²'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: HIÁNYZÓ ÉLEK ÉS NAGYOBB MÉRETEK
    // ========================================================
    2: {
      title: '2. Szint: Visszaszámolás és nagyobb felszínek',
      subtitle: 'Keresd meg a hiányzó élt a felszínből, vagy számolj összetettebb méretekkel!',
      pairs: [
        {
          id: 'p2-1',
          prompt: 'A = 96 cm² kocka éle',
          value: 'a = 4 cm (96 : 6 = 16)'
        },
        {
          id: 'p2-2',
          prompt: 'A = 216 cm² kocka éle',
          value: 'a = 6 cm (216 : 6 = 36)'
        },
        {
          id: 'p2-3',
          prompt: 'A = 384 cm² kocka éle',
          value: 'a = 8 cm (384 : 6 = 64)'
        },
        {
          id: 'p2-4',
          prompt: 'a = 6 cm, b = 4 cm, c = 5 cm téglatest felszíne',
          value: '148 cm²'
        },
        {
          id: 'p2-5',
          prompt: 'a = 1 m élű kocka felszíne',
          value: '6 m² (600 dm²)'
        },
        {
          id: 'p2-6',
          prompt: 'Téglatest 3 különböző lapja: 12, 15, 20 cm², felszíne',
          value: '94 cm² (2 · 47)'
        },
        {
          id: 'p2-7',
          prompt: 'Kocka egy lapjának kerülete 12 cm, felszíne',
          value: 'A = 54 cm² (a = 3 cm)'
        },
        {
          id: 'p2-8',
          prompt: 'a = 8 dm, b = 5 dm, c = 2 dm téglatest felszíne',
          value: '132 dm²'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: NYITOTT DOBOZOK ÉS GYAKORLATI FELADATOK
    // ========================================================
    3: {
      title: '3. Szint: Nyitott testek és összetett feladatok',
      subtitle: 'Párosítsd a nyitott dobozokat és térbeli feladatokat az eredményekkel!',
      pairs: [
        {
          id: 'p3-1',
          prompt: 'a = 4 cm élű nyitott (fedél nélküli) kocka felszíne',
          value: '80 cm² (5 · 16)'
        },
        {
          id: 'p3-2',
          prompt: 'a = 5 m kocka szoba 4 fala és mennyezete',
          value: '125 m² (5 · 25)'
        },
        {
          id: 'p3-3',
          prompt: '60 cm × 30 cm × 40 cm nyitott akvárium üvegfelülete',
          value: '9000 cm² (90 dm²)'
        },
        {
          id: 'p3-4',
          prompt: 'Kocka éleinek összege 24 cm, felszíne',
          value: 'A = 24 cm² (a = 2 cm)'
        },
        {
          id: 'p3-5',
          prompt: 'Kocka éleinek összege 60 cm, felszíne',
          value: 'A = 150 cm² (a = 5 cm)'
        },
        {
          id: 'p3-6',
          prompt: 'a = 10 cm, b = 5 cm, c = 4 cm doboz felszíne',
          value: '220 cm²'
        },
        {
          id: 'p3-7',
          prompt: 'Két 3 cm-es kocka összeillesztve téglatestté',
          value: '90 cm² (10 lap)'
        },
        {
          id: 'p3-8',
          prompt: 'a = 10 dm élű kocka felszíne négyzetméterben',
          value: '6 m²'
        }
      ]
    }
  };

  return (
    <MatcherTemplate
      title="Felszínszámítás Párosító"
      subtitle="Keresd meg az oldalakhoz, dobozokhoz és felszínekhez tartozó helyes párokat!"
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

import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface CuboidCubeMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const CuboidCubeMatcher: React.FC<CuboidCubeMatcherProps> = ({
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
    // 1. SZINT: ALAPVETŐ GEOMETRIAI TULAJDONSÁGOK
    // ========================================================
    1: {
      title: '1. Szint: Alapvető tulajdonságok és darabszámok',
      subtitle: 'Párosítsd a téglatest és kocka geometriai elemeit a megfelelő értékekkel!',
      pairs: [
        {
          id: 'p1-1',
          prompt: 'Téglatest csúcsainak száma',
          value: '8 db'
        },
        {
          id: 'p1-2',
          prompt: 'Kocka határoló lapjainak száma',
          value: '6 db'
        },
        {
          id: 'p1-3',
          prompt: 'Téglatest éleinek száma',
          value: '12 db'
        },
        {
          id: 'p1-4',
          prompt: 'Kocka határoló lapjainak alakja',
          value: '6 db egybevágó négyzet'
        },
        {
          id: 'p1-5',
          prompt: 'Téglatest határoló lapjainak alakja',
          value: '6 db téglalap (páronként egybevágók)'
        },
        {
          id: 'p1-6',
          prompt: 'Egyetlen csúcsból kiinduló élek száma',
          value: '3 db'
        },
        {
          id: 'p1-7',
          prompt: 'Egy csúcsban találkozó élek hajlásszöge',
          value: '90° (derékszög)'
        },
        {
          id: 'p1-8',
          prompt: 'Szemközti lapok egymáshoz képest',
          value: 'Párhuzamosak és egybevágók'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: ÉLEK ÖSSZHOSSZA ÉS HIÁNYZÓ ADATOK
    // ========================================================
    2: {
      title: '2. Szint: Élek összhossza és számítások',
      subtitle: 'Számold ki az élhossz-összeget vagy keresd meg a hiányzó élt!',
      pairs: [
        {
          id: 'p2-1',
          prompt: 'a = 5 cm élű kocka éleinek összhossza',
          value: '60 cm (12 · 5)'
        },
        {
          id: 'p2-2',
          prompt: 'a = 4 cm, b = 3 cm, c = 2 cm téglatest élhossz-összege',
          value: '36 cm (4 · 9)'
        },
        {
          id: 'p2-3',
          prompt: 'Kocka élhossz-összege 48 cm, egy éle',
          value: 'a = 4 cm (48 : 12)'
        },
        {
          id: 'p2-4',
          prompt: 'a = 10 dm élű kocka éleinek összhossza méterben',
          value: '12 m (120 dm)'
        },
        {
          id: 'p2-5',
          prompt: 'a = 6 cm, b = 4 cm, c = 5 cm téglatest élhossz-összege',
          value: '60 cm (4 · 15)'
        },
        {
          id: 'p2-6',
          prompt: 'Kocka élhossz-összege 96 cm, egy lapjának kerülete',
          value: 'K = 32 cm (a = 8 cm)'
        },
        {
          id: 'p2-7',
          prompt: 'Téglatest a = 7 cm, b = 3 cm, élösszeg = 60 cm, a c él',
          value: 'c = 5 cm'
        },
        {
          id: 'p2-8',
          prompt: 'a = 2 m élű kocka éleinek összhossza',
          value: '24 m (12 · 2)'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: SÍKBELI HÁLÓK ÉS ÖSSZETETT TÉR-KAPCSOLATOK
    // ========================================================
    3: {
      title: '3. Szint: Síkbeli hálók és térbeli összefüggések',
      subtitle: 'Párosítsd az összetett geometriai tulajdonságokat és hálókat!',
      pairs: [
        {
          id: 'p3-1',
          prompt: 'Egyetlen élben találkozó lapok száma',
          value: '2 db lap'
        },
        {
          id: 'p3-2',
          prompt: 'Egy lapot határoló élek száma',
          value: '4 db él'
        },
        {
          id: 'p3-3',
          prompt: 'Kocka síkbeli hálóját alkotó négyzetek száma',
          value: '6 db'
        },
        {
          id: 'p3-4',
          prompt: 'Egy csúcsban találkozó 3 lap kapcsolata',
          value: 'Páronként merőlegesek'
        },
        {
          id: 'p3-5',
          prompt: 'Kocka egy lapjának területe 25 cm², éle',
          value: 'a = 5 cm'
        },
        {
          id: 'p3-6',
          prompt: '5 cm × 4 cm × 3 cm doboz legnagyobb lapjának területe',
          value: '20 cm² (5 · 4)'
        },
        {
          id: 'p3-7',
          prompt: 'Kocka éleinek összege 72 cm, egy lapjának területe',
          value: 'T = 36 cm² (a = 6 cm)'
        },
        {
          id: 'p3-8',
          prompt: 'Téglatest egybevágó lapjainak elhelyezkedése',
          value: '3 pár szemközti lap'
        }
      ]
    }
  };

  return (
    <MatcherTemplate
      title="Téglatest és Kocka Párosító"
      subtitle="Keresd meg az összetartozó geometriai elemeket, méreteket és élhosszokat!"
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

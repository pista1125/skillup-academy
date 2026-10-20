import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface AverageMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const AverageMatcher: React.FC<AverageMatcherProps> = ({
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
    // 1. SZINT: ÁTLAG ALAPFOGALMAK ÉS KÉPLETEK
    // ========================================================
    1: {
      title: '1. Szint: Átlag alapfogalmak és képletek',
      subtitle: 'Párosítsd a számtani középhez kapcsolódó fogalmakat a helyes meghatározásukkal!',
      pairs: [
        {
          id: 'p1-1',
          prompt: 'Számtani közép (átlag) ➗',
          value: 'Az adatok összege elosztva az adatok darabszámával'
        },
        {
          id: 'p1-2',
          prompt: 'Összeg visszafelé képlete ✖️',
          value: 'Átlag szorozva a darabszámmal (Átlag × N)'
        },
        {
          id: 'p1-3',
          prompt: 'Kiegyenlítés elve ⚖️',
          value: 'Ha mindenki egyenlően kapna a közösből, ez lenne az érték'
        },
        {
          id: 'p1-4',
          prompt: 'Eltérések összege 0️⃣',
          value: 'A pozitív és negatív eltérések összege az átlagtól mindig nulla'
        },
        {
          id: 'p1-5',
          prompt: 'Közrefogási szabály 📏',
          value: 'Az átlag mindig a legkisebb és a legnagyobb adat közé esik'
        },
        {
          id: 'p1-6',
          prompt: 'Tizedestört átlag 🔢',
          value: 'Egész számok átlaga is lehet tört (pl. 4 és 5 átlaga 4,5)'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: FEJBEN SZÁMOLT ÁTLAGOK
    // ========================================================
    2: {
      title: '2. Szint: Fejben számolt átlagok',
      subtitle: 'Számítsd ki a számpárok és számtriók pontos számtani közepét!',
      pairs: [
        {
          id: 'p2-1',
          prompt: '6 és 10 átlaga 🧮',
          value: '8 ((6 + 10) : 2 = 16 : 2)'
        },
        {
          id: 'p2-2',
          prompt: '3, 4 és 8 átlaga 🧮',
          value: '5 ((3 + 4 + 8) : 3 = 15 : 3)'
        },
        {
          id: 'p2-3',
          prompt: '20 és 50 átlaga 🧮',
          value: '35 ((20 + 50) : 2 = 70 : 2)'
        },
        {
          id: 'p2-4',
          prompt: '4 és 5 átlaga 🧮',
          value: '4,5 ((4 + 5) : 2 = 9 : 2)'
        },
        {
          id: 'p2-5',
          prompt: '1, 2, 3, 4, 5 átlaga 🧮',
          value: '3 ((1 + 2 + 3 + 4 + 5) : 5 = 15 : 5)'
        },
        {
          id: 'p2-6',
          prompt: '0 és 12 átlaga 🧮',
          value: '6 ((0 + 12) : 2 = 12 : 2)'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: TULAJDONSÁGOK ÉS HIÁNYZÓ ADATOK
    // ========================================================
    3: {
      title: '3. Szint: Tulajdonságok és hiányzó adatok',
      subtitle: 'Párosítsd a feltételeket és állításokat a rájuk vonatkozó következménnyel!',
      pairs: [
        {
          id: 'p3-1',
          prompt: '5 szám átlaga 8 🔍',
          value: 'Az 5 szám összege pontosan 40 (5 × 8 = 40)'
        },
        {
          id: 'p3-2',
          prompt: 'Minden adathoz hozzáadunk 3-at ➕',
          value: 'Az új átlag is pontosan 3-mal növekszik'
        },
        {
          id: 'p3-3',
          prompt: 'Az új adat nagyobb az eddigi átlagnál 📈',
          value: 'Az átlag értéke megemelkedik (nő)'
        },
        {
          id: 'p3-4',
          prompt: 'Az új adat megegyezik az átlaggal ⏸️',
          value: 'Az átlag értéke változatlan marad'
        },
        {
          id: 'p3-5',
          prompt: 'Minden adatot megduplázunk (× 2) ✖️',
          value: 'Az átlag értéke is pontosan a duplájára nő'
        },
        {
          id: 'p3-6',
          prompt: 'Extrém magas kiugró érték lép be 🚀',
          value: 'Jelentősen felfelé torzítja az átlagot'
        }
      ]
    }
  };

  const handleLevelChange = (newLevel: DifficultyLevel) => {
    setCurrentLevel(newLevel);
    if (onNextLevel) onNextLevel();
  };

  return (
    <MatcherTemplate
      title="Átlag Párosító Játék"
      subtitle="Keresd meg az összetartozó definíciókat, számításokat és tulajdonságokat!"
      color="amber"
      levels={levels}
      currentLevel={currentLevel}
      onLevelChange={handleLevelChange}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onOpenRules={onOpenRules}
    />
  );
};

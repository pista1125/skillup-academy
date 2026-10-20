import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface TablesGraphsMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const TablesGraphsMatcher: React.FC<TablesGraphsMatcherProps> = ({
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
    // 1. SZINT: DIAGRAMTÍPUSOK ÉS FŐ JELLEMZŐIK
    // ========================================================
    1: {
      title: '1. Szint: Diagramtípusok és fő jellemzőik',
      subtitle: 'Párosítsd az ábrázolási formákat a legfontosabb tulajdonságaikkal és céljaikkal!',
      pairs: [
        {
          id: 'p1-1',
          prompt: 'Oszlopdiagram 📊',
          value: 'Különböző kategóriák adatainak összehasonlítása függőleges oszlopokkal'
        },
        {
          id: 'p1-2',
          prompt: 'Vonaldiagram 📈',
          value: 'Folyamatos változások, időbeli folyamatok (pl. hőmérséklet) ábrázolása vonallal'
        },
        {
          id: 'p1-3',
          prompt: 'Kördiagram 🥧',
          value: 'Egy egész (100%) részeinek, megoszlásának szemléltetése körcikkekkel'
        },
        {
          id: 'p1-4',
          prompt: 'Sávdiagram 📏',
          value: 'Vízszintes oszlopokból áll (hosszú kategórianevek esetén különösen előnyös)'
        },
        {
          id: 'p1-5',
          prompt: 'Gyakorisági táblázat 📋',
          value: 'Pontos számértékeket és az előfordulások darabszámát tartalmazó rács'
        },
        {
          id: 'p1-6',
          prompt: 'Teljes kör szöge ⭕',
          value: 'Pontosan 360°, ami a 100%-os egésznek felel meg a kördiagramban'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: KÖRDIAGRAM SZÖGEK ÉS SZÁZALÉKOK
    // ========================================================
    2: {
      title: '2. Szint: Kördiagram szögek és százalékok',
      subtitle: 'Párosítsd a kördiagram körcikkeinek szögét a megfelelő aránnyal és százalékkal!',
      pairs: [
        {
          id: 'p2-1',
          prompt: '180°-os körcikk',
          value: '50% (az egész pontos fele, félkör)'
        },
        {
          id: 'p2-2',
          prompt: '90°-os körcikk',
          value: '25% (az egész negyed része, derékszög)'
        },
        {
          id: 'p2-3',
          prompt: '120°-os körcikk',
          value: 'Egyharmad rész (kb. 33,3%, a 360° harmada)'
        },
        {
          id: 'p2-4',
          prompt: '36°-os körcikk',
          value: '10% (az egész tized része, 360° : 10)'
        },
        {
          id: 'p2-5',
          prompt: '45°-os körcikk',
          value: '12,5% (az egész nyolcad része)'
        },
        {
          id: 'p2-6',
          prompt: '1% a kördiagramon',
          value: 'Pontosan 3,6°-os középponti szögnek felel meg'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: GRAFIKON ELEMZÉSI FOGALMAK
    // ========================================================
    3: {
      title: '3. Szint: Grafikon elemzési fogalmak',
      subtitle: 'Keresd meg a statisztikai és grafikon-elemzési kifejezések pontos definícióját!',
      pairs: [
        {
          id: 'p3-1',
          prompt: 'Maximum érték 🏔️',
          value: 'A grafikon legmagasabb pontja, a mért legnagyobb számadat'
        },
        {
          id: 'p3-2',
          prompt: 'Minimum érték 🌊',
          value: 'A grafikon legalacsonyabb pontja, a mért legkisebb számadat'
        },
        {
          id: 'p3-3',
          prompt: 'Adatok terjedelme ↔️',
          value: 'A legnagyobb és legkisebb érték különbsége (Maximum − Minimum)'
        },
        {
          id: 'p3-4',
          prompt: 'Meredeken emelkedő vonal ↗️',
          value: 'Gyors, ugrásszerű növekedést mutató időbeli változás'
        },
        {
          id: 'p3-5',
          prompt: 'Vízszintes egyenes szakasz ➡️',
          value: 'Változatlan állapot: az érték nem nőtt és nem csökkent az adott időszakban'
        },
        {
          id: 'p3-6',
          prompt: 'Levágott tengely (nem 0-ról indul) ⚠️',
          value: 'Félrevezető grafikai trükk, ami eltúlozza a csekély különbségeket'
        }
      ]
    }
  };

  const handleLevelChange = (lvl: DifficultyLevel) => {
    setCurrentLevel(lvl);
    if (onNextLevel && lvl > currentLevel) {
      onNextLevel();
    }
  };

  return (
    <MatcherTemplate
      levels={levels}
      currentLevel={currentLevel}
      onLevelChange={handleLevelChange}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onOpenRules={onOpenRules}
    />
  );
};

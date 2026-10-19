import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface CapacityMeasurementMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const CapacityMeasurementMatcher: React.FC<CapacityMeasurementMatcherProps> = ({
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
    // 1. SZINT: ALAPVETŐ ŰRMÉRTÉKEK ÉS FOGALMAK
    // ========================================================
    1: {
      title: '1. Szint: Alapvető űrmértékek és fogalmak',
      subtitle: 'Párosítsd az űrtartalom mértékegységeit a helyes leírásukkal!',
      pairs: [
        {
          id: 'p1-1',
          prompt: 'Liter (l)',
          value: 'Az űrtartalom alapegysége, pontosan 1 dm³ víz térfogata (10 dl)'
        },
        {
          id: 'p1-2',
          prompt: 'Deciliter (dl)',
          value: 'A liter tizedrésze (1 l = 10 dl), egy kávéscsésze vagy bögre gyakori mértéke'
        },
        {
          id: 'p1-3',
          prompt: 'Centiliter (cl)',
          value: 'A liter századrésze (1 dl = 10 cl, 1 l = 100 cl)'
        },
        {
          id: 'p1-4',
          prompt: 'Milliliter (ml)',
          value: 'A liter ezredrésze (1 l = 1000 ml), pontosan 1 cm³ térfogat'
        },
        {
          id: 'p1-5',
          prompt: 'Hektoliter (hl)',
          value: 'Nagy folyadékmennyiségek, hordók egysége: 1 hl = 100 liter'
        },
        {
          id: 'p1-6',
          prompt: 'Űrtartalom',
          value: 'Üreges testek belső térfogata, a befogadott folyadék mennyisége'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: EGYENLŐ ŰRMÉRTÉKEK ÉS ÁTVÁLTÁSOK
    // ========================================================
    2: {
      title: '2. Szint: Egyenlő űrmértékek és átváltások',
      subtitle: 'Keresd meg az azonos folyadékmennyiséget kifejező értékpárokat!',
      pairs: [
        {
          id: 'p2-1',
          prompt: 'Fél liter (0,5 l)',
          value: '5 deciliter (5 dl) = 500 ml'
        },
        {
          id: 'p2-2',
          prompt: 'Negyed liter (0,25 l)',
          value: '2,5 deciliter (2,5 dl) = 250 ml'
        },
        {
          id: 'p2-3',
          prompt: 'Másfél liter (1,5 l)',
          value: '15 deciliter (15 dl) = 1500 ml'
        },
        {
          id: 'p2-4',
          prompt: '2 hektoliter (2 hl)',
          value: '200 liter = 2000 dl'
        },
        {
          id: 'p2-5',
          prompt: '750 milliliter (750 ml)',
          value: '75 cl = 7,5 dl (háromnegyed liter)'
        },
        {
          id: 'p2-6',
          prompt: '1 köbméter (1 m³)',
          value: '1000 liter = 10 hektoliter (10 hl)'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: EDÉNYEK ÉS REÁLIS ŰRTARTALMUK
    // ========================================================
    3: {
      title: '3. Szint: Edények és reális űrtartalmuk',
      subtitle: 'Párosítsd a mindennapi edényeket, tárolókat a reális űrtartalmukkal!',
      pairs: [
        {
          id: 'p3-1',
          prompt: 'Vizespohár vagy bögre 🥛',
          value: 'kb. 2,5 dl (250 ml)'
        },
        {
          id: 'p3-2',
          prompt: 'Teáskanálnyi szirup 🥄',
          value: 'kb. 5 ml'
        },
        {
          id: 'p3-3',
          prompt: 'Dobozos üdítőital 🥤',
          value: '330 ml (33 cl = 3,3 dl)'
        },
        {
          id: 'p3-4',
          prompt: 'Háztartási felmosóvödör 🪣',
          value: 'kb. 10–12 liter'
        },
        {
          id: 'p3-5',
          prompt: 'Tele engedett fürdőkád 🛁',
          value: 'kb. 150–200 liter (1,5–2 hl)'
        },
        {
          id: 'p3-6',
          prompt: 'Kerti esővízgyűjtő hordó 🛢️',
          value: 'kb. 200 liter (2 hl)'
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

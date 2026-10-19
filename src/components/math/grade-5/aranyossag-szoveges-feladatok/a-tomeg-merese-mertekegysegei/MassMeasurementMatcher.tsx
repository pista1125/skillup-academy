import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface MassMeasurementMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const MassMeasurementMatcher: React.FC<MassMeasurementMatcherProps> = ({
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
    // 1. SZINT: ALAPVETŐ MÉRTÉKEGYSÉGEK ÉS FOGALMAK
    // ========================================================
    1: {
      title: '1. Szint: Alapvető mértékegységek és fogalmak',
      subtitle: 'Párosítsd a tömeg mértékegységeit és alapfogalmait a megfelelő leírásukkal!',
      pairs: [
        {
          id: 'p1-1',
          prompt: 'Kilogramm (kg)',
          value: 'A metrikus rendszer alapegysége, pontosan 1 liter víz tömege (100 dkg)'
        },
        {
          id: 'p1-2',
          prompt: 'Gramm (g)',
          value: 'Kisebb tömegek mérésére, a kilogramm ezredrésze (1 kg = 1000 g)'
        },
        {
          id: 'p1-3',
          prompt: 'Dekagramm (dkg)',
          value: 'A konyhában és élelmiszerboltban gyakori: 1 dkg = 10 g, 100 dkg = 1 kg'
        },
        {
          id: 'p1-4',
          prompt: 'Tonna (t)',
          value: 'Nagy tömegek, járművek egysége: 1 t = 1000 kg = 10 q'
        },
        {
          id: 'p1-5',
          prompt: 'Mázsa (q)',
          value: 'Zsákos áruk, gabonák hagyományos mértékegysége: 1 q = 100 kg'
        },
        {
          id: 'p1-6',
          prompt: 'Tára tömeg',
          value: 'Az üres csomagolóeszköz (rekesz, doboz, üveg) saját tömege'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: EGYENLŐ TÖMEGEK ÉS ÁTVÁLTÁSOK
    // ========================================================
    2: {
      title: '2. Szint: Egyenlő tömegek és átváltások',
      subtitle: 'Keresd meg az azonos tömeget kifejező értékpárokat!',
      pairs: [
        {
          id: 'p2-1',
          prompt: '2 kg 50 dkg',
          value: '250 dkg = 2500 g'
        },
        {
          id: 'p2-2',
          prompt: '1,5 tonna (1,5 t)',
          value: '15 mázsa (15 q) = 1500 kg'
        },
        {
          id: 'p2-3',
          prompt: '300 dkg',
          value: '3 kg = 3000 g'
        },
        {
          id: 'p2-4',
          prompt: '5000 mg',
          value: '5 gramm (5 g)'
        },
        {
          id: 'p2-5',
          prompt: 'Fél kilogramm (fél kg)',
          value: '50 dkg = 500 g'
        },
        {
          id: 'p2-6',
          prompt: 'Háromnegyed tonna (0,75 t)',
          value: '750 kg = 7,5 q'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: TÁRGYAK ÉS REÁLIS TÖMEGÜK
    // ========================================================
    3: {
      title: '3. Szint: Tárgyak és reális tömegük',
      subtitle: 'Párosítsd a tárgyakat, élőlényeket a mindennapi reális tömegükkel!',
      pairs: [
        {
          id: 'p3-1',
          prompt: 'Tábla csokoládé 🍫',
          value: '100 g (10 dkg)'
        },
        {
          id: 'p3-2',
          prompt: 'Személygépkocsi 🚗',
          value: 'kb. 1,3–1,5 tonna (1300–1500 kg)'
        },
        {
          id: 'p3-3',
          prompt: 'Postai szabványlevél ✉️',
          value: 'kb. 20 g'
        },
        {
          id: 'p3-4',
          prompt: 'Felnőtt afrikai elefánt 🐘',
          value: 'kb. 5–6 tonna (50–60 q)'
        },
        {
          id: 'p3-5',
          prompt: 'Gombostű feje 📍',
          value: 'kb. 10 mg'
        },
        {
          id: 'p3-6',
          prompt: 'Felnőtt kerékpár 🚲',
          value: 'kb. 12–15 kg'
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

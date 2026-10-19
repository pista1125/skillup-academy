import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface UnitConversionsMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const UnitConversionsMatcher: React.FC<UnitConversionsMatcherProps> = ({
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
    // 1. SZINT: KÖZVETLEN ALAPVETŐ ÁTVÁLTÁSOK
    // ========================================================
    1: {
      title: '1. Szint: Alapvető mértékegység-váltások',
      subtitle: 'Párosítsd a kifejezéseket a velük pontosan megegyező értékekkel!',
      pairs: [
        {
          id: 'p1-1',
          prompt: '1 méter (1 m)',
          value: '100 cm = 10 dm = 1000 mm'
        },
        {
          id: 'p1-2',
          prompt: '1 kilogramm (1 kg)',
          value: '100 dkg = 1000 g'
        },
        {
          id: 'p1-3',
          prompt: '1 liter (1 l)',
          value: '10 dl = 100 cl = 1000 ml (= 1 dm³)'
        },
        {
          id: 'p1-4',
          prompt: '1 egész óra (1 h)',
          value: '60 perc = 3600 másodperc'
        },
        {
          id: 'p1-5',
          prompt: '1 kilométer (1 km)',
          value: '1000 méter (10 000 dm)'
        },
        {
          id: 'p1-6',
          prompt: '1 tonna (1 t)',
          value: '10 mázsa (10 q) = 1000 kilogramm'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: TÖRT MENNYISÉGEK ÉS TIZEDESTÖRTEK
    // ========================================================
    2: {
      title: '2. Szint: Tört részek és tizedes alakok',
      subtitle: 'Keresd meg a tört- és tizedes alakokhoz tartozó átszámított értékeket!',
      pairs: [
        {
          id: 'p2-1',
          prompt: 'Fél kilogramm (0,5 kg)',
          value: '50 dkg = 500 g'
        },
        {
          id: 'p2-2',
          prompt: 'Háromnegyed liter (0,75 l)',
          value: '7,5 dl = 750 ml'
        },
        {
          id: 'p2-3',
          prompt: 'Negyed méter (0,25 m)',
          value: '25 cm = 2,5 dm = 250 mm'
        },
        {
          id: 'p2-4',
          prompt: 'Másfél óra (1,5 h)',
          value: '90 perc (60 + 30 perc)'
        },
        {
          id: 'p2-5',
          prompt: 'Fél mázsa (0,5 q)',
          value: '50 kg (5000 dkg)'
        },
        {
          id: 'p2-6',
          prompt: '2 és fél nap',
          value: '60 óra (48 + 12 óra)'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: ÖSSZETETT (VEGYES) MENNYISÉGEK
    // ========================================================
    3: {
      title: '3. Szint: Összetett és vegyes mennyiségek',
      subtitle: 'Párosítsd a vegyes mértékegységeket az egyetlen egységbe átszámolt alakjukkal!',
      pairs: [
        {
          id: 'p3-1',
          prompt: '3 m 45 cm',
          value: '345 cm = 3,45 m'
        },
        {
          id: 'p3-2',
          prompt: '2 kg 8 dkg (vigyázat!)',
          value: '208 dkg = 2080 g = 2,08 kg'
        },
        {
          id: 'p3-3',
          prompt: '1 l 5 cl',
          value: '105 cl = 10,5 dl = 1050 ml'
        },
        {
          id: 'p3-4',
          prompt: '2 óra 35 perc',
          value: '155 perc (120 + 35 perc)'
        },
        {
          id: 'p3-5',
          prompt: '4 km 200 m',
          value: '4200 méter = 4,2 km'
        },
        {
          id: 'p3-6',
          prompt: '5 t 3 q',
          value: '53 q = 5300 kg = 5,3 t'
        }
      ]
    }
  };

  const currentConfig = levels[currentLevel] || levels[1];

  return (
    <MatcherTemplate
      title="Mértékegység-átváltások Párosító"
      subtitle={currentConfig.subtitle}
      pairs={currentConfig.pairs}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onComplete={onNextLevel}
      level={currentLevel}
      onLevelChange={(lvl) => setCurrentLevel(lvl)}
      onOpenRules={onOpenRules}
    />
  );
};

import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface DirectProportionMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const DirectProportionMatcher: React.FC<DirectProportionMatcherProps> = ({
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
    // 1. SZINT: KÖZVETLEN EGYSÉGÁR ÉS EGYSÉGRE KÖVETKEZTETÉS
    // ========================================================
    1: {
      title: '1. Szint: Egységár és egy egységre jutó érték',
      subtitle: 'Párosítsd a megadott csomagárakat az 1 egységre jutó pontos értékkel!',
      pairs: [
        {
          id: 'p1-1',
          prompt: '3 kg narancs 1500 Ft',
          value: '1 kg narancs = 500 Ft (1500 : 3)'
        },
        {
          id: 'p1-2',
          prompt: '4 db táblás csoki 1200 Ft',
          value: '1 db csoki = 300 Ft (1200 : 4)'
        },
        {
          id: 'p1-3',
          prompt: 'Autóval 2 óra alatt 160 km út',
          value: '1 óra alatt 80 km megtett út (80 km/h)'
        },
        {
          id: 'p1-4',
          prompt: '5 darab füzet 1250 Ft',
          value: '1 füzet = 250 Ft (1250 : 5)'
        },
        {
          id: 'p1-5',
          prompt: '10 liter benzin 6000 Ft',
          value: '1 liter benzin = 600 Ft (6000 : 10)'
        },
        {
          id: 'p1-6',
          prompt: '6 gombóc fagyi 2400 Ft',
          value: '1 gombóc fagyi = 400 Ft (2400 : 6)'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: HÁRMASSZABÁLY PÁROK (FELADAT ÉS VÉGEREDMÉNY)
    // ========================================================
    2: {
      title: '2. Szint: Hármasszabály feladatok és megoldásaik',
      subtitle: 'Számold ki fejben a hármasszabállyal, és keresd meg a helyes végeredményt!',
      pairs: [
        {
          id: 'p2-1',
          prompt: '2 kg alma 900 Ft → Mennyi 5 kg alma?',
          value: '2250 Ft (1 kg = 450 Ft; 5 · 450 = 2250)'
        },
        {
          id: 'p2-2',
          prompt: '3 óra alatt 210 km út → Mennyi 5 óra alatt?',
          value: '350 km (1 óra = 70 km; 5 · 70 = 350)'
        },
        {
          id: 'p2-3',
          prompt: '4 doboz tej 1600 Ft → Mennyi 6 doboz tej?',
          value: '2400 Ft (1 doboz = 400 Ft; 6 · 400 = 2400)'
        },
        {
          id: 'p2-4',
          prompt: '5 méter szalag 750 Ft → Mennyi 8 méter szalag?',
          value: '1200 Ft (1 m = 150 Ft; 8 · 150 = 1200)'
        },
        {
          id: 'p2-5',
          prompt: '2 gombóc fagyi 900 Ft → Mennyi 7 gombóc fagyi?',
          value: '3150 Ft (1 gombóc = 450 Ft; 7 · 450 = 3150)'
        },
        {
          id: 'p2-6',
          prompt: '6 óra alatt 180 doboz készül → Mennyi 4 óra alatt?',
          value: '120 doboz (1 óra = 30 doboz; 4 · 30 = 120)'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: TULAJDONSÁGOK ÉS MATEMATIKAI ÁLLÍTÁSOK
    // ========================================================
    3: {
      title: '3. Szint: Az egyenes arányosság alaptulajdonságai',
      subtitle: 'Párosítsd a matematikai fogalmakat és szabályokat a pontos leírásukkal!',
      pairs: [
        {
          id: 'p3-1',
          prompt: 'A hányados (y : x) vizsgálata',
          value: 'Minden oszlopban PONTOSAN ugyanaz az állandó szám (k = egységár)'
        },
        {
          id: 'p3-2',
          prompt: 'Az egyenes arányosság grafikonja',
          value: 'Derékszögű koordináta-rendszerben az origóból (0; 0) induló félegyenes'
        },
        {
          id: 'p3-3',
          prompt: 'Ha az egyik adat a 4-szeresére nő',
          value: 'A hozzá tartozó másik adat is pontosan a 4-szeresére növekszik'
        },
        {
          id: 'p3-4',
          prompt: 'Ha az egyik adat a harmadára csökken',
          value: 'A hozzá tartozó másik adat is pontosan a harmadára csökken'
        },
        {
          id: 'p3-5',
          prompt: 'Nullaszabály a koordináta-rendszerben',
          value: '0 mennyiséghez pontosan 0 érték tartozik (0 kg áru = 0 Ft)'
        },
        {
          id: 'p3-6',
          prompt: 'Hármasszabály lépései',
          value: '1. lépés: osztással 1 egység kiszámolása; 2. lépés: szorzás a céladatra'
        }
      ]
    }
  };

  const currentConfig = levels[currentLevel] || levels[1];

  return (
    <MatcherTemplate
      title="Egyenes Arányosság Párosító"
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

import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface FindSolutionsMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const FindSolutionsMatcher: React.FC<FindSolutionsMatcherProps> = ({
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
    // 1. SZINT: EGYENLET ÉS AZ ELSŐ LEBONTÁSI LÉPÉS
    // ========================================================
    1: {
      title: '1. Szint: Mi az első lebontási lépés?',
      subtitle: 'Párosítsd az egyenletet azzal a művelettel, amivel elkezdjük a lebontását!',
      pairs: [
        {
          id: 'p1-1',
          prompt: '3 · x + 12 = 39',
          value: 'Levonunk 12-t: 3 · x = 27'
        },
        {
          id: 'p1-2',
          prompt: '4 · y − 8 = 32',
          value: 'Hozzáadunk 8-at: 4 · y = 40'
        },
        {
          id: 'p1-3',
          prompt: '(a + 6) : 5 = 7',
          value: 'Megszorozzuk 5-tel: a + 6 = 35'
        },
        {
          id: 'p1-4',
          prompt: '45 − 2 · b = 25',
          value: 'Kivonandó keresése: 2 · b = 45 − 25 = 20'
        },
        {
          id: 'p1-5',
          prompt: 'k : 4 + 7 = 15',
          value: 'Levonunk 7-et: k : 4 = 8'
        },
        {
          id: 'p1-6',
          prompt: '(x − 9) · 3 = 24',
          value: 'Elosztjuk 3-mal: x − 9 = 8'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: EGYENLETEK ÉS VÉGEREDMÉNYÜK
    // ========================================================
    2: {
      title: '2. Szint: Egyenletek és pontos megoldásaik',
      subtitle: 'Párosítsd a kifejezést a kiszámított ismeretlen értékével!',
      pairs: [
        {
          id: 'p2-1',
          prompt: '5 · x + 15 = 55',
          value: 'x = 8 (5 · x = 40 → x = 8)'
        },
        {
          id: 'p2-2',
          prompt: '60 − 3 · y = 24',
          value: 'y = 12 (3 · y = 36 → y = 12)'
        },
        {
          id: 'p2-3',
          prompt: '(m + 8) · 4 = 48',
          value: 'm = 4 (m + 8 = 12 → m = 4)'
        },
        {
          id: 'p2-4',
          prompt: '72 : (a − 1) = 8',
          value: 'a = 10 (a − 1 = 9 → a = 10)'
        },
        {
          id: 'p2-5',
          prompt: '(b − 5) : 3 = 9',
          value: 'b = 32 (b − 5 = 27 → b = 32)'
        },
        {
          id: 'p2-6',
          prompt: '4 · k − 11 = 29',
          value: 'k = 10 (4 · k = 40 → k = 10)'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: „GONDOLTAM EGY SZÁMRA” PÁROK
    // ========================================================
    3: {
      title: '3. Szint: Szöveges gondoltam egy számot rejtvények',
      subtitle: 'Kösd össze a szöveges leírást a gondolt számmal!',
      pairs: [
        {
          id: 'p3-1',
          prompt: 'Gondoltam egy számot, 4-gyel szoroztam, hozzáadtam 18-at: 50 lett.',
          value: 'Gondolt szám: 8 (50 − 18 = 32 → 32 : 4 = 8)'
        },
        {
          id: 'p3-2',
          prompt: 'Gondoltam egy számot, 9-et kivontam, a harmada 7 lett.',
          value: 'Gondolt szám: 30 (7 · 3 = 21 → 21 + 9 = 30)'
        },
        {
          id: 'p3-3',
          prompt: '70-ből kivontam a gondolt szám 5-szörösét, 25 maradt.',
          value: 'Gondolt szám: 9 (70 − 25 = 45 → 45 : 5 = 9)'
        },
        {
          id: 'p3-4',
          prompt: 'A gondolt számhoz adtam 15-öt, a felét vettem: 20 lett.',
          value: 'Gondolt szám: 25 (20 · 2 = 40 → 40 − 15 = 25)'
        },
        {
          id: 'p3-5',
          prompt: 'A szám 6-szorosából kivontam 14-et: 46-ot kaptam.',
          value: 'Gondolt szám: 10 (46 + 14 = 60 → 60 : 6 = 10)'
        },
        {
          id: 'p3-6',
          prompt: 'A számot elosztottam 4-gyel, majd hozzáadtam 13-at: 20 lett.',
          value: 'Gondolt szám: 28 (20 − 13 = 7 → 7 · 4 = 28)'
        }
      ]
    }
  };

  return (
    <MatcherTemplate
      title="Keressük a megoldásokat! Párosító"
      subtitle="Párosítsd az egyenleteket a lebontási lépésekkel és végeredményeikkel!"
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
export default FindSolutionsMatcher;

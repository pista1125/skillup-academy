import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface LocationSummaryMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const LocationSummaryMatcher: React.FC<LocationSummaryMatcherProps> = ({
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
    // 1. SZINT: FEJEZETI ALAPFOGALMAK ÉS JELÖLÉSEK
    // ========================================================
    1: {
      title: '1. Szint: Fejezeti Alapfogalmak és Jelölések',
      subtitle: 'Párosítsd a fogalmakat a pontos definíciójukkal!',
      pairs: [
        {
          id: 'p1-1',
          prompt: 'Origó koordinátái',
          value: 'O(0; 0) a koordináta-tengelyek metszéspontja'
        },
        {
          id: 'p1-2',
          prompt: 'Vízszintes tengely',
          value: 'x-tengely (abszcissza)'
        },
        {
          id: 'p1-3',
          prompt: 'Függőleges tengely',
          value: 'y-tengely (ordináta)'
        },
        {
          id: 'p1-4',
          prompt: 'Pont leírása a síkban',
          value: 'P(x; y) rendezett számpár'
        },
        {
          id: 'p1-5',
          prompt: 'Sorminta alapszakasza',
          value: 'A szabályosan ismétlődő legkisebb motívum'
        },
        {
          id: 'p1-6',
          prompt: 'Számgép alapmodellje',
          value: 'Bemenet (x) &rarr; Számítási szabály &rarr; Kimenet (y)'
        },
        {
          id: 'p1-7',
          prompt: 'Számsorozat tagjai',
          value: 'a₁, a₂, a₃, ..., aₙ (indexelt elemek)'
        },
        {
          id: 'p1-8',
          prompt: 'Négyzetszám képzése',
          value: 'Egy szám szorzata önmagával (n²)'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: SZABÁLYOK ÉS TULAJDONSÁGOK FELISMERÉSE
    // ========================================================
    2: {
      title: '2. Szint: Szabályok és Összefüggések',
      subtitle: 'Párosítsd a koordináta és sorozat szabályokat a jelentésükkel!',
      pairs: [
        {
          id: 'p2-1',
          prompt: 'II. Síknegyed előjelei',
          value: 'Negatív x, pozitív y: (-; +)'
        },
        {
          id: 'p2-2',
          prompt: 'IV. Síknegyed előjelei',
          value: 'Pozitív x, negatív y: (+; -)'
        },
        {
          id: 'p2-3',
          prompt: 'X-tengelyen fekvő pont',
          value: 'P(x; 0) &rarr; az y-koordinátája mindig 0'
        },
        {
          id: 'p2-4',
          prompt: 'Y-tengelyen fekvő pont',
          value: 'P(0; y) &rarr; az x-koordinátája mindig 0'
        },
        {
          id: 'p2-5',
          prompt: 'y = 3 · x + 1 szabály inverze',
          value: '(y - 1) : 3 = x (ellentétes sorrendű műveletek)'
        },
        {
          id: 'p2-6',
          prompt: 'Gyufaszál négyzetlánc képlete',
          value: '3 · n + 1 gyufaszál n darab négyzethez'
        },
        {
          id: 'p2-7',
          prompt: 'A 4. háromszögszám értéke',
          value: '1 + 2 + 3 + 4 = 10 (tekebábuk száma)'
        },
        {
          id: 'p2-8',
          prompt: 'A Fibonacci-sorozat képzése',
          value: 'Minden tag az előtte álló két tag összege'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: MESTER SZÁMÍTÁSOK ÉS ÖSSZETETT FELADVÁNYOK
    // ========================================================
    3: {
      title: '3. Szint: Mester Feladványok és Számítások',
      subtitle: 'Párosítsd a feladványokat a levezetett pontos eredménnyel!',
      pairs: [
        {
          id: 'p3-1',
          prompt: 'P(2; 5) és Q(6; 2) lépéstávolsága',
          value: '|6 - 2| + |2 - 5| = 4 + 3 = 7 lépés a rácson'
        },
        {
          id: 'p3-2',
          prompt: 'Piros-Kék-Zöld sorminta 100. eleme',
          value: '100 = 3 · 33 + 1 &rarr; Piros (a legelső szín)'
        },
        {
          id: 'p3-3',
          prompt: 'Számgép: x · 4 - 3 = 25 esetén x értéke',
          value: 'x = (25 + 3) : 4 = 28 : 4 = 7'
        },
        {
          id: 'p3-4',
          prompt: 'Számtani sorozat: a₁ = 3, d = 5 esetén a₁₀',
          value: '3 + 9 · 5 = 3 + 45 = 48'
        },
        {
          id: 'p3-5',
          prompt: 'Az első 7 páratlan szám összege',
          value: '7² = 49 (mindig négyzetszámot ad!)'
        },
        {
          id: 'p3-6',
          prompt: 'Két szomszédos háromszögszám: 6 + 10',
          value: '16 = 4² (négyzetszám alakzatot formál)'
        },
        {
          id: 'p3-7',
          prompt: 'A 12. Fibonacci-szám (F₁₂)',
          value: '144 (ez egyben a 12² négyzetszám is!)'
        },
        {
          id: 'p3-8',
          prompt: 'P(3; 4) pont tükörképe az x-tengelyre',
          value: "P'(3; -4) (csak az y koordináta vált előjelet)"
        }
      ]
    }
  };

  return (
    <MatcherTemplate
      topicId="g5-loc-summary-quiz"
      title="Fejezeti összefoglaló párosító"
      subtitle="Párosítsd a fejezet 4 alappillérének kulcsfogalmait, szabályait és mesterszámításait!"
      currentLevel={currentLevel}
      onLevelChange={setCurrentLevel}
      levels={levels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      documentId="grade-5-location-summary-matcher"
      storageKey="g5-loc-summary-matcher"
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
};

import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface FamousSequencesMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const FamousSequencesMatcher: React.FC<FamousSequencesMatcherProps> = ({
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
    // 1. SZINT: HÍRES SOROZATOK ÉS ELSŐ TAGJAIK
    // ========================================================
    1: {
      title: '1. Szint: Híres Sorozatok és Kezdő Tagjaik',
      subtitle: 'Párosítsd a híres sorozat nevét a számaival!',
      pairs: [
        {
          id: 'p1-1',
          prompt: 'Páros számok sorozata (2n)',
          value: '2, 4, 6, 8, 10, 12, 14 ...'
        },
        {
          id: 'p1-2',
          prompt: 'Páratlan számok sorozata (2n - 1)',
          value: '1, 3, 5, 7, 9, 11, 13 ...'
        },
        {
          id: 'p1-3',
          prompt: 'Négyzetszámok sorozata (n²)',
          value: '1, 4, 9, 16, 25, 36, 49 ...'
        },
        {
          id: 'p1-4',
          prompt: 'Háromszögszámok sorozata',
          value: '1, 3, 6, 10, 15, 21, 28 ...'
        },
        {
          id: 'p1-5',
          prompt: 'Fibonacci-sorozat',
          value: '1, 1, 2, 3, 5, 8, 13, 21 ...'
        },
        {
          id: 'p1-6',
          prompt: 'Kettő-hatványok (duplázódó)',
          value: '1, 2, 4, 8, 16, 32, 64 ...'
        },
        {
          id: 'p1-7',
          prompt: '10 többszörösei',
          value: '10, 20, 30, 40, 50, 60 ...'
        },
        {
          id: 'p1-8',
          prompt: '5 többszörösei',
          value: '5, 10, 15, 20, 25, 30 ...'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: NEVEZETES ÉRTÉKEK KISZÁMÍTÁSA
    // ========================================================
    2: {
      title: '2. Szint: Nevezetes Értékek Kiszámítása',
      subtitle: 'Párosítsd a kérdéseket a pontos értékükkel!',
      pairs: [
        {
          id: 'p2-1',
          prompt: 'A 7. négyzetszám értéke',
          value: '7 · 7 = 49'
        },
        {
          id: 'p2-2',
          prompt: 'A 8. négyzetszám értéke',
          value: '8 · 8 = 64'
        },
        {
          id: 'p2-3',
          prompt: 'A 4. háromszögszám (1 + 2 + 3 + 4)',
          value: '10 (például a tekebábuk száma)'
        },
        {
          id: 'p2-4',
          prompt: 'Az 5. háromszögszám (1 + 2 + 3 + 4 + 5)',
          value: '15 pötty a háromszögben'
        },
        {
          id: 'p2-5',
          prompt: 'A Fibonacci-sorozat 8. tagja',
          value: '21 (mivel 8 + 13 = 21)'
        },
        {
          id: 'p2-6',
          prompt: 'A Fibonacci-sorozat 9. tagja',
          value: '34 (mivel 13 + 21 = 34)'
        },
        {
          id: 'p2-7',
          prompt: 'A 10. páros szám értéke',
          value: '2 · 10 = 20'
        },
        {
          id: 'p2-8',
          prompt: 'A 10. páratlan szám értéke',
          value: '2 · 10 - 1 = 19'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: KÜLÖNLEGES MATEMATIKAI KAPCSOLATOK
    // ========================================================
    3: {
      title: '3. Szint: Különleges Kapcsolatok és Összefüggések',
      subtitle: 'Párosítsd a matematikai jelenségeket a magyarázatukkal!',
      pairs: [
        {
          id: 'p3-1',
          prompt: 'Az első 5 páratlan szám összege (1+3+5+7+9)',
          value: '25 = 5² (mindig négyzetszám!)'
        },
        {
          id: 'p3-2',
          prompt: 'Két szomszédos háromszögszám: 3 + 6 összege',
          value: '9 = 3² (mindig négyzetszámot ad!)'
        },
        {
          id: 'p3-3',
          prompt: 'Két szomszédos háromszögszám: 6 + 10 összege',
          value: '16 = 4² (négyzetszám)'
        },
        {
          id: 'p3-4',
          prompt: 'Szomszédos négyzetszámok különbsége: 16 - 9',
          value: '7 (a soron következő páratlan szám)'
        },
        {
          id: 'p3-5',
          prompt: 'Szomszédos négyzetszámok különbsége: 25 - 16',
          value: '9 (páratlan szám)'
        },
        {
          id: 'p3-6',
          prompt: 'Napraforgó magjainak spiráljai',
          value: 'Fibonacci-számok (pl. 34 és 55 párhuzamos ív)'
        },
        {
          id: 'p3-7',
          prompt: 'A 10. háromszögszám értéke',
          value: '55 (ez egyben a 10. Fibonacci-szám is!)'
        },
        {
          id: 'p3-8',
          prompt: 'A 12. négyzetszám (12 · 12)',
          value: '144 (ez egyben a 12. Fibonacci-szám is!)'
        }
      ]
    }
  };

  return (
    <MatcherTemplate
      topicId="g5-loc-famous-seq-quiz"
      title="Nevezetes sorozatok párosító"
      subtitle="Párosítsd a híres sorozatokat, értékeiket és geometriai kapcsolataikat!"
      currentLevel={currentLevel}
      onLevelChange={setCurrentLevel}
      levels={levels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      documentId="grade-5-famous-sequences-matcher"
      storageKey="g5-loc-famous-seq-matcher"
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
};

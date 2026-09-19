import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface FractionsSummaryMatcherProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function FractionsSummaryMatcher({
  onBack,
  onSwitchToQuiz,
  onSwitchToSorter,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: FractionsSummaryMatcherProps) {
  const safeLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
  const [level, setLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
    setLevel(nextLevel);
  }, [propLevel]);

  const levelsConfig: Record<DifficultyLevel, MatcherLevelConfig> = {
    // 1. SZINT: TÖRTEK ÉS TIZEDESEK ALAPMŰVELETEI
    1: {
      level: 1,
      title: 'Törtek és tizedesek alapjai',
      description: 'Párosítsd az egyszerűbb törttani és tizedestörtes feladatokat az eredményükkel!',
      pairs: [
        { id: 'p1-1', prompt: '3/4 + 1/4', value: '1' },
        { id: 'p1-2', prompt: '5/2 vegyes törtben', value: '2 1/2' },
        { id: 'p1-3', prompt: '2/3 · 6', value: '4' },
        { id: 'p1-4', prompt: '4/5 reciproka', value: '5/4' },
        { id: 'p1-5', prompt: '6 : 1/2', value: '12' },
        { id: 'p1-6', prompt: '3,45 · 10', value: '34,5' },
        { id: 'p1-7', prompt: '45 : 100', value: '0,45' },
        { id: 'p1-8', prompt: '1/2 tizedestörtben', value: '0,5' }
      ]
    },

    // 2. SZINT: SZORZÁS, OSZTÁS ÉS TIZEDESTÖRTEK
    2: {
      level: 2,
      title: 'Szorzás, osztás és bővítés',
      description: 'Számítsd ki a törtek és tizedesek szorzását, osztását és zárójeles alakjait!',
      pairs: [
        { id: 'p2-1', prompt: '3/4 · 8/9', value: '2/3' },
        { id: 'p2-2', prompt: '5/6 : 5/12', value: '2' },
        { id: 'p2-3', prompt: '0,3 · 0,4', value: '0,12' },
        { id: 'p2-4', prompt: '4,8 : 0,6', value: '8' },
        { id: 'p2-5', prompt: '3 : 0,25', value: '12' },
        { id: 'p2-6', prompt: '7 : 0,1', value: '70' },
        { id: 'p2-7', prompt: '10 - 2 · 3', value: '4' },
        { id: 'p2-8', prompt: '-(a - b)', value: '-a + b' }
      ]
    },

    // 3. SZINT: ÖSSZETETT ÉS TÖBBZÁRÓJELES MESTERFELADATOK
    3: {
      level: 3,
      title: 'Összetett fejezeti mesterfeladatok',
      description: 'Oldd meg a többszörös zárójeles és vegyes kifejezéseket!',
      pairs: [
        { id: 'p3-1', prompt: '20 - [3 · (4 - 1,5) + 2]', value: '10,5' },
        { id: 'p3-2', prompt: '[(2/3 + 1/3) · 6] : 0,5', value: '12' },
        { id: 'p3-3', prompt: '[3 - (1/2 + 0,5)] · 4', value: '8' },
        { id: 'p3-4', prompt: '2 · [5 - 2 · (1 + 0,5)]', value: '4' },
        { id: 'p3-5', prompt: '15 : [2 · (1,5 + 1)]', value: '3' },
        { id: 'p3-6', prompt: '[1,5 · 4 - (2 - 0,5)] : 0,5', value: '9' },
        { id: 'p3-7', prompt: '[4 - (1/4 + 0,75)] · 5', value: '15' },
        { id: 'p3-8', prompt: '3(x - 2) - 2(x - 3)', value: 'x' }
      ]
    }
  };

  return (
    <MatcherTemplate
      title="II. Fejezet Összefoglaló Párosító"
      subtitle="Keresd meg a törtek és tizedes törtek feladatainak pontos megoldását!"
      badge="🎯 6. Osztály • II. Törtek • Összefoglalás"
      levels={levelsConfig}
      level={level}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onSwitchToTheory={onSwitchToTheory}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
}

export default FractionsSummaryMatcher;

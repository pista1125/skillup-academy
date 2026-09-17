import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface FractionDivideMatcherProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function FractionDivideMatcher({
  onBack,
  onSwitchToQuiz,
  onSwitchToSorter,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: FractionDivideMatcherProps) {
  const safeLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
  const [level, setLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
    setLevel(nextLevel);
  }, [propLevel]);

  const levelsConfig: Record<DifficultyLevel, MatcherLevelConfig> = {
    // 1. SZINT: SZÁMLÁLÓ OSZTÁSA (HA A SZÁMLÁLÓ OSZTHATÓ)
    1: {
      level: 1,
      title: 'Számláló osztása egész számmal',
      description: 'Oszd el a tört számlálóját az egész számmal, a nevezőt hagyd változatlanul!',
      pairs: [
        { id: 'p1-1', prompt: '4/5 : 2', value: '2/5' },
        { id: 'p1-2', prompt: '6/7 : 3', value: '2/7' },
        { id: 'p1-3', prompt: '8/9 : 4', value: '2/9' },
        { id: 'p1-4', prompt: '9/10 : 3', value: '3/10' },
        { id: 'p1-5', prompt: '10/11 : 2', value: '5/11' },
        { id: 'p1-6', prompt: '6/13 : 6', value: '1/13' },
        { id: 'p1-7', prompt: '12/17 : 4', value: '3/17' },
        { id: 'p1-8', prompt: '15/19 : 5', value: '3/19' }
      ]
    },

    // 2. SZINT: NEVEZŐ SZORZÁSA (HA A SZÁMLÁLÓ NEM OSZTHATÓ)
    2: {
      level: 2,
      title: 'Nevező szorzása egész számmal',
      description: 'Szorozd meg a tört nevezőjét az osztóval, a számlálót hagyd változatlanul!',
      pairs: [
        { id: 'p2-1', prompt: '1/3 : 2', value: '1/6' },
        { id: 'p2-2', prompt: '3/4 : 2', value: '3/8' },
        { id: 'p2-3', prompt: '2/5 : 3', value: '2/15' },
        { id: 'p2-4', prompt: '1/4 : 3', value: '1/12' },
        { id: 'p2-5', prompt: '5/7 : 2', value: '5/14' },
        { id: 'p2-6', prompt: '3/5 : 4', value: '3/20' },
        { id: 'p2-7', prompt: '2/7 : 5', value: '2/35' },
        { id: 'p2-8', prompt: '7/10 : 3', value: '7/30' }
      ]
    },

    // 3. SZINT: VEGYES TÖRTEK ÉS EGYSZERŰSÍTÉST IGÉNYLŐ OSZTÁSOK
    3: {
      level: 3,
      title: 'Vegyes törtek és egyszerűsítés',
      description: 'Alakítsd áltörtté a vegyes törtet, végezd el az osztást, majd egyszerűsíts!',
      pairs: [
        { id: 'p3-1', prompt: '1 1/2 : 3', value: '1/2' },
        { id: 'p3-2', prompt: '1 1/3 : 2', value: '2/3' },
        { id: 'p3-3', prompt: '2 1/4 : 3', value: '3/4' },
        { id: 'p3-4', prompt: '1 1/5 : 2', value: '3/5' },
        { id: 'p3-5', prompt: '4/9 : 2', value: '2/9' },
        { id: 'p3-6', prompt: '2 2/3 : 4', value: '2/3' },
        { id: 'p3-7', prompt: '1 3/7 : 5', value: '2/7' },
        { id: 'p3-8', prompt: '3 1/3 : 5', value: '2/3' }
      ]
    }
  };

  return (
    <MatcherTemplate
      level={level}
      levels={levelsConfig}
      title="Tört osztása kártyás párosító"
      subtitle="Keresd meg az összetartozó osztási feladatokat és a legegyszerűbb végeredményeket!"
      badge="➗ 5. Osztály • Törtek"
      topicId="g5-fraction-divide-matcher"
      onBack={onBack}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onSwitchToTheory={onSwitchToTheory}
      themeColor="indigo"
    />
  );
}

export default FractionDivideMatcher;

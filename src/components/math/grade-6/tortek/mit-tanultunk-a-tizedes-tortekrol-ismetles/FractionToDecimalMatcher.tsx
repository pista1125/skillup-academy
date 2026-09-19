import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface FractionToDecimalMatcherProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function FractionToDecimalMatcher({
  onBack,
  onSwitchToQuiz,
  onSwitchToSorter,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: FractionToDecimalMatcherProps) {
  const safeLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
  const [level, setLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
    setLevel(nextLevel);
  }, [propLevel]);

  const levelsConfig: Record<DifficultyLevel, MatcherLevelConfig> = {
    // 1. SZINT: NEVEZETES TÖRTEK ÉS TIZEDES ALAKJAIK
    1: {
      level: 1,
      title: 'Nevezetes törtek és tizedestört alakjaik',
      description: 'Párosítsd a legfontosabb nevezetes közönséges törteket a pontos tizedestört alakjukkal!',
      pairs: [
        { id: 'p1-1', prompt: '1/2', value: '0,5' },
        { id: 'p1-2', prompt: '1/4', value: '0,25' },
        { id: 'p1-3', prompt: '3/4', value: '0,75' },
        { id: 'p1-4', prompt: '1/5', value: '0,2' },
        { id: 'p1-5', prompt: '2/5', value: '0,4' },
        { id: 'p1-6', prompt: '3/5', value: '0,6' },
        { id: 'p1-7', prompt: '4/5', value: '0,8' },
        { id: 'p1-8', prompt: '1/10', value: '0,1' }
      ]
    },

    // 2. SZINT: BŐVÍTÉSSEL ÉS OSZTÁSSAL ÁTVÁLTHATÓ TÖRTEK
    2: {
      level: 2,
      title: 'Nyolcadok, huszadok és huszonötödök',
      description: 'Bővítsd a törtet 10, 100 vagy 1000 nevezőre, majd keresd meg a párját!',
      pairs: [
        { id: 'p2-1', prompt: '1/8', value: '0,125' },
        { id: 'p2-2', prompt: '3/8', value: '0,375' },
        { id: 'p2-3', prompt: '5/8', value: '0,625' },
        { id: 'p2-4', prompt: '7/8', value: '0,875' },
        { id: 'p2-5', prompt: '7/20', value: '0,35' },
        { id: 'p2-6', prompt: '9/25', value: '0,36' },
        { id: 'p2-7', prompt: '3/50', value: '0,06' },
        { id: 'p2-8', prompt: '11/100', value: '0,11' }
      ]
    },

    // 3. SZINT: VEGYES TÖRTEK ÉS TIZEDESTÖRTBŐL KÖZÖNSÉGES TÖRT
    3: {
      level: 3,
      title: 'Vegyes törtek és egyszerűsített törtalakok',
      description: 'Párosítsd a vegyes számokat és az egyszerűsített törtalakokat a megfelelő értékkel!',
      pairs: [
        { id: 'p3-1', prompt: '1 1/2', value: '1,5' },
        { id: 'p3-2', prompt: '2 3/4', value: '2,75' },
        { id: 'p3-3', prompt: '1 1/8', value: '1,125' },
        { id: 'p3-4', prompt: '3 2/5', value: '3,4' },
        { id: 'p3-5', prompt: '0,05', value: '1/20' },
        { id: 'p3-6', prompt: '0,15', value: '3/20' },
        { id: 'p3-7', prompt: '0,08', value: '2/25' },
        { id: 'p3-8', prompt: '0,65', value: '13/20' }
      ]
    }
  };

  return (
    <MatcherTemplate
      title="Tört - Tizedestört Párosító"
      subtitle="Keresd meg az egyenlő értékű közönséges törteket és tizedestörteket!"
      badge="🎯 6. Osztály • II. Törtek"
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

export default FractionToDecimalMatcher;

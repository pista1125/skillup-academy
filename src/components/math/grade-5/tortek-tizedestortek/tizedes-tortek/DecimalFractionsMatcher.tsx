import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface DecimalFractionsMatcherProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function DecimalFractionsMatcher({
  onBack,
  onSwitchToQuiz,
  onSwitchToSorter,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: DecimalFractionsMatcherProps) {
  const safeLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
  const [level, setLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
    setLevel(nextLevel);
  }, [propLevel]);

  const levelsConfig: Record<DifficultyLevel, MatcherLevelConfig> = {
    // 1. SZINT: TIZEDESTÖRT ÉS HELYIÉRTÉKEK
    1: {
      level: 1,
      title: 'Tizedestörtek kiolvasása és helyiértékei',
      description: 'Párosítsd a tizedes törtet a szöveges megnevezésével!',
      pairs: [
        { id: 'p1-1', prompt: '0,3', value: '3 tized' },
        { id: 'p1-2', prompt: '0,05', value: '5 század' },
        { id: 'p1-3', prompt: '0,007', value: '7 ezred' },
        { id: 'p1-4', prompt: '1,4', value: '1 egész 4 tized' },
        { id: 'p1-5', prompt: '2,35', value: '2 egész 35 század' },
        { id: 'p1-6', prompt: '0,12', value: '12 század' },
        { id: 'p1-7', prompt: '0,025', value: '25 ezred' },
        { id: 'p1-8', prompt: '3,08', value: '3 egész 8 század' }
      ]
    },

    // 2. SZINT: TIZEDESTÖRT ÉS KÖZÖNSÉGES TÖRT MEGFELELŐJE
    2: {
      level: 2,
      title: 'Tizedestört és közönséges tört párok',
      description: 'Keresd meg a tizedes tört és a vele egyenlő közönséges tört párját!',
      pairs: [
        { id: 'p2-1', prompt: '0,5', value: '1/2' },
        { id: 'p2-2', prompt: '0,25', value: '1/4' },
        { id: 'p2-3', prompt: '0,75', value: '3/4' },
        { id: 'p2-4', prompt: '0,2', value: '1/5' },
        { id: 'p2-5', prompt: '0,1', value: '1/10' },
        { id: 'p2-6', prompt: '0,01', value: '1/100' },
        { id: 'p2-7', prompt: '0,125', value: '1/8' },
        { id: 'p2-8', prompt: '1,5', value: '1 1/2 (= 3/2)' }
      ]
    },

    // 3. SZINT: HELYIÉRTÉKES FELBONTÁSOK ÉS EGYENLŐ ALAKOK
    3: {
      level: 3,
      title: 'Helyiértékes felbontások és egyenlőségek',
      description: 'Párosítsd a kifejezéseket a megfelelő tizedes tört értékkel!',
      pairs: [
        { id: 'p3-1', prompt: '3 + 0,4 + 0,05', value: '3,45' },
        { id: 'p3-2', prompt: '2 + 5/100', value: '2,05' },
        { id: 'p3-3', prompt: '4 tized + 6 ezred', value: '0,406' },
        { id: 'p3-4', prompt: '0,600 egyszerűsítve', value: '0,6' },
        { id: 'p3-5', prompt: '12 egész 3 tized', value: '12,3' },
        { id: 'p3-6', prompt: '7/10 + 3/100', value: '0,73' },
        { id: 'p3-7', prompt: '1 + 25/1000', value: '1,025' },
        { id: 'p3-8', prompt: '5 tized + 5 század', value: '0,55' }
      ]
    }
  };

  return (
    <MatcherTemplate
      level={level}
      levels={levelsConfig}
      title="Tizedes törtek kártyás párosító"
      subtitle="Keresd meg az összetartozó tizedestörteket, helyiértékeket és törtalakokat!"
      badge="🪙 5. Osztály • Tizedes törtek"
      topicId="g5-decimal-fractions-matcher"
      onBack={onBack}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onSwitchToTheory={onSwitchToTheory}
      themeColor="amber"
    />
  );
}

export default DecimalFractionsMatcher;

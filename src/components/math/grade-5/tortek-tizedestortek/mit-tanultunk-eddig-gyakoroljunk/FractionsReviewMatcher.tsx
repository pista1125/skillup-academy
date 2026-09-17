import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface FractionsReviewMatcherProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function FractionsReviewMatcher({
  onBack,
  onSwitchToQuiz,
  onSwitchToSorter,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: FractionsReviewMatcherProps) {
  const safeLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
  const [level, setLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
    setLevel(nextLevel);
  }, [propLevel]);

  const levelsConfig: Record<DifficultyLevel, MatcherLevelConfig> = {
    // 1. SZINT: ALAPOK ÉS EGYSZERŰ MŰVELETEK
    1: {
      level: 1,
      title: 'Törtalapok és egyszerű műveletek',
      description: 'Párosítsd a kifejezéseket a megfelelő törtalakkal vagy végeredménnyel!',
      pairs: [
        { id: 'p1-1', prompt: '3/4 bővítve 3-mal', value: '9/12' },
        { id: 'p1-2', prompt: '12/16 egyszerűsítve', value: '3/4' },
        { id: 'p1-3', prompt: '2/7 + 3/7', value: '5/7' },
        { id: 'p1-4', prompt: '5/6 - 2/6', value: '1/2' },
        { id: 'p1-5', prompt: '1/3 · 3', value: '1' },
        { id: 'p1-6', prompt: '4/5 : 2', value: '2/5' },
        { id: 'p1-7', prompt: '1/2 + 1/3', value: '5/6' },
        { id: 'p1-8', prompt: '1 1/2 áltörtként', value: '3/2' }
      ]
    },

    // 2. SZINT: KÖZÖS NEVEZŐ ÉS VEGYES TÖRTEK
    2: {
      level: 2,
      title: 'Közönséges tört műveletek és vegyes törtek',
      description: 'Keresd meg az összetartozó feladatokat és a legegyszerűbb alakokat!',
      pairs: [
        { id: 'p2-1', prompt: '2/3 - 1/6', value: '1/2' },
        { id: 'p2-2', prompt: '3/4 : 2', value: '3/8' },
        { id: 'p2-3', prompt: '2/5 · 4', value: '1 3/5 (= 8/5)' },
        { id: 'p2-4', prompt: '1 1/3 + 1 1/6', value: '2 1/2' },
        { id: 'p2-5', prompt: '7/4 vegyes törtként', value: '1 3/4' },
        { id: 'p2-6', prompt: '(1/2 + 1/4) · 4', value: '3' },
        { id: 'p2-7', prompt: '2 - 3/5', value: '1 2/5' },
        { id: 'p2-8', prompt: '6/7 : 3', value: '2/7' }
      ]
    },

    // 3. SZINT: ÖSSZETETT TÖRTSZÁMÍTÁSOK ÉS FEJTÖRŐK
    3: {
      level: 3,
      title: 'Összetett törtszámítások',
      description: 'Végezd el az összetett műveleteket és találd meg a végeredményt!',
      pairs: [
        { id: 'p3-1', prompt: '(3/4 - 1/4) : 2', value: '1/4' },
        { id: 'p3-2', prompt: '2 1/4 : 3', value: '3/4' },
        { id: 'p3-3', prompt: '1 1/2 · 4', value: '6' },
        { id: 'p3-4', prompt: '3/5 + 1/2', value: '1 1/10 (= 11/10)' },
        { id: 'p3-5', prompt: '1 - (1/3 + 1/6)', value: '1/2' },
        { id: 'p3-6', prompt: '1/2 · 6 + 1/4 · 4', value: '4' },
        { id: 'p3-7', prompt: '3 1/3 : 5', value: '2/3' },
        { id: 'p3-8', prompt: '(1/2 + 1/3) · 6', value: '5' }
      ]
    }
  };

  return (
    <MatcherTemplate
      level={level}
      levels={levelsConfig}
      title="Törtek átfogó kártyás párosító"
      subtitle="Keresd meg az összetartozó törtalakokat, műveleteket és végeredményeket!"
      badge="📚 5. Osztály • Törtek összefoglalása"
      topicId="g5-fractions-review-matcher"
      onBack={onBack}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onSwitchToTheory={onSwitchToTheory}
      themeColor="rose"
    />
  );
}

export default FractionsReviewMatcher;

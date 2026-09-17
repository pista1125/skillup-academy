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
  [key: string]: any;
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
    // 1. SZINT: ALAPVETŐ NEVEZETES TÖRTEK
    1: {
      level: 1,
      title: 'Alapvető nevezetes törtek',
      description: 'Párosítsd a közönséges törteket a tizedes tört alakjukkal!',
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

    // 2. SZINT: KÖZEPES – NYOLCADOK, HUSZADOK, HUSZONÖTÖDÖK
    2: {
      level: 2,
      title: 'Nyolcadok és egyéb bővíthető törtek',
      description: 'Találd meg az összetartozó tört és tizedes tört párokat!',
      pairs: [
        { id: 'p2-1', prompt: '1/8', value: '0,125' },
        { id: 'p2-2', prompt: '3/8', value: '0,375' },
        { id: 'p2-3', prompt: '5/8', value: '0,625' },
        { id: 'p2-4', prompt: '7/8', value: '0,875' },
        { id: 'p2-5', prompt: '7/20', value: '0,35' },
        { id: 'p2-6', prompt: '9/25', value: '0,36' },
        { id: 'p2-7', prompt: '3/50', value: '0,06' },
        { id: 'p2-8', prompt: '1/25', value: '0,04' }
      ]
    },

    // 3. SZINT: NEHÉZ – VEGYES TÖRTEK ÉS ÁLTÖRTEK
    3: {
      level: 3,
      title: 'Vegyes törtek és áltörtek tizedes alakja',
      description: 'Párosítsd a vegyes és áltörteket a tizedes alakjukkal!',
      pairs: [
        { id: 'p3-1', prompt: '1 1/2', value: '1,5' },
        { id: 'p3-2', prompt: '2 3/4', value: '2,75' },
        { id: 'p3-3', prompt: '3 1/5', value: '3,2' },
        { id: 'p3-4', prompt: '5/4', value: '1,25' },
        { id: 'p3-5', prompt: '7/2', value: '3,5' },
        { id: 'p3-6', prompt: '11/20', value: '0,55' },
        { id: 'p3-7', prompt: '13/25', value: '0,52' },
        { id: 'p3-8', prompt: '2 1/8', value: '2,125' }
      ]
    }
  };

  const handleNextLevelInternal = () => {
    if (level < 3) {
      setLevel((prev) => (prev + 1) as DifficultyLevel);
    } else if (onNextLevel) {
      onNextLevel();
    }
  };

  return (
    <MatcherTemplate
      title="Tört - Tizedes Átváltó Párosító"
      subtitle="Keresd meg az összetartozó közönséges tört és tizedes tört párokat!"
      levels={levelsConfig}
      currentLevel={level}
      onLevelChange={setLevel}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onSwitchToTheory={onSwitchToTheory}
      onNextLevel={handleNextLevelInternal}
      onOpenRules={onOpenRules}
      topicId="g5-fraction-to-decimal-matcher"
      themeColor="purple"
    />
  );
}
export default FractionToDecimalMatcher;

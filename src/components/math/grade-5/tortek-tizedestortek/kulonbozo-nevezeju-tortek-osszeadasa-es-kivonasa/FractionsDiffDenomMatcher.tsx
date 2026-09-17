import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface FractionsDiffDenomMatcherProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function FractionsDiffDenomMatcher({
  onBack,
  onSwitchToQuiz,
  onSwitchToSorter,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: FractionsDiffDenomMatcherProps) {
  const safeLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
  const [level, setLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
    setLevel(nextLevel);
  }, [propLevel]);

  const levelsConfig: Record<DifficultyLevel, MatcherLevelConfig> = {
    // 1. SZINT: KÖZVETLEN TÖBBSZÖRÖSÖK (EGYIK NEVEZŐ A MÁSIK TÖBBSZÖRÖSE)
    1: {
      level: 1,
      title: 'Többszörös nevezők műveletei',
      description: 'Hozd a törteket közös nevezőre a nagyobbik nevező segítségével, és keresd meg a helyes eredményt!',
      pairs: [
        { id: 'p1-1', prompt: '1/2 + 1/4', value: '3/4' },
        { id: 'p1-2', prompt: '3/4 - 1/2', value: '1/4' },
        { id: 'p1-3', prompt: '1/3 + 1/6', value: '3/6 (= 1/2)' },
        { id: 'p1-4', prompt: '5/6 - 1/3', value: '3/6 (= 1/2)' },
        { id: 'p1-5', prompt: '2/5 + 3/10', value: '7/10' },
        { id: 'p1-6', prompt: '9/10 - 2/5', value: '5/10 (= 1/2)' },
        { id: 'p1-7', prompt: '1/4 + 5/8', value: '7/8' },
        { id: 'p1-8', prompt: '7/8 - 1/2', value: '3/8' }
      ]
    },

    // 2. SZINT: RELATÍV PRÍM ÉS KÖZÖS OSZTÓS NEVEZŐK (LKKT SZÜKSÉGES)
    2: {
      level: 2,
      title: 'LKKT és bővítés mindkét oldalon',
      description: 'Határozd meg a legkisebb közös nevezőt, bővítsd mindkét törtet, és párosítsd az eredménnyel!',
      pairs: [
        { id: 'p2-1', prompt: '1/2 + 1/3', value: '5/6' },
        { id: 'p2-2', prompt: '1/2 - 1/3', value: '1/6' },
        { id: 'p2-3', prompt: '1/3 + 1/4', value: '7/12' },
        { id: 'p2-4', prompt: '3/4 - 1/3', value: '5/12' },
        { id: 'p2-5', prompt: '2/5 + 1/2', value: '9/10' },
        { id: 'p2-6', prompt: '3/4 + 1/6', value: '11/12' },
        { id: 'p2-7', prompt: '5/6 - 3/4', value: '1/12' },
        { id: 'p2-8', prompt: '1/4 + 1/5', value: '9/20' }
      ]
    },

    // 3. SZINT: VEGYES TÖRTEK ÉS ÖSSZETETT KIVONÁSOK
    3: {
      level: 3,
      title: 'Vegyes törtek és összetett feladatok',
      description: 'Számítsd ki a vegyes törtek összegét vagy különbségét különböző nevezők esetén!',
      pairs: [
        { id: 'p3-1', prompt: '1 1/2 + 1 1/3', value: '2 5/6' },
        { id: 'p3-2', prompt: '2 1/4 + 1 1/6', value: '3 5/12' },
        { id: 'p3-3', prompt: '3 1/2 - 1 1/4', value: '2 1/4' },
        { id: 'p3-4', prompt: '2 1/3 - 1 1/2', value: '5/6' },
        { id: 'p3-5', prompt: '1 - 1/3 - 1/4', value: '5/12' },
        { id: 'p3-6', prompt: '2 3/4 - 1 1/3', value: '1 5/12' },
        { id: 'p3-7', prompt: '1 2/5 + 2 1/2', value: '3 9/10' },
        { id: 'p3-8', prompt: '3 1/4 - 1 2/3', value: '1 7/12' }
      ]
    }
  };

  const handleNextLevel = () => {
    if (onNextLevel) {
      onNextLevel();
    } else if (level < 3) {
      setLevel((prev) => (prev + 1) as DifficultyLevel);
    }
  };

  return (
    <MatcherTemplate
      level={level}
      grade={5}
      chapterId="tortek-tizedestortek"
      topicId="g5-diff-denom-matcher"
      badge="➕ 5. Osztály • Különböző nevezőjű törtek műveletei"
      levels={levelsConfig}
      onNextLevel={handleNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onSwitchToTheory={onSwitchToTheory}
      themeColor="teal"
    />
  );
}

export default FractionsDiffDenomMatcher;

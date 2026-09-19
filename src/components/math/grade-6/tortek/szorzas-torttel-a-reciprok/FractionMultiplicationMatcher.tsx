import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface FractionMultiplicationMatcherProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function FractionMultiplicationMatcher({
  onBack,
  onSwitchToQuiz,
  onSwitchToSorter,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: FractionMultiplicationMatcherProps) {
  const safeLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
  const [level, setLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
    setLevel(nextLevel);
  }, [propLevel]);

  const levelsConfig: Record<DifficultyLevel, MatcherLevelConfig> = {
    // 1. SZINT: RECIPROKOK ÉS ALAPSZORZÁSOK
    1: {
      level: 1,
      title: 'Reciprok és alapszorzások',
      description: 'Párosítsd a szorzásokat és a reciprok kifejezéseket a megfelelő értékkel!',
      pairs: [
        { id: 'p1-1', prompt: '3/4 reciproka', value: '4/3' },
        { id: 'p1-2', prompt: '5 reciproka', value: '1/5' },
        { id: 'p1-3', prompt: '1/2 · 1/3', value: '1/6' },
        { id: 'p1-4', prompt: '2/5 · 5', value: '2' },
        { id: 'p1-5', prompt: '3/7 · 2', value: '6/7' },
        { id: 'p1-6', prompt: '2/3 · 3/2 (reciprokok)', value: '1' },
        { id: 'p1-7', prompt: '1/4 · 1/4', value: '1/16' },
        { id: 'p1-8', prompt: '7/9 reciproka', value: '9/7' }
      ]
    },

    // 2. SZINT: KERESZTBE EGYSZERŰSÍTÉS ÉS SZORZATOK
    2: {
      level: 2,
      title: 'Keresztbe egyszerűsítés & szorzatok',
      description: 'Egyszerűsíts keresztbe a szorzás előtt, és keresd meg a legegyszerűbb végeredményt!',
      pairs: [
        { id: 'p2-1', prompt: '3/4 · 8/9', value: '2/3' },
        { id: 'p2-2', prompt: '5/6 · 3/10', value: '1/4' },
        { id: 'p2-3', prompt: '7/8 · 4/7', value: '1/2' },
        { id: 'p2-4', prompt: '2/3 · 9/10', value: '3/5' },
        { id: 'p2-5', prompt: '4/5 · 15/16', value: '3/4' },
        { id: 'p2-6', prompt: '6/7 · 14/18', value: '2/3' },
        { id: 'p2-7', prompt: '3/8 · 4/9', value: '1/6' },
        { id: 'p2-8', prompt: '5/12 · 6/5', value: '1/2' }
      ]
    },

    // 3. SZINT: VEGYES TÖRTEK ÉS ÖSSZETETT KIFEJEZÉSEK
    3: {
      level: 3,
      title: 'Vegyes törtek és összetett szorzatok',
      description: 'Alakítsd áltörtté a vegyes számokat, egyszerűsíts és találd meg a helyes párt!',
      pairs: [
        { id: 'p3-1', prompt: '1 1/2 · 1 1/3', value: '2' },
        { id: 'p3-2', prompt: '2 1/4 · 2/3', value: '1 1/2' },
        { id: 'p3-3', prompt: '1 2/3 reciproka', value: '3/5' },
        { id: 'p3-4', prompt: '2 1/2 · 4/5', value: '2' },
        { id: 'p3-5', prompt: '1 1/4 · 1 3/5', value: '2' },
        { id: 'p3-6', prompt: '2/5 · 5/6 · 3/4', value: '1/4' },
        { id: 'p3-7', prompt: '3 1/3 · 3/10', value: '1' },
        { id: 'p3-8', prompt: '2 2/3 · 3/8', value: '1' }
      ]
    }
  };

  return (
    <MatcherTemplate
      level={level}
      levels={levelsConfig}
      grade={6}
      chapterId="g6-fractions"
      title="Törtek szorzása és reciprok párosító"
      subtitle="Gyakorold a tört szorzást törttel, a keresztbe egyszerűsítést és a reciprokképzést!"
      badge="✖️ 6. Osztály • II. Szorzás törttel, reciprok"
      topicId="g6-fraction-multiplication-matcher"
      onBack={onBack}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onSwitchToTheory={onSwitchToTheory}
      themeColor="blue"
    />
  );
}

export default FractionMultiplicationMatcher;

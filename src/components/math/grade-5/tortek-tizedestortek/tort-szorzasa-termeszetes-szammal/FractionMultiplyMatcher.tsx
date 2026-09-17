import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface FractionMultiplyMatcherProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function FractionMultiplyMatcher({
  onBack,
  onSwitchToQuiz,
  onSwitchToSorter,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: FractionMultiplyMatcherProps) {
  const safeLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
  const [level, setLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
    setLevel(nextLevel);
  }, [propLevel]);

  const levelsConfig: Record<DifficultyLevel, MatcherLevelConfig> = {
    // 1. SZINT: EGYSZERŰ SZORZÁSOK (SZÁMLÁLÓ SZORZÁSA)
    1: {
      level: 1,
      title: 'Számláló szorzása természetes számmal',
      description: 'Szorozd meg a tört számlálóját az egész számmal, a nevezőt hagyd változatlanul!',
      pairs: [
        { id: 'p1-1', prompt: '1/7 · 3', value: '3/7' },
        { id: 'p1-2', prompt: '2/9 · 4', value: '8/9' },
        { id: 'p1-3', prompt: '1/5 · 5', value: '5/5 (= 1)' },
        { id: 'p1-4', prompt: '2/5 · 2', value: '4/5' },
        { id: 'p1-5', prompt: '1/8 · 3', value: '3/8' },
        { id: 'p1-6', prompt: '3/10 · 3', value: '9/10' },
        { id: 'p1-7', prompt: '1/4 · 3', value: '3/4' },
        { id: 'p1-8', prompt: '2/11 · 5', value: '10/11' }
      ]
    },

    // 2. SZINT: NEVEZŐ OSZTÁSÁVAL EGYSZERŰSÍTHETŐ SZORZÁSOK
    2: {
      level: 2,
      title: 'Nevező osztása és egyszerűsítés',
      description: 'Alkalmazd a nevező osztását vagy egyszerűsíts a szorzás után a legegyszerűbb alakig!',
      pairs: [
        { id: 'p2-1', prompt: '3/8 · 2', value: '3/4' },
        { id: 'p2-2', prompt: '5/12 · 3', value: '5/4 (= 1 1/4)' },
        { id: 'p2-3', prompt: '2/9 · 3', value: '2/3' },
        { id: 'p2-4', prompt: '3/10 · 5', value: '3/2 (= 1 1/2)' },
        { id: 'p2-5', prompt: '7/16 · 4', value: '7/4 (= 1 3/4)' },
        { id: 'p2-6', prompt: '5/6 · 3', value: '5/2 (= 2 1/2)' },
        { id: 'p2-7', prompt: '1/6 · 2', value: '1/3' },
        { id: 'p2-8', prompt: '3/4 · 8', value: '6' }
      ]
    },

    // 3. SZINT: VEGYES TÖRTEK ÉS ÖSSZETETT SZORZÁSOK
    3: {
      level: 3,
      title: 'Vegyes törtek és összetett szorzások',
      description: 'Szorozz meg vegyes törteket külön a tagok szorzásával vagy áltört alakban!',
      pairs: [
        { id: 'p3-1', prompt: '1 1/3 · 2', value: '2 2/3' },
        { id: 'p3-2', prompt: '2 1/4 · 2', value: '4 1/2' },
        { id: 'p3-3', prompt: '1 2/5 · 3', value: '4 1/5' },
        { id: 'p3-4', prompt: '2 1/2 · 4', value: '10' },
        { id: 'p3-5', prompt: '3 1/3 · 3', value: '10' },
        { id: 'p3-6', prompt: '1 3/4 · 2', value: '3 1/2' },
        { id: 'p3-7', prompt: '2 2/5 · 2', value: '4 4/5' },
        { id: 'p3-8', prompt: '1 1/6 · 4', value: '4 2/3' }
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
      topicId="g5-frac-mult-matcher"
      badge="✖️ 5. Osztály • Tört szorzása természetes számmal"
      levels={levelsConfig}
      onNextLevel={handleNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onSwitchToTheory={onSwitchToTheory}
      themeColor="purple"
    />
  );
}

export default FractionMultiplyMatcher;

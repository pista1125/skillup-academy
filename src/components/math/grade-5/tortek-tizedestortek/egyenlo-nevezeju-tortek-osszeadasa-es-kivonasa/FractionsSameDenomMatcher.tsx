import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { Sparkles, Trophy, RotateCcw, Plus, Minus, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FractionsSameDenomMatcherProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function FractionsSameDenomMatcher({
  onBack,
  onSwitchToQuiz,
  onSwitchToSorter,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: FractionsSameDenomMatcherProps) {
  const [level, setLevel] = useState<DifficultyLevel>(propLevel || 1);

  useEffect(() => {
    if (propLevel) {
      setLevel(propLevel);
    }
  }, [propLevel]);

  const levelsConfig: Record<DifficultyLevel, MatcherLevelConfig> = {
    // 1. SZINT: ALAPMŰVELETEK AZONOS NEVEZŐVEL
    1: {
      level: 1,
      title: 'Azonos nevezőjű alapműveletek',
      description: 'Párosítsd a műveletet a helyes eredménnyel!',
      pairs: [
        { id: 'p1-1', prompt: '2/5 + 1/5', value: '3/5' },
        { id: 'p1-2', prompt: '7/8 - 3/8', value: '4/8 (= 1/2)' },
        { id: 'p1-3', prompt: '1/4 + 2/4', value: '3/4' },
        { id: 'p1-4', prompt: '5/7 - 2/7', value: '3/7' },
        { id: 'p1-5', prompt: '3/10 + 4/10', value: '7/10' },
        { id: 'p1-6', prompt: '8/9 - 5/9', value: '3/9 (= 1/3)' },
        { id: 'p1-7', prompt: '1/6 + 4/6', value: '5/6' },
        { id: 'p1-8', prompt: '6/7 - 1/7', value: '5/7' }
      ]
    },

    // 2. SZINT: EGÉSZBŐL KIVONÁS ÉS EGYSZERŰSÍTÉS
    2: {
      level: 2,
      title: 'Egészből kivonás és egyszerűsítés',
      description: 'Párosítsd az 1-ből való kivonásokat és az egyszerűsíthető műveleteket!',
      pairs: [
        { id: 'p2-1', prompt: '1 - 2/5', value: '3/5' },
        { id: 'p2-2', prompt: '1 - 3/8', value: '5/8' },
        { id: 'p2-3', prompt: '1 - 4/7', value: '3/7' },
        { id: 'p2-4', prompt: '2 - 1/3', value: '1 2/3' },
        { id: 'p2-5', prompt: '3/8 + 1/8', value: '4/8 (= 1/2)' },
        { id: 'p2-6', prompt: '5/12 + 3/12', value: '8/12 (= 2/3)' },
        { id: 'p2-7', prompt: '9/10 - 3/10', value: '6/10 (= 3/5)' },
        { id: 'p2-8', prompt: '1 - 7/10', value: '3/10' }
      ]
    },

    // 3. SZINT: VEGYES TÖRTEK ÉS ÁLTÖRTEK MŰVELETEI
    3: {
      level: 3,
      title: 'Vegyes törtek és áltörtek műveletei',
      description: 'Párosítsd a vegyes törtek összeadásait és kivonásait az eredménnyel!',
      pairs: [
        { id: 'p3-1', prompt: '1 2/5 + 2 1/5', value: '3 3/5' },
        { id: 'p3-2', prompt: '4 5/7 - 2 2/7', value: '2 3/7' },
        { id: 'p3-3', prompt: '3/4 + 3/4', value: '6/4 (= 1 1/2)' },
        { id: 'p3-4', prompt: '2 1/3 - 2/3', value: '1 2/3' },
        { id: 'p3-5', prompt: '3 - 1 1/4', value: '1 3/4' },
        { id: 'p3-6', prompt: '1 3/8 + 2 5/8', value: '4' },
        { id: 'p3-7', prompt: '4 1/5 - 1 3/5', value: '2 3/5' },
        { id: 'p3-8', prompt: '5/6 + 5/6', value: '10/6 (= 1 2/3)' }
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
      topicId="g5-same-denom-matcher"
      badge="➕ 5. Osztály • Törtek összeadása és kivonása"
      levels={levelsConfig}
      onNextLevel={handleNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onSwitchToTheory={onSwitchToTheory}
      themeColor="amber"
    />
  );
}

export default FractionsSameDenomMatcher;

import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { Sparkles, Trophy, RotateCcw, MoveHorizontal, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FractionsNumberLineMatcherProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function FractionsNumberLineMatcher({
  onBack,
  onSwitchToQuiz,
  onSwitchToSorter,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: FractionsNumberLineMatcherProps) {
  const safeLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
  const [level, setLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
    setLevel(nextLevel);
  }, [propLevel]);

  const levelsConfig: Record<DifficultyLevel, MatcherLevelConfig> = {
    // 1. SZINT: ÁLTÖRT ↔ VEGYES TÖRT ALAPOK
    1: {
      level: 1,
      title: 'Áltört ↔ Vegyes tört alapok',
      description: 'Párosítsd össze az áltörtet és a vele egyenlő vegyes törtet!',
      pairs: [
        { id: 'p1-1', prompt: '5/4', value: '1 1/4' },
        { id: 'p1-2', prompt: '3/2', value: '1 1/2' },
        { id: 'p1-3', prompt: '7/3', value: '2 1/3' },
        { id: 'p1-4', prompt: '8/5', value: '1 3/5' },
        { id: 'p1-5', prompt: '9/4', value: '2 1/4' },
        { id: 'p1-6', prompt: '11/3', value: '3 2/3' },
        { id: 'p1-7', prompt: '7/2', value: '3 1/2' },
        { id: 'p1-8', prompt: '6/5', value: '1 1/5' }
      ]
    },

    // 2. SZINT: SZÁMEGYENES PONTOK ÉS ÉRTÉKEK
    2: {
      level: 2,
      title: 'Számegyenes pontok ↔ Törtértékek',
      description: 'Párosítsd a számegyenesen leírt helyzetet a megfelelő törttel!',
      pairs: [
        { id: 'p2-1', prompt: '1 és 2 felezőpontja', value: '1 1/2 (= 3/2)' },
        { id: 'p2-2', prompt: '2 és 3 között a 3. negyed pont', value: '2 3/4 (= 11/4)' },
        { id: 'p2-3', prompt: '0 és 1 között a 3. ötöd pont', value: '3/5' },
        { id: 'p2-4', prompt: '3 és 4 között az 1. harmad pont', value: '3 1/3 (= 10/3)' },
        { id: 'p2-5', prompt: '1 és 2 között a 4. ötöd pont', value: '1 4/5 (= 9/5)' },
        { id: 'p2-6', prompt: '2 és 3 között a 2. harmad pont', value: '2 2/3 (= 8/3)' },
        { id: 'p2-7', prompt: '4 és 5 felezőpontja', value: '4 1/2 (= 9/2)' },
        { id: 'p2-8', prompt: '1 és 2 között az 1. negyed pont', value: '1 1/4 (= 5/4)' }
      ]
    },

    // 3. SZINT: NAGYOBB VEGYES TÖRTEK ÉS ÁTVÁLTÁSOK
    3: {
      level: 3,
      title: 'Nagyobb vegyes törtek és áltörtek',
      description: 'Párosítsd össze a nagyobb értékű áltörteket a vegyes tört alakjukkal!',
      pairs: [
        { id: 'p3-1', prompt: '23/5', value: '4 3/5' },
        { id: 'p3-2', prompt: '17/4', value: '4 1/4' },
        { id: 'p3-3', prompt: '31/6', value: '5 1/6' },
        { id: 'p3-4', prompt: '19/3', value: '6 1/3' },
        { id: 'p3-5', prompt: '29/7', value: '4 1/7' },
        { id: 'p3-6', prompt: '27/8', value: '3 3/8' },
        { id: 'p3-7', prompt: '35/4', value: '8 3/4' },
        { id: 'p3-8', prompt: '14/3', value: '4 2/3' }
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
      topicId="g5-frac-sec-3-matcher"
      badge="📏 5. Osztály • Törtek a számegyenesen"
      levels={levelsConfig}
      onNextLevel={handleNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onSwitchToTheory={onSwitchToTheory}
      themeColor="blue"
    />
  );
}

export default FractionsNumberLineMatcher;

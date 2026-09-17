import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface DecimalMultiplicationMatcherProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  [key: string]: any;
}

export function DecimalMultiplicationMatcher({
  onBack,
  onSwitchToQuiz,
  onSwitchToSorter,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: DecimalMultiplicationMatcherProps) {
  const safeLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
  const [level, setLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
    setLevel(nextLevel);
  }, [propLevel]);

  const levelsConfig: Record<DifficultyLevel, MatcherLevelConfig> = {
    // 1. SZINT: ALAPOK – 10-ZEL, 100-ZAL ÉS EGYJEGYŰVEL SZORZÁS
    1: {
      level: 1,
      title: 'Alapvető szorzások és 10, 100-as szorzók',
      description: 'Párosítsd a szorzási feladatokat a pontos eredménnyel!',
      pairs: [
        { id: 'p1-1', prompt: '3,4 · 10', value: '34' },
        { id: 'p1-2', prompt: '0,75 · 10', value: '7,5' },
        { id: 'p1-3', prompt: '1,25 · 100', value: '125' },
        { id: 'p1-4', prompt: '0,06 · 100', value: '6' },
        { id: 'p1-5', prompt: '0,4 · 5', value: '2' },
        { id: 'p1-6', prompt: '1,2 · 3', value: '3,6' },
        { id: 'p1-7', prompt: '0,25 · 4', value: '1' },
        { id: 'p1-8', prompt: '2,1 · 4', value: '8,4' }
      ]
    },

    // 2. SZINT: KÖZEPES – ÁTLÉPÉSEK, ZÁRÓ NULLÁK ÉS EZREDEK
    2: {
      level: 2,
      title: 'Többjegyű tizedesek és átlépések',
      description: 'Párosítsd a szorzásokat az egyszerűsített eredménnyel!',
      pairs: [
        { id: 'p2-1', prompt: '2,35 · 4', value: '9,4' },
        { id: 'p2-2', prompt: '0,08 · 25', value: '2' },
        { id: 'p2-3', prompt: '4,15 · 6', value: '24,9' },
        { id: 'p2-4', prompt: '0,005 · 8', value: '0,04' },
        { id: 'p2-5', prompt: '12,5 · 8', value: '100' },
        { id: 'p2-6', prompt: '0,45 · 6', value: '2,7' },
        { id: 'p2-7', prompt: '3,08 · 5', value: '15,4' },
        { id: 'p2-8', prompt: '0,125 · 8', value: '1' }
      ]
    },

    // 3. SZINT: NEHÉZ – KÉTJEGYŰ EGÉSZ SZORZÓK ÉS ÖSSZETETT SZÁMÍTÁSOK
    3: {
      level: 3,
      title: 'Kétjegyű egész szorzók és összetett szorzatok',
      description: 'Számítsd ki és találd meg a megfelelő párokat!',
      pairs: [
        { id: 'p3-1', prompt: '3,25 · 12', value: '39' },
        { id: 'p3-2', prompt: '0,65 · 20', value: '13' },
        { id: 'p3-3', prompt: '4,8 · 15', value: '72' },
        { id: 'p3-4', prompt: '1,05 · 40', value: '42' },
        { id: 'p3-5', prompt: '0,075 · 60', value: '4,5' },
        { id: 'p3-6', prompt: '2,5 · 24', value: '60' },
        { id: 'p3-7', prompt: '0,85 · 50', value: '42,5' },
        { id: 'p3-8', prompt: '15,4 · 25', value: '385' }
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
      title="Tizedes tört szorzása – Párosító játék"
      subtitle="Keresd meg az összetartozó szorzási kifejezéseket és eredményeket!"
      levels={levelsConfig}
      currentLevel={level}
      onLevelChange={setLevel}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onSwitchToTheory={onSwitchToTheory}
      onNextLevel={handleNextLevelInternal}
      onOpenRules={onOpenRules}
      topicId="g5-decimal-multiply-matcher"
      themeColor="emerald"
    />
  );
}
export default DecimalMultiplicationMatcher;

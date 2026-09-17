import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface DecimalDivisionMatcherProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  [key: string]: any;
}

export function DecimalDivisionMatcher({
  onBack,
  onSwitchToQuiz,
  onSwitchToSorter,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: DecimalDivisionMatcherProps) {
  const safeLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
  const [level, setLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
    setLevel(nextLevel);
  }, [propLevel]);

  const levelsConfig: Record<DifficultyLevel, MatcherLevelConfig> = {
    // 1. SZINT: ALAPOK – 10-ZEL, 100-ZAL ÉS EGYJEGYŰVEL OSZTÁS
    1: {
      level: 1,
      title: 'Alapvető osztások és 10, 100-as osztók',
      description: 'Párosítsd az osztási feladatokat a pontos tizedes hányadossal!',
      pairs: [
        { id: 'p1-1', prompt: '45 : 10', value: '4,5' },
        { id: 'p1-2', prompt: '3,2 : 10', value: '0,32' },
        { id: 'p1-3', prompt: '125 : 100', value: '1,25' },
        { id: 'p1-4', prompt: '7 : 100', value: '0,07' },
        { id: 'p1-5', prompt: '6,8 : 2', value: '3,4' },
        { id: 'p1-6', prompt: '9,6 : 3', value: '3,2' },
        { id: 'p1-7', prompt: '1 : 2', value: '0,5' },
        { id: 'p1-8', prompt: '3 : 2', value: '1,5' }
      ]
    },

    // 2. SZINT: KÖZEPES – ÁTLÉPÉSEK, KÖZTES NULLÁK ÉS TÖRTEK TIZEDES ALAKJA
    2: {
      level: 2,
      title: 'Átlépések és tizedes hányadosok',
      description: 'Párosítsd az osztásokat a helyes végeredményükkel!',
      pairs: [
        { id: 'p2-1', prompt: '14,7 : 3', value: '4,9' },
        { id: 'p2-2', prompt: '1,25 : 5', value: '0,25' },
        { id: 'p2-3', prompt: '6,18 : 6', value: '1,03' },
        { id: 'p2-4', prompt: '3 : 4', value: '0,75' },
        { id: 'p2-5', prompt: '15 : 4', value: '3,75' },
        { id: 'p2-6', prompt: '0,8 : 5', value: '0,16' },
        { id: 'p2-7', prompt: '53,4 : 6', value: '8,9' },
        { id: 'p2-8', prompt: '1 : 8', value: '0,125' }
      ]
    },

    // 3. SZINT: NEHÉZ – KÉTJEGYŰ OSZTÓK ÉS ÖSSZETETT TIZEDESEK
    3: {
      level: 3,
      title: 'Kétjegyű egész osztók és összetett osztások',
      description: 'Számítsd ki és párosítsd a pontos hányadosokat!',
      pairs: [
        { id: 'p3-1', prompt: '37,5 : 15', value: '2,5' },
        { id: 'p3-2', prompt: '49,2 : 12', value: '4,1' },
        { id: 'p3-3', prompt: '8,4 : 20', value: '0,42' },
        { id: 'p3-4', prompt: '105 : 25', value: '4,2' },
        { id: 'p3-5', prompt: '2,7 : 18', value: '0,15' },
        { id: 'p3-6', prompt: '54,6 : 14', value: '3,9' },
        { id: 'p3-7', prompt: '18,9 : 9', value: '2,1' },
        { id: 'p3-8', prompt: '96,6 : 21', value: '4,6' }
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
      title="Tizedes tört osztása – Párosító játék"
      subtitle="Keresd meg az összetartozó osztási kifejezéseket és eredményeket!"
      levels={levelsConfig}
      currentLevel={level}
      onLevelChange={setLevel}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onSwitchToTheory={onSwitchToTheory}
      onNextLevel={handleNextLevelInternal}
      onOpenRules={onOpenRules}
      topicId="g5-decimal-divide-matcher"
      themeColor="indigo"
    />
  );
}
export default DecimalDivisionMatcher;

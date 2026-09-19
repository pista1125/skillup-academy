import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface ComplexOperationsMatcherProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function ComplexOperationsMatcher({
  onBack,
  onSwitchToQuiz,
  onSwitchToSorter,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: ComplexOperationsMatcherProps) {
  const safeLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
  const [level, setLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
    setLevel(nextLevel);
  }, [propLevel]);

  const levelsConfig: Record<DifficultyLevel, MatcherLevelConfig> = {
    // 1. SZINT: MŰVELETI SORREND ALAPJAI
    1: {
      level: 1,
      title: 'Műveleti sorrend alapjai',
      description: 'Számítsd ki a kifejezések pontos értékét a helyes műveleti sorrenddel!',
      pairs: [
        { id: 'p1-1', prompt: '10 - 2 · 3', value: '4' },
        { id: 'p1-2', prompt: '(10 - 2) · 3', value: '24' },
        { id: 'p1-3', prompt: '1/2 · 8 + 3', value: '7' },
        { id: 'p1-4', prompt: '1/2 · (8 + 4)', value: '6' },
        { id: 'p1-5', prompt: '5 + 3 · 0,5', value: '6,5' },
        { id: 'p1-6', prompt: '(5 + 1) · 0,5', value: '3' },
        { id: 'p1-7', prompt: '12 : 4 + 2', value: '5' },
        { id: 'p1-8', prompt: '12 : (4 + 2)', value: '2' }
      ]
    },

    // 2. SZINT: ZÁRÓJELFELBONTÁS ÉS TÖRTEK MŰVELETEI
    2: {
      level: 2,
      title: 'Zárójelfelbontás és vegyes műveletek',
      description: 'Ügyelj a zárójel előtti előjelekre és a törtek átváltására!',
      pairs: [
        { id: 'p2-1', prompt: '1 - (1/2 - 1/4)', value: '3/4' },
        { id: 'p2-2', prompt: '2 · (3/4 + 1/4)', value: '2' },
        { id: 'p2-3', prompt: '3 - (0,5 + 1,2)', value: '1,3' },
        { id: 'p2-4', prompt: '4 · 0,5 + 3/2', value: '3,5' },
        { id: 'p2-5', prompt: '(5/6 - 1/6) · 6', value: '4' },
        { id: 'p2-6', prompt: '10 - (4 - 1,5)', value: '7,5' },
        { id: 'p2-7', prompt: '3/5 · (10 - 5)', value: '3' },
        { id: 'p2-8', prompt: '(2,4 + 1,6) : 0,5', value: '8' }
      ]
    },

    // 3. SZINT: EMELETES ÉS TÖBBSZÖRÖS ZÁRÓJELEK
    3: {
      level: 3,
      title: 'Összetett és többzárójeles kifejezések',
      description: 'Haladj belülről kifelé a kerek és szögletes zárójelek felbontásában!',
      pairs: [
        { id: 'p3-1', prompt: '[10 - (2 + 3)] · 2', value: '10' },
        { id: 'p3-2', prompt: '15 : [2 · (1,5 + 1)]', value: '3' },
        { id: 'p3-3', prompt: '[3 - (1/2 + 0,5)] · 4', value: '8' },
        { id: 'p3-4', prompt: '2 · [5 - 2 · (1 + 0,5)]', value: '4' },
        { id: 'p3-5', prompt: '[(2/3 + 1/3) · 6] : 0,5', value: '12' },
        { id: 'p3-6', prompt: '20 - [3 · (4 - 1) + 5]', value: '6' },
        { id: 'p3-7', prompt: '[1,5 · 4 - (2 - 0,5)] : 0,5', value: '9' },
        { id: 'p3-8', prompt: '[4 - (1/4 + 0,75)] · 5', value: '15' }
      ]
    }
  };

  return (
    <MatcherTemplate
      title="Összetett Műveletek Párosító"
      subtitle="Párosítsd a kifejezéseket a pontos számítási eredményükkel!"
      badge="🎯 6. Osztály • II. Törtek"
      levels={levelsConfig}
      level={level}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onSwitchToTheory={onSwitchToTheory}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
}

export default ComplexOperationsMatcher;

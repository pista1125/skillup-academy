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
    // 1. SZINT: SZORZÁS 10, 100, 1000-REL ÉS EGÉSZ SZÁMMAL
    1: {
      level: 1,
      title: 'Szorzás 10-zel, 100-zal, 1000-rel és természetes számmal',
      description: 'Tolódik a tizedesvessző vagy szorzunk egész számmal: találd meg a helyes szorzatot!',
      pairs: [
        { id: 'p1-1', prompt: '3,4 · 10', value: '34' },
        { id: 'p1-2', prompt: '0,25 · 100', value: '25' },
        { id: 'p1-3', prompt: '1,2 · 3', value: '3,6' },
        { id: 'p1-4', prompt: '0,05 · 1000', value: '50' },
        { id: 'p1-5', prompt: '2,5 · 4', value: '10' },
        { id: 'p1-6', prompt: '0,15 · 2', value: '0,3' },
        { id: 'p1-7', prompt: '7,8 · 10', value: '78' },
        { id: 'p1-8', prompt: '0,4 · 5', value: '2' }
      ]
    },

    // 2. SZINT: KÉT TIZEDESTÖRT SZORZÁSA
    2: {
      level: 2,
      title: 'Két tizedestört szorzása (Tizedesjegyek összeadása)',
      description: 'Szorozd össze a számokat a vesszők nélkül, majd tedd ki a megfelelő számú tizedesjegyet!',
      pairs: [
        { id: 'p2-1', prompt: '0,3 · 0,4', value: '0,12' },
        { id: 'p2-2', prompt: '0,2 · 0,5', value: '0,1' },
        { id: 'p2-3', prompt: '0,6 · 0,7', value: '0,42' },
        { id: 'p2-4', prompt: '0,04 · 0,3', value: '0,012' },
        { id: 'p2-5', prompt: '1,5 · 0,2', value: '0,3' },
        { id: 'p2-6', prompt: '0,8 · 0,9', value: '0,72' },
        { id: 'p2-7', prompt: '0,5 · 0,5', value: '0,25' },
        { id: 'p2-8', prompt: '0,25 · 0,4', value: '0,1' }
      ]
    },

    // 3. SZINT: SZORZÁS 0,1-GYEL, 0,01-GYEL ÉS VEGYES TIZEDESTÖRT-SZORZATOK
    3: {
      level: 3,
      title: 'Szorzás 0,1-gyel, 0,01-gyel és többjegyű tizedesekkel',
      description: 'Számítsd ki a szorzatot és keresd meg a pontos párt!',
      pairs: [
        { id: 'p3-1', prompt: '45 · 0,1', value: '4,5' },
        { id: 'p3-2', prompt: '230 · 0,01', value: '2,3' },
        { id: 'p3-3', prompt: '1,2 · 1,2', value: '1,44' },
        { id: 'p3-4', prompt: '2,5 · 1,2', value: '3' },
        { id: 'p3-5', prompt: '0,05 · 0,06', value: '0,003' },
        { id: 'p3-6', prompt: '0,2 · 0,3 · 0,4', value: '0,024' },
        { id: 'p3-7', prompt: '0,15 · 0,4', value: '0,06' },
        { id: 'p3-8', prompt: '3,5 · 0,2', value: '0,7' }
      ]
    }
  };

  return (
    <MatcherTemplate
      title="Tizedestört Szorzás Párosító"
      subtitle="Keresd meg a tizedestört-szorzások pontos eredményét!"
      badge="⚡ 6. Osztály • II. Törtek"
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

export default DecimalMultiplicationMatcher;

import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface OrderOfOperationsFractionsMatcherProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function OrderOfOperationsFractionsMatcher({
  onBack,
  onSwitchToQuiz,
  onSwitchToSorter,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: OrderOfOperationsFractionsMatcherProps) {
  const safeLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
  const [level, setLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
    setLevel(nextLevel);
  }, [propLevel]);

  const levelsConfig: Record<DifficultyLevel, MatcherLevelConfig> = {
    // 1. SZINT: SZORZÁS / OSZTÁS ÉS ÖSSZEADÁS / KIVONÁS ZÁRÓJEL NÉLKÜL
    1: {
      level: 1,
      title: 'Szorzás és osztás prioritása',
      description: 'Először a szorzást vagy osztást végezd el, majd az összeadást vagy kivonást!',
      pairs: [
        { id: 'p1-1', prompt: '1/4 + 1/4 · 3', value: '1' },
        { id: 'p1-2', prompt: '1/2 + 1/2 : 2', value: '3/4' },
        { id: 'p1-3', prompt: '3/4 - 1/2 : 2', value: '1/2' },
        { id: 'p1-4', prompt: '1/3 + 2/3 · 2', value: '5/3 (= 1 2/3)' },
        { id: 'p1-5', prompt: '1 - 1/4 · 2', value: '1/2' },
        { id: 'p1-6', prompt: '2/5 + 1/5 : 2', value: '1/2' },
        { id: 'p1-7', prompt: '3/8 + 1/8 · 5', value: '1' },
        { id: 'p1-8', prompt: '2/3 - 1/3 : 2', value: '1/2' }
      ]
    },

    // 2. SZINT: ZÁRÓJELES KIFEJEZÉSEK
    2: {
      level: 2,
      title: 'Zárójeles kifejezések',
      description: 'Először mindig a zárójelben lévő műveletet számítsd ki!',
      pairs: [
        { id: 'p2-1', prompt: '(1/2 + 1/4) · 4', value: '3' },
        { id: 'p2-2', prompt: '(3/4 - 1/4) : 2', value: '1/4' },
        { id: 'p2-3', prompt: '(1/3 + 1/6) · 6', value: '3' },
        { id: 'p2-4', prompt: '(2/5 + 3/5) : 4', value: '1/4' },
        { id: 'p2-5', prompt: '6 · (1/2 - 1/3)', value: '1' },
        { id: 'p2-6', prompt: '(5/8 - 1/8) : 2', value: '1/4' },
        { id: 'p2-7', prompt: '(1/3 + 2/3) · 5', value: '5' },
        { id: 'p2-8', prompt: '(4/5 - 1/5) : 3', value: '1/5' }
      ]
    },

    // 3. SZINT: ÖSSZETETT TÖBBLÉPÉSES KIFEJEZÉSEK
    3: {
      level: 3,
      title: 'Összetett műveletsorok',
      description: 'Kövesd a teljes műveleti sorrendet több tagú és zárójeles feladatoknál!',
      pairs: [
        { id: 'p3-1', prompt: '1/2 · 4 + 1/3 · 6', value: '4' },
        { id: 'p3-2', prompt: '2 - (1/2 + 1/4)', value: '1 1/4' },
        { id: 'p3-3', prompt: '(1/2 + 1/3) : 5', value: '1/6' },
        { id: 'p3-4', prompt: '3 · 1/4 + 2 · 1/4', value: '5/4 (= 1 1/4)' },
        { id: 'p3-5', prompt: '1 - (1/3 + 1/6)', value: '1/2' },
        { id: 'p3-6', prompt: '(1 - 1/5) : 2', value: '2/5' },
        { id: 'p3-7', prompt: '1/2 + (1 - 3/4)', value: '3/4' },
        { id: 'p3-8', prompt: '2 · (1/2 + 1/4)', value: '1 1/2' }
      ]
    }
  };

  return (
    <MatcherTemplate
      level={level}
      levels={levelsConfig}
      title="Műveleti sorrend kártyás párosító"
      subtitle="Párosítsd a kifejezéseket a helyes végeredményükkel!"
      badge="🔢 5. Osztály • Törtek"
      topicId="g5-fractions-order-of-operations-matcher"
      onBack={onBack}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onSwitchToTheory={onSwitchToTheory}
      themeColor="violet"
    />
  );
}

export default OrderOfOperationsFractionsMatcher;

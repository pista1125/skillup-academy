import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface DecimalAdditionSubtractionMatcherProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  [key: string]: any;
}

export function DecimalAdditionSubtractionMatcher({
  onBack,
  onSwitchToQuiz,
  onSwitchToSorter,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: DecimalAdditionSubtractionMatcherProps) {
  const safeLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
  const [level, setLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
    setLevel(nextLevel);
  }, [propLevel]);

  const levelsConfig: Record<DifficultyLevel, MatcherLevelConfig> = {
    // 1. SZINT: ALAPOK – ÁTLÉPÉS NÉLKÜLI ÖSSZEADÁS ÉS KIVONÁS
    1: {
      level: 1,
      title: 'Egyszerű összeadások és kivonások',
      description: 'Párosítsd a műveleteket a helyes végeredményükkel!',
      pairs: [
        { id: 'p1-1', prompt: '3,2 + 1,5', value: '4,7' },
        { id: 'p1-2', prompt: '5,8 - 2,3', value: '3,5' },
        { id: 'p1-3', prompt: '0,4 + 0,5', value: '0,9' },
        { id: 'p1-4', prompt: '1,0 - 0,3', value: '0,7' },
        { id: 'p1-5', prompt: '6,1 + 2,4', value: '8,5' },
        { id: 'p1-6', prompt: '9,7 - 4,5', value: '5,2' },
        { id: 'p1-7', prompt: '2,3 + 5,5', value: '7,8' },
        { id: 'p1-8', prompt: '4,9 - 3,1', value: '1,8' }
      ]
    },

    // 2. SZINT: KÖZEPES – ÁTLÉPÉSSEL ÉS NULLÁK PÓTLÁSÁVAL
    2: {
      level: 2,
      title: 'Átlépéses műveletek és kiegészítések',
      description: 'Párosítsd az átlépéses összeadásokat és kivonásokat az eredménnyel!',
      pairs: [
        { id: 'p2-1', prompt: '4,8 + 2,7', value: '7,5' },
        { id: 'p2-2', prompt: '8,3 - 3,8', value: '4,5' },
        { id: 'p2-3', prompt: '3,45 + 1,2', value: '4,65' },
        { id: 'p2-4', prompt: '5 - 1,4', value: '3,6' },
        { id: 'p2-5', prompt: '10 - 2,75', value: '7,25' },
        { id: 'p2-6', prompt: '0,65 + 0,85', value: '1,5' },
        { id: 'p2-7', prompt: '12,4 - 6,9', value: '5,5' },
        { id: 'p2-8', prompt: '7,15 + 2,9', value: '10,05' }
      ]
    },

    // 3. SZINT: HALADÓ – TÖBBJEGYŰ ÉS EZREDES MŰVELETEK
    3: {
      level: 3,
      title: 'Összetett és ezredes műveletek',
      description: 'Párosítsd a pontos eredményeket a kifejezésekkel!',
      pairs: [
        { id: 'p3-1', prompt: '12,45 + 7,8', value: '20,25' },
        { id: 'p3-2', prompt: '15,1 - 6,85', value: '8,25' },
        { id: 'p3-3', prompt: '0,785 + 0,215', value: '1,000' },
        { id: 'p3-4', prompt: '4,02 - 1,985', value: '2,035' },
        { id: 'p3-5', prompt: '25,6 + 14,88', value: '40,48' },
        { id: 'p3-6', prompt: '50 - 18,45', value: '31,55' },
        { id: 'p3-7', prompt: '3,456 + 2,544', value: '6,000' },
        { id: 'p3-8', prompt: '8,05 - 3,79', value: '4,26' }
      ]
    }
  };

  return (
    <MatcherTemplate
      level={level}
      grade={5}
      chapterId="tortek-tizedestortek"
      topicId="g5-decimal-add-sub-matcher"
      title="Tizedes törtek összeadása és kivonása Párosító"
      subtitle="Keresd meg a műveletekhez tartozó pontos végeredményeket!"
      badge="➕➖ 5. Osztály • Tizedes törtek összeadása, kivonása"
      levels={levelsConfig}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onSwitchToTheory={onSwitchToTheory}
      themeColor="cyan"
    />
  );
}

export default DecimalAdditionSubtractionMatcher;

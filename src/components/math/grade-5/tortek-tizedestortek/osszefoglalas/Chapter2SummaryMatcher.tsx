import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface Chapter2SummaryMatcherProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  [key: string]: any;
}

export function Chapter2SummaryMatcher({
  onBack,
  onSwitchToQuiz,
  onSwitchToSorter,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: Chapter2SummaryMatcherProps) {
  const safeLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
  const [level, setLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
    setLevel(nextLevel);
  }, [propLevel]);

  const levelsConfig: Record<DifficultyLevel, MatcherLevelConfig> = {
    // 1. SZINT: NEVEZETES TÖRTEK ÉS TIZEDES ALAKJUK
    1: {
      level: 1,
      title: 'Nevezetes törtek és tizedes tört alakok',
      description: 'Párosítsd a közönséges törteket a tizedes tört alakjukkal!',
      pairs: [
        { id: 'p1-1', prompt: '1/2', value: '0,5' },
        { id: 'p1-2', prompt: '1/4', value: '0,25' },
        { id: 'p1-3', prompt: '3/4', value: '0,75' },
        { id: 'p1-4', prompt: '1/5', value: '0,2' },
        { id: 'p1-5', prompt: '4/5', value: '0,8' },
        { id: 'p1-6', prompt: '1/8', value: '0,125' },
        { id: 'p1-7', prompt: '7/10', value: '0,7' },
        { id: 'p1-8', prompt: '9/100', value: '0,09' }
      ]
    },

    // 2. SZINT: FEJEZETI MŰVELETEK ÉS EREDMÉNYEIK
    2: {
      level: 2,
      title: 'Műveletek eredményei',
      description: 'Párosítsd a matematikai műveletet a pontos eredménnyel!',
      pairs: [
        { id: 'p2-1', prompt: '1/3 + 1/6', value: '1/2 (3/6)' },
        { id: 'p2-2', prompt: '3/4 - 1/2', value: '1/4' },
        { id: 'p2-3', prompt: '2/5 · 2', value: '4/5' },
        { id: 'p2-4', prompt: '6/7 : 3', value: '2/7' },
        { id: 'p2-5', prompt: '0,4 + 0,35', value: '0,75' },
        { id: 'p2-6', prompt: '1,2 - 0,45', value: '0,75' },
        { id: 'p2-7', prompt: '0,3 · 4', value: '1,2' },
        { id: 'p2-8', prompt: '4,8 : 4', value: '1,2' }
      ]
    },

    // 3. SZINT: VEGYES ÉS ÖSSZETETT TÉMAZÁRÓ PÁROK
    3: {
      level: 3,
      title: 'Vegyes és összetett kifejezések',
      description: 'Párosítsd az egyenértékű matematikai kifejezéseket!',
      pairs: [
        { id: 'p3-1', prompt: '1 1/2 + 0,75', value: '2,25' },
        { id: 'p3-2', prompt: '2 1/4 - 0,5', value: '1,75' },
        { id: 'p3-3', prompt: '0,25 · 8', value: '2,0' },
        { id: 'p3-4', prompt: '3,6 : 10', value: '0,36' },
        { id: 'p3-5', prompt: '0,07 · 100', value: '7,0' },
        { id: 'p3-6', prompt: '5/2', value: '2,5' },
        { id: 'p3-7', prompt: '7/4', value: '1,75' },
        { id: 'p3-8', prompt: '1/4 + 1/5', value: '0,45' }
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
      title="Törtek és tizedestörtek – Összefoglaló Párosító"
      subtitle="Keresd meg az összetartozó matematikai kifejezéseket és eredményeket!"
      levels={levelsConfig}
      currentLevel={level}
      onLevelChange={setLevel}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onSwitchToTheory={onSwitchToTheory}
      onNextLevel={handleNextLevelInternal}
      onOpenRules={onOpenRules}
      topicId="g5-chapter2-summary-matcher"
      themeColor="purple"
    />
  );
}
export default Chapter2SummaryMatcher;

import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface FractionDivisionMatcherProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function FractionDivisionMatcher({
  onBack,
  onSwitchToQuiz,
  onSwitchToSorter,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: FractionDivisionMatcherProps) {
  const safeLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
  const [level, setLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
    setLevel(nextLevel);
  }, [propLevel]);

  const levelsConfig: Record<DifficultyLevel, MatcherLevelConfig> = {
    // 1. SZINT: ALAP OSZTÁSOK ÉS OSZTÁS EGÉSZ SZÁMMAL
    1: {
      level: 1,
      title: 'Alap osztások és osztás egész számmal',
      description: 'Párosítsd az osztásokat a pontos hányadossal!',
      pairs: [
        { id: 'p1-1', prompt: '1/2 : 1/4', value: '2' },
        { id: 'p1-2', prompt: '2/3 : 1/3', value: '2' },
        { id: 'p1-3', prompt: '4/5 : 2', value: '2/5' },
        { id: 'p1-4', prompt: '3/7 : 2', value: '3/14' },
        { id: 'p1-5', prompt: '3/4 : 3/4', value: '1' },
        { id: 'p1-6', prompt: '1 : 1/3', value: '3' },
        { id: 'p1-7', prompt: '4 : 1/2', value: '8' },
        { id: 'p1-8', prompt: '6/7 : 3', value: '2/7' }
      ]
    },

    // 2. SZINT: TÖRT OSZTÁSA TÖRTTEL ÉS KERESZTBE EGYSZERŰSÍTÉS
    2: {
      level: 2,
      title: 'Tört osztása törttel & keresztbe egyszerűsítés',
      description: 'Fordítsd meg az osztót (reciprok), egyszerűsíts keresztbe és keresd a párt!',
      pairs: [
        { id: 'p2-1', prompt: '3/4 : 9/8', value: '2/3' },
        { id: 'p2-2', prompt: '5/6 : 10/3', value: '1/4' },
        { id: 'p2-3', prompt: '7/10 : 14/5', value: '1/4' },
        { id: 'p2-4', prompt: '2/3 : 4/9', value: '1 1/2 (= 3/2)' },
        { id: 'p2-5', prompt: '4/5 : 8/15', value: '1 1/2 (= 3/2)' },
        { id: 'p2-6', prompt: '3/8 : 9/16', value: '2/3' },
        { id: 'p2-7', prompt: '5/12 : 5/6', value: '1/2' },
        { id: 'p2-8', prompt: '6/7 : 2/7', value: '3' }
      ]
    },

    // 3. SZINT: VEGYES TÖRTEK OSZTÁSA ÉS ÖSSZETETT KIFEJEZÉSEK
    3: {
      level: 3,
      title: 'Vegyes törtek osztása & összetett kifejezések',
      description: 'Alakítsd áltörtté a vegyes számokat, szorozz a reciprokkal és találd meg a helyes hányadost!',
      pairs: [
        { id: 'p3-1', prompt: '2 1/2 : 1 1/4', value: '2' },
        { id: 'p3-2', prompt: '3 1/3 : 5', value: '2/3' },
        { id: 'p3-3', prompt: '1 1/2 : 3/4', value: '2' },
        { id: 'p3-4', prompt: '2 1/4 : 3/8', value: '6' },
        { id: 'p3-5', prompt: '1 2/3 : 5/6', value: '2' },
        { id: 'p3-6', prompt: '1 3/5 : 2 2/3', value: '3/5' },
        { id: 'p3-7', prompt: '3 1/2 : 7/4', value: '2' },
        { id: 'p3-8', prompt: '2 2/3 : 1 1/3', value: '2' }
      ]
    }
  };

  return (
    <MatcherTemplate
      level={level}
      levels={levelsConfig}
      grade={6}
      chapterId="g6-fractions"
      title="Törtek osztása párosító"
      subtitle="Gyakorold a tört osztást egész számmal és törttel, a reciprokkal való szorzást!"
      badge="➗ 6. Osztály • II. Osztás törttel"
      topicId="g6-fraction-division-matcher"
      onBack={onBack}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onSwitchToTheory={onSwitchToTheory}
      themeColor="indigo"
    />
  );
}

export default FractionDivisionMatcher;

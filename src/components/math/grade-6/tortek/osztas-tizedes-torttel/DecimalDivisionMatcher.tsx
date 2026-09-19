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
    // 1. SZINT: OSZTÁS 10, 100, 1000-REL ÉS EGÉSZ SZÁMMAL
    1: {
      level: 1,
      title: 'Osztás 10-zel, 100-zal és természetes számmal',
      description: 'Léptesd a vesszőt balra vagy oszd el a számot: keresd meg a pontos hányadost!',
      pairs: [
        { id: 'p1-1', prompt: '4,5 : 10', value: '0,45' },
        { id: 'p1-2', prompt: '36 : 100', value: '0,36' },
        { id: 'p1-3', prompt: '8,4 : 2', value: '4,2' },
        { id: 'p1-4', prompt: '7,5 : 3', value: '2,5' },
        { id: 'p1-5', prompt: '120 : 1000', value: '0,12' },
        { id: 'p1-6', prompt: '6,3 : 9', value: '0,7' },
        { id: 'p1-7', prompt: '0,8 : 4', value: '0,2' },
        { id: 'p1-8', prompt: '15,5 : 5', value: '3,1' }
      ]
    },

    // 2. SZINT: OSZTÁS TIZEDES TÖRTTEL (BŐVÍTÉSSEL)
    2: {
      level: 2,
      title: 'Osztás tizedes törttel (Bővítés egész osztóra)',
      description: 'Bővítsd az osztást úgy, hogy az osztó egész legyen, majd keresd meg a párt!',
      pairs: [
        { id: 'p2-1', prompt: '4,8 : 0,6', value: '8' },
        { id: 'p2-2', prompt: '2,4 : 0,4', value: '6' },
        { id: 'p2-3', prompt: '0,35 : 0,7', value: '0,5' },
        { id: 'p2-4', prompt: '3 : 0,5', value: '6' },
        { id: 'p2-5', prompt: '1,2 : 0,3', value: '4' },
        { id: 'p2-6', prompt: '0,72 : 0,9', value: '0,8' },
        { id: 'p2-7', prompt: '2,5 : 0,5', value: '5' },
        { id: 'p2-8', prompt: '0,36 : 0,06', value: '6' }
      ]
    },

    // 3. SZINT: OSZTÁS 0,1-GYEL, 0,01-GYEL ÉS KÉTJEGYŰ TIZEDESEK
    3: {
      level: 3,
      title: 'Osztás 0,1-gyel, 0,01-gyel és összetett hányadosok',
      description: 'Számítsd ki a hányadost és párosítsd a megfelelő értékkel!',
      pairs: [
        { id: 'p3-1', prompt: '7 : 0,1', value: '70' },
        { id: 'p3-2', prompt: '4,5 : 0,01', value: '450' },
        { id: 'p3-3', prompt: '1,2 : 0,04', value: '30' },
        { id: 'p3-4', prompt: '0,15 : 0,05', value: '3' },
        { id: 'p3-5', prompt: '6 : 0,25', value: '24' },
        { id: 'p3-6', prompt: '0,08 : 0,2', value: '0,4' },
        { id: 'p3-7', prompt: '10 : 0,2', value: '50' },
        { id: 'p3-8', prompt: '0,09 : 0,03', value: '3' }
      ]
    }
  };

  return (
    <MatcherTemplate
      title="Tizedestört Osztás Párosító"
      subtitle="Keresd meg a tizedestört-osztások pontos eredményét!"
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

export default DecimalDivisionMatcher;

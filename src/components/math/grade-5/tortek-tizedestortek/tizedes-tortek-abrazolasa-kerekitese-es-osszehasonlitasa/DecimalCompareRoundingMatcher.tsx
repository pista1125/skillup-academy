import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface DecimalCompareRoundingMatcherProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  [key: string]: any;
}

export function DecimalCompareRoundingMatcher({
  onBack,
  onSwitchToQuiz,
  onSwitchToSorter,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: DecimalCompareRoundingMatcherProps) {
  const safeLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
  const [level, setLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
    setLevel(nextLevel);
  }, [propLevel]);

  const levelsConfig: Record<DifficultyLevel, MatcherLevelConfig> = {
    // 1. SZINT: ALAPOK – EGÉSZRE KEREKÍTÉS ÉS SZÁMEGYENES
    1: {
      level: 1,
      title: 'Egészre kerekítés és alapösszehasonlítás',
      description: 'Párosítsd a kifejezéseket és kerekítéseket a megfelelő értékekkel!',
      pairs: [
        { id: 'p1-1', prompt: '3,8 egészre kerekítve', value: '4' },
        { id: 'p1-2', prompt: '5,2 egészre kerekítve', value: '5' },
        { id: 'p1-3', prompt: '7,5 egészre kerekítve', value: '8' },
        { id: 'p1-4', prompt: '1,49 egészre kerekítve', value: '1' },
        { id: 'p1-5', prompt: '9,61 egészre kerekítve', value: '10' },
        { id: 'p1-6', prompt: 'Melyik nagyobb: 2,8 vagy 2,15?', value: '2,8' },
        { id: 'p1-7', prompt: 'Melyik kisebb: 0,4 vagy 0,09?', value: '0,09' },
        { id: 'p1-8', prompt: 'Számegyenesen 0 és 1 pontos fele', value: '0,5' }
      ]
    },

    // 2. SZINT: KÖZEPES – TIZEDRE KEREKÍTÉS ÉS RELÁCIÓK
    2: {
      level: 2,
      title: 'Tizedre kerekítés és relációs kifejezések',
      description: 'Párosítsd a tizedes törteket a tizedre kerekített alakjukkal és helyes értékükkel!',
      pairs: [
        { id: 'p2-1', prompt: '4,73 tizedre kerekítve', value: '4,7' },
        { id: 'p2-2', prompt: '6,28 tizedre kerekítve', value: '6,3' },
        { id: 'p2-3', prompt: '0,45 tizedre kerekítve', value: '0,5' },
        { id: 'p2-4', prompt: '8,96 tizedre kerekítve', value: '9,0' },
        { id: 'p2-5', prompt: '3,4 kiegészítve századokig', value: '3,40' },
        { id: 'p2-6', prompt: 'Melyik nagyobb: 3,4 vagy 3,38?', value: '3,4' },
        { id: 'p2-7', prompt: '12,04 tizedre kerekítve', value: '12,0' },
        { id: 'p2-8', prompt: 'Számegyenesen 3,2 és 3,3 közepe', value: '3,25' }
      ]
    },

    // 3. SZINT: HALADÓ – SZÁZADRA KEREKÍTÉS ÉS ÖSSZETETT TULAJDONSÁGOK
    3: {
      level: 3,
      title: 'Századra kerekítés és precíz összehasonlítás',
      description: 'Párosítsd a feladatokat a századra kerekített pontos értékükkel!',
      pairs: [
        { id: 'p3-1', prompt: '5,426 századra kerekítve', value: '5,43' },
        { id: 'p3-2', prompt: '2,814 századra kerekítve', value: '2,81' },
        { id: 'p3-3', prompt: '0,398 századra kerekítve', value: '0,40' },
        { id: 'p3-4', prompt: '7,996 századra kerekítve', value: '8,00' },
        { id: 'p3-5', prompt: 'Melyik a legnagyobb: 0,5; 0,489; 0,099?', value: '0,5' },
        { id: 'p3-6', prompt: 'Melyik a legkisebb: 1,02; 1,009; 1,2?', value: '1,009' },
        { id: 'p3-7', prompt: '15,705 századra kerekítve', value: '15,71' },
        { id: 'p3-8', prompt: 'Számegyenesen 0,7 és 0,8 pontos fele', value: '0,75' }
      ]
    }
  };

  return (
    <MatcherTemplate
      level={level}
      grade={5}
      chapterId="tortek-tizedestortek"
      topicId="g5-decimal-compare-rounding-matcher"
      title="Tizedes törtek összehasonlítása és kerekítése Párosító"
      subtitle="Keresd meg az összetartozó tizedes tört párokat és kerekítéseket!"
      badge="📏 5. Osztály • Tizedes törtek összehasonlítása és kerekítése"
      levels={levelsConfig}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onSwitchToTheory={onSwitchToTheory}
      themeColor="blue"
    />
  );
}

export default DecimalCompareRoundingMatcher;

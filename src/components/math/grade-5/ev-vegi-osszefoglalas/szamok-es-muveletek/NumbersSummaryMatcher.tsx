import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface NumbersSummaryMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const NumbersSummaryMatcher: React.FC<NumbersSummaryMatcherProps> = ({
  onBack,
  onSwitchToTheory,
  level,
  onNextLevel,
  onOpenRules
}) => {
  const safeLevel: DifficultyLevel = (typeof level === 'number' ? level : ((level as any)?.level ?? 1)) as DifficultyLevel;
  const [currentLevel, setCurrentLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof level === 'number' ? level : ((level as any)?.level ?? 1)) as DifficultyLevel;
    setCurrentLevel(nextLevel);
  }, [level]);

  const levels: Record<DifficultyLevel, MatcherLevelConfig> = {
    // ========================================================
    // 1. SZINT: RÓMAI SZÁMOK ÉS ALAPFOGALMAK
    // ========================================================
    1: {
      title: '1. Szint: Római számok és alapfogalmak',
      subtitle: 'Párosítsd a római számokat és alapfogalmakat a pontos arab számértékükkel!',
      pairs: [
        {
          id: 'p1-1',
          prompt: 'IV',
          value: '4 (kivonás: 5 − 1)'
        },
        {
          id: 'p1-2',
          prompt: 'IX',
          value: '9 (kivonás: 10 − 1)'
        },
        {
          id: 'p1-3',
          prompt: 'XL',
          value: '40 (kivonás: 50 − 10)'
        },
        {
          id: 'p1-4',
          prompt: 'XC',
          value: '90 (kivonás: 100 − 10)'
        },
        {
          id: 'p1-5',
          prompt: 'CD',
          value: '400 (kivonás: 500 − 100)'
        },
        {
          id: 'p1-6',
          prompt: 'M',
          value: '1 000 (ezer)'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: HELYIÉRTÉK ÉS KEREKÍTÉS
    // ========================================================
    2: {
      title: '2. Szint: Helyiérték és kerekítés',
      subtitle: 'Párosítsd a számokat a megadott helyiértékre kerekített értékükkel!',
      pairs: [
        {
          id: 'p2-1',
          prompt: '482 tízesekre kerekítve',
          value: '480 (mert 2 < 5 lefelé)'
        },
        {
          id: 'p2-2',
          prompt: '485 tízesekre kerekítve',
          value: '490 (mert 5 felfelé kerekít)'
        },
        {
          id: 'p2-3',
          prompt: '1 349 százasokra kerekítve',
          value: '1 300 (mert a tízesek helyén 4 áll)'
        },
        {
          id: 'p2-4',
          prompt: '1 350 százasokra kerekítve',
          value: '1 400 (mert a tízesek helyén 5 áll)'
        },
        {
          id: 'p2-5',
          prompt: '9 876 ezresekre kerekítve',
          value: '10 000 (mert a százasok helyén 8 áll)'
        },
        {
          id: 'p2-6',
          prompt: 'Valódi érték a 4 520-ban az 5-ösnek',
          value: '500 (5 × 100 százas)'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: ELŐJELES SZÁMOK ÉS MŰVELETI EREDMÉNYEK
    // ========================================================
    3: {
      title: '3. Szint: Műveleti sorrend és negatív számok',
      subtitle: 'Párosítsd a kifejezéseket a pontos végeredményükkel!',
      pairs: [
        {
          id: 'p3-1',
          prompt: '20 + 5 · 2',
          value: '30 (előbb a szorzás: 5 · 2 = 10)'
        },
        {
          id: 'p3-2',
          prompt: '(20 + 5) · 2',
          value: '50 (előbb a zárójel: 25 · 2 = 50)'
        },
        {
          id: 'p3-3',
          prompt: '−8 ellentettje',
          value: '+8 (nullától mért azonos távolság)'
        },
        {
          id: 'p3-4',
          prompt: '|−15| abszolút érték',
          value: '15 (távolság, soha nem negatív)'
        },
        {
          id: 'p3-5',
          prompt: '(+4) + (−9)',
          value: '−5 (4 Ft vagyon és 9 Ft tartozás)'
        },
        {
          id: 'p3-6',
          prompt: '(−6) − (−2)',
          value: '−4 (adósság elvétele enyhíti a hiányt)'
        }
      ]
    }
  };

  return (
    <MatcherTemplate
      title="Számok és műveletek párosító"
      subtitle="Gyakorold az alapfogalmakat, helyiértéket és negatív számokat!"
      badgeText="5. OSZTÁLY • VIII. TÉMAKÖR • PÁROSÍTÓ JÁTÉK"
      themeColor="blue"
      currentLevel={currentLevel}
      onLevelChange={setCurrentLevel}
      levels={levels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
};

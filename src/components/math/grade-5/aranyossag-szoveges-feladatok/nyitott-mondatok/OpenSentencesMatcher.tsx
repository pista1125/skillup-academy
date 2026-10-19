import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface OpenSentencesMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const OpenSentencesMatcher: React.FC<OpenSentencesMatcherProps> = ({
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
    // 1. SZINT: EGYSZERŰ EGYENLETEK ÉS MEGOLDÁSAIK
    // ========================================================
    1: {
      title: '1. Szint: Egyszerű egyenletek és ismeretlenek',
      subtitle: 'Párosítsd a nyitott egyenlőséget az ismeretlen pontos értékével!',
      pairs: [
        {
          id: 'p1-1',
          prompt: 'x + 14 = 30',
          value: 'x = 16 (30 − 14 = 16)'
        },
        {
          id: 'p1-2',
          prompt: 'y − 9 = 21',
          value: 'y = 30 (21 + 9 = 30)'
        },
        {
          id: 'p1-3',
          prompt: '3 · a = 27',
          value: 'a = 9 (27 : 3 = 9)'
        },
        {
          id: 'p1-4',
          prompt: 'b : 5 = 8',
          value: 'b = 40 (8 · 5 = 40)'
        },
        {
          id: 'p1-5',
          prompt: '50 − x = 22',
          value: 'x = 28 (50 − 22 = 28)'
        },
        {
          id: 'p1-6',
          prompt: '48 : y = 6',
          value: 'y = 8 (48 : 6 = 8)'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: EGYENLŐTLENSÉGEK ÉS MEGOLDÁSHALMAZOK
    // ========================================================
    2: {
      title: '2. Szint: Egyenlőtlenségek a természetes számok halmazán',
      subtitle: 'Keresd meg a relációhoz tartozó helyes megoldáshalmazt!',
      pairs: [
        {
          id: 'p2-1',
          prompt: 'x + 4 < 9',
          value: 'x ∈ {0; 1; 2; 3; 4}'
        },
        {
          id: 'p2-2',
          prompt: 'a + 8 ≤ 10',
          value: 'a ∈ {0; 1; 2}'
        },
        {
          id: 'p2-3',
          prompt: '2 · y < 8',
          value: 'y ∈ {0; 1; 2; 3}'
        },
        {
          id: 'p2-4',
          prompt: '15 − b > 11',
          value: 'b ∈ {0; 1; 2; 3}'
        },
        {
          id: 'p2-5',
          prompt: '3 · x ≥ 12 és x ≤ 6',
          value: 'x ∈ {4; 5; 6}'
        },
        {
          id: 'p2-6',
          prompt: 'y + 10 = 5 (a természetes számok között)',
          value: 'I = ∅ (üres halmaz, nincs ilyen természetes szám)'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: FOGALMAK ÉS MŰVELETI SZABÁLYOK
    // ========================================================
    3: {
      title: '3. Szint: Fogalmak és levezetési szabályok',
      subtitle: 'Párosítsd a fogalmat a helyes matematikai leírásával!',
      pairs: [
        {
          id: 'p3-1',
          prompt: 'Nyitott mondat',
          value: 'Ismeretlent tartalmazó állítás, mely behelyettesítéssel válik igazzá vagy hamissá'
        },
        {
          id: 'p3-2',
          prompt: 'Alaphalmaz (A)',
          value: 'Azon számok halmaza, amelyek közül az ismeretlen értékeit választhatjuk'
        },
        {
          id: 'p3-3',
          prompt: 'Igazsághalmaz (I)',
          value: 'Az alaphalmaz azon elemei, melyek behelyettesítve igazzá teszik az állítást'
        },
        {
          id: 'p3-4',
          prompt: 'Mérlegelv alapja',
          value: 'Mindkét oldalhoz ugyanazt hozzáadva vagy elvéve az egyensúly megmarad'
        },
        {
          id: 'p3-5',
          prompt: 'Fordított művelet összeadásnál',
          value: 'Kivonással határozzuk meg az ismeretlen összeadandót'
        },
        {
          id: 'p3-6',
          prompt: 'Fordított művelet szorzásnál',
          value: 'Osztással határozzuk meg az ismeretlen szorzótényezőt'
        }
      ]
    }
  };

  const currentConfig = levels[currentLevel] || levels[1];

  return (
    <MatcherTemplate
      title="Nyitott Mondatok Párosító"
      subtitle={currentConfig.subtitle}
      pairs={currentConfig.pairs}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onComplete={onNextLevel}
      level={currentLevel}
      onLevelChange={(lvl) => setCurrentLevel(lvl)}
      onOpenRules={onOpenRules}
    />
  );
};

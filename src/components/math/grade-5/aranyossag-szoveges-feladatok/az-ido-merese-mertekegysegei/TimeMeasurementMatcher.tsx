import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface TimeMeasurementMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const TimeMeasurementMatcher: React.FC<TimeMeasurementMatcherProps> = ({
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
    // 1. SZINT: ALAPVETŐ IDŐEGYSÉGEK ÉS FOGALMAK
    // ========================================================
    1: {
      title: '1. Szint: Alapvető időegységek és jeleik',
      subtitle: 'Párosítsd az idő mértékegységeit és fogalmait a pontos jelentésükkel!',
      pairs: [
        {
          id: 'p1-1',
          prompt: 'Másodperc (s)',
          value: 'Az idő SI alapegysége, 1 perc pontosan 60 másodpercből áll'
        },
        {
          id: 'p1-2',
          prompt: 'Perc (min)',
          value: '60 másodpercből álló egység, 1 órában 60 perc van'
        },
        {
          id: 'p1-3',
          prompt: 'Óra (h)',
          value: '60 perc = 3600 másodperc, a nap 24 órából áll (latin: hora)'
        },
        {
          id: 'p1-4',
          prompt: 'Nap (d)',
          value: '24 óra, amíg a Föld egyszer megfordul a saját tengelye körül (latin: dies)'
        },
        {
          id: 'p1-5',
          prompt: 'Szökőév',
          value: '366 napos év, amelyben a február nem 28, hanem 29 napos (általában 4 évente)'
        },
        {
          id: 'p1-6',
          prompt: 'Évszázad és Évezred',
          value: '100 naptári év, illetve 1000 naptári év összefoglaló elnevezése'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: EGYENLŐ IDŐTARTAMOK ÉS ÁTVÁLTÁSOK
    // ========================================================
    2: {
      title: '2. Szint: Egyenlő időtartamok és tört órák',
      subtitle: 'Keresd meg az azonos időtartamot kifejező értékpárokat!',
      pairs: [
        {
          id: 'p2-1',
          prompt: 'Fél óra (1/2 h)',
          value: '30 perc (1800 másodperc)'
        },
        {
          id: 'p2-2',
          prompt: 'Negyed óra (1/4 h)',
          value: '15 perc (900 másodperc)'
        },
        {
          id: 'p2-3',
          prompt: 'Háromnegyed óra (3/4 h)',
          value: '45 perc (2700 másodperc)'
        },
        {
          id: 'p2-4',
          prompt: '1 teljes óra',
          value: '3600 másodperc (60 · 60 s)'
        },
        {
          id: 'p2-5',
          prompt: '1 nap',
          value: '1440 perc (24 · 60 min)'
        },
        {
          id: 'p2-6',
          prompt: '2 és fél óra',
          value: '150 perc (120 + 30 min)'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: IDŐTARTAMOK A MINDENNAPOKBAN ÉS A TERMÉSZETBEN
    // ========================================================
    3: {
      title: '3. Szint: Időtartamok a valóságban és naptárban',
      subtitle: 'Párosítsd a valós tevékenységeket, természeti jelenségeket a becsült idejükkel!',
      pairs: [
        {
          id: 'p3-1',
          prompt: 'Egy nyugalmi szívverés',
          value: 'Körülbelül 1 másodperc (percenként kb. 70-80 dobbanás)'
        },
        {
          id: 'p3-2',
          prompt: 'Egy általános iskolai tanóra',
          value: 'Pontosan 45 perc'
        },
        {
          id: 'p3-3',
          prompt: 'Egy felnőtt focimeccs játékideje',
          value: '90 perc (kétszer 45 perces félidő)'
        },
        {
          id: 'p3-4',
          prompt: 'Egy egész hét órákban',
          value: '168 óra (7 · 24 óra)'
        },
        {
          id: 'p3-5',
          prompt: 'Egy teljes évszak hossza',
          value: 'Körülbelül 3 naptári hónap (kb. 90-92 nap)'
        },
        {
          id: 'p3-6',
          prompt: 'Február hossza szökőévben',
          value: '29 nap (sima évben 28 nap)'
        }
      ]
    }
  };

  const currentConfig = levels[currentLevel] || levels[1];

  return (
    <MatcherTemplate
      title="Időmérés és Időtartam Párosító"
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

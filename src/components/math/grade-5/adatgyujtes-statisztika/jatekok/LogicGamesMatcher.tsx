import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface LogicGamesMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const LogicGamesMatcher: React.FC<LogicGamesMatcherProps> = ({
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
    // 1. SZINT: ALAPFOGALMAK ÉS JELÖLÉSEK
    // ========================================================
    1: {
      title: '1. Szint: Alapfogalmak és jelölések',
      subtitle: 'Párosítsd a logikai játékok és halmazok alapfogalmait a pontos jelentésükkel!',
      pairs: [
        {
          id: 'p1-1',
          prompt: 'Logikai készlet 🧩',
          value: '4 forma × 4 szín × 2 méret × 2 lyukasság = 64 különböző lap'
        },
        {
          id: 'p1-2',
          prompt: 'Metszet (A ∩ B) ⭕',
          value: 'Közös rész: mindkét halmaz tulajdonságával rendelkezik (ÉS kapcsolat)'
        },
        {
          id: 'p1-3',
          prompt: 'Unió (A ∪ B) 🧺',
          value: 'Egyesítés: legalább az egyik halmazban benne van (VAGY kapcsolat)'
        },
        {
          id: 'p1-4',
          prompt: 'Üres halmaz (∅) 🚫',
          value: 'Olyan halmaz, amelynek egyetlen eleme sincs'
        },
        {
          id: 'p1-5',
          prompt: 'Eleme jelölés (∈) 📌',
          value: 'Azt fejezi ki, hogy az adott elem beletartozik a halmazba (pl. 4 ∈ Páros)'
        },
        {
          id: 'p1-6',
          prompt: 'Egykülönbséges pár 🔀',
          value: 'Két kártya, amely a 4 tulajdonság közül pontosan egyben különbözik'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: VENN- ÉS CARROLL-DIAGRAMOK, LOGIKAI SZABÁLYOK
    // ========================================================
    2: {
      title: '2. Szint: Diagramok és logikai szabályok',
      subtitle: 'Keresd meg a diagramrészletekhez és logikai elvekhez tartozó leírásokat!',
      pairs: [
        {
          id: 'p2-1',
          prompt: 'Csak az A halmaz (A \\ B)',
          value: 'Olyan elemek, amelyek A-ban benne vannak, de B-ben nincsenek'
        },
        {
          id: 'p2-2',
          prompt: 'Külső tartomány',
          value: 'Az alaphalmaz azon elemei, amelyek sem az A, sem a B feltételnek nem felelnek meg'
        },
        {
          id: 'p2-3',
          prompt: 'Részhalmaz (A ⊆ B)',
          value: 'Az A halmaz minden eleme egyben a B halmaznak is eleme'
        },
        {
          id: 'p2-4',
          prompt: 'Diszjunkt halmazok',
          value: 'Két halmaz, amelyeknek nincs közös eleme (a metszetük üres halmaz)'
        },
        {
          id: 'p2-5',
          prompt: 'Carroll-diagram',
          value: 'Két tulajdonság és ellentettjeik szerinti 2×2-es rendező táblázat'
        },
        {
          id: 'p2-6',
          prompt: 'Skatulya-elv',
          value: 'Ha 2 színű zokniból 3-at húzunk a sötétben, biztosan lesz egy pár'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: KONKRÉT HALMAZOK ÉS ELEMEIK
    // ========================================================
    3: {
      title: '3. Szint: Konkrét halmazok és elemeik',
      subtitle: 'Párosítsd a halmazmeghatározásokat a pontos elemlistákkal vagy darabszámokkal!',
      pairs: [
        {
          id: 'p3-1',
          prompt: '10-nél kisebb prímszámok halmaza',
          value: '{2, 3, 5, 7} (pontosan 4 darab prímszám)'
        },
        {
          id: 'p3-2',
          prompt: 'Páros ÉS 3-mal osztható számok 1–20 között',
          value: '{6, 12, 18} (a 6 többszörösei a metszetben)'
        },
        {
          id: 'p3-3',
          prompt: '20 összes pozitív osztójának halmaza',
          value: '{1, 2, 4, 5, 10, 20} (6 elemű halmaz)'
        },
        {
          id: 'p3-4',
          prompt: '10-nél nem nagyobb négyzetszámok (pozitívak)',
          value: '{1, 4, 9} (1², 2², 3²)'
        },
        {
          id: 'p3-5',
          prompt: 'Piros ÉS kör alakú lapok a készletben',
          value: '4 darab (nagy teli, nagy lyukas, kis teli, kis lyukas)'
        },
        {
          id: 'p3-6',
          prompt: 'Kétjegyű kerek tízesek halmaza',
          value: '{10, 20, 30, 40, 50, 60, 70, 80, 90} (9 darab szám)'
        }
      ]
    }
  };

  const handleLevelChange = (lvl: DifficultyLevel) => {
    setCurrentLevel(lvl);
    if (onNextLevel && lvl > currentLevel) {
      onNextLevel();
    }
  };

  return (
    <MatcherTemplate
      levels={levels}
      currentLevel={currentLevel}
      onLevelChange={handleLevelChange}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onOpenRules={onOpenRules}
    />
  );
};

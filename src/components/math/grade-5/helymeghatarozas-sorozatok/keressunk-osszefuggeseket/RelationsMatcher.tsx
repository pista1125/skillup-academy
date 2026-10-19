import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface RelationsMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const RelationsMatcher: React.FC<RelationsMatcherProps> = ({
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
    // 1. SZINT: SZÁMGÉPEK ÉS BEMENET-KIMENET PÁROK
    // ========================================================
    1: {
      title: '1. Szint: Számgépek Működése',
      subtitle: 'Párosítsd a szabályt és bemenetet a megfelelő kimenő értékkel!',
      pairs: [
        {
          id: 'p1-1',
          prompt: 'x &rarr; 2 · x + 1 (bemenet: 4)',
          value: 'Kimenet: 2 · 4 + 1 = 9'
        },
        {
          id: 'p1-2',
          prompt: 'x &rarr; 3 · x - 1 (bemenet: 5)',
          value: 'Kimenet: 3 · 5 - 1 = 14'
        },
        {
          id: 'p1-3',
          prompt: 'x &rarr; x + 7 (bemenet: 8)',
          value: 'Kimenet: 8 + 7 = 15'
        },
        {
          id: 'p1-4',
          prompt: 'x &rarr; 4 · x (bemenet: 6)',
          value: 'Kimenet: 4 · 6 = 24'
        },
        {
          id: 'p1-5',
          prompt: 'x &rarr; x : 2 + 5 (bemenet: 10)',
          value: 'Kimenet: 10 : 2 + 5 = 10'
        },
        {
          id: 'p1-6',
          prompt: 'x &rarr; 5 · x - 3 (bemenet: 2)',
          value: 'Kimenet: 5 · 2 - 3 = 7'
        },
        {
          id: 'p1-7',
          prompt: 'x &rarr; (x + 2) · 3 (bemenet: 3)',
          value: 'Kimenet: (3 + 2) · 3 = 15'
        },
        {
          id: 'p1-8',
          prompt: 'x &rarr; 10 - x (bemenet: 3)',
          value: 'Kimenet: 10 - 3 = 7'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: SZÖVEGES ÉS KÉPLETTEL MEGADOTT SZABÁLYOK
    // ========================================================
    2: {
      title: '2. Szint: Képletek és Szöveges Szabályok',
      subtitle: 'Párosítsd a matematikai képleteket a szöveges magyarázatukkal és inverzükkel!',
      pairs: [
        {
          id: 'p2-1',
          prompt: 'y = 2 · x + 3',
          value: 'A bemenő szám kétszereséhez hozzáadunk 3-at'
        },
        {
          id: 'p2-2',
          prompt: 'y = 3 · x - 4',
          value: 'A bemenő szám háromszorosából kivonunk 4-et'
        },
        {
          id: 'p2-3',
          prompt: 'K = 4 · a',
          value: 'A négyzet oldalhossza és kerülete közötti összefüggés'
        },
        {
          id: 'p2-4',
          prompt: 'y = (x + 1) · 2',
          value: 'A bemenő számnál eggyel nagyobb érték kétszerese'
        },
        {
          id: 'p2-5',
          prompt: 'y = x : 3',
          value: 'A bemenő számot elharmadoljuk (harmadrésze)'
        },
        {
          id: 'p2-6',
          prompt: 'x = (y - 1) : 2',
          value: 'Az y = 2x + 1 szabály fordítottja (visszafelé számolás)'
        },
        {
          id: 'p2-7',
          prompt: 'x = y + 5',
          value: 'Az y = x - 5 szabály fordítottja (inverze)'
        },
        {
          id: 'p2-8',
          prompt: 'y = 3 · n + 1',
          value: 'Egy sorban összekapcsolt n darab négyzet gyufaszálai'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: REJTETT SZABÁLYOK ÉS GEOMETRIAI KÉPLETEK
    // ========================================================
    3: {
      title: '3. Szint: Rejtett Szabályok és Feladványok',
      subtitle: 'Párosítsd a táblázatokat és alakzatokat a rejtett szabállyal!',
      pairs: [
        {
          id: 'p3-1',
          prompt: 'Táblázat: 1 &rarr; 4, 2 &rarr; 7, 3 &rarr; 10',
          value: 'Rejtett összefüggés: y = 3 · x + 1'
        },
        {
          id: 'p3-2',
          prompt: 'Táblázat: 1 &rarr; 3, 2 &rarr; 8, 3 &rarr; 13',
          value: 'Rejtett összefüggés: y = 5 · x - 2'
        },
        {
          id: 'p3-3',
          prompt: 'Táblázat: 2 &rarr; 5, 4 &rarr; 9, 6 &rarr; 13',
          value: 'Rejtett összefüggés: y = 2 · x + 1'
        },
        {
          id: 'p3-4',
          prompt: 'Táblázat: 1 &rarr; 1, 2 &rarr; 4, 3 &rarr; 9, 4 &rarr; 16',
          value: 'Rejtett összefüggés: y = x · x (négyzetszámok)'
        },
        {
          id: 'p3-5',
          prompt: '10 négyzetből álló gyufaszál lánc',
          value: '3 · 10 + 1 = 31 gyufaszál szükséges hozzá'
        },
        {
          id: 'p3-6',
          prompt: '5 háromszögből álló gyufaszál lánc',
          value: '2 · 5 + 1 = 11 gyufaszál szükséges hozzá'
        },
        {
          id: 'p3-7',
          prompt: '2 · x + 5 = 17 esetén mi volt a bemenet?',
          value: 'Visszafelé: (17 - 5) : 2 = 6'
        },
        {
          id: 'p3-8',
          prompt: '3 · x - 4 = 20 esetén mi volt a bemenet?',
          value: 'Visszafelé: (20 + 4) : 3 = 8'
        }
      ]
    }
  };

  return (
    <MatcherTemplate
      topicId="g5-loc-relations-quiz"
      title="Keressünk összefüggéseket! párosító"
      subtitle="Párosítsd a szabályokat, táblázatokat és kimeneteket!"
      currentLevel={currentLevel}
      onLevelChange={setCurrentLevel}
      levels={levels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      documentId="grade-5-relations-matcher"
      storageKey="g5-loc-relations-matcher"
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
};

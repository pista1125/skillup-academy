import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface SequencesMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const SequencesMatcher: React.FC<SequencesMatcherProps> = ({
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
    // 1. SZINT: EGYSZERŰ SOROZATOK ÉS KÉPZÉSI SZABÁLYOK
    // ========================================================
    1: {
      title: '1. Szint: Sorozatok és Képzési Szabályaik',
      subtitle: 'Párosítsd a sorozatokat a helyes képzési szabályukkal!',
      pairs: [
        {
          id: 'p1-1',
          prompt: '3, 6, 9, 12, 15 ...',
          value: 'Kezdőtag: 3, szabály: +3 (hármasával növekszik)'
        },
        {
          id: 'p1-2',
          prompt: '5, 10, 15, 20, 25 ...',
          value: 'Kezdőtag: 5, szabály: +5 (ötösével növekszik)'
        },
        {
          id: 'p1-3',
          prompt: '50, 45, 40, 35, 30 ...',
          value: 'Kezdőtag: 50, szabály: -5 (ötösével csökken)'
        },
        {
          id: 'p1-4',
          prompt: '100, 90, 80, 70, 60 ...',
          value: 'Kezdőtag: 100, szabály: -10 (tízesével csökken)'
        },
        {
          id: 'p1-5',
          prompt: '2, 4, 8, 16, 32 ...',
          value: 'Kezdőtag: 2, szabály: ·2 (minden lépésben duplázódik)'
        },
        {
          id: 'p1-6',
          prompt: '80, 40, 20, 10, 5 ...',
          value: 'Kezdőtag: 80, szabály: :2 (minden lépésben feleződik)'
        },
        {
          id: 'p1-7',
          prompt: '1, 4, 7, 10, 13 ...',
          value: 'Kezdőtag: 1, szabály: +3'
        },
        {
          id: 'p1-8',
          prompt: '30, 26, 22, 18, 14 ...',
          value: 'Kezdőtag: 30, szabály: -4'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: HIÁNYZÓ TAGOK FELDERÍTÉSE
    // ========================================================
    2: {
      title: '2. Szint: Hiányzó Tagok Felderítése',
      subtitle: 'Párosítsd a hiányos sorozatokat a hiányzó elem értékével!',
      pairs: [
        {
          id: 'p2-1',
          prompt: '4, [?], 12, 16, 20 ...',
          value: 'A hiányzó tag: 8 (a lépésköz +4)'
        },
        {
          id: 'p2-2',
          prompt: '10, 17, [?], 31, 38 ...',
          value: 'A hiányzó tag: 24 (a lépésköz +7)'
        },
        {
          id: 'p2-3',
          prompt: '60, 52, 44, [?], 28 ...',
          value: 'A hiányzó tag: 36 (a lépésköz -8)'
        },
        {
          id: 'p2-4',
          prompt: '3, 9, [?], 81, 243 ...',
          value: 'A hiányzó tag: 27 (a szabály: ·3 szorzás)'
        },
        {
          id: 'p2-5',
          prompt: '1, 2, 4, 7, [?], 16 ...',
          value: 'A hiányzó tag: 11 (lépésközök: +1, +2, +3, +4, +5)'
        },
        {
          id: 'p2-6',
          prompt: '2, 6, 12, 20, [?] ...',
          value: 'A hiányzó tag: 30 (lépésközök: +4, +6, +8, +10)'
        },
        {
          id: 'p2-7',
          prompt: '100, [?], 25, 12.5 ...',
          value: 'A hiányzó tag: 50 (a szabály: :2 felezés)'
        },
        {
          id: 'p2-8',
          prompt: '15, 21, 27, 33, [?] ...',
          value: 'A következő tag: 39 (a lépésköz +6)'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: KÉPLETEK ÉS ÖSSZETETT SZABÁLYOK
    // ========================================================
    3: {
      title: '3. Szint: Képletek és Rejtett Szabályok',
      subtitle: 'Párosítsd az általános képleteket és különleges sorozatokat a tagjaikkal!',
      pairs: [
        {
          id: 'p3-1',
          prompt: 'a_n = 2 · n (páros számok)',
          value: '2, 4, 6, 8, 10, 12, 14 ...'
        },
        {
          id: 'p3-2',
          prompt: 'a_n = 2 · n - 1 (páratlan számok)',
          value: '1, 3, 5, 7, 9, 11, 13 ...'
        },
        {
          id: 'p3-3',
          prompt: 'a_n = 3 · n + 1 képlet',
          value: '4, 7, 10, 13, 16, 19 ...'
        },
        {
          id: 'p3-4',
          prompt: 'a_n = 5 · n - 2 képlet',
          value: '3, 8, 13, 18, 23, 28 ...'
        },
        {
          id: 'p3-5',
          prompt: 'a_n = 100 - 5 · n képlet',
          value: '95, 90, 85, 80, 75, 70 ...'
        },
        {
          id: 'p3-6',
          prompt: '2, 3, 5, 9, 17, 33 ... szabálya',
          value: 'A lépésközök minden lépésben duplázódnak (+1, +2, +4, +8, +16)'
        },
        {
          id: 'p3-7',
          prompt: 'Váltakozó szabály: +5, majd -2 felváltva',
          value: '1, 6, 4, 9, 7, 12, 10 ...'
        },
        {
          id: 'p3-8',
          prompt: 'Kakukktojás: 3, 6, 9, 13, 15 sorban',
          value: 'A 13 hibás tag, a helyes érték 12 lenne'
        }
      ]
    }
  };

  return (
    <MatcherTemplate
      topicId="g5-loc-sequences-quiz"
      title="Sorozatok párosító"
      subtitle="Párosítsd a sorozatokat, szabályokat és hiányzó tagokat!"
      currentLevel={currentLevel}
      onLevelChange={setCurrentLevel}
      levels={levels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      documentId="grade-5-sequences-matcher"
      storageKey="g5-loc-sequences-matcher"
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
};

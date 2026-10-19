import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface RhythmPatternsMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const RhythmPatternsMatcher: React.FC<RhythmPatternsMatcherProps> = ({
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
    // 1. SZINT: SORMINTÁK ALAPMOTÍVUMAI ÉS PERIÓDUSHOSSZA
    // ========================================================
    1: {
      title: '1. Szint: Alapszakaszok és Periódushossz',
      subtitle: 'Párosítsd a sormintákat a legkisebb ismétlődő alapszakaszukkal és hosszukkal!',
      pairs: [
        {
          id: 'p1-1',
          prompt: '🔴 🔵 🟡 🔴 🔵 🟡 🔴 🔵 🟡 ...',
          value: 'Alapszakasz: [🔴, 🔵, 🟡] – periódushossz: 3 elem'
        },
        {
          id: 'p1-2',
          prompt: '▲ ▲ ▼ ▲ ▲ ▼ ▲ ▲ ▼ ...',
          value: 'Alapszakasz: [▲, ▲, ▼] – periódushossz: 3 elem'
        },
        {
          id: 'p1-3',
          prompt: '⭐ 🌙 ⭐ 🌙 ⭐ 🌙 ...',
          value: 'Alapszakasz: [⭐, 🌙] – periódushossz: 2 elem'
        },
        {
          id: 'p1-4',
          prompt: '■ ● ▲ ◆ ■ ● ▲ ◆ ...',
          value: 'Alapszakasz: [■, ●, ▲, ◆] – periódushossz: 4 elem'
        },
        {
          id: 'p1-5',
          prompt: 'A B B A B B A B B ...',
          value: 'Alapszakasz: [A, B, B] – periódushossz: 3 elem'
        },
        {
          id: 'p1-6',
          prompt: '1 2 3 4 5 1 2 3 4 5 ...',
          value: 'Alapszakasz: [1, 2, 3, 4, 5] – periódushossz: 5 elem'
        },
        {
          id: 'p1-7',
          prompt: '+ - + - + - + - ...',
          value: 'Kétállapotú váltakozó ritmus, periódushossz: 2 elem'
        },
        {
          id: 'p1-8',
          prompt: '🟢 🔴 🔴 🟢 🔴 🔴 ...',
          value: 'Egy zöld és két piros ismétlődése, periódushossz: 3 elem'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: GEOMETRIAI TRANSZFORMÁCIÓK ÉS ALKALMAZÁSOK
    // ========================================================
    2: {
      title: '2. Szint: Transzformációk és Díszítősorok',
      subtitle: 'Párosítsd a díszítősor típusokat a geometriai szabályukkal!',
      pairs: [
        {
          id: 'p2-1',
          prompt: 'Eltolásos ritmus (transzláció)',
          value: 'Az alapelem változatlan formában és irányban lépked előre'
        },
        {
          id: 'p2-2',
          prompt: 'Tükrözéses ritmus (függőleges tengely)',
          value: 'Váltakozva jobbra és balra néző alakzatok (pl. P q P q)'
        },
        {
          id: 'p2-3',
          prompt: 'Tükrözéses ritmus (vízszintes tengely)',
          value: 'Váltakozva felfelé és lefelé mutató alakzatok (pl. ▲ ▼ ▲ ▼)'
        },
        {
          id: 'p2-4',
          prompt: 'Forgatásos ritmus (90°-os forgatás)',
          value: 'Négy lépés után tér vissza a motívum az eredeti irányába'
        },
        {
          id: 'p2-5',
          prompt: 'Csúsztatva tükrözés (lépésritmus)',
          value: 'Eltolás és tengelyes tükrözés kombinációja (mint a lábnyomok)'
        },
        {
          id: 'p2-6',
          prompt: 'Bordűr a népművészetben',
          value: 'Szegélyminta hímzéseken, székelykapukon és szőnyegeken'
        },
        {
          id: 'p2-7',
          prompt: 'Mozaik és parketta mintázat',
          value: 'A sík hézagmentes kitöltése szabályos geometriai alakzatokkal'
        },
        {
          id: 'p2-8',
          prompt: 'Periódushossz fogalma',
          value: 'Az alapszakaszban szereplő elemek darabszáma'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: N-EDIK ELEM MEGHATÁROZÁSA OSZTÁSSAL
    // ========================================================
    3: {
      title: '3. Szint: N-edik Elem Kiszámítása',
      subtitle: 'Párosítsd a feladványokat a maradékos osztás eredményével!',
      pairs: [
        {
          id: 'p3-1',
          prompt: '[A, B, C] minta 10. eleme',
          value: '10 : 3 = 3, maradék 1 &rarr; az alapszakasz 1. eleme: A'
        },
        {
          id: 'p3-2',
          prompt: '[A, B, C] minta 12. eleme',
          value: '12 : 3 = 4, maradék 0 &rarr; az alapszakasz utolsó eleme: C'
        },
        {
          id: 'p3-3',
          prompt: '[🔴, 🔵] minta 25. eleme',
          value: '25 : 2 = 12, maradék 1 (páratlan sorszám) &rarr; 🔴'
        },
        {
          id: 'p3-4',
          prompt: '[🔴, 🔵] minta 100. eleme',
          value: '100 : 2 = 50, maradék 0 (páros sorszám) &rarr; 🔵'
        },
        {
          id: 'p3-5',
          prompt: '[★, ◆, ●, ▲] minta 23. eleme',
          value: '23 : 4 = 5, maradék 3 &rarr; az alapszakasz 3. eleme: ●'
        },
        {
          id: 'p3-6',
          prompt: '[★, ◆, ●, ▲] minta 40. eleme',
          value: '40 : 4 = 10, maradék 0 &rarr; az alapszakasz 4. eleme: ▲'
        },
        {
          id: 'p3-7',
          prompt: 'Mit jelent, ha a maradék 0?',
          value: 'A keresett elem pontosan az alapszakasz UTOLSÓ eleme'
        },
        {
          id: 'p3-8',
          prompt: '[X, Y, Z] minta 101. eleme',
          value: '101 : 3 = 33, maradék 2 &rarr; az alapszakasz 2. eleme: Y'
        }
      ]
    }
  };

  return (
    <MatcherTemplate
      topicId="g5-loc-patterns-quiz"
      title="Ritmusok, díszítések párosító"
      subtitle="Párosítsd a sormintákat, transzformációkat és N-edik elemeket!"
      currentLevel={currentLevel}
      onLevelChange={setCurrentLevel}
      levels={levels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      documentId="grade-5-rhythm-patterns-matcher"
      storageKey="g5-loc-patterns-matcher"
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
};

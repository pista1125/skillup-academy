import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface CoordinateSystemMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const CoordinateSystemMatcher: React.FC<CoordinateSystemMatcherProps> = ({
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
    // 1. SZINT: A KOORDINÁTA-RENDSZER ALAPFOGALMAI ÉS ELEMEI
    // ========================================================
    1: {
      title: '1. Szint: A Koordináta-rendszer Alapjai',
      subtitle: 'Párosítsd a fogalmakat, tengelyeket és síknegyedeket a leírásukkal!',
      pairs: [
        {
          id: 'p1-1',
          prompt: 'Origó (O)',
          value: 'A két tengely metszéspontja, koordinátája: (0; 0)'
        },
        {
          id: 'p1-2',
          prompt: 'x-tengely (abszcissza)',
          value: 'A vízszintes számegyenes, jobbra mutat a növekvő iránya'
        },
        {
          id: 'p1-3',
          prompt: 'y-tengely (ordináta)',
          value: 'A függőleges számegyenes, felfelé mutat a növekvő iránya'
        },
        {
          id: 'p1-4',
          prompt: 'I. síknegyed (+ ; +)',
          value: 'Jobbra fent fekszik, mindkét koordinátája pozitív'
        },
        {
          id: 'p1-5',
          prompt: 'II. síknegyed (- ; +)',
          value: 'Balra fent fekszik, az x negatív, az y pozitív'
        },
        {
          id: 'p1-6',
          prompt: 'III. síknegyed (- ; -)',
          value: 'Balra lent fekszik, mindkét koordinátája negatív'
        },
        {
          id: 'p1-7',
          prompt: 'IV. síknegyed (+ ; -)',
          value: 'Jobbra lent fekszik, az x pozitív, az y negatív'
        },
        {
          id: 'p1-8',
          prompt: 'Rendezett számpár sorrendje',
          value: 'Mindig az első koordináta x (vízszintes), a második y (függőleges)'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: PONTOK ÉS ELHELYEZKEDÉSÜK A SÍKON
    // ========================================================
    2: {
      title: '2. Szint: Pontok és Pozíciójuk',
      subtitle: 'Párosítsd az adott pontokat a síknegyedükkel vagy tengelyükkel!',
      pairs: [
        {
          id: 'p2-1',
          prompt: 'P(4; 5) pont',
          value: 'I. síknegyed (jobbra 4, fel 5)'
        },
        {
          id: 'p2-2',
          prompt: 'Q(-3; 6) pont',
          value: 'II. síknegyed (balra 3, fel 6)'
        },
        {
          id: 'p2-3',
          prompt: 'R(-5; -2) pont',
          value: 'III. síknegyed (balra 5, le 2)'
        },
        {
          id: 'p2-4',
          prompt: 'S(7; -4) pont',
          value: 'IV. síknegyed (jobbra 7, le 4)'
        },
        {
          id: 'p2-5',
          prompt: 'A(6; 0) pont',
          value: 'Pozitív x-tengelyen fekszik (második koordinátája 0)'
        },
        {
          id: 'p2-6',
          prompt: 'B(0; -5) pont',
          value: 'Negatív y-tengelyen fekszik (első koordinátája 0)'
        },
        {
          id: 'p2-7',
          prompt: 'C(-4; 0) pont',
          value: 'Negatív x-tengelyen fekszik (második koordinátája 0)'
        },
        {
          id: 'p2-8',
          prompt: 'D(0; 3) pont',
          value: 'Pozitív y-tengelyen fekszik (első koordinátája 0)'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: TÜKRÖZÉSEK, TÁVOLSÁGOK ÉS TULAJDONSÁGOK
    // ========================================================
    3: {
      title: '3. Szint: Tükrözések és Tengelytávolságok',
      subtitle: 'Párosítsd a geometriai műveleteket az eredményükkel!',
      pairs: [
        {
          id: 'p3-1',
          prompt: 'P(3; 4) tükörképe x-tengelyre',
          value: 'P\'(3; -4) – csak a második koordináta előjele vált ellentétesre'
        },
        {
          id: 'p3-2',
          prompt: 'P(3; 4) tükörképe y-tengelyre',
          value: 'P\'(-3; 4) – csak az első koordináta előjele vált ellentétesre'
        },
        {
          id: 'p3-3',
          prompt: 'P(3; 4) tükörképe az origóra',
          value: 'P\'(-3; -4) – mindkét koordináta az ellentettjére változik'
        },
        {
          id: 'p3-4',
          prompt: 'A(-5; 2) pont távolsága az x-tengelytől',
          value: '|y| = 2 egység (függőleges eltérés)'
        },
        {
          id: 'p3-5',
          prompt: 'A(-5; 2) pont távolsága az y-tengelytől',
          value: '|x| = 5 egység (vízszintes eltérés)'
        },
        {
          id: 'p3-6',
          prompt: 'P(4; 4) pont helyzete',
          value: 'Az I. síknegyed szögfelezőjén fekszik (x = y)'
        },
        {
          id: 'p3-7',
          prompt: 'Minden olyan pont, ahol y = 0',
          value: 'Maga a vízszintes x-tengely egyenlete'
        },
        {
          id: 'p3-8',
          prompt: 'Minden olyan pont, ahol x = 0',
          value: 'Maga a függőleges y-tengely egyenlete'
        }
      ]
    }
  };

  return (
    <MatcherTemplate
      topicId="g5-loc-coord-sys-quiz"
      title="A derékszögű koordináta-rendszer párosító"
      subtitle="Párosítsd a koordinátákat, tengelyeket, síknegyedeket és tükrözéseket!"
      currentLevel={currentLevel}
      onLevelChange={setCurrentLevel}
      levels={levels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      documentId="grade-5-coordinate-system-matcher"
      storageKey="g5-loc-coord-sys-matcher"
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
};

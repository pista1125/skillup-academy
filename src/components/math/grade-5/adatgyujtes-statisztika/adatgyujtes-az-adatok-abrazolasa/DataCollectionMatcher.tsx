import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface DataCollectionMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const DataCollectionMatcher: React.FC<DataCollectionMatcherProps> = ({
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
    // 1. SZINT: ADATGYŰJTÉSI ALAPFOGALMAK
    // ========================================================
    1: {
      title: '1. Szint: Adatgyűjtési alapfogalmak',
      subtitle: 'Párosítsd a statisztikai kutatás és adatfeldolgozás alapfogalmait a leírásukkal!',
      pairs: [
        {
          id: 'p1-1',
          prompt: 'Strigula (ötös köteg) ✏️',
          value: '4 függőleges vonal, amit az 5. ferdén áthúz a gyors számláláshoz'
        },
        {
          id: 'p1-2',
          prompt: 'Gyakoriság 📊',
          value: 'Azt mutatja meg, hogy egy adott adat hányszor fordul elő a mintában'
        },
        {
          id: 'p1-3',
          prompt: 'Relatív gyakoriság %',
          value: 'A gyakoriság és az összes adat hányadosa (törtként vagy százalékként)'
        },
        {
          id: 'p1-4',
          prompt: 'Kérdőíves felmérés 📝',
          value: 'Kérdések feltételével és válaszok gyűjtésével történő adatfelvétel'
        },
        {
          id: 'p1-5',
          prompt: 'Megfigyelés és mérés 🌡️',
          value: 'Folytonos adatok (hőmérséklet, magasság, idő) műszeres rögzítése'
        },
        {
          id: 'p1-6',
          prompt: 'Minta mérete (N) 👥',
          value: 'Az összes megkérdezett személy vagy megvizsgált eset darabszáma'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: STRIGULÁK LEOLVASÁSA ÉS ÉRTÉKÜK
    // ========================================================
    2: {
      title: '2. Szint: Strigulák leolvasása és értékük',
      subtitle: 'Számold ki az ötös kötegek és plusz vonalak pontos számértékét!',
      pairs: [
        {
          id: 'p2-1',
          prompt: 'Két teljes ötös köteg + 3 vonal',
          value: '13 előfordulás (5 + 5 + 3 = 13)'
        },
        {
          id: 'p2-2',
          prompt: 'Négy teljes ötös köteg',
          value: '20 előfordulás (4 × 5 = 20)'
        },
        {
          id: 'p2-3',
          prompt: 'Három teljes ötös köteg + 4 vonal',
          value: '19 előfordulás (15 + 4 = 19)'
        },
        {
          id: 'p2-4',
          prompt: 'Öt teljes ötös köteg + 1 vonal',
          value: '26 előfordulás (25 + 1 = 26)'
        },
        {
          id: 'p2-5',
          prompt: 'Egy teljes ötös köteg + 2 vonal',
          value: '7 előfordulás (5 + 2 = 7)'
        },
        {
          id: 'p2-6',
          prompt: 'Hat teljes ötös köteg',
          value: '30 előfordulás (6 × 5 = 30)'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: RELATÍV GYAKORISÁG ÉS STATISZTIKAI JELLEMZŐK
    // ========================================================
    3: {
      title: '3. Szint: Relatív gyakoriság és statisztikai jellemzők',
      subtitle: 'Párosítsd az előfordulások arányait a megfelelő relatív gyakorisággal és fogalommal!',
      pairs: [
        {
          id: 'p3-1',
          prompt: '5 tanuló a 20 fős osztályból',
          value: '1/4 rész = 25% relatív gyakoriság'
        },
        {
          id: 'p3-2',
          prompt: '10 fő az 50 fős csoportból',
          value: '1/5 rész = 20% relatív gyakoriság'
        },
        {
          id: 'p3-3',
          prompt: '15 fő a 30 fős csapatból',
          value: '1/2 rész = 50% relatív gyakoriság'
        },
        {
          id: 'p3-4',
          prompt: '3 tanuló a 30 fős osztályból',
          value: '1/10 rész = 10% relatív gyakoriság'
        },
        {
          id: 'p3-5',
          prompt: '2 tanuló a 25 fős csoportból',
          value: '2/25 rész = 8% relatív gyakoriság'
        },
        {
          id: 'p3-6',
          prompt: 'Módusz (leggyakoribb érték)',
          value: 'A statisztikai mintában a legtöbbször előforduló adat'
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

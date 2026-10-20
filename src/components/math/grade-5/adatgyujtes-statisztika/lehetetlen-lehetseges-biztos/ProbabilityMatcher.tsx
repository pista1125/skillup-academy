import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface ProbabilityMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const ProbabilityMatcher: React.FC<ProbabilityMatcherProps> = ({
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
    // 1. SZINT: ESEMÉNYEK TÍPUSAI ÉS ALAPMEGHATÁROZÁSOK
    // ========================================================
    1: {
      title: '1. Szint: Események típusai és meghatározásuk',
      subtitle: 'Párosítsd a valószínűségi eseménykategóriákat a hozzájuk tartozó leírásukkal!',
      pairs: [
        {
          id: 'p1-1',
          prompt: 'Biztos esemény 🟢',
          value: 'Minden körülmények között elkerülhetetlenül bekövetkezik (100% esély)'
        },
        {
          id: 'p1-2',
          prompt: 'Lehetetlen esemény 🔴',
          value: 'Soha, semmilyen esetben nem következhet be (0% esély)'
        },
        {
          id: 'p1-3',
          prompt: 'Lehetséges (Véletlen) esemény 🟡',
          value: 'Bekövetkezhet, de nem garantált, a véletlentől függ'
        },
        {
          id: 'p1-4',
          prompt: 'Egyenlő esélyű események ⚖️',
          value: 'A kimenetelek esélye pontosan megegyezik (pl. Fej vagy Írás)'
        },
        {
          id: 'p1-5',
          prompt: 'Valószínűbb kimenetel 📈',
          value: 'Több kedvező eset tartozik hozzá, mint a másik lehetőséghez'
        },
        {
          id: 'p1-6',
          prompt: 'Kísérletek függetlensége 🎲',
          value: 'A kockának és érmének nincs emlékezete, a múltbeli dobás nem hat az újra'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: KOCKADOBÁSOK ESÉLYEI
    // ========================================================
    2: {
      title: '2. Szint: Kockadobások esélyei',
      subtitle: 'Párosítsd a hatoldalú szabályos kockával dobott eseményeket a kedvező esetek számával!',
      pairs: [
        {
          id: 'p2-1',
          prompt: 'Páros szám dobása 🎲',
          value: '3 eset a 6-ból: {2, 4, 6} (50% esély)'
        },
        {
          id: 'p2-2',
          prompt: 'Prímszám dobása 🎲',
          value: '3 eset a 6-ból: {2, 3, 5} (50% esély)'
        },
        {
          id: 'p2-3',
          prompt: '4-nél nagyobb szám dobása 🎲',
          value: '2 eset a 6-ból: {5, 6} (1/3 esély)'
        },
        {
          id: 'p2-4',
          prompt: '7-nél kisebb szám dobása 🎲',
          value: '6 eset a 6-ból: {1, 2, 3, 4, 5, 6} (Biztos, 100%)'
        },
        {
          id: 'p2-5',
          prompt: '8-as szám dobása 🎲',
          value: '0 eset a 6-ból (Lehetetlen, 0%)'
        },
        {
          id: 'p2-6',
          prompt: 'Pontosan 6-os dobása 🎲',
          value: '1 eset a 6-ból: {6} (kb. 16,7% esély)'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: GOLYÓHÚZÁS ÉS ÖSSZETETT ESÉLYEK
    // ========================================================
    3: {
      title: '3. Szint: Golyóhúzás és összetett esélyek',
      subtitle: 'Párosítsd a kísérleti feltételeket a helyes matematikai következtetéssel!',
      pairs: [
        {
          id: 'p3-1',
          prompt: '10 piros golyóból egyet húzunk 🔴',
          value: 'Biztos esemény, hogy a kihúzott golyó piros lesz'
        },
        {
          id: 'p3-2',
          prompt: '10 piros golyóból kék húzása 🔵',
          value: 'Lehetetlen esemény, mivel nincs kék golyó a dobozban'
        },
        {
          id: 'p3-3',
          prompt: '8 piros és 2 kék golyóból húzás 🎯',
          value: 'A piros golyó húzása valószínűbb a kéknél (80% vs 20%)'
        },
        {
          id: 'p3-4',
          prompt: '5 piros és 5 kék golyóból húzás ⚖️',
          value: 'A két szín húzása egyformán valószínű (50% - 50%)'
        },
        {
          id: 'p3-5',
          prompt: 'Ötször egymás után Fej jött ki 🪙',
          value: 'A 6. dobásnál a Fej esélye változatlanul 50% marad'
        },
        {
          id: 'p3-6',
          prompt: 'Nagyon sokszor megismételt kísérlet 📊',
          value: 'A relatív gyakoriság egyre közelebb kerül az elméleti esélyhez'
        }
      ]
    }
  };

  const handleLevelChange = (newLevel: DifficultyLevel) => {
    setCurrentLevel(newLevel);
    if (onNextLevel) onNextLevel();
  };

  return (
    <MatcherTemplate
      title="Valószínűségi Párosító Játék"
      subtitle="Keresd meg az eseményekhez tartozó kategóriákat, kedvező eseteket és esélyeket!"
      color="rose"
      levels={levels}
      currentLevel={currentLevel}
      onLevelChange={handleLevelChange}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onOpenRules={onOpenRules}
    />
  );
};

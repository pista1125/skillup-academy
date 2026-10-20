import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface StatsSummaryMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const StatsSummaryMatcher: React.FC<StatsSummaryMatcherProps> = ({
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
    // 1. SZINT: A TÉMAKÖR 6 FŐ ALAPFOGALMA
    // ========================================================
    1: {
      title: '1. Szint: A statisztika 6 fő alapfogalma',
      subtitle: 'Párosítsd a témakör legfontosabb fogalmait a hozzájuk tartozó leírással!',
      pairs: [
        {
          id: 'p1-1',
          prompt: 'Strigulázás ✏️',
          value: '4 álló vonal + 1 ferde áthúzás a gyors ötös csoportosításhoz'
        },
        {
          id: 'p1-2',
          prompt: 'Módusz 👑',
          value: 'A mintában a legtöbbször előforduló, legnagyobb létszámú adat'
        },
        {
          id: 'p1-3',
          prompt: 'Számtani közép (Átlag) ➗',
          value: 'Az adatok összege osztva az adatok darabszámával'
        },
        {
          id: 'p1-4',
          prompt: 'Vonaldiagram 📈',
          value: 'Időbeli változások, folyamatok és trendek ábrázolására alkalmas'
        },
        {
          id: 'p1-5',
          prompt: 'Biztos esemény 🟢',
          value: 'Minden körülmények között garantáltan bekövetkező esemény (100%)'
        },
        {
          id: 'p1-6',
          prompt: 'Lehetetlen esemény 🔴',
          value: 'Soha, semmilyen esetben be nem következő esemény (0%)'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: KÉPLETEK ÉS SZÁMÍTÁSI SZABÁLYOK
    // ========================================================
    2: {
      title: '2. Szint: Képletek és számítási szabályok',
      subtitle: 'Párosítsd a statisztikai mutatókat és feltételeket a pontos számításukkal!',
      pairs: [
        {
          id: 'p2-1',
          prompt: 'Összeg visszafelé képlete ✖️',
          value: 'Átlag × Darabszám (Átlag szorozva az adatok számával)'
        },
        {
          id: 'p2-2',
          prompt: 'Terjedelem (Szóródás) 📏',
          value: 'Legnagyobb adat mínusz legkisebb adat (Max − Min)'
        },
        {
          id: 'p2-3',
          prompt: 'Relatív gyakoriság %',
          value: 'Gyakoriság / Összes adat (százalékként vagy törtként)'
        },
        {
          id: 'p2-4',
          prompt: 'Kördiagram félkör szöge 🥧',
          value: '180° (az egész kör 360°-ának pontosan az 50%-a)'
        },
        {
          id: 'p2-5',
          prompt: 'Páros szám esélye kockán 🎲',
          value: '3 a 6-ból: {2, 4, 6} (pontosan 50% esély)'
        },
        {
          id: 'p2-6',
          prompt: 'Relatív gyakoriságok összege 💯',
          value: 'Mindig pontosan 100% (vagy 1 egész)'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: TULAJDONSÁGOK ÉS CSAPDÁK
    // ========================================================
    3: {
      title: '3. Szint: Tulajdonságok és csapdák',
      subtitle: 'Párosítsd a logikai összefüggéseket a rájuk vonatkozó következménnyel!',
      pairs: [
        {
          id: 'p3-1',
          prompt: 'Közrefogási szabály 📐',
          value: 'Minimum ≤ Átlag ≤ Maximum (az átlag a szélső értékek közé esik)'
        },
        {
          id: 'p3-2',
          prompt: 'Kiegyenlítés törvénye ⚖️',
          value: 'Az átlagtól vett pozitív és negatív eltérések összege mindig 0'
        },
        {
          id: 'p3-3',
          prompt: 'Szerencsejátékos csapdája 🎰',
          value: 'Tévhit: a korábbi dobások semmilyen módon nem befolyásolják az újat'
        },
        {
          id: 'p3-4',
          prompt: 'Letört függőleges tengely ⚠️',
          value: 'Félrevezető diagramtrükk: az apró eltérések óriásinak látszanak'
        },
        {
          id: 'p3-5',
          prompt: 'Skatulya-elv (Dirichlet) 🕊️',
          value: 'A biztos sikerhez mindig a legrosszabb esetet kell megvizsgálni'
        },
        {
          id: 'p3-6',
          prompt: 'Kiugró adat (Outlier) 🚀',
          value: 'Egyetlen extrém magas érték erősen felhúzza a számtani közepet'
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
      title="Összefoglaló Párosító Játék"
      subtitle="Kapcsold össze a fogalmakat, diagramtípusokat, képleteket és eseményeket!"
      color="slate"
      levels={levels}
      currentLevel={currentLevel}
      onLevelChange={handleLevelChange}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onOpenRules={onOpenRules}
    />
  );
};

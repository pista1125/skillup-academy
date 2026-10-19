import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface WordProblemsSummaryMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const WordProblemsSummaryMatcher: React.FC<WordProblemsSummaryMatcherProps> = ({
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
    // 1. SZINT: ALAPFOGALMAK ÉS ALAPVETŐ ÁTVÁLTÁSOK
    // ========================================================
    1: {
      title: '1. Szint: Alapvető mértékegységek és fogalmak',
      subtitle: 'Párosítsd a mértékegységeket, fogalmakat a megfelelő definícióval vagy értékkel!',
      pairs: [
        {
          id: 'p1-1',
          prompt: '1 tonna (t) kilogrammban',
          value: '1000 kg'
        },
        {
          id: 'p1-2',
          prompt: '1 liter (l) űrtartalom köbdeciméterben',
          value: '1 dm³'
        },
        {
          id: 'p1-3',
          prompt: '1 óra másodpercben (s)',
          value: '3600 másodperc'
        },
        {
          id: 'p1-4',
          prompt: '1 mázsa (q) kilogrammban',
          value: '100 kg'
        },
        {
          id: 'p1-5',
          prompt: '1 hektoliter (hl) literben',
          value: '100 liter'
        },
        {
          id: 'p1-6',
          prompt: 'Nyitott mondat definíciója',
          value: 'Ismeretlent tartalmazó matematikai állítás'
        },
        {
          id: 'p1-7',
          prompt: 'Igazsághalmaz (I)',
          value: 'Azon számok, amik igazzá teszik a mondatot'
        },
        {
          id: 'p1-8',
          prompt: 'Egyenes arányosság alaptörvénye',
          value: 'Ha az egyik kétszeresére nő, a másik is duplázódik'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: ÁTVÁLTÁSOK, EGYENLETEK ÉS SZÖVEGES FELADATOK
    // ========================================================
    2: {
      title: '2. Szint: Mértékegység-váltások és egyenletek',
      subtitle: 'Találd meg az összetartozó matematikai összefüggéseket és megoldásokat!',
      pairs: [
        {
          id: 'p2-1',
          prompt: '2,5 kg átváltva dekagrammba',
          value: '250 dkg'
        },
        {
          id: 'p2-2',
          prompt: '450 ml átváltva deciliterbe',
          value: '4,5 dl'
        },
        {
          id: 'p2-3',
          prompt: '3 óra 15 perc percekben kifejezve',
          value: '195 perc (3 · 60 + 15)'
        },
        {
          id: 'p2-4',
          prompt: '4 · x = 48 egyenlet megoldása',
          value: 'x = 12 (48 : 4)'
        },
        {
          id: 'p2-5',
          prompt: 'x : 5 = 14 egyenlet megoldása',
          value: 'x = 70 (14 · 5)'
        },
        {
          id: 'p2-6',
          prompt: '3 füzet 1200 Ft → 5 füzet ára',
          value: '2000 Ft (1 füzet 400 Ft)'
        },
        {
          id: 'p2-7',
          prompt: '1783 Ft készpénzes kerekítése',
          value: '1785 Ft (felfelé)'
        },
        {
          id: 'p2-8',
          prompt: 'Fordított műveletek elve',
          value: 'Összeadás ↔ Kivonás, Szorzás ↔ Osztás'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: MESTERFOK, ÖSSZETETT EGYENLETEK ÉS ARÁNYOK
    // ========================================================
    3: {
      title: '3. Szint: Mesterfok & Logikai kihívások',
      subtitle: 'Párosítsd az összetett szöveges feladványokat a matematikai megoldásukkal!',
      pairs: [
        {
          id: 'p3-1',
          prompt: '3 · x + 15 = 45 megoldása',
          value: 'x = 10 (30 : 3)'
        },
        {
          id: 'p3-2',
          prompt: '(x − 8) : 4 = 7 megoldása',
          value: 'x = 36 (28 + 8)'
        },
        {
          id: 'p3-3',
          prompt: 'Két szám összege 50, különbségük 10',
          value: '30 és 20 (szakaszos ábra)'
        },
        {
          id: 'p3-4',
          prompt: 'Apa háromszor annyi idős, mint fia, összegük 48',
          value: 'Apa 36 éves, a fiú 12 éves (4 egység)'
        },
        {
          id: 'p3-5',
          prompt: 'Gyalogos 4 km/h-val halad 2,5 órán át',
          value: '10 km utat tesz meg'
        },
        {
          id: 'p3-6',
          prompt: '15 perc alatt megtett 3 km sebessége',
          value: '12 km/h átlagsebesség'
        },
        {
          id: 'p3-7',
          prompt: '0,75 liter hány milliliterrel egyenlő?',
          value: '750 ml (0,75 · 1000)'
        },
        {
          id: 'p3-8',
          prompt: '4 munkás 6 óra alatt végez → 2 munkásnak',
          value: '12 óra kell (fordított jelleg)'
        }
      ]
    }
  };

  return (
    <MatcherTemplate
      title="VI. Fejezet Összefoglaló Párosító"
      subtitle="Kösd össze a mérések, egyenletek és szöveges feladatok kulcsfontosságú elemeit!"
      topicBadge="5. OSZTÁLY • VI. TÉMAKÖR: MÉRÉS, ARÁNYOSSÁG, SZÖVEGES FELADATOK"
      topicId="g5-summary-wp-matcher"
      levels={levels}
      currentLevel={currentLevel}
      onLevelChange={setCurrentLevel}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
};

export default WordProblemsSummaryMatcher;

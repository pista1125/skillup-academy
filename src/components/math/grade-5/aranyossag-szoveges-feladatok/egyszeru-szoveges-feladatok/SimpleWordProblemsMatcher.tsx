import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface SimpleWordProblemsMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const SimpleWordProblemsMatcher: React.FC<SimpleWordProblemsMatcherProps> = ({
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
    // 1. SZINT: SZÖVEG ÉS MATEMATIKAI KIFEJEZÉS
    // ========================================================
    1: {
      title: '1. Szint: Szövegek lefordítása kifejezésekre',
      subtitle: 'Kösd össze a hétköznapi mondatot a megfelelő matematikai képlettel!',
      pairs: [
        {
          id: 'p1-1',
          prompt: 'x-nél 12-vel több',
          value: 'x + 12'
        },
        {
          id: 'p1-2',
          prompt: 'y 5-szöröse',
          value: '5 · y'
        },
        {
          id: 'p1-3',
          prompt: 'a szám harmadrésze',
          value: 'a : 3 (vagy a/3)'
        },
        {
          id: 'p1-4',
          prompt: 'b-nél 7-tel kevesebb',
          value: 'b − 7'
        },
        {
          id: 'p1-5',
          prompt: 'a szám kétszeresénél 5-tel több',
          value: '2 · x + 5'
        },
        {
          id: 'p1-6',
          prompt: 'a számhoz adunk 4-et, majd az összeget felezzük',
          value: '(x + 4) : 2'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: SZÖVEGES PROBLÉMA ÉS EGYENLET
    // ========================================================
    2: {
      title: '2. Szint: Melyik egyenlet írja le a feladatot?',
      subtitle: 'Párosítsd a feladatot a megfelelő egyenlettel!',
      pairs: [
        {
          id: 'p2-1',
          prompt: 'Ketten együtt 48 db golyót gyűjtöttek, Bencének 3-szor annyi van, mint Ádámnak.',
          value: 'x + 3 · x = 48 (4 · x = 48)'
        },
        {
          id: 'p2-2',
          prompt: 'Két szám összege 60, a nagyobbik 14-gyel több a kisebbiknél.',
          value: 'x + (x + 14) = 60 (2 · x + 14 = 60)'
        },
        {
          id: 'p2-3',
          prompt: 'Egy téglalap kerülete 50 cm, hossza 4-szerese a szélességének.',
          value: '2 · (x + 4 · x) = 50 (10 · x = 50)'
        },
        {
          id: 'p2-4',
          prompt: 'Gondoltam egy számot, elvettem belőle 15-öt, négyszereztem: 36 lett.',
          value: '(x − 15) · 4 = 36'
        },
        {
          id: 'p2-5',
          prompt: '70 szem cukorkát osztunk szét, Lillának 10-zel kevesebb jutott, mint Daninak.',
          value: 'x + (x − 10) = 70 (2 · x − 10 = 70)'
        },
        {
          id: 'p2-6',
          prompt: 'Három egymást követő szám összege 45.',
          value: '(x − 1) + x + (x + 1) = 45 (3 · x = 45)'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: FELADAT ÉS VÉGEREDMÉNY
    // ========================================================
    3: {
      title: '3. Szint: Szöveges feladatok megoldásai',
      subtitle: 'Kösd össze a feladatot a pontos számszerű válasszal!',
      pairs: [
        {
          id: 'p3-1',
          prompt: 'Ketten együtt 36 fagyit ettek meg nyáron, Peti kétszer annyit, mint Hugi. Hányat evett Hugi?',
          value: '12 fagyit (Hugi: 12, Peti: 24)'
        },
        {
          id: 'p3-2',
          prompt: 'Zsófi és Nóri matricái összesen 50 db. Zsófinak 8-cal több van. Hány matricája van Zsófinak?',
          value: '29 matricája (Nóri: 21, Zsófi: 29)'
        },
        {
          id: 'p3-3',
          prompt: 'Egy apa most 36 éves, a fia 12. Hány év múlva lesz az apa kétszer olyan idős, mint a fia?',
          value: '12 év múlva (Apa: 48, fia: 24)'
        },
        {
          id: 'p3-4',
          prompt: 'Pénzem harmadát elköltöttem füzetre, maradt 1600 Ft-om. Mennyi pénzem volt?',
          value: '2400 Ft (1600 Ft = a pénz 2/3 része)'
        },
        {
          id: 'p3-5',
          prompt: 'Egy dobozban 40 golyó van, átrakunk 4-et a másikba és egyenlő lesz. Hány golyó volt a másikban eredetileg?',
          value: '32 golyó (40 − 4 = 36, másik: 36 − 4 = 32)'
        },
        {
          id: 'p3-6',
          prompt: '14 fej és 40 láb van a baromfiudvarban (csirkék és nyulak). Hány nyúl van?',
          value: '6 nyúl (és 8 csirke: 6 · 4 + 8 · 2 = 40)'
        }
      ]
    }
  };

  return (
    <MatcherTemplate
      title="Egyszerű szöveges feladatok Párosító"
      subtitle="Kösd össze a kifejezéseket, egyenleteket és megoldásokat!"
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
export default SimpleWordProblemsMatcher;

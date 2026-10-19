import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface SpatialOrientationMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const SpatialOrientationMatcher: React.FC<SpatialOrientationMatcherProps> = ({
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
    // 1. SZINT: DIMENZIÓK ÉS FŐBB FOKHÁLÓZATI ELEMEK
    // ========================================================
    1: {
      title: '1. Szint: Dimenziók és a Fokhálózat Alapjai',
      subtitle: 'Párosítsd a dimenziókat és a fokhálózat alapvonalait a leírásukkal!',
      pairs: [
        {
          id: 'p1-1',
          prompt: '1 dimenzió (1D: vonal)',
          value: '1 koordináta szükséges: például számegyenes, kilométerkő'
        },
        {
          id: 'p1-2',
          prompt: '2 dimenzió (2D: sík)',
          value: '2 koordináta (x; y): például sakktábla, papírlap, képernyő'
        },
        {
          id: 'p1-3',
          prompt: '3 dimenzió (3D: tér)',
          value: '3 koordináta (x; y; z): szélesség, hosszúság és magasság'
        },
        {
          id: 'p1-4',
          prompt: 'Egyenlítő (0° szélesség)',
          value: 'A leghosszabb szélességi kör, elválasztja az északi és déli félgömböt'
        },
        {
          id: 'p1-5',
          prompt: 'Kezdő délkör (0° hosszúság)',
          value: 'A londoni Greenwich csillagvizsgálón áthaladó hosszúsági kör'
        },
        {
          id: 'p1-6',
          prompt: 'Északi-sark pontja',
          value: 'Északi szélesség 90° (a legészakibb pont a Földön)'
        },
        {
          id: 'p1-7',
          prompt: 'Tengerszint feletti magasság',
          value: 'A tenger szintjéhez viszonyított függőleges magasság méterben'
        },
        {
          id: 'p1-8',
          prompt: 'Origó a térben',
          value: 'O(0; 0; 0) – a három térbeli tengely metszéspontja'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: FÖLDRAJZI HELYMEGHATÁROZÁS ÉS MODELLJEI
    // ========================================================
    2: {
      title: '2. Szint: Földrajzi Koordináták és Tájékozódás',
      subtitle: 'Párosítsd a helyszíneket és tájékozódási fogalmakat a koordinátáikkal!',
      pairs: [
        {
          id: 'p2-1',
          prompt: 'Budapest földrajzi helyzete',
          value: 'É. sz. kb. 47,5° és K. h. kb. 19,0°'
        },
        {
          id: 'p2-2',
          prompt: 'Quito (Ecuador) különlegessége',
          value: 'Közvetlenül az Egyenlítőn fekszik (0° szélesség)'
        },
        {
          id: 'p2-3',
          prompt: 'Greenwich (London) különlegessége',
          value: 'Pontosan a 0° hosszúsági körön fekszik'
        },
        {
          id: 'p2-4',
          prompt: 'Északi szélesség lehetséges értékei',
          value: '0°-tól 90°-ig az Egyenlítőtől északra'
        },
        {
          id: 'p2-5',
          prompt: 'Keleti hosszúság lehetséges értékei',
          value: '0°-tól 180°-ig a kezdő délkörtől keletre'
        },
        {
          id: 'p2-6',
          prompt: 'Repülőgép helyzete a levegőben',
          value: 'Földrajzi szélesség, hosszúság és repülési magasság (3D)'
        },
        {
          id: 'p2-7',
          prompt: 'Búvár helyzete a tengerben',
          value: 'Földrajzi helyzet és negatív tengerszint feletti magasság (mélység)'
        },
        {
          id: 'p2-8',
          prompt: 'Kockaépítmény alaprajza',
          value: 'Felülnézet, amely tartalmazza az oszlopok emeletszámait'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: TÉRBELI KOORDINÁTÁK ÉS A HÁROM NÉZET
    // ========================================================
    3: {
      title: '3. Szint: Térbeli Pontok és Kockanézetek',
      subtitle: 'Párosítsd a térbeli koordinátákat és nézeteket az összefüggéseikkel!',
      pairs: [
        {
          id: 'p3-1',
          prompt: 'P(2; 4; 5) térbeli pont magassága',
          value: 'z = 5 egység a vízszintes padlószint felett'
        },
        {
          id: 'p3-2',
          prompt: 'Kockaépítmény felülnézete',
          value: 'A szélességet (x) és a mélységet (y) mutatja'
        },
        {
          id: 'p3-3',
          prompt: 'Kockaépítmény elölnézete',
          value: 'A szélességet (x) és a magasságot (z) mutatja'
        },
        {
          id: 'p3-4',
          prompt: 'Kockaépítmény oldalnézete',
          value: 'A mélységet (y) és a magasságot (z) mutatja'
        },
        {
          id: 'p3-5',
          prompt: 'P(x; y; 0) alakú térbeli pont',
          value: 'A vízszintes alapsíkon (padlón) fekszik, mert z = 0'
        },
        {
          id: 'p3-6',
          prompt: 'P(0; 0; z) alakú térbeli pont',
          value: 'A függőleges magassági z-tengelyen helyezkedik el'
        },
        {
          id: 'p3-7',
          prompt: 'Déli-sark koordinátája',
          value: 'D. sz. 90° (az Antarktisz közepén)'
        },
        {
          id: 'p3-8',
          prompt: 'Dátumválasztó vonal',
          value: 'A 180° hosszúsági kör a Csendes-óceánon'
        }
      ]
    }
  };

  return (
    <MatcherTemplate
      topicId="g5-loc-spatial-quiz"
      title="Tájékozódás síkban és térben párosító"
      subtitle="Párosítsd a dimenziókat, térbeli pontokat és a fokhálózat elemeit!"
      currentLevel={currentLevel}
      onLevelChange={setCurrentLevel}
      levels={levels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      documentId="grade-5-spatial-orientation-matcher"
      storageKey="g5-loc-spatial-matcher"
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
};

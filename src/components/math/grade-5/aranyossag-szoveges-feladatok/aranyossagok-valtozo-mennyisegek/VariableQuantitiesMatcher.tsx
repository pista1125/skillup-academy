import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface VariableQuantitiesMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const VariableQuantitiesMatcher: React.FC<VariableQuantitiesMatcherProps> = ({
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
    // 1. SZINT: ÖSSZETARTOZÓ MENNYISÉGPÁROK A VALÓSÁGBAN
    // ========================================================
    1: {
      title: '1. Szint: Összetartozó mennyiségek a mindennapokban',
      subtitle: 'Párosítsd az okot a hozzá szorosan kapcsolódó következménnyel!',
      pairs: [
        {
          id: 'p1-1',
          prompt: 'Megvásárolt füzetek száma',
          value: 'A boltban fizetendő végösszeg (Ár = darab · egységár)'
        },
        {
          id: 'p1-2',
          prompt: 'Autózás ideje állandó sebességgel',
          value: 'A megtett távolság kilométerben (Út = sebesség · idő)'
        },
        {
          id: 'p1-3',
          prompt: 'Egy négyzet oldalhossza',
          value: 'A négyzet kerülete (Kerület = 4 · oldalhossz)'
        },
        {
          id: 'p1-4',
          prompt: 'Kerti locsolócsap nyitvatartási ideje',
          value: 'A medencébe befolyt víz mennyisége literben'
        },
        {
          id: 'p1-5',
          prompt: 'Egy torta szeleteinek száma',
          value: 'Egyetlen szelet mérete (több szelet esetén kisebb szelet jut)'
        },
        {
          id: 'p1-6',
          prompt: 'Szabályos ötszög oldalának hossza',
          value: 'A sokszög kerülete (Kerület = 5 · oldal)'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: SZABÁLYOK ÉS KÉPLETEK FELISMERÉSE
    // ========================================================
    2: {
      title: '2. Szint: Szabályok és képletek',
      subtitle: 'Keresd meg az összefüggést leíró matematikai képletet a helyzetnek megfelelően!',
      pairs: [
        {
          id: 'p2-1',
          prompt: 'Egy gombóc fagyi 450 Ft, x gombóc ára y',
          value: 'y = 450 · x'
        },
        {
          id: 'p2-2',
          prompt: 'x darab 1 méteres szalag átváltása centiméterbe (y)',
          value: 'y = 100 · x'
        },
        {
          id: 'p2-3',
          prompt: '24 szelet pizzát osztunk el x barát között egyenlően',
          value: 'y = 24 : x'
        },
        {
          id: 'p2-4',
          prompt: 'x óra alatt eltelt percek száma (y)',
          value: 'y = 60 · x'
        },
        {
          id: 'p2-5',
          prompt: 'Bence 4 évvel fiatalabb Annánál (Anna x, Bence y)',
          value: 'y = x − 4'
        },
        {
          id: 'p2-6',
          prompt: 'Egy x oldalú szabályos hatszög kerülete (y)',
          value: 'y = 6 · x'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: VÁLTOZÁSI IRÁNYOK ÉS ARÁNYOSSÁGI HATÁSOK
    // ========================================================
    3: {
      title: '3. Szint: Változási irányok és következmények',
      subtitle: 'Párosítsd az egyik adat megváltozását a másik adat pontos reakciójával!',
      pairs: [
        {
          id: 'p3-1',
          prompt: 'A vásárolt alma tömege a duplájára (2-szeresére) nő',
          value: 'A fizetendő összeg is pontosan a duplájára nő'
        },
        {
          id: 'p3-2',
          prompt: 'A falat festő munkások száma a 3-szorosára nő',
          value: 'A festéshez szükséges idő a harmadára (1/3-ára) csökken'
        },
        {
          id: 'p3-3',
          prompt: 'A kerékpáros sebessége a felére csökken',
          value: 'Ugyanazon út megtételéhez kétszer annyi időre van szükség'
        },
        {
          id: 'p3-4',
          prompt: 'A medence csapjának vízhozama a 4-szeresére nő',
          value: 'A medence megtelésének ideje a negyedére csökken'
        },
        {
          id: 'p3-5',
          prompt: 'Egy négyzet oldala a 3-szorosára nő',
          value: 'A négyzet kerülete is a 3-szorosára nő'
        },
        {
          id: 'p3-6',
          prompt: 'Egy diák életkora 11 évről 12 évre nő',
          value: 'A magassága vagy tanulmányi átlaga nem ezzel arányosan változik'
        }
      ]
    }
  };

  const currentConfig = levels[currentLevel] || levels[1];

  return (
    <MatcherTemplate
      title="Változó Mennyiségek Párosító"
      subtitle={currentConfig.subtitle}
      pairs={currentConfig.pairs}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onComplete={onNextLevel}
      level={currentLevel}
      onLevelChange={(lvl) => setCurrentLevel(lvl)}
      onOpenRules={onOpenRules}
    />
  );
};

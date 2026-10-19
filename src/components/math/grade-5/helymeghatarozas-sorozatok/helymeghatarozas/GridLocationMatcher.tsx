import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface GridLocationMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const GridLocationMatcher: React.FC<GridLocationMatcherProps> = ({
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
    // 1. SZINT: SAKKTÁBLA ÉS NÉGYZETHÁLÓ ALAPOK
    // ========================================================
    1: {
      title: '1. Szint: Rácshálók és Sakktábla Alapok',
      subtitle: 'Párosítsd a négyzethálós fogalmakat és a sakktábla mezőit a leírásukkal!',
      pairs: [
        {
          id: 'p1-1',
          prompt: 'e4 sakkmező',
          value: 'Az „e” oszlop és a 4. sor metszéspontja, népszerű királygyalog kezdőlépés'
        },
        {
          id: 'p1-2',
          prompt: 'a1 mező a sakktáblán',
          value: 'A világos játékos bal alsó sarkában lévő sötét sarokmező'
        },
        {
          id: 'p1-3',
          prompt: 'A sakktábla centruma',
          value: 'A 4 legfontosabb központi mező: d4, e4, d5, e5'
        },
        {
          id: 'p1-4',
          prompt: 'Torpedó koordináta (pl. B4)',
          value: 'A B oszlop és a 4. sor által kijelölt célpont a csatahajó keresésekor'
        },
        {
          id: 'p1-5',
          prompt: 'Excel cellacím (pl. C12)',
          value: 'A táblázatkezelőben a C oszlop és a 12. sor metszéspontjában lévő adatcella'
        },
        {
          id: 'p1-6',
          prompt: 'Koordináta megállapodás',
          value: 'Mindig az oszlop (vízszintes betű) áll elöl, és a sor (függőleges szám) hátul'
        },
        {
          id: 'p1-7',
          prompt: 'Oszlop a rácshálón',
          value: 'Függőleges sáv, amelyet a sakkban és táblázatokban betűkkel jelölünk'
        },
        {
          id: 'p1-8',
          prompt: 'Sor a rácshálón',
          value: 'Vízszintes sáv, amelyet alulról felfelé számokkal azonosítunk'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: LÉPÉSEK, ELMOZDULÁSOK ÉS CELLÁK
    // ========================================================
    2: {
      title: '2. Szint: Lépések és Elmozdulások',
      subtitle: 'Párosítsd a mozgási utasításokat és a táblázatkezelő funkciókat a jelentésükkel!',
      pairs: [
        {
          id: 'p2-1',
          prompt: '→ 3 lépés utasítás',
          value: '3 mezővel jobbra (keleti irányba) történő elmozdulás'
        },
        {
          id: 'p2-2',
          prompt: '↑ 2 lépés utasítás',
          value: '2 mezővel fel (északi irányba, nagyobb sorok felé) történő haladás'
        },
        {
          id: 'p2-3',
          prompt: '← 1 lépés utasítás',
          value: '1 mezővel balra (nyugati irányba) lépés'
        },
        {
          id: 'p2-4',
          prompt: '↓ 4 lépés utasítás',
          value: '4 mezővel le (déli irányba, kisebb sorok felé) lépés'
        },
        {
          id: 'p2-5',
          prompt: 'Rácstávolság (Manhattan-távolság)',
          value: 'A vízszintes és függőleges rácsvonalak mentén megtett lépések összege'
        },
        {
          id: 'p2-6',
          prompt: 'Excel tartomány (pl. A1:A5)',
          value: 'Az A oszlop 1., 2., 3., 4. és 5. sorának celláit tartalmazó egybefüggő oszloprészlet'
        },
        {
          id: 'p2-7',
          prompt: 'Sakk bástya lépése',
          value: 'Tetszőleges számú mezőt léphet egyenes vonalban vízszintesen vagy függőlegesen'
        },
        {
          id: 'p2-8',
          prompt: 'Sakk futó lépése',
          value: 'Csak átlósan mozoghat, ezért a játék végéig megőrzi mezőinek színét (fehér vagy fekete futó)'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: ÖSSZETETT ÚTVONALAK ÉS RÁCSGEOMETRIA
    // ========================================================
    3: {
      title: '3. Szint: Rácsgeometria és Útvonaltervezés',
      subtitle: 'Párosítsd a rácsgeometriai összefüggéseket és a robotmozgásokat!',
      pairs: [
        {
          id: 'p3-1',
          prompt: 'Eredő elmozdulás: → 4 és ← 2',
          value: 'Összesen 2 lépés jobbra az eredeti ponthoz képest'
        },
        {
          id: 'p3-2',
          prompt: 'Eredő elmozdulás: ↑ 3 és ↓ 3',
          value: '0 lépés függőlegesen: a robot függőleges szintje nem változott'
        },
        {
          id: 'p3-3',
          prompt: 'Négyzet bejárása a rácson',
          value: '4 egyenlő hosszúságú szakasz és 4 darab 90 fokos derékszögű kanyar'
        },
        {
          id: 'p3-4',
          prompt: 'd4 és d5 szomszédsága',
          value: 'Azonos oszlopban (d) lévő, egymás feletti függőlegesen szomszédos mezők'
        },
        {
          id: 'p3-5',
          prompt: 'c3 és e5 szomszédsága',
          value: 'Átlósan egy vonalban lévő mezők (mindkettő sötét vagy mindkettő világos)'
        },
        {
          id: 'p3-6',
          prompt: 'Rácstávolság A1-ből C4-be',
          value: '2 lépés jobbra + 3 lépés fel = összesen 5 rácslépés'
        },
        {
          id: 'p3-7',
          prompt: 'Torpedó 4-es hadihajó',
          value: '4 egymás melletti szomszédos mezőt fed le egy sorban vagy egy oszlopban'
        },
        {
          id: 'p3-8',
          prompt: 'Zárt sokszög a négyzethálón',
          value: 'Olyan útvonal, amelynek kiindulópontja és végpontja pontosan megegyezik'
        }
      ]
    }
  };

  return (
    <MatcherTemplate
      topicId="g5-loc-grid-quiz"
      title="Rácsháló és Helymeghatározás Párosító"
      subtitle="Kattints egy fogalomra a bal oldalon, majd keresd meg a hozzá tartozó párját a jobb oldalon!"
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

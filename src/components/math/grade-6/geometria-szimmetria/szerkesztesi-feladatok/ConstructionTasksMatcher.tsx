import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { ConstructionTasksMiniFigure } from './ConstructionTasksDiagrams';

export interface ConstructionTasksMatcherProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function ConstructionTasksMatcher({
  onBack,
  onSwitchToQuiz,
  onSwitchToSorter,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: ConstructionTasksMatcherProps) {
  const safeLevel: DifficultyLevel = (typeof propLevel === 'number'
    ? propLevel
    : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
  const [level, setLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof propLevel === 'number'
      ? propLevel
      : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
    setLevel(nextLevel);
  }, [propLevel]);

  const levelsConfig: Record<DifficultyLevel, MatcherLevelConfig> = {
    // 1. SZINT: SZERKESZTÉSI ALAPESETEK ÉS SZABÁLYOK (8 PÁR)
    1: {
      level: 1,
      title: '1. Szint: Szerkesztési alapesetek és alaptételek',
      description: 'Párosítsd a szerkesztési alapeseteket a megfelelő geometriai definícióval!',
      pairs: [
        {
          id: 'p1-1',
          promptFigure: <ConstructionTasksMiniFigure type="triangle_sss" />,
          prompt: 'ooo (SSS) alapeset',
          value: '3 oldal ismeretében körívek metszéspontjával határozzuk meg a 3. csúcsot'
        },
        {
          id: 'p1-2',
          promptFigure: <ConstructionTasksMiniFigure type="triangle_sas" />,
          prompt: 'oszo (SAS) alapeset',
          value: '2 oldal és a közbezárt szög ismeretében: szögmásolással és szakaszfelméréssel'
        },
        {
          id: 'p1-3',
          promptFigure: <ConstructionTasksMiniFigure type="triangle_asa" />,
          prompt: 'szosz (ASA) alapeset',
          value: '1 oldal és a 2 rajta fekvő szög ismeretében: a szögszárak metszéspontjával'
        },
        {
          id: 'p1-4',
          promptFigure: <ConstructionTasksMiniFigure type="triangle_inequality_ok" />,
          prompt: 'Háromszög-egyenlőtlenség',
          value: 'Bármely két oldal összege nagyobb a harmadiknál (a + b > c)'
        },
        {
          id: 'p1-5',
          promptFigure: <ConstructionTasksMiniFigure type="triangle_inequality_fail" />,
          prompt: 'Nem szerkeszthető háromszög',
          value: 'A két rövidebb oldal összege nem éri el a harmadikat (körívek nem érnek össze)'
        },
        {
          id: 'p1-6',
          promptFigure: <ConstructionTasksMiniFigure type="sketch_analysis" />,
          prompt: '1. lépés: Vázlat és elemzés',
          value: 'Szabadkézi rajzon színessel megjelöljük a megadott adatokat és összefüggéseket'
        },
        {
          id: 'p1-7',
          promptFigure: <ConstructionTasksMiniFigure type="compass_straightedge" />,
          prompt: '2. lépés: Szerkesztési terv',
          value: 'Lépésről lépésre leírjuk az alkalmazandó alapszerkesztéseket és jelöléseket'
        },
        {
          id: 'p1-8',
          promptFigure: <ConstructionTasksMiniFigure type="angle_sum_check" />,
          prompt: 'Belső szögek összege',
          value: 'Háromszögben a három szög összege mindig pontosan 180° (α + β + γ = 180°)'
        }
      ]
    },

    // 2. SZINT: SZIMMETRIKUS ALAKZATOK SZERKESZTÉSI LÉPÉSEI (8 PÁR)
    2: {
      level: 2,
      title: '2. Szint: Szimmetrikus alakzatok szerkesztési módszerei',
      description: 'Párosítsd a síkidomokat a szerkesztésükhöz szükséges lépéssel!',
      pairs: [
        {
          id: 'p2-1',
          promptFigure: <ConstructionTasksMiniFigure type="isosceles_base_height" />,
          prompt: 'Egyenlő szárú △ (alap + magasság)',
          value: 'Az alap szakaszfelező merőlegesére mérjük fel az m_c magasságot'
        },
        {
          id: 'p2-2',
          promptFigure: <ConstructionTasksMiniFigure type="equilateral_construction" />,
          prompt: 'Szabályos háromszög (a)',
          value: 'Az AB = a szakasz mindkét végpontjából azonos a sugarú köríveket metszünk'
        },
        {
          id: 'p2-3',
          promptFigure: <ConstructionTasksMiniFigure type="rhombus_diagonals" />,
          prompt: 'Rombusz (két átlóból: e, f)',
          value: 'Az e átló felezőmerőlegesére rámérjük az f/2 távolságot fel és le'
        },
        {
          id: 'p2-4',
          promptFigure: <ConstructionTasksMiniFigure type="deltoid_construction" />,
          prompt: 'Deltoid (e átló és a, b oldalak)',
          value: 'Az A csúcsból a, a C csúcsból b sugarú köríveket húzunk alul-felül'
        },
        {
          id: 'p2-5',
          promptFigure: <ConstructionTasksMiniFigure type="trapezoid_construction" />,
          prompt: 'Húrtrapéz (a, c alapok, b szár)',
          value: 'Az alapok felezőmerőlegese a tengely, x = (a - c)/2 segédszakasszal szerkesztve'
        },
        {
          id: 'p2-6',
          promptFigure: <ConstructionTasksMiniFigure type="rectangle_construction" />,
          prompt: 'Téglalap (a, b oldalak)',
          value: 'Merőlegeseket állítunk az a oldal végpontjaiban és felmérjük a b oldalt'
        },
        {
          id: 'p2-7',
          promptFigure: <ConstructionTasksMiniFigure type="square_construction" />,
          prompt: 'Négyzet (a oldal)',
          value: '1 adatból: merőlegesek állításával és 4 egyenlő oldal felmérésével'
        },
        {
          id: 'p2-8',
          promptFigure: <ConstructionTasksMiniFigure type="symmetric_completion" />,
          prompt: 'Tengelyes kiegészítés',
          value: 'A csúcsokból merőlegest bocsátunk a tengelyre és átmérjük a távolságot'
        }
      ]
    },

    // 3. SZINT: DISZKUSSZIÓ, MÉRTANI HELYEK ÉS ADATOK SZÁMA (8 PÁR)
    3: {
      level: 3,
      title: '3. Szint: Diszkusszió, mértani helyek és elégséges adatok',
      description: 'Párosítsd a geometriai állításokat a rájuk vonatkozó szabállyal!',
      pairs: [
        {
          id: 'p3-1',
          promptFigure: <ConstructionTasksMiniFigure type="two_solutions" />,
          prompt: 'oosz alapeset (a < b szemközti szög)',
          value: 'A félsíkban 2 különböző megoldás vagy 0 megoldás jöhet létre'
        },
        {
          id: 'p3-2',
          promptFigure: <ConstructionTasksMiniFigure type="perpendicular_bisector" />,
          prompt: 'Szakaszfelező merőleges',
          value: 'Azon pontok mértani helye, amelyek egyenlő távol vannak a két végponttól'
        },
        {
          id: 'p3-3',
          promptFigure: <ConstructionTasksMiniFigure type="angle_bisector" />,
          prompt: 'Szögfelező félegyenes',
          value: 'Azon pontok halmaza, amelyek egyenlő távolságra vannak a szögszáraktól'
        },
        {
          id: 'p3-4',
          promptFigure: <ConstructionTasksMiniFigure type="sketch_analysis" />,
          prompt: 'Általános négyszög adatai',
          value: '5 független adat szükséges az egyértelmű megszerkesztéshez'
        },
        {
          id: 'p3-5',
          promptFigure: <ConstructionTasksMiniFigure type="rhombus_diagonals" />,
          prompt: 'Rombusz és téglalap adatai',
          value: '2 független adat elegendő a szimmetria és speciális tulajdonságok miatt'
        },
        {
          id: 'p3-6',
          promptFigure: <ConstructionTasksMiniFigure type="square_construction" />,
          prompt: 'Négyzet adatai',
          value: '1 független adat (oldalhossz vagy átló) elegendő'
        },
        {
          id: 'p3-7',
          promptFigure: <ConstructionTasksMiniFigure type="triangle_sss" />,
          prompt: 'Háromszög adatai',
          value: '3 független adat szükséges (amiből legalább egy oldalhossz)'
        },
        {
          id: 'p3-8',
          promptFigure: <ConstructionTasksMiniFigure type="triangle_inequality_ok" />,
          prompt: 'Diszkusszió definíciója',
          value: 'A feladat megoldhatóságának és a nem egybevágó megoldások számának elemzése'
        }
      ]
    }
  };

  const currentConfig = levelsConfig[level];

  return (
    <MatcherTemplate
      grade={6}
      chapterId="g6-geometry"
      title="Szerkesztési feladatok párosító"
      badge="📐 6. Osztály • III. Geometria • 10. Fejezet"
      topicId="g6-construction-tasks-matcher"
      themeColor="teal"
      currentLevel={level}
      config={currentConfig}
      onLevelChange={(lvl) => setLevel(lvl)}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onSwitchToTheory={onSwitchToTheory}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
}

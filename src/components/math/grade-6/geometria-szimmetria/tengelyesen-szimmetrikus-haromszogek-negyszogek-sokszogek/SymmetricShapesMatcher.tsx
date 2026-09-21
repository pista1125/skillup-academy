import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { SymmetricShapesMiniFigure } from './SymmetricShapesDiagrams';

export interface SymmetricShapesMatcherProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function SymmetricShapesMatcher({
  onBack,
  onSwitchToQuiz,
  onSwitchToSorter,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: SymmetricShapesMatcherProps) {
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
    // 1. SZINT: HÁROMSZÖGEK ÉS NÉGYSZÖGEK SZIMMETRIATENGELYEI (8 PÁR)
    1: {
      level: 1,
      title: '1. Szint: Alakzatok és szimmetriatengelyeik száma',
      description: 'Párosítsd a szimmetrikus síkidomokat a szimmetriatengelyeik pontos számával!',
      pairs: [
        {
          id: 'p1-1',
          promptFigure: <SymmetricShapesMiniFigure type="isosceles_triangle" />,
          prompt: 'Egyenlő szárú háromszög',
          value: '1 szimmetriatengely (alaphoz tartozó magasságvonal)'
        },
        {
          id: 'p1-2',
          promptFigure: <SymmetricShapesMiniFigure type="equilateral_triangle" />,
          prompt: 'Szabályos háromszög',
          value: '3 szimmetriatengely (3 oldalfelező merőleges)'
        },
        {
          id: 'p1-3',
          promptFigure: <SymmetricShapesMiniFigure type="deltoid" />,
          prompt: 'Deltoid',
          value: '1 szimmetriatengely (a szimmetriaátló egyenese)'
        },
        {
          id: 'p1-4',
          promptFigure: <SymmetricShapesMiniFigure type="isosceles_trapezoid" />,
          prompt: 'Szimmetrikus trapéz (húrtrapéz)',
          value: '1 szimmetriatengely (alapok közös felezőmerőlegese)'
        },
        {
          id: 'p1-5',
          promptFigure: <SymmetricShapesMiniFigure type="rectangle" />,
          prompt: 'Téglalap',
          value: '2 szimmetriatengely (2 szemközti oldalfelező)'
        },
        {
          id: 'p1-6',
          promptFigure: <SymmetricShapesMiniFigure type="rhombus" />,
          prompt: 'Rombusz',
          value: '2 szimmetriatengely (a 2 átló egyenese)'
        },
        {
          id: 'p1-7',
          promptFigure: <SymmetricShapesMiniFigure type="square" />,
          prompt: 'Négyzet',
          value: '4 szimmetriatengely (2 oldalfelező + 2 átló)'
        },
        {
          id: 'p1-8',
          promptFigure: <SymmetricShapesMiniFigure type="general_triangle" />,
          prompt: 'Általános háromszög',
          value: '0 szimmetriatengely (aszimmetrikus síkidom)'
        }
      ]
    },

    // 2. SZINT: ÁTLÓK, SZÖGEK ÉS TENGELYEK TULAJDONSÁGAI (8 PÁR)
    2: {
      level: 2,
      title: '2. Szint: Átlók, oldalak és szögek szimmetriái',
      description: 'Párosítsd az alakzatokat a rájuk jellemző geometriai állítással!',
      pairs: [
        {
          id: 'p2-1',
          promptFigure: <SymmetricShapesMiniFigure type="deltoid" />,
          prompt: 'Deltoid átlói',
          value: 'Merőlegesek egymásra és a szimmetriaátló felezi a másikat'
        },
        {
          id: 'p2-2',
          promptFigure: <SymmetricShapesMiniFigure type="isosceles_trapezoid" />,
          prompt: 'Húrtrapéz átlói',
          value: 'Egyenlő hosszúak (e = f), de nem merőlegesek egymásra'
        },
        {
          id: 'p2-3',
          promptFigure: <SymmetricShapesMiniFigure type="rectangle" />,
          prompt: 'Téglalap átlói',
          value: 'Egyenlők és felezik egymást, de NEM szimmetriatengelyek'
        },
        {
          id: 'p2-4',
          promptFigure: <SymmetricShapesMiniFigure type="rhombus" />,
          prompt: 'Rombusz átlói',
          value: 'Merőlegesen felezik egymást és szimmetriatengelyek'
        },
        {
          id: 'p2-5',
          promptFigure: <SymmetricShapesMiniFigure type="square" />,
          prompt: 'Négyzet átlói',
          value: 'Egyenlők, merőlegesen felezik egymást és szimmetriatengelyek'
        },
        {
          id: 'p2-6',
          promptFigure: <SymmetricShapesMiniFigure type="isosceles_triangle" />,
          prompt: 'Egyenlő szárú háromszög szögei',
          value: 'Az alapon fekvő két szög mindig egyenlő (α = β)'
        },
        {
          id: 'p2-7',
          promptFigure: <SymmetricShapesMiniFigure type="equilateral_triangle" />,
          prompt: 'Szabályos háromszög szögei',
          value: 'Minden belső szöge pontosan 60°-os'
        },
        {
          id: 'p2-8',
          promptFigure: <SymmetricShapesMiniFigure type="parallelogram" />,
          prompt: 'Általános paralelogramma',
          value: 'Nincs tengelyes szimmetriája (0 db tengely)'
        }
      ]
    },

    // 3. SZINT: SZABÁLYOS SOKSZÖGEK ÉS ÖSSZETETT TULAJDONSÁGOK (8 PÁR)
    3: {
      level: 3,
      title: '3. Szint: Szabályos sokszögek és speciális alakzatok',
      description: 'Párosítsd a sokszögeket a szimmetriájukra vonatkozó szabállyal!',
      pairs: [
        {
          id: 'p3-1',
          promptFigure: <SymmetricShapesMiniFigure type="regular_pentagon" />,
          prompt: 'Szabályos ötszög (5-szög)',
          value: '5 tengely (mindegyik csúcsból szemközti oldalfelezőbe)'
        },
        {
          id: 'p3-2',
          promptFigure: <SymmetricShapesMiniFigure type="regular_hexagon" />,
          prompt: 'Szabályos hatszög (6-szög)',
          value: '6 tengely (3 szemközti csúcsátló + 3 oldalfelező)'
        },
        {
          id: 'p3-3',
          promptFigure: <SymmetricShapesMiniFigure type="regular_octagon" />,
          prompt: 'Szabályos nyolcszög (8-szög)',
          value: '8 tengely (4 csúcsátló + 4 oldalfelező)'
        },
        {
          id: 'p3-4',
          promptFigure: <SymmetricShapesMiniFigure type="right_triangle" />,
          prompt: 'Derékszögű egyenlő szárú háromszög',
          value: '1 tengely (a 90°-os csúcsból az átfogó felezőjébe)'
        },
        {
          id: 'p3-5',
          promptFigure: <SymmetricShapesMiniFigure type="semicircle" />,
          prompt: 'Félkör alakzat',
          value: '1 tengely (az átmérő szakasz felezőmerőlegese)'
        },
        {
          id: 'p3-6',
          promptFigure: <SymmetricShapesMiniFigure type="infinite_axes" />,
          prompt: 'Körvonal és körlap',
          value: 'Végtelen sok (∞) szimmetriatengely (átmérők)'
        },
        {
          id: 'p3-7',
          promptFigure: <SymmetricShapesMiniFigure type="general_trapezoid" />,
          prompt: 'Általános trapéz',
          value: '0 szimmetriatengely (nem tengelyesen szimmetrikus)'
        },
        {
          id: 'p3-8',
          promptFigure: <SymmetricShapesMiniFigure type="four_axes" />,
          prompt: 'Szabályos 12-szög',
          value: '12 szimmetriatengely (6 csúcsátló + 6 oldalfelező)'
        }
      ]
    }
  };

  const currentConfig = levelsConfig[level];

  return (
    <MatcherTemplate
      grade={6}
      chapterId="g6-geometry"
      title="Szimmetrikus alakzatok párosító"
      badge="📐 6. Osztály • III. Geometria • 9. Fejezet"
      topicId="g6-symmetric-shapes-matcher"
      themeColor="rose"
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

import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { BisectorMatcherFigure } from './BisectorDiagrams';

export interface BisectorSorterProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function BisectorSorter({
  onBack,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: BisectorSorterProps) {
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

  const levelsConfig: Record<DifficultyLevel, SorterLevelConfig> = {
    // 1. SZINT: GEOMETRIAI TÍPUSOK (Pontok, Szakaszok, Egyenesek)
    1: {
      level: 1,
      title: 'Geometriai elemek és fajták',
      subtitle: 'Csoportosítsd a szakaszfelező merőlegeshez kapcsolódó ábrákat geometriai típusuk szerint!',
      categories: [
        {
          id: 'points',
          title: 'Pontok a szerkesztésben',
          description: 'Kiterjedés nélküli pontok és metszéspontok',
          color: 'emerald'
        },
        {
          id: 'segments',
          title: 'Szakaszok & Távolságok',
          description: 'Két pont által határolt mérhető vonaldarabok',
          color: 'blue'
        },
        {
          id: 'lines',
          title: 'Egyenesek & Tengelyek',
          description: 'Mindkét irányban végtelen egyenes vonalak',
          color: 'purple'
        }
      ],
      items: [
        { id: 'i1-1', figure: <BisectorMatcherFigure type="midpoint" />, text: 'F felezőpont', categoryId: 'points' },
        { id: 'i1-2', figure: <BisectorMatcherFigure type="construction_arcs" />, text: 'M₁ és M₂ metszéspontok', categoryId: 'points' },
        { id: 'i1-3', figure: <BisectorMatcherFigure type="triangle_circumcenter" />, text: 'O körülírt középpont', categoryId: 'points' },
        { id: 'i1-4', figure: <BisectorMatcherFigure type="distance_equality" />, text: 'P pont a felezőn', categoryId: 'points' },
        { id: 'i1-5', figure: <BisectorMatcherFigure type="definition" />, text: 'AB alap szakasz', categoryId: 'segments' },
        { id: 'i1-6', figure: <BisectorMatcherFigure type="isosceles_triangle" />, text: 'PA és PB szárak', categoryId: 'segments' },
        { id: 'i1-7', figure: <BisectorMatcherFigure type="midpoint" />, text: 'AF = FB fél-szakaszok', categoryId: 'segments' },
        { id: 'i1-8', figure: <BisectorMatcherFigure type="triangle_circumcenter" />, text: 'OA = R körülírt sugár', categoryId: 'segments' },
        { id: 'i1-9', figure: <BisectorMatcherFigure type="definition" />, text: 'f_AB felezőmerőleges', categoryId: 'lines' },
        { id: 'i1-10', figure: <BisectorMatcherFigure type="symmetry_axis" />, text: 't szimmetriatengely', categoryId: 'lines' },
        { id: 'i1-11', figure: <BisectorMatcherFigure type="definition" />, text: 'AB szakasz egyenese', categoryId: 'lines' },
        { id: 'i1-12', figure: <BisectorMatcherFigure type="triangle_circumcenter" />, text: 'f_a, f_b, f_c oldalfelezők', categoryId: 'lines' }
      ]
    },

    // 2. SZINT: TÁVOLSÁGI HELYZETEK ÉS FÉLSÍKOK
    2: {
      level: 2,
      title: 'Pontok elhelyezkedése a síkban a távolság szerint',
      subtitle: 'Sorold be a pontokat a végpontoktól (A és B) mért távolságuk viszonya alapján!',
      categories: [
        {
          id: 'on-bisector',
          title: 'PA = PB (Felezőmerőlegesen)',
          description: 'Pontosan egyenlő távolságra van A-tól és B-től',
          color: 'emerald'
        },
        {
          id: 'closer-to-a',
          title: 'PA < PB (Közelebb A-hoz)',
          description: 'Az A felőli félsíkban helyezkedik el',
          color: 'rose'
        },
        {
          id: 'closer-to-b',
          title: 'PA > PB (Közelebb B-hez)',
          description: 'A B felőli félsíkban helyezkedik el',
          color: 'blue'
        }
      ],
      items: [
        { id: 'i2-1', figure: <BisectorMatcherFigure type="distance_equality" />, text: 'PA = 8 cm, PB = 8 cm', categoryId: 'on-bisector' },
        { id: 'i2-2', figure: <BisectorMatcherFigure type="midpoint" />, text: 'F felezőpont (AF = FB)', categoryId: 'on-bisector' },
        { id: 'i2-3', figure: <BisectorMatcherFigure type="isosceles_triangle" />, text: 'Egyenlő szárú △ P csúcsa', categoryId: 'on-bisector' },
        { id: 'i2-4', figure: <BisectorMatcherFigure type="closer_to_A" />, text: 'PA = 4 cm, PB = 9 cm', categoryId: 'closer-to-a' },
        { id: 'i2-5', figure: <BisectorMatcherFigure type="closer_to_A" />, text: 'A pont maga (d=0 < AB)', categoryId: 'closer-to-a' },
        { id: 'i2-6', figure: <BisectorMatcherFigure type="closer_to_A" />, text: 'PA = 3 cm, PB = 7 cm', categoryId: 'closer-to-a' },
        { id: 'i2-7', figure: <BisectorMatcherFigure type="closer_to_B" />, text: 'PA = 10 cm, PB = 5 cm', categoryId: 'closer-to-b' },
        { id: 'i2-8', figure: <BisectorMatcherFigure type="closer_to_B" />, text: 'B pont maga (d=0 < AB)', categoryId: 'closer-to-b' },
        { id: 'i2-9', figure: <BisectorMatcherFigure type="closer_to_B" />, text: 'PA = 12 cm, PB = 2 cm', categoryId: 'closer-to-b' },
        { id: 'i2-10', figure: <BisectorMatcherFigure type="construction_arcs" />, text: 'M₁ szerkesztési pont', categoryId: 'on-bisector' },
        { id: 'i2-11', figure: <BisectorMatcherFigure type="construction_arcs" />, text: 'M₂ szerkesztési pont', categoryId: 'on-bisector' },
        { id: 'i2-12', figure: <BisectorMatcherFigure type="triangle_circumcenter" />, text: 'Körülírt kör O pontja', categoryId: 'on-bisector' }
      ]
    },

    // 3. SZINT: HÁROMSZÖGEK KÖRÜLÍRT KÖR KÖZÉPPONTJA (O)
    3: {
      level: 3,
      title: 'Háromszögek körülírt kör középpontjának (O) helyzete',
      subtitle: 'Döntsd el a háromszögek adatai és szögei alapján, hol helyezkedik el a körülírt kör O középpontja!',
      categories: [
        {
          id: 'inside',
          title: 'A háromszög belsejében',
          description: 'Hegyesszögű háromszögek (minden szög < 90°)',
          color: 'emerald'
        },
        {
          id: 'hypotenuse',
          title: 'Az átfogó felezőpontján',
          description: 'Derékszögű háromszögek (Thalész-tétel, szög = 90°)',
          color: 'teal'
        },
        {
          id: 'outside',
          title: 'A háromszögön kívül',
          description: 'Tompaszögű háromszögek (van szög > 90°)',
          color: 'rose'
        }
      ],
      items: [
        { id: 'i3-1', figure: <BisectorMatcherFigure type="triangle_circumcenter" />, text: 'Szabályos △ (60°, 60°, 60°)', categoryId: 'inside' },
        { id: 'i3-2', figure: <BisectorMatcherFigure type="triangle_circumcenter" />, text: 'Hegyesszögű △ (50°, 60°, 70°)', categoryId: 'inside' },
        { id: 'i3-3', figure: <BisectorMatcherFigure type="right_angle_bisector" />, text: '90°-os derékszögű △', categoryId: 'hypotenuse' },
        { id: 'i3-4', figure: <BisectorMatcherFigure type="right_angle_bisector" />, text: '3-4-5 cm derékszögű △', categoryId: 'hypotenuse' },
        { id: 'i3-5', figure: <BisectorMatcherFigure type="obtuse_triangle_bisectors" />, text: '120°-os tompaszögű △', categoryId: 'outside' },
        { id: 'i3-6', figure: <BisectorMatcherFigure type="obtuse_triangle_bisectors" />, text: '100°-os tompaszögű △', categoryId: 'outside' },
        { id: 'i3-7', figure: <BisectorMatcherFigure type="triangle_circumcenter" />, text: 'Egyenlő szárú hegyes △ (70°, 70°)', categoryId: 'inside' },
        { id: 'i3-8', figure: <BisectorMatcherFigure type="right_angle_bisector" />, text: 'Átfogóra eső O (Thalész)', categoryId: 'hypotenuse' },
        { id: 'i3-9', figure: <BisectorMatcherFigure type="obtuse_triangle_bisectors" />, text: '135°-os tompaszögű △', categoryId: 'outside' },
        { id: 'i3-10', figure: <BisectorMatcherFigure type="triangle_circumcenter" />, text: 'Egyenlő oldalú háromszög', categoryId: 'inside' }
      ]
    }
  };

  return (
    <SorterTemplate
      level={level}
      levels={levelsConfig}
      grade={6}
      chapterId="g6-geometry"
      title="Szakaszfelező Merőleges Csoportosító"
      subtitle="Rendezd a felezőmerőleges ábráit, távolságait és háromszög-középpontjait a megfelelő kategóriákba!"
      badge="📐 6. Osztály • III. Geometria • 4. Fejezet"
      topicId="g6-bisector-sorter"
      themeColor="teal"
      onBack={onBack}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
}

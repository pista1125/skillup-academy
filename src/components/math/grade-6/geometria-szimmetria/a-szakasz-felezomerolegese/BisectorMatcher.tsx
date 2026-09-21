import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { BisectorMatcherFigure } from './BisectorDiagrams';

export interface BisectorMatcherProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function BisectorMatcher({
  onBack,
  onSwitchToQuiz,
  onSwitchToSorter,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: BisectorMatcherProps) {
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
    // 1. SZINT: ALAPFOGALMAK ÉS DEFINÍCIÓ
    1: {
      level: 1,
      title: 'Felezőmerőleges alapjai és tulajdonságai',
      description: 'Párosítsd a szakaszfelező merőleges ábráit a megfelelő geometriai definíciókkal!',
      pairs: [
        {
          id: 'p1-1',
          promptFigure: <BisectorMatcherFigure type="definition" />,
          prompt: 'f_AB felezőmerőleges',
          value: 'A szakasz felezőpontján áthaladó, arra merőleges egyenes (f ⊥ AB)'
        },
        {
          id: 'p1-2',
          promptFigure: <BisectorMatcherFigure type="distance_equality" />,
          prompt: 'Ponthalmaz tétel',
          value: 'd(P, A) = d(P, B) (minden P pontja egyenlő távolságra van A-tól és B-től)'
        },
        {
          id: 'p1-3',
          promptFigure: <BisectorMatcherFigure type="midpoint" />,
          prompt: 'F felezőpont',
          value: 'A szakaszt két egyenlő hosszúságú részre osztja (AF = FB)'
        },
        {
          id: 'p1-4',
          promptFigure: <BisectorMatcherFigure type="construction_arcs" />,
          prompt: 'Szerkesztés körzővel',
          value: 'A és B pontokból húzott azonos (r > AB/2) sugarú körívek metszéspontjai'
        },
        {
          id: 'p1-5',
          promptFigure: <BisectorMatcherFigure type="symmetry_axis" />,
          prompt: 'Tengelyes szimmetria',
          value: 'A szakasz szimmetriatengelye: az A pont tükörképe B, a B ponté A'
        },
        {
          id: 'p1-6',
          promptFigure: <BisectorMatcherFigure type="isosceles_triangle" />,
          prompt: '△APB háromszög',
          value: 'Egyenlő szárú háromszög, amelynek szárai: PA = PB'
        },
        {
          id: 'p1-7',
          promptFigure: <BisectorMatcherFigure type="distance_equality" />,
          prompt: 'PA = 7 cm ha P ∈ f_AB',
          value: 'PB = 7 cm (mivel a felezőmerőleges pontjaira PA = PB)'
        },
        {
          id: 'p1-8',
          promptFigure: <BisectorMatcherFigure type="definition" />,
          prompt: 'f ⊥ AB szimbólum',
          value: 'A merőlegesség matematikai jele (pontosan 90°-os derékszög)'
        }
      ]
    },

    // 2. SZINT: SZERKESZTÉS, FÉLSÍKOK ÉS TÁVOLSÁGOK
    2: {
      level: 2,
      title: 'Szerkesztés, félsíkok és távolsági szabályok',
      description: 'Párosítsd a körzőnyílás feltételeit, félsíkok távolságait és szimmetriáit!',
      pairs: [
        {
          id: 'p2-1',
          promptFigure: <BisectorMatcherFigure type="construction_arcs" />,
          prompt: 'Körzőnyílás (r)',
          value: 'Nagyobbnak kell lennie a szakasz felénél: r > AB / 2'
        },
        {
          id: 'p2-2',
          promptFigure: <BisectorMatcherFigure type="closer_to_A" />,
          prompt: 'PA < PB feltétel',
          value: 'A pont az A felőli félsíkban van, közelebb van A-hoz mint B-hez'
        },
        {
          id: 'p2-3',
          promptFigure: <BisectorMatcherFigure type="closer_to_B" />,
          prompt: 'PA > PB feltétel',
          value: 'A pont a B felőli félsíkban van, közelebb van B-hez mint A-hoz'
        },
        {
          id: 'p2-4',
          promptFigure: <BisectorMatcherFigure type="midpoint" />,
          prompt: 'AB = 16 cm ⟹ AF = ?',
          value: 'AF = 8 cm és FB = 8 cm (mivel F felezi a szakaszt)'
        },
        {
          id: 'p2-5',
          promptFigure: <BisectorMatcherFigure type="midpoint" />,
          prompt: 'P ∈ AB és PA = PB',
          value: 'P pontosan az AB szakasz F felezőpontja'
        },
        {
          id: 'p2-6',
          promptFigure: <BisectorMatcherFigure type="symmetry_axis" />,
          prompt: 'Tükrözés definíciója',
          value: 'A tükörtengely az összetartozó pontpárok szakaszának felezőmerőlegese'
        },
        {
          id: 'p2-7',
          promptFigure: <BisectorMatcherFigure type="construction_arcs" />,
          prompt: 'M₁ és M₂ pontok',
          value: 'A szerkesztő körívek metszéspontjai, melyek egyértelműen meghatározzák f-et'
        },
        {
          id: 'p2-8',
          promptFigure: <BisectorMatcherFigure type="isosceles_triangle" />,
          prompt: 'Egyenlő szárú △ tengelye',
          value: 'Az alaphoz tartozó magasságvonal és a felezőmerőleges egybeesik'
        }
      ]
    },

    // 3. SZINT: HÁROMSZÖGEK ÉS KÖRÜLÍRT KÖR
    3: {
      level: 3,
      title: 'Háromszögek oldalfelezői és a körülírt kör',
      description: 'Párosítsd a háromszögek körülírt körének középpontját és elhelyezkedését!',
      pairs: [
        {
          id: 'p3-1',
          promptFigure: <BisectorMatcherFigure type="triangle_circumcenter" />,
          prompt: 'Körülírt kör középpontja (O)',
          value: 'A háromszög 3 oldalfelező merőlegesének közös metszéspontja'
        },
        {
          id: 'p3-2',
          promptFigure: <BisectorMatcherFigure type="triangle_circumcenter" />,
          prompt: 'OA = OB = OC = R',
          value: 'Az O pont egyenlő távolságra (R sugár) van mindhárom csúcstól'
        },
        {
          id: 'p3-3',
          promptFigure: <BisectorMatcherFigure type="triangle_circumcenter" />,
          prompt: 'Hegyesszögű háromszög',
          value: 'Az O körülírt kör középpont a háromszög belsejében helyezkedik el'
        },
        {
          id: 'p3-4',
          promptFigure: <BisectorMatcherFigure type="right_angle_bisector" />,
          prompt: 'Derékszögű háromszög',
          value: 'Az O középpont pontosan az átfogó felezőpontjára esik (Thalész-tétel)'
        },
        {
          id: 'p3-5',
          promptFigure: <BisectorMatcherFigure type="obtuse_triangle_bisectors" />,
          prompt: 'Tompaszögű háromszög',
          value: 'Az O középpont a háromszögön kívülre esik'
        },
        {
          id: 'p3-6',
          promptFigure: <BisectorMatcherFigure type="definition" />,
          prompt: 'Kör húrjának felezője',
          value: 'Bármely húr felezőmerőlegese átmegy a kör O középpontján'
        },
        {
          id: 'p3-7',
          promptFigure: <BisectorMatcherFigure type="triangle_circumcenter" />,
          prompt: 'OA = 9 cm ⟹ R = ?',
          value: 'A körülírt kör sugara pontosan R = 9 cm (mivel OB = OC = 9 cm)'
        },
        {
          id: 'p3-8',
          promptFigure: <BisectorMatcherFigure type="triangle_circumcenter" />,
          prompt: 'Szabályos háromszög',
          value: 'Az oldalfelező merőlegesek, szögfelezők és magasságvonalak egybeesnek'
        }
      ]
    }
  };

  return (
    <MatcherTemplate
      level={level}
      levels={levelsConfig}
      grade={6}
      chapterId="g6-geometry"
      title="Szakaszfelező Merőleges Párosító"
      subtitle="Keresd meg az összetartozó felezőmerőleges ábrákat, távolsági szabályokat és tételeket!"
      badge="📐 6. Osztály • III. Geometria • 4. Fejezet"
      topicId="g6-bisector-matcher"
      themeColor="teal"
      onBack={onBack}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
}

import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { GeometrySummaryMiniFigure } from './GeometrySummaryDiagrams';

export interface GeometrySummaryMatcherProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function GeometrySummaryMatcher({
  onBack,
  onSwitchToQuiz,
  onSwitchToSorter,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: GeometrySummaryMatcherProps) {
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
    // 1. SZINT: ALAPFOGALMAK, KÖR ÉS TÜKRÖZÉSI SZABÁLYOK (8 PÁR)
    1: {
      level: 1,
      title: '1. Szint: Alapfogalmak és definíciók párosítása',
      description: 'Párosítsd a geometriai fogalmakat a pontos matematikai jelentésükkel!',
      pairs: [
        {
          id: 'p1-1',
          promptFigure: <GeometrySummaryMiniFigure type="perpendicular_bisector" />,
          prompt: 'Szakaszfelező merőleges',
          value: 'Azon pontok halmaza, melyek a végpontoktól egyenlő távol vannak (PA = PB)'
        },
        {
          id: 'p1-2',
          promptFigure: <GeometrySummaryMiniFigure type="angle_bisector" />,
          prompt: 'Szögfelező félegyenes',
          value: 'Azon pontok halmaza, melyek a két szögszártól egyenlő távolságra vannak'
        },
        {
          id: 'p1-3',
          promptFigure: <GeometrySummaryMiniFigure type="circle_parts" />,
          prompt: 'Kör átmérője (d)',
          value: 'A középponton átmenő leghosszabb húr (d = 2 · r)'
        },
        {
          id: 'p1-4',
          promptFigure: <GeometrySummaryMiniFigure type="tangent_perpendicular" />,
          prompt: 'Kör érintője (e)',
          value: 'Pontosan 1 közös pontja van a körrel, és merőleges az érintési sugárra'
        },
        {
          id: 'p1-5',
          promptFigure: <GeometrySummaryMiniFigure type="five_properties" />,
          prompt: 'Tengelyes tükrözés',
          value: 'Egybevágó, távolságtartó, szögtartó és orientációváltó transzformáció'
        },
        {
          id: 'p1-6',
          promptFigure: <GeometrySummaryMiniFigure type="axial_reflection_point" />,
          prompt: 'Fixpontok a tükrözésnél',
          value: 'Kizárólag a tükörtengelyen lévő pontok képe egyezik meg önmagával'
        },
        {
          id: 'p1-7',
          promptFigure: <GeometrySummaryMiniFigure type="planar_elements" />,
          prompt: 'Háromszög belső szögei',
          value: 'Összegük mindig pontosan 180° (α + β + γ = 180°)'
        },
        {
          id: 'p1-8',
          promptFigure: <GeometrySummaryMiniFigure type="symmetry_axis_square" />,
          prompt: 'Négyszög belső szögei',
          value: 'Összegük mindig pontosan 360° (két háromszögre bontható)'
        }
      ]
    },

    // 2. SZINT: SÍKIDOMOK ÉS SZIMMETRIATENGELYEK (8 PÁR)
    2: {
      level: 2,
      title: '2. Szint: Síkidomok és szimmetriatengelyeik',
      description: 'Párosítsd a síkidomokat a szimmetriatengelyeik pontos számával és elhelyezkedésével!',
      pairs: [
        {
          id: 'p2-1',
          promptFigure: <GeometrySummaryMiniFigure type="symmetry_axis_isosceles" />,
          prompt: 'Egyenlő szárú háromszög',
          value: '1 szimmetriatengely (az alaphoz tartozó felezőmerőleges)'
        },
        {
          id: 'p2-2',
          promptFigure: <GeometrySummaryMiniFigure type="symmetry_axis_equilateral" />,
          prompt: 'Szabályos háromszög',
          value: '3 szimmetriatengely (a három oldalfelező merőleges)'
        },
        {
          id: 'p2-3',
          promptFigure: <GeometrySummaryMiniFigure type="symmetry_axis_rectangle" />,
          prompt: 'Téglalap',
          value: '2 szimmetriatengely (a szemközti oldalak felezőmerőlegesei)'
        },
        {
          id: 'p2-4',
          promptFigure: <GeometrySummaryMiniFigure type="symmetry_axis_rhombus" />,
          prompt: 'Rombusz',
          value: '2 szimmetriatengely (a két átló egyenese)'
        },
        {
          id: 'p2-5',
          promptFigure: <GeometrySummaryMiniFigure type="symmetry_axis_square" />,
          prompt: 'Négyzet',
          value: '4 szimmetriatengely (2 oldalfelező merőleges + 2 átló)'
        },
        {
          id: 'p2-6',
          promptFigure: <GeometrySummaryMiniFigure type="symmetry_axis_deltoid" />,
          prompt: 'Deltoid',
          value: '1 szimmetriatengely (a szimmetriaátló egyenese)'
        },
        {
          id: 'p2-7',
          promptFigure: <GeometrySummaryMiniFigure type="symmetry_axis_isosceles_trapezoid" />,
          prompt: 'Húrtrapéz',
          value: '1 szimmetriatengely (a párhuzamos alapok közös oldalfelezője)'
        },
        {
          id: 'p2-8',
          promptFigure: <GeometrySummaryMiniFigure type="symmetry_axis_circle" />,
          prompt: 'Kör',
          value: 'Végtelen sok szimmetriatengely (bármely, a középponton átmenő egyenes)'
        }
      ]
    },

    // 3. SZINT: SZERKESZTÉSEK, MÉRTANI HELYEK ÉS TÉTELEK (8 PÁR)
    3: {
      level: 3,
      title: '3. Szint: Szerkesztési tételek és mértani helyek',
      description: 'Párosítsd a szerkesztési alapszabályokat és mértani tételeket a jelentésükkel!',
      pairs: [
        {
          id: 'p3-1',
          promptFigure: <GeometrySummaryMiniFigure type="triangle_inequality_rule" />,
          prompt: 'Háromszög-egyenlőtlenség',
          value: 'a + b > c (a két rövidebb oldal összege nagyobb a leghosszabbnál)'
        },
        {
          id: 'p3-2',
          promptFigure: <GeometrySummaryMiniFigure type="perpendicular_bisector" />,
          prompt: 'Köré írható kör középpontja',
          value: 'A három oldalfelező merőleges közös metszéspontja'
        },
        {
          id: 'p3-3',
          promptFigure: <GeometrySummaryMiniFigure type="angle_bisector" />,
          prompt: 'Beírható kör középpontja',
          value: 'A három belső szögfelező közös metszéspontja'
        },
        {
          id: 'p3-4',
          promptFigure: <GeometrySummaryMiniFigure type="circle_parts" />,
          prompt: 'Thalész-tétel derékszögnél',
          value: 'A derékszögű háromszög átfogója a köré írt kör átmérője (r = c/2)'
        },
        {
          id: 'p3-5',
          promptFigure: <GeometrySummaryMiniFigure type="triangle_sss" />,
          prompt: 'ooo (SSS) alapeset',
          value: '3 oldal ismeretében körívek metszéspontjával szerkesztünk'
        },
        {
          id: 'p3-6',
          promptFigure: <GeometrySummaryMiniFigure type="triangle_sas" />,
          prompt: 'oszo (SAS) alapeset',
          value: '2 oldal és a közbezárt szög ismeretében szerkesztünk'
        },
        {
          id: 'p3-7',
          promptFigure: <GeometrySummaryMiniFigure type="triangle_asa" />,
          prompt: 'szosz (ASA) alapeset',
          value: '1 oldal és a rajta fekvő két szög ismeretében szerkesztünk'
        },
        {
          id: 'p3-8',
          promptFigure: <GeometrySummaryMiniFigure type="two_solutions" />,
          prompt: '2 metsző tengelyre tükrözés',
          value: 'Elforgatás a metszéspont körül a tengelyek szögének kétszeresével'
        }
      ]
    }
  };

  return (
    <MatcherTemplate
      grade={6}
      chapterId="g6-geometry"
      title="Geometria és Szimmetria Párosító"
      subtitle="Párosítsd össze a fogalmakat, szimmetriákat és szerkesztési alaptételeket!"
      badge="🧩 6. Osztály • III. Geometria • 11. Fejezet"
      topicId="g6-geometry-summary-matcher"
      themeColor="amber"
      levels={levelsConfig}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onSwitchToTheory={onSwitchToTheory}
      level={level}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
}

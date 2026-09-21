import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { GeometrySummaryMiniFigure } from './GeometrySummaryDiagrams';

export interface GeometrySummarySorterProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function GeometrySummarySorter({
  onBack,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: GeometrySummarySorterProps) {
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
    // 1. SZINT: TENGELYESEN SZIMMETRIKUS VS. NEM SZIMMETRIKUS ALAKZATOK (10 ELEM)
    1: {
      level: 1,
      title: '1. Szint: Szimmetrikus vagy aszimmetrikus síkidomok?',
      description: 'Csoportosítsd a síkidomokat aszerint, hogy rendelkeznek-e tengelyes szimmetriával!',
      categories: [
        {
          id: 'cat-symmetric',
          title: 'Tengelyesen szimmetrikus alakzat',
          description: 'Létezik legalább 1 szimmetriatengelye, amire tükrözve önmagába megy át'
        },
        {
          id: 'cat-asymmetric',
          title: 'Nem szimmetrikus (0 tengely)',
          description: 'Nincs olyan egyenes a síkban, amire tükrözve fedné önmagát'
        }
      ],
      items: [
        {
          id: 's1-1',
          text: 'Egyenlő szárú háromszög',
          categoryId: 'cat-symmetric',
          figure: <GeometrySummaryMiniFigure type="symmetry_axis_isosceles" size={48} />
        },
        {
          id: 's1-2',
          text: 'Általános háromszög (oldalai: 3 cm, 5 cm, 7 cm)',
          categoryId: 'cat-asymmetric',
          figure: <GeometrySummaryMiniFigure type="planar_elements" size={48} />
        },
        {
          id: 's1-3',
          text: 'Téglalap',
          categoryId: 'cat-symmetric',
          figure: <GeometrySummaryMiniFigure type="symmetry_axis_rectangle" size={48} />
        },
        {
          id: 's1-4',
          text: 'Általános paralelogramma (nem rombusz / téglalap)',
          categoryId: 'cat-asymmetric',
          figure: <GeometrySummaryMiniFigure type="planar_elements" size={48} />
        },
        {
          id: 's1-5',
          text: 'Rombusz',
          categoryId: 'cat-symmetric',
          figure: <GeometrySummaryMiniFigure type="symmetry_axis_rhombus" size={48} />
        },
        {
          id: 's1-6',
          text: 'Általános trapéz (különböző szárakkal)',
          categoryId: 'cat-asymmetric',
          figure: <GeometrySummaryMiniFigure type="planar_elements" size={48} />
        },
        {
          id: 's1-7',
          text: 'Húrtrapéz (egyenlő szárú trapéz)',
          categoryId: 'cat-symmetric',
          figure: <GeometrySummaryMiniFigure type="symmetry_axis_isosceles_trapezoid" size={48} />
        },
        {
          id: 's1-8',
          text: 'Szabályos ötszög',
          categoryId: 'cat-symmetric',
          figure: <GeometrySummaryMiniFigure type="regular_polygon_axes" size={48} />
        },
        {
          id: 's1-9',
          text: 'Deltoid',
          categoryId: 'cat-symmetric',
          figure: <GeometrySummaryMiniFigure type="symmetry_axis_deltoid" size={48} />
        },
        {
          id: 's1-10',
          text: 'Általános derékszögű háromszög (befogók: 3 cm és 4 cm)',
          categoryId: 'cat-asymmetric',
          figure: <GeometrySummaryMiniFigure type="planar_elements" size={48} />
        }
      ]
    },

    // 2. SZINT: SZIMMETRIATENGELYEK SZÁMA SZERINTI CSOPORTOSÍTÁS (10 ELEM)
    2: {
      level: 2,
      title: '2. Szint: Szimmetriatengelyek száma',
      description: 'Hány szimmetriatengellyel rendelkeznek az alábbi geometriai alakzatok?',
      categories: [
        {
          id: 'cat-1-axis',
          title: 'Pontosan 1 tengely',
          description: 'Egyetlen szimmetriatengellyel rendelkezik'
        },
        {
          id: 'cat-2-axes',
          title: 'Pontosan 2 tengely',
          description: 'Két egymásra merőleges szimmetriatengelye van'
        },
        {
          id: 'cat-4-plus-axes',
          title: '4 vagy több (akár ∞) tengely',
          description: 'Négyzet, szabályos sokszögek vagy kör'
        }
      ],
      items: [
        {
          id: 's2-1',
          text: 'Egyenlő szárú háromszög (alap felezőmerőlegese)',
          categoryId: 'cat-1-axis',
          figure: <GeometrySummaryMiniFigure type="symmetry_axis_isosceles" size={48} />
        },
        {
          id: 's2-2',
          text: 'Téglalap (nem négyzet)',
          categoryId: 'cat-2-axes',
          figure: <GeometrySummaryMiniFigure type="symmetry_axis_rectangle" size={48} />
        },
        {
          id: 's2-3',
          text: 'Négyzet (2 oldalfelező + 2 átló)',
          categoryId: 'cat-4-plus-axes',
          figure: <GeometrySummaryMiniFigure type="symmetry_axis_square" size={48} />
        },
        {
          id: 's2-4',
          text: 'Deltoid (nem rombusz)',
          categoryId: 'cat-1-axis',
          figure: <GeometrySummaryMiniFigure type="symmetry_axis_deltoid" size={48} />
        },
        {
          id: 's2-5',
          text: 'Rombusz (nem négyzet, a 2 átlója mentén)',
          categoryId: 'cat-2-axes',
          figure: <GeometrySummaryMiniFigure type="symmetry_axis_rhombus" size={48} />
        },
        {
          id: 's2-6',
          text: 'Húrtrapéz (az alapok felezőmerőlegese)',
          categoryId: 'cat-1-axis',
          figure: <GeometrySummaryMiniFigure type="symmetry_axis_isosceles_trapezoid" size={48} />
        },
        {
          id: 's2-7',
          text: 'Kör (minden átmérője mentén)',
          categoryId: 'cat-4-plus-axes',
          figure: <GeometrySummaryMiniFigure type="symmetry_axis_circle" size={48} />
        },
        {
          id: 's2-8',
          text: 'Szabályos hatszög (6 szimmetriatengely)',
          categoryId: 'cat-4-plus-axes',
          figure: <GeometrySummaryMiniFigure type="regular_polygon_axes" size={48} />
        },
        {
          id: 's2-9',
          text: 'Szabályos nyolcszög (8 szimmetriatengely)',
          categoryId: 'cat-4-plus-axes',
          figure: <GeometrySummaryMiniFigure type="regular_polygon_axes" size={48} />
        },
        {
          id: 's2-10',
          text: 'Egy konvex szög a szögfelezőjével',
          categoryId: 'cat-1-axis',
          figure: <GeometrySummaryMiniFigure type="angle_bisector" size={48} />
        }
      ]
    },

    // 3. SZINT: SZERKESZTHETŐSÉG ÉS HÁROMSZÖG-EGYENLŐTLENSÉG (10 ELEM)
    3: {
      level: 3,
      title: '3. Szint: Háromszögek szerkeszthetősége',
      description: 'Döntsd el, hogy az adathalmazokból megszerkeszthető-e valós háromszög!',
      categories: [
        {
          id: 'cat-possible',
          title: 'Szerkeszthető háromszög',
          description: 'A háromszög-egyenlőtlenség és szögek összege teljesül'
        },
        {
          id: 'cat-impossible',
          title: 'Nem szerkeszthető (0 megoldás)',
          description: 'Sérül a háromszög-egyenlőtlenség vagy a belső szögek összege'
        }
      ],
      items: [
        {
          id: 's3-1',
          text: 'a = 6 cm, b = 8 cm, c = 10 cm (Pitagoraszi számhármas)',
          categoryId: 'cat-possible',
          figure: <GeometrySummaryMiniFigure type="triangle_sss" size={48} />
        },
        {
          id: 's3-2',
          text: 'a = 2 cm, b = 3 cm, c = 7 cm (2 + 3 = 5 < 7)',
          categoryId: 'cat-impossible',
          figure: <GeometrySummaryMiniFigure type="triangle_inequality_rule" size={48} />
        },
        {
          id: 's3-3',
          text: 'a = 5 cm, b = 5 cm, c = 10 cm (5 + 5 = 10, egyenessé lapul)',
          categoryId: 'cat-impossible',
          figure: <GeometrySummaryMiniFigure type="triangle_inequality_rule" size={48} />
        },
        {
          id: 's3-4',
          text: 'c = 6 cm, α = 50°, β = 60° (α + β = 110° < 180°)',
          categoryId: 'cat-possible',
          figure: <GeometrySummaryMiniFigure type="triangle_asa" size={48} />
        },
        {
          id: 's3-5',
          text: 'α = 100°, β = 90° (összegük 190° > 180°)',
          categoryId: 'cat-impossible',
          figure: <GeometrySummaryMiniFigure type="planar_elements" size={48} />
        },
        {
          id: 's3-6',
          text: 'a = 4 cm, b = 7 cm, közbezárt γ = 60° (oszo alapeset)',
          categoryId: 'cat-possible',
          figure: <GeometrySummaryMiniFigure type="triangle_sas" size={48} />
        },
        {
          id: 's3-7',
          text: 'a = 3 cm, b = 5 cm, c = 9 cm (3 + 5 = 8 < 9)',
          categoryId: 'cat-impossible',
          figure: <GeometrySummaryMiniFigure type="triangle_inequality_rule" size={48} />
        },
        {
          id: 's3-8',
          text: 'Egyenlő szárú: alap = 6 cm, szár = 4 cm (4 + 4 = 8 > 6)',
          categoryId: 'cat-possible',
          figure: <GeometrySummaryMiniFigure type="symmetry_axis_isosceles" size={48} />
        },
        {
          id: 's3-9',
          text: 'Egyenlő szárú: alap = 10 cm, szár = 4 cm (4 + 4 = 8 < 10)',
          categoryId: 'cat-impossible',
          figure: <GeometrySummaryMiniFigure type="triangle_inequality_rule" size={48} />
        },
        {
          id: 's3-10',
          text: 'Szabályos háromszög: a = 8 cm',
          categoryId: 'cat-possible',
          figure: <GeometrySummaryMiniFigure type="symmetry_axis_equilateral" size={48} />
        }
      ]
    }
  };

  return (
    <SorterTemplate
      grade={6}
      chapterId="g6-geometry"
      title="Geometria és Szimmetria Csoportosító"
      subtitle="Rendszerezd a síkidomokat és szerkesztési feltételeket a megfelelő kategóriákba!"
      badge="📂 6. Osztály • III. Geometria • 11. Fejezet"
      topicId="g6-geometry-summary-sorter"
      themeColor="amber"
      levels={levelsConfig}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToTheory={onSwitchToTheory}
      level={level}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
}

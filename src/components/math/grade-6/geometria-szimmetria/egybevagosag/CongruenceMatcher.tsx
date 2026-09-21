import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  CongruenceCaseMiniFigure,
  TransformationMiniFigure,
  CongruentShapesMiniFigure,
  PolygonSplitMiniFigure
} from './CongruenceDiagrams';

export interface CongruenceMatcherProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function CongruenceMatcher({
  onBack,
  onSwitchToQuiz,
  onSwitchToSorter,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: CongruenceMatcherProps) {
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
    // 1. SZINT: VIZUÁLIS ALAPFOGALMAK ÉS ALAKZATPÁROK
    1: {
      level: 1,
      title: 'Egybevágóság alapfogalmai és alakzatpárok',
      description: 'Párosítsd az egybevágó alakzatok ábráit, szimbólumait és alapvető geometriai tulajdonságait!',
      pairs: [
        {
          id: 'p1-1',
          promptFigure: <CongruentShapesMiniFigure type="circles" />,
          prompt: 'Egybevágó körök',
          value: 'Sugaruk hossza megegyezik (r₁ = r₂)'
        },
        {
          id: 'p1-2',
          promptFigure: <CongruentShapesMiniFigure type="squares" />,
          prompt: 'Egybevágó négyzetek',
          value: 'Oldalhosszuk megegyezik (a₁ = a₂)'
        },
        {
          id: 'p1-3',
          promptFigure: <CongruentShapesMiniFigure type="triangles" />,
          prompt: '△ABC ≅ △A\'B\'C\'',
          value: 'Alakjuk és méretük is teljesen azonos'
        },
        {
          id: 'p1-4',
          promptFigure: <CongruentShapesMiniFigure type="segments" />,
          prompt: 'Távolságtartás',
          value: 'Szakaszok hossza egyenlő (AB = A\'B\')'
        },
        {
          id: 'p1-5',
          promptFigure: <CongruentShapesMiniFigure type="angles" />,
          prompt: 'Szögtartás',
          value: 'Megfelelő szögek nagysága azonos (α = α\')'
        },
        {
          id: 'p1-6',
          promptFigure: <CongruentShapesMiniFigure type="perimeters" />,
          prompt: 'Azonos kerület',
          value: 'Kerületek pontosan megegyeznek (K₁ = K₂)'
        },
        {
          id: 'p1-7',
          promptFigure: <CongruentShapesMiniFigure type="areas" />,
          prompt: 'Azonos terület',
          value: 'Területek pontosan megegyeznek (T₁ = T₂)'
        },
        {
          id: 'p1-8',
          prompt: 'F₁ ≅ F₂ szimbólum',
          value: 'Az egybevágóság matematikai jele: ≅'
        }
      ]
    },

    // 2. SZINT: HÁROMSZÖGEK 4 EGYBEVÁGÓSÁGI ALAPESETE
    2: {
      level: 2,
      title: 'Háromszögek egybevágósági alapesetei',
      description: 'Párosítsd a háromszögek 4 egybevágósági alapesetének ábráit a matematikai szabályukkal!',
      pairs: [
        {
          id: 'p2-1',
          promptFigure: <CongruenceCaseMiniFigure type="SSS" />,
          prompt: '1. Alapeset (o-o-o)',
          value: 'Három oldal párban egyenlő (a = a\', b = b\', c = c\')'
        },
        {
          id: 'p2-2',
          promptFigure: <CongruenceCaseMiniFigure type="SAS" />,
          prompt: '2. Alapeset (o-sz-o)',
          value: 'Két oldal és a közbezárt szög egyenlő (a = a\', b = b\', γ = γ\')'
        },
        {
          id: 'p2-3',
          promptFigure: <CongruenceCaseMiniFigure type="ASA" />,
          prompt: '3. Alapeset (sz-o-sz)',
          value: 'Egy oldal és a rajta fekvő 2 szög egyenlő (c = c\', α = α\', β = β\')'
        },
        {
          id: 'p2-4',
          promptFigure: <CongruenceCaseMiniFigure type="SsA" />,
          prompt: '4. Alapeset (o-o-sz)',
          value: 'Két oldal és a nagyobbikkal szemközti szög egyenlő'
        },
        {
          id: 'p2-5',
          promptFigure: <CongruenceCaseMiniFigure type="AAA" />,
          prompt: '(sz-sz-sz) feltétel',
          value: 'Csak hasonlóságot jelent, egybevágóságot NEM garantál!'
        },
        {
          id: 'p2-6',
          promptFigure: <CongruenceCaseMiniFigure type="right_angle" />,
          prompt: 'Derékszögű háromszög',
          value: 'Két befogó egyezése garantálja az egybevágóságot'
        },
        {
          id: 'p2-7',
          promptFigure: <CongruenceCaseMiniFigure type="equilateral" />,
          prompt: 'Szabályos háromszög',
          value: 'Egyetlen oldal egyezése elég az egybevágósághoz'
        },
        {
          id: 'p2-8',
          promptFigure: <CongruenceCaseMiniFigure type="isosceles_axis" />,
          prompt: 'Egyenlő szárú háromszög',
          value: 'A szimmetriatengely 2 egybevágó háromszögre osztja'
        }
      ]
    },

    // 3. SZINT: TRANSZFORMÁCIÓK, KÖRÜLJÁRÁS ÉS FELBONTÁSOK
    3: {
      level: 3,
      title: 'Transzformációk, szimmetriák és felbontások',
      description: 'Párosítsd a síkbeli transzformációk, körüljárási irányok és alakzat-felbontások ábráit!',
      pairs: [
        {
          id: 'p3-1',
          promptFigure: <TransformationMiniFigure type="translation" />,
          prompt: '1. Párhuzamos eltolás',
          value: 'Irány- és távolságtartó, körüljárási irány megmarad'
        },
        {
          id: 'p3-2',
          promptFigure: <TransformationMiniFigure type="rotation" />,
          prompt: '2. Elforgatás pont körül',
          value: 'Szögtartó és távolságtartó, körüljárási irány megmarad'
        },
        {
          id: 'p3-3',
          promptFigure: <TransformationMiniFigure type="axial_reflection" />,
          prompt: '3. Tengelyes tükrözés',
          value: 'Megfordítja a csúcsok körüljárási irányát!'
        },
        {
          id: 'p3-4',
          promptFigure: <TransformationMiniFigure type="central_reflection" />,
          prompt: '4. Középpontos tükrözés',
          value: '180°-os elforgatásnak felel meg, körüljárás megmarad'
        },
        {
          id: 'p3-5',
          promptFigure: <PolygonSplitMiniFigure type="rectangle" />,
          prompt: 'Téglalap felbontása',
          value: 'Az átló 2 egybevágó derékszögű háromszögre osztja'
        },
        {
          id: 'p3-6',
          promptFigure: <PolygonSplitMiniFigure type="rhombus" />,
          prompt: 'Rombusz felbontása',
          value: 'A 2 átló 4 egybevágó derékszögű háromszögre bontja'
        },
        {
          id: 'p3-7',
          promptFigure: <CongruentShapesMiniFigure type="triangle_sides_angles" />,
          prompt: 'Megfelelő elemek',
          value: 'a = 6 cm, b = 8 cm, β = 70° ⟹ a\' = 6 cm, b\' = 8 cm, β\' = 70°'
        },
        {
          id: 'p3-8',
          promptFigure: <CongruentShapesMiniFigure type="orientation" />,
          prompt: 'Körüljárási irány',
          value: 'Csak tengelyes tükrözésnél fordul meg az állás'
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
      title="Egybevágóság Kártyás Párosító"
      subtitle="Keresd meg az összetartozó egybevágósági ábrákat, alapeseteket és transzformációkat!"
      badge="📐 6. Osztály • III. Geometria • 2. Fejezet"
      topicId="g6-congruence-matcher"
      themeColor="orange"
      onBack={onBack}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
}


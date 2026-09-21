import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { ReflectionMiniFigure } from './AxialReflectionDiagrams';

export interface AxialReflectionMatcherProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function AxialReflectionMatcher({
  onBack,
  onSwitchToQuiz,
  onSwitchToSorter,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: AxialReflectionMatcherProps) {
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
    // 1. SZINT: ALAPFOGALMAK ÉS DEFINÍCIÓK
    1: {
      level: 1,
      title: 'Tengelyes tükrözés alapjai és tulajdonságai',
      description: 'Párosítsd a tükrözés ábráit a megfelelő geometriai tulajdonságokkal és definíciókkal!',
      pairs: [
        {
          id: 'p1-1',
          promptFigure: <ReflectionMiniFigure type="point_reflection" />,
          prompt: 'Pont tükrözése (P \u2192 P\')',
          value: 'PP\' ⊥ t és a tengely felezi a PP\' szakaszt'
        },
        {
          id: 'p1-2',
          promptFigure: <ReflectionMiniFigure type="fix_point" />,
          prompt: 'Tengelyen fekvő pont (Q \u2208 t)',
          value: 'Fixpont, képe önmaga: Q\' = Q'
        },
        {
          id: 'p1-3',
          promptFigure: <ReflectionMiniFigure type="segment_parallel" />,
          prompt: 'Távolságtartás (hossztartás)',
          value: '|A\'B\'| = |AB| (a szakasz hossza nem változik)'
        },
        {
          id: 'p1-4',
          promptFigure: <ReflectionMiniFigure type="angle_reflection" />,
          prompt: 'Szögtartás',
          value: 'A szögek nagysága változatlan marad (α\' = α)'
        },
        {
          id: 'p1-5',
          promptFigure: <ReflectionMiniFigure type="involutive" />,
          prompt: 'Involúció tulajdonság',
          value: '(P\')\' = P (kétszeri tükrözés visszavisz az eredetibe)'
        },
        {
          id: 'p1-6',
          promptFigure: <ReflectionMiniFigure type="point_reflection" />,
          prompt: 'Tengelyre merőleges egyenes (m ⊥ t)',
          value: 'Fix egyenes: önmagába képződik (m\' = m)'
        },
        {
          id: 'p1-7',
          promptFigure: <ReflectionMiniFigure type="segment_parallel" />,
          prompt: 'Párhuzamos egyenesek képe',
          value: 'Szintén párhuzamos egyenesek (a\' ∥ b\')'
        },
        {
          id: 'p1-8',
          promptFigure: <ReflectionMiniFigure type="circle_reflection" />,
          prompt: 'Kör tükrözése',
          value: 'Középpontja O\', sugara változatlan (r\' = r)'
        }
      ]
    },

    // 2. SZINT: KOORDINÁTÁK ÉS KÖRÜLJÁRÁSI IRÁNY
    2: {
      level: 2,
      title: 'Koordinátatükrözés és körüljárási irány',
      description: 'Párosítsd a koordinátapontokat és alakzatokat a megfelelő tükörképekkel!',
      pairs: [
        {
          id: 'p2-1',
          promptFigure: <ReflectionMiniFigure type="coord_x" />,
          prompt: 'Tükrözés az x-tengelyre (szabály)',
          value: '(x; y) \u2192 (x; -y) (az y előjelet vált)'
        },
        {
          id: 'p2-2',
          promptFigure: <ReflectionMiniFigure type="coord_y" />,
          prompt: 'Tükrözés az y-tengelyre (szabály)',
          value: '(x; y) \u2192 (-x; y) (az x előjelet vált)'
        },
        {
          id: 'p2-3',
          promptFigure: <ReflectionMiniFigure type="coord_x" />,
          prompt: 'P(4; 5) tükörképe x-tengelyre',
          value: 'P\'(4; -5)'
        },
        {
          id: 'p2-4',
          promptFigure: <ReflectionMiniFigure type="coord_y" />,
          prompt: 'Q(-3; 8) tükörképe y-tengelyre',
          value: 'Q\'(3; 8)'
        },
        {
          id: 'p2-5',
          promptFigure: <ReflectionMiniFigure type="triangle_inverted" />,
          prompt: 'Háromszög körüljárási iránya',
          value: 'Megfordul (pozitívból \u2192 negatív óramutató járása szerinti)'
        },
        {
          id: 'p2-6',
          promptFigure: <ReflectionMiniFigure type="segment_intersecting" />,
          prompt: 'Tengelyt metsző szakasz',
          value: 'A metszéspont fixpont, A\'B\' is ott metszi a tengelyt'
        },
        {
          id: 'p2-7',
          promptFigure: <ReflectionMiniFigure type="coord_orig" />,
          prompt: 'Tükrözés x-re, majd y-ra',
          value: '(x; y) \u2192 (-x; -y) (origóra vett középpontos kép)'
        },
        {
          id: 'p2-8',
          promptFigure: <ReflectionMiniFigure type="triangle_inverted" />,
          prompt: 'Területtartás',
          value: 'T_A\'B\'C\' = T_ABC (a síkidom területe változatlan)'
        }
      ]
    },

    // 3. SZINT: SZERKESZTÉSEK ÉS ÖSSZETETT TULAJDONSÁGOK
    3: {
      level: 3,
      title: 'Tengely szerkesztése és összetett transzformációk',
      description: 'Párosítsd a szerkesztési lépéseket és geometriai tételeket a megfelelő összefüggésekkel!',
      pairs: [
        {
          id: 'p3-1',
          promptFigure: <ReflectionMiniFigure type="axis_construction" />,
          prompt: 'Tükrözési tengely megszerkesztése',
          value: 'A pontpár (AA\') szakaszfelező merőlegese'
        },
        {
          id: 'p3-2',
          promptFigure: <ReflectionMiniFigure type="segment_parallel" />,
          prompt: 'Tükrözés 2 párhuzamos tengelyre (t₁ ∥ t₂)',
          value: 'Párhuzamos eltolás 2·d távolsággal'
        },
        {
          id: 'p3-3',
          promptFigure: <ReflectionMiniFigure type="angle_reflection" />,
          prompt: 'Tükrözés 2 metsző tengelyre (szög α)',
          value: 'Elforgatás a metszéspont körül 2·α szöggel'
        },
        {
          id: 'p3-4',
          promptFigure: <ReflectionMiniFigure type="coord_x" />,
          prompt: 'A(3; 2) és A\'(3; -2) tengelye',
          value: 'Az x-tengely (y = 0 egyenes)'
        },
        {
          id: 'p3-5',
          promptFigure: <ReflectionMiniFigure type="coord_y" />,
          prompt: 'B(-5; 4) és B\'(5; 4) tengelye',
          value: 'Az y-tengely (x = 0 egyenes)'
        },
        {
          id: 'p3-6',
          promptFigure: <ReflectionMiniFigure type="point_reflection" />,
          prompt: 'Tükrözés az y = x egyenesre',
          value: '(x; y) \u2192 (y; x) (a koordináták helyet cserélnek)'
        },
        {
          id: 'p3-7',
          promptFigure: <ReflectionMiniFigure type="point_reflection" />,
          prompt: 'Heron-probléma (legrövidebb út)',
          value: 'A célpont tükrözése a partvonalra, majd egyenessel metszés'
        },
        {
          id: 'p3-8',
          promptFigure: <ReflectionMiniFigure type="triangle_inverted" />,
          prompt: 'Tengelyesen szimmetrikus alakzat',
          value: 'Létezik olyan tengely, amelyre tükrözve önmagába megy át'
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
      title="Tengelyes tükrözés Kártyás Párosító"
      subtitle="Keresd meg az összetartozó tükrözési ábrákat, koordinátákat és tulajdonságokat!"
      badge="📐 6. Osztály • III. Geometria • 6. Fejezet"
      topicId="g6-axial-reflection-matcher"
      onBack={onBack}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
}

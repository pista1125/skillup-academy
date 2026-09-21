import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { ReflectionPropertiesMiniFigure } from './ReflectionPropertiesDiagrams';

export interface ReflectionPropertiesMatcherProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function ReflectionPropertiesMatcher({
  onBack,
  onSwitchToQuiz,
  onSwitchToSorter,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: ReflectionPropertiesMatcherProps) {
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
    // 1. SZINT: ALAPTULAJDONSÁGOK ÉS INVARIANCIÁK (8 PÁR)
    1: {
      level: 1,
      title: '1. Szint: Alaptulajdonságok és megmaradó mennyiségek',
      description: 'Párosítsd a tengelyes tükrözés tulajdonságait a képletekkel és magyarázatokkal!',
      pairs: [
        {
          id: 'p1-1',
          promptFigure: <ReflectionPropertiesMiniFigure type="distance_invariance" />,
          prompt: 'Távolságtartás (Hossztartás)',
          value: '|A\'B\'| = |AB| (szakaszok hossza nem változik)'
        },
        {
          id: 'p1-2',
          promptFigure: <ReflectionPropertiesMiniFigure type="angle_invariance" />,
          prompt: 'Szögtartás',
          value: 'α\' = α (szögek nagysága változatlan marad)'
        },
        {
          id: 'p1-3',
          promptFigure: <ReflectionPropertiesMiniFigure type="area_invariance" />,
          prompt: 'Területtartás',
          value: 'T\' = T (a síkidom területe nem módosul)'
        },
        {
          id: 'p1-4',
          promptFigure: <ReflectionPropertiesMiniFigure type="orientation_flip" />,
          prompt: 'Körüljárási irány',
          value: 'Megfordul: pozitívból (+) negatív (−) lesz'
        },
        {
          id: 'p1-5',
          promptFigure: <ReflectionPropertiesMiniFigure type="fixed_points" />,
          prompt: 'Fixpontok a síkban',
          value: 'A t tengely minden pontja (P = P\')'
        },
        {
          id: 'p1-6',
          promptFigure: <ReflectionPropertiesMiniFigure type="fixed_lines" />,
          prompt: 'Fixegyenesek a síkban',
          value: 'A t tengely és a rá merőleges m egyenesek (m ⊥ t)'
        },
        {
          id: 'p1-7',
          promptFigure: <ReflectionPropertiesMiniFigure type="circle_invariance" />,
          prompt: 'Kör tükrözése',
          value: 'Középpont tükröződik, a sugár változatlan (r\' = r)'
        },
        {
          id: 'p1-8',
          promptFigure: <ReflectionPropertiesMiniFigure type="involutive_property" />,
          prompt: 'Involúció (Önmagának inverze)',
          value: '(P\')\' = P (kétszer ugyanarra tükrözve helyben marad)'
        }
      ]
    },

    // 2. SZINT: RÉSZLETES TÉTELEK ÉS ÁLLÍTÁSOK (8 PÁR)
    2: {
      level: 2,
      title: '2. Szint: Geometriai tételek és összefüggések',
      description: 'Kösd össze az állításokat a geometriai következményükkel!',
      pairs: [
        {
          id: 'p2-1',
          promptFigure: <ReflectionPropertiesMiniFigure type="fixed_lines" />,
          prompt: 'Tengelyre merőleges egyenes (m ⊥ t)',
          value: 'Önmagába képződik (m\' = m), de pontjai helyet cserélnek'
        },
        {
          id: 'p2-2',
          promptFigure: <ReflectionPropertiesMiniFigure type="orientation_flip" />,
          prompt: 'Másodfajú egybevágóság',
          value: 'Az alakzat síkbeli forgatással nem fedhető a képével'
        },
        {
          id: 'p2-3',
          promptFigure: <ReflectionPropertiesMiniFigure type="parallel_reflections" />,
          prompt: 'Két párhuzamos tengelyre tükrözés (t₁ ∥ t₂)',
          value: 'Párhuzamos eltolás 2·d távolsággal'
        },
        {
          id: 'p2-4',
          promptFigure: <ReflectionPropertiesMiniFigure type="intersecting_reflections" />,
          prompt: 'Két metsző tengelyre tükrözés (α szög)',
          value: 'Elforgatás a metszéspont körül 2·α szöggel'
        },
        {
          id: 'p2-5',
          promptFigure: <ReflectionPropertiesMiniFigure type="distance_invariance" />,
          prompt: 'Egyenesek párhuzamossága (a ∥ b)',
          value: 'Párhuzamosságtartó: a\' ∥ b\''
        },
        {
          id: 'p2-6',
          promptFigure: <ReflectionPropertiesMiniFigure type="angle_invariance" />,
          prompt: 'Egyenesek merőlegessége (a ⊥ b)',
          value: 'Merőlegességtartó: a\' ⊥ b\''
        },
        {
          id: 'p2-7',
          promptFigure: <ReflectionPropertiesMiniFigure type="fixed_points" />,
          prompt: 'Tengelyen kívüli pont fixpont-e?',
          value: 'Nem, ha P ∉ t, akkor P\' ≠ P'
        },
        {
          id: 'p2-8',
          promptFigure: <ReflectionPropertiesMiniFigure type="area_invariance" />,
          prompt: 'Sokszög kerülete (K)',
          value: 'K\' = K (kerülettartó transzformáció)'
        }
      ]
    },

    // 3. SZINT: HALADÓ TRANSZFORMÁCIÓ-ÖSSZETÉTELEK (8 PÁR)
    3: {
      level: 3,
      title: '3. Szint: Kompozíciók és mester-összefüggések',
      description: 'Párosítsd az összetett transzformációkat és speciális eseteket!',
      pairs: [
        {
          id: 'p3-1',
          promptFigure: <ReflectionPropertiesMiniFigure type="intersecting_reflections" />,
          prompt: 'Két merőleges tengelyre tükrözés (t₁ ⊥ t₂)',
          value: 'Origóra / metszéspontra vett középpontos tükrözés (180° forgatás)'
        },
        {
          id: 'p3-2',
          promptFigure: <ReflectionPropertiesMiniFigure type="parallel_reflections" />,
          prompt: 'Páratlan számú tükrözés összetétele',
          value: 'Mindig megfordítja a körüljárási irányt (−)'
        },
        {
          id: 'p3-3',
          promptFigure: <ReflectionPropertiesMiniFigure type="involutive_property" />,
          prompt: 'Páros számú tükrözés összetétele',
          value: 'Megtartja az eredeti körüljárási irányt (+)'
        },
        {
          id: 'p3-4',
          promptFigure: <ReflectionPropertiesMiniFigure type="fixed_lines" />,
          prompt: 'Tengellyel párhuzamos egyenes (e ∥ t)',
          value: 'Tükörképe a tengely túloldalán lévő párhuzamos egyenes (e\' ∥ t)'
        },
        {
          id: 'p3-5',
          promptFigure: <ReflectionPropertiesMiniFigure type="distance_invariance" />,
          prompt: 'Szakaszfelező pont képe (F pont)',
          value: 'A tükörkép szakasz felezőpontja: F\' felezi A\'B\'-t'
        },
        {
          id: 'p3-6',
          promptFigure: <ReflectionPropertiesMiniFigure type="fixed_points" />,
          prompt: 'Tengelyt metsző szakasz metszéspontja (M)',
          value: 'Fixpont a tengelyen: M\' = M'
        },
        {
          id: 'p3-7',
          promptFigure: <ReflectionPropertiesMiniFigure type="area_invariance" />,
          prompt: 'Tengelyesen szimmetrikus alakzat',
          value: 'Létezik olyan tengely, amelyre tükrözve az alakzat önmagába megy át'
        },
        {
          id: 'p3-8',
          promptFigure: <ReflectionPropertiesMiniFigure type="angle_invariance" />,
          prompt: 'Heron-probléma lényege',
          value: 'A tükrözés segítségével tört vonal helyettesíthető egyenessel'
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
      title="A tengelyes tükrözés tulajdonságai Kártyás Párosító"
      subtitle="Találd meg a tükrözési tulajdonságok, tételek és ábrák összetartozó párjait!"
      badge="📐 6. Osztály • III. Geometria • 7. Fejezet"
      topicId="g6-reflection-properties-matcher"
      onBack={onBack}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
}

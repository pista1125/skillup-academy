import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { CircleMatcherFigure } from './CircleDiagrams';

export interface CircleSorterProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function CircleSorter({
  onBack,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: CircleSorterProps) {
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
    // 1. SZINT: GEOMETRIAI TÍPUSOK (Szakaszok, Egyenesek, Síkrészek)
    1: {
      level: 1,
      title: 'Kör részeinek geometriai típusai',
      subtitle: 'Csoportosítsd a kör ábráit és fogalmait szakasz, egyenes vagy síkrész szerint!',
      categories: [
        {
          id: 'segments',
          title: 'Szakaszok',
          description: 'Véges hosszúságú vonaldarabok a körben',
          color: 'emerald'
        },
        {
          id: 'lines',
          title: 'Egyenesek',
          description: 'Mindkét irányban végtelen egyenes vonalak',
          color: 'blue'
        },
        {
          id: 'regions',
          title: 'Síkrészek & Ívek',
          description: 'Területtel bíró síkidomok vagy görbe vonaldarabok',
          color: 'purple'
        }
      ],
      items: [
        { id: 'i1-1', figure: <CircleMatcherFigure type="radius" />, text: 'Sugár (r)', categoryId: 'segments' },
        { id: 'i1-2', figure: <CircleMatcherFigure type="diameter" />, text: 'Átmérő (d = 2r)', categoryId: 'segments' },
        { id: 'i1-3', figure: <CircleMatcherFigure type="chord" />, text: 'Húr', categoryId: 'segments' },
        { id: 'i1-4', figure: <CircleMatcherFigure type="tangent" />, text: 'Érintő (e ⊥ r)', categoryId: 'lines' },
        { id: 'i1-5', figure: <CircleMatcherFigure type="secant" />, text: 'Szelő egyenes (s)', categoryId: 'lines' },
        { id: 'i1-6', figure: <CircleMatcherFigure type="external_line" />, text: 'Külső egyenes', categoryId: 'lines' },
        { id: 'i1-7', figure: <CircleMatcherFigure type="chord_bisector" />, text: 'Húr felezője', categoryId: 'lines' },
        { id: 'i1-8', figure: <CircleMatcherFigure type="sector" />, text: 'Körcikk (cikkely)', categoryId: 'regions' },
        { id: 'i1-9', figure: <CircleMatcherFigure type="segment" />, text: 'Körszelet', categoryId: 'regions' },
        { id: 'i1-10', figure: <CircleMatcherFigure type="concentric" />, text: 'Körgyűrű', categoryId: 'regions' },
        { id: 'i1-11', figure: <CircleMatcherFigure type="semicircle" />, text: 'Félkör lap', categoryId: 'regions' },
        { id: 'i1-12', figure: <CircleMatcherFigure type="arc" />, text: 'Körív (í)', categoryId: 'regions' }
      ]
    },

    // 2. SZINT: ELHELYEZKEDÉS ÉS TULAJDONSÁGOK
    2: {
      level: 2,
      title: 'Hol helyezkedik el a körben?',
      subtitle: 'Döntsd el a kör részeiről, hogy átmennek a középponton, a körvonalhoz kötődnek vagy síkrészek!',
      categories: [
        {
          id: 'passes-center',
          title: 'Átmegy a középponton (O)',
          description: 'Tartalmazza az O középpontot vagy abból indul ki',
          color: 'amber'
        },
        {
          id: 'boundary-related',
          title: 'Körvonalhoz / Érintéshez kötődik',
          description: 'Közös pontja van a körvonallal kívülről vagy a kerületen',
          color: 'pink'
        },
        {
          id: 'has-area',
          title: 'Területtel bíró síkrész',
          description: 'A körlap egy felülete vagy szektora',
          color: 'teal'
        }
      ],
      items: [
        { id: 'i2-1', figure: <CircleMatcherFigure type="diameter" />, text: 'Átmérő (d)', categoryId: 'passes-center' },
        { id: 'i2-2', figure: <CircleMatcherFigure type="radius" />, text: 'Sugár (r)', categoryId: 'passes-center' },
        { id: 'i2-3', figure: <CircleMatcherFigure type="chord_bisector" />, text: 'Húr felezője', categoryId: 'passes-center' },
        { id: 'i2-4', figure: <CircleMatcherFigure type="symmetry_axes" />, text: 'Szimmetriatengelyek', categoryId: 'passes-center' },
        { id: 'i2-5', figure: <CircleMatcherFigure type="tangent" />, text: 'Érintő egyenes', categoryId: 'boundary-related' },
        { id: 'i2-6', figure: <CircleMatcherFigure type="arc" />, text: 'Körív (í)', categoryId: 'boundary-related' },
        { id: 'i2-7', figure: <CircleMatcherFigure type="chord" />, text: 'Húr végpontjai', categoryId: 'boundary-related' },
        { id: 'i2-8', figure: <CircleMatcherFigure type="secant" />, text: 'Szelő egyenes', categoryId: 'boundary-related' },
        { id: 'i2-9', figure: <CircleMatcherFigure type="sector" />, text: 'Körcikk (2 sugár + ív)', categoryId: 'has-area' },
        { id: 'i2-10', figure: <CircleMatcherFigure type="segment" />, text: 'Körszelet (húr + ív)', categoryId: 'has-area' },
        { id: 'i2-11', figure: <CircleMatcherFigure type="semicircle" />, text: 'Félkör síkrész', categoryId: 'has-area' },
        { id: 'i2-12', figure: <CircleMatcherFigure type="quadrant" />, text: 'Negyedkör lap', categoryId: 'has-area' }
      ]
    },

    // 3. SZINT: EGYENES ÉS KÖR KÖLCSÖNÖS HELYZETE (0, 1, 2 közös pont)
    3: {
      level: 3,
      title: 'Egyenes és kör közös pontjainak száma',
      subtitle: 'Sorold be az egyeneseket az ábrájuk és a távolság-sugár viszony (d és r) alapján!',
      categories: [
        {
          id: 'no-intersection',
          title: '0 közös pont: Külső egyenes',
          description: 'd(O, e) > r (a távolság nagyobb a sugárnál)',
          color: 'slate'
        },
        {
          id: 'tangent-line',
          title: '1 közös pont: Érintő egyenes',
          description: 'd(O, e) = r (a távolság pontosan megegyezik a sugárral)',
          color: 'red'
        },
        {
          id: 'secant-line',
          title: '2 közös pont: Szelő egyenes',
          description: 'd(O, e) < r (a távolság kisebb a sugárnál)',
          color: 'blue'
        }
      ],
      items: [
        { id: 'i3-1', figure: <CircleMatcherFigure type="external_line" />, text: 'd = 9 cm > r = 6 cm', categoryId: 'no-intersection' },
        { id: 'i3-2', figure: <CircleMatcherFigure type="external_line" />, text: 'd = 15 cm > r = 10 cm', categoryId: 'no-intersection' },
        { id: 'i3-3', figure: <CircleMatcherFigure type="external_line" />, text: 'd(O, e) > r távolság', categoryId: 'no-intersection' },
        { id: 'i3-4', figure: <CircleMatcherFigure type="tangent" />, text: 'd = 5 cm = r = 5 cm', categoryId: 'tangent-line' },
        { id: 'i3-5', figure: <CircleMatcherFigure type="tangent" />, text: 'Érintési tétel: e ⊥ r', categoryId: 'tangent-line' },
        { id: 'i3-6', figure: <CircleMatcherFigure type="tangent" />, text: 'd = 8 cm (d_átmérő = 16)', categoryId: 'tangent-line' },
        { id: 'i3-7', figure: <CircleMatcherFigure type="tangent" />, text: 'd(O, e) = r távolság', categoryId: 'tangent-line' },
        { id: 'i3-8', figure: <CircleMatcherFigure type="secant" />, text: 'd = 2 cm < r = 7 cm', categoryId: 'secant-line' },
        { id: 'i3-9', figure: <CircleMatcherFigure type="diameter" />, text: 'Átmérő egyenese (d = 0)', categoryId: 'secant-line' },
        { id: 'i3-10', figure: <CircleMatcherFigure type="secant" />, text: 'd = 4 cm (d_átmérő = 12)', categoryId: 'secant-line' },
        { id: 'i3-11', figure: <CircleMatcherFigure type="secant" />, text: 'Húrt tartalmazó egyenes', categoryId: 'secant-line' },
        { id: 'i3-12', figure: <CircleMatcherFigure type="secant" />, text: 'd(O, e) < r távolság', categoryId: 'secant-line' }
      ]
    }
  };

  return (
    <SorterTemplate
      level={level}
      levels={levelsConfig}
      grade={6}
      chapterId="g6-geometry"
      title="A kör Csoportosító Játék"
      subtitle="Rendezd a kör ábráit, vonalait, síkrészeit és helyzeteit a megfelelő kategóriákba!"
      badge="📐 6. Osztály • III. Geometria • 3. Fejezet"
      topicId="g6-circle-sorter"
      themeColor="purple"
      onBack={onBack}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
}

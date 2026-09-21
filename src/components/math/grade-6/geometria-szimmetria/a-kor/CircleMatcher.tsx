import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { CircleMatcherFigure } from './CircleDiagrams';

export interface CircleMatcherProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function CircleMatcher({
  onBack,
  onSwitchToQuiz,
  onSwitchToSorter,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: CircleMatcherProps) {
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
    // 1. SZINT: KÖR ELEMEI ÉS VONALAI (Vizuális ábrák párosítása)
    1: {
      level: 1,
      title: 'A kör vonalai és alapfogalmai',
      description: 'Párosítsd a kör kiemelt részeinek ábráit a megfelelő elnevezéssel és definícióval!',
      pairs: [
        {
          id: 'p1-1',
          promptFigure: <CircleMatcherFigure type="radius" />,
          prompt: 'Sugár (r)',
          value: 'A középpontot a körvonal bármely pontjával összekötő szakasz'
        },
        {
          id: 'p1-2',
          promptFigure: <CircleMatcherFigure type="diameter" />,
          prompt: 'Átmérő (d = 2r)',
          value: 'A kör középpontján áthaladó húr; a sugár kétszerese'
        },
        {
          id: 'p1-3',
          promptFigure: <CircleMatcherFigure type="center" />,
          prompt: 'Középpont (O)',
          value: 'A kör középső pontja, a körvonal minden pontjától r távolságra'
        },
        {
          id: 'p1-4',
          promptFigure: <CircleMatcherFigure type="chord" />,
          prompt: 'Húr',
          value: 'A körvonal két tetszőleges pontját összekötő belső szakasz'
        },
        {
          id: 'p1-5',
          promptFigure: <CircleMatcherFigure type="arc" />,
          prompt: 'Körív (í)',
          value: 'A körvonal két pontja közé eső görbe vonaldarabja'
        },
        {
          id: 'p1-6',
          promptFigure: <CircleMatcherFigure type="tangent" />,
          prompt: 'Érintő egyenes (e)',
          value: 'Pontosan 1 közös pontja van a körrel (e ⊥ r az érintési pontban)'
        },
        {
          id: 'p1-7',
          promptFigure: <CircleMatcherFigure type="secant" />,
          prompt: 'Szelő egyenes (s)',
          value: 'Két különböző pontban metszi a kört, húrt határoz meg'
        },
        {
          id: 'p1-8',
          promptFigure: <CircleMatcherFigure type="external_line" />,
          prompt: 'Külső egyenes',
          value: 'Nincs közös pontja a körrel, távolsága a középponttól nagyobb mint r'
        }
      ]
    },

    // 2. SZINT: KÖR SÍKRÉSZEI, SÍKIDOMAI ÉS SZÁMÍTÁSOK
    2: {
      level: 2,
      title: 'Kör síkrészei, alakzatai és összefüggései',
      description: 'Párosítsd a körcikk, körszelet, koncentrikus körök és méretösszefüggések ábráit!',
      pairs: [
        {
          id: 'p2-1',
          promptFigure: <CircleMatcherFigure type="sector" />,
          prompt: 'Körcikk (cikkely)',
          value: 'Két sugár és a közéjük eső körív által határolt síkrész'
        },
        {
          id: 'p2-2',
          promptFigure: <CircleMatcherFigure type="segment" />,
          prompt: 'Körszelet',
          value: 'Egy húr és a hozzátartozó körív által határolt síkrész'
        },
        {
          id: 'p2-3',
          promptFigure: <CircleMatcherFigure type="semicircle" />,
          prompt: 'Félkör (180°)',
          value: 'Az átmérő által két egyenlő részre osztott körlap síkrésze'
        },
        {
          id: 'p2-4',
          promptFigure: <CircleMatcherFigure type="quadrant" />,
          prompt: 'Negyedkör (90°)',
          value: 'Két egymásra merőleges sugár által határolt 90°-os körcikk'
        },
        {
          id: 'p2-5',
          promptFigure: <CircleMatcherFigure type="concentric" />,
          prompt: 'Koncentrikus körök',
          value: 'Közös középpontú, de eltérő sugarú körök a síkban'
        },
        {
          id: 'p2-6',
          promptFigure: <CircleMatcherFigure type="diameter" />,
          prompt: 'r = 7 cm ⟹ d = ?',
          value: 'd = 14 cm (mivel d = 2 · r)'
        },
        {
          id: 'p2-7',
          promptFigure: <CircleMatcherFigure type="radius" />,
          prompt: 'd = 26 cm ⟹ r = ?',
          value: 'r = 13 cm (mivel r = d / 2)'
        },
        {
          id: 'p2-8',
          promptFigure: <CircleMatcherFigure type="tangent" />,
          prompt: 'Érintési tétel',
          value: 'Az érintő merőleges az érintési pontba húzott sugárra (e ⊥ r)'
        }
      ]
    },

    // 3. SZINT: KÉPLETEK, SZIMMETRIÁK ÉS ÖSSZETETT TULAJDONSÁGOK
    3: {
      level: 3,
      title: 'Szimmetriák, képletek és geometriai összefüggések',
      description: 'Párosítsd a kör szimmetriatulajdonságait, képleteit és speciális tételeit!',
      pairs: [
        {
          id: 'p3-1',
          promptFigure: <CircleMatcherFigure type="pi_formula" />,
          prompt: 'A π (pi) szám',
          value: 'A kör kerületének és átmérőjének állandó hányadosa (π ≈ 3.14)'
        },
        {
          id: 'p3-2',
          promptFigure: <CircleMatcherFigure type="symmetry_axes" />,
          prompt: 'Szimmetriatengelyek',
          value: 'Végtelen sok szimmetriatengely (minden átmérő egyenese tengely)'
        },
        {
          id: 'p3-3',
          promptFigure: <CircleMatcherFigure type="central_angle" />,
          prompt: 'Középponti szög (α)',
          value: 'Csúcsa a kör középpontja (O), szárai a kör sugarai'
        },
        {
          id: 'p3-4',
          promptFigure: <CircleMatcherFigure type="chord_bisector" />,
          prompt: 'Húr felezőmerőlegese',
          value: 'Bármely húr felezőmerőleges egyenese átmegy a középponton (O)'
        },
        {
          id: 'p3-5',
          promptFigure: <CircleMatcherFigure type="radius" />,
          prompt: 'Kör kerülete (K)',
          value: 'K = 2 · r · π = d · π'
        },
        {
          id: 'p3-6',
          promptFigure: <CircleMatcherFigure type="sector" />,
          prompt: 'Kör területe (T)',
          value: 'T = r² · π'
        },
        {
          id: 'p3-7',
          promptFigure: <CircleMatcherFigure type="center" />,
          prompt: 'Teljes szög',
          value: 'A teljes körvonalhoz 360°-os középponti szög tartozik'
        },
        {
          id: 'p3-8',
          promptFigure: <CircleMatcherFigure type="external_line" />,
          prompt: 'd(O, e) > r feltétel',
          value: 'Külső egyenes: a középponttól vett távolság nagyobb a sugárnál'
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
      title="A kör Kártyás Párosító"
      subtitle="Keresd meg az összetartozó kör ábrákat, elnevezéseket, síkrészeket és képleteket!"
      badge="📐 6. Osztály • III. Geometria • 3. Fejezet"
      topicId="g6-circle-matcher"
      themeColor="purple"
      onBack={onBack}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
}

import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { ConstructionsMatcherFigure } from './ConstructionsDiagrams';

export interface ConstructionsMatcherProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function ConstructionsMatcher({
  onBack,
  onSwitchToQuiz,
  onSwitchToSorter,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: ConstructionsMatcherProps) {
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
    // 1. SZINT: ALAPSZERKESZTÉSEK ÁBRÁI ÉS FOGALMAI
    1: {
      level: 1,
      title: 'Alapszerkesztések és eszközeik',
      description: 'Párosítsd a szerkesztési ábrákat a megfelelő geometriai megnevezéssel és szabállyal!',
      pairs: [
        {
          id: 'p1-1',
          promptFigure: <ConstructionsMatcherFigure type="angle_bisector" />,
          prompt: 'Szögfelező (f_α)',
          value: 'A szög csúcsából induló félegyenes, amely két egyenlő nagyságú részre osztja a szöget'
        },
        {
          id: 'p1-2',
          promptFigure: <ConstructionsMatcherFigure type="perpendicular" />,
          prompt: 'Merőleges egyenes (e ⊥ m)',
          value: '90°-os derékszöget zár be az egyenessel; a szakaszfelező merőleges elvével szerkesztjük'
        },
        {
          id: 'p1-3',
          promptFigure: <ConstructionsMatcherFigure type="parallel" />,
          prompt: 'Párhuzamos egyenesek (e₁ ∥ e₂)',
          value: 'Egy síkban lévő egyenesek, amelyek nem metszik egymást; távolságuk mindenhol állandó'
        },
        {
          id: 'p1-4',
          promptFigure: <ConstructionsMatcherFigure type="triangle_sss" />,
          prompt: 'Háromszög 3 oldalból (ooo)',
          value: 'Alapra felmérjük a c oldalt, majd az A és B végpontokból a és b sugarú körívekkel metsszük ki a C csúcsot'
        },
        {
          id: 'p1-5',
          promptFigure: <ConstructionsMatcherFigure type="compass_tool" />,
          prompt: 'Körző (Euklideszi eszköz)',
          value: 'Körívek rajzolására és távolságok pontos átvitelére, felmérésére használt alapeszköz'
        },
        {
          id: 'p1-6',
          promptFigure: <ConstructionsMatcherFigure type="ruler_tool" />,
          prompt: 'Egyélű vonalzó',
          value: 'Két pont összekötésére, egyenesek és félegyenesek meghúzására szolgál (beosztás nélkül)'
        }
      ]
    },

    // 2. SZINT: NEVEZETES SZÖGEK SZERKESZTÉSE KÖRZŐVEL
    2: {
      level: 2,
      title: 'Nevezetes szögek szerkesztése körzővel',
      description: 'Párosítsd a szögek szerkesztési ábráját a pontos szögértékkel és módszerrel!',
      pairs: [
        {
          id: 'p2-1',
          promptFigure: <ConstructionsMatcherFigure type="angle_60" />,
          prompt: '60°-os szög',
          value: 'Szabályos háromszög szöge: a körív sugarával (R = a) metsszük el az alapkörívet'
        },
        {
          id: 'p2-2',
          promptFigure: <ConstructionsMatcherFigure type="angle_30" />,
          prompt: '30°-os szög',
          value: 'A 60°-os szög szögfelezőjének megszerkesztésével kapott szög (60° / 2 = 30°)'
        },
        {
          id: 'p2-3',
          promptFigure: <ConstructionsMatcherFigure type="angle_90" />,
          prompt: '90°-os derékszög',
          value: 'Egyenes adott pontjában vagy külső pontból szerkesztett merőleges egyenes szöge'
        },
        {
          id: 'p2-4',
          promptFigure: <ConstructionsMatcherFigure type="angle_45" />,
          prompt: '45°-os szög',
          value: 'A 90°-os derékszög szögfelezőjének megszerkesztésével kapott szög (90° / 2 = 45°)'
        },
        {
          id: 'p2-5',
          promptFigure: <ConstructionsMatcherFigure type="angle_60" />,
          prompt: '120°-os tompaszög',
          value: 'A 60°-os körívet kétszer egymás után felmérve kapott tompaszög (2 × 60° = 120°)'
        },
        {
          id: 'p2-6',
          promptFigure: <ConstructionsMatcherFigure type="angle_30" />,
          prompt: '75°-os szög',
          value: 'A 60° és 90° közötti 30°-os tartomány felezésével: 60° + 15° = 75°'
        }
      ]
    },

    // 3. SZINT: SZERKESZTHETŐSÉG ÉS TÉTELEK
    3: {
      level: 3,
      title: 'Háromszög-szerkeszthetőség és tételek',
      description: 'Párosítsd a szerkeszthetőségi feltételeket, tételeket és oldalhosszakat!',
      pairs: [
        {
          id: 'p3-1',
          promptFigure: <ConstructionsMatcherFigure type="triangle_possible" />,
          prompt: 'Oldalak: 5 cm, 6 cm, 7 cm',
          value: 'Szerkeszthető háromszög, mert 5 + 6 = 11 > 7 (teljesül a háromszög-egyenlőtlenség)'
        },
        {
          id: 'p3-2',
          promptFigure: <ConstructionsMatcherFigure type="triangle_impossible" />,
          prompt: 'Oldalak: 2 cm, 3 cm, 8 cm',
          value: 'NEM szerkeszthető, mert 2 + 3 = 5 < 8 (a körívek nem érik el egymást)'
        },
        {
          id: 'p3-3',
          promptFigure: <ConstructionsMatcherFigure type="angle_bisector" />,
          prompt: 'Szögfelező ponthalmaz tétel',
          value: 'A szögfelező bármely P pontja egyenlő távolságra van a két szögszártól: d(P, a) = d(P, b)'
        },
        {
          id: 'p3-4',
          promptFigure: <ConstructionsMatcherFigure type="triangle_possible" />,
          prompt: 'Oldalak: 6 cm, 8 cm, 10 cm',
          value: 'Szerkeszthető derékszögű háromszög (6 + 8 = 14 > 10, Pitagoraszi számhármas)'
        },
        {
          id: 'p3-5',
          promptFigure: <ConstructionsMatcherFigure type="triangle_impossible" />,
          prompt: 'Oldalak: 1 cm, 2 cm, 3 cm',
          value: 'NEM alkot háromszöget, mert 1 + 2 = 3 (a három pont egyetlen egyenesre esik)'
        },
        {
          id: 'p3-6',
          promptFigure: <ConstructionsMatcherFigure type="parallel" />,
          prompt: 'Eukleidész V. axiómája',
          value: 'Egyenesen kívüli ponton át pontosan egyetlen párhuzamos egyenes húzható a síkban'
        }
      ]
    }
  };

  const handleNextLevel = () => {
    if (level < 3) {
      const next = (level + 1) as DifficultyLevel;
      setLevel(next);
      if (onNextLevel) onNextLevel();
    }
  };

  return (
    <MatcherTemplate
      level={level}
      onLevelChange={setLevel}
      levelsConfig={levelsConfig}
      title="Szerkesztések Kártyás Párosító"
      subtitle="Párosítsd a szerkesztési ábrákat és a geometriai szabályokat!"
      badge="📐 6. Osztály • III. Geometria • 5. Fejezet"
      themeColor="indigo"
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onSwitchToTheory={onSwitchToTheory}
      onNextLevel={handleNextLevel}
      onOpenRules={onOpenRules}
    />
  );
}

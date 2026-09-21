import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { AxialSymmetryMiniFigure } from './AxialSymmetryDiagrams';

export interface AxialSymmetryMatcherProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function AxialSymmetryMatcher({
  onBack,
  onSwitchToQuiz,
  onSwitchToSorter,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: AxialSymmetryMatcherProps) {
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
    // 1. SZINT: ALAP SÍKIDOMOK ÉS TENGELYEIK SZÁMA (8 PÁR)
    1: {
      level: 1,
      title: '1. Szint: Alap síkidomok és szimmetriatengelyeik száma',
      description: 'Párosítsd a síkidomokat a szimmetriatengelyeik pontos számával!',
      pairs: [
        {
          id: 'p1-1',
          promptFigure: <AxialSymmetryMiniFigure type="zero_axes" />,
          prompt: 'Általános háromszög',
          value: '0 szimmetriatengely (aszimmetrikus)'
        },
        {
          id: 'p1-2',
          promptFigure: <AxialSymmetryMiniFigure type="one_axis" />,
          prompt: 'Egyenlő szárú háromszög',
          value: '1 szimmetriatengely (az alaphoz tartozó magasság)'
        },
        {
          id: 'p1-3',
          promptFigure: <AxialSymmetryMiniFigure type="two_axes" />,
          prompt: 'Téglalap',
          value: '2 szimmetriatengely (szemközti oldalfelezők)'
        },
        {
          id: 'p1-4',
          promptFigure: <AxialSymmetryMiniFigure type="rhombus_axes" />,
          prompt: 'Rombusz',
          value: '2 szimmetriatengely (a két átlója)'
        },
        {
          id: 'p1-5',
          promptFigure: <AxialSymmetryMiniFigure type="three_axes" />,
          prompt: 'Szabályos háromszög',
          value: '3 szimmetriatengely (oldalfelezők / szögfelezők)'
        },
        {
          id: 'p1-6',
          promptFigure: <AxialSymmetryMiniFigure type="four_axes" />,
          prompt: 'Négyzet',
          value: '4 szimmetriatengely (2 oldalfelező + 2 átló)'
        },
        {
          id: 'p1-7',
          promptFigure: <AxialSymmetryMiniFigure type="six_axes" />,
          prompt: 'Szabályos hatszög',
          value: '6 szimmetriatengely (3 átló + 3 oldalfelező)'
        },
        {
          id: 'p1-8',
          promptFigure: <AxialSymmetryMiniFigure type="infinite_axes" />,
          prompt: 'Kör',
          value: 'Végtelen sok (∞) tengely (átmérők egyenesei)'
        }
      ]
    },

    // 2. SZINT: BETŰK ÉS SZIMBÓLUMOK SZIMMETRIÁJA (8 PÁR)
    2: {
      level: 2,
      title: '2. Szint: Betűk és szimbólumok szimmetriája',
      description: 'Párosítsd a nyomtatott nagybetűket és szimbólumokat a szimmetriatípusukkal!',
      pairs: [
        {
          id: 'p2-1',
          promptFigure: <AxialSymmetryMiniFigure type="letter_a" />,
          prompt: '„A” betű',
          value: '1 függőleges szimmetriatengely'
        },
        {
          id: 'p2-2',
          promptFigure: <AxialSymmetryMiniFigure type="letter_m" />,
          prompt: '„M” betű',
          value: '1 függőleges szimmetriatengely'
        },
        {
          id: 'p2-3',
          promptFigure: <AxialSymmetryMiniFigure type="letter_b" />,
          prompt: '„B” betű',
          value: '1 vízszintes szimmetriatengely'
        },
        {
          id: 'p2-4',
          promptFigure: <AxialSymmetryMiniFigure type="letter_e" />,
          prompt: '„E” betű',
          value: '1 vízszintes szimmetriatengely'
        },
        {
          id: 'p2-5',
          promptFigure: <AxialSymmetryMiniFigure type="letter_h" />,
          prompt: '„H” betű',
          value: '2 szimmetriatengely (vízszintes és függőleges)'
        },
        {
          id: 'p2-6',
          promptFigure: <AxialSymmetryMiniFigure type="letter_x" />,
          prompt: '„X” betű',
          value: '2 szimmetriatengely (vízszintes és függőleges)'
        },
        {
          id: 'p2-7',
          promptFigure: <AxialSymmetryMiniFigure type="letter_f" />,
          prompt: '„F” betű',
          value: '0 szimmetriatengely (aszimmetrikus betű)'
        },
        {
          id: 'p2-8',
          promptFigure: <AxialSymmetryMiniFigure type="natural_butterfly" />,
          prompt: 'Pillangó',
          value: '1 függőleges szimmetriatengely (élővilág)'
        }
      ]
    },

    // 3. SZINT: HALADÓ GEOMETRIAI ALAKZATOK ÉS TERMÉSZET (8 PÁR)
    3: {
      level: 3,
      title: '3. Szint: Különleges alakzatok és természetes szimmetriák',
      description: 'Párosítsd a sokszögeket és természetes alakzatokat szimmetriatulajdonságaikkal!',
      pairs: [
        {
          id: 'p3-1',
          promptFigure: <AxialSymmetryMiniFigure type="deltoid" />,
          prompt: 'Deltoid',
          value: '1 szimmetriatengely (a szimmetriaátlója)'
        },
        {
          id: 'p3-2',
          promptFigure: <AxialSymmetryMiniFigure type="isosceles_trapezoid" />,
          prompt: 'Egyenlő szárú trapéz (húrtrapéz)',
          value: '1 szimmetriatengely (alapok közös felezőmerőlegese)'
        },
        {
          id: 'p3-3',
          promptFigure: <AxialSymmetryMiniFigure type="parallelogram" />,
          prompt: 'Általános paralelogramma',
          value: '0 tengely (nincs szimmetriatengelye!)'
        },
        {
          id: 'p3-4',
          promptFigure: <AxialSymmetryMiniFigure type="five_axes" />,
          prompt: 'Szabályos ötszög',
          value: '5 szimmetriatengely (csúcsból szemközti oldalfelezőbe)'
        },
        {
          id: 'p3-5',
          promptFigure: <AxialSymmetryMiniFigure type="eight_axes" />,
          prompt: 'Szabályos nyolcszög',
          value: '8 szimmetriatengely (4 átló + 4 oldalfelező)'
        },
        {
          id: 'p3-6',
          promptFigure: <AxialSymmetryMiniFigure type="snowflake" />,
          prompt: 'Hópehely kristály',
          value: '6 szimmetriatengely (hexagonális rács)'
        },
        {
          id: 'p3-7',
          promptFigure: <AxialSymmetryMiniFigure type="semicircle" />,
          prompt: 'Félkör alakzat',
          value: '1 szimmetriatengely (átmérő felezőmerőlegese)'
        },
        {
          id: 'p3-8',
          promptFigure: <AxialSymmetryMiniFigure type="number_8" />,
          prompt: '8-as számjegy',
          value: '2 szimmetriatengely (vízszintes és függőleges)'
        }
      ]
    }
  };

  const currentConfig = levelsConfig[level];

  return (
    <MatcherTemplate
      grade={6}
      chapterId="g6-geometry"
      title="Tengelyes szimmetria párosító"
      badge="📐 6. Osztály • III. Geometria • 8. Fejezet"
      topicId="g6-axial-symmetry-matcher"
      themeColor="violet"
      currentLevel={level}
      config={currentConfig}
      onLevelChange={(lvl) => setLevel(lvl)}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onSwitchToTheory={onSwitchToTheory}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
}

import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { ConstructionsMatcherFigure } from './ConstructionsDiagrams';

export interface ConstructionsSorterProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function ConstructionsSorter({
  onBack,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: ConstructionsSorterProps) {
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
    // 1. SZINT: ESZKÖZÖK SZEREPE ÉS SZERKESZTÉSI LÉPÉSEK
    1: {
      level: 1,
      title: 'Szerkesztési eszközök és műveletek',
      subtitle: 'Csoportosítsd a szerkesztési műveleteket és lépéseket a megfelelő eszköz szerint!',
      categories: [
        {
          id: 'compass',
          title: 'Körző (Körívek, távolságok)',
          color: 'indigo',
          emoji: '🧭'
        },
        {
          id: 'ruler',
          title: 'Vonalzó (Összekötés, egyenes)',
          color: 'amber',
          emoji: '📏'
        },
        {
          id: 'both',
          title: 'Mindkét eszköz együttesen',
          color: 'emerald',
          emoji: '📐'
        }
      ],
      items: [
        {
          id: 'i1',
          text: 'Távolság átvitele és felmérése',
          figure: <ConstructionsMatcherFigure type="compass_tool" />,
          correctCategoryId: 'compass'
        },
        {
          id: 'i2',
          text: 'Két tetszőleges pont összekötése',
          figure: <ConstructionsMatcherFigure type="ruler_tool" />,
          correctCategoryId: 'ruler'
        },
        {
          id: 'i3',
          text: 'Szögfelező szerkesztése (f_α)',
          figure: <ConstructionsMatcherFigure type="angle_bisector" />,
          correctCategoryId: 'both'
        },
        {
          id: 'i4',
          text: 'Azonos sugarú körívek rajzolása',
          figure: <ConstructionsMatcherFigure type="compass_tool" />,
          correctCategoryId: 'compass'
        },
        {
          id: 'i5',
          text: 'Félegyenes meghosszabbítása',
          figure: <ConstructionsMatcherFigure type="ruler_tool" />,
          correctCategoryId: 'ruler'
        },
        {
          id: 'i6',
          text: 'Merőleges egyenes szerkesztése',
          figure: <ConstructionsMatcherFigure type="perpendicular" />,
          correctCategoryId: 'both'
        },
        {
          id: 'i7',
          text: 'Háromszög megszerkesztése 3 oldalból',
          figure: <ConstructionsMatcherFigure type="triangle_sss" />,
          correctCategoryId: 'both'
        },
        {
          id: 'i8',
          text: 'Párhuzamos egyenesek szerkesztése',
          figure: <ConstructionsMatcherFigure type="parallel" />,
          correctCategoryId: 'both'
        }
      ]
    },

    // 2. SZINT: HÁROMSZÖG-SZERKESZTHETŐSÉG (a + b > c)
    2: {
      level: 2,
      title: 'Háromszög-szerkeszthetőség (a + b > c)',
      subtitle: 'Döntsd el a megadott oldalhosszakról, hogy szerkeszthető-e belőlük háromszög!',
      categories: [
        {
          id: 'possible',
          title: 'Szerkeszthető (a + b > c)',
          color: 'emerald',
          emoji: '✅'
        },
        {
          id: 'impossible',
          title: 'Nem szerkeszthető (a + b ≤ c)',
          color: 'rose',
          emoji: '❌'
        }
      ],
      items: [
        {
          id: 'i2-1',
          text: 'Oldalak: 3 cm, 4 cm, 5 cm (3 + 4 = 7 > 5)',
          figure: <ConstructionsMatcherFigure type="triangle_possible" />,
          correctCategoryId: 'possible'
        },
        {
          id: 'i2-2',
          text: 'Oldalak: 2 cm, 3 cm, 8 cm (2 + 3 = 5 < 8)',
          figure: <ConstructionsMatcherFigure type="triangle_impossible" />,
          correctCategoryId: 'impossible'
        },
        {
          id: 'i2-3',
          text: 'Oldalak: 6 cm, 6 cm, 6 cm (Szabályos △)',
          figure: <ConstructionsMatcherFigure type="triangle_possible" />,
          correctCategoryId: 'possible'
        },
        {
          id: 'i2-4',
          text: 'Oldalak: 1 cm, 2 cm, 3 cm (1 + 2 = 3 egyenes)',
          figure: <ConstructionsMatcherFigure type="triangle_impossible" />,
          correctCategoryId: 'impossible'
        },
        {
          id: 'i2-5',
          text: 'Oldalak: 5 cm, 12 cm, 13 cm (5 + 12 = 17 > 13)',
          figure: <ConstructionsMatcherFigure type="triangle_possible" />,
          correctCategoryId: 'possible'
        },
        {
          id: 'i2-6',
          text: 'Oldalak: 4 cm, 5 cm, 10 cm (4 + 5 = 9 < 10)',
          figure: <ConstructionsMatcherFigure type="triangle_impossible" />,
          correctCategoryId: 'impossible'
        },
        {
          id: 'i2-7',
          text: 'Oldalak: 7 cm, 8 cm, 9 cm (7 + 8 = 15 > 9)',
          figure: <ConstructionsMatcherFigure type="triangle_possible" />,
          correctCategoryId: 'possible'
        },
        {
          id: 'i2-8',
          text: 'Oldalak: 3 cm, 4 cm, 8 cm (3 + 4 = 7 < 8)',
          figure: <ConstructionsMatcherFigure type="triangle_impossible" />,
          correctCategoryId: 'impossible'
        }
      ]
    },

    // 3. SZINT: NEVEZETES SZERKESZTHETŐ SZÖGEK
    3: {
      level: 3,
      title: 'Nevezetes szerkeszthető szögek',
      subtitle: 'Csoportosítsd a szögeket szerkesztési módjuk szerint!',
      categories: [
        {
          id: 'base',
          title: 'Alapszögek (60°, 90°)',
          color: 'amber',
          emoji: '📐'
        },
        {
          id: 'bisected',
          title: 'Felezéssel kapott (30°, 45°)',
          color: 'teal',
          emoji: '✂️'
        },
        {
          id: 'composite',
          title: 'Összetett szögek (75°, 120°, 135°)',
          color: 'purple',
          emoji: '✨'
        }
      ],
      items: [
        {
          id: 'i3-1',
          text: '60°-os szög (Szabályos △)',
          figure: <ConstructionsMatcherFigure type="angle_60" />,
          correctCategoryId: 'base'
        },
        {
          id: 'i3-2',
          text: '90°-os derékszög (Merőleges)',
          figure: <ConstructionsMatcherFigure type="angle_90" />,
          correctCategoryId: 'base'
        },
        {
          id: 'i3-3',
          text: '30°-os szög (60° / 2)',
          figure: <ConstructionsMatcherFigure type="angle_30" />,
          correctCategoryId: 'bisected'
        },
        {
          id: 'i3-4',
          text: '45°-os szög (90° / 2)',
          figure: <ConstructionsMatcherFigure type="angle_45" />,
          correctCategoryId: 'bisected'
        },
        {
          id: 'i3-5',
          text: '120°-os szög (2 × 60° egymás mellett)',
          figure: <ConstructionsMatcherFigure type="angle_60" />,
          correctCategoryId: 'composite'
        },
        {
          id: 'i3-6',
          text: '75°-os szög (60° + 15°)',
          figure: <ConstructionsMatcherFigure type="angle_30" />,
          correctCategoryId: 'composite'
        },
        {
          id: 'i3-7',
          text: '135°-os szög (90° + 45°)',
          figure: <ConstructionsMatcherFigure type="angle_45" />,
          correctCategoryId: 'composite'
        },
        {
          id: 'i3-8',
          text: '15°-os szög (30° / 2 felezés)',
          figure: <ConstructionsMatcherFigure type="angle_30" />,
          correctCategoryId: 'bisected'
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
    <SorterTemplate
      level={level}
      onLevelChange={setLevel}
      levelsConfig={levelsConfig}
      title="Szerkesztések Csoportosító Játék"
      subtitle="Rendszerezd a szerkesztési lépéseket, háromszögeket és nevezetes szögeket!"
      badge="📐 6. Osztály • III. Geometria • 5. Fejezet"
      themeColor="indigo"
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToTheory={onSwitchToTheory}
      onNextLevel={handleNextLevel}
      onOpenRules={onOpenRules}
    />
  );
}

import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface EquationMethodsSorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: '1. Szint: Legcélszerűbb Megoldási Módszer',
    subtitle: 'Melyik stratégiával oldható meg a leggyorsabban és legbiztonságosabban az adott egyenlet?',
    instruction: 'Húzd az egyenleteket a legalkalmasabb megoldási módszer kategóriájába!',
    categories: [
      {
        id: 'c1',
        title: 'Lebontogatás közvetlenül',
        description: 'Az ismeretlen egyetlen kifejezésben áll, a jobb oldalon szám található'
      },
      {
        id: 'c2',
        title: 'Szisztematikus próbálgatás',
        description: 'Szorzat alakú egyenlet, osztópárok vagy véges elemszámú alaphalmaz'
      },
      {
        id: 'c3',
        title: 'Zárójelbontás és összevonás először',
        description: 'Több ismeretlenes tag, egymásba ágyazott zárójelek'
      }
    ],
    items: [
      {
        id: 'i1',
        text: '(5x - 4) / 3 = 7',
        categoryId: 'c1'
      },
      {
        id: 'i2',
        text: '(3x + 8) · 2 - 5 = 17',
        categoryId: 'c1'
      },
      {
        id: 'i3',
        text: '4(x/6 - 9) = -16',
        categoryId: 'c1'
      },
      {
        id: 'i4',
        text: 'x/3 + 20 = 200',
        categoryId: 'c1'
      },
      {
        id: 'i5',
        text: 'x · (12 - x) = 32 (x ∈ N)',
        categoryId: 'c2'
      },
      {
        id: 'i6',
        text: 'x · (x - 1) = 6 a {2; 3; 5; 7} prímhalmazon',
        categoryId: 'c2'
      },
      {
        id: 'i7',
        text: 'x · (x + 2) = 168 (téglalap területe)',
        categoryId: 'c2'
      },
      {
        id: 'i8',
        text: 'Kétjegyű szám: felcserélve különbségük 45',
        categoryId: 'c2'
      },
      {
        id: 'i9',
        text: '3(x + 2) + 2(x - 1) - (5 - x) = 11',
        categoryId: 'c3'
      },
      {
        id: 'i10',
        text: '2(3 - 4x) + 3(6 + 2x) + 4x = 16',
        categoryId: 'c3'
      },
      {
        id: 'i11',
        text: '4x + 7 - x + 11 = 28',
        categoryId: 'c3'
      },
      {
        id: 'i12',
        text: '5(10 - 2x) - 4(10 + 2x) = 100',
        categoryId: 'c3'
      }
    ]
  },
  2: {
    title: '2. Szint: A Megoldás Előjele és Típusa',
    subtitle: 'Milyen számhalmazba tartozik a kiszámított gyök?',
    instruction: 'Csoportosítsd az egyenleteket a megoldásuk számértéke szerint!',
    categories: [
      {
        id: 'c1',
        title: 'Pozitív egész megoldás (x ∈ N)',
        description: 'Természetes szám gyök (1, 2, 3, ...)'
      },
      {
        id: 'c2',
        title: 'Negatív egész megoldás (x ∈ Z-)',
        description: 'Negatív egész szám gyök (-1, -2, -3, ...)'
      },
      {
        id: 'c3',
        title: 'Tört vagy tizedestört megoldás',
        description: 'Nem egész racionális szám (pl. 0,4; 1/3; 2,5)'
      }
    ],
    items: [
      {
        id: 'i13',
        text: '(5x - 4) / 3 = 7 (x = 5)',
        categoryId: 'c1'
      },
      {
        id: 'i14',
        text: '3x - 4 = 2 (x = 2)',
        categoryId: 'c1'
      },
      {
        id: 'i15',
        text: '4(x/6 - 9) = -16 (x = 30)',
        categoryId: 'c1'
      },
      {
        id: 'i16',
        text: '(x/4 + 10) · 5 = 60 (x = 8)',
        categoryId: 'c1'
      },
      {
        id: 'i17',
        text: '(13 - 2x) / 3 = 7 (x = -4)',
        categoryId: 'c2'
      },
      {
        id: 'i18',
        text: '(9 + 6x) / 3 = -1 (x = -2)',
        categoryId: 'c2'
      },
      {
        id: 'i19',
        text: '2x + 24 = 16 (x = -4)',
        categoryId: 'c2'
      },
      {
        id: 'i20',
        text: '3x + 10 = 4 (x = -2)',
        categoryId: 'c2'
      },
      {
        id: 'i21',
        text: '-10x + 12 = 8 (-10x = -4, x = 0,4)',
        categoryId: 'c3'
      },
      {
        id: 'i22',
        text: '4x = 7 (x = 1,75 = 7/4)',
        categoryId: 'c3'
      },
      {
        id: 'i23',
        text: '3x = 10 (x = 3 egész 1/3)',
        categoryId: 'c3'
      },
      {
        id: 'i24',
        text: '6x = -15 (x = -2,5)',
        categoryId: 'c3'
      }
    ]
  },
  3: {
    title: '3. Szint: Egyenlet és Alaphalmaz Kapcsolata',
    subtitle: 'Hány megoldása van az egyenletnek a megadott alaphalmazon?',
    instruction: 'Sorold be az egyenleteket az alaphalmaz szerinti megoldáshalmazuk tulajdonsága alapján!',
    categories: [
      {
        id: 'c1',
        title: 'Pontosan egy gyök az alaphalmazon',
        description: 'M = {x0}, a gyök eleme az alaphalmaznak'
      },
      {
        id: 'c2',
        title: 'Több megoldás van',
        description: 'Kettő vagy több gyök is kielégíti az egyenletet'
      },
      {
        id: 'c3',
        title: 'Nincs megoldás az alaphalmazon',
        description: 'Üres halmaz: M = ∅ (a gyök nem eleme U-nak)'
      }
    ],
    items: [
      {
        id: 'i25',
        text: '3x + 5 = 20, alaphalmaz: N (x = 5)',
        categoryId: 'c1'
      },
      {
        id: 'i26',
        text: '(5x - 4) / 3 = 7, alaphalmaz: Z (x = 5)',
        categoryId: 'c1'
      },
      {
        id: 'i27',
        text: 'x · (x - 1) = 6, alaphalmaz: 10-nél kisebb prímek (x = 3)',
        categoryId: 'c1'
      },
      {
        id: 'i28',
        text: '(13 - 2x) / 3 = 7, alaphalmaz: Z (x = -4)',
        categoryId: 'c1'
      },
      {
        id: 'i29',
        text: 'x · (12 - x) = 32, alaphalmaz: N (x = 4 és x = 8)',
        categoryId: 'c2'
      },
      {
        id: 'i30',
        text: 'x · x = 25, alaphalmaz: Z (x = 5 és x = -5)',
        categoryId: 'c2'
      },
      {
        id: 'i31',
        text: '|x| = 7, alaphalmaz: Z (x = 7 és x = -7)',
        categoryId: 'c2'
      },
      {
        id: 'i32',
        text: 'x / (x / 8) = 8, alaphalmaz: nem nulla racionális számok',
        categoryId: 'c2'
      },
      {
        id: 'i33',
        text: '2x = 7, alaphalmaz: N (mivel 3,5 nem természetes szám)',
        categoryId: 'c3'
      },
      {
        id: 'i34',
        text: 'x + 5 = 2, alaphalmaz: N (mivel -3 nem természetes szám)',
        categoryId: 'c3'
      },
      {
        id: 'i35',
        text: 'x · (x - 1) = 6, alaphalmaz: {2; 5; 7} prímek',
        categoryId: 'c3'
      },
      {
        id: 'i36',
        text: '(13 - 2x) / 3 = 7, alaphalmaz: N (mivel -4 nem természetes szám)',
        categoryId: 'c3'
      }
    ]
  }
};

export const EquationMethodsSorter: React.FC<EquationMethodsSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g7-pct-eq-methods-sorter',
  topicTitle = 'Egyenletmegoldási módszerek: próbálgatás és lebontogatás'
}) => {
  const activeLvl = (currentLevel ?? level) as DifficultyLevel;

  return (
    <SorterTemplate
      level={activeLvl}
      currentLevel={activeLvl}
      levels={sorterLevels}
      levelConfigs={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="indigo"
    />
  );
};

export default EquationMethodsSorter;

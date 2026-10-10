import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface BalanceScaleSorterProps {
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
    title: '1. Szint: A Mérlegelv Lépésének Célja',
    subtitle: 'Milyen célt szolgál az egyenlet mellé írt művelet?',
    instruction: 'Csoportosítsd a mérlegelv lépéseit a rendezésben betöltött szerepük szerint!',
    categories: [
      {
        id: 'c1',
        title: 'Szám eltüntetése (összeadás/kivonás)',
        description: 'A konstans számokat a másik oldalra tereli (+ c vagy - c)'
      },
      {
        id: 'c2',
        title: 'Ismeretlen egy oldalra gyűjtése',
        description: 'Az x-es tagokat vonja ki vagy adja hozzá mindkét oldalhoz (- kx vagy + kx)'
      },
      {
        id: 'c3',
        title: 'Együtthatóval való osztás',
        description: 'Az ismeretlen elől eltünteti a szorzótényezőt (/: a)'
      }
    ],
    items: [
      {
        id: 'i1',
        text: '3x + 2 = x + 12 / - 2',
        categoryId: 'c1'
      },
      {
        id: 'i2',
        text: '4x - 7 = 2x + 5 / + 7',
        categoryId: 'c1'
      },
      {
        id: 'i3',
        text: '1 - 3x = 10 / - 1',
        categoryId: 'c1'
      },
      {
        id: 'i4',
        text: '12 = 4x - 16 / + 16',
        categoryId: 'c1'
      },
      {
        id: 'i5',
        text: '3x = x + 10 / - x',
        categoryId: 'c2'
      },
      {
        id: 'i6',
        text: '4x = 2x + 12 / - 2x',
        categoryId: 'c2'
      },
      {
        id: 'i7',
        text: '1 - 4x = 10 - x / + x',
        categoryId: 'c2'
      },
      {
        id: 'i8',
        text: '24 - 3x = 3x / + 3x',
        categoryId: 'c2'
      },
      {
        id: 'i9',
        text: '2x = 10 / : 2',
        categoryId: 'c3'
      },
      {
        id: 'i10',
        text: '4x = 36 / : 4',
        categoryId: 'c3'
      },
      {
        id: 'i11',
        text: '-3x = 9 / : (-3)',
        categoryId: 'c3'
      },
      {
        id: 'i12',
        text: '6x = 24 / : 6',
        categoryId: 'c3'
      }
    ]
  },
  2: {
    title: '2. Szint: Művelet Érvényessége a Mérlegen',
    subtitle: 'Melyik művelet szabályos ekvivalens átalakítás, és melyik tiltott vagy hibás?',
    instruction: 'Csoportosítsd a lépéseket a matematikai érvényességük alapján!',
    categories: [
      {
        id: 'c1',
        title: 'Szabályos ekvivalens mérlegelv-lépés',
        description: 'Mindkét oldalhoz ugyanazt a számot adjuk, vonjuk ki vagy nullától különböző számmal osztunk'
      },
      {
        id: 'c2',
        title: 'Hibás: csak az egyik oldal változik',
        description: 'A mérleg egyensúlya felborul, mert nem mindkét oldal kapja a műveletet'
      },
      {
        id: 'c3',
        title: 'Tiltott átalakítás: nullával való művelet',
        description: 'Nullával szorzás vagy nullával osztás, ami tönkreteszi a megoldáshalmazt'
      }
    ],
    items: [
      {
        id: 'i13',
        text: '3x + 5 = 20 mindkét oldalából 5 kivonása',
        categoryId: 'c1'
      },
      {
        id: 'i14',
        text: '4x = 2x + 8 mindkét oldalából 2x kivonása',
        categoryId: 'c1'
      },
      {
        id: 'i15',
        text: '2x = 14 mindkét oldalának elosztása 2-vel',
        categoryId: 'c1'
      },
      {
        id: 'i16',
        text: 'x/3 = 7 mindkét oldalának megszorzása 3-mal',
        categoryId: 'c1'
      },
      {
        id: 'i17',
        text: '3x + 4 = 19 esetén felírjuk: 3x = 19 (csak a balról vontuk le)',
        categoryId: 'c2'
      },
      {
        id: 'i18',
        text: '2x + 8 = 10 esetén a bal oldalból 8-at elveszünk, a jobbhoz hozzáadjuk',
        categoryId: 'c2'
      },
      {
        id: 'i19',
        text: '4x = 12 esetén csak a bal oldalt osztjuk 4-gyel',
        categoryId: 'c2'
      },
      {
        id: 'i20',
        text: '2x + 5 = x + 9 esetén csak a bal oldalból veszünk el x-et',
        categoryId: 'c2'
      },
      {
        id: 'i21',
        text: 'Mindkét oldal megszorzása 0-val (/ · 0)',
        categoryId: 'c3'
      },
      {
        id: 'i22',
        text: 'Mindkét oldal elosztása 0-val (/ : 0)',
        categoryId: 'c3'
      },
      {
        id: 'i23',
        text: 'Mindkét oldal elosztása (x - x)-szel',
        categoryId: 'c3'
      },
      {
        id: 'i24',
        text: '0-val való szorzás az ismeretlenes kifejezés eltüntetésére',
        categoryId: 'c3'
      }
    ]
  },
  3: {
    title: '3. Szint: Az Egyenlet Megoldásának Típusa',
    subtitle: 'Milyen értéket vesz fel az egyenlet gyöke a rendezés után?',
    instruction: 'Sorold be az egyenleteket a végső gyökük jellege szerint!',
    categories: [
      {
        id: 'c1',
        title: 'Pozitív egész megoldás (x ∈ N)',
        description: 'x = 1, 2, 3, ... természetes szám gyök'
      },
      {
        id: 'c2',
        title: 'Negatív szám megoldás (x < 0)',
        description: 'x = -1, -2, -3, -7,5, ... negatív érték'
      },
      {
        id: 'c3',
        title: 'Pozitív tört vagy tizedestört (x ∉ Z)',
        description: 'Nem egész pozitív racionális szám (pl. 7,5; 0,5)'
      }
    ],
    items: [
      {
        id: 'i25',
        text: '3x + 2 = x + 12 (x = 5)',
        categoryId: 'c1'
      },
      {
        id: 'i26',
        text: '4x - 7 = 2x + 5 (x = 6)',
        categoryId: 'c1'
      },
      {
        id: 'i27',
        text: '6x + 14 = 9x - 10 (x = 8)',
        categoryId: 'c1'
      },
      {
        id: 'i28',
        text: '5x + 26 = 7x (x = 13, Csilla kora)',
        categoryId: 'c1'
      },
      {
        id: 'i29',
        text: '1 - 4x = 10 - x (x = -3)',
        categoryId: 'c2'
      },
      {
        id: 'i30',
        text: '4x - 29 = 8x + 1 (x = -7,5)',
        categoryId: 'c2'
      },
      {
        id: 'i31',
        text: '10(x + 8) = 6(x - 2) (x = -23)',
        categoryId: 'c2'
      },
      {
        id: 'i32',
        text: '4(3x - 7) = 4(7x - 3) (x = -1)',
        categoryId: 'c2'
      },
      {
        id: 'i33',
        text: '8x - 1 = 4x + 29 (4x = 30 -> x = 7,5)',
        categoryId: 'c3'
      },
      {
        id: 'i34',
        text: '9(2x - 1) = 9(1 - 2x) (36x = 18 -> x = 0,5)',
        categoryId: 'c3'
      },
      {
        id: 'i35',
        text: '6x - 2 = 5x + 7,5 (x = 9,5)',
        categoryId: 'c3'
      },
      {
        id: 'i36',
        text: '5x = 2x + 7 (3x = 7 -> x = 7/3 = 2 és 1/3)',
        categoryId: 'c3'
      }
    ]
  }
};

export const BalanceScaleSorter: React.FC<BalanceScaleSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g7-pct-balance-sorter',
  topicTitle = 'A mérlegelv'
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
      themeColor="sky"
    />
  );
};

export default BalanceScaleSorter;

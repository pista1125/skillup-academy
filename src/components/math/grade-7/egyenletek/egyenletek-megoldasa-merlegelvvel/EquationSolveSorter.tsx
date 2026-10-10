import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface EquationSolveSorterProps {
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
    title: '1. Szint: A 7 Lépéses Algoritmus Fázisai',
    subtitle: 'Melyik műveleti lépéshez tartozik a megadott egyenletrészlet vagy átalakítás?',
    instruction: 'Csoportosítsd az átalakításokat az algoritmus megfelelő fázisa szerint!',
    categories: [
      {
        id: 'c1',
        title: 'Törtek eltüntetése (LKKT)',
        description: 'Beszorzás a közös nevezővel mindkét oldalon'
      },
      {
        id: 'c2',
        title: 'Zárójelfelbontás és előjelváltás',
        description: 'Disztributivitás és a zárójel előtti szorzás elvégzése'
      },
      {
        id: 'c3',
        title: 'Mérlegelvvel való rendezés (±)',
        description: 'Ismeretlenek vagy konstansok átvitele a másik oldalra'
      },
      {
        id: 'c4',
        title: 'Együtthatóval való osztás (/: a)',
        description: 'Az ismeretlen előtti szorzó leosztása a gyök megkapásához'
      }
    ],
    items: [
      { id: 'i1', text: '(x + 1) / 3 = 4  / · 3', categoryId: 'c1' },
      { id: 'i2', text: 'x / 2 - x / 5 = 3  / · 10', categoryId: 'c1' },
      { id: 'i3', text: '2(3x - 4) ⟹ 6x - 8', categoryId: 'c2' },
      { id: 'i4', text: '-(5x - 2) ⟹ -5x + 2', categoryId: 'c2' },
      { id: 'i5', text: '-3(x + 7) ⟹ -3x - 21', categoryId: 'c2' },
      { id: 'i6', text: '4x + 9 = 25  / - 9', categoryId: 'c3' },
      { id: 'i7', text: '7x = 3x + 20  / - 3x', categoryId: 'c3' },
      { id: 'i8', text: '2x - 15 = 5  / + 15', categoryId: 'c3' },
      { id: 'i9', text: '4x = 28  / : 4', categoryId: 'c4' },
      { id: 'i10', text: '-5x = 35  / : (-5)', categoryId: 'c4' },
      { id: 'i11', text: '3x = -18  / : 3', categoryId: 'c4' },
      { id: 'i12', text: '0,5x = 8  / : 0,5', categoryId: 'c4' }
    ]
  },
  2: {
    title: '2. Szint: Egyenletek Típusai a Gyökök Száma Szerint',
    subtitle: 'Határozd meg, hogy az egyenletnek hány megoldása van a racionális számok halmazán!',
    instruction: 'Sorold be az egyenleteket a megoldások száma és típusa szerint!',
    categories: [
      {
        id: 'c1',
        title: 'Egyértelmű megoldás (1 gyök)',
        description: 'Pontosan egyetlen x érték teszi igazzá az egyenlőséget'
      },
      {
        id: 'c2',
        title: 'Azonosság (M = Q, végtelen sok)',
        description: '0x = 0; Bármely racionális szám behelyettesíthető'
      },
      {
        id: 'c3',
        title: 'Ellentmondás (M = ∅, nincs megoldás)',
        description: '0x = c (c ≠ 0); Nincs olyan szám, ami megoldást adna'
      }
    ],
    items: [
      { id: 'i13', text: '3x + 5 = 20 (x = 5)', categoryId: 'c1' },
      { id: 'i14', text: '4(x - 2) = 2x + 10 (x = 9)', categoryId: 'c1' },
      { id: 'i15', text: '5x - 3 = 2x + 18 (x = 7)', categoryId: 'c1' },
      { id: 'i16', text: '2x / 3 = 8 (x = 12)', categoryId: 'c1' },
      { id: 'i17', text: '2(3x + 4) = 6x + 8', categoryId: 'c2' },
      { id: 'i18', text: '5x - 2 = 5x - 2', categoryId: 'c2' },
      { id: 'i19', text: '4x + 10 = 2(2x + 5)', categoryId: 'c2' },
      { id: 'i20', text: '3(x - 1) + 3 = 3x', categoryId: 'c2' },
      { id: 'i21', text: '4x + 7 = 4x - 3', categoryId: 'c3' },
      { id: 'i22', text: '2(x + 3) = 2x + 10', categoryId: 'c3' },
      { id: 'i23', text: '6x - 5 = 6x + 1', categoryId: 'c3' },
      { id: 'i24', text: '0x = 9', categoryId: 'c3' }
    ]
  },
  3: {
    title: '3. Szint: Számhalmazok és Megoldhatóság',
    subtitle: 'Milyen számhalmazban található meg a kapott gyök?',
    instruction: 'Csoportosítsd az egyenleteket a gyök számhalmazbeli hovatartozása szerint!',
    categories: [
      {
        id: 'c1',
        title: 'Természetes szám (x ∈ N)',
        description: 'Pozitív egész szám vagy 0 (0, 1, 2, 3...)'
      },
      {
        id: 'c2',
        title: 'Negatív egész szám (x ∈ Z⁻)',
        description: 'Egész szám, de nem természetes (-1, -2, -3...)'
      },
      {
        id: 'c3',
        title: 'Nem egész tört (x ∈ Q \\ Z)',
        description: 'Valódi tört vagy tizedestört alakú gyök'
      },
      {
        id: 'c4',
        title: 'Nincs gyök (M = ∅)',
        description: 'Ellentmondás, vagy ha a gyök nem eleme a kikötésnek'
      }
    ],
    items: [
      { id: 'i25', text: '2x + 6 = 16 ⟹ x = 5', categoryId: 'c1' },
      { id: 'i26', text: '5x - 3 = 22 ⟹ x = 5', categoryId: 'c1' },
      { id: 'i27', text: '3x = 12 ⟹ x = 4', categoryId: 'c1' },
      { id: 'i28', text: '3x + 15 = 3 ⟹ x = -4', categoryId: 'c2' },
      { id: 'i29', text: '4x + 20 = 4 ⟹ x = -4', categoryId: 'c2' },
      { id: 'i30', text: '2x - 1 = -9 ⟹ x = -4', categoryId: 'c2' },
      { id: 'i31', text: '2x = 7 ⟹ x = 3,5', categoryId: 'c3' },
      { id: 'i32', text: '3x = 5 ⟹ x = 5/3', categoryId: 'c3' },
      { id: 'i33', text: '4x = -2 ⟹ x = -0,5', categoryId: 'c3' },
      { id: 'i34', text: '3x + 4 = 3x - 1', categoryId: 'c4' },
      { id: 'i35', text: '2x = 2x + 5', categoryId: 'c4' },
      { id: 'i36', text: '0x = -8', categoryId: 'c4' }
    ]
  }
};

export const EquationSolveSorter: React.FC<EquationSolveSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g7-eq-solve-sorter',
  topicTitle = '3. Egyenletek megoldása mérlegelvvel'
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
      themeColor="violet"
    />
  );
};

export default EquationSolveSorter;

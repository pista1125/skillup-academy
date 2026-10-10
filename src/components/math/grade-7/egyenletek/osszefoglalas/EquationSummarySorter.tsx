import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface EquationSummarySorterProps {
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
    title: '1. Szint: A Megoldáshalmaz Kimenetelének Besorolása',
    subtitle: 'Milyen megoldáshalmaza van a megadott egyenletnek a racionális számok (Q) halmazán?',
    instruction: 'Csoportosítsd az egyenleteket a megoldásuk száma szerint!',
    categories: [
      {
        id: 'c1',
        title: 'Pontosan 1 megoldás',
        description: 'Egyértelmű gyök (pl. x = 4 vagy x = 0)'
      },
      {
        id: 'c2',
        title: 'Nincs megoldás (M = ∅)',
        description: 'Ellentmondás (pl. 0x = 6 vagy 5 = 2)'
      },
      {
        id: 'c3',
        title: 'Végtelen sok megoldás (Azonosság)',
        description: 'Minden szám kielégíti (0x = 0 vagy 0 = 0)'
      }
    ],
    items: [
      { id: 'i1', text: '3x - 5 = 10', correctCategoryId: 'c1' },
      { id: 'i2', text: '2x + 7 = 2x + 1', correctCategoryId: 'c2' },
      { id: 'i3', text: '4(x + 2) = 4x + 8', correctCategoryId: 'c3' },
      { id: 'i4', text: '5x = 0', correctCategoryId: 'c1' },
      { id: 'i5', text: 'x + 3 = x - 2', correctCategoryId: 'c2' },
      { id: 'i6', text: '3x - 3 = 3(x - 1)', correctCategoryId: 'c3' },
      { id: 'i7', text: '7 - 2x = 1', correctCategoryId: 'c1' },
      { id: 'i8', text: '6x - 4 = 6x + 2', correctCategoryId: 'c2' },
      { id: 'i9', text: '2(3x - 5) + 10 = 6x', correctCategoryId: 'c3' },
      { id: 'i10', text: 'x / 4 = 3', correctCategoryId: 'c1' },
      { id: 'i11', text: '5x + 9 = 5x', correctCategoryId: 'c2' },
      { id: 'i12', text: 'x + x = 2x', correctCategoryId: 'c3' }
    ]
  },
  2: {
    title: '2. Szint: Legcélszerűbb Első Megoldási Lépés',
    subtitle: 'Melyik matematikai lépéssel a leghatékonyabb kezdeni az adott egyenlet vagy egyenlőtlenség megoldását?',
    instruction: 'Csoportosítsd a kifejezéseket a legcélravezetőbb első lépés szerint!',
    categories: [
      {
        id: 'c1',
        title: 'Lebontogatás',
        description: 'Egyetlen ismeretlen bal oldalon, külső művelet visszacsinálása'
      },
      {
        id: 'c2',
        title: 'Zárójelek bontása és összevonás',
        description: 'Több zárójel vagy egynemű tag azonos oldalon'
      },
      {
        id: 'c3',
        title: 'Közös nevezővel szorzás',
        description: 'Törtes egyenlet a törtek kiküszöbölésére'
      },
      {
        id: 'c4',
        title: 'Relációjel fordítása',
        description: 'Negatív együtthatóval való osztás/szorzás egyenlőtlenségnél'
      }
    ],
    items: [
      { id: 'i13', text: '3(2x - 4) + 6 = 18  ⟹  Kívülről: -6, majd :3', correctCategoryId: 'c1' },
      { id: 'i14', text: '2(x - 3) + 3(2x + 1) = 15', correctCategoryId: 'c2' },
      { id: 'i15', text: 'x/3 + x/4 = 7  ⟹  szorzás 12-vel', correctCategoryId: 'c3' },
      { id: 'i16', text: '-5x < 25  ⟹  osztás (-5)-tel és relációjel csere', correctCategoryId: 'c4' },
      { id: 'i17', text: '4(x + 5) - 8 = 24  ⟹  +8, majd :4', correctCategoryId: 'c1' },
      { id: 'i18', text: '5x - 2 + 3x - 4 = 18  ⟹  egyneműek összevonása', correctCategoryId: 'c2' },
      { id: 'i19', text: '(2x - 1)/5 = (x + 3)/2  ⟹  szorzás 10-zel', correctCategoryId: 'c3' },
      { id: 'i20', text: '-2x ≥ 10  ⟹  osztás (-2)-vel és ≥-ből ≤', correctCategoryId: 'c4' },
      { id: 'i21', text: '(x - 7) / 3 = 5  ⟹  szorzás 3-mal, majd +7', correctCategoryId: 'c1' },
      { id: 'i22', text: '3(4 - x) - 2(x + 5) = 0', correctCategoryId: 'c2' },
      { id: 'i23', text: 'x/2 - 3 = x/5 + 1  ⟹  szorzás 10-zel', correctCategoryId: 'c3' },
      { id: 'i24', text: '-x > 7  ⟹  szorzás (-1)-gyel és >-ból <', correctCategoryId: 'c4' }
    ]
  },
  3: {
    title: '3. Szint: Állítások Matematikai Helyessége és Ekvivalenciája',
    subtitle: 'Helyes matematikai lépésről vagy tipikus tévedésről van szó?',
    instruction: 'Csoportosítsd az állításokat érvényességük szerint!',
    categories: [
      {
        id: 'c1',
        title: 'Mindig helyes / Ekvivalens',
        description: 'Szabályos ekvivalens átalakítás, nem változtatja a gyökök halmazát'
      },
      {
        id: 'c2',
        title: 'Alaphalmaztól függő igazság',
        description: 'Csak adott halmazon (pl. Z vagy Q) van megoldása'
      },
      {
        id: 'c3',
        title: 'Matematikai hiba / Hibás lépés',
        description: 'Tilos művelet vagy elrontott algebrai szabály'
      }
    ],
    items: [
      { id: 'i25', text: 'Mindkét oldalhoz ugyanazon szám hozzáadása: a = b  ⟺  a + c = b + c', correctCategoryId: 'c1' },
      { id: 'i26', text: '2x = 5 megoldása: ha A = Z, nincs megoldás; ha A = Q, x = 2,5', correctCategoryId: 'c2' },
      { id: 'i27', text: '-2(x - 3) felbontása mint -2x - 6', correctCategoryId: 'c3' },
      { id: 'i28', text: 'Mindkét oldal szorzása nemnulla c számmal: a = b  ⟺  a · c = b · c', correctCategoryId: 'c1' },
      { id: 'i29', text: 'x + 4 = 1 megoldása: ha A = N, M = ∅; ha A = Z, x = -3', correctCategoryId: 'c2' },
      { id: 'i30', text: '-3x < 9 esetén osztunk (-3)-mal és x < -3-at kapunk (jel változatlan marad)', correctCategoryId: 'c3' },
      { id: 'i31', text: 'Az egyenlet gyökének behelyettesítése az EREDETI egyenlet mindkét oldalába', correctCategoryId: 'c1' },
      { id: 'i32', text: 'x² = 4 megoldása: ha A = N, x = 2; ha A = Z, x ∈ {-2, 2}', correctCategoryId: 'c2' },
      { id: 'i33', text: 'Mindkét oldal osztása 0-val mérlegelvként', correctCategoryId: 'c3' },
      { id: 'i34', text: 'Egynemű tagok összevonása azonos oldalon: 3x + 2x = 5x', correctCategoryId: 'c1' },
      { id: 'i35', text: 'x < 3 esetén: ha A = N, M = {0, 1, 2}; ha A = Z, végtelen sok negatív szám is megoldás', correctCategoryId: 'c2' },
      { id: 'i36', text: 'Törtvonal elhagyásakor -(2x - 5) helyett -2x - 5 írása', correctCategoryId: 'c3' }
    ]
  }
};

export const EquationSummarySorter: React.FC<EquationSummarySorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g7-eq-summary-sorter',
  topicTitle = '5. Összefoglalás - Csoportosító'
}) => {
  const activeLevel = (currentLevel || level || 1) as DifficultyLevel;

  return (
    <SorterTemplate
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
      title="Egyenletek Összefoglalás - Csoportosító Játék"
      subtitle="Csoportosítsd az egyenleteket kimenetel, módszer és matematikai helyesség szerint!"
      badge="VI. FEJEZET • CSOPORTOSÍTÓ"
      themeColor="indigo"
      levels={sorterLevels}
      grade={7}
      chapterId="g7-percent-equations"
    />
  );
};

export default EquationSummarySorter;

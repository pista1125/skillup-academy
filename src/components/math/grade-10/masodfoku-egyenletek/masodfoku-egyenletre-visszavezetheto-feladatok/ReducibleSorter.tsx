import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ReducibleSorterProps {
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
    title: 'Egyenletek csoportosítása a visszavezetési módszer szerint',
    subtitle: 'Válogasd szét az összetett egyenleteket a legcélszerűbb megoldási stratégia szerint!',
    categories: [
      {
        id: 'cat-biq',
        name: 'Bikvadratikus (u = x²)',
        description: 'Negyedfokú egyenlet, melyben csak x⁴ és x² hatványok szerepelnek.',
        badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300'
      },
      {
        id: 'cat-frac',
        name: 'Törtes egyenlet',
        description: 'Az ismeretlen a nevezőben van, szigorú kikötést és beszorzást igényel.',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-root',
        name: 'Négyzetgyökös egyenlet',
        description: 'A gyökös tag izolálása után négyzetre emeléssel alakítható másodfokúvá.',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-factor',
        name: 'Kiemelés / Csoportosítás',
        description: 'Közös tényező (x) kiemelése vagy páronkénti csoportosítás szorzattá.',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      { id: 'rs1-1', content: 'x⁴ - 13x² + 36 = 0', categoryId: 'cat-biq' },
      { id: 'rs1-2', content: '4/(x - 1) + 2/x = 3', categoryId: 'cat-frac' },
      { id: 'rs1-3', content: '√(3x + 1) = x - 3', categoryId: 'cat-root' },
      { id: 'rs1-4', content: 'x³ - 25x = 0', categoryId: 'cat-factor' },
      { id: 'rs1-5', content: '2x⁴ - 7x² - 4 = 0', categoryId: 'cat-biq' },
      { id: 'rs1-6', content: '(x² - 4)/(x + 2) = 5', categoryId: 'cat-frac' },
      { id: 'rs1-7', content: '√(x + 6) + 4 = x', categoryId: 'cat-root' },
      { id: 'rs1-8', content: 'x³ - 3x² - 4x + 12 = 0', categoryId: 'cat-factor' },
      { id: 'rs1-9', content: 'x⁴ + 4x² - 5 = 0', categoryId: 'cat-biq' },
      { id: 'rs1-10', content: '1/(x - 2) + 1/(x + 2) = 5/8', categoryId: 'cat-frac' }
    ]
  },
  2: {
    title: 'Egyenletek a valós gyökök száma szerint',
    subtitle: 'Határozd meg, hány valós megoldása van az adott egyenletnek a szűrések után!',
    categories: [
      {
        id: 'cat-four',
        name: '4 valós gyök',
        description: 'Bikvadratikus egyenlet, ahol mindkét u gyök szigorúan pozitív.',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-two',
        name: '2 valós gyök',
        description: 'Egy pozitív u gyök (±√u), vagy másodfokúvá egyszerűsödő törtes/gyökös.',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-one-three',
        name: '1 vagy 3 valós gyök',
        description: 'Kiemeléses egyenlet (nullagyökkel), vagy egyetlen érvényes gyökös.',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-zero',
        name: '0 valós gyök (nincs megoldás)',
        description: 'Negatív u értékek, tiltott nevező, vagy hamis gyökök kizárása.',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 'rs2-1', content: 'x⁴ - 5x² + 4 = 0  (u₁ = 1, u₂ = 4)', categoryId: 'cat-four' },
      { id: 'rs2-2', content: 'x⁴ - 3x² - 4 = 0  (u₁ = 4, u₂ = -1 kiesik)', categoryId: 'cat-two' },
      { id: 'rs2-3', content: 'x³ - 4x = 0  (x(x - 2)(x + 2) = 0)', categoryId: 'cat-one-three' },
      { id: 'rs2-4', content: 'x⁴ + 5x² + 6 = 0  (u₁ = -2, u₂ = -3)', categoryId: 'cat-zero' },
      { id: 'rs2-5', content: 'x⁴ - 10x² + 9 = 0  (u₁ = 1, u₂ = 9)', categoryId: 'cat-four' },
      { id: 'rs2-6', content: 'x/(x - 2) = 2/(x - 2)  (x = 2 kizárva a kikötés miatt)', categoryId: 'cat-zero' },
      { id: 'rs2-7', content: '√(x + 2) = -5  (négyzetgyök nem lehet negatív)', categoryId: 'cat-zero' },
      { id: 'rs2-8', content: '√(x + 5) = x - 1  (x = 4 jó, x = -1 hamis)', categoryId: 'cat-one-three' },
      { id: 'rs2-9', content: 'x⁴ - 16 = 0  (x² = 16 ⟹ x = ±4 helyett ±2)', categoryId: 'cat-two' },
      { id: 'rs2-10', content: 'x⁴ - 2x² + 1 = 0  ((x² - 1)² = 0 ⟹ x = ±1)', categoryId: 'cat-two' }
    ]
  },
  3: {
    title: 'Helyes matematikai lépés vs. Végzetes buktató',
    subtitle: 'Válogasd szét a megoldási műveleteket aszerint, hogy helyesek vagy súlyos hibát tartalmaznak!',
    categories: [
      {
        id: 'cat-correct',
        name: 'Helyes és biztonságos lépés',
        description: 'Matematikailag precíz átalakítás, ekvivalens lépés vagy kötelező szűrés.',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-error',
        name: 'Súlyos hiba / Buktató',
        description: 'Gyökvesztéshez vagy hamis gyök elfogadásához vezető helytelen művelet.',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 'rs3-1', content: 'x³ - 9x = 0 esetén x kiemelése szorzattá: x · (x² - 9) = 0', categoryId: 'cat-correct' },
      { id: 'rs3-2', content: 'x³ - 9x = 0 esetén mindkét oldal leosztása x-szel (elveszik az x = 0 gyök!)', categoryId: 'cat-error' },
      { id: 'rs3-3', content: 'Bikvadratikus egyenletnél az u = x² helyettesítéshez kikötjük, hogy u ≥ 0', categoryId: 'cat-correct' },
      { id: 'rs3-4', content: 'Bikvadratikusnál u = -9 esetén felírjuk, hogy x = ±√(-9) = ±3', categoryId: 'cat-error' },
      { id: 'rs3-5', content: 'Törtes egyenletnél a legelső lépésként rögzítjük a Nevező ≠ 0 kikötést', categoryId: 'cat-correct' },
      { id: 'rs3-6', content: 'Gyökös egyenletnél négyzetre emelés után elhagyjuk az ellenőrzést', categoryId: 'cat-error' },
      { id: 'rs3-7', content: '√(x + 3) = -2 esetén azonnal megállapítjuk, hogy az egyenletnek nincs megoldása', categoryId: 'cat-correct' },
      { id: 'rs3-8', content: 'Közös nevezővel való beszorzás után kapott gyököt ellenőrzés nélkül elfogadjuk', categoryId: 'cat-error' },
      { id: 'rs3-9', content: 'Gyökös egyenletnél a gyökök behelyettesítése az EREDETI egyenletbe', categoryId: 'cat-correct' },
      { id: 'rs3-10', content: 'A négyzetre emelés mindig ekvivalens átalakítás, sosem keletkezik hamis gyök', categoryId: 'cat-error' }
    ]
  }
};

export const ReducibleSorter: React.FC<ReducibleSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g10-quad-visszavezetheto',
  topicTitle = 'Másodfokú egyenletre visszavezethető feladatok'
}) => {
  const activeLevel = currentLevel || level;

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
      levelConfigs={sorterLevels}
    />
  );
};


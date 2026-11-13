import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  VieteFormulasDuoSvg,
  SignOfRootsDeductionSvg,
  SymmetricExpressionsSquareSvg,
  SymmetricExpressionsReciprocalSvg,
  MentalRootGuesserSvg
} from './VieteFormulasFigures';

interface VieteFormulasSorterProps {
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
    title: 'A gyökök előjele az együtthatókból',
    subtitle: 'Határozd meg az egyenlet gyökeinek előjelét kizárólag a Viète-formulák alapján!',
    categories: [
      {
        id: 'cat-both-pos',
        name: 'Két szigorúan pozitív gyök (+, +)',
        description: 'A szorzat pozitív (c/a > 0) és az összeg is pozitív (-b/a > 0)',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-both-neg',
        name: 'Két szigorúan negatív gyök (-, -)',
        description: 'A szorzat pozitív (c/a > 0), de az összeg negatív (-b/a < 0)',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-opposite',
        name: 'Ellentétes előjelű gyökök (+, -)',
        description: 'A szorzat szigorúan negatív (c/a < 0)',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 'vfs1-1', content: 'x² - 8x + 15 = 0', figure: <SignOfRootsDeductionSvg size={42} />, categoryId: 'cat-both-pos' },
      { id: 'vfs1-2', content: 'x² - 5x + 6 = 0', categoryId: 'cat-both-pos' },
      { id: 'vfs1-3', content: '2x² - 10x + 8 = 0', categoryId: 'cat-both-pos' },
      { id: 'vfs1-4', content: 'x² + 7x + 12 = 0', figure: <SignOfRootsDeductionSvg size={42} />, categoryId: 'cat-both-neg' },
      { id: 'vfs1-5', content: 'x² + 9x + 14 = 0', categoryId: 'cat-both-neg' },
      { id: 'vfs1-6', content: '2x² + 6x + 4 = 0', categoryId: 'cat-both-neg' },
      { id: 'vfs1-7', content: 'x² - 2x - 8 = 0', figure: <SignOfRootsDeductionSvg size={42} />, categoryId: 'cat-opposite' },
      { id: 'vfs1-8', content: 'x² + 3x - 10 = 0', categoryId: 'cat-opposite' },
      { id: 'vfs1-9', content: '3x² + 5x - 2 = 0', categoryId: 'cat-opposite' }
    ]
  },
  2: {
    title: 'Kifejezések szimmetriája',
    subtitle: 'Csoportosítsd a gyökökből képzett kifejezéseket szimmetriájuk szerint!',
    categories: [
      {
        id: 'cat-symmetric',
        name: 'Szimmetrikus gyökkifejezés',
        description: 'x₁ és x₂ felcserélésével a kifejezés alakja és értéke változatlan marad',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-non-symmetric',
        name: 'Nem szimmetrikus kifejezés',
        description: 'x₁ és x₂ felcserélése megváltoztatja a kifejezés értékét',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-constant',
        name: 'Előjelfüggetlen / Négyzetes szimmetria',
        description: 'Négyzetre emelés vagy szorzás révén szimmetrikus értéket adó alak',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      }
    ],
    items: [
      { id: 'vfs2-1', content: 'x₁² + x₂²', figure: <SymmetricExpressionsSquareSvg size={42} />, categoryId: 'cat-symmetric' },
      { id: 'vfs2-2', content: '1/x₁ + 1/x₂', figure: <SymmetricExpressionsReciprocalSvg size={42} />, categoryId: 'cat-symmetric' },
      { id: 'vfs2-3', content: 'x₁³ + x₂³', categoryId: 'cat-symmetric' },
      { id: 'vfs2-4', content: 'x₁ - x₂', categoryId: 'cat-non-symmetric' },
      { id: 'vfs2-5', content: '2x₁ + 3x₂', categoryId: 'cat-non-symmetric' },
      { id: 'vfs2-6', content: 'x₁² · x₂', categoryId: 'cat-non-symmetric' },
      { id: 'vfs2-7', content: '(x₁ - x₂)²', categoryId: 'cat-constant' },
      { id: 'vfs2-8', content: '|x₁ - x₂|', categoryId: 'cat-constant' },
      { id: 'vfs2-9', content: 'x₁ · x₂', figure: <VieteFormulasDuoSvg size={42} />, categoryId: 'cat-constant' }
    ]
  },
  3: {
    title: 'Viète-szabályok, tévhitek és feltételek',
    subtitle: 'Különböztesd meg a helyes tételeket a gyakori előjelhibáktól és feltételektől!',
    categories: [
      {
        id: 'cat-viete-rule',
        name: 'Érvényes Viète-tétel',
        description: 'Szigorúan érvényes matematikai összefüggés az együtthatók és gyökök között',
        badgeColor: 'bg-green-100 text-green-900 border-green-300'
      },
      {
        id: 'cat-sign-trap',
        name: 'Veszélyes hiba / Tévhit',
        description: 'Tipikus előjelhiba vagy hibás általánosítás',
        badgeColor: 'bg-red-100 text-red-900 border-red-300'
      },
      {
        id: 'cat-existence',
        name: 'Létezési / Érvényességi feltétel',
        description: 'A diszkriminánsra (D ≥ 0) vagy a nevezőre vonatkozó kötelező előírás',
        badgeColor: 'bg-yellow-100 text-yellow-900 border-yellow-300'
      }
    ],
    items: [
      {
        id: 'vfs3-1',
        content: 'x₁ + x₂ = -b / a minden valós gyökökkel rendelkező másodfokú egyenletre.',
        figure: <VieteFormulasDuoSvg size={42} />,
        categoryId: 'cat-viete-rule'
      },
      {
        id: 'vfs3-2',
        content: 'x₁ · x₂ = c / a minden valós gyökökkel rendelkező másodfokú egyenletre.',
        categoryId: 'cat-viete-rule'
      },
      {
        id: 'vfs3-3',
        content: 'A gyökök négyzetösszege felírható x₁² + x₂² = (x₁ + x₂)² - 2x₁x₂ alakban.',
        figure: <SymmetricExpressionsSquareSvg size={42} />,
        categoryId: 'cat-viete-rule'
      },
      {
        id: 'vfs3-4',
        content: 'Az x² + 6x + 8 = 0 egyenlet gyökeinek összege egyszerűen +6.',
        categoryId: 'cat-sign-trap'
      },
      {
        id: 'vfs3-5',
        content: 'A Viète-formulák akkor is valós számokat adnak gyökként, ha a diszkrimináns D < 0.',
        categoryId: 'cat-sign-trap'
      },
      {
        id: 'vfs3-6',
        content: 'Ha c/a > 0, akkor a gyökök biztosan mindketten szigorúan pozitívak.',
        categoryId: 'cat-sign-trap'
      },
      {
        id: 'vfs3-7',
        content: 'A Viète-formulák csak akkor jelentenek valós gyököket, ha D = b² - 4ac ≥ 0 teljesül.',
        categoryId: 'cat-existence'
      },
      {
        id: 'vfs3-8',
        content: 'A reciprok összeg (1/x₁ + 1/x₂) csak akkor értelmezett, ha c ≠ 0 (egyik gyök sem nulla).',
        figure: <SymmetricExpressionsReciprocalSvg size={42} />,
        categoryId: 'cat-existence'
      },
      {
        id: 'vfs3-9',
        content: 'A gyökök különbségének négyzete (x₁ - x₂)² = D / a², amely kizárólag D ≥ 0 esetén valós.',
        categoryId: 'cat-existence'
      }
    ]
  }
};

export const VieteFormulasSorter: React.FC<VieteFormulasSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g10-eq-viete-formulak-sorter',
  topicTitle = 'Viète-formulák – Rendszerező'
}) => {
  const activeLevel = currentLevel ?? level;

  return (
    <SorterTemplate
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="amber"
      level={activeLevel}
      levelConfig={sorterLevels[activeLevel]}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
    />
  );
};


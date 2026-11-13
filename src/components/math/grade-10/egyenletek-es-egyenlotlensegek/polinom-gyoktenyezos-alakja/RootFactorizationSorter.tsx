import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  RootFactorFormulaSvg,
  MissingLeadingCoeffTrapSvg,
  FractionSimplificationSvg,
  DiscriminantCasesFactorSvg,
  ConstructEquationFromRootsSvg
} from './RootFactorizationFigures';

interface RootFactorizationSorterProps {
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
    title: 'A szorzattá alakíthatóság jellege',
    subtitle: 'Csoportosítsd a polinomokat a gyöktényezős alakjuk típusa szerint!',
    categories: [
      {
        id: 'cat-two-factors',
        name: 'Két különböző valós tényező (D > 0)',
        description: 'A kifejezés felírható a(x - x₁)(x - x₂) alakban két különböző valós gyökkel',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-perfect-square',
        name: 'Teljes négyzet (D = 0)',
        description: 'Egyetlen kettős zérushely van: a(x - x₀)²',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-prime-poly',
        name: 'Nem bontható valós szorzatra (D < 0)',
        description: 'Nincs valós zérushely, a valós számok felett felbonthatatlan (prímpolinom)',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 'rfs1-1', content: 'x² - 4x + 3', figure: <RootFactorFormulaSvg size={42} />, categoryId: 'cat-two-factors' },
      { id: 'rfs1-2', content: 'x² - 25', categoryId: 'cat-two-factors' },
      { id: 'rfs1-3', content: '2x² - 5x + 2', categoryId: 'cat-two-factors' },
      { id: 'rfs1-4', content: 'x² - 6x + 9', figure: <DiscriminantCasesFactorSvg size={42} />, categoryId: 'cat-perfect-square' },
      { id: 'rfs1-5', content: '4x² + 4x + 1', categoryId: 'cat-perfect-square' },
      { id: 'rfs1-6', content: 'x² - 10x + 25', categoryId: 'cat-perfect-square' },
      { id: 'rfs1-7', content: 'x² + 4', categoryId: 'cat-prime-poly' },
      { id: 'rfs1-8', content: 'x² + 2x + 5', figure: <DiscriminantCasesFactorSvg size={42} />, categoryId: 'cat-prime-poly' },
      { id: 'rfs1-9', content: '2x² - 2x + 3', categoryId: 'cat-prime-poly' }
    ]
  },
  2: {
    title: 'A főegyüttható (a) szerepe a szorzatban',
    subtitle: 'Csoportosítsd a polinomokat a zárójelek elé kerülő főegyüttható szerint!',
    categories: [
      {
        id: 'cat-a-one',
        name: 'Normált polinom (a = 1)',
        description: 'A főegyüttható 1, a szorzat közvetlenül (x - x₁)(x - x₂)',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-a-pos',
        name: 'Kiemelendő pozitív főegyüttható (a > 1)',
        description: 'A zárójelek elé kötelező kitenni a pozitív szorzót (pl. 2, 3, 5)',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      },
      {
        id: 'cat-a-neg',
        name: 'Kiemelendő negatív főegyüttható (a < 0)',
        description: 'A főegyüttható negatív (-1, -2), a szorzat előtt mínuszjel áll',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      { id: 'rfs2-1', content: 'x² - 7x + 12', categoryId: 'cat-a-one' },
      { id: 'rfs2-2', content: 'x² - 9', categoryId: 'cat-a-one' },
      { id: 'rfs2-3', content: 'x² + 4x - 5', categoryId: 'cat-a-one' },
      { id: 'rfs2-4', content: '2x² - 8x + 6', figure: <MissingLeadingCoeffTrapSvg size={42} />, categoryId: 'cat-a-pos' },
      { id: 'rfs2-5', content: '3x² + 9x + 6', categoryId: 'cat-a-pos' },
      { id: 'rfs2-6', content: '5x² - 20', categoryId: 'cat-a-pos' },
      { id: 'rfs2-7', content: '-x² + 3x - 2', categoryId: 'cat-a-neg' },
      { id: 'rfs2-8', content: '-2x² + 6x - 4', categoryId: 'cat-a-neg' },
      { id: 'rfs2-9', content: '-x² + 16', categoryId: 'cat-a-neg' }
    ]
  },
  3: {
    title: 'Tételek, tévhitek és egyszerűsítési szabályok',
    subtitle: 'Különböztesd meg a matematikai igazságokat a veszélyes hibáktól és az egyszerűsítési előírásoktól!',
    categories: [
      {
        id: 'cat-theorem',
        name: 'Mindig érvényes tétel',
        description: 'Szigorú matematikai definíció és tétel a gyöktényezős alakról',
        badgeColor: 'bg-green-100 text-green-900 border-green-300'
      },
      {
        id: 'cat-fallacy',
        name: 'Veszélyes tévhit / Hiba',
        description: 'Gyakori érettségi pontlevonást eredményező elméleti vagy formai tévedés',
        badgeColor: 'bg-red-100 text-red-900 border-red-300'
      },
      {
        id: 'cat-simplification',
        name: 'Egyszerűsítés és kikötés',
        description: 'Az algebrai törtek helyes kezelésére és a kikötések megőrzésére vonatkozó szabály',
        badgeColor: 'bg-yellow-100 text-yellow-900 border-yellow-300'
      }
    ],
    items: [
      {
        id: 'rfs3-1',
        content: 'ax² + bx + c = a(x - x₁)(x - x₂) minden valós gyökökkel rendelkező másodfokú polinomra.',
        figure: <RootFactorFormulaSvg size={42} />,
        categoryId: 'cat-theorem'
      },
      {
        id: 'rfs3-2',
        content: 'Ha D = 0, a másodfokú polinom felírható a(x - x₀)² teljes négyzet alakban.',
        categoryId: 'cat-theorem'
      },
      {
        id: 'rfs3-3',
        content: 'Ha adott két gyök x₁ és x₂, a legegyszerűbb másodfokú egyenlet: (x - x₁)(x - x₂) = 0.',
        figure: <ConstructEquationFromRootsSvg size={42} />,
        categoryId: 'cat-theorem'
      },
      {
        id: 'rfs3-4',
        content: 'A 2x² - 8x + 6 polinom gyöktényezős alakja egyszerűen (x - 1)(x - 3).',
        figure: <MissingLeadingCoeffTrapSvg size={42} />,
        categoryId: 'cat-fallacy'
      },
      {
        id: 'rfs3-5',
        content: 'Ha egy polinomnak nincs valós gyöke (D < 0), akkor is felbontható valós elsőfokú szorzatra.',
        categoryId: 'cat-fallacy'
      },
      {
        id: 'rfs3-6',
        content: 'Tört egyszerűsítése után a nevező kikötése automatikusan törlődik, a tiltott érték újra használható.',
        categoryId: 'cat-fallacy'
      },
      {
        id: 'rfs3-7',
        content: 'Algebrai tört egyszerűsítése előtt kötelező meghatározni a nevező zérushelyeit.',
        figure: <FractionSimplificationSvg size={42} />,
        categoryId: 'cat-simplification'
      },
      {
        id: 'rfs3-8',
        content: 'Törtben csak a számláló és a nevező közös szorzótényezőivel szabad egyszerűsíteni, tagokkal tilos.',
        categoryId: 'cat-simplification'
      },
      {
        id: 'rfs3-9',
        content: 'Az egyszerűsített tört értelmezési tartománya megegyezik az eredeti tört értelmezési tartományával.',
        categoryId: 'cat-simplification'
      }
    ]
  }
};

export const RootFactorizationSorter: React.FC<RootFactorizationSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g10-eq-polinom-gyoktenyezos-alakja-sorter',
  topicTitle = 'Polinom gyöktényezős alakja – Rendszerező'
}) => {
  const activeLevel = currentLevel ?? level;

  return (
    <SorterTemplate
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="purple"
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


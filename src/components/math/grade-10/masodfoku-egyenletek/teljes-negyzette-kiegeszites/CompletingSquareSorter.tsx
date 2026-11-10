import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CompletingSquareSorterProps {
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
    title: 'Másodfokú egyenletek típusai',
    subtitle: 'Válogasd szét az egyenleteket a hiányzó tagjaik vagy teljességük szerint!',
    categories: [
      {
        id: 'cat-c0',
        name: 'Hiányos: c = 0 (Kiemelés x-szel)',
        description: 'ax² + bx = 0 alakú, az egyik gyök mindig x₁ = 0',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-b0',
        name: 'Hiányos: b = 0 (Tiszta négyzetes)',
        description: 'ax² + c = 0 alakú, x² kifejezhető és gyököt vonunk',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-full',
        name: 'Teljes másodfokú egyenlet',
        description: 'ax² + bx + c = 0 (a, b, c ≠ 0), négyzetkiegészítést igényel',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      }
    ],
    items: [
      { id: 's1-1', content: '3x² - 15x = 0', categoryId: 'cat-c0' },
      { id: 's1-2', content: 'x² - 25 = 0', categoryId: 'cat-b0' },
      { id: 's1-3', content: 'x² + 6x + 8 = 0', categoryId: 'cat-full' },
      { id: 's1-4', content: '5x² + 20x = 0', categoryId: 'cat-c0' },
      { id: 's1-5', content: '2x² - 50 = 0', categoryId: 'cat-b0' },
      { id: 's1-6', content: 'x² - 4x - 12 = 0', categoryId: 'cat-full' },
      { id: 's1-7', content: '7x² = 0', categoryId: 'cat-b0' },
      { id: 's1-8', content: 'x² + 10x + 25 = 0', categoryId: 'cat-full' },
      { id: 's1-9', content: '4x² + 16 = 0', categoryId: 'cat-b0' },
      { id: 's1-10', content: '8x - x² = 0', categoryId: 'cat-c0' },
      { id: 's1-11', content: 'x² - 14x + 45 = 0', categoryId: 'cat-full' },
      { id: 's1-12', content: '6x² + 18x = 0', categoryId: 'cat-c0' }
    ]
  },
  2: {
    title: 'Valós gyökök száma a jobb oldal ((x + d)² = k) alapján',
    subtitle: 'Csoportosítsd az egyenleteket aszerint, hány valós megoldásuk létezik!',
    categories: [
      {
        id: 'cat-two',
        name: '2 különböző valós gyök (k > 0)',
        description: 'A jobb oldal pozitív, ±√k mindkét ága valós számot ad',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-one',
        name: '1 valós gyök / kettős gyök (k = 0)',
        description: 'A jobb oldal 0, a teljes négyzet alatti tag kötelezően 0',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-none',
        name: '0 valós gyök (k < 0)',
        description: 'A jobb oldal negatív, valós szám négyzete nem lehet negatív',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 's2-1', content: '(x - 3)² = 16', categoryId: 'cat-two' },
      { id: 's2-2', content: '(x + 5)² = 0', categoryId: 'cat-one' },
      { id: 's2-3', content: '(x - 1)² = -4', categoryId: 'cat-none' },
      { id: 's2-4', content: 'x² + 4x + 4 = 0  [(x + 2)² = 0]', categoryId: 'cat-one' },
      { id: 's2-5', content: 'x² + 2x - 3 = 0  [(x + 1)² = 4]', categoryId: 'cat-two' },
      { id: 's2-6', content: 'x² + 6x + 10 = 0  [(x + 3)² = -1]', categoryId: 'cat-none' },
      { id: 's2-7', content: '(x + 7)² = 1', categoryId: 'cat-two' },
      { id: 's2-8', content: '(x - 9)² = 0', categoryId: 'cat-one' },
      { id: 's2-9', content: 'x² + 25 = 0  [x² = -25]', categoryId: 'cat-none' },
      { id: 's2-10', content: '(x + 2)² = 25', categoryId: 'cat-two' }
    ]
  },
  3: {
    title: 'Helyes négyzetté alakítás vs. Tipikus hiba',
    subtitle: 'Döntsd el a felírt algebrai átalakításról, hogy matematikailag helyes vagy hibás!',
    categories: [
      {
        id: 'cat-valid',
        name: 'Helyes átalakítás',
        description: 'Pontos felezés (p/2) és helyes kompenzáció (-d²)',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-invalid',
        name: 'Hibás átalakítás (Téves lépés)',
        description: 'Előjelhiba a levonásnál, hibás felezés vagy rossz négyzetre emelés',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 's3-1', content: 'x² + 6x = (x + 3)² - 9', categoryId: 'cat-valid' },
      { id: 's3-2', content: 'x² - 8x = (x - 4)² + 16', categoryId: 'cat-invalid' },
      { id: 's3-3', content: 'x² - 10x = (x - 5)² - 25', categoryId: 'cat-valid' },
      { id: 's3-4', content: 'x² + 4x = (x + 4)² - 16', categoryId: 'cat-invalid' },
      { id: 's3-5', content: 'x² + 12x = (x + 6)² - 36', categoryId: 'cat-valid' },
      { id: 's3-6', content: 'x² - 6x = (x - 3)² - 6', categoryId: 'cat-invalid' },
      { id: 's3-7', content: 'x² + 2x = (x + 1)² - 1', categoryId: 'cat-valid' },
      { id: 's3-8', content: 'x² - 2x = (x - 1)² + 1', categoryId: 'cat-invalid' },
      { id: 's3-9', content: 'x² - 14x = (x - 7)² - 49', categoryId: 'cat-valid' },
      { id: 's3-10', content: 'x² + 8x = (x + 4)² - 8', categoryId: 'cat-invalid' }
    ]
  }
};

export const CompletingSquareSorter: React.FC<CompletingSquareSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g10-quad-teljes-negyzet-sorter',
  topicTitle = 'Teljes négyzetté kiegészítés'
}) => {
  const activeLevel = currentLevel || level;
  const config = sorterLevels[activeLevel] || sorterLevels[1];

  return (
    <SorterTemplate
      level={activeLevel}
      title={config.title}
      subtitle={config.subtitle}
      categories={config.categories}
      items={config.items}
      level1Config={sorterLevels[1]}
      level2Config={sorterLevels[2]}
      level3Config={sorterLevels[3]}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      themeColor="amber"
      topicId={topicId}
      topicTitle={topicTitle}
    />
  );
};


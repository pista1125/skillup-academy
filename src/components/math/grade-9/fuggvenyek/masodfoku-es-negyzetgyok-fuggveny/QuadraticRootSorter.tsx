import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface QuadraticRootSorterProps {
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
    title: '1. Szint: Parabola Nyílása és Meredeksége',
    subtitle: 'Sorold be a másodfokú függvényeket az a együttható értéke és a parabola alakja szerint!',
    categories: [
      {
        id: 'cat-up-steep',
        name: 'Felfelé nyíló, meredek (a > 1)',
        description: 'Nyílása felfelé mutat és szűkebb az alap parabolánál',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-up-normal-wide',
        name: 'Felfelé nyíló, normál / lapos (0 < a ≤ 1)',
        description: 'Alapgörbe meredekségű vagy annál szélesebb/laposabb',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      },
      {
        id: 'cat-down',
        name: 'Lefelé nyíló (a < 0)',
        description: 'Tükrözve az x-tengelyre, csúcspontja maximum',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      // Felfelé nyíló, meredek
      { id: 'qs1-1', label: 'f(x) = 3(x - 1)²', category: 'cat-up-steep' },
      { id: 'qs1-2', label: 'f(x) = 2x² + 5', category: 'cat-up-steep' },
      { id: 'qs1-3', label: 'f(x) = 4(x + 3)² - 1', category: 'cat-up-steep' },
      { id: 'qs1-4', label: 'f(x) = 5(x - 2)²', category: 'cat-up-steep' },
      // Felfelé nyíló, normál / lapos
      { id: 'qs1-5', label: 'f(x) = x² - 4 (a = 1)', category: 'cat-up-normal-wide' },
      { id: 'qs1-6', label: 'f(x) = 0.5(x - 3)²', category: 'cat-up-normal-wide' },
      { id: 'qs1-7', label: 'f(x) = ¼x² + 2', category: 'cat-up-normal-wide' },
      { id: 'qs1-8', label: 'f(x) = (x + 1)² - 8', category: 'cat-up-normal-wide' },
      // Lefelé nyíló
      { id: 'qs1-9', label: 'f(x) = -x² + 3', category: 'cat-down' },
      { id: 'qs1-10', label: 'f(x) = -2(x - 4)²', category: 'cat-down' },
      { id: 'qs1-11', label: 'f(x) = -0.5(x + 1)² - 2', category: 'cat-down' },
      { id: 'qs1-12', label: 'f(x) = -(x + 5)² + 7', category: 'cat-down' }
    ]
  },
  2: {
    title: '2. Szint: Négyzetgyök Értelmezési Tartománya',
    subtitle: 'Csoportosítsd a gyökfüggvényeket a kezdőpontjuk x-koordinátája (értelmezési tartomány alsó határa) szerint!',
    categories: [
      {
        id: 'cat-domain-origin',
        name: 'Origóból indul (Dg = [0; ∞[)',
        description: 'Nincs vízszintes eltolás a gyök alatt: √x',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-domain-shifted-right',
        name: 'Jobbra tolt (Dg = [k; ∞[, k > 0)',
        description: 'A gyök alatti kifejezés √(x - k) alakú',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-domain-shifted-left',
        name: 'Balra tolt (Dg = [k; ∞[, k < 0)',
        description: 'A gyök alatti kifejezés √(x + |k|) alakú',
        badgeColor: 'bg-sky-100 text-sky-900 border-sky-300'
      }
    ],
    items: [
      // Origó
      { id: 'qs2-1', label: 'g(x) = √x', category: 'cat-domain-origin' },
      { id: 'qs2-2', label: 'g(x) = 3√x - 2', category: 'cat-domain-origin' },
      { id: 'qs2-3', label: 'g(x) = -√x + 5', category: 'cat-domain-origin' },
      { id: 'qs2-4', label: 'g(x) = ½√x', category: 'cat-domain-origin' },
      // Jobbra tolt
      { id: 'qs2-5', label: 'g(x) = √(x - 3)', category: 'cat-domain-shifted-right' },
      { id: 'qs2-6', label: 'g(x) = √(x - 7) + 1', category: 'cat-domain-shifted-right' },
      { id: 'qs2-7', label: 'g(x) = 2√(x - 1)', category: 'cat-domain-shifted-right' },
      { id: 'qs2-8', label: 'g(x) = -√(x - 4) + 2', category: 'cat-domain-shifted-right' },
      // Balra tolt
      { id: 'qs2-9', label: 'g(x) = √(x + 2)', category: 'cat-domain-shifted-left' },
      { id: 'qs2-10', label: 'g(x) = √(x + 5) - 3', category: 'cat-domain-shifted-left' },
      { id: 'qs2-11', label: 'g(x) = 4√(x + 1)', category: 'cat-domain-shifted-left' },
      { id: 'qs2-12', label: 'g(x) = -√(x + 6)', category: 'cat-domain-shifted-left' }
    ]
  },
  3: {
    title: '3. Szint: Másodfokú Függvény Zérushelyeinek Száma',
    subtitle: 'Határozd meg a csúcspont helyzete és a parabola nyílása alapján a zérushelyek számát!',
    categories: [
      {
        id: 'cat-zeros-0',
        name: '0 Zérushely (nem metszi az x-tengelyt)',
        description: 'Felfelé nyílik és v > 0, vagy lefelé nyílik és v < 0',
        badgeColor: 'bg-slate-100 text-slate-800 border-slate-300'
      },
      {
        id: 'cat-zeros-1',
        name: '1 Zérushely (érinti az x-tengelyt)',
        description: 'A csúcspont pontosan az x-tengelyen van: v = 0',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      },
      {
        id: 'cat-zeros-2',
        name: '2 Zérushely (két pontban metszi)',
        description: 'Felfelé nyílik és v < 0, vagy lefelé nyílik és v > 0',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      // 0 zérushely
      { id: 'qs3-1', label: 'f(x) = (x - 2)² + 3 (csúcs: (2; 3), felfelé)', category: 'cat-zeros-0' },
      { id: 'qs3-2', label: 'f(x) = -(x + 1)² - 4 (csúcs: (-1; -4), lefelé)', category: 'cat-zeros-0' },
      { id: 'qs3-3', label: 'f(x) = x² + 1', category: 'cat-zeros-0' },
      { id: 'qs3-4', label: 'f(x) = -2x² - 5', category: 'cat-zeros-0' },
      // 1 zérushely
      { id: 'qs3-5', label: 'f(x) = (x - 4)² (csúcs: (4; 0))', category: 'cat-zeros-1' },
      { id: 'qs3-6', label: 'f(x) = -(x + 3)² (csúcs: (-3; 0))', category: 'cat-zeros-1' },
      { id: 'qs3-7', label: 'f(x) = 2(x - 5)²', category: 'cat-zeros-1' },
      { id: 'qs3-8', label: 'f(x) = -x²', category: 'cat-zeros-1' },
      // 2 zérushely
      { id: 'qs3-9', label: 'f(x) = (x - 1)² - 4 (csúcs: (1; -4), felfelé)', category: 'cat-zeros-2' },
      { id: 'qs3-10', label: 'f(x) = -(x - 3)² + 9 (csúcs: (3; 9), lefelé)', category: 'cat-zeros-2' },
      { id: 'qs3-11', label: 'f(x) = x² - 9', category: 'cat-zeros-2' },
      { id: 'qs3-12', label: 'f(x) = -x² + 16', category: 'cat-zeros-2' }
    ]
  }
};

export const QuadraticRootSorter: React.FC<QuadraticRootSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'masodfoku-es-negyzetgyok-fuggveny',
  topicTitle = 'Másodfokú és Négyzetgyök-függvény'
}) => {
  const activeLevel = currentLevel ?? level;

  return (
    <SorterTemplate
      title="Másodfokú & Gyök Csoportosító"
      subtitle="Kategorizáld a függvényeket a nyílásuk, értelmezési tartományuk és a zérushelyeik száma szerint!"
      levels={sorterLevels}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
    />
  );
};


import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface IntegerPowersSorterProps {
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
    title: 'Kifejezés értéktartománya szerint',
    subtitle: 'Sorold be a kifejezéseket a számértékük nagysága és előjele alapján!',
    categories: [
      {
        id: 'cat-fraction',
        name: '0 és 1 közötti pozitív szám (0 < x < 1)',
        description: 'Tört alakú pozitív számértékek (negatív kitevős pozitív alapok)',
        badgeColor: 'bg-sky-100 text-sky-900 border-sky-300 dark:bg-sky-950 dark:text-sky-300'
      },
      {
        id: 'cat-ge1',
        name: '1 vagy 1-nél nagyobb szám (x ≥ 1)',
        description: 'Egész vagy 1-nél nagyobb értékek (nulladik hatványok, törtek negatív hatványai)',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
      },
      {
        id: 'cat-negative',
        name: 'Szigorúan negatív szám (x < 0)',
        description: 'Negatív alap páratlan kitevővel vagy zárójel nélküli mínuszjel',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950 dark:text-rose-300'
      }
    ],
    items: [
      { id: 'ips1-1', text: '2⁻³', categoryId: 'cat-fraction' },
      { id: 'ips1-2', text: '10⁻²', categoryId: 'cat-fraction' },
      { id: 'ips1-3', text: '3⁻¹', categoryId: 'cat-fraction' },
      { id: 'ips1-4', text: '(-2)⁻⁴', categoryId: 'cat-fraction' },
      { id: 'ips1-5', text: '5⁻²', categoryId: 'cat-fraction' },

      { id: 'ips1-6', text: '2⁰', categoryId: 'cat-ge1' },
      { id: 'ips1-7', text: '(-3)⁰', categoryId: 'cat-ge1' },
      { id: 'ips1-8', text: '(½)⁻³', categoryId: 'cat-ge1' },
      { id: 'ips1-9', text: '(⅓)⁻²', categoryId: 'cat-ge1' },
      { id: 'ips1-10', text: '(0,2)⁻²', categoryId: 'cat-ge1' },

      { id: 'ips1-11', text: '(-2)⁻³', categoryId: 'cat-negative' },
      { id: 'ips1-12', text: '-2⁻⁴', categoryId: 'cat-negative' },
      { id: 'ips1-13', text: '(-5)⁻¹', categoryId: 'cat-negative' },
      { id: 'ips1-14', text: '-5⁰', categoryId: 'cat-negative' }
    ]
  },
  2: {
    title: 'Ekvivalens értékek csoportosítása',
    subtitle: 'Válaszd szét a kifejezéseket aszerint, hogy +16-tal, +1/16-dal vagy -1/16-dal egyenlők!',
    categories: [
      {
        id: 'cat-16',
        name: 'Értéke: +16',
        description: 'Kifejezések, melyek pontos értéke 16',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300 dark:bg-indigo-950 dark:text-indigo-300'
      },
      {
        id: 'cat-pos-16th',
        name: 'Értéke: +1/16',
        description: 'Kifejezések, melyek pontos értéke +1/16',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
      },
      {
        id: 'cat-neg-16th',
        name: 'Értéke: -1/16',
        description: 'Kifejezések, melyek pontos értéke -1/16',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950 dark:text-rose-300'
      }
    ],
    items: [
      { id: 'ips2-1', text: '2⁴', categoryId: 'cat-16' },
      { id: 'ips2-2', text: '(½)⁻⁴', categoryId: 'cat-16' },
      { id: 'ips2-3', text: '(-4)²', categoryId: 'cat-16' },
      { id: 'ips2-4', text: '(¼)⁻²', categoryId: 'cat-16' },

      { id: 'ips2-5', text: '2⁻⁴', categoryId: 'cat-pos-16th' },
      { id: 'ips2-6', text: '4⁻²', categoryId: 'cat-pos-16th' },
      { id: 'ips2-7', text: '(-2)⁻⁴', categoryId: 'cat-pos-16th' },
      { id: 'ips2-8', text: '(½)⁴', categoryId: 'cat-pos-16th' },
      { id: 'ips2-9', text: '(-4)⁻²', categoryId: 'cat-pos-16th' },

      { id: 'ips2-10', text: '-2⁻⁴', categoryId: 'cat-neg-16th' },
      { id: 'ips2-11', text: '-4⁻²', categoryId: 'cat-neg-16th' },
      { id: 'ips2-12', text: '-(½)⁴', categoryId: 'cat-neg-16th' },
      { id: 'ips2-13', text: '- (2⁻⁴)', categoryId: 'cat-neg-16th' }
    ]
  },
  3: {
    title: 'Matematikai érvényesség és értelmezhetőség',
    subtitle: 'Válaszd szét a helyesen értelmezett pozitív/negatív értékeket és a nem értelmezett kifejezéseket!',
    categories: [
      {
        id: 'cat-valid-pos',
        name: 'Értelmezett pozitív érték (> 0)',
        description: 'Matematikailag helyes, pozitív valós számot adó kifejezések',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
      },
      {
        id: 'cat-valid-neg',
        name: 'Értelmezett negatív érték (< 0)',
        description: 'Matematikailag helyes, negatív valós számot adó kifejezések',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-300'
      },
      {
        id: 'cat-invalid',
        name: 'NEM ÉRTELMEZETT (Matematikai tilalom)',
        description: '0⁰ határozatlan alak vagy 0 negatív hatványa (nullával való osztás)',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950 dark:text-rose-300'
      }
    ],
    items: [
      { id: 'ips3-1', text: '(-3)⁻²', categoryId: 'cat-valid-pos' },
      { id: 'ips3-2', text: '7⁰', categoryId: 'cat-valid-pos' },
      { id: 'ips3-3', text: '(⅔)⁻²', categoryId: 'cat-valid-pos' },
      { id: 'ips3-4', text: '10⁻⁵', categoryId: 'cat-valid-pos' },

      { id: 'ips3-5', text: '(-3)⁻³', categoryId: 'cat-valid-neg' },
      { id: 'ips3-6', text: '-7⁰', categoryId: 'cat-valid-neg' },
      { id: 'ips3-7', text: '-(⅔)⁻²', categoryId: 'cat-valid-neg' },
      { id: 'ips3-8', text: '(-10)⁻³', categoryId: 'cat-valid-neg' },

      { id: 'ips3-9', text: '0⁰', categoryId: 'cat-invalid' },
      { id: 'ips3-10', text: '0⁻¹', categoryId: 'cat-invalid' },
      { id: 'ips3-11', text: '0⁻⁵', categoryId: 'cat-invalid' },
      { id: 'ips3-12', text: '(5 - 5)⁻³', categoryId: 'cat-invalid' }
    ]
  }
};

export const IntegerPowersSorter: React.FC<IntegerPowersSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g10-hatvanyozas-negyzetgyok',
  topicTitle = '2. Egész kitevőjű hatványok'
}) => {
  const activeLevel = currentLevel || level;

  return (
    <SorterTemplate
      level={activeLevel}
      currentLevel={activeLevel}
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
      title="Egész kitevőjű hatványok csoportosító játék"
      subtitle="Csoportosítsd a kifejezéseket értékük, előjelük és érvényességük szerint!"
      themeColor="indigo"
    />
  );
};


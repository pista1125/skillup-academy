import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface LogicSorterProps {
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
    title: '1. Szint: Mondatok Típusa: Állítás vagy Nem Állítás?',
    subtitle: 'Válogasd szét a mondatokat az igazságtartalmuk és típusuk szerint!',
    categories: [
      {
        id: 'cat-true-stmt',
        name: 'Igaz Állítás',
        description: 'Matematikailag egyértelműen igaz kijelentés',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300'
      },
      {
        id: 'cat-false-stmt',
        name: 'Hamis Állítás',
        description: 'Matematikailag egyértelműen hamis kijelentés',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300'
      },
      {
        id: 'cat-not-stmt',
        name: 'Nem Állítás',
        description: 'Felszólítás, kérdés vagy szubjektív vélemény',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300'
      }
    ],
    items: [
      { id: 's1-1', label: 'A 10 osztható 2-vel és 5-tel is', category: 'cat-true-stmt' },
      { id: 's1-2', label: 'Két páratlan szám összege mindig páros', category: 'cat-true-stmt' },
      { id: 's1-3', label: 'A 0 minden nemnulla egész számnak többszöröse', category: 'cat-true-stmt' },
      { id: 's1-4', label: 'A 2 az egyetlen páros prímszám', category: 'cat-true-stmt' },
      { id: 's1-5', label: 'Minden 5-re végződő szám osztható 10-zel', category: 'cat-false-stmt' },
      { id: 's1-6', label: 'A 0-val minden számot el lehet osztani', category: 'cat-false-stmt' },
      { id: 's1-7', label: 'A 9 prímszám', category: 'cat-false-stmt' },
      { id: 's1-8', label: 'Minden páros szám osztható 4-gyel', category: 'cat-false-stmt' },
      { id: 's1-9', label: 'Számold ki gyorsan a számjegyek összegét!', category: 'cat-not-stmt' },
      { id: 's1-10', label: 'Hány osztója van a 100-nak?', category: 'cat-not-stmt' },
      { id: 's1-11', label: 'A matematika a legfontosabb tantárgy', category: 'cat-not-stmt' },
      { id: 's1-12', label: 'Gyakorold az oszthatósági szabályokat!', category: 'cat-not-stmt' }
    ]
  },
  2: {
    title: '2. Szint: Feltételes Állítások és Megfordításaik',
    subtitle: 'Csoportosítsd az állításokat az eredeti és megfordított állítás igazsága szerint!',
    categories: [
      {
        id: 'cat-both-true',
        name: 'Eredeti és Megfordítása is Igaz',
        description: 'Mindkét irányban érvényes matematikai tétel',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300'
      },
      {
        id: 'cat-orig-true-rev-false',
        name: 'Eredeti Igaz, de Megfordítása Hamis',
        description: 'Az állítás igaz, de a megfordítására van ellenpélda',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300'
      },
      {
        id: 'cat-orig-false',
        name: 'Már az Eredeti Állítás is Hamis',
        description: 'Téves matematikai állítás',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300'
      }
    ],
    items: [
      { id: 's2-1', label: 'Egy szám pontosan akkor osztható 9-cel, ha számjegyösszege osztható 9-cel', category: 'cat-both-true' },
      { id: 's2-2', label: 'Egy szám pontosan akkor páros, ha utolsó jegye 0, 2, 4, 6 vagy 8', category: 'cat-both-true' },
      { id: 's2-3', label: 'Egy szám pontosan akkor osztható 10-zel, ha utolsó jegye 0', category: 'cat-both-true' },
      { id: 's2-4', label: 'Egy szám pontosan akkor osztható 25-tel, ha utolsó 2 jegye 00, 25, 50 vagy 75', category: 'cat-both-true' },
      { id: 's2-5', label: 'Ha egy szám osztható 10-zel, akkor osztható 5-tel is', category: 'cat-orig-true-rev-false' },
      { id: 's2-6', label: 'Ha egy szám osztható 9-cel, akkor osztható 3-mal is', category: 'cat-orig-true-rev-false' },
      { id: 's2-7', label: 'Ha egy szám osztható 6-tal, akkor páros', category: 'cat-orig-true-rev-false' },
      { id: 's2-8', label: 'Ha egy szám osztható 100-zal, akkor osztható 4-gyel is', category: 'cat-orig-true-rev-false' },
      { id: 's2-9', label: 'Ha egy szám páros, akkor osztható 4-gyel is', category: 'cat-orig-false' },
      { id: 's2-10', label: 'Ha egy szám osztható 3-mal, akkor osztható 9-cel is', category: 'cat-orig-false' },
      { id: 's2-11', label: 'Ha egy szám páratlan, akkor prímszám', category: 'cat-orig-false' },
      { id: 's2-12', label: 'Ha egy szám 5-re végződik, akkor osztható 10-zel', category: 'cat-orig-false' }
    ]
  },
  3: {
    title: '3. Szint: Feltétel Típusa az Oszthatóságban',
    subtitle: 'Sorold be a feltételeket a logikai erejük szerint (szükséges, elégséges vagy mindkettő)!',
    categories: [
      {
        id: 'cat-necessary',
        name: 'Szükséges, de Nem Elégséges',
        description: 'Nélküle nem teljesülhet, de önmagában nem garantálja',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300'
      },
      {
        id: 'cat-sufficient',
        name: 'Elégséges, de Nem Szükséges',
        description: 'Önmagában garantálja a sikert, de másképp is teljesülhet',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300'
      },
      {
        id: 'cat-both',
        name: 'Szükséges ÉS Elégséges',
        description: 'Akkor és csak akkor teljesül (ekvivalens feltétel)',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300'
      }
    ],
    items: [
      { id: 's3-1', label: 'A párosság a 6-tal való oszthatósághoz', category: 'cat-necessary' },
      { id: 's3-2', label: 'A párosság a 4-gyel való oszthatósághoz', category: 'cat-necessary' },
      { id: 's3-3', label: 'A 3-mal való oszthatóság a 9-cel való oszthatósághoz', category: 'cat-necessary' },
      { id: 's3-4', label: 'Az utolsó jegy 0 vagy 5 volta a 15-tel való oszthatósághoz', category: 'cat-necessary' },
      { id: 's3-5', label: 'A 10-zel való oszthatóság az 5-tel való oszthatósághoz', category: 'cat-sufficient' },
      { id: 's3-6', label: 'A 100-zal való oszthatóság a 25-tel való oszthatósághoz', category: 'cat-sufficient' },
      { id: 's3-7', label: 'A 12-vel való oszthatóság a 3-mal való oszthatósághoz', category: 'cat-sufficient' },
      { id: 's3-8', label: 'A 8-cal való oszthatóság a 4-gyel való oszthatósághoz', category: 'cat-sufficient' },
      { id: 's3-9', label: 'A számjegyek összegének 3-as oszthatósága a 3-mal való oszthatósághoz', category: 'cat-both' },
      { id: 's3-10', label: 'A számjegyek összegének 9-es oszthatósága a 9-cel való oszthatósághoz', category: 'cat-both' },
      { id: 's3-11', label: 'Az utolsó számjegy 0 volta a 10-zel való oszthatósághoz', category: 'cat-both' },
      { id: 's3-12', label: 'A 2-vel ÉS 3-mal való oszthatóság a 6-tal való oszthatósághoz', category: 'cat-both' }
    ]
  }
};

export const LogicSorter: React.FC<LogicSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g7-powers-logic',
  topicTitle = '4. Egy kis logika'
}) => {
  const effectiveLevel = (currentLevel || level || 1) as DifficultyLevel;

  return (
    <SorterTemplate
      level={effectiveLevel}
      currentLevel={effectiveLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      levels={sorterLevels}
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="indigo"
    />
  );
};

export default LogicSorter;

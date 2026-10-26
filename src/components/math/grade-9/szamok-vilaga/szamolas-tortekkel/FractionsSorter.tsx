import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface FractionsSorterProps {
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
    title: '1. Szint: Törtkifejezések Értéke 1-hez Képest',
    subtitle: 'Sorold be a kifejezéseket az 1-hez viszonyított nagyságuk szerint!',
    categories: [
      {
        id: 'cat-less-than-1',
        name: 'Kisebb mint 1 (< 1)',
        description: 'Valódi törtek és 1-nél kisebb értékek',
        badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300'
      },
      {
        id: 'cat-equal-1',
        name: 'Pontosan 1 (= 1)',
        description: 'Egész egységnyi értékű kifejezések',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-greater-than-1',
        name: 'Nagyobb mint 1 (> 1)',
        description: 'Áltörtek és 1-nél nagyobb értékek',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      // Kisebb mint 1 (< 1)
      { id: 'fss1-1', label: '1/4 + 1/2', category: 'cat-less-than-1' },
      { id: 'fss1-2', label: '5/6 - 1/3', category: 'cat-less-than-1' },
      { id: 'fss1-3', label: '2/3 · 3/4', category: 'cat-less-than-1' },
      { id: 'fss1-4', label: '1/2 : 3/4', category: 'cat-less-than-1' },
      // Pontosan 1 (= 1)
      { id: 'fss1-5', label: '3/4 + 1/4', category: 'cat-equal-1' },
      { id: 'fss1-6', label: '7/5 - 2/5', category: 'cat-equal-1' },
      { id: 'fss1-7', label: '2/3 · 3/2', category: 'cat-equal-1' },
      { id: 'fss1-8', label: '3/5 : 3/5', category: 'cat-equal-1' },
      // Nagyobb mint 1 (> 1)
      { id: 'fss1-9', label: '2/3 + 3/4', category: 'cat-greater-than-1' },
      { id: 'fss1-10', label: '7/4 - 1/2', category: 'cat-greater-than-1' },
      { id: 'fss1-11', label: '4/3 · 3/2', category: 'cat-greater-than-1' },
      { id: 'fss1-12', label: '3/2 : 2/3', category: 'cat-greater-than-1' }
    ]
  },
  2: {
    title: '2. Szint: Törtkifejezések Előjele',
    subtitle: 'Határozd meg a kifejezések előjelét és besorolását!',
    categories: [
      {
        id: 'cat-positive',
        name: 'Pozitív (> 0)',
        description: 'Szigorúan pozitív értékű törtkifejezések',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-zero',
        name: 'Nulla (= 0)',
        description: 'Értéke pontosan nulla',
        badgeColor: 'bg-slate-100 text-slate-900 border-slate-300'
      },
      {
        id: 'cat-negative',
        name: 'Negatív (< 0)',
        description: 'Szigorúan negatív értékű törtkifejezések',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      // Pozitív (> 0)
      { id: 'fss2-1', label: '(-3) / (-5)', category: 'cat-positive' },
      { id: 'fss2-2', label: '-(-2/7)', category: 'cat-positive' },
      { id: 'fss2-3', label: '(-2/3) · (-3/4)', category: 'cat-positive' },
      { id: 'fss2-4', label: '(-4/5) : (-2/3)', category: 'cat-positive' },
      // Nulla (= 0)
      { id: 'fss2-5', label: '0 / 7', category: 'cat-zero' },
      { id: 'fss2-6', label: '3/5 - 3/5', category: 'cat-zero' },
      { id: 'fss2-7', label: '0 · (-4/9)', category: 'cat-zero' },
      { id: 'fss2-8', label: '0 : (-2/5)', category: 'cat-zero' },
      // Negatív (< 0)
      { id: 'fss2-9', label: '(-3) / 8', category: 'cat-negative' },
      { id: 'fss2-10', label: '-(4/5)', category: 'cat-negative' },
      { id: 'fss2-11', label: '(-2/3) · (3/5)', category: 'cat-negative' },
      { id: 'fss2-12', label: '(-3/7) : (2/5)', category: 'cat-negative' }
    ]
  },
  3: {
    title: '3. Szint: Törtműveleti Állítások Igazságtartalma',
    subtitle: 'Döntsd el, hogy az állítás Mindig Igaz, Mindig Hamis, vagy Feltételtől Függ!',
    categories: [
      {
        id: 'cat-always-true',
        name: 'Mindig Igaz',
        description: 'Minden valós törtre kivétel nélkül érvényes szabály',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-always-false',
        name: 'Mindig Hamis',
        description: 'Matematikai hiba vagy téves műveletvégzés',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-depends',
        name: 'Feltételtől Függ',
        description: 'Nem általános érvényű, csak bizonyos esetekben teljesül',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      // Mindig Igaz
      { id: 'fss3-1', label: 'a/b · b/a = 1  (a, b ≠ 0)', category: 'cat-always-true' },
      { id: 'fss3-2', label: '(-a) / (-b) = a/b', category: 'cat-always-true' },
      { id: 'fss3-3', label: '(a · k) / (b · k) = a/b  (k ≠ 0)', category: 'cat-always-true' },
      { id: 'fss3-4', label: 'a/b : c/d = (a · d) / (b · c)', category: 'cat-always-true' },
      // Mindig Hamis
      { id: 'fss3-5', label: 'a/b + c/d = (a + c) / (b + d)', category: 'cat-always-false' },
      { id: 'fss3-6', label: '(a + b) / a = 1 + b', category: 'cat-always-false' },
      { id: 'fss3-7', label: '(a + c) / (b + c) = a/b', category: 'cat-always-false' },
      { id: 'fss3-8', label: 'a/b - c/d = (a - c) / (b - d)', category: 'cat-always-false' },
      // Feltételtől Függ
      { id: 'fss3-9', label: '(a/b)² < a/b', category: 'cat-depends' },
      { id: 'fss3-10', label: '1 / (a/b) > a/b', category: 'cat-depends' },
      { id: 'fss3-11', label: 'a/b · c/d < a/b', category: 'cat-depends' },
      { id: 'fss3-12', label: 'a/b + c/d > 1', category: 'cat-depends' }
    ]
  }
};

export const FractionsSorter: React.FC<FractionsSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g9-szamok-tortek-sorter',
  topicTitle = '9. Osztály - Számolás Törtekkel Csoportosító'
}) => {
  return (
    <SorterTemplate
      levels={sorterLevels}
      currentLevel={currentLevel || level}
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="cyan"
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
    />
  );
};

export default FractionsSorter;

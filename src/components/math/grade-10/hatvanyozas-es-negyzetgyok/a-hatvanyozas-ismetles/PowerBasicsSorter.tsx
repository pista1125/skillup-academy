import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PowerBasicsSorterProps {
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
    title: 'Előjel szerinti csoportosítás',
    subtitle: 'Döntsd el a kitevő és a zárójelezés alapján, hogy a kifejezés értéke pozitív vagy negatív!',
    categories: [
      {
        id: 'cat-pos',
        name: 'Szigorúan pozitív érték (> 0)',
        description: 'Pozitív alap, vagy negatív alap páros kitevővel zárójelben',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-neg',
        name: 'Szigorúan negatív érték (< 0)',
        description: 'Negatív alap páratlan kitevővel, vagy zárójel nélküli ellentett (-aⁿ)',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 's1-1', content: '(-3)⁴', categoryId: 'cat-pos' },
      { id: 's1-2', content: '-3⁴', categoryId: 'cat-neg' },
      { id: 's1-3', content: '(-2)⁵', categoryId: 'cat-neg' },
      { id: 's1-4', content: '(-5)²', categoryId: 'cat-pos' },
      { id: 's1-5', content: '-2⁶', categoryId: 'cat-neg' },
      { id: 's1-6', content: '(-1)¹⁰⁰', categoryId: 'cat-pos' },
      { id: 's1-7', content: '(-1)⁹⁹', categoryId: 'cat-neg' },
      { id: 's1-8', content: '(-4)³', categoryId: 'cat-neg' },
      { id: 's1-9', content: '(-10)²', categoryId: 'cat-pos' },
      { id: 's1-10', content: '-7²', categoryId: 'cat-neg' }
    ]
  },
  2: {
    title: 'Nagyságrend szerinti csoportosítás',
    subtitle: 'Sorold be a hatványokat a kiszámított számértékük nagyságrendje szerint!',
    categories: [
      {
        id: 'cat-small',
        name: 'Érték < 50',
        description: '50-nél kisebb hatványértékek',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-med',
        name: '50 ≤ Érték ≤ 200',
        description: '50 és 200 közé eső hatványértékek',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-large',
        name: 'Érték > 200',
        description: '200-nál nagyobb hatványértékek',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      { id: 's2-1', content: '2⁵', categoryId: 'cat-small' },
      { id: 's2-2', content: '3³', categoryId: 'cat-small' },
      { id: 's2-3', content: '2⁴', categoryId: 'cat-small' },
      { id: 's2-4', content: '7²', categoryId: 'cat-small' },
      { id: 's2-5', content: '2⁶', categoryId: 'cat-med' },
      { id: 's2-6', content: '3⁴', categoryId: 'cat-med' },
      { id: 's2-7', content: '5³', categoryId: 'cat-med' },
      { id: 's2-8', content: '2⁷', categoryId: 'cat-med' },
      { id: 's2-9', content: '2⁸', categoryId: 'cat-large' },
      { id: 's2-10', content: '3⁵', categoryId: 'cat-large' },
      { id: 's2-11', content: '4⁴', categoryId: 'cat-large' },
      { id: 's2-12', content: '5⁴', categoryId: 'cat-large' }
    ]
  },
  3: {
    title: 'Prímalapra bontás és hatványozás',
    subtitle: 'Határozd meg, hogy az összetett hatványkifejezés melyik prímszám hatványaként írható fel!',
    categories: [
      {
        id: 'cat-p2',
        name: '2 hatványa (2ⁿ)',
        description: 'Összevont alapja 2',
        badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300'
      },
      {
        id: 'cat-p3',
        name: '3 hatványa (3ⁿ)',
        description: 'Összevont alapja 3',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-p5',
        name: '5 hatványa (5ⁿ)',
        description: 'Összevont alapja 5',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      }
    ],
    items: [
      { id: 's3-1', content: '8²', categoryId: 'cat-p2' },
      { id: 's3-2', content: '16³', categoryId: 'cat-p2' },
      { id: 's3-3', content: '4⁵', categoryId: 'cat-p2' },
      { id: 's3-4', content: '32²', categoryId: 'cat-p2' },
      { id: 's3-5', content: '9⁴', categoryId: 'cat-p3' },
      { id: 's3-6', content: '27²', categoryId: 'cat-p3' },
      { id: 's3-7', content: '81²', categoryId: 'cat-p3' },
      { id: 's3-8', content: '25³', categoryId: 'cat-p5' },
      { id: 's3-9', content: '125²', categoryId: 'cat-p5' },
      { id: 's3-10', content: '625', categoryId: 'cat-p5' }
    ]
  }
};

export const PowerBasicsSorter: React.FC<PowerBasicsSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g10-sec-hatvanyozas-ismetles',
  topicTitle = 'A hatványozás (ismétlés) – Csoportosító'
}) => {
  const activeLevel = currentLevel || level;

  return (
    <SorterTemplate
      level={activeLevel}
      currentLevel={activeLevel}
      levelsConfig={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
      badge="10. OSZTÁLY • III. TÉMAKÖR"
    />
  );
};


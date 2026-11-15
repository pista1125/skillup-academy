import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PowersReviewSorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onComplete?: () => void;
  topicId?: string;
  topicTitle?: string;
  [key: string]: any;
}

const POWERS_REVIEW_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Milyen előjelű a hatvány?',
    description: 'Válogasd szét a hatványokat előjelük szerint!',
    categories: [
      {
        id: 'pos',
        name: 'Pozitív',
        color: 'emerald'
      },
      {
        id: 'neg',
        name: 'Negatív',
        color: 'rose'
      },
      {
        id: 'undef',
        name: 'Nincs értelmezve',
        color: 'slate'
      }
    ],
    items: [
      {
        id: 'prvs1',
        text: '(−3)⁴',
        categoryId: 'pos'
      },
      {
        id: 'prvs2',
        text: '(−2)⁻²',
        categoryId: 'pos'
      },
      {
        id: 'prvs3',
        text: '5⁻³',
        categoryId: 'pos'
      },
      {
        id: 'prvs4',
        text: '(−3)⁷⁵',
        categoryId: 'neg'
      },
      {
        id: 'prvs5',
        text: '−5²',
        categoryId: 'neg'
      },
      {
        id: 'prvs6',
        text: '(−3)⁻⁷⁵',
        categoryId: 'neg'
      },
      {
        id: 'prvs7',
        text: '0⁰',
        categoryId: 'undef'
      },
      {
        id: 'prvs8',
        text: '0⁻²',
        categoryId: 'undef'
      },
      {
        id: 'prvs9',
        text: '0⁻¹',
        categoryId: 'undef'
      }
    ]
  },
  {
    level: 2,
    title: '2. szint: Hogyan viszonyul 1-hez?',
    description: 'Döntsd el, hogy a hatvány értéke 1-nél kisebb pozitív szám, pontosan 1, vagy 1-nél nagyobb!',
    categories: [
      {
        id: 'lt',
        name: '0 és 1 közötti',
        color: 'sky'
      },
      {
        id: 'eq',
        name: 'Pontosan 1',
        color: 'violet'
      },
      {
        id: 'gt',
        name: '1-nél nagyobb',
        color: 'amber'
      }
    ],
    items: [
      {
        id: 'prvs10',
        text: '2⁻³',
        categoryId: 'lt'
      },
      {
        id: 'prvs11',
        text: '(1/2)⁴',
        categoryId: 'lt'
      },
      {
        id: 'prvs12',
        text: '3⁻²',
        categoryId: 'lt'
      },
      {
        id: 'prvs13',
        text: '7⁰',
        categoryId: 'eq'
      },
      {
        id: 'prvs14',
        text: '(−1)¹⁰',
        categoryId: 'eq'
      },
      {
        id: 'prvs15',
        text: '(2/5)⁰',
        categoryId: 'eq'
      },
      {
        id: 'prvs16',
        text: '(1/2)⁻³',
        categoryId: 'gt'
      },
      {
        id: 'prvs17',
        text: '2¹⁰',
        categoryId: 'gt'
      },
      {
        id: 'prvs18',
        text: '(0,5)⁻¹',
        categoryId: 'gt'
      }
    ]
  },
  {
    level: 3,
    title: '3. szint: Igaz vagy hamis?',
    description: 'Válogasd szét az állításokat!',
    categories: [
      {
        id: 'true',
        name: 'Mindig igaz',
        color: 'emerald'
      },
      {
        id: 'false',
        name: 'Hamis',
        color: 'rose'
      },
      {
        id: 'depends',
        name: 'A számoktól függ',
        color: 'amber'
      }
    ],
    items: [
      {
        id: 'prvs19',
        text: 'aᵐ · aⁿ = aᵐ⁺ⁿ (a ≠ 0, m, n egész)',
        categoryId: 'true'
      },
      {
        id: 'prvs20',
        text: 'Minden negatív szám negyedik hatványa nagyobb a köbénél',
        categoryId: 'true'
      },
      {
        id: 'prvs21',
        text: '2²ᵏ = 4ᵏ minden egész k-ra',
        categoryId: 'true'
      },
      {
        id: 'prvs22',
        text: '(a + b)² = a² + b² minden a, b-re',
        categoryId: 'false'
      },
      {
        id: 'prvs23',
        text: '2⁻³ negatív szám',
        categoryId: 'false'
      },
      {
        id: 'prvs24',
        text: '(a³)² = a⁹',
        categoryId: 'false'
      },
      {
        id: 'prvs25',
        text: 'a² > a³',
        categoryId: 'depends'
      },
      {
        id: 'prvs26',
        text: 'aⁿ pozitív (a ≠ 0, n egész)',
        categoryId: 'depends'
      },
      {
        id: 'prvs27',
        text: '(−a)ⁿ = aⁿ',
        categoryId: 'depends'
      }
    ]
  }
];

const POWERS_REVIEW_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: POWERS_REVIEW_SORTER_LEVELS_LIST[0],
  2: POWERS_REVIEW_SORTER_LEVELS_LIST[1],
  3: POWERS_REVIEW_SORTER_LEVELS_LIST[2]
};

export const PowersReviewSorter: React.FC<PowersReviewSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-exp-hatvanyozas-ismetles-sorter',
  topicTitle = '1. Hatványozás – ismétlés – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="hatvany-gyok-logaritmus"
      topicId={topicId}
      subtopicId="hatvanyozas-ismetles"
      title={topicTitle}
      subtitle="Rendszerezd a hatványokat előjel és nagyság szerint, és döntsd el, mely állítások igazak!"
      levels={POWERS_REVIEW_SORTER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onComplete={onComplete}
      {...rest}
    />
  );
};

export default PowersReviewSorter;

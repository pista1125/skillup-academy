import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PowerRootPracticeSorterProps {
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

const POWER_ROOT_PRACTICE_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Milyen előjelű?',
    description: 'Számold ki fejben, és döntsd el, pozitív, negatív vagy nulla az érték!',
    categories: [
      { id: 'pos', name: 'Pozitív', color: 'emerald' },
      { id: 'neg', name: 'Negatív', color: 'rose' },
      { id: 'zero', name: 'Nulla', color: 'slate' }
    ],
    items: [
      { id: 'prps1', text: '3⁻²', categoryId: 'pos' },
      { id: 'prps2', text: '16⁻³⁄⁴', categoryId: 'pos' },
      { id: 'prps3', text: '(−3)⁰', categoryId: 'pos' },
      { id: 'prps4', text: '−3⁰', categoryId: 'neg' },
      { id: 'prps5', text: '∛(−125/8)', categoryId: 'neg' },
      { id: 'prps6', text: '(−2)³', categoryId: 'neg' },
      { id: 'prps7', text: 'π⁰ − 2⁴ · 4⁻²', categoryId: 'zero' },
      { id: 'prps8', text: '0¹⁄¹⁰', categoryId: 'zero' },
      { id: 'prps9', text: '3⁵ · 3⁻⁵ − 1', categoryId: 'zero' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Melyik 2-hatvánnyal egyenlő?',
    description: 'Írd át a kifejezéseket 2 hatványává, és sorold be őket!',
    categories: [
      { id: 'm3', name: '= 2⁻³', color: 'violet' },
      { id: 'p3', name: '= 2³', color: 'amber' },
      { id: 'half', name: '= 2^(1/2)', color: 'teal' }
    ],
    items: [
      { id: 'prps10', text: '1/8', categoryId: 'm3' },
      { id: 'prps11', text: '4^1,5 · 8⁻²', categoryId: 'm3' },
      { id: 'prps12', text: '16⁻³⁄⁴', categoryId: 'm3' },
      { id: 'prps13', text: '8', categoryId: 'p3' },
      { id: 'prps14', text: '4^1,5', categoryId: 'p3' },
      { id: 'prps15', text: '16^(3/4)', categoryId: 'p3' },
      { id: 'prps16', text: '√2', categoryId: 'half' },
      { id: 'prps17', text: '4^(1/4)', categoryId: 'half' },
      { id: 'prps18', text: '8^(1/6)', categoryId: 'half' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mit jelent a kitevő szerkezete?',
    description: 'Melyik szabályt használja az átalakítás?',
    categories: [
      { id: 'sum', name: 'Összeg a kitevőben → szorzat', color: 'emerald' },
      { id: 'diff', name: 'Különbség a kitevőben → hányados', color: 'blue' },
      { id: 'mult', name: 'Szorzó a kitevőben → hatvány', color: 'purple' }
    ],
    items: [
      { id: 'prps19', text: '5ᵏ⁺¹ = 5ᵏ · 5', categoryId: 'sum' },
      { id: 'prps20', text: '7ᵏ⁺ᵐ = 7ᵏ · 7ᵐ', categoryId: 'sum' },
      { id: 'prps21', text: '10ᵏ⁺³ = 10ᵏ · 10³', categoryId: 'sum' },
      { id: 'prps22', text: '7ᵏ⁻ᵐ = 7ᵏ : 7ᵐ', categoryId: 'diff' },
      { id: 'prps23', text: '5ᵏ⁻² = 5ᵏ : 25', categoryId: 'diff' },
      { id: 'prps24', text: '10ᵏ⁻¹ = 10ᵏ : 10', categoryId: 'diff' },
      { id: 'prps25', text: '5²ᵏ = (5ᵏ)²', categoryId: 'mult' },
      { id: 'prps26', text: '10⁴ᵏ = (10ᵏ)⁴', categoryId: 'mult' },
      { id: 'prps27', text: '7³ᵏ = (7ᵏ)³', categoryId: 'mult' }
    ]
  }
];

const POWER_ROOT_PRACTICE_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: POWER_ROOT_PRACTICE_SORTER_LEVELS_LIST[0],
  2: POWER_ROOT_PRACTICE_SORTER_LEVELS_LIST[1],
  3: POWER_ROOT_PRACTICE_SORTER_LEVELS_LIST[2]
};

export const PowerRootPracticeSorter: React.FC<PowerRootPracticeSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-exp-hatvany-gyok-gyakorlas-sorter',
  topicTitle = '5. Gyakorlás – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="hatvany-gyok-logaritmus"
      topicId={topicId}
      subtopicId="gyakorlas-hatvany-gyok"
      title={topicTitle}
      subtitle="Rendszerezd a hatványos és gyökös kifejezéseket: előjel, 2-hatvány alak és a kitevő szerkezete szerint!"
      levels={POWER_ROOT_PRACTICE_SORTER_LEVELS}
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

export default PowerRootPracticeSorter;

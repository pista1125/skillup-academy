import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface OrderOfOps10000SorterProps {
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

const ORDER10K_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mivel kezdünk?',
    description: 'Melyik szabály szerint választod ki az első műveletet?',
    categories: [
      { id: 'par', name: 'A zárójellel', color: 'purple' },
      { id: 'mul', name: 'A szorzással vagy osztással', color: 'blue' },
      { id: 'ltr', name: 'Balról az első művelettel (csak egyféle műveletek)', color: 'amber' }
    ],
    items: [
      { id: 'oo10s1', text: '(4264 − 1316) · 3', categoryId: 'par' },
      { id: 'oo10s2', text: '(1386 + 2634) : 6', categoryId: 'par' },
      { id: 'oo10s3', text: '9000 : (7953 − 7053)', categoryId: 'par' },
      { id: 'oo10s4', text: '4264 − 1316 · 3', categoryId: 'mul' },
      { id: 'oo10s5', text: '1386 + 2634 : 6', categoryId: 'mul' },
      { id: 'oo10s6', text: '3450 + 1456 · 4', categoryId: 'mul' },
      { id: 'oo10s7', text: '9464 − 3518 + 1325', categoryId: 'ltr' },
      { id: 'oo10s8', text: '5 · 1614 : 3', categoryId: 'ltr' },
      { id: 'oo10s9', text: '345 : 3 · 8 · 5 : 100', categoryId: 'ltr' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mekkora az eredmény?',
    description: 'Számold ki a kidobós csapatok feladatait, és tedd a megfelelő csoportba!',
    categories: [
      { id: 'lt1000', name: '1000-nél kisebb', color: 'teal' },
      { id: 'mid', name: '1000 és 5000 között', color: 'rose' },
      { id: 'gt5000', name: '5000-nél nagyobb', color: 'emerald' }
    ],
    items: [
      { id: 'oo10s10', text: '8037 : 3 − 1706', categoryId: 'lt1000' },
      { id: 'oo10s11', text: '10 000 − 3127 · 3', categoryId: 'lt1000' },
      { id: 'oo10s12', text: '(7464 − 2268) : 6', categoryId: 'lt1000' },
      { id: 'oo10s13', text: '10 000 − 2096 · 4', categoryId: 'mid' },
      { id: 'oo10s14', text: '1998 · 5 − 6218', categoryId: 'mid' },
      { id: 'oo10s15', text: '8624 : 4 + 1284', categoryId: 'mid' },
      { id: 'oo10s16', text: '3498 · 2 + 2346', categoryId: 'gt5000' },
      { id: 'oo10s17', text: '(5479 − 3992) · 6', categoryId: 'gt5000' },
      { id: 'oo10s18', text: '5147 + 6244 : 2', categoryId: 'gt5000' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mit csinál a zárójel?',
    description: 'Hasonlítsd össze a zárójeles műveletsort a zárójel nélküli párjával! Ugyanannyi, nagyobb vagy kisebb lesz az eredmény?',
    categories: [
      { id: 'same', name: 'Ugyanannyi marad', color: 'blue' },
      { id: 'more', name: 'Zárójellel nagyobb', color: 'emerald' },
      { id: 'less', name: 'Zárójellel kisebb', color: 'rose' }
    ],
    items: [
      { id: 'oo10s19', text: '(3 · 450) + 1450', categoryId: 'same' },
      { id: 'oo10s20', text: '2550 : 2 + (3450 : 2)', categoryId: 'same' },
      { id: 'oo10s21', text: '(1657 · 4) + 2872', categoryId: 'same' },
      { id: 'oo10s22', text: '3 · (450 + 1450)', categoryId: 'more' },
      { id: 'oo10s23', text: '(4264 − 1316) · 3', categoryId: 'more' },
      { id: 'oo10s24', text: '(1312 + 2879) · 2', categoryId: 'more' },
      { id: 'oo10s25', text: '(1386 + 2634) : 6', categoryId: 'less' },
      { id: 'oo10s26', text: '(6540 + 3120) : 3', categoryId: 'less' },
      { id: 'oo10s27', text: '9464 − (3518 + 1325)', categoryId: 'less' }
    ]
  }
];

const ORDER10K_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: ORDER10K_SORTER_LEVELS_LIST[0],
  2: ORDER10K_SORTER_LEVELS_LIST[1],
  3: ORDER10K_SORTER_LEVELS_LIST[2]
};

export const OrderOfOps10000Sorter: React.FC<OrderOfOps10000SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-wops-sorrend-sorter',
  topicTitle = '7. A műveletek sorrendje – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="irasbeli-muveletek-10000-ig"
      topicId={topicId}
      subtopicId="a-muveletek-sorrendje"
      title={topicTitle}
      subtitle="Csoportosítsd a műveletsorokat a sorrend, az eredmény és a zárójel szerepe szerint!"
      levels={ORDER10K_SORTER_LEVELS}
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

export default OrderOfOps10000Sorter;

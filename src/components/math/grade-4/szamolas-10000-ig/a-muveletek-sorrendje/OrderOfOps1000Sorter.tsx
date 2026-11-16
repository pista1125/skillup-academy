import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface OrderOfOps1000SorterProps {
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

const ORDER_OPS_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mivel kezdünk?',
    description: 'Döntsd el, melyik szabály szerint választod ki az első műveletet!',
    categories: [
      { id: 'par', name: 'A zárójellel', color: 'purple' },
      { id: 'mul', name: 'A szorzással vagy osztással', color: 'blue' },
      { id: 'ltr', name: 'Balról az első művelettel (csak egyféle műveletek)', color: 'amber' }
    ],
    items: [
      { id: 'oo1s1', text: '1000 : (350 − 250)', categoryId: 'par' },
      { id: 'oo1s2', text: '70 · (9 − 8) · 4', categoryId: 'par' },
      { id: 'oo1s3', text: '7 · (724 − 654)', categoryId: 'par' },
      { id: 'oo1s4', text: '500 + 4 · 90', categoryId: 'mul' },
      { id: 'oo1s5', text: '970 − 324 · 2', categoryId: 'mul' },
      { id: 'oo1s6', text: '480 : 10 + 320', categoryId: 'mul' },
      { id: 'oo1s7', text: '350 − 190 + 680 + 160', categoryId: 'ltr' },
      { id: 'oo1s8', text: '60 · 5 : 100 · 80', categoryId: 'ltr' },
      { id: 'oo1s9', text: '800 : 8 : 4', categoryId: 'ltr' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mekkora az eredmény?',
    description: 'Számold ki, és tedd a megfelelő csoportba!',
    categories: [
      { id: 'lt300', name: '300-nál kisebb', color: 'teal' },
      { id: 'mid', name: '300 és 600 között', color: 'rose' },
      { id: 'gt600', name: '600-nál nagyobb', color: 'emerald' }
    ],
    items: [
      { id: 'oo1s10', text: '255 · 3 − 535', categoryId: 'lt300' },
      { id: 'oo1s11', text: '60 · 5 : 100 · 80', categoryId: 'lt300' },
      { id: 'oo1s12', text: '70 · (9 − 8) · 4', categoryId: 'lt300' },
      { id: 'oo1s13', text: '970 − 324 · 2', categoryId: 'mid' },
      { id: 'oo1s14', text: '180 + 8 · 42 − 9 · 11', categoryId: 'mid' },
      { id: 'oo1s15', text: '(3 · 86) + (4 · 66)', categoryId: 'mid' },
      { id: 'oo1s16', text: '(142 + 108) · 3', categoryId: 'gt600' },
      { id: 'oo1s17', text: '970 − (688 − 538)', categoryId: 'gt600' },
      { id: 'oo1s18', text: '500 + 4 · 90', categoryId: 'gt600' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mit csinál a zárójel?',
    description: 'Hasonlítsd össze a zárójeles műveletsort a zárójel nélküli párjával! Ugyanannyi, nagyobb vagy kisebb lesz az eredmény?',
    categories: [
      { id: 'same', name: 'Ugyanannyi marad', color: 'blue' },
      { id: 'more', name: 'Nagyobb lesz', color: 'emerald' },
      { id: 'less', name: 'Kisebb lesz', color: 'rose' }
    ],
    items: [
      { id: 'oo1s19', text: '(3 · 86) + (4 · 66)', categoryId: 'same' },
      { id: 'oo1s20', text: '100 + (20 · 3)', categoryId: 'same' },
      { id: 'oo1s21', text: '(50 · 2) − 30', categoryId: 'same' },
      { id: 'oo1s22', text: '3 · (139 + 117)', categoryId: 'more' },
      { id: 'oo1s23', text: '(423 − 144) · 2', categoryId: 'more' },
      { id: 'oo1s24', text: '(142 + 108) · 3', categoryId: 'more' },
      { id: 'oo1s25', text: '1000 − (678 + 127)', categoryId: 'less' },
      { id: 'oo1s26', text: '7 · (724 − 654)', categoryId: 'less' },
      { id: 'oo1s27', text: '500 − (200 + 100)', categoryId: 'less' }
    ]
  }
];

const ORDER_OPS_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: ORDER_OPS_SORTER_LEVELS_LIST[0],
  2: ORDER_OPS_SORTER_LEVELS_LIST[1],
  3: ORDER_OPS_SORTER_LEVELS_LIST[2]
};

export const OrderOfOps1000Sorter: React.FC<OrderOfOps1000SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-count-sorrend-sorter',
  topicTitle = '4. A műveletek sorrendje – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="szamolas-10000-ig"
      topicId={topicId}
      subtopicId="a-muveletek-sorrendje"
      title={topicTitle}
      subtitle="Csoportosítsd a műveletsorokat a sorrend, az eredmény és a zárójel szerepe szerint!"
      levels={ORDER_OPS_SORTER_LEVELS}
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

export default OrderOfOps1000Sorter;

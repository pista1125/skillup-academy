import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface OrderOps100G3SorterProps {
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

const ORDER_OPS_100_G3_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Melyik az első lépés?',
    description: 'Melyik műveletet végzed el először?',
    categories: [
      { id: 'mul', name: 'Először: szorzás (·)', color: 'orange' },
      { id: 'div', name: 'Először: osztás (:)', color: 'purple' },
      { id: 'sub', name: 'Először: kivonás (−)', color: 'sky' }
    ],
    items: [
      { id: 'oo100s1', text: '7 + 4 · 5', categoryId: 'mul' },
      { id: 'oo100s2', text: '30 − 3 · 6', categoryId: 'mul' },
      { id: 'oo100s3', text: '2 · 9 + 40', categoryId: 'mul' },
      { id: 'oo100s4', text: '20 − 12 : 4', categoryId: 'div' },
      { id: 'oo100s5', text: '45 + 18 : 9', categoryId: 'div' },
      { id: 'oo100s6', text: '40 : 8 · 3', categoryId: 'div' },
      { id: 'oo100s7', text: '60 − 18 + 7', categoryId: 'sub' },
      { id: 'oo100s8', text: '50 − 20 − 10', categoryId: 'sub' },
      { id: 'oo100s9', text: '90 − 40 + 5', categoryId: 'sub' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mennyi az eredmény?',
    description: 'Számolj jó sorrendben, és tedd a műveletsort a helyére!',
    categories: [
      { id: 'r24', name: 'Eredménye 24', color: 'emerald' },
      { id: 'r30', name: 'Eredménye 30', color: 'amber' },
      { id: 'r36', name: 'Eredménye 36', color: 'rose' }
    ],
    items: [
      { id: 'oo100s10', text: '4 + 4 · 5', categoryId: 'r24' },
      { id: 'oo100s11', text: '6 · 3 + 6', categoryId: 'r24' },
      { id: 'oo100s12', text: '30 − 18 : 3', categoryId: 'r24' },
      { id: 'oo100s13', text: '5 · 4 + 10', categoryId: 'r30' },
      { id: 'oo100s14', text: '40 − 2 · 5', categoryId: 'r30' },
      { id: 'oo100s15', text: '3 · 8 + 6', categoryId: 'r30' },
      { id: 'oo100s16', text: '6 + 6 · 5', categoryId: 'r36' },
      { id: 'oo100s17', text: '40 − 8 : 2', categoryId: 'r36' },
      { id: 'oo100s18', text: '9 · 3 + 9', categoryId: 'r36' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hol a hiba?',
    description: 'Jól számolt, rossz sorrendben számolt, vagy elszámolta?',
    categories: [
      { id: 'ok', name: 'Jól számolt', color: 'emerald' },
      { id: 'order', name: 'Rossz sorrendben számolt', color: 'rose' },
      { id: 'calc', name: 'Elszámolta', color: 'slate' }
    ],
    items: [
      { id: 'oo100s19', text: '4 + 2 · 3 = 10', categoryId: 'ok' },
      { id: 'oo100s20', text: '20 − 8 : 2 = 16', categoryId: 'ok' },
      { id: 'oo100s21', text: '6 · 5 − 4 = 26', categoryId: 'ok' },
      { id: 'oo100s22', text: '4 + 2 · 3 = 18', categoryId: 'order' },
      { id: 'oo100s23', text: '20 − 8 : 2 = 6', categoryId: 'order' },
      { id: 'oo100s24', text: '10 + 5 · 2 = 30', categoryId: 'order' },
      { id: 'oo100s25', text: '6 · 5 − 4 = 24', categoryId: 'calc' },
      { id: 'oo100s26', text: '10 + 5 · 2 = 22', categoryId: 'calc' },
      { id: 'oo100s27', text: '4 + 2 · 3 = 11', categoryId: 'calc' }
    ]
  }
];

const ORDER_OPS_100_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: ORDER_OPS_100_G3_SORTER_LEVELS_LIST[0],
  2: ORDER_OPS_100_G3_SORTER_LEVELS_LIST[1],
  3: ORDER_OPS_100_G3_SORTER_LEVELS_LIST[2]
};

export const OrderOps100G3Sorter: React.FC<OrderOps100G3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-c100-sorrend-sorter',
  topicTitle = '6. A műveletek sorrendje – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="szamolas-100-ig"
      topicId={topicId}
      subtopicId="a-muveletek-sorrendje"
      title={topicTitle}
      subtitle="Válogasd szét a műveletsorokat!"
      levels={ORDER_OPS_100_G3_SORTER_LEVELS}
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

export default OrderOps100G3Sorter;

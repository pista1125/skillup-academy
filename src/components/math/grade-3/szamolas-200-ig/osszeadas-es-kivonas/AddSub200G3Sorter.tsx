import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { SortBlocks, SortCoins, SortShop } from './AddSub200G3CardFigures';

interface AddSub200G3SorterProps {
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

const ADD_SUB_200_G3_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Kisebb, egyenlő vagy nagyobb?',
    description: 'Mennyi ez? Hasonlítsd a 100-hoz! (rúd = 10, lap = 100)',
    categories: [
      { id: 'kisebb', name: 'Kisebb, mint 100', color: 'sky' },
      { id: 'egyenlo', name: 'Pontosan 100', color: 'emerald' },
      { id: 'nagyobb', name: 'Nagyobb, mint 100', color: 'rose' }
    ],
    items: [
      { id: 'as200s1', text: '', figure: <SortBlocks sz={0} t={8} />, categoryId: 'kisebb' },
      { id: 'as200s2', text: '', figure: <SortBlocks sz={0} t={9} />, categoryId: 'kisebb' },
      { id: 'as200s3', text: '40 + 50', categoryId: 'kisebb' },
      { id: 'as200s4', text: '', figure: <SortBlocks sz={1} t={0} />, categoryId: 'egyenlo' },
      { id: 'as200s5', text: '160 − 60', categoryId: 'egyenlo' },
      { id: 'as200s6', text: '70 + 30', categoryId: 'egyenlo' },
      { id: 'as200s7', text: '', figure: <SortBlocks sz={1} t={2} />, categoryId: 'nagyobb' },
      { id: 'as200s8', text: '120 + 30', categoryId: 'nagyobb' },
      { id: 'as200s9', text: '200 − 80', categoryId: 'nagyobb' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Melyik az eredmény?',
    description: 'Számold össze a pénzt, vagy végezd el a műveletet!',
    categories: [
      { id: 'e110', name: '110', color: 'amber' },
      { id: 'e120', name: '120', color: 'purple' },
      { id: 'e130', name: '130', color: 'teal' }
    ],
    items: [
      { id: 'as200s10', text: '', figure: <SortCoins coins={[100, 10]} />, categoryId: 'e110' },
      { id: 'as200s11', text: '', figure: <SortCoins coins={[50, 50, 10]} />, categoryId: 'e110' },
      { id: 'as200s12', text: '60 + 50', categoryId: 'e110' },
      { id: 'as200s13', text: '', figure: <SortCoins coins={[50, 50, 20]} />, categoryId: 'e120' },
      { id: 'as200s14', text: '70 + 50', categoryId: 'e120' },
      { id: 'as200s15', text: '200 − 80', categoryId: 'e120' },
      { id: 'as200s16', text: '', figure: <SortCoins coins={[100, 20, 10]} />, categoryId: 'e130' },
      { id: 'as200s17', text: '80 + 50', categoryId: 'e130' },
      { id: 'as200s18', text: '190 − 60', categoryId: 'e130' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mennyi pénz marad?',
    description: 'Fent a pénzed, lent az ár (Ft). Mennyi marad?',
    categories: [
      { id: 'm30', name: 'Marad 30 Ft', color: 'sky' },
      { id: 'm50', name: 'Marad 50 Ft', color: 'emerald' },
      { id: 'm70', name: 'Marad 70 Ft', color: 'rose' }
    ],
    items: [
      { id: 'as200s19', text: '', figure: <SortShop coins={[200]} price={170} />, categoryId: 'm30' },
      { id: 'as200s20', text: '', figure: <SortShop coins={[100, 50]} price={120} />, categoryId: 'm30' },
      { id: 'as200s21', text: '100 Ft − 70 Ft', categoryId: 'm30' },
      { id: 'as200s22', text: '', figure: <SortShop coins={[200]} price={150} />, categoryId: 'm50' },
      { id: 'as200s23', text: '', figure: <SortShop coins={[100, 20]} price={70} />, categoryId: 'm50' },
      { id: 'as200s24', text: '140 Ft − 90 Ft', categoryId: 'm50' },
      { id: 'as200s25', text: '', figure: <SortShop coins={[200]} price={130} />, categoryId: 'm70' },
      { id: 'as200s26', text: '', figure: <SortShop coins={[100, 50]} price={80} />, categoryId: 'm70' },
      { id: 'as200s27', text: '160 Ft − 90 Ft', categoryId: 'm70' }
    ]
  }
];

export const ADD_SUB_200_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: ADD_SUB_200_G3_SORTER_LEVELS_LIST[0],
  2: ADD_SUB_200_G3_SORTER_LEVELS_LIST[1],
  3: ADD_SUB_200_G3_SORTER_LEVELS_LIST[2]
};

export const AddSub200G3Sorter: React.FC<AddSub200G3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-c200-osszeadas-sorter',
  topicTitle = '4. Összeadás és kivonás – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="szamolas-200-ig"
      topicId={topicId}
      subtopicId="osszeadas-es-kivonas"
      title={topicTitle}
      subtitle="Számold ki, és válogasd szét!"
      levels={ADD_SUB_200_G3_SORTER_LEVELS}
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

export default AddSub200G3Sorter;

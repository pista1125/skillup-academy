import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface AddSub1000SorterProps {
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

const ADDSUB_1000_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Kisebb, egyenlő vagy nagyobb?',
    description: 'Számold ki fejben! Az eredmény kisebb 500-nál, pontosan 500, vagy nagyobb 500-nál?',
    categories: [
      { id: 'lt', name: 'Kisebb, mint 500', color: 'blue' },
      { id: 'eq', name: 'Pontosan 500', color: 'emerald' },
      { id: 'gt', name: 'Nagyobb, mint 500', color: 'amber' }
    ],
    items: [
      { id: 'as1s1', text: '990 − 600', categoryId: 'lt' },
      { id: 'as1s2', text: '720 − 290', categoryId: 'lt' },
      { id: 'as1s3', text: '350 + 140', categoryId: 'lt' },
      { id: 'as1s4', text: '200 + 300', categoryId: 'eq' },
      { id: 'as1s5', text: '250 + 250', categoryId: 'eq' },
      { id: 'as1s6', text: '1000 − 500', categoryId: 'eq' },
      { id: 'as1s7', text: '180 + 720', categoryId: 'gt' },
      { id: 'as1s8', text: '650 + 330', categoryId: 'gt' },
      { id: 'as1s9', text: '400 + 320', categoryId: 'gt' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Hányszor kell átvinni?',
    description: 'Írásbeli összeadásnál hány helyi értéken keletkezik átvitel (maradék)?',
    categories: [
      { id: 'c0', name: 'Nincs átvitel', color: 'teal' },
      { id: 'c1', name: '1 átvitel', color: 'purple' },
      { id: 'c2', name: '2 átvitel', color: 'rose' }
    ],
    items: [
      { id: 'as1s10', text: '352 + 430', categoryId: 'c0' },
      { id: 'as1s11', text: '213 + 564', categoryId: 'c0' },
      { id: 'as1s12', text: '401 + 398', categoryId: 'c0' },
      { id: 'as1s13', text: '526 + 144', categoryId: 'c1' },
      { id: 'as1s14', text: '151 + 657', categoryId: 'c1' },
      { id: 'as1s15', text: '541 + 319', categoryId: 'c1' },
      { id: 'as1s16', text: '346 + 294', categoryId: 'c2' },
      { id: 'as1s17', text: '286 + 268', categoryId: 'c2' },
      { id: 'as1s18', text: '448 + 263', categoryId: 'c2' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Becslés százasra kerekítve',
    description: 'Kerekítsd százasra a kisebbítendőt és a kivonandót, és becsüld meg a különbséget!',
    categories: [
      { id: 'b400', name: 'B: 400', color: 'blue' },
      { id: 'b500', name: 'B: 500', color: 'amber' },
      { id: 'b600', name: 'B: 600', color: 'emerald' }
    ],
    items: [
      { id: 'as1s19', text: '931 − 456', categoryId: 'b400' },
      { id: 'as1s20', text: '658 − 349', categoryId: 'b400' },
      { id: 'as1s21', text: '666 − 347', categoryId: 'b400' },
      { id: 'as1s22', text: '874 − 356', categoryId: 'b500' },
      { id: 'as1s23', text: '756 − 287', categoryId: 'b500' },
      { id: 'as1s24', text: '693 − 216', categoryId: 'b500' },
      { id: 'as1s25', text: '874 − 343', categoryId: 'b600' },
      { id: 'as1s26', text: '854 − 328', categoryId: 'b600' },
      { id: 'as1s27', text: '844 − 233', categoryId: 'b600' }
    ]
  }
];

const ADDSUB_1000_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: ADDSUB_1000_SORTER_LEVELS_LIST[0],
  2: ADDSUB_1000_SORTER_LEVELS_LIST[1],
  3: ADDSUB_1000_SORTER_LEVELS_LIST[2]
};

export const AddSub1000Sorter: React.FC<AddSub1000SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-count-osszeadas-1000-sorter',
  topicTitle = '2. Összeadás és kivonás 1000-ig – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="szamolas-10000-ig"
      topicId={topicId}
      subtopicId="osszeadas-kivonas-1000-ig"
      title={topicTitle}
      subtitle="Csoportosítsd a műveleteket eredmény, átvitel és becslés szerint!"
      levels={ADDSUB_1000_SORTER_LEVELS}
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

export default AddSub1000Sorter;

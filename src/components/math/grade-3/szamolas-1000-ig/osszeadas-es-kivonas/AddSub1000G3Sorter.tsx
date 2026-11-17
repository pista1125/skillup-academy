import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { SortCoins, SortJump, SortTags } from './AddSub1000G3CardFigures';

interface AddSub1000G3SorterProps {
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

const LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Kevesebb, pont 500, több?',
    description: 'Add össze! Az eredmény kevesebb, mint 500, pont 500, vagy több?',
    categories: [
      { id: 'lt', name: 'Kevesebb, mint 500', color: 'sky' },
      { id: 'eq', name: 'Pontosan 500', color: 'emerald' },
      { id: 'gt', name: 'Több, mint 500', color: 'orange' }
    ],
    items: [
      { id: 'as1000s1', text: '', figure: <SortCoins coins={[200, 100, 100]} />, categoryId: 'lt' },
      { id: 'as1000s2', text: '', figure: <SortCoins coins={[200, 200, 50]} />, categoryId: 'lt' },
      { id: 'as1000s3', text: '320 + 170', categoryId: 'lt' },
      { id: 'as1000s4', text: '', figure: <SortCoins coins={[200, 200, 100]} />, categoryId: 'eq' },
      { id: 'as1000s5', text: '', figure: <SortCoins coins={[200, 100, 100, 100]} />, categoryId: 'eq' },
      { id: 'as1000s6', text: '260 + 240', categoryId: 'eq' },
      { id: 'as1000s7', text: '', figure: <SortCoins coins={[200, 200, 200]} />, categoryId: 'gt' },
      { id: 'as1000s8', text: '', figure: <SortCoins coins={[200, 200, 100, 50]} />, categoryId: 'gt' },
      { id: 'as1000s9', text: '380 + 150', categoryId: 'gt' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Hová érkezel?',
    description: 'Ugorj a számegyenesen! Melyik kerek százashoz érsz?',
    categories: [
      { id: 'r600', name: '= 600', color: 'rose' },
      { id: 'r700', name: '= 700', color: 'sky' },
      { id: 'r800', name: '= 800', color: 'amber' }
    ],
    items: [
      { id: 'as1000s10', text: '', figure: <SortJump from={540} by={60} />, categoryId: 'r600' },
      { id: 'as1000s11', text: '', figure: <SortJump from={680} by={-80} />, categoryId: 'r600' },
      { id: 'as1000s12', text: '1000 − 400', categoryId: 'r600' },
      { id: 'as1000s13', text: '', figure: <SortJump from={650} by={50} />, categoryId: 'r700' },
      { id: 'as1000s14', text: '', figure: <SortJump from={760} by={-60} />, categoryId: 'r700' },
      { id: 'as1000s15', text: '350 + 350', categoryId: 'r700' },
      { id: 'as1000s16', text: '', figure: <SortJump from={730} by={70} />, categoryId: 'r800' },
      { id: 'as1000s17', text: '', figure: <SortJump from={850} by={-50} />, categoryId: 'r800' },
      { id: 'as1000s18', text: '1000 − 200', categoryId: 'r800' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mennyi marad 1000 Ft-ból?',
    description: 'Ennyit fizetsz. Mennyi marad az 1000 Ft-ból?',
    categories: [
      { id: 'm100', name: 'Marad 100 Ft', color: 'teal' },
      { id: 'm200', name: 'Marad 200 Ft', color: 'purple' },
      { id: 'm300', name: 'Marad 300 Ft', color: 'orange' }
    ],
    items: [
      { id: 'as1000s19', text: '', figure: <SortTags prices={[900]} />, categoryId: 'm100' },
      { id: 'as1000s20', text: '', figure: <SortTags prices={[450, 450]} />, categoryId: 'm100' },
      { id: 'as1000s21', text: '1000 − 600 − 300', categoryId: 'm100' },
      { id: 'as1000s22', text: '', figure: <SortTags prices={[800]} />, categoryId: 'm200' },
      { id: 'as1000s23', text: '', figure: <SortTags prices={[530, 270]} />, categoryId: 'm200' },
      { id: 'as1000s24', text: '1000 − 350 − 450', categoryId: 'm200' },
      { id: 'as1000s25', text: '', figure: <SortTags prices={[700]} />, categoryId: 'm300' },
      { id: 'as1000s26', text: '', figure: <SortTags prices={[460, 240]} />, categoryId: 'm300' },
      { id: 'as1000s27', text: '1000 − 250 − 450', categoryId: 'm300' }
    ]
  }
];

export const ADD_SUB_1000_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: LIST[0],
  2: LIST[1],
  3: LIST[2]
};

export const AddSub1000G3Sorter: React.FC<AddSub1000G3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-c1000-osszeadas-sorter',
  topicTitle = '3. Összeadás és kivonás – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="szamolas-1000-ig"
      topicId={topicId}
      subtopicId="osszeadas-es-kivonas"
      title={topicTitle}
      subtitle="Válogasd szét a műveleteket az eredményük szerint!"
      levels={ADD_SUB_1000_G3_SORTER_LEVELS}
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

export default AddSub1000G3Sorter;

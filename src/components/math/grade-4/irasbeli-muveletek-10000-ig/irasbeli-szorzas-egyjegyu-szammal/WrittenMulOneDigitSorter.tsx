import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface WrittenMulOneDigitSorterProps {
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

const WRITTEN_MUL1_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Becsüld meg!',
    description: 'Kerekítsd a szorzandót százasra, és szorozz fejben! Melyik becsült érték jön ki?',
    categories: [
      { id: 'b24', name: 'B: 2400', color: 'blue' },
      { id: 'b36', name: 'B: 3600', color: 'emerald' },
      { id: 'b48', name: 'B: 4800', color: 'amber' }
    ],
    items: [
      { id: 'wms1', text: '1198 · 2', categoryId: 'b24' },
      { id: 'wms2', text: '804 · 3', categoryId: 'b24' },
      { id: 'wms3', text: '612 · 4', categoryId: 'b24' },
      { id: 'wms4', text: '1186 · 3', categoryId: 'b36' },
      { id: 'wms5', text: '1240 · 3', categoryId: 'b36' },
      { id: 'wms6', text: '598 · 6', categoryId: 'b36' },
      { id: 'wms7', text: '2354 · 2', categoryId: 'b48' },
      { id: 'wms8', text: '1598 · 3', categoryId: 'b48' },
      { id: 'wms9', text: '785 · 6', categoryId: 'b48' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mekkora a szorzat?',
    description: 'Számold ki a szorzatot! Kisebb 5000-nél, 5000 és 8000 között van, vagy nagyobb 8000-nél?',
    categories: [
      { id: 'lt', name: 'Kisebb, mint 5000', color: 'teal' },
      { id: 'mid', name: '5000 és 8000 között', color: 'purple' },
      { id: 'gt', name: 'Nagyobb, mint 8000', color: 'rose' }
    ],
    items: [
      { id: 'wms10', text: '1623 · 2', categoryId: 'lt' },
      { id: 'wms11', text: '1216 · 4', categoryId: 'lt' },
      { id: 'wms12', text: '1244 · 3', categoryId: 'lt' },
      { id: 'wms13', text: '1114 · 5', categoryId: 'mid' },
      { id: 'wms14', text: '2324 · 3', categoryId: 'mid' },
      { id: 'wms15', text: '2549 · 3', categoryId: 'mid' },
      { id: 'wms16', text: '1041 · 8', categoryId: 'gt' },
      { id: 'wms17', text: '1356 · 6', categoryId: 'gt' },
      { id: 'wms18', text: '956 · 9', categoryId: 'gt' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hányszor marad valami?',
    description: 'Írásbeli szorzásnál hány helyi értéken keletkezik maradék, amit tovább kell vinni?',
    categories: [
      { id: 'c0', name: 'Nincs maradék', color: 'blue' },
      { id: 'c1', name: '1 helyen van maradék', color: 'amber' },
      { id: 'c2', name: '2 vagy több helyen', color: 'emerald' }
    ],
    items: [
      { id: 'wms19', text: '1213 · 3', categoryId: 'c0' },
      { id: 'wms20', text: '2104 · 2', categoryId: 'c0' },
      { id: 'wms21', text: '4202 · 2', categoryId: 'c0' },
      { id: 'wms22', text: '1623 · 2', categoryId: 'c1' },
      { id: 'wms23', text: '1041 · 8', categoryId: 'c1' },
      { id: 'wms24', text: '3263 · 2', categoryId: 'c1' },
      { id: 'wms25', text: '2549 · 3', categoryId: 'c2' },
      { id: 'wms26', text: '1356 · 6', categoryId: 'c2' },
      { id: 'wms27', text: '956 · 9', categoryId: 'c2' }
    ]
  }
];

const WRITTEN_MUL1_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: WRITTEN_MUL1_SORTER_LEVELS_LIST[0],
  2: WRITTEN_MUL1_SORTER_LEVELS_LIST[1],
  3: WRITTEN_MUL1_SORTER_LEVELS_LIST[2]
};

export const WrittenMulOneDigitSorter: React.FC<WrittenMulOneDigitSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-wops-szorzas-egyjegyu-sorter',
  topicTitle = '2. Írásbeli szorzás egyjegyű számmal – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="irasbeli-muveletek-10000-ig"
      topicId={topicId}
      subtopicId="irasbeli-szorzas-egyjegyu-szammal"
      title={topicTitle}
      subtitle="Csoportosítsd a szorzásokat becslés, szorzat és maradék szerint!"
      levels={WRITTEN_MUL1_SORTER_LEVELS}
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

export default WrittenMulOneDigitSorter;

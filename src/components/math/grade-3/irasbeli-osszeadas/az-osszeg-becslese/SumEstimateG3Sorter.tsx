import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { SortCalc } from './SumEstimateG3CardFigures';
import { SortTags } from '../haromjegyu-szamok-osszeadasa/ThreeDigitAddG3CardFigures';

interface SumEstimateG3SorterProps {
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
    title: '1. szint: Becslés százasra',
    description: 'Kerekítsd százasra a tagokat! Mennyi a becslés?',
    categories: [
      { id: 'b300', name: 'B: 300', color: 'sky' },
      { id: 'b400', name: 'B: 400', color: 'amber' },
      { id: 'b500', name: 'B: 500', color: 'emerald' }
    ],
    items: [
      { id: 'sess1', text: '', figure: <SortTags prices={[142, 167]} />, categoryId: 'b300' },
      { id: 'sess2', text: '', figure: <SortTags prices={[128, 156]} />, categoryId: 'b300' },
      { id: 'sess3', text: '104 + 213', categoryId: 'b300' },
      { id: 'sess4', text: '', figure: <SortTags prices={[162, 228]} />, categoryId: 'b400' },
      { id: 'sess5', text: '', figure: <SortTags prices={[138, 276]} />, categoryId: 'b400' },
      { id: 'sess6', text: '312 + 147', categoryId: 'b400' },
      { id: 'sess7', text: '', figure: <SortTags prices={[247, 251]} />, categoryId: 'b500' },
      { id: 'sess8', text: '', figure: <SortTags prices={[196, 304]} />, categoryId: 'b500' },
      { id: 'sess9', text: '351 + 149', categoryId: 'b500' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Becslés tízesre',
    description: 'Kerekítsd tízesre a tagokat! Mennyi a becslés?',
    categories: [
      { id: 't370', name: 'B: 370', color: 'sky' },
      { id: 't380', name: 'B: 380', color: 'rose' },
      { id: 't390', name: 'B: 390', color: 'emerald' }
    ],
    items: [
      { id: 'sess10', text: '', figure: <SortTags prices={[127, 235]} />, categoryId: 't370' },
      { id: 'sess11', text: '', figure: <SortTags prices={[148, 224]} />, categoryId: 't370' },
      { id: 'sess12', text: '163 + 205', categoryId: 't370' },
      { id: 'sess13', text: '', figure: <SortTags prices={[245, 125]} />, categoryId: 't380' },
      { id: 'sess14', text: '', figure: <SortTags prices={[168, 213]} />, categoryId: 't380' },
      { id: 'sess15', text: '186 + 194', categoryId: 't380' },
      { id: 'sess16', text: '', figure: <SortTags prices={[162, 228]} />, categoryId: 't390' },
      { id: 'sess17', text: '', figure: <SortTags prices={[246, 144]} />, categoryId: 't390' },
      { id: 'sess18', text: '104 + 286', categoryId: 't390' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hibavadász',
    description: 'Becsülj tízesre! Jó lehet az eredmény, vagy hibás?',
    categories: [
      { id: 'jo', name: 'Jó lehet', color: 'emerald' },
      { id: 'kicsi', name: 'Hibás: túl kicsi', color: 'sky' },
      { id: 'nagy', name: 'Hibás: túl nagy', color: 'rose' }
    ],
    items: [
      { id: 'sess19', text: '', figure: <SortCalc a={236} b={145} s={381} />, categoryId: 'jo' },
      { id: 'sess20', text: '', figure: <SortCalc a={187} b={238} s={425} />, categoryId: 'jo' },
      { id: 'sess21', text: '213 + 189 = 402', categoryId: 'jo' },
      { id: 'sess22', text: '', figure: <SortCalc a={245} b={135} s={280} />, categoryId: 'kicsi' },
      { id: 'sess23', text: '', figure: <SortCalc a={154} b={227} s={281} />, categoryId: 'kicsi' },
      { id: 'sess24', text: '312 + 147 = 359', categoryId: 'kicsi' },
      { id: 'sess25', text: '', figure: <SortCalc a={127} b={235} s={462} />, categoryId: 'nagy' },
      { id: 'sess26', text: '', figure: <SortCalc a={142} b={215} s={457} />, categoryId: 'nagy' },
      { id: 'sess27', text: '118 + 130 = 348', categoryId: 'nagy' }
    ]
  }
];

export const SUM_ESTIMATE_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = { 1: LIST[0], 2: LIST[1], 3: LIST[2] };

export const SumEstimateG3Sorter: React.FC<SumEstimateG3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-wadd-becsles-sorter',
  topicTitle = '2. Az összeg becslése – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="irasbeli-osszeadas"
      topicId={topicId}
      subtopicId="az-osszeg-becslese"
      title={topicTitle}
      subtitle="Becsüld meg az összegeket, és válogasd szét őket!"
      levels={SUM_ESTIMATE_G3_SORTER_LEVELS}
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

export default SumEstimateG3Sorter;

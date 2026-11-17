import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { IconCard, LabelledIconCard, ScenarioCard } from './WhatToMeasureG3CardFigures';

interface WhatToMeasureG3SorterProps {
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

const CATS = [
  { id: 'hossz', name: 'Hosszúság', color: 'amber' },
  { id: 'tomeg', name: 'Tömeg', color: 'slate' },
  { id: 'urt', name: 'Űrtartalom', color: 'sky' }
];

const WHAT_TO_MEASURE_G3_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mit mér ez az eszköz?',
    description: 'Hosszúságot, tömeget vagy űrtartalmat?',
    categories: CATS,
    items: [
      { id: 'wtms1', text: '', figure: <IconCard kind="ruler" small />, categoryId: 'hossz' },
      { id: 'wtms2', text: '', figure: <IconCard kind="tape" small />, categoryId: 'hossz' },
      { id: 'wtms3', text: 'méterrúd', categoryId: 'hossz' },
      { id: 'wtms4', text: '', figure: <IconCard kind="balance" small />, categoryId: 'tomeg' },
      { id: 'wtms5', text: '', figure: <IconCard kind="bathscale" small />, categoryId: 'tomeg' },
      { id: 'wtms6', text: 'konyhai mérleg', categoryId: 'tomeg' },
      { id: 'wtms7', text: '', figure: <IconCard kind="jug" small />, categoryId: 'urt' },
      { id: 'wtms8', text: 'mérőpohár', categoryId: 'urt' },
      { id: 'wtms9', text: 'literes mérőedény', categoryId: 'urt' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Melyik mértékegység?',
    description: 'Nézd a mértékegységet! Mit mérünk vele?',
    categories: CATS,
    items: [
      { id: 'wtms10', text: '', figure: <LabelledIconCard kind="stick" label="1 m" />, categoryId: 'hossz' },
      { id: 'wtms11', text: 'centiméter', categoryId: 'hossz' },
      { id: 'wtms12', text: '15 cm', categoryId: 'hossz' },
      { id: 'wtms13', text: '', figure: <LabelledIconCard kind="weight" label="5 kg" />, categoryId: 'tomeg' },
      { id: 'wtms14', text: 'kilogramm', categoryId: 'tomeg' },
      { id: 'wtms15', text: '25 kg', categoryId: 'tomeg' },
      { id: 'wtms16', text: '', figure: <LabelledIconCard kind="bottle" label="1 l" />, categoryId: 'urt' },
      { id: 'wtms17', text: '', figure: <LabelledIconCard kind="glass" label="2 dl" />, categoryId: 'urt' },
      { id: 'wtms18', text: 'deciliter', categoryId: 'urt' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mit mérünk most?',
    description: 'Olvasd el a kérdést, vagy nézd meg, mit mérnek a képen!',
    categories: CATS,
    items: [
      { id: 'wtms19', text: '', figure: <ScenarioCard kind="pencilRuler" />, categoryId: 'hossz' },
      { id: 'wtms20', text: 'Milyen magas a fa?', categoryId: 'hossz' },
      { id: 'wtms21', text: 'Milyen széles az ablak?', categoryId: 'hossz' },
      { id: 'wtms22', text: '', figure: <ScenarioCard kind="appleBalance" />, categoryId: 'tomeg' },
      { id: 'wtms23', text: '', figure: <ScenarioCard kind="childScale" />, categoryId: 'tomeg' },
      { id: 'wtms24', text: 'Hány kg a zsák krumpli?', categoryId: 'tomeg' },
      { id: 'wtms25', text: '', figure: <ScenarioCard kind="jugPour" />, categoryId: 'urt' },
      { id: 'wtms26', text: 'Hány pohár víz fér a vázába?', categoryId: 'urt' },
      { id: 'wtms27', text: 'Mennyi leves fér a fazékba?', categoryId: 'urt' }
    ]
  }
];

export const WHAT_TO_MEASURE_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: WHAT_TO_MEASURE_G3_SORTER_LEVELS_LIST[0],
  2: WHAT_TO_MEASURE_G3_SORTER_LEVELS_LIST[1],
  3: WHAT_TO_MEASURE_G3_SORTER_LEVELS_LIST[2]
};

export const WhatToMeasureG3Sorter: React.FC<WhatToMeasureG3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-meas-mit-mivel-sorter',
  topicTitle = '1. Mit mivel mérünk? – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="meresek"
      topicId={topicId}
      subtopicId="mit-mivel-merunk"
      title={topicTitle}
      subtitle="Hosszúság, tömeg vagy űrtartalom? Válogasd szét!"
      levels={WHAT_TO_MEASURE_G3_SORTER_LEVELS}
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

export default WhatToMeasureG3Sorter;

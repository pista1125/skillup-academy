import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { SortChange, SortSwap } from './SumChangesG3CardFigures';

interface SumChangesG3SorterProps {
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

const SUM_CHANGES_G3_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Nő, marad vagy csökken?',
    description: 'Kék = 1. tag, sárga = 2. tag. Mi lesz az összeggel?',
    categories: [
      { id: 'no', name: 'Az összeg nő', color: 'emerald' },
      { id: 'marad', name: 'Nem változik', color: 'sky' },
      { id: 'csokken', name: 'Az összeg csökken', color: 'rose' }
    ],
    items: [
      { id: 'scs1_1', text: '', figure: <SortChange a={10} b={0} />, categoryId: 'no' },
      { id: 'scs1_2', text: '', figure: <SortChange a={100} b={-10} />, categoryId: 'no' },
      { id: 'scs1_3', text: 'Az egyik tag 1-gyel nagyobb.', categoryId: 'no' },
      { id: 'scs1_4', text: '', figure: <SortChange a={10} b={-10} />, categoryId: 'marad' },
      { id: 'scs1_5', text: '', figure: <SortChange a={-100} b={100} />, categoryId: 'marad' },
      { id: 'scs1_6', text: 'Felcseréltem a tagokat.', figure: <SortSwap />, categoryId: 'marad' },
      { id: 'scs1_7', text: '', figure: <SortChange a={0} b={-10} />, categoryId: 'csokken' },
      { id: 'scs1_8', text: '', figure: <SortChange a={-100} b={10} />, categoryId: 'csokken' },
      { id: 'scs1_9', text: 'Mindkét tag 10-zel kisebb.', categoryId: 'csokken' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mennyivel nő?',
    description: 'Mennyivel lesz nagyobb az összeg? Válogasd szét!',
    categories: [
      { id: 'd10', name: '10-zel nő', color: 'sky' },
      { id: 'd20', name: '20-szal nő', color: 'emerald' },
      { id: 'd0', name: 'Nem változik', color: 'amber' }
    ],
    items: [
      { id: 'scs2_1', text: '', figure: <SortChange a={10} b={0} />, categoryId: 'd10' },
      { id: 'scs2_2', text: '', figure: <SortChange a={20} b={-10} />, categoryId: 'd10' },
      { id: 'scs2_3', text: '136 + 150 → 146 + 150', categoryId: 'd10' },
      { id: 'scs2_4', text: '', figure: <SortChange a={10} b={10} />, categoryId: 'd20' },
      { id: 'scs2_5', text: '', figure: <SortChange a={30} b={-10} />, categoryId: 'd20' },
      { id: 'scs2_6', text: '245 + 118 → 255 + 128', categoryId: 'd20' },
      { id: 'scs2_7', text: '', figure: <SortChange a={20} b={-20} />, categoryId: 'd0' },
      { id: 'scs2_8', text: '312 + 145 → 145 + 312', categoryId: 'd0' },
      { id: 'scs2_9', text: '198 + 147 → 200 + 145', categoryId: 'd0' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hasonlítsd az 500-hoz!',
    description: '250 + 250 = 500. A kártyán a tagok változása látszik. Kevesebb, pontosan 500 vagy több?',
    categories: [
      { id: 'kev', name: 'Kevesebb, mint 500', color: 'sky' },
      { id: 'pont', name: 'Pontosan 500', color: 'emerald' },
      { id: 'tobb', name: 'Több, mint 500', color: 'rose' }
    ],
    items: [
      { id: 'scs3_1', text: '249 + 250', figure: <SortChange a={-1} b={0} />, categoryId: 'kev' },
      { id: 'scs3_2', text: '240 + 250', categoryId: 'kev' },
      { id: 'scs3_3', text: '350 + 140', figure: <SortChange a={100} b={-110} />, categoryId: 'kev' },
      { id: 'scs3_4', text: '260 + 240', figure: <SortChange a={10} b={-10} />, categoryId: 'pont' },
      { id: 'scs3_5', text: '350 + 150', figure: <SortChange a={100} b={-100} />, categoryId: 'pont' },
      { id: 'scs3_6', text: '200 + 300', categoryId: 'pont' },
      { id: 'scs3_7', text: '250 + 251', figure: <SortChange a={0} b={1} />, categoryId: 'tobb' },
      { id: 'scs3_8', text: '340 + 170', categoryId: 'tobb' },
      { id: 'scs3_9', text: '260 + 250', figure: <SortChange a={10} b={0} />, categoryId: 'tobb' }
    ]
  }
];

export const SUM_CHANGES_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: SUM_CHANGES_G3_SORTER_LEVELS_LIST[0],
  2: SUM_CHANGES_G3_SORTER_LEVELS_LIST[1],
  3: SUM_CHANGES_G3_SORTER_LEVELS_LIST[2]
};

export const SumChangesG3Sorter: React.FC<SumChangesG3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-wadd-valtozasok-sorter',
  topicTitle = '4. Az összeg változásai – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="irasbeli-osszeadas"
      topicId={topicId}
      subtopicId="az-osszeg-valtozasai"
      title={topicTitle}
      subtitle="Figyeld a tagokat, és válogasd szét!"
      levels={SUM_CHANGES_G3_SORTER_LEVELS}
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

export default SumChangesG3Sorter;

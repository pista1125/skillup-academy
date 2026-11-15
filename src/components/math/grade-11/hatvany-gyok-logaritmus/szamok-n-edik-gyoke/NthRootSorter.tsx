import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface NthRootSorterProps {
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

const NTH_ROOT_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Értelmezett-e, és milyen szám?',
    description: 'Válogasd szét a kifejezéseket a valós számok körében!',
    categories: [
      {
        id: 'int',
        name: 'Egész szám',
        color: 'emerald'
      },
      {
        id: 'nonint',
        name: 'Értelmezett, de nem egész',
        color: 'sky'
      },
      {
        id: 'undef',
        name: 'Nincs értelmezve',
        color: 'rose'
      }
    ],
    items: [
      {
        id: 'nrts1',
        text: '⁴√81',
        categoryId: 'int'
      },
      {
        id: 'nrts2',
        text: '∛−216',
        categoryId: 'int'
      },
      {
        id: 'nrts3',
        text: '¹⁰√1024',
        categoryId: 'int'
      },
      {
        id: 'nrts4',
        text: '√17',
        categoryId: 'nonint'
      },
      {
        id: 'nrts5',
        text: '∛45',
        categoryId: 'nonint'
      },
      {
        id: 'nrts6',
        text: '∛0,001',
        categoryId: 'nonint'
      },
      {
        id: 'nrts7',
        text: '⁴√−16',
        categoryId: 'undef'
      },
      {
        id: 'nrts8',
        text: '√−9',
        categoryId: 'undef'
      },
      {
        id: 'nrts9',
        text: '⁶√−1',
        categoryId: 'undef'
      }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mekkora a közelítő érték?',
    description: 'Becsüld meg (vagy számold ki) a gyök értékét!',
    categories: [
      {
        id: 'lt2',
        name: '2-nél kisebb',
        color: 'sky'
      },
      {
        id: 'mid',
        name: '2 és 5 között',
        color: 'violet'
      },
      {
        id: 'gt5',
        name: '5-nél nagyobb',
        color: 'amber'
      }
    ],
    items: [
      {
        id: 'nrts10',
        text: '⁴√10',
        categoryId: 'lt2'
      },
      {
        id: 'nrts11',
        text: '∛7',
        categoryId: 'lt2'
      },
      {
        id: 'nrts12',
        text: '⁵√20',
        categoryId: 'lt2'
      },
      {
        id: 'nrts13',
        text: '∛10',
        categoryId: 'mid'
      },
      {
        id: 'nrts14',
        text: '∛60',
        categoryId: 'mid'
      },
      {
        id: 'nrts15',
        text: '⁴√120',
        categoryId: 'mid'
      },
      {
        id: 'nrts16',
        text: '∛920',
        categoryId: 'gt5'
      },
      {
        id: 'nrts17',
        text: '⁴√920',
        categoryId: 'gt5'
      },
      {
        id: 'nrts18',
        text: '∛10 000',
        categoryId: 'gt5'
      }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hány valós megoldás?',
    description: 'Hány valós megoldása van az egyenletnek?',
    categories: [
      {
        id: 'two',
        name: 'Két megoldás',
        color: 'emerald'
      },
      {
        id: 'one',
        name: 'Egy megoldás',
        color: 'sky'
      },
      {
        id: 'zero',
        name: 'Nincs megoldás',
        color: 'rose'
      }
    ],
    items: [
      {
        id: 'nrts19',
        text: 'x⁴ = 81',
        categoryId: 'two'
      },
      {
        id: 'nrts20',
        text: 'x² = 17',
        categoryId: 'two'
      },
      {
        id: 'nrts21',
        text: 'x⁶ = 0,015625',
        categoryId: 'two'
      },
      {
        id: 'nrts22',
        text: 'x³ = −216',
        categoryId: 'one'
      },
      {
        id: 'nrts23',
        text: 'x⁵ = 32',
        categoryId: 'one'
      },
      {
        id: 'nrts24',
        text: 'x⁴ = 0',
        categoryId: 'one'
      },
      {
        id: 'nrts25',
        text: 'x⁴ = −16',
        categoryId: 'zero'
      },
      {
        id: 'nrts26',
        text: 'x⁶ = −1/64',
        categoryId: 'zero'
      },
      {
        id: 'nrts27',
        text: 'x² = −9',
        categoryId: 'zero'
      }
    ]
  }
];

const NTH_ROOT_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: NTH_ROOT_SORTER_LEVELS_LIST[0],
  2: NTH_ROOT_SORTER_LEVELS_LIST[1],
  3: NTH_ROOT_SORTER_LEVELS_LIST[2]
};

export const NthRootSorter: React.FC<NthRootSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-exp-n-edik-gyok-sorter',
  topicTitle = '2. Számok n-edik gyöke – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="hatvany-gyok-logaritmus"
      topicId={topicId}
      subtopicId="szamok-n-edik-gyoke"
      title={topicTitle}
      subtitle="Rendszerezd a gyököket: értelmezett-e, mekkora, és hány megoldása van az xⁿ = a egyenletnek!"
      levels={NTH_ROOT_SORTER_LEVELS}
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

export default NthRootSorter;

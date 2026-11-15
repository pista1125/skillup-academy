import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface VectorSubtractionSorterProps {
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

const VECTOR_SUBTRACTION_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Melyikkel egyenlő?',
    description: 'Csoportosítsd a kifejezéseket aszerint, hogy →a − →b, →b − →a vagy →a + →b az értékük!',
    categories: [
      { id: 'amb', name: '→a − →b', color: 'rose' },
      { id: 'bma', name: '→b − →a', color: 'purple' },
      { id: 'apb', name: '→a + →b', color: 'blue' }
    ],
    items: [
      { id: 'vss1', text: '→a + (−→b)', categoryId: 'amb' },
      { id: 'vss2', text: '−(→b − →a)', categoryId: 'amb' },
      { id: 'vss3', text: '−→b + →a', categoryId: 'amb' },
      { id: 'vss4', text: '−(→a − →b)', categoryId: 'bma' },
      { id: 'vss5', text: '→b + (−→a)', categoryId: 'bma' },
      { id: 'vss6', text: '−→a + →b', categoryId: 'bma' },
      { id: 'vss7', text: '→b + →a', categoryId: 'apb' },
      { id: 'vss8', text: '→a − (−→b)', categoryId: 'apb' },
      { id: 'vss9', text: '−(−→a − →b)', categoryId: 'apb' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Különbségek az ABCD paralelogrammában',
    description: 'Csoportosítsd a kifejezéseket az eredményük szerint!',
    categories: [
      { id: 'db', name: '→DB', color: 'blue' },
      { id: 'ca', name: '→CA', color: 'emerald' },
      { id: 'zero', name: '→0 (nullvektor)', color: 'slate' }
    ],
    items: [
      { id: 'vss10', text: '→AB − →AD', categoryId: 'db' },
      { id: 'vss11', text: '→CB − →CD', categoryId: 'db' },
      { id: 'vss12', text: '→DA + →AB', categoryId: 'db' },
      { id: 'vss13', text: '→BA − →BC', categoryId: 'ca' },
      { id: 'vss14', text: '→DA − →DC', categoryId: 'ca' },
      { id: 'vss15', text: '→CB + →BA', categoryId: 'ca' },
      { id: 'vss16', text: '→AB − →DC', categoryId: 'zero' },
      { id: 'vss17', text: '→AB − →CB + →CA', categoryId: 'zero' },
      { id: 'vss18', text: '→AD − →BC', categoryId: 'zero' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mikor igaz?',
    description: '→u és →v nem párhuzamos, nem nulla vektorok. Mindig igaz az állítás, vagy csak merőleges, illetve csak egyenlő hosszú vektorokra?',
    categories: [
      { id: 'always', name: 'Mindig igaz', color: 'emerald' },
      { id: 'perp', name: 'Csak ha →u ⊥ →v', color: 'blue' },
      { id: 'eqlen', name: 'Csak ha |→u| = |→v|', color: 'amber' }
    ],
    items: [
      { id: 'vss19', text: '−(→u − →v) = →v − →u', categoryId: 'always' },
      { id: 'vss20', text: '→u − (→u − →v) = →v', categoryId: 'always' },
      { id: 'vss21', text: '→v + (→u − →v) = →u', categoryId: 'always' },
      { id: 'vss22', text: '|→u + →v| = |→u − →v|', categoryId: 'perp' },
      { id: 'vss23', text: 'Az →u, →v által kifeszített paralelogramma átlói egyenlő hosszúak', categoryId: 'perp' },
      { id: 'vss24', text: '|→u − →v|² = |→u|² + |→v|²', categoryId: 'perp' },
      { id: 'vss25', text: '(→u + →v) merőleges (→u − →v)-re', categoryId: 'eqlen' },
      { id: 'vss26', text: 'Az →u, →v által kifeszített paralelogramma rombusz', categoryId: 'eqlen' },
      { id: 'vss27', text: '→u + →v felezi az →u és →v által bezárt szöget', categoryId: 'eqlen' }
    ]
  }
];

const VECTOR_SUBTRACTION_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: VECTOR_SUBTRACTION_SORTER_LEVELS_LIST[0],
  2: VECTOR_SUBTRACTION_SORTER_LEVELS_LIST[1],
  3: VECTOR_SUBTRACTION_SORTER_LEVELS_LIST[2]
};

export const VectorSubtractionSorter: React.FC<VectorSubtractionSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-geo-vektor-kulonbseg-sorter',
  topicTitle = '2. Két vektor különbsége – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="koordinatageometria"
      topicId={topicId}
      subtopicId="ket-vektor-kulonbsege"
      title={topicTitle}
      subtitle="Rendszerezd a különbségeket és azt, mikor igazak a paralelogramma átlóira vonatkozó állítások!"
      levels={VECTOR_SUBTRACTION_SORTER_LEVELS}
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

export default VectorSubtractionSorter;

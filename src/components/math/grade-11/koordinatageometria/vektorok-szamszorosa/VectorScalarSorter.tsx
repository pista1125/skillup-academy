import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface VectorScalarSorterProps {
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

const VECTOR_SCALAR_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Milyen irányú? (→a ≠ →0)',
    description: 'Döntsd el, hogy a vektor egyirányú vagy ellentétes irányú →a-val, vagy nullvektor!',
    categories: [
      { id: 'same', name: 'Egyirányú →a-val', color: 'emerald' },
      { id: 'opp', name: 'Ellentétes irányú →a-val', color: 'rose' },
      { id: 'zero', name: 'Nullvektor', color: 'slate' }
    ],
    items: [
      { id: 'vcs1', text: '3→a', categoryId: 'same' },
      { id: 'vcs2', text: '0,5→a', categoryId: 'same' },
      { id: 'vcs3', text: '−(−2→a)', categoryId: 'same' },
      { id: 'vcs4', text: '−→a', categoryId: 'opp' },
      { id: 'vcs5', text: '−0,25→a', categoryId: 'opp' },
      { id: 'vcs6', text: '3(−→a)', categoryId: 'opp' },
      { id: 'vcs7', text: '0 · →a', categoryId: 'zero' },
      { id: 'vcs8', text: '5 · →0', categoryId: 'zero' },
      { id: 'vcs9', text: '→a − →a', categoryId: 'zero' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Hosszabb, rövidebb vagy egyenlő? (→a ≠ →0)',
    description: 'Hasonlítsd össze a vektor hosszát |→a|-val!',
    categories: [
      { id: 'longer', name: 'Hosszabb, mint →a', color: 'blue' },
      { id: 'shorter', name: 'Rövidebb, mint →a', color: 'amber' },
      { id: 'equal', name: 'Ugyanolyan hosszú', color: 'purple' }
    ],
    items: [
      { id: 'vcs10', text: '−2→a', categoryId: 'longer' },
      { id: 'vcs11', text: '1,5→a', categoryId: 'longer' },
      { id: 'vcs12', text: '−(3→a)', categoryId: 'longer' },
      { id: 'vcs13', text: '½ →a', categoryId: 'shorter' },
      { id: 'vcs14', text: '−0,8→a', categoryId: 'shorter' },
      { id: 'vcs15', text: '0,25→a', categoryId: 'shorter' },
      { id: 'vcs16', text: '−→a', categoryId: 'equal' },
      { id: 'vcs17', text: '(−1)(−→a)', categoryId: 'equal' },
      { id: 'vcs18', text: '1 · →a', categoryId: 'equal' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Párhuzamosak-e?',
    description: 'Párhuzamos-e a két vektor, és ha igen, egyirányúak vagy ellentétes irányúak?',
    categories: [
      { id: 'same', name: 'Párhuzamos, egyirányú', color: 'emerald' },
      { id: 'opp', name: 'Párhuzamos, ellentétes irányú', color: 'rose' },
      { id: 'none', name: 'Nem párhuzamosak', color: 'slate' }
    ],
    items: [
      { id: 'vcs19', text: '→a és →b, ha →a = 4→b', categoryId: 'same' },
      { id: 'vcs20', text: '2→i − →j és 6→i − 3→j', categoryId: 'same' },
      { id: 'vcs21', text: '→AK és →AD a szabályos hatszögben (K a középpont)', categoryId: 'same' },
      { id: 'vcs22', text: '→a és →b, ha →a = −0,8→b', categoryId: 'opp' },
      { id: 'vcs23', text: '3→i − 2→j és −6→i + 4→j', categoryId: 'opp' },
      { id: 'vcs24', text: '→AB és →CD az ABCD paralelogrammában', categoryId: 'opp' },
      { id: 'vcs25', text: '→i és →j', categoryId: 'none' },
      { id: 'vcs26', text: '3→i − 2→j és −3→i − 2→j', categoryId: 'none' },
      { id: 'vcs27', text: 'A kocka →AB és →AG vektora', categoryId: 'none' }
    ]
  }
];

const VECTOR_SCALAR_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: VECTOR_SCALAR_SORTER_LEVELS_LIST[0],
  2: VECTOR_SCALAR_SORTER_LEVELS_LIST[1],
  3: VECTOR_SCALAR_SORTER_LEVELS_LIST[2]
};

export const VectorScalarSorter: React.FC<VectorScalarSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-geo-vektor-szamszoros-sorter',
  topicTitle = '3. Vektorok számszorosa – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="koordinatageometria"
      topicId={topicId}
      subtopicId="vektorok-szamszorosa"
      title={topicTitle}
      subtitle="Rendszerezd a számszorosokat irány, hossz és párhuzamosság szerint!"
      levels={VECTOR_SCALAR_SORTER_LEVELS}
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

export default VectorScalarSorter;

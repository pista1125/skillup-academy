import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface Scaling4SorterProps {
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

const SCALING4_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Nagyobb, kisebb vagy ugyanakkora?',
    description: 'Válogasd szét: nagyítás, kicsinyítés, vagy ugyanakkora maradt a kép?',
    categories: [
      { id: 'big', name: 'Nagyítás', color: 'blue' },
      { id: 'small', name: 'Kicsinyítés', color: 'emerald' },
      { id: 'same', name: 'Ugyanakkora', color: 'amber' }
    ],
    items: [
      { id: 'scs1', text: 'A katica a nagyító alatt', categoryId: 'big' },
      { id: 'scs2', text: 'A vetítő képe a falon', categoryId: 'big' },
      { id: 'scs3', text: 'A hajszál a mikroszkóp alatt', categoryId: 'big' },
      { id: 'scs4', text: 'Magyarország térképe', categoryId: 'small' },
      { id: 'scs5', text: 'A földgömb', categoryId: 'small' },
      { id: 'scs6', text: 'A kisvasút-makett a vitrinben', categoryId: 'small' },
      { id: 'scs7', text: 'Gábor házikója a tankönyvben', categoryId: 'same' },
      { id: 'scs8', text: 'Másolópapírral átmásolt rajz', categoryId: 'same' },
      { id: 'scs9', text: 'A sablon körberajzolva', categoryId: 'same' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Melyik méretváltozás történt?',
    description: 'A téglalapok mérete: széles · magas (kis négyzetekben). Csoportosítsd a változásokat!',
    categories: [
      { id: 'x2', name: 'Kétszeresére nagyítás', color: 'blue' },
      { id: 'half', name: 'Felére kicsinyítés', color: 'emerald' },
      { id: 'no', name: 'Nem hasonló (eltorzult)', color: 'rose' }
    ],
    items: [
      { id: 'scs10', text: '3 · 1 → 6 · 2', categoryId: 'x2' },
      { id: 'scs11', text: '2 · 2 → 4 · 4', categoryId: 'x2' },
      { id: 'scs12', text: '5 · 2 → 10 · 4', categoryId: 'x2' },
      { id: 'scs13', text: '6 · 4 → 3 · 2', categoryId: 'half' },
      { id: 'scs14', text: '8 · 2 → 4 · 1', categoryId: 'half' },
      { id: 'scs15', text: '4 · 4 → 2 · 2', categoryId: 'half' },
      { id: 'scs16', text: '3 · 2 → 5 · 4', categoryId: 'no' },
      { id: 'scs17', text: '4 · 2 → 8 · 2', categoryId: 'no' },
      { id: 'scs18', text: '6 · 2 → 4 · 1', categoryId: 'no' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Igaz vagy hamis?',
    description: 'Válogasd szét az állításokat!',
    categories: [
      { id: 'true', name: 'Mindig igaz', color: 'emerald' },
      { id: 'false', name: 'Hamis', color: 'rose' },
      { id: 'depends', name: 'Attól függ', color: 'amber' }
    ],
    items: [
      { id: 'scs19', text: 'Nagyításkor az alakzat alakja nem változik.', categoryId: 'true' },
      { id: 'scs20', text: 'Kétszeres nagyításnál minden szakasz kétszer olyan hosszú lesz.', categoryId: 'true' },
      { id: 'scs21', text: 'Kétszeres nagyításnál a kerület is a kétszeresére nő.', categoryId: 'true' },
      { id: 'scs22', text: 'Kétszeres nagyításnál a kis négyzetek száma is csak kétszeres lesz.', categoryId: 'false' },
      { id: 'scs23', text: 'Kicsinyítéskor az alakzat elnyúlik.', categoryId: 'false' },
      { id: 'scs24', text: 'Ha egy téglalap minden oldalához 2-t adunk, mindig hasonló téglalapot kapunk.', categoryId: 'false' },
      { id: 'scs25', text: 'Ha a lépéssor minden számához 2-t adunk, hasonló alakzatot kapunk.', categoryId: 'depends' },
      { id: 'scs26', text: 'Két téglalap hasonló.', categoryId: 'depends' },
      { id: 'scs27', text: 'A rajz kicsinyített mása kisebb, mint 10 kis négyzet.', categoryId: 'depends' }
    ]
  }
];

const SCALING4_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: SCALING4_SORTER_LEVELS_LIST[0],
  2: SCALING4_SORTER_LEVELS_LIST[1],
  3: SCALING4_SORTER_LEVELS_LIST[2]
};

export const Scaling4Sorter: React.FC<Scaling4SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-geom-nagyitas-sorter',
  topicTitle = '5. Nagyítás, kicsinyítés – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="sikidomok-testek"
      topicId={topicId}
      subtopicId="nagyitas-kicsinyites"
      title={topicTitle}
      subtitle="Rendszerezd a nagyításokat, kicsinyítéseket és az állításokat!"
      levels={SCALING4_SORTER_LEVELS}
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

export default Scaling4Sorter;

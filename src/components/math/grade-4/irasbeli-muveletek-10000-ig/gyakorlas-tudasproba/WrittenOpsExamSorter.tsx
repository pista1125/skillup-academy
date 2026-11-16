import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface WrittenOpsExamSorterProps {
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

const EXAM_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Melyik művelet kell?',
    description: 'Olvasd el a feladatot! Melyik írásbeli művelettel oldod meg?',
    categories: [
      { id: 'add', name: 'Összeadással', color: 'indigo' },
      { id: 'mul', name: 'Szorzással', color: 'blue' },
      { id: 'div', name: 'Osztással', color: 'purple' }
    ],
    items: [
      { id: 'exs1', text: 'Vonatjegy 3845 Ft, hajójegy 2850 Ft. Mennyi összesen?', categoryId: 'add' },
      { id: 'exs2', text: 'A 2346 és az 5428 összege', categoryId: 'add' },
      { id: 'exs3', text: '2754 állat- és 2464 növényfaj. Hány faj összesen?', categoryId: 'add' },
      { id: 'exs4', text: '1623 kétszemélyes kabin. Hány személy fér el?', categoryId: 'mul' },
      { id: 'exs5', text: '4 vonatjegy ára, ha 1 jegy 325 Ft', categoryId: 'mul' },
      { id: 'exs6', text: 'Egy szám negyede 1824. Melyik ez a szám?', categoryId: 'mul' },
      { id: 'exs7', text: 'A 2872 Ft fele', categoryId: 'div' },
      { id: 'exs8', text: '8055 kitűző 9 egyforma csoportban. Hány van egy csoportban?', categoryId: 'div' },
      { id: 'exs9', text: 'Egy szám négyszerese 1824. Melyik ez a szám?', categoryId: 'div' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Kinek a többszöröse?',
    description: 'Nézd meg a szám utolsó jegyét!',
    categories: [
      { id: 'two', name: 'Csak a 2 többszöröse', color: 'blue' },
      { id: 'five', name: 'Csak az 5 többszöröse', color: 'rose' },
      { id: 'both', name: 'A 2-nek és az 5-nek is', color: 'purple' }
    ],
    items: [
      { id: 'exs10', text: '7602', categoryId: 'two' },
      { id: 'exs11', text: '7656', categoryId: 'two' },
      { id: 'exs12', text: '5552', categoryId: 'two' },
      { id: 'exs13', text: '2965', categoryId: 'five' },
      { id: 'exs14', text: '2865', categoryId: 'five' },
      { id: 'exs15', text: '1175', categoryId: 'five' },
      { id: 'exs16', text: '4310', categoryId: 'both' },
      { id: 'exs17', text: '9100', categoryId: 'both' },
      { id: 'exs18', text: '3990', categoryId: 'both' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hány jegyű a hányados?',
    description: 'Becsülj, mielőtt osztasz! Hány jegyű lesz a hányados?',
    categories: [
      { id: 'q2', name: 'Kétjegyű', color: 'teal' },
      { id: 'q3', name: 'Háromjegyű', color: 'amber' },
      { id: 'q4', name: 'Négyjegyű', color: 'emerald' }
    ],
    items: [
      { id: 'exs19', text: '224 : 3', categoryId: 'q2' },
      { id: 'exs20', text: '370 : 5', categoryId: 'q2' },
      { id: 'exs21', text: '567 : 9', categoryId: 'q2' },
      { id: 'exs22', text: '734 : 2', categoryId: 'q3' },
      { id: 'exs23', text: '2193 : 3', categoryId: 'q3' },
      { id: 'exs24', text: '4080 : 8', categoryId: 'q3' },
      { id: 'exs25', text: '3693 : 3', categoryId: 'q4' },
      { id: 'exs26', text: '3150 : 3', categoryId: 'q4' },
      { id: 'exs27', text: '9277 : 8', categoryId: 'q4' }
    ]
  }
];

const EXAM_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: EXAM_SORTER_LEVELS_LIST[0],
  2: EXAM_SORTER_LEVELS_LIST[1],
  3: EXAM_SORTER_LEVELS_LIST[2]
};

export const WrittenOpsExamSorter: React.FC<WrittenOpsExamSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-wops-tudasproba-sorter',
  topicTitle = '8. Gyakorlás, tudáspróba – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="irasbeli-muveletek-10000-ig"
      topicId={topicId}
      subtopicId="gyakorlas-tudasproba"
      title={topicTitle}
      subtitle="Csoportosítsd a feladatokat a művelet, a többszörösök és a hányados jegyeinek száma szerint!"
      levels={EXAM_SORTER_LEVELS}
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

export default WrittenOpsExamSorter;

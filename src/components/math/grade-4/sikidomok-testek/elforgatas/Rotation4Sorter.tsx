import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface Rotation4SorterProps {
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

const ROTATION4_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Forog, eltolódik vagy tükröződik?',
    description: 'Mi történik? Válogasd szét!',
    categories: [
      { id: 'rot', name: 'Elforgatás, forgás', color: 'teal' },
      { id: 'shift', name: 'Eltolás', color: 'orange' },
      { id: 'mirror', name: 'Tükrözés', color: 'purple' }
    ],
    items: [
      { id: 'ros1', text: 'A körhinta forog', categoryId: 'rot' },
      { id: 'ros2', text: 'A sablont a gombostű körül fordítjuk', categoryId: 'rot' },
      { id: 'ros3', text: 'Az óra nagymutatója halad', categoryId: 'rot' },
      { id: 'ros4', text: 'A fiókot kihúzzuk', categoryId: 'shift' },
      { id: 'ros5', text: 'A vonatsablont az egyenes mentén toljuk', categoryId: 'shift' },
      { id: 'ros6', text: 'A széket 1 m-rel keletre toljuk', categoryId: 'shift' },
      { id: 'ros7', text: 'Az arcunk a tükörben', categoryId: 'mirror' },
      { id: 'ros8', text: 'A fák képe a tó vizében', categoryId: 'mirror' },
      { id: 'ros9', text: 'Félbehajtott lapra nyomott festékfolt', categoryId: 'mirror' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mekkora fordulat?',
    description: 'Hány negyed fordulat történt? Csoportosítsd!',
    categories: [
      { id: 'q1', name: 'Negyed fordulat', color: 'sky' },
      { id: 'q2', name: 'Fél fordulat', color: 'amber' },
      { id: 'q4', name: 'Egész fordulat', color: 'emerald' }
    ],
    items: [
      { id: 'ros10', text: 'A nagymutató 15 perc alatt', categoryId: 'q1' },
      { id: 'ros11', text: 'A felfelé mutató nyíl jobbra mutat', categoryId: 'q1' },
      { id: 'ros12', text: 'Egy derékszögnyi forgatás', categoryId: 'q1' },
      { id: 'ros13', text: 'A nagymutató 30 perc alatt', categoryId: 'q2' },
      { id: 'ros14', text: 'A felfelé mutató nyíl lefelé mutat', categoryId: 'q2' },
      { id: 'ros15', text: '2 negyed fordulat ugyanabba az irányba', categoryId: 'q2' },
      { id: 'ros16', text: 'A nagymutató 60 perc alatt', categoryId: 'q4' },
      { id: 'ros17', text: 'A nyíl újra ugyanoda mutat, egyszer körbeért', categoryId: 'q4' },
      { id: 'ros18', text: '4 negyed fordulat jobbra', categoryId: 'q4' }
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
      { id: 'ros19', text: 'Elforgatáskor az alakzat mérete nem változik.', categoryId: 'true' },
      { id: 'ros20', text: 'A forgatás középpontja (a tű helye) nem mozdul el.', categoryId: 'true' },
      { id: 'ros21', text: 'Háromnegyed fordulat jobbra ugyanoda visz, mint negyed fordulat balra.', categoryId: 'true' },
      { id: 'ros22', text: 'Elforgatáskor az alakzat kisebb lesz.', categoryId: 'false' },
      { id: 'ros23', text: 'Fél fordulat után az alakzat a tükörképe lesz.', categoryId: 'false' },
      { id: 'ros24', text: 'Egy negyed fordulat két derékszögnyi forgatás.', categoryId: 'false' },
      { id: 'ros25', text: 'Negyed fordulat után az alakzat ugyanúgy néz ki, mint előtte.', categoryId: 'depends' },
      { id: 'ros26', text: 'A forgatás után a piros csúcs feljebb kerül.', categoryId: 'depends' },
      { id: 'ros27', text: 'A nyíl a forgatás után jobbra mutat.', categoryId: 'depends' }
    ]
  }
];

const ROTATION4_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: ROTATION4_SORTER_LEVELS_LIST[0],
  2: ROTATION4_SORTER_LEVELS_LIST[1],
  3: ROTATION4_SORTER_LEVELS_LIST[2]
};

export const Rotation4Sorter: React.FC<Rotation4SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-geom-elforgatas-sorter',
  topicTitle = '7. Elforgatás – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="sikidomok-testek"
      topicId={topicId}
      subtopicId="elforgatas"
      title={topicTitle}
      subtitle="Rendszerezd a mozgásokat, a fordulatokat és az állításokat!"
      levels={ROTATION4_SORTER_LEVELS}
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

export default Rotation4Sorter;

import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { GridCard, SticksCard, PolyCard } from './PerimeterG3CardFigures';

interface PerimeterG3SorterProps {
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

const PERIMETER_G3_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Hány egység a kerülete?',
    description: '1 kis négyzet oldala 1 egység. Számold meg a szélén lévő kis szakaszokat!',
    categories: [
      { id: 'k6', name: '6 egység', color: 'sky' },
      { id: 'k8', name: '8 egység', color: 'emerald' },
      { id: 'k10', name: '10 egység', color: 'rose' }
    ],
    items: [
      { id: 'pers1', text: '', figure: <GridCard small cells={[[0, 0], [1, 0]]} />, categoryId: 'k6' },
      { id: 'pers2', text: '', figure: <GridCard small cells={[[0, 0], [0, 1]]} />, categoryId: 'k6' },
      { id: 'pers3', text: 'háromszög, minden oldala 2 egység', categoryId: 'k6' },
      { id: 'pers4', text: '', figure: <GridCard small cells={[[0, 0], [1, 0], [2, 0]]} />, categoryId: 'k8' },
      { id: 'pers5', text: '', figure: <GridCard small cells={[[0, 0], [0, 1], [1, 1]]} />, categoryId: 'k8' },
      { id: 'pers6', text: '4 pálcika, mind 2 egység', categoryId: 'k8' },
      { id: 'pers7', text: '', figure: <GridCard small cells={[[0, 0], [1, 0], [2, 0], [3, 0]]} />, categoryId: 'k10' },
      { id: 'pers8', text: '', figure: <GridCard small cells={[[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1]]} />, categoryId: 'k10' },
      { id: 'pers9', text: '', figure: <GridCard small cells={[[0, 0], [0, 1], [0, 2], [1, 2]]} />, categoryId: 'k10' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Hány oldalt adsz össze?',
    description: 'Számold meg a síkidom oldalait!',
    categories: [
      { id: 'o3', name: '3 oldalt', color: 'amber' },
      { id: 'o4', name: '4 oldalt', color: 'purple' },
      { id: 'o5', name: '5 oldalt', color: 'teal' }
    ],
    items: [
      { id: 'pers10', text: '', figure: <PolyCard small pts={[[30, 14], [68, 62], [12, 54]]} labels={[]} />, categoryId: 'o3' },
      { id: 'pers11', text: '', figure: <SticksCard small n={3} />, categoryId: 'o3' },
      { id: 'pers12', text: 'háromszög alakú zászló', categoryId: 'o3' },
      { id: 'pers13', text: '', figure: <PolyCard small pts={[[28, 18], [54, 18], [68, 60], [12, 60]]} labels={[]} />, categoryId: 'o4' },
      { id: 'pers14', text: '', figure: <SticksCard small n={4} />, categoryId: 'o4' },
      { id: 'pers15', text: 'téglalap alakú füzet', categoryId: 'o4' },
      { id: 'pers16', text: '', figure: <PolyCard small pts={[[40, 8], [64, 30], [64, 70], [16, 70], [16, 30]]} labels={[]} />, categoryId: 'o5' },
      { id: 'pers17', text: '', figure: <SticksCard small n={5} />, categoryId: 'o5' },
      { id: 'pers18', text: 'ötszög alakú virágágyás', categoryId: 'o5' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Kisebb, pont vagy nagyobb 20 cm-nél?',
    description: 'Számold ki a kerületet, és hasonlítsd a 20 cm-hez!',
    categories: [
      { id: 'kisebb', name: 'kevesebb, mint 20 cm', color: 'sky' },
      { id: 'pont', name: 'pont 20 cm', color: 'emerald' },
      { id: 'nagyobb', name: 'több, mint 20 cm', color: 'rose' }
    ],
    items: [
      { id: 'pers19', text: '1 pálcika 3 cm', figure: <SticksCard small n={6} />, categoryId: 'kisebb' },
      { id: 'pers20', text: 'háromszög: 5 cm, 6 cm, 7 cm', categoryId: 'kisebb' },
      { id: 'pers21', text: '1 pálcika 6 cm', figure: <SticksCard small n={3} />, categoryId: 'kisebb' },
      { id: 'pers22', text: '1 pálcika 5 cm', figure: <SticksCard small n={4} />, categoryId: 'pont' },
      { id: 'pers23', text: '1 pálcika 4 cm', figure: <SticksCard small n={5} />, categoryId: 'pont' },
      { id: 'pers24', text: 'háromszög: 6 cm, 7 cm, 7 cm', categoryId: 'pont' },
      { id: 'pers25', text: '1 pálcika 4 cm', figure: <SticksCard small n={6} />, categoryId: 'nagyobb' },
      { id: 'pers26', text: 'négyszög: 6 cm, 6 cm, 5 cm, 5 cm', categoryId: 'nagyobb' },
      { id: 'pers27', text: 'háromszög: 1 dm, 1 dm, 5 cm', categoryId: 'nagyobb' }
    ]
  }
];

export const PERIMETER_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: PERIMETER_G3_SORTER_LEVELS_LIST[0],
  2: PERIMETER_G3_SORTER_LEVELS_LIST[1],
  3: PERIMETER_G3_SORTER_LEVELS_LIST[2]
};

export const PerimeterG3Sorter: React.FC<PerimeterG3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-meas-kerulet-sorter',
  topicTitle = '5. A kerület mérése – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="meresek"
      topicId={topicId}
      subtopicId="a-kerulet-merese"
      title={topicTitle}
      subtitle="Válogasd szét a síkidomokat a kerületük és az oldalaik száma szerint!"
      levels={PERIMETER_G3_SORTER_LEVELS}
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

export default PerimeterG3Sorter;

import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface GraphPropertiesSorterProps {
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

const GRAPH_PROPERTIES_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Csúcs, él vagy fokszám?',
    description: 'Mi felel meg a gráfban a valós helyzet egyes részeinek?',
    categories: [
      { id: 'vertex', name: 'Csúcs', color: 'emerald' },
      { id: 'edge', name: 'Él', color: 'blue' },
      { id: 'degree', name: 'Fokszám', color: 'amber' }
    ],
    items: [
      { id: 'gps1', text: 'Egy falu a térképvázlaton', categoryId: 'vertex' },
      { id: 'gps2', text: 'Egy ember az ismeretségi hálóban', categoryId: 'vertex' },
      { id: 'gps3', text: 'A múzeum egy terme', categoryId: 'vertex' },
      { id: 'gps4', text: 'Egy út, amely két falut köt össze', categoryId: 'edge' },
      { id: 'gps5', text: 'Két ember kölcsönös ismeretsége', categoryId: 'edge' },
      { id: 'gps6', text: 'Átjáró két terem között', categoryId: 'edge' },
      { id: 'gps7', text: 'Hány út indul ki egy faluból', categoryId: 'degree' },
      { id: 'gps8', text: 'Hány ismerőse van valakinek a csoportban', categoryId: 'degree' },
      { id: 'gps9', text: 'Hány mérkőzést játszott eddig egy csapat', categoryId: 'degree' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Létezik ilyen egyszerű gráf?',
    description: 'Hurokél és többszörös él nélkül lerajzolható-e a gráf a megadott fokszámokkal?',
    categories: [
      { id: 'yes', name: 'Létezik', color: 'emerald' },
      { id: 'odd', name: 'Nem: páratlan a fokszámösszeg', color: 'rose' },
      { id: 'other', name: 'Nem: páros az összeg, de más ok miatt', color: 'purple' }
    ],
    items: [
      { id: 'gps10', text: '5 csúcs: 4, 3, 3, 2, 2', categoryId: 'yes' },
      { id: 'gps11', text: '5 csúcs: 2, 2, 2, 2, 2', categoryId: 'yes' },
      { id: 'gps12', text: '6 csúcs: 1, 1, 1, 2, 3, 4', categoryId: 'yes' },
      { id: 'gps13', text: '5 csúcs: 3, 3, 3, 3, 3', categoryId: 'odd' },
      { id: 'gps14', text: '6 csúcs: 1, 2, 2, 2, 3, 3', categoryId: 'odd' },
      { id: 'gps15', text: '7 csúcs, mindegyik fokszáma 3', categoryId: 'odd' },
      { id: 'gps16', text: '4 csúcs: 3, 3, 3, 1', categoryId: 'other' },
      { id: 'gps17', text: '4 csúcs: 4, 2, 2, 2', categoryId: 'other' },
      { id: 'gps18', text: '5 csúcs: 4, 4, 4, 1, 1', categoryId: 'other' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Igaz vagy hamis?',
    description: 'Válogasd szét az állításokat!',
    categories: [
      { id: 'true', name: 'Mindig igaz', color: 'emerald' },
      { id: 'false', name: 'Hamis', color: 'rose' },
      { id: 'depends', name: 'A konkrét gráftól függ', color: 'amber' }
    ],
    items: [
      { id: 'gps19', text: 'A fokszámok összege páros', categoryId: 'true' },
      { id: 'gps20', text: 'A hurokél 2-vel növeli a csúcs fokszámát', categoryId: 'true' },
      { id: 'gps21', text: 'Ugyanaz a gráf többféleképpen is lerajzolható', categoryId: 'true' },
      { id: 'gps22', text: 'Egy él vége lehet csúcs nélkül is', categoryId: 'false' },
      { id: 'gps23', text: 'A fokszámok összege egyenlő az élek számával', categoryId: 'false' },
      { id: 'gps24', text: 'Két él keresztezési pontja is csúcs', categoryId: 'false' },
      { id: 'gps25', text: 'Van a gráfban izolált csúcs', categoryId: 'depends' },
      { id: 'gps26', text: 'Az élek száma páros', categoryId: 'depends' },
      { id: 'gps27', text: 'Bármely két csúcs között van él', categoryId: 'depends' }
    ]
  }
];

const GRAPH_PROPERTIES_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: GRAPH_PROPERTIES_SORTER_LEVELS_LIST[0],
  2: GRAPH_PROPERTIES_SORTER_LEVELS_LIST[1],
  3: GRAPH_PROPERTIES_SORTER_LEVELS_LIST[2]
};

export const GraphPropertiesSorter: React.FC<GraphPropertiesSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-comb-grafok-jellemzoi-sorter',
  topicTitle = '8. Gráfok jellemzői – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="kombinatorika-grafok"
      topicId={topicId}
      subtopicId="grafok-jellemzoi"
      title={topicTitle}
      subtitle="Rendszerezd a gráf részeit, döntsd el, létezik-e adott fokszámú gráf, és válogasd szét az állításokat!"
      levels={GRAPH_PROPERTIES_SORTER_LEVELS}
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

export default GraphPropertiesSorter;

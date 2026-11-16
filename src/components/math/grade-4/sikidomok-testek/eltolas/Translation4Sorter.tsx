import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface Translation4SorterProps {
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

const TRANSLATION4_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Eltolás, elforgatás vagy nagyítás?',
    description: 'Mi történik a tárggyal? Válogasd szét!',
    categories: [
      { id: 'shift', name: 'Eltolás', color: 'orange' },
      { id: 'rot', name: 'Forgás, elforgatás', color: 'teal' },
      { id: 'scale', name: 'Nagyítás vagy kicsinyítés', color: 'blue' }
    ],
    items: [
      { id: 'trs1', text: 'A tolóajtót kinyitjuk', categoryId: 'shift' },
      { id: 'trs2', text: 'A fiókot kihúzzuk', categoryId: 'shift' },
      { id: 'trs3', text: 'A széket 1 m-rel keletre toljuk', categoryId: 'shift' },
      { id: 'trs4', text: 'A körhinta forog', categoryId: 'rot' },
      { id: 'trs5', text: 'A pörgettyű pörög', categoryId: 'rot' },
      { id: 'trs6', text: 'A földgömböt megpörgetjük', categoryId: 'rot' },
      { id: 'trs7', text: 'A katicát nagyítóval nézzük', categoryId: 'scale' },
      { id: 'trs8', text: 'A vetítő képe a falon', categoryId: 'scale' },
      { id: 'trs9', text: 'A város térképe', categoryId: 'scale' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Világtáj vagy nem?',
    description: 'Fővilágtáj, mellékvilágtáj, vagy egyik sem?',
    categories: [
      { id: 'main', name: 'Fővilágtáj', color: 'rose' },
      { id: 'side', name: 'Mellékvilágtáj', color: 'amber' },
      { id: 'none', name: 'Nem világtáj', color: 'slate' }
    ],
    items: [
      { id: 'trs10', text: 'észak', categoryId: 'main' },
      { id: 'trs11', text: 'kelet', categoryId: 'main' },
      { id: 'trs12', text: 'NY', categoryId: 'main' },
      { id: 'trs13', text: 'délnyugat', categoryId: 'side' },
      { id: 'trs14', text: 'ÉK', categoryId: 'side' },
      { id: 'trs15', text: 'délkelet', categoryId: 'side' },
      { id: 'trs16', text: 'jobbra', categoryId: 'none' },
      { id: 'trs17', text: 'lefelé', categoryId: 'none' },
      { id: 'trs18', text: 'előre', categoryId: 'none' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hová kerül a radír?',
    description: 'Kövesd a lépéseket! A radír visszaér a helyére, keletebbre vagy nyugatabbra kerül?',
    categories: [
      { id: 'home', name: 'Visszaér a helyére', color: 'emerald' },
      { id: 'east', name: 'Keletebbre kerül', color: 'orange' },
      { id: 'west', name: 'Nyugatabbra kerül', color: 'purple' }
    ],
    items: [
      { id: 'trs19', text: '3 cm keletre, majd 3 cm nyugatra', categoryId: 'home' },
      { id: 'trs20', text: '2 cm északra, majd 2 cm délre', categoryId: 'home' },
      { id: 'trs21', text: '2 lépés északkeletre, majd 2 lépés délnyugatra', categoryId: 'home' },
      { id: 'trs22', text: '5 cm keletre, majd 2 cm nyugatra', categoryId: 'east' },
      { id: 'trs23', text: '1 cm keletre', categoryId: 'east' },
      { id: 'trs24', text: '1 lépés északkeletre, majd 1 lépés délre', categoryId: 'east' },
      { id: 'trs25', text: '4 cm nyugatra, majd 1 cm keletre', categoryId: 'west' },
      { id: 'trs26', text: '3 lépés délnyugatra, majd 3 lépés északra', categoryId: 'west' },
      { id: 'trs27', text: '2 cm nyugatra, 2 cm északra, majd 2 cm délre', categoryId: 'west' }
    ]
  }
];

const TRANSLATION4_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: TRANSLATION4_SORTER_LEVELS_LIST[0],
  2: TRANSLATION4_SORTER_LEVELS_LIST[1],
  3: TRANSLATION4_SORTER_LEVELS_LIST[2]
};

export const Translation4Sorter: React.FC<Translation4SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-geom-eltolas-sorter',
  topicTitle = '6. Eltolás – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="sikidomok-testek"
      topicId={topicId}
      subtopicId="eltolas"
      title={topicTitle}
      subtitle="Rendszerezd a mozgásokat, a világtájakat és az eltolások eredményét!"
      levels={TRANSLATION4_SORTER_LEVELS}
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

export default Translation4Sorter;

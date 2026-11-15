import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface MidpointSorterProps {
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

const MIDPOINT_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Melyik képlet kell?',
    description: 'Döntsd el, melyik összefüggéssel kapod meg a keresett pontot!',
    categories: [
      { id: 'mid', name: 'Felezőpont: (A + B)/2', color: 'blue' },
      { id: 'double', name: 'Kétszeres pont mínusz pont: 2F − A', color: 'purple' },
      { id: 'sum', name: 'Összeg és különbség: A + C − B', color: 'emerald' }
    ],
    items: [
      { id: 'mps1', text: 'Mozgólépcső: hol van az utas az út felénél?', categoryId: 'mid' },
      { id: 'mps2', text: 'Négyzet középpontja két szemközti csúcsából', categoryId: 'mid' },
      { id: 'mps3', text: 'Háromszög egyik oldalfelező pontja', categoryId: 'mid' },
      { id: 'mps4', text: 'Szakasz másik végpontja a felezőpontból és az egyik végpontból', categoryId: 'double' },
      { id: 'mps5', text: 'Egy pont tükrözése egy másik pontra', categoryId: 'double' },
      { id: 'mps6', text: 'Szakasz meghosszabbítása a saját hosszával', categoryId: 'double' },
      { id: 'mps7', text: 'Paralelogramma negyedik csúcsa három csúcsából', categoryId: 'sum' },
      { id: 'mps8', text: 'Háromszög csúcsa a három oldalfelező pontból', categoryId: 'sum' },
      { id: 'mps9', text: 'Az →a és →b által kifeszített AOBP paralelogramma P csúcsa', categoryId: 'sum' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Hol van a pont? (A(0; 0), B(8; 4))',
    description: 'Az AB egyenes pontjainál a második koordináta az első fele. Hová esik a pont?',
    categories: [
      { id: 'in', name: 'Az AB szakasz belső pontja', color: 'emerald' },
      { id: 'out', name: 'Az AB egyenesén, de a szakaszon kívül', color: 'amber' },
      { id: 'no', name: 'Nincs rajta az AB egyenesen', color: 'rose' }
    ],
    items: [
      { id: 'mps10', text: '(4; 2)', categoryId: 'in' },
      { id: 'mps11', text: '(2; 1)', categoryId: 'in' },
      { id: 'mps12', text: '(6; 3)', categoryId: 'in' },
      { id: 'mps13', text: '(16; 8)', categoryId: 'out' },
      { id: 'mps14', text: '(−4; −2)', categoryId: 'out' },
      { id: 'mps15', text: '(10; 5)', categoryId: 'out' },
      { id: 'mps16', text: '(4; 3)', categoryId: 'no' },
      { id: 'mps17', text: '(8; 0)', categoryId: 'no' },
      { id: 'mps18', text: '(−2; 1)', categoryId: 'no' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Igaz vagy hamis?',
    description: 'Válogasd szét az állításokat!',
    categories: [
      { id: 'true', name: 'Mindig igaz', color: 'emerald' },
      { id: 'false', name: 'Hamis', color: 'rose' },
      { id: 'depends', name: 'A konkrét pontoktól függ', color: 'amber' }
    ],
    items: [
      { id: 'mps19', text: 'Az AB és a BA szakasz felezőpontja ugyanaz a pont', categoryId: 'true' },
      { id: 'mps20', text: 'A háromszög súlypontja a csúcsok koordinátáinak átlaga', categoryId: 'true' },
      { id: 'mps21', text: 'Ha F az AB felezőpontja, akkor B = 2F − A', categoryId: 'true' },
      { id: 'mps22', text: 'A felezőpont koordinátái a végpontok koordinátái különbségének felei', categoryId: 'false' },
      { id: 'mps23', text: 'Az AB felezőpontjának helyvektora →a + →b', categoryId: 'false' },
      { id: 'mps24', text: 'A súlypont felezi a súlyvonalakat', categoryId: 'false' },
      { id: 'mps25', text: 'Az AB felezőpontja rajta van valamelyik koordinátatengelyen', categoryId: 'depends' },
      { id: 'mps26', text: 'A felezőpont mindkét koordinátája egész szám', categoryId: 'depends' },
      { id: 'mps27', text: 'A felezőpont közelebb van az origóhoz, mint A és B', categoryId: 'depends' }
    ]
  }
];

const MIDPOINT_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: MIDPOINT_SORTER_LEVELS_LIST[0],
  2: MIDPOINT_SORTER_LEVELS_LIST[1],
  3: MIDPOINT_SORTER_LEVELS_LIST[2]
};

export const MidpointSorter: React.FC<MidpointSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-geo-felezopont-sorter',
  topicTitle = '7. Felezőpont – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="koordinatageometria"
      topicId={topicId}
      subtopicId="felezopont"
      title={topicTitle}
      subtitle="Rendszerezd, melyik képlet kell, hová esik egy pont a szakaszhoz képest, és mely állítások igazak!"
      levels={MIDPOINT_SORTER_LEVELS}
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

export default MidpointSorter;

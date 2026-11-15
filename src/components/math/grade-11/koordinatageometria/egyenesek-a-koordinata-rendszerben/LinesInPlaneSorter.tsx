import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface LinesInPlaneSorterProps {
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

const LINES_IN_PLANE_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Milyen helyzetű az egyenes?',
    description: 'Válogasd szét az egyeneseket a koordinátatengelyekhez viszonyított helyzetük szerint!',
    categories: [
      { id: 'vert', name: 'Az x tengelyre merőleges (x = a)', color: 'blue' },
      { id: 'horiz', name: 'Az y tengelyre merőleges (y = b)', color: 'rose' },
      { id: 'gen', name: 'Mindkét tengelyt metszi (y = ax + b)', color: 'purple' }
    ],
    items: [
      { id: 'lips1', text: 'x = 7', categoryId: 'vert' },
      { id: 'lips2', text: 'x = −4', categoryId: 'vert' },
      { id: 'lips3', text: 'Minden pontjának első koordinátája −1', categoryId: 'vert' },
      { id: 'lips4', text: 'y = 2', categoryId: 'horiz' },
      { id: 'lips5', text: 'y = −3', categoryId: 'horiz' },
      { id: 'lips6', text: 'Az x tengely', categoryId: 'horiz' },
      { id: 'lips7', text: 'y = x', categoryId: 'gen' },
      { id: 'lips8', text: 'y = −x − 5', categoryId: 'gen' },
      { id: 'lips9', text: 'y = x + 5', categoryId: 'gen' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Melyik egyenesen van a pont?',
    description: 'Helyettesítsd be a pont koordinátáit mindkét egyenletbe!',
    categories: [
      { id: 'l1', name: 'Az y = −x + 1 egyenesen', color: 'emerald' },
      { id: 'l2', name: 'Az y = x − 5 egyenesen', color: 'blue' },
      { id: 'none', name: 'Egyiken sincs rajta', color: 'rose' }
    ],
    items: [
      { id: 'lips10', text: '(−4; 5)', categoryId: 'l1' },
      { id: 'lips11', text: '(5; −4)', categoryId: 'l1' },
      { id: 'lips12', text: '(100; −99)', categoryId: 'l1' },
      { id: 'lips13', text: '(−1; −6)', categoryId: 'l2' },
      { id: 'lips14', text: '(5; 0)', categoryId: 'l2' },
      { id: 'lips15', text: '(2; −3)', categoryId: 'l2' },
      { id: 'lips16', text: '(2; 2)', categoryId: 'none' },
      { id: 'lips17', text: '(871; −866)', categoryId: 'none' },
      { id: 'lips18', text: '(−1; 3)', categoryId: 'none' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Irányvektor vagy normálvektor? (y = 2x + 1)',
    description: 'Döntsd el, hogy a vektor párhuzamos, merőleges, vagy egyik sem az y = 2x + 1 egyenesre!',
    categories: [
      { id: 'dir', name: 'Irányvektor (párhuzamos)', color: 'blue' },
      { id: 'norm', name: 'Normálvektor (merőleges)', color: 'rose' },
      { id: 'neither', name: 'Egyik sem', color: 'amber' }
    ],
    items: [
      { id: 'lips19', text: '(1; 2)', categoryId: 'dir' },
      { id: 'lips20', text: '(2; 4)', categoryId: 'dir' },
      { id: 'lips21', text: '(−1; −2)', categoryId: 'dir' },
      { id: 'lips22', text: '(−2; 1)', categoryId: 'norm' },
      { id: 'lips23', text: '(2; −1)', categoryId: 'norm' },
      { id: 'lips24', text: '(4; −2)', categoryId: 'norm' },
      { id: 'lips25', text: '(2; 1)', categoryId: 'neither' },
      { id: 'lips26', text: '(1; −2)', categoryId: 'neither' },
      { id: 'lips27', text: '(0; 1)', categoryId: 'neither' }
    ]
  }
];

const LINES_IN_PLANE_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: LINES_IN_PLANE_SORTER_LEVELS_LIST[0],
  2: LINES_IN_PLANE_SORTER_LEVELS_LIST[1],
  3: LINES_IN_PLANE_SORTER_LEVELS_LIST[2]
};

export const LinesInPlaneSorter: React.FC<LinesInPlaneSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-geo-egyenes-iranyvektor-sorter',
  topicTitle = '9. Egyenesek a koordináta-rendszerben – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="koordinatageometria"
      topicId={topicId}
      subtopicId="egyenesek-a-koordinata-rendszerben"
      title={topicTitle}
      subtitle="Rendszerezd az egyeneseket helyzetük szerint, döntsd el, melyik pont melyik egyenesen van, és válogasd szét az irány- és normálvektorokat!"
      levels={LINES_IN_PLANE_SORTER_LEVELS}
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

export default LinesInPlaneSorter;

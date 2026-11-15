import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface LineEquationSorterProps {
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

const LINE_EQUATION_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Milyen helyzetű az egyenes?',
    description: 'Döntsd el az egyenletből, hogyan helyezkedik el az egyenes!',
    categories: [
      { id: 'origin', name: 'Átmegy az origón (y = mx, m ≠ 0)', color: 'blue' },
      { id: 'horiz', name: 'Párhuzamos az x tengellyel (y = b, b ≠ 0)', color: 'emerald' },
      { id: 'vert', name: 'Párhuzamos az y tengellyel (x = c, c ≠ 0)', color: 'amber' }
    ],
    items: [
      { id: 'les1', text: 'y = −3x', categoryId: 'origin' },
      { id: 'les2', text: 'y = 0,5x', categoryId: 'origin' },
      { id: 'les3', text: 'y = x', categoryId: 'origin' },
      { id: 'les4', text: 'y = 3', categoryId: 'horiz' },
      { id: 'les5', text: 'y = −8', categoryId: 'horiz' },
      { id: 'les6', text: 'y = 9,7', categoryId: 'horiz' },
      { id: 'les7', text: 'x = 2', categoryId: 'vert' },
      { id: 'les8', text: 'x = −2', categoryId: 'vert' },
      { id: 'les9', text: 'x = 15', categoryId: 'vert' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Rajta van-e a pont az y = 2x − 1 egyenesen?',
    description: 'Helyettesítsd be az első koordinátát, és hasonlítsd össze a kapott értéket a második koordinátával!',
    categories: [
      { id: 'on', name: 'Rajta van az egyenesen', color: 'emerald' },
      { id: 'above', name: 'Az egyenes fölött van (y > 2x − 1)', color: 'blue' },
      { id: 'below', name: 'Az egyenes alatt van (y < 2x − 1)', color: 'rose' }
    ],
    items: [
      { id: 'les10', text: '(0; −1)', categoryId: 'on' },
      { id: 'les11', text: '(2; 3)', categoryId: 'on' },
      { id: 'les12', text: '(−1; −3)', categoryId: 'on' },
      { id: 'les13', text: '(0; 0)', categoryId: 'above' },
      { id: 'les14', text: '(1; 5)', categoryId: 'above' },
      { id: 'les15', text: '(−2; 0)', categoryId: 'above' },
      { id: 'les16', text: '(3; 2)', categoryId: 'below' },
      { id: 'les17', text: '(1; 0)', categoryId: 'below' },
      { id: 'les18', text: '(0; −4)', categoryId: 'below' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Milyen alakú a két pontra illeszkedő egyenes egyenlete?',
    description: 'Vizsgáld meg a két pont koordinátáit!',
    categories: [
      { id: 'slant', name: 'y = mx + b, ahol m ≠ 0', color: 'purple' },
      { id: 'yb', name: 'y = b alakú', color: 'emerald' },
      { id: 'xc', name: 'x = c alakú', color: 'amber' }
    ],
    items: [
      { id: 'les19', text: '(2; 0) és (4; 6)', categoryId: 'slant' },
      { id: 'les20', text: '(−1; 1) és (5; 13)', categoryId: 'slant' },
      { id: 'les21', text: '(4; −8) és (−3; 6)', categoryId: 'slant' },
      { id: 'les22', text: '(−3; 1) és (4,7; 1)', categoryId: 'yb' },
      { id: 'les23', text: '(1; −8) és (−8; −8)', categoryId: 'yb' },
      { id: 'les24', text: '(0; 0) és (5; 0)', categoryId: 'yb' },
      { id: 'les25', text: '(3; −2) és (3; 3,7)', categoryId: 'xc' },
      { id: 'les26', text: '(0; 5) és (0; −1)', categoryId: 'xc' },
      { id: 'les27', text: '(−2; 7,5) és (−2; −13)', categoryId: 'xc' }
    ]
  }
];

const LINE_EQUATION_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: LINE_EQUATION_SORTER_LEVELS_LIST[0],
  2: LINE_EQUATION_SORTER_LEVELS_LIST[1],
  3: LINE_EQUATION_SORTER_LEVELS_LIST[2]
};

export const LineEquationSorter: React.FC<LineEquationSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-geo-egyenes-egyenlete-sorter',
  topicTitle = '10. Az egyenes egyenlete – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="koordinatageometria"
      topicId={topicId}
      subtopicId="az-egyenes-egyenlete"
      title={topicTitle}
      subtitle="Rendszerezd az egyeneseket helyzetük szerint, döntsd el a pontokról, rajta vannak-e az egyenesen, és ismerd fel az egyenlet alakját két pontból!"
      levels={LINE_EQUATION_SORTER_LEVELS}
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

export default LineEquationSorter;

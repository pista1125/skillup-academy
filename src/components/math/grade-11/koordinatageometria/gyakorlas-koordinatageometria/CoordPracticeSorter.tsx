import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CoordPracticeSorterProps {
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

const COORD_PRACTICE_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Melyik nevezetes vonal?',
    description: 'Döntsd el, melyik nevezetes vonalra igaz az állítás!',
    categories: [
      { id: 'alt', name: 'Magasságvonal', color: 'rose' },
      { id: 'bis', name: 'Oldalfelező merőleges', color: 'emerald' },
      { id: 'med', name: 'Súlyvonal', color: 'amber' }
    ],
    items: [
      { id: 'cps1', text: 'Átmegy a csúcson, és merőleges a szemközti oldalra', categoryId: 'alt' },
      { id: 'cps2', text: 'A három ilyen egyenes a magasságpontban metszi egymást', categoryId: 'alt' },
      { id: 'cps3', text: 'A(−2; −2), B(7; 1), C(5; 5): 3x + y = 20', categoryId: 'alt' },
      { id: 'cps4', text: 'Átmegy az oldal felezőpontján, és merőleges az oldalra', categoryId: 'bis' },
      { id: 'cps5', text: 'Minden pontja egyenlő távol van az oldal két végpontjától', categoryId: 'bis' },
      { id: 'cps6', text: 'A(−2; −2), B(7; 1): 3x + y = 7', categoryId: 'bis' },
      { id: 'cps7', text: 'Átmegy a csúcson és a szemközti oldal felezőpontján', categoryId: 'med' },
      { id: 'cps8', text: 'A három ilyen egyenes a súlypontban metszi egymást', categoryId: 'med' },
      { id: 'cps9', text: 'A(−2; −2), B(7; 1), C(5; 5): 11x − 5y = 30', categoryId: 'med' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Az e: 3x − 5y = 7 egyenes és társai',
    description: 'Milyen helyzetű az egyenes az e: 3x − 5y = 7 egyeneshez képest?',
    categories: [
      { id: 'par', name: 'Párhuzamos e-vel (nem azonos)', color: 'blue' },
      { id: 'same', name: 'Egybeesik e-vel', color: 'purple' },
      { id: 'perp', name: 'Merőleges e-re', color: 'emerald' }
    ],
    items: [
      { id: 'cps10', text: '−9x + 15y = 10', categoryId: 'par' },
      { id: 'cps11', text: '3x − 5y = 0', categoryId: 'par' },
      { id: 'cps12', text: 'y = 0,6x + 2', categoryId: 'par' },
      { id: 'cps13', text: '6x − 10y = 14', categoryId: 'same' },
      { id: 'cps14', text: 'y = 0,6x − 1,4', categoryId: 'same' },
      { id: 'cps15', text: '−3x + 5y = −7', categoryId: 'same' },
      { id: 'cps16', text: '10x + 6y = −14', categoryId: 'perp' },
      { id: 'cps17', text: '5x + 3y = 1', categoryId: 'perp' },
      { id: 'cps18', text: 'y = −(5/3)x + 7/3', categoryId: 'perp' }
    ]
  },
  {
    level: 3,
    title: '3. szint: A körülírt kör és a pontok',
    description: 'Az A(−2; −2), B(7; 1), C(5; 5) háromszög körülírt köre (x − 2)² + (y − 1)² = 25. Hol van a pont?',
    categories: [
      { id: 'on', name: 'A körön van', color: 'purple' },
      { id: 'in', name: 'A kör belsejében van', color: 'emerald' },
      { id: 'out', name: 'A körön kívül van', color: 'rose' }
    ],
    items: [
      { id: 'cps19', text: '(−1; 5)', categoryId: 'on' },
      { id: 'cps20', text: '(5; −3)', categoryId: 'on' },
      { id: 'cps21', text: '(−3; 1)', categoryId: 'on' },
      { id: 'cps22', text: 'A magasságpont: M(6; 2)', categoryId: 'in' },
      { id: 'cps23', text: '(4; 4)', categoryId: 'in' },
      { id: 'cps24', text: 'Az origó', categoryId: 'in' },
      { id: 'cps25', text: '(8; 0)', categoryId: 'out' },
      { id: 'cps26', text: '(6; 5)', categoryId: 'out' },
      { id: 'cps27', text: '(7; 4)', categoryId: 'out' }
    ]
  }
];

const COORD_PRACTICE_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: COORD_PRACTICE_SORTER_LEVELS_LIST[0],
  2: COORD_PRACTICE_SORTER_LEVELS_LIST[1],
  3: COORD_PRACTICE_SORTER_LEVELS_LIST[2]
};

export const CoordPracticeSorter: React.FC<CoordPracticeSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-geo-gyakorlas-sorter',
  topicTitle = '16. Gyakorlás – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="koordinatageometria"
      topicId={topicId}
      subtopicId="gyakorlas-koordinatageometria"
      title={topicTitle}
      subtitle="Rendszerezd a háromszög nevezetes vonalait, az egyenesek kölcsönös helyzetét és a pontok helyzetét a körhöz képest!"
      levels={COORD_PRACTICE_SORTER_LEVELS}
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

export default CoordPracticeSorter;

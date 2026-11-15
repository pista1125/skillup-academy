import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PerpendicularParallelSorterProps {
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

const PERPENDICULAR_PARALLEL_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Viszony az y = 2x + 1 egyeneshez',
    description: 'Párhuzamos, merőleges vagy egyik sem?',
    categories: [
      { id: 'par', name: 'Párhuzamos (m = 2)', color: 'emerald' },
      { id: 'perp', name: 'Merőleges (m = −1/2)', color: 'rose' },
      { id: 'none', name: 'Egyik sem', color: 'slate' }
    ],
    items: [
      { id: 'pps1', text: 'y = 2x − 7', categoryId: 'par' },
      { id: 'pps2', text: '2x − y = 3', categoryId: 'par' },
      { id: 'pps3', text: '4x − 2y = 0', categoryId: 'par' },
      { id: 'pps4', text: 'y = −0,5x + 4', categoryId: 'perp' },
      { id: 'pps5', text: 'x + 2y = 6', categoryId: 'perp' },
      { id: 'pps6', text: '2x + 4y = −1', categoryId: 'perp' },
      { id: 'pps7', text: 'y = 0,5x + 1', categoryId: 'none' },
      { id: 'pps8', text: 'y = −2x + 1', categoryId: 'none' },
      { id: 'pps9', text: 'x = 2', categoryId: 'none' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Az e: −4x + 20y = 12 egyenes és társai',
    description: 'Csoportosítsd az egyenleteket az e-hez való viszonyuk szerint (mₑ = 1/5)!',
    categories: [
      { id: 'par', name: 'Párhuzamos vagy egybeeső', color: 'emerald' },
      { id: 'perp', name: 'Merőleges', color: 'rose' },
      { id: 'none', name: 'Egyik sem', color: 'slate' }
    ],
    items: [
      { id: 'pps10', text: '−x + 5y = 2', categoryId: 'par' },
      { id: 'pps11', text: '2x − 10y = −6', categoryId: 'par' },
      { id: 'pps12', text: 'y = 0,2x − 3', categoryId: 'par' },
      { id: 'pps13', text: '10x + 2y = −5', categoryId: 'perp' },
      { id: 'pps14', text: '−40x − 8y = 20', categoryId: 'perp' },
      { id: 'pps15', text: 'y = −5x', categoryId: 'perp' },
      { id: 'pps16', text: '−40x + 8y = 20', categoryId: 'none' },
      { id: 'pps17', text: 'y = −0,2x + 1', categoryId: 'none' },
      { id: 'pps18', text: 'y = 5x − 1', categoryId: 'none' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mit állapít meg a számolás?',
    description: 'Mi következik a meredekségekről mondottakból?',
    categories: [
      { id: 'parallel', name: 'Párhuzamosság (egyenlő m)', color: 'blue' },
      { id: 'perpendicular', name: 'Merőlegesség (m₁ · m₂ = −1)', color: 'purple' },
      { id: 'neither', name: 'Egyik sem teljesül', color: 'amber' }
    ],
    items: [
      { id: 'pps19', text: 'm_AB = 1/2 és m_DC = 1/2', categoryId: 'parallel' },
      { id: 'pps20', text: '2x + 5y = −1 és 0,8x = 1 − 2y', categoryId: 'parallel' },
      { id: 'pps21', text: 'Párhuzamos meteorpályák: mₑ = m_f', categoryId: 'parallel' },
      { id: 'pps22', text: 'm_AC = 1 és m_BD = −1', categoryId: 'perpendicular' },
      { id: 'pps23', text: '4x − 3y = 12 és 6x + 8y = 5', categoryId: 'perpendicular' },
      { id: 'pps24', text: '6x − 15y = 2 és 9x + 3,6y = 5', categoryId: 'perpendicular' },
      { id: 'pps25', text: 'm_AB = 1/2 és m_BC = 2', categoryId: 'neither' },
      { id: 'pps26', text: '2x + 5y = −1 és 6x + 8y = 5', categoryId: 'neither' },
      { id: 'pps27', text: 'm₁ = 2/5 és m₂ = 5/2', categoryId: 'neither' }
    ]
  }
];

const PERPENDICULAR_PARALLEL_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: PERPENDICULAR_PARALLEL_SORTER_LEVELS_LIST[0],
  2: PERPENDICULAR_PARALLEL_SORTER_LEVELS_LIST[1],
  3: PERPENDICULAR_PARALLEL_SORTER_LEVELS_LIST[2]
};

export const PerpendicularParallelSorter: React.FC<PerpendicularParallelSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-geo-meroleges-parhuzamos-sorter',
  topicTitle = '15. Merőleges, párhuzamos egyenesek – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="koordinatageometria"
      topicId={topicId}
      subtopicId="meroleges-parhuzamos-egyenesek"
      title={topicTitle}
      subtitle="Rendszerezd az egyeneseket aszerint, hogy párhuzamosak, merőlegesek vagy egyik sem!"
      levels={PERPENDICULAR_PARALLEL_SORTER_LEVELS}
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

export default PerpendicularParallelSorter;

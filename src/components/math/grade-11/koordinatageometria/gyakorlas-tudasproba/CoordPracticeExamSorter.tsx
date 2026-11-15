import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CoordPracticeExamSorterProps {
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

const COORD_PRACTICE_EXAM_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Melyik témakör?',
    description: 'Sorold a képletet vagy fogalmat a fejezet megfelelő témaköréhez!',
    categories: [
      { id: 'vec', name: 'Vektorok', color: 'blue' },
      { id: 'line', name: 'Az egyenes', color: 'rose' },
      { id: 'circle', name: 'A kör', color: 'purple' }
    ],
    items: [
      { id: 'cpes1', text: '→v = m→a + n→b felbontás', categoryId: 'vec' },
      { id: 'cpes2', text: '+90°-os elforgatás: (−a₂; a₁)', categoryId: 'vec' },
      { id: 'cpes3', text: '|→a| = √(a₁² + a₂²)', categoryId: 'vec' },
      { id: 'cpes4', text: 'y = mx + b', categoryId: 'line' },
      { id: 'cpes5', text: 'Iránytangens: m = tg α', categoryId: 'line' },
      { id: 'cpes6', text: 'Merőlegesség: m₁ · m₂ = −1', categoryId: 'line' },
      { id: 'cpes7', text: '(x − u)² + (y − v)² = r²', categoryId: 'circle' },
      { id: 'cpes8', text: 'Thalész-tétel: a középpont az átfogó felezőpontja', categoryId: 'circle' },
      { id: 'cpes9', text: 'Az érintő merőleges az érintési pontba húzott sugárra', categoryId: 'circle' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Vektorpárok',
    description: 'Milyen helyzetű a két vektor egymáshoz képest?',
    categories: [
      { id: 'par', name: 'Párhuzamos', color: 'blue' },
      { id: 'perp', name: 'Merőleges', color: 'emerald' },
      { id: 'none', name: 'Egyik sem', color: 'amber' }
    ],
    items: [
      { id: 'cpes10', text: '(2; −3) és (−4; 6)', categoryId: 'par' },
      { id: 'cpes11', text: '(1; 4) és (3; 12)', categoryId: 'par' },
      { id: 'cpes12', text: '(5; −2) és (−2,5; 1)', categoryId: 'par' },
      { id: 'cpes13', text: '(2; −3) és (3; 2)', categoryId: 'perp' },
      { id: 'cpes14', text: '(1; 4) és (−4; 1)', categoryId: 'perp' },
      { id: 'cpes15', text: '(6; 4) és (−2; 3)', categoryId: 'perp' },
      { id: 'cpes16', text: '(1; 1) és (1; 2)', categoryId: 'none' },
      { id: 'cpes17', text: '(3; 4) és (4; 3)', categoryId: 'none' },
      { id: 'cpes18', text: '(2; −3) és (−3; 2)', categoryId: 'none' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Egyenes és az x² + y² = 25 kör',
    description: 'Hány közös pontja van az egyenesnek az x² + y² = 25 körrel?',
    categories: [
      { id: 'two', name: 'Szelő (2 közös pont)', color: 'purple' },
      { id: 'one', name: 'Érintő (1 közös pont)', color: 'emerald' },
      { id: 'zero', name: 'Nincs közös pont', color: 'rose' }
    ],
    items: [
      { id: 'cpes19', text: 'y = x + 1', categoryId: 'two' },
      { id: 'cpes20', text: 'y = 0', categoryId: 'two' },
      { id: 'cpes21', text: 'x = 3', categoryId: 'two' },
      { id: 'cpes22', text: '3x + 4y = 25', categoryId: 'one' },
      { id: 'cpes23', text: 'x = 5', categoryId: 'one' },
      { id: 'cpes24', text: 'y = −5', categoryId: 'one' },
      { id: 'cpes25', text: 'y = x + 10', categoryId: 'zero' },
      { id: 'cpes26', text: 'x = 6', categoryId: 'zero' },
      { id: 'cpes27', text: 'y = 7', categoryId: 'zero' }
    ]
  }
];

const COORD_PRACTICE_EXAM_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: COORD_PRACTICE_EXAM_SORTER_LEVELS_LIST[0],
  2: COORD_PRACTICE_EXAM_SORTER_LEVELS_LIST[1],
  3: COORD_PRACTICE_EXAM_SORTER_LEVELS_LIST[2]
};

export const CoordPracticeExamSorter: React.FC<CoordPracticeExamSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-geo-tudasproba-sorter',
  topicTitle = '17. Gyakorlás, tudáspróba – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="koordinatageometria"
      topicId={topicId}
      subtopicId="gyakorlas-tudasproba"
      title={topicTitle}
      subtitle="Rendszerezd a fejezet képleteit, a vektorpárok helyzetét és a kör–egyenes kapcsolatokat!"
      levels={COORD_PRACTICE_EXAM_SORTER_LEVELS}
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

export default CoordPracticeExamSorter;

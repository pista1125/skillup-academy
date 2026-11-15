import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface G11NumberSetsSorterProps {
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

const NUMBER_SETS_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Melyik a legszűkebb számhalmaz?',
    description: 'Egyszerűsíts, és sorold be a számot a legszűkebb halmaz szerint!',
    categories: [
      { id: 'nat', name: 'Természetes szám (N)', color: 'violet' },
      { id: 'int', name: 'Egész, de nem természetes', color: 'blue' },
      { id: 'rat', name: 'Racionális, de nem egész', color: 'emerald' }
    ],
    items: [
      { id: 'nss1', text: '12/2', categoryId: 'nat' },
      { id: 'nss2', text: '0', categoryId: 'nat' },
      { id: 'nss3', text: '(−10)/(−5)', categoryId: 'nat' },
      { id: 'nss4', text: '−4', categoryId: 'int' },
      { id: 'nss5', text: '−5/5', categoryId: 'int' },
      { id: 'nss6', text: '−8/4', categoryId: 'int' },
      { id: 'nss7', text: '2,3', categoryId: 'rat' },
      { id: 'nss8', text: '8/7', categoryId: 'rat' },
      { id: 'nss9', text: '−46,071', categoryId: 'rat' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Hová kerül a művelet eredménye?',
    description: 'Végezd el a műveletet, és sorold be az eredményt!',
    categories: [
      { id: 'nat', name: 'Természetes szám', color: 'violet' },
      { id: 'int', name: 'Egész, de nem természetes', color: 'blue' },
      { id: 'rat', name: 'Racionális, de nem egész', color: 'emerald' }
    ],
    items: [
      { id: 'nss10', text: '7 + 5', categoryId: 'nat' },
      { id: 'nss11', text: '4 · 6', categoryId: 'nat' },
      { id: 'nss12', text: '−9 : (−3)', categoryId: 'nat' },
      { id: 'nss13', text: '1 − 3', categoryId: 'int' },
      { id: 'nss14', text: '−9 : 3', categoryId: 'int' },
      { id: 'nss15', text: '0 − 7', categoryId: 'int' },
      { id: 'nss16', text: '3 : (−2)', categoryId: 'rat' },
      { id: 'nss17', text: '1 : 2', categoryId: 'rat' },
      { id: 'nss18', text: '2,3 + 1', categoryId: 'rat' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Milyen a tizedes tört alak?',
    description: 'Egyszerűsíts, vizsgáld meg a nevezőt, és sorold be a törtet!',
    categories: [
      { id: 'whole', name: 'Egész szám', color: 'slate' },
      { id: 'fin', name: 'Véges tizedes tört (nem egész)', color: 'teal' },
      { id: 'rep', name: 'Végtelen szakaszos tizedes tört', color: 'rose' }
    ],
    items: [
      { id: 'nss19', text: '7/7', categoryId: 'whole' },
      { id: 'nss20', text: '0,9̇', categoryId: 'whole' },
      { id: 'nss21', text: '54/9', categoryId: 'whole' },
      { id: 'nss22', text: '63/35', categoryId: 'fin' },
      { id: 'nss23', text: '3/60', categoryId: 'fin' },
      { id: 'nss24', text: '45/72', categoryId: 'fin' },
      { id: 'nss25', text: '25/15', categoryId: 'rep' },
      { id: 'nss26', text: '18/14', categoryId: 'rep' },
      { id: 'nss27', text: '2111/990', categoryId: 'rep' }
    ]
  }
};

export const G11NumberSetsSorter: React.FC<G11NumberSetsSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-num-szamhalmazok-sorter',
  topicTitle = '1. Számhalmazok – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="szamelmelet"
      topicId={topicId}
      subtopicId="szamhalmazok"
      title={topicTitle}
      subtitle="Rendszerezd a számokat a számhalmazok és a tizedes tört alakjuk szerint!"
      levels={NUMBER_SETS_SORTER_LEVELS}
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

export default G11NumberSetsSorter;

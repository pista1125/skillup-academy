import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SpatialDistanceSorterProps {
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

const SPATIAL_DISTANCE_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: A kocka éleinek helyzete',
    description: 'Az ABCDEFGH kockában (ABCD alul, E az A fölött) hogyan helyezkedik el az adott él az AB élhez képest?',
    categories: [
      { id: 'par', name: 'párhuzamos AB-vel', color: 'blue' },
      { id: 'met', name: 'metszi AB-t', color: 'emerald' },
      { id: 'kit', name: 'kitérő AB-hez', color: 'amber' }
    ],
    items: [
      { id: 'sds1', text: 'DC él', categoryId: 'par' },
      { id: 'sds2', text: 'EF él', categoryId: 'par' },
      { id: 'sds3', text: 'HG él', categoryId: 'par' },
      { id: 'sds4', text: 'AD él', categoryId: 'met' },
      { id: 'sds5', text: 'BF él', categoryId: 'met' },
      { id: 'sds6', text: 'AE él', categoryId: 'met' },
      { id: 'sds7', text: 'CG él', categoryId: 'kit' },
      { id: 'sds8', text: 'EH él', categoryId: 'kit' },
      { id: 'sds9', text: 'DH él', categoryId: 'kit' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Él, lapátló vagy testátló?',
    description: 'Az ABCDEFGH kocka két csúcsát összekötő szakasz mi a testben?',
    categories: [
      { id: 'el', name: 'él', color: 'slate' },
      { id: 'lap', name: 'lapátló', color: 'emerald' },
      { id: 'test', name: 'testátló', color: 'rose' }
    ],
    items: [
      { id: 'sds10', text: 'AB', categoryId: 'el' },
      { id: 'sds11', text: 'CG', categoryId: 'el' },
      { id: 'sds12', text: 'EH', categoryId: 'el' },
      { id: 'sds13', text: 'AC', categoryId: 'lap' },
      { id: 'sds14', text: 'AF', categoryId: 'lap' },
      { id: 'sds15', text: 'BG', categoryId: 'lap' },
      { id: 'sds16', text: 'AG', categoryId: 'test' },
      { id: 'sds17', text: 'BH', categoryId: 'test' },
      { id: 'sds18', text: 'CE', categoryId: 'test' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Mekkora a távolság?',
    description: 'A 6 cm élű ABCDEFGH kockában csoportosítsd a térelempárokat a távolságuk szerint!',
    categories: [
      { id: 'zero', name: '0 (van közös pontjuk)', color: 'slate' },
      { id: 'edge', name: '6 cm (élhossz)', color: 'blue' },
      { id: 'face', name: '6√2 cm (lapátló)', color: 'purple' }
    ],
    items: [
      { id: 'sds19', text: 'az AB él és a BC él', categoryId: 'zero' },
      { id: 'sds20', text: 'az ABCD lap és az AG testátló', categoryId: 'zero' },
      { id: 'sds21', text: 'az E csúcs és az AEHD lap', categoryId: 'zero' },
      { id: 'sds22', text: 'az ABCD és az EFGH lap síkja', categoryId: 'edge' },
      { id: 'sds23', text: 'az AB él és a vele kitérő CG él', categoryId: 'edge' },
      { id: 'sds24', text: 'az A csúcs és a BCGF lap síkja', categoryId: 'edge' },
      { id: 'sds25', text: 'az AB és a HG él', categoryId: 'face' },
      { id: 'sds26', text: 'az A csúcs és a C csúcs', categoryId: 'face' },
      { id: 'sds27', text: 'az AE és a CG él', categoryId: 'face' }
    ]
  }
};

export const SpatialDistanceSorter: React.FC<SpatialDistanceSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g12-ter-terelemek-tavolsaga-sorter',
  topicTitle = '1. Térelemek távolsága (ismétlés) – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={12}
      chapterId="tergeometria"
      topicId={topicId}
      subtopicId="terelemek-tavolsaga-ismetles"
      title={topicTitle}
      subtitle="Rendszerezd a kocka éleit, átlóit és a térelemek távolságait!"
      levels={SPATIAL_DISTANCE_SORTER_LEVELS}
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

export default SpatialDistanceSorter;

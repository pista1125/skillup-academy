import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SpatialAnglesSorterProps {
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

const SPATIAL_ANGLES_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Milyen térelemek szöge?',
    description: 'Csoportosítsd a szögeket aszerint, hogy két egyenes, egyenes és sík, vagy két sík hajlásszöge!',
    categories: [
      { id: 'll', name: 'Két egyenes', color: 'blue' },
      { id: 'lp', name: 'Egyenes és sík', color: 'emerald' },
      { id: 'pp', name: 'Két sík', color: 'purple' }
    ],
    items: [
      { id: 'sas1', text: 'Két pálca a láda két testátlója mentén', categoryId: 'll' },
      { id: 'sas2', text: 'A kocka AF és BD lapátlója', categoryId: 'll' },
      { id: 'sas3', text: 'A testátló és egy oldalél', categoryId: 'll' },
      { id: 'sas4', text: 'Egy létra és a vízszintes talaj', categoryId: 'lp' },
      { id: 'sas5', text: 'A testátló és az alaplap', categoryId: 'lp' },
      { id: 'sas6', text: 'A kocka AG testátlója és a BCGF lap', categoryId: 'lp' },
      { id: 'sas7', text: 'A háztető síkja és a padlásfödém', categoryId: 'pp' },
      { id: 'sas8', text: 'A kocka BDG síkja és az alaplap', categoryId: 'pp' },
      { id: 'sas9', text: 'Az ABGH átlós sík és az alaplap', categoryId: 'pp' }
    ]
  },
  {
    level: 2,
    title: '2. szint: 0°, 90° vagy közte?',
    description: 'Az ABCDEFGH kockában döntsd el a hajlásszöget!',
    categories: [
      { id: 'zero', name: '0° (párhuzamos)', color: 'sky' },
      { id: 'right', name: '90° (merőleges)', color: 'rose' },
      { id: 'between', name: '0° és 90° között', color: 'amber' }
    ],
    items: [
      { id: 'sas10', text: 'AB él és DC él', categoryId: 'zero' },
      { id: 'sas11', text: 'AB él és az EFGH fedőlap', categoryId: 'zero' },
      { id: 'sas12', text: 'ABCD és EFGH lap', categoryId: 'zero' },
      { id: 'sas13', text: 'AE él és az ABCD lap', categoryId: 'right' },
      { id: 'sas14', text: 'ABFE lap és ABCD lap', categoryId: 'right' },
      { id: 'sas15', text: 'ACGE átlós sík és az alaplap', categoryId: 'right' },
      { id: 'sas16', text: 'AG testátló és az alaplap', categoryId: 'between' },
      { id: 'sas17', text: 'BDG sík és az alaplap', categoryId: 'between' },
      { id: 'sas18', text: 'AF lapátló és AB él', categoryId: 'between' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Igaz vagy hamis?',
    description: 'Válogasd szét az állításokat!',
    categories: [
      { id: 'true', name: 'Mindig igaz', color: 'emerald' },
      { id: 'false', name: 'Hamis', color: 'rose' },
      { id: 'depends', name: 'A konkrét adatoktól függ', color: 'amber' }
    ],
    items: [
      { id: 'sas19', text: 'Két sík hajlásszöge legfeljebb 90°', categoryId: 'true' },
      { id: 'sas20', text: 'A téglatest testátlói felezik egymást', categoryId: 'true' },
      { id: 'sas21', text: 'Az egyenes a síkbeli egyenesek közül a vetületével zárja be a legkisebb szöget', categoryId: 'true' },
      { id: 'sas22', text: 'Két egyenes hajlásszöge lehet 120°', categoryId: 'false' },
      { id: 'sas23', text: 'Egy egyenes merőleges a síkra, ha a sík egy egyenesére merőleges', categoryId: 'false' },
      { id: 'sas24', text: 'A kocka két testátlója merőleges egymásra', categoryId: 'false' },
      { id: 'sas25', text: 'A téglatest testátlója 45°-nál nagyobb szöget zár be az alaplappal', categoryId: 'depends' },
      { id: 'sas26', text: 'Egy téglatest két testátlójának szöge 60°', categoryId: 'depends' },
      { id: 'sas27', text: 'Egy 31 cm-es pálca elfér a téglatest alakú ládában', categoryId: 'depends' }
    ]
  }
];

const SPATIAL_ANGLES_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: SPATIAL_ANGLES_SORTER_LEVELS_LIST[0],
  2: SPATIAL_ANGLES_SORTER_LEVELS_LIST[1],
  3: SPATIAL_ANGLES_SORTER_LEVELS_LIST[2]
};

export const SpatialAnglesSorter: React.FC<SpatialAnglesSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g12-ter-hajlasszog-sorter',
  topicTitle = '9. Térelemek hajlásszöge – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={12}
      chapterId="tergeometria"
      topicId={topicId}
      subtopicId="terelemek-hajlasszoge"
      title={topicTitle}
      subtitle="Rendszerezd a térelem-párokat, a nevezetes szögeket és az állításokat!"
      levels={SPATIAL_ANGLES_SORTER_LEVELS}
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

export default SpatialAnglesSorter;

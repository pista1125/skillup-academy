import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface FractionIntro4SorterProps {
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

export const FRACTION_INTRO4_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Fele, harmada vagy negyede?',
    description: 'Válogasd szét a részeket aszerint, hogy az egész fele, 1 harmada vagy 1 negyede!',
    categories: [
      { id: 'half', name: 'fele (1 ketted)', color: 'blue' },
      { id: 'third', name: '1 harmad', color: 'emerald' },
      { id: 'quarter', name: '1 negyed', color: 'amber' }
    ],
    items: [
      { id: 'fis1', text: 'A lengyel zászló piros része', categoryId: 'half' },
      { id: 'fis2', text: 'Egyszer félbehajtott szalvéta', categoryId: 'half' },
      { id: 'fis3', text: '12 bonbonból 6 bonbon', categoryId: 'half' },
      { id: 'fis4', text: 'A francia zászló kék csíkja', categoryId: 'third' },
      { id: 'fis5', text: '3 egyforma szeletre vágott torta egy szelete', categoryId: 'third' },
      { id: 'fis6', text: '12 bonbonból 4 bonbon', categoryId: 'third' },
      { id: 'fis7', text: 'Kétszer félbehajtott szalvéta', categoryId: 'quarter' },
      { id: 'fis8', text: 'Egy rózsaszín rúd a bordó alatt (4 fér el)', categoryId: 'quarter' },
      { id: 'fis9', text: '12 bonbonból 3 bonbon', categoryId: 'quarter' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Egyenlő részek?',
    description: 'Döntsd el, hogy egyenlő részekre osztottuk-e az egészet!',
    categories: [
      { id: 'equal', name: 'Egyenlő részek – törtrészek', color: 'emerald' },
      { id: 'unequal', name: 'Nem egyenlő részek', color: 'rose' },
      { id: 'whole', name: 'Nincs felosztva: 1 egész', color: 'purple' }
    ],
    items: [
      { id: 'fis10', text: 'Pizza 6 egyforma szeletre vágva', categoryId: 'equal' },
      { id: 'fis11', text: 'Csokoládé 10 egyforma kockára törve', categoryId: 'equal' },
      { id: 'fis12', text: 'Négyzet alakú szalvéta átlósan félbehajtva', categoryId: 'equal' },
      { id: 'fis13', text: 'Torta 1 nagy és 3 kicsi szeletre vágva', categoryId: 'unequal' },
      { id: 'fis14', text: 'Alma kettévágva, az egyik darab sokkal nagyobb', categoryId: 'unequal' },
      { id: 'fis15', text: 'Zászló 3 különböző szélességű csíkkal', categoryId: 'unequal' },
      { id: 'fis16', text: 'Egy egész pizza, még nincs felvágva', categoryId: 'whole' },
      { id: 'fis17', text: 'Egyszínű zászló, csíkok nélkül', categoryId: 'whole' },
      { id: 'fis18', text: 'Kibontatlan, egész csokoládé', categoryId: 'whole' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mennyi jut egy gyereknek?',
    description: 'Igazságosan osztoznak. Válogasd szét aszerint, hány darab jut egy gyereknek!',
    categories: [
      { id: 'two', name: '2 darab jut', color: 'blue' },
      { id: 'three', name: '3 darab jut', color: 'teal' },
      { id: 'four', name: '4 darab jut', color: 'amber' }
    ],
    items: [
      { id: 'fis19', text: '12 bonbon, hatan osztoznak', categoryId: 'two' },
      { id: 'fis20', text: '6 alma, hárman osztoznak', categoryId: 'two' },
      { id: 'fis21', text: '10 dió, öten osztoznak', categoryId: 'two' },
      { id: 'fis22', text: '12 bonbon, négyen osztoznak', categoryId: 'three' },
      { id: 'fis23', text: '9 bonbon, hárman osztoznak', categoryId: 'three' },
      { id: 'fis24', text: '15 szem eper, öten osztoznak', categoryId: 'three' },
      { id: 'fis25', text: '12 bonbon, hárman osztoznak', categoryId: 'four' },
      { id: 'fis26', text: '8 keksz, ketten osztoznak', categoryId: 'four' },
      { id: 'fis27', text: '16 cukorka, négyen osztoznak', categoryId: 'four' }
    ]
  }
];

const FRACTION_INTRO4_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: FRACTION_INTRO4_SORTER_LEVELS_LIST[0],
  2: FRACTION_INTRO4_SORTER_LEVELS_LIST[1],
  3: FRACTION_INTRO4_SORTER_LEVELS_LIST[2]
};

export const FractionIntro4Sorter: React.FC<FractionIntro4SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-frac-ertelmezes-sorter',
  topicTitle = '1. A törtrész és a törtek értelmezése – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="tortszamok"
      topicId={topicId}
      subtopicId="tortresz-tortek-ertelmezese"
      title={topicTitle}
      subtitle="Fele, harmada, negyede? Egyenlő részek? Mennyi jut egy gyereknek?"
      levels={FRACTION_INTRO4_SORTER_LEVELS}
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

export default FractionIntro4Sorter;

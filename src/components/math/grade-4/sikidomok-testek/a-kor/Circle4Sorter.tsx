import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface Circle4SorterProps {
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

const CIRCLE4_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: "1. szint: Tudsz vele kört rajzolni?",
    description: "Melyik tárggyal tudsz kört rajzolni?",
    categories: [
      { id: 'yes', name: "Körberajzolva kört kapok", color: 'rose' },
      { id: 'compass', name: "Bármekkora kört rajzolhatok vele", color: 'purple' },
      { id: 'no', name: "Nem tudok vele kört rajzolni", color: 'slate' }
    ],
    items: [
      { id: 'g4-geom-kor-s1', text: "a pohár alja", categoryId: 'yes' },
      { id: 'g4-geom-kor-s2', text: "a termosz alja", categoryId: 'yes' },
      { id: 'g4-geom-kor-s3', text: "egy pénzérme", categoryId: 'yes' },
      { id: 'g4-geom-kor-s4', text: "a körző", categoryId: 'compass' },
      { id: 'g4-geom-kor-s5', text: "egy madzag, egy rajzszeg és egy ceruza", categoryId: 'compass' },
      { id: 'g4-geom-kor-s6', text: "a táblai körző", categoryId: 'compass' },
      { id: 'g4-geom-kor-s7', text: "az olló", categoryId: 'no' },
      { id: 'g4-geom-kor-s8', text: "a derékszögű vonalzó", categoryId: 'no' },
      { id: 'g4-geom-kor-s9', text: "a füzet sarka", categoryId: 'no' }
    ]
  },
  {
    level: 2,
    title: "2. szint: Kör, nem kör vagy sokszög?",
    description: "Tedd a síkidomot a jó csoportba!",
    categories: [
      { id: 'circle', name: "Kör", color: 'rose' },
      { id: 'round', name: "Görbe vonal határolja, de nem kör", color: 'amber' },
      { id: 'poly', name: "Sokszög", color: 'emerald' }
    ],
    items: [
      { id: 'g4-geom-kor-s10', text: "a pénzérme lapja", categoryId: 'circle' },
      { id: 'g4-geom-kor-s11', text: "a körzővel rajzolt alakzat", categoryId: 'circle' },
      { id: 'g4-geom-kor-s12', text: "a gomb lapja", categoryId: 'circle' },
      { id: 'g4-geom-kor-s13', text: "a tojás körvonala", categoryId: 'round' },
      { id: 'g4-geom-kor-s14', text: "ovális tálca", categoryId: 'round' },
      { id: 'g4-geom-kor-s15', text: "a félhold", categoryId: 'round' },
      { id: 'g4-geom-kor-s16', text: "a téglalap", categoryId: 'poly' },
      { id: 'g4-geom-kor-s17', text: "a hatszög", categoryId: 'poly' },
      { id: 'g4-geom-kor-s18', text: "a háromszög", categoryId: 'poly' }
    ]
  },
  {
    level: 3,
    title: "3. szint: Melyik kör nagyobb?",
    description: "Hasonlítsd össze a körzőnyílást 2 cm-rel!",
    categories: [
      { id: 'small', name: "Kisebb, mint 2 cm", color: 'sky' },
      { id: 'same', name: "Pontosan 2 cm", color: 'emerald' },
      { id: 'big', name: "Nagyobb, mint 2 cm", color: 'rose' }
    ],
    items: [
      { id: 'g4-geom-kor-s19', text: "15 mm", categoryId: 'small' },
      { id: 'g4-geom-kor-s20', text: "1 cm 9 mm", categoryId: 'small' },
      { id: 'g4-geom-kor-s21', text: "13 mm", categoryId: 'small' },
      { id: 'g4-geom-kor-s22', text: "20 mm", categoryId: 'same' },
      { id: 'g4-geom-kor-s23', text: "1 cm 10 mm", categoryId: 'same' },
      { id: 'g4-geom-kor-s24', text: "a 4 cm széles kör körzőnyílása", categoryId: 'same' },
      { id: 'g4-geom-kor-s25', text: "25 mm", categoryId: 'big' },
      { id: 'g4-geom-kor-s26', text: "3 cm", categoryId: 'big' },
      { id: 'g4-geom-kor-s27', text: "a 6 cm széles kör körzőnyílása", categoryId: 'big' }
    ]
  }
];

const CIRCLE4_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: CIRCLE4_SORTER_LEVELS_LIST[0],
  2: CIRCLE4_SORTER_LEVELS_LIST[1],
  3: CIRCLE4_SORTER_LEVELS_LIST[2]
};

export const Circle4Sorter: React.FC<Circle4SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-geom-kor-sorter',
  topicTitle = "2. A kör – Csoportosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="sikidomok-testek"
      topicId={topicId}
      subtopicId="a-kor"
      title={topicTitle}
      subtitle="Válogasd szét a tárgyakat, a síkidomokat és a köröket!"
      levels={CIRCLE4_SORTER_LEVELS}
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

export default Circle4Sorter;

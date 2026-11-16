import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface Polygons4SorterProps {
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

const POLYGONS4_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: "1. szint: Hány oldala van?",
    description: "Tedd a síkidomot a jó csoportba!",
    categories: [
      { id: 'three', name: "3 oldalú", color: 'amber' },
      { id: 'four', name: "4 oldalú", color: 'sky' },
      { id: 'more', name: "5 vagy több oldalú", color: 'rose' }
    ],
    items: [
      { id: 'g4-geom-sokszogek-s1', text: "háromszög", categoryId: 'three' },
      { id: 'g4-geom-sokszogek-s2', text: "a félbevágott négyzet egyik fele (átló mentén)", categoryId: 'three' },
      { id: 'g4-geom-sokszogek-s3', text: "3 csúcsú sokszög", categoryId: 'three' },
      { id: 'g4-geom-sokszogek-s4', text: "téglalap", categoryId: 'four' },
      { id: 'g4-geom-sokszogek-s5', text: "négyzet", categoryId: 'four' },
      { id: 'g4-geom-sokszogek-s6', text: "vödör alakú négyszög", categoryId: 'four' },
      { id: 'g4-geom-sokszogek-s7', text: "ötszög", categoryId: 'more' },
      { id: 'g4-geom-sokszogek-s8', text: "L alakú hatszög", categoryId: 'more' },
      { id: 'g4-geom-sokszogek-s9', text: "nyolcszög (stoptábla)", categoryId: 'more' }
    ]
  },
  {
    level: 2,
    title: "2. szint: Milyen szög?",
    description: "Derékszögnél kisebb, derékszög vagy derékszögnél nagyobb?",
    categories: [
      { id: 'less', name: "Derékszögnél kisebb", color: 'sky' },
      { id: 'right', name: "Derékszög", color: 'emerald' },
      { id: 'more', name: "Derékszögnél nagyobb", color: 'rose' }
    ],
    items: [
      { id: 'g4-geom-sokszogek-s10', text: "az óramutatók 1 órakor", categoryId: 'less' },
      { id: 'g4-geom-sokszogek-s11', text: "az óramutatók 2 órakor", categoryId: 'less' },
      { id: 'g4-geom-sokszogek-s12', text: "alig nyitott olló két éle", categoryId: 'less' },
      { id: 'g4-geom-sokszogek-s13', text: "az óramutatók 3 órakor", categoryId: 'right' },
      { id: 'g4-geom-sokszogek-s14', text: "az óramutatók 9 órakor", categoryId: 'right' },
      { id: 'g4-geom-sokszogek-s15', text: "a téglalap bármelyik sarka", categoryId: 'right' },
      { id: 'g4-geom-sokszogek-s16', text: "az óramutatók 4 órakor", categoryId: 'more' },
      { id: 'g4-geom-sokszogek-s17', text: "az óramutatók 5 órakor", categoryId: 'more' },
      { id: 'g4-geom-sokszogek-s18', text: "az L alakú sokszög beugró sarka", categoryId: 'more' }
    ]
  },
  {
    level: 3,
    title: "3. szint: Melyik négyszög?",
    description: "Négyzet, téglalap (de nem négyzet), vagy négyszög, de nem téglalap?",
    categories: [
      { id: 'sq', name: "Négyzet", color: 'purple' },
      { id: 'rect', name: "Téglalap, de nem négyzet", color: 'teal' },
      { id: 'quad', name: "Négyszög, de nem téglalap", color: 'amber' }
    ],
    items: [
      { id: 'g4-geom-sokszogek-s19', text: "4 derékszög, mind a 4 oldala 3 cm", categoryId: 'sq' },
      { id: 'g4-geom-sokszogek-s20', text: "sakktábla egy mezője", categoryId: 'sq' },
      { id: 'g4-geom-sokszogek-s21', text: "12 egyforma pálcikából, oldalanként 3, derékszögű sarkokkal", categoryId: 'sq' },
      { id: 'g4-geom-sokszogek-s22', text: "4 derékszög, oldalai 5 cm és 3 cm", categoryId: 'rect' },
      { id: 'g4-geom-sokszogek-s23', text: "a matematikafüzet lapja", categoryId: 'rect' },
      { id: 'g4-geom-sokszogek-s24', text: "az ajtó", categoryId: 'rect' },
      { id: 'g4-geom-sokszogek-s25', text: "4 egyenlő oldal, de nincs derékszöge", categoryId: 'quad' },
      { id: 'g4-geom-sokszogek-s26', text: "vödör alakú négyszög", categoryId: 'quad' },
      { id: 'g4-geom-sokszogek-s27', text: "sárkány alakú négyszög", categoryId: 'quad' }
    ]
  }
];

const POLYGONS4_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: POLYGONS4_SORTER_LEVELS_LIST[0],
  2: POLYGONS4_SORTER_LEVELS_LIST[1],
  3: POLYGONS4_SORTER_LEVELS_LIST[2]
};

export const Polygons4Sorter: React.FC<Polygons4SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-geom-sokszogek-sorter',
  topicTitle = "1. Síkidomok, sokszögek – Csoportosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="sikidomok-testek"
      topicId={topicId}
      subtopicId="sikidomok-sokszogek"
      title={topicTitle}
      subtitle="Válogasd szét a sokszögeket, a szögeket és a négyszögeket!"
      levels={POLYGONS4_SORTER_LEVELS}
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

export default Polygons4Sorter;

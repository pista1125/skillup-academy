import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface Solids4SorterProps {
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

const SOLIDS4_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: "1. szint: Vonal, síkidom vagy test?",
    description: "Tedd mindegyiket a jó csoportba! (Munkafüzet 31. o.)",
    categories: [
      { id: 'line', name: "Vonal", color: 'sky' },
      { id: 'plane', name: "Síkidom", color: 'emerald' },
      { id: 'solid', name: "Test", color: 'amber' }
    ],
    items: [
      { id: 'g4-geom-testek-s1', text: "egyenes szakasz", categoryId: 'line' },
      { id: 'g4-geom-testek-s2', text: "hullámvonal", categoryId: 'line' },
      { id: 'g4-geom-testek-s3', text: "csigavonal", categoryId: 'line' },
      { id: 'g4-geom-testek-s4', text: "négyzet", categoryId: 'plane' },
      { id: 'g4-geom-testek-s5', text: "kör", categoryId: 'plane' },
      { id: 'g4-geom-testek-s6', text: "háromszög", categoryId: 'plane' },
      { id: 'g4-geom-testek-s7', text: "kocka", categoryId: 'solid' },
      { id: 'g4-geom-testek-s8', text: "gömb", categoryId: 'solid' },
      { id: 'g4-geom-testek-s9', text: "henger", categoryId: 'solid' }
    ]
  },
  {
    level: 2,
    title: "2. szint: Milyen felület határolja?",
    description: "Síklapok, görbe felület, vagy mindkettő?",
    categories: [
      { id: 'flat', name: "Csak síklapok", color: 'sky' },
      { id: 'curved', name: "Csak görbe felület", color: 'rose' },
      { id: 'both', name: "Síklap és görbe felület is", color: 'purple' }
    ],
    items: [
      { id: 'g4-geom-testek-s10', text: "kocka", categoryId: 'flat' },
      { id: 'g4-geom-testek-s11', text: "téglatest", categoryId: 'flat' },
      { id: 'g4-geom-testek-s12', text: "gúla", categoryId: 'flat' },
      { id: 'g4-geom-testek-s13', text: "gömb", categoryId: 'curved' },
      { id: 'g4-geom-testek-s14', text: "focilabda", categoryId: 'curved' },
      { id: 'g4-geom-testek-s15', text: "üveggolyó", categoryId: 'curved' },
      { id: 'g4-geom-testek-s16', text: "henger", categoryId: 'both' },
      { id: 'g4-geom-testek-s17', text: "kúp", categoryId: 'both' },
      { id: 'g4-geom-testek-s18', text: "félgömb", categoryId: 'both' }
    ]
  },
  {
    level: 3,
    title: "3. szint: Hány kis kockából áll?",
    description: "Kevesebb mint 10, pontosan 10, vagy több mint 10 kis kocka?",
    categories: [
      { id: 'lt', name: "Kevesebb, mint 10", color: 'teal' },
      { id: 'eq', name: "Pontosan 10", color: 'emerald' },
      { id: 'gt', name: "Több, mint 10", color: 'amber' }
    ],
    items: [
      { id: 'g4-geom-testek-s19', text: "2 · 2 · 2-es kocka", categoryId: 'lt' },
      { id: 'g4-geom-testek-s20', text: "a 3 lépcsőfokos lépcső (1 + 2 + 3)", categoryId: 'lt' },
      { id: 'g4-geom-testek-s21', text: "alaprajz: 2, 1, 2, 1", categoryId: 'lt' },
      { id: 'g4-geom-testek-s22', text: "a 4 lépcsőfokos lépcső (1 + 2 + 3 + 4)", categoryId: 'eq' },
      { id: 'g4-geom-testek-s23', text: "alaprajz: 3, 3, 2, 2", categoryId: 'eq' },
      { id: 'g4-geom-testek-s24', text: "5 · 2-es réteg, 1 réteg", categoryId: 'eq' },
      { id: 'g4-geom-testek-s25', text: "3 · 3 · 3-as kocka", categoryId: 'gt' },
      { id: 'g4-geom-testek-s26', text: "4 · 3-as réteg, 2 réteg", categoryId: 'gt' },
      { id: 'g4-geom-testek-s27', text: "alaprajz: 4, 4, 2, 2", categoryId: 'gt' }
    ]
  }
];

const SOLIDS4_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: SOLIDS4_SORTER_LEVELS_LIST[0],
  2: SOLIDS4_SORTER_LEVELS_LIST[1],
  3: SOLIDS4_SORTER_LEVELS_LIST[2]
};

export const Solids4Sorter: React.FC<Solids4SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-geom-testek-sorter',
  topicTitle = "3. A testek – Csoportosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="sikidomok-testek"
      topicId={topicId}
      subtopicId="a-testek"
      title={topicTitle}
      subtitle="Válogasd szét a testeket, a síkidomokat és a kockás építményeket!"
      levels={SOLIDS4_SORTER_LEVELS}
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

export default Solids4Sorter;

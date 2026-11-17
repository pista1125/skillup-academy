import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface Brackets100G3SorterProps {
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

const BRACKETS_100_G3_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mennyi az eredmény?',
    description: 'Számolj a zárójellel kezdve, és tedd a helyére!',
    categories: [
      { id: 'r10', name: 'Eredménye 10', color: 'sky' },
      { id: 'r20', name: 'Eredménye 20', color: 'emerald' },
      { id: 'r30', name: 'Eredménye 30', color: 'violet' }
    ],
    items: [
      { id: 'br100s1', text: '(8 + 12) : 2', categoryId: 'r10' },
      { id: 'br100s2', text: '(25 − 5) : 2', categoryId: 'r10' },
      { id: 'br100s3', text: '5 · (7 − 5)', categoryId: 'r10' },
      { id: 'br100s4', text: '(6 + 4) · 2', categoryId: 'r20' },
      { id: 'br100s5', text: '4 · (8 − 3)', categoryId: 'r20' },
      { id: 'br100s6', text: '(50 − 10) : 2', categoryId: 'r20' },
      { id: 'br100s7', text: '(2 + 3) · 6', categoryId: 'r30' },
      { id: 'br100s8', text: '60 − (20 + 10)', categoryId: 'r30' },
      { id: 'br100s9', text: '3 · (4 + 6)', categoryId: 'r30' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Melyik az első lépés?',
    description: 'Melyik műveletet végzed el először?',
    categories: [
      { id: 'add', name: 'Először: összeadás (+)', color: 'emerald' },
      { id: 'sub', name: 'Először: kivonás (−)', color: 'sky' },
      { id: 'mul', name: 'Először: szorzás (·)', color: 'orange' }
    ],
    items: [
      { id: 'br100s10', text: '(6 + 4) · 3', categoryId: 'add' },
      { id: 'br100s11', text: '30 − (10 + 5)', categoryId: 'add' },
      { id: 'br100s12', text: '(9 + 9) : 2', categoryId: 'add' },
      { id: 'br100s13', text: '7 · (10 − 5)', categoryId: 'sub' },
      { id: 'br100s14', text: '(20 − 8) : 4', categoryId: 'sub' },
      { id: 'br100s15', text: '48 + (15 − 6)', categoryId: 'sub' },
      { id: 'br100s16', text: '5 + 3 · 4', categoryId: 'mul' },
      { id: 'br100s17', text: '(3 · 4) + 5', categoryId: 'mul' },
      { id: 'br100s18', text: '60 − 4 · 5', categoryId: 'mul' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Melyik műveletsor illik?',
    description: 'Melyik forma illik a történethez?',
    categories: [
      { id: 'mulsum', name: '□ · (□ + □)', color: 'violet' },
      { id: 'sumdiv', name: '(□ + □) : □', color: 'amber' },
      { id: 'subsum', name: '□ − (□ + □)', color: 'rose' }
    ],
    items: [
      { id: 'br100s19', text: '3 sorban soronként 4 piros és 2 kék szék', categoryId: 'mulsum' },
      { id: 'br100s20', text: '5 tányéron 2 alma és 3 körte', categoryId: 'mulsum' },
      { id: 'br100s21', text: '4 csomagban 6 kék és 4 sárga ceruza', categoryId: 'mulsum' },
      { id: 'br100s22', text: '12 és 18 diót 5 gyerek egyenlően oszt el', categoryId: 'sumdiv' },
      { id: 'br100s23', text: 'Anya 20, apa 16 sütit sütött, 4 tálra egyenlően rakják', categoryId: 'sumdiv' },
      { id: 'br100s24', text: '7 kék és 8 piros golyó 3 egyforma kupacban', categoryId: 'sumdiv' },
      { id: 'br100s25', text: '50 Ft-ból 15 Ft-ért és 20 Ft-ért vásároltam', categoryId: 'subsum' },
      { id: 'br100s26', text: '40 utasból 8-an, aztán 12-en leszálltak', categoryId: 'subsum' },
      { id: 'br100s27', text: '60 matricámból 25-öt Daninak, 15-öt Katának adtam', categoryId: 'subsum' }
    ]
  }
];

const BRACKETS_100_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: BRACKETS_100_G3_SORTER_LEVELS_LIST[0],
  2: BRACKETS_100_G3_SORTER_LEVELS_LIST[1],
  3: BRACKETS_100_G3_SORTER_LEVELS_LIST[2]
};

export const Brackets100G3Sorter: React.FC<Brackets100G3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-c100-zarojel-sorter',
  topicTitle = '7. A zárójel használata – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="szamolas-100-ig"
      topicId={topicId}
      subtopicId="a-zarojel-hasznalata"
      title={topicTitle}
      subtitle="Válogasd szét a zárójeles műveletsorokat!"
      levels={BRACKETS_100_G3_SORTER_LEVELS}
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

export default Brackets100G3Sorter;

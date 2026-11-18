import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { SolidCard80, FlatCard80, LineCard80 } from './ShapesG2CardFigures';

interface ShapesG2SorterProps {
  level?: DifficultyLevel | { level?: DifficultyLevel };
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
}

const LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Test, síkidom vagy vonal?',
    description: 'Tedd a rajzot a jó dobozba!',
    categories: [
      { id: 'test', name: 'Test', color: 'orange' },
      { id: 'sikidom', name: 'Síkidom', color: 'emerald' },
      { id: 'vonal', name: 'Vonal', color: 'sky' }
    ],
    items: [
      { id: 'shs1', text: '', categoryId: 'test', figure: <SolidCard80 kind="kocka" /> },
      { id: 'shs2', text: '', categoryId: 'test', figure: <SolidCard80 kind="henger" /> },
      { id: 'shs3', text: 'a labda', categoryId: 'test' },
      { id: 'shs4', text: '', categoryId: 'sikidom', figure: <FlatCard80 kind="haromszog" /> },
      { id: 'shs5', text: '', categoryId: 'sikidom', figure: <FlatCard80 kind="teglalap" /> },
      { id: 'shs6', text: 'a füzetbe rajzolt négyzet', categoryId: 'sikidom' },
      { id: 'shs7', text: '', categoryId: 'vonal', figure: <LineCard80 kind="egyenes" /> },
      { id: 'shs8', text: '', categoryId: 'vonal', figure: <LineCard80 kind="gorbe" /> },
      { id: 'shs9', text: '', categoryId: 'vonal', figure: <LineCard80 kind="torott" /> }
    ]
  },
  {
    level: 2,
    title: '2. szint: Gurul vagy nem gurul?',
    description: 'Gondold végig: hogyan gurul a test?',
    categories: [
      { id: 'barhogy', name: 'Bárhogy gurul', color: 'blue' },
      { id: 'oldalan', name: 'Csak az oldalán gurul', color: 'purple' },
      { id: 'nem', name: 'Nem gurul', color: 'rose' }
    ],
    items: [
      { id: 'shs10', text: '', categoryId: 'barhogy', figure: <SolidCard80 kind="gomb" /> },
      { id: 'shs11', text: 'a narancs', categoryId: 'barhogy' },
      { id: 'shs12', text: 'a teniszlabda', categoryId: 'barhogy' },
      { id: 'shs13', text: '', categoryId: 'oldalan', figure: <SolidCard80 kind="henger" /> },
      { id: 'shs14', text: '', categoryId: 'oldalan', figure: <SolidCard80 kind="kup" /> },
      { id: 'shs15', text: 'a konzervdoboz', categoryId: 'oldalan' },
      { id: 'shs16', text: '', categoryId: 'nem', figure: <SolidCard80 kind="kocka" /> },
      { id: 'shs17', text: '', categoryId: 'nem', figure: <SolidCard80 kind="gula" /> },
      { id: 'shs18', text: 'a tejesdoboz', categoryId: 'nem' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hány oldala van?',
    description: 'Számold meg az oldalakat vagy a pálcikákat!',
    categories: [
      { id: 'harom', name: '3 oldal', color: 'sky' },
      { id: 'negy', name: '4 oldal', color: 'emerald' },
      { id: 'tobb', name: '5 vagy több oldal', color: 'amber' }
    ],
    items: [
      { id: 'shs19', text: '', categoryId: 'harom', figure: <FlatCard80 kind="haromszog" /> },
      { id: 'shs20', text: '', categoryId: 'harom', figure: <FlatCard80 kind="haromszog" sticks /> },
      { id: 'shs21', text: 'háromszög', categoryId: 'harom' },
      { id: 'shs22', text: '', categoryId: 'negy', figure: <FlatCard80 kind="negyzet" sticks /> },
      { id: 'shs23', text: '', categoryId: 'negy', figure: <FlatCard80 kind="negyszog" /> },
      { id: 'shs24', text: 'téglalap', categoryId: 'negy' },
      { id: 'shs25', text: '', categoryId: 'tobb', figure: <FlatCard80 kind="otszog" /> },
      { id: 'shs26', text: '', categoryId: 'tobb', figure: <FlatCard80 kind="hatszog" sticks /> },
      { id: 'shs27', text: '', categoryId: 'tobb', figure: <FlatCard80 kind="nyolcszog" /> }
    ]
  }
];

export const SHAPES_G2_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: LEVELS_LIST[0],
  2: LEVELS_LIST[1],
  3: LEVELS_LIST[2]
};

export const ShapesG2Sorter: React.FC<ShapesG2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g2-geo-testek-sorter',
  topicTitle = '2. Testek, síkidomok – Csoportosító Játék'
}) => {
  const activeLevel: DifficultyLevel = currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <SorterTemplate
      grade={2}
      chapterId="geometria"
      topicId={topicId}
      subtopicId="testek-sikidomok"
      title={topicTitle}
      subtitle="Válogasd szét a testeket, a síkidomokat és a vonalakat!"
      levels={SHAPES_G2_SORTER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onComplete={onComplete}
    />
  );
};

export default ShapesG2Sorter;

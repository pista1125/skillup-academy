import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { RectCard, DiamondSquareCard, OtherShapeCard } from './RectPerimeterG3CardFigures';

interface RectPerimeterG3SorterProps {
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

const RECT_PERIMETER_G3_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Négyzet, téglalap vagy egyik sem?',
    description: 'A négyzet is téglalap! Figyeld az oldalakat és a derékszögeket.',
    categories: [
      { id: 'negyzet', name: 'négyzet', color: 'emerald' },
      { id: 'teglalap', name: 'téglalap, de nem négyzet', color: 'sky' },
      { id: 'egyik', name: 'nem téglalap', color: 'rose' }
    ],
    items: [
      { id: 'rps1', text: '', figure: <RectCard small w={1} h={1} square />, categoryId: 'negyzet' },
      { id: 'rps2', text: '', figure: <DiamondSquareCard />, categoryId: 'negyzet' },
      { id: 'rps3', text: '4 egyenlő oldal és 4 derékszög', categoryId: 'negyzet' },
      { id: 'rps4', text: '', figure: <RectCard small w={3} h={1.5} />, categoryId: 'teglalap' },
      { id: 'rps5', text: '', figure: <RectCard small w={1} h={2} />, categoryId: 'teglalap' },
      { id: 'rps6', text: '2 hosszú és 2 rövid oldal, 4 derékszög', categoryId: 'teglalap' },
      { id: 'rps7', text: '', figure: <OtherShapeCard kind="rombusz" />, categoryId: 'egyik' },
      { id: 'rps8', text: '', figure: <OtherShapeCard kind="paralelogramma" />, categoryId: 'egyik' },
      { id: 'rps9', text: 'háromszög', categoryId: 'egyik' }
    ]
  },
  {
    level: 2,
    title: '2. szint: 12, 16 vagy 20 cm a kerülete?',
    description: 'Add össze mind a 4 oldalt! A szemben lévő oldalak egyenlők.',
    categories: [
      { id: 'k12', name: '12 cm', color: 'amber' },
      { id: 'k16', name: '16 cm', color: 'purple' },
      { id: 'k20', name: '20 cm', color: 'teal' }
    ],
    items: [
      { id: 'rps10', text: '', figure: <RectCard small w={4} h={2} labels={['4 cm', '2 cm', null, null]} />, categoryId: 'k12' },
      { id: 'rps11', text: 'négyzet', figure: <RectCard small w={1} h={1} labels={['3 cm', null, null, null]} square />, categoryId: 'k12' },
      { id: 'rps12', text: 'téglalap: 5 cm és 1 cm', categoryId: 'k12' },
      { id: 'rps13', text: '', figure: <RectCard small w={5} h={3} labels={['5 cm', '3 cm', null, null]} />, categoryId: 'k16' },
      { id: 'rps14', text: 'négyzet', figure: <RectCard small w={1} h={1} labels={['4 cm', null, null, null]} square />, categoryId: 'k16' },
      { id: 'rps15', text: 'téglalap: 6 cm és 2 cm', categoryId: 'k16' },
      { id: 'rps16', text: 'négyzet', figure: <RectCard small w={1} h={1} labels={['5 cm', null, null, null]} square />, categoryId: 'k20' },
      { id: 'rps17', text: '', figure: <RectCard small w={7} h={3} labels={['7 cm', '3 cm', null, null]} />, categoryId: 'k20' },
      { id: 'rps18', text: 'téglalap: 8 cm és 2 cm', categoryId: 'k20' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Kevesebb, pont vagy több 1 m-nél?',
    description: 'Számold ki a kerületet cm-ben! 1 m = 100 cm, 1 dm = 10 cm.',
    categories: [
      { id: 'kisebb', name: 'kevesebb, mint 1 m', color: 'sky' },
      { id: 'pont', name: 'pont 1 m', color: 'emerald' },
      { id: 'nagyobb', name: 'több, mint 1 m', color: 'rose' }
    ],
    items: [
      { id: 'rps19', text: 'négyzet', figure: <RectCard small w={1} h={1} labels={['20 cm', null, null, null]} square />, categoryId: 'kisebb' },
      { id: 'rps20', text: 'téglalap: 35 cm és 10 cm', categoryId: 'kisebb' },
      { id: 'rps21', text: 'négyzet, oldala 24 cm', categoryId: 'kisebb' },
      { id: 'rps22', text: '', figure: <RectCard small w={3} h={2} labels={['30 cm', '20 cm', null, null]} />, categoryId: 'pont' },
      { id: 'rps23', text: 'négyzet', figure: <RectCard small w={1} h={1} labels={['25 cm', null, null, null]} square />, categoryId: 'pont' },
      { id: 'rps24', text: 'téglalap: 3 dm és 2 dm', categoryId: 'pont' },
      { id: 'rps25', text: '', figure: <RectCard small w={4} h={1.5} labels={['40 cm', '15 cm', null, null]} />, categoryId: 'nagyobb' },
      { id: 'rps26', text: 'négyzet, oldala 3 dm', categoryId: 'nagyobb' },
      { id: 'rps27', text: 'téglalap: 50 cm és 10 cm', categoryId: 'nagyobb' }
    ]
  }
];

export const RECT_PERIMETER_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: RECT_PERIMETER_G3_SORTER_LEVELS_LIST[0],
  2: RECT_PERIMETER_G3_SORTER_LEVELS_LIST[1],
  3: RECT_PERIMETER_G3_SORTER_LEVELS_LIST[2]
};

export const RectPerimeterG3Sorter: React.FC<RectPerimeterG3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-meas-teglalap-kerulet-sorter',
  topicTitle = '6. A téglalap és a négyzet kerülete – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="meresek"
      topicId={topicId}
      subtopicId="a-teglalap-es-a-negyzet-kerulete"
      title={topicTitle}
      subtitle="Válogasd szét a síkidomokat alakjuk és kerületük szerint!"
      levels={RECT_PERIMETER_G3_SORTER_LEVELS}
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

export default RectPerimeterG3Sorter;

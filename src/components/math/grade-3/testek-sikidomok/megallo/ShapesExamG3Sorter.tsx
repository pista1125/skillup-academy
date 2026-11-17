import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { SSolid, SShape, SHeart, STallBox } from './ShapesExamG3CardFigures';

interface ShapesExamG3SorterProps {
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

const SHAPES_EXAM_G3_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Test vagy síkidom?',
    description: 'Térbeli test, sokszög, vagy görbe vonallal határolt síkidom?',
    categories: [
      { id: 'test', name: 'Test', color: 'sky' },
      { id: 'sok', name: 'Sokszög', color: 'emerald' },
      { id: 'gorbe', name: 'Síkidom, de nem sokszög', color: 'amber' }
    ],
    items: [
      { id: 'shxs1_1', text: '', figure: <SSolid kind="kocka" />, categoryId: 'test' },
      { id: 'shxs1_2', text: '', figure: <SSolid kind="gomb" />, categoryId: 'test' },
      { id: 'shxs1_3', text: '', figure: <SSolid kind="henger" />, categoryId: 'test' },
      { id: 'shxs1_4', text: '', figure: <SShape kind="triIso" />, categoryId: 'sok' },
      { id: 'shxs1_5', text: '', figure: <SShape kind="square" />, categoryId: 'sok' },
      { id: 'shxs1_6', text: '', figure: <SShape kind="hex" />, categoryId: 'sok' },
      { id: 'shxs1_7', text: '', figure: <SShape kind="circle" />, categoryId: 'gorbe' },
      { id: 'shxs1_8', text: '', figure: <SShape kind="halfDisc" />, categoryId: 'gorbe' },
      { id: 'shxs1_9', text: '', figure: <SShape kind="oval" />, categoryId: 'gorbe' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Hány oldala van?',
    description: 'Számold meg az oldalakat, és válogasd szét a sokszögeket!',
    categories: [
      { id: 'h3', name: 'Háromszög', color: 'rose' },
      { id: 'h4', name: 'Négyszög', color: 'sky' },
      { id: 'h56', name: 'Ötszög vagy hatszög', color: 'purple' }
    ],
    items: [
      { id: 'shxs2_1', text: '', figure: <SShape kind="tri" />, categoryId: 'h3' },
      { id: 'shxs2_2', text: '', figure: <SShape kind="triRight" />, categoryId: 'h3' },
      { id: 'shxs2_3', text: '', figure: <SShape kind="triIso" />, categoryId: 'h3' },
      { id: 'shxs2_4', text: '', figure: <SShape kind="kite" />, categoryId: 'h4' },
      { id: 'shxs2_5', text: '', figure: <SShape kind="para" />, categoryId: 'h4' },
      { id: 'shxs2_6', text: '', figure: <SShape kind="trap" />, categoryId: 'h4' },
      { id: 'shxs2_7', text: '', figure: <SShape kind="pent" />, categoryId: 'h56' },
      { id: 'shxs2_8', text: '', figure: <SShape kind="house" />, categoryId: 'h56' },
      { id: 'shxs2_9', text: '', figure: <SShape kind="hexL" />, categoryId: 'h56' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Melyik igaz rá?',
    description: 'Mindegyik kártyára pontosan egy állítás igaz. Melyik?',
    categories: [
      { id: 'o4', name: '4 oldala van', color: 'sky' },
      { id: 'l6', name: '6 lapja van', color: 'amber' },
      { id: 't1', name: 'Pontosan 1 tükörtengelye van', color: 'rose' }
    ],
    items: [
      { id: 'shxs3_1', text: 'téglalap', figure: <SShape kind="rect" />, categoryId: 'o4' },
      { id: 'shxs3_2', text: 'ferde négyszög', figure: <SShape kind="para" />, categoryId: 'o4' },
      { id: 'shxs3_3', text: 'négyszög', figure: <SShape kind="quad" />, categoryId: 'o4' },
      { id: 'shxs3_4', text: 'kocka', figure: <SSolid kind="kocka" />, categoryId: 'l6' },
      { id: 'shxs3_5', text: 'téglatest', figure: <SSolid kind="teglatest" />, categoryId: 'l6' },
      { id: 'shxs3_6', text: 'magas téglatest', figure: <STallBox />, categoryId: 'l6' },
      { id: 'shxs3_7', text: 'szív', figure: <SHeart />, categoryId: 't1' },
      { id: 'shxs3_8', text: 'háromszög', figure: <SShape kind="triIso" />, categoryId: 't1' },
      { id: 'shxs3_9', text: 'ötszög', figure: <SShape kind="house" />, categoryId: 't1' }
    ]
  }
];

export const SHAPES_EXAM_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: SHAPES_EXAM_G3_SORTER_LEVELS_LIST[0],
  2: SHAPES_EXAM_G3_SORTER_LEVELS_LIST[1],
  3: SHAPES_EXAM_G3_SORTER_LEVELS_LIST[2]
};

export const ShapesExamG3Sorter: React.FC<ShapesExamG3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-geom-tudasproba-sorter',
  topicTitle = '5. Megálló – tudáspróba – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="testek-sikidomok"
      topicId={topicId}
      subtopicId="megallo"
      title={topicTitle}
      subtitle="Testek, síkidomok, sokszögek – válogasd szét!"
      levels={SHAPES_EXAM_G3_SORTER_LEVELS}
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

export default ShapesExamG3Sorter;

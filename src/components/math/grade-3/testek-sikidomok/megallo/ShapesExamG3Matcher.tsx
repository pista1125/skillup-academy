import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { MSolid, MShape, MHeart, MPlan } from './ShapesExamG3CardFigures';

interface ShapesExamG3MatcherProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onComplete?: () => void;
  topicId?: string;
  topicTitle?: string;
  [key: string]: any;
}

const SHAPES_EXAM_G3_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Testek',
    description: 'Párosítsd a testet a nevével!',
    pairs: [
      { id: 'shxm1_0', left: '', promptFigure: <MSolid kind="kocka" />, right: 'kocka' },
      { id: 'shxm1_1', left: '', promptFigure: <MSolid kind="teglatest" />, right: 'téglatest' },
      { id: 'shxm1_2', left: '', promptFigure: <MSolid kind="gomb" />, right: 'gömb' },
      { id: 'shxm1_3', left: '', promptFigure: <MSolid kind="piramis4" />, right: 'piramis alakú test' },
      { id: 'shxm1_4', left: '', promptFigure: <MSolid kind="sator" />, right: 'sátor alakú test' },
      { id: 'shxm1_5', left: '', promptFigure: <MSolid kind="henger" />, right: 'konzervdoboz alakú test' },
      { id: 'shxm1_6', left: '', promptFigure: <MSolid kind="kup" />, right: 'tölcsér alakú test' },
      { id: 'shxm1_7', left: '', promptFigure: <MSolid kind="felgomb" />, right: 'tál alakú test' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Sokszögek',
    description: 'Számold meg az oldalakat! Melyik név illik a síkidomhoz?',
    pairs: [
      { id: 'shxm2_0', left: '', promptFigure: <MShape kind="tri" />, right: '3 oldal: háromszög' },
      { id: 'shxm2_1', left: '', promptFigure: <MShape kind="quad" />, right: '4 oldal: négyszög' },
      { id: 'shxm2_2', left: '', promptFigure: <MShape kind="house" />, right: '5 oldal: ötszög' },
      { id: 'shxm2_3', left: '', promptFigure: <MShape kind="hexL" />, right: '6 oldal: hatszög' },
      { id: 'shxm2_4', left: '', promptFigure: <MShape kind="hept" />, right: '7 oldal: hétszög' },
      { id: 'shxm2_5', left: '', promptFigure: <MShape kind="oct" />, right: '8 oldal: nyolcszög' },
      { id: 'shxm2_6', left: '', promptFigure: <MShape kind="circle" />, right: 'kör – nem sokszög' },
      { id: 'shxm2_7', left: '', promptFigure: <MShape kind="halfDisc" />, right: 'félkör – nem sokszög' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Számolj!',
    description: 'Hány kis kocka kell az alaprajzhoz? Hány tükörtengelye van a síkidomnak?',
    pairs: [
      { id: 'shxm3_0', left: '', promptFigure: <MPlan plan={[[3, 2], [1, 1]]} />, right: '7 kis kocka' },
      { id: 'shxm3_1', left: '', promptFigure: <MPlan plan={[[3, 3], [2, 1]]} />, right: '9 kis kocka' },
      { id: 'shxm3_2', left: '', promptFigure: <MPlan plan={[[2, 2, 2], [2, 1, 1]]} />, right: '10 kis kocka' },
      { id: 'shxm3_3', left: '', promptFigure: <MPlan plan={[[3, 3, 2], [2, 1, 1]]} />, right: '12 kis kocka' },
      { id: 'shxm3_4', left: '', promptFigure: <MHeart />, right: '1 tükörtengely' },
      { id: 'shxm3_5', left: 'minden oldala egyforma', promptFigure: <MShape kind="triEq" />, right: '3 tükörtengely' },
      { id: 'shxm3_6', left: '', promptFigure: <MShape kind="square" />, right: '4 tükörtengely' },
      { id: 'shxm3_7', left: '', promptFigure: <MShape kind="para" />, right: 'nincs tükörtengelye' }
    ]
  }
];

export const SHAPES_EXAM_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: SHAPES_EXAM_G3_MATCHER_LEVELS_LIST[0],
  2: SHAPES_EXAM_G3_MATCHER_LEVELS_LIST[1],
  3: SHAPES_EXAM_G3_MATCHER_LEVELS_LIST[2]
};

export const ShapesExamG3Matcher: React.FC<ShapesExamG3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-geom-tudasproba-matcher',
  topicTitle = '5. Megálló – tudáspróba – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="testek-sikidomok"
      topicId={topicId}
      subtopicId="megallo"
      title={topicTitle}
      subtitle="Testek, sokszögek, alaprajzok és tükörtengelyek – párosíts!"
      levels={SHAPES_EXAM_G3_MATCHER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onComplete={onComplete}
      {...rest}
    />
  );
};

export default ShapesExamG3Matcher;

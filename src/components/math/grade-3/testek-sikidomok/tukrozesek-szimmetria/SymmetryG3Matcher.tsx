import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { MiniHalf, MiniDot, MiniShape } from './SymmetryG3CardFigures';

interface SymmetryG3MatcherProps {
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

const SYMMETRY_G3_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Egészítsd ki!',
    description: 'A kártyán egy ábra fele van, a piros vonal a tükörtengely. Mi lesz belőle, ha kiegészíted?',
    pairs: [
      { id: 'symm1_0', left: '', promptFigure: <MiniHalf kind="heart" />, right: 'szív' },
      { id: 'symm1_1', left: '', promptFigure: <MiniHalf kind="tree" />, right: 'fenyőfa' },
      { id: 'symm1_2', left: '', promptFigure: <MiniHalf kind="house" />, right: 'házikó' },
      { id: 'symm1_3', left: '', promptFigure: <MiniHalf kind="arrow" />, right: 'felfelé mutató nyíl' },
      { id: 'symm1_4', left: '', promptFigure: <MiniHalf kind="circle" />, right: 'kör' },
      { id: 'symm1_5', left: '', promptFigure: <MiniHalf kind="butterfly" />, right: 'pillangó' },
      { id: 'symm1_6', left: '', promptFigure: <MiniHalf kind="triangle" />, right: 'háromszög' },
      { id: 'symm1_7', left: '', promptFigure: <MiniHalf kind="star" />, right: 'csillag' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Hol lesz a tükörkép?',
    description: 'Számold meg, hány kockányira van a pont a piros tengelytől! Hol lesz a tükörképe?',
    pairs: [
      { id: 'symm2_0', left: '', promptFigure: <MiniDot d={1} />, right: 'jobbra, 1 kockányira' },
      { id: 'symm2_1', left: '', promptFigure: <MiniDot d={2} />, right: 'jobbra, 2 kockányira' },
      { id: 'symm2_2', left: '', promptFigure: <MiniDot d={3} />, right: 'jobbra, 3 kockányira' },
      { id: 'symm2_3', left: '', promptFigure: <MiniDot d={4} />, right: 'jobbra, 4 kockányira' },
      { id: 'symm2_4', left: '', promptFigure: <MiniDot d={1} dir="h" />, right: 'a víz alatt, 1 kockányira' },
      { id: 'symm2_5', left: '', promptFigure: <MiniDot d={2} dir="h" />, right: 'a víz alatt, 2 kockányira' },
      { id: 'symm2_6', left: '', promptFigure: <MiniDot d={3} dir="h" />, right: 'a víz alatt, 3 kockányira' },
      { id: 'symm2_7', left: '', promptFigure: <MiniDot d={4} dir="h" />, right: 'a víz alatt, 4 kockányira' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hány tükörtengely?',
    description: 'Hányféleképpen hajthatod félbe úgy, hogy a két fele pontosan fedje egymást?',
    pairs: [
      { id: 'symm3_0', left: '', promptFigure: <MiniShape kind="para" />, right: 'nincs tükörtengelye' },
      { id: 'symm3_1', left: '', promptFigure: <MiniShape kind="iso" />, right: '1 tükörtengely' },
      { id: 'symm3_2', left: '', promptFigure: <MiniShape kind="rect" />, right: '2 tükörtengely' },
      { id: 'symm3_3', left: '', promptFigure: <MiniShape kind="eq" />, right: '3 tükörtengely' },
      { id: 'symm3_4', left: '', promptFigure: <MiniShape kind="square" />, right: '4 tükörtengely' },
      { id: 'symm3_5', left: 'minden oldala egyforma', promptFigure: <MiniShape kind="pent" />, right: '5 tükörtengely' },
      { id: 'symm3_6', left: 'minden oldala egyforma', promptFigure: <MiniShape kind="hex" />, right: '6 tükörtengely' },
      { id: 'symm3_7', left: '', promptFigure: <MiniShape kind="circle" />, right: 'akárhány tükörtengely' }
    ]
  }
];

export const SYMMETRY_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: SYMMETRY_G3_MATCHER_LEVELS_LIST[0],
  2: SYMMETRY_G3_MATCHER_LEVELS_LIST[1],
  3: SYMMETRY_G3_MATCHER_LEVELS_LIST[2]
};

export const SymmetryG3Matcher: React.FC<SymmetryG3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-geom-tukrozes-matcher',
  topicTitle = '4. Tükrözések, szimmetria – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="testek-sikidomok"
      topicId={topicId}
      subtopicId="tukrozesek-szimmetria"
      title={topicTitle}
      subtitle="Párosítsd az ábrát az egészével, a tükörkép helyével vagy a tengelyei számával!"
      levels={SYMMETRY_G3_MATCHER_LEVELS}
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

export default SymmetryG3Matcher;

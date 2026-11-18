import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { HalfCard150, WholeCard150, ShapeCard150, StripCard150 } from './SymmetryG2CardFigures';

interface SymmetryG2MatcherProps {
  level?: DifficultyLevel | { level?: DifficultyLevel };
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
}

const half = (id: string, name: string) => ({ id, left: '', right: '', promptFigure: <HalfCard150 name={name} />, valueFigure: <WholeCard150 name={name} /> });

const LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Fél és egész',
    description: 'Melyik egész alakzat fele ez? A piros vonal a tükörtengely.',
    pairs: [
      half('sym1', 'sziv'),
      half('sym2', 'fenyo'),
      half('sym3', 'haz'),
      half('sym4', 'nyil'),
      half('sym5', 'vaza'),
      half('sym6', 'korona'),
      half('sym7', 'sarkany'),
      half('sym8', 'csillag')
    ]
  },
  {
    level: 2,
    title: '2. szint: Hány tükörtengely?',
    description: 'Hányféleképpen tudod félbehajtani úgy, hogy a két fél fedje egymást?',
    pairs: [
      { id: 'sym9', left: '', right: '4 tengely', promptFigure: <ShapeCard150 kind="negyzet" /> },
      { id: 'sym10', left: '', right: '2 tengely', promptFigure: <ShapeCard150 kind="teglalap" /> },
      { id: 'sym11', left: '', right: '1 tengely', promptFigure: <ShapeCard150 kind="egyenloszaru" /> },
      { id: 'sym12', left: '', right: 'nincs tengelye', promptFigure: <ShapeCard150 kind="ferde" /> },
      { id: 'sym13', left: '', right: 'nagyon sok tengely', promptFigure: <ShapeCard150 kind="kor" /> },
      { id: 'sym14', left: '', right: '3 tengely', promptFigure: <ShapeCard150 kind="szabalyos3" /> },
      { id: 'sym15', left: '', right: '5 tengely', promptFigure: <ShapeCard150 kind="otszog" /> },
      { id: 'sym16', left: '', right: '6 tengely', promptFigure: <ShapeCard150 kind="hatszog" /> }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hova kerül a tükörkép?',
    description: 'Számold a mezőket a tengelytől! Hányadik oszlopba vagy sorba kerül a tükörkép?',
    pairs: [
      { id: 'sym17', left: '', right: '8. oszlop', promptFigure: <StripCard150 col={1} /> },
      { id: 'sym18', left: '', right: '7. oszlop', promptFigure: <StripCard150 col={2} /> },
      { id: 'sym19', left: '', right: '6. oszlop', promptFigure: <StripCard150 col={3} /> },
      { id: 'sym20', left: '', right: '5. oszlop', promptFigure: <StripCard150 col={4} /> },
      { id: 'sym21', left: 'Tengely a 3. és 4. sor között. Mező: 1. sor', right: '6. sor' },
      { id: 'sym22', left: 'Tengely a 3. és 4. sor között. Mező: 2. sor', right: '5. sor' },
      { id: 'sym23', left: 'Tengely a 3. és 4. sor között. Mező: 3. sor', right: '4. sor' },
      { id: 'sym24', left: 'Tengely az 5. és 6. oszlop között. Mező: 1. oszlop', right: '10. oszlop' }
    ]
  }
];

export const SYMMETRY_G2_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: LEVELS_LIST[0],
  2: LEVELS_LIST[1],
  3: LEVELS_LIST[2]
};

export const SymmetryG2Matcher: React.FC<SymmetryG2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g2-geo-szimmetria-matcher',
  topicTitle = '3. Szimmetria, tükrözés – Párosító Játék'
}) => {
  const activeLevel: DifficultyLevel = currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <MatcherTemplate
      grade={2}
      chapterId="geometria"
      topicId={topicId}
      subtopicId="szimmetria-tukrozes"
      title={topicTitle}
      subtitle="Párosítsd a feleket az egészekkel, a síkidomokat a tengelyeikkel!"
      levels={SYMMETRY_G2_MATCHER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onComplete={onComplete}
    />
  );
};

export default SymmetryG2Matcher;

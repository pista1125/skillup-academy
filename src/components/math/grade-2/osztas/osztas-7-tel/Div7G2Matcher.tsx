import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { DotsCard, CalendarCard, JumpsToCard, PlatesCard, HowManyWeeksCard150 } from './Div7G2CardFigures';

interface Div7G2MatcherProps {
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

const DIV7_G2_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mennyi?',
    description: 'Számold ki az osztást! Párosítsd a számmal!',
    pairs: [
      { id: 'd7m1', left: '14 : 7', right: '2' },
      { id: 'd7m2', left: '', right: '3', promptFigure: <DotsCard n={21} /> },
      { id: 'd7m3', left: '28 : 7', right: '4' },
      { id: 'd7m4', left: '', right: '5', promptFigure: <JumpsToCard target={35} /> },
      { id: 'd7m5', left: '42 : 7', right: '6' },
      { id: 'd7m6', left: '', right: '7', promptFigure: <CalendarCard n={49} /> },
      { id: 'd7m7', left: '56 : 7', right: '8' },
      { id: 'd7m8', left: '', right: '9', promptFigure: <PlatesCard total={63} /> }
    ]
  },
  {
    level: 2,
    title: '2. szint: Szorzás és osztás',
    description: 'Melyik osztás illik a szorzáshoz vagy a képhez?',
    pairs: [
      { id: 'd7m9', left: '3 · 7 = 21', right: '21 : 7 = 3' },
      { id: 'd7m10', left: '', right: '28 : 7 = 4', promptFigure: <CalendarCard n={28} /> },
      { id: 'd7m11', left: '5 · 7 = 35', right: '35 : 7 = 5' },
      { id: 'd7m12', left: '', right: '42 : 7 = 6', promptFigure: <HowManyWeeksCard150 total={42} /> },
      { id: 'd7m13', left: '7 · 7 = 49', right: '49 : 7 = 7' },
      { id: 'd7m14', left: '', right: '56 : 7 = 8', promptFigure: <DotsCard n={56} /> },
      { id: 'd7m15', left: '9 · 7 = 63', right: '63 : 7 = 9' },
      { id: 'd7m16', left: '', right: '70 : 7 = 10', promptFigure: <JumpsToCard target={70} /> }
    ]
  },
  {
    level: 3,
    title: '3. szint: Maradékos osztás',
    description: 'Hány hetes csoport lesz, és mennyi marad?',
    pairs: [
      { id: 'd7m17', left: '', right: '1 csoport, maradt 2', promptFigure: <DotsCard n={9} /> },
      { id: 'd7m18', left: '17 : 7', right: '2 csoport, maradt 3' },
      { id: 'd7m19', left: '', right: '3 csoport, maradt 5', promptFigure: <DotsCard n={26} /> },
      { id: 'd7m20', left: '29 : 7', right: '4 csoport, maradt 1' },
      { id: 'd7m21', left: '', right: '5 csoport, maradt 5', promptFigure: <DotsCard n={40} /> },
      { id: 'd7m22', left: '48 : 7', right: '6 csoport, maradt 6' },
      { id: 'd7m23', left: '', right: '7 csoport, maradt 2', promptFigure: <DotsCard n={51} /> },
      { id: 'd7m24', left: '60 : 7', right: '8 csoport, maradt 4' }
    ]
  }
];

export const DIV7_G2_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: DIV7_G2_MATCHER_LEVELS_LIST[0],
  2: DIV7_G2_MATCHER_LEVELS_LIST[1],
  3: DIV7_G2_MATCHER_LEVELS_LIST[2]
};

export const Div7G2Matcher: React.FC<Div7G2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g2-osztas-7-matcher',
  topicTitle = '6. Osztás 7-tel – Párosító Játék'
}) => {
  const activeLevel: DifficultyLevel = currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <MatcherTemplate
      grade={2}
      chapterId="osztas"
      topicId={topicId}
      subtopicId="osztas-7-tel"
      title={topicTitle}
      subtitle="Párosítsd az osztásokat, a képeket és a maradékos osztásokat!"
      levels={DIV7_G2_MATCHER_LEVELS}
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

export default Div7G2Matcher;

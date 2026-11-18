import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { BoxesRestCard, JumpsToCard, HowManyBoxesCard150 } from './Div9G2CardFigures';

interface Div9G2MatcherProps {
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

const DIV9_G2_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mennyi a hányados?',
    description: 'Számold ki az osztást! Párosítsd a számmal!',
    pairs: [
      { id: 'd9m1', left: '18 : 9', right: '2' },
      { id: 'd9m2', left: '', right: '3', promptFigure: <HowManyBoxesCard150 total={27} /> },
      { id: 'd9m3', left: '36 : 9', right: '4' },
      { id: 'd9m4', left: '', right: '5', promptFigure: <JumpsToCard target={45} /> },
      { id: 'd9m5', left: '54 : 9', right: '6' },
      { id: 'd9m6', left: '', right: '7', promptFigure: <HowManyBoxesCard150 total={63} /> },
      { id: 'd9m7', left: '72 : 9', right: '8' },
      { id: 'd9m8', left: '', right: '9', promptFigure: <JumpsToCard target={81} /> }
    ]
  },
  {
    level: 2,
    title: '2. szint: Szorzás és osztás',
    description: 'Melyik osztás tartozik a képhez vagy a szorzáshoz?',
    pairs: [
      { id: 'd9m9', left: '2 · 9 = 18', right: '18 : 9 = 2' },
      { id: 'd9m10', left: '', right: '27 : 9 = 3', promptFigure: <BoxesRestCard n={3} /> },
      { id: 'd9m11', left: '', right: '36 : 9 = 4', promptFigure: <BoxesRestCard n={4} /> },
      { id: 'd9m12', left: '5 · 9 = 45', right: '45 : 9 = 5' },
      { id: 'd9m13', left: '', right: '54 : 9 = 6', promptFigure: <BoxesRestCard n={6} /> },
      { id: 'd9m14', left: '7 · 9 = 63', right: '63 : 9 = 7' },
      { id: 'd9m15', left: '', right: '72 : 9 = 8', promptFigure: <BoxesRestCard n={8} /> },
      { id: 'd9m16', left: '10 · 9 = 90', right: '90 : 9 = 10' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Maradékos osztás',
    description: 'Kilencesével csoportosíts! Hány csoport lett, mennyi maradt?',
    pairs: [
      { id: 'd9m17', left: '', right: '1 csoport, maradt 1', promptFigure: <BoxesRestCard n={1} rest={1} /> },
      { id: 'd9m18', left: '20 : 9', right: '2 csoport, maradt 2' },
      { id: 'd9m19', left: '', right: '3 csoport, maradt 4', promptFigure: <BoxesRestCard n={3} rest={4} /> },
      { id: 'd9m20', left: '41 : 9', right: '4 csoport, maradt 5' },
      { id: 'd9m21', left: '', right: '5 csoport, maradt 3', promptFigure: <BoxesRestCard n={5} rest={3} /> },
      { id: 'd9m22', left: '60 : 9', right: '6 csoport, maradt 6' },
      { id: 'd9m23', left: '', right: '7 csoport, maradt 8', promptFigure: <BoxesRestCard n={7} rest={8} /> },
      { id: 'd9m24', left: '89 : 9', right: '9 csoport, maradt 8' }
    ]
  }
];

export const DIV9_G2_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: DIV9_G2_MATCHER_LEVELS_LIST[0],
  2: DIV9_G2_MATCHER_LEVELS_LIST[1],
  3: DIV9_G2_MATCHER_LEVELS_LIST[2]
};

export const Div9G2Matcher: React.FC<Div9G2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g2-osztas-9-matcher',
  topicTitle = '8. Osztás 9-cel – Párosító Játék'
}) => {
  const activeLevel: DifficultyLevel = currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <MatcherTemplate
      grade={2}
      chapterId="osztas"
      topicId={topicId}
      subtopicId="osztas-9-cel"
      title={topicTitle}
      subtitle="Párosítsd az osztásokat, a kilences csoportokat és a maradékos osztásokat!"
      levels={DIV9_G2_MATCHER_LEVELS}
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

export default Div9G2Matcher;

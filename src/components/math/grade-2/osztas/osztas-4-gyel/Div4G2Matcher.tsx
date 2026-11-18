import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { PlatesCard, BoxesCard, JumpsToCard, HowManyBoxesCard150, DotsCard } from './Div4G2CardFigures';

interface Div4G2MatcherProps {
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

const DIV4_G2_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mennyi a hányados?',
    description: 'Végezd el az osztást, vagy nézd meg a képet! Párosítsd a számmal!',
    pairs: [
      { id: 'd4m1', left: '', right: '2', promptFigure: <PlatesCard total={8} /> },
      { id: 'd4m2', left: '12 : 4', right: '3' },
      { id: 'd4m3', left: '', right: '4', promptFigure: <HowManyBoxesCard150 total={16} /> },
      { id: 'd4m4', left: '20 : 4', right: '5' },
      { id: 'd4m5', left: '', right: '6', promptFigure: <JumpsToCard target={24} /> },
      { id: 'd4m6', left: '28 : 4', right: '7' },
      { id: 'd4m7', left: '', right: '8', promptFigure: <HowManyBoxesCard150 total={32} /> },
      { id: 'd4m8', left: '36 : 4', right: '9' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Szorzás és osztás',
    description: 'Melyik osztás illik a szorzáshoz vagy a képhez?',
    pairs: [
      { id: 'd4m9', left: '', right: '12 : 4 = 3', promptFigure: <PlatesCard total={12} /> },
      { id: 'd4m10', left: '6 · 4 = 24', right: '24 : 4 = 6' },
      { id: 'd4m11', left: '', right: '20 : 4 = 5', promptFigure: <BoxesCard n={5} /> },
      { id: 'd4m12', left: '10 · 4 = 40', right: '40 : 4 = 10' },
      { id: 'd4m13', left: '', right: '28 : 4 = 7', promptFigure: <PlatesCard total={28} /> },
      { id: 'd4m14', left: '9 · 4 = 36', right: '36 : 4 = 9' },
      { id: 'd4m15', left: '', right: '8 : 4 = 2', promptFigure: <JumpsToCard target={8} /> },
      { id: 'd4m16', left: '4 · 4 = 16', right: '16 : 4 = 4' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Maradékos osztás',
    description: 'Csoportosíts négyesével! Hány csoport lesz, és mennyi marad?',
    pairs: [
      { id: 'd4m17', left: '', right: '2 csoport, maradt 1', promptFigure: <DotsCard n={9} /> },
      { id: 'd4m18', left: '14 : 4', right: '3 csoport, maradt 2' },
      { id: 'd4m19', left: '', right: '4 csoport, maradt 3', promptFigure: <DotsCard n={19} /> },
      { id: 'd4m20', left: '21 : 4', right: '5 csoport, maradt 1' },
      { id: 'd4m21', left: '', right: '6 csoport, maradt 2', promptFigure: <DotsCard n={26} /> },
      { id: 'd4m22', left: '31 : 4', right: '7 csoport, maradt 3' },
      { id: 'd4m23', left: '', right: '8 csoport, maradt 1', promptFigure: <DotsCard n={33} /> },
      { id: 'd4m24', left: '38 : 4', right: '9 csoport, maradt 2' }
    ]
  }
];

export const DIV4_G2_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: DIV4_G2_MATCHER_LEVELS_LIST[0],
  2: DIV4_G2_MATCHER_LEVELS_LIST[1],
  3: DIV4_G2_MATCHER_LEVELS_LIST[2]
};

export const Div4G2Matcher: React.FC<Div4G2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g2-osztas-4-matcher',
  topicTitle = '3. Osztás 4-gyel – Párosító Játék'
}) => {
  const activeLevel: DifficultyLevel = currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <MatcherTemplate
      grade={2}
      chapterId="osztas"
      topicId={topicId}
      subtopicId="osztas-4-gyel"
      title={topicTitle}
      subtitle="Párosítsd az osztásokat, a képeket és a maradékos osztásokat!"
      levels={DIV4_G2_MATCHER_LEVELS}
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

export default Div4G2Matcher;

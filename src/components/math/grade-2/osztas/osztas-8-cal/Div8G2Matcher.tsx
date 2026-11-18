import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { PlatesCard150, JumpsToCard, HowManyBoxesCard150, DotsCard, HalveCard150 } from './Div8G2CardFigures';

interface Div8G2MatcherProps {
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

const DIV8_G2_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mennyi?',
    description: 'Hány nyolcas van benne? Párosítsd a számmal!',
    pairs: [
      { id: 'd8m1', left: '16 : 8', right: '2' },
      { id: 'd8m2', left: '', right: '3', promptFigure: <JumpsToCard target={24} /> },
      { id: 'd8m3', left: '32 : 8', right: '4' },
      { id: 'd8m4', left: '', right: '5', promptFigure: <DotsCard n={40} /> },
      { id: 'd8m5', left: '48 : 8', right: '6' },
      { id: 'd8m6', left: '', right: '7', promptFigure: <PlatesCard150 total={56} /> },
      { id: 'd8m7', left: '', right: '8', promptFigure: <HowManyBoxesCard150 total={64} /> },
      { id: 'd8m8', left: '72 : 8', right: '9' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Szorzás és osztás',
    description: 'Melyik osztás tartozik a szorzáshoz vagy a képhez?',
    pairs: [
      { id: 'd8m9', left: '5 · 8 = 40', right: '40 : 8 = 5' },
      { id: 'd8m10', left: '7 · 8 = 56', right: '56 : 8 = 7' },
      { id: 'd8m11', left: '3 · 8 = 24', right: '24 : 8 = 3' },
      { id: 'd8m12', left: '9 · 8 = 72', right: '72 : 8 = 9' },
      { id: 'd8m13', left: '', right: '48 : 8 = 6', promptFigure: <DotsCard n={48} /> },
      { id: 'd8m14', left: '', right: '80 : 8 = 10', promptFigure: <JumpsToCard target={80} /> },
      { id: 'd8m15', left: '', right: '16 : 8 = 2', promptFigure: <PlatesCard150 total={16} /> },
      { id: 'd8m16', left: '', right: '64 : 8 = 8', promptFigure: <HalveCard150 start={64} /> }
    ]
  },
  {
    level: 3,
    title: '3. szint: Maradékos osztás',
    description: 'Hány nyolcas csoport lesz, mennyi marad? Vagy: mennyi volt?',
    pairs: [
      { id: 'd8m17', left: '', right: '2 csoport, maradt 3', promptFigure: <DotsCard n={19} /> },
      { id: 'd8m18', left: '', right: '3 csoport, maradt 6', promptFigure: <DotsCard n={30} /> },
      { id: 'd8m19', left: '', right: '5 csoport, maradt 5', promptFigure: <DotsCard n={45} /> },
      { id: 'd8m20', left: '', right: '7 csoport, maradt 4', promptFigure: <DotsCard n={60} /> },
      { id: 'd8m21', left: '4 · 8 + 7', right: '39' },
      { id: 'd8m22', left: '6 · 8 + 1', right: '49' },
      { id: 'd8m23', left: '9 · 8 + 2', right: '74' },
      { id: 'd8m24', left: '8 · 8 + 5', right: '69' }
    ]
  }
];

export const DIV8_G2_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: DIV8_G2_MATCHER_LEVELS_LIST[0],
  2: DIV8_G2_MATCHER_LEVELS_LIST[1],
  3: DIV8_G2_MATCHER_LEVELS_LIST[2]
};

export const Div8G2Matcher: React.FC<Div8G2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g2-osztas-8-matcher',
  topicTitle = '7. Osztás 8-cal – Párosító Játék'
}) => {
  const activeLevel: DifficultyLevel = currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <MatcherTemplate
      grade={2}
      chapterId="osztas"
      topicId={topicId}
      subtopicId="osztas-8-cal"
      title={topicTitle}
      subtitle="Párosítsd az osztásokat, a képeket és a maradékos osztásokat!"
      levels={DIV8_G2_MATCHER_LEVELS}
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

export default Div8G2Matcher;

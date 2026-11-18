import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { PlatesCard, RingsCard, ThirdArrowCard, JumpBackCard, DotsBy3Card } from './Div3G2CardFigures';

interface Div3G2MatcherProps {
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

const DIV3_G2_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mennyi az eredmény?',
    description: 'Oszd el 3-mal, és párosítsd az eredménnyel!',
    pairs: [
      { id: 'd3m1', left: '6 : 3', right: '2' },
      { id: 'd3m2', left: '', right: '3', promptFigure: <PlatesCard each={3} /> },
      { id: 'd3m3', left: '', right: '4', promptFigure: <RingsCard groups={4} /> },
      { id: 'd3m4', left: '15 : 3', right: '5' },
      { id: 'd3m5', left: '', right: '6', promptFigure: <ThirdArrowCard from="18" to="?" /> },
      { id: 'd3m6', left: '21 : 3', right: '7' },
      { id: 'd3m7', left: '', right: '8', promptFigure: <JumpBackCard start={24} /> },
      { id: 'd3m8', left: '30 : 3', right: '10' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Kép, osztás, szorzás',
    description: 'Párosítsd a képet az osztással, az osztást az ellenőrző szorzással!',
    pairs: [
      { id: 'd3m9', left: '6 : 3 = 2', right: '2 · 3 = 6' },
      { id: 'd3m10', left: '', right: '12 : 3 = 4', promptFigure: <PlatesCard each={4} /> },
      { id: 'd3m11', left: '', right: '15 : 3 = 5', promptFigure: <RingsCard groups={5} /> },
      { id: 'd3m12', left: '18 : 3 = 6', right: '6 · 3 = 18' },
      { id: 'd3m13', left: '', right: '21 : 3 = 7', promptFigure: <PlatesCard each={7} /> },
      { id: 'd3m14', left: '', right: '24 : 3 = 8', promptFigure: <ThirdArrowCard from="24" to="?" /> },
      { id: 'd3m15', left: '27 : 3 = 9', right: '9 · 3 = 27' },
      { id: 'd3m16', left: '30 : 3 = 10', right: '10 · 3 = 30' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Maradékos osztás 3-mal',
    description: 'Csoportosíts hármasával! Hány csoport lesz, és mennyi marad?',
    pairs: [
      { id: 'd3m17', left: '10 korong', right: '3 csoport, 1 maradt' },
      { id: 'd3m18', left: '', right: '3 csoport, 2 maradt', promptFigure: <DotsBy3Card n={11} /> },
      { id: 'd3m19', left: '13 korong', right: '4 csoport, 1 maradt' },
      { id: 'd3m20', left: '', right: '4 csoport, 2 maradt', promptFigure: <DotsBy3Card n={14} /> },
      { id: 'd3m21', left: '16 korong', right: '5 csoport, 1 maradt' },
      { id: 'd3m22', left: '', right: '5 csoport, 2 maradt', promptFigure: <DotsBy3Card n={17} /> },
      { id: 'd3m23', left: '19 korong', right: '6 csoport, 1 maradt' },
      { id: 'd3m24', left: '', right: '6 csoport, 2 maradt', promptFigure: <JumpBackCard start={20} /> }
    ]
  }
];

export const DIV3_G2_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: DIV3_G2_MATCHER_LEVELS_LIST[0],
  2: DIV3_G2_MATCHER_LEVELS_LIST[1],
  3: DIV3_G2_MATCHER_LEVELS_LIST[2]
};

export const Div3G2Matcher: React.FC<Div3G2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g2-osztas-3-matcher',
  topicTitle = '2. Osztás 3-mal – Párosító Játék'
}) => {
  const activeLevel: DifficultyLevel = currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <MatcherTemplate
      grade={2}
      chapterId="osztas"
      topicId={topicId}
      subtopicId="osztas-3-mal"
      title={topicTitle}
      subtitle="Párosítsd az osztásokat, a képeket, az ellenőrzéseket és a maradékokat!"
      levels={DIV3_G2_MATCHER_LEVELS}
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

export default Div3G2Matcher;

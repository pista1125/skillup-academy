import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { PackedCard, PlatesCard, JumpsCard, SixthCard } from './Div6G2CardFigures';

interface Div6G2MatcherProps {
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

const DIV6_G2_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Szorzás és osztás párban',
    description: 'Melyik osztás illik a képhez vagy a szorzáshoz?',
    pairs: [
      { id: 'd6m1', left: '', right: '12 : 6 = 2', promptFigure: <PackedCard boxes={2} /> },
      { id: 'd6m2', left: '7 · 6 = 42', right: '42 : 6 = 7' },
      { id: 'd6m3', left: '', right: '24 : 6 = 4', promptFigure: <PackedCard boxes={4} /> },
      { id: 'd6m4', left: '10 · 6 = 60', right: '60 : 6 = 10' },
      { id: 'd6m5', left: '', right: '30 : 6 = 5', promptFigure: <PlatesCard each={5} /> },
      { id: 'd6m6', left: '', right: '6 : 6 = 1', promptFigure: <PlatesCard each={1} /> },
      { id: 'd6m7', left: '9 · 6 = 54', right: '54 : 6 = 9' },
      { id: 'd6m8', left: '', right: '18 : 6 = 3', promptFigure: <PackedCard boxes={3} /> }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mennyi a hányados?',
    description: 'Számold ki az osztást, és párosítsd az eredménnyel!',
    pairs: [
      { id: 'd6m9', left: '36 : 6', right: '6' },
      { id: 'd6m10', left: '', right: '8', promptFigure: <JumpsCard jumps={8} endLabel="48" /> },
      { id: 'd6m11', left: '42 : 6', right: '7' },
      { id: 'd6m12', left: '', right: '9', promptFigure: <SixthCard big="54" small="?" /> },
      { id: 'd6m13', left: '', right: '4', promptFigure: <PlatesCard q total={24} /> },
      { id: 'd6m14', left: '60 : 6', right: '10' },
      { id: 'd6m15', left: '', right: '3', promptFigure: <JumpsCard jumps={3} endLabel="18" /> },
      { id: 'd6m16', left: 'a 12 hatoda', right: '2' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Maradékos osztás',
    description: 'Hány doboz lesz, és mennyi marad? Párosítsd!',
    pairs: [
      { id: 'd6m17', left: '', right: '20 = 3 · 6 + 2', promptFigure: <PackedCard boxes={3} rest={2} /> },
      { id: 'd6m18', left: '25 tojás', right: '4 doboz, marad 1' },
      { id: 'd6m19', left: '', right: '17 = 2 · 6 + 5', promptFigure: <PackedCard boxes={2} rest={5} /> },
      { id: 'd6m20', left: '33 tojás', right: '5 doboz, marad 3' },
      { id: 'd6m21', left: '', right: '34 = 5 · 6 + 4', promptFigure: <PackedCard boxes={5} rest={4} /> },
      { id: 'd6m22', left: '44 tojás', right: '7 doboz, marad 2' },
      { id: 'd6m23', left: '', right: '9 = 1 · 6 + 3', promptFigure: <PackedCard boxes={1} rest={3} /> },
      { id: 'd6m24', left: '50 tojás', right: '8 doboz, marad 2' }
    ]
  }
];

export const DIV6_G2_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: DIV6_G2_MATCHER_LEVELS_LIST[0],
  2: DIV6_G2_MATCHER_LEVELS_LIST[1],
  3: DIV6_G2_MATCHER_LEVELS_LIST[2]
};

export const Div6G2Matcher: React.FC<Div6G2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g2-osztas-6-matcher',
  topicTitle = '5. Osztás 6-tal – Párosító Játék'
}) => {
  const activeLevel: DifficultyLevel =
    currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <MatcherTemplate
      grade={2}
      chapterId="osztas"
      topicId={topicId}
      subtopicId="osztas-6-tal"
      title={topicTitle}
      subtitle="Párosítsd a képeket, a szorzásokat és az osztásokat!"
      levels={DIV6_G2_MATCHER_LEVELS}
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

export default Div6G2Matcher;

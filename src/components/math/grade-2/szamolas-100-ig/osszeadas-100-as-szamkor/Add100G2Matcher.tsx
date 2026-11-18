import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { RodsAddCard150, JumpCard } from './Add100G2CardFigures';

interface Add100G2MatcherProps {
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

const ADD100_G2_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Tízesátlépés nélkül',
    description: 'Add össze az egyeseket, a tízesek maradnak! Párosítsd az összeggel!',
    pairs: [
      { id: 'a100m1', left: '', right: '67', promptFigure: <RodsAddCard150 a={60} b={7} /> },
      { id: 'a100m2', left: '', right: '58', promptFigure: <RodsAddCard150 a={52} b={6} /> },
      { id: 'a100m3', left: '73 + 4', right: '77' },
      { id: 'a100m4', left: '', right: '86', promptFigure: <JumpCard start={81} add={5} /> },
      { id: 'a100m5', left: '5 + 92', right: '97' },
      { id: 'a100m6', left: '', right: '69', promptFigure: <RodsAddCard150 a={64} b={5} /> },
      { id: 'a100m7', left: '80 + 3', right: '83' },
      { id: 'a100m8', left: '', right: '54', promptFigure: <JumpCard start={51} add={3} /> }
    ]
  },
  {
    level: 2,
    title: '2. szint: Tízesátlépés',
    description: 'Pótolj a kerek tízesig, aztán add hozzá a maradékot!',
    pairs: [
      { id: 'a100m9', left: '', right: '72', promptFigure: <JumpCard start={67} add={5} /> },
      { id: 'a100m10', left: '', right: '65', promptFigure: <RodsAddCard150 a={58} b={7} /> },
      { id: 'a100m11', left: '86 + 6', right: '92' },
      { id: 'a100m12', left: '94 + 6', right: '100' },
      { id: 'a100m13', left: '', right: '83', promptFigure: <RodsAddCard150 a={79} b={4} /> },
      { id: 'a100m14', left: '75 + 9', right: '84' },
      { id: 'a100m15', left: '', right: '93', promptFigure: <JumpCard start={88} add={5} /> },
      { id: 'a100m16', left: '57 + 9', right: '66' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Kétjegyű + kétjegyű',
    description: 'Előbb a tízeseket add hozzá, aztán az egyeseket!',
    pairs: [
      { id: 'a100m17', left: '', right: '75', promptFigure: <RodsAddCard150 a={47} b={28} /> },
      { id: 'a100m18', left: '', right: '63', promptFigure: <RodsAddCard150 a={38} b={25} /> },
      { id: 'a100m19', left: '36 + 47', right: '83' },
      { id: 'a100m20', left: '29 + 29', right: '58' },
      { id: 'a100m21', left: '', right: '68', promptFigure: <JumpCard start={45} add={23} /> },
      { id: 'a100m22', left: '56 + 35', right: '91' },
      { id: 'a100m23', left: '18 + 46', right: '64' },
      { id: 'a100m24', left: '', right: '92', promptFigure: <RodsAddCard150 a={54} b={38} /> }
    ]
  }
];

export const ADD100_G2_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: ADD100_G2_MATCHER_LEVELS_LIST[0],
  2: ADD100_G2_MATCHER_LEVELS_LIST[1],
  3: ADD100_G2_MATCHER_LEVELS_LIST[2]
};

export const Add100G2Matcher: React.FC<Add100G2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g2-c100-osszeadas-matcher',
  topicTitle = '2. Összeadás 100-as számkör – Párosító Játék'
}) => {
  const activeLevel: DifficultyLevel =
    currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <MatcherTemplate
      grade={2}
      chapterId="szamolas-100-ig"
      topicId={topicId}
      subtopicId="osszeadas-100-as-szamkor"
      title={topicTitle}
      subtitle="Párosítsd a rudakat, az ugrásokat és az összeadásokat az összeggel!"
      levels={ADD100_G2_MATCHER_LEVELS}
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

export default Add100G2Matcher;

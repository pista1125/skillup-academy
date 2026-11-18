import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { RodsSubCard150, JumpCard } from './Sub100G2CardFigures';

interface Sub100G2MatcherProps {
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

const SUB100_G2_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Tízesátlépés nélkül',
    description: 'Az áthúzott rudakat és kockákat elvettük. Mennyi maradt?',
    pairs: [
      { id: 's100m1', left: '', right: '63', promptFigure: <RodsSubCard150 a={68} b={5} /> },
      { id: 's100m2', left: '79 − 6', right: '73' },
      { id: 's100m3', left: '', right: '85', promptFigure: <JumpCard start={89} add={4} minus /> },
      { id: 's100m4', left: '57 − 7', right: '50' },
      { id: 's100m5', left: '', right: '93', promptFigure: <RodsSubCard150 a={96} b={3} /> },
      { id: 's100m6', left: '74 − 2', right: '72' },
      { id: 's100m7', left: '', right: '61', promptFigure: <JumpCard start={66} add={5} minus /> },
      { id: 's100m8', left: '', right: '82', promptFigure: <RodsSubCard150 a={88} b={6} /> }
    ]
  },
  {
    level: 2,
    title: '2. szint: Tízesátlépés',
    description: 'Lépj vissza a kerek tízesig, aztán vedd el a maradékot!',
    pairs: [
      { id: 's100m9', left: '', right: '56', promptFigure: <JumpCard start={63} add={7} minus /> },
      { id: 's100m10', left: '', right: '44', promptFigure: <RodsSubCard150 a={52} b={8} /> },
      { id: 's100m11', left: '71 − 5', right: '66' },
      { id: 's100m12', left: '80 − 6', right: '74' },
      { id: 's100m13', left: '100 − 9', right: '91' },
      { id: 's100m14', left: '', right: '76', promptFigure: <RodsSubCard150 a={85} b={9} /> },
      { id: 's100m15', left: '', right: '88', promptFigure: <JumpCard start={92} add={4} minus /> },
      { id: 's100m16', left: '61 − 3', right: '58' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Kétjegyű − kétjegyű',
    description: 'Előbb a tízeseket vedd el, aztán az egyeseket!',
    pairs: [
      { id: 's100m17', left: '', right: '43', promptFigure: <RodsSubCard150 a={78} b={35} /> },
      { id: 's100m18', left: '96 − 42', right: '54' },
      { id: 's100m19', left: '', right: '39', promptFigure: <RodsSubCard150 a={66} b={27} /> },
      { id: 's100m20', left: '', right: '36', promptFigure: <JumpCard start={74} add={38} minus /> },
      { id: 's100m21', left: '83 − 46', right: '37' },
      { id: 's100m22', left: '100 − 45', right: '55' },
      { id: 's100m23', left: '', right: '35', promptFigure: <RodsSubCard150 a={91} b={56} /> },
      { id: 's100m24', left: '62 − 29', right: '33' }
    ]
  }
];

export const SUB100_G2_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: SUB100_G2_MATCHER_LEVELS_LIST[0],
  2: SUB100_G2_MATCHER_LEVELS_LIST[1],
  3: SUB100_G2_MATCHER_LEVELS_LIST[2]
};

export const Sub100G2Matcher: React.FC<Sub100G2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g2-c100-kivonas-matcher',
  topicTitle = '3. Kivonás 100-as számkör – Párosító Játék'
}) => {
  const activeLevel: DifficultyLevel =
    currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <MatcherTemplate
      grade={2}
      chapterId="szamolas-100-ig"
      topicId={topicId}
      subtopicId="kivonas-100-as-szamkor"
      title={topicTitle}
      subtitle="Párosítsd a kivonásokat, a rudakat és az ugrásokat a különbséggel!"
      levels={SUB100_G2_MATCHER_LEVELS}
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

export default Sub100G2Matcher;

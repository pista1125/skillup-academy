import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { RodsCard150, JumpCard, CoinsCard, HundredSplitCard, ChainCard } from './RoundTens100G2CardFigures';

interface RoundTens100G2MatcherProps {
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

const LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Kerek tízesek',
    description: 'Számold meg a rudakat, az ugrásokat vagy a pénzt, és párosítsd az eredménnyel!',
    pairs: [
      { id: 'rt100m1', left: '', right: '50', promptFigure: <RodsCard150 tens={2} add={3} /> },
      { id: 'rt100m2', left: '40 + 20', right: '60' },
      { id: 'rt100m3', left: '', right: '70', promptFigure: <RodsCard150 tens={9} cross={2} /> },
      { id: 'rt100m4', left: '100 − 90', right: '10' },
      { id: 'rt100m5', left: '', right: '80 Ft', promptFigure: <CoinsCard coins={[50, 20, 10]} /> },
      { id: 'rt100m6', left: '60 − 40', right: '20' },
      { id: 'rt100m7', left: '', right: '30', promptFigure: <JumpCard start={10} hops={2} /> },
      { id: 'rt100m8', left: '50 + 40', right: '90' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Kétjegyű szám ± kerek tízes',
    description: 'Csak a tízesek változnak! Párosítsd a műveletet az eredménnyel!',
    pairs: [
      { id: 'rt100m9', left: '', right: '54', promptFigure: <RodsCard150 tens={3} ones={4} add={2} /> },
      { id: 'rt100m10', left: '61 + 30', right: '91' },
      { id: 'rt100m11', left: '', right: '45', promptFigure: <RodsCard150 tens={7} ones={5} cross={3} /> },
      { id: 'rt100m12', left: '88 − 60', right: '28' },
      { id: 'rt100m13', left: '', right: '52', promptFigure: <JumpCard start={12} hops={4} /> },
      { id: 'rt100m14', left: '27 + 50', right: '77' },
      { id: 'rt100m15', left: '', right: '63', promptFigure: <JumpCard start={93} hops={3} dir={-1} /> },
      { id: 'rt100m16', left: '39 − 20', right: '19' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hiányzó szám és két lépés',
    description: 'Keresd meg a □ vagy a ? értékét!',
    pairs: [
      { id: 'rt100m17', left: '100 = 40 + □', right: '60' },
      { id: 'rt100m18', left: '', right: '20', promptFigure: <HundredSplitCard knownTens={8} /> },
      { id: 'rt100m19', left: '70 + 20 − 50', right: '40' },
      { id: 'rt100m20', left: '', right: '75', promptFigure: <ChainCard start="45" op="+ 30" /> },
      { id: 'rt100m21', left: '□ − 30 = 50', right: '80' },
      { id: 'rt100m22', left: '', right: '46', promptFigure: <ChainCard start="96" op="− 50" /> },
      { id: 'rt100m23', left: '30 + 30 + 30', right: '90' },
      { id: 'rt100m24', left: '', right: '70', promptFigure: <HundredSplitCard knownTens={3} /> }
    ]
  }
];

export const ROUND_TENS100_G2_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: LEVELS_LIST[0],
  2: LEVELS_LIST[1],
  3: LEVELS_LIST[2]
};

export const RoundTens100G2Matcher: React.FC<RoundTens100G2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g2-c100-kerek-matcher',
  topicTitle = '4. Összeadás, kivonás kerek tízesekkel – Párosító Játék'
}) => {
  const activeLevel: DifficultyLevel =
    currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <MatcherTemplate
      grade={2}
      chapterId="szamolas-100-ig"
      topicId={topicId}
      subtopicId="osszeadas-kivonas-kerek-tizesekkel"
      title={topicTitle}
      subtitle="Párosítsd a tízesrudakat, az ugrásokat és a műveleteket az eredménnyel!"
      levels={ROUND_TENS100_G2_MATCHER_LEVELS}
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

export default RoundTens100G2Matcher;

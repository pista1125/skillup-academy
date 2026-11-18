import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { CubesCard150, RodsCard, JumpTensCard, CoinsCard } from './RoundTens50G2CardFigures';

interface RoundTens50G2MatcherProps {
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
    title: '1. szint: Kistesó és nagytesó',
    description: 'Melyik tízeses művelet a kistesó párja? Párosítsd!',
    pairs: [
      { id: 'rt50m1', left: '1 + 2', right: '10 + 20' },
      { id: 'rt50m2', left: '', right: '20 + 20', promptFigure: <CubesCard150 a={2} b={2} op="+" /> },
      { id: 'rt50m3', left: '4 − 1', right: '40 − 10' },
      { id: 'rt50m4', left: '', right: '50 − 30', promptFigure: <CubesCard150 a={5} b={3} op="−" /> },
      { id: 'rt50m5', left: '1 + 4', right: '10 + 40' },
      { id: 'rt50m6', left: '', right: '30 + 10', promptFigure: <CubesCard150 a={3} b={1} op="+" /> },
      { id: 'rt50m7', left: '5 − 4', right: '50 − 40' },
      { id: 'rt50m8', left: '', right: '30 − 20', promptFigure: <CubesCard150 a={3} b={2} op="−" /> }
    ]
  },
  {
    level: 2,
    title: '2. szint: Csak a tízesek változnak',
    description: 'Számold ki! A kék rudakat hozzáadjuk, az áthúzottakat elvesszük.',
    pairs: [
      { id: 'rt50m9', left: '', right: '44', promptFigure: <RodsCard tens={2} ones={4} add={2} /> },
      { id: 'rt50m10', left: '13 + 30', right: '43' },
      { id: 'rt50m11', left: '', right: '35', promptFigure: <JumpTensCard start={15} count={2} dir="+" /> },
      { id: 'rt50m12', left: '27 + 20', right: '47' },
      { id: 'rt50m13', left: '', right: '26', promptFigure: <RodsCard tens={4} ones={6} cross={2} /> },
      { id: 'rt50m14', left: '38 − 10', right: '28' },
      { id: 'rt50m15', left: '', right: '19', promptFigure: <JumpTensCard start={49} count={3} dir="−" /> },
      { id: 'rt50m16', left: '41 − 30', right: '11' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hiányzó szám és pénz',
    description: 'Keresd meg a □ vagy a ? értékét!',
    pairs: [
      { id: 'rt50m17', left: '24 + □ = 44', right: '20' },
      { id: 'rt50m18', left: '□ − 20 = 15', right: '35' },
      { id: 'rt50m19', left: '□ + 10 = 37', right: '27' },
      { id: 'rt50m20', left: '46 − □ = 16', right: '30' },
      { id: 'rt50m21', left: '', right: '10 Ft', promptFigure: <CoinsCard coins={[20, 20, '?']} total={50} /> },
      { id: 'rt50m22', left: '', right: '38', promptFigure: <JumpTensCard start={18} count={2} dir="+" /> },
      { id: 'rt50m23', left: '', right: '13', promptFigure: <RodsCard tens={4} ones={3} cross={3} /> },
      { id: 'rt50m24', left: '', right: '5', promptFigure: <JumpTensCard start={45} count={4} dir="−" /> }
    ]
  }
];

export const ROUND_TENS50_G2_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: LEVELS_LIST[0],
  2: LEVELS_LIST[1],
  3: LEVELS_LIST[2]
};

export const RoundTens50G2Matcher: React.FC<RoundTens50G2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g2-c50-kerek-matcher',
  topicTitle = '4. Összeadás, kivonás kerek tízesekkel – Párosító Játék'
}) => {
  const activeLevel: DifficultyLevel =
    currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <MatcherTemplate
      grade={2}
      chapterId="szamolas-50-ig"
      topicId={topicId}
      subtopicId="osszeadas-kivonas-kerek-tizesekkel"
      title={topicTitle}
      subtitle="Párosítsd a műveleteket, a rudakat, az ugrásokat és a pénzt!"
      levels={ROUND_TENS50_G2_MATCHER_LEVELS}
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

export default RoundTens50G2Matcher;

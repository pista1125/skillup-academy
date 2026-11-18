import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { BagsCard, ArrayCard, JumpsCard, SocksCard } from './Mult2G2CardFigures';

interface Mult2G2MatcherProps {
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

const MULT2_G2_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Összeadásból szorzás',
    description: 'Melyik szorzás illik a képhez vagy az összeadáshoz?',
    pairs: [
      { id: 'm2m1', left: '', right: '3 · 2', promptFigure: <BagsCard groups={3} /> },
      { id: 'm2m2', left: '2 + 2 + 2 + 2 + 2', right: '5 · 2' },
      { id: 'm2m3', left: '', right: '4 · 2', promptFigure: <BagsCard groups={4} /> },
      { id: 'm2m4', left: '2 + 2', right: '2 · 2' },
      { id: 'm2m5', left: '', right: '7 · 2', promptFigure: <SocksCard pairs={7} /> },
      { id: 'm2m6', left: '2 + 2 + 2 + 2 + 2 + 2', right: '6 · 2' },
      { id: 'm2m7', left: '', right: '8 · 2', promptFigure: <JumpsCard jumps={8} /> },
      { id: 'm2m8', left: '', right: '10 · 2', promptFigure: <BagsCard groups={10} /> }
    ]
  },
  {
    level: 2,
    title: '2. szint: A 2-es szorzótábla',
    description: 'Számold ki a szorzatot, és párosítsd az eredménnyel!',
    pairs: [
      { id: 'm2m9', left: '', right: '10', promptFigure: <BagsCard groups={5} /> },
      { id: 'm2m10', left: '7 · 2', right: '14' },
      { id: 'm2m11', left: '', right: '12', promptFigure: <JumpsCard jumps={6} /> },
      { id: 'm2m12', left: '9 · 2', right: '18' },
      { id: 'm2m13', left: '', right: '8', promptFigure: <ArrayCard rows={2} cols={4} /> },
      { id: 'm2m14', left: '10 · 2', right: '20' },
      { id: 'm2m15', left: '', right: '16', promptFigure: <SocksCard pairs={8} /> },
      { id: 'm2m16', left: '2 · 3', right: '6' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hiányzó számok',
    description: 'Mi kerül a □ vagy a ? helyére? Párosítsd!',
    pairs: [
      { id: 'm2m17', left: '□ · 2 = 14', right: '7' },
      { id: 'm2m18', left: '', right: '9', promptFigure: <JumpsCard jumps={9} endLabel="18" /> },
      { id: 'm2m19', left: '□ · 2 = 8', right: '4' },
      { id: 'm2m20', left: '', right: '2', promptFigure: <BagsCard groups={5} unknown total={10} /> },
      { id: 'm2m21', left: 'a 6 kétszerese', right: '12' },
      { id: 'm2m22', left: '', right: '6', promptFigure: <JumpsCard jumps={3} /> },
      { id: 'm2m23', left: '8 · 2 = □', right: '16' },
      { id: 'm2m24', left: '', right: '20', promptFigure: <JumpsCard jumps={10} /> }
    ]
  }
];

export const MULT2_G2_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: MULT2_G2_MATCHER_LEVELS_LIST[0],
  2: MULT2_G2_MATCHER_LEVELS_LIST[1],
  3: MULT2_G2_MATCHER_LEVELS_LIST[2]
};

export const Mult2G2Matcher: React.FC<Mult2G2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g2-szorzas-2-matcher',
  topicTitle = '1. Szorzás 2-vel – Párosító Játék'
}) => {
  const activeLevel: DifficultyLevel =
    currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <MatcherTemplate
      grade={2}
      chapterId="szorzas"
      topicId={topicId}
      subtopicId="szorzas-2-vel"
      title={topicTitle}
      subtitle="Párosítsd a képeket, az összeadásokat és a szorzásokat!"
      levels={MULT2_G2_MATCHER_LEVELS}
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

export default Mult2G2Matcher;

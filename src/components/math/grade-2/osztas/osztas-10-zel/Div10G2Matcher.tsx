import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { TargetCard150, JumpCard150, PlatesCard150, CoinSwapCard150, RodsCubesCard150 } from './Div10G2CardFigures';

interface Div10G2MatcherProps {
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

const LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Hány tízes van benne?',
    description: 'Oszd el 10-zel! Párosítsd az eredménnyel!',
    pairs: [
      { id: 'd10m1', left: '20 : 10', right: '2' },
      { id: 'd10m2', left: '', right: '3', promptFigure: <TargetCard150 kind="rod" total={30} /> },
      { id: 'd10m3', left: '40 : 10', right: '4' },
      { id: 'd10m4', left: '', right: '5', promptFigure: <TargetCard150 kind="coin" total={50} /> },
      { id: 'd10m5', left: '60 : 10', right: '6' },
      { id: 'd10m6', left: '', right: '7', promptFigure: <TargetCard150 kind="egg" total={70} /> },
      { id: 'd10m7', left: '80 : 10', right: '8' },
      { id: 'd10m8', left: '', right: '9', promptFigure: <JumpCard150 jumps={9} showEnd={90} /> }
    ]
  },
  {
    level: 2,
    title: '2. szint: Tizede és szétosztás',
    description: 'Mennyi jut egy tányérra? Mennyi a tizede?',
    pairs: [
      { id: 'd10m9', left: '100 : 10', right: '10' },
      { id: 'd10m10', left: '', right: '2', promptFigure: <PlatesCard150 total={20} /> },
      { id: 'd10m11', left: 'A 30 tizede', right: '3' },
      { id: 'd10m12', left: '', right: '4', promptFigure: <PlatesCard150 total={40} /> },
      { id: 'd10m13', left: '10 : 10', right: '1' },
      { id: 'd10m14', left: '', right: '5', promptFigure: <CoinSwapCard150 /> },
      { id: 'd10m15', left: '0 : 10', right: '0' },
      { id: 'd10m16', left: '', right: '6', promptFigure: <TargetCard150 kind="egg" total={60} /> }
    ]
  },
  {
    level: 3,
    title: '3. szint: Csoport és maradék',
    description: 'Csoportosíts tízesével! Melyik ellenőrzés illik hozzá?',
    pairs: [
      { id: 'd10m17', left: '47', right: '4 · 10 + 7' },
      { id: 'd10m18', left: '', right: '2 · 10 + 5', promptFigure: <RodsCubesCard150 tens={2} ones={5} /> },
      { id: 'd10m19', left: '74', right: '7 · 10 + 4' },
      { id: 'd10m20', left: '', right: '5 · 10 + 2', promptFigure: <RodsCubesCard150 tens={5} ones={2} /> },
      { id: 'd10m21', left: '90', right: '9 · 10' },
      { id: 'd10m22', left: '', right: '3 · 10 + 8', promptFigure: <RodsCubesCard150 tens={3} ones={8} /> },
      { id: 'd10m23', left: '83', right: '8 · 10 + 3' },
      { id: 'd10m24', left: '', right: '6 · 10', promptFigure: <RodsCubesCard150 tens={6} ones={0} /> }
    ]
  }
];

export const DIV10_G2_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: LIST[0],
  2: LIST[1],
  3: LIST[2]
};

export const Div10G2Matcher: React.FC<Div10G2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g2-osztas-10-matcher',
  topicTitle = '9. Osztás 10-zel – Párosító Játék'
}) => {
  const activeLevel: DifficultyLevel = currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <MatcherTemplate
      grade={2}
      chapterId="osztas"
      topicId={topicId}
      subtopicId="osztas-10-zel"
      title={topicTitle}
      subtitle="Párosítsd az osztásokat, tányérokat, érméket és rudakat!"
      levels={DIV10_G2_MATCHER_LEVELS}
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

export default Div10G2Matcher;

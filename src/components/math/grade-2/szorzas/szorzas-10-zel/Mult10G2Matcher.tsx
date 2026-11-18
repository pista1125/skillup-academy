import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { RodsCard150, CoinsCard150, JumpCard150, EggsCard150, TargetCard150 } from './Mult10G2CardFigures';

interface Mult10G2MatcherProps {
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
    title: '1. szint: Tízesével számolunk',
    description: 'Számold meg tízesével, vagy szorozz! Párosítsd az eredménnyel!',
    pairs: [
      { id: 'm10m1', left: '1 · 10', right: '10' },
      { id: 'm10m2', left: '', right: '20', promptFigure: <RodsCard150 n={2} /> },
      { id: 'm10m3', left: '10 + 10 + 10', right: '30' },
      { id: 'm10m4', left: '', right: '40 Ft', promptFigure: <CoinsCard150 n={4} /> },
      { id: 'm10m5', left: '5 · 10', right: '50' },
      { id: 'm10m6', left: '', right: '60', promptFigure: <JumpCard150 jumps={6} /> },
      { id: 'm10m7', left: '7 · 10', right: '70' },
      { id: 'm10m8', left: '', right: '80', promptFigure: <EggsCard150 n={8} /> }
    ]
  },
  {
    level: 2,
    title: '2. szint: Az 5-ös és a 10-es tábla',
    description: 'Keresd meg, mi ér ugyanannyit!',
    pairs: [
      { id: 'm10m9', left: '9 · 10', right: '90' },
      { id: 'm10m10', left: '', right: '100 Ft', promptFigure: <CoinsCard150 n={10} /> },
      { id: 'm10m11', left: '2 · 5', right: '1 · 10' },
      { id: 'm10m12', left: '', right: '4 · 10', promptFigure: <CoinsCard150 n={8} value={5} /> },
      { id: 'm10m13', left: '6 · 5', right: '3 · 10' },
      { id: 'm10m14', left: '', right: '5 · 10', promptFigure: <CoinsCard150 n={10} value={5} /> },
      { id: 'm10m15', left: '', right: '70', promptFigure: <RodsCard150 n={7} /> },
      { id: 'm10m16', left: '10 · 8', right: '80' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hiányzó szám',
    description: 'Hány tízes kell? Keresd meg a ? vagy a □ értékét!',
    pairs: [
      { id: 'm10m17', left: '□ · 10 = 60', right: '6' },
      { id: 'm10m18', left: '', right: '4', promptFigure: <JumpCard150 jumps={4} showEnd={40} /> },
      { id: 'm10m19', left: '□ · 10 = 90', right: '9' },
      { id: 'm10m20', left: '', right: '7', promptFigure: <TargetCard150 kind="coin" total={70} /> },
      { id: 'm10m21', left: '4 · 5 = □ · 10', right: '2' },
      { id: 'm10m22', left: '', right: '3', promptFigure: <TargetCard150 kind="egg" total={30} /> },
      { id: 'm10m23', left: '10 · 5 = □ · 10', right: '5' },
      { id: 'm10m24', left: '', right: '8', promptFigure: <TargetCard150 kind="rod" total={80} /> }
    ]
  }
];

export const MULT10_G2_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: LIST[0],
  2: LIST[1],
  3: LIST[2]
};

export const Mult10G2Matcher: React.FC<Mult10G2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g2-szorzas-10-matcher',
  topicTitle = '9. Szorzás 10-zel – Párosító Játék'
}) => {
  const activeLevel: DifficultyLevel = currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <MatcherTemplate
      grade={2}
      chapterId="szorzas"
      topicId={topicId}
      subtopicId="szorzas-10-zel"
      title={topicTitle}
      subtitle="Párosítsd a tízesrudakat, érméket, tojástartókat és szorzásokat!"
      levels={MULT10_G2_MATCHER_LEVELS}
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

export default Mult10G2Matcher;

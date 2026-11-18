import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { HandsCard150, CoinsCard150, JumpCard150, TargetCard150 } from './Mult5G2CardFigures';

interface Mult5G2MatcherProps {
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
    title: '1. szint: Ötösével számolunk',
    description: 'Számold meg ötösével, vagy szorozz! Párosítsd az eredménnyel!',
    pairs: [
      { id: 'm5m1', left: '1 · 5', right: '5' },
      { id: 'm5m2', left: '', right: '10', promptFigure: <HandsCard150 n={2} /> },
      { id: 'm5m3', left: '5 + 5 + 5', right: '15' },
      { id: 'm5m4', left: '', right: '20 Ft', promptFigure: <CoinsCard150 n={4} /> },
      { id: 'm5m5', left: '5 · 5', right: '25' },
      { id: 'm5m6', left: '', right: '30', promptFigure: <JumpCard150 jumps={6} /> },
      { id: 'm5m7', left: '7 · 5', right: '35' },
      { id: 'm5m8', left: '', right: '40', promptFigure: <HandsCard150 n={8} /> }
    ]
  },
  {
    level: 2,
    title: '2. szint: Az 5-ös és a 10-es tábla',
    description: 'Keresd meg, mi ér ugyanannyit!',
    pairs: [
      { id: 'm5m9', left: '9 · 5', right: '45' },
      { id: 'm5m10', left: '', right: '50 Ft', promptFigure: <CoinsCard150 n={10} /> },
      { id: 'm5m11', left: '6 · 5', right: '3 · 10' },
      { id: 'm5m12', left: '', right: '4 · 10', promptFigure: <CoinsCard150 n={8} /> },
      { id: 'm5m13', left: '2 · 5', right: '1 · 10' },
      { id: 'm5m14', left: '', right: '2 · 10', promptFigure: <HandsCard150 n={4} /> },
      { id: 'm5m15', left: '', right: '35', promptFigure: <JumpCard150 jumps={7} /> },
      { id: 'm5m16', left: '5 + 5 + 5 + 5 + 5', right: '25' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hiányzó szám',
    description: 'Hány ötös kell? Keresd meg a ? vagy a □ értékét!',
    pairs: [
      { id: 'm5m17', left: '□ · 5 = 30', right: '6' },
      { id: 'm5m18', left: '', right: '4', promptFigure: <JumpCard150 jumps={4} showEnd={20} /> },
      { id: 'm5m19', left: '□ · 5 = 45', right: '9' },
      { id: 'm5m20', left: '', right: '7', promptFigure: <TargetCard150 kind="coin" total={35} /> },
      { id: 'm5m21', left: '4 · 5 = □ · 10', right: '2' },
      { id: 'm5m22', left: '', right: '3', promptFigure: <TargetCard150 kind="hand" total={15} /> },
      { id: 'm5m23', left: '10 · 5 = □ · 10', right: '5' },
      { id: 'm5m24', left: '', right: '8', promptFigure: <TargetCard150 kind="hand" total={40} /> }
    ]
  }
];

export const MULT5_G2_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: LIST[0],
  2: LIST[1],
  3: LIST[2]
};

export const Mult5G2Matcher: React.FC<Mult5G2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g2-szorzas-5-matcher',
  topicTitle = '4. Szorzás 5-tel – Párosító Játék'
}) => {
  const activeLevel: DifficultyLevel = currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <MatcherTemplate
      grade={2}
      chapterId="szorzas"
      topicId={topicId}
      subtopicId="szorzas-5-tel"
      title={topicTitle}
      subtitle="Párosítsd a kezeket, érméket, ugrásokat és szorzásokat!"
      levels={MULT5_G2_MATCHER_LEVELS}
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

export default Mult5G2Matcher;

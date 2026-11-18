import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { StickCard150, ClockCard150, LinePointCard150 } from './Roman10G2CardFigures';

interface Roman10G2MatcherProps {
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
    title: '1. szint: Római és arab szám',
    description: 'Olvasd ki a római számot! Párosítsd az arab számmal!',
    pairs: [
      { id: 'r10m1', left: '', right: '7', promptFigure: <StickCard150 value="VII" /> },
      { id: 'r10m2', left: '', right: '8', promptFigure: <StickCard150 value="VIII" /> },
      { id: 'r10m3', left: '', right: '4', promptFigure: <StickCard150 value="IV" /> },
      { id: 'r10m4', left: '', right: '9', promptFigure: <StickCard150 value="IX" /> },
      { id: 'r10m5', left: 'II', right: '2' },
      { id: 'r10m6', left: 'VI', right: '6' },
      { id: 'r10m7', left: 'X', right: '10' },
      { id: 'r10m8', left: 'III', right: '3' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Óra és számnév',
    description: 'Hány órát mutat az óra? Melyik számot mondja a szó? Párosítsd a római számmal!',
    pairs: [
      { id: 'r10m9', left: '', right: 'III', promptFigure: <ClockCard150 hour={3} /> },
      { id: 'r10m10', left: '', right: 'VI', promptFigure: <ClockCard150 hour={6} /> },
      { id: 'r10m11', left: '', right: 'VII', promptFigure: <ClockCard150 hour={7} /> },
      { id: 'r10m12', left: '', right: 'X', promptFigure: <ClockCard150 hour={10} /> },
      { id: 'r10m13', left: 'öt', right: 'V' },
      { id: 'r10m14', left: 'nyolc', right: 'VIII' },
      { id: 'r10m15', left: 'négy', right: 'IV' },
      { id: 'r10m16', left: 'kilenc', right: 'IX' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Számegyenes és számolás',
    description: 'Hová mutat a nyíl? Mennyi az eredmény? Előbb írd át arab számmá!',
    pairs: [
      { id: 'r10m17', left: '', right: 'V', promptFigure: <LinePointCard150 value={5} from={0} to={10} /> },
      { id: 'r10m18', left: '', right: 'VIII', promptFigure: <LinePointCard150 value={8} from={0} to={10} /> },
      { id: 'r10m19', left: '', right: 'III', promptFigure: <LinePointCard150 value={3} from={0} to={10} /> },
      { id: 'r10m20', left: '', right: 'IX', promptFigure: <LinePointCard150 value={9} from={0} to={10} /> },
      { id: 'r10m21', left: 'III + IV', right: '7' },
      { id: 'r10m22', left: 'X − VI', right: '4' },
      { id: 'r10m23', left: 'V + V', right: '10' },
      { id: 'r10m24', left: 'IX − VIII', right: '1' }
    ]
  }
];

export const ROMAN10_G2_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: LIST[0],
  2: LIST[1],
  3: LIST[2]
};

export const Roman10G2Matcher: React.FC<Roman10G2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g2-romai-10-matcher',
  topicTitle = '2. Római számok 1-től 10-ig – Párosító Játék'
}) => {
  const activeLevel: DifficultyLevel = currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <MatcherTemplate
      grade={2}
      chapterId="romai-szamok"
      topicId={topicId}
      subtopicId="romai-szamok-0-10-ig"
      title={topicTitle}
      subtitle="Párosítsd a római számokat 1-től 10-ig!"
      levels={ROMAN10_G2_MATCHER_LEVELS}
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

export default Roman10G2Matcher;

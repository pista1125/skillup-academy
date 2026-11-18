import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { StickCard150, ClockCard150, LinePointCard150 } from './Roman20G2CardFigures';

interface Roman20G2MatcherProps {
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
    title: '1. szint: Római és arab szám 11-től 20-ig',
    description: 'Olvasd ki: elöl az X, utána az egyesek! Párosítsd az arab számmal!',
    pairs: [
      { id: 'r20m1', left: '', right: '12', promptFigure: <StickCard150 value="XII" /> },
      { id: 'r20m2', left: '', right: '16', promptFigure: <StickCard150 value="XVI" /> },
      { id: 'r20m3', left: '', right: '13', promptFigure: <StickCard150 value="XIII" /> },
      { id: 'r20m4', left: '', right: '18', promptFigure: <StickCard150 value="XVIII" /> },
      { id: 'r20m5', left: 'XI', right: '11' },
      { id: 'r20m6', left: 'XV', right: '15' },
      { id: 'r20m7', left: 'XX', right: '20' },
      { id: 'r20m8', left: 'XVII', right: '17' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Számegyenes és számnév',
    description: 'Hová mutat a nyíl? Melyik számot mondja a szó? Párosítsd a római számmal!',
    pairs: [
      { id: 'r20m9', left: '', right: 'XIV', promptFigure: <LinePointCard150 value={14} /> },
      { id: 'r20m10', left: '', right: 'XIX', promptFigure: <LinePointCard150 value={19} /> },
      { id: 'r20m11', left: '', right: 'XI', promptFigure: <LinePointCard150 value={11} /> },
      { id: 'r20m12', left: '', right: 'XVI', promptFigure: <LinePointCard150 value={16} /> },
      { id: 'r20m13', left: 'tizenhárom', right: 'XIII' },
      { id: 'r20m14', left: 'tizenöt', right: 'XV' },
      { id: 'r20m15', left: 'húsz', right: 'XX' },
      { id: 'r20m16', left: 'tizennyolc', right: 'XVIII' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Számolj és írd rómaiul!',
    description: 'Előbb írd át arab számmá, számolj, aztán keresd meg a római számot!',
    pairs: [
      { id: 'r20m17', left: '', right: 'XII', promptFigure: <ClockCard150 hour={12} /> },
      { id: 'r20m18', left: '', right: 'XI', promptFigure: <ClockCard150 hour={11} /> },
      { id: 'r20m19', left: '', right: 'XX', promptFigure: <LinePointCard150 value={20} /> },
      { id: 'r20m20', left: '', right: 'XVIII', promptFigure: <LinePointCard150 value={18} /> },
      { id: 'r20m21', left: 'XII + V', right: 'XVII' },
      { id: 'r20m22', left: 'XX − VI', right: 'XIV' },
      { id: 'r20m23', left: 'XI + IV', right: 'XV' },
      { id: 'r20m24', left: 'XVIII − II', right: 'XVI' }
    ]
  }
];

export const ROMAN20_G2_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: LIST[0],
  2: LIST[1],
  3: LIST[2]
};

export const Roman20G2Matcher: React.FC<Roman20G2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g2-romai-20-matcher',
  topicTitle = '3. Római számok 11-től 20-ig – Párosító Játék'
}) => {
  const activeLevel: DifficultyLevel = currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <MatcherTemplate
      grade={2}
      chapterId="romai-szamok"
      topicId={topicId}
      subtopicId="romai-szamok-11-20-ig"
      title={topicTitle}
      subtitle="Párosítsd a római számokat 11-től 20-ig!"
      levels={ROMAN20_G2_MATCHER_LEVELS}
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

export default Roman20G2Matcher;

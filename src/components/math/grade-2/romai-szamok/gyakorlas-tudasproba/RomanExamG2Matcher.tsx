import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { StickCard150, ClockCard150, LinePointCard150, LabelCard150 } from './RomanExamG2CardFigures';

interface RomanExamG2MatcherProps {
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
    title: '1. szint: Olvasd ki!',
    description: 'Párosítsd a római számot az arab számmal 1-től 20-ig!',
    pairs: [
      { id: 'rexm1', left: '', right: '5', promptFigure: <StickCard150 value="V" /> },
      { id: 'rexm2', left: '', right: '9', promptFigure: <StickCard150 value="IX" /> },
      { id: 'rexm3', left: '', right: '12', promptFigure: <StickCard150 value="XII" /> },
      { id: 'rexm4', left: '', right: '17', promptFigure: <StickCard150 value="XVII" /> },
      { id: 'rexm5', left: 'III', right: '3' },
      { id: 'rexm6', left: 'XX', right: '20' },
      { id: 'rexm7', left: 'XIV', right: '14' },
      { id: 'rexm8', left: 'VI', right: '6' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Óra, számegyenes, számnév',
    description: 'Hány óra van? Hová mutat a nyíl? Párosítsd a római számmal!',
    pairs: [
      { id: 'rexm9', left: '', right: 'IV', promptFigure: <ClockCard150 hour={4} /> },
      { id: 'rexm10', left: '', right: 'IX', promptFigure: <ClockCard150 hour={9} /> },
      { id: 'rexm11', left: '', right: 'XIII', promptFigure: <LinePointCard150 value={13} /> },
      { id: 'rexm12', left: '', right: 'XVIII', promptFigure: <LinePointCard150 value={18} /> },
      { id: 'rexm13', left: 'tizenegy', right: 'XI' },
      { id: 'rexm14', left: 'hét', right: 'VII' },
      { id: 'rexm15', left: 'tizenhat', right: 'XVI' },
      { id: 'rexm16', left: 'húsz', right: 'XX' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hányadik? Mennyi?',
    description: 'Olvasd ki a táblát, vagy számolj átírással!',
    pairs: [
      { id: 'rexm17', left: '', right: 'tizennegyedik', promptFigure: <LabelCard150 roman="XIV" word="oldal" /> },
      { id: 'rexm18', left: '', right: 'kilencedik', promptFigure: <LabelCard150 roman="IX" word="emelet" /> },
      { id: 'rexm19', left: '', right: 'tizenhatodik', promptFigure: <LabelCard150 roman="XVI" word="hely" /> },
      { id: 'rexm20', left: '', right: 'harmadik', promptFigure: <LabelCard150 roman="III" word="fejezet" /> },
      { id: 'rexm21', left: 'VIII + VII', right: '15' },
      { id: 'rexm22', left: 'XX − IX', right: '11' },
      { id: 'rexm23', left: 'XIII + VI', right: '19' },
      { id: 'rexm24', left: 'XVIII − X', right: '8' }
    ]
  }
];

export const ROMAN_EXAM_G2_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: LIST[0],
  2: LIST[1],
  3: LIST[2]
};

export const RomanExamG2Matcher: React.FC<RomanExamG2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g2-romai-tudasproba-matcher',
  topicTitle = '4. Gyakorlás, tudáspróba – Párosító Játék'
}) => {
  const activeLevel: DifficultyLevel = currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <MatcherTemplate
      grade={2}
      chapterId="romai-szamok"
      topicId={topicId}
      subtopicId="gyakorlas-tudasproba"
      title={topicTitle}
      subtitle="A VI. témakör összefoglalása: párosítsd a római számokat!"
      levels={ROMAN_EXAM_G2_MATCHER_LEVELS}
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

export default RomanExamG2Matcher;

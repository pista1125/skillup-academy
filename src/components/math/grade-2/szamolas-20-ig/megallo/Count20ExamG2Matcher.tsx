import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  Blocks20Card,
  Frame20Card,
  NumLine20Card,
  DiceTrioCard,
  ChainMiniCard,
  Pyramid3Card,
} from './Count20ExamG2CardFigures';

interface Count20ExamG2MatcherProps {
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
  [key: string]: unknown;
}

const COUNT20_EXAM_G2_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Számok és szomszédok (0–20)',
    description: 'Párosítsd a képet vagy a leírást a megfelelő számmal!',
    pairs: [
      { id: 'g2c20exm1', left: '', promptFigure: <Blocks20Card t={1} e={6} />, right: '16' },
      { id: 'g2c20exm2', left: '', promptFigure: <Blocks20Card t={0} e={8} />, right: '8' },
      { id: 'g2c20exm3', left: '15 kisebb szomszédja', promptFigure: <NumLine20Card from={10} to={20} mark={15} ask={14} />, right: '14' },
      { id: 'g2c20exm4', left: '12 nagyobb szomszédja', promptFigure: <NumLine20Card from={8} to={18} mark={12} ask={13} />, right: '13' },
      { id: 'g2c20exm5', left: '', promptFigure: <Frame20Card a={6} b={4} />, right: '10' },
      { id: 'g2c20exm6', left: 'tizenkilenc', right: '19' },
      { id: 'g2c20exm7', left: '7 − 0', right: '7' },
      { id: 'g2c20exm8', left: 'legkisebb kétjegyű páratlan', right: '11' },
    ],
  },
  {
    level: 2,
    title: '2. szint: Tízesátlépés és műveletek',
    description: 'Számold ki az összegeket és a különbségeket 20-ig!',
    pairs: [
      { id: 'g2c20exm9', left: '', promptFigure: <Frame20Card a={8} b={5} />, right: '13' },
      { id: 'g2c20exm10', left: '', promptFigure: <Frame20Card a={9} b={6} />, right: '15' },
      { id: 'g2c20exm11', left: '', promptFigure: <Frame20Card a={14} cross={6} />, right: '8' },
      { id: 'g2c20exm12', left: '', promptFigure: <DiceTrioCard values={[4, 5, 3]} />, right: '12' },
      { id: 'g2c20exm13', left: '', promptFigure: <ChainMiniCard start={16} op="− 7" />, right: '9' },
      { id: 'g2c20exm14', left: '19 − 12', right: '7' },
      { id: 'g2c20exm15', left: '6 + 8', right: '14' },
      { id: 'g2c20exm16', left: '20 − 4', right: '16' },
    ],
  },
  {
    level: 3,
    title: '3. szint: Számpiramis és vegyes próbák',
    description: 'Találd meg a hiányzó számokat és a nyitott mondatok megoldását!',
    pairs: [
      { id: 'g2c20exm17', left: '', promptFigure: <Pyramid3Card top="?" left={7} right={9} />, right: '16' },
      { id: 'g2c20exm18', left: '', promptFigure: <Pyramid3Card top={15} left={6} right="?" />, right: '9' },
      { id: 'g2c20exm19', left: '', promptFigure: <Pyramid3Card top={18} left="?" right={11} />, right: '7' },
      { id: 'g2c20exm20', left: '', promptFigure: <ChainMiniCard start={9} op="+ 8" />, right: '17' },
      { id: 'g2c20exm21', left: '', promptFigure: <Frame20Card a={17} cross={12} />, right: '5' },
      { id: 'g2c20exm22', left: '8 + 9 − 4', right: '13' },
      { id: 'g2c20exm23', left: 'a 19 − 7 kisebb szomszédja', right: '11' },
      { id: 'g2c20exm24', left: 'a 12 + 7 nagyobb szomszédja', right: '20' },
    ],
  },
];

export const COUNT20_EXAM_G2_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: COUNT20_EXAM_G2_MATCHER_LEVELS_LIST[0],
  2: COUNT20_EXAM_G2_MATCHER_LEVELS_LIST[1],
  3: COUNT20_EXAM_G2_MATCHER_LEVELS_LIST[2],
};

function resolveMatcherLevel(
  level: DifficultyLevel | { level?: DifficultyLevel } | undefined,
  currentLevel: DifficultyLevel | undefined
): DifficultyLevel {
  if (currentLevel !== undefined) return currentLevel;
  if (typeof level === 'number') return level;
  if (level && typeof level === 'object' && level.level !== undefined) return level.level;
  return 1;
}

export const Count20ExamG2Matcher: React.FC<Count20ExamG2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g2-c20-tudasproba-matcher',
  topicTitle = '7. Megálló – Párosító játék',
  ...rest
}) => {
  const activeLevel = resolveMatcherLevel(level, currentLevel);
  return (
    <MatcherTemplate
      grade={2}
      chapterId="szamolas-20-ig"
      topicId={topicId}
      subtopicId="megallo"
      title={topicTitle}
      subtitle="Az I. témakör összefoglalása: párosítsd a feladatot a megoldásával!"
      themeColor="rose"
      levels={COUNT20_EXAM_G2_MATCHER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onComplete={onComplete}
      {...rest}
    />
  );
};

export default Count20ExamG2Matcher;

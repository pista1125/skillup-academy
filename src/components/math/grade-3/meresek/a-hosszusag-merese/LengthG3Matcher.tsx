import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { RulerCard, PathCard } from './LengthG3CardFigures';

interface LengthG3MatcherProps {
  level?: DifficultyLevel;
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
  [key: string]: any;
}

const LENGTH_G3_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Olvasd le! Mennyi?',
    description: 'Milyen hosszú a kék szakasz? Mennyi az egység?',
    pairs: [
      { id: 'lenm1', left: '', promptFigure: <RulerCard to={3} />, right: '3 cm' },
      { id: 'lenm2', left: '', promptFigure: <RulerCard to={5} />, right: '5 cm' },
      { id: 'lenm3', left: '', promptFigure: <RulerCard to={6} />, right: '6 cm' },
      { id: 'lenm4', left: '', promptFigure: <RulerCard to={4} />, right: '4 cm' },
      { id: 'lenm5', left: '1 cm', right: '10 mm' },
      { id: 'lenm6', left: '1 dm', right: '10 cm' },
      { id: 'lenm7', left: '1 m (cm-ben)', right: '100 cm' },
      { id: 'lenm8', left: '1 m (dm-ben)', right: '10 dm' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Milliméter és átváltás',
    description: 'Figyeld a kis vonásokat! Nézd meg, hol kezdődik a szakasz!',
    pairs: [
      { id: 'lenm9', left: 'Hány mm?', promptFigure: <RulerCard to={3.5} cm={4} mm />, right: '35 mm' },
      { id: 'lenm10', left: 'Hány mm?', promptFigure: <RulerCard to={2.8} cm={4} mm />, right: '28 mm' },
      { id: 'lenm11', left: '', promptFigure: <RulerCard from={2} to={6} />, right: '4 cm' },
      { id: 'lenm12', left: '', promptFigure: <RulerCard from={1} to={6} />, right: '5 cm' },
      { id: 'lenm13', left: '2 m 3 dm', right: '23 dm' },
      { id: 'lenm14', left: '1 m 20 cm', right: '120 cm' },
      { id: 'lenm15', left: '6 cm 4 mm', right: '64 mm' },
      { id: 'lenm16', left: '400 cm', right: '4 m' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Utak és számolás',
    description: 'A rácson 1 kis négyzet oldala 10 cm. Számold meg a kis szakaszokat!',
    pairs: [
      { id: 'lenm17', left: '', promptFigure: <PathCard start={[1, 2]} path={['r', 'r', 'r']} />, right: '30 cm' },
      { id: 'lenm18', left: '', promptFigure: <PathCard start={[1, 3]} path={['u', 'u', 'r', 'r', 'r']} />, right: '50 cm' },
      { id: 'lenm19', left: '', promptFigure: <PathCard start={[1, 1]} path={['r', 'r', 'r', 'd', 'd', 'l', 'l']} />, right: '70 cm' },
      { id: 'lenm20', left: '', promptFigure: <PathCard start={[0, 0]} path={['r', 'r', 'd', 'd', 'r', 'r', 'r', 'u', 'u']} />, right: '90 cm' },
      { id: 'lenm21', left: '1 m − 35 cm', right: '65 cm' },
      { id: 'lenm22', left: '45 mm + 55 mm', right: '1 dm' },
      { id: 'lenm23', left: '2 m − 20 cm', right: '180 cm' },
      { id: 'lenm24', left: '5 · 20 cm', right: '1 m' }
    ]
  }
];

export const LENGTH_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: LENGTH_G3_MATCHER_LEVELS_LIST[0],
  2: LENGTH_G3_MATCHER_LEVELS_LIST[1],
  3: LENGTH_G3_MATCHER_LEVELS_LIST[2]
};

export const LengthG3Matcher: React.FC<LengthG3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-meas-hosszusag-matcher',
  topicTitle = '4. A hosszúság mérése – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="meresek"
      topicId={topicId}
      subtopicId="a-hosszusag-merese"
      title={topicTitle}
      subtitle="Párosítsd a mért hosszúságot a jó értékkel, és az egységeket az átváltásukkal!"
      levels={LENGTH_G3_MATCHER_LEVELS}
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

export default LengthG3Matcher;

import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { MiniGrow, MiniTwoChanges, MiniMove } from './SumChangesG3CardFigures';

interface SumChangesG3MatcherProps {
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

const SUM_CHANGES_G3_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Egy tag változik',
    description: 'A zöld csík az összeg. Hogyan változik? Mennyi lesz? Párosíts!',
    pairs: [
      { id: 'scm1_0', left: '', promptFigure: <MiniGrow sum={370} d={10} />, right: '380' },
      { id: 'scm1_1', left: '', promptFigure: <MiniGrow sum={452} d={100} />, right: '552' },
      { id: 'scm1_2', left: '', promptFigure: <MiniGrow sum={318} d={-10} />, right: '308' },
      { id: 'scm1_3', left: '', promptFigure: <MiniGrow sum={290} d={-100} />, right: '190' },
      { id: 'scm1_4', left: 'Az összeg 500. Egy tag +20.', right: '520' },
      { id: 'scm1_5', left: 'Az összeg 760. Egy tag −1.', right: '759' },
      { id: 'scm1_6', left: 'Az összeg 425. Egy tag +200.', right: '625' },
      { id: 'scm1_7', left: 'Az összeg 830. Egy tag −30.', right: '800' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Két tag változik',
    description: 'Kék doboz = 1. tag, sárga doboz = 2. tag. Mi lesz az összeggel?',
    pairs: [
      { id: 'scm2_0', left: '', promptFigure: <MiniTwoChanges a={10} b={10} />, right: '20-szal nő' },
      { id: 'scm2_1', left: '', promptFigure: <MiniTwoChanges a={10} b={-10} />, right: 'nem változik' },
      { id: 'scm2_2', left: '', promptFigure: <MiniTwoChanges a={100} b={10} />, right: '110-zel nő' },
      { id: 'scm2_3', left: '', promptFigure: <MiniTwoChanges a={-10} b={-10} />, right: '20-szal csökken' },
      { id: 'scm2_4', left: '', promptFigure: <MiniTwoChanges a={100} b={-10} />, right: '90-nel nő' },
      { id: 'scm2_5', left: 'Az 1. tag 100-zal kisebb, a 2. tag ugyanaz.', right: '100-zal csökken' },
      { id: 'scm2_6', left: 'Mindkét tag 1-gyel nagyobb.', right: '2-vel nő' },
      { id: 'scm2_7', left: 'Az 1. tag −10, a 2. tag +1.', right: '9-cel csökken' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Okos számolás',
    description: 'Tegyél át egy kicsit, hogy kerek szám legyen! Mennyi az összeg?',
    pairs: [
      { id: 'scm3_0', left: '', promptFigure: <MiniMove a={198} b={147} k={2} />, right: '345' },
      { id: 'scm3_1', left: '', promptFigure: <MiniMove a={299} b={236} k={1} />, right: '535' },
      { id: 'scm3_2', left: '', promptFigure: <MiniMove a={390} b={218} k={10} />, right: '608' },
      { id: 'scm3_3', left: '', promptFigure: <MiniMove a={497} b={185} k={3} />, right: '682' },
      { id: 'scm3_4', left: '199 + 254', right: '453' },
      { id: 'scm3_5', left: '398 + 126', right: '524' },
      { id: 'scm3_6', left: '290 + 345', right: '635' },
      { id: 'scm3_7', left: '596 + 204', right: '800' }
    ]
  }
];

export const SUM_CHANGES_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: SUM_CHANGES_G3_MATCHER_LEVELS_LIST[0],
  2: SUM_CHANGES_G3_MATCHER_LEVELS_LIST[1],
  3: SUM_CHANGES_G3_MATCHER_LEVELS_LIST[2]
};

export const SumChangesG3Matcher: React.FC<SumChangesG3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-wadd-valtozasok-matcher',
  topicTitle = '4. Az összeg változásai – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="irasbeli-osszeadas"
      topicId={topicId}
      subtopicId="az-osszeg-valtozasai"
      title={topicTitle}
      subtitle="Párosítsd a változásokat az új összeggel!"
      levels={SUM_CHANGES_G3_MATCHER_LEVELS}
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

export default SumChangesG3Matcher;

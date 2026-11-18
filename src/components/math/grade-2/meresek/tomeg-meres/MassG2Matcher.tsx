import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { BalanceCard, CratesCard } from './MassG2CardFigures';

interface MassG2MatcherProps {
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

const Q = { kind: 'q' as const };
const w = (kg: number) => ({ kind: 'w' as const, kg });
const bag = (label: string) => ({ kind: 'bag' as const, label });

const MASS_G2_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mennyi a ? tömege?',
    description: 'A mérleg egyensúlyban van. Add össze a súlyokat, és párosítsd!',
    pairs: [
      { id: 'masm1', left: '', right: '1 kg', promptFigure: <BalanceCard left={[Q]} right={[w(1)]} /> },
      { id: 'masm2', left: '', right: '2 kg', promptFigure: <BalanceCard left={[Q]} right={[w(2)]} /> },
      { id: 'masm3', left: '', right: '3 kg', promptFigure: <BalanceCard left={[Q]} right={[w(2), w(1)]} /> },
      { id: 'masm4', left: '', right: '5 kg', promptFigure: <BalanceCard left={[Q]} right={[w(5)]} /> },
      { id: 'masm5', left: '', right: '6 kg', promptFigure: <BalanceCard left={[Q]} right={[w(5), w(1)]} /> },
      { id: 'masm6', left: '1 kg + 3 kg', right: '4 kg' },
      { id: 'masm7', left: '5 kg + 2 kg', right: '7 kg' },
      { id: 'masm8', left: '10 kg − 2 kg', right: '8 kg' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mennyi kell még az egyensúlyhoz?',
    description: 'A mérleg egyensúlyban lesz. Hány kg kerül a ? helyére?',
    pairs: [
      { id: 'masm9', left: '', right: '4 kg', promptFigure: <BalanceCard left={[bag('9 kg')]} right={[w(5), Q]} /> },
      { id: 'masm10', left: '', right: '3 kg', promptFigure: <BalanceCard left={[bag('7 kg')]} right={[w(2), w(2), Q]} /> },
      { id: 'masm11', left: '', right: '2 kg', promptFigure: <BalanceCard left={[bag('12 kg')]} right={[w(10), Q]} /> },
      { id: 'masm12', left: '', right: '5 kg', promptFigure: <BalanceCard left={[bag('15 kg')]} right={[w(5), w(5), Q]} /> },
      { id: 'masm13', left: '20 kg − 14 kg', right: '6 kg' },
      { id: 'masm14', left: '3 kg + 4 kg', right: '7 kg' },
      { id: 'masm15', left: '50 kg − 42 kg', right: '8 kg' },
      { id: 'masm16', left: '2 kg + 2 kg + 5 kg', right: '9 kg' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Ládák, tökök, zsákok',
    description: 'Hány kg az összes láda? Hány kg egy tök vagy egy doboz? Számolj!',
    pairs: [
      { id: 'masm17', left: '', right: '18 kg', promptFigure: <CratesCard n={3} each={6} /> },
      { id: 'masm18', left: '', right: '20 kg', promptFigure: <CratesCard n={4} each={5} /> },
      { id: 'masm19', left: '', right: '15 kg', promptFigure: <CratesCard n={5} each={3} /> },
      { id: 'masm20', left: '', right: 'egy tök: 5 kg', promptFigure: <BalanceCard left={[{ kind: 'pumpkin' }, { kind: 'pumpkin' }]} right={[w(10)]} /> },
      { id: 'masm21', left: '', right: 'egy doboz: 4 kg', promptFigure: <BalanceCard left={[{ kind: 'box' }, { kind: 'box' }, { kind: 'box' }]} right={[w(10), w(2)]} /> },
      { id: 'masm22', left: '100 kg − 64 kg', right: '36 kg' },
      { id: 'masm23', left: '45 kg + 38 kg', right: '83 kg' },
      { id: 'masm24', left: '25 kg + 25 kg', right: '50 kg' }
    ]
  }
];

export const MASS_G2_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: MASS_G2_MATCHER_LEVELS_LIST[0],
  2: MASS_G2_MATCHER_LEVELS_LIST[1],
  3: MASS_G2_MATCHER_LEVELS_LIST[2]
};

export const MassG2Matcher: React.FC<MassG2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g2-meres-tomeg-matcher',
  topicTitle = '2. A tömeg mérése – Párosító Játék'
}) => {
  const activeLevel: DifficultyLevel =
    currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <MatcherTemplate
      grade={2}
      chapterId="meresek"
      topicId={topicId}
      subtopicId="tomeg-meres"
      title={topicTitle}
      subtitle="Párosítsd a mérlegeket, a ládákat és a tömegeket!"
      levels={MASS_G2_MATCHER_LEVELS}
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

export default MassG2Matcher;

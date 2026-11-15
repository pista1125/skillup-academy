import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SamplingWithoutReplacementMatcherProps {
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

const SAMPLING_WITHOUT_REPLACEMENT_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Fogalmak és szabályok',
    description: 'Párosítsd a fogalmat a jelentésével vagy a hozzá tartozó szabállyal!',
    pairs: [
      { id: 'swrm1', left: 'mintavétel', right: 'néhány elem kiválasztása egy halmazból' },
      { id: 'swrm2', left: 'visszatevés nélküli mintavétel', right: 'a kihúzott elem nem választható ki újra' },
      { id: 'swrm3', left: '„és” kötőszó (3 sárga és 2 piros)', right: 'a lehetőségek számát összeszorozzuk' },
      { id: 'swrm4', left: 'a valószínűségi fa egy ága mentén', right: 'a valószínűségeket összeszorozzuk' },
      { id: 'swrm5', left: 'több kedvező út a fán', right: 'az utak valószínűségét összeadjuk' },
      { id: 'swrm6', left: 'összes eset: n elemből k', right: '(n alatt k)' },
      { id: 'swrm7', left: 'pontosan 2 elem az m elemű csoportból', right: '(m alatt 2) · (n − m alatt k − 2)' },
      { id: 'swrm8', left: 'P(0) + P(1) + … + P(k)', right: '1' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Esetek száma',
    description: 'Számold ki, és párosítsd az eredménnyel!',
    pairs: [
      { id: 'swrm9', left: '(6 alatt 3) · (4 alatt 2)', right: '120' },
      { id: 'swrm10', left: '(6 alatt 5)', right: '6' },
      { id: 'swrm11', left: '(10 alatt 5)', right: '252' },
      { id: 'swrm12', left: '(3 alatt 1) · (9 alatt 2)', right: '108' },
      { id: 'swrm13', left: '(9 alatt 3)', right: '84' },
      { id: 'swrm14', left: '(12 alatt 3)', right: '220' },
      { id: 'swrm15', left: '(14 alatt 1) · (10 alatt 1)', right: '140' },
      { id: 'swrm16', left: '(24 alatt 2)', right: '276' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Helyzet ↔ valószínűség',
    description: 'Visszatevés nélkül választunk. Párosítsd a helyzetet a valószínűséggel!',
    pairs: [
      { id: 'swrm17', left: '4 piros, 6 sárga, 5 húzás: pontosan 3 sárga', right: '120/252' },
      { id: 'swrm18', left: '4 piros, 6 sárga, 5 húzás: mind sárga', right: '6/252' },
      { id: 'swrm19', left: 'zenekar (14 hegedűs a 24-ből), 2 zenész: mindkettő hegedűs', right: '91/276' },
      { id: 'swrm20', left: 'zenekar (4 brácsás, 14 hegedűs), 2 zenész: 1 brácsás és 1 hegedűs', right: '56/276' },
      { id: 'swrm21', left: '12 játékos (3 gólszerző), 3 kiválasztott: egyik sem gólszerző', right: '84/220' },
      { id: 'swrm22', left: '12 játékos (3 gólszerző), 3 kiválasztott: pontosan 2 gólszerző', right: '27/220' },
      { id: 'swrm23', left: '4 piros, 6 sárga, 2 húzás egymás után: mindkettő piros', right: '2/15' },
      { id: 'swrm24', left: '4 piros, 6 sárga, 2 húzás egymás után: pontosan 1 piros', right: '8/15' }
    ]
  }
};

export const SamplingWithoutReplacementMatcher: React.FC<SamplingWithoutReplacementMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-stat-visszateves-nelkul-matcher',
  topicTitle = '11. Visszatevés nélküli mintavétel – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="statisztika-valoszinusegszamitas"
      topicId={topicId}
      subtopicId="visszateves-nelkuli-mintavetel"
      title={topicTitle}
      subtitle="Párosítsd a fogalmakat a szabályokkal, a kifejezéseket az esetek számával, a helyzeteket a valószínűséggel!"
      levels={SAMPLING_WITHOUT_REPLACEMENT_MATCHER_LEVELS}
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

export default SamplingWithoutReplacementMatcher;

import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface RepeatedTrialsMatcherProps {
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

const REPEATED_TRIALS_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Fogalmak és képletek',
    description: 'Párosítsd a fogalmat vagy kérdést a hozzá tartozó képlettel, jelentéssel!',
    pairs: [
      { id: 'rtm1', left: 'független kísérletek', right: 'egyik kimenetele sem hat a következőre' },
      { id: 'rtm2', left: 'az esemény nem következik be (egy kísérletben)', right: '1 − p' },
      { id: 'rtm3', left: 'n kísérletből mindegyikben bekövetkezik', right: 'pⁿ' },
      { id: 'rtm4', left: 'n kísérletből egyikben sem következik be', right: '(1 − p)ⁿ' },
      { id: 'rtm5', left: 'csak az első kísérletben következik be', right: 'p · (1 − p)^{n−1}' },
      { id: 'rtm6', left: 'pontosan egy kísérletben következik be', right: 'n · p · (1 − p)^{n−1}' },
      { id: 'rtm7', left: 'a fagráf egy ágának valószínűsége', right: 'az élekre írt számok szorzata' },
      { id: 'rtm8', left: 'egymást kizáró esetek („vagy”)', right: 'a valószínűségek összege' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Helyzet ↔ valószínűség',
    description: 'Számold ki a valószínűséget, és párosítsd!',
    pairs: [
      { id: 'rtm9', left: 'Özséb (p = 0,7) két rúgása: mindkettő bemegy', right: '0,49' },
      { id: 'rtm10', left: 'Özséb két rúgása: egyik be, a másik nem', right: '0,42' },
      { id: 'rtm11', left: 'Özséb két rúgása: egyik sem megy be', right: '0,09' },
      { id: 'rtm12', left: 'Özséb két rúgása: az első be, a második nem', right: '0,21' },
      { id: 'rtm13', left: 'érme 3-szor: mindhárom fej', right: '1/8' },
      { id: 'rtm14', left: 'kocka 2-szer: mindkettő hatos', right: '1/36' },
      { id: 'rtm15', left: 'érme 8-szor: pontosan egy fej', right: '1/32' },
      { id: 'rtm16', left: 'kocka 3-szor: pontosan egy hatos', right: '25/72' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Kifejezés ↔ érték',
    description: 'Számold ki a kifejezés értékét, és párosítsd!',
    pairs: [
      { id: 'rtm17', left: '0,6⁵', right: '0,07776' },
      { id: 'rtm18', left: '0,4⁵', right: '0,01024' },
      { id: 'rtm19', left: '0,6 · 0,4⁴', right: '0,01536' },
      { id: 'rtm20', left: '5 · 0,6 · 0,4⁴', right: '0,0768' },
      { id: 'rtm21', left: '0,8³', right: '0,512' },
      { id: 'rtm22', left: '3 · 0,8² · 0,2', right: '0,384' },
      { id: 'rtm23', left: '3 · 0,8 · 0,2²', right: '0,096' },
      { id: 'rtm24', left: '(5/6)² · 1/6', right: '25/216' }
    ]
  }
};

export const RepeatedTrialsMatcher: React.FC<RepeatedTrialsMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-stat-bernoulli-matcher',
  topicTitle = '12. Ugyanazt többször – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="statisztika-valoszinusegszamitas"
      topicId={topicId}
      subtopicId="ugyanazt-tobbszor"
      title={topicTitle}
      subtitle="Párosítsd a fogalmakat, a helyzeteket és a kifejezéseket a valószínűségükkel!"
      levels={REPEATED_TRIALS_MATCHER_LEVELS}
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

export default RepeatedTrialsMatcher;

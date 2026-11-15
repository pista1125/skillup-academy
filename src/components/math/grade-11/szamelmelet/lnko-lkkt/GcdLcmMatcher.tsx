import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface GcdLcmMatcherProps {
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

const GCD_LCM_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Fogalmak és szabályok',
    description: 'Párosítsd a jelölést vagy szabályt a jelentésével!',
    pairs: [
      { id: 'glm1', left: '(a; b)', right: 'Legnagyobb közös osztó' },
      { id: 'glm2', left: '[a; b]', right: 'Legkisebb közös többszörös' },
      { id: 'glm3', left: 'Relatív prímek', right: '(a; b) = 1' },
      { id: 'glm4', left: 'LNKO a prímtényezőkből', right: 'Közös prímek a legkisebb hatványon' },
      { id: 'glm5', left: 'LKKT a prímtényezőkből', right: 'Minden prím a legnagyobb hatványon' },
      { id: 'glm6', left: '(1; n)', right: '1' },
      { id: 'glm7', left: '[1; n]', right: 'n' },
      { id: 'glm8', left: '(a; b) · [a; b]', right: 'a · b' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Legnagyobb közös osztók',
    description: 'Párosítsd a számokat a legnagyobb közös osztójukkal!',
    pairs: [
      { id: 'glm9', left: '(240; 320)', right: '80' },
      { id: 'glm10', left: '(18; 120)', right: '6' },
      { id: 'glm11', left: '(4536; 528)', right: '24' },
      { id: 'glm12', left: '(675; 495)', right: '45' },
      { id: 'glm13', left: '(1176; 252)', right: '84' },
      { id: 'glm14', left: '(84; 126)', right: '42' },
      { id: 'glm15', left: '(477; 318)', right: '159' },
      { id: 'glm16', left: '(22; 75)', right: '1' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Legkisebb közös többszörösök és alkalmazások',
    description: 'Párosítsd a feladatot az eredményével!',
    pairs: [
      { id: 'glm17', left: '[18; 120]', right: '360' },
      { id: 'glm18', left: '[36; 180]', right: '180' },
      { id: 'glm19', left: '[15; 22]', right: '330' },
      { id: 'glm20', left: '[6; 8; 10]', right: '120' },
      { id: 'glm21', left: '[16; 20; 24]', right: '240' },
      { id: 'glm22', left: 'A 84 × 126 cm-es téglalapokból kirakható legkisebb négyzet oldala (cm)', right: '252' },
      { id: 'glm23', left: '[4536; 528]', right: '99 792' },
      { id: 'glm24', left: '8 és 6 napos aukciós ciklus: közös újraindulás (nap)', right: '24' }
    ]
  }
];

const GCD_LCM_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: GCD_LCM_MATCHER_LEVELS_LIST[0],
  2: GCD_LCM_MATCHER_LEVELS_LIST[1],
  3: GCD_LCM_MATCHER_LEVELS_LIST[2]
};

export const GcdLcmMatcher: React.FC<GcdLcmMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-num-lnko-lkkt-matcher',
  topicTitle = '3. Legnagyobb közös osztó, legkisebb közös többszörös – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="szamelmelet"
      topicId={topicId}
      subtopicId="lnko-lkkt"
      title={topicTitle}
      subtitle="Párosítsd a jelöléseket, a legnagyobb közös osztókat és a legkisebb közös többszörösöket az eredményükkel!"
      levels={GCD_LCM_MATCHER_LEVELS}
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

export default GcdLcmMatcher;

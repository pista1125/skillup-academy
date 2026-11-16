import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ProperFractionsMatcherProps {
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

export const PROPER_FRACTIONS_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Hány rész közül hány?',
    description: 'Párosítsd a színezést a törttel!',
    pairs: [
      { id: 'pfm1', left: '4 egyenlő rész közül 3 színes', right: '3 negyed' },
      { id: 'pfm2', left: '3 egyenlő rész közül 2 színes', right: '2 harmad' },
      { id: 'pfm3', left: '5 egyenlő rész közül 3 színes', right: '3 ötöd' },
      { id: 'pfm4', left: '6 egyenlő rész közül 5 színes', right: '5 hatod' },
      { id: 'pfm5', left: '8 egyenlő rész közül 3 színes', right: '3 nyolcad' },
      { id: 'pfm6', left: '10 egyenlő rész közül 7 színes', right: '7 tized' },
      { id: 'pfm7', left: '5 egyenlő rész közül 4 színes', right: '4 ötöd' },
      { id: 'pfm8', left: '10 egyenlő rész közül 9 színes', right: '9 tized' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Színes rész – fehér rész',
    description: 'Ennyi színes. Mennyi a fehér rész? Párosítsd!',
    pairs: [
      { id: 'pfm9', left: '3 negyed színes', right: '1 negyed fehér' },
      { id: 'pfm10', left: '2 harmad színes', right: '1 harmad fehér' },
      { id: 'pfm11', left: '3 ötöd színes', right: '2 ötöd fehér' },
      { id: 'pfm12', left: '5 hatod színes', right: '1 hatod fehér' },
      { id: 'pfm13', left: '3 nyolcad színes', right: '5 nyolcad fehér' },
      { id: 'pfm14', left: '7 tized színes', right: '3 tized fehér' },
      { id: 'pfm15', left: '1 ötöd színes', right: '4 ötöd fehér' },
      { id: 'pfm16', left: '1 hatod színes', right: '5 hatod fehér' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Helyzetek',
    description: 'Párosítsd a helyzetet a törtrésszel!',
    pairs: [
      { id: 'pfm17', left: '12 pohárból 4 piros', right: 'a poharak 1 harmada piros' },
      { id: 'pfm18', left: '12 autóból 6 zöld', right: 'az autók fele zöld' },
      { id: 'pfm19', left: '12 autóból 3 kék', right: 'az autók 1 negyede kék' },
      { id: 'pfm20', left: '10 lövésből 8 talált', right: 'a lövések 8 tizede talált' },
      { id: 'pfm21', left: 'Az osztrák zászló piros része', right: 'a zászló 2 harmada' },
      { id: 'pfm22', left: 'A kisegér 3 napja után megmaradt sajt', right: 'a sajt 1 nyolcada' },
      { id: 'pfm23', left: '5 gyöngyből 3 piros', right: 'a gyöngyök 3 ötöde piros' },
      { id: 'pfm24', left: 'A 8 szeletes tortából 3 szelet maradt', right: 'a torta 3 nyolcada maradt' }
    ]
  }
];

const PROPER_FRACTIONS_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: PROPER_FRACTIONS_MATCHER_LEVELS_LIST[0],
  2: PROPER_FRACTIONS_MATCHER_LEVELS_LIST[1],
  3: PROPER_FRACTIONS_MATCHER_LEVELS_LIST[2]
};

export const ProperFractionsMatcher: React.FC<ProperFractionsMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-frac-egynel-kisebb-matcher',
  topicTitle = '2. Egynél kisebb törtek – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="tortszamok"
      topicId={topicId}
      subtopicId="egynel-kisebb-tortek"
      title={topicTitle}
      subtitle="Olvasd le a színes és a fehér részt, és párosítsd a helyzeteket a törtekkel!"
      levels={PROPER_FRACTIONS_MATCHER_LEVELS}
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

export default ProperFractionsMatcher;

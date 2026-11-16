import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ImproperFractionsMatcherProps {
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

export const IMPROPER_FRACTIONS_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Hány rész ad ki 1 egészet?',
    description: 'Párosítsd a részt azzal, hány darab kell belőle az egészhez!',
    pairs: [
      { id: 'ifm1', left: 'fél (1 ketted)', right: '2 darab' },
      { id: 'ifm2', left: '1 harmad', right: '3 darab' },
      { id: 'ifm3', left: '1 negyed', right: '4 darab' },
      { id: 'ifm4', left: '1 ötöd', right: '5 darab' },
      { id: 'ifm5', left: '1 hatod', right: '6 darab' },
      { id: 'ifm6', left: '1 nyolcad', right: '8 darab' },
      { id: 'ifm7', left: '1 tized', right: '10 darab' },
      { id: 'ifm8', left: '1 század', right: '100 darab' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Egészek és részek',
    description: 'Hány egész van a törtben, és mennyi marad? Párosítsd!',
    pairs: [
      { id: 'ifm9', left: '5 negyed', right: '1 egész és 1 negyed' },
      { id: 'ifm10', left: '3 ketted', right: '1 és fél' },
      { id: 'ifm11', left: '7 harmad', right: '2 egész és 1 harmad' },
      { id: 'ifm12', left: '8 negyed', right: '2 egész' },
      { id: 'ifm13', left: '11 tized', right: '1 egész és 1 tized' },
      { id: 'ifm14', left: '7 hatod', right: '1 egész és 1 hatod' },
      { id: 'ifm15', left: '9 negyed', right: '2 egész és 1 negyed' },
      { id: 'ifm16', left: '5 harmad', right: '1 egész és 2 harmad' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Óra és méter',
    description: 'Párosítsd az időt percekkel, a hosszúságot centiméterekkel!',
    pairs: [
      { id: 'ifm17', left: '1 negyed óra', right: '15 perc' },
      { id: 'ifm18', left: 'fél óra', right: '30 perc' },
      { id: 'ifm19', left: '3 negyed óra', right: '45 perc' },
      { id: 'ifm20', left: '1 és negyed óra', right: '75 perc' },
      { id: 'ifm21', left: '1 és fél óra', right: '90 perc' },
      { id: 'ifm22', left: 'a méter 2 negyede', right: '50 cm' },
      { id: 'ifm23', left: 'a méter 3 negyede', right: '75 cm' },
      { id: 'ifm24', left: 'a méter 4 negyede', right: '100 cm' }
    ]
  }
];

const IMPROPER_FRACTIONS_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: IMPROPER_FRACTIONS_MATCHER_LEVELS_LIST[0],
  2: IMPROPER_FRACTIONS_MATCHER_LEVELS_LIST[1],
  3: IMPROPER_FRACTIONS_MATCHER_LEVELS_LIST[2]
};

export const ImproperFractionsMatcher: React.FC<ImproperFractionsMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-frac-egynel-nagyobb-matcher',
  topicTitle = '3. Az 1 egész és az egynél nagyobb törtek – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="tortszamok"
      topicId={topicId}
      subtopicId="egynel-nagyobb-tortek"
      title={topicTitle}
      subtitle="Rakd össze az egészet, bontsd egészekre a törteket, és váltsd át az órát és a métert!"
      levels={IMPROPER_FRACTIONS_MATCHER_LEVELS}
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

export default ImproperFractionsMatcher;

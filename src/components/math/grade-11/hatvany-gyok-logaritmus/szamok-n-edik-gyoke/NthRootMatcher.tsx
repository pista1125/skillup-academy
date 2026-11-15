import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface NthRootMatcherProps {
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

const NTH_ROOT_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: A definíció példái',
    description: 'Párosítsd a gyököt az értékével!',
    pairs: [
      {
        id: 'nrtm1',
        left: '⁴√81',
        right: '3'
      },
      {
        id: 'nrtm2',
        left: '∛−216',
        right: '−6'
      },
      {
        id: 'nrtm3',
        left: '⁷√128',
        right: '2'
      },
      {
        id: 'nrtm4',
        left: '⁶√0,015625',
        right: '0,5'
      },
      {
        id: 'nrtm5',
        left: '⁵√−0,03125',
        right: '−0,5'
      },
      {
        id: 'nrtm6',
        left: '√64',
        right: '8'
      },
      {
        id: 'nrtm7',
        left: '∛64',
        right: '4'
      },
      {
        id: 'nrtm8',
        left: 'ⁿ√0 (n > 1)',
        right: '0'
      }
    ]
  },
  {
    level: 2,
    title: '2. szint: Gyökvonás definíció alapján',
    description: 'Párosítsd a kifejezést az értékével!',
    pairs: [
      {
        id: 'nrtm9',
        left: '√100',
        right: '10'
      },
      {
        id: 'nrtm10',
        left: '∛−1000',
        right: '−10'
      },
      {
        id: 'nrtm11',
        left: '∛1 000 000',
        right: '100'
      },
      {
        id: 'nrtm12',
        left: '∛−125',
        right: '−5'
      },
      {
        id: 'nrtm13',
        left: '⁴√625',
        right: '5'
      },
      {
        id: 'nrtm14',
        left: '∛0,001',
        right: '0,1'
      },
      {
        id: 'nrtm15',
        left: '∛(27/8)',
        right: '3/2'
      },
      {
        id: 'nrtm16',
        left: '⁴√(1/16)',
        right: '1/2'
      }
    ]
  },
  {
    level: 3,
    title: '3. szint: Alkalmazások',
    description: 'Párosítsd a feladatot az eredményével!',
    pairs: [
      {
        id: 'nrtm17',
        left: 'Kocka, A = 294 cm² – az él',
        right: '7 cm'
      },
      {
        id: 'nrtm18',
        left: 'Kocka, V = 64 cm³ – az él',
        right: '4 cm'
      },
      {
        id: 'nrtm19',
        left: 'Kocka, A = 102 cm² – az él',
        right: '√17 ≈ 4,12 cm'
      },
      {
        id: 'nrtm20',
        left: 'Kocka, V = 45 cm³ – az él',
        right: '∛45 ≈ 3,56 cm'
      },
      {
        id: 'nrtm21',
        left: 'Bűvös kocka, V = 216 cm³ – a felszín',
        right: '216 cm²'
      },
      {
        id: 'nrtm22',
        left: 'Gömb, V = 113 m³ – a sugár',
        right: '≈ 3,00 m'
      },
      {
        id: 'nrtm23',
        left: '(1 + r)²⁰ = 0,95 – az évi változás',
        right: '≈ −0,26%'
      },
      {
        id: 'nrtm24',
        left: 'Alga: 1,5 m² → 27 m² 7 nap alatt – napi szorzó',
        right: '≈ 1,51'
      }
    ]
  }
];

const NTH_ROOT_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: NTH_ROOT_MATCHER_LEVELS_LIST[0],
  2: NTH_ROOT_MATCHER_LEVELS_LIST[1],
  3: NTH_ROOT_MATCHER_LEVELS_LIST[2]
};

export const NthRootMatcher: React.FC<NthRootMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-exp-n-edik-gyok-matcher',
  topicTitle = '2. Számok n-edik gyöke – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="hatvany-gyok-logaritmus"
      topicId={topicId}
      subtopicId="szamok-n-edik-gyoke"
      title={topicTitle}
      subtitle="Párosítsd a gyököket az értékükkel, és a gyakorlati feladatokat az eredményükkel!"
      levels={NTH_ROOT_MATCHER_LEVELS}
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

export default NthRootMatcher;

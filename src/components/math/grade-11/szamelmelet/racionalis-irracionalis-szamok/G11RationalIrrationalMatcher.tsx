import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface G11RationalIrrationalMatcherProps {
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

const RATIONAL_IRRATIONAL_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Számítás és eredmény',
    description: 'Párosítsd a tankönyvi kidolgozott feladat számításait az eredményükkel!',
    pairs: [
      { id: 'rim1', left: '12-nek az 5/2 része', right: '30' },
      { id: 'rim2', left: '8⁰', right: '1' },
      { id: 'rim3', left: '√144', right: '12' },
      { id: 'rim4', left: '82-nek a 25 százaléka', right: '20,5' },
      { id: 'rim5', left: 'Az 5 és 12 oldalú téglalap átlója', right: '13' },
      { id: 'rim6', left: '1/5 − 2/3', right: '−7/15' },
      { id: 'rim7', left: 'A 4 sugarú kör területe', right: '16π' },
      { id: 'rim8', left: 'Az egységnégyzet átlója', right: '√2' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Szakaszos tizedes tört és közönséges tört',
    description: 'Párosítsd a végtelen szakaszos tizedes törtet a közönséges tört alakjával!',
    pairs: [
      { id: 'rim9', left: '0,333… = 0,(3)', right: '1/3' },
      { id: 'rim10', left: '0,2727… = 0,(27)', right: '3/11' },
      { id: 'rim11', left: '0,1666… = 0,1(6)', right: '1/6' },
      { id: 'rim12', left: '0,999… = 0,(9)', right: '1' },
      { id: 'rim13', left: '0,444… = 0,(4)', right: '4/9' },
      { id: 'rim14', left: '0,8333… = 0,8(3)', right: '5/6' },
      { id: 'rim15', left: '1,5454… = 1,(54)', right: '17/11' },
      { id: 'rim16', left: '2,13232… = 2,1(32)', right: '2111/990' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Állítás és példa',
    description: 'Párosítsd az állítást azzal a példával, amely igazolja!',
    pairs: [
      { id: 'rim17', left: 'Két irracionális szám összege lehet racionális', right: '√2 + (−√2) = 0' },
      { id: 'rim18', left: 'Két irracionális szám szorzata lehet racionális', right: '√3 · 2√3 = 6' },
      { id: 'rim19', left: 'Két irracionális szám hányadosa lehet racionális', right: '√8 : √2 = 2' },
      { id: 'rim20', left: 'Két irracionális szám különbsége lehet irracionális', right: '8π − 5π = 3π' },
      { id: 'rim21', left: 'A 6 felírható két irracionális szám összegeként', right: '√2 + (6 − √2) = 6' },
      { id: 'rim22', left: 'Racionális és irracionális szám szorzata lehet racionális', right: '0 · √3 = 0' },
      { id: 'rim23', left: 'Irracionális és racionális szám hányadosa lehet irracionális', right: '8π : 2 = 4π' },
      { id: 'rim24', left: 'A √5 hosszúságú szakasz megszerkeszthető', right: 'A 2 és 1 befogójú derékszögű háromszög átfogója' }
    ]
  }
];

const RATIONAL_IRRATIONAL_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: RATIONAL_IRRATIONAL_MATCHER_LEVELS_LIST[0],
  2: RATIONAL_IRRATIONAL_MATCHER_LEVELS_LIST[1],
  3: RATIONAL_IRRATIONAL_MATCHER_LEVELS_LIST[2]
};

export const G11RationalIrrationalMatcher: React.FC<G11RationalIrrationalMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-num-irracionalis-matcher',
  topicTitle = '10. Racionális számok, irracionális számok – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="szamelmelet"
      topicId={topicId}
      subtopicId="racionalis-irracionalis-szamok"
      title={topicTitle}
      subtitle="Párosítsd a számításokat az eredményükkel, a szakaszos tizedes törteket a közönséges törtekkel és az állításokat a példákkal!"
      levels={RATIONAL_IRRATIONAL_MATCHER_LEVELS}
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

export default G11RationalIrrationalMatcher;

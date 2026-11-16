import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface Translation4MatcherProps {
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

const TRANSLATION4_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Fő- és mellékvilágtájak',
    description: 'Párosítsd a rövidítést a világtáj nevével!',
    pairs: [
      { id: 'trm1', left: 'É', right: 'észak' },
      { id: 'trm2', left: 'K', right: 'kelet' },
      { id: 'trm3', left: 'D', right: 'dél' },
      { id: 'trm4', left: 'NY', right: 'nyugat' },
      { id: 'trm5', left: 'ÉK', right: 'északkelet' },
      { id: 'trm6', left: 'DK', right: 'délkelet' },
      { id: 'trm7', left: 'DNY', right: 'délnyugat' },
      { id: 'trm8', left: 'ÉNY', right: 'északnyugat' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Told vissza!',
    description: 'Melyik eltolás viszi vissza a radírt a helyére? Párosítsd!',
    pairs: [
      { id: 'trm9', left: 'Eltolás: 3 cm északra', right: 'Vissza: 3 cm délre' },
      { id: 'trm10', left: 'Eltolás: 2 cm keletre', right: 'Vissza: 2 cm nyugatra' },
      { id: 'trm11', left: 'Eltolás: 1 cm északkeletre', right: 'Vissza: 1 cm délnyugatra' },
      { id: 'trm12', left: 'Eltolás: 4 cm délkeletre', right: 'Vissza: 4 cm északnyugatra' },
      { id: 'trm13', left: 'Eltolás: 5 cm nyugatra', right: 'Vissza: 5 cm keletre' },
      { id: 'trm14', left: 'Eltolás: 6 cm délre', right: 'Vissza: 6 cm északra' },
      { id: 'trm15', left: 'Eltolás: 2 cm délnyugatra', right: 'Vissza: 2 cm északkeletre' },
      { id: 'trm16', left: 'Eltolás: 3 cm északnyugatra', right: 'Vissza: 3 cm délkeletre' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hová kerül összesen?',
    description: 'Párosítsd a lépéseket (négyzetekben) az eredményükkel!',
    pairs: [
      { id: 'trm17', left: '2K, majd 3K', right: '5 négyzettel keletre' },
      { id: 'trm18', left: '4É, majd 1D', right: '3 négyzettel északra' },
      { id: 'trm19', left: '3K, majd 3NY', right: 'visszaér a helyére' },
      { id: 'trm20', left: '2K, majd 2É', right: '2 lépéssel északkeletre' },
      { id: 'trm21', left: '6NY, majd 2K', right: '4 négyzettel nyugatra' },
      { id: 'trm22', left: '5D, 2É, majd 1D', right: '4 négyzettel délre' },
      { id: 'trm23', left: 'A busz az 1. megállótól a 4.-ig (5 cm-enként)', right: '15 cm' },
      { id: 'trm24', left: 'A 3 cm-enkénti jelölésekből a 4. (az első 0 cm)', right: '9 cm' }
    ]
  }
];

const TRANSLATION4_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: TRANSLATION4_MATCHER_LEVELS_LIST[0],
  2: TRANSLATION4_MATCHER_LEVELS_LIST[1],
  3: TRANSLATION4_MATCHER_LEVELS_LIST[2]
};

export const Translation4Matcher: React.FC<Translation4MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-geom-eltolas-matcher',
  topicTitle = '6. Eltolás – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="sikidomok-testek"
      topicId={topicId}
      subtopicId="eltolas"
      title={topicTitle}
      subtitle="Gyakorold a világtájakat, a visszatolást és az eltolások összegzését!"
      levels={TRANSLATION4_MATCHER_LEVELS}
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

export default Translation4Matcher;

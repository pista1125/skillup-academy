import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface MulDiv1000MatcherProps {
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

const MULDIV_1000_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Szorzótábla',
    description: 'Párosítsd a műveletet az eredményével!',
    pairs: [
      { id: 'md1m1', left: '6 · 9', right: '54' },
      { id: 'md1m2', left: '7 · 8', right: '56' },
      { id: 'md1m3', left: '4 · 9', right: '36' },
      { id: 'md1m4', left: '72 : 8', right: '9' },
      { id: 'md1m5', left: '24 : 6', right: '4' },
      { id: 'md1m6', left: '3 · 6', right: '18' },
      { id: 'md1m7', left: '5 · 10', right: '50' },
      { id: 'md1m8', left: '21 : 7', right: '3' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Kerek tízesek és százasok',
    description: 'Számold ki a szorzótábla segítségével!',
    pairs: [
      { id: 'md1m9', left: '60 · 5', right: '300' },
      { id: 'md1m10', left: '2 · 340', right: '680' },
      { id: 'md1m11', left: '9 · 50', right: '450' },
      { id: 'md1m12', left: '640 : 80', right: '8' },
      { id: 'md1m13', left: '1000 : 50', right: '20' },
      { id: 'md1m14', left: '420 : 60', right: '7' },
      { id: 'md1m15', left: '540 : 9', right: '60' },
      { id: 'md1m16', left: '7 · 70', right: '490' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Írásbeli szorzás',
    description: 'Számold ki írásban, és párosítsd a szorzatot!',
    pairs: [
      { id: 'md1m17', left: '214 · 3', right: '642' },
      { id: 'md1m18', left: '324 · 2', right: '648' },
      { id: 'md1m19', left: '124 · 4', right: '496' },
      { id: 'md1m20', left: '162 · 3', right: '486' },
      { id: 'md1m21', left: '148 · 6', right: '888' },
      { id: 'md1m22', left: '92 · 7', right: '644' },
      { id: 'md1m23', left: '57 · 6', right: '342' },
      { id: 'md1m24', left: '49 · 8', right: '392' }
    ]
  }
];

const MULDIV_1000_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: MULDIV_1000_MATCHER_LEVELS_LIST[0],
  2: MULDIV_1000_MATCHER_LEVELS_LIST[1],
  3: MULDIV_1000_MATCHER_LEVELS_LIST[2]
};

export const MulDiv1000Matcher: React.FC<MulDiv1000MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-count-szorzas-1000-matcher',
  topicTitle = '3. Szorzás és osztás 1000-ig – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="szamolas-10000-ig"
      topicId={topicId}
      subtopicId="szorzas-osztas-1000-ig"
      title={topicTitle}
      subtitle="Párosítsd a szorzásokat és osztásokat az eredményükkel!"
      levels={MULDIV_1000_MATCHER_LEVELS}
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

export default MulDiv1000Matcher;

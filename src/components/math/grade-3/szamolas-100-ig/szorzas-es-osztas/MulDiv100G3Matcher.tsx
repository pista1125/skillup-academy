import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { ArrayCard, GroupsCard } from './MulDiv100G3CardFigures';

interface MulDiv100G3MatcherProps {
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

const MUL_DIV_100_G3_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Szorzótábla',
    description: 'Párosítsd a szorzást vagy a korongképet az eredményével! A képen: hány sor, egy sorban hány korong?',
    pairs: [
      { id: 'md100m1', left: '', right: '12', promptFigure: <ArrayCard rows={3} cols={4} /> },
      { id: 'md100m2', left: '5 · 6', right: '30' },
      { id: 'md100m3', left: '', right: '18', promptFigure: <ArrayCard rows={2} cols={9} /> },
      { id: 'md100m4', left: '', right: '16', promptFigure: <ArrayCard rows={4} cols={4} /> },
      { id: 'md100m5', left: '7 · 5', right: '35' },
      { id: 'md100m6', left: '10 · 2', right: '20' },
      { id: 'md100m7', left: '', right: '9', promptFigure: <ArrayCard rows={3} cols={3} /> },
      { id: 'md100m8', left: '6 · 4', right: '24' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Osztás',
    description: 'Párosítsd az osztást a hányadosával! A képen számold meg a csoportokat!',
    pairs: [
      { id: 'md100m9', left: '72 : 8', right: '9' },
      { id: 'md100m10', left: '56 : 7', right: '8' },
      { id: 'md100m11', left: '42 : 6', right: '7' },
      { id: 'md100m12', left: '24 : 6', right: '4', promptFigure: <GroupsCard groups={4} size={6} /> },
      { id: 'md100m13', left: '35 : 7', right: '5', promptFigure: <GroupsCard groups={5} size={7} /> },
      { id: 'md100m14', left: '48 : 8', right: '6' },
      { id: 'md100m15', left: '27 : 9', right: '3', promptFigure: <GroupsCard groups={3} size={9} /> },
      { id: 'md100m16', left: '18 : 9', right: '2', promptFigure: <GroupsCard groups={2} size={9} /> }
    ]
  },
  {
    level: 3,
    title: '3. szint: Műveletcsaládok',
    description: 'Melyik osztás illik a szorzáshoz vagy a korongképhez? Párosítsd!',
    pairs: [
      { id: 'md100m17', left: '', right: '42 : 7 = 6', promptFigure: <ArrayCard rows={6} cols={7} /> },
      { id: 'md100m18', left: '8 · 9 = 72', right: '72 : 9 = 8' },
      { id: 'md100m19', left: '', right: '32 : 8 = 4', promptFigure: <ArrayCard rows={4} cols={8} /> },
      { id: 'md100m20', left: '9 · 6 = 54', right: '54 : 6 = 9' },
      { id: 'md100m21', left: '7 · 9 = 63', right: '63 : 9 = 7' },
      { id: 'md100m22', left: '', right: '40 : 8 = 5', promptFigure: <ArrayCard rows={5} cols={8} /> },
      { id: 'md100m23', left: '', right: '21 : 7 = 3', promptFigure: <ArrayCard rows={3} cols={7} /> },
      { id: 'md100m24', left: '8 · 8 = 64', right: '64 : 8 = 8' }
    ]
  }
];

export const MUL_DIV_100_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: MUL_DIV_100_G3_MATCHER_LEVELS_LIST[0],
  2: MUL_DIV_100_G3_MATCHER_LEVELS_LIST[1],
  3: MUL_DIV_100_G3_MATCHER_LEVELS_LIST[2]
};

export const MulDiv100G3Matcher: React.FC<MulDiv100G3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-c100-szorzas-matcher',
  topicTitle = '3. Szorzás és osztás – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="szamolas-100-ig"
      topicId={topicId}
      subtopicId="szorzas-es-osztas"
      title={topicTitle}
      subtitle="Párosítsd a szorzásokat és az osztásokat az eredményükkel!"
      levels={MUL_DIV_100_G3_MATCHER_LEVELS}
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

export default MulDiv100G3Matcher;

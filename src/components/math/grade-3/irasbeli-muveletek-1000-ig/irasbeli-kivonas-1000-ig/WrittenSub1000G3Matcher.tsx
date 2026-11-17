import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { MiniSub, MiniPay } from './WrittenSub1000G3CardFigures';

interface WrittenSub1000G3MatcherProps {
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

const LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: 0 a kisebbítendőben',
    description: 'Ha felül 0 van, 10-ig pótolj, és maradt 1!',
    pairs: [
      { id: 'ws1km1_0', left: '', promptFigure: <MiniSub a={704} b={258} />, right: '446' },
      { id: 'ws1km1_1', left: '', promptFigure: <MiniSub a={600} b={274} />, right: '326' },
      { id: 'ws1km1_2', left: '', promptFigure: <MiniSub a={905} b={362} />, right: '543' },
      { id: 'ws1km1_3', left: '', promptFigure: <MiniSub a={540} b={236} />, right: '304' },
      { id: 'ws1km1_4', left: '803 − 547', right: '256' },
      { id: 'ws1km1_5', left: '602 − 375', right: '227' },
      { id: 'ws1km1_6', left: '400 − 163', right: '237' },
      { id: 'ws1km1_7', left: '703 − 498', right: '205' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Az 1000-ből',
    description: 'Négy oszlop: háromszor is marad 1!',
    pairs: [
      { id: 'ws1km2_0', left: '', promptFigure: <MiniSub a={1000} b={347} />, right: '653' },
      { id: 'ws1km2_1', left: '', promptFigure: <MiniSub a={1000} b={509} />, right: '491' },
      { id: 'ws1km2_2', left: '', promptFigure: <MiniSub a={1000} b={726} />, right: '274' },
      { id: 'ws1km2_3', left: 'Mennyi marad?', promptFigure: <MiniPay wallet={1000} kind="book" price={685} />, right: '315 Ft' },
      { id: 'ws1km2_4', left: '1000 − 185', right: '815' },
      { id: 'ws1km2_5', left: '1000 − 638', right: '362' },
      { id: 'ws1km2_6', left: '1000 − 92', right: '908' },
      { id: 'ws1km2_7', left: '1000 − 451', right: '549' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Ellenőrzés',
    description: 'Melyik összeadással ellenőrizheted a kivonást?',
    pairs: [
      { id: 'ws1km3_0', left: '', promptFigure: <MiniSub a={832} b={467} r={365} />, right: '365 + 467' },
      { id: 'ws1km3_1', left: '', promptFigure: <MiniSub a={1000} b={547} r={453} />, right: '453 + 547' },
      { id: 'ws1km3_2', left: '', promptFigure: <MiniSub a={900} b={436} r={464} />, right: '464 + 436' },
      { id: 'ws1km3_3', left: '', promptFigure: <MiniSub a={805} b={468} r={337} />, right: '337 + 468' },
      { id: 'ws1km3_4', left: '914 − 657 = 257', right: '257 + 657' },
      { id: 'ws1km3_5', left: '512 − 278 = 234', right: '234 + 278' },
      { id: 'ws1km3_6', left: '703 − 498 = 205', right: '205 + 498' },
      { id: 'ws1km3_7', left: '1000 − 347 = 653', right: '653 + 347' }
    ]
  }
];

export const WRITTEN_SUB_1000_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = { 1: LIST[0], 2: LIST[1], 3: LIST[2] };

export const WrittenSub1000G3Matcher: React.FC<WrittenSub1000G3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-wops-kivonas-matcher',
  topicTitle = '2. Írásbeli kivonás 1000-ig – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="irasbeli-muveletek-1000-ig"
      topicId={topicId}
      subtopicId="irasbeli-kivonas-1000-ig"
      title={topicTitle}
      subtitle="Párosítsd a kivonásokat az eredményükkel!"
      levels={WRITTEN_SUB_1000_G3_MATCHER_LEVELS}
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

export default WrittenSub1000G3Matcher;

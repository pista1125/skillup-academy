import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { MiniCol } from './WrittenSubG3CardFigures';

interface WrittenSubG3MatcherProps {
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
    title: '1. szint: Egyesek, tízesek, százasok',
    description: 'Számold ki írásban, az egyesekkel kezdve!',
    pairs: [
      { id: 'wsum1_0', left: '', promptFigure: <MiniCol a={486} b={253} />, right: '233' },
      { id: 'wsum1_1', left: '', promptFigure: <MiniCol a={397} b={124} />, right: '273' },
      { id: 'wsum1_2', left: '', promptFigure: <MiniCol a={372} b={145} />, right: '227' },
      { id: 'wsum1_3', left: '', promptFigure: <MiniCol a={263} b={128} />, right: '135' },
      { id: 'wsum1_4', left: '458 − 136', right: '322' },
      { id: 'wsum1_5', left: '391 − 157', right: '234' },
      { id: 'wsum1_6', left: '495 − 182', right: '313' },
      { id: 'wsum1_7', left: '347 − 118', right: '229' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Maradék a tízeseknél is',
    description: 'Kétszer is maradhat 1. Figyelj a 0-ra a tízeseknél!',
    pairs: [
      { id: 'wsum2_0', left: '', promptFigure: <MiniCol a={428} b={175} />, right: '253' },
      { id: 'wsum2_1', left: '', promptFigure: <MiniCol a={421} b={186} />, right: '235' },
      { id: 'wsum2_2', left: '', promptFigure: <MiniCol a={364} b={178} />, right: '186' },
      { id: 'wsum2_3', left: '', promptFigure: <MiniCol a={403} b={157} />, right: '246' },
      { id: 'wsum2_4', left: '452 − 267', right: '185' },
      { id: 'wsum2_5', left: '315 − 128', right: '187' },
      { id: 'wsum2_6', left: '405 − 168', right: '237' },
      { id: 'wsum2_7', left: '330 − 154', right: '176' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Ellenőrzés',
    description: 'Melyik összeadással ellenőrizheted a kivonást?',
    pairs: [
      { id: 'wsum3_0', left: '', promptFigure: <MiniCol a={372} b={145} r={227} />, right: '227 + 145' },
      { id: 'wsum3_1', left: '', promptFigure: <MiniCol a={428} b={175} r={253} />, right: '253 + 175' },
      { id: 'wsum3_2', left: '', promptFigure: <MiniCol a={421} b={186} r={235} />, right: '235 + 186' },
      { id: 'wsum3_3', left: '', promptFigure: <MiniCol a={403} b={157} r={246} />, right: '246 + 157' },
      { id: 'wsum3_4', left: '364 − 178 = 186', right: '186 + 178' },
      { id: 'wsum3_5', left: '452 − 267 = 185', right: '185 + 267' },
      { id: 'wsum3_6', left: '315 − 128 = 187', right: '187 + 128' },
      { id: 'wsum3_7', left: '486 − 253 = 233', right: '233 + 253' }
    ]
  }
];

export const WRITTEN_SUB_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = { 1: LIST[0], 2: LIST[1], 3: LIST[2] };

export const WrittenSubG3Matcher: React.FC<WrittenSubG3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-wsub-irasbeli-matcher',
  topicTitle = '3. Írásbeli kivonás – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="irasbeli-kivonas"
      topicId={topicId}
      subtopicId="irasbeli-kivonas"
      title={topicTitle}
      subtitle="Párosítsd az írásbeli kivonásokat az eredményükkel!"
      levels={WRITTEN_SUB_G3_MATCHER_LEVELS}
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

export default WrittenSubG3Matcher;

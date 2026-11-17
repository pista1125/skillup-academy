import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { MiniRow, MiniLine } from './Rounding200G3CardFigures';

interface Rounding200G3MatcherProps {
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

const ROUNDING_200_G3_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Egyes szomszédok',
    description: 'Melyik két szám áll a szám mellett?',
    pairs: [
      { id: 'r200m1_0', left: '', promptFigure: <MiniRow items={['?', '127', '?']} />, right: '126 és 128' },
      { id: 'r200m1_1', left: '', promptFigure: <MiniRow items={['?', '143', '?']} />, right: '142 és 144' },
      { id: 'r200m1_2', left: '', promptFigure: <MiniRow items={['?', '170', '?']} />, right: '169 és 171' },
      { id: 'r200m1_3', left: '', promptFigure: <MiniRow items={['?', '195', '?']} />, right: '194 és 196' },
      { id: 'r200m1_4', left: '159', right: '158 és 160' },
      { id: 'r200m1_5', left: '181', right: '180 és 182' },
      { id: 'r200m1_6', left: '112', right: '111 és 113' },
      { id: 'r200m1_7', left: '104', right: '103 és 105' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Kerekítés tízesre',
    description: 'Párosítsd a számot a tízesre kerekített értékével!',
    pairs: [
      { id: 'r200m2_0', left: '112', promptFigure: <MiniLine lo={110} v={112} />, right: '110' },
      { id: 'r200m2_1', left: '118', promptFigure: <MiniLine lo={110} v={118} />, right: '120' },
      { id: 'r200m2_2', left: '145', promptFigure: <MiniLine lo={140} v={145} />, right: '150' },
      { id: 'r200m2_3', left: '173', promptFigure: <MiniLine lo={170} v={173} />, right: '170' },
      { id: 'r200m2_4', left: '134', right: '130' },
      { id: 'r200m2_5', left: '157', right: '160' },
      { id: 'r200m2_6', left: '186', right: '190' },
      { id: 'r200m2_7', left: '196', right: '200' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Gondoltam egy számot',
    description: 'Melyik számra gondoltam?',
    pairs: [
      { id: 'r200m3_0', left: 'kisebb egyes szomszédja', promptFigure: <MiniRow items={['139', '?']} />, right: '140' },
      { id: 'r200m3_1', left: 'nagyobb egyes szomszédja', promptFigure: <MiniRow items={['?', '110']} />, right: '109' },
      { id: 'r200m3_2', left: 'tízes szomszédai', promptFigure: <MiniRow items={['170', '?', '190']} />, right: '180' },
      { id: 'r200m3_3', left: 'tízes szomszédai, egyese 5', promptFigure: <MiniRow items={['120', '?', '130']} />, right: '125' },
      { id: 'r200m3_4', left: 'Tízesre kerekítve 200, az egyese 5.', right: '195' },
      { id: 'r200m3_5', left: 'A legkisebb szám, amelyből 160 lesz.', right: '155' },
      { id: 'r200m3_6', left: 'A legnagyobb szám, amelyből 110 lesz.', right: '114' },
      { id: 'r200m3_7', left: 'Tízesre kerekítve 100, az egyese 7.', right: '97' }
    ]
  }
];

export const ROUNDING_200_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: ROUNDING_200_G3_MATCHER_LEVELS_LIST[0],
  2: ROUNDING_200_G3_MATCHER_LEVELS_LIST[1],
  3: ROUNDING_200_G3_MATCHER_LEVELS_LIST[2]
};

export const Rounding200G3Matcher: React.FC<Rounding200G3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-c200-kerekites-matcher',
  topicTitle = '3. Számszomszédok, kerekítés – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="szamolas-200-ig"
      topicId={topicId}
      subtopicId="szamszomszedok-kerekites"
      title={topicTitle}
      subtitle="Párosítsd a számokat a szomszédaikkal és a kerekített értékükkel!"
      levels={ROUNDING_200_G3_MATCHER_LEVELS}
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

export default Rounding200G3Matcher;

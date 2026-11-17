import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { RodsOpCard, JumpCard, BarCard } from './AddSub100G3CardFigures';

interface AddSub100G3MatcherProps {
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

const ADD_SUB_100_G3_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Kerek tízesek',
    description: 'Párosítsd a műveletet vagy a rudas képet az eredményével! A kihúzott rudakat elvettük.',
    pairs: [
      { id: 'as100m1_0', left: '', right: '70', promptFigure: <RodsOpCard a={3} b={4} op="+" /> },
      { id: 'as100m1_1', left: '', right: '30', promptFigure: <RodsOpCard a={9} b={6} op="−" /> },
      { id: 'as100m1_2', left: '', right: '80', promptFigure: <RodsOpCard a={2} b={6} op="+" /> },
      { id: 'as100m1_3', left: '100 − 50', right: '50' },
      { id: 'as100m1_4', left: '10 + 80', right: '90' },
      { id: 'as100m1_5', left: '', right: '20', promptFigure: <RodsOpCard a={7} b={5} op="−" /> },
      { id: 'as100m1_6', left: '40 + 60', right: '100' },
      { id: 'as100m1_7', left: '80 − 40', right: '40' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Tízesátlépés',
    description: 'Ugorj előbb a kerek tízesig, és párosíts! A számegyenesen a lila vonás a kerek tízes.',
    pairs: [
      { id: 'as100m2_0', left: '', right: '32', promptFigure: <JumpCard start={27} delta={5} /> },
      { id: 'as100m2_1', left: '38 + 7', right: '45' },
      { id: 'as100m2_2', left: '', right: '64', promptFigure: <JumpCard start={56} delta={8} /> },
      { id: 'as100m2_3', left: '69 + 4', right: '73' },
      { id: 'as100m2_4', left: '41 − 6', right: '35' },
      { id: 'as100m2_5', left: '', right: '46', promptFigure: <JumpCard start={53} delta={-7} /> },
      { id: 'as100m2_6', left: '', right: '77', promptFigure: <JumpCard start={82} delta={-5} /> },
      { id: 'as100m2_7', left: '95 − 9', right: '86' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Kétjegyű számok',
    description: 'Előbb a tízesek, aztán az egyesek! A szalagos képen a „?” helyére kell a szám.',
    pairs: [
      { id: 'as100m3_0', left: '', right: '83', promptFigure: <BarCard a={36} b={47} mode="add" /> },
      { id: 'as100m3_1', left: '58 + 29', right: '87' },
      { id: 'as100m3_2', left: '', right: '64', promptFigure: <BarCard a={25} b={39} mode="add" /> },
      { id: 'as100m3_3', left: '17 + 74', right: '91' },
      { id: 'as100m3_4', left: '', right: '34', promptFigure: <BarCard a={72} b={38} mode="sub" /> },
      { id: 'as100m3_5', left: '91 − 45', right: '46' },
      { id: 'as100m3_6', left: '64 − 19', right: '45' },
      { id: 'as100m3_7', left: '', right: '53', promptFigure: <BarCard a={80} b={27} mode="sub" /> }
    ]
  }
];

export const ADD_SUB_100_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: ADD_SUB_100_G3_MATCHER_LEVELS_LIST[0],
  2: ADD_SUB_100_G3_MATCHER_LEVELS_LIST[1],
  3: ADD_SUB_100_G3_MATCHER_LEVELS_LIST[2]
};

export const AddSub100G3Matcher: React.FC<AddSub100G3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-c100-osszeadas-matcher',
  topicTitle = '2. Összeadás és kivonás – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="szamolas-100-ig"
      topicId={topicId}
      subtopicId="osszeadas-es-kivonas"
      title={topicTitle}
      subtitle="Párosítsd a műveleteket az eredményükkel!"
      levels={ADD_SUB_100_G3_MATCHER_LEVELS}
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

export default AddSub100G3Matcher;

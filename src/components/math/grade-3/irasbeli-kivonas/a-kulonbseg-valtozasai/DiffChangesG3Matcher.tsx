import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { MiniTwoChanges, MiniShift } from './DiffChangesG3CardFigures';

interface DiffChangesG3MatcherProps {
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

const DIFF_CHANGES_G3_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Egy szám változik',
    description: 'Kék doboz = kisebbítendő, narancs doboz = kivonandó. Mennyi lesz az új különbség?',
    pairs: [
      { id: 'dcm1_0', left: 'Különbség: 300', promptFigure: <MiniTwoChanges m={10} s={0} />, right: '310' },
      { id: 'dcm1_1', left: 'Különbség: 300', promptFigure: <MiniTwoChanges m={0} s={10} />, right: '290' },
      { id: 'dcm1_2', left: 'Különbség: 380', promptFigure: <MiniTwoChanges m={-100} s={0} />, right: '280' },
      { id: 'dcm1_3', left: 'Különbség: 380', promptFigure: <MiniTwoChanges m={0} s={-100} />, right: '480' },
      { id: 'dcm1_4', left: 'Különbség: 420. A kisebbítendő +20.', right: '440' },
      { id: 'dcm1_5', left: 'Különbség: 420. A kivonandó +20.', right: '400' },
      { id: 'dcm1_6', left: 'Különbség: 175. A kivonandó −1.', right: '176' },
      { id: 'dcm1_7', left: 'Különbség: 175. A kisebbítendő −1.', right: '174' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mindkét szám változik',
    description: 'Kék doboz = kisebbítendő, narancs doboz = kivonandó. Mi lesz a különbséggel?',
    pairs: [
      { id: 'dcm2_0', left: '', promptFigure: <MiniTwoChanges m={10} s={10} />, right: 'nem változik' },
      { id: 'dcm2_1', left: '', promptFigure: <MiniTwoChanges m={10} s={-10} />, right: '20-szal nő' },
      { id: 'dcm2_2', left: '', promptFigure: <MiniTwoChanges m={-10} s={10} />, right: '20-szal csökken' },
      { id: 'dcm2_3', left: '', promptFigure: <MiniTwoChanges m={100} s={10} />, right: '90-nel nő' },
      { id: 'dcm2_4', left: '', promptFigure: <MiniTwoChanges m={10} s={100} />, right: '90-nel csökken' },
      { id: 'dcm2_5', left: 'A kisebbítendő 100-zal nagyobb, a kivonandó ugyanaz.', right: '100-zal nő' },
      { id: 'dcm2_6', left: 'A kivonandó 1-gyel nagyobb, a kisebbítendő ugyanaz.', right: '1-gyel csökken' },
      { id: 'dcm2_7', left: 'A kisebbítendő −10, a kivonandó −1.', right: '9-cel csökken' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Okos kivonás',
    description: 'Változtasd mindkét számot ugyanannyival, hogy kerek legyen! Mennyi a különbség?',
    pairs: [
      { id: 'dcm3_0', left: '', promptFigure: <MiniShift m={443} s={297} k={3} />, right: '146' },
      { id: 'dcm3_1', left: '', promptFigure: <MiniShift m={412} s={290} k={10} />, right: '122' },
      { id: 'dcm3_2', left: '', promptFigure: <MiniShift m={362} s={298} k={2} />, right: '64' },
      { id: 'dcm3_3', left: '', promptFigure: <MiniShift m={405} s={304} k={-4} />, right: '101' },
      { id: 'dcm3_4', left: '351 − 99', right: '252' },
      { id: 'dcm3_5', left: '460 − 198', right: '262' },
      { id: 'dcm3_6', left: '480 − 195', right: '285' },
      { id: 'dcm3_7', left: '431 − 196', right: '235' }
    ]
  }
];

export const DIFF_CHANGES_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: DIFF_CHANGES_G3_MATCHER_LEVELS_LIST[0],
  2: DIFF_CHANGES_G3_MATCHER_LEVELS_LIST[1],
  3: DIFF_CHANGES_G3_MATCHER_LEVELS_LIST[2]
};

export const DiffChangesG3Matcher: React.FC<DiffChangesG3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-wsub-valtozasok-matcher',
  topicTitle = '4. A különbség változásai – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="irasbeli-kivonas"
      topicId={topicId}
      subtopicId="a-kulonbseg-valtozasai"
      title={topicTitle}
      subtitle="Párosítsd a változásokat a különbséggel!"
      levels={DIFF_CHANGES_G3_MATCHER_LEVELS}
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

export default DiffChangesG3Matcher;

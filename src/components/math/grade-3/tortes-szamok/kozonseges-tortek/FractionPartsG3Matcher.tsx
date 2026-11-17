import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { FracCard, FlagCard, CupCard, RodCard } from './FractionPartsG3CardFigures';

interface FractionPartsG3MatcherProps {
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

const FRACTION_PARTS_G3_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Hányad része színes?',
    description: 'Számold meg az összes részt! Ez adja a nevet.',
    pairs: [
      { id: 'frpm1', left: '', promptFigure: <FracCard kind="pie" n={2} k={1} />, right: '1 ketted' },
      { id: 'frpm2', left: 'Hányad része piros?', promptFigure: <FlagCard kind="hu" />, right: '1 harmad' },
      { id: 'frpm3', left: '', promptFigure: <FracCard kind="grid" n={4} k={1} rows={2} />, right: '1 negyed' },
      { id: 'frpm4', left: '', promptFigure: <FracCard kind="bar" n={5} k={1} />, right: '1 ötöd' },
      { id: 'frpm5', left: '', promptFigure: <FracCard kind="pie" n={6} k={1} />, right: '1 hatod' },
      { id: 'frpm6', left: '8 egyenlő részből 1', right: '1 nyolcad' },
      { id: 'frpm7', left: 'Hányad része van tele?', promptFigure: <CupCard fill={1} />, right: '1 tized' },
      { id: 'frpm8', left: 'Mind a 3 rész színes.', promptFigure: <FracCard kind="pie" n={3} k={3} />, right: '1 egész' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Több rész színes',
    description: 'Hány részből áll az egész? Hány színes?',
    pairs: [
      { id: 'frpm9', left: '', promptFigure: <FracCard kind="pie" n={4} k={3} />, right: '3 negyed' },
      { id: 'frpm10', left: '', promptFigure: <FracCard kind="bar" n={3} k={2} />, right: '2 harmad' },
      { id: 'frpm11', left: '', promptFigure: <FracCard kind="grid" n={6} k={5} rows={2} />, right: '5 hatod' },
      { id: 'frpm12', left: '', promptFigure: <FracCard kind="bar" n={5} k={3} />, right: '3 ötöd' },
      { id: 'frpm13', left: '', promptFigure: <FracCard kind="grid" n={8} k={3} rows={2} />, right: '3 nyolcad' },
      { id: 'frpm14', left: '10 egyenlő részből 7', right: '7 tized' },
      { id: 'frpm15', left: 'A pizza 5 egyenlő szeletéből 2', right: '2 ötöd' },
      { id: 'frpm16', left: 'A torta 6 egyenlő szeletéből 4', right: '4 hatod' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Az egész és a rudak',
    description: 'Hány rész adja ki az egészet? Mekkora része a kis rúd a nagynak?',
    pairs: [
      { id: 'frpm17', left: 'Hány harmad az egész?', right: '3 harmad' },
      { id: 'frpm18', left: 'Hány hatod az egész?', right: '6 hatod' },
      { id: 'frpm19', left: 'Hány tized az egész?', right: '10 tized' },
      { id: 'frpm20', left: 'Mennyi hiányzik az egészhez?', promptFigure: <FracCard kind="pie" n={4} k={3} color="#22c55e" />, right: '1 negyed' },
      { id: 'frpm21', left: 'Mennyi hiányzik az egészhez?', promptFigure: <FracCard kind="bar" n={5} k={2} color="#22c55e" />, right: '3 ötöd' },
      { id: 'frpm22', left: 'Az alsó rúd a felsőnek…', promptFigure: <RodCard whole={10} part={2} />, right: '1 ötöde' },
      { id: 'frpm23', left: 'Az alsó rúd a felsőnek…', promptFigure: <RodCard whole={8} part={4} />, right: '1 kettede' },
      { id: 'frpm24', left: 'Az alsó rúd a felsőnek…', promptFigure: <RodCard whole={8} part={1} />, right: '1 nyolcada' }
    ]
  }
];

export const FRACTION_PARTS_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: FRACTION_PARTS_G3_MATCHER_LEVELS_LIST[0],
  2: FRACTION_PARTS_G3_MATCHER_LEVELS_LIST[1],
  3: FRACTION_PARTS_G3_MATCHER_LEVELS_LIST[2]
};

export const FractionPartsG3Matcher: React.FC<FractionPartsG3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-frac-tortreszek-matcher',
  topicTitle = '2. Törtrészek: fele, harmada, negyede – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="tortes-szamok"
      topicId={topicId}
      subtopicId="kozonseges-tortek"
      title={topicTitle}
      subtitle="Párosítsd a képeket a törtrészek nevével!"
      levels={FRACTION_PARTS_G3_MATCHER_LEVELS}
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

export default FractionPartsG3Matcher;

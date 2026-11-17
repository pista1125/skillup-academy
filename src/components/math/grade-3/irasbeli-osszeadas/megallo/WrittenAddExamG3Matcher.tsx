import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { MiniColumn } from './WrittenAddExamG3CardFigures';
import { MiniTags } from '../szoveges-feladatok/AddWordProblemsG3CardFigures';

interface WrittenAddExamG3MatcherProps {
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

const WRITTEN_ADD_EXAM_G3_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Írásban és fejben',
    description: 'Számold ki, és párosítsd az eredménnyel!',
    pairs: [
      { id: 'waxm1_0', left: '', promptFigure: <MiniColumn a={278} b={145} />, right: '423' },
      { id: 'waxm1_1', left: '', promptFigure: <MiniColumn a={369} b={257} />, right: '626' },
      { id: 'waxm1_2', left: '', promptFigure: <MiniColumn a={214} b={143} />, right: '357' },
      { id: 'waxm1_3', left: '', promptFigure: <MiniColumn a={358} b={64} />, right: '422' },
      { id: 'waxm1_4', left: '350 + 40', right: '390' },
      { id: 'waxm1_5', left: '270 + 50', right: '320' },
      { id: 'waxm1_6', left: '418 + 300', right: '718' },
      { id: 'waxm1_7', left: '290 + 340', right: '630' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Kerekítés és becslés',
    description: 'Az árcéduláknál kerekíts tízesre! Párosítsd a becsléssel!',
    pairs: [
      { id: 'waxm2_0', left: '', promptFigure: <MiniTags a={326} b={158} />, right: 'B: 490' },
      { id: 'waxm2_1', left: '', promptFigure: <MiniTags a={278} b={145} />, right: 'B: 430' },
      { id: 'waxm2_2', left: '', promptFigure: <MiniTags a={384} b={247} />, right: 'B: 630' },
      { id: 'waxm2_3', left: '', promptFigure: <MiniTags a={195} b={408} />, right: 'B: 610' },
      { id: 'waxm2_4', left: '247 ≈ ? (tízesre)', right: '250' },
      { id: 'waxm2_5', left: '650 ≈ ? (százasra)', right: '700' },
      { id: 'waxm2_6', left: '138 + 461 (százasra)', right: 'B: 600' },
      { id: 'waxm2_7', left: '505 ≈ ? (tízesre)', right: '510' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hiányzó számok',
    description: 'Melyik számjegy vagy szám hiányzik? Kezdd az egyesektől!',
    pairs: [
      { id: 'waxm3_0', left: '', promptFigure: <MiniColumn a="3?7" b={248} result={635} />, right: '8' },
      { id: 'waxm3_1', left: '', promptFigure: <MiniColumn a={256} b="1?9" result={415} />, right: '5' },
      { id: 'waxm3_2', left: '', promptFigure: <MiniColumn a="?48" b={175} result={423} />, right: '2' },
      { id: 'waxm3_3', left: '', promptFigure: <MiniColumn a="2?6" b={152} result={368} />, right: '1' },
      { id: 'waxm3_4', left: '168 + □ = 435', right: '267' },
      { id: 'waxm3_5', left: '□ + 268 = 531', right: '263' },
      { id: 'waxm3_6', left: '276 + □ = 500', right: '224' },
      { id: 'waxm3_7', left: '□ + 186 = 512', right: '326' }
    ]
  }
];

export const WRITTEN_ADD_EXAM_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: WRITTEN_ADD_EXAM_G3_MATCHER_LEVELS_LIST[0],
  2: WRITTEN_ADD_EXAM_G3_MATCHER_LEVELS_LIST[1],
  3: WRITTEN_ADD_EXAM_G3_MATCHER_LEVELS_LIST[2]
};

export const WrittenAddExamG3Matcher: React.FC<WrittenAddExamG3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-wadd-tudasproba-matcher',
  topicTitle = '6. Megálló – tudáspróba – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="irasbeli-osszeadas"
      topicId={topicId}
      subtopicId="megallo"
      title={topicTitle}
      subtitle="Párosítsd a feladatokat az eredményükkel!"
      levels={WRITTEN_ADD_EXAM_G3_MATCHER_LEVELS}
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

export default WrittenAddExamG3Matcher;

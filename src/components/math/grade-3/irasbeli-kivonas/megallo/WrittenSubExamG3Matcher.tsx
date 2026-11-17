import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { MiniCol, MiniCoins } from './WrittenSubExamG3CardFigures';

interface WrittenSubExamG3MatcherProps {
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

const WRITTEN_SUB_EXAM_G3_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Kivonás fejben és írásban',
    description: 'Számold ki a különbséget! Párosítsd az eredménnyel!',
    pairs: [
      { id: 'wsem1_0', left: '', promptFigure: <MiniCol m={475} s={132} />, right: '343' },
      { id: 'wsem1_1', left: '', promptFigure: <MiniCol m={368} s={145} />, right: '223' },
      { id: 'wsem1_2', left: '', promptFigure: <MiniCol m={294} s={171} />, right: '123' },
      { id: 'wsem1_3', left: '', promptFigure: <MiniCol m={457} s={306} />, right: '151' },
      { id: 'wsem1_4', left: '460 − 200', right: '260' },
      { id: 'wsem1_5', left: '390 − 50', right: '340' },
      { id: 'wsem1_6', left: '500 − 120', right: '380' },
      { id: 'wsem1_7', left: '420 − 300', right: '120' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Maradékkal',
    description: 'Vigyázz, itt marad 1! Párosítsd az eredménnyel!',
    pairs: [
      { id: 'wsem2_0', left: '', promptFigure: <MiniCol m={352} s={128} />, right: '224' },
      { id: 'wsem2_1', left: '', promptFigure: <MiniCol m={441} s={265} />, right: '176' },
      { id: 'wsem2_2', left: '', promptFigure: <MiniCol m={305} s={147} />, right: '158' },
      { id: 'wsem2_3', left: '', promptFigure: <MiniCol m={400} s={236} />, right: '164' },
      { id: 'wsem2_4', left: '273 − 98', right: '175' },
      { id: 'wsem2_5', left: '462 − 187', right: '275' },
      { id: 'wsem2_6', left: '330 − 145', right: '185' },
      { id: 'wsem2_7', left: '500 − 263', right: '237' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mennyi marad? Kb. mennyi?',
    description: 'Az áthúzott érméket elköltöttük. Mennyi marad? A kivonásoknál becsülj!',
    pairs: [
      { id: 'wsem3_0', left: '', promptFigure: <MiniCoins coins={[200, 100, 100, 50]} crossed={[1]} />, right: '350 Ft' },
      { id: 'wsem3_1', left: '', promptFigure: <MiniCoins coins={[200, 200, 50, 20]} crossed={[0, 2]} />, right: '220 Ft' },
      { id: 'wsem3_2', left: '', promptFigure: <MiniCoins coins={[100, 100, 100, 20, 10]} crossed={[0, 3]} />, right: '210 Ft' },
      { id: 'wsem3_3', left: '', promptFigure: <MiniCoins coins={[200, 100, 50, 50, 10]} crossed={[1, 2, 4]} />, right: '250 Ft' },
      { id: 'wsem3_4', left: '389 − 214 (százasra becsülj)', right: '≈ 200' },
      { id: 'wsem3_5', left: '468 − 255 (tízesre becsülj)', right: '≈ 210' },
      { id: 'wsem3_6', left: '351 − 128 (tízesre becsülj)', right: '≈ 220' },
      { id: 'wsem3_7', left: '472 − 129 (százasra becsülj)', right: '≈ 400' }
    ]
  }
];

export const WRITTEN_SUB_EXAM_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: WRITTEN_SUB_EXAM_G3_MATCHER_LEVELS_LIST[0],
  2: WRITTEN_SUB_EXAM_G3_MATCHER_LEVELS_LIST[1],
  3: WRITTEN_SUB_EXAM_G3_MATCHER_LEVELS_LIST[2]
};

export const WrittenSubExamG3Matcher: React.FC<WrittenSubExamG3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-wsub-tudasproba-matcher',
  topicTitle = '5. Megálló – tudáspróba – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="irasbeli-kivonas"
      topicId={topicId}
      subtopicId="megallo"
      title={topicTitle}
      subtitle="Párosítsd a kivonásokat az eredménnyel!"
      levels={WRITTEN_SUB_EXAM_G3_MATCHER_LEVELS}
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

export default WrittenSubExamG3Matcher;

import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { MiniLine } from './SumEstimateG3CardFigures';
import { MiniTags } from '../haromjegyu-szamok-osszeadasa/ThreeDigitAddG3CardFigures';

interface SumEstimateG3MatcherProps {
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
    title: '1. szint: Kerekítés',
    description: 'Kerekítsd a számot, ahogy a kártya kéri!',
    pairs: [
      { id: 'sesm1_0', left: 'százasra', promptFigure: <MiniLine lo={200} hi={300} v={238} />, right: '200' },
      { id: 'sesm1_1', left: 'százasra', promptFigure: <MiniLine lo={300} hi={400} v={351} />, right: '400' },
      { id: 'sesm1_2', left: 'tízesre', promptFigure: <MiniLine lo={170} hi={180} v={176} />, right: '180' },
      { id: 'sesm1_3', left: 'tízesre', promptFigure: <MiniLine lo={280} hi={290} v={284} />, right: '280' },
      { id: 'sesm1_4', left: '145 százasra', right: '100' },
      { id: 'sesm1_5', left: '250 százasra', right: '300' },
      { id: 'sesm1_6', left: '455 tízesre', right: '460' },
      { id: 'sesm1_7', left: '312 tízesre', right: '310' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Becslés tízesre',
    description: 'Kerekítsd tízesre a tagokat, és add össze!',
    pairs: [
      { id: 'sesm2_0', left: 'tízesre', promptFigure: <MiniTags prices={[127, 235]} />, right: 'B: 370' },
      { id: 'sesm2_1', left: 'tízesre', promptFigure: <MiniTags prices={[162, 228]} />, right: 'B: 390' },
      { id: 'sesm2_2', left: 'tízesre', promptFigure: <MiniTags prices={[153, 141]} />, right: 'B: 290' },
      { id: 'sesm2_3', left: 'tízesre', promptFigure: <MiniTags prices={[365, 124]} />, right: 'B: 490' },
      { id: 'sesm2_4', left: '245 + 125', right: 'B: 380' },
      { id: 'sesm2_5', left: '196 + 198', right: 'B: 400' },
      { id: 'sesm2_6', left: '118 + 213', right: 'B: 330' },
      { id: 'sesm2_7', left: '304 + 147', right: 'B: 450' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Melyik a pontos összeg?',
    description: 'Becsülj, és keresd meg a becsléshez közeli eredményt!',
    pairs: [
      { id: 'sesm3_0', left: 'együtt', promptFigure: <MiniTags prices={[187, 238]} />, right: '425' },
      { id: 'sesm3_1', left: 'együtt', promptFigure: <MiniTags prices={[135, 165]} />, right: '300' },
      { id: 'sesm3_2', left: 'együtt', promptFigure: <MiniTags prices={[247, 251]} />, right: '498' },
      { id: 'sesm3_3', left: 'együtt', promptFigure: <MiniTags prices={[213, 189]} />, right: '402' },
      { id: 'sesm3_4', left: '102 + 147', right: '249' },
      { id: 'sesm3_5', left: '316 + 158', right: '474' },
      { id: 'sesm3_6', left: '144 + 129', right: '273' },
      { id: 'sesm3_7', left: '256 + 117', right: '373' }
    ]
  }
];

export const SUM_ESTIMATE_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = { 1: LIST[0], 2: LIST[1], 3: LIST[2] };

export const SumEstimateG3Matcher: React.FC<SumEstimateG3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-wadd-becsles-matcher',
  topicTitle = '2. Az összeg becslése – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="irasbeli-osszeadas"
      topicId={topicId}
      subtopicId="az-osszeg-becslese"
      title={topicTitle}
      subtitle="Kerekíts, becsülj, és párosítsd!"
      levels={SUM_ESTIMATE_G3_MATCHER_LEVELS}
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

export default SumEstimateG3Matcher;

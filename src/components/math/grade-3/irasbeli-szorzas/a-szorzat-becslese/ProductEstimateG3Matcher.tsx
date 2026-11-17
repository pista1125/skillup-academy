import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { CardRound, CardTag } from './ProductEstimateG3CardFigures';

interface ProductEstimateG3MatcherProps {
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
    title: '1. szint: Kerekítsd tízesre!',
    description: 'Melyik kerek tízeshez van közelebb? 5-től felfelé!',
    pairs: [
      { id: 'estm1_0', left: '', promptFigure: <CardRound v={236} to={10} />, right: '≈ 240' },
      { id: 'estm1_1', left: '', promptFigure: <CardRound v={118} to={10} />, right: '≈ 120' },
      { id: 'estm1_2', left: '', promptFigure: <CardRound v={167} to={10} />, right: '≈ 170' },
      { id: 'estm1_3', left: '', promptFigure: <CardRound v={281} to={10} />, right: '≈ 280' },
      { id: 'estm1_4', left: '345 tízesre', right: '≈ 350' },
      { id: 'estm1_5', left: '452 tízesre', right: '≈ 450' },
      { id: 'estm1_6', left: '125 tízesre', right: '≈ 130' },
      { id: 'estm1_7', left: '394 tízesre', right: '≈ 390' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Becsülj százasra!',
    description: 'Kerekítsd az árat százasra, és úgy szorozz!',
    pairs: [
      { id: 'estm2_0', left: '', promptFigure: <CardTag price={185} m={4} />, right: '≈ 800' },
      { id: 'estm2_1', left: '', promptFigure: <CardTag price={312} m={3} />, right: '≈ 900' },
      { id: 'estm2_2', left: '', promptFigure: <CardTag price={236} m={2} />, right: '≈ 400' },
      { id: 'estm2_3', left: '', promptFigure: <CardTag price={149} m={3} />, right: '≈ 300' },
      { id: 'estm2_4', left: '251 · 2', right: '≈ 600' },
      { id: 'estm2_5', left: '118 · 5', right: '≈ 500' },
      { id: 'estm2_6', left: '132 · 7', right: '≈ 700' },
      { id: 'estm2_7', left: '450 · 2', right: '≈ 1000' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Becsülj tízesre!',
    description: 'Kerekítsd tízesre, és úgy szorozz!',
    pairs: [
      { id: 'estm3_0', left: '', promptFigure: <CardTag price={128} m={4} />, right: '≈ 520' },
      { id: 'estm3_1', left: '', promptFigure: <CardTag price={245} m={3} />, right: '≈ 750' },
      { id: 'estm3_2', left: '', promptFigure: <CardTag price={165} m={5} />, right: '≈ 850' },
      { id: 'estm3_3', left: '', promptFigure: <CardTag price={213} m={4} />, right: '≈ 840' },
      { id: 'estm3_4', left: '304 · 3', right: '≈ 900' },
      { id: 'estm3_5', left: '118 · 6', right: '≈ 720' },
      { id: 'estm3_6', left: '196 · 2', right: '≈ 400' },
      { id: 'estm3_7', left: '331 · 3', right: '≈ 990' }
    ]
  }
];

export const PRODUCT_ESTIMATE_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = { 1: LIST[0], 2: LIST[1], 3: LIST[2] };

export const ProductEstimateG3Matcher: React.FC<ProductEstimateG3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-wmul-becsles-matcher',
  topicTitle = '2. A szorzat becslése – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="irasbeli-szorzas"
      topicId={topicId}
      subtopicId="a-szorzat-becslese"
      title={topicTitle}
      subtitle="Kerekíts, becsülj, és párosítsd!"
      levels={PRODUCT_ESTIMATE_G3_MATCHER_LEVELS}
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

export default ProductEstimateG3Matcher;

import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { MiniRound, MiniTwoTags } from './DiffEstimateG3CardFigures';
import { MiniBuy } from '../haromjegyu-szamok-kivonasa/ThreeDigitSubG3CardFigures';

interface DiffEstimateG3MatcherProps {
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
    description: 'Melyik kerek szám van közelebb? Párosítsd!',
    pairs: [
      { id: 'desm1_0', left: 'százasra', promptFigure: <MiniRound n={382} step={100} />, right: '400' },
      { id: 'desm1_1', left: 'tízesre', promptFigure: <MiniRound n={145} step={10} />, right: '150' },
      { id: 'desm1_2', left: 'százasra', promptFigure: <MiniRound n={249} step={100} />, right: '200' },
      { id: 'desm1_3', left: 'tízesre', promptFigure: <MiniRound n={455} step={10} />, right: '460' },
      { id: 'desm1_4', left: '163 tízesre', right: '160' },
      { id: 'desm1_5', left: '98 százasra', right: '100' },
      { id: 'desm1_6', left: '327 tízesre', right: '330' },
      { id: 'desm1_7', left: '274 százasra', right: '300' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Becsüld meg a különbséget!',
    description: 'Előbb kerekíts, aztán vonj ki!',
    pairs: [
      { id: 'desm2_0', left: 'százasra ≈ ?', promptFigure: <MiniTwoTags a={382} b={145} />, right: '300' },
      { id: 'desm2_1', left: 'százasra ≈ ?', promptFigure: <MiniTwoTags a={410} b={190} />, right: '200' },
      { id: 'desm2_2', left: 'százasra ≈ ?', promptFigure: <MiniTwoTags a={486} b={97} />, right: '400' },
      { id: 'desm2_3', left: 'tízesre ≈ ?', promptFigure: <MiniTwoTags a={368} b={121} />, right: '250' },
      { id: 'desm2_4', left: 'tízesre ≈ ?', promptFigure: <MiniTwoTags a={293} b={147} />, right: '140' },
      { id: 'desm2_5', left: '238 − 148 (százasra)', right: '100' },
      { id: 'desm2_6', left: '455 − 236 (tízesre)', right: '220' },
      { id: 'desm2_7', left: '377 − 148 (tízesre)', right: '230' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Körülbelül és pontosan',
    description: 'Becsülj tízesre! A pontos eredményt is a becslés segít megtalálni.',
    pairs: [
      { id: 'desm3_0', left: 'kb. mennyi marad?', promptFigure: <MiniBuy wallet={500} kind="kite" price={278} />, right: 'kb. 220' },
      { id: 'desm3_1', left: 'kb. mennyi marad?', promptFigure: <MiniBuy wallet={450} kind="ball" price={186} />, right: 'kb. 260' },
      { id: 'desm3_2', left: 'kb. mennyi marad?', promptFigure: <MiniBuy wallet={400} kind="robot" price={233} />, right: 'kb. 170' },
      { id: 'desm3_3', left: 'kb. mennyi marad?', promptFigure: <MiniBuy wallet={350} kind="bear" price={162} />, right: 'kb. 190' },
      { id: 'desm3_4', left: '482 − 167 pontosan', right: '315' },
      { id: 'desm3_5', left: '465 − 378 pontosan', right: '87' },
      { id: 'desm3_6', left: '437 − 255 pontosan', right: '182' },
      { id: 'desm3_7', left: '412 − 368 pontosan', right: '44' }
    ]
  }
];

export const DIFF_ESTIMATE_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = { 1: LIST[0], 2: LIST[1], 3: LIST[2] };

export const DiffEstimateG3Matcher: React.FC<DiffEstimateG3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-wsub-becsles-matcher',
  topicTitle = '2. A különbség becslése – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="irasbeli-kivonas"
      topicId={topicId}
      subtopicId="a-kulonbseg-becslese"
      title={topicTitle}
      subtitle="Párosítsd a számokat és a kivonásokat a becsült értékükkel!"
      levels={DIFF_ESTIMATE_G3_MATCHER_LEVELS}
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

export default DiffEstimateG3Matcher;

import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { MiniAdd, MiniShop } from './WrittenAdd1000G3CardFigures';

interface WrittenAdd1000G3MatcherProps {
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
    title: '1. szint: Két tag, kétszer maradt 1',
    description: 'Számold ki írásban, az egyesekkel kezdve!',
    pairs: [
      { id: 'wa1km1_0', left: '', promptFigure: <MiniAdd xs={[476, 358]} />, right: '834' },
      { id: 'wa1km1_1', left: '', promptFigure: <MiniAdd xs={[567, 286]} />, right: '853' },
      { id: 'wa1km1_2', left: '', promptFigure: <MiniAdd xs={[298, 437]} />, right: '735' },
      { id: 'wa1km1_3', left: '', promptFigure: <MiniAdd xs={[659, 184]} />, right: '843' },
      { id: 'wa1km1_4', left: '375 + 447', right: '822' },
      { id: 'wa1km1_5', left: '188 + 535', right: '723' },
      { id: 'wa1km1_6', left: '469 + 278', right: '747' },
      { id: 'wa1km1_7', left: '593 + 219', right: '812' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Három tag',
    description: 'Figyelj: a maradék lehet 2 is!',
    pairs: [
      { id: 'wa1km2_0', left: '', promptFigure: <MiniAdd xs={[243, 135, 128]} />, right: '506' },
      { id: 'wa1km2_1', left: '', promptFigure: <MiniAdd xs={[159, 217, 346]} />, right: '722' },
      { id: 'wa1km2_2', left: '', promptFigure: <MiniAdd xs={[186, 357, 279]} />, right: '822' },
      { id: 'wa1km2_3', left: '', promptFigure: <MiniAdd xs={[264, 187, 349]} />, right: '800' },
      { id: 'wa1km2_4', left: '305 + 128 + 266', right: '699' },
      { id: 'wa1km2_5', left: '417 + 209 + 186', right: '812' },
      { id: 'wa1km2_6', left: '138 + 256 + 347', right: '741' },
      { id: 'wa1km2_7', left: '324 + 198 + 275', right: '797' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Vegyesen, 1000-ig',
    description: 'Árak, négy tag, és egy pont 1000-es összeg!',
    pairs: [
      { id: 'wa1km3_0', left: 'Együtt?', promptFigure: <MiniShop items={[{ kind: 'kite', price: 345 }, { kind: 'ball', price: 280 }]} />, right: '625 Ft' },
      { id: 'wa1km3_1', left: 'Együtt?', promptFigure: <MiniShop items={[{ kind: 'mug', price: 285 }, { kind: 'jar', price: 190 }, { kind: 'bear', price: 345 }]} />, right: '820 Ft' },
      { id: 'wa1km3_2', left: '', promptFigure: <MiniAdd xs={[563, 437]} cols={4} />, right: '1000' },
      { id: 'wa1km3_3', left: '', promptFigure: <MiniAdd xs={[389, 296, 245]} />, right: '930' },
      { id: 'wa1km3_4', left: '125 + 238 + 146 + 327', right: '836' },
      { id: 'wa1km3_5', left: '106 + 214 + 153 + 282', right: '755' },
      { id: 'wa1km3_6', left: '456 + 289 + 175', right: '920' },
      { id: 'wa1km3_7', left: '365 + 248 + 379', right: '992' }
    ]
  }
];

export const WRITTEN_ADD_1000_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = { 1: LIST[0], 2: LIST[1], 3: LIST[2] };

export const WrittenAdd1000G3Matcher: React.FC<WrittenAdd1000G3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-wops-osszeadas-matcher',
  topicTitle = '1. Írásbeli összeadás 1000-ig – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="irasbeli-muveletek-1000-ig"
      topicId={topicId}
      subtopicId="irasbeli-osszeadas-1000-ig"
      title={topicTitle}
      subtitle="Párosítsd az összeadásokat az összegükkel!"
      levels={WRITTEN_ADD_1000_G3_MATCHER_LEVELS}
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

export default WrittenAdd1000G3Matcher;

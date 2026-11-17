import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { MiniRoundLine, MiniHidden } from './Rounding1000G3CardFigures';

interface Rounding1000G3MatcherProps {
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
    title: '1. szint: Kerekítés tízesre',
    description: 'Melyik tízes szomszédhoz van közelebb? Nézd az egyest!',
    pairs: [
      { id: 'r1000m1_0', left: 'tízesre ≈ ?', promptFigure: <MiniRoundLine lo={870} hi={880} v={873} />, right: '870' },
      { id: 'r1000m1_1', left: 'tízesre ≈ ?', promptFigure: <MiniRoundLine lo={640} hi={650} v={646} />, right: '650' },
      { id: 'r1000m1_2', left: 'tízesre ≈ ?', promptFigure: <MiniRoundLine lo={990} hi={1000} v={995} />, right: '1000' },
      { id: 'r1000m1_3', left: 'tízesre ≈ ?', promptFigure: <MiniRoundLine lo={310} hi={320} v={312} />, right: '310' },
      { id: 'r1000m1_4', left: '428 ≈ ? (tízesre)', right: '430' },
      { id: 'r1000m1_5', left: '761 ≈ ? (tízesre)', right: '760' },
      { id: 'r1000m1_6', left: '555 ≈ ? (tízesre)', right: '560' },
      { id: 'r1000m1_7', left: '809 ≈ ? (tízesre)', right: '810' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Kerekítés százasra',
    description: 'Melyik százas szomszédhoz van közelebb? Nézd a tízest!',
    pairs: [
      { id: 'r1000m2_0', left: 'százasra ≈ ?', promptFigure: <MiniRoundLine lo={600} hi={700} v={638} />, right: '600' },
      { id: 'r1000m2_1', left: 'százasra ≈ ?', promptFigure: <MiniRoundLine lo={800} hi={900} v={850} />, right: '900' },
      { id: 'r1000m2_2', left: 'százasra ≈ ?', promptFigure: <MiniRoundLine lo={900} hi={1000} v={960} />, right: '1000' },
      { id: 'r1000m2_3', left: 'százasra ≈ ?', promptFigure: <MiniRoundLine lo={200} hi={300} v={230} />, right: '200' },
      { id: 'r1000m2_4', left: '374 ≈ ? (százasra)', right: '400' },
      { id: 'r1000m2_5', left: '719 ≈ ? (százasra)', right: '700' },
      { id: 'r1000m2_6', left: '849 ≈ ? (százasra)', right: '800' },
      { id: 'r1000m2_7', left: '483 ≈ ? (százasra)', right: '500' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Gondoltam egy számra',
    description: 'Melyik számra gondoltam? Csak egy szám jó!',
    pairs: [
      { id: 'r1000m3_0', left: 'tízesre ≈ 300', promptFigure: <MiniHidden digits={['2', '?', '5']} />, right: '295' },
      { id: 'r1000m3_1', left: 'százasra ≈ 300', promptFigure: <MiniHidden digits={['?', '1', '7']} />, right: '317' },
      { id: 'r1000m3_2', left: 'a legnagyobb, ami tízesre ≈ 370', promptFigure: <MiniHidden digits={['3', '7', '?']} />, right: '374' },
      { id: 'r1000m3_3', left: 'tízesre ≈ 1000', promptFigure: <MiniHidden digits={['9', '?', '8']} />, right: '998' },
      { id: 'r1000m3_4', left: 'A legkisebb szám, ami tízesre ≈ 820', right: '815' },
      { id: 'r1000m3_5', left: 'A legnagyobb szám, ami százasra ≈ 600', right: '649' },
      { id: 'r1000m3_6', left: 'A legkisebb szám, ami százasra ≈ 1000', right: '950' },
      { id: 'r1000m3_7', left: 'A legkisebb szám, ami tízesre ≈ 110', right: '105' }
    ]
  }
];

export const ROUNDING_1000_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: LIST[0],
  2: LIST[1],
  3: LIST[2]
};

export const Rounding1000G3Matcher: React.FC<Rounding1000G3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-c1000-kerekites-matcher',
  topicTitle = '2. Számszomszédok, kerekítés – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="szamolas-1000-ig"
      topicId={topicId}
      subtopicId="szamszomszedok-kerekites"
      title={topicTitle}
      subtitle="Párosítsd a számokat a kerekített értékükkel!"
      levels={ROUNDING_1000_G3_MATCHER_LEVELS}
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

export default Rounding1000G3Matcher;

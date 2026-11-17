import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { MiniHLine, MiniRow } from './Rounding500G3CardFigures';

interface Rounding500G3MatcherProps {
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

const ROUNDING_500_G3_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Szomszédok',
    description: 'Melyik két kerek százas között van a pont? Kik a szám szomszédai?',
    pairs: [
      { id: 'r500m1_0', left: 'százas szomszédok', promptFigure: <MiniHLine lo={200} v={236} />, right: '200 és 300' },
      { id: 'r500m1_1', left: 'százas szomszédok', promptFigure: <MiniHLine lo={300} v={372} />, right: '300 és 400' },
      { id: 'r500m1_2', left: 'százas szomszédok', promptFigure: <MiniHLine lo={400} v={415} />, right: '400 és 500' },
      { id: 'r500m1_3', left: 'százas szomszédok', promptFigure: <MiniHLine lo={100} v={181} />, right: '100 és 200' },
      { id: 'r500m1_4', left: 'A 257 tízes szomszédai', right: '250 és 260' },
      { id: 'r500m1_5', left: 'A 490 tízes szomszédai', right: '480 és 500' },
      { id: 'r500m1_6', left: 'A 300 százas szomszédai', right: '200 és 400' },
      { id: 'r500m1_7', left: '', promptFigure: <MiniRow items={['?', '338', '?']} />, right: '337 és 339' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Kerekítés',
    description: 'Kerekítsd a számot, ahogy a kártya kéri!',
    pairs: [
      { id: 'r500m2_0', left: '130 százasra', promptFigure: <MiniHLine lo={100} v={130} />, right: '100' },
      { id: 'r500m2_1', left: '219 százasra', promptFigure: <MiniHLine lo={200} v={219} />, right: '200' },
      { id: 'r500m2_2', left: '270 százasra', promptFigure: <MiniHLine lo={200} v={270} />, right: '300' },
      { id: 'r500m2_3', left: '350 százasra', promptFigure: <MiniHLine lo={300} v={350} />, right: '400' },
      { id: 'r500m2_4', left: '462 százasra', right: '500' },
      { id: 'r500m2_5', left: '384 tízesre', right: '380' },
      { id: 'r500m2_6', left: '445 tízesre', right: '450' },
      { id: 'r500m2_7', left: '226 tízesre', right: '230' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Gondoltam egy számot',
    description: 'Melyik számra gondoltam?',
    pairs: [
      { id: 'r500m3_0', left: 'A legkisebb szám, amelyből százasra kerekítve 300 lesz.', right: '250' },
      { id: 'r500m3_1', left: 'A legnagyobb szám, amelyből százasra kerekítve 300 lesz.', right: '349' },
      { id: 'r500m3_2', left: 'A legnagyobb szám, amelyből tízesre kerekítve 420 lesz.', right: '424' },
      { id: 'r500m3_3', left: 'A legkisebb szám, amelyből tízesre kerekítve 420 lesz.', right: '415' },
      { id: 'r500m3_4', left: 'kisebb egyes szomszédja', promptFigure: <MiniRow items={['469', '?']} />, right: '470' },
      { id: 'r500m3_5', left: 'nagyobb egyes szomszédja', promptFigure: <MiniRow items={['?', '300']} />, right: '299' },
      { id: 'r500m3_6', left: 'tízes szomszédai', promptFigure: <MiniRow items={['380', '?', '400']} />, right: '390' },
      { id: 'r500m3_7', left: 'százas szomszédai', promptFigure: <MiniRow items={['100', '?', '300']} />, right: '200' }
    ]
  }
];

export const ROUNDING_500_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: ROUNDING_500_G3_MATCHER_LEVELS_LIST[0],
  2: ROUNDING_500_G3_MATCHER_LEVELS_LIST[1],
  3: ROUNDING_500_G3_MATCHER_LEVELS_LIST[2]
};

export const Rounding500G3Matcher: React.FC<Rounding500G3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-c500-kerekites-matcher',
  topicTitle = '2. Számszomszédok, kerekítés – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="szamolas-500-ig"
      topicId={topicId}
      subtopicId="szamszomszedok-kerekites"
      title={topicTitle}
      subtitle="Párosítsd a számokat a szomszédaikkal és a kerekített értékükkel!"
      levels={ROUNDING_500_G3_MATCHER_LEVELS}
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

export default Rounding500G3Matcher;

import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { LineCard, HopCard } from './NumberLine200G3CardFigures';

interface NumberLine200G3MatcherProps {
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

const NUMBER_LINE_200_G3_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Előtte, utána, között',
    description: 'Melyik szám áll ott? Párosítsd!',
    pairs: [
      { id: 'nl200m1', left: '', promptFigure: <LineCard n={3} labels={[[1, '130']]} q={2} />, right: '131' },
      { id: 'nl200m2', left: 'a 130 előtt közvetlenül', right: '129' },
      { id: 'nl200m3', left: '', promptFigure: <LineCard n={3} labels={[[1, '199']]} q={2} />, right: '200' },
      { id: 'nl200m4', left: 'a 101 előtt közvetlenül', right: '100' },
      { id: 'nl200m5', left: '', promptFigure: <LineCard n={2} labels={[[0, '160'], [2, '162']]} q={1} />, right: '161' },
      { id: 'nl200m6', left: '', promptFigure: <LineCard n={3} labels={[[2, '175']]} q={1} />, right: '174' },
      { id: 'nl200m7', left: 'a 110 után közvetlenül', right: '111' },
      { id: 'nl200m8', left: 'a 190 és a 192 között', right: '191' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Pont középen',
    description: 'Melyik szám van pont középen a két szám között?',
    pairs: [
      { id: 'nl200m9', left: 'középen', promptFigure: <LineCard n={2} labels={[[0, '120'], [2, '130']]} q={1} />, right: '125' },
      { id: 'nl200m10', left: 'középen', promptFigure: <LineCard n={2} labels={[[0, '100'], [2, '200']]} q={1} />, right: '150' },
      { id: 'nl200m11', left: 'középen', promptFigure: <LineCard n={2} labels={[[0, '160'], [2, '180']]} q={1} />, right: '170' },
      { id: 'nl200m12', left: '180 és 200 között középen', right: '190' },
      { id: 'nl200m13', left: 'középen', promptFigure: <LineCard n={2} labels={[[0, '150'], [2, '160']]} q={1} />, right: '155' },
      { id: 'nl200m14', left: '110 és 130 között középen', right: '120' },
      { id: 'nl200m15', left: '170 és 172 között középen', right: '171' },
      { id: 'nl200m16', left: '100 és 120 között középen', right: '110' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Szöcskeugrások',
    description: 'Hová érkezik a szöcske? Számold meg az ugrásokat!',
    pairs: [
      { id: 'nl200m17', left: '', promptFigure: <HopCard from={136} d={5} />, right: '141' },
      { id: 'nl200m18', left: '', promptFigure: <HopCard from={136} d={-5} />, right: '131' },
      { id: 'nl200m19', left: '', promptFigure: <HopCard from={150} d={-8} />, right: '142' },
      { id: 'nl200m20', left: '189-től 7-et jobbra', right: '196' },
      { id: 'nl200m21', left: '120-tól 10-et jobbra', right: '130' },
      { id: 'nl200m22', left: '200-tól 9-et balra', right: '191' },
      { id: 'nl200m23', left: '105-től 6-ot balra', right: '99' },
      { id: 'nl200m24', left: '', promptFigure: <HopCard from={164} d={4} />, right: '168' }
    ]
  }
];

export const NUMBER_LINE_200_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: NUMBER_LINE_200_G3_MATCHER_LEVELS_LIST[0],
  2: NUMBER_LINE_200_G3_MATCHER_LEVELS_LIST[1],
  3: NUMBER_LINE_200_G3_MATCHER_LEVELS_LIST[2]
};

export const NumberLine200G3Matcher: React.FC<NumberLine200G3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-c200-szamegyenes-matcher',
  topicTitle = '2. Számok helye a számegyenesen – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="szamolas-200-ig"
      topicId={topicId}
      subtopicId="szamok-helye-a-szamegyenesen"
      title={topicTitle}
      subtitle="Párosítsd a helyeket és az ugrásokat a számokkal!"
      levels={NUMBER_LINE_200_G3_MATCHER_LEVELS}
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

export default NumberLine200G3Matcher;

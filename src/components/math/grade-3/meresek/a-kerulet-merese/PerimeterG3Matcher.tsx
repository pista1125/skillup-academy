import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { GridCard, SticksCard, PolyCard } from './PerimeterG3CardFigures';

interface PerimeterG3MatcherProps {
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

const PERIMETER_G3_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Számold meg, add össze!',
    description: 'A rácson 1 kis négyzet oldala 1 egység. A többinél add össze az oldalakat!',
    pairs: [
      { id: 'perm1', left: '', promptFigure: <GridCard cells={[[0, 0]]} />, right: '4 egység' },
      { id: 'perm2', left: '', promptFigure: <GridCard cells={[[0, 0], [1, 0], [2, 0]]} />, right: '8 egység' },
      { id: 'perm3', left: '', promptFigure: <GridCard cells={[[1, 0], [0, 1], [1, 1], [2, 1], [1, 2]]} />, right: '12 egység' },
      { id: 'perm4', left: '', promptFigure: <GridCard cells={[[0, 0], [1, 0]]} />, right: '6 egység' },
      { id: 'perm5', left: 'háromszög: 2 cm, 3 cm, 4 cm', right: '9 cm' },
      { id: 'perm6', left: 'négyszög: 1 cm, 2 cm, 3 cm, 4 cm', right: '10 cm' },
      { id: 'perm7', left: '3 pálcika, mind 5 cm', right: '15 cm' },
      { id: 'perm8', left: '5 pálcika, mind 4 cm', right: '20 cm' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Pálcikák és vegyes egységek',
    description: 'A képeken minden pálcika 6 cm. Ahol más egység is van, előbb válts át!',
    pairs: [
      { id: 'perm9', left: '', promptFigure: <SticksCard n={3} />, right: '18 cm' },
      { id: 'perm10', left: '', promptFigure: <SticksCard n={4} />, right: '24 cm' },
      { id: 'perm11', left: '', promptFigure: <SticksCard n={5} />, right: '30 cm' },
      { id: 'perm12', left: '', promptFigure: <SticksCard n={6} />, right: '36 cm' },
      { id: 'perm13', left: '45 mm + 55 mm + 50 mm', right: '15 cm' },
      { id: 'perm14', left: '1 dm + 1 dm + 8 cm', right: '28 cm' },
      { id: 'perm15', left: '12 m + 15 m + 20 m + 13 m', right: '60 m' },
      { id: 'perm16', left: '120 cm + 80 cm + 100 cm', right: '3 m' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mennyi hiányzik?',
    description: 'Ismered a kerületet. Keresd meg a hiányzó oldalt vagy a maradékot!',
    pairs: [
      { id: 'perm17', left: 'kerülete 20 cm', promptFigure: <PolyCard pts={[[66, 28], [99, 54], [51, 54]]} labels={['7 cm', '? cm', '5 cm']} />, right: '8 cm' },
      { id: 'perm18', left: 'kerülete 21 cm', promptFigure: <PolyCard pts={[[75, 30], [102, 54], [48, 54]]} labels={['6 cm', '? cm', '6 cm']} />, right: '9 cm' },
      { id: 'perm19', left: 'kerülete 15 cm', promptFigure: <PolyCard pts={[[63, 24], [87, 24], [91, 56], [59, 56]]} labels={['? cm', '4 cm', '4 cm', '4 cm']} />, right: '3 cm' },
      { id: 'perm20', left: 'kerülete 26 cm', promptFigure: <PolyCard pts={[[75, 14], [87, 52], [63, 52]]} labels={['10 cm', '? cm', '10 cm']} />, right: '6 cm' },
      { id: 'perm21', left: '4 egyforma oldal, a kerület 28 cm. Egy oldal?', right: '7 cm' },
      { id: 'perm22', left: '6 egyforma pálcika, a kerület 30 cm. Egy pálcika?', right: '5 cm' },
      { id: 'perm23', left: 'háromszög: 4 cm, 5 cm, 6 cm. Kétszer körbe?', right: '30 cm' },
      { id: 'perm24', left: '1 m szalag, a kerület 65 cm. Mennyi marad?', right: '35 cm' }
    ]
  }
];

export const PERIMETER_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: PERIMETER_G3_MATCHER_LEVELS_LIST[0],
  2: PERIMETER_G3_MATCHER_LEVELS_LIST[1],
  3: PERIMETER_G3_MATCHER_LEVELS_LIST[2]
};

export const PerimeterG3Matcher: React.FC<PerimeterG3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-meas-kerulet-matcher',
  topicTitle = '5. A kerület mérése – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="meresek"
      topicId={topicId}
      subtopicId="a-kerulet-merese"
      title={topicTitle}
      subtitle="Párosítsd a síkidomokat és az oldalhosszakat a kerületükkel!"
      levels={PERIMETER_G3_MATCHER_LEVELS}
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

export default PerimeterG3Matcher;

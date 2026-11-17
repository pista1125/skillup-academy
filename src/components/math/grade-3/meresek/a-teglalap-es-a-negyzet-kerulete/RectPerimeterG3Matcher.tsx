import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { RectCard, GridRectCard } from './RectPerimeterG3CardFigures';

interface RectPerimeterG3MatcherProps {
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

const RECT_PERIMETER_G3_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mennyi a kerülete?',
    description: 'A szemben lévő oldalak egyenlők. A négyzet minden oldala egyenlő.',
    pairs: [
      { id: 'rpm1', left: '', promptFigure: <RectCard w={4} h={2} labels={['4 cm', '2 cm', null, null]} />, right: '12 cm' },
      { id: 'rpm2', left: '', promptFigure: <RectCard w={5} h={3} labels={['5 cm', '3 cm', null, null]} />, right: '16 cm' },
      { id: 'rpm3', left: 'négyzet', promptFigure: <RectCard w={1} h={1} labels={['5 cm', null, null, null]} square />, right: '20 cm' },
      { id: 'rpm4', left: 'négyzet', promptFigure: <RectCard w={1} h={1} labels={['6 cm', null, null, null]} square />, right: '24 cm' },
      { id: 'rpm5', left: '3 cm + 1 cm + 3 cm + 1 cm', right: '8 cm' },
      { id: 'rpm6', left: '7 cm + 7 cm + 2 cm + 2 cm', right: '18 cm' },
      { id: 'rpm7', left: 'négyzet, oldala 7 cm', right: '28 cm' },
      { id: 'rpm8', left: 'téglalap: 10 cm és 1 cm', right: '22 cm' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Rácson és a valóságban',
    description: 'A rácson 1 kis négyzet oldala 1 egység. Figyelj az egységekre!',
    pairs: [
      { id: 'rpm9', left: '', promptFigure: <GridRectCard w={2} h={1} />, right: '6 egység' },
      { id: 'rpm10', left: '', promptFigure: <GridRectCard w={3} h={2} />, right: '10 egység' },
      { id: 'rpm11', left: '', promptFigure: <GridRectCard w={4} h={2} />, right: '12 egység' },
      { id: 'rpm12', left: '', promptFigure: <GridRectCard w={4} h={4} />, right: '16 egység' },
      { id: 'rpm13', left: 'téglalap alakú kert: 25 m és 10 m', right: '70 m' },
      { id: 'rpm14', left: 'négyzet, oldala 30 cm', right: '120 cm' },
      { id: 'rpm15', left: 'téglalap: 1 m és 50 cm', right: '300 cm' },
      { id: 'rpm16', left: 'négyzet alakú rét, oldala 100 m', right: '400 m' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Visszafelé és két lépésben',
    description: 'Ismered a kerületet. Mennyi a hiányzó oldal?',
    pairs: [
      { id: 'rpm17', left: 'négyzet, kerülete 32 cm', promptFigure: <RectCard w={1} h={1} labels={['?', null, null, null]} square />, right: '8 cm' },
      { id: 'rpm18', left: 'négyzet, kerülete 20 cm', promptFigure: <RectCard w={1} h={1} labels={[null, null, null, '?']} square />, right: '5 cm' },
      { id: 'rpm19', left: 'kerülete 16 cm', promptFigure: <RectCard w={6} h={2} labels={['6 cm', '?', null, null]} />, right: '2 cm' },
      { id: 'rpm20', left: 'kerülete 22 cm', promptFigure: <RectCard w={7} h={4} labels={['?', '4 cm', null, null]} />, right: '7 cm' },
      { id: 'rpm21', left: '1 m drótból négyzet. Egy oldala?', right: '25 cm' },
      { id: 'rpm22', left: 'négyzet, kerülete 40 cm. Egy oldala?', right: '10 cm' },
      { id: 'rpm23', left: 'téglalap: 9 cm és 1 cm. Kerülete?', right: '20 cm' },
      { id: 'rpm24', left: 'kert: 20 m és 10 m, a kapu 2 m. Kerítés?', right: '58 m' }
    ]
  }
];

export const RECT_PERIMETER_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: RECT_PERIMETER_G3_MATCHER_LEVELS_LIST[0],
  2: RECT_PERIMETER_G3_MATCHER_LEVELS_LIST[1],
  3: RECT_PERIMETER_G3_MATCHER_LEVELS_LIST[2]
};

export const RectPerimeterG3Matcher: React.FC<RectPerimeterG3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-meas-teglalap-kerulet-matcher',
  topicTitle = '6. A téglalap és a négyzet kerülete – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="meresek"
      topicId={topicId}
      subtopicId="a-teglalap-es-a-negyzet-kerulete"
      title={topicTitle}
      subtitle="Párosítsd a téglalapokat és a négyzeteket a kerületükkel, a kerületet a hiányzó oldallal!"
      levels={RECT_PERIMETER_G3_MATCHER_LEVELS}
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

export default RectPerimeterG3Matcher;

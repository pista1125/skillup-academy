import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { BracketFocusCard, PlatesCard, ShareCard, PurseCard } from './Brackets100G3CardFigures';

interface Brackets100G3MatcherProps {
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

const BRACKETS_100_G3_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Először a zárójel',
    description: 'Számold ki, és párosítsd az eredménnyel!',
    pairs: [
      { id: 'br100m1', left: '', promptFigure: <BracketFocusCard tokens={['(', '6', '+', '4', ')', '·', '3']} from={0} to={4} />, right: '30' },
      { id: 'br100m2', left: '(20 − 8) : 4', right: '3' },
      { id: 'br100m3', left: '', promptFigure: <BracketFocusCard tokens={['30', '−', '(', '10', '+', '5', ')']} from={2} to={6} />, right: '15' },
      { id: 'br100m4', left: '4 · (2 + 3)', promptFigure: <PlatesCard plates={4} a={2} b={3} />, right: '20' },
      { id: 'br100m5', left: '(35 + 5) : 8', right: '5' },
      { id: 'br100m6', left: '8 · (10 − 5)', right: '40' },
      { id: 'br100m7', left: '(9 + 9) : 2', promptFigure: <ShareCard piles={[9, 9]} kids={2} />, right: '9' },
      { id: 'br100m8', left: '', promptFigure: <BracketFocusCard tokens={['50', '−', '(', '20', '−', '6', ')']} from={2} to={6} />, right: '36' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Szóból műveletsor',
    description: 'Párosítsd a mondatot a műveletsorral! Figyelj a zárójelre!',
    pairs: [
      { id: 'br100m9', left: 'a 6 és a 4 összegének háromszorosa', promptFigure: <PlatesCard plates={3} a={6} b={4} />, right: '(6 + 4) · 3' },
      { id: 'br100m10', left: 'a 6 háromszorosához add hozzá a 4-et', promptFigure: <PlatesCard plates={3} a={6} pile={4} />, right: '6 · 3 + 4' },
      { id: 'br100m11', left: 'a 20 és a 8 különbségét oszd el 4-gyel', right: '(20 − 8) : 4' },
      { id: 'br100m12', left: 'a 20-ból vond ki a 8 és a 4 hányadosát', right: '20 − 8 : 4' },
      { id: 'br100m13', left: 'a 9 és az 5 összegét szorozd meg 2-vel', promptFigure: <PlatesCard plates={2} a={9} b={5} />, right: '(9 + 5) · 2' },
      { id: 'br100m14', left: 'a 9-hez add hozzá az 5 kétszeresét', promptFigure: <PlatesCard plates={2} a={5} pile={9} pileFirst />, right: '9 + 5 · 2' },
      { id: 'br100m15', left: 'a 40-ből vond ki a 12 és a 8 összegét', right: '40 − (12 + 8)' },
      { id: 'br100m16', left: 'a 40-ből vond ki a 12-t, aztán adj hozzá 8-at', right: '40 − 12 + 8' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Nagyobb számokkal',
    description: 'Számold ki, és párosítsd az eredménnyel!',
    pairs: [
      { id: 'br100m17', left: '(50 − 42) · (15 − 6)', right: '72' },
      { id: 'br100m18', left: '90 − (37 + 28)', promptFigure: <PurseCard money={90} prices={[37, 28]} />, right: '25' },
      { id: 'br100m19', left: '(4 + 6) · (9 − 2)', right: '70' },
      { id: 'br100m20', left: '(48 + 24) : 8', right: '9' },
      { id: 'br100m21', left: '(36 − 29) · 8', right: '56' },
      { id: 'br100m22', left: '6 · (7 + 3)', promptFigure: <PlatesCard plates={6} a={7} b={3} />, right: '60' },
      { id: 'br100m23', left: '(15 + 9) : 4', promptFigure: <ShareCard piles={[15, 9]} kids={4} />, right: '6' },
      { id: 'br100m24', left: '100 − (45 + 25)', promptFigure: <PurseCard money={100} prices={[45, 25]} />, right: '30' }
    ]
  }
];

export const BRACKETS_100_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: BRACKETS_100_G3_MATCHER_LEVELS_LIST[0],
  2: BRACKETS_100_G3_MATCHER_LEVELS_LIST[1],
  3: BRACKETS_100_G3_MATCHER_LEVELS_LIST[2]
};

export const Brackets100G3Matcher: React.FC<Brackets100G3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-c100-zarojel-matcher',
  topicTitle = '7. A zárójel használata – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="szamolas-100-ig"
      topicId={topicId}
      subtopicId="a-zarojel-hasznalata"
      title={topicTitle}
      subtitle="Párosítsd a zárójeles műveletsorokat!"
      levels={BRACKETS_100_G3_MATCHER_LEVELS}
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

export default Brackets100G3Matcher;

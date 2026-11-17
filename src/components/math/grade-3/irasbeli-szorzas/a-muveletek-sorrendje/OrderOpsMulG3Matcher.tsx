import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { GroupsCard, StepCard, PackCard } from './OrderOpsMulG3CardFigures';

interface OrderOpsMulG3MatcherProps {
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
    title: '1. szint: Kép és terv',
    description: 'Nézd meg a képet! Melyik műveletsor illik hozzá?',
    pairs: [
      { id: 'oom1', left: '', promptFigure: <GroupsCard n={3} v={120} e={50} mode="plus" />, right: '3 · 120 + 50' },
      { id: 'oom2', left: '', promptFigure: <GroupsCard n={3} v={120} e={50} mode="pack" />, right: '(120 + 50) · 3' },
      { id: 'oom3', left: '', promptFigure: <GroupsCard n={3} v={120} e={50} mode="minus" />, right: '3 · 120 − 50' },
      { id: 'oom4', left: '', promptFigure: <GroupsCard n={2} v={250} e={90} mode="plus" />, right: '2 · 250 + 90' },
      { id: 'oom5', left: '', promptFigure: <GroupsCard n={2} v={250} e={90} mode="pack" />, right: '(250 + 90) · 2' },
      { id: 'oom6', left: '', promptFigure: <GroupsCard n={4} v={105} e={60} mode="plus" />, right: '4 · 105 + 60' },
      { id: 'oom7', left: '', promptFigure: <GroupsCard n={2} v={310} e={75} mode="minus" />, right: '2 · 310 − 75' },
      { id: 'oom8', left: '', promptFigure: <GroupsCard n={4} v={130} e={70} mode="pack" />, right: '(130 + 70) · 4' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Számold ki!',
    description: 'Ügyelj a sorrendre! A narancs lépés az első.',
    pairs: [
      { id: 'oom9', left: '', promptFigure: <StepCard parts={[{ t: '250 + ' }, { t: '120 · 4', first: true }]} />, right: '730' },
      { id: 'oom10', left: '', promptFigure: <StepCard parts={[{ t: '3 · 250', first: true }, { t: ' − 120' }]} />, right: '630' },
      { id: 'oom11', left: '', promptFigure: <StepCard parts={[{ t: '3 · ' }, { t: '(250 − 120)', first: true }]} />, right: '390' },
      { id: 'oom12', left: '', promptFigure: <StepCard parts={[{ t: '750 − ' }, { t: '124 · 3', first: true }]} />, right: '378' },
      { id: 'oom13', left: '4 · 125 + 95', right: '595' },
      { id: 'oom14', left: '4 · (125 + 95)', right: '880' },
      { id: 'oom15', left: '1000 − 2 · 365', right: '270' },
      { id: 'oom16', left: '160 · 5 − 300', right: '500' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Ugyanannyi!',
    description: 'Keresd a párokat! A két műveletsor eredménye ugyanannyi.',
    pairs: [
      { id: 'oom17', left: '', promptFigure: <PackCard a={3} b={127} c={158} />, right: '3 · 127 + 3 · 158' },
      { id: 'oom18', left: '', promptFigure: <PackCard a={2} b={215} c={160} />, right: '2 · 215 + 2 · 160' },
      { id: 'oom19', left: '', promptFigure: <PackCard a={4} b={105} c={90} />, right: '4 · 105 + 4 · 90' },
      { id: 'oom20', left: '', promptFigure: <PackCard a={3} b={140} c={95} />, right: '3 · 140 + 3 · 95' },
      { id: 'oom21', left: '2 · (430 − 185)', right: '2 · 430 − 2 · 185' },
      { id: 'oom22', left: '5 · (160 + 30)', right: '5 · 160 + 5 · 30' },
      { id: 'oom23', left: '(208 + 117) · 3', right: '208 · 3 + 117 · 3' },
      { id: 'oom24', left: '900 − (4 · 125)', right: '900 − 4 · 125' }
    ]
  }
];

export const ORDER_OPS_MUL_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: LIST[0],
  2: LIST[1],
  3: LIST[2]
};

export const OrderOpsMulG3Matcher: React.FC<OrderOpsMulG3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-wmul-sorrend-matcher',
  topicTitle = '5. A műveletek sorrendje – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="irasbeli-szorzas"
      topicId={topicId}
      subtopicId="a-muveletek-sorrendje"
      title={topicTitle}
      subtitle="Figyelj a sorrendre, és párosítsd!"
      levels={ORDER_OPS_MUL_G3_MATCHER_LEVELS}
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

export default OrderOpsMulG3Matcher;

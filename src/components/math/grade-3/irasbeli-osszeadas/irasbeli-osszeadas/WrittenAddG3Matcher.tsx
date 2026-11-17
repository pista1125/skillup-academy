import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { MiniCol } from './WrittenAddG3CardFigures';

interface WrittenAddG3MatcherProps {
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
    title: '1. szint: Beváltás nélkül',
    description: 'Számold ki írásban, és keresd meg az összeget!',
    pairs: [
      { id: 'waddm1_0', left: '', promptFigure: <MiniCol a={213} b={154} />, right: '367' },
      { id: 'waddm1_1', left: '', promptFigure: <MiniCol a={341} b={126} />, right: '467' },
      { id: 'waddm1_2', left: '', promptFigure: <MiniCol a={132} b={205} />, right: '337' },
      { id: 'waddm1_3', left: '', promptFigure: <MiniCol a={224} b={153} />, right: '377' },
      { id: 'waddm1_4', left: '251 + 136', right: '387' },
      { id: 'waddm1_5', left: '305 + 142', right: '447' },
      { id: 'waddm1_6', left: '162 + 326', right: '488' },
      { id: 'waddm1_7', left: '410 + 71', right: '481' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Egy beváltás',
    description: 'Ne felejtsd el a maradékot!',
    pairs: [
      { id: 'waddm2_0', left: '', promptFigure: <MiniCol a={157} b={226} />, right: '383' },
      { id: 'waddm2_1', left: '', promptFigure: <MiniCol a={163} b={254} />, right: '417' },
      { id: 'waddm2_2', left: '', promptFigure: <MiniCol a={249} b={136} />, right: '385' },
      { id: 'waddm2_3', left: '', promptFigure: <MiniCol a={128} b={345} />, right: '473' },
      { id: 'waddm2_4', left: '274 + 153', right: '427' },
      { id: 'waddm2_5', left: '138 + 237', right: '375' },
      { id: 'waddm2_6', left: '319 + 128', right: '447' },
      { id: 'waddm2_7', left: '182 + 135', right: '317' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Kétszer beváltás, nyomozás',
    description: 'Két maradék, három tag, hiányzó számjegy!',
    pairs: [
      { id: 'waddm3_0', left: '', promptFigure: <MiniCol a={168} b={275} />, right: '443' },
      { id: 'waddm3_1', left: '', promptFigure: <MiniCol a={186} b={237} />, right: '423' },
      { id: 'waddm3_2', left: '', promptFigure: <MiniCol a={294} b={158} />, right: '452' },
      { id: 'waddm3_3', left: 'Összeg: 425. Mi a ?', promptFigure: <MiniCol a="?67" b={158} />, right: '? = 2' },
      { id: 'waddm3_4', left: '125 + 136 + 118', right: '379' },
      { id: 'waddm3_5', left: '145 + 132 + 168', right: '445' },
      { id: 'waddm3_6', left: '199 + 199', right: '398' },
      { id: 'waddm3_7', left: 'a 186-nál 147-tel nagyobb szám', right: '333' }
    ]
  }
];

export const WRITTEN_ADD_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = { 1: LIST[0], 2: LIST[1], 3: LIST[2] };

export const WrittenAddG3Matcher: React.FC<WrittenAddG3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-wadd-irasbeli-matcher',
  topicTitle = '3. Írásbeli összeadás – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="irasbeli-osszeadas"
      topicId={topicId}
      subtopicId="irasbeli-osszeadas"
      title={topicTitle}
      subtitle="Számold ki írásban, és párosítsd az összeggel!"
      levels={WRITTEN_ADD_G3_MATCHER_LEVELS}
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

export default WrittenAddG3Matcher;

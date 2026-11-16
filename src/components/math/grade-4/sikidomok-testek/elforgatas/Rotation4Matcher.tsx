import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface Rotation4MatcherProps {
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

const ROTATION4_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Fordulatok',
    description: 'Párosítsd a fordulatot a jelentésével!',
    pairs: [
      { id: 'rom1', left: 'negyed fordulat', right: 'egy derékszögnyi forgatás' },
      { id: 'rom2', left: 'fél fordulat', right: '2 negyed fordulat' },
      { id: 'rom3', left: 'háromnegyed fordulat', right: '3 negyed fordulat' },
      { id: 'rom4', left: 'egész fordulat', right: '4 negyed fordulat, visszaér a helyére' },
      { id: 'rom5', left: 'forgatás jobbra', right: 'az óramutató járásával megegyező irányban' },
      { id: 'rom6', left: 'forgatás balra', right: 'az óramutató járásával ellentétes irányban' },
      { id: 'rom7', left: 'a gombostű helye', right: 'forgatás közben nem mozdul el' },
      { id: 'rom8', left: 'körhinta, pörgettyű, földgömb', right: 'mindegyik forog' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Az óra nagymutatója',
    description: 'Párosítsd a nagymutató mozgását a fordulattal (a 12-esről indul)!',
    pairs: [
      { id: 'rom9', left: '15 perc alatt', right: 'negyed fordulat' },
      { id: 'rom10', left: '30 perc alatt', right: 'fél fordulat' },
      { id: 'rom11', left: '45 perc alatt', right: 'háromnegyed fordulat' },
      { id: 'rom12', left: '60 perc alatt', right: 'egész fordulat' },
      { id: 'rom13', left: '5 perc alatt', right: 'a 12-esről az 1-esre lép' },
      { id: 'rom14', left: '20 perc alatt', right: 'a 12-esről a 4-esre lép' },
      { id: 'rom15', left: '2 óra alatt', right: '2 egész fordulat' },
      { id: 'rom16', left: '40 perc alatt', right: 'a 12-esről a 8-asra lép' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Gondolkodj és számolj!',
    description: 'Párosítsd a forgatást az eredményével!',
    pairs: [
      { id: 'rom17', left: 'Felfelé mutató nyíl, negyed fordulat jobbra', right: 'jobbra (kelet felé) mutat' },
      { id: 'rom18', left: 'Felfelé mutató nyíl, negyed fordulat balra', right: 'balra (nyugat felé) mutat' },
      { id: 'rom19', left: 'Felfelé mutató nyíl, fél fordulat', right: 'lefelé (dél felé) mutat' },
      { id: 'rom20', left: 'Sablon negyed fordulatonként, egy egész fordulat alatt', right: '4 különböző rajz' },
      { id: 'rom21', left: '2 negyed jobbra, majd 1 negyed balra', right: 'összesen 1 negyed jobbra' },
      { id: 'rom22', left: '3 negyed fordulat jobbra', right: 'ugyanaz, mint 1 negyed balra' },
      { id: 'rom23', left: 'Körhinta 3 perc alatt, percenként 2 egész fordulattal', right: '6 egész fordulat' },
      { id: 'rom24', left: 'Fél fordulat jobbra, majd fél fordulat balra', right: 'visszaér az eredeti helyzetbe' }
    ]
  }
];

const ROTATION4_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: ROTATION4_MATCHER_LEVELS_LIST[0],
  2: ROTATION4_MATCHER_LEVELS_LIST[1],
  3: ROTATION4_MATCHER_LEVELS_LIST[2]
};

export const Rotation4Matcher: React.FC<Rotation4MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-geom-elforgatas-matcher',
  topicTitle = '7. Elforgatás – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="sikidomok-testek"
      topicId={topicId}
      subtopicId="elforgatas"
      title={topicTitle}
      subtitle="Gyakorold a negyed, fél és egész fordulatot, a forgatás irányát!"
      levels={ROTATION4_MATCHER_LEVELS}
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

export default Rotation4Matcher;

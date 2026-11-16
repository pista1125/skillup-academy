import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface FractionIntro4MatcherProps {
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

export const FRACTION_INTRO4_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: A részek nevei',
    description: 'Hány egyenlő részre osztottuk az egészet? Párosítsd az egy rész nevével!',
    pairs: [
      { id: 'fim1', left: '2 egyenlő rész közül 1', right: 'fél (1 ketted)' },
      { id: 'fim2', left: '3 egyenlő rész közül 1', right: '1 harmad' },
      { id: 'fim3', left: '4 egyenlő rész közül 1', right: '1 negyed' },
      { id: 'fim4', left: '5 egyenlő rész közül 1', right: '1 ötöd' },
      { id: 'fim5', left: '6 egyenlő rész közül 1', right: '1 hatod' },
      { id: 'fim6', left: '8 egyenlő rész közül 1', right: '1 nyolcad' },
      { id: 'fim7', left: '10 egyenlő rész közül 1', right: '1 tized' },
      { id: 'fim8', left: '12 egyenlő rész közül 1', right: '1 tizenketted' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Szalvéta, rudak, ételek',
    description: 'Párosítsd a helyzetet a törtrésszel!',
    pairs: [
      { id: 'fim9', left: 'Szalvéta egyszer félbehajtva', right: 'a szalvéta fele' },
      { id: 'fim10', left: 'Szalvéta kétszer félbehajtva', right: 'a szalvéta negyede' },
      { id: 'fim11', left: 'A zöld rudat 3 piros rúd adja ki', right: 'a piros a zöld 1 harmada' },
      { id: 'fim12', left: 'A zöld rudat 6 rózsaszín rúd adja ki', right: 'a rózsaszín a zöld 1 hatoda' },
      { id: 'fim13', left: 'A bordó rúd alatt 4 rózsaszín rúd', right: 'a rózsaszín a bordó 1 negyede' },
      { id: 'fim14', left: 'Csokoládé 10 egyforma kockájából 1', right: 'a csokoládé 1 tizede' },
      { id: 'fim15', left: 'Torta 8 egyforma szeletéből 1', right: 'a torta 1 nyolcada' },
      { id: 'fim16', left: 'Pizza 5 egyforma szeletéből 1', right: 'a pizza 1 ötöde' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Igazságos osztozkodás',
    description: 'Mennyi jut egy gyereknek? Párosítsd az eredménnyel!',
    pairs: [
      { id: 'fim17', left: '12 bonbon fele', right: '6 bonbon' },
      { id: 'fim18', left: '12 bonbon 1 harmada', right: '4 bonbon' },
      { id: 'fim19', left: '12 bonbon 1 negyede', right: '3 bonbon' },
      { id: 'fim20', left: '12 bonbon 1 hatoda', right: '2 bonbon' },
      { id: 'fim21', left: '12 bonbon 1 tizenkettede', right: '1 bonbon' },
      { id: 'fim22', left: '10 bonbon fele', right: '5 bonbon' },
      { id: 'fim23', left: '24 bonbon 1 harmada', right: '8 bonbon' },
      { id: 'fim24', left: '70 bonbon 1 tizede', right: '7 bonbon' }
    ]
  }
];

const FRACTION_INTRO4_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: FRACTION_INTRO4_MATCHER_LEVELS_LIST[0],
  2: FRACTION_INTRO4_MATCHER_LEVELS_LIST[1],
  3: FRACTION_INTRO4_MATCHER_LEVELS_LIST[2]
};

export const FractionIntro4Matcher: React.FC<FractionIntro4MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-frac-ertelmezes-matcher',
  topicTitle = '1. A törtrész és a törtek értelmezése – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="tortszamok"
      topicId={topicId}
      subtopicId="tortresz-tortek-ertelmezese"
      title={topicTitle}
      subtitle="Párosítsd az egyenlő részeket a nevükkel, és számold ki, mennyi jut egy gyereknek!"
      levels={FRACTION_INTRO4_MATCHER_LEVELS}
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

export default FractionIntro4Matcher;

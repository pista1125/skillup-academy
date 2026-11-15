import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CombinationsMatcherProps {
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

const COMBINATIONS_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: n alatt a k',
    description: 'Párosítsd a részhalmazok számát az értékével!',
    pairs: [
      { id: 'cmm1', left: '5 alatt a 2', right: '10' },
      { id: 'cmm2', left: '6 alatt a 2', right: '15' },
      { id: 'cmm3', left: '7 alatt a 2', right: '21' },
      { id: 'cmm4', left: '6 alatt a 3', right: '20' },
      { id: 'cmm5', left: '10 alatt a 3', right: '120' },
      { id: 'cmm6', left: '9 alatt a 4', right: '126' },
      { id: 'cmm7', left: '12 alatt a 4', right: '495' },
      { id: 'cmm8', left: '8 alatt a 4', right: '70' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Sorrenddel vagy anélkül',
    description: 'Párosítsd a feladatot az eredményével – figyelj, számít-e a sorrend!',
    pairs: [
      { id: 'cmm9', left: '6 csapat, mindenki mindenkivel egy meccset játszik', right: '15' },
      { id: 'cmm10', left: '7 résztvevő, mindenki kezet fog mindenkivel', right: '21' },
      { id: 'cmm11', left: '5 lapból egyszerre 2 kihúzása', right: '10' },
      { id: 'cmm12', left: '9 unokából 3 közösen főzi a vacsorát', right: '84' },
      { id: 'cmm13', left: '9 unokából 3, mindegyik más feladatot kap', right: '504' },
      { id: 'cmm14', left: '25 tanulóból 3 küldött, mindhárman matematikán', right: '2300' },
      { id: 'cmm15', left: '25 tanulóból 3 küldött, három különböző vetélkedőn', right: '13 800' },
      { id: 'cmm16', left: 'Konvex hétszög átlói', right: '14' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Lift és nyereménysorsolás',
    description: 'Párosítsd a tankönyvi feladatot az eredményével!',
    pairs: [
      { id: 'cmm17', left: 'Lift: az első négyes a 12 főből', right: '495' },
      { id: 'cmm18', left: 'Lift: a második négyes a maradék 8 főből', right: '70' },
      { id: 'cmm19', left: 'Lift: a harmadik négyes a maradék 4 főből', right: '1' },
      { id: 'cmm20', left: 'Lift: a 12 fő 3 menetben', right: '34 650' },
      { id: 'cmm21', left: '90 fő, 2 egyforma nyeremény, mindenki legfeljebb egyet', right: '4005' },
      { id: 'cmm22', left: '90 fő, 2 különböző nyeremény, mindenki csak egyet', right: '8010' },
      { id: 'cmm23', left: '90 fő, 2 különböző nyeremény, egy ember mindkettőt is', right: '8100' },
      { id: 'cmm24', left: '90 fő, 2 egyforma nyeremény, egy ember mindkettőt is', right: '4095' }
    ]
  }
];

const COMBINATIONS_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: COMBINATIONS_MATCHER_LEVELS_LIST[0],
  2: COMBINATIONS_MATCHER_LEVELS_LIST[1],
  3: COMBINATIONS_MATCHER_LEVELS_LIST[2]
};

export const CombinationsMatcher: React.FC<CombinationsMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-comb-kombinacio-matcher',
  topicTitle = '3. Amikor nem számít a kiválasztás sorrendje – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="kombinatorika-grafok"
      topicId={topicId}
      subtopicId="amikor-nem-szamit-a-kivalasztas-sorrendje"
      title={topicTitle}
      subtitle="Gyakorold a sorrend nélküli kiválasztást: részhalmazok, mérkőzések, kézfogások, lift és nyereménysorsolás!"
      levels={COMBINATIONS_MATCHER_LEVELS}
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

export default CombinationsMatcher;

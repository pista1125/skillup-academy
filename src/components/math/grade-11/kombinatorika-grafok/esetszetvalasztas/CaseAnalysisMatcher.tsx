import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CaseAnalysisMatcherProps {
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

const CASE_ANALYSIS_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Módszerek és szabályok',
    description: 'Párosítsd a módszert vagy helyzetet a hozzá tartozó számolással!',
    pairs: [
      { id: 'cam1', left: 'Esetszétválasztás', right: 'Az egymást kizáró esetek számának összege' },
      { id: 'cam2', left: 'Komplementer módszer', right: 'Összes eset − rossz esetek' },
      { id: 'cam3', left: '„és”: egyszerre hozott döntések', right: 'Szorzás' },
      { id: 'cam4', left: '„vagy”: egymást kizáró esetek', right: 'Összeadás' },
      { id: 'cam5', left: 'k egyforma jutalom k különböző embernek', right: '(n alatt k)' },
      { id: 'cam6', left: 'Egy ember 2, egy másik 1 egyforma jutalmat kap', right: 'n · (n − 1)' },
      { id: 'cam7', left: 'Két egyforma bástya felcserélése ugyanazt adja', right: 'Osztás 2-vel' },
      { id: 'cam8', left: 'Miért hibás a 12³ / 3!?', right: 'Nem minden esetet számoltunk ugyanannyiszor' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Egyforma jutalmak',
    description: 'Párosítsd az esetet a lehetőségek számával!',
    pairs: [
      { id: 'cam9', left: '12 diák, 3 jutalom: egy diák kapja mindet', right: '12' },
      { id: 'cam10', left: '12 diák, 3 jutalom: egy diák 2-t, más 1-et', right: '132' },
      { id: 'cam11', left: '12 diák, 3 jutalom: három diák 1-1-et', right: '220' },
      { id: 'cam12', left: '12 diák, 3 jutalom: összesen', right: '364' },
      { id: 'cam13', left: '10 fő, 3 csoki: egy ember nyeri mindet', right: '10' },
      { id: 'cam14', left: '10 fő, 3 csoki: ketten nyernek', right: '90' },
      { id: 'cam15', left: '10 fő, 3 csoki: mindet más nyeri', right: '120' },
      { id: 'cam16', left: '10 fő, 2 egyforma jutalom, valaki többet is kaphat', right: '55' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Tankönyvi és érettségi feladatok',
    description: 'Párosítsd a feladatot a helyes eredménnyel!',
    pairs: [
      { id: 'cam17', left: 'Fehér és fekete bástya a 3 × 3-as táblán, nem ütik egymást', right: '36' },
      { id: 'cam18', left: '3 sávos zászló, piros csak felül lehet', right: '18' },
      { id: 'cam19', left: '4 dobás, az összeg legalább 22', right: '15' },
      { id: 'cam20', left: '9 tigris két kifutóban (érettségi 2015)', right: '100' },
      { id: 'cam21', left: 'Gyorsváltó: kettős holtverseny az élen, Delfinek nem utolsók', right: '9' },
      { id: 'cam22', left: 'Négyjegyű, 5-tel osztható, különböző számjegyekkel', right: '952' },
      { id: 'cam23', left: '6 elemű halmaz 2 vagy 3 elemű részhalmazai', right: '35' },
      { id: 'cam24', left: '4 egyforma jutalom 5 diák között', right: '70' }
    ]
  }
];

const CASE_ANALYSIS_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: CASE_ANALYSIS_MATCHER_LEVELS_LIST[0],
  2: CASE_ANALYSIS_MATCHER_LEVELS_LIST[1],
  3: CASE_ANALYSIS_MATCHER_LEVELS_LIST[2]
};

export const CaseAnalysisMatcher: React.FC<CaseAnalysisMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-comb-esetszetvalasztas-matcher',
  topicTitle = '6. Esetszétválasztás – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="kombinatorika-grafok"
      topicId={topicId}
      subtopicId="esetszetvalasztas"
      title={topicTitle}
      subtitle="Párosítsd a módszereket, az egyforma jutalmak eseteit és a tankönyvi feladatokat az eredményeikkel!"
      levels={CASE_ANALYSIS_MATCHER_LEVELS}
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

export default CaseAnalysisMatcher;

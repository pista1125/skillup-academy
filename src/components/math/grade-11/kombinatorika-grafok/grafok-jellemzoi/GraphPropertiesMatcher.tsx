import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface GraphPropertiesMatcherProps {
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

const GRAPH_PROPERTIES_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Fogalmak',
    description: 'Párosítsd a gráfelméleti fogalmat a jelentésével!',
    pairs: [
      { id: 'gpm1', left: 'Csúcs', right: 'A gráf egy pontja, a halmaz egy eleme' },
      { id: 'gpm2', left: 'Él', right: 'Két csúcs közötti kapcsolat vonala' },
      { id: 'gpm3', left: 'Fokszám', right: 'A csúcsból kiinduló élek száma' },
      { id: 'gpm4', left: 'Hurokél', right: 'Kezdő- és végpontja ugyanaz a csúcs' },
      { id: 'gpm5', left: 'Izolált csúcs', right: 'Fokszáma 0' },
      { id: 'gpm6', left: 'Harry Beck', right: 'Sémás londoni metrótérkép (1933)' },
      { id: 'gpm7', left: 'Két él keresztezése a rajzon', right: 'Nem csúcs, csak a rajz sajátossága' },
      { id: 'gpm8', left: 'Két rajz ugyanazt a gráfot ábrázolja', right: 'Ugyanazok a csúcspárok vannak összekötve' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Fokszámok és élek száma',
    description: 'Párosítsd a fokszámokat a gráf éleinek számával!',
    pairs: [
      { id: 'gpm9', left: 'Fokszámok: 1, 1', right: '1 él' },
      { id: 'gpm10', left: 'Fokszámok: 2, 1, 1', right: '2 él' },
      { id: 'gpm11', left: 'Fokszámok: 2, 2, 2', right: '3 él' },
      { id: 'gpm12', left: 'Fokszámok: 2, 2, 2, 2', right: '4 él' },
      { id: 'gpm13', left: 'Fokszámok: 3, 3, 2, 1, 1', right: '5 él' },
      { id: 'gpm14', left: 'Fokszámok: 4, 2, 2, 2, 2', right: '6 él' },
      { id: 'gpm15', left: 'Fokszámok: 4, 3, 3, 2, 2', right: '7 él' },
      { id: 'gpm16', left: '6 csúcs, fokszámösszeg 16', right: '8 él' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Létezik ilyen gráf?',
    description: 'Párosítsd a leírást a helyes következtetéssel!',
    pairs: [
      { id: 'gpm17', left: '5 csúcs, minden fokszám 3', right: 'Nincs ilyen: a fokszámösszeg 15' },
      { id: 'gpm18', left: '7 csúcs, minden fokszám 2', right: 'Például egy hétszög' },
      { id: 'gpm19', left: '4 csúcs, minden fokszám 3', right: 'Teljes gráf 4 csúcson, 6 éllel' },
      { id: 'gpm20', left: '4 csúcs: 3, 3, 3, 1 (egyszerű gráf)', right: 'Páros összeg, mégsem rajzolható le' },
      { id: 'gpm21', left: '5 falu, 4 út, bárhonnan bárhová eljutunk', right: 'Az utak nem zárnak be kört' },
      { id: 'gpm22', left: 'Csúcs egy hurokéllel és két további éllel', right: 'Fokszáma 4' },
      { id: 'gpm23', left: '8 csúcs, minden fokszám 3', right: '12 él' },
      { id: 'gpm24', left: 'A páratlan fokszámú csúcsok száma', right: 'Mindig páros' }
    ]
  }
];

const GRAPH_PROPERTIES_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: GRAPH_PROPERTIES_MATCHER_LEVELS_LIST[0],
  2: GRAPH_PROPERTIES_MATCHER_LEVELS_LIST[1],
  3: GRAPH_PROPERTIES_MATCHER_LEVELS_LIST[2]
};

export const GraphPropertiesMatcher: React.FC<GraphPropertiesMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-comb-grafok-jellemzoi-matcher',
  topicTitle = '8. Gráfok jellemzői – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="kombinatorika-grafok"
      topicId={topicId}
      subtopicId="grafok-jellemzoi"
      title={topicTitle}
      subtitle="Párosítsd a gráfelméleti fogalmakat, a fokszámsorozatokat és a gráfokról szóló következtetéseket!"
      levels={GRAPH_PROPERTIES_MATCHER_LEVELS}
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

export default GraphPropertiesMatcher;

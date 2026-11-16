import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PossibilitiesMatcherProps {
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

const POSSIBILITIES_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: "1. szint: Hány lehetőség?",
    description: "Párosítsd a helyzetet a lehetőségek számával!",
    pairs: [
      { id: 'pvm1', left: "2 gyerek sorba áll", right: "2 sorrend" },
      { id: 'pvm2', left: "3 gyerek sorba áll", right: "6 sorrend" },
      { id: 'pvm3', left: "4 gyerek sorba áll", right: "24 sorrend" },
      { id: 'pvm4', left: "3 gyerekből pár (AB = BA)", right: "3 pár" },
      { id: 'pvm5', left: "4 tóból pár (AB = BA)", right: "6 pár" },
      { id: 'pvm6', left: "5 tóból pár (AB = BA)", right: "10 pár" },
      { id: 'pvm7', left: "2 sapka és 2 sál", right: "4 öltözet" },
      { id: 'pvm8', left: "3 leves és 2 főétel", right: "6 menü" }
    ]
  },
  {
    level: 2,
    title: "2. szint: Szavak és jelek",
    description: "Párosítsd a kifejezést a jelentésével!",
    pairs: [
      { id: 'pvm9', left: "elágazásos rajz", right: "ágakkal mutatja meg az összes lehetőséget" },
      { id: 'pvm10', left: "kezdőbetűs lejegyzés", right: "A–B–Cs a nevek helyett" },
      { id: 'pvm11', left: "AB = BA", right: "csak az számít, kik vannak együtt" },
      { id: 'pvm12', left: "rendszerezett felírás", right: "előbb az A-val kezdődők, aztán a B-vel…" },
      { id: 'pvm13', left: "holtverseny nélkül", right: "mindenki más helyen végez" },
      { id: 'pvm14', left: "az ágvégek száma", right: "az összes lehetőség száma" },
      { id: 'pvm15', left: "a 0-s számkártya", right: "nem állhat a szám elején" },
      { id: 'pvm16', left: "ismétlődő lehetőség", right: "ugyanazt kétszer írtuk fel" }
    ]
  },
  {
    level: 3,
    title: "3. szint: Feladat és eredmény",
    description: "Párosítsd a tankönyvi és munkafüzeti feladatot a megoldásával!",
    pairs: [
      { id: 'pvm17', left: "0, 5, 7 kártya: háromjegyű számok", right: "4 szám" },
      { id: 'pvm18', left: "1, 2, 3 kártya: háromjegyű számok", right: "6 szám" },
      { id: 'pvm19', left: "5 színű szalvétából 3 különböző", right: "10 vásárlás" },
      { id: 'pvm20', left: "4 fiú: Alex megelőzi Barnát és Csabát", right: "8 sorrend" },
      { id: 'pvm21', left: "4 fiú: Csaba 2., Dániel Barna előtt", right: "3 sorrend" },
      { id: 'pvm22', left: "szülők közrefogják a kisfiút, Anna is jön", right: "4 elrendezés" },
      { id: 'pvm23', left: "6 barát mind kezet fog egymással", right: "15 kézfogás" },
      { id: 'pvm24', left: "2 szín és 3 alak logikai lapjai", right: "6 lap" }
    ]
  }
];

const POSSIBILITIES_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: POSSIBILITIES_MATCHER_LEVELS_LIST[0],
  2: POSSIBILITIES_MATCHER_LEVELS_LIST[1],
  3: POSSIBILITIES_MATCHER_LEVELS_LIST[2]
};

export const PossibilitiesMatcher: React.FC<PossibilitiesMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-group-lehetosegek-matcher',
  topicTitle = "3. Hányféle lehetőség van? – Párosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="valogatasok-csoportositasok"
      topicId={topicId}
      subtopicId="hanyfele-lehetoseg-van"
      title={topicTitle}
      subtitle="Párosítsd a feladatokat a lehetőségek számával és a szavakat a jelentésükkel!"
      levels={POSSIBILITIES_MATCHER_LEVELS}
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

export default PossibilitiesMatcher;

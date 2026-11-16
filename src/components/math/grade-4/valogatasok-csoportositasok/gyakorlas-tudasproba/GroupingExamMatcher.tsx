import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface GroupingExamMatcherProps {
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

const GROUPING_EXAM_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: "1. szint: A fejezet szavai",
    description: "Párosítsd a szót a jelentésével!",
    pairs: [
      { id: 'gem1', left: "alaphalmaz", right: "a keret: minden elem, amit válogatunk" },
      { id: 'gem2', left: "közös rész", right: "mindkét címke igaz rá" },
      { id: 'gem3', left: "kakukktojás", right: "nem illik a többi közé" },
      { id: 'gem4', left: "mező", right: "egy sor és egy oszlop találkozása" },
      { id: 'gem5', left: "elágazásos rajz", right: "ágakkal mutatja a lehetőségeket" },
      { id: 'gem6', left: "AB = BA", right: "a párban nem számít a sorrend" },
      { id: 'gem7', left: "ellenpélda", right: "egy kivétel, ami megdönti a „mindegyik” állítást" },
      { id: 'gem8', left: "nem mindegyik", right: "van olyan, amelyik nem" }
    ]
  },
  {
    level: 2,
    title: "2. szint: Hová kerül?",
    description: "Halmazábra: Madár – Háziállat, illetve Páros – Négyjegyű. Logikai lapok: Kék, Lyukas, Háromszög karika.",
    pairs: [
      { id: 'gem9', left: "liba", right: "madár és háziállat is" },
      { id: 'gem10', left: "bagoly", right: "madár, de nem háziállat" },
      { id: 'gem11', left: "ló", right: "háziállat, de nem madár" },
      { id: 'gem12', left: "6606", right: "páros és négyjegyű" },
      { id: 'gem13', left: "9579", right: "négyjegyű, de nem páros" },
      { id: 'gem14', left: "423", right: "se nem páros, se nem négyjegyű" },
      { id: 'gem15', left: "sárga, lyukas háromszög", right: "Lyukas és Háromszög, de nem Kék (6.)" },
      { id: 'gem16', left: "piros, nem lyukas kör", right: "egyik karikába sem (8.)" }
    ]
  },
  {
    level: 3,
    title: "3. szint: Feladat és eredmény",
    description: "Párosítsd a feladatot a megoldásával!",
    pairs: [
      { id: 'gem17', left: "4 fiú bármilyen sorrendje", right: "24 sorrend" },
      { id: 'gem18', left: "5 tó párjai (AB = BA)", right: "10 pár" },
      { id: 'gem19', left: "0, 5, 7 kártya: háromjegyű számok", right: "4 szám" },
      { id: 'gem20', left: "2 póló és 3 nadrág", right: "6 öltözet" },
      { id: 'gem21', left: "Kék radíros + nem kék radíros ceruzák", right: "7 ceruza" },
      { id: 'gem22', left: "A vidraetetést nézők száma", right: "13 gyerek" },
      { id: 'gem23', left: "„Van olyan szám, amelyben a számjegyek összege 26.”", right: "igaz: 5939" },
      { id: 'gem24', left: "„A halmazban minden szám páratlan.”", right: "hamis: 4016" }
    ]
  }
];

const GROUPING_EXAM_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: GROUPING_EXAM_MATCHER_LEVELS_LIST[0],
  2: GROUPING_EXAM_MATCHER_LEVELS_LIST[1],
  3: GROUPING_EXAM_MATCHER_LEVELS_LIST[2]
};

export const GroupingExamMatcher: React.FC<GroupingExamMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-group-tudasproba-matcher',
  topicTitle = "5. Gyakorlás, tudáspróba – Párosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="valogatasok-csoportositasok"
      topicId={topicId}
      subtopicId="gyakorlas-tudasproba"
      title={topicTitle}
      subtitle="Vegyes párosító a fejezet mind a négy leckéjéből: halmazok, táblázatok, lehetőségek, igaz-hamis állítások."
      levels={GROUPING_EXAM_MATCHER_LEVELS}
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

export default GroupingExamMatcher;

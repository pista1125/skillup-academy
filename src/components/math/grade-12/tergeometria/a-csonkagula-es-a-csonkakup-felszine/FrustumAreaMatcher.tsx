import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface FrustumAreaMatcherProps {
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

const FRUSTUM_AREA_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: "1. szint: Fogalmak és képletek",
    description: "Párosítsd a fogalmat a képletével vagy a jelentésével!",
    pairs: [
      { id: 'fam1', left: "Csonkakúp palástja", right: "(R + r)·π·a" },
      { id: 'fam2', left: "Csonkakúp felszíne", right: "π·[R² + r² + (R + r)·a]" },
      { id: 'fam3', left: "Négyzetes csonkagúla felszíne", right: "a² + b² + 2(a + b)·m" },
      { id: 'fam4', left: "Szabályos n oldalú csonkagúla felszíne", right: "T + t + n·T_trapéz" },
      { id: 'fam5', left: "A kiterített csonkakúppalást", right: "körgyűrűcikk" },
      { id: 'fam6', left: "A szabályos csonkagúla oldallapja", right: "szimmetrikus trapéz" },
      { id: 'fam7', left: "A csonkakúp alkotója M-ből", right: "√(M² + (R − r)²)" },
      { id: 'fam8', left: "Körgyűrűcikk területe", right: "ívek számtani közepe · szélesség" }
    ]
  },
  {
    level: 2,
    title: "2. szint: Csonkakúp-adatok",
    description: "Párosítsd a csonkakúp adatait a kért mennyiséggel!",
    pairs: [
      { id: 'fam9', left: "R = 5, r = 3, a = 4 ⇒ palást", right: "32π cm²" },
      { id: 'fam10', left: "R = 5, r = 3, a = 4 ⇒ felszín", right: "66π cm²" },
      { id: 'fam11', left: "R = 6, r = 3, M = 4 ⇒ alkotó", right: "5 cm" },
      { id: 'fam12', left: "R = 6, r = 3, M = 4 ⇒ palást", right: "45π cm²" },
      { id: 'fam13', left: "R = 12, r = 6, a = 10 ⇒ felszín", right: "360π cm²" },
      { id: 'fam14', left: "R = 12, r = 3, a = 10 ⇒ felszín", right: "303π cm²" },
      { id: 'fam15', left: "R = 12, r = 3, a = 10 ⇒ magasság", right: "√19 ≈ 4,36 cm" },
      { id: 'fam16', left: "R = 17,5, r = 7,5, a = 20 ⇒ palást (gallér)", right: "500π ≈ 1571 cm²" }
    ]
  },
  {
    level: 3,
    title: "3. szint: Csonkagúla-feladatok",
    description: "Párosítsd a feladatot a helyes eredménnyel!",
    pairs: [
      { id: 'fam17', left: "a = 6, b = 4, m = 5 ⇒ felszín", right: "152 cm²" },
      { id: 'fam18', left: "A = 274, a = 11, b = 5 ⇒ oldallapmagasság", right: "4 cm" },
      { id: 'fam19', left: "a = 11, b = 5, m = 4 ⇒ oldalél", right: "5 cm" },
      { id: 'fam20', left: "a = 11, b = 5, m = 4 ⇒ oldallap és alaplap szöge", right: "≈ 41,4°" },
      { id: 'fam21', left: "A = 914, a = 17, m = 12 ⇒ fedőél", right: "7 cm" },
      { id: 'fam22', left: "a = 17, b = 7, oldalél 13 ⇒ oldalél és alaplap szöge", right: "≈ 57,0°" },
      { id: 'fam23', left: "a = 10, b = 4, M = 4 ⇒ felszín", right: "256 cm²" },
      { id: 'fam24', left: "Antal kis kúpja és a teljes kúp: palástok aránya", right: "9 : 49" }
    ]
  }
];

const FRUSTUM_AREA_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: FRUSTUM_AREA_MATCHER_LEVELS_LIST[0],
  2: FRUSTUM_AREA_MATCHER_LEVELS_LIST[1],
  3: FRUSTUM_AREA_MATCHER_LEVELS_LIST[2]
};

export const FrustumAreaMatcher: React.FC<FrustumAreaMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g12-ter-csonka-felszin-matcher',
  topicTitle = "15. A csonkagúla és a csonkakúp felszíne – Párosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={12}
      chapterId="tergeometria"
      topicId={topicId}
      subtopicId="a-csonkagula-es-a-csonkakup-felszine"
      title={topicTitle}
      subtitle="Párosítsd a képleteket, a csonka testek adatait és a felszíneket!"
      levels={FRUSTUM_AREA_MATCHER_LEVELS}
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

export default FrustumAreaMatcher;

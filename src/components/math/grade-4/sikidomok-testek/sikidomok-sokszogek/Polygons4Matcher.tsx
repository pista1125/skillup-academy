import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface Polygons4MatcherProps {
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

const POLYGONS4_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: "1. szint: Hány csúcs, hány oldal?",
    description: "Párosítsd a sokszöget a csúcsai (és oldalai) számával!",
    pairs: [
      { id: 'g4-geom-sokszogek-m1', left: "háromszög", right: "3 csúcs, 3 oldal" },
      { id: 'g4-geom-sokszogek-m2', left: "négyszög", right: "4 csúcs, 4 oldal" },
      { id: 'g4-geom-sokszogek-m3', left: "ötszög", right: "5 csúcs, 5 oldal" },
      { id: 'g4-geom-sokszogek-m4', left: "hatszög", right: "6 csúcs, 6 oldal" },
      { id: 'g4-geom-sokszogek-m5', left: "hétszög", right: "7 csúcs, 7 oldal" },
      { id: 'g4-geom-sokszogek-m6', left: "nyolcszög", right: "8 csúcs, 8 oldal" },
      { id: 'g4-geom-sokszogek-m7', left: "kör", right: "görbe vonal határolja, nincs csúcsa" },
      { id: 'g4-geom-sokszogek-m8', left: "a sokszög csúcsa", right: "ahol két oldal találkozik" }
    ]
  },
  {
    level: 2,
    title: "2. szint: Fogalmak",
    description: "Párosítsd a fogalmat a jelentésével!",
    pairs: [
      { id: 'g4-geom-sokszogek-m9', left: "sokszög", right: "csak egyenes szakaszok határolják" },
      { id: 'g4-geom-sokszogek-m10', left: "síkidom", right: "egyenes vagy görbe vonal is határolhatja" },
      { id: 'g4-geom-sokszogek-m11', left: "átló", right: "két nem szomszédos csúcsot köt össze" },
      { id: 'g4-geom-sokszogek-m12', left: "oldal", right: "két szomszédos csúcsot köt össze" },
      { id: 'g4-geom-sokszogek-m13', left: "párhuzamos egyenesek", right: "sosem találkoznak" },
      { id: 'g4-geom-sokszogek-m14', left: "derékszög", right: "mint a hajtogatott lap sarka" },
      { id: 'g4-geom-sokszogek-m15', left: "téglalap", right: "négyszög, minden szöge derékszög" },
      { id: 'g4-geom-sokszogek-m16', left: "négyzet", right: "téglalap, minden oldala egyenlő hosszú" }
    ]
  },
  {
    level: 3,
    title: "3. szint: Átlók száma",
    description: "Hány átló húzható? Párosítsd!",
    pairs: [
      { id: 'g4-geom-sokszogek-m17', left: "háromszög összes átlója", right: "0 átló" },
      { id: 'g4-geom-sokszogek-m18', left: "négyszög egy csúcsából", right: "1 átló" },
      { id: 'g4-geom-sokszogek-m19', left: "ötszög egy csúcsából", right: "2 átló" },
      { id: 'g4-geom-sokszogek-m20', left: "hatszög egy csúcsából", right: "3 átló" },
      { id: 'g4-geom-sokszogek-m21', left: "hétszög egy csúcsából", right: "4 átló" },
      { id: 'g4-geom-sokszogek-m22', left: "ötszög összes átlója", right: "5 átló" },
      { id: 'g4-geom-sokszogek-m23', left: "hatszög összes átlója", right: "9 átló" },
      { id: 'g4-geom-sokszogek-m24', left: "nyolcszög összes átlója", right: "20 átló" }
    ]
  }
];

const POLYGONS4_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: POLYGONS4_MATCHER_LEVELS_LIST[0],
  2: POLYGONS4_MATCHER_LEVELS_LIST[1],
  3: POLYGONS4_MATCHER_LEVELS_LIST[2]
};

export const Polygons4Matcher: React.FC<Polygons4MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-geom-sokszogek-matcher',
  topicTitle = "1. Síkidomok, sokszögek – Párosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="sikidomok-testek"
      topicId={topicId}
      subtopicId="sikidomok-sokszogek"
      title={topicTitle}
      subtitle="Párosítsd a sokszögeket, a fogalmakat és az átlók számát!"
      levels={POLYGONS4_MATCHER_LEVELS}
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

export default Polygons4Matcher;

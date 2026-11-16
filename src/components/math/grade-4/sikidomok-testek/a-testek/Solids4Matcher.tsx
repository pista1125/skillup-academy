import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface Solids4MatcherProps {
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

const SOLIDS4_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: "1. szint: Melyik testre hasonlít?",
    description: "Párosítsd a tárgyat a testtel, amelyre hasonlít!",
    pairs: [
      { id: 'g4-geom-testek-m1', left: "dobókocka", right: "kocka" },
      { id: 'g4-geom-testek-m2', left: "tégla", right: "téglatest" },
      { id: 'g4-geom-testek-m3', left: "focilabda", right: "gömb" },
      { id: 'g4-geom-testek-m4', left: "konzervdoboz", right: "henger" },
      { id: 'g4-geom-testek-m5', left: "fagylalttölcsér", right: "kúp" },
      { id: 'g4-geom-testek-m6', left: "az egyiptomi piramis", right: "gúla" },
      { id: 'g4-geom-testek-m7', left: "az iglu", right: "félgömb" },
      { id: 'g4-geom-testek-m8', left: "a téglatest egyik lapja", right: "téglalap" }
    ]
  },
  {
    level: 2,
    title: "2. szint: Fogalmak és számok",
    description: "Párosítsd a fogalmat a jelentésével vagy a számmal!",
    pairs: [
      { id: 'g4-geom-testek-m9', left: "él", right: "ahol a test két lapja találkozik" },
      { id: 'g4-geom-testek-m10', left: "csúcs", right: "ahol a test élei találkoznak" },
      { id: 'g4-geom-testek-m11', left: "a kocka lapjai", right: "6 egyforma négyzet" },
      { id: 'g4-geom-testek-m12', left: "a téglatest éleinek száma", right: "12" },
      { id: 'g4-geom-testek-m13', left: "a kocka csúcsainak száma", right: "8" },
      { id: 'g4-geom-testek-m14', left: "a négyzet alapú gúla lapjainak száma", right: "5" },
      { id: 'g4-geom-testek-m15', left: "testháló", right: "a kiterített felület, amelyből a test összehajtható" },
      { id: 'g4-geom-testek-m16', left: "alaprajz", right: "felülnézet, benne a tornyok magassága" }
    ]
  },
  {
    level: 3,
    title: "3. szint: Kis kockák és mérések",
    description: "Párosítsd a feladatot az eredménnyel!",
    pairs: [
      { id: 'g4-geom-testek-m17', left: "2 · 2 · 2-es kocka", right: "8 kis kocka" },
      { id: 'g4-geom-testek-m18', left: "3 · 3 · 3-as kocka", right: "27 kis kocka" },
      { id: 'g4-geom-testek-m19', left: "4 · 3-as réteg, 2 réteg", right: "24 kis kocka" },
      { id: 'g4-geom-testek-m20', left: "az 1, 3, 6, 10 lépcsősor következő tagja", right: "15 kis kocka" },
      { id: 'g4-geom-testek-m21', left: "kocka élváza 3 cm-es élekkel", right: "36 cm drót" },
      { id: 'g4-geom-testek-m22', left: "3 teniszlabda (66 mm) egy sorban", right: "198 mm" },
      { id: 'g4-geom-testek-m23', left: "5 teniszlabda (66 mm) egy sorban", right: "33 cm" },
      { id: 'g4-geom-testek-m24', left: "3 · 3, 2 · 2 és 1 golyóból rakott piramis", right: "14 golyó" }
    ]
  }
];

const SOLIDS4_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: SOLIDS4_MATCHER_LEVELS_LIST[0],
  2: SOLIDS4_MATCHER_LEVELS_LIST[1],
  3: SOLIDS4_MATCHER_LEVELS_LIST[2]
};

export const Solids4Matcher: React.FC<Solids4MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-geom-testek-matcher',
  topicTitle = "3. A testek – Párosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="sikidomok-testek"
      topicId={topicId}
      subtopicId="a-testek"
      title={topicTitle}
      subtitle="Párosítsd a testeket a tárgyakkal, a fogalmakat és a kockás feladatokat!"
      levels={SOLIDS4_MATCHER_LEVELS}
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

export default Solids4Matcher;

import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SolidsPracticeExamMatcherProps {
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

const SOLIDS_PRACTICE_EXAM_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: "1. szint: Térfogatképletek",
    description: "Párosítsd a testet a térfogatképletével!",
    pairs: [
      { id: 'pem1', left: "Téglatest", right: "abc" },
      { id: 'pem2', left: "Hasáb", right: "T · M" },
      { id: 'pem3', left: "Henger", right: "r²πm" },
      { id: 'pem4', left: "Gömb", right: "4R³π/3" },
      { id: 'pem5', left: "Gúla", right: "T · M / 3" },
      { id: 'pem6', left: "Forgáskúp", right: "r²πm / 3" },
      { id: 'pem7', left: "Csonkagúla", right: "M/3 · (T + √(Tt) + t)" },
      { id: 'pem8', left: "Csonkakúp", right: "Mπ/3 · (R² + Rr + r²)" }
    ]
  },
  {
    level: 2,
    title: "2. szint: Felszín és összefüggések",
    description: "Párosítsd a mennyiséget a képletével!",
    pairs: [
      { id: 'pem9', left: "Kocka testátlója", right: "a√3" },
      { id: 'pem10', left: "Téglatest testátlója", right: "√(a² + b² + c²)" },
      { id: 'pem11', left: "Henger felszíne", right: "2r²π + 2rπm" },
      { id: 'pem12', left: "Gömb felszíne", right: "4R²π" },
      { id: 'pem13', left: "Kúp felszíne", right: "rπ(r + a)" },
      { id: 'pem14', left: "Kúppalást középponti szöge", right: "360° · r / a" },
      { id: 'pem15', left: "Csonkakúp palástja", right: "(R + r)πa" },
      { id: 'pem16', left: "Gömb síkmetszetének sugara", right: "√(R² − d²)" }
    ]
  },
  {
    level: 3,
    title: "3. szint: Tudáspróba-eredmények",
    description: "Párosítsd a tankönyvi feladatot az eredményével!",
    pairs: [
      { id: 'pem17', left: "12 × 12 × 18 dm-es oszlop testátlója", right: "≈ 24,74 dm" },
      { id: 'pem18', left: "A belőle faragott gúla oldalélének szöge az alappal", right: "≈ 64,8°" },
      { id: 'pem19', left: "210°-os, 18 cm sugarú körcikkből kúp: alapkör sugara", right: "10,5 cm" },
      { id: 'pem20', left: "Henger = gömb térfogata (⌀ 72 mm): a henger magassága", right: "48 mm" },
      { id: 'pem21', left: "Kúp = gömb térfogata (⌀ 54 mm): a kúp magassága", right: "108 mm" },
      { id: 'pem22', left: "Szökőkút (a = 40 cm, M = 70 cm) víztartalma", right: "≈ 37,3 liter" },
      { id: 'pem23', left: "Louvre-piramis üvegfelülete", right: "≈ 1892 m²" },
      { id: 'pem24', left: "A tölcsér térfogata", right: "≈ 433 cm³" }
    ]
  }
];

const SOLIDS_PRACTICE_EXAM_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: SOLIDS_PRACTICE_EXAM_MATCHER_LEVELS_LIST[0],
  2: SOLIDS_PRACTICE_EXAM_MATCHER_LEVELS_LIST[1],
  3: SOLIDS_PRACTICE_EXAM_MATCHER_LEVELS_LIST[2]
};

export const SolidsPracticeExamMatcher: React.FC<SolidsPracticeExamMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g12-ter-tudasproba-matcher',
  topicTitle = "18. Gyakorlás, tudáspróba – Párosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={12}
      chapterId="tergeometria"
      topicId={topicId}
      subtopicId="gyakorlas-tudasproba"
      title={topicTitle}
      subtitle="Ismételd át a teljes térgeometria fejezetet: képletek, összefüggések és tudáspróba-eredmények!"
      levels={SOLIDS_PRACTICE_EXAM_MATCHER_LEVELS}
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

export default SolidsPracticeExamMatcher;

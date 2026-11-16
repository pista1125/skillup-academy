import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface FrustumVolumeMatcherProps {
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

const FRUSTUM_VOLUME_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: "1. szint: Képletek és arányok",
    description: "Párosítsd a fogalmat a képletével vagy az értékével!",
    pairs: [
      { id: 'fvm1', left: "Csonkagúla térfogata (T, t, M)", right: "M/3 · (T + √(Tt) + t)" },
      { id: 'fvm2', left: "Négyzetes csonkagúla térfogata", right: "M/3 · (a² + ab + b²)" },
      { id: 'fvm3', left: "Csonkakúp térfogata", right: "Mπ/3 · (R² + Rr + r²)" },
      { id: 'fvm4', left: "Gúla térfogata", right: "T · M / 3" },
      { id: 'fvm5', left: "Hasonló testek térfogatának aránya", right: "λ³" },
      { id: 'fvm6', left: "λ = 0,6 ⇒ V_kicsi : V_nagy", right: "0,216" },
      { id: 'fvm7', left: "λ = 0,6 ⇒ V_csonka : V_nagy", right: "0,784" },
      { id: 'fvm8', left: "λ = 1/2 ⇒ a levágott kúp része", right: "1/8" }
    ]
  },
  {
    level: 2,
    title: "2. szint: Számolj térfogatot!",
    description: "Párosítsd az adatokat a térfogattal!",
    pairs: [
      { id: 'fvm9', left: "a = 12, b = 8, M = 6", right: "608 cm³" },
      { id: 'fvm10', left: "T = 9, t = 4, M = 6", right: "38 cm³" },
      { id: 'fvm11', left: "R = 4, r = 2, M = 3", right: "28π cm³" },
      { id: 'fvm12', left: "R = 10, r = 4, M = 5", right: "260π cm³" },
      { id: 'fvm13', left: "a = 16, M = 8 gúla", right: "≈ 682,7 cm³" },
      { id: 'fvm14', left: "a = 12, M = 6 gúla", right: "288 cm³" },
      { id: 'fvm15', left: "r = 1, m = 4 kúp", right: "4π/3 cm³" },
      { id: 'fvm16', left: "T = 310 mm², t = 180 mm², M = 17 mm", right: "≈ 4115 mm³" }
    ]
  },
  {
    level: 3,
    title: "3. szint: Feladatok eredményei",
    description: "Párosítsd a feladatot a helyes eredménnyel!",
    pairs: [
      { id: 'fvm17', left: "Sajt: alapél 4, oldalél 7 ⇒ gúla magassága", right: "√41 ≈ 6,4 cm" },
      { id: 'fvm18', left: "a = 12, b = 8, M = 6 ⇒ kiegészítő gúla magassága", right: "12 cm" },
      { id: 'fvm19', left: "R = 10, r = 4, M = 5 ⇒ az eredeti kúp magassága", right: "25/3 ≈ 8,33 cm" },
      { id: 'fvm20', left: "Kúp három egyenlő magasságú részre vágva: térfogatarány", right: "1 : 7 : 19" },
      { id: 'fvm21', left: "Oldalél 10 cm, 52° ⇒ gúla magassága", right: "≈ 7,88 cm" },
      { id: 'fvm22', left: "Zselés cukor sűrűsége (6,25 g, 4,115 cm³)", right: "≈ 1,52 g/cm³" },
      { id: 'fvm23', left: "15 cm magas kúp felezése: vágás az alaptól", right: "≈ 3,09 cm" },
      { id: 'fvm24', left: "Rio székesegyház fedőkörének átmérője", right: "≈ 26 m" }
    ]
  }
];

const FRUSTUM_VOLUME_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: FRUSTUM_VOLUME_MATCHER_LEVELS_LIST[0],
  2: FRUSTUM_VOLUME_MATCHER_LEVELS_LIST[1],
  3: FRUSTUM_VOLUME_MATCHER_LEVELS_LIST[2]
};

export const FrustumVolumeMatcher: React.FC<FrustumVolumeMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g12-ter-csonka-terfogat-matcher',
  topicTitle = "16. A csonkagúla és a csonkakúp térfogata – Párosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={12}
      chapterId="tergeometria"
      topicId={topicId}
      subtopicId="a-csonkagula-es-a-csonkakup-terfogata"
      title={topicTitle}
      subtitle="Párosítsd a térfogatképleteket, az arányokat és a feladatok eredményeit!"
      levels={FRUSTUM_VOLUME_MATCHER_LEVELS}
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

export default FrustumVolumeMatcher;

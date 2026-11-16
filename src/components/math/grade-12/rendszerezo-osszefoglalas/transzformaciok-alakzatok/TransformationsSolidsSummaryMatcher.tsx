import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface TransformationsSolidsSummaryMatcherProps {
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

const TRANSFORMATIONS_SOLIDS_SUMMARY_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: "1. szint: Tételek és definíciók",
    description: "Párosítsd a tételt vagy fogalmat a tartalmával!",
    pairs: [
      { id: 'tsm101', left: "Pitagorasz-tétel", right: "a² + b² = c²" },
      { id: 'tsm102', left: "koszinusztétel", right: "c² = a² + b² − 2ab · cos γ" },
      { id: 'tsm103', left: "szinusztétel", right: "a : b = sin α : sin β" },
      { id: 'tsm104', left: "Thalész-tétel", right: "az átmérő a körvonalról derékszögben látszik" },
      { id: 'tsm105', left: "körérintő", right: "merőleges az érintési pontba húzott sugárra" },
      { id: 'tsm106', left: "középvonal", right: "párhuzamos a harmadik oldallal, fele olyan hosszú" },
      { id: 'tsm107', left: "egybevágósági transzformáció", right: "távolságtartó" },
      { id: 'tsm108', left: "hasonlósági transzformáció", right: "aránytartó" }
    ]
  },
  2: {
    level: 2,
    title: "2. szint: Képletek",
    description: "Párosítsd az alakzatot a terület-, felszín- vagy térfogatképletével!",
    pairs: [
      { id: 'tsm201', left: "háromszög területe (két oldal, közbezárt szög)", right: "ab · sin γ/2" },
      { id: 'tsm202', left: "paralelogramma területe", right: "a · mₐ" },
      { id: 'tsm203', left: "deltoid területe", right: "e · f/2" },
      { id: 'tsm204', left: "trapéz területe", right: "(a + c)/2 · m" },
      { id: 'tsm205', left: "körcikk területe", right: "r²π · α/360°" },
      { id: 'tsm206', left: "gömb felszíne", right: "4r²π" },
      { id: 'tsm207', left: "forgáskúp térfogata", right: "r²π · M/3" },
      { id: 'tsm208', left: "forgáshenger felszíne", right: "2r²π + 2rπ · M" }
    ]
  },
  3: {
    level: 3,
    title: "3. szint: Feladatok eredményei",
    description: "Párosítsd a feladatot a helyes eredménnyel!",
    pairs: [
      { id: 'tsm301', left: "függőhíd: 750 m hosszú, 120 m magas ív sugara", right: "≈ 646 m" },
      { id: 'tsm302', left: "5 és 7 cm-es merőleges húrok: a kör sugara", right: "≈ 4,30 cm" },
      { id: 'tsm303', left: "16 m kerületű kör, 14 m-es ív: középponti szög", right: "315°" },
      { id: 'tsm304', left: "kocka felszíne 64-szeres: a térfogat", right: "512-szeres" },
      { id: 'tsm305', left: "PQR (4,4; 5,3; 6,4): a legnagyobb szög", right: "≈ 82,0°" },
      { id: 'tsm306', left: "oldalél = 3 · alapátló: hajlásszög az alaplappal", right: "≈ 80,4°" },
      { id: 'tsm307', left: "paralelogramma átlói 10 és 16 cm, 60°: rövidebb oldal", right: "7 cm" },
      { id: 'tsm308', left: "harmadolópontokkal kapott trapéz területaránya", right: "1/3" }
    ]
  }
};

export const TransformationsSolidsSummaryMatcher: React.FC<TransformationsSolidsSummaryMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g12-sum-transzformaciok-matcher',
  topicTitle = "8. Transzformációk, síkbeli és térbeli alakzatok – Párosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={12}
      chapterId="rendszerezo-osszefoglalas"
      topicId={topicId}
      subtopicId="transzformaciok-alakzatok"
      title={topicTitle}
      subtitle="Párosítsd a tételeket a képletükkel, az alakzatokat a területképletükkel és a feladatokat az eredményükkel!"
      levels={TRANSFORMATIONS_SOLIDS_SUMMARY_MATCHER_LEVELS}
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

export default TransformationsSolidsSummaryMatcher;

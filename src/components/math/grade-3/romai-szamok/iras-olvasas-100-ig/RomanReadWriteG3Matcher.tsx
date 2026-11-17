import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { BlocksCard, SplitCard } from './RomanReadWriteG3CardFigures';

interface RomanReadWriteG3MatcherProps {
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

const ROMAN_READ_WRITE_G3_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: "1. szint: Számok 40-ig",
    description: "Párosítsd az arab számot a római alakjával!",
    pairs: [
      { id: 'g3-rom-iras-olvasas-m1', left: "", promptFigure: <BlocksCard n={12} />, right: "XII" },
      { id: 'g3-rom-iras-olvasas-m2', left: "18", right: "XVIII" },
      { id: 'g3-rom-iras-olvasas-m3', left: "", promptFigure: <BlocksCard n={21} />, right: "XXI" },
      { id: 'g3-rom-iras-olvasas-m4', left: "", promptFigure: <BlocksCard n={24} />, right: "XXIV" },
      { id: 'g3-rom-iras-olvasas-m5', left: "29", right: "XXIX" },
      { id: 'g3-rom-iras-olvasas-m6', left: "", promptFigure: <BlocksCard n={33} />, right: "XXXIII" },
      { id: 'g3-rom-iras-olvasas-m7', left: "", promptFigure: <BlocksCard n={36} />, right: "XXXVI" },
      { id: 'g3-rom-iras-olvasas-m8', left: "39", right: "XXXIX" }
    ]
  },
  {
    level: 2,
    title: "2. szint: Számok 100-ig",
    description: "Párosítsd az arab számot a római alakjával!",
    pairs: [
      { id: 'g3-rom-iras-olvasas-m9', left: "41", right: "XLI" },
      { id: 'g3-rom-iras-olvasas-m10', left: "47", right: "XLVII" },
      { id: 'g3-rom-iras-olvasas-m11', left: "", promptFigure: <BlocksCard n={52} />, right: "LII" },
      { id: 'g3-rom-iras-olvasas-m12', left: "", promptFigure: <BlocksCard n={66} />, right: "LXVI" },
      { id: 'g3-rom-iras-olvasas-m13', left: "", promptFigure: <BlocksCard n={74} />, right: "LXXIV" },
      { id: 'g3-rom-iras-olvasas-m14', left: "83", right: "LXXXIII" },
      { id: 'g3-rom-iras-olvasas-m15', left: "", promptFigure: <BlocksCard n={91} />, right: "XCI" },
      { id: 'g3-rom-iras-olvasas-m16', left: "100", right: "C" }
    ]
  },
  {
    level: 3,
    title: "3. szint: Tízesrész és egyesrész",
    description: "Párosítsd a római számot a bontásával!",
    pairs: [
      { id: 'g3-rom-iras-olvasas-m17', left: "", promptFigure: <SplitCard s="XCIV" />, right: "90 + 4" },
      { id: 'g3-rom-iras-olvasas-m18', left: "", promptFigure: <SplitCard s="XLIX" />, right: "40 + 9" },
      { id: 'g3-rom-iras-olvasas-m19', left: "", promptFigure: <SplitCard s="LXXVIII" />, right: "70 + 8" },
      { id: 'g3-rom-iras-olvasas-m20', left: "XXXVI", right: "30 + 6" },
      { id: 'g3-rom-iras-olvasas-m21', left: "", promptFigure: <SplitCard s="LIV" />, right: "50 + 4" },
      { id: 'g3-rom-iras-olvasas-m22', left: "XCIX", right: "90 + 9" },
      { id: 'g3-rom-iras-olvasas-m23', left: "LXI", right: "60 + 1" },
      { id: 'g3-rom-iras-olvasas-m24', left: "XLV", right: "40 + 5" }
    ]
  }
];

export const ROMAN_READ_WRITE_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: ROMAN_READ_WRITE_G3_MATCHER_LEVELS_LIST[0],
  2: ROMAN_READ_WRITE_G3_MATCHER_LEVELS_LIST[1],
  3: ROMAN_READ_WRITE_G3_MATCHER_LEVELS_LIST[2]
};

export const RomanReadWriteG3Matcher: React.FC<RomanReadWriteG3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-rom-iras-olvasas-matcher',
  topicTitle = "2. Római számok írása és olvasása 100-ig – Párosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="romai-szamok"
      topicId={topicId}
      subtopicId="iras-olvasas-100-ig"
      title={topicTitle}
      subtitle="Párosítsd a számokat a római alakjukkal!"
      levels={ROMAN_READ_WRITE_G3_MATCHER_LEVELS}
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

export default RomanReadWriteG3Matcher;

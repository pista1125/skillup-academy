import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface AddSub10000MatcherProps {
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

const ADD_SUB_10000_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: "1. szint: Kerek ezresek és százasok",
    description: "Párosítsd a műveletet az eredményével!",
    pairs: [
      { id: 'as10m1', left: "3000 + 4000", right: "7000" },
      { id: 'as10m2', left: "5000 − 2000", right: "3000" },
      { id: 'as10m3', left: "1100 + 1200", right: "2300" },
      { id: 'as10m4', left: "2300 − 1200", right: "1100" },
      { id: 'as10m5', left: "2000 + 8000", right: "10 000" },
      { id: 'as10m6', left: "10 000 − 4000", right: "6000" },
      { id: 'as10m7', left: "4200 + 2000", right: "6200" },
      { id: 'as10m8', left: "9000 − 6500", right: "2500" }
    ]
  },
  {
    level: 2,
    title: "2. szint: Ezresátlépéssel",
    description: "Vigyázz az átlépésre! Párosítsd a műveletet az eredményével!",
    pairs: [
      { id: 'as10m9', left: "3400 + 5700", right: "9100" },
      { id: 'as10m10', left: "8200 − 5300", right: "2900" },
      { id: 'as10m11', left: "2600 + 4500", right: "7100" },
      { id: 'as10m12', left: "5900 + 3300", right: "9200" },
      { id: 'as10m13', left: "9700 − 7900", right: "1800" },
      { id: 'as10m14', left: "8600 − 4900", right: "3700" },
      { id: 'as10m15', left: "2700 + 4500", right: "7200" },
      { id: 'as10m16', left: "6300 − 2900", right: "3400" }
    ]
  },
  {
    level: 3,
    title: "3. szint: Pótlás és szöveges feladatok",
    description: "Párosítsd a feladatot a megoldásával!",
    pairs: [
      { id: 'as10m17', left: "1800 + □ = 2000", right: "□ = 200" },
      { id: 'as10m18', left: "8300 + □ = 9000", right: "□ = 700" },
      { id: 'as10m19', left: "4500 − □ = 4000", right: "□ = 500" },
      { id: 'as10m20', left: "Szörp júniusban (májusban 3700 dl, ez 1200 dl-rel kevesebb)", right: "4900 dl" },
      { id: 'as10m21', left: "Visszajáró 10 000-ből, ha 1600 + 4600 fabatkát költöttem", right: "3800 fabatka" },
      { id: 'as10m22', left: "C csille: összesen 5000 kg, a többi 800, 1400 és 1700 kg", right: "1100 kg" },
      { id: 'as10m23', left: "Fátyol (7700 fő) − Lepel (5800 fő)", right: "1900 fővel több" },
      { id: 'as10m24', left: "Áprilisi vendégek: 4000 + 5000", right: "9000 vendég" }
    ]
  }
];

const ADD_SUB_10000_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: ADD_SUB_10000_MATCHER_LEVELS_LIST[0],
  2: ADD_SUB_10000_MATCHER_LEVELS_LIST[1],
  3: ADD_SUB_10000_MATCHER_LEVELS_LIST[2]
};

export const AddSub10000Matcher: React.FC<AddSub10000MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-count-osszeadas-10000-matcher',
  topicTitle = "11. Összeadás és kivonás 10 000-ig – Párosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="szamolas-10000-ig"
      topicId={topicId}
      subtopicId="osszeadas-kivonas-10000-ig"
      title={topicTitle}
      subtitle="Párosítsd a műveleteket az eredményükkel!"
      levels={ADD_SUB_10000_MATCHER_LEVELS}
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

export default AddSub10000Matcher;

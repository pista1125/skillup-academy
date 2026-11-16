import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface MulDiv10000MatcherProps {
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

const MUL_DIV_10000_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: "1. szint: 10, 100, 1000",
    description: "Szorozz és ossz 10-zel, 100-zal, 1000-rel!",
    pairs: [
      { id: 'md10m1', left: "5 · 10", right: "50" },
      { id: 'md10m2', left: "5 · 100", right: "500" },
      { id: 'md10m3', left: "5 · 1000", right: "5000" },
      { id: 'md10m4', left: "80 · 100", right: "8000" },
      { id: 'md10m5', left: "700 · 10", right: "7000" },
      { id: 'md10m6', left: "380 : 10", right: "38" },
      { id: 'md10m7', left: "1500 : 100", right: "15" },
      { id: 'md10m8', left: "10 000 : 1000", right: "10" }
    ]
  },
  {
    level: 2,
    title: "2. szint: Kerek számok",
    description: "Párosítsd a műveletet az eredményével!",
    pairs: [
      { id: 'md10m9', left: "7 · 500", right: "3500" },
      { id: 'md10m10', left: "8 · 400", right: "3200" },
      { id: 'md10m11', left: "400 · 9", right: "3600" },
      { id: 'md10m12', left: "70 · 40", right: "2800" },
      { id: 'md10m13', left: "2800 : 4", right: "700" },
      { id: 'md10m14', left: "5600 : 7", right: "800" },
      { id: 'md10m15', left: "2400 : 60", right: "40" },
      { id: 'md10m16', left: "6300 : 90", right: "70" }
    ]
  },
  {
    level: 3,
    title: "3. szint: Melyik számra gondoltam?",
    description: "Párosítsd a leírást a számmal!",
    pairs: [
      { id: 'md10m17', left: "A 7 és a 400 szorzata", right: "2800" },
      { id: 'md10m18', left: "A 600 négyszerese", right: "2400" },
      { id: 'md10m19', left: "A 3500 és az 5 hányadosa", right: "700" },
      { id: 'md10m20', left: "Az 5 kilencszázszorosa", right: "4500" },
      { id: 'md10m21', left: "A 3200 negyede", right: "800" },
      { id: 'md10m22', left: "A 2400 és a 80 hányadosa", right: "30" },
      { id: 'md10m23', left: "Lilla: 1000 sor, soronként 5 vízirózsa", right: "5000 vízirózsa" },
      { id: 'md10m24', left: "7 · 1000 : 100 · 10 · 10 : 1000", right: "7" }
    ]
  }
];

const MUL_DIV_10000_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: MUL_DIV_10000_MATCHER_LEVELS_LIST[0],
  2: MUL_DIV_10000_MATCHER_LEVELS_LIST[1],
  3: MUL_DIV_10000_MATCHER_LEVELS_LIST[2]
};

export const MulDiv10000Matcher: React.FC<MulDiv10000MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-count-szorzas-10000-matcher',
  topicTitle = "12. Szorzás és osztás 10 000-ig – Párosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="szamolas-10000-ig"
      topicId={topicId}
      subtopicId="szorzas-osztas-10000-ig"
      title={topicTitle}
      subtitle="Párosítsd a szorzásokat és osztásokat az eredményükkel!"
      levels={MUL_DIV_10000_MATCHER_LEVELS}
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

export default MulDiv10000Matcher;

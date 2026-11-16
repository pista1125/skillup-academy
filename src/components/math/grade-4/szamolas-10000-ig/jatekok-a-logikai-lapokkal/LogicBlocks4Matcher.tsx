import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface LogicBlocks4MatcherProps {
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

const LOGIC_BLOCKS4_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: "1. szint: Hány ilyen lap van?",
    description: "Párosítsd a tulajdonságot azzal, hogy hány ilyen lap van a 48 lapos készletben!",
    pairs: [
      { id: "lbm1", left: "az egész készlet", right: "48" },
      { id: "lbm2", left: "piros lap", right: "12" },
      { id: "lbm3", left: "kör", right: "16" },
      { id: "lbm4", left: "nagy lap", right: "24" },
      { id: "lbm5", left: "piros kör", right: "4" },
      { id: "lbm6", left: "nagy piros kör", right: "2" },
      { id: "lbm7", left: "nagy, piros, lyukas kör", right: "1" },
      { id: "lbm8", left: "nagy piros lap", right: "6" }
    ]
  },
  {
    level: 2,
    title: "2. szint: Mit jelent az állítás?",
    description: "Párosítsd az állítást a jelentésével!",
    pairs: [
      { id: "lbm9", left: "„Négyzet vagy kör.”", right: "nem háromszög" },
      { id: "lbm10", left: "„Csak görbe vonal határolja.”", right: "kör" },
      { id: "lbm11", left: "„Nem kék, és nem zöld.”", right: "piros vagy sárga" },
      { id: "lbm12", left: "„Nem kicsi.”", right: "nagy" },
      { id: "lbm13", left: "„Nem kör, és nem négyzet.”", right: "háromszög" },
      { id: "lbm14", left: "„Nem lyukas.”", right: "nincs rajta lyuk" },
      { id: "lbm15", left: "„Ha sárga, akkor kicsi.”", right: "csak a nagy sárga lapokra hamis" },
      { id: "lbm16", left: "Hazudós barkochba: „Kék?” – „nem”", right: "a lap kék" }
    ]
  },
  {
    level: 3,
    title: "3. szint: Mi változott?",
    description: "Párosítsd a lappárt azzal, ami megváltozott!",
    pairs: [
      { id: "lbm17", left: "nagy sárga négyzet → kicsi sárga négyzet", right: "a mérete" },
      { id: "lbm18", left: "piros kör → piros lyukas kör", right: "lyukas lett" },
      { id: "lbm19", left: "sárga négyzet → kék négyzet", right: "a színe" },
      { id: "lbm20", left: "kék kör → kék háromszög", right: "a formája" },
      { id: "lbm21", left: "nagy zöld kör → kicsi kék kör", right: "a színe és a mérete" },
      { id: "lbm22", left: "nagy piros háromszög → kicsi piros lyukas háromszög", right: "a mérete és a lyuk" },
      { id: "lbm23", left: "nagy zöld kör → kicsi zöld háromszög", right: "a formája és a mérete" },
      { id: "lbm24", left: "kicsi kék kör → nagy piros lyukas négyzet", right: "mind a 4 tulajdonság" }
    ]
  }
];

const LOGIC_BLOCKS4_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: LOGIC_BLOCKS4_MATCHER_LEVELS_LIST[0],
  2: LOGIC_BLOCKS4_MATCHER_LEVELS_LIST[1],
  3: LOGIC_BLOCKS4_MATCHER_LEVELS_LIST[2]
};

export const LogicBlocks4Matcher: React.FC<LogicBlocks4MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-count-logikai-lapok-matcher',
  topicTitle = "8. Játékok a logikai lapokkal – Párosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="szamolas-10000-ig"
      topicId={topicId}
      subtopicId="jatekok-a-logikai-lapokkal"
      title={topicTitle}
      subtitle="Párosítsd a tulajdonságokat, az állításokat és a sorozatokat!"
      levels={LOGIC_BLOCKS4_MATCHER_LEVELS}
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

export default LogicBlocks4Matcher;

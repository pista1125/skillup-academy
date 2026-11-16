import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface TableSortingMatcherProps {
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

const TABLE_SORTING_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: "1. szint: Táblázatos szavak",
    description: "Párosítsd a szót a jelentésével!",
    pairs: [
      { id: 'tsm1', left: "sor", right: "vízszintes csík a táblázatban" },
      { id: 'tsm2', left: "oszlop", right: "függőleges csík a táblázatban" },
      { id: 'tsm3', left: "mező", right: "ahol egy sor és egy oszlop találkozik" },
      { id: 'tsm4', left: "2 × 2-es táblázat", right: "4 mezője van" },
      { id: 'tsm5', left: "elágazásos rajz", right: "Kitti válogatása ágakkal" },
      { id: 'tsm6', left: "Nem kék ceruza", right: "piros, sárga, zöld vagy lila ceruza" },
      { id: 'tsm7', left: "szempont", right: "ami szerint válogatunk, például a szín" },
      { id: 'tsm8', left: "üres mező", right: "nincs ilyen tulajdonságú elem" }
    ]
  },
  {
    level: 2,
    title: "2. szint: Melyik mezőbe?",
    description: "Számok: Páros – Nem páros sor, Négyjegyű – Nem négyjegyű oszlop. Állatok: Hal – Nem hal, Emlős – Nem emlős. Logikai lap: Lyukas – Nem lyukas, Kék – Nem kék.",
    pairs: [
      { id: 'tsm9', left: "1246", right: "páros, négyjegyű" },
      { id: 'tsm10', left: "48", right: "páros, nem négyjegyű" },
      { id: 'tsm11', left: "8889", right: "nem páros, négyjegyű" },
      { id: 'tsm12', left: "77", right: "nem páros, nem négyjegyű" },
      { id: 'tsm13', left: "aranyhal", right: "hal, nem emlős" },
      { id: 'tsm14', left: "delfin", right: "nem hal, emlős" },
      { id: 'tsm15', left: "polip", right: "nem hal, nem emlős" },
      { id: 'tsm16', left: "kék, lyukas háromszög", right: "Lyukas sor, Kék oszlop" }
    ]
  },
  {
    level: 3,
    title: "3. szint: Táblázat és halmazábra",
    description: "Mona ábrája: egyik karika a Kék, a másik a Radíros ceruzáké. Melyik rész felel meg a táblázat mezőjének?",
    pairs: [
      { id: 'tsm17', left: "Kék – Radíros mező", right: "a két karika közös része" },
      { id: 'tsm18', left: "Nem kék – Nem radíros mező", right: "a karikákon kívüli rész" },
      { id: 'tsm19', left: "Kék – Nem radíros mező", right: "csak a Kék karika (a közös részen kívül)" },
      { id: 'tsm20', left: "Nem kék – Radíros mező", right: "csak a Radíros karika (a közös részen kívül)" },
      { id: 'tsm21', left: "a Kék oszlop két mezője együtt", right: "az egész Kék karika" },
      { id: 'tsm22', left: "a Radíros sor két mezője együtt", right: "az egész Radíros karika" },
      { id: 'tsm23', left: "mind a négy mező együtt", right: "az egész keret: az összes ceruza" },
      { id: 'tsm24', left: "Kitti rajzának 4 ágvége", right: "a táblázat 4 mezője" }
    ]
  }
];

const TABLE_SORTING_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: TABLE_SORTING_MATCHER_LEVELS_LIST[0],
  2: TABLE_SORTING_MATCHER_LEVELS_LIST[1],
  3: TABLE_SORTING_MATCHER_LEVELS_LIST[2]
};

export const TableSortingMatcher: React.FC<TableSortingMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-group-tablazatok-matcher',
  topicTitle = "2. Válogatások táblázatokba – Párosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="valogatasok-csoportositasok"
      topicId={topicId}
      subtopicId="valogatasok-tablazatokba"
      title={topicTitle}
      subtitle="Párosítsd a táblázatos szavakat, az elemeket a mezőjükkel, és a táblázat mezőit a halmazábra részeivel!"
      levels={TABLE_SORTING_MATCHER_LEVELS}
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

export default TableSortingMatcher;

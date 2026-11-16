import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface TableSortingSorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onComplete?: () => void;
  topicId?: string;
  topicTitle?: string;
  [key: string]: any;
}

const TABLE_SORTING_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: "1. szint: Vízi állatok",
    description: "TK 133. o. 5. Hal, emlős – vagy egyik sem?",
    categories: [
      { id: 'hal', name: "Hal", color: 'sky' },
      { id: 'emlos', name: "Emlős (nem hal)", color: 'emerald' },
      { id: 'egyik', name: "Se nem hal, se nem emlős", color: 'amber' }
    ],
    items: [
      { id: 'tss1', text: "cápa", categoryId: 'hal' },
      { id: 'tss2', text: "aranyhal", categoryId: 'hal' },
      { id: 'tss3', text: "csikóhal", categoryId: 'hal' },
      { id: 'tss4', text: "bálna", categoryId: 'emlos' },
      { id: 'tss5', text: "delfin", categoryId: 'emlos' },
      { id: 'tss6', text: "vidra", categoryId: 'emlos' },
      { id: 'tss7', text: "béka", categoryId: 'egyik' },
      { id: 'tss8', text: "rák", categoryId: 'egyik' },
      { id: 'tss9', text: "polip", categoryId: 'egyik' }
    ]
  },
  {
    level: 2,
    title: "2. szint: Számok a táblázatban",
    description: "Sorok: Páros – Nem páros. Oszlopok: Négyjegyű – Nem négyjegyű.",
    categories: [
      { id: 'pn', name: "Páros, négyjegyű", color: 'indigo' },
      { id: 'pk', name: "Páros, nem négyjegyű", color: 'emerald' },
      { id: 'nn', name: "Nem páros, négyjegyű", color: 'rose' }
    ],
    items: [
      { id: 'tss10', text: "1246", categoryId: 'pn' },
      { id: 'tss11', text: "8002", categoryId: 'pn' },
      { id: 'tss12', text: "9998", categoryId: 'pn' },
      { id: 'tss13', text: "54", categoryId: 'pk' },
      { id: 'tss14', text: "600", categoryId: 'pk' },
      { id: 'tss15', text: "48", categoryId: 'pk' },
      { id: 'tss16', text: "9579", categoryId: 'nn' },
      { id: 'tss17', text: "1005", categoryId: 'nn' },
      { id: 'tss18', text: "8889", categoryId: 'nn' }
    ]
  },
  {
    level: 3,
    title: "3. szint: Logikai lapok",
    description: "Sorok: Lyukas – Nem lyukas. Oszlopok: Piros – Nem piros.",
    categories: [
      { id: 'pl', name: "Piros és lyukas", color: 'rose' },
      { id: 'pn', name: "Piros, de nem lyukas", color: 'amber' },
      { id: 'nl', name: "Nem piros, de lyukas", color: 'sky' }
    ],
    items: [
      { id: 'tss19', text: "piros, lyukas kör", categoryId: 'pl' },
      { id: 'tss20', text: "piros, lyukas négyzet", categoryId: 'pl' },
      { id: 'tss21', text: "piros, lyukas háromszög", categoryId: 'pl' },
      { id: 'tss22', text: "piros kör lyuk nélkül", categoryId: 'pn' },
      { id: 'tss23', text: "piros, nem lyukas téglalap", categoryId: 'pn' },
      { id: 'tss24', text: "piros háromszög lyuk nélkül", categoryId: 'pn' },
      { id: 'tss25', text: "kék, lyukas négyzet", categoryId: 'nl' },
      { id: 'tss26', text: "sárga, lyukas kör", categoryId: 'nl' },
      { id: 'tss27', text: "zöld, lyukas háromszög", categoryId: 'nl' }
    ]
  }
];

const TABLE_SORTING_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: TABLE_SORTING_SORTER_LEVELS_LIST[0],
  2: TABLE_SORTING_SORTER_LEVELS_LIST[1],
  3: TABLE_SORTING_SORTER_LEVELS_LIST[2]
};

export const TableSortingSorter: React.FC<TableSortingSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-group-tablazatok-sorter',
  topicTitle = "2. Válogatások táblázatokba – Csoportosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="valogatasok-csoportositasok"
      topicId={topicId}
      subtopicId="valogatasok-tablazatokba"
      title={topicTitle}
      subtitle="Válogasd szét a vízi állatokat, a számokat és a logikai lapokat a táblázat mezői szerint!"
      levels={TABLE_SORTING_SORTER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onComplete={onComplete}
      {...rest}
    />
  );
};

export default TableSortingSorter;

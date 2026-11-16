import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface GroupingExamSorterProps {
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

const GROUPING_EXAM_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: "1. szint: Melyik lecke eszköze?",
    description: "Melyik rajzzal vagy módszerrel dolgozunk?",
    categories: [
      { id: 'halmaz', name: "Halmazábra (karikák)", color: 'indigo' },
      { id: 'tabla', name: "Táblázat (sor és oszlop)", color: 'purple' },
      { id: 'fa', name: "Elágazásos rajz (ágak)", color: 'amber' }
    ],
    items: [
      { id: 'ges1', text: "közös rész", categoryId: 'halmaz' },
      { id: 'ges2', text: "a karikákon kívüli rész", categoryId: 'halmaz' },
      { id: 'ges3', text: "címke a karikán", categoryId: 'halmaz' },
      { id: 'ges4', text: "mező", categoryId: 'tabla' },
      { id: 'ges5', text: "Kék ceruza – Nem kék ceruza oszlop", categoryId: 'tabla' },
      { id: 'ges6', text: "Radíros sor", categoryId: 'tabla' },
      { id: 'ges7', text: "ágvégek száma", categoryId: 'fa' },
      { id: 'ges8', text: "D → A → B → Cs", categoryId: 'fa' },
      { id: 'ges9', text: "ceruzák → kékek → radíros", categoryId: 'fa' }
    ]
  },
  {
    level: 2,
    title: "2. szint: Igaz vagy hamis?",
    description: "A TK 131. oldali kép állatairól és az MF II. 51. o. 10. halmazról (3063, 4016, 7000, 6624, 8808, 9705, 5939).",
    categories: [
      { id: 'igaz', name: "Igaz", color: 'emerald' },
      { id: 'hamis', name: "Hamis", color: 'rose' },
      { id: 'ugyanaz', name: "Ugyanazt jelenti, mint: Van olyan, amelyik nem páros", color: 'amber' }
    ],
    items: [
      { id: 'ges10', text: "Van közöttük emlősállat.", categoryId: 'igaz' },
      { id: 'ges11', text: "Nem mindegyik madár tud repülni.", categoryId: 'igaz' },
      { id: 'ges12', text: "Van olyan szám, amelyben a számjegyek összege 26.", categoryId: 'igaz' },
      { id: 'ges13', text: "Nincs olyan madár, amelyik ragadozó.", categoryId: 'hamis' },
      { id: 'ges14', text: "A halmazban minden szám páratlan.", categoryId: 'hamis' },
      { id: 'ges15', text: "Nem minden szám kisebb, mint a 10 000.", categoryId: 'hamis' },
      { id: 'ges16', text: "Nem mindegyik páros.", categoryId: 'ugyanaz' },
      { id: 'ges17', text: "Van olyan, amelyik páratlan.", categoryId: 'ugyanaz' },
      { id: 'ges18', text: "Nem igaz, hogy mindegyik páros.", categoryId: 'ugyanaz' }
    ]
  },
  {
    level: 3,
    title: "3. szint: Hány lehetőség?",
    description: "Számold ki, vagy rendszerezve írd fel!",
    categories: [
      { id: 'k', name: "Kevesebb, mint 6", color: 'sky' },
      { id: 'h', name: "Pontosan 6", color: 'amber' },
      { id: 't', name: "Több, mint 6", color: 'rose' }
    ],
    items: [
      { id: 'ges19', text: "Csaba 2., Dániel Barna előtt (4 fiú)", categoryId: 'k' },
      { id: 'ges20', text: "0, 5, 7 kártya háromjegyű számai", categoryId: 'k' },
      { id: 'ges21', text: "szülők a kisfiúval, Anna is jön", categoryId: 'k' },
      { id: 'ges22', text: "1, 2, 3 kártya háromjegyű számai", categoryId: 'h' },
      { id: 'ges23', text: "4 tó párjai (AB = BA)", categoryId: 'h' },
      { id: 'ges24', text: "3 színű kör, lyukas és nem lyukas is", categoryId: 'h' },
      { id: 'ges25', text: "5 színből 3 szalvéta", categoryId: 't' },
      { id: 'ges26', text: "Alex megelőzi Barnát és Csabát (4 fiú)", categoryId: 't' },
      { id: 'ges27', text: "2 szín · 4 alak logikai lapjai", categoryId: 't' }
    ]
  }
];

const GROUPING_EXAM_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: GROUPING_EXAM_SORTER_LEVELS_LIST[0],
  2: GROUPING_EXAM_SORTER_LEVELS_LIST[1],
  3: GROUPING_EXAM_SORTER_LEVELS_LIST[2]
};

export const GroupingExamSorter: React.FC<GroupingExamSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-group-tudasproba-sorter',
  topicTitle = "5. Gyakorlás, tudáspróba – Csoportosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="valogatasok-csoportositasok"
      topicId={topicId}
      subtopicId="gyakorlas-tudasproba"
      title={topicTitle}
      subtitle="Vegyes csoportosító a fejezet mind a négy leckéjéből."
      levels={GROUPING_EXAM_SORTER_LEVELS}
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

export default GroupingExamSorter;

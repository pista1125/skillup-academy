import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface TrueFalse4SorterProps {
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

const TRUE_FALSE_4_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: "1. szint: Melyik kis szó?",
    description: "Milyen fajta az állítás?",
    categories: [
      { id: 'mind', name: "Mindegyik – minden …", color: 'emerald' },
      { id: 'van', name: "Van olyan – van közöttük …", color: 'sky' },
      { id: 'egy', name: "Egyik sem – nincs …", color: 'purple' }
    ],
    items: [
      { id: 'tfs1', text: "Mindegyik vadon élő állat.", categoryId: 'mind' },
      { id: 'tfs2', text: "A halmazban minden szám páratlan.", categoryId: 'mind' },
      { id: 'tfs3', text: "Mindegyik eleme páros szám.", categoryId: 'mind' },
      { id: 'tfs4', text: "Van közöttük emlősállat.", categoryId: 'van' },
      { id: 'tfs5', text: "Az emlősök között van ragadozó.", categoryId: 'van' },
      { id: 'tfs6', text: "Van olyan eleme, amelyik nem páros.", categoryId: 'van' },
      { id: 'tfs7', text: "Egyik sem hal.", categoryId: 'egy' },
      { id: 'tfs8', text: "Nincs közöttük háziállat.", categoryId: 'egy' },
      { id: 'tfs9', text: "Nincs olyan madár, amelyik ragadozó.", categoryId: 'egy' }
    ]
  },
  {
    level: 2,
    title: "2. szint: Melyik halmazra igaz?",
    description: "TK 132. o. 3. A: 1246, 54, 600, 8002, 9998 · B: 475, 33, 6606, 48, 9579 · C: 1005, 8889, 77, 1001, 423",
    categories: [
      { id: 'a', name: "Csak az A-ra igaz", color: 'amber' },
      { id: 'c', name: "Csak a C-re igaz", color: 'rose' },
      { id: 'bc', name: "A B-re és a C-re igaz", color: 'indigo' }
    ],
    items: [
      { id: 'tfs10', text: "Mindegyik eleme páros szám.", categoryId: 'a' },
      { id: 'tfs11', text: "Nincs olyan eleme, amelyik páratlan.", categoryId: 'a' },
      { id: 'tfs12', text: "Egyik eleme sem páratlan.", categoryId: 'a' },
      { id: 'tfs13', text: "Egyik eleme sem páros.", categoryId: 'c' },
      { id: 'tfs14', text: "Mindegyik eleme páratlan.", categoryId: 'c' },
      { id: 'tfs15', text: "Nincs olyan eleme, amelyik páros.", categoryId: 'c' },
      { id: 'tfs16', text: "Van olyan eleme, amelyik nem páros.", categoryId: 'bc' },
      { id: 'tfs17', text: "Van olyan eleme, amelyik páratlan.", categoryId: 'bc' },
      { id: 'tfs18', text: "Nem mindegyik eleme páros.", categoryId: 'bc' }
    ]
  },
  {
    level: 3,
    title: "3. szint: Mit jelent?",
    description: "Számokról szólnak az állítások. Melyikkel jelent ugyanazt?",
    categories: [
      { id: 'mp', name: "= Mindegyik páros", color: 'emerald' },
      { id: 'vn', name: "= Van olyan, amelyik nem páros", color: 'amber' },
      { id: 'ep', name: "= Egyik sem páros", color: 'purple' }
    ],
    items: [
      { id: 'tfs19', text: "Nincs olyan, amelyik páratlan.", categoryId: 'mp' },
      { id: 'tfs20', text: "Egyik sem páratlan.", categoryId: 'mp' },
      { id: 'tfs21', text: "Nincs olyan, amelyik nem páros.", categoryId: 'mp' },
      { id: 'tfs22', text: "Nem mindegyik páros.", categoryId: 'vn' },
      { id: 'tfs23', text: "Van olyan, amelyik páratlan.", categoryId: 'vn' },
      { id: 'tfs24', text: "Nem igaz, hogy mindegyik páros.", categoryId: 'vn' },
      { id: 'tfs25', text: "Nincs olyan, amelyik páros.", categoryId: 'ep' },
      { id: 'tfs26', text: "Mindegyik páratlan.", categoryId: 'ep' },
      { id: 'tfs27', text: "Nem igaz, hogy van olyan, amelyik páros.", categoryId: 'ep' }
    ]
  }
];

const TRUE_FALSE_4_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: TRUE_FALSE_4_SORTER_LEVELS_LIST[0],
  2: TRUE_FALSE_4_SORTER_LEVELS_LIST[1],
  3: TRUE_FALSE_4_SORTER_LEVELS_LIST[2]
};

export const TrueFalse4Sorter: React.FC<TrueFalse4SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-group-igaz-hamis-sorter',
  topicTitle = "4. Igaz vagy hamis? – Csoportosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="valogatasok-csoportositasok"
      topicId={topicId}
      subtopicId="igaz-vagy-hamis"
      title={topicTitle}
      subtitle="Válogasd szét az állításokat a kis szavak (mindegyik, van olyan, egyik sem) és az igazságuk szerint!"
      levels={TRUE_FALSE_4_SORTER_LEVELS}
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

export default TrueFalse4Sorter;

import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface StatDataCollectionSorterProps {
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

const STAT_DATA_COLLECTION_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Jó vagy rossz minta?',
    description: 'A város lakóinak véleményét szeretnénk megtudni. Csoportosítsd a mintavételi módszereket!',
    categories: [
      { id: 'rep', name: 'reprezentatív lehet', color: 'emerald' },
      { id: 'tor', name: 'torzított (rossz kiválasztás)', color: 'rose' },
      { id: 'kis', name: 'túl kicsi minta', color: 'amber' }
    ],
    items: [
      { id: 'sdcs1', text: 'életkor és végzettség szerint arányosan választott 2000 lakos', categoryId: 'rep' },
      { id: 'sdcs2', text: 'a lakcímnyilvántartásból véletlenszerűen sorsolt 1500 lakos', categoryId: 'rep' },
      { id: 'sdcs3', text: 'minden városrészből a lakosság arányában kérdezett 1000 fő', categoryId: 'rep' },
      { id: 'sdcs4', text: 'csak a helyi lap olvasói', categoryId: 'tor' },
      { id: 'sdcs5', text: 'csak az autótulajdonosok', categoryId: 'tor' },
      { id: 'sdcs6', text: 'csak egy edzőterem vendégei', categoryId: 'tor' },
      { id: 'sdcs7', text: 'a polgármester 3 szomszédja', categoryId: 'kis' },
      { id: 'sdcs8', text: 'egy véletlenszerűen kiválasztott 5 fős csoport', categoryId: 'kis' },
      { id: 'sdcs9', text: 'egyetlen véletlenül megszólított járókelő', categoryId: 'kis' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Venn-diagram tartományai',
    description: 'A vásárlók 60%-ának van kártyája (A), 25%-a használ kupont (B), 12%-a mindkettőt. Hová tartozik az adat?',
    categories: [
      { id: 'a', name: 'csak A: 48%', color: 'blue' },
      { id: 'ab', name: 'A · B: 12%', color: 'purple' },
      { id: 'none', name: 'egyik sem: 27%', color: 'slate' }
    ],
    items: [
      { id: 'sdcs10', text: '60% − 12%', categoryId: 'a' },
      { id: 'sdcs11', text: 'van kártyája, de kupont nem használ', categoryId: 'a' },
      { id: 'sdcs12', text: '10 000 vásárlóból 4800 fő', categoryId: 'a' },
      { id: 'sdcs13', text: 'mindkét kérdésre igennel válaszolt', categoryId: 'ab' },
      { id: 'sdcs14', text: '60% + 25% − 73%', categoryId: 'ab' },
      { id: 'sdcs15', text: '10 000 vásárlóból 1200 fő', categoryId: 'ab' },
      { id: 'sdcs16', text: '100% − 73%', categoryId: 'none' },
      { id: 'sdcs17', text: 'nem él egyik kedvezménnyel sem', categoryId: 'none' },
      { id: 'sdcs18', text: '10 000 vásárlóból 2700 fő', categoryId: 'none' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Mekkora a valószínűség?',
    description: 'Biztosító: 5000 ügyfél, 3600 rendszeres vezető, 300 baleset (174 rendszeres, 126 nem rendszeres). Csoportosítsd az értékeket!',
    categories: [
      { id: 'p06', name: '0,06', color: 'blue' },
      { id: 'p58', name: '0,58', color: 'emerald' },
      { id: 'p09', name: '0,09', color: 'amber' }
    ],
    items: [
      { id: 'sdcs19', text: 'egy ügyfél balesetben érintett', categoryId: 'p06' },
      { id: 'sdcs20', text: '300 / 5000', categoryId: 'p06' },
      { id: 'sdcs21', text: 'balesetes ügyfelek aránya az összes ügyfél közt', categoryId: 'p06' },
      { id: 'sdcs22', text: 'balesetes ügyfél rendszeres vezető', categoryId: 'p58' },
      { id: 'sdcs23', text: '174 / 300', categoryId: 'p58' },
      { id: 'sdcs24', text: '1 − 126 / 300', categoryId: 'p58' },
      { id: 'sdcs25', text: 'nem rendszeres vezetőnek balesete volt', categoryId: 'p09' },
      { id: 'sdcs26', text: '126 / 1400', categoryId: 'p09' },
      { id: 'sdcs27', text: 'a nem rendszeres vezetők közti baleseti arány', categoryId: 'p09' }
    ]
  }
};

export const StatDataCollectionSorter: React.FC<StatDataCollectionSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g12-stat-adatgyujtes-sorter',
  topicTitle = '1. Statisztikai adatgyűjtés – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={12}
      chapterId="statisztika-valoszinusegszamitas"
      topicId={topicId}
      subtopicId="statisztikai-adatgyujtes"
      title={topicTitle}
      subtitle="Rendszerezd a mintavételi módszereket, a Venn-diagram tartományait és a valószínűségeket!"
      levels={STAT_DATA_COLLECTION_SORTER_LEVELS}
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

export default StatDataCollectionSorter;

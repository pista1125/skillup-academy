import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CaseAnalysisSorterProps {
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

const CASE_ANALYSIS_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Melyik módszer a legegyszerűbb?',
    description: 'Döntsd el, mivel érdemes megoldani a feladatot!',
    categories: [
      { id: 'cases', name: 'Esetszétválasztás (összeadás)', color: 'teal' },
      { id: 'compl', name: 'Komplementer (kivonás)', color: 'rose' },
      { id: 'prod', name: 'Egyetlen szorzat is elég', color: 'blue' }
    ],
    items: [
      { id: 'cas1', text: '3 egyforma jutalom 12 diák között, egy diák többet is kaphat', categoryId: 'cases' },
      { id: 'cas2', text: '4 dobással legalább 22-t lépünk', categoryId: 'cases' },
      { id: 'cas3', text: 'Négyjegyű, 5-tel osztható, különböző számjegyű számok', categoryId: 'cases' },
      { id: 'cas4', text: '4 csapat sorrendje, ha a Delfinek nem a negyedikek', categoryId: 'compl' },
      { id: 'cas5', text: 'Kétjegyű számok, amelyekben van 7-es számjegy', categoryId: 'compl' },
      { id: 'cas6', text: 'Két egyforma bástya, amelyek ütik egymást a 3 × 3-as táblán', categoryId: 'compl' },
      { id: 'cas7', text: 'Fehér és fekete bástya, amelyek nem ütik egymást', categoryId: 'prod' },
      { id: 'cas8', text: '3 karakteres jelszó 5 különböző karakterből, ismétlés nélkül', categoryId: 'prod' },
      { id: 'cas9', text: '3 sávos zászló 4 színnel, csak a szomszédok különbözők', categoryId: 'prod' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Melyik feladat esete?',
    description: 'Sorold be az eseteket a megfelelő feladathoz!',
    categories: [
      { id: 'prize', name: '3 egyforma jutalom 12 diák között', color: 'amber' },
      { id: 'flag', name: '3 sávos zászló, piros csak felül', color: 'purple' },
      { id: 'tiger', name: '4 hím és 5 nőstény tigris két kifutóban', color: 'orange' }
    ],
    items: [
      { id: 'cas10', text: 'Egy diák kapja mind a hármat: 12', categoryId: 'prize' },
      { id: 'cas11', text: 'Egy diák 2-t, egy másik 1-et kap: 12 · 11', categoryId: 'prize' },
      { id: 'cas12', text: 'Három diák kap 1-1-et: (12 alatt 3)', categoryId: 'prize' },
      { id: 'cas13', text: 'Felül piros: 1 · 3 · 2', categoryId: 'flag' },
      { id: 'cas14', text: 'Felül sárga: 1 · 2 · 2', categoryId: 'flag' },
      { id: 'cas15', text: 'Felül zöld vagy kék: 2 · 2 · 2', categoryId: 'flag' },
      { id: 'cas16', text: 'Kisebb kifutóban 1 hím és 2 nőstény: 4 · 10', categoryId: 'tiger' },
      { id: 'cas17', text: 'Kisebb kifutóban 2 hím és 2 nőstény: 6 · 10', categoryId: 'tiger' },
      { id: 'cas18', text: 'A felosztás csak 3 + 6 vagy 4 + 5 lehet', categoryId: 'tiger' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Jó-e az esetszétválasztás?',
    description: 'Vizsgáld meg, hogy az esetek kizárják-e egymást és lefedik-e az összes lehetőséget!',
    categories: [
      { id: 'good', name: 'Jó: kizáró és teljes', color: 'emerald' },
      { id: 'missing', name: 'Hiányos: kimarad eset', color: 'amber' },
      { id: 'overlap', name: 'Átfedő: van kétszer számolt eset', color: 'rose' }
    ],
    items: [
      { id: 'cas19', text: 'Négyjegyű, 5-tel osztható szám: 0-ra végződik / 5-re végződik', categoryId: 'good' },
      { id: 'cas20', text: '2 egyforma jutalom: egy ember kapja mindkettőt / két különböző ember kapja', categoryId: 'good' },
      { id: 'cas21', text: 'Kétjegyű szám: van benne 7-es / nincs benne 7-es', categoryId: 'good' },
      { id: 'cas22', text: '3 egyforma jutalom 12 diák között: egy diák kapja mindet / három különböző diák kapja', categoryId: 'missing' },
      { id: 'cas23', text: '4 dobás, összeg legalább 22: az összeg 23 vagy 24', categoryId: 'missing' },
      { id: 'cas24', text: '7 lámpából legalább 5 ég: 5 lámpa ég / 6 lámpa ég', categoryId: 'missing' },
      { id: 'cas25', text: 'Kétjegyű szám 7-essel: az első jegy 7 / a második jegy 7', categoryId: 'overlap' },
      { id: 'cas26', text: 'Két kockadobás: az első 6-os / a második 6-os / egyik sem 6-os', categoryId: 'overlap' },
      { id: 'cas27', text: 'Egy 6 elemű halmaz részhalmazai: legalább 2 elemű / legfeljebb 3 elemű', categoryId: 'overlap' }
    ]
  }
];

const CASE_ANALYSIS_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: CASE_ANALYSIS_SORTER_LEVELS_LIST[0],
  2: CASE_ANALYSIS_SORTER_LEVELS_LIST[1],
  3: CASE_ANALYSIS_SORTER_LEVELS_LIST[2]
};

export const CaseAnalysisSorter: React.FC<CaseAnalysisSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-comb-esetszetvalasztas-sorter',
  topicTitle = '6. Esetszétválasztás – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="kombinatorika-grafok"
      topicId={topicId}
      subtopicId="esetszetvalasztas"
      title={topicTitle}
      subtitle="Rendszerezd: melyik módszer kell, melyik feladat esete, és jó-e az esetszétválasztás!"
      levels={CASE_ANALYSIS_SORTER_LEVELS}
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

export default CaseAnalysisSorter;

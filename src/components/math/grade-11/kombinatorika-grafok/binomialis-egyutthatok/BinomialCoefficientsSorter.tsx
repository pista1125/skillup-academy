import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface BinomialCoefficientsSorterProps {
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

const BINOMIAL_COEFFICIENTS_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Melyik modell illik a feladathoz?',
    description: 'Döntsd el, számít-e a sorrend, és lehet-e ismétlés!',
    categories: [
      { id: 'comb', name: 'Sorrend nem számít: (n alatt k)', color: 'purple' },
      { id: 'perm', name: 'Sorrend számít, ismétlés nincs: n · (n − 1) · …', color: 'blue' },
      { id: 'rep', name: 'Sorrend számít, ismétlés van: nᵏ', color: 'amber' }
    ],
    items: [
      { id: 'bcs1', text: '7 ember kézfogásainak száma', categoryId: 'comb' },
      { id: 'bcs2', text: 'A 32 lapos kártyából kiosztott 3 lap', categoryId: 'comb' },
      { id: 'bcs3', text: '15 gyöngyszínből 4 kiválasztása', categoryId: 'comb' },
      { id: 'bcs4', text: '7 ember mindenkinek küld egy SMS-t', categoryId: 'perm' },
      { id: 'bcs5', text: '7 emberből titkár és jegyző', categoryId: 'perm' },
      { id: 'bcs6', text: 'Hétfői órarend 11 tantárgyból 6 órával', categoryId: 'perm' },
      { id: 'bcs7', text: '4 jegyű PIN-kód a 10 számjegyből', categoryId: 'rep' },
      { id: 'bcs8', text: 'Egy dobókockával 3-szor dobunk – a dobássorozat', categoryId: 'rep' },
      { id: 'bcs9', text: '5 betűs „szó” az a, b, c betűkből', categoryId: 'rep' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mennyi az eredmény?',
    description: 'Csoportosítsd a kifejezéseket és feladatokat az értékük szerint!',
    categories: [
      { id: 'v21', name: '21', color: 'emerald' },
      { id: 'v35', name: '35', color: 'purple' },
      { id: 'v56', name: '56', color: 'rose' }
    ],
    items: [
      { id: 'bcs10', text: '(7 alatt 2)', categoryId: 'v21' },
      { id: 'bcs11', text: '(7 alatt 5)', categoryId: 'v21' },
      { id: 'bcs12', text: '7 kosárcsapat körmérkőzésének meccsszáma', categoryId: 'v21' },
      { id: 'bcs13', text: '(7 alatt 3)', categoryId: 'v35' },
      { id: 'bcs14', text: '(7 alatt 4)', categoryId: 'v35' },
      { id: 'bcs15', text: 'Anita sálmintái (7 szem, 3 sima)', categoryId: 'v35' },
      { id: 'bcs16', text: '(8 alatt 3)', categoryId: 'v56' },
      { id: 'bcs17', text: '(8 alatt 5)', categoryId: 'v56' },
      { id: 'bcs18', text: '3 egyforma piros és 5 egyforma sárga elem sorrendjei', categoryId: 'v56' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Igaz vagy hamis?',
    description: 'Válogasd szét az állításokat (n és k természetes számok, k ≤ n)!',
    categories: [
      { id: 'true', name: 'Mindig igaz', color: 'emerald' },
      { id: 'false', name: 'Mindig hamis', color: 'rose' },
      { id: 'depends', name: 'n-től és k-tól függ', color: 'amber' }
    ],
    items: [
      { id: 'bcs19', text: '(n alatt k) = (n alatt n − k)', categoryId: 'true' },
      { id: 'bcs20', text: '(n alatt n) = 1', categoryId: 'true' },
      { id: 'bcs21', text: 'Egy n elemű halmaz részhalmazainak száma 2ⁿ', categoryId: 'true' },
      { id: 'bcs22', text: '(n alatt 1) = 1, ha n ≥ 2', categoryId: 'false' },
      { id: 'bcs23', text: '(n alatt 2) = n · (n − 1), ha n ≥ 2', categoryId: 'false' },
      { id: 'bcs24', text: 'Egy n elemű halmaznak 2ⁿ − 1 részhalmaza van', categoryId: 'false' },
      { id: 'bcs25', text: '(n alatt k) páros szám', categoryId: 'depends' },
      { id: 'bcs26', text: '(n alatt k) = n', categoryId: 'depends' },
      { id: 'bcs27', text: '(n alatt k) > (n alatt k + 1)', categoryId: 'depends' }
    ]
  }
];

const BINOMIAL_COEFFICIENTS_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: BINOMIAL_COEFFICIENTS_SORTER_LEVELS_LIST[0],
  2: BINOMIAL_COEFFICIENTS_SORTER_LEVELS_LIST[1],
  3: BINOMIAL_COEFFICIENTS_SORTER_LEVELS_LIST[2]
};

export const BinomialCoefficientsSorter: React.FC<BinomialCoefficientsSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-comb-binomialis-sorter',
  topicTitle = '4. Binomiális együtthatók – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="kombinatorika-grafok"
      topicId={topicId}
      subtopicId="binomialis-egyutthatok"
      title={topicTitle}
      subtitle="Rendszerezd: számít-e a sorrend, mennyi az (n alatt k) értéke, és mely állítások igazak!"
      levels={BINOMIAL_COEFFICIENTS_SORTER_LEVELS}
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

export default BinomialCoefficientsSorter;

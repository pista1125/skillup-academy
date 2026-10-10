import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ComplexPercentSorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: '1. Szint: A Kétszeri Változás Hatása az Eredetihez Képest',
    subtitle: 'Döntsd el az összetett változásokról, hogy az új érték kisebb, egyenlő vagy nagyobb lett az eredetinél!',
    categories: [
      {
        id: 'cat-less',
        name: 'Kisebb lett az eredetinél (< 100%)',
        description: 'A szorzótényezők szorzata q < 1, összességében csökkenés történt',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300'
      },
      {
        id: 'cat-equal',
        name: 'Pontosan megegyezik az eredetivel (= 100%)',
        description: 'A szorzótényezők szorzata q = 1, az érték nem változott',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300'
      },
      {
        id: 'cat-greater',
        name: 'Nagyobb lett az eredetinél (> 100%)',
        description: 'A szorzótényezők szorzata q > 1, összességében drágulás vagy gyarapodás történt',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300'
      }
    ],
    items: [
      { id: 's1-1', label: '+20% majd -20% változás (q = 0,96)', category: 'cat-less' },
      { id: 's1-2', label: '-12% majd -8% gép amortizáció (q = 0,8096)', category: 'cat-less' },
      { id: 's1-3', label: '+12% majd -12% internet díj (q = 0,9856)', category: 'cat-less' },
      { id: 's1-4', label: '-15% majd -10% csizma leárazás (q = 0,765)', category: 'cat-less' },
      { id: 's1-5', label: '+25% majd -20% árváltozás (q = 1,00)', category: 'cat-equal' },
      { id: 's1-6', label: 'Négyzet kerülete, ha egyik oldala +40%, másik -40%', category: 'cat-equal' },
      { id: 's1-7', label: '+100% majd -50% változás (2 · 0,5 = 1,00)', category: 'cat-equal' },
      { id: 's1-8', label: 'Termék ára a 27% ÁFA hozzáadása majd visszaszámolása után', category: 'cat-equal' },
      { id: 's1-9', label: '+10% majd +6% termelésnövekedés (q = 1,166)', category: 'cat-greater' },
      { id: 's1-10', label: '+10% majd +10% palacsintázó emelés (q = 1,21)', category: 'cat-greater' },
      { id: 's1-11', label: '+30% majd -20% árváltozás (q = 1,04)', category: 'cat-greater' },
      { id: 's1-12', label: '+15% majd +25% drágulás (q = 1,4375)', category: 'cat-greater' }
    ]
  },
  2: {
    title: '2. Szint: Az Összesített Szorzótényező (q) Nagysága',
    subtitle: 'Sorold be a folyamatokat az összesített szorzótényező értéke szerint!',
    categories: [
      {
        id: 'cat-deflation',
        name: 'Jelentős csökkenés (q < 0,90)',
        description: 'Több mint 10%-os értékvesztés vagy leértékelés',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300'
      },
      {
        id: 'cat-slight',
        name: 'Kis eltérés (0,90 ≤ q ≤ 1,10)',
        description: 'Az eredeti érték ±10%-os környezetében maradó változás',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300'
      },
      {
        id: 'cat-inflation',
        name: 'Jelentős növekedés (q > 1,10)',
        description: 'Több mint 10%-os drágulás, gyarapodás vagy kapacitásbővülés',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300'
      }
    ],
    items: [
      { id: 's2-1', label: 'Két év alatti gépi amortizáció (q = 0,8096)', category: 'cat-deflation' },
      { id: 's2-2', label: 'Csizma kétszeri leárazása (q = 0,765)', category: 'cat-deflation' },
      { id: 's2-3', label: '10 cm négyzet területváltozása (+40%, -40% ➔ q = 0,84)', category: 'cat-deflation' },
      { id: 's2-4', label: 'Készlet fogyása két nap alatt (-12%, -15% ➔ q = 0,748)', category: 'cat-deflation' },
      { id: 's2-5', label: '+20% majd -20% változás (q = 0,96)', category: 'cat-slight' },
      { id: 's2-6', label: '+12% majd -12% internet díjcsomag (q = 0,9856)', category: 'cat-slight' },
      { id: 's2-7', label: '+25% majd -20% árváltozás (q = 1,00)', category: 'cat-slight' },
      { id: 's2-8', label: '+30% majd -20% árváltozás (q = 1,04)', category: 'cat-slight' },
      { id: 's2-9', label: 'Üdítőgép kapacitása (+10%, +6% ➔ q = 1,166)', category: 'cat-inflation' },
      { id: 's2-10', label: 'Palacsinta ára kétszer egymás után +10% (q = 1,21)', category: 'cat-inflation' },
      { id: 's2-11', label: 'Téglalap területének növekedése (+45%, +45% ➔ q = 2,1025)', category: 'cat-inflation' },
      { id: 's2-12', label: 'Pályázati összeg láncolt növekedése (+15%, +25% ➔ q = 1,4375)', category: 'cat-inflation' }
    ]
  },
  3: {
    title: '3. Szint: Szöveges Problématípus és Számítási Modell',
    subtitle: 'Azonosítsd a szöveges feladatok matematikai megoldási modelljét!',
    categories: [
      {
        id: 'cat-chain-price',
        name: 'Láncolt / Többlépéses árváltozás',
        description: 'Egymást követő százalékos emelések és csökkentések szorzással',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300'
      },
      {
        id: 'cat-budget-split',
        name: 'Költségvetési maradékmegosztás',
        description: 'Pénzösszeg vagy támogatás fokozatos elköltése részekre bontva',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300'
      },
      {
        id: 'cat-geom-trans',
        name: 'Geometriai százalékos transzformáció',
        description: 'Oldalhosszak változása és hatása a kerületre vagy területre',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300'
      }
    ],
    items: [
      { id: 's3-1', label: 'Csizma tavaszi és áprilisi leárazása (-15%, -10%)', category: 'cat-chain-price' },
      { id: 's3-2', label: 'Internet előfizetés emelése majd akciója (+12%, -12%)', category: 'cat-chain-price' },
      { id: 's3-3', label: 'Palacsintázó két egymást követő áremelése (+10%, +10%)', category: 'cat-chain-price' },
      { id: 's3-4', label: 'Új gép értékvesztése 2 év használat után (-12%, -8%)', category: 'cat-chain-price' },
      { id: 's3-5', label: 'Toldi-tanya iskola: labdák 1/4, szőnyeg 15%, korcsolya maradék harmada', category: 'cat-budget-split' },
      { id: 's3-6', label: 'Jótékonysági koncert: 85% kp, maradék 15% fele élelemre', category: 'cat-budget-split' },
      { id: 's3-7', label: 'Laptop vásárlás: 140 000 Ft készpénz és részlethitel kamattal', category: 'cat-budget-split' },
      { id: 's3-8', label: 'Lakásvásárlás: 15% előleg, 30% hitel és 640 000 Ft illeték', category: 'cat-budget-split' },
      { id: 's3-9', label: 'Négyzet oldalainak változtatása téglalappá (+40%, -40%)', category: 'cat-geom-trans' },
      { id: 's3-10', label: 'Téglalap mindkét oldalának növelése 45%-kal', category: 'cat-geom-trans' },
      { id: 's3-11', label: '24 cm oldalú négyzet oldala -40%, terület állandó', category: 'cat-geom-trans' },
      { id: 's3-12', label: 'Négyzet oldala csökken, területe az eredeti 64%-a lesz', category: 'cat-geom-trans' }
    ]
  }
};

export const ComplexPercentSorter: React.FC<ComplexPercentSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g7-pct-complex-sorter',
  topicTitle = 'Összetett százalékszámítási feladatok'
}) => {
  const activeLevel = (currentLevel || level) as DifficultyLevel;

  return (
    <SorterTemplate
      level={activeLevel}
      currentLevel={activeLevel}
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      grade={7}
      chapterId="g7-percent-equations"
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="purple"
      title="Összetett százalékszámítás - Csoportosító Játék"
      badge="CSOPORTOSÍTÓ"
    />
  );
};

export default ComplexPercentSorter;

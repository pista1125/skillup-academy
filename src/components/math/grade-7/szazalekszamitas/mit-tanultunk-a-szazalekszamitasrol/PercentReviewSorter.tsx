import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PercentReviewSorterProps {
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
    title: '1. Szint: Százalék Nagysága az Egészhez (100%-hoz) Képest',
    subtitle: 'Csoportosítsd a mennyiségeket aszerint, hogy kisebbek 100%-nál, pontosan 100%-osak, vagy nagyobbak 100%-nál!',
    categories: [
      {
        id: 'cat-less',
        name: '100%-nál kisebb (Törtrész)',
        description: 'Értéke 0 és 1 közötti tört vagy tizedestört (< 100%)',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300'
      },
      {
        id: 'cat-equal',
        name: 'Pontosan 100% (1 egész)',
        description: 'Értéke pontosan 1 egész egység (= 100%)',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300'
      },
      {
        id: 'cat-greater',
        name: '100%-nál nagyobb (1-nél több)',
        description: 'Értéke nagyobb 1 egésznél (> 100%)',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300'
      }
    ],
    items: [
      { id: 's1-1', label: '25% (negyedrész)', category: 'cat-less' },
      { id: 's1-2', label: '75% (háromnegyed)', category: 'cat-less' },
      { id: 's1-3', label: '0,2% (két tizedszázalék)', category: 'cat-less' },
      { id: 's1-4', label: '5‰ (öt ezrelék)', category: 'cat-less' },
      { id: 's1-5', label: '100% (a teljes egész)', category: 'cat-equal' },
      { id: 's1-6', label: '100/100 tört alak', category: 'cat-equal' },
      { id: 's1-7', label: '1,00 tizedes tört', category: 'cat-equal' },
      { id: 's1-8', label: '5/5 arányú egész', category: 'cat-equal' },
      { id: 's1-9', label: '140% (1,4-szeres)', category: 'cat-greater' },
      { id: 's1-10', label: '150% (másfélszeres)', category: 'cat-greater' },
      { id: 's1-11', label: '325% (3,25-szörös)', category: 'cat-greater' },
      { id: 's1-12', label: '400% (négyszeres)', category: 'cat-greater' }
    ]
  },
  2: {
    title: '2. Szint: A Százalékszámítás Három Alapfogalma',
    subtitle: 'Döntsd el a szöveges feladatok kiemelt részeiről, hogy Alap (A), Százalékláb (p%) vagy Százalékérték (É)!',
    categories: [
      {
        id: 'cat-base',
        name: 'Alap (A - 100%)',
        description: 'A kiindulási egész mennyiség, aminek a százalékát vesszük',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300'
      },
      {
        id: 'cat-rate',
        name: 'Százalékláb (p%)',
        description: 'A százalék mértéke, a viszonyítási arányszám',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300'
      },
      {
        id: 'cat-value',
        name: 'Százalékérték (É)',
        description: 'A kiszámított konkrét mennyiség vagy számérték',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300'
      }
    ],
    items: [
      { id: 's2-1', label: 'A színház 650 összes férőhelye', category: 'cat-base' },
      { id: 's2-2', label: 'A 150 grammos epres joghurt teljes tömege', category: 'cat-base' },
      { id: 's2-3', label: 'A 3400 Ft-os könyv eredeti bolti ára', category: 'cat-base' },
      { id: 's2-4', label: 'Digi 120 kg-os kiinduló kezdősúlya', category: 'cat-base' },
      { id: 's2-5', label: 'A joghurt 24%-os gyümölcstartalma', category: 'cat-rate' },
      { id: 's2-6', label: 'A narancslé 40%-os töménysége', category: 'cat-rate' },
      { id: 's2-7', label: 'A könyv 24%-os kedvezményének mértéke', category: 'cat-rate' },
      { id: 's2-8', label: 'A tengervíz 1‰-es sókoncentrációja', category: 'cat-rate' },
      { id: 's2-9', label: 'A joghurtban lévő 36 g tiszta eper', category: 'cat-value' },
      { id: 's2-10', label: 'A megmaradt 52 darab színházjegy', category: 'cat-value' },
      { id: 's2-11', label: 'A 816 Ft megtakarított összeg a könyvnél', category: 'cat-value' },
      { id: 's2-12', label: 'Digi 97,2 kg-os új testsúlya a 2. év végén', category: 'cat-value' }
    ]
  },
  3: {
    title: '3. Szint: Változások és Szorzótényezők',
    subtitle: 'Csoportosítsd a százalékos változásokat aszerint, hogy a szorzótényező csökkenést, változatlanságot vagy növekedést jelent!',
    categories: [
      {
        id: 'cat-decrease',
        name: 'Csökkenés (Szorzó < 1)',
        description: 'Kedvezmény, veszteség, fogyás vagy selejt (1 - p/100)',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300'
      },
      {
        id: 'cat-steady',
        name: 'Változatlan (Szorzó = 1)',
        description: 'Az eredeti 100% megmaradása, 0% árváltozás',
        badgeColor: 'bg-slate-100 text-slate-900 border-slate-300 dark:bg-slate-800 dark:text-slate-200'
      },
      {
        id: 'cat-increase',
        name: 'Növekedés (Szorzó > 1)',
        description: 'Drágulás, területgyarapodás, többlet (1 + p/100)',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300'
      }
    ],
    items: [
      { id: 's3-1', label: '24%-os könyv leárazás (szorzó: 0,76)', category: 'cat-decrease' },
      { id: 's3-2', label: '50%-os kiárusítás (szorzó: 0,50)', category: 'cat-decrease' },
      { id: 's3-3', label: 'Két egymást követő 10% fogyás (szorzó: 0,81)', category: 'cat-decrease' },
      { id: 's3-4', label: 'Jegyeladás után megmaradt 8% (szorzó: 0,08)', category: 'cat-decrease' },
      { id: 's3-5', label: 'Eredeti fogyasztói ár megtartása (szorzó: 1,0)', category: 'cat-steady' },
      { id: 's3-6', label: '0%-os fizetésmódosítás', category: 'cat-steady' },
      { id: 's3-7', label: 'Mennyiség 5/5-szöröse (1 egész)', category: 'cat-steady' },
      { id: 's3-8', label: 'A teljes 100%-os létszám jelenléte', category: 'cat-steady' },
      { id: 's3-9', label: 'Kert hosszabb oldala 170% (szorzó: 1,7)', category: 'cat-increase' },
      { id: 's3-10', label: 'Négyzet oldalának 40%-os növelése (szorzó: 1,4)', category: 'cat-increase' },
      { id: 's3-11', label: 'Másfélszeresére emelt termelés (szorzó: 1,5)', category: 'cat-increase' },
      { id: 's3-12', label: 'Tőke négyszeresére duzzadása (szorzó: 4,0)', category: 'cat-increase' }
    ]
  }
};

export const PercentReviewSorter: React.FC<PercentReviewSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g7-pct-review-sorter',
  topicTitle = 'Mit tanultunk a százalékszámításról?'
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
      themeColor="rose"
      title="Mit tanultunk a százalékszámításról? - Csoportosító Játék"
      badge="CSOPORTOSÍTÓ"
    />
  );
};

export default PercentReviewSorter;

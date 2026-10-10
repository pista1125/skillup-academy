import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CalculateHundredSorterProps {
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
    title: '1. Szint: Az Alap és a Részérték Viszonya',
    subtitle: 'Döntsd el a megadott százalékos állításról, hogy a kiindulási alap nagyobb, egyenlő vagy kisebb, mint a megadott érték!',
    categories: [
      {
        id: 'cat-greater',
        name: 'Alap > Érték (p% < 100%)',
        description: 'Mivel a részérték 100%-nál kisebb, a kiinduló teljes alap nagyobb nála',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300'
      },
      {
        id: 'cat-equal',
        name: 'Alap = Érték (p% = 100%)',
        description: 'A megadott érték pontosan a 100%-nak felel meg',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300'
      },
      {
        id: 'cat-smaller',
        name: 'Alap < Érték (p% > 100%)',
        description: 'Mivel az érték 100%-nál nagyobb (pl. emelés után), az eredeti alap kisebb nála',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300'
      }
    ],
    items: [
      { id: 's1-1', label: '12% = 84 diák (Alap: 700)', category: 'cat-greater' },
      { id: 's1-2', label: '30% = 150 Ft (Alap: 500 Ft)', category: 'cat-greater' },
      { id: 's1-3', label: '40% = 72 perc (Alap: 180 perc)', category: 'cat-greater' },
      { id: 's1-4', label: '10% = 7500 € (Alap: 75 000 €)', category: 'cat-greater' },
      { id: 's1-5', label: '100% = 350 Ft könyvár', category: 'cat-equal' },
      { id: 's1-6', label: '100% = 28 diák a teremben', category: 'cat-equal' },
      { id: 's1-7', label: 'Teljes egész 120 kg kezdősúly', category: 'cat-equal' },
      { id: 's1-8', label: 'Minden diák jelen van: 30 fő', category: 'cat-equal' },
      { id: 's1-9', label: '120% = 4 560 000 Ft autóár', category: 'cat-smaller' },
      { id: 's1-10', label: '125% = 30 diák osztálylétszám', category: 'cat-smaller' },
      { id: 's1-11', label: '160% = 40 (Alap: 25)', category: 'cat-smaller' },
      { id: 's1-12', label: '200% = 50 kg (Alap: 25 kg)', category: 'cat-smaller' }
    ]
  },
  2: {
    title: '2. Szint: Százalékarány Azonosítása Szövegből',
    subtitle: 'Sorold be a szöveges problémát a visszaszámításnál használt százalék jellege szerint!',
    categories: [
      {
        id: 'cat-direct',
        name: 'Közvetlen rész (p% < 100%)',
        description: 'A szöveg közvetlenül megadja a vizsgált rész százalékát',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300'
      },
      {
        id: 'cat-increase',
        name: 'Drágulás vagy növekedés (100% + p%)',
        description: 'Áremelés vagy gyarapodás utáni állapot (> 100%)',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300'
      },
      {
        id: 'cat-decrease',
        name: 'Kedvezmény vagy maradék (100% - p%)',
        description: 'Leárazás, elfelejtett rész vagy eladás után megmaradt hányad (< 100%)',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300'
      }
    ],
    items: [
      { id: 's2-1', label: 'Zeneiskolások 12%-a 84 fő', category: 'cat-direct' },
      { id: 's2-2', label: 'Napelem a tető 30%-a', category: 'cat-direct' },
      { id: 's2-3', label: 'Foglaló a vételár 10%-a', category: 'cat-direct' },
      { id: 's2-4', label: 'Megmaradt filmidő 40%-a (72 perc)', category: 'cat-direct' },
      { id: 's2-5', label: 'Autó ára +20% áremelés után (120%)', category: 'cat-increase' },
      { id: 's2-6', label: 'Osztálylétszám +25% bővülés után (125%)', category: 'cat-increase' },
      { id: 's2-7', label: 'Termelés +50% többlettel (150%)', category: 'cat-increase' },
      { id: 's2-8', label: 'Árfolyam +10% emelkedés után (110%)', category: 'cat-increase' },
      { id: 's2-9', label: 'Számítógép -20% akcióban (80%)', category: 'cat-decrease' },
      { id: 's2-10', label: 'Reggelre megjegyzett szavak 40% felejtés után (60%)', category: 'cat-decrease' },
      { id: 's2-11', label: 'Délután megmaradt őszibarack 60% eladás után (40%)', category: 'cat-decrease' },
      { id: 's2-12', label: 'Villanyszámla 90% megtakarítás után fizetendő (10%)', category: 'cat-decrease' }
    ]
  },
  3: {
    title: '3. Szint: Visszaszámítási Műveletstratégiák',
    subtitle: 'Csoportosítsd a feladatokat aszerint, hogy milyen osztóval számolható ki leggyorsabban a kiindulási alap!',
    categories: [
      {
        id: 'cat-div-pure',
        name: 'Osztás közvetlen tizedessel (É : 0,0p)',
        description: 'Közvetlen százaléklábbal való osztás (pl. 12% ➔ : 0,12)',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300'
      },
      {
        id: 'cat-div-plus',
        name: 'Osztás emelt értékkel (É : 1,p)',
        description: 'Áremelés utáni visszaszámolás (pl. +20% ➔ : 1,20)',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300'
      },
      {
        id: 'cat-div-minus',
        name: 'Osztás csökkentett értékkel (É : (1 - p))',
        description: 'Akció vagy fogyás utáni visszaszámolás (pl. -20% ➔ : 0,80)',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300'
      }
    ],
    items: [
      { id: 's3-1', label: '84 diák zenetanuló (84 : 0,12)', category: 'cat-div-pure' },
      { id: 's3-2', label: '72 perc filmidő (72 : 0,40)', category: 'cat-div-pure' },
      { id: 's3-3', label: '7500 € házfoglaló (7500 : 0,10)', category: 'cat-div-pure' },
      { id: 's3-4', label: '684 000 Ft jövedelemadó (684 000 : 0,15)', category: 'cat-div-pure' },
      { id: 's3-5', label: '4 560 000 Ft autó drágulás után (4 560 000 : 1,20)', category: 'cat-div-plus' },
      { id: 's3-6', label: '30 fős osztály +25% után (30 : 1,25)', category: 'cat-div-plus' },
      { id: 's3-7', label: '650 Ft Maxi Mix új ár (650 : 1,30)', category: 'cat-div-plus' },
      { id: 's3-8', label: '132 m megnövelt telekkerület (132 : 1,10)', category: 'cat-div-plus' },
      { id: 's3-9', label: '196 000 Ft laptop akcióban (196 000 : 0,80)', category: 'cat-div-minus' },
      { id: 's3-10', label: '72 megjegyzett szó 40% felejtés után (72 : 0,60)', category: 'cat-div-minus' },
      { id: 's3-11', label: '120 kg barack délutánra (120 : 0,40)', category: 'cat-div-minus' },
      { id: 's3-12', label: '26 400 Ft maradék számla 90% spórolás után (26 400 : 0,10)', category: 'cat-div-minus' }
    ]
  }
};

export const CalculateHundredSorter: React.FC<CalculateHundredSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g7-pct-100-sorter',
  topicTitle = 'A 100% kiszámítása'
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
      themeColor="emerald"
      title="A 100% kiszámítása - Csoportosító Játék"
      badge="CSOPORTOSÍTÓ"
    />
  );
};

export default CalculateHundredSorter;

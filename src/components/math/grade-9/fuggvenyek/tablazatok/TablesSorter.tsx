import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface TablesSorterProps {
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
    title: '1. Szint: Táblázat Elemeinek és Mértékegységeinek Besorolása',
    subtitle: 'Sorold be a kifejezéseket a táblázat megfelelő szerkezeti egységéhez!',
    categories: [
      {
        id: 'cat-row',
        name: 'Sorok (Rekordok)',
        description: 'Vízszintes adatsorok egy-egy konkrét egyedről',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-col',
        name: 'Oszlopok (Változók)',
        description: 'Függőleges adatsorok azonos tulajdonságokról',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-head',
        name: 'Fejlécek & Cellák',
        description: 'Megnevezések, mértékegységek és metszésponti adatok',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      }
    ],
    items: [
      // Sorok
      { id: 'ts1-1', label: 'Kovács Anna összes adata', category: 'cat-row' },
      { id: 'ts1-2', label: '2. számú mérés adatsora', category: 'cat-row' },
      { id: 'ts1-3', label: 'Hétfői nap órái és termei', category: 'cat-row' },
      { id: 'ts1-4', label: 'Egy konkrét megfigyelt személy', category: 'cat-row' },
      // Oszlopok
      { id: 'ts1-5', label: 'Magasságok (cm) oszlopa', category: 'cat-col' },
      { id: 'ts1-6', label: 'Havi nettó jövedelmek', category: 'cat-col' },
      { id: 'ts1-7', label: 'Választott idegen nyelv', category: 'cat-col' },
      { id: 'ts1-8', label: 'Diákok életkora', category: 'cat-col' },
      // Fejlécek & Cellák
      { id: 'ts1-9', label: 'Mértékegység: (ezer Ft)', category: 'cat-head' },
      { id: 'ts1-10', label: 'B3 koordinátájú adatmező', category: 'cat-head' },
      { id: 'ts1-11', label: 'Oszlopfejléc: „Árfolyam”', category: 'cat-head' },
      { id: 'ts1-12', label: 'Egyetlen metszésponti számérték: 28 db', category: 'cat-head' }
    ]
  },
  2: {
    title: '2. Szint: Kereszttáblázatok Mutatói és Arányai',
    subtitle: 'Kategorizáld a mutatókat a kereszttáblázat megfelelő területe szerint!',
    categories: [
      {
        id: 'cat-inner',
        name: 'Belső Cella Értékek',
        description: 'Két ismérv együttes gyakorisága',
        badgeColor: 'bg-sky-100 text-sky-900 border-sky-300'
      },
      {
        id: 'cat-margin',
        name: 'Peremösszegek (Margók)',
        description: 'Sorösszegek és oszlopösszegek részösszesítései',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-total',
        name: 'Teljes Minta & Százalék',
        description: 'N mintaelemszám és relatív megoszlások',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      // Belső Cella
      { id: 'ts2-1', label: '18 diák, akik fiúk ÉS fociznak', category: 'cat-inner' },
      { id: 'ts2-2', label: '14 lány, akik úsznak', category: 'cat-inner' },
      { id: 'ts2-3', label: 'Németül tanuló 9.A osztályosok száma', category: 'cat-inner' },
      { id: 'ts2-4', label: 'Két feltételnek egyszerre megfelelő csoport', category: 'cat-inner' },
      // Peremösszeg
      { id: 'ts2-5', label: 'Az osztályban lévő összes lány (20 fő)', category: 'cat-margin' },
      { id: 'ts2-6', label: 'Az összes focista sportágtól függetlenül (24 fő)', category: 'cat-margin' },
      { id: 'ts2-7', label: 'Sorok végén álló részösszeg', category: 'cat-margin' },
      { id: 'ts2-8', label: 'Oszlopok alján álló összegző érték', category: 'cat-margin' },
      // Teljes Minta & Százalék
      { id: 'ts2-9', label: 'Jobb alsó sarok: N = 50 fő', category: 'cat-total' },
      { id: 'ts2-10', label: 'A fiúk 60%-a focizik', category: 'cat-total' },
      { id: 'ts2-11', label: 'Relatív gyakoriság: 28% (14 / 50)', category: 'cat-total' },
      { id: 'ts2-12', label: 'Sorösszegek és oszlopösszegek egyező végösszege', category: 'cat-total' }
    ]
  },
  3: {
    title: '3. Szint: Függvénytáblázatok Típusaik Szerint',
    subtitle: 'Sorold be a táblázatos összefüggéseket a megfelelő függvénytípushoz!',
    categories: [
      {
        id: 'cat-linear',
        name: 'Lineáris Függvény (y = mx + b)',
        description: 'Egyenletes növekedés, állandó differenciák',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-quadratic',
        name: 'Másodfokú Függvény (y = ax² + bx + c)',
        description: 'Szimmetrikus növekedés, parabola értéktáblája',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-inverse',
        name: 'Fordított Arányosság (y = k / x)',
        description: 'x · y szorzat állandó hiperbola értékek',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      // Lineáris
      { id: 'ts3-1', label: '(-1; -1), (0; 1), (1; 3), (2; 5)', category: 'cat-linear' },
      { id: 'ts3-2', label: 'y értékei mindig 2-vel nőnek, ha x nő 1-gyel', category: 'cat-linear' },
      { id: 'ts3-3', label: 'Egyenes arányosság: y = 4x', category: 'cat-linear' },
      { id: 'ts3-4', label: 'Képlet: f(x) = 3x - 4', category: 'cat-linear' },
      // Másodfokú
      { id: 'ts3-5', label: '(-2; 4), (-1; 1), (0; 0), (1; 1), (2; 4)', category: 'cat-quadratic' },
      { id: 'ts3-6', label: 'Tengelyesen szimmetrikus y értékek', category: 'cat-quadratic' },
      { id: 'ts3-7', label: 'Képlet: f(x) = x² - 3', category: 'cat-quadratic' },
      { id: 'ts3-8', label: '(0; 0) origóban minimumhely található', category: 'cat-quadratic' },
      // Fordított Arányosság
      { id: 'ts3-9', label: '(1; 60), (2; 30), (3; 20), (4; 15)', category: 'cat-inverse' },
      { id: 'ts3-10', label: 'Minden oszlopban x · y = 60 állandó', category: 'cat-inverse' },
      { id: 'ts3-11', label: 'Ha x kétszeresére nő, y a felére csökken', category: 'cat-inverse' },
      { id: 'ts3-12', label: 'Képlet: f(x) = 12 / x', category: 'cat-inverse' }
    ]
  }
};

export const TablesSorter: React.FC<TablesSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g9-func-tablazatok-sorter',
  topicTitle = '1. Táblázatok'
}) => {
  return (
    <SorterTemplate
      level={level}
      currentLevel={currentLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      grade={9}
      chapterId="fuggvenyek"
      topicId={topicId}
      topicTitle={topicTitle}
      badge="9. Osztály • V. Függvények"
      levelConfigs={sorterLevels}
    />
  );
};


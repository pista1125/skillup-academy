import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface HowManyWaysSorterProps {
  level?: DifficultyLevel;
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
    title: '1. Szint: Szorzási szabály (ÉS) vs. Összeadási szabály (VAGY) vs. Mindkettő',
    subtitle: 'Csoportosítsd a feladatokat aszerint, hogy melyik matematikai szabályt kell alkalmazni a megoldáshoz!',
    categories: [
      {
        id: 'cat-mult',
        name: 'Csak Szorzási Szabály (Multiplikatív elv, ÉS kapcsolat)',
        description: 'Független döntések egymás után, mindegyiket meg kell hozni',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-add',
        name: 'Csak Összeadási Szabály (Additív elv, VAGY kapcsolat)',
        description: 'Egymást kizáró alternatívák közül választunk egyet',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-mixed',
        name: 'Mindkét Szabály Vegyesen (Esetszétválasztás + Szorzás)',
        description: 'Több különálló esetre bontjuk, és az eseteken belül szorzunk',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      { id: 'hs1-1', label: '2 nadrág és 3 ing együttes viselése', category: 'cat-mult' },
      { id: 'hs1-2', label: '4-jegyű bankkártya PIN kód generálása', category: 'cat-mult' },
      { id: 'hs1-3', label: '3-fogásos ebéd: leves, főétel, desszert kiválasztása', category: 'cat-mult' },
      { id: 'hs1-4', label: '3 pénzérme együttes feldobása', category: 'cat-mult' },
      { id: 'hs1-5', label: 'Utazás Szegedre: 3 vonat VAGY 4 busz közül választunk', category: 'cat-add' },
      { id: 'hs1-6', label: 'Rendelés: VAGY kávé (4 féle), VAGY tea (3 féle) kérhető', category: 'cat-add' },
      { id: 'hs1-7', label: 'Egy dobókockával 1-est VAGY 6-ost dobunk', category: 'cat-add' },
      { id: 'hs1-8', label: 'Könyvtárból 1 regény (50 db) VAGY 1 verseskötet (20 db) kölcsönzése', category: 'cat-add' },
      { id: 'hs1-9', label: 'Kétjegyű számok, amelyek 5-tel oszthatók (0-ra VAGY 5-re végződnek)', category: 'cat-mixed' },
      { id: 'hs1-10', label: '3-jegyű páros számok {1,2,3,4,5} különböző jegyekből', category: 'cat-mixed' },
      { id: 'hs1-11', label: 'Utazás A-ból C-be B-n át (2 ill. 3 út) VAGY közvetlen járattal (2 út)', category: 'cat-mixed' },
      { id: 'hs1-12', label: '2 fiú ÉS 2 lány, VAGY 4 lány kiválasztása táncra', category: 'cat-mixed' }
    ]
  },
  2: {
    title: '2. Szint: Ismétlés Megengedett vs. Ismétlés Nélküli vs. Kötött Feltételes',
    subtitle: 'Rendszerezd a feladatokat a döntések szabadsága és a megkötések alapján!',
    categories: [
      {
        id: 'cat-rep',
        name: 'Ismétlés Megengedett (Állandó választék: nᵏ)',
        description: 'Ugyanaz az elem vagy számjegy többször is szerepelhet',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-norep',
        name: 'Ismétlés Nélküli (Fogyó választék: n · (n-1) · ...)',
        description: 'Minden elem csak egyszer használható fel',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-cond',
        name: 'Kötött Feltételes (Kezdőjegy ≠ 0, paritás, megkötések)',
        description: 'A helyiérték vagy a paritás speciális szabályt diktál',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      { id: 'hs2-1', label: '4 tárcsás számzár lehetséges kódjai a 0–9 jegyekből', category: 'cat-rep' },
      { id: 'hs2-2', label: '3 szabályos dobókockával egyszerre dobunk', category: 'cat-rep' },
      { id: 'hs2-3', label: '5 kérdéses igaz/hamis tesztlap kitöltése', category: 'cat-rep' },
      { id: 'hs2-4', label: '4 pénzérme egymás utáni feldobásának sorozatai', category: 'cat-rep' },
      { id: 'hs2-5', label: '4 futó befutási sorrendje a célba', category: 'cat-norep' },
      { id: 'hs2-6', label: '3 különböző könyv sorrendje egy könyvespolcon', category: 'cat-norep' },
      { id: 'hs2-7', label: '8 indulóból arany, ezüst, bronz érmesek', category: 'cat-norep' },
      { id: 'hs2-8', label: '3-jegyű szám {1,2,3,4,5} különböző jegyekből', category: 'cat-norep' },
      { id: 'hs2-9', label: '3-jegyű szám {0,1,2,3} különböző jegyekből', category: 'cat-cond' },
      { id: 'hs2-10', label: '3-jegyű páros szám képzése {1,2,3,4,5} jegyekből', category: 'cat-cond' },
      { id: 'hs2-11', label: 'Az összes 3-jegyű pozitív egész szám darabszáma', category: 'cat-cond' },
      { id: 'hs2-12', label: 'Oda-vissza út úgy, hogy visszafelé másik úton jövünk', category: 'cat-cond' }
    ]
  },
  3: {
    title: '3. Szint: Eredmények Nagyságrendje',
    subtitle: 'Becsüld meg vagy számítsd ki a kimenetelek számát és csoportosítsd nagyságrend szerint!',
    categories: [
      {
        id: 'cat-few',
        name: 'Kevés Lehetőség (Legfeljebb 10 eset)',
        description: 'Kézzel vagy fadiagrammal azonnal felrajzolható',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-medium',
        name: 'Közepes Számú Lehetőség (11 – 100 eset)',
        description: 'Szorzási szabállyal gyorsan számolható, átlátható méret',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-many',
        name: 'Nagy Számú Lehetőség (100-nál több eset)',
        description: 'Több száz, több ezer vagy tízezer kimenetel',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 'hs3-1', label: '2 nadrág és 3 ing lehetséges kombinációi', category: 'cat-few' },
      { id: 'hs3-2', label: '3 pénzérme feldobásának kimenetelei', category: 'cat-few' },
      { id: 'hs3-3', label: '3 busz vagy 4 vonat Szegedre (egy járatot választunk)', category: 'cat-few' },
      { id: 'hs3-4', label: 'Két kocka dobásösszege pontosan 4', category: 'cat-few' },
      { id: 'hs3-5', label: 'Két szabályos dobókocka összes kimenetele', category: 'cat-medium' },
      { id: 'hs3-6', label: '3-jegyű szám {1,2,3,4,5} különböző jegyekből', category: 'cat-medium' },
      { id: 'hs3-7', label: '4 jóbarát ülésrendje egy padon', category: 'cat-medium' },
      { id: 'hs3-8', label: 'Kétjegyű pozitív egész számok darabszáma', category: 'cat-medium' },
      { id: 'hs3-9', label: '4-jegyű bankkártya PIN kódok darabszáma', category: 'cat-many' },
      { id: 'hs3-10', label: '3 dobókockával egyszerre dobunk (összes kimenetel)', category: 'cat-many' },
      { id: 'hs3-11', label: 'Háromjegyű pozitív egész számok darabszáma', category: 'cat-many' },
      { id: 'hs3-12', label: '3-jegyű számok {1,2,3,4,5} jegyekből ismétléssel', category: 'cat-many' }
    ]
  }
};

export const HowManyWaysSorter: React.FC<HowManyWaysSorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId,
  topicTitle
}) => {
  return (
    <SorterTemplate
      level={level}
      title="Hányféleképpen lehet? – Csoportosító Játék"
      subtitle="Válogasd szét a kombinatorikai feladatokat, szabályokat és kódképzési elveket a megfelelő kategóriákba!"
      badge="9. Osztály • I. Kombinatorika, halmazok"
      topicTitle={topicTitle || 'Hányféleképpen lehet?'}
      themeColor="blue"
      grade={9}
      chapterId="kombinatorika-halmazok"
      topicId={topicId || 'g9-komb-hanyfelekeppen-sorter'}
      levelsConfig={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
    />
  );
};

export default HowManyWaysSorter;

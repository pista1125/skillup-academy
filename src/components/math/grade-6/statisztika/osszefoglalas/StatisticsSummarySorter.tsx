import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface StatisticsSummarySorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onBack?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: '1. Szint: A Statisztikai Folyamat Lépései',
    subtitle: 'Csoportosítsd a tevékenységeket aszerint, hogy a statisztikai vizsgálat melyik fázisához tartoznak!',
    categories: [
      {
        id: 'cat-collect',
        name: '1. Adatgyűjtés és Rendszerezés',
        description: 'Mérések, kérdőívek, táblázatok és halmazábrák készítése',
        badgeColor: 'bg-sky-100 text-sky-800 border-sky-300'
      },
      {
        id: 'cat-visualize',
        name: '2. Grafikus Ábrázolás',
        description: 'Diagramok, grafikonok és arányos körcikkek rajzolása',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
      },
      {
        id: 'cat-calculate',
        name: '3. Számítás és Következtetés',
        description: 'Középértékek, szóródás számítása és döntéshozatal',
        badgeColor: 'bg-teal-100 text-teal-800 border-teal-300'
      }
    ],
    items: [
      { id: 's1-1', label: 'Kérdőíves felmérés készítése a kedvenc ételekről', category: 'cat-collect' },
      { id: 's1-2', label: 'Gyakorisági táblázat készítése a kapott válaszokból', category: 'cat-collect' },
      { id: 's1-3', label: 'Venn-diagram felrajzolása a szakköri választásokról', category: 'cat-collect' },
      { id: 's1-4', label: 'Kördiagram szerkesztése szögmérővel (1% = 3,6°)', category: 'cat-visualize' },
      { id: 's1-5', label: 'Vonalgrafikon rajzolása a heti napi hőmérsékletről', category: 'cat-visualize' },
      { id: 's1-6', label: 'Oszlopdiagram készítése 0-tól induló egyenletes tengellyel', category: 'cat-visualize' },
      { id: 's1-7', label: 'Az osztály matematika dolgozatátlagának kiszámítása', category: 'cat-calculate' },
      { id: 's1-8', label: 'A medián megkeresése a nagyság szerint rendezett mintából', category: 'cat-calculate' }
    ]
  },
  2: {
    title: '2. Szint: Melyik Diagramtípust Válasszuk?',
    subtitle: 'Döntsd el a valós helyzetek alapján, hogy melyik diagram a legtökéletesebb választás!',
    categories: [
      {
        id: 'cat-bar',
        name: 'Oszlop- vagy Sávdiagram',
        description: 'Diszkrét kategóriák mennyiségeinek összehasonlítása',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
      },
      {
        id: 'cat-line',
        name: 'Vonalgrafikon',
        description: 'Időbeli folytonos folyamatok, változások és trendek',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-pie',
        name: 'Kördiagram',
        description: 'Egyetlen teljes egész (100%) arányos részeinek bemutatása',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
      }
    ],
    items: [
      { id: 's2-1', label: 'Egy iskola éves költségvetésének százalékos megoszlása', category: 'cat-pie' },
      { id: 's2-2', label: 'A Duna vízállásának óránkénti emelkedése és apadása áradáskor', category: 'cat-line' },
      { id: 's2-3', label: 'Négy párhuzamos osztály tanulói létszámának összevetése', category: 'cat-bar' },
      { id: 's2-4', label: 'Egy futó sebességének alakulása a maratoni táv kilométerei alatt', category: 'cat-line' },
      { id: 's2-5', label: 'A Föld szárazföldjei és óceánjai aránya a teljes felszínhez képest', category: 'cat-pie' },
      { id: 's2-6', label: 'Egy könyvtárban található könyvek műfajonkénti darabszáma', category: 'cat-bar' },
      { id: 's2-7', label: 'Egy beteg testhőmérsékletének 3 napos óránkénti lázgörbéje', category: 'cat-line' },
      { id: 's2-8', label: 'Egy felmérésben az Igen, Nem és Tartózkodom válaszok aránya', category: 'cat-pie' }
    ]
  },
  3: {
    title: '3. Szint: Átfogó Igaz vagy Hamis Állítások',
    subtitle: 'Csoportosítsd az állításokat a matematikai igazságtartalmuk alapján!',
    categories: [
      {
        id: 'cat-true',
        name: 'Igaz Állítások',
        description: 'A statisztika szigorú törvényszerűségei és helyes szabályai',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-false',
        name: 'Hamis Állítások',
        description: 'Gyakori tévhitek, hibák és manipulációs csapdák',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
      }
    ],
    items: [
      { id: 's3-1', label: 'A kördiagram középponti szögeinek összege bármely mintában pontosan 360°', category: 'cat-true' },
      { id: 's3-2', label: 'A medián megkeresése előtt az adatokat kötelező nagyság szerint növekvő sorrendbe rendezni', category: 'cat-true' },
      { id: 's3-3', label: 'A relatív gyakoriságok összege a teljes adathalmazban mindig pontosan 1,0 (100%)', category: 'cat-true' },
      { id: 's3-4', label: 'Az átlag értéke minden esetben megegyezik az adathalmaz valamelyik eredeti számával', category: 'cat-false' },
      { id: 's3-5', label: 'A csonkított (nem 0-ról induló) függőleges tengely optikailag felnagyítja a különbségeket', category: 'cat-true' },
      { id: 's3-6', label: 'Egy adathalmaz terjedelme lehet negatív szám is, ha minden adat negatív előjelű', category: 'cat-false' },
      { id: 's3-7', label: 'A medián sokkal ellenállóbb a kiugró extrém adatokkal szemben, mint a számtani közép', category: 'cat-true' },
      { id: 's3-8', label: 'Különálló minőségi kategóriák (pl. kutya és macska) értékeit folytonos vonallal kell összekötni', category: 'cat-false' }
    ]
  }
};

export const StatisticsSummarySorter: React.FC<StatisticsSummarySorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onBack,
  topicId = 'g6-stat-summary-sorter',
  topicTitle = 'Statisztika összefoglaló csoportosító'
}) => {
  const activeLevel = currentLevel || level;

  return (
    <SorterTemplate
      topicId={topicId}
      topicTitle={topicTitle}
      level={activeLevel}
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onBack={onBack}
    />
  );
};

export default StatisticsSummarySorter;

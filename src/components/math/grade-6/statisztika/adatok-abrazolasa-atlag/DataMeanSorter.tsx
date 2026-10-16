import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface DataMeanSorterProps {
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
    title: '1. Szint: Statisztikai Mutatók Típusai',
    subtitle: 'Válogasd szét a mutatókat aszerint, hogy a minta közepét jellemzik, vagy a gyakoriságot és szóródást!',
    categories: [
      {
        id: 'cat-central',
        name: 'Középértékek (Tipikus érték)',
        description: 'Megmutatják, hol helyezkedik el az adathalmaz közepe vagy csúcsa',
        badgeColor: 'bg-teal-100 text-teal-800 border-teal-300'
      },
      {
        id: 'cat-spread-freq',
        name: 'Gyakorisági és szóródási mutatók',
        description: 'Megmutatják az előfordulások számát és az adatok szélességét/távolságát',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
      }
    ],
    items: [
      { id: 's1-1', label: 'Számtani közép (Átlag, x̄)', category: 'cat-central' },
      { id: 's1-2', label: 'Medián (Me: rendezett középső érték)', category: 'cat-central' },
      { id: 's1-3', label: 'Módusz (Mo: leggyakoribb adat)', category: 'cat-central' },
      { id: 's1-4', label: 'Terjedelem (R = Max - Min)', category: 'cat-spread-freq' },
      { id: 's1-5', label: 'Gyakoriság (k: hányszor fordul elő)', category: 'cat-spread-freq' },
      { id: 's1-6', label: 'Relatív gyakoriság (k / n tört vagy %)', category: 'cat-spread-freq' },
      { id: 's1-7', label: 'Számegyenes súlypontja (kiegyenlítés)', category: 'cat-central' },
      { id: 's1-8', label: 'Szóródási sáv (szélső értékek távolsága)', category: 'cat-spread-freq' }
    ]
  },
  2: {
    title: '2. Szint: Melyik mutatót alkalmazzuk a legjobban?',
    subtitle: 'Döntsd el a valós szituációk alapján, hogy melyik statisztikai mutató a legmegfelelőbb!',
    categories: [
      {
        id: 'cat-mean-best',
        name: 'Átlag használata a legjobb',
        description: 'Szimmetrikus, egyenletesen eloszló adatoknál, ahol nincsenek kiugró értékek',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
      },
      {
        id: 'cat-median-best',
        name: 'Medián használata a legjobb',
        description: 'Aszimmetrikus mintáknál, ahol kirívó extrém értékek torzítanák az átlagot',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-mode-best',
        name: 'Módusz használata a legjobb',
        description: 'A legnépszerűbb kategória vagy nem számszerű tulajdonság kiválasztásakor',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      }
    ],
    items: [
      { id: 's2-1', label: 'Dolgozatok osztályátlaga egyenletes jegyeknél', category: 'cat-mean-best' },
      { id: 's2-2', label: 'Fizetések egy cégnél, ahol az igazgató 50-szer többet keres', category: 'cat-median-best' },
      { id: 's2-3', label: 'Legnépszerűbb fagylalt íz kiválasztása a büfében', category: 'cat-mode-best' },
      { id: 's2-4', label: 'Napi középhőmérsékletek egy csendes májusi héten', category: 'cat-mean-best' },
      { id: 's2-5', label: 'Ingatlanárak egy faluban, ahová épült egy 2 milliárdos luxusvilla', category: 'cat-median-best' },
      { id: 's2-6', label: 'Cipőbolt leggyakrabban vásárolt cipőmérete (pl. 38-as)', category: 'cat-mode-best' },
      { id: 's2-7', label: 'Futóverseny ideje, ahol egy futó megbotlott és elesett', category: 'cat-median-best' },
      { id: 's2-8', label: 'Egy 20 fős diákcsoport átlagos testmagassága', category: 'cat-mean-best' }
    ]
  },
  3: {
    title: '3. Szint: Igaz vagy Hamis Állítások',
    subtitle: 'Csoportosítsd az állításokat a matematikai igazságtartalmuk szerint!',
    categories: [
      {
        id: 'cat-true',
        name: 'Igaz Állítások',
        description: 'Matematikailag helyes szabályok és összefüggések',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-false',
        name: 'Hamis Állítások',
        description: 'Tévhitek és helytelen állítások',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
      }
    ],
    items: [
      { id: 's3-1', label: 'A medián kiszámítása előtt kötelező nagyság szerint növekvő sorrendbe állítani az adatokat', category: 'cat-true' },
      { id: 's3-2', label: 'A relatív gyakoriságok összege a teljes mintában mindig pontosan 1,0 (vagy 100%)', category: 'cat-true' },
      { id: 's3-3', label: 'Az átlag értéke kötelezően megegyezik a mintában szereplő valamelyik eredeti számmal', category: 'cat-false' },
      { id: 's3-4', label: 'Egy adathalmaznak lehet kettő vagy több módusza is (bimodális minta)', category: 'cat-true' },
      { id: 's3-5', label: 'A terjedelem értéke lehet negatív szám is, ha a számok negatívak', category: 'cat-false' },
      { id: 's3-6', label: 'Ha minden adathoz hozzáadunk 10-et, a terjedelem nem változik', category: 'cat-true' },
      { id: 's3-7', label: 'Páros elemszám esetén a medián mindig a legkisebb számmal egyenlő', category: 'cat-false' },
      { id: 's3-8', label: 'Az átlagtól vett előjeles eltérések összege bármely adathalmazban pontosan 0', category: 'cat-true' }
    ]
  }
};

export const DataMeanSorter: React.FC<DataMeanSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onBack,
  topicId = 'g6-data-mean-sorter',
  topicTitle = 'Adatok ábrázolása, átlag csoportosító'
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

export default DataMeanSorter;

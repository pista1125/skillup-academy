import React from 'react';
import { SorterTemplate, SorterCategory, SorterItem } from '../SorterTemplate';

interface ExperimentSimulationSorterProps {
  onBack?: () => void;
  onNextLevel?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToTheory?: () => void;
  topicId?: string;
}

// Level 1: A kísérleti folyamat lépései
const LEVEL_1_CATEGORIES: SorterCategory[] = [
  { id: 'guess', title: '1. Tippelj (Elméleti modell)', color: 'orange' },
  { id: 'experiment', title: '2. Kísérletezz (Adatgyűjtés)', color: 'amber' },
  { id: 'verify', title: '3. Ellenőrizz (Összehasonlítás)', color: 'emerald' },
];

const LEVEL_1_ITEMS: SorterItem[] = [
  { id: 'exp-s1-1', text: 'Az elméleti valószínűség kiszámítása: P = k / n', correctCategoryId: 'guess' },
  { id: 'exp-s1-2', text: 'Egy pénzérme feldobása 100 alkalommal egymás után', correctCategoryId: 'experiment' },
  { id: 'exp-s1-3', text: 'A tapasztalati relatív gyakoriság kiszámítása: g = k / N', correctCategoryId: 'verify' },
  { id: 'exp-s1-4', text: 'Az összes lehetséges kimenetel feltérképezése a szabályos eszköz alapján', correctCategoryId: 'guess' },
  { id: 'exp-s1-5', text: 'A dobási eredmények strigulázása gyakorisági táblázatba', correctCategoryId: 'experiment' },
  { id: 'exp-s1-6', text: 'Az eltérés (|g - P|) kiszámítása és hibaelemzés', correctCategoryId: 'verify' },
  { id: 'exp-s1-7', text: 'Hipotézis felállítása: P(páros) = 50%', correctCategoryId: 'guess' },
  { id: 'exp-s1-8', text: 'Számítógépes véletlenszám-generálás futtatása 500-szor', correctCategoryId: 'experiment' },
  { id: 'exp-s1-9', text: 'Annak megállapítása, hogy a relatív gyakoriság megközelítette-e az elméletet', correctCategoryId: 'verify' },
];

// Level 2: A minta mérete és a véletlen kilengés
const LEVEL_2_CATEGORIES: SorterCategory[] = [
  { id: 'small', title: 'Kis minta (N ≤ 20) - Nagy ingadozás', color: 'rose' },
  { id: 'medium', title: 'Közepes minta (20 < N ≤ 100)', color: 'amber' },
  { id: 'large', title: 'Nagy minta (N ≥ 500) - Stabil becslés', color: 'emerald' },
];

const LEVEL_2_ITEMS: SorterItem[] = [
  { id: 'exp-s2-1', text: '10 érmedobásból 8 fej (g = 80%, nagy véletlen kilengés)', correctCategoryId: 'small' },
  { id: 'exp-s2-2', text: 'Egy tanuló egymaga 6-szor dob dobókockával', correctCategoryId: 'small' },
  { id: 'exp-s2-3', text: '1000 dobásból 498 fej (g = 49,8%, szinte hajszálpontos)', correctCategoryId: 'large' },
  { id: 'exp-s2-4', text: 'Egy 30 fős osztály minden tanulója dob kétszer (N = 60)', correctCategoryId: 'medium' },
  { id: 'exp-s2-5', text: 'Számítógépes szimuláció 10 000 véletlen próbával', correctCategoryId: 'large' },
  { id: 'exp-s2-6', text: '50 rajzszög-dobás alapján készített előzetes becslés', correctCategoryId: 'medium' },
  { id: 'exp-s2-7', text: '5 pénzfeldobásból 1 fej (g = 20%)', correctCategoryId: 'small' },
  { id: 'exp-s2-8', text: '1200 kockadobásból 199 hatos (g = 16,6%)', correctCategoryId: 'large' },
  { id: 'exp-s2-9', text: '80 dobásból kapott relatív gyakoriság', correctCategoryId: 'medium' },
];

// Level 3: Szimmetrikus vs. Aszimmetrikus eszközök
const LEVEL_3_CATEGORIES: SorterCategory[] = [
  { id: 'sym', title: 'Szimmetrikus (Klasszikus P = k/n érvényes)', color: 'sky' },
  { id: 'asym', title: 'Aszimmetrikus (Csak kísérleti méréssel becsülhető)', color: 'orange' },
];

const LEVEL_3_ITEMS: SorterItem[] = [
  { id: 'exp-s3-1', text: 'Szabályos hatoldalú dobókocka', correctCategoryId: 'sym' },
  { id: 'exp-s3-2', text: 'Földre ejtett rajzszög (hegye fel vagy le)', correctCategoryId: 'asym' },
  { id: 'exp-s3-3', text: 'Szabályos pénzérme (Fej vagy Írás)', correctCategoryId: 'sym' },
  { id: 'exp-s3-4', text: 'Feldobott műanyag flakon (talpára vagy oldalára esik)', correctCategoryId: 'asym' },
  { id: 'exp-s3-5', text: 'Egyforma méretű golyók egy urnában', correctCategoryId: 'sym' },
  { id: 'exp-s3-6', text: 'Gyufásdoboz dobása (lapjára, élére vagy végére érkezik)', correctCategoryId: 'asym' },
  { id: 'exp-s3-7', text: 'Alaposan megkevert 32 lapos magyar kártyacsomag', correctCategoryId: 'sym' },
  { id: 'exp-s3-8', text: 'Megjelölt, cinkelt (súlyozott) dobókocka', correctCategoryId: 'asym' },
  { id: 'exp-s3-9', text: 'Szabályos 12 oldalú dobótest (dodekaéder)', correctCategoryId: 'sym' },
];

export const ExperimentSimulationSorter: React.FC<ExperimentSimulationSorterProps> = ({
  onBack,
  onNextLevel,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onSwitchToTheory,
  topicId = 'g7-stats-exp',
}) => {
  return (
    <SorterTemplate
      title="Kísérleti Statisztika Csoportosító"
      subtitle="Csoportosítsd a kísérleti folyamat fázisait, a minta méreteit és az eszközök szimmetriáját!"
      topicTitle="7. Tippelj, kísérletezz, ellenőrizz!"
      badge="CSOPORTOSÍTÓ JÁTÉK • 7. OSZTÁLY"
      themeColor="orange"
      topicId={topicId}
      grade={7}
      chapterId="hozzarendelesek-statisztika"
      onBack={onBack}
      onNextLevel={onNextLevel}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToTheory={onSwitchToTheory}
      levelsConfig={{
        1: {
          title: '1. szint: Tippelj, Kísérletezz vagy Ellenőrizz?',
          description: 'Húzd a tevékenységeket a 3 lépéses módszertan megfelelő lépéséhez!',
          categories: LEVEL_1_CATEGORIES,
          items: LEVEL_1_ITEMS,
        },
        2: {
          title: '2. szint: A minta mérete és megbízhatósága',
          description: 'Döntsd el a kísérlet darabszáma alapján: Kis minta, Közepes minta vagy Nagy minta!',
          categories: LEVEL_2_CATEGORIES,
          items: LEVEL_2_ITEMS,
        },
        3: {
          title: '3. szint: Szimmetrikus vagy Aszimmetrikus eszköz?',
          description: 'Válaszd ki, hogy az adott eszközre működik-e a klasszikus P = k/n képlet, vagy csak méréssel határozható meg!',
          categories: LEVEL_3_CATEGORIES,
          items: LEVEL_3_ITEMS,
        },
      }}
    />
  );
};

export default ExperimentSimulationSorter;

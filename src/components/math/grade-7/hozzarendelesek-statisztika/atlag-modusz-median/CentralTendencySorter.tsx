import React from 'react';
import { SorterTemplate, SorterCategory, SorterItem } from '../SorterTemplate';

interface CentralTendencySorterProps {
  onBack?: () => void;
  onNextLevel?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToTheory?: () => void;
  topicId?: string;
}

// Level 1 Categories & Items
const LEVEL_1_CATEGORIES: SorterCategory[] = [
  { id: 'mean', title: 'Átlag (Számtani közép)', color: 'emerald' },
  { id: 'mode', title: 'Módusz', color: 'sky' },
  { id: 'median', title: 'Medián', color: 'indigo' },
];

const LEVEL_1_ITEMS: SorterItem[] = [
  { id: 'ct-s1-1', text: 'Összeadni minden értéket és osztani az elemszámmal', correctCategoryId: 'mean' },
  { id: 'ct-s1-2', text: 'A legtöbbször előforduló, legnagyobb gyakoriságú érték', correctCategoryId: 'mode' },
  { id: 'ct-s1-3', text: 'Meghatározása előtt elengedhetetlen a növekvő sorba rendezés', correctCategoryId: 'median' },
  { id: 'ct-s1-4', text: 'Nem-számszerű adatokra is megadható (pl. kedvenc szín)', correctCategoryId: 'mode' },
  { id: 'ct-s1-5', text: 'Páros elemszám esetén a két középső érték számtani közepe', correctCategoryId: 'median' },
  { id: 'ct-s1-6', text: 'Egyetlen kiugróan nagy érték erősen megemeli az értékét', correctCategoryId: 'mean' },
  { id: 'ct-s1-7', text: 'Páratlan elemszámú rendezett minta pontosan középső tagja', correctCategoryId: 'median' },
  { id: 'ct-s1-8', text: 'Ha minden szám egyszer fordul elő, nincs kitüntetett értéke', correctCategoryId: 'mode' },
  { id: 'ct-s1-9', text: 'Osztályzatok összege osztva a tanulók számával', correctCategoryId: 'mean' },
];

// Level 2 Categories & Items
const LEVEL_2_CATEGORIES: SorterCategory[] = [
  { id: 'odd', title: 'Páratlan minta (Egyetlen középső adat)', color: 'teal' },
  { id: 'even', title: 'Páros minta (Két középső adat átlaga)', color: 'purple' },
];

const LEVEL_2_ITEMS: SorterItem[] = [
  { id: 'ct-s2-1', text: '5 fős csoport magassága', correctCategoryId: 'odd' },
  { id: 'ct-s2-2', text: 'A hét 7 napjának napi középhőmérséklete', correctCategoryId: 'odd' },
  { id: 'ct-s2-3', text: 'Egy labdarúgócsapat 11 kezdőjátékosának életkora', correctCategoryId: 'odd' },
  { id: 'ct-s2-4', text: '30 fős osztály dolgozatjegyei', correctCategoryId: 'even' },
  { id: 'ct-s2-5', text: '12 hónap átlagos havi csapadékmennyisége', correctCategoryId: 'even' },
  { id: 'ct-s2-6', text: 'Egy év 4 évszakának átlaghőmérséklete', correctCategoryId: 'even' },
  { id: 'ct-s2-7', text: '24 fős futócsapat célba érkezési ideje', correctCategoryId: 'even' },
  { id: 'ct-s2-8', text: '9 nap alatt elolvasott regény oldalszámai', correctCategoryId: 'odd' },
  { id: 'ct-s2-9', text: 'Egy sakkverseny 8 fordulójának pontszámai', correctCategoryId: 'even' },
];

// Level 3 Categories & Items
const LEVEL_3_CATEGORIES: SorterCategory[] = [
  { id: 'location', title: 'Középérték (Helyzetmutató)', color: 'emerald' },
  { id: 'dispersion', title: 'Szóródási mutató (Terjedelem)', color: 'amber' },
];

const LEVEL_3_ITEMS: SorterItem[] = [
  { id: 'ct-s3-1', text: 'Számtani közép (átlag)', correctCategoryId: 'location' },
  { id: 'ct-s3-2', text: 'Legnagyobb és legkisebb adat különbsége (Max - Min)', correctCategoryId: 'dispersion' },
  { id: 'ct-s3-3', text: 'Módusz (leggyakoribb érték)', correctCategoryId: 'location' },
  { id: 'ct-s3-4', text: 'Napi hőingás (legmelegebb mínusz leghidegebb hőfok)', correctCategoryId: 'dispersion' },
  { id: 'ct-s3-5', text: 'Medián (középső érték)', correctCategoryId: 'location' },
  { id: 'ct-s3-6', text: 'Árkülönbség a legdrágább és legolcsóbb termék között', correctCategoryId: 'dispersion' },
  { id: 'ct-s3-7', text: 'Futóverseny győztese és utolsója közötti időkülönbség', correctCategoryId: 'dispersion' },
  { id: 'ct-s3-8', text: 'Súlyozott számtani közép', correctCategoryId: 'location' },
  { id: 'ct-s3-9', text: 'Legmagasabb és legalacsonyabb diák magasságkülönbsége', correctCategoryId: 'dispersion' },
];

export const CentralTendencySorter: React.FC<CentralTendencySorterProps> = ({
  onBack,
  onNextLevel,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onSwitchToTheory,
  topicId = 'g7-stats-central',
}) => {
  return (
    <SorterTemplate
      title="Átlag, Módusz, Medián Csoportosító"
      subtitle="Csoportosítsd a mutatók tulajdonságait, a mintatípusokat és a statisztikai kategóriákat!"
      topicTitle="4. Átlag, módusz, medián"
      badge="CSOPORTOSÍTÓ JÁTÉK • 7. OSZTÁLY"
      themeColor="emerald"
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
          title: '1. szint: Melyik mutatóra érvényes az állítás?',
          description: 'Húzd a kártyákat a megfelelő mutatóhoz: Átlag, Módusz vagy Medián!',
          categories: LEVEL_1_CATEGORIES,
          items: LEVEL_1_ITEMS,
        },
        2: {
          title: '2. szint: Páros vs. Páratlan minta mediánja',
          description: 'Döntsd el, hogy egyetlen középső elem adja a mediánt, vagy a két középső számtani közepe!',
          categories: LEVEL_2_CATEGORIES,
          items: LEVEL_2_ITEMS,
        },
        3: {
          title: '3. szint: Helyzetmutató vs. Szóródási mutató',
          description: 'Válaszd szét a középértékeket és a szóródást mérő terjedelmet!',
          categories: LEVEL_3_CATEGORIES,
          items: LEVEL_3_ITEMS,
        },
      }}
    />
  );
};

export default CentralTendencySorter;

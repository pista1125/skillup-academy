import React from 'react';
import { SorterTemplate, SorterCategory, SorterItem } from '../SorterTemplate';

interface FrequencyAnalysisSorterProps {
  onBack?: () => void;
  onNextLevel?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToTheory?: () => void;
  topicId?: string;
}

// Level 1 Categories & Items
const LEVEL_1_CATEGORIES: SorterCategory[] = [
  { id: 'absolute', title: 'Gyakoriság (k - Darabszám)', color: 'teal' },
  { id: 'relative', title: 'Relatív gyakoriság (g - Arány / %)', color: 'sky' },
];

const LEVEL_1_ITEMS: SorterItem[] = [
  { id: 'fa-s1-1', text: '8 tanuló kapott ötöst a dolgozatra', correctCategoryId: 'absolute' },
  { id: 'fa-s1-2', text: 'A tanulók 40%-a kapott négyest', correctCategoryId: 'relative' },
  { id: 'fa-s1-3', text: 'A dobozban 15 piros golyó található', correctCategoryId: 'absolute' },
  { id: 'fa-s1-4', text: 'A dobókockával 12 alkalommal dobtunk hatost', correctCategoryId: 'absolute' },
  { id: 'fa-s1-5', text: 'A golyók 3/8 része piros színű', correctCategoryId: 'relative' },
  { id: 'fa-s1-6', text: 'A mért adatok 0,25 része esik ebbe a sávba', correctCategoryId: 'relative' },
  { id: 'fa-s1-7', text: 'A megkérdezett lakosok 65%-a biciklivel közlekedik', correctCategoryId: 'relative' },
  { id: 'fa-s1-8', text: '26 napon át nem esett eső a hónapban', correctCategoryId: 'absolute' },
  { id: 'fa-s1-9', text: 'A fej dobások aránya g = 0,54', correctCategoryId: 'relative' },
];

// Level 2 Categories & Items
const LEVEL_2_CATEGORIES: SorterCategory[] = [
  { id: 'pie', title: 'Kördiagram (Részek aránya a teljeshez)', color: 'teal' },
  { id: 'bar', title: 'Oszlopdiagram (Összehasonlítás)', color: 'indigo' },
  { id: 'line', title: 'Vonaldiagram (Időbeli változás)', color: 'cyan' },
];

const LEVEL_2_ITEMS: SorterItem[] = [
  { id: 'fa-s2-1', text: 'Egy iskola költségvetésének százalékos megoszlása', correctCategoryId: 'pie' },
  { id: 'fa-s2-2', text: 'A napi hőmérséklet alakulása óránként reggeltől estig', correctCategoryId: 'line' },
  { id: 'fa-s2-3', text: '5 különböző város lakosságszámának összehasonlítása', correctCategoryId: 'bar' },
  { id: 'fa-s2-4', text: 'Egy választás szavazati arányai százalékban', correctCategoryId: 'pie' },
  { id: 'fa-s2-5', text: 'Egy gyorsuló autó sebességének változása másodpercenként', correctCategoryId: 'line' },
  { id: 'fa-s2-6', text: 'Egy bolt havi csokoládéeladásai fajtánként (darabszám)', correctCategoryId: 'bar' },
  { id: 'fa-s2-7', text: 'A levegő gázösszetételének százalékos aránya', correctCategoryId: 'pie' },
  { id: 'fa-s2-8', text: 'A folyó vízállásának napi szintje egy héten át', correctCategoryId: 'line' },
  { id: 'fa-s2-9', text: 'Különböző fafajták darabszáma a védett erdőben', correctCategoryId: 'bar' },
];

// Level 3 Categories & Items
const LEVEL_3_CATEGORIES: SorterCategory[] = [
  { id: 'acute', title: 'Hegyesszög (< 90°)', color: 'emerald' },
  { id: 'right', title: 'Derékszög (= 90°)', color: 'sky' },
  { id: 'obtuse', title: 'Tompaszög vagy nagyobb (> 90°)', color: 'purple' },
];

const LEVEL_3_ITEMS: SorterItem[] = [
  { id: 'fa-s3-1', text: '10%-os részarány (36°)', correctCategoryId: 'acute' },
  { id: 'fa-s3-2', text: '25%-os részarány (90°)', correctCategoryId: 'right' },
  { id: 'fa-s3-3', text: '50%-os részarány (180°)', correctCategoryId: 'obtuse' },
  { id: 'fa-s3-4', text: '20%-os részarány (72°)', correctCategoryId: 'acute' },
  { id: 'fa-s3-5', text: '1/4 részarány a teljes mintából', correctCategoryId: 'right' },
  { id: 'fa-s3-6', text: '40%-os részarány (144°)', correctCategoryId: 'obtuse' },
  { id: 'fa-s3-7', text: '5%-os részarány (18°)', correctCategoryId: 'acute' },
  { id: 'fa-s3-8', text: '30%-os részarány (108°)', correctCategoryId: 'obtuse' },
  { id: 'fa-s3-9', text: '75%-os részarány (270°)', correctCategoryId: 'obtuse' },
];

export const FrequencyAnalysisSorter: React.FC<FrequencyAnalysisSorterProps> = ({
  onBack,
  onNextLevel,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onSwitchToTheory,
  topicId = 'g7-stats-freq',
}) => {
  return (
    <SorterTemplate
      title="Gyakoriság és Diagramok Csoportosító"
      subtitle="Csoportosítsd a gyakorisági adatokat, a diagramtípusokat és a körcikk-szögeket!"
      topicTitle="5. Gyakoriság, relatív gyakoriság"
      badge="CSOPORTOSÍTÓ JÁTÉK • 7. OSZTÁLY"
      themeColor="teal"
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
          title: '1. szint: Gyakoriság vagy Relatív gyakoriság?',
          description: 'Húzd a kártyákat a megfelelő kategóriához: Gyakoriság (db) vagy Relatív gyakoriság (%)!',
          categories: LEVEL_1_CATEGORIES,
          items: LEVEL_1_ITEMS,
        },
        2: {
          title: '2. szint: A legalkalmasabb diagramtípus',
          description: 'Válaszd ki, hogy melyik folyamathoz Kördiagram, Oszlopdiagram vagy Vonaldiagram illik!',
          categories: LEVEL_2_CATEGORIES,
          items: LEVEL_2_ITEMS,
        },
        3: {
          title: '3. szint: Körcikk középponti szögek nagysága',
          description: 'Döntsd el a százalékos részarány alapján, hogy a körcikk Hegyesszög, Derékszög vagy Tompaszög-e!',
          categories: LEVEL_3_CATEGORIES,
          items: LEVEL_3_ITEMS,
        },
      }}
    />
  );
};

export default FrequencyAnalysisSorter;

import React from 'react';
import { SorterTemplate, SorterCategory, SorterItem } from '../SorterTemplate';

interface ProbabilitySorterProps {
  onBack?: () => void;
  onNextLevel?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToTheory?: () => void;
  topicId?: string;
}

// Level 1: Eseményfajták
const LEVEL_1_CATEGORIES: SorterCategory[] = [
  { id: 'certain', title: 'Biztos esemény (P = 1 = 100%)', color: 'emerald' },
  { id: 'random', title: 'Véletlen esemény (0 < P < 1)', color: 'amber' },
  { id: 'impossible', title: 'Lehetetlen esemény (P = 0 = 0%)', color: 'rose' },
];

const LEVEL_1_ITEMS: SorterItem[] = [
  { id: 'pr-s1-1', text: 'Szabályos dobókockával 7-nél kisebb számot dobunk', correctCategoryId: 'certain' },
  { id: 'pr-s1-2', text: 'Szabályos dobókockával 8-ast dobunk', correctCategoryId: 'impossible' },
  { id: 'pr-s1-3', text: 'Pénzérmével fejet dobunk', correctCategoryId: 'random' },
  { id: 'pr-s1-4', text: 'Szabályos kockával páros számot dobunk', correctCategoryId: 'random' },
  { id: 'pr-s1-5', text: 'Csak kék golyókat tartalmazó dobozból pirosat húzunk', correctCategoryId: 'impossible' },
  { id: 'pr-s1-6', text: 'Csak kék golyókat tartalmazó dobozból kéket húzunk', correctCategoryId: 'certain' },
  { id: 'pr-s1-7', text: 'A hét egy véletlenül választott napja hétvégére esik', correctCategoryId: 'random' },
  { id: 'pr-s1-8', text: 'Két páros szám összege páratlan lesz', correctCategoryId: 'impossible' },
  { id: 'pr-s1-9', text: 'A jövő héten legalább egy nap 24 órából fog állni', correctCategoryId: 'certain' },
];

// Level 2: Valószínűségi esélyek
const LEVEL_2_CATEGORIES: SorterCategory[] = [
  { id: 'unlikely', title: 'Kevéssé valószínű (P < 0,3)', color: 'rose' },
  { id: 'moderate', title: 'Közepesen esélyes (0,3 ≤ P ≤ 0,6)', color: 'amber' },
  { id: 'likely', title: 'Nagyon valószínű (P > 0,6)', color: 'emerald' },
];

const LEVEL_2_ITEMS: SorterItem[] = [
  { id: 'pr-s2-1', text: 'Hatost dobunk egy kockával (P = 1/6 ≈ 16,7%)', correctCategoryId: 'unlikely' },
  { id: 'pr-s2-2', text: 'Páros számot dobunk kockával (P = 3/6 = 50%)', correctCategoryId: 'moderate' },
  { id: 'pr-s2-3', text: 'NEM hatost dobunk kockával (P = 5/6 ≈ 83,3%)', correctCategoryId: 'likely' },
  { id: 'pr-s2-4', text: 'Két érmével két fejet dobunk (P = 1/4 = 25%)', correctCategoryId: 'unlikely' },
  { id: 'pr-s2-5', text: 'Fejet dobunk egy érmével (P = 1/2 = 50%)', correctCategoryId: 'moderate' },
  { id: 'pr-s2-6', text: '1-nél nagyobb számot dobunk kockával (P = 5/6 ≈ 83,3%)', correctCategoryId: 'likely' },
  { id: 'pr-s2-7', text: '32 lapos pakliból egyetlen Ász húzása (P = 4/32 = 12,5%)', correctCategoryId: 'unlikely' },
  { id: 'pr-s2-8', text: '4-nél nagyobb szám dobása kockával (P = 2/6 ≈ 33,3%)', correctCategoryId: 'moderate' },
  { id: 'pr-s2-9', text: '10 golyóból (8 piros, 2 kék) pirosat húzunk (P = 80%)', correctCategoryId: 'likely' },
];

// Level 3: Kísérleti kontextusok
const LEVEL_3_CATEGORIES: SorterCategory[] = [
  { id: 'dice', title: 'Szabályos dobókocka (n = 6)', color: 'amber' },
  { id: 'coin', title: 'Pénzérme (n = 2)', color: 'sky' },
  { id: 'urn', title: 'Urnából húzás (Golyók)', color: 'purple' },
];

const LEVEL_3_ITEMS: SorterItem[] = [
  { id: 'pr-s3-1', text: 'Prímszám dobása (2, 3, 5 → k = 3)', correctCategoryId: 'dice' },
  { id: 'pr-s3-2', text: 'Írás dobásának valószínűsége 1/2', correctCategoryId: 'coin' },
  { id: 'pr-s3-3', text: '4 piros és 6 kék golyóból piros húzása (4/10)', correctCategoryId: 'urn' },
  { id: 'pr-s3-4', text: '3-mal osztható szám dobása (3 vagy 6 → k = 2)', correctCategoryId: 'dice' },
  { id: 'pr-s3-5', text: 'Három egymást követő dobás mindegyike Fej (1/8)', correctCategoryId: 'coin' },
  { id: 'pr-s3-6', text: 'Visszatevés nélküli mintavétel egy dobozból', correctCategoryId: 'urn' },
  { id: 'pr-s3-7', text: 'Legfeljebb 2-es dobása (1 vagy 2 → k = 2)', correctCategoryId: 'dice' },
  { id: 'pr-s3-8', text: 'Két dobás kimenetele azonos: FF vagy ÍÍ (50%)', correctCategoryId: 'coin' },
  { id: 'pr-s3-9', text: '10 sorszámozott golyóból páros sorszámú húzása', correctCategoryId: 'urn' },
];

export const ProbabilitySorter: React.FC<ProbabilitySorterProps> = ({
  onBack,
  onNextLevel,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onSwitchToTheory,
  topicId = 'g7-stats-prob',
}) => {
  return (
    <SorterTemplate
      title="Valószínűségszámítás Csoportosító"
      subtitle="Csoportosítsd az eseményfajtákat, a valószínűségi esélyeket és a kísérleti helyzeteket!"
      topicTitle="6. Valószínűség"
      badge="CSOPORTOSÍTÓ JÁTÉK • 7. OSZTÁLY"
      themeColor="amber"
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
          title: '1. szint: Biztos, Véletlen vagy Lehetetlen esemény?',
          description: 'Húzd a kártyákat a megfelelő kategóriához aszerint, hogy biztosan bekövetkezik, véletlen vagy lehetetlen!',
          categories: LEVEL_1_CATEGORIES,
          items: LEVEL_1_ITEMS,
        },
        2: {
          title: '2. szint: Valószínűségi esélyek nagysága',
          description: 'Döntsd el a valószínűségi érték alapján: Kevéssé valószínű, Közepesen esélyes vagy Nagyon valószínű!',
          categories: LEVEL_2_CATEGORIES,
          items: LEVEL_2_ITEMS,
        },
        3: {
          title: '3. szint: Kísérleti helyzetek besorolása',
          description: 'Válaszd ki, hogy az adott feladat és esemény Szabályos kockához, Pénzérméhez vagy Urnamodellhez tartozik-e!',
          categories: LEVEL_3_CATEGORIES,
          items: LEVEL_3_ITEMS,
        },
      }}
    />
  );
};

export default ProbabilitySorter;

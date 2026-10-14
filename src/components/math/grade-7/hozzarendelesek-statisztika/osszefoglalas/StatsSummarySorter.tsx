import React from 'react';
import { SorterTemplate, SorterCategory, SorterItem } from '../SorterTemplate';

interface StatsSummarySorterProps {
  onBack?: () => void;
  onNextLevel?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToTheory?: () => void;
  topicId?: string;
}

// Level 1: A fejezet 3 fő pillére
const LEVEL_1_CATEGORIES: SorterCategory[] = [
  { id: 'functions', title: '1. Hozzárendelések & Függvények', color: 'indigo' },
  { id: 'stats', title: '2. Statisztika & Mutatók', color: 'teal' },
  { id: 'probability', title: '3. Valószínűségszámítás', color: 'amber' },
];

const LEVEL_1_ITEMS: SorterItem[] = [
  { id: 'ss-s1-1', text: 'Értelmezési tartomány és értékkészlet', correctCategoryId: 'functions' },
  { id: 'ss-s1-2', text: 'Számtani közép (átlag) kiszámítása', correctCategoryId: 'stats' },
  { id: 'ss-s1-3', text: 'P(A) = kedvező esetek / összes eset', correctCategoryId: 'probability' },
  { id: 'ss-s1-4', text: 'Lineáris függvény képlete: y = 2x + 1', correctCategoryId: 'functions' },
  { id: 'ss-s1-5', text: 'A mintában leggyakoribb adat (módusz)', correctCategoryId: 'stats' },
  { id: 'ss-s1-6', text: 'A nagy számok törvénye (relatív gyakoriság)', correctCategoryId: 'probability' },
  { id: 'ss-s1-7', text: 'Grafikon zérushelye és menete (növekvő/csökkenő)', correctCategoryId: 'functions' },
  { id: 'ss-s1-8', text: 'Kördiagram középponti szögének számítása (α = g · 360°)', correctCategoryId: 'stats' },
  { id: 'ss-s1-9', text: 'Biztos és lehetetlen események valószínűsége', correctCategoryId: 'probability' },
];

// Level 2: Statisztikai mutatók jellege
const LEVEL_2_CATEGORIES: SorterCategory[] = [
  { id: 'central', title: 'Középértékek (Helyzeti mutatók)', color: 'sky' },
  { id: 'spread', title: 'Szóródási mutatók', color: 'rose' },
  { id: 'freq', title: 'Gyakorisági mutatók', color: 'emerald' },
];

const LEVEL_2_ITEMS: SorterItem[] = [
  { id: 'ss-s2-1', text: 'Számtani átlag (x̄ = Σx / n)', correctCategoryId: 'central' },
  { id: 'ss-s2-2', text: 'Terjedelem (R = maximum - minimum)', correctCategoryId: 'spread' },
  { id: 'ss-s2-3', text: 'Abszolút darabszám (gyakoriság, k)', correctCategoryId: 'freq' },
  { id: 'ss-s2-4', text: 'Módusz (leggyakoribb elem, Mo)', correctCategoryId: 'central' },
  { id: 'ss-s2-5', text: 'Legkisebb és legnagyobb adat távolsága a számegyenesen', correctCategoryId: 'spread' },
  { id: 'ss-s2-6', text: 'Relatív gyakoriság (g = k / n, százalékos arány)', correctCategoryId: 'freq' },
  { id: 'ss-s2-7', text: 'Medián (rendezett sorozat középső adata, Me)', correctCategoryId: 'central' },
  { id: 'ss-s2-8', text: 'Adatok ingadozásának szélessége a mintában', correctCategoryId: 'spread' },
  { id: 'ss-s2-9', text: 'Oszlopdiagram oszlopainak magassága', correctCategoryId: 'freq' },
];

// Level 3: Események típusai a valószínűségben
const LEVEL_3_CATEGORIES: SorterCategory[] = [
  { id: 'certain', title: 'Biztos esemény (P = 1 = 100%)', color: 'emerald' },
  { id: 'random', title: 'Véletlen esemény (0 < P < 1)', color: 'amber' },
  { id: 'impossible', title: 'Lehetetlen esemény (P = 0 = 0%)', color: 'rose' },
];

const LEVEL_3_ITEMS: SorterItem[] = [
  { id: 'ss-s3-1', text: 'Szabályos dobókockával 7-nél kisebb pozitív számot dobunk', correctCategoryId: 'certain' },
  { id: 'ss-s3-2', text: 'Szabályos kockával 8-ast dobunk', correctCategoryId: 'impossible' },
  { id: 'ss-s3-3', text: 'Pénzérmével fejet dobunk (P = 50%)', correctCategoryId: 'random' },
  { id: 'ss-s3-4', text: 'Egy adatsor összes relatív gyakoriságának összege pontosan 1', correctCategoryId: 'certain' },
  { id: 'ss-s3-5', text: 'Egy adatsor terjedelme negatív szám lesz', correctCategoryId: 'impossible' },
  { id: 'ss-s3-6', text: 'Két kockával dobva az összeg 7 lesz (P = 6/36)', correctCategoryId: 'random' },
  { id: 'ss-s3-7', text: 'Bármely adatsorban: minimum ≤ átlag ≤ maximum', correctCategoryId: 'certain' },
  { id: 'ss-s3-8', text: 'Egy esemény valószínűsége P = 1,4 (140%)', correctCategoryId: 'impossible' },
  { id: 'ss-s3-9', text: 'Egy dobozból (4 piros, 6 kék) piros golyót húzunk', correctCategoryId: 'random' },
];

export const StatsSummarySorter: React.FC<StatsSummarySorterProps> = ({
  onBack,
  onNextLevel,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onSwitchToTheory,
  topicId = 'g7-stats-summary',
}) => {
  return (
    <SorterTemplate
      title="Összefoglaló Csoportosító"
      subtitle="Rendszerezd a fejezet 3 alappillérének elemeit, a mutatókat és az eseményfajtákat!"
      topicTitle="8. Összefoglalás"
      badge="CSOPORTOSÍTÓ JÁTÉK • 7. OSZTÁLY"
      themeColor="slate"
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
          title: '1. szint: A fejezet 3 alappillére',
          description: 'Húzd a kártyákat a Hozzárendelések, Statisztika vagy Valószínűség kategóriához!',
          categories: LEVEL_1_CATEGORIES,
          items: LEVEL_1_ITEMS,
        },
        2: {
          title: '2. szint: Statisztikai mutatók jellege',
          description: 'Csoportosíts: Középérték (helyzeti mutató), Szóródási mutató vagy Gyakorisági mutató?',
          categories: LEVEL_2_CATEGORIES,
          items: LEVEL_2_ITEMS,
        },
        3: {
          title: '3. szint: Eseményfajták a valószínűségben',
          description: 'Döntsd el a matematikai állításokról: Biztos, Véletlen vagy Lehetetlen esemény!',
          categories: LEVEL_3_CATEGORIES,
          items: LEVEL_3_ITEMS,
        },
      }}
    />
  );
};

export default StatsSummarySorter;

import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PracticeSorterProps {
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
    title: '1. Szint: A Három Alaptípus Azonosítása',
    subtitle: 'Döntsd el a szöveges feladatokról, hogy Százalékértéket, Alapot (100%) vagy Százaléklábat keresünk!',
    categories: [
      {
        id: 'cat-value',
        name: 'Százalékérték (É) keresése',
        description: 'Ismert az Alap és a Százalékláb, a részmennyiség a kérdés (É = A · p/100)',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300'
      },
      {
        id: 'cat-base',
        name: 'Alap (A, a 100%) keresése',
        description: 'Ismert a részérték és a százalékláb, a kiinduló teljes egész a kérdés (A = É / (p/100))',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300'
      },
      {
        id: 'cat-rate',
        name: 'Százalékláb (p%) keresése',
        description: 'Ismert a kiinduló alap és a részérték, az arány vagy változás %-a a kérdés',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300'
      }
    ],
    items: [
      { id: 's1-1', label: '150 g csoki 45%-a hány gramm kakaó?', category: 'cat-value' },
      { id: 's1-2', label: '5600 Ft könyv 5% áfatartalma hány Ft?', category: 'cat-value' },
      { id: 's1-3', label: '700 Ft sajt 25%-os kedvezményének összege', category: 'cat-value' },
      { id: 's1-4', label: '500 kg teve 40%-os súlyvesztesége kg-ban', category: 'cat-value' },
      { id: 's1-5', label: 'Andris 32 jó válasza a dolgozat 80%-a, hány kérdés volt?', category: 'cat-base' },
      { id: 's1-6', label: 'Egy autó ára 20% emelés után 3 000 000 Ft, mennyi volt eredetileg?', category: 'cat-base' },
      { id: 's1-7', label: 'Zita 4 sütivel evett kevesebbet, ami a sütik 10%-a, mennyi süti készült?', category: 'cat-base' },
      { id: 's1-8', label: '635 Ft bruttó árból (27% áfával) mennyi a termék nettó ára?', category: 'cat-base' },
      { id: 's1-9', label: '25 tanulóból 5 lett jeles, a diákok hány százaléka ez?', category: 'cat-rate' },
      { id: 's1-10', label: 'Adorján fotója 68-ról 85 lájka nőtt, hány % a gyarapodás?', category: 'cat-rate' },
      { id: 's1-11', label: '5600 Ft termék 4760 Ft lett, mekkora az árengedmény %-a?', category: 'cat-rate' },
      { id: 's1-12', label: 'A 300 kg-os teve visszahízik 500 kg-ra, hány %-kal kell híznia?', category: 'cat-rate' }
    ]
  },
  2: {
    title: '2. Szint: ÁFA Kulcsok és Árképzési Kategóriák',
    subtitle: 'Sorold be a termékeket és helyzeteket a törvényi ÁFA kulcsok szerint (5%, 18% vagy 27%)!',
    categories: [
      {
        id: 'cat-vat5',
        name: '5%-os kedvezményes ÁFA',
        description: 'Könyvek, tankönyvek, gyógyszerek, alapvető sertés- és baromfihús',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300'
      },
      {
        id: 'cat-vat18',
        name: '18%-os köztes ÁFA',
        description: 'Tej és tejtermékek (pl. tehéntúró, trappista sajt, tejföl)',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300'
      },
      {
        id: 'cat-vat27',
        name: '27%-os általános ÁFA',
        description: 'Édességek, kekszek, elektronikai cikkek, ruházat, háztartási eszközök',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300'
      }
    ],
    items: [
      { id: 's2-1', label: '5880 Ft bruttó árú tankönyv (nettó 5600 Ft)', category: 'cat-vat5' },
      { id: 's2-2', label: 'Gyógyszertári orvosság vásárlása', category: 'cat-vat5' },
      { id: 's2-3', label: 'Friss sertéshús és csirkehús áfája', category: 'cat-vat5' },
      { id: 's2-4', label: 'Nyomtatott napilap vagy heti folyóirat', category: 'cat-vat5' },
      { id: 's2-5', label: 'Tehéntúró 63 Ft-os adótartalma (nettó 350 Ft)', category: 'cat-vat18' },
      { id: 's2-6', label: 'Dobozos pasztőrözött tej vásárlása', category: 'cat-vat18' },
      { id: 's2-7', label: 'Trappista sajt és tejföl áfája', category: 'cat-vat18' },
      { id: 's2-8', label: 'Keményítőtartalmú túródesszert', category: 'cat-vat18' },
      { id: 's2-9', label: '635 Ft bruttó árú csokoládés keksz (nettó 500 Ft)', category: 'cat-vat27' },
      { id: 's2-10', label: 'Okostelefon és laptop fogyasztói ára', category: 'cat-vat27' },
      { id: 's2-11', label: 'Téli dzseki és sportcipő áfája', category: 'cat-vat27' },
      { id: 's2-12', label: 'Palacsintasütő serpenyő vásárlása', category: 'cat-vat27' }
    ]
  },
  3: {
    title: '3. Szint: A Változások Végeredménye az Eredetihez Képest',
    subtitle: 'Hasonlítsd össze az új értéket a kiinduló állapottal: kisebb, egyenlő vagy nagyobb lett?',
    categories: [
      {
        id: 'cat-less',
        name: 'Kisebb lett az eredetinél (< 100%)',
        description: 'Csökkenés, veszteség, árengedmény vagy szorzott leértékelés',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300'
      },
      {
        id: 'cat-equal',
        name: 'Pontosan megegyezik az eredetivel (= 100%)',
        description: 'Visszanyert eredeti állapot vagy teljes egész',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300'
      },
      {
        id: 'cat-greater',
        name: 'Nagyobb lett az eredetinél (> 100%)',
        description: 'Áremelés, kamat, gyarapodás vagy láncolt növekedés',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300'
      }
    ],
    items: [
      { id: 's3-1', label: '10 000 Ft-os ár +20%, majd az új árból -20% (9600 Ft)', category: 'cat-less' },
      { id: 's3-2', label: '500 kg-os teve a sivatagi átkelés végén (300 kg)', category: 'cat-less' },
      { id: 's3-3', label: 'Négyzet területe, ha az oldalát 20%-kal csökkentjük (64%)', category: 'cat-less' },
      { id: 's3-4', label: '5600 Ft-os termék 15%-os engedmény után (4760 Ft)', category: 'cat-less' },
      { id: 's3-5', label: 'A 300 kg-os teve a hízókúra után az induló 500 kg-hoz képest', category: 'cat-equal' },
      { id: 's3-6', label: 'Egy termék ára változatlan maradt', category: 'cat-equal' },
      { id: 's3-7', label: '25 fős osztály összes tagja megírta a dolgozatot (25 fő)', category: 'cat-equal' },
      { id: 's3-8', label: 'Az eredeti nettó ár a 27% ÁFA hozzáadása majd visszaszámolása után', category: 'cat-equal' },
      { id: 's3-9', label: 'Palacsintázó 2 egymást követő 10%-os emelése (+21%)', category: 'cat-greater' },
      { id: 's3-10', label: 'Adorján 68 lájkja utáni 85 lájk a fotóra (+25%)', category: 'cat-greater' },
      { id: 's3-11', label: '300 kg teve visszahízási %-a (66,7%) a 40%-os fogyáshoz képest', category: 'cat-greater' },
      { id: 's3-12', label: '5600 Ft könyvre 5% ÁFA rárakása (5880 Ft)', category: 'cat-greater' }
    ]
  }
};

export const PracticeSorter: React.FC<PracticeSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g7-pct-practice-sorter',
  topicTitle = 'A százalékszámítás gyakorlása'
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
      themeColor="amber"
      title="A százalékszámítás gyakorlása - Csoportosító Játék"
      badge="CSOPORTOSÍTÓ"
    />
  );
};

export default PracticeSorter;

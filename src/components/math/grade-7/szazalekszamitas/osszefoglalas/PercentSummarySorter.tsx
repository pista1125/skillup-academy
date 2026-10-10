import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PercentSummarySorterProps {
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
    title: '1. Szint: A Százalékszámítás Három Alapesete',
    subtitle: 'Sorold be a kérdéseket aszerint, hogy a Százalékértéket (É), az Alapot (A) vagy a Százaléklábat (p%) keresik!',
    categories: [
      {
        id: 'cat-value',
        name: 'Százalékérték (É)',
        description: 'A megadott százalékhoz tartozó tényleges érték (É = A · p/100)',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300'
      },
      {
        id: 'cat-base',
        name: 'Százalékalap (A)',
        description: 'A teljes 100% egész mennyiség visszaszámolása (A = É / q)',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300'
      },
      {
        id: 'cat-rate',
        name: 'Százalékláb (p%)',
        description: 'A két mennyiség arányának százaléka (p% = É / A · 100%)',
        badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300 dark:bg-cyan-950/60 dark:text-cyan-300'
      }
    ],
    items: [
      { id: 's1-1', label: 'Mennyi 50 000 Ft 27%-os ÁFA tartalma?', category: 'cat-value' },
      { id: 's1-2', label: 'Hány kg cukor van 40 kg 15%-os szörpben?', category: 'cat-value' },
      { id: 's1-3', label: 'Mennyi a 20%-os kedvezmény összege egy 12 000 Ft-os cipőnél?', category: 'cat-value' },
      { id: 's1-4', label: 'Mennyi kamatot kapunk évi 8%-ra 200 000 Ft után?', category: 'cat-value' },
      { id: 's1-5', label: 'Ha 4500 Ft a könyv árának 30%-a, mennyi a könyv teljes ára?', category: 'cat-base' },
      { id: 's1-6', label: 'Egy kabát 20%-os akció után 16 000 Ft, mennyi volt eredetileg?', category: 'cat-base' },
      { id: 's1-7', label: '2,4M Ft előleg a lakás árának 15%-a, mekkora a lakás vételára?', category: 'cat-base' },
      { id: 's1-8', label: 'A dolgozat 18 pontja a maximális pontszám 60%-a, hány pontos a dolgozat?', category: 'cat-base' },
      { id: 's1-9', label: 'Az osztály 30 diákjából 18 fiú, hány százalék a fiúk aránya?', category: 'cat-rate' },
      { id: 's1-10', label: 'A 8000 Ft-os nadrág árát 1200 Ft-tal emelték, hány % az áremelés?', category: 'cat-rate' },
      { id: 's1-11', label: '25 g só van 250 g oldatban, hány tömegszázalékos az oldat?', category: 'cat-rate' },
      { id: 's1-12', label: 'Egy 50 fős csoportból 15-en beszélnek németül, ez hány százalék?', category: 'cat-rate' }
    ]
  },
  2: {
    title: '2. Szint: Egylépéses Szorzótényezők Értéke',
    subtitle: 'Csoportosítsd a szorzótényezőket a változás iránya és mértéke alapján!',
    categories: [
      {
        id: 'cat-increase',
        name: 'Növekedés (q > 1)',
        description: 'Áremelés, kamat, felár, ÁFA felszámolása',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300'
      },
      {
        id: 'cat-decrease',
        name: 'Csökkenés (0 < q < 1)',
        description: 'Leértékelés, selejt, kedvezmény, súlyveszteség',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300'
      },
      {
        id: 'cat-neutral',
        name: 'Változatlan (q = 1)',
        description: 'A kiinduló 100%-os egész megmaradása',
        badgeColor: 'bg-slate-100 text-slate-900 border-slate-300 dark:bg-slate-950/60 dark:text-slate-300'
      }
    ],
    items: [
      { id: 's2-1', label: '+15%-os áremelés: · 1,15', category: 'cat-increase' },
      { id: 's2-2', label: '27% ÁFA hozzáadása: · 1,27', category: 'cat-increase' },
      { id: 's2-3', label: 'Duplázódás (+100%): · 2,00', category: 'cat-increase' },
      { id: 's2-4', label: '+8% kamatjóváírás: · 1,08', category: 'cat-increase' },
      { id: 's2-5', label: '-20%-os leértékelés: · 0,80', category: 'cat-decrease' },
      { id: 's2-6', label: '-35%-os akció: · 0,65', category: 'cat-decrease' },
      { id: 's2-7', label: 'Feleződés (-50%): · 0,50', category: 'cat-decrease' },
      { id: 's2-8', label: '+20% majd -20%: 1,20 · 0,80 = 0,96', category: 'cat-decrease' },
      { id: 's2-9', label: '+10% majd -10%: 1,10 · 0,90 = 0,99', category: 'cat-decrease' },
      { id: 's2-10', label: 'Pontosan az eredeti ár megfizetése: · 1,00', category: 'cat-neutral' },
      { id: 's2-11', label: '+25% majd -20%: 1,25 · 0,80 = 1,00', category: 'cat-neutral' },
      { id: 's2-12', label: '-50% majd +100%: 0,50 · 2,00 = 1,00', category: 'cat-neutral' }
    ]
  },
  3: {
    title: '3. Szint: Gazdasági és Mindennapi Szöveges Feladatok',
    subtitle: 'Különítsd el a feladatokat gazdasági, keverési és arányos osztási típusuk szerint!',
    categories: [
      {
        id: 'cat-fin',
        name: 'Pénzügy és Kereskedelem',
        description: 'ÁFA, bruttó/nettó, kamat, árrés, előleg és törlesztő',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300'
      },
      {
        id: 'cat-mix',
        name: 'Keverékek és Oldatok',
        description: 'Tömegszázalék, hígítás vízzel, bepárlás, összeöntés',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300'
      },
      {
        id: 'cat-ratio',
        name: 'Arányos Osztás és Statisztika',
        description: 'Összeg felosztása adott arányban, kördiagram, részesedés',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300'
      }
    ],
    items: [
      { id: 's3-1', label: 'Bruttó 63 500 Ft-os mosógép nettó ára 27% ÁFA mellett', category: 'cat-fin' },
      { id: 's3-2', label: '16M Ft-os lakásra 2,4M Ft előleg és 4,8M Ft bankhitel', category: 'cat-fin' },
      { id: 's3-3', label: '60 000 Ft tartozás 15% kamattal félévre', category: 'cat-fin' },
      { id: 's3-4', label: 'Egy részvény ára előbb 15%-kal emelkedik, majd 10%-kal esik', category: 'cat-fin' },
      { id: 's3-5', label: '300 g 20%-os sós vízhez 100 g tiszta víz hozzáadása', category: 'cat-mix' },
      { id: 's3-6', label: '200 g 15%-os és 300 g 25%-os cukorszirup összeöntése', category: 'cat-mix' },
      { id: 's3-7', label: 'Hány gramm víz kell 50 g sóhoz 10%-os oldat készítéséhez?', category: 'cat-mix' },
      { id: 's3-8', label: '500 g 12%-os ecetből 100 g víz elpárologtatása', category: 'cat-mix' },
      { id: 's3-9', label: '100 000 Ft felosztása 2 : 3 arányban két nyertes között', category: 'cat-ratio' },
      { id: 's3-10', label: 'Háromszög belső szögeinek aránya 2 : 3 : 4', category: 'cat-ratio' },
      { id: 's3-11', label: 'Kördiagram szektorainak szögei a százalékos részesedés alapján', category: 'cat-ratio' },
      { id: 's3-12', label: 'Bronzötvözet készítése réz és ón 7 : 3 tömegarányában', category: 'cat-ratio' }
    ]
  }
};

export const PercentSummarySorter: React.FC<PercentSummarySorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g7-percentages',
  topicTitle = '8. Összefoglalás'
}) => {
  const activeLevel = currentLevel || level;

  return (
    <SorterTemplate
      levels={sorterLevels}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="rose"
    />
  );
};

export default PercentSummarySorter;

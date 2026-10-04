import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PlottingGraphsSorterProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: '1. Szint: Folytonos vagy Diszkrét Grafikon?',
    subtitle: 'Válogasd szét a jelenségeket: folytonos vonallal kötjük össze, csak diszkrét pontok, vagy hibás ábrázolás!',
    categories: [
      {
        id: 'cat-cont',
        name: 'Folytonos Grafikon (Összekötött vonal)',
        description: 'Bármely két érték között létezik átmenet (idő, tömeg, hőmérséklet)',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-disc',
        name: 'Diszkrét Grafikon (Csak pontok)',
        description: 'Megszámlálható darabszám, személyek, dobások (tilos összekötni)',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-error',
        name: 'Hibás / Értelmetlen Ábrázolás',
        description: 'Matematikai vagy fizikai szabályt sértő grafikus megjelenítés',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 's1-1', label: 'Futó mozgása: idő és megtett távolság összefüggése', category: 'cat-cont' },
      { id: 's1-2', label: 'Szoba hőmérsékletének változása a nap 24 órájában', category: 'cat-cont' },
      { id: 's1-3', label: 'Egyenletesen töltődő medence vízmagassága (cm)', category: 'cat-cont' },
      { id: 's1-4', label: 'Folytonos valós számokon értelmezett f(x) = 2x - 3', category: 'cat-cont' },
      { id: 's1-5', label: 'Vásárolt mozijegyek darabszáma és az értük fizetendő forint', category: 'cat-disc' },
      { id: 's1-6', label: 'Fagylaltgombócok száma és a fizetendő összeg a cukrászdában', category: 'cat-disc' },
      { id: 's1-7', label: 'Családtagok száma és a havi bérletek darabszáma', category: 'cat-disc' },
      { id: 's1-8', label: 'Dobókockával dobott számok relatív gyakorisága', category: 'cat-disc' },
      { id: 's1-9', label: 'Vásárolt füzetek diszkrét pontjainak egyenessel való összekötése', category: 'cat-error' },
      { id: 's1-10', label: 'Egyetlen tengelyen belül 1, 2, 5, 20 beosztás felvétele egyenlő rácsközönként', category: 'cat-error' },
      { id: 's1-11', label: 'Olyan grafikon, amely egy x értékhez két különböző y értéket rendel', category: 'cat-error' },
      { id: 's1-12', label: 'A tengelyek mértékegységének és nyilainak teljes elhagyása', category: 'cat-error' }
    ]
  },
  2: {
    title: '2. Szint: Meredekségi Típusok és Irányok',
    subtitle: 'Kategorizáld a megadott egyeneseket és képleteket a meredekség iránya szerint!',
    categories: [
      {
        id: 'cat-inc',
        name: 'Emelkedő Egyenes (a > 0)',
        description: 'Balról jobbra haladva emelkedik, x növekedésével y is nő',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-dec',
        name: 'Csökkenő Egyenes (a < 0)',
        description: 'Balról jobbra haladva lejt, x növekedésével y csökken',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-const',
        name: 'Vízszintes Egyenes (a = 0)',
        description: 'Párhuzamos az x-tengellyel, minden x-hez ugyanaz az y tartozik',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      }
    ],
    items: [
      { id: 's2-1', label: 'f(x) = 3x - 5 képletű függvény', category: 'cat-inc' },
      { id: 's2-2', label: 'g(x) = 0,25x + 4 hozzárendelés', category: 'cat-inc' },
      { id: 's2-3', label: 'Lépésháromszög: 2-t jobbra, 3-at fel lépünk', category: 'cat-inc' },
      { id: 's2-4', label: 'Egyenes arányosság pozitív szorzóval (y = 4x)', category: 'cat-inc' },
      { id: 's2-5', label: 'h(x) = -2x + 7 képletű függvény', category: 'cat-dec' },
      { id: 's2-6', label: 'k(x) = -(2/3)x - 1 hozzárendelés', category: 'cat-dec' },
      { id: 's2-7', label: 'Lépésháromszög: 1-et jobbra, 4-et le lépünk', category: 'cat-dec' },
      { id: 's2-8', label: 'Gyertya fogyása az idő előrehaladtával', category: 'cat-dec' },
      { id: 's2-9', label: 'm(x) = 5 (konstans függvény)', category: 'cat-const' },
      { id: 's2-10', label: 'p(x) = -3 vízszintes egyenese', category: 'cat-const' },
      { id: 's2-11', label: 'Autópálya matrica fix ára megtett kilométerektől függetlenül', category: 'cat-const' },
      { id: 's2-12', label: 'Meredeksége pontosan a = 0', category: 'cat-const' }
    ]
  },
  3: {
    title: '3. Szint: A Grafikonkészítés 3 Fázisa',
    subtitle: 'Sorold be a teendőket és műveleteket a grafikonkészítés megfelelő szakaszába!',
    categories: [
      {
        id: 'cat-prep',
        name: '1. Előkészítés & Táblázat',
        description: 'Értelmezési tartomány tisztázása, mintapontok kiszámolása',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-axes',
        name: '2. Tengelyek & Skálázás',
        description: 'Tengelyek felrajzolása, beosztási egység meghatározása',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-draw',
        name: '3. Pontozás & Vonalhúzás',
        description: 'Koordináták felmérése, ellenőrző 3. pont, összekötés eldöntése',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      }
    ],
    items: [
      { id: 's3-1', label: 'Kényelmes x értékek kiválasztása (pl. x = 0, 1, 2)', category: 'cat-prep' },
      { id: 's3-2', label: 'Helyettesítési értékek (y) kiszámítása a képlettel', category: 'cat-prep' },
      { id: 's3-3', label: 'Annak eldöntése, hogy x csak egész szám lehet-e', category: 'cat-prep' },
      { id: 's3-4', label: 'Tört meredekségnél a nevező többszöröseinek kiválasztása', category: 'cat-prep' },
      { id: 's3-5', label: 'Egymásra merőleges tengelyek megrajzolása nyíllal a végükön', category: 'cat-axes' },
      { id: 's3-6', label: 'A tengelyek elnevezése (x és y vagy mértékegységek)', category: 'cat-axes' },
      { id: 's3-7', label: 'Megfelelő lépték választása (pl. 1 rács = 50 km)', category: 'cat-axes' },
      { id: 's3-8', label: 'Egyenletes rácsközök beosztása mindkét tengelyen', category: 'cat-axes' },
      { id: 's3-9', label: 'Az (x; y) koordináták precíz bejelölése ceruzaponttal', category: 'cat-draw' },
      { id: 's3-10', label: 'A (0; b) tengelymetszetből a lépésháromszög felrajzolása', category: 'cat-draw' },
      { id: 's3-11', label: 'Vonalzóval ellenőrizni, hogy a 3 kiszámított pont egy egyenesre esik-e', category: 'cat-draw' },
      { id: 's3-12', label: 'Végighúzni az egyenest a füzetben (ha folytonos a feladat)', category: 'cat-draw' }
    ]
  }
};

export const PlottingGraphsSorter: React.FC<PlottingGraphsSorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g8-func-plotting',
  topicTitle = 'Készítsünk Grafikont!'
}) => {
  return (
    <SorterTemplate
      level={level}
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
      chapterId="hozzarendelesek-valoszinuseg-sorozatok"
      themeColor="blue"
    />
  );
};

export default PlottingGraphsSorter;

import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { MathGamesMatcher } from './MathGamesMatcher';
import { MathGamesSorter } from './MathGamesSorter';
import {
  Gamepad2,
  Target,
  Trophy,
  HelpCircle,
  Lightbulb,
  Sparkles,
  Binary,
  CheckCircle2,
  AlertTriangle,
  Layers,
  RotateCcw,
  Shuffle,
  Dices,
  Scale
} from 'lucide-react';

interface MathGamesQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Visszafelé Gondolkodás és Kulcspozíciók',
    icon: <Target className="w-4 h-4 text-rose-600" />,
    formula: 'Kulcspozíció: Cél - k · (lépésmax + 1)',
    note: 'A játékot a végállásból visszafelé elemezzük. Az utolsó biztos nyerő állás közvetlenül a cél előtt a Cél - (lépésmax + 1), ahonnan az ellenfél bármit lép, elérjük a célt.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="5" y="8" width="68" height="34" rx="8" className="fill-rose-100 stroke-rose-300 dark:fill-rose-950/60 dark:stroke-rose-800" />
        <text x="12" y="29" className="text-[10px] font-mono font-bold fill-rose-900 dark:fill-rose-200">17 → Kulcspont</text>
        <path d="M 76 25 L 88 25" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow)" className="text-rose-500" />
        <rect x="92" y="8" width="63" height="34" rx="8" className="fill-emerald-100 stroke-emerald-300 dark:fill-emerald-950/60 dark:stroke-emerald-800" />
        <text x="98" y="29" className="text-[10px] font-mono font-bold fill-emerald-900 dark:fill-emerald-200">21 → Cél (Nyer)</text>
      </svg>
    )
  },
  {
    id: 'c2',
    title: 'Kiegészítő Stratégia (k + 1 ciklus)',
    icon: <Sparkles className="w-4 h-4 text-indigo-600" />,
    formula: 'Ha ellenfél x-et lép ⟹ mi (k + 1 - x)-et lépünk',
    note: 'Ha 1-től k-ig lehet lépni, egy teljes körben a két játékos együtt pontosan k + 1 lépést tesz meg. Ezzel a vezető játékos kézben tartja az összes kulcsértéket.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="10" y="8" width="140" height="34" rx="8" className="fill-indigo-100 stroke-indigo-300 dark:fill-indigo-950/60 dark:stroke-indigo-800" />
        <text x="18" y="29" className="text-[10px] font-mono font-bold fill-indigo-900 dark:fill-indigo-200">Ellenfél: x + Mi: (4 - x) = 4</text>
      </svg>
    )
  },
  {
    id: 'c3',
    title: 'Szimmetria és Tükrözési Elv',
    icon: <Scale className="w-4 h-4 text-amber-600" />,
    formula: 'Közép elfoglalása + lépések szimmetrikus másolása',
    note: 'Szimmetrikus játéktéren a kezdő elfoglalhatja a szimmetriaközpontot, majd az ellenfél bármely lépésére annak tükörképével válaszolhat. Így ő lép utoljára.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <circle cx="80" cy="25" r="20" className="fill-amber-50 stroke-amber-300 dark:fill-amber-950/40 dark:stroke-amber-800" />
        <circle cx="80" cy="25" r="4" className="fill-amber-600 dark:fill-amber-400" />
        <circle cx="68" cy="25" r="3" className="fill-rose-500" />
        <circle cx="92" cy="25" r="3" className="fill-emerald-500" />
        <text x="15" y="29" className="text-[9px] font-bold fill-amber-900 dark:fill-amber-200">Közép</text>
        <text x="110" y="29" className="text-[9px] font-bold fill-emerald-700 dark:fill-emerald-300">Tükörkép</text>
      </svg>
    )
  },
  {
    id: 'c4',
    title: 'Paritás és Oszthatósági Invariáns',
    icon: <Binary className="w-4 h-4 text-purple-600" />,
    formula: 'Állapot paritása állandó (páros ⟷ páratlan)',
    note: 'Ha minden megengedett lépés megőrzi egy tulajdonság paritását, a kezdeti paritás eldönti, hogy egy adott célállapot egyáltalán elérhető-e a játék során.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="10" y="8" width="65" height="34" rx="8" className="fill-purple-100 stroke-purple-300 dark:fill-purple-950/60 dark:stroke-purple-800" />
        <text x="18" y="29" className="text-[10px] font-mono font-bold fill-purple-900 dark:fill-purple-200">Páratlan összeg</text>
        <rect x="85" y="8" width="65" height="34" rx="8" className="fill-blue-100 stroke-blue-300 dark:fill-blue-950/60 dark:stroke-blue-800" />
        <text x="96" y="29" className="text-[10px] font-mono font-bold fill-blue-900 dark:fill-blue-200">≠ 0 (Páros)</text>
      </svg>
    )
  }
];

const quizLevels: Record<1 | 2 | 3, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapvető Számversenyek és a 21-es Játék',
    subtitle: 'A klasszikus 21-es játék szabályai, kulcsszámok meghatározása és a kiegészítő stratégia',
    range: '1 - 10. feladat',
    focus: 'Kulcsszámok kiszámítása, nyerő első lépés és a 4-es ciklus alkalmazása',
    questions: [
      {
        id: 'q1-1',
        prompt: 'A 21-es játékban 0-ról indulunk, felváltva 1, 2 vagy 3 adható hozzá, és aki eléri a 21-et, az nyer. Mi a kezdő játékos nyerő első lépése?',
        options: ['1', '2', '3', 'Nincs nyerő lépése, a második nyer'],
        correctAnswer: '1',
        explanation: 'A maximális lépés 3, így a ciklus hossza 3 + 1 = 4. A 21-et elosztva 4-gyel: 21 = 5 · 4 + 1. A maradék 1, tehát a kezdő játékosnak első lépésként 1-et kell mondania, hogy a nyerő pozícióba kerüljön.',
        breakdown: [
          { label: 'Ciklusméret', value: '3 + 1 = 4' },
          { label: 'Maradékos osztás', value: '21 = 5 · 4 + 1' },
          { label: 'Első nyerő lépés', value: '1' }
        ],
        hint: 'Oszd el a célösszeget a maximális lépésnél eggyel nagyobb számmal (4-gyel), és nézd a maradékot!'
      },
      {
        id: 'q1-2',
        prompt: 'A fenti 21-es játékban a kezdő 1-et lépett. A második játékos erre 3-at adott hozzá (így az állás 4 lett). Mennyit kell lépnie a kezdőnek, hogy megtartsa az előnyét?',
        options: ['1-et, hogy 5-re lépjen', '2-t, hogy 6-ra lépjen', '3-at, hogy 7-re lépjen', 'Mindegy, bármit léphet'],
        correctAnswer: '1-et, hogy 5-re lépjen',
        explanation: 'A nyerő kulcsszámok a 4-gyel osztva 1 maradékot adó számok: 1, 5, 9, 13, 17, 21. Az állás most 4, így a következő kulcsszám az 5. Mivel a második 3-at lépett, a kezdő kiegészíti azt 4-re: 4 - 3 = 1 lépéssel 5-re jut.',
        breakdown: [
          { label: 'Következő kulcsszám', value: '5' },
          { label: 'Jelenlegi összeg', value: '4' },
          { label: 'Kiegészítő lépés', value: '5 - 4 = 1' }
        ],
        hint: 'A kiegészítő stratégia szerint a két játékos egymást követő lépéseinek összege mindig 4 kell legyen!'
      },
      {
        id: 'q1-3',
        prompt: 'Mi a 21-es játékban a 21 előtti közvetlen utolsó kulcspozíció?',
        options: ['17', '18', '19', '20'],
        correctAnswer: '17',
        explanation: 'A 21-ből visszaszámolva 4-et kapjuk a 17-et. Aki 17-re lép, az biztosan nyer: az ellenfél csak 18, 19 vagy 20-ra léphet (1, 2 vagy 3 hozzáadásával), és innen a vezető játékos egyetlen lépéssel eléri a 21-et.',
        breakdown: [
          { label: 'Cél', value: '21' },
          { label: 'Lépésciklus', value: '4' },
          { label: 'Előző kulcsszám', value: '21 - 4 = 17' }
        ],
        hint: 'Vonj le a célból (3 + 1 = 4)-et!'
      },
      {
        id: 'q1-4',
        prompt: 'Egy számversenyben a cél a 20 elérése (lépésválaszték: 1, 2 vagy 3). Ki rendelkezik biztos nyerő stratégiával, ha mindkét fél hibátlanul játszik?',
        options: [
          'A második játékos',
          'A kezdő játékos (első lépés: 1)',
          'A kezdő játékos (első lépés: 2)',
          'Döntetlen lesz'
        ],
        correctAnswer: 'A második játékos',
        explanation: 'A ciklus hossza 3 + 1 = 4. A célösszeg 20, ami pontosan osztható 4-gyel (20 = 5 · 4 + 0, a maradék 0). Ezért a kezdő nem tud kulcsszámra lépni; bármit lép (x), a második játékos 4 - x lépéssel azonnal kulcspozícióba jut és végig ott marad.',
        breakdown: [
          { label: 'Cél', value: '20' },
          { label: 'Ciklus', value: '4' },
          { label: 'Maradék', value: '20 mod 4 = 0 ⟹ Második nyer' }
        ],
        hint: 'Osztható-e a 20 a (3 + 1 = 4)-gyel?'
      },
      {
        id: 'q1-5',
        prompt: 'A cél a 30 elérése 0-ról indulva, és felváltva 1, 2, 3 vagy 4 adható hozzá. Mekkora a lépésciklus hossza (k + 1)?',
        options: ['5', '4', '6', '3'],
        correctAnswer: '5',
        explanation: 'A maximálisan választható lépés k = 4, a minimális pedig 1. A kiegészítő ciklus hossza mindig k + 1 = 4 + 1 = 5.',
        breakdown: [
          { label: 'Maximális lépés', value: 'k = 4' },
          { label: 'Ciklus hossza', value: 'k + 1 = 4 + 1 = 5' }
        ],
        hint: 'A maximális lépéshez adj hozzá 1-et!'
      },
      {
        id: 'q1-6',
        prompt: 'A cél: 30 elérése, a lépésválaszték 1–4. Ki nyer és miért?',
        options: [
          'A második játékos, mert 30 osztható 5-tel',
          'A kezdő játékos, mert 30 páros szám',
          'A kezdő játékos 1 lépéssel',
          'A kezdő játékos 4 lépéssel'
        ],
        correctAnswer: 'A második játékos, mert 30 osztható 5-tel',
        explanation: 'A ciklusméret 5. Mivel 30 = 6 · 5, a maradék 0. Tehát a cél osztható a ciklusmérettel, így a második játékos rendelkezik biztos nyerő stratégiával.',
        breakdown: [
          { label: 'Cél', value: '30' },
          { label: 'Ciklus', value: '5' },
          { label: 'Osztás', value: '30 : 5 = 6 (maradék 0)' }
        ],
        hint: 'Nézd meg a 30 : 5 maradékát!'
      },
      {
        id: 'q1-7',
        prompt: 'Az asztalon 15 gyufaszál van. Felváltva 1 vagy 2 szálat lehet elvenni. Az nyer, aki az utolsó szálat elveszi. Ki nyer helyes játékkal?',
        options: [
          'A második játékos, mert 15 osztható 3-mal',
          'A kezdő játékos 1 szál elvételével',
          'A kezdő játékos 2 szál elvételével',
          'Mindkét játékosnak egyforma esélye van'
        ],
        correctAnswer: 'A második játékos, mert 15 osztható 3-mal',
        explanation: 'A lépés legfeljebb 2 szál, így a ciklus 2 + 1 = 3. Mivel 15 osztható 3-mal (15 = 5 · 3), a kezdő nem tudja 3 többszörösére csökkenteni a szálak számát. Bármennyit vesz el (1-et vagy 2-t), a második kiegészíti azt 3-ra, így mindig 3 többszörösét hagyja.',
        breakdown: [
          { label: 'Gyufák száma', value: '15' },
          { label: 'Ciklus', value: '2 + 1 = 3' },
          { label: 'Győztes', value: 'Második játékos (15 mod 3 = 0)' }
        ],
        hint: 'A maximális lépés 2, így a ciklus 3.'
      },
      {
        id: 'q1-8',
        prompt: 'Ha 16 gyufaszál van az asztalon (lépés: 1 vagy 2 szál, utolsót elvevő nyer), mit lépjen a kezdő a biztos győzelemhez?',
        options: [
          'Elvesz 1 szálat, így 15-öt hagy az ellenfélnek',
          'Elvesz 2 szálat, így 14-et hagy az ellenfélnek',
          'Bármelyik lépéssel biztosan nyer',
          'Nem tud nyerni'
        ],
        correctAnswer: 'Elvesz 1 szálat, így 15-öt hagy az ellenfélnek',
        explanation: 'Mivel 16 = 5 · 3 + 1, a kezdő 1 szál elvételével 15 gyufaszálat hagy az ellenfélnek. A 15 osztható 3-mal (vesztő pozíció a soron következőnek), így innentől a kiegészítő stratégiával a kezdő nyer.',
        breakdown: [
          { label: 'Kezdő állapot', value: '16 szál' },
          { label: 'Maradék', value: '16 mod 3 = 1' },
          { label: 'Helyes lépés', value: 'Elvesz 1-et ⟹ 15 marad' }
        ],
        hint: 'A cél olyan számot hagyni a másiknak, ami osztható 3-mal!'
      },
      {
        id: 'q1-9',
        prompt: 'A 21-es játékban az állás most 13. Te következel. Nyerő vagy vesztő pozícióban vagy, ha az ellenfeled ismeri a stratégiát?',
        options: [
          'Vesztő pozícióban vagy, mert a 13 éppen egy védett kulcsszám',
          'Nyerő pozícióban vagy, mert a 13-ról azonnal nyerni lehet',
          'Nyerő pozícióban vagy, ha 1-et lépsz',
          'Nyerő pozícióban vagy, ha 3-at lépsz'
        ],
        correctAnswer: 'Vesztő pozícióban vagy, mert a 13 éppen egy védett kulcsszám',
        explanation: 'A kulcsszámok: 1, 5, 9, 13, 17, 21. Ha a te körödben a számláló pontosan 13-on áll, akkor az ellenfeled hozta létre ezt a kulcspozíciót. Te csak 14, 15 vagy 16-ra tudsz lépni, ahonnan ő azonnal 17-re léphet. Tehát vesztő állásban vagy.',
        breakdown: [
          { label: 'Jelenlegi állás', value: '13 (kulcsszám)' },
          { label: 'Lehetséges lépéseid', value: '14, 15 vagy 16' },
          { label: 'Ellenfél válasza', value: '17-re lép (ismét kulcsszám)' }
        ],
        hint: 'Aki egy kulcsszámról kénytelen lépni, az elhagyja a kulcspozíciót!'
      },
      {
        id: 'q1-10',
        prompt: 'A kiegészítő stratégia alkalmazásakor a lépésválaszték 1–3 (ciklus: 4). Ha az ellenfél 2-t lép, mennyit kell lépnünk?',
        options: ['2-t', '1-et', '3-at', '0-t'],
        correctAnswer: '2-t',
        explanation: 'A két lépés összegének 4-nek kell lennie: 4 - 2 = 2. Tehát ha ő 2-t lépett, mi is 2-t lépünk.',
        breakdown: [
          { label: 'Ciklusösszeg', value: '4' },
          { label: 'Ellenfél lépése', value: '2' },
          { label: 'Válaszlépésünk', value: '4 - 2 = 2' }
        ],
        hint: 'Egészítsd ki az ellenfél lépését 4-re!'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Változatos Szabályok és Fordított (Misère) Játékok',
    subtitle: 'Nagyobb számok, fordított célok (az veszít, aki az utolsót lépi) és többkupacos elvek',
    range: '11 - 20. feladat',
    focus: 'Misère játékok logikája, 100-as verseny és a Nim szimmetria-stratégiája',
    questions: [
      {
        id: 'q2-1',
        prompt: 'A fordított (misère) 21-es játékban az VESZÍT, aki eléri vagy kimondja a 21-et (lépés: 1–3). Mi ekkor a valódi nyerő célállapot?',
        options: [
          'A 20 elérése, mert innen az ellenfél csak a 21-et mondhatja',
          'A 19 elérése',
          'A 18 elérése',
          'Továbbra is a 21 elérése'
        ],
        correctAnswer: 'A 20 elérése, mert innen az ellenfél csak a 21-et mondhatja',
        explanation: 'Ha az veszít, aki a 21-et mondja, akkor az nyer, aki a 20-at mondja ki! Aki ugyanis 20-ra lép, az ellenfelét 21 kimondására kényszeríti (hiszen minimum 1-et kötelező lépni: 20 + 1 = 21). A feladat tehát a 20 elérésére redukálódik.',
        breakdown: [
          { label: 'Vesztő szám', value: '21' },
          { label: 'Minimális lépés', value: '+1' },
          { label: 'Új nyerő cél', value: '21 - 1 = 20' }
        ],
        hint: 'Ha minimum 1-et kell lépni, melyik az az utolsó biztonságos szám, amiről az ellenfél kénytelen a 21-re lépni?'
      },
      {
        id: 'q2-2',
        prompt: 'A fordított 21-es játékban (az új cél a 20 elérése, lépésválaszték: 1–3) ki nyer hibátlan játékkal?',
        options: [
          'A második játékos, mert 20 osztható 4-gyel',
          'A kezdő játékos 1-gyel',
          'A kezdő játékos 2-vel',
          'A kezdő játékos 3-mal'
        ],
        correctAnswer: 'A második játékos, mert 20 osztható 4-gyel',
        explanation: 'Az új cél a 20. Mivel 20 = 5 · 4 + 0, a cél osztható a ciklusmérettel (4-gyel). Ezért a második játékos tudja garantálni a 20 elérését, így a kezdő kényszerül majd a 21 kimondására.',
        breakdown: [
          { label: 'Új cél', value: '20' },
          { label: 'Ciklus', value: '4' },
          { label: '20 mod 4', value: '0 ⟹ Második játékos nyer' }
        ],
        hint: 'A 20-as játékot már elemeztük: osztható-e a 20 4-gyel?'
      },
      {
        id: 'q2-3',
        prompt: '21 gyufaszál van az asztalon. Felváltva 1, 2 vagy 3 vehető el. Az VESZÍT, aki az utolsót kénytelen elvenni. Hány szálat kell hagyni az ellenfélnek a végjátékban a biztos győzelemhez?',
        options: ['Pontosan 1 szálat', '0 szálat', '2 szálat', '4 szálat'],
        correctAnswer: 'Pontosan 1 szálat',
        explanation: 'Ha az ellenfélnek pontosan 1 szálat hagyunk az asztalon, akkor mivel legalább 1 szálat kötelező elvennie, kénytelen lesz elvenni az utolsót, és veszít.',
        breakdown: [
          { label: 'Szabály', value: 'Utolsót elvevő veszít' },
          { label: 'Cél az ellenfélnek', value: '1 szálat hagyni neki' }
        ],
        hint: 'Ha 1 gyufa marad az asztalon és ő következik, mit tud tenni?'
      },
      {
        id: 'q2-4',
        prompt: 'A fenti fordított gyufajátékban (21 szál, 1–3 vehető el, utolsó veszít) mik a kulcspozíciók (a meghagyandó gyufaszálak száma)?',
        options: [
          '1, 5, 9, 13, 17, 21',
          '0, 4, 8, 12, 16, 20',
          '2, 6, 10, 14, 18',
          '3, 6, 9, 12, 15, 18'
        ],
        correctAnswer: '1, 5, 9, 13, 17, 21',
        explanation: 'Az utolsó célállapot az 1 szál meghagyása. Visszafelé 4-esével lépkedve: 1, 5, 9, 13, 17, 21. Mivel kezdetben pontosan 21 szál van az asztalon, az asztal már induláskor kulcspozícióban van a második játékos javára!',
        breakdown: [
          { label: 'Alapcél', value: '1 szál meghagyása' },
          { label: 'Lépésciklus', value: '+4' },
          { label: 'Kulcssorozat', value: '1, 5, 9, 13, 17, 21' }
        ],
        hint: 'Indulj ki az 1-ből, és adj hozzá 4-eket visszafelé!'
      },
      {
        id: 'q2-5',
        prompt: 'A 100-as számversenyben 0-ról indulunk, és felváltva 1-től 10-ig adhatunk hozzá egész számokat. Aki eléri a 100-at, az nyer. Mekkora a ciklusméret?',
        options: ['11', '10', '9', '12'],
        correctAnswer: '11',
        explanation: 'A maximális lépés 10, így a ciklus hossza k + 1 = 10 + 1 = 11.',
        breakdown: [
          { label: 'Max lépés', value: 'k = 10' },
          { label: 'Ciklus', value: 'k + 1 = 11' }
        ],
        hint: 'A maximális lépéshez adj 1-et!'
      },
      {
        id: 'q2-6',
        prompt: 'Mit kell mondania a kezdő játékosnak a 100-as játékban (lépés: 1–10, 100 nyer) az első lépésben a biztos győzelemhez?',
        options: ['1-et', '10-et', '5-öt', 'Nem tud nyerni, a második nyer'],
        correctAnswer: '1-et',
        explanation: 'A 100-at elosztjuk a ciklusmérettel (11-gyel): 100 = 9 · 11 + 1. A maradék 1, tehát a kezdő játékos az 1 kimondásával azonnal megszerzi a nyerő pozíciót.',
        breakdown: [
          { label: 'Cél', value: '100' },
          { label: 'Ciklus', value: '11' },
          { label: 'Maradékos osztás', value: '100 = 9 · 11 + 1' },
          { label: 'Első lépés', value: '1' }
        ],
        hint: 'Mennyi 100 osztva 11-gyel, és mennyi a maradék?'
      },
      {
        id: 'q2-7',
        prompt: 'Melyik számsor adja meg a 100-as játék (lépés: 1–10) kulcsszámait?',
        options: [
          '1, 12, 23, 34, 45, 56, 67, 78, 89, 100',
          '10, 20, 30, 40, 50, 60, 70, 80, 90, 100',
          '11, 22, 33, 44, 55, 66, 77, 88, 99',
          '2, 13, 24, 35, 46, 57, 68, 79, 90'
        ],
        correctAnswer: '1, 12, 23, 34, 45, 56, 67, 78, 89, 100',
        explanation: 'A kulcsszámok 1-től indulnak és 11-esével növekednek: 1, 1+11=12, 12+11=23, ..., 89, 89+11=100. Mindegyik 11-gyel osztva 1 maradékot ad.',
        breakdown: [
          { label: 'Kezdő kulcsszám', value: '1' },
          { label: 'Lépésköz', value: '+11' },
          { label: 'Sorozat', value: '1, 12, 23, 34, ... 89, 100' }
        ],
        hint: 'A számok 1-ről indulnak és a ciklusmérettel (11-gyel) növekednek.'
      },
      {
        id: 'q2-8',
        prompt: 'Két kupacban 5-5 gyufaszál van. Egy lépésben tetszőleges számú gyufa elvehető az egyik kupacból. Az nyer, aki az utolsó szálat elveszi. Mi a második játékos nyerő stratégiája?',
        options: [
          'Szimmetria: mindig ugyanannyi gyufát vesz el a másik kupacból, mint amennyit a kezdő vett el',
          'Mindig kiüríti a nagyobb kupacot',
          'Mindig pontosan 1 szálat vesz el',
          'Nincs nyerő stratégiája, a kezdő nyer'
        ],
        correctAnswer: 'Szimmetria: mindig ugyanannyi gyufát vesz el a másik kupacból, mint amennyit a kezdő vett el',
        explanation: 'A két kupac kezdetben egyenlő (szimmetrikus állapot). A kezdő bármit lép, megbontja az egyenlőséget. A második játékos azonnal visszaállítja az egyenlőséget a másik kupacból elvéve ugyanannyit. Végül a kezdő kénytelen kiüríteni az egyik kupacot, amire válaszul a második kiüríti a másikat és nyer.',
        breakdown: [
          { label: 'Kezdőállapot', value: '(5; 5) - szimmetrikus' },
          { label: 'Kezdő lép', value: '(5 - x; 5) - megbomlik' },
          { label: 'Második válaszol', value: '(5 - x; 5 - x) - helyreáll' }
        ],
        hint: 'Tükrözd az ellenfél lépését a másik kupacon!'
      },
      {
        id: 'q2-9',
        prompt: 'Egy Nim-játékban két kupac van: (7; 7). Mi történik, ha a kezdő az egyikből elvisz 4 szálat?',
        options: [
          'A második játékos a másik kupacból is elvisz 4 szálat, így (3; 3) marad',
          'A második játékos elviszi az összes megmaradt szálat',
          'A kezdő azonnal nyert',
          'A második játékosnak 1 szálat kell elvennie'
        ],
        correctAnswer: 'A második játékos a másik kupacból is elvisz 4 szálat, így (3; 3) marad',
        explanation: 'A szimmetria megőrzéséhez a második játékos pontosan lemásolja a kezdő lépését a másik kupacon: 7 - 4 = 3, így az állás (3; 3) lesz, ami ismét kiegyensúlyozott nyerő pozíció a második számára.',
        breakdown: [
          { label: 'Kezdő után', value: '(3; 7)' },
          { label: 'Második válasza', value: '4 elvétele a 7-esből ⟹ (3; 3)' }
        ],
        hint: 'A cél a kupacok egyenlőségének helyreállítása.'
      },
      {
        id: 'q2-10',
        prompt: '20 gyufaszál van. Felváltva 1, 2 vagy 4 szál vehető el (3-at NEM szabad elvenni!). Szabad-e a klasszikus k+1 képlettel számolni?',
        options: [
          'Nem, mert a lépések halmaza lyukas (nem egymást követő egészek 1-től k-ig)',
          'Igen, mert a maximális lépés 4, így a ciklus 5',
          'Igen, mert a gyufák száma osztható 4-gyel',
          'Igen, mert a 3 prímszám'
        ],
        correctAnswer: 'Nem, mert a lépések halmaza lyukas (nem egymást követő egészek 1-től k-ig)',
        explanation: 'A k+1 kiegészítő elv alapfeltétele, hogy bármely 1 és k közötti x lépésre létezzen egy megengedett (k + 1 - x) válaszlépés. Ha a lépések halmaza nem folytonos (pl. a 3 tiltott), a pozíciókat egyenként, dinamikus programozással / visszafelé kell Nyert-Vesztett állapotokként kiértékelni.',
        breakdown: [
          { label: 'Megengedett lépések', value: '{1, 2, 4}' },
          { label: 'Hiányzó elem', value: '3 tiltott ⟹ a kiegészítés sérül' },
          { label: 'Helyes módszer', value: 'Egyedi visszafelé elemzés' }
        ],
        hint: 'Gondolj bele: ha az ellenfél 1-et lép, tudsz-e 4-re kiegészíteni 3 lépésével?'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Szimmetria, Paritás és Összetett Játékelmélet',
    subtitle: 'Körasztalos érmejátékok, invariánsok, sakktábla-lefedés és Zermelo tétele',
    range: '21 - 30. feladat',
    focus: 'Geometriai szimmetria, paritás-megmaradás, osztókivonás és elméleti tételek',
    questions: [
      {
        id: 'q3-1',
        prompt: 'Egy kerek asztalra két játékos felváltva helyez el egyforma pénzérméket (nem fedhetik egymást, nem lóghatnak le). Aki nem tud több érmét lerakni, veszít. Ki nyer és mi a stratégiája?',
        options: [
          'A kezdő nyer: első érmét pontosan az asztal középpontjára teszi, utána tükrözi az ellenfél lépéseit',
          'A második játékos nyer, mert bármely lépést lemásolhat',
          'Döntetlen lesz, mert a kör felülete folytonos',
          'A kezdő nyer, ha az asztal szélére teszi az első érmét'
        ],
        correctAnswer: 'A kezdő nyer: első érmét pontosan az asztal középpontjára teszi, utána tükrözi az ellenfél lépéseit',
        explanation: 'A kezdő játékos az asztal egyetlen kitüntetett, önmagába tükröződő pontjára (a középpontra) teszi az érmét. Ezután az asztal felülete középpontosan szimmetrikus. Ha a második játékos bárhová le tud tenni egy érmét, annak középpontos tükörképe garantáltan szabad hely lesz a kezdő számára.',
        breakdown: [
          { label: 'Kezdő 1. lépése', value: 'Asztal geometriai középpontja' },
          { label: 'Kezdő további lépései', value: 'Középpontos tükrözés' },
          { label: 'Eredmény', value: 'A kezdő mindig tud lépni ⟹ Nyer' }
        ],
        hint: 'A körnek van egy kitüntetett pontja, amelynek nincs különálló tükörképe: a középpontja!'
      },
      {
        id: 'q3-2',
        prompt: 'Miért működik hibátlanul a fenti érmés játékban a középpontos tükrözési stratégia?',
        options: [
          'Mert ha az ellenfél lépése szabályos, a középpontra tükrözött hely is garantáltan az asztalon van és szabad',
          'Mert a kör területe páros számú érmét tartalmaz',
          'Mert az érmék kör alakúak',
          'Mert a második játékos nem látja a kezdő lépéseit'
        ],
        correctAnswer: 'Mert ha az ellenfél lépése szabályos, a középpontra tükrözött hely is garantáltan az asztalon van és szabad',
        explanation: 'A kör középpontos tükrözés során önmagába megy át. Ha a túloldalon lévő tükörkép nem lenne szabad, akkor a szimmetria miatt az ellenfél által választott hely sem lett volna szabad, ami ellentmondás. Így a kezdőnek sosem fogy el a válaszlépése.',
        breakdown: [
          { label: 'Kör szimmetriája', value: 'Középpontra nézve önmagába fordul' },
          { label: 'Szabad hely garancia', value: 'Hely szabad ⟺ Tükörkép szabad' }
        ],
        hint: 'A pontszimmetria megőrzi a távolságokat és a határokat.'
      },
      {
        id: 'q3-3',
        prompt: 'A táblán 25 darab 1-es van felírva. Egy lépésben letörlünk két számot (a és b), és helyettük felírjuk az összegüket (a + b) vagy a különbségüket (|a - b|). Ezt ismételjük, amíg egy szám marad. Lehet-e a végső szám 0?',
        options: [
          'Nem, mert a számok összegének paritása változatlan marad, és kezdetben páratlan (25)',
          'Igen, mert páros sok lépés után elérhető a 0',
          'Igen, ha mindig a különbségeket írjuk fel',
          'Csak akkor, ha 26 egyes lenne'
        ],
        correctAnswer: 'Nem, mert a számok összegének paritása változatlan marad, és kezdetben páratlan (25)',
        explanation: 'Vegyük észre, hogy (a + b) és (a - b) paritása mindig megegyezik: mindkettő paritása ugyanaz, mint a + b-nek. Két szám helyettesítésekor az összeg paritása nem változik (páros marad páros, páratlan marad páratlan). Mivel 25 darab 1-es összege 25 (páratlan), az utolsó megmaradó számnak is páratlannak kell lennie, így a 0 (ami páros) lehetetlen.',
        breakdown: [
          { label: 'Kezdeti összeg', value: '25 · 1 = 25 (páratlan)' },
          { label: 'Invariáns', value: 'Összeg paritása nem változik' },
          { label: 'Végeredmény', value: 'Páratlan kell legyen ⟹ 0 kizárva' }
        ],
        hint: 'Gondold végig az összeg párosságát: ha két páratlant törölsz, összegük és különbségük is páros.'
      },
      {
        id: 'q3-4',
        prompt: 'Egy 8×8-as sakktábla két átellenes sarkát levágjuk (így 62 mező marad). Lefedhető-e ez a csonka tábla 31 darab 2×1-es dominóval?',
        options: [
          'Nem, mert a levágott sarkok azonos színűek, így a színek száma nem egyenlő, de minden dominó 1 fehéret és 1 feketét fed',
          'Igen, mert 62 mező pontosan 31 dominó területe',
          'Igen, ha átlósan helyezzük el a dominókat',
          'Csak akkor, ha a tábla 10×10-es'
        ],
        correctAnswer: 'Nem, mert a levágott sarkok azonos színűek, így a színek száma nem egyenlő, de minden dominó 1 fehéret és 1 feketét fed',
        explanation: 'Egy normál sakktáblán 32 fehér és 32 fekete mező van. Az átellenes sarkok mindig azonos színűek (pl. mindkettő fehér). Levágásuk után 30 fehér és 32 fekete mező marad. Mivel minden 2×1-es dominó pontosan 1 fehér és 1 fekete mezőt fed le, 31 dominóhoz 31 fehér és 31 fekete mező kellene, ami lehetetlen.',
        breakdown: [
          { label: 'Levágott sarkok', value: '2 db azonos színű mező' },
          { label: 'Megmaradt mezők', value: '30 az egyikből, 32 a másikból' },
          { label: 'Dominó tulajdonság', value: '1 fehér + 1 fekete ⟹ Szükséges: 31-31' }
        ],
        hint: 'Milyen színű a sakktábla két átlósan szemközti sarka?'
      },
      {
        id: 'q3-5',
        prompt: 'Osztókivonós játék: A táblán a 60 áll. Felváltva levonhatjuk a szám egy tetszőleges valódi osztóját (1-et is, de magát a 60-at nem). Az veszít, aki nem tud lépni (eléri az 1-et). Mi a kezdő nyerő stratégiája?',
        options: [
          'Mindig páratlan számot ad át az ellenfélnek, mert annak csak páratlan osztói vannak',
          'Mindig a lehető legnagyobb páros osztót vonja le',
          'Mindig 1-et von le',
          'Nincs nyerő stratégiája, a második nyer'
        ],
        correctAnswer: 'Mindig páratlan számot ad át az ellenfélnek, mert annak csak páratlan osztói vannak',
        explanation: 'A 60 páros szám, így van páratlan osztója is (pl. 3, 5, 15). Ha levon egy páratlan osztót, páratlan számot kap: Páros - Páratlan = Páratlan. Egy páratlan számnak viszont CSAK páratlan osztói vannak! Az ellenfél kénytelen páratlanból páratlant levonni, ami Páratlan - Páratlan = Páros számot eredményez. Így a kezdő mindig párost kap vissza, és ismét páratlant tud adni, egészen az 1-ig.',
        breakdown: [
          { label: 'Kezdő lép', value: 'Páros - Páratlan osztó = Páratlan' },
          { label: 'Ellenfél kénytelen', value: 'Páratlan - Páratlan osztó = Páros' },
          { label: 'Végállás (1)', value: 'Páratlan szám, ahová az ellenfél kerül' }
        ],
        hint: 'Gondolj a paritásra: mi történik, ha párosból páratlant vonsz le?'
      },
      {
        id: 'q3-6',
        prompt: 'Mit nevezünk a matematikai játékokban „invariáns tulajdonságnak”?',
        options: [
          'Egy olyan matematikai jellemzőt (pl. paritás, maradék), amely a megengedett lépések során változatlan marad',
          'A játék leghosszabb lehetséges lépéssorozatát',
          'Azt a játékost, aki először hibázik',
          'A döntetlen eredmény valószínűségét'
        ],
        correctAnswer: 'Egy olyan matematikai jellemzőt (pl. paritás, maradék), amely a megengedett lépések során változatlan marad',
        explanation: 'Az invariáns egy megmaradási tétel: olyan tulajdonság, állapotfüggvény vagy paritás, amely semmilyen szabályos lépéssel nem változtatható meg. Segítségével bebizonyítható, hogy bizonyos célállapotok sosem érhetők el.',
        breakdown: [
          { label: 'Definíció', value: 'Invariáns = lépések során állandó tulajdonság' },
          { label: 'Gyakori példák', value: 'Összeg paritása, színezési egyensúly, mod k maradék' }
        ],
        hint: 'A latin invarians szó jelentése: változatlan, nem változó.'
      },
      {
        id: 'q3-7',
        prompt: 'A Nim játékban 3 kupac van: 1, 2 és 3 gyufaszál. A kezdő lép. Ha a kezdő elveszi a 3-as kupacból az összes szálat, mit kell lépnie a második játékosnak a biztos győzelemhez?',
        options: [
          'Elvesz 1 szálat a 2-es kupacból, így (1; 1) egyenlő kupacpár marad',
          'Elveszi a teljes 2-es kupacot',
          'Elveszi az 1-es kupacot',
          'Nem tud nyerni'
        ],
        correctAnswer: 'Elvesz 1 szálat a 2-es kupacból, így (1; 1) egyenlő kupacpár marad',
        explanation: 'Ha a kezdő elviszi a 3-as kupacot, marad (1; 2). A második játékos ekkor a 2-es kupacból 1-et elvéve létrehozza az (1; 1) szimmetrikus állást. Innen a kezdő bármelyik 1-est veszi el, a második elviszi az utolsót és nyer!',
        breakdown: [
          { label: 'Kezdő után', value: '(1; 2)' },
          { label: 'Második nyerő lépése', value: '1 elvétele a 2-esből ⟹ (1; 1)' },
          { label: 'Végeredmény', value: 'Második garantáltan nyer' }
        ],
        hint: 'Hozd létre a már ismert szimmetrikus, egyenlő kétkupacos állást!'
      },
      {
        id: 'q3-8',
        prompt: 'Mit mond ki Zermelo tétele a véges, kétszemélyes, teljes információjú, véletlent nem tartalmazó játékokról (mint pl. a 21-es játék)?',
        options: [
          'A két játékos közül pontosan az egyiknek létezik biztos nyerő stratégiája (vagy döntetlenre vezető stratégiája)',
          'Mindkét játékosnak van nyerő stratégiája',
          'Csak a kezdő játékosnak lehet nyerő stratégiája',
          'Minden játék döntetlennel ér véget'
        ],
        correctAnswer: 'A két játékos közül pontosan az egyiknek létezik biztos nyerő stratégiája (vagy döntetlenre vezető stratégiája)',
        explanation: 'Ernst Zermelo 1913-as tétele kimondja, hogy minden véges, kétszemélyes, teljes információjú determinisztikus játékban az egyik játékosnak van olyan stratégiája, amellyel biztosan győzhet (vagy ha döntetlen megengedett, legalább döntetlent érhet el).',
        breakdown: [
          { label: 'Feltételek', value: 'Véges lépés, teljes információ, nincs szerencse' },
          { label: 'Állítás', value: 'Létezik determinisztikus nyerő/döntetlen stratégia' }
        ],
        hint: 'A játék kimenetele matematikailag előre eldöntött, nincs benne szerencse.'
      },
      {
        id: 'q3-9',
        prompt: 'Egy 4×4-es négyzetrácsra felváltva helyezünk el 2×1-es dominókat. Aki nem tud dominót lerakni, veszít. A kezdő az első dominót a tábla közepére teszi (úgy, hogy szimmetriatengelyre illeszkedjen). Mi a stratégiája ezután?',
        options: [
          'A második játékos lépéseit pontszimmetrikusan tükrözi a tábla középpontjára',
          'Mindig a bal felső sarokba tesz dominót',
          'Megpróbálja elkerülni az éleket',
          'Nem tud nyerni'
        ],
        correctAnswer: 'A második játékos lépéseit pontszimmetrikusan tükrözi a tábla középpontjára',
        explanation: 'A kezdő lefoglalja a szimmetriaközpontot (vagy szimmetrikus pozíciót), majd a tábla középpontjára tükrözve minden lépésre pontos választ tud adni. Mivel a tábla szimmetrikus, a tükrözött hely mindig rendelkezésre áll.',
        breakdown: [
          { label: 'Kezdő alaplépés', value: 'Közép szimmetrikus elfoglalása' },
          { label: 'Reakció', value: 'Szimmetrikus válaszlépések' }
        ],
        hint: 'Ugyanaz a stratégia, mint a körasztalos érmejátéknál.'
      },
      {
        id: 'q3-10',
        prompt: 'Mi a különbség egy „taktikai trükk” és a matematikai értelemben vett „nyerő stratégia” között?',
        options: [
          'A nyerő stratégia az ellenfél BÁRMELY szabályos lépésére választ ad és GARANTÁLJA a győzelmet, nem függ az ellenfél hibájától',
          'Nincs különbség, mindkettő ugyanazt jelenti',
          'A taktikai trükk mindig jobb, mert gyorsabb győzelmet ad',
          'A nyerő stratégia csak a szerencsén alapul'
        ],
        correctAnswer: 'A nyerő stratégia az ellenfél BÁRMELY szabályos lépésére választ ad és GARANTÁLJA a győzelmet, nem függ az ellenfél hibájától',
        explanation: 'A nyerő stratégia matematikai garancia: egy olyan algoritmus vagy döntési szabályrendszer, amelyet követve a játékos az ellenfél legtökéletesebb játéka mellett is biztosan megnyeri a játékot.',
        breakdown: [
          { label: 'Nyerő stratégia', value: 'Garantált győzelem bármilyen ellenfél ellen' },
          { label: 'Feltétel', value: 'Nem feltételez ellenféli hibát' }
        ],
        hint: 'A matematikai bizonyításnak minden lehetséges esetre működnie kell.'
      }
    ]
  }
};

export const MathGamesQuiz: React.FC<MathGamesQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      grade={7}
      chapterId="g7-powers-divisibility"
      topicId="g7-powers-games"
      topicTitle="10. Matematikai játékok"
      subtopicId="matematikai-jatekok"
      documentId="grade-7-matematikai-jatekok-quiz"
      emoji="🎮"
      topicBadge="7. Osztály • Matematika IV. Témakör"
      badgeText="7. Osztály • Matematika IV. Témakör"
      category="Oszthatóság és Számelmélet"
      title="Matematikai játékok – Kvíz"
      subtitle="Mesterfokú stratégiai gyakorlás: 21-es és 100-as játék, kiegészítő lépések, inverz és paritásos gondolkodás, szimmetria-stratégiák 30 interaktív feladaton!"
      cheatSheetTitle="Nyerő Stratégiák Kisokos"
      cheatSheetCards={cheatSheetCards}
      levels={quizLevels}
      matcherComponent={<MathGamesMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<MathGamesSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      themeColor="rose"
      hintText="💡 Használd a felül megnyitható szabálytárat a kulcsszámokhoz és a szimmetria elvéhez!"
    />
  );
};

export default MathGamesQuiz;

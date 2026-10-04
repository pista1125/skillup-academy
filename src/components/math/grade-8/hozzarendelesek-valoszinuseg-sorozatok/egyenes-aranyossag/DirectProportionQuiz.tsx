import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import {
  TrendingUp,
  LineChart,
  Calculator,
  Compass,
  Award,
  Sparkles,
  HelpCircle,
  Clock,
  DollarSign,
  Scale,
  Activity,
  ArrowRightLeft,
  LayoutGrid
} from 'lucide-react';
import { DirectProportionMatcher } from './DirectProportionMatcher';
import { DirectProportionSorter } from './DirectProportionSorter';

interface DirectProportionQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Az Egyenes Arányosság Képlete',
    icon: <TrendingUp className="w-4 h-4 text-cyan-600" />,
    formula: 'y = k \\cdot x \\iff k = \\frac{y}{x} \\quad (k \\neq 0)',
    note: 'Két mennyiség egyenesen arányos, ha hányadosuk állandó (k). Ahányszorosára nő az egyik, ugyanannyiszorosára nő a másik is.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="10" y="8" width="60" height="34" rx="4" fill="#ecfeff" stroke="#06b6d4" strokeWidth="1" />
        <text x="40" y="24" className="text-[7.5px] font-black fill-cyan-900" textAnchor="middle">y / x = k</text>
        <text x="40" y="35" className="text-[6.5px] font-bold fill-cyan-700" textAnchor="middle">y = k · x</text>
        <path d="M 75 25 L 95 25" stroke="#0891b2" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <text x="125" y="22" className="text-[7px] font-bold fill-slate-700" textAnchor="middle">k: arányossági</text>
        <text x="125" y="33" className="text-[7px] font-bold fill-slate-700" textAnchor="middle">tényező</text>
      </svg>
    )
  },
  {
    id: 'c2',
    title: 'A Grafikon az Origón Halad Át',
    icon: <LineChart className="w-4 h-4 text-blue-600" />,
    formula: 'f(0) = 0 \\implies O(0; 0) \\text{ mindig rajta van!}',
    note: 'Az egyenes arányosság képe mindig egy origón átmenő egyenes. Ha k > 0, emelkedik; ha k < 0, lejt.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <line x1="20" y1="25" x2="80" y2="25" stroke="#94a3b8" strokeWidth="1" />
        <line x1="50" y1="5" x2="50" y2="45" stroke="#94a3b8" strokeWidth="1" />
        <line x1="25" y1="42" x2="75" y2="8" stroke="#0284c7" strokeWidth="1.8" />
        <circle cx="50" cy="25" r="2.5" fill="#0284c7" />
        <text x="45" y="22" className="text-[6px] font-black fill-blue-900">O</text>
        <text x="120" y="20" className="text-[7px] font-bold fill-blue-800" textAnchor="middle">k &gt; 0: emelkedik</text>
        <text x="120" y="32" className="text-[6.5px] fill-slate-500" textAnchor="middle">I. és III. negyed</text>
      </svg>
    )
  },
  {
    id: 'c3',
    title: 'Meredekség és Lépésháromszög',
    icon: <Compass className="w-4 h-4 text-amber-600" />,
    formula: '\\Delta x = 1 \\implies \\Delta y = k',
    note: 'Ha az x tengelyen 1 egységet jobbra lépünk, az y tengelyen pontosan k egységet kell függőlegesen lépnünk a grafikonhoz.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <line x1="25" y1="40" x2="65" y2="40" stroke="#f59e0b" strokeWidth="1.5" />
        <line x1="65" y1="40" x2="65" y2="12" stroke="#ea580c" strokeWidth="1.5" />
        <line x1="20" y1="44" x2="75" y2="6" stroke="#06b6d4" strokeWidth="1.8" />
        <text x="45" y="47" className="text-[6px] font-bold fill-amber-700" textAnchor="middle">+1</text>
        <text x="72" y="28" className="text-[6px] font-bold fill-orange-700">+k</text>
        <text x="120" y="22" className="text-[7px] font-bold fill-amber-800" textAnchor="middle">Meredekség = k</text>
        <text x="120" y="34" className="text-[6.5px] fill-slate-500" textAnchor="middle">k = Δy / Δx</text>
      </svg>
    )
  },
  {
    id: 'c4',
    title: 'Mi NEM Egyenes Arányosság?',
    icon: <Scale className="w-4 h-4 text-rose-600" />,
    formula: 'y = ax + b \\; (b \\neq 0) \\quad \\text{és} \\quad T = a^2 \\; \\text{NEM az!}',
    note: 'Ha a képletben fix hozzáadott érték van (pl. taxi alapdíj: 1000 + 400x) vagy hatványozás (T = a²), a hányados nem állandó.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <line x1="20" y1="40" x2="70" y2="40" stroke="#94a3b8" strokeWidth="1" />
        <line x1="30" y1="45" x2="30" y2="5" stroke="#94a3b8" strokeWidth="1" />
        <line x1="20" y1="28" x2="70" y2="12" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="3 2" />
        <circle cx="30" cy="24.8" r="2" fill="#e11d48" />
        <text x="36" y="24" className="text-[6px] font-bold fill-rose-600">b ≠ 0</text>
        <text x="120" y="22" className="text-[7px] font-black fill-rose-700" textAnchor="middle">b ≠ 0: NEM origó</text>
        <text x="120" y="34" className="text-[6px] fill-slate-500" textAnchor="middle">Hányados nem állandó</text>
      </svg>
    )
  }
];

const levelsConfig: Record<number, LevelConfig> = {
  1: {
    title: '1. Szint: Alapfogalmak és Tulajdonságok',
    description: '10 alapozó feladat az arányossági tényezőről, a képletről és az origón átmenő egyenesről',
    badgeText: '1. Szint • Alapozó',
    badgeColor: 'cyan',
    icon: <TrendingUp className="w-4 h-4 text-cyan-600" />,
    questions: [
      {
        id: 'q1-1',
        title: 'Az egyenes arányosság fogalma',
        question: 'Mikor mondjuk két összefüggő mennyiségről (x és y), hogy egyenesen arányosak?',
        options: [
          'Ha ahányszorosára változik az egyik, pontosan ugyanannyiszorosára változik a másik is (hányadosuk állandó).',
          'Ha az egyik mennyiség nő, akkor a másik mennyiség mindig csökken.',
          'Ha a két mennyiség összege mindig 100.',
          'Ha a két mennyiség szorzata egy állandó szám.'
        ],
        correctAnswer: 0,
        explanation: 'Az egyenes arányosság definíciója szerint a két mennyiség azonos irányban és azonos mértékben változik: összetartozó értékeik hányadosa állandó (y / x = k).'
      },
      {
        id: 'q1-2',
        title: 'Arányossági tényező képlete',
        question: 'Hogyan számítható ki az arányossági tényező (k) az összetartozó x és y értékpárokból?',
        options: [
          'k = y / x',
          'k = x · y',
          'k = y - x',
          'k = x / y²'
        ],
        correctAnswer: 0,
        explanation: 'Az egyenes arányosság hozzárendelési szabálya y = k · x, amiből mindkét oldalt x-szel osztva kapjuk: k = y / x.'
      },
      {
        id: 'q1-3',
        title: 'A grafikon alakja',
        question: 'Milyen alakú az egyenes arányosság grafikonja a derékszögű koordináta-rendszerben?',
        options: [
          'Egyenes, amely mindig átmegy az origón (0; 0).',
          'Tetszőleges egyenes, amely nem mehet át az origón.',
          'Hiperbola görbe a tengelyek között.',
          'Parabola görbe, amelynek csúcsa az origó.'
        ],
        correctAnswer: 0,
        explanation: 'Mivel x = 0 esetén y = k · 0 = 0, a grafikon mindig tartalmazza a (0; 0) origót, így az egyenes arányosság képe mindig egy origón átmenő egyenes.'
      },
      {
        id: 'q1-4',
        title: 'Arányossági tényező kiszámítása',
        question: 'Két mennyiség egyenesen arányos. Ha x = 3 esetén y = 21, mennyi az arányossági tényező (k)?',
        options: [
          '7',
          '18',
          '63',
          '0,14'
        ],
        correctAnswer: 0,
        explanation: 'A hányados állandó: k = y / x = 21 / 3 = 7. A hozzárendelés szabálya: y = 7x.'
      },
      {
        id: 'q1-5',
        title: 'Pozitív k meredeksége',
        question: 'Ha az arányossági tényező pozitív (k > 0, például y = 3x), merre halad a grafikon egyenese?',
        options: [
          'Balról jobbra emelkedik, az I. és III. síknegyeden halad át.',
          'Balról jobbra lejt, a II. és IV. síknegyeden halad át.',
          'Vízszintes egyenes az x tengellyel párhuzamosan.',
          'Függőleges egyenes az y tengellyel párhuzamosan.'
        ],
        correctAnswer: 0,
        explanation: 'Ha k > 0, nagyobb x értékekhez nagyobb y értékek tartoznak (pozitív x-hez pozitív y, negatív x-hez negatív y), így a grafikon az I. és III. negyedben emelkedik.'
      },
      {
        id: 'q1-6',
        title: 'Negatív k meredeksége',
        question: 'Ha az arányossági tényező negatív (k < 0, például y = -2x), merre halad a grafikon?',
        options: [
          'Balról jobbra lejt, a II. és IV. síknegyeden halad át.',
          'Balról jobbra emelkedik, az I. és III. síknegyeden halad át.',
          'Kör alakban záródik az origó körül.',
          'Az I. és II. síknegyedben futó vízszintes vonal.'
        ],
        correctAnswer: 0,
        explanation: 'Ha k < 0, pozitív x-hez negatív y tartozik (IV. negyed), negatív x-hez pedig pozitív y (II. negyed), így a függvény szigorúan monoton csökkenő (balról jobbra lejt).'
      },
      {
        id: 'q1-7',
        title: 'Helyettesítési érték x = 0-nál',
        question: 'Mennyi y értéke x = 0 esetén az y = 8x hozzárendelésnél?',
        options: [
          '0 (az origó miatt: y = 8 · 0 = 0)',
          '8',
          '1',
          'Nem értelmezhető'
        ],
        correctAnswer: 0,
        explanation: 'Bármilyen k esetén: y = k · 0 = 0. Az egyenes arányosság grafikonja kivétel nélkül minden esetben átmegy az origón.'
      },
      {
        id: 'q1-8',
        title: 'Egyszerű vásárlási szabály',
        question: 'Egy kilogramm banán ára 650 Ft. Melyik képlet fejezi ki helyesen az x kg banánért fizetendő y összeget?',
        options: [
          'y = 650 · x',
          'y = 650 + x',
          'y = 650 / x',
          'y = x / 650'
        ],
        correctAnswer: 0,
        explanation: 'A fizetendő összeg egyenesen arányos a vásárolt mennyiséggel: y = egységár · mennyiség = 650 · x.'
      },
      {
        id: 'q1-9',
        title: 'Pont illeszkedése az egyenesre',
        question: 'Melyik pont illeszkedik az y = 2,5x egyenes arányosság grafikonjára?',
        options: [
          'P(4; 10)',
          'Q(2; 7)',
          'R(1; 3,5)',
          'S(3; 6)'
        ],
        correctAnswer: 0,
        explanation: 'Helyettesítsük be az x = 4 értéket: y = 2,5 · 4 = 10. Mivel a pont y koordinátája valóban 10, a P(4; 10) pont rajta van az egyenesen.'
      },
      {
        id: 'q1-10',
        title: 'Arányos sokszorozás',
        question: 'Két mennyiség egyenesen arányos. Ha az egyik mennyiség a 4-szeresére növekszik, hogyan változik a másik mennyiség?',
        options: [
          'Pontosan a 4-szeresére nő.',
          'A negyedére csökken.',
          '4-gyel nő az értéke.',
          'A 16-szorosára nő.'
        ],
        correctAnswer: 0,
        explanation: 'Az egyenes arányosság lényege: ahányszorosára változik az egyik tényező, pontosan ugyanannyiszorosára változik a párja is. Tehát az is a 4-szeresére nő.'
      }
    ]
  },
  2: {
    title: '2. Szint: Számítások, Grafikonok és Értelmezés',
    description: '10 feladat hiányzó értékek kiszámításáról, negatív tényezőről és grafikonok elemzéséről',
    badgeText: '2. Szint • Alkalmazó',
    badgeColor: 'blue',
    icon: <LineChart className="w-4 h-4 text-blue-600" />,
    questions: [
      {
        id: 'q2-1',
        title: 'Táblázat hiányzó elemének kiszámítása',
        question: 'Az x és y mennyiségek között egyenes arányosság van. Tudjuk, hogy x = 5 esetén y = 35. Mennyi y értéke, ha x = 8?',
        options: [
          '56',
          '40',
          '48',
          '64'
        ],
        correctAnswer: 0,
        explanation: 'Először kiszámoljuk az arányossági tényezőt: k = 35 / 5 = 7. Ezután x = 8-ra: y = 7 · 8 = 56.'
      },
      {
        id: 'q2-2',
        title: 'Negatív tényező meghatározása pontból',
        question: 'Egy origón átmenő egyenes tartalmazza a P(-3; 18) pontot. Mennyi a k arányossági tényező, és mi a képlet?',
        options: [
          'k = -6 és y = -6x',
          'k = 6 és y = 6x',
          'k = -15 és y = -15x',
          'k = -0,5 és y = -0,5x'
        ],
        correctAnswer: 0,
        explanation: 'A tényező k = y / x = 18 / (-3) = -6. A hozzárendelés szabálya tehát: y = -6x.'
      },
      {
        id: 'q2-3',
        title: 'Tört arányossági tényező',
        question: 'Ha a hozzárendelési szabály y = (3/4) · x, mennyi y értéke, ha x = 20?',
        options: [
          '15',
          '12',
          '25',
          '16'
        ],
        correctAnswer: 0,
        explanation: 'Helyettesítsük be az x = 20 értéket: y = (3/4) · 20 = 3 · (20 / 4) = 3 · 5 = 15.'
      },
      {
        id: 'q2-4',
        title: 'Visszafelé számolás (x keresése)',
        question: 'Az y = -5x egyenes arányosság esetén melyik x értékhez tartozik y = 35?',
        options: [
          'x = -7',
          'x = 7',
          'x = -175',
          'x = -0,2'
        ],
        correctAnswer: 0,
        explanation: 'Az egyenlet: 35 = -5 · x. Mindkét oldalt osztjuk (-5)-tel: x = 35 / (-5) = -7.'
      },
      {
        id: 'q2-5',
        title: 'Meredekségek összehasonlítása',
        question: 'Az alábbi egyenesek közül melyik emelkedik a legmeredekebben (melyik áll legközelebb a függőleges y tengelyhez)?',
        options: [
          'y = 7x',
          'y = 3x',
          'y = 0,8x',
          'y = 1,5x'
        ],
        correctAnswer: 0,
        explanation: 'Pozitív k esetén minél nagyobb a k arányossági tényező, annál meredekebb az egyenes. A felsoroltak közül k = 7 a legnagyobb.'
      },
      {
        id: 'q2-6',
        title: 'Szögfelező egyenes',
        question: 'Melyik egyenes arányosság grafikonja felezi pontosan az I. és a III. síknegyed 90°-os derékszögét?',
        options: [
          'y = x (ahol k = 1)',
          'y = -x (ahol k = -1)',
          'y = 2x',
          'y = 0,5x'
        ],
        correctAnswer: 0,
        explanation: 'Ha k = 1, akkor x = y minden pontban (pl. (1;1), (2;2)), ami pontosan 45°-os szöget zár be mindkét tengellyel az I. és III. síknegyedben.'
      },
      {
        id: 'q2-7',
        title: 'Egyenletes mozgás útja',
        question: 'Egy vonat állandó 84 km/h sebességgel halad. Mennyi utat (s) tesz meg 2,5 óra (t) alatt?',
        options: [
          '210 km',
          '168 km',
          '190 km',
          '240 km'
        ],
        correctAnswer: 0,
        explanation: 'Az egyenes arányosság képlete: s = v · t = 84 · 2,5 = 210 km.'
      },
      {
        id: 'q2-8',
        title: 'Melyik NEM egyenes arányosság?',
        question: 'Az alábbi képletek közül melyik NEM fejez ki egyenes arányosságot?',
        options: [
          'y = 4x + 5',
          'y = 6x',
          'y = -3,2x',
          'y = (2/7)x'
        ],
        correctAnswer: 0,
        explanation: 'Az y = 4x + 5 egy lineáris függvény, de x = 0 esetén y = 5, tehát NEM megy át az origón, és a hányados sem állandó (pl. 9/1 = 9, de 13/2 = 6,5).'
      },
      {
        id: 'q2-9',
        title: 'Mértékegység-átváltás tényezője',
        question: 'A méterben mért hosszúsághoz (x) hozzárendeljük a milliméterben mért hosszúságot (y). Mennyi az arányossági tényező (k)?',
        options: [
          'k = 1000',
          'k = 100',
          'k = 10',
          'k = 0,001'
        ],
        correctAnswer: 0,
        explanation: 'Mivel 1 m = 1000 mm, ezért y = 1000 · x. Az arányossági tényező k = 1000.'
      },
      {
        id: 'q2-10',
        title: 'Hiányzó koordináta meghatározása',
        question: 'A P(a; -24) pont illeszkedik az y = -8x egyenesre. Mennyi az „a” ismeretlen értéke?',
        options: [
          'a = 3',
          'a = -3',
          'a = 192',
          'a = -16'
        ],
        correctAnswer: 0,
        explanation: 'Behelyettesítve: -24 = -8 · a, amiből mindkét oldalt (-8)-cal osztva: a = -24 / (-8) = 3.'
      }
    ]
  },
  3: {
    title: '3. Szint: Összetett és Szöveges Problémák, Buktatók',
    description: '10 komplex feladat gyakorlati szituációkról, buktatókról és több lépéses számításokról',
    badgeText: '3. Szint • Mester',
    badgeColor: 'emerald',
    icon: <Award className="w-4 h-4 text-emerald-600" />,
    questions: [
      {
        id: 'q3-1',
        title: 'Valós életbeli arányosság felismerése',
        question: 'Az alábbi mindennapi helyzetek közül melyik ír le VALÓDI egyenes arányosságot?',
        options: [
          'Egy benzinkúton tankolt üzemanyag mennyisége és a fizetendő összeg (állandó literár mellett).',
          'Egy taxi viteldíja, ha van 1200 Ft alapdíj és 450 Ft kilométerdíj.',
          'Egy gyermek életkora és a ruhamérete.',
          'Egy négyzet oldalhossza és a négyzet területe.'
        ],
        correctAnswer: 0,
        explanation: 'Csak az üzemanyag vásárlásánál teljesül az állandó hányados és a (0;0) origón áthaladás: 0 literért 0 Ft-ot fizetünk, és kétszer annyi literért kétszer annyit. A taxi alapdíjas, az életkor nem arányos, a terület pedig négyzetes kapcsolat.'
      },
      {
        id: 'q3-2',
        title: 'Négyzet kerülete vs területe',
        question: 'Egy négyzet oldalhosszát a 3-szorosára növeljük. Hogyan változik a négyzet kerülete, illetve területe?',
        options: [
          'A kerület a 3-szorosára nő (egyenes arányosság), a terület a 9-szeresére nő (négyzetes arányosság).',
          'Mind a kerület, mind a terület a 3-szorosára nő.',
          'A kerület a 6-szorosára, a terület a 12-szeresére nő.',
          'A kerület nem változik, a terület a 3-szorosára nő.'
        ],
        correctAnswer: 0,
        explanation: 'K = 4a, így a kerület egyenesen arányos az oldallal: 3-szoros oldalhoz 3-szoros kerület tartozik. A terület viszont T = a², így 3² = 9-szeresére növekszik!'
      },
      {
        id: 'q3-3',
        title: 'Szöveges vásárlási feladat',
        question: 'Egy üzletben 1,6 kg alma 1120 Ft-ba kerül. Mennyit fizetünk 3,5 kg ugyanolyan almáért?',
        options: [
          '2450 Ft',
          '2240 Ft',
          '2560 Ft',
          '2380 Ft'
        ],
        correctAnswer: 0,
        explanation: '1. Egységár (k): 1120 / 1,6 = 700 Ft/kg. 2. 3,5 kg ára: 700 · 3,5 = 2450 Ft.'
      },
      {
        id: 'q3-4',
        title: 'Autó sebessége és ideje',
        question: 'Egy gépkocsi egyenletes sebességgel 45 perc (0,75 óra) alatt 60 km utat tett meg. Hány kilométert tesz meg ugyanezzel a sebességgel 2,5 óra alatt?',
        options: [
          '200 km',
          '180 km',
          '225 km',
          '150 km'
        ],
        correctAnswer: 0,
        explanation: '1. Sebesség: v = s / t = 60 / 0,75 = 80 km/h. 2. Új út: s = 80 · 2,5 = 200 km.'
      },
      {
        id: 'q3-5',
        title: 'Paraméteres pont az egyenesen',
        question: 'Az y = kx egyenes arányosság grafikonja átmegy a Q(k; 64) ponton, ahol k > 0. Mennyi a k arányossági tényező értéke?',
        options: [
          'k = 8',
          'k = 64',
          'k = 32',
          'k = 4'
        ],
        correctAnswer: 0,
        explanation: 'Helyettesítsük be a koordinátákat (x = k, y = 64): 64 = k · k = k². Mivel k > 0, k = √64 = 8.'
      },
      {
        id: 'q3-6',
        title: 'Tartály töltése csappal',
        question: 'Egy kerti medencét kerti csapról töltünk fel. A vízhozam egyenletes: 12 perc alatt 180 liter víz folyt a medencébe. Hány liter víz folyik be 35 perc alatt?',
        options: [
          '525 liter',
          '480 liter',
          '600 liter',
          '450 liter'
        ],
        correctAnswer: 0,
        explanation: '1. Vízhozam percenként: k = 180 / 12 = 15 liter/perc. 2. 35 perc alatt: V = 15 · 35 = 525 liter.'
      },
      {
        id: 'q3-7',
        title: 'Arányos osztás feladat',
        question: '48 000 Ft jutalmat osztunk szét két dolgozó között az elvégzett munkaórák arányában, ami 3 : 5. Mennyi pénzt kap a többet dolgozó munkatárs?',
        options: [
          '30 000 Ft',
          '18 000 Ft',
          '28 000 Ft',
          '32 000 Ft'
        ],
        correctAnswer: 0,
        explanation: 'Az arány részei: 3 + 5 = 8 rész. Egy rész értéke: 48 000 / 8 = 6000 Ft. A többet dolgozó 5 részt kap: 5 · 6000 = 30 000 Ft.'
      },
      {
        id: 'q3-8',
        title: 'Lépésháromszögből képlet írása',
        question: 'Egy origón átmenő egyenesnél ha az x tengely mentén 4 egységet lépünk jobbra, az egyenes eléréséhez 10 egységet kell felfelé lépnünk. Mi az egyenes egyenlete?',
        options: [
          'y = 2,5x',
          'y = 0,4x',
          'y = 4x + 10',
          'y = 10x - 4'
        ],
        correctAnswer: 0,
        explanation: 'A meredekség k = Δy / Δx = 10 / 4 = 2,5. Mivel átmegy az origón, a hozzárendelés szabálya: y = 2,5x.'
      },
      {
        id: 'q3-9',
        title: 'Két egyenes arányosság metszése / különbsége',
        question: 'Adott két egyenes arányosság: f(x) = 4,5x és g(x) = 2x. Melyik x értéknél lesz f(x) értéke 25-tel nagyobb, mint g(x) értéke?',
        options: [
          'x = 10',
          'x = 5',
          'x = 12,5',
          'x = 8'
        ],
        correctAnswer: 0,
        explanation: 'Felírjuk az egyenletet: f(x) - g(x) = 25, azaz 4,5x - 2x = 25. Ebből 2,5x = 25, így x = 25 / 2,5 = 10.'
      },
      {
        id: 'q3-10',
        title: 'Fizikai törvény: Ohm-törvénye',
        question: 'Egy áramkörben az ellenállás állandó: R = 20 Ω. Az Ohm-törvény szerint I = U / R, azaz I = (1/20) · U. Milyen kapcsolat van a feszültség (U) és az áramerősség (I) között?',
        options: [
          'Egyenes arányosság, ahol az arányossági tényező k = 1/20 = 0,05 A/V.',
          'Fordított arányosság, mert tört van a képletben.',
          'Négyzetes arányosság.',
          'Nincs közöttük semmilyen matematikai függvénykapcsolat.'
        ],
        correctAnswer: 0,
        explanation: 'Mivel R állandó, I = (1/R) · U alakú, ami pontosan y = k · x alakú egyenes arányosság! Ha a feszültséget megduplázzuk, az áramerősség is pontosan megduplázódik.'
      }
    ]
  }
};

export const DirectProportionQuiz: React.FC<DirectProportionQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      grade={8}
      chapterId="hozzarendelesek-valoszinuseg-sorozatok"
      topicId="g8-func-direct"
      topicTitle="Egyenes arányosság"
      title="Egyenes Arányosság Kvíz"
      subtitle="Arányossági tényező (k), y = k · x egyenlet, origón átmenő egyenesek és gyakorlati szöveges feladatok"
      badgeText="8. OSZTÁLY • V. HOZZÁRENDELÉSEK"
      badgeColor="cyan"
      themeColor="cyan"
      emoji="📈"
      cheatSheetCards={cheatSheetCards}
      levelsConfig={levelsConfig}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító Játék',
          subtitle: 'Kösd össze az arányossági tényezőket, értékpárokat és hétköznapi képleteket!',
          badgeText: '8 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-cyan-500" />,
          levels: {
            1: {
              title: '1. Szint: Alapfogalmak és Alapösszefüggések',
              subtitle: 'Párosítsd a fogalmakat a képletekkel és tulajdonságaikkal!',
              rangeLabel: 'Párok:',
              range: '8 pár • 16 kártya',
              focus: 'Alapfogalmak'
            },
            2: {
              title: '2. Szint: Értékpárok és Arányossági Tényezők',
              subtitle: 'Számítsd ki a k arányossági tényezőt az összetartozó értékekből!',
              rangeLabel: 'Párok:',
              range: '8 pár • 16 kártya',
              focus: 'Számítások'
            },
            3: {
              title: '3. Szint: Gyakorlati Szituációk és Összefüggések',
              subtitle: 'Párosítsd a valós helyzeteket a megfelelő képlettel!',
              rangeLabel: 'Párok:',
              range: '8 pár • 16 kártya',
              focus: 'Alkalmazások'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz, onSwitchToSorter }) => (
            <DirectProportionMatcher
              key={`dp-matcher-${level}`}
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToQuiz={onSwitchToQuiz}
              onSwitchToSorter={onSwitchToSorter}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        },
        {
          id: 'sorter',
          title: 'Csoportosító',
          subtitle: 'Kategorizáld a képleteket, grafikonokat és gyakorlati arányosságokat!',
          badgeText: '12 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-cyan-500" />,
          levels: {
            1: {
              title: '1. Szint: Képletek és Hozzárendelések Típusa',
              subtitle: 'Csoportosítsd: Egyenes arányosság (k > 0) / Egyenes arányosság (k < 0) / NEM az!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Függvénytípusok'
            },
            2: {
              title: '2. Szint: Grafikon Pontjai és Síknegyedek',
              subtitle: 'Sorold be: I-III. negyed / II-IV. negyed / Nem origón átmenő egyenes!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Grafikonok'
            },
            3: {
              title: '3. Szint: Hétköznapi Kapcsolatok és Arányosságok',
              subtitle: 'Döntsd el: Valódi egyenes arányosság / Fordított vagy négyzetes / Nem arányos!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Gyakorlat'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz, onSwitchToMatcher }) => (
            <DirectProportionSorter
              key={`dp-sorter-${level}`}
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToQuiz={onSwitchToQuiz}
              onSwitchToMatcher={onSwitchToMatcher}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default DirectProportionQuiz;

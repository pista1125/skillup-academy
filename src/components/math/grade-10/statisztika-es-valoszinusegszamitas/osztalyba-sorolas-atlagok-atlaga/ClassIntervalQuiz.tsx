import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { ClassIntervalMatcher } from './ClassIntervalMatcher';
import { ClassIntervalSorter } from './ClassIntervalSorter';
import {
  BenceTrapAverageOfAveragesSvg,
  ClassIntervalHistogramSvg,
  Grade10CohortHeightSvg
} from './ClassIntervalFigures';

interface ClassIntervalQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
  [key: string]: any;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Az átlagok átlaga típushiba (Bence példája)',
    description: 'Csoportok átlagát (x̄₁ és x̄₂) egyszerűen felezni csak egyenlő létszám esetén szabad! Különböző létszámnál a nagyobb csoport maga felé húzza a súlyozott átlagot.',
    note: 'Képlet: x̄_összes = (n₁·x̄₁ + n₂·x̄₂) / (n₁ + n₂).',
    color: 'from-indigo-500 to-purple-600',
    figure: <BenceTrapAverageOfAveragesSvg size={200} />
  },
  {
    title: 'Osztályba sorolás és osztályközepek',
    description: 'Folytonos vagy nagy adathalmazoknál intervallumokat képzünk. Minden osztályt a határainak számtani közepével, az osztályközéppel reprezentálunk: x_közép = (a + b) / 2.',
    note: 'Az osztályozott átlag a gyakoriságokkal súlyozott osztályközepek átlaga.',
    color: 'from-blue-500 to-cyan-600',
    figure: <ClassIntervalHistogramSvg size={200} />
  },
  {
    title: 'Több csoport egyesítése (10. évfolyam magasság)',
    description: 'Négy vagy több részcsoport összevonásakor a csoportok összegeit (nᵢ · x̄ᵢ) adjuk össze, és osztjuk az összlétszámmal (∑ nᵢ).',
    note: 'Évfolyamszintű vagy céges átlagoknál kötelező a súlyozás!',
    color: 'from-emerald-500 to-teal-600',
    figure: <Grade10CohortHeightSvg size={200} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak, osztályközök és osztályközepek',
    subtitle: '10 alapozó feladat az intervallumokról, osztályközepekről és a csoportátlagolás feltételeiről',
    range: '1–10. kérdés',
    focus: 'Osztályközép számítás, diszjunktivitás, egyenlő létszámú csoportok egyszerű átlagolása',
    badgeBg: 'bg-indigo-100 dark:bg-indigo-950/60',
    badgeBorder: 'border-indigo-200 dark:border-indigo-800',
    badgeText: 'text-indigo-800 dark:text-indigo-300',
    accentGradient: 'from-indigo-500 to-purple-600',
    questions: [
      {
        id: 'ciq1-1',
        level: 1,
        question: 'Hogyan számítjuk ki egy [a; b] osztályköz osztályközepét?',
        options: [
          '(a + b) / 2',
          'b - a',
          '√(a · b)',
          '(a · b) / 2'
        ],
        correctAnswer: '(a + b) / 2',
        explanation: 'Az osztályközép az adott intervallum alsó (a) és felső (b) határának egyszerű számtani közepe: (a + b) / 2.',
        hint: 'Add össze a két határt és oszd el kettővel!',
        questionTypeBadge: 'Fogalom'
      },
      {
        id: 'ciq1-2',
        level: 1,
        question: 'Mennyi a [10; 20] intervallum osztályközepe?',
        options: [
          '15',
          '10',
          '20',
          '14,5'
        ],
        correctAnswer: '15',
        explanation: 'Az osztályközép: (10 + 20) / 2 = 30 / 2 = 15.',
        hint: '(10 + 20) / 2 = ?',
        questionTypeBadge: 'Számolás'
      },
      {
        id: 'ciq1-3',
        level: 1,
        question: 'A tankönyvi városi életkoroknál a legfiatalabbak csoportja a [0; 9] év. Mennyi ennek az osztálynak a közepe?',
        options: [
          '4,5 év',
          '5,0 év',
          '4,0 év',
          '9,0 év'
        ],
        correctAnswer: '4,5 év',
        explanation: 'Az alsó határ 0, a felső határ 9: (0 + 9) / 2 = 4,5 év.',
        hint: 'Nulla meg kilenc per kettő.',
        questionTypeBadge: 'Számolás'
      },
      {
        id: 'ciq1-4',
        level: 1,
        question: 'Egy bélyeggyűjtő [1500; 2500] Ft kategóriába sorolta a bélyegei egy részét. Mennyi ennek az osztálynak a közepe?',
        options: [
          '2000 Ft',
          '1000 Ft',
          '1800 Ft',
          '2100 Ft'
        ],
        correctAnswer: '2000 Ft',
        explanation: 'Osztályközép: (1500 + 2500) / 2 = 4000 / 2 = 2000 Ft.',
        hint: '1500 és 2500 számtani közepe 2000.',
        questionTypeBadge: 'Számolás'
      },
      {
        id: 'ciq1-5',
        level: 1,
        question: 'Egy gyárban az izzók élettartamát mérik. A [950; 1000] órás intervallumba 28 izzó esik. Milyen értékkel helyettesítjük ezt a 28 izzót az osztályozott átlag számításakor?',
        options: [
          '975 óra (az osztályközéppel)',
          '950 óra (az alsó határral)',
          '1000 óra (a felső határral)',
          '28 óra (a gyakorisággal)'
        ],
        correctAnswer: '975 óra (az osztályközéppel)',
        explanation: 'Mivel az izzók egyedi pontos élettartama az intervallumon belül nem ismert, az osztályközéppel számolunk: (950 + 1000) / 2 = 975 óra.',
        hint: 'A két határ átlagával, azaz 975-tel reprezentáljuk a csoportot.',
        questionTypeBadge: 'Fogalom'
      },
      {
        id: 'ciq1-6',
        level: 1,
        question: 'Mikor szabad két csoport átlagát egyszerűen összeadni és elosztani kettővel: (x̄₁ + x̄₂) / 2?',
        options: [
          'Csak akkor, ha a két csoport létszáma pontosan egyenlő: n₁ = n₂',
          'Minden esetben, mert az átlagok átlaga mindig az átlag',
          'Csak akkor, ha mindkét átlag egész szám',
          'Soha nem szabad'
        ],
        correctAnswer: 'Csak akkor, ha a két csoport létszáma pontosan egyenlő: n₁ = n₂',
        explanation: 'Az egyszerű átlagolás csak akkor adja a valódi összevont átlagot, ha a csoportok súlya (létszáma) azonos. Eltérő létszámnál kötelező a súlyozott átlag.',
        hint: 'Ha a létszámok megegyeznek, a súlyok kiejtik egymást.',
        questionTypeBadge: 'Tétel'
      },
      {
        id: 'ciq1-7',
        level: 1,
        question: 'Egy iskolában a 10.A osztály (20 diák) matek átlaga 4,0; a 10.B osztály (szintén 20 diák) matek átlaga 5,0. Mennyi a két osztály összevont átlaga?',
        options: [
          '4,5',
          '4,2',
          '4,8',
          '9,0'
        ],
        correctAnswer: '4,5',
        explanation: 'Mivel mindkét osztályban pontosan 20 diák van (n₁ = n₂ = 20), az átlagok átlaga megegyezik a súlyozott átlaggal: (4,0 + 5,0) / 2 = 4,5.',
        hint: 'Egyenlő létszámnál egyszerűen (4 + 5) / 2 = 4,5.',
        questionTypeBadge: 'Számolás'
      },
      {
        id: 'ciq1-8',
        level: 1,
        question: 'Bence az {5, 7} számok átlagát (6) és a {2, 3, 4} számok átlagát (3) egyszerűen átlagolta: (6 + 3) / 2 = 4,5. Helyes volt-e az eljárása?',
        options: [
          'Nem volt helyes, mert a két csoportban eltérő volt a darabszám (2 db és 3 db)',
          'Igen, teljesen helyes volt, gyors fejszámolási trükk',
          'Igen, mert az 5 szám valódi átlaga is 4,5',
          'Csak akkor lett volna helyes, ha a számok növekvő sorban állnak'
        ],
        correctAnswer: 'Nem volt helyes, mert a két csoportban eltérő volt a darabszám (2 db és 3 db)',
        explanation: 'Bence hibázott, mert a 6-os átlag csak 2 számot képvisel, míg a 3-as átlag 3 számot. Súlyozott átlagot kellett volna számolnia.',
        hint: 'A csoportok létszáma nem volt egyenlő (2 ≠ 3).',
        questionTypeBadge: 'Típushiba'
      },
      {
        id: 'ciq1-9',
        level: 1,
        question: 'Mennyi Bence feladatában az öt szám ({5, 7, 2, 3, 4}) valódi számtani közepe?',
        options: [
          '4,2',
          '4,5',
          '4,0',
          '3,8'
        ],
        correctAnswer: '4,2',
        explanation: 'Az adatok összege: 5 + 7 + 2 + 3 + 4 = 21. Az átlag: 21 / 5 = 4,2 (ami kisebb 4,5-nél, mert a 3-as átlagú csoportban többen voltak!).',
        hint: 'Add össze a számokat: 21, majd oszd el 5-tel.',
        questionTypeBadge: 'Számolás'
      },
      {
        id: 'ciq1-10',
        level: 1,
        question: 'Mit jelent a diszjunktivitás elve az adatok osztályba sorolásakor?',
        options: [
          'Minden adat pontosan egyetlen osztályba kell hogy tartozzon (nincs átfedés és nincs kihagyás)',
          'Az osztályok szélességének kötelezően 10-nek kell lennie',
          'Csak páros számú osztályt szabad létrehozni',
          'Minden osztályban pontosan ugyanannyi adatnak kell lennie'
        ],
        correctAnswer: 'Minden adat pontosan egyetlen osztályba kell hogy tartozzon (nincs átfedés és nincs kihagyás)',
        explanation: 'Az osztályba sorolás alapkövetelménye, hogy az intervallumok lefedjék a teljes mintát, és egyetlen adat se tartozhasson egyszerre két különböző osztályba.',
        hint: 'Semmi sem maradhat ki és semmi sem szerepelhet duplán.',
        questionTypeBadge: 'Fogalom'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Csoportátlagok, bérek és súlyozott feladatok',
    subtitle: '10 összetettebb feladat csoportok összevonásáról, izzók élettartamáról és céges bérkategóriákról',
    range: '11–20. kérdés',
    focus: 'Különböző létszámú csoportok súlyozása, fordított létszámkeresés, kosárlabda dobások',
    badgeBg: 'bg-purple-100 dark:bg-purple-950/60',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    badgeText: 'text-purple-800 dark:text-purple-300',
    accentGradient: 'from-purple-500 to-indigo-600',
    questions: [
      {
        id: 'ciq2-1',
        level: 2,
        question: 'Egy iskolában 20 fiú átlagmagassága 175 cm, míg 30 lány átlagmagassága 165 cm. Mennyi az 50 diák összevont átlagmagassága?',
        options: [
          '169 cm',
          '170 cm',
          '168 cm',
          '171 cm'
        ],
        correctAnswer: '169 cm',
        explanation: 'Súlyozott átlag: (20·175 + 30·165) / 50 = (3500 + 4950) / 50 = 8450 / 50 = 169 cm. (Mivel lányból több van, az átlag közelebb van a 165-höz, mint a 175-höz!).',
        hint: '(20·175 + 30·165) / 50 = ?',
        questionTypeBadge: 'Súlyozott átlag'
      },
      {
        id: 'ciq2-2',
        level: 2,
        question: 'Egy 30 fős osztály dolgozatában: 5 diák 5-öst, 10 diák 4-est, 10 diák 3-ast, 5 diák 2-est kapott. Mennyi az osztályátlag?',
        options: [
          '3,50',
          '3,00',
          '3,67',
          '3,40'
        ],
        correctAnswer: '3,50',
        explanation: 'Súlyozott összeg: 5·5 + 10·4 + 10·3 + 5·2 = 25 + 40 + 30 + 10 = 105. Osztályátlag: 105 / 30 = 3,50.',
        hint: '105 pont osztva 30 diákkal.',
        questionTypeBadge: 'Számolás'
      },
      {
        id: 'ciq2-3',
        level: 2,
        question: 'Egy minőségellenőr 200 izzót vizsgált meg. A [950; 1000] órás kategóriába 28 db esett, a többi 172 db legalább 1000 órán át működött. Az izzók hány százaléka érte el a legalább 1000 órás működést?',
        options: [
          '86%',
          '14%',
          '72%',
          '90%'
        ],
        correctAnswer: '86%',
        explanation: 'Relatív gyakoriság: 172 / 200 = 86 / 100 = 86%.',
        hint: '172 osztva 200-zal, százalékban.',
        questionTypeBadge: 'Relatív gyakoriság'
      },
      {
        id: 'ciq2-4',
        level: 2,
        question: 'A 10.A osztályban a 14 fiú átlagmagassága 176 cm, a 18 lányé 170 cm. Mennyi a 10.A osztály 32 diákjának összevont átlagmagassága?',
        options: [
          '172,625 cm',
          '173,0 cm',
          '171,5 cm',
          '172,0 cm'
        ],
        correctAnswer: '172,625 cm',
        explanation: 'Összmagasság: 14·176 + 18·170 = 2464 + 3060 = 5524 cm. Átlag: 5524 / 32 = 172,625 cm.',
        hint: '5524 osztva 32-vel.',
        questionTypeBadge: 'Alkalmazás'
      },
      {
        id: 'ciq2-5',
        level: 2,
        question: 'Egy kosárlabdázó az 1. negyedben 10 dobásból 60%-ot ért el (6 kosár), a 2. negyedben 40 dobásból 20%-ot (8 kosár). Mennyi a teljes meccsre vonatkozó dobószázaléka?',
        options: [
          '28% (nem 40%!)',
          '40% (a 60% és 20% átlaga)',
          '35%',
          '25%'
        ],
        correctAnswer: '28% (nem 40%!)',
        explanation: 'Összes sikeres dobás: 6 + 8 = 14. Összes kísérlet: 10 + 40 = 50. Dobószázalék: 14 / 50 = 28%. A százalékok egyszerű átlagolása ((60+20)/2 = 40%) súlyos típushiba!',
        hint: '14 sikeres dobás az 50 kísérletből.',
        questionTypeBadge: 'Típushiba'
      },
      {
        id: 'ciq2-6',
        level: 2,
        question: 'Egy cég 50 dolgozójának átlagkeresete 358 400 Ft. A 40 éves vagy idősebbek átlaga 380 000 Ft, a 40 évnél fiatalabbaké 320 000 Ft. Hány 40 évnél fiatalabb dolgozó van a cégnél?',
        options: [
          '18 fő',
          '32 fő',
          '25 fő',
          '15 fő'
        ],
        correctAnswer: '18 fő',
        explanation: 'Legyen y a fiatalok száma: 320 000·y + 380 000·(50 - y) = 50 · 358 400. Rendezve: -60 000·y = 17 920 000 - 19 000 000 = -1 080 000, amiből y = 18 fő.',
        hint: 'Írj fel egyenletet a fizetések összegére!',
        questionTypeBadge: 'Egyenlet'
      },
      {
        id: 'ciq2-7',
        level: 2,
        question: 'A fenti cégnél hány 40 éves vagy annál idősebb munkatárs dolgozik?',
        options: [
          '32 fő',
          '18 fő',
          '25 fő',
          '30 fő'
        ],
        correctAnswer: '32 fő',
        explanation: 'Mivel a teljes létszám 50 fő és 18-an fiatalabbak 40 évnél, így 50 - 18 = 32 fő az idősebb.',
        hint: '50 mínusz a fiatalok száma (18).',
        questionTypeBadge: 'Számolás'
      },
      {
        id: 'ciq2-8',
        level: 2,
        question: 'Egy együttes Debrecenben 3250 jegyet adott el 6 825 000 Ft bevételért. Mennyi volt egy debreceni koncertjegy ára?',
        options: [
          '2100 Ft',
          '2200 Ft',
          '1800 Ft',
          '2500 Ft'
        ],
        correctAnswer: '2100 Ft',
        explanation: 'Egy jegy ára: 6 825 000 Ft / 3250 db = 2100 Ft.',
        hint: '6 825 000 osztva 3250-nel.',
        questionTypeBadge: 'Számolás'
      },
      {
        id: 'ciq2-9',
        level: 2,
        question: 'Ha egy dolgozatban minden egyes jegy (1, 2, 3, 4, 5) pontosan négyszer fordul elő (mindegyik gyakorisága 4), mennyi lesz az osztályátlag?',
        options: [
          '3,0',
          '3,5',
          '2,5',
          '4,0'
        ],
        correctAnswer: '3,0',
        explanation: 'Mivel a súlyok (gyakoriságok) pontosan megegyeznek, az átlag a jegyek egyszerű számtani közepe: (1 + 2 + 3 + 4 + 5) / 5 = 15 / 5 = 3,0.',
        hint: 'Egyenlő gyakoriságoknál az egyszerű átlag és a súlyozott átlag megegyezik.',
        questionTypeBadge: 'Tétel'
      },
      {
        id: 'ciq2-10',
        level: 2,
        question: 'Két csoport átlaga x̄₁ = 10 és x̄₂ = 20. A kombinált átlag x̄_összes = 18 lett. Mit mondhatunk a csoportok létszámáról?',
        options: [
          'A 2. csoportban négyszer annyian vannak, mint az 1. csoportban (n₂ = 4·n₁)',
          'A két csoport létszáma egyenlő',
          'Az 1. csoportban vannak többen',
          'Nem lehet megállapítani'
        ],
        correctAnswer: 'A 2. csoportban négyszer annyian vannak, mint az 1. csoportban (n₂ = 4·n₁)',
        explanation: 'A távolság az 1. átlagtól: 18 - 10 = 8. A távolság a 2. átlagtól: 20 - 18 = 2. A létszámarány a távolságok fordított aránya: n₂ / n₁ = 8 / 2 = 4.',
        hint: 'A mérleg-elv szerint az átlagtól vett távolságok fordítottan arányosak a létszámokkal.',
        questionTypeBadge: 'Mérlegelmélet'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Érettségi feladatok és haladó összefüggések',
    subtitle: '10 emelt szintű feladat fordított átlagszámításról, kosárlabda statisztikákról és konvex kombinációról',
    range: '21–30. kérdés',
    focus: 'Emelt érettségi problémák, csoportosítás torzítása, arányok bizonyítása',
    badgeBg: 'bg-emerald-100 dark:bg-emerald-950/60',
    badgeBorder: 'border-emerald-200 dark:border-emerald-800',
    badgeText: 'text-emerald-800 dark:text-emerald-300',
    accentGradient: 'from-emerald-500 to-teal-600',
    questions: [
      {
        id: 'ciq3-1',
        level: 3,
        question: 'Egy cég dolgozóinak átlagéletkora 42,4 év. A férfiak átlaga 46,4 év, a nőké 40,2 év. Nőkből vagy férfiakból dolgozik több a cégnél?',
        options: [
          'Nőkből dolgozik több, mert a cégátlag a női átlaghoz van közelebb',
          'Férfiakból dolgozik több, mert a férfiak átlaga magasabb',
          'Pontosan ugyanannyi férfi és női dolgozó van',
          'A megadott adatokból nem dönthető el'
        ],
        correctAnswer: 'Nőkből dolgozik több, mert a cégátlag a női átlaghoz van közelebb',
        explanation: 'A cégátlag (42,4) a nők átlagától 2,2 évre van, míg a férfiakétól 4,0 évre. Mivel a közös átlag közelebb fekszik a nők átlagához, a nők súlya (létszáma) szükségszerűen nagyobb.',
        hint: 'A nagyobb tömeg maga felé húzza az átlagot a számegyenesen.',
        questionTypeBadge: 'Érettségi'
      },
      {
        id: 'ciq3-2',
        level: 3,
        question: 'A fenti cégnél mennyi a férfi és női dolgozók számának pontos aránya (N_férfi / N_nő)?',
        options: [
          '11 / 20 = 0,55',
          '20 / 11 ≈ 1,82',
          '1 / 2 = 0,50',
          '3 / 4 = 0,75'
        ],
        correctAnswer: '11 / 20 = 0,55',
        explanation: 'A távolságok aránya: (42,4 - 40,2) / (46,4 - 42,4) = 2,2 / 4,0 = 22 / 40 = 11 / 20 = 0,55.',
        hint: 'N_férfi · (46,4 - 42,4) = N_nő · (42,4 - 40,2).',
        questionTypeBadge: 'Érettségi'
      },
      {
        id: 'ciq3-3',
        level: 3,
        question: 'A 2014-es emelt érettségin 7 kosárlabdázó 50 kísérletből összesen 22 sikeres dobást ért el. Mennyi volt a csapat meccsbeli dobószázaléka?',
        options: [
          '44%',
          '38,3%',
          '50%',
          '42%'
        ],
        correctAnswer: '44%',
        explanation: 'A csapat dobószázaléka az összes sikeres dobás és az összes kísérlet hányadosa: 22 / 50 = 0,44 = 44%. Az egyéni dobószázalékok átlaga 38,3% lenne, ami téves!',
        hint: '22 per 50 százalékban.',
        questionTypeBadge: 'Emelt érettségi'
      },
      {
        id: 'ciq3-4',
        level: 3,
        question: 'Miért hordozhat enyhe eltérést az osztályközepekkel számolt átlag a valódi egyéni átlaghoz képest?',
        options: [
          'Mert feltételezi, hogy az osztályba eső adatok számtani közepe pontosan megegyezik az osztályközéppel',
          'Mert az osztályközepeket mindig lefelé kerekítik',
          'Mert a negatív számokat nem lehet osztályba sorolni',
          'Nincs semmilyen eltérés, a két átlag mindig pontosan azonos'
        ],
        correctAnswer: 'Mert feltételezi, hogy az osztályba eső adatok számtani közepe pontosan megegyezik az osztályközéppel',
        explanation: 'Az osztályba sorolás információvesztéssel jár: az osztályon belüli finom eloszlást helyettesítjük a felezőponttal, ami kis mértékű becslési hibát eredményezhet.',
        hint: 'Nem ismerjük az intervallumon belüli pontos egyedi értékeket.',
        questionTypeBadge: 'Elmélet'
      },
      {
        id: 'ciq3-5',
        level: 3,
        question: 'Egy adathalmazhoz hozzáveszünk egy új adatot, a 60-at, így az átlag 1-gyel nő. Majd még egy számot hozzáveszünk, az 54-et, így az átlag további 0,5-del nő. Hány szám volt eredetileg az adathalmazban?',
        options: [
          '8 darab',
          '10 darab',
          '6 darab',
          '12 darab'
        ],
        correctAnswer: '8 darab',
        explanation: 'Legyen az eredeti n szám összege S, átlaga A (S = nA). 1) (S + 60)/(n + 1) = A + 1. 2) (S + 60 + 54)/(n + 2) = A + 1,5. Az egyenletrendszer megoldása: n = 8 és A = 51.',
        hint: 'Írj fel két egyenletet az átlag növekedésére!',
        questionTypeBadge: 'Adatrekonstrukció'
      },
      {
        id: 'ciq3-6',
        level: 3,
        question: 'Mennyi volt a fenti feladatban a számok eredeti átlaga (A) a két szám hozzáadása előtt?',
        options: [
          '51',
          '50',
          '52',
          '48'
        ],
        correctAnswer: '51',
        explanation: 'Az egyenletrendszerből A = 51. Ellenőrzés: 8 szám összege 408 (átlag 51). +60: összeg 468 / 9 = 52 (+1). +54: összeg 522 / 10 = 52,5 (+0,5).',
        hint: '8 · 51 = 408.',
        questionTypeBadge: 'Adatrekonstrukció'
      },
      {
        id: 'ciq3-7',
        level: 3,
        question: 'Egy zenekar 5 városi fellépésén összesen 12 950 jegyet értékesített 26 003 000 Ft összbevételért. Mennyi volt az eladott jegyek átlagos ára egész forintra kerekítve?',
        options: [
          '2008 Ft',
          '2100 Ft',
          '1950 Ft',
          '2050 Ft'
        ],
        correctAnswer: '2008 Ft',
        explanation: 'Átlagos jegyár = Összbevétel / Összes jegy = 26 003 000 Ft / 12 950 db ≈ 2007,95 Ft, azaz kerekítve 2008 Ft.',
        hint: '26 003 000 / 12 950 = ?',
        questionTypeBadge: 'Számolás'
      },
      {
        id: 'ciq3-8',
        level: 3,
        question: 'Mi a matematikai garanciája annak, hogy bármely két csoport súlyozott átlaga mindig a két csoportátlag közé esik: x̄₁ ≤ x̄_összes ≤ x̄₂ (ha x̄₁ ≤ x̄₂)?',
        options: [
          'A súlyok (n₁/N és n₂/N) pozitívak és összegük pontosan 1, így a súlyozott átlag konvex kombináció',
          'Mert a számtani közép mindig pozitív',
          'Mert az átlag mindig megegyezik a mediánnal',
          'Nincs rá garancia, előfordulhat, hogy kívül esik'
        ],
        correctAnswer: 'A súlyok (n₁/N és n₂/N) pozitívak és összegük pontosan 1, így a súlyozott átlag konvex kombináció',
        explanation: 'x̄_összes = (n₁/N)·x̄₁ + (n₂/N)·x̄₂. Mivel a súlyok nemnegatívak és összegük 1, a kombinált átlag szigorúan a két érték által meghatározott szakaszra esik.',
        hint: 'Konvex kombináció tulajdonsága a zárt intervallum.',
        questionTypeBadge: 'Tétel'
      },
      {
        id: 'ciq3-9',
        level: 3,
        question: 'A piacon 5 helyen árulnak őszibarackot: 720 Ft, 800 Ft, 580 Ft, 700 Ft és egy ötödik helyen x Ft-ért. Az öt ár átlaga is szerepel az árak között, és a módusz nem egyenlő a mediánnal. Mennyi x értéke?',
        options: [
          '700 Ft',
          '800 Ft',
          '720 Ft',
          '650 Ft'
        ],
        correctAnswer: '700 Ft',
        explanation: 'Az ismert 4 ár összege 2800 Ft. Ha x = 700, az 5 ár összege 3500 Ft, átlaga 3500 / 5 = 700 Ft (szerepel az árak között!). Ekkor a módusz 700, a rendezett árak: 580, 700, 700, 720, 800 -> medián = 700. Ha a feltétel szerint Mo ≠ Me, akkor az x = 800 adja a megoldást (átlag 720, módusz 800, medián 720 -> Mo ≠ Me).',
        hint: 'Az átlagnak egyenlőnek kell lennie valamelyik árral.',
        questionTypeBadge: 'Emelt szint'
      },
      {
        id: 'ciq3-10',
        level: 3,
        question: 'Igaz-e az az állítás, hogy az osztályba sorolás után az osztályközepekkel számított átlag mindig nagyobb vagy egyenlő a valóságos egyedi átlagnál?',
        options: [
          'Hamis, lehet kisebb, nagyobb vagy egyenlő is az adatok elhelyezkedésétől függően',
          'Igaz, mert a felső határok felhúzzák az értéket',
          'Igaz, Jensen egyenlőtlensége miatt',
          'Hamis, mindig szigorúan kisebb nála'
        ],
        correctAnswer: 'Hamis, lehet kisebb, nagyobb vagy egyenlő is az adatok elhelyezkedésétől függően',
        explanation: 'Ha az osztályon belül az adatok többsége az alsó határ felé sűrűsödik, az osztályközép túlbecsüli az átlagot. Ha a felső határ felé sűrűsödik, alulbecsüli. Ezért a becslési hiba előjele tetszőleges lehet.',
        hint: 'Attól függ, hogy az intervallumon belül merre torzul a gyakoriság.',
        questionTypeBadge: 'Tétel'
      }
    ]
  }
};

export const ClassIntervalQuiz: React.FC<ClassIntervalQuizProps> = (props) => {
  return (
    <QuizTemplate
      title="Osztályba sorolás és átlagok átlaga Kvíz"
      subtitle="Gyakorold az intervallumok, osztályközepek és a helyes súlyozott átlagok számítását!"
      topicId="g10-stat-osztalyba-sorolas-atlagok-quiz"
      topicTitle="Osztályba sorolás, átlagok átlaga"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      matcherComponent={
        <ClassIntervalMatcher
          onBack={props.onBack}
          onSwitchToTheory={props.onSwitchToTheory}
          onSwitchToQuiz={props.onBack}
        />
      }
      sorterComponent={
        <ClassIntervalSorter
          onBack={props.onBack}
          onSwitchToTheory={props.onSwitchToTheory}
          onSwitchToQuiz={props.onBack}
        />
      }
      {...props}
    />
  );
};

export default ClassIntervalQuiz;


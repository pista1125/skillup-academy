import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { ArithmeticGeometricMatcher } from './ArithmeticGeometricMatcher';
import { ArithmeticGeometricSorter } from './ArithmeticGeometricSorter';
import {
  AmGmThalesSvg,
  RectangleSquareComparisonSvg,
  ReciprocalSumGraphSvg
} from './ArithmeticGeometricFigures';

interface ArithmeticGeometricQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Az AM-GM egyenlőtlenség alaptétele',
    description: 'Bármely két pozitív a, b valós szám esetén: (a + b) / 2 ≥ √(a · b). Egyenlőség pontosan akkor és csak akkor áll fenn, ha a = b.',
    note: 'Geometriai jelentés: a Thálész-félkörben az érintési magasság sosem nagyobb a félkör sugaránál.',
    color: 'from-teal-500 to-emerald-600',
    figure: <AmGmThalesSvg size={200} />
  },
  {
    title: 'Szélsőérték aranyszabályok téglalapokra',
    description: 'Állandó kerülethez tartozó téglalapok közül a négyzet területe maximális! Állandó területű téglalapok közül a négyzet kerülete minimális!',
    note: 'Ha a + b = állandó, akkor a · b maximális, ha a = b. Ha a · b = állandó, akkor a + b minimális, ha a = b.',
    color: 'from-amber-500 to-orange-600',
    figure: <RectangleSquareComparisonSvg size={200} />
  },
  {
    title: 'Reciprok-összeg és pénzügyi szorzók',
    description: 'Pozitív számra: a + 1/a ≥ 2 (minimumérték: 2, ha a = 1). Egymást követő évek tőkeszorzói esetén az átlagos éves szorzó a mértani közép: q = √(q₁ · q₂)!',
    note: 'Negatív számra a + 1/a ≤ -2 (maximumérték: -2, ha a = -1).',
    color: 'from-purple-500 to-indigo-600',
    figure: <ReciprocalSumGraphSvg size={200} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és közepek kiszámítása',
    subtitle: '10 alapozó feladat a számtani és mértani közép fogalmáról és alapvető számításairól',
    range: '1–10. kérdés',
    focus: 'Számtani közép képlete, mértani közép gyökvonása és egyszerű számpárok',
    badgeBg: 'bg-teal-100 dark:bg-teal-950/60',
    badgeBorder: 'border-teal-200 dark:border-teal-800',
    badgeText: 'text-teal-800 dark:text-teal-300',
    accentGradient: 'from-teal-500 to-emerald-600',
    questions: [
      {
        id: 'agq1-1',
        level: 1,
        question: 'Hogyan számítjuk ki két valós szám (a és b) számtani közepét?',
        options: [
          '(a + b) / 2',
          '√(a · b)',
          '2 / (1/a + 1/b)',
          '(a · b) / 2'
        ],
        correctAnswer: '(a + b) / 2',
        explanation: 'Két szám számtani középét (aritmetikai közép) az elemek összegének felezésével kapjuk meg: A = (a + b) / 2.',
        hint: 'Add össze a két számot, és oszd el kettővel!',
        questionTypeBadge: 'Fogalom'
      },
      {
        id: 'agq1-2',
        level: 1,
        question: 'Hogyan számítjuk ki két pozitív valós szám (a és b) mértani közepét?',
        options: [
          '√(a · b)',
          '(a + b) / 2',
          '(a · b)²',
          'a² + b²'
        ],
        correctAnswer: '√(a · b)',
        explanation: 'Két pozitív szám mértani középét (geometriai közép) a két szám szorzatának négyzetgyöke adja: G = √(a · b).',
        hint: 'Szorozd össze a két számot, majd vonj belőle négyzetgyököt!',
        questionTypeBadge: 'Fogalom'
      },
      {
        id: 'agq1-3',
        level: 1,
        question: 'Mennyi a 4 és 9 pozitív számok mértani közepe?',
        options: ['6', '6,5', '13', '36'],
        correctAnswer: '6',
        explanation: 'A két szám szorzata 4 · 9 = 36. Ennek négyzetgyöke: √36 = 6.',
        hint: 'Számold ki: √(4 · 9) = √36.',
        questionTypeBadge: 'Számolás'
      },
      {
        id: 'agq1-4',
        level: 1,
        question: 'Mennyi a 2 és 8 számok számtani (A) és mértani (G) közepe?',
        options: [
          'A = 5 és G = 4',
          'A = 4 és G = 5',
          'A = 5 és G = 16',
          'A = 10 és G = 4'
        ],
        correctAnswer: 'A = 5 és G = 4',
        explanation: 'Számtani közép: (2 + 8) / 2 = 10 / 2 = 5. Mértani közép: √(2 · 8) = √16 = 4. Látjuk, hogy A = 5 > G = 4.',
        hint: 'A = (2+8)/2, G = √(2·8).',
        questionTypeBadge: 'Összehasonlítás'
      },
      {
        id: 'agq1-5',
        level: 1,
        question: 'Mennyi a 100 és 400 számok mértani közepe?',
        options: ['200', '250', '300', '150'],
        correctAnswer: '200',
        explanation: 'G = √(100 · 400) = √40000 = 200. (A számtani közép: (100 + 400) / 2 = 250).',
        hint: '√(100 · 400) = √100 · √400 = 10 · 20.',
        questionTypeBadge: 'Számolás'
      },
      {
        id: 'agq1-6',
        level: 1,
        question: 'Milyen feltétel esetén egyenlő két pozitív szám számtani és mértani közepe (A = G)?',
        options: [
          'Akkor és csak akkor, ha a = b',
          'Ha a és b összege páros',
          'Ha a és b szorzata négyzetszám',
          'Minden pozitív számra egyenlőek'
        ],
        correctAnswer: 'Akkor és csak akkor, ha a = b',
        explanation: 'A számtani és mértani közép közötti egyenlőség pontosan akkor és csak akkor áll fenn, ha a két szám azonos: a = b. Ha a ≠ b, akkor A szigorúan nagyobb G-nél.',
        hint: 'Gondolj a bizonyítás utolsó lépésére: (a - b)² = 0 mikor teljesül?',
        questionTypeBadge: 'Tétel'
      },
      {
        id: 'agq1-7',
        level: 1,
        question: 'Mennyi a 18 és 50 számok mértani közepe?',
        options: ['30', '34', '25', '68'],
        correctAnswer: '30',
        explanation: '18 · 50 = 900. Ennek négyzetgyöke: √900 = 30.',
        hint: '18 · 50 = 2 · 9 · 50 = 9 · 100 = 900.',
        questionTypeBadge: 'Számolás'
      },
      {
        id: 'agq1-8',
        level: 1,
        question: 'Egy téglalap két oldala 9 cm és 16 cm. Mekkora annak a négyzetnek az oldala, amelynek a területe megegyezik a téglalapéval?',
        options: ['12 cm', '12,5 cm', '144 cm', '25 cm'],
        correctAnswer: '12 cm',
        explanation: 'A téglalap területe T = 9 · 16 = 144 cm². Az azonos területű négyzet oldala s = √T = √(9 · 16) = 12 cm, ami éppen az oldalak mértani közepe.',
        hint: 'Az azonos területű négyzet oldala a téglalap oldalainak mértani közepe!',
        questionTypeBadge: 'Geometria'
      },
      {
        id: 'agq1-9',
        level: 1,
        question: 'Egy téglalap két oldala 9 cm és 16 cm. Mekkora annak a négyzetnek az oldala, amelynek a kerülete megegyezik a téglalapéval?',
        options: ['12,5 cm', '12 cm', '25 cm', '50 cm'],
        correctAnswer: '12,5 cm',
        explanation: 'A téglalap kerülete K = 2(9 + 16) = 50 cm. A négyzet kerülete 4s = 50 cm, így s = 50 / 4 = 12,5 cm, ami a téglalap oldalainak számtani közepe: (9 + 16) / 2 = 12,5 cm.',
        hint: 'Az azonos kerületű négyzet oldala a két oldal számtani közepe!',
        questionTypeBadge: 'Geometria'
      },
      {
        id: 'agq1-10',
        level: 1,
        question: 'Melyik az a szám, amellyel az 5400 és 24 számokat egyszerre helyettesítve a szorzatuk nem változik meg?',
        options: ['360', '2712', '180', '720'],
        correctAnswer: '360',
        explanation: 'A két szám szorzata 5400 · 24 = 129600. A keresett szám x, amelyre x · x = 129600 ⟹ x = √129600 = 360, vagyis a két szám mértani közepe!',
        hint: 'A keresett szám a két szám mértani közepe: √(5400 · 24).',
        questionTypeBadge: 'Tankönyvi feladat'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Egyenlőtlenség, arányok és szöveges feladatok',
    subtitle: '10 középszintű feladat az egyenlőtlenség alkalmazásáról és a tankönyvi példákról',
    range: '11–20. kérdés',
    focus: 'AM-GM egyenlőtlenség relációja, Antal és Benő bére, hiányzó számok és Thálész-modell',
    badgeBg: 'bg-emerald-100 dark:bg-emerald-950/60',
    badgeBorder: 'border-emerald-200 dark:border-emerald-800',
    badgeText: 'text-emerald-800 dark:text-emerald-300',
    accentGradient: 'from-emerald-500 to-teal-600',
    questions: [
      {
        id: 'agq2-1',
        level: 2,
        question: 'Melyik reláció igaz tetszőleges a, b > 0 pozitív valós számokra?',
        options: [
          '(a + b) / 2 ≥ √(a · b)',
          '(a + b) / 2 ≤ √(a · b)',
          '(a + b) / 2 = √(a · b)',
          '√(a · b) ≥ a + b'
        ],
        correctAnswer: '(a + b) / 2 ≥ √(a · b)',
        explanation: 'A számtani és mértani közép közötti nevezetes tétel kimondja, hogy két pozitív szám számtani közepe mindig nagyobb vagy egyenlő, mint a mértani közepük.',
        hint: 'A számtani közép (A) mindig legalább akkora, mint a mértani közép (G).',
        questionTypeBadge: 'Alaptétel'
      },
      {
        id: 'agq2-2',
        level: 2,
        question: 'Antal és Benő januárban 150 ezer Ft-ot kapott, márciusban 216 ezer Ft-ot. Antal bére mindkét hónapban ugyanannyival nőtt, Benőé mindkét hónapban ugyanannyiszorosára nőtt. Ki kapott több bért februárban?',
        options: [
          'Antal kapott többet (183 ezer Ft > 180 ezer Ft)',
          'Benő kapott többet (185 ezer Ft > 183 ezer Ft)',
          'Pontosan ugyanannyit kaptak (180 ezer Ft mindkettőjüknek)',
          'Nem dönthető el a növekedési ütem ismerete nélkül'
        ],
        correctAnswer: 'Antal kapott többet (183 ezer Ft > 180 ezer Ft)',
        explanation: 'Antal februári bére a számtani közép: (150 + 216) / 2 = 183 ezer Ft. Benő februári bére a mértani közép: √(150 · 216) = √32400 = 180 ezer Ft. Mivel A > G, Antal kapott többet!',
        hint: 'Antal fizetése a számtani közép, Benőé a mértani közép.',
        questionTypeBadge: 'Tankönyvi feladat'
      },
      {
        id: 'agq2-3',
        level: 2,
        question: 'Két pozitív szám számtani közepe 125, mértani közepe 44. Melyik ez a két szám?',
        options: [
          '242 és 8',
          '200 és 50',
          '225 és 25',
          '240 és 10'
        ],
        correctAnswer: '242 és 8',
        explanation: 'A számtani közép 125 ⟹ a + b = 250. A mértani közép 44 ⟹ a · b = 44² = 1936. A 242 és 8 összege 250, szorzata 242 · 8 = 1936. Tehát a két szám: 242 és 8.',
        hint: 'Keress két számot, melyek összege 2 · 125 = 250, szorzata 44² = 1936!',
        questionTypeBadge: 'Hiányzó adatok'
      },
      {
        id: 'agq2-4',
        level: 2,
        question: 'Két pozitív szám számtani közepe 127,5, mértani közepe 126. Melyik ez a két szám?',
        options: [
          '147 és 108',
          '150 és 105',
          '160 és 95',
          '140 és 115'
        ],
        correctAnswer: '147 és 108',
        explanation: 'Összegük: 2 · 127,5 = 255. Szorzatuk: 126² = 15876. A másodfokú egyenlet gyökei: x² - 255x + 15876 = 0 ⟹ (x - 147)(x - 108) = 0. A két szám: 147 és 108.',
        hint: '147 + 108 = 255 és 147 · 108 = 15876 = 126².',
        questionTypeBadge: 'Tankönyvi feladat'
      },
      {
        id: 'agq2-5',
        level: 2,
        question: 'Egy téglalap oldalai 27 cm és 12 cm. Készítünk egy vele azonos kerületű négyzetet (A) és egy vele azonos területű négyzetet (B). Melyik négyzet területe nagyobb?',
        options: [
          'Az azonos kerületű négyzet területe nagyobb (380,25 cm² > 324 cm²)',
          'Az azonos területű négyzet területe nagyobb (361 cm² > 324 cm²)',
          'A két négyzet területe pontosan egyenlő',
          'A téglalap területe mindkét négyzetnél nagyobb'
        ],
        correctAnswer: 'Az azonos kerületű négyzet területe nagyobb (380,25 cm² > 324 cm²)',
        explanation: 'A téglalap területe 27 · 12 = 324 cm², kerülete 2(27 + 12) = 78 cm. Az azonos kerületű négyzet oldala 78 / 4 = 19,5 cm, területe 19,5² = 380,25 cm². Az azonos területű négyzet területe maga a 324 cm². Így 380,25 > 324 cm²!',
        hint: 'Azonos kerületű téglalapok közül a négyzet területe maximális!',
        questionTypeBadge: 'Geometria'
      },
      {
        id: 'agq2-6',
        level: 2,
        question: 'A Thálész-félkörös geometriai bizonyításban az a és b szakaszok találkozási pontjából emelt merőleges magasság (m) mit reprezentál?',
        options: [
          'A két szám mértani közepét: m = √(a · b)',
          'A két szám számtani közepét: m = (a + b) / 2',
          'A két szám különbségét: m = b - a',
          'A félkör sugarát'
        ],
        correctAnswer: 'A két szám mértani közepét: m = √(a · b)',
        explanation: 'A derékszögű háromszögek magasságtétele szerint m² = a · b, amiből m = √(a · b). Ezért az emelt magasság a mértani közép, míg a félkör sugara a számtani közép.',
        hint: 'A magasságtétel szerint a magasság az átfogó két szeletének mértani közepe.',
        questionTypeBadge: 'Bizonyítás'
      },
      {
        id: 'agq2-7',
        level: 2,
        question: 'Ha a = 4, mennyi az a + 1/a kifejezés pontos értéke?',
        options: ['4,25', '4,5', '2', '8'],
        correctAnswer: '4,25',
        explanation: 'a + 1/a = 4 + 1/4 = 4 + 0,25 = 4,25. Ez összhangban van a tétellel, miszerint 4,25 ≥ 2.',
        hint: '4-hez add hozzá a negyedet (0,25).',
        questionTypeBadge: 'Számolás'
      },
      {
        id: 'agq2-8',
        level: 2,
        question: 'Az a - x = x - b számtani aránypárból kifejezve az x-et, melyik középértéket kapjuk?',
        options: [
          'x = (a + b) / 2 (számtani közép)',
          'x = √(a · b) (mértani közép)',
          'x = a - b',
          'x = 2ab / (a + b)'
        ],
        correctAnswer: 'x = (a + b) / 2 (számtani közép)',
        explanation: 'Az egyenletet átrendezve: a + b = 2x ⟹ x = (a + b) / 2. Ezért nevezték a számtani közepet számtani középarányosnak.',
        hint: 'Rendezd át az egyenletet x-re: adj hozzá x-et és b-t!',
        questionTypeBadge: 'Történet'
      },
      {
        id: 'agq2-9',
        level: 2,
        question: 'Az a : x = x : b mértani aránypárból kifejezve a pozitív x-et, melyik középértéket kapjuk?',
        options: [
          'x = √(a · b) (mértani közép)',
          'x = (a + b) / 2 (számtani közép)',
          'x = a / b',
          'x = (a · b)²'
        ],
        correctAnswer: 'x = √(a · b) (mértani közép)',
        explanation: 'A külső és belső tagok szorzata egyenlő: x² = a · b ⟹ x = √(a · b). Ezért nevezték a mértani közepet mértani középarányosnak.',
        hint: 'Törtek egyenlőségénél a keresztbeszorzás: x² = a · b.',
        questionTypeBadge: 'Történet'
      },
      {
        id: 'agq2-10',
        level: 2,
        question: 'Januárban mindkét boltban 25 000 Ft volt a kabát, márciusban 16 000 Ft. Bíró úr fix forintösszeggel, Vígh úr fix százalékkal csökkentette az árat februárban. Melyik boltban volt OLCSÓBB a kabát februárban?',
        options: [
          'Vígh úrnál volt olcsóbb (20 000 Ft < 20 500 Ft)',
          'Bíró úrnál volt olcsóbb (19 500 Ft < 20 000 Ft)',
          'Mindkét boltban pontosan 20 000 Ft volt',
          'Nem határozható meg a százalék ismerete nélkül'
        ],
        correctAnswer: 'Vígh úrnál volt olcsóbb (20 000 Ft < 20 500 Ft)',
        explanation: 'Bíró úr februári ára a számtani közép: (25 000 + 16 000) / 2 = 20 500 Ft. Vígh úr ára a mértani közép: √(25 000 · 16 000) = √400 000 000 = 20 000 Ft. Mivel 20 000 < 20 500, Vígh úrnál volt olcsóbb!',
        hint: 'Számold ki a 25 000 és 16 000 számtani és mértani közepét!',
        questionTypeBadge: 'Tankönyvi feladat'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Szélsőértékek, reciprok-összeg és emelt szint',
    subtitle: '10 komplex feladat telekbekerítésről, kamatos szorzókról és algebrai bizonyításokról',
    range: '21–30. kérdés',
    focus: 'Kerület- és területoptimalizálás, tőkeszaporulat, reciprok-összeg minimuma és ekvivalens alakok',
    badgeBg: 'bg-purple-100 dark:bg-purple-950/60',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    badgeText: 'text-purple-800 dark:text-purple-300',
    accentGradient: 'from-purple-500 to-indigo-600',
    questions: [
      {
        id: 'agq3-1',
        level: 3,
        question: 'Legfeljebb mekkora lehet annak a téglalap alakú teleknek a területe, amelyet 52 méter hosszú kerítéssel tudunk körbekeríteni?',
        options: ['169 m²', '170 m²', '144 m²', '260 m²'],
        correctAnswer: '169 m²',
        explanation: 'A kerület 2a + 2b = 52 ⟹ a + b = 26. Az AM-GM tétel szerint T = ab ≤ ((a+b)/2)² = (26/2)² = 13² = 169 m². Egyenlőség akkor áll fenn, ha a = b = 13 m (négyzet).',
        hint: 'A maximális területű téglalap a négyzet: oldala K / 4 = 52 / 4 = 13 m.',
        questionTypeBadge: 'Szélsőérték'
      },
      {
        id: 'agq3-2',
        level: 3,
        question: 'Legalább mekkora kerítés szükséges egy 100 m² területű téglalap alakú kert bekerítéséhez?',
        options: ['40 m', '20 m', '50 m', '100 m'],
        correctAnswer: '40 m',
        explanation: 'A terület ab = 100 ⟹ √(ab) = 10. A kerület K = 2(a + b) ≥ 4√(ab) = 4 · 10 = 40 m. Minimális kerítés akkor kell, ha a kert négyzet alakú: a = b = 10 m.',
        hint: 'Adott területnél a négyzet kerülete a legkisebb: K = 4 · √T.',
        questionTypeBadge: 'Szélsőérték'
      },
      {
        id: 'agq3-3',
        level: 3,
        question: 'Mi az f(x) = x + 1/x függvény legkisebb lehetséges értéke, ha x szigorúan pozitív valós szám?',
        options: ['2', '1', '0', 'Nincs minimuma, tetszőlegesen kicsi lehet'],
        correctAnswer: '2',
        explanation: 'Az AM-GM egyenlőtlenség szerint (x + 1/x) / 2 ≥ √(x · 1/x) = 1 ⟹ x + 1/x ≥ 2. A minimum pontosan 2, amelyet x = 1/x ⟹ x = 1 esetén ér el.',
        hint: 'Alkalmazd az AM-GM egyenlőtlenséget az x és 1/x számokra!',
        questionTypeBadge: 'Függvény és szélsőérték'
      },
      {
        id: 'agq3-4',
        level: 3,
        question: 'Egy 10 millió Ft-os tőke az első évben 1,21-szeresére, a másodikban 1,69-szeresére nőtt. Mennyi volt az átlagos éves szorzótényező?',
        options: ['1,43', '1,45', '1,35', '1,50'],
        correctAnswer: '1,43',
        explanation: 'A két év alatti összesített szorzó 1,21 · 1,69 = 2,0449. Az átlagos éves szorzó q² = 1,21 · 1,69 ⟹ q = √(1,21 · 1,69) = 1,1 · 1,3 = 1,43 (azaz +43% évente).',
        hint: 'A kamatos növekedés átlagos szorzója a mértani közép: √(1,21 · 1,69).',
        questionTypeBadge: 'Pénzügyek'
      },
      {
        id: 'agq3-5',
        level: 3,
        question: 'Két pozitív szám összege 20. Mekkora a lehetséges maximális szorzatuk?',
        options: ['100', '96', '99', '400'],
        correctAnswer: '100',
        explanation: 'Mivel a + b = 20, ezért √(ab) ≤ (a + b) / 2 = 10 ⟹ ab ≤ 10² = 100. A maximális szorzat 100, amikor a = b = 10.',
        hint: 'Két szám szorzata akkor a legnagyobb, ha egyenlők: 10 · 10.',
        questionTypeBadge: 'Algebra'
      },
      {
        id: 'agq3-6',
        level: 3,
        question: 'Két pozitív szám szorzata 64. Mekkora a lehetséges legkisebb összegük?',
        options: ['16', '20', '32', '65'],
        correctAnswer: '16',
        explanation: 'Mivel ab = 64, ezért (a + b) / 2 ≥ √64 = 8 ⟹ a + b ≥ 16. A minimális összeg 16, amikor a = b = 8.',
        hint: 'Az összeg akkor minimális, ha a két szám megegyezik: 8 + 8.',
        questionTypeBadge: 'Algebra'
      },
      {
        id: 'agq3-7',
        level: 3,
        question: 'Melyik azonosság garantálja az algebrai bizonyításban, hogy (a + b)/2 ≥ √(ab) minden valós számpárra igaz?',
        options: [
          '(a - b)² ≥ 0 minden valós számra',
          'a² + b² = c²',
          '(a + b)² = a² + b²',
          'a² - b² ≥ 0'
        ],
        correctAnswer: '(a - b)² ≥ 0 minden valós számra',
        explanation: 'Az egyenlőtlenséget rendezve: a² + 2ab + b² ≥ 4ab ⟹ a² - 2ab + b² ≥ 0 ⟹ (a - b)² ≥ 0. Mivel bármely valós szám négyzete nemnegatív, a tétel mindig igaz.',
        hint: 'Bármilyen valós számot négyzetre emelve nemnegatív eredményt kapunk.',
        questionTypeBadge: 'Bizonyítás'
      },
      {
        id: 'agq3-8',
        level: 3,
        question: 'Ha x szigorúan negatív valós szám (x < 0), akkor milyen egyenlőtlenség érvényes az x + 1/x összegre?',
        options: [
          'x + 1/x ≤ -2',
          'x + 1/x ≥ -2',
          'x + 1/x ≥ 0',
          'x + 1/x ≤ 0'
        ],
        correctAnswer: 'x + 1/x ≤ -2',
        explanation: 'Legyen u = -x > 0. Ekkor x + 1/x = -u - 1/u = -(u + 1/u). Mivel u + 1/u ≥ 2, negatívval szorozva az egyenlőtlenség megfordul: x + 1/x ≤ -2. Egyenlőség x = -1-nél áll fenn.',
        hint: 'A pozitív tartományban kapott ≥ 2 eredmény mínusz egyszerese: ≤ -2.',
        questionTypeBadge: 'Emelt szint'
      },
      {
        id: 'agq3-9',
        level: 3,
        question: 'Két egymást követő évben azonos p% béremelést kapunk. Így a fizetésünk ugyanannyival nő, mintha az 1. évben 10%-kal csökkent, a 2. évben 60%-kal nőtt volna. Hány százalék volt az éves béremelés (p)?',
        options: ['20%', '25%', '15%', '18%'],
        correctAnswer: '20%',
        explanation: 'A kétlépcsős változás szorzója: (1 - 0,10)(1 + 0,60) = 0,90 · 1,60 = 1,44. Két azonos p% emelés esetén a szorzó: (1 + p/100)². Tehát (1 + p/100)² = 1,44 ⟹ 1 + p/100 = 1,20 ⟹ p = 20%!',
        hint: 'Számold ki: √(0,9 · 1,6) = √1,44 = 1,2.',
        questionTypeBadge: 'Tankönyvi feladat'
      },
      {
        id: 'agq3-10',
        level: 3,
        question: 'Melyik esetben nő jobban a fizetésünk: ha két egymást követő hónapban 5% és 5% emelést kapunk, vagy ha az első hónapban 8%, a másodikban 2% emelést?',
        options: [
          'Az 5% és 5% a kedvezőbb (1,1025 > 1,1016)',
          'A 8% és 2% a kedvezőbb (1,105 > 1,1025)',
          'Teljesen egyenlő a két eset, mert 5 + 5 = 8 + 2 = 10%',
          'A kezdő fizetés nagyságától függ'
        ],
        correctAnswer: 'Az 5% és 5% a kedvezőbb (1,1025 > 1,1016)',
        explanation: 'Az 1. eset szorzója: 1,05 · 1,05 = 1,1025 (+10,25%). A 2. eset szorzója: 1,08 · 1,02 = 1,1016 (+10,16%). Mivel 1,1025 > 1,1016, a két egyenlő 5%-os emelés a kedvezőbb! Ez az AM-GM egyenlőtlenség közvetlen következménye: azonos összeg mellett a szorzat akkor maximális, ha a tényezők egyenlőek.',
        hint: 'Hasonlítsd össze az 1,05² és az 1,08 · 1,02 szorzatokat!',
        questionTypeBadge: 'Gyakorlati optimalizálás'
      }
    ]
  }
};

export const ArithmeticGeometricQuiz: React.FC<ArithmeticGeometricQuizProps> = (props) => {
  return (
    <QuizTemplate
      title="Számtani és mértani közép Kvíz"
      subtitle="Gyakorold a számtani és mértani közép kiszámítását, az egyenlőtlenség alkalmazását és a szélsőérték-feladatokat!"
      topicId="g10-stat-szamtani-mertani-kozep-quiz"
      topicTitle="Számtani közép, mértani közép"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      matcherComponent={
        <ArithmeticGeometricMatcher
          onBack={props.onBack}
          onSwitchToTheory={props.onSwitchToTheory}
          onSwitchToQuiz={props.onBack}
        />
      }
      sorterComponent={
        <ArithmeticGeometricSorter
          onBack={props.onBack}
          onSwitchToTheory={props.onSwitchToTheory}
          onSwitchToQuiz={props.onBack}
        />
      }
      {...props}
    />
  );
};

export default ArithmeticGeometricQuiz;


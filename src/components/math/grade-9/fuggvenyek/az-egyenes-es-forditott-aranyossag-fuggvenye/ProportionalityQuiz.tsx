import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { ProportionalityMatcher } from './ProportionalityMatcher';
import { ProportionalitySorter } from './ProportionalitySorter';
import {
  DirectProportionalitySvg,
  InverseProportionalitySvg,
  ProportionalityComparisonSvg
} from './ProportionalityFigures';
import { TrendingUp, Shuffle, Scale, Compass, CheckCircle2, AlertTriangle } from 'lucide-react';

interface ProportionalityQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Arányossági Alapok és Képletek (Könnyű)',
    subtitle: 'Egyenes és fordított arányosság felismerése, grafikonok formája és alapvető tulajdonságai.',
    range: '1 - 10. feladat',
    focus: 'Alapfogalmak és Képletek',
    questions: [
      {
        id: 'prq1-1',
        questionTypeBadge: 'Képlet Felismerése',
        question: 'Melyik függvény fejezi ki az egyenes arányosságot x és y között?',
        figure: <DirectProportionalitySvg size={240} />,
        options: [
          'y = 3x',
          'y = 3 / x',
          'y = 3x + 2',
          'y = 3 - x'
        ],
        correctAnswer: 0,
        hint: 'Az egyenes arányosság általános képlete y = k · x, ahol nincs hozzáadott konstans tag.',
        explanation: 'Az egyenes arányosság képlete y = k · x (itt k = 3). Az y = 3x + 2 már eltolt lineáris függvény, míg az y = 3/x fordított arányosság.'
      },
      {
        id: 'prq1-2',
        questionTypeBadge: 'Grafikon Formája',
        question: 'Mi a fordított arányosság (g(x) = k / x) függvény grafikonjának a neve és alakja?',
        figure: <InverseProportionalitySvg size={240} />,
        options: [
          'Kétágú hiperbola, amely a koordinátatengelyekhez simul',
          'Origón átmenő egyenes vonal',
          'U alakú parabola',
          'Körív az origó körül'
        ],
        correctAnswer: 0,
        hint: 'A tört alakú g(x) = k/x függvény két szimmetrikus görbe ágból áll.',
        explanation: 'A fordított arányosság grafikonja a hiperbola. Két különálló ágból áll, melyek sosem érik el a tengelyeket (az x=0 és y=0 egyenesek az aszimptotái).'
      },
      {
        id: 'prq1-3',
        questionTypeBadge: 'Állandó Invariáns',
        question: 'Mi az állandó (konstans) két egymással egyenesen arányos változó között?',
        options: [
          'A hányadosuk: y / x = k',
          'A szorzatuk: x · y = k',
          'Az összegük: x + y = k',
          'A különbségük: y - x = k'
        ],
        correctAnswer: 0,
        hint: 'Ha x kétszeresére nő, y is kétszeresére nő, így a hányadosuk nem változik.',
        explanation: 'Egyenes arányosság esetén ha az egyik változót n-szeresére növeljük, a másik is n-szeresére nő. Ezért hányadosuk (y / x) mindig állandó k érték.'
      },
      {
        id: 'prq1-4',
        questionTypeBadge: 'Állandó Invariáns',
        question: 'Mi az állandó (konstans) két egymással fordítottan arányos változó között?',
        options: [
          'A szorzatuk: x · y = k',
          'A hányadosuk: y / x = k',
          'Az összegük: x + y = k',
          'A négyzetük összege: x² + y² = k'
        ],
        correctAnswer: 0,
        hint: 'Ha x n-szeresére nő, y az n-ed részére csökken. Így a szorzatuk változatlan marad.',
        explanation: 'Fordított arányosság esetén ha az egyik változót szorozzuk n-nel, a másik osztódik n-nel. Ennek következtében a szorzatuk (x · y = k) állandó.'
      },
      {
        id: 'prq1-5',
        questionTypeBadge: 'Értelmezési Tartomány',
        question: 'Miért NEM lehet a fordított arányosság függvényében x = 0 (miért D_g = ℝ \\ {0})?',
        options: [
          'Mert a nevezőben x áll, és a matematikában nullával osztani tilos',
          'Mert a negatív számok nem ábrázolhatók',
          'Mert a grafikon át kell hogy menjen az origón',
          'Mert a 0 nem valós szám'
        ],
        correctAnswer: 0,
        hint: 'A képlet g(x) = k / x: x a nevezőben van.',
        explanation: 'A képletben x a tört nevezőjében szerepel. Nullával való osztás nincs értelmezve a valós számok körében, így x = 0-t kötelező kizárni az értelmezési tartományból.'
      },
      {
        id: 'prq1-6',
        questionTypeBadge: 'Origón Áthaladás',
        question: 'Áthalad-e az origón (a (0; 0) ponton) az egyenes arányosság grafikonja?',
        options: [
          'Igen, minden f(x) = k · x egyenes áthalad az origón (0-hoz 0 tartozik)',
          'Nem, csak a pozitív tengelyt metszi',
          'Csak akkor, ha k = 1',
          'Soha nem érheti el az origót'
        ],
        correctAnswer: 0,
        hint: 'Számold ki f(0) értékét: k · 0 = ?',
        explanation: 'f(0) = k · 0 = 0. Tehát az egyenes arányosság grafikonja kivétel nélkül mindig átmegy a (0; 0) origón.'
      },
      {
        id: 'prq1-7',
        questionTypeBadge: 'Hétköznapi Példa',
        question: 'Melyik állítás ír le egyenes arányosságot a való életből?',
        figure: <ProportionalityComparisonSvg size={240} />,
        options: [
          'Ha kétszer annyi kilogramm almát vásárolunk a piacon, pontosan kétszer annyit fizetünk',
          'Ha kétszer több munkás dolgozik ugyanazon a házon, feleannyi idő alatt készül el',
          'Egy ember életkora és cipőmérete közötti összefüggés',
          'Egy könyv elolvasásának ideje a lapozási sebesség függvényében'
        ],
        correctAnswer: 0,
        hint: 'Egyenes arányosság: ha a bemenet duplázódik, a kimenet is pontosan duplázódik.',
        explanation: 'Az alma ára és tömege egyenes arányos, mert a fizetendő összeg = egységár · tömeg (állandó egységár).'
      },
      {
        id: 'prq1-8',
        questionTypeBadge: 'Hétköznapi Példa',
        question: 'Melyik állítás ír le fordított arányosságot a való életből?',
        options: [
          'Ha egy autó kétszer akkora átlagsebességgel halad, feleannyi idő alatt teszi meg ugyanazt a távolságot',
          'Ha kétszer hosszabb ideig dolgozunk fix órabérben, kétszer több fizetést kapunk',
          'Ha kétszer annyi füzetet veszünk a boltban, kétszer annyit fizetünk',
          'A négyzet kerülete az oldalának hosszától'
        ],
        correctAnswer: 0,
        hint: 'Adott fix úthoz (s): t = s / v. Ha a sebesség (v) nő, az idő (t) arányosan csökken.',
        explanation: 'A menetidő t = s / v. Ha a sebességet megszorozzuk kettővel, az idő a felére csökken. Szorzatuk (v · t = s) állandó távolság.'
      },
      {
        id: 'prq1-9',
        questionTypeBadge: 'Monotonitás és k Előjele',
        question: 'Hogyan viselkedik az f(x) = -4x egyenes arányosság függvény?',
        options: [
          'Szigorúan monoton csökken a valós számok teljes halmazán',
          'Szigorúan monoton nő a valós számok halmazán',
          'Állandó értéket vesz fel mindenütt',
          'U alakú és van minimuma'
        ],
        correctAnswer: 0,
        hint: 'Mivel a meredeksége k = -4 negatív, balról jobbra haladva az egyenes lefelé tart.',
        explanation: 'Ha k < 0, a szorzó negatív, így nagyobb x-ekhez kisebb f(x) értékek tartoznak: a függvény szigorúan monoton csökkenő.'
      },
      {
        id: 'prq1-10',
        questionTypeBadge: 'Síknegyedek Azonosítása',
        question: 'A g(x) = 6 / x függvény grafikonjának ágai melyik síknegyedekben helyezkednek el?',
        options: [
          'Az I. és III. síknegyedben',
          'A II. és IV. síknegyedben',
          'Csak az I. síknegyedben',
          'Minden síknegyeden áthalad'
        ],
        correctAnswer: 0,
        hint: 'k = +6 > 0. Ha x > 0, akkor y > 0 (I. negyed). Ha x < 0, akkor y < 0 (III. negyed).',
        explanation: 'Mivel k = 6 pozitív, pozitív x-hez pozitív y tartozik (I. negyed: +, +), negatív x-hez negatív y tartozik (III. negyed: -, -).'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Arányossági Tényező és Számítások (Közepes)',
    subtitle: 'A k paraméter kiszámítása pontokból, hiányzó táblázatértékek, előjelek és negyedek.',
    range: '11 - 20. feladat',
    focus: 'k Számítása és Hiányzó Értékek',
    questions: [
      {
        id: 'prq2-1',
        questionTypeBadge: 'k Meghatározása Egyenesnél',
        question: 'Egy egyenes arányosság grafikonja átmegy a P(4; 28) ponton. Mennyi az arányossági tényező (k), és mi a képlet?',
        options: [
          'k = 7, a képlet: f(x) = 7x',
          'k = 24, a képlet: f(x) = x + 24',
          'k = 112, a képlet: f(x) = 112x',
          'k = 0.14, a képlet: f(x) = x / 7'
        ],
        correctAnswer: 0,
        hint: 'Egyenes arányosságnál: k = y / x.',
        explanation: 'k = y / x = 28 / 4 = 7. A hozzárendelési szabály tehát: f(x) = 7x.'
      },
      {
        id: 'prq2-2',
        questionTypeBadge: 'k Meghatározása Fordítottnál',
        question: 'Egy fordított arányosság hiperbolája átmegy a Q(5; 6) ponton. Mennyi az arányossági tényező (k), és mi a függvény hozzárendelési szabálya?',
        options: [
          'k = 30, a szabály: g(x) = 30 / x',
          'k = 1.2, a szabály: g(x) = 1.2 / x',
          'k = 11, a szabály: g(x) = 11 - x',
          'k = 30, a szabály: g(x) = 30x'
        ],
        correctAnswer: 0,
        hint: 'Fordított arányosságnál: k = x · y.',
        explanation: 'k = x · y = 5 · 6 = 30. A függvény hozzárendelési szabálya tehát: g(x) = 30 / x.'
      },
      {
        id: 'prq2-3',
        questionTypeBadge: 'Hiányzó Érték Számítása',
        question: 'Az f(x) = -3x egyenes arányosság függvényben melyik x értékhez tartozik az y = 15 függvényérték?',
        options: ['x = -5', 'x = 5', 'x = -45', 'x = 12'],
        correctAnswer: 0,
        hint: 'Oldd meg a -3x = 15 egyenletet.',
        explanation: '-3x = 15 ➔ x = 15 / (-3) = -5.'
      },
      {
        id: 'prq2-4',
        questionTypeBadge: 'Hiányzó Érték Számítása',
        question: 'A g(x) = 24 / x fordított arányosságnál mennyi az y értéke, ha x = -6?',
        options: ['y = -4', 'y = 4', 'y = -144', 'y = 18'],
        correctAnswer: 0,
        hint: 'Helyettesíts be: y = 24 / (-6).',
        explanation: 'y = 24 / (-6) = -4. A pont a síkon: (-6; -4).'
      },
      {
        id: 'prq2-5',
        questionTypeBadge: 'Negatív k Fordítottnál',
        question: 'Melyik síknegyedekben helyezkedik el a g(x) = -8 / x függvény grafikonja?',
        options: [
          'A II. és IV. síknegyedben',
          'Az I. és III. síknegyedben',
          'Csak a II. síknegyedben',
          'Az I. és II. síknegyedben'
        ],
        correctAnswer: 0,
        hint: 'k = -8 < 0. Ha x > 0, y < 0 (IV. negyed: +, -). Ha x < 0, y > 0 (II. negyed: -, +).',
        explanation: 'Negatív k esetén ellentétes előjelű párok jönnek létre: (+; -) a IV. síknegyed, míg (-; +) a II. síknegyed.'
      },
      {
        id: 'prq2-6',
        questionTypeBadge: 'Pontilleszkedés Ellenőrzése',
        question: 'Rajta van-e az A(-3; -12) pont az f(x) = 4x egyenesen, és rajta van-e a B(4; 9) pont a g(x) = 36 / x hiperbolán?',
        options: [
          'Mindkét pont rajta van a saját grafikonján',
          'Csak az A pont van rajta',
          'Csak a B pont van rajta',
          'Egyik pont sincs rajta'
        ],
        correctAnswer: 0,
        hint: 'Ellenőrizd: f(-3) = 4·(-3) = -12? És g(4) = 36 / 4 = 9?',
        explanation: 'f(-3) = 4 · (-3) = -12 (stimmel!), g(4) = 36 / 4 = 9 (stimmel!). Mindkét pont pontosan illeszkedik.'
      },
      {
        id: 'prq2-7',
        questionTypeBadge: 'Nem Arányosság Azonosítása',
        question: 'Melyik összefüggés NEM jelent sem egyenes, sem fordított arányosságot?',
        options: [
          'y = 2x + 3',
          'y = 5x',
          'y = 10 / x',
          'y = -0.5x'
        ],
        correctAnswer: 0,
        hint: 'Keresd azt a képletet, ahol van egy hozzáadott állandó tag (nem megy át az origón és a szorzat sem állandó).',
        explanation: 'Az y = 2x + 3 egy eltolt lineáris függvény. Mivel f(0) = 3 ≠ 0, nem egyenes arányosság, és mivel x·y sem állandó, nem fordított arányosság.'
      },
      {
        id: 'prq2-8',
        questionTypeBadge: 'Értékkészlet Fordítottnál',
        question: 'Mi a g(x) = 15 / x fordított arányosság függvény értékkészlete (R_g)?',
        options: [
          'R_g = ℝ \\ {0} (a nullán kívül minden valós számot felvehet)',
          'R_g = ℝ (minden valós szám, a 0-t is)',
          'R_g = [0; ∞[ (csak nemnegatív számok)',
          'R_g = ]-∞; 15]'
        ],
        correctAnswer: 0,
        hint: 'Lehet-e egy tört értéke 0, ha a számlálója 15 és nem 0?',
        explanation: 'A számláló 15 sosem lehet 0, így egyetlen valós számra sem vehet fel 0 értéket a tört: g(x) ≠ 0. Az értékkészlet tehát R_g = ℝ \\ {0}.'
      },
      {
        id: 'prq2-9',
        questionTypeBadge: 'Szimmetria Tulajdonság',
        question: 'Milyen szimmetriával rendelkezik a g(x) = k / x fordított arányosság grafikonja az origóra nézve?',
        options: [
          'Origóra középpontosan szimmetrikus (páratlan függvény: g(-x) = -g(x))',
          'Az y tengelyre tengelyesen szimmetrikus (páros függvény)',
          'Az x tengelyre tükrös',
          'Semmilyen szimmetriája sincs'
        ],
        correctAnswer: 0,
        hint: 'g(-x) = k / (-x) = -(k / x) = -g(x).',
        explanation: 'Mivel g(-x) = -g(x), a fordított arányosság páratlan függvény, grafikonja középpontosan szimmetrikus az origóra.'
      },
      {
        id: 'prq2-10',
        questionTypeBadge: 'Táblázat Elemzése',
        question: 'Egy táblázatban az (x; y) értékpárok: (2; 18), (3; 12), (6; 6), (9; 4). Milyen összefüggés van x és y között?',
        options: [
          'Fordított arányosság, mert a szorzatuk állandó: x · y = 36',
          'Egyenes arányosság, mert ha x nő, y is változik',
          'Lineáris függvény, amelynek egyenlete y = 20 - x',
          'Véletlenszerű adatok, nincs matematikai szabály'
        ],
        correctAnswer: 0,
        hint: 'Számold ki minden párra a szorzatot: 2·18, 3·12, 6·6, 9·4.',
        explanation: '2·18 = 36, 3·12 = 36, 6·6 = 36, 9·4 = 36. Mivel a szorzat minden pontnál pontosan 36, a kapcsolat fordított arányosság: y = 36 / x.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Szöveges Feladatok és Összetett Elemzés (Nehéz)',
    subtitle: 'Életszerű munkavégzési, fizikai és geometriai problémák, függvények metszéspontja és paraméteres egyenletek.',
    range: '21 - 30. feladat',
    focus: 'Szöveges Modellfeladatok és Metszéspontok',
    questions: [
      {
        id: 'prq3-1',
        questionTypeBadge: 'Munkaidő Modell',
        question: '6 munkás egy munka elvégzésével 8 óra alatt végezne. Hány óra alatt végezne ugyanezzel a munkával 4 munkás (ha egyenletes tempóban dolgoznak)?',
        options: ['12 óra', '10 óra', '5.33 óra', '16 óra'],
        correctAnswer: 0,
        hint: 'A munkások száma és az idő szorzata az összmunkát adja (emberóra). Számold ki a k konstans szorzatot!',
        explanation: 'Fordított arányosság: k = 6 munkás · 8 óra = 48 emberóra. 4 munkás esetén: t = 48 / 4 = 12 óra.'
      },
      {
        id: 'prq3-2',
        questionTypeBadge: 'Sebesség és Menetidő',
        question: 'Egy vonat 90 km/h átlagsebességgel 4 óra alatt teszi meg a két város közötti távolságot. Mekkora sebességgel kellene haladnia, hogy 3 óra alatt megtegye ugyanezt az utat?',
        options: ['120 km/h', '110 km/h', '100 km/h', '135 km/h'],
        correctAnswer: 0,
        hint: 'A távolság fix: s = v · t = 90 · 4 km. Ezt kell elosztani az új idővel.',
        explanation: 'A távolság: s = 90 · 4 = 360 km. Az új sebesség: v = s / t = 360 / 3 = 120 km/h.'
      },
      {
        id: 'prq3-3',
        questionTypeBadge: 'Téglalap Terület és Oldalak',
        question: "Egy téglalap területe állandó T = 48 cm². Hogyan változik a 'b' oldal hossza, ha az 'a' oldal hosszát 3-szorosára növeljük?",
        options: [
          'A harmadára csökken (b_új = b / 3)',
          'A háromszorosára nő',
          '3 cm-rel csökken',
          'Nem változik'
        ],
        correctAnswer: 0,
        hint: 'a · b = 48. Ha a-t megszorozzuk 3-mal, mivel kell szorozni b-t, hogy a szorzat 48 maradjon?',
        explanation: 'Mivel a · b = állandó (fordított arányosság), ha az egyik tényezőt megszorozzuk 3-mal, a másik tényezőnek a harmadára (1/3-ára) kell csökkennie.'
      },
      {
        id: 'prq3-4',
        questionTypeBadge: 'Két Függvény Metszéspontja',
        question: 'Hol metszi egymást az f(x) = 2x egyenes és a g(x) = 18 / x hiperbola a pozitív valós számok tartományán (I. síknegyed)?',
        options: ['A (3; 6) pontban', 'A (6; 3) pontban', 'A (3; 9) pontban', 'A (9; 18) pontban'],
        correctAnswer: 0,
        hint: 'Egyenlítsd ki a két függvényértéket: 2x = 18 / x. Szorozz be x-szel!',
        explanation: '2x = 18 / x ➔ 2x² = 18 ➔ x² = 9 ➔ x = 3 (mivel x > 0). f(3) = 2 · 3 = 6. A metszéspont koordinátái: (3; 6).'
      },
      {
        id: 'prq3-5',
        questionTypeBadge: 'Összes Metszéspont Száma',
        question: 'Hány metszéspontja van az f(x) = x egyenesnek és a g(x) = 4 / x hiperbolának a teljes értelmezési tartományukon?',
        options: [
          'Pontosan 2 metszéspontja: (2; 2) és (-2; -2)',
          'Csak 1 metszéspontja az origóban',
          'Végtelen sok metszéspontja',
          'Nincs metszéspontjuk'
        ],
        correctAnswer: 0,
        hint: 'x = 4 / x ➔ x² = 4. Ennek két valós gyöke van: x = 2 és x = -2.',
        explanation: 'x = 4 / x ➔ x² = 4 ➔ x₁ = 2, x₂ = -2. A pontok: (2; 2) az I. negyedben és (-2; -2) a III. negyedben.'
      },
      {
        id: 'prq3-6',
        questionTypeBadge: 'Paraméteres Feladat',
        question: 'Az f(x) = k · x és a g(x) = k / x függvényekben a k paraméter ugyanaz a pozitív szám. Melyik pontban metszi egymást a két grafikon az I. síknegyedben?',
        options: [
          'Mindig az x = 1 helyen, az (1; k) pontban',
          'Mindig az (k; 1) pontban',
          'Mindig az origóban (0; 0)',
          'Nem metszik egymást, mert k pozitív'
        ],
        correctAnswer: 0,
        hint: 'kx = k / x ➔ oszd el k-val (k > 0): x = 1/x ➔ x² = 1.',
        explanation: 'kx = k / x ➔ x² = 1 ➔ x = 1 (mivel I. negyed). f(1) = k · 1 = k. A metszéspont tehát mindig az (1; k) pont, tetszőleges k > 0 esetén.'
      },
      {
        id: 'prq3-7',
        questionTypeBadge: 'Medence Feltöltése Csapokkal',
        question: '3 egyforma vízcsap 10 óra alatt tölt fel egy medencét. Hány óra alatt töltené fel a medencét 5 ugyanilyen vízcsap?',
        options: ['6 óra alatt', '7 óra alatt', '4 óra alatt', '8 óra alatt'],
        correctAnswer: 0,
        hint: 'Csapok száma és idő szorzata állandó: k = 3 · 10 = 30.',
        explanation: 'Fordított arányosság: k = 3 csap · 10 óra = 30 csapóra. 5 csap esetén az idő: t = 30 / 5 = 6 óra.'
      },
      {
        id: 'prq3-8',
        questionTypeBadge: 'Fogaskerekek Áttétele',
        question: 'Egy 20 fogú fogaskerék percenként 60 fordulatot tesz meg, miközben hajt egy vele összekapcsolt 30 fogú fogaskereket. Hány fordulatot tesz meg percenként a 30 fogú kerék?',
        options: ['40 fordulatot', '90 fordulatot', '50 fordulatot', '45 fordulatot'],
        correctAnswer: 0,
        hint: 'A fogak száma és a fordulatszám szorzata állandó (az elmozduló fogak száma azonos: fog · fordulat = állandó).',
        explanation: 'Fordított arányosság: 20 fog · 60 fordulat = 1200 fog. A 30 fogú keréknél: 1200 / 30 = 40 fordulat percenként.'
      },
      {
        id: 'prq3-9',
        questionTypeBadge: 'Gázok Állapotváltozása (Boyle-Mariotte)',
        question: 'Állandó hőmérsékleten egy zárt gáz nyomása (p) és térfogata (V) között p · V = állandó kapcsolat áll fenn. Milyen függvénykapcsolat ez a fizikai mennyiségek között?',
        options: [
          'Fordított arányosság, a p-V diagramon a folyamat izoterma (hiperbola ág)',
          'Egyenes arányosság, grafikonja origón átmenő egyenes',
          'Másodfokú kapcsolat, grafikonja parabola',
          'Exponenciális csillapítás'
        ],
        correctAnswer: 0,
        hint: 'p = konstans / V: a nyomás a térfogattal fordítottan arányos.',
        explanation: 'Boyle-Mariotte törvénye: p · V = állandó. A nyomás kifejezve: p(V) = k / V, ami tankönyvi fordított arányosság, grafikonja hiperbola (izoterma).'
      },
      {
        id: 'prq3-10',
        questionTypeBadge: 'Téglalap Kerület és Terület',
        question: 'Igaz-e, hogy egy fix kerületű téglalap két szomszédos oldala (a és b) fordítottan arányos egymással?',
        options: [
          'NEM igaz, mert a kerületnél az összegük állandó (a + b = K/2), nem a szorzatuk',
          'IGAZ, mert ha az egyik oldalt növeljük, a másik csökken',
          'IGAZ, mert minden téglalap arányos',
          'Csak négyzet esetén igaz'
        ],
        correctAnswer: 0,
        hint: 'K = 2(a + b) ➔ a + b = állandó. Ez összeg-állandóság, nem szorzat!',
        explanation: 'A fordított arányosság szigorú feltétele a szorzat állandósága (a · b = állandó). Fix kerületnél az összeg állandó (a + b = K/2), ami lineáris összefüggést (b = K/2 - a) ad, nem fordított arányosságot!'
      }
    ]
  }
};

const proportionalityCheatSheets: CheatSheetCard[] = [
  {
    title: 'Egyenes Arányosság: f(x) = k · x',
    category: 'Alapképlet',
    icon: <TrendingUp className="w-5 h-5 text-blue-600" />,
    color: 'border-blue-200 bg-blue-50/70',
    content: (
      <div className="space-y-1.5 text-xs text-slate-700">
        <p><strong>Szabály:</strong> <code>f(x) = k · x</code> (k ≠ 0)</p>
        <p><strong>Invariáns:</strong> Állandó hányados: <code>y / x = k</code></p>
        <p><strong>Grafikon:</strong> Origón <code>(0; 0)</code> átmenő egyenes.</p>
        <p><strong>Tartomány:</strong> D_f = ℝ, R_f = ℝ.</p>
        <p><strong>k &gt; 0:</strong> növekvő (I-III. negyed) | <strong>k &lt; 0:</strong> csökkenő (II-IV. negyed).</p>
      </div>
    )
  },
  {
    title: 'Fordított Arányosság: g(x) = k / x',
    category: 'Alapképlet',
    icon: <Shuffle className="w-5 h-5 text-purple-600" />,
    color: 'border-purple-200 bg-purple-50/70',
    content: (
      <div className="space-y-1.5 text-xs text-slate-700">
        <p><strong>Szabály:</strong> <code>g(x) = k / x</code> (k ≠ 0)</p>
        <p><strong>Invariáns:</strong> Állandó szorzat: <code>x · y = k</code></p>
        <p><strong>Grafikon:</strong> Kétágú <strong>hiperbola</strong> (nem egyenes!).</p>
        <p><strong>Kikötés:</strong> D_g = ℝ \ {'{0}'}, R_g = ℝ \ {'{0}'}.</p>
        <p><strong>k &gt; 0:</strong> I. és III. negyed | <strong>k &lt; 0:</strong> II. és IV. negyed.</p>
      </div>
    )
  },
  {
    title: 'k Számítása Pontból: P(x₀; y₀)',
    category: 'Számolási Szabály',
    icon: <Compass className="w-5 h-5 text-emerald-600" />,
    color: 'border-emerald-200 bg-emerald-50/70',
    content: (
      <div className="space-y-1.5 text-xs text-slate-700">
        <p><strong>Egyenes arányosság esetén:</strong></p>
        <p className="font-mono font-bold text-blue-800 text-center bg-white/80 py-0.5 rounded">
          k = y₀ / x₀
        </p>
        <p><strong>Fordított arányosság esetén:</strong></p>
        <p className="font-mono font-bold text-purple-800 text-center bg-white/80 py-0.5 rounded">
          k = x₀ · y₀
        </p>
      </div>
    )
  },
  {
    title: 'Gyakori Tévhit: Csökkenés ≠ Fordított!',
    category: 'Figyelem',
    icon: <AlertTriangle className="w-5 h-5 text-amber-600" />,
    color: 'border-amber-200 bg-amber-50/70',
    content: (
      <div className="space-y-1.5 text-xs text-slate-700">
        <p>Nem minden fordított arányosság, ahol az egyik nő, a másik csökken!</p>
        <p><strong>Például:</strong> <code>y = 10 - x</code> (összeg állandó) lineáris kapcsolat, NEM fordított arányosság!</p>
        <p className="font-semibold text-amber-900">Csak akkor fordított, ha a SZORZATUK fix konstans (x · y = k)!</p>
      </div>
    )
  }
];

export const ProportionalityQuiz: React.FC<ProportionalityQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="7. Az egyenes és fordított arányosság függvénye"
      subtitle="Gyakorold az arányossági tényező kiszámítását, a hiperbola és egyenes tulajdonságait és a szöveges feladatokat!"
      badge="9. OSZTÁLY • V. FÜGGVÉNYEK"
      levels={quizLevels}
      cheatSheets={proportionalityCheatSheets}
      topicId="az-egyenes-es-forditott-aranyossag-fuggvenye"
      topicTitle="Az egyenes és fordított arányosság függvénye"
      activityType="g9-func-aranyossag-quiz"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      matcherComponent={ProportionalityMatcher}
      sorterComponent={ProportionalitySorter}
    />
  );
};


import React from 'react';
import {
  QuizTemplate,
  LevelConfig,
  CheatSheetCard
} from '../QuizTemplate';
import {
  Award,
  TrendingUp,
  Activity,
  Layers,
  Sparkles,
  BarChart3,
  Dices,
  Binary,
  ArrowRightLeft,
  LayoutGrid,
  CheckCircle2,
  Brain
} from 'lucide-react';
import { Chapter6SummaryMatcher } from './Chapter6SummaryMatcher';
import { Chapter6SummarySorter } from './Chapter6SummarySorter';

interface Chapter6SummaryQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'cs-functions',
    title: 'Arányosságok & Függvények',
    badge: '1–5. Téma',
    icon: <TrendingUp className="w-4 h-4 text-emerald-600" />,
    formula: 'y = kx \\quad \\vert \\quad xy = k \\quad \\vert \\quad f(x) = ax + b',
    note: 'Egyenes arányosság: állandó hányados (y/x = k), origón átmenő egyenes. Fordított arányosság: állandó szorzat (x·y = k), hiperbola. Lineáris függvény: a = meredekség, b = y-metszet, zérushely: x = -b/a.'
  },
  {
    id: 'cs-statistics-prob',
    title: 'Statisztika & Valószínűség',
    badge: '6–9. Téma',
    icon: <BarChart3 className="w-4 h-4 text-emerald-600" />,
    formula: 'P(A) = \\frac{k}{n}, \\quad P(\\bar{A}) = 1 - P(A), \\quad \\bar{x} = \\frac{\\sum x}{N}',
    note: 'Két kocka: 36 kimenetel (leggyakoribb összeg: 7, P = 6/36 = 1/6). Medián: rendezett adatsor középső adata. Fair play: 50% esély, Nim célállások: 4k + 1.'
  },
  {
    id: 'cs-sequences-patterns',
    title: 'Mintázatok & Sorozatok',
    badge: '10–11. Téma',
    icon: <Binary className="w-4 h-4 text-emerald-600" />,
    formula: 'a_n = a_1 + (n-1)d, \\quad a_n = a_1 \\cdot q^{n-1}, \\quad K = \\frac{n(n-1)}{2}',
    note: 'Számtani: differencia d = a_(n+1) - a_n. Mértani: kvóciens q = a_(n+1) / a_n. Fibonacci: F_n = F_(n-1) + F_(n-2) (1, 1, 2, 3, 5, 8, 13...). Átlók száma: n(n-3)/2.'
  }
];

const levelConfigs: Record<number, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és Egyszerű Számítások',
    subtitle: '30 átfogó feladvány a fejezet alaptételeiről, képleteiről és közvetlen számításairól',
    range: '1–30. kérdés • Alapozó',
    focus: 'Alapfogalmak & Képletek',
    questions: [
      {
        id: 'c6-q1-1',
        title: 'Egyenes arányosság alaptétele',
        prompt: 'Mikor mondjuk két összefüggő mennyiségről, hogy egyenesen arányosak?',
        options: [
          'Ha ahányszorosára nő az egyik mennyiség, pontosan ugyanannyiszorosára nő a másik is',
          'Ha az egyik mennyiség növekedésével a másik csökken',
          'Ha a két mennyiség összege minden esetben állandó',
          'Ha a két mennyiség szorzata mindig 100'
        ],
        correctAnswer: 0,
        explanation: 'Egyenes arányosság esetén az összetartozó értékek hányadosa állandó: ahányszorosára változik az egyik változó, pontosan ugyanannyiszorosára változik a másik is.'
      },
      {
        id: 'c6-q1-2',
        title: 'Egyenes arányosság grafikonja',
        prompt: 'Milyen alakzat ábrázolja az egyenes arányosságot a koordináta-rendszerben?',
        options: [
          'Az origón (0; 0) átmenő egyenes',
          'Kétágú hiperbola görbe',
          'Az y-tengelyt 3-ban metsző vízszintes egyenes',
          'Origó középpontú kör'
        ],
        correctAnswer: 0,
        explanation: 'Az y = k · x képletből látható, hogy ha x = 0, akkor y = 0, így a grafikon mindig egy origón átmenő egyenes.'
      },
      {
        id: 'c6-q1-3',
        title: 'Egyszerű vásárlási arányosság',
        prompt: 'Ha 1 kg alma ára 400 Ft, mennyibe kerül 3 kg alma?',
        options: ['1200 Ft', '800 Ft', '1600 Ft', '1000 Ft'],
        correctAnswer: 0,
        explanation: 'Egyenes arányosság: 3-szor annyi almáért 3-szor annyit fizetünk: 3 · 400 Ft = 1200 Ft.'
      },
      {
        id: 'c6-q1-4',
        title: 'Fordított arányosság alaptétele',
        prompt: 'Melyik matematikai összefüggés jellemzi a fordított arányosságot két mennyiség között?',
        options: [
          'A két változó szorzata állandó: x · y = k (vagy y = k / x)',
          'A két változó hányadosa állandó: y / x = k',
          'A két változó összege állandó: x + y = k',
          'A két változó különbsége állandó: y - x = k'
        ],
        correctAnswer: 0,
        explanation: 'Fordított arányosságnál ha az egyik mennyiség n-szeresére nő, a másik n-ed részére csökken, így szorzatuk állandó: x · y = k.'
      },
      {
        id: 'c6-q1-5',
        title: 'Fordított arányosság grafikonja',
        prompt: 'Hogyan nevezzük az y = k / x fordított arányosság grafikonját?',
        options: ['Hiperbola', 'Parabola', 'Origón átmenő egyenes', 'Kör'],
        correctAnswer: 0,
        explanation: 'Az y = k / x hozzárendelés grafikonja egy kétágú hiperbola, amelynek ágai az I. és III. (vagy II. és IV.) síknegyedben futnak.'
      },
      {
        id: 'c6-q1-6',
        title: 'Munkamegosztási arányosság',
        prompt: 'Egy kertet 2 kertész 6 óra alatt ás fel. Hány óra alatt végezne ugyanezzel a munkával 4 ugyanilyen tempójú kertész?',
        options: ['3 óra alatt', '12 óra alatt', '4 óra alatt', '1,5 óra alatt'],
        correctAnswer: 0,
        explanation: 'Fordított arányosság: kétszer annyi munkás feleannyi idő alatt végez: (2 · 6) / 4 = 12 / 4 = 3 óra.'
      },
      {
        id: 'c6-q1-7',
        title: 'Lineáris függvény általános alakja',
        prompt: 'Mi az elsőfokú (lineáris) függvény általános hozzárendelési szabálya?',
        options: [
          'f(x) = a · x + b',
          'f(x) = a / x + b',
          'f(x) = a · x²',
          'f(x) = a · b^x'
        ],
        correctAnswer: 0,
        explanation: 'Az elsőfokú függvény általános alakja f(x) = ax + b, ahol a a meredekség, b pedig az y-tengelymetszet.'
      },
      {
        id: 'c6-q1-8',
        title: 'Meredekség leolvasása',
        prompt: 'Mennyi a meredeksége az f(x) = 3x - 5 lineáris függvénynek?',
        options: ['a = 3', 'a = -5', 'a = -3', 'a = 5/3'],
        correctAnswer: 0,
        explanation: 'Az f(x) = ax + b alakban az x együtthatója a meredekség (a). Itt az x előtt a 3 áll, tehát a = 3.'
      },
      {
        id: 'c6-q1-9',
        title: 'Tengelymetszet leolvasása',
        prompt: 'Melyik pontban metszi az y-tengelyt az f(x) = -2x + 7 függvény grafikonja?',
        options: ['(0; 7)', '(7; 0)', '(0; -2)', '(-2; 7)'],
        correctAnswer: 0,
        explanation: 'Az y-tengely pontjaiban x = 0. Ekkor f(0) = -2 · 0 + 7 = 7, tehát a metszéspont a (0; 7).'
      },
      {
        id: 'c6-q1-10',
        title: 'A zérushely fogalma',
        prompt: 'Mit nevezünk egy függvény zérushelyének?',
        options: [
          'Azon x értéket, amelyre a függvényérték nulla: f(x) = 0',
          'A függvényértéket az x = 0 helyen',
          'A koordináta-rendszer (0; 0) origóját',
          'A legkisebb értéket, amit a függvény felvehet'
        ],
        correctAnswer: 0,
        explanation: 'A zérushely az értelmezési tartomány azon x értéke, ahol a függvényérték nulla (a grafikon x-tengellyel vett metszéspontjának x koordinátája).'
      },
      {
        id: 'c6-q1-11',
        title: 'Egyszerű zérushely számítás',
        prompt: 'Mennyi az f(x) = 2x - 8 függvény zérushelye?',
        options: ['x = 4', 'x = -4', 'x = 8', 'x = -8'],
        correctAnswer: 0,
        explanation: '2x - 8 = 0 => 2x = 8 => x = 4. Tehát a zérushely x = 4.'
      },
      {
        id: 'c6-q1-12',
        title: 'Monotonitás és meredekség kapcsolata',
        prompt: 'Ha egy lineáris függvény meredeksége negatív (a < 0), akkor a függvény...',
        options: [
          'Szigorúan monoton csökken (balról jobbra lejt)',
          'Szigorúan monoton nő (balról jobbra emelkedik)',
          'Vízszintes egyenes (állandó)',
          'Függőleges egyenes'
        ],
        correctAnswer: 0,
        explanation: 'Ha a < 0, akkor x növekedésével a függvényérték csökken, vagyis a grafikon balról jobbra lejt (szigorúan monoton csökkenő).'
      },
      {
        id: 'c6-q1-13',
        title: 'Menetdiagram tengelyei',
        prompt: 'Egy út-idő (s-t) menetdiagramon általában mit ábrázolunk a vízszintes és a függőleges tengelyen?',
        options: [
          'Vízszintes tengely: idő (t), függőleges tengely: megtett út (s)',
          'Vízszintes tengely: út (s), függőleges tengely: idő (t)',
          'Vízszintes tengely: sebesség (v), függőleges tengely: gyorsulás',
          'Mindkét tengelyen az utat'
        ],
        correctAnswer: 0,
        explanation: 'A menetdiagramokon a független változó az idő (t), ezt mérjük a vízszintes tengelyen, a megtett utat (s) pedig a függőlegesen.'
      },
      {
        id: 'c6-q1-14',
        title: 'Vízszintes szakasz menetdiagramon',
        prompt: 'Mit jelent a menetdiagramon egy vízszintes egyenesszakasz?',
        options: [
          'A jármű áll, sebessége 0 km/h (pihenő)',
          'A jármű maximális sebességgel száguld',
          'A jármű tolatva visszatér a kiindulópontba',
          'A jármű lejtőn gurul lefelé'
        ],
        correctAnswer: 0,
        explanation: 'Ha a grafikon vízszintes, az idő telik, de a pozíció (s) nem változik, tehát a jármű áll (v = 0).'
      },
      {
        id: 'c6-q1-15',
        title: 'Egyszerű sebességszámítás menetdiagramról',
        prompt: 'Egy kerékpáros egyenletes sebességgel haladva 2 óra alatt 30 km-t tett meg. Mekkora a sebessége?',
        options: ['15 km/h', '60 km/h', '20 km/h', '10 km/h'],
        correctAnswer: 0,
        explanation: 'v = s / t = 30 km / 2 h = 15 km/h.'
      },
      {
        id: 'c6-q1-16',
        title: 'Abszolút gyakoriság fogalma',
        prompt: 'Mit fejez ki egy statisztikai adatsorban egy adat abszolút gyakorisága (k)?',
        options: [
          'Azt, hogy az adott adat hányszor fordul elő a mintában',
          'Az adat és az átlag különbségét',
          'Az adat mintán belüli százalékos arányát',
          'A minta legnagyobb és legkisebb elemének különbségét'
        ],
        correctAnswer: 0,
        explanation: 'Az abszolút gyakoriság egyszerűen a darabszám: megmutatja, hogy egy adott érték hányszor szerepel az adatok között.'
      },
      {
        id: 'c6-q1-17',
        title: 'Relatív gyakoriság képlete',
        prompt: 'Hogyan számítjuk ki egy adat relatív gyakoriságát?',
        options: [
          'Az abszolút gyakoriságot elosztjuk a minta összes elemszámával: k / N',
          'A gyakoriságot megszorozzuk az átlaggal',
          'A minta összes elemszámát elosztjuk a darabszámmal: N / k',
          'Kivonjuk a legkisebb értéket a legnagyobbból'
        ],
        correctAnswer: 0,
        explanation: 'A relatív gyakoriság az adat előfordulásának aránya: k / N, amit gyakran százalékos alakban fejezünk ki.'
      },
      {
        id: 'c6-q1-18',
        title: 'Relatív gyakoriság kiszámítása',
        prompt: 'Egy 20 fős csoportban 8 fiú van. Mennyi a fiúk relatív gyakorisága százalékban?',
        options: ['40%', '8%', '20%', '50%'],
        correctAnswer: 0,
        explanation: '8 / 20 = 4 / 10 = 0,40 = 40%.'
      },
      {
        id: 'c6-q1-19',
        title: 'Számtani átlag alapszámítás',
        prompt: 'Mennyi a következő számok számtani közepe (átlaga): 3, 5, 7, 9?',
        options: ['6', '5', '7', '24'],
        correctAnswer: 0,
        explanation: 'Összeg: 3 + 5 + 7 + 9 = 24. Elemek száma: 4. Átlag: 24 / 4 = 6.'
      },
      {
        id: 'c6-q1-20',
        title: 'Módusz leolvasása',
        prompt: 'Mi a módusza a következő adatsornak: 2, 3, 4, 4, 4, 5, 5, 8?',
        options: ['4', '5', '4,375', '8'],
        correctAnswer: 0,
        explanation: 'A módusz a leggyakoribb adat. A 4-es háromszor szerepel, minden más szám kevesebbszer, így a módusz 4.'
      },
      {
        id: 'c6-q1-21',
        title: 'Medián páratlan számú adatnál',
        prompt: 'Mennyi a mediánja a következő rendezett adatsornak: 2, 5, 8, 11, 19?',
        options: ['8', '9', '5', '11'],
        correctAnswer: 0,
        explanation: 'Páratlan számú (5 darab) rendezett adat esetén a medián pontosan a középső (3.) elem, azaz a 8.'
      },
      {
        id: 'c6-q1-22',
        title: 'Klasszikus valószínűség képlete',
        prompt: 'Hogyan határozzuk meg egy esemény klasszikus valószínűségét (P)?',
        options: [
          'P = kedvező esetek száma / összes lehetséges eset száma (k / n)',
          'P = összes eset száma / kedvező esetek száma (n / k)',
          'P = kedvező esetek szorzata',
          'P = kedvező esetek és összes esetek különbsége'
        ],
        correctAnswer: 0,
        explanation: 'A Laplace-féle klasszikus képlet szerint P(A) = k / n, azaz a kedvező kimenetelek száma osztva az összes egyenlően valószínű kimenetel számával.'
      },
      {
        id: 'c6-q1-23',
        title: 'Páros szám dobása kockával',
        prompt: 'Egy szabályos hatoldalú dobókockával dobva mekkora a valószínűsége annak, hogy páros számot kapunk?',
        options: ['3/6 = 1/2 = 50%', '1/6 ≈ 16,7%', '2/6 = 1/3', '4/6 = 2/3'],
        correctAnswer: 0,
        explanation: 'Összes eset: {1, 2, 3, 4, 5, 6} (6 eset). Kedvező esetek: {2, 4, 6} (3 eset). P = 3/6 = 1/2 = 50%.'
      },
      {
        id: 'c6-q1-24',
        title: 'Pénzérme feldobása',
        prompt: 'Egy szabályos pénzérmét egyszer feldobva mekkora az esélye annak, hogy FEJ lesz?',
        options: ['1/2 = 50%', '1/4 = 25%', '1/1 = 100%', '2/3 ≈ 66,7%'],
        correctAnswer: 0,
        explanation: 'Két egyforma esélyű kimenetel van: fej vagy írás. P(fej) = 1/2 = 50%.'
      },
      {
        id: 'c6-q1-25',
        title: 'Biztos esemény valószínűsége',
        prompt: 'Mennyi a biztos esemény valószínűsége?',
        options: ['1 (azaz 100%)', '0', '0,5', 'Végtelen'],
        correctAnswer: 0,
        explanation: 'A biztos esemény minden kísérletben garantáltan bekövetkezik, ezért valószínűsége pontosan 1 (100%).'
      },
      {
        id: 'c6-q1-26',
        title: 'Lehetetlen esemény valószínűsége',
        prompt: 'Mennyi a lehetetlen esemény valószínűsége?',
        options: ['0', '1', '-1', '0,01'],
        correctAnswer: 0,
        explanation: 'A lehetetlen esemény soha semmilyen kísérletben nem következhet be, ezért valószínűsége 0.'
      },
      {
        id: 'c6-q1-27',
        title: 'Komplementer esemény kiszámítása',
        prompt: 'Ha egy A esemény bekövetkezésének valószínűsége P(A) = 0,35, mennyi az ellentett (komplementer) eseményének valószínűsége?',
        options: ['0,65', '0,35', '1,35', '-0,35'],
        correctAnswer: 0,
        explanation: 'P(nem A) = 1 - P(A) = 1 - 0,35 = 0,65 (65%).'
      },
      {
        id: 'c6-q1-28',
        title: 'Számtani sorozat meghatározása',
        prompt: 'Melyik számsorozat számtani sorozat az alábbiak közül?',
        options: [
          '3, 7, 11, 15, 19... (mindig +4)',
          '2, 4, 8, 16, 32... (mindig ·2)',
          '1, 4, 9, 16, 25... (négyzetszámok)',
          '1, 1, 2, 3, 5, 8... (Fibonacci)'
        ],
        correctAnswer: 0,
        explanation: 'A számtani sorozatban a szomszédos tagok különbsége állandó. 7 - 3 = 4, 11 - 7 = 4, 15 - 11 = 4, tehát ez egy számtani sorozat (d = 4).'
      },
      {
        id: 'c6-q1-29',
        title: 'Számtani sorozat következő tagja',
        prompt: 'Egy számtani sorozat első három tagja: 5, 9, 13... Mi a sorozat 4. tagja?',
        options: ['17', '16', '18', '21'],
        correctAnswer: 0,
        explanation: 'A differencia: d = 9 - 5 = 4. A 4. tag: 13 + 4 = 17.'
      },
      {
        id: 'c6-q1-30',
        title: 'Mértani sorozat kvóciensének fogalma',
        prompt: 'Mi a mértani sorozat hányadosa (kvóciense, q)?',
        options: [
          'Bármely tag és az őt közvetlenül megelőző tag hányadosa: q = a_(n+1) / a_n',
          'A tagok különbsége',
          'A tagok szorzata',
          'Az első és utolsó tag összege'
        ],
        correctAnswer: 0,
        explanation: 'Mértani sorozatban minden tag az előző q-szorosa, így a hányados állandó: q = a_(n+1) / a_n.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Alkalmazások, Szöveges Feladatok és Számítások',
    subtitle: '30 feladvány összefüggések felállításáról, több lépéses szöveges feladatokról és grafikonokról',
    range: '31–60. kérdés • Közepes',
    focus: 'Alkalmazások & Szöveges feladványok',
    questions: [
      {
        id: 'c6-q2-1',
        title: 'Egyenes arányosság táblázatból',
        prompt: 'Egyenesen arányos mennyiségek esetén x = 3-hoz y = 15 tartozik. Mennyi y értéke, ha x = 7?',
        options: ['35', '21', '30', '45'],
        correctAnswer: 0,
        explanation: 'Az arányossági tényező: k = y / x = 15 / 3 = 5. Ha x = 7, akkor y = k · x = 5 · 7 = 35.'
      },
      {
        id: 'c6-q2-2',
        title: 'Üzemanyag-fogyasztás arányossága',
        prompt: 'Egy autó 100 km-en 6,5 liter benzint fogyaszt. Hány liter benzint fogyaszt 400 km-es úton?',
        options: ['26 liter', '24 liter', '28 liter', '20 liter'],
        correctAnswer: 0,
        explanation: 'A 400 km négyszerese a 100 km-nek, így a fogyasztás is a négyszerese: 4 · 6,5 = 26 liter.'
      },
      {
        id: 'c6-q2-3',
        title: 'Egyenes arányosság felismerése képletből',
        prompt: 'Az alábbi hozzárendelések közül melyik ír le egyenes arányosságot?',
        options: ['f(x) = 4,5x', 'f(x) = 4,5x + 2', 'f(x) = 4,5 / x', 'f(x) = x²'],
        correctAnswer: 0,
        explanation: 'Csak az f(x) = kx alakú lineáris függvény egyenes arányosság, ahol a konstans tag b = 0. Ezért az f(x) = 4,5x a helyes.'
      },
      {
        id: 'c6-q2-4',
        title: 'Medence feltöltése csapokkal',
        prompt: 'Egy medencét 3 egyforma csap 8 óra alatt tölt fel teljesen. Hány óra alatt töltené fel 6 ugyanilyen csap?',
        options: ['4 óra', '16 óra', '6 óra', '2 óra'],
        correctAnswer: 0,
        explanation: 'Fordított arányosság: 3 · 8 = 24 csap-óra szükséges. 6 csap esetén: 24 / 6 = 4 óra.'
      },
      {
        id: 'c6-q2-5',
        title: 'Menetidő és sebesség fordított arányossága',
        prompt: 'Egy autó 60 km/h átlagsebességgel 3 óra alatt tesz meg egy utat. Hány óra alatt tenné meg ugyanezt az utat 90 km/h sebességgel?',
        options: ['2 óra', '1,5 óra', '2,5 óra', '4 óra'],
        correctAnswer: 0,
        explanation: 'A távolság: s = 60 · 3 = 180 km. 90 km/h-val: t = 180 / 90 = 2 óra.'
      },
      {
        id: 'c6-q2-6',
        title: 'Fordított arányosság hiányzó tagja',
        prompt: 'Két fordítottan arányos változó szorzata x · y = 36. Mennyi y, ha x = 12?',
        options: ['3', '4', '6', '24'],
        correctAnswer: 0,
        explanation: 'y = 36 / x = 36 / 12 = 3.'
      },
      {
        id: 'c6-q2-7',
        title: 'Meredekség számítása két pontból',
        prompt: 'Egy egyenes átmegy az A(0; 3) és B(2; 7) pontokon. Mennyi az egyenes meredeksége (a)?',
        options: ['2', '4', '3', '0,5'],
        correctAnswer: 0,
        explanation: 'a = (y_2 - y_1) / (x_2 - x_1) = (7 - 3) / (2 - 0) = 4 / 2 = 2.'
      },
      {
        id: 'c6-q2-8',
        title: 'Függvényérték számítása',
        prompt: 'Mennyi az f(x) = -2x + 10 függvény helyettesítési értéke az x = 3 helyen?',
        options: ['4', '-4', '16', '1'],
        correctAnswer: 0,
        explanation: 'f(3) = -2 · 3 + 10 = -6 + 10 = 4.'
      },
      {
        id: 'c6-q2-9',
        title: 'Pont illeszkedése egyenesre',
        prompt: 'Melyik pont illeszkedik az f(x) = 3x - 1 függvény grafikonjára?',
        options: ['P(2; 5)', 'Q(1; 3)', 'R(3; 7)', 'S(0; 1)'],
        correctAnswer: 0,
        explanation: 'x = 2 esetén: f(2) = 3 · 2 - 1 = 5, tehát a P(2; 5) pont pontosan illeszkedik a grafikonra.'
      },
      {
        id: 'c6-q2-10',
        title: 'Metszéspont az x-tengellyel',
        prompt: 'Hol metszi az x-tengelyt az f(x) = 5x - 15 függvény grafikonja?',
        options: ['(3; 0)', '(0; -15)', '(-3; 0)', '(15; 0)'],
        correctAnswer: 0,
        explanation: 'Az x-tengelyen y = 0: 5x - 15 = 0 => 5x = 15 => x = 3. A metszéspont a (3; 0).'
      },
      {
        id: 'c6-q2-11',
        title: 'Párhuzamos egyenesek',
        prompt: 'Milyen összefüggés van az f(x) = 2x + 1 és g(x) = 2x - 4 függvények grafikonjai között?',
        options: [
          'Párhuzamosak, mert azonos a meredekségük (a = 2)',
          'Merőlegesek egymásra',
          'Az origóban metszik egymást',
          'Egybeesnek'
        ],
        correctAnswer: 0,
        explanation: 'Két lineáris függvény grafikonja pontosan akkor párhuzamos egymással, ha meredekségük megegyezik (a_1 = a_2 = 2).'
      },
      {
        id: 'c6-q2-12',
        title: 'Átlagsebesség menetdiagramról',
        prompt: 'Egy túrázó menetdiagramján látható: 8:00-tól 10:00-ig megtett 8 km-t, 10:00-tól 11:00-ig pihent. Mekkora volt az átlagsebessége a mozgás ideje alatt (8:00 és 10:00 között)?',
        options: ['4 km/h', '8 km/h', '2,67 km/h', '2 km/h'],
        correctAnswer: 0,
        explanation: 'A mozgás 2 órán át tartott, megtett út 8 km. Átlagsebesség: 8 km / 2 h = 4 km/h.'
      },
      {
        id: 'c6-q2-13',
        title: 'Találkozás menetdiagramon',
        prompt: 'Két gyalogos egymással szemben halad ugyanazon az úton. Mit jelent menetdiagramjaik metszéspontja?',
        options: [
          'Azt az időpontot és helyet, ahol találkoznak',
          'Azt a pontot, ahol mindketten megállnak pihenni',
          'Azt a pillanatot, amikor azonos lesz a sebességük',
          'A célállomást'
        ],
        correctAnswer: 0,
        explanation: 'A metszéspontban az idő (x) és az út-koordináta (y) is azonos, tehát a két mozgó test pontosan ott és akkor találkozik.'
      },
      {
        id: 'c6-q2-14',
        title: 'Adatsor terjedelmének számítása',
        prompt: 'Mennyi a terjedelme a következő mérési adatoknak: 14, 18, 12, 29, 21, 15?',
        options: ['17', '29', '12', '15'],
        correctAnswer: 0,
        explanation: 'Terjedelem = maximum - minimum = 29 - 12 = 17.'
      },
      {
        id: 'c6-q2-15',
        title: 'Medián páros darabszámú adatsornál',
        prompt: 'Mennyi a mediánja a következő adatsornak: 4, 6, 8, 12?',
        options: ['7', '6', '8', '7,5'],
        correctAnswer: 0,
        explanation: 'Páros számú (4 darab) adat esetén a két középső adat (6 és 8) számtani közepe a medián: (6 + 8) / 2 = 7.'
      },
      {
        id: 'c6-q2-16',
        title: 'Súlyozott iskolai átlag',
        prompt: 'Egy diáknak matematikából három darab 4-ese és kettő darab 5-öse van. Mennyi a jegyei átlaga?',
        options: ['4,4', '4,5', '4,2', '4,0'],
        correctAnswer: 0,
        explanation: 'Összeg: 3 · 4 + 2 · 5 = 12 + 10 = 22. Összes darabszám: 5. Átlag: 22 / 5 = 4,4.'
      },
      {
        id: 'c6-q2-17',
        title: 'Két dobókocka elemi esetei',
        prompt: 'Két különböző színű szabályos dobókockával dobva hányféle rendezett számpár kimenetel lehetséges összesen?',
        options: ['36', '12', '24', '18'],
        correctAnswer: 0,
        explanation: 'Az első kocka 6-féle, a második kocka szintén 6-féle értéket vehet fel: 6 · 6 = 36 elemi kimenetel van.'
      },
      {
        id: 'c6-q2-18',
        title: 'Két kocka összege 7',
        prompt: 'Két szabályos dobókockával dobva mekkora a valószínűsége, hogy a dobott számok összege pontosan 7?',
        options: ['6/36 = 1/6 ≈ 16,7%', '1/36', '7/36', '5/36'],
        correctAnswer: 0,
        explanation: 'A kedvező párok: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) -> 6 eset. P = 6 / 36 = 1/6.'
      },
      {
        id: 'c6-q2-19',
        title: 'Két kocka: mindkettő páros',
        prompt: 'Két szabályos dobókockával dobunk. Mekkora a valószínűsége, hogy MINDKÉT kockán páros szám szerepel?',
        options: ['9/36 = 1/4 = 25%', '18/36 = 50%', '3/36 = 1/12', '6/36 = 1/6'],
        correctAnswer: 0,
        explanation: 'Az elsőn páros: 3/6, a másodikon páros: 3/6. Független események: 3/6 · 3/6 = 9/36 = 1/4 = 25%.'
      },
      {
        id: 'c6-q2-20',
        title: 'Golyóhúzási valószínűség',
        prompt: 'Egy zsákban 4 piros és 6 kék golyó található. Véletlenszerűen kihúzunk egyet. Mekkora az esélye, hogy piros golyót húzunk?',
        options: ['4/10 = 40%', '6/10 = 60%', '4/6 ≈ 66,7%', '1/4 = 25%'],
        correctAnswer: 0,
        explanation: 'Összes golyó: 4 + 6 = 10. Kedvező (piros): 4. P = 4 / 10 = 0,4 = 40%.'
      },
      {
        id: 'c6-q2-21',
        title: 'Pontosan egy fej két érméből',
        prompt: 'Két szabályos pénzérmét feldobva mekkora a valószínűsége annak, hogy PONTOSAN EGY FEJ és egy írás lesz?',
        options: ['2/4 = 1/2 = 50%', '1/4 = 25%', '3/4 = 75%', '1/3'],
        correctAnswer: 0,
        explanation: 'Összes eset: (F,F), (F,Í), (Í,F), (Í,Í) [4 eset]. Kedvező (pontosan 1 fej): (F,Í), (Í,F) [2 eset]. P = 2/4 = 1/2 = 50%.'
      },
      {
        id: 'c6-q2-22',
        title: 'Tisztességes játék (Fair Play)',
        prompt: 'Milyen játékot nevezünk a valószínűségszámításban és játékelméletben „tisztességesnek” (fairnek)?',
        options: [
          'Ahol a szabályok alapján mindkét játékosnak azonos (50-50%) esélye van nyerni',
          'Ahol mindig a kezdő játékos nyer',
          'Ahol tilos csalni a dobásoknál',
          'Ahol a játék végén döntetlen az eredmény'
        ],
        correctAnswer: 0,
        explanation: 'A tisztességes játékban a játékosok győzelmi esélye egyenlő, és a várható nyereményük szimmetrikus (nulla).'
      },
      {
        id: 'c6-q2-23',
        title: '21 gyufás Nim-játék célállása',
        prompt: 'A klasszikus 21 gyufás játékban (1, 2 vagy 3 gyufa vehető el, az utolsó elvevő veszít) melyik a nyerő kulcsállások általános alakja?',
        options: [
          '4k + 1 darab gyufa (1, 5, 9, 13, 17, 21)',
          'Páros számú gyufa (2k)',
          '3-mal osztható gyufaszám (3k)',
          '5k darab gyufa'
        ],
        correctAnswer: 0,
        explanation: 'Mivel a lépések összege 4-re kiegészíthető (ha ellenfelünk x-et vesz, mi 4-x-et veszünk), a nyerő pozíciók mindig 4k + 1 alakúak. Aki erre a számra hagyja a gyufákat az ellenfelének, megnyeri a játékot.'
      },
      {
        id: 'c6-q2-24',
        title: 'Gyufaszál négyzetlánc képlete',
        prompt: 'Egymáshoz csatlakozó négyzetek láncát rakjuk ki gyufákból. Az 1. négyzet 4 gyufa, utána minden újabb négyzet +3 gyufa. Hány gyufa kell 10 négyzet kirakásához?',
        options: ['31 gyufa', '40 gyufa', '30 gyufa', '28 gyufa'],
        correctAnswer: 0,
        explanation: 'A képlet: f(n) = 3n + 1. 10 négyzetnél: 3 · 10 + 1 = 31 gyufaszál.'
      },
      {
        id: 'c6-q2-25',
        title: 'A negyedik háromszögszám',
        prompt: 'Mennyi a 4. háromszögszám (T_4) értéke?',
        options: ['10', '8', '12', '15'],
        correctAnswer: 0,
        explanation: 'T_4 = 1 + 2 + 3 + 4 = 10 (képlettel: 4 · 5 / 2 = 10).'
      },
      {
        id: 'c6-q2-26',
        title: 'Kézfogások száma 5 embernél',
        prompt: 'Egy 5 fős baráti társaságban mindenki mindenkivel kezet fog egyszer. Hány kézfogás történik összesen?',
        options: ['10', '20', '25', '15'],
        correctAnswer: 0,
        explanation: 'K = n · (n - 1) / 2 = 5 · 4 / 2 = 20 / 2 = 10 kézfogás.'
      },
      {
        id: 'c6-q2-27',
        title: 'Számtani sorozat 10. tagja',
        prompt: 'Egy számtani sorozat első tagja a_1 = 4, differenciája d = 3. Mennyi a sorozat 10. tagja (a_10)?',
        options: ['31', '34', '30', '28'],
        correctAnswer: 0,
        explanation: 'a_n = a_1 + (n - 1) · d => a_10 = 4 + 9 · 3 = 4 + 27 = 31.'
      },
      {
        id: 'c6-q2-28',
        title: 'Differencia kiszámítása két tagból',
        prompt: 'Egy számtani sorozatban a_1 = 7 és a_4 = 19. Mennyi a differencia (d)?',
        options: ['4', '3', '6', '12'],
        correctAnswer: 0,
        explanation: 'a_4 = a_1 + 3d => 19 = 7 + 3d => 3d = 12 => d = 4.'
      },
      {
        id: 'c6-q2-29',
        title: 'Mértani sorozat 5. tagja',
        prompt: 'Egy mértani sorozat első tagja a_1 = 5, hányadosa q = 2. Mennyi a sorozat 5. tagja (a_5)?',
        options: ['80', '160', '40', '50'],
        correctAnswer: 0,
        explanation: 'a_5 = a_1 · q^4 = 5 · 2^4 = 5 · 16 = 80.'
      },
      {
        id: 'c6-q2-30',
        title: 'Fibonacci-sorozat 8. tagja',
        prompt: 'A Fibonacci-sorozat így indul: 1, 1, 2, 3, 5, 8, 13... Mi a sorozat 8. tagja?',
        options: ['21', '20', '34', '18'],
        correctAnswer: 0,
        explanation: 'Minden tag az előző kettő összege: F_8 = 8 + 13 = 21.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Összetett és Haladó Feladatok, Elemzések',
    subtitle: '30 logikai, kombinált és verseny-szintű feladvány inverz számításokkal és mélyebb összefüggésekkel',
    range: '61–90. kérdés • Haladó',
    focus: 'Összetett problémák & Matematikai szintézis',
    questions: [
      {
        id: 'c6-q3-1',
        title: 'Arányosságok dinamikája',
        prompt: 'Hogyan változik az y értéke, ha az x változó a négyszeresére nő: egyenes arányosság, illetve fordított arányosság esetén?',
        options: [
          'Egyenes arányosságnál y a négyszeresére nő; fordítottnál y a negyedére csökken',
          'Egyenes arányosságnál y nem változik; fordítottnál y négyszereződik',
          'Mindkét esetben y négyszeresére nő',
          'Egyenesnél y negyedelődik, fordítottnál négyszereződik'
        ],
        correctAnswer: 0,
        explanation: 'Egyenes arányosságnál (y = kx) y arányosan négyszereződik, fordított arányosságnál (y = k/x) pedig a negyedére csökken.'
      },
      {
        id: 'c6-q3-2',
        title: 'Összetett gépi munkamegosztás',
        prompt: '6 egyforma gép 4 óra alatt 720 alkatrészt készít el. Hány alkatrészt készít el 8 ugyanilyen gép 5 óra alatt?',
        options: ['1200 alkatrészt', '960 alkatrészt', '1080 alkatrészt', '1440 alkatrészt'],
        correctAnswer: 0,
        explanation: '1 gép 1 óra alatt: 720 / (6 · 4) = 720 / 24 = 30 alkatrész. Így 8 gép 5 óra alatt: 8 · 5 · 30 = 40 · 30 = 1200 alkatrész.'
      },
      {
        id: 'c6-q3-3',
        title: 'Két csap együttes munkája',
        prompt: 'Egy medencét az A csap egyedül 6 óra alatt, a B csap egyedül 3 óra alatt tölt fel. Hány óra alatt töltik fel együtt, ha mindkét csapot egyszerre megnyitjuk?',
        options: ['2 óra alatt', '4,5 óra alatt', '1,5 óra alatt', '9 óra alatt'],
        correctAnswer: 0,
        explanation: '1 óra alatt A az 1/6 részét, B az 1/3 részét tölti meg: 1/6 + 1/3 = 1/6 + 2/6 = 3/6 = 1/2 része telik meg óránként. Tehát a teljes medence 2 óra alatt megtelik.'
      },
      {
        id: 'c6-q3-4',
        title: 'Hiperbola pontjainak szorzata',
        prompt: 'Egy fordított arányosság görbéje átmegy a P(4; 9) ponton. Melyik pont illeszkedik még UGYANEHHEZ a görbéhez?',
        options: ['Q(-6; -6)', 'R(3; 10)', 'S(6; 8)', 'T(12; 4)'],
        correctAnswer: 0,
        explanation: 'A szorzat: k = 4 · 9 = 36. A Q(-6; -6) pontnál: (-6) · (-6) = 36, tehát ez a pont pontosan rajta van a hiperbolán.'
      },
      {
        id: 'c6-q3-5',
        title: 'Két lineáris függvény metszéspontja',
        prompt: 'Hol metszi egymást az f(x) = 2x - 3 és a g(x) = -x + 6 lineáris függvény grafikonja?',
        options: ['P(3; 3)', 'P(2; 1)', 'P(1; -1)', 'P(4; 5)'],
        correctAnswer: 0,
        explanation: 'Egyenlőség: 2x - 3 = -x + 6 => 3x = 9 => x = 3. Visszahelyettesítve: y = 2 · 3 - 3 = 3. A metszéspont a P(3; 3).'
      },
      {
        id: 'c6-q3-6',
        title: 'Lineáris függvény egyenlete két pontból',
        prompt: 'Egy egyenes átmegy a (2; 1) és az (5; 10) pontokon. Melyik képlet határozza meg ezt a függvényt?',
        options: ['f(x) = 3x - 5', 'f(x) = 2x - 3', 'f(x) = 3x + 1', 'f(x) = 4x - 7'],
        correctAnswer: 0,
        explanation: 'Meredekség: a = (10 - 1) / (5 - 2) = 9 / 3 = 3. Az egyenlet: y = 3x + b. Behelyettesítve a (2; 1)-et: 1 = 3 · 2 + b => 1 = 6 + b => b = -5. Tehát f(x) = 3x - 5.'
      },
      {
        id: 'c6-q3-7',
        title: 'Függvény felírása tengelymetszetekből',
        prompt: 'Egy lineáris függvény az y-tengelyt a (0; 4) pontban metszi, zérushelye pedig x = 2. Mi a függvény hozzárendelési szabálya?',
        options: ['f(x) = -2x + 4', 'f(x) = 2x + 4', 'f(x) = -0,5x + 4', 'f(x) = -2x + 2'],
        correctAnswer: 0,
        explanation: 'b = 4 (y-metszet). Zérushely: f(2) = 0 => a · 2 + 4 = 0 => 2a = -4 => a = -2. A függvény: f(x) = -2x + 4.'
      },
      {
        id: 'c6-q3-8',
        title: 'Párhuzamos egyenes egyenletének meghatározása',
        prompt: 'Melyik függvény grafikonja párhuzamos az y = 4x + 1 egyenessel, és megy át a P(1; 7) ponton?',
        options: ['y = 4x + 3', 'y = -4x + 11', 'y = 4x + 7', 'y = 2x + 5'],
        correctAnswer: 0,
        explanation: 'Párhuzamos meredekség: a = 4. Az alak: y = 4x + b. A (1; 7) ponttal: 7 = 4 · 1 + b => b = 3. Tehát y = 4x + 3.'
      },
      {
        id: 'c6-q3-9',
        title: 'Szembehaladó mozgások találkozási ideje',
        prompt: 'Két város távolsága 30 km. Egyszerre indul egymással szemben Anna 4 km/h és Béla 6 km/h sebességgel. Hány óra múlva találkoznak?',
        options: ['3 óra múlva', '2,5 óra múlva', '5 óra múlva', '2 óra múlva'],
        correctAnswer: 0,
        explanation: 'Közeledési sebességük összege: v = 4 + 6 = 10 km/h. Találkozási idő: t = s / v = 30 / 10 = 3 óra.'
      },
      {
        id: 'c6-q3-10',
        title: 'Két szakaszból álló átlagsebesség',
        prompt: 'Egy jármű 1 órán át 90 km/h-val haladt autópályán, majd 2 órán át 60 km/h-val országúton. Mekkora volt az átlagsebessége a teljes 3 órás útra nézve?',
        options: ['70 km/h', '75 km/h', '65 km/h', '80 km/h'],
        correctAnswer: 0,
        explanation: 'Első út: 1 · 90 = 90 km. Második út: 2 · 60 = 120 km. Teljes út: 90 + 120 = 210 km. Teljes idő: 3 h. Átlagsebesség = 210 / 3 = 70 km/h.'
      },
      {
        id: 'c6-q3-11',
        title: 'Hiányzó adat visszaszámolása átlagból',
        prompt: 'Egy diák 4 dolgozatának átlaga 4,25. Három jegye ismert: 4, 5, 5. Mi lett a negyedik dolgozata?',
        options: ['3-as', '4-es', '5-ös', '2-es'],
        correctAnswer: 0,
        explanation: 'A 4 jegy összege: 4 · 4,25 = 17. A három ismert jegy összege: 4 + 5 + 5 = 14. A negyedik jegy: 17 - 14 = 3.'
      },
      {
        id: 'c6-q3-12',
        title: 'Extrém érték hatása a középértékekre',
        prompt: 'Ha egy fizetési adatsorhoz hozzáadunk egy kiugróan magas (extrém) milliós összeget, melyik mutató változik a LEGKEVÉSBÉ?',
        options: [
          'A medián (mert a rangsor szerinti középső pozíció stabil)',
          'A számtani átlag',
          'A terjedelem',
          'Minden mutató pontosan ugyanannyit változik'
        ],
        correctAnswer: 0,
        explanation: 'A medián érzéketlen a szélső, kiugró értékekre (robusztus mutató), míg az átlag és a terjedelem azonnal jelentősen eltorzul.'
      },
      {
        id: 'c6-q3-13',
        title: 'Két kocka: összeg legalább 10',
        prompt: 'Két szabályos dobókockával dobva mekkora a valószínűsége annak, hogy a dobott számok összege LEGALÁBB 10?',
        options: ['6/36 = 1/6 ≈ 16,7%', '3/36 = 1/12', '4/36 = 1/9', '10/36 = 5/18'],
        correctAnswer: 0,
        explanation: 'Kedvező esetek az összegekre: 10: (4,6), (5,5), (6,4) [3]; 11: (5,6), (6,5) [2]; 12: (6,6) [1]. Összesen 3 + 2 + 1 = 6 eset. P = 6/36 = 1/6.'
      },
      {
        id: 'c6-q3-14',
        title: 'Két kocka: különböző számok',
        prompt: 'Két szabályos dobókockával dobunk. Mekkora az esélye, hogy a két kockán KÜLÖNBÖZŐ számot látunk?',
        options: ['30/36 = 5/6 ≈ 83,3%', '6/36 = 1/6', '24/36 = 2/3', '1/2 = 50%'],
        correctAnswer: 0,
        explanation: 'Komplementer módszerrel: egyforma számok: (1,1), (2,2), (3,3), (4,4), (5,5), (6,6) -> 6 eset. Különböző számok: 36 - 6 = 30 eset. P = 30 / 36 = 5/6.'
      },
      {
        id: 'c6-q3-15',
        title: 'Visszatevés nélküli golyóhúzás',
        prompt: 'Egy dobozban 3 fehér és 2 fekete golyó van. Visszatevés NÉLKÜL kihúzunk egymás után két golyót. Mekkora a valószínűsége, hogy MINDKÉT golyó fehér lesz?',
        options: ['6/20 = 3/10 = 30%', '9/25 = 36%', '3/5 = 60%', '1/5 = 20%'],
        correctAnswer: 0,
        explanation: 'Első húzásnál fehér: 3/5. Második húzásnál már csak 2 fehér maradt a 4 golyó közül: 2/4. P = 3/5 · 2/4 = 6/20 = 3/10 = 30%.'
      },
      {
        id: 'c6-q3-16',
        title: 'Visszatevéses golyóhúzás',
        prompt: 'Ugyanabból a dobozból (3 fehér, 2 fekete) kétszer húzunk úgy, hogy az első után VISSZATESSZÜK a golyót. Mekkora az esélye két fehérnek?',
        options: ['9/25 = 36%', '6/20 = 30%', '3/10 = 30%', '1/2 = 50%'],
        correctAnswer: 0,
        explanation: 'Visszatevés miatt a feltételek nem változnak (független kísérletek): 3/5 · 3/5 = 9/25 = 36%.'
      },
      {
        id: 'c6-q3-17',
        title: 'Legalább egy fej három érméből',
        prompt: 'Három szabályos pénzérmét egyszerre feldobva mekkora a valószínűsége annak, hogy LEGALÁBB EGY FEJET kapunk?',
        options: ['7/8 = 87,5%', '1/8 = 12,5%', '3/8 = 37,5%', '1/2 = 50%'],
        correctAnswer: 0,
        explanation: 'Komplementer esemény: egyetlen fej sincs (mind a 3 írás: Í-Í-Í). Ennek esélye: (1/2)³ = 1/8. A legalább egy fej esélye: 1 - 1/8 = 7/8 = 87,5%.'
      },
      {
        id: 'c6-q3-18',
        title: 'Tippelési esély fa-diagramon',
        prompt: 'Egy kvízben 3 darab igaz/hamis kérdés szerepel. Valaki vakon találgat mindháromnál. Mekkora a valószínűsége, hogy mind a 3 választ eltalálja?',
        options: ['1/8 = 12,5%', '1/6 ≈ 16,7%', '1/3', '3/8 = 37,5%'],
        correctAnswer: 0,
        explanation: 'Minden kérdésnél a helyes válasz esélye 1/2. Három független kérdésnél: 1/2 · 1/2 · 1/2 = 1/8 = 12,5%.'
      },
      {
        id: 'c6-q3-19',
        title: 'Konvex 10-szög átlóinak száma',
        prompt: 'Hány átlója van egy konvex tízszögnek összesen?',
        options: ['35 átló', '70 átló', '45 átló', '20 átló'],
        correctAnswer: 0,
        explanation: 'Képlet: n · (n - 3) / 2 = 10 · 7 / 2 = 70 / 2 = 35 átló.'
      },
      {
        id: 'c6-q3-20',
        title: 'Kézfogások száma visszafelé',
        prompt: 'Egy konferenciateremben mindenki mindenkivel kezet fogott egyszer, és összesen 28 kézfogás történt. Hány ember volt a teremben?',
        options: ['8 ember', '7 ember', '9 ember', '14 ember'],
        correctAnswer: 0,
        explanation: 'n · (n - 1) / 2 = 28 => n · (n - 1) = 56. Mivel 8 · 7 = 56, ezért n = 8 ember volt jelen.'
      },
      {
        id: 'c6-q3-21',
        title: 'Gyufaszál házikólánc visszafelé',
        prompt: 'Egy házikólánc kirakási képlete f(n) = 5n + 1 (ahol n a házikók száma). Legfeljebb hány egész házikót tudunk kirakni 48 gyufaszálból?',
        options: ['9 házikót', '10 házikót', '8 házikót', '7 házikót'],
        correctAnswer: 0,
        explanation: '5n + 1 <= 48 => 5n <= 47 => n <= 9,4. Mivel egész házikókról van szó, legfeljebb 9 házikó rakható ki (5 · 9 + 1 = 46 gyufaszálból).'
      },
      {
        id: 'c6-q3-22',
        title: 'Másodrendű különbség felismerése',
        prompt: 'Egy számsorozat tagjai: 2, 5, 10, 17, 26... A különbségek: 3, 5, 7, 9... Milyen szabály írja le a sorozatot?',
        options: [
          'a_n = n² + 1',
          'a_n = 2n + 1',
          'a_n = n² - 1',
          'a_n = 3n - 1'
        ],
        correctAnswer: 0,
        explanation: 'A különbségek különbsége állandó (+2), így a sorozat másodfokú: n = 1-re 1² + 1 = 2; n = 2-re 2² + 1 = 5; n = 3-ra 3² + 1 = 10... Tehát a_n = n² + 1.'
      },
      {
        id: 'c6-q3-23',
        title: 'Számtani sorozat tagjainak visszaszámolása',
        prompt: 'Egy számtani sorozatban a_3 = 11 és a_7 = 27. Mennyi a differencia (d) és az első tag (a_1)?',
        options: [
          'd = 4 és a_1 = 3',
          'd = 3 és a_1 = 5',
          'd = 4 és a_1 = 1',
          'd = 5 és a_1 = 2'
        ],
        correctAnswer: 0,
        explanation: 'a_7 - a_3 = 4d => 27 - 11 = 16 => 4d = 16 => d = 4. Továbbá a_3 = a_1 + 2d => 11 = a_1 + 8 => a_1 = 3.'
      },
      {
        id: 'c6-q3-24',
        title: 'Első pozitív tag számtani sorozatban',
        prompt: 'Egy számtani sorozat első tagja a_1 = -20, differenciája d = 6. Hanyadik tag a sorozat legelső POZITÍV tagja?',
        options: ['Az 5. tag (a_5 = 4)', 'A 4. tag (a_4 = -2)', 'A 6. tag (a_6 = 10)', 'A 3. tag'],
        correctAnswer: 0,
        explanation: 'A tagok: a_1 = -20, a_2 = -14, a_3 = -8, a_4 = -2, a_5 = 4. Az 5. tag az első, amely nagyobb mint 0.'
      },
      {
        id: 'c6-q3-25',
        title: 'Számtani sorozat első 5 tagjának összege',
        prompt: 'Mennyi az a_1 = 2, d = 3 számtani sorozat első 5 tagjának összege (S_5)?',
        options: ['40', '35', '45', '50'],
        correctAnswer: 0,
        explanation: 'Az első 5 tag: 2, 5, 8, 11, 14. Összegük: 2 + 5 + 8 + 11 + 14 = 40 (vagy képlettel: 5 · (2 + 14) / 2 = 5 · 8 = 40).'
      },
      {
        id: 'c6-q3-26',
        title: 'Oszcilláló mértani sorozat',
        prompt: 'Egy mértani sorozatban a_1 = 3 és q = -2. Melyik állítás helyes a sorozat viselkedésére?',
        options: [
          'A tagok előjele felváltva pozitív és negatív (váltakozó előjelű / oszcilláló)',
          'A sorozat szigorúan monoton növekvő',
          'A sorozat minden tagja negatív',
          'A tagok abszolútértéke nullához tart'
        ],
        correctAnswer: 0,
        explanation: 'Mivel a kvóciens negatív (q = -2), a tagok felváltva pozitívak és negatívak: 3, -6, 12, -24, 48...'
      },
      {
        id: 'c6-q3-27',
        title: 'Mértani sorozat kvóciensének visszaszámolása',
        prompt: 'Egy pozitív tagú mértani sorozatban a_2 = 12 és a_4 = 48. Mennyi a hányados (q) és az első tag (a_1)?',
        options: [
          'q = 2 és a_1 = 6',
          'q = 4 és a_1 = 3',
          'q = 2 és a_1 = 3',
          'q = 3 és a_1 = 4'
        ],
        correctAnswer: 0,
        explanation: 'a_4 / a_2 = q² => 48 / 12 = 4 => q² = 4 => q = 2 (mivel pozitív tagú). Ekkor a_1 = a_2 / q = 12 / 2 = 6.'
      },
      {
        id: 'c6-q3-28',
        title: 'Számtani és mértani közép összehasonlítása',
        prompt: 'Mennyi a 4 és a 16 számok számtani, illetve mértani közepe?',
        options: [
          'Számtani közép: 10, mértani közép: 8',
          'Számtani közép: 8, mértani közép: 10',
          'Számtani közép: 10, mértani közép: 64',
          'Mindkettő 10'
        ],
        correctAnswer: 0,
        explanation: 'Számtani közép: (4 + 16) / 2 = 20 / 2 = 10. Mértani közép: √(4 · 16) = √64 = 8.'
      },
      {
        id: 'c6-q3-29',
        title: 'A Fibonacci-sorozat és az aranymetszés',
        prompt: 'Milyen nevezetes értékhez közeledik a Fibonacci-sorozat egymást követő tagjainak hányadosa (F_(n+1) / F_n), ha n nagyon nagyra nő?',
        options: [
          'Az aranymetszés számához (Φ ≈ 1,618)',
          'A π számhoz (≈ 3,1415)',
          'Pontosan a 2-höz',
          'Az Euler-féle e számhoz (≈ 2,718)'
        ],
        correctAnswer: 0,
        explanation: 'A szomszédos Fibonacci-számok hányadosai: 1/1=1, 2/1=2, 3/2=1.5, 5/3=1.667, 8/5=1.6, 13/8=1.625... a határérték az aranymetszés aránya: Φ = (1 + √5) / 2 ≈ 1,618.'
      },
      {
        id: 'c6-q3-30',
        title: 'A fejezet elméleti szintézise',
        prompt: 'Az alábbi állítások közül melyik fejezi ki pontosan a számsorozatok és a függvények kapcsolatát?',
        options: [
          'A számsorozat valójában olyan diszkrét függvény, amelynek értelmezési tartománya a pozitív egész számok halmaza (ℤ⁺)',
          'A sorozatok nem tekinthetők függvényeknek, mert csak számok listái',
          'Minden sorozat grafikonja folytonos, törésmentes görbe',
          'Csak a számtani sorozatok függvények, a mértaniak nem'
        ],
        correctAnswer: 0,
        explanation: 'A modern matematikában a számsorozat definíció szerint egy olyan függvény: a: ℤ⁺ → ℝ, amely minden n pozitív egész indexhez egyértelműen hozzárendeli az a_n valós számot.'
      }
    ]
  }
};

export const Chapter6SummaryQuiz: React.FC<Chapter6SummaryQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      topicId="g8-func-summary"
      chapterId="hozzarendelesek-valoszinuseg-sorozatok"
      topicTitle="VI. Fejezet Összefoglalás"
      badge="8. Osztály • VI. Fejezet"
      topicBadge="🏆 VI. Fejezet • Témazáró Összefoglaló Kvíz"
      themeColor="emerald"
      levelConfigs={levelConfigs}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító',
          subtitle: 'Párosítsd össze a fejezet fogalmait, képleteit és megoldásait!',
          badgeText: '8 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-emerald-500" />,
          levels: {
            1: {
              title: '1. Szint: Alapfogalmak és Definíciók',
              subtitle: 'Kösd össze az arányosságok, függvények és valószínűség alapfogalmait!',
              rangeLabel: 'Párok:',
              range: '8 pár • Alapok',
              focus: 'Definíciók'
            },
            2: {
              title: '2. Szint: Képletek és Szabályok',
              subtitle: 'Párosítsd a képleteket a hozzájuk tartozó matematikai fogalmakkal!',
              rangeLabel: 'Párok:',
              range: '8 pár • Képletek',
              focus: 'Szabályok'
            },
            3: {
              title: '3. Szint: Számítások és Nevezetes Eredmények',
              subtitle: 'Kösd össze a feladványokat a pontos matematikai eredményeikkel!',
              rangeLabel: 'Párok:',
              range: '8 pár • Számítások',
              focus: 'Alkalmazás'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz, onSwitchToSorter }) => (
            <Chapter6SummaryMatcher
              key={`c6-matcher-${level}`}
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
          subtitle: 'Rendszerezd a fejezet fogalmait, képleteit és állításait!',
          badgeText: '12 Kártya szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-emerald-500" />,
          levels: {
            1: {
              title: '1. Szint: Témakörök Rendszerezése',
              subtitle: 'Válogasd szét: Függvények, Valószínűség vagy Sorozatok témakörébe tartoznak!',
              rangeLabel: 'Kártyák:',
              range: '12 kártya • Témák',
              focus: 'Rendszerezés'
            },
            2: {
              title: '2. Szint: Képletek Csoportosítása',
              subtitle: 'Csoportosítsd a képleteket alkalmazási területük szerint!',
              rangeLabel: 'Kártyák:',
              range: '12 kártya • Képletek',
              focus: 'Képletismeret'
            },
            3: {
              title: '3. Szint: Igaz, Hamis és Tévhitek',
              subtitle: 'Döntsd el a fejezet állításairól, hogy matematikailag igazak vagy csapdák!',
              rangeLabel: 'Kártyák:',
              range: '12 kártya • Állítások',
              focus: 'Kritikai gondolkodás'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz, onSwitchToMatcher }) => (
            <Chapter6SummarySorter
              key={`c6-sorter-${level}`}
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
    />
  );
};

export default Chapter6SummaryQuiz;

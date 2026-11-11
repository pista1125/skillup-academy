import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { EventCertaintyMatcher } from './EventCertaintyMatcher';
import { EventCertaintySorter } from './EventCertaintySorter';
import {
  CertaintySpectrumSvg,
  VennComplementSvg,
  BeadProbabilityDistributionSvg
} from './EventCertaintyFigures';

interface EventCertaintyQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
  [key: string]: any;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'A valószínűségi spektrum (0-tól 1-ig)',
    description: 'Lehetetlen esemény: P = 0 (0%). Biztos esemény: P = 1 (100%). Véletlen esemény: 0 < P < 1. Bármely A eseményre: 0 ≤ P(A) ≤ 1.',
    note: 'Két kocka összege ≤ 12 (biztos), összege 13 (lehetetlen).',
    color: 'from-amber-500 to-orange-600',
    figure: <CertaintySpectrumSvg size={200} />
  },
  {
    title: 'Komplementer események (A és Ā)',
    description: 'P(Ā) = 1 – P(A), azaz P(A) + P(Ā) = 1. A „legalább egy” típusú kérdéseknél szinte mindig az ellentett esemény (nulla találat) számítása a leggyorsabb!',
    note: 'P(legalább 1 írás 2 érménél) = 1 – P(két fej) = 1 – 1/4 = 3/4 = 75%.',
    color: 'from-indigo-500 to-purple-600',
    figure: <VennComplementSvg size={200} />
  },
  {
    title: 'Egymást kizáró események & Dinamikus arányok',
    description: 'Ha A és B kizárják egymást: P(A vagy B) = P(A) + P(B). Készlet bővítésekor a számláló és a nevező is nő: (k + x) / (n + x) = cél.',
    note: '15 almás és 5 mogyorós: (5 + x) / (20 + x) = 2/5 ⟹ x = 5 db mogyorós.',
    color: 'from-emerald-500 to-teal-600',
    figure: <BeadProbabilityDistributionSvg size={200} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és a valószínűségi spektrum',
    subtitle: '10 alapozó feladat a biztos, lehetetlen és véletlen események felismeréséről',
    range: '1–10. kérdés',
    focus: 'Eseménytípusok, 0 és 1 határok, alapkísérletek (kocka, érme, színes golyók)',
    badgeBg: 'bg-amber-100 dark:bg-amber-950/60',
    badgeBorder: 'border-amber-200 dark:border-amber-800',
    badgeText: 'text-amber-800 dark:text-amber-300',
    accentGradient: 'from-amber-500 to-orange-600',
    questions: [
      {
        id: 'ecq1-1',
        level: 1,
        question: 'Melyik eseményt nevezzük biztos eseménynek a valószínűségszámításban?',
        options: [
          'Amely a kísérlet során garantáltan bekövetkezik, valószínűsége P = 1 (100%)',
          'Amelynek 50% az esélye',
          'Amely soha nem következhet be, valószínűsége 0',
          'Amelyet már legalább 100-szor megfigyeltünk'
        ],
        correctAnswer: 0,
        explanation: 'A biztos esemény minden lehetséges kimenetelt tartalmaz, vagyis megegyezik a teljes eseménytérrel (I = Ω), így valószínűsége pontosan 1 (100%).',
        hint: 'Gondolj a garantált kimenetelekre!'
      },
      {
        id: 'ecq1-2',
        level: 1,
        question: 'Melyik eseményt nevezzük lehetetlen eseménynek?',
        options: [
          'Amely a kísérlet során egyetlen kimenetel esetén sem valósulhat meg, valószínűsége P = 0 (0%)',
          'Amely ritkábban fordul elő, mint 1%',
          'Amelynek nincs ellentett eseménye',
          'Amelynek negatív a valószínűsége'
        ],
        correctAnswer: 0,
        explanation: 'A lehetetlen esemény az üres halmaznak felel meg (∅), egyetlen kedvező elemi eseménye sincs, ezért valószínűsége pontosan 0.',
        hint: 'Lehetetlen esemény soha nem történhet meg.'
      },
      {
        id: 'ecq1-3',
        level: 1,
        question: 'Két szabályos dobókockával dobunk. Milyen típusú esemény az, hogy „a dobott pontok összege 16-nál kisebb”?',
        options: [
          'Biztos esemény (P = 1)',
          'Lehetetlen esemény (P = 0)',
          'Véletlen esemény',
          'Függ a kockák színétől'
        ],
        correctAnswer: 0,
        explanation: 'Két kockával a maximálisan dobható összeg 6 + 6 = 12. Mivel 12 mindig kisebb 16-nál, ez az esemény garantáltan megvalósul: P = 1.',
        hint: 'Mennyi a legnagyobb összeg két kockánál?'
      },
      {
        id: 'ecq1-4',
        level: 1,
        question: 'Két szabályos dobókockával dobunk. Milyen típusú esemény az, hogy „a dobott pontok összege 12-nél nagyobb”?',
        options: [
          'Lehetetlen esemény (P = 0)',
          'Biztos esemény (P = 1)',
          'Véletlen esemény, esélye 1/36',
          'Komplementer biztos esemény'
        ],
        correctAnswer: 0,
        explanation: 'Két kockán a maximális dobásösszeg 12, így 12-nél nagyobb összeg soha nem fordulhat elő: lehetetlen esemény, P = 0.',
        hint: 'Lehet-e a dobott számok összege 13?'
      },
      {
        id: 'ecq1-5',
        level: 1,
        question: 'Egy szabályos dobókockával dobva mekkora annak a valószínűsége, hogy a dobott szám osztója 60-nak?',
        options: [
          '1 (Biztos esemény: P = 100%)',
          '5/6',
          '4/6 = 2/3',
          '0 (Lehetetlen esemény)'
        ],
        correctAnswer: 0,
        explanation: 'A kocka lehetséges kimenetelei: 1, 2, 3, 4, 5, 6. Mivel a 60 osztható 1-gyel, 2-vel, 3-mal, 4-gyel, 5-tel és 6-tal is, mind a 6 kimenetel kedvező: 6/6 = 1.',
        hint: 'Vizsgáld meg az 1, 2, 3, 4, 5, 6 számokat: osztói a 60-nak?'
      },
      {
        id: 'ecq1-6',
        level: 1,
        question: 'Egy szabályos dobókockával dobva mekkora annak a valószínűsége, hogy a dobott szám osztható 60-nal?',
        options: [
          '0 (Lehetetlen esemény)',
          '1/6',
          '1',
          '6/60 = 0,1'
        ],
        correctAnswer: 0,
        explanation: 'A 60 legkisebb pozitív többszöröse maga a 60. A dobókockán a maximális szám a 6, így egyetlen dobás sem lehet osztható 60-nal: P = 0.',
        hint: 'Lehet egy 1 és 6 közötti szám osztható 60-nal?'
      },
      {
        id: 'ecq1-7',
        level: 1,
        question: 'Egy dobozban 5 különböző színű golyó van (barna, fehér, kék, piros, sárga). Mennyi a valószínűsége, hogy egy véletlenül kihúzott golyó piros lesz?',
        options: [
          '1/5 = 0,2 (20%)',
          '1/4 = 0,25 (25%)',
          '4/5 = 0,8 (80%)',
          '1 (100%)'
        ],
        correctAnswer: 0,
        explanation: 'Az összes elemi esemény száma n = 5, ebből pontosan k = 1 golyó piros. A valószínűség: P = 1/5 = 0,2.',
        hint: '1 piros van az 5 golyóból.'
      },
      {
        id: 'ecq1-8',
        level: 1,
        question: 'Ugyanebből az 5 különböző színű golyót tartalmazó dobozból húzva mennyi a valószínűsége, hogy a golyó NEM piros lesz?',
        options: [
          '4/5 = 0,8 (80%)',
          '1/5 = 0,2 (20%)',
          '1 (100%)',
          '3/5 = 0,6 (60%)'
        ],
        correctAnswer: 0,
        explanation: 'A „nem piros” esemény a piros húzás komplementere (ellentettje): P(nem piros) = 1 – P(piros) = 1 – 1/5 = 4/5 = 80%.',
        hint: 'Vond ki 1-ből a piros kihúzásának esélyét!'
      },
      {
        id: 'ecq1-9',
        level: 1,
        question: 'Ugyanebből az 5 golyós dobozból húzva mekkora a valószínűsége, hogy a golyó barna VAGY kék lesz?',
        options: [
          '2/5 = 0,4 (40%)',
          '1/5 = 0,2 (20%)',
          '1/10 = 0,1 (10%)',
          '3/5 = 0,6 (60%)'
        ],
        correctAnswer: 0,
        explanation: 'Egy golyó nem lehet egyszerre barna és kék (kizárják egymást). A kedvező esetek száma 1 + 1 = 2: P = 2/5 = 0,4.',
        hint: 'A barna és a kék húzása egymást kizáró esemény.'
      },
      {
        id: 'ecq1-10',
        level: 1,
        question: 'Három pénzérmét feldobunk egyszerre. Mennyi a valószínűsége, hogy mindhárom érmén más oldal látható?',
        options: [
          '0 (Lehetetlen esemény)',
          '1/8 (12,5%)',
          '3/8 (37,5%)',
          '1/3 (33,3%)'
        ],
        correctAnswer: 0,
        explanation: 'Az érmének csak 2 oldala van (Fej és Írás). A skatulyaelv miatt 3 érme esetén legalább kettőn szükségszerűen ugyanaz az oldal fog látszódni, így lehetetlen mindhármon különböző oldalt látni: P = 0.',
        hint: 'Hány oldala van egy érmének?'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Törtes arányok, komplementerek és tankönyvi feladatok',
    subtitle: '10 számításos feladat gyöngyökkel, osztálylétszámokkal és utazási adatokkal',
    range: '11–20. kérdés',
    focus: 'Gyöngyök dobozban, 10.a osztály kalapsorsolása, repülőgép utasai, számkártyák',
    badgeBg: 'bg-orange-100 dark:bg-orange-950/60',
    badgeBorder: 'border-orange-200 dark:border-orange-800',
    badgeText: 'text-orange-800 dark:text-orange-300',
    accentGradient: 'from-orange-500 to-amber-600',
    questions: [
      {
        id: 'ecq2-1',
        level: 2,
        question: 'Egy doboz gyöngy 1/6 része fehér, 25%-a piros, 1/2 része zöld, a többi sárga. Mennyi a valószínűsége, hogy egy kihúzott gyöngy sárga?',
        options: [
          '1/12 (kb. 8,33%)',
          '1/6 (kb. 16,67%)',
          '1/24 (kb. 4,17%)',
          '5/12 (kb. 41,7%)'
        ],
        correctAnswer: 0,
        explanation: 'Közös nevezőre hozva: 1/6 = 2/12; 25% = 1/4 = 3/12; 1/2 = 6/12. Összesen eddig: (2 + 3 + 6)/12 = 11/12. A maradék sárga: 1 – 11/12 = 1/12.',
        hint: 'Hozd a törteket közös (12-es) nevezőre, és vond ki 1-ből az összeget!'
      },
      {
        id: 'ecq2-2',
        level: 2,
        question: 'A fenti gyöngyös dobozból véletlenszerűen húzva mekkora annak a valószínűsége, hogy a gyöngy piros VAGY zöld lesz?',
        options: [
          '3/4 = 75%',
          '1/8 = 12,5%',
          '1/2 = 50%',
          '2/3 (kb. 66,7%)'
        ],
        correctAnswer: 0,
        explanation: 'A piros és a zöld gyöngy húzása egymást kizáró események: P(piros ∪ zöld) = P(piros) + P(zöld) = 1/4 + 1/2 = 3/4 = 75%.',
        hint: 'Add össze a két szín valószínűségét: 1/4 + 1/2.'
      },
      {
        id: 'ecq2-3',
        level: 2,
        question: 'A fenti gyöngyös dobozból húzva mekkora a valószínűsége annak, hogy a kihúzott gyöngy kék színű lesz?',
        options: [
          '0 (Lehetetlen esemény)',
          '1/12',
          '0,05',
          'Nem határozható meg'
        ],
        correctAnswer: 0,
        explanation: 'A dobozban csak fehér, piros, zöld és sárga gyöngyök vannak, kék egyáltalán nincs: lehetetlen esemény, P = 0.',
        hint: 'Van kék gyöngy a megadott leírásban?'
      },
      {
        id: 'ecq2-4',
        level: 2,
        question: 'A fenti gyöngyös dobozból húzva mekkora a valószínűsége, hogy a kihúzott gyöngy NEM fekete színű?',
        options: [
          '1 (Biztos esemény: 100%)',
          '11/12',
          '0,5',
          '0'
        ],
        correctAnswer: 0,
        explanation: 'Mivel a dobozban lévő összes gyöngy fehér, piros, zöld vagy sárga, egyetlen fekete sincs. Bármelyiket is húzzuk, az biztosan nem lesz fekete: P = 1.',
        hint: 'Minden kihúzott gyöngy nem fekete lesz.'
      },
      {
        id: 'ecq2-5',
        level: 2,
        question: 'A 10.a osztályba 22 lány és 13 fiú jár (összesen 35 tanuló). Kalapból húznak 5 nevet. Az első 4 név lány. Mi a valószínűsége, hogy az 5. kihúzott név fiú?',
        options: [
          '13/31 (kb. 41,9%)',
          '13/35 (kb. 37,1%)',
          '1/13',
          '18/31 (kb. 58,1%)'
        ],
        correctAnswer: 0,
        explanation: '4 lány kihúzása után a kalapban 35 – 4 = 31 név maradt. A 13 fiú mindegyikének neve még bent van: P = 13/31.',
        hint: 'Hány név maradt bent a kalapban, és hány fiú van köztük?'
      },
      {
        id: 'ecq2-6',
        level: 2,
        question: 'A fenti osztályban 4 lány kihúzása után mennyi annak a valószínűsége, hogy az 5. kihúzott név is lány lesz?',
        options: [
          '18/31 (kb. 58,1%)',
          '22/35',
          '13/31',
          '4/31'
        ],
        correctAnswer: 0,
        explanation: 'A 22 lányból 4-et már kihúztak, így 22 – 4 = 18 lány maradt a 31 bent lévő tanulóból: P = 18/31.',
        hint: 'Hány lány neve maradt még a kalapban a 31-ből?'
      },
      {
        id: 'ecq2-7',
        level: 2,
        question: 'Egy repülőgép 200 utasa közül 94 magyar, 72 angol, 20 holland és 14 német. Mennyi a valószínűsége, hogy egy véletlenül kiválasztott utas magyar állampolgár?',
        options: [
          '94/200 = 0,47 (47%)',
          '94/106',
          '0,50 (50%)',
          '47/200'
        ],
        correctAnswer: 0,
        explanation: 'A kedvező esetek száma 94, az összes utas száma 200: P = 94/200 = 47/100 = 0,47.',
        hint: '94 a 200-ból.'
      },
      {
        id: 'ecq2-8',
        level: 2,
        question: 'A fenti repülőgépen mekkora annak a valószínűsége, hogy a kiválasztott utas holland VAGY német állampolgár?',
        options: [
          '34/200 = 0,17 (17%)',
          '20/200 = 10%',
          '14/200 = 7%',
          '0,34'
        ],
        correctAnswer: 0,
        explanation: 'Holland 20, német 14 utas van (a két állampolgárság kizárja egymást): (20 + 14) / 200 = 34/200 = 0,17 (17%).',
        hint: 'Add össze a holland és a német utasok számát!'
      },
      {
        id: 'ecq2-9',
        level: 2,
        question: 'A fenti repülőgépen mekkora a valószínűsége, hogy a kiválasztott utas NEM angol állampolgár?',
        options: [
          '128/200 = 0,64 (64%)',
          '72/200 = 0,36 (36%)',
          '94/200 = 0,47',
          '0,72'
        ],
        correctAnswer: 0,
        explanation: 'Komplementer eseménnyel: P(nem angol) = 1 – P(angol) = 1 – 72/200 = 128/200 = 0,64 = 64%.',
        hint: 'Vond ki az angol utasok arányát 1-ből!'
      },
      {
        id: 'ecq2-10',
        level: 2,
        question: 'Az {1, 2, 3} számkártyákból véletlenszerűen kirakunk egy háromjegyű számot. Mennyi a valószínűsége, hogy ez a szám páratlan lesz?',
        options: [
          '2/3 (kb. 66,7%)',
          '1/3 (kb. 33,3%)',
          '1/2 (50%)',
          '3/6'
        ],
        correctAnswer: 0,
        explanation: 'Egy szám akkor páratlan, ha az utolsó számjegye páratlan. A kártyák közül az 1 és a 3 páratlan, a 2 páros. Bármilyen sorrendben rakjuk ki, az utolsó pozícióba 2/3 eséllyel kerül páratlan szám: P = 2/3.',
        hint: 'Az utolsó jegy 1, 2 vagy 3 lehet. Ebből hány páratlan?'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Dinamikus egyenletek és emelt szintű összefüggések',
    subtitle: '10 komplex feladat arányváltásokról, golyóhozzáadásról és skatulyaelvről',
    range: '21–30. kérdés',
    focus: 'Müzliszeletek, 60 golyós egyenlet, legalább egy szabály, skatulyaelvi biztos esemény',
    badgeBg: 'bg-emerald-100 dark:bg-emerald-950/60',
    badgeBorder: 'border-emerald-200 dark:border-emerald-800',
    badgeText: 'text-emerald-800 dark:text-emerald-300',
    accentGradient: 'from-emerald-500 to-teal-600',
    questions: [
      {
        id: 'ecq3-1',
        level: 3,
        question: 'Egy zacskóban 15 almás és 5 mogyorós müzliszelet van (összesen 20 db). Kihúzunk egyet. Mennyi a valószínűsége, hogy mogyorósat húzunk?',
        options: [
          '5/20 = 1/4 = 0,25 (25%)',
          '5/15 = 1/3 (33,3%)',
          '15/20 = 0,75 (75%)',
          '0,20'
        ],
        correctAnswer: 0,
        explanation: 'A kedvező esetek száma 5, az összes szelet száma 20: P = 5/20 = 1/4 = 0,25.',
        hint: '5 a 20-ból.'
      },
      {
        id: 'ecq3-2',
        level: 3,
        question: 'Hány mogyorós müzliszeletet kell még betenni a fenti zacskóba (x), hogy a mogyorós húzásának valószínűsége 2/5 (40%) legyen?',
        options: [
          '5 db',
          '3 db',
          '8 db',
          '10 db'
        ],
        correctAnswer: 0,
        explanation: 'Egyenlet: (5 + x) / (20 + x) = 2/5 ⟹ 5·(5 + x) = 2·(20 + x) ⟹ 25 + 5x = 40 + 2x ⟹ 3x = 15 ⟹ x = 5 db mogyorós szelet.',
        hint: 'Állíts fel egyenletet: (5 + x) / (20 + x) = 2/5.'
      },
      {
        id: 'ecq3-3',
        level: 3,
        question: 'Egy dobozban 60 golyó van (fehér és fekete). P(fehér) = 0,4 és P(fekete) = 0,6. Hány fehér golyó van eredetileg a dobozban?',
        options: [
          '24 db',
          '36 db',
          '40 db',
          '20 db'
        ],
        correctAnswer: 0,
        explanation: 'A fehér golyók száma: 60 · 0,4 = 24 db (a fekete golyók száma: 60 · 0,6 = 36 db).',
        hint: 'Szorozd meg az összes golyó számát a valószínűséggel: 60 · 0,4.'
      },
      {
        id: 'ecq3-4',
        level: 3,
        question: 'A 60 golyós dobozba (24 fehér, 36 fekete) hány fehér golyót kell még beletenni (x), hogy P(fehér) = 0,6 legyen?',
        options: [
          '30 db',
          '24 db',
          '12 db',
          '36 db'
        ],
        correctAnswer: 0,
        explanation: 'Egyenlet: (24 + x) / (60 + x) = 0,6 ⟹ 24 + x = 36 + 0,6x ⟹ 0,4x = 12 ⟹ x = 12 / 0,4 = 30 db fehér golyó.',
        hint: 'Egyenlet: (24 + x) / (60 + x) = 0,6.'
      },
      {
        id: 'ecq3-5',
        level: 3,
        question: 'Ugyanebből a dobozból (24 fehér, 36 fekete) hány fekete golyót kellene KIVÉNNI (y), hogy P(fehér) = 0,6 legyen?',
        options: [
          '20 db',
          '16 db',
          '24 db',
          '12 db'
        ],
        correctAnswer: 0,
        explanation: 'Egyenlet: 24 / (60 – y) = 0,6 ⟹ 24 = 36 – 0,6y ⟹ 0,6y = 12 ⟹ y = 12 / 0,6 = 20 db fekete golyó kivétele.',
        hint: 'A fehérek száma marad 24, a nevező 60 – y lesz: 24 / (60 – y) = 0,6.'
      },
      {
        id: 'ecq3-6',
        level: 3,
        question: 'Két pénzérmét feldobva mekkora a valószínűsége annak, hogy legalább az egyik érmén Írás látható?',
        options: [
          '3/4 = 0,75 (75%)',
          '1/2 = 0,50 (50%)',
          '1/4 = 0,25 (25%)',
          '2/3 (66,7%)'
        ],
        correctAnswer: 0,
        explanation: 'Komplementer eseménnyel: az egyetlen eset, amikor nem látunk legalább egy írást, az a két fej (FF), amelynek esélye 1/4. Így P(legalább 1 írás) = 1 – 1/4 = 3/4 = 75%.',
        hint: 'Vonjuk ki a „két fej” esélyét (1/4) 1-ből!'
      },
      {
        id: 'ecq3-7',
        level: 3,
        question: '10 számkártya értékei: {|-7|, 5, 0, 20, -8, -(-4), |8|, -12, -6, 34}. Hány negatív szám van a kártyák között?',
        options: [
          '3 db (-8, -12, -6)',
          '5 db',
          '4 db',
          '2 db'
        ],
        correctAnswer: 0,
        explanation: 'Értékek kiszámolva: |-7| = 7, 5, 0, 20, -8, -(-4) = 4, |8| = 8, -12, -6, 34. Negatívak kizárólag a -8, -12, -6 (3 db). A 0 nemnegatív!',
        hint: 'Számold ki az abszolútértékeket és az előjeleket: |-7|=7, -(-4)=4.'
      },
      {
        id: 'ecq3-8',
        level: 3,
        question: 'A fenti 10 számkártyából legkevesebb hányat kell kihúzni visszatevés nélkül, hogy biztosan legyen köztük legalább egy negatív szám?',
        options: [
          '8 db kártyát',
          '4 db kártyát',
          '7 db kártyát',
          '3 db kártyát'
        ],
        correctAnswer: 0,
        explanation: 'A 10 kártyából 3 negatív és 7 nemnegatív van. A legrosszabb esetben az első 7 húzás mind nemnegatív számot ad. A 8. kihúzott kártya viszont már garantáltan (biztos eseményként) negatív lesz: 7 + 1 = 8 db.',
        hint: 'Gondolj a legrosszabb esetre (skatulyaelv): hány nemnegatív számot húzhatunk ki egymás után?'
      },
      {
        id: 'ecq3-9',
        level: 3,
        question: 'Egy dolgozatban valaki az esemény valószínűségére P(A) = 1,15 eredményt kapott. Mi mondható el erről az eredményről?',
        options: [
          'Biztosan hibás a számolás, mert a valószínűség soha nem haladhatja meg az 1-et (100%-ot)',
          'Elfogadható, ha a kísérletet többször megismételték',
          'Csak akkor érvényes, ha a biztos eseménynél is biztosabb a kimenetel',
          'A negatív valószínűségek ellentettje'
        ],
        correctAnswer: 0,
        explanation: 'A valószínűségszámítás alaptétele szerint minden eseményre 0 ≤ P(A) ≤ 1. Az 1,15 matematikai képtelenség, valószínűleg a kedvező esetek száma tévesen meghaladta az összes esetet.',
        hint: 'Lehet-e a valószínűség 100%-nál nagyobb?'
      },
      {
        id: 'ecq3-10',
        level: 3,
        question: 'Ha A és B egymást kizáró események, és P(A) = 0,35, P(B) = 0,45, akkor mennyi a valószínűsége, hogy sem A, sem B nem következik be?',
        options: [
          '0,20 (20%)',
          '0,80 (80%)',
          '0,10 (10%)',
          '0 (Lehetetlen)'
        ],
        correctAnswer: 0,
        explanation: 'Mivel kizárják egymást: P(A vagy B) = P(A) + P(B) = 0,35 + 0,45 = 0,80. Annak az esélye, hogy egyik sem következik be, ennek az ellentettje: 1 – 0,80 = 0,20.',
        hint: 'P(egyik sem) = 1 – P(A vagy B).'
      }
    ]
  }
};

export const EventCertaintyQuiz: React.FC<EventCertaintyQuizProps> = (props) => {
  const {
    onBack,
    onSwitchToTheory,
    onSwitchToMatcher,
    onSwitchToSorter,
    initialGameMode = 'quiz',
    ...restProps
  } = props;

  return (
    <QuizTemplate
      topicId="g10-stat-biztos-lehetetlen-veletlen-quiz"
      topicTitle="Biztos, lehetetlen, véletlen"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <EventCertaintyMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <EventCertaintySorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      {...restProps}
    />
  );
};

export default EventCertaintyQuiz;


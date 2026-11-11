import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { RandomFrequencyMatcher } from './RandomFrequencyMatcher';
import { RandomFrequencySorter } from './RandomFrequencySorter';
import {
  CoinFlipLawOfLargeNumbersSvg,
  ThreeCoinsOutcomesSvg,
  DiceSimulationFrequencySvg
} from './RandomFrequencyFigures';

interface RandomFrequencyQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
  [key: string]: any;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Relatív gyakoriság és stabilitás (400 dobás)',
    description: 'Relatív gyakoriság: g = k / n. A kísérletszám növelésével a kísérleti relatív gyakoriság ingadozása csillapodik, és az elméleti 0,5 valószínűséghez simul.',
    note: 'Nagy számok empirikus törvénye: n → ∞ esetén k/n → P(A).',
    color: 'from-violet-500 to-purple-600',
    figure: <CoinFlipLawOfLargeNumbersSvg size={200} />
  },
  {
    title: 'Három érme és Tibor tévedése',
    description: '3 érme feldobásakor 2³ = 8 elemi esemény van. Az „1 fej és 2 írás” 3 elemi esetből áll (FII, IFI, IIF), így esélye 3/8 = 37,5%, nem pedig 1/4 (25%)!',
    note: 'Az összetett kimenetelek nem feltétlenül egyformán valószínűek.',
    color: 'from-fuchsia-500 to-pink-600',
    figure: <ThreeCoinsOutcomesSvg size={200} />
  },
  {
    title: '850 kockadobás szimulációja',
    description: '850 dobásból: Prímszámok {2, 3, 5} = 451 db (53,06%); Összetett számok {4, 6} = 273 db (32,12%); Legalább 5-ös = 254 db (29,88%).',
    note: 'A kockadobások független kísérletek: a korábbi dobások nem hatnak a következőre.',
    color: 'from-emerald-500 to-teal-600',
    figure: <DiceSimulationFrequencySvg size={200} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és érmedobások',
    subtitle: '10 alapozó feladat a kísérletekről, a gyakoriságról és a relatív gyakoriságról',
    range: '1–10. kérdés',
    focus: 'Gyakoriság, relatív gyakoriság számítás, stabilitás és alapvető események',
    badgeBg: 'bg-violet-100 dark:bg-violet-950/60',
    badgeBorder: 'border-violet-200 dark:border-violet-800',
    badgeText: 'text-violet-800 dark:text-violet-300',
    accentGradient: 'from-violet-500 to-purple-600',
    questions: [
      {
        id: 'rfq1-1',
        level: 1,
        question: 'Hogyan számítjuk ki egy esemény relatív gyakoriságát (g), ha az n kísérletből k-szor következett be?',
        options: [
          'g = k / n',
          'g = n / k',
          'g = k · n',
          'g = n - k'
        ],
        correctAnswer: 'g = k / n',
        explanation: 'A relatív gyakoriság a kedvező bekövetkezések száma (k) osztva az összes elvégzett kísérlet számával (n): g = k / n.',
        hint: 'Hányadrészében következett be az esemény az összes kísérletnek?',
        questionTypeBadge: 'Fogalom'
      },
      {
        id: 'rfq1-2',
        level: 1,
        question: 'Egy szabályos pénzérmét 50-szer feldobunk, és 24 alkalommal kapunk fejet. Mennyi a fejek relatív gyakorisága?',
        options: [
          '0,48 (48%)',
          '0,24 (24%)',
          '0,50 (50%)',
          '0,52 (52%)'
        ],
        correctAnswer: '0,48 (48%)',
        explanation: 'Relatív gyakoriság: g = 24 / 50 = 48 / 100 = 0,48 = 48%.',
        hint: '24 osztva 50-nel.',
        questionTypeBadge: 'Számolás'
      },
      {
        id: 'rfq1-3',
        level: 1,
        question: '100 érmedobásból 49 alkalommal lett fej. Mennyi az ÍRÁSOK relatív gyakorisága ebben a kísérletben?',
        options: [
          '0,51 (51%)',
          '0,49 (49%)',
          '0,50 (50%)',
          '0,01 (1%)'
        ],
        correctAnswer: '0,51 (51%)',
        explanation: 'Az írások száma 100 - 49 = 51 db. Az írások relatív gyakorisága: 51 / 100 = 0,51 (51%).',
        hint: '100-ból 49 fej volt, tehát hány volt írás?',
        questionTypeBadge: 'Számolás'
      },
      {
        id: 'rfq1-4',
        level: 1,
        question: 'Milyen határok közé eshet egy tetszőleges esemény relatív gyakorisága?',
        options: [
          'Mindig a 0 és 1 közötti zárt intervallumba: 0 ≤ g ≤ 1',
          'Bármilyen pozitív valós szám lehet',
          '-1 és +1 közé eshet',
          'Mindig pontosan 0,5'
        ],
        correctAnswer: 'Mindig a 0 és 1 közötti zárt intervallumba: 0 ≤ g ≤ 1',
        explanation: 'Mivel a gyakoriság 0 és n közé eshet (0 ≤ k ≤ n), ezért k/n értéke kötelezően 0 és 1 közé esik (0% és 100% között).',
        hint: 'Egy arány sosem lehet negatív és nem lehet nagyobb az egésznél.',
        questionTypeBadge: 'Tétel'
      },
      {
        id: 'rfq1-5',
        level: 1,
        question: 'Mennyi egy biztos esemény relatív gyakorisága bármely kísérletsorozatban?',
        options: [
          'Pontosan 1 (100%)',
          'Pontosan 0 (0%)',
          'Körülbelül 0,5',
          'Tetszőleges szám lehet'
        ],
        correctAnswer: 'Pontosan 1 (100%)',
        explanation: 'A biztos esemény minden egyes kísérletben bekövetkezik, tehát k = n, így g = n / n = 1 (100%).',
        hint: 'Minden alkalommal bekövetkezik: k = n.',
        questionTypeBadge: 'Fogalom'
      },
      {
        id: 'rfq1-6',
        level: 1,
        question: 'Mennyi egy lehetetlen esemény relatív gyakorisága?',
        options: [
          'Pontosan 0 (0%)',
          'Pontosan 1 (100%)',
          '-1',
          '0,1'
        ],
        correctAnswer: 'Pontosan 0 (0%)',
        explanation: 'A lehetetlen esemény egyszer sem következhet be, így k = 0, ebből g = 0 / n = 0 (0%).',
        hint: 'Egyszer sem fordul elő: k = 0.',
        questionTypeBadge: 'Fogalom'
      },
      {
        id: 'rfq1-7',
        level: 1,
        question: 'Két szabályos pénzérmét dobunk fel egyszerre. Hány különböző elemi kimenetel lehetséges?',
        options: [
          '4 kimenetel (FF, FI, IF, II)',
          '3 kimenetel (két fej, két írás, vegyes)',
          '2 kimenetel',
          '8 kimenetel'
        ],
        correctAnswer: '4 kimenetel (FF, FI, IF, II)',
        explanation: 'Mindkét érme kétféle lehet, így 2 · 2 = 4 elemi esemény van: FF, FI, IF, II.',
        hint: '2 · 2 = ?',
        questionTypeBadge: 'Kombinatorika'
      },
      {
        id: 'rfq1-8',
        level: 1,
        question: 'Két érme feldobásakor mekkora a valószínűsége, hogy LEGALÁBB egy fej lesz?',
        options: [
          '3/4 (75%)',
          '1/2 (50%)',
          '1/4 (25%)',
          '2/3 (66,7%)'
        ],
        correctAnswer: '3/4 (75%)',
        explanation: 'A 4 esetből (FF, FI, IF, II) három esetben van legalább egy fej (FF, FI, IF), így a valószínűség 3/4 = 75%.',
        hint: 'Csak az az eset rossz, amikor mindkettő írás (II).',
        questionTypeBadge: 'Számolás'
      },
      {
        id: 'rfq1-9',
        level: 1,
        question: 'Mit mond ki a relatív gyakoriság empirikus stabilitásának törvénye?',
        options: [
          'Nagyszámú kísérlet elvégzésekor a relatív gyakoriság egyre kisebb ingadozással az elméleti valószínűség körül stabilizálódik',
          'A relatív gyakoriság minden dobás után pontosan megegyezik 0,5-tel',
          'A gyakoriság mindig kétszerese a relatív gyakoriságnak',
          'A kísérletszám növelésével a kimenetelek száma csökken'
        ],
        correctAnswer: 'Nagyszámú kísérlet elvégzésekor a relatív gyakoriság egyre kisebb ingadozással az elméleti valószínűség körül stabilizálódik',
        explanation: 'Ez a tapasztalati törvény köti össze a kísérleti statisztikát az elméleti valószínűségszámítással: sok kísérletnél k/n → P(A).',
        hint: 'Sok dobásnál a véletlen kilengései elsimulnak.',
        questionTypeBadge: 'Tétel'
      },
      {
        id: 'rfq1-10',
        level: 1,
        question: 'Egy szabályos dobókockával 60-szor dobunk. Körülbelül hányszor várható, hogy 6-ost dobunk?',
        options: [
          'Körülbelül 10-szer',
          'Pontosan 6-szor',
          'Körülbelül 20-szor',
          'Biztosan 10-szer'
        ],
        correctAnswer: 'Körülbelül 10-szer',
        explanation: 'A 6-os dobás elméleti valószínűsége 1/6. 60 dobásból várhatóan 60 · (1/6) = 10 alkalommal születik 6-os (bár a véletlen miatt enyhe eltérés lehetséges).',
        hint: '60 egyhatod része.',
        questionTypeBadge: 'Alkalmazás'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Három érme, kockaszimuláció és események',
    subtitle: '10 összetettebb feladat 3 érme kombinációiról és 850 számítógépes kockadobás elemzéséről',
    range: '11–20. kérdés',
    focus: 'Elemi események szorzata (2³=8), Tibor csapdájának feloldása, kockadobások gyakorisága',
    badgeBg: 'bg-fuchsia-100 dark:bg-fuchsia-950/60',
    badgeBorder: 'border-fuchsia-200 dark:border-fuchsia-800',
    badgeText: 'text-fuchsia-800 dark:text-fuchsia-300',
    accentGradient: 'from-fuchsia-500 to-pink-600',
    questions: [
      {
        id: 'rfq2-1',
        level: 2,
        question: 'Három különböző pénzérmét dobunk fel egyszerre. Hány különböző elemi kimenetel létezik összesen?',
        options: [
          '8 elemi esemény',
          '6 elemi esemény',
          '4 elemi esemény',
          '16 elemi esemény'
        ],
        correctAnswer: '8 elemi esemény',
        explanation: 'Minden érmének 2 oldala lehet: 2 · 2 · 2 = 2³ = 8 elemi eset (FFF, FFI, FIF, IFF, FII, IFI, IIF, III).',
        hint: '2 a harmadik hatványon.',
        questionTypeBadge: 'Kombinatorika'
      },
      {
        id: 'rfq2-2',
        level: 2,
        question: 'Három érme feldobásakor mekkora a valószínűsége, hogy mindhárom érmén írás (III) lesz?',
        options: [
          '1/8 = 12,5%',
          '1/4 = 25%',
          '1/3 ≈ 33,3%',
          '1/6 ≈ 16,7%'
        ],
        correctAnswer: '1/8 = 12,5%',
        explanation: 'A 8 egyenlően valószínű elemi eset közül pontosan egyetlen kedvező (a III), így P(III) = 1/8 = 0,125 = 12,5%.',
        hint: '1 kedvező eset a 8 lehetségesből.',
        questionTypeBadge: 'Számolás'
      },
      {
        id: 'rfq2-3',
        level: 2,
        question: 'Tibor úgy érvel, hogy három érménél annak az esélye, hogy 1 fej és 2 írás lesz, pontosan 1/4 (25%). Mi a helyes valószínűség?',
        options: [
          '3/8 = 37,5%',
          '1/4 = 25%',
          '1/2 = 50%',
          '2/8 = 25%'
        ],
        correctAnswer: '3/8 = 37,5%',
        explanation: 'Az „1 fej és 2 írás” esemény 3 mikroszkopikus elemi esetből áll (FII, IFI, IIF), ezért a valószínűsége 3/8 = 37,5%, nem pedig 1/4!',
        hint: 'Három különböző sorrendben lehet 1 fej és 2 írás: FII, IFI, IIF.',
        questionTypeBadge: 'Típushiba'
      },
      {
        id: 'rfq2-4',
        level: 2,
        question: 'Három érme feldobásakor mennyi a valószínűsége, hogy pontosan 2 fej és 1 írás lesz a dobás eredménye?',
        options: [
          '3/8 = 37,5%',
          '1/4 = 25%',
          '2/3 ≈ 66,7%',
          '1/8 = 12,5%'
        ],
        correctAnswer: '3/8 = 37,5%',
        explanation: 'A 2 fej és 1 írás kimenetelei: FFI, FIF, IFF. Ez 3 kedvező eset a 8-ból: 3/8 = 37,5%.',
        hint: 'FFI, FIF, IFF: 3 kedvező eset a 8-ból.',
        questionTypeBadge: 'Számolás'
      },
      {
        id: 'rfq2-5',
        level: 2,
        question: 'Három érme feldobásakor mekkora annak az esélye, hogy mindhárom érmén azonos oldal lesz (mind fej vagy mind írás)?',
        options: [
          '2/8 = 1/4 = 25%',
          '1/8 = 12,5%',
          '1/2 = 50%',
          '3/8 = 37,5%'
        ],
        correctAnswer: '2/8 = 1/4 = 25%',
        explanation: 'Két kedvező elemi esemény van: FFF és III. P = 2 / 8 = 1 / 4 = 0,25 = 25%.',
        hint: 'FFF és III: két eset a nyolcból.',
        questionTypeBadge: 'Számolás'
      },
      {
        id: 'rfq2-6',
        level: 2,
        question: 'A számítógépes 850 kockadobásból az 1-es: 126, 2-es: 180, 3-as: 152, 4-es: 138, 5-ös: 119 alkalommal fordult elő. Hányszor dobott a gép 6-ost?',
        options: [
          '135 alkalommal',
          '142 alkalommal',
          '125 alkalommal',
          '150 alkalommal'
        ],
        correctAnswer: '135 alkalommal',
        explanation: 'Az ismert gyakoriságok összege: 126 + 180 + 152 + 138 + 119 = 715. A 6-osok száma: 850 - 715 = 135.',
        hint: '850 mínusz a többi öt szám összege (715).',
        questionTypeBadge: 'Számolás'
      },
      {
        id: 'rfq2-7',
        level: 2,
        question: 'A fenti 850 kockadobásból hányszor dobott a gép prímszámot ({2, 3, 5})?',
        options: [
          '451 alkalommal',
          '432 alkalommal',
          '510 alkalommal',
          '380 alkalommal'
        ],
        correctAnswer: '451 alkalommal',
        explanation: 'A kockán lévő prímszámok a 2, 3 és 5. Gyakoriságaik összege: 180 (2-es) + 152 (3-as) + 119 (5-ös) = 451.',
        hint: '1-es nem prím! Csak a 2, 3 és 5 gyakoriságát add össze.',
        questionTypeBadge: 'Alkalmazás'
      },
      {
        id: 'rfq2-8',
        level: 2,
        question: 'Mennyi volt a prímszámok relatív gyakorisága a 850 dobásból két tizedesjegyre kerekítve?',
        options: [
          '53,06%',
          '50,00%',
          '45,10%',
          '55,20%'
        ],
        correctAnswer: '53,06%',
        explanation: 'Relatív gyakoriság: 451 / 850 ≈ 0,530588... ≈ 53,06% (nagyon szép egyezés az elméleti 3/6 = 50%-os valószínűséggel).',
        hint: '451 osztva 850-nel.',
        questionTypeBadge: 'Számolás'
      },
      {
        id: 'rfq2-9',
        level: 2,
        question: 'A 850 dobásból hányszor dobott a gép összetett számot ({4, 6})?',
        options: [
          '273 alkalommal',
          '280 alkalommal',
          '250 alkalommal',
          '300 alkalommal'
        ],
        correctAnswer: '273 alkalommal',
        explanation: 'A kocka összetett számai a 4 és a 6: 138 (4-es) + 135 (6-os) = 273.',
        hint: 'Csak a 4 és a 6 összetett szám a kockán: 138 + 135.',
        questionTypeBadge: 'Alkalmazás'
      },
      {
        id: 'rfq2-10',
        level: 2,
        question: 'Mennyi volt az összetett számok relatív gyakorisága a 850 dobásból?',
        options: [
          '32,12%',
          '33,33%',
          '27,30%',
          '35,00%'
        ],
        correctAnswer: '32,12%',
        explanation: 'Relatív gyakoriság: 273 / 850 ≈ 0,32117... ≈ 32,12% (elméleti: 2/6 ≈ 33,33%).',
        hint: '273 osztva 850-nel.',
        questionTypeBadge: 'Számolás'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Függetlenség, játékos tévedése és érettségi összefüggések',
    subtitle: '10 emelt szintű kérdés a valószínűségi gondolkodásról és kombinatorikus modellekről',
    range: '21–30. kérdés',
    focus: 'Gambler\'s Fallacy, függetlenség, két kocka dobása, elméleti vs. tapasztalati esély',
    badgeBg: 'bg-emerald-100 dark:bg-emerald-950/60',
    badgeBorder: 'border-emerald-200 dark:border-emerald-800',
    badgeText: 'text-emerald-800 dark:text-emerald-300',
    accentGradient: 'from-emerald-500 to-teal-600',
    questions: [
      {
        id: 'rfq3-1',
        level: 3,
        question: 'Egy szabályos pénzérmével egymás után 5 alkalommal fejet dobtunk. Mekkora a valószínűsége, hogy a 6. dobás is fej lesz?',
        options: [
          'Pontosan 0,5 (50%)',
          'Sokkal kisebb, mint 0,5, mert már kiegyenlítődésnek kell jönnie',
          'Sokkal nagyobb, mint 0,5, mert a fej szériában van',
          'Körülbelül 0,1'
        ],
        correctAnswer: 'Pontosan 0,5 (50%)',
        explanation: 'Az érmének nincs memóriája: a dobások függetlenek. A „játékos tévedése” azt hinni, hogy a korábbi dobások befolyásolják a következőt. A valószínűség mindig pontosan 0,5.',
        hint: 'Független eseményeknél a múltbeli kimenetelek nem számítanak.',
        questionTypeBadge: 'Gondolkodási csapda'
      },
      {
        id: 'rfq3-2',
        level: 3,
        question: 'A 850 kockadobásból hányszor született LEGALÁBB 5-ös dobás ({5, 6})?',
        options: [
          '254 alkalommal (relatív: 29,88%)',
          '280 alkalommal (relatív: 32,94%)',
          '210 alkalommal (relatív: 24,71%)',
          '135 alkalommal'
        ],
        correctAnswer: '254 alkalommal (relatív: 29,88%)',
        explanation: 'Legalább 5-ös: 5-ös vagy 6-os. Gyakoriság: 119 + 135 = 254 db. Relatív gyakoriság: 254 / 850 ≈ 29,88% (elméleti: 2/6 ≈ 33,3%).',
        hint: 'Add össze az 5-ösök (119) és a 6-osok (135) számát.',
        questionTypeBadge: 'Alkalmazás'
      },
      {
        id: 'rfq3-3',
        level: 3,
        question: 'Két szabályos dobókockával dobunk egyszerre. Mennyi az összes lehetséges elemi kimenetel száma?',
        options: [
          '36',
          '12',
          '21',
          '18'
        ],
        correctAnswer: '36',
        explanation: 'Az első kocka 6-féle, a második kocka 6-féle lehet: 6 · 6 = 36 rendezett számpár (i, j).',
        hint: '6 szorozva 6-tal.',
        questionTypeBadge: 'Kombinatorika'
      },
      {
        id: 'rfq3-4',
        level: 3,
        question: 'Két kockával dobva mekkora a valószínűsége, hogy a dobott pontok összege pontosan 7 lesz?',
        options: [
          '6/36 = 1/6 ≈ 16,67%',
          '1/12 ≈ 8,33%',
          '7/36 ≈ 19,44%',
          '5/36 ≈ 13,89%'
        ],
        correctAnswer: '6/36 = 1/6 ≈ 16,67%',
        explanation: 'A 7 összeghez tartozó 6 pár: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1). Valószínűség: 6 / 36 = 1/6 ≈ 16,67%.',
        hint: 'Hány pár összege adja ki a 7-et?',
        questionTypeBadge: 'Számolás'
      },
      {
        id: 'rfq3-5',
        level: 3,
        question: 'A tankönyvi 400 dobásos kísérletben a fejek gyakorisága 201 volt. Mennyi volt a relatív gyakoriság és mekkora volt az eltérés az elméleti 0,5000-től?',
        options: [
          'g = 0,5025; az eltérés mindössze +0,0025 (+0,25%)',
          'g = 0,5200; az eltérés +0,0200',
          'g = 0,4975; az eltérés -0,0025',
          'g = 0,5000; nincs semmilyen eltérés'
        ],
        correctAnswer: 'g = 0,5025; az eltérés mindössze +0,0025 (+0,25%)',
        explanation: 'g = 201 / 400 = 0,5025. Az eltérés: 0,5025 - 0,5000 = +0,0025. Ez csodálatosan szemlélteti a nagy számok stabilitását!',
        hint: '201 / 400 = 0,5025.',
        questionTypeBadge: 'Kísérleti elemzés'
      },
      {
        id: 'rfq3-6',
        level: 3,
        question: 'Lehetséges-e, hogy 10 szabályos érmedobásból mind a 10 alkalommal fej legyen az eredmény?',
        options: [
          'Igen, elméletileg lehetséges, bár a valószínűsége csupán (1/2)¹⁰ = 1/1024 ≈ 0,098%',
          'Nem, a fizikai törvények miatt legfeljebb 6 fej lehet egymás után',
          'Nem, mert a valószínűség pontosan 0',
          'Igen, 10% eséllyel'
        ],
        correctAnswer: 'Igen, elméletileg lehetséges, bár a valószínűsége csupán (1/2)¹⁰ = 1/1024 ≈ 0,098%',
        explanation: 'Minden dobás független, így 10 fej esélye (1/2)¹⁰ = 1/1024. Bár ritka (kb. ezerszeri kísérletből egyszer fordul elő), matematikailag teljesen lehetséges.',
        hint: '0,5 a tizedik hatványon: 1 / 1024.',
        questionTypeBadge: 'Elmélet'
      },
      {
        id: 'rfq3-7',
        level: 3,
        question: 'Egy kísérletben egy szabálytalan (cinkelt) pénzérmével 1000 dobást végeztek, és 650 fejet kaptak. Mit becsülhetünk ebből a fej elméleti valószínűségére?',
        options: [
          'Körülbelül P(Fej) ≈ 0,65 (65%)',
          'Pontosan P(Fej) = 0,50, mert minden érme fele-fele arányú',
          'P(Fej) = 0,35',
          'Nem lehet megbecsülni'
        ],
        correctAnswer: 'Körülbelül P(Fej) ≈ 0,65 (65%)',
        explanation: 'A relatív gyakoriság stabilitása szerint nagyszámú (1000) dobás után k/n = 650/1000 = 0,65 a valószínűség legjobb empirikus becslése.',
        hint: 'A relatív gyakoriság a valószínűséget becsüli.',
        questionTypeBadge: 'Statisztikai becslés'
      },
      {
        id: 'rfq3-8',
        level: 3,
        question: 'Mi a legfontosabb különbség a relatív gyakoriság és a valószínűség között?',
        options: [
          'A relatív gyakoriság egy konkrét kísérlet mérési eredménye (ingadozik), míg a valószínűség az eseményhez tartozó állandó elméleti érték',
          'A relatív gyakoriság egész szám, a valószínűség pedig tört',
          'A valószínűség mindig nagyobb, mint a relatív gyakoriság',
          'Nincs köztük semmilyen különbség'
        ],
        correctAnswer: 'A relatív gyakoriság egy konkrét kísérlet mérési eredménye (ingadozik), míg a valószínűség az eseményhez tartozó állandó elméleti érték',
        explanation: 'A relatív gyakoriság (k/n) tapasztalati adat, amely minden kísérletsorozatban kissé más lehet. A valószínűség (P) ezzel szemben a kísérlet elméleti modelljének egzakt állandója.',
        hint: 'Tapasztalat (empíria) vs. Elméleti modell.',
        questionTypeBadge: 'Fogalom'
      },
      {
        id: 'rfq3-9',
        level: 3,
        question: 'Három érme feldobásakor melyik esemény valószínűbb: az A esemény, hogy „mindhárom érme azonos” vagy a B esemény, hogy „legalább 2 fej lesz”?',
        options: [
          'A B esemény sokkal valószínűbb: P(B) = 4/8 = 50%, míg P(A) = 2/8 = 25%',
          'Az A esemény valószínűbb',
          'Mindkét esemény valószínűsége pontosan egyenlő',
          'Egyik sem következhet be'
        ],
        correctAnswer: 'A B esemény sokkal valószínűbb: P(B) = 4/8 = 50%, míg P(A) = 2/8 = 25%',
        explanation: 'A = {FFF, III} (2 eset, 25%). B = {FFF, FFI, FIF, IFF} (4 eset, 50%). Így a B esemény kétszer olyan valószínű!',
        hint: 'Számold össze a kedvező elemi eseteket!',
        questionTypeBadge: 'Összehasonlítás'
      },
      {
        id: 'rfq3-10',
        level: 3,
        question: 'Miért hibás az az érvelés, hogy „a lottón két eset van: vagy nyerek, vagy nem nyerek, tehát 50% az esélyem a telitalálatra”?',
        options: [
          'Mert a két kimenetel nem egyenlően valószínű: a Laplace-modell csak egyenlően valószínű elemi esetekre érvényes!',
          'Mert a lottón valójában 3 eset van',
          'Mert a nyerési esély valójában 100%',
          'Mert a lottó nem véletlen kísérlet'
        ],
        correctAnswer: 'Mert a két kimenetel nem egyenlően valószínű: a Laplace-modell csak egyenlően valószínű elemi esetekre érvényes!',
        explanation: 'Ugyanaz a típushiba, mint Tibor érmés tévedése: a nyerés és nem nyerés nem egyenlően valószínű elemi állapotok, hiszen a nem nyerés mögött több mint 43 millió különböző számötös áll!',
        hint: 'A kedvező és kedvezőtlen esetek száma nem azonos.',
        questionTypeBadge: 'Gondolkodási csapda'
      }
    ]
  }
};

export const RandomFrequencyQuiz: React.FC<RandomFrequencyQuizProps> = (props) => {
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
      topicId="g10-stat-veletlen-relativ-gyakorisag-quiz"
      topicTitle="Véletlen? – Relatív gyakoriság"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <RandomFrequencyMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <RandomFrequencySorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      {...restProps}
    />
  );
};


import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { ChapterSynthesisMatcher } from './ChapterSynthesisMatcher';
import { ChapterSynthesisSorter } from './ChapterSynthesisSorter';
import {
  StatisticsProbabilityOverviewMapSvg,
  AppleMarketWeightedAverageSvg,
  MathExamGradeDistributionSvg
} from './ChapterSynthesisFigures';

interface ChapterSynthesisQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
  [key: string]: any;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Fejezeti áttekintés és elmetérkép',
    description: 'A statisztika a megfigyelt adatok elemzésével (átlag, medián, módusz, szórás), a valószínűségszámítás a jövőbeli véletlen kísérletek modellezésével foglalkozik. Kapocs: a relatív gyakoriság határértéke a valószínűség.',
    note: 'Számtani és mértani közép tétele: A ≥ G minden nemnegatív számpárra.',
    color: 'from-emerald-500 to-teal-600',
    figure: <StatisticsProbabilityOverviewMapSvg size={200} />
  },
  {
    title: 'Súlyozott átlag & Piaci adatok',
    description: 'A súlyozott számtani közép: x̄_w = Σ(wᵢ · xᵢ) / Σwᵢ. Jánosék almaeladásánál az átlagos napi bevétel: heti összes forintbevétel / 5 nap = 5840 Ft/nap.',
    note: 'Az eladott kg szerinti átlagár súlyozott átlag, nem a napi árak egyszerű átlaga!',
    color: 'from-blue-500 to-indigo-600',
    figure: <AppleMarketWeightedAverageSvg size={200} />
  },
  {
    title: 'Érettségi jegyeloszlás (30 diák)',
    description: '1-es: 2 fő, 2-es: 5 fő, 3-as: 12 fő, 4-es: 7 fő, 5-ös: 4 fő. Összpontszám: 96, átlag: 3,20, módusz: 3, medián: 3. Két kockánál az eseménytér mérete 36.',
    note: 'Peti leveleinél a derangement D₄ = 9 eset (37,5%) valószínűbb a pontosan 1 telitalálatnál (33,3%).',
    color: 'from-purple-500 to-violet-600',
    figure: <MathExamGradeDistributionSvg size={200} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Statisztikai alapmutatók és Laplace-alapok',
    subtitle: '30 alapozó feladat a számtani és mértani középről, mediánról, móduszról és az eseményekről',
    range: '1–30. kérdés',
    focus: 'Átlag, módusz, medián, terjedelem, A ≥ G tétel, relatív gyakoriság, Laplace-modell',
    badgeBg: 'bg-emerald-100 dark:bg-emerald-950/60',
    badgeBorder: 'border-emerald-200 dark:border-emerald-800',
    badgeText: 'text-emerald-800 dark:text-emerald-300',
    accentGradient: 'from-emerald-500 to-teal-600',
    questions: [
      {
        id: 'csq1-1',
        level: 1,
        question: 'Hogyan számítjuk ki n darab szám (x₁, x₂, ..., xₙ) számtani közepét (átlagát)?',
        options: [
          'Az adatok összegét elosztjuk az adatok számával: (x₁ + x₂ + ... + xₙ) / n',
          'A legnagyobb és a legkisebb adat összegét elosztjuk 2-vel',
          'Az adatok szorzatának n-edik gyökét vesszük',
          'A rendezett adatsor középső elemét választjuk'
        ],
        correctAnswer: 0,
        explanation: 'A számtani közép (átlag: x̄) az adatok összege osztva a minta elemszámával: x̄ = Σxᵢ / n.',
        hint: 'Összeg osztva darabszámmal.'
      },
      {
        id: 'csq1-2',
        level: 1,
        question: 'Mennyi a következő számok számtani közepe: 4, 7, 9, 12, 18?',
        options: ['10', '9', '11', '12'],
        correctAnswer: 0,
        explanation: 'Összegük: 4 + 7 + 9 + 12 + 18 = 50. Darabszám: 5. Átlag: 50 / 5 = 10.',
        hint: 'Add össze az 5 számot, majd oszd el 5-tel!'
      },
      {
        id: 'csq1-3',
        level: 1,
        question: 'Mi a módusz (Mo) definíciója egy statisztikai adatsorban?',
        options: [
          'A mintában a leggyakrabban előforduló érték',
          'A nagyság szerint rendezett adatsor középső eleme',
          'A legnagyobb és legkisebb elem különbsége',
          'Az adatok összegének fele'
        ],
        correctAnswer: 0,
        explanation: 'A módusz (Mo) a statisztikai minta leggyakoribb, legtöbbször előforduló adata.',
        hint: 'Gondolj a divatra: a legnépszerűbb, leggyakoribb.'
      },
      {
        id: 'csq1-4',
        level: 1,
        question: 'Mi a módusza a {2, 3, 3, 5, 7, 7, 7, 9, 12} adatsornak?',
        options: ['7', '3', '5', '9'],
        correctAnswer: 0,
        explanation: 'A 7-es érték 3-szor szerepel, a 3-as kétszer, a többi egyszer. A módusz tehát 7.',
        hint: 'Melyik szám fordul elő a legtöbbször?'
      },
      {
        id: 'csq1-5',
        level: 1,
        question: 'Mi a medián (Me) definíciója?',
        options: [
          'A nagyság szerint rendezett adatsor középső adata (páros n-nél a 2 középső átlaga)',
          'Az adatsor számtani közepe',
          'A leggyakrabban előforduló szám',
          'A legkisebb és legnagyobb elem összege'
        ],
        correctAnswer: 0,
        explanation: 'A medián (Me) a nagyság szerint növekvő sorrendbe állított adatsor pontosan középső eleme.',
        hint: 'A rendezett adatsor felezőpontja.'
      },
      {
        id: 'csq1-6',
        level: 1,
        question: 'Mennyi a mediánja a {4, 1, 9, 7, 3} adatsornak?',
        options: ['4', '9', '7', '4,8'],
        correctAnswer: 0,
        explanation: 'Rendezett adatsor: 1, 3, 4, 7, 9. Az 5 adat közül a 3. (középső) elem a 4.',
        hint: 'Először feltétlenül állítsd növekvő sorrendbe az adatokat!'
      },
      {
        id: 'csq1-7',
        level: 1,
        question: 'Hogyan határozzuk meg a mediánt, ha az adatok száma (n) PÁROS?',
        options: [
          'A nagyság szerint rendezett sor két középső elemének számtani közepével',
          'Mindig a kisebbik középső elemet választjuk',
          'Mindig a nagyobbik középső elemet választjuk',
          'Páros adatszámnak nem létezik mediánja'
        ],
        correctAnswer: 0,
        explanation: 'Páros n esetén nincs egyetlen középső elem: a rendezett sor n/2. és (n/2 + 1). adatának átlaga a medián.',
        hint: 'A két középső érték átlaga.'
      },
      {
        id: 'csq1-8',
        level: 1,
        question: 'Mennyi a {3, 5, 8, 12, 16, 20} rendezett adatsor mediánja?',
        options: ['10', '8', '12', '9'],
        correctAnswer: 0,
        explanation: 'Az adatsor páros (6 elem). A két középső elem a 8 és 12. Átlaguk: (8 + 12) / 2 = 10.',
        hint: 'A 3. és a 4. elem átlaga.'
      },
      {
        id: 'csq1-9',
        level: 1,
        question: 'Mit jelent a statisztikai terjedelem (R)?',
        options: [
          'A legnagyobb és a legkisebb adat különbsége: x_max – x_min',
          'Az adatok összegének gyöke',
          'A leggyakoribb és a legritkább adat hányadosa',
          'Az átlag és a medián távolsága'
        ],
        correctAnswer: 0,
        explanation: 'A terjedelem (Range, R) a minta legnagyobb és legkisebb mért értékének különbsége.',
        hint: 'Legnagyobb mínusz legkisebb.'
      },
      {
        id: 'csq1-10',
        level: 1,
        question: 'Mennyi a terjedelem a {12, 5, 28, 17, 3, 21} adatsorban?',
        options: ['25', '28', '23', '20'],
        correctAnswer: 0,
        explanation: 'Legnagyobb érték: 28, legkisebb érték: 3. Terjedelem: 28 – 3 = 25.',
        hint: 'x_max – x_min = 28 – 3.'
      },
      {
        id: 'csq1-11',
        level: 1,
        question: 'Mennyi az átlagtól vett előjeles eltérések összege tetszőleges adathalmazban: Σ(xᵢ – x̄)?',
        options: ['Mindig pontosan 0', 'Mindig 1', 'Mindig megegyezik a szórással', 'Függ az elemszámtól'],
        correctAnswer: 0,
        explanation: 'Az átlag definíciójából adódóan a pozitív és negatív eltérések algebrai összege mindig pontosan nullát ad: Σ(xᵢ – x̄) = 0.',
        hint: 'Kiegyenlítődési elv: a negatív és pozitív eltérések pont kiejtik egymást.'
      },
      {
        id: 'csq1-12',
        level: 1,
        question: 'Hogyan számítjuk ki két pozitív valós szám (a és b) mértani közepét (G)?',
        options: ['G = √(a · b)', 'G = (a + b) / 2', 'G = 2ab / (a + b)', 'G = √(a² + b²)'],
        correctAnswer: 0,
        explanation: 'Két szám mértani közepe a szorzatuk négyzetgyöke: G = √(a · b).',
        hint: 'A szorzat négyzetgyöke.'
      },
      {
        id: 'csq1-13',
        level: 1,
        question: 'Mennyi a 4 és a 9 számok mértani közepe?',
        options: ['6', '6,5', '5', '36'],
        correctAnswer: 0,
        explanation: 'G = √(4 · 9) = √36 = 6. (Összehasonlításképp: számtani közepük (4+9)/2 = 6,5).',
        hint: 'Mennyi gyök alatt a 36?'
      },
      {
        id: 'csq1-14',
        level: 1,
        question: 'Mi a számtani és mértani közép közötti híres egyenlőtlenség két nemnegatív számra?',
        options: [
          'A ≥ G, vagyis (a + b) / 2 ≥ √(a · b)',
          'G ≥ A, vagyis √(a · b) ≥ (a + b) / 2',
          'A = G minden számra',
          'A + G = a · b'
        ],
        correctAnswer: 0,
        explanation: 'Tetszőleges nemnegatív a, b számokra a számtani közép mindig nagyobb vagy egyenlő, mint a mértani közép: A ≥ G.',
        hint: 'A számtani közép sosem kisebb a mértaninál.'
      },
      {
        id: 'csq1-15',
        level: 1,
        question: 'Mikor áll fenn egyenlőség a számtani és mértani közép között (A = G)?',
        options: [
          'Akkor és csakis akkor, ha a két szám egyenlő: a = b',
          'Csak akkor, ha mindkét szám 0',
          'Csak akkor, ha mindkét szám 1',
          'Soha nem lehetnek egyenlők'
        ],
        correctAnswer: 0,
        explanation: '(a + b)/2 = √(ab) akkor és csak akkor teljesül, ha (√a – √b)² = 0, azaz a = b.',
        hint: 'Amikor a két szám pontosan megegyezik.'
      },
      {
        id: 'csq1-16',
        level: 1,
        question: 'Egy téglalap oldalai 2 cm és 8 cm. Mekkora az azonos kerületű négyzet oldala?',
        options: ['5 cm', '4 cm', '10 cm', '6 cm'],
        correctAnswer: 0,
        explanation: 'Téglalap kerülete: 2 · (2 + 8) = 20 cm. A négyzet oldala a két oldal számtani közepe: (2 + 8) / 2 = 5 cm (K = 4 · 5 = 20 cm).',
        hint: 'A négyzet oldala az oldalak számtani közepe.'
      },
      {
        id: 'csq1-17',
        level: 1,
        question: 'Egy téglalap oldalai 2 cm és 8 cm. Mekkora az azonos TERÜLETŰ négyzet oldala?',
        options: ['4 cm', '5 cm', '16 cm', '6 cm'],
        correctAnswer: 0,
        explanation: 'Téglalap területe: 2 · 8 = 16 cm². A négyzet területe a² = 16, így oldala a mértani közép: a = √(2 · 8) = 4 cm.',
        hint: 'A négyzet oldala a két oldal mértani közepe.'
      },
      {
        id: 'csq1-18',
        level: 1,
        question: 'Hogyan definiáljuk egy esemény relatív gyakoriságát (g_k)?',
        options: [
          'A bekövetkezések száma (k) osztva az összes elvégzett kísérlet számával (n): k / n',
          'Az összes kísérlet száma osztva a kedvező kimenetelekkel: n / k',
          'A kísérlet sikerességének logaritmusa',
          'A kedvező és kedvezőtlen kimenetelek különbsége'
        ],
        correctAnswer: 0,
        explanation: 'Relatív gyakoriság: a kísérletben a gyakoriság (k) és az összes ismétlés száma (n) hányadosa: g_k = k / n.',
        hint: 'Gyakoriság osztva a kísérletek számával.'
      },
      {
        id: 'csq1-19',
        level: 1,
        question: 'Ha 200 érmedobásból 106 alkalommal fejet dobtunk, mennyi a fej dobásának relatív gyakorisága?',
        options: ['0,53 (53%)', '0,50 (50%)', '106%', '0,47 (47%)'],
        correctAnswer: 0,
        explanation: 'g = k / n = 106 / 200 = 0,53, azaz 53%.',
        hint: '106 osztva 200-zal.'
      },
      {
        id: 'csq1-20',
        level: 1,
        question: 'Mit állít a nagy számok törvénye a relatív gyakoriságról sok kísérlet esetén?',
        options: [
          'A relatív gyakoriság egyre közelebb kerül az elméleti valószínűséghez és körülötte ingadozik',
          'A kísérletek számának növelésével a gyakoriság mindig pontosan 50% lesz',
          'Nagy kísérletszám esetén a véletlen teljesen megszűnik működni',
          'A relatív gyakoriság értéke mindig 1-hez tart'
        ],
        correctAnswer: 0,
        explanation: 'A nagy számok törvénye (Bernoulli) szerint a relatív gyakoriság nagy kísérletszám esetén nagy valószínűséggel tetszőlegesen kevéssé tér el a valószínűségtől.',
        hint: 'Empirikus stabilitás a valószínűség körül.'
      },
      {
        id: 'csq1-21',
        level: 1,
        question: 'Mekkora a biztos esemény (I) és a lehetetlen esemény (∅) valószínűsége?',
        options: ['P(I) = 1 és P(∅) = 0', 'P(I) = 100 és P(∅) = –1', 'P(I) = 0,5 és P(∅) = 0', 'P(I) = 1 és P(∅) = 0,1'],
        correctAnswer: 0,
        explanation: 'A biztos esemény valószínűsége 1 (100%), a lehetetlen esemény valószínűsége pedig 0 (0%).',
        hint: '1 és 0.'
      },
      {
        id: 'csq1-22',
        level: 1,
        question: 'Egy szabályos hatoldalú dobókockával dobunk. Mennyi a páros szám dobásának valószínűsége?',
        options: ['3/6 = 1/2 (50%)', '1/6', '2/6 = 1/3', '4/6 = 2/3'],
        correctAnswer: 0,
        explanation: 'Kedvező esetek: 2, 4, 6 (3 db). Összes eset: 1, 2, 3, 4, 5, 6 (6 db). P = 3/6 = 1/2 = 50%.',
        hint: '3 páros szám van a 6-ból.'
      },
      {
        id: 'csq1-23',
        level: 1,
        question: 'Egy szabályos kockadobásnál mennyi a 6-os dobásának valószínűsége?',
        options: ['1/6', '1/2', '6/6 = 1', '0'],
        correctAnswer: 0,
        explanation: '1 kedvező eset van a 6 egyenlően esélyes kimenetel közül: P = 1/6.',
        hint: 'Egyetlen hatos van a kockán.'
      },
      {
        id: 'csq1-24',
        level: 1,
        question: 'Egy szabályos kockadobásnál mi a valószínűsége, hogy NEM 6-ost dobunk (komplementer)?',
        options: ['5/6', '1/6', '1/2', '4/6'],
        correctAnswer: 0,
        explanation: 'A komplementer szabály szerint P(nem 6-os) = 1 – P(6-os) = 1 – 1/6 = 5/6.',
        hint: '1 – 1/6.'
      },
      {
        id: 'csq1-25',
        level: 1,
        question: 'Egy dobozban 3 piros és 7 kék golyó van. Egy golyót húzunk. Mennyi a piros golyó esélye?',
        options: ['3/10 = 0,3 (30%)', '7/10 = 0,7 (70%)', '3/7', '1/3'],
        correctAnswer: 0,
        explanation: 'Kedvező eset: 3, összes golyó: 3 + 7 = 10. P = 3/10 = 30%.',
        hint: '3 kedvező a 10 golyóból.'
      },
      {
        id: 'csq1-26',
        level: 1,
        question: 'Egy 32 lapos magyar kártyacsomagból egy lapot húzunk. Mennyi a makk lap húzásának valószínűsége?',
        options: ['8/32 = 1/4 (25%)', '4/32 = 1/8', '1/32', '16/32 = 1/2'],
        correctAnswer: 0,
        explanation: 'A magyar kártyában 4 szín van (piros, tök, zöld, makk), mindegyikből 8 lap: 8 / 32 = 1/4 = 25%.',
        hint: 'A 32 lap negyede makk.'
      },
      {
        id: 'csq1-27',
        level: 1,
        question: 'Egy 32 lapos magyar kártyacsomagból egy lapot húzunk. Mennyi az ász (tök, piros, zöld, makk ász) húzásának valószínűsége?',
        options: ['4/32 = 1/8 (12,5%)', '8/32 = 1/4', '1/32', '2/32 = 1/16'],
        correctAnswer: 0,
        explanation: '4 darab ász van a csomagban: 4 / 32 = 1/8 = 12,5%.',
        hint: '4 ász a 32 lapból.'
      },
      {
        id: 'csq1-28',
        level: 1,
        question: 'Melyik állítás IGAZ az események komplementerére (ellentettjére: Ā)?',
        options: [
          'P(Ā) = 1 – P(A), mivel A és Ā egymást kizáró és teljes eseményrendszert alkotnak',
          'P(Ā) = 1 / P(A)',
          'P(Ā) = –P(A)',
          'P(Ā) mindig nagyobb, mint P(A)'
        ],
        correctAnswer: 0,
        explanation: 'Mivel vagy A, vagy Ā következik be (A ∪ Ā = I, és A ∩ Ā = ∅), ezért P(A) + P(Ā) = 1, amiből P(Ā) = 1 – P(A).',
        hint: 'Az esemény és ellentettjének valószínűségének összege 1.'
      },
      {
        id: 'csq1-29',
        level: 1,
        question: 'Ha egy teszten a hibás válasz valószínűsége 0,15, akkor mekkora a helyes válasz esélye?',
        options: ['0,85 (85%)', '0,15', '0,70', '0,95'],
        correctAnswer: 0,
        explanation: 'P(helyes) = 1 – P(hibás) = 1 – 0,15 = 0,85 = 85%.',
        hint: '1 – 0,15.'
      },
      {
        id: 'csq1-30',
        level: 1,
        question: 'Mikor mondjuk két eseményről (A és B), hogy egymást KIZÁRÓAK?',
        options: [
          'Ha egyszerre nem következhetnek be: metszetük a lehetetlen esemény (A ∩ B = ∅)',
          'Ha valószínűségük összege pontosan 1',
          'Ha mindkét esemény valószínűsége 0,5',
          'Ha függetlenek egymástól'
        ],
        correctAnswer: 0,
        explanation: 'Két esemény egymást kizáró, ha nincs közös kimenetelük, azaz egyszerre nem következhetnek be: A ∩ B = ∅ ⟹ P(A ∩ B) = 0.',
        hint: 'Nincs közös kimenetel: egyszerre lehetetlenek.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Súlyozott mutatók, Diagramok és Összetett események',
    subtitle: '30 gyakorló feladat súlyozott átlagról, logikai szitáról, kétkockás számokról és táblázatokról',
    range: '1–30. kérdés',
    focus: 'Jánosék almái, 30 fős érettségi eloszlás, logikai szita formula, kétkockás eseménytér, változások',
    badgeBg: 'bg-blue-100 dark:bg-blue-950/60',
    badgeBorder: 'border-blue-200 dark:border-blue-800',
    badgeText: 'text-blue-800 dark:text-blue-300',
    accentGradient: 'from-blue-500 to-indigo-600',
    questions: [
      {
        id: 'csq2-1',
        level: 2,
        question: 'Jánosék hétfőn 125 Ft-ért 40 kg almát, kedden 120 Ft-ért 40 kg almát adtak el. Mennyi volt a 2 napos összbevételük?',
        options: ['9800 Ft', '9500 Ft', '10 000 Ft', '9600 Ft'],
        correctAnswer: 0,
        explanation: 'Hétfő: 125 · 40 = 5000 Ft. Kedd: 120 · 40 = 4800 Ft. Összesen: 5000 + 4800 = 9800 Ft.',
        hint: 'Számold ki külön a hétfőt és a keddet, majd add össze!'
      },
      {
        id: 'csq2-2',
        level: 2,
        question: 'Jánosék szerdán 100 Ft/kg áron 80 kg almát adtak el. Mennyi volt a szerdai bevételük?',
        options: ['8000 Ft', '7500 Ft', '8500 Ft', '6000 Ft'],
        correctAnswer: 0,
        explanation: 'Szerdai bevétel = 100 Ft/kg · 80 kg = 8000 Ft.',
        hint: '100 szorozva 80-nal.'
      },
      {
        id: 'csq2-3',
        level: 2,
        question: 'Jánosék csütörtökön 140 Ft/kg áron 30 kg-ot, pénteken 80 Ft/kg áron 90 kg-ot adtak el. Mennyi a csütörtöki és pénteki bevételek összege?',
        options: ['11 400 Ft', '10 800 Ft', '12 000 Ft', '9600 Ft'],
        correctAnswer: 0,
        explanation: 'Csütörtök: 140 · 30 = 4200 Ft. Péntek: 80 · 90 = 7200 Ft. Összegük: 4200 + 7200 = 11 400 Ft.',
        hint: '4200 + 7200.'
      },
      {
        id: 'csq2-4',
        level: 2,
        question: 'Jánosék 5 napi bevételei: Hétfő 5000 Ft, Kedd 4800 Ft, Szerda 8000 Ft, Csütörtök 4200 Ft, Péntek 7200 Ft. Mennyi az 5 nap NAPI ÁTLAGOS bevétele?',
        options: ['5840 Ft/nap', '5600 Ft/nap', '6000 Ft/nap', '5720 Ft/nap'],
        correctAnswer: 0,
        explanation: 'Összes bevétel: 5000 + 4800 + 8000 + 4200 + 7200 = 29 200 Ft. Átlag: 29 200 / 5 = 5840 Ft/nap.',
        hint: '29 200 osztva 5-tel.'
      },
      {
        id: 'csq2-5',
        level: 2,
        question: 'Jánosék heti összbevétele 29 200 Ft volt, és az 5 nap alatt összesen 280 kg almát adtak el. Mennyi volt az eladott alma kilogrammonkénti SÚLYOZOTT átlagára?',
        options: ['kb. 104,3 Ft/kg', '113 Ft/kg', '120 Ft/kg', '98,5 Ft/kg'],
        correctAnswer: 0,
        explanation: 'Súlyozott kg-onkénti átlagár: Összbevétel / Összes eladott kg = 29 200 / 280 ≈ 104,29 Ft/kg.',
        hint: 'Összes forint osztva összes kilogrammal.'
      },
      {
        id: 'csq2-6',
        level: 2,
        question: 'A 30 fős osztály matematika érettségi diagramján a jegyek: 1-es: 2 fő, 2-es: 5 fő, 3-as: 12 fő, 4-es: 7 fő, 5-ös: 4 fő. Mennyi a diákok jegyeinek összege?',
        options: ['96 pont', '90 pont', '100 pont', '88 pont'],
        correctAnswer: 0,
        explanation: 'Σ(jegy · létszám) = 1·2 + 2·5 + 3·12 + 4·7 + 5·4 = 2 + 10 + 36 + 28 + 20 = 96 pont.',
        hint: 'Szorozd össze a jegyeket a létszámmal és add össze!'
      },
      {
        id: 'csq2-7',
        level: 2,
        question: 'Mennyi a fenti 30 fős osztály matematika érettségi jegyeinek pontos átlaga?',
        options: ['3,20', '3,00', '3,15', '3,33'],
        correctAnswer: 0,
        explanation: 'Átlag: Összeg / Létszám = 96 / 30 = 3,20.',
        hint: '96 osztva 30-cal.'
      },
      {
        id: 'csq2-8',
        level: 2,
        question: 'Mennyi a 30 fős osztály érettségi jegyeinek MÓDUSZA?',
        options: ['3 (12 diák)', '4 (7 diák)', '2 (5 diák)', '5 (4 diák)'],
        correctAnswer: 0,
        explanation: 'A legmagasabb gyakoriságú jegy a 3-as, amit 12 diák kapott. Mo = 3.',
        hint: 'A legmagasabb oszlop a diagramon.'
      },
      {
        id: 'csq2-9',
        level: 2,
        question: 'Mennyi a 30 fős osztály érettségi jegyeinek MEDIÁNJA?',
        options: ['3', '3,20', '3,5', '2,5'],
        correctAnswer: 0,
        explanation: '30 diák esetén a 15. és 16. diák jegyét kell megnézni: 1-esből 2 van (1-2.), 2-esből 5 van (3-7.), 3-asból 12 van (8-19.). A 15. és 16. tanuló is 3-as, átlaguk 3.',
        hint: 'Hol helyezkedik el a 15. és 16. tanuló?'
      },
      {
        id: 'csq2-10',
        level: 2,
        question: 'Hány százaléka lett az érettségi jegyeknek legalább 4-es (4-es vagy 5-ös) a 30 fős osztályban?',
        options: ['36,67% (11 diák)', '30%', '40%', '23,33%'],
        correctAnswer: 0,
        explanation: 'Legalább 4-es: 7 fő (4-es) + 4 fő (5-ös) = 11 fő. Százalék: 11 / 30 ≈ 0,3667 = 36,67%.',
        hint: '11 a 30-ból.'
      },
      {
        id: 'csq2-11',
        level: 2,
        question: 'Béla egy fekete és egy fehér szabályos dobókockával dob, a fekete a tízes, a fehér az egyes helyiérték. Hány lehetséges kétjegyű szám keletkezhet?',
        options: ['36 darab (11-től 66-ig)', '100 darab', '60 darab', '30 darab'],
        correctAnswer: 0,
        explanation: 'Fekete kocka: 6 lehetőség (1–6), fehér kocka: 6 lehetőség (1–6). 6 · 6 = 36 egyenlően esélyes szám jöhet létre.',
        hint: '6 szorozva 6-tal.'
      },
      {
        id: 'csq2-12',
        level: 2,
        question: 'A 36 kétkockás szám közül melyek a NÉGYZETSZÁMOK?',
        options: ['16, 25, 36, 64 (4 darab)', '16, 25, 36, 49, 64 (5 darab)', '25 és 36 (2 darab)', '36 és 64 (2 darab)'],
        correctAnswer: 0,
        explanation: 'A kétjegyű négyzetszámok kockákkal kirakható tagjai: 4²=16, 5²=25, 6²=36, 8²=64 (a 49 nem rakható ki, mert nincs 9-es a fehér kockán!). Így 4 db van.',
        hint: 'Vigyázz: a 49-ben 9-es szerepel, ami kockán nem dobható!'
      },
      {
        id: 'csq2-13',
        level: 2,
        question: 'Mennyi a valószínűsége, hogy a kétkockás kétjegyű szám NÉGYZETSZÁM lesz?',
        options: ['4/36 = 1/9 ≈ 11,11%', '5/36 ≈ 13,89%', '6/36 = 1/6', '2/36 = 1/18'],
        correctAnswer: 0,
        explanation: 'Kedvező esetek száma: 4 (16, 25, 36, 64). Összes eset: 36. P = 4/36 = 1/9 ≈ 11,11%.',
        hint: '4 a 36-ból.'
      },
      {
        id: 'csq2-14',
        level: 2,
        question: 'Mennyi a valószínűsége, hogy a kétkockás kétjegyű szám számjegyei megegyeznek (azonosak)?',
        options: ['6/36 = 1/6 ≈ 16,67%', '5/36', '1/36', '12/36 = 1/3'],
        correctAnswer: 0,
        explanation: 'Kedvező számok: 11, 22, 33, 44, 55, 66 (6 darab). P = 6/36 = 1/6 ≈ 16,67%.',
        hint: '6 darab ilyen szám van: 11, 22, 33, 44, 55, 66.'
      },
      {
        id: 'csq2-15',
        level: 2,
        question: 'Mennyi a valószínűsége, hogy a kétkockás kétjegyű szám jegyeinek összege LEGFELJEBB 9?',
        options: ['30/36 = 5/6 ≈ 83,33%', '6/36 = 1/6', '24/36 = 2/3', '32/36 = 8/9'],
        correctAnswer: 0,
        explanation: 'Komplementerrel: az összeg > 9 (10, 11 vagy 12). Esetek: (4,6), (5,5), (5,6), (6,4), (6,5), (6,6) = 6 eset. P = 1 – 6/36 = 30/36 = 5/6.',
        hint: 'Számold ki az ellentettjét: mikor lesz az összeg 10, 11 vagy 12?'
      },
      {
        id: 'csq2-16',
        level: 2,
        question: 'Mi a logikai szita képlete két tetszőleges esemény (A és B) uniójára?',
        options: [
          'P(A ∪ B) = P(A) + P(B) – P(A ∩ B)',
          'P(A ∪ B) = P(A) + P(B)',
          'P(A ∪ B) = P(A) · P(B)',
          'P(A ∪ B) = P(A) + P(B) + P(A ∩ B)'
        ],
        correctAnswer: 0,
        explanation: 'A metszetet (A ∩ B) a P(A) és P(B) összeadásakor kétszer számolnánk meg, ezért egyszer le kell vonni: P(A ∪ B) = P(A) + P(B) – P(A ∩ B).',
        hint: 'A metszet kétszer lenne benne, le kell vonni egyszer.'
      },
      {
        id: 'csq2-17',
        level: 2,
        question: 'Egy 36 fős osztályban 9-en tanulnak emelt matekot, 18-an emelt törit, és 3-an mindkettőt. Hányan tanulnak LEGALÁBB EGY tárgyat emelt szinten?',
        options: ['24 fő', '27 fő', '21 fő', '30 fő'],
        correctAnswer: 0,
        explanation: 'Logikai szita: 9 + 18 – 3 = 24 fő tanul legalább az egyik tárgyból emelt szinten.',
        hint: '9 + 18 – 3.'
      },
      {
        id: 'csq2-20',
        level: 2,
        question: 'Egy 36 fős osztályban 24-en tanulnak legalább egy emelt tárgyat. Mennyi a valószínűsége, hogy egy véletlenül választott diák EGYIK tárgyat sem tanulja emelt szinten?',
        options: ['12/36 = 1/3 ≈ 33,33%', '24/36 = 2/3', '3/36 = 1/12', '9/36 = 1/4'],
        correctAnswer: 0,
        explanation: 'Egyik tárgyat sem tanulók száma: 36 – 24 = 12 fő. Valószínűség: 12 / 36 = 1/3 ≈ 33,33%.',
        hint: '36 – 24 = 12 fő.'
      },
      {
        id: 'csq2-19',
        level: 2,
        question: 'Egy termék árát először 20%-kal, majd két hónap múlva további 10%-kal emelik. Hány százalékkal nőtt az ára az eredetihez képest?',
        options: ['32%-kal', '30%-kal', '28%-kal', '35%-kal'],
        correctAnswer: 0,
        explanation: 'A szorzótényezők: 1,20 · 1,10 = 1,32. Az ár tehát 32%-kal nőtt (nem 30%-kal!).',
        hint: '1,2 szorozva 1,1-gyel.'
      },
      {
        id: 'csq2-18',
        level: 2,
        question: 'Ha egy cégvezető ehelyett mindkétszer az „átlagos” 15%-os áremelést alkalmazza, hány százalékos lesz a végső növekedés?',
        options: ['32,25%-kal (1,15² = 1,3225)', '30%-kal', '32%-kal', '31,5%-kal'],
        correctAnswer: 0,
        explanation: '1,15 · 1,15 = 1,3225, vagyis 32,25%-kal nő az ár. Ez nagyobb, mint a 20% és 10% együttes hatása (32%)!',
        hint: '1,15 a négyzeten.'
      },
      {
        id: 'csq2-21',
        level: 2,
        question: 'Árpási úr fizetése 262 ezer Ft. Második hónapban 8%-kal többet kap, a harmadikban a másodikhoz képest 8%-kal kevesebbet. Mennyi a fizetése a harmadik hónapban?',
        options: ['260 323 Ft (kevesebb, mint az eredeti)', '262 000 Ft (ugyanannyi)', '264 000 Ft', '258 000 Ft'],
        correctAnswer: 0,
        explanation: '262 · 1,08 · 0,92 = 262 · 0,9936 = 260,3232 ezer Ft. Mivel a 8%-os csökkenés már a megemelt összegre vonatkozik, a végeredmény kisebb az induló bérnél!',
        hint: '1,08 szorozva 0,92-vel nem 1, hanem 0,9936.'
      },
      {
        id: 'csq2-22',
        level: 2,
        question: 'Egy kiállítás bejáratánál megkérdezett 300 vendég közül 128 vendégnek tetszett a kiállítás. Mennyi a valószínűsége, hogy egy kiválasztott vendégnek tetszett?',
        options: ['128 / 300 ≈ 42,67%', '150 / 300 = 50%', '172 / 300 ≈ 57,33%', '128 / 172'],
        correctAnswer: 0,
        explanation: 'P = 128 / 300 ≈ 0,4267 = 42,67%.',
        hint: '128 osztva 300-zal.'
      },
      {
        id: 'csq2-23',
        level: 2,
        question: 'A 300 vendég közül 100 fő 46 évesnél idősebb. Mennyi a valószínűsége, hogy egy vendég 46 évesnél NEM IDŐSEBB?',
        options: ['200 / 300 = 2/3 ≈ 66,67%', '100 / 300 = 1/3', '50%', '250 / 300'],
        correctAnswer: 0,
        explanation: 'Komplementer esemény: 300 – 100 = 200 fő nem idősebb 46 évesnél. P = 200 / 300 = 2/3 ≈ 66,67%.',
        hint: '300 – 100 = 200 fő.'
      },
      {
        id: 'csq2-24',
        level: 2,
        question: '20 csomag rizs tömegmérésekor: 981g (1 db), 985g (2 db), 997g (5 db), 998g (3 db), 1001g (3 db), 1002g (5 db), 1007g (1 db). Mi az adatsor módusza?',
        options: ['Két módusza van: 997 g és 1002 g (bimodális)', 'Csak 997 g', 'Csak 1002 g', '1000 g'],
        correctAnswer: 0,
        explanation: 'Mind a 997 g-os, mind az 1002 g-os tömeg 5-ször fordul elő (a legmagasabb darabszám). Ez bimetrikus/bimodális eloszlás.',
        hint: 'Mindkét érték a maximális 5-ös gyakorisággal bír.'
      },
      {
        id: 'csq2-25',
        level: 2,
        question: 'Két dobókockával dobva hányféleképpen lehet a dobott számok összege 8?',
        options: ['5-féleképpen: (2,6), (3,5), (4,4), (5,3), (6,2)', '4-féleképpen', '6-féleképpen', '3-féleképpen'],
        correctAnswer: 0,
        explanation: 'A lehetséges számpárok összege 8: (2;6), (3;5), (4;4), (5;3), (6;2) = 5 eset.',
        hint: 'Ne feledd: a (2;6) és (6;2) két különböző dobás!'
      },
      {
        id: 'csq2-26',
        level: 2,
        question: 'Két szabályos dobókockával dobva mennyi a valószínűsége, hogy a dobott számok összege 8 lesz?',
        options: ['5/36 ≈ 13,89%', '4/36 = 1/9', '6/36 = 1/6', '8/36 = 2/9'],
        correctAnswer: 0,
        explanation: 'Kedvező esetek: 5 db. Összes eset: 36 db. P = 5/36 ≈ 13,89%.',
        hint: '5 eset a 36-ból.'
      },
      {
        id: 'csq2-27',
        level: 2,
        question: 'Két kockával dobva mennyi annak a valószínűsége, hogy a számok összege NAGYOBB, mint 8 (9, 10, 11 vagy 12)?',
        options: ['10/36 = 5/18 ≈ 27,78%', '8/36', '12/36 = 1/3', '5/36'],
        correctAnswer: 0,
        explanation: 'Összeg 9 (4 db), 10 (3 db), 11 (2 db), 12 (1 db). Kedvező esetek: 4 + 3 + 2 + 1 = 10 eset. P = 10/36 = 5/18.',
        hint: '4 + 3 + 2 + 1 = 10 eset a 36-ból.'
      },
      {
        id: 'csq2-28',
        level: 2,
        question: 'Két kockával dobva mennyi a valószínűsége, hogy az összeg LEGALÁBB 8 (8 vagy annál nagyobb)?',
        options: ['15/36 = 5/12 ≈ 41,67%', '10/36', '5/36', '18/36 = 50%'],
        correctAnswer: 0,
        explanation: 'Legalább 8: pontosan 8 (5 eset) + 8-nál nagyobb (10 eset) = 15 eset. P = 15/36 = 5/12 ≈ 41,67%.',
        hint: '5 + 10 = 15 kedvező eset a 36-ból.'
      },
      {
        id: 'csq2-29',
        level: 2,
        question: 'Egy könyvespolcon 160 könyv van, ebből 60 magyar és 100 külföldi szerzőtől; 104 modern és 56 klasszikus. Ha 55 modern külföldi könyv van, mennyi az esélye modern könyvet húzni?',
        options: ['104 / 160 = 13/20 = 65%', '60 / 160 = 37,5%', '55 / 160 ≈ 34,4%', '100 / 160 = 62,5%'],
        correctAnswer: 0,
        explanation: 'Összesen 104 modern könyv van a 160-ból. P = 104 / 160 = 13/20 = 0,65 = 65%.',
        hint: '104 a 160-ból.'
      },
      {
        id: 'csq2-30',
        level: 2,
        question: 'Mi a különbség az empirikus relatív gyakoriság és az elméleti valószínűség között?',
        options: [
          'A relatív gyakoriság a lezajlott mérések tényleges aránya, a valószínűség a modell szerinti elméleti határérték',
          'A kettő között nincs semmilyen különbség',
          'A relatív gyakoriság mindig nagyobb a valószínűségnél',
          'A valószínűség csak pénzérmékre alkalmazható'
        ],
        correctAnswer: 0,
        explanation: 'A relatív gyakoriság (k/n) egy konkrét kísérletsorozat tapasztalati adata, míg a valószínűség egy elméleti mérőszám, amely körül a relatív gyakoriság ingadozik.',
        hint: 'Tapasztalati mérés vs. elméleti matematikai modell.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Érettségi és emelt szintű szintetizáló feladatok',
    subtitle: '30 haladó, összetett feladat versenyátlagokról, kamarakórusról, derangements-ről és zoknihúzásról',
    range: '1–30. kérdés',
    focus: 'Két iskola versenye, kamarakórus rejtvény, zoknihúzás feltételes esélyei, 3 kockás permutációk, Peti fényképei',
    badgeBg: 'bg-purple-100 dark:bg-purple-950/60',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    badgeText: 'text-purple-800 dark:text-purple-300',
    accentGradient: 'from-purple-500 to-violet-600',
    questions: [
      {
        id: 'csq3-1',
        level: 3,
        question: '15 szám átlaga 4,2. Hozzávettünk egy 16. számot, és az új átlag 5 lett. Melyik számot adtuk hozzá?',
        options: ['17', '15', '20', '16,8'],
        correctAnswer: 0,
        explanation: '15 szám összege: 15 · 4,2 = 63. A 16 szám összege: 16 · 5 = 80. A hozzáadott szám: 80 – 63 = 17.',
        hint: '16 · 5 – 15 · 4,2.'
      },
      {
        id: 'csq3-2',
        level: 3,
        question: 'Egy versenyen a Csorba utcai iskola átlaga 34, a Konkoly utcai iskola átlaga 42, az együttes átlag 36. Milyen arányban indultak a tanulók?',
        options: [
          'A Csorba utcai iskolából 3-szor annyian indultak, mint a Konkoly utcaiból (n₁ = 3n₂)',
          'Egyenlő létszámmal indultak',
          'A Konkoly utcaiból indultak kétszer annyian',
          'A Csorba utcaiból indultak négyszer annyian'
        ],
        correctAnswer: 0,
        explanation: '34n₁ + 42n₂ = 36(n₁ + n₂) ⟹ 34n₁ + 42n₂ = 36n₁ + 36n₂ ⟹ 6n₂ = 2n₁ ⟹ n₁ = 3n₂.',
        hint: 'Írd fel a súlyozott átlag egyenletét: 34n₁ + 42n₂ = 36(n₁ + n₂).'
      },
      {
        id: 'csq3-3',
        level: 3,
        question: 'Ha a Csorba utcai iskolából 40-nel többen indultak, mint a Konkoly utcaiból (n₁ – n₂ = 40), hányan indultak a két iskolából összesen?',
        options: ['80 fő (60 és 20 fő)', '100 fő', '60 fő', '120 fő'],
        correctAnswer: 0,
        explanation: 'Mivel n₁ = 3n₂, így 3n₂ – n₂ = 40 ⟹ 2n₂ = 40 ⟹ n₂ = 20 fő, és n₁ = 60 fő. Összesen: 60 + 20 = 80 fő.',
        hint: '3n₂ – n₂ = 40 ⟹ 2n₂ = 40.'
      },
      {
        id: 'csq3-4',
        level: 3,
        question: 'Egy kamarakórusban mindenki legalább 40 éves, a korelnök 54 éves, az átlagéletkor 43 év. Ha a korelnök távol van, az átlag 42 év. Hány tagja van a kórusnak?',
        options: ['12 fő', '10 fő', '14 fő', '15 fő'],
        correctAnswer: 0,
        explanation: 'Legyen a létszám n. Ekkor 43n – 54 = 42(n – 1) ⟹ 43n – 54 = 42n – 42 ⟹ n = 12 fő.',
        hint: '43n – 54 = 42(n – 1).'
      },
      {
        id: 'csq3-5',
        level: 3,
        question: 'A 12 fős kamarakórusban legfeljebb hány éves lehet a második legidősebb kórustag?',
        options: [
          'Legfeljebb 54 éves (nem lehet idősebb a korelnöknél)',
          '53 éves',
          '62 éves',
          '50 éves'
        ],
        correctAnswer: 0,
        explanation: 'Mivel a korelnök a kórus legidősebb tagja 54 évvel, ezért a második legidősebb sem lehet idősebb nála, vagyis legfeljebb 54 éves lehet.',
        hint: 'Senki sem lehet idősebb a legidősebbnél.'
      },
      {
        id: 'csq3-6',
        level: 3,
        question: 'Hány darab pozitív háromjegyű egész szám létezik (100-tól 999-ig)?',
        options: ['900 darab', '899 darab', '999 darab', '1000 darab'],
        correctAnswer: 0,
        explanation: 'A 100-tól 999-ig terjedő számok száma: 999 – 100 + 1 = 900 darab.',
        hint: '999 – 100 + 1.'
      },
      {
        id: 'csq3-7',
        level: 3,
        question: 'A 900 pozitív háromjegyű szám közül véletlenszerűen kiválasztunk egyet. Mennyi a valószínűsége, hogy 5-tel osztható lesz?',
        options: ['180 / 900 = 1/5 = 20%', '100 / 900 = 1/9', '90 / 900 = 10%', '200 / 900'],
        correctAnswer: 0,
        explanation: 'Minden ötödik egész szám osztható 5-tel: 900 / 5 = 180 darab. P = 180 / 900 = 1/5 = 20%.',
        hint: 'Pontosan minden 5. szám osztható 5-tel.'
      },
      {
        id: 'csq3-8',
        level: 3,
        question: 'A 900 háromjegyű szám közül egyet kiválasztva mennyi a valószínűsége, hogy az KISEBB, mint 500?',
        options: ['400 / 900 = 4/9 ≈ 44,44%', '500 / 900 = 5/9', '399 / 900', '1/2'],
        correctAnswer: 0,
        explanation: 'A 100-tól 499-ig terjedő számok darabszáma: 499 – 100 + 1 = 400 darab. P = 400 / 900 = 4/9 ≈ 44,44%.',
        hint: '100-tól 499-ig 400 szám van.'
      },
      {
        id: 'csq3-9',
        level: 3,
        question: 'Hány olyan háromjegyű szám van, amelyik négyzetszám (100 és 999 között)?',
        options: ['22 darab (10²-től 31²-ig)', '21 darab', '30 darab', '15 darab'],
        correctAnswer: 0,
        explanation: '10² = 100, 31² = 961, míg 32² = 1024 (már négyjegyű). A négyzetszámok alapjai 10-től 31-ig terjednek: 31 – 10 + 1 = 22 darab.',
        hint: '10² = 100 és 31² = 961.'
      },
      {
        id: 'csq3-10',
        level: 3,
        question: 'Mennyi a valószínűsége, hogy a 900 háromjegyű szám közül egyet választva az négyzetszám lesz?',
        options: ['22 / 900 = 11/450 ≈ 2,44%', '20 / 900 = 1/45', '31 / 900', '1/90'],
        correctAnswer: 0,
        explanation: '22 kedvező szám van a 900-ból: 22 / 900 = 11 / 450 ≈ 2,44%.',
        hint: '22 a 900-ból.'
      },
      {
        id: 'csq3-11',
        level: 3,
        question: 'Két pozitív valós szám számtani közepe 15, mértani közepe 12. Melyik ez a két szám?',
        options: ['6 és 24', '10 és 20', '8 és 18', '9 és 16'],
        correctAnswer: 0,
        explanation: 'a + b = 30 és a · b = 144. A másodfokú egyenlet gyökei: t² – 30t + 144 = 0 ⟹ (t – 6)(t – 24) = 0. A két szám: 6 és 24.',
        hint: 'Összegük 30, szorzatuk 144.'
      },
      {
        id: 'csq3-12',
        level: 3,
        question: 'Két szám számtani közepe 22,5, mértani közepe 18. Melyik ez a két szám?',
        options: ['9 és 36', '12 és 27', '15 és 30', '18 és 27'],
        correctAnswer: 0,
        explanation: 'a + b = 45 és a · b = 18² = 324. t² – 45t + 324 = 0 ⟹ gyökök: 9 és 36. Számtani közép: (9+36)/2 = 22,5, mértani: √(9·36) = 3·6 = 18.',
        hint: 'Összegük 45, szorzatuk 324.'
      },
      {
        id: 'csq3-13',
        level: 3,
        question: 'Egy kollégista fiú zoknizsákjában 9 pár kék csíkos (18 db) és 6 pár fekete (12 db) zokni van (összesen 30 zokni). Két zoknit húz ki visszatevés nélkül. Hányféleképpen húzhat 2 zoknit a 30-ból?',
        options: ['(30 · 29) / 2 = 435-féleképpen', '30 · 29 = 870-féleképpen', '900-féleképpen', '15-féleképpen'],
        correctAnswer: 0,
        explanation: '30 zokniból 2 kiválasztása sorrend nélkül: (30 · 29) / 2 = 435 lehetőség.',
        hint: 'Kombináció: 30 alatt a 2.'
      },
      {
        id: 'csq3-14',
        level: 3,
        question: 'Mennyi a valószínűsége, hogy a fenti fiú AZONOS SZÍNŰ zoknikat húz (mindkettő kék csíkos vagy mindkettő fekete)?',
        options: ['438 / 870 = 219 / 435 ≈ 50,34%', '1/2 = 50%', '306 / 870', '132 / 870'],
        correctAnswer: 0,
        explanation: 'Két kék: (18·17)/2 = 153. Két fekete: (12·11)/2 = 66. Kedvező: 153 + 66 = 219. P = 219 / 435 = 438 / 870 ≈ 50,34%.',
        hint: 'Két kék esélye + két fekete esélye.'
      },
      {
        id: 'csq3-15',
        level: 3,
        question: 'Ha az első nap egy pár kék csíkos zoknit elhasznált (így maradt 16 kék és 12 fekete, össz: 28 db), mennyi az esélye másnap KÉT KÜLÖNBÖZŐ színűt húzni?',
        options: ['(16 · 12) / ((28 · 27)/2) = 192 / 378 ≈ 50,79%', '1/2 = 50%', '16/28', '12/28'],
        correctAnswer: 0,
        explanation: 'Összes eset: (28 · 27) / 2 = 378. Kedvező esetek (egy kék és egy fekete): 16 · 12 = 192. P = 192 / 378 ≈ 50,79%.',
        hint: '16 · 12 osztva 28 alatt a 2-vel.'
      },
      {
        id: 'csq3-16',
        level: 3,
        question: 'Peti levelet és 4 különböző fényképet küld 4 barátjának (András, Béla, Csaba, Dani), de véletlenszerűen teszi a borítékokba. Hányféle kiosztás lehetséges?',
        options: ['4! = 24-féleképpen', '4⁴ = 256-féleképpen', '16-féleképpen', '12-féleképpen'],
        correctAnswer: 0,
        explanation: 'A 4 fénykép 4 személyhez rendelése 4 elem összes lehetséges sorrendje (permutációja): 4! = 4 · 3 · 2 · 1 = 24.',
        hint: '4 faktoriális.'
      },
      {
        id: 'csq3-17',
        level: 3,
        question: 'Hány olyan kiosztás van, ahol PONTOSAN ÉS CSAK András kapja a saját képét (a másik 3 fiú közül senki sem a sajátját)?',
        options: ['2 darab', '6 darab', '1 darab', '4 darab'],
        correctAnswer: 0,
        explanation: 'András rögzített. A másik 3 fiú (B, C, D) képei közül senki nem kaphatja a sajátját: ez a 3 elemű zavart permutációk (derangements) száma: D₃ = 2 (a lehetséges kiosztások: CDB és DBC).',
        hint: '3 elem zavart permutációinak száma 2.'
      },
      {
        id: 'csq3-18',
        level: 3,
        question: 'Hány olyan eset van, ahol PONTOSAN EGYIKÜK kapja meg a saját fényképét a 4 fiú közül?',
        options: ['4 · 2 = 8 eset (valószínűsége 8/24 = 1/3)', '4 eset', '6 eset', '12 eset'],
        correctAnswer: 0,
        explanation: 'Kiválasztjuk, melyik az az egy, aki a sajátját kapja (4 lehetőség). A maradék 3 embernek senki nem kapja a sajátját (2 lehetőség). 4 · 2 = 8 eset.',
        hint: '4 fiú közül bárki lehet az az egy, szorozva 2-vel.'
      },
      {
        id: 'csq3-19',
        level: 3,
        question: 'Hány olyan eset van a 24-ből, amikor SENKI SEM kapja a saját fényképét (D₄ zavart permutáció)?',
        options: ['9 eset (valószínűsége 9/24 = 3/8 = 37,5%)', '8 eset', '6 eset', '12 eset'],
        correctAnswer: 0,
        explanation: '4 elem zavart permutációinak száma: D₄ = 4! · (1 – 1/1! + 1/2! – 1/3! + 1/4!) = 24 · (1/2 – 1/6 + 1/24) = 12 – 4 + 1 = 9 eset.',
        hint: 'D₄ = 9 eset.'
      },
      {
        id: 'csq3-20',
        level: 3,
        question: 'Peti fényképfeladatában melyik esemény valószínűbb: A) Senki sem kapja a sajátját, vagy B) Pontosan egyikük kapja a sajátját?',
        options: [
          'Az A) valószínűbb: P(senki sem) = 9/24 (37,5%) > P(pontosan 1) = 8/24 (33,33%)',
          'A B) valószínűbb, mert legalább egy ember örül',
          'Mindkettő valószínűsége pontosan egyenlő',
          'Egyik sem következhet be'
        ],
        correctAnswer: 0,
        explanation: 'P(A) = 9/24 = 37,5%, míg P(B) = 8/24 ≈ 33,33%. Tehát az A esemény (senki sem a sajátját) valószínűbb!',
        hint: '9/24 nagyobb mint 8/24.'
      },
      {
        id: 'csq3-21',
        level: 3,
        question: 'Egy szabályos kockával 3-szor dobunk egymás után, így egy háromjegyű számot kapunk. Hányféle háromjegyű szám keletkezhet?',
        options: ['6³ = 216-féle', '1000-féle', '6! = 720-féle', '18-féle'],
        correctAnswer: 0,
        explanation: 'Mindhárom helyiértékre 6-féle szám kerülhet: 6 · 6 · 6 = 216 egyenlően valószínű kimenetel.',
        hint: '6 a köbön.'
      },
      {
        id: 'csq3-22',
        level: 3,
        question: 'A 216 dobott háromjegyű szám mikor osztható 4-gyel?',
        options: [
          'Ha az utolsó két jegyéből képzett szám osztható 4-gyel (9 ilyen végződés van a 36-ból)',
          'Ha az utolsó jegye 4-es',
          'Ha a számjegyek összege osztható 4-gyel',
          'Ha minden számjegye páros'
        ],
        correctAnswer: 0,
        explanation: 'A 4-gyel való oszthatóság szabálya szerint a szám akkor osztható 4-gyel, ha az utolsó két jegye osztható 4-gyel: 12, 16, 24, 32, 36, 44, 52, 56, 64 (9 lehetőség a 36-ból).',
        hint: 'Oszthatósági szabály: az utolsó két számjegy.'
      },
      {
        id: 'csq3-23',
        level: 3,
        question: 'Mennyi a valószínűsége, hogy a 3 kockadobásból kapott háromjegyű szám OSZTHATÓ 4-GYEL?',
        options: ['54 / 216 = 1/4 = 25%', '1/6', '1/3', '18 / 216'],
        correctAnswer: 0,
        explanation: 'Az első jegy bármi lehet (6-féle), a második és harmadik jegy 9-féle kedvező végződés: 6 · 9 = 54 kedvező eset. P = 54 / 216 = 1/4 = 25%.',
        hint: '54 eset a 216-ból.'
      },
      {
        id: 'csq3-24',
        level: 3,
        question: 'Mennyi a valószínűsége, hogy a 3 dobókockával dobott számjegyek SZIGORÚAN CSÖKKENŐ sorrendben állnak (pl. 531, 642)?',
        options: ['20 / 216 = 5/54 ≈ 9,26%', '15 / 216', '6 / 216', '36 / 216'],
        correctAnswer: 0,
        explanation: '6 különböző számból 3-at kiválasztva pontosan 1 csökkenő sorrend képezhető: (6 alatt a 3) = (6 · 5 · 4) / 6 = 20 eset. P = 20 / 216 = 5/54 ≈ 9,26%.',
        hint: '6 alatta a 3 kombináció.'
      },
      {
        id: 'csq3-25',
        level: 3,
        question: 'Egy vetélkedőn 5 lány és 3 fiú vesz részt (összesen 8 fő). Véletlenszerűen kisorsolnak 3 játékost. Mennyi a valószínűsége, hogy a sorsoltak között VAN FIÚ?',
        options: [
          'Komplementerrel: 1 – (5 alatt 3)/(8 alatt 3) = 1 – 10/56 = 46/56 = 23/28 ≈ 82,14%',
          '3/8 = 37,5%',
          '10/56 ≈ 17,86%',
          '50%'
        ],
        correctAnswer: 0,
        explanation: 'Komplementer esemény: csak lányokat sorsolnak ki. Összes eset: (8 alatt 3) = 56. Csak lányok: (5 alatt 3) = 10. P(van fiú) = 1 – 10/56 = 46/56 = 23/28 ≈ 82,14%.',
        hint: '1 – P(csak lányok).'
      },
      {
        id: 'csq3-26',
        level: 3,
        question: 'A Mikulás zsákjában 12 mogyorós csoki és x darab marcipános csoki van. Ha betesz még 6 marcipánosat, a mogyorós húzásának esélye 1/15-del csökken. Hány mogyorós csoki van a zsákban?',
        options: ['12 darab (a feladat szövegében megadott érték)', '15 darab', '18 darab', '24 darab'],
        correctAnswer: 0,
        explanation: 'A mogyorós csokik száma a feladat szövege szerint 12 darab. (Az egyenletből a marcipános csokik kezdeti száma x = 18 adódik: 12/30 – 12/36 = 2/5 – 1/3 = 1/15).',
        hint: 'Figyelmesen olvasd a kérdést: a mogyorós csokik számát kérdezi!'
      },
      {
        id: 'csq3-27',
        level: 3,
        question: 'Bankban lekötöttünk 100 000 Ft-ot. Két év múlva 110 000 Ft van a számlánkon. Mennyi volt az összeg az 1. év végén, ha évente azonos mértékben növekedett?',
        options: [
          '√(100 000 · 110 000) ≈ 104 881 Ft (mértani közép)',
          '105 000 Ft (számtani közép)',
          '104 000 Ft',
          '106 000 Ft'
        ],
        correctAnswer: 0,
        explanation: 'Mivel a tőke kamatos kamattal ugyanannyiszorosára nőtt (q), ezért a köztes érték a mértani közép: T₁ = √(100 000 · 110 000) = 100 000 · √1,10 ≈ 104 880,88 Ft.',
        hint: 'Kamatos kamatnál a közbenső tag a mértani közép.'
      },
      {
        id: 'csq3-28',
        level: 3,
        question: 'Tóth úr fizetése félévig 268 ezer Ft volt. Júliusban 12%-kal emelték (300,16 ezer), majd szeptemberben újabb 5%-kal (315,168 ezer az év végéig: 4 hónap). Milyen átlagfizetést kapott az évben?',
        options: ['kb. 289 ezer Ft/hó', '268 ezer Ft/hó', '300 ezer Ft/hó', '275 ezer Ft/hó'],
        correctAnswer: 0,
        explanation: 'Súlyozott átlag: (6 · 268 + 2 · 300,16 + 4 · 315,168) / 12 = (1608 + 600,32 + 1260,672) / 12 = 3468,992 / 12 ≈ 289,08 ezer Ft.',
        hint: '6 hónap alapbér + 2 hónap első emelés + 4 hónap második emelés osztva 12-vel.'
      },
      {
        id: 'csq3-29',
        level: 3,
        question: 'Egy kenyérgyári keverőgép 3,2 millió Ft-ba került. Értéke 1. évben 16%-kal, 2. évben 5%-kal csökken. Mennyi a gép értéke 2 év után?',
        options: ['2 553 600 Ft', '2 528 000 Ft', '2 600 000 Ft', '2 400 000 Ft'],
        correctAnswer: 0,
        explanation: '3 200 000 · (1 – 0,16) · (1 – 0,05) = 3 200 000 · 0,84 · 0,95 = 2 553 600 Ft.',
        hint: '3,2 millió szorozva 0,84-gyel, majd 0,95-tel.'
      },
      {
        id: 'csq3-30',
        level: 3,
        question: 'Mi a legfontosabb tanulság a statisztika és valószínűségszámítás fejezet egészéből a mindennapokban?',
        options: [
          'A véletlen és az adatok objektív törvényszerűségeket követnek, így a döntéseket matematikai mutatókra és valószínűségi modellekre kell alapozni',
          'Az átlag mindig pontosan jellemzi az egyéni kimeneteleket',
          'A valószínűség garanciát ad a következő esemény pontos eredményére',
          'Minden statisztikai felmérés azonnal csalás'
        ],
        correctAnswer: 0,
        explanation: 'A statisztika és a valószínűségszámítás megtanít a bizonytalanság matematikai kezelésére, a kritikai gondolkodásra és az adatok megalapozott értelmezésére a való életben.',
        hint: 'Objektív modellek és kritikai gondolkodás a bizonytalanság kezelésére.'
      }
    ]
  }
};

export const ChapterSynthesisQuiz: React.FC<ChapterSynthesisQuizProps> = (props) => {
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
      topicTitle="10. OSZTÁLY • STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS"
      subtopicTitle="Gyakorlás, tudáspróba"
      badgeText="FEJEZETI NAGY TUDÁSPRÓBA"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <ChapterSynthesisMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <ChapterSynthesisSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      {...restProps}
    />
  );
};

export default ChapterSynthesisQuiz;


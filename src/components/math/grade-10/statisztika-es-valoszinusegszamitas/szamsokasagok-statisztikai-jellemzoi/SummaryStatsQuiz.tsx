import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { SummaryStatsMatcher } from './SummaryStatsMatcher';
import { SummaryStatsSorter } from './SummaryStatsSorter';
import {
  MeanMedianModeSalarySvg,
  MedianEvenOddSvg,
  RangeAndOutlierSvg
} from './SummaryStatsFigures';

interface SummaryStatsQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
  [key: string]: any;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'A három középérték összehasonlítása',
    description: 'Átlag (x̄): elemek összege osztva az elemszámmal. Módusz (Mo): a leggyakoribb érték. Medián (Me): nagyság szerint a középső érték.',
    note: 'Jobbra ferde eloszlásnál (pl. fizetések): Átlag > Medián > Módusz.',
    color: 'from-blue-500 to-indigo-600',
    figure: <MeanMedianModeSalarySvg size={200} />
  },
  {
    title: 'A medián kiszámításának szabálya',
    description: '1. lépés: Növekvő sorba rendezés! 2. lépés: Ha n páratlan: az ((n+1)/2)-edik elem. Ha n páros: a két középső (n/2 és n/2+1) adat számtani közepe.',
    note: 'Mindig rendezd az adatokat, soha ne felezz rendezetlen mintát!',
    color: 'from-purple-500 to-pink-600',
    figure: <MedianEvenOddSvg size={200} />
  },
  {
    title: 'Terjedelem és a kiugró értékek (Robusztusság)',
    description: 'Terjedelem: R = x_max - x_min. A medián robusztus: nem rántják el a szélsőséges értékek. Az átlag és a terjedelem erősen eltorzul.',
    note: 'Garantáltan a mintában szereplő érték: a módusz (ha van) és a páratlan elemszámú medián.',
    color: 'from-emerald-500 to-teal-600',
    figure: <RangeAndOutlierSvg size={200} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és közvetlen leolvasások',
    subtitle: '10 alapozó feladat a módusz, medián, átlag és terjedelem jelentéséről és egyszerű számításáról',
    range: '1–10. kérdés',
    focus: 'Módusz, medián (páros és páratlan elemszám), terjedelem és a mutatók alaptulajdonságai',
    badgeBg: 'bg-blue-100 dark:bg-blue-950/60',
    badgeBorder: 'border-blue-200 dark:border-blue-800',
    badgeText: 'text-blue-800 dark:text-blue-300',
    accentGradient: 'from-blue-500 to-indigo-600',
    questions: [
      {
        id: 'ssq1-1',
        level: 1,
        question: 'Mi a módusz (Mo) definíciója egy statisztikai adatsokaságban?',
        options: [
          'A mintában leggyakrabban előforduló érték',
          'A minta pontosan középső eleme',
          'Az adatok összegének és az elemszámnak a hányadosa',
          'A legnagyobb és legkisebb elem különbsége'
        ],
        correctAnswer: 'A mintában leggyakrabban előforduló érték',
        explanation: 'A módusz a legnagyobb gyakoriságú érték. Egy mintának lehet egy, több vagy akár nulla módusza is (ha minden adat csak egyszer szerepel).',
        hint: 'Melyik szám fordul elő a legtöbbször?',
        questionTypeBadge: 'Fogalom'
      },
      {
        id: 'ssq1-2',
        level: 1,
        question: 'Hogyan határozzuk meg egy adathalmaz mediánját (Me)?',
        options: [
          'Növekvő sorba rendezzük az adatokat, és kiválasztjuk a középső elemet (páros elemszámnál a két középső átlagát)',
          'Kivonjuk a legnagyobb elemből a legkisebbet',
          'Összeadjuk a számokat, és elosztjuk a darabszámmal',
          'Megkeressük a leggyakrabban előforduló számot'
        ],
        correctAnswer: 'Növekvő sorba rendezzük az adatokat, és kiválasztjuk a középső elemet (páros elemszámnál a két középső átlagát)',
        explanation: 'A medián a rendezett minta felezőpontja: az adatok 50%-a kisebb vagy egyenlő nála, 50%-a nagyobb vagy egyenlő nála.',
        hint: 'Először mindig rendezni kell az adatokat nagyság szerint!',
        questionTypeBadge: 'Fogalom'
      },
      {
        id: 'ssq1-3',
        level: 1,
        question: 'Hogyan számítjuk ki egy számsokaság terjedelmét (R)?',
        options: [
          'R = x_max - x_min',
          'R = (x_max + x_min) / 2',
          'R = x_max / x_min',
          'R = x_átlag - x_min'
        ],
        correctAnswer: 'R = x_max - x_min',
        explanation: 'A terjedelem (Range) a legnagyobb és a legkisebb adat kivonásos különbsége: R = x_max - x_min.',
        hint: 'A legnagyobb számból vond ki a legkisebbet!',
        questionTypeBadge: 'Fogalom'
      },
      {
        id: 'ssq1-4',
        level: 1,
        question: 'Mennyi a következő számsokaság módusza: {4, 7, 7, 7, 9, 12}?',
        options: [
          '7',
          '4',
          '9',
          '7,5'
        ],
        correctAnswer: '7',
        explanation: 'A 7-es szám háromszor fordul elő, míg a többi szám csak egyszer, így a módusz Mo = 7.',
        hint: 'Melyik szám szerepel háromszor is a listában?',
        questionTypeBadge: 'Számolás'
      },
      {
        id: 'ssq1-5',
        level: 1,
        question: 'Mennyi a következő rendezett számsokaság mediánja: {2, 5, 8, 11, 14}?',
        options: [
          '8',
          '5',
          '11',
          '8,5'
        ],
        correctAnswer: '8',
        explanation: 'Az adatsor n = 5 páratlan elemszámú, így a középső, azaz a (5+1)/2 = 3. elem a medián: Me = 8.',
        hint: 'Öt számból a harmadik van pontosan középen.',
        questionTypeBadge: 'Számolás'
      },
      {
        id: 'ssq1-6',
        level: 1,
        question: 'Mennyi a következő számsokaság mediánja: {3, 6, 8, 12}?',
        options: [
          '7',
          '6',
          '8',
          '7,25'
        ],
        correctAnswer: '7',
        explanation: 'Páros n = 4 elemszám esetén a két középső szám (6 és 8) számtani közepe a medián: (6 + 8) / 2 = 7.',
        hint: 'Vedd a két belső szám, a 6 és 8 átlagát!',
        questionTypeBadge: 'Számolás'
      },
      {
        id: 'ssq1-7',
        level: 1,
        question: 'Mennyi a következő adatsor terjedelme: {15, 22, 28, 45, 60}?',
        options: [
          '45',
          '60',
          '34',
          '15'
        ],
        correctAnswer: '45',
        explanation: 'A terjedelem: R = x_max - x_min = 60 - 15 = 45.',
        hint: '60 - 15 = ?',
        questionTypeBadge: 'Számolás'
      },
      {
        id: 'ssq1-8',
        level: 1,
        question: 'Juli matematika jegyei a félév során: 4, 2, 5, 3, 2, 4, 3, 3. Mennyi a jegyeinek a módusza?',
        options: [
          '3',
          '2',
          '4',
          '3,25'
        ],
        correctAnswer: '3',
        explanation: 'Gyakoriságok: 2-esből 2 db, 3-asból 3 db, 4-esből 2 db, 5-ösből 1 db. A leggyakoribb a 3-as (3 db), így Mo = 3.',
        hint: 'Melyik jegyből van pontosan 3 darab?',
        questionTypeBadge: 'Alkalmazás'
      },
      {
        id: 'ssq1-9',
        level: 1,
        question: 'Mennyi Juli fenti jegyeinek (4, 2, 5, 3, 2, 4, 3, 3) a mediánja?',
        options: [
          '3',
          '3,5',
          '2,5',
          '4'
        ],
        correctAnswer: '3',
        explanation: 'Rendezett adatsor: 2, 2, 3, 3, 3, 4, 4, 5 (n = 8). A 4. és 5. elem számtani közepe: (3 + 3) / 2 = 3.',
        hint: 'Rendezd sorba a jegyeket: 2, 2, 3, 3, 3, 4, 4, 5. Mi a két középső átlaga?',
        questionTypeBadge: 'Alkalmazás'
      },
      {
        id: 'ssq1-10',
        level: 1,
        question: 'Egy 30 számból álló adathalmaznak ismerjük az átlagát, mediánját, móduszát és terjedelmét. A négy közül melyik az a mutató, amelynek az értéke BIZTOSAN szerepel az adathalmaz elemei között?',
        options: [
          'A módusz',
          'Az átlag',
          'A medián',
          'A terjedelem'
        ],
        correctAnswer: 'A módusz',
        explanation: 'A módusz definíció szerint a mintában legtöbbször előforduló elem, így ha létezik, kötelezően benne van az adatok között. (Páros n=30 esetén a medián két szám átlaga, így lehet olyan tört is, ami nem eleme a mintának).',
        hint: 'A módusz csakis a mintából származó szám lehet.',
        questionTypeBadge: 'Elmélet'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Gyakoriságok, fizetések és diagramok',
    subtitle: '10 összetettebb feladat gyakorisági táblázatokból, bérelemzésekből és hisztogramokból',
    range: '11–20. kérdés',
    focus: 'Súlyozott számítások gyakorisági táblázatból, ferde eloszlások és robusztusság',
    badgeBg: 'bg-purple-100 dark:bg-purple-950/60',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    badgeText: 'text-purple-800 dark:text-purple-300',
    accentGradient: 'from-purple-500 to-indigo-600',
    questions: [
      {
        id: 'ssq2-1',
        level: 2,
        question: 'Egy cégnél 20 dolgozó van: 3 takarító (80e Ft), 6 adminisztrátor (120e Ft), 5 tisztviselő (200e Ft), 5 főmunkatárs (250e Ft) és 1 igazgató (300e Ft). Mennyi a fizetések módusza?',
        options: [
          '120 ezer Ft',
          '200 ezer Ft',
          '175,5 ezer Ft',
          '250 ezer Ft'
        ],
        correctAnswer: '120 ezer Ft',
        explanation: 'A legnagyobb gyakoriság 6 fő, ami a 120 ezer Ft-os keresethez tartozik, tehát Mo = 120 ezer Ft.',
        hint: 'Melyik fizetési kategóriában dolgoznak a legtöbben (6 fő)?',
        questionTypeBadge: 'Gyakoriság'
      },
      {
        id: 'ssq2-2',
        level: 2,
        question: 'A fenti 20 dolgozó fizetéseinek mennyi a mediánja?',
        options: [
          '200 ezer Ft',
          '175,5 ezer Ft',
          '160 ezer Ft',
          '120 ezer Ft'
        ],
        correctAnswer: '200 ezer Ft',
        explanation: 'A 20 adat közül a 10. és 11. helyen lévő adat átlaga kell. 3 db 80e + 6 db 120e = 9 fő. A 10-től 14. helyig 200e Ft áll, így (200 + 200) / 2 = 200 ezer Ft.',
        hint: 'A 10. és 11. dolgozó mindegyike 200 ezer Ft-ot keres.',
        questionTypeBadge: 'Gyakoriság'
      },
      {
        id: 'ssq2-3',
        level: 2,
        question: 'A fenti 20 dolgozó fizetésének mennyi az átlaga?',
        options: [
          '175,5 ezer Ft',
          '200 ezer Ft',
          '190 ezer Ft',
          '182 ezer Ft'
        ],
        correctAnswer: '175,5 ezer Ft',
        explanation: 'Összes fizetés: 3·80 + 6·120 + 5·200 + 5·250 + 1·300 = 240 + 720 + 1000 + 1250 + 300 = 3510 ezer Ft. Átlag: 3510 / 20 = 175,5 ezer Ft.',
        hint: 'Számítsd ki a súlyozott összeget és oszd el 20-szal!',
        questionTypeBadge: 'Átlag'
      },
      {
        id: 'ssq2-4',
        level: 2,
        question: 'Luca pénztárcájában van: 3 db 50-es, 2 db 100-as, 2 db 200-as, 1 db 500-as, 4 db 1000-es, 1 db 2000-es, 2 db 5000-es. Mennyi a pénzek címletének módusza?',
        options: [
          '1000 Ft',
          '50 Ft',
          '5000 Ft',
          '500 Ft'
        ],
        correctAnswer: '1000 Ft',
        explanation: 'Az 1000 Ft-os bankjegyből van a legtöbb, 4 darab, így a módusz 1000 Ft.',
        hint: 'Melyik címletből van 4 darab?',
        questionTypeBadge: 'Alkalmazás'
      },
      {
        id: 'ssq2-5',
        level: 2,
        question: 'Luca fenti 15 pénzérméjének és bankjegyének mennyi a mediánja?',
        options: [
          '500 Ft',
          '200 Ft',
          '1000 Ft',
          '350 Ft'
        ],
        correctAnswer: '500 Ft',
        explanation: 'Összesen n = 15 darab van. Páratlan, a középső a (15+1)/2 = 8. darab. Kumulált gyakoriság: 3 db 50-es, +2 db 100-as (5), +2 db 200-as (7). A 8. darab az 500-as!',
        hint: 'A nagyság szerinti 8. pénzdarab értékét keresed.',
        questionTypeBadge: 'Alkalmazás'
      },
      {
        id: 'ssq2-6',
        level: 2,
        question: 'Egy 100 pontos tesztben 11 tanuló eredményei nagyság szerint: 0, 2, 6, 12, 12, 60, 62, 63, 100, 100, 100. Mennyi a medián pontszám?',
        options: [
          '60 pont',
          '62 pont',
          '100 pont',
          '47 pont'
        ],
        correctAnswer: '60 pont',
        explanation: '11 tanuló esetén a középső a (11+1)/2 = 6. tanuló pontszáma, ami pontosan 60 pont.',
        hint: '11 számból a 6. szám van középen.',
        questionTypeBadge: 'Számolás'
      },
      {
        id: 'ssq2-7',
        level: 2,
        question: 'Egy szabálytalan dobókockát 120-szor dobtak fel. Eredmények: 1-es: 21, 2-es: 18, 3-as: 4, 4-es: 45, 5-ös: 22, 6-os: 10. Mi a dobások módusza?',
        options: [
          '4',
          '45',
          '3',
          '5'
        ],
        correctAnswer: '4',
        explanation: 'A legnagyobb gyakoriság a 45 db, ami a 4-es dobáshoz tartozik, tehát a módusz 4 (nem pedig 45!).',
        hint: 'A módusz maga a dobott pontérték, nem a gyakoriság száma!',
        questionTypeBadge: 'Gyakoriság'
      },
      {
        id: 'ssq2-8',
        level: 2,
        question: 'A fenti 120 dobásból álló számsokaságnak mennyi a mediánja?',
        options: [
          '4',
          '3,5',
          '4,5',
          '3'
        ],
        correctAnswer: '4',
        explanation: 'n = 120 páros, a 60. és 61. dobás kell. Az 1, 2, 3-as dobások száma: 21 + 18 + 4 = 43. A 44-től a 88. dobásig minden dobás 4-es, így mindkét középső dobás 4-es: Me = 4.',
        hint: '43 dobás után következik 45 darab 4-es. Hol van a 60. és 61. dobás?',
        questionTypeBadge: 'Gyakoriság'
      },
      {
        id: 'ssq2-9',
        level: 2,
        question: 'Egy baráti társaság tagjainak életkora: 18, 19, 20, 22, 23 év. Csatlakozik hozzájuk egy 80 éves nagyszülő. Hogyan változik a csoport mediánja és átlaga?',
        options: [
          'A medián alig változik (20-ról 21-re), míg az átlag drasztikusan megnő (20,4-ről 30,33-ra)',
          'Mindkettő pontosan ugyanannyival nő meg',
          'A medián nő meg drasztikusan, az átlag alig változik',
          'Egyik mutató sem változik, mert csak egyetlen ember érkezett'
        ],
        correctAnswer: 'A medián alig változik (20-ról 21-re), míg az átlag drasztikusan megnő (20,4-ről 30,33-ra)',
        explanation: 'A medián robusztus: korábban Me = 20 volt, az új 6 fős csoportban Me = (20+22)/2 = 21. Az átlag viszont (102/5 = 20,4)-ről (182/6 = 30,33)-ra ugrott a kiugró adat miatt!',
        hint: 'A medián ellenáll a kiugró értékeknek, az átlag viszont nem.',
        questionTypeBadge: 'Robusztusság'
      },
      {
        id: 'ssq2-10',
        level: 2,
        question: 'Ha egy számsokaság minden eleméhez hozzáadunk 15-öt, hogyan változik meg a terjedelem és az átlag?',
        options: [
          'A terjedelem változatlan marad, az átlag 15-tel növekszik',
          'Mindkettő 15-tel növekszik',
          'A terjedelem 15-tel nő, az átlag változatlan marad',
          'Mindkettő változatlan marad'
        ],
        correctAnswer: 'A terjedelem változatlan marad, az átlag 15-tel növekszik',
        explanation: 'R_új = (x_max + 15) - (x_min + 15) = x_max - x_min = R_régi. Az átlag képletében viszont minden tag nő, így az új átlag is pontosan 15-tel lesz nagyobb.',
        hint: 'Két szám különbsége megváltozik, ha mindkettőt ugyanannyival toljuk el?',
        questionTypeBadge: 'Tétel'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Adatrekonstrukció és érettségi típusfeladatok',
    subtitle: '10 emelt szintű és érettségi feladat hiányzó adatok visszakövetéséről és statisztikai bizonyításokról',
    range: '21–30. kérdés',
    focus: 'Csapatátlag változása, adathalmaz elemeinek meghatározása, extrém korlátok',
    badgeBg: 'bg-emerald-100 dark:bg-emerald-950/60',
    badgeBorder: 'border-emerald-200 dark:border-emerald-800',
    badgeText: 'text-emerald-800 dark:text-emerald-300',
    accentGradient: 'from-emerald-500 to-teal-600',
    questions: [
      {
        id: 'ssq3-1',
        level: 3,
        question: 'Egy röplabdacsapat 6 pályán lévő játékosának átlagmagassága 172 cm. Egy játékost lecserélnek, így az átlagmagasság 174 cm-re változik. Mennyivel magasabb az új játékos a lecseréltnél?',
        options: [
          '12 cm-rel',
          '2 cm-rel',
          '6 cm-rel',
          '24 cm-rel'
        ],
        correctAnswer: '12 cm-rel',
        explanation: 'Az átlag 2 cm-rel nőtt 6 játékosra vetítve, tehát a csapat össmagassága 6 · 2 cm = 12 cm-rel emelkedett: 6·174 - 6·172 = 1044 - 1032 = 12 cm.',
        hint: 'A 6 játékos összegének megváltozása adja meg a különbséget: 6 · 2.',
        questionTypeBadge: 'Érettségi'
      },
      {
        id: 'ssq3-2',
        level: 3,
        question: 'Adott négy szám: 5, -2, -1, 0. Milyen x értéket kell ötödik számként hozzávenni, hogy az öt szám mediánja 0 legyen?',
        options: [
          'Bármilyen nemnegatív szám megfelel: x ≥ 0',
          'Csak az x = 0',
          'Bármilyen nempozitív szám: x ≤ 0',
          'Csak az x = 5'
        ],
        correctAnswer: 'Bármilyen nemnegatív szám megfelel: x ≥ 0',
        explanation: 'A rendezett minta: -2, -1, 0, 5 és x. Ha x ≥ 0, akkor a 0 előtt két szám (-2 és -1) áll, a 0 után pedig x és 5 (vagy 5 és x), így a 0 pontosan középen, a 3. helyen lesz: Me = 0.',
        hint: 'A 0-nak kell a nagyság szerinti 3. helyre kerülnie.',
        questionTypeBadge: 'Konstrukció'
      },
      {
        id: 'ssq3-3',
        level: 3,
        question: 'Adott négy szám: 5, -2, -1, 0 (összegük 2). Milyen x ötödik számot kell választani, hogy az öt szám átlaga 0 legyen?',
        options: [
          'x = -2',
          'x = 0',
          'x = 2',
          'x = -5'
        ],
        correctAnswer: 'x = -2',
        explanation: 'Az átlag akkor 0, ha az elemek összege 0: 5 + (-2) + (-1) + 0 + x = 2 + x = 0, amiből x = -2.',
        hint: 'Az 5 szám összegének pontosan nullának kell lennie.',
        questionTypeBadge: 'Számolás'
      },
      {
        id: 'ssq3-4',
        level: 3,
        question: 'Egy márciusi napon mért 5 hőmérsékleti adat átlaga 1 °C, mediánja 0 °C. Melyik lehet az adatsor az alábbiak közül?',
        options: [
          '{-3; -1; 0; 4; 5}',
          '{-2; 0; 0; 1; 2}',
          '{0; 0; 1; 2; 3}',
          '{-1; 0; 1; 2; 4}'
        ],
        correctAnswer: '{-3; -1; 0; 4; 5}',
        explanation: 'Az összegnek 5 · 1 = 5-nek kell lennie, a rendezett sor 3. elemének pedig 0-nak. {-3, -1, 0, 4, 5} esetén az összeg: -3 - 1 + 0 + 4 + 5 = 5, átlag = 1 °C, medián = 0 °C.',
        hint: 'Ellenőrizd az összegüket (5) és a 3. elemet (0)!',
        questionTypeBadge: 'Érettségi'
      },
      {
        id: 'ssq3-5',
        level: 3,
        question: 'Egy 12 számból álló minta módusza 3, átlaga 4. Hozzávettünk még egy számot, így az új 13 szám átlaga 5-re nőtt. Melyik számot tettük hozzá?',
        options: [
          '17',
          '5',
          '13',
          '9'
        ],
        correctAnswer: '17',
        explanation: 'A 12 szám összege 12 · 4 = 48. A 13 szám új összege 13 · 5 = 65. A hozzáadott szám: 65 - 48 = 17.',
        hint: '13 · 5 mínusz 12 · 4 = ?',
        questionTypeBadge: 'Érettségi'
      },
      {
        id: 'ssq3-6',
        level: 3,
        question: 'Egy hat természetes számból álló minta mediánja 10,5; módusza 11; terjedelme 6; átlaga 10,5. Mennyi a 6 szám összege?',
        options: [
          '63',
          '60',
          '66',
          '54'
        ],
        correctAnswer: '63',
        explanation: 'Mivel n = 6 és az átlag 10,5, az elemek összege: n · x̄ = 6 · 10,5 = 63.',
        hint: 'Szorozd meg az elemszámot (6) az átlaggal (10,5)!',
        questionTypeBadge: 'Érettségi'
      },
      {
        id: 'ssq3-7',
        level: 3,
        question: 'A fenti 6 elemű természetes számokból álló mintában ({x₁, x₂, x₃, x₄, x₅, x₆}) mennyi a két középső szám (x₃ és x₄) értéke?',
        options: [
          'x₃ = 10 és x₄ = 11',
          'x₃ = 9 és x₄ = 12',
          'x₃ = 10,5 és x₄ = 10,5',
          'x₃ = 8 és x₄ = 13'
        ],
        correctAnswer: 'x₃ = 10 és x₄ = 11',
        explanation: 'Mivel Me = 10,5, így (x₃ + x₄) / 2 = 10,5, azaz x₃ + x₄ = 21. Mivel egész számokról van szó, és a módusz 11 (tehát legalább két 11-es kell a felső felében: x₄=11 és x₅=11), így x₃ = 21 - 11 = 10.',
        hint: 'Egész számok, átlaguk 10,5, és a módusz miatt legalább két 11-es van.',
        questionTypeBadge: 'Bizonyítás'
      },
      {
        id: 'ssq3-8',
        level: 3,
        question: 'Egy 50 adatból álló számsokaság minden adata a {0; 1; 2} halmaz eleme. Az adatok átlaga 0,32. Legfeljebb hány darab 2-es lehet az adatsokaságban?',
        options: [
          '8 darab',
          '16 darab',
          '4 darab',
          '25 darab'
        ],
        correctAnswer: '8 darab',
        explanation: 'Az adatok összege: 50 · 0,32 = 16. Még ha az összes többi nem-2-es adat mind 0 is (ami minimális hozzájárulást ad), k db 2-es összege 2k = 16, amiből k = 8.',
        hint: 'Az összes adat összege 16. Hány 2-es adhat ki legfeljebb 16-ot?',
        questionTypeBadge: 'Emelt érettségi'
      },
      {
        id: 'ssq3-9',
        level: 3,
        question: 'Lehet-e az 50 darab {0, 1, 2} elemből álló minta mediánja 0, ha az adatok átlaga 1,4?',
        options: [
          'Nem lehet, mert a maximális elérhető átlag ekkor csak 1,0 lenne',
          'Igen, bármely adatsor esetén megvalósítható',
          'Igen, ha pontosan 25 darab 0-s és 25 darab 2-es van',
          'Csak akkor, ha a módusz is 0'
        ],
        correctAnswer: 'Nem lehet, mert a maximális elérhető átlag ekkor csak 1,0 lenne',
        explanation: 'Ha Me = 0, akkor a rendezett sorban a 25. és 26. adatnak is 0-nak kell lennie, tehát legalább 26 db 0 van. A maradék legfeljebb 24 db szám mind 2-es lehetne, aminek összege maximum 24 · 2 = 48. Ekkor az átlag maximum 48 / 50 = 0,96 lehetne, így az 1,4 átlag lehetetlen!',
        hint: 'Ha a medián 0, a számok több mint fele kötelezően 0. Mi lehet a lehető legnagyobb összeg a maradékból?',
        questionTypeBadge: 'Emelt érettségi'
      },
      {
        id: 'ssq3-10',
        level: 3,
        question: 'Milyen kapcsolat áll fenn az átlag, a medián és a módusz között egy teljesen szimmetrikus, egycsúcsú eloszlásban?',
        options: [
          'x̄ = Me = Mo (mindhárom mutató pontosan egybeesik)',
          'x̄ > Me > Mo',
          'Mo > Me > x̄',
          'A három mutatónak semmi köze egymáshoz'
        ],
        correctAnswer: 'x̄ = Me = Mo (mindhárom mutató pontosan egybeesik)',
        explanation: 'Szimmetrikus, egycsúcsú eloszlásban a csúcs (módusz), a felezőpont (medián) és a súlypont (átlag) pontosan ugyanarra az értékre esik: x̄ = Me = Mo.',
        hint: 'Szimmetrikus haranggörbénél a csúcs pontosan a felezővonalon van.',
        questionTypeBadge: 'Tétel'
      }
    ]
  }
};

export const SummaryStatsQuiz: React.FC<SummaryStatsQuizProps> = (props) => {
  return (
    <QuizTemplate
      title="Számsokaságok statisztikai jellemzői Kvíz"
      subtitle="Gyakorold az átlag, medián, módusz és terjedelem kiszámítását és tulajdonságait!"
      topicId="g10-stat-statisztikai-jellemzok-quiz"
      topicTitle="Számsokaságok statisztikai jellemzői"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      matcherComponent={
        <SummaryStatsMatcher
          onBack={props.onBack}
          onSwitchToTheory={props.onSwitchToTheory}
          onSwitchToQuiz={props.onBack}
        />
      }
      sorterComponent={
        <SummaryStatsSorter
          onBack={props.onBack}
          onSwitchToTheory={props.onSwitchToTheory}
          onSwitchToQuiz={props.onBack}
        />
      }
      {...props}
    />
  );
};

export default SummaryStatsQuiz;


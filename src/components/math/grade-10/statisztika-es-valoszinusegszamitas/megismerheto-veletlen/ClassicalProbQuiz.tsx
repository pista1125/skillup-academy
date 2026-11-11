import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { ClassicalProbMatcher } from './ClassicalProbMatcher';
import { ClassicalProbSorter } from './ClassicalProbSorter';
import {
  TwoDiceSumGridSvg,
  RockPaperScissorsLizardSpockSvg,
  CardDrawTreeGraphSvg
} from './ClassicalProbFigures';

interface ClassicalProbQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
  [key: string]: any;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Két dobókocka rácsa & Zsombor csapdája',
    description: 'Két kocka esetén 6 × 6 = 36 mikroszkopikus elemi esemény van. A 7 összeghez 6 mező tartozik (1/6), míg a 8-hoz csak 5 mező (5/36), mert a 4+4 nem rendezett pár!',
    note: 'A leggyakoribb összeg mindig a 7 (P = 6/36 ≈ 16,7%).',
    color: 'from-purple-500 to-indigo-600',
    figure: <TwoDiceSumGridSvg size={200} />
  },
  {
    title: 'Szimmetrikus játékok (9 és 25 kimenetel)',
    description: 'Kő-papír-ollóban 3 × 3 = 9 eset van, döntetlen: 3/9 = 1/3. A Gyík-Spock változatban 5 × 5 = 25 esetből az 5 átlós választás döntetlen: 5/25 = 1/5 = 20%. Mindkettő fair játék.',
    note: 'P(nyer) = P(veszít) = (1 - P(döntetlen)) / 2.',
    color: 'from-pink-500 to-rose-600',
    figure: <RockPaperScissorsLizardSpockSvg size={200} />
  },
  {
    title: 'Kártyahúzás fadiagramja {A, E, M, Z}',
    description: 'Visszatevés nélkül 4 × 3 = 12 kimenetel lehetséges. Értelmes magyar szavak: AZ, EZ, MA (3 db). A valószínűség: 3 / 12 = 1/4 = 25%.',
    note: 'Visszatevés nélkül n · (n - 1), visszatevéssel n² elemi esemény képződik.',
    color: 'from-emerald-500 to-teal-600',
    figure: <CardDrawTreeGraphSvg size={200} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és a klasszikus Laplace-modell',
    subtitle: '10 alapozó feladat az elemi eseményekről és a klasszikus valószínűségről',
    range: '1–10. kérdés',
    focus: 'Laplace-képlet, eseménytér, biztos és lehetetlen esemény, kockák alapesetei',
    badgeBg: 'bg-purple-100 dark:bg-purple-950/60',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    badgeText: 'text-purple-800 dark:text-purple-300',
    accentGradient: 'from-purple-500 to-indigo-600',
    questions: [
      {
        id: 'cpq1-1',
        level: 1,
        question: 'Mikor alkalmazható a klasszikus valószínűségszámítás P(A) = k / n képlete?',
        options: [
          'Ha a lehetséges kimenetelek (elemi események) száma véges és egyenlően valószínűek',
          'Bármilyen véletlen kísérlet esetén, feltétel nélkül',
          'Csak akkor, ha a kísérletet legalább 10 000-szer elvégeztük a valóságban',
          'Kizárólag pénzérmék és szabványos dobókockák dobásakor'
        ],
        correctAnswer: 0,
        explanation: 'A Laplace-féle klasszikus valószínűségi modell két szigorú feltételhez kötött: a lehetséges kimenetelek száma véges, és a szimmetria vagy fizikai tulajdonságok miatt mindegyik egyenlően valószínű.',
        hint: 'Gondolj a Laplace-modell definíciójára!'
      },
      {
        id: 'cpq1-2',
        level: 1,
        question: 'Egy szabályos pénzérmét feldobunk. Mennyi a valószínűsége, hogy fejet dobunk?',
        options: [
          '1/2 (50%)',
          '1/4 (25%)',
          '1/3 (33,3%)',
          '1 (100%)'
        ],
        correctAnswer: 0,
        explanation: 'A lehetséges kimenetelek száma n = 2 (fej vagy írás). Ebből a kedvező k = 1 (fej). A valószínűség: P = 1/2 = 50%.',
        hint: '2 lehetséges kimenetel van, 1 kedvező.'
      },
      {
        id: 'cpq1-3',
        level: 1,
        question: 'Két szabályos dobókockát feldobunk egyszerre. Hány mikroszkopikus elemi eseménye van ennek a kísérletnek a valóságban?',
        options: [
          '36 (mert 6 × 6 = 36 különböző rendezett kimenetelpár van)',
          '11 (mert az összeg 2-től 12-ig terjedhet)',
          '21 (ha nem teszünk különbséget a sorrendben)',
          '12 (mindkét kockán 6 oldal van)'
        ],
        correctAnswer: 0,
        explanation: 'A két kocka egymástól független test, a természet megkülönbözteti őket: 6 × 6 = 36 rendezett számpár alkotja a klasszikus Laplace-modellt.',
        hint: 'Az első kocka 6-féle, a második kocka 6-féle lehet.'
      },
      {
        id: 'cpq1-4',
        level: 1,
        question: 'Mennyi a biztos esemény valószínűsége?',
        options: [
          '1 (vagy 100%)',
          '0,5 (vagy 50%)',
          'Végtelen (∞)',
          '0'
        ],
        correctAnswer: 0,
        explanation: 'A biztos esemény a kísérlet minden lehetséges kimenetelét magában foglalja (k = n), ezért valószínűsége P(I) = n / n = 1 (100%).',
        hint: 'A biztos esemény garantáltan bekövetkezik.'
      },
      {
        id: 'cpq1-5',
        level: 1,
        question: 'Mennyi a lehetetlen esemény valószínűsége?',
        options: [
          '0 (vagy 0%)',
          '-1',
          '0,01',
          'Nem értelmezhető'
        ],
        correctAnswer: 0,
        explanation: 'A lehetetlen eseményhez egyetlen kimenetel sem tartozik (k = 0), így valószínűsége P(∅) = 0 / n = 0.',
        hint: 'Lehetetlen esemény soha nem fordulhat elő.'
      },
      {
        id: 'cpq1-6',
        level: 1,
        question: 'Egy A esemény valószínűsége P(A) = 0,35. Mennyi az ellentett (komplementer) esemény valószínűsége?',
        options: [
          '0,65 (65%)',
          '0,35 (35%)',
          '-0,35',
          '1,35'
        ],
        correctAnswer: 0,
        explanation: 'Egy esemény és ellentettjének valószínűség-összege pontosan 1: P(nem A) = 1 - P(A) = 1 - 0,35 = 0,65.',
        hint: 'Vond ki 1-ből a megadott valószínűséget!'
      },
      {
        id: 'cpq1-7',
        level: 1,
        question: 'Két kockával dobva mennyi a valószínűsége, hogy a dobott pontok összege 12 lesz?',
        options: [
          '1/36 (kb. 2,8%)',
          '1/12 (kb. 8,3%)',
          '2/36 (kb. 5,6%)',
          '1/6 (kb. 16,7%)'
        ],
        correctAnswer: 0,
        explanation: 'A 12-es összeget a 36 mező közül kizárólag a (6, 6) dobás adja, így P = 1 / 36.',
        hint: 'Hány mezőben lesz az összeg 6 + 6?'
      },
      {
        id: 'cpq1-8',
        level: 1,
        question: 'Két kockával dobva mennyi a valószínűsége, hogy a dobott pontok összege 2 lesz?',
        options: [
          '1/36 (csak az (1, 1) dobás felel meg)',
          '2/36',
          '1/11',
          '0'
        ],
        correctAnswer: 0,
        explanation: 'A legkisebb lehetséges összeg a 2, ami csak az (1, 1) elemi esemény esetén valósul meg: 1 / 36.',
        hint: 'Csak két darab 1-essel érhető el.'
      },
      {
        id: 'cpq1-9',
        level: 1,
        question: 'Két kockával dobva melyik a leggyakoribb összeg, amely a legtöbb rácsmezőben szerepel?',
        options: [
          'A 7 (6 mezőben szerepel: 6/36 = 1/6)',
          'A 6 (5 mezőben)',
          'A 8 (6 mezőben)',
          'Mindegyik összeg egyenlően gyakori'
        ],
        correctAnswer: 0,
        explanation: 'A 7-es összeghez 6 kedvező mező tartozik: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1). Valószínűsége 6/36 = 1/6 ≈ 16,7%.',
        hint: 'A 6×6-os rács főátlója mentén keresd!'
      },
      {
        id: 'cpq1-10',
        level: 1,
        question: 'Miért hibás az az érvelés, hogy mivel két kocka összege 2, 3, ..., 12 (11-féle), ezért bármelyik összeg esélye 1/11?',
        options: [
          'Mert a különböző összegekhez eltérő számú elemi esemény tartozik, nem egyenlően valószínűek',
          'Mert a 12-es összeg soha nem dobható meg szabályos kockával',
          'Mert a 11 nem osztható 6-tal',
          'Mert a valószínűség mindig csak páros tört lehet'
        ],
        correctAnswer: 0,
        explanation: 'A klasszikus modellben csak az egyenlően valószínű elemi eseményeket szabad számolni. Az összegek nem egyenlően valószínűek (a 7-hez 6 mező tartozik, míg a 2-höz csak 1).',
        hint: 'Gondolj a kedvező mezők számára!'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Két kocka összege, szorzata és Zsombor csapdája',
    subtitle: '10 számolásos feladat a rácsmódszer alkalmazására és tévhitek elkerülésére',
    range: '11–20. kérdés',
    focus: '7 vs. 8 összeg, páros/páratlan szorzat, négyzetszámok, relációk és szimulációk',
    badgeBg: 'bg-indigo-100 dark:bg-indigo-950/60',
    badgeBorder: 'border-indigo-200 dark:border-indigo-800',
    badgeText: 'text-indigo-800 dark:text-indigo-300',
    accentGradient: 'from-indigo-500 to-purple-600',
    questions: [
      {
        id: 'cpq2-1',
        level: 2,
        question: 'Zsombor szerint a 7 és a 8 pontösszeg esélye egyenlő, mert 7 = 1+6 = 2+5 = 3+4 és 8 = 2+6 = 3+5 = 4+4 (mindkettő 3 pár). Igaza van-e Zsombornak?',
        options: [
          'Nincs igaza, mert a 4+4 csak 1 rácsmező, míg az eltérő párok kétszer fordulnak elő: P(7) = 6/36 > P(8) = 5/36',
          'Igaza van, a felbontások száma határozza meg a valószínűséget',
          'Nincs igaza, a 8 sokkal gyakoribb, mert nagyobb számok alkotják',
          'Igaza van, de csak fehér és fekete kocka esetén'
        ],
        correctAnswer: 0,
        explanation: 'Zsombor nem vette figyelembe, hogy a (2,6) és (6,2), (3,5) és (5,3), (1,6) és (6,1) párok két-két elemi eseményt adnak, viszont a (4,4) csak egyetlen mező. Így a 7-nek 6, a 8-nak csak 5 kedvező esete van.',
        hint: 'Hány mezőt jelent a 4+4 a táblázatban?'
      },
      {
        id: 'cpq2-2',
        level: 2,
        question: 'Két dobókockával dobva mekkora a valószínűsége, hogy a dobott számok összege pontosan 8?',
        options: [
          '5/36 (kb. 13,9%)',
          '6/36 (kb. 16,7%)',
          '3/36 (kb. 8,3%)',
          '4/36 (kb. 11,1%)'
        ],
        correctAnswer: 0,
        explanation: 'A kedvező kimenetelek: (2,6), (3,5), (4,4), (5,3), (6,2). Ez összesen 5 mező a 36-ból: 5 / 36.',
        hint: 'Írd fel a lehetséges párokat: (2,6), (3,5), (4,4), (5,3), (6,2).'
      },
      {
        id: 'cpq2-3',
        level: 2,
        question: 'Két dobókockával dobva mennyi a valószínűsége, hogy a pontok összege pontosan 10?',
        options: [
          '3/36 = 1/12 (kb. 8,3%)',
          '2/36 = 1/18 (kb. 5,6%)',
          '4/36 = 1/9 (kb. 11,1%)',
          '1/36 (kb. 2,8%)'
        ],
        correctAnswer: 0,
        explanation: 'A 10-es összeget adó párok: (4,6), (5,5), (6,4). Ez 3 kedvező eset a 36-ból: 3/36 = 1/12.',
        hint: 'Mely számpárok összege 10 a kockákon?'
      },
      {
        id: 'cpq2-4',
        level: 2,
        question: 'Két dobókockával dobva mekkora az esélye annak, hogy mindkét kocka azonos számot mutat („páros dobás”)?',
        options: [
          '6/36 = 1/6 (kb. 16,7%)',
          '1/36 (kb. 2,8%)',
          '12/36 = 1/3 (kb. 33,3%)',
          '3/36 = 1/12 (kb. 8,3%)'
        ],
        correctAnswer: 0,
        explanation: 'A 6×6-os táblázat főátlójában találhatók: (1,1), (2,2), (3,3), (4,4), (5,5), (6,6). Összesen 6 mező: 6/36 = 1/6.',
        hint: '6-féle azonos számot dobhatunk.'
      },
      {
        id: 'cpq2-5',
        level: 2,
        question: 'Két kockával dobva mennyi annak a valószínűsége, hogy a dobott pontok összege kisebb 5-nél (tehát 2, 3 vagy 4)?',
        options: [
          '6/36 = 1/6 (kb. 16,7%)',
          '4/36 = 1/9 (kb. 11,1%)',
          '5/36 (kb. 13,9%)',
          '10/36 (kb. 27,8%)'
        ],
        correctAnswer: 0,
        explanation: 'Összeg 2: (1,1) [1 db]. Összeg 3: (1,2), (2,1) [2 db]. Összeg 4: (1,3), (2,2), (3,1) [3 db]. Összesen: 1 + 2 + 3 = 6 kedvező eset → 6/36 = 1/6.',
        hint: 'Add össze a 2-es, 3-as és 4-es összegek mezőit!'
      },
      {
        id: 'cpq2-6',
        level: 2,
        question: 'Két kockával dobva mekkora a valószínűsége annak, hogy a dobott pontok szorzata pontosan 6 lesz?',
        options: [
          '4/36 = 1/9 (kb. 11,1%)',
          '2/36 = 1/18 (kb. 5,6%)',
          '6/36 = 1/6 (kb. 16,7%)',
          '3/36 = 1/12 (kb. 8,3%)'
        ],
        correctAnswer: 0,
        explanation: 'A 6 szorzatot adó elemi kimenetelek: (1,6), (2,3), (3,2), (6,1). Ez 4 eset a 36-ból: 4/36 = 1/9.',
        hint: 'Mely számpárok szorzata 6? Ne feledd a fordított sorrendet sem!'
      },
      {
        id: 'cpq2-7',
        level: 2,
        question: 'Két kockával dobva mennyi a valószínűsége, hogy a dobott pontok szorzata négyzetszám (1, 4, 9, 16, 25 vagy 36)?',
        options: [
          '8/36 = 2/9 (kb. 22,2%)',
          '6/36 = 1/6 (kb. 16,7%)',
          '10/36 (kb. 27,8%)',
          '4/36 = 1/9 (kb. 11,1%)'
        ],
        correctAnswer: 0,
        explanation: 'A négyzetszámokhoz tartozó mezők: 1: (1,1) [1]; 4: (1,4), (2,2), (4,1) [3]; 9: (3,3) [1]; 16: (4,4) [1]; 25: (5,5) [1]; 36: (6,6) [1]. Összesen 1 + 3 + 1 + 1 + 1 + 1 = 8 mező: 8/36 = 2/9.',
        hint: 'Vigyázz: a 4-es szorzatot 3 mező is adja!'
      },
      {
        id: 'cpq2-8',
        level: 2,
        question: 'Két kockával dobva mekkora a valószínűsége, hogy az összeg nagyobb lesz 9-nél (tehát 10, 11 vagy 12)?',
        options: [
          '6/36 = 1/6 (kb. 16,7%)',
          '5/36 (kb. 13,9%)',
          '4/36 = 1/9 (kb. 11,1%)',
          '7/36 (kb. 19,4%)'
        ],
        correctAnswer: 0,
        explanation: 'Összeg 10: 3 db; Összeg 11: 2 db; Összeg 12: 1 db. Összesen: 3 + 2 + 1 = 6 mező a 36-ból: 6/36 = 1/6.',
        hint: 'Számold meg a 10, 11 és 12 összegek mezőit a táblázatban!'
      },
      {
        id: 'cpq2-9',
        level: 2,
        question: 'Minek van nagyobb valószínűsége két kockánál: annak, hogy az összeg nagyobb 9-nél, vagy annak, hogy kisebb 4-nél?',
        options: [
          'Annak, hogy nagyobb 9-nél (6/36 esély vs. 3/36 esély)',
          'Annak, hogy kisebb 4-nél',
          'A két esemény valószínűsége pontosan megegyezik',
          'Egyik sem következhet be'
        ],
        correctAnswer: 0,
        explanation: 'Összeg > 9 (10, 11, 12): 3 + 2 + 1 = 6 mező. Összeg < 4 (2 vagy 3): 1 + 2 = 3 mező. 6/36 = 1/6 kétszer akkora, mint 3/36 = 1/12!',
        hint: 'Hány mező ad 10-nél nem kisebb, és hány 4-nél kisebb összeget?'
      },
      {
        id: 'cpq2-10',
        level: 2,
        question: 'Máté szerencsekereke 100 pörgetésből 32-szer piroson, 34-szer zöldön, 16-szor kéken és 18-szor sárgán állt meg. Melyik elméleti valószínűségi modell illik legjobban a kísérlethez?',
        options: [
          'Piros: 1/3 (≈33%), Zöld: 1/3 (≈33%), Kék: 1/6 (≈17%), Sárga: 1/6 (≈17%)',
          'Mind a 4 szín egyenlő méretű, 1/4 (25%)',
          'Piros: 50%, Zöld: 50%, a többi 0%',
          'Piros: 32%, Zöld: 34%, Kék: 16%, Sárga: 18% pontos elméleti értékekkel'
        ],
        correctAnswer: 0,
        explanation: 'A relatív gyakoriságok: piros 32%, zöld 34%, kék 16%, sárga 18%. Ez kiválóan egybevág egy olyan szerencsekerékkel, ahol a piros és a zöld egyenként 120°-os (1/3), a kék és sárga pedig 60°-os (1/6) körcikk!',
        hint: '32% és 34% kb. 1/3 (33,3%), a 16% és 18% pedig kb. 1/6 (16,7%).'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Játékok, összetett kísérletek és kompetenciafeladatok',
    subtitle: '10 emelt szintű feladat kombinatorikus húzásokról, érmékről és játékokról',
    range: '21–30. kérdés',
    focus: 'Kő-papír-olló, Gyík-Spock, visszatevéses/visszatevés nélküli mintavétel, 3 érme',
    badgeBg: 'bg-pink-100 dark:bg-pink-950/60',
    badgeBorder: 'border-pink-200 dark:border-pink-800',
    badgeText: 'text-pink-800 dark:text-pink-300',
    accentGradient: 'from-pink-500 to-rose-600',
    questions: [
      {
        id: 'cpq3-1',
        level: 3,
        question: 'Hagyományos kő-papír-olló játékban mekkora az esélye annak, hogy egy menet döntetlennel zárul?',
        options: [
          '3/9 = 1/3 (kb. 33,3%)',
          '1/9 (kb. 11,1%)',
          '1/2 (50%)',
          '1/6 (kb. 16,7%)'
        ],
        correctAnswer: 0,
        explanation: 'Az összes elemi esemény száma 3 × 3 = 9. A döntetlen akkor következik be, ha mindketten ugyanazt mutatják (kő-kő, papír-papír, olló-olló). Ez 3 eset: 3/9 = 1/3.',
        hint: '3×3 lehetséges választásból hányban egyforma a két játékos jele?'
      },
      {
        id: 'cpq3-2',
        level: 3,
        question: 'Mitől tekinthető matematikai értelemben igazságosnak (fair játéknak) a kő-papír-olló?',
        options: [
          'Mert a szimmetria miatt mindkét játékosnak pontosan egyenlő a nyerési esélye: P(1. nyer) = P(2. nyer) = 1/3',
          'Mert nincsenek benne kockák és szerencsekártyák',
          'Mert sosem lehet döntetlen a kimenetel',
          'Mert a kő mindig erősebb az ollónál'
        ],
        correctAnswer: 0,
        explanation: 'Egy játék akkor fair, ha egyik fél sincs előnyben: a döntetlen esélye 1/3, a fennmaradó 2/3 esély pedig pontosan fele-fele arányban oszlik meg a két játékos győzelme között (1/3 - 1/3).',
        hint: 'A szabályok teljesen szimmetrikusak a két fél között.'
      },
      {
        id: 'cpq3-3',
        level: 3,
        question: 'A kő-papír-olló-gyík-Spock játékban 5 lehetséges választás van. Mekkora a döntetlen valószínűsége egy menetben?',
        options: [
          '5/25 = 1/5 = 20%',
          '1/25 = 4%',
          '5/10 = 50%',
          '10/25 = 40%'
        ],
        correctAnswer: 0,
        explanation: 'Összes lehetséges eset: 5 × 5 = 25. Döntetlen csak akkor van, ha mindkét játékos azonos jelet választ (5 átlós eset a mátrixban). Valószínűség: 5 / 25 = 1/5 = 20%.',
        hint: '5×5 = 25 eset van, ebből 5 azonos.'
      },
      {
        id: 'cpq3-4',
        level: 3,
        question: 'Négy kártyalapon az {A, E, M, Z} betűk szerepelnek. Visszatevés nélkül húzunk kettőt. Mennyi a valószínűsége, hogy értelmes magyar szót kapunk?',
        options: [
          '3/12 = 1/4 = 25% (szavak: AZ, EZ, MA)',
          '4/16 = 25%',
          '2/12 = 1/6 (kb. 16,7%)',
          '3/16 (kb. 18,8%)'
        ],
        correctAnswer: 0,
        explanation: 'Visszatevés nélkül az elemi események száma: 4 × 3 = 12. A 12 lehetséges betűpárból az AZ, EZ és MA értelmes szavak (3 db). A valószínűség: 3 / 12 = 1/4.',
        hint: '4×3 = 12 lehetőség van, ebből AZ, EZ, MA a szavak.'
      },
      {
        id: 'cpq3-5',
        level: 3,
        question: 'Három szabályos pénzérmét feldobunk. Mennyi a valószínűsége, hogy mindhárom érme ugyanazt az oldalt fogja mutatni (FFF vagy III)?',
        options: [
          '2/8 = 1/4 = 25%',
          '1/8 = 12,5%',
          '2/6 = 1/3 (kb. 33,3%)',
          '3/8 = 37,5%'
        ],
        correctAnswer: 0,
        explanation: 'Az összes elemi esemény száma 2³ = 8. Kedvező esetek: FFF és III (2 db). Valószínűség: 2 / 8 = 1/4 = 25%.',
        hint: '8 lehetséges eset van, ebből 2 azonos.'
      },
      {
        id: 'cpq3-6',
        level: 3,
        question: 'Három pénzérmét feldobva mennyi a valószínűsége, hogy pontosan egy érme mutat írást, és kettő fejet?',
        options: [
          '3/8 = 37,5%',
          '1/8 = 12,5%',
          '1/4 = 25%',
          '3/6 = 50%'
        ],
        correctAnswer: 0,
        explanation: 'A kedvező kimenetelek: FFI, FIF, IFF. Ez 3 kedvező eset a 8 lehetségesből: 3 / 8 = 37,5%.',
        hint: 'Az írás lehet az 1., 2. vagy 3. érmén.'
      },
      {
        id: 'cpq3-7',
        level: 3,
        question: 'Egy dobozban 5 különböző színű golyó van (barna, fehér, kék, piros, sárga). Kettőt húzunk visszatevés nélkül. Hány elemi eseménye van a kísérletnek?',
        options: [
          '20 (mert 5 × 4 = 20 rendezett pár lehetséges)',
          '25 (mert 5 × 5 = 25)',
          '10',
          '5'
        ],
        correctAnswer: 0,
        explanation: 'Az első húzásnál 5 lehetőségünk van, a másodiknál a kihúzott golyót már nem tesszük vissza, így 4 marad: 5 × 4 = 20 elemi esemény.',
        hint: 'Az első golyó 5-féle, a megmaradt golyók közül a második 4-féle lehet.'
      },
      {
        id: 'cpq3-8',
        level: 3,
        question: 'Ugyanebből az 5 golyós dobozból húzunk kettőt úgy, hogy az első kihúzott golyót VISSZATESSZÜK a második húzás előtt. Hány elemi esemény van így?',
        options: [
          '25 (mert 5 × 5 = 25)',
          '20',
          '10',
          '30'
        ],
        correctAnswer: 0,
        explanation: 'Visszatevéssel mindkét húzásnál 5-féle golyó közül választhatunk: 5 × 5 = 25 elemi esemény jön létre.',
        hint: 'A második húzásnál ismét 5 golyó van a dobozban.'
      },
      {
        id: 'cpq3-9',
        level: 3,
        question: 'Egy szabályos dobókockával háromszor dobunk egymás után. Hány lehetséges kimenetele (elemi eseménye) van a három dobásnak?',
        options: [
          '216 (mert 6³ = 6 × 6 × 6 = 216)',
          '18 (mert 3 × 6 = 18)',
          '36',
          '16'
        ],
        correctAnswer: 0,
        explanation: 'Minden egyes dobásnak 6 kimenetele lehet. Három független dobás esetén a szorzási szabály szerint: 6 × 6 × 6 = 216.',
        hint: '6 · 6 · 6.'
      },
      {
        id: 'cpq3-10',
        level: 3,
        question: 'Egy szabályos kockával háromszor dobunk. Mennyi a valószínűsége, hogy a második dobásunk lesz az első hatos (azaz 1.: nem 6, 2.: 6, 3.: bármi)?',
        options: [
          '5/36 (kb. 13,9%)',
          '1/36 (kb. 2,8%)',
          '1/6 (kb. 16,7%)',
          '5/216 (kb. 2,3%)'
        ],
        correctAnswer: 0,
        explanation: 'Az 1. dobás 5-féle lehet (nem 6-os), a 2. dobás csak 1-féle (hatos), a 3. dobás bármi lehet (6-féle). Kedvező esetek: 5 × 1 × 6 = 30. Összes eset: 216. A valószínűség: 30 / 216 = 5 / 36 (vagy függetlenséggel: (5/6) · (1/6) = 5/36).',
        hint: '(5/6 esély, hogy az első nem hatos) × (1/6 esély, hogy a második hatos).'
      }
    ]
  }
};

export const ClassicalProbQuiz: React.FC<ClassicalProbQuizProps> = (props) => {
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
      topicId="g10-stat-megismerheto-veletlen-quiz"
      topicTitle="Klasszikus valószínűség – Megismerhető véletlen"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <ClassicalProbMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <ClassicalProbSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      {...restProps}
    />
  );
};

export default ClassicalProbQuiz;


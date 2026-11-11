import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { PracticalProbMatcher } from './PracticalProbMatcher';
import { PracticalProbSorter } from './PracticalProbSorter';
import {
  VennSetSieveSvg,
  BloodDonorCrossTableSvg,
  QueuePermutationSvg
} from './PracticalProbFigures';

interface PracticalProbQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
  [key: string]: any;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Logikai szita & Venn-diagram',
    description: 'P(A ∪ B) = P(A) + P(B) – P(A ∩ B). Az unió komplementere az „egyik sem” esemény: P(egyik sem) = 1 – P(A ∪ B). Csak az egyik: P(A) + P(B) – 2·P(A ∩ B).',
    note: '36 fős osztály: 6 csak matek, 15 csak töri, 3 mindkettő, 12 egyik sem.',
    color: 'from-rose-500 to-pink-600',
    figure: <VennSetSieveSvg size={200} />
  },
  {
    title: 'Kétdimenziós gyakorisági táblák',
    description: 'Sor- és oszlopösszegek (margók). Egy sor és oszlop uniójánál: P(Sor ∪ Oszlop) = (Sor_összeg + Oszlop_összeg – Közös_cella) / N.',
    note: '346 véradó: 0-s vagy Rh+ donor: (191 + 292 – 161) / 346 = 322 / 346 ≈ 93,1%.',
    color: 'from-blue-500 to-indigo-600',
    figure: <BloodDonorCrossTableSvg size={200} />
  },
  {
    title: 'Sorrendek és egymás utáni belépés',
    description: 'Egymás melletti elemek blokkolása: n személy közül 2 ember egymás után lép be: P = 2 / n. 5 barátnőnél: 2/5 = 40%, nem egymás után: 3/5 = 60%.',
    note: '6 felelőből felelni fogsz (1. vagy 2.): 1/6 + 1/6 = 2/6 = 1/3 (33,3%).',
    color: 'from-purple-500 to-violet-600',
    figure: <QueuePermutationSvg size={200} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Logikai szita, Venn-diagram és osztálystatisztikák',
    subtitle: '10 alapozó feladat a halmazok metszetéről, uniójáról és az emelt tantárgyakról',
    range: '1–10. kérdés',
    focus: 'Logikai szita képlete, 36 fős osztály tantárgyai, unió és komplementer',
    badgeBg: 'bg-rose-100 dark:bg-rose-950/60',
    badgeBorder: 'border-rose-200 dark:border-rose-800',
    badgeText: 'text-rose-800 dark:text-rose-300',
    accentGradient: 'from-rose-500 to-pink-600',
    questions: [
      {
        id: 'ppq1-1',
        level: 1,
        question: 'Mi a logikai szita képlete két tetszőleges esemény (A és B) uniójának valószínűségére?',
        options: [
          'P(A ∪ B) = P(A) + P(B) – P(A ∩ B)',
          'P(A ∪ B) = P(A) + P(B)',
          'P(A ∪ B) = P(A) · P(B)',
          'P(A ∪ B) = P(A) + P(B) + P(A ∩ B)'
        ],
        correctAnswer: 0,
        explanation: 'Mivel az A és B halmazok összeadásakor a közös metszetben lévő elemeket kétszer vennénk számításba, a metszet valószínűségét egyszer le kell vonni.',
        hint: 'A metszetet egyszer le kell vonni az összeadásból.'
      },
      {
        id: 'ppq1-2',
        level: 1,
        question: 'Miért kell a logikai szita képletében levonni a metszet valószínűségét (P(A ∩ B))?',
        options: [
          'Mert az összegben (P(A) + P(B)) a metszet elemeit kétszer számoltuk meg',
          'Mert a metszet mindig lehetetlen esemény',
          'Mert a valószínűség különben negatív lenne',
          'Mert a komplementer szabály így kívánja meg'
        ],
        correctAnswer: 0,
        explanation: 'Az A eseményben is és a B eseményben is benne vannak a közös kimenetelek. Összeadáskor tehát duplán szerepelnek, ezért egyszer le kell őket vonni.',
        hint: 'Hányszor szerepel a közös rész az A + B összegben?'
      },
      {
        id: 'ppq1-3',
        level: 1,
        question: 'Egy 36 fős osztályban 9 diák tanul emelt matekot, 18 emelt törit, és 3 diák mindkettőt. Hányan tanulnak CSAK emelt matematikát?',
        options: [
          '6 fő',
          '9 fő',
          '3 fő',
          '12 fő'
        ],
        correctAnswer: 0,
        explanation: 'A 9 emelt matematikát tanuló diákból 3-an történelmet is tanulnak emelt szinten. Csak matematikát tanul: 9 – 3 = 6 fő.',
        hint: 'Vonjuk ki a mindkét tárgyat tanulókat a matematikások számából: 9 – 3.'
      },
      {
        id: 'ppq1-4',
        level: 1,
        question: 'Ugyanebben a 36 fős osztályban hányan tanulnak CSAK emelt történelmet?',
        options: [
          '15 fő',
          '18 fő',
          '12 fő',
          '21 fő'
        ],
        correctAnswer: 0,
        explanation: 'A 18 emelt történelmesből 3-an matematikát is tanulnak. Csak történelmet tanul: 18 – 3 = 15 fő.',
        hint: '18 – 3.'
      },
      {
        id: 'ppq1-5',
        level: 1,
        question: 'Ugyanebben a 36 fős osztályban hányan tanulnak legalább az egyik tantárgyból emelt szinten?',
        options: [
          '24 fő',
          '27 fő',
          '21 fő',
          '18 fő'
        ],
        correctAnswer: 0,
        explanation: 'Csak matek (6) + csak töri (15) + mindkettő (3) = 24 fő (vagy logikai szitával: 9 + 18 – 3 = 24 fő).',
        hint: '6 + 15 + 3 vagy 9 + 18 – 3.'
      },
      {
        id: 'ppq1-6',
        level: 1,
        question: 'Ugyanebben a 36 fős osztályban mekkora a valószínűsége, hogy egy kiválasztott diák EGYIK tantárgyat sem tanulja emelt szinten?',
        options: [
          '12/36 = 1/3 (kb. 33,3%)',
          '24/36 = 2/3 (kb. 66,7%)',
          '6/36 = 1/6 (kb. 16,7%)',
          '9/36 = 1/4 (25%)'
        ],
        correctAnswer: 0,
        explanation: 'A 36 diákból 24-en tanulnak legalább egy tárgyat emelt szinten. Egyiket sem tanulja: 36 – 24 = 12 fő. Valószínűsége: 12/36 = 1/3.',
        hint: 'Hányan maradtak ki a 24 emeltes diák után a 36-ból?'
      },
      {
        id: 'ppq1-7',
        level: 1,
        question: 'Ugyanebben a 36 fős osztályban mennyi a valószínűsége, hogy a kiválasztott diák MINDKÉT tantárgyat emelt szinten tanulja?',
        options: [
          '3/36 = 1/12 (kb. 8,33%)',
          '1/36 (kb. 2,78%)',
          '9/36 = 1/4 (25%)',
          '6/36 = 1/6 (kb. 16,7%)'
        ],
        correctAnswer: 0,
        explanation: 'Pontosan 3 diák tanulja mindkét tantárgyat a 36-ból: P = 3/36 = 1/12 ≈ 8,33%.',
        hint: '3 diák a 36-ból.'
      },
      {
        id: 'ppq1-8',
        level: 1,
        question: 'Ugyanebben a 36 fős osztályban mennyi a valószínűsége, hogy a kiválasztott diák CSAK AZ EGYIK tárgyat tanulja emelt szinten?',
        options: [
          '21/36 = 7/12 (kb. 58,3%)',
          '24/36 = 2/3 (kb. 66,7%)',
          '15/36 (kb. 41,7%)',
          '18/36 = 0,5 (50%)'
        ],
        correctAnswer: 0,
        explanation: 'Csak matek (6) + csak töri (15) = 21 diák. A valószínűség: 21/36 = 7/12 ≈ 58,3%.',
        hint: 'Add össze a csak matematikát és csak történelmet tanulók számát: 6 + 15.'
      },
      {
        id: 'ppq1-9',
        level: 1,
        question: 'Ha P(A) = 0,6, P(B) = 0,5 és P(A ∩ B) = 0,2, akkor mennyi P(A ∪ B)?',
        options: [
          '0,9 (90%)',
          '1,1',
          '0,7',
          '0,3'
        ],
        correctAnswer: 0,
        explanation: 'A logikai szita szerint: P(A ∪ B) = P(A) + P(B) – P(A ∩ B) = 0,6 + 0,5 – 0,2 = 0,9.',
        hint: '0,6 + 0,5 – 0,2.'
      },
      {
        id: 'ppq1-10',
        level: 1,
        question: 'Az előző feladat adatainál (P(A ∪ B) = 0,9) mennyi a valószínűsége, hogy sem A, sem B nem következik be?',
        options: [
          '0,1 (10%)',
          '0,2 (20%)',
          '0,5 (50%)',
          '0'
        ],
        correctAnswer: 0,
        explanation: 'Az „egyik sem” esemény az unió komplementere: P = 1 – P(A ∪ B) = 1 – 0,9 = 0,1.',
        hint: 'Vond ki 1-ből az unió valószínűségét!'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Ügyfélbiztosítások és kétdimenziós gyakorisági táblák',
    subtitle: '10 számolásos feladat 1000 biztosítási ügyfélről, véradókról és egyetemistákról',
    range: '11–20. kérdés',
    focus: 'Kétdimenziós kereszttáblák, biztosítói logikai szita, orvosi donorstatisztika',
    badgeBg: 'bg-blue-100 dark:bg-blue-950/60',
    badgeBorder: 'border-blue-200 dark:border-blue-800',
    badgeText: 'text-blue-800 dark:text-blue-300',
    accentGradient: 'from-blue-500 to-indigo-600',
    questions: [
      {
        id: 'ppq2-1',
        level: 2,
        question: '1000 biztosítási ügyfél közül 611-nek van gépjármű-, 389-nek lakás-, és 96-nak mindkét biztosítása. Mennyi a valószínűsége, hogy egy ügyfélnek legalább az egyik megvan?',
        options: [
          '904/1000 = 0,904 (90,4%)',
          '1000/1000 = 1',
          '808/1000 = 0,808',
          '96/1000 = 0,096'
        ],
        correctAnswer: 0,
        explanation: 'Logikai szitával: 611 + 389 – 96 = 904 fő. Valószínűsége: 904/1000 = 0,904.',
        hint: '611 + 389 – 96.'
      },
      {
        id: 'ppq2-2',
        level: 2,
        question: 'A fenti 1000 ügyfélből mennyi a valószínűsége, hogy a kiválasztott személy egyik biztosítással sem rendelkezik?',
        options: [
          '96/1000 = 0,096 (9,6%)',
          '904/1000 = 0,904',
          '192/1000 = 0,192',
          '0'
        ],
        correctAnswer: 0,
        explanation: 'Az unió komplementereként: 1000 – 904 = 96 fő. A valószínűség: 96/1000 = 0,096 (9,6%).',
        hint: '1000 – 904 = 96.'
      },
      {
        id: 'ppq2-3',
        level: 2,
        question: 'A fenti 1000 ügyfélből mennyi a valószínűsége, hogy csak az egyik fajta biztosítása van meg (a másik nincs)?',
        options: [
          '808/1000 = 0,808 (80,8%)',
          '904/1000 = 0,904',
          '515/1000 = 0,515',
          '293/1000 = 0,293'
        ],
        correctAnswer: 0,
        explanation: 'Csak gépjármű: 611 – 96 = 515 fő. Csak lakás: 389 – 96 = 293 fő. Összesen: 515 + 293 = 808 fő ⟹ 808/1000 = 0,808.',
        hint: '(611 – 96) + (389 – 96).'
      },
      {
        id: 'ppq2-4',
        level: 2,
        question: 'A véradóközpont 346 donora közül 16 AB-s és 52 B-s vércsoportú. Mennyi a valószínűsége, hogy egy donor AB-s vagy B-s?',
        options: [
          '68/346 ≈ 0,1965 (19,65%)',
          '16/346 ≈ 0,046',
          '52/346 ≈ 0,150',
          '100/346 ≈ 0,289'
        ],
        correctAnswer: 0,
        explanation: 'Mivel egy donor nem lehet egyszerre AB-s és B-s (kizárják egymást), a kedvező esetek összeadódnak: 16 + 52 = 68 fő. P = 68/346 ≈ 19,65%.',
        hint: '16 + 52 = 68.'
      },
      {
        id: 'ppq2-5',
        level: 2,
        question: '346 donor közül 191 0-s, 292 Rh-pozitív, és 161 mindkettő (0-s és Rh+). Mennyi a valószínűsége, hogy a donor 0-s VAGY Rh-pozitív?',
        options: [
          '322/346 ≈ 0,9306 (93,06%)',
          '346/346 = 1',
          '292/346 ≈ 0,844',
          '191/346 ≈ 0,552'
        ],
        correctAnswer: 0,
        explanation: 'Logikai szitával: 191 + 292 – 161 = 322 donor. Valószínűsége: 322/346 ≈ 0,9306.',
        hint: '191 + 292 – 161 = 322.'
      },
      {
        id: 'ppq2-6',
        level: 2,
        question: '346 donor közül hányan NEM AB-sek és NEM Rh-negatívak, ha a táblázatban az Rh-pozitív 0-s (161), A-s (73) és B-s (44) mezők felelnek meg ennek?',
        options: [
          '278/346 ≈ 0,8035 (80,35%)',
          '300/346',
          '200/346',
          '250/346'
        ],
        correctAnswer: 0,
        explanation: 'A feltételnek az Rh-pozitív 0, A és B csoportok felelnek meg: 161 + 73 + 44 = 278 egység. P = 278/346 ≈ 80,35%.',
        hint: '161 + 73 + 44 = 278.'
      },
      {
        id: 'ppq2-7',
        level: 2,
        question: 'Egy egyetem 860 elsőévese közül 312 gazdasági szakos, 452 nő, és a hallgatónők közül 195 gazdasági szakos. Mennyi az esélye, hogy egy hallgató gazdasági szakos nő?',
        options: [
          '195/860 ≈ 0,2267 (22,67%)',
          '312/860 ≈ 0,363',
          '452/860 ≈ 0,526',
          '195/452 ≈ 0,431'
        ],
        correctAnswer: 0,
        explanation: 'A kedvező kimenetel a gazdasági szakos nők száma: k = 195. Az összes elsőéves hallgató száma n = 860: P = 195/860 ≈ 22,67%.',
        hint: '195 a 860-ból.'
      },
      {
        id: 'ppq2-8',
        level: 2,
        question: 'A fenti 860 hallgató közül mekkora a valószínűsége, hogy a kiválasztott diák gazdasági szakos férfi?',
        options: [
          '117/860 ≈ 0,1360 (13,60%)',
          '195/860 ≈ 0,227',
          '312/860 ≈ 0,363',
          '200/860'
        ],
        correctAnswer: 0,
        explanation: 'A 312 gazdasági szakos hallgatóból 195 nő, így a gazdasági szakos férfiak száma: 312 – 195 = 117 fő. P = 117/860 ≈ 13,60%.',
        hint: '312 – 195 = 117.'
      },
      {
        id: 'ppq2-9',
        level: 2,
        question: 'A fenti 860 hallgató közül mekkora a valószínűsége, hogy a kiválasztott diák férfi hallgató?',
        options: [
          '408/860 ≈ 0,4744 (47,44%)',
          '452/860 ≈ 0,526',
          '312/860',
          '0,50'
        ],
        correctAnswer: 0,
        explanation: 'A 860 hallgatóból 452 nő, így a férfiak száma: 860 – 452 = 408 fő. P = 408/860 ≈ 47,44%.',
        hint: '860 – 452 = 408.'
      },
      {
        id: 'ppq2-10',
        level: 2,
        question: 'Egy repülőtér 3 parkolójában 288 autó áll (A: 85, B: 131, C: 87). Mennyi az esélye, hogy az elhajtó autó a B parkolóból jön?',
        options: [
          '131/288 ≈ 0,4549 (45,49%)',
          '85/288 ≈ 0,295',
          '87/288 ≈ 0,302',
          '1/3 (33,3%)'
        ],
        correctAnswer: 0,
        explanation: 'A B parkolóban lévő autók száma 131, az összes autó száma 288: P = 131/288 ≈ 45,49%.',
        hint: '131 a 288-ból.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Sorrendek, permutációk és felelések esélye',
    subtitle: '10 komplex feladat belépési sorrendekről, felelésekről és Poincaré-képletről',
    range: '21–30. kérdés',
    focus: 'Blokkosítási elv, felelés valószínűsége visszatevés nélkül, 3 halmaz szitája',
    badgeBg: 'bg-purple-100 dark:bg-purple-950/60',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    badgeText: 'text-purple-800 dark:text-purple-300',
    accentGradient: 'from-purple-500 to-violet-600',
    questions: [
      {
        id: 'ppq3-1',
        level: 3,
        question: 'Öt barátnő véletlenszerű sorrendben, egyesével lép a terembe, köztük Anna és Kati. Mennyi a valószínűsége, hogy Anna lép be legelsőnek?',
        options: [
          '1/5 = 0,20 (20%)',
          '1/25 = 0,04',
          '2/5 = 0,40',
          '1/120'
        ],
        correctAnswer: 0,
        explanation: 'Mivel az 5 lány szimmetrikus pozícióban van, mindegyikük 1/5 eséllyel léphet be legelsőnek: P = 1/5 = 20%.',
        hint: '5 egyforma esélyű személy közül választhatunk elsőt.'
      },
      {
        id: 'ppq3-2',
        level: 3,
        question: 'Az 5 barátnő belépésekor mekkora a valószínűsége annak, hogy Anna és Kati közvetlenül egymás után lépnek a terembe?',
        options: [
          '2/5 = 0,40 (40%)',
          '1/5 = 0,20',
          '3/5 = 0,60',
          '1/10 = 0,10'
        ],
        correctAnswer: 0,
        explanation: 'Blokkosítással: Annát és Katit 1 blokknak tekintve 4 elem van (4!), a blokkon belül a sorrend 2!. Kedvező esetek: 4! · 2! = 48. Összes eset: 5! = 120. P = 48/120 = 2/5 = 40%.',
        hint: 'Kezeld Annát és Katit egy blokknak! 4! · 2! / 5! = 2/5.'
      },
      {
        id: 'ppq3-3',
        level: 3,
        question: 'Az 5 barátnő belépésekor mekkora a valószínűsége, hogy Anna és Kati NEM közvetlenül egymás után lépnek a terembe?',
        options: [
          '3/5 = 0,60 (60%)',
          '2/5 = 0,40',
          '4/5 = 0,80',
          '1/2 = 0,50'
        ],
        correctAnswer: 0,
        explanation: 'Komplementer eseménnyel: P(nem egymás után) = 1 – P(egymás után) = 1 – 2/5 = 3/5 = 60%.',
        hint: 'Vond ki 1-ből az egymás utáni belépés (2/5) esélyét!'
      },
      {
        id: 'ppq3-4',
        level: 3,
        question: 'Történelemből veled együtt már csak 6-an nem feleltetek. A mai órán 2 embert feleltetnek. Mennyi a valószínűsége, hogy te leszel a legelső felelő?',
        options: [
          '1/6 ≈ 0,1667 (16,67%)',
          '2/6 = 1/3',
          '1/30',
          '1/12'
        ],
        correctAnswer: 0,
        explanation: 'A 6 diák bármelyike egyenlő eséllyel lehet az első kihúzott felelő: P = 1/6.',
        hint: '6 diák közül 1.'
      },
      {
        id: 'ppq3-5',
        level: 3,
        question: 'Ugyanebben a helyzetben (6 diák, 2 felelő) mennyi a valószínűsége, hogy te leszel a MÁSODIK felelő?',
        options: [
          '1/6 ≈ 0,1667 (16,67%)',
          '1/5 = 0,20',
          '1/30',
          '5/36'
        ],
        correctAnswer: 0,
        explanation: 'Annak esélye, hogy az elsőre nem téged szólítanak: 5/6. Ezután a megmaradt 5 diákból 1/5 eséllyel téged választanak: (5/6) · (1/5) = 1/6.',
        hint: '(5/6 esély hogy nem te leszel az 1.) × (1/5 esély hogy te leszel a 2.).'
      },
      {
        id: 'ppq3-6',
        level: 3,
        question: 'Ugyanebben a helyzetben (6 diák, 2 felelő) mennyi a valószínűsége, hogy ma felelni fogsz (vagy 1., vagy 2. felelőként)?',
        options: [
          '2/6 = 1/3 ≈ 0,3333 (33,33%)',
          '1/6',
          '1/2 = 0,50',
          '5/6'
        ],
        correctAnswer: 0,
        explanation: 'Mivel nem lehetsz egyszerre 1. és 2. felelő (kizárják egymást), a két valószínűség összeadódik: 1/6 + 1/6 = 2/6 = 1/3.',
        hint: '1/6 + 1/6 = 2/6.'
      },
      {
        id: 'ppq3-7',
        level: 3,
        question: 'Ugyanebben a helyzetben (6 diák, 2 felelő) mennyi a valószínűsége, hogy a mai órán EGYÁLTALÁN NEM fogsz felelni?',
        options: [
          '4/6 = 2/3 ≈ 0,6667 (66,67%)',
          '1/3',
          '5/6',
          '1/2'
        ],
        correctAnswer: 0,
        explanation: 'Komplementer eseménnyel: P(nem felelsz) = 1 – P(felelsz) = 1 – 1/3 = 2/3 ≈ 66,67%.',
        hint: '1 – 1/3 = 2/3.'
      },
      {
        id: 'ppq3-8',
        level: 3,
        question: '9074 válaszadó közül 1521 kevésbé elégedett, és 779 egyáltalán nem elégedett. Mennyi a valószínűsége, hogy egy válaszadó kevésbé vagy egyáltalán nem elégedett?',
        options: [
          '2300 / 9074 ≈ 0,2535 (25,35%)',
          '1521 / 9074 ≈ 0,168',
          '779 / 9074 ≈ 0,086',
          '0,50'
        ],
        correctAnswer: 0,
        explanation: 'Kedvező esetek száma: 1521 + 779 = 2300 fő. Valószínűsége: 2300 / 9074 ≈ 25,35%.',
        hint: '1521 + 779 = 2300.'
      },
      {
        id: 'ppq3-9',
        level: 3,
        question: 'Ha 8 ember áll sorba a pénztárnál, mekkora annak a valószínűsége, hogy Péter áll legelöl és Zoli leghátul?',
        options: [
          '1 / 56 ≈ 0,0179 (1,79%)',
          '1 / 64',
          '2 / 8 = 1/4',
          '1 / 40320'
        ],
        correctAnswer: 0,
        explanation: 'Péter rögzített (1/8 esély), Zoli rögzített a megmaradt 7 helyből (1/7 esély). A szorzási szabállyal: (1/8) · (1/7) = 1/56 (vagy permutációval: 6! / 8! = 1/56).',
        hint: '(1/8) · (1/7) = 1/56.'
      },
      {
        id: 'ppq3-10',
        level: 3,
        question: 'Hogyan hangzik a logikai szita képlete 3 esemény (A, B, C) uniójára (Poincaré-formula)?',
        options: [
          'P(A) + P(B) + P(C) – P(A ∩ B) – P(A ∩ C) – P(B ∩ C) + P(A ∩ B ∩ C)',
          'P(A) + P(B) + P(C) – P(A ∩ B ∩ C)',
          'P(A) + P(B) + P(C)',
          'P(A) · P(B) · P(C)'
        ],
        correctAnswer: 0,
        explanation: 'Az egyes halmazokat összeadjuk, a páros metszeteket kivonjuk (mert kétszer szerepeltek), és a hármas metszetet visszaadjuk (mert háromszor adtuk hozzá és háromszor vontuk ki).',
        hint: 'Összeadás, páros metszetek kivonása, hármas metszet visszaadása.'
      }
    ]
  }
};

export const PracticalProbQuiz: React.FC<PracticalProbQuizProps> = (props) => {
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
      topicId="g10-stat-valoszinuseg-gyakorlatban-quiz"
      topicTitle="Valószínűség a gyakorlatban"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <PracticalProbMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <PracticalProbSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      {...restProps}
    />
  );
};

export default PracticalProbQuiz;


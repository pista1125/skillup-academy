import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/ProgressBar';
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Trophy,
  Sparkles,
  CheckCircle2,
  XCircle,
  BookOpen,
  Zap,
  ChevronRight,
  Layers,
  LayoutGrid,
  FileQuestion,
  Flame,
  Target,
  Maximize2,
  Minimize2,
  ArrowRightLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Chapter1SummaryMatcher } from './Chapter1SummaryMatcher';
import { Chapter1SummarySorter } from './Chapter1SummarySorter';

export type DifficultyLevel = 1 | 2 | 3;
export type GameMode = 'quiz' | 'matcher' | 'sorter';

export interface QuizQuestion {
  id: string;
  prompt: string;
  highlightValue: string;
  questionTypeBadge: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  breakdown?: { label: string; value: string }[];
}

interface LevelConfig {
  level: DifficultyLevel;
  title: string;
  subtitle: string;
  range: string;
  focus: string;
  color: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  accentGradient: string;
  iconBg: string;
  questions: QuizQuestion[];
}

const CHAPTER1_SUMMARY_CHEAT_SHEET = [
  {
    topic: '1. Római számok',
    formula: 'I=1, V=5, X=10, L=50, C=100, D=500, M=1000',
    note: 'Legfeljebb 3-szor ismétlődhet: I, X, C, M. Nem ismételhető: V, L, D. Balra 1 db kisebb kivonást jelent (IV=4, IX=9, XL=40, XC=90, CD=400, CM=900).'
  },
  {
    topic: '2. Helyiérték & Értékek',
    formula: 'Valódi érték = Alaki érték × Helyiérték',
    note: 'Alaki érték maga a számjegy (0–9), helyiérték a pozíció (egyes, tízes, százas, ezres...), valódi érték a kettő szorzata.'
  },
  {
    topic: '3. Hármas tagolás & Helyesírás',
    formula: '2000-ig egybeírunk, felette kötőjel az osztályok közé',
    note: 'A számokat hátulról hármas csoportokba (osztályokba) tagoljuk szóközzel (pl. 45 820). 2000 felett az osztályok közé kötőjelet teszünk (pl. kétezer-ötszáz).'
  },
  {
    topic: '4. Számrendszerek',
    formula: 'Kettes rendszer: 1, 2, 4, 8, 16, 32... helyiértékek',
    note: 'A kettes rendszerben csak 0 és 1 szerepelhet. Pl. 1011₂ = 1·8 + 0·4 + 1·2 + 1·1 = 11₁₀.'
  },
  {
    topic: '5. Kerekítési szabály',
    formula: '0–4 lefelé, 5–9 felfelé',
    note: 'Mindig a kerekítendő helyiértéktől közvetlenül jobbra lévő jegyet vizsgáljuk. Pl. 4847 tízesre: 4850, százasra: 4800, ezresre: 5000.'
  },
  {
    topic: '6. Négy alapművelet',
    formula: 'Összeg, Különbség, Szorzat, Hányados + Maradék',
    note: 'Osztás ellenőrzése: Osztó × Hányados + Maradék = Osztandó (Maradék < Osztó).'
  },
  {
    topic: '7. Műveleti hierarchia',
    formula: '1. Zárójelek () → 2. ·, : → 3. +, -',
    note: 'Azonos rendű műveleteket balról jobbra haladva végzünk el. Okos számolásnál használhatunk felcserélhetőséget és csoportosíthatóságot.'
  },
  {
    topic: '8. Negatív számok és viszonyok',
    formula: 'Számegyenes: balra kisebb, jobbra nagyobb',
    note: 'Két negatív szám közül az a nagyobb, amelyik közelebb van a 0-hoz (pl. -3 > -10). A 0 nem pozitív és nem negatív.'
  },
  {
    topic: '9. Ellentett & Abszolút érték',
    formula: '|a| ≥ 0 (távolság a 0-tól), a + (-a) = 0',
    note: 'Ellentett: tükörkép a 0-ra (pl. +8 ellentettje -8). Abszolút érték sosem negatív: |-15| = 15, |+15| = 15, |0| = 0.'
  },
  {
    topic: '10. Előjeles műveletek',
    formula: '+(+b)=+b, +(-b)=-b, -(+b)=-b, -(-b)=+b',
    note: 'Két mínusz találkozása pluszra vált (pl. -5 - (-8) = -5 + 8 = +3). Ellentétes előjelűek összeadásánál a nagyobb abszolút értékű előjelét kapjuk.'
  }
];

// LEVEL 1: 30 Questions (Foundational across all 15 topics)
const LEVEL_1_QUESTIONS: QuizQuestion[] = [
  {
    id: 'c1-l1-q1',
    prompt: 'Mennyi a római XVI szám értéke arab számokkal?',
    highlightValue: 'XVI = ?',
    questionTypeBadge: '1. Római számok',
    options: ['14', '16', '21', '26'],
    correctAnswer: '16',
    explanation: 'X = 10, V = 5, I = 1. Összeadva: 10 + 5 + 1 = 16.',
    breakdown: [{ label: 'X + V + I', value: '10 + 5 + 1 = 16' }]
  },
  {
    id: 'c1-l1-q2',
    prompt: 'Melyik római szám jelöli a 9-et?',
    highlightValue: '9 = ?',
    questionTypeBadge: '1. Római számok',
    options: ['VIIII', 'IX', 'XI', 'IV'],
    correctAnswer: 'IX',
    explanation: 'A 9-et a 10-ből 1 kivonásával képezzük: IX (10 - 1 = 9).',
    breakdown: [{ label: 'X - I', value: '10 - 1 = 9 (IX)' }]
  },
  {
    id: 'c1-l1-q3',
    prompt: 'Mi a 7-es számjegy valódi értéke a 47 520 számban?',
    highlightValue: '47 520 → 7-es jegy',
    questionTypeBadge: '2. Helyiérték',
    options: ['7', '700', '7000', '70 000'],
    correctAnswer: '7000',
    explanation: 'A 7-es számjegy az ezresek helyén áll, így a valódi értéke: 7 × 1000 = 7000.',
    breakdown: [{ label: 'Alaki × Helyi', value: '7 × 1000 = 7000' }]
  },
  {
    id: 'c1-l1-q4',
    prompt: 'Mennyi a 0 alaki értéke a 805 számban?',
    highlightValue: '805 → 0-s jegy alaki értéke',
    questionTypeBadge: '2. Helyiérték',
    options: ['0', '10', '100', '80'],
    correctAnswer: '0',
    explanation: 'Bármely számjegy alaki értéke maga a számjegy, tehát a 0 alaki értéke 0.',
    breakdown: [{ label: 'Alaki érték', value: '0' }]
  },
  {
    id: 'c1-l1-q5',
    prompt: 'Melyik a 45832 helyesen tagolt alakja?',
    highlightValue: '45832 tagolása',
    questionTypeBadge: '3. Hármas tagolás',
    options: ['45 832', '4 58 32', '458 32', '4583 2'],
    correctAnswer: '45 832',
    explanation: 'Hátulról indulva 3 jegyenként teszünk szóközt: 45 832.',
    breakdown: [{ label: 'Hátulról hármasával', value: '45 832' }]
  },
  {
    id: 'c1-l1-q6',
    prompt: 'Hogyan írjuk le helyesen betűvel az 1500 számot?',
    highlightValue: '1500 betűvel',
    questionTypeBadge: '4. Helyesírás',
    options: ['ezer-ötszáz', 'ezerötszáz', 'ezer öt száz', 'egy-ezer-ötszáz'],
    correctAnswer: 'ezerötszáz',
    explanation: 'A kétezres szabály szerint 2000-ig minden számnevet egybeírunk: ezerötszáz.',
    breakdown: [{ label: 'Szabály', value: '≤ 2000: egybeírás' }]
  },
  {
    id: 'c1-l1-q7',
    prompt: 'Mennyi a 101₂ kettes számrendszerbeli szám értéke a tízes rendszerben?',
    highlightValue: '101₂ = ?₁₀',
    questionTypeBadge: '5. Számrendszerek',
    options: ['3', '5', '6', '101'],
    correctAnswer: '5',
    explanation: '1·4 + 0·2 + 1·1 = 4 + 0 + 1 = 5.',
    breakdown: [{ label: 'Helyiértékek', value: '1·4 + 0·2 + 1·1 = 5' }]
  },
  {
    id: 'c1-l1-q8',
    prompt: 'Milyen számjegyek szerepelhetnek a kettes számrendszerben?',
    highlightValue: 'Kettes alap',
    questionTypeBadge: '5. Számrendszerek',
    options: ['Csak 0 és 1', '0, 1 és 2', '1 és 2', '0-tól 9-ig bármelyik'],
    correctAnswer: 'Csak 0 és 1',
    explanation: 'A kettes (bináris) számrendszerben csak kétféle számjegy létezik: a 0 és az 1.',
    breakdown: [{ label: 'Alap: 2', value: 'Számjegyek: {0, 1}' }]
  },
  {
    id: 'c1-l1-q9',
    prompt: 'Melyik szám a 489 közvetlen rákövetkező egyes szomszédja?',
    highlightValue: '489 rákövetkezője',
    questionTypeBadge: '6. Számegyenes',
    options: ['488', '490', '499', '500'],
    correctAnswer: '490',
    explanation: 'A rákövetkező egyes szomszéd: 489 + 1 = 490.',
    breakdown: [{ label: 'n + 1', value: '489 + 1 = 490' }]
  },
  {
    id: 'c1-l1-q10',
    prompt: 'Mennyi a 736 tízesre kerekített értéke?',
    highlightValue: '736 ≈ ? (tízesre)',
    questionTypeBadge: '7. Kerekítés',
    options: ['730', '740', '700', '800'],
    correctAnswer: '740',
    explanation: 'A tízes helyiértéktől jobbra a 6-os áll (≥ 5), ezért felfelé kerekítünk: 740.',
    breakdown: [{ label: 'Egyes jegy: 6 ≥ 5', value: '736 → 740' }]
  },
  {
    id: 'c1-l1-q11',
    prompt: 'Mennyi a 2548 százasra kerekített értéke?',
    highlightValue: '2548 ≈ ? (százasra)',
    questionTypeBadge: '7. Kerekítés',
    options: ['2500', '2600', '2550', '3000'],
    correctAnswer: '2500',
    explanation: 'A százas helyiértéktől jobbra a 4-es áll (< 5), ezért lefelé kerekítünk: 2500.',
    breakdown: [{ label: 'Tízes jegy: 4 < 5', value: '2548 → 2500' }]
  },
  {
    id: 'c1-l1-q12',
    prompt: 'Mennyi az összeadás eredménye: 450 + 320?',
    highlightValue: '450 + 320 = ?',
    questionTypeBadge: '8. Összeadás',
    options: ['750', '770', '780', '870'],
    correctAnswer: '770',
    explanation: '400 + 300 = 700, 50 + 20 = 70. Összesen: 770.',
    breakdown: [{ label: 'Összeg', value: '450 + 320 = 770' }]
  },
  {
    id: 'c1-l1-q13',
    prompt: 'Mennyi a kivonás eredménye: 860 - 240?',
    highlightValue: '860 - 240 = ?',
    questionTypeBadge: '9. Kivonás',
    options: ['600', '620', '640', '520'],
    correctAnswer: '620',
    explanation: '800 - 200 = 600, 60 - 40 = 20. Eredmény: 620.',
    breakdown: [{ label: 'Különbség', value: '860 - 240 = 620' }]
  },
  {
    id: 'c1-l1-q14',
    prompt: 'Mennyi a szorzás eredménye: 25 · 4?',
    highlightValue: '25 · 4 = ?',
    questionTypeBadge: '10. Szorzás',
    options: ['75', '100', '125', '150'],
    correctAnswer: '100',
    explanation: '25 négyszerese pontosan 100.',
    breakdown: [{ label: 'Szorzat', value: '25 · 4 = 100' }]
  },
  {
    id: 'c1-l1-q15',
    prompt: 'Mennyi a hányados: 72 : 8?',
    highlightValue: '72 : 8 = ?',
    questionTypeBadge: '11. Osztás',
    options: ['7', '8', '9', '12'],
    correctAnswer: '9',
    explanation: 'Mivel 9 · 8 = 72, a hányados 9.',
    breakdown: [{ label: 'Hányados', value: '72 : 8 = 9' }]
  },
  {
    id: 'c1-l1-q16',
    prompt: 'Mennyi az osztási maradék, ha 29-et osztunk 5-tel?',
    highlightValue: '29 : 5 maradéka = ?',
    questionTypeBadge: '11. Osztás',
    options: ['1', '2', '3', '4'],
    correctAnswer: '4',
    explanation: '29 = 5 · 5 + 4, a maradék tehát 4.',
    breakdown: [{ label: '29 : 5', value: '5, maradék 4' }]
  },
  {
    id: 'c1-l1-q17',
    prompt: 'Melyik műveletet kell először elvégezni: 10 + 5 · 2?',
    highlightValue: '10 + 5 · 2',
    questionTypeBadge: '12. Műveleti sorrend',
    options: ['A szorzást (5 · 2)', 'Az összeadást (10 + 5)', 'Mindegy', 'Balról jobbra olvasva'],
    correctAnswer: 'A szorzást (5 · 2)',
    explanation: 'A szorzás magasabb rendű művelet az összeadásnál, ezért 5 · 2 = 10, majd 10 + 10 = 20.',
    breakdown: [{ label: 'Sorrend', value: '1. Szorzás, 2. Összeadás' }]
  },
  {
    id: 'c1-l1-q18',
    prompt: 'Mennyi az értéke: (10 + 5) · 2?',
    highlightValue: '(10 + 5) · 2 = ?',
    questionTypeBadge: '12. Műveleti sorrend',
    options: ['20', '25', '30', '35'],
    correctAnswer: '30',
    explanation: 'A zárójelben lévő műveletet végezzük el legelőször: 10 + 5 = 15, majd 15 · 2 = 30.',
    breakdown: [{ label: '1. Zárójel', value: '15' }, { label: '2. Szorzás', value: '15 · 2 = 30' }]
  },
  {
    id: 'c1-l1-q19',
    prompt: 'Melyik szám a nagyobb a számegyenesen: -2 vagy -7?',
    highlightValue: '-2 vs -7',
    questionTypeBadge: '13. Negatív számok',
    options: ['-2', '-7', 'Egyenlőek', 'Nem összehasonlíthatóak'],
    correctAnswer: '-2',
    explanation: 'A -2 közelebb van a 0-hoz és jobbrább helyezkedik el, ezért -2 > -7.',
    breakdown: [{ label: 'Számegyenes', value: '-2 > -7' }]
  },
  {
    id: 'c1-l1-q20',
    prompt: 'Hogyan viszonyul a 0 a negatív számokhoz?',
    highlightValue: '0 és negatív számok',
    questionTypeBadge: '13. Negatív számok',
    options: ['A 0 minden negatív számnál nagyobb', 'A 0 minden negatív számnál kisebb', 'A 0 is negatív szám', 'Egyenlőek'],
    correctAnswer: 'A 0 minden negatív számnál nagyobb',
    explanation: 'A 0-tól balra találhatók a negatív számok, így a 0 minden negatív számnál nagyobb.',
    breakdown: [{ label: 'Szabály', value: '0 > bármely negatív szám' }]
  },
  {
    id: 'c1-l1-q21',
    prompt: 'Mennyi a +8 ellentettje?',
    highlightValue: '+8 ellentettje = ?',
    questionTypeBadge: '14. Ellentett',
    options: ['+8', '-8', '0', '1/8'],
    correctAnswer: '-8',
    explanation: 'Egy szám ellentettje a 0-ra vett tükörképe, azaz ellentétes előjelű: -8.',
    breakdown: [{ label: 'Ellentett', value: '+8 → -8' }]
  },
  {
    id: 'c1-l1-q22',
    prompt: 'Mennyi a -12 abszolút értéke: |-12|?',
    highlightValue: '|-12| = ?',
    questionTypeBadge: '14. Abszolút érték',
    options: ['-12', '12', '0', '24'],
    correctAnswer: '12',
    explanation: 'Az abszolút érték a számnak a 0-tól mért távolsága, amely sosem negatív: |-12| = 12.',
    breakdown: [{ label: 'Távolság a 0-tól', value: '|-12| = 12' }]
  },
  {
    id: 'c1-l1-q23',
    prompt: 'Mennyi a 0 ellentettje és abszolút értéke?',
    highlightValue: '0 ellentettje és |0|',
    questionTypeBadge: '14. Ellentett és abszolút érték',
    options: ['Mindkettő 0', 'Ellentettje -0, abszolút értéke +0', 'Nincs ellentettje', '1'],
    correctAnswer: 'Mindkettő 0',
    explanation: 'A 0 ellentettje önmaga (0), és a nullától mért távolsága is 0 (|0| = 0).',
    breakdown: [{ label: '0 tulajdonsága', value: '-0 = 0 és |0| = 0' }]
  },
  {
    id: 'c1-l1-q24',
    prompt: 'Mennyi az eredmény: (+5) + (+7)?',
    highlightValue: '(+5) + (+7) = ?',
    questionTypeBadge: '15. Előjeles összeadás',
    options: ['+2', '+12', '-12', '-2'],
    correctAnswer: '+12',
    explanation: 'Két pozitív szám összege pozitív: 5 + 7 = 12.',
    breakdown: [{ label: 'Összeg', value: '5 + 7 = 12' }]
  },
  {
    id: 'c1-l1-q25',
    prompt: 'Mennyi az eredmény: (-3) + (-4)?',
    highlightValue: '(-3) + (-4) = ?',
    questionTypeBadge: '15. Előjeles összeadás',
    options: ['-1', '+7', '-7', '+1'],
    correctAnswer: '-7',
    explanation: 'Két negatív szám összeadásakor összeadjuk az értékeket és megtartjuk a mínusz jelet: -(3 + 4) = -7.',
    breakdown: [{ label: 'Közös mínusz előjel', value: '-(3 + 4) = -7' }]
  },
  {
    id: 'c1-l1-q26',
    prompt: 'Mennyi az eredmény: (+8) + (-5)?',
    highlightValue: '(+8) + (-5) = ?',
    questionTypeBadge: '15. Előjeles összeadás',
    options: ['+3', '-3', '+13', '-13'],
    correctAnswer: '+3',
    explanation: '8 + (-5) = 8 - 5 = 3.',
    breakdown: [{ label: '8 - 5', value: '+3' }]
  },
  {
    id: 'c1-l1-q27',
    prompt: 'Mennyi az eredmény: (+10) - (+4)?',
    highlightValue: '(+10) - (+4) = ?',
    questionTypeBadge: '15. Előjeles kivonás',
    options: ['+6', '-6', '+14', '-14'],
    correctAnswer: '+6',
    explanation: '10 - 4 = 6.',
    breakdown: [{ label: '10 - 4', value: '+6' }]
  },
  {
    id: 'c1-l1-q28',
    prompt: 'Mennyi az eredmény: 0 - 7?',
    highlightValue: '0 - 7 = ?',
    questionTypeBadge: '15. Előjeles kivonás',
    options: ['+7', '-7', '0', 'Nem lehet elvégezni'],
    correctAnswer: '-7',
    explanation: 'A 0-ból 7-et kivonva 7 egységet lépünk balra a számegyenesen: -7.',
    breakdown: [{ label: 'Balra lépés', value: '0 - 7 = -7' }]
  },
  {
    id: 'c1-l1-q29',
    prompt: 'Mennyi az összege egy számnak és az ellentettjének: (+9) + (-9)?',
    highlightValue: '(+9) + (-9) = ?',
    questionTypeBadge: '15. Egész számok',
    options: ['0', '+18', '-18', '+1'],
    correctAnswer: '0',
    explanation: 'Bármely szám és ellentettjének összege mindig 0: a + (-a) = 0.',
    breakdown: [{ label: 'Azonosság', value: '9 - 9 = 0' }]
  },
  {
    id: 'c1-l1-q30',
    prompt: 'A reggeli -2 °C-ról délre 6 °C-ot emelkedett a hőmérséklet. Hány fok lett délben?',
    highlightValue: '-2 °C + 6 °C = ?',
    questionTypeBadge: '15. Szöveges feladat',
    options: ['-8 °C', '+4 °C', '+8 °C', '-4 °C'],
    correctAnswer: '+4 °C',
    explanation: '-2 + 6 = 4 °C.',
    breakdown: [{ label: 'Emelkedés', value: '-2 + 6 = +4 °C' }]
  }
];

// LEVEL 2: 30 Questions (Standard Curriculum Level)
const LEVEL_2_QUESTIONS: QuizQuestion[] = [
  {
    id: 'c1-l2-q1',
    prompt: 'Mennyi a római XLIX szám értéke arab számmal?',
    highlightValue: 'XLIX = ?',
    questionTypeBadge: '1. Római számok',
    options: ['49', '59', '69', '44'],
    correctAnswer: '49',
    explanation: 'XL = 40 (50 - 10), IX = 9 (10 - 1). Összesen: 40 + 9 = 49.',
    breakdown: [{ label: 'XL + IX', value: '40 + 9 = 49' }]
  },
  {
    id: 'c1-l2-q2',
    prompt: 'Hogyan írjuk le római számmal a 99-et?',
    highlightValue: '99 = ? római számmal',
    questionTypeBadge: '1. Római számok',
    options: ['IC', 'XCIX', 'LXXXXVIIII', 'CXI'],
    correctAnswer: 'XCIX',
    explanation: 'A rómaiaknál I csak V-ből és X-ből vonható ki. Ezért 90 + 9 = XC + IX = XCIX.',
    breakdown: [{ label: '90 + 9', value: 'XC + IX = XCIX' }]
  },
  {
    id: 'c1-l2-q3',
    prompt: 'Hány tízezres van a 348 912 számban?',
    highlightValue: '348 912 tízezres jegye',
    questionTypeBadge: '2. Helyiérték',
    options: ['3', '4', '8', '40'],
    correctAnswer: '4',
    explanation: 'A tízezresek helyén a 4-es számjegy áll (valódi értéke 40 000).',
    breakdown: [{ label: 'Tízezresek helye', value: '4 (értéke: 40 000)' }]
  },
  {
    id: 'c1-l2-q4',
    prompt: 'Melyik az a szám, amely 5 százasból, 3 tízesből és 8 egyesből áll?',
    highlightValue: '5 Sz + 3 T + 8 E = ?',
    questionTypeBadge: '2. Helyiérték',
    options: ['538', '5380', '835', '5038'],
    correctAnswer: '538',
    explanation: '5 · 100 + 3 · 10 + 8 · 1 = 500 + 30 + 8 = 538.',
    breakdown: [{ label: 'Összegzés', value: '500 + 30 + 8 = 538' }]
  },
  {
    id: 'c1-l2-q5',
    prompt: 'Hány osztályból áll a 124 560 789 szám?',
    highlightValue: '124 560 789 osztályai',
    questionTypeBadge: '3. Hármas tagolás',
    options: ['2', '3', '4', '9'],
    correctAnswer: '3',
    explanation: '3 osztályból áll: egyesek osztálya (789), ezresek osztálya (560), milliók osztálya (124).',
    breakdown: [{ label: '3 osztály', value: 'Milliók, Ezresek, Egyesek' }]
  },
  {
    id: 'c1-l2-q6',
    prompt: 'Hogyan írjuk le helyesen betűvel a 2500 számot?',
    highlightValue: '2500 betűvel',
    questionTypeBadge: '4. Helyesírás',
    options: ['kétezerötszáz', 'kétezer-ötszáz', 'két-ezer-ötszáz', 'két ezer ötszáz'],
    correctAnswer: 'kétezer-ötszáz',
    explanation: 'Mivel 2000-nél nagyobb összetett szám, a kerek ezres és a százas közé kötőjel kerül: kétezer-ötszáz.',
    breakdown: [{ label: '> 2000 szabály', value: 'kétezer-ötszáz' }]
  },
  {
    id: 'c1-l2-q7',
    prompt: 'Mennyi az 1101₂ kettes számnak az értéke a tízes számrendszerben?',
    highlightValue: '1101₂ = ?₁₀',
    questionTypeBadge: '5. Számrendszerek',
    options: ['11', '13', '15', '26'],
    correctAnswer: '13',
    explanation: '1·8 + 1·4 + 0·2 + 1·1 = 8 + 4 + 0 + 1 = 13.',
    breakdown: [{ label: 'Bináris bontás', value: '8 + 4 + 0 + 1 = 13' }]
  },
  {
    id: 'c1-l2-q8',
    prompt: 'Hogyan írjuk fel a 10-et kettes számrendszerben?',
    highlightValue: '10₁₀ = ?₂',
    questionTypeBadge: '5. Számrendszerek',
    options: ['1010₂', '1100₂', '1001₂', '1110₂'],
    correctAnswer: '1010₂',
    explanation: '10 = 1·8 + 0·4 + 1·2 + 0·1 → 1010₂.',
    breakdown: [{ label: '10 = 8 + 2', value: '1010₂' }]
  },
  {
    id: 'c1-l2-q9',
    prompt: 'Melyik a 6780 szám legközelebbi százas szomszédai közül a kisebbik (alsó szomszéd)?',
    highlightValue: '6780 alsó százas szomszédja',
    questionTypeBadge: '6. Számegyenes',
    options: ['6700', '6770', '6800', '6000'],
    correctAnswer: '6700',
    explanation: 'A 6780 előtti legközelebbi kerek százas a 6700 (a felső pedig a 6800).',
    breakdown: [{ label: 'Alsó százas', value: '6700' }]
  },
  {
    id: 'c1-l2-q10',
    prompt: 'Mennyi a 49 512 tízezresre kerekített értéke?',
    highlightValue: '49 512 ≈ ? (tízezresre)',
    questionTypeBadge: '7. Kerekítés',
    options: ['40 000', '50 000', '49 000', '55 000'],
    correctAnswer: '50 000',
    explanation: 'A tízezres helyiértéktől jobbra az ezresek helyén 9 áll (≥ 5), így felfelé kerekítünk: 50 000.',
    breakdown: [{ label: 'Ezres jegy: 9 ≥ 5', value: '49 512 → 50 000' }]
  },
  {
    id: 'c1-l2-q11',
    prompt: 'Melyik az a legkisebb természetes szám, amely tízesre kerekítve 80-at ad?',
    highlightValue: '? ≈ 80 (tízesre, legkisebb)',
    questionTypeBadge: '7. Kerekítés',
    options: ['74', '75', '79', '84'],
    correctAnswer: '75',
    explanation: 'A 75 a legkisebb szám, amelynek egyes helyiértékén 5 áll, így már felfelé 80-ra kerekedik.',
    breakdown: [{ label: '75-től 84-ig', value: 'Legkisebb: 75' }]
  },
  {
    id: 'c1-l2-q12',
    prompt: 'Mennyi az írásbeli összeadás eredménye: 3478 + 2854?',
    highlightValue: '3478 + 2854 = ?',
    questionTypeBadge: '8. Összeadás',
    options: ['6222', '6332', '6322', '5332'],
    correctAnswer: '6332',
    explanation: '8+4=12 (marad 1), 7+5+1=13 (marad 1), 4+8+1=13 (marad 1), 3+2+1=6 → 6332.',
    breakdown: [{ label: 'Összeg', value: '6332' }]
  },
  {
    id: 'c1-l2-q13',
    prompt: 'Mennyi a kivonás eredménye: 5000 - 1345?',
    highlightValue: '5000 - 1345 = ?',
    questionTypeBadge: '9. Kivonás',
    options: ['3655', '3665', '3755', '4655'],
    correctAnswer: '3655',
    explanation: '5000 - 1000 = 4000, 4000 - 300 = 3700, 3700 - 45 = 3655.',
    breakdown: [{ label: 'Különbség', value: '3655' }]
  },
  {
    id: 'c1-l2-q14',
    prompt: 'Mennyi a szorzás eredménye: 125 · 8?',
    highlightValue: '125 · 8 = ?',
    questionTypeBadge: '10. Szorzás',
    options: ['900', '1000', '1025', '1250'],
    correctAnswer: '1000',
    explanation: '125 · 8 = 1000 (nevezetes szorzat: 125 · 8 = 1000).',
    breakdown: [{ label: 'Nevezetes szorzat', value: '125 · 8 = 1000' }]
  },
  {
    id: 'c1-l2-q15',
    prompt: 'Mennyi a hányados és maradék: 158 : 12?',
    highlightValue: '158 : 12 = ?',
    questionTypeBadge: '11. Osztás',
    options: ['13, maradék 2', '12, maradék 14', '13, maradék 5', '14, maradék 0'],
    correctAnswer: '13, maradék 2',
    explanation: '13 · 12 = 156, és 158 - 156 = 2. Tehát a hányados 13, a maradék 2.',
    breakdown: [{ label: '13 · 12 + 2', value: '156 + 2 = 158' }]
  },
  {
    id: 'c1-l2-q16',
    prompt: 'Egy osztásnál az osztó 15, a hányados 8, a maradék 7. Mennyi volt az osztandó?',
    highlightValue: 'Osztandó = 15 · 8 + 7 = ?',
    questionTypeBadge: '11. Osztás ellenőrzése',
    options: ['120', '127', '135', '140'],
    correctAnswer: '127',
    explanation: 'Osztó · Hányados + Maradék = 15 · 8 + 7 = 120 + 7 = 127.',
    breakdown: [{ label: '15 · 8 + 7', value: '120 + 7 = 127' }]
  },
  {
    id: 'c1-l2-q17',
    prompt: 'Mennyi a kifejezés pontos értéke: 50 - 4 · (6 + 3)?',
    highlightValue: '50 - 4 · (6 + 3) = ?',
    questionTypeBadge: '12. Műveleti sorrend',
    options: ['14', '414', '36', '42'],
    correctAnswer: '14',
    explanation: '1. Zárójel: 6 + 3 = 9. 2. Szorzás: 4 · 9 = 36. 3. Kivonás: 50 - 36 = 14.',
    breakdown: [{ label: '1. Zárójel', value: '9' }, { label: '2. Szorzás', value: '4 · 9 = 36' }, { label: '3. Kivonás', value: '50 - 36 = 14' }]
  },
  {
    id: 'c1-l2-q18',
    prompt: 'Melyik azonosság fejezi ki a szorzás disztributivitását (széttagolhatóságát)?',
    highlightValue: 'Disztributivitás',
    questionTypeBadge: '12. Műveleti tulajdonságok',
    options: ['a · (b + c) = a · b + a · c', 'a + b = b + a', '(a + b) + c = a + (b + c)', 'a · 1 = a'],
    correctAnswer: 'a · (b + c) = a · b + a · c',
    explanation: 'A disztributivitás a szorzás tagonkénti elvégzését (vagy a közös szorzó kiemelését) jelenti.',
    breakdown: [{ label: 'Széttagolás', value: 'a · (b + c) = a·b + a·c' }]
  },
  {
    id: 'c1-l2-q19',
    prompt: 'Melyik számpár között van a -4 a számegyenesen?',
    highlightValue: '-4 szomszédai',
    questionTypeBadge: '13. Negatív számok',
    options: ['-5 és -3', '-4 és -2', '-3 és -1', '-6 és -5'],
    correctAnswer: '-5 és -3',
    explanation: 'A számegyenesen balról jobbra haladva: -5, -4, -3. Tehát -5 < -4 < -3.',
    breakdown: [{ label: 'Rendezés', value: '-5 < -4 < -3' }]
  },
  {
    id: 'c1-l2-q20',
    prompt: 'Hány egész szám található a -3 és +3 között (a határokat nem beleszámítva)?',
    highlightValue: '-3 < x < +3 egész megoldásai',
    questionTypeBadge: '13. Egész számok',
    options: ['4', '5', '6', '7'],
    correctAnswer: '5',
    explanation: 'A megoldások: -2, -1, 0, +1, +2. Ez összesen 5 darab egész szám.',
    breakdown: [{ label: 'Halmaz', value: '{-2, -1, 0, 1, 2} → 5 db' }]
  },
  {
    id: 'c1-l2-q21',
    prompt: 'Mennyi a kifejezés értéke: |-25| - |+15|?',
    highlightValue: '|-25| - |+15| = ?',
    questionTypeBadge: '14. Abszolút érték',
    options: ['-40', '+10', '-10', '+40'],
    correctAnswer: '+10',
    explanation: '|-25| = 25, |+15| = 15. Különbség: 25 - 15 = 10.',
    breakdown: [{ label: '25 - 15', value: '+10' }]
  },
  {
    id: 'c1-l2-q22',
    prompt: 'Mely egész számokra igaz, hogy |x| = 7?',
    highlightValue: '|x| = 7',
    questionTypeBadge: '14. Abszolút érték egyenlet',
    options: ['Csak a +7', 'Csak a -7', '-7 és +7', '0 és 7'],
    correctAnswer: '-7 és +7',
    explanation: 'A 0-tól pontosan 7 egység távolságra két szám van: a -7 és a +7.',
    breakdown: [{ label: 'Két megoldás', value: 'x = 7 vagy x = -7' }]
  },
  {
    id: 'c1-l2-q23',
    prompt: 'Mennyi az ellentettje a -(+14) kifejezésnek?',
    highlightValue: '-(+14) ellentettje',
    questionTypeBadge: '14. Ellentett',
    options: ['-14', '+14', '0', '-28'],
    correctAnswer: '+14',
    explanation: 'A kifejezés értéke -(+14) = -14. Ennek az ellentettje +14.',
    breakdown: [{ label: '-14 ellentettje', value: '+14' }]
  },
  {
    id: 'c1-l2-q24',
    prompt: 'Mennyi a művelet eredménye: (-15) + (+25)?',
    highlightValue: '(-15) + (+25) = ?',
    questionTypeBadge: '15. Előjeles összeadás',
    options: ['-40', '+10', '-10', '+40'],
    correctAnswer: '+10',
    explanation: '25 - 15 = 10 (a pozitív tag abszolút értéke nagyobb).',
    breakdown: [{ label: '25 - 15', value: '+10' }]
  },
  {
    id: 'c1-l2-q25',
    prompt: 'Mennyi a művelet eredménye: (-18) + (-12)?',
    highlightValue: '(-18) + (-12) = ?',
    questionTypeBadge: '15. Előjeles összeadás',
    options: ['-30', '+30', '-6', '+6'],
    correctAnswer: '-30',
    explanation: 'Azonos előjelű negatívok összege negatív: -(18 + 12) = -30.',
    breakdown: [{ label: '-(18 + 12)', value: '-30' }]
  },
  {
    id: 'c1-l2-q26',
    prompt: 'Mennyi az eredmény: (-8) - (-14)?',
    highlightValue: '(-8) - (-14) = ?',
    questionTypeBadge: '15. Előjeles kivonás',
    options: ['-22', '+6', '-6', '+22'],
    correctAnswer: '+6',
    explanation: 'A két mínusz pluszra vált: -8 + 14 = +6.',
    breakdown: [{ label: '-8 + 14', value: '+6' }]
  },
  {
    id: 'c1-l2-q27',
    prompt: 'Mennyi az eredmény: (-20) - (+15)?',
    highlightValue: '(-20) - (+15) = ?',
    questionTypeBadge: '15. Előjeles kivonás',
    options: ['-5', '+5', '-35', '+35'],
    correctAnswer: '-35',
    explanation: '-20 - 15 = -35 (tartozás 20-ról még 15-tel nő).',
    breakdown: [{ label: '-20 - 15', value: '-35' }]
  },
  {
    id: 'c1-l2-q28',
    prompt: 'Melyik szám hiányzik az egyenletből: x + (-7) = -2?',
    highlightValue: 'x + (-7) = -2 → x = ?',
    questionTypeBadge: '15. Előjeles egyenlet',
    options: ['-9', '+5', '-5', '+9'],
    correctAnswer: '+5',
    explanation: 'x - 7 = -2 → x = -2 + 7 = 5. Ellenőrzés: 5 + (-7) = -2.',
    breakdown: [{ label: 'Megoldás', value: 'x = -2 + 7 = +5' }]
  },
  {
    id: 'c1-l2-q29',
    prompt: 'Mennyi a három tagú összeg értéke: (-10) + (+15) + (-8)?',
    highlightValue: '(-10) + (+15) + (-8) = ?',
    questionTypeBadge: '15. Összetett előjeles művelet',
    options: ['-3', '+3', '-13', '+17'],
    correctAnswer: '-3',
    explanation: 'Negatívak összege: (-10) + (-8) = -18. Majd: -18 + 15 = -3.',
    breakdown: [{ label: '1. Negatívok', value: '-18' }, { label: '2. +15', value: '-18 + 15 = -3' }]
  },
  {
    id: 'c1-l2-q30',
    prompt: 'Egy tengeralattjáró -150 méteren tartózkodott, majd lemerült még 80 métert. Hány méteren van most?',
    highlightValue: '-150 m - 80 m = ?',
    questionTypeBadge: '15. Szöveges feladat',
    options: ['-70 m', '-230 m', '+230 m', '-170 m'],
    correctAnswer: '-230 m',
    explanation: '-150 - 80 = -230 méter mélységben.',
    breakdown: [{ label: 'Mélység', value: '-150 - 80 = -230 m' }]
  }
];

// LEVEL 3: 30 Questions (Advanced / Competition / Exam prep)
const LEVEL_3_QUESTIONS: QuizQuestion[] = [
  {
    id: 'c1-l3-q1',
    prompt: 'Mennyi a római CMXCIX szám arab megfelelője?',
    highlightValue: 'CMXCIX = ?',
    questionTypeBadge: '1. Római számok',
    options: ['999', '1099', '949', '899'],
    correctAnswer: '999',
    explanation: 'CM = 900, XC = 90, IX = 9. Összesen: 900 + 90 + 9 = 999.',
    breakdown: [{ label: 'CM + XC + IX', value: '900 + 90 + 9 = 999' }]
  },
  {
    id: 'c1-l3-q2',
    prompt: 'Hogyan írjuk le római számmal a 2026-os évszámot?',
    highlightValue: '2026 = ? római számmal',
    questionTypeBadge: '1. Római számok',
    options: ['MMXXVI', 'MMXVI', 'MMLXVI', 'MXMXXVI'],
    correctAnswer: 'MMXXVI',
    explanation: '2000 = MM, 20 = XX, 6 = VI. Együtt: MMXXVI.',
    breakdown: [{ label: '2000 + 20 + 6', value: 'MM + XX + VI = MMXXVI' }]
  },
  {
    id: 'c1-l3-q3',
    prompt: 'Egy hatjegyű szám minden számjegye különböző, és a legkisebb ilyen természetes szám. Mennyi a tízesek helyén álló jegy értéke?',
    highlightValue: 'Legkisebb különböző jegyű 6 jegyű szám',
    questionTypeBadge: '2. Helyiérték fejtörő',
    options: ['3', '4', '5', '0'],
    correctAnswer: '4',
    explanation: 'A legkisebb ilyen szám: 102 345. A tízesek helyén a 4-es számjegy áll.',
    breakdown: [{ label: 'Szám: 102 345', value: 'Tízes hely: 4' }]
  },
  {
    id: 'c1-l3-q4',
    prompt: 'Hányszorosára nő egy kétjegyű szám értéke, ha a végére írunk egy 0-t?',
    highlightValue: 'Szám végére 0 írása',
    questionTypeBadge: '2. Helyiértékes eltolódás',
    options: ['10-szeresére', '100-szorosára', '10-zel nő', '2-szeresére'],
    correctAnswer: '10-szeresére',
    explanation: 'A végére írt 0 minden meglévő számjegyet eggyel magasabb helyiértékre tol el, így a szám pontosan 10-szeresére nő.',
    breakdown: [{ label: 'Példa: 25 → 250', value: '25 · 10 = 250' }]
  },
  {
    id: 'c1-l3-q5',
    prompt: 'Hány nullát tartalmaz a „négymillió-ötezer-kettő” szám leírva számjegyekkel?',
    highlightValue: '4 005 002 nullái',
    questionTypeBadge: '3. Hármas tagolás',
    options: ['3', '4', '5', '6'],
    correctAnswer: '4',
    explanation: 'Számjegyekkel: 4 005 002. A szám pontosan 4 darab nullát tartalmaz.',
    breakdown: [{ label: '4 005 002', value: '4 db nulla van benne' }]
  },
  {
    id: 'c1-l3-q6',
    prompt: 'Melyik szám helyesírása HIBÁS az alábbiak közül?',
    highlightValue: 'Helyesírási hiba keresése',
    questionTypeBadge: '4. Helyesírás',
    options: ['kétezer-ötven', 'háromezer-ötszáz', 'ezer-nyolcszáz', 'ötezer-hatszázhuszonkettő'],
    correctAnswer: 'ezer-nyolcszáz',
    explanation: 'Az 1800 ≤ 2000, ezért kötőjel nélkül, egybe kell írni: ezernyolcszáz!',
    breakdown: [{ label: 'Hiba', value: '1800 = ezernyolcszáz (egybe!)' }]
  },
  {
    id: 'c1-l3-q7',
    prompt: 'Mennyi a kettes számrendszerbeli 11111₂ szám értéke tízes rendszerben?',
    highlightValue: '11111₂ = ?₁₀',
    questionTypeBadge: '5. Számrendszerek',
    options: ['15', '31', '32', '63'],
    correctAnswer: '31',
    explanation: '16 + 8 + 4 + 2 + 1 = 31 (vagy 2⁵ - 1 = 32 - 1 = 31).',
    breakdown: [{ label: '16 + 8 + 4 + 2 + 1', value: '31' }]
  },
  {
    id: 'c1-l3-q8',
    prompt: 'Hány jegyű a 64 a kettes számrendszerben?',
    highlightValue: '64₁₀ = ?₂ jegyeinek száma',
    questionTypeBadge: '5. Számrendszerek',
    options: ['6 jegyű', '7 jegyű', '8 jegyű', '5 jegyű'],
    correctAnswer: '7 jegyű',
    explanation: '64 = 2⁶ = 1000000₂, ami pontosan 7 jegyből (egy 1-es és hat 0) áll.',
    breakdown: [{ label: '64 = 1000000₂', value: '7 számjegy' }]
  },
  {
    id: 'c1-l3-q9',
    prompt: 'Hány olyan kétjegyű egész szám van, amelynek a tízesek helyén álló jegye nagyobb, mint az egyesek helyén álló jegye?',
    highlightValue: 'T > E kétjegyű számok száma',
    questionTypeBadge: '6. Kombinatorika & Számegyenes',
    options: ['36', '45', '50', '55'],
    correctAnswer: '45',
    explanation: 'Tízes jegy: 1 (1 db), 2 (2 db), ..., 9 (9 db). Összeg: 1 + 2 + 3 + ... + 9 = 45 darab.',
    breakdown: [{ label: '1 + 2 + ... + 9', value: '45 darab' }]
  },
  {
    id: 'c1-l3-q10',
    prompt: 'Egy számot százasra kerekítve 4500-at kaptunk. Milyen tág intervallumba eshetett az eredeti szám?',
    highlightValue: 'x ≈ 4500 (százasra)',
    questionTypeBadge: '7. Kerekítési tartomány',
    options: ['4450 ≤ x ≤ 4549', '4400 ≤ x ≤ 4600', '4451 ≤ x ≤ 4550', '4490 ≤ x ≤ 4510'],
    correctAnswer: '4450 ≤ x ≤ 4549',
    explanation: 'A 4450-től (felfelé kerekítve) a 4549-ig (lefelé kerekítve) minden szám százasra kerekített értéke 4500.',
    breakdown: [{ label: 'Kerekítési sáv', value: '4450-től 4549-ig' }]
  },
  {
    id: 'c1-l3-q11',
    prompt: 'Mennyi a legnagyobb és legkisebb olyan szám különbsége, amely ezresre kerekítve 8000?',
    highlightValue: 'Max(x) - Min(x), ahol x ≈ 8000 (ezresre)',
    questionTypeBadge: '7. Kerekítési határok',
    options: ['999', '1000', '900', '499'],
    correctAnswer: '999',
    explanation: 'A legkisebb: 7500, a legnagyobb: 8499. Különbségük: 8499 - 7500 = 999.',
    breakdown: [{ label: '8499 - 7500', value: '999' }]
  },
  {
    id: 'c1-l3-q12',
    prompt: 'Mennyi a szorzat: 45 · 99 okosan kiszámolva?',
    highlightValue: '45 · 99 = ? (okos számolás)',
    questionTypeBadge: '10. Okos szorzás',
    options: ['4455', '4445', '4555', '4355'],
    correctAnswer: '4455',
    explanation: '45 · (100 - 1) = 4500 - 45 = 4455.',
    breakdown: [{ label: '4500 - 45', value: '4455' }]
  },
  {
    id: 'c1-l3-q13',
    prompt: 'Mennyi az írásbeli szorzás eredménye: 342 · 28?',
    highlightValue: '342 · 28 = ?',
    questionTypeBadge: '10. Kétjegyű szorzás',
    options: ['9576', '9476', '8576', '9676'],
    correctAnswer: '9576',
    explanation: '342 · 20 = 6840, 342 · 8 = 2736. Összegük: 6840 + 2736 = 9576.',
    breakdown: [{ label: '6840 + 2736', value: '9576' }]
  },
  {
    id: 'c1-l3-q14',
    prompt: 'Mennyi a hányados és maradék: 7425 : 24?',
    highlightValue: '7425 : 24 = ?',
    questionTypeBadge: '11. Kétjegyű osztás',
    options: ['309, maradék 9', '308, maradék 15', '310, maradék 0', '309, maradék 3'],
    correctAnswer: '309, maradék 9',
    explanation: '309 · 24 = 7416, 7425 - 7416 = 9 maradék.',
    breakdown: [{ label: '309 · 24 + 9', value: '7416 + 9 = 7425' }]
  },
  {
    id: 'c1-l3-q15',
    prompt: 'Mennyi az értéke: 100 - [40 - (15 - 5) · 2] : 4?',
    highlightValue: '100 - [40 - (15 - 5) · 2] : 4 = ?',
    questionTypeBadge: '12. Többszörös zárójel',
    options: ['95', '90', '85', '105'],
    correctAnswer: '95',
    explanation: '1. Belső kerek: 15 - 5 = 10. 2. Szorzás: 10 · 2 = 20. 3. Szögletes: 40 - 20 = 20. 4. Osztás: 20 : 4 = 5. 5. Kivonás: 100 - 5 = 95.',
    breakdown: [{ label: 'Zárójelek', value: '20' }, { label: '20 : 4 = 5', value: '100 - 5 = 95' }]
  },
  {
    id: 'c1-l3-q16',
    prompt: 'Mennyi az értéke: 37 · 48 + 37 · 52?',
    highlightValue: '37 · 48 + 37 · 52 = ?',
    questionTypeBadge: '12. Kiemelés',
    options: ['370', '3700', '37 000', '3500'],
    correctAnswer: '3700',
    explanation: 'Közös tényező kiemelése: 37 · (48 + 52) = 37 · 100 = 3700.',
    breakdown: [{ label: '37 · 100', value: '3700' }]
  },
  {
    id: 'c1-l3-q17',
    prompt: 'Melyik számegyenes-tulajdonság NEM igaz?',
    highlightValue: 'Számegyenes állítások',
    questionTypeBadge: '13. Negatív számok',
    options: [
      'Bármely negatív szám abszolút értéke kisebb, mint maga a szám',
      'A negatív számok a nullától balra találhatók',
      'Két negatív szám közül a nagyobbik közelebb van a 0-hoz',
      'A pozitív számok mindig nagyobbak a negatívoknál'
    ],
    correctAnswer: 'Bármely negatív szám abszolút értéke kisebb, mint maga a szám',
    explanation: 'A negatív szám abszolút értéke pozitív, ezért mindig NAGYOBB, mint maga a negatív szám (pl. |-5| = 5 > -5).',
    breakdown: [{ label: 'Hamis állítás', value: '|-5| = 5 > -5' }]
  },
  {
    id: 'c1-l3-q18',
    prompt: 'Hány egész szám megoldása van az alábbi egyenlőtlenségnek: |x| < 4?',
    highlightValue: '|x| < 4 egész megoldásai',
    questionTypeBadge: '14. Abszolút érték egyenlőtlenség',
    options: ['7', '8', '6', '3'],
    correctAnswer: '7',
    explanation: 'A megoldások: -3, -2, -1, 0, 1, 2, 3. Ez összesen 7 darab egész szám.',
    breakdown: [{ label: '{-3, -2, -1, 0, 1, 2, 3}', value: '7 db' }]
  },
  {
    id: 'c1-l3-q19',
    prompt: 'Mennyi a kifejezés értéke: -|-18| + |-(+12)|?',
    highlightValue: '-|-18| + |-(+12)| = ?',
    questionTypeBadge: '14. Abszolút érték kombináció',
    options: ['-6', '+6', '-30', '+30'],
    correctAnswer: '-6',
    explanation: '|-18| = 18 → -18. |-(+12)| = |-12| = 12. Eredmény: -18 + 12 = -6.',
    breakdown: [{ label: '-18 + 12', value: '-6' }]
  },
  {
    id: 'c1-l3-q20',
    prompt: 'Mennyi a kifejezés értéke: (-45) - (-30) + (-15) - (+20)?',
    highlightValue: '(-45) - (-30) + (-15) - (+20) = ?',
    questionTypeBadge: '15. Többtagú előjeles művelet',
    options: ['-50', '-10', '+10', '-70'],
    correctAnswer: '-50',
    explanation: '-45 + 30 - 15 - 20 = -15 - 15 - 20 = -30 - 20 = -50.',
    breakdown: [{ label: 'Lépések', value: '-45 + 30 - 15 - 20 = -50' }]
  },
  {
    id: 'c1-l3-q21',
    prompt: 'Melyik szám teszi igazzá az egyenlőséget: -18 - x = +5?',
    highlightValue: '-18 - x = 5 → x = ?',
    questionTypeBadge: '15. Előjeles egyenlet',
    options: ['-23', '+23', '-13', '+13'],
    correctAnswer: '-23',
    explanation: '-18 - 5 = x → x = -23. Ellenőrzés: -18 - (-23) = -18 + 23 = +5.',
    breakdown: [{ label: 'Megoldás', value: 'x = -23' }]
  },
  {
    id: 'c1-l3-q22',
    prompt: 'Ha a = -8 és b = +5, mennyi a - b - |a + b| értéke?',
    highlightValue: 'a = -8, b = 5 → a - b - |a + b|',
    questionTypeBadge: '15. Algebrai behelyettesítés',
    options: ['-16', '-10', '-13', '-18'],
    correctAnswer: '-16',
    explanation: 'a - b = -8 - 5 = -13. a + b = -8 + 5 = -3 → |-3| = 3. Eredmény: -13 - 3 = -16.',
    breakdown: [{ label: '1. a - b', value: '-13' }, { label: '2. |a + b|', value: '3' }, { label: '3. -13 - 3', value: '-16' }]
  },
  {
    id: 'c1-l3-q23',
    prompt: 'Egy számlán -45 000 Ft egyenleg volt. Először jóváírtak 80 000 Ft-ot, majd levontak 60 000 Ft törlesztőt. Mennyi lett az új egyenleg?',
    highlightValue: '-45 000 + 80 000 - 60 000 = ?',
    questionTypeBadge: '15. Pénzügyi szöveges feladat',
    options: ['-25 000 Ft', '+25 000 Ft', '-35 000 Ft', '+35 000 Ft'],
    correctAnswer: '-25 000 Ft',
    explanation: '-45 000 + 80 000 = +35 000 Ft. Majd 35 000 - 60 000 = -25 000 Ft tartozás.',
    breakdown: [{ label: 'Egyenleg', value: '-25 000 Ft' }]
  },
  {
    id: 'c1-l3-q24',
    prompt: 'Mennyi az első 10 pozitív páros szám összege okos Gauss-módszerrel?',
    highlightValue: '2 + 4 + 6 + ... + 20 = ?',
    questionTypeBadge: '8. Sorozat összege',
    options: ['100', '110', '120', '210'],
    correctAnswer: '110',
    explanation: 'Párokba állítva: (2+20) + (4+18) + (6+16) + (8+14) + (10+12) = 5 · 22 = 110.',
    breakdown: [{ label: '5 · 22', value: '110' }]
  },
  {
    id: 'c1-l3-q25',
    prompt: 'Egy téglalap kerülete 48 cm, egyik oldala 14 cm. Mennyi a téglalap területe?',
    highlightValue: 'K = 48 cm, a = 14 cm → T = ?',
    questionTypeBadge: '10. Geometriai szöveges feladat',
    options: ['140 cm²', '120 cm²', '168 cm²', '196 cm²'],
    correctAnswer: '140 cm²',
    explanation: '2 · (a + b) = 48 → a + b = 24 → b = 24 - 14 = 10 cm. Terület: T = a · b = 14 · 10 = 140 cm².',
    breakdown: [{ label: 'Másik oldal: b', value: '10 cm' }, { label: 'Terület', value: '14 · 10 = 140 cm²' }]
  },
  {
    id: 'c1-l3-q26',
    prompt: 'Hány olyan háromjegyű szám van, amelynek minden számjegye páros?',
    highlightValue: 'Páros jegyű 3 jegyű számok',
    questionTypeBadge: '2. Kombinatorika',
    options: ['100', '125', '64', '80'],
    correctAnswer: '100',
    explanation: 'Első jegy (nem lehet 0): 2, 4, 6, 8 (4 lehetőség). Második jegy: 0, 2, 4, 6, 8 (5 lehetőség). Harmadik jegy: 5 lehetőség. Összesen: 4 · 5 · 5 = 100 darab.',
    breakdown: [{ label: '4 · 5 · 5', value: '100 darab' }]
  },
  {
    id: 'c1-l3-q27',
    prompt: 'Melyik az a szám, amelynek a harmadrésze 15-tel nagyobb, mint a negyedrésze?',
    highlightValue: 'x / 3 = x / 4 + 15',
    questionTypeBadge: '11. Szöveges egyenlet',
    options: ['120', '180', '150', '240'],
    correctAnswer: '180',
    explanation: 'x/3 - x/4 = x/12 = 15 → x = 15 · 12 = 180. Ellenőrzés: 180:3=60, 180:4=45, 60-45=15.',
    breakdown: [{ label: 'x = 15 · 12', value: '180' }]
  },
  {
    id: 'c1-l3-q28',
    prompt: 'Mennyi a különbség: (-100) - (-100)?',
    highlightValue: '(-100) - (-100) = ?',
    questionTypeBadge: '15. Előjeles azonosság',
    options: ['0', '-200', '+200', '-1'],
    correctAnswer: '0',
    explanation: 'Bármely számból önmagát kivonva az eredmény mindig pontosan 0 (-100 + 100 = 0).',
    breakdown: [{ label: '-100 + 100', value: '0' }]
  },
  {
    id: 'c1-l3-q29',
    prompt: 'Ha egy számot elosztunk 17-tel, a maradék legfeljebb mennyi lehet?',
    highlightValue: 'Osztó: 17 → Max maradék = ?',
    questionTypeBadge: '11. Osztási maradék elmélet',
    options: ['16', '17', '18', '15'],
    correctAnswer: '16',
    explanation: 'A maradék mindig szigorúan kisebb, mint az osztó, tehát a lehetséges legnagyobb maradék 17 - 1 = 16.',
    breakdown: [{ label: 'Max maradék', value: '17 - 1 = 16' }]
  },
  {
    id: 'c1-l3-q30',
    prompt: 'Mennyi a kifejezés értéke: 2026 - (1026 - 500)?',
    highlightValue: '2026 - (1026 - 500) = ?',
    questionTypeBadge: '12. Okos zárójelfelbontás',
    options: ['1500', '1400', '1600', '1526'],
    correctAnswer: '1500',
    explanation: '2026 - 1026 + 500 = 1000 + 500 = 1500.',
    breakdown: [{ label: '2026 - 1026 + 500', value: '1000 + 500 = 1500' }]
  }
];

const LEVEL_CONFIGS: Record<DifficultyLevel, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Könnyű szint',
    subtitle: 'Átfogó alapkérdések a fejezet mind a 15 altémájából',
    range: '1 – 15. téma',
    focus: 'Római számok, helyiérték, kerekítés és alapműveletek',
    color: 'emerald',
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/40',
    badgeBorder: 'border-emerald-200 dark:border-emerald-800',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
    accentGradient: 'from-emerald-500 to-teal-600',
    iconBg: 'bg-emerald-500',
    questions: LEVEL_1_QUESTIONS
  },
  2: {
    level: 2,
    title: '2. Közepes szint',
    subtitle: 'Műveleti hierarchia, zárójelezés, előjeles számítások és szöveges feladatok',
    range: 'Témazáró szint',
    focus: 'Összetett kifejezések, kettes rendszer, kétjegyű osztás és egyenletek',
    color: 'amber',
    badgeBg: 'bg-amber-50 dark:bg-amber-950/40',
    badgeBorder: 'border-amber-200 dark:border-amber-800',
    badgeText: 'text-amber-700 dark:text-amber-300',
    accentGradient: 'from-amber-500 to-orange-600',
    iconBg: 'bg-amber-500',
    questions: LEVEL_2_QUESTIONS
  },
  3: {
    level: 3,
    title: '3. Nehéz szint',
    subtitle: 'Többszörös zárójelek, algebrai behelyettesítés és kombinatorikus fejtörők',
    range: 'Versenyszint',
    focus: 'Okos számolás, abszolút érték egyenletek és emelt szintű zárófeladatok',
    color: 'purple',
    badgeBg: 'bg-purple-50 dark:bg-purple-950/40',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    badgeText: 'text-purple-700 dark:text-purple-300',
    accentGradient: 'from-purple-600 to-amber-600',
    iconBg: 'bg-purple-500',
    questions: LEVEL_3_QUESTIONS
  }
};

interface Chapter1SummaryQuizProps {
  onBack: () => void;
}

export function Chapter1SummaryQuiz({ onBack }: Chapter1SummaryQuizProps) {
  const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel | null>(null);
  const [gameMode, setGameMode] = useState<GameMode>('quiz');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showCheatSheet, setShowCheatSheet] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const handleStartLevel = (lvl: DifficultyLevel, mode: GameMode = 'quiz') => {
    setSelectedLevel(lvl);
    setGameMode(mode);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setIsCompleted(false);
  };

  const levelConfig = selectedLevel ? LEVEL_CONFIGS[selectedLevel] : null;
  const currentQuestion = levelConfig ? levelConfig.questions[currentIndex] : null;

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedLevel || gameMode !== 'quiz' || isCompleted || !currentQuestion) return;

      if (!isAnswerChecked) {
        if (['1', '2', '3', '4'].includes(e.key)) {
          const idx = parseInt(e.key) - 1;
          if (currentQuestion.options[idx]) {
            handleOptionClick(currentQuestion.options[idx]);
          }
        }
      } else {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleNextQuestion();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedLevel, gameMode, isAnswerChecked, currentIndex, isCompleted, currentQuestion]);

  const handleOptionClick = (option: string) => {
    if (isAnswerChecked || !currentQuestion) return;

    setSelectedOption(option);
    setIsAnswerChecked(true);

    const isCorrect = option === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore((s) => s + 1);
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      if (nextStreak > bestStreak) setBestStreak(nextStreak);

      if (nextStreak >= 3) {
        confetti({
          particleCount: 35,
          spread: 50,
          origin: { y: 0.7 }
        });
      }
    } else {
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    if (!levelConfig) return;

    if (currentIndex < levelConfig.questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    } else {
      setIsCompleted(true);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  // ----------------------------------------------------------------
  // SCREEN 1: DIFFICULTY & GAME MODE SELECTION HUB
  // ----------------------------------------------------------------
  // ----------------------------------------------------------------
  // SCREEN 1: DIFFICULTY & GAME MODE SELECTION HUB
  // ----------------------------------------------------------------
  if (!selectedLevel) {
    return (
      <div
        ref={containerRef}
        className={cn(
          "w-full max-w-5xl mx-auto px-2 sm:px-4 py-3 animate-in fade-in duration-300 text-left",
          isFullscreen && "fixed inset-0 z-50 max-w-none w-screen h-screen bg-slate-100 dark:bg-slate-950 p-4 sm:p-6 overflow-y-auto"
        )}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Vissza a témakörökhöz
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFullscreen}
              className="h-8 rounded-xl px-2.5 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs hover:bg-slate-100 dark:hover:bg-slate-800"
              title={isFullscreen ? 'Kilépés a teljes képernyőből' : 'Teljes képernyős mód'}
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5 mr-1 text-amber-600 dark:text-amber-400" />
                  <span className="hidden sm:inline">Kilépés</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5 mr-1 text-slate-500" />
                  <span className="hidden sm:inline">Teljes képernyő</span>
                </>
              )}
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowCheatSheet(!showCheatSheet)}
              className="h-8 rounded-xl px-2.5 border-amber-300 bg-amber-50/50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800 hover:bg-amber-100 text-xs font-bold"
            >
              <BookOpen className="w-3.5 h-3.5 mr-1 text-amber-600" />
              Témazáró segédlet
            </Button>
          </div>
        </div>

        {/* Hero Header */}
        <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-5">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center justify-center gap-2 mb-1">
            <span className="text-2xl">🏆</span>
            <span>I. Az egész számok Témazáró Kvíz</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Teszteld tudásodat a fejezet mind a 15 témaköréből! Válassz nehézségi szintet (3×30 feladat) vagy próbáld ki a kártyanyitogató párosító és csoportosító játékmódokat!
          </p>

          {/* Quick Mode Switcher in selection */}
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl mt-3 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setGameMode('quiz')}
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all",
                gameMode === 'quiz'
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              )}
            >
              <FileQuestion className="w-3.5 h-3.5 text-amber-500" />
              Klasszikus Kvíz
            </button>
            <button
              onClick={() => setGameMode('matcher')}
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all",
                gameMode === 'matcher'
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              )}
            >
              <LayoutGrid className="w-3.5 h-3.5 text-emerald-500" />
              Kártyás Párosító
            </button>
            <button
              onClick={() => setGameMode('sorter')}
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all",
                gameMode === 'sorter'
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              )}
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-indigo-500" />
              Csoportosító (Húzd a helyére)
            </button>
          </div>
        </div>

        {/* Cheat sheet popover/card */}
        {showCheatSheet && (
          <div className="mb-4 p-4 sm:p-5 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-900 dark:to-slate-850 rounded-2xl border-2 border-amber-200 dark:border-amber-900/60 shadow-md animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm sm:text-base font-black text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                I. Fejezet Témazáró Mester Segédlet
              </h3>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowCheatSheet(false)}
                className="text-amber-800 dark:text-amber-300 hover:bg-amber-200/50 rounded-lg h-7 px-2 text-xs"
              >
                Bezárás
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
              {CHAPTER1_SUMMARY_CHEAT_SHEET.map((item, idx) => (
                <div key={idx} className="bg-white/95 dark:bg-slate-800/95 p-2.5 rounded-xl border border-amber-100 dark:border-slate-700 shadow-xs text-left">
                  <div className="text-xs font-black text-amber-600 dark:text-amber-400">{item.topic}</div>
                  <div className="text-xs font-mono font-bold text-slate-800 dark:text-slate-100 mt-0.5">{item.formula}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">{item.note}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Difficulty Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {([1, 2, 3] as DifficultyLevel[]).map((level) => {
            const cfg = LEVEL_CONFIGS[level];
            return (
              <div
                key={level}
                onClick={() => handleStartLevel(level, gameMode)}
                className="group relative bg-white dark:bg-slate-900 rounded-2xl p-5 border-2 border-slate-200/80 dark:border-slate-800 hover:border-amber-500 dark:hover:border-amber-500 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-inner text-white font-black text-lg", cfg.iconBg)}>
                      {level}
                    </div>

                    <span className={cn("px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider border", cfg.badgeBg, cfg.badgeBorder, cfg.badgeText)}>
                      {gameMode === 'quiz' ? '30 Kérdés' : gameMode === 'matcher' ? '8 Pár' : '10 Elem (3 csoport)'}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 dark:text-white mb-0.5 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {cfg.title}
                  </h3>

                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">
                    {cfg.subtitle}
                  </p>

                  <div className="space-y-1.5 pt-2.5 border-t border-slate-100 dark:border-slate-800 mb-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">Tartomány:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{cfg.range}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">Fókusz:</span>
                      <span className="font-bold text-amber-600 dark:text-amber-400 text-right truncate max-w-[140px]" title={cfg.focus}>{cfg.focus}</span>
                    </div>
                  </div>
                </div>

                <Button
                  className={cn(
                    "w-full h-10 rounded-xl font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-1.5",
                    level === 1
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                      : level === 2
                      ? "bg-amber-600 hover:bg-amber-700 text-white"
                      : "bg-purple-600 hover:bg-purple-700 text-white"
                  )}
                >
                  {gameMode === 'quiz' ? 'Kvíz Indítása' : gameMode === 'matcher' ? 'Párosító Indítása' : 'Csoportosító Indítása'}
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ----------------------------------------------------------------
  // SCREEN 3: COMPLETION MODAL
  // ----------------------------------------------------------------
  if (isCompleted && gameMode === 'quiz' && levelConfig) {
    const percentage = Math.round((score / levelConfig.questions.length) * 100);

    return (
      <div
        ref={containerRef}
        className="w-full max-w-xl mx-auto px-4 py-8 animate-in zoom-in-95 duration-300 text-center space-y-6"
      >
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-amber-300 dark:border-amber-700 shadow-xl space-y-6">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-indigo-500 text-white flex items-center justify-center text-4xl shadow-lg shadow-amber-500/20">
            <Trophy className="w-10 h-10 text-yellow-300 animate-bounce" />
          </div>

          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
              I. Fejezet Témazáró Befejezve!
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {percentage >= 90
                ? 'Kiváló teljesítmény! 🌟'
                : percentage >= 70
                ? 'Szép munka! 👏'
                : 'Jó próbálkozás, gyakorolj még! 💪'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Sikeresen végigértél a(z) {levelConfig.title} mind a 30 kérdésén!
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Pontszám</span>
              <span className="text-xl font-black font-mono text-indigo-600 dark:text-indigo-400">
                {score} / {levelConfig.questions.length}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Eredmény</span>
              <span className="text-xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                {percentage}%
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Legjobb széria</span>
              <span className="text-xl font-black font-mono text-amber-600 dark:text-amber-400">
                {bestStreak} 🔥
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => handleStartLevel(selectedLevel, gameMode)}
              className="flex-1 rounded-xl font-bold text-xs h-10 border-slate-300 dark:border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
              Újra ezen a szinten
            </Button>

            {selectedLevel < 3 ? (
              <Button
                onClick={() => handleStartLevel((selectedLevel + 1) as DifficultyLevel, gameMode)}
                className="flex-1 rounded-xl bg-gradient-to-r from-amber-600 to-indigo-600 hover:from-amber-500 hover:to-indigo-500 text-white font-bold text-xs h-10 shadow-md"
              >
                Következő szint ({selectedLevel + 1}. szint)
                <ChevronRight className="w-4 h-4 ml-1.5" />
              </Button>
            ) : (
              <Button
                onClick={() => setSelectedLevel(null)}
                className="flex-1 rounded-xl bg-gradient-to-r from-amber-600 to-indigo-600 hover:from-amber-500 hover:to-indigo-500 text-white font-bold text-xs h-10"
              >
                Szintek menü
                <ChevronRight className="w-4 h-4 ml-1.5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!levelConfig || !currentQuestion) return null;

  // ----------------------------------------------------------------
  // SCREEN 2: 12-COLUMN WORDWALL QUIZ / MATCHER / SORTER WORKSPACE
  // ----------------------------------------------------------------
  return (
    <div
      ref={containerRef}
      className="w-full max-w-6xl mx-auto px-2 sm:px-4 py-3 animate-in fade-in duration-300 text-left"
    >
      {/* Top Header Bar matching canonical Wordwall schema */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 p-2 bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200/80 dark:border-slate-800 shadow-xs">
        {/* Back button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSelectedLevel(null)}
          className="rounded-xl h-8 px-2.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          Szintekhez
        </Button>

        {/* Level pills in header */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
          {([1, 2, 3] as DifficultyLevel[]).map((lvl) => (
            <button
              key={lvl}
              onClick={() => handleStartLevel(lvl, gameMode)}
              className={cn(
                "px-2.5 py-1 rounded-lg text-xs font-black transition-all",
                selectedLevel === lvl
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              )}
            >
              {lvl === 1 ? '1. Könnyű (30)' : lvl === 2 ? '2. Közepes (30)' : '3. Nehéz (30)'}
            </button>
          ))}
        </div>

        {/* Mode / Score indicator */}
        <div className="flex items-center gap-2">
          {gameMode === 'quiz' ? (
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-3 py-1 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs text-xs">
              <div className="flex items-center gap-1 font-black text-amber-600 dark:text-amber-400">
                <Trophy className="w-3.5 h-3.5" />
                <span>{score} pont</span>
              </div>
              {streak > 1 && (
                <>
                  <div className="w-px h-3 bg-slate-200 dark:bg-slate-700" />
                  <div className="flex items-center gap-1 font-black text-emerald-600 dark:text-emerald-400 animate-pulse">
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    <span>{streak}x</span>
                  </div>
                </>
              )}
            </div>
          ) : gameMode === 'matcher' ? (
            <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 px-3 py-1 rounded-xl border border-amber-200 dark:border-amber-800 text-xs font-bold">
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Párosító Mód</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-xl border border-purple-200 dark:border-purple-800 text-xs font-bold">
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>Csoportosító Mód</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Container with Wordwall Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* LEFT / CENTER: Main Game Area (9 cols on large screen) */}
        <div className="lg:col-span-9 flex flex-col gap-3">
          {gameMode === 'quiz' ? (
            /* QUIZ MODE WORKSPACE */
            <div className="space-y-3">
              {/* Slim Progress Bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400 px-1">
                  <span>{levelConfig.title} feladványai</span>
                  <span>{currentIndex + 1} / {levelConfig.questions.length}</span>
                </div>
                <ProgressBar
                  current={currentIndex + 1}
                  total={levelConfig.questions.length}
                  color={selectedLevel === 1 ? 'emerald' : selectedLevel === 2 ? 'amber' : 'purple'}
                />
              </div>

              {/* 2-Column Responsive Workspace Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 items-start">
                {/* Left: Question Card + Explanation */}
                <div className="flex flex-col gap-2.5">
                  <Card className="border-2 border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
                    <div className="px-3.5 py-2 bg-slate-50 dark:bg-slate-850 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        {currentIndex + 1}. Kérdés • {currentQuestion.questionTypeBadge}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                        {levelConfig.title}
                      </span>
                    </div>

                    <CardContent className="p-4 sm:p-5 text-center">
                      <p className="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 mb-2.5">
                        {currentQuestion.prompt}
                      </p>

                      <div className="inline-block px-6 py-2.5 bg-gradient-to-br from-amber-50 to-indigo-50/60 dark:from-slate-850 dark:to-slate-800 rounded-2xl border-2 border-amber-200/80 dark:border-slate-700 shadow-inner">
                        <span className="text-2xl sm:text-3xl font-mono font-black tracking-wider text-slate-900 dark:text-amber-300">
                          {currentQuestion.highlightValue}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Explanation & Next Step below question */}
                  {isAnswerChecked && (
                    <div className="space-y-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
                      <div className={cn(
                        "p-3.5 rounded-2xl border-2 shadow-xs text-left",
                        selectedOption === currentQuestion.correctAnswer
                          ? "bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800/80"
                          : "bg-rose-50/90 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800/80"
                      )}>
                        <div className="flex items-start gap-2.5">
                          <div className={cn(
                            "w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5",
                            selectedOption === currentQuestion.correctAnswer
                              ? "bg-emerald-500 text-white"
                              : "bg-rose-500 text-white"
                          )}>
                            {selectedOption === currentQuestion.correctAnswer ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : (
                              <XCircle className="w-4 h-4" />
                            )}
                          </div>

                          <div className="flex-1">
                            <h4 className={cn(
                              "text-xs sm:text-sm font-black mb-0.5",
                              selectedOption === currentQuestion.correctAnswer
                                ? "text-emerald-900 dark:text-emerald-200"
                                : "text-rose-900 dark:text-rose-200"
                            )}>
                              {selectedOption === currentQuestion.correctAnswer ? 'Helyes Válasz! 🎉' : 'Nem jó válasz! 🤔'}
                            </h4>
                            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium mb-1.5">
                              {currentQuestion.explanation}
                            </p>

                            {currentQuestion.breakdown && (
                              <div className="flex flex-wrap items-center gap-1.5 pt-1.5 border-t border-slate-200/60 dark:border-slate-700/60">
                                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Levezetés:</span>
                                {currentQuestion.breakdown.map((item, bIdx) => (
                                  <span
                                    key={bIdx}
                                    className="px-1.5 py-0.5 rounded-md bg-white/90 dark:bg-slate-800/90 text-[10px] font-bold font-mono text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                                  >
                                    {item.label}: <span className="text-indigo-600 dark:text-indigo-400">{item.value}</span>
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={handleNextQuestion}
                        className="w-full h-10 rounded-xl text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white dark:bg-amber-600 dark:hover:bg-amber-700 shadow-sm transition-all flex items-center justify-center gap-1.5"
                      >
                        {currentIndex < levelConfig.questions.length - 1 ? (
                          <>
                            Következő Feladat
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </>
                        ) : (
                          <>
                            Eredmények Megtekintése
                            <Trophy className="w-4 h-4 ml-1 text-yellow-400" />
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>

                {/* Right: 4 Answer Options */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Válaszd ki a helyes választ:
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500">
                      Gombok: [1, 2, 3, 4]
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    {currentQuestion.options.map((option, idx) => {
                      const isSelected = selectedOption === option;
                      const isCorrect = option === currentQuestion.correctAnswer;

                      let buttonStyle = "bg-white dark:bg-slate-900 border-2 border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-slate-100 hover:border-amber-500 hover:shadow-xs dark:hover:border-amber-500";

                      if (isAnswerChecked) {
                        if (isCorrect) {
                          buttonStyle = "bg-emerald-50 dark:bg-emerald-950/60 border-2 border-emerald-500 text-emerald-800 dark:text-emerald-200 shadow-xs";
                        } else if (isSelected && !isCorrect) {
                          buttonStyle = "bg-rose-50 dark:bg-rose-950/60 border-2 border-rose-500 text-rose-800 dark:text-rose-200 shadow-xs";
                        } else {
                          buttonStyle = "bg-slate-50/60 dark:bg-slate-900/40 border-slate-200/40 dark:border-slate-800/40 text-slate-400 dark:text-slate-600 opacity-60";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleOptionClick(option)}
                          disabled={isAnswerChecked}
                          className={cn(
                            "relative min-h-13 sm:min-h-14 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all duration-150 flex items-center justify-between px-4 text-left",
                            buttonStyle
                          )}
                        >
                          <span className="flex items-center gap-2.5">
                            <span className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-sans font-bold flex items-center justify-center border border-slate-200 dark:border-slate-700 shrink-0">
                              {idx + 1}
                            </span>
                            <span className="font-bold leading-snug">{option}</span>
                          </span>

                          {isAnswerChecked && isCorrect && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 animate-in zoom-in shrink-0 ml-2" />
                          )}
                          {isAnswerChecked && isSelected && !isCorrect && (
                            <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 animate-in zoom-in shrink-0 ml-2" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {!isAnswerChecked && (
                    <div className="p-2.5 bg-amber-50/60 dark:bg-slate-850/80 rounded-xl border border-amber-200/50 dark:border-slate-800 text-[11px] text-amber-900 dark:text-amber-300 flex items-center gap-1.5 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>Gondold át a lépéseket, mielőtt választasz!</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : gameMode === 'matcher' ? (
            /* MATCHER MODE WORKSPACE */
            <Chapter1SummaryMatcher
              level={selectedLevel}
              onNextLevel={
                selectedLevel < 3
                  ? () => handleStartLevel((selectedLevel + 1) as DifficultyLevel, 'matcher')
                  : undefined
              }
              onOpenRules={() => setShowCheatSheet(true)}
            />
          ) : (
            /* SORTER / GROUPING MODE WORKSPACE */
            <Chapter1SummarySorter
              level={selectedLevel}
              onNextLevel={
                selectedLevel < 3
                  ? () => handleStartLevel((selectedLevel + 1) as DifficultyLevel, 'sorter')
                  : undefined
              }
              onOpenRules={() => setShowCheatSheet(true)}
            />
          )}
        </div>

        {/* RIGHT: Wordwall-style Activity & Controls Sidebar (3 cols on large screen) */}
        <div className="lg:col-span-3 flex flex-col gap-3">
          {/* Wordwall Mode Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border-2 border-slate-200/80 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5 px-1">
              <Layers className="w-3.5 h-3.5 text-amber-500" />
              <span>Sablon / Játékmód</span>
            </div>

            <div className="flex flex-col gap-1.5">
              {/* Quiz Mode Button */}
              <button
                onClick={() => setGameMode('quiz')}
                className={cn(
                  "w-full p-2.5 rounded-xl text-left font-bold text-xs transition-all flex items-center gap-2.5 border-2",
                  gameMode === 'quiz'
                    ? "bg-amber-50 dark:bg-amber-950/50 border-amber-400 text-amber-900 dark:text-amber-200 shadow-xs"
                    : "bg-slate-50/80 dark:bg-slate-800/60 border-transparent hover:border-slate-200 text-slate-600 dark:text-slate-400"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                  gameMode === 'quiz' ? "bg-amber-500 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                )}>
                  <FileQuestion className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-black text-xs">Klasszikus Kvíz</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">30 feladat, 4 opció</div>
                </div>
              </button>

              {/* Matcher Mode Button */}
              <button
                onClick={() => setGameMode('matcher')}
                className={cn(
                  "w-full p-2.5 rounded-xl text-left font-bold text-xs transition-all flex items-center gap-2.5 border-2",
                  gameMode === 'matcher'
                    ? "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-400 text-emerald-900 dark:text-emerald-200 shadow-xs"
                    : "bg-slate-50/80 dark:bg-slate-800/60 border-transparent hover:border-slate-200 text-slate-600 dark:text-slate-400"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                  gameMode === 'matcher' ? "bg-emerald-500 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                )}>
                  <LayoutGrid className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-black text-xs">Kártyanyitogató</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">8 pár megkeresése</div>
                </div>
              </button>

              {/* Sorter Mode Button */}
              <button
                onClick={() => setGameMode('sorter')}
                className={cn(
                  "w-full p-2.5 rounded-xl text-left font-bold text-xs transition-all flex items-center gap-2.5 border-2",
                  gameMode === 'sorter'
                    ? "bg-purple-50 dark:bg-purple-950/50 border-purple-400 text-purple-900 dark:text-purple-200 shadow-xs"
                    : "bg-slate-50/80 dark:bg-slate-800/60 border-transparent hover:border-slate-200 text-slate-600 dark:text-slate-400"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                  gameMode === 'sorter' ? "bg-purple-500 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                )}>
                  <ArrowRightLeft className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-black text-xs">Csoportosító</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">Húzd a helyére (3 csoport)</div>
                </div>
              </button>
            </div>
          </div>

          {/* Quick Level Switcher in Sidebar */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border-2 border-slate-200/80 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 px-1">
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              <span>Nehézségi szint</span>
            </div>

            <div className="flex flex-col gap-1">
              {([1, 2, 3] as DifficultyLevel[]).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => handleStartLevel(lvl, gameMode)}
                  className={cn(
                    "w-full px-3 py-1.5 rounded-xl text-xs font-bold transition-all text-left flex items-center justify-between",
                    selectedLevel === lvl
                      ? "bg-slate-900 text-white dark:bg-amber-600 dark:text-white"
                      : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                  )}
                >
                  <span>{lvl}. {lvl === 1 ? 'Könnyű szint (30)' : lvl === 2 ? 'Közepes szint (30)' : 'Nehéz szint (30)'}</span>
                  {selectedLevel === lvl && <CheckCircle2 className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* Tools & Rules Actions */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border-2 border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col gap-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFullscreen}
              className="w-full h-9 rounded-xl border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold justify-start"
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5 mr-2 text-amber-600" />
                  Kilépés a teljes képernyőből
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5 mr-2 text-amber-600" />
                  Teljes képernyős mód
                </>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCheatSheet(!showCheatSheet)}
              className="w-full h-9 rounded-xl border-amber-300 bg-amber-50/50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800 hover:bg-amber-100 text-xs font-bold justify-start"
            >
              <BookOpen className="w-3.5 h-3.5 mr-2 text-amber-600" />
              Témazáró segédlet
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleStartLevel(selectedLevel, gameMode)}
              className="w-full h-9 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium justify-start"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-2" />
              Játék újraindítása
            </Button>
          </div>
        </div>
      </div>

      {/* Rules Modal Overlay */}
      {showCheatSheet && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-amber-300 dark:border-amber-900 shadow-2xl max-w-2xl w-full text-left">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                I. Fejezet Témazáró Mester Segédlet
              </h3>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowCheatSheet(false)}
                className="rounded-xl h-8 px-2 text-xs"
              >
                Bezárás
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-2.5 mb-4 max-h-[55vh] overflow-y-auto pr-1">
              {CHAPTER1_SUMMARY_CHEAT_SHEET.map((item, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-850 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700">
                  <div className="text-xs font-black text-amber-600 dark:text-amber-400">{item.topic}</div>
                  <div className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5">{item.formula}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">{item.note}</div>
                </div>
              ))}
            </div>

            <Button
              onClick={() => setShowCheatSheet(false)}
              className="w-full h-10 rounded-xl font-bold bg-amber-600 hover:bg-amber-700 text-white"
            >
              Értem, folytatom a játékot!
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chapter1SummaryQuiz;

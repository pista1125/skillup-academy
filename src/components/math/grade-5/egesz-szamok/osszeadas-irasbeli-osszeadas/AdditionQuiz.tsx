import React from 'react';
import { QuizTemplate, Question } from '../QuizTemplate';
import { AdditionMatcher } from './AdditionMatcher';
import { AdditionSorter } from './AdditionSorter';

export interface AdditionQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const questions: Question[] = [
  // =========================================================================
  // --- 1. SZINT: KÖNNYŰ (Fejben összeadás, tulajdonságok, kerek összegek) ---
  // =========================================================================
  {
    id: 'l1-q1',
    level: 1,
    prompt: 'Mennyi a 25 + 75 összeadás eredménye?',
    highlightValue: '25 + 75 = ?',
    questionTypeBadge: 'Kerek százasra kiegészítés',
    options: ['100', '90', '110', '105'],
    correctAnswer: '100',
    explanation: '25 + 75 = 100.',
    hint: '25 + 75 pontosan 100.',
    breakdown: [
      { label: 'Tízesek', value: '20 + 70 = 90' },
      { label: 'Egyesek', value: '5 + 5 = 10' },
      { label: 'Összeg', value: '90 + 10 = 100' }
    ]
  },
  {
    id: 'l1-q2',
    level: 1,
    prompt: 'Hogyan nevezzük az összeadásban szereplő számokat és az eredményt?',
    highlightValue: 'a + b = c elnevezései',
    questionTypeBadge: 'Fogalmak',
    options: ['Tag + Tag = Összeg', 'Kisebbítendő - Kivonandó = Különbség', 'Tényező · Tényező = Szorzat', 'Osztandó : Osztó = Hányados'],
    correctAnswer: 'Tag + Tag = Összeg',
    explanation: 'Az összeadásban részt vevő számok a tagok (összeadandók), az eredmény pedig az összeg.',
    hint: 'Tag + Tag = Összeg.',
    breakdown: [
      { label: 'Első szám', value: '1. tag' },
      { label: 'Második szám', value: '2. tag' },
      { label: 'Eredmény', value: 'Összeg' }
    ]
  },
  {
    id: 'l1-q3',
    level: 1,
    prompt: 'Mennyi a 38 + 12 összeadás eredménye?',
    highlightValue: '38 + 12 = ?',
    questionTypeBadge: 'Fejszámolás',
    options: ['50', '40', '60', '52'],
    correctAnswer: '50',
    explanation: '38 + 12 = 38 + 2 + 10 = 40 + 10 = 50.',
    hint: '38 + 2 = 40, plusz még 10 = 50.',
    breakdown: [
      { label: 'Kerekítés', value: '38 + 2 = 40' },
      { label: 'Maradék', value: '40 + 10 = 50' }
    ]
  },
  {
    id: 'l1-q4',
    level: 1,
    prompt: 'Melyik matematikai azonosság fejezi ki, hogy az összeadás tagjai felcserélhetők?',
    highlightValue: 'Felcserélhetőség (Kommutativitás)',
    questionTypeBadge: 'Műveleti tulajdonság',
    options: ['a + b = b + a', '(a + b) + c = a + (b + c)', 'a + 0 = a', 'a · b = b · a'],
    correctAnswer: 'a + b = b + a',
    explanation: 'A felcserélhetőség azt jelenti, hogy a + b = b + a (az összeg nem változik).',
    hint: 'A és B sorrendje felcserélhető.',
    breakdown: [
      { label: 'Tulajdonság', value: 'Felcserélhetőség (kommutativitás)' },
      { label: 'Képlet', value: 'a + b = b + a' }
    ]
  },
  {
    id: 'l1-q5',
    level: 1,
    prompt: 'Mennyi az összeg, ha 3 számot adunk össze ügyesen csoportosítva: 17 + 25 + 13 = ?',
    highlightValue: '17 + 25 + 13 = ?',
    questionTypeBadge: 'Csoportosítás',
    options: ['55', '50', '60', '45'],
    correctAnswer: '55',
    explanation: '(17 + 13) + 25 = 30 + 25 = 55.',
    hint: 'Add össze előbb a 17-et és a 13-at (30), majd adj hozzá 25-öt!',
    breakdown: [
      { label: '1. lépés', value: '17 + 13 = 30' },
      { label: '2. lépés', value: '30 + 25 = 55' }
    ]
  },
  {
    id: 'l1-q6',
    level: 1,
    prompt: 'Mennyi a 348 + 0 összeadás eredménye?',
    highlightValue: '348 + 0 = ?',
    questionTypeBadge: 'Nulla szerepe',
    options: ['348', '0', '3480', '1'],
    correctAnswer: '348',
    explanation: 'A 0 az összeadás semleges eleme: a + 0 = a.',
    hint: 'Nullát hozzáadva a szám nem változik.',
    breakdown: [
      { label: 'Szabály', value: 'a + 0 = a' },
      { label: 'Összeg', value: '348' }
    ]
  },
  {
    id: 'l1-q7',
    level: 1,
    prompt: 'Mennyi a 140 + 60 összeadás eredménye?',
    highlightValue: '140 + 60 = ?',
    questionTypeBadge: 'Kerek tízesek',
    options: ['200', '190', '210', '180'],
    correctAnswer: '200',
    explanation: '140 + 60 = 200.',
    hint: '14 tízes + 6 tízes = 20 tízes = 200.',
    breakdown: [
      { label: 'Tízesekben', value: '14 + 6 = 20 tízes' },
      { label: 'Összeg', value: '200' }
    ]
  },
  {
    id: 'l1-q8',
    level: 1,
    prompt: 'Mennyi a 23 + 45 összeadás eredménye?',
    highlightValue: '23 + 45 = ?',
    questionTypeBadge: 'Átlépés nélküli összeadás',
    options: ['68', '58', '78', '67'],
    correctAnswer: '68',
    explanation: '3 + 5 = 8 egyes, 2 + 4 = 6 tízes ➔ 68.',
    hint: 'Egyesek: 3 + 5 = 8; Tízesek: 2 + 4 = 6.',
    breakdown: [
      { label: 'Egyesek', value: '3 + 5 = 8' },
      { label: 'Tízesek', value: '2 + 4 = 6' },
      { label: 'Összeg', value: '68' }
    ]
  },
  {
    id: 'l1-q9',
    level: 1,
    prompt: 'Melyik szám hiányzik: 34 + __ = 100 ?',
    highlightValue: '34 + ? = 100',
    questionTypeBadge: 'Hiányzó tag',
    options: ['66', '76', '56', '64'],
    correctAnswer: '66',
    explanation: '100 - 34 = 66.',
    hint: '100 - 34 = 66.',
    breakdown: [
      { label: 'Kivonás', value: '100 - 34' },
      { label: 'Hiányzó tag', value: '66' }
    ]
  },
  {
    id: 'l1-q10',
    level: 1,
    prompt: 'Mennyi a 350 + 250 összeadás eredménye?',
    highlightValue: '350 + 250 = ?',
    questionTypeBadge: 'Kerek tízesek',
    options: ['600', '500', '550', '700'],
    correctAnswer: '600',
    explanation: '350 + 250 = 600.',
    hint: '300 + 200 = 500, 50 + 50 = 100 ➔ 600.',
    breakdown: [
      { label: 'Százasok', value: '300 + 200 = 500' },
      { label: 'Tízesek', value: '50 + 50 = 100' },
      { label: 'Összeg', value: '600' }
    ]
  },

  // =========================================================================
  // --- 2. SZINT: KÖZEPES (Írásbeli összeadás átlépéssel, háromjegyű számok) ---
  // =========================================================================
  {
    id: 'l2-q1',
    level: 2,
    prompt: 'Mennyi a 384 + 195 írásbeli összeadás pontos eredménye?',
    highlightValue: '384 + 195 = ?',
    questionTypeBadge: 'Írásbeli összeadás',
    options: ['579', '589', '479', '578'],
    correctAnswer: '579',
    explanation: '4 + 5 = 9; 8 + 9 = 17 (leírjuk a 7-et, maradt az 1); 3 + 1 + 1 = 5 ➔ 579.',
    hint: 'Egyesek: 4+5=9, Tízesek: 8+9=17 (marad 1), Százasok: 3+1+1=5.',
    breakdown: [
      { label: 'Egyesek', value: '4 + 5 = 9' },
      { label: 'Tízesek', value: '8 + 9 = 17 (leírjuk a 7-et, átvitel: 1)' },
      { label: 'Százasok', value: '3 + 1 + 1 = 5' },
      { label: 'Összeg', value: '579' }
    ]
  },
  {
    id: 'l2-q2',
    level: 2,
    prompt: 'Mennyi a 476 + 258 összeadás eredménye?',
    highlightValue: '476 + 258 = ?',
    questionTypeBadge: 'Kettős átlépés',
    options: ['734', '724', '744', '634'],
    correctAnswer: '734',
    explanation: '6 + 8 = 14 (maradt 1); 7 + 5 + 1 = 13 (maradt 1); 4 + 2 + 1 = 7 ➔ 734.',
    hint: 'Egyeseknél és tízeseknél is keletkezik átvitel.',
    breakdown: [
      { label: 'Egyesek', value: '6 + 8 = 14 (leírjuk a 4-et, átvitel: 1)' },
      { label: 'Tízesek', value: '7 + 5 + 1 = 13 (leírjuk a 3-at, átvitel: 1)' },
      { label: 'Százasok', value: '4 + 2 + 1 = 7' },
      { label: 'Összeg', value: '734' }
    ]
  },
  {
    id: 'l2-q3',
    level: 2,
    prompt: 'Mennyi a 567 + 345 összeadás eredménye?',
    highlightValue: '567 + 345 = ?',
    questionTypeBadge: 'Írásbeli összeadás',
    options: ['912', '902', '922', '812'],
    correctAnswer: '912',
    explanation: '7 + 5 = 12 (maradt 1); 6 + 4 + 1 = 11 (maradt 1); 5 + 3 + 1 = 9 ➔ 912.',
    hint: '7+5=12, 6+4+1=11, 5+3+1=9.',
    breakdown: [
      { label: 'Egyesek', value: '7 + 5 = 12 (átvitel: 1)' },
      { label: 'Tízesek', value: '6 + 4 + 1 = 11 (átvitel: 1)' },
      { label: 'Százasok', value: '5 + 3 + 1 = 9' },
      { label: 'Összeg', value: '912' }
    ]
  },
  {
    id: 'l2-q4',
    level: 2,
    prompt: 'Mennyi a 689 + 311 összeadás eredménye?',
    highlightValue: '689 + 311 = ?',
    questionTypeBadge: 'Kerek ezres',
    options: ['1 000', '990', '1 010', '900'],
    correctAnswer: '1 000',
    explanation: '9 + 1 = 10 (maradt 1); 8 + 1 + 1 = 10 (maradt 1); 6 + 3 + 1 = 10 ➔ 1 000.',
    hint: 'Minden oszlop 10-et ad ➔ 1 000.',
    breakdown: [
      { label: 'Oszloponként', value: 'Minden oszlopban átvitel keletkezik' },
      { label: 'Végeredmény', value: '1 000' }
    ]
  },
  {
    id: 'l2-q5',
    level: 2,
    prompt: 'Melyik számjegy hiányzik a tízesek helyéről: 3_5 + 248 = 623 ?',
    highlightValue: '3_5 + 248 = 623',
    questionTypeBadge: 'Hiányzó számjegy pótlása',
    options: ['7', '6', '8', '5'],
    correctAnswer: '7',
    explanation: '5 + 8 = 13 (maradt 1). _ + 4 + 1 = 12 ➔ _ = 7 (7 + 4 + 1 = 12). Ellenőrzés: 375 + 248 = 623.',
    hint: '623 - 248 = 375 ➔ a hiányzó számjegy a 7.',
    breakdown: [
      { label: 'Kivonással', value: '623 - 248 = 375' },
      { label: 'Hiányzó jegy', value: '7' }
    ]
  },
  {
    id: 'l2-q6',
    level: 2,
    prompt: 'Mennyi a 245 + 478 összeadás eredménye?',
    highlightValue: '245 + 478 = ?',
    questionTypeBadge: 'Írásbeli összeadás',
    options: ['723', '713', '733', '623'],
    correctAnswer: '723',
    explanation: '5 + 8 = 13 (maradt 1); 4 + 7 + 1 = 12 (maradt 1); 2 + 4 + 1 = 7 ➔ 723.',
    hint: '5+8=13, 4+7+1=12, 2+4+1=7.',
    breakdown: [
      { label: 'Lépések', value: '13 ➔ 12 ➔ 7' },
      { label: 'Összeg', value: '723' }
    ]
  },
  {
    id: 'l2-q7',
    level: 2,
    prompt: 'Mennyi a 856 + 144 összeadás eredménye?',
    highlightValue: '856 + 144 = ?',
    questionTypeBadge: 'Kerek ezres',
    options: ['1 000', '990', '1 100', '1 010'],
    correctAnswer: '1 000',
    explanation: '856 + 144 = 1 000 (56 + 44 = 100, 800 + 100 + 100 = 1000).',
    hint: '56 + 44 = 100, 800 + 100 + 100 = 1000.',
    breakdown: [
      { label: 'Bontás', value: '(800 + 100) + (56 + 44)' },
      { label: 'Összeg', value: '900 + 100 = 1 000' }
    ]
  },
  {
    id: 'l2-q8',
    level: 2,
    prompt: 'Három szám összege: 125 + 250 + 375 = ?',
    highlightValue: '125 + 250 + 375 = ?',
    questionTypeBadge: 'Többtagú összeadás',
    options: ['750', '700', '800', '725'],
    correctAnswer: '750',
    explanation: '(125 + 375) + 250 = 500 + 250 = 750.',
    hint: '125 + 375 = 500, plusz 250 = 750.',
    breakdown: [
      { label: 'Ügyes párosítás', value: '125 + 375 = 500' },
      { label: 'Hozzáadás', value: '500 + 250 = 750' }
    ]
  },
  {
    id: 'l2-q9',
    level: 2,
    prompt: 'Miért kötelező az írásbeli összeadást az egyesek felől (jobbról balra) kezdeni?',
    highlightValue: 'Írásbeli összeadás iránya',
    questionTypeBadge: 'Módszertan',
    options: [
      'Mert az átvitel (maradék) jobbról balra halad a nagyobb helyiértékek felé',
      'Mert balról jobbra nem lehet számokat összeadni',
      'Mert a matematika szabályai ezt tiltják',
      'Mert a páros számok mindig jobbra állnak'
    ],
    correctAnswer: 'Mert az átvitel (maradék) jobbról balra halad a nagyobb helyiértékek felé',
    explanation: 'A tízesátlépésekből keletkező maradékok mindig a balra lévő nagyobb helyiértékhez adódnak hozzá.',
    hint: 'A maradékok balra vándorolnak.',
    breakdown: [
      { label: 'Ok', value: 'Átvitelek iránya: egyesek ➔ tízesek ➔ százasok' }
    ]
  },
  {
    id: 'l2-q10',
    level: 2,
    prompt: 'Mennyi a 628 + 199 összeadás eredménye a leggyorsabb trükkel?',
    highlightValue: '628 + 199 = ?',
    questionTypeBadge: 'Számolási trükk',
    options: ['827 (628 + 200 - 1)', '828', '817', '829'],
    correctAnswer: '827 (628 + 200 - 1)',
    explanation: '199 helyett adjunk hozzá 200-at és vonjunk le 1-et: 628 + 200 = 828, 828 - 1 = 827.',
    hint: '+ 199 = + 200 - 1.',
    breakdown: [
      { label: '199 helyett', value: '+ 200 = 828' },
      { label: 'Korrekció', value: '828 - 1 = 827' }
    ]
  },

  // =========================================================================
  // --- 3. SZINT: NEHÉZ (Többjegyű számok, rejtvények, többszörös átvitel) ---
  // =========================================================================
  {
    id: 'l3-q1',
    level: 3,
    prompt: 'Mennyi a 4 785 + 3 648 írásbeli összeadás pontos eredménye?',
    highlightValue: '4 785 + 3 648 = ?',
    questionTypeBadge: 'Négyjegyű összeadás',
    options: ['8 433', '8 423', '8 333', '7 433'],
    correctAnswer: '8 433',
    explanation: '5+8=13 (maradt 1); 8+4+1=13 (maradt 1); 7+6+1=14 (maradt 1); 4+3+1=8 ➔ 8 433.',
    hint: 'Minden oszlopban keletkezik átvitel (13, 13, 14, 8).',
    breakdown: [
      { label: 'Egyesek', value: '5 + 8 = 13 (átvitel: 1)' },
      { label: 'Tízesek', value: '8 + 4 + 1 = 13 (átvitel: 1)' },
      { label: 'Százasok', value: '7 + 6 + 1 = 14 (átvitel: 1)' },
      { label: 'Ezresek', value: '4 + 3 + 1 = 8' },
      { label: 'Összeg', value: '8 433' }
    ]
  },
  {
    id: 'l3-q2',
    level: 3,
    prompt: 'Mennyi a 6 890 + 2 345 összeadás eredménye?',
    highlightValue: '6 890 + 2 345 = ?',
    questionTypeBadge: 'Írásbeli összeadás',
    options: ['9 235', '9 135', '9 245', '8 235'],
    correctAnswer: '9 235',
    explanation: '0+5=5; 9+4=13 (maradt 1); 8+3+1=12 (maradt 1); 6+2+1=9 ➔ 9 235.',
    hint: '0+5=5, 9+4=13, 8+3+1=12, 6+2+1=9.',
    breakdown: [
      { label: 'Egyesek', value: '5' },
      { label: 'Tízesek', value: '13 (átvitel: 1)' },
      { label: 'Százasok', value: '12 (átvitel: 1)' },
      { label: 'Ezresek', value: '9' },
      { label: 'Összeg', value: '9 235' }
    ]
  },
  {
    id: 'l3-q3',
    level: 3,
    prompt: 'Melyik számjegyek hiányoznak: 2 _ 4 5 + 3 7 _ 8 = 6 6 3 3 ?',
    highlightValue: '2 _ 4 5 + 3 7 _ 8 = 6 6 3 3',
    questionTypeBadge: 'Rejtvény pótlás',
    options: ['Százasoknál: 8, Tízeseknél: 8', 'Százasoknál: 9, Tízeseknél: 8', 'Százasoknál: 8, Tízeseknél: 9', 'Százasoknál: 7, Tízeseknél: 8'],
    correctAnswer: 'Százasoknál: 8, Tízeseknél: 8',
    explanation: '6 633 - 3 788 = 2 845 (vagy 6 633 - 2 845 = 3 788). Mindkét hiányzó jegy 8.',
    hint: '6 633 - 3 788 = 2 845.',
    breakdown: [
      { label: '1. szám', value: '2 845' },
      { label: '2. szám', value: '3 788' },
      { label: 'Összeg', value: '6 633' }
    ]
  },
  {
    id: 'l3-q4',
    level: 3,
    prompt: 'Mennyi a 15 400 + 24 600 összeadás eredménye?',
    highlightValue: '15 400 + 24 600 = ?',
    questionTypeBadge: 'Ötjegyű összeadás',
    options: ['40 000', '39 000', '41 000', '40 500'],
    correctAnswer: '40 000',
    explanation: '15 400 + 24 600 = (15 000 + 24 000) + (400 + 600) = 39 000 + 1 000 = 40 000.',
    hint: '400 + 600 = 1 000, 15 000 + 24 000 + 1 000 = 40 000.',
    breakdown: [
      { label: 'Százasok', value: '400 + 600 = 1 000' },
      { label: 'Ezresek', value: '15 000 + 24 000 = 39 000' },
      { label: 'Összeg', value: '40 000' }
    ]
  },
  {
    id: 'l3-q5',
    level: 3,
    prompt: 'Négy szám összege: 1 250 + 3 750 + 2 100 + 2 900 = ?',
    highlightValue: '1 250 + 3 750 + 2 100 + 2 900 = ?',
    questionTypeBadge: 'Többtagú ügyes számolás',
    options: ['10 000', '9 500', '10 500', '11 000'],
    correctAnswer: '10 000',
    explanation: '(1 250 + 3 750) + (2 100 + 2 900) = 5 000 + 5 000 = 10 000.',
    hint: 'Párosítsd össze: (1250+3750=5000) és (2100+2900=5000).',
    breakdown: [
      { label: '1. pár', value: '1 250 + 3 750 = 5 000' },
      { label: '2. pár', value: '2 100 + 2 900 = 5 000' },
      { label: 'Összeg', value: '5 000 + 5 000 = 10 000' }
    ]
  },
  {
    id: 'l3-q6',
    level: 3,
    prompt: 'Mennyi a 9 999 + 1 összeadás eredménye?',
    highlightValue: '9 999 + 1 = ?',
    questionTypeBadge: 'Teljes átfordulás',
    options: ['10 000', '9 990', '10 999', '100 000'],
    correctAnswer: '10 000',
    explanation: 'A 9 999-hez 1-et adva az összes 9-es átfordul 0-ra, és a tízezresek helyére 1 kerül: 10 000.',
    hint: 'A legnagyobb 4-jegyű szám után a legkisebb 5-jegyű szám (10 000) jön.',
    breakdown: [
      { label: 'Művelet', value: '9 999 + 1' },
      { label: 'Eredmény', value: '10 000' }
    ]
  },
  {
    id: 'l3-q7',
    level: 3,
    prompt: 'Egy iskola 3 évfolyamára 148, 162 és 190 tanuló jár. Mennyi az iskola összes tanulójának száma?',
    highlightValue: '148 + 162 + 190 = ?',
    questionTypeBadge: 'Szöveges feladat',
    options: ['500', '490', '510', '480'],
    correctAnswer: '500',
    explanation: '148 + 162 = 310, 310 + 190 = 500 tanuló.',
    hint: '148 + 162 = 310, 310 + 190 = 500.',
    breakdown: [
      { label: '1. lépés', value: '148 + 162 = 310' },
      { label: '2. lépés', value: '310 + 190 = 500' }
    ]
  },
  {
    id: 'l3-q8',
    level: 3,
    prompt: 'Ha két szám összege 4 500, és az egyik tag 1 850, mennyi a másik tag?',
    highlightValue: 'Összeg = 4 500, Tag = 1 850',
    questionTypeBadge: 'Ismeretlen tag',
    options: ['2 650', '2 750', '2 550', '3 650'],
    correctAnswer: '2 650',
    explanation: 'Másik tag = Összeg - Ismert tag = 4 500 - 1 850 = 2 650.',
    hint: '4 500 - 1 850 = 2 650.',
    breakdown: [
      { label: 'Kivonás', value: '4 500 - 1 850' },
      { label: 'Másik tag', value: '2 650' }
    ]
  },
  {
    id: 'l3-q9',
    level: 3,
    prompt: 'Hogyan változik az összeg, ha az egyik tagot növeljük 150-nel, a másik tagot pedig növeljük 250-nel?',
    highlightValue: 'Tagok változása: +150 és +250',
    questionTypeBadge: 'Összeg változása',
    options: ['Az összeg 400-zal nő', 'Az összeg 100-zal nő', 'Az összeg változatlan marad', 'Az összeg 400-zal csökken'],
    correctAnswer: 'Az összeg 400-zal nő',
    explanation: 'Ha mindkét tagot növeljük, az összeg a növekmények összegével nő: 150 + 250 = 400-zal nő.',
    hint: '+ 150 + 250 = + 400.',
    breakdown: [
      { label: '1. növekmény', value: '+ 150' },
      { label: '2. növekmény', value: '+ 250' },
      { label: 'Összes növekmény', value: '+ 400' }
    ]
  },
  {
    id: 'l3-q10',
    level: 3,
    prompt: 'Mennyi a 45 678 + 34 567 írásbeli összeadás eredménye?',
    highlightValue: '45 678 + 34 567 = ?',
    questionTypeBadge: 'Ötjegyű írásbeli összeadás',
    options: ['80 245', '79 245', '80 145', '81 245'],
    correctAnswer: '80 245',
    explanation: '8+7=15 (átvitel 1); 7+6+1=14 (átvitel 1); 6+5+1=12 (átvitel 1); 5+4+1=10 (átvitel 1); 4+3+1=8 ➔ 80 245.',
    hint: '8+7=15, 7+6+1=14, 6+5+1=12, 5+4+1=10, 4+3+1=8 ➔ 80 245.',
    breakdown: [
      { label: 'Lépések', value: '15 ➔ 14 ➔ 12 ➔ 10 ➔ 8' },
      { label: 'Összeg', value: '80 245' }
    ]
  }
];

export const AdditionQuiz: React.FC<AdditionQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      topicId="g5-addition"
      topicTitle="Összeadás, írásbeli összeadás"
      grade={5}
      chapterId="egesz-szamok"
      title="Összeadás és Írásbeli Összeadás Kvíz"
      subtitle="Gyakorold a fejben és írásban összeadást, a maradék átvitelét és az ügyes csoportosítást!"
      topicBadge="5. Osztály • I. Az egész számok"
      questions={questions}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      matcherComponent={<AdditionMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<AdditionSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      levelHubProps={{
        level1: {
          title: '1. Szint: Alapok',
          subtitle: 'Fejben összeadás és kerek összegek',
          focus: 'Tag + Tag = Összeg, felcserélhetőség, csoportosíthatóság, nulla'
        },
        level2: {
          title: '2. Szint: Közepes',
          subtitle: 'Háromjegyű írásbeli összeadás',
          focus: 'Átlépéses összeadás, maradékok továbbvitele, hiányzó jegyek pótlása'
        },
        level3: {
          title: '3. Szint: Haladó',
          subtitle: 'Négyjegyű és ötjegyű számok',
          focus: 'Többjegyű és többtagú összeadás, szöveges feladatok, összeg változása'
        }
      }}
      cheatSheetContent={
        <div className="space-y-4 text-xs">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800">
            <h4 className="font-bold text-emerald-800 dark:text-emerald-300 mb-1">Műveleti Tulajdonságok:</h4>
            <p className="text-slate-700 dark:text-slate-300">
              • <strong>Felcserélhetőség:</strong> a + b = b + a<br />
              • <strong>Csoportosíthatóság:</strong> (a + b) + c = a + (b + c)<br />
              • <strong>Nulla:</strong> a + 0 = a (semleges elem).
            </p>
          </div>

          <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800">
            <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-1">Írásbeli szabályok:</h4>
            <p className="text-slate-700 dark:text-slate-300">
              • Egyes alá egyes, tízes alá tízes!<br />
              • Jobbról balra haladunk (egyesektől kezdve).<br />
              • A 10-et elérő vagy meghaladó összegek tízesét átvisszük a következő oszlopba.
            </p>
          </div>
        </div>
      }
    />
  );
};

export default AdditionQuiz;

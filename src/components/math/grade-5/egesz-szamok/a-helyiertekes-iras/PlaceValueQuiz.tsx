import React from 'react';
import { QuizTemplate, Question } from '../QuizTemplate';
import { PlaceValueMatcher } from './PlaceValueMatcher';
import { PlaceValueSorter } from './PlaceValueSorter';

export interface PlaceValueQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const questions: Question[] = [
  // ==========================================
  // --- 1. SZINT: KÖNNYŰ (100 – 9 999) ---
  // ==========================================
  {
    id: 'l1-q1',
    level: 1,
    prompt: 'Melyik számjegy áll a százasok helyiértékén a következő számban?',
    highlightValue: '4 523',
    questionTypeBadge: 'Helyiérték leolvasás',
    options: ['5', '4', '2', '3'],
    correctAnswer: '5',
    explanation: 'A 4 523 számban hátulról nézve: 3 az egyes, 2 a tízes, 5 a százas, 4 az ezres.',
    hint: 'A százasok a jobbról számított 3. helyen állnak (egyes, tízes, százas).',
    breakdown: [
      { label: 'Ezresek (E)', value: '4' },
      { label: 'Százasok (Sz)', value: '5' },
      { label: 'Tízesek (T)', value: '2' },
      { label: 'Egyesek (e)', value: '3' }
    ]
  },
  {
    id: 'l1-q2',
    level: 1,
    prompt: 'Mennyi a kiemelt 7-es számjegy valódi értéke?',
    highlightValue: '7 842',
    questionTypeBadge: 'Valódi érték',
    options: ['7 000', '700', '70', '7'],
    correctAnswer: '7 000',
    explanation: 'A 7-es az ezresek helyiértékén áll, ezért a valódi értéke: 7 · 1000 = 7000.',
    hint: 'Valódi érték = Alaki érték · Helyiérték (7 · 1 000).',
    breakdown: [
      { label: 'Alaki érték', value: '7' },
      { label: 'Helyiérték', value: '1 000' },
      { label: 'Valódi érték', value: '7 000' }
    ]
  },
  {
    id: 'l1-q3',
    level: 1,
    prompt: 'Melyik szám felel meg a következő helyiértékes összegnek?',
    highlightValue: '3E + 8Sz + 0T + 5e',
    questionTypeBadge: 'Összegalak ➔ Szám',
    options: ['3 805', '3 850', '3 085', '385'],
    correctAnswer: '3 805',
    explanation: '3000 + 800 + 0 + 5 = 3 805. A tízes helyiértéken 0 áll.',
    hint: 'Ügyelj a 0 helykitöltő szerepére a tízes helyen!',
    breakdown: [{ label: '3000 + 800 + 5', value: '3 805' }]
  },
  {
    id: 'l1-q4',
    level: 1,
    prompt: 'Mi a különbség az alaki érték és a helyiérték között a kiemelt számjegyre?',
    highlightValue: '6 391 (számjegy: 3)',
    questionTypeBadge: 'Alaki és helyiérték',
    options: [
      'Alaki értéke 3, helyiértéke 100',
      'Alaki értéke 300, helyiértéke 3',
      'Alaki értéke 100, helyiértéke 300',
      'Alaki értéke 3, helyiértéke 10'
    ],
    correctAnswer: 'Alaki értéke 3, helyiértéke 100',
    explanation: 'Az alaki érték maga a számjegy (3), a helyiérték a helye a számban (százasok = 100), valódi értéke pedig 3 · 100 = 300.',
    hint: 'Alaki érték = maga a leírt rajzolat (3), Helyiérték = a pozíció súlya (100).',
    breakdown: [
      { label: 'Alaki érték', value: '3' },
      { label: 'Helyiérték', value: '100 (százas)' },
      { label: 'Valódi érték', value: '300' }
    ]
  },
  {
    id: 'l1-q5',
    level: 1,
    prompt: 'Melyik a helyes helyiértékes összegalakja a számnak?',
    highlightValue: '2 460',
    questionTypeBadge: 'Helyiértékes felbontás',
    options: [
      '2000 + 400 + 60',
      '200 + 40 + 6',
      '2000 + 40 + 6',
      '2000 + 400 + 6'
    ],
    correctAnswer: '2000 + 400 + 60',
    explanation: '2 460 = 2 · 1000 + 4 · 100 + 6 · 10 + 0 · 1 = 2000 + 400 + 60.',
    hint: 'Bontsd valódi értékek összegére: 2000 + 400 + 60.',
    breakdown: [{ label: 'Összeg', value: '2000 + 400 + 60' }]
  },
  {
    id: 'l1-q6',
    level: 1,
    prompt: 'Hány százasból áll a következő szám?',
    highlightValue: '1 500',
    questionTypeBadge: 'Helyiérték átváltás',
    options: ['15 darab százas', '5 darab százas', '150 darab százas', '1 darab százas'],
    correctAnswer: '15 darab százas',
    explanation: '1 500 = 15 · 100, tehát 15 darab százasból áll.',
    hint: 'Oszd el a számot 100-zal: 1500 / 100 = 15.',
    breakdown: [
      { label: '1 500 : 100', value: '15' },
      { label: 'Eredmény', value: '15 százas' }
    ]
  },
  {
    id: 'l1-q7',
    level: 1,
    prompt: 'Melyik számjegynek a legkisebb a helyiértéke a számban?',
    highlightValue: '8 914',
    questionTypeBadge: 'Helyiérték sorrend',
    options: ['4 (egyesek)', '8 (ezresek)', '9 (százasok)', '1 (tízesek)'],
    correctAnswer: '4 (egyesek)',
    explanation: 'A legkisebb helyiérték az egyesek helye (1), amin a 4-es áll.',
    hint: 'A legkisebb helyiérték mindig a legutolsó, jobbszélső jegy (egyesek).',
    breakdown: [{ label: 'Legkisebb helyiérték', value: '1 (egyes)' }]
  },
  {
    id: 'l1-q8',
    level: 1,
    prompt: 'Mennyi a tízesek helyén álló számjegy valódi értéke?',
    highlightValue: '5 082',
    questionTypeBadge: 'Valódi érték',
    options: ['80', '8', '800', '0'],
    correctAnswer: '80',
    explanation: 'A tízesek helyén a 8-as áll, így valódi értéke 8 · 10 = 80.',
    hint: 'Keresd meg a tízes helyiértéken álló számjegyet, és szorozd 10-zel!',
    breakdown: [{ label: '8 · 10', value: '80' }]
  },
  {
    id: 'l1-q9',
    level: 1,
    prompt: 'Melyik szám keletkezik, ha a 6 325-ben felcseréljük az ezresek és tízesek helyén álló számjegyet?',
    highlightValue: '6 325',
    questionTypeBadge: 'Számjegycsere',
    options: ['2 365', '3 625', '6 235', '5 326'],
    correctAnswer: '2 365',
    explanation: 'Az ezresek helyén a 6-os, a tízesekén a 2-es állt. Csere után: 2 365.',
    hint: 'Az 1. jegy (6) és a 3. jegy (2) cserél helyet.',
    breakdown: [
      { label: 'Eredeti', value: '6 3 2 5' },
      { label: 'Csere (E ↔ T)', value: '2 3 6 5' }
    ]
  },
  {
    id: 'l1-q10',
    level: 1,
    prompt: 'Melyik a legnagyobb 4-jegyű szám, amely a 2, 0, 8, 5 számjegyekből kirakható (minden jegy egyszer szerepel)?',
    highlightValue: 'Számjegyek: 2, 0, 8, 5',
    questionTypeBadge: 'Számképzés',
    options: ['8 520', '8 502', '8 250', '5 820'],
    correctAnswer: '8 520',
    explanation: 'A legnagyobb számhoz a legnagyobb számjegyet kell a legnagyobb helyiértékre tenni: 8 520.',
    hint: 'Rendezd a számjegyeket csökkenő sorrendbe!',
    breakdown: [
      { label: 'Csökkenő sorrend', value: '8 > 5 > 2 > 0' },
      { label: 'Legnagyobb szám', value: '8 520' }
    ]
  },

  // ==========================================
  // --- 2. SZINT: KÖZEPES (10 000 – 999 999) ---
  // ==========================================
  {
    id: 'l2-q1',
    level: 2,
    prompt: 'Melyik számjegy áll a tízezresek helyiértékén a számban?',
    highlightValue: '548 921',
    questionTypeBadge: 'Tízezres helyiérték',
    options: ['4', '5', '8', '9'],
    correctAnswer: '4',
    explanation: 'Hátulról: 1 (e), 2 (T), 9 (Sz), 8 (E), 4 (Té = tízezres), 5 (Sze = százezres).',
    hint: 'Jobbról az 5. hely a tízezresek helye.',
    breakdown: [
      { label: 'Százezres', value: '5' },
      { label: 'Tízezres', value: '4' },
      { label: 'Ezres', value: '8' }
    ]
  },
  {
    id: 'l2-q2',
    level: 2,
    prompt: 'Mennyi a kiemelt 6-os számjegy valódi értéke?',
    highlightValue: '603 415',
    questionTypeBadge: 'Százezres valódi érték',
    options: ['600 000', '60 000', '6 000', '600'],
    correctAnswer: '600 000',
    explanation: 'A 6-os a százezresek helyén áll, így valódi értéke: 6 · 100 000 = 600 000.',
    hint: 'A 6-os a százezres helyen áll: 6 · 100 000.',
    breakdown: [
      { label: 'Alaki érték', value: '6' },
      { label: 'Helyiérték', value: '100 000' },
      { label: 'Valódi érték', value: '600 000' }
    ]
  },
  {
    id: 'l2-q3',
    level: 2,
    prompt: 'Melyik szám hiányzik a helyiértékes összegből?',
    highlightValue: '700 000 + ? + 400 + 20 + 9 = 750 429',
    questionTypeBadge: 'Hiányos felbontás',
    options: ['50 000', '5 000', '500 000', '500'],
    correctAnswer: '50 000',
    explanation: 'A tízezresek helyén az 5-ös áll, melynek valódi értéke 50 000.',
    hint: 'Nézd meg a tízezresek helyét: az 5 tízezres = 50 000.',
    breakdown: [{ label: 'Hiányzó tag', value: '50 000' }]
  },
  {
    id: 'l2-q4',
    level: 2,
    prompt: 'Melyik szám felel meg a következő leírásnak?',
    highlightValue: '4Sze + 0Té + 8E + 3Sz + 0T + 7e',
    questionTypeBadge: 'Helyiérték összerakás',
    options: ['408 307', '480 307', '48 307', '408 370'],
    correctAnswer: '408 307',
    explanation: '400 000 + 8000 + 300 + 7 = 408 307. A tízezres és tízes helyiértékeken 0 áll.',
    hint: 'Ügyelj a 0-kra a tízezres és tízes helyeken!',
    breakdown: [{ label: 'Szám', value: '408 307' }]
  },
  {
    id: 'l2-q5',
    level: 2,
    prompt: 'Hány darab ezresből áll a következő szám?',
    highlightValue: '85 000',
    questionTypeBadge: 'Ezresek száma',
    options: ['85', '850', '8,5', '8 500'],
    correctAnswer: '85',
    explanation: '85 000 = 85 · 1000, azaz pontosan 85 darab ezres.',
    hint: 'Oszd el a számot 1 000-rel!',
    breakdown: [{ label: '85 000 : 1000', value: '85 ezres' }]
  },
  {
    id: 'l2-q6',
    level: 2,
    prompt: 'Melyik állítás IGAZ a 304 050 számra?',
    highlightValue: '304 050',
    questionTypeBadge: 'Tulajdonság ellenőrzés',
    options: [
      'A tízezresek, százasok és egyesek helyén 0 áll.',
      'A százezresek helyén 4 áll.',
      'A tízesek helyén 0 áll.',
      'A valódi értéke kisebb, mint 30 000.'
    ],
    correctAnswer: 'A tízezresek, százasok és egyesek helyén 0 áll.',
    explanation: '3 (Sze), 0 (Té), 4 (E), 0 (Sz), 5 (T), 0 (e) -> A 0-k a tízezres, százas és egyes helyeken vannak.',
    hint: 'Írd be a számot a helyiérték-táblázatba!',
    breakdown: [{ label: 'Nullák helye', value: 'Té, Sz, e' }]
  },
  {
    id: 'l2-q7',
    level: 2,
    prompt: 'Mennyivel nő a 42 300 értéke, ha az ezresek számjegyét 5-tel megnöveljük?',
    highlightValue: '42 300 (ezresek +5)',
    questionTypeBadge: 'Értékváltozás',
    options: ['5 000-rel', '500-zal', '50 000-rel', '5-tel'],
    correctAnswer: '5 000-rel',
    explanation: 'Az ezresek helyiértéke 1000. Ha a számjegyet 5-tel növeljük, az érték 5 · 1000 = 5000-rel nő (47 300 lesz).',
    hint: 'Az ezres helyiérték 1 000-et ér: 5 · 1 000.',
    breakdown: [{ label: '5 · 1000', value: '5 000' }]
  },
  {
    id: 'l2-q8',
    level: 2,
    prompt: 'Melyik számjegy áll a százezresek helyén a 924 513-ban?',
    highlightValue: '924 513',
    questionTypeBadge: 'Helyiérték azonosítás',
    options: ['9', '2', '4', '5'],
    correctAnswer: '9',
    explanation: 'A 6-jegyű szám legelső (bal szélső) jegye a százezres, ami a 9-es.',
    hint: 'A 6 jegyű számok bal szélső jegye a százezres.',
    breakdown: [{ label: 'Százezres jegy', value: '9' }]
  },
  {
    id: 'l2-q9',
    level: 2,
    prompt: 'Melyik a helyes szorzatos felbontása a 640 050 számnak?',
    highlightValue: '640 050',
    questionTypeBadge: 'Szorzatos felbontás',
    options: [
      '6 · 100 000 + 4 · 10 000 + 5 · 10',
      '6 · 10 000 + 4 · 1 000 + 5 · 10',
      '6 · 100 000 + 4 · 1 000 + 5 · 1',
      '6 · 100 000 + 4 · 10 000 + 5 · 100'
    ],
    correctAnswer: '6 · 100 000 + 4 · 10 000 + 5 · 10',
    explanation: '6 · 100 000 = 600 000, 4 · 10 000 = 40 000, 5 · 10 = 50. Összegük: 640 050.',
    hint: '6 százezres + 4 tízezres + 5 tízes.',
    breakdown: [{ label: 'Szorzatösszeg', value: '600 000 + 40 000 + 50' }]
  },
  {
    id: 'l2-q10',
    level: 2,
    prompt: 'Melyik a legkisebb 6-jegyű szám, amelyben minden számjegy különböző?',
    highlightValue: '6 különböző számjegy',
    questionTypeBadge: 'Számképzés',
    options: ['102 345', '123 456', '100 000', '102 340'],
    correctAnswer: '102 345',
    explanation: 'A legelső jegy nem lehet 0, így 1-gyel kezdünk, majd növekvő sorrendben a legkisebb még fel nem használt jegyek: 0, 2, 3, 4, 5 -> 102 345.',
    hint: 'Kezdj 1-gyel (0 nem lehet elöl), utána a 0, 2, 3, 4, 5 következik.',
    breakdown: [{ label: 'Legkisebb szám', value: '102 345' }]
  },

  // ==========================================
  // --- 3. SZINT: NEHÉZ (1 000 000+) ---
  // ==========================================
  {
    id: 'l3-q1',
    level: 3,
    prompt: 'Hány darab tízezres ad ki pontosan 1 milliót (1 000 000)?',
    highlightValue: '1 000 000 : 10 000 = ?',
    questionTypeBadge: 'Helyiérték arány',
    options: ['100 darab', '10 darab', '1 000 darab', '50 darab'],
    correctAnswer: '100 darab',
    explanation: '1 000 000 : 10 000 = 100. Száz darab tízezres ér 1 milliót.',
    hint: 'Oszd el az 1 000 000-t 10 000-rel (vágj le 4 nullát).',
    breakdown: [{ label: '1 000 000 : 10 000', value: '100' }]
  },
  {
    id: 'l3-q2',
    level: 3,
    prompt: 'Melyik szám felel meg a következő szorzatos alaknak?',
    highlightValue: '8 · 100 000 + 5 · 1 000 + 4 · 10',
    questionTypeBadge: 'Szorzatösszeg',
    options: ['805 040', '850 040', '805 400', '85 040'],
    correctAnswer: '805 040',
    explanation: '800 000 + 5 000 + 40 = 805 040.',
    hint: '8 százezres (800 000) + 5 ezres (5 000) + 4 tízes (40).',
    breakdown: [
      { label: '8 · 100 000', value: '800 000' },
      { label: '5 · 1 000', value: '5 000' },
      { label: '4 · 10', value: '40' },
      { label: 'Összeg', value: '805 040' }
    ]
  },
  {
    id: 'l3-q3',
    level: 3,
    prompt: 'Egy 6-jegyű számban a százezresek valódi értéke 400 000, a tízeseké 70, a többi helyiértéken 0 áll. Mi a szám?',
    highlightValue: '400 000 és 70',
    questionTypeBadge: 'Szöveges helyiérték',
    options: ['400 070', '40 070', '400 700', '4 000 070'],
    correctAnswer: '400 070',
    explanation: '400 000 + 70 = 400 070.',
    hint: '400 000 + 70 összege.',
    breakdown: [{ label: 'Szám', value: '400 070' }]
  },
  {
    id: 'l3-q4',
    level: 3,
    prompt: 'Mennyivel nagyobb a 6-os valódi értéke az 5-ös valódi értékénél a számban?',
    highlightValue: '652 000',
    questionTypeBadge: 'Valódi értékek különbsége',
    options: ['550 000', '600 000', '50 000', '100 000'],
    correctAnswer: '550 000',
    explanation: 'A 6-os valódi értéke 600 000, az 5-ösé 50 000. Különbségük: 600 000 - 50 000 = 550 000.',
    hint: '600 000 - 50 000 = 550 000.',
    breakdown: [
      { label: '6-os értéke', value: '600 000' },
      { label: '5-ös értéke', value: '50 000' },
      { label: 'Különbség', value: '550 000' }
    ]
  },
  {
    id: 'l3-q5',
    level: 3,
    prompt: 'Melyik a legnagyobb 5-jegyű páros szám, amelyben a tízezresek helyén 7 áll, és minden jegye különböző?',
    highlightValue: 'Feltételek: 5-jegyű, páros, Té=7, különböző jegyek',
    questionTypeBadge: 'Összetett számképzés',
    options: ['79 864', '79 854', '79 862', '78 964'],
    correctAnswer: '79 864',
    explanation: 'Tízezres: 7. A lehető legnagyobb jegyek: 9, 8, 6, és a legvégére páros jegy kell, ami a még elérhető legnagyobb páros: 4 -> 79 864.',
    hint: 'A legnagyobb jegyek a legmagasabb helyekre kerülnek, az utolsó jegynek párosnak kell lennie.',
    breakdown: [{ label: 'Keresett szám', value: '79 864' }]
  },
  {
    id: 'l3-q6',
    level: 3,
    prompt: 'Hány darab tízesből áll a 34 000 szám?',
    highlightValue: '34 000 : 10 = ?',
    questionTypeBadge: 'Tízesek száma',
    options: ['3 400', '340', '34', '34 000'],
    correctAnswer: '3 400',
    explanation: '34 000 : 10 = 3 400. Tehát 3 400 darab tízesből áll.',
    hint: 'Oszd el a számot 10-zel!',
    breakdown: [{ label: '34 000 : 10', value: '3 400 tízes' }]
  },
  {
    id: 'l3-q7',
    level: 3,
    prompt: 'Ha egy számot megszorzunk 100-zal, hogyan változik az egyes számjegyek helyiértéke?',
    highlightValue: 'Szorzás 100-zal',
    questionTypeBadge: 'Helyiérték eltolódás',
    options: [
      'Minden számjegy 2 hellyel balra tolódik (100-szoros helyiértékre).',
      'Minden számjegy 1 hellyel balra tolódik.',
      'Minden számjegy 2 hellyel jobbra tolódik.',
      'A helyiértékek nem változnak, csak a szám nő.'
    ],
    correctAnswer: 'Minden számjegy 2 hellyel balra tolódik (100-szoros helyiértékre).',
    explanation: '100-zal való szorzáskor a tízes rendszerben minden jegy két helyiértékkel balra vándorol (pl. az egyesből százas lesz).',
    hint: '10-zel szorzás = 1 hely balra, 100-zal szorzás = 2 hely balra.',
    breakdown: [{ label: 'Eltolódás', value: '2 hellyel balra' }]
  },
  {
    id: 'l3-q8',
    level: 3,
    prompt: 'Melyik szám egyenlő a következő kifejezéssel: 9Sze + 99E + 9e?',
    highlightValue: '9Sze + 99E + 9e',
    questionTypeBadge: 'Összevont helyiérték',
    options: ['999 009', '909 909', '999 090', '990 009'],
    correctAnswer: '999 009',
    explanation: '900 000 + 99 000 + 9 = 999 009.',
    hint: '900 000 + 99 000 + 9 = 999 009.',
    breakdown: [
      { label: '9 Sze', value: '900 000' },
      { label: '99 E', value: '99 000' },
      { label: '9 e', value: '9' },
      { label: 'Összeg', value: '999 009' }
    ]
  },
  {
    id: 'l3-q9',
    level: 3,
    prompt: 'Hány olyan 4-jegyű szám létezik, amelynek az ezresek helyén 5 áll, és minden más helyiértéken 0?',
    highlightValue: 'Ezres = 5, többi = 0',
    questionTypeBadge: 'Kombinatorika / Helyiérték',
    options: ['Pontosan 1 (az 5000)', '10 darab', '100 darab', 'Végtelen sok'],
    correctAnswer: 'Pontosan 1 (az 5000)',
    explanation: 'Csak az 5 000 felel meg a leírásnak.',
    hint: '5 (E) + 0 (Sz) + 0 (T) + 0 (e) -> 5 000.',
    breakdown: [{ label: 'Megoldás', value: '5 000 (1 db)' }]
  },
  {
    id: 'l3-q10',
    level: 3,
    prompt: 'Melyik szám a legnagyobb az alábbiak közül?',
    highlightValue: 'Összehasonlítás',
    options: [
      '5 · 100 000 + 9 · 10 000',
      '550 000',
      '580 000 + 9 000',
      '6 · 100 000 - 15 000'
    ],
    correctAnswer: '5 · 100 000 + 9 · 10 000',
    explanation: 'A: 590 000, B: 550 000, C: 589 000, D: 585 000. A legnagyobb az 590 000 (5 · 100 000 + 9 · 10 000).',
    hint: 'Számold ki mindegyik értékét: 590 000 a legnagyobb.',
    breakdown: [
      { label: 'A', value: '590 000 (Legnagyobb)' },
      { label: 'B', value: '550 000' },
      { label: 'C', value: '589 000' },
      { label: 'D', value: '585 000' }
    ]
  }
];

export const PlaceValueQuiz: React.FC<PlaceValueQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="A helyiértékes írás – Kvíz"
      subtitle="30 feladat 3 nehézségi szinten: alaki, helyi- és valódi érték, helyiérték-táblázat, szorzatos felbontás"
      questions={questions}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      documentId="grade-5-place-value-quiz"
      pdfFilename="5_osztaly_helyiertekes_iras_kviz.pdf"
      badgeText="🔢 5. Osztály • I. Az egész számok"
      badgeColor="blue"
      matcherComponent={<PlaceValueMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<PlaceValueSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      cheatSheets={[
        {
          title: "A Háromféle Érték",
          items: [
            "Alaki érték: Maga a leírt számjegy (0, 1, ..., 9)",
            "Helyiérték: A pozíció súlya (e = 1, T = 10, Sz = 100, E = 1 000...)",
            "Valódi érték: Alaki érték · Helyiérték (pl. 7 · 100 = 700)"
          ]
        },
        {
          title: "Helyiértékek Sorrendje",
          items: [
            "e (egyes) = 1 (10⁰)",
            "T (tízes) = 10 (10¹)",
            "Sz (százas) = 100 (10²)",
            "E (ezres) = 1 000 (10³)",
            "Té (tízezres) = 10 000 (10⁴)",
            "Sze (százezres) = 100 000 (10⁵)",
            "M (milliós) = 1 000 000 (10⁶)"
          ]
        },
        {
          title: "Felbontási Formák",
          items: [
            "Összegalak: 458 203 = 400 000 + 50 000 + 8 000 + 200 + 3",
            "Szorzatos alak: 4·100 000 + 5·10 000 + 8·1 000 + 2·100 + 3·1",
            "A 0-t mint helykitöltőt nem hagyhatjuk el a szám leírásakor!"
          ]
        }
      ]}
    />
  );
};

export default PlaceValueQuiz;

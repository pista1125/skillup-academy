import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { NumbersLettersMatcher } from './NumbersLettersMatcher';
import { NumbersLettersSorter } from './NumbersLettersSorter';
import {
  Sparkles,
  Variable,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Shapes,
  Hash,
  BookOpen,
  Calculator,
  Divide,
  Scale
} from 'lucide-react';

interface NumbersLettersQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Mi az együttható?',
    icon: <Hash className="w-4 h-4 text-purple-600" />,
    formula: '5x ⟹ együttható: 5,  -3ab ⟹ együttható: -3',
    note: 'Az algebrai tagban a változót szorzó konkrét számérték. Ha nincs kiírva szám, akkor x = 1x (együttható: 1), -x = -1x (együttható: -1).'
  },
  {
    id: 'c2',
    title: 'Szorzáspont elhagyása',
    icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
    formula: '4 · a = 4a,  a · b = ab,  3 · (x + 2) = 3(x + 2)',
    note: 'Szám és betű, illetve betűk között a szorzásjel elhagyható. Két szám között viszont kötelező: 2 · 3 ≠ 23!'
  },
  {
    id: 'c3',
    title: 'Összeg és Különbség átírása',
    icon: <Variable className="w-4 h-4 text-indigo-600" />,
    formula: '„k-val több”: + k,  „k-val kevesebb”: - k',
    note: 'Figyelj a sorrendre: „vonjunk ki a-ból 5-öt” ⟹ a - 5, de „vonjunk ki 5-ből a-t” ⟹ 5 - a.'
  },
  {
    id: 'c4',
    title: 'Szorzat és Hányados átírása',
    icon: <Divide className="w-4 h-4 text-cyan-600" />,
    formula: '„k-szorosa”: k · x,  „fele / harmada”: x/2, x/3',
    note: 'A törtek és hányadosok egyaránt írhatók osztásjellel (:) vagy törtvonallal (/ vagy tört alakban).'
  },
  {
    id: 'c5',
    title: 'Zárójelek a szövegben',
    icon: <Layers className="w-4 h-4 text-amber-600" />,
    formula: '„összegének k-szorosa”: k · (a + b)',
    note: 'Ha a szöveg egy összeg vagy különbség többszörösét kéri, az összeget zárójelbe kell tenni!'
  },
  {
    id: 'c6',
    title: 'Geometriai alapképletek',
    icon: <Shapes className="w-4 h-4 text-rose-600" />,
    formula: 'Négyzet: K = 4a, T = a²  |  Téglalap: K = 2(a+b), T = ab',
    note: 'A képletekben a betűk a geometriai alakzatok oldalait jelölik.'
  }
];

const quizLevels: Record<1 | 2 | 3, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Együtthatók & Alap Kifejezések',
    subtitle: 'Változók bevezetése, együtthatók azonosítása és egyszerű kifejezések felírása',
    range: '1 - 10. feladat',
    focus: 'Együtthatók & Alap Kifejezések',
    badgeBg: 'bg-purple-50 dark:bg-purple-950/40',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    badgeText: 'text-purple-700 dark:text-purple-300',
    iconBg: 'bg-purple-600 text-white',
    questions: [
      {
        id: 'q1-1',
        prompt: 'Mi a 7x kifejezésben az x együtthatója?',
        question: 'Mi a 7x kifejezésben az x együtthatója?',
        options: ['7', 'x', '7x', '1'],
        correctAnswer: '7',
        explanation: 'Az együttható az algebrai tagban szereplő számtényező, amely itt a 7.',
        breakdown: [
          { label: 'Algebrai tag', value: '7x' },
          { label: 'Számtényező (együttható)', value: '7' },
          { label: 'Változó', value: 'x' }
        ]
      },
      {
        id: 'q1-2',
        prompt: 'Mi a -x kifejezésben az együttható?',
        question: 'Mi a -x kifejezésben az együttható?',
        options: ['-1', '0', '1', '-x'],
        correctAnswer: '-1',
        explanation: 'Ha a változó előtt csak egy negatív előjel áll, a rejtett számszorzó -1: -x = -1 · x.',
        breakdown: [
          { label: 'Kifejezés', value: '-x' },
          { label: 'Kifejtve', value: '-1 · x' },
          { label: 'Együttható', value: '-1' }
        ]
      },
      {
        id: 'q1-3',
        prompt: 'Hogyan írjuk fel algebrai kifejezéssel: „egy szám 5-tel nagyobb” (legyen a szám x)?',
        question: 'Hogyan írjuk fel algebrai kifejezéssel: „egy szám 5-tel nagyobb” (legyen a szám x)?',
        options: ['x + 5', '5x', 'x - 5', '5 - x'],
        correctAnswer: 'x + 5',
        explanation: 'A „valamennyivel nagyobb” mindig összeadást jelent az adott számmal: x + 5.',
        breakdown: [
          { label: 'Kezdő szám', value: 'x' },
          { label: '5-tel növelés', value: '+ 5' },
          { label: 'Végeredmény', value: 'x + 5' }
        ]
      },
      {
        id: 'q1-4',
        prompt: 'Hogyan írjuk fel algebrai kifejezéssel: „egy szám négyszerese” (legyen a szám y)?',
        question: 'Hogyan írjuk fel algebrai kifejezéssel: „egy szám négyszerese” (legyen a szám y)?',
        options: ['4y', 'y + 4', 'y / 4', 'y⁴'],
        correctAnswer: '4y',
        explanation: 'A négyszeres a számmal való szorzást jelenti: 4 · y = 4y.',
        breakdown: [
          { label: 'Szám', value: 'y' },
          { label: '4-szeres szorzás', value: '4 · y' },
          { label: 'Szorzáspont elhagyásával', value: '4y' }
        ]
      },
      {
        id: 'q1-5',
        prompt: 'Melyik állítás IGAZ a szorzásjel elhagyásával kapcsolatban?',
        question: 'Melyik állítás IGAZ a szorzásjel elhagyásával kapcsolatban?',
        options: [
          'Szám és betű között (pl. 3x) elhagyható a pont',
          'Két konkrét szám között (pl. 3 · 4 = 34) is elhagyható',
          'Összeadásjel helyett is elhagyható',
          'Soha nem szabad elhagyni a szorzásjelet'
        ],
        correctAnswer: 'Szám és betű között (pl. 3x) elhagyható a pont',
        explanation: 'Csak szám és változó (3x), illetve változók között (ab) hagyható el a pont. Két szám között a 3 · 4 nem lehet 34!',
        breakdown: [
          { label: 'Helyes alak', value: '3 · x = 3x' },
          { label: 'Hibás elhagyás', value: '3 · 4 ≠ 34' }
        ]
      },
      {
        id: 'q1-6',
        prompt: 'Hogyan írjuk fel algebrai alakban: „egy szám harmada” (a szám legyen n)?',
        question: 'Hogyan írjuk fel algebrai alakban: „egy szám harmada” (a szám legyen n)?',
        options: ['n / 3', '3n', 'n - 3', 'n + 3'],
        correctAnswer: 'n / 3',
        explanation: 'Egy szám harmada a 3-mal való osztást (vagy 1/3-dal való szorzást) jelenti: n / 3 vagy (1/3)n.',
        breakdown: [
          { label: 'Szám', value: 'n' },
          { label: 'Harmadrész', value: 'n : 3 = n / 3' }
        ]
      },
      {
        id: 'q1-7',
        prompt: 'Mi az együttható a -3/4 a² kifejezésben?',
        question: 'Mi az együttható a -3/4 a² kifejezésben?',
        options: ['-3/4', '3/4', 'a²', '-3'],
        correctAnswer: '-3/4',
        explanation: 'Az a² változó előtti teljes számtényező a negatív tört: -3/4.',
        breakdown: [
          { label: 'Kifejezés', value: '-3/4 a²' },
          { label: 'Együttható', value: '-3/4' }
        ]
      },
      {
        id: 'q1-8',
        prompt: 'Hogyan jelöljük algebrai kifejezéssel: „két szám (a és b) összege”?',
        question: 'Hogyan jelöljük algebrai kifejezéssel: „két szám (a és b) összege”?',
        options: ['a + b', 'ab', 'a - b', 'a / b'],
        correctAnswer: 'a + b',
        explanation: 'Az összeg két mennyiség összeadását jelenti: a + b.',
        breakdown: [
          { label: 'Művelet', value: 'Összeadás' },
          { label: 'Alak', value: 'a + b' }
        ]
      },
      {
        id: 'q1-9',
        prompt: 'Hogyan írjuk fel: „egy szám ellentettje” (ha a szám k)?',
        question: 'Hogyan írjuk fel: „egy szám ellentettje” (ha a szám k)?',
        options: ['-k', '1/k', 'k - 1', 'k²'],
        correctAnswer: '-k',
        explanation: 'Egy szám ellentettjét a szám elé írt negatív előjellel képezzük: -k.',
        breakdown: [
          { label: 'Eredeti', value: 'k' },
          { label: 'Ellentett', value: '-k' }
        ]
      },
      {
        id: 'q1-10',
        prompt: 'Ha egy golyóstoll ára x Ft, mennyibe kerül 6 darab ilyen toll?',
        question: 'Ha egy golyóstoll ára x Ft, mennyibe kerül 6 darab ilyen toll?',
        options: ['6x Ft', 'x + 6 Ft', 'x / 6 Ft', '6 + x Ft'],
        correctAnswer: '6x Ft',
        explanation: '6 azonos árú tollért a darabár 6-szorosát fizetjük: 6 · x = 6x Ft.',
        breakdown: [
          { label: '1 toll ára', value: 'x Ft' },
          { label: '6 toll ára', value: '6 · x = 6x Ft' }
        ]
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Zárójelek & Szöveges Átírás',
    subtitle: 'Összetettebb nyelvi kifejezések, műveleti sorrend és zárójeles kifejezések',
    range: '11 - 20. feladat',
    focus: 'Zárójelek & Szöveges Átírás',
    badgeBg: 'bg-indigo-50 dark:bg-indigo-950/40',
    badgeBorder: 'border-indigo-200 dark:border-indigo-800',
    badgeText: 'text-indigo-700 dark:text-indigo-300',
    iconBg: 'bg-indigo-600 text-white',
    questions: [
      {
        id: 'q2-1',
        prompt: 'Hogyan írjuk fel: „egy szám 3-szorosánál 5-tel több” (a szám x)?',
        question: 'Hogyan írjuk fel: „egy szám 3-szorosánál 5-tel több” (a szám x)?',
        options: ['3x + 5', '3(x + 5)', '5x + 3', '3x - 5'],
        correctAnswer: '3x + 5',
        explanation: 'Előbb vesszük az x 3-szorosát (3x), majd hozzáadunk 5-öt (+ 5) ⟹ 3x + 5.',
        breakdown: [
          { label: '1. lépés (szorzás)', value: '3 · x = 3x' },
          { label: '2. lépés (hozzáadás)', value: '3x + 5' }
        ]
      },
      {
        id: 'q2-2',
        prompt: 'Hogyan írjuk fel: „egy szám 5-tel növelt értékének a háromszorosa” (a szám x)?',
        question: 'Hogyan írjuk fel: „egy szám 5-tel növelt értékének a háromszorosa” (a szám x)?',
        options: ['3(x + 5)', '3x + 5', '3x + 15', 'x + 15'],
        correctAnswer: '3(x + 5)',
        explanation: 'Előbb növeljük az x-et 5-tel, amit zárójelbe zárunk: (x + 5), majd ezt szorozzuk 3-mal: 3(x + 5).',
        breakdown: [
          { label: '1. lépés (növelés)', value: '(x + 5)' },
          { label: '2. lépés (3-szorozás)', value: '3 · (x + 5) = 3(x + 5)' }
        ]
      },
      {
        id: 'q2-3',
        prompt: 'Hogyan írjuk fel: „vonjunk ki egy számból (y) 12-t”?',
        question: 'Hogyan írjuk fel: „vonjunk ki egy számból (y) 12-t”?',
        options: ['y - 12', '12 - y', '12 / y', '-12y'],
        correctAnswer: 'y - 12',
        explanation: 'Az y számból vonunk ki 12-t, tehát az y a kisebbítendő: y - 12.',
        breakdown: [
          { label: 'Kisebbítendő', value: 'y' },
          { label: 'Kivonandó', value: '12' },
          { label: 'Különbség', value: 'y - 12' }
        ]
      },
      {
        id: 'q2-4',
        prompt: 'Hogyan írjuk fel: „vonjunk ki 12-ből egy számot (y)”?',
        question: 'Hogyan írjuk fel: „vonjunk ki 12-ből egy számot (y)”?',
        options: ['12 - y', 'y - 12', '12 + y', '-12y'],
        correctAnswer: '12 - y',
        explanation: 'A 12-ből vonunk ki y-t, tehát a 12 a kisebbítendő: 12 - y.',
        breakdown: [
          { label: 'Kisebbítendő', value: '12' },
          { label: 'Kivonandó', value: 'y' },
          { label: 'Különbség', value: '12 - y' }
        ]
      },
      {
        id: 'q2-5',
        prompt: 'Hogyan írjuk fel: „két szám összegének négyzete”?',
        question: 'Hogyan írjuk fel: „két szám összegének négyzete”?',
        options: ['(a + b)²', 'a² + b²', '2(a + b)', 'a²b²'],
        correctAnswer: '(a + b)²',
        explanation: 'Először az összeget képezzük: (a + b), és a teljes összeg van négyzetre emelve: (a + b)².',
        breakdown: [
          { label: 'Összeg', value: '(a + b)' },
          { label: 'Négyzetre emelve', value: '(a + b)²' }
        ]
      },
      {
        id: 'q2-6',
        prompt: 'Hogyan írjuk fel: „két szám négyzetének összege”?',
        question: 'Hogyan írjuk fel: „két szám négyzetének összege”?',
        options: ['a² + b²', '(a + b)²', '2a + 2b', '(ab)²'],
        correctAnswer: 'a² + b²',
        explanation: 'Először külön-külön négyzetre emeljük a számokat (a² és b²), majd ezeket összeadjuk: a² + b².',
        breakdown: [
          { label: 'Külön négyzetek', value: 'a² és b²' },
          { label: 'Összegük', value: 'a² + b²' }
        ]
      },
      {
        id: 'q2-7',
        prompt: 'Hány tagból áll a 3x² - 5x + 8 algebrai kifejezés?',
        question: 'Hány tagból áll a 3x² - 5x + 8 algebrai kifejezés?',
        options: ['3 tagból', '2 tagból', '1 tagból', '4 tagból'],
        correctAnswer: '3 tagból',
        explanation: 'Az összeadás és kivonás jelei tagokra bontják a kifejezést: 1. tag: 3x², 2. tag: -5x, 3. tag: +8.',
        breakdown: [
          { label: '1. tag', value: '3x²' },
          { label: '2. tag', value: '-5x' },
          { label: '3. tag', value: '8' }
        ]
      },
      {
        id: 'q2-8',
        prompt: 'Hogyan írjuk fel: „egy szám felének és 7-nek a különbsége” (a szám x)?',
        question: 'Hogyan írjuk fel: „egy szám felének és 7-nek a különbsége” (a szám x)?',
        options: ['x/2 - 7', '(x - 7)/2', '2x - 7', '7 - x/2'],
        correctAnswer: 'x/2 - 7',
        explanation: 'A szám fele: x/2, ebből vonunk ki 7-et ⟹ x/2 - 7.',
        breakdown: [
          { label: 'Szám fele', value: 'x / 2' },
          { label: 'Kivonás', value: 'x/2 - 7' }
        ]
      },
      {
        id: 'q2-9',
        prompt: 'Hogyan írjuk fel: „egy szám 7-tel csökkentett értékének a fele” (a szám x)?',
        question: 'Hogyan írjuk fel: „egy szám 7-tel csökkentett értékének a fele” (a szám x)?',
        options: ['(x - 7) / 2', 'x/2 - 7', '2(x - 7)', 'x - 7/2'],
        correctAnswer: '(x - 7) / 2',
        explanation: 'Előbb csökkentjük 7-tel: (x - 7), majd ezt osztjuk 2-vel ⟹ (x - 7) / 2.',
        breakdown: [
          { label: 'Csökkentett érték', value: '(x - 7)' },
          { label: 'Fele', value: '(x - 7) / 2' }
        ]
      },
      {
        id: 'q2-10',
        prompt: 'Peti x éves, húga 4 évvel fiatalabb nála. Hány éves a két testvér együtt?',
        question: 'Peti x éves, húga 4 évvel fiatalabb nála. Hány éves a két testvér együtt?',
        options: ['x + (x - 4)', 'x + 4', '4x', '2x + 4'],
        correctAnswer: 'x + (x - 4)',
        explanation: 'Peti életkora x, a húgáé (x - 4). Ketten együtt: x + (x - 4) = 2x - 4.',
        breakdown: [
          { label: 'Peti', value: 'x' },
          { label: 'Húg', value: 'x - 4' },
          { label: 'Összesen', value: 'x + (x - 4)' }
        ]
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Geometria & Összetett Modellek',
    subtitle: 'Kerület, terület kifejezése betűkkel, többváltozós és valós problémák modellezése',
    range: '21 - 30. feladat',
    focus: 'Geometria & Összetett Modellek',
    badgeBg: 'bg-cyan-50 dark:bg-cyan-950/40',
    badgeBorder: 'border-cyan-200 dark:border-cyan-800',
    badgeText: 'text-cyan-700 dark:text-cyan-300',
    iconBg: 'bg-cyan-600 text-white',
    questions: [
      {
        id: 'q3-1',
        prompt: 'Egy téglalap egyik oldala a, a másik oldala 3 cm-rel hosszabb (a + 3). Mennyi a téglalap kerülete (K)?',
        question: 'Egy téglalap egyik oldala a, a másik oldala 3 cm-rel hosszabb (a + 3). Mennyi a téglalap kerülete (K)?',
        options: ['2[a + (a + 3)]', 'a · (a + 3)', '2a + 3', '4a + 3'],
        correctAnswer: '2[a + (a + 3)]',
        explanation: 'A téglalap kerülete: K = 2(oldal1 + oldal2) = 2(a + a + 3) = 2(2a + 3) = 4a + 6.',
        breakdown: [
          { label: 'Oldalak', value: 'a és (a + 3)' },
          { label: 'Kerület képlete', value: 'K = 2(oldal1 + oldal2)' },
          { label: 'Behelyettesítve', value: '2[a + (a + 3)]' }
        ]
      },
      {
        id: 'q3-2',
        prompt: 'Egy téglalap egyik oldala x, másik oldala y. Hogyan fejezzük ki a területét (T)?',
        question: 'Egy téglalap egyik oldala x, másik oldala y. Hogyan fejezzük ki a területét (T)?',
        options: ['T = xy', 'T = 2(x + y)', 'T = x + y', 'T = x² + y²'],
        correctAnswer: 'T = xy',
        explanation: 'A téglalap területe az oldalak szorzata: T = x · y = xy.',
        breakdown: [
          { label: 'Terület képlete', value: 'T = a · b' },
          { label: 'Betűkkel', value: 'T = x · y = xy' }
        ]
      },
      {
        id: 'q3-3',
        prompt: 'Egy négyzet oldala 2a. Mennyi a négyzet területe (T)?',
        question: 'Egy négyzet oldala 2a. Mennyi a négyzet területe (T)?',
        options: ['(2a)² = 4a²', '2a²', '8a', '4a'],
        correctAnswer: '(2a)² = 4a²',
        explanation: 'A terület az oldal négyzete: T = (2a)² = 2² · a² = 4a².',
        breakdown: [
          { label: 'Oldal', value: '2a' },
          { label: 'Négyzetre emelés', value: '(2a)²' },
          { label: 'Kifejtve', value: '4a²' }
        ]
      },
      {
        id: 'q3-4',
        prompt: 'Egy négyzet oldala 2a. Mennyi a kerülete (K)?',
        question: 'Egy négyzet oldala 2a. Mennyi a kerülete (K)?',
        options: ['8a', '4a', '4a²', '2a + 4'],
        correctAnswer: '8a',
        explanation: 'A négyzet kerülete: K = 4 · oldal = 4 · (2a) = 8a.',
        breakdown: [
          { label: 'Kerület képlete', value: 'K = 4 · oldal' },
          { label: 'Számolás', value: '4 · (2a) = 8a' }
        ]
      },
      {
        id: 'q3-5',
        prompt: 'Anna vásárolt x db füzetet (300 Ft/db) és y db ceruzát (150 Ft/db). Mennyit fizetett összesen?',
        question: 'Anna vásárolt x db füzetet (300 Ft/db) és y db ceruzát (150 Ft/db). Mennyit fizetett összesen?',
        options: ['300x + 150y', '(300 + 150)(x + y)', '450xy', '300y + 150x'],
        correctAnswer: '300x + 150y',
        explanation: 'A füzetek ára 300x Ft, a ceruzáké 150y Ft. Összesen: 300x + 150y Ft.',
        breakdown: [
          { label: 'Füzetek', value: '300 · x = 300x' },
          { label: 'Ceruzák', value: '150 · y = 150y' },
          { label: 'Összeg', value: '300x + 150y' }
        ]
      },
      {
        id: 'q3-6',
        prompt: 'Hogyan írjuk fel: „két egymást követő egész szám szorzata” (ha a kisebbik szám n)?',
        question: 'Hogyan írjuk fel: „két egymást követő egész szám szorzata” (ha a kisebbik szám n)?',
        options: ['n(n + 1)', 'n + (n + 1)', 'n · 2n', 'n² + 1'],
        correctAnswer: 'n(n + 1)',
        explanation: 'Ha az első szám n, a következő szám (n + 1). Szorzatuk: n · (n + 1) = n(n + 1).',
        breakdown: [
          { label: '1. szám', value: 'n' },
          { label: '2. szám', value: 'n + 1' },
          { label: 'Szorzatuk', value: 'n(n + 1)' }
        ]
      },
      {
        id: 'q3-7',
        prompt: 'Hogyan írjuk fel: „egy kétjegyű szám, amelynek tízes helyiértékén a, egyes helyiértékén b áll”?',
        question: 'Hogyan írjuk fel: „egy kétjegyű szám, amelynek tízes helyiértékén a, egyes helyiértékén b áll”?',
        options: ['10a + b', 'ab', 'a + b', '10(a + b)'],
        correctAnswer: '10a + b',
        explanation: 'A helyiértékes felírás szerint az a tízeseket jelöl (10 · a), a b pedig egyeseket (1 · b) ⟹ 10a + b.',
        breakdown: [
          { label: 'Tízesek', value: '10 · a' },
          { label: 'Egyesek', value: 'b' },
          { label: 'Számérték', value: '10a + b' }
        ]
      },
      {
        id: 'q3-8',
        prompt: 'Egy osztályban f fiú és l lány van. A tanulók harmadrésze szemüveges. Hányan szemüvegesek?',
        question: 'Egy osztályban f fiú és l lány van. A tanulók harmadrésze szemüveges. Hányan szemüvegesek?',
        options: ['(f + l) / 3', 'f/3 + l', '3(f + l)', 'f + l/3'],
        correctAnswer: '(f + l) / 3',
        explanation: 'Az összes tanuló létszáma (f + l). Ennek a harmadrésze: (f + l) / 3.',
        breakdown: [
          { label: 'Összlétszám', value: 'f + l' },
          { label: 'Harmadrész', value: '(f + l) / 3' }
        ]
      },
      {
        id: 'q3-9',
        prompt: 'Egy háromszög alapja a, hozzá tartozó magassága mₐ. Hogyan fejezzük ki a területét (T)?',
        question: 'Egy háromszög alapja a, hozzá tartozó magassága mₐ. Hogyan fejezzük ki a területét (T)?',
        options: ['(a · mₐ) / 2', 'a · mₐ', '2(a + mₐ)', '(a + mₐ) / 2'],
        correctAnswer: '(a · mₐ) / 2',
        explanation: 'A háromszög területe az alap és a magasság szorzatának a fele: T = (a · mₐ) / 2.',
        breakdown: [
          { label: 'Alap és magasság szorzata', value: 'a · mₐ' },
          { label: 'Terület (felezés)', value: '(a · mₐ) / 2' }
        ]
      },
      {
        id: 'q3-10',
        prompt: 'Melyik kifejezés fejezi ki: „egy szám 20%-a” (ha a szám x)?',
        question: 'Melyik kifejezés fejezi ki: „egy szám 20%-a” (ha a szám x)?',
        options: ['0.2x vagy x/5', '20x', 'x + 20', 'x / 20'],
        correctAnswer: '0.2x vagy x/5',
        explanation: '20% = 20/100 = 0.2 = 1/5. Ezért a szám 20%-a: 0.2x vagy x/5.',
        breakdown: [
          { label: '20% tört alakban', value: '20/100 = 1/5 = 0.2' },
          { label: 'Szorzás a számmal', value: '0.2 · x = 0.2x' }
        ]
      }
    ]
  }
};

export const NumbersLettersQuiz: React.FC<NumbersLettersQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="6. Számok és betűk használata Kvíz"
      subtitle="Teszteld a tudásodat a betűs kifejezések, együtthatók, algebranyelv és formulák témakörében!"
      documentId="grade-7-racionalis-szamok-algebra-szamok-es-betuk-quiz"
      badgeText="7. Osztály • Algebra Alapjai"
      themeColor="purple"
      cheatSheetCards={cheatSheetCards}
      levels={quizLevels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      matcherComponent={<NumbersLettersMatcher />}
      sorterComponent={<NumbersLettersSorter />}
    />
  );
};

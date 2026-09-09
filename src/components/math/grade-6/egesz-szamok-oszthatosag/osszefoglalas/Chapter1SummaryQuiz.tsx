import React, { useState } from 'react';
import {
  QuizTemplate,
  QuizQuestion,
  CheatSheetCard,
  CustomGameMode,
  DifficultyLevel,
  LevelConfig,
} from '../QuizTemplate';
import { Chapter1SummaryMatcher } from './Chapter1SummaryMatcher';
import { Chapter1SummarySorter } from './Chapter1SummarySorter';
import { Trophy, Layers, Zap, Sparkles, ShieldCheck, HelpCircle, Compass } from 'lucide-react';

interface Chapter1SummaryQuizProps {
  onBack?: () => void;
}

const CHEAT_SHEET_CARDS: CheatSheetCard[] = [
  {
    id: 'cs-operations',
    title: 'Egész számok műveleti szabályai',
    icon: <Zap className="w-5 h-5 text-indigo-500" />,
    color: 'indigo',
    content: (
      <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
        <div>• <strong>Szorzás/Osztás:</strong> Azonos előjelek: <strong>+</strong>, Különböző előjelek: <strong>-</strong>.</div>
        <div>• <strong>Kivonás:</strong> a - b = a + (-b) (ellentett hozzáadása).</div>
        <div className="text-[11px] text-slate-500 font-mono">Pl. (-6) · (-7) = +42 | (+45) : (-9) = -5.</div>
      </div>
    ),
  },
  {
    id: 'cs-combinatorics-remainders',
    title: 'Kombinatorika és maradékos osztás',
    icon: <Compass className="w-5 h-5 text-indigo-500" />,
    color: 'indigo',
    content: (
      <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
        <div>• <strong>Szorzási szabály:</strong> Egymástól független döntések: p · q lehetőség.</div>
        <div>• <strong>Maradékos osztás:</strong> a = b · q + r, ahol 0 ≤ r &lt; b.</div>
      </div>
    ),
  },
  {
    id: 'cs-divisibility-summary',
    title: 'Oszthatósági szabályok tablója',
    icon: <Layers className="w-5 h-5 text-indigo-500" />,
    color: 'indigo',
    content: (
      <div className="space-y-1 text-[11px] text-slate-700 dark:text-slate-300">
        <div>• <strong>2, 5, 10:</strong> Utolsó számjegy (páros / 0 vagy 5 / 0).</div>
        <div>• <strong>4, 100:</strong> Utolsó 2 számjegy (4-gyel osztható / 00).</div>
        <div>• <strong>3, 9:</strong> Számjegyösszeg (3-mal / 9-cel osztható).</div>
        <div>• <strong>6, 12, 15, 18, 45:</strong> Relatív prím szorzatok (2·3, 3·4, 3·5, 2·9, 5·9).</div>
      </div>
    ),
  },
  {
    id: 'cs-prime-and-divisors',
    title: 'Prímfelbontás és osztók száma d(n)',
    icon: <Sparkles className="w-5 h-5 text-indigo-500" />,
    color: 'indigo',
    content: (
      <div className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
        <p>Ha a prímfelbontás <strong>n = p₁ᵃ · p₂ᵇ ...</strong>, akkor az osztók száma:</p>
        <div className="font-mono text-indigo-700 dark:text-indigo-300 font-bold">
          d(n) = (a + 1) · (b + 1) ...
        </div>
        <div className="text-[11px] text-slate-500">Pl. 72 = 2³ · 3² ⟹ d(72) = 4 · 3 = 12 db osztó.</div>
      </div>
    ),
  },
  {
    id: 'cs-gcd-lcm-synthesis',
    title: 'LNKO és LKKT szabályok',
    icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
    color: 'emerald',
    content: (
      <div className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
        <div>• <strong>LNKO (a, b):</strong> Közös prímek a <strong>legkisebb</strong> kitevőn.</div>
        <div>• <strong>LKKT [a, b]:</strong> Minden előforduló prím a <strong>legnagyobb</strong> kitevőn.</div>
        <div className="font-mono text-emerald-700 dark:text-emerald-300 font-bold">
          a · b = (a, b) · [a, b]
        </div>
      </div>
    ),
  },
  {
    id: 'cs-traps',
    title: 'Gyakori vizsgacsapdák',
    icon: <HelpCircle className="w-5 h-5 text-amber-500" />,
    color: 'amber',
    content: (
      <div className="space-y-1 text-[11px] text-slate-700 dark:text-slate-300">
        <div>• Az 1 <strong>nem prím és nem összetett</strong>!</div>
        <div>• 12-nél 3 · 4 a jó (a 2 · 6 hibás, mert nem relatív prímek!).</div>
        <div>• 3-nál és 9-nél NEM az utolsó jegy dönt, hanem a <strong>számjegyösszeg</strong>!</div>
      </div>
    ),
  },
];

// ==========================================
// 1. SZINT: KÖNNYŰ / ALAPOK (30 FELADAT)
// ==========================================
const LEVEL_1_QUESTIONS: QuizQuestion[] = [
  {
    id: 'e1',
    prompt: 'Mennyi a (-7) · (-8) szorzás eredménye?',
    highlightValue: '(-7) · (-8)',
    questionTypeBadge: 'Előjeles szorzás',
    options: ['+56', '-56', '-15', '+15'],
    correctAnswer: '+56',
    explanation: 'Két negatív szám szorzata mindig pozitív: (-7) · (-8) = +56.',
    breakdown: [
      { label: 'Előjelszabály', value: '(- · - = +)' },
      { label: 'Számítás', value: '7 · 8 = 56 ⟹ +56' },
    ],
  },
  {
    id: 'e2',
    prompt: 'Mennyi a (-48) : (+6) osztás eredménye?',
    highlightValue: '(-48) : (+6)',
    questionTypeBadge: 'Előjeles osztás',
    options: ['-8', '+8', '-7', '-42'],
    correctAnswer: '-8',
    explanation: 'Különböző előjelű számok osztása mindig negatív: (-48) : (+6) = -8.',
    breakdown: [
      { label: 'Előjelszabály', value: '(- : + = -)' },
      { label: 'Számítás', value: '48 : 6 = 8 ⟹ -8' },
    ],
  },
  {
    id: 'e3',
    prompt: 'Melyik szám prímszám az alábbiak közül?',
    highlightValue: '{17, 9, 21, 1}',
    questionTypeBadge: 'Prímszámok',
    options: ['17', '9', '21', '1'],
    correctAnswer: '17',
    explanation: 'A 17-nek pontosan 2 osztója van (1 és 17), így prím. A 9 = 3², 21 = 3 · 7 (összetettek), az 1 pedig egység.',
    breakdown: [
      { label: '17 osztói', value: '1 és 17 (pontosan 2 db) ⟹ Prímszám' },
      { label: 'Többi', value: '9 és 21 összetett, 1 egység' },
    ],
  },
  {
    id: 'e4',
    prompt: 'Melyik szám osztható 4-gyel az alábbiak közül?',
    highlightValue: 'Utolsó 2 számjegy',
    questionTypeBadge: 'Oszthatóság 4-gyel',
    options: ['5724', '3818', '2914', '1530'],
    correctAnswer: '5724',
    explanation: '5724 utolsó két számjegye 24. Mivel 24 : 4 = 6 (egész), az 5724 osztható 4-gyel.',
    breakdown: [
      { label: 'Utolsó 2 számjegy', value: '24' },
      { label: 'Oszthatóság', value: '24 : 4 = 6 ✓' },
    ],
  },
  {
    id: 'e5',
    prompt: 'Melyik szám osztható 9-cel az alábbiak közül?',
    highlightValue: 'Számjegyösszeg',
    questionTypeBadge: 'Oszthatóság 9-cel',
    options: ['7434', '7435', '7430', '7432'],
    correctAnswer: '7434',
    explanation: '7434 számjegyösszege: 7 + 4 + 3 + 4 = 18. Mivel 18 osztható 9-cel, 7434 osztható 9-cel (7434 : 9 = 826).',
    breakdown: [
      { label: 'Számjegyösszeg', value: '7 + 4 + 3 + 4 = 18' },
      { label: 'Oszthatóság', value: '18 : 9 = 2 ✓' },
    ],
  },
  {
    id: 'e6',
    prompt: 'Mennyi a 4 és 6 legkisebb közös többszöröse [4, 6]?',
    highlightValue: '[4, 6] = ?',
    questionTypeBadge: 'LKKT alapok',
    options: ['12', '24', '6', '8'],
    correctAnswer: '12',
    explanation: '4 többszörösei: 4, 8, 12, 16... | 6 többszörösei: 6, 12, 18... A legkisebb közös a 12.',
    breakdown: [
      { label: 'Közös többszörösök', value: '12, 24, 36...' },
      { label: 'Legkisebb', value: '[4, 6] = 12' },
    ],
  },
  {
    id: 'e7',
    prompt: 'Mennyi a 24 és 36 legnagyobb közös osztója (24, 36)?',
    highlightValue: '(24, 36) = ?',
    questionTypeBadge: 'LNKO alapok',
    options: ['12', '6', '4', '72'],
    correctAnswer: '12',
    explanation: '24 osztói: 1, 2, 3, 4, 6, 8, 12, 24. 36 osztói: 1, 2, 3, 4, 6, 9, 12, 18, 36. A legnagyobb közös a 12.',
    breakdown: [
      { label: 'Közös osztók', value: '1, 2, 3, 4, 6, 12' },
      { label: 'Legnagyobb', value: '(24, 36) = 12' },
    ],
  },
  {
    id: 'e8',
    prompt: 'Mennyi a 15 - 3 · 4 műveletsor eredménye?',
    highlightValue: '15 - 3 · 4',
    questionTypeBadge: 'Műveleti sorrend',
    options: ['3', '48', '-3', '12'],
    correctAnswer: '3',
    explanation: 'Először a szorzást végezzük el: 3 · 4 = 12, majd a kivonást: 15 - 12 = 3.',
    breakdown: [
      { label: '1. lépés (szorzás)', value: '3 · 4 = 12' },
      { label: '2. lépés (kivonás)', value: '15 - 12 = 3' },
    ],
  },
  {
    id: 'e9',
    prompt: 'Mennyi a maradék, ha 29-et elosztunk 6-tal?',
    highlightValue: '29 : 6 = ?',
    questionTypeBadge: 'Maradékos osztás',
    options: ['5', '4', '1', '2'],
    correctAnswer: '5',
    explanation: '29 : 6 = 4, mert 4 · 6 = 24, és 29 - 24 = 5 (maradék).',
    breakdown: [
      { label: 'Hányados', value: '4' },
      { label: 'Ellenőrzés', value: '29 = 4 · 6 + 5 (0 ≤ 5 < 6)' },
    ],
  },
  {
    id: 'e10',
    prompt: 'Mennyi a |-15| - |+8| kifejezés értéke?',
    highlightValue: '|-15| - |+8|',
    questionTypeBadge: 'Abszolút érték',
    options: ['7', '-23', '23', '-7'],
    correctAnswer: '7',
    explanation: '|-15| = 15 és |+8| = 8. Így 15 - 8 = 7.',
    breakdown: [
      { label: 'Abszolút értékek', value: '15 és 8' },
      { label: 'Kivonás', value: '15 - 8 = 7' },
    ],
  },
  {
    id: 'e11',
    prompt: 'Melyik szám osztható 10-zel az alábbiak közül?',
    highlightValue: '0-ra végződés',
    questionTypeBadge: 'Oszthatóság 10-zel',
    options: ['840', '845', '804', '841'],
    correctAnswer: '840',
    explanation: 'Egy egész szám akkor és csak akkor osztható 10-zel, ha az utolsó számjegye 0. A 840 utolsó jegye 0.',
    breakdown: [
      { label: 'Szabály', value: 'Utolsó számjegy = 0' },
      { label: 'Eredmény', value: '840 : 10 = 84' },
    ],
  },
  {
    id: 'e12',
    prompt: 'Melyik szám osztható 5-tel, de 10-zel NEM?',
    highlightValue: '5-ös végződés',
    questionTypeBadge: 'Oszthatóság 5-tel',
    options: ['375', '370', '372', '300'],
    correctAnswer: '375',
    explanation: '5-tel osztható, de 10-zel nem: az utolsó számjegyének pontosan 5-nek kell lennie. A 375 utolsó jegye 5.',
    breakdown: [
      { label: '5-ös oszthatóság', value: 'Utolsó jegy 0 vagy 5' },
      { label: '10-zel nem', value: 'Utolsó jegy = 5 ⟹ 375' },
    ],
  },
  {
    id: 'e13',
    prompt: 'Páros szám-e a 0 (nulla)?',
    highlightValue: '0 paritása',
    questionTypeBadge: 'Paritás',
    options: ['Igen, mert 2-vel osztva a maradék 0', 'Nem, a 0 páratlan', 'A 0 se nem páros, se nem páratlan', 'Csak pozitív szám lehet páros'],
    correctAnswer: 'Igen, mert 2-vel osztva a maradék 0',
    explanation: '0 = 2 · 0 + 0, 2-vel maradék nélkül osztható egész szám, így a 0 PÁROS szám.',
    breakdown: [
      { label: 'Definíció', value: '2k alakú egész szám (k=0)' },
      { label: 'Maradék', value: '0 : 2 = 0, maradék 0' },
    ],
  },
  {
    id: 'e14',
    prompt: 'Mikor osztható egy szám 6-tal?',
    highlightValue: '6 = 2 · 3',
    questionTypeBadge: 'Oszthatóság 6-tal',
    options: ['Ha páros (2-vel osztható) ÉS számjegyösszege osztható 3-mal', 'Ha az utolsó jegye 6-os', 'Ha osztható 6-tal és 12-vel', 'Ha páratlan és osztható 3-mal'],
    correctAnswer: 'Ha páros (2-vel osztható) ÉS számjegyösszege osztható 3-mal',
    explanation: 'Mivel 6 = 2 · 3 és LNKO(2, 3) = 1, egy szám akkor osztható 6-tal, ha egyszerre osztható 2-vel és 3-mal.',
    breakdown: [
      { label: '2-es feltétel', value: 'Páros utolsó jegy' },
      { label: '3-as feltétel', value: '3-mal osztható számjegyösszeg' },
    ],
  },
  {
    id: 'e15',
    prompt: 'Mikor mondjuk két számra, hogy RELATÍV PRÍMEK?',
    highlightValue: '(a, b) = 1',
    questionTypeBadge: 'Relatív prímek',
    options: ['Ha a legnagyobb közös osztójuk 1 (nincs 1-nél nagyobb közös osztójuk)', 'Ha mindkét szám prímszám', 'Ha a szorzatuk prímszám', 'Ha az összegük páratlan'],
    correctAnswer: 'Ha a legnagyobb közös osztójuk 1 (nincs 1-nél nagyobb közös osztójuk)',
    explanation: 'Két egész szám relatív prím, ha LNKO(a, b) = 1. Nem szükséges, hogy maguk a számok prímek legyenek (pl. 8 és 9 relatív prímek, bár egyik sem prím).',
    breakdown: [
      { label: 'Definíció', value: 'LNKO(a, b) = 1' },
      { label: 'Példa', value: '(8, 9) = 1 ⟹ Relatív prímek' },
    ],
  },
  {
    id: 'e16',
    prompt: 'Peti szekrényében 3 féle póló és 4 féle nadrág van. Hányféle különböző öltözetet tud összeállítani 1 pólóból és 1 nadrágból?',
    highlightValue: '3 póló × 4 nadrág',
    questionTypeBadge: 'Kombinatorika alap',
    options: ['12', '7', '10', '16'],
    correctAnswer: '12',
    explanation: 'A szorzási szabály szerint a független lehetőségek száma összeszorzódik: 3 · 4 = 12 féle szett.',
    breakdown: [
      { label: 'Szorzási szabály', value: '3 · 4 = 12' },
      { label: 'Összes eset', value: '12 különböző öltözet' },
    ],
  },
  {
    id: 'e17',
    prompt: 'Prímszám-e az 1 (egy)?',
    highlightValue: 'Az 1 besorolása',
    questionTypeBadge: 'Számelmélet alaptétel',
    options: ['Nem prím és nem összetett (egység)', 'Igen, a legkisebb prím', 'Összetett szám', 'Páros szám'],
    correctAnswer: 'Nem prím és nem összetett (egység)',
    explanation: 'A prímszámoknak PONTOSAN 2 darab pozitív osztójuk van (1 és önmaga). Az 1-nek csak 1 db osztója van, így egység.',
    breakdown: [
      { label: '1 osztói', value: 'Csak az 1 (1 db osztó)' },
      { label: 'Besorolás', value: 'Egység (sem prím, sem összetett)' },
    ],
  },
  {
    id: 'e18',
    prompt: 'Melyik a legkisebb prímszám?',
    highlightValue: 'Legkisebb prím',
    questionTypeBadge: 'Prímszámok',
    options: ['2', '1', '3', '0'],
    correctAnswer: '2',
    explanation: 'A legkisebb prímszám a 2, ami egyben az egyetlen PÁROS prímszám is.',
    breakdown: [
      { label: '2 osztói', value: '1 és 2 (2 db)' },
      { label: 'Tulajdonság', value: 'Egyetlen páros prím' },
    ],
  },
  {
    id: 'e19',
    prompt: 'Mennyi az 5 · (12 - 4) művelet eredménye?',
    highlightValue: '5 · (12 - 4)',
    questionTypeBadge: 'Zárójeles művelet',
    options: ['40', '56', '32', '60'],
    correctAnswer: '40',
    explanation: 'Először a zárójelben lévő kivonást végezzük el: 12 - 4 = 8, majd 5 · 8 = 40.',
    breakdown: [
      { label: '1. lépés (zárójel)', value: '12 - 4 = 8' },
      { label: '2. lépés (szorzás)', value: '5 · 8 = 40' },
    ],
  },
  {
    id: 'e20',
    prompt: 'Mennyi a (-12) - (-5) kivonás eredménye?',
    highlightValue: '(-12) - (-5)',
    questionTypeBadge: 'Egész számok kivonása',
    options: ['-7', '-17', '+7', '+17'],
    correctAnswer: '-7',
    explanation: 'Kivonás helyett az ellentettet adjuk hozzá: (-12) - (-5) = (-12) + (+5) = -7.',
    breakdown: [
      { label: 'Átalakítás', value: '-12 + 5' },
      { label: 'Eredmény', value: '-7' },
    ],
  },
  {
    id: 'e21',
    prompt: 'Mennyi a (+18) + (-25) összeadás eredménye?',
    highlightValue: '(+18) + (-25)',
    questionTypeBadge: 'Egész számok összeadása',
    options: ['-7', '+7', '-43', '+43'],
    correctAnswer: '-7',
    explanation: 'A nagyobb abszolút értékű szám előjelét kapjuk: 25 - 18 = 7, előjele mínusz ⟹ -7.',
    breakdown: [
      { label: 'Abszolút értékek', value: '|-25| > |18|' },
      { label: 'Különbség', value: '-(25 - 18) = -7' },
    ],
  },
  {
    id: 'e22',
    prompt: 'Melyik szám osztható 100-zal?',
    highlightValue: '00-ra végződés',
    questionTypeBadge: 'Oszthatóság 100-zal',
    options: ['4800', '4850', '4805', '4080'],
    correctAnswer: '4800',
    explanation: '100-zal csak a két nullára (00) végződő számok oszthatók. 4800 : 100 = 48.',
    breakdown: [
      { label: 'Szabály', value: 'Utolsó 2 számjegy = 00' },
      { label: 'Eredmény', value: '4800 osztható 100-zal' },
    ],
  },
  {
    id: 'e23',
    prompt: 'Mi a 18 helyes prímtényezős felbontása?',
    highlightValue: '18 prímfelbontása',
    questionTypeBadge: 'Prímfelbontás',
    options: ['2 · 3²', '2 · 9', '3 · 6', '2 · 3 · 3 · 1'],
    correctAnswer: '2 · 3²',
    explanation: '18 = 2 · 9 = 2 · 3 · 3 = 2 · 3². A 9 és a 6 összetett számok, így nem szerepelhetnek prímfelbontásban!',
    breakdown: [
      { label: 'Tényezők', value: '2 és 3 (prímek)' },
      { label: 'Kanonikus alak', value: '2¹ · 3² = 18' },
    ],
  },
  {
    id: 'e24',
    prompt: 'Melyik szám a 7 többszöröse az alábbiak közül?',
    highlightValue: '7 többszörösei',
    questionTypeBadge: 'Többszörös fogalma',
    options: ['56', '54', '58', '50'],
    correctAnswer: '56',
    explanation: '56 = 7 · 8, tehát az 56 a 7-nek többszöröse (maradék nélkül osztható 7-tel).',
    breakdown: [
      { label: 'Szorzás', value: '7 · 8 = 56' },
      { label: 'Osztás', value: '56 : 7 = 8' },
    ],
  },
  {
    id: 'e25',
    prompt: 'Melyik szám osztója a 42-nek?',
    highlightValue: '42 osztói',
    questionTypeBadge: 'Osztó fogalma',
    options: ['7', '8', '9', '5'],
    correctAnswer: '7',
    explanation: '42 : 7 = 6 (egész, maradék 0), így a 7 osztója a 42-nek.',
    breakdown: [
      { label: 'Osztás', value: '42 : 7 = 6' },
      { label: 'Maradék', value: '0 ⟹ Osztója' },
    ],
  },
  {
    id: 'e26',
    prompt: 'Osztható-e a 417 szám 3-mal?',
    highlightValue: '417 ⟹ 4 + 1 + 7',
    questionTypeBadge: 'Oszthatóság 3-mal',
    options: ['Igen, mert 4 + 1 + 7 = 12, ami osztható 3-mal', 'Nem, mert páratlan szám', 'Nem, mert 7-re végződik', 'Csak 9-cel osztható'],
    correctAnswer: 'Igen, mert 4 + 1 + 7 = 12, ami osztható 3-mal',
    explanation: 'Egy szám akkor és csak akkor osztható 3-mal, ha a számjegyeinek összege osztható 3-mal. 4+1+7=12, 12 : 3 = 4 ✓ (417 : 3 = 139).',
    breakdown: [
      { label: 'Számjegyösszeg', value: '4 + 1 + 7 = 12' },
      { label: '3-as oszthatóság', value: '12 : 3 = 4 ✓' },
    ],
  },
  {
    id: 'e27',
    prompt: 'Ha az egyik szám osztója a másiknak (pl. 5 osztója a 20-nak), mennyi a legnagyobb közös osztójuk (5, 20)?',
    highlightValue: '(5, 20) = ?',
    questionTypeBadge: 'LNKO osztópár',
    options: ['5 (a kisebbik szám)', '20 (a nagyobbik szám)', '100 (a szorzatuk)', '1'],
    correctAnswer: '5 (a kisebbik szám)',
    explanation: 'Ha a osztója b-nek, akkor az LNKO mindig a kisebbik szám: (a, b) = a. (5, 20) = 5.',
    breakdown: [
      { label: 'Szabály', value: 'a | b ⟹ (a, b) = a' },
      { label: 'Példa', value: '(5, 20) = 5' },
    ],
  },
  {
    id: 'e28',
    prompt: 'Ha az egyik szám osztója a másiknak (pl. 5 osztója a 20-nak), mennyi a legkisebb közös többszörösük [5, 20]?',
    highlightValue: '[5, 20] = ?',
    questionTypeBadge: 'LKKT osztópár',
    options: ['20 (a nagyobbik szám)', '5 (a kisebbik szám)', '100 (a szorzatuk)', '4'],
    correctAnswer: '20 (a nagyobbik szám)',
    explanation: 'Ha a osztója b-nek, akkor az LKKT mindig a nagyobbik szám: [a, b] = b. [5, 20] = 20.',
    breakdown: [
      { label: 'Szabály', value: 'a | b ⟹ [a, b] = b' },
      { label: 'Példa', value: '[5, 20] = 20' },
    ],
  },
  {
    id: 'e29',
    prompt: 'Mennyi a |-42| abszolút érték?',
    highlightValue: '|-42|',
    questionTypeBadge: 'Abszolút érték fogalom',
    options: ['42', '-42', '0', '1/42'],
    correctAnswer: '42',
    explanation: 'Egy szám abszolút értéke a számnak a nullától való távolsága a számegyenesen, ami sosem negatív: |-42| = 42.',
    breakdown: [
      { label: 'Távolság a 0-tól', value: '42 egység' },
      { label: 'Eredmény', value: '+42' },
    ],
  },
  {
    id: 'e30',
    prompt: 'Mennyi a (-18) · 0 szorzás eredménye?',
    highlightValue: '(-18) · 0',
    questionTypeBadge: 'Szorzás nullával',
    options: ['0', '-18', '+18', 'Nem értelmezhető'],
    correctAnswer: '0',
    explanation: 'Bármilyen egész számot nullával szorozva az eredmény mindig 0.',
    breakdown: [
      { label: 'Szabály', value: 'a · 0 = 0' },
      { label: 'Eredmény', value: '0' },
    ],
  },
];

// ==========================================
// 2. SZINT: KÖZEPES / GYAKORLÓ (30 FELADAT)
// ==========================================
const LEVEL_2_QUESTIONS: QuizQuestion[] = [
  {
    id: 'm1',
    prompt: 'Mennyi a (-5) · 6 - (-18) : 3 műveletsor eredménye?',
    highlightValue: '(-5) · 6 - (-18) : 3',
    questionTypeBadge: 'Összetett műveletsor',
    options: ['-24', '-36', '+24', '-26'],
    correctAnswer: '-24',
    explanation: '1) (-5) · 6 = -30. 2) (-18) : 3 = -6. 3) -30 - (-6) = -30 + 6 = -24.',
    breakdown: [
      { label: 'Szorzás & Osztás', value: '-30 és -6' },
      { label: 'Kivonás', value: '-30 - (-6) = -24' },
    ],
  },
  {
    id: 'm2',
    prompt: 'Melyik szám osztható 12-vel az alábbiak közül?',
    highlightValue: '12 = 3 · 4',
    questionTypeBadge: 'Oszthatóság 12-vel',
    options: ['3528', '3522', '3514', '3530'],
    correctAnswer: '3528',
    explanation: '12 = 3 · 4. 3528 utolsó 2 jegye 28 (osztható 4-gyel), számjegyösszege: 3+5+2+8 = 18 (osztható 3-mal) ⟹ osztható 12-vel.',
    breakdown: [
      { label: '4-es szabály', value: '28 : 4 = 7 ✓' },
      { label: '3-as szabály', value: '3+5+2+8 = 18 ✓' },
    ],
  },
  {
    id: 'm3',
    prompt: 'Melyik szám osztható 15-tel az alábbiak közül?',
    highlightValue: '15 = 3 · 5',
    questionTypeBadge: 'Oszthatóság 15-tel',
    options: ['4185', '4180', '4182', '4190'],
    correctAnswer: '4185',
    explanation: '15 = 3 · 5. 4185 utolsó jegye 5 (osztható 5-tel), számjegyösszege: 4+1+8+5 = 18 (osztható 3-mal) ⟹ osztható 15-tel.',
    breakdown: [
      { label: '5-ös szabály', value: '5-re végződik ✓' },
      { label: '3-as szabály', value: '4+1+8+5 = 18 ✓' },
    ],
  },
  {
    id: 'm4',
    prompt: 'Melyik szám osztható 18-cal az alábbiak közül?',
    highlightValue: '18 = 2 · 9',
    questionTypeBadge: 'Oszthatóság 18-cal',
    options: ['7344', '7341', '7354', '7346'],
    correctAnswer: '7344',
    explanation: '18 = 2 · 9. 7344 páros (4-re végződik), számjegyösszege: 7+3+4+4 = 18 (osztható 9-cel) ⟹ osztható 18-cal.',
    breakdown: [
      { label: '2-es szabály', value: 'Páros (4) ✓' },
      { label: '9-es szabály', value: '7+3+4+4 = 18 ✓' },
    ],
  },
  {
    id: 'm5',
    prompt: 'Melyik szám osztható 45-tel az alábbiak közül?',
    highlightValue: '45 = 5 · 9',
    questionTypeBadge: 'Oszthatóság 45-tel',
    options: ['8235', '8230', '8245', '8220'],
    correctAnswer: '8235',
    explanation: '45 = 5 · 9. 8235 utolsó jegye 5 (osztható 5-tel), számjegyösszege: 8+2+3+5 = 18 (osztható 9-cel) ⟹ osztható 45-tel.',
    breakdown: [
      { label: '5-ös szabály', value: '5-re végződik ✓' },
      { label: '9-es szabály', value: '8+2+3+5 = 18 ✓' },
    ],
  },
  {
    id: 'm6',
    prompt: 'Hány pozitív osztója van a 72-nek a prímfelbontása (72 = 2³ · 3²) alapján?',
    highlightValue: 'd(72) = (3+1) · (2+1)',
    questionTypeBadge: 'Osztók száma d(n)',
    options: ['12', '6', '8', '10'],
    correctAnswer: '12',
    explanation: 'd(n) = (a + 1)(b + 1). d(72) = (3 + 1) · (2 + 1) = 4 · 3 = 12 db osztó.',
    breakdown: [
      { label: 'Kitevők + 1', value: '(3 + 1) = 4 és (2 + 1) = 3' },
      { label: 'Szorzat', value: '4 · 3 = 12 db osztó' },
    ],
  },
  {
    id: 'm7',
    prompt: 'Hány pozitív osztója van a 36-nak (36 = 2² · 3²)?',
    highlightValue: 'd(36) = ?',
    questionTypeBadge: 'Négyzetszám osztói',
    options: ['9', '8', '6', '12'],
    correctAnswer: '9',
    explanation: 'd(36) = (2 + 1) · (2 + 1) = 3 · 3 = 9 db osztó. A négyzetszámoknak mindig PÁRATLAN számú osztójuk van!',
    breakdown: [
      { label: 'Formula', value: '(2+1) · (2+1) = 9' },
      { label: 'Tulajdonság', value: 'Páratlan sok osztó ⟹ Négyzetszám' },
    ],
  },
  {
    id: 'm8',
    prompt: 'Ma HÉTFŐ van. Milyen nap lesz pontosan 100 nap múlva?',
    highlightValue: '100 : 7 = 14, r = 2',
    questionTypeBadge: 'Hét napjai & maradék',
    options: ['Szerda', 'Kedd', 'Csütörtök', 'Péntek'],
    correctAnswer: 'Szerda',
    explanation: '1 hét 7 nap. 100 : 7 = 14 hét, maradék 2 nap. Hétfőhöz 2 napot adva: Hétfő ⟹ Kedd ⟹ Szerda.',
    breakdown: [
      { label: 'Maradékos osztás', value: '100 = 14 · 7 + 2' },
      { label: 'Lépés', value: 'Hétfő + 2 nap = Szerda' },
    ],
  },
  {
    id: 'm9',
    prompt: 'Most pontosan 8:00 óra van. Hány órát mutat a 24 órás óra 50 óra múlva?',
    highlightValue: '50 : 24 = 2, r = 2',
    questionTypeBadge: 'Idő maradékos osztása',
    options: ['10:00', '12:00', '8:00', '14:00'],
    correctAnswer: '10:00',
    explanation: '1 nap 24 óra. 50 : 24 = 2 nap, a maradék 2 óra. 8:00 + 2 óra = 10:00.',
    breakdown: [
      { label: 'Maradék', value: '50 = 2 · 24 + 2' },
      { label: 'Új idő', value: '8:00 + 2 óra = 10:00' },
    ],
  },
  {
    id: 'm10',
    prompt: 'Hány olyan 3-jegyű szám készíthető az {1, 3, 5, 7, 9} számjegyekből, amelyben minden számjegy KÜLÖNBÖZIK?',
    highlightValue: '5 · 4 · 3',
    questionTypeBadge: 'Kombinatorika szorzás',
    options: ['60', '125', '20', '15'],
    correctAnswer: '60',
    explanation: 'Első jegy: 5-féle, második: 4-féle, harmadik: 3-féle. 5 · 4 · 3 = 60 különböző szám.',
    breakdown: [
      { label: 'Pozíciók', value: '5 × 4 × 3' },
      { label: 'Összesen', value: '60 darab' },
    ],
  },
  {
    id: 'm11',
    prompt: 'Hány különböző 4-jegyű PIN kód készíthető a 0-9 számjegyekből (ha a számjegyek ismétlődhetnek)?',
    highlightValue: '10⁴ lehetőség',
    questionTypeBadge: 'Kombinatorika ismétléssel',
    options: ['10 000', '5040', '9000', '1000'],
    correctAnswer: '10 000',
    explanation: 'Minden pozícióra 10 számjegy tehető (0-9). 10 · 10 · 10 · 10 = 10 000 különböző PIN kód (0000-tól 9999-ig).',
    breakdown: [
      { label: 'Pozíciók', value: '10 × 10 × 10 × 10' },
      { label: 'Összesen', value: '10 000 darab' },
    ],
  },
  {
    id: 'm12',
    prompt: 'Két szám legnagyobb közös osztója (a, b) = 6, legkisebb közös többszöröse [a, b] = 72. Ha az egyik szám a = 18, mennyi a másik szám (b)?',
    highlightValue: 'a · b = (a, b) · [a, b]',
    questionTypeBadge: 'LNKO-LKKT alaptétel',
    options: ['24', '12', '36', '48'],
    correctAnswer: '24',
    explanation: 'a · b = (a, b) · [a, b] ⟹ 18 · b = 6 · 72 = 432 ⟹ b = 432 : 18 = 24.',
    breakdown: [
      { label: 'Szorzat', value: '6 · 72 = 432' },
      { label: 'Másik szám', value: 'b = 432 : 18 = 24' },
    ],
  },
  {
    id: 'm13',
    prompt: 'Mennyi a [24, 36] legkisebb közös többszörös értéke?',
    highlightValue: '24 = 2³·3, 36 = 2²·3²',
    questionTypeBadge: 'LKKT prímfelbontással',
    options: ['72', '144', '36', '48'],
    correctAnswer: '72',
    explanation: '24 = 2³ · 3¹, 36 = 2² · 3². Az LKKT-be a legnagyobb kitevőket vesszük: 2³ · 3² = 8 · 9 = 72.',
    breakdown: [
      { label: 'Max kitevők', value: '2³ és 3²' },
      { label: 'LKKT', value: '8 · 9 = 72' },
    ],
  },
  {
    id: 'm14',
    prompt: 'Mennyi a (60, 90) legnagyobb közös osztó értéke?',
    highlightValue: '60 = 2²·3·5, 90 = 2·3²·5',
    questionTypeBadge: 'LNKO prímfelbontással',
    options: ['30', '15', '10', '6'],
    correctAnswer: '30',
    explanation: '60 = 2² · 3¹ · 5¹, 90 = 2¹ · 3² · 5¹. Az LNKO-ba a legkisebb kitevőjű közös prímeket vesszük: 2¹ · 3¹ · 5¹ = 30.',
    breakdown: [
      { label: 'Min kitevők', value: '2¹ · 3¹ · 5¹' },
      { label: 'LNKO', value: '2 · 3 · 5 = 30' },
    ],
  },
  {
    id: 'm15',
    prompt: 'Melyik számjegyet kell az "a" helyére írni, hogy az 53a2 szám osztható legyen 9-cel?',
    highlightValue: '53a2 ⟹ 5+3+a+2',
    questionTypeBadge: 'Hiányzó számjegy (9)',
    options: ['8', '6', '9', '0'],
    correctAnswer: '8',
    explanation: 'Számjegyösszeg: 5 + 3 + a + 2 = 10 + a. A 10 utáni legközelebbi 9-cel osztható szám a 18, így 10 + a = 18 ⟹ a = 8.',
    breakdown: [
      { label: 'Összeg', value: '10 + a = 18' },
      { label: 'Számjegy', value: 'a = 8 (5382 : 9 = 598)' },
    ],
  },
  {
    id: 'm16',
    prompt: 'Hány olyan számjegy tehető az "a" helyére a 712a számban, hogy a kapott szám osztható legyen 4-gyel?',
    highlightValue: '2a osztható 4-gyel',
    questionTypeBadge: 'Hiányzó számjegy (4)',
    options: ['3 darab (0, 4, 8)', '2 darab (4, 8)', '1 darab (4)', '5 darab'],
    correctAnswer: '3 darab (0, 4, 8)',
    explanation: 'A 2a kétjegyű végződésnek kell 4-gyel oszthatónak lennie: 20, 24, 28. Ez 3 db lehetőség (a = 0, 4, 8).',
    breakdown: [
      { label: 'Lehetséges végek', value: '20, 24, 28' },
      { label: 'Darabszám', value: '3 darab (0, 4, 8)' },
    ],
  },
  {
    id: 'm17',
    prompt: 'Két villamos egyszerre indul a végállomásról. Az 1-es villamos 12 percenként, a 2-es villamos 15 percenként tesz meg egy kört. Hány perc múlva indulnak újra egyszerre?',
    highlightValue: '[12, 15] = ?',
    questionTypeBadge: 'Szöveges LKKT feladat',
    options: ['60 perc', '30 perc', '180 perc', '45 perc'],
    correctAnswer: '60 perc',
    explanation: 'A közös indulási idő a két köridő legkisebb közös többszöröse: [12, 15] = 60 perc (1 óra).',
    breakdown: [
      { label: 'Prímfelbontás', value: '12 = 2²·3, 15 = 3·5' },
      { label: 'LKKT', value: '2² · 3 · 5 = 60 perc' },
    ],
  },
  {
    id: 'm18',
    prompt: '48 almát és 60 narancsot szeretnénk szétosztani ajándékcsomagokba úgy, hogy minden csomagba ugyanannyi alma és narancs kerüljön, és semmi se maradjon ki. Legfeljebb hány csomagot készíthetünk?',
    highlightValue: '(48, 60) = ?',
    questionTypeBadge: 'Szöveges LNKO feladat',
    options: ['12 csomag', '6 csomag', '24 csomag', '10 csomag'],
    correctAnswer: '12 csomag',
    explanation: 'A lehető legtöbb egyenlő csomag száma a két darabszám legnagyobb közös osztója: (48, 60) = 12 csomag (csomagonként 4 alma és 5 narancs).',
    breakdown: [
      { label: 'LNKO(48, 60)', value: '12 csomag' },
      { label: 'Csomag tartalma', value: '4 alma, 5 narancs' },
    ],
  },
  {
    id: 'm19',
    prompt: 'Ha egy pozitív egész számot 9-cel osztunk, mennyi lehet a LEGNAGYOBB lehetséges maradék?',
    highlightValue: '0 ≤ r < 9',
    questionTypeBadge: 'Maradék felső korlát',
    options: ['8', '9', '10', '7'],
    correctAnswer: '8',
    explanation: 'A maradékos osztás alaptétele szerint a maradék mindig kisebb az osztónál (0 ≤ r < b). 9-es osztó esetén a legnagyobb maradék a 8.',
    breakdown: [
      { label: 'Szabály', value: 'r < 9' },
      { label: 'Maximum', value: 'r_max = 8' },
    ],
  },
  {
    id: 'm20',
    prompt: 'Ha az "x" szám 7-es maradéka 4, és az "y" szám 7-es maradéka 5, mennyi lesz az (x + y) összeg 7-es maradéka?',
    highlightValue: '(4 + 5) mod 7',
    questionTypeBadge: 'Maradékok összeadása',
    options: ['2', '9', '1', '3'],
    correctAnswer: '2',
    explanation: 'A maradékok összeadódnak: 4 + 5 = 9. Mivel 9 : 7 = 1, maradék 2, ezért a szummájuk 7-es maradéka 2.',
    breakdown: [
      { label: 'Maradékok összege', value: '4 + 5 = 9' },
      { label: '7-es redukció', value: '9 = 1·7 + 2 ⟹ r = 2' },
    ],
  },
  {
    id: 'm21',
    prompt: 'Ha az "x" szám 5-ös maradéka 3, és az "y" szám 5-ös maradéka 4, mennyi lesz az (x · y) szorzat 5-ös maradéka?',
    highlightValue: '(3 · 4) mod 5',
    questionTypeBadge: 'Maradékok szorzása',
    options: ['2', '12', '1', '4'],
    correctAnswer: '2',
    explanation: 'A maradékok szorzódnak: 3 · 4 = 12. Mivel 12 : 5 = 2, maradék 2, ezért a szorzat 5-ös maradéka 2.',
    breakdown: [
      { label: 'Maradékok szorzata', value: '3 · 4 = 12' },
      { label: '5-ös redukció', value: '12 = 2·5 + 2 ⟹ r = 2' },
    ],
  },
  {
    id: 'm22',
    prompt: 'Igaz-e az állítás: „Ha egy szám osztható 2-vel és 6-tal, akkor biztosan osztható 12-vel is”?',
    highlightValue: 'LNKO(2, 6) = 2 ≠ 1',
    questionTypeBadge: 'Oszthatósági csapda',
    options: ['Hamis, ellenpélda a 18 (osztható 2-vel és 6-tal, de 12-vel nem)', 'Igaz, mert 2 · 6 = 12', 'Igaz minden páros számra', 'Csak 100 felett igaz'],
    correctAnswer: 'Hamis, ellenpélda a 18 (osztható 2-vel és 6-tal, de 12-vel nem)',
    explanation: 'A 2 és a 6 NEM relatív prímek (LNKO = 2). A 18 osztható 2-vel (9) és 6-tal (3), de 12-vel NEM! A helyes relatív prím szabály: 3 és 4.',
    breakdown: [
      { label: 'Csapda oka', value: 'LNKO(2, 6) = 2 (nem relatív prímek)' },
      { label: 'Ellenpélda', value: '18 : 2 = 9 ✓, 18 : 6 = 3 ✓, 18 : 12 = 1, r=6 ✗' },
    ],
  },
  {
    id: 'm23',
    prompt: 'Melyik számpár RELATÍV PRÍM az alábbiak közül?',
    highlightValue: 'LNKO = 1 keresése',
    questionTypeBadge: 'Relatív prím felismerés',
    options: ['14 és 15', '12 és 18', '15 és 25', '14 és 21'],
    correctAnswer: '14 és 15',
    explanation: '14 = 2 · 7 és 15 = 3 · 5. Nincs közös prímtényezőjük, így (14, 15) = 1 (relatív prímek). Bármely két egymást követő egész relatív prím!',
    breakdown: [
      { label: '14 és 15 tényezői', value: '{2, 7} és {3, 5} ⟹ Közös prím nincs' },
      { label: 'LNKO', value: '(14, 15) = 1' },
    ],
  },
  {
    id: 'm24',
    prompt: 'Az Euklideszi algoritmus első lépése: 84 = 2 · 36 + 12. Mi a következő lépés?',
    highlightValue: 'LNKO(84, 36) = LNKO(36, 12)',
    questionTypeBadge: 'Euklideszi algoritmus',
    options: ['36 = 3 · 12 + 0 ⟹ LNKO = 12', '84 : 12 = 7 ⟹ LNKO = 7', '36 : 2 = 18', '12 = 1 · 6 + 6'],
    correctAnswer: '36 = 3 · 12 + 0 ⟹ LNKO = 12',
    explanation: 'Az új osztandó az előző osztó (36), az új osztó az előző maradék (12). 36 = 3 · 12 + 0. Mivel a maradék 0, az utolsó nem nulla maradék, a 12 az LNKO.',
    breakdown: [
      { label: '1. lépés', value: '84 = 2 · 36 + 12' },
      { label: '2. lépés', value: '36 = 3 · 12 + 0 ⟹ LNKO = 12' },
    ],
  },
  {
    id: 'm25',
    prompt: 'Mennyi a 100 - [40 + 2 · (15 - 3 · 2)] emeletes műveletsor eredménye?',
    highlightValue: '100 - [40 + 2 · (15 - 6)]',
    questionTypeBadge: 'Emeletes műveleti sorrend',
    options: ['42', '58', '36', '48'],
    correctAnswer: '42',
    explanation: '1) 3 · 2 = 6. 2) 15 - 6 = 9. 3) 2 · 9 = 18. 4) 40 + 18 = 58. 5) 100 - 58 = 42.',
    breakdown: [
      { label: 'Belső kerek zárójel', value: '15 - 6 = 9' },
      { label: 'Szögletes zárójel', value: '40 + 2·9 = 58 ⟹ 100 - 58 = 42' },
    ],
  },
  {
    id: 'm26',
    prompt: 'Mennyi a [4, 6, 10] három szám legkisebb közös többszöröse?',
    highlightValue: '[4, 6, 10] = ?',
    questionTypeBadge: '3 szám LKKT-je',
    options: ['60', '120', '30', '240'],
    correctAnswer: '60',
    explanation: '4 = 2², 6 = 2 · 3, 10 = 2 · 5. Minden előforduló prím a legnagyobb kitevőn: 2² · 3 · 5 = 4 · 15 = 60.',
    breakdown: [
      { label: 'Prímek', value: '2², 3¹, 5¹' },
      { label: 'LKKT', value: '4 · 3 · 5 = 60' },
    ],
  },
  {
    id: 'm27',
    prompt: 'Mennyi a (24, 36, 60) három szám legnagyobb közös osztója?',
    highlightValue: '(24, 36, 60) = ?',
    questionTypeBadge: '3 szám LNKO-ja',
    options: ['12', '6', '4', '24'],
    correctAnswer: '12',
    explanation: '24 = 2³·3, 36 = 2²·3², 60 = 2²·3·5. Közös prímek legkisebb kitevőn: 2² · 3¹ = 12.',
    breakdown: [
      { label: 'Közös tényezők', value: '2² és 3¹' },
      { label: 'LNKO', value: '4 · 3 = 12' },
    ],
  },
  {
    id: 'm28',
    prompt: 'Mi a 360 szám kanonikus prímfelbontása?',
    highlightValue: '360 felbontása',
    questionTypeBadge: 'Prímtényezős felbontás',
    options: ['2³ · 3² · 5', '2² · 3³ · 5', '2⁴ · 3 · 5', '2³ · 3 · 5²'],
    correctAnswer: '2³ · 3² · 5',
    explanation: '360 = 36 · 10 = (4 · 9) · (2 · 5) = 2² · 3² · 2 · 5 = 2³ · 3² · 5 = 8 · 9 · 5 = 360.',
    breakdown: [
      { label: 'Lépések', value: '360 = 10 · 36 = 2 · 5 · 4 · 9' },
      { label: 'Kanonikus alak', value: '2³ · 3² · 5' },
    ],
  },
  {
    id: 'm29',
    prompt: 'Melyik szám a legkisebb az alábbiak közül?',
    highlightValue: '{-18, -25, -4, 0}',
    questionTypeBadge: 'Negatív számok sorrendje',
    options: ['-25', '-18', '-4', '0'],
    correctAnswer: '-25',
    explanation: 'A számegyenesen a balra lévő szám a kisebb. Mivel -25 van a leginkább balra (legnagyobb az abszolút értéke a negatívak közt), ez a legkisebb.',
    breakdown: [
      { label: 'Számegyenes helyzet', value: '-25 < -18 < -4 < 0' },
      { label: 'Legkisebb', value: '-25' },
    ],
  },
  {
    id: 'm30',
    prompt: 'Mennyi a (-35) - (+45) kivonás eredménye?',
    highlightValue: '(-35) - (+45)',
    questionTypeBadge: 'Kivonás negatív tartományban',
    options: ['-80', '+10', '-10', '+80'],
    correctAnswer: '-80',
    explanation: 'Kivonás helyett az ellentettet adjuk hozzá: (-35) + (-45) = -80.',
    breakdown: [
      { label: 'Átalakítás', value: '-35 + (-45)' },
      { label: 'Eredmény', value: '-80' },
    ],
  },
];

// ==========================================
// 3. SZINT: NEHÉZ / MESTERFOK (30 FELADAT)
// ==========================================
const LEVEL_3_QUESTIONS: QuizQuestion[] = [
  {
    id: 'h1',
    prompt: 'A 4x7y négyjegyű szám osztható 36-tal. Ha az utolsó számjegy y = 2, melyik számjegy áll az "x" helyén?',
    highlightValue: '4x72 osztható 36-tal',
    questionTypeBadge: 'Összetett oszthatóság 36-tal',
    options: ['5', '3', '7', '9'],
    correctAnswer: '5',
    explanation: '36 = 4 · 9. 1) 72 osztható 4-gyel (72 : 4 = 18) ✓. 2) 9-es oszthatóság: 4 + x + 7 + 2 = 13 + x. 13 + x = 18 ⟹ x = 5. A szám 4572.',
    breakdown: [
      { label: '4-es oszthatóság', value: '72 : 4 = 18 ✓' },
      { label: '9-es oszthatóság', value: '4 + x + 7 + 2 = 13 + x = 18 ⟹ x = 5' },
    ],
  },
  {
    id: 'h2',
    prompt: 'Melyik a LEGNAGYOBB olyan 7a8b négyjegyű szám, amely osztható 45-tel?',
    highlightValue: '7a8b osztható 45-tel',
    questionTypeBadge: 'Extrémum oszthatóság',
    options: ['7785', '7380', '7985', '7885'],
    correctAnswer: '7785',
    explanation: '45 = 5 · 9. 1) Ha b = 5: 7 + a + 8 + 5 = 20 + a ⟹ 20 + a = 27 ⟹ a = 7 ⟹ 7785. 2) Ha b = 0: 7 + a + 8 + 0 = 15 + a ⟹ a = 3 ⟹ 7380. A legnagyobb a 7785.',
    breakdown: [
      { label: 'b = 0 esetén', value: '7380' },
      { label: 'b = 5 esetén', value: '7785 (a legnagyobb!)' },
    ],
  },
  {
    id: 'h3',
    prompt: 'Egy doboz golyót ha 3-asával vagy 4-esével csoportosítunk, mindkét esetben 1 golyó marad ki. Legkevesebb hány golyó van a dobozban (pozitív szám)?',
    highlightValue: '[3, 4] + 1',
    questionTypeBadge: 'LKKT + maradék feladat',
    options: ['13', '25', '7', '11'],
    correctAnswer: '13',
    explanation: 'A szám 3-mal és 4-gyel osztva is 1 maradékot ad: N = [3, 4] · k + 1. [3, 4] = 12 ⟹ Legkisebb pozitív: 12 · 1 + 1 = 13.',
    breakdown: [
      { label: 'LKKT(3, 4)', value: '12' },
      { label: 'Megoldás', value: '12 + 1 = 13 golyó' },
    ],
  },
  {
    id: 'h4',
    prompt: 'Három szalagot (120 cm, 180 cm és 240 cm) a lehető leghosszabb egyenlő darabokra szeretnénk felvágni hulladék nélkül. Milyen hosszú egy darab és összesen hány darabot kapunk?',
    highlightValue: '(120, 180, 240) = ?',
    questionTypeBadge: 'Többdimenziós LNKO',
    options: ['60 cm hosszú darabok, összesen 9 darab', '30 cm hosszú darabok, összesen 18 darab', '60 cm hosszú darabok, összesen 8 darab', '40 cm hosszú darabok, összesen 12 darab'],
    correctAnswer: '60 cm hosszú darabok, összesen 9 darab',
    explanation: 'LNKO(120, 180, 240) = 60 cm. Darabszámok: 120/60 = 2, 180/60 = 3, 240/60 = 4. Összesen 2 + 3 + 4 = 9 darab.',
    breakdown: [
      { label: 'Darabok hossza', value: 'LNKO = 60 cm' },
      { label: 'Összes darab', value: '2 + 3 + 4 = 9 darab' },
    ],
  },
  {
    id: 'h5',
    prompt: 'Melyik a legkisebb olyan pozitív egész szám, amelynek PONTOSAN 6 darab pozitív osztója van?',
    highlightValue: 'd(n) = 6 minimuma',
    questionTypeBadge: 'Inverz osztószám feladat',
    options: ['12', '18', '20', '28'],
    correctAnswer: '12',
    explanation: '6 felbontásai: 1) (5+1) ⟹ p⁵ (2⁵ = 32). 2) (2+1)(1+1) ⟹ p² · q¹. A legkisebb számhoz a legkisebb prímeket választjuk a nagyobb kitevőre: 2² · 3¹ = 4 · 3 = 12. 12 osztói: 1, 2, 3, 4, 6, 12 (6 db).',
    breakdown: [
      { label: 'Forma', value: 'p² · q' },
      { label: 'Minimum', value: '2² · 3 = 12' },
    ],
  },
  {
    id: 'h6',
    prompt: 'Ha "p" egy tetszőleges prímszám, hány pozitív osztója van a p⁴ hatványnak?',
    highlightValue: 'd(p⁴) = ?',
    questionTypeBadge: 'Prímhatvány osztói',
    options: ['5 darab (1, p, p², p³, p⁴)', '4 darab', '8 darab', '2 darab'],
    correctAnswer: '5 darab (1, p, p², p³, p⁴)',
    explanation: 'A d(pᵃ) = a + 1 szabály szerint d(p⁴) = 4 + 1 = 5 darab osztója van (1, p, p², p³, p⁴).',
    breakdown: [
      { label: 'Formula', value: 'd(p⁴) = 4 + 1 = 5' },
      { label: 'Osztók listája', value: 'p⁰, p¹, p², p³, p⁴' },
    ],
  },
  {
    id: 'h7',
    prompt: 'Két szám relatív prím ((a, b) = 1) és a szorzatuk a · b = 180 (ahol a < b). Hány ilyen (a, b) számpár létezik?',
    highlightValue: 'a · b = 180 és (a,b)=1',
    questionTypeBadge: 'Relatív prím számpárok',
    options: ['4 pár', '2 pár', '6 pár', '8 pár'],
    correctAnswer: '4 pár',
    explanation: '180 = 2² · 3² · 5. 3 különböző prímcsoport van ({4}, {9}, {5}). 2³⁻¹ = 4 relatív prím pár van: (1, 180), (4, 45), (5, 36), (9, 20).',
    breakdown: [
      { label: 'Prímblokkok', value: '2² = 4, 3² = 9, 5¹ = 5' },
      { label: 'Párok (4 db)', value: '(1,180), (4,45), (5,36), (9,20)' },
    ],
  },
  {
    id: 'h8',
    prompt: 'Ha egy számot elosztunk 12-vel, a maradék 9. Mennyi a maradék, ha ugyanezt a számot elosztjuk 4-gyel és 3-mal?',
    highlightValue: 'N = 12k + 9',
    questionTypeBadge: 'Maradék átszámítás',
    options: ['4-gyel osztva 1, 3-mal osztva 0', '4-gyel osztva 3, 3-mal osztva 1', 'Mindkettővel osztva 0', '4-gyel osztva 2, 3-mal osztva 2'],
    correctAnswer: '4-gyel osztva 1, 3-mal osztva 0',
    explanation: 'N = 12k + 9. 1) N = 4·(3k + 2) + 1 ⟹ 4-es maradék 1 (mivel 9 : 4 = 2, r=1). 2) N = 3·(4k + 3) + 0 ⟹ 3-as maradék 0 (mivel 9 : 3 = 3, r=0).',
    breakdown: [
      { label: '4-es maradék', value: '9 = 2·4 + 1 ⟹ r = 1' },
      { label: '3-as maradék', value: '9 = 3·3 + 0 ⟹ r = 0' },
    ],
  },
  {
    id: 'h9',
    prompt: 'Hány olyan 3-jegyű PÁROS szám készíthető, amelyben minden számjegy különböző és az {1, 2, 3, 4, 5} számjegyekből áll?',
    highlightValue: '3-jegyű páros számok',
    questionTypeBadge: 'Kombinatorika feltétellel',
    options: ['24', '12', '48', '60'],
    correctAnswer: '24',
    explanation: 'Az utolsó jegy páros kell legyen (2 vagy 4) ⟹ 2 lehetőség. Az első jegy a maradék 4-ből ⟹ 4 lehetőség. A második jegy a maradék 3-ból ⟹ 3 lehetőség. Összesen: 4 · 3 · 2 = 24 szám.',
    breakdown: [
      { label: 'Utolsó pozíció', value: '2 lehetőség (2, 4)' },
      { label: 'Többi pozíció', value: '4 × 3 = 12 ⟹ 12 × 2 = 24' },
    ],
  },
  {
    id: 'h10',
    prompt: 'Ha a = -8 és b = -3, mennyi a |a - b| - |a · b| kifejezés értéke?',
    highlightValue: '|-8 - (-3)| - |(-8)·(-3)|',
    questionTypeBadge: 'Algebrai abszolút érték',
    options: ['-19', '+19', '-29', '+29'],
    correctAnswer: '-19',
    explanation: '1) a - b = -8 - (-3) = -8 + 3 = -5 ⟹ |-5| = 5. 2) a · b = (-8) · (-3) = +24 ⟹ |24| = 24. 3) 5 - 24 = -19.',
    breakdown: [
      { label: '1. rész', value: '|-5| = 5' },
      { label: '2. rész & kivonás', value: '|24| = 24 ⟹ 5 - 24 = -19' },
    ],
  },
  {
    id: 'h11',
    prompt: 'Anna 60 mp, Béla 75 mp, Cecil pedig 90 mp alatt fut le egy kört a futópályán. Ha egyszerre indulnak a startvonaltól, hány PERC múlva érnek át legközelebb egyszerre a startvonalon?',
    highlightValue: '[60, 75, 90] mp = ? perc',
    questionTypeBadge: 'Többszörös találkozás',
    options: ['15 perc (900 mp)', '10 perc (600 mp)', '30 perc (1800 mp)', '12 perc (720 mp)'],
    correctAnswer: '15 perc (900 mp)',
    explanation: '60 = 2²·3·5, 75 = 3·5², 90 = 2·3²·5. LKKT = 2² · 3² · 5² = 4 · 9 · 25 = 900 másodperc. 900 : 60 = 15 perc.',
    breakdown: [
      { label: 'LKKT másodpercben', value: '900 másodperc' },
      { label: 'Átváltás percre', value: '900 : 60 = 15 perc' },
    ],
  },
  {
    id: 'h12',
    prompt: 'Egy ismeretlen "x" pozitív egész számra [x, 15] = 60 és (x, 15) = 3. Mennyi az "x" értéke?',
    highlightValue: 'x · 15 = 60 · 3',
    questionTypeBadge: 'Ismeretlen szám meghatározása',
    options: ['12', '20', '6', '9'],
    correctAnswer: '12',
    explanation: 'x · 15 = (x, 15) · [x, 15] = 3 · 60 = 180 ⟹ x = 180 : 15 = 12.',
    breakdown: [
      { label: 'Szorzat', value: '3 · 60 = 180' },
      { label: 'x értéke', value: '180 : 15 = 12' },
    ],
  },
  {
    id: 'h13',
    prompt: 'Hány osztási lépés szükséges az Euklideszi algoritmussal az LNKO(252, 105) meghatározásához, és mennyi az LNKO?',
    highlightValue: 'Euklideszi lépések',
    questionTypeBadge: 'Euklideszi algoritmus lépések',
    options: ['3 lépés, LNKO = 21', '2 lépés, LNKO = 21', '4 lépés, LNKO = 7', '3 lépés, LNKO = 42'],
    correctAnswer: '3 lépés, LNKO = 21',
    explanation: '1. lépés: 252 = 2 · 105 + 42. 2. lépés: 105 = 2 · 42 + 21. 3. lépés: 42 = 2 · 21 + 0. 3 lépés volt, az utolsó nem nulla maradék 21.',
    breakdown: [
      { label: 'Lépések', value: '252=2·105+42 ⟹ 105=2·42+21 ⟹ 42=2·21+0' },
      { label: 'Eredmény', value: '3 lépés, LNKO = 21' },
    ],
  },
  {
    id: 'h14',
    prompt: 'Melyik a HELYES összetett oszthatósági szabály a 24-gyel való oszthatóságra?',
    highlightValue: '24 relatív prím felbontása',
    questionTypeBadge: 'Relatív prím szabály (24)',
    options: ['Osztható 3-mal ÉS 8-cal (mivel LNKO(3,8) = 1)', 'Osztható 4-gyel és 6-tal', 'Osztható 2-vel és 12-vel', 'Osztható 2-vel, 3-mal és 4-gyel'],
    correctAnswer: 'Osztható 3-mal ÉS 8-cal (mivel LNKO(3,8) = 1)',
    explanation: 'A 24 felbontásai közül csak a 3 és 8 relatív prímek ((3, 8) = 1). A 4 és 6 nem relatív prímek (LNKO = 2), így a 36 osztható 4-gyel és 6-tal, de 24-gyel nem!',
    breakdown: [
      { label: 'Helyes pár', value: '3 és 8 (LNKO = 1)' },
      { label: 'Hibás pár', value: '4 és 6 (LNKO = 2)' },
    ],
  },
  {
    id: 'h15',
    prompt: 'A 111 111 (hat darab 1-esből álló) szám biztosan osztható az alábbiak közül:',
    highlightValue: '111 111 tulajdonságai',
    questionTypeBadge: 'Számelméleti logika',
    options: ['3-mal és 7-tel és 11-gyel és 13-mal is', 'Csak 3-mal', '9-cel és 2-vel', 'Csak 11-gyel'],
    correctAnswer: '3-mal és 7-tel és 11-gyel és 13-mal is',
    explanation: '111 111 = 111 · 1001. 111 = 3 · 37, 1001 = 7 · 11 · 13. Így 111 111 = 3 · 7 · 11 · 13 · 37, mindegyikkel osztható!',
    breakdown: [
      { label: 'Szorzatalak', value: '111 · 1001' },
      { label: 'Prímek', value: '3, 7, 11, 13, 37 mind osztói' },
    ],
  },
  {
    id: 'h16',
    prompt: 'Mi a 2²⁰²⁶ hatvány utolsó számjegye?',
    highlightValue: '2²⁰²⁶ utolsó számjegye',
    questionTypeBadge: 'Hatványozási periódus',
    options: ['4', '2', '8', '6'],
    correctAnswer: '4',
    explanation: '2 hatványainak utolsó számjegyei 4 hosszú ciklust követnek: 2, 4, 8, 6, 2, 4, 8, 6... A 2026 : 4 = 506, maradék 2. A ciklus 2. eleme a 4.',
    breakdown: [
      { label: 'Ciklus (4-es)', value: '1.->2, 2.->4, 3.->8, 4.->6' },
      { label: '2026 mod 4', value: 'maradék 2 ⟹ Utolsó jegy: 4' },
    ],
  },
  {
    id: 'h17',
    prompt: 'Ha egy "a" egész szám 7-es maradéka 2, mennyi lesz az a² négyzetszám 7-es maradéka?',
    highlightValue: 'a ≡ 2 mod 7 ⟹ a² mod 7',
    questionTypeBadge: 'Hatványozás és maradékok',
    options: ['4', '2', '1', '0'],
    correctAnswer: '4',
    explanation: 'A maradékok négyzete: 2² = 4. Mivel 4 < 7, a négyzetszám 7-es maradéka pontosan 4.',
    breakdown: [
      { label: 'Szabály', value: 'r(a²) = (r(a))² mod 7' },
      { label: 'Eredmény', value: '2² = 4' },
    ],
  },
  {
    id: 'h18',
    prompt: 'Hová kell zárójelet tenni a 8 + 12 : 4 - 2 kifejezésben, hogy az eredmény pontosan 3 legyen?',
    highlightValue: '8 + 12 : 4 - 2 = 3',
    questionTypeBadge: 'Zárójelezési feladvány',
    options: ['(8 + 12) : 4 - 2', '8 + (12 : 4) - 2', '(8 + 12 : 4) - 2', '8 + 12 : (4 - 2)'],
    correctAnswer: '(8 + 12) : 4 - 2',
    explanation: '(8 + 12) : 4 - 2 = 20 : 4 - 2 = 5 - 2 = 3.',
    breakdown: [
      { label: 'Zárójel', value: '8 + 12 = 20' },
      { label: 'Osztás & kivonás', value: '20 : 4 - 2 = 5 - 2 = 3 ✓' },
    ],
  },
  {
    id: 'h19',
    prompt: 'Három tetszőleges egymást követő egész szám szorzata n · (n+1) · (n+2) MINDIG osztható:',
    highlightValue: 'n · (n+1) · (n+2)',
    questionTypeBadge: 'Algebrai oszthatóság',
    options: ['6-tal', '12-vel', '9-cel', '24-gyel'],
    correctAnswer: '6-tal',
    explanation: 'Három egymást követő szám közül legalább egy páros (osztható 2-vel), és pontosan egy osztható 3-mal. Mivel 2 és 3 relatív prímek, a szorzat mindig osztható 2 · 3 = 6-tal.',
    breakdown: [
      { label: '2-es tényező', value: 'Legalább egy páros ✓' },
      { label: '3-as tényező', value: 'Pontosan egy 3-mal osztható ✓ ⟹ 6-tal osztható' },
    ],
  },
  {
    id: 'h20',
    prompt: 'Melyik a legkisebb pozitív 36-tal osztható szám, amely KIZÁRÓLAG 0 és 1 számjegyeket tartalmaz?',
    highlightValue: '36-tal osztható bináris szám',
    questionTypeBadge: 'Számelméleti mélyfúrás',
    options: ['11 111 111 100', '1100', '111 100', '11 111 100'],
    correctAnswer: '11 111 111 100',
    explanation: '36 = 4 · 9. 1) 4-es oszthatósághoz a végződés 00 kell legyen. 2) 9-es oszthatósághoz a számjegyösszegnek 9-cel oszthatónak kell lennie, így legalább kilenc darab 1-es kell. A legkisebb szám: kilenc db 1-es és két db 0: 11 111 111 100.',
    breakdown: [
      { label: '4-es oszthatóság', value: '00 végződés' },
      { label: '9-es oszthatóság', value: 'Kilenc db 1-es számjegy (összeg = 9)' },
    ],
  },
  {
    id: 'h21',
    prompt: 'Két szám aránya 3 : 4, a legnagyobb közös osztójuk LNKO = 15. Mennyi a két szám összege?',
    highlightValue: 'a:b = 3:4, (a,b)=15',
    questionTypeBadge: 'Arányos számok LNKO',
    options: ['105', '90', '120', '75'],
    correctAnswer: '105',
    explanation: 'Mivel (3, 4) = 1, a két szám a = 3 · 15 = 45 és b = 4 · 15 = 60. Összegük: 45 + 60 = 105.',
    breakdown: [
      { label: 'Számok', value: 'a = 45, b = 60' },
      { label: 'Összeg', value: '45 + 60 = 105' },
    ],
  },
  {
    id: 'h22',
    prompt: 'Egy 420 cm × 300 cm méretű téglalap alakú szobát a lehető legkevesebb egybevágó négyzet alakú csempével fedünk le hézagmentesen. Hány csempe szükséges?',
    highlightValue: '420 × 300 csempézés',
    questionTypeBadge: 'Csempézési optimalizáció',
    options: ['35 darab (60 cm-es csempék)', '70 darab', '24 darab', '48 darab'],
    correctAnswer: '35 darab (60 cm-es csempék)',
    explanation: 'A legnagyobb csempeméret LNKO(420, 300) = 60 cm. Csempék száma: (420 : 60) · (300 : 60) = 7 · 5 = 35 db csempe.',
    breakdown: [
      { label: 'Csempe oldala', value: '(420, 300) = 60 cm' },
      { label: 'Csempék száma', value: '7 × 5 = 35 db' },
    ],
  },
  {
    id: 'h23',
    prompt: 'Egy 8 fős baráti társaságban mindenki mindenkivel kezet fog pontosan egyszer. Hány kézfogás történik összesen?',
    highlightValue: '8 fő kézfogásai',
    questionTypeBadge: 'Kombinatorika párosítás',
    options: ['28', '56', '36', '64'],
    correctAnswer: '28',
    explanation: 'Minden ember 7 másikkal fog kezet: (8 · 7) / 2 = 56 / 2 = 28 kézfogás (azért osztunk 2-vel, mert minden kézfogást mindkét félnél megszámoltunk).',
    breakdown: [
      { label: 'Formula', value: 'n(n-1)/2' },
      { label: 'Számítás', value: '8 · 7 / 2 = 28' },
    ],
  },
  {
    id: 'h24',
    prompt: 'Hányféleképpen ülhet le 4 ember egy kerek asztal köré, ha az elforgatással egymásba vihető ültetések azonosnak számítanak?',
    highlightValue: '(4 - 1)! = 3!',
    questionTypeBadge: 'Ciklikus permutáció',
    options: ['6', '24', '12', '4'],
    correctAnswer: '6',
    explanation: 'Kerek asztalnál egy személy helyét rögzítjük referenciaként, a maradék 3 személyt rendezzük sorba: (4 - 1)! = 3! = 3 · 2 · 1 = 6 féle ültetés.',
    breakdown: [
      { label: 'Formula', value: '(n - 1)!' },
      { label: 'Eredmény', value: '3! = 6 lehetőség' },
    ],
  },
  {
    id: 'h25',
    prompt: 'A 28 szám valódi osztóinak (önmagánál kisebb pozitív osztóinak) összege: 1 + 2 + 4 + 7 + 14 = 28. Hogyan hívjuk az ilyen különleges számokat a matematikában?',
    highlightValue: '1 + 2 + 4 + 7 + 14 = 28',
    questionTypeBadge: 'Tökéletes számok',
    options: ['Tökéletes számok', 'Barátságos számok', 'Prímszámok', 'Bővelkedő számok'],
    correctAnswer: 'Tökéletes számok',
    explanation: 'Tökéletes számnak nevezzük azokat az egész számokat, amelyek megegyeznek a náluk kisebb pozitív osztóik összegével (pl. 6 = 1+2+3, 28 = 1+2+4+7+14).',
    breakdown: [
      { label: 'Definíció', value: 'Valódi osztók összege = n' },
      { label: 'Példák', value: '6, 28, 496' },
    ],
  },
  {
    id: 'h26',
    prompt: 'Melyik a legkisebb olyan pozitív egész szám, amelyet 5-tel osztva 3, 6-tal osztva pedig 4 maradékot kapunk?',
    highlightValue: 'r_5 = 3 és r_6 = 4',
    questionTypeBadge: 'Közös hiányos maradék',
    options: ['28', '58', '23', '33'],
    correctAnswer: '28',
    explanation: 'Vegyük észre, hogy mindkét esetben pontosan 2 hiányzik a következő többszöröshöz (5 - 3 = 2 és 6 - 4 = 2). Ezért a szám: [5, 6] - 2 = 30 - 2 = 28. Ellenőrzés: 28:5 = 5, r=3; 28:6 = 4, r=4 ✓.',
    breakdown: [
      { label: 'Hiány', value: 'Mindkettőnél 2 hiányzik' },
      { label: 'Számítás', value: '[5, 6] - 2 = 30 - 2 = 28' },
    ],
  },
  {
    id: 'h27',
    prompt: 'Két pozitív egész szám szorzata a · b = 2160, legnagyobb közös osztójuk (a, b) = 6. Mennyi a legkisebb közös többszörösük [a, b]?',
    highlightValue: '[a, b] = (a · b) / (a, b)',
    questionTypeBadge: 'LKKT visszaszámolás',
    options: ['360', '720', '180', '1080'],
    correctAnswer: '360',
    explanation: 'a · b = (a, b) · [a, b] ⟹ [a, b] = (a · b) / (a, b) = 2160 / 6 = 360.',
    breakdown: [
      { label: 'Formula', value: '[a, b] = 2160 : 6' },
      { label: 'Eredmény', value: '360' },
    ],
  },
  {
    id: 'h28',
    prompt: 'Mennyi a (-1)¹ + (-1)² + (-1)³ + (-1)⁴ + ... + (-1)¹⁰⁰ összeg pontos értéke?',
    highlightValue: '(-1) kitevős sorozat',
    questionTypeBadge: 'Előjeles hatványösszeg',
    options: ['0', '1', '-1', '100'],
    correctAnswer: '0',
    explanation: 'A páratlan kitevők értéke -1, a párosaké +1. A 100 tagból 50 db (-1) és 50 db (+1) van: 50 · (-1) + 50 · (+1) = -50 + 50 = 0.',
    breakdown: [
      { label: 'Tagok', value: '50 db (-1) és 50 db (+1)' },
      { label: 'Összeg', value: '-50 + 50 = 0' },
    ],
  },
  {
    id: 'h29',
    prompt: 'Melyik a LEGKISEBB olyan NÉGYJEGYŰ szám, amely egyszerre osztható 15-tel és 18-cal is?',
    highlightValue: 'Négyjegyű [15, 18] minimum',
    questionTypeBadge: 'LKKT skálázás',
    options: ['1080', '1020', '1050', '1170'],
    correctAnswer: '1080',
    explanation: '[15, 18] = 90. A 90 többszörösei közül a legkisebb 4-jegyű: 1000 : 90 = 11,11... ⟹ 90 · 12 = 1080.',
    breakdown: [
      { label: 'LKKT(15, 18)', value: '90' },
      { label: 'Legkisebb 4-jegyű', value: '90 · 12 = 1080' },
    ],
  },
  {
    id: 'h30',
    prompt: 'Egy "n" pozitív egész számnak PONTOSAN 3 darab pozitív osztója van (d(n) = 3). Milyen alakú lehet ez a szám?',
    highlightValue: 'd(n) = 3 ⟹ n alakja',
    questionTypeBadge: 'Számelméleti mesterfogalom',
    options: ['Egy prímszám négyzete (n = p²)', 'Bármely páros szám', 'Két különböző prím szorzata', 'Egy prímszám köbe (p³)'],
    correctAnswer: 'Egy prímszám négyzete (n = p²)',
    explanation: 'A d(n) = a + 1 = 3 formula csak akkor áll elő, ha a prímfelbontás n = p². Ekkor az osztók: 1, p, p² (pontosan 3 db). Pl. 4 (1,2,4), 9 (1,3,9), 25 (1,5,25), 49 (1,7,49).',
    breakdown: [
      { label: 'Osztószám formula', value: 'd(p²) = 2 + 1 = 3' },
      { label: 'Példák', value: '4, 9, 25, 49, 121...' },
    ],
  },
];

const QUIZ_LEVELS: Record<DifficultyLevel, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapok és Számolási Készségek',
    subtitle: 'Előjelek, abszolút érték, alapvető oszthatóság és fogalmak',
    range: '30 feladat (1 - 30)',
    focus: 'Alapfogalmak & Műveletek',
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/40',
    badgeBorder: 'border-emerald-200 dark:border-emerald-800',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
    iconBg: 'bg-emerald-600 text-white',
    questions: LEVEL_1_QUESTIONS,
  },
  2: {
    level: 2,
    title: '2. Szint: Közepes & Gyakorlati Alkalmazások',
    subtitle: 'Összetett oszthatósági szabályok, kombinatorika, LNKO-LKKT gyakorlat',
    range: '30 feladat (1 - 30)',
    focus: 'Összefüggések & Alkalmazás',
    badgeBg: 'bg-amber-50 dark:bg-amber-950/40',
    badgeBorder: 'border-amber-200 dark:border-amber-800',
    badgeText: 'text-amber-700 dark:text-amber-300',
    iconBg: 'bg-amber-600 text-white',
    questions: LEVEL_2_QUESTIONS,
  },
  3: {
    level: 3,
    title: '3. Szint: Haladó & Versenyfeladványok',
    subtitle: 'Mesterfokú logikai feladványok, Euklideszi lépések, maradékelmélet',
    range: '30 feladat (1 - 30)',
    focus: 'Mesterfok & Logika',
    badgeBg: 'bg-purple-50 dark:bg-purple-950/40',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    badgeText: 'text-purple-700 dark:text-purple-300',
    iconBg: 'bg-purple-600 text-white',
    questions: LEVEL_3_QUESTIONS,
  },
};

export function Chapter1SummaryQuiz({ onBack }: Chapter1SummaryQuizProps) {
  const [activeCustomGame, setActiveCustomGame] = useState<'matcher' | 'sorter' | null>(null);

  if (activeCustomGame === 'matcher') {
    return <Chapter1SummaryMatcher onBack={() => setActiveCustomGame(null)} />;
  }

  if (activeCustomGame === 'sorter') {
    return <Chapter1SummarySorter onBack={() => setActiveCustomGame(null)} />;
  }

  const customGameModes: CustomGameMode[] = [
    {
      id: 'matcher',
      title: 'Fejezeti Záró Párosító',
      subtitle: '8 pár megkeresése 3 szinten',
      description: 'Párosítsd össze a teljes I. fejezet fogalmait, szabályait és eredményeit 3 szinten!',
      badgeText: '8 Pár / Szint',
      icon: <Layers className="w-5 h-5 text-indigo-500" />,
      onClick: () => setActiveCustomGame('matcher'),
    },
    {
      id: 'sorter',
      title: 'Fejezeti Záró Csoportosító',
      subtitle: '10 elem 3 kategóriába 3 szinten',
      description: 'Rendezd a matematikai kategóriákat és műveleteket 3 szinten!',
      badgeText: '10 Elem / Szint',
      icon: <Sparkles className="w-5 h-5 text-purple-500" />,
      onClick: () => setActiveCustomGame('sorter'),
    },
  ];

  return (
    <QuizTemplate
      onBack={onBack}
      emoji="🏆"
      topicBadge="🏆 6. Osztály • I. Fejezeti Nagy Záróteszt"
      title="I. Fejezet Összefoglaló Nagyteszt (90 Feladat)"
      subtitle="Teszteld és mélyítsd el a teljes Egész számok, oszthatóság fejezet tudásanyagát 3 szinten, szintenként 30-30-30 átfogó feladattal!"
      cheatSheetTitle="I. Fejezeti Nagy Képlet- és Szabálytár"
      hintText="💡 Olvasd el figyelmesen a feladatokat! Használd a prímfelbontási és oszthatósági szabályokat!"
      levels={QUIZ_LEVELS}
      cheatSheetCards={CHEAT_SHEET_CARDS}
      customGameModes={customGameModes}
      themeColor="indigo"
    />
  );
}

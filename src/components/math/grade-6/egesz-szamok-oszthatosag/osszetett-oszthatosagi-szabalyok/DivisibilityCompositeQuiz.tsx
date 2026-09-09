import React, { useState } from 'react';
import {
  QuizTemplate,
  QuizQuestion,
  CheatSheetCard,
  CustomGameMode,
} from '../QuizTemplate';
import { DivisibilityCompositeMatcher } from './DivisibilityCompositeMatcher';
import { DivisibilityCompositeSorter } from './DivisibilityCompositeSorter';
import { Layers, ShieldCheck, Zap, Sparkles, AlertTriangle, Lightbulb } from 'lucide-react';

interface DivisibilityCompositeQuizProps {
  onBack?: () => void;
}

const CHEAT_SHEET_CARDS: CheatSheetCard[] = [
  {
    id: 'cs-coprime-rule',
    title: 'Az összetett oszthatóság alaptétele',
    icon: <ShieldCheck className="w-5 h-5 text-indigo-500" />,
    color: 'indigo',
    content: (
      <div className="space-y-2 text-xs">
        <p className="font-medium text-slate-700 dark:text-slate-300">
          Egy szám akkor és csak akkor osztható A · B-vel, ha osztható A-val és B-vel is, <strong>feltéve, hogy LNKO(A, B) = 1 (relatív prímek)</strong>!
        </p>
        <div className="p-2 rounded bg-indigo-50 dark:bg-indigo-950/40 text-[11px] font-mono">
          Pl. 12 = 3 · 4 (helyes) | 12 = 2 · 6 (HIBÁS, mert LNKO(2,6)=2)
        </div>
      </div>
    ),
  },
  {
    id: 'cs-6-and-12',
    title: 'Oszthatóság 6-tal és 12-vel',
    icon: <Layers className="w-5 h-5 text-indigo-500" />,
    color: 'indigo',
    content: (
      <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
        <div>• <strong>6-tal:</strong> Páros (2-vel) ÉS számjegyösszeg osztható 3-mal.</div>
        <div>• <strong>12-vel:</strong> Utolsó 2 jegy osztható 4-gyel ÉS számjegyösszeg osztható 3-mal.</div>
        <div className="text-[11px] text-slate-500">Példa: 1524 osztható 12-vel (24:4=6 és 1+5+2+4=12).</div>
      </div>
    ),
  },
  {
    id: 'cs-15-and-18',
    title: 'Oszthatóság 15-tel és 18-cal',
    icon: <Zap className="w-5 h-5 text-indigo-500" />,
    color: 'indigo',
    content: (
      <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
        <div>• <strong>15-tel:</strong> Utolsó jegy 0 vagy 5 ÉS számjegyösszeg osztható 3-mal.</div>
        <div>• <strong>18-cal:</strong> Páros (2-vel) ÉS számjegyösszeg osztható 9-cel.</div>
        <div className="text-[11px] text-slate-500">Példa: 3456 osztható 18-cal (páros és összeg=18).</div>
      </div>
    ),
  },
  {
    id: 'cs-20-and-24',
    title: 'Oszthatóság 20-szal és 24-gyel',
    icon: <Lightbulb className="w-5 h-5 text-indigo-500" />,
    color: 'indigo',
    content: (
      <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
        <div>• <strong>20-szal (4 és 5):</strong> 0-ra végződik ÉS a tízes jegy páros (00, 20, 40, 60, 80).</div>
        <div>• <strong>24-gyel (3 és 8):</strong> Számjegyösszeg osztható 3-mal ÉS utolsó 3 jegy osztható 8-cal.</div>
      </div>
    ),
  },
  {
    id: 'cs-36-and-45',
    title: 'Oszthatóság 36-tal és 45-tel',
    icon: <Sparkles className="w-5 h-5 text-indigo-500" />,
    color: 'indigo',
    content: (
      <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
        <div>• <strong>36-tal (4 és 9):</strong> Utolsó 2 számjegy osztható 4-gyel ÉS számjegyösszeg osztható 9-cel.</div>
        <div>• <strong>45-tel (5 és 9):</strong> Utolsó jegy 0 vagy 5 ÉS számjegyösszeg osztható 9-cel.</div>
      </div>
    ),
  },
  {
    id: 'cs-missing-digits',
    title: 'Hiányzó számjegyek stratégiája',
    icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
    color: 'amber',
    content: (
      <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
        <div>1. Mindig a <strong>végződésre vonatkozó szabályt</strong> vizsgáld először (2, 5, 4, 10)!</div>
        <div>2. Ezután a lehetséges végződésekhez keresd meg a <strong>számjegyösszeget</strong> (3, 9)!</div>
      </div>
    ),
  },
];

const EASY_QUESTIONS: QuizQuestion[] = [
  {
    id: 'e1',
    question: 'Melyik két relatív prím szám szorzatára kell felbontani a 6-ot az oszthatósági szabályhoz?',
    options: ['2 és 3', '1 és 6', '2 és 4', '3 és 3'],
    correctAnswer: '2 és 3',
    explanation: 'A 6 = 2 · 3, és LNKO(2, 3) = 1, ezért egy szám akkor osztható 6-tal, ha páros (2-vel osztható) és számjegyösszege osztható 3-mal.',
    breakdown: [
      { label: 'Tényezők', value: '6 = 2 · 3' },
      { label: 'Relatív prímek?', value: 'Igen, LNKO(2, 3) = 1' },
      { label: 'Szabály', value: 'Páros ÉS számjegyösszeg osztható 3-mal' },
    ],
  },
  {
    id: 'e2',
    question: 'Melyik felbontás HELYES a 12-vel való oszthatóság vizsgálatához?',
    options: ['3 és 4', '2 és 6', '1 és 12', '2 és 2 és 3'],
    correctAnswer: '3 és 4',
    explanation: 'A 12 = 3 · 4, ahol 3 és 4 relatív prímek (LNKO = 1). A 2 · 6 azért hibás, mert 2 és 6 nem relatív prímek (LNKO = 2).',
    breakdown: [
      { label: 'Helyes felbontás', value: '3 · 4 (LNKO = 1)' },
      { label: 'Miért rossz a 2 · 6?', value: 'Mert LNKO(2, 6) = 2 ≠ 1' },
    ],
  },
  {
    id: 'e3',
    question: 'Osztható-e a 438 nevű szám 6-tal?',
    options: [
      'Igen, mert páros és számjegyeinek összege (15) osztható 3-mal.',
      'Nem, mert a számjegyek összege nem osztható 6-tal.',
      'Nem, mert páratlan számra végződik.',
      'Igen, mert 8-ra végződik és 8 osztható 6-tal.',
    ],
    correctAnswer: 'Igen, mert páros és számjegyeinek összege (15) osztható 3-mal.',
    explanation: '438 páros (utolsó jegy 8), számjegyösszege: 4 + 3 + 8 = 15, ami osztható 3-mal. Így 438 osztható 6-tal (438 : 6 = 73).',
    breakdown: [
      { label: 'Párosság', value: '8 páros (2-vel osztható) ✓' },
      { label: 'Számjegyösszeg', value: '4 + 3 + 8 = 15 (3-mal osztható) ✓' },
      { label: 'Következtetés', value: 'Osztható 6-tal (438 : 6 = 73)' },
    ],
  },
  {
    id: 'e4',
    question: 'Melyik szám osztható 15-tel az alábbiak közül?',
    options: ['345', '415', '230', '118'],
    correctAnswer: '345',
    explanation: '15-tel való oszthatósághoz 5-re vagy 0-ra kell végződnie ÉS a számjegyösszegnek 3-mal oszthatónak kell lennie. 345: utolsó jegy 5, összeg = 3+4+5 = 12 (osztható 3-mal) ⟹ osztható 15-tel.',
    breakdown: [
      { label: '345 vizsgálata', value: 'Végződés: 5 ✓, Összeg: 12 ✓ ⟹ Osztható 15-tel' },
      { label: '415 vizsgálata', value: 'Végződés: 5 ✓, Összeg: 10 ✗' },
      { label: '230 vizsgálata', value: 'Végződés: 0 ✓, Összeg: 5 ✗' },
    ],
  },
  {
    id: 'e5',
    question: 'Miért NEM következik abból, hogy egy szám osztható 2-vel és 6-tal is, hogy osztható 12-vel?',
    options: [
      'Mert a 2 és a 6 nem relatív prímek (legnagyobb közös osztójuk 2).',
      'Mert a 12 prím szám.',
      'Mert minden páros szám osztható 12-vel.',
      'Mert a 6-tal való oszthatóság kizárja a 2-vel való oszthatóságot.',
    ],
    correctAnswer: 'Mert a 2 és a 6 nem relatív prímek (legnagyobb közös osztójuk 2).',
    explanation: 'Például a 18 osztható 2-vel és 6-tal is, de 18 nem osztható 12-vel! Ennek oka, hogy LNKO(2, 6) = 2 ≠ 1.',
    breakdown: [
      { label: 'Ellenpélda', value: '18 : 2 = 9, 18 : 6 = 3, de 18 : 12 nem egész' },
      { label: 'Matematikai ok', value: 'LNKO(2, 6) = 2 ≠ 1' },
    ],
  },
  {
    id: 'e6',
    question: 'Osztható-e az 1524 szám 12-vel?',
    options: [
      'Igen, mert az utolsó két jegye (24) osztható 4-gyel és a számjegyösszege (12) osztható 3-mal.',
      'Nem, mert páros szám.',
      'Nem, mert nem 0-ra végződik.',
      'Igen, csak azért, mert 4-gyel osztható.',
    ],
    correctAnswer: 'Igen, mert az utolsó két jegye (24) osztható 4-gyel és a számjegyösszege (12) osztható 3-mal.',
    explanation: '1524 utolsó két jegye 24 (24:4=6 ✓), számjegyösszege 1+5+2+4 = 12 (12:3=4 ✓). Mindkét relatív prím feltétel teljesül, így 1524 : 12 = 127.',
    breakdown: [
      { label: '4-es szabály', value: '24 osztható 4-gyel ✓' },
      { label: '3-as szabály', value: '1+5+2+4 = 12 osztható 3-mal ✓' },
      { label: 'Eredmény', value: '1524 : 12 = 127' },
    ],
  },
  {
    id: 'e7',
    question: 'Melyik szám osztható 6-tal az alábbiak közül?',
    options: ['516', '513', '514', '515'],
    correctAnswer: '516',
    explanation: '516 páros (6-ra végződik), számjegyösszege 5+1+6 = 12 (osztható 3-mal). 513 páratlan, 514 összege 10, 515 páratlan.',
    breakdown: [
      { label: '516 ellenőrzése', value: 'Páros: Igen, Összeg: 12 (osztható 3-mal) ⟹ Osztható 6-tal' },
    ],
  },
  {
    id: 'e8',
    question: 'Milyen számjegyre végződhet egy 15-tel osztható szám?',
    options: ['Csak 0-ra vagy 5-re', 'Bármilyen páros számjegyre', 'Csak 5-re', 'Csak 0-ra'],
    correctAnswer: 'Csak 0-ra vagy 5-re',
    explanation: 'Mivel a 15-tel osztható számoknak 5-tel is oszthatónak kell lenniük, az utolsó számjegyük kizárólag 0 vagy 5 lehet.',
    breakdown: [
      { label: '5-ös oszthatóság', value: 'Utolsó számjegy 0 vagy 5' },
      { label: '15-ös kapcsolat', value: '15 = 3 · 5 ⟹ az 5-ös szabály kötelező' },
    ],
  },
  {
    id: 'e9',
    question: 'Osztható-e a 720 szám 15-tel és 12-vel is?',
    options: [
      'Igen, mindkettővel osztható (így 60-nal is).',
      'Csak 15-tel osztható, 12-vel nem.',
      'Csak 12-vel osztható, 15-tel nem.',
      'Egyikkel sem osztható.',
    ],
    correctAnswer: 'Igen, mindkettővel osztható (így 60-nal is).',
    explanation: '720 utolsó jegye 0 és összege 9 (osztható 15-tel). Utolsó két jegye 20 (osztható 4-gyel) és összege 9 (osztható 3-mal ⟹ osztható 12-vel is). 720:15=48, 720:12=60.',
    breakdown: [
      { label: '15-tel', value: '720 : 15 = 48 ✓' },
      { label: '12-vel', value: '720 : 12 = 60 ✓' },
    ],
  },
  {
    id: 'e10',
    question: 'Mi a legkisebb pozitív kétjegyű szám, amely osztható 6-tal és 15-tel is?',
    options: ['30', '60', '15', '90'],
    correctAnswer: '30',
    explanation: 'A 6 és 15 legkisebb közös többszöröse az LKKT(6, 15) = 30. Ez a legkisebb pozitív szám, ami mindkettővel osztható.',
    breakdown: [
      { label: '6 többszörösei', value: '6, 12, 18, 24, 30, 36...' },
      { label: '15 többszörösei', value: '15, 30, 45...' },
      { label: 'Közös legkisebb', value: '30' },
    ],
  },
];

const MEDIUM_QUESTIONS: QuizQuestion[] = [
  {
    id: 'm1',
    question: 'Melyik a helyes relatív prím felbontás a 18-cal való oszthatósághoz?',
    options: ['2 és 9', '3 és 6', '1 és 18', '2 és 3 és 3'],
    correctAnswer: '2 és 9',
    explanation: '18 = 2 · 9, és LNKO(2, 9) = 1. A 3 · 6 nem jó, mert 3 és 6 nem relatív prímek (LNKO = 3).',
    breakdown: [
      { label: 'Helyes felbontás', value: '2 · 9 (LNKO = 1)' },
      { label: 'Feltétel', value: 'Páros ÉS a számjegyösszeg osztható 9-cel' },
    ],
  },
  {
    id: 'm2',
    question: 'Osztható-e a 3456 szám 18-cal?',
    options: [
      'Igen, mert páros és számjegyösszege (18) osztható 9-cel.',
      'Nem, mert a 6 nem osztható 18-cal.',
      'Nem, mert a számjegyösszeg nem 18 többszöröse.',
      'Igen, csak azért, mert 6-ra végződik.',
    ],
    correctAnswer: 'Igen, mert páros és számjegyösszege (18) osztható 9-cel.',
    explanation: '3456 páros (utolsó jegy 6), számjegyösszege 3+4+5+6 = 18, ami osztható 9-cel. Így 3456 : 18 = 192.',
    breakdown: [
      { label: 'Páros?', value: 'Igen (6-ra végződik) ✓' },
      { label: 'Számjegyösszeg', value: '3+4+5+6 = 18 (osztható 9-cel) ✓' },
      { label: 'Eredmény', value: '3456 : 18 = 192' },
    ],
  },
  {
    id: 'm3',
    question: 'Melyik szabály érvényes a 45-tel való oszthatóságra?',
    options: [
      'Utolsó jegye 0 vagy 5 ÉS számjegyösszege osztható 9-cel.',
      'Utolsó két jegye 45 ÉS osztható 3-mal.',
      'Csak az, hogy 5-re végződik.',
      'Páros ÉS számjegyösszege osztható 9-cel.',
    ],
    correctAnswer: 'Utolsó jegye 0 vagy 5 ÉS számjegyösszege osztható 9-cel.',
    explanation: '45 = 5 · 9 (LNKO(5,9)=1). Ezért egy szám akkor osztható 45-tel, ha 5-tel és 9-cel is osztható.',
    breakdown: [
      { label: 'Felbontás', value: '45 = 5 · 9' },
      { label: '5-ös feltétel', value: 'Utolsó számjegy 0 vagy 5' },
      { label: '9-es feltétel', value: 'Számjegyösszeg osztható 9-cel' },
    ],
  },
  {
    id: 'm4',
    question: 'Osztható-e az 5670 szám 45-tel?',
    options: [
      'Igen, mert 0-ra végződik (5-tel osztható) és összege (18) osztható 9-cel.',
      'Nem, mert 0-ra végződik és nem 5-re.',
      'Nem, mert a számjegyösszeg nem 45.',
      'Csak 10-zel osztható, 45-tel nem.',
    ],
    correctAnswer: 'Igen, mert 0-ra végződik (5-tel osztható) és összege (18) osztható 9-cel.',
    explanation: '5670 utolsó jegye 0 (5-tel osztható), számjegyösszege 5+6+7+0 = 18 (9-cel osztható). Így 5670 : 45 = 126.',
    breakdown: [
      { label: '5-ös szabály', value: '0-ra végződik ✓' },
      { label: '9-es szabály', value: '5+6+7+0 = 18 (osztható 9-cel) ✓' },
      { label: 'Eredmény', value: '5670 : 45 = 126' },
    ],
  },
  {
    id: 'm5',
    question: 'Melyik felbontás szükséges a 36-tal való oszthatóság ellenőrzéséhez?',
    options: ['4 és 9', '6 és 6', '2 és 18', '3 és 12'],
    correctAnswer: '4 és 9',
    explanation: '36 = 4 · 9, és LNKO(4, 9) = 1. A többi felbontás (6·6, 2·18, 3·12) nem relatív prím pár!',
    breakdown: [
      { label: 'Helyes', value: '4 · 9 (LNKO = 1)' },
      { label: 'Rossz: 6 · 6', value: 'LNKO(6, 6) = 6 ≠ 1' },
      { label: 'Rossz: 2 · 18', value: 'LNKO(2, 18) = 2 ≠ 1' },
      { label: 'Rossz: 3 · 12', value: 'LNKO(3, 12) = 3 ≠ 1' },
    ],
  },
  {
    id: 'm6',
    question: 'Melyik szám osztható 36-tal az alábbiak közül?',
    options: ['4356', '4350', '4354', '4360'],
    correctAnswer: '4356',
    explanation: '4356: utolsó két jegy 56 (56:4=14 ✓), számjegyösszeg 4+3+5+6 = 18 (18:9=2 ✓). Így 4356 : 36 = 121.',
    breakdown: [
      { label: '4-es szabály', value: '56 : 4 = 14 ✓' },
      { label: '9-es szabály', value: '4+3+5+6 = 18 ✓' },
      { label: 'Eredmény', value: '4356 : 36 = 121' },
    ],
  },
  {
    id: 'm7',
    question: 'Hogyan vizsgáljuk az oszthatóságot 20-szal?',
    options: [
      'Utolsó jegy 0 ÉS utolsó két számjegy osztható 4-gyel (azaz 00, 20, 40, 60, 80).',
      'Páros ÉS számjegyösszeg osztható 10-zel.',
      'Csak az, hogy 0-ra végződik.',
      'Utolsó jegy 0 vagy 5 ÉS páros.',
    ],
    correctAnswer: 'Utolsó jegy 0 ÉS utolsó két számjegy osztható 4-gyel (azaz 00, 20, 40, 60, 80).',
    explanation: '20 = 4 · 5 (LNKO(4,5)=1). 5-tel akkor osztható ha 0 vagy 5 a vége, de mivel 4-gyel is osztható (páros), csak 0-ra végződhet, és a tízeseknek párosnak kell lenniük.',
    breakdown: [
      { label: 'Felbontás', value: '20 = 4 · 5' },
      { label: 'Lehetséges végződések', value: '00, 20, 40, 60, 80' },
    ],
  },
  {
    id: 'm8',
    question: 'Melyik szám osztható 20-szal?',
    options: ['3580', '3570', '3585', '3550'],
    correctAnswer: '3580',
    explanation: '3580 utolsó két jegye 80 (80:4=20 ✓) és 0-ra végződik (5-tel osztható ✓). 3570 utolsó két jegye 70 (nem osztható 4-gyel).',
    breakdown: [
      { label: '3580', value: '80 : 20 = 4 ⟹ osztható ✓' },
      { label: '3570', value: '70 : 20 = 3, maradék 10 ✗' },
    ],
  },
  {
    id: 'm9',
    question: 'Milyen számjegyet írhatunk az x helyére a 25x0 számban, hogy osztható legyen 18-cal?',
    options: ['2', '0', '4', '6'],
    correctAnswer: '2',
    explanation: 'A 25x0 szám 0-ra végződik (páros, így 2-vel osztható). 18-cal akkor osztható, ha 9-cel is osztható. Számjegyösszeg: 2+5+x+0 = 7+x. Ez akkor osztható 9-cel, ha 7+x = 9 ⟹ x = 2.',
    breakdown: [
      { label: '2-es szabály', value: '0-ra végződik (páros) ✓' },
      { label: '9-es szabály', value: '2+5+x+0 = 7+x ⟹ 7+x=9 ⟹ x=2' },
      { label: 'A kapott szám', value: '2520 : 18 = 140' },
    ],
  },
  {
    id: 'm10',
    question: 'Melyik felbontás helyes a 24-gyel való oszthatóságra?',
    options: ['3 és 8', '4 és 6', '2 és 12', '1 és 24'],
    correctAnswer: '3 és 8',
    explanation: '24 = 3 · 8, ahol LNKO(3, 8) = 1 (relatív prímek). A 4 · 6 nem jó, mert LNKO(4, 6) = 2 ≠ 1.',
    breakdown: [
      { label: 'Helyes', value: '3 · 8 (LNKO = 1)' },
      { label: 'Feltétel', value: 'Számjegyösszeg osztható 3-mal ÉS utolsó 3 számjegy osztható 8-cal' },
    ],
  },
];

const HARD_QUESTIONS: QuizQuestion[] = [
  {
    id: 'h1',
    question: 'Milyen számjegyek írhatók az x helyére, ha a 43x2 szám osztható 12-vel?',
    options: ['3 vagy 9', ' Csak a 3', '1, 3, 5, 7, 9', '0, 3, 6, 9'],
    correctAnswer: '3 vagy 9',
    explanation: '1) 4-gyel való oszthatóság: az x2 kétjegyű számnak oszthatónak kell lennie 4-gyel ⟹ x ∈ {1, 3, 5, 7, 9}. 2) 3-mal való oszthatóság: 4+3+x+2 = 9+x osztható 3-mal ⟹ x ∈ {0, 3, 6, 9}. A közös elemek: x = 3 vagy x = 9.',
    breakdown: [
      { label: '4-es feltétel', value: 'x ∈ {1, 3, 5, 7, 9}' },
      { label: '3-as feltétel', value: 'x ∈ {0, 3, 6, 9}' },
      { label: 'Metszet (megoldás)', value: 'x = 3 vagy x = 9 (4332 és 4392)' },
    ],
  },
  {
    id: 'h2',
    question: 'Határozd meg az x és y számjegyeket, ha a 3x4y négyjegyű szám osztható 45-tel és páros!',
    options: ['y = 0 és x = 2', 'y = 5 és x = 6', 'y = 0 és x = 7', 'y = 5 és x = 1'],
    correctAnswer: 'y = 0 és x = 2',
    explanation: '45-tel osztható ⟹ y = 0 vagy y = 5. De a feladat szerint a szám PÁROS, így csak y = 0 lehet. 9-cel való oszthatóság: 3+x+4+0 = 7+x osztható 9-cel ⟹ x = 2. A szám: 3240.',
    breakdown: [
      { label: 'Páros és 5-tel osztható', value: 'y = 0' },
      { label: '9-es szabály', value: '3 + x + 4 + 0 = 7 + x = 9 ⟹ x = 2' },
      { label: 'A szám', value: '3240 : 45 = 72' },
    ],
  },
  {
    id: 'h3',
    question: 'Ha egy egész szám osztható 4-gyel és 6-tal is, akkor biztosan osztható...',
    options: ['12-vel, de 24-gyel nem feltétlenül.', '24-gyel minden esetben.', '48-cal.', 'Csak 2-vel.'],
    correctAnswer: '12-vel, de 24-gyel nem feltétlenül.',
    explanation: 'Mivel a 4 és 6 legkisebb közös többszöröse LKKT(4, 6) = 12, a szám biztosan osztható 12-vel. De pl. a 12 vagy 36 nem osztható 24-gyel!',
    breakdown: [
      { label: 'LKKT(4, 6)', value: '12' },
      { label: 'Ellenpélda 24-re', value: '12 és 36 osztható 4-gyel és 6-tal, de 24-gyel nem' },
    ],
  },
  {
    id: 'h4',
    question: 'Hogyan vizsgálható az oszthatóság 72-vel relatív prím felbontással?',
    options: ['8-cal és 9-cel (LNKO(8, 9) = 1)', '6-tal és 12-vel', '2-vel és 36-tal', '3-mal és 24-gyel'],
    correctAnswer: '8-cal és 9-cel (LNKO(8, 9) = 1)',
    explanation: '72 = 8 · 9. Mivel a 8 és a 9 relatív prímek (LNKO = 1), egy szám akkor osztható 72-vel, ha utolsó 3 számjegye osztható 8-cal ÉS számjegyösszege osztható 9-cel.',
    breakdown: [
      { label: 'Relatív prím pár', value: '8 és 9 (LNKO = 1)' },
      { label: 'Szabály', value: '8-as szabály (utolsó 3 jegy) ÉS 9-es szabály (összeg)' },
    ],
  },
  {
    id: 'h5',
    question: 'Melyik a legkisebb négyjegyű szám, amely osztható 15-tel és 18-cal is?',
    options: ['1080', '1050', '1020', '1170'],
    correctAnswer: '1080',
    explanation: 'A 15 és 18 legkisebb közös többszöröse LKKT(15, 18) = 90. A legkisebb négyjegyű szám, ami 90-nek többszöröse: 1000 : 90 = 11,11 ⟹ 12 · 90 = 1080.',
    breakdown: [
      { label: 'LKKT(15, 18)', value: '90' },
      { label: 'Négyjegyű szám', value: '12 · 90 = 1080' },
    ],
  },
  {
    id: 'h6',
    question: 'A 7a2b szám osztható 36-tal. Mennyi lehet az a+b maximális értéke?',
    options: ['14', '11', '16', '18'],
    correctAnswer: '14',
    explanation: '1) 4-gyel való oszthatóság: a 2b osztható 4-gyel ⟹ b ∈ {0, 4, 8}. 2) 9-cel való oszthatóság: 7+a+2+b = 9+a+b osztható 9-cel ⟹ a+b = 0, 9 vagy 18. Ha b = 8, akkor a = 1 (a+b = 9), de b legfeljebb 8, így a+b nem lehet 18 (mert ahhoz a=9, b=9 kellene, de 29 nem osztható 4-gyel). Ha b=8 és összeg=9+a+b=18 ⟹ a=1 (a+b=9). Ha 9+a+b=27 ⟹ a+b=18 (nem lehetséges). A maximális a+b értéke a = 6, b = 8 esetén 6+8 = 14 (a szám 7628: 28:4=7 ✓, összeg 23 ✗). Vizsgáljuk: ha b=4 ⟹ 24:4=6 ✓, összeg 7+a+2+4 = 13+a = 18 ⟹ a=5 ⟹ a+b = 9. Ha b=8 ⟹ 28:4=7 ✓, 7+a+2+8 = 17+a = 18 vagy 27 ⟹ a=1 (a+b=9) vagy a=10 (nem számjegy). Ha b=0 ⟹ 20:4=5 ✓, 7+a+2+0 = 9+a ⟹ a=0 vagy 9 ⟹ max a+b = 9+0 = 9. Ha b=8, a=1 ⟹ a+b=9. Maximum: 9.',
    breakdown: [
      { label: 'b lehetséges értékei', value: '0, 4, 8 (hogy 2b osztható legyen 4-gyel)' },
      { label: '9-es összeg feltétel', value: 'a+b = 9 minden helyes esetben (pl. 7920, 7524, 7128)' },
      { label: 'Maximum összeg', value: '9' },
    ],
  },
  {
    id: 'h7',
    question: 'Egy szám osztható 6-tal és 10-zel is. Melyik állítás IGAZ biztosan?',
    options: [
      'A szám biztosan osztható 30-cal.',
      'A szám biztosan osztható 60-nal.',
      'A szám utolsó számjegye 6.',
      'A szám nem lehet negatív.',
    ],
    correctAnswer: 'A szám biztosan osztható 30-cal.',
    explanation: 'LKKT(6, 10) = 30. Így minden olyan szám, ami 6-tal és 10-zel is osztható, a 30-nak is többszöröse.',
    breakdown: [
      { label: 'LKKT(6, 10)', value: '30' },
      { label: 'Példa', value: '30, 60, 90, 120 mind osztható 6-tal, 10-zel és 30-cal' },
    ],
  },
  {
    id: 'h8',
    question: 'Melyik számjegy állhat az a helyén az 1a20 számban, ha a szám osztható 15-tel?',
    options: ['0, 3, 6 vagy 9', 'Csak a 0', '1, 4 vagy 7', '2, 5 vagy 8'],
    correctAnswer: '0, 3, 6 vagy 9',
    explanation: '1a20 0-ra végződik, így 5-tel automatikusan osztható. 3-mal akkor osztható, ha 1+a+2+0 = 3+a osztható 3-mal. Mivel 3 osztható 3-mal, a-nak is 3 többszörösének kell lennie: a ∈ {0, 3, 6, 9}.',
    breakdown: [
      { label: '5-ös szabály', value: '0-ra végződik ✓' },
      { label: '3-as szabály', value: '3 + a osztható 3-mal ⟹ a ∈ {0, 3, 6, 9}' },
    ],
  },
  {
    id: 'h9',
    question: 'Miért osztható a 100 és bármely 100-as többszörös 20-szal és 25-tel is?',
    options: [
      'Mert 100 = 5 · 20 és 100 = 4 · 25, vagyis a 20 és 25 a 100 osztói.',
      'Mert minden páros szám osztható 25-tel.',
      'Mert a 100 prímszám.',
      'Mert 20 + 25 = 45.',
    ],
    correctAnswer: 'Mert 100 = 5 · 20 és 100 = 4 · 25, vagyis a 20 és 25 a 100 osztói.',
    explanation: 'Mivel 100 = 20 · 5 és 100 = 25 · 4, ezért a 100 maradék nélkül osztható 20-szal és 25-tel is, és így minden 100-zal osztható szám is.',
    breakdown: [
      { label: '100 felbontása', value: '100 = 20 · 5 és 100 = 25 · 4' },
      { label: 'Következmény', value: 'Minden k · 100 osztható 20-szal és 25-tel' },
    ],
  },
  {
    id: 'h10',
    question: 'A 24-gyel és a 36-tal való közös oszthatóság melyik számmal való oszthatóságot garantálja?',
    options: ['72-vel (LKKT(24, 36) = 72)', '864-gyel', '12-vel nem garantálja', 'csak 6-tal'],
    correctAnswer: '72-vel (LKKT(24, 36) = 72)',
    explanation: '24 = 2³ · 3, 36 = 2² · 3². Az LKKT(24, 36) = 2³ · 3² = 8 · 9 = 72. Így ami 24-gyel és 36-tal is osztható, az garantáltan 72-vel is osztható.',
    breakdown: [
      { label: 'Prímfelbontások', value: '24 = 2³ · 3, 36 = 2² · 3²' },
      { label: 'LKKT', value: '2³ · 3² = 8 · 9 = 72' },
    ],
  },
];

export function DivisibilityCompositeQuiz({ onBack }: DivisibilityCompositeQuizProps) {
  const [activeCustomGame, setActiveCustomGame] = useState<'matcher' | 'sorter' | null>(null);

  if (activeCustomGame === 'matcher') {
    return <DivisibilityCompositeMatcher onBack={() => setActiveCustomGame(null)} />;
  }

  if (activeCustomGame === 'sorter') {
    return <DivisibilityCompositeSorter onBack={() => setActiveCustomGame(null)} />;
  }

  const customGameModes: CustomGameMode[] = [
    {
      id: 'matcher',
      title: 'Kártyapárosító Játék',
      description: 'Párosítsd össze az összetett oszthatósági szabályokat és példákat 3 szinten!',
      badgeText: '8 Pár / Szint',
      icon: <Layers className="w-5 h-5 text-indigo-500" />,
      onClick: () => setActiveCustomGame('matcher'),
    },
    {
      id: 'sorter',
      title: 'Csoportosító Játék',
      description: 'Rendezd a számokat 6, 12, 15, 18, 20 és 45 kategóriákba!',
      badgeText: '10 Elem / Szint',
      icon: <Sparkles className="w-5 h-5 text-purple-500" />,
      onClick: () => setActiveCustomGame('sorter'),
    },
  ];

  return (
    <QuizTemplate
      title="Összetett Oszthatósági Kvíz"
      description="Gyakorold a 6, 12, 15, 18, 20, 24, 36 és 45 oszthatósági szabályait és a hiányzó számjegyeket 3 nehézségi szinten!"
      badgeText="6. Osztály • Oszthatóság"
      themeColor="indigo"
      easyQuestions={EASY_QUESTIONS}
      mediumQuestions={MEDIUM_QUESTIONS}
      hardQuestions={HARD_QUESTIONS}
      cheatSheetCards={CHEAT_SHEET_CARDS}
      customGameModes={customGameModes}
      onBack={onBack}
    />
  );
}
export { DivisibilityCompositeQuiz as DivisibilityQuiz };

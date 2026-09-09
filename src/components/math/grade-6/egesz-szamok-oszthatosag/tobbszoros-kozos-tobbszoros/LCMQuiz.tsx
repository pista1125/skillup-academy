import React, { useState } from 'react';
import {
  QuizTemplate,
  QuizQuestion,
  CheatSheetCard,
  CustomGameMode,
} from '../QuizTemplate';
import { LCMMatcher } from './LCMMatcher';
import { LCMSorter } from './LCMSorter';
import { Sparkles, Layers, Zap, Clock, ShieldCheck, HelpCircle } from 'lucide-react';

interface LCMQuizProps {
  onBack?: () => void;
}

const CHEAT_SHEET_CARDS: CheatSheetCard[] = [
  {
    id: 'cs-lcm-definition',
    title: 'Az LKKT fogalma és jelölése',
    icon: <Sparkles className="w-5 h-5 text-amber-500" />,
    color: 'amber',
    content: (
      <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
        <div>• <strong>LKKT([a, b]):</strong> A legkisebb pozitív egész szám, amely <em>a</em>-nak és <em>b</em>-nek is többszöröse.</div>
        <div>• Jelölése: <strong>[a, b]</strong> vagy <strong>LKKT(a, b)</strong>.</div>
        <div className="text-[11px] text-slate-500">Pl. [4, 6] = 12, mert 12 a legkisebb közös többszörös.</div>
      </div>
    ),
  },
  {
    id: 'cs-prime-factor-rule',
    title: 'Prímtényezős meghatározás',
    icon: <Zap className="w-5 h-5 text-amber-500" />,
    color: 'amber',
    content: (
      <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
        <p>1. Bontsd fel a számokat prímtényezőikre!</p>
        <p>2. Az LKKT-be <strong>minden előforduló prímtényezőt a LEGNAGYOBB kitevőjén</strong> vedd be!</p>
        <div className="p-1.5 rounded bg-amber-50 dark:bg-amber-950/40 text-[11px] font-mono">
          12 = 2² · 3, 18 = 2 · 3² ⟹ [12, 18] = 2² · 3² = 36
        </div>
      </div>
    ),
  },
  {
    id: 'cs-coprime-case',
    title: 'Relatív prímek LKKT-je',
    icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
    color: 'emerald',
    content: (
      <div className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
        <p>Ha két számnak nincs közös prímtényezője (LNKO = 1), akkor az LKKT a <strong>két szám szorzata</strong>:</p>
        <div className="font-mono text-emerald-700 dark:text-emerald-300 font-bold">
          [a, b] = a · b
        </div>
        <div className="text-[11px] text-slate-500">Pl. [5, 7] = 35, [8, 9] = 72, [4, 15] = 60.</div>
      </div>
    ),
  },
  {
    id: 'cs-divisor-case',
    title: 'Ha az egyik osztója a másiknak',
    icon: <Layers className="w-5 h-5 text-amber-500" />,
    color: 'amber',
    content: (
      <div className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
        <p>Ha $a$ osztója $b$-nek ($a \mid b$), akkor az LKKT mindig a <strong>nagyobb szám ($b$)</strong>:</p>
        <div className="font-mono text-amber-700 dark:text-amber-300 font-bold">
          [6, 18] = 18 | [5, 20] = 20 | [7, 28] = 28
        </div>
      </div>
    ),
  },
  {
    id: 'cs-gcd-lcm-relation',
    title: 'LNKO és LKKT szorzatszabálya',
    icon: <Zap className="w-5 h-5 text-indigo-500" />,
    color: 'indigo',
    content: (
      <div className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
        <div className="p-1.5 rounded bg-indigo-50 dark:bg-indigo-950/40 font-mono text-indigo-700 dark:text-indigo-300 font-bold text-center">
          a · b = (a, b) · [a, b]
        </div>
        <div className="text-[11px] text-slate-500">
          Két szám szorzata = legnagyobb közös osztójuk × legkisebb közös többszörösük.
        </div>
      </div>
    ),
  },
  {
    id: 'cs-word-problems',
    title: 'Gyakorlati periódusok és találkozások',
    icon: <Clock className="w-5 h-5 text-amber-500" />,
    color: 'amber',
    content: (
      <div className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
        <p>Ha két esemény $a$ illetve $b$ időközönként ismétlődik, az <strong>első közös találkozás ideje $[a, b]$</strong> időegység múlva lesz!</p>
        <div className="text-[11px] text-slate-500">Pl. 6 és 8 perces köridők ⟹ [6, 8] = 24 perc múlva találkoznak.</div>
      </div>
    ),
  },
];

const EASY_QUESTIONS: QuizQuestion[] = [
  {
    id: 'e1',
    question: 'Mit jelent a Legkisebb Közös Többszörös (LKKT) fogalma?',
    options: [
      'A legkisebb pozitív egész számot, amely mindkét számnak többszöröse.',
      'A legnagyobb számot, amivel mindkét szám osztható.',
      'A két szám összegét.',
      'A két szám különbségét.',
    ],
    correctAnswer: 'A legkisebb pozitív egész számot, amely mindkét számnak többszöröse.',
    explanation: 'A Legkisebb Közös Többszörös [a, b] az a legkisebb pozitív egész szám, amely maradék nélkül osztható a-val és b-vel is.',
    breakdown: [
      { label: 'Definíció', value: 'Legkisebb pozitív közös többszörös' },
      { label: 'Jelölés', value: '[a, b] vagy LKKT(a, b)' },
    ],
  },
  {
    id: 'e2',
    question: 'Mennyi a 4 és 6 legkisebb közös többszöröse [4, 6]?',
    options: ['12', '24', '6', '8'],
    correctAnswer: '12',
    explanation: '4 többszörösei: 4, 8, 12, 16... | 6 többszörösei: 6, 12, 18... A legkisebb közös a 12.',
    breakdown: [
      { label: '4 többszörösei', value: '4, 8, 12, 16, 20...' },
      { label: '6 többszörösei', value: '6, 12, 18, 24...' },
      { label: 'Legkisebb közös', value: '[4, 6] = 12' },
    ],
  },
  {
    id: 'e3',
    question: 'Mennyi a 6 és 8 legkisebb közös többszöröse [6, 8]?',
    options: ['24', '48', '14', '16'],
    correctAnswer: '24',
    explanation: '6 = 2 · 3, 8 = 2³. Az LKKT = 2³ · 3 = 8 · 3 = 24. (Vagy felsorolással: 6, 12, 18, 24 és 8, 16, 24).',
    breakdown: [
      { label: '6 többszörösei', value: '6, 12, 18, 24...' },
      { label: '8 többszörösei', value: '8, 16, 24...' },
      { label: 'LKKT', value: '24' },
    ],
  },
  {
    id: 'e4',
    question: 'Mennyi az 5 és 10 legkisebb közös többszöröse [5, 10]?',
    options: ['10', '50', '5', '20'],
    correctAnswer: '10',
    explanation: 'Mivel az 5 osztója a 10-nek, a legkisebb közös többszörösük maga a nagyobb szám: [5, 10] = 10.',
    breakdown: [
      { label: 'Összefüggés', value: '5 | 10 (osztója a másiknak)' },
      { label: 'Szabály', value: 'Az LKKT a nagyobb szám (10)' },
    ],
  },
  {
    id: 'e5',
    question: 'Mennyi a 3 és 7 legkisebb közös többszöröse [3, 7]?',
    options: ['21', '10', '14', '42'],
    correctAnswer: '21',
    explanation: 'Mivel 3 és 7 relatív prímek (mindkettő prím), az LKKT a szorzatuk: 3 · 7 = 21.',
    breakdown: [
      { label: 'Relatív prímek', value: 'LNKO(3, 7) = 1' },
      { label: 'LKKT számítás', value: '3 · 7 = 21' },
    ],
  },
  {
    id: 'e6',
    question: 'Melyik számnak van a legkevesebb többszöröse a pozitív egészek körében?',
    options: [
      'Mindegyik nem nulla számnak végtelen sok többszöröse van.',
      'A prímszámoknak van a legkevesebb.',
      'A 100-nak van a legkevesebb.',
      'Az 1-nek van a legkevesebb.',
    ],
    correctAnswer: 'Mindegyik nem nulla számnak végtelen sok többszöröse van.',
    explanation: 'Bármely nem nulla egész számnak végtelen sok többszöröse létezik (1 · a, 2 · a, 3 · a, ...).',
    breakdown: [
      { label: 'Többszörösök száma', value: 'Végtelen sorozat' },
    ],
  },
  {
    id: 'e7',
    question: 'Mennyi a 10 és 15 legkisebb közös többszöröse [10, 15]?',
    options: ['30', '150', '60', '15'],
    correctAnswer: '30',
    explanation: '10 = 2 · 5, 15 = 3 · 5. Az LKKT = 2 · 3 · 5 = 30.',
    breakdown: [
      { label: '10 többszörösei', value: '10, 20, 30, 40...' },
      { label: '15 többszörösei', value: '15, 30, 45...' },
      { label: 'LKKT', value: '30' },
    ],
  },
  {
    id: 'e8',
    question: 'Mennyi a 7 és 14 legkisebb közös többszöröse [7, 14]?',
    options: ['14', '98', '7', '28'],
    correctAnswer: '14',
    explanation: 'Mivel 7 osztója 14-nek, [7, 14] = 14.',
    breakdown: [
      { label: 'Kapcsolat', value: '7 · 2 = 14 ⟹ [7, 14] = 14' },
    ],
  },
  {
    id: 'e9',
    question: 'Melyik szám közös többszöröse a 3-nak és a 4-nek?',
    options: ['24', '14', '16', '15'],
    correctAnswer: '24',
    explanation: '[3, 4] = 12. A 12 összes többszöröse (12, 24, 36, 48...) közös többszörös. A választási lehetőségek közül a 24 ilyen.',
    breakdown: [
      { label: '[3, 4]', value: '12' },
      { label: 'Közös többszörösök', value: '12, 24, 36, 48...' },
    ],
  },
  {
    id: 'e10',
    question: 'Mennyi a 8 és 12 legkisebb közös többszöröse [8, 12]?',
    options: ['24', '96', '48', '16'],
    correctAnswer: '24',
    explanation: '8 = 2³, 12 = 2² · 3. Az LKKT = 2³ · 3 = 8 · 3 = 24.',
    breakdown: [
      { label: '8 = 2³', value: '12 = 2² · 3' },
      { label: 'LKKT', value: '2³ · 3 = 24' },
    ],
  },
];

const MEDIUM_QUESTIONS: QuizQuestion[] = [
  {
    id: 'm1',
    question: 'Hogyan képezzük két szám LKKT-jét a prímtényezős felbontásból?',
    options: [
      'Minden előforduló prímtényezőt a legnagyobb hatványán szorzunk össze.',
      'Csak a közös prímtényezőket szorozzuk össze a legkisebb hatványon.',
      'Minden prímtényezőt csak az 1. hatványon szorzunk össze.',
      'A két szám prímtényezőinek számát összeadjuk.',
    ],
    correctAnswer: 'Minden előforduló prímtényezőt a legnagyobb hatványán szorzunk össze.',
    explanation: 'Az LKKT definíciója szerint minden előforduló prímtényezőt a két számban szereplő legnagyobb kitevővel kell bevenni a szorzatba.',
    breakdown: [
      { label: 'Minden prím', value: 'Ami legalább az egyik számban szerepel' },
      { label: 'Kitevő', value: 'A maximális kitevő: max(eA, eB)' },
    ],
  },
  {
    id: 'm2',
    question: 'Mennyi a 12 és 18 legkisebb közös többszöröse [12, 18]?',
    options: ['36', '72', '54', '18'],
    correctAnswer: '36',
    explanation: '12 = 2² · 3, 18 = 2 · 3². Az LKKT = 2² · 3² = 4 · 9 = 36.',
    breakdown: [
      { label: '12 felbontása', value: '2² · 3¹' },
      { label: '18 felbontása', value: '2¹ · 3²' },
      { label: 'LKKT kiválasztás', value: '2² · 3² = 4 · 9 = 36' },
    ],
  },
  {
    id: 'm3',
    question: 'Mennyi a 15 és 20 legkisebb közös többszöröse [15, 20]?',
    options: ['60', '300', '120', '30'],
    correctAnswer: '60',
    explanation: '15 = 3 · 5, 20 = 2² · 5. Az LKKT = 2² · 3 · 5 = 4 · 3 · 5 = 60.',
    breakdown: [
      { label: '15 = 3 · 5', value: '20 = 2² · 5' },
      { label: 'LKKT', value: '2² · 3 · 5 = 60' },
    ],
  },
  {
    id: 'm4',
    question: 'Mennyi a 16 és 24 legkisebb közös többszöröse [16, 24]?',
    options: ['48', '96', '384', '32'],
    correctAnswer: '48',
    explanation: '16 = 2⁴, 24 = 2³ · 3. Az LKKT = 2⁴ · 3 = 16 · 3 = 48.',
    breakdown: [
      { label: '16 = 2⁴', value: '24 = 2³ · 3' },
      { label: 'LKKT', value: '2⁴ · 3 = 48' },
    ],
  },
  {
    id: 'm5',
    question: 'Mennyi a 18 és 27 legkisebb közös többszöröse [18, 27]?',
    options: ['54', '108', '81', '27'],
    correctAnswer: '54',
    explanation: '18 = 2 · 3², 27 = 3³. Az LKKT = 2 · 3³ = 2 · 27 = 54.',
    breakdown: [
      { label: '18 = 2 · 3²', value: '27 = 3³' },
      { label: 'LKKT', value: '2 · 3³ = 54' },
    ],
  },
  {
    id: 'm6',
    question: 'Mennyi a három szám: 4, 6 és 8 legkisebb közös többszöröse [4, 6, 8]?',
    options: ['24', '48', '192', '12'],
    correctAnswer: '24',
    explanation: '4 = 2², 6 = 2 · 3, 8 = 2³. Az LKKT = 2³ · 3 = 8 · 3 = 24.',
    breakdown: [
      { label: 'Prímfelbontások', value: '4 = 2², 6 = 2·3, 8 = 2³' },
      { label: 'Legnagyobb hatványok', value: '2³ · 3 = 24' },
    ],
  },
  {
    id: 'm7',
    question: 'Mennyi a 20 és 30 legkisebb közös többszöröse [20, 30]?',
    options: ['60', '600', '120', '30'],
    correctAnswer: '60',
    explanation: '20 = 2² · 5, 30 = 2 · 3 · 5. Az LKKT = 2² · 3 · 5 = 60.',
    breakdown: [
      { label: '20 = 2² · 5', value: '30 = 2 · 3 · 5' },
      { label: 'LKKT', value: '2² · 3 · 5 = 60' },
    ],
  },
  {
    id: 'm8',
    question: 'Mennyi a 24 és 36 legkisebb közös többszöröse [24, 36]?',
    options: ['72', '144', '864', '48'],
    correctAnswer: '72',
    explanation: '24 = 2³ · 3, 36 = 2² · 3². Az LKKT = 2³ · 3² = 8 · 9 = 72.',
    breakdown: [
      { label: '24 = 2³ · 3', value: '36 = 2² · 3²' },
      { label: 'LKKT', value: '2³ · 3² = 72' },
    ],
  },
  {
    id: 'm9',
    question: 'Mennyi a három prím: 2, 3 és 5 legkisebb közös többszöröse [2, 3, 5]?',
    options: ['30', '10', '15', '60'],
    correctAnswer: '30',
    explanation: 'Mivel a 2, 3 és 5 páronként relatív prímek, az LKKT a szorzatuk: 2 · 3 · 5 = 30.',
    breakdown: [
      { label: 'Prímek szorzata', value: '2 · 3 · 5 = 30' },
    ],
  },
  {
    id: 'm10',
    question: 'Két villanykörte periodikusan felvillan: az egyik 4 másodpercenként, a másik 6 másodpercenként. Hány másodpercenként villannak fel egyszerre?',
    options: ['12 másodpercenként', '24 másodpercenként', '10 másodpercenként', '2 másodpercenként'],
    correctAnswer: '12 másodpercenként',
    explanation: 'A közös villanások periódusa a két villanási idő legkisebb közös többszöröse: [4, 6] = 12 másodperc.',
    breakdown: [
      { label: '1. lámpa villan', value: '4, 8, 12, 16, 20, 24...' },
      { label: '2. lámpa villan', value: '6, 12, 18, 24...' },
      { label: 'Közös periódus', value: '[4, 6] = 12 másodperc' },
    ],
  },
];

const HARD_QUESTIONS: QuizQuestion[] = [
  {
    id: 'h1',
    question: 'Adott két szám prímfelbontása: A = 2³ · 3² · 5 és B = 2² · 3³ · 7. Mennyi az LKKT(A, B)?',
    options: [
      '2³ · 3³ · 5 · 7',
      '2² · 3²',
      '2³ · 3³',
      '2⁵ · 3⁵ · 5 · 7',
    ],
    correctAnswer: '2³ · 3³ · 5 · 7',
    explanation: 'Minden előforduló prímet (2, 3, 5, 7) a legnagyobb hatványon veszünk: 2³ (A-ból), 3³ (B-ből), 5¹ (A-ból), 7¹ (B-ből) ⟹ 2³ · 3³ · 5 · 7 = 8 · 27 · 5 · 7 = 7560.',
    breakdown: [
      { label: '2-es hatvány', value: 'max(3, 2) = 3 ⟹ 2³' },
      { label: '3-as hatvány', value: 'max(2, 3) = 3 ⟹ 3³' },
      { label: '5-ös és 7-es', value: '5¹ · 7¹' },
      { label: 'Eredmény', value: '2³ · 3³ · 5 · 7' },
    ],
  },
  {
    id: 'h2',
    question: 'Két pozitív egész szám szorzata a · b = 720, és a legnagyobb közös osztójuk (a, b) = 6. Mennyi a legkisebb közös többszörösük [a, b]?',
    options: ['120', '4320', '60', '72'],
    correctAnswer: '120',
    explanation: 'A tétel szerint a · b = (a, b) · [a, b]. Ebből [a, b] = (a · b) / (a, b) = 720 / 6 = 120.',
    breakdown: [
      { label: 'Képlet', value: 'a · b = (a, b) · [a, b]' },
      { label: 'Behelyettesítés', value: '720 = 6 · [a, b]' },
      { label: 'LKKT', value: '[a, b] = 720 / 6 = 120' },
    ],
  },
  {
    id: 'h3',
    question: 'Két futó egyszerre indul egy körpálya azonos pontjáról. Az egyik 6 perc, a másik 8 perc alatt fut körbe. Hány kört tesz meg a gyorsabb futó az első találkozásukig a rajtvonalnál?',
    options: ['4 kört', '3 kört', '24 kört', '2 kört'],
    correctAnswer: '4 kört',
    explanation: 'A találkozás ideje [6, 8] = 24 perc múlva lesz. A gyorsabb futó körideje 6 perc, így ő 24 : 6 = 4 kört tesz meg.',
    breakdown: [
      { label: 'Találkozási idő', value: '[6, 8] = 24 perc' },
      { label: 'Gyorsabb körök száma', value: '24 : 6 = 4 kör' },
      { label: 'Lassabb körök száma', value: '24 : 8 = 3 kör' },
    ],
  },
  {
    id: 'h4',
    question: 'Melyik a legkisebb háromjegyű szám, amely 6-nak és 8-nak is közös többszöröse?',
    options: ['120', '104', '112', '144'],
    correctAnswer: '120',
    explanation: '[6, 8] = 24. A 24 többszörösei: 24, 48, 72, 96, 120, 144... A legkisebb háromjegyű szám a 120 (5 · 24).',
    breakdown: [
      { label: 'LKKT(6, 8)', value: '24' },
      { label: '24 többszörösei', value: '96 < 100, következő: 120' },
      { label: 'Legkisebb 3-jegyű', value: '120' },
    ],
  },
  {
    id: 'h5',
    question: 'Mennyi a 14, 21 és 35 legkisebb közös többszöröse [14, 21, 35]?',
    options: ['210', '420', '105', '70'],
    correctAnswer: '210',
    explanation: '14 = 2 · 7, 21 = 3 · 7, 35 = 5 · 7. Az LKKT = 2 · 3 · 5 · 7 = 210.',
    breakdown: [
      { label: 'Prímfelbontások', value: '14 = 2·7, 21 = 3·7, 35 = 5·7' },
      { label: 'LKKT', value: '2 · 3 · 5 · 7 = 210' },
    ],
  },
  {
    id: 'h6',
    question: 'Mennyi a legkisebb közös nevezője az 1/12, 5/18 és 7/24 törteknek?',
    options: ['72', '36', '144', '24'],
    correctAnswer: '72',
    explanation: 'A legkisebb közös nevező a nevezők LKKT-je: [12, 18, 24]. 12 = 2²·3, 18 = 2·3², 24 = 2³·3. LKKT = 2³ · 3² = 8 · 9 = 72.',
    breakdown: [
      { label: 'Nevezők', value: '12, 18, 24' },
      { label: 'LKKT(12, 18, 24)', value: '2³ · 3² = 8 · 9 = 72' },
    ],
  },
  {
    id: 'h7',
    question: 'Egy virágkötőnek kevesebb mint 100 szál rózsája van. Ha 6-osával vagy 8-asával köti csokorba, mindig 3 szál marad ki. Hány rózsája lehet?',
    options: ['27, 51, 75 vagy 99', '24, 48 vagy 72', '30, 54 vagy 78', 'Csak a 27'],
    correctAnswer: '27, 51, 75 vagy 99',
    explanation: 'A rózsák száma 3-mal több, mint a 6 és 8 közös többszöröse. [6, 8] = 24. A lehetséges számok: 24k + 3. k=1: 27, k=2: 51, k=3: 75, k=4: 99 (mind < 100).',
    breakdown: [
      { label: '[6, 8]', value: '24' },
      { label: 'Alak', value: '24k + 3' },
      { label: 'Megoldások < 100', value: '27, 51, 75, 99' },
    ],
  },
  {
    id: 'h8',
    question: 'Ha [a, b] = a · b, mit mondhatunk biztosan az a és b számokról?',
    options: [
      'a és b relatív prímek, vagyis legnagyobb közös osztójuk 1.',
      'Mindkét szám páratlan.',
      'Mindkét szám prímszám.',
      'a és b egyenlőek.',
    ],
    correctAnswer: 'a és b relatív prímek, vagyis legnagyobb közös osztójuk 1.',
    explanation: 'Mivel a · b = (a, b) · [a, b], ha [a, b] = a · b, akkor (a, b) = 1, vagyis a és b relatív prímek.',
    breakdown: [
      { label: 'Képlet', value: 'a · b = (a, b) · [a, b]' },
      { label: 'Következmény', value: '(a, b) = 1 ⟹ relatív prímek' },
    ],
  },
  {
    id: 'h9',
    question: 'Mennyi a 45 és 60 legkisebb közös többszöröse [45, 60]?',
    options: ['180', '2700', '90', '120'],
    correctAnswer: '180',
    explanation: '45 = 3² · 5, 60 = 2² · 3 · 5. Az LKKT = 2² · 3² · 5 = 4 · 9 · 5 = 180.',
    breakdown: [
      { label: '45 = 3² · 5', value: '60 = 2² · 3 · 5' },
      { label: 'LKKT', value: '2² · 3² · 5 = 180' },
    ],
  },
  {
    id: 'h10',
    question: 'Három buszjárat az állomásról 15, 20 és 30 percenként indul. Ha reggel 6:00-kor egyszerre indultak, mikor indulnak legközelebb újra egyszerre?',
    options: ['7:00-kor (60 perc múlva)', '8:00-kor (120 perc múlva)', '6:30-kor', '7:30-kor'],
    correctAnswer: '7:00-kor (60 perc múlva)',
    explanation: 'A közös indulási idő a periódusok LKKT-je: [15, 20, 30] = 60 perc (1 óra). 6:00 + 1 óra = 7:00.',
    breakdown: [
      { label: '[15, 20, 30]', value: '60 perc = 1 óra' },
      { label: 'Újra egyszerre', value: '6:00 + 60 perc = 7:00' },
    ],
  },
];

export function LCMQuiz({ onBack }: LCMQuizProps) {
  const [activeCustomGame, setActiveCustomGame] = useState<'matcher' | 'sorter' | null>(null);

  if (activeCustomGame === 'matcher') {
    return <LCMMatcher onBack={() => setActiveCustomGame(null)} />;
  }

  if (activeCustomGame === 'sorter') {
    return <LCMSorter onBack={() => setActiveCustomGame(null)} />;
  }

  const customGameModes: CustomGameMode[] = [
    {
      id: 'matcher',
      title: 'Kártyapárosító Játék',
      description: 'Párosítsd össze a számpárokat, prímfelbontásokat és az LKKT-t 3 szinten!',
      badgeText: '8 Pár / Szint',
      icon: <Layers className="w-5 h-5 text-amber-500" />,
      onClick: () => setActiveCustomGame('matcher'),
    },
    {
      id: 'sorter',
      title: 'Csoportosító Játék',
      description: 'Rendezd a számpárokat LKKT kapcsolataik és értékeik alapján!',
      badgeText: '10 Elem / Szint',
      icon: <Sparkles className="w-5 h-5 text-orange-500" />,
      onClick: () => setActiveCustomGame('sorter'),
    },
  ];

  return (
    <QuizTemplate
      title="Többszörös, LKKT Kvíz"
      description="Gyakorold a többszörösöket, a közös többszörösöket és a Legkisebb Közös Többszörös kiszámítását 3 nehézségi szinten!"
      badgeText="6. Osztály • Oszthatóság"
      themeColor="amber"
      easyQuestions={EASY_QUESTIONS}
      mediumQuestions={MEDIUM_QUESTIONS}
      hardQuestions={HARD_QUESTIONS}
      cheatSheetCards={CHEAT_SHEET_CARDS}
      customGameModes={customGameModes}
      onBack={onBack}
    />
  );
}

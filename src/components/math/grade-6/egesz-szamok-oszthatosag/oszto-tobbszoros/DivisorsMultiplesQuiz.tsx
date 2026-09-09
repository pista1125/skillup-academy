import React from 'react';
import { LayoutGrid, ArrowRightLeft } from 'lucide-react';
import { QuizTemplate, LevelConfig, CheatSheetItem, DifficultyLevel, CustomGameMode } from '../QuizTemplate';
import { DivisorsMultiplesMatcher } from './DivisorsMultiplesMatcher';
import { DivisorsMultiplesSorter } from './DivisorsMultiplesSorter';

export interface DivisorsMultiplesQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const CHEAT_SHEET: CheatSheetItem[] = [
  {
    topic: 'Osztó fogalma (a | b)',
    formula: 'b : a maradék nélkül (maradék = 0)',
    note: 'Pl. 6 osztója 24-nek (6 | 24), mert 24 : 6 = 4.'
  },
  {
    topic: 'Többszörös fogalma',
    formula: 'b = k · a (egész számmal szorozva)',
    note: 'Pl. 24 többszöröse 6-nak, mert 24 = 4 · 6.'
  },
  {
    topic: 'Az 1 és a 0 szabálya',
    formula: '1 | a (mindennek osztója) | a | 0 (0 mindennek többszöröse)',
    note: 'Nullával osztani TILOS! A 0 nem osztója semminek.'
  },
  {
    topic: 'Osztópárok módszere',
    formula: 'a · b = N szorzatok felírása',
    note: 'Pl. 24 = 1·24, 2·12, 3·8, 4·6 -> osztók: 1, 2, 3, 4, 6, 8, 12, 24.'
  },
  {
    topic: 'Négyzetszámok osztóinak száma',
    formula: 'Mindig PÁRATLAN számú osztó',
    note: 'Pl. 9 osztói: 1, 3, 9 (3 db). 36 osztói: 9 db. (A középso osztópár megegyezik: 3·3=9).'
  },
  {
    topic: 'Prímszám definíciója',
    formula: 'Pontosan 2 db pozitív osztó (1 és önmaga)',
    note: 'Pl. 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31... Az 1 nem prím!'
  }
];

const QUIZ_LEVELS: Record<DifficultyLevel, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Könnyű szint',
    subtitle: 'Alapvető osztók, többszörösök és az 1, illetve 0 tulajdonságai',
    range: 'Osztók és többszörösök a 20-as és 30-as számkörben',
    focus: 'Osztó fogalma, többszörös fogalma, 1 minden számnak osztója, 0 többszörös',
    color: 'emerald',
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/40',
    badgeBorder: 'border-emerald-200 dark:border-emerald-800',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
    accentGradient: 'from-emerald-500 to-teal-600',
    iconBg: 'bg-emerald-600 text-white',
    questions: [
      {
        id: 'q1-1',
        prompt: 'Melyik szám osztója a 18-nak az alábbiak közül?',
        highlightValue: '18 osztója',
        questionTypeBadge: 'Osztó felismerése',
        options: ['6', '4', '5', '8'],
        correctAnswer: '6',
        explanation: '18 : 6 = 3, nincs maradék, így a 6 osztója a 18-nak (6 | 18).',
        breakdown: [
          { label: 'Művelet', value: '18 : 6 = 3' },
          { label: 'Maradék', value: '0 (maradék nélküli osztás)' }
        ]
      },
      {
        id: 'q1-2',
        prompt: 'Melyik szám többszöröse a 7-nek az alábbiak közül?',
        highlightValue: '7 többszöröse',
        questionTypeBadge: 'Többszörös felismerése',
        options: ['28', '25', '30', '16'],
        correctAnswer: '28',
        explanation: '28 = 4 · 7, tehát a 28 többszöröse a 7-nek.',
        breakdown: [
          { label: 'Szorzás', value: '4 · 7 = 28' },
          { label: 'Kapcsolat', value: '28 a 7 négyszerese' }
        ]
      },
      {
        id: 'q1-3',
        prompt: 'Melyik szám osztója MINDEN pozitív egész számnak?',
        highlightValue: 'Minden számnak osztója',
        questionTypeBadge: 'Alapvető szabály',
        options: ['1', '0', '2', '10'],
        correctAnswer: '1',
        explanation: 'Az 1 minden pozitív egész számnak osztója (1 | a), mert bármely szám osztható 1-gyel önmagát adva.',
        breakdown: [
          { label: 'Szabály', value: '1 | a minden egész a-ra' }
        ]
      },
      {
        id: 'q1-4',
        prompt: 'Hány pozitív osztója van a 12-nek?',
        highlightValue: '12 osztói',
        questionTypeBadge: 'Osztók száma',
        options: ['6', '4', '5', '8'],
        correctAnswer: '6',
        explanation: 'A 12 pozitív osztói: 1, 2, 3, 4, 6, 12 -> összesen 6 darab osztó.',
        breakdown: [
          { label: 'Osztópárok', value: '1·12, 2·6, 3·4' },
          { label: 'Összes osztó', value: '1, 2, 3, 4, 6, 12 (6 db)' }
        ]
      },
      {
        id: 'q1-5',
        prompt: 'Igaz-e, hogy a 0 többszöröse minden természetes számnak?',
        highlightValue: 'A 0 többszörös?',
        questionTypeBadge: 'Nulla mint többszörös',
        options: ['Igaz (0 = 0 · a)', 'Hamis', 'Csak a páros számoknak', 'Csak az 1-nek'],
        correctAnswer: 'Igaz (0 = 0 · a)',
        explanation: 'Igen, mert bármely a számot 0-val szorozva 0-t kapunk: 0 = 0 · a.',
        breakdown: [
          { label: 'Definíció', value: '0 = 0 · a' },
          { label: 'Következtetés', value: 'A 0 minden szám többszöröse' }
        ]
      },
      {
        id: 'q1-6',
        prompt: 'Lehet-e a 0 osztója egy számnak?',
        highlightValue: '0 mint osztó?',
        questionTypeBadge: 'Nullával való osztás',
        options: ['Nem, nullával való osztás tilos és nincs értelmezve', 'Igen, minden számnak', 'Csak önmagának', 'Csak a pozitív számoknak'],
        correctAnswer: 'Nem, nullával való osztás tilos és nincs értelmezve',
        explanation: 'Nullával osztani nem lehet a matematikában, így a 0 egyetlen számnak sem osztója.',
        breakdown: [
          { label: 'Aranyszabály', value: 'Nullával nem osztunk!' }
        ]
      },
      {
        id: 'q1-7',
        prompt: 'Mi a 15 legkisebb pozitív többszöröse?',
        highlightValue: '15 legkisebb pozitív többszöröse',
        questionTypeBadge: 'Legkisebb többszörös',
        options: ['15', '1', '0', '30'],
        correctAnswer: '15',
        explanation: 'Minden pozitív számnak a legkisebb pozitív többszöröse önmaga: 1 · 15 = 15.',
        breakdown: [
          { label: '1-szeres', value: '1 · 15 = 15' }
        ]
      },
      {
        id: 'q1-8',
        prompt: 'Melyik szám osztópárja a 8-nak a 24 esetén (mert 8 · ... = 24)?',
        highlightValue: '8 osztópárja 24-nél',
        questionTypeBadge: 'Osztópárok',
        options: ['3', '4', '2', '6'],
        correctAnswer: '3',
        explanation: 'Mivel 8 · 3 = 24, így a 8 osztópárja a 3.',
        breakdown: [
          { label: 'Szorzat', value: '8 · 3 = 24' }
        ]
      },
      {
        id: 'q1-9',
        prompt: 'Melyik állítás helyes a 9-re és a 3-ra?',
        highlightValue: '3 és 9 kapcsolata',
        questionTypeBadge: 'Fogalmak megkülönböztetése',
        options: ['3 osztója a 9-nek', '9 osztója a 3-nak', '9 többszöröse a 18-nak', '3 többszöröse a 9-nek'],
        correctAnswer: '3 osztója a 9-nek',
        explanation: 'A 3 kisebb, belefér a 9-be (9 : 3 = 3), tehát 3 osztója a 9-nek (3 | 9).',
        breakdown: [
          { label: 'Osztó', value: '3 | 9 (3 osztója 9-nek)' },
          { label: 'Többszörös', value: '9 többszöröse a 3-nak' }
        ]
      },
      {
        id: 'q1-10',
        prompt: 'Mi a 20 legnagyobb osztója?',
        highlightValue: '20 legnagyobb osztója',
        questionTypeBadge: 'Legnagyobb osztó',
        options: ['20', '10', '1', '40'],
        correctAnswer: '20',
        explanation: 'Minden pozitív számnak a legnagyobb osztója önmaga: 20 : 20 = 1.',
        breakdown: [
          { label: 'Szabály', value: 'Legnagyobb osztó = önmaga (20)' }
        ]
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Közepes szint',
    subtitle: 'Nagyobb számok osztói, közös osztók és négyzetszámok',
    range: 'Osztók felírása 100-as számkörben, négyzetszámok és közös többszörösök',
    focus: 'Összes osztó felírása, páratlan osztószámú négyzetszámok, közös osztók',
    color: 'amber',
    badgeBg: 'bg-amber-50 dark:bg-amber-950/40',
    badgeBorder: 'border-amber-200 dark:border-amber-800',
    badgeText: 'text-amber-700 dark:text-amber-300',
    accentGradient: 'from-amber-500 to-orange-600',
    iconBg: 'bg-amber-600 text-white',
    questions: [
      {
        id: 'q2-1',
        prompt: 'Hány pozitív osztója van a 36-nak?',
        highlightValue: '36 osztói',
        questionTypeBadge: 'Összes osztó felírása',
        options: ['9', '8', '10', '6'],
        correctAnswer: '9',
        explanation: '36 osztói: 1, 2, 3, 4, 6, 9, 12, 18, 36. Mivel négyzetszám (6·6), pontosan 9 osztója van.',
        breakdown: [
          { label: 'Osztópárok', value: '1·36, 2·18, 3·12, 4·9, 6·6' },
          { label: 'Összesen', value: '9 darab osztó' }
        ]
      },
      {
        id: 'q2-2',
        prompt: 'Miért van a 25-nek páratlan számú (pontosan 3 db: 1, 5, 25) osztója?',
        highlightValue: '25 osztói (3 db)',
        questionTypeBadge: 'Négyzetszám tulajdonság',
        options: ['Mert négyzetszám (5 · 5 = 25)', 'Mert páratlan szám', 'Mert prímszám', 'Mert 5-re végződik'],
        correctAnswer: 'Mert négyzetszám (5 · 5 = 25)',
        explanation: 'A négyzetszámoknál az egyik szorzópár két azonos számból áll (5·5), így az csak 1 osztónak számít.',
        breakdown: [
          { label: 'Szorzópárok', value: '1·25 és 5·5' },
          { label: 'Osztók', value: '1, 5, 25 (3 db, páratlan)' }
        ]
      },
      {
        id: 'q2-3',
        prompt: 'Melyik szám NEM osztója a 60-nak?',
        highlightValue: '60 nem osztója',
        questionTypeBadge: 'Kizárásos osztás',
        options: ['8', '4', '5', '6'],
        correctAnswer: '8',
        explanation: '60 : 8 = 7,5 (maradék: 4), nem egész szám, így a 8 nem osztója a 60-nak.',
        breakdown: [
          { label: '60 : 8', value: '7, maradék 4 (nem osztó)' },
          { label: 'A többi', value: '60:4=15, 60:5=12, 60:6=10' }
        ]
      },
      {
        id: 'q2-4',
        prompt: 'Mely számok a 12 és a 18 KÖZÖS osztói?',
        highlightValue: '12 és 18 közös osztói',
        questionTypeBadge: 'Közös osztók',
        options: ['1, 2, 3, 6', '1, 2, 4, 6', '2, 3, 6, 9', '1, 6, 12'],
        correctAnswer: '1, 2, 3, 6',
        explanation: '12 osztói: 1, 2, 3, 4, 6, 12. 18 osztói: 1, 2, 3, 6, 9, 18. A közös elemek: 1, 2, 3, 6.',
        breakdown: [
          { label: '12 osztói', value: '1, 2, 3, 4, 6, 12' },
          { label: '18 osztói', value: '1, 2, 3, 6, 9, 18' },
          { label: 'Metszet', value: '1, 2, 3, 6' }
        ]
      },
      {
        id: 'q2-5',
        prompt: 'Mi a 6 és 8 legkisebb közös pozitív többszöröse?',
        highlightValue: '6 és 8 LKKT',
        questionTypeBadge: 'Közös többszörös',
        options: ['24', '48', '16', '12'],
        correctAnswer: '24',
        explanation: '6 többszörösei: 6, 12, 18, 24, 30... 8 többszörösei: 8, 16, 24, 32... A legkisebb közös a 24.',
        breakdown: [
          { label: '6 többszörösei', value: '6, 12, 18, 24, 30...' },
          { label: '8 többszörösei', value: '8, 16, 24, 32...' },
          { label: 'Legkisebb közös', value: '24' }
        ]
      },
      {
        id: 'q2-6',
        prompt: 'Melyik szám PRÍMSZÁM az alábbiak közül?',
        highlightValue: 'Prímszám keresése',
        questionTypeBadge: 'Prímszámok',
        options: ['29', '27', '25', '21'],
        correctAnswer: '29',
        explanation: 'A 29-nek pontosan 2 osztója van (1 és 29). 27 = 3·9, 25 = 5·5, 21 = 3·7.',
        breakdown: [
          { label: '29 osztói', value: '1 és 29 (prímszám)' },
          { label: 'A többi', value: 'Összetett számok' }
        ]
      },
      {
        id: 'q2-7',
        prompt: 'Hány darab KÉTJEGYŰ pozitív többszöröse van a 25-nek?',
        highlightValue: '25 kétjegyű többszörösei',
        questionTypeBadge: 'Többszörösök száma',
        options: ['3 db', '4 db', '2 db', '5 db'],
        correctAnswer: '3 db',
        explanation: 'A 25 kétjegyű többszörösei: 25, 50, 75 (a 100 már háromjegyű), tehát 3 darab van.',
        breakdown: [
          { label: 'Kétjegyűek', value: '25, 50, 75' },
          { label: 'Darabszám', value: '3 db' }
        ]
      },
      {
        id: 'q2-8',
        prompt: 'Ha a osztója b-nek és b osztója c-nek, akkor mi igaz a és c kapcsolatára?',
        highlightValue: 'a | b és b | c',
        questionTypeBadge: 'Oszthatósági tétel',
        options: ['a osztója c-nek (tranzitivitás)', 'c osztója a-nak', 'a többszöröse c-nek', 'Nincs összefüggés'],
        correctAnswer: 'a osztója c-nek (tranzitivitás)',
        explanation: 'Ez az oszthatóság tranzitív tulajdonsága: ha 2 | 6 és 6 | 24, akkor 2 | 24 is igaz.',
        breakdown: [
          { label: 'Példa', value: '2 | 6 és 6 | 24 $\to$ 2 | 24' },
          { label: 'Tulajdonság', value: 'Tranzitivitás' }
        ]
      },
      {
        id: 'q2-9',
        prompt: 'Mi a 40 legnagyobb valódi osztója (önmagánál kisebb legnagyobb osztója)?',
        highlightValue: '40 legnagyobb valódi osztója',
        questionTypeBadge: 'Valódi osztó',
        options: ['20', '10', '8', '4'],
        correctAnswer: '20',
        explanation: '40 : 2 = 20, így a 40 önmagánál kisebb legnagyobb osztója a 20.',
        breakdown: [
          { label: 'Osztópár', value: '2 · 20 = 40' },
          { label: 'Legnagyobb valódi', value: '20' }
        ]
      },
      {
        id: 'q2-10',
        prompt: 'Melyik szám többszöröse a 4-nek és a 6-nak is egyszerre?',
        highlightValue: '4 és 6 közös többszöröse',
        questionTypeBadge: 'Közös többszörös',
        options: ['36', '16', '18', '20'],
        correctAnswer: '36',
        explanation: '36 = 4 · 9 és 36 = 6 · 6, tehát mindkettőnek többszöröse (a 12 többszöröse).',
        breakdown: [
          { label: '36 : 4', value: '9' },
          { label: '36 : 6', value: '6' }
        ]
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Nehéz szint',
    subtitle: 'Nagy osztószámok, LNKO, LKKT és tökéletes számok',
    range: 'Összetett oszthatósági relációk és számelméleti feladványok',
    focus: 'LNKO és LKKT számítása, 100 osztói, prímhatványok osztói, tökéletes számok',
    color: 'purple',
    badgeBg: 'bg-purple-50 dark:bg-purple-950/40',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    badgeText: 'text-purple-700 dark:text-purple-300',
    accentGradient: 'from-purple-500 to-indigo-600',
    iconBg: 'bg-purple-600 text-white',
    questions: [
      {
        id: 'q3-1',
        prompt: 'Hány pozitív osztója van a 100-nak?',
        highlightValue: '100 osztói',
        questionTypeBadge: 'Nagy négyzetszám osztói',
        options: ['9', '8', '10', '12'],
        correctAnswer: '9',
        explanation: '100 osztói: 1, 2, 4, 5, 10, 20, 25, 50, 100 (összesen 9 db osztó).',
        breakdown: [
          { label: 'Osztópárok', value: '1·100, 2·50, 4·25, 5·20, 10·10' },
          { label: 'Összesen', value: '9 darab osztó' }
        ]
      },
      {
        id: 'q3-2',
        prompt: 'Egy kétjegyű számnak pontosan 3 osztója van. Melyik lehet ez a szám?',
        highlightValue: 'Pontosan 3 osztó',
        questionTypeBadge: 'Prímnégyzetek',
        options: ['49', '48', '51', '50'],
        correctAnswer: '49',
        explanation: 'Csak a prímszámok négyzeteinek van pontosan 3 osztója (1, p, p²). 49 = 7², osztói: 1, 7, 49.',
        breakdown: [
          { label: 'Tétel', value: 'Csak p² alakú számoknak van 3 osztója' },
          { label: '49 osztói', value: '1, 7, 49 (3 db)' }
        ]
      },
      {
        id: 'q3-3',
        prompt: 'Mi a 24 és 36 legnagyobb közös osztója (LNKO)?',
        highlightValue: 'LNKO(24, 36)',
        questionTypeBadge: 'Legnagyobb közös osztó',
        options: ['12', '6', '18', '24'],
        correctAnswer: '12',
        explanation: 'A 24 és 36 közös osztói: 1, 2, 3, 4, 6, 12. A legnagyobb ezek közül a 12.',
        breakdown: [
          { label: 'Közös osztók', value: '1, 2, 3, 4, 6, 12' },
          { label: 'LNKO', value: '12' }
        ]
      },
      {
        id: 'q3-4',
        prompt: 'Két szám szorzata 72, a legkisebb közös többszörösük 24. Mennyi a legnagyobb közös osztójuk? (a · b = LNKO · LKKT)',
        highlightValue: 'a · b = 72, LKKT = 24',
        questionTypeBadge: 'Számelméleti azonosság',
        options: ['3', '6', '2', '4'],
        correctAnswer: '3',
        explanation: 'Mivel a · b = LNKO · LKKT, így LNKO = (a · b) : LKKT = 72 : 24 = 3.',
        breakdown: [
          { label: 'Képlet', value: 'LNKO = (a · b) / LKKT' },
          { label: 'Számolás', value: '72 : 24 = 3' }
        ]
      },
      {
        id: 'q3-5',
        prompt: 'Hány olyan pozitív egész szám van 1 és 50 között, amelynek a 6 és a 8 is osztója?',
        highlightValue: '6 és 8 többszörösei 50-ig',
        questionTypeBadge: 'Közös többszörösök száma',
        options: ['2 db', '3 db', '4 db', '1 db'],
        correctAnswer: '2 db',
        explanation: 'A 6 és 8 legkisebb közös többszöröse 24. Az 50-nél kisebb többszörösei: 24 és 48 (2 db).',
        breakdown: [
          { label: 'LKKT(6, 8)', value: '24' },
          { label: 'Többszörösök ≤ 50', value: '24, 48 (2 db)' }
        ]
      },
      {
        id: 'q3-6',
        prompt: 'Ha egy természetes szám osztható 2-vel és 3-mal is, akkor biztosan osztható:',
        highlightValue: 'Osztható 2-vel és 3-mal',
        questionTypeBadge: 'Összetett oszthatóság',
        options: ['6-tal', '5-tel', '12-vel', '9-cel'],
        correctAnswer: '6-tal',
        explanation: 'Mivel a 2 és a 3 relatív prímek, ha egy szám mindkettővel osztható, akkor a szorzatukkal (6-tal) is osztható.',
        breakdown: [
          { label: 'Szorzat', value: '2 · 3 = 6' },
          { label: 'Következtetés', value: 'Biztosan osztható 6-tal' }
        ]
      },
      {
        id: 'q3-7',
        prompt: 'Hány darab pozitív osztója van a 60-nak?',
        highlightValue: '60 osztói',
        questionTypeBadge: 'Osztók száma',
        options: ['12', '10', '14', '16'],
        correctAnswer: '12',
        explanation: '60 osztói: 1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60 (összesen 12 darab osztó).',
        breakdown: [
          { label: 'Osztópárok', value: '1·60, 2·30, 3·20, 4·15, 5·12, 6·10' },
          { label: 'Összesen', value: '12 db osztó' }
        ]
      },
      {
        id: 'q3-8',
        prompt: 'A 28 önmagánál kisebb osztóinak összege: 1 + 2 + 4 + 7 + 14 = 28. Hogy hívják az ilyen számokat?',
        highlightValue: 'Valódi osztók összege = önmaga',
        questionTypeBadge: 'Tökéletes számok',
        options: ['Tökéletes szám', 'Prímszám', 'Négyzetszám', 'Ikerprím'],
        correctAnswer: 'Tökéletes szám',
        explanation: 'Azokat a számokat, amelyek megegyeznek a náluk kisebb osztóik összegével, tökéletes számoknak nevezzük (pl. 6, 28, 496).',
        breakdown: [
          { label: 'Példa', value: '6 = 1 + 2 + 3 és 28 = 1 + 2 + 4 + 7 + 14' },
          { label: 'Megnevezés', value: 'Tökéletes szám' }
        ]
      },
      {
        id: 'q3-9',
        prompt: 'Melyik szám a 18 és 24 legkisebb közös többszöröse (LKKT)?',
        highlightValue: 'LKKT(18, 24)',
        questionTypeBadge: 'Legkisebb közös többszörös',
        options: ['72', '48', '36', '144'],
        correctAnswer: '72',
        explanation: '18 = 2 · 3², 24 = 2³ · 3. LKKT = 2³ · 3² = 8 · 9 = 72.',
        breakdown: [
          { label: 'Prímtényezők', value: '18 = 2·3², 24 = 2³·3' },
          { label: 'LKKT', value: '2³ · 3² = 72' }
        ]
      },
      {
        id: 'q3-10',
        prompt: 'Ha p egy prímszám, hány pozitív osztója van a p³ hatványnak?',
        highlightValue: 'p³ osztói',
        questionTypeBadge: 'Prímhatvány osztói',
        options: ['4 db', '3 db', '2 db', '6 db'],
        correctAnswer: '4 db',
        explanation: 'A p³ osztói: 1, p, p², p³ -> pontosan 4 darab osztója van.',
        breakdown: [
          { label: 'Osztók listája', value: '1, p, p², p³' },
          { label: 'Darabszám', value: '4 db' }
        ]
      }
    ]
  }
};

const GAME_MODES: CustomGameMode[] = [
  {
    id: 'matcher',
    title: 'Kártyás Párosító',
    subtitle: '8 pár megkeresése',
    badgeText: '8 Pár',
    icon: <LayoutGrid className="w-3.5 h-3.5 text-emerald-500" />,
    render: ({ level, onNextLevel, onOpenRules }) => (
      <DivisorsMultiplesMatcher
        level={level}
        onNextLevel={onNextLevel}
        onOpenRules={onOpenRules}
      />
    )
  },
  {
    id: 'sorter',
    title: 'Csoportosító',
    subtitle: 'Húzd a helyére (3 csoport)',
    badgeText: '10 Elem (3 csoport)',
    icon: <ArrowRightLeft className="w-3.5 h-3.5 text-cyan-500" />,
    render: ({ level, onNextLevel, onOpenRules }) => (
      <DivisorsMultiplesSorter
        level={level}
        onNextLevel={onNextLevel}
        onOpenRules={onOpenRules}
      />
    )
  }
];

export function DivisorsMultiplesQuiz({ onBack }: DivisorsMultiplesQuizProps) {
  return (
    <QuizTemplate
      onBack={onBack}
      emoji="🔄"
      topicBadge="🔄 6. Osztály • I. Egész számok"
      title="Osztó, többszörös kvíz"
      subtitle="Teszteld a tudásod az osztópárokról, a többszörösökről, a négyzetszámokról és a prímekről 3 szinten!"
      cheatSheetTitle="Osztók és többszörösök szabályai"
      hintText="💡 Keresd az osztópárokat: a · b = N, a négyzetszámoknak páratlan sok osztójuk van!"
      levels={QUIZ_LEVELS}
      cheatSheet={CHEAT_SHEET}
      customGameModes={GAME_MODES}
      themeColor="emerald"
    />
  );
}

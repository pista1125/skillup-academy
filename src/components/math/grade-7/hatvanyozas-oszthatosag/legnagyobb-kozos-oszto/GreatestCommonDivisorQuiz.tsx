import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { GreatestCommonDivisorMatcher } from './GreatestCommonDivisorMatcher';
import { GreatestCommonDivisorSorter } from './GreatestCommonDivisorSorter';
import {
  Target,
  Calculator,
  Binary,
  Layers,
  Sparkles,
  HelpCircle,
  Hash,
  CheckCircle2,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';

interface GreatestCommonDivisorQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Az LNKO Fogalma és Keresése',
    icon: <Target className="w-4 h-4 text-violet-600" />,
    formula: 'LNKO(a, b) ≤ min(a, b) • Közös osztók közül a legnagyobb',
    note: 'Az 1 mindig közös osztó. Ha az egyik szám osztja a másikat (a | b), akkor LNKO(a, b) = a (a kisebbik szám).',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="5" y="8" width="70" height="34" rx="8" className="fill-violet-100 stroke-violet-300 dark:fill-violet-950/60 dark:stroke-violet-800" />
        <text x="12" y="29" className="text-[10px] font-mono font-bold fill-violet-900 dark:fill-violet-200">24 & 36</text>
        <rect x="85" y="8" width="70" height="34" rx="8" className="fill-purple-100 stroke-purple-300 dark:fill-purple-950/60 dark:stroke-purple-800" />
        <text x="92" y="29" className="text-[10px] font-mono font-bold fill-purple-900 dark:fill-purple-200">LNKO = 12</text>
      </svg>
    )
  },
  {
    id: 'c2',
    title: 'Prímfelbontás: Kisebb Kitevők Elve',
    icon: <Calculator className="w-4 h-4 text-indigo-600" />,
    formula: 'LNKO: Közös prímek szorzata a KISEBB kitevőn',
    note: 'Csak olyan prím kerülhet az LNKO-ba, amelyik mindegyik szám felbontásában szerepel! Kitevőjük a legkisebb előforduló hatvány.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="10" y="8" width="140" height="34" rx="8" className="fill-indigo-100 stroke-indigo-300 dark:fill-indigo-950/60 dark:stroke-indigo-800" />
        <text x="16" y="29" className="text-[10px] font-mono font-bold fill-indigo-900 dark:fill-indigo-200">2³·3² & 2²·3³ → 2²·3² = 36</text>
      </svg>
    )
  },
  {
    id: 'c3',
    title: 'Relatív Prímek: LNKO(a, b) = 1',
    icon: <Sparkles className="w-4 h-4 text-emerald-600" />,
    formula: 'LNKO(a, b) = 1 ⟺ relatív prímek',
    note: 'A relatív prímeknek nincs 1-nél nagyobb közös osztójuk. Nem feltétel, hogy a számok prímek legyenek (pl. 8 = 2³ és 9 = 3² relatív prímek!). Szomszédos számok mindig relatív prímek.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="10" y="8" width="65" height="34" rx="8" className="fill-emerald-100 stroke-emerald-300 dark:fill-emerald-950/60 dark:stroke-emerald-800" />
        <text x="18" y="29" className="text-[10px] font-mono font-bold fill-emerald-900 dark:fill-emerald-200">8 = 2³</text>
        <rect x="85" y="8" width="65" height="34" rx="8" className="fill-emerald-100 stroke-emerald-300 dark:fill-emerald-950/60 dark:stroke-emerald-800" />
        <text x="93" y="29" className="text-[10px] font-mono font-bold fill-emerald-900 dark:fill-emerald-200">9 = 3²</text>
      </svg>
    )
  },
  {
    id: 'c4',
    title: 'Törtek Egyszerűsítése az LNKO-val',
    icon: <Binary className="w-4 h-4 text-purple-600" />,
    formula: 'a / b = (a : LNKO) / (b : LNKO) (legegyszerűbb alak)',
    note: 'Ha a számlálót és a nevezőt elosztjuk az LNKO-jukkal, egyetlen lépésben megkapjuk a tovább már nem egyszerűsíthető alakot.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="10" y="8" width="140" height="34" rx="8" className="fill-purple-100 stroke-purple-300 dark:fill-purple-950/60 dark:stroke-purple-800" />
        <text x="24" y="29" className="text-[10px] font-mono font-bold fill-purple-900 dark:fill-purple-200">42/70 (:14) → 3/5 ✓</text>
      </svg>
    )
  }
];

const quizLevels: Record<1 | 2 | 3, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Közös Osztók és Egyszerű LNKO',
    subtitle: 'Közös osztók megkeresése osztóhalmazokból és alapvető LNKO számítások',
    range: '1 - 10. feladat',
    focus: 'Közvetlen felismerés, osztóhalmazok és az LNKO alapfogalma',
    questions: [
      {
        id: 'q1-1',
        prompt: 'Mennyi a 12 és 18 legnagyobb közös osztója?',
        options: ['6', '3', '4', '12'],
        correctAnswer: '6',
        explanation: '12 osztói: 1, 2, 3, 4, 6, 12. A 18 osztói: 1, 2, 3, 6, 9, 18. A közös osztók: 1, 2, 3, 6. Ezek közül a legnagyobb a 6.',
        breakdown: [
          { label: '12 osztói', value: '1, 2, 3, 4, 6, 12' },
          { label: '18 osztói', value: '1, 2, 3, 6, 9, 18' },
          { label: 'Közös osztók', value: '1, 2, 3, 6 ⟹ LNKO = 6' }
        ],
        hint: 'Melyik a legnagyobb szám, amellyel mind a 12, mind a 18 maradék nélkül osztható?'
      },
      {
        id: 'q1-2',
        prompt: 'Melyek a 16 és 24 KÖZÖS osztói növekvő sorrendben?',
        options: [
          '{1, 2, 4, 8}',
          '{1, 2, 4, 8, 16}',
          '{1, 2, 3, 4, 8}',
          '{2, 4, 8}'
        ],
        correctAnswer: '{1, 2, 4, 8}',
        explanation: '16 osztói: 1, 2, 4, 8, 16. A 24 osztói: 1, 2, 3, 4, 6, 8, 12, 24. A metszetük: 1, 2, 4, 8. A legnagyobb a 8.',
        breakdown: [
          { label: 'Közös elemek', value: '1, 2, 4, 8' },
          { label: 'Legnagyobb (LNKO)', value: '8' }
        ],
        hint: 'Keresd azokat az osztókat, amelyek mindkét szám osztói között szerepelnek (az 1 se maradjon ki)!'
      },
      {
        id: 'q1-3',
        prompt: 'Mennyi az LNKO(20, 30)?',
        options: ['10', '5', '2', '20'],
        correctAnswer: '10',
        explanation: '20 = 2 · 10 és 30 = 3 · 10. A közös osztók: 1, 2, 5, 10. A legnagyobb a 10.',
        breakdown: [
          { label: 'Közös osztók', value: '1, 2, 5, 10' },
          { label: 'LNKO', value: '10' }
        ],
        hint: 'Mindkét szám 0-ra végződik, így legalább 10-zel oszthatók.'
      },
      {
        id: 'q1-4',
        prompt: 'Mennyi az LNKO(14, 21)?',
        options: ['7', '1', '3', '14'],
        correctAnswer: '7',
        explanation: '14 = 2 · 7 és 21 = 3 · 7. A közös osztók: 1 és 7. LNKO(14, 21) = 7.',
        breakdown: [
          { label: '14 felbontása', value: '2 · 7' },
          { label: '21 felbontása', value: '3 · 7' },
          { label: 'Közös tényező', value: '7' }
        ],
        hint: 'Melyik szorzótáblában szerepel együtt a 14 és a 21?'
      },
      {
        id: 'q1-5',
        prompt: 'Ha a 15 osztója a 45-nek, mennyi az LNKO(15, 45)?',
        options: ['15', '45', '5', '3'],
        correctAnswer: '15',
        explanation: 'Ha két szám közül az egyik osztója a másiknak (a | b), akkor a legnagyobb közös osztójuk maga a kisebbik szám: LNKO(15, 45) = 15.',
        breakdown: [
          { label: 'Tétel', value: 'Ha a | b ⟹ LNKO(a, b) = a' },
          { label: 'Alkalmazás', value: '15 | 45 ⟹ LNKO(15, 45) = 15' }
        ],
        hint: 'Lehet-e a közös osztó nagyobb, mint maga a 15?'
      },
      {
        id: 'q1-6',
        prompt: 'Mennyi a 24 és 36 legnagyobb közös osztója?',
        options: ['12', '6', '8', '4'],
        correctAnswer: '12',
        explanation: '24 = 2 · 12 és 36 = 3 · 12. A közös osztók: 1, 2, 3, 4, 6, 12. A legnagyobb a 12.',
        breakdown: [
          { label: 'Közös osztók', value: '1, 2, 3, 4, 6, 12' },
          { label: 'LNKO', value: '12' }
        ],
        hint: 'Mindkét szám osztható 6-tal és 12-vel is. Melyik a nagyobb?'
      },
      {
        id: 'q1-7',
        prompt: 'Mennyi az LNKO(40, 60)?',
        options: ['20', '10', '5', '40'],
        correctAnswer: '20',
        explanation: '40 = 2 · 20 és 60 = 3 · 20. A legnagyobb közös osztó a 20.',
        breakdown: [
          { label: 'Szorzatalak', value: '40 = 2 · 20, 60 = 3 · 20' },
          { label: 'LNKO', value: '20' }
        ],
        hint: 'Gondolj a 20-as számra: osztja mindkettőt?'
      },
      {
        id: 'q1-8',
        prompt: 'Melyik szám NEM közös osztója a 18-nak és 24-nek?',
        options: ['4', '1', '2', '6'],
        correctAnswer: '4',
        explanation: 'A 24 osztható 4-gyel (24 : 4 = 6), de a 18 NEM osztható 4-gyel (18 : 4 = 4, maradék 2). Így a 4 nem közös osztó.',
        breakdown: [
          { label: '18 : 4', value: 'nem egész (maradék 2)' },
          { label: '24 : 4', value: '6' },
          { label: 'Közös osztók', value: '1, 2, 3, 6' }
        ],
        hint: 'Osztható-e a 18 4-gyel maradék nélkül?'
      },
      {
        id: 'q1-9',
        prompt: 'Mennyi a 25 és 35 legnagyobb közös osztója?',
        options: ['5', '1', '25', '7'],
        correctAnswer: '5',
        explanation: '25 = 5 · 5 és 35 = 5 · 7. Az egyetlen 1-nél nagyobb közös prímtényező az 5, így LNKO(25, 35) = 5.',
        breakdown: [
          { label: '25 osztói', value: '1, 5, 25' },
          { label: '35 osztói', value: '1, 5, 7, 35' },
          { label: 'LNKO', value: '5' }
        ],
        hint: 'Mindkét szám 5-re végződik.'
      },
      {
        id: 'q1-10',
        prompt: 'Lehet-e két pozitív egész szám legnagyobb közös osztója nagyobb, mint a kisebbik szám?',
        options: [
          'Nem, mert az osztó nem lehet nagyobb a számnál, amit oszt',
          'Igen, ha mindkét szám páros',
          'Igen, ha a számok négyzetszámok',
          'Csak akkor, ha az egyik szám prím'
        ],
        correctAnswer: 'Nem, mert az osztó nem lehet nagyobb a számnál, amit oszt',
        explanation: 'Mivel a közös osztónak az a-t és a b-t is osztania kell, legfeljebb a kisebbik számmal lehet egyenlő: LNKO(a, b) ≤ min(a, b).',
        breakdown: [
          { label: 'Szabály', value: 'd | a ⟹ d ≤ a' },
          { label: 'Következtetés', value: 'LNKO(a, b) ≤ min(a, b)' }
        ],
        hint: 'Lehet-e a 10-nek olyan osztója, ami nagyobb 10-nél?'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: LNKO Prímfelbontásból (Kisebb Kitevők Elve)',
    subtitle: 'Közös prímtényezők kiválasztása és a legkisebb hatványkitevők szorzatának képzése',
    range: '11 - 20. feladat',
    focus: 'A kanonikus alakokból való LNKO képzés algoritmusának alkalmazása',
    questions: [
      {
        id: 'q2-1',
        prompt: 'Ha a = 2³ · 3² (72) és b = 2² · 3³ (108), mi az LNKO(a, b) hatványalakja?',
        options: ['2² · 3²', '2³ · 3³', '2¹ · 3¹', '2² · 3³'],
        correctAnswer: '2² · 3²',
        explanation: 'A közös prímtényezők a 2 és a 3. A 2-es legkisebb kitevője min(3, 2) = 2. A 3-as legkisebb kitevője min(2, 3) = 2. Így az LNKO = 2² · 3² = 4 · 9 = 36.',
        breakdown: [
          { label: '2 alap', value: 'min(3, 2) = 2 ⟹ 2²' },
          { label: '3 alap', value: 'min(2, 3) = 2 ⟹ 3²' },
          { label: 'Szorzat', value: '2² · 3² = 36' }
        ],
        hint: 'Válaszd mindegyik közös prímhez a kisebbik kitevőt!'
      },
      {
        id: 'q2-2',
        prompt: 'Ha a = 2² · 5² (100) és b = 2³ · 5¹ (40), mennyi az LNKO-juk?',
        options: ['20', '10', '40', '50'],
        correctAnswer: '20',
        explanation: 'Közös prímek legkisebb kitevőn: 2^(min(2,3)) · 5^(min(2,1)) = 2² · 5¹ = 4 · 5 = 20.',
        breakdown: [
          { label: '2-es kitevője', value: 'min(2, 3) = 2 ⟹ 4' },
          { label: '5-ös kitevője', value: 'min(2, 1) = 1 ⟹ 5' },
          { label: 'Eredmény', value: '4 · 5 = 20' }
        ],
        hint: '2² · 5¹ = ?'
      },
      {
        id: 'q2-3',
        prompt: 'Adott: a = 2 · 3² · 7 és b = 2² · 3 · 5. Mennyi az LNKO(a, b)?',
        options: ['6', '18', '42', '30'],
        correctAnswer: '6',
        explanation: 'Csak a 2 és a 3 közös prímtényező (az 5 és 7 nem közös!). Kisebb kitevők: 2¹ · 3¹ = 6.',
        breakdown: [
          { label: 'Közös prímek', value: '2 és 3' },
          { label: 'Nem közös prímek', value: '5 és 7 kimaradnak!' },
          { label: 'LNKO', value: '2¹ · 3¹ = 6' }
        ],
        hint: 'Csak a mindkét számban szereplő prímeket szorozd össze a kisebb kitevőn!'
      },
      {
        id: 'q2-4',
        prompt: 'Miért NEM kerülhet a 7-es prímtényező a 360 és 840 LNKO-jába?',
        options: [
          'Mert a 7 nem prímtényezője a 360-nak, így nem közös osztó',
          'Mert a 7 túl nagy prím',
          'Mert a 7 páratlan szám',
          'Mert a 840-ben a kitevője 1'
        ],
        correctAnswer: 'Mert a 7 nem prímtényezője a 360-nak, így nem közös osztó',
        explanation: 'A közös osztónak mindkét számot osztania kell. Ha egy szorzat tartalmazná a 7-et, nem osztaná a 360-at, hiszen 360-ban nem szerepel a 7 prímtényezőként.',
        breakdown: [
          { label: '360 felbontása', value: '2³ · 3² · 5¹ (nincs benne 7)' },
          { label: '840 felbontása', value: '2³ · 3¹ · 5¹ · 7¹' },
          { label: 'Következtetés', value: '7 nem közös ⟹ kimarad az LNKO-ból' }
        ],
        hint: 'Lehet-e közös osztó olyan szorzat, ami nem osztja az egyik számot?'
      },
      {
        id: 'q2-5',
        prompt: 'A 90 = 2 · 3² · 5 és a 120 = 2³ · 3 · 5 felbontása alapján mennyi az LNKO-juk?',
        options: ['30', '15', '60', '10'],
        correctAnswer: '30',
        explanation: 'Közös prímek a kisebb kitevőkön: 2¹ · 3¹ · 5¹ = 2 · 3 · 5 = 30.',
        breakdown: [
          { label: '2-es hatvány', value: 'min(1, 3) = 1 ⟹ 2' },
          { label: '3-as hatvány', value: 'min(2, 1) = 1 ⟹ 3' },
          { label: '5-ös hatvány', value: 'min(1, 1) = 1 ⟹ 5' },
          { label: 'Szorzat', value: '2 · 3 · 5 = 30' }
        ],
        hint: '2¹ · 3¹ · 5¹ = ?'
      },
      {
        id: 'q2-6',
        prompt: 'Mennyi az LNKO(2⁴ · 3², 2³ · 3⁴)?',
        options: ['72', '144', '36', '24'],
        correctAnswer: '72',
        explanation: 'LNKO = 2^(min(4,3)) · 3^(min(2,4)) = 2³ · 3² = 8 · 9 = 72.',
        breakdown: [
          { label: 'Kisebb kitevők', value: '2³ és 3²' },
          { label: 'Kiszámítás', value: '8 · 9 = 72' }
        ],
        hint: '8 · 9 = ?'
      },
      {
        id: 'q2-7',
        prompt: 'Ha x = 3³ · 5² és y = 2² · 7, mennyi az LNKO(x, y)?',
        options: ['1', '0', '6', '35'],
        correctAnswer: '1',
        explanation: 'A két számnak egyetlen közös prímtényezője sincs! Ilyenkor a legnagyobb közös osztójuk az 1 (relatív prímek).',
        breakdown: [
          { label: 'x prímjei', value: '3, 5' },
          { label: 'y prímjei', value: '2, 7' },
          { label: 'Metszet', value: 'Nincs közös prím ⟹ LNKO = 1' }
        ],
        hint: 'Van-e közös prímtényező a két számban?'
      },
      {
        id: 'q2-8',
        prompt: 'Mennyi a 48 (2⁴ · 3) és 80 (2⁴ · 5) legnagyobb közös osztója?',
        options: ['16', '8', '24', '12'],
        correctAnswer: '16',
        explanation: 'A közös prímtényező csak a 2 (a 3 és az 5 nem közös). Kisebb kitevő: min(4, 4) = 4. LNKO = 2⁴ = 16.',
        breakdown: [
          { label: 'Közös prím', value: 'csak a 2' },
          { label: 'Hatvány', value: '2⁴ = 16' }
        ],
        hint: 'Mennyi 2 a negyedik hatványon?'
      },
      {
        id: 'q2-9',
        prompt: 'Melyik a helyes szabály az LNKO kanonikus alakból történő meghatározására?',
        options: [
          'A közös prímtényezők szorzata a legkisebb előforduló hatványkitevőn',
          'Az összes előforduló prímtényező szorzata a legnagyobb kitevőn',
          'A prímtényezők összegének a négyzete',
          'Csak a páros prímtényezők szorzata'
        ],
        correctAnswer: 'A közös prímtényezők szorzata a legkisebb előforduló hatványkitevőn',
        explanation: 'Az LNKO képzéséhez csak a közös prímtényezőket vesszük, és mindegyiket a legkisebb kitevőre emeljük.',
        breakdown: [
          { label: 'Kritérium 1', value: 'Csak KÖZÖS prímek' },
          { label: 'Kritérium 2', value: 'LEGKISEBB kitevő (min)' }
        ],
        hint: 'Gondolj a "legkisebb kitevő szabályára"!'
      },
      {
        id: 'q2-10',
        prompt: 'Mennyi az LNKO(180, 270), ha 180 = 2² · 3² · 5 és 270 = 2 · 3³ · 5?',
        options: ['90', '45', '30', '18'],
        correctAnswer: '90',
        explanation: 'LNKO = 2¹ · 3² · 5¹ = 2 · 9 · 5 = 90.',
        breakdown: [
          { label: 'Kisebb kitevők', value: '2¹ · 3² · 5¹' },
          { label: 'Szorzat', value: '2 · 9 · 5 = 90' }
        ],
        hint: '2 · 9 · 5 = ?'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Relatív Prímek, Szöveges Feladatok és Törtek',
    subtitle: 'Relatív prím tulajdonságok, gyakorlati szöveges feladványok és tört-egyszerűsítés',
    range: '21 - 30. feladat',
    focus: 'Összetett számelméleti összefüggések, algebrai indoklások és életszerű alkalmazások',
    questions: [
      {
        id: 'q3-1',
        prompt: 'Igaz-e, hogy ha két szám relatív prím, akkor mindkét számnak prímszámnak kell lennie?',
        options: [
          'Nem igaz, például a 8 és 9 mindketten összetett számok, de relatív prímek',
          'Igen, csak prímszámok lehetnek relatív prímek',
          'Csak akkor igaz, ha legalább az egyik páros',
          'Csak háromjegyű számokra igaz'
        ],
        correctAnswer: 'Nem igaz, például a 8 és 9 mindketten összetett számok, de relatív prímek',
        explanation: 'A relatív prím fogalom a számok KAPCSOLATÁRÓL szól (nincs közös osztójuk 1-en kívül), nem arról, hogy önmagukban prímek-e. 8 = 2³ és 9 = 3² összetett számok, mégis LNKO(8, 9) = 1.',
        breakdown: [
          { label: '8 prímjei', value: 'csak 2' },
          { label: '9 prímjei', value: 'csak 3' },
          { label: 'LNKO', value: '1 ⟹ relatív prímek!' }
        ],
        hint: 'Gondolj a 8-ra és a 9-re: van közös osztójuk az 1-en kívül?'
      },
      {
        id: 'q3-2',
        prompt: 'Mennyi bármely n pozitív egész szám esetén az LNKO(n, n + 1)?',
        options: [
          'Mindig 1, mert két szomszédos szám mindig relatív prím',
          'Mindig n',
          'Mindig 2',
          'Attól függ, hogy n páros-e'
        ],
        correctAnswer: 'Mindig 1, mert két szomszédos szám mindig relatív prím',
        explanation: 'Ha d osztója n-nek és n + 1-nek is, akkor osztania kell a különbségüket is: (n + 1) - n = 1. Mivel csak az 1 osztója az 1-nek, d = 1. Két egymást követő egész szám mindig relatív prím!',
        breakdown: [
          { label: 'Különbség elv', value: 'd | a & d | b ⟹ d | (b - a)' },
          { label: 'Különbség', value: '(n + 1) - n = 1' },
          { label: 'Következtetés', value: 'd | 1 ⟹ d = 1' }
        ],
        hint: 'Ha egy szám osztja n-et és n+1-et is, osztania kell a különbségüket (1-et) is!'
      },
      {
        id: 'q3-3',
        prompt: 'Milyen számmal kell egyszerűsíteni a 42 / 70 törtet, hogy egyetlen lépésben a tovább nem egyszerűsíthető alakot kapjuk?',
        options: ['14-gyel (az LNKO-val)', '7-tel', '2-vel', '6-tal'],
        correctAnswer: '14-gyel (az LNKO-val)',
        explanation: '42 = 2 · 3 · 7 és 70 = 2 · 5 · 7. LNKO(42, 70) = 2 · 7 = 14. Mindkét tagot 14-gyel osztva: (42:14)/(70:14) = 3/5, ami tovább már nem egyszerűsíthető.',
        breakdown: [
          { label: 'LNKO(42, 70)', value: '14' },
          { label: 'Egyszerűsítés', value: '42 : 14 = 3, 70 : 14 = 5' },
          { label: 'Eredmény', value: '3 / 5' }
        ],
        hint: 'Melyik a 42 és 70 legnagyobb közös osztója?'
      },
      {
        id: 'q3-4',
        prompt: 'Egy virágkötőnek 48 vörös és 72 fehér rózsája van. Legfeljebb hány egyforma csokrot készíthet úgy, hogy minden rózsát felhasznál?',
        options: ['24', '12', '16', '48'],
        correctAnswer: '24',
        explanation: 'A csokrok számának osztania kell a 48-at és a 72-t is. A maximális csokorszám az LNKO(48, 72) = 24. (Minden csokorba 2 vörös és 3 fehér rózsa kerül).',
        breakdown: [
          { label: 'LNKO(48, 72)', value: '24 csokor' },
          { label: 'Egy csokorban', value: '48 : 24 = 2 vörös, 72 : 24 = 3 fehér' }
        ],
        hint: 'Keresd a 48 és 72 legnagyobb közös osztóját!'
      },
      {
        id: 'q3-5',
        prompt: 'Két léc hossza 150 cm és 225 cm. Mekkora a leghosszabb egyenlő darab, amire mindkettőt felvághatjuk hulladék nélkül?',
        options: ['75 cm', '25 cm', '50 cm', '15 cm'],
        correctAnswer: '75 cm',
        explanation: 'A darabok hosszának mindkét léc hosszát osztania kell. LNKO(150, 225): 150 = 2 · 3 · 5², 225 = 3² · 5². LNKO = 3 · 5² = 75 cm.',
        breakdown: [
          { label: '150 felbontása', value: '2 · 3 · 5²' },
          { label: '225 felbontása', value: '3² · 5²' },
          { label: 'LNKO', value: '3 · 25 = 75 cm' }
        ],
        hint: 'Mennyi az LNKO(150, 225)?'
      },
      {
        id: 'q3-6',
        prompt: 'Melyik számpár relatív prím az alábbiak közül?',
        options: ['(15; 28)', '(14; 21)', '(20; 25)', '(18; 27)'],
        correctAnswer: '(15; 28)',
        explanation: '15 = 3 · 5, 28 = 2² · 7. Nincs közös prímtényezőjük, így LNKO(15, 28) = 1. A többinél: (14,21)-nél 7, (20,25)-nél 5, (18,27)-nél 9 a közös osztó.',
        breakdown: [
          { label: '15 prímjei', value: '3, 5' },
          { label: '28 prímjei', value: '2, 7' },
          { label: 'LNKO', value: '1 ⟹ relatív prímek' }
        ],
        hint: 'Bontsd fel prímekre a párok tagjait: melyiknél nincs közös prím?'
      },
      {
        id: 'q3-7',
        prompt: 'Lehet-e két páros szám relatív prím egymással?',
        options: [
          'Soha, mert mindkét szám osztható 2-vel, így a közös osztójuk legalább 2',
          'Igen, ha mindkettő négyzetszám',
          'Igen, ha a különbségük 4',
          'Csak 100 feletti számok esetén'
        ],
        correctAnswer: 'Soha, mert mindkét szám osztható 2-vel, így a közös osztójuk legalább 2',
        explanation: 'Minden páros szám osztható 2-vel. Ha mindkét szám páros, akkor a 2 közös osztójuk, tehát az LNKO legalább 2, nem lehet 1.',
        breakdown: [
          { label: 'Páros szám definíciója', value: 'osztható 2-vel' },
          { label: 'Közös osztó', value: '2 biztosan közös osztó' },
          { label: 'Következtetés', value: 'LNKO ≥ 2 ⟹ sosem relatív prímek' }
        ],
        hint: 'Mivel osztható minden páros szám?'
      },
      {
        id: 'q3-8',
        prompt: 'Ha LNKO(a, b) = 12, melyik szám NEM lehet semmiképpen az a és b közös osztója?',
        options: ['8', '2', '3', '6'],
        correctAnswer: '8',
        explanation: 'Bármely közös osztónak osztania kell a legnagyobb közös osztót (12-t) is! Mivel a 8 NEM osztója a 12-nek (12 : 8 nem egész), a 8 nem lehet közös osztó. A 2, 3, 6 mind osztói a 12-nek.',
        breakdown: [
          { label: 'Tétel', value: 'd közös osztó ⟹ d | LNKO(a, b)' },
          { label: '12 osztói', value: '1, 2, 3, 4, 6, 12' },
          { label: 'Vizsgálat', value: '8 nem osztója 12-nek ⟹ nem lehet közös osztó' }
        ],
        hint: 'A közös osztóknak osztaniuk kell magát az LNKO-t (12-t) is!'
      },
      {
        id: 'q3-9',
        prompt: 'Egy 84 m hosszú és 60 m széles udvart a lehető legnagyobb egyforma négyzet alakú kőlapokkal burkolnak. Mekkora egy lap oldala?',
        options: ['12 m', '6 m', '10 m', '4 m'],
        correctAnswer: '12 m',
        explanation: 'A négyzet oldalának maradék nélkül osztania kell a 84-et és a 60-at is. A legnagyobb ilyen méret: LNKO(84, 60) = 12 m.',
        breakdown: [
          { label: '84 felbontása', value: '2² · 3 · 7' },
          { label: '60 felbontása', value: '2² · 3 · 5' },
          { label: 'LNKO', value: '2² · 3 = 12 m' }
        ],
        hint: 'Keresd a 84 és a 60 legnagyobb közös osztóját!'
      },
      {
        id: 'q3-10',
        prompt: 'Mennyi a három szám: 24, 36 és 60 legnagyobb közös osztója: LNKO(24, 36, 60)?',
        options: ['12', '6', '4', '24'],
        correctAnswer: '12',
        explanation: '24 = 2³ · 3, 36 = 2² · 3², 60 = 2² · 3 · 5. Mindhárom számban közös prímek a 2 és a 3. Legkisebb kitevők: 2² · 3¹ = 4 · 3 = 12.',
        breakdown: [
          { label: '2-es kitevői', value: '3, 2, 2 ⟹ min = 2 (2²)' },
          { label: '3-as kitevői', value: '1, 2, 1 ⟹ min = 1 (3¹)' },
          { label: 'LNKO', value: '4 · 3 = 12' }
        ],
        hint: 'Melyik a legnagyobb szám, amivel mind a 24, mind a 36, mind a 60 osztható?'
      }
    ]
  }
};

export const GreatestCommonDivisorQuiz: React.FC<GreatestCommonDivisorQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      grade={7}
      chapterId="g7-powers-divisibility"
      topicId="g7-powers-gcd"
      topicTitle="8. Legnagyobb közös osztó"
      subtopicId="legnagyobb-kozos-oszto"
      documentId="grade-7-legnagyobb-kozos-oszto-quiz"
      emoji="🎯"
      topicBadge="7. Osztály • Matematika IV. Témakör"
      badgeText="7. Osztály • Matematika IV. Témakör"
      category="Oszthatóság és Számelmélet"
      title="Legnagyobb közös osztó (LNKO) – Kvíz"
      subtitle="Mesterfokú felkészülés: közös osztók, az LNKO prímfelbontásból (kisebb kitevők elve), relatív prímek és törtek egyszerűsítése 30 interaktív feladaton!"
      cheatSheetTitle="LNKO és Relatív Prímek Kisokos"
      cheatSheetCards={cheatSheetCards}
      levels={quizLevels}
      matcherComponent={<GreatestCommonDivisorMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<GreatestCommonDivisorSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      themeColor="violet"
      hintText="💡 Használd a felül megnyitható szabálytárat a legkisebb kitevők elvéhez és a relatív prímek tulajdonságaihoz!"
    />
  );
};

export default GreatestCommonDivisorQuiz;

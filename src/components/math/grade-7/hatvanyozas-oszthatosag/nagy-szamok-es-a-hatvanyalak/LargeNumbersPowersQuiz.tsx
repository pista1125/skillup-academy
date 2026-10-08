import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { LargeNumbersPowersMatcher } from './LargeNumbersPowersMatcher';
import { LargeNumbersPowersSorter } from './LargeNumbersPowersSorter';
import {
  Binary,
  Zap,
  Calculator,
  Scale,
  Globe,
  Gauge,
  Hash,
  Sparkles,
  Layers,
  HelpCircle,
  CheckCircle2
} from 'lucide-react';

interface LargeNumbersPowersQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'A Hatványozás Alapjai',
    icon: <Binary className="w-4 h-4 text-amber-600" />,
    formula: 'aⁿ = a · a · ... · a (n tényező)',
    note: 'a = hatványalap (amit szorzunk), n = kitevő (ahány tényező). Speciális esetek: a¹ = a, a⁰ = 1 (ha a ≠ 0). 0⁰ nincs értelmezve.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <text x="35" y="38" className="text-[28px] font-mono font-black fill-amber-700">a</text>
        <text x="55" y="20" className="text-[16px] font-mono font-black fill-orange-600">n</text>
        <text x="75" y="32" className="text-[14px] font-mono fill-slate-400">=</text>
        <text x="92" y="32" className="text-[12px] font-mono fill-slate-700">a · a · ... · a</text>
      </svg>
    )
  },
  {
    id: 'c2',
    title: 'Előjeles Hatványok Szabályai',
    icon: <Scale className="w-4 h-4 text-orange-600" />,
    formula: '(-a)páros = +,  (-a)páratlan = -,  -aⁿ = -(aⁿ)',
    note: 'Páros kitevő esetén a negatív alapú hatvány pozitív: (-2)⁴ = +16. Páratlan kitevőnél negatív: (-2)³ = -8. Zárójel nélkül: -2⁴ = -16!',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="15" y="10" width="60" height="30" rx="8" className="fill-emerald-100 stroke-emerald-300" />
        <text x="22" y="30" className="text-[11px] font-mono font-bold fill-emerald-800">(-3)² = +9</text>
        <rect x="85" y="10" width="60" height="30" rx="8" className="fill-rose-100 stroke-rose-300" />
        <text x="92" y="30" className="text-[11px] font-mono font-bold fill-rose-800">-3² = -9</text>
      </svg>
    )
  },
  {
    id: 'c3',
    title: 'A 10 Hatványai & Nullák',
    icon: <Calculator className="w-4 h-4 text-amber-600" />,
    formula: '10ⁿ = 1 utána n darab nulla',
    note: '10³ = 1 000 (ezer), 10⁶ = 1 000 000 (millió), 10⁹ = 1 000 000 000 (milliárd), 10¹² = 1 000 000 000 000 (billió).',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <text x="25" y="22" className="text-[12px] font-mono font-bold fill-amber-700">10³ = 1 000 (3 db 0)</text>
        <text x="25" y="40" className="text-[12px] font-mono font-bold fill-amber-700">10⁶ = 1 000 000 (6 db 0)</text>
      </svg>
    )
  },
  {
    id: 'c4',
    title: 'A Számok Normálalakja',
    icon: <Globe className="w-4 h-4 text-blue-600" />,
    formula: 'a · 10ᵏ,  ahol 1 ≤ a < 10,  k ∈ ℤ',
    note: 'A mantisszának (a) legalább 1-nek és szigorúan 10-nél kisebbnek kell lennie. Pl. 3,5 · 10⁵ helyes, de 35 · 10⁴ vagy 0,35 · 10⁶ NEM normálalak!',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <text x="15" y="32" className="text-[13px] font-mono font-black fill-blue-700">300 000 = 3 · 10⁵</text>
      </svg>
    )
  },
  {
    id: 'c5',
    title: 'Törtek és Tizedes Törtek',
    icon: <Hash className="w-4 h-4 text-purple-600" />,
    formula: '(a/b)ⁿ = aⁿ / bⁿ,  0,1² = 0,01',
    note: 'Törteknél számláló és nevező is hatványozódik: (2/3)³ = 8/27. Tizedes törteknél a tizedesjegyek száma szorzódik a kitevővel: 0,2³ = 0,008 (3 jegy).',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <text x="30" y="24" className="text-[12px] font-mono font-bold fill-purple-700">(2/5)² = 4/25</text>
        <text x="30" y="42" className="text-[12px] font-mono font-bold fill-purple-700">0,3² = 0,09</text>
      </svg>
    )
  }
];

const quizLevels: Record<1 | 2 | 3, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: A Hatványozás Alapjai',
    subtitle: 'Hatványalap, kitevő, hatványérték, 0-s és 1-es kitevő, előjeles számok hatványai',
    range: '1 - 10. feladat',
    focus: 'Alapfogalmak és egyszerű hatványértékek',
    questions: [
      {
        id: 'q1-1',
        level: 1,
        title: 'Hatványozás fogalmai',
        prompt: 'Mi a hatványalap és a hatványkitevő az $5^3$ kifejezésben?',
        options: [
          'Alap: 5, kitevő: 3',
          'Alap: 3, kitevő: 5',
          'Alap: 15, kitevő: 3',
          'Alap: 5, kitevő: 15'
        ],
        correctAnswer: 'Alap: 5, kitevő: 3',
        explanation: 'Az $a^n$ hatványalakban a nagyobb méretű szám az alap ($a = 5$), a jobb felső indexbe írt szám pedig a kitevő ($n = 3$).',
        breakdown: [
          { label: 'Alap (a)', value: '5 (ezt szorozzuk önmagával)' },
          { label: 'Kitevő (n)', value: '3 (3 tényező szerepel a szorzatban)' },
          { label: 'Szorzat', value: '5 · 5 · 5 = 125' }
        ],
        hint: 'Az alap áll a földön, a kitevő pedig felül repül!'
      },
      {
        id: 'q1-2',
        level: 1,
        title: 'Hatványérték kiszámítása',
        prompt: 'Mennyi a $2^4$ hatvány pontos értéke?',
        options: [
          '16',
          '8',
          '12',
          '24'
        ],
        correctAnswer: '16',
        explanation: 'A $2^4$ azt jelenti, hogy a 2-t négyszer szorozzuk meg önmagával: $2 \\cdot 2 \\cdot 2 \\cdot 2 = 4 \\cdot 4 = 16$.',
        breakdown: [
          { label: 'Szorzatalak', value: '2 · 2 · 2 · 2' },
          { label: 'Részeredmények', value: '2 · 2 = 4; 4 · 2 = 8; 8 · 2 = 16' },
          { label: 'Gyakori hiba', value: '2 · 4 = 8 (nem szorzás a kitevővel!)' }
        ],
        hint: 'A hatványozás nem szorzás a kitevővel! 2-t szorozd meg 2-vel, aztán még 2-vel, majd még 2-vel.'
      },
      {
        id: 'q1-3',
        level: 1,
        title: 'Hatványérték kiszámítása',
        prompt: 'Mennyi a $3^3$ kifejezés értéke?',
        options: [
          '27',
          '9',
          '18',
          '81'
        ],
        correctAnswer: '27',
        explanation: '$3^3 = 3 \\cdot 3 \\cdot 3 = 9 \\cdot 3 = 27$.',
        breakdown: [
          { label: 'Szorzatalak', value: '3 · 3 · 3' },
          { label: 'Számítás', value: '3 · 3 = 9, majd 9 · 3 = 27' }
        ],
        hint: 'Háromszor három az kilenc, és ezt szorozd meg még egyszer hárommal!'
      },
      {
        id: 'q1-4',
        level: 1,
        title: 'Első hatvány szabálya',
        prompt: 'Mennyi a $17^1$ hatvány értéke?',
        options: [
          '17',
          '1',
          '0',
          '34'
        ],
        correctAnswer: '17',
        explanation: 'Bármely valós szám első hatványa önmaga: $a^1 = a$, ezért $17^1 = 17$.',
        breakdown: [
          { label: 'Szabály', value: 'a¹ = a minden valós számra' },
          { label: 'Eredmény', value: '17¹ = 17' }
        ],
        hint: 'Ha az alap egyszer szerepel szorzótényezőként, mennyi az értéke?'
      },
      {
        id: 'q1-5',
        level: 1,
        title: 'Nulladik hatvány szabálya',
        prompt: 'Mennyi a $9^0$ hatvány értéke?',
        options: [
          '1',
          '0',
          '9',
          'Nincs értelmezve'
        ],
        correctAnswer: '1',
        explanation: 'Bármely 0-tól különböző szám 0-dik hatványa definíció szerint 1 ($a^0 = 1$, ha $a \\neq 0$). Ezért $9^0 = 1$.',
        breakdown: [
          { label: 'Szabály', value: 'a⁰ = 1 (ha a ≠ 0)' },
          { label: 'Eredmény', value: '9⁰ = 1' }
        ],
        hint: 'Gondolj a szabályra: bármely nemnulla szám nulladik hatványa mindig 1!'
      },
      {
        id: 'q1-6',
        level: 1,
        title: 'Negatív alap, páros kitevő',
        prompt: 'Mennyi a $(-3)^2$ hatvány értéke?',
        options: [
          '+9',
          '-9',
          '-6',
          '+6'
        ],
        correctAnswer: '+9',
        explanation: 'Negatív számot önmagával szorozva: $(-3) \\cdot (-3) = +9$. Páros kitevőnél az eredmény mindig pozitív.',
        breakdown: [
          { label: 'Szorzatalak', value: '(-3) · (-3)' },
          { label: 'Előjelszabály', value: 'Negatív · negatív = pozitív (+)' },
          { label: 'Érték', value: '+9' }
        ],
        hint: 'Mínusz szorozva mínusszal mi lesz?'
      },
      {
        id: 'q1-7',
        level: 1,
        title: 'Negatív alap, páratlan kitevő',
        prompt: 'Mennyi a $(-2)^3$ hatvány értéke?',
        options: [
          '-8',
          '+8',
          '-6',
          '+6'
        ],
        correctAnswer: '-8',
        explanation: '$(-2)^3 = (-2) \\cdot (-2) \\cdot (-2) = (+4) \\cdot (-2) = -8$. Páratlan számú negatív tényező szorzata negatív.',
        breakdown: [
          { label: 'Szorzatalak', value: '(-2) · (-2) · (-2)' },
          { label: 'Első lépés', value: '(-2) · (-2) = +4' },
          { label: 'Második lépés', value: '(+4) · (-2) = -8' }
        ],
        hint: 'A páratlan kitevő megtartja a negatív előjelet!'
      },
      {
        id: 'q1-8',
        level: 1,
        title: 'Csapda: Zárójel nélküli előjel',
        prompt: 'Mennyi a $-5^2$ kifejezés pontos értéke?',
        options: [
          '-25',
          '+25',
          '-10',
          '+10'
        ],
        correctAnswer: '-25',
        explanation: 'Mivel nincs zárójel az alap körül, a hatványozás megelőzi az előjeladást: $-5^2 = -(5^2) = -(25) = -25$. Csak a $(-5)^2$ lenne $+25$!',
        breakdown: [
          { label: 'Kifejezés', value: '-5²' },
          { label: 'Műveleti sorrend', value: '-(5 · 5) = -(25)' },
          { label: 'Különbség', value: '(-5)² = +25, de -5² = -25' }
        ],
        hint: 'Nincs zárójel a negatív előjel körül! A kitevő csak a számra vonatkozik.'
      },
      {
        id: 'q1-9',
        level: 1,
        title: 'A 10 hatványa',
        prompt: 'Hány nullából áll a $10^5$ hatvány kiírt értéke?',
        options: [
          '5 darab (értéke: 100 000)',
          '4 darab (értéke: 10 000)',
          '6 darab (értéke: 1 000 000)',
          '50 darab'
        ],
        correctAnswer: '5 darab (értéke: 100 000)',
        explanation: 'A $10^n$ értékében mindig egy 1-es után pontosan $n$ darab nulla áll. $10^5 = 100\\ 000$, azaz 5 darab nulla követi az egyest.',
        breakdown: [
          { label: 'Kitevő', value: '5' },
          { label: 'Nullák száma', value: '5 db nulla' },
          { label: 'Érték', value: '100 000 (százezer)' }
        ],
        hint: 'A 10 hatványának kitevője pontosan megegyezik a nullák számával!'
      },
      {
        id: 'q1-10',
        level: 1,
        title: 'Nulla hatványai',
        prompt: 'Mennyi a $0^6$ hatvány értéke?',
        options: [
          '0',
          '1',
          '6',
          'Nincs értelmezve'
        ],
        correctAnswer: '0',
        explanation: '$0^6 = 0 \\cdot 0 \\cdot 0 \\cdot 0 \\cdot 0 \\cdot 0 = 0$. Ha a kitevő pozitív egész szám, a 0 bármely hatványa 0.',
        breakdown: [
          { label: 'Szorzatalak', value: '0 · 0 · 0 · 0 · 0 · 0' },
          { label: 'Érték', value: '0' }
        ],
        hint: 'Nullaszor nulla az mindig nulla.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Helyiértékek és Normálalak',
    subtitle: 'Helyiértékes összeg 10-hatványokkal, normálalak felismerése, átváltása és törtek hatványai',
    range: '11 - 20. feladat',
    focus: 'Helyiértékek és a normálalak szabályai',
    questions: [
      {
        id: 'q2-1',
        level: 2,
        title: 'Helyiértékes összeg felírása',
        prompt: 'Hogyan írható fel a $4\\ 520$ szám 10 hatványainak összegeként?',
        options: [
          '4 · 10³ + 5 · 10² + 2 · 10¹',
          '4 · 10⁴ + 5 · 10³ + 2 · 10²',
          '4 · 10³ + 5 · 10¹ + 2 · 10⁰',
          '4 · 10² + 5 · 10¹ + 2 · 10⁰'
        ],
        correctAnswer: '4 · 10³ + 5 · 10² + 2 · 10¹',
        explanation: 'A 4 az ezres helyiértéken áll ($4 \\cdot 10^3$), az 5 a százas helyiértéken ($5 \\cdot 10^2$), a 2 a tízes helyiértéken ($2 \\cdot 10^1$). Az egyes helyiértéken 0 áll.',
        breakdown: [
          { label: '4 000', value: '4 · 10³' },
          { label: '500', value: '5 · 10²' },
          { label: '20', value: '2 · 10¹' },
          { label: 'Összeg', value: '4 · 10³ + 5 · 10² + 2 · 10¹' }
        ],
        hint: 'Az ezres a 10³, a százas a 10², a tízes a 10¹.'
      },
      {
        id: 'q2-2',
        level: 2,
        title: 'Szám meghatározása összegből',
        prompt: 'Melyik számnak felel meg a következő összeg: $7 \\cdot 10^4 + 3 \\cdot 10^2 + 5 \\cdot 10^0$?',
        options: [
          '70 305',
          '73 005',
          '735',
          '700 305'
        ],
        correctAnswer: '70 305',
        explanation: '$7 \\cdot 10^4 = 70\\ 000$; $3 \\cdot 10^2 = 300$; $5 \\cdot 10^0 = 5 \\cdot 1 = 5$. Összeadva: $70\\ 000 + 300 + 5 = 70\\ 305$. Az ezres és tízes helyiértéken 0 áll.',
        breakdown: [
          { label: '7 · 10⁴', value: '70 000 (tízezres)' },
          { label: '0 · 10³', value: '0 (ezres hiányzik)' },
          { label: '3 · 10²', value: '300 (százas)' },
          { label: '0 · 10¹', value: '0 (tízes hiányzik)' },
          { label: '5 · 10⁰', value: '5 (egyes)' },
          { label: 'Összesen', value: '70 305' }
        ],
        hint: 'Figyeld meg, melyik hatványok hiányoznak! Ott nulla (0) szerepel a helyiértéken.'
      },
      {
        id: 'q2-3',
        level: 2,
        title: 'Normálalak felismerése',
        prompt: 'Az alábbiak közül melyik szám van szabályos NORMÁLALAKBAN?',
        options: [
          '6,4 · 10⁵',
          '64 · 10⁴',
          '0,64 · 10⁶',
          '6,4 · 5⁵'
        ],
        correctAnswer: '6,4 · 10⁵',
        explanation: 'A normálalak feltétele: $a \\cdot 10^k$, ahol $1 \\le a < 10$. A $6{,}4$ megfelel ennek ($1 \\le 6{,}4 < 10$). A 64 túl nagy ($64 \\ge 10$), a $0{,}64$ túl kicsi ($0{,}64 < 1$), az utolsónál pedig nem 10 az alap.',
        breakdown: [
          { label: 'Feltétel 1', value: '1 ≤ a < 10 (csak 6,4 teljesíti)' },
          { label: 'Feltétel 2', value: '10 hatványa szerepeljen' },
          { label: 'Helyes alak', value: '6,4 · 10⁵' }
        ],
        hint: 'Az első számnak pontosan egy nemnulla jegyűnek kell lennie a tizedesvessző előtt!'
      },
      {
        id: 'q2-4',
        level: 2,
        title: 'Miért nem normálalak?',
        prompt: 'Miért NEM tekinthető normálalaknak a $48 \\cdot 10^5$ kifejezés?',
        options: [
          'Mert a 48 nem esik az 1 és 10 közötti intervallumba (48 ≥ 10)',
          'Mert a kitevő (5) páratlan',
          'Mert hiányzik a tizedesvessző',
          'Mert a 10 hatványa negatív kellene legyen'
        ],
        correctAnswer: 'Mert a 48 nem esik az 1 és 10 közötti intervallumba (48 ≥ 10)',
        explanation: 'A normálalak definíciója szerint az első tényezőnek $1 \\le a < 10$ közé kell esnie. A 48 nagyobb mint 10. Helyesen: $4{,}8 \\cdot 10^6$.',
        breakdown: [
          { label: 'Hibás tényező', value: '48 (nem kisebb 10-nél)' },
          { label: 'Helyes alak', value: '4,8 · 10⁶' }
        ],
        hint: 'A normálalak mantisszájának szigorúan 1 és 10 közé kell esnie ($1 \\le a < 10$).'
      },
      {
        id: 'q2-5',
        level: 2,
        title: 'Szám átírása normálalakra',
        prompt: 'Hogyan írható fel a $820\\ 000$ szám normálalakban?',
        options: [
          '8,2 · 10⁵',
          '82 · 10⁴',
          '8,2 · 10⁶',
          '0,82 · 10⁶'
        ],
        correctAnswer: '8,2 · 10⁵',
        explanation: 'A tizedesvesszőt a szám végétől 5 helyiértékkel toljuk balra, hogy a 8 mögé kerüljön ($8{,}2$). Ezért a 10 kitevője 5: $8{,}2 \\cdot 10^5$.',
        breakdown: [
          { label: 'Eredeti szám', value: '820 000' },
          { label: 'Lépések balra', value: '5 lépés (8,20000)' },
          { label: 'Normálalak', value: '8,2 · 10⁵' }
        ],
        hint: 'Számold meg, hány hellyel kell balra tolni a tizedesvesszőt, hogy 8,2 legyen belőle!'
      },
      {
        id: 'q2-6',
        level: 2,
        title: 'Szám átírása normálalakra',
        prompt: 'Hogyan írható fel az $5\\ 000\\ 000\\ 000$ (5 milliárd) szám normálalakban?',
        options: [
          '5 · 10⁹',
          '5 · 10⁸',
          '50 · 10⁸',
          '5 · 10¹⁰'
        ],
        correctAnswer: '5 · 10⁹',
        explanation: 'Az 5 milliárd kiírva egy 5-ösből és 9 darab nullából áll. Ezért normálalakban: $5 \\cdot 10^9$.',
        breakdown: [
          { label: 'Szám', value: '5 000 000 000' },
          { label: 'Nullák száma', value: '9 db nulla' },
          { label: 'Normálalak', value: '5 · 10⁹' }
        ],
        hint: '1 milliárd = 10⁹, tehát 5 milliárd = 5 · 10⁹.'
      },
      {
        id: 'q2-7',
        level: 2,
        title: 'Normálalak visszaváltása',
        prompt: 'Milyen számnak felel meg a $3{,}45 \\cdot 10^4$ normálalakú szám szokásos alakban?',
        options: [
          '34 500',
          '3 450',
          '345 000',
          '34,5'
        ],
        correctAnswer: '34 500',
        explanation: '$10^4 = 10\\ 000$. A $3{,}45 \\cdot 10\\ 000$ kiszámításához a tizedesvesszőt 4 hellyel toljuk jobbra: $3{,}45 \\to 34{,}5 \\to 345 \\to 3\\ 450 \\to 34\\ 500$.',
        breakdown: [
          { label: 'Kitevő', value: '4 (4 hellyel tolunk jobbra)' },
          { label: 'Szorzás', value: '3,45 · 10 000' },
          { label: 'Eredmény', value: '34 500' }
        ],
        hint: 'Tolj 4 helyet jobbra a tizedesvesszőn! Két lépés a tizedesjegyek elfogyasztása, utána még két nullát írsz utána.'
      },
      {
        id: 'q2-8',
        level: 2,
        title: 'Tört hatványa',
        prompt: 'Mennyi a $\\left(\\frac{3}{4}\\right)^2$ hatvány értéke?',
        options: [
          '9/16',
          '6/8',
          '9/4',
          '3/16'
        ],
        correctAnswer: '9/16',
        explanation: 'Tört hatványozásakor a számlálót és a nevezőt is négyzetre emeljük: $\\left(\\frac{3}{4}\\right)^2 = \\frac{3^2}{4^2} = \\frac{9}{16}$.',
        breakdown: [
          { label: 'Számláló négyzete', value: '3² = 9' },
          { label: 'Nevező négyzete', value: '4² = 16' },
          { label: 'Eredmény', value: '9/16' }
        ],
        hint: 'Emeld négyzetre a fenti 3-ast és a lenti 4-est is külön-külön!'
      },
      {
        id: 'q2-9',
        level: 2,
        title: 'Tizedes tört hatványa',
        prompt: 'Mennyi a $0{,}3^3$ hatvány értéke?',
        options: [
          '0,027',
          '0,27',
          '0,09',
          '0,0027'
        ],
        correctAnswer: '0,027',
        explanation: '$0{,}3 \\cdot 0{,}3 \\cdot 0{,}3 = 0{,}027$. Mivel a $0{,}3$-nak 1 tizedesjegye van, a harmadik hatványának $1 \\cdot 3 = 3$ tizedesjegye lesz ($3^3 = 27 \\to 0{,}027$).',
        breakdown: [
          { label: '3 harmadik hatványa', value: '3³ = 27' },
          { label: 'Tizedesjegyek száma', value: '1 · 3 = 3 tizedesjegy' },
          { label: 'Eredmény', value: '0,027' }
        ],
        hint: 'A 3³ = 27, és összesen 3 darab tizedesjegy kell legyen!'
      },
      {
        id: 'q2-10',
        level: 2,
        title: 'Negatív hatványalap zárójelben',
        prompt: 'Mennyi a $\\left(-\\frac{1}{2}\\right)^4$ értéke?',
        options: [
          '+1/16',
          '-1/16',
          '+1/8',
          '-1/8'
        ],
        correctAnswer: '+1/16',
        explanation: 'Mivel a kitevő páros (4), az eredmény pozitív lesz. $\\frac{1^4}{2^4} = \\frac{1}{16}$, tehát az érték $+1/16$.',
        breakdown: [
          { label: 'Előjel', value: 'Páros kitevő (4) miatt pozitív (+)' },
          { label: 'Számláló', value: '1⁴ = 1' },
          { label: 'Nevező', value: '2⁴ = 16' },
          { label: 'Eredmény', value: '+1/16' }
        ],
        hint: 'Páros kitevő esetén a negatív előjel pozitívvá válik!'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Alkalmazások és Összehasonlítások',
    subtitle: 'Normálalakok összehasonlítása, szorzása, valós természettudományos mértékek és vegyes feladatok',
    range: '21 - 30. feladat',
    focus: 'Nagyságrendek és mélyebb összefüggések',
    questions: [
      {
        id: 'q3-1',
        level: 3,
        title: 'Számok összehasonlítása normálalakban',
        prompt: 'Melyik szám a NAGYOBB: $3{,}2 \\cdot 10^7$ vagy $8{,}5 \\cdot 10^6$?',
        options: [
          '3,2 · 10⁷ a nagyobb',
          '8,5 · 10⁶ a nagyobb',
          'A két szám egyenlő',
          'Nem összehasonlíthatóak'
        ],
        correctAnswer: '3,2 · 10⁷ a nagyobb',
        explanation: 'Normálalakú számoknál először mindig a 10 kitevőjét vizsgáljuk. Mivel $7 > 6$, a $3{,}2 \\cdot 10^7$ (32 millió) nagyságrenddel nagyobb, mint a $8{,}5 \\cdot 10^6$ (8,5 millió).',
        breakdown: [
          { label: 'Első szám', value: '3,2 · 10⁷ = 32 000 000' },
          { label: 'Második szám', value: '8,5 · 10⁶ = 8 500 000' },
          { label: 'Összehasonlítás', value: 'A nagyobb kitevő (7 > 6) dönti el!' }
        ],
        hint: 'A kitevő a nagyságrendet jelenti: a 10⁷ tízszer akkora nagyságrend, mint a 10⁶!'
      },
      {
        id: 'q3-2',
        level: 3,
        title: 'Összehasonlítás azonos kitevőnél',
        prompt: 'Ha a 10 kitevője megegyezik, melyik szám a kisebb: $4{,}18 \\cdot 10^5$ vagy $4{,}7 \\cdot 10^5$?',
        options: [
          '4,18 · 10⁵ a kisebb',
          '4,7 · 10⁵ a kisebb',
          'Egyenlőek',
          'Nem dönthető el'
        ],
        correctAnswer: '4,18 · 10⁵ a kisebb',
        explanation: 'Azonos kitevő esetén az első tényezőt hasonlítjuk össze: $4{,}18 < 4{,}70$, ezért a $4{,}18 \\cdot 10^5$ a kisebb szám.',
        breakdown: [
          { label: 'Kitevők', value: 'Mindkettő 5 (megegyeznek)' },
          { label: 'Tényezők', value: '4,18 < 4,70' },
          { label: 'Kisebb szám', value: '4,18 · 10⁵' }
        ],
        hint: 'Ha a kitevők azonosak, csak a 4,18-at és a 4,7-et kell összehasonlítanod.'
      },
      {
        id: 'q3-3',
        level: 3,
        title: 'A fénysebesség normálalakban',
        prompt: 'A fény vákuumbeli sebessége kb. $300\\ 000\\text{ km/s}$. Mennyi ez normálalakban?',
        options: [
          '3 · 10⁵ km/s',
          '30 · 10⁴ km/s',
          '3 · 10⁶ km/s',
          '0,3 · 10⁶ km/s'
        ],
        correctAnswer: '3 · 10⁵ km/s',
        explanation: '$300\\ 000 = 3 \\cdot 100\\ 000 = 3 \\cdot 10^5$. Az 5 darab nulla miatt a kitevő 5.',
        breakdown: [
          { label: 'Érték', value: '300 000 km/s' },
          { label: 'Nullák száma', value: '5 db' },
          { label: 'Normálalak', value: '3 · 10⁵ km/s' }
        ],
        hint: 'A 300 000-ben 5 darab nulla van az egyes után.'
      },
      {
        id: 'q3-4',
        level: 3,
        title: 'Föld-Nap távolság normálalakban',
        prompt: 'A Föld átlagos távolsága a Naptól kb. $149\\ 600\\ 000\\text{ km}$. Hogyan írjuk ezt fel normálalakban?',
        options: [
          '1,496 · 10⁸ km',
          '14,96 · 10⁷ km',
          '1,496 · 10⁷ km',
          '149,6 · 10⁶ km'
        ],
        correctAnswer: '1,496 · 10⁸ km',
        explanation: 'A tizedesvesszőt 8 hellyel balra toljuk, hogy a legelső számjegy (1) mögé kerüljön: $1{,}496$. A lépések száma 8, tehát $1{,}496 \\cdot 10^8\\text{ km}$.',
        breakdown: [
          { label: 'Eredeti érték', value: '149 600 000 km' },
          { label: 'Lépések az 1 mögé', value: '8 lépés balra' },
          { label: 'Normálalak', value: '1,496 · 10⁸ km' }
        ],
        hint: 'Számold meg: a legelső 1-es után még hány számjegy áll összesen? Pontosan 8!'
      },
      {
        id: 'q3-5',
        level: 3,
        title: 'Szorzás normálalakban',
        prompt: 'Mennyi a szorzata: $(2 \\cdot 10^3) \\cdot (3 \\cdot 10^4)$?',
        options: [
          '6 · 10⁷',
          '6 · 10¹²',
          '5 · 10⁷',
          '6 · 10⁶'
        ],
        correctAnswer: '6 · 10⁷',
        explanation: 'A számokat összeszorozzuk a számokkal: $2 \\cdot 3 = 6$. A 10-hatványokat összevonjuk a kitevők összeadásával: $10^3 \\cdot 10^4 = 10^{3+4} = 10^7$. Az eredmény $6 \\cdot 10^7$.',
        breakdown: [
          { label: 'Szorzás rendezése', value: '(2 · 3) · (10³ · 10⁴)' },
          { label: 'Számok szorzata', value: '2 · 3 = 6' },
          { label: 'Hatványok szorzata', value: '10³ · 10⁴ = 10⁷' },
          { label: 'Végeredmény', value: '6 · 10⁷' }
        ],
        hint: 'Szorozd össze a 2-t és a 3-at, a 10-hatványok kitevőit pedig add össze!'
      },
      {
        id: 'q3-6',
        level: 3,
        title: 'Szorzás normálalakban kiigazítással',
        prompt: 'Mennyi a $(4 \\cdot 10^5) \\cdot (5 \\cdot 10^3)$ szorzat helyes NORMÁLALAKJA?',
        options: [
          '2 · 10⁹',
          '20 · 10⁸',
          '2 · 10⁸',
          '20 · 10⁹'
        ],
        correctAnswer: '2 · 10⁹',
        explanation: 'Először: $(4 \\cdot 5) \\cdot (10^5 \\cdot 10^3) = 20 \\cdot 10^8$. Mivel a 20 nem normálalak ($20 \\ge 10$), át kell alakítani: $20 = 2 \\cdot 10^1$, így $(2 \\cdot 10^1) \\cdot 10^8 = 2 \\cdot 10^9$.',
        breakdown: [
          { label: '1. lépés', value: '4 · 5 = 20' },
          { label: '2. lépés', value: '10⁵ · 10³ = 10⁸' },
          { label: '3. lépés', value: '20 · 10⁸ (nem normálalak!)' },
          { label: 'Normálalakra hozás', value: '20 = 2 · 10¹ → 2 · 10⁹' }
        ],
        hint: 'A 4 · 5 = 20, de a 20 nem normálalak! A tizedesvesszőt még eggyel balra kell vinni, és a kitevőt növelni 1-gyel.'
      },
      {
        id: 'q3-7',
        level: 3,
        title: 'A milliárd és a billió',
        prompt: 'Hányszor nagyobb 1 billió ($10^{12}$), mint 1 milliárd ($10^9$)?',
        options: [
          '1 000-szer (ezerszer)',
          '100-szor (százszor)',
          '1 000 000-szor (milliószor)',
          '3-szor'
        ],
        correctAnswer: '1 000-szer (ezerszer)',
        explanation: 'Az arány: $10^{12} : 10^9 = 10^{12-9} = 10^3 = 1\\ 000$. Tehát 1 billió pontosan ezerszerese 1 milliárdnak.',
        breakdown: [
          { label: '1 billió', value: '10¹² (1 000 000 000 000)' },
          { label: '1 milliárd', value: '10⁹ (1 000 000 000)' },
          { label: 'Különbség a kitevőben', value: '12 - 9 = 3 → 10³ = 1 000' }
        ],
        hint: 'A kitevők különbsége: 12 - 9 = 3. Mennyi 10³?'
      },
      {
        id: 'q3-8',
        level: 3,
        title: 'Összehasonlítás: (-2)⁴ és -2⁴',
        prompt: 'Melyik állítás IGAZ a $(-2)^4$ és a $-2^4$ kifejezésekre?',
        options: [
          '(-2)⁴ = +16, míg -2⁴ = -16, így az első 32-vel nagyobb',
          'Mindkettő értéke +16',
          'Mindkettő értéke -16',
          '(-2)⁴ = -16, míg -2⁴ = +16'
        ],
        correctAnswer: '(-2)⁴ = +16, míg -2⁴ = -16, így az első 32-vel nagyobb',
        explanation: 'A zárójeles kifejezésnél az alap negatív, és páros kitevőre emeljük: $(-2)^4 = +16$. Zárójel nélkül a mínusz a hatványozás után következik: $-2^4 = -(16) = -16$. A kettő különbsége: $16 - (-16) = 32$.',
        breakdown: [
          { label: '(-2)⁴', value: '(-2) · (-2) · (-2) · (-2) = +16' },
          { label: '-2⁴', value: '-(2 · 2 · 2 · 2) = -16' },
          { label: 'Különbség', value: '+16 és -16 NEM egyenlő!' }
        ],
        hint: 'A zárójeles negatív alap páros kitevővel pozitív, zárójel nélkül viszont negatív marad!'
      },
      {
        id: 'q3-9',
        level: 3,
        title: 'Digitális mértékegységek',
        prompt: 'Egy merevlemez kapacitása 2 Terabájt (kb. $2 \\cdot 10^{12}$ bájt). Hány Megabájtnak (kb. $10^6$ bájt) felel ez meg?',
        options: [
          '2 · 10⁶ Megabájt (2 millió MB)',
          '2 · 10³ Megabájt (2 ezer MB)',
          '2 · 10⁹ Megabájt',
          '200 Megabájt'
        ],
        correctAnswer: '2 · 10⁶ Megabájt (2 millió MB)',
        explanation: 'A felosztás: $\\frac{2 \\cdot 10^{12}}{10^6} = 2 \\cdot 10^{12-6} = 2 \\cdot 10^6$ Megabájt, ami 2 millió Megabájtot jelent.',
        breakdown: [
          { label: 'Kapacitás', value: '2 · 10¹² bájt' },
          { label: '1 Megabájt', value: '10⁶ bájt' },
          { label: 'Osztás', value: '2 · 10¹² / 10⁶ = 2 · 10⁶ MB' }
        ],
        hint: 'Oszd el a 10¹²-t a 10⁶-nal: a kitevőket ki kell vonni egymásból!'
      },
      {
        id: 'q3-10',
        level: 3,
        title: 'Összetett művelet hatványokkal',
        prompt: 'Mennyi a $2^3 + 3^2 - 5^0$ kifejezés pontos értéke?',
        options: [
          '16',
          '17',
          '18',
          '15'
        ],
        correctAnswer: '16',
        explanation: 'Számoljuk ki tagonként: $2^3 = 8$; $3^2 = 9$; $5^0 = 1$. Behelyettesítve: $8 + 9 - 1 = 17 - 1 = 16$.',
        breakdown: [
          { label: '2³ értéke', value: '8' },
          { label: '3² értéke', value: '9' },
          { label: '5⁰ értéke', value: '1 (nem 0!)' },
          { label: 'Művelet', value: '8 + 9 - 1 = 16' }
        ],
        hint: 'Figyelj a nulladik hatványra: 5⁰ = 1, nem 0!'
      }
    ]
  }
};

export const LargeNumbersPowersQuiz: React.FC<LargeNumbersPowersQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      grade={7}
      chapterId="g7-powers-divisibility"
      topicId="g7-powers-large-numbers"
      topicTitle="1. Nagy számok és a hatványalak"
      subtopicId="nagy-szamok-es-a-hatvanyalak"
      documentId="grade-7-hatvanyozas-nagy-szamok-quiz"
      emoji="🔢"
      topicBadge="7. Osztály • Matematika IV. Témakör"
      badgeText="7. Osztály • Matematika IV. Témakör"
      title="1. Nagy számok és a hatványalak Kvíz"
      subtitle="Gyakorold a hatványozás fogalmát, előjeles hatványokat, a 10 hatványait és a normálalakot 30 változatos feladattal és azonnali magyarázatokkal!"
      cheatSheetTitle="Hatványozás & Normálalak Kisokos"
      cheatSheetCards={cheatSheetCards}
      levels={quizLevels}
      matcherComponent={<LargeNumbersPowersMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<LargeNumbersPowersSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      themeColor="amber"
      hintText="💡 Ügyelj a zárójel nélküli előjelekre (-a² vs (-a)²), a nulladik hatványra (a⁰ = 1), és a normálalak feltételére (1 ≤ a < 10)!"
    />
  );
};

export default LargeNumbersPowersQuiz;

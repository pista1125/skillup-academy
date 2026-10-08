import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { PrimeFactorizationMatcher } from './PrimeFactorizationMatcher';
import { PrimeFactorizationSorter } from './PrimeFactorizationSorter';
import {
  Boxes,
  Binary,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Hash,
  ShieldCheck,
  Filter,
  Lightbulb
} from 'lucide-react';

interface PrimeFactorizationQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Prímszámok és Összetett Számok',
    icon: <ShieldCheck className="w-4 h-4 text-emerald-600" />,
    formula: 'Prím: 2 osztó  |  Összetett: >2 osztó  |  1: se nem prím, se nem összetett',
    note: 'A 2 az egyetlen páros prímszám és a legkisebb prímszám!',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="5" y="8" width="45" height="34" rx="8" className="fill-amber-100 stroke-amber-300" />
        <text x="14" y="29" className="text-[10px] font-bold fill-amber-900">1: 1 db</text>
        <rect x="55" y="8" width="48" height="34" rx="8" className="fill-emerald-100 stroke-emerald-300" />
        <text x="61" y="29" className="text-[10px] font-bold fill-emerald-900">Prím: 2</text>
        <rect x="108" y="8" width="48" height="34" rx="8" className="fill-blue-100 stroke-blue-300" />
        <text x="114" y="29" className="text-[10px] font-bold fill-blue-900">Össz: &gt;2</text>
      </svg>
    )
  },
  {
    id: 'c2',
    title: 'Eratoszthenész Szitája (1–100)',
    icon: <Filter className="w-4 h-4 text-emerald-600" />,
    formula: '25 darab prím van 100 alatt: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37...',
    note: '100-ig elegendő a 2, 3, 5, 7 többszöröseit kiszűrni (mert 10² = 100). Vigyázz: 51, 57, 87, 91 összetett!',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <circle cx="25" cy="25" r="18" className="fill-emerald-100 stroke-emerald-400 stroke-2" />
        <text x="20" y="29" className="text-xs font-black fill-emerald-800">25</text>
        <text x="50" y="22" className="text-[10px] font-bold fill-slate-700">prímszám</text>
        <text x="50" y="34" className="text-[9px] fill-slate-500">1 és 100 között</text>
      </svg>
    )
  },
  {
    id: 'c3',
    title: 'A Számelmélet Alaptétele',
    icon: <Hash className="w-4 h-4 text-emerald-600" />,
    formula: 'Kanonikus alak: n = p₁^{α₁} · p₂^{α₂} · ... · p_k^{α_k}',
    note: 'Minden 1-nél nagyobb összetett szám egyértelműen bontható prímek szorzatára a tényezők sorrendjétől eltekintve.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="5" y="8" width="150" height="34" rx="8" className="fill-emerald-50 stroke-emerald-300" />
        <text x="12" y="29" className="text-[10px] font-mono font-bold fill-emerald-900">360 = 2³ · 3² · 5¹</text>
      </svg>
    )
  },
  {
    id: 'c4',
    title: 'Függőleges Vonalas Felbontás',
    icon: <Binary className="w-4 h-4 text-emerald-600" />,
    formula: 'Balra: osztandó & hányados  |  Jobbra: legkisebb prímosztók (2, 3, 5...)',
    note: 'Amikor a bal oldalon elérjük az 1-et, a felbontás kész!',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <line x1="80" y1="5" x2="80" y2="45" className="stroke-emerald-500 stroke-2" />
        <text x="50" y="22" className="text-[10px] font-mono fill-slate-800">12</text>
        <text x="95" y="22" className="text-[10px] font-mono font-bold fill-emerald-600">2</text>
        <text x="55" y="38" className="text-[10px] font-mono fill-slate-800">6</text>
        <text x="95" y="38" className="text-[10px] font-mono font-bold fill-emerald-600">2</text>
      </svg>
    )
  }
];

const quizLevels: Record<number, LevelConfig> = {
  1: {
    title: '1. Szint: Prímszámok, Összetett Számok és Eratoszthenész Szitája',
    subtitle: 'Alapvető fogalmak, a 2 és az 1 különlegessége, valamint a 100 alatti prímek felismerése',
    questions: [
      {
        id: 'q1-1',
        title: 'Hány pozitív osztója van egy prímszámnak?',
        question: 'A matematikai definíció szerint hány pozitív osztója van pontosan egy prímszámnak?',
        options: ['Pontosan 2 (az 1 és önmaga)', 'Pontosan 1', 'Legalább 3', 'Végtelen sok'],
        correctAnswer: 'Pontosan 2 (az 1 és önmaga)',
        explanation: 'A prímszámoknak (törzsszámoknak) pontosan 2 pozitív osztójuk van: az 1 és önmaguk.',
        breakdown: [
          { label: 'Definíció', value: 'Pontosan két pozitív osztó: 1 és p' },
          { label: 'Példa', value: '7 osztói: 1 és 7 (pontosan 2 darab)' }
        ],
        hint: 'Gondolj a 3-ra vagy az 5-re: mely számokkal oszthatók?'
      },
      {
        id: 'q1-2',
        title: 'Miért nem prímszám az 1?',
        question: 'Mi az oka annak, hogy az 1-es szám se nem prím, se nem összetett?',
        options: [
          'Mert csak 1 pozitív osztója van (nincs 2 különböző osztója)',
          'Mert páros szám',
          'Mert minden számnak többszöröse',
          'Mert negatív számmal is osztható'
        ],
        correctAnswer: 'Mert csak 1 pozitív osztója van (nincs 2 különböző osztója)',
        explanation: 'A prímekhez pontosan két különböző osztó szükséges (1 és önmaga). Az 1-nek önmaga is az 1, így csak egyetlen osztója van!',
        breakdown: [
          { label: '1 osztói', value: 'Csak az 1 (1 darab osztó)' },
          { label: 'Szabály', value: 'Prím = pontosan 2 osztó → az 1 se nem prím, se nem összetett' }
        ],
        hint: 'Hány különböző pozitív számmal tudod elosztani az 1-et maradék nélkül?'
      },
      {
        id: 'q1-3',
        title: 'A legkisebb prímszám',
        question: 'Melyik a legkisebb prímszám a természetes számok halmazán?',
        options: ['2', '1', '0', '3'],
        correctAnswer: '2',
        explanation: 'A legkisebb prímszám a 2. Emellett a 2 az egyetlen páros prímszám is!',
        breakdown: [
          { label: '0', value: 'Nem prím (végtelen sok osztója van)' },
          { label: '1', value: 'Nem prím (csak 1 osztója van)' },
          { label: '2', value: 'Legkisebb prím (osztói: 1 és 2)' }
        ],
        hint: 'A legkisebb pozitív egész szám, aminek pontosan 2 osztója van.'
      },
      {
        id: 'q1-4',
        title: 'Páros prímszámok létezése',
        question: 'Hány páros prímszám létezik a számegyenesen?',
        options: ['Pontosan 1 darab (a 2)', 'Egyetlenegy sem', 'Végtelen sok', '2 darab (a 2 és a 4)'],
        correctAnswer: 'Pontosan 1 darab (a 2)',
        explanation: 'Csak a 2 páros prím. Minden nála nagyobb páros szám osztható 2-vel is, így legalább 3 osztója van (1, 2 és önmaga), tehát összetett szám!',
        breakdown: [
          { label: '2', value: 'Osztói: 1, 2 → PRÍM' },
          { label: '2n (n > 1)', value: 'Osztói legalább: 1, 2, 2n → ÖSSZETETT' }
        ],
        hint: 'Gondolj a 4-re, 6-ra, 8-ra: mind osztható 2-vel!'
      },
      {
        id: 'q1-5',
        title: 'Prímszámok száma 100 alatt',
        question: 'Hány prímszám található 1 és 100 között?',
        options: ['25 darab', '20 darab', '30 darab', '50 darab'],
        correctAnswer: '25 darab',
        explanation: 'Eratoszthenész szitájával meghatározva pontosan 25 darab prímszám van 100 alatt.',
        breakdown: [
          { label: 'Első 10 prím', value: '2, 3, 5, 7, 11, 13, 17, 19, 23, 29' },
          { label: 'Összesen 100-ig', value: 'Pontosan 25 darab prím' }
        ],
        hint: 'A számok negyede prím a százas táblán.'
      },
      {
        id: 'q1-6',
        title: 'Összetett szám felismerése: 51',
        question: 'Prímszám-e az 51?',
        options: [
          'NEM, összetett szám, mert 5 + 1 = 6, így osztható 3-mal (51 = 3 · 17)',
          'IGEN, mert 1-re végződik',
          'IGEN, mert páratlan szám',
          'NEM, mert osztható 2-vel'
        ],
        correctAnswer: 'NEM, összetett szám, mert 5 + 1 = 6, így osztható 3-mal (51 = 3 · 17)',
        explanation: 'Klasszikus csapdaszám! Az 51 számjegyeinek összege 5 + 1 = 6, ami osztható 3-mal, így 51 = 3 · 17, tehát összetett szám!',
        breakdown: [
          { label: 'Számjegyösszeg', value: '5 + 1 = 6 (osztható 3-mal)' },
          { label: 'Szorzat', value: '51 = 3 · 17' },
          { label: 'Eredmény', value: 'Összetett szám' }
        ],
        hint: 'Add össze a számjegyeit: 5 + 1 = ?'
      },
      {
        id: 'q1-7',
        title: 'A 91-es szám rejtett osztói',
        question: 'Prímszám vagy összetett szám a 91?',
        options: [
          'Összetett szám, mert 91 = 7 · 13',
          'Prímszám, mert nem osztható 2-vel, 3-mal és 5-tel sem',
          'Prímszám, mert 1-re végződik',
          'Se nem prím, se nem összetett'
        ],
        correctAnswer: 'Összetett szám, mert 91 = 7 · 13',
        explanation: 'A 91 a leggyakoribb dolgozatbeli buktató: nem osztható 2-vel, 3-mal, 5-tel, de 7-tel igen! 91 : 7 = 13, így 91 = 7 · 13 összetett szám!',
        breakdown: [
          { label: 'Teszt 7-tel', value: '91 = 70 + 21 = 7 · (10 + 3) = 7 · 13' },
          { label: 'Eredmény', value: 'Összetett szám (osztói: 1, 7, 13, 91)' }
        ],
        hint: 'Oszd el 7-tel: 70 + 21 = 91!'
      },
      {
        id: 'q1-8',
        title: 'Eratoszthenész szitájának megállási szabálya',
        question: 'Ha 1-től 100-ig keresünk prímeket Eratoszthenész szitájával, melyik prím többszöröseinek kihúzása után állhatunk meg?',
        options: ['7 után (mert 10² = 100, és a következő prím a 11 > 10)', '5 után', '13 után', '50 után'],
        correctAnswer: '7 után (mert 10² = 100, és a következő prím a 11 > 10)',
        explanation: 'Mivel 10 · 10 = 100, minden 100-nál kisebb összetett számnak van legfeljebb 10-es prímosztója. A 10 alatti prímek: 2, 3, 5, 7. A 7 után a 11 jönne, de 11² = 121 > 100, így felesleges folytatni!',
        breakdown: [
          { label: 'Felső határ', value: '√100 = 10' },
          { label: 'Prímek 10-ig', value: '2, 3, 5, 7' },
          { label: 'Következő prím', value: '11² = 121 > 100 → kész vagyunk!' }
        ],
        hint: 'Melyik szám négyzete éri el a 100-at?'
      },
      {
        id: 'q1-9',
        title: 'A legnagyobb kétjegyű prímszám',
        question: 'Melyik a legnagyobb kétjegyű prímszám?',
        options: ['97', '99', '93', '91'],
        correctAnswer: '97',
        explanation: 'A 99 osztható 3-mal és 9-cel, a 93 osztható 3-mal (3 · 31), a 91 osztható 7-tel (7 · 13). A 97-nek nincs 10 alatti prímosztója, így a 97 a legnagyobb kétjegyű prím!',
        breakdown: [
          { label: '99', value: '9 · 11 (összetett)' },
          { label: '97', value: 'Nem osztható 2, 3, 5, 7-tel → PRÍM' }
        ],
        hint: 'A 99 páratlan és 3-mal osztható, a 97 prím.'
      },
      {
        id: 'q1-10',
        title: 'Összetett számok definíciója',
        question: 'Melyik kijelentés igaz az összetett számokra?',
        options: [
          'Olyan 1-nél nagyobb természetes számok, amelyeknek kettőnél több osztójuk van',
          'Minden páros szám összetett szám',
          'Minden szám összetett, ami nem 0',
          'Az 1 a legkisebb összetett szám'
        ],
        correctAnswer: 'Olyan 1-nél nagyobb természetes számok, amelyeknek kettőnél több osztójuk van',
        explanation: 'Az összetett számok 1-nél nagyobb egész számok, amelyeknek 2-nél több pozitív osztójuk van, vagyis felbonthatók egynél nagyobb számok szorzatára.',
        breakdown: [
          { label: 'Kritérium', value: 'n > 1 és osztók száma > 2' },
          { label: 'Legkisebb összetett szám', value: '4 (osztói: 1, 2, 4)' }
        ],
        hint: 'Hány osztójuk van az összetett számoknak?'
      }
    ]
  },
  2: {
    title: '2. Szint: A Számelmélet Alaptétele és Kanonikus Alak',
    subtitle: 'Számok prímtényezős felbontásának felírása és ellenőrzése',
    questions: [
      {
        id: 'q2-1',
        title: 'A számelmélet alaptétele',
        question: 'Mit állít a számelmélet alaptétele?',
        options: [
          'Minden 1-nél nagyobb összetett szám egyértelműen felírható prímszámok szorzataként (a sorrendtől eltekintve)',
          'Minden szám felírható két páratlan szám összegeként',
          'Végtelen sok összetett szám létezik',
          'Minden szám osztható a prímtényezőivel'
        ],
        correctAnswer: 'Minden 1-nél nagyobb összetett szám egyértelműen felírható prímszámok szorzataként (a sorrendtől eltekintve)',
        explanation: 'Ez a tétel biztosítja, hogy minden összetett szám „DNS-kódja”, azaz prímtényezős felbontása egyértelmű, egyetlen lehetséges prímhatvány-szorzat!',
        breakdown: [
          { label: 'Lényeg', value: 'Egyértelmű felbonthatóság prímek szorzatára' },
          { label: 'Kivétel', value: 'A tényezők felírási sorrendje tetszőleges' }
        ],
        hint: 'A prímtényezős felbontás egyértelműségéről szól a tétel.'
      },
      {
        id: 'q2-2',
        title: 'A 24 prímtényezős felbontása',
        question: 'Mi a 24 kanonikus prímtényezős alakja?',
        options: ['2³ · 3', '2² · 6', '4 · 6', '2 · 12'],
        correctAnswer: '2³ · 3',
        explanation: '24 = 2 · 12 = 2 · 2 · 6 = 2 · 2 · 2 · 3 = 2³ · 3. A 4, 6 és 12 összetett számok, a kanonikus alakban csak prímek szerepelhetnek!',
        breakdown: [
          { label: '24 : 2 = 12', value: '1. prímtényező: 2' },
          { label: '12 : 2 = 6', value: '2. prímtényező: 2' },
          { label: '6 : 2 = 3', value: '3. prímtényező: 2' },
          { label: '3 : 3 = 1', value: '4. prímtényező: 3' },
          { label: 'Kanonikus alak', value: '2³ · 3' }
        ],
        hint: 'Oszd el a 24-et 2-vel annyiszor, ahányszor csak lehet!'
      },
      {
        id: 'q2-3',
        title: 'A 60 prímtényezős felbontása',
        question: 'Melyik a 60 helyes kanonikus prímtényezős alakja?',
        options: ['2² · 3 · 5', '4 · 15', '2 · 30', '2³ · 3 · 5'],
        correctAnswer: '2² · 3 · 5',
        explanation: '60 : 2 = 30; 30 : 2 = 15; 15 : 3 = 5; 5 : 5 = 1. Tehát 60 = 2 · 2 · 3 · 5 = 2² · 3 · 5.',
        breakdown: [
          { label: '2-vel osztások', value: '60 → 30 → 15 (két darab 2-es)' },
          { label: '3-mal osztás', value: '15 → 5 (egy darab 3-as)' },
          { label: '5-tel osztás', value: '5 → 1 (egy darab 5-ös)' },
          { label: 'Összesítve', value: '2² · 3 · 5' }
        ],
        hint: '60 = 4 · 15, bontsd tovább a 4-et és a 15-öt prímekre!'
      },
      {
        id: 'q2-4',
        title: 'A 100 prímfelbontása',
        question: 'Mi a 100 kanonikus alakja?',
        options: ['2² · 5²', '10²', '2 · 50', '2³ · 5²'],
        correctAnswer: '2² · 5²',
        explanation: '100 = 10 · 10 = (2 · 5) · (2 · 5) = 2² · 5². A 10 nem prímszám, ezért a 10² nem kanonikus alak!',
        breakdown: [
          { label: '100 : 2 = 50', value: '100 = 2 · 50' },
          { label: '50 : 2 = 25', value: '50 = 2 · 25' },
          { label: '25 = 5 · 5', value: '25 = 5²' },
          { label: 'Kanonikus', value: '2² · 5²' }
        ],
        hint: 'A 10 négyzete, de a 10-et bontsd fel 2 · 5-re!'
      },
      {
        id: 'q2-5',
        title: 'Szám visszaszámolása felbontásból',
        question: 'Melyik számnak a felbontása a 2³ · 3²?',
        options: ['72', '36', '48', '108'],
        correctAnswer: '72',
        explanation: '2³ = 8, 3² = 9, és 8 · 9 = 72.',
        breakdown: [
          { label: '2³', value: '2 · 2 · 2 = 8' },
          { label: '3²', value: '3 · 3 = 9' },
          { label: 'Szorzat', value: '8 · 9 = 72' }
        ],
        hint: 'Számold ki: 8 · 9 = ?'
      },
      {
        id: 'q2-6',
        title: 'A 75 prímfelbontása',
        question: 'Hogyan írható fel a 75 prímszámok hatványainak szorzataként?',
        options: ['3 · 5²', '3² · 5', '15 · 5', '5³'],
        correctAnswer: '3 · 5²',
        explanation: '75 : 3 = 25, 25 : 5 = 5, 5 : 5 = 1. Így 75 = 3 · 5 · 5 = 3 · 5².',
        breakdown: [
          { label: '75 : 3', value: '25' },
          { label: '25 : 5', value: '5' },
          { label: '5 : 5', value: '1' },
          { label: 'Eredmény', value: '3 · 5²' }
        ],
        hint: '75 = 3 · 25, és mennyi a 25 prímfelbontása?'
      },
      {
        id: 'q2-7',
        title: 'A 144 prímfelbontása',
        question: 'Melyik a 144 kanonikus alakja?',
        options: ['2⁴ · 3²', '2³ · 3³', '12²', '2⁴ · 9'],
        correctAnswer: '2⁴ · 3²',
        explanation: '144 = 12 · 12 = (2² · 3) · (2² · 3) = 2⁴ · 3². Ellenőrzés: 2⁴ = 16, 3² = 9, 16 · 9 = 144.',
        breakdown: [
          { label: '144 : 16 = 9', value: '144 = 16 · 9' },
          { label: '16 = 2⁴', value: '4 darab 2-es' },
          { label: '9 = 3²', value: '2 darab 3-as' },
          { label: 'Kanonikus alak', value: '2⁴ · 3²' }
        ],
        hint: '144 = 16 · 9. Írd fel a 16-ot és a 9-et hatványként!'
      },
      {
        id: 'q2-8',
        title: 'Miért nem kanonikus alak a 2² · 6?',
        question: 'Miért hibás azt mondani, hogy a 24 kanonikus alakja 2² · 6?',
        options: [
          'Mert a 6 nem prímszám (összetett szám)',
          'Mert az eredmény nem 24',
          'Mert a 2 kitevője túl kicsi',
          'Mert nincs benne 5-ös'
        ],
        correctAnswer: 'Mert a 6 nem prímszám (összetett szám)',
        explanation: 'A definíció szerint a kanonikus alakban kizárólag prímszámok szerepelhetnek alapként! Mivel 6 = 2 · 3 összetett, tovább kell bontani.',
        breakdown: [
          { label: 'Hiba oka', value: 'A 6 összetett szám (6 = 2 · 3)' },
          { label: 'Helyes alak', value: '2² · (2 · 3) = 2³ · 3' }
        ],
        hint: 'Prímszám-e a 6?'
      },
      {
        id: 'q2-9',
        title: 'A 90 prímfelbontása',
        question: 'Mi a 90 kanonikus alakja?',
        options: ['2 · 3² · 5', '2² · 3 · 5', '9 · 10', '2 · 3 · 15'],
        correctAnswer: '2 · 3² · 5',
        explanation: '90 : 2 = 45; 45 : 3 = 15; 15 : 3 = 5; 5 : 5 = 1. Tehát 90 = 2 · 3² · 5.',
        breakdown: [
          { label: '90 = 9 · 10', value: '9 = 3², 10 = 2 · 5' },
          { label: 'Rendezve', value: '2 · 3² · 5' }
        ],
        hint: '90 = 10 · 9. Bontsd prímekre a 10-et és a 9-et!'
      },
      {
        id: 'q2-10',
        title: 'A 200 felbontása',
        question: 'Mi a 200 kanonikus alakja?',
        options: ['2³ · 5²', '2² · 5³', '2 · 10²', '8 · 25'],
        correctAnswer: '2³ · 5²',
        explanation: '200 = 8 · 25 = 2³ · 5². Ellenőrzés: 8 · 25 = 200.',
        breakdown: [
          { label: '200 = 2 · 100', value: '100 = 2² · 5²' },
          { label: 'Összesen', value: '2¹ · 2² · 5² = 2³ · 5²' }
        ],
        hint: '200 = 2 · 100, a 100-at már ismered (2² · 5²)!'
      }
    ]
  },
  3: {
    title: '3. Szint: Nagy Számok Felbontása és Osztók Számának Meghatározása',
    subtitle: 'Nagyobb számok felbontása és az osztók számának kiszámítása a hatványkitevőkből',
    questions: [
      {
        id: 'q3-1',
        title: 'A 360 kanonikus alakja',
        question: 'Mi a 360 kanonikus prímtényezős alakja?',
        options: ['2³ · 3² · 5', '2² · 3³ · 5', '2³ · 3 · 5²', '2⁴ · 3² · 5'],
        correctAnswer: '2³ · 3² · 5',
        explanation: '360 = 36 · 10 = (4 · 9) · (2 · 5) = 2² · 3² · 2 · 5 = 2³ · 3² · 5.',
        breakdown: [
          { label: '360 : 8', value: '45 (mert 360 = 8 · 45 = 2³ · 45)' },
          { label: '45', value: '9 · 5 = 3² · 5' },
          { label: 'Kanonikus', value: '2³ · 3² · 5' }
        ],
        hint: '360 = 10 · 36. Bontsd fel mindkettőt prímekre!'
      },
      {
        id: 'q3-2',
        title: 'Osztók számának képlete',
        question: 'Ha egy szám kanonikus alakja n = 2³ · 3², hány pozitív osztója van összesen?',
        options: ['12 darab', '6 darab', '5 darab', '24 darab'],
        correctAnswer: '12 darab',
        explanation: 'Az osztók számát úgy kapjuk, hogy a kitevőkhöz hozzáadunk 1-et, és összeszorozzuk őket: d(n) = (3 + 1) · (2 + 1) = 4 · 3 = 12 darab!',
        breakdown: [
          { label: '2-es kitevője', value: '3 → (3 + 1) = 4 lehetőség (2⁰, 2¹, 2², 2³)' },
          { label: '3-as kitevője', value: '2 → (2 + 1) = 3 lehetőség (3⁰, 3¹, 3²)' },
          { label: 'Osztók száma', value: '4 · 3 = 12 darab' }
        ],
        hint: 'Növeld mindegyik kitevőt 1-gyel, majd szorozd össze őket: (3+1) · (2+1) = ?'
      },
      {
        id: 'q3-3',
        title: 'A 210 felbontása',
        question: 'Mi a 210 prímtényezős felbontása?',
        options: ['2 · 3 · 5 · 7', '2² · 3 · 5 · 7', '6 · 35', '2 · 3² · 5'],
        correctAnswer: '2 · 3 · 5 · 7',
        explanation: '210 = 21 · 10 = (3 · 7) · (2 · 5) = 2 · 3 · 5 · 7. Mind a négy legkisebb prím szerepel benne egyszer!',
        breakdown: [
          { label: '210 = 2 · 105', value: '1. prím: 2' },
          { label: '105 = 3 · 35', value: '2. prím: 3' },
          { label: '35 = 5 · 7', value: '3. és 4. prím: 5 és 7' },
          { label: 'Eredmény', value: '2 · 3 · 5 · 7' }
        ],
        hint: '210 = 10 · 21. A 10 = 2 · 5, a 21 = 3 · 7.'
      },
      {
        id: 'q3-4',
        title: 'A 250 felbontása',
        question: 'Mi a 250 kanonikus alakja?',
        options: ['2 · 5³', '2² · 5²', '10 · 25', '2 · 5²'],
        correctAnswer: '2 · 5³',
        explanation: '250 : 2 = 125, és 125 = 5³. Tehát 250 = 2 · 5³.',
        breakdown: [
          { label: '250 : 2', value: '125' },
          { label: '125', value: '5 · 5 · 5 = 5³' },
          { label: 'Kanonikus', value: '2 · 5³' }
        ],
        hint: '250 a fele az 500-nak, és 250 = 2 · 125.'
      },
      {
        id: 'q3-5',
        title: 'Hány osztója van a 100-nak?',
        question: 'A 100 felbontása 2² · 5². Hány pozitív osztója van a 100-nak?',
        options: ['9 darab', '4 darab', '8 darab', '10 darab'],
        correctAnswer: '9 darab',
        explanation: 'A kitevők: 2 és 2. Az osztók száma: (2 + 1) · (2 + 1) = 3 · 3 = 9 darab (1, 2, 4, 5, 10, 20, 25, 50, 100).',
        breakdown: [
          { label: 'Kitevők', value: 'α₁ = 2, α₂ = 2' },
          { label: 'Képlet', value: '(2 + 1) · (2 + 1) = 3 · 3 = 9' },
          { label: 'Osztók', value: '1, 2, 4, 5, 10, 20, 25, 50, 100' }
        ],
        hint: '(2 + 1) · (2 + 1) = ?'
      },
      {
        id: 'q3-6',
        title: 'Az 1000 kanonikus alakja',
        question: 'Mi az 1000 kanonikus prímtényezős felbontása?',
        options: ['2³ · 5³', '10³', '2⁴ · 5²', '2² · 5⁴'],
        correctAnswer: '2³ · 5³',
        explanation: '1000 = 10³ = (2 · 5)³ = 2³ · 5³. Ellenőrzés: 2³ = 8, 5³ = 125, 8 · 125 = 1000.',
        breakdown: [
          { label: '1000 = 10³', value: 'Hatványozás azonossága' },
          { label: '(2 · 5)³', value: '2³ · 5³' },
          { label: 'Ellenőrzés', value: '8 · 125 = 1000' }
        ],
        hint: '10 = 2 · 5, és 1000 = 10³.'
      },
      {
        id: 'q3-7',
        title: 'A 400 felbontása',
        question: 'Melyik a 400 helyes kanonikus alakja?',
        options: ['2⁴ · 5²', '2³ · 5²', '20²', '2² · 5³'],
        correctAnswer: '2⁴ · 5²',
        explanation: '400 = 4 · 100 = 2² · (2² · 5²) = 2⁴ · 5². Ellenőrzés: 2⁴ = 16, 5² = 25, 16 · 25 = 400.',
        breakdown: [
          { label: '400 = 16 · 25', value: '16 = 2⁴, 25 = 5²' },
          { label: 'Kanonikus alak', value: '2⁴ · 5²' }
        ],
        hint: '400 = 4 · 100. A 4 = 2², a 100 = 2² · 5².'
      },
      {
        id: 'q3-8',
        title: 'Prímszám négyzete: hány osztója van?',
        question: 'Ha p egy prímszám, hány pozitív osztója van p²-nek (például a 9-nek vagy 25-nek)?',
        options: ['Pontosan 3 darab (1, p és p²)', '2 darab', '4 darab', 'Attól függ, melyik prím'],
        correctAnswer: 'Pontosan 3 darab (1, p és p²)',
        explanation: 'Egy prím négyzete p² = p². A kitevő 2, így az osztók száma (2 + 1) = 3 darab: az 1, a p és a p² (pl. 9 osztói: 1, 3, 9; 25 osztói: 1, 5, 25).',
        breakdown: [
          { label: 'p²', value: 'Kitevő = 2' },
          { label: 'Képlet', value: '2 + 1 = 3 darab osztó' },
          { label: 'Példák', value: '4 osztói: 1, 2, 4; 9 osztói: 1, 3, 9; 49 osztói: 1, 7, 49' }
        ],
        hint: 'Gondolj a 9-re: mik az osztói? 1, 3, 9.'
      },
      {
        id: 'q3-9',
        title: 'A 216 kanonikus alakja',
        question: 'Mi a 216 kanonikus felbontása?',
        options: ['2³ · 3³', '6³', '2⁴ · 3²', '2² · 3⁴'],
        correctAnswer: '2³ · 3³',
        explanation: '216 = 6³ = (2 · 3)³ = 2³ · 3³. Ellenőrzés: 2³ = 8, 3³ = 27, 8 · 27 = 216.',
        breakdown: [
          { label: '216 = 6³', value: '6 = 2 · 3' },
          { label: '(2 · 3)³', value: '2³ · 3³' },
          { label: 'Ellenőrzés', value: '8 · 27 = 216' }
        ],
        hint: '216 = 6³, és bontsd a 6-ot 2 · 3-ra!'
      },
      {
        id: 'q3-10',
        title: 'Osztó ellenőrzése prímfelbontásból',
        question: 'Osztható-e a 360 a 24-gyel a prímtényezős felbontásuk alapján? (360 = 2³ · 3² · 5, 24 = 2³ · 3)',
        options: [
          'IGEN, mert a 24 minden prímtényezője szerepel a 360-ban legalább akkora kitevőn',
          'NEM, mert a 24-ben nincs 5-ös',
          'NEM, mert 360 nem páros többszöröse 24-nek',
          'Csak akkor, ha levonjuk a különbséget'
        ],
        correctAnswer: 'IGEN, mert a 24 minden prímtényezője szerepel a 360-ban legalább akkora kitevőn',
        explanation: 'Egy a szám pontosan akkor osztója b-nek, ha a prímtényezői b-ben legalább akkora kitevővel szerepelnek. 24-ben: 2³ és 3¹. 360-ban: 2³ és 3² (nagyobb!) és 5¹. Tehát 360 : 24 = 15, osztható!',
        breakdown: [
          { label: '2-es kitevője', value: '24-ben 3, 360-ban 3 (3 ≤ 3 ✓)' },
          { label: '3-as kitevője', value: '24-ben 1, 360-ban 2 (1 ≤ 2 ✓)' },
          { label: 'Hányados', value: '360 : 24 = 15 (3¹ · 5)' }
        ],
        hint: 'Hasonlítsd össze a prímkitevőket a két számban!'
      }
    ]
  }
};

export const PrimeFactorizationQuiz: React.FC<PrimeFactorizationQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      grade={7}
      chapterId="g7-powers-divisibility"
      topicId="g7-powers-prime-factors"
      topicTitle="5. A prímszámok. A számok prímtényezős felbontása"
      subtopicId="a-primszamok-a-szamok-primtenyezos-felbontasa"
      documentId="grade-7-prime-factors-quiz"
      emoji="🧱"
      topicBadge="7. Osztály • Matematika IV. Témakör"
      badgeText="7. Osztály • Matematika IV. Témakör"
      category="Számelmélet"
      title="5. A prímszámok. A számok prímtényezős felbontása – Kvíz"
      subtitle="Mérd fel tudásod a prímszámokról, az összetett számokról, Eratoszthenész szitájáról és a számok kanonikus alakjáról 30 gondosan kidolgozott feladaton!"
      cheatSheetTitle="Prímszám Kisokos és Szabálytár"
      cheatSheetCards={cheatSheetCards}
      levels={quizLevels}
      matcherComponent={<PrimeFactorizationMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<PrimeFactorizationSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      themeColor="emerald"
      hintText="💡 Keresd meg a szám legkisebb prímosztóját, és emlékezz: a 2 az egyetlen páros prím, az 1 pedig se nem prím, se nem összetett!"
    />
  );
};

export default PrimeFactorizationQuiz;

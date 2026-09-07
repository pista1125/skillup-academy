import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/ProgressBar';
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Trophy,
  Sparkles,
  CheckCircle2,
  XCircle,
  BookOpen,
  Zap,
  ChevronRight,
  Layers,
  LayoutGrid,
  FileQuestion,
  Flame,
  Maximize2,
  Minimize2,
  ArrowRightLeft,
  Calculator
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MultiplicationMatcher } from './MultiplicationMatcher';
import { MultiplicationSorter } from './MultiplicationSorter';

export type DifficultyLevel = 1 | 2 | 3;
export type GameMode = 'quiz' | 'matcher' | 'sorter';

export interface QuizQuestion {
  id: string;
  prompt: string;
  highlightValue: string;
  questionTypeBadge: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  breakdown?: { label: string; value: string }[];
}

interface LevelConfig {
  level: DifficultyLevel;
  title: string;
  subtitle: string;
  range: string;
  focus: string;
  color: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  accentGradient: string;
  iconBg: string;
  questions: QuizQuestion[];
}

const MULTIPLICATION_CHEAT_SHEET = [
  { topic: 'Fogalmak', formula: 'tényező · tényező = szorzat', note: 'A szorzásban részt vevő számok a tényezők, az eredmény a szorzat.' },
  { topic: '0 és 1 szerepe', formula: 'a · 0 = 0,  a · 1 = a', note: '0-val szorozva az eredmény mindig 0 (elnyeli); 1-gyel szorozva a szám nem változik.' },
  { topic: 'Felcserélhetőség', formula: 'a · b = b · a', note: 'A tényezők sorrendje felcserélhető (pl. 4 · 25 = 25 · 4 = 100).' },
  { topic: 'Csoportosíthatóság', formula: '(a · b) · c = a · (b · c)', note: 'A tényezők tetszőlegesen csoportosíthatók a kényelmes számoláshoz.' },
  { topic: 'Szétbontás (Összeg)', formula: '(a + b) · c = a·c + b·c', note: 'Összeg szorzásakor a tagokat külön-külön megszorozzuk (pl. 47 · 6 = 240 + 42 = 282).' },
  { topic: 'Szétbontás (Különbség)', formula: '(a - b) · c = a·c - b·c', note: 'Különbség szorzásakor a tagokat megszorozzuk és kivonjuk (pl. 99 · 7 = 700 - 7 = 693).' },
  { topic: '10, 100, 1000 szorzása', formula: 'Nullák hozzáírása', note: 'A szám végére annyi nullát írunk, ahány nulla a szorzóban van.' },
  { topic: 'Írásbeli eltolás', formula: 'Tízeseknél 1 hellyel balra', note: 'Kétjegyű szorzónál a részletszorzatokat a megfelelő helyiérték alá írjuk, majd összeadjuk.' }
];

const QUIZ_LEVELS: Record<DifficultyLevel, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Könnyű szint',
    subtitle: 'Fejszámolás, szorzótábla, tulajdonságok és egyszerű szorzás 1–1 000 között',
    range: '1 – 1 000',
    focus: 'Tényezők és szorzat, 0 és 1 szerepe, 10-zel/100-zal szorzás, szétbontás',
    color: 'amber',
    badgeBg: 'bg-amber-50 dark:bg-amber-950/40',
    badgeBorder: 'border-amber-200 dark:border-amber-800',
    badgeText: 'text-amber-700 dark:text-amber-300',
    accentGradient: 'from-amber-500 to-orange-600',
    iconBg: 'bg-amber-500 text-white',
    questions: [
      {
        id: 'q1-1',
        prompt: 'Hogyan nevezzük a szorzás műveletében részt vevő számokat és az eredményt?',
        highlightValue: 'a · b = c',
        questionTypeBadge: 'Alapfogalmak',
        options: ['Tényezők és szorzat', 'Tagok és összeg', 'Kisebbítendő, kivonandó, különbség', 'Osztandó, osztó, hányados'],
        correctAnswer: 'Tényezők és szorzat',
        explanation: 'A szorzásban részt vevő számok a tényezők (szorzandó és szorzó), az eredmény pedig a szorzat.',
        breakdown: [
          { label: 'Tagok', value: 'Tényezők' },
          { label: 'Eredmény', value: 'Szorzat' }
        ]
      },
      {
        id: 'q1-2',
        prompt: 'Mennyi a 40 · 20 művelet szorzata?',
        highlightValue: '40 · 20 = ?',
        questionTypeBadge: 'Fejszámolás',
        options: ['800', '80', '8 000', '600'],
        correctAnswer: '800',
        explanation: '4 · 2 = 8, és a két szám végén lévő 2 darab 0-t hozzáírjuk: 800.',
        breakdown: [
          { label: '4 · 2', value: '8' },
          { label: 'Nullák (2 db)', value: '800' }
        ]
      },
      {
        id: 'q1-3',
        prompt: 'Mi történik, ha egy tetszőleges számot 0-val szorzunk meg (a · 0)?',
        highlightValue: 'a · 0 = ?',
        questionTypeBadge: 'A 0 tulajdonsága',
        options: ['Az eredmény mindig 0', 'A szám változatlan marad (a)', 'Az eredmény 1 lesz', 'A szám a duplájára nő'],
        correctAnswer: 'Az eredmény mindig 0',
        explanation: 'Bármely természetes számot 0-val megszorozva a szorzat mindig 0 (a nulla elnyelő tulajdonságú a szorzásban).',
        breakdown: [
          { label: 'Szabály', value: 'a · 0 = 0' }
        ]
      },
      {
        id: 'q1-4',
        prompt: 'Melyik matematikai tulajdonságot fejezi ki a 25 · 4 = 4 · 25 egyenlőség?',
        highlightValue: '25 · 4 = 4 · 25',
        questionTypeBadge: 'Tulajdonságok',
        options: ['Felcserélhetőség (kommutativitás)', 'Csoportosíthatóság (asszociativitás)', 'Kiemelés', 'Nulla semlegessége'],
        correctAnswer: 'Felcserélhetőség (kommutativitás)',
        explanation: 'A szorzás tényezői felcserélhetők, a szorzat értéke nem változik (a · b = b · a).',
        breakdown: [
          { label: 'Szabály', value: 'a · b = b · a' }
        ]
      },
      {
        id: 'q1-5',
        prompt: 'Mennyi a 148 · 4 írásbeli szorzás pontos eredménye?',
        highlightValue: '148 · 4 = ?',
        questionTypeBadge: 'Egyjegyű szorzás',
        options: ['592', '582', '562', '492'],
        correctAnswer: '592',
        explanation: 'Egyesek: 4 · 8 = 32 (leírom a 2-t, maradt 3). Tízesek: 4 · 4 + 3 = 19 (leírom a 9-et, maradt 1). Százasok: 4 · 1 + 1 = 5 ➔ 592.',
        breakdown: [
          { label: 'Egyesek', value: '4 · 8 = 32 (2, m=3)' },
          { label: 'Tízesek', value: '4 · 4 + 3 = 19 (9, m=1)' },
          { label: 'Százasok', value: '4 · 1 + 1 = 5' },
          { label: 'Szorzat', value: '592' }
        ]
      },
      {
        id: 'q1-6',
        prompt: 'Mennyi a 37 · 100 szorzás értéke?',
        highlightValue: '37 · 100 = ?',
        questionTypeBadge: '100-zal szorzás',
        options: ['3 700', '370', '37 000', '307'],
        correctAnswer: '3 700',
        explanation: '100-zal szorozva a szám végére két nullát írunk: 3 700.',
        breakdown: [
          { label: 'Szabály', value: '+ 2 db nulla a végére' },
          { label: 'Szorzat', value: '3 700' }
        ]
      },
      {
        id: 'q1-7',
        prompt: 'Hogyan számolhatjuk ki fejben leggyorsabban a 64 · 5 szorzatot?',
        highlightValue: '64 · 5 = ?',
        questionTypeBadge: 'Villámtrükk',
        options: ['Megszorozzuk 10-zel (640), majd elfelezzük (320)', 'Összeadunk 64-et 5-ször papíron', 'Hozzáadunk 5-öt 64-szer', 'Kivonunk 5-öt a 640-ből'],
        correctAnswer: 'Megszorozzuk 10-zel (640), majd elfelezzük (320)',
        explanation: '5-tel szorzáskor kényelmes 10-zel szorozni (640) és utána elfelezni: 640 / 2 = 320.',
        breakdown: [
          { label: '64 · 10', value: '640' },
          { label: '640 / 2', value: '320' }
        ]
      },
      {
        id: 'q1-8',
        prompt: 'Mennyi a (30 + 4) · 6 kifejezés értéke a szorzás szétbontásával?',
        highlightValue: '(30 + 4) · 6 = ?',
        questionTypeBadge: 'Disztributivitás',
        options: ['204 (180 + 24)', '184', '214', '194'],
        correctAnswer: '204 (180 + 24)',
        explanation: '30 · 6 = 180, és 4 · 6 = 24. 180 + 24 = 204.',
        breakdown: [
          { label: '30 · 6', value: '180' },
          { label: '4 · 6', value: '24' },
          { label: 'Összeg', value: '204' }
        ]
      },
      {
        id: 'q1-9',
        prompt: 'Melyik szám hiányzik a négyzet helyéről: 🔲 · 6 = 420?',
        highlightValue: '🔲 · 6 = 420',
        questionTypeBadge: 'Hiányos művelet',
        options: ['70', '60', '80', '700'],
        correctAnswer: '70',
        explanation: 'A hiányzó tényező kiszámítása: Szorzat / Ismert tényező = 420 / 6 = 70.',
        breakdown: [
          { label: 'Számolás', value: '420 / 6 = 70' }
        ]
      },
      {
        id: 'q1-10',
        prompt: 'Egy boltba 8 doboz csokoládé érkezett, és mindegyik dobozban 25 darab csoki van. Hány darab csoki érkezett összesen?',
        highlightValue: '8 · 25 = ?',
        questionTypeBadge: 'Szöveges feladat',
        options: ['200 db', '180 db', '250 db', '220 db'],
        correctAnswer: '200 db',
        explanation: '8 · 25 = 200 darab csokoládé.',
        breakdown: [
          { label: 'Művelet', value: '8 · 25 = 200' }
        ]
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Közepes szint',
    subtitle: 'Kétjegyű írásbeli szorzás, disztributivitás és szöveges feladatok 1 000–100 000 között',
    range: '1 000 – 100 000',
    focus: 'Kétjegyű szorzó, részletszorzatok eltolása, nullás szorzók, becslés',
    color: 'amber',
    badgeBg: 'bg-amber-50 dark:bg-amber-950/40',
    badgeBorder: 'border-amber-200 dark:border-amber-800',
    badgeText: 'text-amber-700 dark:text-amber-300',
    accentGradient: 'from-amber-500 to-orange-600',
    iconBg: 'bg-amber-500 text-white',
    questions: [
      {
        id: 'q2-1',
        prompt: 'Mennyi a 348 · 26 írásbeli szorzás pontos eredménye?',
        highlightValue: '348 · 26 = ?',
        questionTypeBadge: 'Kétjegyű szorzás',
        options: ['9 048', '8 948', '9 148', '8 048'],
        correctAnswer: '9 048',
        explanation: 'Tízesekkel szorozva: 348 · 20 = 6 960. Egyesekkel: 348 · 6 = 2 088. Összeadva: 6 960 + 2 088 = 9 048.',
        breakdown: [
          { label: '348 · 20', value: '6 960' },
          { label: '348 · 6', value: '2 088' },
          { label: 'Összeg', value: '9 048' }
        ]
      },
      {
        id: 'q2-2',
        prompt: 'Mennyi a 450 · 200 művelet szorzata?',
        highlightValue: '450 · 200 = ?',
        questionTypeBadge: 'Nullás szorzás',
        options: ['90 000', '9 000', '900 000', '45 000'],
        correctAnswer: '90 000',
        explanation: '45 · 2 = 90, és a három darab záró nullát hozzáírjuk: 90 000.',
        breakdown: [
          { label: '45 · 2', value: '90' },
          { label: 'Nullák (3 db)', value: '90 000' }
        ]
      },
      {
        id: 'q2-3',
        prompt: 'Hogyan számolhatjuk ki fejben leggyorsabban a 48 · 25 szorzatot?',
        highlightValue: '48 · 25 = ?',
        questionTypeBadge: 'Villámtrükk',
        options: ['Megszorozzuk 100-zal (4 800), majd elosztjuk 4-gyel (1 200)', 'Hozzáadunk 25-öt 48-szor', 'Megszorozzuk 2-vel és 5-tel', 'Kivonunk 25-öt a 4 800-ból'],
        correctAnswer: 'Megszorozzuk 100-zal (4 800), majd elosztjuk 4-gyel (1 200)',
        explanation: 'Mivel 25 = 100 / 4, ezért 48 · 25 = (48 · 100) / 4 = 4 800 / 4 = 1 200.',
        breakdown: [
          { label: '48 · 100', value: '4 800' },
          { label: '4 800 / 4', value: '1 200' }
        ]
      },
      {
        id: 'q2-4',
        prompt: 'Becsüld meg a szorzatot a legmagasabb helyiértékekre kerekítve: 589 · 32 ≈ ?',
        highlightValue: '589 · 32 ≈ ?',
        questionTypeBadge: 'Előzetes becslés',
        options: ['18 000 (600 · 30)', '15 000 (500 · 30)', '24 000 (600 · 40)', '20 000'],
        correctAnswer: '18 000 (600 · 30)',
        explanation: '589 kerekítve 600, a 32 kerekítve 30. Becslés: 600 · 30 = 18 000 (a pontos érték 18 848).',
        breakdown: [
          { label: '589 ≈', value: '600' },
          { label: '32 ≈', value: '30' },
          { label: 'Becsült szorzat', value: '18 000' }
        ]
      },
      {
        id: 'q2-5',
        prompt: 'Mennyi a (4 · 19) · 25 kifejezés értéke a legegyszerűbben csoportosítva?',
        highlightValue: '(4 · 19) · 25 = ?',
        questionTypeBadge: 'Csoportosíthatóság',
        options: ['1 900 (100 · 19)', '1 800', '1 950', '2 000'],
        correctAnswer: '1 900 (100 · 19)',
        explanation: '(4 · 25) · 19 = 100 · 19 = 1 900.',
        breakdown: [
          { label: '4 · 25', value: '100' },
          { label: '100 · 19', value: '1 900' }
        ]
      },
      {
        id: 'q2-6',
        prompt: 'Miért toljuk el a tízesekkel végzett szorzás részletszorzatát egy hellyel balra az írásbeli szorzásban?',
        highlightValue: 'Helyiérték-eltolás',
        questionTypeBadge: 'Írásbeli szabály',
        options: ['Mert valódi értékében 10-szer annyit ér (tízesekkel szorzunk)', 'Csak díszítés miatt', 'Mert így kevesebb helyet foglal', 'A maradékok miatt'],
        correctAnswer: 'Mert valódi értékében 10-szer annyit ér (tízesekkel szorzunk)',
        explanation: 'A szorzó tízes helyiértékén álló számmal szorozva a kapott érték valódi értéke 10-szeres, ezért az utolsó számjegyét a tízesek alá írjuk.',
        breakdown: [
          { label: 'Ok', value: 'Tízesek valódi értéke (· 10)' }
        ]
      },
      {
        id: 'q2-7',
        prompt: 'Egy iskolai könyvtárba 125 darab új szótárat rendeltek, melyek darabára 360 Ft. Mennyibe került a rendelés összesen?',
        highlightValue: '125 · 360 = ?',
        questionTypeBadge: 'Szöveges feladat',
        options: ['45 000 Ft', '42 000 Ft', '48 000 Ft', '50 000 Ft'],
        correctAnswer: '45 000 Ft',
        explanation: '125 · 360 = 125 · 36 · 10 = 4 500 · 10 = 45 000 Ft.',
        breakdown: [
          { label: 'Számolás', value: '125 · 360 = 45 000 Ft' }
        ]
      },
      {
        id: 'q2-8',
        prompt: 'Melyik számjegy hiányzik a szorzandóból? 2 _ 5 · 4 = 980',
        highlightValue: '2 [A] 5 · 4 = 980',
        questionTypeBadge: 'Hiányzó számjegy',
        options: ['A = 4', 'A = 3', 'A = 5', 'A = 2'],
        correctAnswer: 'A = 4',
        explanation: '980 / 4 = 245, tehát a hiányzó számjegy a 4.',
        breakdown: [
          { label: '980 / 4', value: '245' },
          { label: 'A értéke', value: '4' }
        ]
      },
      {
        id: 'q2-9',
        prompt: 'Ha a szorzás egyik tényezőjét a 4-szeresére növeljük, a másikat változatlanul hagyjuk, hogyan változik a szorzat?',
        highlightValue: 'Szorzat változása',
        questionTypeBadge: 'Műveleti összefüggés',
        options: ['A szorzat is a 4-szeresére nő', 'A szorzat 4-gyel nő', 'A szorzat nem változik', 'A szorzat a negyedére csökken'],
        correctAnswer: 'A szorzat is a 4-szeresére nő',
        explanation: 'Ha az egyik tényezőt k-szorosára növeljük, a szorzat is pontosan k-szorosára nő.',
        breakdown: [
          { label: 'Szabály', value: '(a · k) · b = (a · b) · k' }
        ]
      },
      {
        id: 'q2-10',
        prompt: 'Mennyi a 99 · 45 szorzat értéke fejben a 99 = 100 - 1 szétbontással?',
        highlightValue: '(100 - 1) · 45 = ?',
        questionTypeBadge: 'Disztributivitás',
        options: ['4 455 (4 500 - 45)', '4 445', '4 555', '4 355'],
        correctAnswer: '4 455 (4 500 - 45)',
        explanation: '100 · 45 = 4 500. Ebből kivonva 1 · 45-öt: 4 500 - 45 = 4 455.',
        breakdown: [
          { label: '100 · 45', value: '4 500' },
          { label: '4 500 - 45', value: '4 455' }
        ]
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Nehéz szint',
    subtitle: 'Háromjegyű szorzó, nagy számok (100 000 – 10 000 000), hibakeresés és összetett feladványok',
    range: '100 000 – 10 000 000',
    focus: 'Milliós szorzás, több részletszorzat, láncolt átlépések, logikai szöveges feladatok',
    color: 'amber',
    badgeBg: 'bg-amber-50 dark:bg-amber-950/40',
    badgeBorder: 'border-amber-200 dark:border-amber-800',
    badgeText: 'text-amber-700 dark:text-amber-300',
    accentGradient: 'from-amber-500 to-orange-600',
    iconBg: 'bg-amber-500 text-white',
    questions: [
      {
        id: 'q3-1',
        prompt: 'Mennyi az 1 245 · 123 háromjegyű írásbeli szorzás pontos szorzata?',
        highlightValue: '1 245 · 123 = ?',
        questionTypeBadge: 'Háromjegyű szorzó',
        options: ['153 135', '152 135', '153 235', '143 135'],
        correctAnswer: '153 135',
        explanation: '1 245 · 100 = 124 500, 1 245 · 20 = 24 900, 1 245 · 3 = 3 735. Összeadva: 124 500 + 24 900 + 3 735 = 153 135.',
        breakdown: [
          { label: 'Százasok', value: '124 500' },
          { label: 'Tízesek', value: '24 900' },
          { label: 'Egyesek', value: '3 735' },
          { label: 'Összeg', value: '153 135' }
        ]
      },
      {
        id: 'q3-2',
        prompt: 'Mennyi a 4 500 · 2 000 művelet szorzata?',
        highlightValue: '4 500 · 2 000 = ?',
        questionTypeBadge: 'Milliós szorzás',
        options: ['9 000 000', '900 000', '90 000 000', '8 500 000'],
        correctAnswer: '9 000 000',
        explanation: '45 · 2 = 90, és a két szám végén lévő összesen 5 darab nullát hozzáírjuk: 9 000 000 (9 millió).',
        breakdown: [
          { label: '45 · 2', value: '90' },
          { label: 'Nullák (5 db)', value: '9 000 000' }
        ]
      },
      {
        id: 'q3-3',
        prompt: 'Egy raktárban 450 raklap van. Minden raklapon 24 rekesz üdítő áll, és minden rekeszben 12 üveg található. Hány üveg üdítő van összesen?',
        highlightValue: '450 · 24 · 12 = ?',
        questionTypeBadge: 'Összetett szöveges',
        options: ['129 600 üveg', '128 400 üveg', '130 000 üveg', '119 600 üveg'],
        correctAnswer: '129 600 üveg',
        explanation: '450 · 24 = 10 800 rekesz. 10 800 · 12 = 129 600 üveg.',
        breakdown: [
          { label: '450 · 24', value: '10 800 rekesz' },
          { label: '10 800 · 12', value: '129 600 üveg' }
        ]
      },
      {
        id: 'q3-4',
        prompt: 'Két szám szorzata 500. Ha az egyik számot a 4-szeresére növeljük, a másikat pedig a negyedére (4-ed részére) csökkentjük, mennyi lesz az új szorzat?',
        highlightValue: 'Szorzat állandósága',
        questionTypeBadge: 'Logikai feladvány',
        options: ['500 (változatlan)', '2 000', '125', '1 000'],
        correctAnswer: '500 (változatlan)',
        explanation: 'Ha az egyik tényezőt k-szorosára növeljük, a másikat k-ad részére osztjuk, a szorzat értéke NEM változik: 500 · 4 / 4 = 500.',
        breakdown: [
          { label: 'Változás', value: '· 4 majd : 4 ➔ 1' },
          { label: 'Új szorzat', value: '500' }
        ]
      },
      {
        id: 'q3-5',
        prompt: 'Hol a hiba a következő számolásban? 125 · 24 = 500 + 250 = 750',
        highlightValue: '125 · 24 = 750 (?)',
        questionTypeBadge: 'Hibakeresés',
        options: ['Elfelejtették a 2-essel való szorzásnál az 1 hellyel balra való eltolást (a helyes összeg: 500 + 2 500 = 3 000)', 'Rosszul szorozták meg 4-gyel', 'Nincs benne hiba', 'Az összeadás hibás'],
        correctAnswer: 'Elfelejtették a 2-essel való szorzásnál az 1 hellyel balra való eltolást (a helyes összeg: 500 + 2 500 = 3 000)',
        explanation: 'A szorzó tízes számjegyével (2) szorozva 125 · 20 = 2 500. A helyes szorzat: 500 + 2 500 = 3 000.',
        breakdown: [
          { label: 'Helyes szorzat', value: '125 · 24 = 3 000' }
        ]
      },
      {
        id: 'q3-6',
        prompt: 'Melyik számjegyek hiányoznak? 3 [A] 8 · 1 [B] = ... ha 348 · 15 = 5 220?',
        highlightValue: '3 [A] 8 · 1 [B] = 5 220',
        questionTypeBadge: 'Két hiányzó számjegy',
        options: ['A = 4, B = 5', 'A = 5, B = 4', 'A = 3, B = 5', 'A = 4, B = 6'],
        correctAnswer: 'A = 4, B = 5',
        explanation: '5 220 / 348 = 15, tehát A = 4 és B = 5.',
        breakdown: [
          { label: 'A', value: '4 (348)' },
          { label: 'B', value: '5 (15)' }
        ]
      },
      {
        id: 'q3-7',
        prompt: 'Ha (a + b) · c = 1 200, és tudjuk, hogy a · c = 800, mennyi a b · c értéke?',
        highlightValue: '(a + b) · c = a·c + b·c',
        questionTypeBadge: 'Algebrai gondolkodás',
        options: ['400 (1 200 - 800)', '800', '600', '2 000'],
        correctAnswer: '400 (1 200 - 800)',
        explanation: 'A disztributivitás miatt a · c + b · c = 1 200. Mivel a · c = 800, ezért b · c = 1 200 - 800 = 400.',
        breakdown: [
          { label: 'a · c + b · c', value: '1 200' },
          { label: 'b · c', value: '1 200 - 800 = 400' }
        ]
      },
      {
        id: 'q3-8',
        prompt: 'Egy szállítmányozó cég 150 konténert szállít, amelyek mindegyike 2 400 kg tömegű. Hány tonna a teljes rakomány?',
        highlightValue: '150 · 2 400 kg = ? tonna',
        questionTypeBadge: 'Mértékegység & szorzás',
        options: ['360 tonna (360 000 kg)', '36 tonna', '3 600 tonna', '300 tonna'],
        correctAnswer: '360 tonna (360 000 kg)',
        explanation: '150 · 2 400 = 360 000 kg. Mivel 1 tonna = 1 000 kg, ezért 360 000 / 1 000 = 360 tonna.',
        breakdown: [
          { label: 'Kilogrammban', value: '360 000 kg' },
          { label: 'Tonnában', value: '360 t' }
        ]
      },
      {
        id: 'q3-9',
        prompt: 'Mennyi a 45 · 999 szorzat értéke fejben a 999 = 1 000 - 1 trükkel?',
        highlightValue: '45 · (1 000 - 1) = ?',
        questionTypeBadge: 'Disztributivitás trükk',
        options: ['44 955 (45 000 - 45)', '44 945', '45 955', '43 955'],
        correctAnswer: '44 955 (45 000 - 45)',
        explanation: '45 · 1 000 = 45 000. Ebből levonva 45-öt: 45 000 - 45 = 44 955.',
        breakdown: [
          { label: '45 · 1 000', value: '45 000' },
          { label: '45 000 - 45', value: '44 955' }
        ]
      },
      {
        id: 'q3-10',
        prompt: 'Mennyi az 500 000 · 20 művelet pontos értéke?',
        highlightValue: '500 000 · 20 = ?',
        questionTypeBadge: 'Tízmilliós szorzat',
        options: ['10 000 000 (10 millió)', '1 000 000 (1 millió)', '100 000 000', '5 000 000'],
        correctAnswer: '10 000 000 (10 millió)',
        explanation: '5 · 2 = 10, és az 5 + 1 = 6 darab nullát hozzáírva: 10 000 000.',
        breakdown: [
          { label: '5 · 2', value: '10' },
          { label: 'Nullák', value: '10 000 000' }
        ]
      }
    ]
  }
};

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

interface MultiplicationQuizProps {
  onBack: () => void;
}

export function MultiplicationQuiz({ onBack }: MultiplicationQuizProps) {
  const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel | null>(null);
  const [gameMode, setGameMode] = useState<GameMode>('quiz');
  const [showCheatSheet, setShowCheatSheet] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Active Quiz State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleStartLevel = (level: DifficultyLevel, mode: GameMode = gameMode) => {
    setSelectedLevel(level);
    setGameMode(mode);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setIsCompleted(false);

    // Prepare questions with shuffled options
    const levelQuestions = QUIZ_LEVELS[level].questions.map((q) => ({
      ...q,
      options: shuffleArray(q.options)
    }));
    setQuestions(levelQuestions);
  };

  const handleOptionSelect = (option: string) => {
    if (isAnswerChecked) return;
    setSelectedOption(option);
    setIsAnswerChecked(true);

    const currentQ = questions[currentIndex];
    if (option === currentQ.correctAnswer) {
      setScore((prev) => prev + 1);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);
    } else {
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    } else {
      setIsCompleted(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  // Keyboard shortcut listener [1, 2, 3, 4]
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedLevel === null || gameMode !== 'quiz' || isCompleted) return;

      const currentQ = questions[currentIndex];
      if (!currentQ) return;

      if (!isAnswerChecked) {
        if (['1', '2', '3', '4'].includes(e.key)) {
          const optIdx = parseInt(e.key, 10) - 1;
          if (currentQ.options[optIdx]) {
            handleOptionSelect(currentQ.options[optIdx]);
          }
        }
      } else {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleNextQuestion();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedLevel, gameMode, currentIndex, isAnswerChecked, isCompleted, questions]);

  // 1. Initial Difficulty Level Selection Screen
  if (selectedLevel === null) {
    return (
      <div
        ref={containerRef}
        className={cn(
          "w-full px-2 sm:px-4 py-3 animate-in fade-in duration-300 text-left",
          isFullscreen && "fixed inset-0 z-50 max-w-none w-screen h-screen bg-slate-100 dark:bg-slate-950 p-4 sm:p-6 overflow-y-auto"
        )}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Vissza a témakörökhöz
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFullscreen}
              className="h-8 rounded-xl px-2.5 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs hover:bg-slate-100 dark:hover:bg-slate-800"
              title={isFullscreen ? 'Kilépés a teljes képernyőből' : 'Teljes képernyős mód'}
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5 mr-1 text-amber-600 dark:text-amber-400" />
                  <span className="hidden sm:inline">Kilépés</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5 mr-1 text-slate-500" />
                  <span className="hidden sm:inline">Teljes képernyő</span>
                </>
              )}
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowCheatSheet(!showCheatSheet)}
              className="h-8 rounded-xl px-2.5 border-amber-300 bg-amber-50/50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800 hover:bg-amber-100 text-xs font-bold"
            >
              <BookOpen className="w-3.5 h-3.5 mr-1 text-amber-600" />
              Szabályzat
            </Button>
          </div>
        </div>

        {/* Hero Header */}
        <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-5">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center justify-center gap-2 mb-1">
            <span className="text-2xl">✖️</span>
            <span>Szorzás, írásbeli szorzás Kvíz</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Gyakorold a fejszámolást, a disztributivitást és a többjegyű írásbeli szorzást részletszorzatokkal!
          </p>

          {/* Quick Mode Switcher in selection */}
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl mt-3 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setGameMode('quiz')}
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all",
                gameMode === 'quiz'
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              )}
            >
              <FileQuestion className="w-3.5 h-3.5 text-amber-500" />
              Klasszikus Kvíz
            </button>
            <button
              onClick={() => setGameMode('matcher')}
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all",
                gameMode === 'matcher'
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              )}
            >
              <LayoutGrid className="w-3.5 h-3.5 text-emerald-500" />
              Kártyás Párosító
            </button>
            <button
              onClick={() => setGameMode('sorter')}
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all",
                gameMode === 'sorter'
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              )}
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-indigo-500" />
              Csoportosító (Húzd a helyére)
            </button>
          </div>
        </div>

        {/* Cheat sheet popover/card */}
        {showCheatSheet && (
          <div className="mb-4 p-4 sm:p-5 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-900 dark:to-slate-850 rounded-2xl border-2 border-amber-200 dark:border-amber-900/60 shadow-md animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm sm:text-base font-black text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                Szorzás szabályai és összefoglaló
              </h3>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowCheatSheet(false)}
                className="text-amber-800 dark:text-amber-300 hover:bg-amber-200/50 rounded-lg h-7 px-2 text-xs"
              >
                Bezárás
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
              {MULTIPLICATION_CHEAT_SHEET.map((item, idx) => (
                <div key={idx} className="bg-white/95 dark:bg-slate-800/95 p-2.5 rounded-xl border border-amber-100 dark:border-slate-700 shadow-xs text-left">
                  <div className="text-xs font-black text-amber-600 dark:text-amber-400">{item.topic}</div>
                  <div className="text-xs font-mono font-bold text-slate-800 dark:text-slate-100 mt-0.5">{item.formula}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">{item.note}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Difficulty Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {([1, 2, 3] as DifficultyLevel[]).map((level) => {
            const cfg = QUIZ_LEVELS[level];
            return (
              <div
                key={level}
                onClick={() => handleStartLevel(level, gameMode)}
                className="group relative bg-white dark:bg-slate-900 rounded-2xl p-5 border-2 border-slate-200/80 dark:border-slate-800 hover:border-amber-500 dark:hover:border-amber-500 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-inner text-white font-black text-lg", cfg.iconBg)}>
                      {level}
                    </div>

                    <span className={cn("px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider border", cfg.badgeBg, cfg.badgeBorder, cfg.badgeText)}>
                      {gameMode === 'quiz' ? '10 Kérdés' : gameMode === 'matcher' ? '8 Pár' : '10 Elem (3 csoport)'}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 dark:text-white mb-0.5 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {cfg.title}
                  </h3>

                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">
                    {cfg.subtitle}
                  </p>

                  <div className="space-y-1.5 pt-2.5 border-t border-slate-100 dark:border-slate-800 mb-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">Tartomány:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{cfg.range}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">Fókusz:</span>
                      <span className="font-bold text-amber-600 dark:text-amber-400 text-right truncate max-w-[140px]" title={cfg.focus}>{cfg.focus}</span>
                    </div>
                  </div>
                </div>

                <Button
                  className={cn(
                    "w-full h-10 rounded-xl font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-1.5",
                    level === 1
                      ? "bg-amber-600 hover:bg-amber-700 text-white"
                      : level === 2
                      ? "bg-orange-600 hover:bg-orange-700 text-white"
                      : "bg-amber-700 hover:bg-amber-800 text-white"
                  )}
                >
                  {gameMode === 'quiz' ? 'Kvíz Indítása' : gameMode === 'matcher' ? 'Párosító Indítása' : 'Csoportosító Indítása'}
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // 2. Completion Screen
  const levelConfig = QUIZ_LEVELS[selectedLevel];
  const totalQuestions = questions.length || levelConfig.questions.length;

  if (isCompleted) {
    const percentage = Math.round((score / totalQuestions) * 100);
    const isPerfect = score === totalQuestions;
    const isGood = percentage >= 70;

    return (
      <div
        ref={containerRef}
        className={cn(
          "w-full max-w-2xl mx-auto px-4 py-8 animate-in zoom-in-95 duration-300 text-center",
          isFullscreen && "fixed inset-0 z-50 max-w-none w-screen h-screen bg-slate-100 dark:bg-slate-950 p-4 sm:p-6 overflow-y-auto flex items-center justify-center"
        )}
      >
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border-2 border-slate-200/80 dark:border-slate-800 shadow-xl max-w-xl w-full">
          <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-amber-500/30">
            <Trophy className="w-10 h-10" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-1">
            {isPerfect ? 'Tökéletes Eredmény! 🏆' : isGood ? 'Szép Munka! 🌟' : 'Gyakorolj még egy kicsit! 💪'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-5">
            Sikeresen befejezted a <span className="font-bold text-slate-800 dark:text-slate-200">{levelConfig.title}</span> feladatait!
          </p>

          <div className="grid grid-cols-3 gap-3 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 mb-6">
            <div>
              <div className="text-[11px] uppercase font-bold text-slate-400 mb-0.5">Pontszám</div>
              <div className="text-2xl font-black text-amber-600 dark:text-amber-400">{score} / {totalQuestions}</div>
            </div>
            <div className="border-x border-slate-200 dark:border-slate-700">
              <div className="text-[11px] uppercase font-bold text-slate-400 mb-0.5">Eredmény</div>
              <div className="text-2xl font-black text-slate-800 dark:text-slate-100">{percentage}%</div>
            </div>
            <div>
              <div className="text-[11px] uppercase font-bold text-slate-400 mb-0.5">Legjobb széria</div>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1">
                <Zap className="w-4 h-4 fill-current" /> {bestStreak}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5">
            {selectedLevel < 3 && (
              <Button
                onClick={() => handleStartLevel((selectedLevel + 1) as DifficultyLevel, 'quiz')}
                className="flex-1 h-11 rounded-xl text-sm font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-md flex items-center justify-center gap-1.5"
              >
                Következő szint: {selectedLevel + 1}. szint
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            )}

            <Button
              variant="outline"
              onClick={() => handleStartLevel(selectedLevel, 'quiz')}
              className="flex-1 h-11 rounded-xl text-sm font-bold border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <RotateCcw className="w-4 h-4 mr-1 text-slate-500" />
              Újrapróbálom
            </Button>

            <Button
              variant="ghost"
              onClick={() => setSelectedLevel(null)}
              className="h-11 rounded-xl text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Szintek
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // 3. Active View with Right-side Wordwall Sidebar
  const currentQuestion = questions[currentIndex] || levelConfig.questions[currentIndex];

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full px-2 sm:px-4 py-1 animate-in fade-in duration-200 text-left",
        isFullscreen && "fixed inset-0 z-50 max-w-none w-screen h-screen bg-slate-100 dark:bg-slate-950 p-4 sm:p-6 overflow-y-auto"
      )}
    >
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 mb-2.5">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedLevel(null)}
            className="h-8 rounded-xl px-2.5 border border-slate-200/80 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Szint választás
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={toggleFullscreen}
            className="h-8 rounded-xl px-2.5 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs hover:bg-slate-100 dark:hover:bg-slate-800"
            title={isFullscreen ? 'Kilépés a teljes képernyőből' : 'Teljes képernyős mód'}
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-3.5 h-3.5 mr-1 text-amber-600 dark:text-amber-400" />
                <span className="hidden sm:inline">Kilépés</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5 mr-1 text-slate-500" />
                <span className="hidden sm:inline">Teljes képernyő</span>
              </>
            )}
          </Button>
        </div>

        {/* Level pills in header */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
          {([1, 2, 3] as DifficultyLevel[]).map((lvl) => (
            <button
              key={lvl}
              onClick={() => handleStartLevel(lvl, gameMode)}
              className={cn(
                "px-2.5 py-1 rounded-lg text-xs font-black transition-all",
                selectedLevel === lvl
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              )}
            >
              {lvl === 1 ? '1. Könnyű' : lvl === 2 ? '2. Közepes' : '3. Nehéz'}
            </button>
          ))}
        </div>

        {/* Mode / Score indicator */}
        <div className="flex items-center gap-2">
          {gameMode === 'quiz' ? (
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-3 py-1 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs text-xs">
              <div className="flex items-center gap-1 font-black text-amber-600 dark:text-amber-400">
                <Trophy className="w-3.5 h-3.5" />
                <span>{score} pont</span>
              </div>
              {streak > 1 && (
                <>
                  <div className="w-px h-3 bg-slate-200 dark:bg-slate-700" />
                  <div className="flex items-center gap-1 font-black text-emerald-600 dark:text-emerald-400 animate-pulse">
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    <span>{streak}x</span>
                  </div>
                </>
              )}
            </div>
          ) : gameMode === 'matcher' ? (
            <div className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs font-bold">
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Párosító Mód</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-xl border border-indigo-200 dark:border-indigo-800 text-xs font-bold">
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>Csoportosító Mód</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Container with Wordwall Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* LEFT / CENTER: Main Game Area */}
        <div className="lg:col-span-9 flex flex-col gap-3">
          {gameMode === 'quiz' ? (
            /* QUIZ MODE WORKSPACE */
            <div className="space-y-3">
              {/* Slim Progress Bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400 px-1">
                  <span>{levelConfig.title} feladványai</span>
                  <span>{currentIndex + 1} / {levelConfig.questions.length}</span>
                </div>
                <ProgressBar
                  current={currentIndex + 1}
                  total={levelConfig.questions.length}
                  color={selectedLevel === 1 ? 'amber' : selectedLevel === 2 ? 'orange' : 'indigo'}
                />
              </div>

              {/* 2-Column Workspace Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 items-start">
                {/* Left: Question Card + Explanation */}
                <div className="flex flex-col gap-2.5">
                  <Card className="border-2 border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
                    <div className="px-3.5 py-2 bg-slate-50 dark:bg-slate-850 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        {currentIndex + 1}. Kérdés • {currentQuestion.questionTypeBadge}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                        {levelConfig.title}
                      </span>
                    </div>

                    <CardContent className="p-4 sm:p-5 text-center">
                      <p className="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 mb-2.5">
                        {currentQuestion.prompt}
                      </p>

                      <div className="inline-block px-6 py-2.5 bg-gradient-to-br from-amber-50 to-orange-50/60 dark:from-slate-850 dark:to-slate-800 rounded-2xl border-2 border-amber-200/80 dark:border-slate-700 shadow-inner">
                        <span className="text-2xl sm:text-3xl font-mono font-black tracking-wider text-slate-900 dark:text-amber-300">
                          {currentQuestion.highlightValue}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Explanation & Next Step */}
                  {isAnswerChecked && (
                    <div className="space-y-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
                      <div className={cn(
                        "p-3.5 rounded-2xl border-2 shadow-xs text-left",
                        selectedOption === currentQuestion.correctAnswer
                          ? "bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800/80"
                          : "bg-rose-50/90 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800/80"
                      )}>
                        <div className="flex items-start gap-2.5">
                          <div className={cn(
                            "w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5",
                            selectedOption === currentQuestion.correctAnswer
                              ? "bg-emerald-500 text-white"
                              : "bg-rose-500 text-white"
                          )}>
                            {selectedOption === currentQuestion.correctAnswer ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : (
                              <XCircle className="w-4 h-4" />
                            )}
                          </div>

                          <div className="flex-1">
                            <h4 className={cn(
                              "text-xs sm:text-sm font-black mb-0.5",
                              selectedOption === currentQuestion.correctAnswer
                                ? "text-emerald-900 dark:text-emerald-200"
                                : "text-rose-900 dark:text-rose-200"
                            )}>
                              {selectedOption === currentQuestion.correctAnswer ? 'Helyes Válasz! 🎉' : 'Nem jó válasz! 🤔'}
                            </h4>
                            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium mb-1.5">
                              {currentQuestion.explanation}
                            </p>

                            {currentQuestion.breakdown && (
                              <div className="flex flex-wrap items-center gap-1.5 pt-1.5 border-t border-slate-200/60 dark:border-slate-700/60">
                                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Levezetés:</span>
                                {currentQuestion.breakdown.map((item, bIdx) => (
                                  <span
                                    key={bIdx}
                                    className="text-[10px] bg-white/80 dark:bg-slate-900/80 px-2 py-0.5 rounded-md font-mono border border-slate-200/80 dark:border-slate-700 font-bold"
                                  >
                                    <span className="text-slate-400 mr-1">{item.label}:</span>
                                    <span className="text-slate-800 dark:text-slate-200">{item.value}</span>
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={handleNextQuestion}
                        className="w-full h-11 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-1.5 animate-pulse"
                      >
                        {currentIndex < questions.length - 1 ? (
                          <>
                            <span>Következő kérdés</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        ) : (
                          <>
                            <span>Eredmények megtekintése</span>
                            <Trophy className="w-4 h-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>

                {/* Right: Options Grid */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Válassz megoldást:</span>
                    <span className="text-[10px] text-slate-400 italic">Gyorsbillentyűk: [1, 2, 3, 4]</span>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    {currentQuestion.options.map((option, idx) => {
                      const isSelected = selectedOption === option;
                      const isCorrect = option === currentQuestion.correctAnswer;

                      return (
                        <button
                          key={idx}
                          onClick={() => handleOptionSelect(option)}
                          disabled={isAnswerChecked}
                          className={cn(
                            "w-full p-3.5 rounded-2xl border-2 text-left font-mono text-xs sm:text-sm font-bold transition-all flex items-center justify-between select-none shadow-xs group",
                            !isAnswerChecked && [
                              "bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800",
                              "hover:border-amber-400 dark:hover:border-amber-500 hover:bg-amber-50/40 dark:hover:bg-amber-950/30",
                              "active:scale-[0.99]"
                            ],
                            isAnswerChecked && isCorrect && [
                              "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-100 ring-2 ring-emerald-500/20"
                            ],
                            isAnswerChecked && isSelected && !isCorrect && [
                              "bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-900 dark:text-rose-100"
                            ],
                            isAnswerChecked && !isSelected && !isCorrect && [
                              "opacity-40 bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                            ]
                          )}
                        >
                          <span className="flex items-center gap-2.5">
                            <span className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-sans font-bold flex items-center justify-center border border-slate-200 dark:border-slate-700 shrink-0">
                              {idx + 1}
                            </span>
                            <span className="font-bold leading-snug">{option}</span>
                          </span>

                          {isAnswerChecked && isCorrect && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 animate-in zoom-in shrink-0 ml-2" />
                          )}
                          {isAnswerChecked && isSelected && !isCorrect && (
                            <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 animate-in zoom-in shrink-0 ml-2" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {!isAnswerChecked && (
                    <div className="p-2.5 bg-amber-50/60 dark:bg-slate-850/80 rounded-xl border border-amber-200/50 dark:border-slate-800 text-[11px] text-amber-900 dark:text-amber-300 flex items-center gap-1.5 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>Tipp: Figyeld a helyiértékeket és a részletszorzatok eltolását!</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : gameMode === 'matcher' ? (
            /* MATCHER MODE WORKSPACE */
            <MultiplicationMatcher
              level={selectedLevel}
              onNextLevel={
                selectedLevel < 3
                  ? () => handleStartLevel((selectedLevel + 1) as DifficultyLevel, 'matcher')
                  : undefined
              }
              onOpenRules={() => setShowCheatSheet(true)}
            />
          ) : (
            /* SORTER MODE WORKSPACE */
            <MultiplicationSorter
              level={selectedLevel}
              onNextLevel={
                selectedLevel < 3
                  ? () => handleStartLevel((selectedLevel + 1) as DifficultyLevel, 'sorter')
                  : undefined
              }
              onOpenRules={() => setShowCheatSheet(true)}
            />
          )}
        </div>

        {/* RIGHT: Wordwall-style Activity & Controls Sidebar */}
        <div className="lg:col-span-3 flex flex-col gap-3">
          {/* Wordwall Mode Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border-2 border-slate-200/80 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5 px-1">
              <Layers className="w-3.5 h-3.5 text-amber-500" />
              <span>Sablon / Játékmód</span>
            </div>

            <div className="flex flex-col gap-1.5">
              {/* Quiz Mode Button */}
              <button
                onClick={() => setGameMode('quiz')}
                className={cn(
                  "w-full p-2.5 rounded-xl text-left font-bold text-xs transition-all flex items-center gap-2.5 border-2",
                  gameMode === 'quiz'
                    ? "bg-amber-50 dark:bg-amber-950/50 border-amber-400 text-amber-900 dark:text-amber-200 shadow-xs"
                    : "bg-slate-50/80 dark:bg-slate-800/60 border-transparent hover:border-slate-200 text-slate-600 dark:text-slate-400"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                  gameMode === 'quiz' ? "bg-amber-500 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                )}>
                  <FileQuestion className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-black text-xs">Klasszikus Kvíz</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">10 feladat, 4 opció</div>
                </div>
              </button>

              {/* Matcher Mode Button */}
              <button
                onClick={() => setGameMode('matcher')}
                className={cn(
                  "w-full p-2.5 rounded-xl text-left font-bold text-xs transition-all flex items-center gap-2.5 border-2",
                  gameMode === 'matcher'
                    ? "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-400 text-emerald-900 dark:text-emerald-200 shadow-xs"
                    : "bg-slate-50/80 dark:bg-slate-800/60 border-transparent hover:border-slate-200 text-slate-600 dark:text-slate-400"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                  gameMode === 'matcher' ? "bg-emerald-500 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                )}>
                  <LayoutGrid className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-black text-xs">Kártyanyitogató</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">8 pár megkeresése</div>
                </div>
              </button>

              {/* Sorter Mode Button */}
              <button
                onClick={() => setGameMode('sorter')}
                className={cn(
                  "w-full p-2.5 rounded-xl text-left font-bold text-xs transition-all flex items-center gap-2.5 border-2",
                  gameMode === 'sorter'
                    ? "bg-indigo-50 dark:bg-indigo-950/50 border-indigo-400 text-indigo-900 dark:text-indigo-200 shadow-xs"
                    : "bg-slate-50/80 dark:bg-slate-800/60 border-transparent hover:border-slate-200 text-slate-600 dark:text-slate-400"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                  gameMode === 'sorter' ? "bg-indigo-500 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                )}>
                  <ArrowRightLeft className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-black text-xs">Csoportosító</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">Húzd a helyére (3 csoport)</div>
                </div>
              </button>
            </div>
          </div>

          {/* Quick Level Switcher in Sidebar */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border-2 border-slate-200/80 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 px-1">
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              <span>Nehézségi szint</span>
            </div>

            <div className="flex flex-col gap-1">
              {([1, 2, 3] as DifficultyLevel[]).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => handleStartLevel(lvl, gameMode)}
                  className={cn(
                    "w-full px-3 py-1.5 rounded-xl text-xs font-bold transition-all text-left flex items-center justify-between",
                    selectedLevel === lvl
                      ? "bg-slate-900 text-white dark:bg-amber-600 dark:text-white"
                      : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                  )}
                >
                  <span>{lvl}. {lvl === 1 ? 'Könnyű szint' : lvl === 2 ? 'Közepes szint' : 'Nehéz szint'}</span>
                  {selectedLevel === lvl && <CheckCircle2 className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* Tools & Rules Actions */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border-2 border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col gap-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFullscreen}
              className="w-full h-9 rounded-xl border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold justify-start"
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5 mr-2 text-amber-600" />
                  Kilépés a teljes képernyőből
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5 mr-2 text-amber-600" />
                  Teljes képernyős mód
                </>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCheatSheet(!showCheatSheet)}
              className="w-full h-9 rounded-xl border-amber-300 bg-amber-50/50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800 hover:bg-amber-100 text-xs font-bold justify-start"
            >
              <BookOpen className="w-3.5 h-3.5 mr-2 text-amber-600" />
              Szorzási segédlet
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleStartLevel(selectedLevel, gameMode)}
              className="w-full h-9 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium justify-start"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-2" />
              Játék újraindítása
            </Button>
          </div>
        </div>
      </div>

      {/* Rules Modal Overlay */}
      {showCheatSheet && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-amber-300 dark:border-amber-900 shadow-2xl max-w-2xl w-full text-left">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                A szorzás szabályai és tulajdonságai
              </h3>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowCheatSheet(false)}
                className="rounded-xl h-8 px-2 text-xs"
              >
                Bezárás
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 mb-4">
              {MULTIPLICATION_CHEAT_SHEET.map((item, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-850 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700">
                  <div className="text-xs font-black text-amber-600 dark:text-amber-400">{item.topic}</div>
                  <div className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5">{item.formula}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">{item.note}</div>
                </div>
              ))}
            </div>

            <div className="text-xs text-slate-600 dark:text-slate-400 bg-amber-50/80 dark:bg-amber-950/40 p-3 rounded-xl border border-amber-200 dark:border-amber-900/60 leading-relaxed mb-4 space-y-1">
              <p><strong>Felcserélhetőség:</strong> <em>a · b = b · a</em> (a tényezők sorrendje tetszőleges).</p>
              <p><strong>Disztributivitás:</strong> <em>(a + b) · c = a·c + b·c</em> (összeg szorzása).</p>
              <p><strong>Írásbeli szorzás:</strong> Kétjegyű szorzónál a részletszorzatokat a megfelelő helyiérték alá írjuk (tízeseknél egy hellyel balra), majd összeadjuk őket.</p>
            </div>

            <Button
              onClick={() => setShowCheatSheet(false)}
              className="w-full h-10 rounded-xl font-bold bg-amber-600 hover:bg-amber-700 text-white"
            >
              Értem, folytatom a játékot!
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MultiplicationQuiz;

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
  Target,
  Maximize2,
  Minimize2,
  ArrowRightLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { RoundingMatcher } from './RoundingMatcher';
import { RoundingSorter } from './RoundingSorter';

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

const ROUNDING_CHEAT_SHEET = [
  { topic: 'Aranyszabály: Lefelé (0-4)', formula: '0, 1, 2, 3, 4', note: 'A kerekítendő hely változatlan marad, utána minden 0.' },
  { topic: 'Aranyszabály: Felfelé (5-9)', formula: '5, 6, 7, 8, 9', note: 'A kerekítendő helyhez +1 adódik, utána minden 0.' },
  { topic: 'Tízesekre kerekítés (10)', formula: 'Döntő: Egyesek', note: 'Pl. 47 ➔ 50, 132 ➔ 130' },
  { topic: 'Százasokra kerekítés (100)', formula: 'Döntő: Tízesek', note: 'Pl. 586 ➔ 600, 235 ➔ 200' },
  { topic: 'Ezresekre kerekítés (1 000)', formula: 'Döntő: Százasok', note: 'Pl. 4 376 ➔ 4 000, 7 810 ➔ 8 000' },
  { topic: '9-es átcsapódása', formula: '496 tízesre ➔ 500', note: 'A 9-esből 0 lesz, az előtte álló jegy nő 1-gyel.' },
  { topic: 'Műveleti becslés', formula: 'P ≈ B', note: 'Számolás előtt kerekített értékekkel becsüljük az eredményt.' },
  { topic: 'Kerekítési intervallum', formula: '550 ≤ x ≤ 649', note: 'Ezek a számok kerekíthetők százasra 600-ra.' }
];

const QUIZ_LEVELS: Record<DifficultyLevel, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Könnyű szint',
    subtitle: 'Kerekítés tízesekre és százasokra 1–1 000 között',
    range: '1 – 1 000',
    focus: 'Döntő számjegy felismerése, tízesre és százasra kerekítés, egyszerű becslés',
    color: 'teal',
    badgeBg: 'bg-teal-50 dark:bg-teal-950/40',
    badgeBorder: 'border-teal-200 dark:border-teal-800',
    badgeText: 'text-teal-700 dark:text-teal-300',
    accentGradient: 'from-teal-500 to-emerald-600',
    iconBg: 'bg-teal-500',
    questions: [
      {
        id: 'q1-1',
        prompt: 'Melyik számjegy dönti el, hogy egy számot felfelé vagy lefelé kerekítünk tízesekre?',
        highlightValue: 'Tízesekre kerekítés',
        questionTypeBadge: 'Döntő számjegy',
        options: ['Az egyesek helyén álló számjegy', 'A tízesek helyén álló számjegy', 'A százasok helyén álló számjegy', 'A szám első számjegye'],
        correctAnswer: 'Az egyesek helyén álló számjegy',
        explanation: 'Tízesekre kerekítésnél mindig a közvetlenül utána (jobbra) lévő helyiérték, vagyis az egyesek számjegye dönti el a kerekítés irányát.',
        breakdown: [
          { label: 'Kerekítendő', value: 'Tízesek' },
          { label: 'Döntő jegy', value: 'Egyesek' }
        ]
      },
      {
        id: 'q1-2',
        prompt: 'Mennyi a 47 kerekített értéke tízesekre kerekítve?',
        highlightValue: '47 ≈ ?',
        questionTypeBadge: 'Tízesekre kerekítés',
        options: ['50', '40', '45', '100'],
        correctAnswer: '50',
        explanation: 'Az egyesek helyén álló 7-es számjegy ≥ 5, ezért felfelé kerekítünk: 47 ➔ 50.',
        breakdown: [
          { label: 'Egyesek', value: '7 (≥ 5)' },
          { label: 'Irány', value: 'Felfelé ➔ 50' }
        ]
      },
      {
        id: 'q1-3',
        prompt: 'Mennyi a 132 kerekített értéke tízesekre kerekítve?',
        highlightValue: '132 ≈ ?',
        questionTypeBadge: 'Tízesekre kerekítés',
        options: ['130', '140', '100', '135'],
        correctAnswer: '130',
        explanation: 'Az egyesek helyén álló 2-es számjegy < 5, ezért lefelé kerekítünk: 132 ➔ 130.',
        breakdown: [
          { label: 'Egyesek', value: '2 (< 5)' },
          { label: 'Irány', value: 'Lefelé ➔ 130' }
        ]
      },
      {
        id: 'q1-4',
        prompt: 'Mennyi az 586 kerekített értéke százasokra kerekítve?',
        highlightValue: '586 ≈ ?',
        questionTypeBadge: 'Százasokra kerekítés',
        options: ['600', '500', '590', '580'],
        correctAnswer: '600',
        explanation: 'Százasokra kerekítésnél a tízesek helyén álló 8-ast nézzük. Mivel 8 ≥ 5, felfelé kerekítünk: 586 ➔ 600.',
        breakdown: [
          { label: 'Tízesek', value: '8 (≥ 5)' },
          { label: 'Irány', value: 'Felfelé ➔ 600' }
        ]
      },
      {
        id: 'q1-5',
        prompt: 'Mennyi a 235 kerekített értéke százasokra kerekítve?',
        highlightValue: '235 ≈ ?',
        questionTypeBadge: 'Százasokra kerekítés',
        options: ['200', '300', '240', '230'],
        correctAnswer: '200',
        explanation: 'Százasokra kerekítésnél a tízesek helyén álló 3-ast nézzük. Mivel 3 < 5, lefelé kerekítünk: 235 ➔ 200.',
        breakdown: [
          { label: 'Tízesek', value: '3 (< 5)' },
          { label: 'Irány', value: 'Lefelé ➔ 200' }
        ]
      },
      {
        id: 'q1-6',
        prompt: 'Hogyan kerekítünk, ha a döntő számjegy pontosan 5-ös?',
        highlightValue: 'Döntő jegy = 5',
        questionTypeBadge: 'Szabály',
        options: ['Felfelé kerekítünk (+1 a helyiértékhez)', 'Lefelé kerekítünk (nem változik a helyiérték)', 'Attól függ, páros-e a szám', 'Nem lehet elkerekíteni'],
        correctAnswer: 'Felfelé kerekítünk (+1 a helyiértékhez)',
        explanation: 'Az 5, 6, 7, 8, 9 számjegyek esetén a matematika szabályai szerint mindig felfelé kerekítünk.',
        breakdown: [
          { label: '5-ös szabály', value: '5 ≥ 5' },
          { label: 'Irány', value: 'Felfelé' }
        ]
      },
      {
        id: 'q1-7',
        prompt: 'Mennyi a 750 kerekített értéke százasokra kerekítve?',
        highlightValue: '750 ≈ ?',
        questionTypeBadge: 'Százasokra kerekítés',
        options: ['800', '700', '750', '900'],
        correctAnswer: '800',
        explanation: 'A tízesek helyén álló 5-ös miatt felfelé kerekítünk: 750 ➔ 800.',
        breakdown: [
          { label: 'Tízesek', value: '5 (≥ 5)' },
          { label: 'Irány', value: 'Felfelé ➔ 800' }
        ]
      },
      {
        id: 'q1-8',
        prompt: 'Becsüld meg az összeg értékét tízesekre kerekítve: 38 + 51 ≈ ?',
        highlightValue: '38 + 51 ≈ ?',
        questionTypeBadge: 'Műveleti becslés',
        options: ['90 (40 + 50)', '80 (30 + 50)', '100 (40 + 60)', '89 (pontos érték)'],
        correctAnswer: '90 (40 + 50)',
        explanation: '38 tízesre kerekítve 40, az 51 tízesre kerekítve 50. Becsült összeg: 40 + 50 = 90 (pontos érték: 89).',
        breakdown: [
          { label: '38 ≈', value: '40' },
          { label: '51 ≈', value: '50' },
          { label: 'Becslés', value: '40 + 50 = 90' }
        ]
      },
      {
        id: 'q1-9',
        prompt: 'Melyik szám kerekített értéke 400 százasokra kerekítve?',
        highlightValue: '? ≈ 400',
        questionTypeBadge: 'Visszafelé kerekítés',
        options: ['419', '462', '348', '470'],
        correctAnswer: '419',
        explanation: 'A 419-ben a tízesek 1 (< 5), így 400-ra kerekül. (A 462 ➔ 500, a 348 ➔ 300, a 470 ➔ 500).',
        breakdown: [
          { label: '419 tízesek', value: '1 (< 5) ➔ 400' }
        ]
      },
      {
        id: 'q1-10',
        prompt: 'Becsüld meg a különbséget százasokra kerekítve: 820 - 290 ≈ ?',
        highlightValue: '820 - 290 ≈ ?',
        questionTypeBadge: 'Műveleti becslés',
        options: ['500 (800 - 300)', '600 (800 - 200)', '530 (pontos érték)', '400 (700 - 300)'],
        correctAnswer: '500 (800 - 300)',
        explanation: '820 százasra kerekítve 800, a 290 kerekítve 300. Becslés: 800 - 300 = 500.',
        breakdown: [
          { label: '820 ≈', value: '800' },
          { label: '290 ≈', value: '300' },
          { label: 'Becsült érték', value: '500' }
        ]
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Közepes szint',
    subtitle: 'Nagyobb számok, ezresek, tízezresek és 9-es átcsapódás',
    range: '1 000 – 100 000',
    focus: 'Ezresekre, tízezresekre kerekítés, 9-es átcsapódása, szorzás/osztás becslése',
    color: 'emerald',
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/40',
    badgeBorder: 'border-emerald-200 dark:border-emerald-800',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
    accentGradient: 'from-emerald-500 to-teal-600',
    iconBg: 'bg-emerald-500',
    questions: [
      {
        id: 'q2-1',
        prompt: 'Mennyi a 4 376 kerekített értéke százasokra kerekítve?',
        highlightValue: '4 376 ≈ ? (százasokra)',
        questionTypeBadge: 'Százasokra kerekítés',
        options: ['4 400', '4 300', '4 000', '4 380'],
        correctAnswer: '4 400',
        explanation: 'A tízesek helyén a 7-es áll (7 ≥ 5), ezért a 3 százasból 4 százas lesz ➔ 4 400.',
        breakdown: [
          { label: 'Döntő jegy', value: '7 (tízesek)' },
          { label: 'Eredmény', value: '4 400' }
        ]
      },
      {
        id: 'q2-2',
        prompt: 'Mennyi a 18 492 kerekített értéke ezresekre kerekítve?',
        highlightValue: '18 492 ≈ ? (ezresekre)',
        questionTypeBadge: 'Ezresekre kerekítés',
        options: ['18 000', '19 000', '18 500', '20 000'],
        correctAnswer: '18 000',
        explanation: 'Ezresekre kerekítésnél a százasok helyén álló 4-est nézzük. Mivel 4 < 5, lefelé kerekítünk ➔ 18 000.',
        breakdown: [
          { label: 'Százasok', value: '4 (< 5)' },
          { label: 'Eredmény', value: '18 000' }
        ]
      },
      {
        id: 'q2-3',
        prompt: 'Mennyi a 496 kerekített értéke tízesekre kerekítve? (9-es átcsapódása)',
        highlightValue: '496 ≈ ? (tízesekre)',
        questionTypeBadge: '9-es átcsapódása',
        options: ['500', '490', '400', '510'],
        correctAnswer: '500',
        explanation: 'Az egyesek helyén 6 áll (6 ≥ 5), ezért a 9 tízesből 10 tízes (1 százas) lesz ➔ 496 ➔ 500.',
        breakdown: [
          { label: 'Egyesek', value: '6 (≥ 5)' },
          { label: '49 tízes + 1', value: '50 tízes = 500' }
        ]
      },
      {
        id: 'q2-4',
        prompt: 'Mennyi a 2 985 kerekített értéke százasokra kerekítve?',
        highlightValue: '2 985 ≈ ? (százasokra)',
        questionTypeBadge: '9-es átcsapódása',
        options: ['3 000', '2 900', '2 000', '3 100'],
        correctAnswer: '3 000',
        explanation: 'A tízesek helyén 8 áll (8 ≥ 5), ezért a 29 százasból 30 százas (3 000) lesz ➔ 3 000.',
        breakdown: [
          { label: 'Tízesek', value: '8 (≥ 5)' },
          { label: '29 százas + 1', value: '30 százas = 3 000' }
        ]
      },
      {
        id: 'q2-5',
        prompt: 'Mennyi a 74 500 kerekített értéke tízezresekre kerekítve?',
        highlightValue: '74 500 ≈ ? (tízezresekre)',
        questionTypeBadge: 'Tízezresekre kerekítés',
        options: ['70 000', '80 000', '75 000', '74 000'],
        correctAnswer: '70 000',
        explanation: 'Tízezresekre kerekítésnél az ezresek helyén álló 4-est nézzük. Mivel 4 < 5, lefelé kerekítünk ➔ 70 000.',
        breakdown: [
          { label: 'Ezresek', value: '4 (< 5)' },
          { label: 'Eredmény', value: '70 000' }
        ]
      },
      {
        id: 'q2-6',
        prompt: 'Mennyi a 38 720 kerekített értéke tízezresekre kerekítve?',
        highlightValue: '38 720 ≈ ? (tízezresekre)',
        questionTypeBadge: 'Tízezresekre kerekítés',
        options: ['40 000', '30 000', '39 000', '38 000'],
        correctAnswer: '40 000',
        explanation: 'Az ezresek helyén álló 8-as (8 ≥ 5) miatt felfelé kerekítünk ➔ 40 000.',
        breakdown: [
          { label: 'Ezresek', value: '8 (≥ 5)' },
          { label: 'Eredmény', value: '40 000' }
        ]
      },
      {
        id: 'q2-7',
        prompt: 'Becsüld meg a szorzatot kerekített értékekkel: 49 · 21 ≈ ?',
        highlightValue: '49 · 21 ≈ ?',
        questionTypeBadge: 'Szorzás becslése',
        options: ['1 000 (50 · 20)', '800 (40 · 20)', '1 200 (60 · 20)', '1 029 (pontos érték)'],
        correctAnswer: '1 000 (50 · 20)',
        explanation: '49 tízesre kerekítve 50, a 21 kerekítve 20. Becsült szorzat: 50 · 20 = 1 000 (pontos érték: 1 029).',
        breakdown: [
          { label: '49 ≈', value: '50' },
          { label: '21 ≈', value: '20' },
          { label: 'Becsült szorzat', value: '50 · 20 = 1 000' }
        ]
      },
      {
        id: 'q2-8',
        prompt: 'Mennyi a 9 972 kerekített értéke százasokra kerekítve?',
        highlightValue: '9 972 ≈ ? (százasokra)',
        questionTypeBadge: '9-es átcsapódása',
        options: ['10 000', '9 900', '9 000', '10 100'],
        correctAnswer: '10 000',
        explanation: 'A tízesek 7 (7 ≥ 5), a 99 százashoz hozzáadva 1-et 100 százas (10 000) lesz ➔ 10 000.',
        breakdown: [
          { label: 'Tízesek', value: '7 (≥ 5)' },
          { label: 'Eredmény', value: '10 000' }
        ]
      },
      {
        id: 'q2-9',
        prompt: 'Becsüld meg a hányadost kerekített értékekkel: 594 : 29 ≈ ?',
        highlightValue: '594 : 29 ≈ ?',
        questionTypeBadge: 'Osztás becslése',
        options: ['20 (600 : 30)', '30 (600 : 20)', '15 (450 : 30)', '25'],
        correctAnswer: '20 (600 : 30)',
        explanation: '594 százasra kerekítve 600, a 29 tízesre kerekítve 30. Becsült hányados: 600 : 30 = 20.',
        breakdown: [
          { label: '594 ≈', value: '600' },
          { label: '29 ≈', value: '30' },
          { label: 'Becsült hányados', value: '600 : 30 = 20' }
        ]
      },
      {
        id: 'q2-10',
        prompt: 'Melyik szám kerekített értéke 5 000 ezresekre kerekítve?',
        highlightValue: '? ≈ 5 000 (ezresekre)',
        questionTypeBadge: 'Visszafelé kerekítés',
        options: ['4 720', '5 610', '4 390', '5 500'],
        correctAnswer: '4 720',
        explanation: 'A 4 720-ban a százasok 7 (≥ 5), így 5 000-re kerekül. (Az 5 610 ➔ 6 000, a 4 390 ➔ 4 000, az 5 500 ➔ 6 000).',
        breakdown: [
          { label: '4 720 százasok', value: '7 (≥ 5) ➔ 5 000' }
        ]
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Nehéz szint',
    subtitle: 'Intervallumok, százezresek, milliók és becslési stratégiák',
    range: '100 000 – 10 000 000',
    focus: 'Legkisebb/legnagyobb szám adott kerekítésre, százezresek, szöveges problémák',
    color: 'indigo',
    badgeBg: 'bg-indigo-50 dark:bg-indigo-950/40',
    badgeBorder: 'border-indigo-200 dark:border-indigo-800',
    badgeText: 'text-indigo-700 dark:text-indigo-300',
    accentGradient: 'from-indigo-500 to-teal-600',
    iconBg: 'bg-indigo-500',
    questions: [
      {
        id: 'q3-1',
        prompt: 'Melyik a legkisebb egész szám, amely tízesekre kerekítve 80-at ad?',
        highlightValue: 'Legkisebb szám ➔ 80 (tízesre)',
        questionTypeBadge: 'Kerekítési intervallum',
        options: ['75', '79', '74', '80'],
        correctAnswer: '75',
        explanation: '75-nél az egyesek 5-ös, így felfelé kerekítve 80 lesz. A 74 még 70-re kerekülne.',
        breakdown: [
          { label: 'Legkisebb szám', value: '75 (5 ≥ 5 ➔ 80)' }
        ]
      },
      {
        id: 'q3-2',
        prompt: 'Melyik a legnagyobb egész szám, amely tízesekre kerekítve 80-at ad?',
        highlightValue: 'Legnagyobb szám ➔ 80 (tízesre)',
        questionTypeBadge: 'Kerekítési intervallum',
        options: ['84', '85', '89', '84,9'],
        correctAnswer: '84',
        explanation: 'A 84-ben az egyesek 4-es, így lefelé kerekítve 80 lesz. A 85 már 90-re kerekülne.',
        breakdown: [
          { label: 'Legnagyobb egész', value: '84 (4 < 5 ➔ 80)' }
        ]
      },
      {
        id: 'q3-3',
        prompt: 'Melyik a legkisebb és legnagyobb egész szám, amely százasokra kerekítve 600-at ad?',
        highlightValue: 'Intervallum ➔ 600 (százasra)',
        questionTypeBadge: 'Kerekítési intervallum',
        options: ['550 és 649', '500 és 699', '551 és 650', '590 és 610'],
        correctAnswer: '550 és 649',
        explanation: 'A legkisebb az 550 (tízesek 5 ➔ 600), a legnagyobb a 649 (tízesek 4 ➔ 600).',
        breakdown: [
          { label: 'Alsó határ', value: '550' },
          { label: 'Felső határ', value: '649' }
        ]
      },
      {
        id: 'q3-4',
        prompt: 'Hány olyan egész szám van, amely százasokra kerekítve pontosan 700-at ad?',
        highlightValue: 'Hány szám kerekül 700-ra?',
        questionTypeBadge: 'Számosság meghatározása',
        options: ['100 darab (650-től 749-ig)', '99 darab', '50 darab', '101 darab'],
        correctAnswer: '100 darab (650-től 749-ig)',
        explanation: 'A 650 ≤ x ≤ 749 tartományban lévő számok kerekülnek 700-ra. Darabszám: 749 - 650 + 1 = 100 darab.',
        breakdown: [
          { label: 'Tartomány', value: '650 – 749' },
          { label: 'Darabszám', value: '100 db' }
        ]
      },
      {
        id: 'q3-5',
        prompt: 'Mennyi a 349 800 kerekített értéke százezresekre kerekítve?',
        highlightValue: '349 800 ≈ ? (százezresekre)',
        questionTypeBadge: 'Százezresekre kerekítés',
        options: ['300 000', '400 000', '350 000', '340 000'],
        correctAnswer: '300 000',
        explanation: 'Százezresekre kerekítésnél a tízezresek helyén álló 4-est nézzük. Mivel 4 < 5, lefelé kerekítünk ➔ 300 000.',
        breakdown: [
          { label: 'Tízezresek', value: '4 (< 5)' },
          { label: 'Eredmény', value: '300 000' }
        ]
      },
      {
        id: 'q3-6',
        prompt: 'Mennyi a 750 000 kerekített értéke százezresekre kerekítve?',
        highlightValue: '750 000 ≈ ? (százezresekre)',
        questionTypeBadge: 'Százezresekre kerekítés',
        options: ['800 000', '700 000', '1 000 000', '750 000'],
        correctAnswer: '800 000',
        explanation: 'A tízezresek helyén álló 5-ös miatt felfelé kerekítünk: 750 000 ➔ 800 000.',
        breakdown: [
          { label: 'Tízezresek', value: '5 (≥ 5)' },
          { label: 'Eredmény', value: '800 000' }
        ]
      },
      {
        id: 'q3-7',
        prompt: 'Egy boltban 3 füzet ára 495 Ft, 785 Ft és 1 210 Ft. Becsüld meg a végösszeget százasokra kerekítve!',
        highlightValue: '495 + 785 + 1 210 ≈ ?',
        questionTypeBadge: 'Szöveges becslés',
        options: ['2 500 Ft (500 + 800 + 1 200)', '2 400 Ft', '2 600 Ft', '2 490 Ft (pontos)'],
        correctAnswer: '2 500 Ft (500 + 800 + 1 200)',
        explanation: '495 ≈ 500, 785 ≈ 800, 1 210 ≈ 1 200. Becsült összeg: 500 + 800 + 1 200 = 2 500 Ft (pontos: 2 490 Ft).',
        breakdown: [
          { label: 'Kerekítések', value: '500 + 800 + 1 200' },
          { label: 'Becslés', value: '2 500 Ft' }
        ]
      },
      {
        id: 'q3-8',
        prompt: 'Mennyi a 4 999 500 kerekített értéke milliókra kerekítve?',
        highlightValue: '4 999 500 ≈ ? (milliókra)',
        questionTypeBadge: 'Milliókra kerekítés',
        options: ['5 000 000', '4 000 000', '4 900 000', '6 000 000'],
        correctAnswer: '5 000 000',
        explanation: 'Milliókra kerekítésnél a százezresek helyén álló 9-est nézzük (9 ≥ 5), így felfelé kerekítünk ➔ 5 000 000.',
        breakdown: [
          { label: 'Százezresek', value: '9 (≥ 5)' },
          { label: 'Eredmény', value: '5 000 000' }
        ]
      },
      {
        id: 'q3-9',
        prompt: 'Peti azt állítja, hogy a 439 százasokra kerekítve 500, mert a 9-es miatt a 3-asból 4 lesz, a 4-es miatt pedig az 4-esből 5. Mi a hiba Peti gondolatmenetében?',
        highlightValue: 'Többlépcsős kerekítés hiba',
        questionTypeBadge: 'Hibakeresés',
        options: ['Nem szabad többlépcsősen kerekíteni; közvetlenül a tízesek helyén álló 3-ast kell nézni (3 < 5 ➔ 400)', 'Peti jól számolt, valóban 500 az eredmény', 'A 439-et csak tízesekre lehet kerekíteni', 'Az egyesek számjegye mindig felülírja a tízeseket'],
        correctAnswer: 'Nem szabad többlépcsősen kerekíteni; közvetlenül a tízesek helyén álló 3-ast kell nézni (3 < 5 ➔ 400)',
        explanation: 'Kerekítéskor tilos egymás után láncolt kerekítéseket végezni! Csak és kizárólag a kerekítendő hely közvetlen jobb oldali szomszédját (a 3-ast) nézzük: 3 < 5, tehát 439 ≈ 400.',
        breakdown: [
          { label: 'Szabály', value: 'Csak 1 döntő jegy van!' },
          { label: 'Helyes kerekítés', value: '439 ≈ 400' }
        ]
      },
      {
        id: 'q3-10',
        prompt: 'Egy stadionba 48 720 néző fér be. Mennyi a férőhely tízezresekre kerekítve, és mekkora a kerekítési hiba (|Pontos - Kerekített|)?',
        highlightValue: '48 720 tízezresre & hiba',
        questionTypeBadge: 'Kerekítési hiba',
        options: ['50 000 és a hiba 1 280', '40 000 és a hiba 8 720', '50 000 és a hiba 8 720', '48 000 és a hiba 720'],
        correctAnswer: '50 000 és a hiba 1 280',
        explanation: '48 720 tízezresekre kerekítve 50 000 (mert az ezresek 8 ≥ 5). Kerekítési hiba: 50 000 - 48 720 = 1 280.',
        breakdown: [
          { label: 'Kerekített érték', value: '50 000' },
          { label: 'Eltérés (hiba)', value: '1 280' }
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

interface RoundingQuizProps {
  onBack: () => void;
}

export function RoundingQuiz({ onBack }: RoundingQuizProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel | null>(null);
  const [gameMode, setGameMode] = useState<GameMode>('quiz');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showCheatSheet, setShowCheatSheet] = useState(false);

  // Fullscreen toggler
  const toggleFullscreen = async () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      try {
        if (containerRef.current.requestFullscreen) {
          await containerRef.current.requestFullscreen();
        }
      } catch (err) {
        console.error('Fullscreen request failed:', err);
      }
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Confetti on completion
  useEffect(() => {
    if (isCompleted) {
      const duration = 2.5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
          return clearInterval(interval);
        }
        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: 0.2, y: 0.6 } });
        confetti({ ...defaults, particleCount, origin: { x: 0.8, y: 0.6 } });
      }, 350);

      return () => clearInterval(interval);
    }
  }, [isCompleted]);

  const handleStartLevel = (level: DifficultyLevel, mode: GameMode = gameMode) => {
    setSelectedLevel(level);
    setGameMode(mode);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setIsCompleted(false);

    const prepared = QUIZ_LEVELS[level].questions.map((q) => ({
      ...q,
      options: shuffleArray(q.options)
    }));
    setQuestions(prepared);
  };

  const handleOptionClick = (option: string) => {
    if (isAnswerChecked) return;
    setSelectedOption(option);
    setIsAnswerChecked(true);

    const currentQ = questions[currentIndex] || (selectedLevel ? QUIZ_LEVELS[selectedLevel].questions[currentIndex] : null);
    if (!currentQ) return;

    const isCorrect = option === currentQ.correctAnswer;

    if (isCorrect) {
      const nextScore = score + 1;
      const nextStreak = streak + 1;
      setScore(nextScore);
      setStreak(nextStreak);
      if (nextStreak > bestStreak) {
        setBestStreak(nextStreak);
      }
    } else {
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    const total = questions.length || (selectedLevel ? QUIZ_LEVELS[selectedLevel].questions.length : 0);

    if (currentIndex < total - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    } else {
      setIsCompleted(true);
    }
  };

  // Keyboard shortcut listener (1, 2, 3, 4)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameMode !== 'quiz' || isAnswerChecked || isCompleted || !selectedLevel) return;
      const keyMap: { [key: string]: number } = {
        '1': 0,
        '2': 1,
        '3': 2,
        '4': 3
      };
      if (e.key in keyMap) {
        const optionIdx = keyMap[e.key];
        const currentQ = questions[currentIndex] || (selectedLevel ? QUIZ_LEVELS[selectedLevel].questions[currentIndex] : null);
        if (currentQ && currentQ.options[optionIdx]) {
          handleOptionClick(currentQ.options[optionIdx]);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameMode, isAnswerChecked, isCompleted, selectedLevel, currentIndex, questions]);

  // 1. Initial Level Selection Screen
  if (selectedLevel === null) {
    return (
      <div
        ref={containerRef}
        className={cn(
          "w-full max-w-5xl mx-auto px-2 sm:px-4 py-2 animate-in fade-in duration-300 text-left",
          isFullscreen && "fixed inset-0 z-50 max-w-none w-screen h-screen bg-slate-100 dark:bg-slate-950 p-4 sm:p-6 overflow-y-auto"
        )}
      >
        {/* Top bar with back button, fullscreen toggle and cheat sheet */}
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
              className="rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              title={isFullscreen ? "Kilépés a teljes képernyőből" : "Teljes képernyő"}
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5 mr-1" />
                  Ablak
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5 mr-1" />
                  Teljes képernyő
                </>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCheatSheet(!showCheatSheet)}
              className="rounded-xl h-8 px-3 text-xs font-bold border-teal-300 bg-teal-50/50 text-teal-800 dark:bg-teal-950/40 dark:text-teal-300 dark:border-teal-800 hover:bg-teal-100"
            >
              <BookOpen className="w-3.5 h-3.5 mr-1.5 text-teal-600" />
              Kerekítési segédlet
            </Button>
          </div>
        </div>

        {/* Hero Header */}
        <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-5">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center justify-center gap-2 mb-1">
            <span className="text-2xl">🎯</span>
            <span>Becslés és Kerekítés Kvíz</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Teszteld a tudásod a kerekítési szabályokból, a döntő számjegy felismeréséből és a műveleti becslésekből!
          </p>

          {/* Quick Mode Switcher in selection */}
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl mt-3 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setGameMode('quiz')}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all",
                gameMode === 'quiz'
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              )}
            >
              <FileQuestion className="w-3.5 h-3.5 text-teal-500" />
              Klasszikus Kvíz
            </button>
            <button
              onClick={() => setGameMode('matcher')}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all",
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
                "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all",
                gameMode === 'sorter'
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              )}
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-cyan-500" />
              Csoportosító (Húzd a helyére)
            </button>
          </div>
        </div>

        {/* Cheat sheet popover/card */}
        {showCheatSheet && (
          <div className="mb-4 p-4 sm:p-5 bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-slate-900 dark:to-slate-850 rounded-2xl border-2 border-teal-200 dark:border-teal-900/60 shadow-md animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm sm:text-base font-black text-teal-900 dark:text-teal-200 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-teal-600" />
                Kerekítés szabályai és összefoglaló
              </h3>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowCheatSheet(false)}
                className="text-teal-800 dark:text-teal-300 hover:bg-teal-200/50 rounded-lg h-7 px-2 text-xs"
              >
                Bezárás
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
              {ROUNDING_CHEAT_SHEET.map((item, idx) => (
                <div key={idx} className="bg-white/95 dark:bg-slate-800/95 p-2.5 rounded-xl border border-teal-100 dark:border-slate-700 shadow-xs text-left">
                  <div className="text-xs font-black text-teal-600 dark:text-teal-400">{item.topic}</div>
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
                className="group relative bg-white dark:bg-slate-900 rounded-2xl p-5 border-2 border-slate-200/80 dark:border-slate-800 hover:border-teal-500 dark:hover:border-teal-500 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-teal-500/10 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-inner text-white font-black text-lg", cfg.iconBg)}>
                      {level}
                    </div>

                    <span className={cn("px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider border", cfg.badgeBg, cfg.badgeBorder, cfg.badgeText)}>
                      {gameMode === 'quiz' ? '10 Kérdés' : gameMode === 'matcher' ? '8 Pár' : '10-12 Elem (3 csoport)'}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 dark:text-white mb-0.5 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
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
                      <span className="font-bold text-teal-600 dark:text-teal-400 text-right truncate max-w-[140px]" title={cfg.focus}>{cfg.focus}</span>
                    </div>
                  </div>
                </div>

                <Button
                  className={cn(
                    "w-full h-10 rounded-xl font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-1.5",
                    level === 1
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                      : level === 2
                      ? "bg-teal-600 hover:bg-teal-700 text-white"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white"
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
          <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-teal-500/30">
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
              <div className="text-2xl font-black text-teal-600 dark:text-teal-400">{score} / {totalQuestions}</div>
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
                className="flex-1 h-11 rounded-xl text-sm font-bold bg-teal-600 hover:bg-teal-700 text-white shadow-md flex items-center justify-center gap-1.5"
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
        "w-full max-w-6xl mx-auto px-2 sm:px-4 py-1 animate-in fade-in duration-200 text-left",
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

          {/* Fullscreen button */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleFullscreen}
            className="h-8 rounded-xl px-2.5 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs hover:bg-slate-100 dark:hover:bg-slate-800"
            title={isFullscreen ? 'Kilépés a teljes képernyőből' : 'Teljes képernyős mód'}
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-3.5 h-3.5 mr-1 text-teal-600 dark:text-teal-400" />
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
              <div className="flex items-center gap-1 font-black text-teal-600 dark:text-teal-400">
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
            <div className="flex items-center gap-1.5 bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 px-3 py-1 rounded-xl border border-cyan-200 dark:border-cyan-800 text-xs font-bold">
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>Csoportosító Mód</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Container with Wordwall Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* LEFT / CENTER: Main Game Area (9 cols on large screen) */}
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
                  color={selectedLevel === 1 ? 'emerald' : selectedLevel === 2 ? 'amber' : 'purple'}
                />
              </div>

              {/* 2-Column Responsive Workspace Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 items-start">
                {/* Left: Question Card + Explanation */}
                <div className="flex flex-col gap-2.5">
                  <Card className="border-2 border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
                    <div className="px-3.5 py-2 bg-slate-50 dark:bg-slate-850 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        {currentIndex + 1}. Kérdés • {currentQuestion.questionTypeBadge}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                        {levelConfig.title}
                      </span>
                    </div>

                    <CardContent className="p-4 sm:p-5 text-center">
                      <p className="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 mb-2.5">
                        {currentQuestion.prompt}
                      </p>

                      <div className="inline-block px-6 py-2.5 bg-gradient-to-br from-teal-50 to-emerald-50/60 dark:from-slate-850 dark:to-slate-800 rounded-2xl border-2 border-teal-200/80 dark:border-slate-700 shadow-inner">
                        <span className="text-2xl sm:text-3xl font-mono font-black tracking-wider text-slate-900 dark:text-teal-300">
                          {currentQuestion.highlightValue}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Explanation & Next Step below question */}
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
                                    className="px-1.5 py-0.5 rounded-md bg-white/90 dark:bg-slate-800/90 text-[10px] font-bold font-mono text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                                  >
                                    {item.label}: <span className="text-teal-600 dark:text-teal-400">{item.value}</span>
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={handleNextQuestion}
                        className="w-full h-10 rounded-xl text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white dark:bg-teal-600 dark:hover:bg-teal-700 shadow-sm transition-all flex items-center justify-center gap-1.5"
                      >
                        {currentIndex < levelConfig.questions.length - 1 ? (
                          <>
                            Következő Feladat
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </>
                        ) : (
                          <>
                            Eredmények Megtekintése
                            <Trophy className="w-4 h-4 ml-1 text-yellow-400" />
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>

                {/* Right: 4 Answer Options */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Válaszd ki a helyes kerekítést:
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500">
                      Gombok: [1, 2, 3, 4]
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    {currentQuestion.options.map((option, idx) => {
                      const isSelected = selectedOption === option;
                      const isCorrect = option === currentQuestion.correctAnswer;

                      let buttonStyle = "bg-white dark:bg-slate-900 border-2 border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-slate-100 hover:border-teal-500 hover:shadow-xs dark:hover:border-teal-500";

                      if (isAnswerChecked) {
                        if (isCorrect) {
                          buttonStyle = "bg-emerald-50 dark:bg-emerald-950/60 border-2 border-emerald-500 text-emerald-800 dark:text-emerald-200 shadow-xs";
                        } else if (isSelected && !isCorrect) {
                          buttonStyle = "bg-rose-50 dark:bg-rose-950/60 border-2 border-rose-500 text-rose-800 dark:text-rose-200 shadow-xs";
                        } else {
                          buttonStyle = "bg-slate-50/60 dark:bg-slate-900/40 border-slate-200/40 dark:border-slate-800/40 text-slate-400 dark:text-slate-600 opacity-60";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleOptionClick(option)}
                          disabled={isAnswerChecked}
                          className={cn(
                            "relative min-h-13 sm:min-h-14 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all duration-150 flex items-center justify-between px-4 text-left",
                            buttonStyle
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
                    <div className="p-2.5 bg-teal-50/60 dark:bg-slate-850/80 rounded-xl border border-teal-200/50 dark:border-slate-800 text-[11px] text-teal-900 dark:text-teal-300 flex items-center gap-1.5 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span>0-4 ➔ lefelé kerekítünk, 5-9 ➔ felfelé kerekítünk.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : gameMode === 'matcher' ? (
            /* MATCHER MODE WORKSPACE */
            <RoundingMatcher
              level={selectedLevel}
              onNextLevel={
                selectedLevel < 3
                  ? () => handleStartLevel((selectedLevel + 1) as DifficultyLevel, 'matcher')
                  : undefined
              }
              onOpenRules={() => setShowCheatSheet(true)}
            />
          ) : (
            /* SORTER / GROUPING MODE WORKSPACE */
            <RoundingSorter
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

        {/* RIGHT: Wordwall-style Activity & Controls Sidebar (3 cols on large screen) */}
        <div className="lg:col-span-3 flex flex-col gap-3">
          {/* Wordwall Mode Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border-2 border-slate-200/80 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5 px-1">
              <Layers className="w-3.5 h-3.5 text-teal-500" />
              <span>Sablon / Játékmód</span>
            </div>

            <div className="flex flex-col gap-1.5">
              {/* Quiz Mode Button */}
              <button
                onClick={() => setGameMode('quiz')}
                className={cn(
                  "w-full p-2.5 rounded-xl text-left font-bold text-xs transition-all flex items-center gap-2.5 border-2",
                  gameMode === 'quiz'
                    ? "bg-teal-50 dark:bg-teal-950/50 border-teal-400 text-teal-900 dark:text-teal-200 shadow-xs"
                    : "bg-slate-50/80 dark:bg-slate-800/60 border-transparent hover:border-slate-200 text-slate-600 dark:text-slate-400"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                  gameMode === 'quiz' ? "bg-teal-500 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
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
                    ? "bg-cyan-50 dark:bg-cyan-950/50 border-cyan-400 text-cyan-900 dark:text-cyan-200 shadow-xs"
                    : "bg-slate-50/80 dark:bg-slate-800/60 border-transparent hover:border-slate-200 text-slate-600 dark:text-slate-400"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                  gameMode === 'sorter' ? "bg-cyan-500 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
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
                      ? "bg-slate-900 text-white dark:bg-teal-600 dark:text-white"
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
                  <Minimize2 className="w-3.5 h-3.5 mr-2 text-teal-600" />
                  Kilépés a teljes képernyőből
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5 mr-2 text-teal-600" />
                  Teljes képernyős mód
                </>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCheatSheet(!showCheatSheet)}
              className="w-full h-9 rounded-xl border-teal-300 bg-teal-50/50 text-teal-800 dark:bg-teal-950/40 dark:text-teal-300 dark:border-teal-800 hover:bg-teal-100 text-xs font-bold justify-start"
            >
              <BookOpen className="w-3.5 h-3.5 mr-2 text-teal-600" />
              Kerekítési segédlet
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
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-teal-300 dark:border-teal-900 shadow-2xl max-w-2xl w-full text-left">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-teal-600" />
                A kerekítés szabályai és helyiértékei
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
              {ROUNDING_CHEAT_SHEET.map((item, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-850 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700">
                  <div className="text-xs font-black text-teal-600 dark:text-teal-400">{item.topic}</div>
                  <div className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5">{item.formula}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">{item.note}</div>
                </div>
              ))}
            </div>

            <div className="text-xs text-slate-600 dark:text-slate-400 bg-teal-50/80 dark:bg-teal-950/40 p-3 rounded-xl border border-teal-200 dark:border-teal-900/60 leading-relaxed mb-4 space-y-1">
              <p><strong>Lefelé kerekítés (0, 1, 2, 3, 4):</strong> A kerekítendő helyiérték nem változik, utána 0-k állnak.</p>
              <p><strong>Felfelé kerekítés (5, 6, 7, 8, 9):</strong> A kerekítendő helyiérték 1-gyel nő, utána 0-k állnak.</p>
              <p><strong>9-es átcsapódása:</strong> Ha a kerekítendő helyen 9-es áll és felfelé kerekítünk, az 9-esből 0 lesz, az előtte lévő jegy pedig nő 1-gyel.</p>
            </div>

            <Button
              onClick={() => setShowCheatSheet(false)}
              className="w-full h-10 rounded-xl font-bold bg-teal-600 hover:bg-teal-700 text-white"
            >
              Értem, folytatom a játékot!
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RoundingQuiz;

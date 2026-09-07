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
  MoveHorizontal,
  Ruler,
  Target,
  Eye,
  MapPin,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { cn } from '@/lib/utils';

export type DifficultyLevel = 1 | 2 | 3;
export type GameMode = 'quiz';

export interface MarkerItem {
  id: string;
  label: string;
  value: number;
}

export interface QuizQuestion {
  id: string;
  type: 'read' | 'locate';
  prompt: string;
  highlightValue: string;
  questionTypeBadge: string;
  min: number;
  max: number;
  step: number;
  labelStep: number;
  targetMarkerLabel?: string;
  targetValue?: number;
  markers: MarkerItem[];
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

function formatNumberHU(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

// Fisher-Yates array shuffling
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const QUIZ_LEVELS: Record<DifficultyLevel, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Könnyű szint',
    subtitle: '0–20, 0–50 és 0–100 skálák, 1-es, 2-es, 5-ös és 10-es lépésközök',
    range: '0 – 100',
    focus: 'Pont leolvasása és szám elhelyezése',
    color: 'emerald',
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/40',
    badgeBorder: 'border-emerald-200 dark:border-emerald-800',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
    accentGradient: 'from-emerald-500 to-teal-600',
    iconBg: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400',
    questions: [
      {
        id: 'q1-1',
        type: 'read',
        prompt: 'Milyen számot jelöl az A pont a számegyenesen?',
        highlightValue: 'A pont = ?',
        questionTypeBadge: 'Szám leolvasása (1-es lépésköz)',
        min: 0,
        max: 10,
        step: 1,
        labelStep: 2,
        targetMarkerLabel: 'A',
        markers: [{ id: 'A', label: 'A', value: 7 }],
        options: ['7', '6', '8', '9'],
        correctAnswer: '7',
        explanation: 'A számegyenes lépésköze 1 egység. A 6-os jelölés utáni következő beosztás a 7.',
        breakdown: [
          { label: 'Lépésköz', value: '1' },
          { label: 'Közeli felirat', value: '6' },
          { label: 'A pont értéke', value: '6 + 1 = 7' }
        ]
      },
      {
        id: 'q1-2',
        type: 'locate',
        prompt: 'Melyik betű (A, B, C vagy D) jelöli a 4-es számot a számegyenesen?',
        highlightValue: 'Keresett szám: 4',
        questionTypeBadge: 'Szám elhelyezése',
        min: 0,
        max: 10,
        step: 1,
        labelStep: 2,
        targetValue: 4,
        markers: [
          { id: 'A', label: 'A', value: 2 },
          { id: 'B', label: 'B', value: 4 },
          { id: 'C', label: 'C', value: 6 },
          { id: 'D', label: 'D', value: 8 }
        ],
        options: ['B pont', 'A pont', 'C pont', 'D pont'],
        correctAnswer: 'B pont',
        explanation: 'A 4-es szám a 2 és a 6 között félúton található, amit a B pont jelöl.',
        breakdown: [
          { label: 'Keresett szám', value: '4' },
          { label: 'Helyes pont', value: 'B pont (értéke: 4)' }
        ]
      },
      {
        id: 'q1-3',
        type: 'read',
        prompt: 'Milyen számot jelöl az A pont ezen a kettesével lépkedő számegyenesen?',
        highlightValue: 'A pont = ?',
        questionTypeBadge: 'Szám leolvasása (2-es lépésköz)',
        min: 0,
        max: 20,
        step: 2,
        labelStep: 4,
        targetMarkerLabel: 'A',
        markers: [{ id: 'A', label: 'A', value: 14 }],
        options: ['14', '12', '16', '15'],
        correctAnswer: '14',
        explanation: 'A lépésköz 2 egység. A 12 és a 16 közötti beosztás a 14.',
        breakdown: [
          { label: 'Lépésköz', value: '2' },
          { label: 'Számolás', value: '12 + 2 = 14' }
        ]
      },
      {
        id: 'q1-4',
        type: 'locate',
        prompt: 'Hol helyezkedik el a 16-os szám a számegyenesen? Melyik pont jelöli?',
        highlightValue: 'Keresett szám: 16',
        questionTypeBadge: 'Szám elhelyezése',
        min: 0,
        max: 20,
        step: 2,
        labelStep: 4,
        targetValue: 16,
        markers: [
          { id: 'A', label: 'A', value: 6 },
          { id: 'B', label: 'B', value: 10 },
          { id: 'C', label: 'C', value: 16 },
          { id: 'D', label: 'D', value: 18 }
        ],
        options: ['C pont', 'A pont', 'B pont', 'D pont'],
        correctAnswer: 'C pont',
        explanation: 'A 16-os számot a 12 és 20 között a C betű jelöli (12 + 2 × 2 = 16).',
        breakdown: [
          { label: 'Keresett szám', value: '16' },
          { label: 'Helyes pont', value: 'C pont (értéke: 16)' }
        ]
      },
      {
        id: 'q1-5',
        type: 'read',
        prompt: 'Milyen szám tartozik az A pont beosztásához ezen a számegyenesen?',
        highlightValue: 'A pont = ?',
        questionTypeBadge: 'Szám leolvasása (5-ös lépésköz)',
        min: 0,
        max: 50,
        step: 5,
        labelStep: 10,
        targetMarkerLabel: 'A',
        markers: [{ id: 'A', label: 'A', value: 35 }],
        options: ['35', '30', '40', '25'],
        correctAnswer: '35',
        explanation: 'A számegyenes lépésköze 5 egység. A 30 és a 40 közötti felezőpont a 35.',
        breakdown: [
          { label: 'Lépésköz', value: '5' },
          { label: 'Számolás', value: '30 + 5 = 35' }
        ]
      },
      {
        id: 'q1-6',
        type: 'locate',
        prompt: 'Melyik pont felel meg a 25-ös számnak a számegyenesen?',
        highlightValue: 'Keresett szám: 25',
        questionTypeBadge: 'Szám elhelyezése',
        min: 0,
        max: 50,
        step: 5,
        labelStep: 10,
        targetValue: 25,
        markers: [
          { id: 'A', label: 'A', value: 15 },
          { id: 'B', label: 'B', value: 25 },
          { id: 'C', label: 'C', value: 35 },
          { id: 'D', label: 'D', value: 45 }
        ],
        options: ['B pont', 'A pont', 'C pont', 'D pont'],
        correctAnswer: 'B pont',
        explanation: 'A 25 a 20 és a 30 közötti felezőpont, amit a B pont jelöl.',
        breakdown: [
          { label: 'Keresett szám', value: '25' },
          { label: 'Helyes pont', value: 'B pont (értéke: 25)' }
        ]
      },
      {
        id: 'q1-7',
        type: 'read',
        prompt: 'Milyen értéket jelöl az A pont ezen a tízesével beosztott számegyenesen?',
        highlightValue: 'A pont = ?',
        questionTypeBadge: 'Szám leolvasása (10-es lépésköz)',
        min: 0,
        max: 100,
        step: 10,
        labelStep: 20,
        targetMarkerLabel: 'A',
        markers: [{ id: 'A', label: 'A', value: 70 }],
        options: ['70', '60', '75', '80'],
        correctAnswer: '70',
        explanation: 'A 60 és 80 között pontosan félúton a 70 található (60 + 10 = 70).',
        breakdown: [
          { label: 'Lépésköz', value: '10' },
          { label: 'Számolás', value: '60 + 10 = 70' }
        ]
      },
      {
        id: 'q1-8',
        type: 'locate',
        prompt: 'Melyik pont jelöli a 90-es számot a számegyenesen?',
        highlightValue: 'Keresett szám: 90',
        questionTypeBadge: 'Szám elhelyezése',
        min: 0,
        max: 100,
        step: 10,
        labelStep: 20,
        targetValue: 90,
        markers: [
          { id: 'A', label: 'A', value: 30 },
          { id: 'B', label: 'B', value: 50 },
          { id: 'C', label: 'C', value: 70 },
          { id: 'D', label: 'D', value: 90 }
        ],
        options: ['D pont', 'A pont', 'B pont', 'C pont'],
        correctAnswer: 'D pont',
        explanation: 'A 90 a 80 és 100 között félúton helyezkedik el (D pont).',
        breakdown: [
          { label: 'Keresett szám', value: '90' },
          { label: 'Helyes pont', value: 'D pont (értéke: 90)' }
        ]
      },
      {
        id: 'q1-9',
        type: 'read',
        prompt: 'Milyen számot mutat az A pont a számegyenesen?',
        highlightValue: 'A pont = ?',
        questionTypeBadge: 'Szám leolvasása (1-es lépésköz)',
        min: 10,
        max: 30,
        step: 1,
        labelStep: 5,
        targetMarkerLabel: 'A',
        markers: [{ id: 'A', label: 'A', value: 23 }],
        options: ['23', '22', '24', '25'],
        correctAnswer: '23',
        explanation: 'A lépésköz 1 egység. A 20-as felirattól 3 egységet jobbra a 23 található.',
        breakdown: [
          { label: 'Közeli felirat', value: '20' },
          { label: 'Lépések', value: '+3 egység' },
          { label: 'A pont', value: '20 + 3 = 23' }
        ]
      },
      {
        id: 'q1-10',
        type: 'locate',
        prompt: 'Melyik betűjelű pont mutatja a 60 pontos helyét a számegyenesen?',
        highlightValue: 'Keresett szám: 60',
        questionTypeBadge: 'Szám elhelyezése',
        min: 0,
        max: 100,
        step: 5,
        labelStep: 20,
        targetValue: 60,
        markers: [
          { id: 'A', label: 'A', value: 15 },
          { id: 'B', label: 'B', value: 45 },
          { id: 'C', label: 'C', value: 60 },
          { id: 'D', label: 'D', value: 85 }
        ],
        options: ['C pont', 'A pont', 'B pont', 'D pont'],
        correctAnswer: 'C pont',
        explanation: 'A 60 a 60-as főosztásnál lévő C pont.',
        breakdown: [
          { label: 'Keresett szám', value: '60' },
          { label: 'Helyes pont', value: 'C pont (értéke: 60)' }
        ]
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Közepes szint',
    subtitle: '100–1000 skálák, 20-as, 25-ös, 50-es és 100-as lépésközök',
    range: '100 – 1 000',
    focus: 'Összetett lépésközök, nem nulla kezdőpont',
    color: 'amber',
    badgeBg: 'bg-amber-50 dark:bg-amber-950/40',
    badgeBorder: 'border-amber-200 dark:border-amber-800',
    badgeText: 'text-amber-700 dark:text-amber-300',
    accentGradient: 'from-amber-500 to-orange-600',
    iconBg: 'bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400',
    questions: [
      {
        id: 'q2-1',
        type: 'read',
        prompt: 'Melyik számot jelöli az A pont ezen a 20-as lépésközű számegyenesen?',
        highlightValue: 'A pont = ?',
        questionTypeBadge: 'Szám leolvasása (20-as lépésköz)',
        min: 0,
        max: 200,
        step: 20,
        labelStep: 40,
        targetMarkerLabel: 'A',
        markers: [{ id: 'A', label: 'A', value: 140 }],
        options: ['140', '130', '150', '160'],
        correctAnswer: '140',
        explanation: 'A 120 és 160 közötti felezőpont a 140 (120 + 20 = 140).',
        breakdown: [
          { label: 'Lépésköz', value: '20' },
          { label: 'Közeli felirat', value: '120' },
          { label: 'A pont', value: '120 + 20 = 140' }
        ]
      },
      {
        id: 'q2-2',
        type: 'locate',
        prompt: 'Melyik pont jelöli a 225-ös számot a számegyenesen?',
        highlightValue: 'Keresett szám: 225',
        questionTypeBadge: 'Szám elhelyezése (25-ös lépésköz)',
        min: 100,
        max: 300,
        step: 25,
        labelStep: 50,
        targetValue: 225,
        markers: [
          { id: 'A', label: 'A', value: 150 },
          { id: 'B', label: 'B', value: 175 },
          { id: 'C', label: 'C', value: 225 },
          { id: 'D', label: 'D', value: 275 }
        ],
        options: ['C pont', 'A pont', 'B pont', 'D pont'],
        correctAnswer: 'C pont',
        explanation: 'A lépésköz 25. A 200 utáni első beosztás a 225 (C pont).',
        breakdown: [
          { label: 'Lépésköz', value: '25' },
          { label: 'Számolás', value: '200 + 25 = 225' },
          { label: 'Helyes pont', value: 'C pont' }
        ]
      },
      {
        id: 'q2-3',
        type: 'read',
        prompt: 'Milyen számot jelöl az A pont a számegyenesen?',
        highlightValue: 'A pont = ?',
        questionTypeBadge: 'Szám leolvasása (50-es lépésköz)',
        min: 200,
        max: 600,
        step: 50,
        labelStep: 100,
        targetMarkerLabel: 'A',
        markers: [{ id: 'A', label: 'A', value: 450 }],
        options: ['450', '425', '475', '500'],
        correctAnswer: '450',
        explanation: 'A 400 és 500 közötti felezőpont az 50-es lépésközzel a 450.',
        breakdown: [
          { label: 'Lépésköz', value: '50' },
          { label: 'A pont', value: '400 + 50 = 450' }
        ]
      },
      {
        id: 'q2-4',
        type: 'locate',
        prompt: 'Hol található a 350 a számegyenesen? Melyik pont jelöli?',
        highlightValue: 'Keresett szám: 350',
        questionTypeBadge: 'Szám elhelyezése',
        min: 0,
        max: 500,
        step: 50,
        labelStep: 100,
        targetValue: 350,
        markers: [
          { id: 'A', label: 'A', value: 150 },
          { id: 'B', label: 'B', value: 250 },
          { id: 'C', label: 'C', value: 350 },
          { id: 'D', label: 'D', value: 450 }
        ],
        options: ['C pont', 'A pont', 'B pont', 'D pont'],
        correctAnswer: 'C pont',
        explanation: 'A 300 és 400 közötti 50-es osztópont a 350 (C pont).',
        breakdown: [
          { label: 'Keresett szám', value: '350' },
          { label: 'Helyes pont', value: 'C pont (értéke: 350)' }
        ]
      },
      {
        id: 'q2-5',
        type: 'read',
        prompt: 'Milyen szám tartozik az A ponthoz ezen a számegyenesen?',
        highlightValue: 'A pont = ?',
        questionTypeBadge: 'Szám leolvasása',
        min: 500,
        max: 1000,
        step: 50,
        labelStep: 100,
        targetMarkerLabel: 'A',
        markers: [{ id: 'A', label: 'A', value: 850 }],
        options: ['850', '800', '900', '750'],
        correctAnswer: '850',
        explanation: 'A 800 és a 900 közötti felezőpont a 850.',
        breakdown: [
          { label: 'Lépésköz', value: '50' },
          { label: 'A pont', value: '800 + 50 = 850' }
        ]
      },
      {
        id: 'q2-6',
        type: 'locate',
        prompt: 'Melyik betűjelű pont jelöli a 700-as számot a számegyenesen?',
        highlightValue: 'Keresett szám: 700',
        questionTypeBadge: 'Szám elhelyezése',
        min: 0,
        max: 1000,
        step: 100,
        labelStep: 200,
        targetValue: 700,
        markers: [
          { id: 'A', label: 'A', value: 300 },
          { id: 'B', label: 'B', value: 500 },
          { id: 'C', label: 'C', value: 700 },
          { id: 'D', label: 'D', value: 900 }
        ],
        options: ['C pont', 'A pont', 'B pont', 'D pont'],
        correctAnswer: 'C pont',
        explanation: 'A 600 és 800 közötti osztópont a 700 (C pont).',
        breakdown: [
          { label: 'Keresett szám', value: '700' },
          { label: 'Helyes pont', value: 'C pont (értéke: 700)' }
        ]
      },
      {
        id: 'q2-7',
        type: 'read',
        prompt: 'A számegyenesen 20-as lépésközök vannak. Milyen számot jelöl az A pont?',
        highlightValue: 'A pont = ?',
        questionTypeBadge: 'Szám leolvasása (20-as lépésköz)',
        min: 300,
        max: 500,
        step: 20,
        labelStep: 50,
        targetMarkerLabel: 'A',
        markers: [{ id: 'A', label: 'A', value: 380 }],
        options: ['380', '360', '390', '420'],
        correctAnswer: '380',
        explanation: '300 + 4 × 20 = 380 (vagy a 400-ból egyet visszalépve: 400 - 20 = 380).',
        breakdown: [
          { label: 'Lépésköz', value: '20' },
          { label: 'Számolás', value: '400 - 20 = 380' }
        ]
      },
      {
        id: 'q2-8',
        type: 'locate',
        prompt: 'Melyik pont jelöli az 550-et a számegyenesen?',
        highlightValue: 'Keresett szám: 550',
        questionTypeBadge: 'Szám elhelyezése',
        min: 200,
        max: 800,
        step: 50,
        labelStep: 100,
        targetValue: 550,
        markers: [
          { id: 'A', label: 'A', value: 350 },
          { id: 'B', label: 'B', value: 450 },
          { id: 'C', label: 'C', value: 550 },
          { id: 'D', label: 'D', value: 650 }
        ],
        options: ['C pont', 'A pont', 'B pont', 'D pont'],
        correctAnswer: 'C pont',
        explanation: 'Az 500 és 600 közötti felezőpont az 550 (C pont).',
        breakdown: [
          { label: 'Keresett szám', value: '550' },
          { label: 'Helyes pont', value: 'C pont (értéke: 550)' }
        ]
      },
      {
        id: 'q2-9',
        type: 'read',
        prompt: 'Milyen számot jelöl az A pont a számegyenesen?',
        highlightValue: 'A pont = ?',
        questionTypeBadge: 'Szám leolvasása (50-es lépésköz)',
        min: 0,
        max: 1000,
        step: 50,
        labelStep: 200,
        targetMarkerLabel: 'A',
        markers: [{ id: 'A', label: 'A', value: 650 }],
        options: ['650', '600', '700', '750'],
        correctAnswer: '650',
        explanation: 'A 600 utáni első 50-es beosztás a 650.',
        breakdown: [
          { label: 'Lépésköz', value: '50' },
          { label: 'A pont', value: '600 + 50 = 650' }
        ]
      },
      {
        id: 'q2-10',
        type: 'locate',
        prompt: 'Hol található a 450 a számegyenesen? Melyik pont jelöli?',
        highlightValue: 'Keresett szám: 450',
        questionTypeBadge: 'Szám elhelyezése',
        min: 100,
        max: 600,
        step: 50,
        labelStep: 100,
        targetValue: 450,
        markers: [
          { id: 'A', label: 'A', value: 150 },
          { id: 'B', label: 'B', value: 250 },
          { id: 'C', label: 'C', value: 400 },
          { id: 'D', label: 'D', value: 450 }
        ],
        options: ['D pont', 'A pont', 'B pont', 'C pont'],
        correctAnswer: 'D pont',
        explanation: 'A 400 és 500 közötti 50-es beosztás a 450 (D pont).',
        breakdown: [
          { label: 'Keresett szám', value: '450' },
          { label: 'Helyes pont', value: 'D pont (értéke: 450)' }
        ]
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Nehéz szint',
    subtitle: '1 000 – 200 000 skálák, 250-es, 500-as, 1000-es, 5000-es és 10000-es lépésközök',
    range: '1 000 – 200 000',
    focus: 'Nagy számok, ritka feliratok és arányos osztópontok',
    color: 'purple',
    badgeBg: 'bg-purple-50 dark:bg-purple-950/40',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    badgeText: 'text-purple-700 dark:text-purple-300',
    accentGradient: 'from-purple-500 to-indigo-600',
    iconBg: 'bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400',
    questions: [
      {
        id: 'q3-1',
        type: 'read',
        prompt: 'Milyen értéket jelöl az A pont ezen az 500-as lépésközű számegyenesen?',
        highlightValue: 'A pont = ?',
        questionTypeBadge: 'Szám leolvasása (500-as lépésköz)',
        min: 1000,
        max: 5000,
        step: 500,
        labelStep: 1000,
        targetMarkerLabel: 'A',
        markers: [{ id: 'A', label: 'A', value: 3500 }],
        options: ['3 500', '3 000', '4 000', '3 250'],
        correctAnswer: '3 500',
        explanation: 'A 3 000 és 4 000 közötti felezőpont a 3 500 (3 000 + 500 = 3 500).',
        breakdown: [
          { label: 'Lépésköz', value: '500' },
          { label: 'A pont', value: '3 000 + 500 = 3 500' }
        ]
      },
      {
        id: 'q3-2',
        type: 'locate',
        prompt: 'Melyik pont jelöli a 7 000-es számot a számegyenesen?',
        highlightValue: 'Keresett szám: 7 000',
        questionTypeBadge: 'Szám elhelyezése',
        min: 0,
        max: 10000,
        step: 1000,
        labelStep: 2000,
        targetValue: 7000,
        markers: [
          { id: 'A', label: 'A', value: 3000 },
          { id: 'B', label: 'B', value: 5000 },
          { id: 'C', label: 'C', value: 7000 },
          { id: 'D', label: 'D', value: 9000 }
        ],
        options: ['C pont', 'A pont', 'B pont', 'D pont'],
        correctAnswer: 'C pont',
        explanation: 'A 6 000 és 8 000 közötti felezőpont a 7 000 (C pont).',
        breakdown: [
          { label: 'Keresett szám', value: '7 000' },
          { label: 'Helyes pont', value: 'C pont (értéke: 7 000)' }
        ]
      },
      {
        id: 'q3-3',
        type: 'read',
        prompt: 'Melyik számot mutatja az A pont a tízezres nagyságrendű számegyenesen?',
        highlightValue: 'A pont = ?',
        questionTypeBadge: 'Szám leolvasása (5 000-es lépésköz)',
        min: 10000,
        max: 50000,
        step: 5000,
        labelStep: 10000,
        targetMarkerLabel: 'A',
        markers: [{ id: 'A', label: 'A', value: 35000 }],
        options: ['35 000', '30 000', '40 000', '25 000'],
        correctAnswer: '35 000',
        explanation: 'A 30 000 és 40 000 közötti 5 000-es lépés a 35 000.',
        breakdown: [
          { label: 'Lépésköz', value: '5 000' },
          { label: 'A pont', value: '30 000 + 5 000 = 35 000' }
        ]
      },
      {
        id: 'q3-4',
        type: 'locate',
        prompt: 'Hol helyezkedik el az 50 000 a számegyenesen? Melyik pont jelöli?',
        highlightValue: 'Keresett szám: 50 000',
        questionTypeBadge: 'Szám elhelyezése',
        min: 20000,
        max: 80000,
        step: 10000,
        labelStep: 20000,
        targetValue: 50000,
        markers: [
          { id: 'A', label: 'A', value: 30000 },
          { id: 'B', label: 'B', value: 50000 },
          { id: 'C', label: 'C', value: 60000 },
          { id: 'D', label: 'D', value: 70000 }
        ],
        options: ['B pont', 'A pont', 'C pont', 'D pont'],
        correctAnswer: 'B pont',
        explanation: 'A 40 000 és 60 000 közötti pontos felezőpont az 50 000 (B pont).',
        breakdown: [
          { label: 'Keresett szám', value: '50 000' },
          { label: 'Helyes pont', value: 'B pont (értéke: 50 000)' }
        ]
      },
      {
        id: 'q3-5',
        type: 'read',
        prompt: 'Milyen számot jelöl az A pont a számegyenesen?',
        highlightValue: 'A pont = ?',
        questionTypeBadge: 'Szám leolvasása (100-as lépésköz)',
        min: 1000,
        max: 2000,
        step: 100,
        labelStep: 200,
        targetMarkerLabel: 'A',
        markers: [{ id: 'A', label: 'A', value: 1700 }],
        options: ['1 700', '1 600', '1 800', '1 750'],
        correctAnswer: '1 700',
        explanation: 'Az 1 600 és 1 800 közötti felezőpont az 1 700 (1 600 + 100 = 1 700).',
        breakdown: [
          { label: 'Lépésköz', value: '100' },
          { label: 'A pont', value: '1 600 + 100 = 1 700' }
        ]
      },
      {
        id: 'q3-6',
        type: 'locate',
        prompt: 'Melyik pont felel meg a 60 000-es értéknek a számegyenesen?',
        highlightValue: 'Keresett szám: 60 000',
        questionTypeBadge: 'Szám elhelyezése',
        min: 0,
        max: 100000,
        step: 10000,
        labelStep: 20000,
        targetValue: 60000,
        markers: [
          { id: 'A', label: 'A', value: 20000 },
          { id: 'B', label: 'B', value: 40000 },
          { id: 'C', label: 'C', value: 60000 },
          { id: 'D', label: 'D', value: 80000 }
        ],
        options: ['C pont', 'A pont', 'B pont', 'D pont'],
        correctAnswer: 'C pont',
        explanation: 'A 60 000 a 40 000 és 80 000 között félúton található (C pont).',
        breakdown: [
          { label: 'Keresett szám', value: '60 000' },
          { label: 'Helyes pont', value: 'C pont (értéke: 60 000)' }
        ]
      },
      {
        id: 'q3-7',
        type: 'read',
        prompt: 'Milyen számot jelöl az A pont ezen a 200-as lépésközű számegyenesen?',
        highlightValue: 'A pont = ?',
        questionTypeBadge: 'Szám leolvasása (200-as lépésköz)',
        min: 2400,
        max: 3600,
        step: 200,
        labelStep: 400,
        targetMarkerLabel: 'A',
        markers: [{ id: 'A', label: 'A', value: 3000 }],
        options: ['3 000', '2 800', '3 200', '3 400'],
        correctAnswer: '3 000',
        explanation: 'A 2 800 és 3 200 között félúton lévő érték a 3 000 (2 800 + 200 = 3 000).',
        breakdown: [
          { label: 'Lépésköz', value: '200' },
          { label: 'A pont', value: '2 800 + 200 = 3 000' }
        ]
      },
      {
        id: 'q3-8',
        type: 'locate',
        prompt: 'Melyik pont jelöli a 150 000-et a százezres számegyenesen?',
        highlightValue: 'Keresett szám: 150 000',
        questionTypeBadge: 'Szám elhelyezése',
        min: 100000,
        max: 200000,
        step: 10000,
        labelStep: 20000,
        targetValue: 150000,
        markers: [
          { id: 'A', label: 'A', value: 120000 },
          { id: 'B', label: 'B', value: 150000 },
          { id: 'C', label: 'C', value: 170000 },
          { id: 'D', label: 'D', value: 190000 }
        ],
        options: ['B pont', 'A pont', 'C pont', 'D pont'],
        correctAnswer: 'B pont',
        explanation: 'A 140 000 és 160 000 számtani közepe a 150 000 (B pont).',
        breakdown: [
          { label: 'Keresett szám', value: '150 000' },
          { label: 'Helyes pont', value: 'B pont (értéke: 150 000)' }
        ]
      },
      {
        id: 'q3-9',
        type: 'read',
        prompt: 'A 10 000 és 15 000 között pontosan félúton van az A pont. Milyen számot jelöl?',
        highlightValue: 'A pont = ?',
        questionTypeBadge: 'Szám leolvasása (2 500-as lépésköz)',
        min: 0,
        max: 20000,
        step: 2500,
        labelStep: 5000,
        targetMarkerLabel: 'A',
        markers: [{ id: 'A', label: 'A', value: 12500 }],
        options: ['12 500', '12 000', '13 000', '11 500'],
        correctAnswer: '12 500',
        explanation: '10 000 + 2 500 = 12 500.',
        breakdown: [
          { label: 'Lépésköz', value: '2 500' },
          { label: 'A pont', value: '10 000 + 2 500 = 12 500' }
        ]
      },
      {
        id: 'q3-10',
        type: 'locate',
        prompt: 'Melyik pont jelöli a 75 000-et a számegyenesen?',
        highlightValue: 'Keresett szám: 75 000',
        questionTypeBadge: 'Szám elhelyezése',
        min: 50000,
        max: 100000,
        step: 5000,
        labelStep: 10000,
        targetValue: 75000,
        markers: [
          { id: 'A', label: 'A', value: 65000 },
          { id: 'B', label: 'B', value: 75000 },
          { id: 'C', label: 'C', value: 85000 },
          { id: 'D', label: 'D', value: 95000 }
        ],
        options: ['B pont', 'A pont', 'C pont', 'D pont'],
        correctAnswer: 'B pont',
        explanation: 'A 70 000 és 80 000 közötti 5 000-es lépés a 75 000 (B pont).',
        breakdown: [
          { label: 'Keresett szám', value: '75 000' },
          { label: 'Helyes pont', value: 'B pont (értéke: 75 000)' }
        ]
      }
    ]
  }
};

const NUMBER_LINE_CHEAT_SHEET = [
  { term: 'Origó (0)', desc: 'A számegyenes kezdőpontja, amihez a 0 számot rendeljük.' },
  { term: 'Irány (Nyíl)', desc: 'A nyíl mutatja a növekvő irányt (hagyományosan jobbra nőnek a számok).' },
  { term: 'Egységhossz', desc: 'A 0 és 1 közötti távolság, ami meghatározza a beosztások méretét.' },
  { term: 'Lépésköz', desc: '(Nagyobb jelölés - Kisebb) ÷ Szakaszok száma.' },
  { term: 'Két pont távolsága', desc: 'd(A, B) = Nagyobb szám - Kisebb szám.' },
  { term: 'Felezőpont', desc: 'A két szám összege osztva kettővel: (A + B) ÷ 2.' }
];

// Color palette for marker pins
const MARKER_STYLES: Record<string, { bg: string; border: string; text: string; ring: string }> = {
  A: {
    bg: 'bg-rose-500',
    border: 'border-rose-600',
    text: 'text-white',
    ring: 'ring-rose-200 dark:ring-rose-950'
  },
  B: {
    bg: 'bg-sky-500',
    border: 'border-sky-600',
    text: 'text-white',
    ring: 'ring-sky-200 dark:ring-sky-950'
  },
  C: {
    bg: 'bg-amber-500',
    border: 'border-amber-600',
    text: 'text-white',
    ring: 'ring-amber-200 dark:ring-amber-950'
  },
  D: {
    bg: 'bg-purple-500',
    border: 'border-purple-600',
    text: 'text-white',
    ring: 'ring-purple-200 dark:ring-purple-950'
  }
};

// SVG Number Line Visual Component
interface QuizNumberLineViewProps {
  question: QuizQuestion;
  selectedOption: string | null;
  isAnswerChecked: boolean;
  onSelectOption: (option: string) => void;
}

const QuizNumberLineView: React.FC<QuizNumberLineViewProps> = ({
  question,
  selectedOption,
  isAnswerChecked,
  onSelectOption
}) => {
  const { min, max, step, labelStep, markers, type, correctAnswer } = question;

  const svgWidth = 800;
  const paddingLeft = 45;
  const paddingRight = 45;
  const usableWidth = svgWidth - paddingLeft - paddingRight;
  const lineY = 85;

  const getX = (val: number) => {
    const clamped = Math.max(min, Math.min(max, val));
    return paddingLeft + ((clamped - min) / (max - min)) * usableWidth;
  };

  // Generate ticks
  const ticks: { value: number; x: number; isMajor: boolean; label?: string }[] = [];
  const count = Math.round((max - min) / step);
  const safeCount = Math.min(count, 100);

  for (let i = 0; i <= safeCount; i++) {
    const val = min + i * step;
    const isMajor = Math.abs((val - min) % labelStep) < 0.001 || i === 0 || i === safeCount;
    ticks.push({
      value: val,
      x: getX(val),
      isMajor,
      label: isMajor ? formatNumberHU(val) : undefined
    });
  }

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-850/80 rounded-2xl border-2 border-slate-200/90 dark:border-slate-800 p-3 sm:p-4 select-none shadow-inner overflow-hidden">
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1 px-1">
        <div className="flex items-center gap-1.5 font-bold">
          <Ruler className="w-3.5 h-3.5 text-emerald-500" />
          <span>Tartomány: <strong className="text-slate-800 dark:text-slate-200">{formatNumberHU(min)} – {formatNumberHU(max)}</strong></span>
        </div>
        <div className="text-[11px] font-mono bg-white dark:bg-slate-800 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700">
          Lépésköz = <span className="font-bold text-emerald-600 dark:text-emerald-400">{formatNumberHU(step)}</span>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${svgWidth} 150`}
          className="w-full h-auto min-w-[550px] sm:min-w-[650px] transition-all"
        >
          {/* Axis Line */}
          <line
            x1={paddingLeft - 15}
            y1={lineY}
            x2={svgWidth - paddingRight + 20}
            y2={lineY}
            stroke="currentColor"
            className="text-slate-400 dark:text-slate-600"
            strokeWidth={3}
            strokeLinecap="round"
          />

          {/* Arrowhead */}
          <polygon
            points={`${svgWidth - paddingRight + 20},${lineY} ${svgWidth - paddingRight + 8},${lineY - 6} ${svgWidth - paddingRight + 8},${lineY + 6}`}
            fill="currentColor"
            className="text-slate-600 dark:text-slate-400"
          />

          {/* Ticks & Labels */}
          {ticks.map((t, idx) => (
            <g key={idx}>
              {t.isMajor ? (
                <>
                  <line
                    x1={t.x}
                    y1={lineY - 14}
                    x2={t.x}
                    y2={lineY + 14}
                    stroke="currentColor"
                    className="text-slate-700 dark:text-slate-300"
                    strokeWidth={2.5}
                  />
                  <text
                    x={t.x}
                    y={lineY + 36}
                    textAnchor="middle"
                    className="text-[12px] font-bold font-mono fill-slate-700 dark:fill-slate-300 tracking-tight"
                  >
                    {t.label}
                  </text>
                </>
              ) : (
                <line
                  x1={t.x}
                  y1={lineY - 7}
                  x2={t.x}
                  y2={lineY + 7}
                  stroke="currentColor"
                  className="text-slate-300 dark:text-slate-600"
                  strokeWidth={1.5}
                />
              )}
            </g>
          ))}

          {/* Interactive Marker Pins */}
          {markers.map((m) => {
            const mx = getX(m.value);
            const style = MARKER_STYLES[m.label] || {
              bg: 'bg-emerald-500',
              border: 'border-emerald-600',
              text: 'text-white',
              ring: 'ring-emerald-200 dark:ring-emerald-950'
            };

            const isSelected = selectedOption === `${m.label} pont` || selectedOption === m.label || (type === 'read' && selectedOption === m.value.toString());
            const isCorrect = correctAnswer === `${m.label} pont` || correctAnswer === m.label || (type === 'read' && correctAnswer === formatNumberHU(m.value));

            // Pin state color in check mode
            let pinColorClass = "fill-rose-500 stroke-rose-600";
            if (m.label === 'B') pinColorClass = "fill-sky-500 stroke-sky-600";
            if (m.label === 'C') pinColorClass = "fill-amber-500 stroke-amber-600";
            if (m.label === 'D') pinColorClass = "fill-purple-500 stroke-purple-600";
            if (type === 'read') pinColorClass = "fill-emerald-500 stroke-emerald-600";

            if (isAnswerChecked) {
              if (isCorrect) {
                pinColorClass = "fill-emerald-500 stroke-emerald-600";
              } else if (isSelected && !isCorrect) {
                pinColorClass = "fill-rose-500 stroke-rose-600";
              }
            }

            return (
              <g
                key={m.id}
                className={cn(
                  "transition-all",
                  type === 'locate' && !isAnswerChecked ? "cursor-pointer group" : ""
                )}
                onClick={() => {
                  if (type === 'locate' && !isAnswerChecked) {
                    onSelectOption(`${m.label} pont`);
                  }
                }}
              >
                {/* Vertical pointer line */}
                <line
                  x1={mx}
                  y1={28}
                  x2={mx}
                  y2={lineY}
                  stroke="currentColor"
                  className={cn(
                    "transition-all stroke-dasharray-[3,3]",
                    isAnswerChecked && isCorrect
                      ? "text-emerald-500 stroke-[2.5]"
                      : isSelected
                      ? "text-rose-500 stroke-[2.5]"
                      : "text-slate-400 dark:text-slate-500 stroke-[1.5]"
                  )}
                  strokeDasharray="4 3"
                />

                {/* Point on axis */}
                <circle
                  cx={mx}
                  cy={lineY}
                  r={6}
                  className={cn(
                    "transition-all",
                    isAnswerChecked && isCorrect
                      ? "fill-emerald-500 stroke-white stroke-2 shadow-lg"
                      : isSelected
                      ? "fill-rose-500 stroke-white stroke-2"
                      : "fill-slate-800 dark:fill-white stroke-slate-200 dark:stroke-slate-900 stroke-2"
                  )}
                />

                {/* Pin Badge on top */}
                <g transform={`translate(${mx}, 22)`}>
                  {/* Pin Background Shape */}
                  <rect
                    x={-18}
                    y={-18}
                    width={36}
                    height={28}
                    rx={8}
                    className={cn(
                      "transition-all duration-200 drop-shadow-md",
                      pinColorClass,
                      !isAnswerChecked && type === 'locate' ? "group-hover:scale-110 group-hover:-translate-y-1" : ""
                    )}
                  />

                  {/* Pin Label Text */}
                  <text
                    x={0}
                    y={0}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="text-[13px] font-black fill-white tracking-wider font-sans select-none pointer-events-none"
                  >
                    {m.label}
                  </text>

                  {/* Revealed value tag if answered */}
                  {isAnswerChecked && (
                    <g transform="translate(0, -26)">
                      <rect
                        x={-34}
                        y={-12}
                        width={68}
                        height={18}
                        rx={5}
                        className={cn(
                          "drop-shadow-xs",
                          isCorrect ? "fill-emerald-600" : "fill-slate-800"
                        )}
                      />
                      <text
                        x={0}
                        y={0}
                        textAnchor="middle"
                        dominantBaseline="central"
                        className="text-[10px] font-bold font-mono fill-white select-none pointer-events-none"
                      >
                        = {formatNumberHU(m.value)}
                      </text>
                    </g>
                  )}
                </g>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export const NumberLineQuiz: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [showCheatSheet, setShowCheatSheet] = useState(false);

  // Toggle fullscreen mode
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

  // Initialize level questions with randomized options
  const handleStartLevel = (level: DifficultyLevel) => {
    setSelectedLevel(level);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setScore(0);
    setStreak(0);
    setIsCompleted(false);

    const levelQuestions = QUIZ_LEVELS[level].questions.map(q => ({
      ...q,
      options: shuffleArray(q.options)
    }));
    setQuestions(levelQuestions);
  };

  const handleOptionClick = (option: string) => {
    if (isAnswerChecked || !selectedLevel) return;

    setSelectedOption(option);
    setIsAnswerChecked(true);

    const currentQuestion = questions[currentIndex] || QUIZ_LEVELS[selectedLevel].questions[currentIndex];
    const isCorrect = option === currentQuestion.correctAnswer;

    if (isCorrect) {
      setScore(prev => prev + 1);
      setStreak(prev => {
        const next = prev + 1;
        if (next > bestStreak) setBestStreak(next);
        return next;
      });

      // Confetti on streak
      if ((streak + 1) % 5 === 0 || (streak + 1) === 10) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      }
    } else {
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    if (!selectedLevel) return;
    const totalQuestions = questions.length || QUIZ_LEVELS[selectedLevel].questions.length;

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    } else {
      setIsCompleted(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  // Keyboard shortcut support [1, 2, 3, 4] and [Enter / Space]
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedLevel || isCompleted) return;

      const currentQuestion = questions[currentIndex];
      if (!currentQuestion) return;

      if (!isAnswerChecked) {
        if (['1', '2', '3', '4'].includes(e.key)) {
          const optIdx = parseInt(e.key, 10) - 1;
          if (optIdx >= 0 && optIdx < currentQuestion.options.length) {
            handleOptionClick(currentQuestion.options[optIdx]);
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
  }, [selectedLevel, isCompleted, isAnswerChecked, currentIndex, questions]);

  // 1. Level Selection Screen (when selectedLevel === null)
  if (selectedLevel === null) {
    return (
      <div
        ref={containerRef}
        className={cn(
          "w-full max-w-5xl mx-auto px-3 sm:px-6 py-4 animate-in fade-in duration-300 text-left",
          isFullscreen && "fixed inset-0 z-50 max-w-none w-screen h-screen bg-slate-100 dark:bg-slate-950 p-4 sm:p-6 overflow-y-auto"
        )}
      >
        {/* Navigation Bar */}
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.history.back()}
            className="rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            Vissza a témakörökhöz
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFullscreen}
              className="rounded-xl h-8 px-2.5 text-xs font-bold border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
              title={isFullscreen ? 'Kilépés a teljes képernyőből' : 'Teljes képernyős mód'}
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5 mr-1 text-emerald-600 dark:text-emerald-400" />
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
              variant="outline"
              size="sm"
              onClick={() => setShowCheatSheet(!showCheatSheet)}
              className="rounded-xl h-8 px-3 text-xs font-bold border-emerald-300 bg-emerald-50/50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800 hover:bg-emerald-100"
            >
              <BookOpen className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
              Számegyenes szabályok
            </Button>
          </div>
        </div>

        {/* Hero Header */}
        <div className="text-center max-w-2xl mx-auto mb-5">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center justify-center gap-2 mb-1">
            <span className="text-2xl">📏</span>
            <span>Számok a Számegyenesen Gyakorló</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Tanuld meg leolvasni a pontokat a számegyenesről, és helyezz el számokat az interaktív vizuális számegyenesen!
          </p>
        </div>

        {/* Cheat sheet popover/card */}
        {showCheatSheet && (
          <div className="mb-5 p-4 sm:p-5 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-slate-900 dark:to-slate-850 rounded-2xl border-2 border-emerald-200 dark:border-emerald-900/60 shadow-md animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm sm:text-base font-black text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Számegyenes legfontosabb fogalmai és szabályai
              </h3>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowCheatSheet(false)}
                className="text-emerald-800 dark:text-emerald-300 hover:bg-emerald-200/50 rounded-lg h-7 px-2 text-xs"
              >
                Bezárás
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {NUMBER_LINE_CHEAT_SHEET.map((item, idx) => (
                <div key={idx} className="bg-white/95 dark:bg-slate-800/95 p-2.5 rounded-xl border border-emerald-100 dark:border-slate-700 shadow-xs text-left">
                  <div className="text-xs font-black text-emerald-600 dark:text-emerald-400">{item.term}</div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">{item.desc}</div>
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
                onClick={() => handleStartLevel(level)}
                className="group relative bg-white dark:bg-slate-900 rounded-2xl p-5 border-2 border-slate-200/80 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-500/10 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-inner", cfg.iconBg)}>
                      <span className="font-serif font-black text-lg">{level === 1 ? 'I' : level === 2 ? 'II' : 'III'}</span>
                    </div>

                    <span className={cn("px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider border", cfg.badgeBg, cfg.badgeBorder, cfg.badgeText)}>
                      10 Feladat
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 dark:text-white mb-0.5 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
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
                      <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 truncate max-w-[170px]" title={cfg.focus}>{cfg.focus}</span>
                    </div>
                  </div>
                </div>

                <Button
                  className={cn(
                    "w-full h-10 rounded-xl font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-1.5",
                    level === 1
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                      : level === 2
                      ? "bg-amber-600 hover:bg-amber-700 text-white"
                      : "bg-purple-600 hover:bg-purple-700 text-white"
                  )}
                >
                  Kvíz Indítása
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const levelConfig = QUIZ_LEVELS[selectedLevel];
  const currentQuestion = questions[currentIndex] || levelConfig.questions[currentIndex];

  // 2. Quiz Completed View
  if (isCompleted) {
    const totalQuestions = levelConfig.questions.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    const isPerfect = score === totalQuestions;
    const isGood = score >= 7;

    return (
      <div
        ref={containerRef}
        className={cn(
          "max-w-xl mx-auto p-4 sm:p-6 text-center animate-in zoom-in-95 duration-300",
          isFullscreen && "fixed inset-0 z-50 max-w-none w-screen h-screen bg-slate-100 dark:bg-slate-950 p-4 sm:p-6 flex items-center justify-center overflow-y-auto"
        )}
      >
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl shadow-xl border-2 border-slate-200 dark:border-slate-800 relative overflow-hidden max-w-xl w-full">
          <div className="w-20 h-20 bg-gradient-to-tr from-emerald-500 to-teal-600 text-white rounded-3xl flex items-center justify-center mx-auto shadow-lg mb-4 ring-8 ring-emerald-100 dark:ring-emerald-950/60 animate-bounce">
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
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{score} / {totalQuestions}</div>
            </div>
            <div className="border-x border-slate-200 dark:border-slate-700">
              <div className="text-[11px] uppercase font-bold text-slate-400 mb-0.5">Eredmény</div>
              <div className="text-2xl font-black text-slate-800 dark:text-slate-100">{percentage}%</div>
            </div>
            <div>
              <div className="text-[11px] uppercase font-bold text-slate-400 mb-0.5">Legjobb széria</div>
              <div className="text-2xl font-black text-amber-500 flex items-center justify-center gap-1">
                <Zap className="w-4 h-4 fill-current" /> {bestStreak}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5">
            {selectedLevel < 3 && (
              <Button
                onClick={() => handleStartLevel((selectedLevel + 1) as DifficultyLevel)}
                className="flex-1 h-11 rounded-xl text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md flex items-center justify-center gap-1.5"
              >
                Következő szint: {selectedLevel + 1}. szint
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            )}

            <Button
              variant="outline"
              onClick={() => handleStartLevel(selectedLevel)}
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
            title={isFullscreen ? "Kilépés a teljes képernyőből" : "Teljes képernyős nézet"}
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-3.5 h-3.5 mr-1 text-emerald-600 dark:text-emerald-400" />
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
              onClick={() => handleStartLevel(lvl)}
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
          <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-3 py-1 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs text-xs">
            <div className="flex items-center gap-1 font-black text-emerald-600 dark:text-emerald-400">
              <Trophy className="w-3.5 h-3.5" />
              <span>{score} pont</span>
            </div>
            {streak > 1 && (
              <>
                <div className="w-px h-3 bg-slate-200 dark:bg-slate-700" />
                <div className="flex items-center gap-1 font-black text-amber-500 animate-pulse">
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  <span>{streak}x</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Container with Wordwall Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* LEFT / CENTER: Main Game Area (9 cols on large screen) */}
        <div className="lg:col-span-9 flex flex-col gap-3">
          {/* QUIZ MODE WORKSPACE WITH VISUAL NUMBER LINE */}
          <div className="space-y-3">
            {/* Slim Progress Bar */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400 px-1">
                <span>{levelConfig.title} feladványai</span>
                <span>{currentIndex + 1} / {questions.length || levelConfig.questions.length}</span>
              </div>
              <ProgressBar
                current={currentIndex + 1}
                total={questions.length || levelConfig.questions.length}
                color={selectedLevel === 1 ? 'emerald' : selectedLevel === 2 ? 'amber' : 'purple'}
              />
            </div>

            {/* Main Question Card + Interactive Number Line */}
            <Card className="rounded-2xl border-2 border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
              <CardContent className="p-4 sm:p-5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {currentQuestion.type === 'read' ? (
                      <Eye className="w-3 h-3 text-emerald-600" />
                    ) : (
                      <MapPin className="w-3 h-3 text-amber-600" />
                    )}
                    {currentQuestion.questionTypeBadge}
                  </div>

                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    {currentQuestion.type === 'locate' ? 'Kattinthatsz a számegyenes betűire is!' : 'Olvasd le a pont értékét!'}
                  </div>
                </div>

                {/* Question Prompt */}
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  {currentQuestion.prompt}
                </h3>

                {/* Interactive SVG Number Line */}
                <QuizNumberLineView
                  question={currentQuestion}
                  selectedOption={selectedOption}
                  isAnswerChecked={isAnswerChecked}
                  onSelectOption={handleOptionClick}
                />
              </CardContent>
            </Card>

            {/* Bottom Row: Explanation (if answered) & 4 Answer Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 items-start">
              {/* Left: Feedback / Explanation Card */}
              {isAnswerChecked ? (
                <div className="space-y-2.5 animate-in fade-in duration-200">
                  <div className={cn(
                    "p-3.5 sm:p-4 rounded-2xl border-2 transition-all",
                    selectedOption === currentQuestion.correctAnswer
                      ? "bg-emerald-50/80 border-emerald-300 dark:bg-emerald-950/40 dark:border-emerald-800"
                      : "bg-rose-50/80 border-rose-300 dark:bg-rose-950/40 dark:border-rose-800"
                  )}>
                    <div className="flex items-start gap-2.5 text-left">
                      {selectedOption === currentQuestion.correctAnswer ? (
                        <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                          <XCircle className="w-4 h-4" />
                        </div>
                      )}

                      <div className="flex-1">
                        <h4 className={cn(
                          "text-xs sm:text-sm font-black mb-1",
                          selectedOption === currentQuestion.correctAnswer
                            ? "text-emerald-900 dark:text-emerald-200"
                            : "text-rose-900 dark:text-rose-200"
                        )}>
                          {selectedOption === currentQuestion.correctAnswer ? 'Helyes Megoldás! 🎉' : 'Nem jó megoldás! 🤔'}
                        </h4>
                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium mb-2">
                          {currentQuestion.explanation}
                        </p>

                        {currentQuestion.breakdown && (
                          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Levezetés:</span>
                            {currentQuestion.breakdown.map((item, bIdx) => (
                              <span
                                key={bIdx}
                                className="px-1.5 py-0.5 rounded-md bg-white/90 dark:bg-slate-800/90 text-[10px] font-bold font-mono text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                              >
                                {item.label}: <span className="text-emerald-600 dark:text-emerald-400">{item.value}</span>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleNextQuestion}
                    className="w-full h-11 rounded-xl text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white dark:bg-emerald-600 dark:hover:bg-emerald-700 shadow-sm transition-all flex items-center justify-center gap-1.5"
                  >
                    {currentIndex < (questions.length || levelConfig.questions.length) - 1 ? (
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
              ) : (
                <div className="p-4 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 flex items-center justify-center min-h-[140px] text-center">
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
                      {currentQuestion.type === 'locate'
                        ? 'Válaszd ki a helyes pont betűjelét (A, B, C vagy D) a gombokkal vagy kattints a számegyenesre!'
                        : 'Számold ki a lépésközt, és válaszd ki a leolvasott számot a 4 lehetőség közül!'}
                    </div>
                    <div className="text-[11px] text-slate-400 dark:text-slate-500">
                      Használhatod a billentyűzet 1, 2, 3, 4 gombjait is!
                    </div>
                  </div>
                </div>
              )}

              {/* Right: 4 Answer Options */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Válaszlehetőségek:
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500">
                    Billentyűk: [1, 2, 3, 4]
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {currentQuestion.options.map((option, idx) => {
                    const isSelected = selectedOption === option;
                    const isCorrect = option === currentQuestion.correctAnswer;

                    let buttonStyle = "bg-white dark:bg-slate-900 border-2 border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-slate-100 hover:border-emerald-500 hover:shadow-xs";

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
                          "relative min-h-12 sm:min-h-13 py-2 rounded-xl font-bold text-sm sm:text-base transition-all duration-150 flex items-center justify-between px-4 text-left",
                          buttonStyle
                        )}
                      >
                        <span className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-sans font-bold flex items-center justify-center border border-slate-200 dark:border-slate-700 shrink-0">
                            {idx + 1}
                          </span>
                          <span className="leading-snug font-mono text-base">{option}</span>
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
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Standard 3-Box Wordwall-Style Sidebar (3 cols on large screen) */}
        <div className="lg:col-span-3 flex flex-col gap-3">
          {/* BOX 1: Információ / Játékmód */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200/80 dark:border-slate-800 p-3.5 shadow-xs">
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-100 dark:border-slate-800">
              <Layers className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Játékmód
              </span>
            </div>

            <div className="p-2.5 rounded-xl border bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <Ruler className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold">Interaktív Számegyenes</div>
                  <div className="text-[10px] text-emerald-700 dark:text-emerald-400">Leolvasás és elhelyezés</div>
                </div>
              </div>
            </div>
          </div>

          {/* BOX 2: Nehézségi Szint Választó */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200/80 dark:border-slate-800 p-3.5 shadow-xs">
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-100 dark:border-slate-800">
              <Flame className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Nehézségi szint
              </span>
            </div>

            <div className="space-y-1.5">
              {([1, 2, 3] as DifficultyLevel[]).map((lvl) => {
                const cfg = QUIZ_LEVELS[lvl];
                const isActive = selectedLevel === lvl;

                return (
                  <button
                    key={lvl}
                    onClick={() => handleStartLevel(lvl)}
                    className={cn(
                      "w-full flex items-center justify-between p-2 rounded-xl border text-left transition-all",
                      isActive
                        ? "bg-slate-900 text-white dark:bg-emerald-600 dark:text-white border-transparent shadow-xs"
                        : "border-slate-200/70 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black",
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                      )}>
                        {lvl}
                      </div>
                      <div>
                        <div className="text-xs font-bold leading-tight">{cfg.title.replace(/^\d+\.\s*/, '')}</div>
                        <div className={cn("text-[9px] truncate max-w-[130px]", isActive ? "text-slate-200" : "text-slate-400")}>
                          {cfg.range}
                        </div>
                      </div>
                    </div>

                    {isActive && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 dark:text-white shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* BOX 3: Segédlet, Teljes képernyő & Újraindítás */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200/80 dark:border-slate-800 p-3.5 shadow-xs space-y-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFullscreen}
              className="w-full h-8 rounded-xl text-xs font-bold border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1.5"
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  Ablakos nézet
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5" />
                  Teljes képernyő
                </>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCheatSheet(!showCheatSheet)}
              className="w-full h-8 rounded-xl text-xs font-bold border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              {showCheatSheet ? 'Szabályzat elrejtése' : 'Szabályzat és segítség'}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleStartLevel(selectedLevel)}
              className="w-full h-8 rounded-xl text-xs font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Játék újraindítása
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumberLineQuiz;

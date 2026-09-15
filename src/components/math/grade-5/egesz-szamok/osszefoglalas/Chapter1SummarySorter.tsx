import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export const SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    categories: [
      {
        id: 'positive',
        name: 'Pozitív számok (> 0)',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300'
      },
      {
        id: 'zero',
        name: 'Nulla (Semleges)',
        badgeColor: 'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-300'
      },
      {
        id: 'negative',
        name: 'Negatív számok (< 0)',
        badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300 dark:bg-cyan-950/60 dark:text-cyan-300'
      }
    ],
    items: [
      { id: '1-1', label: '+15', category: 'positive' },
      { id: '1-2', label: '-4', category: 'negative' },
      { id: '1-3', label: '0', category: 'zero' },
      { id: '1-4', label: '+100', category: 'positive' },
      { id: '1-5', label: '-25', category: 'negative' },
      { id: '1-6', label: '-1', category: 'negative' },
      { id: '1-7', label: '+7', category: 'positive' },
      { id: '1-8', label: '0 (eredet)', category: 'zero' },
      { id: '1-9', label: '-50', category: 'negative' },
      { id: '1-10', label: '+3', category: 'positive' }
    ]
  },
  2: {
    categories: [
      {
        id: 'roman',
        name: 'Római számok',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300'
      },
      {
        id: 'binary',
        name: 'Kettes rendszer (Bináris)',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300'
      },
      {
        id: 'decimal',
        name: 'Tízes rendszer (Decimális)',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300'
      }
    ],
    items: [
      { id: '2-1', label: 'XIV', category: 'roman' },
      { id: '2-2', label: '101₂', category: 'binary' },
      { id: '2-3', label: '450', category: 'decimal' },
      { id: '2-4', label: 'MCMLXXX', category: 'roman' },
      { id: '2-5', label: '1111₂', category: 'binary' },
      { id: '2-6', label: '2026', category: 'decimal' },
      { id: '2-7', label: 'DCCL', category: 'roman' },
      { id: '2-8', label: '10000₂', category: 'binary' },
      { id: '2-9', label: '88', category: 'decimal' },
      { id: '2-10', label: 'IX', category: 'roman' }
    ]
  },
  3: {
    categories: [
      {
        id: 'neg',
        name: 'Eredmény < 0 (Negatív)',
        badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300 dark:bg-cyan-950/60 dark:text-cyan-300'
      },
      {
        id: 'null',
        name: 'Eredmény = 0 (Nulla)',
        badgeColor: 'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-300'
      },
      {
        id: 'pos',
        name: 'Eredmény > 0 (Pozitív)',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300'
      }
    ],
    items: [
      { id: '3-1', label: '(-5) + (-3)', category: 'neg' },
      { id: '3-2', label: '(-8) - (-8)', category: 'null' },
      { id: '3-3', label: '|-15| - 5', category: 'pos' },
      { id: '3-4', label: '(-10) + 12', category: 'pos' },
      { id: '3-5', label: '0 · (-50)', category: 'null' },
      { id: '3-6', label: '(-12) - (+4)', category: 'neg' },
      { id: '3-7', label: '20 - 25', category: 'neg' },
      { id: '3-8', label: '4 + (-4)', category: 'null' },
      { id: '3-9', label: '(-7) - (-15)', category: 'pos' },
      { id: '3-10', label: '100 : 25', category: 'pos' }
    ]
  }
};

export interface Chapter1SummarySorterProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
}

export function Chapter1SummarySorter({
  onBack,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onSwitchToTheory,
  level = 1
}: Chapter1SummarySorterProps) {
  return (
    <SorterTemplate
      title="I. Fejezet Összefoglalás - Csoportosító"
      subtitle="Válaszd ki a kártyát, majd kattints a megfelelő kategóriára!"
      level={level}
      levels={SORTER_LEVELS}
    />
  );
}

export default Chapter1SummarySorter;

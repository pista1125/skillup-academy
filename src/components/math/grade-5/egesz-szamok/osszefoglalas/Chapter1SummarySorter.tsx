import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  RotateCcw,
  Trophy,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  HelpCircle,
  FolderCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { DifficultyLevel } from './Chapter1SummaryQuiz';

interface SorterCategory {
  id: string;
  name: string;
  color: string;
  borderColor: string;
  bgColor: string;
  textColor: string;
}

interface SorterItem {
  id: string;
  label: string;
  correctCategoryId: string;
}

interface SorterData {
  title: string;
  instruction: string;
  categories: SorterCategory[];
  items: SorterItem[];
}

const SORTER_LEVELS: Record<DifficultyLevel, SorterData> = {
  1: {
    title: 'Számok Előjel szerinti Csoportosítása',
    instruction: 'Sorold be az alábbi számokat a megfelelő előjeles kategóriába!',
    categories: [
      {
        id: 'positive',
        name: 'Pozitív számok (> 0)',
        color: 'emerald',
        borderColor: 'border-emerald-300 dark:border-emerald-700',
        bgColor: 'bg-emerald-50/60 dark:bg-emerald-950/20',
        textColor: 'text-emerald-700 dark:text-emerald-300'
      },
      {
        id: 'zero',
        name: 'Nulla (Semleges)',
        color: 'slate',
        borderColor: 'border-slate-300 dark:border-slate-700',
        bgColor: 'bg-slate-50/60 dark:bg-slate-900/40',
        textColor: 'text-slate-700 dark:text-slate-300'
      },
      {
        id: 'negative',
        name: 'Negatív számok (< 0)',
        color: 'cyan',
        borderColor: 'border-cyan-300 dark:border-cyan-700',
        bgColor: 'bg-cyan-50/60 dark:bg-cyan-950/20',
        textColor: 'text-cyan-700 dark:text-cyan-300'
      }
    ],
    items: [
      { id: '1-1', label: '+15', correctCategoryId: 'positive' },
      { id: '1-2', label: '-4', correctCategoryId: 'negative' },
      { id: '1-3', label: '0', correctCategoryId: 'zero' },
      { id: '1-4', label: '+100', correctCategoryId: 'positive' },
      { id: '1-5', label: '-25', correctCategoryId: 'negative' },
      { id: '1-6', label: '-1', correctCategoryId: 'negative' },
      { id: '1-7', label: '+7', correctCategoryId: 'positive' },
      { id: '1-8', label: '0 (eredet)', correctCategoryId: 'zero' },
      { id: '1-9', label: '-50', correctCategoryId: 'negative' },
      { id: '1-10', label: '+3', correctCategoryId: 'positive' }
    ]
  },
  2: {
    title: 'Számírási Formátumok Szétválogatása',
    instruction: 'Döntsd el, hogy az adott felírás melyik számrendszerhez vagy írásmódhoz tartozik!',
    categories: [
      {
        id: 'roman',
        name: 'Római számok',
        color: 'amber',
        borderColor: 'border-amber-300 dark:border-amber-700',
        bgColor: 'bg-amber-50/60 dark:bg-amber-950/20',
        textColor: 'text-amber-700 dark:text-amber-300'
      },
      {
        id: 'binary',
        name: 'Kettes rendszer (Bináris)',
        color: 'indigo',
        borderColor: 'border-indigo-300 dark:border-indigo-700',
        bgColor: 'bg-indigo-50/60 dark:bg-indigo-950/20',
        textColor: 'text-indigo-700 dark:text-indigo-300'
      },
      {
        id: 'decimal',
        name: 'Tízes rendszer (Decimális)',
        color: 'blue',
        borderColor: 'border-blue-300 dark:border-blue-700',
        bgColor: 'bg-blue-50/60 dark:bg-blue-950/20',
        textColor: 'text-blue-700 dark:text-blue-300'
      }
    ],
    items: [
      { id: '2-1', label: 'XIV', correctCategoryId: 'roman' },
      { id: '2-2', label: '101₂', correctCategoryId: 'binary' },
      { id: '2-3', label: '450', correctCategoryId: 'decimal' },
      { id: '2-4', label: 'MCMLXXX', correctCategoryId: 'roman' },
      { id: '2-5', label: '1111₂', correctCategoryId: 'binary' },
      { id: '2-6', label: '2026', correctCategoryId: 'decimal' },
      { id: '2-7', label: 'DCCL', correctCategoryId: 'roman' },
      { id: '2-8', label: '10000₂', correctCategoryId: 'binary' },
      { id: '2-9', label: '88', correctCategoryId: 'decimal' },
      { id: '2-10', label: 'IX', correctCategoryId: 'roman' }
    ]
  },
  3: {
    title: 'Kifejezések Eredményének Értéktartománya',
    instruction: 'Számold ki vagy becsüld meg a kifejezések értékét, és csoportosítsd őket!',
    categories: [
      {
        id: 'neg',
        name: 'Eredmény < 0 (Negatív)',
        color: 'cyan',
        borderColor: 'border-cyan-300 dark:border-cyan-700',
        bgColor: 'bg-cyan-50/60 dark:bg-cyan-950/20',
        textColor: 'text-cyan-700 dark:text-cyan-300'
      },
      {
        id: 'null',
        name: 'Eredmény = 0 (Nulla)',
        color: 'slate',
        borderColor: 'border-slate-300 dark:border-slate-700',
        bgColor: 'bg-slate-50/60 dark:bg-slate-900/40',
        textColor: 'text-slate-700 dark:text-slate-300'
      },
      {
        id: 'pos',
        name: 'Eredmény > 0 (Pozitív)',
        color: 'emerald',
        borderColor: 'border-emerald-300 dark:border-emerald-700',
        bgColor: 'bg-emerald-50/60 dark:bg-emerald-950/20',
        textColor: 'text-emerald-700 dark:text-emerald-300'
      }
    ],
    items: [
      { id: '3-1', label: '(-5) + (-3)', correctCategoryId: 'neg' },
      { id: '3-2', label: '(-8) - (-8)', correctCategoryId: 'null' },
      { id: '3-3', label: '|-15| - 5', correctCategoryId: 'pos' },
      { id: '3-4', label: '(-10) + 12', correctCategoryId: 'pos' },
      { id: '3-5', label: '0 · (-50)', correctCategoryId: 'null' },
      { id: '3-6', label: '(-12) - (+4)', correctCategoryId: 'neg' },
      { id: '3-7', label: '20 - 25', correctCategoryId: 'neg' },
      { id: '3-8', label: '4 + (-4)', correctCategoryId: 'null' },
      { id: '3-9', label: '(-7) - (-15)', correctCategoryId: 'pos' },
      { id: '3-10', label: '100 : 25', correctCategoryId: 'pos' }
    ]
  }
};

interface Chapter1SummarySorterProps {
  level: DifficultyLevel;
  onLevelChange: (lvl: DifficultyLevel) => void;
}

export function Chapter1SummarySorter({
  level,
  onLevelChange
}: Chapter1SummarySorterProps) {
  const currentConfig = SORTER_LEVELS[level] || SORTER_LEVELS[1];

  const [activeItemIndex, setActiveItemIndex] = useState<number>(0);
  const [assigned, setAssigned] = useState<Record<string, string[]>>({});
  const [mistakes, setMistakes] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  useEffect(() => {
    initSorter();
  }, [level]);

  const initSorter = () => {
    setActiveItemIndex(0);
    const initialAssigned: Record<string, string[]> = {};
    currentConfig.categories.forEach(c => {
      initialAssigned[c.id] = [];
    });
    setAssigned(initialAssigned);
    setMistakes(0);
    setIsCompleted(false);
    setFeedback(null);
  };

  const currentItem = currentConfig.items[activeItemIndex];

  const handleCategorySelect = (catId: string) => {
    if (!currentItem || isCompleted || feedback) return;

    if (currentItem.correctCategoryId === catId) {
      // Correct!
      setFeedback({ isCorrect: true, text: 'Helyes besorolás! 🎉' });
      setAssigned(prev => ({
        ...prev,
        [catId]: [...prev[catId], currentItem.label]
      }));

      setTimeout(() => {
        setFeedback(null);
        if (activeItemIndex + 1 < currentConfig.items.length) {
          setActiveItemIndex(i => i + 1);
        } else {
          setIsCompleted(true);
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        }
      }, 500);
    } else {
      // Wrong
      setMistakes(m => m + 1);
      setFeedback({ isCorrect: false, text: 'Nem ebbe a csoportba tartozik! Próbáld újra!' });
      setTimeout(() => {
        setFeedback(null);
      }, 900);
    }
  };

  return (
    <div className="space-y-4">
      {/* Sorter Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-sm">
            🗂️
          </span>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
              {currentConfig.title}
            </h3>
            <p className="text-[11px] text-slate-500">{currentConfig.instruction}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">
            Haladás: <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{activeItemIndex} / {currentConfig.items.length}</span>
          </div>

          <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">
            Hibák: <span className="font-mono font-bold text-rose-500">{mistakes}</span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={initSorter}
            className="h-8 px-2.5 rounded-xl text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" />
            Újra
          </Button>
        </div>
      </div>

      {/* Active Item to Sort */}
      {!isCompleted && currentItem && (
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border-2 border-indigo-200 dark:border-indigo-800/80 shadow-md text-center space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
            Hová tartozik ez az elem? ({activeItemIndex + 1}. / {currentConfig.items.length})
          </span>
          <div className="text-2xl sm:text-3xl font-black font-mono tracking-wide text-slate-900 dark:text-white">
            {currentItem.label}
          </div>

          {feedback && (
            <div
              className={cn(
                "text-xs font-bold py-1 px-3 rounded-full inline-block animate-in fade-in zoom-in-95 duration-200",
                feedback.isCorrect
                  ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300"
                  : "bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300"
              )}
            >
              {feedback.text}
            </div>
          )}
        </div>
      )}

      {/* 3 Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {currentConfig.categories.map(cat => {
          const itemsInCat = assigned[cat.id] || [];

          return (
            <div
              key={cat.id}
              className={cn(
                "p-4 rounded-2xl border-2 transition-all duration-200 flex flex-col justify-between min-h-[160px]",
                cat.bgColor,
                cat.borderColor
              )}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className={cn("text-xs font-bold uppercase tracking-wide", cat.textColor)}>
                    {cat.name}
                  </h4>
                  <span className="text-[11px] font-bold font-mono px-2 py-0.5 rounded-full bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300">
                    {itemsInCat.length}
                  </span>
                </div>

                {/* Items bucket */}
                <div className="flex flex-wrap gap-1.5 min-h-[50px]">
                  {itemsInCat.map((itm, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-xl bg-white dark:bg-slate-900 text-xs font-mono font-bold border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 shadow-2xs"
                    >
                      {itm}
                    </span>
                  ))}
                </div>
              </div>

              {!isCompleted && (
                <Button
                  onClick={() => handleCategorySelect(cat.id)}
                  className="mt-3 w-full rounded-xl text-xs font-bold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
                >
                  Ide helyezem
                </Button>
              )}
            </div>
          );
        })}
      </div>

      {/* Completion Win Card */}
      {isCompleted && (
        <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-500/15 via-indigo-500/15 to-emerald-500/15 border-2 border-purple-300 dark:border-purple-700 text-center space-y-3 animate-in zoom-in-95 duration-300">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-purple-500/20 text-purple-500 flex items-center justify-center text-3xl">
            🏆
          </div>
          <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
            Remek munka! Mind a 10 elemet hibátlanul csoportosítottad!
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Összes hiba: <strong className="font-mono text-rose-600">{mistakes}</strong>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <Button
              variant="outline"
              onClick={initSorter}
              className="rounded-xl text-xs font-bold border-slate-300 dark:border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" />
              Újra ezen a szinten
            </Button>

            {level < 3 && (
              <Button
                onClick={() => onLevelChange((level + 1) as DifficultyLevel)}
                className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs"
              >
                Következő szint ({level + 1}. szint)
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

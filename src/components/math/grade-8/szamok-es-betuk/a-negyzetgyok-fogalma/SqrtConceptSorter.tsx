import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SqrtConceptSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const SqrtConceptSorter: React.FC<SqrtConceptSorterProps> = ({
  onBack,
  onSwitchToTheory,
  level,
  onNextLevel,
  onOpenRules
}) => {
  const [currentLevel, setCurrentLevel] = useState<DifficultyLevel>(level || 1);

  useEffect(() => {
    if (level) {
      setCurrentLevel(level);
    }
  }, [level]);

  const levels: Record<DifficultyLevel, SorterLevelConfig> = {
    // 1. SZINT: KIFEJEZÉSEK ÉRTELMEZÉSE ÉS ELŐJELE
    1: {
      categories: [
        { id: 'undef', name: 'Nem értelmezhető (a < 0)', badgeColor: 'bg-slate-200 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700' },
        { id: 'nonneg', name: 'Pozitív vagy nulla (≥ 0)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' },
        { id: 'neg', name: 'Negatív érték (< 0)', badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800' }
      ],
      items: [
        { id: 'i1-1', label: '√(-9)', category: 'undef' },
        { id: 'i1-2', label: '√49 (= 7)', category: 'nonneg' },
        { id: 'i1-3', label: '-√25 (= -5)', category: 'neg' },
        { id: 'i1-4', label: '√(-100)', category: 'undef' },
        { id: 'i1-5', label: '√((-5)²) (= 5)', category: 'nonneg' },
        { id: 'i1-6', label: '-√64 (= -8)', category: 'neg' },
        { id: 'i1-7', label: '√(4 - 10)', category: 'undef' },
        { id: 'i1-8', label: '√0 (= 0)', category: 'nonneg' },
        { id: 'i1-9', label: '-√((-3)²) (= -3)', category: 'neg' }
      ]
    },

    // 2. SZINT: ÉRTELMEZÉSI TARTOMÁNY (KIKÖTÉSEK)
    2: {
      categories: [
        { id: 'ge', name: 'x ≥ a (Alsó korlát)', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800' },
        { id: 'le', name: 'x ≤ a (Felső korlát)', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800' },
        { id: 'all', name: 'Minden valós számra (x ∈ ℝ)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' }
      ],
      items: [
        { id: 'i2-1', label: '√(x - 2) (x ≥ 2)', category: 'ge' },
        { id: 'i2-2', label: '√(5 - x) (x ≤ 5)', category: 'le' },
        { id: 'i2-3', label: '√(x² + 1)', category: 'all' },
        { id: 'i2-4', label: '√(2x - 6) (x ≥ 3)', category: 'ge' },
        { id: 'i2-5', label: '√(10 - 2x) (x ≤ 5)', category: 'le' },
        { id: 'i2-6', label: '√(x² + 9)', category: 'all' },
        { id: 'i2-7', label: '√(x - 7) (x ≥ 7)', category: 'ge' },
        { id: 'i2-8', label: '√(-x) (x ≤ 0)', category: 'le' },
        { id: 'i2-9', label: '√(x⁴ + 4)', category: 'all' }
      ]
    },

    // 3. SZINT: NÉGYZETGYÖKÖK BECSLÉSE (EGÉSZ SZÁMOK KÖZÉ ZÁRÁS)
    3: {
      categories: [
        { id: 'b56', name: '5 és 6 közé esik (25 < x < 36)', badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800' },
        { id: 'b78', name: '7 és 8 közé esik (49 < x < 64)', badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800' },
        { id: 'b910', name: '9 és 10 közé esik (81 < x < 100)', badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800' }
      ],
      items: [
        { id: 'i3-1', label: '√28', category: 'b56' },
        { id: 'i3-2', label: '√50', category: 'b78' },
        { id: 'i3-3', label: '√85', category: 'b910' },
        { id: 'i3-4', label: '√32', category: 'b56' },
        { id: 'i3-5', label: '√55', category: 'b78' },
        { id: 'i3-6', label: '√90', category: 'b910' },
        { id: 'i3-7', label: '√35', category: 'b56' },
        { id: 'i3-8', label: '√60', category: 'b78' },
        { id: 'i3-9', label: '√95', category: 'b910' }
      ]
    }
  };

  const activeLevel = level ?? currentLevel;

  return (
    <div className="w-full space-y-4">
      {/* Top Standalone Header (only when not embedded in QuizTemplate) */}
      {!level && (onBack || onSwitchToTheory) && (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {onBack && (
              <Button
                variant="outline"
                size="sm"
                onClick={onBack}
                className="rounded-xl border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Vissza a témakörökhöz
              </Button>
            )}

            {onSwitchToTheory && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onSwitchToTheory}
                className="text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl"
              >
                📘 Tananyag áttekintése
              </Button>
            )}
          </div>

          {/* Level Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            {([1, 2, 3] as DifficultyLevel[]).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setCurrentLevel(lvl)}
                className={cn(
                  "px-3 py-1 text-xs font-bold rounded-lg transition-all",
                  activeLevel === lvl
                    ? "bg-rose-600 text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900"
                )}
              >
                {lvl}. Szint
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sorter Board */}
      <SorterTemplate
        level={activeLevel}
        title="Négyzetgyök Csoportosító"
        subtitle={
          activeLevel === 1
            ? "Csoportosítsd a gyökös kifejezéseket értelmezhetőségük és előjelük szerint!"
            : activeLevel === 2
            ? "Válogasd szét a kifejezéseket az értelmezési tartományuk jellege alapján!"
            : "Helyezd el a négyzetgyököket a megfelelő egész számok közötti dobozokba!"
        }
        levels={levels}
        onNextLevel={() => {
          if (onNextLevel) {
            onNextLevel();
          } else if (currentLevel < 3) {
            setCurrentLevel((prev) => (prev + 1) as DifficultyLevel);
          }
        }}
        onOpenRules={onOpenRules}
        themeColor="rose"
      />
    </div>
  );
};

export default SqrtConceptSorter;

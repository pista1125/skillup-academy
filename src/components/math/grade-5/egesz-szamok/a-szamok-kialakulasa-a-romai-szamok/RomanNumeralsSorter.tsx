import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface RomanNumeralsSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const RomanNumeralsSorter: React.FC<RomanNumeralsSorterProps> = ({
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
    // 1. SZINT: JELTÍPUSOK SZERINTI CSOPORTOSÍTÁS
    1: {
      categories: [
        { id: 'base', name: 'Alapjelek (I, X, C)', badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800' },
        { id: 'aux', name: 'Segédjelek (V, L)', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800' },
        { id: 'composite', name: 'Összetett számok', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' }
      ],
      items: [
        { id: 'i1-1', label: 'I (1)', category: 'base' },
        { id: 'i1-2', label: 'X (10)', category: 'base' },
        { id: 'i1-3', label: 'C (100)', category: 'base' },
        { id: 'i1-4', label: 'V (5)', category: 'aux' },
        { id: 'i1-5', label: 'L (50)', category: 'aux' },
        { id: 'i1-6', label: 'IV (4)', category: 'composite' },
        { id: 'i1-7', label: 'VI (6)', category: 'composite' },
        { id: 'i1-8', label: 'IX (9)', category: 'composite' },
        { id: 'i1-9', label: 'XV (15)', category: 'composite' },
        { id: 'i1-10', label: 'XX (20)', category: 'composite' },
        { id: 'i1-11', label: 'XIV (14)', category: 'composite' },
        { id: 'i1-12', label: 'VIII (8)', category: 'composite' }
      ]
    },

    // 2. SZINT: SZÁMKÖR SZERINTI CSOPORTOSÍTÁS
    2: {
      categories: [
        { id: 'r1', name: '1 – 20 között', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' },
        { id: 'r2', name: '21 – 50 között', badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800' },
        { id: 'r3', name: '51 – 100 között', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800' }
      ],
      items: [
        { id: 'i2-1', label: 'VIII (8)', category: 'r1' },
        { id: 'i2-2', label: 'XIV (14)', category: 'r1' },
        { id: 'i2-3', label: 'XIX (19)', category: 'r1' },
        { id: 'i2-4', label: 'XX (20)', category: 'r1' },
        { id: 'i2-5', label: 'XXIV (24)', category: 'r2' },
        { id: 'i2-6', label: 'XXXV (35)', category: 'r2' },
        { id: 'i2-7', label: 'XLIV (44)', category: 'r2' },
        { id: 'i2-8', label: 'XLIX (49)', category: 'r2' },
        { id: 'i2-9', label: 'L (50)', category: 'r2' },
        { id: 'i2-10', label: 'LVI (56)', category: 'r3' },
        { id: 'i2-11', label: 'LXXV (75)', category: 'r3' },
        { id: 'i2-12', label: 'XCIX (99)', category: 'r3' }
      ]
    },

    // 3. SZINT: KÉPZÉSI SZABÁLY SZERINTI CSOPORTOSÍTÁS
    3: {
      categories: [
        { id: 'additive', name: 'Csak összeadás', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' },
        { id: 'subtractive', name: 'Kivonást tartalmaz (pl. IV, IX, XL, XC)', badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800' },
        { id: 'single', name: 'Egyetlen alap- vagy segédjel', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800' }
      ],
      items: [
        { id: 'i3-1', label: 'VI (5+1)', category: 'additive' },
        { id: 'i3-2', label: 'XIII (10+3)', category: 'additive' },
        { id: 'i3-3', label: 'XXVII (20+7)', category: 'additive' },
        { id: 'i3-4', label: 'LXX (50+20)', category: 'additive' },
        { id: 'i3-5', label: 'IV (5-1)', category: 'subtractive' },
        { id: 'i3-6', label: 'IX (10-1)', category: 'subtractive' },
        { id: 'i3-7', label: 'XLIV (40+4)', category: 'subtractive' },
        { id: 'i3-8', label: 'XCIX (90+9)', category: 'subtractive' },
        { id: 'i3-9', label: 'I', category: 'single' },
        { id: 'i3-10', label: 'V', category: 'single' },
        { id: 'i3-11', label: 'X', category: 'single' },
        { id: 'i3-12', label: 'L', category: 'single' }
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
                className="text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 rounded-xl"
              >
                📘 Tananyag áttekintése
              </Button>
            )}
          </div>

          {/* Level Selector */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            {([1, 2, 3] as DifficultyLevel[]).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setCurrentLevel(lvl)}
                className={cn(
                  "px-3 py-1 text-xs font-bold rounded-lg transition-all",
                  activeLevel === lvl
                    ? "bg-amber-600 text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900"
                )}
              >
                {lvl}. Szint
              </button>
            ))}
          </div>
        </div>
      )}

      <SorterTemplate
        level={activeLevel}
        title="Római számok csoportosító játék"
        subtitle={
          activeLevel === 1
            ? "Válogasd szét a számokat alapjelek, segédjelek és összetett római számok szerint!"
            : activeLevel === 2
            ? "Csoportosítsd a római számokat a számkörük (1–20, 21–50, 51–100) szerint!"
            : "Válogasd szét a számokat a képzési szabályuk (összeadás, kivonás vagy egyedi jel) alapján!"
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
      />
    </div>
  );
};

export default RomanNumeralsSorter;

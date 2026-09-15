import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SetBasicsSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const SetBasicsSorter: React.FC<SetBasicsSorterProps> = ({
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
    // 1. SZINT: SZÁMOK BESOROLÁSA SZÁMHALMAZOKBA
    1: {
      categories: [
        { id: 'nat', name: 'Természetes számok (ℕ)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' },
        { id: 'neg-int', name: 'Negatív egész számok (ℤ \\ ℕ)', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800' },
        { id: 'frac', name: 'Törtek & Tizedestörtek (ℚ \\ ℤ)', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800' }
      ],
      items: [
        { id: 'i1-1', label: '8', category: 'nat' },
        { id: 'i1-2', label: '0', category: 'nat' },
        { id: 'i1-3', label: '25', category: 'nat' },
        { id: 'i1-4', label: '104', category: 'nat' },
        { id: 'i1-5', label: '-7', category: 'neg-int' },
        { id: 'i1-6', label: '-14', category: 'neg-int' },
        { id: 'i1-7', label: '-1', category: 'neg-int' },
        { id: 'i1-8', label: '-89', category: 'neg-int' },
        { id: 'i1-9', label: '3/4', category: 'frac' },
        { id: 'i1-10', label: '-2.5', category: 'frac' },
        { id: 'i1-11', label: '0.8', category: 'frac' },
        { id: 'i1-12', label: '-1/3', category: 'frac' }
      ]
    },

    // 2. SZINT: HALMAZOK TÍPUSAI ÉS JELLEGE
    2: {
      categories: [
        { id: 'finite', name: 'Véges Halmaz (|A| < ∞)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' },
        { id: 'infinite', name: 'Végtelen Halmaz (|A| = ∞)', badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800' },
        { id: 'empty', name: 'Üres Halmaz (∅, |A| = 0)', badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800' }
      ],
      items: [
        { id: 'i2-1', label: 'A 20-nál kisebb prímszámok', category: 'finite' },
        { id: 'i2-2', label: 'A magyar ábécé betűi', category: 'finite' },
        { id: 'i2-3', label: 'A háromszög belső szögei', category: 'finite' },
        { id: 'i2-4', label: 'A kétjegyű négyzetszámok', category: 'finite' },
        { id: 'i2-5', label: 'A 3-mal osztható természetes számok', category: 'infinite' },
        { id: 'i2-6', label: 'A 100-nál nagyobb páros számok', category: 'infinite' },
        { id: 'i2-7', label: 'A racionális számok halmaza (ℚ)', category: 'infinite' },
        { id: 'i2-8', label: 'A koordináta-rendszer pontjai', category: 'infinite' },
        { id: 'i2-9', label: 'A 0-nál kisebb természetes számok', category: 'empty' },
        { id: 'i2-10', label: 'A 10 és 20 közötti 50-nel osztható számok', category: 'empty' }
      ]
    },

    // 3. SZINT: RÉSZHALMAZOK ELEMSZÁM SZERINT AZ A = {1, 2, 3, 4} HALMAZBÓL
    3: {
      categories: [
        { id: 'zero-one', name: '0 vagy 1 elemű részhalmaz (|X| ≤ 1)', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800' },
        { id: 'two', name: '2 elemű részhalmaz (|X| = 2)', badgeColor: 'bg-violet-100 text-violet-800 border-violet-300 dark:bg-violet-950/60 dark:text-violet-300 dark:border-violet-800' },
        { id: 'three-four', name: '3 vagy 4 elemű részhalmaz (|X| ≥ 3)', badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800' }
      ],
      items: [
        { id: 'i3-1', label: '∅ (üres halmaz)', category: 'zero-one' },
        { id: 'i3-2', label: '{1}', category: 'zero-one' },
        { id: 'i3-3', label: '{3}', category: 'zero-one' },
        { id: 'i3-4', label: '{4}', category: 'zero-one' },
        { id: 'i3-5', label: '{1, 2}', category: 'two' },
        { id: 'i3-6', label: '{1, 3}', category: 'two' },
        { id: 'i3-7', label: '{2, 4}', category: 'two' },
        { id: 'i3-8', label: '{3, 4}', category: 'two' },
        { id: 'i3-9', label: '{1, 2, 3}', category: 'three-four' },
        { id: 'i3-10', label: '{1, 3, 4}', category: 'three-four' },
        { id: 'i3-11', label: '{2, 3, 4}', category: 'three-four' },
        { id: 'i3-12', label: '{1, 2, 3, 4} (önmaga)', category: 'three-four' }
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
                className="text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/40 rounded-xl"
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
                    ? "bg-violet-600 text-white shadow-xs"
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
        title="Halmaz Csoportosító Játék"
        subtitle={
          activeLevel === 1
            ? "Válogasd szét a számokat a természetes, negatív egész és tört számhalmazokba!"
            : activeLevel === 2
            ? "Döntsd el a feladványokról, hogy véges, végtelen vagy üres halmazt alkotnak!"
            : "Csoportosítsd az {1, 2, 3, 4} halmaz részhalmazait azok elemszáma szerint!"
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

export default SetBasicsSorter;

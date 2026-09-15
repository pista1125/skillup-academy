import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface RationalSetSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const RationalSetSorter: React.FC<RationalSetSorterProps> = ({
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
    // 1. SZINT: SZÁMOK BESOROLÁSA AZ ALAPHALMAZOKBA
    1: {
      categories: [
        { id: 'nat', name: 'Természetes számok (ℕ)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' },
        { id: 'neg-int', name: 'Negatív egész számok (ℤ \\ ℕ)', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800' },
        { id: 'frac', name: 'Nem egész racionálisak (ℚ \\ ℤ)', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800' }
      ],
      items: [
        { id: 'i1-1', label: '15', category: 'nat' },
        { id: 'i1-2', label: '0', category: 'nat' },
        { id: 'i1-3', label: '144', category: 'nat' },
        { id: 'i1-4', label: '-8', category: 'neg-int' },
        { id: 'i1-5', label: '-31', category: 'neg-int' },
        { id: 'i1-6', label: '-100', category: 'neg-int' },
        { id: 'i1-7', label: '3/4', category: 'frac' },
        { id: 'i1-8', label: '-2.75', category: 'frac' },
        { id: 'i1-9', label: '0.333...', category: 'frac' },
        { id: 'i1-10', label: '-1/7', category: 'frac' }
      ]
    },

    // 2. SZINT: TIZEDESTÖRT TÍPUSOK (VÉGES, TISZTA SZAKASZOS, VEGYES SZAKASZOS)
    2: {
      categories: [
        { id: 'finite', name: 'Véges tizedestört', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' },
        { id: 'pure', name: 'Tiszta szakaszos tizedestört', badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800' },
        { id: 'mixed', name: 'Vegyes szakaszos tizedestört', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800' }
      ],
      items: [
        { id: 'i2-1', label: '0.75 (= 3/4)', category: 'finite' },
        { id: 'i2-2', label: '0.125 (= 1/8)', category: 'finite' },
        { id: 'i2-3', label: '0.4 (= 2/5)', category: 'finite' },
        { id: 'i2-4', label: '0.333... (= 0.3̇ = 1/3)', category: 'pure' },
        { id: 'i2-5', label: '0.777... (= 0.7̇ = 7/9)', category: 'pure' },
        { id: 'i2-6', label: '0.4545... (= 0.45̇ = 5/11)', category: 'pure' },
        { id: 'i2-7', label: '0.8333... (= 0.83̇ = 5/6)', category: 'mixed' },
        { id: 'i2-8', label: '0.1666... (= 0.16̇ = 1/6)', category: 'mixed' },
        { id: 'i2-9', label: '0.2555... (= 0.25̇ = 23/90)', category: 'mixed' }
      ]
    },

    // 3. SZINT: ABSZOLÚTÉRTÉK NAGYSÁGA (|x| ÉS 5 VISZONYA)
    3: {
      categories: [
        { id: 'small', name: '|x| < 5 (Közelebb van a 0-hoz mint 5)', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800' },
        { id: 'exact', name: '|x| = 5 (Pontosan 5 egység a 0-tól)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' },
        { id: 'large', name: '|x| > 5 (Messzebb van a 0-tól mint 5)', badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800' }
      ],
      items: [
        { id: 'i3-1', label: '-3.5', category: 'small' },
        { id: 'i3-2', label: '4.9', category: 'small' },
        { id: 'i3-3', label: '0', category: 'small' },
        { id: 'i3-4', label: '+5', category: 'exact' },
        { id: 'i3-5', label: '-5', category: 'exact' },
        { id: 'i3-6', label: '-2.4', category: 'small' },
        { id: 'i3-7', label: '-7.2', category: 'large' },
        { id: 'i3-8', label: '5.1', category: 'large' },
        { id: 'i3-9', label: '-18', category: 'large' }
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
                className="text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded-xl"
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
                    ? "bg-emerald-600 text-white shadow-xs"
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
        title="Racionális Szám Csoportosító"
        subtitle={
          activeLevel === 1
            ? "Válogasd szét a számokat a természetes, negatív egész és tört kategóriákba!"
            : activeLevel === 2
            ? "Döntsd el a tizedestörtekről, hogy végesek, tiszta szakaszosak vagy vegyes szakaszosak!"
            : "Kategorizáld a számokat a nullától való távolságuk (abszolútértékük) alapján!"
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

export default RationalSetSorter;

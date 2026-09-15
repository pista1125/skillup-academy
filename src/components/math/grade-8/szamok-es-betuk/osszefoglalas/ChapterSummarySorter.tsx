import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ChapterSummarySorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const ChapterSummarySorter: React.FC<ChapterSummarySorterProps> = ({
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
    // 1. SZINT: FEJEZETI TÉMATERÜLET
    1: {
      categories: [
        { id: 'area_sets_logic', name: 'Logika & Halmazok (1-3.)', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800' },
        { id: 'area_powers_roots', name: 'Hatványozás & Gyökvonás (6-8.)', badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800' },
        { id: 'area_algebra', name: 'Algebra & Azonosságok (9-11.)', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800' }
      ],
      items: [
        { id: 'i1-1', label: 'A ∩ B metszet', category: 'area_sets_logic' },
        { id: 'i1-2', label: '2⁴ · 2³ = 2⁷', category: 'area_powers_roots' },
        { id: 'i1-3', label: '(x + 3)² = x² + 6x + 9', category: 'area_algebra' },
        { id: 'i1-4', label: 'Skatulya-elv', category: 'area_sets_logic' },
        { id: 'i1-5', label: '√50 = 5√2', category: 'area_powers_roots' },
        { id: 'i1-6', label: '6x² - 15x = 3x(2x - 5)', category: 'area_algebra' },
        { id: 'i1-7', label: 'Szita-formula', category: 'area_sets_logic' },
        { id: 'i1-8', label: 'Normálalak: 3.5 · 10⁴', category: 'area_powers_roots' },
        { id: 'i1-9', label: '(a + b)(a - b) = a² - b²', category: 'area_algebra' }
      ]
    },

    // 2. SZINT: SZÁMHALMAZ BESOROLÁS (ℕ / ℚ \ ℤ / ℚ*)
    2: {
      categories: [
        { id: 'set_nat', name: 'Természetes szám (ℕ)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' },
        { id: 'set_rat_not_int', name: 'Tört racionális (ℚ \\ ℤ)', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800' },
        { id: 'set_irrat', name: 'Irracionális szám (ℚ*)', badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800' }
      ],
      items: [
        { id: 'i2-1', label: '0', category: 'set_nat' },
        { id: 'i2-2', label: '3/4', category: 'set_rat_not_int' },
        { id: 'i2-3', label: '√2', category: 'set_irrat' },
        { id: 'i2-4', label: '√64 (= 8)', category: 'set_nat' },
        { id: 'i2-5', label: '0.375', category: 'set_rat_not_int' },
        { id: 'i2-6', label: 'π', category: 'set_irrat' },
        { id: 'i2-7', label: '2³ (= 8)', category: 'set_nat' },
        { id: 'i2-8', label: '-5/2 (= -2.5)', category: 'set_rat_not_int' },
        { id: 'i2-9', label: '√5', category: 'set_irrat' }
      ]
    },

    // 3. SZINT: ÉRTÉK ELŐJELE / NAGYSÁGA
    3: {
      categories: [
        { id: 'val_neg', name: 'Negatív érték (< 0)', badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800' },
        { id: 'val_zero', name: 'Nulla (= 0)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' },
        { id: 'val_pos', name: 'Pozitív érték (> 0)', badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800' }
      ],
      items: [
        { id: 'i3-1', label: '(-2)³ (= -8)', category: 'val_neg' },
        { id: 'i3-2', label: '√0', category: 'val_zero' },
        { id: 'i3-3', label: '(-3)² (= +9)', category: 'val_pos' },
        { id: 'i3-4', label: '-(x² + 1)', category: 'val_neg' },
        { id: 'i3-5', label: '(x + 2)(x - 2) - x² + 4', category: 'val_zero' },
        { id: 'i3-6', label: '√49 (= +7)', category: 'val_pos' },
        { id: 'i3-7', label: '-5 · 4 (= -20)', category: 'val_neg' },
        { id: 'i3-8', label: '3 - 3', category: 'val_zero' },
        { id: 'i3-9', label: '2⁻³ (= 1/8 > 0)', category: 'val_pos' }
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

          {/* Level Switcher (Standalone mode) */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            {([1, 2, 3] as DifficultyLevel[]).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setCurrentLevel(lvl)}
                className={cn(
                  'px-3 py-1 text-xs font-bold rounded-lg transition-all',
                  currentLevel === lvl
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                )}
              >
                {lvl}. Szint
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sorter Game */}
      <SorterTemplate
        levels={levels}
        level={activeLevel}
        onNextLevel={onNextLevel}
        onOpenRules={onOpenRules}
        title="I. Számok és betűk Összefoglalás – Csoportosító"
        subtitle="Rendszerezd a fogalmakat és kifejezéseket témakör, számhalmaz és előjel szerint!"
      />
    </div>
  );
};

export default ChapterSummarySorter;

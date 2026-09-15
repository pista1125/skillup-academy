import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FactoringSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const FactoringSorter: React.FC<FactoringSorterProps> = ({
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
    // 1. SZINT: MŰVELET / ALAK TÍPUSA
    1: {
      categories: [
        { id: 'op_monom_mult', name: 'Egytagúak szorzása', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800' },
        { id: 'op_expansion', name: 'Zárójelbontás (Kifejtés)', badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800' },
        { id: 'op_factoring', name: 'Közös tényező kiemelése', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800' }
      ],
      items: [
        { id: 'i1-1', label: '3x · 4y (= 12xy)', category: 'op_monom_mult' },
        { id: 'i1-2', label: '2(3x - 5) = 6x - 10', category: 'op_expansion' },
        { id: 'i1-3', label: '6x + 9 = 3(2x + 3)', category: 'op_factoring' },
        { id: 'i1-4', label: '(-2a²) · 5a³ (= -10a⁵)', category: 'op_monom_mult' },
        { id: 'i1-5', label: '4x(x - 2) = 4x² - 8x', category: 'op_expansion' },
        { id: 'i1-6', label: '8x² - 12x = 4x(2x - 3)', category: 'op_factoring' },
        { id: 'i1-7', label: '6ab · (-3a) (= -18a²b)', category: 'op_monom_mult' },
        { id: 'i1-8', label: '-3(2a + b) = -6a - 3b', category: 'op_expansion' },
        { id: 'i1-9', label: '15a²b + 10ab = 5ab(3a + 2)', category: 'op_factoring' }
      ]
    },

    // 2. SZINT: KIEMELHETŐ LEGNAGYOBB KÖZÖS TÉNYEZŐ (2x / 3x / 4x)
    2: {
      categories: [
        { id: 'factor_2x', name: '2x emelhető ki', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' },
        { id: 'factor_3x', name: '3x emelhető ki', badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800' },
        { id: 'factor_4x', name: '4x emelhető ki', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800' }
      ],
      items: [
        { id: 'i2-1', label: '4x² + 6x', category: 'factor_2x' },
        { id: 'i2-2', label: '6x² - 9x', category: 'factor_3x' },
        { id: 'i2-3', label: '8x² + 12x', category: 'factor_4x' },
        { id: 'i2-4', label: '2x² - 10x', category: 'factor_2x' },
        { id: 'i2-5', label: '9x² + 15x', category: 'factor_3x' },
        { id: 'i2-6', label: '4x² - 20x', category: 'factor_4x' },
        { id: 'i2-7', label: '6x² + 14x', category: 'factor_2x' },
        { id: 'i2-8', label: '3x² - 12x', category: 'factor_3x' },
        { id: 'i2-9', label: '12x² - 16x', category: 'factor_4x' }
      ]
    },

    // 3. SZINT: KIFEJTETT ALAK FOKSZÁMA (1. FOKÚ / 2. FOKÚ / 3. VAGY MAGASABB FOKÚ)
    3: {
      categories: [
        { id: 'deg_1', name: '1. fokú (Lineáris: x¹)', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800' },
        { id: 'deg_2', name: '2. fokú (Kvadratikus: x²)', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800' },
        { id: 'deg_3', name: '3. vagy magasabb fokú (≥ x³)', badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800' }
      ],
      items: [
        { id: 'i3-1', label: '3 · (2x - 4)', category: 'deg_1' },
        { id: 'i3-2', label: '2x · (3x + 1)', category: 'deg_2' },
        { id: 'i3-3', label: 'x² · (4x - 2)', category: 'deg_3' },
        { id: 'i3-4', label: '-4 · (x + 5)', category: 'deg_1' },
        { id: 'i3-5', label: '3x · (x - 5)', category: 'deg_2' },
        { id: 'i3-6', label: '2x · (3x² + x)', category: 'deg_3' },
        { id: 'i3-7', label: '5 · (3 - 2x)', category: 'deg_1' },
        { id: 'i3-8', label: '-x · (5x - 2)', category: 'deg_2' },
        { id: 'i3-9', label: '3x² · 2x²', category: 'deg_3' }
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
                className="text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40 rounded-xl"
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
                    ? 'bg-purple-600 text-white shadow-sm'
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
        title="Betűs kifejezések szorzása és kiemelés – Csoportosító"
        subtitle="Húzd a kifejezéseket a megfelelő dobozba a szorzás és kiemelés szabályai szerint!"
      />
    </div>
  );
};

export default FactoringSorter;

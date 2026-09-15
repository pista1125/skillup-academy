import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PolynomialMultSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const PolynomialMultSorter: React.FC<PolynomialMultSorterProps> = ({
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
    // 1. SZINT: NEVEZETES AZONOSSÁG TÍPUSA
    1: {
      categories: [
        { id: 'type_sum_sq', name: 'Összeg négyzete: (a + b)²', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' },
        { id: 'type_diff_sq', name: 'Különbség négyzete: (a - b)²', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800' },
        { id: 'type_diff_of_sq', name: 'Négyzetek különbsége: (a+b)(a-b)', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800' }
      ],
      items: [
        { id: 'i1-1', label: '(x + 4)²', category: 'type_sum_sq' },
        { id: 'i1-2', label: '(x - 3)²', category: 'type_diff_sq' },
        { id: 'i1-3', label: '(x + 5)(x - 5)', category: 'type_diff_of_sq' },
        { id: 'i1-4', label: '(2a + 1)²', category: 'type_sum_sq' },
        { id: 'i1-5', label: '(3x - 2)²', category: 'type_diff_sq' },
        { id: 'i1-6', label: '(2x + 7)(2x - 7)', category: 'type_diff_of_sq' },
        { id: 'i1-7', label: '(a + 6b)²', category: 'type_sum_sq' },
        { id: 'i1-8', label: '(5 - y)²', category: 'type_diff_sq' },
        { id: 'i1-9', label: '(4a + 3b)(4a - 3b)', category: 'type_diff_of_sq' }
      ]
    },

    // 2. SZINT: KIFEJTÉS UTÁNI FORMA ÉS KÖZÉPTAG
    2: {
      categories: [
        { id: 'form_diff_sq', name: 'Kéttagú (a² - b², nincs középtag)', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800' },
        { id: 'form_pos_mid', name: 'Háromtagú pozitív középtaggal (+2ab)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' },
        { id: 'form_neg_mid', name: 'Háromtagú negatív középtaggal (-2ab)', badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800' }
      ],
      items: [
        { id: 'i2-1', label: '(x + 2)(x - 2) (= x² - 4)', category: 'form_diff_sq' },
        { id: 'i2-2', label: '(x + 5)² (= x² + 10x + 25)', category: 'form_pos_mid' },
        { id: 'i2-3', label: '(x - 4)² (= x² - 8x + 16)', category: 'form_neg_mid' },
        { id: 'i2-4', label: '(3x + 1)(3x - 1) (= 9x² - 1)', category: 'form_diff_sq' },
        { id: 'i2-5', label: '(2x + 3)² (= 4x² + 12x + 9)', category: 'form_pos_mid' },
        { id: 'i2-6', label: '(3x - 2)² (= 9x² - 12x + 4)', category: 'form_neg_mid' },
        { id: 'i2-7', label: '(4a + 5)(4a - 5) (= 16a² - 25)', category: 'form_diff_sq' },
        { id: 'i2-8', label: '(a + 7)² (= a² + 14a + 49)', category: 'form_pos_mid' },
        { id: 'i2-9', label: '(2a - 5)² (= 4a² - 20a + 25)', category: 'form_neg_mid' }
      ]
    },

    // 3. SZINT: KONSTANS TAG (SZABAD SZÁM) ÉRTÉKE KIFEJTÉS UTÁN
    3: {
      categories: [
        { id: 'const_neg', name: 'Negatív konstans (< 0)', badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800' },
        { id: 'const_pos_sq', name: 'Pozitív négyzetszám konstans (> 0)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' },
        { id: 'const_zero', name: 'Nulla konstans tag (= 0)', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800' }
      ],
      items: [
        { id: 'i3-1', label: '(x + 4)(x - 2) (konstans: -8)', category: 'const_neg' },
        { id: 'i3-2', label: '(x - 6)² (konstans: +36)', category: 'const_pos_sq' },
        { id: 'i3-3', label: 'x(x + 5) (konstans: 0)', category: 'const_zero' },
        { id: 'i3-4', label: '(2x + 3)(x - 5) (konstans: -15)', category: 'const_neg' },
        { id: 'i3-5', label: '(x + 7)² (konstans: +49)', category: 'const_pos_sq' },
        { id: 'i3-6', label: '(x + 3)(x - 3) + 9 (konstans: 0)', category: 'const_zero' },
        { id: 'i3-7', label: '(3x - 1)(2x + 4) (konstans: -4)', category: 'const_neg' },
        { id: 'i3-8', label: '(2x - 5)² (konstans: +25)', category: 'const_pos_sq' },
        { id: 'i3-9', label: '(x + 2)² - 4x - 4 (konstans: 0)', category: 'const_zero' }
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
                className="text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 rounded-xl"
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
                    ? 'bg-indigo-600 text-white shadow-sm'
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
        title="Többtagú kifejezések szorzata – Csoportosító"
        subtitle="Húzd a kifejezéseket a megfelelő dobozba a nevezetes azonosságok és kifejtési formák szerint!"
      />
    </div>
  );
};

export default PolynomialMultSorter;

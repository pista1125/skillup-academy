import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AlgebraIntroSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const AlgebraIntroSorter: React.FC<AlgebraIntroSorterProps> = ({
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
    // 1. SZINT: EGYNEMŰ TAGOK CSOPORTOSÍTÁSA (x / x² / y)
    1: {
      categories: [
        { id: 'term_x', name: 'x-es egynemű tagok (x¹)', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800' },
        { id: 'term_x2', name: 'x²-es egynemű tagok (x²)', badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800' },
        { id: 'term_y', name: 'y-os egynemű tagok (y¹)', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800' }
      ],
      items: [
        { id: 'i1-1', label: '5x', category: 'term_x' },
        { id: 'i1-2', label: '3x²', category: 'term_x2' },
        { id: 'i1-3', label: '-4y', category: 'term_y' },
        { id: 'i1-4', label: '-8x', category: 'term_x' },
        { id: 'i1-5', label: '-7x²', category: 'term_x2' },
        { id: 'i1-6', label: '12y', category: 'term_y' },
        { id: 'i1-7', label: '2/3 x', category: 'term_x' },
        { id: 'i1-8', label: 'x²', category: 'term_x2' },
        { id: 'i1-9', label: '-y', category: 'term_y' }
      ]
    },

    // 2. SZINT: HELYETTESÍTÉSI ÉRTÉK ELŐJELE (HA x = -2)
    2: {
      categories: [
        { id: 'neg', name: 'Negatív érték (< 0)', badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800' },
        { id: 'zero', name: 'Értéke = 0', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' },
        { id: 'pos', name: 'Pozitív érték (> 0)', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800' }
      ],
      items: [
        { id: 'i2-1', label: '3x + 1 (= -5)', category: 'neg' },
        { id: 'i2-2', label: 'x + 2 (= 0)', category: 'zero' },
        { id: 'i2-3', label: 'x² (= +4)', category: 'pos' },
        { id: 'i2-4', label: '-x² (= -4)', category: 'neg' },
        { id: 'i2-5', label: 'x² - 4 (= 0)', category: 'zero' },
        { id: 'i2-6', label: '-3x (= +6)', category: 'pos' },
        { id: 'i2-7', label: 'x - 5 (= -7)', category: 'neg' },
        { id: 'i2-8', label: '2x + 4 (= 0)', category: 'zero' },
        { id: 'i2-9', label: '5 - x (= +7)', category: 'pos' }
      ]
    },

    // 3. SZINT: ÖSSZEVONÁS UTÁNI TAGOK SZÁMA (MONOM, BINOM, TRINOM)
    3: {
      categories: [
        { id: 'monom', name: 'Egytagú kifejezés (Monom)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' },
        { id: 'binom', name: 'Kéttagú kifejezés (Binom)', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800' },
        { id: 'trinom', name: 'Háromtagú kifejezés (Trinom)', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800' }
      ],
      items: [
        { id: 'i3-1', label: '3x + 5x (= 8x)', category: 'monom' },
        { id: 'i3-2', label: '2x + 3y + x (= 3x + 3y)', category: 'binom' },
        { id: 'i3-3', label: 'x² + 3x - 5', category: 'trinom' },
        { id: 'i3-4', label: '4a² - a² (= 3a²)', category: 'monom' },
        { id: 'i3-5', label: 'x² + 4x - 2x (= x² + 2x)', category: 'binom' },
        { id: 'i3-6', label: '2a + 3b - 4c', category: 'trinom' },
        { id: 'i3-7', label: '2xy + 3xy (= 5xy)', category: 'monom' },
        { id: 'i3-8', label: '3a - 4 + 2a (= 5a - 4)', category: 'binom' },
        { id: 'i3-9', label: 'x² - 2x + 1', category: 'trinom' }
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
                className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-xl"
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
                    ? "bg-blue-600 text-white shadow-xs"
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
        title="Betűs Kifejezések Csoportosító"
        subtitle={
          activeLevel === 1
            ? "Válogasd szét a kifejezéseket az egynemű változós részük szerint!"
            : activeLevel === 2
            ? "Csoportosítsd a kifejezéseket a kiszámított helyettesítési értékük előjele alapján!"
            : "Döntsd el a kifejezésekről összevonás után, hogy hány tagúak!"
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
        themeColor="blue"
      />
    </div>
  );
};

export default AlgebraIntroSorter;

import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SquareRootsSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const SquareRootsSorter: React.FC<SquareRootsSorterProps> = ({
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
    // 1. SZINT: RACIONÁLIS ÉS IRRACIONÁLIS SZÁMOK
    1: {
      categories: [
        { id: 'rat', name: 'Racionális szám (ℚ - pontos gyöke van)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' },
        { id: 'irrat', name: 'Irracionális szám (ℚ* - végtelen nem szakaszos)', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800' },
        { id: 'int_op', name: 'Egészre egyszerűsödő művelet', badgeColor: 'bg-pink-100 text-pink-800 border-pink-300 dark:bg-pink-950/60 dark:text-pink-300 dark:border-pink-800' }
      ],
      items: [
        { id: 'i1-1', label: '√49 (= 7)', category: 'rat' },
        { id: 'i1-2', label: '√8 (= 2√2)', category: 'irrat' },
        { id: 'i1-3', label: '√2 · √18 (= 6)', category: 'int_op' },
        { id: 'i1-4', label: '√0.25 (= 0.5)', category: 'rat' },
        { id: 'i1-5', label: '√20 (= 2√5)', category: 'irrat' },
        { id: 'i1-6', label: '√75 / √3 (= 5)', category: 'int_op' },
        { id: 'i1-7', label: '√(16/81) (= 4/9)', category: 'rat' },
        { id: 'i1-8', label: '√50 (= 5√2)', category: 'irrat' },
        { id: 'i1-9', label: '(2√3)² (= 12)', category: 'int_op' }
      ]
    },

    // 2. SZINT: KIEMELÉS UTÁNI GYÖKTÉNYEZŐ (...√2 / ...√3 / ...√5)
    2: {
      categories: [
        { id: 'sqrt2', name: '...√2 alakú kifejezések', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800' },
        { id: 'sqrt3', name: '...√3 alakú kifejezések', badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800' },
        { id: 'sqrt5', name: '...√5 alakú kifejezések', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' }
      ],
      items: [
        { id: 'i2-1', label: '√18 (= 3√2)', category: 'sqrt2' },
        { id: 'i2-2', label: '√12 (= 2√3)', category: 'sqrt3' },
        { id: 'i2-3', label: '√20 (= 2√5)', category: 'sqrt5' },
        { id: 'i2-4', label: '√50 (= 5√2)', category: 'sqrt2' },
        { id: 'i2-5', label: '√48 (= 4√3)', category: 'sqrt3' },
        { id: 'i2-6', label: '√45 (= 3√5)', category: 'sqrt5' },
        { id: 'i2-7', label: '√98 (= 7√2)', category: 'sqrt2' },
        { id: 'i2-8', label: '√75 (= 5√3)', category: 'sqrt3' },
        { id: 'i2-9', label: '√80 (= 4√5)', category: 'sqrt5' }
      ]
    },

    // 3. SZINT: BEVITEL A GYÖKJEL ALÁ (NAGYSÁGRENDEK)
    3: {
      categories: [
        { id: 'under30', name: '√30 alatti értékek (kisebb mint √30)', badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800' },
        { id: 'mid3060', name: '√30 és √60 közötti értékek', badgeColor: 'bg-pink-100 text-pink-800 border-pink-300 dark:bg-pink-950/60 dark:text-pink-300 dark:border-pink-800' },
        { id: 'over60', name: '√60 feletti értékek (nagyobb mint √60)', badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800' }
      ],
      items: [
        { id: 'i3-1', label: '2√5 (= √20)', category: 'under30' },
        { id: 'i3-2', label: '4√2 (= √32)', category: 'mid3060' },
        { id: 'i3-3', label: '3√7 (= √63)', category: 'over60' },
        { id: 'i3-4', label: '3√3 (= √27)', category: 'under30' },
        { id: 'i3-5', label: '3√5 (= √45)', category: 'mid3060' },
        { id: 'i3-6', label: '6√2 (= √72)', category: 'over60' },
        { id: 'i3-7', label: '2√7 (= √28)', category: 'under30' },
        { id: 'i3-8', label: '5√2 (= √50)', category: 'mid3060' },
        { id: 'i3-9', label: '5√3 (= √75)', category: 'over60' }
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
                className="text-pink-600 dark:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-950/40 rounded-xl"
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
                    ? "bg-pink-600 text-white shadow-xs"
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
        title="Számok Négyzetgyöke Csoportosító"
        subtitle={
          activeLevel === 1
            ? "Válogasd szét a kifejezéseket a számhalmazuk és eredményük szerint!"
            : activeLevel === 2
            ? "Csoportosítsd a kifejezéseket a bennük maradó gyöktényező szerint!"
            : "Helyezd el a kifejezéseket a nagyságrendjük szerinti kategóriákba!"
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
        themeColor="pink"
      />
    </div>
  );
};

export default SquareRootsSorter;

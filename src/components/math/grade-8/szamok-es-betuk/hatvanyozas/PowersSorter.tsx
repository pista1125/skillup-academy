import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PowersSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const PowersSorter: React.FC<PowersSorterProps> = ({
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
    // 1. SZINT: KIFEJEZÉSEK ELŐJELE ÉS ÉRTÉKE (< 0 / = 1 / > 1)
    1: {
      categories: [
        { id: 'neg', name: 'Negatív érték (< 0)', badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800' },
        { id: 'eq1', name: 'Értéke = 1', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' },
        { id: 'pos', name: 'Pozitív érték (> 1)', badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800' }
      ],
      items: [
        { id: 'i1-1', label: '(-2)³ (= -8)', category: 'neg' },
        { id: 'i1-2', label: '(-5)⁰ (= 1)', category: 'eq1' },
        { id: 'i1-3', label: '3⁴ (= 81)', category: 'pos' },
        { id: 'i1-4', label: '-3² (= -9)', category: 'neg' },
        { id: 'i1-5', label: '7⁰ (= 1)', category: 'eq1' },
        { id: 'i1-6', label: '(-2)⁴ (= +16)', category: 'pos' },
        { id: 'i1-7', label: '(-1)¹⁵ (= -1)', category: 'neg' },
        { id: 'i1-8', label: '(-1)²⁰ (= 1)', category: 'eq1' },
        { id: 'i1-9', label: '5² · 2² (= 100)', category: 'pos' }
      ]
    },

    // 2. SZINT: NAGY SZÁMOK NORMÁLALAKJÁNAK NAGYSÁGRENDJE (10-ES KITEVŐ)
    2: {
      categories: [
        { id: 'k34', name: '10³ vagy 10⁴ (Ezres nagyságrend)', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800' },
        { id: 'k56', name: '10⁵ vagy 10⁶ (Százezres / Milliós)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' },
        { id: 'k78', name: '10⁷ vagy nagyobb (Tízmilliós / Milliárdos)', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800' }
      ],
      items: [
        { id: 'i2-1', label: '4 500 (= 4.5 · 10³)', category: 'k34' },
        { id: 'i2-2', label: '380 000 (= 3.8 · 10⁵)', category: 'k56' },
        { id: 'i2-3', label: '60 000 000 (= 6 · 10⁷)', category: 'k78' },
        { id: 'i2-4', label: '25 000 (= 2.5 · 10⁴)', category: 'k34' },
        { id: 'i2-5', label: '5 000 000 (= 5 · 10⁶)', category: 'k56' },
        { id: 'i2-6', label: '450 000 000 (= 4.5 · 10⁸)', category: 'k78' },
        { id: 'i2-7', label: '7 000 (= 7 · 10³)', category: 'k34' },
        { id: 'i2-8', label: '820 000 (= 8.2 · 10⁵)', category: 'k56' },
        { id: 'i2-9', label: '3 000 000 000 (= 3 · 10⁹)', category: 'k78' }
      ]
    },

    // 3. SZINT: ALKALMAZANDÓ HATVÁNYAZONOSSÁG (KIEMELVE AZ AZONOS KITEVŐJŰEK OSZTÁSÁT)
    3: {
      categories: [
        { id: 'same_base', name: 'Azonos alapúak műveletei (aⁿ · aᵐ vagy aⁿ : aᵐ)', badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800' },
        { id: 'div_exp', name: 'Azonos kitevőjűek osztása (aⁿ : bⁿ = (a:b)ⁿ)', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800' },
        { id: 'mult_power', name: 'Azonos kitevőjűek szorzása és hatványozás', badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800' }
      ],
      items: [
        { id: 'i3-1', label: '2⁴ · 2³ (aⁿ · aᵐ = aⁿ⁺ᵐ)', category: 'same_base' },
        { id: 'i3-2', label: '12⁴ : 4⁴ ((12:4)⁴ = 3⁴)', category: 'div_exp' },
        { id: 'i3-3', label: '2⁵ · 5⁵ ((2·5)⁵ = 10⁵)', category: 'mult_power' },
        { id: 'i3-4', label: '5⁸ : 5³ (aⁿ : aᵐ = aⁿ⁻ᵐ)', category: 'same_base' },
        { id: 'i3-5', label: '50² : 25² ((50:25)² = 2²)', category: 'div_exp' },
        { id: 'i3-6', label: '(3²)⁴ (aⁿ·ᵐ = 3⁸)', category: 'mult_power' },
        { id: 'i3-7', label: '10³ · 10⁵ (10³⁺⁵ = 10⁸)', category: 'same_base' },
        { id: 'i3-8', label: '100³ : 20³ ((100:20)³ = 5³)', category: 'div_exp' },
        { id: 'i3-9', label: '4³ · 25³ ((4·25)³ = 100³)', category: 'mult_power' }
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

          {/* Level Switcher */}
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

      {/* Sorter Board */}
      <SorterTemplate
        level={activeLevel}
        title="Hatványozás Csoportosító"
        subtitle={
          activeLevel === 1
            ? "Csoportosítsd a hatványokat az előjelük és értékük szerint!"
            : activeLevel === 2
            ? "Válogasd szét a nagy számokat a 10-es hatványuk nagyságrendje szerint!"
            : "Döntsd el a kifejezésekről, hogy melyik hatványazonosságot kell alkalmazni!"
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
        themeColor="amber"
      />
    </div>
  );
};

export default PowersSorter;

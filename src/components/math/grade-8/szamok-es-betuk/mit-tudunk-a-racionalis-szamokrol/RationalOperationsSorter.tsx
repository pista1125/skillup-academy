import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface RationalOperationsSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const RationalOperationsSorter: React.FC<RationalOperationsSorterProps> = ({
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
    // 1. SZINT: KIFEJEZÉSEK ELŐJELE (POZITÍV / NULLA / NEGATÍV)
    1: {
      categories: [
        { id: 'pos', name: 'Pozitív szám (> 0)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' },
        { id: 'zero', name: 'Pontosan Nulla (= 0)', badgeColor: 'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-950/60 dark:text-slate-300 dark:border-slate-800' },
        { id: 'neg', name: 'Negatív szám (< 0)', badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800' }
      ],
      items: [
        { id: 'i1-1', label: '(-3) · (-4) · (-2)', category: 'neg' },
        { id: 'i1-2', label: '(-5)²', category: 'pos' },
        { id: 'i1-3', label: '-5²', category: 'neg' },
        { id: 'i1-4', label: '0 : (-7)', category: 'zero' },
        { id: 'i1-5', label: '(-2) · (-6) · (+1.5)', category: 'pos' },
        { id: 'i1-6', label: '3/4 - 0.75', category: 'zero' },
        { id: 'i1-7', label: '-8 - (-10)', category: 'pos' },
        { id: 'i1-8', label: '(-1)¹⁵', category: 'neg' },
        { id: 'i1-9', label: '(-0.5) · 0', category: 'zero' },
        { id: 'i1-10', label: '-|-6|', category: 'neg' }
      ]
    },

    // 2. SZINT: MŰVELETI EREDMÉNY NAGYSÁGA (< 1 / = 1 / > 1)
    2: {
      categories: [
        { id: 'less1', name: 'Kisebb mint 1 (< 1)', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800' },
        { id: 'eq1', name: 'Pontosan 1 (= 1)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' },
        { id: 'greater1', name: 'Nagyobb mint 1 (> 1)', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800' }
      ],
      items: [
        { id: 'i2-1', label: '3/4 + 1/8 (= 7/8)', category: 'less1' },
        { id: 'i2-2', label: '5/6 : 5/6', category: 'eq1' },
        { id: 'i2-3', label: '2/3 · 9/4 (= 3/2 = 1.5)', category: 'greater1' },
        { id: 'i2-4', label: '0.25 · 4', category: 'eq1' },
        { id: 'i2-5', label: '12 : 5 (= 2.4)', category: 'greater1' },
        { id: 'i2-6', label: '(-2/3)² (= 4/9)', category: 'less1' },
        { id: 'i2-7', label: '1 - 0.05 (= 0.95)', category: 'less1' },
        { id: 'i2-8', label: '(1/2 + 1/3) : (5/6)', category: 'eq1' },
        { id: 'i2-9', label: '3.5 · 0.4 (= 1.4)', category: 'greater1' }
      ]
    },

    // 3. SZINT: ALKALMAZOTT MŰVELETI TULAJDONSÁGOK
    3: {
      categories: [
        { id: 'comm', name: 'Kommutativitás (Felcserélhetőség)', badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800' },
        { id: 'assoc', name: 'Asszociativitás (Csoportosíthatóság)', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800' },
        { id: 'dist', name: 'Disztributivitás (Széttagolhatóság / Kiemelés)', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800' }
      ],
      items: [
        { id: 'i3-1', label: 'a + b = b + a', category: 'comm' },
        { id: 'i3-2', label: 'a · b = b · a', category: 'comm' },
        { id: 'i3-3', label: '(a + b) + c = a + (b + c)', category: 'assoc' },
        { id: 'i3-4', label: '(a · b) · c = a · (b · c)', category: 'assoc' },
        { id: 'i3-5', label: 'a · (b + c) = a·b + a·c', category: 'dist' },
        { id: 'i3-6', label: '4.8 · 7 + 5.2 · 7 = (4.8 + 5.2) · 7', category: 'dist' },
        { id: 'i3-7', label: '(25 · 17) · 4 = (25 · 4) · 17', category: 'assoc' },
        { id: 'i3-8', label: '(a - b) : c = a:c - b:c', category: 'dist' },
        { id: 'i3-9', label: '-3.5 + 8.2 = 8.2 + (-3.5)', category: 'comm' }
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
                className="text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-950/40 rounded-xl"
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
                    ? "bg-cyan-600 text-white shadow-xs"
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
        title="Racionális Műveletek Csoportosító"
        subtitle={
          activeLevel === 1
            ? "Határozd meg a kifejezések előjelét: pozitív, pontosan nulla vagy negatív!"
            : activeLevel === 2
            ? "Döntsd el a műveleti eredményről, hogy 1-nél kisebb, pontosan 1 vagy 1-nél nagyobb!"
            : "Kategorizáld az azonosságokat kommutatív, asszociatív és disztributív tulajdonságok szerint!"
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

export default RationalOperationsSorter;

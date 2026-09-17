import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FractionsIntroSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const FractionsIntroSorter: React.FC<FractionsIntroSorterProps> = ({
  onBack,
  onSwitchToTheory,
  level,
  onNextLevel,
  onOpenRules
}) => {
  const safeLevel: DifficultyLevel = (typeof level === 'number' ? level : ((level as any)?.level ?? 1)) as DifficultyLevel;
  const [currentLevel, setCurrentLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof level === 'number' ? level : ((level as any)?.level ?? 1)) as DifficultyLevel;
    setCurrentLevel(nextLevel);
  }, [level]);

  const levels: Record<DifficultyLevel, SorterLevelConfig> = {
    // 1. SZINT: TÖRTEK TÍPUSA 1 EGÉSZHEZ KÉPEST
    1: {
      categories: [
        { id: 'proper', name: 'Valódi tört (< 1 egész)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' },
        { id: 'whole', name: '1 egésszel egyenlő (= 1)', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800' },
        { id: 'improper', name: 'Áltört (> 1 egész)', badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800' }
      ],
      items: [
        { id: 'i1-1', label: '1/3', category: 'proper' },
        { id: 'i1-2', label: '3/4', category: 'proper' },
        { id: 'i1-3', label: '5/8', category: 'proper' },
        { id: 'i1-4', label: '9/10', category: 'proper' },
        { id: 'i1-5', label: '2/2', category: 'whole' },
        { id: 'i1-6', label: '4/4', category: 'whole' },
        { id: 'i1-7', label: '6/6', category: 'whole' },
        { id: 'i1-8', label: '10/10', category: 'whole' },
        { id: 'i1-9', label: '5/4', category: 'improper' },
        { id: 'i1-10', label: '7/3', category: 'improper' },
        { id: 'i1-11', label: '9/2', category: 'improper' },
        { id: 'i1-12', label: '12/5', category: 'improper' }
      ]
    },

    // 2. SZINT: EGYSÉGTÖRT VS. NEM EGYSÉGTÖRT VS. EGÉSZ SZÁM
    2: {
      categories: [
        { id: 'unit', name: 'Egységtört (Számláló = 1)', badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800' },
        { id: 'non-unit', name: 'Nem egységtört (Számláló > 1)', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800' },
        { id: 'integer', name: 'Egész számként felírható', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' }
      ],
      items: [
        { id: 'i2-1', label: '1/2', category: 'unit' },
        { id: 'i2-2', label: '1/5', category: 'unit' },
        { id: 'i2-3', label: '1/8', category: 'unit' },
        { id: 'i2-4', label: '1/10', category: 'unit' },
        { id: 'i2-5', label: '2/5', category: 'non-unit' },
        { id: 'i2-6', label: '3/7', category: 'non-unit' },
        { id: 'i2-7', label: '5/9', category: 'non-unit' },
        { id: 'i2-8', label: '7/8', category: 'non-unit' },
        { id: 'i2-9', label: '6/3 (= 2)', category: 'integer' },
        { id: 'i2-10', label: '8/2 (= 4)', category: 'integer' },
        { id: 'i2-11', label: '15/5 (= 3)', category: 'integer' },
        { id: 'i2-12', label: '20/4 (= 5)', category: 'integer' }
      ]
    },

    // 3. SZINT: TÖRT ÉRTÉKE A FÉLHEZ (1/2) KÉPEST
    3: {
      categories: [
        { id: 'less-half', name: 'Félnél kisebb (< 1/2)', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800' },
        { id: 'equal-half', name: 'Pontosan fél (= 1/2)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' },
        { id: 'greater-half', name: 'Félnél nagyobb (> 1/2)', badgeColor: 'bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-950/60 dark:text-orange-300 dark:border-orange-800' }
      ],
      items: [
        { id: 'i3-1', label: '1/4', category: 'less-half' },
        { id: 'i3-2', label: '1/5', category: 'less-half' },
        { id: 'i3-3', label: '2/6', category: 'less-half' },
        { id: 'i3-4', label: '3/10', category: 'less-half' },
        { id: 'i3-5', label: '2/4', category: 'equal-half' },
        { id: 'i3-6', label: '3/6', category: 'equal-half' },
        { id: 'i3-7', label: '4/8', category: 'equal-half' },
        { id: 'i3-8', label: '5/10', category: 'equal-half' },
        { id: 'i3-9', label: '3/4', category: 'greater-half' },
        { id: 'i3-10', label: '4/6', category: 'greater-half' },
        { id: 'i3-11', label: '5/8', category: 'greater-half' },
        { id: 'i3-12', label: '7/10', category: 'greater-half' }
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

      <SorterTemplate
        level={activeLevel}
        title="Törtek csoportosító játék"
        subtitle={
          activeLevel === 1
            ? "Válogasd szét a törteket valódi tört, egész tört és áltört csoportokba!"
            : activeLevel === 2
            ? "Csoportosítsd a törteket egységtört, nem egységtört és egész szám kategóriákba!"
            : "Rendezd a törteket a félhez (1/2) való viszonyuk alapján!"
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

export default FractionsIntroSorter;

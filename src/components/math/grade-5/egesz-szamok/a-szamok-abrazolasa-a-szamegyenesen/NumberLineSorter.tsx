import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface NumberLineSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const NumberLineSorter: React.FC<NumberLineSorterProps> = ({
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
    // 1. SZINT: SZÁMEGYENES LÉPÉSKÖZE
    1: {
      categories: [
        { id: 'step1or2', name: '1 vagy 2 egység', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' },
        { id: 'step5or10', name: '5 vagy 10 egység', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800' },
        { id: 'step50or100', name: '50 vagy 100 egység', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800' }
      ],
      items: [
        { id: 'i1-1', label: '0 és 10 között 10 osztásköz (= 1)', category: 'step1or2' },
        { id: 'i1-2', label: '0 és 20 között 10 osztásköz (= 2)', category: 'step1or2' },
        { id: 'i1-3', label: '0 és 50 között 10 osztásköz (= 5)', category: 'step5or10' },
        { id: 'i1-4', label: '0 és 100 között 10 osztásköz (= 10)', category: 'step5or10' },
        { id: 'i1-5', label: '0 és 500 között 10 osztásköz (= 50)', category: 'step50or100' },
        { id: 'i1-6', label: '0 és 1 000 között 10 osztásköz (= 100)', category: 'step50or100' },
        { id: 'i1-7', label: '0 és 4 között 2 osztásköz (= 2)', category: 'step1or2' },
        { id: 'i1-8', label: '0 és 200 között 20 osztásköz (= 10)', category: 'step5or10' },
        { id: 'i1-9', label: '0 és 1 000 között 20 osztásköz (= 50)', category: 'step50or100' }
      ]
    },

    // 2. SZINT: KEREK SZOMSZÉDOK ÉS FELEZŐPONTOK
    2: {
      categories: [
        { id: 'closerDown', name: 'Lefelé van közelebb (1, 2, 3, 4)', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800' },
        { id: 'midpoint', name: 'Pontosan félúton (5-ös végű)', badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800' },
        { id: 'closerUp', name: 'Felfelé van közelebb (6, 7, 8, 9)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' }
      ],
      items: [
        { id: 'i2-1', label: '42 (40-hez van közelebb)', category: 'closerDown' },
        { id: 'i2-2', label: '73 (70-hez van közelebb)', category: 'closerDown' },
        { id: 'i2-3', label: '45 (40 és 50 között félúton)', category: 'midpoint' },
        { id: 'i2-4', label: '85 (80 és 90 között félúton)', category: 'midpoint' },
        { id: 'i2-5', label: '48 (50-hez van közelebb)', category: 'closerUp' },
        { id: 'i2-6', label: '79 (80-hoz van közelebb)', category: 'closerUp' },
        { id: 'i2-7', label: '121 (120-hoz közelebb)', category: 'closerDown' },
        { id: 'i2-8', label: '350 (300 és 400 között felező)', category: 'midpoint' },
        { id: 'i2-9', label: '597 (600-hoz közelebb)', category: 'closerUp' }
      ]
    },

    // 3. SZINT: SZÁMTARTOMÁNYOK ÉS NAGYSÁGRENDEK
    3: {
      categories: [
        { id: 'under100', name: '0 – 100 között (Kétjegyű)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' },
        { id: 'hundredToThousand', name: '100 – 1 000 között (Háromjegyű)', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800' },
        { id: 'overThousand', name: '1 000 felett (Négyjegyű / Nagy)', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800' }
      ],
      items: [
        { id: 'i3-1', label: '20 és 80 felezőpontja (= 50)', category: 'under100' },
        { id: 'i3-2', label: '95', category: 'under100' },
        { id: 'i3-3', label: '200 és 800 felezőpontja (= 500)', category: 'hundredToThousand' },
        { id: 'i3-4', label: '750', category: 'hundredToThousand' },
        { id: 'i3-5', label: '1 500', category: 'overThousand' },
        { id: 'i3-6', label: '3 000 és 5 000 felezőpontja (= 4 000)', category: 'overThousand' },
        { id: 'i3-7', label: '78', category: 'under100' },
        { id: 'i3-8', label: '350', category: 'hundredToThousand' },
        { id: 'i3-9', label: '8 500', category: 'overThousand' }
      ]
    }
  };

  const activeLevel = level ?? currentLevel;

  return (
    <div className="w-full space-y-4">
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
        title="Számegyenes Csoportosító Játék"
        subtitle={
          activeLevel === 1
            ? "Határozd meg a számegyenesek lépésközének nagyságrendjét!"
            : activeLevel === 2
            ? "Válogasd szét a számokat a kerek szomszédaikhoz való távolság szerint!"
            : "Csoportosítsd a számokat és felezőpontokat nagyságrendi tartományok szerint!"
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

export default NumberLineSorter;

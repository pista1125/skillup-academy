import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SubtractionSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const SubtractionSorter: React.FC<SubtractionSorterProps> = ({
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
    // 1. SZINT: ÁTVITEL NÉLKÜLI VS 1 ÁTVITEL VS TÖBB ÁTVITEL
    1: {
      categories: [
        { id: 'noBorrow', name: 'Nincs átváltás (felső ≥ alsó)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' },
        { id: 'oneBorrow', name: '1 átváltás (1 helyiértéken átlépés)', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800' },
        { id: 'multiBorrow', name: 'Több átváltás (láncolt átlépés)', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800' }
      ],
      items: [
        { id: 'i1-1', label: '685 - 241', category: 'noBorrow' },
        { id: 'i1-2', label: '974 - 532', category: 'noBorrow' },
        { id: 'i1-3', label: '542 - 218', category: 'oneBorrow' },
        { id: 'i1-4', label: '736 - 482', category: 'oneBorrow' },
        { id: 'i1-5', label: '645 - 287', category: 'multiBorrow' },
        { id: 'i1-6', label: '832 - 456', category: 'multiBorrow' },
        { id: 'i1-7', label: '459 - 123', category: 'noBorrow' },
        { id: 'i1-8', label: '625 - 341', category: 'oneBorrow' },
        { id: 'i1-9', label: '700 - 238', category: 'multiBorrow' }
      ]
    },

    // 2. SZINT: A KIVONÁS TAGJAINAK SZEREPE (KISEBBÍTENDŐ, KIVONANDÓ, KÜLÖNBSÉG)
    2: {
      categories: [
        { id: 'minuend', name: 'Kisebbítendő (amiből levonunk)', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800' },
        { id: 'subtrahend', name: 'Kivonandó (amennyit elveszünk)', badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800' },
        { id: 'diff', name: 'Különbség (a végeredmény)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' }
      ],
      items: [
        { id: 'i2-1', label: 'A 85 - 32 = 53-ban a 85', category: 'minuend' },
        { id: 'i2-2', label: 'A 85 - 32 = 53-ban a 32', category: 'subtrahend' },
        { id: 'i2-3', label: 'A 85 - 32 = 53-ban az 53', category: 'diff' },
        { id: 'i2-4', label: 'x - 40 = 60 esetén x (= 100)', category: 'minuend' },
        { id: 'i2-5', label: '100 - x = 70 esetén x (= 30)', category: 'subtrahend' },
        { id: 'i2-6', label: '150 - 60 = x esetén x (= 90)', category: 'diff' },
        { id: 'i2-7', label: 'Különbség + Kivonandó', category: 'minuend' },
        { id: 'i2-8', label: 'Kisebbítendő – Különbség', category: 'subtrahend' },
        { id: 'i2-9', label: 'Kisebbítendő – Kivonandó', category: 'diff' }
      ]
    },

    // 3. SZINT: KÜLÖNBSÉG NAGYSÁGRENDJE
    3: {
      categories: [
        { id: 'under500', name: '< 500 (Kis különbség)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' },
        { id: 'fiveToTwoThousand', name: '500 – 2 000 között', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800' },
        { id: 'overTwoThousand', name: '> 2 000 (Nagy különbség)', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800' }
      ],
      items: [
        { id: 'i3-1', label: '645 - 287 (= 358)', category: 'under500' },
        { id: 'i3-2', label: '832 - 456 (= 376)', category: 'under500' },
        { id: 'i3-3', label: '1 500 - 650 (= 850)', category: 'fiveToTwoThousand' },
        { id: 'i3-4', label: '2 400 - 950 (= 1 450)', category: 'fiveToTwoThousand' },
        { id: 'i3-5', label: '7 432 - 2 856 (= 4 576)', category: 'overTwoThousand' },
        { id: 'i3-6', label: '5 000 - 1 734 (= 3 266)', category: 'overTwoThousand' },
        { id: 'i3-7', label: '520 - 140 (= 380)', category: 'under500' },
        { id: 'i3-8', label: '3 000 - 1 800 (= 1 200)', category: 'fiveToTwoThousand' },
        { id: 'i3-9', label: '10 000 - 3 500 (= 6 500)', category: 'overTwoThousand' }
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
                className="text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl"
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
                    ? "bg-rose-600 text-white shadow-xs"
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
        title="Kivonás Csoportosító Játék"
        subtitle={
          activeLevel === 1
            ? "Válogasd szét a kivonásokat az átváltások száma szerint!"
            : activeLevel === 2
            ? "Csoportosítsd a fogalmakat a kivonás tagjai szerint!"
            : "Válogasd szét a feladatokat a kapott különbség nagyságrendje szerint!"
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

export default SubtractionSorter;

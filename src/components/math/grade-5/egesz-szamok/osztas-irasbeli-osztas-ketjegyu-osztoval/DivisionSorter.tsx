import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface DivisionSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const DivisionSorter: React.FC<DivisionSorterProps> = ({
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
    // 1. SZINT: PONTOSAN OSZTHATÓ VS MARADÉKOS OSZTÁS
    1: {
      categories: [
        { id: 'exact', name: 'Maradék nélkül osztható (r = 0)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' },
        { id: 'withRem', name: 'Maradékos osztás (r > 0)', badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800' }
      ],
      items: [
        { id: 'i1-1', label: '84 : 4 (= 21, m 0)', category: 'exact' },
        { id: 'i1-2', label: '100 : 5 (= 20, m 0)', category: 'exact' },
        { id: 'i1-3', label: '29 : 6 (= 4, m 5)', category: 'withRem' },
        { id: 'i1-4', label: '47 : 5 (= 9, m 2)', category: 'withRem' },
        { id: 'i1-5', label: '72 : 8 (= 9, m 0)', category: 'exact' },
        { id: 'i1-6', label: '68 : 8 (= 8, m 4)', category: 'withRem' },
        { id: 'i1-7', label: '450 : 10 (= 45, m 0)', category: 'exact' },
        { id: 'i1-8', label: '95 : 10 (= 9, m 5)', category: 'withRem' }
      ]
    },

    // 2. SZINT: AZ OSZTÁS TAGJAI ÉS SZEREPE (OSZTANDÓ, OSZTÓ, HÁNYADOS)
    2: {
      categories: [
        { id: 'dividend', name: 'Osztandó (amit elosztunk)', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800' },
        { id: 'divisor', name: 'Osztó (amivel osztunk)', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800' },
        { id: 'quotient', name: 'Hányados (az eredmény)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' }
      ],
      items: [
        { id: 'i2-1', label: 'A 84 : 4 = 21-ben a 84', category: 'dividend' },
        { id: 'i2-2', label: 'A 84 : 4 = 21-ben a 4', category: 'divisor' },
        { id: 'i2-3', label: 'A 84 : 4 = 21-ben a 21', category: 'quotient' },
        { id: 'i2-4', label: 'x : 6 = 15 esetén x (= 90)', category: 'dividend' },
        { id: 'i2-5', label: '120 : x = 40 esetén x (= 3)', category: 'divisor' },
        { id: 'i2-6', label: '200 : 5 = x esetén x (= 40)', category: 'quotient' },
        { id: 'i2-7', label: 'Hányados · Osztó + Maradék', category: 'dividend' },
        { id: 'i2-8', label: 'A szám, amivel soha nem lehet 0', category: 'divisor' },
        { id: 'i2-9', label: 'Osztandó : Osztó', category: 'quotient' }
      ]
    },

    // 3. SZINT: HÁNYADOSOK NAGYSÁGRENDJE
    3: {
      categories: [
        { id: 'under20', name: '< 20 (Kis hányados)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' },
        { id: 'twentyToFifty', name: '20 – 50 között', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800' },
        { id: 'overFifty', name: '> 50 (Nagy hányados)', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800' }
      ],
      items: [
        { id: 'i3-1', label: '450 : 30 (= 15)', category: 'under20' },
        { id: 'i3-2', label: '144 : 12 (= 12)', category: 'under20' },
        { id: 'i3-3', label: '842 : 26 (= 32)', category: 'twentyToFifty' },
        { id: 'i3-4', label: '625 : 25 (= 25)', category: 'twentyToFifty' },
        { id: 'i3-5', label: '1 000 : 25 (= 40)', category: 'twentyToFifty' },
        { id: 'i3-6', label: '3 750 : 50 (= 75)', category: 'overFifty' },
        { id: 'i3-7', label: '2 088 : 36 (= 58)', category: 'overFifty' },
        { id: 'i3-8', label: '348 : 4 (= 87)', category: 'overFifty' },
        { id: 'i3-9', label: '180 : 20 (= 9)', category: 'under20' }
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
                className="text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40 rounded-xl"
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
                    ? "bg-purple-600 text-white shadow-xs"
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
        title="Osztás Csoportosító Játék"
        subtitle={
          activeLevel === 1
            ? "Válogasd szét a pontosan osztható és a maradékos osztásokat!"
            : activeLevel === 2
            ? "Csoportosítsd a fogalmakat az osztás tagjai szerint!"
            : "Válogasd szét az osztásokat a kapott hányados nagyságrendje szerint!"
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

export default DivisionSorter;

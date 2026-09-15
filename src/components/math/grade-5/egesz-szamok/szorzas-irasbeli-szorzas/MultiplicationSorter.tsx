import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface MultiplicationSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const MultiplicationSorter: React.FC<MultiplicationSorterProps> = ({
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
    // 1. SZINT: SZORZÁS TULAJDONSÁGAI (FELCSERÉLHETŐ, CSOPORTOSÍTHATÓ, SZÉTTAGOLHATÓ)
    1: {
      categories: [
        { id: 'comm', name: 'Felcserélhetőség (a · b = b · a)', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800' },
        { id: 'assoc', name: 'Csoportosíthatóság ((a·b)·c = a·(b·c))', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' },
        { id: 'distrib', name: 'Széttagolhatóság (a·(b+c) = a·b + a·c)', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800' }
      ],
      items: [
        { id: 'i1-1', label: '14 · 5 = 5 · 14', category: 'comm' },
        { id: 'i1-2', label: '25 · 8 = 8 · 25', category: 'comm' },
        { id: 'i1-3', label: '(2 · 5) · 9 = 2 · (5 · 9)', category: 'assoc' },
        { id: 'i1-4', label: '(4 · 25) · 7 = 4 · (25 · 7)', category: 'assoc' },
        { id: 'i1-5', label: '6 · (20 + 3) = 6·20 + 6·3', category: 'distrib' },
        { id: 'i1-6', label: '8 · (50 - 2) = 8·50 - 8·2', category: 'distrib' },
        { id: 'i1-7', label: '100 · 34 = 34 · 100', category: 'comm' },
        { id: 'i1-8', label: '(8 · 125) · 3 = 8 · (125 · 3)', category: 'assoc' },
        { id: 'i1-9', label: '4 · (100 + 25) = 4·100 + 4·25', category: 'distrib' }
      ]
    },

    // 2. SZINT: SZORZÁS 10 HATVÁNYAIVAL (1 NULLA, 2 NULLA, 3 NULLA)
    2: {
      categories: [
        { id: 'oneZero', name: '1 nullával bővül (· 10)', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800' },
        { id: 'twoZeros', name: '2 nullával bővül (· 100)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' },
        { id: 'threeZeros', name: '3 nullával bővül (· 1 000)', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800' }
      ],
      items: [
        { id: 'i2-1', label: '45 · 10 (= 450)', category: 'oneZero' },
        { id: 'i2-2', label: '128 · 10 (= 1 280)', category: 'oneZero' },
        { id: 'i2-3', label: '72 · 100 (= 7 200)', category: 'twoZeros' },
        { id: 'i2-4', label: '450 · 100 (= 45 000)', category: 'twoZeros' },
        { id: 'i2-5', label: '38 · 1 000 (= 38 000)', category: 'threeZeros' },
        { id: 'i2-6', label: '5 · 1 000 (= 5 000)', category: 'threeZeros' },
        { id: 'i2-7', label: '90 · 10 (= 900)', category: 'oneZero' },
        { id: 'i2-8', label: '19 · 100 (= 1 900)', category: 'twoZeros' },
        { id: 'i2-9', label: '64 · 1 000 (= 64 000)', category: 'threeZeros' }
      ]
    },

    // 3. SZINT: SZORZATOK NAGYSÁGRENDJE
    3: {
      categories: [
        { id: 'under1000', name: '< 1 000 (Százas nagyságrend)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' },
        { id: 'thousandToFiveThousand', name: '1 000 – 5 000 között', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800' },
        { id: 'overFiveThousand', name: '> 5 000 (Nagy szorzat)', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800' }
      ],
      items: [
        { id: 'i3-1', label: '36 · 23 (= 828)', category: 'under1000' },
        { id: 'i3-2', label: '125 · 6 (= 750)', category: 'under1000' },
        { id: 'i3-3', label: '348 · 6 (= 2 088)', category: 'thousandToFiveThousand' },
        { id: 'i3-4', label: '45 · 32 (= 1 440)', category: 'thousandToFiveThousand' },
        { id: 'i3-5', label: '629 · 7 (= 4 403)', category: 'thousandToFiveThousand' },
        { id: 'i3-6', label: '1 250 · 6 (= 7 500)', category: 'overFiveThousand' },
        { id: 'i3-7', label: '250 · 40 (= 10 000)', category: 'overFiveThousand' },
        { id: 'i3-8', label: '48 · 15 (= 720)', category: 'under1000' },
        { id: 'i3-9', label: '312 · 42 (= 13 104)', category: 'overFiveThousand' }
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
        title="Szorzás Csoportosító Játék"
        subtitle={
          activeLevel === 1
            ? "Válogasd szét az azonosságokat a szorzás tulajdonságai szerint!"
            : activeLevel === 2
            ? "Csoportosítsd a szorzásokat a nullák száma szerint!"
            : "Válogasd szét a szorzatokat a kapott végeredmény nagyságrendje szerint!"
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

export default MultiplicationSorter;

import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AdditionSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const AdditionSorter: React.FC<AdditionSorterProps> = ({
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
        { id: 'noCarry', name: 'Nincs átvitel (helyiértékenként < 10)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' },
        { id: 'oneCarry', name: '1 átvitel (1 helyiértéken ≥ 10)', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800' },
        { id: 'multiCarry', name: 'Több átvitel (több helyiértéken ≥ 10)', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800' }
      ],
      items: [
        { id: 'i1-1', label: '124 + 352', category: 'noCarry' },
        { id: 'i1-2', label: '213 + 435', category: 'noCarry' },
        { id: 'i1-3', label: '348 + 125', category: 'oneCarry' },
        { id: 'i1-4', label: '261 + 172', category: 'oneCarry' },
        { id: 'i1-5', label: '478 + 256', category: 'multiCarry' },
        { id: 'i1-6', label: '689 + 345', category: 'multiCarry' },
        { id: 'i1-7', label: '501 + 203', category: 'noCarry' },
        { id: 'i1-8', label: '354 + 271', category: 'oneCarry' },
        { id: 'i1-9', label: '789 + 567', category: 'multiCarry' }
      ]
    },

    // 2. SZINT: ÖSSZEADÁS TULAJDONSÁGAI (FELCSERÉLHETŐ, CSOPORTOSÍTHATÓ, NULLA ELEM)
    2: {
      categories: [
        { id: 'comm', name: 'Felcserélhetőség (a + b = b + a)', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800' },
        { id: 'assoc', name: 'Csoportosíthatóság ((a+b)+c = a+(b+c))', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' },
        { id: 'zero', name: 'Nulla elem (a + 0 = a)', badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800' }
      ],
      items: [
        { id: 'i2-1', label: '34 + 58 = 58 + 34', category: 'comm' },
        { id: 'i2-2', label: '125 + 47 = 47 + 125', category: 'comm' },
        { id: 'i2-3', label: '(17 + 25) + 75 = 17 + (25 + 75)', category: 'assoc' },
        { id: 'i2-4', label: '(48 + 12) + 35 = 48 + (12 + 35)', category: 'assoc' },
        { id: 'i2-5', label: '456 + 0 = 456', category: 'zero' },
        { id: 'i2-6', label: '0 + 1 280 = 1 280', category: 'zero' },
        { id: 'i2-7', label: '789 + 123 = 123 + 789', category: 'comm' },
        { id: 'i2-8', label: '(120 + 80) + 50 = 120 + (80 + 50)', category: 'assoc' },
        { id: 'i2-9', label: '34 500 + 0 = 34 500', category: 'zero' }
      ]
    },

    // 3. SZINT: EREDMÉNYEK NAGYSÁGRENDJE
    3: {
      categories: [
        { id: 'under1000', name: '< 1 000 (Százas nagyságrend)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' },
        { id: 'thousandToFiveThousand', name: '1 000 – 5 000 között', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800' },
        { id: 'overFiveThousand', name: '> 5 000 (Nagy összeg)', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800' }
      ],
      items: [
        { id: 'i3-1', label: '384 + 195 (= 579)', category: 'under1000' },
        { id: 'i3-2', label: '476 + 258 (= 734)', category: 'under1000' },
        { id: 'i3-3', label: '1 250 + 1 350 (= 2 600)', category: 'thousandToFiveThousand' },
        { id: 'i3-4', label: '2 800 + 1 400 (= 4 200)', category: 'thousandToFiveThousand' },
        { id: 'i3-5', label: '4 785 + 3 648 (= 8 433)', category: 'overFiveThousand' },
        { id: 'i3-6', label: '6 890 + 2 345 (= 9 235)', category: 'overFiveThousand' },
        { id: 'i3-7', label: '250 + 450 (= 700)', category: 'under1000' },
        { id: 'i3-8', label: '2 300 + 1 700 (= 4 000)', category: 'thousandToFiveThousand' },
        { id: 'i3-9', label: '4 500 + 3 800 (= 8 300)', category: 'overFiveThousand' }
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
        title="Összeadás Csoportosító Játék"
        subtitle={
          activeLevel === 1
            ? "Válogasd szét a műveleteket az átvitelek száma szerint!"
            : activeLevel === 2
            ? "Csoportosítsd az azonosságokat az összeadás tulajdonságai szerint!"
            : "Válogasd szét az összeadásokat a végeredményük nagyságrendje szerint!"
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

export default AdditionSorter;

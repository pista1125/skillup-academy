import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface OrderOfOperationsSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const OrderOfOperationsSorter: React.FC<OrderOfOperationsSorterProps> = ({
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
    // 1. SZINT: ELSŐKÉNT ELVÉGZENDŐ MŰVELET TÍPUSA
    1: {
      categories: [
        { id: 'paren', name: 'Zárójelben lévő művelet (1. rang)', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800' },
        { id: 'multdiv', name: 'Szorzás vagy Osztás (2. rang)', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800' },
        { id: 'addsub', name: 'Összeadás vagy Kivonás (3. rang)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' }
      ],
      items: [
        { id: 'i1-1', label: '(18 + 4) · 5 ⟹ (18 + 4)', category: 'paren' },
        { id: 'i1-2', label: '18 + 4 · 5 ⟹ 4 · 5', category: 'multdiv' },
        { id: 'i1-3', label: '50 - 30 : 5 ⟹ 30 : 5', category: 'multdiv' },
        { id: 'i1-4', label: '(50 - 30) : 5 ⟹ (50 - 30)', category: 'paren' },
        { id: 'i1-5', label: '40 - 15 + 5 ⟹ 40 - 15 (balról)', category: 'addsub' },
        { id: 'i1-6', label: '12 + 8 · 3 ⟹ 8 · 3', category: 'multdiv' },
        { id: 'i1-7', label: '100 - [20 + 5] ⟹ [20 + 5]', category: 'paren' },
        { id: 'i1-8', label: '25 + 35 - 10 ⟹ 25 + 35 (balról)', category: 'addsub' },
        { id: 'i1-9', label: '24 : 6 · 2 ⟹ 24 : 6 (balról)', category: 'multdiv' }
      ]
    },

    // 2. SZINT: AZONOSSÁGOK TÍPUSA (FELCSERÉLÉS, CSOPORTOSÍTÁS, KIEMELÉS)
    2: {
      categories: [
        { id: 'comm', name: 'Felcserélhetőség (Kommutativitás)', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800' },
        { id: 'assoc', name: 'Csoportosíthatóság (Asszociativitás)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' },
        { id: 'distrib', name: 'Széttagolás / Kiemelés (Disztributivitás)', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800' }
      ],
      items: [
        { id: 'i2-1', label: '37 + 89 + 63 = (37 + 63) + 89', category: 'assoc' },
        { id: 'i2-2', label: '4 · 39 · 25 = (4 · 25) · 39', category: 'assoc' },
        { id: 'i2-3', label: '17 · 4 + 17 · 6 = 17 · (4 + 6)', category: 'distrib' },
        { id: 'i2-4', label: '18 · (50 - 1) = 18·50 - 18·1', category: 'distrib' },
        { id: 'i2-5', label: '145 + 238 = 238 + 145', category: 'comm' },
        { id: 'i2-6', label: '25 · 74 = 74 · 25', category: 'comm' },
        { id: 'i2-7', label: '8 · 125 · 7 = (8 · 125) · 7', category: 'assoc' },
        { id: 'i2-8', label: '25 · 12 - 25 · 2 = 25 · (12 - 2)', category: 'distrib' },
        { id: 'i2-9', label: 'a · b = b · a', category: 'comm' }
      ]
    },

    // 3. SZINT: KIFEJEZÉSEK VÉGEREDMÉNYE
    3: {
      categories: [
        { id: 'under30', name: '< 30 (Kisebb érték)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' },
        { id: 'thirtyToHundred', name: '30 – 100 között', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800' },
        { id: 'overHundred', name: '> 100 (Nagy érték)', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800' }
      ],
      items: [
        { id: 'i3-1', label: '24 : 6 · 2 (= 8)', category: 'under30' },
        { id: 'i3-2', label: '40 - (15 + 5) (= 20)', category: 'under30' },
        { id: 'i3-3', label: '18 + 4 · 5 (= 38)', category: 'thirtyToHundred' },
        { id: 'i3-4', label: '50 - 30 : 5 (= 44)', category: 'thirtyToHundred' },
        { id: 'i3-5', label: '100 - [20 + (15 - 5) · 3] (= 50)', category: 'thirtyToHundred' },
        { id: 'i3-6', label: '(18 + 4) · 5 (= 110)', category: 'overHundred' },
        { id: 'i3-7', label: '17 · 4 + 17 · 6 (= 170)', category: 'overHundred' },
        { id: 'i3-8', label: '500 - 4 · 25 (= 400)', category: 'overHundred' },
        { id: 'i3-9', label: '(50 - 30) : 5 (= 4)', category: 'under30' }
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
                className="text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 rounded-xl"
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
                    ? "bg-indigo-600 text-white shadow-xs"
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
        title="Műveleti Sorrend Csoportosító Játék"
        subtitle={
          activeLevel === 1
            ? "Válogasd szét a kifejezéseket az elsőként elvégzendő művelet típusa szerint!"
            : activeLevel === 2
            ? "Csoportosítsd az átalakításokat az alkalmazott matematikai azonosság szerint!"
            : "Válogasd szét a kifejezéseket a kiszámolt végeredményük nagyságrendje szerint!"
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

export default OrderOfOperationsSorter;

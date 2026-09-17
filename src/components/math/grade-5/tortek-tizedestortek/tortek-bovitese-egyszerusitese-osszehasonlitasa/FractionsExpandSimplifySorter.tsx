import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FractionsExpandSimplifySorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const FractionsExpandSimplifySorter: React.FC<FractionsExpandSimplifySorterProps> = ({
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
    // 1. SZINT: TÖRTEK ÉRTÉKE (LEGEGYSZERŰBB ALAK SZERINT)
    1: {
      categories: [
        {
          id: 'half',
          name: 'Értéke: 1/2',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        },
        {
          id: 'third',
          name: 'Értéke: 1/3',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'two-thirds',
          name: 'Értéke: 2/3',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        }
      ],
      items: [
        { id: 'i1-1', label: '2/4', category: 'half' },
        { id: 'i1-2', label: '3/6', category: 'half' },
        { id: 'i1-3', label: '5/10', category: 'half' },
        { id: 'i1-4', label: '10/20', category: 'half' },
        { id: 'i1-5', label: '2/6', category: 'third' },
        { id: 'i1-6', label: '3/9', category: 'third' },
        { id: 'i1-7', label: '4/12', category: 'third' },
        { id: 'i1-8', label: '6/18', category: 'third' },
        { id: 'i1-9', label: '4/6', category: 'two-thirds' },
        { id: 'i1-10', label: '6/9', category: 'two-thirds' },
        { id: 'i1-11', label: '8/12', category: 'two-thirds' },
        { id: 'i1-12', label: '10/15', category: 'two-thirds' }
      ]
    },

    // 2. SZINT: LEGEGYSZERŰBB ALAKÚ VS. TOVÁBB EGYSZERŰSÍTHETŐ
    2: {
      categories: [
        {
          id: 'simplest',
          name: 'Legegyszerűbb alak (tovább nem egyszerűsíthető)',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'reducible',
          name: 'Még tovább egyszerűsíthető',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        }
      ],
      items: [
        { id: 'i2-1', label: '2/3', category: 'simplest' },
        { id: 'i2-2', label: '3/5', category: 'simplest' },
        { id: 'i2-3', label: '5/7', category: 'simplest' },
        { id: 'i2-4', label: '7/9', category: 'simplest' },
        { id: 'i2-5', label: '4/11', category: 'simplest' },
        { id: 'i2-6', label: '9/10', category: 'simplest' },
        { id: 'i2-7', label: '4/6', category: 'reducible' },
        { id: 'i2-8', label: '6/8', category: 'reducible' },
        { id: 'i2-9', label: '9/12', category: 'reducible' },
        { id: 'i2-10', label: '10/25', category: 'reducible' },
        { id: 'i2-11', label: '12/18', category: 'reducible' },
        { id: 'i2-12', label: '15/30', category: 'reducible' }
      ]
    },

    // 3. SZINT: ÖSSZEHASONLÍTÁS A 3/4-HEZ KÉPEST
    3: {
      categories: [
        {
          id: 'less',
          name: 'Kisebb, mint 3/4 (< 3/4)',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        },
        {
          id: 'equal',
          name: 'Pontosan 3/4 (= 3/4)',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'greater',
          name: 'Nagyobb, mint 3/4 (> 3/4)',
          badgeColor: 'bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-950/60 dark:text-orange-300 dark:border-orange-800'
        }
      ],
      items: [
        { id: 'i3-1', label: '1/2', category: 'less' },
        { id: 'i3-2', label: '2/4', category: 'less' },
        { id: 'i3-3', label: '5/8', category: 'less' },
        { id: 'i3-4', label: '7/12', category: 'less' },
        { id: 'i3-5', label: '6/8', category: 'equal' },
        { id: 'i3-6', label: '9/12', category: 'equal' },
        { id: 'i3-7', label: '15/20', category: 'equal' },
        { id: 'i3-8', label: '30/40', category: 'equal' },
        { id: 'i3-9', label: '4/4', category: 'greater' },
        { id: 'i3-10', label: '5/6', category: 'greater' },
        { id: 'i3-11', label: '7/8', category: 'greater' },
        { id: 'i3-12', label: '4/5', category: 'greater' }
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
        title="Törtek bővítése és összehasonlítása Csoportosító"
        subtitle={
          activeLevel === 1
            ? "Csoportosítsd a törteket az egyszerűsített alapértékük szerint!"
            : activeLevel === 2
            ? "Válogasd szét a törteket: legegyszerűbb alakú vagy tovább egyszerűsíthető?"
            : "Rendezd a törteket a 3/4-hez viszonyított nagyságuk alapján!"
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

export default FractionsExpandSimplifySorter;

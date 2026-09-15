import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SetOperationsSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const SetOperationsSorter: React.FC<SetOperationsSorterProps> = ({
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
    // 1. SZINT: VENN-DIAGRAM TARTOMÁNYOK (A = 12 osztói: {1, 2, 3, 4, 6, 12}, B = 18 osztói: {1, 2, 3, 6, 9, 18})
    1: {
      categories: [
        { id: 'only-A', name: 'Csak az A-ban (A \\ B)', badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800' },
        { id: 'both', name: 'Közös részben (A ∩ B)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' },
        { id: 'only-B', name: 'Csak a B-ben (B \\ A)', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800' }
      ],
      items: [
        { id: 'i1-1', label: '4 (12 osztója, de nem 18-é)', category: 'only-A' },
        { id: 'i1-2', label: '12 (csak a 12 osztója)', category: 'only-A' },
        { id: 'i1-3', label: '1 (mindkettő osztója)', category: 'both' },
        { id: 'i1-4', label: '2 (mindkettő osztója)', category: 'both' },
        { id: 'i1-5', label: '3 (mindkettő osztója)', category: 'both' },
        { id: 'i1-6', label: '6 (mindkettő osztója)', category: 'both' },
        { id: 'i1-7', label: '9 (18 osztója, de nem 12-é)', category: 'only-B' },
        { id: 'i1-8', label: '18 (csak a 18 osztója)', category: 'only-B' }
      ]
    },

    // 2. SZINT: MELYIK HALMAZMŰVELET FEJEZI KI A FOGALMAT?
    2: {
      categories: [
        { id: 'cap', name: 'Metszet (∩)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' },
        { id: 'cup', name: 'Unió (∪)', badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800' },
        { id: 'diff', name: 'Különbség (\\)', badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800' }
      ],
      items: [
        { id: 'i2-1', label: 'Közös elemek halmaza', category: 'cap' },
        { id: 'i2-2', label: 'x ∈ A ÉS x ∈ B', category: 'cap' },
        { id: 'i2-3', label: 'Páros prímek: Prímek ∩ Párosak = {2}', category: 'cap' },
        { id: 'i2-4', label: 'Egyesített elemek összessége', category: 'cup' },
        { id: 'i2-5', label: 'x ∈ A VAGY x ∈ B', category: 'cup' },
        { id: 'i2-6', label: 'Legalább az egyik halmaz elemei', category: 'cup' },
        { id: 'i2-7', label: 'x ∈ A és x ∉ B', category: 'diff' },
        { id: 'i2-8', label: 'A-ban benne van, de B-ből elhagyjuk', category: 'diff' },
        { id: 'i2-9', label: 'Nem felcserélhető művelet (A \\ B ≠ B \\ A)', category: 'diff' }
      ]
    },

    // 3. SZINT: SZÖVEGES SZITA-SZITUÁCIÓK SZÁMÉRTÉKEI (30 fős osztály: |A|=18, |N|=15, |A∩N|=7)
    3: {
      categories: [
        { id: 'only-angol', name: 'Csak Angolosok (|A \\ N|)', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800' },
        { id: 'mindketto', name: 'Mindkét Nyelv (|A ∩ N|)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' },
        { id: 'only-nemet', name: 'Csak Németesek (|N \\ A|)', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800' },
        { id: 'egyik-sem', name: 'Egyik Nyelvet sem tanulók', badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800' }
      ],
      items: [
        { id: 'i3-1', label: '18 - 7 = 11 fő', category: 'only-angol' },
        { id: 'i3-2', label: 'Azok, akik angolul beszélnek, de németül nem', category: 'only-angol' },
        { id: 'i3-3', label: '7 fő (közös rész)', category: 'mindketto' },
        { id: 'i3-4', label: 'Mindkét tagozatra járó diákok', category: 'mindketto' },
        { id: 'i3-5', label: '15 - 7 = 8 fő', category: 'only-nemet' },
        { id: 'i3-6', label: 'Azok, akik németül tanulnak, de angolul nem', category: 'only-nemet' },
        { id: 'i3-7', label: '30 - (11 + 7 + 8) = 4 fő', category: 'egyik-sem' },
        { id: 'i3-8', label: 'Nyelvórára egyáltalán nem járók', category: 'egyik-sem' }
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
                className="text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 rounded-xl"
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
        title="Halmazművelet Csoportosító"
        subtitle={
          activeLevel === 1
            ? "Válogasd szét a 12 és 18 osztóit a megfelelő Venn-diagram tartományokba!"
            : activeLevel === 2
            ? "Döntsd el a matematikai definíciókról, hogy melyik halmazművelethez tartoznak!"
            : "Helyezd el a szöveges osztályfeladat számadatait a megfelelő halmazkategóriákba!"
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

export default SetOperationsSorter;

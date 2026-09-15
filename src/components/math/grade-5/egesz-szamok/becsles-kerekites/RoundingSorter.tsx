import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface RoundingSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const RoundingSorter: React.FC<RoundingSorterProps> = ({
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
    // 1. SZINT: LEFELÉ VS FELFELÉ KEREKÍTÉS (TÍZESRE)
    1: {
      categories: [
        { id: 'roundDown', name: 'Lefelé kerekítünk (0, 1, 2, 3, 4)', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800' },
        { id: 'roundUp', name: 'Felfelé kerekítünk (5, 6, 7, 8, 9)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' }
      ],
      items: [
        { id: 'i1-1', label: '43 (tízesre)', category: 'roundDown' },
        { id: 'i1-2', label: '71 (tízesre)', category: 'roundDown' },
        { id: 'i1-3', label: '92 (tízesre)', category: 'roundDown' },
        { id: 'i1-4', label: '58 (tízesre)', category: 'roundUp' },
        { id: 'i1-5', label: '45 (tízesre)', category: 'roundUp' },
        { id: 'i1-6', label: '89 (tízesre)', category: 'roundUp' },
        { id: 'i1-7', label: '134 (tízesre)', category: 'roundDown' },
        { id: 'i1-8', label: '265 (tízesre)', category: 'roundUp' }
      ]
    },

    // 2. SZINT: KEREKÍTETT SZÁZAS ÉRTÉKEK (400, 500, 600)
    2: {
      categories: [
        { id: 'c400', name: '≈ 400-ra kerekül', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' },
        { id: 'c500', name: '≈ 500-ra kerekül', badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800' },
        { id: 'c600', name: '≈ 600-ra kerekül', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800' }
      ],
      items: [
        { id: 'i2-1', label: '382', category: 'c400' },
        { id: 'i2-2', label: '435', category: 'c400' },
        { id: 'i2-3', label: '468', category: 'c500' },
        { id: 'i2-4', label: '540', category: 'c500' },
        { id: 'i2-5', label: '582', category: 'c600' },
        { id: 'i2-6', label: '625', category: 'c600' },
        { id: 'i2-7', label: '399', category: 'c400' },
        { id: 'i2-8', label: '495', category: 'c500' },
        { id: 'i2-9', label: '550', category: 'c600' }
      ]
    },

    // 3. SZINT: KEREKÍTÉSI HELYIÉRTÉK MEGHATÁROZÁSA (TÍZESRE, SZÁZASRA, EZRESRE)
    3: {
      categories: [
        { id: 'tens', name: 'Tízesre kerekítve (10)', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800' },
        { id: 'hundreds', name: 'Százasra kerekítve (100)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' },
        { id: 'thousands', name: 'Ezresre kerekítve (1 000)', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800' }
      ],
      items: [
        { id: 'i3-1', label: '45 782 ≈ 45 780', category: 'tens' },
        { id: 'i3-2', label: '45 782 ≈ 45 800', category: 'hundreds' },
        { id: 'i3-3', label: '45 782 ≈ 46 000', category: 'thousands' },
        { id: 'i3-4', label: '12 346 ≈ 12 350', category: 'tens' },
        { id: 'i3-5', label: '12 346 ≈ 12 300', category: 'hundreds' },
        { id: 'i3-6', label: '12 346 ≈ 12 000', category: 'thousands' },
        { id: 'i3-7', label: '984 ≈ 980', category: 'tens' },
        { id: 'i3-8', label: '984 ≈ 1 000 (százasra)', category: 'hundreds' },
        { id: 'i3-9', label: '7 420 ≈ 7 000', category: 'thousands' }
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
                className="text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 rounded-xl"
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
        title="Kerekítés Csoportosító Játék"
        subtitle={
          activeLevel === 1
            ? "Válogasd szét a számokat lefelé vagy felfelé kerekítés szerint!"
            : activeLevel === 2
            ? "Csoportosítsd a számokat a kerekített százas értékük szerint!"
            : "Határozd meg, melyik helyiértékre történt a kerekítés!"
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

export default RoundingSorter;

import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface NumberLineMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const NumberLineMatcher: React.FC<NumberLineMatcherProps> = ({
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

  const levels: Record<DifficultyLevel, MatcherLevelConfig> = {
    // 1. SZINT: 0–100 KÖZÖTTI PONTOK ÉS SZOMSZÉDOK
    1: {
      pairs: [
        { id: 'p1-1', prompt: '0 és 10 felezőpontja', value: '5' },
        { id: 'p1-2', prompt: '20 és 40 felezőpontja', value: '30' },
        { id: 'p1-3', prompt: '47 kisebb tízes szomszédja', value: '40' },
        { id: 'p1-4', prompt: '47 nagyobb tízes szomszédja', value: '50' },
        { id: 'p1-5', prompt: 'Távolság 15 és 35 között', value: '20 egység' },
        { id: 'p1-6', prompt: '0..50 közötti 10 osztás lépésköze', value: '5 egység' },
        { id: 'p1-7', prompt: '63 közelebbi tízes szomszédja', value: '60' },
        { id: 'p1-8', prompt: '30 és 50 felezőpontja', value: '40' }
      ]
    },

    // 2. SZINT: 0–1000 KÖZÖTTI SKÁLÁK ÉS KEREK SZÁZASOK
    2: {
      pairs: [
        { id: 'p2-1', prompt: '348 kisebb százas szomszédja', value: '300' },
        { id: 'p2-2', prompt: '348 nagyobb százas szomszédja', value: '400' },
        { id: 'p2-3', prompt: '200 és 600 felezőpontja', value: '400' },
        { id: 'p2-4', prompt: 'Távolság 150 és 450 között', value: '300 egység' },
        { id: 'p2-5', prompt: '0 és 1000 között 10 osztásköz', value: '100 / osztás' },
        { id: 'p2-6', prompt: '750 közelebbi százas szomszédja', value: '800 (felfelé)' },
        { id: 'p2-7', prompt: '400 és 500 felezőpontja', value: '450' },
        { id: 'p2-8', prompt: '0 és 500 között 10 osztásköz', value: '50 / osztás' }
      ]
    },

    // 3. SZINT: NAGY SZÁMOK ÉS ÖSSZETETT TÁVOLSÁGOK
    3: {
      pairs: [
        { id: 'p3-1', prompt: '4 500 és 5 500 felezőpontja', value: '5 000' },
        { id: 'p3-2', prompt: 'Távolság 1 200 és 3 800 között', value: '2 600 egység' },
        { id: 'p3-3', prompt: '7 850 kerek ezres szomszédai', value: '7 000 és 8 000' },
        { id: 'p3-4', prompt: '0..5000 között 5 egyenlő szakasz', value: '1 000 / szakasz' },
        { id: 'p3-5', prompt: '8 400 közelebbi ezres szomszédja', value: '8 000' },
        { id: 'p3-6', prompt: '2 500 és 7 500 felezőpontja', value: '5 000' },
        { id: 'p3-7', prompt: 'Távolság 4 200 és 9 000 között', value: '4 800 egység' },
        { id: 'p3-8', prompt: '0..10 000 között 10 osztásköz', value: '1 000 / osztás' }
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

      <MatcherTemplate
        level={activeLevel}
        title="Számegyenes Párosító Játék"
        subtitle={
          activeLevel === 1
            ? "Párosítsd a 0–100 közötti számegyenes pontjait, felezőit és szomszédait!"
            : activeLevel === 2
            ? "Párosítsd a 0–1000 közötti beosztásokat és kerek százas szomszédokat!"
            : "Keresd meg az összetett számegyenesi távolságok és felezőpontok párjait!"
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
        themeColor="emerald"
      />
    </div>
  );
};

export default NumberLineMatcher;

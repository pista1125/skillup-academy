import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface MultiplicationMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const MultiplicationMatcher: React.FC<MultiplicationMatcherProps> = ({
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
    // 1. SZINT: SZORZÁS 10-ZEL, 100-ZAL ÉS FEJBEN SZORZÁS
    1: {
      pairs: [
        { id: 'p1-1', prompt: '45 · 10', value: '450' },
        { id: 'p1-2', prompt: '72 · 100', value: '7 200' },
        { id: 'p1-3', prompt: '38 · 1 000', value: '38 000' },
        { id: 'p1-4', prompt: '14 · 30', value: '420' },
        { id: 'p1-5', prompt: '25 · 4', value: '100' },
        { id: 'p1-6', prompt: '15 · 6', value: '90' },
        { id: 'p1-7', prompt: '80 · 50', value: '4 000' },
        { id: 'p1-8', prompt: '125 · 8', value: '1 000' }
      ]
    },

    // 2. SZINT: ÍRÁSBELI SZORZÁS EGYJEGYŰVEL
    2: {
      pairs: [
        { id: 'p2-1', prompt: '348 · 6', value: '2 088' },
        { id: 'p2-2', prompt: '475 · 4', value: '1 900' },
        { id: 'p2-3', prompt: '629 · 7', value: '4 403' },
        { id: 'p2-4', prompt: '816 · 5', value: '4 080' },
        { id: 'p2-5', prompt: '1 250 · 6', value: '7 500' },
        { id: 'p2-6', prompt: '542 · 8', value: '4 336' },
        { id: 'p2-7', prompt: '309 · 9', value: '2 781' },
        { id: 'p2-8', prompt: '724 · 3', value: '2 172' }
      ]
    },

    // 3. SZINT: KÉTJEGYŰ SZORZÓ ÉS ÖSSZETETT FELADATOK
    3: {
      pairs: [
        { id: 'p3-1', prompt: '36 · 23', value: '828' },
        { id: 'p3-2', prompt: '45 · 32', value: '1 440' },
        { id: 'p3-3', prompt: '124 · 25', value: '3 100' },
        { id: 'p3-4', prompt: '250 · 40', value: '10 000' },
        { id: 'p3-5', prompt: '78 · 15', value: '1 170' },
        { id: 'p3-6', prompt: '312 · 42', value: '13 104' },
        { id: 'p3-7', prompt: '199 · 11', value: '2 189' },
        { id: 'p3-8', prompt: '500 · 200', value: '100 000' }
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
        title="Szorzás Párosító Játék"
        subtitle={
          activeLevel === 1
            ? "Párosítsd a fejben szorozható kifejezéseket és a 10 hatványaival történő szorzásokat!"
            : activeLevel === 2
            ? "Párosítsd az egyjegyűvel történő írásbeli szorzásokat a pontos végeredménnyel!"
            : "Keresd meg a kétjegyű szorzások és nagyobb kerek szorzatok párjait!"
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

export default MultiplicationMatcher;

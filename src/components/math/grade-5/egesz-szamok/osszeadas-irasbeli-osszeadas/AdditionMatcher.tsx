import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AdditionMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const AdditionMatcher: React.FC<AdditionMatcherProps> = ({
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
    // 1. SZINT: KEREK ÖSSZEGEK ÉS KIEGÉSZÍTÉSEK
    1: {
      pairs: [
        { id: 'p1-1', prompt: '25 + 75', value: '100' },
        { id: 'p1-2', prompt: '38 + 12', value: '50' },
        { id: 'p1-3', prompt: '140 + 60', value: '200' },
        { id: 'p1-4', prompt: '350 + 250', value: '600' },
        { id: 'p1-5', prompt: '17 + 25 + 13', value: '55' },
        { id: 'p1-6', prompt: '48 + 0', value: '48' },
        { id: 'p1-7', prompt: '84 + 16', value: '100' },
        { id: 'p1-8', prompt: '450 + 550', value: '1 000' }
      ]
    },

    // 2. SZINT: ÍRÁSBELI ÖSSZEADÁS ÁTLÉPÉSSEL
    2: {
      pairs: [
        { id: 'p2-1', prompt: '384 + 195', value: '579' },
        { id: 'p2-2', prompt: '476 + 258', value: '734' },
        { id: 'p2-3', prompt: '567 + 345', value: '912' },
        { id: 'p2-4', prompt: '689 + 311', value: '1 000' },
        { id: 'p2-5', prompt: '245 + 478', value: '723' },
        { id: 'p2-6', prompt: '856 + 144', value: '1 000' },
        { id: 'p2-7', prompt: '199 + 456', value: '655' },
        { id: 'p2-8', prompt: '348 + 279', value: '627' }
      ]
    },

    // 3. SZINT: NAGYOBB SZÁMOK ÉS TÖBBTAGÚ ÖSSZEADÁS
    3: {
      pairs: [
        { id: 'p3-1', prompt: '4 785 + 3 648', value: '8 433' },
        { id: 'p3-2', prompt: '6 890 + 2 345', value: '9 235' },
        { id: 'p3-3', prompt: '1 250 + 3 750 + 2 500', value: '7 500' },
        { id: 'p3-4', prompt: '15 400 + 24 600', value: '40 000' },
        { id: 'p3-5', prompt: '7 899 + 1', value: '7 900' },
        { id: 'p3-6', prompt: '9 999 + 1', value: '10 000' },
        { id: 'p3-7', prompt: '12 350 + 8 650', value: '21 000' },
        { id: 'p3-8', prompt: '45 000 + 55 000', value: '100 000' }
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
        title="Összeadás Párosító Játék"
        subtitle={
          activeLevel === 1
            ? "Párosítsd a fejben összeadható számokat a kerek összegeikkel!"
            : activeLevel === 2
            ? "Párosítsd az írásbeli 3-jegyű összeadásokat az eredményükkel!"
            : "Keresd meg a 4-jegyű és többtagú összeadások helyes végeredményét!"
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

export default AdditionMatcher;

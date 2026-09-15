import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SqrtConceptMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const SqrtConceptMatcher: React.FC<SqrtConceptMatcherProps> = ({
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
    // 1. SZINT: NÉGYZETSZÁMOK ÉS ALAPVETŐ GYÖKÖK
    1: {
      pairs: [
        { id: 'p1-1', prompt: '√81', value: '9 (9² = 81)' },
        { id: 'p1-2', prompt: '√144', value: '12 (12² = 144)' },
        { id: 'p1-3', prompt: '√0.25', value: '0.5 (0.5² = 0.25)' },
        { id: 'p1-4', prompt: '√(16/49)', value: '4/7 (4²/7²)' },
        { id: 'p1-5', prompt: '-√64', value: '-8 (Előjel a gyök előtt)' },
        { id: 'p1-6', prompt: '√0', value: '0 (0² = 0)' }
      ]
    },

    // 2. SZINT: √(a²) = |a| ÉS ÉRTELMEZÉSI TARTOMÁNY
    2: {
      pairs: [
        { id: 'p2-1', prompt: '√((-7)²)', value: '7 (|-7| = 7, mindig nemnegatív)' },
        { id: 'p2-2', prompt: '(√15)²', value: '15 ((√a)² = a)' },
        { id: 'p2-3', prompt: '√(x - 3) értelmezett', value: 'x ≥ 3 (x - 3 ≥ 0)' },
        { id: 'p2-4', prompt: '√(6 - x) értelmezett', value: 'x ≤ 6 (6 - x ≥ 0)' },
        { id: 'p2-5', prompt: '√((-11)²)', value: '11 (|-11| = 11)' },
        { id: 'p2-6', prompt: '√(-25)', value: 'Nem értelmezhető (a < 0)' }
      ]
    },

    // 3. SZINT: BECSLÉSEK ÉS ÖSSZETETT KIFEJEZÉSEK
    3: {
      pairs: [
        { id: 'p3-1', prompt: '√50', value: '7 és 8 között (49 < 50 < 64)' },
        { id: 'p3-2', prompt: '√(3² + 4²)', value: '5 (√(9 + 16) = √25)' },
        { id: 'p3-3', prompt: '√(100 - 36)', value: '8 (√64 = 8)' },
        { id: 'p3-4', prompt: '√120', value: '10 és 11 között (100 < 120 < 121)' },
        { id: 'p3-5', prompt: '√(2x + 1) = 7', value: 'x = 24 (2x + 1 = 49)' },
        { id: 'p3-6', prompt: '√0.0081', value: '0.09 (0.09² = 0.0081)' }
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
                className="text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl"
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
                    ? "bg-rose-600 text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900"
                )}
              >
                {lvl}. Szint
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Matcher Board with cards */}
      <MatcherTemplate
        level={activeLevel}
        title="Négyzetgyök Párosító"
        subtitle={
          activeLevel === 1
            ? "Párosítsd össze a négyzetgyököket a pontos értékükkel!"
            : activeLevel === 2
            ? "Párosítsd a négyzetgyökös azonosságokat és értelmezési tartományokat!"
            : "Keresd meg a becsült gyököket és az összetett kifejezések eredményeit!"
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
        themeColor="rose"
      />
    </div>
  );
};

export default SqrtConceptMatcher;

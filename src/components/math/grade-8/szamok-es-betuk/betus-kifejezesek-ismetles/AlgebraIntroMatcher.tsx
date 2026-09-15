import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AlgebraIntroMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const AlgebraIntroMatcher: React.FC<AlgebraIntroMatcherProps> = ({
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
    // 1. SZINT: EGYSZERŰ ÖSSZEVONÁSOK
    1: {
      pairs: [
        { id: 'p1-1', prompt: '5x + 3x - 2x', value: '6x ((5 + 3 - 2)x)' },
        { id: 'p1-2', prompt: '7a - 12a + 4a', value: '-a ((7 - 12 + 4)a = -1a)' },
        { id: 'p1-3', prompt: '4x + 3y - x + 2y', value: '3x + 5y' },
        { id: 'p1-4', prompt: '2a² + 5a² - 4a²', value: '3a² ((2 + 5 - 4)a²)' },
        { id: 'p1-5', prompt: '-3x - 5x + 10x', value: '2x ((-3 - 5 + 10)x)' },
        { id: 'p1-6', prompt: '6ab - 2ab - 5ab', value: '-ab ((6 - 2 - 5)ab)' }
      ]
    },

    // 2. SZINT: HELYETTESÍTÉSI ÉRTÉKEK
    2: {
      pairs: [
        { id: 'p2-1', prompt: '3x - 5 (ha x = 4)', value: '7 (3 · 4 - 5 = 12 - 5)' },
        { id: 'p2-2', prompt: '2x² + 1 (ha x = -3)', value: '19 (2 · 9 + 1 = 18 + 1)' },
        { id: 'p2-3', prompt: '-x² + 4 (ha x = 2)', value: '0 (-4 + 4)' },
        { id: 'p2-4', prompt: '3a - 2b (ha a = 2, b = -1)', value: '8 (6 - (-2) = 6 + 2)' },
        { id: 'p2-5', prompt: '(x - 3)² (ha x = -2)', value: '25 ((-5)² = 25)' },
        { id: 'p2-6', prompt: '(x + 6) / 2 (ha x = 4)', value: '5 (10 / 2 = 5)' }
      ]
    },

    // 3. SZINT: ZÁRÓJELFELBONTÁS ÉS ÖSSZETETT ÖSSZEVONÁS
    3: {
      pairs: [
        { id: 'p3-1', prompt: '2(3x - 4) + 5', value: '6x - 3 (6x - 8 + 5)' },
        { id: 'p3-2', prompt: '3(x + 2) - 2(x - 1)', value: 'x + 8 (3x + 6 - 2x + 2)' },
        { id: 'p3-3', prompt: '-(2x - 5) + 3x', value: 'x + 5 (-2x + 5 + 3x)' },
        { id: 'p3-4', prompt: '4(a - b) + 2(a + 2b)', value: '6a (4a - 4b + 2a + 4b)' },
        { id: 'p3-5', prompt: '2x(3 - x) + 2x²', value: '6x (6x - 2x² + 2x²)' },
        { id: 'p3-6', prompt: '5(x - 2) - 3(x - 3)', value: '2x - 1 (5x - 10 - 3x + 9)' }
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
                className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-xl"
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
                    ? "bg-blue-600 text-white shadow-xs"
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
        title="Betűs Kifejezések Párosító"
        subtitle={
          activeLevel === 1
            ? "Párosítsd össze a kifejezéseket az összevont alakjukkal!"
            : activeLevel === 2
            ? "Párosítsd a kifejezéseket a kiszámított helyettesítési értékükkel!"
            : "Keresd meg a zárójelfelbontások és algebrai átalakítások eredményeit!"
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
        themeColor="blue"
      />
    </div>
  );
};

export default AlgebraIntroMatcher;

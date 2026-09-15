import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ChapterSummaryMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const ChapterSummaryMatcher: React.FC<ChapterSummaryMatcherProps> = ({
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
    // 1. SZINT: ALAPFOGALMAK ÉS AZONOSSÁGOK
    1: {
      pairs: [
        { id: 'p1-1', prompt: '3 elemű halmaz részhalmazai', value: '8 (2³ = 8)' },
        { id: 'p1-2', prompt: 'a⁰ értéke (ha a ≠ 0)', value: '1' },
        { id: 'p1-3', prompt: '√144 értéke', value: '12' },
        { id: 'p1-4', prompt: '(x + 4)² kifejtve', value: 'x² + 8x + 16' },
        { id: 'p1-5', prompt: '(x + 5)(x - 5)', value: 'x² - 25' },
        { id: 'p1-6', prompt: '4.5 · 10³ normálalak', value: '4500' }
      ]
    },

    // 2. SZINT: MŰVELETEK, GYÖKÖK ÉS AZONOSSÁGOK
    2: {
      pairs: [
        { id: 'p2-1', prompt: '√50 részleges gyökvonással', value: '5√2 (√(25·2))' },
        { id: 'p2-2', prompt: '|A|=12, |B|=15, |A∩B|=4 ⟹ |A∪B|', value: '23 (12 + 15 - 4)' },
        { id: 'p2-3', prompt: '2⁸ : 2⁵ hatványértéke', value: '8 (2³ = 8)' },
        { id: 'p2-4', prompt: '(2x - 3)² kifejtve', value: '4x² - 12x + 9' },
        { id: 'p2-5', prompt: '√((-9)²) értéke', value: '9 (|-9| = 9)' },
        { id: 'p2-6', prompt: '6x² - 15x kiemelve', value: '3x(2x - 5)' }
      ]
    },

    // 3. SZINT: ÖSSZETETT FEJEZETI FELADATOK
    3: {
      pairs: [
        { id: 'p3-1', prompt: '(x² - 36) / (x - 6) (x ≠ 6)', value: 'x + 6' },
        { id: 'p3-2', prompt: '52 · 48 fejszámolással', value: '2496 (2500 - 4)' },
        { id: 'p3-3', prompt: '√75 - √12 összevonva', value: '3√3 (5√3 - 2√3)' },
        { id: 'p3-4', prompt: '(3x + 2y)² kifejtve', value: '9x² + 12xy + 4y²' },
        { id: 'p3-5', prompt: '(2 · 10⁴) · (3.5 · 10³)', value: '7 · 10⁷' },
        { id: 'p3-6', prompt: '(2x + 5)(2x - 5)', value: '4x² - 25' }
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

          {/* Level Switcher (Standalone mode) */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            {([1, 2, 3] as DifficultyLevel[]).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setCurrentLevel(lvl)}
                className={cn(
                  'px-3 py-1 text-xs font-bold rounded-lg transition-all',
                  currentLevel === lvl
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                )}
              >
                {lvl}. Szint
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Matcher Game */}
      <MatcherTemplate
        levels={levels}
        level={activeLevel}
        onNextLevel={onNextLevel}
        onOpenRules={onOpenRules}
        title="I. Számok és betűk Összefoglalás – Párosító"
        subtitle="Párosítsd a fejezet kulcsfogalmait, azonosságait és mintafeladatait!"
      />
    </div>
  );
};

export default ChapterSummaryMatcher;

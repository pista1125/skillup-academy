import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PolynomialMultMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const PolynomialMultMatcher: React.FC<PolynomialMultMatcherProps> = ({
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
    // 1. SZINT: KÉTTAGÚAK SZORZATA
    1: {
      pairs: [
        { id: 'p1-1', prompt: '(x + 2)(x + 3)', value: 'x² + 5x + 6 (x² + 3x + 2x + 6)' },
        { id: 'p1-2', prompt: '(x - 4)(x + 2)', value: 'x² - 2x - 8 (x² + 2x - 4x - 8)' },
        { id: 'p1-3', prompt: '(2x + 1)(x + 3)', value: '2x² + 7x + 3 (2x² + 6x + x + 3)' },
        { id: 'p1-4', prompt: '(x - 3)(x - 5)', value: 'x² - 8x + 15 (x² - 5x - 3x + 15)' },
        { id: 'p1-5', prompt: '(3x - 2)(2x + 1)', value: '6x² - x - 2 (6x² + 3x - 4x - 2)' },
        { id: 'p1-6', prompt: '(x + 4)(x - 1)', value: 'x² + 3x - 4 (x² - x + 4x - 4)' }
      ]
    },

    // 2. SZINT: NEVEZETES AZONOSSÁGOK KIFEJTÉSE
    2: {
      pairs: [
        { id: 'p2-1', prompt: '(x + 5)²', value: 'x² + 10x + 25 (x² + 2·5x + 25)' },
        { id: 'p2-2', prompt: '(x - 6)²', value: 'x² - 12x + 36 (x² - 2·6x + 36)' },
        { id: 'p2-3', prompt: '(x + 7)(x - 7)', value: 'x² - 49 (x² - 7²)' },
        { id: 'p2-4', prompt: '(2x + 3)²', value: '4x² + 12x + 9 ((2x)² + 2·2x·3 + 9)' },
        { id: 'p2-5', prompt: '(3x - 2)²', value: '9x² - 12x + 4 ((3x)² - 2·3x·2 + 4)' },
        { id: 'p2-6', prompt: '(2x + 5)(2x - 5)', value: '4x² - 25 ((2x)² - 5²)' }
      ]
    },

    // 3. SZINT: SZORZATTÁ ALAKÍTÁS ÉS FEJSZÁMOLÁS
    3: {
      pairs: [
        { id: 'p3-1', prompt: 'x² - 64', value: '(x + 8)(x - 8) (Négyzetek különbsége)' },
        { id: 'p3-2', prompt: 'x² + 8x + 16', value: '(x + 4)² (Összeg négyzete)' },
        { id: 'p3-3', prompt: 'x² - 14x + 49', value: '(x - 7)² (Különbség négyzete)' },
        { id: 'p3-4', prompt: '4x² - 9', value: '(2x + 3)(2x - 3) ((2x)² - 3²)' },
        { id: 'p3-5', prompt: '41 · 39', value: '1599 (40² - 1² = 1600 - 1)' },
        { id: 'p3-6', prompt: '52 · 48', value: '2496 (50² - 2² = 2500 - 4)' }
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

          {/* Level Switcher (Standalone mode) */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            {([1, 2, 3] as DifficultyLevel[]).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setCurrentLevel(lvl)}
                className={cn(
                  'px-3 py-1 text-xs font-bold rounded-lg transition-all',
                  currentLevel === lvl
                    ? 'bg-indigo-600 text-white shadow-sm'
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
        title="Többtagú kifejezések szorzata – Párosító"
        subtitle="Találd meg a kéttagú szorzatok, nevezetes azonosságok párjait és fejszámolási eredményeit!"
      />
    </div>
  );
};

export default PolynomialMultMatcher;

import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FactoringMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const FactoringMatcher: React.FC<FactoringMatcherProps> = ({
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
    // 1. SZINT: EGYTAGÚAK SZORZATA
    1: {
      pairs: [
        { id: 'p1-1', prompt: '3x · 4y', value: '12xy (3·4 és x·y)' },
        { id: 'p1-2', prompt: '2a² · 5a³', value: '10a⁵ (2·5 és a²⁺³)' },
        { id: 'p1-3', prompt: '(-4x) · 3x', value: '-12x² (-4·3 és x¹⁺¹)' },
        { id: 'p1-4', prompt: '(-2a²) · (-3a)', value: '6a³ ((-2)·(-3) és a²⁺¹)' },
        { id: 'p1-5', prompt: '6xy · 2x²y', value: '12x³y² (6·2, x¹⁺² és y¹⁺¹)' },
        { id: 'p1-6', prompt: '5a · (-4b) · 2', value: '-40ab (5·(-4)·2 és ab)' }
      ]
    },

    // 2. SZINT: ZÁRÓJELFELBONTÁS (EGYTAGÚ SZORZÁSA TÖBBTAGÚVAL)
    2: {
      pairs: [
        { id: 'p2-1', prompt: '3(2x - 5)', value: '6x - 15 (3·2x - 3·5)' },
        { id: 'p2-2', prompt: '-2(4x - 7)', value: '-8x + 14 (-2·4x + (-2)·(-7))' },
        { id: 'p2-3', prompt: '3x(2x + 4)', value: '6x² + 12x (3x·2x + 3x·4)' },
        { id: 'p2-4', prompt: '-4x(2x - 3)', value: '-8x² + 12x (-4x·2x - 4x·(-3))' },
        { id: 'p2-5', prompt: '2a(a² - 3a + 5)', value: '2a³ - 6a² + 10a' },
        { id: 'p2-6', prompt: '-x(3x² - 5x - 2)', value: '-3x³ + 5x² + 2x' }
      ]
    },

    // 3. SZINT: KÖZÖS TÉNYEZŐ KIEMELÉSE (SZORZATTÁ ALAKÍTÁS)
    3: {
      pairs: [
        { id: 'p3-1', prompt: '6x + 9', value: '3(2x + 3) (LNKO = 3)' },
        { id: 'p3-2', prompt: '8x² - 12x', value: '4x(2x - 3) (LNKO = 4x)' },
        { id: 'p3-3', prompt: '15a³ + 10a²', value: '5a²(3a + 2) (LNKO = 5a²)' },
        { id: 'p3-4', prompt: '12x³y - 18x²y²', value: '6x²y(2x - 3y) (LNKO = 6x²y)' },
        { id: 'p3-5', prompt: '-4x - 12', value: '-4(x + 3) (Negatív kiemelés)' },
        { id: 'p3-6', prompt: '7x² - 14x + 21', value: '7(x² - 2x + 3) (LNKO = 7)' }
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
                className="text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40 rounded-xl"
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
                    ? 'bg-purple-600 text-white shadow-sm'
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
        title="Betűs kifejezések szorzása és kiemelés – Párosító"
        subtitle="Találd meg a kifejezések szorzatát, kibontott alakját vagy kiemelt formáját!"
      />
    </div>
  );
};

export default FactoringMatcher;

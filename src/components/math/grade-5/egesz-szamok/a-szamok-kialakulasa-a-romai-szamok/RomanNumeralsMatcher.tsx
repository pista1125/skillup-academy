import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface RomanNumeralsMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const RomanNumeralsMatcher: React.FC<RomanNumeralsMatcherProps> = ({
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
    // 1. SZINT: 1–20 KÖZÖTTI RÓMAI SZÁMOK
    1: {
      pairs: [
        { id: 'p1-1', prompt: 'V', value: '5' },
        { id: 'p1-2', prompt: 'IV', value: '4' },
        { id: 'p1-3', prompt: 'IX', value: '9' },
        { id: 'p1-4', prompt: 'VIII', value: '8' },
        { id: 'p1-5', prompt: 'XIV', value: '14' },
        { id: 'p1-6', prompt: 'XIX', value: '19' },
        { id: 'p1-7', prompt: 'XVI', value: '16' },
        { id: 'p1-8', prompt: 'XX', value: '20' }
      ]
    },

    // 2. SZINT: 21–50 KÖZÖTTI RÓMAI SZÁMOK
    2: {
      pairs: [
        { id: 'p2-1', prompt: 'XXIV', value: '24' },
        { id: 'p2-2', prompt: 'XXIX', value: '29' },
        { id: 'p2-3', prompt: 'XXXV', value: '35' },
        { id: 'p2-4', prompt: 'XL', value: '40' },
        { id: 'p2-5', prompt: 'XLIV', value: '44' },
        { id: 'p2-6', prompt: 'XLIX', value: '49' },
        { id: 'p2-7', prompt: 'XLVI', value: '46' },
        { id: 'p2-8', prompt: 'L', value: '50' }
      ]
    },

    // 3. SZINT: 51–100 KÖZÖTTI RÓMAI SZÁMOK
    3: {
      pairs: [
        { id: 'p3-1', prompt: 'LIV', value: '54' },
        { id: 'p3-2', prompt: 'LXIX', value: '69' },
        { id: 'p3-3', prompt: 'LXXV', value: '75' },
        { id: 'p3-4', prompt: 'LXXXVIII', value: '88' },
        { id: 'p3-5', prompt: 'XC', value: '90' },
        { id: 'p3-6', prompt: 'XCIV', value: '94' },
        { id: 'p3-7', prompt: 'XCIX', value: '99' },
        { id: 'p3-8', prompt: 'C', value: '100' }
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

          {/* Level Switcher */}
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

      <MatcherTemplate
        level={activeLevel}
        title="Római számok párosító játék"
        subtitle={
          activeLevel === 1
            ? "Találd meg az 1–20 közötti római számokhoz tartozó arab értékeket!"
            : activeLevel === 2
            ? "Párosítsd össze a 21–50 közötti római számokat és arab megfelelőiket!"
            : "Keresd meg az 51–100 közötti összetett római számok párjait!"
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
        themeColor="amber"
      />
    </div>
  );
};

export default RomanNumeralsMatcher;

import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SubtractionMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const SubtractionMatcher: React.FC<SubtractionMatcherProps> = ({
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
    // 1. SZINT: FEJSZÁMOLÁS, KEREK SZÁMOK ÉS PÓTLÁSOK
    1: {
      pairs: [
        { id: 'p1-1', prompt: '100 - 35', value: '65' },
        { id: 'p1-2', prompt: '80 - 24', value: '56' },
        { id: 'p1-3', prompt: '150 - 70', value: '80' },
        { id: 'p1-4', prompt: '500 - 180', value: '320' },
        { id: 'p1-5', prompt: '74 - 28', value: '46' },
        { id: 'p1-6', prompt: '92 - 45', value: '47' },
        { id: 'p1-7', prompt: '200 - 65', value: '135' },
        { id: 'p1-8', prompt: '1 000 - 350', value: '650' }
      ]
    },

    // 2. SZINT: ÍRÁSBELI KIVONÁS ÁTVITELLEL (3-JEGYŰEK)
    2: {
      pairs: [
        { id: 'p2-1', prompt: '645 - 287', value: '358' },
        { id: 'p2-2', prompt: '832 - 456', value: '376' },
        { id: 'p2-3', prompt: '700 - 238', value: '462' },
        { id: 'p2-4', prompt: '905 - 418', value: '487' },
        { id: 'p2-5', prompt: '521 - 349', value: '172' },
        { id: 'p2-6', prompt: '1 000 - 648', value: '352' },
        { id: 'p2-7', prompt: '754 - 389', value: '365' },
        { id: 'p2-8', prompt: '613 - 275', value: '338' }
      ]
    },

    // 3. SZINT: NÉGYJEGYŰ ÉS TÖBBLÉPÉSES KIVONÁSOK
    3: {
      pairs: [
        { id: 'p3-1', prompt: '7 432 - 2 856', value: '4 576' },
        { id: 'p3-2', prompt: '5 000 - 1 734', value: '3 266' },
        { id: 'p3-3', prompt: '8 210 - 4 675', value: '3 535' },
        { id: 'p3-4', prompt: '10 000 - 3 480', value: '6 520' },
        { id: 'p3-5', prompt: '6 540 - 2 890', value: '3 650' },
        { id: 'p3-6', prompt: '12 500 - 4 800', value: '7 700' },
        { id: 'p3-7', prompt: '9 004 - 3 568', value: '5 436' },
        { id: 'p3-8', prompt: '20 000 - 8 450', value: '11 550' }
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
                className="text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl"
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

      <MatcherTemplate
        level={activeLevel}
        title="Kivonás Párosító Játék"
        subtitle={
          activeLevel === 1
            ? "Párosítsd a fejben kivonható számokat a pontos különbséggel!"
            : activeLevel === 2
            ? "Párosítsd a 3-jegyű írásbeli kivonásokat a helyes végeredménnyel!"
            : "Keresd meg a 4-jegyű és nullás átlépéses kivonások pontos párjait!"
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

export default SubtractionMatcher;

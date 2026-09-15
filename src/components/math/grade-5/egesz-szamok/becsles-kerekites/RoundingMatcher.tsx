import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface RoundingMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const RoundingMatcher: React.FC<RoundingMatcherProps> = ({
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
    // 1. SZINT: KEREKÍTÉS TÍZESEKRE
    1: {
      pairs: [
        { id: 'p1-1', prompt: '43 (tízesre)', value: '40' },
        { id: 'p1-2', prompt: '45 (tízesre)', value: '50' },
        { id: 'p1-3', prompt: '48 (tízesre)', value: '50' },
        { id: 'p1-4', prompt: '72 (tízesre)', value: '70' },
        { id: 'p1-5', prompt: '96 (tízesre)', value: '100' },
        { id: 'p1-6', prompt: '124 (tízesre)', value: '120' },
        { id: 'p1-7', prompt: '135 (tízesre)', value: '140' },
        { id: 'p1-8', prompt: '281 (tízesre)', value: '280' }
      ]
    },

    // 2. SZINT: KEREKÍTÉS SZÁZASOKRA ÉS EZRESEKRE
    2: {
      pairs: [
        { id: 'p2-1', prompt: '348 (százasra)', value: '300' },
        { id: 'p2-2', prompt: '350 (százasra)', value: '400' },
        { id: 'p2-3', prompt: '782 (százasra)', value: '800' },
        { id: 'p2-4', prompt: '1 249 (ezresre)', value: '1 000' },
        { id: 'p2-5', prompt: '4 670 (ezresre)', value: '5 000' },
        { id: 'p2-6', prompt: '9 950 (százasra)', value: '10 000' },
        { id: 'p2-7', prompt: '2 500 (ezresre)', value: '3 000' },
        { id: 'p2-8', prompt: '6 480 (százasra)', value: '6 500' }
      ]
    },

    // 3. SZINT: MŰVELETEK BECSLÉSE ÉS NAGYOBB SZÁMOK
    3: {
      pairs: [
        { id: 'p3-1', prompt: '384 + 195 (százasra becsülve)', value: '400 + 200 = 600' },
        { id: 'p3-2', prompt: '712 - 289 (százasra becsülve)', value: '700 - 300 = 400' },
        { id: 'p3-3', prompt: '2 850 + 4 120 (ezresre becsülve)', value: '3 000 + 4 000 = 7 000' },
        { id: 'p3-4', prompt: '43 780 (tízezresre)', value: '40 000' },
        { id: 'p3-5', prompt: '76 200 (tízezresre)', value: '80 000' },
        { id: 'p3-6', prompt: '148 900 (százezresre)', value: '100 000' },
        { id: 'p3-7', prompt: '8 920 - 3 110 (ezresre becsülve)', value: '9 000 - 3 000 = 6 000' },
        { id: 'p3-8', prompt: '254 000 (százezresre)', value: '300 000' }
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
                className="text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 rounded-xl"
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
        title="Kerekítés Párosító Játék"
        subtitle={
          activeLevel === 1
            ? "Párosítsd a számokat a kerekített tízes értékükkel!"
            : activeLevel === 2
            ? "Párosítsd a számokat a kerekített százas és ezres értékükkel!"
            : "Keresd meg a műveleti becslések és nagyságrendi kerekítések párjait!"
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

export default RoundingMatcher;

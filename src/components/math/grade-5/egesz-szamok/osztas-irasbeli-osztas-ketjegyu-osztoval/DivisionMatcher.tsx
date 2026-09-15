import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface DivisionMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const DivisionMatcher: React.FC<DivisionMatcherProps> = ({
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
    // 1. SZINT: FEJSZÁMOLÁS, 10 HATVÁNYAI ÉS KEREK HÁNYADOSOK
    1: {
      pairs: [
        { id: 'p1-1', prompt: '450 : 10', value: '45' },
        { id: 'p1-2', prompt: '7 200 : 100', value: '72' },
        { id: 'p1-3', prompt: '38 000 : 1 000', value: '38' },
        { id: 'p1-4', prompt: '840 : 20', value: '42' },
        { id: 'p1-5', prompt: '100 : 4', value: '25' },
        { id: 'p1-6', prompt: '1 000 : 8', value: '125' },
        { id: 'p1-7', prompt: '480 : 60', value: '8' },
        { id: 'p1-8', prompt: '0 : 25', value: '0' }
      ]
    },

    // 2. SZINT: MARADÉKOS OSZTÁS ÉS EGYJEGYŰVEL VALÓ OSZTÁS
    2: {
      pairs: [
        { id: 'p2-1', prompt: '29 : 6', value: '4, maradék 5' },
        { id: 'p2-2', prompt: '47 : 5', value: '9, maradék 2' },
        { id: 'p2-3', prompt: '68 : 8', value: '8, maradék 4' },
        { id: 'p2-4', prompt: '542 : 2', value: '271' },
        { id: 'p2-5', prompt: '756 : 3', value: '252' },
        { id: 'p2-6', prompt: '864 : 4', value: '216' },
        { id: 'p2-7', prompt: '95 : 10', value: '9, maradék 5' },
        { id: 'p2-8', prompt: '348 : 4', value: '87' }
      ]
    },

    // 3. SZINT: KÉTJEGYŰ OSZTÓ ÉS NAGYOBB SZÁMOK
    3: {
      pairs: [
        { id: 'p3-1', prompt: '842 : 26', value: '32, maradék 10' },
        { id: 'p3-2', prompt: '625 : 25', value: '25' },
        { id: 'p3-3', prompt: '960 : 32', value: '30' },
        { id: 'p3-4', prompt: '1 440 : 45', value: '32' },
        { id: 'p3-5', prompt: '2 088 : 36', value: '58' },
        { id: 'p3-6', prompt: '1 000 : 25', value: '40' },
        { id: 'p3-7', prompt: '3 750 : 50', value: '75' },
        { id: 'p3-8', prompt: '5 000 : 125', value: '40' }
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
                className="text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40 rounded-xl"
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
                    ? "bg-purple-600 text-white shadow-xs"
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
        title="Osztás Párosító Játék"
        subtitle={
          activeLevel === 1
            ? "Párosítsd a fejben osztható számokat és a 10 hatványaival történő osztásokat!"
            : activeLevel === 2
            ? "Párosítsd az egyjegyűvel való osztásokat és a maradékos osztásokat!"
            : "Keresd meg a kétjegyű osztóval végzett osztások helyes párjait!"
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
        themeColor="purple"
      />
    </div>
  );
};

export default DivisionMatcher;

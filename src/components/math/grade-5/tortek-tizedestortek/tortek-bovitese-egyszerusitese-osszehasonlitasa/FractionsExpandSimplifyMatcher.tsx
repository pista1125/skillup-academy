import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FractionsExpandSimplifyMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const FractionsExpandSimplifyMatcher: React.FC<FractionsExpandSimplifyMatcherProps> = ({
  onBack,
  onSwitchToTheory,
  level,
  onNextLevel,
  onOpenRules
}) => {
  const safeLevel: DifficultyLevel = (typeof level === 'number' ? level : ((level as any)?.level ?? 1)) as DifficultyLevel;
  const [currentLevel, setCurrentLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof level === 'number' ? level : ((level as any)?.level ?? 1)) as DifficultyLevel;
    setCurrentLevel(nextLevel);
  }, [level]);

  const levels: Record<DifficultyLevel, MatcherLevelConfig> = {
    // 1. SZINT: EGYENÉRTÉKŰ TÖRTEK (BŐVÍTÉS)
    1: {
      pairs: [
        { id: 'p1-1', prompt: '1/2', value: '3/6' },
        { id: 'p1-2', prompt: '2/3', value: '4/6' },
        { id: 'p1-3', prompt: '3/4', value: '9/12' },
        { id: 'p1-4', prompt: '2/5', value: '6/15' },
        { id: 'p1-5', prompt: '3/5', value: '12/20' },
        { id: 'p1-6', prompt: '4/5', value: '8/10' },
        { id: 'p1-7', prompt: '1/4', value: '5/20' },
        { id: 'p1-8', prompt: '5/6', value: '15/18' }
      ]
    },

    // 2. SZINT: LEGEGYSZERŰBB ALAKOK (EGYSZERŰSÍTÉS)
    2: {
      pairs: [
        { id: 'p2-1', prompt: '6/8', value: '3/4' },
        { id: 'p2-2', prompt: '8/12', value: '2/3' },
        { id: 'p2-3', prompt: '10/15', value: '2/3' },
        { id: 'p2-4', prompt: '12/20', value: '3/5' },
        { id: 'p2-5', prompt: '15/25', value: '3/5' },
        { id: 'p2-6', prompt: '18/24', value: '3/4' },
        { id: 'p2-7', prompt: '14/21', value: '2/3' },
        { id: 'p2-8', prompt: '20/30', value: '2/3' }
      ]
    },

    // 3. SZINT: HIÁNYZÓ SZÁMOK EGYENLŐSÉGEKBEN
    3: {
      pairs: [
        { id: 'p3-1', prompt: '2/3 = ?/12', value: '8' },
        { id: 'p3-2', prompt: '3/5 = 12/?', value: '20' },
        { id: 'p3-3', prompt: '15/20 = ?/4', value: '3' },
        { id: 'p3-4', prompt: '18/24 = 3/?', value: '4' },
        { id: 'p3-5', prompt: '5/7 = ?/28', value: '20' },
        { id: 'p3-6', prompt: '24/32 = ?/4', value: '3' },
        { id: 'p3-7', prompt: '4/9 = 16/?', value: '36' },
        { id: 'p3-8', prompt: '30/45 = 2/?', value: '3' }
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
        title="Törtek bővítése és egyszerűsítése Párosító"
        subtitle={
          activeLevel === 1
            ? "Párosítsd össze az egymással egyenlő értékű (bővített) törteket!"
            : activeLevel === 2
            ? "Párosítsd össze a törtet a legegyszerűbb, tovább nem egyszerűsíthető alakjával!"
            : "Keresd meg a hiányzó számlálót vagy nevezőt az egyenlőségekben!"
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

export default FractionsExpandSimplifyMatcher;

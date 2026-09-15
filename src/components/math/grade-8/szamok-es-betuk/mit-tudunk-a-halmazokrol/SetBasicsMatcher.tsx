import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SetBasicsMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const SetBasicsMatcher: React.FC<SetBasicsMatcherProps> = ({
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
    // 1. SZINT: ALAPVETŐ HALMAZJELÖLÉSEK ÉS DEFINÍCIÓK
    1: {
      pairs: [
        { id: 'p1-1', prompt: 'x ∈ A', value: 'x eleme az A halmaznak' },
        { id: 'p1-2', prompt: 'y ∉ B', value: 'y nem eleme a B halmaznak' },
        { id: 'p1-3', prompt: '∅ vagy {}', value: 'Üres halmaz (|∅| = 0)' },
        { id: 'p1-4', prompt: '|A|', value: 'A halmaz elemszáma' },
        { id: 'p1-5', prompt: 'A = B', value: 'A két halmaz elemei megegyeznek' },
        { id: 'p1-6', prompt: 'ℕ', value: 'Természetes számok {0, 1, 2, ...}' }
      ]
    },

    // 2. SZINT: RÉSZHALMAZOK ÉS SZÁMHALMAZOK
    2: {
      pairs: [
        { id: 'p2-1', prompt: 'A ⊆ B', value: 'A részhalmaza B-nek' },
        { id: 'p2-2', prompt: 'A ⊂ B', value: 'A valódi részhalmaza B-nek (A ≠ B)' },
        { id: 'p2-3', prompt: '2ⁿ', value: 'n elemű halmaz összes részhalmazának száma' },
        { id: 'p2-4', prompt: '2ⁿ - 1', value: 'Valódi részhalmazok száma' },
        { id: 'p2-5', prompt: 'ℤ', value: 'Egész számok halmaza' },
        { id: 'p2-6', prompt: 'ℚ', value: 'Racionális számok halmaza (törtek)' }
      ]
    },

    // 3. SZINT: RÉSZHALMAZOK SZÁMÍTÁSA ÉS TULAJDONSÁGOK
    3: {
      pairs: [
        { id: 'p3-1', prompt: '3 elemű halmaz', value: '2³ = 8 részhalmaz' },
        { id: 'p3-2', prompt: '4 elemű halmaz', value: '2⁴ = 16 részhalmaz' },
        { id: 'p3-3', prompt: '5 elemű halmaz', value: '2⁵ = 32 részhalmaz' },
        { id: 'p3-4', prompt: '∅ ⊆ A', value: 'Minden halmaznak része az üres halmaz' },
        { id: 'p3-5', prompt: 'A ⊆ A', value: 'Minden halmaz része önmagának' },
        { id: 'p3-6', prompt: 'U vagy Ω', value: 'Alaphalmaz (Univerzum)' }
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
                className="text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/40 rounded-xl"
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
                    ? "bg-violet-600 text-white shadow-xs"
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
        title="Halmazfogalmak & Jelölések Párosító"
        subtitle={
          activeLevel === 1
            ? "Találd meg az alapvető matematikai jelöléseket, szimbólumokat és definíciókat!"
            : activeLevel === 2
            ? "Párosítsd össze a részhalmazok képleteit és a nevezetes számhalmazokat!"
            : "Keresd meg a halmazok részhalmazszámát és a halmazelméleti alaptételeket!"
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
        themeColor="violet"
      />
    </div>
  );
};

export default SetBasicsMatcher;

import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface RationalSetMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const RationalSetMatcher: React.FC<RationalSetMatcherProps> = ({
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
    // 1. SZINT: ALAPFOGALMAK, ELLENTETT, RECIPROK ÉS ABSZOLÚTÉRTÉK
    1: {
      pairs: [
        { id: 'p1-1', prompt: 'ℚ (Racionális számok)', value: 'a/b alakú számok (a, b ∈ ℤ, b ≠ 0)' },
        { id: 'p1-2', prompt: '-7 ellentettje', value: '+7 (összegük 0)' },
        { id: 'p1-3', prompt: '3/4 reciproka', value: '4/3 (szorzatuk 1)' },
        { id: 'p1-4', prompt: '|-8.5| (Abszolútérték)', value: '8.5 (távolság a 0-tól)' },
        { id: 'p1-5', prompt: 'ℕ ⊂ ℤ ⊂ ℚ', value: 'Számhalmazok hierarchialánca' },
        { id: 'p1-6', prompt: '-2/5 reciproka', value: '-5/2 (előjel megmarad)' }
      ]
    },

    // 2. SZINT: NEVEZETES TÖRT ÉS TIZEDESTÖRT PÁROK
    2: {
      pairs: [
        { id: 'p2-1', prompt: '1/4', value: '0.25' },
        { id: 'p2-2', prompt: '3/4', value: '0.75' },
        { id: 'p2-3', prompt: '1/8', value: '0.125' },
        { id: 'p2-4', prompt: '3/8', value: '0.375' },
        { id: 'p2-5', prompt: '1/5', value: '0.2' },
        { id: 'p2-6', prompt: '7/20', value: '0.35' }
      ]
    },

    // 3. SZINT: VÉGTELEN SZAKASZOS TIZEDESTÖRTEK ÁTÍRÁSA
    3: {
      pairs: [
        { id: 'p3-1', prompt: '0.3̇ (0.333...)', value: '1/3' },
        { id: 'p3-2', prompt: '0.6̇ (0.666...)', value: '2/3' },
        { id: 'p3-3', prompt: '0.1̇ (0.111...)', value: '1/9' },
        { id: 'p3-4', prompt: '0.7̇ (0.777...)', value: '7/9' },
        { id: 'p3-5', prompt: '0.45̇ (0.4545...)', value: '45/99 = 5/11' },
        { id: 'p3-6', prompt: '0.16̇ (0.1666...)', value: '15/90 = 1/6' }
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
                className="text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded-xl"
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
                    ? "bg-emerald-600 text-white shadow-xs"
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
        title="Racionális Számok Párosító"
        subtitle={
          activeLevel === 1
            ? "Párosítsd össze a számfogalmakat, ellentetteket, reciprokokat és abszolútértékeket!"
            : activeLevel === 2
            ? "Keresd meg a közönséges törtek pontos tizedestört megfelelőit!"
            : "Párosítsd a végtelen szakaszos tizedestörteket egyszerűsített tört alakjukkal!"
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
        themeColor="emerald"
      />
    </div>
  );
};

export default RationalSetMatcher;

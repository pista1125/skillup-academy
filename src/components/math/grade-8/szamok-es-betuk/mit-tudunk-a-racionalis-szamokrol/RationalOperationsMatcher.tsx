import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface RationalOperationsMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const RationalOperationsMatcher: React.FC<RationalOperationsMatcherProps> = ({
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
    // 1. SZINT: MŰVELETI SZABÁLYOK ÉS ALAP ELŐJELEK
    1: {
      pairs: [
        { id: 'p1-1', prompt: 'a · (b + c)', value: 'a·b + a·c (Disztributivitás)' },
        { id: 'p1-2', prompt: '(-6) · (-4)', value: '+24 (Azonos előjel ⟹ pozitív)' },
        { id: 'p1-3', prompt: '-18 : (+3)', value: '-6 (Különböző előjel ⟹ negatív)' },
        { id: 'p1-4', prompt: '(-5)²', value: '+25 (Zárójelben a negatív szám)' },
        { id: 'p1-5', prompt: '-5²', value: '-25 (Mínusz a hatványozás után hat)' },
        { id: 'p1-6', prompt: '-12 - (-7)', value: '-5 (-12 + 7)' }
      ]
    },

    // 2. SZINT: TÖRT- ÉS ZÁRÓJELES MŰVELETEK
    2: {
      pairs: [
        { id: 'p2-1', prompt: '3/4 + 1/2', value: '5/4 = 1.25' },
        { id: 'p2-2', prompt: '(2/3) · (3/8)', value: '1/4 (Egyszerűsítés után)' },
        { id: 'p2-3', prompt: '(5/6) : (5/12)', value: '2 (Szorzás a reciprokkal: 12/6)' },
        { id: 'p2-4', prompt: '1 - 3/7', value: '4/7 (7/7 - 3/7)' },
        { id: 'p2-5', prompt: '(-2/3)²', value: '4/9' },
        { id: 'p2-6', prompt: '10 - 2 · (3 - 8)', value: '20 (10 - 2·(-5) = 10 + 10)' }
      ]
    },

    // 3. SZINT: ÉSSZERŰ SZÁMOLÁS ÉS EMELETES TÖRTEK
    3: {
      pairs: [
        { id: 'p3-1', prompt: '2.5 · 17 · 4', value: '170 (2.5 · 4 = 10)' },
        { id: 'p3-2', prompt: '3.7 · 8 + 6.3 · 8', value: '80 ((3.7 + 6.3) · 8 = 10 · 8)' },
        { id: 'p3-3', prompt: '(2/3) / (4/9)', value: '3/2 = 1.5 ((2/3) · (9/4))' },
        { id: 'p3-4', prompt: '12 · (1/3 - 1/4)', value: '1 (4 - 3 = 1)' },
        { id: 'p3-5', prompt: '125 · 7.8 · 0.8', value: '780 (125 · 0.8 = 100)' },
        { id: 'p3-6', prompt: '(1/2 + 1/3) : (5/6)', value: '1 ((5/6) : (5/6))' }
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
                className="text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-950/40 rounded-xl"
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
                    ? "bg-cyan-600 text-white shadow-xs"
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
        title="Racionális Műveletek Párosító"
        subtitle={
          activeLevel === 1
            ? "Párosítsd össze a műveleti szabályokat és az előjeles alapműveleteket az eredményükkel!"
            : activeLevel === 2
            ? "Számítsd ki a törtes és zárójeles kifejezések pontos értékét!"
            : "Alkalmazd az ésszerű számolási trükköket és emeletes tört egyszerűsítéseket!"
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
        themeColor="cyan"
      />
    </div>
  );
};

export default RationalOperationsMatcher;

import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SquareRootsMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const SquareRootsMatcher: React.FC<SquareRootsMatcherProps> = ({
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
    // 1. SZINT: SZORZAT ÉS HÁNYADOS EGYSZERŰ GYÖKEI
    1: {
      pairs: [
        { id: 'p1-1', prompt: '√2 · √18', value: '6 (√(2·18) = √36)' },
        { id: 'p1-2', prompt: '√75 / √3', value: '5 (√(75/3) = √25)' },
        { id: 'p1-3', prompt: '√3 · √27', value: '9 (√(3·27) = √81)' },
        { id: 'p1-4', prompt: '√50 / √2', value: '5 (√(50/2) = √25)' },
        { id: 'p1-5', prompt: '√0.04 · √0.25', value: '0.1 (0.2 · 0.5)' },
        { id: 'p1-6', prompt: '√200 / √2', value: '10 (√100 = 10)' }
      ]
    },

    // 2. SZINT: KIEMELÉS ÉS BEVITEL
    2: {
      pairs: [
        { id: 'p2-1', prompt: '√50', value: '5√2 (√(25·2))' },
        { id: 'p2-2', prompt: '√48', value: '4√3 (√(16·3))' },
        { id: 'p2-3', prompt: '√72', value: '6√2 (√(36·2))' },
        { id: 'p2-4', prompt: '3√5', value: '√45 (√(9·5))' },
        { id: 'p2-5', prompt: '√20', value: '2√5 (√(4·5))' },
        { id: 'p2-6', prompt: '2√7', value: '√28 (√(4·7))' }
      ]
    },

    // 3. SZINT: ÖSSZETETT GYÖKÖS KIFEJEZÉSEK ÉS MŰVELETEK
    3: {
      pairs: [
        { id: 'p3-1', prompt: '√50 + √18', value: '8√2 (5√2 + 3√2)' },
        { id: 'p3-2', prompt: '√20 + √45', value: '5√5 (2√5 + 3√5)' },
        { id: 'p3-3', prompt: '(3√2)²', value: '18 (9 · 2)' },
        { id: 'p3-4', prompt: '(2√5)²', value: '20 (4 · 5)' },
        { id: 'p3-5', prompt: '√2 · (√8 + √18)', value: '10 (√16 + √36 = 4 + 6)' },
        { id: 'p3-6', prompt: '(√5 + 1) · (√5 - 1)', value: '4 (5 - 1)' }
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
                className="text-pink-600 dark:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-950/40 rounded-xl"
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
                    ? "bg-pink-600 text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900"
                )}
              >
                {lvl}. Szint
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Matcher Board with cards */}
      <MatcherTemplate
        level={activeLevel}
        title="Számok Négyzetgyöke Párosító"
        subtitle={
          activeLevel === 1
            ? "Párosítsd össze a szorzatok és hányadosok gyökét az értékükkel!"
            : activeLevel === 2
            ? "Párosítsd az egyszerűsített gyökös alakokat és a bevitelt!"
            : "Keresd meg az összetett gyökös kifejezések pontos eredményeit!"
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
        themeColor="pink"
      />
    </div>
  );
};

export default SquareRootsMatcher;

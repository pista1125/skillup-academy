import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface OrderOfOperationsMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const OrderOfOperationsMatcher: React.FC<OrderOfOperationsMatcherProps> = ({
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
    // 1. SZINT: KÉT MŰVELET, SZORZÁS/OSZTÁS MEGGELŐZI AZ ÖSSZEADÁST
    1: {
      pairs: [
        { id: 'p1-1', prompt: '18 + 4 · 5', value: '38' },
        { id: 'p1-2', prompt: '(18 + 4) · 5', value: '110' },
        { id: 'p1-3', prompt: '50 - 30 : 5', value: '44' },
        { id: 'p1-4', prompt: '(50 - 30) : 5', value: '4' },
        { id: 'p1-5', prompt: '6 · 8 - 12', value: '36' },
        { id: 'p1-6', prompt: '6 · (8 - 2)', value: '36' },
        { id: 'p1-7', prompt: '100 - 4 · 20', value: '20' },
        { id: 'p1-8', prompt: '(100 - 4) · 0', value: '0' }
      ]
    },

    // 2. SZINT: HÁROM MŰVELET, BALRÓL JOBBRA SZABÁLY ÉS ZÁRÓJELEK
    2: {
      pairs: [
        { id: 'p2-1', prompt: '24 : 6 · 2', value: '8' },
        { id: 'p2-2', prompt: '24 : (6 · 2)', value: '2' },
        { id: 'p2-3', prompt: '40 - 15 + 5', value: '30' },
        { id: 'p2-4', prompt: '40 - (15 + 5)', value: '20' },
        { id: 'p2-5', prompt: '12 + 8 · 3 - 10', value: '26' },
        { id: 'p2-6', prompt: '(12 + 8) · (10 - 7)', value: '60' },
        { id: 'p2-7', prompt: '100 : 5 : 2', value: '10' },
        { id: 'p2-8', prompt: '100 : (5 · 2)', value: '10' }
      ]
    },

    // 3. SZINT: EGYMÁSBA ÁGYAZOTT ZÁRÓJELEK ÉS OKOS CSOPORTOSÍTÁS
    3: {
      pairs: [
        { id: 'p3-1', prompt: '100 - [20 + (15 - 5) · 3]', value: '50' },
        { id: 'p3-2', prompt: '[(45 - 5) : 8 + 7] · 3', value: '36' },
        { id: 'p3-3', prompt: '4 · 39 · 25', value: '3 900' },
        { id: 'p3-4', prompt: '17 · 4 + 17 · 6', value: '170' },
        { id: 'p3-5', prompt: '250 - [30 + 2 · (40 - 15)]', value: '170' },
        { id: 'p3-6', prompt: '8 · 125 · 7', value: '7 000' },
        { id: 'p3-7', prompt: '18 · 49 + 18', value: '900' },
        { id: 'p3-8', prompt: '500 - (120 - 20 · 4)', value: '460' }
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
                className="text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 rounded-xl"
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
                    ? "bg-indigo-600 text-white shadow-xs"
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
        title="Műveleti Sorrend Párosító Játék"
        subtitle={
          activeLevel === 1
            ? "Párosítsd a kifejezéseket a műveleti sorrend alapján számított helyes értékükkel!"
            : activeLevel === 2
            ? "Párosítsd a többműveletes és zárójeles kifejezéseket a pontos végeredménnyel!"
            : "Keresd meg az egymásba ágyazott zárójelek és okos számolások párjait!"
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
        themeColor="indigo"
      />
    </div>
  );
};

export default OrderOfOperationsMatcher;

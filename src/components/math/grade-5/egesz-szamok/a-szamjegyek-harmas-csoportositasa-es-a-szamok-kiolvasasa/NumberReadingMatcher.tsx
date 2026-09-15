import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface NumberReadingMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const NumberReadingMatcher: React.FC<NumberReadingMatcherProps> = ({
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
    // 1. SZINT: 4–5 JEGYŰ SZÁMOK ÉS SZÖVEGES KIOLVASÁSUK
    1: {
      pairs: [
        { id: 'p1-1', prompt: '4 520', value: 'négyezer-ötszázhúsz' },
        { id: 'p1-2', prompt: '12 300', value: 'tizenkétezer-háromszáz' },
        { id: 'p1-3', prompt: '70 005', value: 'hetvenezer-öt' },
        { id: 'p1-4', prompt: '8 090', value: 'nyolcezer-kilencven' },
        { id: 'p1-5', prompt: '35 450', value: 'harmincötezer-négyszázötven' },
        { id: 'p1-6', prompt: '99 999', value: 'kilencvenkilencezer-kilencszázkilencvenkilenc' },
        { id: 'p1-7', prompt: '1 001', value: 'ezer-egy' },
        { id: 'p1-8', prompt: '50 500', value: 'ötvenezer-ötszáz' }
      ]
    },

    // 2. SZINT: 6 JEGYŰ SZÁMOK ÉS SZÖVEGES KIOLVASÁSUK
    2: {
      pairs: [
        { id: 'p2-1', prompt: '100 000', value: 'egyszázezer' },
        { id: 'p2-2', prompt: '350 400', value: 'háromszázötvenezer-négyszáz' },
        { id: 'p2-3', prompt: '500 050', value: 'ötszázezer-ötven' },
        { id: 'p2-4', prompt: '704 002', value: 'hétszáznégyezer-kettő' },
        { id: 'p2-5', prompt: '990 000', value: 'kilencszázkilencvenezer' },
        { id: 'p2-6', prompt: '208 500', value: 'ktszáznyolcezer-ötszáz' },
        { id: 'p2-7', prompt: '400 004', value: 'négyszázezer-négy' },
        { id: 'p2-8', prompt: '625 300', value: 'hatszázhuszonötezer-háromszáz' }
      ]
    },

    // 3. SZINT: MILLIÓS NAGYSÁGRENDŰ SZÁMOK ÉS KIOLVASÁSUK
    3: {
      pairs: [
        { id: 'p3-1', prompt: '1 000 000', value: 'egymillió' },
        { id: 'p3-2', prompt: '5 000 000', value: 'ötmillió' },
        { id: 'p3-3', prompt: '12 000 000', value: 'tizenkétmillió' },
        { id: 'p3-4', prompt: '2 500 000', value: 'kétmillió-ötszázezer' },
        { id: 'p3-5', prompt: '10 050 000', value: 'tízmillió-ötvenezer' },
        { id: 'p3-6', prompt: '100 000 000', value: 'százmillió' },
        { id: 'p3-7', prompt: '4 000 008', value: 'négymillió-nyolc' },
        { id: 'p3-8', prompt: '25 400 000', value: 'huszonötmillió-négyszázezer' }
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
                className="text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 rounded-xl"
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
        title="Számkiolvasási párosító játék"
        subtitle={
          activeLevel === 1
            ? "Párosítsd össze a 4–5 jegyű tagolt számokat és a helyes szöveges kiolvasásukat!"
            : activeLevel === 2
            ? "Párosítsd össze a 6-jegyű százezres számokat és kiejtett alakjukat!"
            : "Keresd meg a milliós nagyságrendű számok és szöveges alakjaik pontos párjait!"
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

export default NumberReadingMatcher;

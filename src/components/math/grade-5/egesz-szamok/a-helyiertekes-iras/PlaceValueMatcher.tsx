import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PlaceValueMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const PlaceValueMatcher: React.FC<PlaceValueMatcherProps> = ({
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
    // 1. SZINT: 3–4 JEGYŰ SZÁMOK ÉS HELYIÉRTÉKEK
    1: {
      pairs: [
        { id: 'p1-1', prompt: '4E + 5Sz + 2T + 3e', value: '4 523' },
        { id: 'p1-2', prompt: '7Sz + 8T + 4e', value: '784' },
        { id: 'p1-3', prompt: '2E + 0Sz + 6T + 9e', value: '2 069' },
        { id: 'p1-4', prompt: '9Sz + 0T + 5e', value: '905' },
        { id: 'p1-5', prompt: '3E + 4Sz', value: '3 400' },
        { id: 'p1-6', prompt: '6 ezres valódi értéke', value: '6 000' },
        { id: 'p1-7', prompt: '5 százas valódi értéke', value: '500' },
        { id: 'p1-8', prompt: '8 tízes valódi értéke', value: '80' }
      ]
    },

    // 2. SZINT: 5–6 JEGYŰ SZÁMOK ÉS TÖBBJEGYŰ FELBONTÁSOK
    2: {
      pairs: [
        { id: 'p2-1', prompt: '5Té + 4E + 3Sz + 2T + 1e', value: '54 321' },
        { id: 'p2-2', prompt: '3Sze + 2Té + 5Sz + 8e', value: '320 508' },
        { id: 'p2-3', prompt: '7Té + 9Sz + 4T', value: '70 940' },
        { id: 'p2-4', prompt: '8 százezres értéke', value: '800 000' },
        { id: 'p2-5', prompt: '4 tízezres értéke', value: '40 000' },
        { id: 'p2-6', prompt: '600 000 + 50 000 + 400', value: '650 400' },
        { id: 'p2-7', prompt: '90 000 + 8 000 + 70 + 6', value: '98 076' },
        { id: 'p2-8', prompt: '1Sze + 5e', value: '100 005' }
      ]
    },

    // 3. SZINT: MILLIÓS NAGYSÁGREND ÉS SZORZATOS ALAKOK
    3: {
      pairs: [
        { id: 'p3-1', prompt: '1 millió (1M)', value: '1 000 000' },
        { id: 'p3-2', prompt: '7 · 100 000 + 4 · 1 000 + 5 · 10', value: '704 050' },
        { id: 'p3-3', prompt: '9 · 100 000 + 9 · 100 + 9 · 1', value: '900 909' },
        { id: 'p3-4', prompt: '50 darab tízezres', value: '500 000' },
        { id: 'p3-5', prompt: '100 darab ezres', value: '100 000' },
        { id: 'p3-6', prompt: 'Legnagyobb 5-jegyű szám', value: '99 999' },
        { id: 'p3-7', prompt: 'Legkisebb 6-jegyű szám', value: '100 000' },
        { id: 'p3-8', prompt: '450 darab százas', value: '45 000' }
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
                className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-xl"
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
                    ? "bg-blue-600 text-white shadow-xs"
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
        title="Helyiértékes párosító játék"
        subtitle={
          activeLevel === 1
            ? "Párosítsd össze a 3-4 jegyű számok helyiértékes alakját és normál értékét!"
            : activeLevel === 2
            ? "Párosítsd össze az 5-6 jegyű felbontásokat és valódi értékeket!"
            : "Keresd meg a milliós és szorzatos felbontások pontos párjait!"
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
        themeColor="blue"
      />
    </div>
  );
};

export default PlaceValueMatcher;

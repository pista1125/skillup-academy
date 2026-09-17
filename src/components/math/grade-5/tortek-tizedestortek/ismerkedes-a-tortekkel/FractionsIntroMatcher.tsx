import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FractionsIntroMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const FractionsIntroMatcher: React.FC<FractionsIntroMatcherProps> = ({
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
    // 1. SZINT: TÖRTALAKOK ÉS MAGYAR MEGNEVEZÉSEK
    1: {
      pairs: [
        { id: 'p1-1', prompt: '1/2', value: 'Fél (egy ketted)' },
        { id: 'p1-2', prompt: '1/3', value: 'Egyharmad' },
        { id: 'p1-3', prompt: '1/4', value: 'Egynegyed' },
        { id: 'p1-4', prompt: '3/4', value: 'Háromnegyed' },
        { id: 'p1-5', prompt: '2/3', value: 'Kétharmad' },
        { id: 'p1-6', prompt: '4/4', value: '1 egész (négy negyed)' },
        { id: 'p1-7', prompt: '1/5', value: 'Egyötöd' },
        { id: 'p1-8', prompt: '1/10', value: 'Egytized' }
      ]
    },

    // 2. SZINT: TÖRTEK ÉS OSZTÁSI ÉRTÉKEIK
    2: {
      pairs: [
        { id: 'p2-1', prompt: '6 / 2', value: '3' },
        { id: 'p2-2', prompt: '8 / 4', value: '2' },
        { id: 'p2-3', prompt: '15 / 5', value: '3' },
        { id: 'p2-4', prompt: '7 / 7', value: '1' },
        { id: 'p2-5', prompt: '12 / 3', value: '4' },
        { id: 'p2-6', prompt: '10 / 2', value: '5' },
        { id: 'p2-7', prompt: '20 / 4', value: '5' },
        { id: 'p2-8', prompt: '0 / 8', value: '0' }
      ]
    },

    // 3. SZINT: MENNYISÉGEK TÖRTRÉSZEI
    3: {
      pairs: [
        { id: 'p3-1', prompt: '20-nak az 1/4-e', value: '5' },
        { id: 'p3-2', prompt: '60-nak az 1/2-e', value: '30' },
        { id: 'p3-3', prompt: '24-nek a 3/4-e', value: '18' },
        { id: 'p3-4', prompt: '30-nak a 2/3-a', value: '20' },
        { id: 'p3-5', prompt: '50-nek a 2/5-e', value: '20' },
        { id: 'p3-6', prompt: '100-nak a 3/4-e', value: '75' },
        { id: 'p3-7', prompt: '40-nek a 3/8-a', value: '15' },
        { id: 'p3-8', prompt: '80-nak az 5/8-a', value: '50' }
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
        title="Törtek párosító játék"
        subtitle={
          activeLevel === 1
            ? "Párosítsd össze a törteket a magyar megnevezéseikkel!"
            : activeLevel === 2
            ? "Párosítsd össze a törteket a számítási értékükkel!"
            : "Keresd meg a megadott mennyiségek törtrészeinek párját!"
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

export default FractionsIntroMatcher;

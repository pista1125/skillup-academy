import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SetOperationsMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const SetOperationsMatcher: React.FC<SetOperationsMatcherProps> = ({
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
    // 1. SZINT: ALAPVETŐ MŰVELETI SZIMBÓLUMOK ÉS JELENTÉSÜK
    1: {
      pairs: [
        { id: 'p1-1', prompt: 'A ∩ B (Metszet)', value: 'x ∈ A és x ∈ B (Közös rész)' },
        { id: 'p1-2', prompt: 'A ∪ B (Unió)', value: 'x ∈ A vagy x ∈ B (Egyesítés)' },
        { id: 'p1-3', prompt: 'A \\ B (Különbség)', value: 'x ∈ A és x ∉ B (Csak az A elemei)' },
        { id: 'p1-4', prompt: "A' vagy Ā (Komplementer)", value: 'x ∈ U és x ∉ A (A-n kívüli elemek)' },
        { id: 'p1-5', prompt: 'A ∩ B = ∅', value: 'Diszjunkt halmazok (nincs közös elem)' },
        { id: 'p1-6', prompt: 'U (vagy Ω)', value: 'Alaphalmaz (Univerzum)' }
      ]
    },

    // 2. SZINT: KONKRÉT HALMAZMŰVELETEK (A = {1, 2, 3, 4}, B = {3, 4, 5})
    2: {
      pairs: [
        { id: 'p2-1', prompt: '{1, 2, 3, 4} ∩ {3, 4, 5}', value: '{3, 4}' },
        { id: 'p2-2', prompt: '{1, 2, 3, 4} ∪ {3, 4, 5}', value: '{1, 2, 3, 4, 5}' },
        { id: 'p2-3', prompt: '{1, 2, 3, 4} \\ {3, 4, 5}', value: '{1, 2}' },
        { id: 'p2-4', prompt: '{3, 4, 5} \\ {1, 2, 3, 4}', value: '{5}' },
        { id: 'p2-5', prompt: '{2, 4} ∩ {1, 3, 5}', value: '∅ (üres halmaz)' },
        { id: 'p2-6', prompt: '{1, 2, 3} ∪ ∅', value: '{1, 2, 3}' }
      ]
    },

    // 3. SZINT: SZITA-FORMULA ÉS HALMAZAZONOSSÁGOK
    3: {
      pairs: [
        { id: 'p3-1', prompt: '|A ∪ B|', value: '|A| + |B| - |A ∩ B|' },
        { id: 'p3-2', prompt: '|A ∩ B|', value: '|A| + |B| - |A ∪ B|' },
        { id: 'p3-3', prompt: '|A \\ B|', value: '|A| - |A ∩ B|' },
        { id: 'p3-4', prompt: 'A ∪ Ā', value: 'U (Alaphalmaz)' },
        { id: 'p3-5', prompt: 'A ∩ Ā', value: '∅ (Üres halmaz)' },
        { id: 'p3-6', prompt: '(Ā)̄ (Kettős tagadás)', value: 'A (Önmaga)' }
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
        title="Halmazműveletek Párosító"
        subtitle={
          activeLevel === 1
            ? "Párosítsd össze a halmazműveleti szimbólumokat és a definícióikat!"
            : activeLevel === 2
            ? "Keresd meg a konkrét halmazműveletek pontos eredményeit!"
            : "Párosítsd a Szita-formula képleteit és a halmazazonosságokat!"
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

export default SetOperationsMatcher;

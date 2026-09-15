import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PowersMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const PowersMatcher: React.FC<PowersMatcherProps> = ({
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
    // 1. SZINT: ALAP HATVÁNYOK, 0 KITEVŐ ÉS TÖRT HATVÁNYOZÁSA
    1: {
      pairs: [
        { id: 'p1-1', prompt: '2⁵', value: '32 (2 · 2 · 2 · 2 · 2)' },
        { id: 'p1-2', prompt: '3⁴', value: '81 (3 · 3 · 3 · 3)' },
        { id: 'p1-3', prompt: '(-4)³', value: '-64 (Páratlan kitevő ⟹ negatív)' },
        { id: 'p1-4', prompt: '(-3)⁴', value: '+81 (Páros kitevő ⟹ pozitív)' },
        { id: 'p1-5', prompt: '(-17)⁰', value: '1 (Bármely nem nulla szám 0-ik hatványa)' },
        { id: 'p1-6', prompt: '(2/3)³', value: '8/27 (2³ / 3³)' }
      ]
    },

    // 2. SZINT: HATVÁNYAZONOSSÁGOK (KIEMELVE AZ OSZTÁST ÉS SZORZÁST)
    2: {
      pairs: [
        { id: 'p2-1', prompt: '2³ · 2⁴', value: '2⁷ = 128 (Azonos alapok szorzása)' },
        { id: 'p2-2', prompt: '5⁶ : 5⁴', value: '5² = 25 (Azonos alapok osztása)' },
        { id: 'p2-3', prompt: '(3²)³', value: '3⁶ = 729 (Hatvány hatványozása)' },
        { id: 'p2-4', prompt: '2⁴ · 5⁴', value: '10⁴ = 10 000 ((2·5)⁴)' },
        { id: 'p2-5', prompt: '12³ : 4³', value: '3³ = 27 ((12:4)³ - Azonos kitevőjűek osztása)' },
        { id: 'p2-6', prompt: '50² : 25²', value: '2² = 4 ((50:25)² - Azonos kitevőjűek osztása)' }
      ]
    },

    // 3. SZINT: NAGY SZÁMOK NORMÁLALAKJA ÉS MŰVELETEK
    3: {
      pairs: [
        { id: 'p3-1', prompt: '4 500 000', value: '4.5 · 10⁶' },
        { id: 'p3-2', prompt: '380 000', value: '3.8 · 10⁵' },
        { id: 'p3-3', prompt: '(2 · 10³) · (3 · 10⁴)', value: '6 · 10⁷' },
        { id: 'p3-4', prompt: '(8 · 10⁶) : (2 · 10²)', value: '4 · 10⁴' },
        { id: 'p3-5', prompt: '15 000 · 10³', value: '1.5 · 10⁷' },
        { id: 'p3-6', prompt: '(18³ : 6³) · 2³', value: '6³ = 216 ((3 · 2)³)' }
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

      {/* Matcher Board with cards */}
      <MatcherTemplate
        level={activeLevel}
        title="Hatványozás Párosító"
        subtitle={
          activeLevel === 1
            ? "Párosítsd össze a hatványokat a kiszámított értékükkel!"
            : activeLevel === 2
            ? "Párosítsd a hatványazonosságokat és kifejezéseket az eredményükkel!"
            : "Keresd meg a nagy számok normálalakját és műveleti eredményeit!"
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

export default PowersMatcher;

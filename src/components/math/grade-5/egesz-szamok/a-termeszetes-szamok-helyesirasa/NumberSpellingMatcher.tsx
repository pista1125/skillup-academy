import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface NumberSpellingMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const NumberSpellingMatcher: React.FC<NumberSpellingMatcherProps> = ({
  onBack,
  onSwitchToTheory,
  level,
  onNextLevel,
  onOpenRules
}) => {
  const [currentLevel, setCurrentLevel] = useState<DifficultyLevel>(level || 1);

  useEffect(() => {
    if (level) setCurrentLevel(level);
  }, [level]);

  const levelConfigs: Record<DifficultyLevel, MatcherLevelConfig> = {
    1: {
      level: 1,
      title: '1. Szint: Számok 2 000-ig',
      description: 'Párosítsd a számjegyeket a helyes egybeírt betűs alakjukkal!',
      pairs: [
        { id: '1', left: '15', right: 'tizenöt' },
        { id: '2', left: '482', right: 'négyszáznyolcvankettő' },
        { id: '3', left: '1 500', right: 'ezerötszáz' },
        { id: '4', left: '1 999', right: 'ezerkilencszázkilencvenkilenc' },
        { id: '5', left: '2 000', right: 'kétezer' },
        { id: '6', left: '5.', right: 'ötödik' }
      ]
    },
    2: {
      level: 2,
      title: '2. Szint: Számok 2 001 – 99 999',
      description: 'Párosítsd a számokat a kötőjelezett, vagy kerek ezres alakjukkal!',
      pairs: [
        { id: '1', left: '2 001', right: 'kétezer-egy' },
        { id: '2', left: '3 000', right: 'háromezer' },
        { id: '3', left: '4 520', right: 'négyezer-ötszázhúsz' },
        { id: '4', left: '12 300', right: 'tizenkétezer-háromszáz' },
        { id: '5', left: '45 800', right: 'negyvenötezer-nyolcszáz' },
        { id: '6', left: '70 005', right: 'hetvenezer-öt' }
      ]
    },
    3: {
      level: 3,
      title: '3. Szint: Milliók és Sorszámnevek',
      description: 'Párosítsd a nagy számokat és összetett alakokat!',
      pairs: [
        { id: '1', left: '1 250 000', right: 'egymillió-kétszázötvenezer' },
        { id: '2', left: '4 520 030', right: 'négymillió-ötszázhúszezer-harminc' },
        { id: '3', left: '5 000 000', right: 'ötmillió' },
        { id: '4', left: '5 000 020', right: 'ötmillió-húsz' },
        { id: '5', left: '100 005', right: 'egyszázezer-öt' },
        { id: '6', left: '50.', right: 'ötvenedik' }
      ]
    }
  };

  const handleNext = () => {
    if (currentLevel < 3) {
      setCurrentLevel((prev) => (prev + 1) as DifficultyLevel);
    } else if (onNextLevel) {
      onNextLevel();
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4">
      {onBack && (
        <div className="flex items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" /> Vissza
          </Button>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setCurrentLevel(lvl as DifficultyLevel)}
                className={cn(
                  "px-3 py-1 rounded-lg text-xs font-black transition-all",
                  currentLevel === lvl
                    ? "bg-violet-600 text-white shadow-sm"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                )}
              >
                {lvl}. Szint
              </button>
            ))}
          </div>
        </div>
      )}

      <MatcherTemplate
        config={levelConfigs[currentLevel]}
        onNextLevel={handleNext}
        onSwitchToTheory={onSwitchToTheory}
        onOpenRules={onOpenRules}
      />
    </div>
  );
};

export default NumberSpellingMatcher;

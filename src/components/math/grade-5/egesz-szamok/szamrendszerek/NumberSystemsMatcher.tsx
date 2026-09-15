import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface NumberSystemsMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const NumberSystemsMatcher: React.FC<NumberSystemsMatcherProps> = ({
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
      title: '1. Szint: Bináris alapok (1 – 15)',
      description: 'Párosítsd a kettes számrendszerbeli számokat a decimális értékükkel!',
      pairs: [
        { id: '1', left: '101₂', right: '5' },
        { id: '2', left: '1000₂', right: '8' },
        { id: '3', left: '1111₂', right: '15' },
        { id: '4', left: '110₂', right: '6' },
        { id: '5', left: '1010₂', right: '10' },
        { id: '6', left: '11₂', right: '3' }
      ]
    },
    2: {
      level: 2,
      title: '2. Szint: Nagyobb bináris számok (16 – 63)',
      description: 'Párosítsd a 2-hatványokat és kombinációikat a megfelelő decimális számmal!',
      pairs: [
        { id: '1', left: '10000₂', right: '16' },
        { id: '2', left: '10101₂', right: '21' },
        { id: '3', left: '100000₂', right: '32' },
        { id: '4', left: '101010₂', right: '42' },
        { id: '5', left: '110000₂', right: '48' },
        { id: '6', left: '111111₂', right: '63' }
      ]
    },
    3: {
      level: 3,
      title: '3. Szint: Bájt felső értékei és 5-ös alap',
      description: 'Párosítsd a speciális bináris és 5-ös alapú számokat a decimális értékükkel!',
      pairs: [
        { id: '1', left: '1000000₂', right: '64' },
        { id: '2', left: '10000000₂', right: '128' },
        { id: '3', left: '11111111₂', right: '255' },
        { id: '4', left: '23₅', right: '13' },
        { id: '5', left: '44₅', right: '24' },
        { id: '6', left: '100₅', right: '25' }
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
                    ? "bg-cyan-600 text-white shadow-sm"
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

export default NumberSystemsMatcher;

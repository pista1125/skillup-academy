import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface NumberReadingSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const NumberReadingSorter: React.FC<NumberReadingSorterProps> = ({
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

  const levels: Record<DifficultyLevel, SorterLevelConfig> = {
    // 1. SZINT: SZÁMOSZTÁLYOK SZERINTI CSOPORTOSÍTÁS
    1: {
      categories: [
        { id: 'units-class', name: 'Egyesek osztálya (1–3 jegy)', badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800' },
        { id: 'thousands-class', name: 'Ezresek osztálya (4–6 jegy)', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800' },
        { id: 'millions-class', name: 'Milliók osztálya (7–9 jegy)', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800' }
      ],
      items: [
        { id: 'i1-1', label: '745', category: 'units-class' },
        { id: 'i1-2', label: '80', category: 'units-class' },
        { id: 'i1-3', label: '902', category: 'units-class' },
        { id: 'i1-4', label: '5', category: 'units-class' },
        { id: 'i1-5', label: '4 520', category: 'thousands-class' },
        { id: 'i1-6', label: '85 000', category: 'thousands-class' },
        { id: 'i1-7', label: '704 000', category: 'thousands-class' },
        { id: 'i1-8', label: '12 350', category: 'thousands-class' },
        { id: 'i1-9', label: '1 000 000', category: 'millions-class' },
        { id: 'i1-10', label: '25 400 000', category: 'millions-class' },
        { id: 'i1-11', label: '4 520 030', category: 'millions-class' },
        { id: 'i1-12', label: '100 000 000', category: 'millions-class' }
      ]
    },

    // 2. SZINT: TAGOLÁS HELYESSÉGE (SZABÁLYOS VAGY HIBÁS)
    2: {
      categories: [
        { id: 'correct', name: 'Szabályosan tagolt szám', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' },
        { id: 'wrong', name: 'Hibásan tagolt szám', badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800' }
      ],
      items: [
        { id: 'i2-1', label: '45 200', category: 'correct' },
        { id: 'i2-2', label: '704 005', category: 'correct' },
        { id: 'i2-3', label: '1 000 000', category: 'correct' },
        { id: 'i2-4', label: '12 050 300', category: 'correct' },
        { id: 'i2-5', label: '900 000', category: 'correct' },
        { id: 'i2-6', label: '3 500', category: 'correct' },
        { id: 'i2-7', label: '452 00', category: 'wrong' },
        { id: 'i2-8', label: '70 4005', category: 'wrong' },
        { id: 'i2-9', label: '1000 000', category: 'wrong' },
        { id: 'i2-10', label: '120 503 00', category: 'wrong' },
        { id: 'i2-11', label: '9 00000', category: 'wrong' },
        { id: 'i2-12', label: '35 00', category: 'wrong' }
      ]
    },

    // 3. SZINT: BETŰS ÍRÁS (KÉTEZRES SZABÁLY: EGYBEÍRÁS VS KÖTŐJEL)
    3: {
      categories: [
        { id: 'single-word', name: 'Egybeírandó (≤ 2 000 vagy kerek)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' },
        { id: 'hyphenated', name: 'Kötőjeles (> 2 000 összetett)', badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800' }
      ],
      items: [
        { id: 'i3-1', label: 'ezerötszázötven (1 550)', category: 'single-word' },
        { id: 'i3-2', label: 'kétezer (2 000)', category: 'single-word' },
        { id: 'i3-3', label: 'ezerkilencszáz (1 900)', category: 'single-word' },
        { id: 'i3-4', label: 'egyszázezer (100 000)', category: 'single-word' },
        { id: 'i3-5', label: 'egymillió (1 000 000)', category: 'single-word' },
        { id: 'i3-6', label: 'ötszázötven (550)', category: 'single-word' },
        { id: 'i3-7', label: 'kétezer-egy (2 001)', category: 'hyphenated' },
        { id: 'i3-8', label: 'negyvenötezer-nyolcszáz (45 800)', category: 'hyphenated' },
        { id: 'i3-9', label: 'háromszázötvenezer-negyven (350 040)', category: 'hyphenated' },
        { id: 'i3-10', label: 'négymillió-ötvenezer (4 050 000)', category: 'hyphenated' },
        { id: 'i3-11', label: 'hetvenezer-nyolc (70 008)', category: 'hyphenated' },
        { id: 'i3-12', label: 'huszonötmillió-négyszáz (25 000 400)', category: 'hyphenated' }
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

          {/* Level Selector */}
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

      <SorterTemplate
        level={activeLevel}
        title="Számkiolvasás Csoportosító Játék"
        subtitle={
          activeLevel === 1
            ? "Válogasd szét a számokat az osztályaik száma (egyesek, ezresek, milliók) szerint!"
            : activeLevel === 2
            ? "Döntsd el a számokról, hogy helyesen vagy hibásan vannak-e tagolva!"
            : "Csoportosítsd a szöveges számokat a kétezres helyesírási szabály szerint (egybeírt vs kötőjeles)!"
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
      />
    </div>
  );
};

export default NumberReadingSorter;

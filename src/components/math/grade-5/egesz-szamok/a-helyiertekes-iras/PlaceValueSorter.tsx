import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PlaceValueSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const PlaceValueSorter: React.FC<PlaceValueSorterProps> = ({
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
    // 1. SZINT: HELYIÉRTÉKEK SZERINTI CSOPORTOSÍTÁS
    1: {
      categories: [
        { id: 'ones-tens', name: 'Egyesek & Tízesek (e, T)', badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800' },
        { id: 'hundreds-thousands', name: 'Százasok & Ezresek (Sz, E)', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800' },
        { id: 'ten-thousands-plus', name: 'Tízezres és nagyobb (Té, Sze, M)', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800' }
      ],
      items: [
        { id: 'i1-1', label: '7 egyes (7e)', category: 'ones-tens' },
        { id: 'i1-2', label: '4 tízes (4T = 40)', category: 'ones-tens' },
        { id: 'i1-3', label: '9 tízes (90)', category: 'ones-tens' },
        { id: 'i1-4', label: '1 egyes (1e)', category: 'ones-tens' },
        { id: 'i1-5', label: '5 százas (5Sz = 500)', category: 'hundreds-thousands' },
        { id: 'i1-6', label: '8 ezres (8E = 8 000)', category: 'hundreds-thousands' },
        { id: 'i1-7', label: '2 százas (200)', category: 'hundreds-thousands' },
        { id: 'i1-8', label: '6 ezres (6 000)', category: 'hundreds-thousands' },
        { id: 'i1-9', label: '3 tízezres (30 000)', category: 'ten-thousands-plus' },
        { id: 'i1-10', label: '5 százezres (500 000)', category: 'ten-thousands-plus' },
        { id: 'i1-11', label: '1 milliós (1 000 000)', category: 'ten-thousands-plus' },
        { id: 'i1-12', label: '9 tízezres (90 000)', category: 'ten-thousands-plus' }
      ]
    },

    // 2. SZINT: ÉRTÉKTÍPUSOK (ALAKI, HELYI-, VALÓDI ÉRTÉK A 7 452-BEN)
    2: {
      categories: [
        { id: 'alaki', name: 'Alaki érték (számjegy)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' },
        { id: 'helyi', name: 'Helyiérték (pozíció súlya)', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800' },
        { id: 'valodi', name: 'Valódi érték (tényleges mennyiség)', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800' }
      ],
      items: [
        { id: 'i2-1', label: '7 (a 7 452-ben)', category: 'alaki' },
        { id: 'i2-2', label: '4 (a 7 452-ben)', category: 'alaki' },
        { id: 'i2-3', label: '5 (a 7 452-ben)', category: 'alaki' },
        { id: 'i2-4', label: '2 (a 7 452-ben)', category: 'alaki' },
        { id: 'i2-5', label: '1 000 (ezres hely)', category: 'helyi' },
        { id: 'i2-6', label: '100 (százas hely)', category: 'helyi' },
        { id: 'i2-7', label: '10 (tízes hely)', category: 'helyi' },
        { id: 'i2-8', label: '1 (egyes hely)', category: 'helyi' },
        { id: 'i2-9', label: '7 000 (7 · 1 000)', category: 'valodi' },
        { id: 'i2-10', label: '400 (4 · 100)', category: 'valodi' },
        { id: 'i2-11', label: '50 (5 · 10)', category: 'valodi' },
        { id: 'i2-12', label: '2 (2 · 1)', category: 'valodi' }
      ]
    },

    // 3. SZINT: FELBONTÁSI FORMÁTUMOK
    3: {
      categories: [
        { id: 'standard', name: 'Alapalak (normál szám)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' },
        { id: 'sum', name: 'Helyiértékes összeg-alak', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800' },
        { id: 'product', name: 'Helyiértékes szorzatos alak', badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800' }
      ],
      items: [
        { id: 'i3-1', label: '45 820', category: 'standard' },
        { id: 'i3-2', label: '603 405', category: 'standard' },
        { id: 'i3-3', label: '1 000 000', category: 'standard' },
        { id: 'i3-4', label: '70 904', category: 'standard' },
        { id: 'i3-5', label: '40 000 + 5 000 + 800 + 20', category: 'sum' },
        { id: 'i3-6', label: '600 000 + 3 000 + 400 + 5', category: 'sum' },
        { id: 'i3-7', label: '70 000 + 900 + 4', category: 'sum' },
        { id: 'i3-8', label: '800 000 + 50 000 + 6', category: 'sum' },
        { id: 'i3-9', label: '4·10 000 + 5·1 000 + 8·100 + 2·10', category: 'product' },
        { id: 'i3-10', label: '6·100 000 + 3·1 000 + 4·100 + 5·1', category: 'product' },
        { id: 'i3-11', label: '7·10 000 + 9·100 + 4·1', category: 'product' },
        { id: 'i3-12', label: '8·100 000 + 5·10 000 + 6·1', category: 'product' }
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

          {/* Level Selector */}
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

      <SorterTemplate
        level={activeLevel}
        title="Helyiérték Csoportosító Játék"
        subtitle={
          activeLevel === 1
            ? "Válogasd szét a helyiértékeket a nagyságrendi kategóriákba!"
            : activeLevel === 2
            ? "Csoportosítsd a fogalmakat alaki, helyi- és valódi érték szerint!"
            : "Válogasd szét a felírásokat alapalak, összegalak és szorzatos alak szerint!"
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

export default PlaceValueSorter;

import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface NumberSystemsSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const NumberSystemsSorter: React.FC<NumberSystemsSorterProps> = ({
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

  const levelConfigs: Record<DifficultyLevel, SorterLevelConfig> = {
    1: {
      level: 1,
      title: '1. Szint: Számrendszerek Alapjai',
      description: 'Csoportosítsd a számokat és kifejezéseket a megfelelő számrendszer szerint!',
      categories: [
        {
          id: 'binary',
          title: 'Kettes (Bináris, b = 2)',
          description: 'Csak 0 és 1 jegyek',
          color: 'cyan'
        },
        {
          id: 'decimal',
          title: 'Tízes (Decimális, b = 10)',
          description: '0–9 jegyek, 10 hatványai',
          color: 'amber'
        },
        {
          id: 'other',
          title: 'Egyéb számrendszerek',
          description: '5-ös, 12-es (tucat), 60-as (idő)',
          color: 'purple'
        }
      ],
      items: [
        { id: '1', text: '1011₂', categoryId: 'binary' },
        { id: '2', text: 'Bit (0 vagy 1)', categoryId: 'binary' },
        { id: '3', text: '11111111₂ (255)', categoryId: 'binary' },
        { id: '4', text: '345 (3·100 + 4·10 + 5)', categoryId: 'decimal' },
        { id: '5', text: 'Helyiértékek: 10, 100, 1000', categoryId: 'decimal' },
        { id: '6', text: '23₅ (ötös alapú szám)', categoryId: 'other' },
        { id: '7', text: '1 nagytucat (144 db)', categoryId: 'other' },
        { id: '8', text: '1 óra = 60 perc (60-as alap)', categoryId: 'other' }
      ]
    },
    2: {
      level: 2,
      title: '2. Szint: Bináris Számok Nagysága',
      description: 'Sorold be a bináris számokat a decimális nagyságrendjük alapján!',
      categories: [
        {
          id: 'small',
          title: '1 – 15 között',
          description: 'Legfeljebb 4 bit (1₂ – 1111₂)',
          color: 'emerald'
        },
        {
          id: 'medium',
          title: '16 – 63 között',
          description: '5 vagy 6 bit (10000₂ – 111111₂)',
          color: 'blue'
        },
        {
          id: 'large',
          title: '64 – 255 között',
          description: '7 vagy 8 bit (1000000₂ – 11111111₂)',
          color: 'purple'
        }
      ],
      items: [
        { id: '1', text: '101₂ (= 5)', categoryId: 'small' },
        { id: '2', text: '1000₂ (= 8)', categoryId: 'small' },
        { id: '3', text: '1111₂ (= 15)', categoryId: 'small' },
        { id: '4', text: '10000₂ (= 16)', categoryId: 'medium' },
        { id: '5', text: '101010₂ (= 42)', categoryId: 'medium' },
        { id: '6', text: '111111₂ (= 63)', categoryId: 'medium' },
        { id: '7', text: '1000000₂ (= 64)', categoryId: 'large' },
        { id: '8', text: '1100100₂ (= 100)', categoryId: 'large' },
        { id: '9', text: '10000000₂ (= 128)', categoryId: 'large' },
        { id: '10', text: '11111111₂ (= 255)', categoryId: 'large' }
      ]
    },
    3: {
      level: 3,
      title: '3. Szint: Páros vs Páratlan bináris számok vs Érvénytelen alakok',
      description: 'Vizsgáld meg a bináris számok utolsó bitjét és szabályosságát!',
      categories: [
        {
          id: 'even',
          title: 'Páros bináris szám (utolsó bit: 0)',
          description: 'pl. 10₂, 100₂, 110₂',
          color: 'blue'
        },
        {
          id: 'odd',
          title: 'Páratlan bináris szám (utolsó bit: 1)',
          description: 'pl. 1₁, 11₂, 101₂',
          color: 'emerald'
        },
        {
          id: 'invalid',
          title: 'Érvénytelen kettes számrendszerbeli alak',
          description: 'Nem létező számjegyet (pl. 2-est) tartalmaz',
          color: 'rose'
        }
      ],
      items: [
        { id: '1', text: '1010₂ (decimális 10)', categoryId: 'even' },
        { id: '2', text: '110000₂ (decimális 48)', categoryId: 'even' },
        { id: '3', text: '1000₂ (decimális 8)', categoryId: 'even' },
        { id: '4', text: '101₂ (decimális 5)', categoryId: 'odd' },
        { id: '5', text: '1111₂ (decimális 15)', categoryId: 'odd' },
        { id: '6', text: '10101₂ (decimális 21)', categoryId: 'odd' },
        { id: '7', text: '1021₂ (2-es jegy szerepel benne)', categoryId: 'invalid' },
        { id: '8', text: '200₂ (2-es jegy szerepel benne)', categoryId: 'invalid' }
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

      <SorterTemplate
        config={levelConfigs[currentLevel]}
        onNextLevel={handleNext}
        onSwitchToTheory={onSwitchToTheory}
        onOpenRules={onOpenRules}
      />
    </div>
  );
};

export default NumberSystemsSorter;

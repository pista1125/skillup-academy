import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface NumberSpellingSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const NumberSpellingSorter: React.FC<NumberSpellingSorterProps> = ({
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
      title: '1. Szint: Egybeírás vs Kötőjelezés (2000-es szabály)',
      description: 'Csoportosítsd a számokat a helyesírási szabályuk szerint!',
      categories: [
        {
          id: 'under2000',
          title: '≤ 2 000 (Egybeírás)',
          description: 'Összetett számok 2000-ig',
          color: 'emerald'
        },
        {
          id: 'roundLarge',
          title: 'Kerek ezres / milliós',
          description: 'Nincs utánuk egyéb tag',
          color: 'blue'
        },
        {
          id: 'over2000',
          title: '> 2 000 (Kötőjeles)',
          description: 'Összetett számok 2000 felett',
          color: 'violet'
        }
      ],
      items: [
        { id: '1', text: '1 500 (ezerötszáz)', categoryId: 'under2000' },
        { id: '2', text: '482 (négyszáznyolcvankettő)', categoryId: 'under2000' },
        { id: '3', text: '1 999 (ezerkilencszázkilencvenkilenc)', categoryId: 'under2000' },
        { id: '4', text: '3 000 (háromezer)', categoryId: 'roundLarge' },
        { id: '5', text: '20 000 (húszezer)', categoryId: 'roundLarge' },
        { id: '6', text: '5 000 000 (ötmillió)', categoryId: 'roundLarge' },
        { id: '7', text: '2 001 (kétezer-egy)', categoryId: 'over2000' },
        { id: '8', text: '4 520 (négyezer-ötszázhúsz)', categoryId: 'over2000' },
        { id: '9', text: '45 800 (negyvenötezer-nyolcszáz)', categoryId: 'over2000' }
      ]
    },
    2: {
      level: 2,
      title: '2. Szint: Helyes vs Helytelen írásmódok',
      description: 'Döntsd el, hogy az adott felírás nyelvtanilag helyes vagy helytelen!',
      categories: [
        {
          id: 'correct',
          title: 'Helyes alak',
          description: 'A helyesírási szabályoknak megfelel',
          color: 'emerald'
        },
        {
          id: 'wrongSpace',
          title: 'Hibás (Szóközhiba)',
          description: 'Kötőjel helyett szóköz van',
          color: 'amber'
        },
        {
          id: 'wrongHyphen',
          title: 'Hibás (Felesleges kötőjel / toldalékolás)',
          description: '2000 alatt vagy sorszámnévnél elrontott',
          color: 'rose'
        }
      ],
      items: [
        { id: '1', text: 'ezerötszáz (1 500)', categoryId: 'correct' },
        { id: '2', text: 'kétezer-egy (2 001)', categoryId: 'correct' },
        { id: '3', text: '5. osztály (ötödik)', categoryId: 'correct' },
        { id: '4', text: 'háromezer ötszáz (3 500)', categoryId: 'wrongSpace' },
        { id: '5', text: 'kétezer egy (2 001)', categoryId: 'wrongSpace' },
        { id: '6', text: 'ezer-ötszáz (1 500)', categoryId: 'wrongHyphen' },
        { id: '7', text: '5.-ik helyezett', categoryId: 'wrongHyphen' },
        { id: '8', text: '45-ezer Ft', categoryId: 'wrongHyphen' }
      ]
    },
    3: {
      level: 3,
      title: '3. Szint: Kötőjelek száma a leírásban',
      description: 'Hány darab kötőjel van a szám helyes betűs leírásában?',
      categories: [
        {
          id: 'zeroHyphen',
          title: '0 kötőjel (Egybeírás)',
          description: '≤ 2000 vagy kerek szám',
          color: 'emerald'
        },
        {
          id: 'oneHyphen',
          title: '1 kötőjel',
          description: '2 kapcsolódó számosztály',
          color: 'blue'
        },
        {
          id: 'twoHyphens',
          title: '2 kötőjel',
          description: '3 kapcsolódó számosztály (M - ezer - egyes)',
          color: 'purple'
        }
      ],
      items: [
        { id: '1', text: '2 000 (kétezer)', categoryId: 'zeroHyphen' },
        { id: '2', text: '5 000 000 (ötmillió)', categoryId: 'zeroHyphen' },
        { id: '3', text: '1 250 000 (egymillió-kétszázötvenezer)', categoryId: 'oneHyphen' },
        { id: '4', text: '45 800 (negyvenötezer-nyolcszáz)', categoryId: 'oneHyphen' },
        { id: '5', text: '5 000 020 (ötmillió-húsz)', categoryId: 'oneHyphen' },
        { id: '6', text: '4 520 030 (négymillió-ötszázhúszezer-harminc)', categoryId: 'twoHyphens' },
        { id: '7', text: '25 300 450 (huszonötmillió-háromszázezer-négyszázötven)', categoryId: 'twoHyphens' }
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

      <SorterTemplate
        config={levelConfigs[currentLevel]}
        onNextLevel={handleNext}
        onSwitchToTheory={onSwitchToTheory}
        onOpenRules={onOpenRules}
      />
    </div>
  );
};

export default NumberSpellingSorter;

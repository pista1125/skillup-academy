import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CharacterizationSorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: '1. Szint: Függvények Paritása',
    subtitle: 'Sorold be a függvényeket a szimmetriájuk (paritásuk) szerint!',
    categories: [
      {
        id: 'cat-even',
        name: 'Páros Függvény (y-tengely)',
        description: 'f(-x) = f(x), tükrös az y tengelyre',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      },
      {
        id: 'cat-odd',
        name: 'Páratlan Függvény (Origó)',
        description: 'f(-x) = -f(x), 180°-os forgásszimmetria az origóra',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-neither',
        name: 'Sem Páros, Sem Páratlan',
        description: 'Nincs tengelyes vagy origó körüli szimmetriája',
        badgeColor: 'bg-slate-100 text-slate-800 border-slate-300'
      }
    ],
    items: [
      // Páros
      { id: 'cs1-1', label: 'f(x) = x²', category: 'cat-even' },
      { id: 'cs1-2', label: 'f(x) = |x|', category: 'cat-even' },
      { id: 'cs1-3', label: 'f(x) = 5 (konstans)', category: 'cat-even' },
      { id: 'cs1-4', label: 'f(x) = x⁴ - 2x²', category: 'cat-even' },
      // Páratlan
      { id: 'cs1-5', label: 'f(x) = x', category: 'cat-odd' },
      { id: 'cs1-6', label: 'f(x) = 1 / x', category: 'cat-odd' },
      { id: 'cs1-7', label: 'f(x) = -3x', category: 'cat-odd' },
      { id: 'cs1-8', label: 'f(x) = x³', category: 'cat-odd' },
      // Sem páros, sem páratlan
      { id: 'cs1-9', label: 'f(x) = 2x - 4', category: 'cat-neither' },
      { id: 'cs1-10', label: 'f(x) = |x - 2| (eltolt V-alak)', category: 'cat-neither' },
      { id: 'cs1-11', label: 'f(x) = (x - 1)²', category: 'cat-neither' },
      { id: 'cs1-12', label: 'f(x) = x² + x', category: 'cat-neither' }
    ]
  },
  2: {
    title: '2. Szint: Függvények Korlátossága',
    subtitle: 'Milyen korlátai vannak a megadott függvényeknek?',
    categories: [
      {
        id: 'cat-bounded-below',
        name: 'Alulról Korlátos (f(x) ≥ k)',
        description: 'Van alsó korlát, de felülről a végtelenbe nyúlik',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-bounded-above',
        name: 'Felülről Korlátos (f(x) ≤ K)',
        description: 'Van felső korlát, de alulról a -végtelenbe nyúlik',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-unbounded',
        name: 'Nem Korlátos (Sem alul, sem felül)',
        description: 'Mindkét irányban a végtelenbe tart',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      // Alulról korlátos
      { id: 'cs2-1', label: 'f(x) = x²', category: 'cat-bounded-below' },
      { id: 'cs2-2', label: 'f(x) = |x - 3| - 4', category: 'cat-bounded-below' },
      { id: 'cs2-3', label: 'f(x) = 2x² + 5', category: 'cat-bounded-below' },
      { id: 'cs2-4', label: 'f(x) = |x|', category: 'cat-bounded-below' },
      // Felülről korlátos
      { id: 'cs2-5', label: 'f(x) = -x²', category: 'cat-bounded-above' },
      { id: 'cs2-6', label: 'f(x) = -|x| + 3', category: 'cat-bounded-above' },
      { id: 'cs2-7', label: 'f(x) = -2(x - 1)² + 8', category: 'cat-bounded-above' },
      { id: 'cs2-8', label: 'f(x) = 10 - x²', category: 'cat-bounded-above' },
      // Nem korlátos
      { id: 'cs2-9', label: 'f(x) = 3x - 5', category: 'cat-unbounded' },
      { id: 'cs2-10', label: 'f(x) = -2x', category: 'cat-unbounded' },
      { id: 'cs2-11', label: 'f(x) = 1 / x', category: 'cat-unbounded' },
      { id: 'cs2-12', label: 'f(x) = x³', category: 'cat-unbounded' }
    ]
  },
  3: {
    title: '3. Szint: Monotonitás a Teljes Értelmezési Tartományon',
    subtitle: 'Hogyan viselkedik a függvény a teljes értelmezési tartományán?',
    categories: [
      {
        id: 'cat-mono-inc',
        name: 'Végig Szigorúan Növekvő',
        description: 'A teljes D_f-en balról jobbra emelkedik',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-mono-dec',
        name: 'Végig Szigorúan Csökkenő',
        description: 'A teljes D_f-en balról jobbra süllyed',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-mono-var',
        name: 'Nem Monoton az Egész Tartományon',
        description: 'Váltakozó (csökken majd nő), vagy konstans',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      // Végig növekvő
      { id: 'cs3-1', label: 'f(x) = 4x - 1', category: 'cat-mono-inc' },
      { id: 'cs3-2', label: 'f(x) = 0.2x + 7', category: 'cat-mono-inc' },
      { id: 'cs3-3', label: 'f(x) = x³', category: 'cat-mono-inc' },
      { id: 'cs3-4', label: 'f(x) = 2x', category: 'cat-mono-inc' },
      // Végig csökkenő
      { id: 'cs3-5', label: 'f(x) = -3x + 8', category: 'cat-mono-dec' },
      { id: 'cs3-6', label: 'f(x) = -0.5x', category: 'cat-mono-dec' },
      { id: 'cs3-7', label: 'f(x) = 10 - x', category: 'cat-mono-dec' },
      { id: 'cs3-8', label: 'f(x) = -x³', category: 'cat-mono-dec' },
      // Nem monoton végig
      { id: 'cs3-9', label: 'f(x) = x² (csökken 0-ig, majd nő)', category: 'cat-mono-var' },
      { id: 'cs3-10', label: 'f(x) = |x - 2|', category: 'cat-mono-var' },
      { id: 'cs3-11', label: 'f(x) = 5 (konstans, nem szigorúan monoton)', category: 'cat-mono-var' },
      { id: 'cs3-12', label: 'f(x) = -x² + 4', category: 'cat-mono-var' }
    ]
  }
};

export const CharacterizationSorter: React.FC<CharacterizationSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'fuggvenyek-jellemzese',
  topicTitle = 'Függvények jellemzése'
}) => {
  const activeLevel = (currentLevel ?? level) as DifficultyLevel;

  return (
    <SorterTemplate
      level={activeLevel}
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
      activityType="g9-func-jellemzes-sorter"
    />
  );
};


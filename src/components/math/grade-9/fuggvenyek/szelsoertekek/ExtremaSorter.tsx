import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface ExtremaSorterProps {
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
    title: '1. Szint: Szélsőérték Típusa ℝ-en',
    subtitle: 'Sorold be a függvényeket aszerint, hogy milyen globális szélsőértékkel rendelkeznek a teljes valós számok halmazán!',
    categories: [
      {
        id: 'cat-min-only',
        name: 'Csak Minimuma van',
        description: 'Alulról korlátos, völgypontja van, felfelé a végtelenbe tart',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-max-only',
        name: 'Csak Maximuma van',
        description: 'Felülről korlátos, csúcspontja van, lefelé -∞-be tart',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-no-extrema',
        name: 'Nincs Szélsőértéke',
        description: 'Nem korlátos sem alulról, sem felülről',
        badgeColor: 'bg-slate-100 text-slate-800 border-slate-300'
      }
    ],
    items: [
      // Csak Minimum
      { id: 'es1-1', label: 'f(x) = (x - 4)² + 3', category: 'cat-min-only' },
      { id: 'es1-2', label: 'f(x) = 2|x| - 5', category: 'cat-min-only' },
      { id: 'es1-3', label: 'f(x) = x² + 7', category: 'cat-min-only' },
      { id: 'es1-4', label: 'f(x) = |x + 3|', category: 'cat-min-only' },
      // Csak Maximum
      { id: 'es1-5', label: 'f(x) = -(x + 1)² + 6', category: 'cat-max-only' },
      { id: 'es1-6', label: 'f(x) = -|x - 2| + 4', category: 'cat-max-only' },
      { id: 'es1-7', label: 'f(x) = -3x²', category: 'cat-max-only' },
      { id: 'es1-8', label: 'f(x) = -2|x| - 1', category: 'cat-max-only' },
      // Nincs szélsőértéke
      { id: 'es1-9', label: 'f(x) = 3x - 5 (egyenes ℝ-en)', category: 'cat-no-extrema' },
      { id: 'es1-10', label: 'f(x) = -2x + 1', category: 'cat-no-extrema' },
      { id: 'es1-11', label: 'f(x) = 1 / x (hiperbola)', category: 'cat-no-extrema' },
      { id: 'es1-12', label: 'f(x) = x³ (köbfüggvény)', category: 'cat-no-extrema' }
    ]
  },
  2: {
    title: '2. Szint: Szélsőérték Helye (x₀ előjele)',
    subtitle: 'Határozd meg, hogy az adott függvény csúcspontja (helye) negatív, nulla vagy pozitív x-nél található!',
    categories: [
      {
        id: 'cat-neg-place',
        name: 'Negatív Helyen (x₀ < 0)',
        description: 'A zárójel vagy abszolútérték zérushelye negatív',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-zero-place',
        name: 'Nulla Helyen (x₀ = 0)',
        description: 'Nincs vízszintes eltolás, a csúcs az y-tengelyen van',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      },
      {
        id: 'cat-pos-place',
        name: 'Pozitív Helyen (x₀ > 0)',
        description: 'A zárójel vagy abszolútérték zérushelye pozitív',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      }
    ],
    items: [
      // Negatív hely
      { id: 'es2-1', label: 'f(x) = (x + 5)² - 2 (x = -5)', category: 'cat-neg-place' },
      { id: 'es2-2', label: 'f(x) = -|x + 3| + 1 (x = -3)', category: 'cat-neg-place' },
      { id: 'es2-3', label: 'f(x) = 2(x + 1)² (x = -1)', category: 'cat-neg-place' },
      { id: 'es2-4', label: 'f(x) = |x + 7| - 4 (x = -7)', category: 'cat-neg-place' },
      // Nulla hely
      { id: 'es2-5', label: 'f(x) = x² - 9 (x = 0)', category: 'cat-zero-place' },
      { id: 'es2-6', label: 'f(x) = -3|x| + 5 (x = 0)', category: 'cat-zero-place' },
      { id: 'es2-7', label: 'f(x) = -x² (x = 0)', category: 'cat-zero-place' },
      { id: 'es2-8', label: 'f(x) = 4|x| (x = 0)', category: 'cat-zero-place' },
      // Pozitív hely
      { id: 'es2-9', label: 'f(x) = (x - 2)² + 10 (x = 2)', category: 'cat-pos-place' },
      { id: 'es2-10', label: 'f(x) = -|x - 6| + 2 (x = 6)', category: 'cat-pos-place' },
      { id: 'es2-11', label: 'f(x) = 3(x - 1)² - 8 (x = 1)', category: 'cat-pos-place' },
      { id: 'es2-12', label: 'f(x) = |x - 4| + 3 (x = 4)', category: 'cat-pos-place' }
    ]
  },
  3: {
    title: '3. Szint: Intervallumok és Különleges Esetek',
    subtitle: 'Sorold be a megadott intervallumon értelmezett függvényeket a szélsőértékek létezése szerint!',
    categories: [
      {
        id: 'cat-both-extrema',
        name: 'Mindkét Szélsőérték Létezik',
        description: 'Van globális minimuma ÉS maximuma is',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-only-one',
        name: 'Pontosan Egy Szélsőértéke Van',
        description: 'Csak minimuma VAGY csak maximuma létezik',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-none-on-interval',
        name: 'Egyik Szélsőértéke Sincs',
        description: 'Nyílt intervallum vagy nem korlátos ágak miatt',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      // Mindkettő
      { id: 'es3-1', label: 'f(x) = 2x + 1 az x ∈ [0; 5] zárt szakaszon', category: 'cat-both-extrema' },
      { id: 'es3-2', label: 'f(x) = x² az x ∈ [-2; 3] zárt szakaszon', category: 'cat-both-extrema' },
      { id: 'es3-3', label: 'c(x) = 4 konstans függvény ℝ-en', category: 'cat-both-extrema' },
      { id: 'es3-4', label: 'f(x) = |x - 1| az x ∈ [-1; 4] szakaszon', category: 'cat-both-extrema' },
      // Csak egy
      { id: 'es3-5', label: 'f(x) = (x - 1)² a teljes ℝ halmazon', category: 'cat-only-one' },
      { id: 'es3-6', label: 'f(x) = -|x| + 3 a teljes ℝ halmazon', category: 'cat-only-one' },
      { id: 'es3-7', label: 'f(x) = x² + 5 a [0; ∞[ félig nyílt intervallumon', category: 'cat-only-one' },
      { id: 'es3-8', label: 'f(x) = -x² a ]-∞; 0] intervallumon', category: 'cat-only-one' },
      // Egyik sem
      { id: 'es3-9', label: 'f(x) = 2x a ]0; 5[ nyílt intervallumon', category: 'cat-none-on-interval' },
      { id: 'es3-10', label: 'f(x) = 1 / x a ]0; ∞[ tartományon', category: 'cat-none-on-interval' },
      { id: 'es3-11', label: 'f(x) = -3x + 2 a teljes ℝ-en', category: 'cat-none-on-interval' },
      { id: 'es3-12', label: 'f(x) = x a ]-2; 2[ nyílt intervallumon', category: 'cat-none-on-interval' }
    ]
  }
};

export const ExtremaSorter: React.FC<ExtremaSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'szelsoertekek',
  topicTitle = 'Függvények Szélsőértékei'
}) => {
  const activeLevel = currentLevel ?? level;

  return (
    <SorterTemplate
      title="Szélsőérték Csoportosító"
      subtitle="Kategorizáld a függvényeket és kifejezéseket a szélsőértékeik tulajdonságai szerint!"
      levels={sorterLevels}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
    />
  );
};


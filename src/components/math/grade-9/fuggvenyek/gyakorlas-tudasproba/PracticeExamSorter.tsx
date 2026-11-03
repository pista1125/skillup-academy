import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface PracticeExamSorterProps {
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
    title: '1. Szint: Függvénycsaládok Besorolása',
    subtitle: 'Sorold be a megadott függvényeket a megfelelő típuscsaládba!',
    categories: [
      {
        id: 'cat-linear',
        name: 'Lineáris Függvény',
        description: 'Egyenes képe van: f(x) = mx + b',
        badgeColor: 'bg-sky-100 text-sky-900 border-sky-300'
      },
      {
        id: 'cat-quadratic',
        name: 'Másodfokú Függvény',
        description: 'Parabola görbéje van: f(x) = a(x - u)² + v',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-abs',
        name: 'Abszolútérték-függvény',
        description: 'V-alakú töröttvonal: f(x) = a|x - u| + v',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-other',
        name: 'Gyök- vagy Törtfüggvény',
        description: 'Négyzetgyök vagy fordított arányosság görbéje',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      }
    ],
    items: [
      // Lineáris
      { id: 'ps1-1', label: 'f(x) = 3x - 5', category: 'cat-linear' },
      { id: 'ps1-2', label: 'g(x) = -0.5x + 2', category: 'cat-linear' },
      { id: 'ps1-3', label: 'h(x) = 4 (konstans)', category: 'cat-linear' },
      // Másodfokú
      { id: 'ps1-4', label: 'f(x) = (x - 2)² - 3', category: 'cat-quadratic' },
      { id: 'ps1-5', label: 'g(x) = -2x² + 8', category: 'cat-quadratic' },
      { id: 'ps1-6', label: 'h(x) = 0.5(x + 1)²', category: 'cat-quadratic' },
      // Abszolútérték
      { id: 'ps1-7', label: 'f(x) = 2|x - 4| - 1', category: 'cat-abs' },
      { id: 'ps1-8', label: 'g(x) = -|x + 3| + 5', category: 'cat-abs' },
      { id: 'ps1-9', label: 'h(x) = |2x - 6|', category: 'cat-abs' },
      // Gyök vagy tört
      { id: 'ps1-10', label: 'f(x) = √(x - 2)', category: 'cat-other' },
      { id: 'ps1-11', label: 'g(x) = 12 / x', category: 'cat-other' },
      { id: 'ps1-12', label: 'h(x) = 2√x + 1', category: 'cat-other' }
    ]
  },
  2: {
    title: '2. Szint: Szélsőérték Jellege ℝ-en',
    subtitle: 'Határozd meg, milyen globális szélsőértékkel rendelkezik a függvény a teljes valós számok halmazán!',
    categories: [
      {
        id: 'cat-extrema-min',
        name: 'Globális Minimuma Van',
        description: 'Alulról korlátos, létezik legalacsonyabb pontja',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-extrema-max',
        name: 'Globális Maximuma Van',
        description: 'Felülről korlátos, létezik legmagasabb pontja',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-extrema-none',
        name: 'Nincs Szélsőértéke ℝ-en',
        description: 'Sem alulról, sem felülről nem korlátos (vagy nyílt görbe)',
        badgeColor: 'bg-slate-100 text-slate-800 border-slate-300'
      }
    ],
    items: [
      // Minimum
      { id: 'ps2-1', label: 'f(x) = (x - 3)² + 2 (felfelé nyíló parabola)', category: 'cat-extrema-min' },
      { id: 'ps2-2', label: 'f(x) = 2|x + 1| - 4 (normál V-alak)', category: 'cat-extrema-min' },
      { id: 'ps2-3', label: 'f(x) = x² - 6x + 10', category: 'cat-extrema-min' },
      { id: 'ps2-4', label: 'f(x) = |x| + 5', category: 'cat-extrema-min' },
      // Maximum
      { id: 'ps2-5', label: 'f(x) = -(x - 1)² + 7 (lefelé nyíló parabola)', category: 'cat-extrema-max' },
      { id: 'ps2-6', label: 'f(x) = -3|x - 2| + 1 (tető alak)', category: 'cat-extrema-max' },
      { id: 'ps2-7', label: 'f(x) = -x² - 4', category: 'cat-extrema-max' },
      { id: 'ps2-8', label: 'f(x) = -|x + 5|', category: 'cat-extrema-max' },
      // Nincs szélsőérték
      { id: 'ps2-9', label: 'f(x) = 3x - 7 (növekvő egyenes)', category: 'cat-extrema-none' },
      { id: 'ps2-10', label: 'f(x) = -2x + 4 (csökkenő egyenes)', category: 'cat-extrema-none' },
      { id: 'ps2-11', label: 'f(x) = 5 / x (hiperbola ágak)', category: 'cat-extrema-none' },
      { id: 'ps2-12', label: 'f(x) = 0.5x + 1', category: 'cat-extrema-none' }
    ]
  },
  3: {
    title: '3. Szint: Valós Megoldások Száma',
    subtitle: 'Döntsd el, hány valós megoldása van az alábbi egyenleteknek!',
    categories: [
      {
        id: 'cat-roots-0',
        name: '0 Megoldás (∅)',
        description: 'Nincs olyan x, amely kielégítené az egyenletet',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-roots-1',
        name: '1 Megoldás',
        description: 'Pontosan egyetlen valós gyöke van',
        badgeColor: 'bg-sky-100 text-sky-900 border-sky-300'
      },
      {
        id: 'cat-roots-2',
        name: '2 Megoldás',
        description: 'Pontosan két különböző valós gyöke van',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-roots-inf',
        name: 'Végtelen Sok Megoldás',
        description: 'Egy egész intervallum vagy ℝ minden száma megoldás',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      // 0 megoldás
      { id: 'ps3-1', label: '|x - 4| = -3', category: 'cat-roots-0' },
      { id: 'ps3-2', label: 'x² = -9', category: 'cat-roots-0' },
      { id: 'ps3-3', label: '|x - 1| + |x - 5| = 2 (távolság 4 > 2)', category: 'cat-roots-0' },
      // 1 megoldás
      { id: 'ps3-4', label: '|x - 7| = 0', category: 'cat-roots-1' },
      { id: 'ps3-5', label: '2x - 6 = 0', category: 'cat-roots-1' },
      { id: 'ps3-6', label: '|x - 2| = |x - 8| (felezőpont: x = 5)', category: 'cat-roots-1' },
      // 2 megoldás
      { id: 'ps3-7', label: '|x - 3| = 5', category: 'cat-roots-2' },
      { id: 'ps3-8', label: 'x² = 16', category: 'cat-roots-2' },
      { id: 'ps3-9', label: '(x - 2)² = 9', category: 'cat-roots-2' },
      // Végtelen sok
      { id: 'ps3-10', label: '|x - 2| + |x - 6| = 4 ([2; 6] szakasz)', category: 'cat-roots-inf' },
      { id: 'ps3-11', label: '|x - 5| = |5 - x|', category: 'cat-roots-inf' },
      { id: 'ps3-12', label: '2(x + 1) = 2x + 2', category: 'cat-roots-inf' }
    ]
  }
};

export const PracticeExamSorter: React.FC<PracticeExamSorterProps> = ({
  level,
  currentLevel = 1,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g9-func-tudasproba-sorter',
  topicTitle = 'Függvénytan Témazáró Rendszerező'
}) => {
  const activeLevel = level ?? currentLevel;

  return (
    <SorterTemplate
      level={activeLevel}
      currentLevel={currentLevel}
      levels={sorterLevels}
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


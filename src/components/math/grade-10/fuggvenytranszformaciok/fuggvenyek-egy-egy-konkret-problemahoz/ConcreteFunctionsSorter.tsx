import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ConcreteFunctionsSorterProps {
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
    title: 'Folytonos vs. Diszkrét valós modellek',
    subtitle: 'Válogasd szét a jelenségeket aszerint, hogy folytonos valós számokkal vagy csak egész darabszámokkal modellezhetők!',
    categories: [
      {
        id: 'cat-continuous',
        name: 'Folytonos modell (x ∈ ℝ)',
        description: 'Bármilyen tört vagy tizedes érték értelmezhető (hossz, idő, hőmérséklet)',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-discrete',
        name: 'Diszkrét modell (x ∈ ℕ)',
        description: 'Csak megszámlálható egész darabszámok vehetők fel (tárgyak, személyek)',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      }
    ],
    items: [
      { id: 's1-1', content: 'A bekerített kordon szélessége (méterben)', categoryId: 'cat-continuous' },
      { id: 's1-2', content: 'Az akcióban vásárolt DVD lemezek darabszáma', categoryId: 'cat-discrete' },
      { id: 's1-3', content: 'A víztartály töltési ideje (másodpercben)', categoryId: 'cat-continuous' },
      { id: 's1-4', content: 'A leárazáson eladott szurkolói pólók száma', categoryId: 'cat-discrete' },
      { id: 's1-5', content: 'A gépkocsi sebessége a fékút mérésekor', categoryId: 'cat-continuous' },
      { id: 's1-6', content: 'A moziterembe váltott belépőjegyek száma', categoryId: 'cat-discrete' },
      { id: 's1-7', content: 'Egy hűtőház mért belső hőmérséklete', categoryId: 'cat-continuous' },
      { id: 's1-8', content: 'A kamionra felrakott raklapok száma', categoryId: 'cat-discrete' },
      { id: 's1-9', content: 'Egy lejtőn leguruló golyó elmozdulása (cm)', categoryId: 'cat-continuous' },
      { id: 's1-10', content: 'Egy osztály tanulóinak létszáma', categoryId: 'cat-discrete' }
    ]
  },
  2: {
    title: 'Lineáris vs. Másodfokú összefüggések',
    subtitle: 'Döntsd el a szituációról, hogy egyenletes (lineáris) vagy szélsőértékkel bíró (másodfokú) függvény írja le!',
    categories: [
      {
        id: 'cat-linear',
        name: 'Lineáris modell (f(x) = ax + b)',
        description: 'Egyenletes változás, a grafikon egyenes, nincs belső szélsőérték',
        badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300'
      },
      {
        id: 'cat-quadratic',
        name: 'Másodfokú modell (f(x) = ax² + bx + c)',
        description: 'Változó meredekség, a grafikon parabola, van csúcspontja (max/min)',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      { id: 's2-1', content: 'Kordon területe: T(x) = x · (23 - x)', categoryId: 'cat-quadratic' },
      { id: 's2-2', content: 'Tartály térfogata: V(t) = 50 + 12t', categoryId: 'cat-linear' },
      { id: 's2-3', content: 'Pólók bevétele: F(x) = x · (4000 - 200x)', categoryId: 'cat-quadratic' },
      { id: 's2-4', content: 'Taxi viteldíj: D(s) = 1100 + 440s', categoryId: 'cat-linear' },
      { id: 's2-5', content: 'DVD csomag összára: A(x) = 100(x - 3)² + 700', categoryId: 'cat-quadratic' },
      { id: 's2-6', content: 'Pólók darabára: E(x) = 4000 - 200x', categoryId: 'cat-linear' },
      { id: 's2-7', content: 'Fellőtt kő magassága: h(t) = 20t - 5t²', categoryId: 'cat-quadratic' },
      { id: 's2-8', content: 'Munkabér: B(t) = 2800 · t', categoryId: 'cat-linear' },
      { id: 's2-9', content: 'Autó fékútja: s(v) = k · v²', categoryId: 'cat-quadratic' },
      { id: 's2-10', content: 'Vízforraló fogyasztása: E(t) = P · t', categoryId: 'cat-linear' }
    ]
  },
  3: {
    title: 'Gazdasági zónák a leárazási modellben',
    subtitle: 'Sorold be a mezvásárlási darabszámokat a növekvő bevétel vagy a gazdasági paradoxon kategóriájába!',
    categories: [
      {
        id: 'cat-growth',
        name: 'Normál zóna (Bevétel növekszik)',
        description: '0 ≤ x ≤ 10 db: a boltbevételek emelkednek az eladott darabszámmal',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-paradox',
        name: 'Paradoxon zóna (Bevétel csökken/káros)',
        description: 'x > 10 db: a túl nagy engedmény miatt a több eladás kevesebb bevételt hoz',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 's3-1', content: 'x = 3 db vásárlása (F(3) = 10 200 Ft)', categoryId: 'cat-growth' },
      { id: 's3-2', content: 'x = 15 db vásárlása (F(15) = 15 000 Ft < F(10))', categoryId: 'cat-paradox' },
      { id: 's3-3', content: 'x = 7 db vásárlása (F(7) = 18 200 Ft)', categoryId: 'cat-growth' },
      { id: 's3-4', content: 'x = 12 db vásárlása (F(12) = 19 200 Ft < Max)', categoryId: 'cat-paradox' },
      { id: 's3-5', content: 'x = 10 db vásárlása (F(10) = 20 000 Ft — Abszolút Csúcs)', categoryId: 'cat-growth' },
      { id: 's3-6', content: 'x = 20 db vásárlása (F(20) = 0 Ft — ingyen elvihető)', categoryId: 'cat-paradox' },
      { id: 's3-7', content: 'x = 5 db vásárlása (F(5) = 15 000 Ft)', categoryId: 'cat-growth' },
      { id: 's3-8', content: 'x = 18 db vásárlása (F(18) = 7 200 Ft)', categoryId: 'cat-paradox' },
      { id: 's3-9', content: 'x = 1 db vásárlása (F(1) = 3 800 Ft)', categoryId: 'cat-growth' },
      { id: 's3-10', content: 'x = 22 db vásárlása (F(22) = -8 800 Ft — negatív bevétel!)', categoryId: 'cat-paradox' }
    ]
  }
};

export const ConcreteFunctionsSorter: React.FC<ConcreteFunctionsSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'fuggvenyek-egy-egy-konkret-problemahoz',
  topicTitle = 'Függvények egy-egy konkrét problémához'
}) => {
  const activeLevel = currentLevel || level;

  return (
    <SorterTemplate
      level={activeLevel}
      levelsConfig={sorterLevels}
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


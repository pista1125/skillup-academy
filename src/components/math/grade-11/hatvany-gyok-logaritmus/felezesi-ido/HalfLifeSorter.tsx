import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface HalfLifeSorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onComplete?: () => void;
  topicId?: string;
  topicTitle?: string;
  [key: string]: any;
}

const items = (prefix: string, list: [string, string][]) => list.map(([text, categoryId], i) => ({ id: `${prefix}${i + 1}`, text, categoryId }));

const HALF_LIFE_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Milyen folyamat?',
    description: 'Válogasd szét a hozzárendelési szabályokat! Csak a csökkenő exponenciális folyamatnak van felezési ideje.',
    categories: [
      { id: 'decay', name: 'Csökkenő exponenciális (van felezési ideje)', color: 'violet' },
      { id: 'growth', name: 'Növekvő exponenciális', color: 'emerald' },
      { id: 'other', name: 'Nem exponenciális', color: 'slate' }
    ],
    items: items('hlfs1-', [
      ['f(t) = 340 · (1/2)ᵗ', 'decay'],
      ['m(t) = 500 · 0,83ᵗ', 'decay'],
      ['h(t) = 54 · 2^(−5t)', 'decay'],
      ['p(t) = 3 · 2ᵗ', 'growth'],
      ['A(t) = 1,5 · 1,51ᵗ', 'growth'],
      ['K(t) = 10 · 1,05ᵗ', 'growth'],
      ['s(t) = 5t + 2', 'other'],
      ['v(t) = 100 − 3t', 'other'],
      ['q(t) = t²', 'other']
    ])
  },
  {
    level: 2,
    title: '2. szint: Mekkora a felezési idő?',
    description: 'Sorold be a folyamatokat a felezési idejük szerint (t órában)!',
    categories: [
      { id: 'short', name: 'T < 1 óra', color: 'rose' },
      { id: 'mid', name: '1 óra ≤ T ≤ 5 óra', color: 'amber' },
      { id: 'long', name: 'T > 5 óra', color: 'sky' }
    ],
    items: items('hlfs2-', [
      ['h(t) = 54 · 2^(−5t)', 'short'],
      ['k(t) = 100 · 0,25ᵗ', 'short'],
      ['u(t) = 20 · 0,1ᵗ', 'short'],
      ['f(t) = 340 · (1/2)ᵗ', 'mid'],
      ['g(t) = 2,4 · (1/2)^(t/3)', 'mid'],
      ['m(t) = 500 · 0,83ᵗ', 'mid'],
      ['M(t) = 58 · 0,9ᵗ', 'long'],
      ['M(t) = 28,9 · 2^(−t/8)', 'long'],
      ['w(t) = 5 · 0,95ᵗ', 'long']
    ])
  },
  {
    level: 3,
    title: '3. szint: Mennyi marad meg?',
    description: 'Becsüld meg, a kezdeti mennyiség hány százaléka marad meg!',
    categories: [
      { id: 'over50', name: 'Több mint 50%', color: 'emerald' },
      { id: 'between', name: '10% és 50% között', color: 'amber' },
      { id: 'under10', name: 'Kevesebb mint 10%', color: 'rose' }
    ],
    items: items('hlfs3-', [
      ['Cézium-137 (T = 30 év), 4 év után', 'over50'],
      ['Lázcsillapító (0,83ᵗ), 2 óra után', 'over50'],
      ['Bármely izotóp, fél felezési idő után', 'over50'],
      ['Lázcsillapító (0,83ᵗ), 7 óra után', 'between'],
      ['T = 10 nap, 25 nap után', 'between'],
      ['Szén-14, 11 460 év után', 'between'],
      ['Szén-14, 22 920 év után', 'under10'],
      ['Lázcsillapító (0,83ᵗ), 25 óra után', 'under10'],
      ['Jód-131 (T = 8 nap), 4 év után', 'under10']
    ])
  }
];

const HALF_LIFE_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: HALF_LIFE_SORTER_LEVELS_LIST[0],
  2: HALF_LIFE_SORTER_LEVELS_LIST[1],
  3: HALF_LIFE_SORTER_LEVELS_LIST[2]
};

export const HalfLifeSorter: React.FC<HalfLifeSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-exp-felezesi-ido-sorter',
  topicTitle = '9. Felezési idő – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="hatvany-gyok-logaritmus"
      topicId={topicId}
      subtopicId="felezesi-ido"
      title={topicTitle}
      subtitle="Rendszerezd a folyamatokat: van-e felezési idejük, mekkora, és mennyi marad meg a mennyiségből!"
      levels={HALF_LIFE_SORTER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onComplete={onComplete}
      {...rest}
    />
  );
};

export default HalfLifeSorter;

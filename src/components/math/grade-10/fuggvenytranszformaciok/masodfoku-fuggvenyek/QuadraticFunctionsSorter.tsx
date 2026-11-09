import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface QuadraticFunctionsSorterProps {
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
    title: 'A megadás alakja: Általános vagy Kanonikus',
    subtitle: 'Válogasd szét a másodfokú függvényeket az algebrai alakjuk típusa szerint!',
    categories: [
      {
        id: 'cat-canonical',
        name: 'Kanonikus alak (a(x - u)² + v)',
        description: 'Teljes négyzetet tartalmaz, a csúcspont közvetlenül leolvasható',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-polynomial',
        name: 'Általános alak (ax² + bx + c)',
        description: 'Polinom forma, a konstans tag az y-metszet',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      { id: 'qfs1-1', content: 'f(x) = 2(x - 3)² + 4', categoryId: 'cat-canonical' },
      { id: 'qfs1-2', content: 'f(x) = x² - 6x + 8', categoryId: 'cat-polynomial' },
      { id: 'qfs1-3', content: 'f(x) = -(x + 5)² - 1', categoryId: 'cat-canonical' },
      { id: 'qfs1-4', content: 'f(x) = 3x² + 12x - 5', categoryId: 'cat-polynomial' },
      { id: 'qfs1-5', content: 'f(x) = 0,5(x - 1)² + 2', categoryId: 'cat-canonical' },
      { id: 'qfs1-6', content: 'f(x) = -2x² + 4x + 1', categoryId: 'cat-polynomial' },
      { id: 'qfs1-7', content: 'f(x) = (x + 2)²', categoryId: 'cat-canonical' },
      { id: 'qfs1-8', content: 'f(x) = x² + 10x + 25', categoryId: 'cat-polynomial' },
      { id: 'qfs1-9', content: 'f(x) = -3(x - 4)² + 7', categoryId: 'cat-canonical' },
      { id: 'qfs1-10', content: 'f(x) = -x² + 6x', categoryId: 'cat-polynomial' }
    ]
  },
  2: {
    title: 'A csúcspont x-koordinátája (u = -b/(2a))',
    subtitle: 'Állapítsd meg a csúcspont helyzetét az x-tengely mentén!',
    categories: [
      {
        id: 'cat-right',
        name: 'Jobbra esik (u > 0)',
        description: 'A szimmetriatengely a pozitív x-tartományban van',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-axis',
        name: 'Az y-tengelyen van (u = 0)',
        description: 'Nincs elsőfokú tag (b = 0), a parabola szimmetrikus az y-tengelyre',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-left',
        name: 'Balra esik (u < 0)',
        description: 'A szimmetriatengely a negatív x-tartományban van',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      { id: 'qfs2-1', content: 'f(x) = x² - 6x + 5', categoryId: 'cat-right' },
      { id: 'qfs2-2', content: 'f(x) = x² + 8x + 10', categoryId: 'cat-left' },
      { id: 'qfs2-3', content: 'f(x) = x² - 4', categoryId: 'cat-axis' },
      { id: 'qfs2-4', content: 'f(x) = -x² + 4x - 1', categoryId: 'cat-right' },
      { id: 'qfs2-5', content: 'f(x) = -x² - 10x + 2', categoryId: 'cat-left' },
      { id: 'qfs2-6', content: 'f(x) = 3x² + 5', categoryId: 'cat-axis' },
      { id: 'qfs2-7', content: 'f(x) = 2x² - 8x + 3', categoryId: 'cat-right' },
      { id: 'qfs2-8', content: 'f(x) = 2x² + 12x + 7', categoryId: 'cat-left' },
      { id: 'qfs2-9', content: 'f(x) = -0,5x² - 6', categoryId: 'cat-axis' },
      { id: 'qfs2-10', content: 'f(x) = (x - 7)² + 1', categoryId: 'cat-right' }
    ]
  },
  3: {
    title: 'Szélsőérték típusa (Főegyüttható előjele)',
    subtitle: 'Válogasd szét a függvényeket aszerint, hogy minimumuk vagy maximumuk van!',
    categories: [
      {
        id: 'cat-min',
        name: 'Globális minimuma van (a > 0)',
        description: 'Felfelé nyíló parabola, csúcsban a legkisebb érték',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-max',
        name: 'Globális maximuma van (a < 0)',
        description: 'Lefelé nyíló parabola, csúcsban a legnagyobb érték',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 'qfs3-1', content: 'f(x) = x² - 4x + 3', categoryId: 'cat-min' },
      { id: 'qfs3-2', content: 'f(x) = -x² + 6x - 2', categoryId: 'cat-max' },
      { id: 'qfs3-3', content: 'f(x) = 3x² + 12x + 1', categoryId: 'cat-min' },
      { id: 'qfs3-4', content: 'f(x) = -2x² - 8x + 5', categoryId: 'cat-max' },
      { id: 'qfs3-5', content: 'f(x) = 0,5x² - 3x + 4', categoryId: 'cat-min' },
      { id: 'qfs3-6', content: 'f(x) = -0,2x² + x - 3', categoryId: 'cat-max' },
      { id: 'qfs3-7', content: 'f(x) = 5(x - 2)² - 1', categoryId: 'cat-min' },
      { id: 'qfs3-8', content: 'f(x) = -4(x + 1)² + 6', categoryId: 'cat-max' },
      { id: 'qfs3-9', content: 'f(x) = 10x² - 20x', categoryId: 'cat-min' },
      { id: 'qfs3-10', content: 'f(x) = -x² - 9', categoryId: 'cat-max' }
    ]
  }
};

export const QuadraticFunctionsSorter: React.FC<QuadraticFunctionsSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g10-fuggvenytranszformaciok',
  topicTitle = 'Másodfokú függvények'
}) => {
  const activeLevel = currentLevel || level;

  return (
    <SorterTemplate
      level={activeLevel}
      currentLevel={activeLevel}
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


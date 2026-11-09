import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PracticeTestSorterProps {
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
    title: 'A transzformáció típusa',
    subtitle: 'Válogasd szét a függvényeket aszerint, hogy milyen eltolások történtek az alapfüggvényhez képest!',
    categories: [
      {
        id: 'vertical-only',
        name: 'Csak függőleges eltolás (u = 0)',
        color: 'emerald',
        description: 'A grafikon csak az y-tengely mentén mozdult el (fel vagy le)'
      },
      {
        id: 'horizontal-only',
        name: 'Csak vízszintes eltolás (v = 0)',
        color: 'indigo',
        description: 'A grafikon csak az x-tengely mentén mozdult el (jobbra vagy balra)'
      },
      {
        id: 'composite-shift',
        name: 'Összetett eltolás (mindkettő)',
        color: 'purple',
        description: 'Vízszintes és függőleges irányú elmozdulás is történt'
      }
    ],
    items: [
      { id: 'pts1-1', text: 'f(x) = x² + 5', categoryId: 'vertical-only' },
      { id: 'pts1-2', text: 'f(x) = |x| - 4', categoryId: 'vertical-only' },
      { id: 'pts1-3', text: 'f(x) = -x² + 3', categoryId: 'vertical-only' },
      { id: 'pts1-4', text: 'f(x) = 2x² - 7', categoryId: 'vertical-only' },

      { id: 'pts1-5', text: 'f(x) = (x - 4)²', categoryId: 'horizontal-only' },
      { id: 'pts1-6', text: 'f(x) = |x + 6|', categoryId: 'horizontal-only' },
      { id: 'pts1-7', text: 'f(x) = -(x + 1)²', categoryId: 'horizontal-only' },
      { id: 'pts1-8', text: 'f(x) = √(x - 3)', categoryId: 'horizontal-only' },

      { id: 'pts1-9', text: 'f(x) = (x - 2)² + 3', categoryId: 'composite-shift' },
      { id: 'pts1-10', text: 'f(x) = |x + 3| - 2', categoryId: 'composite-shift' },
      { id: 'pts1-11', text: 'f(x) = -2(x - 1)² + 5', categoryId: 'composite-shift' },
      { id: 'pts1-12', text: 'f(x) = 0.5(x + 4)² - 1', categoryId: 'composite-shift' }
    ]
  },
  2: {
    title: 'Szélsőérték jellege',
    subtitle: 'Csoportosítsd a függvényeket aszerint, hogy minimumuk, maximumuk van, vagy sehol sincs szélsőértékük!',
    categories: [
      {
        id: 'has-min',
        name: 'Minimuma van (felfelé nyílik)',
        color: 'emerald',
        description: 'Völgy jellegű görbe, legkisebb értéke van'
      },
      {
        id: 'has-max',
        name: 'Maximuma van (lefelé nyílik)',
        color: 'rose',
        description: 'Hegy jellegű görbe, legnagyobb értéke van'
      },
      {
        id: 'no-extrema',
        name: 'Nincs szélsőértéke (monoton)',
        color: 'blue',
        description: 'Lineáris vagy hiperbolikus függvény, szigorúan monoton'
      }
    ],
    items: [
      { id: 'pts2-1', text: 'f(x) = (x - 5)² + 1', categoryId: 'has-min' },
      { id: 'pts2-2', text: 'f(x) = |x - 2| - 3', categoryId: 'has-min' },
      { id: 'pts2-3', text: 'f(x) = 2x² - 8x', categoryId: 'has-min' },
      { id: 'pts2-4', text: 'f(x) = x² + 4', categoryId: 'has-min' },

      { id: 'pts2-5', text: 'f(x) = -(x + 3)² + 4', categoryId: 'has-max' },
      { id: 'pts2-6', text: 'f(x) = -|x + 1| + 2', categoryId: 'has-max' },
      { id: 'pts2-7', text: 'f(x) = -0.5(x - 4)²', categoryId: 'has-max' },
      { id: 'pts2-8', text: 'f(x) = -x² + 6x', categoryId: 'has-max' },

      { id: 'pts2-9', text: 'f(x) = 3x - 5', categoryId: 'no-extrema' },
      { id: 'pts2-10', text: 'f(x) = -2x + 4', categoryId: 'no-extrema' },
      { id: 'pts2-11', text: 'f(x) = 1 / x', categoryId: 'no-extrema' },
      { id: 'pts2-12', text: 'f(x) = 0.5x + 1', categoryId: 'no-extrema' }
    ]
  },
  3: {
    title: 'A grafikon szimmetriája',
    subtitle: 'Válogasd szét a függvényeket a geometriai szimmetriájuk típusa szerint!',
    categories: [
      {
        id: 'even-symmetry',
        name: 'Páros (y-tengelyre szimmetrikus)',
        color: 'purple',
        description: 'u = 0, a szimmetriatengely maga a függőleges y-tengely'
      },
      {
        id: 'shifted-symmetry',
        name: 'Eltolt szimmetriatengely (x = u)',
        color: 'indigo',
        description: 'Tengelyesen szimmetrikus, de a tengely el van tolva (u ≠ 0)'
      },
      {
        id: 'no-line-sym',
        name: 'Nem tengelyesen szimmetrikus',
        color: 'amber',
        description: 'Gyökfüggvény, egyenes vagy hiperbola'
      }
    ],
    items: [
      { id: 'pts3-1', text: 'f(x) = x² - 3', categoryId: 'even-symmetry' },
      { id: 'pts3-2', text: 'f(x) = |x| + 2', categoryId: 'even-symmetry' },
      { id: 'pts3-3', text: 'f(x) = -2x² + 5', categoryId: 'even-symmetry' },
      { id: 'pts3-4', text: 'f(x) = 0.5x²', categoryId: 'even-symmetry' },

      { id: 'pts3-5', text: 'f(x) = (x - 2)² + 1', categoryId: 'shifted-symmetry' },
      { id: 'pts3-6', text: 'f(x) = |x + 3| - 4', categoryId: 'shifted-symmetry' },
      { id: 'pts3-7', text: 'f(x) = -(x - 5)²', categoryId: 'shifted-symmetry' },
      { id: 'pts3-8', text: 'f(x) = x² - 6x', categoryId: 'shifted-symmetry' },

      { id: 'pts3-9', text: 'f(x) = √x', categoryId: 'no-line-sym' },
      { id: 'pts3-10', text: 'f(x) = 2x + 1', categoryId: 'no-line-sym' },
      { id: 'pts3-11', text: 'f(x) = 1 / x', categoryId: 'no-line-sym' },
      { id: 'pts3-12', text: 'f(x) = √(x - 2) + 3', categoryId: 'no-line-sym' }
    ]
  }
};

export const PracticeTestSorter: React.FC<PracticeTestSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g10-transz-tudasproba-sorter',
  topicTitle = 'Gyakorlás, tudáspróba - Csoportosító'
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


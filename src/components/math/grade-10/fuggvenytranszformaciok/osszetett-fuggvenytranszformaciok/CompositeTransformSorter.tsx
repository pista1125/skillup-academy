import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CompositeTransformSorterProps {
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
    title: 'Szélsőérték jellege az összetett alakból',
    subtitle: 'Döntsd el a hozzárendelési szabály alapján, hogy a függvénynek minimuma vagy maximuma van!',
    categories: [
      {
        id: 'cat-min',
        name: 'Globális minimuma van (a > 0)',
        description: 'Felfelé nyíló U vagy V alak, csúcsban a legkisebb érték',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-max',
        name: 'Globális maximuma van (a < 0)',
        description: 'Lefelé nyíló görbe, csúcsban a legnagyobb érték',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 'cts1-1', content: 'f(x) = (x + 3)² - 2', categoryId: 'cat-min' },
      { id: 'cts1-2', content: 'f(x) = -(x + 3)²', categoryId: 'cat-max' },
      { id: 'cts1-3', content: 'f(x) = -2(x - 3)² + 5', categoryId: 'cat-max' },
      { id: 'cts1-4', content: 'f(x) = |x + 3| - 8', categoryId: 'cat-min' },
      { id: 'cts1-5', content: 'f(x) = -|x + 3| + 4', categoryId: 'cat-max' },
      { id: 'cts1-6', content: 'f(x) = 0,5(x - 1)² + 3', categoryId: 'cat-min' },
      { id: 'cts1-7', content: 'f(x) = -(x - 2)² + 1', categoryId: 'cat-max' },
      { id: 'cts1-8', content: 'f(x) = 2|x - 4| - 1', categoryId: 'cat-min' },
      { id: 'cts1-9', content: 'f(x) = -3|x + 5|', categoryId: 'cat-max' },
      { id: 'cts1-10', content: 'f(x) = 3(x + 2)² - 6', categoryId: 'cat-min' }
    ]
  },
  2: {
    title: 'Zérushelyek száma szerinti besorolás',
    subtitle: 'Állapítsd meg a csúcspont és a szárak nyílása alapján, hogy hány zérushely van!',
    categories: [
      {
        id: 'cat-two-zeros',
        name: '2 zérushely (metszi az x-tengelyt)',
        description: 'A szárak átmetszik az x-tengelyt',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-one-zero',
        name: '1 zérushely (érinti az x-tengelyt)',
        description: 'A csúcspont pontosan az x-tengelyen fekszik (v = 0)',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-zero-zeros',
        name: '0 zérushely (nem éri el a tengelyt)',
        description: 'A teljes görbe az x-tengely egyik oldalán marad',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      { id: 'cts2-1', content: 'f(x) = (x - 2)² - 4', categoryId: 'cat-two-zeros' },
      { id: 'cts2-2', content: 'f(x) = -(x + 1)² + 9', categoryId: 'cat-two-zeros' },
      { id: 'cts2-3', content: 'f(x) = (x - 3)² + 2', categoryId: 'cat-zero-zeros' },
      { id: 'cts2-4', content: 'f(x) = -(x - 5)² - 1', categoryId: 'cat-zero-zeros' },
      { id: 'cts2-5', content: 'f(x) = 2(x + 4)²', categoryId: 'cat-one-zero' },
      { id: 'cts2-6', content: 'f(x) = -|x - 2|', categoryId: 'cat-one-zero' },
      { id: 'cts2-7', content: 'f(x) = |x - 1| - 3', categoryId: 'cat-two-zeros' },
      { id: 'cts2-8', content: 'f(x) = |x + 5| + 4', categoryId: 'cat-zero-zeros' },
      { id: 'cts2-9', content: 'f(x) = -2|x + 3| + 6', categoryId: 'cat-two-zeros' },
      { id: 'cts2-10', content: 'f(x) = -(x + 7)²', categoryId: 'cat-one-zero' }
    ]
  },
  3: {
    title: 'Grafikon formája és típusa',
    subtitle: 'Válogasd szét a függvényeket a geometriai grafikonjuk jellege szerint!',
    categories: [
      {
        id: 'cat-parabola',
        name: 'Parabola (U alakú sima görbe)',
        description: 'Másodfokú polinom, szimmetrikus ív',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-v-shape',
        name: 'V alakú egyenes ágak (töréspont)',
        description: 'Lineáris szakaszokból álló abszolútérték',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-w-shape',
        name: 'W alakú felhajtott grafikon',
        description: 'Külső abszolútérték felhajtásával keletkező hurok',
        badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300'
      }
    ],
    items: [
      { id: 'cts3-1', content: 'f(x) = 2(x - 3)² - 5', categoryId: 'cat-parabola' },
      { id: 'cts3-2', content: 'f(x) = |x - 2| + 3', categoryId: 'cat-v-shape' },
      { id: 'cts3-3', content: 'f(x) = |x² - 9|', categoryId: 'cat-w-shape' },
      { id: 'cts3-4', content: 'f(x) = -(x + 1)² + 4', categoryId: 'cat-parabola' },
      { id: 'cts3-5', content: 'f(x) = -2|x + 4| - 1', categoryId: 'cat-v-shape' },
      { id: 'cts3-6', content: 'f(x) = |x² - 1|', categoryId: 'cat-w-shape' },
      { id: 'cts3-7', content: 'f(x) = 0,5(x + 2)² + 1', categoryId: 'cat-parabola' },
      { id: 'cts3-8', content: 'f(x) = 3|x - 1| - 2', categoryId: 'cat-v-shape' },
      { id: 'cts3-9', content: 'f(x) = |(x - 3)² - 4|', categoryId: 'cat-w-shape' },
      { id: 'cts3-10', content: 'f(x) = |(x + 1)² - 1|', categoryId: 'cat-w-shape' }
    ]
  }
};

export const CompositeTransformSorter: React.FC<CompositeTransformSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g10-fuggvenytranszformaciok',
  topicTitle = 'Összetett függvénytranszformációk'
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


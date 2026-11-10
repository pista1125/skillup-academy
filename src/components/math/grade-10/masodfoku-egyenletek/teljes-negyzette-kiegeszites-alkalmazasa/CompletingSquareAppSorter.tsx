import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CompletingSquareAppSorterProps {
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
    title: 'Másodfokú kifejezések szélsőértékének jellege',
    subtitle: 'Válogasd szét a kifejezéseket a főegyüttható előjele (a > 0 vagy a < 0) és a szélsőérték típusa szerint!',
    categories: [
      {
        id: 'cat-min',
        name: 'Minimuma van (a > 0)',
        description: 'A parabola ágai felfelé nyílnak, a csúcspont a függvény legalacsonyabb pontja.',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-max',
        name: 'Maximuma van (a < 0)',
        description: 'A parabola lefelé nyílik, a negatív főegyüttható miatt a csúcspontban maximum van.',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 's1-1', content: 'f(x) = 2(x - 3)² + 5', categoryId: 'cat-min' },
      { id: 's1-2', content: 'g(x) = -(x + 1)² + 9', categoryId: 'cat-max' },
      { id: 's1-3', content: 'h(x) = 3x² - 12x + 7', categoryId: 'cat-min' },
      { id: 's1-4', content: 'k(x) = -2x² + 8x - 5', categoryId: 'cat-max' },
      { id: 's1-5', content: 'p(x) = ½(x + 4)² - 2', categoryId: 'cat-min' },
      { id: 's1-6', content: 'q(x) = -5(x - 2)² - 4', categoryId: 'cat-max' },
      { id: 's1-7', content: 'r(x) = 4x² + 16x', categoryId: 'cat-min' },
      { id: 's1-8', content: 's(x) = -x² + 6x - 1', categoryId: 'cat-max' },
      { id: 's1-9', content: 'm(x) = 7(x - 1)² + 11', categoryId: 'cat-min' },
      { id: 's1-10', content: 't(x) = -3(x + 5)² + 2', categoryId: 'cat-max' }
    ]
  },
  2: {
    title: 'Gyökök száma a(x + d)² = k egyenleteknél',
    subtitle: 'Állapítsd meg, hogy a főegyütthatóval való leosztás után hány valós megoldása van az egyenletnek!',
    categories: [
      {
        id: 'cat-two',
        name: '2 különböző valós gyök',
        description: 'A leosztás után a teljes négyzet pozitív számmal egyenlő.',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-one',
        name: '1 valós gyök (kettős gyök)',
        description: 'A teljes négyzet pontosan 0-val egyenlő, x = -d az egyetlen gyök.',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-none',
        name: '0 valós gyök (nincs megoldás)',
        description: 'A teljes négyzet negatív számmal lenne egyenlő, ami valós számoknál lehetetlen.',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 's2-1', content: '2(x - 1)² = 8', categoryId: 'cat-two' },
      { id: 's2-2', content: '3(x + 4)² = 0', categoryId: 'cat-one' },
      { id: 's2-3', content: '2(x - 1)² = -6', categoryId: 'cat-none' },
      { id: 's2-4', content: '-3(x + 2)² = -27', categoryId: 'cat-two' },
      { id: 's2-5', content: '-5(x - 7)² = 0', categoryId: 'cat-one' },
      { id: 's2-6', content: '-2(x + 3)² = 10', categoryId: 'cat-none' },
      { id: 's2-7', content: '4(x - 5)² = 36', categoryId: 'cat-two' },
      { id: 's2-8', content: '2x² + 12x + 18 = 0  [2(x + 3)² = 0]', categoryId: 'cat-one' },
      { id: 's2-9', content: '3x² + 6x + 15 = 0  [3(x + 1)² = -12]', categoryId: 'cat-none' },
      { id: 's2-10', content: '5(x + 1)² = 45', categoryId: 'cat-two' }
    ]
  },
  3: {
    title: 'Helyes kiemelés és átalakítás vs. Tipikus hiba',
    subtitle: 'Válogasd szét a lépéseket: helyesen vonta le a konstans kompenzációt és kezelte az előjelet, vagy hibázott?',
    categories: [
      {
        id: 'cat-valid',
        name: 'Helyes algebrai átalakítás',
        description: 'A főegyüttható kiemelése, a levont d² visszaszorzása és az előjelek mind pontosak.',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-invalid',
        name: 'Hibás átalakítás (Tipikus hiba)',
        description: 'Visszaszorzatlan d², elrontott zárójeles előjel vagy téves konstans összevonás.',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 's3-1', content: '2x² + 8x + 5 = 2(x + 2)² - 3', categoryId: 'cat-valid' },
      { id: 's3-2', content: '2x² + 8x + 5 = 2(x + 2)² - 4', categoryId: 'cat-invalid' },
      { id: 's3-3', content: '-x² + 6x - 2 = -(x - 3)² + 7', categoryId: 'cat-valid' },
      { id: 's3-4', content: '-x² + 6x - 2 = -(x + 3)² + 7', categoryId: 'cat-invalid' },
      { id: 's3-5', content: '3x² - 12x + 10 = 3(x - 2)² - 2', categoryId: 'cat-valid' },
      { id: 's3-6', content: '3x² - 12x + 10 = 3(x - 2)² + 6', categoryId: 'cat-invalid' },
      { id: 's3-7', content: '-2x² - 4x + 1 = -2(x + 1)² + 3', categoryId: 'cat-valid' },
      { id: 's3-8', content: '-2x² - 4x + 1 = -2(x + 1)² - 1', categoryId: 'cat-invalid' },
      { id: 's3-9', content: 'x² + 3x = (x + 3/2)² - 9/4', categoryId: 'cat-valid' },
      { id: 's3-10', content: 'x² + 3x = (x + 3/2)² - 3/4', categoryId: 'cat-invalid' }
    ]
  }
};

export const CompletingSquareAppSorter: React.FC<CompletingSquareAppSorterProps> = ({
  level,
  currentLevel = 1,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'teljes-negyzette-kiegeszites-alkalmazasa',
  topicTitle = 'Teljes négyzetté kiegészítés alkalmazása'
}) => {
  const activeLevel = level || currentLevel;

  return (
    <SorterTemplate
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
      levelConfigs={sorterLevels}
    />
  );
};

export default CompletingSquareAppSorter;


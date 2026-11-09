import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ShiftTransformSorterProps {
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
    title: 'Eltolás iránya az alapfüggvényhez képest',
    subtitle: 'Válogasd szét a függvényeket az eltolás geometriai iránya szerint!',
    categories: [
      {
        id: 'cat-vert-only',
        name: 'Csak függőleges eltolás',
        description: 'Csak az y-tengely mentén mozdul el (f(x) ± c)',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-horiz-only',
        name: 'Csak vízszintes eltolás',
        description: 'Csak az x-tengely mentén mozdul el (f(x ∓ u))',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-both-dirs',
        name: 'Mindkét tengely mentén eltolt',
        description: 'Vízszintes és függőleges elmozdulás is van (f(x ∓ u) ± c)',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      { id: 'sts1-1', content: 'f(x) = |x| + 5', categoryId: 'cat-vert-only' },
      { id: 'sts1-2', content: 'f(x) = √(x - 3)', categoryId: 'cat-horiz-only' },
      { id: 'sts1-3', content: 'f(x) = (x + 2)² - 4', categoryId: 'cat-both-dirs' },
      { id: 'sts1-4', content: 'f(x) = 1/x - 7', categoryId: 'cat-vert-only' },
      { id: 'sts1-5', content: 'f(x) = |x + 6|', categoryId: 'cat-horiz-only' },
      { id: 'sts1-6', content: 'f(x) = √(x - 1) + 2', categoryId: 'cat-both-dirs' },
      { id: 'sts1-7', content: 'f(x) = x² - 9', categoryId: 'cat-vert-only' },
      { id: 'sts1-8', content: 'f(x) = (x - 8)²', categoryId: 'cat-horiz-only' },
      { id: 'sts1-9', content: 'f(x) = |x - 4| + 3', categoryId: 'cat-both-dirs' },
      { id: 'sts1-10', content: 'f(x) = 1/(x + 5)', categoryId: 'cat-horiz-only' },
      { id: 'sts1-11', content: 'f(x) = 1/(x - 2) + 6', categoryId: 'cat-both-dirs' },
      { id: 'sts1-12', content: 'f(x) = √x - 10', categoryId: 'cat-vert-only' }
    ]
  },
  2: {
    title: 'Értelmezési tartomány (Df) szerinti besorolás',
    subtitle: 'Csoportosítsd a transzformált függvényeket az értelmezési tartományuk típusa alapján!',
    categories: [
      {
        id: 'cat-all-reals',
        name: 'Df = ℝ (minden valós szám)',
        description: 'Tetszőleges valós szám behelyettesíthető',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-ray',
        name: 'Df = [a; ∞[ (félegyenes)',
        description: 'Gyökjel alatti kifejezés nemnegatív: x - a ≥ 0',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-punctured',
        name: 'Df = ℝ \\ {a} (egy pont kizárva)',
        description: 'Tört nevezője nem lehet nulla: x - a ≠ 0',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 'sts2-1', content: 'f(x) = (x - 3)² + 2', categoryId: 'cat-all-reals' },
      { id: 'sts2-2', content: 'f(x) = √(x - 4) + 1', categoryId: 'cat-ray' },
      { id: 'sts2-3', content: 'f(x) = 1/(x - 2) - 3', categoryId: 'cat-punctured' },
      { id: 'sts2-4', content: 'f(x) = |x + 7| - 5', categoryId: 'cat-all-reals' },
      { id: 'sts2-5', content: 'f(x) = √(x + 5) - 2', categoryId: 'cat-ray' },
      { id: 'sts2-6', content: 'f(x) = 1/(x + 6) + 4', categoryId: 'cat-punctured' },
      { id: 'sts2-7', content: 'f(x) = x² + 10', categoryId: 'cat-all-reals' },
      { id: 'sts2-8', content: 'f(x) = √x + 8', categoryId: 'cat-ray' },
      { id: 'sts2-9', content: 'f(x) = 1/x - 9', categoryId: 'cat-punctured' },
      { id: 'sts2-10', content: 'f(x) = |x - 8|', categoryId: 'cat-all-reals' }
    ]
  },
  3: {
    title: 'A beavatkozás helye: Kívül, Belül vagy Mindkettő',
    subtitle: 'Válogasd szét a képleteket a transzformációs konstansok elhelyezkedése szerint!',
    categories: [
      {
        id: 'cat-outside-only',
        name: 'Csak külső tag (f(x) ± c)',
        description: 'A konstans a függvény jelén kívül áll (függőleges)',
        badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300'
      },
      {
        id: 'cat-inside-only',
        name: 'Csak belső tag (f(x ∓ u))',
        description: 'A konstans közvetlenül az x mellett áll (vízszintes)',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-both-terms',
        name: 'Külső és belső tag is van',
        description: 'Zárójelen/gyökön belül és kívül is van konstans',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      { id: 'sts3-1', content: 'f(x) = √x + 7', categoryId: 'cat-outside-only' },
      { id: 'sts3-2', content: 'f(x) = √(x + 7)', categoryId: 'cat-inside-only' },
      { id: 'sts3-3', content: 'f(x) = √(x + 7) - 2', categoryId: 'cat-both-terms' },
      { id: 'sts3-4', content: 'f(x) = |x| - 4', categoryId: 'cat-outside-only' },
      { id: 'sts3-5', content: 'f(x) = |x - 4|', categoryId: 'cat-inside-only' },
      { id: 'sts3-6', content: 'f(x) = |x - 4| + 5', categoryId: 'cat-both-terms' },
      { id: 'sts3-7', content: 'f(x) = x² + 12', categoryId: 'cat-outside-only' },
      { id: 'sts3-8', content: 'f(x) = (x - 6)²', categoryId: 'cat-inside-only' },
      { id: 'sts3-9', content: 'f(x) = (x + 3)² - 8', categoryId: 'cat-both-terms' },
      { id: 'sts3-10', content: 'f(x) = 1/x + 3', categoryId: 'cat-outside-only' }
    ]
  }
};

export const ShiftTransformSorter: React.FC<ShiftTransformSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g10-fuggvenytranszformaciok',
  topicTitle = '„Fel”-, „le”, „jobbra”-, „balra”'
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


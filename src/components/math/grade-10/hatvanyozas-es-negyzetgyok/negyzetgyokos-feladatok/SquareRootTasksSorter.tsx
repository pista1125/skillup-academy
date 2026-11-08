import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SquareRootTasksSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  allLevels?: boolean;
}

const levels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: 'Gyök alatti maradék kiemelés után',
    subtitle: 'Csoportosítsd a kifejezéseket aszerint, hogy milyen prímszám marad a gyökjel alatt a maximális kiemelés után!',
    categories: [
      {
        id: 'cat-root2',
        name: '√2 marad a gyök alatt (...√2)',
        description: 'Páros négyzetszorzatok: 2-es maradékkal',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-300'
      },
      {
        id: 'cat-root3',
        name: '√3 marad a gyök alatt (...√3)',
        description: '3-as szorzót tartalmazó kifejezések',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300 dark:bg-teal-950 dark:text-teal-300'
      },
      {
        id: 'cat-root5',
        name: '√5 marad a gyök alatt (...√5)',
        description: '5-ös szorzót tartalmazó kifejezések',
        badgeColor: 'bg-sky-100 text-sky-900 border-sky-300 dark:bg-sky-950 dark:text-sky-300'
      }
    ],
    items: [
      { id: 'srs1-1', text: '√8', categoryId: 'cat-root2' },
      { id: 'srs1-2', text: '√18', categoryId: 'cat-root2' },
      { id: 'srs1-3', text: '√32', categoryId: 'cat-root2' },
      { id: 'srs1-4', text: '√50', categoryId: 'cat-root2' },

      { id: 'srs1-5', text: '√12', categoryId: 'cat-root3' },
      { id: 'srs1-6', text: '√27', categoryId: 'cat-root3' },
      { id: 'srs1-7', text: '√48', categoryId: 'cat-root3' },
      { id: 'srs1-8', text: '√75', categoryId: 'cat-root3' },

      { id: 'srs1-9', text: '√20', categoryId: 'cat-root5' },
      { id: 'srs1-10', text: '√45', categoryId: 'cat-root5' },
      { id: 'srs1-11', text: '√80', categoryId: 'cat-root5' },
      { id: 'srs1-12', text: '√125', categoryId: 'cat-root5' }
    ]
  },
  2: {
    title: 'Kifejezések nagyságrendje az 5-höz képest',
    subtitle: 'Vidd be a szorzót a gyökjel alá (vagy emeld négyzetre), és hasonlítsd össze az 5-tel (√25-tel)!',
    categories: [
      {
        id: 'cat-less5',
        name: 'Kisebb mint 5 (< 5)',
        description: 'A gyök alatti érték kisebb mint 25',
        badgeColor: 'bg-sky-100 text-sky-900 border-sky-300 dark:bg-sky-950 dark:text-sky-300'
      },
      {
        id: 'cat-equal5',
        name: 'Pontosan 5 (= 5)',
        description: 'A kifejezés pontos értéke 5',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
      },
      {
        id: 'cat-greater5',
        name: 'Nagyobb mint 5 (> 5)',
        description: 'A gyök alatti érték nagyobb mint 25',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-300'
      }
    ],
    items: [
      { id: 'srs2-1', text: '√18', categoryId: 'cat-less5' },
      { id: 'srs2-2', text: '2√5', categoryId: 'cat-less5' },
      { id: 'srs2-3', text: '3√2', categoryId: 'cat-less5' },
      { id: 'srs2-4', text: '√24', categoryId: 'cat-less5' },

      { id: 'srs2-5', text: '√25', categoryId: 'cat-equal5' },
      { id: 'srs2-6', text: '√50 / √2', categoryId: 'cat-equal5' },
      { id: 'srs2-7', text: '√75 / √3', categoryId: 'cat-equal5' },
      { id: 'srs2-8', text: '√(9 + 16)', categoryId: 'cat-equal5' },

      { id: 'srs2-9', text: '3√3', categoryId: 'cat-greater5' },
      { id: 'srs2-10', text: '4√2', categoryId: 'cat-greater5' },
      { id: 'srs2-11', text: '2√7', categoryId: 'cat-greater5' },
      { id: 'srs2-12', text: '√26', categoryId: 'cat-greater5' }
    ]
  },
  3: {
    title: 'Kifejezés értéke: Racionális vagy irracionális?',
    subtitle: 'Végezd el a műveleteket, és döntsd el, hogy az eredmény felírható-e két egész szám hányadosaként!',
    categories: [
      {
        id: 'cat-rational',
        name: 'Racionális szám (egész vagy véges tört)',
        description: 'A gyökök kiejtik egymást vagy négyzetszám keletkezik',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
      },
      {
        id: 'cat-irrational',
        name: 'Irracionális szám (gyökös maradék)',
        description: 'A gyökjel nem tüntethető el a kifejezésből',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-300'
      },
      {
        id: 'cat-not-real',
        name: 'Nem értelmezett valós számként',
        description: 'Negatív szám van páros gyök alatt',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950 dark:text-rose-300'
      }
    ],
    items: [
      { id: 'srs3-1', text: '(√5 + 1)(√5 - 1)', categoryId: 'cat-rational' },
      { id: 'srs3-2', text: '√2 · √8', categoryId: 'cat-rational' },
      { id: 'srs3-3', text: '(2√3)²', categoryId: 'cat-rational' },
      { id: 'srs3-4', text: '√75 / √3', categoryId: 'cat-rational' },

      { id: 'srs3-5', text: '1 / √2', categoryId: 'cat-irrational' },
      { id: 'srs3-6', text: '√8 + √18', categoryId: 'cat-irrational' },
      { id: 'srs3-7', text: '6 / √3', categoryId: 'cat-irrational' },
      { id: 'srs3-8', text: '(√3 + 1)²', categoryId: 'cat-irrational' },

      { id: 'srs3-9', text: '√(-25)', categoryId: 'cat-not-real' },
      { id: 'srs3-10', text: '√(-4) · √(-9)', categoryId: 'cat-not-real' },
      { id: 'srs3-11', text: '√(-36)', categoryId: 'cat-not-real' },
      { id: 'srs3-12', text: '√(2 - 8)', categoryId: 'cat-not-real' }
    ]
  }
};

export const SquareRootTasksSorter: React.FC<SquareRootTasksSorterProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  allLevels = true
}) => {
  return (
    <SorterTemplate
      title="Négyzetgyökös feladatok csoportosító"
      subtitle="Kiemelés, összehasonlítás és számhalmazok besorolása"
      themeColor="amber"
      levels={levels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      allLevels={allLevels}
    />
  );
};

export default SquareRootTasksSorter;


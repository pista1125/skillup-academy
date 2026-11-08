import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SummarySorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  allLevels?: boolean;
}

const levels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: 'Számértékek nagyságrendi besorolása',
    subtitle: 'Határozd meg a kifejezések előjelét és nagyságát a 0-hoz és az 1-hez viszonyítva!',
    categories: [
      {
        id: 'cat-neg',
        name: 'Negatív szám (< 0)',
        description: 'Negatív valós értéket adó kifejezések',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950 dark:text-rose-300'
      },
      {
        id: 'cat-between01',
        name: '0 és 1 közötti pozitív tört (0 < x < 1)',
        description: 'Negatív kitevőjű vagy valódi törtek',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-300'
      },
      {
        id: 'cat-greater1',
        name: '1-nél szigorúan nagyobb szám (> 1)',
        description: 'Pozitív egész vagy 1-nél nagyobb értékek',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
      }
    ],
    items: [
      { id: 'sum-s1-1', text: '-3²', categoryId: 'cat-neg' },
      { id: 'sum-s1-2', text: '(-2)³', categoryId: 'cat-neg' },
      { id: 'sum-s1-3', text: '-10⁻²', categoryId: 'cat-neg' },
      { id: 'sum-s1-4', text: '-5⁰', categoryId: 'cat-neg' },

      { id: 'sum-s1-5', text: '2⁻³', categoryId: 'cat-between01' },
      { id: 'sum-s1-6', text: '10⁻⁴', categoryId: 'cat-between01' },
      { id: 'sum-s1-7', text: '(1/2)²', categoryId: 'cat-between01' },
      { id: 'sum-s1-8', text: '0,25', categoryId: 'cat-between01' },

      { id: 'sum-s1-9', text: '(-3)²', categoryId: 'cat-greater1' },
      { id: 'sum-s1-10', text: '2⁴', categoryId: 'cat-greater1' },
      { id: 'sum-s1-11', text: '3⁰ + 1', categoryId: 'cat-greater1' },
      { id: 'sum-s1-12', text: '√16', categoryId: 'cat-greater1' }
    ]
  },
  2: {
    title: 'Matematikai értelmezhetőség és alapfeltételek',
    subtitle: 'Döntsd el a kifejezésről, hogy értelmezett valós számot ad-e vagy tiltott műveletet tartalmaz!',
    categories: [
      {
        id: 'cat-pos-real',
        name: 'Értelmezett pozitív valós szám',
        description: 'Matematikailag helyes, pozitív eredmény',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
      },
      {
        id: 'cat-zero',
        name: 'Értelmezett pontosan nulla (= 0)',
        description: 'Nulla hatványa vagy önmagából kivont érték',
        badgeColor: 'bg-sky-100 text-sky-900 border-sky-300 dark:bg-sky-950 dark:text-sky-300'
      },
      {
        id: 'cat-invalid',
        name: 'Nem értelmezett (tiltott művelet)',
        description: 'Nullával való osztás, 0⁰ vagy negatív szám gyöke',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950 dark:text-rose-300'
      }
    ],
    items: [
      { id: 'sum-s2-1', text: '√64', categoryId: 'cat-pos-real' },
      { id: 'sum-s2-2', text: '√((-7)²)', categoryId: 'cat-pos-real' },
      { id: 'sum-s2-3', text: '5⁻²', categoryId: 'cat-pos-real' },
      { id: 'sum-s2-4', text: '10⁰', categoryId: 'cat-pos-real' },

      { id: 'sum-s2-5', text: '√0', categoryId: 'cat-zero' },
      { id: 'sum-s2-6', text: '0⁴', categoryId: 'cat-zero' },
      { id: 'sum-s2-7', text: '5 - 5', categoryId: 'cat-zero' },
      { id: 'sum-s2-8', text: '√8 - 2√2', categoryId: 'cat-zero' },

      { id: 'sum-s2-9', text: '0⁻³', categoryId: 'cat-invalid' },
      { id: 'sum-s2-10', text: '0⁰', categoryId: 'cat-invalid' },
      { id: 'sum-s2-11', text: '√(-16)', categoryId: 'cat-invalid' },
      { id: 'sum-s2-12', text: '1 / 0', categoryId: 'cat-invalid' }
    ]
  },
  3: {
    title: 'Számhalmazok besorolása a fejezetből',
    subtitle: 'Végezd el a műveletet, és sorold be a végeredményt a megfelelő számhalmazba!',
    categories: [
      {
        id: 'cat-rational',
        name: 'Racionális nem egész szám (tört)',
        description: 'Véges vagy végtelen szakaszos tört',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-300'
      },
      {
        id: 'cat-irrational',
        name: 'Irracionális szám (nem tüntethető el a gyök)',
        description: 'Végtelen, nem szakaszos tizedestört',
        badgeColor: 'bg-sky-100 text-sky-900 border-sky-300 dark:bg-sky-950 dark:text-sky-300'
      },
      {
        id: 'cat-integer',
        name: 'Egész szám (ℤ)',
        description: 'Pontos egész érték',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
      }
    ],
    items: [
      { id: 'sum-s3-1', text: '2⁻⁴', categoryId: 'cat-rational' },
      { id: 'sum-s3-2', text: '10⁻²', categoryId: 'cat-rational' },
      { id: 'sum-s3-3', text: '√(1/4)', categoryId: 'cat-rational' },
      { id: 'sum-s3-4', text: '3 / 4', categoryId: 'cat-rational' },

      { id: 'sum-s3-5', text: '√2', categoryId: 'cat-irrational' },
      { id: 'sum-s3-6', text: '√18', categoryId: 'cat-irrational' },
      { id: 'sum-s3-7', text: '(√3 + 1)²', categoryId: 'cat-irrational' },
      { id: 'sum-s3-8', text: '1 / √3', categoryId: 'cat-irrational' },

      { id: 'sum-s3-9', text: '(√5 + 1)(√5 - 1)', categoryId: 'cat-integer' },
      { id: 'sum-s3-10', text: '√2 · √8', categoryId: 'cat-integer' },
      { id: 'sum-s3-11', text: '(-4)²', categoryId: 'cat-integer' },
      { id: 'sum-s3-12', text: '√50 / √2', categoryId: 'cat-integer' }
    ]
  }
};

export const SummarySorter: React.FC<SummarySorterProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  allLevels = true
}) => {
  return (
    <SorterTemplate
      title="Hatvány és gyök fejezeti csoportosító"
      subtitle="Értéktartományok, értelmezhetőség és számhalmazok átfogó vizsgálata"
      themeColor="rose"
      levels={levels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      allLevels={allLevels}
    />
  );
};

export default SummarySorter;


import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  IntersectionVennSvg,
  UnionVennSvg,
  DifferenceVennSvg,
  ComplementVennSvg,
  DisjointVennSvg,
  DeMorganUnionVennSvg,
  SubsetOperationsVennSvg
} from './SetOperationsFigures';

interface SetOperationsSorterProps {
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
    title: '1. Szint: Művelettípus és Jelentés Csoportosítása',
    subtitle: 'Húzd az állításokat és példákat a megfelelő halmazművelet kategóriájába!',
    categories: [
      {
        id: 'cat-inter',
        name: 'Metszet Művelet (∩)',
        description: 'Közös elemek, ÉS-kapcsolat, szűkítés',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-union',
        name: 'Unió Művelet (∪)',
        description: 'Egyesítés, VAGY-kapcsolat, elemek összevonása',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      },
      {
        id: 'cat-diff',
        name: 'Különbség vagy Komplementer (\\ vagy Ā)',
        description: 'Levonás, elhagyás vagy alaphalmazbeli kiegészítés',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      }
    ],
    items: [
      { id: 'sos1-1', label: '{1, 2, 3} ∩ {2, 3, 4}', category: 'cat-inter', figure: <IntersectionVennSvg size={65} /> },
      { id: 'sos1-2', label: 'Mindkét szakkörre egyszerre járó tanulók halmaza', category: 'cat-inter' },
      { id: 'sos1-3', label: 'A és B közös elemei (ÉS kapcsolat)', category: 'cat-inter' },
      { id: 'sos1-4', label: 'Páros prímszámok halmaza', category: 'cat-inter' },
      { id: 'sos1-5', label: '{1, 2} ∪ {3, 4}', category: 'cat-union', figure: <UnionVennSvg size={65} /> },
      { id: 'sos1-6', label: 'Legalább az egyik nyelvet tanuló diákok halmaza', category: 'cat-union' },
      { id: 'sos1-7', label: 'A vagy B halmazba tartozó elemek', category: 'cat-union' },
      { id: 'sos1-8', label: '|A ∪ B| kiszámítása a metszet levonásával', category: 'cat-union' },
      { id: 'sos1-9', label: '{1, 2, 3} \\ {2, 3}', category: 'cat-diff', figure: <DifferenceVennSvg size={65} /> },
      { id: 'sos1-10', label: 'U \\ A művelet', category: 'cat-diff', figure: <ComplementVennSvg size={65} /> },
      { id: 'sos1-11', label: 'Csak angolul tanulók (angol mínusz német)', category: 'cat-diff' },
      { id: 'sos1-12', label: 'U alaphalmazból kivonva az A halmaz elemeit', category: 'cat-diff' }
    ]
  },
  2: {
    title: '2. Szint: Halmazműveleti Eredmények Csoportosítása',
    subtitle: 'Döntsd el, hogy a kifejezés értéke Üres Halmaz (∅), Maga az A halmaz, vagy az Alaphalmaz (U)!',
    categories: [
      {
        id: 'cat-empty',
        name: 'Eredménye: Üres Halmaz (∅)',
        description: 'A művelet eredményeként semmi sem marad',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-same',
        name: 'Eredménye: Maga az A Halmaz',
        description: 'A művelet nem változtatja meg az A halmazt',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-univ',
        name: 'Eredménye: A Teljes Alaphalmaz (U)',
        description: 'A művelet az egész univerzumot lefedi',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      { id: 'sos2-1', label: 'A ∩ ∅', category: 'cat-empty' },
      { id: 'sos2-2', label: 'A \\ A', category: 'cat-empty' },
      { id: 'sos2-3', label: 'A ∩ Ā', category: 'cat-empty' },
      { id: 'sos2-4', label: 'Ha A ⊆ B, akkor A \\ B', category: 'cat-empty', figure: <SubsetOperationsVennSvg size={65} /> },
      { id: 'sos2-5', label: 'A ∩ A', category: 'cat-same' },
      { id: 'sos2-6', label: 'A ∪ A', category: 'cat-same' },
      { id: 'sos2-7', label: 'A ∪ ∅', category: 'cat-same' },
      { id: 'sos2-8', label: 'Ā̄', category: 'cat-same' },
      { id: 'sos2-9', label: 'A ∩ U', category: 'cat-same' },
      { id: 'sos2-10', label: 'A ∪ Ā', category: 'cat-univ', figure: <ComplementVennSvg size={65} /> },
      { id: 'sos2-11', label: 'U ∪ A', category: 'cat-univ' },
      { id: 'sos2-12', label: 'U \\ ∅', category: 'cat-univ' }
    ]
  },
  3: {
    title: '3. Szint: Műveleti Állítások Érvényessége',
    subtitle: 'Döntsd el, hogy az állítás Mindig Igaz, Mindig Hamis, vagy Feltételtől Függ!',
    categories: [
      {
        id: 'cat-true',
        name: 'Mindig Igaz (Azonosság)',
        description: 'Bármely A, B, C halmazra kivétel nélkül érvényes',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-false',
        name: 'Mindig Hamis (Logikai Hiba)',
        description: 'Soha nem teljesülhet, elvi matematikai tévedés',
        badgeColor: 'bg-red-100 text-red-900 border-red-300'
      },
      {
        id: 'cat-cond',
        name: 'Feltételtől Függ',
        description: 'Csak speciális halmazok (pl. A = B vagy diszjunktak) esetén igaz',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      { id: 'sos3-1', label: 'A ∩ B = B ∩ A', category: 'cat-true' },
      { id: 'sos3-2', label: '(A ∪ B)\' = Ā ∩ B̄', category: 'cat-true', figure: <DeMorganUnionVennSvg size={65} /> },
      { id: 'sos3-3', label: 'A ∩ (A ∪ B) = A', category: 'cat-true' },
      { id: 'sos3-4', label: '(A ∩ B) ⊆ A és (A ∩ B) ⊆ B', category: 'cat-true', figure: <IntersectionVennSvg size={65} /> },
      { id: 'sos3-5', label: 'A ∩ Ā ≠ ∅', category: 'cat-false' },
      { id: 'sos3-6', label: '|A ∪ B| = |A| + |B| + |A ∩ B|', category: 'cat-false' },
      { id: 'sos3-7', label: 'A ∪ U = ∅', category: 'cat-false' },
      { id: 'sos3-8', label: 'A ⊆ (A ∩ B) minden A, B halmazra', category: 'cat-false' },
      { id: 'sos3-9', label: 'A \\ B = B \\ A', category: 'cat-cond' },
      { id: 'sos3-10', label: 'A ∩ B = ∅', category: 'cat-cond', figure: <DisjointVennSvg size={65} /> },
      { id: 'sos3-11', label: 'A ∪ B = A', category: 'cat-cond' },
      { id: 'sos3-12', label: '|A ∪ B| = |A| + |B|', category: 'cat-cond' }
    ]
  }
};

export const SetOperationsSorter: React.FC<SetOperationsSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId,
  topicTitle
}) => {
  const activeLevel = currentLevel || level || 1;
  const config = sorterLevels[activeLevel] || sorterLevels[1];

  return (
    <SorterTemplate
      level={activeLevel}
      config={config}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId || 'g9-komb-halmaz-muveletek-sorter'}
      topicTitle={topicTitle || '9. Osztály - Halmazműveletek Csoportosító'}
    />
  );
};

export default SetOperationsSorter;
